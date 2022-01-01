import {Category} from './category.type'
import {Template} from './template.type'
import {Material, TextureName} from './material.type';

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
  colors: {
    [key in TextureName]: string;
  };
}

export interface EditingData {
  category: Category;
  template: Template;
  material: Material
}
