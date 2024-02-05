class User {
  #title;
  #first;
  last;
  #email;
  age;
  #country;
  #city;
  #photo;
  #isHere;
  #theUser;
  static cptHere = 0;

  constructor(personData) {
    this.#title = personData.title;
    this.#first = personData.first;
    this.last = personData.last;
    this.#email = personData.email;
    this.age = personData.age;
    this.#country = personData.country;
    this.#city = personData.city;
    this.#photo = personData.photo;
    this.#isHere = false;
    this.#theUser = this.#generateUser();
    this.#theUser.addEventListener("click", (event) => {
      this.togglePresence(event.currentTarget);
    });
  }

  #generateUser() {
    const containerElement = document.createElement("div");
    containerElement.classList.add("user");
    containerElement.dataset.present = this.#isHere;

    const childHTML = `
		<img src="${this.#photo}">
		<div class="user--info">
				<h1>${this.#title} ${this.#first} ${this.last}</h1>
				<p>${this.age} years old</p>
				<p>${this.#city}, ${this.#country}</p>
		</div>
        <a href="mailto:${this.#email}">
            <span class="mail">✉️</span>
        </a>
    `;
    containerElement.insertAdjacentHTML("afterbegin", childHTML);
    return containerElement;
  }

  render() {
    const main = document.querySelector("main");
    main.appendChild(this.#theUser);
  }

  togglePresence(divPerson) {
    if (divPerson.dataset.present === "true") {
      divPerson.dataset.present = "false";
      this.#isHere = false;
      User.cptHere--;
    } else {
      divPerson.dataset.present = "true";
      this.#isHere = true;
      User.cptHere++;
    }
    document.querySelector(
      ".counter"
    ).textContent = `${User.cptHere}/20 people are here`;
  }
}

export default User;
