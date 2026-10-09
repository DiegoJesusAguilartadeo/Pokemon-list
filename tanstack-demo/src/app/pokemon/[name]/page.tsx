"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";

async function fetchPokemonDetail(name: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  if (!res.ok) throw new Error("No se pudo cargar el Pokémon");
  return res.json();
}

function PokemonDetailContent() {
  const params = useParams();
  const name = params.name as string;

  const { data: pokemon, isLoading, error, dataUpdatedAt } = useQuery({
    queryKey: ["pokemon", name],
    queryFn: () => fetchPokemonDetail(name),
    enabled: !!name,
  });

  if (isLoading) return <p style={{ textAlign: "center", padding: "3rem" }}>Cargando perfil de {name}...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red", padding: "3rem" }}>No se encontró el Pokémon.</p>;

  const imageUrl = pokemon.sprites?.other?.["official-artwork"]?.front_default || pokemon.sprites?.front_default;
  const cacheTime = dataUpdatedAt ? new Date(dataUpdatedAt).toLocaleTimeString() : "";

  return (
    <main style={{ maxWidth: "600px", margin: "2rem auto", padding: "2rem", background: "#fff", borderRadius: "16px", border: "1px solid #e2e8f0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <Link href="/pokemon-list" style={{ color: "#2563eb", textDecoration: "none", fontWeight: "600" }}>
          ← Volver a la lista
        </Link>
        
        {cacheTime && (
          <span style={{ fontSize: "0.8rem", background: "#f1f5f9", padding: "0.25rem 0.5rem", borderRadius: "6px", color: "#64748b" }}>
            ⚡ Caché sincronizada: <strong>{cacheTime}</strong>
          </span>
        )}
      </div>

      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <h1 style={{ fontSize: "2.5rem", textTransform: "capitalize", color: "#1e293b" }}>
          {pokemon.name} <span style={{ color: "#94a3b8" }}>#{pokemon.id}</span>
        </h1>

        {imageUrl && (
          <div style={{ width: "200px", height: "200px", margin: "1rem auto", position: "relative" }}>
            <Image
              src={imageUrl}
              alt={pokemon.name}
              fill
              unoptimized
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", margin: "1rem 0" }}>
          {pokemon.types.map((t: any) => (
            <span key={t.type.name} style={{ background: "#f1f5f9", padding: "0.25rem 0.75rem", borderRadius: "20px", textTransform: "capitalize", fontWeight: "500", fontSize: "0.9rem" }}>
              {t.type.name}
            </span>
          ))}
        </div>

        <div style={{ textAlign: "left", background: "#f8fafc", padding: "1.5rem", borderRadius: "12px", marginTop: "1.5rem", border: "1px solid #e2e8f0" }}>
          <h3 style={{ marginBottom: "0.75rem", color: "#334155" }}>Estadísticas Base</h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {pokemon.stats.map((s: any) => (
              <li key={s.stat.name} style={{ textTransform: "capitalize", margin: "0.3rem 0", display: "flex", justifyContent: "space-between", fontSize: "0.9rem", color: "#475569" }}>
                <span>{s.stat.name}:</span>
                <strong>{s.base_stat}</strong>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}

// Componente principal envuelto en Suspense para evitar el bloqueo de prerenderizado
export default function PokemonDetailPage() {
  return (
    <Suspense fallback={<p style={{ textAlign: "center", padding: "3rem" }}>Cargando vista...</p>}>
      <PokemonDetailContent />
    </Suspense>
  );
}