import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { useRoute } from 'vue-router';
import ProfileView from "../views/ProfileView";
import Home from "../views/Home";
import TracksView from "../views/TracksView";
import Matches from "../views/Matches";
import Matcher from "../views/Matcher";
import About from "../views/About";
import Error from "../views/Error";
import Chat from "../views/Chat";


const axios = require('axios');
const route = useRoute();

const noAuthRoutes = ['/', '/login', '/callback', '/error', '/about', '/chat'];


const routes = [
    {
        path: '/chat',
        name: 'Chat',
        component: Chat,
    },
    {
        path: '/error',
        name: 'Error',
        component: Error,
        props: true
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
    {
        path: '/matcher',
        name: 'Matcher',
        component: Matcher,
    },
    {
        path: '/matches',
        name: 'Matches',
        component: Matches
    },
    {
        path: '/tracks',
        name: 'TracksView',
        component: TracksView
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    },

    {
        path: '/profile',
        name: 'ProfileView',
        component: ProfileView,
    },
    {
        path: '/refresh',
        beforeEnter(to, from, next) {
            Util.refreshToken();
        }
    },
    {
        path: '/login',
        beforeEnter(to, from, next) {
            async function getUrl() {
                return await axios.get(`${process.env.VUE_APP_BACKEND_ROOT_URL}/spotifymatcher/authentication/url`, {
                    headers: {
                        baseRoute: process.env.VUE_APP_ORIGIN
                    }
                }).catch(function (error) {
                    router.push({
                        name: "Error",
                        params: { message: "Server is down" },
                    });
                })
            }
            async function useUrl() {
                const url = await getUrl();
                if (url != null) {
                    window.location.replace(url.data);
                }
            }
            useUrl();
        }
    },
    {
        path: '/callback',
        beforeEnter(to, from, next) {
            let urlParams = new URLSearchParams(window.location.search);
            let cd = urlParams.get('code');
            getToken(cd);
            if (localStorage.getItem('id') == null) {
                getUserSpotifyId();
            }
            if (!tokenExists()) {
                setTimeout(function () { router.push('/home'); }, 1200);
            } else {
                router.push('/home')
            }
        }
    },


]

async function getUserSpotifyId() {
    console.log("getUserSpotifyId invoked")
    const token = JSON.parse(localStorage.getItem("token"));
    try {
        const res = await axios.get(
            `${process.env.VUE_APP_BACKEND_ROOT_URL}/spotifymatcher/users/profile`,
            {
                headers: { token: token.access_token },
            }
        );
        localStorage.setItem('id', res.data.id);
        // console.log(res.data)
    } catch (e) {
        this.$router.push('error');
        console.error(e);
    }
}


function getToken(code) {

    async function requestToken() {
        return await axios.get(`${process.env.VUE_APP_BACKEND_ROOT_URL}/spotifymatcher/authentication/token`, {
            headers: {
                code: code,
                baseRoute: process.env.VUE_APP_ORIGIN
            }
        })
            .catch(function (error) {
                return error.response;
            })
    }

    async function useToken() {
        const token = await requestToken();
        if (token.status === 400) {
            router.push({
                name: "Error",
                params: { message: "There was a problem logging in." },
            });
        }
        else {
            const now = new Date()
            persistUser(token.data.access_token);

            localStorage.setItem("token", JSON.stringify(token.data));
        }
    }
    useToken();
}

function persistUser(token) {
    axios.post(`${process.env.VUE_APP_BACKEND_ROOT_URL}/spotifymatcher/authentication/persist`, null, {
        headers: {
            token: token
        }
    })
}

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})


router.beforeEach((to, from) => {

    if (tokenExists() && tokenIsValid() || noAuthRoutes.includes(to.path)) {
        return true;
    }
    return false;

})


function tokenExists() {
    return localStorage.getItem('token') != null
}

function tokenIsValid() {
    const now = Date.now();
    return JSON.parse(localStorage.getItem("token")).expires_at > now
}


export class Util {

    static refreshToken() {
        const rt = JSON.parse(localStorage.getItem("token"));
        const refreshToken = rt.refresh_token;
        async function requestToken() {
            return await axios.get(`${process.env.VUE_APP_BACKEND_ROOT_URL}/spotifymatcher/authentication/refresh`, {
                headers: {
                    refreshToken: refreshToken
                }
            }).catch(function (error) {
                return error.response;
            })
        }

        async function saveToken() {
            const token = await requestToken();
            if (token.status === 400) {
                //handle error
            }
            else {
                token.data.refresh_token = refreshToken;
                localStorage.setItem("token", JSON.stringify(token.data));
            }
        }
        saveToken();

    }

    static refreshIfExpired(token) {
        const now = Date.now();
        if (token.expires_at < now) {
            Util.refreshToken();
        }

    }


}


export default router

