<template>
	<div class="background-image" :style="backgroundStyle">
		<!-- 你可以在这个 div 内部放置其他内容 -->
	</div>
</template>

<script>
	export default {
		data() {
			return {
				backgroundImage: '', // 存儲背景圖片的 URL
				backgroundStyle: {}, // 用于存储背景样式
			};
		},
		mounted() {
			this.updateBackgroundImage();
		},
		methods: {
			updateBackgroundImage() {
				//const hour = new Date().getHours();
				//if (hour >= 4 && hour <= 19) {
				const second = new Date().getSeconds();
				if (second % 2 == 0) {
					// 從早上4點到晚上7點顯示白天的圖片
					this.backgroundImage = '/images/day.jpg'; // 白天的照片路徑
				} else {
					this.backgroundImage = '/images/night.jpg'; // 晚上的照片路徑
				}
				this.backgroundStyle = {
					'background-image': `url(${this.backgroundImage})`,
					'background-size': 'cover',
					'background-position': 'center',
					opacity: '0.3', // 如果需要透明度可以直接这样设置
				};
			},
		},
	};
</script>

<style scoped>
	.background-image {
		height: 90vh;
		width: 100%;
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
