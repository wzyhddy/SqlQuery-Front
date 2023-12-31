import Vue from 'vue'
import VueQueryBuilder from './VueQueryBuilder.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
import axios from "axios";
Vue.config.productionTip = false

import router from './router'

import Router from 'vue-router'
import App from './App.vue'
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
return routerPush.call(this, location).catch(error=> error)
}

let rules = [
  {
    type: "text",
    id: "id",
    label: "Id",
  },
  {
    type: "text",
    id: "userId",
    label: "UserId",
  },
  {
    type: "text",
    id: "name",
    label: "Name",
  },
  {
    type: "text",
    id: "type",
    label: "Type",
  },
  {
    type: "text",
    id: "create_time",
    inputType:"date",
    label: "CreateTime",
    operands: ['Start Date', 'End Date']
  },
    {
      type: "custom-component",
      id: "first_name",
      label: "First Name",
    },
    {
      type: "text",
      id: "last_name",
      label: "Last Name",
    },
    {
      type: "radio",
      id: "plan_type",
      label: "Plan Type",
      choices: [
        {label: "Standard", value: "standard"},
        {label: "Premium", value: "premium"}
      ]
    },
    {
      type: "checkbox",
      id: "sizes",
      label: "Sizes",
      choices: [
        {label: "Small", value: "small"},
        {label: "Medium", value: "medium"},
        {label: "Large", value: "large"}
      ]
    },

    {
      type: "select",
      id: 'select',
      label: 'Color',
      operators: ['=', '<>'],
      choices: [
        {label: "red", value: 'Red'},
        {label: "orange", value: 'Orange'},
        {label: "yellow", value: 'Yellow'},
        {label: "green", value: 'Green'},
        {label: "blue", value: 'Blue'},
        {label: "indigo", value: 'Indigo'},
        {label: "violet", value: 'Violet'},
      ]
    },
  ];
  Vue.prototype.$axios = axios
new Vue({
  el: '#app',
  router,
  axios,
  components: { VueQueryBuilder },
  render: h => h(App),
  data: {
    rules: rules,
    output: {},
  },

  computed: {
    outputFormatted: function() {
      return JSON.stringify(this.output, null, 2);
    }
  },

  methods: {
    updateQuery: function(value){
      this.output = value;
    },
    getSql(sql){
      this.sql = sql
    }

  }
}).$mount('#app');
