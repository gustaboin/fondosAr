import { useState, useEffect } from "react";
import
{
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

function FondoHistorico({ fondoSeleccionado, rangoDias })
{
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() =>
    {
        if (!fondoSeleccionado) return;

        async function fetchHistorico()
        {
            setLoading(true);
            let historico = [];

            for (let i = 0; i < rangoDias; i++)
            {
                const fecha = new Date();
                fecha.setDate(fecha.getDate() - i);

                const y = fecha.getFullYear();
                const m = String(fecha.getMonth() + 1).padStart(2, "0");
                const d = String(fecha.getDate()).padStart(2, "0");

                const url = `https://api.argentinadatos.com/v1/finanzas/fci/rentaFija/${y}/${m}/${d}`;
                try
                {
                    const res = await fetch(url);
                    if (res.ok)
                    {
                        const valores = await res.json();
                        const fondo = valores.find((f) => f.fondo === fondoSeleccionado);
                        if (fondo)
                        {
                            historico.push({
                                fecha: `${d}/${m}`,
                                patrimonio: fondo.patrimonio,
                                vcp: fondo.vcp,
                                ccp: fondo.ccp,
                            });
                        }
                    }
                } catch (err)
                {
                    console.error("Error al traer datos:", err);
                }
            }

            historico.reverse();
            setData(historico);
            setLoading(false);
        }

        fetchHistorico();
    }, [fondoSeleccionado, rangoDias]);

    if (!fondoSeleccionado) return null;
    if (loading) return <p>Cargando histórico...</p>;
    if (!data.length) return <p>No hay datos para este fondo.</p>;

    return (
        <div style={{ marginTop: "2rem" }}>
            <h3>
                Histórico de {fondoSeleccionado} (últimos {rangoDias} días)
            </h3>
            <ResponsiveContainer width="100%" height={350}>
                <LineChart data={data}>
                    <XAxis dataKey="fecha" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="patrimonio" stroke="#1e90ff" name="Patrimonio" />
                    <Line type="monotone" dataKey="vcp" stroke="#28a745" name="VCP" />
                    <Line type="monotone" dataKey="ccp" stroke="#dc3545" name="CCP" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default FondoHistorico;

