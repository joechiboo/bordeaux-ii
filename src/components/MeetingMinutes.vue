<template>
	<div id="accordion">
		<div class="card" v-for="(record, index) in records" :key="index">
			<div class="card-header" :id="'heading' + index">
				<h5 class="mb-0">
					<button
						class="btn-lg"
						data-bs-toggle="collapse"
						:data-bs-target="'#collapse' + index"
						:aria-expanded="index === 0 ? 'true' : 'false'"
						:aria-controls="'collapse' + index"
					>
						{{ record.title }}
					</button>
				</h5>
			</div>

			<div :id="'collapse' + index" class="collapse" :class="{ show: index === 0 }" aria-labelledby="headingOne" data-bs-parent="#accordion">
				<div class="card-body">
					<strong>日期與時間：</strong>{{ record.datetime }}<br />
					<strong>地點：</strong>{{ record.location }}<br />
					<strong>召集人：</strong>{{ record.convener }}<br />
					<div v-if="record.content">
						<strong>會議內容摘要：</strong><br />
						{{ record.content }}
					</div>
					<div v-if="record.nextMeeting">
						<strong>下次會議日期：</strong>{{ record.nextMeeting.date }}<br />
						<strong>特別說明：</strong>{{ record.nextMeeting.specialNote }}
					</div>
					<div v-if="record.issues && record.issues.length">
						<strong>討論議題：</strong>
						<ul>
							<li v-for="(issue, issueIndex) in record.issues" :key="`issue-${issueIndex}`">{{ issue }}</li>
						</ul>
					</div>
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
						title: '第一屆管理委員會第一次例會開會通知',
						location: 'EF棟一樓大廳閱覽室',
						datetime: '2024/5/18 09:00-11:00',
						convener: '樂菲莊園管理委員會',
						issues: ['1. 法律顧問聘請', '2. 會計師聘請', '3. 功能委員選任'],
					},
					{
						title: '第一屆第一次管委會會議',
						location: '新店區民族路耕莘護專',
						datetime: '2024/5/4 11:30-13:35',
						convener: '黃O欽',
						content: '委員們商討了公設點交及財報交接事宜。',
						nextMeeting: {
							date: '2024/5/18 10:00-12:00',
							specialNote: '下次會議將提供Google Meet遠端連線選項，以配合無法現場參加的委員。',
						},
						issues: [
							'地下室停車場修繕',
							'垃圾區髒亂異味果蠅問題',
							'泳池漏水',
							'大廳漏水',
							'陽台統一規格加窗防風防颱',
							'物業管理服務人員品質提升',
							'每戶大門隔音問題',
							'一樓大廳門面規範',
							'機車位重規劃',
							'地下停車場燈光使用省電LED燈泡（政府補助方案）',
							'公共電費過高需監控',
						],
					},
					// 可以增加更多會議記錄
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
