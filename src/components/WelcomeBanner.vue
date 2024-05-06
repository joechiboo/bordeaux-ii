<template>
	<div class="welcome-banner">
		<h1>歡迎來到我們的社區</h1>
		<p>這裡是一個關於社區的簡短介紹，歡迎你的加入。</p>
	</div>
</template>

<script>
	export default {
		name: 'WelcomeBanner',
	};
</script>

<style scoped>
	.welcome-banner {
		text-align: center;
		margin-top: 50px; /* 调整顶部间距 */
	}

	.welcome-banner h1 {
		font-size: 2.5rem;
	}

	.welcome-banner p {
		font-size: 1.5rem;
	}
</style>
