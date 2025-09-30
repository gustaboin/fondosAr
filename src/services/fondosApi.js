/*
export async function getFondos()
{
    const res = await fetch("https://api.argentinadatos.com/v1/finanzas/fci/rentaFija/ultimo");
    if (!res.ok) throw new Error("Error al obtener fondos");
    const data = await res.json();
    return Array.isArray(data) ? data : [];
}
*/
// ("https://api.argentinadatos.com/v1/finanzas/fci/rentaFija/2025/01/15")
// YYYY/MM/DD


// probar con param para traer otras rentas NO SOLO LA FIJA

export async function getFondos(tipo = "rentaFija")
{
    const res = await fetch(`https://api.argentinadatos.com/v1/finanzas/fci/${tipo}/ultimo`);
    if (!res.ok) throw new Error("Error al obtener fondos");
    const data = await res.json();
    return Array.isArray(data) ? data : [];
}

export async function getFondoPorFecha(tipo = "rentaFija", year, month, day)
{
    const url = `https://api.argentinadatos.com/v1/finanzas/fci/${tipo}/${year}/${month}/${day}`;
    const res = await fetch(url);
    if (!res.ok) return [];
    return res.json();
}
