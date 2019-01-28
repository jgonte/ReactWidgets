import FetchLoader from './FetchLoader';
import SelectableFieldsUrlBuilder from '../helpers/builders/url/SelectableFieldsUrlBuilder';

export default class SingleItemFetchLoader extends FetchLoader {

    urlBuilder = null;

    constructor(conf) {

        super(conf);

        let urlBuilderConf = conf ? conf.urlBuilder : null;

        this.urlBuilder = new SelectableFieldsUrlBuilder(urlBuilderConf);
    }

    read(conf) {

        const url = this.urlBuilder.build(conf);

        super.read({ url });
    }
}
