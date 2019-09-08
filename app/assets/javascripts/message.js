$(function(){
  function buildHTML(message){

    if (message.image.url == null){
      var img = "";
    }else
    {
      var img = `<img class="lower-message__image" src="${message.image.url}">`;
    }
    var html = `
    <div class="message">
    <div class="message__user__info">
    <div class="message__user__info__name">
        ${message.name}
    </div>
    <div class="message__user__info__date">
      ${message.created_at}
    </div>
    </div>
    <div class="message__text">
    <p class="lower-message__content">
    ${message.content}
    </p>
    ${img}
    </div>
    </div>`
    return html;
  }
  $("#new_message").on("submit", function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
    .done(function(message){
      let html = buildHTML(message);
      $(".messages").append(html);
      $(".messages").animate({scrollTop:$(".messages")[0].scrollHeight}, 1500);
      $(".input__box__text").val();
    })
    .fail(function(){
      alert("error");
    })
    .always(function(){
      $(".new_message__btn").removeAttr("disabled");
    });
  });
});