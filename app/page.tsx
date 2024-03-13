'use client'
import Image from "next/image";
import { useEffect, useRef } from "react";
import Pen from "./pen"

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const pen = new Pen(canvas);
    pen.bezier(100, 100, 100, 200, 300, 100, 400, 200);
    pen.line(100, 100, 400, 200);
    pen.triangle(400, 400, 400, 200, 100, 200);
  }, []);

  return (
    <>
      <canvas 
        id="canvas" 
        ref={canvasRef}
        className="bg-white"
        width={window.innerWidth} 
        height={window.innerHeight}
      ></canvas>
    </>
  );
}
