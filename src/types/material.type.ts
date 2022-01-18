export interface Material {
  id: number;
  slug: string;
  title: string;
  offset_price: number;
  thickness: number;
  textures: MaterialTextures;
}

export interface MaterialTextures {
  front: Texture;
  back?: Texture;
  side?: Texture;
}

export interface Texture {
  title?: string;
  colors: string[];
  customizable?: boolean;
  effect?: {
    src: string;
    mode: string;
  };
}
