import _ from "lodash";
import { useMemo, useState } from "react";
import type { Pokemon } from "..";
import { Button } from "./Button";
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

  const resetGame = () => {
    setIsGameOver(false);
    setGuessRight(false);
    setCurrentQuiz(0);
    setPokedex([]);
    setShowPokemon(false);
  }

  return (
    <div className="align-center container flex flex-col items-center">
      <Pokedex pokedex={pokedex} total={pokemonList.length} />
      <PokemonToGuess pokemon={pokemonToGuess} show={showPokemon} />
      {isGameOver ? (
        <>
          <p className="text-center mb-4">
            Oh no! That was a <span className="capitalize">{pokemonToGuess.name}</span>.
          </p>
          <p className="text-center mb-8">
            You got {pokedex.length} Pokémons. 
          </p>
          <Button onClick={resetGame}>
            Start a new Game
          </Button>
        </>
      ) : (
        <>
          <div className="mb-8">
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
        </>
      )}
    </div>
  );
};
