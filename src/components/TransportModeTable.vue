<template>
  <div class="TransportModeTable">
    <div class="table">
      <table>
        <tbody>
          <tr>
            <th>&nbsp;</th>
            <th><span>Mode name</span></th>
            <th><span>𝐶𝑜<br>[$/h−𝑣𝑒h]</span></th>
            <th><span>𝐶1<br>[$/h−𝑝𝑎𝑥]</span></th>
            <th><span>𝐶2<br>[$/h−𝑘𝑚]</span></th>
            <th><span>𝜈<br>[𝑘𝑚/h]</span></th>
            <th><span>B&A<br>Sequential</span></th>
            <th><span>𝑡<br>[𝑠/𝑝𝑎𝑥]</span></th>
            <th><span>𝜃</span></th>
            <th><span>𝑡𝑎𝑡<br>[𝑚𝑖𝑛]</span></th>
            <th><span>𝐷</span></th>
            <th><span>𝐾𝑚𝑎𝑥<br>[𝑝𝑎𝑥/𝑣𝑒h]</span></th>
            <th><span>𝑓𝑚𝑎𝑥<br>[𝑣𝑒h/h]</span></th>
            <th><span>𝑓ini<br>[veh/hr]</span></th>
          </tr>
          <tr v-for="(tm, index) in rows" v-bind:key="index">
            <td><button v-if="extras[index].disabled" class="btn icon" @click="showDeleteModal(tm.name, index, tm.public_id)" alt="delete"><span class="material-icons">delete</span></button></td>
            <td><input v-model="tm.name" v-bind:class="{ error: (tm.name === null || tm.name === '') }" type="text" placeholder="-" :disabled="extras[index].disabled"></td>
            <td><input v-model="tm.co" v-bind:class="{ error: (tm.co === null || tm.co === '') }" type="text" placeholder="-" :disabled="extras[index].disabled"></td>
            <td><input v-model="tm.c1" v-bind:class="{ error: (tm.c1 === null || tm.c1 === '') }" type="text" placeholder="-" :disabled="extras[index].disabled"></td>
            <td><input v-model="tm.c2" v-bind:class="{ error: (tm.c2 === null || tm.c2 === '') }" type="text" placeholder="-" :disabled="extras[index].disabled"></td>
            <td><input v-model="tm.v" v-bind:class="{ error: (tm.v === null || tm.v === '') }" type="text" placeholder="-" :disabled="extras[index].disabled"></td>
            <td>
              <label class="switch big">
                <input v-model="extras[index].bya" type="checkbox" :disabled="extras[index].disabled">
                <div class="switch-body">
                    <span class="text-on">Yes</span>
                    <span class="text-off">No</span>
                </div>
              </label>
            </td>
            <td><input v-model="tm.t" v-bind:class="{ error: (tm.t === null || tm.t === '') }" type="text" placeholder="-" :disabled="extras[index].disabled"></td>
            <td><input v-model="tm.theta" v-bind:class="{ error: (tm.theta === null || tm.theta === '') }" type="text" placeholder="-" :disabled="extras[index].disabled"></td>
            <td><input v-model="tm.tat" v-bind:class="{ error: (tm.tat === null || tm.tat === '') }" type="text" placeholder="-" :disabled="extras[index].disabled"></td>
            <td><input v-model="tm.d" v-bind:class="{ error: (tm.d === null || tm.d=== '') }" type="text" placeholder="-" :disabled="extras[index].disabled"></td>
            <td><input v-model="tm.kmax" v-bind:class="{ error: (tm.kmax === null || tm.kmax === '') }" type="text" placeholder="-" :disabled="extras[index].disabled"></td>
            <td><input v-model="tm.fmax" v-bind:class="{ error: (tm.fmax === null || tm.fmax === '') }" type="text" placeholder="-" :disabled="extras[index].disabled"></td>
            <td><input v-model="tm.fini" v-bind:class="{ error: (tm.fini === null || tm.fini === '') }" type="text" placeholder="-" :disabled="extras[index].disabled"></td>
          </tr>
        </tbody>
      </table>
      <div class="checker">
        <div>
          <Checker v-if="checker.show" :isError="checker.isError" :message="checker.message" ></Checker>
        </div>
        <template v-if="isAddingRow">          
          <div class="grid min">
            <button class="btn red" @click="cancelAddRow"><span class="material-icons">close</span><span>Cancel</span></button>
            <button class="btn" @click="saveRow(rows[rows.length - 1], rows.length - 1)"><span class="material-icons">check</span><span>Save mode</span></button>
          </div>
        </template>
        <template v-else>
          <button class="btn" @click="addRow"><span class="material-icons">add</span><span>Add mode</span></button>
        </template>
      </div>
    </div>
    <Modal v-if="showDeleteConfirmationModal" @cancel="showDeleteConfirmationModal = false" @close="showDeleteConfirmationModal = false" @ok="deleteRow" :showCancelButton="true" :modalClasses="['warning']">
      <template slot="title">
        <div class="icon"><span class="material-icons">warning</span></div>
        <div><h4>Warning</h4></div>
      </template>
      <p slot="content">Are you sure you want to delete transport mode "{{ deleteModalData.name }}"</p>
      <template slot="close-button-name">Yes</template>
      <template slot="cancel-button-name">No</template>
    </Modal>
  </div>
</template>

<script>
import Modal from '@/components/Modal.vue';
import Checker from '@/components/Checker.vue';
import scenesAPI from '@/api/scenes.api';

export default {
  name: 'TransportModeLegend',
  components: {
    Modal,
    Checker
  },
  props: {
    scenePublicId: {
      type: String,
      required: false,
      default: null
    },
    rows: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
        isAddingRow: false,
        deleteModalData: {
          name: null,
          index: null,
          publicId: null
        },
        checker: {
          show: false,
          message: '',
          isError: false,
        },
        extras: [],
        showDeleteConfirmationModal: false
    }
  },
  watch: {
    rows: function (newRows) {
      if (newRows.length !== this.extras.length) {
        let diff = newRows.length - this.extras.length;
        for (let i=newRows.length - diff; i<newRows.length; i++) {
          this.addExtraAttributes(newRows[i].bya);
        }
      }
    }
  },
  methods: {
    addExtraAttributes(bya, disabled) {
      disabled = disabled !== false;
      this.extras.push({
        disabled: disabled,
        bya: Boolean(bya)
      });
    },
    showDeleteModal(name, index, publicId) {
        this.showDeleteConfirmationModal = true;
        this.deleteModalData.name = name;
        this.deleteModalData.index = index;
        this.deleteModalData.publicId = publicId;
    },
    addRow() {
      let newRow = {
        name: null,
        co: null,
        c1 : null,
        c2 : null,
        v: null,
        bya: 0,
        t: null,
        fini: null,
        fmax: null,
        kmax: null,
        theta: null,
        tat: null,
        d: null
      }
      this.rows.push(newRow);
      this.addExtraAttributes(newRow.bya, false);
      this.isAddingRow = true;
      this.checker.show = false;
    },
    sanitizeRow(row, index) {
      let copiedRow = JSON.parse(JSON.stringify(row));
      copiedRow.bya = this.extras[index].bya ? 1 : 0;

      return copiedRow;
    },
    saveRow(row, index) {
      let copiedRow = this.sanitizeRow(row, index);
      
      if (this.scenePublicId !== null) {
        scenesAPI.createTransportMode(this.scenePublicId, copiedRow).then(response => {
          this.checker.isError = false;
          this.checker.message = 'Transport mode is valid';
          this.checker.show = true;
          
          copiedRow.public_id = response.data.public_id;

          this.isAddingRow = false;
          this.rows.splice(index, 1);
          this.extras[index].disabled=true;
          this.$emit('new-transportmode', copiedRow);
        }).catch(error => {
          let message = '';
          let data = error.response.data;
          if (Array.isArray(data)) {
            message = data[0];
          } else {
            let fieldName = Object.getOwnPropertyNames(data)[0]
            message = data[fieldName][0];
            if (message === 'This field is required.') {
              message = 'Fields can not be empty';
            }
          }

          this.checker.isError = true;
          this.checker.message = message;
          this.checker.show = true;
        });
      } else {
        scenesAPI.checkTransportMode(copiedRow).then(() => {
          this.checker.isError = false;
          this.checker.message = 'Transport mode is valid';
          this.checker.show = true;
          
          this.isAddingRow = false;
          this.rows.splice(index, 1);
          this.extras[index].disabled=true;
          this.$emit('new-transportmode', copiedRow);
        }).catch(error => {
          let data = error.response.data;
          let fieldName = Object.getOwnPropertyNames(data)[0]
          let message = data[fieldName][0];
          if (message === 'This field is required.') {
            message = 'Fields can not be empty';
          }
          this.checker.isError = true;
          this.checker.message = message;
          this.checker.show = true;
        });
      }
    },
    cancelAddRow() {
      this.rows.pop();
      this.extras.pop();
      this.isAddingRow = false;
      this.checker.show = false;
    },
    deleteRow() {
      let index = this.deleteModalData.index;
      let row = this.rows[index];
      let copiedRow = this.sanitizeRow(row, index);

      if (this.scenePublicId !== null && Object.prototype.hasOwnProperty.call(row, 'public_id')) {
        scenesAPI.deleteTransportMode(this.scenePublicId, row.public_id).then(() => {
          this.extras.splice(index, 1);
          this.$emit('erase-transportmode', copiedRow, index);
        }).catch(error => {
          let message = this.getErrorMessage(error.response.data);
          this.checker.isError = true;
          this.checker.message = message;
        });
      } else {
        this.extras.splice(index, 1);
        this.$emit('erase-transportmode', copiedRow, index);
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>