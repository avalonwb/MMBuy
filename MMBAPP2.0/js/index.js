$(function () {
  //获取首页菜单栏数据
  $.ajax({
    type: "get",
    url: "http://mmb.ittun.com/api/getindexmenu",
    success: function (data) {
      console.log(data);
      //结合模板引擎将菜单栏数据渲染到页面中
      var str = template("getindexmenu", data);
      $(".mmb_nav ul").html(str);
      //点击更多按钮，切换第三行导航栏数据的显示与隐藏
      var $more = $(".mmb_nav .nav.more");
      $hide = $(".mmb_nav .nav.more ~ .nav");
      $more.on("click",function(){
        $hide.toggleClass("hide");
      })
    },
  })
  //获取首页列表数据
  $.ajax({
    url: "http://mmb.ittun.com/api/getmoneyctrl",
    success: function (data) {
      console.log(data);
      var str = template("getmoneyctrl", data);
      $(".recom_content ul").html(str);
    }
  })
});