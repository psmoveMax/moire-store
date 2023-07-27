<template>
  <main class="content container" v-if="productStatus.isLoading">Загрузка товара... <p>{{ product }}</p>
  </main>
  <main class="content container" v-else-if="productStatus.isFailed">Не удалось загрузить товар</main>
  <main class="content container" v-else>
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
            {{ category.title }}
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            {{ product.title }}
          </a>
        </li>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img width="570" height="570" :src="product.colors[0].gallery[0].file.url" :alt="product.title"
            id="product_image_current">
        </div>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ product.id }}</span>
        <h2 class="item__title">
          {{ product.title }}
        </h2>
        <div class="item__form">
          <form class="form" action="#" method="POST" @submit.prevent="doAddToCart">

            <div class="item__row">
              <div class="form__counter">
                <CounterItem :size="12" :amount="productAmount" @update-amount="doUpdateAmount" />
              </div>
              <b class="item__price" style="align-self: center;">
                {{ product.pricePretty }} ₽
              </b>

            </div>
            <div class="item__row">
              <fieldset class="form__block">
                <legend class="form__legend">Цвет</legend>
                <ul class="colors">
                  <li class="colors__item" v-for="(color, index) in  product.colors " :key="color.color.id">
                    <label v-if="index === 0" class="colors__label"
                      :for="'product-' + product.id + 'color-' + color.color.id">
                      <input class="colors__radio sr-only " type="radio" :value="color.color.code"
                        :id="'product-' + product.id + 'color-' + color.color.id" :name="product.id" checked>
                      <span aria-hidden="true" class="colors__value" :value="color.color.id"
                        :style="{ backgroundColor: color.color.code }" @click="changeImage(color, 'image-' + product.id)">
                      </span>
                    </label>
                    <label v-else class="colors__label" :for="'product-' + product.id + 'color-' + color.color.id">
                      <input class="colors__radio sr-only " type="radio" :value="color.color.code"
                        :id="'product-' + product.id + 'color-' + color.color.id" :name="product.id">
                      <span aria-hidden="true" class="colors__value" :style="{ backgroundColor: color.color.code }"
                        @click="changeImage(color, 'image-' + product.id)">
                      </span>
                    </label>
                  </li>
                </ul>

              </fieldset>
              <fieldset class="form__block">
                <legend class="form__legend" style="padding-left: 14px;">Размер</legend>
                <BaseSelect :sizes="product.sizes" @update-amount="doUpdateSize" />
              </fieldset>
            </div>
            <div style="display: grid;  width: 40%;">
              <button class="button button--primery" type="submit" :disabled="productAddSend" @click="doUpdates">
                В корзину
              </button>
              <BaseModal v-model:open="isShowAddedMessage">
                Товар добавлен в корзину
              </BaseModal>
            </div>

            <div v-show="productAdded">Товар добавлен в корзину</div>
            <div v-show="productAddSend">Добавляем товар в корзину</div>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current">
              Описание
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Характеристики
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Гарантия
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Оплата и доставка
            </a>
          </li>
        </ul>

        <div class="item__content">
          <p>
            {{ product.title }}<br>
          </p>

          <h3>Что это?</h3>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, nisi dolorem consequuntur vel incidunt
            doloremque iste explicabo. Ipsa, deserunt voluptas assumenda, cupiditate illum magnam iusto qui commodi enim
            debitis sunt.
            Necessitatibus architecto rem odio iure, a deleniti sapiente iusto minima quisquam tempore veritatis et
            deserunt incidunt adipisci perspiciatis placeat illum, beatae modi vel? Fugit asperiores rem laboriosam
            quibusdam quasi libero.
            Inventore officiis a voluptatem dolor vitae dignissimos commodi. Itaque rerum illum amet corporis! Dolorem
            tenetur iure quis maxime quisquam ullam dignissimos officia aliquid? Itaque culpa cumque autem illo a illum!
            Assumenda consequatur optio vel modi consequuntur facere neque aspernatur laboriosam, dolore minima maxime
            itaque sit incidunt sint aut sunt! Aspernatur possimus corrupti est neque earum deserunt labore expedita ut
            eaque.
            Praesentium repellat quod omnis aut perferendis harum ratione possimus inventore facere laboriosam commodi
            quasi eligendi quaerat excepturi temporibus, alias explicabo ipsum eveniet! Repellat nisi quod accusantium
            consequuntur nobis nulla impedit.
          </p>

          <h3>Дизайн</h3>

          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis quo iure porro incidunt ipsam maxime corrupti
            adipisci quam illum mollitia sit fugit cupiditate officiis soluta aliquam, laboriosam repellendus vel tempore.
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import {
  defineComponent, ref,
} from 'vue';
import CounterItem from '@/components/CounterItem.vue';
import BaseSelect from '@/components/BaseSelect.vue';
import { useStore } from 'vuex';
import BaseModal from '@/components/BaseModal.vue';
import { useRoute } from 'vue-router';
import useProduct from '@/hooks/useProduct';
import { NOT_PIC_URL } from '@/config';

export default defineComponent({

  components: { CounterItem, BaseModal, BaseSelect },

  setup() {
    const $store = useStore();
    const $route = useRoute();
    const {
      product,
      category,
      fetchProduct,
      status: productStatus,
    } = useProduct();
    // document.getElementsByClassName('colors__value')[0].attributes.value.value
    const productAmount = ref(1);
    const productColor = ref(1);
    const productSize = ref(1);
    const productAdded = ref(false);
    const productAddSend = ref(false);
    const isShowAddedMessage = ref(false);
    const doAddToCart = () => {
      productAdded.value = false;
      productAddSend.value = true;
      $store.dispatch('addProductToCart', {
        productId: product.value.id,
        amount: productAmount.value,
        colorId: productColor.value,
        sizeId: productSize.value,
      })
        .then(() => {
          isShowAddedMessage.value = true;
          productAdded.value = true;
          productAddSend.value = false;
        }).catch((error) => {
          console.log(error);
          console.log('polar');
        });
    };
    const doUpdateAmount = (localValue) => {
      productAmount.value = localValue;
    };

    const doUpdateSize = () => {
      productSize.value = document.querySelector('.form__select').value;
    };

    const doUpdates = () => {
      if (productColor.value === 1) {
        productColor.value = document.querySelector('.colors__value').attributes.value.value;
      }
      if (productSize.value === 1) {
        productSize.value = document.querySelector('.form__select').selectedOptions[0].value;
      }
    };

    const changeImage = (colorCurrent) => {
      console.log(colorCurrent);
      productColor.value = colorCurrent.color.id;
      console.log(productColor.value);
      if (colorCurrent.gallery !== null) {
        document.getElementById('product_image_current').src = colorCurrent.gallery[0].file.url;
      } else {
        document.getElementById('product_image_current').src = NOT_PIC_URL;
      }
    };

    fetchProduct($route.params.id);
    return {
      productAmount,
      productColor,
      productData: product,
      productStatus,
      productAdded,
      productAddSend,
      isShowAddedMessage,
      product,
      category,

      doAddToCart,
      doUpdateAmount,
      doUpdateSize,
      changeImage,
      doUpdates,
    };
  },
});
</script>
