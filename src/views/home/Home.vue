<template lang="pug">
header
	.logo
		img.brand-logo(src="@/assets/images/logo/titleLogo.png" alt="Price Patrol")
	.search-area
		.search-box
			.input-box
				input(type="text" placeholder="원하는 상품을 검색 해보세요.")
			.search-icon
				v-icon(icon="mdi-magnify" color="#A6967E" :size="40")
	.category-area.d-flex.flex-wrap.pt-8.pb-5
		.category-menu(v-for="category in categoryList" :class="category.id == req.category ? 'selected' : ''")
			span(@click="req.category = category.id") {{ category.title }}
v-container(fluid)
	v-row
		v-col(cols="12")
			h2.list-title 할인율이 높은 상품
			section.d-flex.justify-center
				ul.product-area
					.product-box(v-for="n in 12" :key="n")
						v-card(max-width="200" variant="text")
							v-img(src="@/assets/images/product_thum.png" aspect-ratio="1")
							v-card-title
								p.product-title {{ n % 2 == 0 ? '탐라황감 당도선별 봄 가을 겨울 사계절 제주도 직배송 달달 감귤 10brix, 2kg(로열과), 5개' : '탐라황감 당도선별 감귤 10brix, 2kg(로열과), 5개' }}
							v-card-subtitle.pa-0 41%
								|
								|
								span.text-decoration-line-through 127,850
							p.product-price 74,950
								span 원
							.review-area
								v-rating(:model-value="3.5" length="5" active-color="yellow-accent-4" color="yellow-accent-4" :size="18" half-increments readonly)
								span (1320)
</template>
<script setup>
import { ref, onMounted } from 'vue'

const req = ref({
	category: null,
})

const categoryList = ref([
	{ id: 1, title: '전체' },
	{ id: 2, title: '가전/디지털' },
	{ id: 3, title: '생활용품' },
	{ id: 4, title: '완구/취미' },
	{ id: 5, title: '식품' },
	{ id: 6, title: '건강/운동' },
	{ id: 7, title: '생활용품' },
	{ id: 8, title: '생활용품' },
	{ id: 9, title: '생활용품' },
	{ id: 10, title: '생활용품' },
	{ id: 11, title: '생활용품' },
])

onMounted(() => {
	req.value.category = categoryList.value[0].id
})
</script>
<style lang="scss"></style>
