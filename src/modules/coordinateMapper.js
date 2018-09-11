export const coordinateMapper = (beats, trackNumber) => {
  let degree = 360 / beats;
  let cumDegree = 0;
  let newArray = [];
  let factor = trackNumber * 1.3;
  for (let i = 0; i < beats; i++) {
    let x = Math.cos(toRadians(cumDegree + 30 * trackNumber)) * factor;
    let y = Math.sin(toRadians(cumDegree + 30 * trackNumber)) * factor;
    newArray.push({ x: x, y: y });
    cumDegree += degree;
  }
  return newArray;
};

const toRadians = angle => {
  return angle * (Math.PI / 180);
};
