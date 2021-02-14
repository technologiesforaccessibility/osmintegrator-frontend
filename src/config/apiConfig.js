export function postDefaultHeaders() {
    return {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
    }
}


export function getDefaultHeadersWithToken(token) {
    return {
        'Authorization': 'Bearer ' + token,
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
    }
}