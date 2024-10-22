import { createRouter, createWebHistory } from 'vue-router'

// dashboard
const dashboardMain = () => import('@/views/dashboard/Main.vue')

// home
const homeMain = () => import('@/views/home/Main.vue')
const home = () => import('@/views/home/Home.vue')

const routes = [
	{
		path: '',
		name: 'home',
		component: homeMain,
		children: [
			{
				path: '',
				name: 'home',
				component: home,
			},
		],
	},
	{
		path: '/dashboard',
		name: 'dashboard',
		component: dashboardMain,
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

export default router

router.beforeEach((to, from, next) => {
	return next()
})
