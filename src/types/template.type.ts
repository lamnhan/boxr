export interface Template {
  id: number;
  slug: string;
  title: string;
  category_id: number;
  default_material_id: number;
  display_size: string;
  base_price: number;
  sale_off: number;
  thumbnail: string;
  spec: TemplateSpec;
}

export interface TemplateSpec {
  units: TemplateUnit[];
}

export interface TemplateUnit {
  id: number;
  title: string;
  thumbnail: string;
  width_2d: number;
  height_2d: number;
  width_3d: number;
  height_3d: number;
  folding_lines: string;
  parts: TemplatePart[];
}

export interface TemplatePart {
  id: number;
  x: number;
  y: number;
  w: number;
  h: number;
  c?: Clipping;
  pc?: Placement; // closed
  po?: Placement; // opened
  // cylindrical only
  rT?: number;
  rB?: number;
}

export interface Placement {
  g: Geometry;
  x: number;
  y: number;
  z: number;
  r?: {
    x?: number;
    y?: number;
    z?: number;
  }
}

export interface Clipping {
  x: number;
  y: number;
  p: string;
  s?: Clipping[];
}

export type PlacementMode = 'closed' | 'opened';

export type Geometry = 'rectangle' | 'circle' | 'cylinder' | 'triangle' | 'heart';
