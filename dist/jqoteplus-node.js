/*
 * jQoteplus - Javascript templating engine
 * https://github.com/ntesmail/jqoteplus
 * Licensed under the MIT
 */

var JQOTE2_TMPL_UNDEF_ERROR = 'UndefinedTemplateError',
    JQOTE2_TMPL_COMP_ERROR = 'TemplateCompilationError',
    JQOTE2_TMPL_EXEC_ERROR = 'TemplateExecutionError';

var ARR = '[object Array]',
    STR = '[object String]',
    FUNC = '[object Function]';

var n = 1,
    tag = '%',
    qreg = /^[^<]*(<[\w\W]+>)[^>]*$/,
    type_of = Object.prototype.toString;

function extend(a, b){
    for (var i in b){
        a[i] = b[i];
    }
}
function raise(error, ext) {
    throw (extend(error, ext), error);
}

function lambda(tmpl, t) {
    var f, fn = [],
        type = type_of.call(tmpl);
    t = t || tag;
    if (type === FUNC) {
        // return tmpl.jqote_id ? [tmpl] : false;
        return [tmpl];
    }

    if (type !== ARR) {
        return [jqoteplus.jqotec(tmpl, t)];
    }

    if (type === ARR) {
        for (var i = 0, l = tmpl.length; i < l; i++) {
            if (f = lambda(tmpl[i], t)) {
                fn.push(f[0]);
            }
        }
    }

    return fn.length ? fn : false;
}

var jqoteplus = {
    jqote: function(elem, data, t) {
        elem = jqoteplus.jqotecache[elem] || elem; 
        var str = '',
            fn = lambda(elem, t);
        t = t || tag;
        if (fn === false){
            raise(new Error('Empty or undefined template passed to $.jqote'), {
                type: JQOTE2_TMPL_UNDEF_ERROR
            });
        }

        data = type_of.call(data) !== ARR ?
            [data] : data;

        for (var i = 0, l = fn.length; i < l; i++){
            for (var j = 0; j < data.length; j++){
                str += fn[i].call(data[j], i, j, data, fn[i]);
            }
        }

        return str;
    },

    jqotec: function(template, t) {
        var cache, elem, tmpl,
            type = type_of.call(template),
            ie = false;
        t = t || tag;
        if (type === STR && qreg.test(template)) {
            elem = tmpl = template;

            if (cache = jqoteplus.jqotecache[template]){
                return cache;
            }
        } else {
            raise(new Error('Empty or undefined template passed to .jqotec'), {
                type: JQOTE2_TMPL_UNDEF_ERROR
            });
        }

        var index, fn, str = '',
            strArr = [],
            arr = tmpl.replace(/\s*<!\[CDATA\[\s*|\s*\]\]>\s*|[\r\n\t]/g, '').split('<' + t).join(t + '>\x1b').split(t + '>');
            
        // define two templates
        var pushTemp = ['out.push("', '");', 'out.push(', ');', '', 'var out=[];', 'return out.join("");'],
            strTemp = ['out+="', '";', 'out+=', ';', '', 'var out="";', 'return out;'];

        var mode = ie ? pushTemp : strTemp;

        for (var m = 0, l = arr.length; m < l; m++) {
            var temp = arr[m];

            if (temp) {

                if (temp.charAt(0) !== '\x1b') {
                    if (ie) {
                        strArr.push(mode[0]);
                        strArr.push(temp.replace(/([^\\])?(["'])/g, '$1\\$2'));
                        strArr.push(mode[1]);
                    } else {
                        str += mode[0] + temp.replace(/([^\\])?(["'])/g, '$1\\$2') + mode[1];
                    }
                } else {
                    if (temp.charAt(1) === '=') {
                        if (ie) {
                            strArr.push(mode[2]);
                            strArr.push(temp.substr(2));
                            strArr.push(mode[3]);
                        } else {
                            str += mode[2] + temp.substr(2) + mode[3];
                        }
                    } else {
                        if (ie) {
                            strArr.push(mode[4]);
                            strArr.push(temp.substr(1));
                        } else {
                            str += mode[4] + temp.substr(1);
                        }
                    }
                }
                if (ie) {
                    strArr.push('\n');
                } else {
                    str += '\n';
                }
            }
        }

        if (ie) {
            strArr.unshift('try{');
            strArr.unshift(mode[5]);
            strArr.push(mode[6]);
            strArr.push('}catch(e){e.type="' + JQOTE2_TMPL_EXEC_ERROR + '";e.args=arguments;e.template=arguments.callee.toString();throw e;}');
            str = strArr.join('');
        } else {
            str = 'try{' + mode[5] + str + mode[6] +
                '}catch(e){e.type="' + JQOTE2_TMPL_EXEC_ERROR + '";e.args=arguments;e.template=arguments.callee.toString();throw e;}';
        }

        try {
            fn = new Function('i, j, data, fn', str);
        } catch (e) {
            raise(e, {
                type: JQOTE2_TMPL_COMP_ERROR
            });
        }

        index = elem;

        return jqoteplus.jqotecache[index] = (fn.jqote_id = n++, fn);
    },

    jqotefn: function(elem) {
        var type = type_of.call(elem),
            index = type === STR && qreg.test(elem) ?
                elem : '';

        return jqoteplus.jqotecache[index] || false;
    },

    jqotetag: function(str) {
        if (type_of.call(str) === STR){
            tag = str;
        }
    },

    jqotenc: function(str) {
        return str.toString()
            .replace(/&(?!\w+;)/g, '&#38;')
            .split('<').join('&#60;').split('>').join('&#62;')
            .split('"').join('&#34;').split("'").join('&#39;');
    },

    jqotecache: {}
};

module.exports = jqoteplus;