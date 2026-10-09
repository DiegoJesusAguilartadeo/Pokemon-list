import PokemonGrid from "@/src/app/components/PokemonGrid";
import Link from "next/link";
export default function PokemonListPage() {
  return (
    <main style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", textAlign: "center", marginBottom: "1.5rem" }}>
        Pokédex
      </h1>
      <Link href="/pokemon-card">a detalle</Link>
       <Link href="/">Ir al inicio</Link>      
      <PokemonGrid />
    </main>
  );
}