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

      <h1 class="content__title">
        Корзина
      </h1>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">

            <BaseFormText v-model="formData.name" :error="formError.name" title="ФИО"
              placeholder="Введите ваше полное имя" />

            <BaseFormText v-model="formData.address" :error="formError.address" title="Адрес доставки"
              placeholder="Введите ваш адрес" />

            <BaseFormText v-model="formData.phone" :error="formError.phone" title="Телефон"
              placeholder="Введите ваш телефон" />

            <BaseFormText v-model="formData.email" :error="formError.email" title="Email" placeholder="Введи ваш Email" />

            <BaseFormTextarea v-model="formData.comment" :error="formError.comment" title="Комментарий к заказу"
              placeholder="Ваши пожелания" />

          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <p v-if="formError.deliveryTypeId" style="color:red">{{ formError.deliveryTypeId }}</p>
            <ul class="cart__options options">
              <li class="options__item">
                <label for="cart_sam" class="options__label">
                  <input id="cart_sam" class="options__radio sr-only" type="radio" value="1"
                    v-model="formData.deliveryTypeId" v-on:click="paymentsDelivery(1)">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label for="cart_curier" class="options__label">
                  <input id="cart_curier" class="options__radio sr-only" type="radio" name="delivery"
                    v-model="formData.deliveryTypeId" value="2" v-on:click="paymentsDelivery(2)">
                  <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <div v-if="paymentMethods">
              <h3 class="cart__title">Оплата</h3>
              <p v-if="formError.paymentTypeId" style="color:red">{{ formError.paymentTypeId }}</p>
              <ul class="cart__options options">
                <li class="options__item" v-for="method in  paymentMethods.data" :key="method.id">
                  <label :for="'method-' + method.id" class="options__label">
                    <input :id="'method-' + method.id" class="options__radio sr-only" type="radio"
                      :name="'method-' + method.id" :value="method.id" v-model="formData.paymentTypeId">
                    <span class="options__value">
                      {{ method.title }}
                    </span>
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="cart__block">
          <ul class="cart__orders" id="info">
            <li class="cart__order" v-for="product in  cartProductsData" :key="product.id">
              <h3>{{ product.product.title }}</h3>
              <b>{{ product.price }} ₽</b>
              <span class="cart_order_art">Артикул: {{ product.product.id }} &nbsp; <span class="colors__value" :style="{
                'background-color': product.color.color.code, 'display': 'inline-block', 'border': '1px solid #e02d71',
                'opacity': '.5'
              }"></span>
                &nbsp;
                Размер: {{
                  product.size.title }}</span>
              <span class="cart_order_quantity">Кол-во: {{ product.quantity }}</span>
            </li>
          </ul>
          <div class="cart__total">
            <p v-if="formData.deliveryTypeId === '2'">Доставка: <b>500 ₽</b></p>
            <p v-else>Доставка: <b>Бесплатно</b></p>
            <p>Итого: <b>{{ totalAmount }}</b> товара на сумму <b>{{ totalPrice }} ₽</b></p>
          </div>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>

        <div class="cart__error form__error-block" v-if="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ formErrorMessage }}
          </p>
        </div>

      </form>
    </section>
  </main>
</template>

<script>
import BaseFormText from '@/components/BaseFormText.vue';
import BaseFormTextarea from '@/components/BaseFormTextarea.vue';
import { API_BASE_URL } from '@/config';
import axios from 'axios';
import { mapGetters } from 'vuex';
import numberFormat from '@/helpers/numberFormat';

export default {

  components: { BaseFormText, BaseFormTextarea },
  data() {
    return {
      formData: {},
      formError: {},
      formErrorMessage: '',
      cartProductsData: this.$store.state.cartProductsData,
      paymentMethods: '',

    };
  },
  filters: {
    numberFormat,

  },

  methods: {
    order() {
      this.formError = {};
      this.formErrorMessage = '';
      axios.post(`${API_BASE_URL}/api/orders`, {
        ...this.formData,
      }, {
        params: {
          userAccessKey: this.$store.state.userAccessKey,
        },
      })
        .then((response) => {
          this.$store.commit('resetCart');
          this.$store.commit('updateOrderInfo', response.data);
          this.$router.push({ name: 'orderInfo', params: { id: response.data.id } });
        })
        .catch((error) => {
          this.formError = error.response.data.error.request || {};
          this.formErrorMessage = error.response.data.error.message;
          console.log(this.formData);
        });
    },
    paymentsDelivery(typeId) {
      axios.get(`${API_BASE_URL}/api/payments?deliveryTypeId=${typeId}`)
        .then((response) => {
          console.log(response);
          this.paymentMethods = response;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  computed: {
    ...mapGetters({ products: 'cartDetailProducts', totalPrice: 'cartTotalPrice', totalAmount: 'cartTotalAmount' }),
  },

};
</script>
