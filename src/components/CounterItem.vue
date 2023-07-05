<template>
  <div style="display: inherit;">
    <button type="button" aria-label="Убрать один товар">
      <svg :width="size" :height="size" fill="currentColor" @click.prevent="MinusItem">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>
    <input aria-label="lorem ipsum" v-model.number="localValue" @change="changeInput()">
    <button type="button" aria-label="Добавить один товар" @click.prevent="PlusItem">
      <svg :width="size" :height="size" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  props: ['size', 'amount'],
  data() {
    return {
      localValue: this.amount
    };
  },
  methods: {
    PlusItem() {
      this.localValue += 1;
      this.$emit('update-amount', this.localValue);
    },
    MinusItem() {
      if (this.localValue != 1) {
        this.localValue -= 1;
        this.$emit('update-amount', this.localValue);
      }

    },
    changeInput: function () {
      this.$emit('update-amount', this.localValue);
    }
  }
}
</script>