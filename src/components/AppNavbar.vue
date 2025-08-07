<template>
	<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
		<div class="container-fluid">
			<router-link class="navbar-brand" to="/welcome" @click="collapseNavbar">波爾多 - 樂菲莊園 {{ subtitle }}</router-link>
			<button
				class="navbar-toggler"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#navbarNav"
				aria-controls="navbarNav"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarNav">
				<ul class="navbar-nav">
					<li class="nav-item">
						<router-link class="nav-link" to="/members" @click="collapseNavbar">委員名單</router-link>
					</li>
					<li class="nav-item">
						<router-link class="nav-link" to="/rules" @click="collapseNavbar">社區規章</router-link>
					</li>
					<li class="nav-item">
						<router-link class="nav-link" to="/events" @click="collapseNavbar">大事記</router-link>
					</li>
					<li class="nav-item">
						<router-link class="nav-link" to="/records" @click="collapseNavbar">會議記錄</router-link>
					</li>
					<li class="nav-item">
						<router-link class="nav-link" to="/facilities" @click="collapseNavbar" :class="{ disabled: isFacilitiesDisabled }">公共設施</router-link>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>

<script>
	import { Collapse } from 'bootstrap';
	export default {
		name: 'AppNavbar',
		data() {
			return {
				subtitle: '',
				isFacilitiesDisabled: false, // 根据实际情况设置
			};
		},
		created() {
			this.setSubtitle(this.$route.path);
			this.$router.beforeEach((to, from, next) => {
				this.setSubtitle(to.path);
				next();
			});
		},
		methods: {
			collapseNavbar() {
				const navbarCollapse = document.getElementById('navbarNav');
				const bsCollapse = new Collapse(navbarCollapse, {
					toggle: false,
				});
				bsCollapse.hide();
			},
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
					default:
						this.subtitle = ''; // 當路徑不匹配時無副標題
				}
			},
		},
	};
</script>

<style scoped>
	@media (max-width: 768px) {
		nav ul {
			flex-direction: column;
		}
	}

	.nav-bar {
		z-index: 2;
	}
</style>
