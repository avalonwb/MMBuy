$(function(){
  //获取分类标题数据渲染到页面中
  $.ajax({
    url:"http://mmb.ittun.com/api/getcategorytitle",
    success:function(data){
      console.log(data);
      var str = template("titleList",data);
      $(".itemBox").html(str);
      //点击分类标题获取标题对应的分类列表然后渲染到页面上
      $(".item").on("click","a",function(){
        var $that = $(this);
        var titleid = $(this).data("titleid");
        console.log(titleid);
        $.ajax({
          url:"http://mmb.ittun.com/api/getcategory",
          data:{titleid:titleid},
          success:function(data){
            console.log(data);
            console.log($that);
            var str = template("cateList",data);
            $that.next().html(str);
            $that.next().slideToggle();
          }
        })
      })
    }
  })

});
