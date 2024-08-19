const form = document.querySelector(".form");
const btnGet = document.querySelector(".btnGet");
const usersContainer = document.querySelector(".usersContainer");
const user = document.querySelector(".user");

const global = () => {
  let users = [];
  let flag = true;

  const getUsers = () => {
    if (flag === true) {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((data) =>
          data.forEach((item) => {
            users.push(item);
            usersContainer.innerHTML += `<div class=user><h2>User ${item.id}</h2><span>${item.title}</span><button class=delete id=${item.id}>Delete</button></div>`;
          })
        )
        .catch(() => {
          alert("Пользователей не найдено");
        });
      flag = false;
    }
  };

  btnGet.addEventListener("click", getUsers);

  const renderUsers = (array) => {
    usersContainer.innerHTML = ``;
    array.forEach((item) => {
      usersContainer.innerHTML += `<div class=user><h2>User ${item.id}</h2><span>${item.title}</span><button class=delete id=${item.id}>Delete</button></div>`;
    });
  };

  const deleteUser = (event) => {
    if (event.target.classList.contains("delete")) {
      const { id } = event.target;
      const newUsers = users.filter((item) => {
        if (item.id === +id) {
          return false;
        }
        return true;
      });
      users = newUsers;
      renderUsers(users);
    }
  };

  usersContainer.addEventListener("click", deleteUser);
};
global();
