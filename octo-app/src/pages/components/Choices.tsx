import type { Pokemon } from "..";
import { Button } from "./Button";

export const Choices = ({
  pokemons,
  onGuess,
  disabled,
}: {
  pokemons: Pokemon[];
  onGuess: (id: number) => void;
  disabled: boolean;
}) => {
  const toGuess = pokemons[0];

  if (!toGuess) return null;

  return (
    <ul className="grid grid-cols-2 gap-4">
      {pokemons.map((pokemon) => (
        <li key={pokemon.id}>
          <Button className="w-60 capitalize" onClick={() => !disabled && onGuess(pokemon.id)}>
            {pokemon.name}
          </Button>
        </li>
      ))}
    </ul>
  );
};
