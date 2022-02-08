<template>
  <ele-form
    v-model="formData"
    :form-desc="formDesc"
    :request-fn="handleSubmit"
    isShowResetBtn
    @request-success="handleSuccess"
  />
</template>

<script>
export default {
  data() {
    return {
      // 表单数据
      formData: {},
      formDesc: {
        title: {
          type: 'input',
          label: '标题',
          required: true,
          span: 6
        },
        content: {
          type: 'textarea',
          label: '内容',
            span: 6,
          required: true // 必填简写
        },
        type: {
          type: 'radio',
          label: '类型',
            span: 6,
          default: 1,
          options: [
            { text: '自制', value: 1 },
            { text: '转载', value: 0 }
          ]
        },
        category: {
          type: 'cascader',
          label: '分区',
            span: 6,
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
        // label: {
        //   type: 'tag',
        //   label: '标签',
        //   required: true
        // },
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
      console.log(data)
      return Promise.resolve()
    },
    handleSuccess() {
      this.$message.success('创建成功')
    }
  }
}
</script>

<style>
html,
body {
  margin: 0;
}
</style>
