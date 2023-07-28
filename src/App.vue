<template>
  <header v-if="!isSomeOpen" class="header">
    <div class="header__wrapper container">
      <span class="header__info">Каталог</span>
      <router-link class="header__logo" :to="{ name: 'main' }">
        <img src="../public/img/svg/logo-moire.svg" alt="Логотип интернет магазина Moire" width="116" height="34">
      </router-link>
      <a class="header__tel" href="tel:8 800 600 90 09">
        8 800 600 90 09
      </a>
      <CartIndicator />
    </div>
  </header>
  <router-view :key="$route.fullPath" />

  <footer class="footer">
    <div class="footer__wrapper container">
      <ul class="footer__links">
        <li>
          <a class="footer__link" href="#">
            Каталог
          </a>
        </li>
        <li>
          <a class="footer__link" href="tel:88006009009">
            8 800 600 90 09
          </a>
        </li>
        <li>
          <a class="footer__link" href="mailto:moire@shop.com">
            moire@shop.com
          </a>
        </li>
        <li>
          <a class="footer__link" href="#">
            Распродажа
          </a>
        </li>
        <li>
          <a class="footer__link footer__link--medium" href="#">
            Заказать звонок
          </a>
        </li>
      </ul>

      <ul class="footer__social social">
        <li class="social__item">
          <a class="social__link" href="#" aria-label="Вконтакте">
            <svg width="20" height="11" fill="currentColor">
              <use xlink:href="#icon-vk"></use>
            </svg>
          </a>
        </li>
        <li class="social__item">
          <a class="social__link" href="#" aria-label="Инстаграм">
            <svg width="17" height="17" fill="currentColor">
              <use xlink:href="#icon-insta"></use>
            </svg>
          </a>
        </li>
        <li class="social__item">
          <a class="social__link" href="#" aria-label="Facebook">
            <svg width="17" height="17" fill="currentColor">
              <use xlink:href="#icon-facebook"></use>
            </svg>
          </a>
        </li>
        <li class="social__item">
          <a class="social__link" href="#" aria-label="Twitter">
            <svg width="17" height="14" fill="currentColor">
              <use xlink:href="#icon-twitter"></use>
            </svg>
          </a>
        </li>
        <li class="social__item">
          <a class="social__link" href="#" aria-label="Telegram">
            <svg width="19" height="17" fill="currentColor">
              <use xlink:href="#icon-telegram"></use>
            </svg>
          </a>
        </li>
      </ul>

      <p class="footer__desc">
        Все права на&nbsp;материалы, находящиеся на&nbsp;сайте, охраняются в&nbsp;соответствии
        с&nbsp;законодательством&nbsp;РФ,
        в&nbsp;том числе об&nbsp;авторском праве и&nbsp;смежных правах.
      </p>

      <ul class="footer__data">
        <li>
          <a class="footer__link" href="#" target="_blank" rel="noopener" type="application/pdf">
            Политика конфиденциальности
          </a>
        </li>
        <li>
          <a class="footer__link" href="#" target="_blank" rel="noopener" type="application/pdf">
            Публичная оферта
          </a>
        </li>
      </ul>

      <span class="footer__copyright">
        © 2023 moire
      </span>
    </div>
  </footer>

  <div id="teleport-target"></div>
</template>

<script>
import CartIndicator from './components/CartIndicator.vue';
import { mapActions, mapMutations } from 'vuex';
import useModal from './hooks/useModal';
export default {
  components: { CartIndicator },
  setup() {
    const { isSomeOpen } = useModal();
    return {
      isSomeOpen,
    };
  },
  created() {
    const userAccessKey = localStorage.getItem('userAccessKey');
    if (userAccessKey) {
      this.updateUserAccessKey(userAccessKey);
    }
    this.loadCart();
  },
  methods: {
    ...mapActions(['loadCart']),
    ...mapMutations(['updateUserAccessKey']),
  }
};
</script>
