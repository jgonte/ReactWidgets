import processResponse from '../processResponse';

export default class Submitter {

    constructor(cfg) {

        if (!cfg.url) {

            throw new Error('URL is required for a submitter');
        }

        this.url = cfg.url;
    }

    async submit(cfg) {

        cfg.headers = cfg.headers || {};

        if (!cfg.headers.hasOwnProperty('Content-Type')) {

            cfg.headers['Content-Type'] = 'application/json';
        }

        await fetch(this.url,
            {
                method: cfg.method,
                headers: new Headers(cfg.headers),
                body: JSON.stringify(cfg.data)
            })
            .then(response => {
                processResponse(this, response);
            })
            .catch(error => {
                this.onError(error);
            });
    }
}