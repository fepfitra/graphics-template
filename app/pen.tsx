class Pen {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D | null = null;
  private width: number = 0;
  private height: number = 0;
  private imageData: ImageData | null = null;
  private data: Uint8ClampedArray | null = null;

  public constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")
    this.width = canvas.width;
    this.height = canvas.height;
    if (!this.ctx) return;
    this.imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    this.data = this.imageData.data;

  }

  public point(x: number, y: number) {
    console.log(x, y)
    const index = Math.floor(y) * this.width + Math.floor(x);
    if (!this.ctx || !this.imageData) return;
    if (!this.data) return;
    this.data[index * 4] = 0; //red
    this.data[index * 4 + 1] = 0; //green
    this.data[index * 4 + 2] = 0; //blue
    this.data[index * 4 + 3] = 255; //alpha
    this.ctx.putImageData(this.imageData, 0, 0);
  }

  public line(x1: number, y1: number, x2: number, y2: number) {
    const dx = Math.abs(x2 - x1);
    const dy = Math.abs(y2 - y1);
    const sx = (x1 < x2) ? 1 : -1;
    const sy = (y1 < y2) ? 1 : -1;
    let err = dx - dy;
    let e2;
    while (true) {
      this.point(x1, y1);
      if ((x1 === x2) && (y1 === y2)) break;
      e2 = 2 * err;
      if (e2 > -dy) {
        err -= dy;
        x1 += sx;
      }
      if (e2 < dx) {
        err += dx;
        y1 += sy;
      }
    }
  }

  public bezier(
    p1x: number, p1y: number,
    p2x: number, p2y: number,
    p3x: number, p3y: number,
    p4x: number, p4y: number
  ) {
    //algoritma aseli
    const len = Math.sqrt(Math.pow(p1x - p2x, 2) + Math.pow(p1y - p2y, 2))
      + Math.sqrt(Math.pow(p2x - p3x, 2) + Math.pow(p2y - p3y, 2))
      + Math.sqrt(Math.pow(p3x - p4x, 2) + Math.pow(p3y - p4y, 2));
    const u = 1 / len;
    for (let i = 0; i < len; i++) {
      const u2 = u * i;
      const x = Math.pow(1 - u2, 3) * p1x + 3 * Math.pow(1 - u2, 2) * u2 * p2x + 3 * (1 - u2) * Math.pow(u2, 2) * p3x + Math.pow(u2, 3) * p4x;
      const y = Math.pow(1 - u2, 3) * p1y + 3 * Math.pow(1 - u2, 2) * u2 * p2y + 3 * (1 - u2) * Math.pow(u2, 2) * p3y + Math.pow(u2, 3) * p4y;

      this.point(x, y);
    }
  }

  public triangle(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number) {
    this.line(x1, y1, x2, y2);
    this.line(x2, y2, x3, y3);
    this.line(x3, y3, x1, y1);
  }

  public rectangle(x1: number, y1: number, x2: number, y2: number) {
    this.line(x1, y1, x2, y1);
    this.line(x2, y1, x2, y2);
    this.line(x2, y2, x1, y2);
    this.line(x1, y2, x1, y1);
  }

  public sines({
    amplitude,
    frequency,
    xmin,
    xmax,
  }: {
    amplitude: number,
    frequency: number,
    xmin: number,
    xmax: number,
  }) {
    for (let x = xmin; x < xmax; x = x + 0.005) {
      const y = amplitude * Math.sin(frequency * x)
      const dot = this.windowToWiewport({
        xmin: xmin,
        ymin: -amplitude,
        xmax: xmax,
        ymax: amplitude,
      }, {
        xmin: 0,
        ymin: 0,
        xmax: this.width,
        ymax: this.height,
      }, x, y);
      this.point(dot.x, dot.y);
    }
  }

  public windowToWiewport(
    windowSize: {
      xmin: number,
      ymin: number,
      xmax: number,
      ymax: number,

    }, viewportSize: {

      xmin: number,
      ymin: number,
      xmax: number,
      ymax: number,
    }, x: number, y: number) {
    const xv = viewportSize.xmin + (x - windowSize.xmin) * (viewportSize.xmax - viewportSize.xmin) / (windowSize.xmax - windowSize.xmin);
    const yv = viewportSize.ymin + (y - windowSize.ymin) * (viewportSize.ymax - viewportSize.ymin) / (windowSize.ymax - windowSize.ymin);
    return { x: xv, y: yv }
  }

  public polygon(...points: { x: number, y: number }[]) {
    for (let i = 0; i < points.length; i++) {
      const p1 = points[i];
      const p2 = points[(i + 1) % points.length];
      this.line(Math.round(p1.x), Math.round(p1.y), Math.round(p2.x), Math.round(p2.y));
    }
  }

  public translate(dot: { x: number, y: number }, dx: number, dy: number) {
    const x = dot.x + dx;
    const y = dot.y + dy;
    return { x, y }
  }
  public rotate(dot: { x: number, y: number }, angle: number) {
    const x = dot.x * Math.cos(angle) - dot.y * Math.sin(angle);
    const y = dot.x * Math.sin(angle) + dot.y * Math.cos(angle);
    return { x, y }
  }
}

export default Pen;
