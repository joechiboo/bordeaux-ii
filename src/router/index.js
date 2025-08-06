import { createRouter, createWebHistory } from 'vue-router';
import store from '../store'; // 引入 Vuex store

const routes = [
	{
		path: '/login',
		name: 'Login',
		component: () => import('../components/UserLogin.vue'),
		meta: { title: '登入' },
	},
	{
		path: '/',
		name: 'Home',
		component: () => import('../components/WelcomeBanner.vue'), // 首頁組件
		meta: { title: '首頁' },
	},
	{
		path: '/welcome',
		name: 'Welcome',
		component: () => import('../components/WelcomeBanner.vue'), // 首頁組件
		meta: { title: '首頁' },
	},
	{
		path: '/rules',
		name: 'CommunityRules',
		component: () => import('../components/CommunityRules.vue'), // 社區規章組件
		meta: { title: '社區規章' },
	},
	{
		path: '/members',
		name: 'CommitteeMembers',
		component: () => import('../components/CommitteeMembers.vue'), // 管委會成員名單組件
		meta: { title: '委員名單' },
	},
	{
		path: '/records',
		name: 'MeetingMinutes',
		component: () => import('../components/MeetingMinutes.vue'), // 會議記錄組件
		meta: { title: '會議記錄', requiresAuth: true },
	},
	{
		path: '/facilities',
		name: 'Facilities',
		component: () => import('../components/CommunityFacilities.vue'), // 公共設施使用（琴房使用）組件
		meta: { title: '公共設施' },
	},
	{
		path: '/events',
		name: 'Events',
		component: () => import('../components/CommunityEvents.vue'), // 大事記
		meta: { title: '大事記' },
	},
];

const router = createRouter({
	history: createWebHistory(process.env.NODE_ENV === 'production' ? '/bordeaux-ii/' : '/'),
	routes,
});

router.beforeEach((to, from, next) => {
	if (to.meta.title) {
		document.title = '波爾多樂菲莊園 - 模範社區' + ' | ' + to.meta.title;
	}
	if (to.meta.requiresAuth && !store.state.isAuthenticated) {
		next({ name: 'Login' });
	} else {
		next();
	}
});

export default router;
