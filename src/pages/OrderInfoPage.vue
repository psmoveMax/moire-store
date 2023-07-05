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
          <a class="breadcrumbs__link" href="cart.html">
            Корзина
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>
      <h1 v-if="cartLoading">Идет загрузка корзины....</h1>
      <div v-if="cartError">
        <h1>Упс. Что-то пошло не так</h1>
        <p>{{ cartErrorTitle }}</p>
      </div>
    </div>

    <section v-if="orderInfo" class="cart">
      <h1 class="content__title">
        Заказ оформлен <span>№ {{ orderInfo.id }}</span>
      </h1>
      <h2>Статус заказа: {{ orderInfo.status.title }}</h2>
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет письмо с&nbsp;деталями заказа.
            Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для уточнения деталей доставки.
          </p>

          <ul class="dictionary">
            <li class="dictionary__item">
              <span class="dictionary__key">
                Получатель
              </span>
              <span class="dictionary__value">
                {{ orderInfo.name }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Адрес доставки
              </span>
              <span class="dictionary__value">
                {{ orderInfo.address }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Телефон
              </span>
              <span class="dictionary__value">
                {{ orderInfo.phone }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Email
              </span>
              <span class="dictionary__value">
                {{ orderInfo.email }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Способ оплаты
              </span>
              <span class="dictionary__value">
                картой при получении
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Комментарий
              </span>
              <span class="dictionary__value">
                {{ orderInfo.comment }}
              </span>
            </li>
          </ul>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li class="cart__order" v-for="product in  orderInfo.basket.items" :key="product.id">
              <h3>{{ product.product.title }}</h3>
              <b>{{ product.price | numberFormat }} ₽</b>
              <span>Артикул: {{ product.product.id }}</span>
              <span>Кол-во: {{ product.quantity }}</span>
            </li>
          </ul>

          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого: <b>{{ orderInfo.basket.items.length }}</b> позиции на сумму <b>{{ orderInfo.totalPrice |
              numberFormat }} ₽</b></p>
          </div>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';

export default {
  data() {
    return {
      orderInfo: null,
      cartLoading: true,
      cartError: false,
      cartErrorTitle: '',
    };
  },
  created() {
    if (this.$store.state.orderInfo && this.$store.state.orderInfo.id === this.$route.params.id) {
      this.cartLoading = false;
      this.orderInfo = this.$store.state.orderInfo;
      return;
    }
    this.$store.dispatch('loadOrderInfo', this.$route.params.id)
      .then(() => {
        this.cartLoading = false;
        this.orderInfo = this.$store.state.orderInfo;
      })
      .catch((error) => {
        this.cartLoading = false;
        this.cartError = true;
        this.cartErrorTitle = error;
      });
  },
  filters: {
    numberFormat,
  },
};
</script>
