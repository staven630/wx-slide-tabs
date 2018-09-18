const SYSTEM_INFO = wx.getSystemInfoSync();
const IS_IPHONEX = SYSTEM_INFO.model.search('iPhone X') != -1;
const vw = SYSTEM_INFO.windowWidth;
const vh = SYSTEM_INFO.windowHeight;
const wh = vh / vw * 750;
const hw = vw / 2;

Component({
	options: {
		multipleSlots: true
	},
	properties: {
		// 内容区是否衔接滑动
		loop: {
			type: Boolean,
			value: false
		},
		// tab栏是否可滑动
		slide: {
			type: Boolean,
			value: false
		},
		// tab栏目标题
		tabs: {
			type: Array,
			value: []
		},
		// tab栏高度
		tabHeight: {
			type: Number,
			value: 96,
			observer: function (newVal) {
				const winHeight = this.data.winHeight;
				let params = {};
				if (typeof newVal !== 'number') {
					params.th = 96;
					params.sh = winHeight - 96;
				} else {
					params.th = newVal;
					params.sh = winHeight - newVal;
				}
				params.sh = IS_IPHONEX ? params.sh - 68 : params.sh;
				this.setData(params);
			}
		},
		// slide-tabs高度
		winHeight: {
			type: Number,
			value: wh,
			observer: function (newVal) {
				const tabHeight = this.data.tabHeight;
				let params = {};
				params.th = tabHeight;
				params.sh = typeof newVal !== 'number' ? vh - tabHeight : newVal - tabHeight;
				params.sh = IS_IPHONEX ? params.sh - 68 : params.sh;
				this.setData(params);
			}
		}
	},

	data: {
		th: 96,
		sh: IS_IPHONEX ? wh - 164 : wh - 96,
		currentTab: 0,
		sl: 0
	},

	externalClasses: ['slide-tabs-class'],
	
	ready() {
		const that = this;
		const query = wx.createSelectorQuery().in(this);
		query.selectAll('.slide-tab').boundingClientRect(function(res) {
			that.lList = [];
			let num = 0;
			res.forEach((item, index) => {
				that.lList.push(num + item.width / 2);
				num += item.width;
			});
		}).exec()
	},

	methods: {
		changeTab(e) {
			const index = +e.currentTarget.dataset.tab;
			this.setData({
				currentTab: index,
				sl: this.lList[index] - hw
			}, () => {
				this.triggerEvent('changeTab', e.detail);
			});
		},

		switchTab(e) {
			const index = +e.detail.current;
			const len = this.data.tabs.length;
			this.setData({
				currentTab: index,
				sl: this.lList[index] - hw
			}, () => {
				this.triggerEvent('switchTab', e.detail);
			});
		}
	}
})
