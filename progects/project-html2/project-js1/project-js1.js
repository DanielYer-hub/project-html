let myBox;
let textZone = document.getElementById("text-zone");

function create() {
   
    if (myBox && myBox.parentNode) {
        myBox.parentNode.removeChild(myBox);
    }

  
    let colorInput = document.getElementById("userColor");
    let widthInput = document.getElementById("userWidth");
    let heightInput = document.getElementById("userHeight");
    let textInput = document.getElementById("userText");
    let textSizeInput = document.getElementById("textSize");
    let textColorInput = document.getElementById("textColor");
    let elementType = document.getElementById("elementType").value;
    let positionX = document.getElementById("positionX").value;
    let positionY = document.getElementById("positionY").value;
    let createInZone = document.getElementById("createInZone").checked;
    let paddingInput = document.getElementById("paddingInput").value;
    let marginInput = document.getElementById("marginInput").value;
    let borderWidthInput = document.getElementById("borderWidth").value;
    let borderStyleInput = document.getElementById("borderStyle").value;
    let borderColorInput = document.getElementById("borderColor").value;
    let borderRadiusInput = document.getElementById("borderRadius").value;


    myBox = document.createElement(elementType);

    if (elementType === 'select') {
 
        let option1 = document.createElement('option');
        option1.text = 'Option 1';
        myBox.add(option1);

        let option2 = document.createElement('option');
        option2.text = 'Option 2';
        myBox.add(option2);
    } else {
  
        myBox.textContent = textInput.value;
    }

 
    myBox.style.backgroundColor = colorInput.value;
    myBox.style.width = (widthInput.value || "auto") + "px";
    myBox.style.height = (heightInput.value || "auto") + "px";
    myBox.style.fontSize = textSizeInput.value + "px";
    myBox.style.color = textColorInput.value;
    myBox.style.padding = paddingInput + "px";
    myBox.style.margin = marginInput + "px";
    myBox.style.border = `${borderWidthInput}px ${borderStyleInput} ${borderColorInput}`;
    myBox.style.borderRadius = borderRadiusInput + "px";
    myBox.style.position = 'absolute';
    myBox.style.left = positionX + "px";
    myBox.style.top = positionY + "px";

 
    if (createInZone) {
        textZone.style.display = "block";
        textZone.appendChild(myBox);
    } else {
        document.getElementById("work-page").appendChild(myBox);
    }
}

function deleteElement() {
    if (myBox && myBox.parentNode) {
        myBox.parentNode.removeChild(myBox);
        if (myBox.parentNode === textZone) {
            textZone.style.display = "none";
        }
        myBox = null;
    } else {
        console.error('האלמנט לא קיים.');
    }
}
