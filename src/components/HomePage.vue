<template>
	<AppNavbar />
	<!-- 动态内容区域 -->
	<div class="content-wrapper">
		<router-view></router-view>
	</div>
	<div class="background-image" :style="backgroundStyle"></div>
</template>

<script>
	import AppNavbar from './AppNavbar.vue';
	export default {
		data() {
			return {
				backgroundImage: '', // 存儲背景圖片的 URL
				backgroundStyle: {}, // 用于存储背景样式
			};
		},
		components: {
			AppNavbar,
		},
		mounted() {
			this.updateBackgroundImage();
		},
		methods: {
			updateBackgroundImage() {
				//const hour = new Date().getHours();
				//if (hour >= 4 && hour <= 19) {
				const second = new Date().getSeconds();
				const basePath = process.env.NODE_ENV === 'production' ? '/bordeaux-ii' : '';
				this.backgroundImage = second % 2 == 0 ? `${basePath}/images/day.jpg` : `${basePath}/images/night.jpg`;
				this.backgroundStyle = {
					'background-image': `url(${this.backgroundImage})`,
					'background-size': 'cover',
					'background-position': 'center',
				};
			},
		},
	};
</script>

<style scoped>
	.background-image {
		height: 100vh;
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		opacity: 0.1;
		z-index: -1;
	}

	.content-wrapper {
		position: relative;
		min-height: calc(100vh - 60px);
		padding: 0;
		z-index: 1;
		box-sizing: border-box;
		overflow-x: hidden;
	}

	.navbar {
		z-index: 2;
	}

	.container {
		display: flex;
		flex-direction: column; /* 在小屏幕上堆叠元素 */
	}

	@media (min-width: 769px) {
		.container {
			flex-direction: row; /* 在较大屏幕上水平排列元素 */
		}
	}
</style>
