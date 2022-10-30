export const Pokedex = ({
  pokedex,
  total,
}: {
  pokedex: number[];
  total: number;
}) => {
  return (
    <div>
      you catched {pokedex.length}/{total}
    </div>
  );
};
