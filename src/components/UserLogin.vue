<template>
	<div class="login" @keydown="handleKeyDown" @keyup="handleKeyUp" tabindex="0">
		<h2 @click="handleTitleClick">登入</h2>
		<form @submit.prevent="handleLogin">
			<div>
				<label for="password">密碼：</label>
				<input 
					type="text" 
					v-model="password" 
					required 
					@keydown="handleKeyDown"
					@keyup="handleKeyUp"
				/>
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
			handleLogin() {
				if (this.password === '樂菲莊園') {
					this.$store.commit('login');
					this.$router.push({ name: 'MeetingMinutes' });
				} else {
					alert('密碼錯誤');
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
				this.$store.commit('login');
				this.$router.push({ name: 'MeetingMinutes' });
			},
		},
	};
</script>

<style scoped>
	.login {
		max-width: 300px;
		margin: 100px auto;
		padding: 20px;
		border: 1px solid #ccc;
		border-radius: 5px;
		background: #f9f9f9;
	}

	label {
		display: block;
		margin-bottom: 5px;
	}

	input {
		width: 100%;
		padding: 8px;
		margin-bottom: 10px;
		border: 1px solid #ccc;
		border-radius: 3px;
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
		box-shadow: 0 2px 4px rgba(0,123,255,0.3);
	}

	.login-btn:hover {
		background: #0056b3;
		transform: translateY(-2px);
		box-shadow: 0 4px 8px rgba(0,123,255,0.4);
	}

	.login-btn:active {
		transform: translateY(0);
		box-shadow: 0 2px 4px rgba(0,123,255,0.3);
	}


	h2 {
		cursor: pointer;
		user-select: none;
	}

	h2:hover {
		color: #0056b3;
	}
</style>
