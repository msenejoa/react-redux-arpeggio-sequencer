import React from "react";
import { connect } from "react-redux";
import {
  changeScale,
  togglePlay,
  nextBeat,
  addTracks,
  changeSongKey,
  changeTempo
} from "../../modules/sequencer.js";
import { Row, Col } from "react-flexbox-grid";
import Dropdown from "react-dropdown";

import { beats } from "../../modules/trackRoutes";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";

import NumericInput from "react-numeric-input";

import "react-dropdown/style.css";

class TrackOptions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      //collapse: false,
      height: 400,
      tempo: 120,
      play: false,
      scale: "major",
      key: "C"
    };
  }

  onKeyChange(key) {
    this.setState({
      key: key
    });
    this.props.onChangeSongKey(key);
  }

  onScaleChange(scale) {
    this.setState({
      scale: scale
    });
    this.props.onChangeScale(scale);
  }

  onTempoChange(num) {
    this.setState({
      tempo: num
    });
    this.props.onChangeTempo(num);
  }

  clickPlay() {
    this.props.onPlayClick(!this.props.tracks.play);
    this.setState({ play: !this.state.play });
    this.timer();
  }

  timer() {
    let tempo = 60000 / this.state.tempo;
    //if (!this.state.play){
    if (!this.props.tracks.play) {
      this.time = setInterval(() => this.tick(), tempo);
    } else {
      clearInterval(this.time);
      //this.setState({value: 0})
    }
  }

  tick() {
    let v =
      this.props.tracks.beat === beats - 1 ? 0 : this.props.tracks.beat + 1;
    this.props.onNextBeat(v);
  }

  render() {
    let scaleList = this.props.tracks.scaleList;
    let keyList = [
      "A",
      "Ab",
      "B",
      "C",
      "Cb",
      "D",
      "Db",
      "E",
      "F",
      "Fb",
      "G",
      "Gb"
    ];

    return (
      <Row
        between="xs"
        id="track-settings"
        className="track-settings"
        //style={{'height': (this.props.width<667)?120: 70}}
      >
        <Col
          xs={4}
          style={{
            color: "#30336b",
            height: 48,
            display: "table"
          }}
        >
          <div
            style={{
              display: "table-cell",
              verticalAlign: "middle",
              textAlign: "right",
              paddingRight: 12
            }}
          >
            tempo
          </div>
          <div
            style={{
              display: "table-cell",
              verticalAlign: "middle"
            }}
          >
            <NumericInput
              min={20}
              max={220}
              value={this.state.tempo}
              onChange={i => this.onTempoChange(i)}
            />
          </div>
        </Col>
        <Col
          xs={5}
          style={{
            fontSize: "1rem",
            color: "#30336b",
            height: 48,
            display: "table"
          }}
        >
          <div
            style={{
              display: "table-cell",
              verticalAlign: "middle",
              textAlign: "right",
              paddingRight: 12
            }}
          >
            key
          </div>
          <div
            style={{
              width: 170,
              display: "table-cell",
              verticalAlign: "middle",
              fontSize: "0.7rem"
            }}
          >
            <Dropdown
              style={{ display: "inline" }}
              options={keyList}
              onChange={i => this.onKeyChange(i.value)}
              value={this.state.key}
              placeholder="Select an option"
            />
          </div>
        </Col>
        <Col
          xs={4}
          style={{
            fontSize: "1rem",
            color: "#30336b",
            height: 48,
            //'overflow': 'hidden',
            display: "table"
          }}
        >
          <div
            style={{
              display: "table-cell",
              verticalAlign: "middle",
              textAlign: "right",
              paddingRight: 12
            }}
          >
            scale
          </div>
          <div
            style={{
              width: 170,
              display: "table-cell",
              verticalAlign: "middle",
              fontSize: "0.7rem"
            }}
          >
            <Dropdown
              style={{ display: "inline" }}
              options={scaleList}
              onChange={i => this.onScaleChange(i.value)}
              value={this.state.scale}
              placeholder="Select an option"
            />
          </div>
        </Col>
        <Col
          xs={3}
          className="active-toggle"
          style={{
            backgroundColor: "#badc58",
            display: "table",
            overflow: "hidden"
          }}
          onClick={() => this.props.onAddTracks(this.props.tracks.tracks)}
        >
          <div>
            add <br /> tracks
          </div>
        </Col>
        <Col
          xs={2}
          style={{
            backgroundColor: this.props.play ? "#eb4d4b" : "#badc58",
            height: 48,
            border: "1px solid",
            borderRadius: "10px",
            display: "table"
          }}
          onClick={() => this.props.onClickPlayParent()}
        >
          <p
            style={{
              color: this.props.play ? "#dff9fb" : "#535c68",
              fontWeight: "bold",
              fontSize: "1rem",
              display: "table-cell",
              verticalAlign: "middle"
            }}
          >
            <FontAwesomeIcon icon={this.props.play ? faPause : faPlay} />
          </p>
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
    onChangeScale: scale => {
      dispatch(changeScale(scale));
    },
    onAddTracks: oldTracks => {
      dispatch(addTracks(oldTracks));
    },
    onPlayClick: bool => {
      dispatch(togglePlay(bool));
    },
    onNextBeat: beat => {
      dispatch(nextBeat(beat));
    },
    onChangeSongKey: key => {
      dispatch(changeSongKey(key));
    },
    onChangeTempo: num => {
      dispatch(changeTempo(num));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrackOptions);
