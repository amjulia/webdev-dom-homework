/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./actionOnComment.js":
/*!****************************!*\
  !*** ./actionOnComment.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   answerComment: () => (/* binding */ answerComment),\n/* harmony export */   editComment: () => (/* binding */ editComment)\n/* harmony export */ });\n/* harmony import */ var _renderFormComments_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderFormComments.js */ \"./renderFormComments.js\");\n\r\n\r\n// ответ на комментарий по клику на форму комментария\r\n\r\nfunction answerComment({formComments}) {\r\n  \r\n    const commentsAnswer = document.querySelectorAll(\".comment\");\r\n    const formText = document.querySelector(\".add-form-text\");\r\n     commentsAnswer.forEach((comment, index)=> {\r\n  \r\n      comment.addEventListener(\"click\", ()=>{\r\n       \r\n        formText.value = `QUOTE_BEGIN ${formComments[index].comment.replaceAll(\"<div class='quote'>\",\"\")\r\n        .replaceAll(\"</div>\",\"\")\r\n        .replaceAll(\"&lt;\",\"\")\r\n        .replaceAll(\"&gt;\",\"\")\r\n        .replaceAll(\"&quot;\",\"\")\r\n        } :\\n ${formComments[index].name}QUOTE_END`;\r\n      }); \r\n    }); \r\n  }  \r\n  \r\n  // редактирование комментария\r\n  function editComment({formComments}) {\r\n    const editButton = document.querySelectorAll(\".edit-form-button\");\r\n    const commentText = document.querySelectorAll(\".comment-text\");\r\n    editButton.forEach((el, index) => {\r\n        \r\n      el.addEventListener(\"click\", (event) => {\r\n        \r\n    event.stopPropagation();\r\n    if (formComments[index].isEdit) {\r\n      formComments[index].comment = commentText[index].value;\r\n    }\r\n    formComments[index].isEdit = !formComments[index].isEdit;\r\n    \r\n    (0,_renderFormComments_js__WEBPACK_IMPORTED_MODULE_0__.renderFormComments)({formComments});\r\n    });\r\n    });\r\n  }\n\n//# sourceURL=webpack://webdev-dom-homework/./actionOnComment.js?");

/***/ }),

/***/ "./api.js":
/*!****************!*\
  !*** ./api.js ***!
  \****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   deleteTodo: () => (/* binding */ deleteTodo),\n/* harmony export */   getTodos: () => (/* binding */ getTodos),\n/* harmony export */   likeTodo: () => (/* binding */ likeTodo),\n/* harmony export */   login: () => (/* binding */ login),\n/* harmony export */   postTodo: () => (/* binding */ postTodo),\n/* harmony export */   registration: () => (/* binding */ registration),\n/* harmony export */   setToken: () => (/* binding */ setToken),\n/* harmony export */   token: () => (/* binding */ token)\n/* harmony export */ });\n/* harmony import */ var _sanitazedHtml_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sanitazedHtml.js */ \"./sanitazedHtml.js\");\n\r\nconst baseURL = \"https://wedev-api.sky.pro/api/v2/karpova-julia/comments\";\r\nconst userURL = \"https://wedev-api.sky.pro/api/user/login\";\r\nconst regUser = \"https://wedev-api.sky.pro/api/user\";\r\n\r\nlet token;\r\nconst setToken = (newToken) => {\r\n  token = newToken;\r\n};\r\n\r\nfunction getTodos() {\r\n  return fetch(baseURL, {\r\n    method: \"GET\",\r\n    headers: {\r\n      Authorization: `Bearer ${token}`,\r\n    },\r\n  }).then((response) => {\r\n    if (response.status === 200) {\r\n      return response.json();\r\n    } else {\r\n      return Promise.reject(\"Сервер упал\");\r\n    }\r\n  });\r\n}\r\n\r\nfunction postTodo({ text, name }) {\r\n  return fetch(baseURL, {\r\n    method: \"POST\",\r\n    headers: {\r\n      Authorization: `Bearer ${token}`,\r\n    },\r\n    body: JSON.stringify({\r\n      text: (0,_sanitazedHtml_js__WEBPACK_IMPORTED_MODULE_0__.sanitazedHtml)(text),\r\n      name: (0,_sanitazedHtml_js__WEBPACK_IMPORTED_MODULE_0__.sanitazedHtml)(name),\r\n      forceError: true,\r\n    }),\r\n  }).then((response) => {\r\n    if (response.status === 500) {\r\n      throw new Error(\"Сервер упал\");\r\n    }\r\n    if (response.status === 400) {\r\n      throw new Error(\"Неверный запрос\");\r\n    } else {\r\n      return response.json();\r\n    }\r\n  });\r\n}\r\n\r\nfunction deleteTodo({ id }) {\r\n  return fetch(`${baseURL}/${id}`, {\r\n    method: \"DELETE\",\r\n    headers: {\r\n      Authorization: `Bearer ${token}`,\r\n    },\r\n  }).then((response) => {\r\n    return response.json();\r\n  });\r\n}\r\n\r\nfunction likeTodo({ id }) {\r\n  return fetch(`${baseURL}/${id}/toggle-like`, {\r\n    method: \"POST\",\r\n    headers: {\r\n      Authorization: `Bearer ${token}`,\r\n    },\r\n  }).then((response) => {\r\n    if (response.status === 401) {\r\n      throw new Error(\"Неавторизованные пользователи не могут ставить лайки\");\r\n    }\r\n    return response.json();\r\n  });\r\n}\r\n\r\nfunction login({ login, password }) {\r\n  return fetch(userURL, {\r\n    method: \"POST\",\r\n    body: JSON.stringify({\r\n      login,\r\n      password,\r\n      forceError: true,\r\n    }),\r\n  }).then((response) => {\r\n    if (response.status === 500) {\r\n      throw new Error(\"Сервер упал\");\r\n    }\r\n    if (response.status === 400) {\r\n      throw new Error(\"Неверный логин или пароль\");\r\n    } else {\r\n      return response.json();\r\n    }\r\n  });\r\n}\r\n\r\nfunction registration({ name, login, password }) {\r\n  return fetch(regUser, {\r\n    method: \"POST\",\r\n    body: JSON.stringify({\r\n      name,\r\n      login,\r\n      password,\r\n      forceError: true,\r\n    }),\r\n  }).then((response) => {\r\n    if (response.status === 500) {\r\n      throw new Error(\"Сервер упал\");\r\n    }\r\n    if (response.status === 400) {\r\n      throw new Error(\"Пользователь с таким логинои уже зарегистрирован\");\r\n    } else {\r\n      return response.json();\r\n    }\r\n  });\r\n}\r\n\n\n//# sourceURL=webpack://webdev-dom-homework/./api.js?");

/***/ }),

/***/ "./localStorage.js":
/*!*************************!*\
  !*** ./localStorage.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getUserFromLocalStorage: () => (/* binding */ getUserFromLocalStorage),\n/* harmony export */   saveToLocalStorage: () => (/* binding */ saveToLocalStorage)\n/* harmony export */ });\nfunction saveToLocalStorage(user) {\r\n  window.localStorage.setItem(\"user\", JSON.stringify(user));\r\n}\r\nfunction getUserFromLocalStorage() {\r\n  const userJSON = localStorage.getItem(\"user\");\r\n\r\n  if (userJSON === null) {\r\n    return undefined;\r\n  }\r\n\r\n  // Если вдруг в хранилище оказался невалидный JSON предохраняемся от этого\r\n  try {\r\n    return JSON.parse(userJSON);\r\n  } catch (e) {\r\n    localStorage.removeItem(\"user\");\r\n    return undefined;\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://webdev-dom-homework/./localStorage.js?");

/***/ }),

/***/ "./login.js":
/*!******************!*\
  !*** ./login.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderLogin: () => (/* binding */ renderLogin)\n/* harmony export */ });\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ \"./api.js\");\n/* harmony import */ var _main_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./main.js */ \"./main.js\");\n/* harmony import */ var _registration_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./registration.js */ \"./registration.js\");\n/* harmony import */ var _localStorage_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./localStorage.js */ \"./localStorage.js\");\n\r\n\r\n\r\n\r\n\r\nconst renderLogin = () => {\r\n  const appElement = document.getElementById(\"app\");\r\n  const loginHtml = `<div class=\"login-form\"><p class=\"login-input\">Форма входа</p>\r\n    <input \r\n      type=\"text\"\r\n      class=\"login-form-name\"\r\n      placeholder=\"Логин\"\r\n    />\r\n    <input \r\n    type=\"password\"\r\n    class=\"password-form-name\"\r\n    placeholder=\"Пароль\"\r\n  />\r\n  <button class =\"login-button\">Войти</button>\r\n  <button class=\"autorization-button\" >Зарегистрироваться </button>\r\n  \r\n  </div>`;\r\n  appElement.innerHTML = loginHtml;\r\n\r\n  const buttonElement = document.querySelector(\".login-button\");\r\n  const loginInputElement = document.querySelector(\".login-form-name\");\r\n  const passwordInputElement = document.querySelector(\".password-form-name\");\r\n\r\n  loginInputElement.addEventListener(\"input\", () => {\r\n    loginInputElement.style.backgroundColor = \"#f3f7dc\";\r\n  });\r\n\r\n  passwordInputElement.addEventListener(\"input\", () => {\r\n    passwordInputElement.style.backgroundColor = \"#f3f7dc\";\r\n  });\r\n\r\n  buttonElement.addEventListener(\"click\", () => {\r\n    (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.login)({\r\n      login: loginInputElement.value,\r\n      password: passwordInputElement.value,\r\n    })\r\n      .then((responseData) => {\r\n        (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.setToken)(responseData.user.token);\r\n        (0,_main_js__WEBPACK_IMPORTED_MODULE_1__.setUser)(responseData.user);\r\n        //saveToLocalStorage(user);\r\n      })\r\n      .then(() => {\r\n        (0,_main_js__WEBPACK_IMPORTED_MODULE_1__.fetchGetPromise)();\r\n      })\r\n      .catch((error) => {\r\n        if (error.message === \"Неверный логин или пароль\") {\r\n          alert(\"Введен неправильный логин или пароль\");\r\n        } else {\r\n          alert(\"Кажется, у вас сломался интернет, попробуйте позже\");\r\n        }\r\n        console.warn(error);\r\n      });\r\n  });\r\n\r\n  const registrationElement = document.querySelector(\".autorization-button\");\r\n\r\n  registrationElement.addEventListener(\"click\", () => {\r\n    (0,_registration_js__WEBPACK_IMPORTED_MODULE_2__.renderRegistration)({ fetchGetPromise: _main_js__WEBPACK_IMPORTED_MODULE_1__.fetchGetPromise });\r\n  });\r\n};\r\n\n\n//# sourceURL=webpack://webdev-dom-homework/./login.js?");

/***/ }),

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   fetchGetPromise: () => (/* binding */ fetchGetPromise),\n/* harmony export */   initEventListeners: () => (/* binding */ initEventListeners),\n/* harmony export */   setUser: () => (/* binding */ setUser),\n/* harmony export */   user: () => (/* binding */ user)\n/* harmony export */ });\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ \"./api.js\");\n/* harmony import */ var _renderFormComments_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderFormComments.js */ \"./renderFormComments.js\");\n/* harmony import */ var _localStorage_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./localStorage.js */ \"./localStorage.js\");\n\r\n\r\n\r\n\r\n\r\nconst hidePreloader = document.getElementById(\"preload\");\r\n\r\nlet myDate = new Date();\r\nlet month = myDate.getMonth()+1;\r\nif (month < 10) {\r\n  month = \"0\" + month;\r\n}\r\nlet minutes = myDate.getMinutes();\r\nif (minutes < 10) {\r\n  minutes = \"0\" + minutes;\r\n}\r\n\r\nlet user = null;\r\n// export let user = getUserFromLocalStorage();\r\nconst setUser = (newUser) => {\r\n  user = newUser;\r\n\r\n}\r\n\r\nlet formComments = [];\r\n\r\nconst fetchGetPromise = () => {\r\n  \r\n  (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.getTodos)().then((responseData)=> {\r\n       const appComments = responseData.comments.map((comment) => {\r\n         return {\r\n        id: comment.id,\r\n         name: comment.author.name,\r\n         date: new Date(comment.date).toLocaleTimeString('sm', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' }),\r\n        comment: comment.text,\r\n         likes: comment.likes,\r\n         isLiked: comment.isLiked, \r\n         isEdit: false,\r\n         isLoading:true\r\n        }\r\n        \r\n       })\r\n       formComments = appComments;\r\n       \r\n      \r\n       (0,_renderFormComments_js__WEBPACK_IMPORTED_MODULE_1__.renderFormComments)({ formComments });\r\n       hidePreloader.style.display = \"none\";\r\n       \r\n      \r\n     }).catch((error) => {\r\n      if (error.message === \"Сервер упал\") {\r\n       console.log(\"Сервер сломался, попробуй позже\");\r\n      } else {\r\n        console.log(error);\r\n      }\r\n     })\r\n   }\r\n\r\n   fetchGetPromise();\r\n\r\n\r\n\r\n//добавления счетчика лайков\r\nconst  initEventListeners = () => {\r\n  const likeButtons = document.querySelectorAll(\".like-button\");\r\n   likeButtons.forEach((el) => {\r\n    \r\n    el.addEventListener(\"click\", (event) => {\r\n      event.stopPropagation();\r\n  const id = event.target.dataset.id;\r\n    (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.likeTodo)({id}).then(()=>{\r\n  fetchGetPromise();\r\n\r\n}).catch((error) => {\r\n \r\n  if (error.message === 'Неавторизованные пользователи не могут ставить лайки') {\r\n    console.log('Неавторизованные пользователи не могут ставить лайки');\r\n  }\r\n  else {\r\n    console.log(\"Кажется, у вас сломался интернет, попробуйте позже\");\r\n  }\r\n  console.warn(error);\r\n});\r\n \r\n});  \r\n});\r\n}\r\n\r\nconsole.log(\"It works!\");\n\n//# sourceURL=webpack://webdev-dom-homework/./main.js?");

/***/ }),

/***/ "./registration.js":
/*!*************************!*\
  !*** ./registration.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderRegistration: () => (/* binding */ renderRegistration)\n/* harmony export */ });\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ \"./api.js\");\n/* harmony import */ var _main_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./main.js */ \"./main.js\");\n/* harmony import */ var _login_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login.js */ \"./login.js\");\n\r\n\r\n\r\n\r\nconst renderRegistration = () => {\r\n  const appElement = document.getElementById(\"app\");\r\n  const regHtml = `<div class=\"login-form\"><p class=\"login-input\">Форма регистрации</p>\r\n    <input \r\n      type=\"text\"\r\n      class=\"user-form-name\"\r\n      placeholder=\"Имя\"\r\n    />\r\n    <input \r\n      type=\"text\"\r\n      class=\"login-form-name\"\r\n      placeholder=\"Логин\"\r\n    />\r\n    <input \r\n    type=\"password\"\r\n    class=\"password-form-name\"\r\n    placeholder=\"Пароль\"\r\n  />\r\n  <button class=\"button-autorization\">Зарегистрироваться</button>\r\n  <button class=\"enter-login-button\">Войти</button>\r\n  \r\n  </div>`;\r\n  appElement.innerHTML = regHtml;\r\n\r\n  const buttonElement = document.querySelector(\".button-autorization\");\r\n  const regNameInputElement = document.querySelector(\".user-form-name\");\r\n  const loginInputElement = document.querySelector(\".login-form-name\");\r\n  const passwordInputElement = document.querySelector(\".password-form-name\");\r\n\r\n  buttonElement.addEventListener(\"click\", () => {\r\n    (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.registration)({\r\n      name: regNameInputElement.value,\r\n      login: loginInputElement.value,\r\n      password: passwordInputElement.value,\r\n    })\r\n      .then((responseData) => {\r\n        (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.setToken)(responseData.user.token);\r\n        (0,_main_js__WEBPACK_IMPORTED_MODULE_1__.setUser)(responseData.user);\r\n      })\r\n      .then(() => {\r\n        (0,_main_js__WEBPACK_IMPORTED_MODULE_1__.fetchGetPromise)();\r\n      })\r\n      .catch((error) => {\r\n        if (\r\n          error.message === \"Пользователь с таким логинои уже зарегистрирован\"\r\n        ) {\r\n          alert(\"Пользователь с таким логинои уже зарегистрирован\");\r\n        } else {\r\n          alert(\"Кажется, у вас сломался интернет, попробуйте позже\");\r\n        }\r\n        console.warn(error);\r\n      });\r\n  });\r\n\r\n  const EnterButton = document.querySelector(\".enter-login-button\");\r\n  EnterButton.addEventListener(\"click\", () => {\r\n    (0,_login_js__WEBPACK_IMPORTED_MODULE_2__.renderLogin)({ fetchGetPromise: _main_js__WEBPACK_IMPORTED_MODULE_1__.fetchGetPromise });\r\n  });\r\n};\r\n\n\n//# sourceURL=webpack://webdev-dom-homework/./registration.js?");

/***/ }),

/***/ "./renderFormComments.js":
/*!*******************************!*\
  !*** ./renderFormComments.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderFormComments: () => (/* binding */ renderFormComments)\n/* harmony export */ });\n/* harmony import */ var _sanitazedHtml_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sanitazedHtml.js */ \"./sanitazedHtml.js\");\n/* harmony import */ var _main_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./main.js */ \"./main.js\");\n/* harmony import */ var _actionOnComment_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actionOnComment.js */ \"./actionOnComment.js\");\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./api.js */ \"./api.js\");\n/* harmony import */ var _login_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./login.js */ \"./login.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nconst renderFormComments = ({ formComments }) => {\r\n  const appElement = document.getElementById(\"app\");\r\n  const commentElement = document.getElementById(\"list-comment\");\r\n  const commentHtml = formComments\r\n    .map((formComment, index) => {\r\n      formComment.comment = formComments[index].comment\r\n        .replaceAll(\"QUOTE_BEGIN\", \"<div class='quote'>\")\r\n        .replaceAll(\"QUOTE_END\", \"</div>\");\r\n\r\n      return ` <li id = \"list-comment\" class=\"comment\"data-index = \"${index}\">\r\n  <div class=\"comment-header\">\r\n    <div>${(0,_sanitazedHtml_js__WEBPACK_IMPORTED_MODULE_0__.sanitazedHtml)(formComment.name)}</div>\r\n    <div>${formComment.date} </div>\r\n  </div>\r\n  <div class=\"comment-body\">\r\n      ${\r\n        formComment.isEdit\r\n          ? `<textarea class=\"comment-text\">${(0,_sanitazedHtml_js__WEBPACK_IMPORTED_MODULE_0__.sanitazedHtml)(\r\n              formComment.comment\r\n            )}</textarea>`\r\n          : `<div class=\"comment-text\" >\r\n      ${formComment.comment}\r\n      </div>`\r\n      }\r\n   </div>\r\n  \r\n  <button id = \"get-button\" class=\"${\r\n    _main_js__WEBPACK_IMPORTED_MODULE_1__.user ? \"edit-form-button\" : \"edit-form-button-none\"\r\n  }\">${formComment.isEdit ? \"Сохранить\" : \"Редактировать\"} </button>\r\n  <button class=\"${_main_js__WEBPACK_IMPORTED_MODULE_1__.user ? \"delete-button\" : \"delete-button-none\"}\" data-id=\"${\r\n        formComment.id}\">Удалить</button>\r\n  <div class=\"comment-footer\">\r\n    <div class=\"likes\">\r\n      <span class=\"likes-counter\">${formComment.likes}</span>\r\n      <button class=\"like-button ${\r\n        formComment.isLiked ? \"-active-like\" : \"\"\r\n      }\" data-id=\"${formComment.id}\"></button>\r\n      </div>\r\n  </div>\r\n  </li>`;\r\n    })\r\n    .join(\"\");\r\n\r\n  const appHtml = `<div class=\"container\">\r\n<ul id = \"list-comment\" class=\"comments\">${commentHtml}</ul>\r\n${\r\n  _main_js__WEBPACK_IMPORTED_MODULE_1__.user? `\r\n<div class=\"add-form\" id=\"add-form\">\r\n<input type=\"text\" class=\"add-form-name\" placeholder=\"Введите ваше имя\"  id=\"name-input\" value =\"${_main_js__WEBPACK_IMPORTED_MODULE_1__.user.name}\" readonly/>\r\n<textarea type=\"textarea\" class=\"add-form-text\" placeholder=\"Введите ваш коментарий\" rows=\"4\" id=\"comment-input\"></textarea>\r\n<div class=\"add-form-row\">\r\n    <button class=\"add-form-button\" id=\"add-button\">Написать</button>\r\n</div>`\r\n    : '<button class=\"link-form-button\" id=\"login-button\">Чтобы добавить коментарий, авторизуйтесь </button>'\r\n}\r\n        </div>\r\n        <div class=\"loading\" id =\"loading\">\r\n        <img class=\"img\" src=\"img/gifgivecom (1).gif\" alt=\"\">\r\n          <p> Комментарий добавляется...</p>\r\n      </div>  \r\n      \r\n</div> `;\r\n\r\n  appElement.innerHTML = appHtml;\r\n\r\n  const deleteButtons = document.querySelectorAll(\".delete-button\");\r\n\r\n  for (const deleteButton of deleteButtons) {\r\n    deleteButton.addEventListener(\"click\", (event) => {\r\n      event.stopPropagation();\r\n\r\n      const id = deleteButton.dataset.id;\r\n\r\n      (0,_api_js__WEBPACK_IMPORTED_MODULE_3__.deleteTodo)({ id }).then(() => {\r\n        (0,_main_js__WEBPACK_IMPORTED_MODULE_1__.fetchGetPromise)();\r\n      });\r\n    });\r\n  }\r\n\r\n  const loading = document.getElementById(\"loading\");\r\n  loading.style.display = \"none\";\r\n\r\n  (0,_main_js__WEBPACK_IMPORTED_MODULE_1__.initEventListeners)({ formComments });\r\n  (0,_actionOnComment_js__WEBPACK_IMPORTED_MODULE_2__.answerComment)({ formComments });\r\n  (0,_actionOnComment_js__WEBPACK_IMPORTED_MODULE_2__.editComment)({ formComments });\r\n\r\n  if (_main_js__WEBPACK_IMPORTED_MODULE_1__.user) {\r\n    const buttonElement = document.getElementById(\"add-button\");\r\n    const nameInputElement = document.getElementById(\"name-input\");\r\n    const textInputElement = document.getElementById(\"comment-input\");\r\n    const hideForm = document.querySelector(\".add-form\");\r\n\r\n    nameInputElement.style.backgroundColor = \"#ccc\";\r\n    nameInputElement.style.color = \"grey\";\r\n\r\n    //валидация полей ввода\r\n    buttonElement.disabled = true;\r\n\r\n    textInputElement.addEventListener(\"input\", () => {\r\n      buttonElement.disabled = false;\r\n\r\n      if (nameInputElement.value === \"\" || commentElement.value === \"\") {\r\n        buttonElement.disabled = true;\r\n        return;\r\n      }\r\n    });\r\n    nameInputElement.addEventListener(\"input\", () => {\r\n      buttonElement.disabled = false;\r\n      if (nameInputElement.value === \"\" || commentElement.value === \"\") {\r\n        buttonElement.disabled = true;\r\n        return;\r\n      }\r\n    });\r\n\r\n    //событие на кнопке Отправить\r\n    buttonElement.addEventListener(\"click\", () => {\r\n      if (nameInputElement.value === \"\") {\r\n        nameInputElement.style.backgroundColor = \"pink\";\r\n        return;\r\n      }\r\n      if (textInputElement.value === \"\") {\r\n        textInputElement.style.backgroundColor = \"pink\";\r\n        return;\r\n      }\r\n\r\n      //Скрываем форму, показываем лоадер\r\n      hideForm.style.display = \"none\";\r\n      loading.style.display = \"flex\";\r\n\r\n      const fetchPostPromise = () => {\r\n        (0,_api_js__WEBPACK_IMPORTED_MODULE_3__.postTodo)({\r\n          text: textInputElement.value,\r\n          name: nameInputElement.value,\r\n        })\r\n          .then(() => {\r\n            return (0,_main_js__WEBPACK_IMPORTED_MODULE_1__.fetchGetPromise)();\r\n          })\r\n          .then(() => {\r\n            nameInputElement.value = \"\";\r\n            textInputElement.value = \"\";\r\n          })\r\n          .catch((error) => {\r\n            if (error.message === \"Сервер упал\") {\r\n              fetchPostPromise();\r\n              //alert(\"Сервер сломался, попробуй позже\");\r\n            } else if (error.message === \"Неверный запрос\") {\r\n              alert(\"Имя и комментарий не должны быть короче 3-х символов\");\r\n            } else {\r\n              alert(\"Нет подключения к интернету\");\r\n            }\r\n          })\r\n          .finally(() => {\r\n            hideForm.style.display = \"flex\";\r\n            loading.style.display = \"none\";\r\n          });\r\n      };\r\n      fetchPostPromise();\r\n      renderFormComments({ formComments });\r\n    });\r\n  } else {\r\n    const loginButtonElement = document.getElementById(\"login-button\");\r\n    loginButtonElement.addEventListener(\"click\", () => {\r\n      (0,_login_js__WEBPACK_IMPORTED_MODULE_4__.renderLogin)({ fetchGetPromise: _main_js__WEBPACK_IMPORTED_MODULE_1__.fetchGetPromise });\r\n    });\r\n  }\r\n};\r\n\n\n//# sourceURL=webpack://webdev-dom-homework/./renderFormComments.js?");

/***/ }),

/***/ "./sanitazedHtml.js":
/*!**************************!*\
  !*** ./sanitazedHtml.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   sanitazedHtml: () => (/* binding */ sanitazedHtml)\n/* harmony export */ });\nfunction sanitazedHtml(htmlString)  {\r\n    return htmlString.replaceAll(\"<\", \"&lt;\").replaceAll(\">\", \"&gt;\");\r\n  }\n\n//# sourceURL=webpack://webdev-dom-homework/./sanitazedHtml.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./main.js");
/******/ 	
/******/ })()
;