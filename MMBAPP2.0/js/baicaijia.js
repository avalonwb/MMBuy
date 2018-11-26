$(function () {
  //获取白菜价标题列表
  $.ajax({
    url: "http://mmb.ittun.com/api/getbaicaijiatitle",
    success: function (data) {
      console.log(data);
      var str = template("navList", data);
      $(".mmb_bcjNav .navBox").html(str);
      // 实现白菜价标题列表区域滚动
      new IScroll(".mmb_bcjNav", {
        scrollX: true,
        scrollY: false
      })
      //给白菜价标题列表注册点击事件
      $(".mmb_bcjNav").on("click", ".navList", function () {
        $(this).addClass("active").siblings().removeClass("active");
        //获取当前被点击的标题id
        var titleId = $(this).find("a").data("titleid");
        //点击白菜价标题获取对应标题的商品列表
        $.ajax({
          url: "http://mmb.ittun.com/api/getbaicaijiaproduct",
          data: {
            titleid: titleId
          },
          success: function (info) {
            console.log(info);
            var bcj = template("bcjList", info);
            $(".mmb_bcjContent .bcjBox").html(bcj);
          }
        })

      })
      //页面第一次加载时触发第一个标题的点击事件
      $(".navList").eq(0).trigger("click");
    }
  })
});