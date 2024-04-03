'use client'
import { useEffect, useRef } from "react";
import Pen from "./pen"

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const pen = new Pen(canvas);
    // pen.sines({
    //   amplitude: 1,
    //   frequency: 1,
    //   xmin: -Math.PI,
    //   xmax: Math.PI,
    // })
    const windowSize = {
      xmin: -10,
      ymin: -10,
      xmax: 10,
      ymax: 10,
    }
    const viewportSize = {
      xmin: 0,
      ymin: 0,
      xmax: 600,
      ymax: 600,
    }

    const diamond = [
      { x: 1, y: 3 },
      { x: 2, y: 3 },
      { x: 3, y: 2 },
      { x: 4, y: 1 },
      { x: 3, y: 0 },
      { x: 2, y: -1 },
      { x: 1, y: -2 },
      { x: 0, y: -3 },
      { x: -1, y: -2 },
      { x: -2, y: -1 },
      { x: -3, y: 0 },
      { x: -4, y: 1 },
      { x: -3, y: 2 },
      { x: -2, y: 3 },
      { x: -1, y: 3 },
    ];


    const vPolygon = diamond.map(({ x, y }) => {
      let dot = { x, y }
      dot = pen.scale(dot, 2);
      dot = pen.rotate(dot, 45 * Math.PI / 180);
      dot = pen.windowToWiewport(windowSize, viewportSize, dot.x, -dot.y)
      return dot;
    });

    pen.polygon(...vPolygon);
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
