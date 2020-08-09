<template>
  <div class="modal-container" @click="$emit('close')">
    <div class="modal" @click.stop>
        <div class="modal-title">
            <slot name="title"></slot>
        </div>
        <div class="modal-content">
            <slot name="content"></slot>
        </div>
        <div class="modal-base" v-if="showBase" >
            <button class="btn solo red" @click="$emit('cancel')">Cancel</button>
            <button class="btn solo" @click="$emit('close')"><slot name="close-button-name">Close</slot></button>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalWarning',
  props: {
    showBase: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
