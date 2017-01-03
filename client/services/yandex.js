import request from 'superagent';
import * as config from '../config';

function handleResponse(resolve, reject, err, res) {
  if (err) {
    reject(err);
  } else {
    resolve(res.body);
  }
}

export default class Yandex {
  static translate(text) {
    return new Promise((resolve, reject) => request
        .get(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${config.YANDEX_API_KEY}&text=${text}&lang=fr`)
        .end(handleResponse.bind(this, resolve, reject))
    );
  }
}
