import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
//import counter from './counter';
import sequencer from "./sequencer";

export default combineReducers({
  router: routerReducer,
  //  counter,
  sequencer
});
