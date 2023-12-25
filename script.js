const buttonElement = document.getElementById("get-button");
const commentElement = document.getElementById("list-comment");
const nameInputElement = document.getElementById("name-input");
const textInputElement = document.getElementById("input-text");
let myDate = new Date();
let shortYear = myDate.getFullYear(); 
let twoDigitYear = shortYear.toString().substring(2);
let month = myDate.getMonth()+1;
let minutes = myDate.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
  
}


const formComments = [{
  name: "Глеб Фокин",
  date:"12.02.22 12:18",
  comment: "Это будет первый комментарий на этой странице",
  like:3,
  isLike: true
},
{
  name: "Варвара Н.",
  date:"13.02.22 19:22",
  comment: "Мне нравится как оформлена эта страница! ❤",
  like: 75,
  isLike: true
}
];

const  initEventListeners = () => {
  const likeButtons = document.querySelectorAll(".like-button");
  
for (const likeButton of likeButtons) {

    likeButton.addEventListener("click", () => {
      const index = likeButton.dataset.index;
      
  formComments[index].like += formComments[index].isLike ? -1 : +1 ;
  formComments[index].isLike =!formComments[index].isLike;

    renderFormComments();

});

}
}
const renderFormComments = () => {
const commentHtml = formComments.map((formComment, index)=> {
      return `<li id = "list-comment" class="comment">
      <div class="comment-header">
        <div>${formComment.name}</div>
        <div>${formComment.date} </div>
      </div>
      <div class="comment-body">
        <div class="comment-text">
          ${formComment.comment}
        </div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${formComment.like}</span>
          <button class="like-button ${formComments[index].isLike ? "-active-like" : ""}" data-index="${index}"></button>
        </div>
      </div>
    </li>`
       
}).join('');

commentElement.innerHTML = commentHtml;
initEventListeners();
nameInputElement.value = "";
     textInputElement.value = "";
};
renderFormComments();



buttonElement.disabled = true;

  textInputElement.addEventListener("input", () => {
    buttonElement.disabled = false;
    if (nameInputElement.value === "" || commentElement.value === "") {
      buttonElement.disabled = true;
      return;}
  }); 
  nameInputElement.addEventListener("input", () => {
    buttonElement.disabled = false;
    if (nameInputElement.value === "" || commentElement.value === "") {
      buttonElement.disabled = true;
      return;}
  }); 


buttonElement.addEventListener("click", () => {

  nameInputElement.classList.remove("error");
  textInputElement.classList.remove("error");

  if (nameInputElement.value === '') {
    nameInputElement.classList.add("error");
     return;
  }
  if (textInputElement.value === '') {
    textInputElement.classList.add("error");
    return;
  }

  formComments.push({
    name:nameInputElement.value,
    date: myDate.getDate()+'.'+ month+'.'+ 
    twoDigitYear + ' ' + myDate.getHours()+ ':' 
    + minutes,
    comment: textInputElement.value,     
    like: 0,
    isLike: false 
        
  })

    renderFormComments();
    initEventListeners();
    
});

textInputElement.addEventListener("keyup", (event) => {
  if (event.code === "Enter") { 
    const oldConstHTML = commentElement.innerHTML;
  commentElement.innerHTML =  oldConstHTML + 
  `<li id = "list-comment" class="comment">
      <div class="comment-header">
        <div>${nameInputElement.value}</div>
        <div> ${myDate.getDate()+'.'+ month+'.'+ 
          twoDigitYear + ' ' + myDate.getHours()+ ':' 
          + minutes }</div>
      </div>
      <div class="comment-body">
        <div class="comment-text">
          ${textInputElement.value}
        </div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">0</span>
          <button class="like-button"></button>
        </div>
      </div>
    </li>`
  
    nameInputElement.value = "";
    textInputElement.value = "";
}});
console.log("It works!");