import { colorPicker } from "./colorPicker";

export const getRowIndexFromId = (id, tracks) => {
  // let activeTracks = tracks
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

  let { note, octave } = tracks[activeTrack][activeTrackIndex].synth;
  let hsl = colorPicker(note, octave);
  let rgb = hslToRgb(parseInt(hsl.hue, 10), 1, parseInt(hsl.light, 10) / 100);
  let rgbString = "rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")";
  return rgbString;
};

// expected hue range: [0, 360)
// expected saturation range: [0, 1]
// expected lightness range: [0, 1]
export const hslToRgb = (hue, saturation, lightness) => {
  // based on algorithm from http://en.wikipedia.org/wiki/HSL_and_HSV#Converting_to_RGB
  if (hue === undefined) {
    return [0, 0, 0];
  }

  var chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
  var huePrime = hue / 60;
  var secondComponent = chroma * (1 - Math.abs((huePrime % 2) - 1));

  huePrime = Math.floor(huePrime);
  var red;
  var green;
  var blue;

  if (huePrime === 0) {
    red = chroma;
    green = secondComponent;
    blue = 0;
  } else if (huePrime === 1) {
    red = secondComponent;
    green = chroma;
    blue = 0;
  } else if (huePrime === 2) {
    red = 0;
    green = chroma;
    blue = secondComponent;
  } else if (huePrime === 3) {
    red = 0;
    green = secondComponent;
    blue = chroma;
  } else if (huePrime === 4) {
    red = secondComponent;
    green = 0;
    blue = chroma;
  } else if (huePrime === 5) {
    red = chroma;
    green = 0;
    blue = secondComponent;
  }

  var lightnessAdjustment = lightness - chroma / 2;
  red += lightnessAdjustment;
  green += lightnessAdjustment;
  blue += lightnessAdjustment;

  return [
    Math.round(red * 255),
    Math.round(green * 255),
    Math.round(blue * 255)
  ];
};
