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
  name: 'custom-url',
  mixins: [formMixin],
  props: {
    value: String,
    desc: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
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
