
function onButtonPress(clicked) {
    recordTree(getSpecies(), clicked.product_type, clicked.number_of_sticks, getPlotNumber());
}

var data= [];
function recordTree(tree_species, product_type, number_of_sticks, plot_number) {
// add some storage stuff
data.push({
    'tree_species': tree_species, 
    'product_type': product_type, 
    'number_of_sticks': number_of_sticks, 
    'plot_number': plot_number
    });
}

function getStringCountOfSpecies(product_type, number_of_sticks){
    var map_of_species_to_counts = {};
    for(var i = 0; i < data.length; ++i){
        if (data[i].product_type == product_type && 
        data[i].number_of_sticks == number_of_sticks){
        // TODO: worry about initial case (? +1 = what?)
            var old_count = map_of_species_to_counts[data[i].tree_species];
            if (typeof oldcount === 'undefined'){
                oldcount = 0;
            }
            map_of_species_to_counts[data[i].tree_species] = old_count + 1;
        }
    }
    // TODO: make this look more pretty/readable
    return JSON.stringify(map_of_species_to_counts);
}

function getSpecies(){
    return "birch";
}

function getPlotNumber(){
    return 0;
}

function toCSV(){
    return "not,implemented,yet\n";
}

var MAX_NUMBER_OF_STICKS = 8;
var PRODUCT_TYPES = ['sawlogs', 'pulpsticks'];
function generateButtons(){
    var output_html = "";
    for(var i = 0; i < MAX_NUMBER_OF_STICKS; ++i){
        output_html += "<tr>";
        for(var j = 0; j < PRODUCT_TYPES.length; ++j) {
            output_html += '<td onclick="onButtonPress(this)" number_of_sticks="' + i + '" product_type="' + PRODUCT_TYPES[j] +'"> ' + getStringCountOfSpecies(PRODUCT_TYPE[j], i, getPlotNumber()) + '</td>';
        }
        output_html += "</tr>\n";
    }
}