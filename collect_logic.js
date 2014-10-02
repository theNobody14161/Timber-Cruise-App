
function onButtonPress(clicked) {
	console.log('called on button press wik', clicked);
	recordTree(getSpecies(), clicked.getAttribute('product_type'), clicked.getAttribute('number_of_sticks'), getPlotNumber());
}

var speciesList
var data= [];
function recordTree(tree_species, product_type, number_of_sticks, plot_number) {
// add some storage stuff
data.push({
    'tree_species': tree_species,
    'product_type': product_type,
    'number_of_sticks': number_of_sticks,
    'plot_number': plot_number,
    'count': count
    });
}

function getIndexofRecordChange(product_type, number_of_sticks, tree_species){
    var index=data.length+1;
    for(var i = 0; i < data.length; ++i){
        if (data[i].product_type == product_type &&
        data[i].number_of_sticks == number_of_sticks &&
        data[i].tree_species == tree_species){
        index=i;
            }
        }
    }
    return index;
}

function buttonText(product_type, number_of_sticks){
var outext=""
    for(var i = 0; i<speciesList.length; ++i){
       var q = getIndexofRecordChange(product_type, number_of_sticks, speciesList[i])
       if(q != data.length+1){
          outext += data[q].tree_species + " " + data[q].count + "\n"
          }
    }
}

function getSpecies(){
    return getValueFromDropdownMenu;
}

function getPlotNumber(){
    return getValueFromDropdownMenu;
}

function toCSV(){
for(j in 1 to data.length){
table += data[i].plot_number + "," + data[i].tree_species + "," + data[i].number_of_sticks + "," + data.product_type + "," + data.count +"\n"}    
return ;
}

var MAX_NUMBER_OF_STICKS = 8;
var PRODUCT_TYPES = ['sawlogs', 'pulpsticks'];
function generateButtons(){
    var output_html = "<table>";
    for(var i = 0; i < MAX_NUMBER_OF_STICKS; ++i){
        output_html += "<tr>";
        for(var j = 0; j < PRODUCT_TYPES.length; ++j) {
        makebutton()
        textonbutton=buttonText(PRODUCT_TYPES[j],i)
            output_html += '<td onclick="onButtonPress(this)" number_of_sticks="' + i + '" product_type="' + PRODUCT_TYPES[j] +'"> ' +  + '</td>';
        }
        output_html += "</tr>\n";
    }
	 output_html += "</html>";
	 return output_html;
}

function fillInTable(id) {
	alert('called fillInTable');
	var div = document.getElementById(id);
	div.innerHTML = generateButtons();
}

