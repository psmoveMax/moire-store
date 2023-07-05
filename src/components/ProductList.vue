<template>
  <ul class="catalog__list">
    <ProductItems class="catalog__item" :products="products">
    </ProductItems>
  </ul>
</template>

<script>
import ProductItems from './ProductItems.vue';
export default {
  props: ['products'],
  components: {
    ProductItems
  },
};


</script>
