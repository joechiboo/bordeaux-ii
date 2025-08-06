<template>
	<AccordionCard :items="formattedRecords" :defaultOpen="0">
		<template #content="{ item }">
			<strong>日期與時間：</strong>{{ item.datetime }}<br />
			<div v-if="item.target"><strong>受文者：</strong>{{ item.target }}<br /></div>
			<div v-if="item.main"><strong>主旨：</strong>{{ item.main }}<br /></div>
			<div v-if="item.location"><strong>地點：</strong>{{ item.location }}<br /></div>
			<div v-if="item.convener"><strong>召集人：</strong>{{ item.convener }}<br /></div>
			<div v-if="item.content">
				<strong>會議內容摘要：</strong><br />
				{{ item.content }}
			</div>
			<div v-if="item.reports && item.reports.length">
				<strong>工作報告：</strong>
				<ul>
					<li v-for="(report, reportIndex) in item.reports" :key="`report-${reportIndex}`">{{ report }}</li>
				</ul>
			</div>
			<div v-if="item.issues && item.issues.length">
				<div v-if="item.target"><strong>說明：</strong></div>
				<div v-else><strong>討論議題：</strong></div>
				<ul>
					<li v-for="(issue, issueIndex) in item.issues" :key="`issue-${issueIndex}`">{{ issue }}</li>
				</ul>
			</div>
			<div v-if="item.nextMeeting">
				<strong>下次會議日期：</strong>{{ item.nextMeeting.date }}<br />
				<strong v-if="item.nextMeeting.specialNote">特別說明：</strong>{{ item.nextMeeting.specialNote }}
			</div>
		</template>
	</AccordionCard>
</template>

<script>
import AccordionCard from './AccordionCard.vue';
import { meetingRecords } from '../data/meetingRecords.js';
import { dateUtils } from '../utils/index.js';

export default {
	name: 'MeetingMinutes',
	components: {
		AccordionCard
	},
	data() {
		return {
			records: meetingRecords
		};
	},
	computed: {
		formattedRecords() {
			return this.records.map(record => ({
				...record,
				title: record.title,
				datetime: dateUtils.formatDateTime(record.datetime)
			}));
		}
	}
};
</script>

<style scoped>
ul {
	margin: 10px 0;
	padding-left: 20px;
}

li {
	margin-bottom: 5px;
	line-height: 1.4;
}

strong {
	color: #333;
}

div {
	margin-bottom: 8px;
}
</style>