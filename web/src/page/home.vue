<template>
	<div class="home-page">

		<div class="home-title">添加电影</div>

		<a-form id="home-form" :form="form" @submit="addMovie">

			<a-form-item v-bind="formItemLayout" label="电影名称">
				<a-input v-decorator="['name', {rules: [{ required: true, message: '请输入电影名称', }]}]" />
			</a-form-item>

			<a-form-item v-bind="formItemLayout" label="电影原名">
				<a-input v-decorator="['privateName']" />
			</a-form-item>

			<a-form-item v-bind="formItemLayout" label="导演">
				<a-input placeholder="请输入导演名称，多个用空格分隔" v-decorator="['director']" />
			</a-form-item>

			<a-form-item v-bind="formItemLayout" label="编剧">
				<a-input placeholder="请输入编剧名称，多个用空格分隔" v-decorator="['writer']" />
			</a-form-item>

			<a-form-item v-bind="formItemLayout" label="主演">
				<a-input placeholder="请输入主演名称，多个用空格分隔" v-decorator="['cast']" />
			</a-form-item>

			<a-form-item v-bind="formItemLayout" label="类型">
				<a-select mode="multiple" placeholder="请选择影片类型" :allowClear="true" v-decorator="['genre', {rules: [{required: true, message: '请选择影片类型'}]}]">
					<a-select-option :value="item" :key="item" v-for="item in genreList">{{item}}</a-select-option>
				</a-select>
			</a-form-item>

			<a-form-item v-bind="formItemLayout" label="制片国家/地区">
				<a-input placeholder="请输入制片国家/地区，多个用空格分隔" v-decorator="['country']" />
			</a-form-item>

			<a-form-item v-bind="formItemLayout" label="上映年份">
				<a-input v-decorator="['release_year', {rules: [{required: true,  message: '请输入上映年份'}]}]" />
			</a-form-item>

			<a-form-item v-bind="formItemLayout" label="豆瓣id">
				<a-input v-decorator="['doubanId', {rules: [{required: true, message: '请输入豆瓣id'}]}]" />
			</a-form-item>

			<a-form-item v-bind="formItemLayout" label="上传图片">
				<a-upload :action="$axios.defaults.baseURL + '/movie/picture/add'" listType="picture-card" :multiple="true" :remove="handleRemove"
				 v-decorator="['fileList', {valuePropName: 'fileList', getValueFromEvent: normPictures,}]" @preview="handlePreview">
					<div v-if="fileList.length <= 5">
						<a-icon type="plus" />
					</div>
				</a-upload>
				<a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
					<img alt="example" style="width: 100%" :src="previewImage" />
				</a-modal>
			</a-form-item>

			<a-button class="form-submit-btn" type="primary" @click="addMovie">提交</a-button>
		</a-form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				formItemLayout: {
					labelCol: {
						span: 6
					},
					wrapperCol: {
						span: 14
					},
				},
				genreList: ['剧情', '喜剧', '动作', '爱情', '科幻', '动画', '悬疑', '惊悚', '恐怖', '犯罪', '同性', '音乐', '歌舞', '传记', '历史', '战争',
					'西部', '奇幻', '冒险', '灾难', '武侠', '情色', '纪录'
				],
				// 上传图片
				previewVisible: false, // 预览图片显示隐藏
				previewImage: '', // 预览图片地址
				fileList: [], // 上传图片列表
			};
		},
		beforeCreate() {
			this.form = this.$form.createForm(this);
		},
		methods: {
			// 上传图片
			handleRemove(file) { // 删除图片
				console.log('删除图片', file)
			},
			handlePreview(file) { // 预览图片
				this.previewImage = file.url || file.thumbUrl
				this.previewVisible = true
			},
			handleCancel() { // 关闭预览
				this.previewImage = ""
				this.previewVisible = false
			},
			normPictures(e) { // 把 change事件的参数转化为控件的值
				console.log('表单的图片数据', JSON.parse(JSON.stringify(e)))
				if (Array.isArray(e)) {
					return e;
				} else {
					let file = e.file
					let fileList = e.fileList.slice(-5)
					if (file.status == 'done' && file.response && file.response.code == 200) {
						fileList.forEach(item => {
							if (item.status == 'done' && item.response && item.response.code == 200) {
								item.url = this.$axios.defaults.baseURL + item.response.data
								item.thumbUrl = this.$axios.defaults.baseURL + item.response.data
								item.resUrl = item.response.data
							}
						})
					}
					console.log('上传成功', JSON.parse(JSON.stringify(fileList)))
					return fileList;
				}
			},
			addMovie(e) { // 提交电影
				e.preventDefault();
				this.form.validateFields((err, values) => {
					if (!err) {
						console.log('通过验证', values);
						values.fileList = values.fileList ? JSON.stringify(values.fileList.map(item => {
							return {
								uid: item.uid, // 文件唯一标识，建议设置为负数，防止和内部产生的 id 冲突
								size: item.size,
								type: item.type,
								name: item.name, // 文件名
								url: item.resUrl, // 文件地址
							}
						})) : ""
						this.$axios
							.post("/movie/subject/add", values).then(res => {
								console.log('添加电影返回结果', res)
								if (res.data.code == 200) {
									this.$message.success(res.data.message);
									this.form.resetFields();
								} else {
									this.$message.error(res.data.message)
								}
							});
					}
				});
			},
		}
	};
</script>

<style scoped>
	.home-title {
		text-align: center;
		font-size: 20px;
		line-height: 64px;
	}

	.form-submit-btn {
		display: block;
		width: 100px;
		margin: 0 auto;
	}
</style>
