<template>
	<div class="timeline">
		<div class="timeline-item" v-for="event in events" :key="event.date">
			<div class="card">
				<div class="card-header">{{ event.date }}</div>
				<div class="card-body">
					<h5 class="card-title">{{ event.title }}</h5>
					<p class="card-text">{{ event.description }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'CommunityEvents',
		data() {
			return {
				events: [
					{ date: '2025-03-23 13:30', title: '第一屆第二次臨時區分所有權人重開議會議', description: '達到法規要求的1/5出席數。' },
					{ date: '2024-12-08 13:30', title: '第一屆第一次臨時區分所有權人會議', description: '未達法規要求的1/2出席數。' },
					{ date: '2024-05-04 08:30', title: '第二次區權人會議', description: '達到法規要求的1/5出席數，成立管委會。' },
					{ date: '2024-02-24 13:30', title: '第一次區權人會議', description: '未達法規要求的2/3出席數。' },
				],
			};
		},
	};
</script>

<style>
	.timeline {
		margin-top: 40px;
		display: flex;
		flex-direction: column;
	}
	.timeline-item {
		margin-bottom: 20px;
	}
	.card-header {
		background-color: gray;
	}
</style>
