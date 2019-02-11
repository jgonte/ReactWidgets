export default {

    format(fmt, ...args) {

        return fmt.replace(
            /{(\d+)}/g,
            (match, index) => typeof args[index] !== 'undefined' ? args[index] : match
        );
    },

    getUrlParameters() {

        var params = {};

        window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
            (m, key, value) => params[key] = value
        );

        return params;
    },

    getUrlParameter(name, defaultValue = '') {

        if (window.location.href.indexOf(name) > -1) {

            return this.getUrlParameters()[name];
        }

        return defaultValue;        
    }
};