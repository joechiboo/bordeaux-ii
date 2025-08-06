<template>
	<AccordionCard :items="formattedCommittees" :defaultOpen="0">
		<template #content="{ item }">
			<div v-for="(section, secIndex) in item.contents" :key="secIndex">
				<h4>{{ section.title }}</h4>
				<table class="table">
					<tbody>
						<tr v-for="(detail, detailIndex) in section.details" :key="detailIndex">
							<td>{{ detail.key }}</td>
							<td>{{ detail.value }}</td>
							<td v-if="detail.attendance">
								出席率: {{ calculateAttendanceRate(detail.attendance, item.totalMeetings) }}%
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</template>
	</AccordionCard>
</template>

<script>
import AccordionCard from './AccordionCard.vue';
import { committeeData } from '../data/committeeData.js';
import { attendanceUtils } from '../utils/index.js';

export default {
	name: 'CommitteeMembers',
	components: {
		AccordionCard
	},
	data() {
		return {
			committees: committeeData
		};
	},
	computed: {
		formattedCommittees() {
			return this.committees.map(committee => ({
				...committee,
				title: committee.version
			}));
		}
	},
	methods: {
		calculateAttendanceRate(attendance, totalMeetings) {
			return attendanceUtils.calculateAttendanceRate(attendance, totalMeetings);
		}
	}
};
</script>

<style scoped>
h4 {
	margin-top: 20px;
	margin-bottom: 15px;
	color: #333;
	font-weight: 600;
}

.table {
	width: 100%;
	margin-bottom: 20px;
	border-collapse: collapse;
}

.table td {
	padding: 8px 12px;
	border-bottom: 1px solid #eee;
	vertical-align: top;
}

.table tr:hover {
	background-color: #f5f5f5;
}

.table td:first-child {
	font-weight: 500;
	width: 25%;
}

.table td:nth-child(2) {
	width: 35%;
}

.table td:last-child {
	width: 40%;
	font-weight: 500;
	color: #007bff;
}
</style>