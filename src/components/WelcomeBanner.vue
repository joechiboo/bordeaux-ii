<template>
	<div class="container">
		<div class="content">
			<h1>歡迎來到</h1>
			<h2>「波爾多-樂菲莊園」社區網站</h2>
			<p class="intro">
				我們位於風景優美的新北市，致力於為居民提供一個安全、環保且充滿活力的居住環境。作為一個自豪的模範社區候選者，我們不斷努力提升居住品質，推動綠色生活，並積極參與社區建設。
			</p>
			<p class="description">
				探索我們的網站，了解更多關於「波爾多-樂菲莊園」社區的資訊，以及我們如何致力於創造一個模範社區的願景。我們期待您的加入，一起打造美好的家園。
			</p>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'WelcomeBanner',
	};
</script>

<style scoped>
	.content {
		text-align: left;
		margin-top: 50px; /* 调整顶部间距 */
		opacity: 1 !important;
		position: relative;
		z-index: 1;
	}

	h1 {
		font-size: 48px;
		font-weight: bold;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* 文字陰影 */
	}

	h2 {
		font-size: 30px;
		font-weight: bold;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* 文字陰影 */
		margin-bottom: 20px;
	}

	.intro {
		font-size: 24px;
		font-weight: 500;
		margin-bottom: 20px;
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5); /* 文字陰影 */
	}

	.description {
		font-size: 20px;
		line-height: 1.5;
		color: #111111; /* 調整顏色以提高可讀性 */
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5); /* 文字陰影 */
	}
</style>
