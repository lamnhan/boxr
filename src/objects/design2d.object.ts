import {fabric} from 'fabric'

import {TemplatePart} from '../types/template.type';
import {DesignData} from '../types/design.type';
import {TextureName} from '../types/material.type';

import {debounce} from '../helpers'
import {Scale} from '../scale'

export class Design2D {
  scale!: Scale;
  canvas!: fabric.Canvas;

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

  renderBackdrop(side: string, designData: DesignData, parts: Record<string, TemplatePart>) {
    const sideMap: Record<string, TextureName> = {inside: 'back', outside: 'front'}
    Object.keys(parts).forEach(id => {
      const {x, y, w, h} = parts[id]
      const width = this.scale.getPixels(w)
      const height = this.scale.getPixels(h)
      const top = this.scale.getPixels(x)
      const left = this.scale.getPixels(y)
      const fill = designData.colors[sideMap[side] || sideMap['outside']]
      const part = new fabric.Rect({ width, height, top, left, fill, selectable: false })
      this.canvas.add(part)
      // helper text
      const helperText = new fabric.Text(id, { left, top, fontSize: 30, selectable: false })
      this.canvas.add(helperText)
    })
    return this as Design2D;
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

  getDataUrlsByParts(parts: Record<string, TemplatePart>) {
    const dataUrls = Object.keys(parts).reduce(
      (result, id) => {
        result[id] = this.sliceImage(parts[id]);
        return result;
      },
      {} as Record<string, string>
    )
    return dataUrls;
  }

  private sliceImage(partData: TemplatePart) {
    const top = this.scale.getPixels(partData.x);
    const left = this.scale.getPixels(partData.y);
    const width = this.scale.getPixels(partData.w);
    const height = this.scale.getPixels(partData.h);
    return this.canvas.toDataURL({ format: 'png', top, left, width, height });
  }
}
