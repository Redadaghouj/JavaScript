// UI Variables
const form = document.querySelector('#project-form');
const projectList = document.querySelector('ul.collection');
const clearButton = document.querySelector('.clear-projects');
const filterInput = document.querySelector('#filter');
const projectInput = document.querySelector('#project');

loadEventListeners();

function loadEventListeners() {
  // DOM load event
  document.addEventListener('DOMContentLoaded', getProjects);
  // Add project event
  form.addEventListener('submit', addProject);
  // Remove project event
  projectList.addEventListener("click", removeProject);
  // Clear project event
  clearButton.addEventListener('click', clearProject);
  // Filter project event
  filterInput.addEventListener('keyup', filterProject);
}

function getProjects() {
  let projects;
  if (localStorage.getItem('projects') === null) {
    projects = [];
  }
  else {
    projects = JSON.parse(localStorage.getItem('projects'));
  }
  projects.forEach(function (project) {
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(project));
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
    projectList.appendChild(li);
  });

}

function addProject(e) {
  if (projectInput.value === '') {
    alert('Type a project name');
  }
  else {
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(projectInput.value));
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
    projectList.appendChild(li);
  }
  // Store values in local storage
  storeProjectInLocal(projectInput.value);
  projectInput.value = '';
  e.preventDefault();
}

function storeProjectInLocal(projectName) {
  let projects;
  if (localStorage.getItem('projects') === null) {
    projects = [];
  }
  else {
    projects = JSON.parse(localStorage.getItem('projects'));
  }
  projects.push(projectName);
  localStorage.setItem('projects', JSON.stringify(projects));
}

function removeProject(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure ?')) {
      e.target.parentElement.parentElement.remove();
      removeProjectFromLocal(e.target.parentElement.parentElement);
    }
  }
}

function removeProjectFromLocal(ProjectItem) {
  let projects;
  if (localStorage.getItem('projects') === null) {
    projects = [];
  }
  else {
    projects = JSON.parse(localStorage.getItem('projects'));
  }
  projects.forEach(function (projectName, index) {
    if (ProjectItem.textContent === projectName) {
      projects.splice(index, 1);
    }
  });
  localStorage.setItem('projects', JSON.stringify(projects));
}

function clearProject(e) {
  // projectList.innerHTML = '';

  while (projectList.firstChild) {
    projectList.removeChild(projectList.firstChild);
  }
  localStorage.clear();
}

function filterProject(e) {
  const filterText = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function (project) {
    if (project.firstChild.textContent.toLowerCase().indexOf(filterText) != -1)
      project.style.display = 'block';
    else {
      project.style.display = 'none';
    }
  })
}