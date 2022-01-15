
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  AmbientLight,
  PlaneGeometry,
  Mesh,
  Group,
  Color,
  MeshLambertMaterial,
  TextureLoader,
  MathUtils,
  AxesHelper
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import {TemplatePart, PlacementMode, TemplateUnit} from '../types/template.type';

export interface TextureData {
  outsideTextures: Record<string, string>;
  insideTextures: Record<string, string>;
}

export class Preview3D {
  scale!: {max_width: number, max_height: number};
  scene!: Scene;
  camera!: PerspectiveCamera;
  renderer!: WebGLRenderer;
  controls!: OrbitControls;
  light!: AmbientLight;

  constructor() {}

  setScale(max_width: number, max_height: number) {
    this.scale = {max_width, max_height};
    return this as Preview3D;
  }

  renderCanvas(container: HTMLElement) {
    const viewPosition = Math.max(this.scale.max_height, this.scale.max_height) * 1.5
    this.scene = new Scene()
    this.camera = new PerspectiveCamera(50, window.innerWidth / (window.innerHeight - 75), .001, 10000)
    this.camera.position.set(0, 0, viewPosition)
    this.renderer = new WebGLRenderer()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.light = new AmbientLight(0xffffff);
    this.scene.background = new Color(0xf1f1f1);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.minDistance = viewPosition;
    this.controls.maxDistance = viewPosition * 3;
    container.appendChild(this.renderer.domElement)
    this.scene.add(new AxesHelper(10))
    return this as Preview3D;
  }

  clear() {
    while (this.scene.children.length > 0) {
      this.scene.remove(this.scene.children[0]);
    }
    return this as Preview3D;
  }
  
  renderDesign(mode: PlacementMode, unit: TemplateUnit, textureData: TextureData) {
    this.scene.add(this.light);
    this.renderParts(mode, unit.parts, textureData);
    return this as Preview3D;
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    return this as Preview3D;
  }

  private renderParts(mode: PlacementMode, parts: TemplatePart[], {outsideTextures, insideTextures}: TextureData) {
    const placementMap: Record<string, 'pc' | 'po'> = {closed: 'pc', opened: 'po'};
    parts.forEach(item => {
      const {id, w, h} = item;
      const placementData = item[placementMap[mode]];
      if (!placementData) return; // no pleacement
      const {g, x: pX, y: pY, z: pZ, r: {x: rX, y: rY, z: rZ} = {}} = placementData;
      const outsideTextureUrl = outsideTextures[id]
      const insideTextureUrl = insideTextures[id]
      // load textures
      const outsideTexture = new TextureLoader().load(outsideTextureUrl);
      const insideTexture = new TextureLoader().load(insideTextureUrl);
      // build shape
      const group = new Group();
      switch (g) {
        case 'rectangle':
        default:
          const outsideMesh = new Mesh(
            new PlaneGeometry(w, h),
            new MeshLambertMaterial({ map: outsideTexture })
          )
          const insideMesh = new Mesh(
            new PlaneGeometry(w, h),
            new MeshLambertMaterial({ map: insideTexture })
          )
          insideMesh.rotateY(Math.PI);
          group.add(outsideMesh, insideMesh);
      }
      // set position/rotation
      if (rX) group.rotateX(MathUtils.degToRad(rX))
      if (rY) group.rotateY(MathUtils.degToRad(rY))
      if (rZ) group.rotateZ(MathUtils.degToRad(rZ))
      group.position.set(pX, pY, pZ)
      // render
      this.scene.add(group);
    })
  }

}
