function fetchCookies(req) {
    let cookies = {};
    req.headers &&
        req.headers.cookie &&
        req.headers.cookie.split(';').forEach(function (cookie) {
            console.log('cookie is:', cookie);
            if (cookie.match(/(.*?)=(.*)$/)) {
                const cookieSplit = cookie.match(/(.*?)=(.*)$/);
                cookies[cookieSplit[1].trim()] = (cookieSplit[2] || '').trim();
            }
            else {
                cookies = {};
            }
        });
    return cookies;
}

module.exports = { fetchCookies };