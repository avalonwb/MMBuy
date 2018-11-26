
$(function(){
  //定义全局变量记录id
  var $shopid ;
  var $areaid;

  $.ajax({
    url:"http://mmb.ittun.com/api/getgsshop",
    success:function(data){
      console.log(data);
      var str = template("shoplist",data);
      $(".shopBox").html(str);
    }
  })
  $.ajax({
    url:"http://mmb.ittun.com/api/getgsshoparea",
    success:function(data){
      console.log(data);
      var str = template("arealist",data);
      $(".areaBox").html(str);
    }
  })

  //给导航栏按钮注册点击事件，点击时，对应下标的ul显示，其他ul隐藏
  $(".gsnavBox").on("click",".gsnavList",function(){
    var $index = $(this).index();
    $(".select ul").eq($index).toggle();
    if($(".select ul").eq($index).css("display") === "block"){
      $(".select ul").eq($index).siblings().hide();
    }

  })

  //给下拉框中li注册点击事件，记录shopid和areaid。点击之后即发送ajax请求，获取对应的数据渲染到页面中
  $(".shopBox").on("click","li",function(){
    $shopid = $(this).data("shopid");
    $(".shopBox").hide();
    $(".gsnavBox .gsnavList").eq(0).find("span").text($(this).text());
    render($shopid,$areaid);
  })
  $(".areaBox").on("click","li",function(){
    $areaid = $(this).data("areaid");
    $(".areaBox").hide();
    var a = $(this).text().trim().slice(0,2);
    $(".gsnavBox .gsnavList").eq(1).find("span").text(a);
    render($shopid,$areaid);
  })
  $(".priceBox").on("click","li",function(){
    $(".priceBox").hide();
    render(0,0);
  })
  function render(shopid,areaid){
    shopid = shopid || 0;
    areaid = areaid || 0;
    $.ajax({
      url:"http://mmb.ittun.com/api/getgsproduct",
      data:{shopid:shopid,areaid:areaid},
      success:function(data){
        console.log(data);
        var str = template("conlist",data);
        $(".conBox").html(str);
      }
    })
  }
  render();

});