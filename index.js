const SYSTEM_INFO = wx.getSystemInfoSync();
const vh = SYSTEM_INFO.windowHeight / SYSTEM_INFO.windowWidth * 750;
const pos = SYSTEM_INFO.windowWidth / 2;

Component({
  options: {
    multipleSlots: true
  },
  properties: {
    backgroundColor: {
      type: String,
      value: '#f5f5f5'
    },
    loop: { // 内容区是否衔接滑动
      type: Boolean,
      value: false
    },

    slidable: {
      // tab栏是否可滑动
      type: Boolean,
      value: false
    },

    tabs: {
      // tabs栏标题
      type: Array,
      value: []
    },

    tabheight: {
      type: Number,
      value: 96
    },
    height: { // 整个组件的高度
      type: Number,
      value: null,
      observer: function (newVal) {
        newVal = typeof newVal === 'undefined' ? vh : newVal;
        this.setData({
          wh: newVal
        })
      }
    }
  },

  lifetimes: {
    ready() {
      this.initMap();
    }
  },

  data: {
    left: 0,
    currentTab: 0,
    wh: vh
  },

  methods: {
    initMap(delay = true) {
      if (!this.properties.slidable) return;
      this.distanceMap = {};
      if (delay) {
        setTimeout(() => {
          this.getQuery();
        }, 2000)
      } else {
        this.getQuery();
      }
    },

    getQuery() {
      const query = wx.createSelectorQuery().in(this);
      query.selectAll('.slide-tabs-tab')
        .boundingClientRect(res => {
          let num = 0;
          res.forEach((item, index) => {
            this.distanceMap[index] = num + item.width / 2;
            num += item.width;
          })
        }).exec();
    },

    getParams(index) {
      if (Object.keys(this.distanceMap).length === 0) {
        this.initMap(false);
      }
      return this.properties.slidable ? {
        currentTab: index,
        left: this.distanceMap.get(index) - pos
      } : { currentTab: index };
    },

    changeTab(e) {
      const index = +e.currentTarget.dataset.index;
      this.setData(this.getParams(index));
    },
    switchTab(e) {
      const index = +e.detail.current;
      this.setData(this.getParams(index), () => {
        this.triggerEvent('change', {
          index: index,
          tab: this.data.tabs[index]
        })
      });
    }
  }
})
