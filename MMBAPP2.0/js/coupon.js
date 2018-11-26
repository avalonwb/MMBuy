$(function(){
  //获取优惠券标题列表
  $.ajax({
    url:"http://mmb.ittun.com/api/getcoupon",
    success:function(data){
      console.log(data);
      var str = template("couponList",data);
      $(".couponBox").html(str);
    }
  })

});