<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img :src="item.image" width="120" height="120" alt="item.product.title">
    </div>
    <router-link :to="{ name: 'product', params: { id: item.product.id } }" class="product__title">
      {{ item.product.title }}
    </router-link>

    <span class="product__color">
      Цвет: &nbsp; <span class="colors__value" :style="{
        'background-color': item.color.color.code, 'display': 'inline-block', 'border': '1px solid #e02d71',
        'opacity': '.5'
      }"></span>
      &nbsp;{{
        item.color.color.title }}
    </span>
    <span class="product__code">
      Артикул: {{ item.product.id }}<br> Размер: {{ item.size.title }}
    </span>

    <div class="product__counter form__counter">
      <CounterItem :size="10" :amount="amount" @update-amount="updateAmount" />
    </div>

    <b class="product__price">
      {{ totalPricePretty }} ₽
    </b>

    <button class="product__del button-del" type="button" aria-label="Удалить товар из корзины"
      @click.prevent="deleteProduct(item.productId)">
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import { mapActions } from 'vuex';
import CounterItem from './CounterItem.vue';

export default {
  filters: { numberFormat },
  props: ['item'],
  components: { CounterItem },
  computed: {
    totalPricePretty() {
      return numberFormat(this.item.amount * this.item.product.price)
    },

    amount: {
      get() {
        return this.item.amount;
      },
      set(value) {
        this.$store.dispatch('updateCartProductAmount', { productId: this.item.productId, amount: value });
      }
    }
  },
  methods: {
    ...mapActions(['deleteProductCart']),

    deleteProduct(productId) {
      console.log(productId);
      this.deleteProductCart({ productID: productId });
    },
    updateAmount(localValue) {
      this.amount = localValue;
    },
  }
}
</script>