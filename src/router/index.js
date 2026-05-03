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
		name: 'RulesAndLaws',
		component: () => import('../components/RulesAndLaws.vue'), // 社區規章與法規
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
	{
		path: '/voting',
		name: 'VotingList',
		component: () => import('../components/VotingList.vue'), // 投票列表
		meta: { 
			title: '電子投票',
			requiresAuth: true,
			disabled: true // 暫時禁用
		},
	},
	{
		path: '/voting/:id',
		name: 'VotingDetail',
		component: () => import('../components/VotingDetail.vue'), // 投票詳情
		meta: { 
			title: '投票詳情',
			requiresAuth: true,
			disabled: true // 暫時禁用
		},
	},
];

const router = createRouter({
	history: createWebHistory(process.env.NODE_ENV === 'production' ? '/bordeaux-ii/' : '/'),
	routes,
});

router.beforeEach((to, from, next) => {
	console.log('🛡️ 路由守衛檢查:');
	console.log('  - 前往:', to.fullPath);
	console.log('  - 來自:', from.fullPath);
	console.log('  - 需要認證:', to.meta.requiresAuth);
	console.log('  - 已登入:', store.state.isAuthenticated);
	
	if (to.meta.title) {
		document.title = '波爾多樂菲莊園 - 模範社區' + ' | ' + to.meta.title;
	}
	
	// 檢查路由是否被禁用
	if (to.meta.disabled) {
		alert('電子投票功能尚未開放，敬請期待！');
		next({ name: 'Home' }); // 重定向到首頁
		return;
	}
	
	if (to.meta.requiresAuth && !store.state.isAuthenticated) {
		console.log('🚫 需要登入，重定向到登入頁面');
		const redirectParams = { 
			name: 'Login',
			query: { 
				returnTo: to.fullPath,
				from: from.name === 'VotingList' || from.name === 'VotingDetail' ? 'voting' : undefined
			}
		};
		console.log('  - 重定向參數:', redirectParams);
		next(redirectParams);
	} else {
		console.log('✅ 路由守衛通過');
		next();
	}
});

export default router;
