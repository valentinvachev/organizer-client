import server from '../constants/constants';

export const requester = async (method, endPoint, body) => {
    const headers = { 'Content-Type': 'application/json' };

    const requestOptions = {
        method,
        headers,
    };

    if (method !== 'GET' && method !== 'DELETE') {
        requestOptions.body = JSON.stringify(body);
    }

    const response = await fetch(`${server}/${endPoint}`, requestOptions);
    const dataResponse = await response.json();

    if (!response.ok) {
        const errorToThrow = { code: response.status };
        errorToThrow.message = dataResponse.message || dataResponse.error;
        errorToThrow.url = dataResponse.url;
        throw errorToThrow;
    }

    return dataResponse;
};
