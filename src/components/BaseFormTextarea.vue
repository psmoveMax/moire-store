<template>
  <BaseFormField :title="title" :error="error">
    <textarea id="form_comment" v-model="dataValue" class="form__input form__input--area" :placeholder="placeholder"
      :aria-label="title"></textarea>
  </BaseFormField>
</template>

<script>
import formFieldMixin from '@/mixins/formFieldMixin';

export default {
  mixins: [formFieldMixin]
}
</script>