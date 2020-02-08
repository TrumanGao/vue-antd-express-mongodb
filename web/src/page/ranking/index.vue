<template>
	<div class="ranking-page">
		<a-table bordered :rowKey="record => record.doubanId" :columns="columns" :dataSource="movieList" :loading="loading">
			<!-- slot: 标签上使用数据，与 columns.scopedSlots.customRender 一致 -->
			<!-- slot-scope：插值使用数据 -->
			<a slot="name" slot-scope="name">{{name}}</a>

			<template slot="director" slot-scope="text, record">
				<a-input v-if="record.isEdit" v-model="itemData.director" />
				<template v-else>
					<a v-for="(item, index) in record.director" :key="index">
						<span v-if="record.director.length > 1 && index != 0"> / </span>{{item}}
					</a>
				</template>
			</template>
			<div slot="cast" slot-scope="text, record">
				<a v-for="(item, index) in record.cast" :key="index">
					<span v-if="record.cast.length > 1 && index != 0"> / </span>{{item}}
				</a>
			</div>
			<div slot="genre" slot-scope="text, record">
				<span class="table-genre-item" v-for="(item, index) in record.genre" :key="index">
					<span v-if="record.genre.length > 1 && index != 0"> / </span>{{item}}
				</span>
			</div>
			<div slot="country" slot-scope="text, record">
				<span class="table-country-item" v-for="(item, index) in record.country" :key="index">
					<span v-if="record.country.length > 1 && index != 0"> / </span>{{item}}
				</span>
			</div>
			<a slot="doubanId" slot-scope="doubanId" target="_blank" :href="'https://movie.douban.com/subject/' + doubanId">{{doubanId}}</a>
			<div slot="action" slot-scope="text, record">
				<div>
					<span v-if="record.isEdit">
						<a class="table-edit-btn" @click="saveEdit(record)">保存</a>
						<a @click="cancelEdit(record.doubanId)">取消</a>
					</span>
					<a v-else @click="editMovie(record.doubanId)">编辑</a>
				</div>
				<div>
					<a-popconfirm title="确定删除吗?" @confirm="deletMovie(text, record.doubanId)">
						<a>删除</a>
					</a-popconfirm>
				</div>
			</div>
			<!-- 额外展开的行：slot="expandedRowRender" slot-scope="record, index, indent, expanded" -->
			<div slot="expandedRowRender" slot-scope="record">
				<div class="table-expand-item" v-if="record.privateName">原名：{{record.privateName}}</div>
				<div class="table-expand-item" v-if="record.release_year">上映年份：{{record.release_year}}</div>
				<div class="table-expand-item" v-if="record.writer && record.writer.length > 0">编剧：
					<a v-for="(item, index) in record.writer" :key="index">
						<span v-if="index != 0"> / </span>{{item}}
					</a>
				</div>
			</div>
		</a-table>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				movieList: [],
				itemData: {}, // 用于编辑条目
				loading: false,
				columns: [{
					title: '中文名', // 列头显示文字
					dataIndex: 'name', // 列数据在数据项中对应的 key，支持 a.b.c 的嵌套写法
					sorter: true, // 排序函数，本地排序使用一个函数(参考 Array.sort 的 compareFunction)，需要服务端排序可设为 true
					scopedSlots: {
						customRender: 'name',
					}
				}, {
					title: '导演',
					dataIndex: 'director',
					sorter: true,
					scopedSlots: {
						customRender: 'director',
					}
				}, {
					title: '主演',
					dataIndex: 'cast',
					sorter: true,
					scopedSlots: { // 使用columns时，可以通过该属性配置支持slot-scope的属性
						customRender: 'cast' // 生成复杂数据的渲染函数，参数分别为当前行的值，当前行数据，行索引
					}
				}, {
					title: '类型',
					dataIndex: 'genre',
					scopedSlots: {
						customRender: 'genre',
					}
				}, {
					title: '制片国家/地区',
					dataIndex: 'country',
					sorter: true,
					scopedSlots: {
						customRender: 'country',
					}
				}, {
					title: '豆瓣链接',
					dataIndex: 'doubanId',
					scopedSlots: { // 使用columns时，可以通过该属性配置支持slot-scope的属性
						customRender: 'doubanId' // 生成复杂数据的渲染函数，参数分别为当前行的值，当前行数据，行索引
					}
				}, {
					title: '操作',
					dataIndex: 'action',
					scopedSlots: {
						customRender: 'action'
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
					if (res.data.code == 200) {
						this.movieList = res.data.data
					} else {
						this.$message.error(res.data.message || "查询电影失败")
					}
					this.loading = false
					console.log('查询到的电影列表', this.movieList)
				});
			},
			editMovie(id) {
				this.movieList.map(item => {
					if (item.doubanId === id) {
						this.$set(item, 'isEdit', true)
						this.itemData = Object.assign(JSON.parse(JSON.stringify(item)), {
							director: item.director.join(' ')
						})
					}
				})
			},
			cancelEdit(id) {
				const movieList = [...this.movieList]
				movieList.map(item => {
					if (item.doubanId === id) {
						delete item.isEdit
						this.itemData = {}
						// item.director = item.director.split(' ')
					}
				})
				this.movieList = movieList
			},
			saveEdit(record) {
				record = JSON.parse(JSON.stringify(this.itemData))
				record.director = record.director ? record.director.split(' ') : []
				this.$axios.post('/movie/subject/edit', record).then(({
					data
				}) => {
					if (data.code == 200) {
						this.$message.success(data.message)
						this.getMovieList()
					} else {
						this.$message.error(data.message)
					}
				})
			},

			deletMovie(text, id) {
				console.log(text, id)
				this.$axios.delete('/movie/subject/delete', {
					params: {
						doubanId: id
						// name: "如父如子"
					}
				}).then(({
					data
				}) => {
					if (data.code == 200) {
						this.$message.success(data.message)
						this.getMovieList()
					} else {
						this.$message.error(data.message)
					}
				})
			},
		}
	}
</script>

<style scoped>
	.table-edit-btn {
		margin-right: 10px;
	}

	.table-expand-item {
		line-height: 2;
	}
</style>
