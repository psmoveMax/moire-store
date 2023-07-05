<template>
  <main class="content container" v-if="productStatus.isLoading">Загрузка товара...</main>
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
          <img width="570" height="570" :src="product.image.file.url" :alt="product.title">
        </div>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ product.id }}</span>
        <h2 class="item__title">
          {{ product.title }}
        </h2>
        <div class="item__form">
          <form class="form" action="#" method="POST" @submit.prevent="doAddToCart">
            <b class="item__price">
              {{ product.pricePretty }} ₽
            </b>

            <fieldset class="form__block">
              <legend class="form__legend">Цвет:</legend>
              <ul class="colors">
                <li class="colors__item" v-for="color in  product.colors " :key="color.id">
                  <label class="colors__label" :for="color.id">
                    <input class="colors__radio sr-only" type="radio" :id="color.id" name="color" :value="color.id">
                    <span class="colors__value" :value="color.id" :style="{ backgroundColor: color.code }"> </span>
                  </label>
                </li>
              </ul>
            </fieldset>

            <div class="item__row">
              <div class="form__counter">
                <CounterItem :size="12" :amount="productAmount" @update-amount="doUpdateAmount" />
              </div>
              <button class="button button--primery" type="submit" :disabled="productAddSend">
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
            Навигация GPS, ГЛОНАСС, BEIDOU Galileo и QZSS<br>
            Синхронизация со смартфоном<br>
            Связь по Bluetooth Smart, и Wi-Fi<br>
            Поддержка сторонних приложений<br>
          </p>

          <a href="#">
            Все характеристики
          </a>

          <h3>Что это?</h3>

          <p>
            Wahoo ELEMNT BOLT GPS – это велокомпьютер, который позволяет оптимизировать свои велотренировки,
            сделав их максимально эффективными. Wahoo ELEMNT BOLT GPS синхронизируется с датчиками,
            объединяя полученную с них информацию. Данные отображаются на дисплее, а также сохраняются на
            смартфоне. При этом на мобильное устройство можно установить как фирменное приложение, так и
            различные приложения сторонних разработчиков. Велокомпьютер точно отслеживает местоположение,
            принимая сигнал с целого комплекса спутников. Эта информация позволяет смотреть уже преодоленные
            маршруты и планировать новые велопрогулки.
          </p>

          <h3>Дизайн</h3>

          <p>
            Велокомпьютер Wahoo ELEMNT BOLT очень компактный. Размеры устройства составляют всего 74,6 x 47,3 x
            22,1 мм. что не превышает габариты смартфона. Корпус гаджета выполнен из черного пластика.
            обращенной к пользователю стороне расположен дисплей диагональю 56 мм. дисплей выводятся
            координаты и скорость, также полученная смартфона и синхронизированных датчиков информация:
            интенсивность, скорость вращения педалей, пульс и т.д. (датчики не входят в комплект поставки).
            Корпус велокомпьютера имеет степень защиты от влаги IPX7. Это означает, что устройство не боится
            пыли, также выдерживает кратковременное (до 30 минут) погружение в воду на глубину не более
            1 метра.
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
import { useStore } from 'vuex';
import BaseModal from '@/components/BaseModal.vue';
import { useRoute } from 'vue-router';
import useProduct from '@/hooks/useProduct';

export default defineComponent({

  components: { CounterItem, BaseModal },

  setup() {
    const $store = useStore();
    const $route = useRoute();
    const {
      product,
      category,
      fetchProduct,
      status: productStatus,
    } = useProduct();

    const productAmount = ref(1);
    const productAdded = ref(false);
    const productAddSend = ref(false);
    const isShowAddedMessage = ref(false);
    const doAddToCart = () => {
      productAdded.value = false;
      productAddSend.value = true;
      $store.dispatch('addProductToCart', { productId: product.value.id, amount: productAmount.value })
        .then(() => {
          isShowAddedMessage.value = true;
          productAdded.value = true;
          productAddSend.value = false;
        });
    };
    const doUpdateAmount = (localValue) => {
      productAmount.value = localValue;
    };

    fetchProduct($route.params.id);

    return {
      productAmount,
      productData: product,
      productStatus,
      productAdded,
      productAddSend,
      isShowAddedMessage,
      product,
      category,

      doAddToCart,
      doUpdateAmount,
    };
  },
});
</script>
