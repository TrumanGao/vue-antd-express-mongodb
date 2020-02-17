<template>
	<div class="addcelebrity-page">

		<div class="addcelebrity-title">添加影人</div>

		<a-form id="addcelebrity-form" :form="form" @submit="addCelebrity">

			<a-form-item v-bind="formItemLayout" label="影人名称">
				<a-input v-decorator="['name', {rules: [{ required: true, message: '请输入影人名称', }]}]" />
			</a-form-item>

			<a-form-item v-bind="formItemLayout" label="影人原名">
				<a-input v-decorator="['privateName']" />
			</a-form-item>

			<a-form-item v-bind="formItemLayout" label="性别">
				<a-radio-group name="radioGroup" v-decorator="['gender', {initialValue: 1}]">
					<a-radio :value="1">男</a-radio>
					<a-radio :value="2">女</a-radio>
				</a-radio-group>
			</a-form-item>

			<a-form-item v-bind="formItemLayout" label="国籍">
				<a-input placeholder="请输入国籍" v-decorator="['nationality']" />
			</a-form-item>

			<a-form-item v-bind="formItemLayout" label="出生日期">
				<a-date-picker v-decorator="['birthday', {rules: [{ type: 'object'}]}]" />
			</a-form-item>

			<a-form-item v-bind="formItemLayout" label="出生地">
				<a-input v-decorator="['birthplace']" />
			</a-form-item>

			<a-form-item v-bind="formItemLayout" label="豆瓣id">
				<a-input v-decorator="['celebrityId', {rules: [{required: true, message: '请输入豆瓣id'}]}]" />
			</a-form-item>

			<a-form-item v-bind="formItemLayout" label="上传图片">
				<a-upload :action="$axios.defaults.baseURL + '/celebrity/picture'" listType="picture-card" :multiple="true"
				 :remove="handleRemove" v-decorator="['fileList', {valuePropName: 'fileList', getValueFromEvent: normPictures,}]"
				 @preview="handlePreview">
					<div v-if="fileList.length <= 5">
						<a-icon type="plus" />
					</div>
				</a-upload>
				<a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
					<img alt="example" style="width: 100%" :src="previewImage" />
				</a-modal>
			</a-form-item>

			<a-button class="form-submit-btn" type="primary" @click="addCelebrity">提交</a-button>
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
			addCelebrity(e) { // 提交影人
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
						values.birthday = values.birthday.format('YYYY-MM-DD')
						for(let i in values){
							if(typeof(values[i])=='string'){
								values[i] = values[i].trim()
							}
						}
						this.$axios
							.post("/celebrity", values).then(res => {
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
	.addcelebrity-title {
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
