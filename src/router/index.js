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

const noAuthRoutes = ['/', '/login', '/callback', '/error', '/about'];


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
        async beforeEnter(to, from) {
            let urlParams = new URLSearchParams(window.location.search);
            let cd = urlParams.get('code');
            await getSpotifyToken(cd);
            let id = await getUserSpotifyId();
            await getJwt(id);

            if (!tokenExists()) {
                setTimeout(function () { router.push('/home'); }, 2000);
            } else {
                router.push('/home')
            }
        }
    },


]

async function getUserSpotifyId() {
    const token = JSON.parse(localStorage.getItem("token"));
    try {
        const res = await axios.get(
            `${process.env.VUE_APP_BACKEND_ROOT_URL}/spotifymatcher/authentication/id`,
            {
                headers: { token: token.access_token },
            }
        );
        return res.data;
    } catch (e) {
        router.push('error');
        console.error(e);
    }
}


async function getSpotifyToken(code) {

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
    await useToken();
}

async function getJwt(id) {
    async function requestJwt() {
        return await axios.get(`${process.env.VUE_APP_AUTH_SERVER_URL}/api/token`, {
            headers: {
                userId: id
            }
        })
            .catch(function (error) {
                return error.response;
            })
    }

    async function useToken() {
        const token = await requestJwt();
        if (token.status === 400) {
            router.push({
                name: "Error",
                params: { message: "There was a problem logging in." },
            });
        }
        else {
            localStorage.setItem("jwt", JSON.stringify(token.data));
        }

    }
    await useToken();
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


export default router

