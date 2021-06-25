
Component({
    properties: {
		text: { // 通知文本内容
			type: String,
			value: ''
		},
		color: { // 通知文本颜色
			type: String,
			value: ''
		},
		background: { // 滚动条背景
			type: String,
			value: ''
		},
		scrollable: { // 是否开启滚动播放，内容长度溢出时默认开启
			type: Boolean,
			optionalTypes: [String],
			value: 'auto'
		},
		speed: { // 滚动速率 (px/s)
			type: Number,
			value: 50
		}
    },

    data: {
		animation: '', // 动画实例
		textWidth: 0, // 文本长度
		fatherWidth: 0, // 父组件宽度
		duration1: 6000, // 从0到左 动画持续时间，单位 ms
		duration2: 6000, // 从右到0 动画持续时间，单位 ms
    },

    methods: {
		animationHandle() {
			let timer; // 定时器
			let timeout; // 倒计时
			const {textWidth, fatherWidth, duration1, duration2 , scrollable} = this.data
			// 如果设置不开启滚动 || 开启滚动但文本没超出
			if (!scrollable || (scrollable === 'auto' && textWidth <= fatherWidth)) return

			const fn = () => {
				let animation = wx.createAnimation({duration: duration1})
				animation.translateX(0)
				animation.translateX(-textWidth).step()
				this.setData({
					animation: animation.export()
				}, () => {
					clearTimeout(timeout)
					timeout = setTimeout(() => {
						animation.translateX(fatherWidth).step({duration: 0})
						this.setData({
							animation: animation.export()
						}, () => {
							animation.translateX(fatherWidth)
							animation.translateX(0).step({duration: duration2})
							this.setData({
								animation: animation.export()
							})
						})
					}, duration1)
				})
				return fn
			}
			clearInterval(timer)
			timer = setInterval(fn(), duration1 + duration2)
		}
    },
    // 组件生命周期
    lifetimes: {
        // 在组件实例进入页面节点树时执行
        attached() {
			this.selectOwnerComponent().createSelectorQuery().select(`#${this.id}`).fields({
				size: true
			}).exec(father => {
				try {
					father[0].width
					this.createSelectorQuery().select('#notice-text').fields({
						size: true
					}).exec(res => {
						this.setData({
							textWidth: Math.ceil(res[0].width),
							fatherWidth: Math.ceil(father[0].width),
							duration1: Math.ceil(res[0].width / this.data.speed) * 1000,
							duration2: Math.ceil(father[0].width / this.data.speed) * 1000,
						}, () => {
							this.animationHandle()
						})
					})
				}catch(err) {
					console.error('引用的notice组件必须设置唯一id')
				}
			})
        }
	},
})
