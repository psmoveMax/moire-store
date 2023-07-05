import numberFormat from '@/helpers/numberFormat';
import axios from 'axios';
import { API_BASE_URL } from '@/config';
import { reactive, ref, computed } from 'vue';

export default function () {
  const productData = ref(null);

  const category = computed(() => {
    return productData.value.category;
  });

  const fetchStatus = reactive({
    isFailed: false,
    isLoading: false,
  });

  const fetchProduct = (productId) => {
    fetchStatus.isFailed = false;
    fetchStatus.isLoading = true;
    axios.get(`${API_BASE_URL}/api/products/${productId}`)
      .then((response) => {
        const product = response.data;

        productData.value = Object.assign(product, {
          pricePretty: numberFormat(product.price),
        });
      })
      .catch(() => { fetchStatus.isFailed = true; })
      .then(() => { fetchStatus.isLoading = false; });
  };

  return {
    product: productData,
    category,
    status: fetchStatus,

    fetchProduct,
  };
}
