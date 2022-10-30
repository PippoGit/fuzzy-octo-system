interface Props {
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}


export function Button({onClick, className = '', children}: Props) {
  return (
    <button
      className={"p-4 hover:translate-y-px text-left " + className}
      onClick={onClick}
        style={{
        borderImage: `url('/assets/frame.png') 42 round`,
        borderWidth: "21px",
        borderStyle: "solid",
      }}
    >
      {children}
    </button>
  )
}
