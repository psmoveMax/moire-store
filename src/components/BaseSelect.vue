<template>
  <select name="select" class="form__select form_box" @change="changeInput()">

    <option :value="size.id" v-for="size in $attrs.sizes" :key="size.id">{{ size.title }}</option>
  </select>
</template>

<script>
export default {
  props: ["options"],
  data() {
    return {
      localValue: this.amount
    };
  },
  methods: {
    changeInput: function () {
      this.$emit('update-amount', this.localValue);
    }
  }
}
</script>