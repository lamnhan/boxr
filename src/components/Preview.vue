<script lang="ts" setup>
  import {ref, defineProps, onMounted, onUpdated} from 'vue';
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
    AxesHelper,
    MathUtils
  } from 'three';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
  
  import {DesignSide} from '../types/design';

  import defaultT0 from '../assets/tex1.jpeg';
  import defaultT1 from '../assets/image.png';

  const props = defineProps<{
    designSide: DesignSide;
    textureData: Record<string, string>;
  }>();

  const previewContainerRef = ref()

  const PX2M = 0.00026458333333719;

  const scene = new Scene()
  const camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, .1, 1000)
  camera.position.set(0, 0, .2)
  const renderer = new WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  const controls = new OrbitControls(camera, renderer.domElement)
  const light = new AmbientLight(0xffffff);

  scene.background = new Color(0xf1f1f1);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.minDistance = .2;
  controls.maxDistance = .3;

  scene.add(new AxesHelper(10))

  function renderObject() {
    while(scene.children.length > 0){ 
      scene.remove(scene.children[0]); 
    }
    scene.add(light);
    props.designSide.parts.forEach(partData => {
      const {id, w, h, pc} = partData
      const {x, y, z, r: {x: rX, y: rY, z: rZ} = {}} = pc
      const positionX = x * PX2M
      const positionY = y * PX2M
      const positionZ = z * PX2M
      const width = w * PX2M
      const height = h * PX2M
      const t1 = props.textureData[id]
  
      const texture = new TextureLoader().load(t1 || defaultT1);
      const plane = new Mesh(
        new PlaneGeometry(width, height),
        new MeshLambertMaterial({ map: texture })
      )
      plane.position.set(positionX, positionY, positionZ)
      if (rX) plane.rotateX(MathUtils.degToRad(rX))
      if (rY) plane.rotateY(MathUtils.degToRad(rY))
      if (rZ) plane.rotateZ(MathUtils.degToRad(rZ))
  
      scene.add(plane);
    })
  }

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }

  onMounted(() => {
    const previewContainerEl = previewContainerRef.value
    previewContainerEl.appendChild(renderer.domElement)
    animate()
  })

  onUpdated(() => {
    renderObject()
    animate()
  })
</script>

<template>
  <div ref="previewContainerRef"></div>
</template>

<style lang="scss" scoped></style>
