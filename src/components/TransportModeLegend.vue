<template>
  <div class="TransportModeLegend">
    <Modal v-if="show" @close="$emit('close')" :showBase="false">
          <template slot="title">transport mode legend</template>
          <template slot="content">transport mode content</template>
    </Modal>
  </div>
</template>

<script>
import Modal from '@/components/Modal.vue';

export default {
  name: 'TransportModeLegend',
  components: {
    Modal
  },
  props: {
    show: {
      type: Boolean,
      default: false,
      required: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>