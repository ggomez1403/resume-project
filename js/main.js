import { latestProjects, previousProjects } from "./projects.js";
import { selectRandomIcon } from "./randomIcon.js";
import { backendSkills, frontendSkills, otherSkills } from "./skills.js";
import { studies } from "./studies.js";

const addSkillBtn = document.querySelector(".add-skill-btn");
const skillsFrontend = document.querySelector(".frontend");
const skillsBackend = document.querySelector(".backend");
const skillsOthers = document.querySelector(".others");

const form = document.querySelector(".form");
const formName = form.querySelector('[name="name"]');
const formEmail = form.querySelector('[name="email"]');
const formMessage = form.querySelector('[name="message"]');

const educationContainer = document.querySelector(".education-container");
const projectsContainer = document.querySelector(".projects-container");
const previouProjectsBtn = document.querySelector(".previous-projects");

document.addEventListener("DOMContentLoaded", () => {
  iterateSkillsArrays(frontendSkills, backendSkills, otherSkills);
  iterateStudiesArray(studies);
  iterateProjectsArray(latestProjects);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  createMessageSubmitForm(formName, formEmail, formMessage);
  rateResume();
});

addSkillBtn.addEventListener("click", () => {
  enterSkillData();
});

previouProjectsBtn.addEventListener("click", () => {
  enterPreviousProjectsData();
});

const iterateSkillsArrays = (frontendArray, backendArray, othersArray) => {
  frontendArray.map((skill) => {
    skillsFrontend.innerHTML += loadFrontendSkills(skill);
  });

  backendArray.map((skill) => {
    skillsBackend.innerHTML += loadBackendSkills(skill);
  });

  othersArray.map((skill) => {
    skillsOthers.innerHTML += loadOtherSkills(skill);
  });
};

const loadFrontendSkills = ({ icon, skill }) => {
  return `
  <li class="single-skill">
    <i class="fa-brands fa-${icon}"></i>
    <p>${skill}</p>
  </li>`;
};

const loadBackendSkills = ({ icon, skill }) => {
  return `
  <li class="single-skill">
    <i class="${icon}"></i>
    <p>${skill}</p>
  </li>`;
};

const loadOtherSkills = ({ icon, skill }) => {
  return `
  <li class="single-skill">
    <i class="${icon}"></i>
    <p>${skill}</p>
  </li>`;
};

const enterSkillData = () => {
  const newSkillCategory = parseInt(
    prompt(
      "Select the category of the category\n1. Frontend\n2. Backend\n3. Other"
    )
  );

  if (
    isNaN(newSkillCategory) ||
    newSkillCategory <= 0 ||
    newSkillCategory > 3
  ) {
    alert("Please enter a valid number");
    return;
  }

  const newSkillName = prompt("Enter the skill name");

  selectSkillCategory(newSkillCategory, newSkillName);
};

const selectSkillCategory = (newSkillCategory, newSkillName) => {
  switch (newSkillCategory) {
    case 1:
      addFrontendSkill(newSkillName);
      break;
    case 2:
      addBackendSkill(newSkillName);
      break;
    case 3:
      addOthersSkill(newSkillName);
      break;
  }
};

const addFrontendSkill = (newSkillName) => {
  const div = document.createElement("div");
  div.classList.add("single-skill");

  const icon = document.createElement("i");
  icon.classList.add("fa-solid", `fa-${selectRandomIcon()}`);

  const p = document.createElement("p");
  p.textContent = newSkillName;

  div.appendChild(icon);
  div.appendChild(p);

  skillsFrontend.appendChild(div);
};

const addBackendSkill = (newSkillName) => {
  const div = document.createElement("div");
  div.classList.add("single-skill");

  const icon = document.createElement("i");
  icon.classList.add("fa-solid", `fa-${selectRandomIcon()}`);

  const p = document.createElement("p");
  p.textContent = newSkillName;

  div.appendChild(icon);
  div.appendChild(p);

  skillsBackend.appendChild(div);
};

const addOthersSkill = (newSkillName) => {
  const div = document.createElement("div");
  div.classList.add("single-skill");

  const icon = document.createElement("i");
  icon.classList.add("fa-solid", `fa-${selectRandomIcon()}`);

  const p = document.createElement("p");
  p.textContent = newSkillName;

  div.appendChild(icon);
  div.appendChild(p);

  skillsOthers.appendChild(div);
};

const iterateStudiesArray = (studiesArray) => {
  studiesArray.map((study) => {
    educationContainer.innerHTML += loadSingleStudy(study);
  });
};

const loadSingleStudy = ({ url, institution, study, date }) => {
  return `
    <article class="single-education">
        <div class="education-title">
            <img src=${url} alt="${institution} logo">
            <p>${institution}</p>
        </div>
        <div class="education-info">
            <p>${study}</p>
            <p class="gray-text-info">${date}</p>
        </div>
    </article>
  `;
};

const personalizedGreeting = () => {
  alert(
    "Thanks for visiting my projects section! Below you will see all my projects"
  );
};

const iterateProjectsArray = (projectsArray) => {
  projectsArray.map((project) => {
    projectsContainer.innerHTML += loadSingleProject(project);
  });
};

const loadSingleProject = ({
  icon,
  colorTags,
  title,
  tags,
  description,
  liveSite,
  sourceCode,
}) => {
  return `
    <article class="single-project">
        <div class="project-icon-container icon-${colorTags}">
            <i class="fa-solid fa-${icon}"></i>
        </div>
        <div class="project-info">
            <p class="project-title">${title}</p>
            <ul class="project-tags">
              ${tags
                .map((tag) => `<li class="tag tag-${colorTags}">${tag}</li>`)
                .join("")}
            </ul>
            <p class="gray-text-info">${description}</p>
        </div>
        <div class="project-link">
            <div class="single-link live-site-link">
                <div class="project-link-icon">
                    <i class="fa-solid fa-link"></i>
                </div>
                <a href="${liveSite}"
                    target="_blank">Live
                    Site</a>
            </div>
            <div class="single-link source-code-link">
                <div class="project-link-icon">
                    <i class="fa-solid fa-code"></i>
                </div>
                <a href="${sourceCode}" target="_blank">Source Code
                </a>
            </div>
        </div>
    </article>
  `;
};

let projectsShown = 0;

const enterPreviousProjectsData = () => {
  const totalProjects = previousProjects.length;
  let amountProjectsToShow;

  if (projectsShown === 0) {
    amountProjectsToShow = parseInt(
      prompt("Enter the number of previous projects you want to see (Max 5)")
    );
    if (isNaN(amountProjectsToShow) || amountProjectsToShow <= 0) {
      alert("Please enter a valid number");
      return;
    }
  } else {
    amountProjectsToShow = totalProjects - projectsShown;
  }

  iteratePreviousProjectsArray(previousProjects, amountProjectsToShow);
  projectsShown += amountProjectsToShow;

  if (projectsShown >= totalProjects) {
    previouProjectsBtn.textContent = "All Projects Displayed";
    previouProjectsBtn.disabled = true;
    personalizedGreeting();
  } else {
    previouProjectsBtn.textContent = "Show Remaining Projects";
  }
};

const iteratePreviousProjectsArray = (
  previousProjectsArray,
  amountProjects
) => {
  for (let i = projectsShown; i < projectsShown + amountProjects; i++) {
    if (i < previousProjectsArray.length) {
      projectsContainer.innerHTML += loadSingleProject(
        previousProjectsArray[i]
      );
    }
  }
};

const createMessageSubmitForm = (formName, formEmail, formMessage) => {
  if (
    formName.value === "" ||
    formEmail.value === "" ||
    formMessage.value === ""
  ) {
    alert("Please complete all fields");
    return;
  }

  alert(`Thanks ${formName.value}, I'll get in contact with you soon.`);
  form.reset();
};

const rateResume = () => {
  const rate = parseInt(prompt("From 1 to 10, how would you rate my resume?"));

  if (isNaN(rate) || rate <= 0 || rate > 10) {
    alert("Please enter a valid number");
    return;
  }

  alert(`Thank you for rating my resume a ${rate}!`);
};
