import Vue from 'vue';
import App from './App';
import router from './router';
import {isLogin} from '@/utils/isLogin';
import messages from '@/assets/common/js/vue-i18n/lang.js';
import VueI18n from 'vue-i18n';
import VueSocketIO from 'vue-socket.io';
import VueDraggableResizable from '@/components/vue-draggable-resizable';
import clickOutside from '@/directives/clickOutside';
import Vue2TouchEvents from 'vue2-touch-events';
import EasyScroll from '@/components/EasyScroll';
const axios=require('axios');
import VueAxios from 'vue-axios';
import db from './utils/db';
import { store } from './store/store';
import vcolorpicker from 'vcolorpicker';
import { get, post, del, put } from './utils/http';
import { tips } from './utils/publicTools';
import VueClipboards from 'vue-clipboards';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
Vue.use(VueAwesomeSwiper);
Vue.use(VueClipboards);
Vue.use(vcolorpicker);
Vue.component('vue-draggable-resizable', VueDraggableResizable);
Vue.component('EasyScroll', EasyScroll);
Vue.use(Vue.directive('clickOutside', clickOutside));
Vue.use(Vue2TouchEvents);
Vue.use(VueAxios, axios);
Vue.use(VueI18n);
Vue.prototype.dexieDB = db;
Vue.prototype.$get = get;
Vue.prototype.$post = post;
Vue.prototype.$put = put;
Vue.prototype.$del = del;
Vue.prototype.tips = tips;
Vue.config.productionTip = false;
Vue.use(new VueSocketIO({
	connection: 'https://pushdev.24e.co:2120',
	vuex: {
		store,
		options: {
			useConnectionNamespace: true
		},
		actionPrefix: 'SOCKET_',
		mutationPrefix: 'SOCKET_'
	},
}));

function lang() {
	// 将选择的语言存在localStorage中
	let t = window.localStorage.getItem('language');
	if (t) return t;
	// 默认中文
	else return 'cn';
}
const language = lang();

// 自定义 window 的 lang 属性
window.lang = lang();
// 创建一个 i18n 实例
const i18n = new VueI18n({
	locale: language, // set locale
	messages, // set lcoal messages
});


isLogin().then(res=>{
	new Vue({
		el: '#app',
		router,
		i18n,
		store,
		render: h => h(App),
	});
});
