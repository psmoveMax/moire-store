<template>
  <BaseFormField :title="title" :error="error">
    <input id="form_fio" v-model="dataValue" class="form__input" :type="type" :placeholder="placeholder"
      :aria-label="title">
  </BaseFormField>
</template>

<script>
import formFieldMixin from '@/mixins/formFieldMixin';

export default {
  props: {
    type: {
      default: 'text',
    }
  },
  mixins: [formFieldMixin]
}
</script>