import React from "react";
import { connect } from "react-redux";
import {
  activateBeat,
  selectTrack,
  activeBeatToggle
} from "../../modules/sequencer.js";
//import { Row, Col } from 'react-flexbox-grid'

import { synthSequencer } from "../../modules/synth";
import { getRowIndexFromId } from "../../modules/getRowIndexFromId";
//import scale from 'music-scale'

//import Tone from 'tone';

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      type: "",
      open: false,
      windowWidth: 0,
      play: false
    };
  }

  componentWillMount() {
    this.setState({
      type: this.props.type
    });
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  componentWillReceiveProps(newProps) {
    if (newProps.tracks.play !== this.state.play) {
      this.setState({
        play: newProps.tracks.play
      });
    }
    let v = newProps.value % 17;
    this.setState({ value: v });
  }

  updateDimensions() {
    let windowWidth = document.getElementById("main-body-container")
      .offsetWidth;
    let width = (windowWidth - windowWidth / 2) / 12;
    //let width = (document.getElementById("main-body-container").offsetWidth - 200)/8
    this.setState({
      windowWidth: width
    });
  }

  handleClickOpen() {
    this.setState({ open: true });
  }

  handleClickClose() {
    this.setState({ open: false });
  }

  playSynth(parameters) {
    synthSequencer(parameters, this.props.tracks.scale, this.props.tracks.key);
  }

  onBeatClick(id, tracks, index) {
    //let activeTracks = tracks
    let activeTrackIndex = -1;
    let activeTrack = -1;
    for (let key in tracks) {
      let index = tracks[key].findIndex(x => x.id === id);
      if (index > -1) {
        activeTrack = parseInt(key, 10);
        activeTrackIndex = index;
        //activeTracks[key][index].checked = !activeTracks[key][index].checked;
      }
    }

    if (this.props.tracks.activeBeatId === id) {
      this.props.onToggleBeat(
        !index.checked,
        tracks,
        activeTrack,
        activeTrackIndex
      );
    }
    this.props.onBeatClick(id, tracks);
  }

  render() {
    const { classes, routes, trackRow, tracks } = this.props;

    let activeIndex = tracks.activeTrackIndex;

    let activeRow = tracks.activeTrackRow;
    let click = this.props.tracks.beat;

    let newVar = routes.map((index, i) => (
      <div
        key={i}
        style={{
          display: "inline-block"

          //'backgroundColor': ((this.props.tracks.activeTrack === trackRow) && this.props.tracks.activeTrackBool)?'#535c68':'#95afc0',
        }}
      >
        <span
          style={{
            margin: this.state.windowWidth / 4
          }}
        >
          {i === 0 && (
            <span
              onClick={() => this.props.onTrackSelect(trackRow)}
              style={{ paddingRight: this.state.windowWidth / 4 + "px" }}
            >
              <div
                style={{
                  height: this.state.windowWidth / 2 + "px",
                  width: this.state.windowWidth / 2 + "px",
                  backgroundColor: "#f6e58d",
                  display: "inline-block",
                  margin: this.state.windowWidth / 4 + "px",
                  paddingRight: "14px"
                }}
              />
            </span>
          )}
          <div
            onClick={() =>
              this.onBeatClick(index.id, this.props.tracks.tracks, index, i)
            }
            key={i}
            id={index.id}
            style={{
              height: this.state.windowWidth + "px",
              width: this.state.windowWidth * 2 + "px",
              display: "inline-block",
              border: "5px solid",
              borderColor:
                i === activeIndex && trackRow === activeRow
                  ? "#eb4d4b"
                  : "#95afc0",
              borderRadius: "6px",
              backgroundColor:
                index.checked === true
                  ? getRowIndexFromId(index.id, tracks.tracks)
                  : "#DCDCDC"
            }}
          >
            <div
              style={{
                height: "50%",
                width: "50%",
                position: "relative",
                top: "50%",
                transform: "perspective(0px) translateY(-50%) translateX(50%)",
                border: "1px transparent",
                backgroundColor:
                  index.value === click && classes.play
                    ? "white"
                    : "transparent",
                borderRadius: "6px"
              }}
            />
            {index.checked && index.number === click && this.state.play
              ? this.playSynth(index.synth)
              : null}
          </div>
        </span>
      </div>
    ));

    return (
      <div
        style={{
          //'display': 'inline-block',
          backgroundColor:
            this.props.tracks.activeTrack === trackRow &&
            this.props.tracks.activeTrackBool
              ? "#eb4d4b"
              : "#95afc0",
          borderRadius: "6px",
          margin: this.state.windowWidth / 10
        }}
      >
        <div
          className="inner-span"
          style={{
            paddingTop: this.state.windowWidth / 4
          }}
        >
          {newVar}
        </div>
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
    onToggleBeat: (newBool, tracks, row, index) => {
      dispatch(activeBeatToggle(newBool, tracks, row, index));
    },
    onTrackSelect: track => {
      dispatch(selectTrack(track));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Track);
