<template>
	<div class="login">
		<h2 @dblclick="handleClickBypass">登入</h2>
		<form @submit.prevent="handleLogin">
			<div>
				<label for="password">密碼：</label>
				<input type="text" v-model="password" required />
			</div>
			<button type="submit">登入</button>
		</form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				password: '',
				clickCount: 0,
				clickTimer: null,
			};
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
			handleClickBypass() {
				this.clickCount++;

				if (this.clickCount === 3) {
					this.bypassLogin();
					clearTimeout(this.clickTimer);
					this.clickCount = 0;
				} else {
					// reset 點擊次數的 timer（1 秒內要完成三點）
					clearTimeout(this.clickTimer);
					this.clickTimer = setTimeout(() => {
						this.clickCount = 0;
					}, 1000);
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

	button {
		width: 100%;
		padding: 10px;
		background: #007bff;
		border: none;
		border-radius: 3px;
		color: white;
		font-size: 16px;
		cursor: pointer;
	}

	button:hover {
		background: #0056b3;
	}
</style>
