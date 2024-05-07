<template>
	<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
		<div class="container-fluid">
			<router-link class="navbar-brand" to="/welcome">波爾多 - 樂菲莊園</router-link>
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
						<router-link class="nav-link" to="/facilities">公共設施</router-link>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>

<script>
	export default {
		name: 'AppNavbar',
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
