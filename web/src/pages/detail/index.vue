<template>
	<div>
		电影详情页{{$route.params.id}}
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
