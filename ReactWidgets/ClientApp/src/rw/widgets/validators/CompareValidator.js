const compare = (value, operator, valueToCompare) => {
    switch (operator.toLowerCase()) {
        case 'equals': return value === valueToCompare;
        default: throw new Error(`compare is not implemented for operator: ${operator}`);
    }
};

const getMessage = operator => {
    switch (operator.toLowerCase()) {
        case 'equals': return 'Values must match';
        default: throw new Error(`getMessage is not implemented for operator: ${operator}`);
    }
};

export default class CompareValidator {

    validate(value) {

        const operator = this.operator || 'equals';

        if (!compare(value, operator, this.valueToCompare(this))) {

            return this.message || getMessage(operator);
        }
    }
}