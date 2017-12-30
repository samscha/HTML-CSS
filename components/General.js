class CopyEmail {
	constructor(element) {
		this.element = element;
		this.input = document.querySelector("#input")
		this.copyConfirm = "copied!";
		this.emailAddress = "chasamuels@gmail.com";


		this.init();

		this.element.addEventListener("click", () => {
			this.input.type = "text";
			this.input.select();
			document.execCommand("copy");

			this.input.type = "hidden";
			this.element.textContent === this.emailAddress ? this.element.textContent = this.copyConfirm : this.element.textContent = this.emailAddress;
			event.stopPropagation();
		});
	};

	init() {
		this.input.value = this.emailAddress;
	}
}

const copyEmailAPI = new CopyEmail(document.querySelector("#emailAddressButtonID"));