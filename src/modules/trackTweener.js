import decibelsToGain from "decibels/to-gain";
import TWEEN from "@tweenjs/tween.js";

export const trackTweener = tracks => {
  let newTracks = tracks.slice(0);
  for (let i in newTracks) {
    for (let j in newTracks[i]) {
      arrayMapper(newTracks[i][j]);
    }
  }
  return newTracks;
};

const arrayMapper = list => {
  let attack = list.synth.synthOptions.envelope.attack * 1000;
  let decay = list.synth.synthOptions.envelope.decay * 1000;
  let volume = decibelsToGain(list.synth.synthOptions.volume) * 10;

  let initialPosition = { x: 0 };
  list["position"] = Object.assign({}, initialPosition);
  let target = { x: volume };

  list["tween"] = {
    tweenAttack: new TWEEN.Tween(list.position).to(target, attack),
    tweenDecay: new TWEEN.Tween(list.position).to(initialPosition, decay)
  };

  list.tween.tweenAttack.chain(list.tween.tweenDecay);
};
