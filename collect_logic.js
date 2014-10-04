
function onButtonPress(clicked) {
	console.log('called on button press wik', clicked);
	recordTree(getSpecies(), clicked.getAttribute('product_type'), clicked.getAttribute('number_of_sticks'), getPlotNumber());
}

var speciesList
var plotList
var data= [];


function getSpecies(){
    return getValueFromDropdownMenu;
}

function getPlotNumber(){
    return getValueFromDropdownMenu;
}


var MAX_NUMBER_OF_STICKS = 8;
var PRODUCT_TYPES = ['sawlogs', 'pulpsticks'];

function editData(plot,productType,numStick,species,change){
	data[plot][productType][numStick][species][count] += change
}

function buttonText(productType,NumStick){
	print(str(data[getPlotNumber()][productType][NumStick]))
}

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

function leftClickButton(buttonproduct,buttonumStick){
	editData(getPlotNumer(),buttonproduct,buttonnumstick,getSpecies(),1)
}

function rightClickButton(buttonproduct,buttonumStick){
	editData(getPlotNumer(),buttonproduct,buttonnumstick,getSpecies(),-1)
}

function makeCSV(){
	var comma = ","
	var outext=print("Plot, Product type, Number of sticks, Species, Count")
	for(a in data){
    	for (b in data[a]){
        	for (c in data[a][b]){
            	for (d in data[a][b][c]){
              	  outext += print(str(a)+comma+str(b)+comma+str(c)+comma+str(d) + comma+ str(data[a][b][c][d]))
               	}
        	}
   	}
	}
	return(outext)
}

function fillInTable(id) {
	alert('called fillInTable');
	var div = document.getElementById(id);
	div.innerHTML = generateButtons();
}

