$(function(){
  //根据商品id获取商品的详细信息
  var productid = GetUrlParms().productid || 1;
  $.ajax({
      url:"http://mmb.ittun.com/api/getdiscountproduct",
      data:{productid:productid},
      success: function(data){
        console.log(data);
        var str = template("discount",data);
        $(".mmb_discount").html(str);
        var extra = template("extra",data);
        $(".mmb_extra").html(extra);
      }
    })



});