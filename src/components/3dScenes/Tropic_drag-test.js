import React, { Component } from "react";
import * as THREE from "three";
import { DragControls } from "three/examples/jsm/controls/DragControls";
//
//
const style = {
  height: 600, // we can control scene size by setting container dimensions
};
//

class TropicDragTest extends Component {
  componentDidMount() {
    // Here you are calling all the functions below
    this.sceneSetup();
    this.addCustomSceneObjects();
    this.startAnimationLoop();
    //
    window.addEventListener("resize", this.handleWindowResize);
  }
  //
  //
  componentWillUnmount() {
    // this is related to the event listeners that cause problems when using the resizing
    window.removeEventListener("resize", this.handleWindowResize);
    window.cancelAnimationFrame(this.requestID);

    // this.controls.dispose();
  }
  /*


                                            ***  1   ***



  */
  sceneSetup = () => {
    //
    //                WIDTH/HEIGHT
    // --------------------------------------------
    //
    const width = this.eleModelBlOne.clientWidth;
    const height = this.eleModelBlOne.clientHeight;
    //
    // --------------------------------------------

    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    // this.camera.position.y = 10;
    //
    this.camera.position.z = 3;
    //
    this.scene = new THREE.Scene();
    // this.scene.background = new THREE.Color(0xffffff);
    //
    //
    this.loader = new THREE.TextureLoader();
    //
    // ---------------------------------------
    //                  RENDERER
    // ---------------------------------------
    //
    this.renderer = new THREE.WebGL1Renderer({
      alpha: true,
      // will make the edges smooth
      antialias: true,
    });
    //
    this.renderer.setSize(width, height);
    // BG color from the scene
    // showMap is connected to the shadows in any object/model
    this.renderer.shadowMap.enabled = true;
    // here you append it to the jsx
    this.eleModelBlOne.appendChild(this.renderer.domElement); // mount using React ref
    // document.appendChild(this.renderer.domElement);  //before
    //

    //
    //

    //
    //
  };

  /*


                                            ***  2  ***



  */
  addCustomSceneObjects = () => {
    //

    //
    //

    this.geometryDrag = new THREE.BoxGeometry();
    //const material: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000, transparent: true })
    //const cube: THREE.Mesh = new THREE.Mesh(geometry, material)
    //scene.add(cube)

    this.materialDrag = [
      new THREE.MeshPhongMaterial({
        // wireframe: true,
        // map: THREE.ImageUtils.loadTexture("/images/mario-bros-3.gif"),
        color: 0xeeff00,
        transparent: true,
      }),
      new THREE.MeshPhongMaterial({ color: 0xff0000, transparent: true }),
      new THREE.MeshPhongMaterial({ color: 0xff5a00, transparent: true }),
    ];
    //
    this.cubesDrag = [
      new THREE.Mesh(this.geometryDrag, this.materialDrag[0]),
      new THREE.Mesh(this.geometryDrag, this.materialDrag[1]),
      new THREE.Mesh(this.geometryDrag, this.materialDrag[2]),
    ];
    //
    this.cubesDrag[0].position.x = -2;
    this.cubesDrag[1].position.x = 0;
    this.cubesDrag[2].position.x = 2;
    //
    // add "each" cubesDrag to the scene
    this.cubesDrag.forEach((c) => this.scene.add(c));
    //
    //
    //
    //

    //
    //---------------------------
    //    DRAG CONTROLS
    //---------------------------
    this.controls = new DragControls(
      this.cubesDrag,
      this.camera,
      this.renderer.domElement
    );
    //
    //

    //----------------------------------
    //         BLENDER  MODELS
    //----------------------------------
    //

    //---------------------
    //   Directional Light
    //---------------------
    //
    // //
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.autoUpdate = true;
    this.renderer.gammaFactor = 2.2;

    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(5, -1, 100);

    // position as follow , the light comes from x:-1000, comes from: y and the last comes from : z
    directionalLight.position.set(1000, 1000, 1000);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera = new THREE.OrthographicCamera(
      -100,
      200,
      -200,
      200,
      0.5,
      5000
    );
    // //
    this.scene.add(directionalLight);
    // The light points to the flat ground
    // this.directionalLight.target = this.plane;  //dont add this
    //
    //
    //THIS LIGHT IS ON THE BOTTOM
    //---------------------
    //     spotLight FF5733
    //---------------------
    //

    // With the light you can see the colors you added to each geometry in the materials
    this.spotLight = new THREE.SpotLight(0xffffff, 0.5); //intensity:   0.5);
    // spotLight.position.set( 0 , 10 , 0 );
    this.spotLight.position.set(5, -50, 0); //x, y , z   original (5, -50, 0);
    // (2, 32, 32); with this settings the light will be on the front
    this.spotLight.castShadow = true;
    //
    // this will remove the shadows
    this.spotLight.visible = true;
    //
    this.scene.add(this.spotLight);
    // //
    //
    //
  };
  /*


                                            ***  3   ***



  */

  startAnimationLoop = () => {
    //

    this.requestID = window.requestAnimationFrame(this.startAnimationLoop);

    this.cubesDrag[0].rotation.x += 0.01;
    this.cubesDrag[0].rotation.y += 0.011;
    this.cubesDrag[1].rotation.x += 0.012;
    this.cubesDrag[1].rotation.y += 0.013;
    this.cubesDrag[2].rotation.x += 0.014;
    this.cubesDrag[2].rotation.y += 0.015;

    this.renderer.render(this.scene, this.camera);
  };
  /*






  */
  handleWindowResize = () => {
    const width = this.eleModelBlOne.clientWidth;
    const height = this.eleModelBlOne.clientHeight;
    //
    // updated renderer
    this.renderer.setSize(width, height);
    // updated **camera** aspect ratio
    this.camera.aspect = width / height;
    // That is the Three.js optimization: you can group multiple camera changes into a block with only one
    this.camera.updateProjectionMatrix();
  };
  /*






  */

  render() {
    return (
      <div className="scene-oblivion">
        {/* --------------------- */}

        {/* --------------------- */}
        {/* --------------------- */}
        <div
          className="modelBleOne"
          style={style}
          ref={(ref) => (this.eleModelBlOne = ref)}
        ></div>
        {/* --------------------- */}
        {/* --------------------- */}
        {/* --------------------- */}
      </div>
    );
  }
}

export default TropicDragTest;
