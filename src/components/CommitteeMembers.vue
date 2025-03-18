<template>
	<div id="committeeAccordion">
		<div class="card" v-for="(committee, index) in committees" :key="index">
			<div class="card-header" :id="'committeeHeading' + index">
				<h5 class="mb-0">
					<button
						class="btn"
						data-toggle="collapse"
						:data-target="'#committeeCollapse' + index"
						:aria-expanded="index === 0 ? 'true' : 'false'"
						:aria-controls="'committeeCollapse' + index"
					>
						{{ committee.version }}
					</button>
				</h5>
			</div>
			<div
				:id="'committeeCollapse' + index"
				class="collapse"
				:class="{ show: index === 0 }"
				aria-labelledby="'committeeHeading' + index"
				data-parent="#committeeAccordion"
			>
				<div class="card-body">
					<div v-for="(section, secIndex) in committee.contents" :key="secIndex">
						<h4>{{ section.title }}</h4>
						<table class="table">
							<tbody>
								<tr v-for="(detail, detailIndex) in section.details" :key="detailIndex">
									<td>{{ detail.key }}</td>
									<td>{{ detail.value }}</td>
									<td v-if="detail.attendance">出席率: {{ attendanceRate(detail.attendance) }}%</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'CommitteeMembers',
		data() {
			return {
				totalMeetings: 21, // 設定總會議次數 // 目前到3/6
				committees: [
					{
						version: '第一屆管理委員會',
						contents: [
							{
								title: '委員選舉結果',
								details: [
									{ key: '主委', value: '黃O欽 (辭)' },
									{ key: '副委', value: '李O民 (代主委)' },
									{ key: '財委', value: '袁O燕' },
									{ key: '監委', value: '劉O誼 (辭)' },
								],
							},
							{
								title: '當選委員名單',
								details: [
									{
										key: 'A 棟(A3-15F)',
										value: '王O新 (辭)',
										attendance: [
											true,
											false,
											true,
											true,
											true,
											true,
											true,
											true,
											true,
											true,
											true,
											true,
											true,
											true,
											false,
											true,
											false,
											false,
											false,
											true,
											true,
										],
									},
									{
										key: 'A 棟(A3-12F)',
										value: '陳O中 (未出席)',
										attendance: [
											false,
											false,
											false,
											false,
											false,
											false,
											false,
											false,
											false,
											false,
											false,
											false,
											false,
											false,
											false,
											false,
											false,
											false,
											false,
											false,
											false,
										],
									},
									{
										key: 'B 棟(B3-09F)',
										value: '黃O欽 (辭)',
										attendance: [
											true,
											true,
											true,
											true,
											true,
											true,
											true,
											true,
											true,
											true,
											true,
											true,
											true,
											true,
											true,
											true,
											false,
											false,
											false,
											true,
											true,
										],
									},
									{
										key: 'B 棟(B1-05F)',
										value: '宋O翊 (辭)',
										attendance: [
											true,
											true,
											true,
											true,
											true,
											true,
											true,
											true,
											true,
											true,
											true,
											true,
											true,
											true,
											true,
											true,
											false,
											false,
											true,
											true,
											false,
										],
									},
									{
										key: 'C 棟(C3-06F)',
										value: '袁O燕',
										attendance: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
									},
									{
										key: 'C 棟(C6-02F)',
										value: '蔡O安',
										attendance: [
											false,
											false,
											false,
											false,
											false,
											false,
											false,
											false,
											true,
											false,
											true,
											true,
											true,
											false,
											true,
											false,
											true,
											true,
											false,
											true,
											true,
										],
									},
									{
										key: 'D 棟(D2-08F)',
										value: '劉O誼 (辭)',
										attendance: [
											true,
											true,
											true,
											true,
											true,
											true,
											false,
											true,
											false,
											true,
											false,
											true,
											true,
											true,
											true,
											true,
											false,
											false,
											false,
											true,
											true,
										],
									},
									{
										key: 'D 棟(D1-03F)',
										value: '范O興 (辭)',
										attendance: [
											false,
											true,
											true,
											true,
											true,
											true,
											true,
											true,
											true,
											true,
											true,
											true,
											true,
											true,
											true,
											true,
											true,
											false,
											true,
											true,
											true,
										],
									},
									{
										key: 'E 棟(E1-02F)',
										value: '石O薇 (辭)',
										attendance: [
											true,
											true,
											true,
											true,
											true,
											true,
											true,
											true,
											true,
											true,
											true,
											true,
											true,
											true,
											true,
											true,
											false,
											false,
											false,
											true,
											true,
										],
									},
									{
										key: 'E 棟(E8-08F)',
										value: '章O湘 (辭)',
										attendance: [
											false,
											true,
											true,
											true,
											false,
											false,
											true,
											true,
											false,
											true,
											true,
											true,
											true,
											false,
											true,
											false,
											false,
											false,
											false,
											true,
											false,
										],
									},
									{
										key: 'F 棟(F3-10F)',
										value: '丁O蘭',
										attendance: [
											true,
											true,
											false,
											true,
											false,
											false,
											false,
											false,
											false,
											false,
											false,
											false,
											false,
											false,
											false,
											false,
											true,
											true,
											false,
											false,
										],
									},
									{
										key: 'F 棟(F6-06F)',
										value: '周O妘 (辭)',
										attendance: [
											true,
											false,
											true,
											true,
											false,
											true,
											true,
											false,
											true,
											true,
											true,
											true,
											true,
											true,
											true,
											true,
											false,
											false,
											false,
											true,
											true,
										],
									},
									{
										key: 'G 棟(G6-04F)',
										value: '李O民',
										attendance: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, false, true, true, true, true, true, true],
									},
									{
										key: 'G 棟(G5-11F)',
										value: '陳O棟 (辭)',
										attendance: [
											true,
											true,
											true,
											true,
											true,
											false,
											false,
											false,
											false,
											false,
											false,
											true,
											true,
											false,
											true,
											false,
											false,
											false,
											false,
											true,
											true,
										],
									},
									{
										key: 'H 棟(H1-04F)',
										value: '夏O斌',
										attendance: [
											false,
											false,
											true,
											false,
											true,
											false,
											false,
											false,
											false,
											false,
											false,
											false,
											false,
											false,
											false,
											false,
											true,
											true,
											true,
											true,
											false,
										],
									},
									{
										key: 'H 棟(H8-06F)',
										value: '詹O傑 (辭)',
										attendance: [
											true,
											true,
											true,
											true,
											true,
											true,
											true,
											true,
											true,
											false,
											true,
											true,
											true,
											false,
											false,
											false,
											false,
											false,
											false,
											false,
											false,
										],
									},
									{
										key: '店面(S12-01F)',
										value: '陳O妤',
										attendance: [
											true,
											false,
											true,
											false,
											false,
											false,
											false,
											false,
											false,
											false,
											false,
											false,
											false,
											false,
											false,
											false,
											false,
											false,
											false,
											false,
											false,
										],
									},
								],
							},
							// 添加其他信息區塊
						],
					},
					// 添加其他屆次信息
				],
			};
		},
		methods: {
			attendanceRate(attendance) {
				const attendedMeetings = attendance.filter((a) => a).length;
				return Math.round((attendedMeetings / this.totalMeetings) * 100);
			},
		},
	};
</script>

<style>
	#committeeAccordion {
		margin-top: 50px;
		text-align: left;
	}

	.btn {
		font-size: 20px;
		font-weight: 700;
	}

	.table {
		width: 100%;
	}

	.table td,
	.table th {
		vertical-align: middle; /* 新增：使表格內容垂直居中 */
		height: 50px; /* 新增：統一表格行高 */
	}
</style>
