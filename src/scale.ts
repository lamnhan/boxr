export const PX2M = 0.00026458333333719;

export class Scale {
  private width!: number
  private height!: number
  private scaleCorrection!: number

  constructor(private canvasLength: [number, number], private designLength: [number, number]) {
    const [cW, cH] = this.canvasLength;
    const [dW, dH] = this.designLength.map(item => item / PX2M);
    this.scaleCorrection = dW > cW || dH > cH ? Math.min(cW / dW, cH / dH) : 1
    this.width = dW * this.scaleCorrection
    this.height = dH * this.scaleCorrection
  }

  get W() {
    return this.width
  }

  get H() {
    return this.height
  }

  get SC() {
    return this.scaleCorrection
  }

  getMeters(length: number) {
    return length * this.scaleCorrection
  }

  getPixels(length: number) {
    return length * this.scaleCorrection / PX2M
  }
}
