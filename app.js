//function  get api
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
let tableContent = document.querySelector(".table-content");
getData("http://localhost/restfullApi-php/api/users/read.php", "get", "").then(
  (data) => {
    let userList = data["data"];
    userList.forEach((item) => {
      let template = `
				 <tr >
						<td>${item.username}</td>
						<td>${item.password}</td>
						<td>${item.phone}</td>
						<td>${item.email}</td>
						<td><div  data-id=${item.id} class='btn-edit btn btn-warning'>Edit</div></td>
						<td><div  data-id=${item.id} class='btn-delete btn btn-danger'>Delete</div></td>
				 </tr>
			`;
      tableContent.insertAdjacentHTML("beforeend", template);
    });
  }
);
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
//create
formUser = document.querySelector(".form-user");
formUser.addEventListener("click", (e) => {
  let username = formUser.querySelector('input[name="username"]').value;
  let password = formUser.querySelector('input[name="password"]').value;
  let phone = formUser.querySelector('input[name="phone"]').value;
  let email = formUser.querySelector('input[name="email"]').value;
  if (username === "" && password === "" && phone === "" && email === "")
    return;
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
