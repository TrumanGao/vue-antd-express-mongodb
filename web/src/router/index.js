import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Welcome from '@/page/welcome.vue' // 欢迎页
import Layout from '@/page/layout.vue' // 根页面

import AddMovie from '@/page/layout/movie.vue' // 添加电影页
import AddCelebrity from '@/page/layout/celebrity.vue' // 添加影人页
import Ranking from '@/page/layout/ranking' // 榜单页
import History from '@/page/layout/history' // 影史页

import Subject from '@/page/detail' // 电影详情页
import Celebrity from '@/page/detail/celebrity' // 影人详情页

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
		},{
			name: 'layout',
			path: '/',
			redirect: '/addMovie',
			component: Layout,
			// 嵌套组件会被渲染在 Layout 的 <router-view> 中
			children: [{
					path: '/addMovie',
					component: AddMovie
				},{
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
				},
			]
		},
	]
})

export default router
