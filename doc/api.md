## jqoteplus API reference

### 预览
```js
    $(template).jqote(data[, tag])
    $.jqote(template, data[, tag])(推荐使用)
    $.jqotec(template[, tag])
    $.jqotefn(template)
    $.jqotetag(tag)
```
### $(template).jqote(data[, tag])
Returns `String`

模板执行结果

##### data
Type: `Object` or `Array`
模板需要引入的数据

##### tag
Type: `String`
Default value: `%`

模板解析的tag，非必须参数

### $.jqote(template, data[, tag])
Returns `String`

编译并且执行模板方法。返回执行结果(String)

##### template
Type: `String`
未解析的模板

##### data
Type: `Object` or `Array`
模板需要引入的数据

##### tag
Type: `String`
Default value: `%`模板解析的tag，非必须参数

Demo:
```js
    var template = "<h1><%=this.title%></h1>" +
        "<div>hello, <%=this.name || 'World'%></div>";
    var data = {
        title: 'Demo',
        name: 'Len'
    };
    var html = $('#demo').jqote(data);
    var html2 = $.jqote($('#demo')[0].innerHTML, data);
    $('#content').html(html);
```

###$.jqotec(template[, tag])
Returns 'Function'

编译jqoteplus方法，返回编译后的方法

##### template
Type: `String`
未解析的模板

Demo:
```js
    var template = "<h1><%=this.title%></h1>" +
        "<div>hello, <%=this.name || 'World'%></div>";
    var lambda = $.jqotec($('#demo')[0].innerHTML);
```

Result:
```js
    function(i, j, data, fn) {
        var out = [];
        try {
            out.push("<h1>");
            out.push(this.title);
            out.push("</h1><div>hello, ");
            out.push(this.name);
            out.push("</div>");
            return out.join("");
        } catch (e) {
            e.type = "TemplateExecutionError";
            e.args = arguments;
            e.template = arguments.callee.toString();
            throw e;
        }
    };
```

### $.jqotefn(template)
Returns `function` or `false`

##### template
Type: `String` or `jQuery object` or `DOM element`

jqoteplus使用 `$.jqotecache` 缓存已经编译的结果，这个方法可以获取缓存中的模板函数，没有编译过返回false

Demo:
```js
    var template = "<h1><%=this.title%></h1>" +
        "<div>hello, <%=this.name || 'World'%></div>"
    var data = {
        title: 'Demo',
        name: 'Len'
    };
    var html = $('#demo').jqote(data);
    var lambda = $.jqotefn('#demo');
```

### $.jqotetag(tag)
Returns `void`

##### tag
Type: `String`
Default value: `%`

设置模板编译的tag，默认tag为`%`，可以随意定义。

Demo:
```js
    $.jqotetag('$$');
```