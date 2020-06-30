/*用export把方法暴露出来*/
/*设置cookie*/
export function setCookie(c_name, value, expire) {
  var date = new Date();
  date.setSeconds(date.getSeconds() + expire);//getSeconds返回时间的秒，setSeconds设置日期的秒
  document.cookie =
    c_name + "=" + escape(value) + "; expires=" + date.toGMTString();
  console.log(document.cookie);
}
/*获取cookie*/
export function getCookie(c_name) {
  if (document.cookie.length > 0) {
    //取得这个cookie名在整个cookie中的位置，加“=”号：取cookie名加上等于号的位置
    let c_start = document.cookie.indexOf(c_name + "=");
    if (c_start != -1) {
      //是用先前取得的位置加上cookie名的长度再加1，就是把位置确定在这个cookie名的“=”符号的后面
      c_start = c_start + c_name.length + 1;
      //获取指定cookie名字的值得结束位置，从开始位置开始取；的位置，因为分号是分隔符
      let c_end = document.cookie.indexOf(";", c_start);
      //如果结束位置为-1则表示这个cookie是最后一个没有；所以取最长值
      if (c_end == -1) c_end = document.cookie.length;
      //返回解码后的cookie值，unescape代表解码
      return unescape(document.cookie.substring(c_start, c_end));
    }
  }
  return "";
}
/*删除cookie*/
export function delCookie(c_name) {
  setCookie(c_name, "", -1);
}
