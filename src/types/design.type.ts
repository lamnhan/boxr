import {Category} from './category.type'
import {Template} from './template.type'
import {Material} from './material.type';

export interface Design {
  id: number;
  slug: string;
  title: string;
  created_at: string;
  updated_at: string;
  category_id: number;
  template_id: number;
  material_id: number;
  design_data: DesignData;
}

export interface DesignData {
  front: DesignDataBySide;
  back: DesignDataBySide;
}

export interface DesignDataBySide {
  showBackdrop: boolean;
  showNumbering: boolean;
  color: string;
  canvasJSON: string;
}

export interface EditingData {
  category: Category;
  template: Template;
  material: Material
}

export type DesignSide = keyof DesignData;
