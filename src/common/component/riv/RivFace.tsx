interface RivProps {
  className?: string;
}

export default function RivFace({ className = "" }: RivProps) {
  return (
    <img
      className={className}
      src={`/assets/riv/riv_face.webp?version=${Date.now()}`}
    />
  );
}
