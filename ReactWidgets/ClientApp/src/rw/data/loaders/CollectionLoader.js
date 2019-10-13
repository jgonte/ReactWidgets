import Loader from './Loader';

// Loader of a collection of items using OData specifications
export default class CollectionLoader extends Loader {

    buildUrl(cfg) {

        cfg = cfg || {}; // It might be undefined if no extra configuration is provided

        let qs = [];

        if (cfg.top) {

            qs.push(`$top=${cfg.top}`);
        }

        if (cfg.skip) {

            qs.push(`$skip=${cfg.skip}`);
        }

        const select = this.buildSelect(cfg.fields);

        if (select) {

            qs.push(`$select=${select}`);
        }

        const filter = this.buildFilter(cfg.filter);

        if (filter) {

            qs.push(`$filter=${filter}`);
        }

        const orderBy = this.buildOrderBy(cfg.sorters);

        if (orderBy) {

            qs.push(orderBy);
        }

        const params = this.buildParams(cfg.params);

        if (params) {

            qs.push(params);
        }

        return qs.length ?
            `${this.url}?${qs.join('&')}` :
            this.url;
    }

    buildFilter(filter) {

        if (!filter) {

            return null;
        }

        if (!filter.operator) {

            throw new Error('Filter must have an operator defined.');
        }

        const operator = filter.operator.trim().toLowerCase();

        switch (operator) {
            case 'and':
            case 'or':
                {
                    let filters = filter.filters;

                    // TODO: Add checking for invalid parameters. In this case it must only be operator and filters

                    if (!filters.length) {
                        throw new Error(`Operator: '${filter.operator}' requires at least one child filter.`);
                    }

                    let qs = filter.filters.map(item => this.buildFilter(item)).join(` ${operator} `); // Recurse

                    return `(${qs})`;
                }
            case 'not':
                {
                    // TODO: Add checking for invalid parameters. In this case it must only be operator and one filter

                    if (!filter.filter) {
                        throw new Error(`Operator: '${filter.operator}' requires one child filter.`);
                    }

                    return `${operator} ${this.buildFilter(filter.filter)}`; // Recurse
                }
            case 'eq': // equal
            case 'ne': // not equal
            case 'lt': // less
            case 'le': // less or equal
            case 'gt': // greater
            case 'ge': // greater or equal
                {
                    if (!filter.field) {

                        throw new Error(`Operator: '${filter.operator}' requires a field.`);
                    }

                    if (!filter.value) {

                        throw new Error(`Operator: '${filter.operator}' requires a value.`);
                    }

                    return `${filter.field} ${operator} ${filter.value instanceof Number ? filter.value : `'${filter.value}'`}`;
                }
            case 'in': // in
            case 'ni': // not in
            case 'bw': // begins with
            case 'bn': // does not begin with
            case 'ew': // ends with
            case 'en': // does not end with
            case 'contains': // contains
            //case 'nc': // does not contain
                {
                    if (!filter.field) {

                        throw new Error(`Operator: '${filter.operator}' requires a field.`);
                    }

                    if (!filter.value) {

                        throw new Error(`Operator: '${filter.operator}' requires a value.`);
                    }

                    return `${operator}(${filter.field}, ${filter.value instanceof Number ? filter.value : `'${filter.value}'`})`;
                }

            case 'nu': // is null
            case 'nn': // is not null
                {
                    if (!filter.field) {

                        throw new Error(`Operator: '${filter.operator}' requires a field.`);
                    }

                    return `${filter.field} ${operator}`;
                }

            default: throw new Error(`Unknown operator: '${filter.operator}' in filter.`);
        }
    }

    buildOrderBy(sorters) {

        return (sorters && sorters.length) ?
            `$orderby=${sorters.map(item => `${item.field} ${item.order === 'desc' ? 'desc' : 'asc'}`).join(', ')}` :
            null;
    }
}