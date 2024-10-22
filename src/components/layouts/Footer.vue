<template lang="pug">
v-footer.d-flex.flex-column.pa-0(height="100")
	.footer-box.bg-bgpoint.d-flex.w-100.align-end
		.icon-area
			v-btn(icon="mdi-github" size="x-large" variant="plain" color="black" @click="openLink()")
			v-btn(icon="mdi-slack" size="x-large" variant="plain" color="black")
		.footer-copy
			strong Copyright © 2024. Terry&doeezy All rights reserved.
</template>

<script>
export default {
	data() {
		return {}
	},
	computed: {},
	methods: {
		openLink() {
			window.open('https://github.com/oka3ri/price-patrol', '_blank')
		},
	},
	created() {},
	mounted() {},
}
</script>

<style lang="scss"></style>
