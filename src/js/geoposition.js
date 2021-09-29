/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
export default function getGeoposition() {
  return new Promise((resolve, reject) => {
    function success(pos) {
      const { latitude, longitude } = pos.coords;
      resolve({ latitude: +latitude.toFixed(5), longitude: +longitude.toFixed(5) });
    }
    function error(err) {
      reject(err);
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      reject(new Error('close'));
    // eslint-disable-next-line linebreak-style
    }
  });
}