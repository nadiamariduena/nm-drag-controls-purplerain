import React, { Component } from "react";
import * as THREE from "three";
// import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";
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
    //   You will need this to show the boxes
    // ----------------
    this.objects = [];
    //----------------
    this.vertex = new THREE.Vector3();
    this.color = new THREE.Color();
    //
    //                WIDTH/HEIGHT
    // --------------------------------------------
    //
    const width = this.eleModelBlOne.clientWidth;
    const height = this.eleModelBlOne.clientHeight;
    //
    // --------------------------------------------
    //
    //
    // ---------------
    // Create a camera
    // ---------------
    //
    // 	Set a Field of View (FOV) of 75 degrees
    // 	Set an Apsect Ratio of the inner width divided by the inner height of the window
    //	Set the 'Near' distance at which the camera will start rendering scene objects to 2
    //	Set the 'Far' (draw distance) at which objects will not be rendered to 1000
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    this.camera.position.y = 10;
    //
    this.scene = new THREE.Scene();
    // this.scene.background = new THREE.Color(0xffffff);
    //
    //
    //
    // ---------------------------------------
    //                  RENDERER
    // ---------------------------------------
    //
    this.renderer = new THREE.WebGL1Renderer({
      antialias: true, // will make the edges smooth
      // set the transparency of the scene, otherwise its black
      // alpha: true,
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
    this.blocker.appendChild(this.renderer.domElement);

    //
    //
    //---------------------------
    //
    //---------------------------

    //
    //
    //
    //
    //
    //
    //-------------------------------
    //             KEYS
    //-------------------------------

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
    // ---------------
    // floor Geometry
    // ---------------
    // How large do you want the floor, i added 2000 x 2000
    this.floorGeometry = new THREE.PlaneGeometry(2000, 2000, 100, 100);
    this.floorGeometry.rotateX(-Math.PI / 2);
    //
    //-------------------
    // vertex displacement
    //-------------------
    //
    let position = this.floorGeometry.attributes.position;
    //
    for (let i = 0, l = position.count; i < l; i++) {
      // Color and Position attributes of bufferGeometry
      //  check this exmaple to understand what is happening here:
      /*
      I am doing is making an array of colors (3 elements per 
        vertex representing rgb) and then trying to add it as an 
        attribute to the geometry, and I am trying to make vertices
         of different heights different colors
      
      */
      // https://stackoverflow.com/questions/50780187/three-js-color-and-position-attributes-of-buffergeometry-use-different-vertices
      this.vertex.fromBufferAttribute(position, i);
      this.vertex.x += Math.random() * 20 - 10;
      this.vertex.y += Math.random() * 2;
      this.vertex.z += Math.random() * 20 - 10;
      position.setXYZ(i, this.vertex.x, this.vertex.y, this.vertex.z);
    }
    // ensure each face has unique vertices  **
    this.floorGeometry = this.floorGeometry.toNonIndexed();
    //
    position = this.floorGeometry.attributes.position;
    //
    //
    //
    //
    //--------------
    // colorsFloor
    //--------------
    const colorsFloor = [];
    //
    // what makes the triangles of the floor have different colors
    for (let i = 0, l = position.count; i < l; i++) {
      //
      // here you are generating random colors HSL
      //   this.color is being picked from the variable on top "   this.color = new THREE.Color();"  linked to the Three modules
      this.color.setHSL(
        Math.random() * 0.3 + 0.5,
        0.75,
        Math.random() * 0.25 + 0.75
      );
      colorsFloor.push(this.color.r, this.color.g, this.color.b);
    }
    //
    this.floorGeometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(colorsFloor, 3)
    );
    //
    //
    this.floorMaterial = new THREE.MeshBasicMaterial({ vertexColors: true });
    //
    //
    // ------------ Here you add to the scene all the ABOVE -----
    this.floor = new THREE.Mesh(this.floorGeometry, this.floorMaterial);
    this.scene.add(this.floor);
    //
    //
    //
    //
    //
    //
    //
    //
    // ---------
    // BOXES GEOMETRY
    // ---------
    // .toNonIndexed();  ensure each face has unique vertices
    // SIZE of the boxes
    this.boxGeometry = new THREE.BoxGeometry(20, 20, 20).toNonIndexed();
    //
    position = this.boxGeometry.attributes.position;
    //
    //
    //--------------
    // colors Box
    //--------------
    //
    //
    const colorsBox = [];
    //
    for (let i = 0, l = position.count; i < l; i++) {
      this.color.setHSL(
        // the different colors that will be picket randomly for the boxes, this "0.75" is the intensity of it ..will
        // make them look kind of pastel.
        Math.random() * 0.3 + 0.5,
        0.75,
        Math.random() * 0.25 + 0.75
      );
      colorsBox.push(this.color.r, this.color.g, this.color.b);
    }
    //
    this.boxGeometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(colorsBox, 3)
    );
    //
    //
    //
    //
    // the 500 correspond to the amount of boxes
    // the material is MeshPhong, apparently its a good material to cast shadows
    for (let i = 0; i < 500; i++) {
      //
      // the material of the box
      const boxMaterial = new THREE.MeshPhongMaterial({
        specular: 0xffffff,
        flatShading: true,
        vertexColors: true,
        // push a colour per vertex
      });
      //   color
      boxMaterial.color.setHSL(
        Math.random() * 0.2 + 0.5,
        0.75,
        Math.random() * 0.25 + 0.75
      );
      // ---------
      // BOX
      // ---------
      // Here you are positioning the 500 boxes randomly , playing with the x, y ,z
      const box = new THREE.Mesh(this.boxGeometry, boxMaterial);
      box.position.x = Math.floor(Math.random() * 20 - 10) * 20;
      box.position.y = Math.floor(Math.random() * 20) * 20 + 10;
      box.position.z = Math.floor(Math.random() * 20 - 10) * 20;

      this.scene.add(box);
      this.objects.push(box);
    }
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
        <div className="blocker" ref={(ref) => (this.blocker = ref)}>
          {" "}
        </div>{" "}
        {/* --------------------- */}
        {/* --------------------- */}
        <div
          className="modelBleOne"
          style={style}
          ref={(ref) => (this.eleModelBlOne = ref)}
        >
          <br />
          <br />
          Move: WASD
          <br />
          Jump: SPACE
          <br />
          Look: MOUSE
        </div>
        {/* --------------------- */}
        {/* --------------------- */}
        {/* --------------------- */}
      </div>
    );
  }
}

export default TropicDragTest;
