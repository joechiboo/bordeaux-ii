import { createStore } from 'vuex';

// 創建一個新的store實例
const store = createStore({
	state() {
		return {
			isAuthenticated: false, // 定義初始的登入狀態
			user: null, // 用戶資訊
		};
	},
	mutations: {
		// 定義更改狀態的方法
		login(state) {
			state.isAuthenticated = true;
			// 設定模擬用戶資料，使用固定的測試 UUID
			state.user = {
				id: '550e8400-e29b-41d4-a716-446655440000', // 標準 UUID 格式
				name: '社區住戶',
				floor_number: '5',
				unit_number: 'A'
			};
			
			console.log('用戶登入，UUID:', state.user.id);
		},
		logout(state) {
			state.isAuthenticated = false;
			state.user = null;
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
