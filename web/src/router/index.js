import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Welcome from '@/page/welcome.vue' // 欢迎页
import Layout from '@/page/layout.vue' // 根页面
import Home from '@/page/home.vue' // 首页
import Ranking from '@/page/ranking/index.vue' // 榜单页
import History from '@/page/history' // 影史页
import Subject from '@/page/subject' // 详情页

const router = new Router({
	mode: 'history',
	routes: [{
		name: 'welcome',
		path: '/welcome',
		component: Welcome,
	}, {
		name: 'layout',
		path: '/',
		redirect:'/home',
		component: Layout,
		// 嵌套组件会被渲染在 Layout 的 <router-view> 中
		children: [{
				path: '/home',
				component: Home
			},
			{
				path: '/ranking',
				component: Ranking,
			},
			{
				path: '/history',
				component: History,
			},
			{
				path: '/subject',
				component: Subject,
			},
		]
	}, ]
})

export default router
