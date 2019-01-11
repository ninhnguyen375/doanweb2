function changeAuth() {
  const login = document.getElementById('login')
  const signup = document.getElementById('signup')
  const auth = JSON.parse(localStorage.getItem('auth'))
  if (!auth) {
    return
  }
  signup.innerHTML = 'Logout'
  signup.addEventListener('click', nonAuth)
  signup.href = ''
  login.removeAttribute('href')
  login.addEventListener('click', () => {
    let showAuth = document.getElementById('showAuth')

    showAuth.style.display = 'block'
    window.addEventListener('click', (e) => {
      if(e.target == showAuth)
        showAuth.style.display = 'none'
    })
    document.getElementById('authName').innerHTML = auth.user_name
    document.getElementById('authPhone').innerHTML = auth.user_phone
    document.getElementById('authEmail').innerHTML = auth.user_email
    document.getElementById('authPermission').innerHTML = auth.user_permission
  })
  login.innerHTML = auth.user_name
}
function nonAuth() {
  localStorage.removeItem('auth')
}
function checkpass(){
  const pass1 = document.getElementById('userpassword')
  const pass2 = document.getElementById('userpassword2')
  let alertDanger = document.getElementById('alertDanger')
  if( pass1.value === pass2.value ){
    return true
  }
  pass2.focus()
  alertDanger.innerHTML = 'Confirm Password not correct!'
  alertDanger.className = 'alert alert-danger col-5 m-auto'
  return false
}
window.onload = () => {
  changeAuth()
}