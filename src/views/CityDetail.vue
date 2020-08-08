<template>
    <div class="CityDetail">
        <div class="header">            
            <h1>{{ city.name }}</h1>
            <span class="p-min">Created at {{ getLocalDate(city.created_at) }}</span>
        </div>
        <section class="city-details">
            <div class="graph-container">
                <CityGraph :city="city"></CityGraph>
            </div>
            <div>
                <h2>City parameters</h2>
                <div class="table">
                    <div class="table-title">
                        <h4>Simetric city's parameters</h4>
                    </div>
                    <table>
                        <tbody>
                            <tr>
                                <th><span>𝑛</span></th>
                                <th><span>𝑃[𝑘𝑚]</span></th>
                                <th><span>𝐿[𝑘𝑚]</span></th>
                                <th><span>𝑔</span></th>
                            </tr>
                            <tr>
                                <td><span>2</span></td>
                                <td><span>2</span></td>
                                <td><span>10000</span></td>
                                <td><span>0.5</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <button class="btn"><span class="material-icons">chevron_right</span><span>View matrix</span></button>
            </div>
        </section>
        <section>
            <h2>Stages</h2>
            <div class="subtitle">
                <h4>Transport modes and users settings for the city</h4>
            </div>
            <div class="empty-box">
                <p>There is no defined stages for this project. start by creating a new one</p>
                <a href="#" class="btn">
                    <span>Add new stage</span>
                    <span class="material-icons">add</span>
                </a>
            </div>
        </section>
        <footer>
            <div class="container full grid">
                <div class="left-content">
                </div>
                <div class="right-content">
                    <a class="btn red">
                        <span class="material-icons">edit</span>
                        <span>Edit city</span>
                    </a>
                    <a class="btn">
                        <span>Add new stage</span>
                        <span class="material-icons">add</span>
                    </a>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
import cities from '@/api/cities.api';
import dateMixin from '@/mixins/dateMixin.js'
import CityGraph from '@/components/CityGraph'

export default {
  name: 'CityDetail',
  mixins: [dateMixin],
  components: {
    CityGraph
  },
  data() {
    return {
      city: {}
    }
  },
  methods: {
    setData(city) {
      this.city = city;
    }
  },
  beforeRouteEnter (to, from, next) {
    cities.getCity(to.params.cityPublicId).then(response => (next(vm => vm.setData(response.data))));
  },
  beforeRouteUpdate(to, from, next) {
    this.city = {};
    cities.getCity(to.params.cityPublicId).then(response => {
      this.setData(response.data); 
      next();
    });
  }
}
</script>
