import uniqid from "uniqid";

export const beats = 8;
export const measures = 4;

export function* gen() {
  for (let i = 0; i < beats; i++) {
    let offset = i + 1;
    let note = offset === beats || i === 0 ? 1 : offset;
    let name = "button-" + String(i);
    yield {
      checked: false,
      id: uniqid(),
      value: i,
      name: name,
      number: i,
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
            attack: 0.2,
            decay: 0.1,
            sustain: 0.001,
            release: 0.001
          },
          volume: -10
        }
      }
    };
  }
}

//export const trackOne = [...gen()];
//export const trackTwo = [...gen()];
//export const trackThree = [...gen()];
