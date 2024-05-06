import { createRouter, createWebHistory } from 'vue-router';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: () => import('../components/Home.vue'), // 首頁組件
	},
	{
		path: '/rules',
		name: 'CommunityRules',
		component: () => import('../components/CommunityRules.vue'), // 社區規章組件
	},
	{
		path: '/committee',
		name: 'CommitteeMembers',
		component: () => import('../components/CommitteeMembers.vue'), // 管委會成員名單組件
	},
	{
		path: '/minutes',
		name: 'MeetingMinutes',
		component: () => import('../components/MeetingMinutes.vue'), // 會議記錄組件
	},
	{
		path: '/facilities',
		name: 'Facilities',
		component: () => import('../components/Facilities.vue'), // 公共設施使用（琴房使用）組件
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
