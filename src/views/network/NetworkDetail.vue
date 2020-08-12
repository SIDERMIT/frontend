<template>
  <div class="NetworkDetail">
    <div class="header">          
        <h1>Network detail</h1>
    </div>

  </div>
</template>

<script>
import transportNetworksAPI from '@/api/transportNetworks.api';

export default {
  name: 'NetworkDetail',
  components: {
    
  }, 
  methods: {
    setData(transportNetwork) {
      this.transportNetwork = transportNetwork;
    },
  },
  beforeRouteEnter (to, from, next) {
    transportNetworksAPI.getTransportNetwork(to.params.transportNetworkPublicId).then(response => (next(vm => vm.setData(response.data))));
  },
  beforeRouteUpdate(to, from, next) {
    this.city = {};
    transportNetworksAPI.getTransportNetwork(to.params.transportNetworkPublicId).then(response => {
      this.setData(response.data); 
      next();
    });
  }
}
</script>
