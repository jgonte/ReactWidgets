export default class SelectableFieldsUrlBuilder {

    fieldsProperty = 'fields';

    constructor(conf) {

        if (!conf) {

            return;
        }

        this.fieldsProperty = conf.fieldsProperty || this.fieldsProperty;
    }

    build(conf) {

        const {
            loadUrl,
            fields
        } = conf;

        if (fields && fields.length) { // Expected an array of field names

            const args = `${this.fieldsProperty}=${fields.join(',')}`;

            return (loadUrl.indexOf('?') === -1) ? loadUrl + '?' + args : loadUrl + args;
        }

        return loadUrl;
    }
}
