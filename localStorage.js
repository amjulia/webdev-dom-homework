export function saveToLocalStorage(user) {
    window.localStorage.setItem('user', JSON.stringify(user));
}
export function getUserFromLocalStorage(user) {
    const userJSON = localStorage.getItem('user')
  
    if (userJSON === null) {
      return undefined
    }
  
    // Если вдруг в хранилище оказался невалидный JSON предохраняемся от этого
    try {
      return JSON.parse(userJSON)
    } catch (e) {
      localStorage.removeItem('user')
      return undefined
    }
  }