import promise from 'es6-promise';
import 'isomorphic-fetch';
import processResponse from '../helpers/processResponse';

promise.polyfill();

export default class FetchLoader {

    load(query) {

        let headers = new Headers();

        if (query.headers) {

            query.headers.forEach((header) => headers.append(header.key, header.value));
        }

        fetch(query.url, {
                headers: headers
            })
            .then(response => {
                processResponse(this, response);
            })
            .catch(error => {
                this.onFailure(error);
            });
    }
}