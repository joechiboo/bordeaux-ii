import { createStore } from 'vuex';

// 創建一個新的store實例
const store = createStore({
	state() {
		return {
			isAuthenticated: false, // 定義初始的登入狀態
		};
	},
	mutations: {
		// 定義更改狀態的方法
		login(state) {
			state.isAuthenticated = true;
			console.log('🏠 用戶登入成功');
		},
		logout(state) {
			state.isAuthenticated = false;
		},
	},
	actions: {
		// 定義執行異步操作的方法，如果需要
	},
	modules: {
		// 如果需要，可以添加更多模塊
	},
});

export default store;