export default class RestUrlBuilder {
    
    build(conf) {

        const {
            url,
            queryParams
        } = conf;

        return `${url}/${queryParams}`; // Assume queryParams is a string for now
    }
}