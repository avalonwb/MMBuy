$(function(){
  var brandtitleid = GetUrlParms().brandtitleid || 1;
  //根据品牌id获取品牌标题
  $.ajax({
    url:"http://mmb.ittun.com/api/getbrand",
    data:{brandtitleid:brandtitleid},
    success:function(data){
      console.log(data);
      var str = template("brandlist",data);
      $(".brandBox").html(str);
    }
  });
  //根据品牌id获取对应的商品列表
  $.ajax({
    url:"http://mmb.ittun.com/api/getbrandproductlist",
    data:{brandtitleid:brandtitleid,pagesize:4},
    success:function(data){
      console.log(data);
      var str = template("salelist",data);
      $(".saleBox").html(str);
    }
  })
  //根据商品id获取对应商品的评论
  $.ajax({
    url:"http://mmb.ittun.com/api/getproductcom",
    data:{productid:0},
    success:function(data){
      console.log(data);
      var str = template("comlist",data);
      $(".comBox").html(str);
    }
  })
});
