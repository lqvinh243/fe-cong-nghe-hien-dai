import * as VeeValidate from 'vee-validate';
import Vue from 'vue';

const config = {
    errorBagName: 'abc', // change if property conflicts.
    fieldsBagName: 'abc',
    inject: false
};
Vue.use(VeeValidate, config);
