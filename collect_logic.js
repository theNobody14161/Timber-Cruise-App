
function onButtonPress(e) {
	var clicked = e.target;
	leftClickButton(clicked.getAttribute('product_type'), clicked.getAttribute('number_of_sticks'));
}
function onOButtonPress(e) {
	var clicked = e.target;
	rightClickButton(clicked.getAttribute('product_type'), clicked.getAttribute('number_of_sticks'));
}

var speciesList = ['AS', 'RO', 'BO', 'SM', 'RM','HM','SM','RP','WP','WS','BS','WO','BH','AB','PB','JP','BW','GA','BA']
var plotMax = 3;
var data= {};


function getSpecies(){
	var obj = document.getElementById('species_menu');
	if (obj.selectedIndex == -1){ //nothing selected
		return speciesList[0];
	}
	return obj.options[obj.selectedIndex].value;
}

function getPlotNumber(){
	var obj = document.getElementById('plot_menu');
	if (obj.selectedIndex == -1){ // nothing selected
		return "1";
	}
	return obj.options[obj.selectedIndex].value;
}


var MAX_NUMBER_OF_STICKS = 8;
var PRODUCT_TYPES = ['sawlogs', 'pulpsticks'];

function editData(plot,productType,numStick,species,change){
	if (data[plot] == undefined){
		data[plot] = {};
	}
	if (data[plot][productType] == undefined){
		data[plot][productType] = {};
	}
	if (data[plot][productType][numStick] == undefined){
		data[plot][productType][numStick] = {};
	}
	if (data[plot][productType][numStick][species] == undefined) {
		data[plot][productType][numStick][species] = 0;
	}
	data[plot][productType][numStick][species] += change;
	refreshData();
}

function buttonText(productType,numStick){
	try {
		return JSON.stringify(data[getPlotNumber()][productType][numStick]);
	} catch(err){
		console.log(err);
	}
	return "No data";
}

function generateButtons(){
	var output_html = "<table style='border: 1px solid black; border-collapse: collapse;'>";
	for(var i = 0; i < MAX_NUMBER_OF_STICKS; ++i){
		output_html += "<tr style='border: 1px solid black; border-collapse: collapse;'>";
		for(var j = 0; j < PRODUCT_TYPES.length; ++j) {
			text_on_button = buttonText(PRODUCT_TYPES[j],i)
			output_html += '<td onclick="onButtonPress(event)" oncontextmenu="onOButtonPress(event)" number_of_sticks="' + i + '" product_type="' + PRODUCT_TYPES[j] +'" style="border: 1px solid black; border-collapse: collapse;"> ' + text_on_button + '</td>';
	}
		output_html += "</tr>\n";
	}
	output_html += "</html>";
	return output_html;
}

function leftClickButton(buttonProduct,buttonNumStick){
	editData(getPlotNumber(),buttonProduct,buttonNumStick,getSpecies(),1);
}

function rightClickButton(buttonProduct,buttonNumStick){
	editData(getPlotNumber(),buttonProduct,buttonNumStick,getSpecies(),-1);
}

function makeCSV(){
	var comma = ",";
	var outext="Plot, Product type, Number of sticks, Species, Count";
	for(a in data){
		for (b in data[a]){
			for (c in data[a][b]){
				for (d in data[a][b][c]){
					outext += a+comma+b+comma+c+comma+d+comma+data[a][b][c][d];
				}
			}
		}
	}
	return(outext);
}

function generatePlotMenu(){
	var selected = getPlotNumber();
	var out = "";
	for (var i = 1; i <= plotMax; ++i){
		if (i == selected){
			out += "<option value='"+i+"' selected='True'>"+i+"</option>";
		} else {
			out += "<option value='"+i+"'>"+i+"</option>";
		}
	}
	return out;
}

function generateSpeciesMenu(){
	var selected = getSpecies();
	var out = "";
	for (var i = 0; i < speciesList.length; ++i){
		if(speciesList[i] == selected){
			out += "<option value='"+speciesList[i]+"' selected='True'>"+speciesList[i]+"</option>";
		} else {
			out += "<option value='"+speciesList[i]+"'>"+speciesList[i]+"</option>";
		}
	}
	return out;
}

function refreshData(){
	document.getElementById('click_table').innerHTML = generateButtons();
	document.getElementById('plot_menu').innerHTML = generatePlotMenu();
	document.getElementById('species_menu').innerHTML = generateSpeciesMenu();
}
