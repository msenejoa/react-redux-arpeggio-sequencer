//import {trackOne} from './trackRoutes'
import { gen, arpDictionary, arp } from "./trackRoutes";

import scale from "music-scale";

export const CHANGE_NUMBER_TRACKS = "sequencer/CHANGE_NUMBER_TRACKS";
export const ACTIVATE_BEAT = "sequencer/ACTIVATE_BEAT";
export const ADD_TRACKS = "sequencer/ADD_TRACKS";
export const REMOVE_TRACKS = "sequencer/REMOVE_TRACKS";
export const CHANGE_NOTE = "sequencer/CHANGE_NOTE";
export const CHANGE_ATTACK = "sequencer/CHANGE_ATTACK";
export const CHANGE_DECAY = "sequencer/CHANGE_DECAY";
export const CHANGE_VOLUME = "sequencer/CHANGE_VOLUME";
export const CHANGE_SCALE = "sequencer/CHANGE_SCALE";
export const CHANGE_OCTAVE = "sequencer/CHANGE_OCTAVE";
export const TOGGLE_BEAT = "sequencer/TOGGLE_BEAT";
export const SELECT_TRACK = "sequencer/SELECT_TRACK";

export const CHANGE_TRACK_VOLUME = "sequencer/CHANGE_TRACK_VOLUME";
export const CHANGE_TRACK_ATTACK = "sequencer/CHANGE_ATTACK";
export const CHANGE_TRACK_DECAY = "sequencer/CHANGE_TRACK_DECAY";
export const CHANGE_TRACK_OCTAVE = "sequencer/CHANGE_TRACK_OCTAVE";
export const CHANGE_TRACK_PATTERN = "sequencer/CHANGE_TRACK_PATTERN";

export const BEAT_MENU_CLICK = "sequencer/BEAT_MENU_CLICK";
export const TRACK_MENU_CLICK = "sequencer/TRACK_MENU_CLICK";
export const SONG_MENU_CLICK = "sequencer/SONG_MENU_CLICK";

export const TOGGLE_PLAY = "sequencer/TOGGLE_PLAY";
export const CHANGE_TEMPO = "sequencer/CHANGE_TEMPO";
export const CHANGE_SONG_KEY = "sequencer/CHANGE_SONG_KEY";

export const VIEW_TRACK_SETTINGS = "sequencer/VIEW_TRACK_SETTINGS";
export const VIEW_BEAT_SETTINGS = "sequencer/VIEW_BEAT_SETTINGS";
export const VIEW_SONG_SETTINGS = "sequencer/VIEW_SONG_SETTINGS";
export const NEXT_BEAT = "sequencer/NEXT_BEAT";

const scaleList = scale.names();

const initialState = {
  trackNumbers: 1,
  tracks: [[...gen()]],
  activeBeatId: "",
  activeTrackIndex: 0,
  activeTrackRow: 0,
  scale: "major",
  scaleList: scaleList,
  activeTrack: 0,
  activeTrackBool: false,
  activeBeatBool: false,
  activeSongBool: true,
  play: false,
  tempo: 180,
  key: "c",
  trackView: false,
  beatView: false,
  songView: false,
  beat: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_NUMBER_TRACKS:
      return {
        ...state,
        trackNumbers: action.data
      };
    case ADD_TRACKS:
      return {
        ...state,
        trackNumbers: action.qty,
        tracks: action.tracks
      };
    case REMOVE_TRACKS:
      return {
        ...state,
        trackNumbers: action.qty,
        tracks: action.tracks
      };
    case ACTIVATE_BEAT:
      return {
        ...state,
        activeBeatId: action.activeBeat,
        activeTrackRow: action.activeTrackRow,
        activeTrackIndex: action.activeTrackIndex,
        tracks: action.tracks,
        activeTrackBool: false,
        activeBeatBool: true
      };
    case CHANGE_NOTE:
      return {
        ...state,
        tracks: action.tracks
      };
    case CHANGE_ATTACK:
      return {
        ...state,
        tracks: action.tracks
      };
    case CHANGE_DECAY:
      return {
        ...state,
        tracks: action.tracks
      };
    case CHANGE_VOLUME:
      return {
        ...state,
        tracks: action.tracks
      };
    case CHANGE_OCTAVE:
      return {
        ...state,
        tracks: action.tracks
      };
    case CHANGE_SCALE:
      return {
        ...state,
        scale: action.data
      };
    case TOGGLE_BEAT:
      return {
        ...state,
        tracks: action.tracks,
        activeTrackBool: false,
        activeBeatBool: true
      };
    case SELECT_TRACK:
      return {
        ...state,
        activeTrack: action.data,
        activeTrackRow: action.data,
        activeTrackBool: true,
        activeBeatBool: false
        //activeBeatId: null,
        //activeTrackIndex: null
      };
    case CHANGE_TRACK_VOLUME:
      return {
        ...state,
        tracks: action.tracks
      };
    case CHANGE_TRACK_PATTERN:
      return {
        ...state,
        tracks: action.tracks
      };
    case CHANGE_TRACK_ATTACK:
      return {
        ...state,
        tracks: action.tracks
      };
    case CHANGE_TRACK_DECAY:
      return {
        ...state,
        tracks: action.tracks
      };
    case CHANGE_TRACK_OCTAVE:
      return {
        ...state,
        tracks: action.tracks
      };
    case BEAT_MENU_CLICK:
      return {
        ...state,
        activeTrackBool: false,
        activeBeatBool: true,
        activeSongBool: false
      };
    case TRACK_MENU_CLICK:
      return {
        ...state,
        activeTrackBool: true,
        activeBeatBool: false,
        activeSongBool: false
      };
    case SONG_MENU_CLICK:
      return {
        ...state,
        activeTrackBool: false,
        activeBeatBool: false,
        activeSongBool: true
      };
    case VIEW_SONG_SETTINGS:
      return {
        ...state,
        songView: true,
        trackView: false,
        beatView: false
      };
    case VIEW_TRACK_SETTINGS:
      return {
        ...state,
        songView: false,
        trackView: true,
        beatView: false
      };
    case VIEW_BEAT_SETTINGS:
      return {
        ...state,
        songView: false,
        trackView: false,
        beatView: true
      };
    case TOGGLE_PLAY:
      return {
        ...state,
        play: action.data
      };
    case CHANGE_TEMPO:
      return {
        ...state,
        tempo: action.data
      };
    case CHANGE_SONG_KEY:
      return {
        ...state,
        key: action.data
      };
    case NEXT_BEAT:
      return {
        ...state,
        beat: action.data
      };
    default:
      return state;
  }
};

export const changeSongKey = key => {
  return dispatch => {
    dispatch({
      type: CHANGE_SONG_KEY,
      data: key
    });
  };
};

export const changeTempo = tempo => {
  return dispatch => {
    dispatch({
      type: CHANGE_TEMPO,
      data: tempo
    });
  };
};

export const nextBeat = beat => {
  return dispatch => {
    dispatch({
      type: NEXT_BEAT,
      data: beat
    });
  };
};

export const togglePlay = bool => {
  return dispatch => {
    dispatch({
      type: TOGGLE_PLAY,
      data: bool
    });
  };
};

export const viewTrackSettings = () => {
  return dispatch => {
    dispatch({
      type: VIEW_TRACK_SETTINGS
    });
  };
};

export const viewSongkSettings = () => {
  return dispatch => {
    dispatch({
      type: VIEW_SONG_SETTINGS
    });
  };
};

export const viewBeatSettings = () => {
  return dispatch => ({
    type: VIEW_BEAT_SETTINGS
  });
};

export const addTracks = oldTracks => {
  let newTrackNumber = oldTracks.length + 1;
  oldTracks.push([...gen(newTrackNumber - 1)]);
  //dispatch(add here)

  return dispatch => {
    dispatch(selectTrack(newTrackNumber - 1));
    dispatch(trackMenuClick());
    dispatch({
      type: ADD_TRACKS,
      qty: newTrackNumber,
      tracks: oldTracks
    });
  };
};

export const removeTracks = oldTracks => {
  let newTrackNumber =
    oldTracks.length > 1 ? oldTracks.length - 1 : oldTracks.length;
  if (newTrackNumber > 0) {
    oldTracks.pop();
  }
  //let newTracks = (oldTracks.length > 1) ? oldTracks.pop() : oldTracks
  return dispatch => {
    dispatch({
      type: REMOVE_TRACKS,
      qty: newTrackNumber,
      tracks: oldTracks
    });
  };
};

export const activeBeatToggle = (newBool, tracks, row, index) => {
  let newTracks = tracks;
  newTracks[row][index].checked = newBool;
  return dispatch => {
    dispatch({
      type: TOGGLE_BEAT,
      tracks: newTracks
    });
  };
};

export const activateBeat = (id, tracks) => {
  let activeTracks = tracks;
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
  return dispatch => {
    dispatch({
      type: ACTIVATE_BEAT,
      activeBeat: id,
      activeTrackRow: activeTrack,
      activeTrackIndex: activeTrackIndex,
      tracks: activeTracks
    });
  };
};

export const changeNote = (newNote, tracks, row, index) => {
  let newTracks = tracks.slice(0);
  newTracks[row][index].synth.note = newNote;
  newTracks[row][index].pattern = null;

  return dispatch => {
    dispatch({
      type: CHANGE_NOTE,
      tracks: newTracks
    });
  };
};

export const changeAttack = (newAttack, tracks, row, index) => {
  let newTracks = tracks;
  newTracks[row][index].synth.synthOptions.envelope.attack = newAttack;
  return dispatch => {
    dispatch({
      type: CHANGE_ATTACK,
      tracks: newTracks
    });
  };
};

export const changeDecay = (newDecay, tracks, row, index) => {
  let newTracks = tracks;
  newTracks[row][index].synth.synthOptions.envelope.decay = newDecay;
  return dispatch => {
    dispatch({
      type: CHANGE_DECAY,
      tracks: newTracks
    });
  };
};

export const changeVolume = (newVolume, tracks, row, index) => {
  let newTracks = tracks;
  newTracks[row][index].synth.synthOptions.volume = newVolume;
  return dispatch => {
    dispatch({
      type: CHANGE_VOLUME,
      tracks: newTracks
    });
  };
};

export const changeOctave = (newOctave, tracks, row, index) => {
  let newTracks = tracks;
  newTracks[row][index].synth.octave = newOctave;
  return dispatch => {
    dispatch({
      type: CHANGE_OCTAVE,
      tracks: newTracks
    });
  };
};

export const beatMenuClick = () => {
  return dispatch => {
    dispatch({
      type: BEAT_MENU_CLICK
    });
  };
};

export const trackMenuClick = () => {
  return dispatch => {
    dispatch({
      type: TRACK_MENU_CLICK
    });
  };
};

export const songMenuClick = () => {
  return dispatch => {
    dispatch({
      type: SONG_MENU_CLICK
    });
  };
};

export const selectTrack = track => {
  return dispatch => {
    dispatch({
      type: SELECT_TRACK,
      data: track
    });
  };
};

export const changeScale = scale => {
  return dispatch => {
    dispatch({
      type: CHANGE_SCALE,
      data: scale
    });
  };
};

export const changeTrackPattern = (pattern, trackNumber, tracks) => {
  let newTracks = tracks.slice(0);
  for (let key in newTracks[trackNumber]) {
    let note = arp(key, pattern);
    newTracks[trackNumber][key].synth.note = note;
    newTracks[trackNumber][key].pattern = pattern;
  }
  return dispatch => {
    dispatch({
      type: CHANGE_TRACK_PATTERN,
      tracks: newTracks
    });
  };
};

export const changeTrackVolume = (newVolume, trackNumber, tracks) => {
  let newTracks = tracks.slice(0);
  for (let key in newTracks[trackNumber]) {
    newTracks[trackNumber][key].synth.synthOptions.volume = newVolume;
  }
  return dispatch => {
    dispatch({
      type: CHANGE_TRACK_VOLUME,
      tracks: newTracks
    });
  };
};

export const changeTrackAttack = (newAttack, trackNumber, tracks) => {
  console.log(newAttack);
  let newTracks = tracks.slice(0);

  for (let key in newTracks[trackNumber]) {
    newTracks[trackNumber][key].synth.synthOptions.envelope.attack = newAttack;
  }
  return dispatch => {
    dispatch({
      type: CHANGE_TRACK_ATTACK,
      tracks: tracks
    });
  };
};

export const changeTrackDecay = (newDecay, trackNumber, tracks) => {
  let newTracks = tracks.slice(0);
  for (let key in newTracks[trackNumber]) {
    newTracks[trackNumber][key].synth.synthOptions.envelope.decay = newDecay;
  }
  return dispatch => {
    dispatch({
      type: CHANGE_TRACK_DECAY,
      tracks: newTracks
    });
  };
};

export const changeTrackOctave = (newOctave, trackNumber, tracks) => {
  let newTracks = tracks.slice(0);
  for (let key in newTracks[trackNumber]) {
    newTracks[trackNumber][key].synth.octave = newOctave;
  }
  return dispatch => {
    dispatch({
      type: CHANGE_TRACK_OCTAVE,
      tracks: newTracks
    });
  };
};
