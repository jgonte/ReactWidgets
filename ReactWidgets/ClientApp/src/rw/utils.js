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

    // Tests whether two objects are equivalent
    areEquivalent(o1, o2) {

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

    /*

 * Crude implementation of equivalence between the two specified arguments.
 *
 * The primary intent of this function is for comparing data contexts, which
 * are expected to be object literals with potentially nested structures and
 * where leaf values are primitives.

    export function equals(o1: any, o2: any) {
    return equalsInternal(o1, o2, new Set());
}

 * Not exposed as it would undesirably leak implementation detail (`refs` argument).
 *
 * The `refs` argument is used to avoid infinite recursion due to circular references.
 *
 * @see equals

function equalsInternal(o1: any, o2: any, refs: Set<object>) {
    const o1Label = Object.prototype.toString.call(o1);
    const o2Label = Object.prototype.toString.call(o2);
    if (o1Label === o2Label && o1Label === '[object Object]' && !refs.has(o1)) {
        refs.add(o1);
        for (const k in o1) {
            if (!equalsInternal(o1[k], o2[k], refs)) {
                return false;
            }
        }
        for (const k in o2) {
            if (!o1.hasOwnProperty(k)) {
                return false;
            }
        }
        return true;
    }
    if (o1Label === o2Label && o1Label === '[object Array]' && !refs.has(o1)) {
        refs.add(o1);
        if (o1.length !== o2.length) {
            return false;
        }
        for (let i = 0; i < o1.length; i++) {
            if (!equalsInternal(o1[i], o2[i], refs)) {
                return false;
            }
        }
        return true;
    }
    // Everything else requires strict equality (e.g. primitives, functions, dates)
    return o1 === o2;
}

     */

    template(text, data) {

        let result = {
            keysNotInData: [] // Keys not found in the data
        };

        if (!data) {

            result.text = text;

            return result; // Nothing to replace in the tamplate
        }

        let matchFound = false;

        function processMatch(match/*, offset, string*/) {

            matchFound = true;
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

        if (!matchFound) {

            result.keysNotInData = Object.keys(data); // None of the keys were found
        }

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