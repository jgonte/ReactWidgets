export default class MetadataHeaderMetadataMapper {

    getMetadata(conf) {

        const headers = conf.headers;

        // const header = headers['Metadata'];

        // if (header) {

        //     return JSON.parse(header);
        // }

        return {
            eTag: headers.get('ETag'),
            totalRecords: conf.payload.length
        };
    }
}