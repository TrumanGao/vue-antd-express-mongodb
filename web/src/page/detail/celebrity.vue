<template>
	<div>
		影人详情页{{$route.params.name}}
	</div>
</template>

<script>
	export default {
		created() {
			console.log(this.$route)
		}
	}
</script>

<style scoped>

</style>
