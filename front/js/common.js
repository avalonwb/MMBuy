// 公共方法

// 区域滚动初始化
$(window).on("load",function () {   
    myScroll = new IScroll(".container");
});


// 点击返回顶部
$("#goTop").click(function () {

    myScroll.destroy();
    myScroll = null;

    $(".main").css({
        transform : "none",
        transition : "all 1s ease-in-out"
    });

    setTimeout(function () {
        myScroll = new IScroll(".container");
    },1000);

});


// 封装获取地址栏数据的方法
function getData( key ) {
    
    var str = location.search;  
    var obj = {};
 
    str = decodeURI(str);
    // ?key=月&name=12
    str = str.slice(1);
    // key=月&name=12
    var arr = str.split("&");
    // ["key=月", "name=12"]
    arr.forEach(function (ele,index) {
      var k = ele.split("=")[0];
      var v = ele.split("=")[1];
 
      obj[k] = v;
    });
    //{key: "月", name: "12"} 
 
    return obj[key];
      
}

// 封装ajax请求
(function (window) {

    //地址
    var urls = {
        
        baseUrl: 'http://127.0.0.1:9090',

        getIndexMenu: '/api/getindexmenu',//获取首页菜单
        getMoneyCtrl: '/api/getmoneyctrl',//首页商品展示
        getCategoryTitle: '/api/getcategorytitle',//比价搜索一级导航
        getCategory: '/api/getcategory',//比价搜索二级导航
        getProductMenu : "/api/getcategorybyid", //请求产品列表面包屑
        getProductList : "/api/getproductlist", //请求产品列表
        getDetailMenu : "/api/getproduct", //请求详情页面包屑
        getComments : "/api/getproductcom", //请求详情页评论
        getShopMenu : "/api/getgsshop", //请求店铺数据
        getArea : "/api/getgsshoparea", //请求区域数据
        getProList : "/api/getgsproduct" //请求凑单品商品数据
    } 

    function AjaxRequest(opts) {
        this.type = opts.type || "get";
        this.url = urls.baseUrl + urls[opts.url];
        this.param = opts.param || {};
        this.isShowLoader = opts.isShowLoader || false;
        this.dataType = opts.dataType || "json";
        this.beforeSend = opts.beforeSend || null;
        this.callBack = opts.callBack;
        this.init();
    }

    AjaxRequest.prototype = {
        //初始化
        init: function () {
            this.sendRequest();
        },
        //渲染loader
        showLoader: function () {
            if (this.isShowLoader) {
                var loader = '<div class="ajaxLoader"><div class="loader">加载中...</div></div>';
                $("body").append(loader);
            }
        },
        //隐藏loader
        hideLoader: function () {
            if (this.isShowLoader) {
                $(".ajaxLoader").remove();
            }
        },
        //发送请求前验证功能
        areYouOk : function () {

         if( this.beforeSend !== null){
           //Object.prototype.toString.call方法--精确判断对象的类型
           if (Object.prototype.toString.call(this.beforeSend) === 
             "[object Function]") {   
                return this.beforeSend;
           }else{
                console.log("你传的是个瘠薄啊");
                return;       
           }
         }
            
        },
        //发送请求
        sendRequest: function () {    
            var self = this;
            $.ajax({
                type: this.type,
                url: this.url,
                data: this.param,
                dataType: this.dataType,
                beforeSend: this.areYouOk(),
                success: function (res) {
                    self.hideLoader();
                    if (res != null && res != "") {
                        if (self.callBack) {
                            if (Object.prototype.toString.call(self.callBack) === "[object Function]") {   //Object.prototype.toString.call方法--精确判断对象的类型
                                self.callBack(res);
                            } else {
                                console.log("callBack is not a function");
                            }
                        }
                    }
                }
            });
        }
    };

    window.AjaxRequest = AjaxRequest;

})(window);
