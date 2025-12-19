<template>
	<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
		<div class="container-fluid">
			<router-link class="navbar-brand" to="/welcome">波爾多 - 樂菲莊園</router-link>
			<button
				class="navbar-toggler"
				type="button"
				aria-controls="navbarNav"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarNav">
				<ul class="navbar-nav">
					<li class="nav-item">
						<router-link class="nav-link" to="/members">委員名單</router-link>
					</li>
					<li class="nav-item">
						<router-link class="nav-link" to="/rules">社區規章</router-link>
					</li>
					<li class="nav-item">
						<router-link class="nav-link" to="/events">大事記</router-link>
					</li>
					<li class="nav-item">
						<router-link class="nav-link" to="/records">會議記錄</router-link>
					</li>
					<li class="nav-item">
						<router-link class="nav-link" to="/facilities" :class="{ disabled: isFacilitiesDisabled }">公共設施</router-link>
					</li>
					<li class="nav-item">
						<router-link class="nav-link" to="/voting" :class="{ disabled: isVotingDisabled }">🗳 電子投票</router-link>
					</li>
				</ul>
				<ul class="navbar-nav ms-auto">
					<li class="nav-item">
						<span class="navbar-text text-light small opacity-75">{{ version }}</span>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>

<script>
	import { Collapse } from 'bootstrap';
	import { version } from '../../package.json';
	export default {
		name: 'AppNavbar',
		data() {
			return {
				version,
				subtitle: '',
				isFacilitiesDisabled: false, // 根据实际情况设置
				isVotingDisabled: true, // 暫時禁用電子投票功能
			};
		},
		created() {
			this.setSubtitle(this.$route.path);
			this.$router.beforeEach((to, from, next) => {
				this.setSubtitle(to.path);
				next();
			});
		},
		mounted() {
			// 手動初始化 Bootstrap Collapse
			setTimeout(() => {
				const navbarCollapse = document.getElementById('navbarNav');
				const toggleButton = document.querySelector('.navbar-toggler');

				if (navbarCollapse && toggleButton) {
					// 初始化 Collapse 實例
					const collapseInstance = new Collapse(navbarCollapse, {
						toggle: false
					});

					// 綁定按鈕點擊事件
					toggleButton.addEventListener('click', () => {
						collapseInstance.toggle();
					});
				}
			}, 100);
		},
		methods: {
			setSubtitle(path) {
				switch (path) {
					case '/welcome':
						this.subtitle = '';
						break;
					case '/members':
						this.subtitle = '委員名單';
						break;
					case '/rules':
						this.subtitle = '社區規章';
						break;
					case '/events':
						this.subtitle = '大事記';
						break;
					case '/records':
						this.subtitle = '會議記錄';
						break;
					case '/facilities':
						this.subtitle = '公共設施';
						break;
					case '/voting':
						this.subtitle = '電子投票';
						break;
					default:
						// 處理動態路由
						if (path.startsWith('/voting/')) {
							this.subtitle = '投票詳情';
						} else {
							this.subtitle = ''; // 當路徑不匹配時無副標題
						}
				}
			},
		},
	};
</script>

<style scoped>
	/* 選中的導航項目樣式 */
	.nav-link.router-link-active {
		background-color: rgba(255, 255, 255, 0.1) !important;
		border-radius: 6px;
		font-weight: 600;
		border-bottom: 3px solid #007bff;
		padding-bottom: 5px !important;
		color: #ffffff !important;
		position: relative;
	}

	/* hover 效果 */
	.nav-link:hover {
		background-color: rgba(255, 255, 255, 0.05);
		border-radius: 6px;
		transition: all 0.3s ease;
	}

	/* 為選中項目添加小圓點 */
	.nav-link.router-link-active::before {
		content: '●';
		color: #007bff;
		margin-right: 6px;
		font-size: 8px;
		vertical-align: middle;
	}

	/* disabled 樣式 */
	.nav-link.disabled {
		opacity: 0.5;
		cursor: not-allowed;
		pointer-events: none;
	}

	.nav-link.disabled:hover {
		background-color: transparent !important;
	}

	@media (max-width: 768px) {
		nav ul {
			flex-direction: column;
		}
		
		/* 手機版選中樣式調整 */
		.nav-link.router-link-active {
			border-bottom: none;
			border-left: 4px solid #007bff;
			border-radius: 0 6px 6px 0;
			padding-left: 12px !important;
		}
	}

	.nav-bar {
		z-index: 2;
	}
</style>
