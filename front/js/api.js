const API_BASE = 'http://localhost:5000';

function apiGet(path) {
    return fetch(API_BASE + path, { headers: { 'Accept': 'application/json' } })
        .then(function (r) {
            if (!r.ok) return r.text().then(function (t) { throw new Error(t || r.statusText); });
            return r.json();
        });
}

function apiPost(path, data) {
    return fetch(API_BASE + path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
    }).then(function (r) {
        if (!r.ok) return r.text().then(function (t) { throw new Error(t || r.statusText); });
        return r.json();
    });
}
