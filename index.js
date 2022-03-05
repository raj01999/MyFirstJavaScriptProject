console.log("Whecome By me !Sarafraj Mallick");

// adding all teh notes for local storage to web page 
showNotes();

// adding eventListener for enter and buttne click 
let AddBtn = document.getElementById("addBtn");

AddBtn.addEventListener("click", addingNote);
let addTxt = document.getElementById("addTxt");

addTxt.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addingNote(e);
        location.href = "./index.html";
    }
});

// If user adds a notes, add it to the local storage 
function addingNote(e) {
    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.notes;
    let notesObj;
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    if (addTxt.value.length !== 0) {
        notesObj.push(addTxt.value);
    }
    else {
        alert("Please!   Type some note on Text Area and try adding it!, Thank You!")
    }
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";

    // add the notes to the home page in our webpage 
    showNotes();
}



// add the notes to the home page in our webpage from local storage
function showNotes() {
    let notes = localStorage.notes;
    let notesObj;
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach((val, idx) => {
        html += `
        <div class="card noteCard" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${idx + 1}. ${val.split(" ")[0]}</h5>
                    <p class="card-text">${val}</p>
                    <button class="btn btn-primary" onclick="deleting(${idx})" >Delete Note</button>
                </div>
            </div> `;
    });
    let notesArea = document.getElementById("notes");
    if (notesObj.length == 0) {
        notesArea.innerHTML = `<p style="text-align: center;">You Don't Have any Note, Please Add The Note in upper Text Area</p>`;
    }
    else {
        notesArea.innerHTML = html;
    }
}



// deleting function
function deleting(idx) {
    let notes = localStorage.notes;
    let notesObj = JSON.parse(notes);
    notesObj.splice(idx, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}


// Searching Methode- if it's not in the div , make the div display none 
let inputSerch = document.getElementById("inputSerch");

inputSerch.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        searchingNote(e);
        inputSerch.value = "";
    }
});

inputSerch.addEventListener("input", searchingNote);

function searchingNote(e) {
    let searchKey = inputSerch.value.toLowerCase();
    let searchDiv = document.getElementsByClassName("noteCard");
    for (div of searchDiv) {
        let searchP = div.querySelector("p").innerText.toLowerCase();
        if (searchP.includes(searchKey)) {
            div.style.display = "inline-block";
        }
        else {
            div.style.display = "none";
        }
    }
}