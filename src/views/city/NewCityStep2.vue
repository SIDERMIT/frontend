<template>
    <div class="NewCityStep2">
        <div class="header">
            <h1>Demand definition</h1>
        </div>
        <section class="grid step2-definition">
            <div>
                <div class="subtitle">
                    <h2>Define symmetric demand by parameters</h2>
                </div>
                <div class="subtitle">
                    <div class="grid center">
                        <h4>Enter parameters (pick hour model)</h4>
                        <a class="icon-link"><span class="material-icons">help</span></a>
                    </div>
                </div>
                <div class="table">
                    <table>
                        <tbody>
                            <tr>
                                <th><span>𝑛</span></th>
                                <th><span>𝑌[𝑝𝑎𝑥/h]</span></th>
                                <th><span>a</span></th>
                                <th><span>𝛼</span></th>
                                <th><span>𝛽</span></th>
                            </tr>
                            <tr>
                                <td><input v-model="city.n" :disabled="true" type="text" placeholder="-"/></td>
                                <td><input v-model="city.y" type="text" placeholder="-"/></td>
                                <td><input v-model="city.a" type="text" placeholder="-"/></td>
                                <td><input v-model="city.alpha" type="text" placeholder="-"/></td>
                                <td><input v-model="city.beta" type="text" placeholder="-"/></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="checker">
                    <div class="grid checker-body">
                        <span class="material-icons icon ok">check</span>
                        <span class="text">Table correctly defined</span>
                    </div>
                </div>
                <div class="flex flex-end">
                    <button class="btn"><span class="material-icons">edit</span><span>Edit parameters</span></button>
                </div>
                <button class="btn full main">Render OD matrix</button>
            </div>
            <div class="graph-container"><CityGraph :network="city.network_descriptor"></CityGraph></div>
        </section>
        <section>
            <h2>OD Matrix</h2>
            <div class="subtitle">
                <h4>Transport modes and users settings for the city</h4>
            </div>
            <div class="empty-box">
                <p>You have not generated your matrix yet, you can import data from csv file.</p>
                <a href="#" class="btn">
                    <span class="material-icons">publish</span>
                    <span>Import CSV file</span>
                </a>
            </div>
        </section>
        <footer>
            <div class="container full grid">
                <div class="left-content">
                </div>
                <div class="right-content">
                    <a class="btn">
                        <span class="material-icons">chevron_left</span>
                        <span>Back</span>
                    </a>
                    <a class="btn" @click="updateCity">
                        <span>Next</span>
                        <span class="material-icons">chevron_right</span>
                    </a>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
import CityGraph from '@/components/CityGraph.vue';
import citiesAPI from '@/api/cities.api';

export default {
  name: 'NewCityStep2',
  components: {
    CityGraph,
  },
  data() {
    return {
        city: {
            n: null,
            y: null,
            a: null,
            alpha: null,
            beta: null,
            network_descriptor: {
                nodes: [],
                edges: []
            }
        }
    }
  },
  methods: {
    setData(city) {
      this.city = city;
    },
    updateCity() {
        // TODO: fixed this
        citiesAPI.updateCity(this.newCity.name, this.newCity.n, this.newCity.p, this.newCity.l, this.newCity.g, this.newCity.graph)
        .then(response => {
            this.$router.push({name: 'NewCityStep2', params: {cityPublicId: response.data.public_id}})
        }).catch(error => {
            let data = error.response.data;
            let message = '<b>Please correct the following error(s):</b><br /><br />';
            for (let key in data) {
                message += `<b>${key}:</b><ul>`;
                data[key].forEach(el => {
                   message += `<li>${el}</li>`; 
                });
                message += '</ul>'
            }
            this.modalData.message = message;
            this.modalData.showCancelButton = false
            this.modalData.closeButtonName = 'OK'
            this.showWarningModal = true;
        });
    }
  },
  beforeRouteEnter (to, from, next) {
    citiesAPI.getCity(to.params.cityPublicId).then(response => (next(vm => vm.setData(response.data))));
  },
  beforeRouteUpdate(to, from, next) {
    this.city = {};
    citiesAPI.getCity(to.params.cityPublicId).then(response => {
      this.setData(response.data); 
      next();
    });
  }
}
</script>
