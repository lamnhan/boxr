
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  AmbientLight,
  PlaneGeometry,
  MeshLambertMaterial,
  TextureLoader,
  Mesh,
  Color,
  MathUtils,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import {TemplatePart, PlacementMode} from '../types/template.type';

export interface RenderData {
  outsideParts: Record<string, TemplatePart>;
  insideParts: Record<string, TemplatePart>;
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
    // for (let i = 0; i < this.scene.children.length; i++) {
    //   const child = this.scene.children[i];
    //   if (child.type !== 'AmbientLight') {
    //     this.scene.remove(child);
    //   }
    // }
    while(this.scene.children.length > 0){ 
      this.scene.remove(this.scene.children[0]);
    }
    return this as Preview3D;
  }
  
  renderObject(placement: PlacementMode, {outsideParts, insideParts, outsideTextures, insideTextures}: RenderData) {
    this.scene.add(this.light);
    this.renderParts(placement, outsideParts, outsideTextures);
    // this.renderParts(placement, insideParts, insideTextures);
    return this as Preview3D;
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    return this as Preview3D;
  }

  private renderParts(placement: PlacementMode, parts: Record<string, TemplatePart>, textures: Record<string, string>) {
    const placementMap: Record<string, 'pc' | 'po' | 'pd'> = {closed: 'pc', opened: 'po', dissected: 'pd'};
    Object.keys(parts).forEach(id => {
      const part = parts[id];
      const {w, h} = part;
      const placementData = part[placementMap[placement]];
      if (!placementData) return; // no pleacement
      const {g, x: pX, y: pY, z: pZ, r: {x: rX, y: rY, z: rZ} = {}} = placementData;
      const textureUrl = textures[id]
      // load texture
      const texture = new TextureLoader().load(textureUrl);
      // build shape
      let mesh: Mesh;
      switch (g) {
        case 'rectangle':
        default:
          mesh = new Mesh(
            new PlaneGeometry(w, h),
            new MeshLambertMaterial({ map: texture })
          )
      }
      // set position/rotation
      mesh.position.set(pX, pY, pZ)
      if (rX) mesh.rotateX(MathUtils.degToRad(rX))
      if (rY) mesh.rotateY(MathUtils.degToRad(rY))
      if (rZ) mesh.rotateZ(MathUtils.degToRad(rZ))
      // render
      this.scene.add(mesh);
    })
  }

}
