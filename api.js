import { sanitazedHtml } from "./sanitazedHtml.js";

const baseURL = "https://wedev-api.sky.pro/api/v2/karpova-julia/comments";
const userURL = "https://wedev-api.sky.pro/api/user/login";


export let token;
export const setToken = (newToken) => {
  token = newToken;
}


export function getTodos() {
    return fetch(baseURL, {
   method: "GET",
   headers: {
    Authorization: `Bearer ${token}`
  },
     })
     .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        return Promise.reject("Сервер упал");
      }
    })
}
export function deleteTodo({id}) {
  return  fetch(`${baseURL}/${id}`, {
   method: "DELETE",    
   headers: {
     Authorization: `Bearer ${token}`
   }
 })
   .then((response) => {
     return response.json();
   });
 }

export function postTodo({ text, name}) {
   return fetch(baseURL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          text: sanitazedHtml(text),
          name: sanitazedHtml(name),
          forceError: true,
        })
      }).then((response) => {
        if (response.status === 500) {
           throw new Error("Сервер упал");
                 
        } if (response.status === 400) {
          throw new Error("Неверный запрос");
                 
        } else {
          return response.json();
        } 
      })
}

export function login({ login, password}) {
  return fetch(userURL, {
       method: "POST",
       body: JSON.stringify({
        login,
        password,
         forceError: true,
       })
     }).then((response) => {
       if (response.status === 500) {
          throw new Error("Сервер упал");
                
       } if (response.status === 400) {
         throw new Error("Неверный логин или пароль");
                
       } else {
         return response.json();
       } 
     })
}

export function registration({ name, login, password}) {
  
  return fetch(userURL, {
       method: "POST",
       body: JSON.stringify({
        name,
        login,
        password,
         forceError: true,
       })
     }).then((response) => {
       if (response.status === 500) {
          throw new Error("Сервер упал");
                
       } if (response.status === 400) {
         throw new Error("Неверный логин или пароль");
                
       } else {
         return response.json();
       } 
     })
}