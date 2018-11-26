$(function () {

  // 存种类
  var id = +getData("categoryId");

  // 存当前页
  var currentPage = 1;

  // 总页数
  var totalPage = null;

  // 进入页面  渲染面包屑
  new AjaxRequest({
    url : "getProductMenu",
    param : {
      categoryid: id
    },
    callBack : function (info) {
      console.log(info);
      var str = template("breadTmp", info);
      $(".bread").html(str);
    }
  });

  // 根据页数 渲染当前页 
  render(currentPage);

  // 生成tip框高度
  tipH();

  // 下拉框的li绑定事件
  $(".input").on("click", ".page li", function () {

    var index = $(this).index() + 1;

    var txt = $("#ipt").val().slice(1);

    txt = index + txt;

    $("#ipt").val(txt);

    $("#ipt").trigger("blur");

    currentPage = index;
    
    render(currentPage);

  });
 
  // 给输入框绑定事件
  $(".input").on("focus","#ipt",function () {
    $(".page").slideDown();
  });

  $(".input").on("blur","#ipt",function () {
    $(".page").slideUp();
  });
  
  // 按照输入内容渲染指定页
  $(".input").on("change", "#ipt", function () {
    
    $(".page").slideUp();
    
    currentPage = +$("#ipt").val().slice(0,1);

    if(currentPage > totalPage){
      $(".tip").show();
      currentPage = totalPage;
    }

    if(currentPage < 1){
      $(".tip").show();
      currentPage = 1;
    }
    
    render(currentPage);
    
  });

  // 给按钮绑定事件
  $(".control .left").click(function () {

     currentPage--;
     
     $(".input").removeClass("error");

     if(currentPage < 1){
       currentPage = 1;
       $(".input").addClass("error");
     }
     
     $("#ipt").val(reIpt());  
   
     render(currentPage);     
      
  });

  $(".control .right").click(function () {

     currentPage++;
     
     $(".input").removeClass("error");

     if(currentPage > totalPage){
       currentPage = totalPage;
       $(".input").addClass("error");
     }

     $("#ipt").val(reIpt());
       
     render(currentPage);
       
  });
  
  $(".tip .yes").click(function () {
     
    $(".tip").hide();
     
  });

  
  //点击产品跳转功能
  $("ul.list").on("click","a",function () {
    
    var cate = $(".bread a:nth-of-type(3)").data("cate");

    var proId = $(this).data("proid");

    // console.log("detail.html?proid="+proId+"&cate="+cate+"&reUrl="+location.href);
    
    location.href = "detail.html?proid="+proId+"&cate="+cate+"&reUrl="+location.href;
    
  });


  // 替换输入框内容
  function reIpt() {
    var arr = $("#ipt").val().split("/");

    arr.splice(0,1,currentPage);

    var str = arr.join("/");

    return str;
  }

  // 渲染当前页的方法
  function render(page) {

    new AjaxRequest({
      url : "getProductList",
      param : {
        categoryid: id,
        pageid: page
      },
      beforeSend : function () {
        if($(".input").hasClass("error")){
          return false;
        }      
      },
      callBack : function (info) {
        console.log(info);

        //总页码数
        totalPage = info.totalCount / info.pagesize;

        var str = template("pageTmp", {
          pages: totalPage,
          currentPage : page
        });

        $(".control .input").html(str);

        // 渲染商品列表
        var str1 = template("productTmp",info);
        $(".middle .list").html(str1);
      }
    });

  }
  
  // 计算蒙层高度
  function tipH() {

    $(".tip").css("height",$(window).height()+"rem/@base"); 
      
  }

  $(window).resize(tipH);

});

