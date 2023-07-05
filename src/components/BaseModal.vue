<template>
  <Teleport v-if="open" to="#teleport-target">
    <div class="teleport-blackout"></div>
    <div class="teleport-modal" @click="onOutsideClick">
      <div ref="contentElement" class="teleport-modal__content">
        <button type="button" class="teleport-modal__close " @click="doClose">X</button>
        <slot></slot>
      </div>

    </div>

  </Teleport>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';
import useModal from '@/hooks/useModal';


export default defineComponent({
  props: {
    open: { type: Boolean },
  },

  setup(props, { emit: $emit }) {
    const contentElement = ref(null);
    const { doOpen, doClose } = useModal();
    const onOutsideClick = ($event) => {
      if ($event.target !== contentElement.value && $event.target.contains(contentElement.value)) {
        doCloseModal();
      }
    };
    const doCloseModal = () => {
      $emit('update:open', false);
    };


    watch(() => props.open, (isOpen) => {
      if (isOpen) {
        doOpen();
      } else {
        doClose();
      }

    }, { immediate: true });

    if (props.open) {
      doOpen();
    }

    return {
      onOutsideClick,
      doClose: doCloseModal,
      contentElement,
    };

  }

});



</script>

<style>
.teleport-blackout {
  z-index: 1010;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.75;
  background-color: #000;
}

.teleport-modal {
  z-index: 1010;
  overflow: auto;
  overflow-y: scroll;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 20px;
}

.teleport-modal__content {
  position: relative;
  max-width: 1000px;
  margin-top: auto;
  margin-bottom: auto;
  padding: 40px;
  background-color: #fff;
}

.teleport-modal__close {
  position: absolute;
  top: -1.25em;
  right: -1.25em;
  padding: 10px;
  line-height: 1;
}
</style>