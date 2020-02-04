<template>
	<div class="home-page">
		<h3>鼓瑟吹笙</h3>

		<a-form id="home-form" :form="form" @submit="handleSubmit">

			<a-form-item v-bind="formItemLayout" label="电影名称">
				<a-input v-decorator="['name', {rules: [{ required: true, message: '请输入电影名称', }]}]" />
			</a-form-item>

			<a-form-item v-bind="formItemLayout" label="电影原名">
				<a-input v-decorator="['privateName']" />
			</a-form-item>

			<a-form-item v-bind="formItemLayout" label="导演">
				<a-input v-decorator="['director', {rules: [{required: true, message: '请输入导演'}]}]" />
			</a-form-item>

			<a-form-item v-bind="formItemLayout" label="编剧">
				<a-input v-decorator="['writer']" />
			</a-form-item>

			<a-form-item v-bind="formItemLayout" label="主演">
				<a-input v-decorator="['cast', {rules: [{required: true, message: '请输入主演'}]}]" />
			</a-form-item>

			<a-form-item v-bind="formItemLayout" label="类型">
				<a-select @change="selectGenre" mode="multiple" placeholder="请选择影片类型" :allowClear="true" v-decorator="['genre', {rules: [{required: true, message: '请选择影片类型'}]}]">
					<a-select-option :value="item" :key="item" :disabled="(isAbleAll && item=='全部类型') || (isAllGenre && item!='全部类型')"
					 v-for="item in genreList">{{item}}</a-select-option>
				</a-select>
			</a-form-item>

			<a-form-item v-bind="formItemLayout" label="制片国家/地区">
				<a-input v-decorator="['country', {rules: [{required: true, message: '请输入制片国家/地区'}]}]" />
			</a-form-item>

			<a-form-item v-bind="formItemLayout" label="语言">
				<a-input v-decorator="['language', {rules: [{required: true, message: '请输入语言'}]}]" />
			</a-form-item>

			<a-form-item v-bind="formItemLayout" label="上映年份">
				<a-input v-decorator="['release_year', {rules: [{required: true,  message: '请输入上映年份'}]}]" />
			</a-form-item>

			<a-form-item v-bind="formItemLayout" label="评分">
				<a-rate v-decorator="['rate', {initialValue: 3.5}]" />
			</a-form-item>

			<a-form-item v-bind="formItemLayout" label="豆瓣id">
				<a-input v-decorator="['doubanId', {rules: [{required: true, message: '请输入豆瓣id'}]}]" />
			</a-form-item>

			<a-button class="form-submit-btn" type="primary" @click="handleSubmit">添加电影</a-button>
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
				isAbleAll: false, // 是否可以全选（未选中具体类型）
				isAllGenre: false, // 是否全选类型（选中全选类型）
				genreList: ['全部类型', '剧情', '喜剧', '动作', '爱情', '科幻', '动画', '悬疑', '惊悚', '恐怖', '犯罪', '同性', '音乐', '歌舞', '传记', '历史', '战争',
					'西部', '奇幻', '冒险',
					'灾难', '武侠', '情色', '记录'
				],
			};
		},
		beforeCreate() {
			this.form = this.$form.createForm(this);
		},

		methods: {
			selectGenre(value) { // 选中类型
				console.log(value)
				this.isAbleAll = value.length > 0 && value.indexOf("全部类型") == -1 ? true : false
				this.isAllGenre = value.join('') == ["全部类型"] ? true : false
			},
			handleSubmit(e) {
				e.preventDefault();
				this.form.validateFields((err, values) => {
					if (!err) {
						console.log('通过验证', values);
						this.$axios
							.post("/movie/add", values).then(res => {
								console.log('添加电影返回结果', res)
								this.$message.info("添加电影返回结果：" + res.data);
							});
					}
				});
			},
		}
	};
</script>

<style>
</style>
