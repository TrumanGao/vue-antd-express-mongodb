<template>
	<div class="personal-page">
		<div class="upload-wrap">
			<a-upload :action="$axios.defaults.baseURL + '/user/avatar'" :headers="uploadHeaders" listType="picture-card"
			 :fileList="fileList" :remove="handleRemove" @preview="handlePreview" @change="handleChange">
				<div v-if="!fileList.length > 0">
					<a-icon type="plus" />
					<div class="ant-upload-text">点击上传头像</div>
				</div>
			</a-upload>
			<a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
				<img alt="example" style="width: 100%" :src="previewImage" />
			</a-modal>
		</div>
		<div>用户名：{{$store.state.userInfo.username}}</div>
		<div>性别：{{$store.state.userInfo.gender}}</div>
		<div>生日：{{$store.state.userInfo.birthday}}</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				uploadHeaders: {
					TOKEN: this.$store.state.token
				},
				previewVisible: false,
				previewImage: '',
				fileList: [],
			}
		},
		created() {
			if (this.$store.state.userInfo.avatar) {
				this.fileList = [{
					uid: '-1', // 文件唯一标识，建议设置为负数，防止和内部产生的 id 冲突
					name: this.$store.state.userInfo.avatar.replace('/pictures/user/', ''), // 文件名
					url: this.$axios.defaults.baseURL + this.$store.state.userInfo.avatar,
					thumbUrl: this.$axios.defaults.baseURL + this.$store.state.userInfo.avatar,
				}]
			}
		},
		methods: {
			// 获取用户信息
			getUserInfo() {
				// 获取用户信息
				this.$axios.get('/user').then(({
					data
				}) => {
					if (data.code == 200) {
						localStorage.setItem('userInfo', JSON.stringify(data.data));
						this.$store.commit('setUserInfo', data.data)
					} else {
						this.$message.error(data.message)
					}
				})
			},
			// 删除用户头像
			handleRemove(file) {
				console.log('删除图片', file)
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
							this.getUserInfo()
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
				if (file.status === 'done') {
					this.fileList.forEach(item => {
						if (item.status == 'done' && item.response && item.response.code == 200) {
							item.name = item.response.data.replace('/pictures/user/', '')
							item.url = this.$axios.defaults.baseURL + item.response.data
							item.thumbUrl = this.$axios.defaults.baseURL + item.response.data
						}
					})

					this.getUserInfo() // 重新拉取用户信息

					this.$message.success(file.response.message || '头像上传成功')
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
		}
	}
</script>

<style scoped>
	.upload-wrap {
		height: 310px;
		overflow: hidden;
	}

	/deep/ .ant-upload-select-picture-card,
	/deep/ .ant-upload-list-item {
		width: 300px;
		height: 300px;
	}

	/deep/ .anticon-eye-o,
	/deep/ .anticon-delete {
		font-size: 30px !important;
		width: 40px !important;
	}
</style>
