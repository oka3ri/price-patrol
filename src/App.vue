<template lang="pug">
v-app
	v-main.main-container
		router-view
	base-footer
</template>
<script>
import BaseFooter from '@/components/layouts/Footer.vue'
export default {
	components: { BaseFooter },
	data() {
		return {}
	},
	computed: {},
	methods: {},
	created() {},
	mounted() {
		window.VueRoot = this
	},
}
</script>

<style lang="scss"></style>
