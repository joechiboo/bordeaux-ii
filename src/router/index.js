import { createRouter, createWebHistory } from 'vue-router';

const routes = [
	{
		path: '/welcome',
		name: 'Home',
		component: () => import('../components/HomePage.vue'), // 首頁組件
		meta: { title: '首頁' },
	},
	{
		path: '/rules',
		name: 'CommunityRules',
		component: () => import('../components/CommunityRules.vue'), // 社區規章組件
		meta: { title: '社區規章' },
	},
	{
		path: '/committee',
		name: 'CommitteeMembers',
		component: () => import('../components/CommitteeMembers.vue'), // 管委會成員名單組件
		meta: { title: '委員名單' },
	},
	{
		path: '/minutes',
		name: 'MeetingMinutes',
		component: () => import('../components/MeetingMinutes.vue'), // 會議記錄組件
		meta: { title: '會議記錄' },
	},
	{
		path: '/facilities',
		name: 'Facilities',
		component: () => import('../components/CommunityFacilities.vue'), // 公共設施使用（琴房使用）組件
		meta: { title: '公共設施' },
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach((to, from, next) => {
	if (to.meta.title) {
		document.title = '波爾多二期 - 模範社區' + ' | ' + to.meta.title;
	}
	next();
});

export default router;
