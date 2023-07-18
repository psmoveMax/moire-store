<template>
  <li v-bind="$attrs" class="catalog__item" v-for="product in productsNormalized" :key="product.id">
    <router-link class="catalog__pic" :to="{ name: 'product', params: { id: product.id } }">
      <img :src="product.image" :alt="product.title">
    </router-link>


    <h3 class="catalog__title">
      <router-link :to="{ name: 'product', params: { id: product.id } }">
        {{ product.title }}
      </router-link>
    </h3>

    <span class="catalog__price">
      {{ product.pricePretty }} ₽
    </span>

    <ul class="colors colors--black">
      <li class="colors__item" v-for="color in product.colors" :key="color.color.id">
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio" :value="color.color.code">
          <span class="colors__value" :style="{ backgroundColor: color.color.code }">
          </span>
        </label>
      </li>
    </ul>
  </li>
</template>


<script>
import gotoPage from '@/helpers/gotoPage';
import numberFormat from '@/helpers/numberFormat';
import router from '@/router';



export default {
  inheritAttrs: false,
  data() {
    return {
      currentProductId: null,
    };
  },
  computed: {
    productsNormalized() {
      return this.products.map((product) => {
        return {
          ...product,
          pricePretty: numberFormat(product.price),
        }
      })
    },
  },
  props: ["products", 'productId'],
  methods: {
    gotoPage,
  },
  components: {
    router,
  },
};

</script>
