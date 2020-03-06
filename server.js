var http = require("http");
var fs = require("fs");
var url = require("url");
var port = process.argv[2];

if (!port) {
  console.log("请指定端口号好不啦？\nnode server.js 8888 这样不会吗？");
  process.exit(1);
}

var server = http.createServer(function(request, response) {
  var parsedUrl = url.parse(request.url, true);
  var pathWithQuery = request.url;
  var queryString = "";
  if (pathWithQuery.indexOf("?") >= 0) {
    queryString = pathWithQuery.substring(pathWithQuery.indexOf("?"));
  }
  var path = parsedUrl.pathname;
  var query = parsedUrl.query;
  var method = request.method;

  /******** 从这里开始看，上面不要看 ************/

  console.log(
    "大哥，有人过来询问qq.com的路径啦！路径（带查询参数）为：" + pathWithQuery
  );

  response.statusCode = 200;

  // 设置默认的首页
  const requestPath = path === "/" ? "/index.html" : path;
  // 检查.的索引
  const index = requestPath.lastIndexOf(".");
  // 裁切得到.后面的路径， 即文件类型
  const suffix = requestPath.substring(index);
  // 使用hash哈希表的数据结构，映射得到文件类型
  const filesType = {
    ".html": "tex/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".png": "image/png",
    ".jpg": "image/jpeg"
  };
  // 设置响应头的文件类型
  response.setHeader(
    "Content-Type",
    `${filesType[suffix] || "text/html"}; charset=utf-8`
  );
  let content;
  try {
    content = fs.readFileSync(`./public${requestPath}`);
  } catch (error) {
    content = "该文本不存在";
    response.statusCode = 404;
  }
  response.write(content);
  response.end();

  /******** 代码结束，下面不要看 ************/
});

server.listen(port);
console.log(
  "监听 " +
    port +
    " 成功\n请用最新的苹果普拉斯100Max pro 双击打开qq.com的本地服务器地址 http://localhost:" +
    port
);
