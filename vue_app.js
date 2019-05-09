var current_year = 2017;
var current_place_name = 'Estonia';
var current_place_population = '1300000';

var exampleData = [{ age: '0-9', male: 10, female: 12 }, { age: '10-19',
  male: 14, female: 15 }, { age: '20-29', male: 15, female: 18 }, { age:
    '30-39', male: 18, female: 18 }, { age: '40-49', male: 21, female: 22 }, {
      age: '50-59', male: 19, female: 24 }, { age: '60-69', male: 15, female: 14 }, {
        age: '70-79', male: 8, female: 10 }, { age: '80-89', male: 4, female: 5 }, {
          age: '90+', male: 2, female: 3 }];


// Initialize Vue app
const vue_app = new Vue({
    el: '#content',
    data: {
        current_year: current_year,
        current_place_name: current_place_name,
        current_place_population: current_place_population,
        exampleData: exampleData
    },
    mounted: function () {
             this.$nextTick(function () {
                 // Code that will run only after the entire view has been rendered (see: https://vuejs.org/v2/api/#mounted)
                 pyramidBuilder(exampleData, '#pyramid', {height: 400, width: 500});
                 console.log("In mounted hook.", this);
             })
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