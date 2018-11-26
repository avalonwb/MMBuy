//获取url地址栏参数，返回为对象格式
function GetUrlParms() {
  var search = location.search.slice(1);
  var params = search.split("&");
  var args = {};
  params.forEach(function (v, i) {
    var key = v.split("=")[0];
    var value = v.split("=")[1];
    args[key] = value;
  })
  return args;
}
