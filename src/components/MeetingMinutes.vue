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
					<div v-if="record.reports && record.reports.length">
						<strong>工作報告：</strong>
						<ul>
							<li v-for="(issue, issueIndex) in record.reports" :key="`issue-${issueIndex}`">{{ issue }}</li>
						</ul>
					</div>
					<div v-if="record.issues && record.issues.length">
						<strong>討論議題：</strong>
						<ul>
							<li v-for="(issue, issueIndex) in record.issues" :key="`issue-${issueIndex}`">{{ issue }}</li>
						</ul>
					</div>
					<div v-if="record.nextMeeting">
						<strong>下次會議日期：</strong>{{ record.nextMeeting.date }}<br />
						<strong v-if="record.nextMeeting.specialNote">特別說明：</strong>{{ record.nextMeeting.specialNote }}
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
						title: '管委會6月份第2次例會開會通知',
						datetime: '2024/6/15 09:00',
						location: '家教室',
						convener: '樂菲莊園管理委員會',
						issues: ['1. 工作報告', '2. 議題討論 (1)廠商工作說明與討論 (2) 規約及管理辦法增修案討論', '3. 臨時動議'],
					},
					{
						title: '第一屆管理委員會六月份第2次臨時會會議記錄',
						location: '家教室',
						datetime: '2024/6/8 09:00-11:00',
						convener: '樂菲莊園管理委員會',
						reports: ['※待整理歸納後再發佈'],
						issues: [
							'1. 每戶磁扣的最高總數量為五張，超過基本張數，酌收工本費：決議通過',
							'2. 石若薇設備委員所提的公設使用注意事項是否通過：決議通過',
							'3. 原來的垃圾廠商一個子車為1000，目前承恩實業公司一子車為750元，更改為較經濟的承恩實業公司，是否通過：決議通過',
						],
						nextMeeting: {
							date: '2024/6/15 09:00',
						},
					},
					{
						title: '管委會6月份第一次例會開會通知',
						datetime: '2024/6/08 09:00',
						location: '家教室',
						convener: '樂菲莊園管理委員會',
						issues: ['1. 工作報告', '2. 議題討論 (1)廠商工作說明與討論', '3. 臨時動議'],
					},
					{
						title: '第一屆管理委員會六月份第1次臨時會會議記錄',
						location: '家教室',
						datetime: '2024/6/1 09:00-14:45',
						convener: '樂菲莊園管理委員會',
						reports: [
							'1. 管理委員會申請核備函送件已於5/27送達，但5/30接獲通知須取回補件',
							'2. 電梯內公佈欄移至信箱區旁牆面，已於5/31完成。討論後決定在電梯內保留兩個資料夾做緊急公告用',
							'3. 門禁廠商與監控廠商初步教育訓練，發現(1).大樓門禁啟用須關閉門外紅外線功能 (2)門禁權限調整，廠商建議由管委會討論需要調整的群組態提供給廠商後續處理 (3)住戶(B1-04F)提出門禁管制問題，希望一樓大門與全部電梯開啟門禁管制，非僅啟用一樓大門門禁',
						],
						issues: [
							'1. 廠商工作說明與現況',
							'　1_1. 現行清潔廠商報告：針對管委會希望清潔團隊協助將垃圾車送到一樓戶外以便社區可以利用區公所的垃圾車進行垃圾清運(垃圾必須以市府垃圾袋包裹)的想法，提議固定將垃圾子車4台移到一樓車道出口旁(但已隔柵遮蔽上鎖控管)。另外針對社區未來清潔服務人員編制，提議擴充到10人(現行為8人，但扣除休假後實際5-6人到班)。另外反映需要管委會協助解決清潔人員清潔車與工具可以存放收藏的地點清潔人員午休的場所。',
							'　1_2. 現行物業保全廠商報告：現行人力配置解說(4個24小時的保全服務哨點，2位8小時的櫃台生活秘書，1位社區經理，1位主任秘書)，關於後續人力編制可以由管委會討論後再提供相關報價。',
							'　1_3. 現行垃圾清運廠商報告：目前是以一子車1000元計價，若社區需要可改以每公斤8元計價，但需要先確保垃圾子車內不可以有裝潢廢棄物，以及確認改用每公斤8元的每月計價的總重。委員們請廠商估算一份以每公斤8元計價的合約報價，提供管委會討論後續合作可能。',
							'2. 授權管委會相關印鑑章刻印以及4位主、副、財、監委員級職章刻印：決議通過',
							'3. 原決議召開臨時區權會會議時間，因為保全物業公司人員已支援其他案場活動，無法在上午到場支援，更改至6/29下午：決議通過',
							'4. 6/1下午，是否無償提供場地給兩家房屋仲介(永慶、信義)辦理端午節製作香包活動？：決議通過',
							'5. 公共意外保險為加速作業完成時效，希望若是公共意外保險費用在三萬元以下，授權主、副、財、監委員決議：決議通過',
							'6. 公共意外保險已經完成投保的情況下，開放一樓室內設施(閱讀室、家教室、親子遊戲間、有氧飛輪室、慢活瑜珈室、健身房、琴房三間、媽媽廚藝教室)給社區住戶使用體驗。試用期間6/6 15:00~6/10 22:00：決議通過',
							'臨時動議1. 針對社區日租房、冷氣外推二次施工、園藝景觀燈以及裝潢管理辦法的問題，請管委會提相關管理辦法送交區權會通過：決議通過',
							'臨時動議2. 門禁開通權限應該包括ABCD與EFGH棟一樓前後大門以及各棟電梯1F到地下5樓的權限',
							'臨時動議3. A4公佈欄欄位空間收取租金案，表決內容：經討論，已一格欄位為單位，租期為一星期者，租金為100元，租期為一個月者，租金為150元，先行試辦3個月，再依據出租情況做調整。',
						],
						nextMeeting: {
							date: '2024/6/8 09:00',
						},
					},
					{
						title: '第一屆管理委員會五月份第2次臨時會會議記錄',
						location: '家教室',
						datetime: '2024/5/25 09:00-11:45',
						convener: '樂菲莊園管理委員會',
						issues: [
							'1. 授權管委會招募志工：決議通過',
							'2. 一樓室內公共設施，完成公共意外險投保後，開啟一週供住戶使用體驗？：決議通過',
							'3. AB棟3樓「管委會空間」作為管委會使用的「檔案室」?：決議通過',
							'4. 各棟信箱區部份牆面作為各棟之公佈欄?：決議通過',
							'5. 臨時區權會召開時間，暫定6/29週六上午9時，若無法成會，重開議時間暫定7/13週六上午9時：決議通過',
						],
						nextMeeting: {
							date: '2024/6/1 09:00',
						},
					},
					{
						title: '第一屆管理委員會五月份例會會議記錄',
						location: '家教室',
						datetime: '2024/5/18 09:00-11:45',
						convener: '樂菲莊園管理委員會',
						issues: [
							'1. 聘顧法律顧問人事案：決議通過聘僱法律顧問',
							'2. 聘僱會計師顧問人事案：決議通過聘僱會計師顧問',
							'3. 權責委員選任：總務委員 丁夏蘭, 設施委員 石若薇, 機電委員 陳樹棟, 安全委員 王源新, 園藝委員 章湘湘, 調解委員 宋廣翊, 環保委員 范中興, 聯誼委員 周彥妘, 資管委員 詹鈞傑',
							'臨時動議1. 環保回收室開放時間：決議通過每週一到週四晚上6時至隔日早上8時, 每週五晚上6時至周一早上8時',
						],
						nextMeeting: {
							date: '2024/5/25 09:00',
						},
					},
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
