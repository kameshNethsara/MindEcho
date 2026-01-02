import { useEffect, useState } from "react";

interface RelaxingGifProps {
  gifs: string[];
  interval?: number;
  className?: string;
}

export default function RelaxingGif({ gifs, interval = 6000, className }: RelaxingGifProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % gifs.length);
    }, interval);

    return () => clearInterval(id);
  }, [gifs, interval]);

  return (
    <img
      src={gifs[index]}
      alt="Relaxing animation"
      className={`h-full w-full object-contain rounded-3xl transition-opacity duration-1000 ${className}`}
    />
  );
}
