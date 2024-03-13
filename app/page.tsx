'use client'
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
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
  p1x: number, p1y: number, 
  p2x: number, p2y: number, 
  p3x: number, p3y: number, 
  p4x: number, p4y: number
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
  const len = Math.sqrt(Math.pow(p1x - p2x, 2) + Math.pow(p1y - p2y, 2)) 
            + Math.sqrt(Math.pow(p2x - p3x, 2) + Math.pow(p2y - p3y, 2)) 
            + Math.sqrt(Math.pow(p3x - p4x, 2) + Math.pow(p3y - p4y, 2));
  console.log(len);
  const u = 1 / len;
  for (let i = 0; i < len; i++) {
    const u2 = u * i;

    //rumus bezier
    const x = Math.pow(1 - u2, 3) * p1x + 3 * Math.pow(1 - u2, 2) * u2 * p2x + 3 * (1 - u2) * Math.pow(u2, 2) * p3x + Math.pow(u2, 3) * p4x;
    const y = Math.pow(1 - u2, 3) * p1y + 3 * Math.pow(1 - u2, 2) * u2 * p2y + 3 * (1 - u2) * Math.pow(u2, 2) * p3y + Math.pow(u2, 3) * p4y;

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
