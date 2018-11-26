

$(function () {
  
  var id = +getData("proid");
  
  var cate = getData("cate");
  
  // 单独处理
  var reUrl = reUrl(location.search);
  
  // console.log(id);
  // console.log(cate);
  // console.log(reUrl);
  
  // 请求面包屑数据
  new AjaxRequest({
    url : "getDetailMenu",
    param : {
      productid : id
    },
    callBack : function (info) {
      
      info.more = {
        cate : cate,
        reUrl : reUrl
      }

      // console.log(info);
      
      var str = template("breadTmp",info);

      $(".promsg").html(str);
    }
  }); 
  
  // 请求评论数据
  new AjaxRequest({
     url : "getComments",
     param : {
       productid :id
     },
     callBack : function (info) {
      //  console.log(info);
      var str = template("comTmp",info);
      $(".comment .list").html(str);
     }
  });

  // 单独处理回跳地址的方法
  function reUrl( url ) {

    var arr =  url.slice(1).split("&");

    var str = arr[2];

    str = str.replace("reUrl=","");

    // console.log(str);
    
    return str;

  }

});