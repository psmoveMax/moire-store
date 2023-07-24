<template>
  <li v-bind="$attrs" class="catalog__item" v-for="product in  productsNormalized " :key="product.id">
    <router-link class="catalog__pic" :to="{ name: 'product', params: { id: product.id } }">
      <img :src="product.image" :alt="product.title" :id="'image-' + product.id">
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
      <li class="colors__item" v-for="(color, index) in  product.colors " :key="color.color.id">
        <label v-if="index === 0" class="colors__label" :for="'product-' + product.id + 'color-' + color.color.id">
          <input class="colors__radio sr-only " type="radio" :value="color.color.code"
            :id="'product-' + product.id + 'color-' + color.color.id" :name="product.id" checked>
          <span class="colors__value" :style="{ backgroundColor: color.color.code }"
            @click="changeImage(color, 'image-' + product.id)">
          </span>
        </label>
        <label v-else class="colors__label" :for="'product-' + product.id + 'color-' + color.color.id">
          <input class="colors__radio sr-only " type="radio" :value="color.color.code"
            :id="'product-' + product.id + 'color-' + color.color.id" :name="product.id">
          <span class="colors__value" :style="{ backgroundColor: color.color.code }"
            @click="changeImage(color, 'image-' + product.id)">
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
import { NOT_PIC_URL } from '@/config';


export default {
  inheritAttrs: false,
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
    changeImage(color_current, image_current) {
      if (color_current.gallery !== null) {
        document.getElementById(image_current).src = color_current.gallery[0].file.url;
      } else {
        document.getElementById(image_current).src = NOT_PIC_URL;
      }

    }
  },
  components: {
    router,
  },
};

</script>
