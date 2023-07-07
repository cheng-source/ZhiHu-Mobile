import { lazy } from 'react';
import Home from '../views/Home'

const routes = [{
    name: 'home',
    path: '/',
    component: Home,
    meta: {
        title: '知乎日报-WebApp'
    }
}, {
    name: 'detail',
    path: '/detail/:id',
    component: lazy(() =>
        import ('../views/Detail')),
    meta: {
        title: '新闻详情-知乎日报'
    }
}, {
    name: 'personal',
    path: '/personal',
    component: lazy(() =>
        import ('../views/Personal')),
    meta: {
        title: '个人中心-知乎日报'
    }
}, {
    name: 'store',
    path: '/store',
    component: lazy(() =>
        import ('../views/Store')),
    meta: {
        title: '我的收藏-知乎日报'
    }
}, {
    name: 'update',
    path: '/update',
    component: lazy(() =>
        import ('../views/Update')),
    meta: {
        title: '修改个人信息-知乎日报'
    }
}, {
    name: 'login',
    path: '/login',
    component: lazy(() =>
        import ('../views/Login')),
    meta: {
        title: '登录-知乎日报'
    }
}, {
    name: '404',
    path: '*',
    component: lazy(() =>
        import ('../views/Page404')),
    meta: {
        title: '404页面-知乎日报'
    }
}];

export default routes;