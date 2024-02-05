import User from "./modules/User.js";
const tableauUser = [];

const randomURL = `https://randomuser.me/api/?results=20`;

const getPeople = async () => {
  try {
    const response = await fetch(randomURL);
    const data = await response.json();
    const cleanPeople = cleanUser(data.results);
    //console.log(data);

    cleanPeople.forEach((person) => {
      tableauUser.push(new User(person));
    });
    sortAZ();
    renderUser();
  } catch (error) {
    console.log(error.message);
  }
};

const cleanUser = (data) => {
  const personnes = data;
  return personnes.map((person) => {
    return {
      title: person.name.title,
      first: person.name.first,
      last: person.name.last,
      city: person.location.city,
      country: person.location.country,
      age: person.dob.age,
      email: person.email,
      photo: person.picture.large,
    };
  });
};

getPeople();

function renderUser() {
  tableauUser.forEach((person) => {
    person.render();
  });
}

document.querySelector("#sort--name").addEventListener("click", () => {
  sortAZ();
  document.querySelector("#sort--name").classList.add("selected");
  document.querySelector("#sort--age").classList.remove("selected");
});

document.querySelector("#sort--age").addEventListener("click", (e) => {
  tableauUser.sort((a, b) => {
    return a.age - b.age;
  });
  document.querySelector("#sort--name").classList.remove("selected");
  document.querySelector("#sort--age").classList.add("selected");
  renderUser();
});

function sortAZ() {
  tableauUser.sort((a, b) => {
    if (a.last < b.last) {
      return -1;
    }
    if (a.last > b.last) {
      return 1;
    }
    return 0;
  });
  renderUser();
}

//ppl.then((res) => console.log(res));

const userInfo = { name: "alice", age: 25, city: "Paris" };
const userInfoString = JSON.stringify(userInfo);

localStorage.setItem("untruc", userInfoString);
let recup = localStorage.getItem("untruc");
recup = JSON.parse(recup);
console.log(recup);
