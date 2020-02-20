<template>
	<div class="register-login-component" :class="{'hide-cover': !isShowComponent, 'show-cover': $store.state.isRegisterLogin}"
	 @click="closeRegisterLogin">
		<div @click.stop class="register-login-main" :class="{'hide-main': !isShowComponent, 'show-main': $store.state.isRegisterLogin}">
			<!-- <a-icon type="close" class="register-login-close" @click="closeRegisterLogin" /> -->
			<div class="register-login-tab">
				<div :class="{'tab-item': true, 'tab-item-current': $store.state.registerLoginType == 1}" @click="changeType(1)">登录</div>
				<div :class="{'tab-item': true, 'tab-item-current': $store.state.registerLoginType == 2}" @click="changeType(2)">注册</div>
				<div :class="{'tab-bottom': true, 'tab-bottom-login': $store.state.registerLoginType == 1, 'tab-bottom-register': $store.state.registerLoginType == 2}"></div>
			</div>

			<div class="register-login-content" v-if="$store.state.registerLoginType == 1">
				<a-form class="register-login-form" :form="formLogin" @submit="submitLogin" v-if="isShowComponent">
					<a-form-item>
						<a-input size="large" placeholder="请输入用户名" v-decorator="['username',{rules: [{ required: true, message: '请输入用户名' }]}]">
							<a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
						</a-input>
					</a-form-item>
					<a-form-item>
						<a-input size="large" type="password" placeholder="请输入登录密码" v-decorator="['password',{rules: [{ required: true, message: '请输入登录密码' }]}]">
							<a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
						</a-input>
					</a-form-item>
					<div class="form-control">
						<a-button size="large" class="form-btn" @click="closeRegisterLogin">取消</a-button>
						<a-button size="large" class="form-btn" type="primary" @click="submitLogin">登录</a-button>
					</div>
				</a-form>
			</div>

			<div class="register-login-content" v-if="$store.state.registerLoginType == 2">
				<a-form class="register-login-form" :form="formRegister" @submit="handleRegister" v-if="isShowComponent">
					<a-form-item>
						<a-input size="large" placeholder="请输入用户名" v-decorator="['username',{rules: [{ required: true, message: '请输入用户名' }]}]">
							<a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
						</a-input>
					</a-form-item>
					<a-form-item>
						<a-input size="large" type="password" placeholder="请输入登录密码" v-decorator="['password',{rules: [{ required: true, message: '请输入登录密码' }]}]">
							<a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
						</a-input>
					</a-form-item>
					<div class="form-control">
						<a-button size="large" class="form-btn" @click="closeRegisterLogin">取消</a-button>
						<a-button size="large" class="form-btn" type="primary" @click="handleRegister">注册</a-button>
					</div>
				</a-form>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				isShowComponent: true,
				formLogin: this.$form.createForm(this),
				formRegister: this.$form.createForm(this),
			}
		},
		mounted() {},
		methods: {
			closeRegisterLogin() {
				this.isShowComponent = false
				setTimeout(() => {
					this.$store.commit('setIsRegisterLogin', false)
				}, 300)
			},
			changeType(type) {
				this.$store.commit('setRegisterLoginType', type)
			},
			submitLogin() { // 登录
				this.formLogin.validateFields(
					(err, values) => {
						if (!err) {
							this.handleLogin(values)
						}
					},
				);
			},
			handleLogin(values) { // 登录
				this.$axios.post('/user/login', values).then(({
					data
				}) => {
					if (data.code == 200) {
						// 本地存储token，用于赋值给axios请求头。配置于axios拦截器
						localStorage.setItem('token', data.data);
						this.$store.commit('setToken', data.data)

						this.$message.success(data.message || '登录成功')
						this.$axios.get('/user').then(({ // 获取用户信息
							data
						}) => {
							if (data.code == 200) {
								this.$store.commit('setIsRegisterLogin', false)
								localStorage.setItem('userInfo', JSON.stringify(data.data));
								this.$store.commit('setUserInfo', data.data)
							} else {
								this.$message.error(data.message)
							}
						})
					} else {
						this.$message.error(data.message || '登录失败')
					}
				})
			},
			handleRegister() { // 注册
				this.formRegister.validateFields(
					(err, values) => {
						if (!err) {
							this.$axios.post('/user/register', values).then(({
								data
							}) => {
								if (data.code == 200) {
									// this.$message.success(data.message || '注册成功')
									this.handleLogin(values)
								} else {
									this.$message.error(data.message || '注册失败')
								}
							})
						}
					},
				);
			},
		}
	}
</script>

<style scoped>
	/* 遮罩层动画 */
	@keyframes cover-fade-in {
		from {
			opacity: 0;
		}

		to {
			opacity: 1;
		}
	}

	.show-cover {
		animation: cover-fade-in 0.3s;
	}

	@keyframes cover-fade-out {
		from {
			opacity: 1;
		}

		to {
			opacity: 0;
		}
	}

	.hide-cover {
		animation: cover-fade-out 0.3s;
	}

	/* 弹框动画 */
	@keyframes main-fade-in {
		from {
			width: 0;
			min-height: 0;
			height: 0;
		}

		to {
			width: 520px;
			min-height: 200px;
		}
	}

	.show-main {
		animation: main-fade-in 0.3s;
	}

	@keyframes main-fade-out {
		from {
			width: 520px;
			min-height: 200px;
		}

		to {
			width: 0;
			height: 0;
			min-height: 0;
		}
	}

	.hide-main {
		animation: main-fade-out 0.3s;
	}

	.register-login-component {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
		background-color: rgba(0, 0, 0, 0.65);
		z-index: 1000;
	}

	.register-login-main {
		overflow: hidden;
		position: fixed;
		top: 50%;
		-webkit-transform: translateY(-50%);
		transform: translateY(-50%);
		left: 0;
		right: 0;
		margin: auto;
		width: 520px;
		min-height: 200px;
		background-color: #FFFFFF;
		border-radius: 4px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	}

	/* 	.register-login-close {
		width: 56px;
		height: 56px;
		line-height: 56px;
		position: absolute;
		font-size: 16px;
		top: 0px;
		right: 0px;
		cursor: pointer;
		color: rgba(0, 0, 0, 0.45);
		z-index: 1000;
	}

	.register-login-close:hover {
		color: rgba(0, 0, 0, 0.65);
	} */

	.register-login-tab {
		height: 56px;
		display: flex;
		justify-content: space-between;
		text-align: center;
		padding-top: 10px;
		border-bottom: 1px solid rgb(232, 232, 232);
		position: relative;
	}

	.tab-item {
		flex: 1;
		font-size: 20px;
		padding-bottom: 10px;
		cursor: pointer;
	}

	.tab-item-current {
		font-weight: 500;
		color: #1890ff;
	}

	.tab-bottom {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 50%;
		height: 2px;
		background-color: #1890ff;
	}

	.tab-bottom-login {
		transform: translate(0);
		transition: transform 0.3s ease;
	}

	.tab-bottom-register {
		transform: translate(100%);
		transition: transform 0.3s ease;
	}

	.register-login-content {
		padding: 40px 60px;
	}

	.form-control {
		display: flex;
		justify-content: space-between;
		padding-top: 16px;
	}

	.form-btn {
		width: 45%;
	}
</style>
