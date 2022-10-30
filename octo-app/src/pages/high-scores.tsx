import type { NextPage } from "next";
import { useHighScores } from "../utils/high-scores"

const HighScores: NextPage = () => {
  const { highScores } = useHighScores();

  console.log(highScores);

  return (
    <div className="container mx-auto flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-center mb-8 min-w-80">High Scores</h1>
      {highScores.length === 0 ? (
        <p className="text-center">
          No high scores yet, go catch em all!
        </p>
      ) : (
        <ol className="list-decimal text-right" suppressHydrationWarning={true}>
          {highScores.map((highScore, index) => (
            <li key={index} className="w-96">
              <span className="w-full">{highScore}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}

export default HighScores;
