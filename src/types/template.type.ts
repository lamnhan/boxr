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
  cpc: Placement;
  cpd: Placement;
  cpo: Placement;
  outside: TemplateSide;
  inside: TemplateSide;
}

export interface TemplateSide {
  parts: Record<string, TemplatePart>;
}

export interface TemplatePart {
  x: number;
  y: number;
  w: number;
  h: number;
  c?: string;
  pc?: Placement; // closed
  pd?: Placement; // dissected
  po?: Placement; // opened
}

export type TemplateSideName = 'inside' | 'outside';

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

export type PlacementMode = 'closed' | 'dissected' | 'opened';

export type Geometry =
  | 'unit' // coordinated placement only
  | 'rectangle' | 'triangle' | 'circle' | 'cylinder' | 'heart'; // and more ...
