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
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
	}
</style>
