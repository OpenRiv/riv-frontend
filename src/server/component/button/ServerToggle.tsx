interface ServerToggleProps {
  isActive: boolean;
  onToggle: () => void;
}

export default function ServerToggle({
  isActive,
  onToggle,
}: ServerToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="size-[1.1rem] rounded-full flex items-center justify-center border-[0.1rem] border-gray-07"
    >
      <div
        className={`border-[0.175rem] border-gray-02 transition-colors duration-300 rounded-full size-full ${
          isActive ? "bg-primary" : "bg-gray-02"
        }`}
      />
    </button>
  );
}
