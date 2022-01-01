import {TemplateSide, TemplatePart} from './template';

export interface Design {
  units: DesignUnit[];
  sc: number;
}

export interface DesignUnit {
  inside: DesignSide;
  outside: DesignSide;
}

export interface DesignSide extends TemplateSide {
  image: string;
}

export interface DesignPart extends TemplatePart {}
