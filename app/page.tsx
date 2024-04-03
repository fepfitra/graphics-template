'use client'
import { useEffect, useRef } from "react";
import Pen from "./pen"

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const pen = new Pen(canvas);
    const windowSize = {
      xmin: -5,
      ymin: 0,
      xmax: 5,
      ymax: 10,
    }
    const viewportSize = {
      xmin: 0,
      ymin: 0,
      xmax: 600,
      ymax: 600,
    }

    let line = {
      x0: -7,
      y0: -1.5,
      x1: 7,
      y1: 9,
    }
    pen.clipLine(windowSize, viewportSize, line);
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
