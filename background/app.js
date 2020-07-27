function updateRange(id, value){
	if(isNaN(id))return;
    if(isNaN(value)) return;

	
	var rType = document.getElementById("slider-" + id).getElementsByTagName("label")[0].innerHTML;
	if(rType === "SIZE"){
		SIZE = value;
		updateSize(id);
	}else if (rType === "SCALE"){
		SCALE = value;
		updateScale();
	}else if (rType === "OPACITY"){
		OPACITY = value;
		updateOpacity();
	}else if (rType === "STROKE"){
        if(STROKE_WIDTH !== value){ //preventing double value?? Two listeners must be triggering
            STROKE_WIDTH = value;
            updateStrokeWidth();
        }		
	}else if (rType === "WIDTH"){
		updateWidth(id, value);
	}else if (rType === "HEIGHT"){
        updateHeight(id, value);
    }else if (rType === "POSITION"){
        //ARR_POSITION_VALUE[ARR_POSITION_ID[id]] = value;
        POSITION = value;
        updatePosition();
    }else if (rType === "MOVE"){
		updateMove();
	}else if (rType === "VARIANCE"){        
		VARIATION_STRENGTH = value;
        updateColor(1, COLOR[1]);
	}else if (rType === "ANGLE"){
		ANGLE = value;
		updateAngle(id);
	}else if (rType === "RADIAL"){
		RADIAL = value;
		updateRadial(id);
	}else if (rType === "SPIN"){
		PATTERN.spin = value;
		updatePattern();
	}else if (rType === "SPAN"){
		PATTERN.span = value;
		updatePattern();
	}else{
		o('bad rType: ' + rType);
	}
	applyBackground();
}


function applyBackground(){	
	BG_IMAGE = BG_ARRAY.join("");
	document.body.style.backgroundColor = "#" + COLOR[1];
	document.body.style.backgroundImage = BG_IMAGE;
	document.body.style.backgroundAttachment = BG_ATTACHMENT;
	document.body.style.backgroundSize = BG_SIZE;
    //document.body.style.backgroundRepeat = BG_NO_REPEAT;
    document.body.style.backgroundRepeat = BG_REPEAT;
    document.body.style.backgroundPosition = BG_POSITION;
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