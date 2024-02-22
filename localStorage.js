export function saveToLocalStorage(user) {
  window.localStorage.setItem("user", JSON.stringify(user.token));
  window.localStorage.setItem("name", JSON.stringify(user.name));
  
  console.log(user);
}
export function getUserNameFromLocalStorage() {
  const userNameJSON = localStorage.getItem("name");
  if (userNameJSON === null){
    return undefined;
  }

  // Если вдруг в хранилище оказался невалидный JSON предохраняемся от этого
  try {
    return JSON.parse(userNameJSON);
  } catch (e) {
    localStorage.removeItem("user");
    return undefined;
  }
}

export function getUserTokenFromLocalStorage() {
  const userJSON = localStorage.getItem("user");
  if (userJSON === null){
    return undefined;
  }

  // Если вдруг в хранилище оказался невалидный JSON предохраняемся от этого
  try {
    return JSON.parse(userJSON);
  } catch (e) {
    localStorage.removeItem("user");
    return undefined;
  }
}