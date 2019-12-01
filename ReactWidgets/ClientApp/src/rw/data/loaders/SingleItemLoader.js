import Loader from './Loader';
import utils from '../../utils';

// Loader of a single item using OData specifications
export default class SingleItemLoader extends Loader {

    buildUrl(cfg) {

        cfg = cfg || {}; // It might be undefined if no extra configuration is provided

        let qs = [];

        const select = this.buildSelect(cfg.fields);

        if (select) {

            qs.push(`$select=${select}`);
        }

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