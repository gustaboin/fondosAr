import
    {
        BarChart,
        Bar,
        XAxis,
        YAxis,
        Tooltip,
        ResponsiveContainer,
    } from "recharts";

function RankingFondos({ fondos })
{
    if (!fondos.length) return null;

    const topFondos = [...fondos]
        .filter((f) => f.patrimonio !== null)
        .sort((a, b) => b.patrimonio - a.patrimonio)
        .slice(0, 10);

    return (
        <div className="ranking">
            <h3>Top 10 Fondos por Patrimonio</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topFondos}>
                    <XAxis dataKey="fondo" hide />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="patrimonio" fill="#1e90ff" />
                </BarChart>
            </ResponsiveContainer>
            <ol>
                {topFondos.map((f, i) => (
                    <li key={i}>
                        {f.fondo} — ${f.patrimonio.toLocaleString()}
                    </li>
                ))}
            </ol>
        </div>
    );
}


export default RankingFondos;