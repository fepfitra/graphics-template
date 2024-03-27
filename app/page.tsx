'use client'
import { useEffect, useRef } from "react";
import Pen from "./pen"

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const pen = new Pen(canvas);
    pen.sines({
      amplitude: 1,
      frequency: 1,
      xmin: -Math.PI,
      xmax: Math.PI,
    })
  }, []);

  return (
    <>
      <canvas 
        ref={canvasRef}
        className="bg-white"
        width="600"
        height="600"
      ></canvas>
    </>
  );
}
