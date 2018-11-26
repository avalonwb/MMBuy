$(function () {

  var shopArr = ["京西", "七号店", "天喵"];
  var areaArr = ["地球", "金星", "土星", "火星", "水星", "木星", "大星星"];

  var opt = {
    shopid: 0,
    areaid: 0
  }

  var page = 1;
  var totalPage = null;

  var load = true;

  var canvas = document.querySelector("canvas");

  var ctx = canvas.getContext("2d");

  var x = null;
  var y = null;

  // 进入页面 默认渲染
  renderList(true);

  // 点击标题 出现下拉框
  $(".bread [data-type]").click(function () {

    $(this).addClass("active").siblings().removeClass("active");

    if ($(this).data("type") == "shop") {

      renderSel({
        url: "getShopMenu",
        type: "shop"
      });

    } else {

      renderSel({
        url: "getArea",
        type: "area"
      });
    }

  });

  // 给下拉菜单绑定点击事件
  $(".bread .select").on("click", "li", function () {

    var self = this;

    $(this).addClass("current").siblings().removeClass("current");

    var txt = $(this).children("span").text();

    if ($(this).data("type") == "shop") {

      $(".bread .left span").text(txt);

      changeParam("shop", self);

    } else {

      $(".bread .center span").text(txt);

      changeParam("area", self);

    }

  });

  // 返回顶部按钮
  $(".footer #goTop").click(function () {
    $("html,body").animate({
      scrollTop: 0
    }, 2000);
  });

  // 懒加载
  $(window).on("scroll", function () {

    var h = ($(".middle").offset().top + $(".middle").height()) -
      ($(window).height() + $(window).scrollTop());

    if (h < 50) {

      if (load) {

        page++;

        console.log(page);

        console.log(load);

        if (page > totalPage) {
          console.log("没啦");
        } else {
          renderList(false, opt);
        }

        load = false;

        console.log(load);

      }

    }

  });

  //请求下拉菜单数据的方法
  function renderSel(opt) {

    new AjaxRequest({
      url: opt["url"],
      callBack: function (info) {

        info.result.forEach(function (ele, index) {

          ele[opt["type"] + "Name"] = opt["type"] == "shop" ? shopArr[index] : areaArr[index];

        });

        info.whoAmI = opt["type"];

        console.log(info);

        var str = template("breadTmp", info);

        // console.log(str);

        $(".bread .select").html(str).slideDown();

      }
    });

  }

  // 点击下拉菜单改变参数并渲染的方法
  function changeParam(type, point) {

    opt[type + "id"] = $(point).data("msg");

    console.log(opt);

    page = 1;

    load = true;

    renderList(true, opt);

    $(point).parent().slideUp();

  }

  //根据参数 渲染产品的方法
  function renderList(isFirst, opt) {

    opt = opt || {
      shopid: 0,
      areaid: 0,
    };

    new AjaxRequest({
      url: "getProList",
      param: {
        shopid: opt["shopid"],
        areaid: opt["areaid"]
      },
      callBack: function (info) {
        console.log(info);

        totalPage = Math.ceil(info.result.length / 6);

        var arr = info.result.splice((page - 1) * 6, 6);

        console.log(arr);

        var str = template("proTmp", {
          list: arr
        });

        // console.log(str);

        if (isFirst) {
          $(".middle .list").html(str);
          reSize();
        } else {
          setTimeout(function () {
            $(".middle .list").append(str);
            load = true;
            reSize();
          }, 1000);
        }

      }
    });

  }


  // 彩球
  $(window).on("resize", reSize);

  function Ball(obj) {
    obj = obj || {};
    this.x = obj.x || 400;
    this.y = obj.y || 300;
    this.r = obj.r || 20;
    this.dr = Math.random() + 1;
    this.rx = Math.random() * 10 - 5;
    this.ry = Math.random() * 10 - 5;
    this.color = obj.color || "blue";
    ballArr.push(this);
  }

  Ball.prototype = {
    constructor: Ball,
    render: function () {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
      ctx.fillStyle = this.color[parseInt(Math.random() * this.color.length)];
      ctx.fill();
      ctx.closePath();
    },
    update: function () {
      this.x += this.rx;
      this.y += this.ry;
      this.r -= this.dr;
      if (this.r <= 0) {
        ballArr = _.without(ballArr, this);
      }
    }
  };

  var ballArr = [];

  canvas.onmousemove = function (event) {
    // console.log(1);
    new Ball({
      x : event.offsetX , y : event.offsetY,
      color : ["turquoise","crimson","violet","chocolate","cornflowerblue","skyblue","deeppink","gold","thistle","rosybrown"]
    });
  }

  // canvas.addEventListener("touchstart", function (event) {
  //   x = event.touches[0].clientX;
  //   y = event.touches[0].clientY - $(this).offset().top;
  //   console.log(x,y);
  // });

  // canvas.addEventListener("touchmove", function (event) {
  //   console.log(event.touches[0].clientX);
  //   console.log(event.touches[0].clientY);

  //   var distanceX = event.touches[0].clientX - x;
  //   var distanceY = event.touches[0].clientY - y;

  //   if (distanceX > 5 || distanceY > 5) {

  //     new Ball({
  //       x: event.touches[0].clientX,
  //       y: event.touches[0].clientY - $(this).offset().top,
  //       color: ["turquoise", "crimson", "violet", "chocolate", "cornflowerblue", "skyblue", "deeppink", "gold", "thistle", "rosybrown"]
  //     });

  //   }

  // });


  var timer = setInterval(function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ballArr.forEach(function (ele, index) {
      if (ele) {
        ele.render();
      }
      ele.update();
    });
  }, 80);

  function reSize() {

    canvas.width = $(".middle").width();
    canvas.height = $(".middle .list").height();

  }


});