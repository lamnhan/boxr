import {fabric} from 'fabric'
import {jsPDF} from 'jspdf'
import 'svg2pdf.js'

import {TemplateUnit, TemplatePart} from '../types/template.type';
import {DesignDataBySide, DesignSide} from '../types/design.type';

import {debounce} from '../helpers'
import {Scale} from '../scale'

export class Design2D {
  scale!: Scale;
  canvas!: fabric.Canvas;
  silentCanvas = false;
  skipChanged = false;

  side!: DesignSide;
  data!: DesignDataBySide;
  unit!: TemplateUnit;
  parts!: TemplatePart[];

  backdropObjects: fabric.Object[] = [];
  numberingObjects: fabric.Object[] = [];

  constructor() {}

  setScale(max_width: number, max_height: number) {
    this.scale = new Scale(
      [(window.innerWidth - 200) * .9, (window.innerHeight - 140) * .9],
      [max_width, max_height]
    )
    return this as Design2D;
  }

  createCanvas() {
    this.silentCanvas = true;
    return this.buildCanvas();
  }
  
  renderCanvas(id: string, changedHandler?: Function) {
    return this.buildCanvas(id, changedHandler);
  }

  clear() {
    this.skipChanged = true;
    this.canvas.clear();
    return this as Design2D;
  }

  toJSON() {
    return this.canvas.toJSON();
  }

  renderDesign(side: DesignSide, data: DesignDataBySide, unit: TemplateUnit): Promise<Design2D> {
    this.side = side;
    this.data = data;
    this.unit = unit;
    this.parts = this.getParts();
    // global objects
    this.buildGlobalObjects();
    // render design
    return new Promise(resolve => {
      this.canvas.loadFromJSON(this.data.canvasJSON, () => {
        if (this.silentCanvas || data.showBackdrop) this.toggleBackdrop()
        if (data.showNumbering) this.toggleNumbering()
        resolve(this);
      })
    });
  }

  getDataUrls() {
    return this.parts.reduce(
      (result, part) => {
        result[part.id] = this.sliceImage(part);
        return result;
      },
      {} as Record<string, string>
    )
  }

  toggleBackdrop(isShow = true) {
    this.skipChanged = true;
    this.data.showBackdrop = isShow;
    this.backdropObjects.forEach(obj =>
      isShow
        ? this.canvas.add(obj).sendToBack(obj)
        : this.canvas.remove(obj)
    )
  }

  toggleNumbering(isShow = true) {
    this.skipChanged = true;
    this.data.showNumbering = isShow;
    this.numberingObjects.forEach(obj =>
        isShow
          ? this.canvas.add(obj).bringToFront(obj)
          : this.canvas.remove(obj)
    )
  }

  addText() {
    const text = new fabric.IText('Lorem ipsum', { fontSize: 32 });
    this.canvas.add(text)
    this.rearrangeHelpers();
  }
  
  addImage(url: string) {
    const imageEl = document.createElement('img');
    imageEl.addEventListener('load', () => {
      const image = new fabric.Image(imageEl);
      this.canvas.add(image);
      this.rearrangeHelpers();
    })
    imageEl.src = url;
  }

  async toPDF() {
    const width = this.scale.W
    const height = this.scale.H
    // create svg
    const svgStr = this.canvas.toSVG()
    const docParser = new DOMParser();
    const svgDoc = docParser.parseFromString(svgStr, 'image/svg+xml');
    // create pdf
    const pdfDoc = new jsPDF({ orientation: 'landscape', unit: 'px', format: [width, height] })
    await pdfDoc.svg(svgDoc.documentElement, { width, height });
    // result
    return pdfDoc;
  }

  private getParts() {
    return this.side === 'front'
      ? this.unit.parts
      : this.unit.parts.map(item => ({ ...item, x: this.unit.width_2d - item.x - item.w }))
  }

  private rearrangeHelpers() {
    if (!this.data.showNumbering) return
    this.numberingObjects.forEach(obj => this.canvas.bringToFront(obj))
  }

  private buildGlobalObjects() {
    this.backdropObjects = [];
    this.numberingObjects = [];
    this.parts.forEach(item => {
      const {id, x, y, w, h} = item;
      const width = this.scale.getPixels(w)
      const height = this.scale.getPixels(h)
      const top = this.scale.getPixels(y)
      const left = this.scale.getPixels(x)
      // backdrop
      const fill = this.data.color
      const rect = new fabric.Rect({
        width,
        height,
        top,
        left,
        fill,
        selectable: false,
        excludeFromExport: true
      })
      this.backdropObjects.push(rect)
      // part numbering
      const txt = new fabric.Text(
        this.side === 'front' ? `${id}` : `-${id}`,
        {
          left: left + 5,
          top: top + 5,
          fontSize: 16,
          fill: 'rgba(0, 0, 0, 0.5)',
          selectable: false,
          excludeFromExport: true
        }
      )
      this.numberingObjects.push(txt)
    })
  }

  private buildCanvas(id?: string, changedHandler?: Function) {
    const input = id ? id : document.createElement('canvas');
    // init fabric
    this.canvas = new fabric.Canvas(input)
    this.canvas.setWidth(this.scale.W)
    this.canvas.setHeight(this.scale.H)
    // changes
    const onChanged = debounce((instance: Design2D) => {
      if (!this.skipChanged && changedHandler) changedHandler(instance)
      this.skipChanged = false;
    }, 1000)
    this.canvas.on('object:added', () => onChanged(this))
    this.canvas.on('object:removed', () => onChanged(this))
    this.canvas.on('object:modified', () => onChanged(this))
    // done
    return this as Design2D;
  }

  private sliceImage(partData: TemplatePart) {
    const top = this.scale.getPixels(partData.y);
    const left = this.scale.getPixels(partData.x);
    const width = this.scale.getPixels(partData.w);
    const height = this.scale.getPixels(partData.h);
    return this.canvas.toDataURL({ format: 'png', top, left, width, height });
  }
}
