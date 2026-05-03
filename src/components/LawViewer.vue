<template>
	<div class="law-viewer">
		<!-- 搜尋框 -->
		<div class="search-box mb-3">
			<input
				v-model="searchQuery"
				type="text"
				class="form-control"
				placeholder="搜尋條文內容..."
				@input="handleSearch"
			/>
		</div>

		<div class="row">
			<!-- 目錄導航 -->
			<div class="col-md-3 d-none d-md-block">
				<div class="toc-container sticky-top" style="top: 20px">
					<h6 class="toc-title">目錄</h6>
					<ul class="toc-list">
						<li
							v-for="chapter in chapters"
							:key="chapter.id"
							:class="{ active: activeChapter === chapter.id }"
						>
							<a href="#" @click.prevent="scrollToChapter(chapter.id)">
								{{ chapter.title }}
							</a>
						</li>
					</ul>
				</div>
			</div>

			<!-- 法條內容 -->
			<div class="col-md-9">
				<div class="law-header mb-4">
					<h4>{{ lawTitle }}</h4>
					<p class="text-muted">{{ lawMeta }}</p>
				</div>

				<div v-if="filteredContent.length === 0" class="alert alert-info">
					找不到符合「{{ searchQuery }}」的條文
				</div>

				<div
					v-for="section in filteredContent"
					:key="section.id"
					:id="section.id"
					class="law-section"
				>
					<h5 v-if="section.type === 'chapter'" class="chapter-title">
						{{ section.title }}
					</h5>
					<div v-else-if="section.type === 'article'" class="article">
						<h6 class="article-title">{{ section.title }}</h6>
						<div class="article-content" v-html="highlightText(section.content)"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'LawViewer',
	props: {
		markdownContent: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			searchQuery: '',
			activeChapter: '',
			parsedContent: [],
			lawTitle: '',
			lawMeta: ''
		}
	},
	computed: {
		chapters() {
			return this.parsedContent.filter(s => s.type === 'chapter')
		},
		filteredContent() {
			if (!this.searchQuery.trim()) {
				return this.parsedContent
			}
			const query = this.searchQuery.toLowerCase()
			return this.parsedContent.filter(section => {
				if (section.type === 'chapter') {
					// 保留章節標題如果有相關條文
					return this.parsedContent.some(
						s => s.chapterId === section.id &&
						(s.title.toLowerCase().includes(query) ||
						s.content?.toLowerCase().includes(query))
					)
				}
				return (
					section.title.toLowerCase().includes(query) ||
					section.content?.toLowerCase().includes(query)
				)
			})
		}
	},
	watch: {
		markdownContent: {
			immediate: true,
			handler(newVal) {
				if (newVal) {
					this.parseMarkdown(newVal)
				}
			}
		}
	},
	methods: {
		parseMarkdown(content) {
			const lines = content.split('\n')
			const result = []
			let currentChapterId = ''
			let currentArticle = null

			for (let i = 0; i < lines.length; i++) {
				const line = lines[i]

				// 標題
				if (line.startsWith('# ') && !this.lawTitle) {
					this.lawTitle = line.substring(2).trim()
					continue
				}

				// 元資料 (blockquote)
				if (line.startsWith('> ')) {
					this.lawMeta += line.substring(2).trim() + ' '
					continue
				}

				// 章節 (## )
				if (line.startsWith('## ')) {
					if (currentArticle) {
						result.push(currentArticle)
						currentArticle = null
					}
					const title = line.substring(3).trim()
					currentChapterId = 'chapter-' + result.length
					result.push({
						id: currentChapterId,
						type: 'chapter',
						title: title
					})
					continue
				}

				// 條文 (### )
				if (line.startsWith('### ')) {
					if (currentArticle) {
						result.push(currentArticle)
					}
					const title = line.substring(4).trim()
					currentArticle = {
						id: 'article-' + result.length,
						type: 'article',
						title: title,
						content: '',
						chapterId: currentChapterId
					}
					continue
				}

				// 內容
				if (currentArticle && line.trim()) {
					currentArticle.content += this.formatLine(line) + '<br>'
				}
			}

			if (currentArticle) {
				result.push(currentArticle)
			}

			this.parsedContent = result
		},
		formatLine(line) {
			// 處理列表項目
			if (/^[一二三四五六七八九十]+、/.test(line)) {
				return '<span class="list-item">' + this.escapeHtml(line) + '</span>'
			}
			if (/^\d+、/.test(line)) {
				return '<span class="list-item sub">' + this.escapeHtml(line) + '</span>'
			}
			return this.escapeHtml(line)
		},
		escapeHtml(text) {
			const div = document.createElement('div')
			div.textContent = text
			return div.innerHTML
		},
		highlightText(content) {
			if (!this.searchQuery.trim() || !content) {
				return content
			}
			const query = this.searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
			const regex = new RegExp(`(${query})`, 'gi')
			return content.replace(regex, '<mark>$1</mark>')
		},
		scrollToChapter(id) {
			const el = document.getElementById(id)
			if (el) {
				el.scrollIntoView({ behavior: 'smooth', block: 'start' })
				this.activeChapter = id
			}
		},
		handleSearch() {
			// 防抖處理可在此加入
		}
	}
}
</script>

<style scoped>
.law-viewer {
	padding: 1rem;
	text-align: left;
}

.search-box {
	max-width: 400px;
}

.toc-container {
	background: #f8f9fa;
	border-radius: 8px;
	padding: 1rem;
	max-height: calc(100vh - 100px);
	overflow-y: auto;
}

.toc-title {
	font-weight: 600;
	margin-bottom: 0.75rem;
	color: #495057;
}

.toc-list {
	list-style: none;
	padding: 0;
	margin: 0;
}

.toc-list li {
	margin-bottom: 0.5rem;
}

.toc-list li a {
	color: #6c757d;
	text-decoration: none;
	font-size: 0.9rem;
	display: block;
	padding: 0.25rem 0.5rem;
	border-radius: 4px;
	transition: all 0.2s;
}

.toc-list li a:hover,
.toc-list li.active a {
	color: #0d6efd;
	background: #e7f1ff;
}

.law-header h4 {
	color: #212529;
	font-weight: 600;
}

.law-section {
	margin-bottom: 1.5rem;
}

.chapter-title {
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	color: white;
	padding: 0.75rem 1rem;
	border-radius: 8px;
	margin-top: 2rem;
	margin-bottom: 1rem;
	font-size: 1.1rem;
}

.article {
	background: white;
	border: 1px solid #e9ecef;
	border-radius: 8px;
	padding: 1rem;
	margin-bottom: 1rem;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.article-title {
	color: #495057;
	font-weight: 600;
	margin-bottom: 0.75rem;
	padding-bottom: 0.5rem;
	border-bottom: 2px solid #e9ecef;
}

.article-content {
	color: #495057;
	line-height: 1.8;
	font-size: 0.95rem;
}

.article-content :deep(.list-item) {
	display: block;
	padding-left: 1.5rem;
	text-indent: -1.5rem;
	margin-bottom: 0.25rem;
}

.article-content :deep(.list-item.sub) {
	padding-left: 2.5rem;
}

.article-content :deep(mark) {
	background: #fff3cd;
	padding: 0.1rem 0.2rem;
	border-radius: 2px;
}

@media (max-width: 767px) {
	.law-viewer {
		padding: 0.5rem;
	}

	.search-box {
		max-width: 100%;
	}
}
</style>
