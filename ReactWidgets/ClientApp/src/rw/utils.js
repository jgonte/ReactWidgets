export default {

    format(fmt, ...args) {

        return fmt.replace(
            /{(\d+)}/g,
            (match, index) => typeof args[index] !== 'undefined' ? args[index] : match
        );
    }
}