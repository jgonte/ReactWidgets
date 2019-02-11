import promise from 'es6-promise';
import 'isomorphic-fetch';
import processResponse from '../helpers/processResponse';

promise.polyfill();

export default class FetchSubmitter {

    submit(message) {

        message.headers = message.headers || {};

        if (!message.headers.hasOwnProperty('Content-Type')) {

            message.headers['Content-Type'] = 'application/json';
        }

        fetch(message.submitUrl,
            {
                method: message.method,
                headers: new Headers(message.headers),
                body: JSON.stringify(message.data)
            })
            .then(response => {

                if (response.status !== 204) { // No content

                    processResponse(this, response);                    
                }
            })
            .catch(error => {

                this.onFailure(error);
            });
    }
}