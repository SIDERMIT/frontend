import moment from 'moment';

let dateMixin = {
  methods: {
    getLocalDate(dateObj) {
        return moment(dateObj).format("YYYY-MMM-DD");
    }
  }
}

export default dateMixin;