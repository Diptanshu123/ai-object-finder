objects=[];

function setup(){
    canvas=createCanvas(420,420);
    canvas.center();
    video= createCapture(VIDEO);
    video.hide();
}
video= "";

function preload(){
    
}

function draw(){
    image(video,0,0,480, 380);
    if( status != "")
    {
        objectDetector.detect(video,gotResults);
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            


            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label+" "+ percent + "%", objects[i].x+15, objects[i].y+15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
         if(objects[i].label==object){
            objectDetector.detect(gotResults);
            document.getElementById("object").innerHTML=object+" found";
            synth=window.speechSynthesis;
            utterthis=new SpeechSynthesisUtterance(object+" found");
            synth.speak(utterthis);
            }
            else{
                document.getElementById("object").innerHTML=object+" not found";  
            }
        }
    }
}

function start(){
    objectDetector= ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "STATUS : Detecting Objects";
    object= document.getElementById("input").value;
}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
    
}
function gotResults(error,results){

    if(error){
        console.log(error);
    }
     console.log(results);
     objects = results;
}