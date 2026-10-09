"use client";

import { useQuery } from "@tanstack/react-query";
import { PokemonCard } from "./PokemonCard";
import type { PokemonListResponse } from "../lib/data";

async function fetchPokemons(): Promise<PokemonListResponse> {
  const res = await fetch("/api/pokemon");
  if (!res.ok) throw new Error("Error al cargar los Pokémon");
  return res.json();
}

export default function PokemonGrid() {
  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["pokemons"],
    queryFn: fetchPokemons,
    staleTime: 24 * 60 * 60 * 1000, // 24 horas requeridas por la rúbrica
  });

  if (isLoading) return <p style={{ textAlign: "center", padding: "2rem" }}>Cargando Pokédex...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red", padding: "2rem" }}>Error al cargar los datos.</p>;

  return (
    <div>
      {isFetching && (
        <span style={{ fontSize: "0.8rem", color: "#64748b", display: "block", marginBottom: "1rem" }}>
          Sincronizando pokemons...
        </span>
      )}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: "1rem",
          marginTop: "1.5rem",
        }}
      >
        {data?.res.map((pokemon) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}