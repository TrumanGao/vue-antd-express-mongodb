<template>
	<div class="ranking-page">
		<h3>华山论剑</h3>
		<a-table :columns="columns" :rowKey="record => record._id" :dataSource="movieList" :loading="loading">
			<a slot="doubanId" slot-scope="doubanId" :href="'https://movie.douban.com/subject/' + doubanId">doubanId</a>
		</a-table>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				movieList: [],
				loading: false,
				columns: [{
					title: '中文名',
					dataIndex: 'name',
					sorter: true,
				}, {
					title: '原名',
					dataIndex: 'privateName',
					sorter: true,
				}, {
					title: '导演',
					dataIndex: 'director',
					sorter: true,
				}, {
					title: '编剧',
					dataIndex: 'writer',
				}, {
					title: '主演',
					dataIndex: 'cast',
					sorter: true,
				}, {
					title: '类型',
					dataIndex: 'genre',
				}, {
					title: '制片国家/地区',
					dataIndex: 'country',
					sorter: true,
				}, {
					title: '语言',
					dataIndex: 'language',
					sorter: true,
				}, {
					title: '评分',
					dataIndex: 'score',
					sorter: true,
				}, {
					title: '豆瓣链接',
					dataIndex: 'doubanId',
					scopedSlots: {
						customRender: 'doubanId'
					},
				}, ],
			}
		},
		created() {
			this.getMovieList()
		},
		methods: {
			getMovieList() {
				this.loading = true
				this.$axios.get("/movie").then(res => {
					if (res.status == 200) {

						res.data.forEach(item => {
							item.doubanId = '1293899'
						})

						this.movieList = res.data
					}
					this.loading = false
					console.log('查询到的电影列表', this.movieList)
				});
			},
		}
	}
</script>

<style scoped>
</style>
