import processResponse from '../processResponse';
import utils from '../../utils';

export default class Submitter {

    constructor(cfg) {

        if (!cfg.url) {

            throw new Error('URL is required for a submitter');
        }

        this.url = cfg.url;
    }

    submit(cfg) {

        cfg.headers = cfg.headers || {};

        if (!cfg.headers.hasOwnProperty('Content-Type')) {

            cfg.headers['Content-Type'] = 'application/json';
        }

        let url = this.buildUrl(cfg);

        fetch(url,
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

    buildUrl(cfg) {

        cfg = cfg || {}; // It might be undefined if no extra configuration is provided

        const qs = [];

        let url;

        if (cfg.params) {

            const prms = utils.buildParams(this.url, cfg.params);

            if (prms.params) {

                qs.push(prms.params);
            }

            if (prms.url) {

                url = prms.url;
            }
        }

        url = url || this.url;

        return qs.length ?
            `${url}?${qs.join('&')}` :
            url;
    }
}