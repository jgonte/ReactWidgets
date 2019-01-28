import SelectableFieldsUrlBuilder from './SelectableFieldsUrlBuilder';
import FilterQueryStringBuilder from './FilterQueryStringBuilder';

export default class CollectionUrlBuilder extends SelectableFieldsUrlBuilder {

    filterProperty = 'filter';

    filterBuilder = new FilterQueryStringBuilder();

    orderByProperty = 'orderBy';

    pageIndexProperty = 'pageIndex';

    pageSizeProperty = 'pageSize';

    constructor(conf) {

        super(conf);

        if (!conf) {

            return;
        }

        this.filterProperty = conf.filterProperty || this.filterProperty;

        this.orderByProperty = conf.orderByProperty || this.orderByProperty;

        this.pageIndexProperty = conf.pageIndexProperty || this.pageIndexProperty;

        this.pageSizeProperty = conf.pageSizeProperty || this.pageSizeProperty;
    }

    build(conf) {

        const loadUrl = super.build(conf);

        const buildSorterQuery = item => `${item.field} ${item.direction === 'desc' ? 'desc' : 'asc'}`;

        if (conf) {

            let args = [];

            // For each key - value item create a query string clause
            Object.keys(conf).forEach(key => {

                switch (key) {
                    case 'loadUrl': 
                    case 'headers': {
                        // Do nothing
                    }
                    break;
                    case 'filter': { // Expected a filter node
                        let filter = conf.filter;

                        if (filter) {

                            args.push(`${this.filterProperty}=${this.filterBuilder.build(filter)}`);
                        }
                    }
                    break;
                    case 'sorters': { // Expected an array of sorter objects
                        let sorters = conf.sorters;

                        if (sorters && sorters.length) {

                            args.push(`${this.orderByProperty}=${sorters.map(item => buildSorterQuery(item)).join(',')}`);
                        }
                    }
                    break;
                    case 'pageIndex': {
                        args.push(`${this.pageIndexProperty}=${conf.pageIndex}`);
                    }
                    break;
                    case 'pageSize': {
                        args.push(`${this.pageSizeProperty}=${conf.pageSize}`);
                    }
                    break;
                    default: {
                        const value = conf[key];

                        if (value) {
                            args.push(`${key}=${value}`); // Add the extra arguments                            
                        }
                    }
                    break;
                }
            });

            if (args.length) {
                let qs = args.join('&');

                return (loadUrl.indexOf('?') === -1) ? loadUrl + '?' + qs : loadUrl + '&' + qs;
            }

        }

        return loadUrl;
    }

}
