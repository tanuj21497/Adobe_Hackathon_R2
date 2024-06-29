const skillsContainer = document.getElementById('skillsContainer');
const educationContainer = document.getElementById('educationContainer');
const experienceContainer = document.getElementById('experienceContainer');
const achievementsContainer = document.getElementById('achievementsContainer');
const addSkillButton = document.getElementById('addSkillButton');
const addEducationButton = document.getElementById('addEducationButton');
const addExperienceButton = document.getElementById('addExperienceButton');
const addAchievementsButton = document.getElementById('addAchievementsButton');
let skillCounter = 1;
let educationCounter = 1;
let experienceCounter = 2;
let achievementsCounter = 1;

addSkillButton.addEventListener('click', function () {
  skillCounter++;
  const newSkillItem = document.createElement('div');
  newSkillItem.className = 'form-group skill-item';
  newSkillItem.innerHTML = `
    <input type="text" id="skills_${skillCounter}" name="skills" required>
  `;
  skillsContainer.appendChild(newSkillItem);
  validateForm();
});

addEducationButton.addEventListener('click', function () {
  educationCounter++;
  const newEducationItem = document.createElement('div');
  newEducationItem.className = 'form-group education-item';
  newEducationItem.innerHTML = `
    <label for="school_name_${educationCounter}">School Name:</label>
    <input type="text" id="school_name_${educationCounter}" name="school_name" required>
    <label for="passing_year_${educationCounter}">Passing Year:</label>
    <input type="text" id="passing_year_${educationCounter}" name="passing_year" required>
    <label for="description_${educationCounter}">Description:</label>
    <textarea id="description_${educationCounter}" name="description" required></textarea>
  `;
  educationContainer.appendChild(newEducationItem);
  validateForm();

});

addExperienceButton.addEventListener('click', function () {
  experienceCounter++;
  const newExperienceItem = document.createElement('div');
  newExperienceItem.className = 'form-group experience-item';
  newExperienceItem.innerHTML = `
    <label for="company_name_${experienceCounter}">Company Name:</label>
    <input type="text" id="company_name_${experienceCounter}" name="company_name" required>
    <label for="passing_year_${experienceCounter}">Passing Year:</label>
    <input type="text" id="passing_year_${experienceCounter}" name="passing_year" required>
    <label for="responsibilities_${experienceCounter}">Responsibilities:</label>
    <textarea id="responsibilities_${experienceCounter}" name="responsibilities" required></textarea>
  `;
  experienceContainer.appendChild(newExperienceItem);
  validateForm();

});

addAchievementsButton.addEventListener('click', function () {
  achievementsCounter++;
  const newAchievementsItem = document.createElement('div');
  newAchievementsItem.className = 'form-group achievements-item';
  newAchievementsItem.innerHTML = `
    <label for="field_${achievementsCounter}">Field:</label>
    <input type="text" id="field_${achievementsCounter}" name="field" required>
    <label for="awards_${achievementsCounter}">Awards:</label>
    <input type="text" id="awards_${achievementsCounter}" name="awards" required>

  `;
  achievementsContainer.appendChild(newAchievementsItem);
  validateForm();

});
const collect = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eight']
function toggleInfo(str) {
  const infoDiv = document.getElementById(str);
  if (infoDiv.style.display === 'none') {

    collect.forEach(element => {
      var infoDiv_all = document.getElementById(element);

      if (infoDiv_all.style.display === 'block') {
        setTimeout(() => {
          infoDiv_all.style.display = 'none';
        }, 200);

      }


    });

    setTimeout(() => {
      infoDiv.style.display = 'block';
    }, 200);

  } else {
    setTimeout(() => {
      infoDiv.style.display = 'none';
    }, 200);
  }
}



let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  // let dots = document.getElementsByClassName("dot");
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slides[slideIndex - 1].style.display = "block";

}
form = document.getElementById('resumeForm');

let isProcessing = false;

form.addEventListener('input', validateForm);
form.addEventListener('change', validateForm);
const submitButton = document.getElementById('SubmitButton');
const elements = document.getElementById('not-filled');
function validateForm() {
  if (form.checkValidity()) {
    // submitButton.disabled = false; // Enable the submit button
    elements.textContent = "All Details filled";
    elements.style.color = 'green';
    elements.style.marginLeft ='40%';
    submitButton.style.backgroundColor = '#5b8c4a';

    
    // elements.classList.add('green-color'); // Add the "red-color" class
    submitButton.addEventListener('mouseenter', function() {
      // element.classList.add('hovered');
      submitButton.style.backgroundColor = 'green';
    });

    submitButton.addEventListener('mouseleave', function() {
      // element.classList.remove('hovered');
      submitButton.style.backgroundColor = '#5b8c4a';

    });

    // submitButton.style.color = 'white'
    // submitButton.classList.add('new-submit')
    
  }
  else{
    // elements.classList.remove('green-color') // Add the "red-color" class
    // submitButton.classList.remove('new-submit')
    elements.textContent = "(required fields not filled. Check Again)";
    elements.style.color = 'red';
    elements.style.marginLeft ='37%';
    submitButton.style.backgroundColor = '#af4c60';


    submitButton.addEventListener('mouseenter', function() {
      submitButton.style.backgroundColor = '#f08080';
      // element.classList.add('hovered');
    });

    submitButton.addEventListener('mouseleave', function() {
      // element.classList.remove('hovered');
      submitButton.style.backgroundColor = '#af4c60';

    });
    
    // elements.classList.add('green-color'); // Add the "red-color" class


    // submitButton.style.backgroundColor = 'red';
    // submitButton.style.color = 'white'



  }
}

form.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form submission
  // event.preventDefault(); // Prevent form submission
  elements.textContent = "Please wait... Your Resume is in making";


  if (isProcessing) {
    return;
  }

  const formData = new FormData(form);

  isProcessing = true;

  // Convert form data to JSON object
  const data = {};
  var s = {};

  for (let [key, value] of formData) {
    if (key == 'template') {
      data['template_id'] = value

    }
    if (key == 'name' || key == 'last_name' || key == 'email_address' || key == 'phone_number' || key == 'linkedin_url') {
      if (key == 'name') {
        data['personal_information'] = {};


      }
      data['personal_information'][key] = value;
      continue;
    }
    if (key == "job_title") {
      data[key] = value;
    }
    if (key == "career_objective") {
      data[key] = value
      data['skills'] = [];
      continue;

    }
    if (key == "skills") {
      data['skills'].push(value);
      data['education'] = [];
      data['experience'] = [];
      data['achievements'] = [];
      continue;




    }
    if (key == 'school_name' || key == 'passing_year' || key == 'description') {

      if (key != 'description') {
        s[key] = value;

        continue;
      }
      s[key] = value;

      data['education'].push(s);
      s = {};
      continue;
    }

    if (key == 'company_name' || key == 'passing_year' || key == 'responsibilities') {

      if (key != 'responsibilities') {
        s[key] = value;

        continue;
      }
      s[key] = value;

      data['experience'].push(s);
      s = {};

      continue;
    }

    if (key == 'field' || key == 'awards') {

      if (key != 'awards') {
        s[key] = value;

        continue;
      }
      s[key] = value;

      data['achievements'].push(s);
      s = {};

      continue;
    }


  }
  // Send POST request to server

  fetch('/resume', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'accept': 'application/pdf'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (response.ok) {
        return response.blob(); // Extract the response as a Blob object
      } else {
        elements.style.color = "red";
        elements.textContent = "Failed!!";

        // throw new Error('Request failed with status: ' + response.status +' (' + response.statusText+')');
        return response.text().then(errorMessage => {
          throw new Error('Request failed with status: ' + response.status +' (' + errorMessage +')');
        });
      }
    }) // Extract the response as a Blob object
    .then(blob => {
      // Create a URL object from the Blob
      const url = URL.createObjectURL(blob);

      // Create a temporary <a> element
      const link = document.createElement('a');
      link.href = url;
      link.download = 'merged_document.pdf';
      link.click();

      // Clean up the URL object
      URL.revokeObjectURL(url);
      isProcessing = false;
      elements.textContent = "Downloading Started, Reload to submit another";
    })
    .catch(error => {
      console.log('Error:', error);
      isProcessing = false;
      // window.prompt(error)
      prompt("Server Not Responding, Please try again");
      location.reload();
    });
});
