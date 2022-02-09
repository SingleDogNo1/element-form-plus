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
      :submit-fn="handleSubmit"
      @submit-success="handleSuccess"
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
        name: {
          type: 'input',
          label: '作者',
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

## Form Props

|             参数              |                 说明                  |       类型       |            默认值            | 是否必填 |
| :---------------------------: | :-----------------------------------: | :--------------: | :--------------------------: | :------: |
|  [formDesc](#formDescTitle)   |            各表单项的描述             |      Object      |              -               |    是    |
|    [formAttrs](#formAttrs)    |       `el-form` 本身的配置参数        |      Object      |              -               |    否    |
|     [formData](#formData)     |               表单数据                |      Object      |              -               |    是    |
|            inline             |      行内模式, 意义同 `el-form`       |     Boolean      |            false             |    否    |
|        [rules](#rules)        |           同 `el-form` 组件           |      Object      |              -               |    否    |
|     [formBtns](#formBtns)     |          自定义表单操作按钮           |      Array       |              -               |    否    |
|          formBtnSize          | 表单按钮大小(同`el-button` size 属性) |      String      |              -               |    否    |
|        isShowSubmitBtn        |           是否显示提交按钮            |     Boolean      |             true             |    否    |
|         isShowBackBtn         |    是否显示返回按钮(返回上一路由)     |     Boolean      |            false             |    否    |
|        isShowResetBtn         |           是否显示重置按钮            |     Boolean      |             true             |    否    |
| [isShowCancelBtn](#isDialog)  |           是否显示取消按钮            |     Boolean      |            false             |    否    |
|     [isDialog](#isDialog)     |              是否为弹窗               |     Boolean      |            false             |    否    |
|     [visible](#isDialog)      |             弹窗是否显示              |     Boolean      |            false             |    否    |
|         submitBtnText         |             提交按钮文本              |      String      |             提交             |    否    |
|          backBtnText          |             返回按钮文本              |      String      |             返回             |    否    |
|         resetBtnText          |             重置按钮文本              |      String      |             重置             |    否    |
|         cancelBtnText         |             取消按钮文本              |      String      |             取消             |    否    |
|          isShowLabel          |             是否显示标签              |     Boolean      |             true             |    否    |
|          labelWidth           |               标签宽度                |  String/Number   |             6em              |    否    |
|           isLoading           |               提交状态                |     Boolean      |            false             |    否    |
|           disabled            |           是否全局禁用表单            |     Boolean      |            false             |    否    |
|           readonly            |           是否全局只读表单            |     Boolean      |            false             |    否    |
|       isShowErrorNotify       |        是否显示错误后的 notify        |     Boolean      |            false             |    否    |
|             span              |       参考 `element-ui` layout        |      Number      | 响应式自适应,非响应式默认 24 |    否    |
|         labelPosition         |               标签位置                | `left/right/top` |              -               |    否    |
| [isResponsive](#isResponsive) |              是否响应式               |     Boolean      |            false             |    否    |
|        [order](#order)        |               字段排序                |      Array       |              -               |    否    |
|           submitFn            |  点击提交时触发,参数为可提交的键值对  |  Function(data)  |              -               |    否    |

### 参数说明

#### <a name="formDescTitle">formDesc</a>

详见[formDesc 参数说明](#formDescDetail)

#### <a name="formAttrs">formAttrs</a>

`el-form`本身的属性, 具体参考 `element-ui` 官方文档

```html
<!-- 指定表单内组件的尺寸为small -->
<ele-form
  :form-attrs="{ size: 'small' }"
/>
```

#### <a name="formData">formData</a>

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

#### <a name="rules">rules</a>

同 `element-ui`语法一致.

```js
rules: {
  title: [
    { required: true, message: '请输入文章标题' }
  ],
  name: [
    { required: true, message: '请填写作者', trigger: 'blur' },
    { min: 2, max: 5, message: '人名至少两个字,至多 5 个字', trigger: 'blur' }
  ]
}
```

组件支持设置表单rules 和表单项rules.你可以在表单选项中定义规则,也可以在`formDesc`中为每个表单项定义规则.如果同时定义了表单规则和某表单项的规则,组件会尝试融合, 不过还是**建议尽可能定义在同一个地方,以方便理解**

```vue
<template>
  <ele-form
    v-model="formData"
    :form-desc="formDesc"
    :rules="rules"
  />
</template>

<script>
export default {
  data () {
    return {
      formData: {},
      rules: {
        title: { required: true, type: 'string', message: '必须填写标题' }
      },
      formDesc: {
        title: {
          type: 'input',
          label: '标题',
          // 表单项 rules （对象类型）
          // 同时定义，则融合两者, 变为标题必填 & 长度在 3 - 5 个字符
          rules: { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        },
        content: {
          type: 'textarea',
          label: '内容',
          // 表单项 rules (数据类型)
          rules: [ { required: true, type: 'string', message: '必须填写标题' } ]
        },
        name: {
          type: 'input',
          label: '作者',
          // 必填的简写方式, 提示信息为: "请输入xxx"
          required: true
        }
      }
    }
  }
}
</script>
```

#### <a name="formBtns">formBtns</a>

自定义表单操作按钮, 默认插入到提交按钮之后. attrs 中可以插入任意`el-button`原本的属性

```js
formBtns: [
  {
    text: '下一步',
    type: 'primary',
    attrs: {
    	disabled: true
    },
    click: () => {
      console.log('点击下一步了!')
    }
  },
  {
    text: '上一步',
    click: () => {
      console.log('点击上一步了!')
    }
  }
]
```

#### <a name="isDialog">isShowCancelBtn & isDialog & visible</a>

是否显示取消按钮，默认值根据isDialog，当有取消按钮时，可以通过 visible 进行弹窗控制.

```vue
<template>
  <div>
    <el-button @click="isShowDialog = true">显示</el-button>
    <el-dialog title="弹窗测试" :visible.sync="isShowDialog">
      <ele-form
        v-model="formData"
        :formDesc="formDesc"
        isDialog
        :visible.sync="isShowDialog"
      />
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowDialog: false,
      formData: {},
      formDesc: {}
    }
  }
}
</script>
```

#### <a name="isResponsive">isResponsive</a>

响应式会影响的参数:

+ inline: 设置为`inline`,将取消响应式结构
+ span
+ labelPosition

影响规则为,指定 `width` 情况下,响应式开启:

> width 为包裹表单的元素宽度

+ `width < 768px` 时, `labelPosition = 'top', span = 24`
+ `768px ≤ width < 992px` 时, `labelPosition = 'right', span = 18`
+ `992px ≤ width < 1200px` 时, `labelPosition = 'right', span = 16`
+ `1200px ≤ width < 1920px` 时, `labelPosition = 'right', span = 14`
+ `1920px ≤ width`  时, `labelPosition = 'right', span = 12`

#### <a name="order">order</a>

默认表单字段会按照`formDesc`的书写顺序排序,使用 `order` 可以强制重排表单顺序. order 参数为表单的字段名称

```js
formDesc: {
  title: { type: 'input', label: '标题' }
  name: { type: 'input', label: '姓名' }
},
// 强制 name 放在 title 之前
order: ['name', 'title']
```

## formDesc Props

`formDesc` 为对象形式,其中 key 为待提交的表单项对应的字段名, 参数值与表单配置重复时覆盖全局配置. 值由以下参数组成

|                 参数                  |                                         说明                                         |       类型       | 默认值 | 是否必填 |
| :-----------------------------------: | :----------------------------------------------------------------------------------: | :--------------: | :----: | :------: |
|        [type](#form-desc-type)        |                                     表单项的类型                                     | String/Component |   -    |    是    |
|                 label                 |                  表单项的标签, 支持[联动属性](#linkage-properties)                   |      String      |   -    |    否    |
|                default                |                 表单项的默认值, 支持[联动属性](#linkage-properties)                  |       Any        |   -    |    否    |
|                 attrs                 |             `element-ui`自身的属性, 支持[联动属性](#linkage-properties)              |      Object      |   -    |    否    |
|                 span                  |                                    栅格长度, 1-24                                    |      Number      |   -    |    否    |
|                  tip                  |                            表单项的提示,可插入 html 标签                             |      String      |   -    |    否    |
|                  vif                  |                           [联动属性](#linkage-properties)                            |     Function     |   -    |    否    |
|               disabled                |                  是否禁用表单项,支持[联动属性](#linkage-properties)                  | Function/Boolean |   -    |    否    |
|                options                |      `checkbox/select`等组件的 options 部分, 参考[options](#form-desc-options)       |      Array       |   -    |    否    |
|                 prop                  |            用于处理options的自定义key. 参考[options](#form-desc-options)             |      Array       |   -    |    否    |
|               required                |                                    表单项是否必填                                    |     Boolean      |   -    |    否    |
|                 rules                 |                         表单项校验规则, 参考[rules](#rules)                          |     Boolean      |   -    |    否    |
|              isShowLabel              |                       指定是否显示标签(覆盖全局`isShowLabel`)                        |     Boolean      |   -    |    否    |
|              labelWidth               |                          指定标签宽度(覆盖全局`labelWidth`)                          |      String      |   -    |    否    |
|                 slots                 |    自定义组件插槽, [参考语法](https://cn.vuejs.org/v2/guide/render-function.html)    |     Function     |   -    |    否    |
|              scopedSlots              | 自定义组件作用域插槽, [参考语法](https://cn.vuejs.org/v2/guide/render-function.html) |     Function     |   -    |    否    |
| [displayFormatter](#displayFormatter) |                            对`formData`的值处理后用于显示                            |     Function     |   -    |    否    |
|   [valueFormatter](#valueFormatter)   |                                 对提交的值进一部处理                                 |     Function     |   -    |    否    |
|       [class](#form-desc-slots)       |                                 对提交的值进一部处理                                 |     Function     |   -    |    否    |

```js
  field: {
    on: Object, // 事件监听器在 `on` 属性内
  }
```

### 参数说明

#### <a name="form-desc-type">type</a>

`type` 的值可以是下面给定的基础类型, 或者为组件的名称.

+ 当 `type` 值为字符串类型时，首先判断是否为基础类型，如果不是基础类型，则当做使用全局组件的名字.
+ 当 type 值为 Component 时，直接加载该组件，具体请参考[自定义组件](#custom-component).

基础类型如下:

|      类型       |        说明        |            类型            |
| :-------------: | :----------------: | :------------------------: |
|      text       |      静态文本      |             -              |
|      input      |    input输入框     |      element-ui input      |
|  autocomplete   | 带输入建议的输入框 |      element-ui input      |
|    textarea     |   多行文本输入框   |      element-ui input      |
|     number      |        数字        |     element-ui number      |
|    checkbox     |        复选        |    element-ui checkbox     |
| checkbox-button |    复选按钮样式    |    element-ui checkbox     |
|      radio      |        单选        |      element-ui radio      |
|  radio-button   |    单选按钮样式    |      element-ui radio      |
|      date       |        日期        |   element-ui date-picker   |
|      dates      |   单个或多个日期   |   element-ui date-picker   |
|      week       |         周         |   element-ui date-picker   |
|      month      |         月         |   element-ui date-picker   |
|   monthrange    |       月范围       |   element-ui date-picker   |
|      year       |         年         |   element-ui date-picker   |
|    daterange    |      日期范围      |   element-ui date-picker   |
|      time       |        时间        |   element-ui time-picker   |
|    timerange    |      时间范围      |   element-ui time-picker   |
|    datetime     |     日期和时间     | element-ui datetime-picker |
|  datetimerange  |   日期和时间范围   | element-ui datetime-picker |
|     switch      |        开关        |     element-ui switch      |
|      yesno      |        是否        |    element-ui checkbox     |
|     slider      |        滑块        |     element-ui slider      |
|    password     |        密码        |      element-ui input      |
|      color      |     颜色选择器     |  element-ui color-picker   |
|     select      |       选择器       |     element-ui select      |
|    cascader     |     级联选择器     |    element-ui cascader     |
|    transfer     |       穿梭框       |    element-ui transfer     |
|      rate       |      评分组件      |      element-ui rate       |
|       tag       |        标签        |       element-ui tag       |
|      image      |      图片展示      |      element-ui image      |
|     button      |        按钮        |     element-ui button      |

上述类型中大部分是`element-ui`原本就有的,不多赘述. 主要说一下自己扩展的类型

+ text 类型: 表现为静态文本,还可以通过`options`参数対值进行格式化显示.

  ```js
  formData: {
    sex: 1
  },
  formDesc: {
    sex: {
      type: 'text',
      label: '性别',
      options: [
        { text: '男', value: 1 },
        { text: '女', value: 2 }
      ]
    }
  }
  ```

+ button 类型: 按钮, 可以自定义事件,标题通过 `title` 定义, 原生属性通过 `attrs` 定义

  ```js
  formDesc: {
    btn: {
      label: '按钮组件',
      type: 'button',
      title: '按钮文字',
      on: {
        click: () => {
          console.log('clicked')
        }
      },
      attrs: {
        type: 'primary'
      }
    }
  }
  ```

+ yesno 类型: 功能类似`switch`,但更语义化一些,没有 `label`, 由单独的 `checkbox` 组成, 值为 `true/false`

  ```js
  formDesc: {
    yesno: {
      label: '',
      type: 'yesno',
      title: '是否必填',
      default: false
    }
  }
  ```

+ tag 类型: 用法参考 `element-ui select 创建条目`
+ image 类型: 由 `element-ui image` 组件形成, 默认大小为 150px, 默认开启`图片预览功能`, 如果需要关闭, 可设置 `isShowPreview` 为 `false`, 默认 `fit` 值为 `cover`, 值可以为字符串或者数组类型.

  ```js
  formDesc: {
    pictures: {
      label: '个人图片',
      type: 'image',
      title: '是否必填',
      // 值类型为字符串 / 数组
      default: [
        'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg'
      ],
      style: {
        // 可以在此调整大小
        width: '200px',
        height: '200px'
      },
      attrs: {
        isShowPreview: true // 默认值开启图片预览功能，可以设置为false，关闭
      }
    }
  }
  ```

#### 动态 type

当 type 不确定是,可以动态改变想要的类型

```js
{
  formData:{
    // 为了响应式，valueType 必须在 formData 先定义
  	valueType: 'switch'
  },
  formDesc: {
    valueType: {
      type: 'radio',
      label: '值的类型',
      default: 'switch',
      options: [
        { text: 'boolean', value: 'switch' },
        { text: 'number', value: 'number' },
        { text: 'string', value: 'input' }
      ]
    },
    value: {
      type: data => data.valueType,
      label: '值'
    }
  }
}
```

#### <a name="displayFormatter">displayFormatter</a>

对 `formData` 中的值处理过, 用于显示.
> 例如: tag类型需要传递Array类型的数据，但如果从服务器获取到的是【,】拼接的字符串，就需要对数做分割处理才能正常显示

```js
formData: {
  // 假设这里是后端传过来的数据, 不能正常显示
  label: 'vue,js'
},
formDesc: {
  label: {
    type: 'tag',
    label: '文章标签',
    displayFormatter (labels) {
      // 如果是string类型，分割为数组
      return typeof labels === 'string' ? labels.split(',') : labels
    }
  }
}
```

#### <a name="valueFormatter">valueFormatter</a>

对最终提交的值做进一步处理
> 例如: tag类型需要传递Array类型的数据，但服务器需要得到的【,】拼接的字符串

```js
formData: {
  // 假设这里是后端传过来的数据, 不能正常显示
  label: ['vue', 'js']
},
formDesc: {
  label: {
    type: 'tag',
    label: '文章标签',
    valueFormatter (labels) {
      return labels.join(',')
    }
  }
}
```

#### <a name="form-desc-slots">class & style & on & slots & scopedSlots</a>

以上参数借鉴了 [Vue Render Function](https://cn.vuejs.org/v2/guide/render-function.html#%E6%B7%B1%E5%85%A5%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1)

```js
  name: {
    label: '姓名',
    type: 'input',
    class: ['foo', 'bar'],
    style: {
      fontSize: '30px'
    },
    on: {
      change: (val) => {
        console.log(val)
      }
    },
    slots: {
      prefix(h) {
        return h('i', { class: 'el-input__icon el-icon-search' })
      }
    }
  }
```

### <a name="linkage-properties">联动属性</a>

使表单项可以根据其他表单项更灵活的操作

#### vif: 控制显隐

```vue
<template>
  <ele-form
    v-model="formData"
    :form-desc="formDesc"
  ></ele-form>
</template>

<script>
export default {
  data () {
    return {
      formData: {},
      formDesc: {
        girlfriend: {
          type: 'radio',
          label: '是否有女朋友',
          default: false,
          options: [
            { text: '有', value: true },
            { text: '无', value: false }
          ]
        },
        girlfriendName: {
          type: 'input',
          label: '女朋友名字',
          vif (data) {
            return data.girlfriend === true
          }
        }
      }
    }
  }
}
</script>
```

#### disabled: 控制启用/禁用

```vue
<template>
  <ele-form
    v-model="formData"
    :form-desc="formDesc"
  ></ele-form>
</template>

<script>
export default {
  data () {
    return {
      formData: {},
      formDesc: {
        girlfriend: {
          type: 'radio',
          label: '是否有女朋友',
          default: false,
          options: [
            { text: '有', value: true },
            { text: '无', value: false }
          ]
        },
        girlfriendName: {
          type: 'input',
          label: '女朋友名字',
          disabled (data) {
            return data.girlfriend === false
          }
        }
      }
    }
  }
}
</script>
```

#### options: 控制选项列表

```vue
<template>
  <ele-form
    v-model="formData"
    :form-desc="formDesc"
  ></ele-form>
</template>

<script>
export default {
  data () {
    return {
      formData: {},
      formDesc: {
        girlfriend: {
          type: 'radio',
          label: '是否有女朋友',
          default: false,
          options: [
            { text: '有', value: true },
            { text: '无', value: false }
          ]
        },
        activity: {
          type: 'checkbox',
          label: '周末活动',
          // 需要设置 isReloadOptions 为 true
          isReloadOptions: true,
          options (data) {
            if (data.girlfriend) {
              return [
                { text: '陪女朋友', value: 1 },
                { text: '逛街', value: 2 }
              ]
            } else {
              return [
                { text: '看动漫', value: 3 },
                { text: '玩游戏', value: 4 }
              ]
            }
          }
        }
      }
    }
  }
}
</script>
```

#### 控制 type/default/attrs/label

```vue
<template>
  <ele-form
    v-model="formData"
    label-width="120"
    :form-desc="formDesc"
  ></ele-form>
</template>

<script>
export default {
  data() {
    return {
      formData: {},
      formDesc: {
        valueType: {
          type: 'radio',
          label: '值的类型',
          default: 'switch',
          options: [
            { text: 'boolean', value: 'switch' },
            { text: 'number', value: 'number' },
            { text: 'string', value: 'input' }
          ]
        },
        value: {
          // 动态类型
          type: data => data.valueType,
          label: data => data.valueType + '的值',
          // 动态默认值
          default(data) {
            switch (data.valueType) {
              case 'switch':
                return true
              case 'number':
                return 1024
              case 'input':
                return '我是字符串默认值'
            }
          },
          // 动态属性
          attrs(data) {
            switch (data.valueType) {
              case 'switch':
                return {
                  'active-color': '#67C23A'
                }
              case 'number':
                return {
                  step: 10
                }
              case 'input':
                return {
                  'prefix-icon': 'el-icon-search'
                }
            }
          }
        }
      }
    }
  }
}
</script>
```

### <a name="form-desc-options">formDesc Options</a>

大致参考`element-ui`的 options 语法, 另外使用 `props`自定义对象数组的 key/value

```js
formDesc: {
  sex: {
    type: 'radio',
    label: '性别',
    // 显示到屏幕上, 分别为男 和 女, 但发送数据分别为 0 和 1, attrs 可选, 参数为 element-ui 原生参数
    options: [
      { text: '男', value: 0, attrs: { size: 'medium', disabled: true } },
      { text: '女', value: 1, attrs: { size : 'medium' } }
    ]
  },
  city: {
    // 默认 options 的 text 为显示字段, value 为数据字段
    options: [
      { name: '北京', id: 0},
      { name: '上海', id: 1}
    ],
    // 只需要将 text指定为 'name' 字段，value指定为 'id'字段即可
    prop: { text: 'name', value: 'id' }
  }
}
```

options 也可以通过 render 函数进行自定义, 具体参考[slots](#form-desc-slots)

```js
formDesc: {
  city: {
    type: 'select',
    label: '城市',
    options: [
      {
        value: 'Beijing',
        text: '北京'
      }, {
        value: 'Shanghai',
        text: '上海'
      }, {
        value: 'Nanjing',
        text: '南京'
      }
    ],
    slots: {
      default(h, { options }) {
        console.log(options)
        return options.map(option =>
          h('el-option', { attrs: { value: option.value } }, [
            h('span', { style: { float: 'left' } }, option.text),
            h(
              'span',
              {
                style: {
                  float: 'right',
                  color: '#8492a6',
                  fontSize: '13px'
                }
              },
              option.value
            )
          ])
        )
      }
    }
  },
}
```

## Form Methods

有时候我们需要从外部对表单进行操作, 组件向外暴露了几个操作方法:

+ `handleSubmitForm` -- 提交表单
+ `resetForm` -- 重置表单
+ `validate` -- 发起验证

```vue
<template>
  <div>
    <el-button @click="triggerRequest">点我请求</el-button>
    <ele-form
      v-model="formData"
      :form-desc="formDesc"
      :request-fn="handleRequest"
      ref="formRef"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {},
      formDesc: {
        title: {
          type: 'input',
          label: '标题'
        }
      }
    }
  },
  methods: {
    // 处理请求
    handleRequest(data) {
      return Promise.resolve(data)
    },
    // 触发请求
    triggerRequest() {
      // 使用到了内部的 handleSubmitForm
      this.$refs.formRef.handleSubmitForm()
    }
  }
}
</script>
```

## Form Event

|     事件名      |   参数   |                    说明                     |
| :-------------: | :------: | :-----------------------------------------: |
| before-validate | formData | 发起验证前执行, 返回 false 可以阻止继续执行 |
|  before-submit  | formData | 发起提交前执行, 返回 false 可以阻止继续执行 |
| submit-success  |    -     |               提交成功后执行                |
|  submit-error   |  error   |               提交失败后执行                |
|   submit-end    |    -     |           无论是否成功,结束后执行           |

## 附录

### <a name="custom-component">自定义组件</a>

以[自定义复合型输入框](https://element.eleme.cn/2.15/#/zh-CN/component/input#fu-he-xing-shu-ru-kuang)为例

#### 新建组件

```vue
<template>
  <el-input
    placeholder="请输入URL"
    v-model="newValue"
    @input="handleChange"
    :class="desc.class"
    :style="desc.style"
    v-bind="attrs"
    v-on="desc.on"
  >
    <template slot="prepend">Http://</template>
    <template slot="append">.com</template>
  </el-input>
</template>
<script>
  import formMixin from '@/components/EleForm/mixins/formMixin'

  export default {
    name: 'custom-url', // name 属性必须填写, 在使用时, 需要和这里定义的 name 一致
    mixins: [formMixin], // 必须引入mixin
    props: {
      value: String,
      desc: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data () {
      return {
        // 用于v-model绑定, 因为 v-model无法绑定props值
        newValue: this.value
      }
    },
    methods: {
      handleChange(value) {
        this.$emit('input', value)
      }
    }
  }
</script>
```

#### 全局注册 & 使用

```js
// main.js 全局注册
import CustomUrl from '@/xx/customUrl.vue'
Vue.component(CustomUrl.name, CustomUrl)

// 在使用的表单位置
{
  formDesc: {
    url: {
      type: 'custom-url',
      label: '地址'
    }
  }
}
```

#### 局部注册 & 使用

```js
// 在使用的表单位置
import CustomUrl from '@/xx/customUrl.vue'

export default {
  data() {
    return {
      formData: {},
      formDesc: {
        url: {
          type: CustomUrl,
          label: '地址'
        }
      }
    }
  }
}

{
  formDesc: {
    url: {
      type: 'custom-url',
      label: '地址'
    }
  }
}
```

### 分组表单

使用 `el-tabs` 对表单进行分组, 保证每个分组的独立性, 同时保证表单的唯一性.

> `npm run dev` 查看完整示例

### 分区表单

将表单项分隔开

> `npm run dev` 查看完整示例

### 弹窗表单

将表单嵌套在弹窗中

> `npm run dev` 查看完整示例

#### props

> `ele-form`的属性都适用

|      属性       |                说明                 |  类型   | 默认值 | 是否必须 |
| :-------------: | :---------------------------------: | :-----: | :----: | :------: |
|     visible     |            弹窗是否显示             | Boolean | false  |    是    |
|      title      |              弹窗标题               | String  |   -    |    是    |
|      width      |              弹窗宽度               | String  | '50%'  |    否    |
|  isShowBackBtn  |          是否显示返回按钮           | Boolean | false  |    否    |
| isShowCancelBtn |          是否显示取消按钮           | Boolean |  true  |    否    |
|   dialogAttrs   | 其他 `element-ui dialog` 的原生属性 | Object  |   -    |    是    |
|    formDesc     |      `ele-form` 的 `formDesc`       | Object  |   -    |    是    |
|    formDesc     |      `ele-form` 的 `formDesc`       | Object  |   -    |    是    |

#### Events

|  事件  |           说明           | 参数  |
| :----: | :----------------------: | :---: |
|  open  |     弹窗打开时的回调     |   -   |
| opened | 弹窗打开动画结束时的回调 |   -   |
| closed | 弹窗关闭动画结束时的回调 |   -   |
