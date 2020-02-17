<template>
	<div class="history-page">
		<div class="history-timeline-wrap">
			<div>
				<a-timeline mode="alternate">
					<a-timeline-item>早期电影</a-timeline-item>
					<a-timeline-item color="green">
						<div>1112</div>
						<div>13212312</div>
					</a-timeline-item>
					<a-timeline-item>
						<a-icon slot="dot" type="clock-circle-o" style="font-size: 16px;" />
						Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
						aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
					</a-timeline-item>
					<a-timeline-item color="red">Network problems being solved 2015-09-01</a-timeline-item>
					<a-timeline-item>Create a services site 2015-09-01</a-timeline-item>
					<a-timeline-item>
						<a-icon slot="dot" type="clock-circle-o" style="font-size: 16px;" />
						Technical testing 2015-09-01
					</a-timeline-item>
				</a-timeline>
			</div>
			<div>

				<a-timeline mode="alternate">
					<a-timeline-item>早期电影</a-timeline-item>
					<a-timeline-item color="green" style="display: flex; ">
						<div>1112</div>
						<div>13212312</div>
					</a-timeline-item>
					<a-timeline-item>
						<a-icon slot="dot" type="clock-circle-o" style="font-size: 16px;" />
						Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
						aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
					</a-timeline-item>
					<a-timeline-item color="red">Network problems being solved 2015-09-01</a-timeline-item>
					<a-timeline-item>Create a services site 2015-09-01</a-timeline-item>
					<a-timeline-item>
						<a-icon slot="dot" type="clock-circle-o" style="font-size: 16px;" />
						Technical testing 2015-09-01
					</a-timeline-item>
				</a-timeline>
			</div>

		</div>


	</div>
</template>

<script>
	export default {
		data() {
			return {}
		},
		created() {},
		methods: {}
	}
</script>

<style scoped>
	.history-page {}

	.history-timeline-wrap {
		display: flex;
	}
</style>
