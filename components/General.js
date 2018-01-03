class CopyEmail {
	constructor(element) {
		this.element = element;
		this.input = document.querySelector("#input")
		this.emailAddress = "chasamuels@gmail.com"
		this.copyEmail = "copy email address";
		this.copyConfirm = "copied to clipboard!";


		this.init();

		this.element.addEventListener("click", () => {
			if (this.element.textContent === this.copyEmail) {
				this.input.type = "text";
				this.input.select();
				document.execCommand("copy");
				this.input.type = "hidden";
				this.element.textContent = this.copyConfirm 
			} else {
				this.element.textContent = this.copyEmail
			}

			event.stopPropagation();
		});
	};

	init() {
		this.input.value = this.emailAddress;
		this.element.textContent = this.copyEmail
	}
}

const copyEmailAPI = new CopyEmail(document.querySelector("#emailAddressButtonID"));