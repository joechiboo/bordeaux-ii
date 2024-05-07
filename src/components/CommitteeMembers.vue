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
				committees: [
					{
						version: '第一屆管理委員會',
						contents: [
							{
								title: '委員選舉結果',
								details: [
									{ key: '主委', value: '黃O欽' },
									{ key: '副委', value: '李O樵' },
									{ key: '財委', value: '袁O燕' },
									{ key: '監委', value: '劉O誼' },
								],
							},
							{
								title: '當選委員名單',
								details: [
									{ key: 'A3-15F', value: '簡O燕' },
									{ key: 'A3-12F', value: '陳O中' },
									{ key: 'B3-9F', value: '黃O欽' },
									{ key: 'B1-5F', value: '宋O翊' },
									{ key: 'C3-6F', value: '袁O燕' },
									{ key: 'C6-2F', value: '蔡O安' },
									{ key: 'D2-8F', value: '劉O誼' },
									{ key: 'D1-3F', value: '范O興' },
									{ key: 'E1-2F', value: '石O微' },
									{ key: 'E8-8F', value: '章O湘' },
									{ key: 'F3-10F', value: '陳O豪' },
									{ key: 'F6-6F', value: '周O妘' },
									{ key: 'G6-4F', value: '李O樵' },
									{ key: 'G5-11F', value: '陳O棟' },
									{ key: 'H1-4F', value: '夏O斌' },
									{ key: 'H8-6F', value: '詹O傑' },
									{ key: '店面(H5-01)', value: '陳O妤' },
								],
							},
							// 添加其他信息區塊
						],
					},
					// 添加其他屆次信息
				],
			};
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
		width: 50%;
	}
</style>
