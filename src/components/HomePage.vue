<template>
	<AppNavbar />
	<div class="background-image" :style="backgroundStyle">
		<!-- 动态内容区域 -->
		<router-view></router-view>
	</div>
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
				this.backgroundImage = second % 2 == 0 ? '/images/day.jpg' : '/images/night.jpg';
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
		height: 94vh; /* 视窗的100%高度 */
		width: 100vw; /* 视窗的100%宽度 */
		position: relative;
		overflow: hidden; /* 确保伪元素不会溢出容器 */
	}

	.background-image::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-image: inherit; /* 确保可以继承背景图 */
		background-size: cover;
		background-position: center;
		opacity: 0.3; /* 设置透明度 */
		z-index: -1; /* 确保伪元素在内容之下 */
	}

	/* 确保主内容在伪元素之上 */
	.background-image > * {
		position: relative;
		z-index: 1;
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
