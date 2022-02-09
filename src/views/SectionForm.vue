<template>
  <ele-form-section
    v-model="formData"
    :request-fn="handleSubmit"
    :rules="rules"
    :sections="sections"
    @request-success="handleSuccess"
  />
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      // 同 vue-ele-form
      formData: {},
      sections: [
        {
          // 分区标题
          title: '基本信息',
          // 分区icon (可选)
          icon: 'el-icon-user',
          // 分区表单项
          // 和group不同，仅将vue-ele-form的formDesc放入section中
          formDesc: {
            name: {
              type: 'input',
              label: '姓名'
            },
            age: {
              label: '年龄',
              type: 'number'
            }
          }
        },
        {
          title: '密码',
          icon: 'el-icon-key',
          formDesc: {
            oldPassword: {
              type: 'password',
              label: '旧密码'
            },
            newPassword: {
              type: 'password',
              label: '新密码'
            },
            confirmPassword: {
              type: 'password',
              label: '确认密码'
            }
          }
        }
      ],
      // 同 vue-ele-form
      rules: {
        name: { required: true, message: '名称必填' }
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
