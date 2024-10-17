<template lang="pug">
v-app
	v-main
		router-view
</template>
<script>
export default {
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
  created() {},
  mounted() {
    window.VueRoot = this;
  },
};
</script>

<style lang="scss"></style>
