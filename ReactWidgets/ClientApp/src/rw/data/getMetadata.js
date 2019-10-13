export default function getMetadata(response) {

    const headers = response.headers;

    // const header = headers['Metadata'];

    // if (header) {

    //     return JSON.parse(header);
    // }

    const payload = response.payload || []; // Payload might be nill when there is no data loaded

    return {
        eTag: headers.get('ETag'),
        totalRecords: payload.length
    };
}