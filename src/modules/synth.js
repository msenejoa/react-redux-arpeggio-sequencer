import Tone from "tone";
//import scale from 'music-scale'
//import * as Key from "tonal-key"
//import transpose from 'pitch-transpose'
import { Note, Distance, Scale } from "tonal";

export const meter = new Tone.Meter();

export const synthSequencer = (options, userScale, key) => {
  let { attack, decay, sustain, release } = options.synthOptions.envelope;
  let timeDelay = (attack + decay + sustain + release + 0.06) * 1000;

  let notes = Scale.notes(key + " " + userScale);
  let distance = Distance.semitones(notes[0], notes[options.note - 1]);
  let firstNote = Note.midi(key + options.octave);

  let synthOne = new Tone.Synth(options.synthOptions).toMaster();
  synthOne.connect(meter);

  let notePlayed = Note.fromMidi(firstNote + distance);
  synthOne.triggerAttackRelease(notePlayed, "+0");
  setTimeout(() => synthOne.disconnect(), timeDelay);
};

export const toneConstant = new Tone();
