# 通知栏消息滚动
## 注意事项
1. 组件上必须声明id且唯一

2. 组件上必须设置样式display: block/flex 等块级元素 且 overflow: hidden

3. slot插槽只接收text标签 (view标签会出现意料之外的滚动错误)

4. 默认超出组件的父元素宽度时自动滚动, 可通过 `scrollable` 设置是否开启滚动

5. 接收的参数有：

   ```
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
   ```

   