import { server } from '../constants/constants';

export const requester = async (method, endPoint, body) => {
    const headers = { 'Content-Type': 'application/json' };

    const requestOptions = {
        method,
        headers,
    };

    if (method !== 'GET') {
        requestOptions.body = JSON.stringify(body);
    }

    const response = await fetch(`${server}/${endPoint}`, requestOptions);

    // if (!response.ok) {
    //     const errorToThrow = { code: response.status };
    //     const data = await response.json();
    //     errorToThrow.message = data.message;
    //     throw errorToThrow;
    // }

    const dataResponse = await response.json();
    return dataResponse;
};
