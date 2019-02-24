export default class MetadataHeaderMetadataMapper {

    getMetadata(conf) {

        const headers = conf.headers;

        // const header = headers['Metadata'];

        // if (header) {

        //     return JSON.parse(header);
        // }

        const payload = conf.payload || []; // Payload might be nill when there is no data loaded

        return {
            eTag: headers.get('ETag'),
            totalRecords: payload.length
        };
    }
}