function getUser() {
  const u = window.localStorage.getItem('sessUser')
  if (!u) {
    return false
  } else {
    const parsed = JSON.parse(u)
    // for(let k of Obj
    console.log(parsed)
    return parsed
  }
}
function logoutAll() {
  window.localStorage.removeItem('sessUser')
  window.localStorage.removeItem('sessAdmin')
  window.location.href = 'http://localhost:3000/'
}
function getAdmin() {
  const u = window.localStorage.getItem('sessAdmin')
  if (!u) {
    return false
  } else {
    const parsed = JSON.parse(u)
    // for(let k of Obj
    console.log(parsed)
    return parsed
  }
}

export { getUser, getAdmin, logoutAll }
