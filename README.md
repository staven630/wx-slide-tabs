# slide-tabs
> 类似可滑动的新闻菜单栏

### 引入
```
{
  "usingComponents": {
    "slide-tabs": "../../components/miniprogram-slide-tabs/index"
  }
}
```

### 使用
wxml
```
<slide-tabs tabs="{{['首页', '开发管理', '用户身份', '数据分析', '模板消息', '客服反馈']}}"  
    slide="{{ true }}" loop="{{true}}" 
    bindchangeTab="onChange"  bindswitchTab="onSwitch">
	<view slot="slide-tab-1">h1</view>
	<view slot="slide-tab-2">h2</view>
	<view slot="slide-tab-3">h3</view>
</slide-tabs>
```
js 
```
Page({
	onChange: function(e) {
		console.log(e)
	},
	onSwitch: function(e) {
		console.log(e)
	}
})
```

### 参数
| 选项名 | 类型 | 是否必填 | 默认值 | 描述 |
| :---  | :--- | :--- | :--- | :--- |
| tabs | Array | false | [] | tab栏标题数组 |
| tabHeight | Number | false | 96 | 单位为rpx |
| winHeight | Number | false | 视窗高度 | 默认视窗高度，iphonex会预留68rpx底部适配 |
| loop | Boolean | false | false | 内容区是否衔接滑动,即从最后一栏右滑置第一栏，第一栏左滑至最后一栏 |
| slide | Boolean | false | false | tabs栏是否滑动，默认为false，内容平分宽度 |

### 事件
| 选项名 | 类型 | 是否必填 | 描述 |
| :---  | :--- | :--- | :--- |
| bindchangeTab | Function | false | 监听tabs栏点击切换事件 |
| bindswitchTab | Function | false | 监听内容区滑动事件 |
