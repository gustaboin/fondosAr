import { useEffect, useState } from "react";
import { getFondos } from "../services/fondosApi.js";
import Filtros from "../components/Filtros.jsx";
import FondosTable from "../components/FondosTable.jsx";
import RankingFondos from "../components/RankingFondos.jsx";
import FondoHistorico from "../components/FondoHistorico.jsx";
import "./../styles/fondosFiltro.css";
import "./../styles/Fondos.css";
import Tabs from "../components/Tabs.jsx";
import RankingCrecimiento from "../components/RankingCrecimiento.jsx";

function FondosPage()
{
    const [fondos, setFondos] = useState([]);
    const [loading, setLoading] = useState(true);

    // estados de filtros
    const [filtro, setFiltro] = useState("");
    const [horizonte, setHorizonte] = useState("");
    const [fondoSeleccionado, setFondoSeleccionado] = useState("");
    const [rangoDias, setRangoDias] = useState(5);
    const [tipoRenta, setTipoRenta] = useState("rentaFija");

    // ultimo agregado ranking de crecimiento a dormir son las 2 am y no puedo pensar
    const [diasRanking, setDiasRanking] = useState(30);
    // faltan dias ranking y tipo renta en filtros

    useEffect(() =>
    {
        async function fetchData()
        {
            try
            {
                const data = await getFondos(tipoRenta);
                setFondos(data);
            } catch (error)
            {
                console.error("Error cargando fondos:", error);
            } finally
            {
                setLoading(false);
            }
        }
        fetchData();
    }, [tipoRenta]); // 👈 cada vez que cambia el tipo, vuelve a pedir datos


    const fondosFiltrados = fondos.filter(
        (f) =>
            f.fondo?.toLowerCase().includes(filtro.toLowerCase()) &&
            (horizonte ? f.horizonte?.toLowerCase() === horizonte.toLowerCase() : true)
    );

    if (loading) return <p>Cargando fondos...</p>;

    return (
        <div>
            <h2>Fondos de Inversión</h2>

            <Filtros
                filtro={filtro}
                setFiltro={setFiltro}
                horizonte={horizonte}
                setHorizonte={setHorizonte}
                fondoSeleccionado={fondoSeleccionado}
                setFondoSeleccionado={setFondoSeleccionado}
                rangoDias={rangoDias}
                setRangoDias={setRangoDias}
                fondos={fondos}
                tipoRenta={tipoRenta}
                setTipoRenta={setTipoRenta}
            />


            {fondoSeleccionado ? (
                <FondoHistorico fondoSeleccionado={fondoSeleccionado} rangoDias={rangoDias} />
            ) : (
                <>
                    <FondosTable
                        fondos={fondosFiltrados}
                        onSelectFondo={(fondo) => setFondoSeleccionado(fondo)}
                    />
                    <RankingFondos fondos={fondos} />
                </>
            )}
        </div>
    );
}

export default FondosPage;
