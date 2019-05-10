var current_year = 2018;
var current_place_name = 'Estonia';
var current_place_population = 1317762;
var zoomLevel = 'county';
var json = $.getJSON({'url': "data/json/population.json", 'async': false});


// Initialize Vue app
const vue_app = new Vue({
        el: '#content',
        data: {
            current_year: current_year,
            current_place_name: current_place_name,
            current_place_population: current_place_population.toLocaleString(),
            zoomLevel: zoomLevel,
        },
        methods: {

            changeMap() {
                console.log(this.zoomLevel)
                var elements = document.getElementsByTagName('g');
                while (elements[0]) elements[0].parentNode.removeChild(elements[0]);
                if (this.zoomLevel === "country") {
                    drawCounties();
                }
                if (this.zoomLevel === "county") {
                    drawCounties();
                }
                if (this.zoomLevel === "municipality") {
                    drawMunicipalities();
                }
            },

            changePyramid() {
                document.getElementById("pyramid").innerHTML = "";
                pyramidBuilder(json.responseJSON[this.current_year], '#pyramid', {height: 400, width: 500});
            }

        },
        mounted: function () {

            this.$nextTick(function () {
                console.log(json);
                pyramidBuilder(json.responseJSON["2018"], '#pyramid', {height: 400, width: 500});
                console.log("In mounted hook.", this);
            });
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
    })
;
