import Image from "next/image";
import type { Pokemon } from "..";

export const PokemonToGuess = ({
  pokemon,
  show,
}: {
  pokemon: Pokemon;
  show: boolean;
}) => {
  return (
    <Image
      src={pokemon.sprite}
      alt="guess"
      width={400}
      height={400}
      style={
        show
          ? undefined
          : {
              filter: "brightness(0%)",
              imageRendering: "pixelated",
            }
      }
    />
  );
};
