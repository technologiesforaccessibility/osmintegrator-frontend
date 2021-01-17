export function postDefaultHeaders() {
    return {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
    }
}