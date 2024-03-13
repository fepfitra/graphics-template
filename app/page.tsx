'use client'
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    bezier(canvas, 100, 100, 100, 200, 300, 100, 400, 200)
    // const ctx = canvas.getContext('2d');
    // if (ctx) {
    //   ctx.fillStyle = 'red';
    //   ctx.fillRect(0, 0, 100, 100);
    // }
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

// bezier using getImageData and putImageData
function bezier(
  canvas: HTMLCanvasElement,
  x0: number, y0: number, 
  x1: number, y1: number, 
  x2: number, y2: number, 
  x3: number, y3: number
) {
  //setup data
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  //extrak pixel
  const data = imageData.data;
  const width = canvas.width;
  const height = canvas.height;

  //algoritma aseli
  const u = 1 / 1000;
  for (let i = 0; i < 1000; i++) {
    const u2 = u * i;

    //rumus bezier
    const x = Math.pow(1 - u2, 3) * x0 + 3 * Math.pow(1 - u2, 2) * u2 * x1 + 3 * (1 - u2) * Math.pow(u2, 2) * x2 + Math.pow(u2, 3) * x3;
    const y = Math.pow(1 - u2, 3) * y0 + 3 * Math.pow(1 - u2, 2) * u2 * y1 + 3 * (1 - u2) * Math.pow(u2, 2) * y2 + Math.pow(u2, 3) * y3;

    //menggambar pixel
    const index = Math.floor(y) * width + Math.floor(x);
    data[index * 4] = 0; //red
    data[index * 4 + 1] = 0; //green
    data[index * 4 + 2] = 0; //blue
    data[index * 4 + 3] = 255; //alpha
  }
  //meletakkan semua pixel
  ctx.putImageData(imageData, 0, 0);
}
