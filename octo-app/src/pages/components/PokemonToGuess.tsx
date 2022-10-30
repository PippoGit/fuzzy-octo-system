import Image from "next/image";
import type { Pokemon } from "..";

export const PokemonToGuess = ({ pokemon }: { pokemon: Pokemon }) => {
  return (
    <Image
      src={pokemon.sprite}
      alt="guess"
      width={400}
      height={400}
      style={{
        filter: "brightness(0%)",
        imageRendering: "pixelated",
      }}
    />
  );
};
