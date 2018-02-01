const RAF = window.requestAnimationFrame ||
window.webkitRequestAnimationFrame ||
window.mozRequestAnimationFrame ||
window.oRequestAnimationFrame ||
window.msRequestAnimationFrame ||
function (callback) {
  window.setTimeout(callback, 1000 / 60);
};

const AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;

export {
  RAF,
  AudioContext,
};
