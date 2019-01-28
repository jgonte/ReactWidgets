export default class FilterQueryStringBuilder {

    build(filter) {

        if (!filter.operator) {

            throw new Error('Operator is required.');
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

                    let qs = filter.filters.map(item => this.build(item)).join(` ${operator} `); // Recurse

                    return `(${qs})`;
                }

            case 'eq': // equal
            case 'ne': // not equal
            case 'lt': // less
            case 'le': // less or equal
            case 'gt': // greater
            case 'ge': // greater or equal
            case 'in': // in
            case 'ni': // not in
            case 'bw': // begins with
            case 'bn': // does not begin with
            case 'ew': // ends with
            case 'en': // does not end with
            case 'cn': // contains
            case 'nc': // does not contain
                {
                    if (!filter.field) {

                        throw new Error(`Operator: '${filter.operator}' requires a field.`);
                    }

                    if (!filter.value) {

                        throw new Error(`Operator: '${filter.operator}' requires a value.`);
                    }

                    return `${filter.field} ${operator} ${filter.value}`;
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
}