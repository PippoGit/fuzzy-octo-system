import Image from "next/image";

export const YouWin = () => {
  return (
    <div className="align-center container my-4 flex flex-col items-center gap-8">
      <p>{"Congratulations! You did catch 'em all!"}</p>
      <Image alt="oak" src={"/assets/oak.png"} width={400} height={400}></Image>
    </div>
  );
};
