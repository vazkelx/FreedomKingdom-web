"use strict";

var codeL = [0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.09, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1250, 1600, 4000, 2500, -5, 5, -10, 10];
var codeU = [10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 80, 90, 100, 125, 150, 175, 200, 250, 300, 400, 500, 600, 800, 1000, 2000];
var codeKey = ['a', 'b', 'c', 'd', 'e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];


var COLOR_VARIATION_NAME = ["GRAY TONES","RED TONES"  ,"ORANGE TONES","YELLOW TONES","GREEN TONES","BLUE TONES" ,"PURLPLE TONES","RANDOM TONES"];

var COLOR_VARIATION_NUMBER = 1;
var USE_DEFAULT = true;

var TEST_VAR = 'X';
var CTRL_CODE = '';


var PALETTE = [];
//ColorList.prototype.getInfo = function() {
    //return this.color + ' ' + this.type + ' apple';
//};




function MoveSetting (lineNumber, rangeID, x, y, rotate, scale, origin) {
    this.line = lineNumber;
    this.id = rangeID;    
    this.x = x;
    this.y = y;
    this.rotate = rotate;
    this.scale = scale;
    this.origin = origin; //[0, 0]
}



var COLOR = ['000', 'AAA', 'FFF', '000', '444', '555', '666', '777', '888', '999'];
var BKUP_COLOR = [];
var BG_IMAGE = 'none';

var BG_SIZE = 'auto';

var BG_ARRAY = [];
var COPIED_COLOR = 'F0F';
var STEP_COUNTER = [];
var ARR_POSITION = [];
var ARR_MOVE = [];
var ARR_MOVE_RANGE = [];
//var ARR_POSITION_ID = [];
//var ARR_POSITION_VALUE = [];

function resetStepCounter(){
    STEP_COUNTER = [];
    for(var i=0; i<99; i++){
        STEP_COUNTER[i] = 0;
    }
}

var ARR_SCALE = [];
var ARR_SIZE = [];
var ARR_SIZE_NUMBER = [];

var ARR_OPACITY = [];
var ARR_STROKE_WIDTH = [];
var ARR_STROKE_MULTIPLE = [];
var ARR_ANGLE = [];

var ARR_RADIAL = [];

var WIDTH = [];
var HEIGHT = [];
var PATTERN = {spin:0, span:1, active:true};
//var PATTERN_LINES = [];
var PATTERN_ARR = [];

var ORIGINAL_WIDTH;
var ORIGINAL_HEIGHT;

function setupButtons(){
    var m = 1;
    var dataID = "";
    var dataCTRL = "";
    var dataCTRLmod = "";
    var dataFILTER = "";
    var dataClass = "";
    var displayHTML = "";
    var bgButtons = document.getElementById("stage").getElementsByTagName("p");


    
    for(var i = 0; i < bgButtons.length; i++){
        m = 2;
        dataID = "";
        dataCTRL = "";
        dataCTRLmod = "";
        dataFILTER = "";
        dataClass = "";
        dataID = bgButtons[i].id;
        dataCTRL = bgButtons[i].getAttribute("data-ctrl");
        while( bgButtons[i].getAttribute("data-ctrl" + m) !== null && m < 9){            
            dataCTRLmod += 'data-ctrl' + m + '="' + bgButtons[i].getAttribute("data-ctrl" + m) + '" ';
            m++;
        }
        dataFILTER = bgButtons[i].getAttribute("data-filter");
        if(bgButtons[i].classList.length > 0){
            dataClass = ' ' + bgButtons[i].className;
        }
        displayHTML += '<div class="box" id="' + dataID + '"><div class="preview">';
        displayHTML += '<a class="button bg-' + dataID + dataClass + '" href="#' + dataID + '" data-ctrl="' + dataCTRL + '" ' + dataCTRLmod + 'data-filter="' + dataFILTER + '">';
        //displayHTML += '<img src="/img/placeholder.png"><div class="overlay"><p>PREVIEW</p></div></a></div></div>';    
    }
    document.getElementById("stage").innerHTML = displayHTML;
    console.log(displayHTML)
}
setupButtons();






function getCodeValue(code){	
	if ('0123456789'.indexOf(code) !== -1) {
		return parseInt(code);
	}else if(code === code.toUpperCase()){		
        return Number(codeU[codeKey.indexOf(code.toLowerCase())]);       
	}else{
        var codeNumber = Number(codeL[codeKey.indexOf(code)]);
        if(code.match(/[w-z]/)){
            var largestDimension;
            if(ORIGINAL_WIDTH > ORIGINAL_HEIGHT){
                largestDimension = ORIGINAL_WIDTH;
            }else{
                largestDimension = ORIGINAL_HEIGHT;
            }
            if(codeNumber > 0){
                return(largestDimension * codeNumber); 
            }else{
                return(largestDimension / -codeNumber);
            }
        }else{
            return codeNumber;
        }		
	}
}



function selectBG(id, group){

    group = group || 0;
    
    var id_name = id

    var el = document.getElementById(id_name).getElementsByTagName("a")[0];
console.log(el)
    
    COLOR[1] = "000000"
	

    //BG_IMAGE = window.getComputedStyle( el, null).getPropertyValue('background-image');


    BG_IMAGE = window.getComputedStyle( el, null).getPropertyValue('background-image');

    
	BG_IMAGE = BG_IMAGE.replace(/\%20/g, " ");
	BG_IMAGE = BG_IMAGE.replace(/\\\'/g, "'");
	BG_IMAGE = BG_IMAGE.replace("url('data:image/svg+xml", 'url("data:image/svg+xml');
	BG_IMAGE = BG_IMAGE.replace("%3C/svg%3E')", '%3C/svg%3E")');
	BG_IMAGE = BG_IMAGE.replace("</svg>')", '</svg>")');
     
    
	if(BG_SIZE === "115%"){
	   BG_SIZE = "auto";
	}else if(BG_SIZE === "200%"){
        BG_SIZE = "cover";
    }

	indexBG_Image();
}

function getAttrValue(line, attribute){
    var regEx = new RegExp(' ' + attribute + "=\\'([^']*)\\'");    
    if(BG_ARRAY[line].includes(' ' + attribute)){
        return BG_ARRAY[line].match(regEx)[1];
    }else{
        return null;
    }
}

function updateAttrValue(line, attribute, new_value){    
    var old_value = getAttrValue(line, attribute);
    //if(old_value !== null){
        var old_line = ' ' + attribute + "='" + old_value + "'";
        var new_line = ' ' + attribute + "='" + new_value + "'";
        BG_ARRAY[line] = BG_ARRAY[line].replace(old_line, new_line);
    //}
}

function indexBG_Image(){
	var str = BG_IMAGE;
    var lightness = 0;
    var matches = '';
    var color_number = 0;
    var color_hex = '';
    var color_type = '';
    var step_instance = 0;
    var variation = false;
    var attributeValue = 0;
    var attributeNumber = 0;
	str = str.replace("svg+xml,", "svg+xml,|");	
	str = str.split("%3E%3C").join('%3E|%3C');
	
	
	
	BG_ARRAY = str.split("|");
    var l = 0;

	while(l < BG_ARRAY.length){        
		var temp = BG_ARRAY[l];
        if(l === 1){
            if(temp.includes("viewBox")){
                var viewBox_numbers = temp.match(/viewBox=\'([0-9.%]* [0-9.%]* [0-9.%]* [0-9.%]*)\'/)[1];                
                viewBox_numbers.split('%25').join('');
                var v_num = viewBox_numbers.split(" ");         
                ORIGINAL_WIDTH = Number(v_num[2]) - Number(v_num[0]);
                ORIGINAL_HEIGHT = Number(v_num[3]) - Number(v_num[1]);
                
            }else{
                ORIGINAL_WIDTH = 0;
                ORIGINAL_HEIGHT = 0;
            }            
        }
        
        //ARR_STROKE_MULTIPLE[l] = 1;
        
		if(temp.includes("class='")){
			var tempClass = temp.match(/class=\'([^']*)\'/)[1];   //// how to target class='' or width etc.
            BG_ARRAY[l] = BG_ARRAY[l].replace(tempClass, "");
			BG_ARRAY[l] = BG_ARRAY[l].replace("class=''", "");
     
            
            if(tempClass.includes("color") || tempClass.includes("steps") || tempClass.includes("blend")){
                console.log("color")
				color_type = tempClass.match(/(color|steps|blend)[0-9]{1,2}/)[0];				
                color_number = color_type.match(/[0-9]{1,2}/);
                color_number = parseInt(color_number, 10);
                color_type = color_type.match(/[a-z]*/)[0];
                //color_hex = temp.match(/\'\%23([^']*)\'/)[1]; //possibly whitelist color, stroke, color-stop - to prevent href="#a"
				color_hex = temp.match(/(stop-color|fill|stroke)=\'\%23([^']*)\'/)[2];				
                COPIED_COLOR = color_hex;
                if(USE_DEFAULT && color_type === "color" && color_number !== 1){
                    if(lightness === 0){
                        BKUP_COLOR[color_number] = color_hex;
                    }                    
                    if(BKUP_COLOR[color_number] === undefined){
                        COLOR[color_number] = color_hex;
                    }else{
                        COLOR[color_number] = BKUP_COLOR[color_number];
                    }
					//COLOR[color_number] = color_hex;                    
				}else if(color_type === "steps"){
                    STEP_COUNTER[color_number]++;
                    step_instance = STEP_COUNTER[color_number];
                }            
            }

            if(tempClass.includes("move")){
                console.log("move")
                //var originCode = tempClass.match(/origin([0-9a-zA-Z_])*/g);
                var mInstance = tempClass.match(/move([0-9a-zA-Z_])*/g);
                var mCode, mRange, mTemp;
                var mValues = []; //[-10,0,0,1000] ... 'move1_a_0_0_Y' ... xmin_xmax_ymin_ymax;                
                var tempVal = 0;
                var tempVals = [];
                var origin = getOrigin(l);                
                
                var i, ii, iii;
                for(i = 0; i < mInstance.length; i++){
                    mCode =  mInstance[i];
                    mRange = Number( mCode.match(/move([0-9])/)[1] );
                    mCode = mCode.replace("move" + mRange + '_', "");                
                    mValues = mCode.split("_");                    
                    for(ii = 0; ii < mValues.length; ii++){
                        tempVal = mValues[ii];
                        tempVals = tempVal.split('');
                        tempVal = 0;
                        for(iii = 0; iii < tempVals.length; iii++){
                            if(tempVals[iii] !== tempVals[iii].toUpperCase() && ii < 3){                                
                                mTemp = -getCodeValue(tempVals[iii].toUpperCase());
                            }else{
                                mTemp = getCodeValue(tempVals[iii]);
                            }                            
                            tempVal = tempVal + Number(mTemp);
                        }                        
                        mValues[ii] = tempVal;
                    }                    
                    ARR_MOVE[ARR_MOVE.length] = new MoveSetting (l, mRange, mValues[0], mValues[1], mValues[2], mValues[3], origin);                    
                }
			} 
        }
		l++;
	}    
}

function getOrigin(lineNumber){
    var temp = BG_ARRAY[lineNumber];  
    var x = 0;
    var y = 0;
    var numbers, rOrigin;
    var i = 1;
    
    if(ORIGINAL_WIDTH > 0){ //get default center if possible.
        x = ORIGINAL_WIDTH / 2;
    }
    if(ORIGINAL_HEIGHT > 0){
        y = ORIGINAL_HEIGHT/ 2;
    }
    
    while( temp.includes("%3Cg") ){
        temp = BG_ARRAY[lineNumber + i];
        i++;
    }
    rOrigin = getAttrValue(lineNumber, 'transform');    
    if(rOrigin !== null){
        if(rOrigin.includes("rotate")){            
            numbers = rOrigin.match(/rotate\(([0-9 .-]+)\)/)[1];
            numbers = numbers.replace(/[-]/g, ' -').replace(/ {1,}/g," ").split(' ').map(Number);
            if(numbers.length === 3){
                x = numbers[1];
                y = numbers[2];
            }
        }
    }
    return [ Math.round(x), Math.round(y)];
}

function updateRange(id, value){
    //console.log(id, value)
	if(isNaN(id)){
       return;
    }
    if(isNaN(value)){
       return;
    }
	
		updateMove();
	
	applyBackground();
}



function updateMove(){  

    var l = 0;
    var mVals = [];    
    var updatedValue, updatedSpace, line, value, orX, orY, rotate_origin;
    var mX, mY, mRotation, mScale;    
    
    //while(l < ARR_MOVE.length){
        while(l < ARR_MOVE.length){
        line = ARR_MOVE[l].line;
        if(mVals[line] === undefined){
           mVals[line] = [0, 0, 0, 1];
        }        
        value = VALUE/100

        mX = convertPercentage( 0, ARR_MOVE[l].x, parseInt(value));
        mY = convertPercentage( 0, ARR_MOVE[l].y, parseInt(value));
        mRotation = convertPercentage( 0, ARR_MOVE[l].rotate, value);
        mScale = convertPercentage( 1, ARR_MOVE[l].scale, value);
        
        mVals[line][0] += mX;
        mVals[line][1] += mY;
        mVals[line][2] += mRotation;
        mVals[line][3] *= mScale;
        
        updatedValue = '';
        updatedSpace = '';
        if( mVals[line][0] !== 0 ||  mVals[line][1] !== 0 ){
            updatedValue += 'translate(' + mVals[line][0] + ' ' + mVals[line][1] + ')';
            updatedSpace = ' ';
        }
        if( mVals[line][2] !== 0 ){
            rotate_origin = ARR_MOVE[l].origin;
            orX = rotate_origin[0];
            orY = rotate_origin[1];
            rotate_origin = ' ' + orX + ' ' + orY;
            updatedValue += updatedSpace + 'rotate(' + mVals[line][2] + rotate_origin + ')';
            updatedSpace = ' ';
        }
        if( mVals[line][3] !== 1 ){
            updatedValue += updatedSpace + 'scale(' + mVals[line][3] + ')';
        }        
        updateAttrValue(ARR_MOVE[l].line, 'transform', updatedValue);     
        l++;
    }
}
function convertPercentage(min, max, percentage){    
    if(min === 0 && max === 0){
        return 0;
    }
    var scale_difference = max - min;
    var scale_multiple = scale_difference/100;
    var value = min + (scale_multiple * percentage);
    //return Math.round(value);
    return Math.round(value * 1000) / 1000;
}


function applyBackground(){	
	BG_IMAGE = BG_ARRAY.join("");
	document.body.style.backgroundColor = "#" + COLOR[1];
    document.body.style.backgroundImage = BG_IMAGE;
	outputCode();
}


function outputCode(){
	var bgOutput = 'background-color: #' + COLOR[1] + ';';
	if(BG_IMAGE.length > 1){
		optimizeOutput();
		bgOutput += '\nbackground-image: ' + BG_IMAGE + ';';        
	}
}
var REMOVE_EXCESS_CODE = ["gradientTransform='rotate(0)'", "gradientTransform='rotate(360)'", "fill-opacity='1'", "stroke-opacity='1'", " opacity='1'", " transform=''", " patternTransform=''"];
function optimizeOutput(){
	var l = 0;
	while(l < REMOVE_EXCESS_CODE.length){
		BG_IMAGE = BG_IMAGE.replace(REMOVE_EXCESS_CODE[l], '');
		l++;
	}
	BG_IMAGE = BG_IMAGE.replace(/  +/g, ' ');
}


var VALUE = 0

var T_MAX = 7200
function movetest() {

    if(VALUE==T_MAX) VALUE = 0
    VALUE++

    updateRange(3, (VALUE).toString());
    //updateRange(4, (VALUE/1).toString());

    setTimeout(movetest, 10)
};


movetest(0);
selectBG('abstract-timekeeper', 0)