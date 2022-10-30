import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { useCallback, useEffect, useState } from 'react';

type HighScore = number;

const highScoresAtom = atomWithStorage<HighScore[]>('highScores', []);

export function useHighScores() {
  const [highScores, setHighScores] = useAtom(highScoresAtom);
  const [deferedHighScores, setDeferedHighScores] = useState<HighScore[]>([]);

  useEffect(() => {
    setDeferedHighScores(highScores);
  }, [highScores]);

  const addHighScore = useCallback(
    (highScore: number) => {
      // No low scores!
      if (highScore < 1) {
        return;
      }

      setHighScores((prev) => {
        // Sort by score, and keep only the top 10
        const next = [...prev, highScore];
        next.sort((a, b) => b - a);
        return next.slice(0, 10);
      });
    },
    [setHighScores]
  );

  return { highScores: deferedHighScores, addHighScore };
}
