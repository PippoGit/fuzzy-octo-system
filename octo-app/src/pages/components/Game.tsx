import _ from "lodash";
import { useMemo, useState } from "react";
import type { Pokemon } from "..";
import { useHighScores } from "../../utils/high-scores";
import { Choices } from "./Choices";
import { CorrectGuess } from "./CorrectGuess";
import { Pokedex } from "./Pokedex";
import { PokemonToGuess } from "./PokemonToGuess";
import { YouWin } from "./YouWin";

export const Game = ({
  pokemonList,
  numChoices,
}: {
  pokemonList: Pokemon[];
  numChoices: number;
}) => {
  const { addHighScore } = useHighScores();

  const [isGameOver, setIsGameOver] = useState(false);
  const [guessRight, setGuessRight] = useState(false);
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

  if (!pokemonToGuess) return null;

  if (pokedex.length === pokemonList.length) {
    return <YouWin />;
  }

  return (
    <div className="align-center container flex flex-col items-center">
      <Pokedex pokedex={pokedex} total={pokemonList.length} />
      <PokemonToGuess pokemon={pokemonToGuess} show={showPokemon} />
      <div className="mb-8">
        {isGameOver && (
          <div> Oh no! That was a {pokemonToGuess.name}. Game over... </div>
        )}
        {guessRight && (
          <CorrectGuess
            onGetNext={() => {
              setGuessRight(false);
              setShowPokemon(false);
              setCurrentQuiz((old) => old + 1);
            }}
          />
        )}
      </div>
      <Choices
        pokemons={getRandomPokemonOptions}
        onGuess={(id) => {
          setShowPokemon(true);
          if (id === pokemonToGuess.id) {
            setPokedex((old) => [...old, pokemonToGuess.id]);
            setGuessRight(true);
          } else {
            setIsGameOver(true);
          }
        }}
        disabled={isGameOver}
      />
    </div>
  );
};
