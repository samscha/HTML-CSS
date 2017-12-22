class Portal {
	constructor(element) {
		this.element = element;
	}

	toggle() {
		this.element.classList.toggle("ProjectsContent__projLink-selected")
	}
}

class Project {
	constructor(element) {
		this.element = element;
		this.element.addEventListener('click', (event) => {
			event.projKey = this.element.dataset.proj;
		});
	}

	toggle() {
		this.element.classList.toggle("ProjectsContent__project-selected")
	}
}

class Projects {
	constructor(element) {
		this.element = element;
    	this.projects = element.querySelectorAll(".ProjectsContent__project");
		this.projects = Array.from(this.projects).reduce((obj, project) => {
			obj[project.dataset.proj] = new Project(project);
			return obj;
		}, {});

		this.portals = this.element.querySelectorAll(".ProjectsContent__projLink");
		this.portals = Array.from(this.portals).reduce((obj, portal) => {
			obj[portal.dataset.proj] = new Portal(portal);
			return obj;
		}, {});

		this.element.addEventListener('click', (event) => {
			if (event.projKey) {
				this.updateActive(event.projKey);
				event.stopPropagation();
			}
		});

		this.init();
	}

	init() {
		this.activeKey = this.element.querySelector(".ProjectsContent__project")
		this.activeKey = this.activeKey.dataset.proj;
		this.projects[this.activeKey].toggle();
		this.portals[this.activeKey].toggle();
	}

	updateActive(key) {
		this.projects[this.activeKey].toggle();
		this.portals[this.activeKey].toggle();
		this.activeKey = key;
		this.projects[this.activeKey].toggle();
		this.portals[this.activeKey].toggle();
	}
}

let projects = document.querySelectorAll(".ProjectsContent");
projects = Array.from(projects).map(projects => new Projects(projects));
