'use strict';
var jqoteplus = require('../dist/jqoteplus-node.js');


var template = 'jqoteplus is <%=this.name%> !';
var data = {
    name: 'amazing'
};
var html = jqoteplus.jqote(template, data);
console.log(html);