function FondosTable({ fondos, onSelectFondo })
{
    if (!fondos.length) return <p>No hay datos disponibles</p>;

    return (
        <table className="fondos-table">
            <thead>
                <tr>
                    <th>Fondo</th>
                    <th>Fecha</th>
                    <th>Horizonte</th>
                    <th>VCP</th>
                    <th>CCP</th>
                    <th>Patrimonio</th>
                </tr>
            </thead>
            <tbody>
                {fondos.map((f, i) => (
                    <tr
                        key={i}
                        onClick={() => onSelectFondo && onSelectFondo(f.fondo)}
                        style={{ cursor: "pointer" }}
                    >
                        <td>{f.fondo || "-"}</td>
                        <td>{f.fecha || "-"}</td>
                        <td>{f.horizonte || "-"}</td>
                        <td>{f.vcp !== null ? f.vcp.toLocaleString() : "-"}</td>
                        <td>{f.ccp !== null ? f.ccp.toLocaleString() : "-"}</td>
                        <td>{f.patrimonio !== null ? f.patrimonio.toLocaleString() : "-"}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default FondosTable;
