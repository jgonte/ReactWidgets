export default class RequiredValidator {

    validate(value) {

        if (!value) {

            return this.message || 'Value cannot be empty';
        }
    }
}