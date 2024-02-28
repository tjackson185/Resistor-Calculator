var ResistorCodes = [
    {"Color":"black","BandValue":0,"Multiplier":1,"MultiplierPowerOf":0,"MultiplierSign":"1&#937;","Tolerance":"","Temperature":"200 ppm/K"},
    {"Color":"brown","BandValue":1,"Multiplier":10,"MultiplierPowerOf":1,"MultiplierSign":"10&#937;","Tolerance":"&#177;1% (F)","Temperature":"100 ppm/K"},
    {"Color":"red","BandValue":2,"Multiplier":100,"MultiplierPowerOf":2,"MultiplierSign":"100&#937;","Tolerance":"&#177;2% (G)","Temperature":"50 ppm/K"},
    {"Color":"orange","BandValue":3,"Multiplier":1000,"MultiplierPowerOf":3,"MultiplierSign":"1K&#937;","Tolerance":"","Temperature":"15 ppm/K"},
    {"Color":"yellow","BandValue":4,"Multiplier":10000,"MultiplierPowerOf":4,"MultiplierSign":"10K&#937;","Tolerance":"","Temperature":"25 ppm/K"},
    {"Color":"green","BandValue":5,"Multiplier":100000,"MultiplierPowerOf":5,"MultiplierSign":"100K&#937;","Tolerance":"&#177;0.5% (D)","Temperature":"20 ppm/K"},
    {"Color":"blue","BandValue":6,"Multiplier":1000000,"MultiplierPowerOf":6,"MultiplierSign":"1M&#937;","Tolerance":"&#177;0.25% (C)","Temperature":"10 ppm/K"},
    {"Color":"violet","BandValue":7,"Multiplier":10000000,"MultiplierPowerOf":7,"MultiplierSign":"10M&#937;","Tolerance":"&#177;0.10% (B)","Temperature":"5 ppm/K"},
    {"Color":"grey","BandValue":8,"Multiplier":100000000,"MultiplierPowerOf":8,"MultiplierSign":"100M&#937;","Tolerance":"&#177;0.05% (D)","Temperature":"1 ppm/K"},
    {"Color":"white","BandValue":9,"Multiplier":1000000000,"MultiplierPowerOf":9,"MultiplierSign":"1G&#937;","Tolerance":"","Temperature":""},
    {"Color":"gold","BandValue":10,"Multiplier":0.1,"MultiplierPowerOf":-1,"MultiplierSign":".1&#937;","Tolerance":"&#177;5% (J)","Temperature":""},
    {"Color":"silver","BandValue":11,"Multiplier":0.01,"MultiplierPowerOf":-2,"MultiplierSign":"0.01&#937;","Tolerance":"&#177;10% (K)","Temperature":""}
];

var numberOfBands = 3;
var firstBand = 1;
var secondBand = 0;
var thirdBand = 2;
var forthBand = 0;
var tolerance;
var temperature;
var resistor;
//&#937;

function mkDisplay(){
    //var band = document.getElementById('BandAmount_Value').innerHTML;
    mkResiterCodeSheet(); 
    //createMenus();       
    bandVisible(numberOfBands);  
    getdisplayedBands();
}

function getdisplayedBands(){
    var b1 = document.getElementById("band1").classList[0];
    var b2 = document.getElementById("band2").classList[0];
    var b3 = document.getElementById("band3").classList[0];
    var b5 = document.getElementById("band5").classList[0];
    var b6 = document.getElementById("band6").classList[0];
    var btx1 = document.getElementById("band1_value");
    var btx2 = document.getElementById("band2_value");
    var btx3 = document.getElementById("band3_value");    

    var bn1 = b1.substring(9,b1.length);
    var bn2 = b2.substring(9,b2.length);
    var bn3 = b3.substring(9,b3.length);
    var bn5 = b5.substring(9,b5.length);
    var bn6 = b6.substring(9,b6.length);

    for(let cell of ResistorCodes){
        if(cell.Color == bn1){firstBand = cell.BandValue}
        if(cell.Color == bn2){secondBand = cell.BandValue}
        if(cell.Color == bn3){thirdBand = cell.BandValue}
        if(cell.Color == bn5){tolerance = cell.Tolerance}
        if(cell.Color == bn6){temperature = cell.Temperature}
    }
    tallySelection()
}

function mkResiterCodeSheet(){
    var header4 = document.getElementById("forth-header");
if(header4.style.display == "none"){
        for(let cell of ResistorCodes){
        mkCell(cell.Color,cell.Color,false,'color');
        mkCell(cell.Color,cell.BandValue,true,'band1');
        mkCell(cell.Color,cell.BandValue,true,'band2');
        mkCell(cell.Color,cell.BandValue,true,'band3');
        mkCell(cell.Color,cell.MultiplierSign,true,'band4');
        mkCell(cell.Color,cell.Tolerance,true,'band5');
        mkCell(cell.Color,cell.Temperature,true,'band6');
        }
}else if(header4.style.display == "block"){
    for(let cell of ResistorCodes){
        mkCell(cell.Color,cell.Color,false,'color');
        mkCell(cell.Color,cell.BandValue,true,'band1');
        mkCell(cell.Color,cell.BandValue,true,'band2');
        mkCell(cell.Color,cell.BandValue,true,'band3');
        mkCell(cell.Color,cell.BandValue,true,'band_alt');
        mkCell(cell.Color,cell.MultiplierSign,true,'band4');
        mkCell(cell.Color,cell.Tolerance,true,'band5');
        mkCell(cell.Color,cell.Temperature,true,'band6');
        }
}

}

function createMenus(){
    mkDropdownContent('dd-band-1-content')
    mkDropdownContent('dd-band-2-content')
    mkDropdownContent('dd-band-3-content')
    mkDropdownContent('dd-band-4-content')
    mkDropdownContent('dd-band-5-content')
    mkDropdownContent('dd-band-6-content')
}

function mkCell(bkground,value,header,contentype){
    let parent = document.getElementById("CodeSheetContainer");
    let node = document.createElement('div');
    if(header == false){
        node.setAttribute('class','cell-header bkground_' + bkground +'');
    }else{
        node.setAttribute('class','cell-content bkground_' + bkground +'');  
    }
    node.innerHTML = value;

    if(contentype == "band4" || contentype == "band5" || contentype == "band6"){
        for(let cell of ResistorCodes){ 
            if(value == cell.MultiplierSign && cell.Color == bkground)
            {value = cell.BandValue; break;}
            else           
            if(value == cell.Tolerance && cell.Color == bkground)
            {value = cell.BandValue; break;}
            else
            if(value == cell.Temperature && cell.Color == bkground)
            {value = cell.BandValue; break;}
        }
    }
    
    node.setAttribute('onclick',"getInnerHtml(this); getKeyedSelection('" + contentype + "'," + value + "); ");
    node.setAttribute('data-content',"");
    parent.appendChild(node);
}

function calcMultiplyer(bands_total, color){
    let result;
    for(let cell of ResistorCodes){
        if(cell.Color == color){
            result = bands_total * Math.pow(10,cell.MultiplierPowerOf);
            return result;
        }
    }
}

function tallySelection(){
    /*
    var b1 = document.getElementById("band1_value").innerHTML;
    var b2 = document.getElementById("band2_value").innerHTML;
    var b3 = document.getElementById("band3_value").innerHTML;
    var b4 = document.getElementById("band4_value").innerHTML;
    var b5 = document.getElementById("band5")*/
    //var bnum = document.getElementById("BandAmount_Value").innerHTML;
    var b1 = getBandsValue("band1");
    var b2 = getBandsValue("band2");
    var b3 = getBandsValue("band3");
    var b4 = getBandsValue("band4");
    var b5 = getBandsValue('band5');
    var b6 = document.getElementById("band6");
    var fmtx = document.getElementById("fname");
    var r1 = document.getElementById("r1_value");
    var newValue;
    resistor = "";
    if(numberOfBands == 3){
        newValue = '' + b1 + b2
        for(let cell of ResistorCodes){
            if(cell.BandValue == b3){
                resistor = calcMultiplyer(newValue,cell.Color);
                if(b6.style.display == "block"){
                    r1.innerHTML = resistor + "&#937;  " + tolerance + temperature;
                }else{
                    r1.innerHTML = resistor + "&#937;  " + tolerance;
                }
                
              // fmtx.value = resistor;
            }
        }
    }else if(numberOfBands == 4 || numberOfBands == 6){
        newValue = '' + b1 + b2 + b3
        for(let cell of ResistorCodes){
            if(cell.BandValue == b4){
               resistor =  calcMultiplyer(newValue,cell.Color);
               if(b6.style.display == "block"){
                r1.innerHTML = resistor + "&#937;  " + tolerance + "  " + temperature;
                }else{
                r1.innerHTML = resistor + "&#937;  " + tolerance;
                }
              // fmtx.value = resistor;
               
            }
        }
    }
    

}

function getBandsValue(name){
let returnValue;
let bandClass = document.getElementById(name).classList;
let bandColor;
    for(let cls of bandClass){
        if(cls.substring(0,9) == 'bkground_'){
            bandColor = cls;
        }
    }

    bandColor = bandColor.substring(9,bandColor.length);
    for(let cell of ResistorCodes){
        if(cell.Color == bandColor){
            returnValue = cell.BandValue;
        }
    }
    return returnValue
}

function mkDropdownContent(menuName){
    let parent = document.getElementById(menuName);    

    if(menuName == 'dd-band-1-content' || menuName == 'dd-band-2-content' || menuName == 'dd-band-3-content'|| menuName == 'dd-band-4-content'){
        for(let i=0;i<=9;i++){
        let node = document.createElement('div');  
        node.setAttribute('class','bkground_' + ResistorCodes[i].Color); 
        node.setAttribute('onclick',"getMenuSelection('" + menuName + "'," + i + ")");
        node.innerHTML = i; 
        parent.appendChild(node);
        }
    }else 
    if(menuName == 'dd-band-5-content'){
        for(let i=0;i<=11;i++){
            if(i == 1 || i == 2 || i == 5 || i == 6 || i == 7 || i == 8 || i == 10 || i == 11){
            let node = document.createElement('div');  
            node.setAttribute('class','bkground_' + ResistorCodes[i].Color); 
            node.setAttribute('onclick',"getMenuSelection('" + menuName + "'," + i + ")");
            node.innerHTML = ResistorCodes[i].Tolerance ; 
            parent.appendChild(node);    
            }

            }
    }else
    if(menuName == 'dd-band-6-content'){
        for(let i=0;i<=8;i++){
            let node = document.createElement('div');  
            node.setAttribute('class','bkground_' + ResistorCodes[i].Color); 
            node.setAttribute('onclick',"getMenuSelection('" + menuName + "'," + i + ")");
            node.innerHTML = ResistorCodes[i].Temperature; 
            parent.appendChild(node);
            }
    }

    
}

function getMenuSelection(menuName,value){
    var str = menuName.substring(3,9);
    str = str.replace("-","");
    var band = document.getElementById(str).classList;
    var bandNum = document.getElementById(str + "_value");
    for(let cell of ResistorCodes){
        if(cell.BandValue == value){
            for(let cellColor of ResistorCodes){
                band.remove("bkground_" + cellColor.Color);
            }
            band.add("bkground_" + cell.Color);
            if(bandNum.id != "band5_value"){
                bandNum.innerHTML = cell.BandValue;
            }
            
            if(bandNum.id == "band6_value"){
                bandNum.innerHTML = cell.Temperature;
            }else if(bandNum.id == "band5_value"){
                bandNum.innerHTML = cell.Tolerance
            }

            
        }
    }/**/
    tallySelection();
    console.log(menuName + ' Button Selected And the Value is ' + value)
    
}
let cellSelected;
function getKeyedSelection(contentype,value){
    let mySoundFx = new sound("./sound/STAPLER.WAV");
    if(contentype == "band4" && numberOfBands == 3){contentype = "band3"; }
    if(contentype == "band_alt"){contentype = "band4"; }
    var band = document.getElementById(contentype);
    var bandNum = document.getElementById(contentype + "_value"); //temp buttons - bands
    if(cellSelected != ""){
        for(let cell of ResistorCodes){
            if(cell.BandValue == value){
                if(cell.Tolerance != ""){console.log("Tolerance is %c Nothing" + "%c and value is %c" + value,"color:red","color:white","color:green")}
                    for(let cellColor of ResistorCodes){
                        band.classList.remove("bkground_" + cellColor.Color);
                    }
                    band.classList.add("bkground_" + cell.Color);
                
                /**/
                if(contentype != "band5"){
                    //bandNum.innerHTML = cell.BandValue;
                    asignBandVariableValue(contentype,cell.BandValue);
                    
                }
                
                if(contentype == "band6" && band.style.display == "block"){
                    //bandNum.innerHTML = cell.Temperature;
                    asignBandVariableValue(contentype,cell.Temperature)
                }else if(contentype == "band5"){
                        //bandNum.innerHTML = cell.Tolerance;
                        asignBandVariableValue(contentype,cell.Tolerance);                
                }    
            }
        }/**/
    tallySelection();   
    }
    mySoundFx.play(); 
}

function asignBandVariableValue(band,value){
if(band == "band1"){firstBand = value;}
if(band == "band2"){secondBand = value;}
if(band == "band3"){thirdBand = value;}
if(band == "band4"){forthBand = value;}
if(band == "band5"){tolerance = value;}
if(band == "band6"){temperature = value;}
}

function getInnerHtml(self){
    cellSelected = self.innerHTML;
}

function getBandNumbers(number){
    bandVisible(number)
    tallySelection();
}

function bandVisible(bandNumber){
     var coll = document.getElementById("band4");
     var coll6 = document.getElementById("band6");
     var menu = document.getElementById("dd-band-4");
     var menu6 = document.getElementById("dd-band-6");
     var menutxt = document.getElementById('txtBand4');
     var menutxt6 = document.getElementById('txtBand6');
     var bandNum = document.getElementById("BandAmount_Value");
     var headercontainer = document.getElementById("CodeSheetContainer").classList;
     var header4 = document.getElementById("forth-header");

    if(bandNumber == 3){
        coll.style.display = "none";
        coll6.style.display = "none";
       // menu.style.display = "none";
        //menu6.style.display = "none";
        //menutxt.style.display = "none";
        //menutxt6.style.display = "none";
        numberOfBands = 3;
        //bandNum.innerHTML = numberOfBands;        
        headercontainer.remove("sheet-content-alt");
        headercontainer.add("sheet-content");
        header4.style.display = "none";
        remove_cells()
        mkResiterCodeSheet()
    }
    if(bandNumber == 4){   
        coll.style.display = "block";        
        coll6.style.display = "none";
       // menu.style.display = "block";
        //menu6.style.display = "none";
        //menutxt.style.display = "block";
        //menutxt6.style.display = "none";
        numberOfBands = 4;
        //bandNum.innerHTML = numberOfBands;        
        headercontainer.remove("sheet-content");
        headercontainer.add("sheet-content-alt");
        header4.style.display = "block";
        remove_cells()
        mkResiterCodeSheet()
    }else if(bandNumber == 6){   
        coll.style.display = "block";
        coll6.style.display = "block"; 
       // menu.style.display = "block";
        //menu6.style.display = "block";
        //menutxt.style.display = "block";
        //menutxt6.style.display = "block";
        numberOfBands = 6;
        //bandNum.innerHTML = numberOfBands;        
        headercontainer.remove("sheet-content");
        headercontainer.add("sheet-content-alt");
        header4.style.display = "block";
        remove_cells()
        mkResiterCodeSheet()
    }
}

function remove_cells(){
    var headercontainer = document.querySelectorAll("[data-content]");
    for(let cell of headercontainer){
        cell.remove();
    }
}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  }