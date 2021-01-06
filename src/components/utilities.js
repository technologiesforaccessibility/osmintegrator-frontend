export function comparePasswords(pass1, pass2) {
        return (pass1 === pass2)
    }

export function isPasswordStrong(password) {
    const pattern = /^\S{8,}$/g;
    return password.match(pattern);
}

export function getTokenFromPath(url_string) {
    const url = new URL(url_string);
    const rawToken = url.searchParams.get("token");
    return rawToken.split(" ").join("+");
}

export function getEmailFromPath(url_string) {
    const url = new URL(url_string);
    return url.searchParams.get("email");
}