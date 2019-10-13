import Loader from './Loader';

// Loader of a single item using OData specifications
export default class SingleItemLoader extends Loader {

    buildUrl(cfg) {

        cfg = cfg || {}; // It might be undefined if no extra configuration is provided

        let qs = [];

        const select = this.buildSelect(cfg.fields);

        if (select) {

            qs.push(`$select=${select}`);
        }

        const params = this.buildParams(cfg.params);

        if (params) {

            qs.push(params);
        }

        return qs.length ?
            `${this.url}?${qs.join('&')}` :
            this.url;
    }
}