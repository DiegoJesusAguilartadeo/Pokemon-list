"use client";

import { useQuery } from "@tanstack/react-query";
import { PokemonCard } from "./PokemonCard";
import type { PokemonListResponse } from "../lib/data";

async function fetchPokemons(): Promise<PokemonListResponse & { fetchedAt: string }> {
  const res = await fetch("/api/pokemon");
  if (!res.ok) throw new Error("Error al cargar los Pokémon");
  const data = await res.json();
  // Añadimos la hora exacta en la que el navegador ejecutó la petición real
  return { ...data, fetchedAt: new Date().toLocaleTimeString() };
}

export default function PokemonGrid() {
  const { data, isLoading, error, isFetching } = 
  useQuery({
    queryKey: ["pokemons"],
    queryFn: fetchPokemons,
    staleTime: 24 * 60 * 60 * 1000, // 24 horas de frescura en caché
  });

  if (isLoading) return <p style={{ textAlign: "center", padding: "2rem" }}>Cargando Pokédex...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red", padding: "2rem" }}>Error al cargar los datos.</p>;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        {data?.fetchedAt && (
          <span style={{ fontSize: "0.85rem", background: "#e2e8f0", padding: "0.25rem 0.5rem", borderRadius: "4px", color: "#334155" }}>
            ⚡ Datos obtenidos de red a las: <strong>{data.fetchedAt}</strong>
          </span>
        )}
        {isFetching && (
          <span style={{ fontSize: "0.8rem", color: "#2563eb", fontWeight: "bold" }}>
            Sincronizando en segundo plano...
          </span>
        )}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: "1rem",
          marginTop: "1rem",
        }}
      >
        {data?.res.map((pokemon) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}