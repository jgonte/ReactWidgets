export default function getMetadata(response) {

    const headers = response.headers;

    // const header = headers['Metadata'];

    // if (header) {

    //     return JSON.parse(header);
    // }

    const payload = response.payload || []; // Payload might be nil when there is no data loaded

    const paginationHeader = headers.get('X-Pagination');

    return {
        eTag: headers.get('ETag'),
        pagination: paginationHeader ? JSON.parse(paginationHeader) : {},
        records: payload.length
    };
}