//your code here
let robotContainer = document.querySelector(".robot-section");

let imageClassNames = ["img1","img2","img3","img4","img5"];

let imageClassNames2 = [...imageClassNames, imageClassNames[Math.floor(Math.random()*imageClassNames.length)]];

//lets create 5 img tag
// let counter = 0;
// for(let i=0; i<6; i++){
//     if(i<=4){
//     let imageTag = document.createElement("img");
//     imageTag.className = imageClassNames[counter++];
//     robotContainer.append(imageTag);
//     }
//     else if(i==5){
//     let randomIndex = Math.floor(Math.random()*imageClassNames.length);
//     let img6classname=imageClassNames[randomIndex];
   
//     let imageTag = document.createElement("img");
//     imageTag.className = img6classname;
    
//     robotContainer.append(imageTag);
//     }
// }

//here the LAST IMAGE only is repeated one ANNDDD we want to reshuffle the whole image 
//another approach
function deleteElement(array,index){
    for (let i = index; i<= array.length-2; i++){
        array[i]=array[i+1];
    }
    array.pop();
    return array;
}

for(let i=0; i<6; i++){
    let counter =  Math.floor(Math.random()*imageClassNames2.length);
    
    let imageTag = document.createElement("img");
    imageTag.className = imageClassNames2[counter];

    imageTag.id = "pic" + i;

    robotContainer.append(imageTag);
    let newArray =deleteElement(imageClassNames2,counter);
    imageClassNames2 =  [...newArray];
}

//generate an h3 tag
let heading3 = document.createElement("h3");
heading3.id="h";
heading3.innerText = "Please click on the identical tiles to verify that you are not a robot."
robotContainer.append(heading3);

let images = document.querySelectorAll("img");
for(t of images){
    t.addEventListener("click", validate);
}
let click=0;
let resetBtnGenerated = false;
let verifyBtnGenerated = false;
let previousImageId = "";
function validate(event_details){
    let currentImageId = event_details.target.id;
    if(currentImageId != previousImageId){
        click++;
        previousImageId = currentImageId;
    }
    
//lets highlight the image
    event_details.target.classList.add("selected");

    if(click ==1 && !resetBtnGenerated){
        let resetBtn = document.createElement("button");
        resetBtn.id = "reset";
        resetBtn.innerText="Reset";

        resetBtn.addEventListener("click",reset);

        robotContainer.append(resetBtn);
        resetBtnGenerated = true;
    }
    else if (click ==2 && !verifyBtnGenerated){
        let verifyBtn = document.createElement("button");
        verifyBtn.id="verify";
        verifyBtn.innerText = "Verify";

        verifyBtn.addEventListener("click",verify);

        robotContainer.append(verifyBtn);
        verifyBtnGenerated = true;
    }
    else if(click==3){
        let verifyBtn=document.querySelector("#verify");
        verifyBtn.remove();
    }
}


function reset(){
    let images = document.querySelectorAll(".selected");
    for( let t of images){
        t.classList.remove("selected");
    }
    let resetBtn = document.querySelector("#reset");
    //or resetBtn.style.display="none"
    resetBtn.remove();
    click=0;
    resetBtnGenerated=false;
    verifyBtnGenerated=false;
    previousImageId=="";

    let verifyBtn=document.querySelector("#verify");
    if(verifyBtn){
        verifyBtn.remove();
    }
}

function verify(){
    let selectedImages = document.querySelectorAll(".selected");
     let para = document.createElement('p');
     para.id = "para";
    if(selectedImages[0].className == selectedImages[1].className){
        para.innerText = "You are a human. Congratulations!.";
    }
    else{
        para.innerText = " We can't verify you as a human. You selected the non-identical tiles.";
    }
    robotContainer.append(para);
    
}
