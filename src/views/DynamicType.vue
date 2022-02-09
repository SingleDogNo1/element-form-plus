<template>
  <div>
    <el-divider>动态 type</el-divider>
    <ele-form v-model="formData" :formDesc="formDesc" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 表单数据
      formData: {
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
  }
}
</script>
