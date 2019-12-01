import ComparisonOperators from '../ComparisonOperators';
import LogicalOperators from '../LogicalOperators';
import MultiValueOperators from '../MultiValueOperators';
import StringFunctions from '../StringFunctions';
import Loader from './Loader';
import utils from '../../utils';

// Loader of a collection of items using OData specifications
export default class CollectionLoader extends Loader {

    buildUrl(cfg) {

        cfg = cfg || {}; // It might be undefined if no extra configuration is provided

        let qs = [];

        if (cfg.top) {

            qs.push(`$top=${cfg.top}`);
        }

        if (cfg.skip || cfg.skip === 0) {

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

    buildFilter(filter) {

        if (!filter) {

            return null;
        }

        if (!filter.operator) {

            throw new Error('Filter must have an operator defined.');
        }

        const operator = filter.operator.trim().toLowerCase();

        switch (operator) {
            case LogicalOperators.And:
            case LogicalOperators.Or:
                {
                    let filters = filter.filters;

                    // TODO: Add checking for invalid parameters. In this case it must only be operator and filters

                    if (!filters.length) {
                        throw new Error(`Operator: '${filter.operator}' requires at least one child filter.`);
                    }

                    return filter.filters.map(item => this.buildFilter(item)).join(` ${operator} `); // Recurse
                }
            case LogicalOperators.Not:
                {
                    // TODO: Add checking for invalid parameters. In this case it must only be operator and one filter

                    if (!filter.filter) {
                        throw new Error(`Operator: '${filter.operator}' requires one child filter.`);
                    }

                    const childFilter = this.buildFilter(filter.filter); // Recurse

                    return childFilter ?
                        `${operator} ${childFilter}`
                        : null; // Nothing to "not"
                }
            case MultiValueOperators.In:
            case MultiValueOperators.NotIn:
                {
                    if (!filter.fieldName) {

                        throw new Error(`Operator: '${filter.operator}' requires a field.`);
                    }

                    let fieldValues;

                    if (typeof filter.fieldValues === 'function') {

                        fieldValues = filter.fieldValues();
                    }
                    else {

                        throw new Error(`Invalid field values in filter with operator: '${MultiValueOperators.In}'`)
                    }

                    if (Array.isArray(fieldValues)) {

                        if (!fieldValues.length) {

                            if (typeof filter.fieldValues === 'function') {

                                return null; // The function did not return any values
                            }
                            else {

                                throw new Error("Values are required for multi-value operators");
                            }
                        }

                        fieldValues = fieldValues.join(', ');
                    }

                    return `${filter.fieldName} ${operator} (${fieldValues})`;
                }
            case ComparisonOperators.IsEqual:
            case ComparisonOperators.IsNotEqual:
            case ComparisonOperators.IsGreaterThan:
            case ComparisonOperators.IsGreaterThanOrEqual:
            case ComparisonOperators.IsLessThan:
            case ComparisonOperators.IsLessThanOrEqual:
                {
                    if (!filter.fieldName) {

                        throw new Error(`Operator: '${filter.operator}' requires a field.`);
                    }

                    if (!filter.value) {

                        throw new Error(`Operator: '${filter.operator}' requires a value.`);
                    }

                    return `${filter.fieldName} ${operator} ${filter.value instanceof Number ? filter.value : `'${filter.value}'`}`;
                }
            // case 'in': // in
            // case 'ni': // not in
            // case 'bw': // begins with
            // case 'bn': // does not begin with
            // case 'ew': // ends with
            // case 'en': // does not end with
            //case 'nc': // does not contain
            case StringFunctions.Contains:
            case StringFunctions.StartsWith:
            case StringFunctions.EndsWith:
                {
                    if (!filter.fieldName) {

                        throw new Error(`Operator: '${filter.operator}' requires a field.`);
                    }

                    if (!filter.value) {

                        throw new Error(`Operator: '${filter.operator}' requires a value.`);
                    }

                    return `${operator}(${filter.fieldName}, ${filter.value instanceof Number ? filter.value : `'${filter.value}'`})`;
                }

            // case 'nu': // is null
            // case 'nn': // is not null
            //     {
            //         if (!filter.fieldName) {

            //             throw new Error(`Operator: '${filter.operator}' requires a field.`);
            //         }

            //         return `${filter.fieldName} ${operator}`;
            //     }

            default: throw new Error(`Unknown operator: '${filter.operator}' in filter.`);
        }
    }

    buildOrderBy(sorters) {

        return (sorters && sorters.length) ?
            `$orderby=${sorters.map(item => `${item.fieldName} ${item.order === 'descend' ? 'desc' : 'asc'}`).join(', ')}` :
            null;
    }
}