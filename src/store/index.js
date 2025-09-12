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
		login(state, userIdentity) {
			state.isAuthenticated = true;
			
			// 基於用戶身份產生唯一的 UUID
			const generateUserUUID = (name, unit, phone) => {
				// 將身份資訊組合成字串
				const identity = `${name}-${unit}-${phone}`.toLowerCase();
				
				// 使用簡單的 hash 算法產生一致的 UUID
				let hash = 0;
				for (let i = 0; i < identity.length; i++) {
					hash = ((hash << 5) - hash + identity.charCodeAt(i)) & 0xffffffff;
				}
				
				// 將 hash 轉換為 UUID 格式
				const hashStr = Math.abs(hash).toString(16).padStart(8, '0');
				return `${hashStr.slice(0,8)}-${hashStr.slice(0,4)}-4${hashStr.slice(1,4)}-a${hashStr.slice(2,5)}-${hashStr.slice(0,8)}${Date.now().toString(16).slice(-4)}`;
			};
			
			// 設定用戶資料
			if (userIdentity && userIdentity.name && userIdentity.unit && userIdentity.phone) {
				// 完整的用戶資料，可用於投票
				state.user = {
					id: generateUserUUID(userIdentity.name, userIdentity.unit, userIdentity.phone),
					name: userIdentity.name,
					unit: userIdentity.unit,
					phone: userIdentity.phone,
					// 從房號解析樓層資訊（嘗試）
					floor_number: userIdentity.unit.match(/(\d+)樓/)?.[1] || '1',
					unit_number: userIdentity.unit.match(/([A-Z])棟/)?.[1] || 'A'
				};
			} else {
				// 部分資料或無資料，生成基本用戶
				state.user = {
					id: 'guest-' + Date.now(),
					name: userIdentity?.name || '',
					unit: userIdentity?.unit || '',
					phone: userIdentity?.phone || '',
					floor_number: userIdentity?.unit?.match(/(\d+)樓/)?.[1] || '1',
					unit_number: userIdentity?.unit?.match(/([A-Z])棟/)?.[1] || 'A',
					incomplete: true // 標記為不完整資料
				};
			}
			
			console.log('🏠 用戶登入成功:');
			console.log('  - 姓名:', state.user.name);
			console.log('  - 房號:', state.user.unit);  
			console.log('  - UUID:', state.user.id);
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
