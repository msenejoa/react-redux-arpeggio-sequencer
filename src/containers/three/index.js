import React from "react";
import React3 from "react-three-renderer";
import * as THREE from "three";

import { connect } from "react-redux";
import { activateBeat, selectTrack } from "../../modules/sequencer.js";
//import { Row, Col } from 'react-flexbox-grid'

//var decibelsToGain = require('decibels/to-gain')
import decibelsToGain from "decibels/to-gain";

import { meter } from "../../modules/synth";

import { coordinateMapper } from "../../modules/coordinateMapper";
import { trackTweener } from "../../modules/trackTweener";

import TWEEN from "@tweenjs/tween.js";
import { colorPicker } from "../../modules/colorPicker";

const OrbitControls = require("three-orbit-controls")(THREE);

class Three extends React.Component {
  constructor(props, context) {
    super(props, context);
    // construct the position vector here, because if we use 'new' within render,
    // React will think that things have changed when they have not.
    this.cameraPosition = new THREE.Vector3(0, 1, 5);
    this.state = {
      width: 600,
      height: 600,
      cubeRotation: new THREE.Euler(),
      controls: {},
      trackMap: "",
      activeBeat: null,
      position: {
        x: 0,
        y: 300
      }
    };

    this._onAnimatee = () => {
      // we will get this callback every frame
      // pretend cubeRotation is immutable.
      // this helps with updates and pure rendering.
      // React will be sure that the rotation has now updated.
      //this.state.controls.update();
      this.setState({
        cubeRotation: new THREE.Euler(
          this.state.cubeRotation.x + 0.1,
          this.state.cubeRotation.y + 0.1,
          0
        )
      });
    };
  }

  onAnimate() {
    this.state.controls.update();
    this.setState({
      cubeRotation: new THREE.Euler(
        this.state.cubeRotation.x + 0.05,
        this.state.cubeRotation.y + 0.05,
        0
      )
    });
  }

  GetControls(camRef) {
    let refRenderElement = document.getElementsByTagName("canvas")[0];
    const controls = new OrbitControls(camRef, refRenderElement);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 4;
    controls.enableZoom = false;
    return controls;
  }

  updateTweens(props) {
    this.trackTweens = trackTweener(props.tracks.tracks.slice());
    this.newMapArray = [];
    for (let i = 0; i < props.tracks.trackNumbers; i++) {
      this.newMapArray.push(coordinateMapper(8, i + 1));
    }
    for (let i in this.newMapArray) {
      for (let j in this.newMapArray[i]) {
        this.newMapArray[i][j]["tween"] = this.trackTweens[i][j];
      }
    }
    this.setState({
      tracks: props.tracks.tracks.slice()
    });
  }

  updateDimensions() {
    //let diffrence = 550 - document.getElementById('track-container').scrollHeight

    let windowWidth = document.getElementById("canvas").offsetWidth;
    //console.log(document.getElementById('visualizer').offsetWidth)
    let windowHeight = document.getElementById("canvas").offsetHeight;
    this.setState({
      width: windowWidth,
      height: windowHeight
    });
  }

  componentWillMount() {
    this.updateTweens(this.props);
    this.setState({
      activeBeat: this.props.beat,
      tracks: this.props.tracks.tracks.slice()
    });
  }

  componentWillReceiveProps(newProps) {
    if (newProps.beat !== this.state.activeBeat) {
      this.setState({ activeBeat: newProps.beat });
      //this.updateTweens(newProps)
    }

    if (this.state.tracks !== newProps.tracks.tracks) {
      this.updateTweens(newProps);
      //this.updateDimensions()
      this.setState({
        //  tracks: newProps.tracks.tracks.slice()
      });
    }

    for (let i in this.trackTweens) {
      for (let j in this.trackTweens[i]) {
        if (
          this.trackTweens[i][j].value === newProps.beat &&
          this.trackTweens[i][j].checked
        ) {
          //console.log(this.trackTweens[i][j])
          this.trackTweens[i][j].tween.tweenAttack.start();
        }
      }
    }
    //this.trackTweens[0][0].tween.tweenAttack.start()
  }

  componentWillUnmount() {
    //window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  componentDidMount() {
    this.updateDimensions();
    //window.addEventListener("resize", this.updateDimensions.bind(this));
    colorPicker();
    this.camRef.lookAt(new THREE.Vector3());

    this.setState({
      trackNumber: this.props.tracks.trackNumbers,
      trackBeats: 8,
      controls: this.GetControls(this.camRef)
    });
  }

  render() {
    //const width = window.innerWidth; // canvas width
    //const height = window.innerHeight; // canvas height
    let level = meter.getLevel();
    level = decibelsToGain(level);
    let colorVariable = String(this.state.activeBeat * 45);
    let color = new THREE.Color("hsl(" + colorVariable + ", 100%, 50%)");

    TWEEN.update();

    let newMapCoordinates = [];
    for (let i in this.newMapArray) {
      let newBoxArray = this.newMapArray[i].map(index => (
        <mesh
          castShadow
          receiveShadow
          rotation={this.state.cubeRotation}
          position={new THREE.Vector3(index.x, 0, index.y)}
        >
          <boxGeometry
            width={0.01 + level / 5}
            height={0.01 + index.tween.position.x / 3}
            depth={0.01 + index.tween.position.x / 3}
          />
          <meshBasicMaterial
            color={
              new THREE.Color(
                "hsl(" +
                  colorPicker(index.tween.synth.note, index.tween.synth.octave)
                    .hue +
                  ", 100%, " +
                  colorPicker(index.tween.synth.note, index.tween.synth.octave)
                    .light +
                  "%)"
              )
            }
          />
        </mesh>
      ));
      newMapCoordinates.push(newBoxArray);
    }

    return (
      <div
        onClick={() => this.trackTweens[0][0].tween.tweenAttack.start()}
        id="canvas"
        className="render"
      >
        <React3
          mainCamera="camera" // this points to the perspectiveCamera which has the name set to "camera" below
          width={this.state.width}
          height={this.state.height}
          clearColor={0xffffff}
          antialias={true}
          onAnimate={() => this.onAnimate()}
        >
          <scene>
            <perspectiveCamera
              name="camera"
              fov={75}
              aspect={this.state.width / this.state.height}
              near={0.1}
              far={1000}
              position={this.cameraPosition}
              ref={inst => {
                this.camRef = inst;
              }}
            />
            <ambientLight
              color={0x666666}
              position={THREE.Vector3(0, 0, 2)}
              castShadow
              intensity={2}
              updatesRefreshAllMaterials
            />

            <ambientLight
              color={0x666666}
              position={THREE.Vector3(0, 2, 0)}
              castShadow
              intensity={20}
              updatesRefreshAllMaterials
            />

            {newMapCoordinates.length > 0 && newMapCoordinates}

            <mesh rotation={this.state.cubeRotation} castShadow receiveShadow>
              <sphereGeometry
                radius={level / 3}
                widthSegments={50}
                heightSegments={50}
              />
              <meshPhongMaterial color={color} />
            </mesh>
          </scene>
        </React3>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    tracks: state.sequencer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onBeatClick: (id, tracks) => {
      dispatch(activateBeat(id, tracks));
    },
    onTrackSelect: track => {
      console.log(track);
      dispatch(selectTrack(track));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Three);
