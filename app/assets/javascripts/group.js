$(function(){
  let addUser = $("#user-search-result")
  function appendUser(user){
    let html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    addUser.append(html);
  }

  function appendErrMsgToHTML(msg) {
    let addmsg = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${msg}</p>
                  </div>`
    addUser.append(addmsg);
  }

  function appendMember(member) {
    let user = `<div class="chat-group-user">
                  <input name='group[user_ids][]' type='hidden' value="${member.userId}">
                  <p class='chat-group-user__name'>${member.userName}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                  </div>`
    $("#chat-form").append(user);
  }

  $("#user-search-field").on("keyup",function(){
    let input = $("#user-search-field").val();

    $.ajax({
      type: "GET",
      url: "/users",
      data: {keyword: input},
      dataType: 'json'
    })
    .done(function(users){
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else {
        $("#user-search-result").empty();
        appendErrMsgToHTML("一致する名前はありません");
      }
    })
    .fail(function(){
      alert('ユーザー検索に失敗しました')
    });
  });
  $(document).on("click", ".user-search-add", function(){
    $(this).parent().remove();
    let member = $(this).data();
    appendMember(member);
  });
  $(document).on("click", ".user-search-remove", function(){
    $(this).parent().remove();
  })
});