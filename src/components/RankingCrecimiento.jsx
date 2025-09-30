import { useEffect, useState } from "react";
import { getFondoPorFecha, getFondos } from "../services/fondosApi.js";
import
    {
        BarChart,
        Bar,
        XAxis,
        YAxis,
        Tooltip,
        ResponsiveContainer,
    } from "recharts";

function RankingCrecimiento({ dias = 30, tipoRenta = "rentaFija" })
{
    const [ranking, setRanking] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() =>
    {
        async function fetchData()
        {
            setLoading(true);
            try
            {
                // 1. Hoy
                const hoy = await getFondos(tipoRenta);

                // 2. Fecha pasada (dias atrás)
                const fecha = new Date();
                fecha.setDate(fecha.getDate() - dias);
                const y = fecha.getFullYear();
                const m = String(fecha.getMonth() + 1).padStart(2, "0");
                const d = String(fecha.getDate()).padStart(2, "0");
                const pasado = await getFondoPorFecha(tipoRenta, y, m, d);

                // 3. Calcular crecimiento %
                const lista = hoy
                    .map((f) =>
                    {
                        const pasadoF = pasado.find((p) => p.fondo === f.fondo);
                        if (!pasadoF || f.patrimonio == null || pasadoF.patrimonio == null)
                            return null;

                        const crecimiento =
                            ((f.patrimonio - pasadoF.patrimonio) / pasadoF.patrimonio) * 100;

                        return {
                            fondo: f.fondo,
                            crecimiento,
                        };
                    })
                    .filter(Boolean)
                    .sort((a, b) => b.crecimiento - a.crecimiento)
                    .slice(0, 10);

                setRanking(lista);
            } catch (err)
            {
                console.error("Error en ranking crecimiento:", err);
            } finally
            {
                setLoading(false);
            }
        }

        fetchData();
    }, [dias, tipoRenta]); // 👈 depende también del tipo de renta

    if (loading) return <p>Cargando ranking de crecimiento...</p>;
    if (!ranking.length) return <p>No hay datos disponibles</p>;

    return (
        <div className="ranking">
            <h3>
                Top 10 Crecimiento Patrimonio ({tipoRenta}) últimos {dias} días
            </h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={ranking}>
                    <XAxis dataKey="fondo" hide />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="crecimiento" fill="#28a745" />
                </BarChart>
            </ResponsiveContainer>
            <ol>
                {ranking.map((f, i) => (
                    <li key={i}>
                        {f.fondo} — {f.crecimiento.toFixed(2)}%
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default RankingCrecimiento;
