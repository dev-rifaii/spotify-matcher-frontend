const axios = require('axios');
const express = require('express');
var querystring = require('querystring');
var cookieParser = require('cookie-parser')


var app = express();
app.use(cookieParser());

const clientId = '537744f06d43427ea4113474b592f490';
const clientSecret = '8bb8522abeb94fca91451573afa1ab08';
const callback = 'http://localhost:3000/callback'

app.get("/login", (req, res) => {

    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: clientId,
            scope: "user-read-private user-read-email user-follow-read user-top-read",
            redirect_uri: callback,

        }));
});


app.get('/callback', function (req, res) {

    var code = req.query.code || null;
    headers = {
        'Authorization': 'Basic ' + encode64(`${clientId}:${clientSecret}`),
        'Content-Type': 'application/x-www-form-urlencoded'
    };
    body = {
        code: code,
        redirect_uri: callback,
        grant_type: "authorization_code"
    };

    async function getToken() {
        return await axios.post('https://accounts.spotify.com/api/token', querystring.stringify(body), { headers })
    }
    async function useToken() {
        const token = await getToken();
        res.cookie("token", token.data.access_token);
        axios.post('http://localhost:8080/spotifymatcher/authentication/persist', null, { headers: { 'token': token.data.access_token } });
        res.send(token.data);
        res.end();
    }
    useToken();
});

app.listen(2000, () => {
    console.log("Server is running on port 2000")
});

function encode64(str) {
    return btoa(unescape(encodeURIComponent(str)));
}