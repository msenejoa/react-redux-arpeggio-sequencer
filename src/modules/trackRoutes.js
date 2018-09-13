import uniqid from "uniqid";

export const beats = 8;
export const measures = 4;

export function* gen(pat = 0, beat = 8) {
  //console.log(pat)
  for (let i = 0; i < beat; i++) {
    let offset = i + 1;
    let note = arp(i, pat);
    //let note = offset === beats || i === 0 ? 1 : offset;
    let name = "button-" + String(i);
    yield {
      checked: true,
      id: uniqid(),
      value: i,
      name: name,
      number: i,
      pattern: pat,
      synth: {
        octave: "3",
        note: note,
        attack: 0.0001,
        decay: 0.5,
        synthOptions: {
          oscillator: {
            type: "sine"
          },
          envelope: {
            attack: 0.1,
            decay: 0.2,
            sustain: 0.001,
            release: 0.001
          },
          volume: -10
        }
      }
    };
  }
}

export function arp(note, pat) {
  let patternOverflow = pat % arpDictionary.length;
  let distance = note % arpDictionary[patternOverflow].length;

  return arpDictionary[patternOverflow][distance] + 1;
}

export const arpDictionary = [
  [0, 1, 2, 4, 5, 3],
  [0, 2, 3, 1, 5, 4],
  [0, 1, 2, 4, 3, 5],
  [0, 3, 1, 4, 5, 2],
  [0, 2, 4, 4, 5, 3],
  [0, 1, 2, 3, 4, 5],
  [0, 1, 2],
  [0, 1, 2, 4, 3, 5],
  [0, 1, 2, 3, 5, 4],
  [0, 1, 2, 4, 5, 3]
];

export function trackOctaveChecker(tracks) {
  let octave = tracks[0].synth.octave;
  let bool = true;
  for (let i in tracks) {
    bool *= tracks[i].synth.octave === octave;
  }
  bool = bool ? true : false;
  return {
    value: octave,
    bool: bool
  };
}

export function trackPatternChecker(tracks) {
  let pattern = tracks[0].pattern;
  let bool = true;
  for (let i in tracks) {
    bool *= tracks[i].pattern === pattern;
  }
  bool = bool ? true : false;
  return {
    value: pattern,
    bool: bool
  };
}

//export const trackOne = [...gen()];
//export const trackTwo = [...gen()];
//export const trackThree = [...gen()];
