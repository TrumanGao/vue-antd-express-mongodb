<template>
	<div class="history-page">

		<a-form id="history-form" :form="form">

			<a-form-item v-bind="formItemLayout" label="事件/时期名称">
				<a-input v-decorator="['name', {rules: [{ required: true, message: '请输入事件/时期名称', }]}]" />
			</a-form-item>

			<a-form-item v-bind="formItemLayout" label="开始时间">
				<a-input v-decorator="['start_time']" />
			</a-form-item>
			<a-form-item v-bind="formItemLayout" label="开始电影ID">
				<a-input v-decorator="['start_movie']" />
			</a-form-item>

			<a-form-item v-bind="formItemLayout" label="结束时间">
				<a-input v-decorator="['end_time']" />
			</a-form-item>
			<a-form-item v-bind="formItemLayout" label="结束电影ID">
				<a-input v-decorator="['end_movie']" />
			</a-form-item>

			<a-form-item v-bind="formItemLayout" label="国家/地区">
				<a-input placeholder="请输入国家/地区, 多个用空格隔开" v-decorator="['country']" />
			</a-form-item>

			<a-button class="form-submit-btn" type="primary">提交</a-button>
		</a-form>


		<div>
			<a-timeline class="history-timeline" mode="alternate">
				<a-timeline-item class="timeline-item" @click="showDrawer(1)">
					<h2>电影诞生（1888）</h2>
					<div>路易斯·普林斯（法）：《朗德海花园场景》</div>
				</a-timeline-item>
				<a-timeline-item class="timeline-item" @click="showDrawer(2)">
					<h2>现代电影诞生（1895）</h2>
					<div>卢米埃尔兄弟（法）：《火车进站》《工厂大门》</div>
				</a-timeline-item>
				<a-timeline-item class="timeline-item" @click="showDrawer(3)">
					<h2>好莱坞诞生（1907）</h2>
					<div>弗朗西斯·伯格斯：《基督山伯爵》</div>
				</a-timeline-item>
				<a-timeline-item class="timeline-item" @click="showDrawer(4)">
					<h2>先锋派电影（1917年-1928）</h2>
				</a-timeline-item>
				<a-timeline-item class="timeline-item" @click="showDrawer(5)">
					<h2>好莱坞黄金时段（30年代-50年代）</h2>
					<div>类型片崛起</div>
				</a-timeline-item>
				<a-timeline-item class="timeline-item" @click="showDrawer(6)">
					<h2>意大利新现实主义（1945-50年代中期）</h2>
				</a-timeline-item>
				<a-timeline-item class="timeline-item" @click="showDrawer(7)">
					<h2>法国新浪潮（50年代末-1964）</h2>
					<div>作者电影（新浪潮）</div>
					<div>作家电影（左岸派）</div>
				</a-timeline-item>
				<a-timeline-item class="timeline-item" @click="showDrawer(8)">
					<h2>德国新电影（1962-80年代）</h2>
				</a-timeline-item>
				<a-timeline-item class="timeline-item" @click="showDrawer(9)">
					<h2>新好莱坞电影（1967一1980）</h2>
					<div>《毕业生》</div>
					<div>《邦尼和克莱德》</div>
					<div>结束：</div>
					<div>《愤怒的公牛》</div>
					<div>《天堂之门》</div>
				</a-timeline-item>
				<a-timeline-item class="timeline-item" @click="showDrawer(9)">
					<h2>美国独立电影浪潮（1990）</h2>
					<div>开端：史蒂文·索德伯格：《性，谎言，和录像带》</div>
				</a-timeline-item>

				<a-timeline-item class="timeline-item" @click="showDrawer(9)">
					<h2>新好莱坞电影（1967一1980）</h2>
					<div>美国电影学者道格拉斯·戈梅里将有声电影出现之后的好莱坞电影产业划分为四个时期：
					第一个是1920年代末开始的寡头联合公司统治时代，一直持续到1948年“派拉蒙法案”；
					第二个时期是大制片厂的衰退与转型期，持续到1968年废除“海斯法典”；
					第三是从电视机手中重新夺回观众的时期，体现在彩色宽银幕等技术手段在70年代的广泛运用。
					第四个时期开始于1980年代中后期，跨国公司形成媒体帝国的阶段。</div>
				</a-timeline-item>

			</a-timeline>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				formItemLayout: {
					labelCol: {
						span: 8
					},
					wrapperCol: {
						span: 10
					},
				},
			}
		},
		beforeCreate() {
			this.form = this.$form.createForm(this);
		},
		created() {},
		methods: {
			showDrawer(val) {
				console.log(val)
			}
		}
	}
</script>

<style scoped>
	.history-page {}

	.history-page {}

	.history-timeline {}

	.timeline-item {
		cursor: pointer;
	}

	.timeline-item:hover {
		background-color: azure;
	}
</style>
