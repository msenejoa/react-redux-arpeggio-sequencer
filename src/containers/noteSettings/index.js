import React from "react";
import { connect } from "react-redux";
import {
  changeNote,
  changeAttack,
  changeDecay,
  changeVolume,
  changeOctave,
  activeBeatToggle,
  activateBeat,
  beatMenuClick
} from "../../modules/sequencer.js";
import { Row, Col } from "react-flexbox-grid";
//import Dropdown from 'react-dropdown'
//import scale from 'music-scale'

// Using an ES6 transpiler like Babel
import Slider from "react-rangeslider";

// To include the default styles
import "react-rangeslider/lib/index.css";

import "react-dropdown/style.css";

import TWEEN from "@tweenjs/tween.js";

class NoteSettings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      //collapse: false,
      height: 400,
      attack: 0,
      decay: 0,
      volume: 0,
      note: "",
      scale: "major",
      octave: 0,
      checked: false,
      animate: false,
      collapse: true,
      isMobile: false
    };
  }

  updateDimensions() {
    let windowWidth = document.documentElement.clientWidth;
    let mobile = windowWidth > 768 ? false : true;
    this.setState({
      isMobile: mobile
    });
  }

  changeNote(i) {
    this.props.onNoteChange(
      i,
      this.props.tracks.tracks,
      this.props.tracks.activeTrackRow,
      this.props.tracks.activeTrackIndex
    );
  }

  changeAttack(i) {
    this.props.onAttackChange(
      i,
      this.props.tracks.tracks,
      this.props.tracks.activeTrackRow,
      this.props.tracks.activeTrackIndex
    );
  }

  changeDecay(i) {
    this.props.onDecayChange(
      i,
      this.props.tracks.tracks,
      this.props.tracks.activeTrackRow,
      this.props.tracks.activeTrackIndex
    );
  }

  changeVolume(i) {
    this.props.onVolumeChange(
      i,
      this.props.tracks.tracks,
      this.props.tracks.activeTrackRow,
      this.props.tracks.activeTrackIndex
    );
  }

  onChangeOctave(i) {
    this.props.onOctaveChange(
      i,
      this.props.tracks.tracks,
      this.props.tracks.activeTrackRow,
      this.props.tracks.activeTrackIndex
    );
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }
  /*
  componentDidMount(){
    requestAnimationFrame(()=>{
      requestAnimationFrame(()=>{
        this.setState({animate: true})
      })
    })
  }
*/
  toggleAnimate() {
    if (this.props.tracks.activeBeatBool !== this.state.collapse) {
      this.props.onBeatMenuClick();
      //this.props.onTrackSelect(this.props.tracks.activeTrackRow)
      //you will put information here
      //this.props.onTrackClick(this.props.tracks.tracks[0][0].id, tracks)
    } else {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          this.setState({ collapse: !this.state.collapse });
        });
      });
    }
  }

  componentWillMount() {
    this.divHeight = { x: 600 };
    //let divHeight = {x: 400};
    this.target = { x: 0 };
    this.heightCloseTween = new TWEEN.Tween(this.divHeight).to(
      this.target,
      1000
    );
    //this.heightCloseTween = new TWEEN.Tween(this.divHeight).to(400, 1000);

    let {
      activeTrackIndex,
      activeTrackRow,
      activeBeatId,
      tracks,
      scale
    } = this.props.tracks;
    this.setState({ scale: scale });

    if (activeBeatId.length === 0) {
      this.props.onBeatClick(this.props.tracks.tracks[0][0].id, tracks);
    }

    if (activeBeatId.length > 0) {
      let { note, octave } = tracks[activeTrackRow][activeTrackIndex].synth;
      let { checked } = tracks[activeTrackRow][activeTrackIndex];
      let volume =
        tracks[activeTrackRow][activeTrackIndex].synth.synthOptions.volume;
      let { attack, decay } = tracks[activeTrackRow][
        activeTrackIndex
      ].synth.synthOptions.envelope;
      this.setState({
        note: note,
        attack: attack,
        decay: decay,
        volume: volume,
        octave: octave,
        checked: checked
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    let {
      activeBeatBool,
      activeTrackIndex,
      activeTrackRow,
      tracks,
      scale
    } = nextProps.tracks;
    this.setState({ scale: scale });
    if (activeBeatBool === this.state.collapse) {
      this.setState({ collapse: !this.state.collapse });
    }

    let { note, octave } = tracks[activeTrackRow][activeTrackIndex].synth;
    let { checked } = tracks[activeTrackRow][activeTrackIndex];
    let volume =
      tracks[activeTrackRow][activeTrackIndex].synth.synthOptions.volume;
    let { attack, decay } = tracks[activeTrackRow][
      activeTrackIndex
    ].synth.synthOptions.envelope;
    this.setState({
      note: note,
      attack: attack,
      decay: decay,
      volume: volume,
      octave: octave,
      checked: checked
    });
  }

  toggleBeat() {
    if (this.props.tracks.activeBeatId.length > 0) {
      this.props.onToggleBeat(
        !this.state.checked,
        this.props.tracks.tracks,
        this.props.tracks.activeTrackRow,
        this.props.tracks.activeTrackIndex
      );
    } else {
      this.props.onToggleBeat(
        true,
        this.props.tracks.tracks,
        this.props.tracks.activeTrackRow,
        this.props.tracks.activeTrackIndex
      );
    }
  }

  render() {
    const octaveButtonArray = i => (
      <Col
        xs={1}
        key={i}
        className="track-pattern-button-container"
        style={{
          backgroundColor:
            this.state.octave === String(i + 1) ? "#f0932b" : "#c7ecee"
        }}
      >
        <div onClick={() => this.onChangeOctave(String(i + 1))}>{i + 1}</div>
      </Col>
    );

    const intervalButtonArray = i => (
      <Col
        xs={1}
        key={i}
        className="track-pattern-button-container"
        style={{
          backgroundColor: this.state.note === i + 1 ? "#f0932b" : "#c7ecee"
        }}
      >
        <div onClick={() => this.changeNote(i + 1)}>{i + 1}</div>
      </Col>
    );

    let octaveArray = [];
    for (let i = 0; i < 8; i++) {
      octaveArray.push(octaveButtonArray(i));
    }

    let intervalArray = [];
    for (let i = 0; i < 7; i++) {
      intervalArray.push(intervalButtonArray(i));
    }

    let collapse = this.state.collapse;

    return (
      <Row
        style={{
          height: collapse ? 60 : this.state.isMobile ? 370 : 370,
          transition: "all 0.75s",
          overflow: "hidden"
        }}
      >
        <Col xs={12} className="toolbar-header">
          <Row center="xs">
            <Col xs={12}>
              <p onClick={() => this.toggleAnimate()}>Beat Settings</p>
            </Col>
          </Row>
          <Row center="xs">
            <Col xs={12}>
              <Row center="xs" className="toggle-row">
                <Col>
                  <Row middle="xs">
                    <Col
                      onClick={() => this.toggleBeat()}
                      className="active-toggle"
                      style={{
                        backgroundColor: this.state.checked
                          ? "#eb4d4b"
                          : "#30336b"
                      }}
                    >
                      <div>
                        <p
                          style={{
                            color: this.state.checked ? "#dff9fb" : "#7ed6df",
                            fontWeight: "bold",
                            margin: 6
                          }}
                        >
                          {" "}
                          ACTIVE{" "}
                        </p>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row around="xs">
                <Col xs={12}>
                  <p className="slider-text">interval</p>
                </Col>
                <Col xs={12}>
                  <Row around="xs">{intervalArray}</Row>
                </Col>
                <Col xs={12}>
                  <p className="slider-text">octave</p>
                </Col>
                <Col xs={12}>
                  <Row around="xs">{octaveArray}</Row>
                </Col>
                <Col xs={2}>
                  <Slider
                    value={Number(this.state.attack)}
                    min={0.001}
                    max={1}
                    step={0.05}
                    tooltip={false}
                    orientation="vertical"
                    onChange={value => this.changeAttack(value)}
                  />
                  <div className="slider-text">Attack</div>
                </Col>
                <Col xs={2}>
                  <Slider
                    value={Number(this.state.decay)}
                    min={0.05}
                    max={2}
                    step={0.05}
                    tooltip={false}
                    orientation="vertical"
                    onChange={value => this.changeDecay(value)}
                  />
                  <div className="slider-text">Decay</div>
                </Col>
                <Col xs={2}>
                  <Slider
                    value={Number(this.state.volume)}
                    min={-30}
                    max={0}
                    step={0.1}
                    tooltip={false}
                    orientation="vertical"
                    onChange={value => this.changeVolume(value)}
                  />
                  <div className="slider-text">Volume</div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
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
    onNoteChange: (newNote, tracks, row, index) => {
      dispatch(changeNote(newNote, tracks, row, index));
    },
    onAttackChange: (newAttack, tracks, row, index) => {
      dispatch(changeAttack(newAttack, tracks, row, index));
    },

    onDecayChange: (newDecay, tracks, row, index) => {
      dispatch(changeDecay(newDecay, tracks, row, index));
    },
    onVolumeChange: (newVolume, tracks, row, index) => {
      dispatch(changeVolume(newVolume, tracks, row, index));
    },
    onOctaveChange: (octave, tracks, row, index) => {
      dispatch(changeOctave(octave, tracks, row, index));
    },
    onToggleBeat: (newBool, tracks, row, index) => {
      dispatch(activeBeatToggle(newBool, tracks, row, index));
    },
    onBeatClick: (id, tracks) => {
      dispatch(activateBeat(id, tracks));
    },
    onBeatMenuClick: () => {
      dispatch(beatMenuClick());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteSettings);
