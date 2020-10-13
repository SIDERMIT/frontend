<template>
<div>
  <div class="linebox" v-bind:class="{error: checkerMessage!==null}">
    <div class="linebox-header">
        <div class="line-input">
            <h4>Line ID</h4>
            <input v-model="route.name" type="text">
        </div>
        <div class="line-input">
            <h4>Mode</h4>
            <select v-model="route.transport_mode_public_id">
                <option selected disabled>Choose one</option>
                <option v-for="transportMode in transportModeSet" v-bind:value="transportMode.public_id" v-bind:key="transportMode.public_id">{{ transportMode.name }}</option>
            </select>
        </div>
        <div class="grid min">
            <button class="btn icon" alt="Show" @click="setVisibility" v-bind:class="{active: ((showInGraphI && showInGraphR) || ((showInGraphI && !showInGraphR) || (!showInGraphI && showInGraphR)))}" ><span class="material-icons">{{ showInGraphI && showInGraphR ? "visibility": ((showInGraphI && !showInGraphR) || (!showInGraphI && showInGraphR))? "vignette":"visibility_off" }}</span></button>
            <button class="btn icon" :alt="collapse?'Open':'Close'" @click="collapse = !collapse"><span class="material-icons">{{ collapse?"arrow_drop_down":"arrow_drop_up" }}</span></button>
        </div>
    </div>
    <div class="linebox-anim" v-bind:class="{open: !collapse}">
        <div class="linebox-content">
            <div class="table min">
                <table>
                    <tbody>
                        <tr>
                            <th colspan="1"><span>Dir</span></th>
                            <th colspan="4"><span>Node sequence</span></th>
                            <th colspan="4"><span>Stop sequence</span></th>
                            <th colspan="1">&nbsp;</th>
                        </tr>
                        <tr>
                            <th colspan="1"><span>I</span></th>
                            <td colspan="4"><input type="text" placeholder="-" v-model="route.nodes_sequence_i" :disabled="route.type==3" v-on:change="$emit('node-sequence-change')"></td>
                            <td colspan="4"><input type="text" placeholder="-" v-model="route.stops_sequence_i" :disabled="route.type==3"></td>
                            <td colspan="1"><button class="btn icon flat" :alt="showInGraphI?'Hide':'Show'" v-bind:class="{active: showInGraphI}" @click="$emit('update-visibility', route, !showInGraphI, showInGraphR)"><span class="material-icons">{{ showInGraphI?"visibility":"visibility_off"}}</span></button></td>
                        </tr>
                        <tr>
                            <th colspan="1"><span>R</span></th>
                            <td colspan="4"><input type="text" placeholder="-" v-model="route.nodes_sequence_r" :disabled="route.type==3" v-on:change="$emit('node-sequence-change')"></td>
                            <td colspan="4"><input type="text" placeholder="-" v-model="route.stops_sequence_r" :disabled="route.type==3"></td>
                            <td colspan="1"><button class="btn icon flat" :alt="showInGraphR?'Hide':'Show'" v-bind:class="{active: showInGraphR}" @click="$emit('update-visibility', route, showInGraphI, !showInGraphR)"><span class="material-icons">{{ showInGraphR?"visibility":"visibility_off"}}</span></button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="checker">
                <Checker v-if="checkerMessage!==null" :isError="true" :message="checkerMessage" />
                <button class="btn neuro" @click="showDeleteConfirmationModal=true"><span>Delete</span><span class="material-icons">delete</span></button>
            </div>
       </div>
    </div>
  </div>
  <Modal v-if="showDeleteConfirmationModal" @cancel="showDeleteConfirmationModal = false" @close="showDeleteConfirmationModal = false" @ok="deleteRow" :showCancelButton="true" :modalClasses="['warning']">
    <template slot="title">
      <div class="icon"><span class="material-icons">warning</span></div>
      <div><h4>Warning</h4></div>
    </template>
    <p slot="content">Are you sure you want to delete route "{{ route.name }}"</p>
    <template slot="close-button-name">Proceed</template>
  </Modal>
  </div>
</template>

<script>
import Modal from '@/components/Modal.vue';
import Checker from '@/components/Checker.vue';

export default {
  name: 'RouteCard',
  components: {
    Modal,
    Checker
  },
  props: {
    route: {
      type: Object,
      required: true
    },
    transportModeSet: {
      type: Array,
      required: true
    },
    transportNetworkPublicId: {
      type: String,
      required: false,
      default: null
    },
    checkerMessage: {
      type: String,
      required: false,
      default: null
    },
    showInGraphI: {
      type: Boolean,
      required: true,
      default: false
    },
    showInGraphR: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data() {
    return {
        showDeleteConfirmationModal: false,
        collapse: true,
    }
  },
  methods: {
    setVisibility() {
      if ((this.showInGraphI && this.showInGraphR) || ((this.showInGraphI && !this.showInGraphR) || (!this.showInGraphI && this.showInGraphR))) {
        this.$emit('update-visibility', this.route, false, false);
      } else if (!this.showInGraphI && !this.showInGraphR) {
        this.$emit('update-visibility', this.route, true, true);
      }
    },
    deleteRow() {
      this.$emit('erase-route', this.route);
    }
  },
  updated() {
    if (this.route.collapse !== undefined) {
      this.collapse = this.route.collapse;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>