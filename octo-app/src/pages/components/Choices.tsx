import type { Pokemon } from "..";

export const Choices = ({
  pokemons,
  onGuess,
}: {
  pokemons: Pokemon[];
  onGuess: (id: number) => void;
}) => {
  const toGuess = pokemons[0];

  if (!toGuess) return null;

  return (
    <ul className="grid grid-cols-2 gap-4">
      {pokemons.map((pokemon) => (
        <li
          className="p-2 capitalize hover:translate-y-px"
          role="button"
          style={{
            borderImage: `url('/assets/frame.png') 42 round`,
            borderWidth: "21px",
            borderStyle: "solid",
          }}
          key={pokemon.id}
          onClick={() => onGuess(pokemon.id)}
        >
          {pokemon.name} {pokemon.id}
        </li>
      ))}
    </ul>
  );
};
