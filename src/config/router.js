import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '@/components/home/Home';
import Auth from '@/components/auth/Auth';

import CallAdmin from "@/components/admin/CallAdmin";
import TeamAdmin from "@/components/admin/TeamAdmin";
import ScheduleAdmin from "@/components/admin/ScheduleAdmin";
import UserAdmin from "@/components/admin/UserAdmin";

import { userKey } from '@/global'

Vue.use(VueRouter)

const routes = [{
    name: 'home',
    path: '/',
    component: Home,
}, {
    name: 'auth',
    path: '/auth',
    component: Auth
}, {
    name: 'equipes',
    path: '/equipes',
    component: TeamAdmin,
    meta: { requiresAdmin: true }
}, {
    name: 'chamados',
    path: '/chamados',
    component: CallAdmin,
    meta: { requiresAdmin: true }
}, {
    name: 'agendamentos',
    path: '/agendamentos',
    component: ScheduleAdmin,
    meta: { requiresAdmin: true }
}, {
    name: 'usuarios',
    path: '/usuarios',
    component: UserAdmin,
    meta: { requiresAdmin: true }
}];

const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    const json = localStorage.getItem(userKey);

    if (to.matched.some(record => record.meta.requiresAdmin)) {
        const user = JSON.parse(json);
        user && user.admin ? next() : next({ path: '/' });
    } else {
        next();
    }

})

export default router;