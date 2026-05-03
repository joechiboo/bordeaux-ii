<template>
	<div class="rules-laws-container">
		<!-- Tab 導航 -->
		<ul class="nav nav-tabs mb-4" role="tablist">
			<li class="nav-item" role="presentation">
				<button
					class="nav-link"
					:class="{ active: activeTab === 'community' }"
					@click="activeTab = 'community'"
					type="button"
					role="tab"
				>
					<i class="bi bi-house-door me-2"></i>社區規約
				</button>
			</li>
			<li class="nav-item" role="presentation">
				<button
					class="nav-link"
					:class="{ active: activeTab === 'law' }"
					@click="activeTab = 'law'"
					type="button"
					role="tab"
				>
					<i class="bi bi-book me-2"></i>公寓大廈管理條例
				</button>
			</li>
		</ul>

		<!-- Tab 內容 -->
		<div class="tab-content">
			<!-- 社區規約 -->
			<div v-show="activeTab === 'community'" class="tab-pane fade" :class="{ 'show active': activeTab === 'community' }">
				<CommunityRules />
			</div>

			<!-- 公寓大廈管理條例 -->
			<div v-show="activeTab === 'law'" class="tab-pane fade" :class="{ 'show active': activeTab === 'law' }">
				<div v-if="loading" class="text-center py-5">
					<div class="spinner-border text-primary" role="status">
						<span class="visually-hidden">載入中...</span>
					</div>
					<p class="mt-2 text-muted">載入法規內容中...</p>
				</div>
				<LawViewer v-else-if="lawContent" :markdownContent="lawContent" />
				<div v-else class="alert alert-warning">
					尚未載入法規內容，請稍後再試。
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import CommunityRules from './CommunityRules.vue'
import LawViewer from './LawViewer.vue'

export default {
	name: 'RulesAndLaws',
	components: {
		CommunityRules,
		LawViewer
	},
	data() {
		return {
			activeTab: 'community',
			lawContent: '',
			loading: false
		}
	},
	methods: {
		async loadLawContent() {
			if (this.lawContent) return // 已載入過就不重複載入

			this.loading = true
			try {
				const basePath = import.meta.env.BASE_URL || '/'
				const response = await fetch(`${basePath}reference/公寓大廈管理條例.md`)
				if (response.ok) {
					this.lawContent = await response.text()
				} else {
					console.error('無法載入法規檔案')
				}
			} catch (error) {
				console.error('載入法規失敗:', error)
			}
			this.loading = false
		}
	},
	watch: {
		activeTab(newTab) {
			if (newTab === 'law') {
				this.loadLawContent()
			}
		}
	}
}
</script>

<style scoped>
.rules-laws-container {
	padding: 1rem;
}

.nav-tabs {
	border-bottom: 2px solid #dee2e6;
}

.nav-tabs .nav-link {
	color: #6c757d;
	border: none;
	border-bottom: 3px solid transparent;
	padding: 0.75rem 1.5rem;
	font-weight: 500;
	transition: all 0.2s ease;
}

.nav-tabs .nav-link:hover {
	color: #495057;
	border-color: transparent;
	background: #f8f9fa;
}

.nav-tabs .nav-link.active {
	color: #0d6efd;
	border-bottom-color: #0d6efd;
	background: transparent;
}

.tab-content {
	min-height: 400px;
}

.tab-pane {
	animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}

@media (max-width: 576px) {
	.nav-tabs .nav-link {
		padding: 0.5rem 1rem;
		font-size: 0.9rem;
	}
}
</style>
