class ProjectBack {
	constructor(element) {
		this.element = element;
	}

	show() {
		this.element.classList.add("Project__back-selected");
	}

	hide() {
		this.element.classList.remove("Project__back-selected");
	}
}

class ProjectFace {
	constructor(element) {
		this.element = element;
	}

	show() {
		this.element.classList.add("Project__face-selected")
	}

	hide() {
		this.element.classList.remove("Project__face-selected")
	}
}

class Project {
	constructor(element) {
		this.element = element;
		this.face = new ProjectFace(this.element.querySelector(".Project__face"));
		this.back = new ProjectBack(this.element.querySelector(".Project__back"));

		this.element.addEventListener('click', (event) => {
			event.projKey = this.element.dataset.proj;
		});

		this.init();
	}

	init() {
		this.face.show();
		this.back.hide();
	}

	show() {
		this.element.classList.add("Project-selected");
	}

	hide() {
		this.element.classList.remove("Project-selected");
		this.back.hide();
		this.face.show();
	}
}

class CarouselArrow {
	constructor(element) {
		this.element = element;

		this.element.addEventListener('mousedown', (event) => {
			this.element.classList.add("Carousel__arrow-click");
		});

		this.element.addEventListener('mouseup', (event) => {
			this.element.classList.remove("Carousel__arrow-click");
		});

		this.element.addEventListener('click', (event) => {
			event.direction = this.element.dataset.arrow
		});

		this.element.addEventListener('mouseover', (event) => {
			this.element.classList.add("Carousel__arrow-mouseover");
		});

		this.element.addEventListener('mouseout', (event) => {
			this.element.classList.remove("Carousel__arrow-mouseover");
			this.element.classList.remove("Carousel__arrow-click");
		});
	}

	mouseDown() {
			this.element.classList.add("Carousel__arrow-click");
		}

}

class Carousel {
	constructor(element) {
		this.element = element;
		this.left;
		this.right;
    	this.projects;
    	this.projectsArray;
    	this.activeProject;

		this.element.addEventListener('click', (event) => {
			if (event.projKey) {
				this.updateActive(event.projKey);
				event.stopPropagation();
			}

			if (event.direction) {
				this.updateCarousel(event.direction);
				event.stopPropagation();
				event.direction = null;
			}
		});

		this.init();
	}

	init() {
		this.left = new CarouselArrow(this.element.querySelector(".Carousel__arrow-left"));
		this.right = new CarouselArrow(this.element.querySelector(".Carousel__arrow-right"));

		this.projects = this.element.querySelectorAll(".Project");
		this.projects = Array.from(this.projects).reduce((obj, project) => {
			obj[project.dataset.proj] = new Project(project);
			return obj;
		}, {});

		this.projectsArray = Object.values(this.projects);

		this.activeProject = document.querySelector(".Project-focused");
		if (this.activeProject) {
			Object.values(this.projects).forEach((project) => {
				if (this.activeProject === project.element) {
					this.activeProject = project;
				}
			});
		} else {
			this.activeProject = this.projects["portfolioweb"];
		}

		this.activeProject.show();
	}

	updateCarousel(direction) {
		this.activeProject.hide();
		this.activeProject = this.projectsArray[this.moveCarousel(direction)];
		this.activeProject.show();
	}

	moveCarousel(direction) {
		let currentIndex = 0;
		for (let i = 0; i < this.projectsArray.length; i++) {
			if (this.projectsArray[i] === this.activeProject) currentIndex = i;
		}

		if (direction === 'l') {
			if (currentIndex === 0) return this.projectsArray.length - 1;
			else return --currentIndex;
		} else {
			if (currentIndex === this.projectsArray.length - 1) return 0;
			else return ++currentIndex;
		}
	}

	updateActive(key) {
		if (key === this.activeKey) {
			this.showFront();
		} else {
			this.activeKey = key;
			this.showBack();
		}
	}

	showFront() {
		this.projects[this.activeKey].face.show();
		this.projects[this.activeKey].back.hide();
		this.activeKey = undefined;
	}

	showBack() {
		this.projects[this.activeKey].face.hide();
		this.projects[this.activeKey].back.show();
	}
}

let carousel = document.querySelectorAll(".Carousel");
carousel = Array.from(carousel).map(projects => new Carousel(projects));
