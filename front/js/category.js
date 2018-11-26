
$(function () {

  // 记录 种类id
  var titleid = null;
  // 记录点击次数
  var count = 0;

  // 进入页面 渲染一级分类
  new AjaxRequest({
    url : "getCategoryTitle",
    callBack : function (info) {
      // console.log(info);
      var str = template("topTmp",info);
      $(".middle").html(str);
    }
  });

  // 给一级分类绑定点击事件
  $(".middle").on("click",".title",function () {
    
    count++;

    if(count % 2 != 0){

      titleid = $(this).data("id");
    
      render( titleid );

    }else{

      $(this).next().stop().slideUp(500);

    }
     
  });

  // 渲染二级分类的方法
  function render( id ) {

    new AjaxRequest({
      url : "getCategory",
      param : {
        titleid : id
      },
      callBack : function (info) {
        // console.log(info);

        var str = template("secondTmp",info);
        
        $(".box .list[data-current="+id+"]").html(str).stop().slideDown(500);

        var i = info.result.length % 3;
   
        // console.log(i);
              
        if(i == 0){
          $(".list[data-current="+id+"] li:nth-last-child(-n+3)").css("border-bottom-color","transparent");
        }else if(i == 2) {
          $(".list[data-current="+id+"] li:nth-last-child(-n+2)").css("border-bottom-color","transparent");
        }else if(i == 1) {
          $(".list[data-current="+id+"] li:last-child").css("border-bottom-color","transparent");
        }

      }
    });

  }

});