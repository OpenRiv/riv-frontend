interface RivProps {
  className?: string;
}

export default function Riv({ className = "" }: RivProps) {
  return <img className={className} src={"/assets/riv/riv.webp"} />;
}
