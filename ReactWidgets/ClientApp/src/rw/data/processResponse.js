// Process a response from a loader/submitter
export default function processResponse(loaderOrSubmitter, response) {

    if (response.status > 299) {

        const error = {
            status: response.status,
            message: response.statusText
        };

        loaderOrSubmitter.onError(error);

        return; // In case of an error, stop any further processing
    }

    if (loaderOrSubmitter.onResponse) {

        loaderOrSubmitter.onResponse(response);
    }
    
    if (loaderOrSubmitter.onData) {

        if (response.status === 204) { // No content

            loaderOrSubmitter.onData({
                headers: response.headers,
                payload: null
            });
        }
        else {
            response.json().then(data => loaderOrSubmitter.onData({
                headers: response.headers,
                payload: data
            }));
        }
    }
}