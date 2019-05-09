var current_year = 2017;
var current_place_name = 'Estonia';
var current_place_population = '1300000';


// Initialize Vue app
const vue_app = new Vue({
    el: '#content',
    data: {
        current_year: current_year,
        current_place_name: current_place_name,
        current_place_population: current_place_population
    }
    // },
    // computed: {
    //     // active_tab: () => current_state.active_tab
    // },
    // methods: {
    //     // change_page: model_functions.change_page
    //     // change_page: (event) => model_functions.change_page(event, current_state)
    // },
    // components: {
    // },
    // mounted: function () {
    //     this.$nextTick(function () {
    //         // Code that will run only after the entire view has been rendered (see: https://vuejs.org/v2/api/#mounted)
    //         console.log("In mounted hook.", this);
    //     })
    // }
});