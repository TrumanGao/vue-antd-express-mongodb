<template>
	<div class="ranking-page">
		<div class="ranking-search">
			<a-input-search class="search-input" v-model="searchQuery.keyword" placeholder="请输入电影名称 / 影人名称" @search="getMovieList"
			 enterButton="搜索" />
		</div>
		<a-table bordered :rowKey="record => record.subjectId" :columns="columns" :dataSource="movieList" :pagination="pagination" :loading="loading"
		 @change="handleTableChange">
			<!-- slot: 标签上使用数据，与 columns.scopedSlots.customRender 一致 -->
			<!-- slot-scope：插值使用数据 -->
			<router-link slot="name" slot-scope="name, record" :to="'/subject/' + record.subjectId">{{name}}</router-link>
			<div slot="release_year" slot-scope="release_year">{{release_year}}</div>
			
			<template slot="director" slot-scope="text, record">
				<a-input v-if="record.isEdit" v-model="itemData.director" />
				<template v-else>
					<span v-for="(item, index) in record.director" :key="index">
						<span v-if="record.director.length > 1 && index != 0"> / </span>
						<router-link :to="'/celebrity/' + item">{{item}}</router-link>
					</span>
				</template>
			</template>
			<div slot="cast" slot-scope="text, record">
				<span v-for="(item, index) in record.cast" :key="index">
					<span v-if="record.cast.length > 1 && index != 0"> / </span>
					<router-link :to="'/celebrity/' + item">{{item}}</router-link>
				</span>
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
			<a slot="subjectId" slot-scope="subjectId" target="_blank" :href="'https://movie.douban.com/subject/' + subjectId">{{subjectId}}</a>
			<div slot="action" slot-scope="text, record">
				<div>
					<span v-if="record.isEdit">
						<a class="table-edit-btn" @click="saveEdit(record)">保存</a>
						<a @click="cancelEdit(record.subjectId)">取消</a>
					</span>
					<a v-else @click="editMovie(record.subjectId)">编辑</a>
				</div>
				<div>
					<a-popconfirm title="确定删除吗?" @confirm="deletMovie(record.subjectId)">
						<a>删除</a>
					</a-popconfirm>
				</div>
			</div>
			<!-- 额外展开的行：slot="expandedRowRender" slot-scope="record, index, indent, expanded" -->
			<div slot="expandedRowRender" slot-scope="record">
				<div class="table-expand-item" v-if="record.privateName">原名：
					<router-link :to="'/subject/' + record.subjectId">{{record.privateName}}</router-link>
				</div>
				<div class="table-expand-item" v-if="record.writer && record.writer.length > 0">编剧：
					<span v-for="(item, index) in record.writer" :key="index">
						<span v-if="index != 0"> / </span>
						<router-link :to="'/celebrity/' + item">{{item}}</router-link>
					</span>
				</div>
			</div>
		</a-table>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				searchQuery: {
					keyword: "", // 查询参数
					current: 1,
					pageSize: 5,
					sortField: "",
					sortOrder: 1, // 排序方式，正序1，倒序-1。
					genre: '',
				},
				movieList: [],
				pagination: {
					current: 1,
					pageSize: 5,
					total: 0, // 电影总数
				},
				itemData: {}, // 用于编辑条目
				loading: false,
				columns: [{
						title: '中文名', // 列头显示文字
						dataIndex: 'name', // 列数据在数据项中对应的 key，支持 a.b.c 的嵌套写法
						sorter: true, // 排序函数，本地排序使用一个函数(参考 Array.sort 的 compareFunction)，需要服务端排序可设为 true
						scopedSlots: { // 使用columns时，可以通过该属性配置支持slot-scope的属性
							customRender: 'name', // 生成复杂数据的渲染函数，参数分别为当前行的值，当前行数据，行索引
						}
					},  {
						title: '上映年份',
						dataIndex: 'release_year',
						sorter: true,
						scopedSlots: {
							customRender: 'release_year',
						}
					}, {
						title: '导演',
						dataIndex: 'director',
						scopedSlots: { 
							customRender: 'director', 
						}
					}, {
						title: '主演',
						dataIndex: 'cast',
						scopedSlots: {
							customRender: 'cast',
						}
					}, {
						title: '类型',
						dataIndex: 'genre',
						filters: [{
								text: '剧情',
								value: '剧情',
							},
							{
								text: '喜剧',
								value: '喜剧',
							},
							{
								text: '动作',
								value: '动作',
							},
							{
								text: '爱情',
								value: '爱情',
							},
							{
								text: '科幻',
								value: '科幻',
							},
							{
								text: '动画',
								value: '动画',
							},
							{
								text: '悬疑',
								value: '悬疑',
							},
							{
								text: '惊悚',
								value: '惊悚',
							},
							{
								text: '恐怖',
								value: '恐怖',
							},
							{
								text: '犯罪',
								value: '犯罪',
							},
							{
								text: '同性',
								value: '同性',
							},
							{
								text: '音乐',
								value: '音乐',
							},
							{
								text: '歌舞',
								value: '歌舞',
							},
							{
								text: '传记',
								value: '传记',
							},
							{
								text: '历史',
								value: '历史',
							},
							{
								text: '战争',
								value: '战争',
							},
							{
								text: '西部',
								value: '西部',
							},
							{
								text: '奇幻',
								value: '奇幻',
							},
							{
								text: '冒险',
								value: '冒险',
							},
							{
								text: '灾难',
								value: '灾难',
							},
							{
								text: '武侠',
								value: '武侠',
							},
							{
								text: '情色',
								value: '情色',
							},
							{
								text: '纪录',
								value: '纪录',
							},
						],
						scopedSlots: {
							customRender: 'genre',
						},
						filterMultiple: true,
					},
					{
						title: '制片国家/地区',
						dataIndex: 'country',
						scopedSlots: {
							customRender: 'country',
						},
					},
					{
						title: '豆瓣链接',
						dataIndex: 'subjectId',
						scopedSlots: {
							customRender: 'subjectId'
						}
					},
					{
						title: '操作',
						dataIndex: 'action',
						scopedSlots: {
							customRender: 'action'
						},
					},
				],
			}
		},
		created() {
			this.getMovieList()
		},
		methods: {
			getMovieList() {
				this.loading = true
				this.$axios.get("/movie", {
					params: this.searchQuery
				}).then(({
					data
				}) => {
					if (data.code == 200) {
						this.movieList = data.data.list
						this.pagination.total = data.data.total
						this.pagination.current = this.searchQuery.current
						this.pagination.pageSize = this.searchQuery.pageSize
					} else {
						this.$message.error(data.message || "查询电影失败")
					}
					this.loading = false
					console.log('查询到的电影列表', this.movieList)
				});
			},
			editMovie(id) {
				console.log(id)
				this.movieList.map(item => {
					if (item.subjectId === id) {
						this.$set(item, 'isEdit', true)
						this.itemData = Object.assign(JSON.parse(JSON.stringify(item)), {
							director: item.director.join(' ')
						})
						console.log(JSON.parse(JSON.stringify(this.itemData)))
					}
				})
			},
			cancelEdit(id) {
				const movieList = [...this.movieList]
				movieList.map(item => {
					if (item.subjectId === id) {
						delete item.isEdit
						this.itemData = {}
						// item.director = item.director.split(' ')
					}
				})
				this.movieList = movieList
			},
			saveEdit(record) {
				record = JSON.parse(JSON.stringify(this.itemData))
				record.director = record.director ? record.director.trim().split(' ') : []
				this.$axios.put('/movie', record).then(({
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
			/* 处理表格操作：翻页，筛选，排序 */
			handleTableChange(pagination, filters, sorter) {
				console.log(pagination, filters, sorter);
				this.searchQuery.current = pagination.current
				this.searchQuery.pageSize = pagination.pageSize
				this.searchQuery.genre = filters.genre && filters.genre.length > 0 ? JSON.stringify(filters.genre) : ''
				this.searchQuery.sortField = sorter.field
				this.searchQuery.sortOrder = sorter.order == 'ascend' ? 1 : -1
				this.getMovieList()
			},
			/* 处理表格操作：翻页，筛选，排序 */
			deletMovie(id) {
				this.$axios.delete('/movie/delete', {
					params: {
						subjectId: id
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
	.ranking-search {
		display: flex;
		margin-bottom: 20px;
	}

	.search-input {
		width: 300px;
		margin-right: 10px;
	}


	.table-edit-btn {
		margin-right: 10px;
	}

	.table-expand-item {
		line-height: 2;
	}
</style>
