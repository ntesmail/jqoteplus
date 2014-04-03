jqoteplus
=========
>jqoteplus 是一个易用高效的JavaScript模板(client-side templating)

基于[jQote2](https://github.com/aefxx/jQote2)，根据天朝特殊环境针对ie进行了优化并简化了接口。

出于性能考虑加入了预编译工具，将模板转换静态的js文件。

## 快速上手

### 引用jQuery，jquteplus

### 模板定义
模板的逻辑语法基于tag定义，默认是`%`，一共两种定义方式`<%` `%>`和`<%=` `%>`。

在`<%`和`%>`之间执行任意的JavaScript代码，`<%=` 则表示输出`=`第一个语句的内容。其他内容不做解析直接输出

在任意你可以获取到的容器上编写你的模板。

```html
    <script id="demo" type="text/x-jqote-template">
        <h1><%=this.title%></h1>
        <div>hello, <%=this.name || 'World'%></div>
    </script>
```
### 渲染
html节点:
```html
    <div id="content"></div>
```
Javascript:
```js
    var data = [{
        title: 'Demo',
        name: 'Len'
    },{
        title: 'Demo2'
    }];
    var html = $('#demo').jqote(data);
    $('#content').html(html);
```
结果:
```html
    <div id="content">
        <h1>Demo</h1>
        <div>hello, Len</div>
        <h1>Demo2</h1>
        <div>hello, World</div>
    </div>
```
[demo](src/demo/demo.html)

## 进阶
你也可以将模板定义在js中或者动态加载的结果中，再进行模板的编译调用。

```js
    var template = '<div>whos u <%=this.name%></div>';
    var data = {
        name: 'daddy'
    };
    var html = $('#demo').jqote(data);
    $('#content').html(html);
```
[demo](src/demo/demo.html)

jqoteplus是前端模板，所以你也可以嵌套调用模板
```js
    var template = 'jqoteplus is <%=this.name%> !<%=$("#demo").jqote(this.content);%>';
    var data = {
        name: 'amazing',
        content: {
            title: 'Demo',
            name: 'Len'
        }
    };
    var html = $.jqote(template, data);
    $('#content').html(html);
```
[demo](src/demo/demo.html)

## API快速上手

### 预览
```js
    $(template).jqote(data[, tag])
    $.jqote(template, data[, tag])
    $.jqotec(template[, tag])
    $.jqotefn(template)
    $.jqotetag(tag)
```
###`$.jqote(template, data[, tag])`
    
编译并且执行模板方法。返回执行结果(String)

Demo:
```js
    var template = "<h1><%=this.title%></h1>" +
        "<div>hello, <%=this.name || 'World'%></div>"
    var data = {
        title: 'Demo',
        name: 'Len'
    };
    var html = $('#demo').jqote(data);
    $('#content').html(html);
```

###`$.jqotec(template, data[, tag])` 

编译jqoteplus方法，返回编译后的方法

Demo:
```js
    var template = "<h1><%=this.title%></h1>" +
        "<div>hello, <%=this.name || 'World'%></div>"
    var data = {
        title: 'Demo',
        name: 'Len'
    };
    var lambda = $('#demo').jqote(data);
```

### `$.jqotefn(template)`

jqoteplus使用 `$.jqotecache` 缓存已经编译的结果，这个方法可以获取缓存中的模板函数，没有编译过返回false

Demo:
```js
    var template = "<h1><%=this.title%></h1>" +
        "<div>hello, <%=this.name || 'World'%></div>"
    var data = {
        title: 'Demo',
        name: 'Len'
    };
    var lambda = $('#demo').jqote(data);
```

### `$.jqotetag(tag)` 设置模板编译的tag，默认tag为`%`。

Demo:
```js
    $.jqotetag('&');
```

    
    

[更多例子](https://github.com/ntesmail/jqoteplus/blob/master/demo/demo.html)

[更详细的API定义](https://github.com/ntesmail/jqoteplus/blob/master/doc/api.md)

## 预编译
jqoteplus预编译是基于Grunt的一个工具，[jqoteplus-build](https://github.com/ntesmail/jqoteplus-build)

```html
    <script id="demo" type="text/x-jqote-template">
        <h1><%=this.title%></h1>
        <div>hello, <%=this.name || 'World'%></div>
    </script>
```
编译后根据模板的id，可以直接调用模板。
```js
    $.jqote('demo', data);
```

## License
jqoteplus.js is available under the terms of the [MIT License](https://github.com/ntesmail/jqoteplus/blob/master/LICENSE).