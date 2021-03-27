<template>
  <div>
    <upload-excel :on-success="success" />
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    success(header, result) {}
  }
}
</script>
<style scoped lang="less"></style>
