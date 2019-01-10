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
    document.getElementById('showAuth').style.display = 'block'
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
window.onload = () => {
  changeAuth()
}