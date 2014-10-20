
function onButtonPress(e) {
	var clicked = e.target;
	rightClickButton(clicked.getAttribute('product_type'), clicked.getAttribute('number_of_sticks'));
}

var speciesList = ['aspen']
var plotMax = 1;
var data= {};


function getSpecies(){
	return "aspen";
}

function getPlotNumber(){
	return 1;
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
	initData();
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
			output_html += '<td onclick="onButtonPress(event)" number_of_sticks="' + i + '" product_type="' + PRODUCT_TYPES[j] +'" style="border: 1px solid black; border-collapse: collapse;"> ' + text_on_button + '</td>';
			alert(output_html);
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
	var out = "";
	for (var i = 1; i <= plotMax; ++i){
		out += "<option value='"+i+"'>"+i+"</option>";
	}
	return out;
}

function generateSpeciesMenu(){
	var out = "";
	for (var i = 0; i < speciesList.length; ++i){
		out += "<option value='"+speciesList[i]+"'>"+speciesList[i]+"</option>";
	}
	return out;
}

function initData(){
	document.getElementById('click_table').innerHTML = generateButtons();
	document.getElementById('plot_menu').innerHTML = generatePlotMenu();
	document.getElementById('species_menu').innerHTML = generateSpeciesMenu();
}
