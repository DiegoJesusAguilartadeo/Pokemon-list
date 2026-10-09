import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
    
    if (!response.ok) {
      return NextResponse.json(
        { error: "Error al obtener los datos de la PokéAPI" },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Devolvemos el formato que espera tu proyecto (mapeando 'results' a 'res')
    return NextResponse.json({
      count: data.count,
      next: data.next,
      previous: data.previous,
      res: data.results, // Aquí van los pokemons con { name, url }
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}