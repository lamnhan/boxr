export interface Template {
  units: TemplateUnit[];
  sc: number;
}

export interface TemplateUnit {
  inside: TemplateSide;
  outside: TemplateSide;
}

export interface TemplateSide {
  parts: TemplatePart[];
}

export interface TemplatePart {
  id: number;
  x: number;
  y: number;
  w: number;
  h: number;
  pc: PartPlacement;
  po: PartPlacement;
  t0: TextureCode;
}

export interface PartPlacement {
  x: number;
  y: number;
  z: number;
  r?: {
    x?: number;
    y?: number;
    z?: number;
  }
}

export type TextureCode = 'SIN' | 'SOUT'