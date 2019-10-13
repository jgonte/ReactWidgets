export default {

    format(fmt, ...args) {

        return fmt.replace(
            /{(\d+)}/g,
            (match, index) => typeof args[index] !== 'undefined' ? args[index] : match
        );
    },

    getUrlParameters() {

        const params = {};

        if (!window.location.search) {

            return params;
        }

        const pairs = window.location.search.substring(1).split("&");

        pairs.forEach(p => {

            const [ key, value ] = p.split("=");

            params[key.trim().toLowerCase()] = decodeURIComponent(value.trim());
        });

        return params;
    },

    getUrlParameter(key, defaultValue = '') {

        const value = this.getUrlParameters()[key.trim().toLowerCase()];
 
        return value ? value : defaultValue;        
    },

    areEqual(o1, o2) {

        var props1 = Object.getOwnPropertyNames(o1);

        var props2 = Object.getOwnPropertyNames(o2);

        // If number of properties is different,
        // objects are not equivalent
        if (props1.length !== props2.length) {

            return false;
        }

        for (let i = 0; i < props1.length; ++i) {

            var propName = props1[i];

            // If values of same property are not equal,
            // objects are not equivalent
            if (o1[propName] !== o2[propName]) {
                return false;
            }
        }

        // If we made it this far, objects
        // are considered equivalent
        return true;
    }
};