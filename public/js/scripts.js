/* eslint-disable */
function nonAuth() {
  localStorage.removeItem("auth");
}
function changeAuth() {
  const login = document.getElementById("login");
  const signup = document.getElementById("signup");
  const auth = JSON.parse(localStorage.getItem("auth"));
  if (!auth) {
    return;
  }
  signup.innerHTML = "Logout";
  signup.addEventListener("click", nonAuth);
  signup.href = "";
  login.removeAttribute("href");
  login.addEventListener("click", () => {
    const showAuth = document.getElementById("showAuth");

    showAuth.style.display = "block";
    window.addEventListener("click", e => {
      if (e.target === showAuth) {
        showAuth.style.display = "none";
      }
    });
    document.getElementById("authName").innerHTML = auth.user_name;
    document.getElementById("authPhone").innerHTML = auth.user_phone;
    document.getElementById("authEmail").innerHTML = auth.user_email;
    document.getElementById("authPermission").innerHTML = auth.user_permission;
  });
  login.innerHTML = auth.user_name;
}
function checkpass() {
  const pass1 = document.getElementById("userpassword");
  const pass2 = document.getElementById("userpassword2");
  const alertDanger = document.getElementById("alertDanger");
  if (pass1.value === pass2.value) {
    return true;
  }
  pass2.focus();
  alertDanger.innerHTML = "Confirm Password not correct!";
  alertDanger.className = "alert alert-danger col-5 m-auto";
  return false;
}
function goToBill() {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const gotobill = document.getElementById("goToBill");
  if (auth) {
    gotobill.href = "/bill/" + auth._id;
  } else {
    gotobill.href = "#";
    gotobill.onclick = () => {
      if (confirm("Login first!")) {
        window.location = "/user/login";
      }
    };
  }
}
function postAddBill() {
  const addBill = document.getElementById("addBill");
  if (!addBill) return;
  addBill.onsubmit = () => {
    const proIdInput = document.getElementsByName("proId");
    const proPriceInput = document.getElementsByName("proPrice");
    const billValue = document.getElementById("billValue");
    const proQuantityInput = document.getElementsByName("proQuantity");
    const proName = document.getElementsByName("proName");
    const rootQuantity = document.getElementsByName("rootQuantity");
    const auth = JSON.parse(localStorage.getItem("auth"));
    let proId = [];
    let proPrice = [];
    let proQuantity = [];
    let totalPrice = 0;
    let bill;
    if (!auth) {
      alert("Login First!");
      return false;
    }
    for (let i = 0; i < proIdInput.length; i++) {
      totalPrice += proPriceInput[i].value * proQuantityInput[i].value;
      proId.push(proIdInput[i].value);
      proPrice.push(proPriceInput[i].value);
      proQuantity.push(proQuantityInput[i].value);
      if (parseInt(proQuantityInput[i].value, 10) > parseInt(rootQuantity[i].value, 10)){
        alert("Product : " + 
            proName[i].value + 
            " not enough quantity!\nCurrent quantity in stock : "+ 
            rootQuantity[i].value
          );
        proQuantityInput[i].focus();
        return false;
      }
    }
    bill = {
      authId: auth._id,
      totalPrice: totalPrice,
      status: "unpaid",
      details: {
        proId: proId,
        proPrice: proPrice,
        proQuantity: proQuantity
      }
    };

    bill = JSON.stringify(bill);
    billValue.value = bill;
    return true;
  };
}
function changeDataFromCart() {
  const proQuantity = document.getElementsByName("proQuantity");
  const proPrice = document.getElementsByName("proPrice");
  const totalPriceOfProduct = document.getElementsByClassName(
    "totalPriceOfProduct"
  );
  if (!proQuantity) {
    return;
  }
  for (let i = 0; i < proQuantity.length; i++) {
    proQuantity[i].onchange = function() {
      const total = proPrice[i].value * this.value;
      totalPriceOfProduct[i].innerHTML = "$" + total;
      getTotalPriceAll();
    };
  }
}
function getTotalPriceAll() {
  const price = document.getElementsByName("proPrice");
  const quantity = document.getElementsByName("proQuantity");
  const Total = document.getElementsByClassName("subTotalAndTotal");
  let total = 0;
  for (let i = 0; i < price.length; i++) {
    total += price[i].value * quantity[i].value;
  }
  Total[0].innerHTML = "$" + total;
  Total[1].innerHTML = "$" + total;
}
function changeQuantity(e) {
  const proId = document.getElementById("proId");
  const proPrice = document.getElementById("proPrice");
  const proQuantity = document.getElementById("proQuantity");
  const totalPrice = document.getElementById("totalPrice");
  console.log(e.value);
  console.log(proId);
  console.log(proPrice);
  console.log(proQuantity);
  console.log(totalPrice);
}
window.onload = () => {
  changeAuth();
  postAddBill();
  changeDataFromCart();
  try {
    goToBill();
  } catch (e) {}
};
