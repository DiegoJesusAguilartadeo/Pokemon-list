import PokemonGrid from "@/src/app/components/PokemonGrid";

export default function PokemonListPage() {
  return (
    <main style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", textAlign: "center", marginBottom: "1.5rem" }}>
        Pokédex
      </h1>
      <PokemonGrid />
    </main>
  );
}