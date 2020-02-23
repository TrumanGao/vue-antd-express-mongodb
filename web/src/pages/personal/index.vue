<template>
	<div class="personal-page">
		<div class="upload-wrap">
			<a-upload :action="$axios.defaults.baseURL + '/user/avatar'" :headers="uploadHeaders" listType="picture-card"
			 :fileList="fileList" :remove="handleRemove" @preview="handlePreview" @change="handleChange">
				<div v-if="!fileList.length > 0">
					<a-icon type="plus" />
					<div>点击上传头像</div>
				</div>
			</a-upload>
			<a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
				<img alt="example" style="width: 100%" :src="previewImage" />
			</a-modal>
		</div>

		<a-form class="personal-form" :form="form" @submit="editUserInfo">
			<a-form-item v-bind="formItemLayout" label="用户名">
				<a-input v-decorator="['username', {initialValue: userInfo.username}, {rules: [{required: true, message: '请输入用户名', }]}]" />
			</a-form-item>
			<a-form-item v-bind="formItemLayout" label="手机号">
				<a-input v-decorator="['mobile', {initialValue: userInfo.mobile}]" />
			</a-form-item>
			<a-form-item v-bind="formItemLayout" label="邮箱">
				<a-input v-decorator="['email', {initialValue: userInfo.email}, {rules: [{type: 'email', message: '邮箱格式不正确'}]}]" />
			</a-form-item>
			<a-form-item v-bind="formItemLayout" label="真实姓名">
				<a-input v-decorator="['realname', {initialValue: userInfo.realname}]" />
			</a-form-item>
			<a-form-item v-bind="formItemLayout" label="性别">
				<a-radio-group name="radioGroup" v-decorator="['gender', {initialValue: userInfo.gender}]">
					<a-radio :value="1">男</a-radio>
					<a-radio :value="2">女</a-radio>
					<a-radio :value="3">保密</a-radio>
				</a-radio-group>
			</a-form-item>

			<a-form-item v-bind="formItemLayout" label="出生日期">
				<a-date-picker v-decorator="['birthday', {initialValue: moment(userInfo.birthday)}, {rules: [{ type: 'object'}]}]" />
			</a-form-item>

			<a-form-item v-bind="formItemLayout" label="国籍">
				<a-input placeholder="请输入国籍" v-decorator="['nationality', {initialValue: userInfo.nationality}]" />
			</a-form-item>

			<a-form-item v-bind="formItemLayout" label="常居地">
				<a-input v-decorator="['usual_address', {initialValue: userInfo.usual_address}]" />
			</a-form-item>

			<a-button class="form-submit-btn" type="primary" @click="editUserInfo">提交</a-button>
		</a-form>
	</div>
</template>

<script>
	import moment from 'moment'
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
				uploadHeaders: {
					TOKEN: this.$store.state.token
				},
				previewVisible: false,
				previewImage: '',
				fileList: [],
			}
		},
		computed: {
			userInfo() {
				return this.$store.state.userInfo
			},
			avatar() {
				return this.$store.state.userInfo.avatar
			}
		},
		watch: {
			avatar(val) {
				if (val) {
					this.fileList = [{
						uid: '-1', // 文件唯一标识，建议设置为负数，防止和内部产生的 id 冲突
						name: val.replace('/pictures/user/', ''), // 文件名
						url: this.$axios.defaults.baseURL + val,
						thumbUrl: this.$axios.defaults.baseURL + val,
					}]
				}
			},
			userInfo(val) {
				let userInfo = {
					username: val.username,
					mobile: val.mobile,
					email: val.email,
					realname: val.realname,
					gender: val.gender,
					birthday: moment(val.birthday), // 把时间字符串处理成moment对象，用于antd组件渲染
					nationality: val.nationality,
					usual_address: val.usual_address,
				}
				this.form.setFieldsValue(userInfo);
			}
		},
		beforeCreate() {
			this.form = this.$form.createForm(this);
		},
		created() {
			if (this.avatar) {
				this.fileList = [{
					uid: '-1', // 文件唯一标识，建议设置为负数，防止和内部产生的 id 冲突
					name: this.avatar.replace('/pictures/user/', ''), // 文件名
					url: this.$axios.defaults.baseURL + this.avatar,
					thumbUrl: this.$axios.defaults.baseURL + this.avatar,
				}]
			}
		},
		methods: {
			// 编辑用户信息
			editUserInfo() {
				this.form.validateFields((err, values) => {
					if (!err) {
						console.log('通过验证', values);
						values._id = this.$store.state.userInfo._id
						this.$axios.put('/user', values).then(({
							data
						}) => {
							if (data.code == 200) {
								this.$message.success(data.message || '编辑用户信息成功')
								this.$store.dispatch('getUserInfo', this).then(data => {
									console.log('获取用户信息成功', data)
								}).catch(err => {
									console.error('获取用户信息失败', err)
								})
							} else {
								this.$message.error(data.message || '编辑用户信息失败')
							}
						})
					}
				})
			},
			// 删除用户头像
			handleRemove(file) {
				// console.log('删除图片', file)
				return new Promise((resolve, reject) => {
					this.$axios.delete('/user/avatar', {
						params: {
							name: file.name
						}
					}).then(({
						data
					}) => {
						if (data.code == 200) {
							this.$message.success(data.message || '删除图片成功')
							this.$store.dispatch('getUserInfo', this).then(res => {
								console.log('获取用户信息成功', res)
							}).catch(err => {
								console.error('获取用户信息失败', err)
							})
							resolve()
						} else {
							this.$message.error(data.message || '删除图片失败')
							reject()
						}
					})
				})
			},
			handleChange({
				file,
				fileList
			}) {
				this.fileList = fileList
				console.log('上传状态变化', file)
				if (file.status == 'done' && file.response && file.response.code == 200) {
					this.fileList.forEach(item => {
						if (item.status == 'done' && item.response && item.response.code == 200) {
							item.name = item.response.data.replace('/pictures/user/', '')
							item.url = this.$axios.defaults.baseURL + item.response.data
							item.thumbUrl = this.$axios.defaults.baseURL + item.response.data
						}
					})

					this.$store.dispatch('getUserInfo', this).then(res => {
						console.log('获取用户信息成功', res)
					}).catch(err => {
						console.error('获取用户信息失败', err)
					}) // 重新拉取用户信息
					this.$message.success(file.response.message || '头像上传成功')
				} else if (file.response && file.response.code == 1000) {
					this.$message.error(file.response.message || '头像上传失败')
					this.$router.push('/')
					localStorage.removeItem('token')
					this.$store.commit('setToken', "")
					this.$store.commit('setUserInfo', "")
				} else if (file.response && file.response.code != 200) {
					this.$message.error(file.response.message || '头像上传失败')
					this.fileList = []
				}
			},
			handleCancel() {
				this.previewVisible = false
			},
			handlePreview(file) {
				console.log('预览图片', file)
				this.previewImage = file.url || file.thumbUrl
				this.previewVisible = true
			},
			moment,
		}
	}
</script>

<style scoped>
	.upload-wrap {
		height: 170px;
		overflow: hidden;
		display: flex;
		justify-content: center;
	}

	/deep/ .ant-upload-select-picture-card,
	/deep/ .ant-upload-list-item {
		width: 150px;
		height: 150px;
		border-radius: 50%;
		padding: 0;
		overflow: hidden;
	}

	/deep/ .ant-upload-list-item-info>span {
		height: 100%;
	}

	/deep/ .anticon-eye-o,
	/deep/ .anticon-delete {
		font-size: 20px !important;
		width: 30px !important;
	}

	.form-submit-btn {
		display: block;
		width: 100px;
		margin: 0 auto;
	}
</style>
