import processResponse from '../processResponse';

export default class Loader {

    constructor(cfg) {

        // Do not enforce setting the URL since the form might not be loadable
        this.url = cfg.url;
    }

    buildHeaders() {

        let headers = [];

        const metadata = this.metadata;

        if (!metadata) {

            return headers;
        }

        const { cacheData } = this.props;

        if (cacheData && metadata.eTag) { // Do not send it if not cached

            headers.push({
                key: 'If-None-Match',
                value: metadata.eTag
            });
        }

        return headers;
    }

    async load(cfg) {

        await this.fetch({
            headers: this.buildHeaders(cfg),
            url: this.buildUrl(cfg)
        });
    }

    async fetch(cfg) {

        let headers = new Headers();

        if (cfg.headers) {

            cfg.headers.forEach((header) => headers.append(header.key, header.value));
        }

        await fetch(cfg.url,
            {
                headers: headers
            })
            .then(response => {
                processResponse(this, response);
            })
            .catch(error => {
                this.onError(error);
            });
    }

    // Builds the OData fragment of $select with the list of properties to be selected
    buildSelect(fields) {
        return fields && fields.length ?
            fields.join(',') :
            null;
    }

    // Builds the URL with the other parameters passed as an objects
    buildParams(params) {

        if (!params) {

            return null;
        }

        var keys = Object.keys(params);

        if (!keys.length) {

            return null;
        }

        return keys
            .map(k => `${k}=${params[k]}`)
            .join('&');
    }
}
