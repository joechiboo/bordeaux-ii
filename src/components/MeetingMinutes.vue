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
					<div v-if="record.target"><strong>受文者：</strong>{{ record.target }}<br /></div>
					<div v-if="record.main"><strong>主旨：</strong>{{ record.main }}<br /></div>
					<div v-if="record.location"><strong>地點：</strong>{{ record.location }}<br /></div>
					<div v-if="record.convener"><strong>召集人：</strong>{{ record.convener }}<br /></div>
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
						<div v-if="record.target"><strong>說明：</strong></div>
						<div v-else><strong>討論議題：</strong></div>
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
						title: '第二屆管理委員會六月份第二次例行會議紀錄',
						location: '家教室',
						datetime: '2025/06/18 19:30-23:30',
						convener: '主任委員 張紀榮',
						reports: [
							'出席委員 9 人，已過半達開會門檻，主席宣布開會。',
							'AB棟9樓減壓閥裝置發函建商修復原部分，經建商工務主任確認不影響公共安全，將加裝飾板及維修孔蓋以便後續維護。',
							'消防器材（泡沫原液桶、發電機紫油）報價單彙整，已提供給環保安全群組。',
							'垃圾清運決議：維持現有廠商（廚餘回收、資源回收等），7 位同意，通過。',
							'電梯保護壓克力材質報價評估，決議：(1) 同意製作保護板 7 票通過 (2) 材質選擇壓克力保護板。',
							'永大電梯三期維護保養繳款通知，合併成統一的維護到期日期(114/3/28)',
							'住戶反映：若對管委會決議有異議，是否記名？法顧回覆：依社區規約記名決議不適用，一律書面記錄即可。',
							'預支款事項： (1) 若廠商需先付款購買零件，可與建商協調後開立發票再行請款；(2) 若油運需急件可預支上限 2 萬元，決議通過。',
							'健身房門禁與 3F 電梯安裝需地板石材裁切，否則門禁刷卡機與電梯無法正常使用，將請建商處理。',
							'社區管理費繳費平台使用公告內容確認，細節與帳號開設狀況仍由管理中心確認。',
							'公告與繳費單據是否已包含社區臨櫃款、轉帳資訊，待確認。',
							'社區門禁與加強與電梯節能強化功能內容確認',
							'發文給新北市政府工務局使用管理科，關於頂樓KTV建置的內容確認',
						],
						issues: [
							'議題一：麗池物業保全草約內容說明。鹿池業副處長親自說明草約內容，決議：草約內容接受，11 人同意，無反對意見。',
							'議題二：財務管理辦法說明，財務委員請假，建議下次會議再行討論，並建議先進行章程調整與條文化討論。',
							'議題三：大公電如何分攤？依每戶數均分或坪數？決議：送區權會審議。',
							'議題四：停車場管理辦法討論，由管理委員帶回研議，下次管委會再行討論。',
							'議題五：公設管理辦法討論，由管理委員帶回研議，下次管委會再行討論。',
							'議題六：設定樂菲官方LINE回應住戶問題，提供對住戶一對一的聯繫',
							'臨時動議1：B1~B5 排風系統頻率與時間需調整，交由管理單位了解排程。',
							'臨時動議2：住戶提議設立菸害防制管理辦法，決議：納入管理辦法並送區權會審議。',
						],
						nextMeeting: {
							date: null,
						},
					},
					{
						title: '第二屆管理委員會六月份第一次臨時會會議紀錄',
						location: '家教室',
						datetime: '2025/06/11 19:30-21:15',
						convener: '張紀榮',
						reports: [
							'出席委員共 13 人，法定人數達成，主席宣布開會。',
							'G5-10F 潘先生提出意見，指出議價程序未公告，主委與財委先行與鹿池議價並簽回服務委託書，未完成委員決議。',
							'財委游鵬順聲明強調：其意見書為個人職責建議，未對外公開、未造成洩漏，也非針對委員，而是針對程序風險。',
							'主委回應：6/2 決議授權議價，6/3 議價過程尊重到場委員表決，並於當晚 21:30 財務委員進一步討論合約內容，將內容以書面列回報，但非正式簽約，若內容不同可不簽。',
							'法顧說明：政府機關外之招標、議價，未有固定法律程序可適用，亦不構成違法。',
							'部分委員提問是否還需與第二順位廠商齊家議價，產生不同意見。',
						],
						issues: [
							'議題一：是否需找第二順位廠商（齊家）議價？決議：0 人贊成，否決。',
							'議題二：是否確認與第一順位廠商（鹿池）簽約？決議：9 人贊成，通過。',
							'討論過程中，高宏宇委員主張不重複議價，認可鹿池已為優先議價對象。',
							'陳喜宏委員認為：若有兩家合格應列出評估比較，以公平選擇。',
							'游鵬順委員則指出：鹿池與齊家於面審中內容高度重疊，可省略重複程序。',
							'張才俊與宋廣翊也表達類似觀點，主張應採取最有利標決定簽約。',
							'D3-09F 林先生提出是否應補足評選程序？會議中未進一步討論。',
							'經綜合討論，主席修正議案並表決通過。',
						],
						nextMeeting: {
							date: null,
						},
					},
					{
						title: '第二屆管理委員會第三次例行會議紀錄',
						location: '家教室',
						datetime: '2025/06/10 19:30-23:02',
						convener: '張紀榮',
						reports: [
							'到場委員人數 15 人已過半達成會門檻，主席宣布開會。',
							'管理委員會組織章程修正案：以目前版本為成案送區權會前版本，會前仍可再提出修正建議，11位委員同意通過。',
							'社區住戶報修流程調整，報修單經由管理中心安排作業後交區權備查。',
							'社區門禁管理辦法，訪客必須到櫃台登記交換證件方可上樓，除非住戶親自下樓帶訪客',
							'中控冷氣門簾NT$475',
							'資源回收桶垃圾袋已採購，未稅NT$1500，目前尺寸可完全包覆',
							'磁扣新增設定調整，住戶須先行購買後，由管理中心進行權限設定。',
							'試行採購 5 個老鼠籠試用，每個約 NT$100 元，黏鼠板暫不考慮。',
						],
						issues: [
							'議題一：物業廠商決選，採用 25%書審+75%面審，依據委員會評選結果通過麗池為第一順位廠商，齊家為第二順位。',
							'       人員編制需求，採用張才俊委員方案，共計：1位經理、1位副理、2.5哨保全、兩位秘書、6位清潔人員。',
							'議題二：第一屆未經決議訴訟案撤案，12位委員同意通過。',
							'議題三：無障礙電梯壁面及地面保護作法(1)保護毯(2)壓克力',
							'議題四：電梯內電子公佈欄討論，社區經理將洽詢3家電梯廠商報價後再行決定。',
							'議題五：召開第二屆區權會議討論，將依需求訂定召開日。',
							'議題六：屋頂KTV設置探討，將洽詢市工務局法規意見後再行討論。',
							'議題七：機車停車管理，B1機車格整理方案後續再提交。',
							'議題八：垃圾場開放時間延長，暫延長至隔日10:00，11位委員同意通過。',
							'議題九：夜間冷氣22:00後關閉一台，9位委員同意通過。',
							'議題十：確認起始繳交管理費日為2025/7/1，13位委員同意通過。',
							'議題十一：管理費繳費平台採用社區幫APP通知，13位委員同意通過。',
							'議題十二：第二屆年度行事曆已放置社群連結。',
							'臨時動議一：授權主委與第一順位廠商麗池議價，14位委員同意通過。',
							'臨時動議二：AB棟9樓減壓閥裝置，需要發函建商復原',
							'臨時動議三：關於社區公設驗收議題，目前經由網路搜尋及住戶、區權人推薦，已邀請七家第三方專業查驗廠商來場刊，目前規劃本月底前提供報價，已利臨時區權人大會議決',
							'臨時動議四：消防設施油補充、柴油補充與設備報價，將請社區經理整理匯整後與建商協調。',
						],
						nextMeeting: {
							date: null,
						},
					},
					{
						title: '第二屆管理委員會第二次例行會議紀錄',
						location: '家教室',
						datetime: '2025/05/08 19:30-23:30',
						convener: '張紀榮',
						reports: [
							'出席委員 14 人，已過半達成開會門檻。',
							'資源與廚餘回收廠商檢討：目前維持現行模式，垃圾由瓦力、資源與廚餘由混勤處理。',
							'公用電電費已達門檻，建議申請簡易時間電價，並推廣使用台電 APP。',
							'目前 RICOH 影印機租用中，討論是否改為購買或更換。',
							'LED 燈具與 A4影印紙提案已無異議通過。',
							'第三方公設點交已開始報價作業，包含晶鼎、安泰、太古華電等。',
							'EF棟包裹阻塞事件已協調遷移至內部空間。',
							'清潔人員需稽核並與物業同時到期，擬同步評估續約或汰換。',
							'5/27 委員會將與管理員調整清潔編制，擬減少 2 人。',
							'已發函物業調整副理人力，自 6/1 起實施。',
							'3F 鼠患將改用捕鼠籠與黏鼠板進行。',
							'電梯維護費用 NT$21,714 已支付。',
							'核備函已於 5/20 寄送。',
							'5/21 社區地下停車場發生警方追捕事件，無人傷亡。',
						],
						issues: [
							'議題一：永大電梯維護合約簽約案，通過每月 NT$69,000 三年期合約，15 人同意。',
							'議題二：保全物業面審案，11 家投標廠商將擇定 5 家於 5/30 進行面審。',
							'議題三：與建商財務交接與帳務調整。決議：若住戶未繳費需補繳，管理費起收時間以 8 位委員投票通過版本為準。',
							'議題四：提案財報編制方式為現金基礎，13 人同意通過。',
							'議題五：電梯管理與通行調整。決議：大電梯需完成防護後再啟用，僅一樓不鎖定電梯門。',
							'議題六：中元普渡訂於 114/8/30（六）14:00–16:00 舉辦。',
							'議題七：戶外燈具、頂樓、高樓照明時間調整，包含庭園、大門兩側等，均已通過。',
							'議題八：ABCD/EFGH 棟大廳主燈與信箱照明調整，通過林欣蘭委員建議，全日點燈。',
							'臨時動議1：監控鏡頭拆除與重新裝設，部分需補裝並與聯恒配合。',
							'臨時動議2：社區緊急照明設備故障嚴重，建議電機廠進行全面檢修。',
							'臨時動議3：5/30 面審作業排定於上午五個時段，5 家物業將逐一簡報與提問。',
							'臨時動議4：管委會收到台北地檢署函，針對前屆管理委員會決議提起訴訟。決議：(1) 同意由法顧協助出庭，(2) 公告通知住戶說明。',
							'臨時動議5：未來會議統一錄音錄影，若無額外設備，請物業公司協助提供。',
						],
						nextMeeting: {
							date: null,
						},
					},
					{
						title: '第二屆管理委員會第一次例會會議紀錄',
						location: '家教室',
						datetime: '2025/05/08 19:30-22:30',
						convener: '張紀榮',
						reports: [
							'到場委員人數 10 人已過半達成會門檻，主席宣布開會。',
							'主席詢問委員是否同意開放會議直播，經舉手表決，決議不開放直播。12 位委員同意錄音錄影。',
							'4/26 廚餘與資源回收廠商反映社區可否接受他們載運到合作丟棄清運點？同時持續與新店清潔隊登記申請。',
							'社區小公電電費可由社區辦理申請簡易時間電價，並推廣使用台電 APP。',
							'社區影印機租購比較：目前租用 RICOH MP C3504，討論是否購買或改換。',
							'永大電梯回覆目前維護合約已是最優惠價，可以約定時間來現場說明',
							'建議採購：T8 LED 4呎白光燈 50支，單價 NT$95。',
							'建議採購：A4影印紙 20本（每本500頁）。',
						],
						issues: [
							'議題一：社區《管理委員會組織章程》討論案。請物業公司袁經理協助兩周內擬組織章程公版初稿送管委會審核。',
							'議題二：功能委員推選，四大功能組員如：1. 行政資訊：吳智華、呂郭明真, 2. 環保安全：王珮蓁、宋廣翊、張才俊, 3. 機電設備：高宏宇、龔家祥, 4. 文康聯誼：楊雲華、林欣蘭、林俞君, 5. 一般委員：李張民、彭穎思、簡秋燕',
							'議題三：社區法律顧問事務及使用之了解，於10/14到期(每年顧問費2.4萬元)，並說明諮詢方式：由主委以電話口頭及電子信件法律諮詢管委會處理社區事務。',
							'議題四：公設點交討論案。請陳副主委書宏參考第一屆管委會邀約第三方公設點交報價內容後，協助管委會審核第三方驗收廠商計畫書;管委會在大群及公告邀請住戶推薦第三方公設驗收廠商。',
							'議題五：社區垃圾清運廠商討論案。社區經理說明現況，決議請環保安全組與社區經理一起集思廣益，討論是否可以有其他合作方案，本次會議先不定案。',
							'議題六：物業保全規劃討論。1. 住戶違規佔用逃生通道規劃討論：決議管委會授權請物業拍照並開立勸導單。2. 皇家合約7/31到期，邀標公告於社區，請住戶推薦物管及保全公司。',
							'議題七：社區清潔管理紀律檢討：社區清潔目前編制8員，月休9天，平均每天5-6人上工。決議：(1)請環保安全組委員費心稽核清潔公司日常規劃(2)清潔公司合約與社區保全同時到期，請住戶推薦。',
							'臨時動議1：住戶吵鬧屢勸不聽：管委會授權物業管理單位錄影錄音報警或通知相關單位處理。',
							'臨時動議2：EF棟大廳大件包裹占用通道：通道應回歸原設計，無障礙物。請管理中心擬定管理辦法。',
							'臨時動議3：建商針對住戶私有空間報修作業，修繕時間與住戶確認通知不良：管委會請管理中心協助與住戶/工務主任聯繫確認私有空間修繕時間。',
						],
						nextMeeting: {
							date: null,
						},
					},
					{
						title: '第二屆管委會委員推選會議紀錄',
						location: '家教室',
						datetime: '2025/04/30 21:30-22:15',
						convener: '張紀榮',
						reports: [
							'現場出席者為本屆當選委員，出席12人，法定人數已達。由游先生為臨時主席主持會議。',
							'確認全權委任名單，共計15人完成委任。',
							'會議開始後，依序進行主任委員、副主任委員、財務委員與監察委員之推選程序。',
							'提案優先選出4位報備需明列之功能委員，其他功能委員後期再投票，通過。',
							'預定下一次會議日期為114/5/8（週四）19:30，便於進行全數統計。',
						],
						issues: [
							'主任委員選舉：由D5-05F裴鎮華提議，推舉C2-08F張紀榮小姐擔任主任委員，表決同意人數13人，通過。',
							'副主任委員推舉：由F5-04F陳書宏提名，表決同意人數14人，通過。',
							'財務委員推舉：由E6-12F游鵬順推選，表決同意人數14人，通過。',
							'監察委員推舉：由F6-04F林欣蘭推薦D5-05F褚鐘聲擔任，表決同意人數14人，通過。',
							'動議案1：針對功能委員選出方式，表決同意人數13人，通過。',
							'動議案2：下一次會議預定日期為5月8日(四)19:30，表決同意人數13人，通過。',
						],
						nextMeeting: {
							date: '2025/05/08 19:30',
						},
					},
					{
						title: '第二次臨時區分所有權人重開議會議記錄',
						location: '樂菲莊園ABC區中庭',
						datetime: '2025/03/23 13:30 - 15:23',
						convener: '樂菲莊園管理委員會',
						reports: ['1. 應出席人數655人，出席287人，出席比例43.82%。已達成議決所需人數門檻。', '2. 議決權總數8055.37/17740.14，占比45.41%。'],
						issues: [
							'一、第51項議案（關於住戶裝設設備與規約是否牴觸相關爭議）經主席說明，因住戶意見分歧且情緒強烈，決議擱置不討論，並交由下一屆管委會處理。',
							'二、第二屆管理委員選舉結果如下：',
							'A棟：A05-12F 許○書、A03-15F 簡○燕',
							'B棟：B01-04F 郭○銘、B03-09F 黃○欽',
							'C棟：C02-08F 張○榮、C05-05F 鄧○芳',
							'D棟：D05-05F 褚○聲、D03-09F 楊○華',
							'E棟：E06-12F 游○順、E06-09F 楊○峰',
							'F棟：F06-04F 林○君、F05-04F 陳○宏',
							'G棟：G06-04F 李○樵、G02-07F 李○鳳',
							'H棟：H06-05F 張○麗、H05-07F 呂○明真',
							'S棟：S01-01F 彭○恩',
						],
					},
					{
						title: '第一屆管理委員會3月份臨時會會議記錄',
						location: '家教室',
						datetime: '2025/03/06 21:00 - 23:30',
						convener: '樂菲莊園管理委員會',
						reports: [
							'主席報告：現場人數9人，已達成會門檻，主席宣佈開會。',
							'工作報告：',
							'1. 消防安檢發現缺失，已安排廠商修繕，並進行測試。',
							'2. 社區恢復平日允許施工，裝潢保護檢查通過後7戶申請復工，7戶進行裝潢中。',
							'3. 印刷影印機提供另外的報價供社區討論研究。',
							'4. 2/21-2/24 B2停車場地坪Epoxy修補。',
							'5. 垃圾車垃圾桶數量調整，現有數量不足，建議增購。',
							'6. 3/3-3/6 B1停車場地坪Epoxy修補。',
							'7. 電話諮詢法律顧問江律師, 關於每月提撥管理費總額百分之五當成每月公共基金',
							'8. 修繕報價單討論(外牆景觀燈、消防設備、消防泡沫原液補充、發電機柴油補充)',
							'9. 第二次臨時會議預計3/23舉行。',
							'10 地下室水塔定位水閥是否更換',
							'11. 討論永大電梯維護方案，考慮簽約一年或三年。',
							'12. 電梯面板與訂單不符，待討論處理',
							'13. 兒童遊戲室建商修繕材料清除, 每日維持清掃',
							'14. 公共區域冷氣故障，已恢復運作',
							'15. B1-007, 008車位上方修繕，發生髒水淹B1區域狀況',
						],
						issues: [
							'一、建築公共安全檢查申報廠商選任：討論不同廠商報價與資格，決議由正翰公司以NT$50,000承接。',
							'二、垃圾、廚餘資源回收合作廠商選任：決議由恩又以NT$110,000承接。',
							'三、車道鐵捲門與欄桿機控制系統調整：決議暫緩施行，進一步與廠商確認。',
							'四、電話節費系統購置：決議試用瑪凱電信NT$600方案，30日後評估效果。',
							'臨時動議1. 關於消防安檢缺失，先將缺失提交茂德。並與CD棟13樓住戶先行溝通',
							'臨時動議2. 影印機租賃方案：決議每月NT$1,800方案，含免費印量。',
							'臨時動議3. 針對公共設施報價單，若非緊急必要項目，都是請廠商提供報價，交付建商工務主任',
							'臨時動議4. 第二次臨時區大重開議暫定於114年3月23日(週日)下午召開。',
							'臨時動議5. 針對永大電梯合約，請永大與社區另外約時間面談',
							'臨時動議6. 針對3/5 B1施工造成淹水，請管理中心草擬發函，通知日後維護前，需照會管委會。',
							'臨時動議7. 主委針對114/1月財報詢問委員是否有意見，否則追認',
						],
					},
					{
						title: '第一屆管理委員會12月份第4次緊急臨時會會議記錄',
						location: '家教室',
						datetime: '2025/01/11 09:30 - 09:52',
						convener: '樂菲莊園管理委員會',
						reports: ['1. 主席報告：現場委員人數13人，已達成會門檻，主席宣佈開會'],
						issues: [
							'一、主任委員以及監察委員推選，以利社區恢復正常運作。原主委、監委自薦財報尚未簽核，付款尚未支付，恐影響社區。按多數決由原主委黃適欽、原監委劉璟誼擔任新主委及新監委。',
						],
					},
					{
						title: '第一屆管理委員會12月份第4次臨時會會議記錄',
						location: '家教室',
						datetime: '2024/12/29 09:00 - 09:32',
						convener: '樂菲莊園管理委員會',
						reports: ['1. 主席報告：直到09:32，委員到場人數僅到6人，未達成會門檻，主席宣佈散會'],
						issues: ['一、主任委員以及監察委員推選 內容說明：緊急推選新主委及監委，以利社區恢復正常運作'],
					},
					{
						title: '第一屆管理委員會12月份第3次臨時會會議記錄',
						location: '家教室',
						datetime: '2024/12/22 19:00 - 20:35',
						convener: '樂菲莊園管理委員會',
						reports: ['1. 主席報告：直到20:35，委員到場人數僅到4人，未達成會門檻，主席宣佈散會'],
						issues: ['一、主任委員以及監察委員推選 內容說明：緊急推選新主委及監委，以利社區恢復正常運作'],
					},
					{
						title: '第一屆管理委員會12月份第2次臨時會會議記錄',
						location: '家教室',
						datetime: '2024/12/19 19:00 - 20:35',
						convener: '樂菲莊園管理委員會',
						reports: ['1. 主席報告：直到20:35，委員到場人數僅到6人，未達成會門檻，主席宣佈散會'],
						issues: ['一、主任委員以及監察委員推選 內容說明：緊急推選新主委及監委，以利社區恢復正常運作'],
					},
					{
						title: '公告：副主委代理主任委員職務通知',
						datetime: '2024/12/16 10:26',
						convener: '樂菲莊園管理委員會',
						reports: [
							'1. 第一屆主任委員自113年12月15日24:00起辭任主任委員職務，依社區規約第九條第五項規定，自113年12月16日起由副主任委員代理主任委員職務，至選出新任主任委員。',
							'2. 副主委將依照規約盡快召開會議，選出新任主委、監委，以便維持社區事務正常運作。',
						],
					},
					{
						title: '職務辭任',
						datetime: '2024/12/15',
						convener: '樂菲莊園管理委員會',
						reports: [
							'1. 怒罵管委會是「垃圾管委會！」、「一言堂」、「假民主真專制不溝通」、...，委員們聽到了！',
							'2. 下列管理委員之職務(權責)辭任：主任委員：黃適欽、監察委員：劉璟誼、環保委員：范中興、機電委員：陳樹棟、設施委員：石若薇、資管委員：詹鈞傑、園藝委員：章湘湘、調解委員：宋廣翊、安全委員：王源新、聯誼委員：周辰霏',
						],
					},
					{
						title: '樂非莊園社區 第一屆臨時區分所有權人會議記錄',
						location: '家教室',
						datetime: '2024/12/8 13:00',
						convener: '樂菲莊園管理委員會',
						reports: ['1. 因報到出席人數不足全體區分所有權人的50%，無法成會，經請示主委後，宣布散會。重新召集的時間，待管委會討論後，再另行公告知悉。'],
						issues: [
							'總戶數 655 成會戶數 328 出席戶數 182 ：未達成會標準',
							'總坪數 17740.14 成會坪數 8870.07 出席坪數 5200.27 ：未達成會標準',
							'報到率 100% 成會報到率 50% 出席率 27.79%：未達成會標準',
							'區權比 100% 成會區權比 50% 區權比率 29.31%：未達成會標準',
						],
					},
					{
						title: '第一屆管理委員會12月份第1次臨時會會議記錄',
						location: '家教室',
						datetime: '2024/12/7 09:00-10:00',
						convener: '樂菲莊園管理委員會',
						issues: [
							'一、垃圾清運服務廠商選任，因目前僅收到一家廠商報價，暫不予討論決議。',
							'二、討論物業公司依指導建立的財務報表，決議社區App公告完整報表，紙本公告收支財務報表與損益表兩份。',
							'臨時動議1、物業經理與公司確認，若區大會因人數不足流會，下次可提供支援日期（12/22 或 12/28）。',
						],
					},
					{
						title: '第一屆管理委員會11月份第2次臨時會會議記錄',
						location: '家教室',
						datetime: '2024/11/6 21:30 - 22:30',
						convener: '樂菲莊園管理委員會',
						reports: [
							'1. 10/1起垃圾清運廠商破爛王進場服務，但於10/8被告知新店區清潔隊禁止破爛王將社區垃圾載到垃圾收集點堆放，否則開罰。經協商後，恢復以一公斤7元秤重收取垃圾。',
							'2. 公設門禁與柵欄機遙控主機更換工程發包狀況更新，原報價廠商（順富）含稅價為NT$140,000，其他廠商報價分別為NT$155,000與NT$164,955。',
							'3. 消防安檢缺失單已於10/4提供，限期於11/28改善。',
							'4. 9/25~9/27進行水塔清洗，出現補水不及問題，建商確認後已進行改善。',
							'5. Honeywell過濾設備仍未安裝，與廠商確認中。',
							'6. 8月份與9月份的財報公告，請管委會確認格式。',
							'7. 瓦斯遮斷器保固範圍已確認，暫不需支付保養費。',
						],
						issues: [
							'一、公設門禁與柵欄機遙控器主機廠商討論決議，由順富科技進行建置。',
							'二、圍藝維護合作廠商討論決議，選定歌本企業進行圍藝維護。',
							'三、物業公司保管裝潢保證金暫存於管委會帳戶討論，要求物業人員向公司反映，是否繼續存放在物業公司帳戶，直到保證金退款完成。',
							'四、公設區域溫濕度計表購置討論，確認其他供應商後再議。',
							'五、第一屆臨時區分所有權人會議日期決定於113年12月8日(週日)下午13:00~17:30召開。',
							'六、消防安檢缺失改善後續處理，需於113年11月28日完成改善，否則將罰款。',
						],
					},
					{
						title: '茂德建設股份有限公司 函',
						datetime: '2024/10/10',
						target: '樂菲莊園管理委員會',
						main: '復貴會 113年9月21日公設會議內容,請查照',
						issues: [
							'一、關於KTV貴會針對設置位置有疑慮,本公司依照買賣契約第十九 條第一項第三點回復原狀,並留設備給貴會。',
							'二、反光鏡增設因非修繕項目,故本公司暫不施作。',
							'三、竣工圖、水電圖113年9月27日已提供給貴會。',
							'四、關於地下室維修期間,貴會提出住戶停車補助,請貴會先行點交統 整需修繕位置,本公司再行確認回覆。',
							'五、游泳池因補水問題,延後點交至113年10月11日14:00。',
							'六、如有疏漏項目未回覆,請貴會以函文告知本公司。',
						],
					},
					{
						title: '第一屆管理委員會九月份第2次臨時會會議記錄',
						location: '家教室',
						datetime: '2024/9/21 09:00-11:30',
						convener: '樂菲莊園管理委員會',
						reports: [
							'1. 9/17收到垃圾清運廠商提供更新的服務報價說明。',
							'2. 9/20收齊新的廠商（順富、富室、日欣）提供單機版公設門禁、棧棚機遙控主機、棧棚機監控系統維護保養報價單。',
							'3. 消防安檢檢測日程安排，與國霖機電確認於9/25進行初驗。',
							'4. 自9/16起，新申請的裝潢戶，已改匯款到社區管委會雜費金帳戶，共3戶9萬元。',
							'5. 9/19完成社區8月份財報以雙子星系統製作產出，提供管委會審核。',
							'6. 瓦斯遮斷器出現電池低落訊息，與欣欣瓦斯連繫後，收取社區瓦斯遮斷器系統維護合約報價。',
						],
						issues: [
							'議題一：公設門禁合作廠商、車道棧棚機遙控主機安裝及社區現有設備年度維護費合作廠商選任、報價單說明討論。提案人：袁經理。決議內容：(1) 委由物管中心再與順富科技議價，由原報價額144,000議至130,000（含稅）；(2) 承依社區增選之公設門禁系統及棧棚遙控主機予量工程。表決結果：贊成8票（李張民、袁玉燕、王源新、宋廣翰、蔡鈺安、石若薇、周辰羿、陳棧棚根為約僅管委員），超過現場與會二分之一人數，決議通過。',
							'議題二：垃圾清運合作廠商選任，合作條件說明討論。提案人：袁經理。決議內容：(1) 由威綠環境企業社以每月$80,000（未稅採用扣撥款）承做，其費用含專用垃圾袋，約期半年。(2) 廠商應每日運送或整理（每週五及日、無清潔隊收取）社區垃圾及回收品，並回報垃圾運送裝載數及拍照。表決結果：贊成9票（李張民、袁玉燕、王源新、宋廣翰、蔡鈺安、石若薇、周辰羿、陳棧棚根為約僅管委員），超過現場與會二分之一人數，決議通過。',
							'議題三：茂德建設代表報告：茂德代表張國文王主任於9/20回函（113茂字第1130920-005號）內容答覆社區共有16項設施狀況相關事項，親向管委會說明，經雙方研討討論如下（茂德代表須於商示公開承諾）：(1) 茂德親見現交清冊，應列各項質證之參考價。(2) 茂德提供社區各建設改善之大圖說。(3) 茂德在近期內召回（部分設施）修繕後進度。茂德管理所向公司反映KTV設置之可能性補償確認方案。',
							'戶外露天戲水池等（5）預計10/13試開放1天以供住戶體驗。',
							'除KTV室（14）外，一樓吧檯與沙發休閒區等設備（15）、監視系統及中控室（3~4）、機車及腳踏車位（6~7）、垃圾回收間（8）等其他項目可隨時安排點交排程，預計10月5~6日進行，茂德將再承諾管委會書面說明交接排程。',
						],
						nextMeeting: {
							date: '2024/9/28 08:30',
						},
					},
					{
						title: '茂德建設股份有限公司 函',
						datetime: '2024/9/20',
						target: '樂菲莊園管理委員會',
						main: '公設點交進度',
						issues: [
							'一. 09/21 預計點交 垃圾回收間：清單製作中',
							'二. 09/30 預計點交 一樓大廳出入門禁系統, 車道汽機車柵欄機, E-TAG系統, 一樓吧檯、沙發休閒區, 電梯, 監視系統, 中控室',
							'三. 10/15 預計點交 戶外園藝區花草樹木, 戶外景觀燈具, 戶外露天戲水池及相關設備',
							'四. 11月中 預計點交 KTV室',
							'五. 協調中 垃圾車停車位, 汽機車車道',
						],
					},
					{
						title: '第一屆管理委員會9月份例會會議記錄',
						location: '家教室',
						datetime: '2024/9/14 09:00-12:30',
						convener: '樂菲莊園管理委員會',
						reports: [
							'1. 9/13連繫新的垃圾清運廠商，請其提供新的服務合約內容，交付管委會審視討論。',
							'2. 9/13刷存摺，確認建商已完成第一階段匯款。',
							'3. 9/13完成公共區域的電話、水錶與管理中心的電話真線路的戶名更名過戶。',
							'4. 消防安檢申報進度詢問國霖機電中。',
							'5. 裝潢保證金的庫存資料，分別存放建商帳戶 - 25戶/75萬，物管帳戶 - 74戶/1222萬（待物管公司確認中）。現場討論後，自9/16起，新增的裝潢戶改匯至社區管委會帳戶。',
							'6. 負責廠商（淳成實業）告知目前社區污水確認已完成納管，但未向水公司完成申報，所以各戶的水費單上並未被提列需要徵收的費用，管委會決議暫時維持現行狀況。',
							'7. 建商已告知，專有戶內地震裂縫修繕9/26後不再安排進行。',
						],
						issues: [
							'1. 公設門禁、車道棧棚機遙控主機合作廠商、報價單討論。經討論後，管委會決議：(1)請遙控主機報價廠商提供多種服務範圍的報價，供管委會討論。(2)請找三家以上公設門禁架設廠商完成比價。',
							'2. 垃圾清運合作廠商選任，合作草約說明討論。經討論後，管委會決議：(1)請破爛玉說明服務合約內容中第四點的依據，並修正。(2)找其他類似服務廠商報價。',
							'臨時動議1. 針對建商仍未回覆管委會函文關於十六項公設項目點交部分，再次發函建商要求三天內提報點交排程，並於下次管委會到場報告，否則進行法律訴訟。提案人：黃通欽，表決內容：贊成7票（李張民、袁玉燕、宋廣翰、詹鈺傑、石若薇、范中興、黃通欽），決議通過。',
						],
						nextMeeting: {
							date: '2024/8/31 09:00',
						},
					},
					{
						title: '第一屆管理委員會九月份第1次臨時會會議記錄',
						location: '家教室',
						datetime: '2024/9/7 09:00-12:30',
						convener: '樂菲莊園管理委員會',
						reports: [
							'1. AED教學連繫於8/27（週二）14:00在家教室進行。',
							'2. 透水保水的申報文件已由淳成實業林先生協助填寫，在社區用印後提交水利協會檢查技師（9/3），檢核技師對文件內容無異議，同意協助完成繳案。後續每年應於5月底前完成自我檢查報告準備，廠商回應平均報價為NT$25,000。',
							'3. 消防安檢申報進度詢問國霖機電中。',
							'4. 裝潢保證金的庫存資料，分別存放（1）建商帳戶 - 25戶/75萬，（2）物管帳戶 - 74戶/222萬（待物管公司確認中）。物管公司詢問何時可以改由社區帳戶保管？',
							'5. 負責廠商（淳成實業）告知目前社區污水確認已完成納管，但未向水公司完成申報，所以各戶的水費單上並未被提列需徵收的費用。',
						],
					},
					{
						title: '樂菲莊園管理委員會 函',
						datetime: '2024/9/2',
						target: '茂德建設股份有限公司',
						main: '續辦：敬啟台端文到三日內，將預收管理費餘額款項及其他款項匯入本會指定帳戶，請知悉查照',
						issues: [
							'一. 覆台端「精字第 1130621001 號」',
							'二. 如旨，請台端文到三日內，將預收管理費餘額款項及其他款項匯入本會指定帳戶如下：',
							'台北富邦央北分行總分支機構代碼 012-8458 ',
							'帳號：82120000171217',
							'戶名：樂菲莊園管理委員會',
						],
					},
					{
						title: '樂菲莊園管理委員會 函',
						datetime: '2024/9/2',
						target: '茂德建設股份有限公司',
						main: '續辦：敬啟台端文到三日內，針對下列所舉公設項目，提供點交相關文件及清單，並擇期進行點交作業，請知悉查照',
						issues: [
							'一. 續 本會發文字號：「樂菲(管)字第 113060701 號」辦理。',
							'二. 先按本社區管委會於 113年 5月 4日成立，次按本建案承購戶均已完全支付購屋款項，就兩造購屋合約內容所載，台端應於交屋日時完成點交相關文件及清單，已經嚴重影響本會針對處理汙廢水滲漏、牆面斑駁、堵塞積水，業經本會屢次反映，台端消極處理，甚至不予理會，已經嚴重影響本社區承購戶之權益。',
							'三. 續上，敬請台端文到三日內，針對下列公設項目，提點交相關文件及清單，並擇期進行點交作業以維本社區所有承購戶之權益：',
							'1、戶外園藝花草樹木',
							'2、戶外景觀照明投光燈、壁燈、地底燈、門柱頭燈、路燈、步道燈等相關燈具及照明功能。',
							'3、監視系統',
							'4、中控室',
							'5、戶外露天戲水池及相關設備',
							'6、機車位',
							'7、腳踏車位',
							'8、垃圾回收間',
							'9、垃圾車停車位',
							'10、汽機車行駛道路路面',
							'11、一樓大廳出入門禁系統',
							'12、車道汽機車柵欄系統',
							'13、e-tag 感應偵測系統',
							'14、KTV 室',
							'15、一樓吧檯、沙發休閒區等設備',
							'16、電梯',
						],
					},
					{
						title: '第一屆管理委員會八月份第3次臨時會會議記錄',
						location: '家教室',
						datetime: '2024/8/24 09:00-12:30',
						convener: '樂菲莊園管理委員會',
						reports: [
							'1. AED教學連繫後，預計安排在8/27(週二) 14:00 於家教室進行',
							'2. 透水保水的申報檢查報告中自我申報表部分，廠商(建商的委託廠商)告知預計8/27前交付社區，需要社區配合用印，以便提供新北市水利局透水保水檢查小組，完成113年的申報作業。(後續每年五月前，需要完成相關檢查與文件準備，包括廠商委託)',
							'3. 針對S11店面在外圍拉水與電的線路將再次通知屋主改善(勸導單)',
							'4. 消防安檢申報委託確認已轉交國霖機電，目前準備相關文件中，後續追蹤他們的準備進度，目標要在9月底前完成第一次檢申報。',
							'5. 每年(或每2年)檢查申報項目：(1)消防安檢-3月起，9月底前務必完成首次初驗送件申報，最多展延於年底前完成(2)建物公共安全-4、5月前申報(3)透水保水檢查申報-5月前申報(4)電梯使用許可證-每年，時間依許可證到期日。',
							'6. 建商維修申請(假日有聲施工)作業，目前僅限假日需要有聲施工時，會要求建商先提出申請，送管委會審核後，通知修繕戶上下鄰居，並公告。',
							'7. 請社區經理邀請建商負責主任與車到Epoxy廠商，於週六到場說明與溝通預計進行的車到道施工方式。',
						],
						issues: [
							'1. 垃圾間紙箱放置設備，是否同意採購鐵籠車禍太空包處理？表決內容：採購2座鐵籠車，每座約 NT$8,159',
							'2. 是否同意其他二類電信業者架設主機在電信室提供網路寬頻服務？表決內容：業經項場討論後，暫不開放其他二類電信廠商進駐，待制定相關管理辦法並送區大審核通過後，再依法處理',
						],
						nextMeeting: {
							date: '2024/8/31 09:00',
						},
					},
					{
						title: '第一屆管理委員會八月份第二次臨時會會議記錄',
						location: '家教室',
						datetime: '2024/8/10 09:00-12:30',
						convener: '樂菲莊園管理委員會',
						reports: [
							'1. 棧棚機加裝遙控器及棧棚機齒棒的詢、議價結果回覆。',
							'2. 消防安檢申報合作廠商確認。',
							'3. 回覆工務局詢問來函檢舉，管委會後續處理狀況。',
							'4. 透水保水檢查函文說明與後續須配合準備事項。',
							'5. 紙本合約簽署與管委會支付零用金請款。',
							'6. 電動自行車出入車道律法。',
							'7. 經理、副理上班時間調整。',
						],
						issues: [
							'1. 今天10:00開始進行社區市元普渡。',
							'2. 公設門禁原先找尋現有社區門禁廠商(俞氏)，目前還未到場勘勤，另外原本的汽車、機車柵欄機加裝遙控器且調整柵欄機磨損的工程原廠廠商(麟瑞)，尋求第二家廠商做比價，且嘗試找同一廠商可以同時處理公設門禁與車道柵欄機遙控器，整合提供服務給社區。',
							'臨時動議 1：社區管理辦法討論(停車場管理辦法)。',
						],
						nextMeeting: {
							date: '2024/8/17(六) 09:00',
						},
					},
					{
						title: '第一屆管理委員會八月份第一次臨時會會議記錄',
						location: '家教室',
						datetime: '2024/8/3 09:00-12:30',
						convener: '樂菲莊園管理委員會',
						reports: [
							'1. 棧棚機加裝遙控器及棧棚機齒棒的詢、議價結果回覆。',
							'2. 消防安檢申報合作廠商確認。',
							'3. 回覆工務局詢問來函檢舉，管委會後續處理狀況。',
							'4. 透水保水檢查函文說明與後續須配合準備事項。',
							'5. 紙本合約簽署與管委會支付零用金請款。',
							'6. 電動自行車出入車道律法。',
							'7. 經理、副理上班時間調整。',
						],
						issues: [
							'1. 議題一：是否同意由國霖機電以金額NT$48,000元（含稅），承包今年社區消防安檢業務，一年消防機電維護保養合約每月NT$16,000元（含稅）。提案人：黃通欽。表決內容：贊成6票，決議通過。',
							'2. 議題二：授權物業經理與車道棧棚機廠商（麟瑞）以預算NT$24,000內，並延長保固時間，簽約加購遙控器與棧棚機調整改善工程。提案人：黃通欽。表決內容：贊成6票，決議通過。',
							'3. 臨時動議：一樓大廳燈光與冷氣開關控制討論，EFGH棟燈光時間與冷氣溫度設定進行調整，具體方案包括：燈光11:00~23:00開啟，冷氣溫度不低於26度為準。',
							'4. 外圍燈光開啟時間設定：花圃景觀燈與大門兩側門燈18:00~06:00；一樓牆面燈18:00~23:00；頂樓牆面燈18:00~06:00。',
						],
						nextMeeting: {
							date: '2024/8/10(六) 09:00',
						},
					},
					{
						title: '第一屆管理委員會七月份例會會議記錄',
						location: '家教室',
						datetime: '2024/7/13 09:00-12:30',
						convener: '樂菲莊園管理委員會',
						reports: [
							'1. 提醒管委會委員，社區今年度消防安檢的申報委外廠商要盡速確認，以免未執行而遭到開罰，並要求消防機電廠商回覆能說明他們針對社區今年消防安檢可以提供何種服務報價。',
							'2. 建商詢問是否管委會會透過建商確認財務交接的數字。',
							'3. 社區磁磚的購置，原廠提供回應仍為每張NT$350元，是否管委會還是要購置備用的磁磚由來提供住戶購置。',
							'4. 垃圾清運部分，廠商建議社區以秤重計價的方式，扣出對於社區較為划算。',
							'5. 目前現有監控廠商主機移機以便物業同仁將辦公室移入中控室，回覆目前尚未完成點交款項，因此無法提供移機報價，討論後管委會決議發函通知建商先行與社區點交，以便廠商可以進行。',
							'6. 針對物業費與保管的第二次報價，公司請管委會告知是否還有疑慮。',
							'7. 建商告知113年8月後的交易，建商不會再向住戶收取24個月的管理費，請物業同仁轉告管委會知悉。',
						],
						issues: [
							'1. 社區監控系統含124支監控鏡頭，同意先行安排點交，請建商盡快安排：贊成',
							'臨時動議 1. 針對社區公共區域燈光開關與冷氣開關，住戶與管委會討論EFGH棟一樓大廳燈光開關時間，請物業人員落實維持燈光開啟，EFGH大廳主燈11:00~23:00維持開啟，其他燈光請務必保持人身安全無虞下，適時的調控開關。',
							'臨時動議 2. G1-5F住戶反映，社區並無公共停車位架設充電樁，因此沒有條件架設充電樁，所以不須制定充電樁管理辦法。',
							'臨時動議 3. 主委反映，針對社區是否要建立官方社群，初步討論不認同目前所有檯面上的社群，但是社區已確需設立官方社群（但需實名制、單向對等管理中心），管委會會議決定相關管理辦法。',
						],
						nextMeeting: {
							date: '2024/7/20(六) 09:00',
						},
					},
					{
						title: '第一屆管理委員會六月份第4次臨時會會議記錄',
						location: '家教室',
						datetime: '2024/6/29 09:00-12:30',
						convener: '樂菲莊園管理委員會',
						reports: [
							'1. 與耕莘健康管理專校暫時預約 7/20(六)下午以及8/3(六)下午的三樓活動中心場地，但須於15日之前正式提交申請書與繳交租借費用7000元給學校，才能完成場地租借',
							'2. 6/26晚上，EF棟夜班保全值勤時中風，目前已送耕莘醫院急診，公司方面另調派代班人員現場支援',
							'3. 針對地下停車場公設部分，計有三家廠商：6/25 14:00 鼎恆工程、6/26 12:00 耐美樹脂地板、6/26 15:00 麒寶，到社區了解目前社區停車場所鋪設的 Epoxy 現場情況，並提出建議修繕方式及報價',
							'4. 針對監控系統公設加強設置諮詢部分，請廠商準備相關文件及報價單',
							'5. 針對是否現有網路合作廠商簽署3年或5年的合作合約，以取得投影機與投影布幕回饋案，考慮現況後暫不簽約',
							'6. 核備函補件，持續聯繫委託人與被委託人，目前115戶完成委託人與被委託人雙方補簽名，31戶僅完成被委託人補簽名。業經討論後，於6/30止，若未取得完成補簽名的委託戶，在不影響區大的出席率與投票率情形下，視同以未出席方式處理',
							'7. 提供物業保全清潔的報價單給管委會，下週公司副總到場會解說',
							'8. 針對7/1(一)起，要求社區經理與財秘等人員移置一樓中控室辦公，因為目前中控室無網路與電話等相關設備，暫時仍舊無法移置。',
							'9. 監控系統廠商(廣大)說明，現有監控系統施作是依照社區建案水電包商提供的規格進行。管委會請監控系統依照管委會提供的需求提供兩種報價單，(1)依照現有規格擴充足夠的監控鏡頭(2)以數位監控鏡頭補足不足的數量',
						],
						issues: [
							'1. 同意以一年2萬4千元之費用，聘僱江承欣律師為社區的法律顧問，其服務內容只包含社區顧問掛牌並與參與社區一年2次區分所有權人會議，管委會若有其他需求服務，再另行提供報價及審核決議：決議通過',
						],
					},
					/*{
											title: '管委會6月份第2次例會開會通知',
											datetime: '2024/6/15 09:00',
											location: '家教室',
											convener: '樂菲莊園管理委員會',
											issues: ['1. 工作報告', '2. 議題討論 (1)廠商工作說明與討論 (2) 規約及管理辦法增修案討論', '3. 臨時動議'],
										},*/
					{
						title: '第一屆管理委員會六月份第3次臨時會會議記錄',
						location: '家教室',
						datetime: '2024/6/22 08:00-13:30',
						convener: '樂菲莊園管理委員會',
						reports: ['1. 核備函補件所需委託書，持續聯繫委託人與被委託人中，目前53戶完成，另89戶僅完成被委託人補簽名，8戶目前無法聯繫上。'],
						issues: [
							'1. 聘僱律師條件，授權委員撰寫：決議通過',
							'2. 聘僱會計師條件，授權委員撰寫：決議通過',
							'3. 為查明違反垃圾廢棄物處理規定之住戶，是否同意在垃圾回收室裝設監視器等設備？同意裝設',
							'4. 針對建商預收管理費結算後之爭議款項，是否同意循司法訴訟程序維護權益？決議通過',
							'5. 針對建商所提供之財務資料，是否同意於6/23(日)下午辦理第一次公聽會？同意辦理',
							'6. 針對建商所提供之財務資料，是否同意於6/29(六)下午辦理第二次公聽會？同意辦理',
							'7. 臨時區權會召開日期，同意暫訂於7/20(六)、8/3(六)舉行？同意召開',
							'8. 針對建商日前發函通知保全物業清潔合約將於7/31終止，是否同意優先與皇家國際議價？決議通過',
							'9. AB棟前往3樓泳池梯廳牆面，同意增設公設點交相關函文之專屬公佈欄？同意增設',
							'10. 中元普渡，擇定8/10(六)上午舉行，由住戶自行祭拜、金紙統一集中並交由清潔隊作後續處理，同意舉行',
							'11. 一樓室內公設99小時體驗結束，是否同意持續開放？業經討論相關回饋資料，決議不同意持續開放',
							'12. 社區公設園藝部分，是否通知建商啟動點交作業？決議通過',
							'13. 社區公設監控系統部分，是否通知建商啟動點交作業？決議通過',
							'14. 社區公設吧檯區、休閒沙發區是否通知建商，啟動點交作業？決議通過',
						],
					},
					{
						title: '第一屆管理委員會六月份第2次臨時會會議記錄',
						location: '家教室',
						datetime: '2024/6/8 09:00-11:00',
						convener: '樂菲莊園管理委員會',
						reports: [
							'1. 申請核備資料補件，持續聯絡被委託人(約150戶)完成簽核中，待完成後，再次遞件申請核備',
							'2. 聯繫建商協力廠商簡介部份：永大電梯：6/13(四)19:30到會說明/園藝廠商，門禁廠商陸續邀約中',
							'3. 公設點交廠商簡報部份：嘉鼎工程：6/8(六)14:00到會說明/國霖機電：6/12(三)19:30到會說明/真禾機電：邀約中',
						],
						issues: [
							'1. 代管期間財務報告與討論：1.建商於6/13(四)1700前，函覆管委會所提之疑慮說明，並補齊相關會計憑證, 2. 公設點交驗收討論：(1)AB棟2、3樓有社會住宅，預計6/18複驗。(2)目前申請綠建築認證，目前已完成文件審查，6/18到場會勘。(3)R樓的KTV設施，暫不進行安裝。(4)目前工務現場共4位主任(5)針對住家隔音不良是否統一每戶加裝靜音膠條等問題，工務主任提議管委會先與住戶討論後，主任再找廠商來現場討論如何改善。(6)建商同意開放一樓室內公設住戶體驗(7)移交時，建商須提供竣工圖、結構計算書、結構圖、地質鑽探報告(8)各棟的梯廳廊道的地磚修繕，將會等待到其他專有戶的修繕告一段落後，才會開始安排修繕',
							'2. 垃圾清運廠商簡報：(1)廠商說明目前在其他社區合作模式，協助社區將垃圾室的垃圾從垃圾室內運送到社區外的一樓，交付給清潔隊的垃圾車。(2)溝通哪些項目會代為處理(木頭、石頭與家具不做處理，其他都會處理)，快遞包裝的木條需要自行拆卸裝入垃圾袋內後，仍可協助交付清潔隊，但若不自行拆卸，將放置一旁不處理 (3)目前一次子車計價NT750元 (4) 為配合清潔隊來收取垃圾，因此週三與週日將無法將垃圾載走，只能打包後暫放垃圾冷藏室內等隔日再交付清潔隊，其他日期每天派員協助清空垃圾室。',
							'臨時動議1. 每戶磁扣的最高總數量為五張，超過基本張數，酌收工本費：決議通過',
							'臨時動議2. 石若薇設備委員所提的公設使用注意事項是否通過：決議通過',
							'臨時動議3. 原來的垃圾廠商一個子車為1000，目前承恩實業公司一子車為750元，更改為較經濟的承恩實業公司，是否通過：決議通過',
						],
						nextMeeting: {
							date: '2024/6/15 09:00',
						},
					},
					/*
										{
											title: '管委會6月份第一次例會開會通知',
											datetime: '2024/6/08 09:00',
											location: '家教室',
											convener: '樂菲莊園管理委員會',
											issues: ['1. 工作報告', '2. 議題討論 (1)廠商工作說明與討論', '3. 臨時動議'],
										},*/
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
					/*
										{
											title: '第一屆管理委員會第一次例會開會通知',
											location: 'EF棟一樓大廳閱覽室',
											datetime: '2024/5/18 09:00-11:00',
											convener: '樂菲莊園管理委員會',
											issues: ['1. 法律顧問聘請', '2. 會計師聘請', '3. 功能委員選任'],
										},*/
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
