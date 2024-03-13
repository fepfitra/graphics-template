'use client'
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = 'red';
      ctx.fillRect(0, 0, 100, 100);
    }
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
