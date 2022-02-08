# vue-ele-form

## 简介

基于`element-ui from` 二次开发的表单组件,主要封装:

+ 基于数据驱动
+ 内置多种表单类型
+ 内置表单校验
+ 表单分组

> 组件基于 element-ui 二次开发,因此在使用时必须保证已经全局引用了 element-ui

## 使用

### 全局注册组件

```js
// main.js
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import EleForm from '@/components/EleForm'

Vue.use(ElementUI)
// 可以在注册时对不同类型表单向进行全局配置, 配置项可以是任何二次封装的参数或者 element-ui 的参数, key 为表单类型
Vue.use(EleForm, {
  // 例如控制 number 类型表单项最小值为 10
  number: {
    min: 0
  }
})
```

### 使用 ele-form 组件

<a name="basic-demo"></a>

```vue
<template>
    <ele-form
    	v-model="formData"
      :form-desc="formDesc"
      :request-fn="handleSubmit"
      @request-success="handleSuccess"
    />
</template>

<script>
export default {
  data() {
    return {
      formData: {},
      formDesc: {
        title: {
          type: 'input',
          label: '标题',
          required: true
        },
        content: {
          type: 'textarea',
          label: '内容',
        },
        type: {
          type: 'radio',
          label: '类型',
          default: 1,
          options: [
            { text: '自制', value: 1 },
            { text: '转载', value: 0 }
          ]
        },
      }
    }
  },
  methods: {
    handleSubmit(data) {
      console.log(data)
    },
    handleSuccess() {
      this.$message.success('创建成功')
    }
  }
}
</script>
```

## Props

|            参数            |           说明           |  类型   | 是否必填 |
| :------------------------: | :----------------------: | :-----: | :------: |
| [formDesc](#formDescTitle) |      各表单项的描述      | Object  |    是    |
|  [formAttrs](#formAttrs)   | `el-form` 本身的配置参数 | Object  |    否    |
|          formData          |         表单数据         | Object  |    是    |
|           inline           |         行内模式         | Boolean |    否    |
|           rules            |    同 `el-form` 组件     | Object  |    否    |

```js
props: {
  // 校检规则, 同原 element-ui form 组件的验证
  rules: Object,
  // 自定义表单按钮
  formBtns: Array,
  // 表单按钮大小（同element-ui button组件的 size 属性）
  formBtnSize: String,
  // 是否显示submit按钮
  isShowSubmitBtn: {
    type: Boolean,
    default: true
  },
  // 是否显示back按钮
  isShowBackBtn: {
    type: Boolean,
    default: true
  },
  // 是否显示reset按钮
  isShowResetBtn: {
    type: Boolean,
    default: false
  },
  // 是否显示 cancel 按钮
  isShowCancelBtn: {
    type: Boolean,
    default: false
  },
  // 是否为弹窗
  isDialog: {
    type: Boolean,
    default: false
  },
  // 弹窗变量控制
  visible: {
    type: Boolean,
    default: false
  },
  // 提交按钮文本
  submitBtnText: {
    type: String,
    default: '提交'
  },
  // 返回按钮文本
  backBtnText: {
    type: String,
    default: '返回'
  },
  // 重置按钮
  resetBtnText: {
    type: String,
    default: '重置'
  },
 	// 取消按钮文本
  cancelBtnText: {
  	type: String,
    default: '取消'
  },
  // 是否显示标签
  isShowLabel: {
    type: Boolean,
    default: true
  },
  // 标签宽度
  labelWidth: {
    type: [Number, String],
    default: 'auto'
  },
  // 提交状态
  isLoading: {
    type: Boolean,
    default: false
  },
  // 是否全局禁用表单
  disabled: {
    type: Boolean,
    default: false
  },
  // 是否全局只读表单
  readonly: {
    type: Boolean,
    default: false
  },
  // 是否显示错误后的 notify
  isShowErrorNotify: {
    type: Boolean,
    default: true
  },
  // 服务器返回的错误信息
  formError: Object,
  // 提交函数 (下面详细讲)
  requestFn: Function,
  // 标签位置, 不填则响应式, 填则固定
  labelPosition: String,
  // 参考原 layout 组件, 不填则响应式, 填则固定
  span: Number,(下个版本将更名为width)
  // 是否响应式
  isResponsive: {
    type: Boolean,
    default: true
  },
  // 表单项顺序数组
  // 数组项为formDesc中的key
  order: {
    type: Array,
    default: () => []
  }
}
```

### 参数说明

#### <a name="formDescTitle">formDesc</a>

详见[formDesc 参数说明](#formDescDetail)

#### <a name="formAttrs">formAttrs</a>

```html
<!-- 指定表单内组件的尺寸为small -->
<ele-form
  :form-attrs="{ size: 'small' }"
/>
```

#### formData

表单提交时的数据,初始给定空对象即可,必填.操作表单过程中,值会动态变化为`type: value`的对象. 参考[示例](#basic-demo),表单填写完成后的结果为

```js
  this.formData = {
    title: '输入的标题',
    content: '输入的内容',
    type: 1 || 0
  }
```

如果要为表单附初始值,同样只需要修改`formData`的值即可

```js
mounted() {
  this.formData = {
    title: 'hello, title',
    content: 'hello, content',
    type: 1
  }

  // 如果是单个赋值，使用 $set 触发响应式
  this.$set(this.formData, 'title', 'hello, title')
}
```
