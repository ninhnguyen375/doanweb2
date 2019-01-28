/* eslint-disable */
function nonAuth() {
  localStorage.removeItem('auth');
  window.location = '/';
}
function changeAuth() {
  const login = document.getElementById('login');
  const signup = document.getElementById('signup');
  const loginDropdown = document.getElementById('loginDropdown');
  const auth = JSON.parse(localStorage.getItem('auth'));
  const adminPage = document.getElementById('adminPage');
  const adminName = document.getElementById('adminName');
  if (!auth) {
    return;
  }
  if (auth.user_permission === 'admin') {
    if (adminPage) {
      adminPage.style.display = 'block';
    }
    if (adminName) {
      adminName.innerHTML = auth.user_name;
    }
  }
  if (signup) {
    signup.innerHTML = 'Logout';
    signup.href = '/user/login';
    signup.addEventListener('click', nonAuth);
  }
  if (loginDropdown) {
    loginDropdown.innerHTML = auth.user_name;
  }
  if (login) {
    login.removeAttribute('href');
    login.addEventListener('click', () => {
      const showAuth = document.getElementById('showAuth');
      showAuth.style.display = 'block';
      window.addEventListener('click', e => {
        if (e.target === showAuth) {
          showAuth.style.display = 'none';
        }
      });
      document.getElementById('authName').innerHTML = auth.user_name;
      document.getElementById('authPhone').innerHTML = auth.user_phone;
      document.getElementById('authEmail').innerHTML = auth.user_email;
      document.getElementById('authPermission').innerHTML = auth.user_permission;
    });
    login.innerHTML = 'Profile';
  }
}
function renderSearch() {
  const search = document.getElementById('valueToRenderSearch');
  if (!search) return;
  search.onkeyup = function() {
    const items = document.getElementsByClassName('items');
    const item_names = document.getElementsByClassName('item-names');
    const listPages = document.getElementById('listPages');
    for (let i = 0; i < items.length; i++) {
      if (
        item_names[i].innerHTML
          .toLowerCase()
          .trim()
          .indexOf(search.value.toLowerCase().trim()) !== -1
      ) {
        items[i].className = 'items';
      } else {
        items[i].className = 'items hidden';
      }
    }
    if (search.value !== '') {
      listPages.className += 'container text-center hidden';
    } else {
      listPages.className += 'container text-center';
    }
  };
}
function goToBillandCart() {
  const auth = JSON.parse(localStorage.getItem('auth'));
  const gotobill = document.getElementById('goToBill');
  const gotocart = document.getElementById('goToCart');
  if (auth) {
    gotobill.href = '/bill/' + auth.user_id;
    gotocart.href = '/cart/' + auth.user_id;
  } else {
    gotobill.href = '#';
    gotobill.onclick = () => {
      if (confirm('Login first!')) {
        window.location = '/user/login';
      }
    };
    gotocart.href = '#';
    gotocart.onclick = () => {
      if (confirm('Login first!')) {
        window.location = '/user/login';
      }
    };
  }
}
function postAddBill() {
  const addBill = document.getElementById('addBill');
  if (!addBill) return;
  addBill.onsubmit = () => {
    const proIdInput = document.getElementsByName('proId');
    const proPriceInput = document.getElementsByName('proPrice');
    const billValue = document.getElementById('billValue');
    const proQuantityInput = document.getElementsByName('proQuantity');
    const proName = document.getElementsByName('proName');
    const rootQuantity = document.getElementsByName('rootQuantity');
    const auth = JSON.parse(localStorage.getItem('auth'));
    let proId = [];
    let proPrice = [];
    let proQuantity = [];
    let totalPrice = 0;
    let bill;
    if (!auth) {
      alert('Login First!');
      return false;
    }
    for (let i = 0; i < proIdInput.length; i++) {
      totalPrice += proPriceInput[i].value * proQuantityInput[i].value;
      proId.push(proIdInput[i].value);
      proPrice.push(proPriceInput[i].value);
      proQuantity.push(proQuantityInput[i].value);
      if (parseInt(proQuantityInput[i].value, 10) > parseInt(rootQuantity[i].value, 10)) {
        alert(
          'Product : ' +
            proName[i].value +
            ' not enough quantity!\nCurrent quantity in stock : ' +
            rootQuantity[i].value,
        );
        proQuantityInput[i].focus();
        return false;
      }
    }
    bill = {
      authId: auth.user_id,
      totalPrice: totalPrice,
      status: 'unpaid',
      details: {
        proId: proId,
        proPrice: proPrice,
        proQuantity: proQuantity,
      },
    };

    bill = JSON.stringify(bill);
    billValue.value = bill;
    return true;
  };
}
function changeDataFromCart() {
  const proQuantity = document.getElementsByName('proQuantity');
  const proPrice = document.getElementsByName('proPrice');
  const totalPriceOfProduct = document.getElementsByClassName('totalPriceOfProduct');
  if (!proQuantity) {
    return;
  }
  for (let i = 0; i < proQuantity.length; i++) {
    proQuantity[i].onchange = function() {
      const total = proPrice[i].value * this.value;
      totalPriceOfProduct[i].innerHTML = '$' + total;
      getTotalPriceAll();
    };
  }
}
function getTotalPriceAll() {
  const price = document.getElementsByName('proPrice');
  const quantity = document.getElementsByName('proQuantity');
  const Total = document.getElementsByClassName('subTotalAndTotal');
  let total = 0;
  for (let i = 0; i < price.length; i++) {
    total += price[i].value * quantity[i].value;
  }
  Total[0].innerHTML = '$' + total;
  Total[1].innerHTML = '$' + total;
}
function changeQuantity(e) {
  const proId = document.getElementById('proId');
  const proPrice = document.getElementById('proPrice');
  const proQuantity = document.getElementById('proQuantity');
  const totalPrice = document.getElementById('totalPrice');
  console.log(e.value);
  console.log(proId);
  console.log(proPrice);
  console.log(proQuantity);
  console.log(totalPrice);
}
function changeAdminPermisson(e, p) {
  const form = document.getElementById(e);
  form.onsubmit = function() {
    const prom = prompt("Enter this admin's Password:");
    if (prom == p) {
      form.innerHTML += '<input type="hidden" value=' + p + ' name="user_password"/>';
      return true;
    } else {
      return false;
    }
  };
}
function completeFormPOSTAddToCart() {
  const form = document.getElementById('formPOSTAddToCart');
  if (!form) return;
  form.onsubmit = () => {
    const userId = document.getElementsByName('userId')[0];
    const auth = JSON.parse(localStorage.getItem('auth'));
    if (!auth) {
      alert('login first');
      return false;
    } else {
      userId.value = auth.user_id;
      return true;
    }
  };
}
function activeLeftMenu() {
  const links = document.getElementsByClassName('left-menu__item');
  if (!links) {
    return;
  }
  for (let i = 0; i < links.length; i++) {
    if (window.location.href.indexOf(links[i].href) != -1) {
      links[i].className += ' active';
    }
  }
}
function isAdmin() {
  const auth = JSON.parse(localStorage.getItem('auth'));
  const showQuantity = document.getElementsByClassName('showQuantity');
  if (!showQuantity) {
    return;
  }
  if (!auth) {
    return;
  }
  if (auth.user_permission !== 'admin') {
    return false;
  }
  for (let i = 0; i < showQuantity.length; i++) {
    showQuantity[i].style.display = 'inline-block';
  }
  return true;
}
function fadeOut(e){
  console.log('hello');
  $(e).fadeOut();
}
window.onload = () => {
  changeAuth();
  activeLeftMenu();
  postAddBill();
  renderSearch();
  isAdmin();
  completeFormPOSTAddToCart();
  changeDataFromCart();
  try {
    goToBillandCart();
  } catch (e) {}
};
