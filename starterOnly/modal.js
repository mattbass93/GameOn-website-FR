// DOM Elements
const modalbg = document.querySelector(".bground");
const modalbg2 = document.querySelector(".bground2");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalBody = document.querySelector('.modal-body')
const formData = document.querySelectorAll(".formData");
const closeButton = document.getElementById("close")
const confirmationPage = document.querySelector('.confirmation_page')
const close_confirmation_page1 = document.querySelector('.close_confirmation_page')
const close_confirmation_page2 = document.querySelector('.button_confirmation_page')
const form = document.querySelector('form')
const formData6 = document.getElementById('formData6')
const portland = document.getElementById('portland')


/*Retrieving the different fields of the form*/
let firstName = document.getElementById("firstname")
let lastName = document.getElementById("lastname")
let email = document.getElementById("email")
let birthdate = document.getElementById("birthdate")
let quantityOfTournaments = document.getElementById("quantity")
let checkboxCGU = document.getElementById("checkboxCGU")
let checkboxNewsletter = document.getElementById("checkboxNewsletter")
const checkboxOneLabel = document.getElementById("checkbox_one_label")


let textControls = document.querySelectorAll('.text-control')
let tournamentLocations = document.querySelectorAll('input[name="location"]')
let checkboxes = document.querySelectorAll('input[type="checkbox"]')

/*FUNCTIONS*/
// Modal settings and responsive
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }

  let icon = document.getElementById('icon')
  if(icon.className === "icon") {
    icon.className += " icon_responsive"
  } else {
    icon.className = "icon"
  }
}

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}
function closeModal() {
  modalbg.style.display = "none";
}

// Launch Confirmation page
function launchConfirmationPage() {
  modalbg2.style.display = "block";
}
function closeConfirmationPage() {
  modalbg2.style.display = "none";
}

//Check form

function checkIfExistingErrorMessage(errorId) {
  const existingErrorMessage = document.getElementById(errorId);
  if (existingErrorMessage) {
     existingErrorMessage.remove();
     return true
  }
}

function checkRegExp(tag, regex) {
  let regExp = new RegExp(regex);

  if (regExp.test(tag.value) && tag.value.length >= 2) {
    addValidClass(tag)
    return true
  } else {
    addErrorClass(tag)
    return false
  }
}

function addValidClass(tag) {
  tag.classList.remove("error");
  tag.classList.add("valid");
}

function addErrorClass(tag) {
  tag.classList.remove("valid");
  tag.classList.add("error");
}


function addSpanError(tag, id, errorMessage) {
    if(tag.classList.contains("error")) {
     const newSpan = document.createElement("span");
     newSpan.textContent = errorMessage;
     newSpan.id = id
     newSpan.classList.add("error_message");
     tag.insertAdjacentElement('afterend', newSpan);
     return false
    }
}






function checkField(tag, regex, errorId, errorMessage) {
  checkIfExistingErrorMessage(errorId);

  if (!checkRegExp(tag, regex)) {
    // Si la regex ne correspond pas, ajout du message d'erreur
    addSpanError(tag, errorId, errorMessage);
    return false
 } else {
  return true
 }  
}


function checkBirthdateField(tag, errorId) {
  checkIfExistingErrorMessage(errorId);
 
  // Vérifiez si le champ de date de naissance est vide
  if(tag.value === "") {
     addErrorClass(tag);
     addSpanError(tag, errorId, "Veuillez indiquer vôtre âge");
  } else {
     // Convertissez la valeur du champ en un objet Date
     const birthdate = new Date(tag.value);
     const today = new Date();
     let age = today.getFullYear() - birthdate.getFullYear();
     const month = today.getMonth() - birthdate.getMonth();
 
     // Si le mois actuel est inférieur au mois de naissance, soustrayez 1 de l'âge
     if (month < 0 || (month === 0 && today.getDate() < birthdate.getDate())) {
       age--;
     }
 
     // Vérifiez si l'utilisateur a au moins 18 ans
     if (age >= 18) {
       addValidClass(tag);
       return true
     } else {
       addErrorClass(tag);
       addSpanError(tag, errorId, "Vous devez avoir 18 ans pour participer");
       return false
     }
  }
}

function checkQuantityOfTournamentsField(tag, errorId, errorMessage) {
  checkIfExistingErrorMessage(errorId);

  if(tag.value === "" || tag.value < 0 || tag.value > 99) {
    addErrorClass(tag);
    addSpanError(tag, errorId, errorMessage);
    return false
  } else {
    addValidClass(tag)
    return true
  }
}

function checkTournamentLocations(errorId, errorMessage) {
  tournamentLocations = [...tournamentLocations]
  checkIfExistingErrorMessage(errorId);
  if (tournamentLocations.some(location => location.checked)) {
    formData6.classList.remove("error")
    return true
  } else {
    addErrorClass(formData6)    
    addSpanError(formData6, errorId, errorMessage);
    return false
  }
} 


function checkCheckboxes(errorId, errorMessage) {
  // checkboxes = [...checkboxes]
  checkIfExistingErrorMessage(errorId);

  for(let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[0].checked) {
      console.log("checkbox1 ok")
      return true
    }
    else {
      addErrorClass(checkboxes[1])    
      addSpanError(checkboxes[1], errorId, errorMessage);
      return false
    }
   }
   
} 


/*LISTENERS*/



let isFirstNameValid = false
let isLastNameValid = false
let isEmailValid = false
let isBirthdateValid = false
let isQuantityOfTournamentsValid = false
let isTournamentsLocationsValid = false
let isCheckboxesValid = false

let fieldsValidation = [isFirstNameValid, isLastNameValid, isEmailValid, isBirthdateValid, isQuantityOfTournamentsValid, isTournamentsLocationsValid, isCheckboxesValid]


firstName.addEventListener('change', () => {
isFirstNameValid = checkField(firstName, "^[A-Z][A-Za-z\\é\\è\\ê\\-]+$", 'firstNameSpan', "Veuillez indiquer un prénom valide");
 console.log(isFirstNameValid)
})

lastName.addEventListener('change', () => {
 isLastNameValid = checkField(lastName, "^[A-Z][a-z\\-' ]+$", 'lastNameSpan', "Veuillez indiquer un nom valide");
 console.log(isFirstNameValid)

})

email.addEventListener('change', () => {
 isEmailValid = checkField(email, "[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+", 'emailSpan', "Veuillez indiquer une adresse mail valide");
})

birthdate.addEventListener('change', () => {
 isBirthdateValid = checkBirthdateField(birthdate, 'birthdateSpan');
})

quantityOfTournaments.addEventListener("change", () => {
 isQuantityOfTournamentsValid = checkQuantityOfTournamentsField(quantityOfTournaments, 'quantityOfTournamentsSpan', "Veuillez indiquer un chiffre valide");
}) 


tournamentLocations.forEach(location => {
  location.addEventListener('change', () => {
   isTournamentsLocationsValid = checkTournamentLocations('tournamentLocationsSpan', 'Veuillez selectionner au moins un tournoi');
  });
}); 

checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', () => {
   isCheckboxesValid = checkCheckboxes('checkboxesSpan', 'Veuillez accpter les conditions d`\'utilisations');
  });
}); 



// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
closeButton.addEventListener("click", closeModal)

close_confirmation_page1.addEventListener('click', () => {
  closeConfirmationPage()
})

close_confirmation_page2.addEventListener('click', () => {
  closeConfirmationPage()
})


form.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("prevent default ok")


  if (isFirstNameValid && isLastNameValid && isEmailValid && isBirthdateValid && isQuantityOfTournamentsValid && isTournamentsLocationsValid && isCheckboxesValid) {
    closeModal();
    launchConfirmationPage();
  } else {
    console.log("error submit")
  } 
 
  
})

/*
  checkField(firstName, "^[A-Z][A-Za-z\\é\\è\\ê\\-]+$", 'firstNameSpan', "Veuillez indiquer un prénom valide");
  checkField(lastName, "^[A-Z][a-z\\-' ]+$", 'lastNameSpan', "Veuillez indiquer un nom valide");
  checkField(email, "[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+", 'emailSpan', "Veuillez indiquer une adresse mail valide");
  checkBirthdateField(birthdate, 'birthdateSpan') ;
  checkQuantityOfTournamentsField(quantityOfTournaments, 'quantityOfTournamentsSpan', "Veuillez indiquer un chiffre valide");
  checkTournamentLocations(tournamentLocations, 'tournamentLocationsSpan', 'Veuillez selectionner au moins un tournoi');
  checkCheckboxes(checkboxes, "checkboxesId", "Veuillez accepter les conditions d'utilisations")*/

/*
  closeModal();
  launchConfirmationPage(); */


/*
form.addEventListener("submit", (event) => {
  event.preventDefault();
  let allChecksPassed = true;

  for (let i = 0; i < textControls.length; i++) {
    if (!checkField(textControls[i])) {
       allChecksPassed = false;
    }
  }

  if (!checkFirstName(firstName) || !checkLastName(lastName) || !checkBirthdate(birthdate) || !checkEmail(email) || !checkQuantityOfTournaments(quantityOfTournaments) || !checktournamentLocations(tournamentLocations)) {
    allChecksPassed = false;
  }
  
  if (allChecksPassed) {
    closeModal();
    launchConfirmationPage();
  }
  

  
}) */

/*
  if (checkFirstName(firstName) && checkLastName(lastName) && checkBirthdate(birthdate) && checkEmail(email) && checkQuantityOfTournaments(quantityOfTournaments) &&  checkCheckboxes(checkboxes)) {
    closeModal()
    launchConfirmationPage();
  }  
  
    else {
      console.log('error')
    } */







