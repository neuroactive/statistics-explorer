var current_year;
var current_place_name;
var current_place_population;


// Initialize Vue app
const vue_app = new Vue({
    el: '#content',
    data: {
        // model
        current_year: 2017,
        current_place_name: 'Estonia',
        current_place_population: 1300000
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