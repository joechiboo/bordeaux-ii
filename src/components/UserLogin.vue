<template>
	<div class="login" @keydown="handleKeyDown" @keyup="handleKeyUp" tabindex="0">
		<div class="login-header">
			<h2 @click="handleTitleClick">🏠 住戶身份驗證</h2>
			<p class="login-subtitle">請輸入您的基本資料進行身份驗證：</p>
		</div>
		<form @submit.prevent="handleLogin">
			<div class="form-group">
				<label for="password">🔑 通關密語：</label>
				<input type="text" id="password" v-model="password" placeholder="請輸入通關密語" required @keydown="handleKeyDown" @keyup="handleKeyUp" />
			</div>
			<div class="verification-section">
				<div class="verification-title">電子投票驗證用</div>
				<div class="form-group">
					<label for="name">👤 姓名：</label>
					<input type="text" id="name" v-model="name" placeholder="請輸入您的姓名" />
				</div>
				<div class="form-group">
					<label for="unit">🏢 房號：</label>
					<input type="text" id="unit" v-model="unit" placeholder="例如：A棟12樓3號" />
				</div>
				<div class="form-group">
					<label for="phone">📱 聯絡電話後四碼：</label>
					<input type="text" id="phone" v-model="phone" placeholder="例如：1234" maxlength="4" pattern="[0-9]{4}" />
				</div>
			</div>
			<button type="submit" class="login-btn">身份驗證並登入</button>
		</form>
	</div>
</template>

<script>
	import { supabase } from '../utils/supabase';

	export default {
		data() {
			return {
				name: '',
				unit: '',
				phone: '',
				password: '',
				ctrlPressed: false,
				shiftPressed: false,
			};
		},
		mounted() {
			// 確保div可以接收鍵盤事件
			this.$el.focus();
		},
		methods: {
			async handleLogin() {
				// 驗證通關密語
				if (!this.password.trim()) {
					alert('請輸入通關密語');
					return;
				}

				// 如果填寫了電話，驗證格式
				if (this.phone.trim() && !/^\d{4}$/.test(this.phone)) {
					alert('聯絡電話後四碼請輸入4位數字');
					return;
				}

				// 驗證通關密語
				if (this.password !== '樂菲莊園') {
					alert('通關密語錯誤');
					return;
				}

				console.log('🔐 身份驗證成功，開始登入流程');
				const userIdentity = {
					name: this.name.trim(),
					unit: this.unit.trim(),
					phone: this.phone.trim(),
				};

				this.$store.commit('login', userIdentity);
				console.log('✅ Vuex 登入狀態已更新', userIdentity);
				
				// 如果提供了完整住戶資料，寫入住戶表格
				if (userIdentity.name && userIdentity.unit && userIdentity.phone) {
					await this.saveResidentData(userIdentity);
				}

				// 檢查是否有返回頁面參數
				const returnTo = this.$route.query.returnTo;
				const fromVoting = this.$route.query.from === 'voting';

				console.log('📍 當前路由資訊:');
				console.log('  - 完整路徑:', this.$route.fullPath);
				console.log('  - query 參數:', this.$route.query);
				console.log('  - returnTo:', returnTo);
				console.log('  - fromVoting:', fromVoting);

				// 優先處理 returnTo 參數
				if (returnTo && returnTo !== '/login') {
					console.log('🎯 有 returnTo 參數，返回到:', returnTo);
					this.$router.replace(returnTo);
				} else if (fromVoting) {
					console.log('🗳️ 從投票頁面來的，返回投票列表');
					this.$router.replace('/voting');
				} else {
					console.log('📄 預設跳轉到會議記錄');
					this.$router.replace({ name: 'MeetingMinutes' });
				}
			},
			handleKeyDown(event) {
				if (event.key === 'Control') {
					this.ctrlPressed = true;
				}
				if (event.key === 'Shift') {
					this.shiftPressed = true;
				}
			},
			handleKeyUp(event) {
				if (event.key === 'Control') {
					this.ctrlPressed = false;
				}
				if (event.key === 'Shift') {
					this.shiftPressed = false;
				}
			},
			handleTitleClick() {
				// 檢查是否同時按住 Ctrl + Shift
				if (this.ctrlPressed && this.shiftPressed) {
					this.bypassLogin();
				}
			},
			bypassLogin() {
				console.log('🚀 快速登入模式');

				const defaultIdentity = {
					name: '測試用戶',
					unit: 'A棟1樓1號',
					phone: '0000',
				};

				this.$store.commit('login', defaultIdentity);

				// 檢查是否有返回頁面參數
				const returnTo = this.$route.query.returnTo;
				const fromVoting = this.$route.query.from === 'voting';

				console.log('📍 快速登入 - 當前路由資訊:');
				console.log('  - 完整路徑:', this.$route.fullPath);
				console.log('  - returnTo:', returnTo);
				console.log('  - fromVoting:', fromVoting);

				// 優先處理 returnTo 參數
				if (returnTo && returnTo !== '/login') {
					console.log('🎯 快速登入 - 返回到:', returnTo);
					this.$router.push(returnTo);
				} else if (fromVoting) {
					console.log('🗳️ 快速登入 - 返回投票列表');
					this.$router.push('/voting');
				} else {
					console.log('📄 快速登入 - 跳轉到會議記錄');
					this.$router.push({ name: 'MeetingMinutes' });
				}
			},
			async saveResidentData(userIdentity) {
				try {
					console.log('💾 開始儲存住戶資料:', userIdentity);
					
					// 從store獲取生成的用戶ID
					const userId = this.$store.state.user?.id;
					if (!userId) {
						console.error('無法獲取用戶ID');
						return;
					}

					// 解析樓層和棟別資訊
					const floorNumber = userIdentity.unit.match(/(\d+)樓/)?.[1] || '1';
					const unitNumber = userIdentity.unit.match(/([A-Z])棟/)?.[1] || 'A';

					const residentData = {
						user_id: userId,
						name: userIdentity.name,
						unit: userIdentity.unit,
						phone: userIdentity.phone,
						floor_number: floorNumber,
						unit_number: unitNumber,
						active: 1, // 預設為啟用
						updated_at: new Date().toISOString()
					};

					// 使用 upsert 來確保資料是最新的
					const { data, error } = await supabase
						.from('residents')
						.upsert(residentData, { 
							onConflict: 'user_id',
							returning: 'minimal'
						});

					if (error) {
						console.error('住戶資料寫入失敗:', error);
						// 不阻斷登入流程，只記錄錯誤
					} else {
						console.log('✅ 住戶資料已更新');
					}
				} catch (error) {
					console.error('住戶資料處理錯誤:', error);
				}
			},
		},
	};
</script>

<style scoped>
	.login {
		max-width: 450px;
		margin: 80px auto;
		padding: 40px;
		border: 1px solid #ddd;
		border-radius: 15px;
		background: #ffffff;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
	}

	.form-group {
		margin-bottom: 20px;
	}

	.verification-section {
		border: 2px solid #e8f4f8;
		border-radius: 10px;
		padding: 20px;
		margin-bottom: 25px;
		background-color: #f8fcff;
	}

	.verification-title {
		font-size: 14px;
		font-weight: 600;
		color: #007bff;
		margin-bottom: 15px;
		text-align: center;
		border-bottom: 1px solid #e1e5e9;
		padding-bottom: 8px;
	}

	.verification-section .form-group {
		margin-bottom: 15px;
	}

	.verification-section .form-group:last-child {
		margin-bottom: 0;
	}

	label {
		display: block;
		margin-bottom: 8px;
		text-align: left;
		font-weight: 500;
		color: #333;
	}

	input {
		width: 100%;
		padding: 12px 15px;
		margin-bottom: 15px;
		border: 2px solid #e1e5e9;
		border-radius: 8px;
		font-size: 16px;
		transition: border-color 0.3s ease;
	}

	input:focus {
		outline: none;
		border-color: #007bff;
		box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
	}

	.login-btn {
		width: 100%;
		padding: 15px 20px;
		background: #007bff;
		border: none;
		border-radius: 8px;
		color: white;
		font-size: 18px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: 0 2px 4px rgba(0, 123, 255, 0.3);
	}

	.login-btn:hover {
		background: #0056b3;
		transform: translateY(-2px);
		box-shadow: 0 4px 8px rgba(0, 123, 255, 0.4);
	}

	.login-btn:active {
		transform: translateY(0);
		box-shadow: 0 2px 4px rgba(0, 123, 255, 0.3);
	}

	h2 {
		cursor: pointer;
		user-select: none;
	}

	h2:hover {
		color: #0056b3;
	}
</style>
