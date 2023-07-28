<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        {{ countProducts }} товара
      </span>
    </div>

    <div class="content__catalog">

      <ProductFilter v-model:price-from="filterPriceFrom" v-model:price-to="filterPriceTo"
        v-model:category-id="filterCategoryId" v-model:color-id="filterColorId" v-model:material-id="filterMaterialId"
        v-model:season-id="filterSeasonId" />
      <section class="catalog">
        <div v-if="productsLoading">Загрузка товаров...</div>
        <div v-if="productsLoadingFailed">Произошла ошибка при загрузке товаров! <button>
            @click.prevent='loadProducts'>Попробовать еще раз</button></div>
        <ProductList :products="products" />

        <BasePagination v-model="page" :count="countProducts" :per-page="productsPerPage" />
      </section>

    </div>
  </main>
</template>

<script>
import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import axios from 'axios';
import { API_BASE_URL, NOT_PIC_URL } from '@/config';

export default {
  components: { ProductList, BasePagination, ProductFilter },

  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColorId: 0,
      filterMaterialId: [],
      filterSeasonId: [],

      page: 1,
      productsPerPage: 6,

      productsData: null,

      productsLoading: false,
      productsLoadingFailed: false,

    };
  },
  computed: {
    products() {
      return this.productsData ? this.productsData.items.map((product) => {
        let image = '';
        if (product.colors[0].gallery != null) {
          image = product.colors[0].gallery[0].file.url;
        } else {
          image = NOT_PIC_URL;
        }
        return {
          ...product,
          image,
        };
      }) : [];
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },
  watch: {
    page() {
      this.loadProducts();
    },
    filterPriceFrom() {
      this.loadProducts();
    },
    filterColorId() {
      this.loadProducts();
    },
    filterMaterialId() {
      this.loadProducts();
    },
    filterSeasonId() {
      this.loadProducts();
    },
    filterPriceTo() {
      this.loadProducts();
    },
    filterCategoryId() {
      this.loadProducts();
    },
  },
  methods: {
    loadProducts() {
      this.productsLoading = true;
      this.productsLoadingFailed = false;
      clearTimeout(this.loadProductsTimer);
      const params = {
        page: this.page,
        limit: this.productsPerPage,
      };

      if (this.filterCategoryId !== 0) {
        params.categoryId = this.filterCategoryId;
      }
      if (this.filterPriceFrom !== 0) {
        params.minPrice = this.filterPriceFrom;
      }
      if (this.filterPriceTo !== 0) {
        params.maxPrice = this.filterPriceTo;
      }
      if (this.filterColorId !== 0) {
        params['colorIds[]'] = this.filterColorId;
      }
      if (this.filterMaterialId.length !== 0) {
        params['materialIds[]'] = this.filterMaterialId;
      }
      if (this.filterSeasonId !== 0) {
        params['seasonIds[]'] = this.filterSeasonId;
      }

      this.loadProductsTimer = setTimeout(() => {
        axios
          .get(`${API_BASE_URL}/api/products`, {
            params,
          })
          .then((response) => { this.productsData = response.data; })
          .catch(() => { console.log('warning'); this.productsLoadingFailed = true; })
          .then(() => { this.productsLoading = false; });
      }, 0);
    },
  },
  created() {
    this.loadProducts();
  },
};
</script>
