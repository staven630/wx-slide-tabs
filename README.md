# slide-tabs
> 类似可滑动的新闻菜单栏，支持tab栏点击自动滑动到视图区以及内容区侧滑

![slide-tabs](https://github.com/staven630/miniprogram-slide-tabs/blob/master/miniprogram-slide-tabs.gif "slide-tabs")

### 加入项目
* npm下载

```
npm i -S miniprogram-slide-tabs
```
使用
```
{
  "usingComponents": {
    "slide-tabs": "/components/miniprogram-slide-tabs/index"
  }
}
```

* 手动下载组件到项目components目录
使用
```
{
  "usingComponents": {
    "slide-tabs": "/components/miniprogram-slide-tabs/index"
  }
}
```

### 使用
wxml（slot为slide-tab-(下标+1)）
```
<slide-tabs tabs="{{['首页', '开发管理']}}" slidable="{{ false }}" loop="{{true}}" bind:change="onChange" >
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
	}
})
```

### 参数
| 选项名 | 类型 | 是否必填 | 默认值 | 描述 |
| :---  | :--- | :--- | :--- | :--- |
| tabs | Array | false | [] | tab栏标题数组['首页'， '开发管理']或者[{title: '首页'}, {title: '开发关注'}] |
| tabheight | Number | false | 96 | 单位为rpx |
| height | Number | false | 整个组件高度 | 默认视窗高度,单位为rpx|
| loop | Boolean | false | false | 内容区是否衔接滑动,即从最后一栏右滑置第一栏，第一栏左滑至最后一栏 |
| slidable | Boolean | false | false | tabs栏是否滑动，默认为false，内容平分宽度 |

### 事件
| 选项名 | 类型 | 是否必填 | 描述 |
| :---  | :--- | :--- | :--- |
| bind:change | Function | false | 监听点击/切换事件 |


### 注意事项
&emsp;&emsp;当参数slide为true，tabs出现滚动的时候，出现了滚动条，可以在全局或引入组件的页面添加如下样式隐藏滚动条
```
::-webkit-scrollbar {
	width: 0;
	height: 0;
	color: transparent;
}
```

# 其他小程序插件
* [miniprogram-city-picker:小程序城市选择器， 省市区三级联动](https://github.com/staven630/miniprogram-city-picker)