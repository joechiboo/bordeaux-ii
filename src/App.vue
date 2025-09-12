<template>
	<Home />
</template>

<script>
	import Home from './components/HomePage.vue';

	export default {
		name: 'App',
		components: {
			Home,
		},
	};
</script>

<style>
	* {
		box-sizing: border-box;
	}

	html, body {
		margin: 0;
		padding: 0;
		overflow-x: hidden;
		width: 100%;
		max-width: 100%;
	}

	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		width: 100%;
		max-width: 100%;
		overflow-x: hidden;
	}
</style>
