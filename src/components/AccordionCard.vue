<template>
	<div class="accordion-container">
		<div class="card" v-for="(item, index) in items" :key="index">
			<div class="card-header" @click="toggle(index)">
				<h5 class="mb-0">
					<button class="btn">
						{{ item.title }}
					</button>
				</h5>
			</div>

			<div class="collapse" :class="{ show: activeIndex === index }">
				<div class="card-body">
					<slot name="content" :item="item" :index="index">
						{{ item.content }}
					</slot>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'AccordionCard',
	props: {
		items: {
			type: Array,
			required: true
		},
		defaultOpen: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			activeIndex: this.defaultOpen
		};
	},
	methods: {
		toggle(index) {
			this.activeIndex = this.activeIndex === index ? -1 : index;
		}
	}
};
</script>

<style scoped>
.accordion-container {
	margin-top: 50px;
	text-align: left;
}

.btn {
	font-size: 18px;
	font-weight: 600;
	background: none;
	border: none;
	color: inherit;
	width: 100%;
	text-align: left;
}

.card {
	border: 1px solid #ddd;
	margin-bottom: 10px;
	border-radius: 8px;
}

.card-header {
	background-color: #f8f9fa;
	padding: 15px;
	cursor: pointer;
}

.collapse {
	display: none;
}

.collapse.show {
	display: block;
}

.card-body {
	padding: 20px;
}
</style>