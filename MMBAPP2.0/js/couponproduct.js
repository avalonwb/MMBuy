
$(function(){
  //根据优惠券标题id获取对应的优惠券列表
  var couponid = GetUrlParms().couponid;
  var src;
  $.ajax({
    url:"http://mmb.ittun.com/api/getcouponproduct",
    data:{couponid:couponid},
    success:function(data){
      console.log(data);
      var str = template("couproList",data);
      $(".couproBox").html(str);
    }
  });
  $(".couproBox").on("click",".couproList",function(){
    src = $(this).find(".img img").attr("src");
    $(".mmb_mask").find("img").attr("src",src);
    $(".mmb_mask").show();
  });
  $(".mmb_mask").on("click",".delete",function(){
    $(this).parents(".mmb_mask").hide();
    $(this).prev().css("src","")
  });


});