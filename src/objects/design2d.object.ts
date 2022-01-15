import {fabric} from 'fabric'

import {TemplateUnit, TemplatePart} from '../types/template.type';
import {DesignData} from '../types/design.type';
import {TextureName} from '../types/material.type';

import {debounce} from '../helpers'
import {Scale} from '../scale'

export class Design2D {
  scale!: Scale;
  canvas!: fabric.Canvas;

  side!: TextureName;
  designData!: DesignData;
  unit!: TemplateUnit;

  constructor() {}

  setScale(max_width: number, max_height: number) {
    this.scale = new Scale(
      [(window.innerWidth - 200) * .9, (window.innerHeight - 100) * .9],
      [max_width, max_height]
    )
    return this as Design2D;
  }

  createCanvas() {
    return this.buildCanvas();
  }
  
  renderCanvas(id: string, changedHandler?: Function) {
    return this.buildCanvas(id, changedHandler);
  }

  clear() {
    this.canvas.clear();
    return this as Design2D;
  }

  toJSON() {
    return this.canvas.toJSON();
  }

  renderDesign(side: TextureName, designData: DesignData, unit: TemplateUnit) {
    this.side = side;
    this.designData = designData;
    this.unit = unit;
    this.renderBackdrop();
    return this as Design2D;
  }

  getDataUrls() {
    return this.getParts().reduce(
      (result, part) => {
        result[part.id] = this.sliceImage(part);
        return result;
      },
      {} as Record<string, string>
    )
  }

  private getParts() {
    return this.side === 'front'
      ? this.unit.parts
      : this.unit.parts.map(item => ({ ...item, y: this.unit.width_2d - item.y - item.w }))
  }

  private renderBackdrop() {
    this.getParts().forEach(item => {
      const {id, x, y, w, h} = item;
      const width = this.scale.getPixels(w)
      const height = this.scale.getPixels(h)
      const top = this.scale.getPixels(x)
      const left = this.scale.getPixels(y)
      const fill = this.designData.colors[this.side] || this.designData.colors['front']
      const rect = new fabric.Rect({ width, height, top, left, fill, selectable: false })
      this.canvas.add(rect)
      // helper text
      const txt = new fabric.Text(this.side === 'front' ? `${id}` : `-${id}`, { left, top, fontSize: 30, selectable: false })
      this.canvas.add(txt)
    })
  }

  private buildCanvas(id?: string, changedHandler?: Function) {
    const input = id ? id : document.createElement('canvas');
    // init fabric
    this.canvas = new fabric.Canvas(input)
    this.canvas.setWidth(this.scale.W)
    this.canvas.setHeight(this.scale.H)
    // changes
    const onChanged = debounce(changedHandler || (() => undefined), 1000)
    this.canvas.on('object:added', () => onChanged(this))
    this.canvas.on('object:removed', () => onChanged(this))
    this.canvas.on('object:modified', () => onChanged(this))
    // done
    return this as Design2D;
  }

  private sliceImage(partData: TemplatePart) {
    const top = this.scale.getPixels(partData.x);
    const left = this.scale.getPixels(partData.y);
    const width = this.scale.getPixels(partData.w);
    const height = this.scale.getPixels(partData.h);
    return this.canvas.toDataURL({ format: 'png', top, left, width, height });
  }
}
