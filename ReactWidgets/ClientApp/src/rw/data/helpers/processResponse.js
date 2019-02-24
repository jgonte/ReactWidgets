export default function processResponse(fetchLoader, response) {

    if (fetchLoader.onResponse) {

        fetchLoader.onResponse(response);
    }

    if (response.status > 299) {

        const error = {
            status: response.status,
            statusText: response.statusText
        };

        fetchLoader.onFailure(error);

        return;
    }
    
    if (fetchLoader.onData) {

        if (response.status === 204) { // No content

            fetchLoader.onData({
                headers: response.headers,
                payload: null
            });
        }
        else {
            response.json().then(data => fetchLoader.onData({
                headers: response.headers,
                payload: data
            }));
        }
    }
}