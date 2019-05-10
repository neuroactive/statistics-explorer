// Set dimensions
var width = 600,
    height = 500,
    active = d3.select(null);

// Projection
var projection = d3.geoMercator()
    // .fitExtent([ [0, 0], [800, 600] ], counties);
    .center([25.0136, 58.5953])
    .scale([5000])
    .translate([width / 2, height / 2]);

// Path
var path = d3.geoPath()
    .projection(projection);

// Colour
var population_domain = [0, 1000, 5000, 10000, 20000, 50000, 100000, 500000];
var population_colour = d3.scaleThreshold()
    .domain(population_domain)
    .range(d3.schemeBlues[9]);

// Population data
var population_data = d3.map();

var svg = d3.select("svg.population_by_county");

svg.append("rect")
    .attr("width", width)
    .attr("height", height)
    .on("click", clicked);



var g = svg.append("g");



function drawCounties(){
    // Asynchronous tasks. Load topojson maps and data.
    d3.queue()
        .defer(d3.json, "data/json/counties.json")
        // .defer(d3.json, "data/json/settlements.json")
        .defer(d3.csv, "data/population.csv", function (d) {
            if (isNaN(d.population)) {
                population_data.set(d.id, 0);
            } else {
                population_data.set(d.id, +d.population);
            }
        })
        .await(ready);

    var legendText = ["0", "1000", "5000", "10000", "20000", "50000", "100000", "500000"];
    var legendColors = ["#9ecae1", "#63afd7", "#4ea2d9", "#4292c6", "#2171b5", "#08519c", "#1f4884","08306b"];

        function ready(error, data) {
            if (error) throw error; 
             
    // Debug
    console.log(data);

    // Load population data
    var counties = topojson.feature(data, {
        type: "GeometryCollection",
        geometries: data.objects.maakond.geometries  // counties and Estonia
        // geometries: data.objects.omavalitsus.geometries // municipalities
        // geometries: data.objects.asustusyksus.geometries // settlements
    });

    //Tooltip for the mouseover(hover)
    var tooltip = d3.select('body').append('div')
            .attr('class', 'hidden tooltip');

    // Draw the map
    g.append("g")
        .attr("id", "counties")
        .selectAll("path")
        .data(counties.features)
        .enter()
        .append("path")
        .attr("d", path)
        // .attr("fill", "steelblue")
        .attr("fill", function(d) {
            // var value = population_data.get(d.properties.OKOOD);
            // var value = population_data.get(d.properties.MKOOD);
            // return (value != 0 ? population_colour(value) : "steelblue");
            return population_colour(d.population = population_data.get(d.properties.MKOOD));
        })
        .on("click", clicked)
        .on('mousemove', function(d) {
            var mouse = d3.mouse(svg.node()).map(function(d) {
                return parseInt(d);
            });
            tooltip.classed('hidden', false)
                .attr('style', 'left:' + (mouse[0]) +
                        'px; top:' + (mouse[1] + 30) + 'px')
                .html(d.properties.MNIMI);
        })
        .on('mouseout', function() {
            tooltip.classed('hidden', true);
        });;

    g.append("path")
        .datum(topojson.mesh(data, data.objects.maakond, function(a, b) { return a !== b; }))
        .attr("id", "county_borders")
        .attr("d", path);

    var legend = svg.append("g")
        .attr("id", "legend");

    var legenditem = legend.selectAll(".legenditem")
        .data(d3.range(8))
        .enter()
        .append("g")
        .attr("class", "legenditem")
        .attr("transform", function(d, i) { return "translate(" + i * 31 + ",0)"; });

    legenditem.append("rect")
        .attr("x", width - 550)
        .attr("y", 30)
        .attr("width", 30)
        .attr("height", 6)
        .attr("class", "rect")
        .style("fill", function(d, i) { return legendColors[i]; });

    legenditem.append("text")
        .attr("x", width - 550)
        .attr("y", 20)
        .style("text-anchor", "middle")
        .text(function(d, i) { return legendText[i]; });
        }


}

function drawMunicipalities(){
    d3.queue()
        .defer(d3.json, "data/json/municipalities.json")
        // .defer(d3.json, "data/json/settlements.json")
        .defer(d3.csv, "data/population.csv", function (d) {
            if (isNaN(d.population)) {
                population_data.set(d.id, 0);
            } else {
                population_data.set(d.id, +d.population);
            }
        })
        .await(ready);
    var legendText = ["0", "1000", "5000", "10000", "20000", "50000", "100000", "500000"];
    var legendColors = ["#9ecae1", "#63afd7", "#4ea2d9", "#4292c6", "#2171b5", "#08519c", "#1f4884","08306b"];


    
    // Callback function
    function ready(error, data) {
        if (error) throw error;
        // Debug
    console.log(data);

    // Load population data
    var municipalities = topojson.feature(data, {
        type: "GeometryCollection",
        //geometries: data.objects.maakond.geometries  // counties and Estonia
        geometries: data.objects.omavalitsus.geometries // municipalities
        // geometries: data.objects.asustusyksus.geometries // settlements
    });

    //Tooltip for the mouseover(hover)
    var tooltip = d3.select('body').append('div')
            .attr('class', 'hidden tooltip');

    // Draw the map
    g.append("g")
        .attr("id", "municipalities")
        .selectAll("path")
        .data(municipalities.features)
        .enter()
        .append("path")
        .attr("d", path)
        // .attr("fill", "steelblue")
        .attr("fill", function(d) {
            // var value = population_data.get(d.properties.OKOOD);
            // var value = population_data.get(d.properties.MKOOD);
            // return (value != 0 ? population_colour(value) : "steelblue");
            return population_colour(d.population = population_data.get(d.properties.MKOOD));
        })
        .on("click", clicked)
        .on('mousemove', function(d) {
            var mouse = d3.mouse(svg.node()).map(function(d) {
                return parseInt(d);
            });
            tooltip.classed('hidden', false)
                .attr('style', 'left:' + (mouse[0]) +
                        'px; top:' + (mouse[1] + 30) + 'px')
                .html(d.properties.MNIMI);
        })
        .on('mouseout', function() {
            tooltip.classed('hidden', true);
        });;

    g.append("path")
        .datum(topojson.mesh(data, data.objects.maakond, function(a, b) { return a !== b; }))
        .attr("id", "county_borders")
        .attr("d", path);

    var legend = svg.append("g")
        .attr("id", "legend");

    var legenditem = legend.selectAll(".legenditem")
        .data(d3.range(8))
        .enter()
        .append("g")
        .attr("class", "legenditem")
        .attr("transform", function(d, i) { return "translate(" + i * 31 + ",0)"; });

    legenditem.append("rect")
        .attr("x", width - 550)
        .attr("y", 30)
        .attr("width", 30)
        .attr("height", 6)
        .attr("class", "rect")
        .style("fill", function(d, i) { return legendColors[i]; });

    legenditem.append("text")
        .attr("x", width - 550)
        .attr("y", 20)
        .style("text-anchor", "middle")
        .text(function(d, i) { return legendText[i]; });

    
}

}

drawCounties();

function clicked(d) {
    // Debug
    console.log("Map was clicked.");
    if (typeof d !== 'undefined') {
        console.log(d.properties.MNIMI);
        vue_app.current_place_name = d.properties.MNIMI;
        vue_app.current_place_population = d.population;
    };

    if (active.node() === this) return reset();
    active.classed("active", false);
    active = d3.select(this).classed("active", true);

    var bounds = path.bounds(d),
        dx = bounds[1][0] - bounds[0][0],
        dy = bounds[1][1] - bounds[0][1],
        x = (bounds[0][0] + bounds[1][0]) / 2,
        y = (bounds[0][1] + bounds[1][1]) / 2,
        scale = .9 / Math.max(dx / width, dy / height),
        translate = [width / 2 - scale * x, height / 2 - scale * y];

    g.transition()
        .duration(750)
        .style("stroke-width", 1.5 / scale + "px")
        .attr("transform", "translate(" + translate + ")scale(" + scale + ")");

        // // Debug
        // console.log("x: " + x + ", y:" + y + " , k: " + k);
}

// function update(year){
//     let slider = d3.select(".slider");
//     slider.property("value", year);
//     d3.select(".year").text(year);
//     // countyShapes.style("fill", function(d) {
//     //     return color(d.properties.years[year][0].rate)
//     // });
//     // current_year = year;
// }

// var slider = d3.select(".slider")
//     .append("input")
//     .attr("type", "range")
//     .attr("min", 1996)
//     .attr("max", 2018)
//     .attr("value", current_year)
//     .attr("step", 1)
//     .on("input", function() {
//         var year = this.value;
//         update(year);
//     });

// update(1996);


function reset() {
    active.classed("active", false);
    active = d3.select(null);

    g.transition()
        .duration(500)
        .style("stroke-width", "1.5px")
        .attr("transform", "");

    // Reset data values to country level
    vue_app.current_place_name = 'Estonia';
    vue_app.current_place_population = 1300000;
}

