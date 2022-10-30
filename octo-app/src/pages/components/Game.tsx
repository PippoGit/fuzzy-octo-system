import _ from "lodash";
import { useEffect, useMemo, useState } from "react";
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
  const [showPokemon, setShowPokemon] = useState(false);

  const getRandomPokemonOptions = useMemo(() => {
    const p = pokemonList.at(currentQuiz);
    if (!p) throw "error";
    return _.shuffle([
      p,
      ..._.sampleSize(pokemonList.slice(currentQuiz + 1), numChoices - 1),
    ]);
  }, [pokemonList, currentQuiz, numChoices]);

  const pokemonToGuess = pokemonList[currentQuiz];

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowPokemon(false);
      if (pokedex.length > 0) {
        setCurrentQuiz((currentQuiz) => currentQuiz + 1);
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, [pokedex]);

  if (!pokemonToGuess) return null;

  return (
    <div className="align-center container flex flex-col items-center">
      <Pokedex pokedex={pokedex} total={pokemonList.length} />
      {isGameOver && (
        <div> Oh no! That was a {pokemonToGuess.name}. Game over... </div>
      )}
      <PokemonToGuess pokemon={pokemonToGuess} show={showPokemon} />
      <Choices
        pokemons={getRandomPokemonOptions}
        onGuess={(id) => {
          setShowPokemon(true);
          if (id === pokemonToGuess.id) {
            setPokedex((old) => [...old, pokemonToGuess.id]);
          } else {
            setIsGameOver(true);
          }
        }}
        disabled={isGameOver}
      />
    </div>
  );
};
