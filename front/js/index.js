
$(function () {
  
  // 进入页面 渲染导航
  new AjaxRequest({
    url : "getIndexMenu",
    callBack : function (info) {
      // console.log(info);
           
      var str = template("navTmp",info);
      $(".nav").html(str);
    }
  });
  
  // 进入页面 渲染产品
  new AjaxRequest({  
    url : "getMoneyCtrl",
    callBack : function (info) {
      // console.log(info);
      var str = template("proTmp",info);
      $(".goods .product").html(str);
    }
  });

  // 导航栏点击更多功能
  $("ul.nav").on("click",".more",function () {
    console.log(1);
    

    var $start =  $(this).parent().index();

    $("ul.nav li").each(function (index,ele) {
       if(index > $start){
          $(this).slideToggle();
       }
    });
     
  });
  

});