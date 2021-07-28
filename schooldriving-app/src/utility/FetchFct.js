import config from './api';

function getData(url) {
  return fetch(`${config.api}${url}`)
    .then((response) => response.json())
    .then((result) => {
      return result
    })
    .catch((error) => console.log('error', error));
}

export {
  getData,
}
