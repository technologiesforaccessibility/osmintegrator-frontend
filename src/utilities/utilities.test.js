import {comparePasswords, isPasswordStrong, getTokenFromPath, getEmailFromPath} from './utilities';

test('comparePassowrds', () => {
    expect(comparePasswords("randompass1", "randompass1")).toBeTruthy();
    expect(comparePasswords("Randompass1", "randompass1")).toBeFalsy();
    expect(comparePasswords("randompass1 ", "randompass1")).toBeFalsy();
    expect(comparePasswords("randompass9", "randompass1")).toBeFalsy();
})


test('isPasswordStrong', () => {
    expect(isPasswordStrong("aaaaaaaa")).toBeTruthy();
    expect(isPasswordStrong("Sp3c!alPassword")).toBeTruthy();
    expect(isPasswordStrong("aaaaaaa")).toBeFalsy();
    expect(isPasswordStrong("        ")).toBeFalsy();
    expect(isPasswordStrong("aaa aaaa")).toBeFalsy();
    expect(isPasswordStrong(" aaaaaaa")).toBeFalsy();
    expect(isPasswordStrong(" aaaaaaa ")).toBeFalsy();
})


test('getTokenFromPath', () => {
    const url = "http://localhost:3000/RandomPath?email=example@example.com&token=CFa/Z6fi8F+4jf0u/SVBI+x4gWKe0D4fI3"
    const tokenResponse ="CFa/Z6fi8F+4jf0u/SVBI+x4gWKe0D4fI3"
    const pathOnly = "/RandomPath?email=example@example.com&token=CFa/Z6fi8F+4jf0u/SVBI+x4gWKe0D4fI3"
    const errorMessage = "Invalid URL: /RandomPath?email=example@example.com&token=CFa/Z6fi8F+4jf0u/SVBI+x4gWKe0D4fI3"
    expect(getTokenFromPath(url)).toBe(tokenResponse);
    expect(getTokenFromPath(pathOnly)).toBe(errorMessage);

})

test('getEmailFromPath', () => {
    const url = "http://localhost:3000/RandomPath?email=example@example.com&token=CFa/Z6fi8F+4jf0u/SVBI+x4gWKe0D4fI3"
    const pathOnly = "/RandomPath?email=example@example.com&token=CFa/Z6fi8F+4jf0u/SVBI+x4gWKe0D4fI3"
    const emailResponse ="example@example.com"
    const errorMessage = "Invalid URL: /RandomPath?email=example@example.com&token=CFa/Z6fi8F+4jf0u/SVBI+x4gWKe0D4fI3"
    expect(getEmailFromPath(url)).toBe((emailResponse));
    expect(getEmailFromPath(pathOnly)).toBe((errorMessage));
})