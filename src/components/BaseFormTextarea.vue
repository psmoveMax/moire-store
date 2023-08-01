<template>
  <BaseFormField :title="title" :error="error">
    <textarea v-model="dataValue" id="form_comment" class="form__input form__input--area" :placeholder="placeholder"
      :aria-label="title"></textarea>
  </BaseFormField>
</template>

<script>
import formFieldMixin from '@/mixins/formFieldMixin';

export default {
  props: ['value'],
  mixins: [formFieldMixin]
}
</script>