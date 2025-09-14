<template>
	<div class="login" @keydown="handleKeyDown" @keyup="handleKeyUp" tabindex="0">
		<div class="login-header">
			<h2 @click="handleTitleClick">🏠 住戶登入</h2>
			<p class="login-subtitle">請輸入通關密語：</p>
		</div>
		<form @submit.prevent="handleLogin">
			<div class="form-group">
				<label for="password">🔑 通關密語：</label>
				<input type="text" id="password" v-model="password" placeholder="請輸入通關密語" required @keydown="handleKeyDown" @keyup="handleKeyUp" />
			</div>
			<button type="submit" class="login-btn">登入</button>
		</form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
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

				// 驗證通關密語
				if (this.password !== '樂菲莊園') {
					alert('通關密語錯誤');
					return;
				}

				console.log('🔐 登入成功');
				this.$store.commit('login');
				console.log('✅ Vuex 登入狀態已更新');

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

				this.$store.commit('login');

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
		},
	};
</script>

<style scoped>
	.login {
		max-width: 450px;
		margin: 20px auto;
		padding: 25px;
		border: 1px solid #ddd;
		border-radius: 15px;
		background: #ffffff;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
	}

	.form-group {
		margin-bottom: 15px;
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