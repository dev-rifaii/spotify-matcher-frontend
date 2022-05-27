import { createRouter, createWebHistory } from 'vue-router'
import { useRoute } from 'vue-router';
import ProfileView from "../views/ProfileView";
import Home from "../views/Home";
import TracksView from "../views/TracksView";
import Matches from "../views/Matches";
import Matcher from "../views/Matcher";
import About from "../views/About";
import Error from "../views/Error";

const axios = require('axios');
const route = useRoute();

const noAuthRoutes = ['/', '/login', '/callback','/error'];


const routes = [
    {
        path: '/error',
        name: 'Error',
        component: Error
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
                // return await axios.get("http://localhost:8080/spotifymatcher/authentication/url", {
                    return await axios.get(`${process.env.VUE_APP_BACKEND_ROOT_URL}/spotifymatcher/authentication/url`, {

                    headers: {
                        baseRoute: window.location.origin
                    }
                })
            }
            async function useUrl() {
                const url = await getUrl();
                window.location.replace(url.data);
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
            router.push('/home')
        }
    },


]


function getToken(code) {

    async function requestToken() {
        return await axios.get(`${process.env.VUE_APP_BACKEND_ROOT_URL}/spotifymatcher/authentication/token`, {
            headers: {
                code: code,
                baseRoute: window.location.origin
            }
        }).catch(function (error) {
            return error.response;
        })
    }

    async function useToken() {
        const token = await requestToken();
        if (token.status === 400) {
            //handle error
        }
        else {
            const now = new Date()
            console.log(now.getTime());
            localStorage.setItem("token", JSON.stringify(token.data));
        }
    }
    useToken();
}


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})


router.beforeEach((to, from) => {


    if (tokenExists() || noAuthRoutes.includes(to.path)) {

        return true;
    }

    return false;

})


function tokenExists() {
    return localStorage.getItem('token') != null
}


export class Util {


    static refreshToken() {
        console.log("expired")

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

