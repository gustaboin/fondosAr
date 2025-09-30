function Filtros({
    filtro,
    setFiltro,
    horizonte,
    setHorizonte,
    fondoSeleccionado,
    setFondoSeleccionado,
    rangoDias,
    setRangoDias,
    fondos,
    tipoRenta,
    setTipoRenta,
})
{
    return (
        <div className="filtros">
            <select value={tipoRenta} onChange={(e) => setTipoRenta(e.target.value)}>
                <option value="rentaFija">Renta Fija</option>
                <option value="rentaMixta">Renta Mixta</option>
                <option value="rentaVariable">Renta Variable</option>
            </select>

            <input
                type="text"
                placeholder="Buscar fondo"
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
            />

            <select value={horizonte} onChange={(e) => setHorizonte(e.target.value)}>
                <option value="">Todos</option>
                <option value="corto">Corto</option>
                <option value="medio">Medio</option>
                <option value="largo">Largo</option>
            </select>

            <select
                value={fondoSeleccionado}
                onChange={(e) => setFondoSeleccionado(e.target.value)}
            >
                <option value="">Todos los fondos</option>
                {fondos.map((f, i) => (
                    <option key={i} value={f.fondo}>
                        {f.fondo}
                    </option>
                ))}
            </select>

            {fondoSeleccionado && (
                <select
                    value={rangoDias}
                    onChange={(e) => setRangoDias(Number(e.target.value))}
                >
                    <option value={7}>Últimos 7 días</option>
                    <option value={30}>Últimos 30 días</option>
                    <option value={90}>Últimos 90 días</option>
                </select>
            )}
        </div>
    );
}

export default Filtros;
