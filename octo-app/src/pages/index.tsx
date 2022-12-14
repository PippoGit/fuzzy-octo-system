import localFont from "@next/font/local";
import { type NextPage } from "next";
import Head from "next/head";

import { useQuery } from "@tanstack/react-query";
import { Game } from "./components/Game";
import _ from "lodash";
import { useMemo } from "react";

export interface Pokemon {
  id: number;
  name: string;
  sprite: string;
}

export interface PokemonApi {
  id: number;
  name: string;
  url: string;
}

interface PokeApiList {
  count: number;
  results: PokemonApi[];
}

const MAX_POKEDEX_NO = 150;
const MAX_CHOICES = 4;

const initGame = async () => {
  const pokemonList: Pokemon[] = [];
  const apiListRes = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEDEX_NO}&offset=0`
  );
  const apiList = (await apiListRes.json()) as PokeApiList;

  await Promise.all(
    apiList.results.map(async (pokeApi) => {
      const res = await fetch(pokeApi.url);
      const data = await res.json();
      pokemonList.push({
        id: data.id,
        name: data.name,
        sprite: data.sprites.front_default,
      });
    })
  );
  return pokemonList;
};

const Home: NextPage = () => {
  const { isLoading, data } = useQuery(["pokemon"], initGame, {
    refetchOnWindowFocus: false,
  });


  const pokemonList = useMemo(() => {
    if (!data || data.length < MAX_POKEDEX_NO) return [];
    return _.shuffle(data);
  }, [data]);

  return (
    <>
      <div
        className="container mx-auto flex flex-col items-center justify-center p-4"
      >
        <h1 className="text-5xl font-extrabold leading-normal text-black md:text-[5rem]">
          PokéQuiz
        </h1>
        <p className="text-2xl text-gray-700">{"Who's That Pokemon?"}</p>
        {!data || isLoading ? (
          <p>loading...</p>
        ) : (
          <Game pokemonList={pokemonList} numChoices={MAX_CHOICES} />
        )}
      </div>
    </>
  );
};

export default Home;
