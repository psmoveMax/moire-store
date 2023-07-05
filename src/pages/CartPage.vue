<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html">
            Каталог
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        {{ products.length === 1 ? products.length + ' товар' : products.length + ' товара' }}
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <CartItem v-for="item in products" :key="item.productId" :item="item" />
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ totalPricePretty }} ₽</span>
          </p>

          <router-link v-slot="{ navigate }" :to="{ name: 'order' }" custom>
            <button class="cart__button button button--primery" :disabled="totalPricePretty > 0"
              @click="navigate">Оформить
              заказ</button>
          </router-link>
        </div>
      </form>
    </section>
  </main>
</template>

<script>

import numberFormat from '@/helpers/numberFormat';
import { mapGetters } from 'vuex';
import CartItem from '@/components/CartItem.vue';
import { defineComponent } from 'vue';

export default defineComponent({

  components: { CartItem },
  computed: {
    ...mapGetters({ products: 'cartDetailProducts', totalPrice: 'cartTotalPrice' }),
    totalPricePretty() {
      return numberFormat(this.totalPrice);
    },
  },
});
</script>
