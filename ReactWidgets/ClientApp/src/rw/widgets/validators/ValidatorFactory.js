import RequiredValidator from './RequiredValidator';
import EmailValidator from './EmailValidator';
import MaxLengthValidator from './MaxLengthValidator';
import CompareValidator from './CompareValidator';

class ValidatorFactory {

    validatorFactories = {};

    register(type, validatorFactory) {

        if (this.validatorFactories[type]) {

            throw new Error(`There is already a validator factory of type: ${type}`);
        }

        this.validatorFactories[type] = validatorFactory;

        return () => {

            delete this.validatorFactories[type];
        };
    }

    get(validatorType, conf) {

        if (!Object.keys(this.validatorFactories).some(k => k === validatorType)) {

            throw new Error(`There is no validator factory of type: ${validatorType}`);
        }

        let validator = this.validatorFactories[validatorType]();

        const { type, ...cfg } = conf; // Remove the type in cfg

        return Object.assign(validator, cfg);
    }

    remove(type) {

        if (!Object.keys(this.validatorFactories).some(k => k === type)) {

            throw new Error(`There is no validator factory of type: ${type}`);
        }

        delete this.validatorFactories[type];
    }

}

let validatorFactory = new ValidatorFactory();

// Register the validators here
validatorFactory.register('required', () => new RequiredValidator());
validatorFactory.register('email', () => new EmailValidator());
validatorFactory.register('maxLength', () => new MaxLengthValidator());
validatorFactory.register('compare', () => new CompareValidator());

export default validatorFactory;