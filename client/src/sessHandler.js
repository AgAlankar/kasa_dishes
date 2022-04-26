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
function logoutUser() {
  window.localStorage.removeItem('sessUser')
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

function logoutAdmin() {
  window.localStorage.removeItem('sessAdmin')
}

export { getUser, logoutUser, getAdmin, logoutAdmin }
