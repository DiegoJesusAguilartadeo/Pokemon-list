"use client";

import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import type { NamedAPIres } from "../lib/data";

interface PokemonCardProps {
  pokemon: NamedAPIres;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const queryClient = useQueryClient();

  // Extraer el ID desde la URL de la PokéAPI (ej: https://pokeapi.co/api/v2/pokemon/1/)
  const id = pokemon.url.split("/").filter(Boolean).pop();
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  // Requisito: Prefetching en Hover usando onMouseEnter con caché de 24h
  const handleMouseEnter = () => {
    queryClient.prefetchQuery({
      queryKey: ["pokemon", pokemon.name],
      queryFn: async () => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
        if (!res.ok) throw new Error("Error al precargar el Pokémon");
        return res.json();
      },
      staleTime: 24 * 60 * 60 * 1000, // 24 horas en caché en memoria
    });
  };

  return (
    <Link
      href={`/pokemon/${pokemon.name}`}
      onMouseEnter={handleMouseEnter}
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        padding: "1rem",
        textAlign: "center",
        textDecoration: "none",
        color: "inherit",
        backgroundColor: "#fff",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        display: "block",
      }}
    >
      <img src={imageUrl} alt={pokemon.name} width={96} height={96} style={{ margin: "0 auto" }} />
      <p style={{ textTransform: "capitalize", fontWeight: "bold", marginTop: "0.5rem" }}>
        {pokemon.name}
      </p>
      <span style={{ fontSize: "0.8rem", color: "#64748b" }}>#{id}</span>
    </Link>
  );
}