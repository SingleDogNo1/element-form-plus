<template>
  <div>
    <el-divider>基础使用</el-divider>
    <ele-form
      ref="EleFormRef"
      v-model="formData"
      :form-desc="formDesc"
      :submit-fn="handleSubmit"
      @before-validate="handleBeforeValidate"
      @before-submit="handleBeforeSubmit"
      @submit-success="handleSuccess"
      @submit-error="handleSubmitError"
      @submit-end="handleSubmitEnd"
    />
    <el-button @click="submitForm">普通按钮调用组件方法提交</el-button>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  data() {
    return {
      // 表单数据
      formData: {
        // sex: 1,
        // title: 'adasd',
        // content: 'fsdfdsfdf',
        // label: ['vue'],
        // label2: 123,
        // pictures: ['https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg']
      },

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
            width: '200px',
            height: '200px'
          },
          attrs: {
            isShowPreview: true // 默认值开启图片预览功能，可以设置为false，关闭
          }
        },
        yesno: {
          label: '',
          type: 'yesno',
          title: '是否必填',
          default: false
        },
        sex: {
          type: 'text',
          label: '性别',
          options: [
            { text: '男', value: 1 },
            { text: '女', value: 2 }
          ]
        },
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
        },
        title: {
          type: 'input',
          label: '标题',
          required: true,
          tip: '<h1>文章标题</h1>',
          disabled: false
        },
        content: {
          type: 'textarea',
          label: '内容',
          required: true // 必填简写
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
        category: {
          type: 'cascader',
          label: '分区',
          options: [
            {
              value: 'dongman',
              label: '动漫',
              children: [
                { value: 'dongmanzatan', label: '动漫杂谈' },
                { value: 'donghuajishu', label: '动画技术' },
                { value: 'dongmanzixun', label: '动漫资讯' }
              ]
            },
            {
              value: 'biancheng',
              label: '编程',
              children: [
                { value: 'vue', label: 'Vue' },
                { value: 'css', label: 'CSS' },
                { value: 'html', label: 'HTML' },
                { value: 'js', label: 'JavaScript' }
              ]
            }
          ]
        },
        label: {
          type: 'tag',
          label: '标签',
          options: ['vue', 'js', 'node'],
          required: true
        },
        label2: {
          type: 'select',
          label: '标签 2',
          options: [
            {
              text: '选项一(值为数字)',
              value: 123
            },
            {
              text: '选项二(值为字符串)',
              value: '456'
            }
          ],
          rules: [
            { required: true, message: '年龄不能为空' },
            { type: 'number', message: '年龄必须为数字值' }
          ]
        },
        age: {
          type: 'number',
          label: '年龄',
          required: true
        }
      }
    }
  },
  methods: {
    handleSubmit(data) {
      console.log('handleSubmit: >>', data)
      return Promise.resolve()
    },
    handleSuccess() {
      this.$message.success('创建成功')
    },
    handleBeforeSubmit(data) {
      console.log('handleBeforeSubmit: >>', data)
      return Promise.resolve()
    },
    submitForm() {
      this.$refs.EleFormRef.handleSubmitForm()
    },
    handleSubmitError(data) {
      console.log('handleSubmitError :>> ', data)
    },
    handleSubmitEnd() {
      console.log('handleSubmitEnd :>> ')
    },
    handleBeforeValidate(data) {
      console.log('handleBeforeValidate :>> ', data)
    }
  }
}
</script>
