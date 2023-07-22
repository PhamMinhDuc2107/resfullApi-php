//function  get api
let page = 1;
let limit = 2;
let pagination = document.querySelector(".pagination");
async function getData(endpoint, method, data) {
  try {
    let response = "";
    if (method === "get") {
      response = await fetch(endpoint);
    } else {
      response = await fetch(endpoint, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    }
    if (response && response.status !== 200) {
      throw new Error(
        "Something went wrong with status code" + response.status
      );
    }
    let result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
  }
}
//create pagination
function createPaginationTemplate(totalPages) {
  let template = "";
  for (let i = 1; i <= totalPages; i++) {
    template += `<li><a href="#" data-page="${i}">${i}</a></li>`;
  }
  pagination.insertAdjacentHTML("beforeend", template);
}
let tableContent = document.querySelector(".table-content");
function updateDataOnPaginationClick(page) {
  let tableContent = document.querySelector(".table-content");
  getData(
    `http://localhost/restfullApi-php/api/users/read.php?page=${page}&limit=${limit}`,
    "get",
    ""
  ).then((data) => {
    tableContent.innerHTML = "";
    let userList = data["data"];
    userList.forEach((item) => {
      let template = `
			 <tr>
				<td>${item.username}</td>
				<td>${item.password}</td>
				<td>${item.phone}</td>
				<td>${item.email}</td>
				<td><div data-id=${item.id} class='btn-edit btn btn-warning'>Edit</div></td>
				<td><div data-id=${item.id} class='btn-delete btn btn-danger'>Delete</div></td>
			</tr>
		`;
      tableContent.insertAdjacentHTML("beforeend", template);
    });
  });
}
updateDataOnPaginationClick(page);
//insert pagination
getData(
  `http://localhost/restfullApi-php/api/users/read.php?page=${page}&limit=${limit}`,
  "get",
  ""
).then((data) => {
  let totalRecords = data["totalRecords"];
  let totalPages = Math.ceil(totalRecords / limit);
  createPaginationTemplate(totalPages);
});
pagination.addEventListener("click", (e) => {
  e.preventDefault();
  let allLinks = document.querySelectorAll(".pagination a");
  allLinks.forEach((link) => link.classList.remove("is-active"));
  if (e.target.tagName === "A") {
    let page = e.target.getAttribute("data-page");
    e.target.classList.add("is-active");
    updateDataOnPaginationClick(page);
  }
});
//delete && edit
document.body.addEventListener("click", (e) => {
  if (e.target.matches(".btn-delete")) {
    let idValue = e.target.getAttribute("data-id");
    let id = {
      id: idValue,
    };
    let endpoint = "http://localhost/restfullApi-php/api/users/delete.php";
    getData(endpoint, "delete", id).then((data) => {
      alert(`Xoá tài khoản thành công ${data}`);
      window.location.href = "index.html";
    });
  } else if (e.target.matches(".btn-edit")) {
    let idValue = e.target.getAttribute("data-id");
    let endpoint = `http://localhost/restfullApi-php/api/users/show.php?id=${idValue}`;
    getData(endpoint, "get", "").then((data) => {
      document.querySelector('input[name="username"]').value = data.username;
      document.querySelector('input[name="password"]').value = data.password;
      document.querySelector('input[name="phone"]').value = data.phone;
      document.querySelector('input[name="email"]').value = data.email;
      document.querySelector('input[name="id"]').value = idValue;
    });
  }
});
//create && edit
formUser = document.querySelector(".form-user");
formUser.addEventListener("click", (e) => {
  let username = formUser.querySelector('input[name="username"]').value;
  let password = formUser.querySelector('input[name="password"]').value;
  let phone = formUser.querySelector('input[name="phone"]').value;
  let email = formUser.querySelector('input[name="email"]').value;
  if (username === "" && password === "" && phone === "" && email === "")
    return;
  //create
  if (e.target.matches(".btn-create")) {
    const user = {
      username: `${username}`,
      password: `${password}`,
      email: `${email}`,
      phone: `${phone}`,
    };
    let endpoint = "http://localhost/restfullApi-php/api/users/create.php";
    getData(endpoint, "post", user).then((data) => {
      alert("Tạo tài khoản thành công");
      window.location.href = "index.html";
    });
  } else if (e.target.matches(".btn-update")) {
    //edit;
    let id = document.querySelector('input[name="id"]').value;
    const user = {
      username: `${username}`,
      password: `${password}`,
      email: `${email}`,
      phone: `${phone}`,
      id: `${id}`,
    };
    console.log(user);
    let endpoint = "http://localhost/restfullApi-php/api/users/update.php";
    getData(endpoint, "post", user).then((data) => {
      alert("Tạo tài khoản thành công");
      window.location.href = "index.html";
    });
  }
});
