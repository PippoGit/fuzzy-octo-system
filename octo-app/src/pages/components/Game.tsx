import _ from "lodash";
import { useMemo, useState } from "react";
import type { Pokemon } from "..";
import { Choices } from "./Choices";
import { Pokedex } from "./Pokedex";
import { PokemonToGuess } from "./PokemonToGuess";

export const Game = ({
  pokemonList,
  numChoices,
}: {
  pokemonList: Pokemon[];
  numChoices: number;
}) => {
  const [isGameOver, setIsGameOver] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [pokedex, setPokedex] = useState<number[]>([]);

  const getRandomPokemonOptions = useMemo(() => {
    const p = pokemonList.at(currentQuiz);
    if (!p) throw "error";
    return _.shuffle([
      p,
      ..._.sampleSize(pokemonList.slice(currentQuiz + 1), numChoices - 1),
    ]);
  }, [pokemonList, currentQuiz, numChoices]);

  const pokemonToGuess = pokemonList[currentQuiz];

  if (getRandomPokemonOptions === undefined) return null;
  if (!pokemonToGuess) return null;

  if (isGameOver) {
    return <div>GAMEOVER</div>;
  }

  return (
    <div className="align-center container flex flex-col items-center">
      <Pokedex pokedex={pokedex} total={pokemonList.length} />
      <PokemonToGuess pokemon={pokemonToGuess} />
      <Choices
        pokemons={getRandomPokemonOptions}
        onGuess={(id) => {
          if (id === pokemonToGuess.id) {
            setPokedex((old) => [...old, pokemonToGuess.id]);
            setCurrentQuiz((currentQuiz) => currentQuiz + 1);
          } else {
            setIsGameOver(true);
          }
        }}
      />
    </div>
  );
};
