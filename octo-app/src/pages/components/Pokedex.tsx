export const Pokedex = ({
  pokedex,
  total,
}: {
  pokedex: number[];
  total: number;
}) => {
  return (
    <div className={"mt-4"}>
      Pokedex: {pokedex.length}/{total}
    </div>
  );
};
