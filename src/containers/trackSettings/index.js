import React from "react";
import { connect } from "react-redux";
import {
  changeTrackAttack,
  changeTrackDecay,
  changeTrackVolume,
  changeTrackOctave,
  selectTrack,
  trackMenuClick
} from "../../modules/sequencer.js";
import { Row, Col } from "react-flexbox-grid";
//import Dropdown from 'react-dropdown'
//import scale from 'music-scale'

// Using an ES6 transpiler like Babel
import Slider from "react-rangeslider";

// To include the default styles
import "./../../modules/react-rangeslider/lib/index.css";

import "react-dropdown/style.css";

class TrackSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attack: 0,
      decay: 0,
      volume: 0,
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

  toggleAnimate() {
    if (this.props.tracks.activeTrackBool !== this.state.collapse) {
      this.props.onTrackSelect(this.props.tracks.activeTrackRow);
      this.props.onTrackMenuSelect();
    } else {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          this.setState({ collapse: !this.state.collapse });
        });
      });
    }
  }

  changeAttack(i) {
    this.props.onAttackChange(
      i,
      this.props.tracks.activeTrack,
      this.props.tracks.tracks
    );
  }

  changeDecay(i) {
    this.props.onDecayChange(
      i,
      this.props.tracks.activeTrack,
      this.props.tracks.tracks
    );
  }

  changeVolume(i) {
    this.props.onVolumeChange(
      i,
      this.props.tracks.activeTrack,
      this.props.tracks.tracks
    );
  }

  onChangeOctave(i) {
    this.props.onOctaveChange(
      i,
      this.props.tracks.activeTrack,
      this.props.tracks.tracks
    );
  }

  componentWillMount() {
    let {
      activeTrackBool,
      activeTrackIndex,
      activeTrackRow,
      tracks,
      scale
    } = this.props.tracks;
    this.setState({ scale: scale });
    if (activeTrackBool) {
      let { octave } = tracks[activeTrackRow][activeTrackIndex].synth;
      let { checked } = tracks[activeTrackRow][activeTrackIndex];
      let volume =
        tracks[activeTrackRow][activeTrackIndex].synth.synthOptions.volume;
      let { attack, decay } = tracks[activeTrackRow][
        activeTrackIndex
      ].synth.synthOptions.envelope;
      this.setState({
        attack: attack,
        decay: decay,
        volume: volume,
        octave: octave,
        checked: checked
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  componentWillReceiveProps(nextProps) {
    let {
      activeTrackBool,
      activeTrackIndex,
      activeTrackRow,
      activeBeatId,
      tracks,
      scale
    } = nextProps.tracks;
    if (activeTrackBool === this.state.collapse) {
      this.setState({ collapse: !this.state.collapse });
    }

    this.setState({ scale: scale });
    if (activeBeatId.length > 0) {
      let { octave } = tracks[activeTrackRow][activeTrackIndex].synth;
      let { checked } = tracks[activeTrackRow][activeTrackIndex];
      let volume =
        tracks[activeTrackRow][activeTrackIndex].synth.synthOptions.volume;
      let { attack, decay } = tracks[activeTrackRow][
        activeTrackIndex
      ].synth.synthOptions.envelope;
      this.setState({
        attack: attack,
        decay: decay,
        volume: volume,
        octave: octave,
        checked: checked
      });
    }
  }

  handleOnChangeComplete(value) {
    if (value === "attack") {
      this.changeAttack(this.state.attack);
    }
    if (value === "decay") {
      this.changeDecay(this.state.decay);
    }
    if (value === "volume") {
      this.changeVolume(this.state.volume);
    }
    if (value === "octave") {
      this.onChangeOctave(this.state.octave);
    }
  }

  handleOnChange(value, paramater) {
    this.setState({
      [paramater]: value
    });
  }

  toggleBeat() {
    this.props.onToggleBeat(
      !this.state.checked,
      this.props.tracks.tracks,
      this.props.tracks.activeTrackRow,
      this.props.tracks.activeTrackIndex
    );
  }

  render() {
    //const { activeTrackIndex } = this.props.tracks;

    /*
    const { activeTrackIndex, activeTrackRow, activeBeatId, tracks, } = this.props.tracks;
    let note = ''


    if (activeBeatId.length > 0){
      note = tracks[activeTrackRow][activeTrackIndex].synth.note
    }
*/

    let collapse = this.state.collapse;

    return (
      <Row
        style={{
          height: collapse ? 60 : this.state.isMobile ? 220 : 350,
          transition: "all 0.75s",
          overflow: "hidden"
        }}
      >
        <Col xs={12} className="toolbar-header">
          <Row center="xs" onClick={() => this.toggleAnimate()}>
            <Col>
              <p>Track Settings</p>
            </Col>
          </Row>
          <Row center="xs">
            <Col xs={12}>
              <Row around="xs">
                <Col xs={this.state.isMobile ? 2 : 12} className="sliders">
                  <Slider
                    value={Number(this.state.octave)}
                    min={1}
                    max={8}
                    step={1}
                    tooltip={false}
                    orientation="vertical"
                    onChange={i => this.handleOnChange(i, "octave")}
                    onChangeComplete={() =>
                      this.handleOnChangeComplete("octave")
                    }
                  />
                  <div className="slider-text">Octave {this.state.octave}</div>
                </Col>

                {/*scaleList[activeTrackIndex]*/}

                <Col xs={3}>
                  <Slider
                    value={Number(this.state.attack)}
                    min={0.0001}
                    max={1}
                    step={0.001}
                    tooltip={false}
                    orientation="vertical"
                    onChange={value => this.handleOnChange(value, "attack")}
                    onChangeComplete={() =>
                      this.handleOnChangeComplete("attack")
                    }
                  />

                  <div className="slider-text">Attack</div>
                </Col>
                <Col xs={3}>
                  <Slider
                    value={Number(this.state.decay)}
                    min={0.01}
                    max={1}
                    step={0.001}
                    tooltip={false}
                    orientation="vertical"
                    onChange={value => this.handleOnChange(value, "decay")}
                    onChangeComplete={() =>
                      this.handleOnChangeComplete("decay")
                    }
                  />
                  <div className="slider-text">Decay</div>
                </Col>
                <Col xs={3}>
                  <Slider
                    value={Number(this.state.volume)}
                    min={-30}
                    max={0}
                    step={0.001}
                    tooltip={false}
                    orientation="vertical"
                    onChange={value => this.handleOnChange(value, "volume")}
                    onChangeComplete={() =>
                      this.handleOnChangeComplete("volume")
                    }
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
    onAttackChange: (newAttack, trackNumber, tracks) => {
      dispatch(changeTrackAttack(newAttack, trackNumber, tracks));
    },

    onDecayChange: (newDecay, trackNumber, tracks) => {
      dispatch(changeTrackDecay(newDecay, trackNumber, tracks));
    },
    onVolumeChange: (newVolume, trackNumber, tracks) => {
      dispatch(changeTrackVolume(newVolume, trackNumber, tracks));
    },
    onOctaveChange: (newOctave, trackNumber, tracks) => {
      dispatch(changeTrackOctave(newOctave, trackNumber, tracks));
    },
    onTrackSelect: track => {
      dispatch(selectTrack(track));
    },
    onTrackMenuSelect: () => {
      dispatch(trackMenuClick());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrackSettings);
