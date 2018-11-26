$(function(){
  // 获取所有的品牌标题
  $.ajax({
    url:"http://mmb.ittun.com/api/getbrandtitle",
    success:function(data){
      console.log(data);
      var str = template("titlelist",data);
      $(".titleBox").html(str);
    }
  })

});
