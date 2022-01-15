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
  title: string
  width_2d: number;
  height_2d: number;
  width_3d: number;
  height_3d: number;
  parts: TemplatePart[];
}

export interface TemplatePart {
  id: number;
  x: number;
  y: number;
  w: number;
  h: number;
  c?: string;
  pc?: Placement; // closed
  po?: Placement; // opened
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

export type PlacementMode = 'closed' | 'opened';

export type Geometry =
  | 'unit' // coordinated placement only
  | 'rectangle' | 'triangle' | 'circle' | 'cylinder' | 'heart'; // and more ...
