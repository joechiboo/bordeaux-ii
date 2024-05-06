import { createStore } from 'vuex';

// 創建一個新的store實例
const store = createStore({
	state() {
		return {
			// 定義你的狀態
		};
	},
	mutations: {
		// 定義更改狀態的方法
	},
	actions: {
		// 定義執行異步操作的方法
	},
	modules: {
		// 如果需要，可以添加更多模塊
	},
});

export default store;
