$(function(){
  //获取国内商品列表数据
  $.ajax({
    url:"http://mmb.ittun.com/api/getinlanddiscount",
    success:function(data){
      console.log(data);
      var str = template("inlanddiscount",data);
      $(".discountBox").html(str);
    }
  })
});