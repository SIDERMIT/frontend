<template>
  <div class="UserLegend">
    <Modal v-if="show" @close="$emit('close')" :showBase="false">
          <template slot="title">user legend</template>
          <template slot="content">user content</template>
    </Modal>
  </div>
</template>

<script>
import Modal from '@/components/Modal.vue';

export default {
  name: 'UserLegend',
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