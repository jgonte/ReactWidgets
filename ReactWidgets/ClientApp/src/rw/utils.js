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

            const [key, value] = p.split("=");

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

        // If number of properties is different, objects are not equivalent
        if (props1.length !== props2.length) {

            return false;
        }

        for (let i = 0; i < props1.length; ++i) {

            var propName = props1[i];

            // If values of same property are not equal, objects are not equivalent
            if (o1[propName] !== o2[propName]) {

                return false;
            }
        }

        // If we made it this far, objects are considered equivalent
        return true;
    },

    template(text, data) {

        var result = {
            keysNotInData: [] // Keys not found in the data
        };

        if (!data) {

            result.text = text;

            return result; // Nothing to replace in the tamplate
        }

        function processMatch(match/*, offset, string*/) {

            // Remove the {{ }} around the match
            match = match.replace('{{', '').replace('}}', '').trim();

            if (!data.hasOwnProperty(match)) { // Key was not found in data

                result.keysNotInData.push(match);
            }
            else {

                return data[match];
            }
        }

        result.text = text.replace(/\{{\S+?\}}/g, processMatch);

        return result;
    },

    // Builds the URL replacing any placeholder with the parameters passed and if not found a placeholder for those parameters,
    // they are generated as a key and value pair string
    buildParams(url, params) {

        if (!params) {

            return null;
        }

        var result = {};

        var tpl = this.template(url, params);

        result.url = tpl.text;

        if (tpl.keysNotInData.length) {

            result.params = tpl.keysNotInData
                .map(k => `${k}=${params[k]}`)
                .join('&');
        }
        else {

            result.params = null;
        }

        return result;
    }
};