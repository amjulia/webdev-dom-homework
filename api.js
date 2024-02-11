import { sanitazedHtml } from "./sanitazedHtml.js";

const baseURL = "https://wedev-api.sky.pro/api/v1/karpova-julia/comments";

export function getTodos() {
    return fetch(baseURL, {
   method: "GET",
     })
     .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        return Promise.reject("Сервер упал");
      }
    })
}

export function postTodo({ text, name}) {
   return fetch(baseURL, {
        method: "POST",
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