import FetchLoader from './FetchLoader';
import CollectionUrlBuilder from '../helpers/builders/url/CollectionUrlBuilder';

export default class CollectionFetchLoader extends FetchLoader {

    urlBuilder = null;

    constructor(conf) {

        super(conf);

        let urlBuilderConf = conf ? conf.urlBuilder : null;

        this.urlBuilder = new CollectionUrlBuilder(urlBuilderConf);
    }

    read(conf) {

        const url = this.urlBuilder.build(conf);

        super.read({ url, headers: conf.headers });
    }
}