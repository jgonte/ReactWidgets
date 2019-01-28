import utils from '../../utils';

export default class MaxLengthValidator {

    validate(value) {

        if (value && value.length > this.value) {

            var message = this.message || 'Value cannot exceed {0} characters. It has {1}.';

            return utils.format(message, this.value, value.length);
        }
    }
}