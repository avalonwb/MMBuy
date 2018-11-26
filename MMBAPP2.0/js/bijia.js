$(function () {
  var productid = GetUrlParms().productid || 1;
  //根据商品id获取商品详情
  $.ajax({
    url: "http://mmb.ittun.com/api/getproduct",
    data: {
      productid: productid
    },
    success: function (data) {
      console.log(data);
      var str = template("getproduct", data);
      $(".mmb_bijia .desc").html(str);
      var goShop = template("goShop", data);
      $(".mmb_bijia .shopTop").html(goShop);
      //保存分类id
      var categoryid = data.result[0].categoryId;
      //截取商品名
      var productName = data.result[0].productName.split(" ")[0];
      //根据分类id获取分类名
      $.ajax({
        url: "http://mmb.ittun.com/api/getcategorybyid",
        data: {
          categoryid: categoryid
        },
        success: function (info) {
          brand = {
            category: info.result[0],
            productName: productName
          };
          console.log(brand);
          // 将分类名和商品名包装成对象，结合模板引擎，渲染到三级菜单导航中
          var bijiaTitle = template("bijiaTitle", brand);
          $(".mmb_bijia .three").html(bijiaTitle);
        }
      })


    }
  })
  //根据商品id获取商品评论
  $.ajax({
    url: "http://mmb.ittun.com/api/getproductcom",
    data: {
      productid: productid
    },
    success: function (data) {
      console.log(data);
      var str = template("getproductcom", data);
      $(".mmb_evaluate .comBox").html(str);
    }
  })
})