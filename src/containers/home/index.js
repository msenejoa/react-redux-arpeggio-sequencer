import React from "react";
import { push } from "react-router-redux";
//import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { Row, Col } from "react-flexbox-grid";

import Track from "../track";
import NoteSetting from "../noteSettings";
import TrackSettings from "../trackSettings";
import TrackOptions from "./TrackOptions";
//import SongSettings from '../songSettings'
import Three from "../three";

import Modal from "react-modal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

//import synth from './synth'
//import Dropdown from 'react-dropdown'
//import AnchorLink from 'react-anchor-link-smooth-scroll'

import { beats } from "../../modules/trackRoutes";
import { coordinateMapper } from "../../modules/coordinateMapper";

import {
  addTracks,
  removeTracks,
  togglePlay,
  nextBeat
} from "../../modules/sequencer.js";

const customStyles = {
  content: {
    position: "absolute",
    top: "0px",
    left: "0px",
    right: "0px",
    bottom: "00px",
    border: "1px' solid rgb(204, 204, 204)",
    background: "rgb(255, 255, 255)",
    overflow: "auto",
    borderRadius: "4px",
    outline: "none",
    padding: "20px"
  }
};

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //value: 0,
      tempo: 120,
      play: false,
      scale: "",
      sidebarOpen: true,
      sidebarWidth: 0,
      isMobile: false,
      windowWidth: 100
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  clickPlay() {
    this.props.onPlayClick(!this.props.tracks.play);
    this.setState({ play: !this.state.play });
    this.timer();
  }

  timer() {
    let tempo = 60000 / this.props.tracks.tempo;
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

  updateDimensions() {
    let width = document.getElementById("track-settings").offsetWidth;
    let windowWidth = document.documentElement.clientWidth;
    let mobile = windowWidth > 768 ? false : true;
    this.setState({
      isMobile: mobile,
      windowWidth: width
    });
    //let clientWidth = document.getElementById('sidebar').offsetWidth;
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  render() {
    let tracks = this.props.tracks.tracks;
    let { trackNumbers } = this.props.tracks;
    coordinateMapper(8, trackNumbers);

    let measures = tracks.map((index, i) => (
      <Track
        classes={this.state}
        beat={this.props.tracks.beat}
        routes={index}
        key={i}
        trackRow={i}
        tracks={this.props.tracks}
      />
    ));

    //let { activeBeatBool } = this.props.tracks

    return (
      <Row id="myAudio" className="main-body">
        <Col xs={12}>
          {/* <button onClick={()=> this.setState({sidebarOpen: !this.state.sidebarOpen})}> open </button>
        */}
          <Row className="sequencer-main-body">
            {this.state.isMobile && (
              <Col xs={12}>
                <Row center="xs">
                  <Col xs={12}>
                    <TrackOptions
                      onClickPlayParent={() => this.clickPlay()}
                      play={this.state.play}
                      isMobile={this.state.isMobile}
                      width={this.state.windowWidth}
                    />
                  </Col>
                </Row>
              </Col>
            )}
            <Col
              xs={12}
              sm={12}
              md={5}
              lg={4}
              xl={3}
              className="sidebar"
              id="sidebar"
            >
              {/*<SongSettings />*/}
              <div className="sidebar-container">
                <NoteSetting />
              </div>
              <div className="sidebar-container">
                <TrackSettings />
              </div>
              <div className="sidebar-container">
                <Row style={{ height: 56 }} className="toolbar-header">
                  <Col xs={12}>
                    <Row center="xs">
                      <Col>
                        <div>
                          {/*                          <AnchorLink href='#visualizer' style={{'textDecoration': 'none', 'color': '#30336b'}}>
                            Visualizer
                          </AnchorLink>*/}
                          <div
                            onClick={this.handleOpenModal}
                            className="toolbar-header"
                          >
                            <p>Visualizer</p>
                          </div>
                          <Modal
                            ariaHideApp={false}
                            isOpen={this.state.showModal}
                            contentLabel="Minimal Modal Example"
                            style={customStyles}
                          >
                            <Row end="xs">
                              <Col xs={1}>
                                <div
                                  style={{
                                    backgroundColor: "#eb4d4b",
                                    width: 30,
                                    height: 20,
                                    border: "1px solid grey",
                                    borderRadius: "10px",
                                    display: "table"
                                  }}
                                  onClick={this.handleCloseModal}
                                >
                                  <div
                                    style={{
                                      color: "#dff9fb",
                                      fontWeight: "bold",
                                      fontSize: "1rem",
                                      display: "table-cell",
                                      verticalAlign: "middle",
                                      "justify-content": "center",
                                      "text-align": "center"
                                    }}
                                  >
                                    <FontAwesomeIcon icon={faTimes} />
                                  </div>
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col xs={12} id="visualizer">
                                <Three beat={this.props.tracks.beat} />
                              </Col>
                            </Row>
                          </Modal>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            </Col>

            <Col xs={12} sm={12} md={7} lg={8} xl={9} id="main-body-container">
              <Row id="track-container">
                <Col xs={12}>
                  <Row center="xs">
                    {!this.state.isMobile && (
                      <Col xs={12}>
                        <TrackOptions
                          onClickPlayParent={() => this.clickPlay()}
                          play={this.state.play}
                          isMobile={this.state.isMobile}
                          width={this.state.windowWidth}
                        />
                        {/*<button onClick={()=>this.clickPlay()}> play </button>
                    <button onClick={()=> this.props.onAddTracks(this.props.tracks.tracks)}> ADD TRACKS </button>
                 <button onClick={()=> this.props.onRemoveTracks(this.props.tracks.tracks)}> REMOVE TRACKS </button>*/}
                      </Col>
                    )}
                    <Col xs={12}>
                      <Row center="xs">{measures}</Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        {/*      
      <Col xs={12} id='visualizer'>
        <Three
          beat = {this.props.tracks.beat}
          />
      </Col>*/}
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  tracks: state.sequencer
});

const mapDispatchToProps = dispatch => {
  return {
    onAddTracks: oldTracks => {
      dispatch(addTracks(oldTracks));
    },
    onPlayClick: bool => {
      dispatch(togglePlay(bool));
    },
    onNextBeat: beat => {
      dispatch(nextBeat(beat));
    },
    onRemoveTracks: oldTracks => {
      dispatch(removeTracks(oldTracks));
    },
    changePage: () => push("/about-us")
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
