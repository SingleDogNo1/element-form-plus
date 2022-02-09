<template>
  <div>
    <el-divider>自定义组件</el-divider>
    <ele-form ref="EleFormRef" v-model="formData" :form-desc="formDesc" :submit-fn="handleSubmit" />
  </div>
</template>

<script>
import CustomUrl from './customUrl.vue'
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
  },
  methods: {
    handleSubmit(data) {
      console.log('handleSubmit: >>', data)
      return Promise.resolve()
    }
  }
}
</script>
