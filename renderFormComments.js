import { sanitazedHtml } from "./sanitazedHtml.js";
import { initEventListeners } from "./main.js";
import { answerComment } from "./actionOnComment.js";
import { editComment } from "./actionOnComment.js"; 

export const renderFormComments = ({ formComments}) => {
 
    
    const commentElement = document.getElementById("list-comment"); 
    const commentHtml = formComments.map((formComment, index)=> {
      
    formComment.comment = formComments[index].comment
     .replaceAll("QUOTE_BEGIN", "<div class='quote'>")
     .replaceAll("QUOTE_END", "</div>");
  
     return ` <li id = "list-comment" class="comment"data-index = "${index}">
  <div class="comment-header">
    <div>${sanitazedHtml(formComment.name)}</div>
    <div>${formComment.date} </div>
  </div>
  <div class="comment-body">
      ${formComment.isEdit ? `<textarea class="comment-text">${sanitazedHtml(formComment.comment)}</textarea>` : `<div class="comment-text" >
      ${formComment.comment}
      </div>` }
   </div>
  
  <button id = "get-button" class="edit-form-button">${formComment.isEdit ? 'Сохранить' : 'Редактировать'} </button>
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
  answerComment({formComments}); 
  editComment({formComments});
      
  };
