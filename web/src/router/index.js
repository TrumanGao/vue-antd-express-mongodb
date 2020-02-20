import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Welcome from '@/pages/welcome.vue' // 欢迎页
import Layout from '@/pages/layout.vue' // 根页面

import AddMovie from '@/pages/layout/movie.vue' // 添加电影页
import AddCelebrity from '@/pages/layout/celebrity.vue' // 添加影人页
import Ranking from '@/pages/layout/ranking' // 榜单页
import History from '@/pages/layout/history' // 影史页

import Subject from '@/pages/detail' // 电影详情页
import Celebrity from '@/pages/detail/celebrity' // 影人详情页
import Personal from '@/pages/personal' // 个人中心

const router = new Router({
	mode: 'history',
	routes: [{
			name: 'welcome',
			path: '/welcome',
			component: Welcome,
		},
		{
			name: 'subject',
			path: '/subject/:id',
			component: Subject,
		},
		{
			name: 'celebrity',
			path: '/celebrity/:name',
			component: Celebrity,
		}, {
			name: 'layout',
			path: '/',
			redirect: '/addMovie',
			component: Layout,
			// 嵌套组件会被渲染在 Layout 的 <router-view> 中
			children: [{
					path: '/addMovie',
					component: AddMovie
				}, {
					path: '/addCelebrity',
					component: AddCelebrity
				},
				{
					path: '/ranking',
					component: Ranking,
				},
				{
					path: '/history',
					component: History,
				}, {
					path: '/personal',
					component: Personal,
				},
			]
		},
	]
})

router.beforeEach((to, from, next) => {
	if (to.path == '/personal') {
		if (!localStorage.getItem('token')) {
			console.log('未登录, 全局导航守卫')
			next('addMovie')
		}
	}
	next()
})

export default router
