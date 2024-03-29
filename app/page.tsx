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

    const moaiSilhouette = [
      { x: 0, y: 4 },
      { x: 1, y: 4 },
      { x: 1.5, y: 3 },
      { x: 1.5, y: -2 },
      { x: 2.5, y: -3 },
      { x: 2.5, y: -3.5 },
      { x: 2, y: -4 },
      { x: 1, y: -4 },
      { x: 0, y: -3 },
      { x: -1, y: -4 },
      { x: -2, y: -4 },
      { x: -2.5, y: -3.5 },
      { x: -2.5, y: -3 },
      { x: -1.5, y: -2 },
      { x: -1.5, y: 3 },
      { x: -1, y: 4 },
      { x: 0, y: 4 }
    ];

    const vPolygon = moaiSilhouette.map(({ x, y }) => {
      let dot =  pen.windowToWiewport(windowSize, viewportSize, x, -y)
      dot = pen.rotate(dot, 45 * Math.PI / 180);
      dot = pen.translate(dot, 300, -200);
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
