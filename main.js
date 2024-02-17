let noteArea = document.querySelector(".note-area");
let noteText = document.querySelector(".note-text");
let title = document.querySelector("#title");
let notes = document.querySelector("#notes");
let note = document.querySelector("#note");

// note Area #title #noteText 
const showNoteArea = () => {
  noteText.style = "display: block";
  noteArea.classList.add("note-now");
  title.setAttribute("placeholder", "Title");
  title.style = "font-size: 20px";
};


const hideNoteArea = () => {
  noteText.style = "display: none";
  noteArea.classList.remove("note-now");
};


//local storage 
const addNoteToLocalStorage = (note) => {

    if(note.length < 0) {
        return
    }

    let oldNote;

    if(localStorage.getItem("notes") === null) {
        oldNote = [];
    }else{
        oldNote = JSON.parse(localStorage.getItem("notes"))
    }

    oldNote.push(note);
localStorage.setItem('notes', JSON.stringify(oldNote) );

}
//Reading Notes From Local Storage
const getNotesFromLocalStorage = () => {

    if(localStorage.getItem("notes") === null) {
        oldNote = [];
    }else{
        oldNote = JSON.parse(localStorage.getItem("notes"))
    }
    
    oldNote.forEach(note => {

        notes.innerHTML += `
        <div class="note" id="note">
              <h3 class="title-text" id="title-text">${note[0]}</h3>
              <p class="note-blog">${note[1]}</p>
              <i class="fa fa-trash"></i>
            </div>`;
        
    });

}

//Deleting Note From Local Storage
const deleteFromLocalStorage = (deletedNote) => {

    let oldNote;

    if(localStorage.getItem("notes") === null) {
        oldNote = [];
    }else{
        oldNote = JSON.parse(localStorage.getItem("notes"))
    }

    oldNote.push(deletedNote);
localStorage.setItem('notes', JSON.stringify(oldNote) );

oldNote.map( (note, index) => { //map is like forEach
   
    if(note[0] == deletedNote.children[0].textContent.trim() && note[1] == 
    deletedNote.children[1].textContent.trim()) {
        oldNote.splice(index, 1);
        return oldNote;
    }
});

localStorage.setItem('notes', JSON.stringify(oldNote));
};

document.addEventListener("DOMContentLoaded", getNotesFromLocalStorage)


// Adding new Note to the DOM
const addNote = (t, n) => {
  notes.innerHTML += `
    <div class="note" id="note">
          <h3 class="title-text" id="title-text">${t}</h3>
          <p class="note-blog">${n}</p>
          <i class="fa fa-trash"></i>
        </div>
`;

  title.value = "";
  noteText.value = "";
};

// noteText showup 
noteArea.addEventListener("click", showNoteArea);

// noteArea hiding 
document.addEventListener("click", (event) => {
  let isClicked = noteArea.contains(event.target);

  if (!isClicked) {
    hideNoteArea();
    if (title.value.length === 0 && noteText.value.length === 0) {
      return; // return = don't do anything
    } else {
      
    //Add Note to Local Storage
    addNoteToLocalStorage([title.value, noteText.value]);

    addNote(title.value, noteText.value);
    }  // publish the contained note to the Dom 
  }
});

// showing the trash icon
document.addEventListener("mouseover", (event) => {
  if (event.target.classList.contains("note")) {
    event.target.querySelector("i").classList.add("show");
  }
});

// Hiding the trash icon
document.addEventListener("mouseleave", (event) => {
  if (event.target.classList.contains("note")) {
    event.target.querySelector("i").classList.remove("show");
  }
});


// Removing Note From the DOM
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("fa-trash")) {
      event.target.parentElement.remove();
      //Deleting Note From Local Storage
      deleteFromLocalStorage(event.target.parentElement);
    }
  });


