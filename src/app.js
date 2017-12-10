import Vue from 'vue';



// import app from './app.vue';
import moment from 'moment';

Vue.filter('fmtdate', (date, fmrStr) => {
  return moment(date).format(fmrStr);
})


import VueRouter from 'vue-router';

Vue.use(VueRouter);

import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:8899/api/';

Vue.prototype.$http = axios;


import home from './components/Home/home.vue';
import member from './components/Member/member.vue';
import shopcar from './components/Shopcar/shopcar.vue';
import search from './components/Search/search.vue';

import news from './components/Home/News/news.vue';
import buy from './components/Home/Buy/buy.vue';
import contact from './components/Home/contact/contact.vue';
import feedback from './components/Home/feedback/feedback.vue';
import share from './components/Home/share/share.vue';
import video from './components/Home/video/video.vue';
import newsDetail from  './components/Home/News/detail.vue';

let router = new VueRouter({
    linkActiveClass: 'mui-active',
    routes: [
      {path: '/', redirect: '/home'},
      {path: '/home', component: home},
      {path: '/member', component: member},
      {path: '/shopcar', component: shopcar},
      {path: '/search', component: search},

      {path: '/news', component: news},
      {path: '/buy', component: buy},
      {path: '/contact', component: contact},
      {path: '/feedback', component: feedback},
      {path: '/share', component: share},
      {path: '/video', component: video},

      {name: 'newsDetail', path: '/news/:id', component: newsDetail, props: true}
    ]
  });


  import app from './app.vue';

  
import '../statics/css/mui.css';

let vm = new Vue({
    el: '#app',
    router,
    render: c => c(app),

    created() {
      this.axios.interceptors.request.use(function(config){
        this.$indicator.open('正在加载...');
        return config;
      }.bind(this),function(error){
        return Promise.reject(error);
      });

      this.axios.interceptors.response.use(function(response){
        this.$indicator.close();
        return response;
      }.bind(this),function(error){
        return Promise.reject(error);
      });
    }
  })