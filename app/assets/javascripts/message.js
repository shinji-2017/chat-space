$(function(){
  function buildHTML(message){

    let addImage = (message.image.url !== null)? `<img src="${message.image.url}" class="lower-message__image" >` : "";
    var html = `
    <div class="message" data-id="${message.id}">
    <div class="message__user__info">
    <div class="message__user__info__name">
        ${message.user_name}
    </div>
    <div class="message__user__info__date">
      ${message.created_at}
    </div>
    </div>
    <div class="message__text">
    <p class="lower-message__content">
    ${message.content}
    </p>
    ${addImage}
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
      $(".messages").animate({scrollTop:$(".messages")[0].scrollHeight}, 500);
      $(".input__box__text").val();
    })
    .fail(function(){
      alert("error");
    })
    .always(function(){
      $(".new_message__btn").removeAttr("disabled");
    });
  });
  var reloadMessages = function() {
    var last_message_id = $(".message:last").data('id');
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      console.log(messages)
      messages.forEach(function(message){
        buildHTML(message);
        let html = buildHTML(message);
        $(".messages").append(html);
        $(".messages").animate({scrollTop:$(".messages")[0].scrollHeight}, 500);
      });
    })
    .fail(function() {
      console.log('error');
    });
  };
  if(location.pathname.match(/messages/)){
    setInterval(reloadMessages, 5000);
  }
});



