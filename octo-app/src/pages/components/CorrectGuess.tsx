import { useEffect, useState } from "react";

export const CorrectGuess = ({ onGetNext }: { onGetNext: () => void }) => {
  const [countdown, setCountdown] = useState(3);
  useEffect(() => {
    if (countdown === 0) {
      onGetNext();
      return;
    }

    const timeout = setTimeout(() => {
      setCountdown((old) => old - 1);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [countdown, onGetNext]);

  return <div>Correct! Next pokemon in {countdown} seconds</div>;
};
