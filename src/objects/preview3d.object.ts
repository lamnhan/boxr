
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  AmbientLight,
  PlaneGeometry,
  CircleGeometry,
  CylinderGeometry,
  Mesh,
  Group,
  Color,
  MeshBasicMaterial,
  TextureLoader,
  FrontSide,
  BackSide,
  MathUtils
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
      const outsideMaterial = new MeshBasicMaterial({
        map: new TextureLoader().load(outsideTextureUrl),
        transparent: true,
      })
      const insideMaterial = new MeshBasicMaterial({
        map: new TextureLoader().load(insideTextureUrl),
        transparent: true,
      })
      // build shape
      let meshes!: { outsideMesh: Mesh, insideMesh: Mesh };
      switch (g) {
        case 'cylinder':
          const r = w / (2 * Math.PI)
          meshes = this.buildCylinder(r, r, h, outsideMaterial, insideMaterial);
          break;
        case 'circle':
          meshes = this.buildCircle(w / 2, outsideMaterial, insideMaterial);
          break;
        case 'rectangle':
        default:
          meshes = this.buildRectangle(w, h, outsideMaterial, insideMaterial);
      }
      // group
      const group = new Group().add(meshes.outsideMesh, meshes.insideMesh);
      // set position/rotation
      if (rX) group.rotateX(MathUtils.degToRad(rX))
      if (rY) group.rotateY(MathUtils.degToRad(rY))
      if (rZ) group.rotateZ(MathUtils.degToRad(rZ))
      group.position.set(pX, pY, pZ)
      // render
      this.scene.add(group);
    })
  }

  private buildRectangle(w: number, h: number, outsideMaterial: MeshBasicMaterial, insideMaterial: MeshBasicMaterial) {
    const geometry = new PlaneGeometry(w, h)
    const outsideMesh = new Mesh(geometry, outsideMaterial)
    const insideMesh = new Mesh(geometry, insideMaterial).rotateY(Math.PI)
    return { outsideMesh, insideMesh };
  }

  private buildCircle(r: number, outsideMaterial: MeshBasicMaterial, insideMaterial: MeshBasicMaterial) {
    const geometry = new CircleGeometry(r, 100);
    const outsideMesh = new Mesh(geometry, outsideMaterial)
    const insideMesh = new Mesh(geometry, insideMaterial).rotateY(Math.PI)
    return { outsideMesh, insideMesh };
  }

  private buildCylinder(rT: number, rB: number, h: number, outsideMaterial: MeshBasicMaterial, insideMaterial: MeshBasicMaterial) {
    const geometry = new CylinderGeometry(rT, rB, h, 100, 1, true);
    outsideMaterial.side = FrontSide;
    const outsideMesh = new Mesh(geometry, outsideMaterial)
    insideMaterial.side = BackSide;
    const insideMesh = new Mesh(geometry, insideMaterial)
    return { outsideMesh, insideMesh };
  }

}
