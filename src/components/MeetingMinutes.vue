<template>
	<div id="accordion">
		<div class="card" v-for="(record, index) in records" :key="index">
			<div class="card-header" :id="'heading' + index">
				<h5 class="mb-0">
					<button
						class="btn-lg"
						data-toggle="collapse"
						:data-target="'#collapse' + index"
						:aria-expanded="index === 0 ? 'true' : 'false'"
						:aria-controls="'collapse' + index"
					>
						{{ record.title }}
					</button>
				</h5>
			</div>

			<div :id="'collapse' + index" class="collapse" :class="{ show: index === 0 }" aria-labelledby="headingOne" data-parent="#accordion">
				<div class="card-body">
					<strong>時間：</strong>{{ record.datetime }}<br />
					<strong>地點：</strong>{{ record.location }}<br />
					<strong>討論內容：</strong><br />{{ record.content }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				records: [
					{
						title: '第一屆第一次管委會會議',
						location: '新店區民族路耕莘護專',
						datetime: '2024年5月4日，星期六，11:30 - 13:35',
						content: '委員商討公設點交，財報交接事宜。討論下次會議議題包括地下室停車場修繕、垃圾區髒亂異味果蠅等。',
					},
					// 更多會議記錄...
				],
			};
		},
	};
</script>

<style>
	.card-header {
		background-color: gray;
	}
	.btn-lg {
		font-size: 20px;
		font-weight: 700;
	}
	#accordion {
		margin-top: 40px;
		text-align: left;
	}
</style>
