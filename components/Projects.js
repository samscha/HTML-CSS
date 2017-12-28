class Portal {
	constructor(element) {
		this.element = element;
		this.element.addEventListener('click', (event) => {
			event.projKey = this.element.dataset.proj;
		});
	}

	show() {
		this.element.classList.add("Project__back-selected");
	}

	hide() {
		this.element.classList.remove("Project__back-selected");
	}

	toggle() {
		this.element.classList.toggle("Project__back-selected");
	}
}

class Project {
	constructor(element) {
		this.element = element;
		this.element.addEventListener('click', (event) => {
			event.projKey = this.element.dataset.proj;
		});
	}

	show() {
		this.element.classList.add("Project__face-selected")
	}

	hide() {
		this.element.classList.remove("Project__face-selected")
	}

	toggle() {
		this.element.classList.toggle("Project__face-selected")
	}
}

class Projects {
	constructor(element) {
		this.element = element;
    	this.projects = element.querySelectorAll(".Project__face");
		this.projects = Array.from(this.projects).reduce((obj, project) => {
			obj[project.dataset.proj] = new Project(project);
			return obj;
		}, {});

		this.portals = this.element.querySelectorAll(".Project__back");
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
		// this.activeKey = this.element.querySelector(".Project__back")
		// this.activeKey = this.activeKey.dataset.proj;
		// this.projects[this.activeKey].select();
		// this.portals[this.activeKey].select();
	}

	updateActive(key) {
		// console.log(key);
		// console.log(this.activeKey);
		if (key === this.activeKey) {
			this.projects[this.activeKey].hide();
			this.portals[this.activeKey].hide();
			this.activeKey = undefined;
		} else {
			this.activeKey = key;
			this.projects[this.activeKey].show();
			this.portals[this.activeKey].show();
		}
		// console.log(this.activeKey);
	}
}

let projects = document.querySelectorAll(".ProjectsContent");
projects = Array.from(projects).map(projects => new Projects(projects));
