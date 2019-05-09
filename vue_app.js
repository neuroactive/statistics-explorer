// Initialize Vue app
const vue_app = new Vue({
    el: '#content',
    data: {
        // model
    },
    computed: {
        // active_tab: () => current_state.active_tab
    },
    methods: {
        // change_page: model_functions.change_page
        // change_page: (event) => model_functions.change_page(event, current_state)
    },
    components: {
    },
    mounted: function () {
        this.$nextTick(function () {
            // Code that will run only after the entire view has been rendered (see: https://vuejs.org/v2/api/#mounted)
            console.log("In mounted hook of model view.", this);
            // Start querying for updates on any experiment which isn't completed or failed
            // TODO: This is going to hit the server with multiple requests if there are several algorithms being
            //       trained at once. It would be more efficient to structure things so that information is requested
            //       about the status of outstanding experiments in a single request and the response also processed together.
            model.experiments
                .filter(experiment => experiment.status !== 'Completed' && experiment.status !== 'Failed')
                .forEach(experiment => algorithms_content.methods.start_querying_experiment_status(experiment.experiment_id));
        })
    }
});