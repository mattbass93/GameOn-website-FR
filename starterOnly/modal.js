// DOM Elements
const backgroundModal = document.querySelector(".background_modal");
const backgroundConfirmationPage = document.querySelector(".background_confirmation_page");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalBody = document.querySelector('.modal-body')
const formData = document.querySelectorAll(".formData");
const closeButton = document.getElementById("close")
const confirmationPage = document.querySelector('.confirmation_page')
const close_confirmation_page1 = document.querySelector('.close_confirmation_page')
const close_confirmation_page2 = document.querySelector('.button_confirmation_page')

/*Retrieving the different fields of the form*/
const form = document.querySelector('form')

let firstName = document.getElementById("firstname")
let lastName = document.getElementById("lastname")
let email = document.getElementById("email")
let birthdate = document.getElementById("birthdate")
let quantityOfTournaments = document.getElementById("quantity")
let tournamentLocations = document.querySelectorAll('input[name="location"]')
let checkboxes = document.querySelectorAll('input[type="checkbox"]')

const checkboxOneLabel = document.getElementById("checkbox_one_label")
const divRadioButtons = document.getElementById('div_radio_buttons')

/*FUNCTIONS*/
// Modal settings and responsive
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// launch and close modal form
function launchModal() {
  backgroundModal.style.display = "block";

}
function closeModal() {
  backgroundModal.style.display = "none";

}

// launch and close Confirmation page
function launchConfirmationPage() {
  backgroundConfirmationPage.style.display = "block";
}
function closeConfirmationPage() {
  backgroundConfirmationPage.style.display = "none";
}

//Check form

function checkIfExistingErrorMessage(errorId) {
  const existingErrorMessage = document.getElementById(errorId);
  if (existingErrorMessage) {
    existingErrorMessage.remove();
    return true
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
  if (tag.classList.contains("error")) {
    const newSpan = document.createElement("span");
    newSpan.textContent = errorMessage;
    newSpan.id = id
    newSpan.classList.add("error_message");
    tag.insertAdjacentElement('afterend', newSpan);
    return false
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

function checkField(tag, regex, errorId, errorMessage) {
  checkIfExistingErrorMessage(errorId);

  if (!checkRegExp(tag, regex)) {
    addSpanError(tag, errorId, errorMessage);
    return false
  } else {
    return true
  }
}


function checkBirthdateField(tag, errorId) {
  checkIfExistingErrorMessage(errorId);

  if (tag.value === "") {
    addErrorClass(tag);
    addSpanError(tag, errorId, "Veuillez indiquer vôtre âge");
  } else {
    const birthdate = new Date(tag.value);
    const today = new Date();
    let age = today.getFullYear() - birthdate.getFullYear();
    const month = today.getMonth() - birthdate.getMonth();

    // If current month is less than birth month, subtract 1 from age
    if (month < 0 || (month === 0 && today.getDate() < birthdate.getDate())) {
      age--;
    }


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

  let roundedValue = Math.round(parseFloat(tag.value));

  if (isNaN(roundedValue) || tag.value < 0 || tag.value > 99) {
    addErrorClass(tag);
    addSpanError(tag, errorId, errorMessage);
    return false
  } else {
    addValidClass(tag)
    tag.value = roundedValue
    return true
  }
}

function checkTournamentLocations(errorId, errorMessage) {
  tournamentLocations = [...tournamentLocations]
  checkIfExistingErrorMessage(errorId);
  if (tournamentLocations.some(location => location.checked)) {
    divRadioButtons.classList.remove("error")
    return true
  } else {
    addErrorClass(divRadioButtons)
    addSpanError(divRadioButtons, errorId, errorMessage);
    return false
  }
}


function checkCheckboxes(errorId, errorMessage) {
  checkIfExistingErrorMessage(errorId);


  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[0].checked) {
      return true
    }
    else {
      addErrorClass(checkboxOneLabel)
      addSpanError(checkboxOneLabel, errorId, errorMessage);
      return false
    }
  }

}


/*LISTENERS*/
firstName.addEventListener('change', () => {
  checkField(firstName, "^[A-Z][A-Za-z\\é\\è\\ê\\-]+$", 'firstNameSpan', "Veuillez indiquer un prénom valide");
})

lastName.addEventListener('change', () => {
  checkField(lastName, "^[A-Z][a-z\\-' ]+$", 'lastNameSpan', "Veuillez indiquer un nom valide");
})

email.addEventListener('change', () => {
  checkField(email, "[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+", 'emailSpan', "Veuillez indiquer une adresse mail valide");
})

birthdate.addEventListener('change', () => {
  checkBirthdateField(birthdate, 'birthdateSpan');
})

quantityOfTournaments.addEventListener("change", () => {
  checkQuantityOfTournamentsField(quantityOfTournaments, 'quantityOfTournamentsSpan', "Veuillez indiquer un chiffre valide");
})

let city = ""

tournamentLocations.forEach(location => {
  location.addEventListener('change', () => {
    checkTournamentLocations('tournamentLocationsSpan', 'Veuillez selectionner au moins un tournoi');
    city = location.value
  });
});

checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    checkCheckboxes('checkboxesSpan', 'Veuillez accepter les conditions d`\'utilisations')
  })
})

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

  checkField(firstName, "^[A-Z][A-Za-z\\é\\è\\ê\\-]+$", 'firstNameSpan', "Veuillez indiquer un prénom valide"),
    checkField(lastName, "^[A-Z][a-z\\-' ]+$", 'lastNameSpan', "Veuillez indiquer un nom valide"),
    checkField(email, "[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+", 'emailSpan', "Veuillez indiquer une adresse mail valide"),
    checkBirthdateField(birthdate, 'birthdateSpan'),
    checkQuantityOfTournamentsField(quantityOfTournaments, 'quantityOfTournamentsSpan', "Veuillez indiquer un chiffre valide"),
    checkTournamentLocations('tournamentLocationsSpan', 'Veuillez selectionner au moins un tournoi'),
    checkCheckboxes('checkboxesSpan', 'Veuillez accepter les conditions d`\'utilisations')

  if (checkField(firstName, "^[A-Z][A-Za-z\\é\\è\\ê\\-]+$", 'firstNameSpan', "Veuillez indiquer un prénom valide") &&
    checkField(lastName, "^[A-Z][a-z\\-' ]+$", 'lastNameSpan', "Veuillez indiquer un nom valide") &&
    checkField(email, "[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+", 'emailSpan', "Veuillez indiquer une adresse mail valide") &&
    checkBirthdateField(birthdate, 'birthdateSpan') &&
    checkQuantityOfTournamentsField(quantityOfTournaments, 'quantityOfTournamentsSpan', "Veuillez indiquer un chiffre valide") &&
    checkTournamentLocations('tournamentLocationsSpan', 'Veuillez selectionner au moins un tournoi') &&
    checkCheckboxes('checkboxesSpan', 'Veuillez accepter les conditions d`\'utilisations')) {
    console.log(`Prénom: ${firstName.value}`)
    console.log(`Nom: ${lastName.value}`)
    console.log(`E-mail: ${email.value}`)
    console.log(`Date de naissance: ${birthdate.value}`)
    console.log(`A déja participé à ${quantityOfTournaments.value} tournoi(s)`)
    console.log(`Souhaite participer au tournoi de ${city}`)
    console.log(`Conditions d'utilisation acceptées`)
    if (checkboxes[1].checked) {
      console.log(`Souhaite être abonné à la newsletter`)
    }
    closeModal();
    launchConfirmationPage();
  } else {
    console.log("error submit")
  }

})



