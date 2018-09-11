export const colorPicker = (note, octave) => {
  let hue = String(note * 50);
  let light = String(parseInt(octave * 12.5, 10));
  //console.log(hue, light)
  return {
    hue,
    light
  };
};
