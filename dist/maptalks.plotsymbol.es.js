import * as __WEBPACK_EXTERNAL_MODULE__mapbox_point_geometry__ from "@mapbox/point-geometry";
/*!
 * maptalks v0.49.5
 * LICENSE : BSD-3-Clause
 * (c) 2016-2021 maptalks.org
 */ var version = "0.49.5";
var INTERNAL_LAYER_PREFIX = '_maptalks__internal_layer_';
var GEOMETRY_COLLECTION_TYPES = [
    'MultiPoint',
    'MultiLineString',
    'MultiPolygon',
    'GeometryCollection'
];
var GEOJSON_TYPES = [
    'FeatureCollection',
    'Feature',
    'Point',
    'LineString',
    'Polygon'
].concat(GEOMETRY_COLLECTION_TYPES);
var RESOURCE_PROPERTIES = [
    'markerFile',
    'polygonPatternFile',
    'linePatternFile',
    'markerFillPatternFile',
    'markerLinePatternFile'
];
var RESOURCE_SIZE_PROPERTIES = [
    [
        'markerWidth',
        'markerHeight'
    ],
    [],
    [
        null,
        'lineWidth'
    ],
    [],
    [
        null,
        'markerLineWidth'
    ]
];
var NUMERICAL_PROPERTIES = {
    lineWidth: 1,
    lineOpacity: 1,
    lineDx: 1,
    lineDy: 1,
    polygonOpacity: 1,
    markerWidth: 1,
    markerHeight: 1,
    markerDx: 1,
    markerDy: 1,
    markerOpacity: 1,
    markerFillOpacity: 1,
    markerLineWidth: 1,
    markerLineOpacity: 1,
    textSize: 1,
    textOpacity: 1,
    textHaloRadius: 1,
    textWrapWidth: 1,
    textLineSpacing: 1,
    textDx: 1,
    textDy: 1
};
var COLOR_PROPERTIES = [
    'lineColor',
    'polygonFill',
    'markerFill',
    'markerLineColor',
    'textFill'
];
var DEFAULT_TEXT_SIZE = 14;
function now() {
    return Date.now();
}
function extend(dest) {
    for(var i = 1; i < arguments.length; i++){
        var src = arguments[i];
        for(var k in src)dest[k] = src[k];
    }
    return dest;
}
function isNil(obj) {
    return null == obj;
}
function isNumber(val) {
    return 'number' == typeof val && !isNaN(val);
}
function isInteger(n) {
    return (0 | n) === n;
}
function isObject(obj) {
    return 'object' == typeof obj && !!obj;
}
function isString(obj) {
    if (isNil(obj)) return false;
    return 'string' == typeof obj || null !== obj.constructor && obj.constructor === String;
}
function isFunction(obj) {
    if (isNil(obj)) return false;
    return 'function' == typeof obj || null !== obj.constructor && obj.constructor === Function;
}
var maptalks_es_hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
    return maptalks_es_hasOwnProperty.call(obj, key);
}
function join(arr, seperator) {
    if (arr.join) return arr.join(seperator || ',');
    return Array.prototype.join.call(arr, seperator || ',');
}
function isEmpty(object) {
    var property;
    for(property in object)return false;
    return !property;
}
var pi = Math.PI / 180;
function toRadian(d) {
    return d * pi;
}
function toDegree(r) {
    return r / pi;
}
var IS_NODE = '[object process]' === Object.prototype.toString.call('undefined' != typeof process ? process : 0) && !process.versions['electron'] && !process.versions['nw'] && !process.versions['node-webkit'];
var maptalks_es_requestAnimFrame, maptalks_es_cancelAnimFrame;
(function() {
    if (IS_NODE) {
        maptalks_es_requestAnimFrame = function(fn) {
            return setTimeout(fn, 16);
        };
        maptalks_es_cancelAnimFrame = clearTimeout;
        return;
    }
    var requestFn, cancelFn;
    var timeToCall = 1000 / 30;
    function timeoutDefer(fn) {
        return setTimeout(fn, timeToCall);
    }
    function getPrefixed(name) {
        return window['webkit' + name] || window['moz' + name] || window['ms' + name];
    }
    if ('undefined' != typeof window) {
        requestFn = window['requestAnimationFrame'] || getPrefixed('RequestAnimationFrame') || timeoutDefer;
        cancelFn = window['cancelAnimationFrame'] || getPrefixed('CancelAnimationFrame') || getPrefixed('CancelRequestAnimationFrame') || function(id) {
            window.clearTimeout(id);
        };
    } else {
        requestFn = timeoutDefer;
        cancelFn = clearTimeout;
    }
    maptalks_es_requestAnimFrame = function(fn) {
        return requestFn(fn);
    };
    maptalks_es_cancelAnimFrame = function(id) {
        if (id) cancelFn(id);
    };
})();
function isSVG(url) {
    var prefix = 'data:image/svg+xml';
    if (url.length > 4 && '.svg' === url.slice(-4)) return 1;
    if (url.slice(0, prefix.length) === prefix) return 2;
    return 0;
}
function loadImage(img, imgDesc) {
    if (IS_NODE && loadImage.node) {
        loadImage.node(img, imgDesc);
        return;
    }
    img.src = imgDesc[0];
}
var maptalks_es_uid = 0;
function UID() {
    return maptalks_es_uid++;
}
var GUID = UID;
function parseJSON(str) {
    if (!str || !isString(str)) return str;
    return JSON.parse(str);
}
function pushIn(dest) {
    for(var i = 1; i < arguments.length; i++){
        var src = arguments[i];
        if (src) for(var ii = 0, ll = src.length; ii < ll; ii++)dest.push(src[ii]);
    }
    return dest.length;
}
function removeFromArray(obj, array) {
    var i = array.indexOf(obj);
    if (i > -1) array.splice(i, 1);
}
function forEachCoord(arr, fn, context) {
    if (!Array.isArray(arr)) return context ? fn.call(context, arr) : fn(arr);
    var result = [];
    var p, pp;
    for(var i = 0, len = arr.length; i < len; i++){
        p = arr[i];
        if (isNil(p)) {
            result.push(null);
            continue;
        }
        if (Array.isArray(p)) result.push(forEachCoord(p, fn, context));
        else {
            pp = context ? fn.call(context, p) : fn(p);
            result.push(pp);
        }
    }
    return result;
}
function getValueOrDefault(v, d) {
    return void 0 === v ? d : v;
}
function sign(x) {
    if (Math.sign) return Math.sign(x);
    x = +x;
    if (0 === x || isNaN(x)) return Number(x);
    return x > 0 ? 1 : -1;
}
function log2(x) {
    if (Math.log2) return Math.log2(x);
    var v = Math.log(x) * Math.LOG2E;
    var rounded = Math.round(v);
    if (Math.abs(rounded - v) < 1E-14) return rounded;
    return v;
}
function maptalks_es_interpolate(a, b, t) {
    return a * (1 - t) + b * t;
}
function wrap(n, min, max) {
    if (n === max || n === min) return n;
    var d = max - min;
    var w = ((n - min) % d + d) % d + min;
    return w;
}
function clamp(n, min, max) {
    return Math.min(max, Math.max(min, n));
}
function isArrayHasData(obj) {
    return Array.isArray(obj) && obj.length > 0;
}
var urlPattern = /^([a-z][a-z\d+\-.]*:)?\/\//i;
function isURL(url) {
    return urlPattern.test(url);
}
var cssUrlReWithQuote = /^url\((['"])(.+)\1\)$/i;
var cssUrlRe = /^url\(([^'"].*[^'"])\)$/i;
function isCssUrl(str) {
    if (!isString(str)) return 0;
    if (cssUrlRe.test(str)) return 1;
    if (cssUrlReWithQuote.test(str)) return 2;
    return 3;
}
function extractCssUrl(str) {
    var test = isCssUrl(str);
    var matches;
    if (3 === test) return str;
    if (1 === test) {
        matches = cssUrlRe.exec(str);
        return matches[1];
    }
    if (2 !== test) return str;
    else {
        matches = cssUrlReWithQuote.exec(str);
        return matches[2];
    }
}
var b64chrs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
function btoa(input) {
    if ('undefined' != typeof window && window.btoa) return window.btoa(input);
    var str = String(input);
    var output = '';
    for(var block, charCode, idx = 0, map = b64chrs; str.charAt(0 | idx) || (map = '=', idx % 1); output += map.charAt(63 & block >> 8 - idx % 1 * 8)){
        charCode = str.charCodeAt(idx += 3 / 4);
        if (charCode > 0xFF) throw new Error('\'btoa\' failed: The string to be encoded contains characters outside of the Latin1 range.');
        block = block << 8 | charCode;
    }
    return output;
}
function b64toBlob(b64Data, contentType) {
    var byteCharacters = atob(b64Data);
    var arraybuffer = new ArrayBuffer(byteCharacters.length);
    var view = new Uint8Array(arraybuffer);
    for(var i = 0; i < byteCharacters.length; i++)view[i] = 0xff & byteCharacters.charCodeAt(i);
    var blob = new Blob([
        arraybuffer
    ], {
        type: contentType
    });
    return blob;
}
function computeDegree(x0, y0, x1, y1) {
    var dx = x1 - x0;
    var dy = y1 - y0;
    return Math.atan2(dy, dx);
}
var emptyImageUrl = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
function equalMapView(obj1, obj2) {
    if (!obj1 && !obj2) return true;
    if (!obj1 || !obj2) return false;
    for(var p in obj1)if ('center' === p) {
        if (!obj2[p] || !approx(obj1[p][0], obj2[p][0]) || !approx(obj1[p][1], obj2[p][1])) return false;
    } else if (obj1[p] !== obj2[p]) return false;
    return true;
}
function approx(val, expected, delta) {
    if (null == delta) delta = 1e-6;
    return val >= expected - delta && val <= expected + delta;
}
function flash(interval, count, cb, context) {
    if (!interval) interval = 100;
    if (!count) count = 4;
    var me = this;
    count *= 2;
    if (this._flashTimeout) clearTimeout(this._flashTimeout);
    function flashGeo() {
        if (0 === count) {
            me.show();
            if (cb) {
                if (context) cb.call(context);
                else cb();
            }
            return;
        }
        if (count % 2 === 0) me.hide();
        else me.show();
        count--;
        me._flashTimeout = setTimeout(flashGeo, interval);
    }
    this._flashTimeout = setTimeout(flashGeo, interval);
    return this;
}
function _defaults(obj, defaults) {
    var keys = Object.getOwnPropertyNames(defaults);
    for(var i = 0; i < keys.length; i++){
        var key = keys[i];
        var value = Object.getOwnPropertyDescriptor(defaults, key);
        if (value && value.configurable && void 0 === obj[key]) Object.defineProperty(obj, key, value);
    }
    return obj;
}
var maptalks_es_types = [
    'Unknown',
    'Point',
    'LineString',
    'Polygon',
    'MultiPoint',
    'MultiLineString',
    'MultiPolygon',
    'GeometryCollection'
];
function createFilter(filter) {
    return new Function('f', "var p = (f && f.properties || {}); return " + compile(filter));
}
function compile(filter) {
    if (!filter) return 'true';
    var op = filter[0];
    if (filter.length <= 1) return 'any' === op ? 'false' : 'true';
    var str = '==' === op ? compileComparisonOp(filter[1], filter[2], '===', false) : '!=' === op ? compileComparisonOp(filter[1], filter[2], '!==', false) : '<' === op || '>' === op || '<=' === op || '>=' === op ? compileComparisonOp(filter[1], filter[2], op, true) : 'any' === op ? compileLogicalOp(filter.slice(1), '||') : 'all' === op ? compileLogicalOp(filter.slice(1), '&&') : 'none' === op ? compileNegation(compileLogicalOp(filter.slice(1), '||')) : 'in' === op ? compileInOp(filter[1], filter.slice(2)) : '!in' === op ? compileNegation(compileInOp(filter[1], filter.slice(2))) : 'has' === op ? compileHasOp(filter[1]) : '!has' === op ? compileNegation(compileHasOp(filter[1])) : 'true';
    return "(" + str + ")";
}
function compilePropertyReference(property) {
    return '$' === property[0] ? 'f.' + property.substring(1) : 'p[' + JSON.stringify(property) + ']';
}
function compileComparisonOp(property, value, op, checkType) {
    var left = compilePropertyReference(property);
    var right = '$type' === property ? maptalks_es_types.indexOf(value) : JSON.stringify(value);
    return (checkType ? "typeof " + left + "=== typeof " + right + "&&" : '') + left + op + right;
}
function compileLogicalOp(expressions, op) {
    return expressions.map(compile).join(op);
}
function compileInOp(property, values) {
    if ('$type' === property) values = values.map(function(value) {
        return maptalks_es_types.indexOf(value);
    });
    var left = JSON.stringify(values.sort(compare));
    var right = compilePropertyReference(property);
    if (values.length <= 200) return left + ".indexOf(" + right + ") !== -1";
    return "function(v, a, i, j) {\n        while (i <= j) { var m = (i + j) >> 1;\n            if (a[m] === v) return true; if (a[m] > v) j = m - 1; else i = m + 1;\n        }\n    return false; }(" + right + ", " + left + ",0," + (values.length - 1) + ")";
}
function compileHasOp(property) {
    return '$id' === property ? '"id" in f' : JSON.stringify(property) + " in p";
}
function compileNegation(expression) {
    return "!(" + expression + ")";
}
function compare(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
}
function getFilterFeature(geometry) {
    var json = geometry._toJSON(), g = json['feature'];
    g['type'] = maptalks_es_types.indexOf(g['geometry']['type']);
    g['subType'] = json['subType'];
    return g;
}
function compileStyle(styles) {
    if (!Array.isArray(styles)) return compileStyle([
        styles
    ]);
    var compiled = [];
    for(var i = 0; i < styles.length; i++){
        var filter = void 0;
        filter = true === styles[i]['filter'] ? function() {
            return true;
        } : createFilter(styles[i]['filter']);
        compiled.push(extend$1({}, styles[i], {
            filter: filter
        }));
    }
    return compiled;
}
function extend$1(dest) {
    for(var i = 1; i < arguments.length; i++){
        var src = arguments[i];
        for(var k in src)dest[k] = src[k];
    }
    return dest;
}
function createFunction(parameters, defaultType) {
    var fun;
    var isFeatureConstant, isZoomConstant;
    if (isFunctionDefinition(parameters)) {
        var zoomAndFeatureDependent = parameters.stops && 'object' == typeof parameters.stops[0][0];
        var featureDependent = zoomAndFeatureDependent || void 0 !== parameters.property;
        var zoomDependent = zoomAndFeatureDependent || !featureDependent;
        var type = parameters.type || defaultType || 'exponential';
        var innerFun;
        if ('exponential' === type) innerFun = evaluateExponentialFunction;
        else if ('interval' === type) innerFun = evaluateIntervalFunction;
        else if ('categorical' === type) innerFun = evaluateCategoricalFunction;
        else if ('identity' === type) innerFun = evaluateIdentityFunction;
        else throw new Error('Unknown function type "' + type + '"');
        if (zoomAndFeatureDependent) {
            var featureFunctions = {};
            var featureFunctionStops = [];
            for(var s = 0; s < parameters.stops.length; s++){
                var stop = parameters.stops[s];
                if (void 0 === featureFunctions[stop[0].zoom]) featureFunctions[stop[0].zoom] = {
                    zoom: stop[0].zoom,
                    type: parameters.type,
                    property: parameters.property,
                    default: parameters.default,
                    stops: []
                };
                featureFunctions[stop[0].zoom].stops.push([
                    stop[0].value,
                    stop[1]
                ]);
            }
            for(var z in featureFunctions)featureFunctionStops.push([
                featureFunctions[z].zoom,
                createFunction(featureFunctions[z])
            ]);
            fun = function(zoom, feature) {
                var value = evaluateExponentialFunction({
                    stops: featureFunctionStops,
                    base: parameters.base
                }, zoom)(zoom, feature);
                return 'function' == typeof value ? value(zoom, feature) : value;
            };
            isFeatureConstant = false;
            isZoomConstant = false;
        } else if (zoomDependent) {
            fun = function(zoom) {
                var value = innerFun(parameters, zoom);
                return 'function' == typeof value ? value(zoom) : value;
            };
            isFeatureConstant = true;
            isZoomConstant = false;
        } else {
            fun = function(zoom, feature) {
                var value = innerFun(parameters, feature ? feature[parameters.property] : null);
                return 'function' == typeof value ? value(zoom, feature) : value;
            };
            isFeatureConstant = false;
            isZoomConstant = true;
        }
    } else {
        fun = function() {
            return parameters;
        };
        isFeatureConstant = true;
        isZoomConstant = true;
    }
    fun.isZoomConstant = isZoomConstant;
    fun.isFeatureConstant = isFeatureConstant;
    return fun;
}
function coalesce(a, b, c) {
    if (void 0 !== a) return a;
    if (void 0 !== b) return b;
    if (void 0 !== c) return c;
    return null;
}
function evaluateCategoricalFunction(parameters, input) {
    for(var i = 0; i < parameters.stops.length; i++)if (input === parameters.stops[i][0]) return parameters.stops[i][1];
    return parameters.default;
}
function evaluateIntervalFunction(parameters, input) {
    for(var i = 0; i < parameters.stops.length && !(input < parameters.stops[i][0]); i++);
    return parameters.stops[Math.max(i - 1, 0)][1];
}
function evaluateExponentialFunction(parameters, input) {
    var base = void 0 !== parameters.base ? parameters.base : 1;
    var i = 0;
    while(true){
        if (i >= parameters.stops.length) break;
        if (input <= parameters.stops[i][0]) break;
        else i++;
    }
    if (0 === i) return parameters.stops[i][1];
    if (i === parameters.stops.length) return parameters.stops[i - 1][1];
    return interpolate$1(input, base, parameters.stops[i - 1][0], parameters.stops[i][0], parameters.stops[i - 1][1], parameters.stops[i][1]);
}
function evaluateIdentityFunction(parameters, input) {
    return coalesce(input, parameters.default);
}
function interpolate$1(input, base, inputLower, inputUpper, outputLower, outputUpper) {
    if ('function' == typeof outputLower) return function() {
        var evaluatedLower = outputLower.apply(void 0, arguments);
        var evaluatedUpper = outputUpper.apply(void 0, arguments);
        return interpolate$1(input, base, inputLower, inputUpper, evaluatedLower, evaluatedUpper);
    };
    if (outputLower.length) return interpolateArray(input, base, inputLower, inputUpper, outputLower, outputUpper);
    return interpolateNumber(input, base, inputLower, inputUpper, outputLower, outputUpper);
}
function interpolateNumber(input, base, inputLower, inputUpper, outputLower, outputUpper) {
    var difference = inputUpper - inputLower;
    var progress = input - inputLower;
    var ratio;
    ratio = 1 === base ? progress / difference : (Math.pow(base, progress) - 1) / (Math.pow(base, difference) - 1);
    return outputLower * (1 - ratio) + outputUpper * ratio;
}
function interpolateArray(input, base, inputLower, inputUpper, outputLower, outputUpper) {
    var output = [];
    for(var i = 0; i < outputLower.length; i++)output[i] = interpolateNumber(input, base, inputLower, inputUpper, outputLower[i], outputUpper[i]);
    return output;
}
function isFunctionDefinition(obj) {
    return obj && 'object' == typeof obj && (obj.stops || obj.property && 'identity' === obj.type);
}
function hasFunctionDefinition(obj) {
    for(var p in obj)if (isFunctionDefinition(obj[p])) return true;
    return false;
}
function interpolated(parameters) {
    return createFunction1(parameters, 'exponential');
}
function loadFunctionTypes(obj, argFn) {
    if (!obj) return null;
    var hit = false;
    if (Array.isArray(obj)) {
        var multResult = [], loaded;
        for(var i = 0; i < obj.length; i++){
            loaded = loadFunctionTypes(obj[i], argFn);
            if (loaded) {
                multResult.push(loaded);
                hit = true;
            } else multResult.push(obj[i]);
        }
        return hit ? multResult : obj;
    }
    var result = {
        __fn_types_loaded: true
    }, props = [], p;
    for(p in obj)if (obj.hasOwnProperty(p)) props.push(p);
    var buildFn = function(p) {
        Object.defineProperty(result, p, {
            get: function() {
                if (!this['__fn_' + p]) this['__fn_' + p] = interpolated(this['_' + p]);
                return this['__fn_' + p].apply(this, argFn());
            },
            set: function(v) {
                this['_' + p] = v;
            },
            configurable: true,
            enumerable: true
        });
    };
    for(var _i = 0, len = props.length; _i < len; _i++){
        p = props[_i];
        if (isFunctionDefinition(obj[p])) {
            hit = true;
            result['_' + p] = obj[p];
            buildFn(p);
        } else result[p] = obj[p];
    }
    return hit ? result : obj;
}
function getFunctionTypeResources(t) {
    if (!t || !t.stops) return [];
    var res = [];
    for(var i = 0, l = t.stops.length; i < l; i++)res.push(t.stops[i][1]);
    return res;
}
function createFunction1(parameters, defaultType) {
    if (!isFunctionDefinition(parameters)) return function() {
        return parameters;
    };
    parameters = JSON.parse(JSON.stringify(parameters));
    var isZoomConstant = true;
    var isFeatureConstant = true;
    var stops = parameters.stops;
    if (stops) {
        for(var i = 0; i < stops.length; i++)if (isFunctionDefinition(stops[i][1])) {
            var _fn = createFunction1(stops[i][1], defaultType);
            isZoomConstant = isZoomConstant && _fn.isZoomConstant;
            isFeatureConstant = isFeatureConstant && _fn.isFeatureConstant;
            stops[i] = [
                stops[i][0],
                _fn
            ];
        }
    }
    var fn = createFunction(parameters, defaultType);
    fn.isZoomConstant = isZoomConstant && fn.isZoomConstant;
    fn.isFeatureConstant = isFeatureConstant && fn.isFeatureConstant;
    return fn;
}
function translateToSVGStyles(s) {
    var result = {
        stroke: {
            stroke: s['markerLineColor'],
            'stroke-width': s['markerLineWidth'],
            'stroke-opacity': s['markerLineOpacity'],
            'stroke-dasharray': null,
            'stroke-linecap': 'butt',
            'stroke-linejoin': 'round'
        },
        fill: {
            fill: s['markerFill'],
            'fill-opacity': s['markerFillOpacity']
        }
    };
    if (0 === result['stroke']['stroke-width']) result['stroke']['stroke-opacity'] = 0;
    return result;
}
function getMarkerPathBase64(symbol, width, height) {
    if (!symbol['markerPath']) return null;
    var op = 1;
    var styles = translateToSVGStyles(symbol);
    if (isNumber(symbol['markerOpacity'])) op = symbol['markerOpacity'];
    if (isNumber(symbol['opacity'])) op *= symbol['opacity'];
    var svgStyles = {};
    if (styles) {
        for(var p in styles['stroke'])if (styles['stroke'].hasOwnProperty(p)) {
            if (!isNil(styles['stroke'][p])) svgStyles[p] = styles['stroke'][p];
        }
        for(var _p in styles['fill'])if (styles['fill'].hasOwnProperty(_p)) {
            if (!isNil(styles['fill'][_p])) svgStyles[_p] = styles['fill'][_p];
        }
    }
    var pathes = Array.isArray(symbol['markerPath']) ? symbol['markerPath'] : [
        symbol['markerPath']
    ];
    var path;
    var pathesToRender = [];
    for(var i = 0; i < pathes.length; i++){
        path = isString(pathes[i]) ? {
            path: pathes[i]
        } : pathes[i];
        path = extend({}, path, svgStyles);
        path['d'] = path['path'];
        delete path['path'];
        pathesToRender.push(path);
    }
    var svg = [
        '<svg version="1.1"',
        'xmlns="http://www.w3.org/2000/svg"'
    ];
    if (op < 1) svg.push('opacity="' + op + '"');
    if (symbol['markerPathWidth'] && symbol['markerPathHeight']) svg.push('viewBox="0 0 ' + symbol['markerPathWidth'] + ' ' + symbol['markerPathHeight'] + '"');
    svg.push('preserveAspectRatio="none"');
    if (width) svg.push('width="' + width + '"');
    if (height) svg.push('height="' + height + '"');
    svg.push('><defs></defs>');
    for(var _i = 0; _i < pathesToRender.length; _i++){
        var strPath = '<path ';
        for(var _p2 in pathesToRender[_i])if (pathesToRender[_i].hasOwnProperty(_p2)) strPath += ' ' + _p2 + '="' + pathesToRender[_i][_p2] + '"';
        strPath += '></path>';
        svg.push(strPath);
    }
    svg.push('</svg>');
    var b64 = 'data:image/svg+xml;base64,' + btoa(svg.join(' '));
    return b64;
}
function getExternalResources(symbol, toAbsolute) {
    if (!symbol) return [];
    var symbols = symbol;
    if (!Array.isArray(symbol)) symbols = [
        symbol
    ];
    var resources = [];
    var props = RESOURCE_PROPERTIES;
    var res, resSizeProp;
    var w, h;
    for(var i = symbols.length - 1; i >= 0; i--){
        symbol = symbols[i];
        if (!!symbol) {
            if (toAbsolute) symbol = convertResourceUrl(symbol);
            for(var ii = 0; ii < props.length; ii++){
                res = symbol[props[ii]];
                if (isFunctionDefinition(res)) res = getFunctionTypeResources(res);
                if (!!res) {
                    if (!Array.isArray(res)) res = [
                        res
                    ];
                    for(var iii = 0; iii < res.length; iii++){
                        if ('url(' === res[iii].slice(0, 4)) res[iii] = extractCssUrl(res[iii]);
                        resSizeProp = RESOURCE_SIZE_PROPERTIES[ii];
                        resources.push([
                            res[iii],
                            symbol[resSizeProp[0]],
                            symbol[resSizeProp[1]]
                        ]);
                    }
                }
            }
            if ('path' === symbol['markerType'] && symbol['markerPath']) {
                w = isFunctionDefinition(symbol['markerWidth']) ? 200 : symbol['markerWidth'];
                h = isFunctionDefinition(symbol['markerHeight']) ? 200 : symbol['markerHeight'];
                if (isFunctionDefinition(symbol['markerPath'])) {
                    res = getFunctionTypeResources(symbol['markerPath']);
                    var path = symbol['markerPath'];
                    for(var _iii = 0; _iii < res.length; _iii++){
                        symbol['markerPath'] = res[_iii];
                        resources.push([
                            getMarkerPathBase64(symbol),
                            w,
                            h
                        ]);
                    }
                    symbol['markerPath'] = path;
                } else resources.push([
                    getMarkerPathBase64(symbol),
                    w,
                    h
                ]);
            }
        }
    }
    return resources;
}
function convertResourceUrl(symbol) {
    if (!symbol) return null;
    var s = symbol;
    if (IS_NODE) return s;
    var props = RESOURCE_PROPERTIES;
    var res;
    for(var ii = 0, len = props.length; ii < len; ii++){
        res = s[props[ii]];
        if (!!res) s[props[ii]] = _convertUrl(res);
    }
    return s;
}
function _convertUrl(res) {
    if (isFunctionDefinition(res)) {
        var stops = res.stops;
        for(var i = 0; i < stops.length; i++)stops[i][1] = _convertUrl(stops[i][1]);
        return res;
    }
    if ('url(' === res.slice(0, 4)) res = extractCssUrl(res);
    return res;
}
function isGradient(g) {
    return g && g['colorStops'];
}
function getGradientStamp(g) {
    var keys = [
        g['type']
    ];
    if (g['places']) keys.push(g['places'].join());
    if (g['colorStops']) {
        var stops = [];
        for(var i = g['colorStops'].length - 1; i >= 0; i--)stops.push(g['colorStops'][i].join());
        keys.push(stops.join(','));
    }
    return keys.join('_');
}
function getSymbolStamp(symbol) {
    var keys = [];
    if (Array.isArray(symbol)) {
        for(var i = 0; i < symbol.length; i++)keys.push(getSymbolStamp(symbol[i]));
        return '[ ' + keys.join(' , ') + ' ]';
    }
    for(var p in symbol)if (hasOwn(symbol, p)) {
        if (!isFunction(symbol[p])) {
            if (isGradient(symbol[p])) keys.push(p + '=' + getGradientStamp(symbol[p]));
            else keys.push(p + '=' + symbol[p]);
        }
    }
    return keys.join(';');
}
function lowerSymbolOpacity(symbol, ratio) {
    function s(_symbol, _ratio) {
        var op = _symbol['opacity'];
        if (isNil(op)) _symbol['opacity'] = _ratio;
        else _symbol['opacity'] *= _ratio;
    }
    var lower;
    if (Array.isArray(symbol)) {
        lower = [];
        for(var i = 0; i < symbol.length; i++){
            var d = extend({}, symbol[i]);
            s(d, ratio);
            lower.push(d);
        }
    } else {
        lower = extend({}, symbol);
        s(lower, ratio);
    }
    return lower;
}
function extendSymbol(symbol) {
    var sources = Array.prototype.slice.call(arguments, 1);
    if (!sources || !sources.length) sources = [
        {}
    ];
    if (Array.isArray(symbol)) {
        var s, dest;
        var result = [];
        for(var i = 0, l = symbol.length; i < l; i++){
            s = symbol[i];
            dest = {};
            for(var ii = 0, ll = sources.length; ii < ll; ii++)if (Array.isArray(sources[ii])) isNil(sources[ii][i]) ? extend(dest, s ? s : {}) : extend(dest, s, sources[ii][i]);
            else extend(dest, s, sources[ii] ? sources[ii] : {});
            result.push(dest);
        }
        return result;
    }
    var args = [
        {},
        symbol
    ];
    args.push.apply(args, sources);
    return extend.apply(this, args);
}
function parseStyleRootPath(style) {
    if (style.symbol) style = [
        style
    ];
    if (Array.isArray(style)) return style;
    var root = style['$root'];
    var iconset = style['$iconset'];
    style = style.style;
    if (root || iconset) {
        if (root && '/' === root[root.length - 1]) root = root.substring(0, root.length - 1);
        if (iconset && '/' === iconset[iconset.length - 1]) iconset = iconset.substring(0, iconset.length - 1);
        var replacer = function(match) {
            if ('{$root}' === match) return root;
            if ('{$iconset}' === match) return iconset;
            return null;
        };
        style = convertStylePath(style, replacer);
    }
    return style;
}
function convertStylePath(styles, replacer) {
    for(var i = 0; i < styles.length; i++){
        var symbol = styles[i].symbol;
        if (symbol) parseSymbolPath(symbol, replacer);
    }
}
var URL_PATTERN = /(\{\$root\}|\{\$iconset\})/g;
function parseSymbolPath(symbol, replacer) {
    for(var p in symbol)if (symbol.hasOwnProperty(p) && 'textName' !== p) {
        if (isString(symbol[p]) && symbol[p].length > 2) symbol[p] = symbol[p].replace(URL_PATTERN, replacer);
        else if (isFunctionDefinition(symbol[p])) symbol[p] = parseStops(symbol[p], replacer);
        else if (isObject(symbol[p])) parseSymbolPath(symbol[p], replacer);
    }
}
function parseStops(value, replacer) {
    var defaultValue = value['default'];
    if (isString(defaultValue)) value['default'] = defaultValue.replace(URL_PATTERN, replacer);
    var stops = value.stops;
    for(var i = 0; i < stops.length; i++){
        if (!!Array.isArray(stops[i])) {
            if (isString(stops[i][1])) stops[i][1] = stops[i][1].replace(URL_PATTERN, replacer);
            else if (isFunctionDefinition(stops[i][1])) stops[i][1] = parseStops(stops[i][1], replacer);
        }
    }
    return value;
}
var index$1 = /*#__PURE__*/ Object.freeze({
    now: now,
    extend: extend,
    isNil: isNil,
    isNumber: isNumber,
    isInteger: isInteger,
    isObject: isObject,
    isString: isString,
    isFunction: isFunction,
    hasOwn: hasOwn,
    join: join,
    isEmpty: isEmpty,
    toRadian: toRadian,
    toDegree: toDegree,
    IS_NODE: IS_NODE,
    get requestAnimFrame () {
        return maptalks_es_requestAnimFrame;
    },
    get cancelAnimFrame () {
        return maptalks_es_cancelAnimFrame;
    },
    isSVG: isSVG,
    loadImage: loadImage,
    UID: UID,
    GUID: GUID,
    parseJSON: parseJSON,
    pushIn: pushIn,
    removeFromArray: removeFromArray,
    forEachCoord: forEachCoord,
    getValueOrDefault: getValueOrDefault,
    sign: sign,
    log2: log2,
    interpolate: maptalks_es_interpolate,
    wrap: wrap,
    clamp: clamp,
    isArrayHasData: isArrayHasData,
    isURL: isURL,
    isCssUrl: isCssUrl,
    extractCssUrl: extractCssUrl,
    btoa: btoa,
    b64toBlob: b64toBlob,
    computeDegree: computeDegree,
    emptyImageUrl: emptyImageUrl,
    equalMapView: equalMapView,
    flash: flash,
    _defaults: _defaults,
    translateToSVGStyles: translateToSVGStyles,
    getMarkerPathBase64: getMarkerPathBase64,
    getExternalResources: getExternalResources,
    convertResourceUrl: convertResourceUrl,
    isGradient: isGradient,
    getGradientStamp: getGradientStamp,
    getSymbolStamp: getSymbolStamp,
    lowerSymbolOpacity: lowerSymbolOpacity,
    extendSymbol: extendSymbol,
    parseStyleRootPath: parseStyleRootPath,
    convertStylePath: convertStylePath
});
var Browser = {};
if (!IS_NODE) {
    var ua = navigator.userAgent.toLowerCase(), doc = document.documentElement, ie = 'ActiveXObject' in window, webkit = -1 !== ua.indexOf('webkit'), phantomjs = -1 !== ua.indexOf('phantom'), android23 = -1 !== ua.search('android [23]'), chrome = -1 !== ua.indexOf('chrome'), gecko = -1 !== ua.indexOf('gecko') && !webkit && !window.opera && !ie, mobile = 'undefined' != typeof orientation || -1 !== ua.indexOf('mobile'), msPointer = !window.PointerEvent && window.MSPointerEvent, maptalks_es_pointer = window.PointerEvent && navigator.pointerEnabled || msPointer, ie3d = ie && 'transition' in doc.style, webkit3d = 'WebKitCSSMatrix' in window && 'm11' in new window.WebKitCSSMatrix() && !android23, gecko3d = 'MozPerspective' in doc.style, opera12 = 'OTransition' in doc.style, any3d = (ie3d || webkit3d || gecko3d) && !opera12 && !phantomjs;
    var chromeVersion = 0;
    if (chrome) chromeVersion = ua.match(/chrome\/([\d.]+)/)[1];
    var touch = !phantomjs && (maptalks_es_pointer || 'ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch);
    var webgl;
    try {
        var maptalks_es_canvas = document.createElement('canvas');
        var maptalks_es_gl = maptalks_es_canvas.getContext('webgl') || maptalks_es_canvas.getContext('experimental-webgl');
        webgl = maptalks_es_gl && maptalks_es_gl instanceof WebGLRenderingContext;
    } catch (err) {
        webgl = false;
    }
    var devicePixelRatio = window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI;
    Browser = {
        ie: ie,
        ielt9: ie && !document.addEventListener,
        edge: 'msLaunchUri' in navigator && !('documentMode' in document),
        webkit: webkit,
        gecko: gecko,
        android: -1 !== ua.indexOf('android'),
        android23: android23,
        chrome: chrome,
        chromeVersion: chromeVersion,
        safari: !chrome && -1 !== ua.indexOf('safari'),
        phantomjs: phantomjs,
        ie3d: ie3d,
        webkit3d: webkit3d,
        gecko3d: gecko3d,
        opera12: opera12,
        any3d: any3d,
        mobile: mobile,
        mobileWebkit: mobile && webkit,
        mobileWebkit3d: mobile && webkit3d,
        mobileOpera: mobile && window.opera,
        mobileGecko: mobile && gecko,
        touch: !!touch,
        msPointer: !!msPointer,
        pointer: !!maptalks_es_pointer,
        retina: devicePixelRatio > 1,
        devicePixelRatio: devicePixelRatio,
        language: navigator.browserLanguage ? navigator.browserLanguage : navigator.language,
        ie9: ie && 9 === document.documentMode,
        ie10: ie && 10 === document.documentMode,
        webgl: webgl
    };
}
var Browser$1 = Browser;
function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
}
function _assertThisInitialized(self1) {
    if (void 0 === self1) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return self1;
}
var maptalks_es_Position = function() {
    function Position(x, y) {
        if (isNil(x) || isNil(y)) {
            if (isNil(x.x) || isNil(x.y)) {
                if (Array.isArray(x)) {
                    this.x = +x[0];
                    this.y = +x[1];
                }
            } else {
                this.x = +x.x;
                this.y = +x.y;
            }
        } else {
            this.x = +x;
            this.y = +y;
        }
        if (this._isNaN()) throw new Error('Position is NaN');
    }
    var _proto = Position.prototype;
    _proto.set = function(x, y) {
        this.x = x;
        this.y = y;
        return this;
    };
    _proto.abs = function() {
        return new this.constructor(Math.abs(this.x), Math.abs(this.y));
    };
    _proto._abs = function() {
        this.x = Math.abs(this.x);
        this.y = Math.abs(this.y);
        return this;
    };
    _proto._round = function() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this;
    };
    _proto.round = function() {
        return new this.constructor(Math.round(this.x), Math.round(this.y));
    };
    _proto._ceil = function() {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this;
    };
    _proto.ceil = function() {
        return new this.constructor(Math.ceil(this.x), Math.ceil(this.y));
    };
    _proto.distanceTo = function(point) {
        var x = point.x - this.x, y = point.y - this.y;
        return Math.sqrt(x * x + y * y);
    };
    _proto._floor = function() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this;
    };
    _proto.floor = function() {
        return new this.constructor(Math.floor(this.x), Math.floor(this.y));
    };
    _proto.copy = function() {
        return new this.constructor(this.x, this.y);
    };
    _proto._add = function(x, y) {
        if (isNil(x.x)) {
            if (isNil(x[0])) {
                this.x += x;
                this.y += y;
            } else {
                this.x += x[0];
                this.y += x[1];
            }
        } else {
            this.x += x.x;
            this.y += x.y;
        }
        return this;
    };
    _proto.add = function(x, y) {
        var nx, ny;
        if (isNil(x.x)) {
            if (isNil(x[0])) {
                nx = this.x + x;
                ny = this.y + y;
            } else {
                nx = this.x + x[0];
                ny = this.y + x[1];
            }
        } else {
            nx = this.x + x.x;
            ny = this.y + x.y;
        }
        return new this.constructor(nx, ny);
    };
    _proto._sub = function(x, y) {
        if (isNil(x.x)) {
            if (isNil(x[0])) {
                this.x -= x;
                this.y -= y;
            } else {
                this.x -= x[0];
                this.y -= x[1];
            }
        } else {
            this.x -= x.x;
            this.y -= x.y;
        }
        return this;
    };
    _proto._substract = function() {
        return this._sub.apply(this, arguments);
    };
    _proto.sub = function(x, y) {
        var nx, ny;
        if (isNil(x.x)) {
            if (isNil(x[0])) {
                nx = this.x - x;
                ny = this.y - y;
            } else {
                nx = this.x - x[0];
                ny = this.y - x[1];
            }
        } else {
            nx = this.x - x.x;
            ny = this.y - x.y;
        }
        return new this.constructor(nx, ny);
    };
    _proto.substract = function() {
        return this.sub.apply(this, arguments);
    };
    _proto.multi = function(ratio) {
        return new this.constructor(this.x * ratio, this.y * ratio);
    };
    _proto._multi = function(ratio) {
        this.x *= ratio;
        this.y *= ratio;
        return this;
    };
    _proto.div = function(n) {
        return this.multi(1 / n);
    };
    _proto._div = function(n) {
        return this._multi(1 / n);
    };
    _proto.equals = function(c) {
        if (!(c instanceof this.constructor)) return false;
        return this.x === c.x && this.y === c.y;
    };
    _proto._isNaN = function() {
        return isNaN(this.x) || isNaN(this.y);
    };
    _proto.isZero = function() {
        return 0 === this.x && 0 === this.y;
    };
    _proto.toArray = function() {
        return [
            this.x,
            this.y
        ];
    };
    _proto.toFixed = function(n) {
        return new this.constructor(this.x.toFixed(n), this.y.toFixed(n));
    };
    _proto.toJSON = function() {
        return {
            x: this.x,
            y: this.y
        };
    };
    return Position;
}();
var maptalks_es_Point = function(_Position) {
    _inheritsLoose(Point, _Position);
    function Point() {
        return _Position.apply(this, arguments) || this;
    }
    var _proto = Point.prototype;
    _proto.closeTo = function(p, delta) {
        if (!delta) delta = 0;
        return this.x >= p.x - delta && this.x <= p.x + delta && this.y >= p.y - delta && this.y <= p.y + delta;
    };
    _proto.mag = function() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };
    _proto.unit = function() {
        return this.copy()._unit();
    };
    _proto._unit = function() {
        this._div(this.mag());
        return this;
    };
    _proto.perp = function() {
        return this.copy()._perp();
    };
    _proto._perp = function() {
        var y = this.y;
        this.y = this.x;
        this.x = -y;
        return this;
    };
    _proto.angleWith = function(b) {
        return this.angleWithSep(b.x, b.y);
    };
    _proto.angleWithSep = function(x, y) {
        return Math.atan2(this.x * y - this.y * x, this.x * x + this.y * y);
    };
    _proto._rotate = function(angle) {
        var cos = Math.cos(angle), sin = Math.sin(angle), x = cos * this.x - sin * this.y, y = sin * this.x + cos * this.y;
        this.x = x;
        this.y = y;
        return this;
    };
    _proto.rotate = function(a) {
        return this.copy()._rotate(a);
    };
    return Point;
}(maptalks_es_Position);
var maptalks_es_Size = function() {
    function Size(width, height) {
        if (isNumber(width) && isNumber(height)) {
            this.width = width;
            this.height = height;
        } else if (isNumber(width['width'])) {
            this.width = width.width;
            this.height = width.height;
        } else if (Array.isArray(width)) {
            this.width = width[0];
            this.height = width[1];
        }
    }
    var _proto = Size.prototype;
    _proto.copy = function() {
        return new Size(this['width'], this['height']);
    };
    _proto.add = function(x, y) {
        var w, h;
        if (x instanceof Size) {
            w = this.width + x.width;
            h = this.height + x.height;
        } else {
            w = this.width + x;
            h = this.height + y;
        }
        return new Size(w, h);
    };
    _proto.equals = function(size) {
        return this['width'] === size['width'] && this['height'] === size['height'];
    };
    _proto.multi = function(ratio) {
        return new Size(this['width'] * ratio, this['height'] * ratio);
    };
    _proto._multi = function(ratio) {
        this['width'] *= ratio;
        this['height'] *= ratio;
        return this;
    };
    _proto._round = function() {
        this['width'] = Math.round(this['width']);
        this['height'] = Math.round(this['height']);
        return this;
    };
    _proto.toPoint = function() {
        return new maptalks_es_Point(this['width'], this['height']);
    };
    _proto.toArray = function() {
        return [
            this['width'],
            this['height']
        ];
    };
    _proto.toJSON = function() {
        return {
            width: this['width'],
            height: this['height']
        };
    };
    return Size;
}();
function trim(str) {
    return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
}
var specialPattern = /[\b\t\r\v\f]/igm;
function escapeSpecialChars(str) {
    if (!isString(str)) return str;
    return str.replace(specialPattern, '');
}
function splitWords(chr) {
    return trim(chr).split(/\s+/);
}
var rulerCtx = 'undefined' != typeof document ? document.createElement('canvas').getContext('2d') : null;
function stringWidth(text, font) {
    if (stringWidth.node) return stringWidth.node(text, font);
    rulerCtx.font = font;
    return rulerCtx.measureText(text).width;
}
function stringLength(text, font, size) {
    var w = stringWidth(text, font);
    return new maptalks_es_Size(w, size || DEFAULT_TEXT_SIZE);
}
function splitContent(content, font, wrapWidth, textWidth) {
    if (!content || 0 === content.length) return [
        {
            text: '',
            width: 0
        }
    ];
    var width = isNil(textWidth) ? stringWidth(content, font) : textWidth;
    var chrWidth = width / content.length, minChrCount = Math.floor(wrapWidth / chrWidth / 2);
    if (chrWidth >= wrapWidth || minChrCount <= 0) return [
        {
            text: '',
            width: wrapWidth
        }
    ];
    if (width <= wrapWidth) return [
        {
            text: content,
            width: width
        }
    ];
    var result = [];
    var testStr = content.substring(0, minChrCount), prew = chrWidth * minChrCount;
    for(var i = minChrCount, l = content.length; i < l; i++){
        var chr = content[i];
        var w = stringWidth(testStr + chr);
        if (w >= wrapWidth) {
            result.push({
                text: testStr,
                width: prew
            });
            testStr = content.substring(i, minChrCount + i);
            i += minChrCount - 1;
            prew = chrWidth * minChrCount;
        } else {
            testStr += chr;
            prew = w;
        }
        if (i >= l - 1) {
            prew = stringWidth(testStr);
            result.push({
                text: testStr,
                width: prew
            });
        }
    }
    return result;
}
var contentExpRe = /\{([\w_]+)\}/g;
function replaceVariable(str, props) {
    if (!isString(str)) return str;
    return str.replace(contentExpRe, function(str, key) {
        if (!props) return '';
        var value = props[key];
        if (isNil(value)) return '';
        if (Array.isArray(value)) return value.join();
        return value;
    });
}
function getAlignPoint(size, horizontalAlignment, verticalAlignment) {
    var width = size['width'], height = size['height'];
    var alignW, alignH;
    alignW = 'left' === horizontalAlignment ? -width : 'right' === horizontalAlignment ? 0 : -width / 2;
    alignH = 'top' === verticalAlignment ? -height : 'bottom' === verticalAlignment ? 0 : -height / 2;
    return new maptalks_es_Point(alignW, alignH);
}
var DEFAULT_FONT = 'monospace';
function getFont(style) {
    if (style['textFont']) return style['textFont'];
    return (style['textStyle'] && 'normal' !== style['textStyle'] ? style['textStyle'] + ' ' : '') + (style['textWeight'] && 'normal' !== style['textWeight'] ? style['textWeight'] + ' ' : '') + style['textSize'] + 'px ' + (style['textFaceName'] ? '"' === style['textFaceName'][0] ? style['textFaceName'] : '"' + style['textFaceName'] + '"' : DEFAULT_FONT);
}
function splitTextToRow(text, style) {
    var font = getFont(style), lineSpacing = style['textLineSpacing'] || 0, size = stringLength(text, font, style['textSize']), textWidth = size['width'], textHeight = size['height'], wrapChar = style['textWrapCharacter'], textRows = [];
    var wrapWidth = style['textWrapWidth'];
    if (!wrapWidth || wrapWidth > textWidth) wrapWidth = textWidth;
    if (!isString(text)) text += '';
    var actualWidth = 0;
    if (wrapChar && text.indexOf(wrapChar) >= 0) {
        var texts = text.split(wrapChar);
        for(var i = 0, l = texts.length; i < l; i++){
            var t = texts[i];
            var tWidth = stringWidth(t, font);
            if (tWidth > wrapWidth) {
                var contents = splitContent(t, font, wrapWidth, tWidth);
                for(var ii = 0, ll = contents.length; ii < ll; ii++){
                    var w = contents[ii].width;
                    if (w > actualWidth) actualWidth = w;
                    textRows.push({
                        text: contents[ii].text,
                        size: new maptalks_es_Size(w, textHeight)
                    });
                }
            } else {
                if (tWidth > actualWidth) actualWidth = tWidth;
                textRows.push({
                    text: t,
                    size: new maptalks_es_Size(tWidth, textHeight)
                });
            }
        }
    } else if (textWidth > wrapWidth) {
        var _contents = splitContent(text, font, wrapWidth, textWidth);
        for(var _i = 0; _i < _contents.length; _i++){
            var _w = _contents[_i].width;
            if (_w > actualWidth) actualWidth = _w;
            textRows.push({
                text: _contents[_i].text,
                size: new maptalks_es_Size(_w, textHeight)
            });
        }
    } else {
        if (textWidth > actualWidth) actualWidth = textWidth;
        textRows.push({
            text: text,
            size: size
        });
    }
    var rowNum = textRows.length;
    var textSize = new maptalks_es_Size(actualWidth, textHeight * rowNum + lineSpacing * (rowNum - 1));
    return {
        total: rowNum,
        size: textSize,
        rows: textRows,
        rawSize: size
    };
}
var maptalks_es_first = function(props) {
    return props[0];
};
var testProp = IS_NODE ? maptalks_es_first : function(props) {
    var style = document.documentElement.style;
    for(var i = 0; i < props.length; i++)if (props[i] in style) return props[i];
    return false;
};
var TRANSFORM = testProp([
    'transform',
    'WebkitTransform',
    'OTransform',
    'MozTransform',
    'msTransform'
]);
var TRANSFORMORIGIN = testProp([
    'transformOrigin',
    'WebkitTransformOrigin',
    'OTransformOrigin',
    'MozTransformOrigin',
    'msTransformOrigin'
]);
var TRANSITION = testProp([
    'transition',
    'WebkitTransition',
    'OTransition',
    'MozTransition',
    'msTransition'
]);
testProp([
    'filter',
    'WebkitFilter',
    'OFilter',
    'MozFilter',
    'msFilter'
]);
function createEl(tagName, className) {
    var el = document.createElement(tagName);
    if (className) setClass(el, className);
    return el;
}
function createElOn(tagName, style, container) {
    var el = createEl(tagName);
    if (style) maptalks_es_setStyle(el, style);
    if (container) container.appendChild(el);
    return el;
}
function removeDomNode(node) {
    if (!node) return this;
    if (Browser$1.ielt9 || Browser$1.ie9) {
        var d = createEl('div');
        d.appendChild(node);
        d.innerHTML = '';
        d = null;
    } else if (node.parentNode) node.parentNode.removeChild(node);
    return this;
}
function addDomEvent(obj, typeArr, handler, context) {
    if (!obj || !obj.addEventListener || !typeArr || !handler) return this;
    var eventHandler = function(e) {
        if (!e) e = window.event;
        handler.call(context || obj, e);
    };
    var types = typeArr.split(' ');
    for(var i = types.length - 1; i >= 0; i--){
        var type = types[i];
        if (!!type) {
            if (!obj['Z__' + type]) obj['Z__' + type] = [];
            var hit = listensDomEvent(obj, type, handler);
            if (hit >= 0) removeDomEvent(obj, type, handler);
            obj['Z__' + type].push({
                callback: eventHandler,
                src: handler
            });
            if (Browser$1.ie) obj.addEventListener(type, eventHandler, false);
            else obj.addEventListener(type, eventHandler, {
                capture: false,
                passive: false
            });
        }
    }
    return this;
}
function removeDomEvent(obj, typeArr, handler) {
    function doRemove(type, callback) {
        if ('mousewheel' === type && Browser$1.gecko) type = 'DOMMouseScroll';
        obj.removeEventListener(type, callback, false);
    }
    if (!obj || !obj.removeEventListener || !typeArr) return this;
    var types = typeArr.split(' ');
    for(var i = types.length - 1; i >= 0; i--){
        var type = types[i];
        if (!!type) {
            if (!handler && obj['Z__' + type]) {
                var handlers = obj['Z__' + type];
                for(var j = 0, jlen = handlers.length; j < jlen; j++)doRemove(handlers[j].callback);
                delete obj['Z__' + type];
                break;
            }
            var hit = listensDomEvent(obj, type, handler);
            if (hit < 0) break;
            var hitHandler = obj['Z__' + type][hit];
            doRemove(type, hitHandler.callback);
            obj['Z__' + type].splice(hit, 1);
        }
    }
    return this;
}
function listensDomEvent(obj, type, handler) {
    if (!obj || !obj['Z__' + type] || !handler) return -1;
    var handlers = obj['Z__' + type];
    for(var i = 0, len = handlers.length; i < len; i++)if (handlers[i].src === handler) return i;
    return -1;
}
function preventDefault(event) {
    if (event.preventDefault) event.preventDefault();
    else event.returnValue = false;
    return this;
}
function stopPropagation(e) {
    if (e.stopPropagation) e.stopPropagation();
    else e.cancelBubble = true;
    return this;
}
function preventSelection(dom) {
    dom.onselectstart = function() {
        return false;
    };
    dom.ondragstart = function() {
        return false;
    };
    dom.setAttribute('unselectable', 'on');
    return this;
}
function offsetDom(dom, offset) {
    if (!dom) return null;
    if (Browser$1.any3d) setTransform(dom, offset);
    else {
        dom.style.left = offset.x + 'px';
        dom.style.top = offset.y + 'px';
    }
    return offset;
}
function computeDomPosition(dom) {
    var style = window.getComputedStyle(dom);
    var padding = [
        parseInt(style['padding-left']),
        parseInt(style['padding-top'])
    ];
    var rect = dom.getBoundingClientRect();
    var offsetWidth = dom.offsetWidth, offsetHeight = dom.offsetHeight;
    var scaleX = offsetWidth ? rect.width / offsetWidth : 1, scaleY = offsetHeight ? rect.height / offsetHeight : 1;
    dom.__position = [
        rect.left + padding[0],
        rect.top + padding[1],
        scaleX,
        scaleY
    ];
    return dom.__position;
}
function getEventContainerPoint(ev, dom) {
    if (!ev) ev = window.event;
    var domPos = dom.__position;
    if (!domPos) domPos = computeDomPosition(dom);
    return new maptalks_es_Point((ev.clientX - domPos[0] - dom.clientLeft) / domPos[2], (ev.clientY - domPos[1] - dom.clientTop) / domPos[3]);
}
function endsWith(str, suffix) {
    var l = str.length - suffix.length;
    return l >= 0 && str.indexOf(suffix, l) === l;
}
function maptalks_es_setStyle(dom, strCss) {
    var cssText = dom.style.cssText;
    if (!endsWith(cssText, ';')) cssText += ';';
    dom.style.cssText = cssText + strCss;
    return this;
}
function hasClass(el, name) {
    if (void 0 !== el.classList) return el.classList.contains(name);
    var className = getClass(el);
    return className.length > 0 && new RegExp('(^|\\s)' + name + '(\\s|$)').test(className);
}
function addClass(el, name) {
    if (void 0 === el.classList || hasClass(el, name)) {
        var className = getClass(el);
        setClass(el, (className ? className + ' ' : '') + name);
    } else {
        var classes = splitWords(name);
        for(var i = 0, len = classes.length; i < len; i++)el.classList.add(classes[i]);
    }
    return this;
}
function setClass(el, name) {
    if (isNil(el.className.baseVal)) el.className = name;
    else el.className.baseVal = name;
    return this;
}
function getClass(el) {
    return isNil(el.className.baseVal) ? el.className : el.className.baseVal;
}
function setTransform(el, offset) {
    var pos = offset || new maptalks_es_Point(0, 0);
    el.style[TRANSFORM] = Browser$1.any3d ? 'translate3d(' + pos.x + 'px,' + pos.y + 'px,0px)' : 'translate(' + pos.x + 'px,' + pos.y + 'px)';
    return this;
}
function isHTML(str) {
    return /<[a-z\][\s\S]*>/i.test(str);
}
function measureDom(parentTag, dom) {
    var ruler = getDomRuler(parentTag);
    if (isString(dom)) ruler.innerHTML = dom;
    else ruler.appendChild(dom);
    var result = new maptalks_es_Size(ruler.clientWidth, ruler.clientHeight);
    removeDomNode(ruler);
    return result;
}
function getDomRuler(tag) {
    var span = document.createElement(tag);
    span.style.cssText = 'position:absolute;left:-10000px;top:-10000px;';
    document.body.appendChild(span);
    return span;
}
var on = addDomEvent;
var off = removeDomEvent;
var Ajax = {
    jsonp: function(url, callback) {
        var name = '_maptalks_jsonp_' + UID();
        if (url.match(/\?/)) url += '&callback=' + name;
        else url += '?callback=' + name;
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        window[name] = function(data) {
            callback(null, data);
            document.getElementsByTagName('head')[0].removeChild(script);
            script = null;
            delete window[name];
        };
        document.getElementsByTagName('head')[0].appendChild(script);
        return this;
    },
    get: function(url, options, cb) {
        if (isFunction(options)) {
            var t = cb;
            cb = options;
            options = t;
        }
        if (IS_NODE && Ajax.get.node) return Ajax.get.node(url, cb, options);
        var client = Ajax._getClient(cb);
        client.open('GET', url, true);
        if (options) {
            for(var k in options.headers)client.setRequestHeader(k, options.headers[k]);
            client.withCredentials = 'include' === options.credentials;
            if (options['responseType']) client.responseType = options['responseType'];
        }
        client.send(null);
        return client;
    },
    post: function(url, options, cb) {
        var postData;
        if (isString(url)) {
            if (isFunction(options)) {
                var _t = cb;
                cb = options;
                options = _t;
            }
            options = options || {};
            postData = options.postData;
        } else {
            var t = cb;
            postData = options;
            options = url;
            url = options.url;
            cb = t;
        }
        if (IS_NODE && Ajax.post.node) {
            options.url = url;
            return Ajax.post.node(options, postData, cb);
        }
        var client = Ajax._getClient(cb);
        client.open('POST', options.url, true);
        if (!options.headers) options.headers = {};
        if (!options.headers['Content-Type']) options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        if ('setRequestHeader' in client) {
            for(var p in options.headers)if (options.headers.hasOwnProperty(p)) client.setRequestHeader(p, options.headers[p]);
        }
        if (!isString(postData)) postData = JSON.stringify(postData);
        client.send(postData);
        return client;
    },
    _wrapCallback: function(client, cb) {
        return function() {
            if (4 === client.readyState) {
                if (200 === client.status) {
                    if ('arraybuffer' === client.responseType) {
                        var response = client.response;
                        0 === response.byteLength ? cb(new Error('http status 200 returned without content.')) : cb(null, {
                            data: client.response,
                            cacheControl: client.getResponseHeader('Cache-Control'),
                            expires: client.getResponseHeader('Expires'),
                            contentType: client.getResponseHeader('Content-Type')
                        });
                    } else cb(null, client.responseText);
                } else cb(new Error(client.statusText + ',' + client.status));
            }
        };
    },
    _getClient: function(cb) {
        var client;
        try {
            client = new XMLHttpRequest();
        } catch (e) {
            try {
                client = new ActiveXObject('Msxml2.XMLHTTP');
            } catch (e) {
                try {
                    client = new ActiveXObject('Microsoft.XMLHTTP');
                } catch (e) {}
            }
        }
        client.onreadystatechange = Ajax._wrapCallback(client, cb);
        return client;
    },
    getArrayBuffer: function(url, options, cb) {
        if (isFunction(options)) {
            var t = cb;
            cb = options;
            options = t;
        }
        if (!options) options = {};
        options['responseType'] = 'arraybuffer';
        return Ajax.get(url, options, cb);
    },
    getImage: function(img, url, options) {
        return Ajax.getArrayBuffer(url, options, function(err, imgData) {
            if (err) {
                if (img.onerror) img.onerror(err);
            } else if (imgData) {
                var URL1 = window.URL || window.webkitURL;
                var onload = img.onload;
                img.onload = function() {
                    if (onload) onload();
                    URL1.revokeObjectURL(img.src);
                };
                var blob = new Blob([
                    new Uint8Array(imgData.data)
                ], {
                    type: imgData.contentType
                });
                img.cacheControl = imgData.cacheControl;
                img.expires = imgData.expires;
                img.src = imgData.data.byteLength ? URL1.createObjectURL(blob) : emptyImageUrl;
            }
        });
    }
};
Ajax.getJSON = function(url, options, cb) {
    if (isFunction(options)) {
        var t = cb;
        cb = options;
        options = t;
    }
    var callback = function(err, resp) {
        var data = resp ? parseJSON(resp) : null;
        cb(err, data);
    };
    if (options && options['jsonp']) return Ajax.jsonp(url, callback);
    return Ajax.get(url, options, callback);
};
var DEFAULT_STROKE_COLOR = '#000';
var DEFAULT_FILL_COLOR = 'rgba(255,255,255,0)';
var DEFAULT_TEXT_COLOR = '#000';
var hitTesting = false;
var TEMP_CANVAS = null;
var RADIAN = Math.PI / 180;
var textOffsetY = 1;
var Canvas = {
    setHitTesting: function(testing) {
        hitTesting = testing;
    },
    createCanvas: function(width, height, canvasClass) {
        var canvas;
        if (IS_NODE) canvas = new canvasClass(width, height);
        else {
            canvas = createEl('canvas');
            canvas.width = width;
            canvas.height = height;
        }
        return canvas;
    },
    prepareCanvasFont: function(ctx, style) {
        ctx.textBaseline = 'top';
        ctx.font = getFont(style);
        var fill = style['textFill'];
        if (!fill) fill = DEFAULT_TEXT_COLOR;
        ctx.fillStyle = Canvas.getRgba(fill, style['textOpacity']);
    },
    prepareCanvas: function(ctx, style, resources, testing) {
        if (!style) return;
        var strokeWidth = style['lineWidth'];
        if (!isNil(strokeWidth) && ctx.lineWidth !== strokeWidth) ctx.lineWidth = strokeWidth;
        var strokePattern = style['linePatternFile'];
        var strokeColor = style['lineColor'] || DEFAULT_STROKE_COLOR;
        if (testing) ctx.strokeStyle = '#000';
        else if (strokePattern && resources) {
            var patternOffset;
            if (style['linePatternDx'] || style['linePatternDy']) patternOffset = [
                style['linePatternDx'],
                style['linePatternDy']
            ];
            Canvas._setStrokePattern(ctx, strokePattern, strokeWidth, patternOffset, resources);
            style['lineDasharray'] = [];
        } else if (isGradient(strokeColor)) {
            if (style['lineGradientExtent']) ctx.strokeStyle = Canvas._createGradient(ctx, strokeColor, style['lineGradientExtent']);
            else ctx.strokeStyle = DEFAULT_STROKE_COLOR;
        } else ctx.strokeStyle = strokeColor;
        if (style['lineJoin']) ctx.lineJoin = style['lineJoin'];
        if (style['lineCap']) ctx.lineCap = style['lineCap'];
        if (ctx.setLineDash && isArrayHasData(style['lineDasharray'])) ctx.setLineDash(style['lineDasharray']);
        var polygonPattern = style['polygonPatternFile'];
        var fill = style['polygonFill'] || DEFAULT_FILL_COLOR;
        if (testing) ctx.fillStyle = '#000';
        else if (polygonPattern && resources) {
            var fillImgUrl = extractImageUrl(polygonPattern);
            var fillTexture = resources.getImage([
                fillImgUrl,
                null,
                null
            ]);
            if (!fillTexture) fillTexture = resources.getImage([
                fillImgUrl + '-texture',
                null,
                strokeWidth
            ]);
            if (isSVG(fillImgUrl) && fillTexture instanceof Image && (Browser$1.edge || Browser$1.ie)) {
                var w = fillTexture.width || 20, h = fillTexture.height || 20;
                var canvas = Canvas.createCanvas(w, h);
                Canvas.image(canvas.getContext('2d'), fillTexture, 0, 0, w, h);
                fillTexture = canvas;
            }
            if (fillTexture) {
                ctx.fillStyle = ctx.createPattern(fillTexture, 'repeat');
                if (style['polygonPatternDx'] || style['polygonPatternDy']) ctx.fillStyle['polygonPatternOffset'] = [
                    style['polygonPatternDx'],
                    style['polygonPatternDy']
                ];
            } else if ('undefined' != typeof console) console.warn('img not found for', fillImgUrl);
        } else if (isGradient(fill)) {
            if (style['polygonGradientExtent']) ctx.fillStyle = Canvas._createGradient(ctx, fill, style['polygonGradientExtent']);
            else ctx.fillStyle = 'rgba(255,255,255,0)';
        } else ctx.fillStyle = fill;
    },
    _createGradient: function(ctx, g, extent) {
        var gradient = null, places = g['places'];
        var min = extent.getMin(), max = extent.getMax(), width = extent.getWidth(), height = extent.getHeight();
        if (g['type'] && 'linear' !== g['type']) {
            if ('radial' === g['type']) {
                if (places) {
                    if (6 !== places.length) throw new Error('A radial gradient\'s places should have 6 numbers.');
                    places = [
                        min.x + places[0] * width,
                        min.y + places[1] * height,
                        width * places[2],
                        min.x + places[3] * width,
                        min.y + places[4] * height,
                        width * places[5]
                    ];
                } else {
                    var c = extent.getCenter()._round();
                    places = [
                        c.x,
                        c.y,
                        Math.abs(c.x - min.x),
                        c.x,
                        c.y,
                        0
                    ];
                }
                gradient = ctx.createRadialGradient.apply(ctx, places);
            }
        } else {
            if (places) {
                if (4 !== places.length) throw new Error('A linear gradient\'s places should have 4 numbers.');
                places = [
                    min.x + places[0] * width,
                    min.y + places[1] * height,
                    min.x + places[2] * width,
                    min.y + places[3] * height
                ];
            } else places = [
                min.x,
                min.y,
                max.x,
                min.y
            ];
            gradient = ctx.createLinearGradient.apply(ctx, places);
        }
        g['colorStops'].forEach(function(stop) {
            gradient.addColorStop.apply(gradient, stop);
        });
        return gradient;
    },
    _setStrokePattern: function(ctx, strokePattern, strokeWidth, linePatternOffset, resources) {
        var imgUrl = extractImageUrl(strokePattern);
        var imageTexture;
        if (IS_NODE) imageTexture = resources.getImage([
            imgUrl,
            null,
            strokeWidth
        ]);
        else {
            var key = imgUrl + '-texture-' + strokeWidth;
            imageTexture = resources.getImage(key);
            if (!imageTexture) {
                var imageRes = resources.getImage([
                    imgUrl,
                    null,
                    null
                ]);
                if (imageRes) {
                    var w;
                    w = imageRes.width && imageRes.height ? Math.round(imageRes.width * strokeWidth / imageRes.height) : strokeWidth;
                    var patternCanvas = Canvas.createCanvas(w, strokeWidth, ctx.canvas.constructor);
                    Canvas.image(patternCanvas.getContext('2d'), imageRes, 0, 0, w, strokeWidth);
                    resources.addResource([
                        key,
                        null,
                        strokeWidth
                    ], patternCanvas);
                    imageTexture = patternCanvas;
                }
            }
        }
        if (imageTexture) {
            ctx.strokeStyle = ctx.createPattern(imageTexture, 'repeat');
            ctx.strokeStyle['linePatternOffset'] = linePatternOffset;
        } else if ('undefined' != typeof console) console.warn('img not found for', imgUrl);
    },
    clearRect: function(ctx, x1, y1, x2, y2) {
        ctx.canvas._drawn = false;
        ctx.clearRect(x1, y1, x2, y2);
    },
    fillCanvas: function(ctx, fillOpacity, x, y) {
        if (hitTesting) fillOpacity = 1;
        ctx.canvas._drawn = true;
        if (0 === fillOpacity) return;
        var isPattern = Canvas._isPattern(ctx.fillStyle);
        var offset = ctx.fillStyle && ctx.fillStyle['polygonPatternOffset'];
        var dx = offset ? offset[0] : 0, dy = offset ? offset[1] : 0;
        if (isNil(fillOpacity)) fillOpacity = 1;
        var alpha;
        if (fillOpacity < 1) {
            alpha = ctx.globalAlpha;
            ctx.globalAlpha *= fillOpacity;
        }
        if (isPattern) {
            x = x || 0;
            y = y || 0;
            ctx.translate(x + dx, y + dy);
        }
        ctx.fill();
        if (isPattern) ctx.translate(-x - dx, -y - dy);
        if (fillOpacity < 1) ctx.globalAlpha = alpha;
    },
    getRgba: function(color, op) {
        if (isNil(op)) op = 1;
        if ('#' !== color[0]) return color;
        var r, g, b;
        if (7 === color.length) {
            r = parseInt(color.substring(1, 3), 16);
            g = parseInt(color.substring(3, 5), 16);
            b = parseInt(color.substring(5, 7), 16);
        } else {
            r = 17 * parseInt(color.substring(1, 2), 16);
            g = 17 * parseInt(color.substring(2, 3), 16);
            b = 17 * parseInt(color.substring(3, 4), 16);
        }
        return 'rgba(' + r + ',' + g + ',' + b + ',' + op + ')';
    },
    image: function(ctx, img, x, y, width, height) {
        ctx.canvas._drawn = true;
        try {
            if (isNumber(width) && isNumber(height)) ctx.drawImage(img, x, y, width, height);
            else ctx.drawImage(img, x, y);
        } catch (error) {
            if (console) {
                console.warn('error when drawing image on canvas:', error);
                console.warn(img);
            }
        }
    },
    text: function(ctx, _text, pt, style, textDesc) {
        Canvas._textOnMultiRow(ctx, textDesc['rows'], style, pt, textDesc['size'], textDesc['rawSize']);
    },
    _textOnMultiRow: function(ctx, texts, style, point, splitTextSize, textSize) {
        var ptAlign = getAlignPoint(splitTextSize, style['textHorizontalAlignment'], style['textVerticalAlignment']), lineHeight = textSize['height'] + style['textLineSpacing'], basePoint = point.add(0, ptAlign.y), maxHeight = style['textMaxHeight'];
        var text, rowAlign, height = 0;
        for(var i = 0, len = texts.length; i < len; i++){
            text = texts[i]['text'];
            rowAlign = getAlignPoint(texts[i]['size'], style['textHorizontalAlignment'], style['textVerticalAlignment']);
            Canvas._textOnLine(ctx, text, basePoint.add(rowAlign.x, i * lineHeight), style['textHaloRadius'], style['textHaloFill'], style['textHaloOpacity']);
            if (maxHeight > 0) {
                height += lineHeight;
                if (height + textSize['height'] >= maxHeight) break;
            }
        }
    },
    _textOnLine: function(ctx, text, pt, textHaloRadius, textHaloFill, textHaloAlpha) {
        if (hitTesting) textHaloAlpha = 1;
        var drawHalo = 0 !== textHaloAlpha && 0 !== textHaloRadius;
        ctx.textBaseline = 'top';
        var gco, fill;
        var shadowBlur = ctx.shadowBlur, shadowOffsetX = ctx.shadowOffsetX, shadowOffsetY = ctx.shadowOffsetY;
        if (drawHalo) {
            var alpha = ctx.globalAlpha;
            ctx.globalAlpha *= textHaloAlpha;
            ctx.miterLimit = 2;
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
            ctx.lineWidth = 2 * textHaloRadius;
            ctx.strokeStyle = textHaloFill;
            ctx.strokeText(text, pt.x, pt.y + textOffsetY);
            ctx.miterLimit = 10;
            ctx.globalAlpha = alpha;
            gco = ctx.globalCompositeOperation;
            ctx.globalCompositeOperation = 'destination-out';
            fill = ctx.fillStyle;
            ctx.fillStyle = '#000';
        }
        if (shadowBlur && drawHalo) ctx.shadowBlur = ctx.shadowOffsetX = ctx.shadowOffsetY = 0;
        Canvas.fillText(ctx, text, pt);
        if (gco) {
            ctx.globalCompositeOperation = gco;
            Canvas.fillText(ctx, text, pt, fill);
            if (shadowBlur) {
                ctx.shadowBlur = shadowBlur;
                ctx.shadowOffsetX = shadowOffsetX;
                ctx.shadowOffsetY = shadowOffsetY;
            }
        }
    },
    fillText: function(ctx, text, pt, rgba) {
        ctx.canvas._drawn = true;
        if (rgba) ctx.fillStyle = rgba;
        ctx.fillText(text, pt.x, pt.y + textOffsetY);
    },
    _stroke: function(ctx, strokeOpacity, x, y) {
        if (hitTesting) strokeOpacity = 1;
        ctx.canvas._drawn = true;
        if (0 === strokeOpacity) return;
        var offset = ctx.strokeStyle && ctx.strokeStyle['linePatternOffset'];
        var dx = offset ? offset[0] : 0, dy = offset ? offset[1] : 0;
        var isPattern = Canvas._isPattern(ctx.strokeStyle) && (!isNil(x) && !isNil(y) || !isNil(dx) && !isNil(dy));
        if (isNil(strokeOpacity)) strokeOpacity = 1;
        var alpha;
        if (strokeOpacity < 1) {
            alpha = ctx.globalAlpha;
            ctx.globalAlpha *= strokeOpacity;
        }
        if (isPattern) {
            x = x || 0;
            y = y || 0;
            ctx.translate(x + dx, y + dy);
        }
        ctx.stroke();
        if (isPattern) ctx.translate(-x - dx, -y - dy);
        if (strokeOpacity < 1) ctx.globalAlpha = alpha;
    },
    _path: function(ctx, points, lineDashArray, lineOpacity, ignoreStrokePattern) {
        if (!isArrayHasData(points)) return;
        function fillWithPattern(p1, p2) {
            var degree = computeDegree(p1.x, p1.y, p2.x, p2.y);
            ctx.save();
            var cosd = Math.cos(degree);
            if (Math.abs(cosd) < 1E-7) ctx.translate(p1.x - ctx.lineWidth / 2, p1.y);
            else ctx.translate(p1.x, p1.y - ctx.lineWidth / 2 / cosd);
            ctx.rotate(degree);
            Canvas._stroke(ctx, lineOpacity);
            ctx.restore();
        }
        var isDashed = isArrayHasData(lineDashArray);
        var isPatternLine = true !== ignoreStrokePattern && Canvas._isPattern(ctx.strokeStyle);
        var point, prePoint, nextPoint;
        for(var i = 0, len = points.length; i < len; i++){
            point = points[i];
            if (!isDashed || ctx.setLineDash) {
                ctx.lineTo(point.x, point.y);
                if (isPatternLine && i > 0) {
                    prePoint = points[i - 1];
                    fillWithPattern(prePoint, point);
                    ctx.beginPath();
                    ctx.moveTo(point.x, point.y);
                }
            } else if (isDashed) {
                if (i === len - 1) break;
                nextPoint = points[i + 1];
                drawDashLine(ctx, point, nextPoint, lineDashArray, isPatternLine);
            }
        }
    },
    path: function(ctx, points, lineOpacity, fillOpacity, lineDashArray) {
        if (!isArrayHasData(points)) return;
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        Canvas._path(ctx, points, lineDashArray, lineOpacity);
        Canvas._stroke(ctx, lineOpacity);
    },
    _multiClip: function(ctx, points) {
        if (!points || 0 === points.length) return;
        points = points[0];
        for(var i = 0, len = points.length; i < len; i++){
            var point = points[i];
            var x = point.x, y = point.y;
            if (0 === i) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
            if (i === len - 1) {
                x = points[0].x;
                y = points[0].y;
                ctx.lineTo(x, y);
            }
        }
    },
    polygon: function(ctx, points, lineOpacity, fillOpacity, lineDashArray, smoothness) {
        if (ctx.isMultiClip) {
            Canvas._multiClip(ctx, points);
            return;
        }
        if (!isArrayHasData(points)) return;
        var isPatternLine = Canvas._isPattern(ctx.strokeStyle), fillFirst = isArrayHasData(lineDashArray) && !ctx.setLineDash || isPatternLine && !smoothness;
        if (!isArrayHasData(points[0])) points = [
            points
        ];
        var savedCtx = ctx;
        if (points.length > 1 && !IS_NODE) {
            if (!TEMP_CANVAS) TEMP_CANVAS = Canvas.createCanvas(1, 1);
            ctx.canvas._drawn = false;
            TEMP_CANVAS.width = ctx.canvas.width;
            TEMP_CANVAS.height = ctx.canvas.height;
            ctx = TEMP_CANVAS.getContext('2d');
            copyProperties(ctx, savedCtx);
        }
        var op, i, len;
        if (fillFirst) {
            ctx.save();
            for(i = 0, len = points.length; i < len; i++){
                if (!!isArrayHasData(points[i])) {
                    Canvas._ring(ctx, points[i], null, 0, true);
                    op = fillOpacity;
                    if (i > 0) {
                        ctx.globalCompositeOperation = 'destination-out';
                        op = 1;
                    }
                    Canvas.fillCanvas(ctx, op, points[i][0].x, points[i][0].y);
                    if (i > 0) ctx.globalCompositeOperation = 'source-over';
                    else if (len > 1) ctx.fillStyle = '#fff';
                    Canvas._stroke(ctx, 0);
                }
            }
            ctx.restore();
        }
        for(i = 0, len = points.length; i < len; i++){
            if (!!isArrayHasData(points[i])) {
                if (smoothness) {
                    Canvas.paintSmoothLine(ctx, points[i], lineOpacity, smoothness, true);
                    ctx.closePath();
                } else Canvas._ring(ctx, points[i], lineDashArray, lineOpacity);
                if (!fillFirst) {
                    op = fillOpacity;
                    if (i > 0) {
                        ctx.globalCompositeOperation = 'destination-out';
                        op = 1;
                    }
                    Canvas.fillCanvas(ctx, op, points[i][0].x, points[i][0].y);
                    if (i > 0) ctx.globalCompositeOperation = 'source-over';
                    else if (len > 1) ctx.fillStyle = '#fff';
                }
                Canvas._stroke(ctx, lineOpacity);
            }
        }
        if (points.length > 1 && !IS_NODE) {
            savedCtx.drawImage(TEMP_CANVAS, 0, 0);
            savedCtx.canvas._drawn = ctx.canvas._drawn;
            copyProperties(savedCtx, ctx);
        }
    },
    _ring: function(ctx, ring, lineDashArray, lineOpacity, ignorePattern) {
        var isPattern = Canvas._isPattern(ctx.strokeStyle);
        if (!ignorePattern && isPattern && !ring[0].equals(ring[ring.length - 1])) ring = ring.concat([
            ring[0]
        ]);
        ctx.beginPath();
        ctx.moveTo(ring[0].x, ring[0].y);
        Canvas._path(ctx, ring, lineDashArray, lineOpacity, ignorePattern);
        if (!isPattern) ctx.closePath();
    },
    paintSmoothLine: function(ctx, points, lineOpacity, smoothValue, close, tailIdx, tailRatio) {
        if (!points) return;
        if (points.length <= 2 || !smoothValue) {
            Canvas.path(ctx, points, lineOpacity);
            return;
        }
        function interpolate$$1(t0, t1, x1, y1, bx1, by1, bx2, by2, x2, y2) {
            var u0 = 1.0 - t0;
            var u1 = 1.0 - t1;
            var qxa = x1 * u0 * u0 + 2 * bx1 * t0 * u0 + bx2 * t0 * t0;
            var qxb = x1 * u1 * u1 + 2 * bx1 * t1 * u1 + bx2 * t1 * t1;
            var qxc = bx1 * u0 * u0 + 2 * bx2 * t0 * u0 + x2 * t0 * t0;
            var qxd = bx1 * u1 * u1 + 2 * bx2 * t1 * u1 + x2 * t1 * t1;
            var qya = y1 * u0 * u0 + 2 * by1 * t0 * u0 + by2 * t0 * t0;
            var qyb = y1 * u1 * u1 + 2 * by1 * t1 * u1 + by2 * t1 * t1;
            var qyc = by1 * u0 * u0 + 2 * by2 * t0 * u0 + y2 * t0 * t0;
            var qyd = by1 * u1 * u1 + 2 * by2 * t1 * u1 + y2 * t1 * t1;
            var xb = qxa * u1 + qxc * t1;
            var xc = qxb * u0 + qxd * t0;
            var xd = qxb * u1 + qxd * t1;
            var yb = qya * u1 + qyc * t1;
            var yc = qyb * u0 + qyd * t0;
            var yd = qyb * u1 + qyd * t1;
            return [
                xb,
                yb,
                xc,
                yc,
                xd,
                yd
            ];
        }
        function getCubicControlPoints(x0, y0, x1, y1, x2, y2, x3, y3, smoothValue, t) {
            var xc1 = (x0 + x1) / 2.0, yc1 = (y0 + y1) / 2.0;
            var xc2 = (x1 + x2) / 2.0, yc2 = (y1 + y2) / 2.0;
            var xc3 = (x2 + x3) / 2.0, yc3 = (y2 + y3) / 2.0;
            var len1 = Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0));
            var len2 = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
            var len3 = Math.sqrt((x3 - x2) * (x3 - x2) + (y3 - y2) * (y3 - y2));
            var k1 = len1 / (len1 + len2);
            var k2 = len2 / (len2 + len3);
            var xm1 = xc1 + (xc2 - xc1) * k1, ym1 = yc1 + (yc2 - yc1) * k1;
            var xm2 = xc2 + (xc3 - xc2) * k2, ym2 = yc2 + (yc3 - yc2) * k2;
            var ctrl1X = xm1 + (xc2 - xm1) * smoothValue + x1 - xm1, ctrl1Y = ym1 + (yc2 - ym1) * smoothValue + y1 - ym1, ctrl2X = xm2 + (xc2 - xm2) * smoothValue + x2 - xm2, ctrl2Y = ym2 + (yc2 - ym2) * smoothValue + y2 - ym2;
            var ctrlPoints = [
                ctrl1X,
                ctrl1Y,
                ctrl2X,
                ctrl2Y
            ];
            if (t < 1) return interpolate$$1(0, t, x1, y1, ctrl1X, ctrl1Y, ctrl2X, ctrl2Y, x2, y2);
            return ctrlPoints;
        }
        var count = points.length;
        var l = close ? count : count - 1;
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        if (void 0 !== tailRatio) l -= Math.max(l - tailIdx - 1, 0);
        var preCtrlPoints;
        for(var i = 0; i < l; i++){
            var x1 = points[i].x, y1 = points[i].y;
            var x0 = void 0, y0 = void 0, x2 = void 0, y2 = void 0, x3 = void 0, y3 = void 0;
            if (i - 1 < 0) {
                if (close) {
                    x0 = points[l - 1].x;
                    y0 = points[l - 1].y;
                } else {
                    x0 = points[i + 1].x;
                    y0 = points[i + 1].y;
                }
            } else {
                x0 = points[i - 1].x;
                y0 = points[i - 1].y;
            }
            if (i + 1 < count) {
                x2 = points[i + 1].x;
                y2 = points[i + 1].y;
            } else {
                x2 = points[i + 1 - count].x;
                y2 = points[i + 1 - count].y;
            }
            if (i + 2 < count) {
                x3 = points[i + 2].x;
                y3 = points[i + 2].y;
            } else if (close) {
                x3 = points[i + 2 - count].x;
                y3 = points[i + 2 - count].y;
            } else {
                x3 = points[i].x;
                y3 = points[i].y;
            }
            var ctrlPoints = getCubicControlPoints(x0, y0, x1, y1, x2, y2, x3, y3, smoothValue, i === l - 1 ? tailRatio : 1);
            if (i === l - 1 && tailRatio >= 0 && tailRatio < 1) {
                ctx.bezierCurveTo(ctrlPoints[0], ctrlPoints[1], ctrlPoints[2], ctrlPoints[3], ctrlPoints[4], ctrlPoints[5]);
                points.splice(l - 1, count - (l - 1) - 1);
                var lastPoint = new maptalks_es_Point(ctrlPoints[4], ctrlPoints[5]);
                lastPoint.prevCtrlPoint = new maptalks_es_Point(ctrlPoints[2], ctrlPoints[3]);
                points.push(lastPoint);
                count = points.length;
            } else ctx.bezierCurveTo(ctrlPoints[0], ctrlPoints[1], ctrlPoints[2], ctrlPoints[3], x2, y2);
            points[i].nextCtrlPoint = ctrlPoints.slice(0, 2);
            points[i].prevCtrlPoint = preCtrlPoints ? preCtrlPoints.slice(2) : null;
            preCtrlPoints = ctrlPoints;
        }
        if (!close && points[1].prevCtrlPoint) {
            points[0].nextCtrlPoint = points[1].prevCtrlPoint;
            delete points[0].prevCtrlPoint;
        }
        if (!points[count - 1].prevCtrlPoint) points[count - 1].prevCtrlPoint = points[count - 2].nextCtrlPoint;
        Canvas._stroke(ctx, lineOpacity);
    },
    _arcBetween: function(ctx, p1, p2, degree) {
        var a = degree, dist = p1.distanceTo(p2), r = dist / 2 / Math.sin(a / 2);
        var p1p2 = Math.asin((p2.y - p1.y) / dist);
        if (p1.x > p2.x) p1p2 = Math.PI - p1p2;
        var cp2 = 90 * RADIAN - a / 2, da = p1p2 - cp2;
        var dx = Math.cos(da) * r, dy = Math.sin(da) * r, cx = p1.x + dx, cy = p1.y + dy;
        var startAngle = Math.asin((p2.y - cy) / r);
        if (cx > p2.x) startAngle = Math.PI - startAngle;
        var endAngle = startAngle + a;
        ctx.beginPath();
        ctx.arc(cx, cy, r, startAngle, endAngle);
        return [
            cx,
            cy
        ];
    },
    _lineTo: function(ctx, p) {
        ctx.lineTo(p.x, p.y);
    },
    bezierCurveAndFill: function(ctx, points, lineOpacity, fillOpacity) {
        ctx.beginPath();
        var start = points[0];
        ctx.moveTo(start.x, start.y);
        var args = [
            ctx
        ];
        args.push.apply(args, points.splice(1));
        Canvas._bezierCurveTo.apply(Canvas, args);
        Canvas.fillCanvas(ctx, fillOpacity);
        Canvas._stroke(ctx, lineOpacity);
    },
    _bezierCurveTo: function(ctx, p1, p2, p3) {
        ctx.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
    },
    ellipse: function(ctx, pt, width, heightTop, heightBottom, lineOpacity, fillOpacity) {
        function bezierEllipse(x, y, a, b, b1) {
            var k = 0.5522848, ox = a * k, oy = b * k, oy1 = b1 * k;
            ctx.moveTo(x - a, y);
            ctx.bezierCurveTo(x - a, y - oy, x - ox, y - b, x, y - b);
            ctx.bezierCurveTo(x + ox, y - b, x + a, y - oy, x + a, y);
            ctx.bezierCurveTo(x + a, y + oy1, x + ox, y + b1, x, y + b1);
            ctx.bezierCurveTo(x - ox, y + b1, x - a, y + oy1, x - a, y);
            ctx.closePath();
        }
        ctx.beginPath();
        if (width === heightTop && width === heightBottom) ctx.arc(pt.x, pt.y, width, 0, 2 * Math.PI);
        else if (ctx.ellipse) {
            if (heightTop !== heightBottom) {
                ctx.ellipse(pt.x, pt.y, width, heightTop, 0, 180 * RADIAN, 360 * RADIAN, false);
                ctx.ellipse(pt.x, pt.y, width, heightBottom, 0, 0, 180 * RADIAN, false);
            } else ctx.ellipse(pt.x, pt.y, width, heightTop, 0, 0, 360 * RADIAN, false);
        } else bezierEllipse(pt.x, pt.y, width, heightTop, heightBottom);
        Canvas.fillCanvas(ctx, fillOpacity, pt.x - width, pt.y - heightTop);
        Canvas._stroke(ctx, lineOpacity, pt.x - width, pt.y - heightTop);
    },
    rectangle: function(ctx, pt, size, lineOpacity, fillOpacity) {
        var x = pt.x, y = pt.y;
        ctx.beginPath();
        ctx.rect(x, y, size['width'], size['height']);
        Canvas.fillCanvas(ctx, fillOpacity, x, y);
        Canvas._stroke(ctx, lineOpacity, x, y);
    },
    sector: function(ctx, pt, size, angles, lineOpacity, fillOpacity) {
        var rad = RADIAN;
        var startAngle = angles[0], endAngle = angles[1];
        function sector(ctx, x, y, radius, startAngle, endAngle) {
            var sDeg = rad * -endAngle;
            var eDeg = rad * -startAngle;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.arc(x, y, radius, sDeg, eDeg);
            ctx.lineTo(x, y);
            Canvas.fillCanvas(ctx, fillOpacity, x - radius, y - radius);
            Canvas._stroke(ctx, lineOpacity, x - radius, y - radius);
        }
        sector(ctx, pt.x, pt.y, size, startAngle, endAngle);
    },
    _isPattern: function(style) {
        return !isString(style) && !('addColorStop' in style);
    },
    drawCross: function(ctx, x, y, lineWidth, color) {
        ctx.canvas._drawn = true;
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(x - 5, y);
        ctx.lineTo(x + 5, y);
        ctx.moveTo(x, y - 5);
        ctx.lineTo(x, y + 5);
        ctx.stroke();
    },
    copy: function(canvas, c) {
        var target = c || createEl('canvas');
        target.width = canvas.width;
        target.height = canvas.height;
        target.getContext('2d').drawImage(canvas, 0, 0);
        return target;
    }
};
function drawDashLine(ctx, startPoint, endPoint, dashArray) {
    var fromX = startPoint.x, fromY = startPoint.y, toX = endPoint.x, toY = endPoint.y;
    var pattern = dashArray;
    var lt = function(a, b) {
        return a <= b;
    };
    var gt = function(a, b) {
        return a >= b;
    };
    var capmin = function(a, b) {
        return Math.min(a, b);
    };
    var capmax = function(a, b) {
        return Math.max(a, b);
    };
    var checkX = {
        thereYet: gt,
        cap: capmin
    };
    var checkY = {
        thereYet: gt,
        cap: capmin
    };
    if (fromY - toY > 0) {
        checkY.thereYet = lt;
        checkY.cap = capmax;
    }
    if (fromX - toX > 0) {
        checkX.thereYet = lt;
        checkX.cap = capmax;
    }
    ctx.moveTo(fromX, fromY);
    var offsetX = fromX;
    var offsetY = fromY;
    var idx = 0, dash = true;
    var ang, len;
    while(!(checkX.thereYet(offsetX, toX) && checkY.thereYet(offsetY, toY))){
        ang = Math.atan2(toY - fromY, toX - fromX);
        len = pattern[idx];
        offsetX = checkX.cap(toX, offsetX + Math.cos(ang) * len);
        offsetY = checkY.cap(toY, offsetY + Math.sin(ang) * len);
        if (dash) ctx.lineTo(offsetX, offsetY);
        else ctx.moveTo(offsetX, offsetY);
        idx = (idx + 1) % pattern.length;
        dash = !dash;
    }
}
var maptalks_es_prefix = 'data:image/';
function extractImageUrl(url) {
    if (url.substring(0, maptalks_es_prefix.length) === maptalks_es_prefix) return url;
    return extractCssUrl(url);
}
function copyProperties(ctx, savedCtx) {
    ctx.filter = savedCtx.filter;
    ctx.fillStyle = savedCtx.fillStyle;
    ctx.globalAlpha = savedCtx.globalAlpha;
    ctx.lineCap = savedCtx.lineCap;
    ctx.lineDashOffset = savedCtx.lineDashOffset;
    ctx.lineJoin = savedCtx.lineJoin;
    ctx.lineWidth = savedCtx.lineWidth;
    ctx.shadowBlur = savedCtx.shadowBlur;
    ctx.shadowColor = savedCtx.shadowColor;
    ctx.shadowOffsetX = savedCtx.shadowOffsetX;
    ctx.shadowOffsetY = savedCtx.shadowOffsetY;
    ctx.strokeStyle = savedCtx.strokeStyle;
}
var commonjsGlobal = 'undefined' != typeof window ? window : 'undefined' != typeof global ? global : 'undefined' != typeof self ? self : {};
function createCommonjsModule(fn, module) {
    return module = {
        exports: {}
    }, fn(module, module.exports), module.exports;
}
var zousanMin = createCommonjsModule(function(module) {
    !function(t) {
        function e(t) {
            if (t) {
                var e = this;
                t(function(t) {
                    e.resolve(t);
                }, function(t) {
                    e.reject(t);
                });
            }
        }
        function n(t, e) {
            if ("function" == typeof t.y) try {
                var n = t.y.call(i, e);
                t.p.resolve(n);
            } catch (o) {
                t.p.reject(o);
            }
            else t.p.resolve(e);
        }
        function o(t, e) {
            if ("function" == typeof t.n) try {
                var n = t.n.call(i, e);
                t.p.resolve(n);
            } catch (o) {
                t.p.reject(o);
            }
            else t.p.reject(e);
        }
        var r, i, c = "fulfilled", u = "rejected", s = "undefined", f = function() {
            function e() {
                for(; n.length - o;){
                    try {
                        n[o]();
                    } catch (e) {
                        t.console && t.console.error(e);
                    }
                    n[o++] = i, o == r && (n.splice(0, r), o = 0);
                }
            }
            var n = [], o = 0, r = 1024, c = function() {
                if (typeof MutationObserver !== s) {
                    var t = document.createElement("div"), n = new MutationObserver(e);
                    return n.observe(t, {
                        attributes: !0
                    }), function() {
                        t.setAttribute("a", 0);
                    };
                }
                return typeof setImmediate !== s ? function() {
                    setImmediate(e);
                } : function() {
                    setTimeout(e, 0);
                };
            }();
            return function(t) {
                n.push(t), n.length - o == 1 && c();
            };
        }();
        e.prototype = {
            resolve: function(t) {
                if (this.state === r) {
                    if (t === this) return this.reject(new TypeError("Attempt to resolve promise with self"));
                    var e = this;
                    if (t && ("function" == typeof t || "object" == typeof t)) try {
                        var o = !0, i = t.then;
                        if ("function" == typeof i) return void i.call(t, function(t) {
                            o && (o = !1, e.resolve(t));
                        }, function(t) {
                            o && (o = !1, e.reject(t));
                        });
                    } catch (u) {
                        return void (o && this.reject(u));
                    }
                    this.state = c, this.v = t, e.c && f(function() {
                        for(var o = 0, r = e.c.length; r > o; o++)n(e.c[o], t);
                    });
                }
            },
            reject: function(n) {
                if (this.state === r) {
                    this.state = u, this.v = n;
                    var i = this.c;
                    i ? f(function() {
                        for(var t = 0, e = i.length; e > t; t++)o(i[t], n);
                    }) : !e.suppressUncaughtRejectionError && t.console && t.console.log("You upset Zousan. Please catch rejections: ", n, n ? n.stack : null);
                }
            },
            then: function(t, i) {
                var u = new e(), s = {
                    y: t,
                    n: i,
                    p: u
                };
                if (this.state === r) this.c ? this.c.push(s) : this.c = [
                    s
                ];
                else {
                    var l = this.state, a = this.v;
                    f(function() {
                        l === c ? n(s, a) : o(s, a);
                    });
                }
                return u;
            },
            catch: function(t) {
                return this.then(null, t);
            },
            finally: function(t) {
                return this.then(t, t);
            },
            timeout: function(t, n) {
                n = n || "Timeout";
                var o = this;
                return new e(function(e, r) {
                    setTimeout(function() {
                        r(Error(n));
                    }, t), o.then(function(t) {
                        e(t);
                    }, function(t) {
                        r(t);
                    });
                });
            }
        }, e.resolve = function(t) {
            var n = new e();
            return n.resolve(t), n;
        }, e.reject = function(t) {
            var n = new e();
            return n.reject(t), n;
        }, e.all = function(t) {
            function n(n, c) {
                n && "function" == typeof n.then || (n = e.resolve(n)), n.then(function(e) {
                    o[c] = e, r++, r == t.length && i.resolve(o);
                }, function(t) {
                    i.reject(t);
                });
            }
            for(var o = [], r = 0, i = new e(), c = 0; c < t.length; c++)n(t[c], c);
            return t.length || i.resolve(o), i;
        }, module.exports && (module.exports = e), t.define && t.define.amd && t.define([], function() {
            return e;
        }), t.Zousan = e, e.soon = f;
    }(void 0 !== commonjsGlobal ? commonjsGlobal : commonjsGlobal);
});
var promise;
promise = 'undefined' != typeof Promise ? Promise : zousanMin;
var Promise$1 = promise;
var maptalks_es_Eventable = function(Base) {
    return function(_Base) {
        _inheritsLoose(_class, _Base);
        function _class() {
            return _Base.apply(this, arguments) || this;
        }
        var _proto = _class.prototype;
        _proto.on = function(eventsOn, handler, context) {
            if (!eventsOn) return this;
            if (!isString(eventsOn)) return this._switch('on', eventsOn, handler);
            if (!handler) return this;
            if (!this._eventMap) this._eventMap = {};
            var eventTypes = eventsOn.toLowerCase().split(' ');
            var evtType;
            if (!context) context = this;
            var handlerChain;
            for(var ii = 0, ll = eventTypes.length; ii < ll; ii++){
                evtType = eventTypes[ii];
                handlerChain = this._eventMap[evtType];
                if (!handlerChain) {
                    handlerChain = [];
                    this._eventMap[evtType] = handlerChain;
                }
                var l = handlerChain.length;
                if (l > 0) {
                    for(var i = 0; i < l; i++)if (handler === handlerChain[i].handler && handlerChain[i].context === context) return this;
                }
                handlerChain.push({
                    handler: handler,
                    context: context
                });
            }
            return this;
        };
        _proto.addEventListener = function() {
            return this.on.apply(this, arguments);
        };
        _proto.once = function(eventTypes, handler, context) {
            if (!isString(eventTypes)) {
                var once = {};
                for(var p in eventTypes)if (eventTypes.hasOwnProperty(p)) once[p] = this._wrapOnceHandler(p, eventTypes[p], context);
                return this._switch('on', once);
            }
            var evetTypes = eventTypes.split(' ');
            for(var i = 0, l = evetTypes.length; i < l; i++)this.on(evetTypes[i], this._wrapOnceHandler(evetTypes[i], handler, context));
            return this;
        };
        _proto.off = function(eventsOff, handler, context) {
            if (!this._eventMap || !eventsOff) return this;
            if (!isString(eventsOff)) return this._switch('off', eventsOff, handler);
            if (!handler) return this;
            var eventTypes = eventsOff.split(' ');
            var eventType, listeners, wrapKey;
            if (!context) context = this;
            for(var j = 0, jl = eventTypes.length; j < jl; j++){
                eventType = eventTypes[j].toLowerCase();
                wrapKey = 'Z__' + eventType;
                listeners = this._eventMap[eventType];
                if (!listeners) break;
                for(var i = listeners.length - 1; i >= 0; i--){
                    var listener = listeners[i];
                    if ((handler === listener.handler || handler === listener.handler[wrapKey]) && listener.context === context) {
                        delete listener.handler[wrapKey];
                        listeners.splice(i, 1);
                    }
                }
                if (!listeners.length) delete this._eventMap[eventType];
            }
            return this;
        };
        _proto.removeEventListener = function() {
            return this.off.apply(this, arguments);
        };
        _proto.listens = function(eventType, handler, context) {
            if (!this._eventMap || !isString(eventType)) return 0;
            var handlerChain = this._eventMap[eventType.toLowerCase()];
            if (!handlerChain || !handlerChain.length) return 0;
            if (!handler) return handlerChain.length;
            for(var i = 0, len = handlerChain.length; i < len; i++)if (handler === handlerChain[i].handler && (isNil(context) || handlerChain[i].context === context)) return 1;
            return 0;
        };
        _proto.getListeningEvents = function() {
            if (!this._eventMap) return [];
            return Object.keys(this._eventMap);
        };
        _proto.copyEventListeners = function(target) {
            var eventMap = target._eventMap;
            if (!eventMap) return this;
            var handlerChain;
            for(var eventType in eventMap){
                handlerChain = eventMap[eventType];
                for(var i = 0, len = handlerChain.length; i < len; i++)this.on(eventType, handlerChain[i].handler, handlerChain[i].context);
            }
            return this;
        };
        _proto.fire = function() {
            if (this._eventParent) return this._eventParent.fire.apply(this._eventParent, arguments);
            return this._fire.apply(this, arguments);
        };
        _proto._wrapOnceHandler = function(evtType, handler, context) {
            var me = this;
            var key = 'Z__' + evtType;
            var called = false;
            var fn = function onceHandler() {
                if (called) return;
                delete fn[key];
                called = true;
                if (context) handler.apply(context, arguments);
                else handler.apply(this, arguments);
                me.off(evtType, onceHandler, this);
            };
            fn[key] = handler;
            return fn;
        };
        _proto._switch = function(to, eventKeys, context) {
            for(var p in eventKeys)if (eventKeys.hasOwnProperty(p)) this[to](p, eventKeys[p], context);
            return this;
        };
        _proto._clearListeners = function(eventType) {
            if (!this._eventMap || !isString(eventType)) return;
            var handlerChain = this._eventMap[eventType.toLowerCase()];
            if (!handlerChain) return;
            this._eventMap[eventType] = null;
        };
        _proto._clearAllListeners = function() {
            this._eventMap = null;
        };
        _proto._setEventParent = function(parent) {
            this._eventParent = parent;
            return this;
        };
        _proto._setEventTarget = function(target) {
            this._eventTarget = target;
            return this;
        };
        _proto._fire = function(eventType, param) {
            if (!this._eventMap) return this;
            var handlerChain = this._eventMap[eventType.toLowerCase()];
            if (!handlerChain) return this;
            if (!param) param = {};
            param['type'] = eventType;
            param['target'] = this._eventTarget || this;
            var queue = handlerChain.slice(0);
            var context, bubble, passed;
            for(var i = 0, len = queue.length; i < len; i++){
                if (!!queue[i]) {
                    context = queue[i].context;
                    bubble = true;
                    passed = extend({}, param);
                    bubble = context ? queue[i].handler.call(context, passed) : queue[i].handler(passed);
                    if (false === bubble) {
                        if (param['domEvent']) stopPropagation(param['domEvent']);
                    }
                }
            }
            return this;
        };
        return _class;
    }(Base);
};
var maptalks_es_Handler = function() {
    function Handler(target) {
        this.target = target;
    }
    var _proto = Handler.prototype;
    _proto.enable = function() {
        if (this._enabled) return this;
        this._enabled = true;
        this.addHooks();
        return this;
    };
    _proto.disable = function() {
        if (!this._enabled) return this;
        this._enabled = false;
        this.removeHooks();
        return this;
    };
    _proto.enabled = function() {
        return !!this._enabled;
    };
    _proto.remove = function() {
        this.disable();
        delete this.target;
        delete this.dom;
    };
    return Handler;
}();
var Handler$1 = maptalks_es_Eventable(maptalks_es_Handler);
var maptalks_es_Class = function() {
    function Class(options) {
        if (!this || !this.setOptions) throw new Error('Class instance is being created without "new" operator.');
        this.setOptions(options);
        this.callInitHooks();
    }
    var _proto = Class.prototype;
    _proto.callInitHooks = function() {
        var proto = Object.getPrototypeOf(this);
        this._visitInitHooks(proto);
        return this;
    };
    _proto.setOptions = function(options) {
        if (!this.hasOwnProperty('options')) this.options = this.options ? Object.create(this.options) : {};
        if (!options) return this;
        for(var i in options)this.options[i] = options[i];
        return this;
    };
    _proto.config = function(conf) {
        if (conf) {
            if (2 === arguments.length) {
                var t = {};
                t[conf] = arguments[1];
                conf = t;
            }
            for(var i in conf){
                this.options[i] = conf[i];
                if (this[i] && this[i] instanceof Handler$1) {
                    if (conf[i]) this[i].enable();
                    else this[i].disable();
                }
            }
            this.onConfig(conf);
        } else {
            var config = {};
            for(var p in this.options)if (this.options.hasOwnProperty(p)) config[p] = this.options[p];
            return config;
        }
        return this;
    };
    _proto.onConfig = function() {};
    _proto._visitInitHooks = function(proto) {
        if (this._initHooksCalled) return;
        var parentProto = Object.getPrototypeOf(proto);
        if (parentProto._visitInitHooks) parentProto._visitInitHooks.call(this, parentProto);
        this._initHooksCalled = true;
        var hooks = proto._initHooks;
        if (hooks && hooks !== parentProto._initHooks) for(var i = 0; i < hooks.length; i++)hooks[i].call(this);
    };
    Class.addInitHook = function(fn) {
        for(var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++)args[_key - 1] = arguments[_key];
        var init = 'function' == typeof fn ? fn : function() {
            this[fn].apply(this, args);
        };
        var proto = this.prototype;
        var parentProto = Object.getPrototypeOf(proto);
        if (!proto._initHooks || proto._initHooks === parentProto._initHooks) proto._initHooks = [];
        proto._initHooks.push(init);
        return this;
    };
    Class.include = function() {
        for(var i = 0; i < arguments.length; i++)extend(this.prototype, i < 0 || arguments.length <= i ? void 0 : arguments[i]);
        return this;
    };
    Class.mergeOptions = function(options) {
        var proto = this.prototype;
        var parentProto = Object.getPrototypeOf(proto);
        if (!proto.options || proto.options === parentProto.options) proto.options = proto.options ? Object.create(proto.options) : {};
        extend(proto.options, options);
        return this;
    };
    return Class;
}();
var registeredTypes = {};
var JSONAble = function(Base) {
    return function(_Base) {
        _inheritsLoose(_class, _Base);
        function _class() {
            return _Base.apply(this, arguments) || this;
        }
        _class.registerJSONType = function(type) {
            if (!type) return this;
            registeredTypes[type] = this;
            return this;
        };
        _class.getJSONClass = function(type) {
            if (!type) return null;
            return registeredTypes[type];
        };
        var _proto = _class.prototype;
        _proto.getJSONType = function() {
            if (void 0 === this._jsonType) {
                var clazz = Object.getPrototypeOf(this).constructor;
                for(var p in registeredTypes)if (registeredTypes[p] === clazz) {
                    this._jsonType = p;
                    break;
                }
            }
            if (!this._jsonType) throw new Error('Found an unregistered geometry class!');
            return this._jsonType;
        };
        return _class;
    }(Base);
};
function Handlerable(Base) {
    return function(_Base) {
        _inheritsLoose(_class, _Base);
        function _class() {
            return _Base.apply(this, arguments) || this;
        }
        var _proto = _class.prototype;
        _proto.addHandler = function(name, handlerClass) {
            if (!handlerClass) return this;
            if (!this._handlers) this._handlers = [];
            if (this[name]) {
                this[name].enable();
                return this;
            }
            var handler = this[name] = new handlerClass(this);
            this._handlers.push(handler);
            if (this.options[name]) handler.enable();
            return this;
        };
        _proto.removeHandler = function(name) {
            if (!name) return this;
            var handler = this[name];
            if (handler) {
                var hit = this._handlers.indexOf(handler);
                if (hit >= 0) this._handlers.splice(hit, 1);
                this[name].remove();
                delete this[name];
            }
            return this;
        };
        _proto._clearHandlers = function() {
            for(var i = 0, len = this._handlers.length; i < len; i++)this._handlers[i].remove();
            this._handlers = [];
        };
        return _class;
    }(Base);
}
var START_EVENTS = 'touchstart mousedown';
var MOVE_EVENTS = {
    mousedown: 'mousemove',
    touchstart: 'touchmove',
    pointerdown: 'touchmove',
    MSPointerDown: 'touchmove'
};
var END_EVENTS = {
    mousedown: 'mouseup',
    touchstart: 'touchend',
    pointerdown: 'touchend',
    MSPointerDown: 'touchend'
};
var maptalks_es_DragHandler = function(_Handler) {
    _inheritsLoose(DragHandler, _Handler);
    function DragHandler(dom, options) {
        var _this;
        if (void 0 === options) options = {};
        _this = _Handler.call(this, null) || this;
        _this.dom = dom;
        _this.options = options;
        return _this;
    }
    var _proto = DragHandler.prototype;
    _proto.enable = function() {
        if (!this.dom) return this;
        this._onMouseDown = function(e) {
            return this.onMouseDown(e);
        };
        on(this.dom, START_EVENTS, this._onMouseDown, this);
        return this;
    };
    _proto.disable = function() {
        if (!this.dom) return this;
        this._offEvents();
        off(this.dom, START_EVENTS, this._onMouseDown);
        delete this._onMouseDown;
        return this;
    };
    _proto.onMouseDown = function(event) {
        if (!this.options['rightclick'] && 2 === event.button) return;
        if (event.touches && event.touches.length > 1) return;
        if (this.options['cancelOn'] && true === this.options['cancelOn'](event)) return;
        var dom = this.dom;
        if (dom.setCapture) dom.setCapture();
        else if (window.captureEvents) window.captureEvents(window['Event'].MOUSEMOVE | window['Event'].MOUSEUP);
        dom['ondragstart'] = function() {
            return false;
        };
        delete this.moved;
        var actual = event.touches ? event.touches[0] : event;
        this.startPos = new maptalks_es_Point(actual.clientX, actual.clientY);
        on(document, MOVE_EVENTS[event.type], this.onMouseMove, this);
        on(document, END_EVENTS[event.type], this.onMouseUp, this);
        if (!this.options['ignoreMouseleave']) on(this.dom, 'mouseleave', this.onMouseUp, this);
        this.fire('mousedown', {
            domEvent: event,
            mousePos: new maptalks_es_Point(actual.clientX, actual.clientY)
        });
    };
    _proto.onMouseMove = function(event) {
        if (event.touches && event.touches.length > 1) {
            if (this.moved) {
                this.interupted = true;
                this.onMouseUp(event);
            }
            return;
        }
        var actual = event.touches ? event.touches[0] : event;
        var newPos = new maptalks_es_Point(actual.clientX, actual.clientY), offset = newPos.sub(this.startPos);
        if (!offset.x && !offset.y) return;
        if (this.moved) this.fire('dragging', {
            domEvent: event,
            mousePos: new maptalks_es_Point(actual.clientX, actual.clientY)
        });
        else {
            this.fire('dragstart', {
                domEvent: event,
                mousePos: this.startPos.copy()
            });
            this.moved = true;
        }
    };
    _proto.onMouseUp = function(event) {
        var actual = event.changedTouches ? event.changedTouches[0] : event;
        this._offEvents();
        var param = {
            domEvent: event
        };
        if (isNumber(actual.clientX)) param['mousePos'] = new maptalks_es_Point(parseInt(actual.clientX, 0), parseInt(actual.clientY, 0));
        if (this.moved) {
            param.interupted = this.interupted;
            this.fire('dragend', param);
            delete this.interupted;
            delete this.moved;
        }
        this.fire('mouseup', param);
    };
    _proto._offEvents = function() {
        var dom = this.dom;
        off(dom, 'mouseleave', this.onMouseUp, this);
        if ('undefined' == typeof document || 'undefined' == typeof window) return;
        for(var i in MOVE_EVENTS){
            off(document, MOVE_EVENTS[i], this.onMouseMove, this);
            off(document, END_EVENTS[i], this.onMouseUp, this);
        }
        if (dom['releaseCapture']) dom['releaseCapture']();
        else if (window.captureEvents) window.captureEvents(window['Event'].MOUSEMOVE | window['Event'].MOUSEUP);
    };
    return DragHandler;
}(Handler$1);
var maptalks_es_Coordinate = function(_Position) {
    _inheritsLoose(Coordinate, _Position);
    function Coordinate() {
        return _Position.apply(this, arguments) || this;
    }
    Coordinate.toNumberArrays = function(coordinates) {
        if (!Array.isArray(coordinates)) return [
            coordinates.x,
            coordinates.y
        ];
        return forEachCoord(coordinates, function(coord) {
            return [
                coord.x,
                coord.y
            ];
        });
    };
    Coordinate.toCoordinates = function(coordinates) {
        if (isNumber(coordinates[0]) && isNumber(coordinates[1])) return new Coordinate(coordinates);
        var result = [];
        for(var i = 0, len = coordinates.length; i < len; i++){
            var child = coordinates[i];
            if (Array.isArray(child)) {
                if (isNumber(child[0])) result.push(new Coordinate(child));
                else result.push(Coordinate.toCoordinates(child));
            } else result.push(new Coordinate(child));
        }
        return result;
    };
    return Coordinate;
}(maptalks_es_Position);
var maptalks_es_CRS = function() {
    function CRS(type, properties) {
        this.type = type;
        this.properties = properties;
    }
    CRS.createProj4 = function(proj) {
        return new CRS('proj4', {
            proj: proj
        });
    };
    CRS.fromProjectionCode = function(code) {
        if (!code) return null;
        code = code.toUpperCase().replace(':', '');
        return CRS[code] || null;
    };
    return CRS;
}();
maptalks_es_CRS.WGS84 = maptalks_es_CRS.createProj4('+proj=longlat +datum=WGS84 +no_defs');
maptalks_es_CRS.EPSG4326 = maptalks_es_CRS.WGS84;
maptalks_es_CRS.EPSG3857 = maptalks_es_CRS.createProj4('+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs');
maptalks_es_CRS.IDENTITY = maptalks_es_CRS.createProj4('+proj=identity +no_defs');
maptalks_es_CRS.CGCS2000 = maptalks_es_CRS.createProj4('+proj=longlat +datum=CGCS2000');
maptalks_es_CRS.EPSG4490 = maptalks_es_CRS.CGCS2000;
maptalks_es_CRS.BD09LL = maptalks_es_CRS.createProj4('+proj=longlat +datum=BD09');
maptalks_es_CRS.GCJ02 = maptalks_es_CRS.createProj4('+proj=longlat +datum=GCJ02');
var TEMP_POINT0 = new maptalks_es_Point(0, 0);
var TEMP_COORD0 = new maptalks_es_Coordinate(0, 0);
var TEMP_COORD1 = new maptalks_es_Coordinate(0, 0);
var TEMP_COORD2 = new maptalks_es_Coordinate(0, 0);
var TEMP_COORD3 = new maptalks_es_Coordinate(0, 0);
var TEMP_COORD4 = new maptalks_es_Coordinate(0, 0);
var TEMP_COORD5 = new maptalks_es_Coordinate(0, 0);
var TEMP_COORD6 = new maptalks_es_Coordinate(0, 0);
var TEMP_COORD7 = new maptalks_es_Coordinate(0, 0);
var MINMAX = [];
var TEMP_EXTENT;
var TEMP_COMBINE = [];
var maptalks_es_Extent = function() {
    function Extent(p1, p2, p3, p4) {
        this._clazz = maptalks_es_Coordinate;
        var l = arguments.length;
        var proj = l > 0 ? arguments[l - 1] : null;
        if (proj && proj.unproject) this.projection = arguments[l - 1];
        this._dirty = true;
        this._initialize(p1, p2, p3, p4);
    }
    var _proto = Extent.prototype;
    _proto._initialize = function(p1, p2, p3, p4) {
        this.xmin = null;
        this.xmax = null;
        this.ymin = null;
        this.ymax = null;
        if (isNil(p1)) return;
        var projection = this.projection;
        if (isNumber(p1) && isNumber(p2) && isNumber(p3) && isNumber(p4)) {
            if (projection) this.set(p1, p2, p3, p4);
            else this.set(Math.min(p1, p3), Math.min(p2, p4), Math.max(p1, p3), Math.max(p2, p4));
            return;
        }
        if (Array.isArray(p1)) {
            if (projection) this.set(p1[0], p1[1], p1[2], p1[3]);
            else this.set(Math.min(p1[0], p1[2]), Math.min(p1[1], p1[3]), Math.max(p1[0], p1[2]), Math.max(p1[1], p1[3]));
        } else if (isNumber(p1.x) && isNumber(p2.x) && isNumber(p1.y) && isNumber(p2.y)) {
            if (projection) this.set(p1.x, p1.y, p2.x, p2.y);
            else {
                if (p1.x > p2.x) {
                    this['xmin'] = p2.x;
                    this['xmax'] = p1.x;
                } else {
                    this['xmin'] = p1.x;
                    this['xmax'] = p2.x;
                }
                if (p1.y > p2.y) {
                    this['ymin'] = p2.y;
                    this['ymax'] = p1.y;
                } else {
                    this['ymin'] = p1.y;
                    this['ymax'] = p2.y;
                }
            }
        } else if (isNumber(p1['xmin']) && isNumber(p1['xmax']) && isNumber(p1['ymin']) && isNumber(p1['ymax'])) this.set(p1['xmin'], p1['ymin'], p1['xmax'], p1['ymax']);
    };
    _proto._add = function(p) {
        this._dirty = true;
        if (isNil(p.x)) {
            if (isNil(p.xmin)) {
                if (!isNil(p[0])) {
                    this['xmin'] += p[0];
                    this['ymin'] += p[1];
                    this['xmax'] += p[0];
                    this['ymax'] += p[1];
                }
            } else {
                this['xmin'] += p.xmin;
                this['ymin'] += p.ymin;
                this['xmax'] += p.xmax;
                this['ymax'] += p.ymax;
            }
        } else {
            this['xmin'] += p.x;
            this['ymin'] += p.y;
            this['xmax'] += p.x;
            this['ymax'] += p.y;
        }
        return this;
    };
    _proto.add = function() {
        var e = new this.constructor(this['xmin'], this['ymin'], this['xmax'], this['ymax'], this.projection);
        return e._add.apply(e, arguments);
    };
    _proto._scale = function(s) {
        this._dirty = true;
        this['xmin'] *= s;
        this['ymin'] *= s;
        this['xmax'] *= s;
        this['ymax'] *= s;
        return this;
    };
    _proto._sub = function(p) {
        this._dirty = true;
        if (isNil(p.x)) {
            if (isNil(p.xmin)) {
                if (!isNil(p[0])) {
                    this['xmin'] -= p[0];
                    this['ymin'] -= p[1];
                    this['xmax'] -= p[0];
                    this['ymax'] -= p[1];
                }
            } else {
                this['xmin'] -= p.xmin;
                this['ymin'] -= p.ymin;
                this['xmax'] -= p.xmax;
                this['ymax'] -= p.ymax;
            }
        } else {
            this['xmin'] -= p.x;
            this['ymin'] -= p.y;
            this['xmax'] -= p.x;
            this['ymax'] -= p.y;
        }
        return this;
    };
    _proto._substract = function() {
        return this._sub.apply(this, arguments);
    };
    _proto.sub = function() {
        var e = new this.constructor(this['xmin'], this['ymin'], this['xmax'], this['ymax'], this.projection);
        return e._sub.apply(e, arguments);
    };
    _proto.substract = function() {
        return this.sub.apply(this, arguments);
    };
    _proto.round = function() {
        return new this.constructor(Math.round(this['xmin']), Math.round(this['ymin']), Math.round(this['xmax']), Math.round(this['ymax']), this.projection);
    };
    _proto._round = function() {
        this._dirty = true;
        this['xmin'] = Math.round(this['xmin']);
        this['ymin'] = Math.round(this['ymin']);
        this['xmax'] = Math.round(this['xmax']);
        this['ymax'] = Math.round(this['ymax']);
        return this;
    };
    _proto.getMin = function(out) {
        if (out) {
            out.set(this['xmin'], this['ymin']);
            return out;
        }
        return new this._clazz(this['xmin'], this['ymin']);
    };
    _proto.getMax = function(out) {
        if (out) {
            out.set(this['xmax'], this['ymax']);
            return out;
        }
        return new this._clazz(this['xmax'], this['ymax']);
    };
    _proto.getCenter = function(out) {
        var x = (this['xmin'] + this['xmax']) / 2;
        var y = (this['ymin'] + this['ymax']) / 2;
        if (out) {
            out.set(x, y);
            return out;
        }
        return new this._clazz(x, y);
    };
    _proto.isValid = function() {
        return !isNil(this['xmin']) && !isNil(this['ymin']) && !isNil(this['xmax']) && !isNil(this['ymax']);
    };
    _proto.equals = function(ext2) {
        return this['xmin'] === ext2['xmin'] && this['xmax'] === ext2['xmax'] && this['ymin'] === ext2['ymin'] && this['ymax'] === ext2['ymax'];
    };
    _proto.intersects = function(ext2) {
        this._project(this);
        this._project(ext2);
        var rxmin = Math.max(this['pxmin'], ext2['pxmin']);
        var rymin = Math.max(this['pymin'], ext2['pymin']);
        var rxmax = Math.min(this['pxmax'], ext2['pxmax']);
        var rymax = Math.min(this['pymax'], ext2['pymax']);
        var intersects = !(rxmin > rxmax || rymin > rymax);
        return intersects;
    };
    _proto.within = function(extent) {
        this._project(this);
        this._project(extent);
        return this.pxmin >= extent.pxmin && this.pxmax <= extent.pxmax && this.pymin >= extent.pymin && this.pymax <= extent.pymax;
    };
    _proto.contains = function(c) {
        if (!c) return false;
        this._project(this);
        var proj = this.projection;
        if (proj) {
            if (void 0 !== c.x) {
                var coord = TEMP_COORD0;
                if (Array.isArray(c)) {
                    coord.x = c[0];
                    coord.y = c[1];
                } else {
                    coord.x = c.x;
                    coord.y = c.y;
                }
                c = proj.project(coord, coord);
            } else if (void 0 !== c.xmin) this._project(c);
        }
        return (c.x || c.pxmin || 0) >= this.pxmin && (c.x || c.pxmax || 0) <= this.pxmax && (c.y || c.pymin || 0) >= this.pymin && (c.y || c.pymax || 0) <= this.pymax;
    };
    _proto.getWidth = function() {
        return Math.abs(this['xmax'] - this['xmin']);
    };
    _proto.getHeight = function() {
        return Math.abs(this['ymax'] - this['ymin']);
    };
    _proto.getSize = function() {
        return new maptalks_es_Size(this.getWidth(), this.getHeight());
    };
    _proto.set = function(xmin, ymin, xmax, ymax) {
        this.xmin = xmin;
        this.ymin = ymin;
        this.xmax = xmax;
        this.ymax = ymax;
        this._dirty = true;
        return this;
    };
    _proto.__combine = function(extent) {
        if (void 0 !== extent.x) {
            TEMP_EXTENT.xmin = TEMP_EXTENT.xmax = extent.x;
            TEMP_EXTENT.ymin = TEMP_EXTENT.ymax = extent.y;
            extent = TEMP_EXTENT;
        }
        this._project(extent);
        this._project(this);
        var inited = isNumber(this.pxmin);
        var xmin, ymin, xmax, ymax;
        if (inited) {
            xmin = Math.min(this['pxmin'], extent['pxmin']);
            ymin = Math.min(this['pymin'], extent['pymin']);
            xmax = Math.max(this['pxmax'], extent['pxmax']);
            ymax = Math.max(this['pymax'], extent['pymax']);
        } else {
            xmin = extent['pxmin'];
            ymin = extent['pymin'];
            xmax = extent['pxmax'];
            ymax = extent['pymax'];
        }
        var proj = this.projection;
        if (proj) {
            TEMP_COORD1.set(xmin, ymin);
            TEMP_COORD2.set(xmax, ymax);
            var min = proj.unproject(TEMP_COORD1, TEMP_COORD1), max = proj.unproject(TEMP_COORD2, TEMP_COORD2);
            xmin = min.x;
            ymin = min.y;
            xmax = max.x;
            ymax = max.y;
        }
        TEMP_COMBINE[0] = xmin;
        TEMP_COMBINE[1] = ymin;
        TEMP_COMBINE[2] = xmax;
        TEMP_COMBINE[3] = ymax;
        return TEMP_COMBINE;
    };
    _proto._combine = function(extent) {
        if (!extent || extent.isValid && !extent.isValid()) return this;
        var ext = this.__combine(extent);
        this.set(ext[0], ext[1], ext[2], ext[3]);
        this._dirty = true;
        return this;
    };
    _proto.combine = function(extent) {
        if (!extent || extent.isValid && !extent.isValid()) return this;
        var ext = this.__combine(extent);
        return new this.constructor(ext[0], ext[1], ext[2], ext[3], this.projection);
    };
    _proto.intersection = function(extent) {
        if (!this.intersects(extent)) return null;
        TEMP_COORD3.x = Math.max(this['pxmin'], extent['pxmin']);
        TEMP_COORD3.y = Math.max(this['pymin'], extent['pymin']);
        TEMP_COORD4.x = Math.min(this['pxmax'], extent['pxmax']);
        TEMP_COORD4.y = Math.min(this['pymax'], extent['pymax']);
        var min = TEMP_COORD3, max = TEMP_COORD4;
        var proj = this.projection;
        if (proj) {
            min = proj.unproject(min, min);
            max = proj.unproject(max, max);
        }
        return new this.constructor(min, max, proj);
    };
    _proto.expand = function(distance) {
        var w, h;
        if (isNumber(distance)) w = h = distance;
        else {
            w = distance['width'] || distance['x'] || distance[0] || 0;
            h = distance['height'] || distance['y'] || distance[1] || 0;
        }
        return new this.constructor(this['xmin'] - w, this['ymin'] - h, this['xmax'] + w, this['ymax'] + h, this.projection);
    };
    _proto._expand = function(distance) {
        var w, h;
        if (isNumber(distance)) w = h = distance;
        else {
            w = distance['width'] || distance['x'] || distance[0] || 0;
            h = distance['height'] || distance['y'] || distance[1] || 0;
        }
        this['xmin'] -= w;
        this['ymin'] -= h;
        this['xmax'] += w;
        this['ymax'] += h;
        this._dirty = true;
        return this;
    };
    _proto.toJSON = function() {
        return {
            xmin: this['xmin'],
            ymin: this['ymin'],
            xmax: this['xmax'],
            ymax: this['ymax']
        };
    };
    _proto.toArray = function() {
        var xmin = this['xmin'], ymin = this['ymin'], xmax = this['xmax'], ymax = this['ymax'];
        return [
            new this._clazz([
                xmin,
                ymax
            ]),
            new this._clazz([
                xmax,
                ymax
            ]),
            new this._clazz([
                xmax,
                ymin
            ]),
            new this._clazz([
                xmin,
                ymin
            ]),
            new this._clazz([
                xmin,
                ymax
            ])
        ];
    };
    _proto.toString = function() {
        return this.xmin + "," + this.ymin + "," + this.xmax + "," + this.ymax;
    };
    _proto.copy = function() {
        return new this.constructor(this['xmin'], this['ymin'], this['xmax'], this['ymax'], this.projection);
    };
    _proto.convertTo = function(fn, out) {
        if (!this.isValid()) return null;
        var e = out || new this.constructor();
        if (out) e.set(null, null, null, null);
        var coord;
        if (this._clazz === maptalks_es_Coordinate) coord = TEMP_COORD5;
        else if (this._clazz === maptalks_es_Point) coord = TEMP_POINT0;
        coord.x = this.xmin;
        coord.y = this.ymax;
        e._combine(fn(coord));
        coord.x = this.xmax;
        e._combine(fn(coord));
        coord.y = this.ymin;
        e._combine(fn(coord));
        coord.x = this.xmin;
        e._combine(fn(coord));
        return e;
    };
    _proto._project = function(ext) {
        if (!ext || !ext.isValid()) {
            if (ext) ext.pxmin = ext.pxmax = ext.pymin = ext.pymax = null;
            return;
        }
        var proj = this.projection;
        if (proj) {
            if (ext._dirty) {
                TEMP_COORD6.set(ext.xmax, ext.ymin);
                TEMP_COORD7.set(ext.xmin, ext.ymax);
                MINMAX[0] = TEMP_COORD6;
                MINMAX[1] = TEMP_COORD7;
                var minmax = proj.projectCoords(MINMAX);
                var min = minmax[0], max = minmax[1];
                ext.pxmin = Math.min(min.x, max.x);
                ext.pymin = Math.min(min.y, max.y);
                ext.pxmax = Math.max(min.x, max.x);
                ext.pymax = Math.max(min.y, max.y);
            }
            delete ext._dirty;
        } else {
            ext.pxmin = ext.xmin;
            ext.pxmax = ext.xmax;
            ext.pymin = ext.ymin;
            ext.pymax = ext.ymax;
        }
    };
    return Extent;
}();
TEMP_EXTENT = new maptalks_es_Extent(0, 0, 0, 0);
var maptalks_es_PointExtent = function(_Extent) {
    _inheritsLoose(PointExtent, _Extent);
    function PointExtent(p1, p2, p3, p4) {
        var _this;
        _this = _Extent.call(this, p1, p2, p3, p4) || this;
        _this._clazz = maptalks_es_Point;
        return _this;
    }
    return PointExtent;
}(maptalks_es_Extent);
var maptalks_es_Transformation = function() {
    function Transformation(matrix) {
        this.matrix = matrix;
    }
    var _proto = Transformation.prototype;
    _proto.transform = function(coordinates, scale, out) {
        var x = this.matrix[0] * (coordinates.x - this.matrix[2]) / scale;
        var y = -this.matrix[1] * (coordinates.y - this.matrix[3]) / scale;
        if (out) {
            out.x = x;
            out.y = y;
            return out;
        }
        return new maptalks_es_Point(x, y);
    };
    _proto.untransform = function(point, scale, out) {
        var x = point.x * scale / this.matrix[0] + this.matrix[2];
        var y = point.y * scale / -this.matrix[1] + this.matrix[3];
        if (out) {
            out.x = x;
            out.y = y;
            return out;
        }
        return new maptalks_es_Coordinate(x, y);
    };
    return Transformation;
}();
var Common = {
    project: function() {},
    unproject: function() {},
    projectCoords: function(coordinates) {
        var _this = this;
        if (!coordinates) return [];
        if (!Array.isArray(coordinates)) return this.project(coordinates);
        if (0 === coordinates.length) return [];
        if (!this.isSphere()) return forEachCoord(coordinates, this.project, this);
        if (Array.isArray(coordinates[0])) return coordinates.map(function(coords) {
            return _this.projectCoords(coords);
        });
        var circum = this.getCircum();
        var extent = this.getSphereExtent(), sx = extent.sx, sy = extent.sy;
        var wrapX, wrapY;
        var pre = coordinates[0], current, dx, dy, p;
        var prj = [
            this.project(pre)
        ];
        for(var i = 1, l = coordinates.length; i < l; i++){
            current = coordinates[i];
            dx = current.x - pre.x;
            dy = current.y - pre.y;
            p = this.project(current);
            if (Math.abs(dx) > 180) {
                if (void 0 === wrapX) wrapX = current.x > pre.x;
                if (wrapX) {
                    p._add(-circum.x * sign(dx) * sx, 0);
                    current._add(-360 * sign(dx), 0);
                }
            }
            if (Math.abs(dy) > 90) {
                if (void 0 === wrapY) wrapY = current.y < pre.y;
                if (wrapY) {
                    p._add(0, -circum.y * sign(dy) * sy);
                    current._add(0, -180 * sign(dy));
                }
            }
            pre = current;
            prj.push(p);
        }
        return prj;
    },
    unprojectCoords: function(projCoords) {
        if (!projCoords) return [];
        if (!Array.isArray(projCoords)) return this.unproject(projCoords);
        return forEachCoord(projCoords, this.unproject, this);
    },
    isSphere: function() {
        return !!this.sphere;
    },
    isOutSphere: function(pcoord) {
        if (!this.isSphere()) return false;
        var extent = this.getSphereExtent();
        return !extent.contains(pcoord);
    },
    wrapCoord: function(pcoord) {
        if (!this.isSphere()) return pcoord;
        var extent = this.getSphereExtent();
        var wrapped = new maptalks_es_Coordinate(pcoord);
        if (!extent.contains(wrapped)) {
            wrapped.x = wrap(pcoord.x, extent.xmin, extent.xmax);
            wrapped.y = wrap(pcoord.y, extent.ymin, extent.ymax);
        }
        return wrapped;
    },
    getCircum: function() {
        if (!this.circum && this.isSphere()) {
            var extent = this.getSphereExtent();
            this.circum = {
                x: extent.getWidth(),
                y: extent.getHeight()
            };
        }
        return this.circum;
    },
    getSphereExtent: function() {
        if (!this.extent && this.isSphere()) {
            var max = this.project(new maptalks_es_Coordinate(180, 90)), min = this.project(new maptalks_es_Coordinate(-180, -90));
            this.extent = new maptalks_es_Extent(min, max, this);
            this.extent.sx = max.x > min.x ? 1 : -1;
            this.extent.sy = max.y > min.y ? 1 : -1;
        }
        return this.extent;
    }
};
var Common$1 = {
    measureLength: function(c1, c2) {
        if (!Array.isArray(c1)) return this.measureLenBetween(c1, c2);
        var len = 0;
        for(var i = 0, l = c1.length; i < l - 1; i++)len += this.measureLenBetween(c1[i], c1[i + 1]);
        return len;
    }
};
var Identity = extend({
    measure: 'IDENTITY',
    measureLenBetween: function(c1, c2) {
        if (!c1 || !c2) return 0;
        try {
            return Math.sqrt(Math.pow(c1.x - c2.x, 2) + Math.pow(c1.y - c2.y, 2));
        } catch (err) {
            return 0;
        }
    },
    measureArea: function(coordinates) {
        if (!Array.isArray(coordinates)) return 0;
        var area = 0;
        for(var i = 0, len = coordinates.length; i < len; i++){
            var c1 = coordinates[i];
            var c2 = null;
            c2 = i === len - 1 ? coordinates[0] : coordinates[i + 1];
            area += c1.x * c2.y - c1.y * c2.x;
        }
        return Math.abs(area / 2);
    },
    locate: function(c, xDist, yDist) {
        c = new maptalks_es_Coordinate(c.x, c.y);
        return this._locate(c, xDist, yDist);
    },
    _locate: function(c, xDist, yDist) {
        if (!c) return null;
        if (!xDist) xDist = 0;
        if (!yDist) yDist = 0;
        if (!xDist && !yDist) return c;
        c.x = c.x + xDist;
        c.y = c.y + yDist;
        return c;
    },
    rotate: function(c, pivot, angle) {
        c = new maptalks_es_Coordinate(c.x, c.y);
        return this._rotate(c, pivot, angle);
    },
    _rotate: function() {
        var tmp = new maptalks_es_Point(0, 0);
        return function(c, pivot, angle) {
            tmp.x = c.x - pivot.x;
            tmp.y = c.y - pivot.y;
            tmp._rotate(angle * Math.PI / 180);
            c.x = pivot.x + tmp.x;
            c.y = pivot.y + tmp.y;
            return c;
        };
    }()
}, Common$1);
var maptalks_es_Sphere = function() {
    function Sphere(radius) {
        this.radius = radius;
    }
    var _proto = Sphere.prototype;
    _proto.measureLenBetween = function(c1, c2) {
        if (!c1 || !c2) return 0;
        var b = toRadian(c1.y);
        var d = toRadian(c2.y), e = b - d, f = toRadian(c1.x) - toRadian(c2.x);
        b = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(e / 2), 2) + Math.cos(b) * Math.cos(d) * Math.pow(Math.sin(f / 2), 2)));
        b *= this.radius;
        return Math.round(1E5 * b) / 1E5;
    };
    _proto.measureArea = function(coordinates) {
        var a = toRadian(this.radius);
        var b = 0, c = coordinates, d = c.length;
        if (d < 3) return 0;
        var i;
        for(i = 0; i < d - 1; i++){
            var e = c[i], f = c[i + 1];
            b += e.x * a * Math.cos(toRadian(e.y)) * f.y * a - f.x * a * Math.cos(toRadian(f.y)) * e.y * a;
        }
        d = c[i];
        c = c[0];
        b += d.x * a * Math.cos(toRadian(d.y)) * c.y * a - c.x * a * Math.cos(toRadian(c.y)) * d.y * a;
        return 0.5 * Math.abs(b);
    };
    _proto.locate = function(c, xDist, yDist) {
        c = new maptalks_es_Coordinate(c.x, c.y);
        return this._locate(c, xDist, yDist);
    };
    _proto._locate = function(c, xDist, yDist) {
        if (!c) return null;
        if (!xDist) xDist = 0;
        if (!yDist) yDist = 0;
        if (!xDist && !yDist) return c;
        var x, y;
        var ry = toRadian(c.y);
        if (0 !== yDist) {
            var dy = Math.abs(yDist);
            var sy = 2 * Math.sin(dy / (2 * this.radius));
            ry += sy * (yDist > 0 ? 1 : -1);
            y = wrap(180 * ry / Math.PI, -90, 90);
        } else y = c.y;
        if (0 !== xDist) {
            var dx = Math.abs(xDist);
            var rx = toRadian(c.x);
            var sx = 2 * Math.sqrt(Math.pow(Math.sin(dx / (2 * this.radius)), 2) / Math.pow(Math.cos(ry), 2));
            rx += sx * (xDist > 0 ? 1 : -1);
            x = wrap(180 * rx / Math.PI, -180, 180);
        } else x = c.x;
        c.x = x;
        c.y = y;
        return c;
    };
    _proto.rotate = function(c, pivot, angle) {
        c = new maptalks_es_Coordinate(c);
        return this._rotate(c, pivot, angle);
    };
    _proto._rotate = function(c, pivot, angle) {
        var initialAngle = rhumbBearing(pivot, c);
        var finalAngle = initialAngle - angle;
        var distance = this.measureLenBetween(pivot, c);
        c.x = pivot.x;
        c.y = pivot.y;
        return calculateRhumbDestination(c, distance, finalAngle, this.radius);
    };
    return Sphere;
}();
function rhumbBearing(start, end, options) {
    if (void 0 === options) options = {};
    var bear360;
    bear360 = options.final ? calculateRhumbBearing(end, start) : calculateRhumbBearing(start, end);
    var bear180 = bear360 > 180 ? -(360 - bear360) : bear360;
    return bear180;
}
function calculateRhumbBearing(from, to) {
    var phi1 = toRadian(from.y);
    var phi2 = toRadian(to.y);
    var deltaLambda = toRadian(to.x - from.x);
    if (deltaLambda > Math.PI) deltaLambda -= 2 * Math.PI;
    if (deltaLambda < -Math.PI) deltaLambda += 2 * Math.PI;
    var deltaPsi = Math.log(Math.tan(phi2 / 2 + Math.PI / 4) / Math.tan(phi1 / 2 + Math.PI / 4));
    var theta = Math.atan2(deltaLambda, deltaPsi);
    return (toDegree(theta) + 360) % 360;
}
function calculateRhumbDestination(origin, distance, bearing, radius) {
    var delta = distance / radius;
    var lambda1 = origin.x * Math.PI / 180;
    var phi1 = toRadian(origin.y);
    var theta = toRadian(bearing);
    var DeltaPhi = delta * Math.cos(theta);
    var phi2 = phi1 + DeltaPhi;
    if (Math.abs(phi2) > Math.PI / 2) phi2 = phi2 > 0 ? Math.PI - phi2 : -Math.PI - phi2;
    var DeltaPsi = Math.log(Math.tan(phi2 / 2 + Math.PI / 4) / Math.tan(phi1 / 2 + Math.PI / 4));
    var q = Math.abs(DeltaPsi) > 10e-12 ? DeltaPhi / DeltaPsi : Math.cos(phi1);
    var DeltaLambda = delta * Math.sin(theta) / q;
    var lambda2 = lambda1 + DeltaLambda;
    origin.x = (180 * lambda2 / Math.PI + 540) % 360 - 180;
    origin.y = 180 * phi2 / Math.PI;
    return origin;
}
var WGS84Sphere = extend({
    measure: 'EPSG:4326',
    sphere: new maptalks_es_Sphere(6378137),
    measureLenBetween: function() {
        return this.sphere.measureLenBetween.apply(this.sphere, arguments);
    },
    measureArea: function() {
        return this.sphere.measureArea.apply(this.sphere, arguments);
    },
    _locate: function() {
        return this.sphere._locate.apply(this.sphere, arguments);
    },
    locate: function() {
        return this.sphere.locate.apply(this.sphere, arguments);
    },
    _rotate: function() {
        return this.sphere._rotate.apply(this.sphere, arguments);
    },
    rotate: function() {
        return this.sphere.rotate.apply(this.sphere, arguments);
    }
}, Common$1);
var BaiduSphere = extend({
    measure: 'BAIDU',
    sphere: new maptalks_es_Sphere(6370996.81),
    measureLenBetween: function() {
        return this.sphere.measureLenBetween.apply(this.sphere, arguments);
    },
    measureArea: function() {
        return this.sphere.measureArea.apply(this.sphere, arguments);
    },
    _locate: function() {
        return this.sphere._locate.apply(this.sphere, arguments);
    },
    locate: function() {
        return this.sphere.locate.apply(this.sphere, arguments);
    },
    _rotate: function() {
        return this.sphere._rotate.apply(this.sphere, arguments);
    },
    rotate: function() {
        return this.sphere.rotate.apply(this.sphere, arguments);
    }
}, Common$1);
var DEFAULT = WGS84Sphere;
var measurers = {};
function registerMeasurer(m) {
    measurers[m.measure] = m;
}
registerMeasurer(Identity);
registerMeasurer(WGS84Sphere);
registerMeasurer(BaiduSphere);
var Measurer = {
    getInstance: function(name) {
        if (!name) return DEFAULT;
        for(var p in measurers)if (hasOwn(measurers, p)) {
            var mName = measurers[p]['measure'];
            if (!mName) continue;
            if (name.toLowerCase() === mName.toLowerCase()) return measurers[p];
        }
        return null;
    }
};
var maptalks_es_delta = 1E-7;
var EPSG3857 = extend({}, Common, {
    code: 'EPSG:3857',
    rad: Math.PI / 180,
    metersPerDegree: 6378137 * Math.PI / 180,
    maxLatitude: 85.0511287798,
    project: function(lnglat, out) {
        var rad = this.rad, metersPerDegree = this.metersPerDegree, max = this.maxLatitude;
        var lng = lnglat.x, lat = Math.max(Math.min(max, lnglat.y), -max);
        var c;
        c = 0 === lat ? 0 : Math.log(Math.tan((90 + lat) * rad / 2)) / rad;
        var x = lng * metersPerDegree;
        var y = c * metersPerDegree;
        if (out) {
            out.x = x;
            out.y = y;
            return out;
        }
        return new maptalks_es_Coordinate(x, y);
    },
    unproject: function(pLnglat, out) {
        var rad = this.rad;
        var metersPerDegree = this.metersPerDegree;
        var x = pLnglat.x / metersPerDegree;
        var y = pLnglat.y;
        var c;
        if (0 === y) c = 0;
        else {
            c = y / metersPerDegree;
            c = (2 * Math.atan(Math.exp(c * rad)) - Math.PI / 2) / rad;
        }
        if (Math.abs(Math.abs(x) - 180) < maptalks_es_delta) x = 180 * sign(x);
        if (Math.abs(Math.abs(c) - this.maxLatitude) < maptalks_es_delta) c = sign(c) * this.maxLatitude;
        var rx = wrap(x, -180, 180);
        var ry = wrap(c, -this.maxLatitude, this.maxLatitude);
        if (out) {
            out.x = rx;
            out.y = ry;
            return out;
        }
        return new maptalks_es_Coordinate(rx, ry);
    }
}, WGS84Sphere);
var PROJ4326 = extend({}, Common, {
    code: 'EPSG:4326',
    project: function(p, out) {
        if (out) {
            out.x = p.x;
            out.y = p.y;
            return out;
        }
        return new maptalks_es_Coordinate(p);
    },
    unproject: function(p, out) {
        if (out) {
            out.x = p.x;
            out.y = p.y;
            return out;
        }
        return new maptalks_es_Coordinate(p);
    }
}, WGS84Sphere);
var Projection_EPSG4490 = extend({}, PROJ4326, {
    code: 'EPSG:4490'
});
var Projection_Baidu = extend({}, Common, {
    code: 'BAIDU',
    project: function(p, out) {
        return this.convertLL2MC(p, out);
    },
    unproject: function(p, out) {
        return this.convertMC2LL(p, out);
    }
}, BaiduSphere, {
    EARTHRADIUS: 6370996.81,
    MCBAND: [
        12890594.86,
        8362377.87,
        5591021,
        3481989.83,
        1678043.12,
        0
    ],
    LLBAND: [
        75,
        60,
        45,
        30,
        15,
        0
    ],
    MC2LL: [
        [
            1.410526172116255e-8,
            0.00000898305509648872,
            -1.9939833816331,
            200.9824383106796,
            -187.2403703815547,
            91.6087516669843,
            -23.38765649603339,
            2.57121317296198,
            -0.03801003308653,
            17337981.2
        ],
        [
            -0.000000007435856389565537,
            0.000008983055097726239,
            -0.78625201886289,
            96.32687599759846,
            -1.85204757529826,
            -59.36935905485877,
            47.40033549296737,
            -16.50741931063887,
            2.28786674699375,
            10260144.86
        ],
        [
            -0.00000003030883460898826,
            0.00000898305509983578,
            0.30071316287616,
            59.74293618442277,
            7.357984074871,
            -25.38371002664745,
            13.45380521110908,
            -3.29883767235584,
            0.32710905363475,
            6856817.37
        ],
        [
            -0.00000001981981304930552,
            0.000008983055099779535,
            0.03278182852591,
            40.31678527705744,
            0.65659298677277,
            -4.44255534477492,
            0.85341911805263,
            0.12923347998204,
            -0.04625736007561,
            4482777.06
        ],
        [
            3.09191371068437e-9,
            0.000008983055096812155,
            0.00006995724062,
            23.10934304144901,
            -0.00023663490511,
            -0.6321817810242,
            -0.00663494467273,
            0.03430082397953,
            -0.00466043876332,
            2555164.4
        ],
        [
            2.890871144776878e-9,
            0.000008983055095805407,
            -0.00000003068298,
            7.47137025468032,
            -0.00000353937994,
            -0.02145144861037,
            -0.00001234426596,
            0.00010322952773,
            -0.00000323890364,
            826088.5
        ]
    ],
    LL2MC: [
        [
            -0.0015702102444,
            111320.7020616939,
            1704480524535203,
            -10338987376042340,
            26112667856603880,
            -35149669176653700,
            26595700718403920,
            -10725012454188240,
            1800819912950474,
            82.5
        ],
        [
            0.0008277824516172526,
            111320.7020463578,
            647795574.6671607,
            -4082003173.641316,
            10774905663.51142,
            -15171875531.51559,
            12053065338.62167,
            -5124939663.577472,
            913311935.9512032,
            67.5
        ],
        [
            0.00337398766765,
            111320.7020202162,
            4481351.045890365,
            -23393751.19931662,
            79682215.47186455,
            -115964993.2797253,
            97236711.15602145,
            -43661946.33752821,
            8477230.501135234,
            52.5
        ],
        [
            0.00220636496208,
            111320.7020209128,
            51751.86112841131,
            3796837.749470245,
            992013.7397791013,
            -1221952.21711287,
            1340652.697009075,
            -620943.6990984312,
            144416.9293806241,
            37.5
        ],
        [
            -0.0003441963504368392,
            111320.7020576856,
            278.2353980772752,
            2485758.690035394,
            6070.750963243378,
            54821.18345352118,
            9540.606633304236,
            -2710.55326746645,
            1405.483844121726,
            22.5
        ],
        [
            -0.0003218135878613132,
            111320.7020701615,
            0.00369383431289,
            823725.6402795718,
            0.46104986909093,
            2351.343141331292,
            1.58060784298199,
            8.77738589078284,
            0.37238884252424,
            7.45
        ]
    ],
    convertMC2LL: function(cB, out) {
        var cE;
        for(var cD = 0, len = this.MCBAND.length; cD < len; cD++)if (Math.abs(cB.y) >= this.MCBAND[cD]) {
            cE = this.MC2LL[cD];
            break;
        }
        var T = this.convertor(cB, cE, out);
        return T;
    },
    convertLL2MC: function(T, out) {
        var cD, cC, len;
        T.x = this.getLoop(T.x, -180, 180);
        T.y = this.getRange(T.y, -74, 74);
        var cB = new maptalks_es_Coordinate(T.x, T.y);
        for(cC = 0, len = this.LLBAND.length; cC < len; cC++)if (cB.y >= this.LLBAND[cC]) {
            cD = this.LL2MC[cC];
            break;
        }
        if (!cD) {
            for(cC = this.LLBAND.length - 1; cC >= 0; cC--)if (cB.y <= -this.LLBAND[cC]) {
                cD = this.LL2MC[cC];
                break;
            }
        }
        var cE = this.convertor(T, cD, out);
        return cE;
    },
    convertor: function(cC, cD, out) {
        if (!cC || !cD) return null;
        var T = cD[0] + cD[1] * Math.abs(cC.x);
        var cB = Math.abs(cC.y) / cD[9];
        var cE = cD[2] + cD[3] * cB + cD[4] * cB * cB + cD[5] * cB * cB * cB + cD[6] * cB * cB * cB * cB + cD[7] * cB * cB * cB * cB * cB + cD[8] * cB * cB * cB * cB * cB * cB;
        T *= cC.x < 0 ? -1 : 1;
        cE *= cC.y < 0 ? -1 : 1;
        if (out) {
            out.x = T;
            out.y = cE;
            return out;
        }
        return new maptalks_es_Coordinate(T, cE);
    },
    toRadians: function(T) {
        return Math.PI * T / 180;
    },
    toDegrees: function(T) {
        return 180 * T / Math.PI;
    },
    getRange: function(cC, cB, T) {
        if (null != cB) cC = Math.max(cC, cB);
        if (null != T) cC = Math.min(cC, T);
        return cC;
    },
    getLoop: function(cC, cB, T) {
        if (cC === 1 / 0) return T;
        if (cC === -1 / 0) return cB;
        while(cC > T)cC -= T - cB;
        while(cC < cB)cC += T - cB;
        return cC;
    }
});
var Projection_IDENTITY = extend({}, Common, {
    code: 'IDENTITY',
    project: function(p, out) {
        if (out) {
            out.x = p.x;
            out.y = p.y;
            return out;
        }
        return p.copy();
    },
    unproject: function(p, out) {
        if (out) {
            out.x = p.x;
            out.y = p.y;
            return out;
        }
        return p.copy();
    }
}, Identity);
var DEFAULT$1 = EPSG3857;
var projections = /*#__PURE__*/ Object.freeze({
    EPSG3857: EPSG3857,
    DEFAULT: DEFAULT$1,
    EPSG4326: PROJ4326,
    EPSG4490: Projection_EPSG4490,
    BAIDU: Projection_Baidu,
    IDENTITY: Projection_IDENTITY,
    Common: Common
});
var Renderable = function(Base) {
    return function(_Base) {
        _inheritsLoose(_class, _Base);
        function _class() {
            return _Base.apply(this, arguments) || this;
        }
        _class.registerRenderer = function(name, clazz) {
            var proto = this.prototype;
            var parentProto = Object.getPrototypeOf(proto);
            if (!proto._rendererClasses || proto._rendererClasses === parentProto._rendererClasses) proto._rendererClasses = proto._rendererClasses ? Object.create(proto._rendererClasses) : {};
            proto._rendererClasses[name.toLowerCase()] = clazz;
            return this;
        };
        _class.getRendererClass = function(name) {
            var proto = this.prototype;
            if (!proto._rendererClasses) return null;
            return proto._rendererClasses[name.toLowerCase()];
        };
        return _class;
    }(Base);
};
var maptalks_es_CanvasRenderer = function(_Class) {
    _inheritsLoose(CanvasRenderer, _Class);
    function CanvasRenderer(layer) {
        var _this;
        _this = _Class.call(this) || this;
        _this.layer = layer;
        _this._painted = false;
        _this._drawTime = 0;
        _this.setToRedraw();
        return _this;
    }
    var _proto = CanvasRenderer.prototype;
    _proto.render = function(framestamp) {
        this.prepareRender();
        if (!this.getMap() || !this.layer.isVisible()) return;
        if (!this.resources) this.resources = new maptalks_es_ResourceCache();
        this.checkAndDraw(this._tryToDraw, framestamp);
    };
    _proto.checkAndDraw = function(drawFn) {
        var _this2 = this;
        for(var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++)args[_key - 1] = arguments[_key];
        if (this.checkResources) {
            var resources = this.checkResources();
            if (resources.length > 0) {
                this._loadingResource = true;
                this.loadResources(resources).then(function() {
                    _this2._loadingResource = false;
                    if (_this2.layer) {
                        _this2.layer.fire('resourceload');
                        _this2.setToRedraw();
                    }
                });
            } else drawFn.call.apply(drawFn, [
                this
            ].concat(args));
        } else drawFn.call.apply(drawFn, [
            this
        ].concat(args));
    };
    _proto.testIfNeedRedraw = function() {
        var map = this.getMap();
        if (this._loadingResource) return false;
        if (this._toRedraw) return true;
        if (map.isInteracting() && !this.drawOnInteracting) return false;
        if (this.needToRedraw()) return true;
        return false;
    };
    _proto.needToRedraw = function() {
        var map = this.getMap();
        if (map.isInteracting() || map.getRenderer().isViewChanged()) return !(!map.getPitch() && map.isMoving() && !map.isZooming() && !map.isRotating() && !this.layer.options['forceRenderOnMoving']);
        return false;
    };
    _proto.onSkipDrawOnInteracting = function() {};
    _proto.isLoadingResource = function() {
        return this._loadingResource;
    };
    _proto.isRenderComplete = function() {
        return !!this._renderComplete;
    };
    _proto.mustRenderOnInteracting = function() {
        return !this._painted;
    };
    _proto.setToRedraw = function() {
        this._toRedraw = true;
        return this;
    };
    _proto.setCanvasUpdated = function() {
        this._canvasUpdated = true;
        return this;
    };
    _proto.isCanvasUpdated = function() {
        return !!this._canvasUpdated;
    };
    _proto.remove = function() {
        this.onRemove();
        delete this._loadingResource;
        delete this.southWest;
        delete this.canvas;
        delete this.context;
        delete this.canvasExtent2D;
        delete this._extent2D;
        delete this.resources;
        delete this.layer;
    };
    _proto.onRemove = function() {};
    _proto.onAdd = function() {};
    _proto.getMap = function() {
        if (!this.layer) return null;
        return this.layer.getMap();
    };
    _proto.getCanvasImage = function() {
        var map = this.getMap();
        this._canvasUpdated = false;
        if (this._renderZoom !== map.getZoom() || !this.canvas || !this._extent2D) return null;
        if (this.isBlank()) return null;
        if (this.layer.isEmpty && this.layer.isEmpty()) return null;
        var containerPoint = map._pointToContainerPoint(this.southWest)._add(0, -map.height);
        return {
            image: this.canvas,
            layer: this.layer,
            point: containerPoint
        };
    };
    _proto.clear = function() {
        this.clearCanvas();
    };
    _proto.isBlank = function() {
        if (!this._painted) return true;
        return false;
    };
    _proto.show = function() {
        this.setToRedraw();
    };
    _proto.hide = function() {
        this.clear();
        this.setToRedraw();
    };
    _proto.setZIndex = function() {
        this.setToRedraw();
    };
    _proto.hitDetect = function(point) {
        if (!this.context || this.layer.isEmpty && this.layer.isEmpty() || this.isBlank() || this._errorThrown) return false;
        var map = this.getMap();
        var r = map.getDevicePixelRatio();
        var size = map.getSize();
        if (point.x < 0 || point.x > size['width'] * r || point.y < 0 || point.y > size['height'] * r) return false;
        try {
            var imgData = this.context.getImageData(r * point.x, r * point.y, 1, 1).data;
            if (imgData[3] > 0) return true;
        } catch (error) {
            if (!this._errorThrown) {
                if (console) console.warn('hit detect failed with tainted canvas, some geometries have external resources in another domain:\n', error);
                this._errorThrown = true;
            }
        }
        return false;
    };
    _proto.loadResources = function(resourceUrls) {
        if (!this.resources) this.resources = new maptalks_es_ResourceCache();
        var resources = this.resources, promises = [];
        if (isArrayHasData(resourceUrls)) {
            var cache = {};
            for(var i = resourceUrls.length - 1; i >= 0; i--){
                var url = resourceUrls[i];
                if (!!url && !!url.length && !cache[url.join('-')]) {
                    cache[url.join('-')] = 1;
                    if (!resources.isResourceLoaded(url, true)) promises.push(new Promise$1(this._promiseResource(url)));
                }
            }
        }
        return Promise$1.all(promises);
    };
    _proto.prepareRender = function() {
        delete this._renderComplete;
        var map = this.getMap();
        this._renderZoom = map.getZoom();
        this.canvasExtent2D = this._extent2D = map._get2DExtent();
        this.southWest = map._containerPointToPoint(new maptalks_es_Point(0, map.height));
    };
    _proto.createCanvas = function() {
        if (this.canvas) return;
        var map = this.getMap();
        var size = map.getSize();
        var r = map.getDevicePixelRatio(), w = r * size.width, h = r * size.height;
        if (this.layer._canvas) {
            var canvas = this.layer._canvas;
            canvas.width = w;
            canvas.height = h;
            if (canvas.style) {
                canvas.style.width = size.width + 'px';
                canvas.style.height = size.height + 'px';
            }
            this.canvas = this.layer._canvas;
        } else this.canvas = Canvas.createCanvas(w, h, map.CanvasClass);
        this.onCanvasCreate();
    };
    _proto.onCanvasCreate = function() {};
    _proto.createContext = function() {
        if (this.gl && this.gl.canvas === this.canvas || this.context) return;
        this.context = this.canvas.getContext('2d');
        if (!this.context) return;
        if (this.layer.options['globalCompositeOperation']) this.context.globalCompositeOperation = this.layer.options['globalCompositeOperation'];
        var dpr = this.getMap().getDevicePixelRatio();
        if (1 !== dpr) this.context.scale(dpr, dpr);
    };
    _proto.resetCanvasTransform = function() {
        if (!this.context) return;
        var dpr = this.getMap().getDevicePixelRatio();
        this.context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    _proto.resizeCanvas = function(canvasSize) {
        var canvas = this.canvas;
        if (!canvas) return;
        var size = canvasSize || this.getMap().getSize();
        var r = this.getMap().getDevicePixelRatio();
        if (canvas.width === r * size.width && canvas.height === r * size.height) return;
        canvas.height = r * size.height;
        canvas.width = r * size.width;
        if (1 !== r && this.context) this.context.scale(r, r);
        if (this.layer._canvas && canvas.style) {
            canvas.style.width = size.width + 'px';
            canvas.style.height = size.height + 'px';
        }
    };
    _proto.clearCanvas = function() {
        if (!this.context) return;
        Canvas.clearRect(this.context, 0, 0, this.canvas.width, this.canvas.height);
    };
    _proto.prepareCanvas = function() {
        if (this.canvas) {
            this.resetCanvasTransform();
            this.clearCanvas();
            this.resizeCanvas();
        } else {
            this.createCanvas();
            this.createContext();
            this.layer.onCanvasCreate();
            this.layer.fire('canvascreate', {
                context: this.context,
                gl: this.gl
            });
        }
        delete this._maskExtent;
        var mask = this.layer.getMask();
        if (!mask) {
            this.layer.fire('renderstart', {
                context: this.context,
                gl: this.gl
            });
            return null;
        }
        var maskExtent2D = this._maskExtent = mask._getMaskPainter().get2DExtent();
        if (!maskExtent2D.intersects(this._extent2D)) {
            this.layer.fire('renderstart', {
                context: this.context,
                gl: this.gl
            });
            return maskExtent2D;
        }
        this.layer.fire('renderstart', {
            context: this.context,
            gl: this.gl
        });
        return maskExtent2D;
    };
    _proto.clipCanvas = function(context) {
        var mask = this.layer.getMask();
        if (!mask) return false;
        var old = this.southWest;
        var map = this.getMap();
        this.southWest = map._containerPointToPoint(new maptalks_es_Point(0, map.height));
        context.save();
        var dpr = map.getDevicePixelRatio();
        if (1 !== dpr) {
            context.save();
            context.scale(dpr, dpr);
        }
        if (mask.getGeometries) {
            context.isMultiClip = true;
            var masks = mask.getGeometries() || [];
            context.beginPath();
            masks.forEach(function(_mask) {
                var painter = _mask._getMaskPainter();
                painter.paint(null, context);
            });
            context.stroke();
            delete context.isMultiClip;
        } else {
            var painter = mask._getMaskPainter();
            painter.paint(null, context);
        }
        if (1 !== dpr) context.restore();
        context.clip();
        this.southWest = old;
        return true;
    };
    _proto.getViewExtent = function() {
        return {
            extent: this._extent2D,
            maskExtent: this._maskExtent,
            zoom: this._renderZoom,
            southWest: this.southWest
        };
    };
    _proto.completeRender = function() {
        if (this.getMap()) {
            this._renderComplete = true;
            this.layer.fire('renderend', {
                context: this.context,
                gl: this.gl
            });
            this.setCanvasUpdated();
        }
    };
    _proto.getEvents = function() {
        return {
            _zoomstart: this.onZoomStart,
            _zooming: this.onZooming,
            _zoomend: this.onZoomEnd,
            _resize: this.onResize,
            _movestart: this.onMoveStart,
            _moving: this.onMoving,
            _moveend: this.onMoveEnd,
            _dragrotatestart: this.onDragRotateStart,
            _dragrotating: this.onDragRotating,
            _dragrotateend: this.onDragRotateEnd,
            _spatialreferencechange: this.onSpatialReferenceChange
        };
    };
    _proto.onZoomStart = function() {};
    _proto.onZoomEnd = function() {
        this.setToRedraw();
    };
    _proto.onZooming = function() {};
    _proto.onMoveStart = function() {};
    _proto.onMoving = function() {};
    _proto.onMoveEnd = function() {
        this.setToRedraw();
    };
    _proto.onResize = function() {
        delete this._extent2D;
        this.resizeCanvas();
        this.setToRedraw();
    };
    _proto.onDragRotateStart = function() {};
    _proto.onDragRotating = function() {};
    _proto.onDragRotateEnd = function() {
        this.setToRedraw();
    };
    _proto.onSpatialReferenceChange = function() {};
    _proto.getDrawTime = function() {
        return this._drawTime;
    };
    _proto._tryToDraw = function(framestamp) {
        this._toRedraw = false;
        if (!this.canvas && this.layer.isEmpty && this.layer.isEmpty()) {
            this._renderComplete = true;
            return;
        }
        this._drawAndRecord(framestamp);
    };
    _proto._drawAndRecord = function(framestamp) {
        if (!this.getMap()) return;
        var painted = this._painted;
        this._painted = true;
        var t = now();
        this.draw(framestamp);
        t = now() - t;
        this._drawTime = painted ? t : t / 2;
        if (painted && this.layer && this.layer.options['logDrawTime']) console.log(this.layer.getId(), 'frameTimeStamp:', framestamp, 'drawTime:', this._drawTime);
    };
    _proto._promiseResource = function(url) {
        var me = this, resources = this.resources, crossOrigin = this.layer.options['crossOrigin'];
        return function(resolve) {
            if (resources.isResourceLoaded(url, true)) {
                resolve(url);
                return;
            }
            var img = new Image();
            if (!isNil(crossOrigin)) img['crossOrigin'] = crossOrigin;
            if (isSVG(url[0]) && !IS_NODE) {
                if (url[1]) url[1] *= 2;
                if (url[2]) url[2] *= 2;
            }
            img.onload = function() {
                me._cacheResource(url, img);
                resolve(url);
            };
            img.onabort = function(err) {
                if (console) console.warn('image loading aborted: ' + url[0]);
                if (err) {
                    if (console) console.warn(err);
                }
                resolve(url);
            };
            img.onerror = function(err) {
                if (err && 'undefined' != typeof console) console.warn(err);
                resources.markErrorResource(url);
                resolve(url);
            };
            loadImage(img, url);
        };
    };
    _proto._cacheResource = function(url, img) {
        if (!this.layer || !this.resources) return;
        var w = url[1], h = url[2];
        if (this.layer.options['cacheSvgOnCanvas'] && 1 === isSVG(url[0]) && (Browser$1.edge || Browser$1.ie)) {
            if (isNil(w)) w = img.width || this.layer.options['defaultIconSize'][0];
            if (isNil(h)) h = img.height || this.layer.options['defaultIconSize'][1];
            var canvas = Canvas.createCanvas(w, h);
            Canvas.image(canvas.getContext('2d'), img, 0, 0, w, h);
            img = canvas;
        }
        this.resources.addResource(url, img);
    };
    return CanvasRenderer;
}(maptalks_es_Class);
var maptalks_es_ResourceCache = function() {
    function ResourceCache() {
        this.resources = {};
        this._errors = {};
    }
    var _proto2 = ResourceCache.prototype;
    _proto2.addResource = function(url, img) {
        this.resources[url[0]] = {
            image: img,
            width: +url[1],
            height: +url[2]
        };
    };
    _proto2.isResourceLoaded = function(url, checkSVG) {
        if (!url) return false;
        var imgUrl = this._getImgUrl(url);
        if (this._errors[imgUrl]) return true;
        var img = this.resources[imgUrl];
        if (!img) return false;
        if (checkSVG && isSVG(url[0]) && (+url[1] > img.width || +url[2] > img.height)) return false;
        return true;
    };
    _proto2.getImage = function(url) {
        var imgUrl = this._getImgUrl(url);
        if (!this.isResourceLoaded(url) || this._errors[imgUrl]) return null;
        return this.resources[imgUrl].image;
    };
    _proto2.markErrorResource = function(url) {
        this._errors[this._getImgUrl(url)] = 1;
    };
    _proto2.merge = function(res) {
        if (!res) return this;
        for(var p in res.resources){
            var img = res.resources[p];
            this.addResource([
                p,
                img.width,
                img.height
            ], img.image);
        }
        return this;
    };
    _proto2.forEach = function(fn) {
        if (!this.resources) return this;
        for(var p in this.resources)if (hasOwn(this.resources, p)) fn(p, this.resources[p]);
        return this;
    };
    _proto2._getImgUrl = function(url) {
        if (!Array.isArray(url)) return url;
        return url[0];
    };
    return ResourceCache;
}();
function clipLine(points, bounds, round, noCut) {
    var parts = [];
    var k = 0, segment;
    for(var j = 0, l = points.length; j < l - 1; j++){
        segment = clipSegment(points[j], points[j + 1], bounds, j, round, noCut);
        if (!!segment) {
            parts[k] = parts[k] || [];
            parts[k].push({
                point: segment[0],
                index: j
            });
            if (segment[1] !== points[j + 1] || j === l - 2) {
                parts[k].push({
                    point: segment[1],
                    index: j + 1
                });
                k++;
            }
        }
    }
    return parts;
}
var _lastCode;
function clipSegment(a, b, bounds, useLastCode, round, noCut) {
    var codeA = useLastCode ? _lastCode : _getBitCode(a, bounds), codeB = _getBitCode(b, bounds), codeOut, p, newCode;
    _lastCode = codeB;
    while(true){
        if (!(codeA | codeB)) return [
            a,
            b
        ];
        if (codeA & codeB) return false;
        if (noCut) return [
            a,
            b
        ];
        codeOut = codeA || codeB;
        p = _getEdgeIntersection(a, b, codeOut, bounds, round);
        newCode = _getBitCode(p, bounds);
        if (codeOut === codeA) {
            a = p;
            codeA = newCode;
        } else {
            b = p;
            codeB = newCode;
        }
    }
}
function clipPolygon(points, bounds, round) {
    var edges = [
        1,
        4,
        2,
        8
    ];
    var clippedPoints, i, j, k, a, b, len, edge, p;
    for(i = 0, len = points.length; i < len; i++)points[i]._code = _getBitCode(points[i], bounds);
    for(k = 0; k < 4; k++){
        edge = edges[k];
        clippedPoints = [];
        for(i = 0, len = points.length, j = len - 1; i < len; j = i++){
            a = points[i];
            b = points[j];
            if (a._code & edge) {
                if (!(b._code & edge)) {
                    p = _getEdgeIntersection(b, a, edge, bounds, round);
                    p._code = _getBitCode(p, bounds);
                    clippedPoints.push(p);
                }
            } else {
                if (b._code & edge) {
                    p = _getEdgeIntersection(b, a, edge, bounds, round);
                    p._code = _getBitCode(p, bounds);
                    clippedPoints.push(p);
                }
                clippedPoints.push(a);
            }
        }
        points = clippedPoints;
    }
    return points;
}
function _getEdgeIntersection(a, b, code, bounds, round) {
    var dx = b.x - a.x, dy = b.y - a.y, min = bounds.getMin(), max = bounds.getMax();
    var x, y;
    if (8 & code) {
        x = a.x + dx * (max.y - a.y) / dy;
        y = max.y;
    } else if (4 & code) {
        x = a.x + dx * (min.y - a.y) / dy;
        y = min.y;
    } else if (2 & code) {
        x = max.x;
        y = a.y + dy * (max.x - a.x) / dx;
    } else if (1 & code) {
        x = min.x;
        y = a.y + dy * (min.x - a.x) / dx;
    }
    var p = new maptalks_es_Point(x, y);
    if (round) p._round();
    return p;
}
function _getBitCode(p, bounds) {
    var code = 0;
    if (p.x < bounds.getMin().x) code |= 1;
    else if (p.x > bounds.getMax().x) code |= 2;
    if (p.y < bounds.getMin().y) code |= 4;
    else if (p.y > bounds.getMax().y) code |= 8;
    return code;
}
function withInEllipse(point, center, southeast, tolerance) {
    point = new maptalks_es_Point(point);
    var a = Math.abs(southeast.x - center.x), b = Math.abs(southeast.y - center.y), c = Math.sqrt(Math.abs(a * a - b * b)), xfocus = a >= b;
    var f1, f2, d;
    if (xfocus) {
        f1 = new maptalks_es_Point(center.x - c, center.y);
        f2 = new maptalks_es_Point(center.x + c, center.y);
        d = 2 * a;
    } else {
        f1 = new maptalks_es_Point(center.x, center.y - c);
        f2 = new maptalks_es_Point(center.x, center.y + c);
        d = 2 * b;
    }
    return point.distanceTo(f1) + point.distanceTo(f2) <= d + 2 * tolerance;
}
var maptalks_es_Symbolizer = function() {
    function Symbolizer() {}
    var _proto = Symbolizer.prototype;
    _proto.getMap = function() {
        return this.geometry.getMap();
    };
    _proto.getPainter = function() {
        return this.painter;
    };
    _proto.isDynamicSize = function() {
        return false;
    };
    Symbolizer.testColor = function(prop) {
        if (!prop || !isString(prop)) return false;
        if (COLOR_PROPERTIES.indexOf(prop) >= 0) return true;
        return false;
    };
    return Symbolizer;
}();
var maptalks_es_CanvasSymbolizer = function(_Symbolizer) {
    _inheritsLoose(CanvasSymbolizer, _Symbolizer);
    function CanvasSymbolizer() {
        return _Symbolizer.apply(this, arguments) || this;
    }
    var _proto = CanvasSymbolizer.prototype;
    _proto._prepareContext = function(ctx) {
        if (isNumber(this.symbol['opacity'])) {
            if (ctx.globalAlpha !== this.symbol['opacity']) ctx.globalAlpha = this.symbol['opacity'];
        } else if (1 !== ctx.globalAlpha) ctx.globalAlpha = 1;
    };
    _proto.prepareCanvas = function(ctx, style, resources) {
        Canvas.prepareCanvas(ctx, style, resources, this.getPainter().isHitTesting());
    };
    _proto.remove = function() {};
    _proto.setZIndex = function() {};
    _proto.show = function() {};
    _proto.hide = function() {};
    _proto._defineStyle = function(style) {
        return (function() {
            var _this = this;
            var arr = [], prop = {};
            return loadFunctionTypes(style, function() {
                var map = _this.getMap();
                return set$1(arr, map.getZoom(), extend({}, _this.geometry.getProperties(), setProp(prop, map.getBearing(), map.getPitch(), map.getZoom())));
            });
        }).bind(this)();
    };
    return CanvasSymbolizer;
}(maptalks_es_Symbolizer);
function set$1(arr, a0, a1) {
    arr[0] = a0;
    arr[1] = a1;
    return arr;
}
function setProp(prop, b, p, z) {
    prop['{bearing}'] = b;
    prop['{pitch}'] = p;
    prop['{zoom}'] = z;
    return prop;
}
var TEMP_POINT0$1 = new maptalks_es_Point(0, 0);
var TEMP_POINT1 = new maptalks_es_Point(0, 0);
var maptalks_es_PointSymbolizer = function(_CanvasSymbolizer) {
    _inheritsLoose(PointSymbolizer, _CanvasSymbolizer);
    function PointSymbolizer(symbol, geometry, painter) {
        var _this;
        _this = _CanvasSymbolizer.call(this) || this;
        _this.symbol = symbol;
        _this.geometry = geometry;
        _this.painter = painter;
        return _this;
    }
    var _proto = PointSymbolizer.prototype;
    _proto.get2DExtent = function() {
        var map = this.getMap();
        var glZoom = map.getGLZoom();
        var extent = new maptalks_es_PointExtent();
        var renderPoints = this._getRenderPoints()[0];
        for(var i = renderPoints.length - 1; i >= 0; i--)if (renderPoints[i]) extent._combine(map._pointToPoint(renderPoints[i], glZoom));
        return extent;
    };
    _proto.isDynamicSize = function() {
        var symbol = this.symbol;
        return isFunctionDefinition(symbol['markerWidth']) || isFunctionDefinition(symbol['markerHeight']) || isFunctionDefinition(symbol['textSize']);
    };
    _proto._rotateExtent = function(fixedExtent, angle) {
        return fixedExtent.convertTo(function(p) {
            return p._rotate(angle);
        });
    };
    _proto._getRenderPoints = function() {
        var painter = this.getPainter();
        var placement = painter.isSpriting() ? 'center' : this.getPlacement();
        return this.getPainter().getRenderPoints(placement);
    };
    _proto._getRenderContainerPoints = function(ignoreAltitude) {
        var painter = this.getPainter(), points = this._getRenderPoints()[0];
        if (painter.isSpriting()) return points;
        var dxdy = this.getDxDy();
        var cpoints = this.painter._pointContainerPoints(points, dxdy.x, dxdy.y, ignoreAltitude, true, this.getPlacement());
        if (!cpoints || !Array.isArray(cpoints[0])) return cpoints;
        var flat = [];
        for(var i = 0, l = cpoints.length; i < l; i++)for(var ii = 0, ll = cpoints[i].length; ii < ll; ii++)flat.push(cpoints[i][ii]);
        return flat;
    };
    _proto._getRotationAt = function(i) {
        var r = this.getRotation();
        if (!r) r = 0;
        var rotations = this._getRenderPoints()[1];
        if (!rotations || !rotations[i]) return r;
        var map = this.getMap();
        var p0 = rotations[i][0], p1 = rotations[i][1];
        if (!map.isTransforming()) return r + -computeDegree(p0.x, p0.y, p1.x, p1.y);
        var maxZoom = map.getGLZoom();
        p0 = map._pointToContainerPoint(rotations[i][0], maxZoom, 0, TEMP_POINT0$1);
        p1 = map._pointToContainerPoint(rotations[i][1], maxZoom, 0, TEMP_POINT1);
        return r + computeDegree(p0.x, p0.y, p1.x, p1.y);
    };
    _proto._rotate = function(ctx, origin, rotation) {
        if (rotation) {
            var dxdy = this.getDxDy();
            var p = origin.sub(dxdy);
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(rotation);
            return this.getDxDy();
        }
        return null;
    };
    return PointSymbolizer;
}(maptalks_es_CanvasSymbolizer);
var maptalks_es_VectorMarkerSymbolizer = function(_PointSymbolizer) {
    _inheritsLoose(VectorMarkerSymbolizer, _PointSymbolizer);
    VectorMarkerSymbolizer.test = function(symbol) {
        if (!symbol) return false;
        if (isNil(symbol['markerFile']) && !isNil(symbol['markerType']) && 'path' !== symbol['markerType']) return true;
        return false;
    };
    function VectorMarkerSymbolizer(symbol, geometry, painter) {
        var _this;
        _this = _PointSymbolizer.call(this, symbol, geometry, painter) || this;
        _this._dynamic = hasFunctionDefinition(symbol);
        _this.style = _this._defineStyle(_this.translate());
        _this.strokeAndFill = _this._defineStyle(VectorMarkerSymbolizer.translateLineAndFill(_this.style));
        var lineWidth = _this.strokeAndFill['lineWidth'];
        if (lineWidth % 2 === 0) _this.padding = 2;
        else _this.padding = 1.5;
        return _this;
    }
    var _proto = VectorMarkerSymbolizer.prototype;
    _proto.symbolize = function(ctx, resources) {
        var style = this.style;
        if (!this.painter.isHitTesting() && (0 === style['markerWidth'] || 0 === style['markerHeight'] || 0 === style['polygonOpacity'] && 0 === style['lineOpacity'])) return;
        var cookedPoints = this._getRenderContainerPoints();
        if (!isArrayHasData(cookedPoints)) return;
        this._prepareContext(ctx);
        if (this.getPainter().isSpriting() || this.geometry.getLayer().getMask() === this.geometry || this._dynamic || false === this.geometry.getLayer().options['cacheVectorOnCanvas']) this._drawMarkers(ctx, cookedPoints, resources);
        else this._drawMarkersWithCache(ctx, cookedPoints, resources);
    };
    _proto.getDxDy = function() {
        var s = this.style;
        var dx = s['markerDx'], dy = s['markerDy'];
        return new maptalks_es_Point(dx, dy);
    };
    _proto._drawMarkers = function(ctx, cookedPoints, resources) {
        var strokeAndFill = this.strokeAndFill;
        var gradient = isGradient(strokeAndFill['lineColor']) || isGradient(strokeAndFill['polygonFill']);
        if (!gradient) this.prepareCanvas(ctx, strokeAndFill, resources);
        for(var i = cookedPoints.length - 1; i >= 0; i--){
            var point = cookedPoints[i];
            var origin = this._rotate(ctx, point, this._getRotationAt(i));
            if (origin) point = origin;
            this._drawVectorMarker(ctx, point, resources);
            if (origin) ctx.restore();
        }
    };
    _proto._drawMarkersWithCache = function(ctx, cookedPoints, resources) {
        var stamp = this._stampSymbol();
        var image = resources.getImage(stamp);
        if (!image) {
            image = this._createMarkerImage(ctx, resources);
            resources.addResource([
                stamp,
                image.width,
                image.height
            ], image);
        }
        var anchor = this._getAnchor(image.width, image.height);
        for(var i = cookedPoints.length - 1; i >= 0; i--){
            var point = cookedPoints[i];
            var origin = this._rotate(ctx, point, this._getRotationAt(i));
            if (origin) point = origin;
            Canvas.image(ctx, image, point.x + anchor.x, point.y + anchor.y);
            if (origin) ctx.restore();
        }
    };
    _proto._calMarkerSize = function() {
        if (!this._size) {
            var lineWidth = this.strokeAndFill['lineWidth'], shadow = 2 * (this.symbol['shadowBlur'] || 0), w = Math.round(this.style['markerWidth'] + lineWidth + 2 * shadow + 2 * this.padding), h = Math.round(this.style['markerHeight'] + lineWidth + 2 * shadow + 2 * this.padding);
            if (isFunctionDefinition(this.symbol['markerWidth']) || isFunctionDefinition(this.symbol['markerHeight'])) return [
                w,
                h
            ];
            this._size = [
                w,
                h
            ];
        }
        return this._size;
    };
    _proto._createMarkerImage = function(ctx, resources) {
        var canvasClass = ctx.canvas.constructor, size = this._calMarkerSize(), canvas = Canvas.createCanvas(size[0], size[1], canvasClass), point = this._getCacheImageAnchor(size[0], size[1]);
        var context = canvas.getContext('2d');
        var gradient = isGradient(this.strokeAndFill['lineColor']) || isGradient(this.strokeAndFill['polygonFill']);
        if (!gradient) this.prepareCanvas(context, this.strokeAndFill, resources);
        this._drawVectorMarker(context, point, resources);
        return canvas;
    };
    _proto._stampSymbol = function() {
        if (!this._stamp) this._stamp = [
            this.style['markerType'],
            isGradient(this.style['markerFill']) ? getGradientStamp(this.style['markerFill']) : this.style['markerFill'],
            this.style['markerFillOpacity'],
            this.style['markerFillPatternFile'],
            isGradient(this.style['markerLineColor']) ? getGradientStamp(this.style['markerLineColor']) : this.style['markerLineColor'],
            this.style['markerLineWidth'],
            this.style['markerLineOpacity'],
            this.style['markerLineDasharray'] ? this.style['markerLineDasharray'].join(',') : '',
            this.style['markerLinePatternFile'],
            this.style['markerWidth'],
            this.style['markerHeight'],
            this.style['markerHorizontalAlignment'],
            this.style['markerVerticalAlignment']
        ].join('_');
        return this._stamp;
    };
    _proto._getAnchor = function(w, h) {
        var shadow = 2 * (this.symbol['shadowBlur'] || 0), margin = shadow + this.padding;
        var p = getAlignPoint(new maptalks_es_Size(w, h), this.style['markerHorizontalAlignment'], this.style['markerVerticalAlignment']);
        if (p.x !== -w / 2) p.x -= sign(p.x + w / 2) * margin;
        if (p.y !== -h / 2) p.y -= sign(p.y + h / 2) * margin;
        return p;
    };
    _proto._getCacheImageAnchor = function(w, h) {
        var shadow = 2 * (this.symbol['shadowBlur'] || 0), margin = shadow + this.padding;
        var markerType = this.style['markerType'];
        if ('bar' === markerType || 'pie' === markerType || 'pin' === markerType) return new maptalks_es_Point(w / 2, h - margin);
        if ('rectangle' === markerType) return new maptalks_es_Point(margin, margin);
        return new maptalks_es_Point(w / 2, h / 2);
    };
    _proto._getGraidentExtent = function(points) {
        var e = new maptalks_es_PointExtent(), dxdy = this.getDxDy(), m = this.getFixedExtent();
        if (Array.isArray(points)) for(var i = points.length - 1; i >= 0; i--)e._combine(points[i]);
        else e._combine(points);
        e['xmin'] += m['xmin'] - dxdy.x;
        e['ymin'] += m['ymin'] - dxdy.y;
        e['xmax'] += m['xmax'] - dxdy.x;
        e['ymax'] += m['ymax'] - dxdy.y;
        return e;
    };
    _proto._drawVectorMarker = function(ctx, point, resources) {
        var style = this.style, strokeAndFill = this.strokeAndFill, markerType = style['markerType'].toLowerCase(), vectorArray = VectorMarkerSymbolizer._getVectorPoints(markerType, style['markerWidth'], style['markerHeight']), lineOpacity = strokeAndFill['lineOpacity'], fillOpacity = strokeAndFill['polygonOpacity'];
        var gradient = isGradient(strokeAndFill['lineColor']) || isGradient(strokeAndFill['polygonFill']);
        if (gradient) {
            var gradientExtent;
            if (isGradient(strokeAndFill['lineColor'])) {
                gradientExtent = this._getGraidentExtent(point);
                strokeAndFill['lineGradientExtent'] = gradientExtent.expand(strokeAndFill['lineWidth']);
            }
            if (isGradient(strokeAndFill['polygonFill'])) {
                if (!gradientExtent) gradientExtent = this._getGraidentExtent(point);
                strokeAndFill['polygonGradientExtent'] = gradientExtent;
            }
            this.prepareCanvas(ctx, strokeAndFill, resources);
        }
        var width = style['markerWidth'], height = style['markerHeight'], hLineWidth = style['markerLineWidth'] / 2;
        if ('ellipse' === markerType) Canvas.ellipse(ctx, point, width / 2, height / 2, height / 2, lineOpacity, fillOpacity);
        else if ('cross' === markerType || 'x' === markerType) {
            for(var j = vectorArray.length - 1; j >= 0; j--)vectorArray[j]._add(point);
            Canvas.path(ctx, vectorArray.slice(0, 2), lineOpacity);
            Canvas.path(ctx, vectorArray.slice(2, 4), lineOpacity);
        } else if ('diamond' === markerType || 'bar' === markerType || 'square' === markerType || 'rectangle' === markerType || 'triangle' === markerType) {
            if ('bar' === markerType) point = point.add(0, -hLineWidth);
            else if ('rectangle' === markerType) point = point.add(hLineWidth, hLineWidth);
            for(var _j = vectorArray.length - 1; _j >= 0; _j--)vectorArray[_j]._add(point);
            Canvas.polygon(ctx, vectorArray, lineOpacity, fillOpacity);
        } else if ('pin' === markerType) {
            point = point.add(0, -hLineWidth);
            for(var _j2 = vectorArray.length - 1; _j2 >= 0; _j2--)vectorArray[_j2]._add(point);
            var lineCap = ctx.lineCap;
            ctx.lineCap = 'round';
            Canvas.bezierCurveAndFill(ctx, vectorArray, lineOpacity, fillOpacity);
            ctx.lineCap = lineCap;
        } else if ('pie' === markerType) {
            point = point.add(0, hLineWidth);
            var angle = 180 * Math.atan(width / 2 / height) / Math.PI;
            var _lineCap = ctx.lineCap;
            ctx.lineCap = 'round';
            Canvas.sector(ctx, point, height, [
                90 - angle,
                90 + angle
            ], lineOpacity, fillOpacity);
            ctx.lineCap = _lineCap;
        } else throw new Error('unsupported markerType: ' + markerType);
    };
    _proto.getPlacement = function() {
        return this.symbol['markerPlacement'];
    };
    _proto.getRotation = function() {
        var r = this.style['markerRotation'];
        if (!isNumber(r)) return null;
        return -r * Math.PI / 180;
    };
    _proto.getFixedExtent = function() {
        var dxdy = this.getDxDy(), padding = 2 * this.padding;
        var size = this._calMarkerSize().map(function(d) {
            return d - padding;
        });
        var alignPoint = this._getAnchor(size[0], size[1]);
        var result = new maptalks_es_PointExtent(dxdy.add(0, 0), dxdy.add(size[0], size[1]));
        result._add(alignPoint);
        var rotation = this.getRotation();
        if (rotation) result = this._rotateExtent(result, rotation);
        return result;
    };
    _proto.translate = function() {
        var s = this.symbol;
        var result = {
            markerType: getValueOrDefault(s['markerType'], 'ellipse'),
            markerFill: getValueOrDefault(s['markerFill'], '#00f'),
            markerFillOpacity: getValueOrDefault(s['markerFillOpacity'], 1),
            markerFillPatternFile: getValueOrDefault(s['markerFillPatternFile'], null),
            markerLineColor: getValueOrDefault(s['markerLineColor'], '#000'),
            markerLineWidth: getValueOrDefault(s['markerLineWidth'], 1),
            markerLineOpacity: getValueOrDefault(s['markerLineOpacity'], 1),
            markerLineDasharray: getValueOrDefault(s['markerLineDasharray'], []),
            markerLinePatternFile: getValueOrDefault(s['markerLinePatternFile'], null),
            markerDx: getValueOrDefault(s['markerDx'], 0),
            markerDy: getValueOrDefault(s['markerDy'], 0),
            markerWidth: getValueOrDefault(s['markerWidth'], 10),
            markerHeight: getValueOrDefault(s['markerHeight'], 10),
            markerRotation: getValueOrDefault(s['markerRotation'], 0)
        };
        var markerType = result['markerType'];
        var ha, va;
        if ('bar' === markerType || 'pie' === markerType || 'pin' === markerType) {
            ha = 'middle';
            va = 'top';
        } else if ('rectangle' === markerType) {
            ha = 'right';
            va = 'bottom';
        } else {
            ha = 'middle';
            va = 'middle';
        }
        result['markerHorizontalAlignment'] = getValueOrDefault(s['markerHorizontalAlignment'], ha);
        result['markerVerticalAlignment'] = getValueOrDefault(s['markerVerticalAlignment'], va);
        if (isNumber(s['markerOpacity'])) {
            if (isNumber(s['markerFillOpacity'])) result['markerFillOpacity'] *= s['markerOpacity'];
            if (isNumber(s['markerLineOpacity'])) result['markerLineOpacity'] *= s['markerOpacity'];
        }
        return result;
    };
    VectorMarkerSymbolizer.translateLineAndFill = function(s) {
        var result = {
            lineColor: s['markerLineColor'],
            linePatternFile: s['markerLinePatternFile'],
            lineWidth: s['markerLineWidth'],
            lineOpacity: s['markerLineOpacity'],
            lineDasharray: s['markerLineDasharray'],
            lineCap: 'butt',
            lineJoin: 'round',
            polygonFill: s['markerFill'],
            polygonPatternFile: s['markerFillPatternFile'],
            polygonOpacity: s['markerFillOpacity']
        };
        if (0 === result['lineWidth']) result['lineOpacity'] = 0;
        return result;
    };
    VectorMarkerSymbolizer._getVectorPoints = function(markerType, width, height) {
        var hh = height / 2, hw = width / 2;
        var left = 0, top = 0;
        var v0, v1, v2, v3;
        if ('triangle' === markerType) {
            v0 = new maptalks_es_Point(left, top - hh);
            v1 = new maptalks_es_Point(left - hw, top + hh);
            v2 = new maptalks_es_Point(left + hw, top + hh);
            return [
                v0,
                v1,
                v2
            ];
        }
        if ('cross' === markerType) {
            v0 = new maptalks_es_Point(left - hw, top);
            v1 = new maptalks_es_Point(left + hw, top);
            v2 = new maptalks_es_Point(left, top - hh);
            v3 = new maptalks_es_Point(left, top + hh);
            return [
                v0,
                v1,
                v2,
                v3
            ];
        }
        if ('diamond' === markerType) {
            v0 = new maptalks_es_Point(left - hw, top);
            v1 = new maptalks_es_Point(left, top - hh);
            v2 = new maptalks_es_Point(left + hw, top);
            v3 = new maptalks_es_Point(left, top + hh);
            return [
                v0,
                v1,
                v2,
                v3
            ];
        } else if ('square' === markerType) {
            v0 = new maptalks_es_Point(left - hw, top + hh);
            v1 = new maptalks_es_Point(left + hw, top + hh);
            v2 = new maptalks_es_Point(left + hw, top - hh);
            v3 = new maptalks_es_Point(left - hw, top - hh);
            return [
                v0,
                v1,
                v2,
                v3
            ];
        } else if ('rectangle' === markerType) {
            v0 = new maptalks_es_Point(left, top);
            v1 = v0.add(width, 0);
            v2 = v0.add(width, height);
            v3 = v0.add(0, height);
            return [
                v0,
                v1,
                v2,
                v3
            ];
        } else if ('x' === markerType) {
            v0 = new maptalks_es_Point(left - hw, top + hh);
            v1 = new maptalks_es_Point(left + hw, top - hh);
            v2 = new maptalks_es_Point(left + hw, top + hh);
            v3 = new maptalks_es_Point(left - hw, top - hh);
            return [
                v0,
                v1,
                v2,
                v3
            ];
        } else if ('bar' === markerType) {
            v0 = new maptalks_es_Point(left - hw, top - height);
            v1 = new maptalks_es_Point(left + hw, top - height);
            v2 = new maptalks_es_Point(left + hw, top);
            v3 = new maptalks_es_Point(left - hw, top);
            return [
                v0,
                v1,
                v2,
                v3
            ];
        } else if ('pin' === markerType) {
            var extWidth = height * Math.atan(hw / hh);
            v0 = new maptalks_es_Point(left, top);
            v1 = new maptalks_es_Point(left - extWidth, top - height);
            v2 = new maptalks_es_Point(left + extWidth, top - height);
            v3 = new maptalks_es_Point(left, top);
            return [
                v0,
                v1,
                v2,
                v3
            ];
        }
        return [];
    };
    return VectorMarkerSymbolizer;
}(maptalks_es_PointSymbolizer);
var maptalks_es_DebugSymbolizer = function(_PointSymbolizer) {
    _inheritsLoose(DebugSymbolizer, _PointSymbolizer);
    function DebugSymbolizer() {
        return _PointSymbolizer.apply(this, arguments) || this;
    }
    var _proto = DebugSymbolizer.prototype;
    _proto.getPlacement = function() {
        return 'point';
    };
    _proto.getDxDy = function() {
        return new maptalks_es_Point(0, 0);
    };
    _proto.symbolize = function(ctx) {
        var geometry = this.geometry, layer = geometry.getLayer();
        if (!geometry.options['debug'] && layer && !layer.options['debug']) return;
        var map = this.getMap();
        if (!map || map.isZooming()) return;
        var color = layer.options['debugOutline'], op = 1;
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        var outline = this.getPainter().getContainerExtent().toArray();
        Canvas.polygon(ctx, [
            outline
        ], op, 0);
        var points = this._getRenderContainerPoints(), id = this.geometry.getId(), cross = maptalks_es_VectorMarkerSymbolizer._getVectorPoints('cross', 10, 10);
        for(var i = 0; i < points.length; i++){
            var p = points[i];
            if (!isNil(id)) Canvas.fillText(ctx, id, p.add(8, -4), color);
            var c = [];
            for(var ii = 0; ii < cross.length; ii++)c.push(cross[ii].add(p));
            Canvas.path(ctx, c.slice(0, 2), op);
            Canvas.path(ctx, c.slice(2, 4), op);
        }
    };
    return DebugSymbolizer;
}(maptalks_es_PointSymbolizer);
var maptalks_es_ImageMarkerSymbolizer = function(_PointSymbolizer) {
    _inheritsLoose(ImageMarkerSymbolizer, _PointSymbolizer);
    ImageMarkerSymbolizer.test = function(symbol) {
        if (!symbol) return false;
        if (!isNil(symbol['markerFile'])) return true;
        return false;
    };
    function ImageMarkerSymbolizer(symbol, geometry, painter) {
        var _this;
        _this = _PointSymbolizer.call(this, symbol, geometry, painter) || this;
        _this.style = _this._defineStyle(_this.translate());
        return _this;
    }
    var _proto = ImageMarkerSymbolizer.prototype;
    _proto.symbolize = function(ctx, resources) {
        var style = this.style;
        if (!this.painter.isHitTesting() && (0 === style['markerWidth'] || 0 === style['markerHeight'] || 0 === style['markerOpacity'])) return;
        var cookedPoints = this._getRenderContainerPoints();
        if (!isArrayHasData(cookedPoints)) return;
        var img = this._getImage(resources);
        if (!img) {
            if ('undefined' != typeof console) console.warn('no img found for ' + (this.style['markerFile'] || this._url[0]));
            return;
        }
        this._prepareContext(ctx);
        var width = style['markerWidth'];
        var height = style['markerHeight'];
        if (!isNumber(width) || !isNumber(height)) {
            width = img.width;
            height = img.height;
            style['markerWidth'] = width;
            style['markerHeight'] = height;
            var imgURL = [
                style['markerFile'],
                style['markerWidth'],
                style['markerHeight']
            ];
            if (!resources.isResourceLoaded(imgURL)) resources.addResource(imgURL, img);
            var painter = this.getPainter();
            if (!painter.isSpriting()) painter.removeCache();
        }
        var alpha;
        if ('path' !== this.symbol['markerType'] && isNumber(style['markerOpacity']) && style['markerOpacity'] < 1) {
            alpha = ctx.globalAlpha;
            ctx.globalAlpha *= style['markerOpacity'];
        }
        var alignPoint = getAlignPoint(new maptalks_es_Size(width, height), style['markerHorizontalAlignment'], style['markerVerticalAlignment']);
        for(var i = 0, len = cookedPoints.length; i < len; i++){
            var p = cookedPoints[i];
            var origin = this._rotate(ctx, p, this._getRotationAt(i));
            if (origin) p = origin;
            Canvas.image(ctx, img, p.x + alignPoint.x, p.y + alignPoint.y, width, height);
            if (origin) ctx.restore();
        }
        if (void 0 !== alpha) ctx.globalAlpha = alpha;
    };
    _proto._getImage = function(resources) {
        var img = resources ? resources.getImage([
            this.style['markerFile'],
            this.style['markerWidth'],
            this.style['markerHeight']
        ]) : null;
        return img;
    };
    _proto.getPlacement = function() {
        return this.symbol['markerPlacement'];
    };
    _proto.getRotation = function() {
        var r = this.style['markerRotation'];
        if (!isNumber(r)) return null;
        return -r * Math.PI / 180;
    };
    _proto.getDxDy = function() {
        var s = this.style;
        var dx = s['markerDx'], dy = s['markerDy'];
        return new maptalks_es_Point(dx, dy);
    };
    _proto.getFixedExtent = function(resources) {
        var style = this.style;
        var url = style['markerFile'], img = resources ? resources.getImage(url) : null;
        var width = style['markerWidth'] || (img ? img.width : 0), height = style['markerHeight'] || (img ? img.height : 0);
        var dxdy = this.getDxDy();
        var alignPoint = getAlignPoint(new maptalks_es_Size(width, height), style['markerHorizontalAlignment'], style['markerVerticalAlignment']);
        var result = new maptalks_es_PointExtent(dxdy.add(0, 0), dxdy.add(width, height));
        result._add(alignPoint);
        var rotation = this.getRotation();
        if (rotation) result = this._rotateExtent(result, rotation);
        return result;
    };
    _proto.translate = function() {
        var s = this.symbol;
        return {
            markerFile: s['markerFile'],
            markerOpacity: getValueOrDefault(s['markerOpacity'], 1),
            markerWidth: getValueOrDefault(s['markerWidth'], null),
            markerHeight: getValueOrDefault(s['markerHeight'], null),
            markerRotation: getValueOrDefault(s['markerRotation'], 0),
            markerDx: getValueOrDefault(s['markerDx'], 0),
            markerDy: getValueOrDefault(s['markerDy'], 0),
            markerHorizontalAlignment: getValueOrDefault(s['markerHorizontalAlignment'], 'middle'),
            markerVerticalAlignment: getValueOrDefault(s['markerVerticalAlignment'], 'top')
        };
    };
    return ImageMarkerSymbolizer;
}(maptalks_es_PointSymbolizer);
var TEMP_COORD0$1 = new maptalks_es_Coordinate(0, 0);
var TEMP_COORD1$1 = new maptalks_es_Coordinate(0, 0);
var maptalks_es_StrokeAndFillSymbolizer = function(_CanvasSymbolizer) {
    _inheritsLoose(StrokeAndFillSymbolizer, _CanvasSymbolizer);
    StrokeAndFillSymbolizer.test = function(symbol, geometry) {
        if (!symbol) return false;
        if (geometry && 'Point' === geometry.type) return false;
        for(var p in symbol){
            var f = p.slice(0, 4);
            if ('line' === f || 'poly' === f) return true;
        }
        return false;
    };
    function StrokeAndFillSymbolizer(symbol, geometry, painter) {
        var _this;
        _this = _CanvasSymbolizer.call(this) || this;
        _this.symbol = symbol;
        _this.geometry = geometry;
        _this.painter = painter;
        if ('Point' === geometry.type) return _assertThisInitialized(_this);
        _this.style = _this._defineStyle(_this.translate());
        return _this;
    }
    var _proto = StrokeAndFillSymbolizer.prototype;
    _proto.symbolize = function(ctx, resources) {
        var style = this.style;
        if (0 === style['polygonOpacity'] && 0 === style['lineOpacity'] && !this.painter.isHitTesting()) return;
        var paintParams = this._getPaintParams();
        if (!paintParams) return;
        this._prepareContext(ctx);
        var isGradient$$1 = isGradient(style['lineColor']), isPath = 'Polygon' === this.geometry.getJSONType() || 'LineString' === this.geometry.type;
        if (isGradient$$1 && (style['lineColor']['places'] || !isPath)) style['lineGradientExtent'] = this.getPainter().getContainerExtent()._expand(style['lineWidth']);
        if (isGradient(style['polygonFill'])) style['polygonGradientExtent'] = this.getPainter().getContainerExtent();
        var points = paintParams[0], isSplitted = 'Polygon' === this.geometry.getJSONType() && points.length > 0 && Array.isArray(points[0][0]) || 'LineString' === this.geometry.type && points.length > 0 && Array.isArray(points[0]);
        if (isSplitted) for(var i = 0; i < points.length; i++){
            this.prepareCanvas(ctx, style, resources);
            if (isGradient$$1 && isPath && !style['lineColor']['places']) this._createGradient(ctx, points[i], style['lineColor']);
            var params = [
                ctx,
                points[i]
            ];
            if (paintParams.length > 1) params.push.apply(params, paintParams.slice(1));
            params.push(style['lineOpacity'], style['polygonOpacity'], style['lineDasharray']);
            this.geometry._paintOn.apply(this.geometry, params);
        }
        else {
            this.prepareCanvas(ctx, style, resources);
            if (isGradient$$1 && isPath && !style['lineColor']['places']) this._createGradient(ctx, points, style['lineColor']);
            var _params = [
                ctx
            ];
            _params.push.apply(_params, paintParams);
            _params.push(style['lineOpacity'], style['polygonOpacity'], style['lineDasharray']);
            this.geometry._paintOn.apply(this.geometry, _params);
        }
        if (ctx.setLineDash && Array.isArray(style['lineDasharray'])) ctx.setLineDash([]);
    };
    _proto.get2DExtent = function() {
        var map = this.getMap();
        var extent = this.geometry._getPrjExtent();
        if (!extent) return null;
        if (!this._extMin || !this._extMax) {
            this._extMin = new maptalks_es_Coordinate(0, 0);
            this._extMax = new maptalks_es_Coordinate(0, 0);
        }
        this._extMin.x = extent['xmin'];
        this._extMin.y = extent['ymin'];
        this._extMax.x = extent['xmax'];
        this._extMax.y = extent['ymax'];
        var min = map._prjToPoint(this._extMin, void 0, TEMP_COORD0$1), max = map._prjToPoint(this._extMax, void 0, TEMP_COORD1$1);
        if (this._pxExtent) this._pxExtent.set(Math.min(min.x, max.x), Math.min(min.y, max.y), Math.max(min.x, max.x), Math.max(min.y, max.y));
        else this._pxExtent = new maptalks_es_PointExtent(min, max);
        return this._pxExtent;
    };
    _proto.getFixedExtent = function() {
        var t = this.style['lineWidth'] / 2;
        return new maptalks_es_PointExtent(-t, -t, t, t);
    };
    _proto._getPaintParams = function() {
        return this.getPainter().getPaintParams(this.style['lineDx'], this.style['lineDy']);
    };
    _proto.translate = function() {
        var s = this.symbol;
        var result = {
            lineColor: getValueOrDefault(s['lineColor'], '#000'),
            lineWidth: getValueOrDefault(s['lineWidth'], 2),
            lineOpacity: getValueOrDefault(s['lineOpacity'], 1),
            lineDasharray: getValueOrDefault(s['lineDasharray'], []),
            lineCap: getValueOrDefault(s['lineCap'], 'butt'),
            lineJoin: getValueOrDefault(s['lineJoin'], 'miter'),
            linePatternFile: getValueOrDefault(s['linePatternFile'], null),
            lineDx: getValueOrDefault(s['lineDx'], 0),
            lineDy: getValueOrDefault(s['lineDy'], 0),
            polygonFill: getValueOrDefault(s['polygonFill'], null),
            polygonOpacity: getValueOrDefault(s['polygonOpacity'], 1),
            polygonPatternFile: getValueOrDefault(s['polygonPatternFile'], null),
            polygonPatternDx: getValueOrDefault(s['polygonPatternDx'], 0),
            polygonPatternDy: getValueOrDefault(s['polygonPatternDy'], 0),
            linePatternDx: getValueOrDefault(s['linePatternDx'], 0),
            linePatternDy: getValueOrDefault(s['linePatternDy'], 0)
        };
        if (0 === result['lineWidth']) result['lineOpacity'] = 0;
        if ('LineString' === this.geometry.type && !result['polygonFill']) result['polygonFill'] = result['lineColor'];
        return result;
    };
    _proto._createGradient = function(ctx, points, lineColor) {
        if (!Array.isArray(points) || !points.length) return;
        var len = points.length;
        var grad = ctx.createLinearGradient(points[0].x, points[0].y, points[len - 1].x, points[len - 1].y);
        lineColor['colorStops'].forEach(function(stop) {
            grad.addColorStop.apply(grad, stop);
        });
        ctx.strokeStyle = grad;
    };
    return StrokeAndFillSymbolizer;
}(maptalks_es_CanvasSymbolizer);
var CACHE_KEY = '___text_symbol_cache';
var maptalks_es_TextMarkerSymbolizer = function(_PointSymbolizer) {
    _inheritsLoose(TextMarkerSymbolizer, _PointSymbolizer);
    TextMarkerSymbolizer.test = function(symbol) {
        if (!symbol) return false;
        if (!isNil(symbol['textName'])) return true;
        return false;
    };
    function TextMarkerSymbolizer(symbol, geometry, painter) {
        var _this;
        _this = _PointSymbolizer.call(this, symbol, geometry, painter) || this;
        _this._dynamic = hasFunctionDefinition(symbol);
        _this.style = _this._defineStyle(_this.translate());
        if (0 === _this.style['textWrapWidth']) return _assertThisInitialized(_this);
        _this.strokeAndFill = _this._defineStyle(_this.translateLineAndFill(_this.style));
        var textContent = replaceVariable(_this.style['textName'], _this.geometry.getProperties());
        if (!_this._dynamic) _this._cacheKey = genCacheKey(textContent, _this.style);
        _this._descText(textContent);
        return _this;
    }
    var _proto = TextMarkerSymbolizer.prototype;
    _proto.symbolize = function(ctx, resources) {
        if (!this.painter.isHitTesting() && (0 === this.style['textSize'] || !this.style['textOpacity'] && (!this.style['textHaloRadius'] || !this.style['textHaloOpacity']) || 0 === this.style['textWrapWidth'])) return;
        var cookedPoints = this._getRenderContainerPoints();
        if (!isArrayHasData(cookedPoints)) return;
        var style = this.style, strokeAndFill = this.strokeAndFill;
        var textContent = replaceVariable(this.style['textName'], this.geometry.getProperties());
        this._descText(textContent);
        this._prepareContext(ctx);
        this.prepareCanvas(ctx, strokeAndFill, resources);
        Canvas.prepareCanvasFont(ctx, style);
        for(var i = 0, len = cookedPoints.length; i < len; i++){
            var p = cookedPoints[i];
            var origin = this._rotate(ctx, p, this._getRotationAt(i));
            if (origin) p = origin;
            Canvas.text(ctx, textContent, p, style, this.textDesc);
            if (origin) ctx.restore();
        }
    };
    _proto.getPlacement = function() {
        return this.symbol['textPlacement'];
    };
    _proto.getRotation = function() {
        var r = this.style['textRotation'];
        if (!isNumber(r)) return null;
        return -r * Math.PI / 180;
    };
    _proto.getDxDy = function() {
        var s = this.style;
        return new maptalks_es_Point(s['textDx'], s['textDy']);
    };
    _proto.getFixedExtent = function() {
        var dxdy = this.getDxDy(), style = this.style;
        var size = this.textDesc['size'];
        var alignPoint = getAlignPoint(size, style['textHorizontalAlignment'], style['textVerticalAlignment']);
        var alignW = alignPoint.x, alignH = alignPoint.y;
        if (style['textHaloRadius']) {
            var r = style['textHaloRadius'];
            size = size.add(2 * r, 2 * r);
        }
        var result = new maptalks_es_PointExtent(dxdy.add(alignW, alignH), dxdy.add(alignW + size['width'], alignH + size['height']));
        var rotation = this.getRotation();
        if (rotation) result = this._rotateExtent(result, rotation);
        return result;
    };
    _proto.translate = function() {
        var s = this.symbol;
        var result = {
            textName: s['textName'],
            textFaceName: getValueOrDefault(s['textFaceName'], 'monospace'),
            textWeight: getValueOrDefault(s['textWeight'], 'normal'),
            textStyle: getValueOrDefault(s['textStyle'], 'normal'),
            textSize: getValueOrDefault(s['textSize'], DEFAULT_TEXT_SIZE),
            textFont: getValueOrDefault(s['textFont'], null),
            textFill: getValueOrDefault(s['textFill'], '#000'),
            textOpacity: getValueOrDefault(s['textOpacity'], 1),
            textHaloFill: getValueOrDefault(s['textHaloFill'], '#ffffff'),
            textHaloRadius: getValueOrDefault(s['textHaloRadius'], 0),
            textHaloOpacity: getValueOrDefault(s['textHaloOpacity'], 1),
            textWrapWidth: getValueOrDefault(s['textWrapWidth'], null),
            textWrapCharacter: getValueOrDefault(s['textWrapCharacter'], '\n'),
            textLineSpacing: getValueOrDefault(s['textLineSpacing'], 0),
            textDx: getValueOrDefault(s['textDx'], 0),
            textDy: getValueOrDefault(s['textDy'], 0),
            textHorizontalAlignment: getValueOrDefault(s['textHorizontalAlignment'], 'middle'),
            textVerticalAlignment: getValueOrDefault(s['textVerticalAlignment'], 'middle'),
            textAlign: getValueOrDefault(s['textAlign'], 'center'),
            textRotation: getValueOrDefault(s['textRotation'], 0),
            textMaxWidth: getValueOrDefault(s['textMaxWidth'], 0),
            textMaxHeight: getValueOrDefault(s['textMaxHeight'], 0)
        };
        if (result['textMaxWidth'] > 0 && (!result['textWrapWidth'] || result['textWrapWidth'] > result['textMaxWidth'])) {
            if (!result['textWrapWidth']) result['textMaxHeight'] = 1;
            result['textWrapWidth'] = result['textMaxWidth'];
        }
        return result;
    };
    _proto.translateLineAndFill = function(s) {
        return {
            lineColor: s['textHaloRadius'] ? s['textHaloFill'] : s['textFill'],
            lineWidth: s['textHaloRadius'],
            lineOpacity: s['textOpacity'],
            lineDasharray: null,
            lineCap: 'butt',
            lineJoin: 'round',
            polygonFill: s['textFill'],
            polygonOpacity: s['textOpacity']
        };
    };
    _proto._descText = function(textContent) {
        if (this._dynamic) {
            this.textDesc = this._measureText(textContent);
            return;
        }
        this.textDesc = this._loadFromCache();
        if (!this.textDesc) {
            this.textDesc = this._measureText(textContent);
            this._storeToCache(this.textDesc);
        }
    };
    _proto._measureText = function(textContent) {
        var maxHeight = this.style['textMaxHeight'];
        var textDesc = splitTextToRow(textContent, this.style);
        if (maxHeight && maxHeight < textDesc.size.height) textDesc.size.height = maxHeight;
        return textDesc;
    };
    _proto._storeToCache = function(textDesc) {
        if (IS_NODE) return;
        if (!this.geometry[CACHE_KEY]) this.geometry[CACHE_KEY] = {};
        this.geometry[CACHE_KEY][this._cacheKey] = {
            desc: textDesc,
            active: true
        };
    };
    _proto._loadFromCache = function() {
        if (!this.geometry[CACHE_KEY]) return null;
        var cache = this.geometry[CACHE_KEY][this._cacheKey];
        if (!cache) return null;
        cache.active = true;
        return cache.desc;
    };
    return TextMarkerSymbolizer;
}(maptalks_es_PointSymbolizer);
maptalks_es_TextMarkerSymbolizer.CACHE_KEY = CACHE_KEY;
function genCacheKey(textContent, style) {
    var key = [
        textContent
    ];
    for(var p in style)if (style.hasOwnProperty(p) && p.length > 4 && 'text' === p.substring(0, 4)) key.push(p + '=' + style[p]);
    return key.join('-');
}
var maptalks_es_VectorPathMarkerSymbolizer = function(_ImageMarkerSymbolize) {
    _inheritsLoose(VectorPathMarkerSymbolizer, _ImageMarkerSymbolize);
    VectorPathMarkerSymbolizer.test = function(symbol) {
        if (!symbol) return false;
        if (isNil(symbol['markerFile']) && 'path' === symbol['markerType']) return true;
        return false;
    };
    function VectorPathMarkerSymbolizer(symbol, geometry, painter) {
        var _this;
        if (isNil(symbol['markerWidth'])) symbol['markerWidth'] = 80;
        if (isNil(symbol['markerHeight'])) symbol['markerHeight'] = 80;
        _this = _ImageMarkerSymbolize.call(this, symbol, geometry, painter) || this;
        symbol = extend(symbol, _this.translate());
        var style = _this.style = _this._defineStyle(symbol);
        if (Browser$1.gecko) _this._url = [
            getMarkerPathBase64(style, style['markerWidth'], style['markerHeight']),
            style['markerWidth'],
            style['markerHeight']
        ];
        else _this._url = [
            getMarkerPathBase64(style),
            style['markerWidth'],
            style['markerHeight']
        ];
        return _this;
    }
    var _proto = VectorPathMarkerSymbolizer.prototype;
    _proto._prepareContext = function() {};
    _proto._getImage = function(resources) {
        var _this2 = this;
        if (resources && resources.isResourceLoaded(this._url)) return resources.getImage(this._url);
        var painter = this.painter;
        var image = new Image();
        image.onload = function() {
            var renderer = painter.getLayer() && painter.getLayer().getRenderer();
            if (renderer) renderer.setToRedraw();
        };
        image.onerror = function(err) {
            if (err && 'undefined' != typeof console) console.warn(err);
            resources.markErrorResource(_this2._url);
        };
        image.src = this._url[0];
        if (resources) resources.addResource(this._url, image);
        return image;
    };
    return VectorPathMarkerSymbolizer;
}(maptalks_es_ImageMarkerSymbolizer);
var defaultSymbol = {
    lineWidth: 1,
    polygonFill: '#fff',
    polygonOpacity: 0.5
};
var maptalks_es_DrawAltitudeSymbolizer = function(_PointSymbolizer) {
    _inheritsLoose(DrawAltitudeSymbolizer, _PointSymbolizer);
    DrawAltitudeSymbolizer.test = function(symbol, geometry) {
        var layer = geometry.getLayer();
        if (!layer) return false;
        var type = geometry.getJSONType();
        return 'Marker' === type || 'LineString' === type;
    };
    function DrawAltitudeSymbolizer(symbol, geometry, painter) {
        var _this;
        _this = _PointSymbolizer.call(this, symbol, geometry, painter) || this;
        _this.style = geometry.getLayer().options['drawAltitude'];
        if (!_this.style || !isObject(_this.style)) _this.style = {
            lineWidth: 2
        };
        if (!_this.style['lineWidth']) _this.style['lineWidth'] = 0;
        _this.dxdy = _this._defineStyle({
            dx: symbol['textDx'] || symbol['markerDx'],
            dy: symbol['textDy'] || symbol['markerDy']
        });
        return _this;
    }
    var _proto = DrawAltitudeSymbolizer.prototype;
    _proto.symbolize = function(ctx) {
        var layer = this.geometry.getLayer();
        if (!layer.options['drawAltitude']) return;
        var properties = this.geometry.getProperties();
        if (!properties || !properties[layer.options['altitudeProperty']]) return;
        var style = this._getStyle();
        this._prepareContext(ctx);
        if ('LineString' === this.geometry.type) {
            var paintParams = this._getPaintParams(style['lineDx'], style['lineDy']);
            if (!paintParams) return;
            var groundPoints = this.getPainter().getPaintParams(style['lineDx'], style['lineDy'], true)[0];
            this._drawLineAltitude(ctx, paintParams[0], groundPoints);
        } else {
            var point = this._getRenderContainerPoints(), groundPoint = this._getRenderContainerPoints(true);
            if (!point || 0 === point.length) return;
            this._drawMarkerAltitude(ctx, point[0], groundPoint[0]);
        }
    };
    _proto.getDxDy = function() {
        var s = this.dxdy;
        return new maptalks_es_Point(s['dx'] || 0, s['dy'] || 0);
    };
    _proto.get2DExtent = function() {
        if ('LineString' === this.geometry.type) return maptalks_es_StrokeAndFillSymbolizer.prototype.get2DExtent.apply(this);
        return _PointSymbolizer.prototype.get2DExtent.call(this);
    };
    _proto.getPlacement = function() {
        return 'point';
    };
    _proto._getPaintParams = function(dx, dy) {
        return this.getPainter().getPaintParams(dx || 0, dy || 0);
    };
    _proto._drawMarkerAltitude = function(ctx, point, groundPoint) {
        var style = this._getStyle();
        this.prepareCanvas(ctx, style);
        Canvas.path(ctx, [
            point,
            groundPoint
        ], style['lineOpacity'], null, style['lineDasharray']);
    };
    _proto._drawLineAltitude = function(ctx, points, groundPoints) {
        var style = this._getStyle();
        var isSplitted = points.length > 0 && Array.isArray(points[0]);
        if (isSplitted) for(var i = 0; i < points.length; i++)this._drawLine(ctx, points[i], groundPoints[i]);
        else this._drawLine(ctx, points, groundPoints);
        if (ctx.setLineDash && Array.isArray(style['lineDasharray'])) ctx.setLineDash([]);
    };
    _proto._drawLine = function(ctx, points, groundPoints) {
        var style = this._getStyle();
        this.prepareCanvas(ctx, style);
        for(var i = 0, l = points.length - 1; i < l; i++)Canvas.polygon(ctx, [
            points[i],
            points[i + 1],
            groundPoints[i + 1],
            groundPoints[i]
        ], style['lineOpacity'], style['polygonOpacity'], style['lineDasharray']);
    };
    _proto._getStyle = function() {
        var style = this.geometry.getLayer().options['drawAltitude'];
        if (!isObject(style)) style = defaultSymbol;
        if (!style['lineWidth']) {
            style['lineWidth'] = 0;
            style['lineOpacity'] = 0;
        }
        return style;
    };
    return DrawAltitudeSymbolizer;
}(maptalks_es_PointSymbolizer);
var registerSymbolizers = [
    maptalks_es_DrawAltitudeSymbolizer,
    maptalks_es_StrokeAndFillSymbolizer,
    maptalks_es_ImageMarkerSymbolizer,
    maptalks_es_VectorPathMarkerSymbolizer,
    maptalks_es_VectorMarkerSymbolizer,
    maptalks_es_TextMarkerSymbolizer
];
var testCanvas;
var TEMP_POINT0$2 = new maptalks_es_Point(0, 0);
var TEMP_PAINT_EXTENT = new maptalks_es_PointExtent();
var TEMP_EXTENT$1 = new maptalks_es_PointExtent();
var TEMP_FIXED_EXTENT = new maptalks_es_PointExtent();
var TEMP_CLIP_EXTENT0 = new maptalks_es_PointExtent();
var TEMP_CLIP_EXTENT1 = new maptalks_es_PointExtent();
var maptalks_es_Painter = function(_Class) {
    _inheritsLoose(Painter, _Class);
    function Painter(geometry) {
        var _this;
        _this = _Class.call(this) || this;
        _this.geometry = geometry;
        _this.symbolizers = _this._createSymbolizers();
        _this._altAtGLZoom = _this._getGeometryAltitude();
        return _this;
    }
    var _proto = Painter.prototype;
    _proto.getMap = function() {
        return this.geometry.getMap();
    };
    _proto.getLayer = function() {
        return this.geometry.getLayer();
    };
    _proto._createSymbolizers = function() {
        var geoSymbol = this.getSymbol(), symbolizers = [], regSymbolizers = registerSymbolizers;
        var symbols = geoSymbol;
        if (!Array.isArray(geoSymbol)) symbols = [
            geoSymbol
        ];
        for(var ii = symbols.length - 1; ii >= 0; ii--){
            var symbol = symbols[ii];
            for(var i = regSymbolizers.length - 1; i >= 0; i--)if (regSymbolizers[i].test(symbol, this.geometry)) {
                var symbolizer = new regSymbolizers[i](symbol, this.geometry, this);
                symbolizers.push(symbolizer);
                if (symbolizer instanceof maptalks_es_PointSymbolizer) this._hasPoint = true;
            }
        }
        if (!symbolizers.length) {
            if (console) {
                var id = this.geometry.getId();
                console.warn('invalid symbol for geometry(' + (this.geometry ? this.geometry.getType() + (id ? ':' + id : '') : '') + ') to draw : ' + JSON.stringify(geoSymbol));
            }
        }
        this._debugSymbolizer = new maptalks_es_DebugSymbolizer(geoSymbol, this.geometry, this);
        return symbolizers;
    };
    _proto.hasPoint = function() {
        return !!this._hasPoint;
    };
    _proto.getRenderPoints = function(placement) {
        if (!this._renderPoints) this._renderPoints = {};
        if (!placement) placement = 'center';
        if (!this._renderPoints[placement]) this._renderPoints[placement] = this.geometry._getRenderPoints(placement);
        return this._renderPoints[placement];
    };
    _proto.getPaintParams = function(dx, dy, ignoreAltitude) {
        var map = this.getMap(), geometry = this.geometry, res = map.getResolution(), pitched = 0 !== map.getPitch(), rotated = 0 !== map.getBearing();
        var params = this._cachedParams;
        var paintAsPath = geometry._paintAsPath && geometry._paintAsPath();
        if (paintAsPath && this._unsimpledParams && res <= this._unsimpledParams._res) params = this._unsimpledParams;
        else if (!params || params._res !== map.getResolution() || this._pitched !== pitched && geometry._redrawWhenPitch() || this._rotated !== rotated && geometry._redrawWhenRotate()) {
            params = geometry._getPaintParams();
            if (!params) return null;
            params._res = res;
            if (!geometry._simplified && paintAsPath) {
                if (!this._unsimpledParams) this._unsimpledParams = params;
                if (res > this._unsimpledParams._res) this._unsimpledParams._res = res;
            }
            this._cachedParams = params;
        }
        if (!params) return null;
        this._pitched = pitched;
        this._rotated = rotated;
        var zoomScale = map.getGLScale(), tr = [], points = params[0];
        var mapExtent = map.getContainerExtent();
        var cPoints = this._pointContainerPoints(points, dx, dy, ignoreAltitude, this._hitPoint && !mapExtent.contains(this._hitPoint));
        if (!cPoints) return null;
        tr.push(cPoints);
        for(var i = 1, l = params.length; i < l; i++)if (isNumber(params[i]) || params[i] instanceof maptalks_es_Size) {
            if (isNumber(params[i])) tr.push(params[i] / zoomScale);
            else tr.push(params[i].multi(1 / zoomScale));
        } else tr.push(params[i]);
        return tr;
    };
    _proto._pointContainerPoints = function(points, dx, dy, ignoreAltitude, disableClip, pointPlacement) {
        if (this._aboveCamera()) return null;
        var map = this.getMap(), glZoom = map.getGLZoom(), containerOffset = this.containerOffset;
        var cPoints;
        function pointContainerPoint(point, alt) {
            var p = map._pointToContainerPoint(point, glZoom, alt)._sub(containerOffset);
            if (dx || dy) p._add(dx || 0, dy || 0);
            return p;
        }
        var altitude = this.getAltitude();
        if (Array.isArray(points)) {
            var geometry = this.geometry;
            var clipped;
            clipped = !disableClip && geometry.options['enableClip'] ? this._clip(points, altitude) : {
                points: points,
                altitude: altitude
            };
            var clipPoints = clipped.points;
            altitude = clipped.altitude;
            if (ignoreAltitude) altitude = 0;
            var alt = altitude;
            cPoints = [];
            for(var i = 0, l = clipPoints.length; i < l; i++){
                var c = clipPoints[i];
                if (Array.isArray(c)) {
                    var cring = [];
                    for(var ii = 0, ll = c.length; ii < ll; ii++){
                        var cc = c[ii];
                        if (Array.isArray(altitude)) alt = altitude[i] ? altitude[i][ii] : 0;
                        cring.push(pointContainerPoint(cc, alt));
                    }
                    cPoints.push(cring);
                } else {
                    if (Array.isArray(altitude)) alt = 'vertex-last' === pointPlacement ? altitude[altitude.length - 1 - i] : 'line' === pointPlacement ? (altitude[i] + altitude[i + 1]) / 2 : altitude[i];
                    cPoints.push(pointContainerPoint(c, alt));
                }
            }
        } else if (points instanceof maptalks_es_Point) {
            if (ignoreAltitude) altitude = 0;
            cPoints = map._pointToContainerPoint(points, glZoom, altitude)._sub(containerOffset);
            if (dx || dy) cPoints._add(dx, dy);
        }
        return cPoints;
    };
    _proto._clip = function(points, altitude) {
        var map = this.getMap(), geometry = this.geometry;
        var lineWidth = this.getSymbol()['lineWidth'];
        if (!isNumber(lineWidth)) lineWidth = 4;
        var extent2D = map._get2DExtent(void 0, TEMP_CLIP_EXTENT0)._expand(lineWidth);
        if (map.getPitch() > 0 && altitude) {
            var c = map.cameraLookAt;
            var pos = map.cameraPosition;
            TEMP_POINT0$2.set(pos.x, pos.y);
            extent2D = extent2D._combine(TEMP_POINT0$2._add(sign(c[0] - pos[0]), sign(c[1] - pos[1])));
        }
        var e = this.get2DExtent(null, TEMP_CLIP_EXTENT1);
        var clipPoints = points;
        if (e.within(extent2D)) return {
            points: clipPoints,
            altitude: altitude
        };
        var glExtent2D = map._get2DExtent(map.getGLZoom(), TEMP_CLIP_EXTENT0)._expand(lineWidth * map._glScale);
        var smoothness = geometry.options['smoothness'];
        if (geometry.getShell && this.geometry.getHoles && !smoothness) {
            if (Array.isArray(points[0])) {
                clipPoints = [];
                for(var i = 0; i < points.length; i++){
                    var part = clipPolygon(points[i], glExtent2D);
                    if (part.length) clipPoints.push(part);
                }
            } else clipPoints = clipPolygon(points, glExtent2D);
        } else if ('LineString' === geometry.getJSONType() && !smoothness) {
            if (Array.isArray(points[0])) {
                clipPoints = [];
                for(var _i = 0; _i < points.length; _i++)pushIn(clipPoints, clipLine(points[_i], glExtent2D, false, !!smoothness));
            } else clipPoints = clipLine(points, glExtent2D, false, !!smoothness);
            return this._interpolateSegAlt(clipPoints, points, altitude);
        }
        return {
            points: clipPoints,
            altitude: altitude
        };
    };
    _proto._interpolateSegAlt = function(clipSegs, orig, altitude) {
        if (!Array.isArray(altitude)) {
            var fn = function(cc) {
                return cc.point;
            };
            return {
                points: clipSegs.map(function(c) {
                    if (Array.isArray(c)) return c.map(fn);
                    return c.point;
                }),
                altitude: altitude
            };
        }
        var segsWithAlt = interpolateAlt(clipSegs, orig, altitude);
        altitude = [];
        var points = segsWithAlt.map(function(p) {
            if (Array.isArray(p)) {
                var alt = [];
                var cp = p.map(function(pp) {
                    alt.push(pp.altitude);
                    return pp.point;
                });
                altitude.push(alt);
                return cp;
            }
            altitude.push(p.altitude);
            return p.point;
        });
        return {
            points: points,
            altitude: altitude
        };
    };
    _proto.getSymbol = function() {
        return this.geometry._getInternalSymbol();
    };
    _proto.paint = function(extent, context, offset) {
        if (!this.symbolizers) return;
        var renderer = this.getLayer()._getRenderer();
        if (!renderer || !renderer.context && !context) return;
        if (extent && !extent.intersects(this.get2DExtent(renderer.resources, TEMP_PAINT_EXTENT))) return;
        var map = this.getMap();
        var minAltitude = this.getMinAltitude();
        var frustumAlt = map.getFrustumAltitude();
        if (minAltitude && frustumAlt && frustumAlt < minAltitude) return;
        this.containerOffset = offset || map._pointToContainerPoint(renderer.southWest)._add(0, -map.height);
        this._beforePaint();
        var ctx = context || renderer.context;
        var contexts = [
            ctx,
            renderer.resources
        ];
        for(var i = this.symbolizers.length - 1; i >= 0; i--){
            this._prepareShadow(ctx, this.symbolizers[i].symbol);
            this.symbolizers[i].symbolize.apply(this.symbolizers[i], contexts);
        }
        this._afterPaint();
        this._painted = true;
        this._debugSymbolizer.symbolize.apply(this._debugSymbolizer, contexts);
    };
    _proto.getSprite = function(resources, canvasClass) {
        if ('Point' !== this.geometry.type) return null;
        this._spriting = true;
        if (!this._sprite && this.symbolizers.length > 0) {
            var extent = new maptalks_es_PointExtent();
            this.symbolizers.forEach(function(s) {
                var markerExtent = s.getFixedExtent(resources);
                extent._combine(markerExtent);
            });
            var origin = extent.getMin().multi(-1);
            var clazz = canvasClass || (this.getMap() ? this.getMap().CanvasClass : null);
            var canvas = Canvas.createCanvas(extent.getWidth(), extent.getHeight(), clazz);
            var bak;
            if (this._renderPoints) bak = this._renderPoints;
            var ctx = canvas.getContext('2d');
            var contexts = [
                ctx,
                resources
            ];
            for(var i = this.symbolizers.length - 1; i >= 0; i--){
                var dxdy = this.symbolizers[i].getDxDy();
                this._renderPoints = {
                    center: [
                        [
                            origin.add(dxdy)
                        ]
                    ]
                };
                this._prepareShadow(ctx, this.symbolizers[i].symbol);
                this.symbolizers[i].symbolize.apply(this.symbolizers[i], contexts);
            }
            if (bak) this._renderPoints = bak;
            this._sprite = {
                canvas: canvas,
                offset: extent.getCenter()
            };
        }
        this._spriting = false;
        return this._sprite;
    };
    _proto.isSpriting = function() {
        return !!this._spriting;
    };
    _proto.hitTest = function(cp, tolerance) {
        if (!tolerance || tolerance < 0.5) tolerance = 0.5;
        if (!testCanvas) testCanvas = Canvas.createCanvas(1, 1);
        Canvas.setHitTesting(true);
        testCanvas.width = testCanvas.height = 2 * tolerance;
        var ctx = testCanvas.getContext('2d');
        this._hitPoint = cp.sub(tolerance, tolerance);
        try {
            this.paint(null, ctx, this._hitPoint);
        } catch (e) {
            throw e;
        } finally{
            Canvas.setHitTesting(false);
        }
        delete this._hitPoint;
        var imgData = ctx.getImageData(0, 0, testCanvas.width, testCanvas.height).data;
        for(var i = 3, l = imgData.length; i < l; i += 4)if (imgData[i] > 0) return true;
        return false;
    };
    _proto.isHitTesting = function() {
        return !!this._hitPoint;
    };
    _proto._prepareShadow = function(ctx, symbol) {
        if (symbol['shadowBlur']) {
            ctx.shadowBlur = this.isHitTesting() ? 0 : symbol['shadowBlur'];
            ctx.shadowColor = symbol['shadowColor'] || '#000';
            ctx.shadowOffsetX = symbol['shadowOffsetX'] || 0;
            ctx.shadowOffsetY = symbol['shadowOffsetY'] || 0;
        } else if (ctx.shadowBlur) {
            ctx.shadowBlur = null;
            ctx.shadowColor = null;
            ctx.shadowOffsetX = null;
            ctx.shadowOffsetY = null;
        }
    };
    _proto._eachSymbolizer = function(fn, context) {
        if (!this.symbolizers) return;
        if (!context) context = this;
        for(var i = this.symbolizers.length - 1; i >= 0; i--)fn.apply(context, [
            this.symbolizers[i]
        ]);
    };
    _proto.get2DExtent = function(resources, out) {
        this._verifyProjection();
        var map = this.getMap();
        resources = resources || this.getLayer()._getRenderer().resources;
        var zoom = map.getZoom();
        var isDynamicSize = this._isDynamicSize();
        if (!this._extent2D || this._extent2D._zoom !== zoom || !this._fixedExtent) {
            if (this._extent2D && this._extent2D._zoom !== zoom) delete this._extent2D;
            if (this.symbolizers) {
                if (!this._extent2D) {
                    this._extent2D = this._computeExtent2D(new maptalks_es_PointExtent());
                    this._extent2D._zoom = zoom;
                }
                if (!this._fixedExtent) this._fixedExtent = this._computeFixedExtent(resources, new maptalks_es_PointExtent());
            }
        }
        if (!this._extent2D) {
            if (isDynamicSize) delete this._fixedExtent;
            return null;
        }
        var _this$_fixedExtent = this._fixedExtent, xmin = _this$_fixedExtent.xmin, ymin = _this$_fixedExtent.ymin, xmax = _this$_fixedExtent.xmax, ymax = _this$_fixedExtent.ymax;
        if (isDynamicSize) delete this._fixedExtent;
        TEMP_FIXED_EXTENT.set(xmin, -ymax, xmax, -ymin);
        if (out) {
            out.set(this._extent2D['xmin'], this._extent2D['ymin'], this._extent2D['xmax'], this._extent2D['ymax']);
            out._add(TEMP_FIXED_EXTENT);
            return out;
        }
        return this._extent2D.add(TEMP_FIXED_EXTENT);
    };
    _proto._computeExtent2D = function(extent) {
        for(var i = this.symbolizers.length - 1; i >= 0; i--){
            var symbolizer = this.symbolizers[i];
            extent._combine(symbolizer.get2DExtent());
        }
        return extent;
    };
    _proto._computeFixedExtent = function(resources, extent) {
        for(var i = this.symbolizers.length - 1; i >= 0; i--){
            var symbolizer = this.symbolizers[i];
            if (symbolizer.getFixedExtent) extent._combine(symbolizer.getFixedExtent(resources));
        }
        return extent;
    };
    _proto._isDynamicSize = function() {
        for(var i = this.symbolizers.length - 1; i >= 0; i--){
            var symbolizer = this.symbolizers[i];
            if (symbolizer.isDynamicSize()) return true;
        }
        return false;
    };
    _proto.getContainerExtent = function(out) {
        if (this._aboveCamera()) return null;
        this._verifyProjection();
        var map = this.getMap();
        var zoom = map.getZoom();
        var glScale = map._glScale;
        if (!this._extent2D || this._extent2D._zoom !== zoom) this.get2DExtent(null, TEMP_EXTENT$1);
        var altitude = this.getMinAltitude();
        var extent = this._extent2D.convertTo(function(c) {
            return map._pointToContainerPoint(c, zoom, altitude / glScale, TEMP_POINT0$2);
        }, out);
        var maxAltitude = this.getMaxAltitude();
        if (maxAltitude !== altitude) {
            var extent2 = this._extent2D.convertTo(function(c) {
                return map._pointToContainerPoint(c, zoom, maxAltitude / glScale, TEMP_POINT0$2);
            }, TEMP_EXTENT$1);
            extent._combine(extent2);
        }
        var layer = this.geometry.getLayer();
        if ('LineString' === this.geometry.type && maxAltitude && layer.options['drawAltitude']) {
            var groundExtent = this._extent2D.convertTo(function(c) {
                return map._pointToContainerPoint(c, zoom, 0, TEMP_POINT0$2);
            }, TEMP_EXTENT$1);
            extent._combine(groundExtent);
        }
        if (extent) extent._add(this._fixedExtent || this._computeFixedExtent(null, new maptalks_es_PointExtent()));
        var smoothness = this.geometry.options['smoothness'];
        if (smoothness) extent._expand(0.15 * extent.getWidth());
        return extent;
    };
    _proto._aboveCamera = function() {
        var altitude = this.getMinAltitude();
        var map = this.getMap();
        var frustumAlt = map.getFrustumAltitude();
        return altitude && frustumAlt && frustumAlt < altitude;
    };
    _proto.getFixedExtent = function() {
        var map = this.getMap();
        var zoom = map.getZoom();
        if (this._isDynamicSize()) return this._computeFixedExtent(null, new maptalks_es_PointExtent());
        if (!this._extent2D || this._extent2D._zoom !== zoom) this.get2DExtent(null, TEMP_FIXED_EXTENT);
        return this._fixedExtent;
    };
    _proto.setZIndex = function(change) {
        this._eachSymbolizer(function(symbolizer) {
            symbolizer.setZIndex(change);
        });
    };
    _proto.show = function() {
        if (this._painted) {
            this.removeCache();
            this._eachSymbolizer(function(symbolizer) {
                symbolizer.show();
            });
        } else {
            var layer = this.getLayer();
            if (!layer.isCanvasRender()) this.paint();
        }
    };
    _proto.hide = function() {
        this._eachSymbolizer(function(symbolizer) {
            symbolizer.hide();
        });
    };
    _proto.repaint = function() {
        this._altAtGLZoom = this._getGeometryAltitude();
        this.removeCache();
        var layer = this.getLayer();
        if (!layer) return;
        var renderer = layer.getRenderer();
        if (!renderer || !renderer.setToRedraw()) return;
        renderer.setToRedraw();
    };
    _proto.refreshSymbol = function() {
        this.removeCache();
        this._removeSymbolizers();
        this.symbolizers = this._createSymbolizers();
    };
    _proto.remove = function() {
        this.removeCache();
        this._removeSymbolizers();
    };
    _proto._removeSymbolizers = function() {
        this._eachSymbolizer(function(symbolizer) {
            delete symbolizer.painter;
            symbolizer.remove();
        });
        delete this.symbolizers;
    };
    _proto.removeCache = function() {
        delete this._renderPoints;
        delete this._paintParams;
        delete this._sprite;
        delete this._extent2D;
        delete this._fixedExtent;
        delete this._cachedParams;
        delete this._unsimpledParams;
        if (this.geometry) delete this.geometry[maptalks_es_TextMarkerSymbolizer.CACHE_KEY];
    };
    _proto.getAltitude = function() {
        var propAlt = this.geometry.getAltitude();
        if (propAlt !== this._propAlt) this._altAtGLZoom = this._getGeometryAltitude();
        if (!this._altAtGLZoom) return 0;
        return this._altAtGLZoom;
    };
    _proto.getMinAltitude = function() {
        if (!this.minAltitude) return 0;
        return this.minAltitude;
    };
    _proto.getMaxAltitude = function() {
        if (!this.maxAltitude) return 0;
        return this.maxAltitude;
    };
    _proto._getGeometryAltitude = function() {
        var _this2 = this;
        var map = this.getMap();
        if (!map) return 0;
        var altitude = this.geometry.getAltitude();
        this._propAlt = altitude;
        if (!altitude) {
            this.minAltitude = this.maxAltitude = 0;
            return 0;
        }
        var center = this.geometry.getCenter();
        if (!center) return 0;
        if (Array.isArray(altitude)) {
            this.minAltitude = Number.MAX_VALUE;
            this.maxAltitude = Number.MIN_VALUE;
            return altitude.map(function(alt) {
                var a = _this2._meterToPoint(center, alt);
                if (a < _this2.minAltitude) _this2.minAltitude = a;
                if (a > _this2.maxAltitude) _this2.maxAltitude = a;
                return a;
            });
        }
        this.minAltitude = this.maxAltitude = this._meterToPoint(center, altitude);
        return this.minAltitude;
    };
    _proto._meterToPoint = function(center, altitude) {
        var map = this.getMap();
        var z = map.getGLZoom();
        return map.distanceToPoint(altitude, 0, z, center).x * sign(altitude);
    };
    _proto._verifyProjection = function() {
        var projection = this.geometry._getProjection();
        if (this._projCode && this._projCode !== projection.code) this.removeCache();
        this._projCode = projection.code;
    };
    _proto._beforePaint = function() {
        var textcache = this.geometry[maptalks_es_TextMarkerSymbolizer.CACHE_KEY];
        if (!textcache) return;
        for(var p in textcache)if (hasOwn(textcache, p)) textcache[p].active = false;
    };
    _proto._afterPaint = function() {
        var textcache = this.geometry[maptalks_es_TextMarkerSymbolizer.CACHE_KEY];
        if (!textcache) return;
        for(var p in textcache)if (hasOwn(textcache, p)) {
            if (!textcache[p].active) delete textcache[p];
        }
    };
    return Painter;
}(maptalks_es_Class);
function interpolateAlt(points, orig, altitude) {
    if (!Array.isArray(altitude)) return points;
    var parts = [];
    for(var i = 0, l = points.length; i < l; i++)if (Array.isArray(points[i])) parts.push(interpolateAlt(points[i], orig, altitude));
    else {
        var p = points[i];
        if (p.point.equals(orig[p.index])) {
            p.altitude = altitude[p.index];
            parts.push(p);
        } else {
            var w0 = void 0, w1 = void 0;
            if (0 === p.index) {
                w0 = p.index;
                w1 = p.index + 1;
            } else {
                w0 = p.index - 1;
                w1 = p.index;
            }
            var t0 = p.point.distanceTo(orig[w1]);
            var t = t0 / (t0 + orig[w0].distanceTo(p.point));
            var alt = maptalks_es_interpolate(altitude[w0], altitude[w1], 1 - t);
            p.altitude = alt;
            parts.push(p);
        }
    }
    return parts;
}
var TEMP_EXTENT$2 = new maptalks_es_PointExtent();
var maptalks_es_CollectionPainter = function(_Class) {
    _inheritsLoose(CollectionPainter, _Class);
    function CollectionPainter(geometry, isMask) {
        var _this;
        _this = _Class.call(this) || this;
        _this.geometry = geometry;
        _this.isMask = isMask;
        return _this;
    }
    var _proto = CollectionPainter.prototype;
    _proto._eachPainter = function(fn) {
        var geometries = this.geometry.getGeometries();
        var painter;
        for(var i = 0, len = geometries.length; i < len; i++){
            painter = this.isMask ? geometries[i]._getMaskPainter() : geometries[i]._getPainter();
            if (!!painter) {
                if (painter) {
                    if (false === fn.call(this, painter)) break;
                }
            }
        }
    };
    _proto.paint = function(extent) {
        if (!this.geometry) return;
        this._eachPainter(function(painter) {
            painter.paint(extent);
        });
    };
    _proto.get2DExtent = function(resources, out) {
        if (out) out.set(null, null, null, null);
        var extent = out || new maptalks_es_PointExtent();
        this._eachPainter(function(painter) {
            extent = extent._combine(painter.get2DExtent(resources, TEMP_EXTENT$2));
        });
        return extent;
    };
    _proto.getContainerExtent = function() {
        var extent = new maptalks_es_PointExtent();
        this._eachPainter(function(painter) {
            extent = extent.combine(painter.getContainerExtent());
        });
        return extent;
    };
    _proto.remove = function() {
        var args = arguments;
        this._eachPainter(function(painter) {
            painter.remove.apply(painter, args);
        });
    };
    _proto.setZIndex = function() {
        var args = arguments;
        this._eachPainter(function(painter) {
            painter.setZIndex.apply(painter, args);
        });
    };
    _proto.show = function() {
        var args = arguments;
        this._eachPainter(function(painter) {
            painter.show.apply(painter, args);
        });
    };
    _proto.hide = function() {
        var args = arguments;
        this._eachPainter(function(painter) {
            painter.hide.apply(painter, args);
        });
    };
    _proto.repaint = function() {
        var args = arguments;
        this._eachPainter(function(painter) {
            painter.repaint.apply(painter, args);
        });
    };
    _proto.refreshSymbol = function() {
        var args = arguments;
        this._eachPainter(function(painter) {
            painter.refreshSymbol.apply(painter, args);
        });
    };
    _proto.hasPoint = function() {
        var result = false;
        this._eachPainter(function(painter) {
            if (painter.hasPoint()) {
                result = true;
                return false;
            }
            return true;
        });
        return result;
    };
    _proto.getMinAltitude = function() {
        var first = true;
        var result = 0;
        this._eachPainter(function(painter) {
            var alt = painter.getMinAltitude();
            if (first || alt < result) {
                first = false;
                result = alt;
            }
        });
        return result;
    };
    _proto.getMaxAltitude = function() {
        var result = 0;
        this._eachPainter(function(painter) {
            var alt = painter.getMaxAltitude();
            if (alt > result) result = alt;
        });
        return result;
    };
    return CollectionPainter;
}(maptalks_es_Class);
var DefaultSpatialReference = {
    'EPSG:3857': {
        resolutions: function() {
            var resolutions = [];
            var d = 12756274 * Math.PI;
            for(var i = 0; i < 21; i++)resolutions[i] = d / (256 * Math.pow(2, i));
            return resolutions;
        }(),
        fullExtent: {
            top: 6378137 * Math.PI,
            left: -6378137 * Math.PI,
            bottom: -6378137 * Math.PI,
            right: 6378137 * Math.PI
        }
    },
    'EPSG:4326': {
        fullExtent: {
            top: 90,
            left: -180,
            bottom: -90,
            right: 180
        },
        resolutions: function() {
            var resolutions = [];
            for(var i = 0; i < 20; i++)resolutions[i] = 180 / (128 * Math.pow(2, i));
            return resolutions;
        }()
    },
    BAIDU: {
        resolutions: function() {
            var res = Math.pow(2, 18);
            var resolutions = [];
            for(var i = 0; i < 20; i++){
                resolutions[i] = res;
                res *= 0.5;
            }
            return resolutions;
        }(),
        fullExtent: {
            top: 33554432,
            left: -33554432,
            bottom: -33554432,
            right: 33554432
        }
    },
    IDENTITY: {
        resolutions: function() {
            var res = Math.pow(2, 8);
            var resolutions = [];
            for(var i = 0; i < 18; i++){
                resolutions[i] = res;
                res *= 0.5;
            }
            return resolutions;
        }(),
        fullExtent: {
            top: 200000,
            left: -200000,
            bottom: -200000,
            right: 200000
        }
    }
};
DefaultSpatialReference['EPSG:4490'] = DefaultSpatialReference['EPSG:4326'];
var maptalks_es_SpatialReference = function() {
    function SpatialReference(options) {
        if (void 0 === options) options = {};
        this.options = options;
        this._initSpatialRef();
    }
    SpatialReference.getProjectionInstance = function(prjName) {
        if (!prjName) return null;
        if (isObject(prjName)) return prjName;
        prjName = (prjName + '').toLowerCase();
        for(var p in projections)if (hasOwn(projections, p)) {
            var code = projections[p]['code'];
            if (code && code.toLowerCase() === prjName) return projections[p];
        }
        return null;
    };
    SpatialReference.equals = function(sp1, sp2) {
        if (!sp1 && !sp2) return true;
        if (!sp1 || !sp2) return false;
        if (sp1.projection !== sp2.projection) return false;
        var f1 = sp1.fullExtent, f2 = sp2.fullExtent;
        if (f1 && !f2 || !f1 && f2) return false;
        if (f1 && f2) {
            if (f1.top !== f2.top || f1.bottom !== f2.bottom || f1.left !== f2.left || f1.right !== f2.right) return false;
        }
        var r1 = sp1.resolutions, r2 = sp2.resolutions;
        if (r1 && r2) {
            if (r1.length !== r2.length) return false;
            for(var i = 0; i < r1.length; i++)if (r1[i] !== r2[i]) return false;
        }
        return true;
    };
    var _proto = SpatialReference.prototype;
    _proto._initSpatialRef = function() {
        var projection = this.options['projection'];
        projection = projection ? SpatialReference.getProjectionInstance(projection) : DEFAULT$1;
        if (!projection) throw new Error('must provide a valid projection in map\'s spatial reference.');
        projection = extend({}, Common, projection);
        if (!projection.measureLength) extend(projection, Measurer.DEFAULT);
        this._projection = projection;
        var defaultSpatialRef, resolutions = this.options['resolutions'];
        if (!resolutions) {
            if (projection['code']) {
                defaultSpatialRef = DefaultSpatialReference[projection['code']];
                if (defaultSpatialRef) {
                    resolutions = defaultSpatialRef['resolutions'];
                    this.isEPSG = 'IDENTITY' !== projection['code'];
                }
            }
            if (!resolutions) throw new Error('must provide valid resolutions in map\'s spatial reference.');
        }
        this._resolutions = resolutions;
        var fullExtent = this.options['fullExtent'];
        if (!fullExtent) {
            if (projection['code']) {
                defaultSpatialRef = DefaultSpatialReference[projection['code']];
                if (defaultSpatialRef) fullExtent = defaultSpatialRef['fullExtent'];
            }
            if (!fullExtent) throw new Error('must provide a valid fullExtent in map\'s spatial reference.');
        }
        if (isNil(fullExtent['left'])) {
            this._fullExtent = new maptalks_es_Extent(fullExtent);
            fullExtent['left'] = fullExtent['xmin'];
            fullExtent['right'] = fullExtent['xmax'];
            fullExtent['top'] = fullExtent['ymax'];
            fullExtent['bottom'] = fullExtent['ymin'];
        } else this._fullExtent = new maptalks_es_Extent(new maptalks_es_Coordinate(fullExtent['left'], fullExtent['top']), new maptalks_es_Coordinate(fullExtent['right'], fullExtent['bottom']));
        if (isNil(fullExtent['top']) || isNil(fullExtent['bottom']) || isNil(fullExtent['left']) || isNil(fullExtent['right'])) throw new Error('must provide valid top/bottom/left/right in fullExtent.');
        extend(this._fullExtent, fullExtent);
        this._projection.fullExtent = fullExtent;
        var a = fullExtent['right'] >= fullExtent['left'] ? 1 : -1, b = fullExtent['top'] >= fullExtent['bottom'] ? -1 : 1;
        this._transformation = new maptalks_es_Transformation([
            a,
            b,
            0,
            0
        ]);
    };
    _proto.getResolutions = function() {
        return this._resolutions || [];
    };
    _proto.getResolution = function(zoom) {
        var z = 0 | zoom;
        if (z < 0) z = 0;
        else if (z > this._resolutions.length - 1) z = this._resolutions.length - 1;
        var res = this._resolutions[z];
        if (z !== zoom && zoom > 0 && z < this._resolutions.length - 1) {
            var next = this._resolutions[z + 1];
            return res + (next - res) * (zoom - z);
        }
        return res;
    };
    _proto.getProjection = function() {
        return this._projection;
    };
    _proto.getFullExtent = function() {
        return this._fullExtent;
    };
    _proto.getTransformation = function() {
        return this._transformation;
    };
    _proto.getMinZoom = function() {
        for(var i = 0; i < this._resolutions.length; i++)if (!isNil(this._resolutions[i])) return i;
        return 0;
    };
    _proto.getMaxZoom = function() {
        for(var i = this._resolutions.length - 1; i >= 0; i--)if (!isNil(this._resolutions[i])) return i;
        return this._resolutions.length - 1;
    };
    _proto.getZoomDirection = function() {
        return sign(this._resolutions[this.getMinZoom()] - this._resolutions[this.getMaxZoom()]);
    };
    _proto.toJSON = function() {
        if (!this.json) this.json = {
            resolutions: this._resolutions,
            fullExtent: {
                top: this._fullExtent.top,
                left: this._fullExtent.left,
                bottom: this._fullExtent.bottom,
                right: this._fullExtent.right
            },
            projection: this._projection.code
        };
        return this.json;
    };
    return SpatialReference;
}();
var maptalks_es_options = {
    id: null,
    visible: true,
    interactive: true,
    editable: true,
    cursor: null,
    defaultProjection: 'EPSG:4326'
};
var maptalks_es_Geometry = function(_JSONAble) {
    _inheritsLoose(Geometry, _JSONAble);
    function Geometry(options) {
        var _this;
        var opts = extend({}, options);
        var symbol = opts['symbol'];
        var properties = opts['properties'];
        var id = opts['id'];
        delete opts['symbol'];
        delete opts['id'];
        delete opts['properties'];
        _this = _JSONAble.call(this, opts) || this;
        if (symbol) _this.setSymbol(symbol);
        if (properties) _this.setProperties(properties);
        if (!isNil(id)) _this.setId(id);
        return _this;
    }
    var _proto = Geometry.prototype;
    _proto.getFirstCoordinate = function() {
        if ('GeometryCollection' === this.type) {
            var geometries = this.getGeometries();
            if (!geometries.length) return null;
            return geometries[0].getFirstCoordinate();
        }
        var coordinates = this.getCoordinates();
        if (!Array.isArray(coordinates)) return coordinates;
        do coordinates = coordinates[0];
        while (Array.isArray(coordinates) && coordinates.length > 0);
        return coordinates;
    };
    _proto.getLastCoordinate = function() {
        if ('GeometryCollection' === this.type) {
            var geometries = this.getGeometries();
            if (!geometries.length) return null;
            return geometries[geometries.length - 1].getLastCoordinate();
        }
        var coordinates = this.getCoordinates();
        if (!Array.isArray(coordinates)) return coordinates;
        do coordinates = coordinates[coordinates.length - 1];
        while (Array.isArray(coordinates) && coordinates.length > 0);
        return coordinates;
    };
    _proto.addTo = function(layer, fitview) {
        layer.addGeometry(this, fitview);
        return this;
    };
    _proto.getLayer = function() {
        if (!this._layer) return null;
        return this._layer;
    };
    _proto.getMap = function() {
        if (!this._layer) return null;
        return this._layer.getMap();
    };
    _proto.getId = function() {
        return this._id;
    };
    _proto.setId = function(id) {
        var oldId = this.getId();
        this._id = id;
        this._fireEvent('idchange', {
            old: oldId,
            new: id
        });
        return this;
    };
    _proto.getProperties = function() {
        if (!this.properties) {
            if (this._getParent()) return this._getParent().getProperties();
            return null;
        }
        return this.properties;
    };
    _proto.setProperties = function(properties) {
        var old = this.properties;
        this.properties = isObject(properties) ? extend({}, properties) : properties;
        this._repaint();
        this._fireEvent('propertieschange', {
            old: old,
            new: properties
        });
        return this;
    };
    _proto.getType = function() {
        return this.type;
    };
    _proto.getSymbol = function() {
        var s = this._symbol;
        if (s) {
            if (!Array.isArray(s)) return extend({}, s);
            return extendSymbol(s);
        }
        return null;
    };
    _proto.setSymbol = function(symbol) {
        this._symbol = this._prepareSymbol(symbol);
        this.onSymbolChanged();
        return this;
    };
    _proto.updateSymbol = function(props) {
        if (!props) return this;
        var s = this._getSymbol();
        s = s ? extendSymbol(s, props) : extendSymbol(this._getInternalSymbol(), props);
        this._eventSymbolProperties = props;
        return this.setSymbol(s);
    };
    _proto.getCenter = function() {
        return this._computeCenter(this._getMeasurer());
    };
    _proto.getExtent = function() {
        var prjExt = this._getPrjExtent();
        var projection = this._getProjection();
        if (!prjExt || !projection) return this._computeExtent(this._getMeasurer());
        var min = projection.unproject(new maptalks_es_Coordinate(prjExt['xmin'], prjExt['ymin'])), max = projection.unproject(new maptalks_es_Coordinate(prjExt['xmax'], prjExt['ymax']));
        return new maptalks_es_Extent(min, max, projection);
    };
    _proto.getContainerExtent = function(out) {
        var painter = this._getPainter();
        return painter ? painter.getContainerExtent(out) : null;
    };
    _proto.getSize = function() {
        var extent = this.getContainerExtent();
        return extent ? extent.getSize() : null;
    };
    _proto.containsPoint = function(containerPoint, t) {
        if (!this.getMap()) throw new Error('The geometry is required to be added on a map to perform "containsPoint".');
        if (containerPoint instanceof maptalks_es_Coordinate) containerPoint = this.getMap().coordToContainerPoint(containerPoint);
        return this._containsPoint(containerPoint, t);
    };
    _proto._containsPoint = function(containerPoint, t) {
        var painter = this._getPainter();
        if (!painter) return false;
        if (isNil(t) && this._hitTestTolerance) t = this._hitTestTolerance();
        return painter.hitTest(containerPoint, t);
    };
    _proto.show = function() {
        this.options['visible'] = true;
        if (this.getMap()) {
            var painter = this._getPainter();
            if (painter) painter.show();
            this._fireEvent('show');
        }
        return this;
    };
    _proto.hide = function() {
        this.options['visible'] = false;
        if (this.getMap()) {
            this.onHide();
            var painter = this._getPainter();
            if (painter) painter.hide();
            this._fireEvent('hide');
        }
        return this;
    };
    _proto.isVisible = function() {
        if (!this.options['visible']) return false;
        var symbol = this._getInternalSymbol();
        if (!symbol) return true;
        if (!Array.isArray(symbol)) return isNil(symbol['opacity']) || isNumber(symbol['opacity']) && symbol['opacity'] > 0;
        if (!symbol.length) return true;
        for(var i = 0, l = symbol.length; i < l; i++)if (isNil(symbol[i]['opacity']) || symbol[i]['opacity'] > 0) return true;
        return false;
    };
    _proto.getZIndex = function() {
        return this.options['zIndex'] || 0;
    };
    _proto.setZIndex = function(zIndex) {
        var old = this.options['zIndex'];
        this.options['zIndex'] = zIndex;
        this._fireEvent('zindexchange', {
            old: old,
            new: zIndex
        });
        return this;
    };
    _proto.setZIndexSilently = function(zIndex) {
        this.options['zIndex'] = zIndex;
        return this;
    };
    _proto.bringToFront = function() {
        var layer = this.getLayer();
        if (!layer || !layer.getGeoMaxZIndex) return this;
        var topZ = layer.getGeoMaxZIndex();
        this.setZIndex(topZ + 1);
        return this;
    };
    _proto.bringToBack = function() {
        var layer = this.getLayer();
        if (!layer || !layer.getGeoMinZIndex) return this;
        var bottomZ = layer.getGeoMinZIndex();
        this.setZIndex(bottomZ - 1);
        return this;
    };
    _proto.translate = function(x, y) {
        if (isNil(x)) return this;
        var offset = new maptalks_es_Coordinate(x, y);
        if (0 === offset.x && 0 === offset.y) return this;
        var coordinates = this.getCoordinates();
        if (coordinates) {
            if (Array.isArray(coordinates)) {
                var translated = forEachCoord(coordinates, function(coord) {
                    return coord.add(offset);
                });
                this.setCoordinates(translated);
            } else this.setCoordinates(coordinates.add(offset));
        }
        return this;
    };
    _proto.flash = function(interval, count, cb, context) {
        return flash.call(this, interval, count, cb, context);
    };
    _proto.copy = function() {
        var json = this.toJSON();
        var ret = Geometry.fromJSON(json);
        ret.options['visible'] = true;
        return ret;
    };
    _proto.remove = function() {
        var layer = this.getLayer();
        if (!layer) return this;
        this._fireEvent('removestart');
        this._unbind();
        this._fireEvent('removeend');
        this._fireEvent('remove');
        return this;
    };
    _proto.toGeoJSONGeometry = function() {
        var gJson = this._exportGeoJSONGeometry();
        return gJson;
    };
    _proto.toGeoJSON = function(opts) {
        if (!opts) opts = {};
        var feature = {
            type: 'Feature',
            geometry: null
        };
        if (isNil(opts['geometry']) || opts['geometry']) {
            var geoJSON = this._exportGeoJSONGeometry();
            feature['geometry'] = geoJSON;
        }
        var id = this.getId();
        if (!isNil(id)) feature['id'] = id;
        var properties;
        if (isNil(opts['properties']) || opts['properties']) properties = this._exportProperties();
        feature['properties'] = properties;
        return feature;
    };
    _proto.toJSON = function(options) {
        if (!options) options = {};
        var json = this._toJSON(options);
        var other = this._exportGraphicOptions(options);
        extend(json, other);
        return json;
    };
    _proto.getLength = function() {
        return this._computeGeodesicLength(this._getMeasurer());
    };
    _proto.getArea = function() {
        return this._computeGeodesicArea(this._getMeasurer());
    };
    _proto.rotate = function(angle, pivot) {
        if ('GeometryCollection' === this.type) {
            var geometries = this.getGeometries();
            geometries.forEach(function(g) {
                return g.rotate(angle, pivot);
            });
            return this;
        }
        pivot = pivot ? new maptalks_es_Coordinate(pivot) : this.getCenter();
        var measurer = this._getMeasurer();
        var coordinates = this.getCoordinates();
        if (!Array.isArray(coordinates)) {
            if (pivot.x !== coordinates.x || pivot.y !== coordinates.y) {
                var c = measurer._rotate(coordinates, pivot, angle);
                this.setCoordinates(c);
            }
            return this;
        }
        forEachCoord(coordinates, function(c) {
            return measurer._rotate(c, pivot, angle);
        });
        this.setCoordinates(coordinates);
        return this;
    };
    _proto._getConnectPoints = function() {
        return [
            this.getCenter()
        ];
    };
    _proto._initOptions = function(options) {
        var opts = extend({}, options);
        var symbol = opts['symbol'];
        var properties = opts['properties'];
        var id = opts['id'];
        delete opts['symbol'];
        delete opts['id'];
        delete opts['properties'];
        this.setOptions(opts);
        if (symbol) this.setSymbol(symbol);
        if (properties) this.setProperties(properties);
        if (!isNil(id)) this.setId(id);
    };
    _proto._bindLayer = function(layer) {
        if (this.getLayer()) throw new Error('Geometry cannot be added to two or more layers at the same time.');
        this._layer = layer;
        this._clearCache();
    };
    _proto._prepareSymbol = function(symbol) {
        if (Array.isArray(symbol)) {
            var cookedSymbols = [];
            for(var i = 0; i < symbol.length; i++)cookedSymbols.push(convertResourceUrl(this._checkAndCopySymbol(symbol[i])));
            return cookedSymbols;
        }
        if (symbol) {
            symbol = this._checkAndCopySymbol(symbol);
            return convertResourceUrl(symbol);
        }
        return null;
    };
    _proto._checkAndCopySymbol = function(symbol) {
        var s = {};
        for(var i in symbol)if (NUMERICAL_PROPERTIES[i] && isString(symbol[i])) s[i] = +symbol[i];
        else s[i] = symbol[i];
        return s;
    };
    _proto._getSymbol = function() {
        return this._symbol;
    };
    _proto._setExternSymbol = function(symbol) {
        this._eventSymbolProperties = symbol;
        this._externSymbol = this._prepareSymbol(symbol);
        this.onSymbolChanged();
        return this;
    };
    _proto._getInternalSymbol = function() {
        if (this._symbol) return this._symbol;
        if (this._externSymbol) return this._externSymbol;
        if (this.options['symbol']) return this.options['symbol'];
        return null;
    };
    _proto._getPrjExtent = function() {
        var p = this._getProjection();
        this._verifyProjection();
        if (!this._extent && p) this._extent = this._computePrjExtent(p);
        return this._extent;
    };
    _proto._unbind = function() {
        var layer = this.getLayer();
        if (!layer) return;
        if (this._animPlayer) this._animPlayer.finish();
        this._clearHandlers();
        this._unbindMenu();
        this._unbindInfoWindow();
        if (this.isEditing()) this.endEdit();
        this._removePainter();
        if (this.onRemove) this.onRemove();
        if (layer.onRemoveGeometry) layer.onRemoveGeometry(this);
        delete this._layer;
        delete this._internalId;
        delete this._extent;
    };
    _proto._getInternalId = function() {
        return this._internalId;
    };
    _proto._setInternalId = function(id) {
        this._internalId = id;
    };
    _proto._getMeasurer = function() {
        if (this._getProjection()) return this._getProjection();
        return maptalks_es_SpatialReference.getProjectionInstance(this.options['defaultProjection']);
    };
    _proto._getProjection = function() {
        var map = this.getMap();
        if (map) return map.getProjection();
        return null;
    };
    _proto._verifyProjection = function() {
        var projection = this._getProjection();
        if (this._projCode && projection && this._projCode !== projection.code) this._clearProjection();
        this._projCode = projection ? projection.code : this._projCode;
    };
    _proto._getExternalResources = function() {
        var symbol = this._getInternalSymbol();
        return getExternalResources(symbol);
    };
    _proto._getPainter = function() {
        var layer = this.getLayer();
        if (!this._painter && layer) {
            if (-1 !== GEOMETRY_COLLECTION_TYPES.indexOf(this.type)) {
                if (layer.constructor.getCollectionPainterClass) {
                    var clazz = layer.constructor.getCollectionPainterClass();
                    this._painter = new clazz(this);
                }
            } else if (layer.constructor.getPainterClass) {
                var _clazz = layer.constructor.getPainterClass();
                this._painter = new _clazz(this);
            }
        }
        return this._painter;
    };
    _proto._getMaskPainter = function() {
        if (this._maskPainter) return this._maskPainter;
        this._maskPainter = this.getGeometries && this.getGeometries() ? new maptalks_es_CollectionPainter(this, true) : new maptalks_es_Painter(this);
        return this._maskPainter;
    };
    _proto._removePainter = function() {
        if (this._painter) this._painter.remove();
        delete this._painter;
    };
    _proto._paint = function(extent) {
        if (this._painter) this._painter.paint(extent);
    };
    _proto._clearCache = function() {
        delete this._extent;
    };
    _proto._clearProjection = function() {
        delete this._extent;
    };
    _proto._repaint = function() {
        if (this._painter) this._painter.repaint();
    };
    _proto.onHide = function() {
        this.closeMenu();
        this.closeInfoWindow();
    };
    _proto.onShapeChanged = function() {
        this._clearCache();
        this._repaint();
        this._fireEvent('shapechange');
    };
    _proto.onPositionChanged = function() {
        this._clearCache();
        this._repaint();
        this._fireEvent('positionchange');
    };
    _proto.onSymbolChanged = function() {
        if (this._painter) this._painter.refreshSymbol();
        var e = {};
        if (this._eventSymbolProperties) {
            e.properties = extend({}, this._eventSymbolProperties);
            delete this._eventSymbolProperties;
        }
        this._fireEvent('symbolchange', e);
    };
    _proto.onConfig = function(conf) {
        var properties;
        if (conf['properties']) {
            properties = conf['properties'];
            delete conf['properties'];
        }
        var needRepaint = false;
        for(var p in conf)if (conf.hasOwnProperty(p)) {
            var prefix = p.slice(0, 5);
            if ('arrow' === prefix || 'smoot' === prefix) {
                needRepaint = true;
                break;
            }
        }
        if (properties) {
            this.setProperties(properties);
            this._repaint();
        } else if (needRepaint) this._repaint();
    };
    _proto._setParent = function(geometry) {
        if (geometry) this._parent = geometry;
    };
    _proto._getParent = function() {
        return this._parent;
    };
    _proto._fireEvent = function(eventName, param) {
        if (this.getLayer() && this.getLayer()._onGeometryEvent) {
            if (!param) param = {};
            param['type'] = eventName;
            param['target'] = this;
            this.getLayer()._onGeometryEvent(param);
        }
        this.fire(eventName, param);
    };
    _proto._toJSON = function(options) {
        return {
            feature: this.toGeoJSON(options)
        };
    };
    _proto._exportGraphicOptions = function(options) {
        var json = {};
        if (isNil(options['options']) || options['options']) json['options'] = this.config();
        if (isNil(options['symbol']) || options['symbol']) json['symbol'] = this.getSymbol();
        if (isNil(options['infoWindow']) || options['infoWindow']) {
            if (this._infoWinOptions) json['infoWindow'] = this._infoWinOptions;
        }
        return json;
    };
    _proto._exportGeoJSONGeometry = function() {
        var points = this.getCoordinates();
        var coordinates = maptalks_es_Coordinate.toNumberArrays(points);
        return {
            type: this.getType(),
            coordinates: coordinates
        };
    };
    _proto._exportProperties = function() {
        var properties = null;
        var geoProperties = this.getProperties();
        if (!isNil(geoProperties)) properties = isObject(geoProperties) ? extend({}, geoProperties) : geoProperties;
        return properties;
    };
    _proto.getAltitude = function() {
        var layer = this.getLayer();
        if (!layer) return 0;
        var layerOpts = layer.options, properties = this.getProperties();
        var altitude = layerOpts['enableAltitude'] ? properties ? properties[layerOpts['altitudeProperty']] : 0 : 0;
        var layerAltitude = layer.getAltitude ? layer.getAltitude() : 0;
        if (Array.isArray(altitude)) return altitude.map(function(alt) {
            return alt + layerAltitude;
        });
        return altitude + layerAltitude;
    };
    return Geometry;
}(JSONAble(maptalks_es_Eventable(Handlerable(maptalks_es_Class))));
maptalks_es_Geometry.mergeOptions(maptalks_es_options);
var options$1 = {
    attribution: null,
    minZoom: null,
    maxZoom: null,
    visible: true,
    opacity: 1,
    globalCompositeOperation: null,
    renderer: 'canvas',
    debugOutline: '#0f0',
    cssFilter: null,
    forceRenderOnMoving: false,
    forceRenderOnZooming: false,
    forceRenderOnRotating: false,
    hitDetect: function() {
        return !Browser$1.mobile;
    }()
};
var maptalks_es_Layer = function(_JSONAble) {
    _inheritsLoose(Layer, _JSONAble);
    function Layer(id, options) {
        var _this;
        var canvas;
        if (options) {
            canvas = options.canvas;
            delete options.canvas;
        }
        _this = _JSONAble.call(this, options) || this;
        _this._canvas = canvas;
        _this.setId(id);
        if (options) {
            _this.setZIndex(options.zIndex);
            if (options.mask) _this.setMask(maptalks_es_Geometry.fromJSON(options.mask));
        }
        return _this;
    }
    var _proto = Layer.prototype;
    _proto.load = function() {
        if (!this.getMap()) return this;
        if (this.onLoad()) {
            this._initRenderer();
            var zIndex = this.getZIndex();
            if (!isNil(zIndex)) {
                this._renderer.setZIndex(zIndex);
                if (!this.isCanvasRender()) this._renderer.render();
            }
            this.onLoadEnd();
        }
        return this;
    };
    _proto.getId = function() {
        return this._id;
    };
    _proto.setId = function(id) {
        var old = this._id;
        if (!isNil(id)) id += '';
        this._id = id;
        this.fire('idchange', {
            old: old,
            new: id
        });
        return this;
    };
    _proto.addTo = function(map) {
        map.addLayer(this);
        return this;
    };
    _proto.setZIndex = function(zIndex) {
        this._zIndex = zIndex;
        if (isNil(zIndex)) delete this.options['zIndex'];
        else this.options.zIndex = zIndex;
        if (this.map) this.map._sortLayersByZIndex();
        if (this._renderer) this._renderer.setZIndex(zIndex);
        return this;
    };
    _proto.getZIndex = function() {
        return this._zIndex || 0;
    };
    _proto.getMinZoom = function() {
        var map = this.getMap();
        var minZoom = this.options['minZoom'];
        return map ? Math.max(map.getMinZoom(), minZoom || 0) : minZoom;
    };
    _proto.getMaxZoom = function() {
        var map = this.getMap();
        var maxZoom = this.options['maxZoom'];
        return map ? Math.min(map.getMaxZoom(), isNil(maxZoom) ? 1 / 0 : maxZoom) : maxZoom;
    };
    _proto.getOpacity = function() {
        return this.options['opacity'];
    };
    _proto.setOpacity = function(op) {
        this.config('opacity', op);
        return this;
    };
    _proto.isCanvasRender = function() {
        var renderer = this._getRenderer();
        return renderer && renderer instanceof maptalks_es_CanvasRenderer;
    };
    _proto.getMap = function() {
        if (this.map) return this.map;
        return null;
    };
    _proto.getProjection = function() {
        var map = this.getMap();
        return map ? map.getProjection() : null;
    };
    _proto.bringToFront = function() {
        var layers = this._getLayerList();
        if (!layers.length) return this;
        var topLayer = layers[layers.length - 1];
        if (1 === layers.length || topLayer === this) return this;
        var max = topLayer.getZIndex();
        this.setZIndex(max + 1);
        return this;
    };
    _proto.bringToBack = function() {
        var layers = this._getLayerList();
        if (!layers.length) return this;
        var bottomLayer = layers[0];
        if (1 === layers.length || bottomLayer === this) return this;
        var min = bottomLayer.getZIndex();
        this.setZIndex(min - 1);
        return this;
    };
    _proto.show = function() {
        var _this2 = this;
        if (!this.options['visible']) {
            this.options['visible'] = true;
            var renderer = this.getRenderer();
            if (renderer) renderer.show();
            var map = this.getMap();
            if (renderer && map) map.once('renderend', function() {
                _this2.fire('show');
            });
            else this.fire('show');
        }
        return this;
    };
    _proto.hide = function() {
        var _this3 = this;
        if (this.options['visible']) {
            this.options['visible'] = false;
            var renderer = this.getRenderer();
            if (renderer) renderer.hide();
            var map = this.getMap();
            if (renderer && map) map.once('renderend', function() {
                _this3.fire('hide');
            });
            else this.fire('hide');
        }
        return this;
    };
    _proto.isVisible = function() {
        if (isNumber(this.options['opacity']) && this.options['opacity'] <= 0) return false;
        var map = this.getMap();
        if (map) {
            var zoom = map.getZoom();
            if (!isNil(this.options['maxZoom']) && this.options['maxZoom'] < zoom || !isNil(this.options['minZoom']) && this.options['minZoom'] > zoom) return false;
        }
        if (isNil(this.options['visible'])) this.options['visible'] = true;
        return this.options['visible'];
    };
    _proto.remove = function() {
        if (this.map) this.map.removeLayer(this);
        return this;
    };
    _proto.getMask = function() {
        return this._mask;
    };
    _proto.setMask = function(mask) {
        if (!('Point' === mask.type && mask._isVectorMarker() || 'Polygon' === mask.type || 'MultiPolygon' === mask.type)) throw new Error('Mask for a layer must be a marker with vector marker symbol or a Polygon(MultiPolygon).');
        mask._bindLayer(this);
        if ('Point' === mask.type) mask.updateSymbol({
            markerLineColor: 'rgba(0, 0, 0, 0)',
            markerFillOpacity: 0
        });
        else mask.setSymbol({
            lineColor: 'rgba(0, 0, 0, 0)',
            polygonOpacity: 0
        });
        this._mask = mask;
        this.options.mask = mask.toJSON();
        if (!this.getMap() || this.getMap().isZooming()) return this;
        var renderer = this._getRenderer();
        if (renderer && renderer.setToRedraw) this._getRenderer().setToRedraw();
        return this;
    };
    _proto.removeMask = function() {
        delete this._mask;
        delete this.options.mask;
        if (!this.getMap() || this.getMap().isZooming()) return this;
        var renderer = this._getRenderer();
        if (renderer && renderer.setToRedraw) this._getRenderer().setToRedraw();
        return this;
    };
    _proto.onLoad = function() {
        return true;
    };
    _proto.onLoadEnd = function() {};
    _proto.isLoaded = function() {
        return !!this._loaded;
    };
    _proto.getRenderer = function() {
        return this._getRenderer();
    };
    _proto.onConfig = function(conf) {
        if (isNumber(conf['opacity']) || conf['cssFilter']) {
            var renderer = this.getRenderer();
            if (renderer) renderer.setToRedraw();
        }
    };
    _proto.onAdd = function() {};
    _proto.onRendererCreate = function() {};
    _proto.onCanvasCreate = function() {};
    _proto.onRemove = function() {};
    _proto._bindMap = function(map, zIndex) {
        if (!map) return;
        this.map = map;
        if (!isNil(zIndex)) this.setZIndex(zIndex);
        this._switchEvents('on', this);
        this.onAdd();
        this.fire('add');
    };
    _proto._initRenderer = function() {
        var renderer = this.options['renderer'];
        if (!this.constructor.getRendererClass) return;
        var clazz = this.constructor.getRendererClass(renderer);
        if (!clazz) throw new Error('Invalid renderer for Layer(' + this.getId() + '):' + renderer);
        this._renderer = new clazz(this);
        this._renderer.layer = this;
        this._renderer.setZIndex(this.getZIndex());
        this._switchEvents('on', this._renderer);
        if (this._renderer.onAdd) this._renderer.onAdd();
        this.onRendererCreate();
        this.fire('renderercreate', {
            renderer: this._renderer
        });
    };
    _proto._doRemove = function() {
        this._loaded = false;
        this.onRemove();
        this._switchEvents('off', this);
        if (this._renderer) {
            this._switchEvents('off', this._renderer);
            this._renderer.remove();
            delete this._renderer;
        }
        delete this.map;
    };
    _proto._switchEvents = function(to, emitter) {
        if (emitter && emitter.getEvents) this.getMap()[to](emitter.getEvents(), emitter);
    };
    _proto._getRenderer = function() {
        return this._renderer;
    };
    _proto._getLayerList = function() {
        if (!this.map) return [];
        return this.map._layers;
    };
    _proto._getMask2DExtent = function() {
        if (!this._mask || !this.getMap()) return null;
        var painter = this._mask._getMaskPainter();
        if (!painter) return null;
        return painter.get2DExtent();
    };
    return Layer;
}(JSONAble(maptalks_es_Eventable(Renderable(maptalks_es_Class))));
maptalks_es_Layer.mergeOptions(options$1);
var maptalks_es_fire = maptalks_es_Layer.prototype.fire;
maptalks_es_Layer.prototype.fire = function(eventType, param) {
    if ('layerload' === eventType) this._loaded = true;
    if (this.map) {
        if (!param) param = {};
        param['type'] = eventType;
        param['target'] = this;
        this.map._onLayerEvent(param);
    }
    return maptalks_es_fire.apply(this, arguments);
};
var options$2 = {
    maxVisualPitch: 70,
    maxPitch: 80,
    centerCross: false,
    zoomInCenter: false,
    zoomOrigin: null,
    zoomAnimation: function() {
        return !IS_NODE;
    }(),
    zoomAnimationDuration: 330,
    panAnimation: function() {
        return !IS_NODE;
    }(),
    panAnimationDuration: 600,
    zoomable: true,
    enableInfoWindow: true,
    hitDetect: function() {
        return !Browser$1.mobile;
    }(),
    hitDetectLimit: 5,
    fpsOnInteracting: 25,
    layerCanvasLimitOnInteracting: -1,
    maxZoom: null,
    minZoom: null,
    maxExtent: null,
    fixCenterOnResize: true,
    checkSize: true,
    checkSizeInterval: 1000,
    renderer: 'canvas',
    cascadePitches: [
        10,
        60
    ]
};
var Map$1 = function(_Handlerable) {
    _inheritsLoose(Map, _Handlerable);
    function Map(container, options) {
        var _this;
        if (!options) throw new Error('Invalid options when creating map.');
        if (!options['center']) throw new Error('Invalid center when creating map.');
        var opts = extend({}, options);
        var zoom = opts['zoom'];
        delete opts['zoom'];
        var center = new maptalks_es_Coordinate(opts['center']);
        delete opts['center'];
        var baseLayer = opts['baseLayer'];
        delete opts['baseLayer'];
        var layers = opts['layers'];
        delete opts['layers'];
        _this = _Handlerable.call(this, opts) || this;
        _this.VERSION = Map.VERSION;
        Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), 'id', {
            value: UID(),
            writable: false
        });
        _this._loaded = false;
        _this._initContainer(container);
        _this._panels = {};
        _this._baseLayer = null;
        _this._layers = [];
        _this._zoomLevel = zoom;
        _this._center = center;
        _this.setSpatialReference(opts['spatialReference'] || opts['view']);
        _this.setMaxExtent(opts['maxExtent']);
        _this._mapViewPoint = new maptalks_es_Point(0, 0);
        _this._initRenderer();
        _this._updateMapSize(_this._getContainerDomSize());
        if (baseLayer) _this.setBaseLayer(baseLayer);
        if (layers) _this.addLayer(layers);
        _this._Load();
        return _this;
    }
    Map.addOnLoadHook = function(fn) {
        var args = Array.prototype.slice.call(arguments, 1);
        var onload = 'function' == typeof fn ? fn : function() {
            this[fn].apply(this, args);
        };
        this.prototype._onLoadHooks = this.prototype._onLoadHooks || [];
        this.prototype._onLoadHooks.push(onload);
        return this;
    };
    var _proto = Map.prototype;
    _proto.isLoaded = function() {
        return !!this._loaded;
    };
    _proto.getContainer = function() {
        return this._containerDOM;
    };
    _proto.getSpatialReference = function() {
        return this._spatialReference;
    };
    _proto.setSpatialReference = function(ref) {
        var oldRef = this.options['spatialReference'];
        if (this._loaded && maptalks_es_SpatialReference.equals(oldRef, ref)) return this;
        this._updateSpatialReference(ref, oldRef);
        return this;
    };
    _proto._updateSpatialReference = function(ref, oldRef) {
        ref = extend({}, ref);
        this._center = this.getCenter();
        this.options['spatialReference'] = ref;
        this._spatialReference = new maptalks_es_SpatialReference(ref);
        if (this.options['spatialReference'] && isFunction(this.options['spatialReference']['projection'])) {
            var projection = this._spatialReference.getProjection();
            this.options['spatialReference']['projection'] = projection['code'];
        }
        this._resetMapStatus();
        this._fireEvent('spatialreferencechange', {
            old: oldRef,
            new: extend({}, this.options['spatialReference'])
        });
        return this;
    };
    _proto.onConfig = function(conf) {
        var ref = conf['spatialReference'] || conf['view'];
        if (!isNil(ref)) this._updateSpatialReference(ref, null);
        return this;
    };
    _proto.getProjection = function() {
        if (!this._spatialReference) return null;
        return this._spatialReference.getProjection();
    };
    _proto.getFullExtent = function() {
        if (!this._spatialReference) return null;
        return this._spatialReference.getFullExtent();
    };
    _proto.setCursor = function(cursor) {
        delete this._cursor;
        this._trySetCursor(cursor);
        this._cursor = cursor;
        return this;
    };
    _proto.resetCursor = function() {
        return this.setCursor(null);
    };
    _proto.getCenter = function() {
        if (!this._loaded || !this._prjCenter) return this._center;
        var projection = this.getProjection();
        return projection.unproject(this._prjCenter);
    };
    _proto.setCenter = function(center) {
        if (!center) return this;
        center = new maptalks_es_Coordinate(center);
        var projection = this.getProjection();
        var pcenter = projection.project(center);
        if (!this._verifyExtent(pcenter)) return this;
        if (!this._loaded) {
            this._center = center;
            return this;
        }
        this.onMoveStart();
        this._setPrjCenter(pcenter);
        this.onMoveEnd(this._parseEventFromCoord(this.getCenter()));
        return this;
    };
    _proto.getSize = function() {
        if (isNil(this.width) || isNil(this.height)) return this._getContainerDomSize();
        return new maptalks_es_Size(this.width, this.height);
    };
    _proto.getContainerExtent = function() {
        var visualHeight = this.height;
        var pitch = this.getPitch(), maxVisualPitch = this.options['maxVisualPitch'];
        if (maxVisualPitch && pitch > maxVisualPitch) visualHeight = this._getVisualHeight(maxVisualPitch);
        return new maptalks_es_PointExtent(0, this.height - visualHeight, this.width, this.height);
    };
    _proto._getVisualHeight = function(visualPitch) {
        visualPitch = visualPitch || 1E-2;
        var pitch = (90 - this.getPitch()) * Math.PI / 180;
        var fov = this.getFov() * Math.PI / 180;
        visualPitch *= Math.PI / 180;
        var cameraToCenter = this.cameraCenterDistance / this.getGLScale();
        var tanB = Math.tan(fov / 2);
        var tanP = Math.tan(visualPitch);
        var visualDistance = cameraToCenter * tanB / (1 / tanP - tanB) / Math.sin(visualPitch);
        var x = Math.sin(pitch) * visualDistance / (cameraToCenter + Math.cos(pitch) * visualDistance) * cameraToCenter;
        return this.height / 2 + x;
    };
    _proto.getExtent = function() {
        return this._pointToExtent(this._get2DExtent());
    };
    _proto.getProjExtent = function() {
        var extent2D = this._get2DExtent();
        return new maptalks_es_Extent(this._pointToPrj(extent2D.getMin()), this._pointToPrj(extent2D.getMax()));
    };
    _proto.getPrjExtent = function() {
        return this.getProjExtent();
    };
    _proto.getMaxExtent = function() {
        if (!this.options['maxExtent']) return null;
        return new maptalks_es_Extent(this.options['maxExtent'], this.getProjection());
    };
    _proto.setMaxExtent = function(extent) {
        if (extent) {
            var maxExt = new maptalks_es_Extent(extent, this.getProjection());
            this.options['maxExtent'] = maxExt;
            if (!this._verifyExtent(this._getPrjCenter())) this._panTo(this._prjMaxExtent().getCenter());
            var projection = this.getProjection();
            this._prjMaxExtent = maxExt.convertTo(function(c) {
                return projection.project(c);
            });
        } else {
            delete this.options['maxExtent'];
            delete this._prjMaxExtent;
        }
        return this;
    };
    _proto.getZoom = function() {
        return this._zoomLevel;
    };
    _proto.getZoomForScale = function(scale, fromZoom, isFraction) {
        var zoom = this.getZoom();
        if (isNil(fromZoom)) fromZoom = zoom;
        if (1 === scale && fromZoom === zoom) return zoom;
        var res = this._getResolution(fromZoom), targetRes = res / scale;
        var scaleZoom = this.getZoomFromRes(targetRes);
        if (isFraction) return scaleZoom;
        var delta = 1E-6;
        return this.getSpatialReference().getZoomDirection() < 0 ? Math.ceil(scaleZoom - delta) : Math.floor(scaleZoom + delta);
    };
    _proto.getZoomFromRes = function(res) {
        var resolutions = this._getResolutions(), minRes = this._getResolution(this.getMinZoom()), maxRes = this._getResolution(this.getMaxZoom());
        if (minRes <= maxRes) {
            if (res <= minRes) return this.getMinZoom();
            if (res >= maxRes) return this.getMaxZoom();
        } else if (res >= minRes) return this.getMinZoom();
        else if (res <= maxRes) return this.getMaxZoom();
        var l = resolutions.length;
        for(var i = 0; i < l - 1; i++){
            if (!!resolutions[i]) {
                var gap = resolutions[i + 1] - resolutions[i];
                var test = res - resolutions[i];
                if (sign(gap) === sign(test) && Math.abs(gap) >= Math.abs(test)) return i + test / gap;
            }
        }
        return l - 1;
    };
    _proto.setZoom = function(zoom, options) {
        if (void 0 === options) options = {
            animation: true
        };
        if (isNaN(zoom) || isNil(zoom)) return this;
        zoom = +zoom;
        if (this._loaded && this.options['zoomAnimation'] && options['animation']) this._zoomAnimation(zoom);
        else this._zoom(zoom);
        return this;
    };
    _proto.getMaxZoom = function() {
        if (!isNil(this.options['maxZoom'])) return this.options['maxZoom'];
        return this.getMaxNativeZoom();
    };
    _proto.setMaxZoom = function(maxZoom) {
        var viewMaxZoom = this.getMaxNativeZoom();
        if (maxZoom > viewMaxZoom) maxZoom = viewMaxZoom;
        if (null !== maxZoom && maxZoom < this._zoomLevel) {
            this.setZoom(maxZoom);
            maxZoom = +maxZoom;
        }
        this.options['maxZoom'] = maxZoom;
        return this;
    };
    _proto.getMinZoom = function() {
        if (!isNil(this.options['minZoom'])) return this.options['minZoom'];
        return this._spatialReference.getMinZoom();
    };
    _proto.setMinZoom = function(minZoom) {
        if (null !== minZoom) {
            minZoom = +minZoom;
            var viewMinZoom = this._spatialReference.getMinZoom();
            if (minZoom < viewMinZoom) minZoom = viewMinZoom;
            if (minZoom > this._zoomLevel) this.setZoom(minZoom);
        }
        this.options['minZoom'] = minZoom;
        return this;
    };
    _proto.getMaxNativeZoom = function() {
        var ref = this.getSpatialReference();
        if (!ref) return null;
        return ref.getMaxZoom();
    };
    _proto.getGLZoom = function() {
        return this.getMaxNativeZoom() / 2;
    };
    _proto.getGLScale = function(zoom) {
        if (isNil(zoom)) zoom = this.getZoom();
        return this._getResolution(zoom) / this._getResolution(this.getGLZoom());
    };
    _proto.zoomIn = function() {
        return this.setZoom(this.getZoom() + 1);
    };
    _proto.zoomOut = function() {
        return this.setZoom(this.getZoom() - 1);
    };
    _proto.isZooming = function() {
        return !!this._zooming;
    };
    _proto.isInteracting = function() {
        return this.isZooming() || this.isMoving() || this.isRotating();
    };
    _proto.setCenterAndZoom = function(center, zoom) {
        if (isNil(zoom) || this._zoomLevel === zoom) this.setCenter(center);
        else {
            this.setCenter(center);
            this.setZoom(zoom, {
                animation: false
            });
        }
        return this;
    };
    _proto.getFitZoom = function(extent, isFraction) {
        var _this2 = this;
        if (!extent || !(extent instanceof maptalks_es_Extent)) return this._zoomLevel;
        if (extent['xmin'] === extent['xmax'] && extent['ymin'] === extent['ymax']) return this.getMaxZoom();
        var size = this.getSize();
        var containerExtent = extent.convertTo(function(p) {
            return _this2.coordToContainerPoint(p);
        });
        var w = containerExtent.getWidth(), h = containerExtent.getHeight();
        var scaleX = size['width'] / w, scaleY = size['height'] / h;
        var scale = this.getSpatialReference().getZoomDirection() < 0 ? Math.max(scaleX, scaleY) : Math.min(scaleX, scaleY);
        var zoom = this.getZoomForScale(scale, null, isFraction);
        return zoom;
    };
    _proto.getView = function() {
        return {
            center: this.getCenter().toArray(),
            zoom: this.getZoom(),
            pitch: this.getPitch(),
            bearing: this.getBearing()
        };
    };
    _proto.setView = function(view) {
        if (!view) return this;
        if (view['center']) this.setCenter(view['center']);
        if (null !== view['zoom'] && !isNaN(+view['zoom'])) this.setZoom(+view['zoom'], {
            animation: false
        });
        if (null !== view['pitch'] && !isNaN(+view['pitch'])) this.setPitch(+view['pitch']);
        if (null !== view['pitch'] && !isNaN(+view['bearing'])) this.setBearing(+view['bearing']);
        return this;
    };
    _proto.getResolution = function(zoom) {
        return this._getResolution(zoom);
    };
    _proto.getScale = function(zoom) {
        var z = isNil(zoom) ? this.getZoom() : zoom;
        var max = this._getResolution(this.getMaxNativeZoom()), res = this._getResolution(z);
        return res / max;
    };
    _proto.fitExtent = function(extent, zoomOffset, options, step) {
        if (void 0 === options) options = {};
        if (!extent) return this;
        extent = new maptalks_es_Extent(extent, this.getProjection());
        var zoom = this.getFitZoom(extent) + (zoomOffset || 0);
        var center = extent.getCenter();
        if (void 0 === options['animation'] || options['animation']) return this._animateTo({
            center: center,
            zoom: zoom
        }, {
            duration: options['duration'] || this.options['zoomAnimationDuration'],
            easing: options['easing'] || 'out'
        }, step);
        return this.setCenterAndZoom(center, zoom);
    };
    _proto.getBaseLayer = function() {
        return this._baseLayer;
    };
    _proto.setBaseLayer = function(baseLayer) {
        var isChange = false;
        if (this._baseLayer) {
            isChange = true;
            this._fireEvent('baselayerchangestart');
            this._baseLayer.remove();
        }
        if (!baseLayer) {
            delete this._baseLayer;
            this._fireEvent('baselayerchangeend');
            this._fireEvent('setbaselayer');
            return this;
        }
        this._baseLayer = baseLayer;
        baseLayer._bindMap(this, -1);
        function onbaseLayerload() {
            this._fireEvent('baselayerload');
            if (isChange) {
                isChange = false;
                this._fireEvent('baselayerchangeend');
            }
        }
        this._baseLayer.on('layerload', onbaseLayerload, this);
        if (this._loaded) this._baseLayer.load();
        this._fireEvent('setbaselayer');
        return this;
    };
    _proto.removeBaseLayer = function() {
        if (this._baseLayer) {
            this._baseLayer.remove();
            delete this._baseLayer;
            this._fireEvent('baselayerremove');
        }
        return this;
    };
    _proto.getLayers = function(filter) {
        return this._getLayers(function(layer) {
            if (layer === this._baseLayer || layer.getId().indexOf(INTERNAL_LAYER_PREFIX) >= 0) return false;
            if (filter) return filter(layer);
            return true;
        });
    };
    _proto.getLayer = function(id) {
        if (!id) return null;
        var layer = this._layerCache ? this._layerCache[id] : null;
        if (layer) return layer;
        var baseLayer = this.getBaseLayer();
        if (baseLayer && baseLayer.getId() === id) return baseLayer;
        return null;
    };
    _proto.addLayer = function(layers) {
        if (!layers) return this;
        if (!Array.isArray(layers)) {
            layers = Array.prototype.slice.call(arguments, 0);
            return this.addLayer(layers);
        }
        if (!this._layerCache) this._layerCache = {};
        var mapLayers = this._layers;
        for(var i = 0, len = layers.length; i < len; i++){
            var layer = layers[i];
            var id = layer.getId();
            if (isNil(id)) throw new Error('Invalid id for the layer: ' + id);
            if (layer.getMap() !== this) {
                if (this._layerCache[id]) throw new Error('Duplicate layer id in the map: ' + id);
                this._layerCache[id] = layer;
                layer._bindMap(this);
                mapLayers.push(layer);
                if (this._loaded) layer.load();
            }
        }
        this._sortLayersByZIndex();
        this._fireEvent('addlayer', {
            layers: layers
        });
        return this;
    };
    _proto.removeLayer = function(layers) {
        if (!layers) return this;
        if (!Array.isArray(layers)) return this.removeLayer([
            layers
        ]);
        var removed = [];
        for(var i = 0, len = layers.length; i < len; i++){
            var layer = layers[i];
            if (!(layer instanceof maptalks_es_Layer)) layer = this.getLayer(layer);
            if (!layer) continue;
            var map = layer.getMap();
            if (!!map && map === this) {
                removed.push(layer);
                this._removeLayer(layer, this._layers);
                if (this._loaded) layer._doRemove();
                var id = layer.getId();
                if (this._layerCache) delete this._layerCache[id];
            }
        }
        if (removed.length > 0) {
            var renderer = this.getRenderer();
            if (renderer) renderer.setLayerCanvasUpdated();
            this.once('frameend', function() {
                removed.forEach(function(layer) {
                    layer.fire('remove');
                });
            });
        }
        this._fireEvent('removelayer', {
            layers: layers
        });
        return this;
    };
    _proto.sortLayers = function(layers) {
        if (!layers || !Array.isArray(layers)) return this;
        var layersToOrder = [];
        var minZ = Number.MAX_VALUE;
        for(var i = 0, l = layers.length; i < l; i++){
            var layer = layers[i];
            if (isString(layers[i])) layer = this.getLayer(layer);
            if (!(layer instanceof maptalks_es_Layer) || !layer.getMap() || layer.getMap() !== this) throw new Error('It must be a layer added to this map to order.');
            if (layer.getZIndex() < minZ) minZ = layer.getZIndex();
            layersToOrder.push(layer);
        }
        for(var _i = 0, _l = layersToOrder.length; _i < _l; _i++)layersToOrder[_i].setZIndex(minZ + _i);
        return this;
    };
    _proto.toDataURL = function(options) {
        if (!options) options = {};
        var mimeType = options['mimeType'];
        if (!mimeType) mimeType = 'image/png';
        var save = options['save'];
        var renderer = this._getRenderer();
        if (renderer && renderer.toDataURL) {
            var file = options['fileName'];
            if (!file) file = 'export';
            var dataURL = renderer.toDataURL(mimeType);
            if (save && dataURL) {
                var imgURL;
                if ('undefined' != typeof Blob && 'undefined' != typeof atob) {
                    var blob = b64toBlob(dataURL.replace(/^data:image\/(png|jpeg|jpg);base64,/, ''), mimeType);
                    imgURL = URL.createObjectURL(blob);
                } else imgURL = dataURL;
                var dlLink = document.createElement('a');
                dlLink.download = file;
                dlLink.href = imgURL;
                document.body.appendChild(dlLink);
                dlLink.click();
                document.body.removeChild(dlLink);
            }
            return dataURL;
        }
        return null;
    };
    _proto.coordToPoint = function(coordinate, zoom, out) {
        return this.coordinateToPoint(coordinate, zoom, out);
    };
    _proto.pointToCoord = function(point, zoom, out) {
        return this.pointToCoordinate(point, zoom, out);
    };
    _proto.coordToViewPoint = function(coordinate, out, altitude) {
        return this.coordinateToViewPoint(coordinate, out, altitude);
    };
    _proto.viewPointToCoord = function(viewPoint, out) {
        return this.viewPointToCoordinate(viewPoint, out);
    };
    _proto.coordToContainerPoint = function(coordinate, zoom, out) {
        return this.coordinateToContainerPoint(coordinate, zoom, out);
    };
    _proto.containerPointToCoord = function(containerPoint, out) {
        return this.containerPointToCoordinate(containerPoint, out);
    };
    _proto.containerPointToViewPoint = function(containerPoint, out) {
        if (out) out.set(containerPoint.x, containerPoint.y);
        else out = containerPoint.copy();
        return out._sub(this.getViewPoint());
    };
    _proto.viewPointToContainerPoint = function(viewPoint, out) {
        if (out) out.set(viewPoint.x, viewPoint.y);
        else out = viewPoint.copy();
        return out._add(this.getViewPoint());
    };
    _proto.checkSize = function() {
        var justStart = now() - this._initTime < 1500 && 0 === this.width || 0 === this.height;
        var watched = this._getContainerDomSize(), oldHeight = this.height, oldWidth = this.width;
        if (watched['width'] === oldWidth && watched['height'] === oldHeight) return this;
        var center = this.getCenter();
        if (this.options['fixCenterOnResize']) this._updateMapSize(watched);
        else {
            var vh = this._getVisualHeight(this.getPitch());
            var nwCP = new maptalks_es_Point(0, this.height - vh);
            var nwCoord = this._containerPointToPrj(nwCP);
            this._updateMapSize(watched);
            var vhAfter = this._getVisualHeight(this.getPitch());
            var nwCPAfter = new maptalks_es_Point(0, this.height - vhAfter);
            this._setPrjCoordAtContainerPoint(nwCoord, nwCPAfter);
            this._mapViewCoord = this._getPrjCenter();
        }
        var hided = 0 === watched['width'] || 0 === watched['height'] || 0 === oldWidth || 0 === oldHeight;
        if (justStart || hided) {
            this._eventSilence = true;
            this.setCenter(center);
            delete this._eventSilence;
        }
        this._fireEvent('resize');
        return this;
    };
    _proto.locate = function(coordinate, dx, dy) {
        return this.getProjection()._locate(new maptalks_es_Coordinate(coordinate), dx, dy);
    };
    _proto.getMainPanel = function() {
        return this._getRenderer().getMainPanel();
    };
    _proto.getPanels = function() {
        return this._panels;
    };
    _proto.remove = function() {
        var _this3 = this;
        if (this.isRemoved()) return this;
        this._fireEvent('removestart');
        this._removeDomEvents();
        this._clearHandlers();
        this.removeBaseLayer();
        var layers = this.getLayers();
        for(var i = 0; i < layers.length; i++)layers[i].remove();
        if (this._getRenderer()) this._getRenderer().remove();
        if (this._containerDOM.childNodes && this._containerDOM.childNodes.length > 0) Array.prototype.slice.call(this._containerDOM.childNodes, 0).filter(function(node) {
            return 'maptalks-wrapper' === node.className;
        }).forEach(function(node) {
            return _this3._containerDOM.removeChild(node);
        });
        delete this._panels;
        delete this._containerDOM;
        delete this.renderer;
        this._fireEvent('removeend');
        this._clearAllListeners();
        return this;
    };
    _proto.isRemoved = function() {
        return !this._containerDOM;
    };
    _proto.isMoving = function() {
        return !!this._moving;
    };
    _proto.onMoveStart = function(param) {
        var prjCenter = this._getPrjCenter();
        if (!this._originCenter || this._verifyExtent(prjCenter)) this._originCenter = prjCenter;
        this._moving = true;
        this._trySetCursor('move');
        this._fireEvent('movestart', this._parseEvent(param ? param['domEvent'] : null, 'movestart'));
    };
    _proto.onMoving = function(param) {
        this._fireEvent('moving', this._parseEvent(param ? param['domEvent'] : null, 'moving'));
    };
    _proto.onMoveEnd = function(param) {
        this._moving = false;
        this._trySetCursor('default');
        this._fireEvent('moveend', param && param['domEvent'] ? this._parseEvent(param['domEvent'], 'moveend') : param);
        if (!this._verifyExtent(this._getPrjCenter()) && this._originCenter) {
            var moveTo = this._originCenter;
            this._panTo(moveTo);
        }
    };
    _proto.onDragRotateStart = function(param) {
        this._dragRotating = true;
        this._fireEvent('dragrotatestart', this._parseEvent(param ? param['domEvent'] : null, 'dragrotatestart'));
    };
    _proto.onDragRotating = function(param) {
        this._fireEvent('dragrotating', this._parseEvent(param ? param['domEvent'] : null, 'dragrotating'));
    };
    _proto.onDragRotateEnd = function(param) {
        this._dragRotating = false;
        this._fireEvent('dragrotateend', this._parseEvent(param ? param['domEvent'] : null, 'dragrotateend'));
    };
    _proto.isDragRotating = function() {
        return !!this._dragRotating;
    };
    _proto.getRenderer = function() {
        return this._getRenderer();
    };
    _proto.getDevicePixelRatio = function() {
        return this.options['devicePixelRatio'] || Browser$1.devicePixelRatio || 1;
    };
    _proto._initContainer = function(container) {
        if (isString(container)) {
            this._containerDOM = document.getElementById(container);
            if (!this._containerDOM) throw new Error('Invalid container when creating map: \'' + container + '\'');
        } else {
            this._containerDOM = container;
            if (IS_NODE) this.CanvasClass = this._containerDOM.constructor;
        }
        if (this._containerDOM.childNodes && this._containerDOM.childNodes.length > 0) {
            if ('maptalks-wrapper' === this._containerDOM.childNodes[0].className) throw new Error('Container is already loaded with another map instance, use map.remove() to clear it.');
        }
    };
    _proto._trySetCursor = function(cursor) {
        if (!this._cursor && !this._priorityCursor) {
            if (!cursor) cursor = 'default';
            this._setCursorToPanel(cursor);
        }
        return this;
    };
    _proto._setPriorityCursor = function(cursor) {
        if (cursor) {
            this._priorityCursor = cursor;
            this._setCursorToPanel(cursor);
        } else {
            var hasCursor = false;
            if (this._priorityCursor) hasCursor = true;
            delete this._priorityCursor;
            if (hasCursor) this.setCursor(this._cursor);
        }
        return this;
    };
    _proto._setCursorToPanel = function(cursor) {
        var panel = this.getMainPanel();
        if (panel && panel.style && panel.style.cursor !== cursor) panel.style.cursor = cursor;
    };
    _proto._removeLayer = function(layer, layerList) {
        if (!layer || !layerList) return;
        var index = layerList.indexOf(layer);
        if (index > -1) layerList.splice(index, 1);
    };
    _proto._sortLayersByZIndex = function() {
        if (!this._layers) return;
        for(var i = 0, l = this._layers.length; i < l; i++)this._layers[i]._order = i;
        this._layers.sort(function(a, b) {
            var c = a.getZIndex() - b.getZIndex();
            if (0 === c) return a._order - b._order;
            return c;
        });
    };
    _proto._fireEvent = function(eventName, param) {
        if (this._eventSilence) return;
        this.fire('_' + eventName, param);
        this.fire(eventName, param);
    };
    _proto._Load = function() {
        this._resetMapStatus();
        if (this.options['pitch']) {
            this.setPitch(this.options['pitch']);
            delete this.options['pitch'];
        }
        if (this.options['bearing']) {
            this.setBearing(this.options['bearing']);
            delete this.options['bearing'];
        }
        this._loadAllLayers();
        this._getRenderer().onLoad();
        this._loaded = true;
        this._callOnLoadHooks();
        this._initTime = now();
    };
    _proto._initRenderer = function() {
        var renderer = this.options['renderer'];
        var clazz = Map.getRendererClass(renderer);
        this._renderer = new clazz(this);
        this._renderer.load();
    };
    _proto._getRenderer = function() {
        return this._renderer;
    };
    _proto._loadAllLayers = function() {
        function loadLayer(layer) {
            if (layer) layer.load();
        }
        if (this._baseLayer) this._baseLayer.load();
        this._eachLayer(loadLayer, this.getLayers());
    };
    _proto._getLayers = function(filter) {
        var layers = this._baseLayer ? [
            this._baseLayer
        ].concat(this._layers) : this._layers;
        var result = [];
        for(var i = 0; i < layers.length; i++)if (!filter || filter.call(this, layers[i])) result.push(layers[i]);
        return result;
    };
    _proto._eachLayer = function(fn) {
        if (arguments.length < 2) return;
        var layerLists = Array.prototype.slice.call(arguments, 1);
        if (layerLists && !Array.isArray(layerLists)) layerLists = [
            layerLists
        ];
        var layers = [];
        for(var i = 0, len = layerLists.length; i < len; i++)layers = layers.concat(layerLists[i]);
        for(var j = 0, jlen = layers.length; j < jlen; j++)fn.call(fn, layers[j]);
    };
    _proto._onLayerEvent = function(param) {
        if (!param) return;
        if ('idchange' === param['type']) {
            delete this._layerCache[param['old']];
            this._layerCache[param['new']] = param['target'];
        }
    };
    _proto._resetMapStatus = function() {
        var maxZoom = this.getMaxZoom(), minZoom = this.getMinZoom();
        var viewMaxZoom = this._spatialReference.getMaxZoom(), viewMinZoom = this._spatialReference.getMinZoom();
        if (isNil(maxZoom) || -1 === maxZoom || maxZoom > viewMaxZoom) this.setMaxZoom(viewMaxZoom);
        if (isNil(minZoom) || -1 === minZoom || minZoom < viewMinZoom) this.setMinZoom(viewMinZoom);
        maxZoom = this.getMaxZoom();
        minZoom = this.getMinZoom();
        if (maxZoom < minZoom) this.setMaxZoom(minZoom);
        if (isNil(this._zoomLevel) || this._zoomLevel > maxZoom) this._zoomLevel = maxZoom;
        if (this._zoomLevel < minZoom) this._zoomLevel = minZoom;
        delete this._prjCenter;
        var projection = this.getProjection();
        this._prjCenter = projection.project(this._center);
        this._calcMatrices();
        var renderer = this._getRenderer();
        if (renderer) renderer.resetContainer();
    };
    _proto._getContainerDomSize = function() {
        if (!this._containerDOM) return null;
        var containerDOM = this._containerDOM;
        var width, height;
        if (isNil(containerDOM.width) || isNil(containerDOM.height)) {
            if (isNil(containerDOM.clientWidth) || isNil(containerDOM.clientHeight)) throw new Error('can not get size of container');
            else {
                width = parseInt(containerDOM.clientWidth, 0);
                height = parseInt(containerDOM.clientHeight, 0);
            }
        } else {
            width = containerDOM.width;
            height = containerDOM.height;
            var dpr = this.getDevicePixelRatio();
            if (1 !== dpr && containerDOM['layer']) {
                width /= dpr;
                height /= dpr;
            }
        }
        return new maptalks_es_Size(width, height);
    };
    _proto._updateMapSize = function(mSize) {
        this.width = mSize['width'];
        this.height = mSize['height'];
        this._getRenderer().updateMapSize(mSize);
        this._calcMatrices();
        return this;
    };
    _proto._getPrjCenter = function() {
        return this._prjCenter;
    };
    _proto._setPrjCenter = function(pcenter) {
        this._prjCenter = pcenter;
        if (this.isInteracting() && !this.isMoving()) this._mapViewCoord = pcenter;
        this._calcMatrices();
    };
    _proto._setPrjCoordAtContainerPoint = function(coordinate, point) {
        if (point.x === this.width / 2 && point.y === this.height / 2) return this;
        var t = this._containerPointToPoint(point)._sub(this._prjToPoint(this._getPrjCenter()));
        var pcenter = this._pointToPrj(this._prjToPoint(coordinate).sub(t));
        this._setPrjCenter(pcenter);
        return this;
    };
    _proto._verifyExtent = function(prjCenter) {
        if (!prjCenter) return false;
        var maxExt = this._prjMaxExtent;
        if (!maxExt) return true;
        return maxExt.contains(prjCenter);
    };
    _proto._offsetCenterByPixel = function(pixel) {
        var pos = new maptalks_es_Point(this.width / 2 - pixel.x, this.height / 2 - pixel.y);
        var pCenter = this._containerPointToPrj(pos);
        this._setPrjCenter(pCenter);
        return pCenter;
    };
    _proto.offsetPlatform = function(offset) {
        if (!offset) return this._mapViewPoint;
        this._getRenderer().offsetPlatform(offset);
        this._mapViewCoord = this._getPrjCenter();
        this._mapViewPoint = this._mapViewPoint.add(offset);
        return this;
    };
    _proto.getViewPoint = function() {
        var offset = this._getViewPointFrameOffset();
        var panelOffset = this.offsetPlatform();
        if (offset) panelOffset = panelOffset.add(offset);
        return panelOffset;
    };
    _proto._resetMapViewPoint = function() {
        this._mapViewPoint = new maptalks_es_Point(0, 0);
        this._mapViewCoord = this._getPrjCenter();
    };
    _proto._getResolution = function(zoom) {
        if ((void 0 === zoom || zoom === this._zoomLevel) && void 0 !== this._mapRes) return this._mapRes;
        if (zoom === this.getGLZoom() && void 0 !== this._mapGlRes) return this._mapGlRes;
        if (isNil(zoom)) zoom = this._zoomLevel;
        return this._spatialReference.getResolution(zoom);
    };
    _proto._getResolutions = function() {
        return this._spatialReference.getResolutions();
    };
    _proto._prjToPoint = function(pCoord, zoom, out) {
        zoom = isNil(zoom) ? this.getZoom() : zoom;
        return this._spatialReference.getTransformation().transform(pCoord, this._getResolution(zoom), out);
    };
    _proto._pointToPrj = function(point, zoom, out) {
        zoom = isNil(zoom) ? this.getZoom() : zoom;
        return this._spatialReference.getTransformation().untransform(point, this._getResolution(zoom), out);
    };
    _proto._pointToPoint = function(point, zoom, out) {
        if (out) {
            out.x = point.x;
            out.y = point.y;
        } else out = point.copy();
        if (!isNil(zoom)) return out._multi(this._getResolution(zoom) / this._getResolution());
        return out;
    };
    _proto._pointToPointAtZoom = function(point, zoom, out) {
        if (out) {
            out.x = point.x;
            out.y = point.y;
        } else out = point.copy();
        if (!isNil(zoom)) return out._multi(this._getResolution() / this._getResolution(zoom));
        return out;
    };
    _proto._containerPointToPrj = function(containerPoint, out) {
        return this._pointToPrj(this._containerPointToPoint(containerPoint, void 0, out), void 0, out);
    };
    _proto._callOnLoadHooks = function() {
        var proto = Map.prototype;
        if (!proto._onLoadHooks) return;
        for(var i = 0, l = proto._onLoadHooks.length; i < l; i++)proto._onLoadHooks[i].call(this);
    };
    return Map;
}(Handlerable(maptalks_es_Eventable(Renderable(maptalks_es_Class))));
Map$1.include({
    coordinateToPoint: function() {
        var COORD = new maptalks_es_Coordinate(0, 0);
        return function(coordinate, zoom, out) {
            var prjCoord = this.getProjection().project(coordinate, COORD);
            return this._prjToPoint(prjCoord, zoom, out);
        };
    }(),
    pointToCoordinate: function() {
        var COORD = new maptalks_es_Coordinate(0, 0);
        return function(point, zoom, out) {
            var prjCoord = this._pointToPrj(point, zoom, COORD);
            return this.getProjection().unproject(prjCoord, out);
        };
    }(),
    coordinateToViewPoint: function() {
        var COORD = new maptalks_es_Coordinate(0, 0);
        return function(coordinate, out, altitude) {
            return this._prjToViewPoint(this.getProjection().project(coordinate, COORD), out, altitude);
        };
    }(),
    viewPointToCoordinate: function() {
        var COORD = new maptalks_es_Coordinate(0, 0);
        return function(viewPoint, out) {
            return this.getProjection().unproject(this._viewPointToPrj(viewPoint, COORD), out);
        };
    }(),
    coordinateToContainerPoint: function() {
        var COORD = new maptalks_es_Coordinate(0, 0);
        return function(coordinate, zoom, out) {
            var pCoordinate = this.getProjection().project(coordinate, COORD);
            return this._prjToContainerPoint(pCoordinate, zoom, out);
        };
    }(),
    containerPointToCoordinate: function() {
        var COORD = new maptalks_es_Coordinate(0, 0);
        return function(containerPoint, out) {
            var pCoordinate = this._containerPointToPrj(containerPoint, COORD);
            return this.getProjection().unproject(pCoordinate, out);
        };
    }(),
    containerToExtent: function() {
        var POINT0 = new maptalks_es_Point(0, 0);
        var POINT1 = new maptalks_es_Point(0, 0);
        return function(containerExtent) {
            var extent2D = new maptalks_es_PointExtent(this._containerPointToPoint(containerExtent.getMin(POINT0), void 0, POINT0), this._containerPointToPoint(containerExtent.getMax(POINT1), void 0, POINT1));
            return this._pointToExtent(extent2D);
        };
    }(),
    distanceToPixel: function() {
        var POINT0 = new maptalks_es_Point(0, 0);
        var POINT1 = new maptalks_es_Point(0, 0);
        return function(xDist, yDist, zoom) {
            var projection = this.getProjection();
            if (!projection) return null;
            var scale = this.getScale() / this.getScale(zoom);
            var center = this.getCenter(), target = projection.locate(center, xDist, yDist);
            var p0 = this.coordToContainerPoint(center, void 0, POINT0), p1 = this.coordToContainerPoint(target, void 0, POINT1);
            p1._sub(p0)._multi(scale)._abs();
            return new maptalks_es_Size(p1.x, p1.y);
        };
    }(),
    distanceToPoint: function() {
        var POINT = new maptalks_es_Point(0, 0);
        return function(xDist, yDist, zoom, paramCenter) {
            var projection = this.getProjection();
            if (!projection) return null;
            var center = paramCenter || this.getCenter(), target = projection.locate(center, xDist, yDist);
            var p0 = this.coordToPoint(center, zoom, POINT), p1 = this.coordToPoint(target, zoom);
            p1._sub(p0)._abs();
            return p1;
        };
    }(),
    pixelToDistance: function() {
        var COORD0 = new maptalks_es_Coordinate(0, 0);
        var COORD1 = new maptalks_es_Coordinate(0, 0);
        return function(width, height) {
            var projection = this.getProjection();
            if (!projection) return null;
            var fullExt = this.getFullExtent();
            var d = fullExt['top'] > fullExt['bottom'] ? -1 : 1;
            var target = COORD0.set(this.width / 2 + width, this.height / 2 + d * height);
            var coord = this.containerPointToCoord(target, COORD1);
            return projection.measureLength(this.getCenter(), coord);
        };
    }(),
    pointToDistance: function() {
        var POINT = new maptalks_es_Point(0, 0);
        var COORD = new maptalks_es_Coordinate(0, 0);
        return function(dx, dy, zoom) {
            var projection = this.getProjection();
            if (!projection) return null;
            var c = this._prjToPoint(this._getPrjCenter(), zoom, POINT);
            c._add(dx, dy);
            var target = this.pointToCoord(c, zoom, COORD);
            return projection.measureLength(this.getCenter(), target);
        };
    }(),
    locateByPoint: function() {
        var POINT = new maptalks_es_Point(0, 0);
        return function(coordinate, px, py) {
            var point = this.coordToContainerPoint(coordinate, void 0, POINT);
            return this.containerPointToCoord(point._add(px, py));
        };
    }(),
    _get2DExtent: function() {
        var POINT = new maptalks_es_Point(0, 0);
        return function(zoom, out) {
            var _this4 = this;
            var cached;
            if ((void 0 === zoom || zoom === this._zoomLevel) && this._mapExtent2D) cached = this._mapExtent2D;
            else if (zoom === this.getGLZoom() && this._mapGlExtent2D) cached = this._mapGlExtent2D;
            if (cached) {
                if (out) {
                    out.set(cached['xmin'], cached['ymin'], cached['xmax'], cached['ymax']);
                    return out;
                }
                return cached.copy();
            }
            var cExtent = this.getContainerExtent();
            return cExtent.convertTo(function(c) {
                return _this4._containerPointToPoint(c, zoom, POINT);
            }, out);
        };
    }(),
    _pointToExtent: function() {
        var COORD0 = new maptalks_es_Coordinate(0, 0);
        var COORD1 = new maptalks_es_Coordinate(0, 0);
        return function(extent2D) {
            var min2d = extent2D.getMin(), max2d = extent2D.getMax();
            var fullExtent = this.getFullExtent();
            var _ref = !fullExtent || fullExtent.left <= fullExtent.right ? [
                min2d.x,
                max2d.x
            ] : [
                max2d.x,
                min2d.x
            ], minx = _ref[0], maxx = _ref[1];
            var _ref2 = !fullExtent || fullExtent.top > fullExtent.bottom ? [
                max2d.y,
                min2d.y
            ] : [
                min2d.y,
                max2d.y
            ], miny = _ref2[0], maxy = _ref2[1];
            var min = min2d.set(minx, maxy);
            var max = max2d.set(maxx, miny);
            return new maptalks_es_Extent(this.pointToCoord(min, void 0, COORD0), this.pointToCoord(max, void 0, COORD1), this.getProjection());
        };
    }(),
    _getViewPointFrameOffset: function() {
        var POINT = new maptalks_es_Point(0, 0);
        return function() {
            if (this.isZooming()) return null;
            var pcenter = this._getPrjCenter();
            if (this._mapViewCoord && !this._mapViewCoord.equals(pcenter)) return this._prjToContainerPoint(this._mapViewCoord)._sub(this._prjToContainerPoint(pcenter, void 0, POINT));
            return null;
        };
    }(),
    _viewPointToPrj: function() {
        var POINT = new maptalks_es_Point(0, 0);
        return function(viewPoint, out) {
            return this._containerPointToPrj(this.viewPointToContainerPoint(viewPoint, POINT), out);
        };
    }(),
    _prjToContainerPoint: function() {
        var POINT = new maptalks_es_Point(0, 0);
        return function(pCoordinate, zoom, out, altitude) {
            return this._pointToContainerPoint(this._prjToPoint(pCoordinate, zoom, POINT), zoom, altitude || 0, out);
        };
    }(),
    _prjToViewPoint: function() {
        var POINT = new maptalks_es_Point(0, 0);
        return function(pCoordinate, out, altitude) {
            var containerPoint = this._prjToContainerPoint(pCoordinate, void 0, POINT, altitude);
            return this.containerPointToViewPoint(containerPoint, out);
        };
    }(),
    _viewPointToPoint: function() {
        var POINT = new maptalks_es_Point(0, 0);
        return function(viewPoint, zoom, out) {
            return this._containerPointToPoint(this.viewPointToContainerPoint(viewPoint, POINT), zoom, out);
        };
    }(),
    _pointToViewPoint: function() {
        var COORD = new maptalks_es_Coordinate(0, 0);
        return function(point, zoom, out) {
            return this._prjToViewPoint(this._pointToPrj(point, zoom, COORD), out);
        };
    }()
});
Map$1.mergeOptions(options$2);
var maptalks_es_MapDoubleClickZoomHandler = function(_Handler) {
    _inheritsLoose(MapDoubleClickZoomHandler, _Handler);
    function MapDoubleClickZoomHandler() {
        return _Handler.apply(this, arguments) || this;
    }
    var _proto = MapDoubleClickZoomHandler.prototype;
    _proto.addHooks = function() {
        if (!this.target) return;
        this.target.on('_dblclick', this._onDoubleClick, this);
    };
    _proto.removeHooks = function() {
        if (!this.target) return;
        this.target.off('_dblclick', this._onDoubleClick, this);
    };
    _proto._onDoubleClick = function(param) {
        var map = this.target;
        if (map.options['doubleClickZoom']) {
            var oldZoom = map.getZoom(), zoom = param['domEvent']['shiftKey'] ? Math.ceil(oldZoom) - 1 : Math.floor(oldZoom) + 1;
            map._zoomAnimation(zoom, param['containerPoint']);
        }
    };
    return MapDoubleClickZoomHandler;
}(Handler$1);
Map$1.mergeOptions({
    doubleClickZoom: true
});
Map$1.addOnLoadHook('addHandler', 'doubleClickZoom', maptalks_es_MapDoubleClickZoomHandler);
var maptalks_es_MapDragHandler = function(_Handler) {
    _inheritsLoose(MapDragHandler, _Handler);
    function MapDragHandler() {
        return _Handler.apply(this, arguments) || this;
    }
    var _proto = MapDragHandler.prototype;
    _proto.addHooks = function() {
        var map = this.target;
        if (!map) return;
        var dom = map._panels.mapWrapper || map._containerDOM;
        this._dragHandler = new maptalks_es_DragHandler(dom, {
            cancelOn: this._cancelOn.bind(this),
            rightclick: true
        });
        this._dragHandler.on('mousedown', this._onMouseDown, this).on('dragstart', this._onDragStart, this).on('dragging', this._onDragging, this).on('dragend', this._onDragEnd, this).enable();
    };
    _proto.removeHooks = function() {
        this._dragHandler.off('mousedown', this._onMouseDown, this).off('dragstart', this._onDragStart, this).off('dragging', this._onDragging, this).off('dragend', this._onDragEnd, this);
        this._dragHandler.remove();
        delete this._dragHandler;
    };
    _proto._cancelOn = function(domEvent) {
        if (this.target.isZooming() || this._ignore(domEvent)) return true;
        return false;
    };
    _proto._ignore = function(param) {
        if (!param) return false;
        if (param.domEvent) param = param.domEvent;
        return this.target._ignoreEvent(param);
    };
    _proto._onMouseDown = function(param) {
        delete this.startDragTime;
        delete this._mode;
        if (2 === param.domEvent.button || param.domEvent.ctrlKey) {
            if (this.target.options['dragRotate'] || this.target.options['dragPitch']) this._mode = 'rotatePitch';
        } else if (this.target.options['dragPan']) this._mode = 'move';
        this.target._stopAnim(this.target._mapAnimPlayer);
        preventDefault(param['domEvent']);
    };
    _proto._onDragStart = function(param) {
        this.startDragTime = now();
        if ('move' === this._mode) this._moveStart(param);
        else if ('rotatePitch' === this._mode) this._rotateStart(param);
    };
    _proto._onDragging = function(param) {
        var map = this.target;
        if (map._isEventOutMap(param['domEvent'])) return;
        if ('move' === this._mode) this._moving(param);
        else if ('rotatePitch' === this._mode) this._rotating(param);
    };
    _proto._onDragEnd = function(param) {
        if ('move' === this._mode) this._moveEnd(param);
        else if ('rotatePitch' === this._mode) this._rotateEnd(param);
        delete this.startDragTime;
        delete this.startBearing;
    };
    _proto._start = function(param) {
        this.preX = param['mousePos'].x;
        this.preY = param['mousePos'].y;
        this.startX = this.preX;
        this.startY = this.preY;
    };
    _proto._moveStart = function(param) {
        this._start(param);
        var map = this.target;
        map.onMoveStart(param);
        var p = getEventContainerPoint(map._getActualEvent(param.domEvent), map.getContainer());
        this.startPrjCoord = map._containerPointToPrj(p);
    };
    _proto._moving = function(param) {
        if (!this.startDragTime) return;
        var map = this.target;
        var p = getEventContainerPoint(map._getActualEvent(param.domEvent), map.getContainer());
        map._setPrjCoordAtContainerPoint(this.startPrjCoord, p);
        map.onMoving(param);
    };
    _proto._moveEnd = function(param) {
        if (!this.startDragTime) return;
        var map = this.target;
        var t = now() - this.startDragTime;
        var mx = param['mousePos'].x, my = param['mousePos'].y;
        var dx = mx - this.startX;
        var dy = my - this.startY;
        this._clear();
        if (map.options['panAnimation'] && !param.interupted && map._verifyExtent(map._getPrjCenter()) && t < 280 && Math.abs(dy) + Math.abs(dx) > 5) {
            t = 5 * t * (Math.abs(dx) + Math.abs(dy)) / 500;
            map.panBy(new maptalks_es_Point(dx, dy), {
                duration: t
            });
        } else map.onMoveEnd(param);
    };
    _proto._rotateStart = function(param) {
        this._start(param);
        delete this._rotateMode;
        this.startBearing = this.target.getBearing();
        this.target.onDragRotateStart(param);
        this._db = 0;
    };
    _proto._rotating = function(param) {
        var map = this.target;
        var mx = param['mousePos'].x, my = param['mousePos'].y;
        var prePitch = map.getPitch(), preBearing = map.getBearing();
        var dx = Math.abs(mx - this.preX), dy = Math.abs(my - this.preY);
        if (!this._rotateMode) {
            if (map.options['dragRotatePitch']) this._rotateMode = 'rotate_pitch';
            else if (dx > dy) this._rotateMode = 'rotate';
            else if (dx < dy) this._rotateMode = 'pitch';
            else this._rotateMode = 'rotate';
        }
        if ('pitch' === this._rotateMode && 0 === prePitch && dy < 10) return;
        if (this._rotateMode.indexOf('rotate') >= 0 && map.options['dragRotate']) {
            var db = 0;
            db = map.options['dragPitch'] || dx > dy ? -0.6 * (this.preX - mx) : mx > map.width / 2 ? 0.6 * (this.preY - my) : -0.6 * (this.preY - my);
            var bearing = map.getBearing() + db;
            this._db = this._db || 0;
            this._db += db;
            map.setBearing(bearing);
        }
        if (this._rotateMode.indexOf('pitch') >= 0 && map.options['dragPitch']) map.setPitch(map.getPitch() + (this.preY - my) * 0.4);
        this.preX = mx;
        this.preY = my;
        if (map.getBearing() !== preBearing || map.getPitch() !== prePitch) map.onDragRotating(param);
    };
    _proto._rotateEnd = function(param) {
        var map = this.target;
        var bearing = map.getBearing();
        this._clear();
        var t = now() - this.startDragTime;
        map.onDragRotateEnd(param);
        if (Math.abs(bearing - this.startBearing) > 20 && ('rotate' === this._rotateMode || 'rotate_pitch' === this._rotateMode) && !param.interupted && t < 400) {
            var _bearing = map.getBearing();
            map._animateTo({
                bearing: _bearing + this._db / 2
            }, {
                easing: 'out',
                duration: 800
            });
        }
    };
    _proto._clear = function() {
        delete this.startPrjCoord;
        delete this.preX;
        delete this.preY;
        delete this.startX;
        delete this.startY;
    };
    return MapDragHandler;
}(Handler$1);
Map$1.mergeOptions({
    draggable: true,
    dragPan: true,
    dragRotatePitch: true,
    dragRotate: true,
    dragPitch: true
});
Map$1.addOnLoadHook('addHandler', 'draggable', maptalks_es_MapDragHandler);
var EVENTS = "mousedown mouseup mousemove click dblclick contextmenu touchstart touchmove touchend";
var maptalks_es_MapGeometryEventsHandler = function(_Handler) {
    _inheritsLoose(MapGeometryEventsHandler, _Handler);
    function MapGeometryEventsHandler() {
        return _Handler.apply(this, arguments) || this;
    }
    var _proto = MapGeometryEventsHandler.prototype;
    _proto.addHooks = function() {
        var map = this.target;
        var dom = map._panels.allLayers || map._containerDOM;
        on(dom, EVENTS, this._identifyGeometryEvents, this);
    };
    _proto.removeHooks = function() {
        var map = this.target;
        var dom = map._panels.allLayers || map._containerDOM;
        off(dom, EVENTS, this._identifyGeometryEvents, this);
    };
    _proto._identifyGeometryEvents = function(domEvent, type) {
        var map = this.target;
        if (map.isInteracting() || map._ignoreEvent(domEvent)) return;
        var layers = map._getLayers(function(layer) {
            if (layer.identify && layer.options['geometryEvents']) return true;
            return false;
        });
        if (!layers.length) return;
        var oneMoreEvent = null;
        var eventType = type || domEvent.type;
        if ('mousedown' === eventType || 'touchstart' === eventType && 1 === domEvent.touches.length) this._mouseDownTime = now();
        else if (('click' === eventType || 'touchend' === eventType) && this._mouseDownTime) {
            var downTime = this._mouseDownTime;
            delete this._mouseDownTime;
            var time = now();
            if (time - downTime > 300) {
                if ('click' === eventType) return;
            } else if ('touchend' === eventType) oneMoreEvent = 'click';
        }
        var actual = domEvent.touches && domEvent.touches.length > 0 ? domEvent.touches[0] : domEvent.changedTouches && domEvent.changedTouches.length > 0 ? domEvent.changedTouches[0] : domEvent;
        if (!actual) return;
        var containerPoint = getEventContainerPoint(actual, map._containerDOM), coordinate = map.containerPointToCoordinate(containerPoint);
        if ('touchstart' === eventType) preventDefault(domEvent);
        var geometryCursorStyle = null;
        var identifyOptions = {
            includeInternals: true,
            filter: function(geometry) {
                if (!(geometry instanceof maptalks_es_Geometry)) return false;
                var eventToFire = geometry._getEventTypeToFire(domEvent);
                if ('mousemove' === eventType) {
                    if (!geometryCursorStyle && geometry.options['cursor']) geometryCursorStyle = geometry.options['cursor'];
                    if (!geometry.listens('mousemove') && !geometry.listens('mouseover') && !geometry.listens('mouseenter')) return false;
                } else if (!geometry.listens(eventToFire) && !geometry.listens(oneMoreEvent)) return false;
                return true;
            },
            count: 1,
            coordinate: coordinate,
            onlyVisible: map.options['onlyVisibleGeometryEvents'],
            layers: layers
        };
        var callback = fireGeometryEvent.bind(this);
        if ('mousemove' === eventType || 'touchmove' === eventType) this._queryIdentifyTimeout = map.getRenderer().callInNextFrame(function() {
            if (map.isInteracting()) return;
            map.identify(identifyOptions, callback);
        });
        else map.identify(identifyOptions, callback);
        function fireGeometryEvent(geometries) {
            var propagation = true;
            if ('mousemove' === eventType) {
                var geoMap = {};
                if (geometries.length > 0) for(var i = geometries.length - 1; i >= 0; i--){
                    var geo = geometries[i];
                    if (geo instanceof maptalks_es_Geometry) {
                        var iid = geo._getInternalId();
                        geoMap[iid] = geo;
                        geo._onEvent(domEvent);
                        if (!this._prevOverGeos || !this._prevOverGeos.geomap[iid]) geo._onEvent(domEvent, 'mouseenter');
                        propagation = geo._onEvent(domEvent, 'mouseover');
                    }
                }
                map._setPriorityCursor(geometryCursorStyle);
                var oldTargets = this._prevOverGeos && this._prevOverGeos.geos;
                this._prevOverGeos = {
                    geos: geometries,
                    geomap: geoMap
                };
                if (oldTargets && oldTargets.length > 0) for(var _i = oldTargets.length - 1; _i >= 0; _i--){
                    var oldTarget = oldTargets[_i];
                    if (oldTarget instanceof maptalks_es_Geometry) {
                        var oldTargetId = oldTargets[_i]._getInternalId();
                        if (!geoMap[oldTargetId]) propagation = oldTarget._onEvent(domEvent, 'mouseout');
                    }
                }
            } else {
                if (!geometries || !geometries.length) return;
                for(var _i2 = geometries.length - 1; _i2 >= 0; _i2--){
                    if (geometries[_i2] instanceof maptalks_es_Geometry) {
                        propagation = geometries[_i2]._onEvent(domEvent);
                        if (oneMoreEvent) geometries[_i2]._onEvent(domEvent, oneMoreEvent);
                        break;
                    }
                }
            }
            if (false === propagation) stopPropagation(domEvent);
        }
    };
    return MapGeometryEventsHandler;
}(Handler$1);
Map$1.mergeOptions({
    geometryEvents: true,
    onlyVisibleGeometryEvents: true
});
Map$1.addOnLoadHook('addHandler', 'geometryEvents', maptalks_es_MapGeometryEventsHandler);
var wheelZoomDelta = 4.000244140625;
var defaultZoomRate = 0.01;
var wheelZoomRate = 1 / 450;
var maxScalePerFrame = 2;
var maptalks_es_MapScrollWheelZoomHandler = function(_Handler) {
    _inheritsLoose(MapScrollWheelZoomHandler, _Handler);
    function MapScrollWheelZoomHandler(target) {
        var _this;
        _this = _Handler.call(this, target) || this;
        _this._thisScrollZoom = _this._scrollZoom.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        _this._wheelZoomRate = wheelZoomRate;
        _this._defaultZoomRate = defaultZoomRate;
        _this._delta = 0;
        return _this;
    }
    var _proto = MapScrollWheelZoomHandler.prototype;
    _proto.addHooks = function() {
        addDomEvent(this.target._containerDOM, 'wheel', this._onWheelScroll, this);
    };
    _proto.removeHooks = function() {
        removeDomEvent(this.target._containerDOM, 'wheel', this._onWheelScroll);
    };
    _proto._onWheelScroll = function(evt) {
        preventDefault(evt);
        stopPropagation(evt);
        var map = this.target;
        if (map._ignoreEvent(evt) || !map.options['zoomable']) return false;
        var container = map._containerDOM;
        var origin = map._checkZoomOrigin(getEventContainerPoint(evt, container));
        if (!map.options['seamlessZoom']) return this._interval(evt, origin);
        if (!this._zooming) {
            this._trackPadSuspect = 0;
            this._ensureTrackpad = false;
        }
        return this._seamless(evt, origin);
    };
    _proto._seamless = function(evt, origin) {
        var value = evt.deltaMode === window.WheelEvent.DOM_DELTA_LINE ? 60 * evt.deltaY : evt.deltaY;
        if (value % wheelZoomDelta !== 0) {
            if (!this._ensureTrackpad) {
                if (Math.abs(value) < 60) this._trackPadSuspect++;
                else this._trackPadSuspect = 0;
                if (this._trackPadSuspect >= 2) this._ensureTrackpad = true;
            }
            if (this._ensureTrackpad) value *= 14;
        }
        if (evt.shiftKey && value) value /= 4;
        this._lastWheelEvent = evt;
        this._delta -= value;
        if (!this._zooming && this._delta) {
            var map = this.target;
            this._zoomOrigin = origin;
            map.onZoomStart(null, origin);
        }
        this._start();
    };
    _proto._start = function() {
        if (!this._delta) return;
        this._zooming = true;
        var map = this.target;
        if (!this._active) {
            map.getRenderer().callInNextFrame(this._thisScrollZoom);
            this._active = true;
        }
    };
    _proto._scrollZoom = function() {
        var _this2 = this;
        this._active = false;
        if (!this._delta) return;
        var zoomRate = Math.abs(this._delta) > wheelZoomDelta ? this._wheelZoomRate : this._defaultZoomRate;
        var scale = maxScalePerFrame / (1 + Math.exp(-Math.abs(this._delta * zoomRate)));
        if (this._delta < 0 && 0 !== scale) scale = 1 / scale;
        var map = this.target;
        var zoom = map.getZoom();
        var targetZoom = map.getZoomForScale(scale, zoom, true);
        this._delta = 0;
        map.onZooming(targetZoom, this._zoomOrigin);
        if (this._timeout) clearTimeout(this._timeout);
        this._timeout = setTimeout(function() {
            _this2._zooming = false;
            delete _this2._timeout;
            map.onZoomEnd(map.getZoom(), _this2._zoomOrigin);
        }, 210);
    };
    _proto._interval = function(evt, origin) {
        var _this3 = this;
        var map = this.target;
        if (this._zooming) {
            this._requesting++;
            return false;
        }
        this._requesting = 0;
        var levelValue = (evt.deltaY ? -1 * evt.deltaY : evt.wheelDelta ? evt.wheelDelta : evt.detail) > 0 ? 1 : -1;
        if (evt.detail) levelValue *= -1;
        var zoom = map.getZoom();
        var nextZoom = zoom + levelValue;
        nextZoom = map._checkZoom(levelValue > 0 ? Math.ceil(nextZoom) : Math.floor(nextZoom));
        if (nextZoom === zoom) return false;
        this._zooming = true;
        if (!this._delta) {
            map.onZoomStart(null, origin);
            this._origin = origin;
            this._delta = levelValue;
            this._startZoom = map.getZoom();
        }
        var duration = 90;
        map._animateTo({
            zoom: nextZoom - 1 * this._delta / 2,
            around: this._origin
        }, {
            continueOnViewChanged: true,
            easing: 'linear',
            duration: duration,
            wheelZoom: true
        }, function(frame) {
            if ('finished' !== frame.state.playState) {
                if ('running' !== frame.state.playState) {
                    delete _this3._zooming;
                    delete _this3._requesting;
                }
                return;
            }
            if (_this3._requesting < 1 || Math.abs(nextZoom - _this3._startZoom) > 2 || nextZoom === map.getMaxZoom() || nextZoom === map.getMinZoom()) {
                map._animateTo({
                    zoom: nextZoom,
                    around: _this3._origin
                }, {
                    continueOnViewChanged: true,
                    duration: 100
                }, function(frame) {
                    if ('running' !== frame.state.playState) {
                        delete _this3._zooming;
                        delete _this3._requesting;
                    }
                });
                delete _this3._startZoom;
                delete _this3._origin;
                delete _this3._delta;
                _this3._requesting = 0;
            } else if (!isNil(_this3._requesting)) {
                delete _this3._zooming;
                _this3._onWheelScroll(evt);
            }
        });
        return false;
    };
    return MapScrollWheelZoomHandler;
}(Handler$1);
Map$1.mergeOptions({
    scrollWheelZoom: true,
    seamlessZoom: false
});
Map$1.addOnLoadHook('addHandler', 'scrollWheelZoom', maptalks_es_MapScrollWheelZoomHandler);
var maptalks_es_MapTouchZoomHandler = function(_Handler) {
    _inheritsLoose(MapTouchZoomHandler, _Handler);
    function MapTouchZoomHandler() {
        return _Handler.apply(this, arguments) || this;
    }
    var _proto = MapTouchZoomHandler.prototype;
    _proto.addHooks = function() {
        addDomEvent(this.target.getContainer(), 'touchstart', this._onTouchStart, this);
    };
    _proto.removeHooks = function() {
        removeDomEvent(this.target.getContainer(), 'touchstart', this._onTouchStart);
    };
    _proto._onTouchStart = function(event) {
        var map = this.target;
        if (!event.touches || event.touches.length < 2) return;
        var container = map.getContainer();
        var p1 = getEventContainerPoint(event.touches[0], container), p2 = getEventContainerPoint(event.touches[1], container);
        this.preY = p1.y;
        this._startP1 = p1;
        this._startP2 = p2;
        this._startDist = p1.distanceTo(p2);
        this._startVector = p1.sub(p2);
        this._startZoom = map.getZoom();
        this._startBearing = map.getBearing();
        off(document, 'touchmove', this._onTouchMove, this);
        off(document, 'touchend', this._onTouchEnd, this);
        addDomEvent(document, 'touchmove', this._onTouchMove, this);
        addDomEvent(document, 'touchend', this._onTouchEnd, this);
        preventDefault(event);
        map._fireEvent('touchactstart');
    };
    _proto._onTouchMove = function(event) {
        var map = this.target;
        if (!event.touches || event.touches.length < 2) return;
        var container = map.getContainer(), p1 = getEventContainerPoint(event.touches[0], container), p2 = getEventContainerPoint(event.touches[1], container), d1 = p1.sub(this._startP1), d2 = p2.sub(this._startP2), vector = p1.sub(p2), scale = p1.distanceTo(p2) / this._startDist, bearing = 180 * vector.angleWith(this._startVector) / Math.PI, preY = this.preY || p1.y, pitch = (preY - p1.y) * 0.4;
        this.preY = p1.y;
        var param = {
            domEvent: event,
            mousePos: [
                p1,
                p2
            ]
        };
        if (!this.mode) {
            if (map.options['touchRotate'] && Math.abs(bearing) > 8) this.mode = map.options['touchZoomRotate'] ? 'rotate_zoom' : 'rotate';
            else if (map.options['touchPitch'] && d1.y * d2.y > 0 && Math.abs(d1.y) > 10 && Math.abs(d2.y) > 10) this.mode = 'pitch';
            else if (map.options['zoomable'] && map.options['touchZoom'] && Math.abs(1 - scale) > 0.15) this.mode = map.options['touchZoomRotate'] && map.options['touchRotate'] ? 'rotate_zoom' : 'zoom';
            this._startTouching(param);
        }
        if ('zoom' === this.mode || 'rotate_zoom' === this.mode) {
            this._scale = scale;
            var res = map._getResolution(this._startZoom) / scale;
            var zoom = map.getZoomFromRes(res);
            map.onZooming(zoom, this._Origin);
        }
        if ('rotate' === this.mode || 'rotate_zoom' === this.mode) {
            map.setBearing(this._startBearing + bearing);
            map.onDragRotating(param);
        } else if ('pitch' === this.mode) {
            map.setPitch(map.getPitch() + pitch);
            map.onDragRotating(param);
        }
        map._fireEvent('touchactinging');
    };
    _proto._startTouching = function(param) {
        var map = this.target;
        if ('zoom' === this.mode || 'rotate_zoom' === this.mode) {
            var size = map.getSize();
            this._Origin = new maptalks_es_Point(size['width'] / 2, size['height'] / 2);
            map.onZoomStart(null, this._Origin);
        }
        if ('rotate' === this.mode || 'pitch' === this.mode || 'rotate_zoom' === this.mode) map.onDragRotateStart(param);
    };
    _proto._onTouchEnd = function(event) {
        delete this.preY;
        var map = this.target;
        off(document, 'touchmove', this._onTouchMove, this);
        off(document, 'touchend', this._onTouchEnd, this);
        if ('zoom' === this.mode || 'rotate_zoom' === this.mode) {
            var scale = this._scale;
            var res = map._getResolution(this._startZoom) / scale;
            var zoom = map.getZoomFromRes(res);
            map.onZoomEnd(zoom, this._Origin);
        }
        if ('pitch' === this.mode || 'rotate' === this.mode || 'rotate_zoom' === this.mode) map.onDragRotateEnd({
            domEvent: event
        });
        delete this.mode;
        map._fireEvent('touchactend');
    };
    return MapTouchZoomHandler;
}(Handler$1);
Map$1.mergeOptions({
    touchGesture: true,
    touchZoom: true,
    touchPitch: true,
    touchRotate: true,
    touchZoomRotate: false
});
Map$1.addOnLoadHook('addHandler', 'touchGesture', maptalks_es_MapTouchZoomHandler);
var KEY = '__anim_player';
var Easing = {
    in: function(t) {
        return Math.pow(t, 2);
    },
    out: function(t) {
        return 1 - Easing.in(1 - t);
    },
    inAndOut: function(t) {
        return 3 * t * t - 2 * t * t * t;
    },
    linear: function(t) {
        return t;
    },
    upAndDown: function(t) {
        if (t < 0.5) return Easing.inAndOut(2 * t);
        return 1 - Easing.inAndOut(2 * (t - 0.5));
    }
};
var maptalks_es_Frame = function(state, styles) {
    this.state = state;
    this.styles = styles;
};
var maptalks_es_Player = function(animation, options, onFrame, target) {
    this._animation = animation;
    this.options = options;
    this._onFrame = onFrame;
    this.playState = 'idle';
    this.ready = true;
    this.finished = false;
    this.target = target;
};
var Animation = {
    speed: {
        slow: 2000,
        normal: 1000,
        fast: 500
    },
    _resolveStyles: function(styles) {
        if (!styles) return null;
        function resolveChild(child) {
            if (!Array.isArray(child)) return Animation._resolveStyles(child);
            var start = [], d = [], dest = [];
            for(var i = 0; i < child.length; i++){
                var _styles = Animation._resolveStyles(child[i]);
                if (_styles) {
                    start.push(_styles[0]);
                    d.push(_styles[1]);
                    dest.push(_styles[2]);
                }
            }
            if (!start.length) return null;
            return [
                start,
                d,
                dest
            ];
        }
        function resolveVal(val) {
            var values = val;
            var clazz;
            if (!Array.isArray(val)) {
                if (isNumber(val)) values = [
                    0,
                    val
                ];
                else if (val instanceof maptalks_es_Point || val instanceof maptalks_es_Coordinate) {
                    clazz = val.constructor;
                    values = [
                        new clazz(0, 0),
                        val
                    ];
                } else values = [
                    val,
                    val
                ];
            }
            var v1 = values[0], v2 = values[1];
            if (isNumber(v1) && isNumber(v2)) {
                if (v1 === v2) return null;
                return [
                    v1,
                    v2 - v1,
                    v2
                ];
            }
            if (!(Array.isArray(v1) && isNumber(v1[0])) && !(v1 instanceof maptalks_es_Coordinate) && !(v1 instanceof maptalks_es_Point)) return [
                v1,
                v2,
                v2
            ];
            if (Array.isArray(v1)) {
                v1 = new maptalks_es_Coordinate(v1);
                v2 = new maptalks_es_Coordinate(v2);
            } else {
                clazz = v1.constructor;
                v1 = new clazz(v1);
                v2 = new clazz(v2);
            }
            if (v1.equals(v2)) return null;
            return [
                v1,
                v2.sub(v1),
                v2
            ];
        }
        function isChild(val) {
            if (!Array.isArray(val) && val.constructor === Object) return true;
            if (Array.isArray(val) && val[0].constructor === Object) return true;
            return false;
        }
        var d = {}, start = {}, dest = {};
        for(var p in styles)if (styles.hasOwnProperty(p)) {
            var values = styles[p];
            if (!values) continue;
            if (Array.isArray(values)) {
                if (isNil(values[0]) || isNil(values[1])) continue;
            }
            var childStyles = void 0;
            childStyles = isChild(values) ? resolveChild(values) : resolveVal(values);
            if (childStyles) {
                start[p] = childStyles[0];
                d[p] = childStyles[1];
                dest[p] = childStyles[2];
            }
        }
        return [
            start,
            d,
            dest
        ];
    },
    framing: function(styles, options) {
        if (!options) options = {};
        var easing = options['easing'] ? Easing[options['easing']] : Easing.linear;
        if (!easing) easing = Easing.linear;
        var dStyles, startStyles, destStyles;
        styles = Animation._resolveStyles(styles);
        if (styles) {
            startStyles = styles[0];
            dStyles = styles[1];
            destStyles = styles[2];
        }
        var deltaStyles = function deltaStyles(delta, _startStyles, _dStyles) {
            if (!_startStyles || !_dStyles) return null;
            var result = {};
            for(var p in _dStyles)if (_dStyles.hasOwnProperty(p)) {
                if (_startStyles[p] === destStyles[p]) {
                    result[p] = _startStyles[p];
                    continue;
                }
                var s = _startStyles[p], d = _dStyles[p];
                if (isNumber(d)) result[p] = s + delta * d;
                else if (Array.isArray(d)) {
                    var children = [];
                    for(var i = 0; i < d.length; i++)children.push(deltaStyles(delta, s[i], d[i]));
                    result[p] = children;
                } else {
                    var clazz = d.constructor;
                    if (clazz === Object) result[p] = deltaStyles(delta, s, d);
                    else if (s instanceof maptalks_es_Point || s instanceof maptalks_es_Coordinate) result[p] = s.add(d.multi(delta));
                    else result[p] = d;
                }
            }
            return result;
        };
        return function(elapsed, duration) {
            var state, d;
            if (elapsed < 0) {
                state = {
                    playState: 'idle',
                    delta: 0
                };
                d = startStyles;
            } else if (elapsed < duration) {
                var delta = easing(elapsed / duration);
                state = {
                    playState: 'running',
                    delta: delta
                };
                d = deltaStyles(delta, startStyles, dStyles);
            } else {
                state = {
                    playState: 'finished',
                    delta: 1
                };
                d = destStyles;
            }
            state['startStyles'] = startStyles;
            state['destStyles'] = destStyles;
            state['progress'] = elapsed;
            state['remainingMs'] = duration - elapsed;
            return new maptalks_es_Frame(state, d);
        };
    },
    _requestAnimFrame: function(fn) {
        if (!this._frameQueue) this._frameQueue = [];
        this._frameQueue.push(fn);
        this._a();
    },
    _a: function() {
        if (!this._animationFrameId) this._animationFrameId = maptalks_es_requestAnimFrame(Animation._frameFn);
    },
    _run: function() {
        if (this._frameQueue.length) {
            var running = this._frameQueue;
            this._frameQueue = [];
            for(var i = 0, len = running.length; i < len; i++)running[i]();
            if (this._frameQueue.length) this._animationFrameId = maptalks_es_requestAnimFrame(Animation._frameFn);
            else delete this._animationFrameId;
        }
    },
    animate: function(styles, options, step, target) {
        if (!options) options = {};
        var animation = Animation.framing(styles, options);
        var player = new maptalks_es_Player(animation, options, step, target);
        return player;
    }
};
Animation._frameFn = Animation._run.bind(Animation);
extend(maptalks_es_Player.prototype, {
    _prepare: function() {
        var options = this.options;
        var duration = options['speed'] || options['duration'];
        if (isString(duration)) {
            duration = Animation.speed[duration];
            if (!duration) duration = +duration;
        }
        if (!duration) duration = Animation.speed['normal'];
        this.duration = duration;
        this._framer = options['framer'] || Animation._requestAnimFrame.bind(Animation);
    },
    play: function() {
        if ('idle' !== this.playState && 'paused' !== this.playState || this.target && this.target[KEY]) return this;
        if (this.target) this.target[KEY] = 1;
        if ('idle' === this.playState) {
            this.currentTime = 0;
            this._prepare();
        }
        var t = now();
        if (!this.startTime) {
            var options = this.options;
            this.startTime = options['startTime'] ? options['startTime'] : t;
        }
        this._playStartTime = Math.max(t, this.startTime);
        if ('paused' === this.playState) this._playStartTime -= this.currentTime;
        this.playState = 'running';
        this._run();
        return this;
    },
    pause: function() {
        if ('paused' === this.playState) return this;
        this.playState = 'paused';
        this._run();
        return this;
    },
    cancel: function() {
        if ('idle' === this.playState) return this;
        this.playState = 'idle';
        this.finished = false;
        this._run();
        return this;
    },
    finish: function() {
        if ('finished' === this.playState) return this;
        this.playState = 'finished';
        this.finished = true;
        this._run();
        return this;
    },
    reverse: function() {},
    _run: function() {
        var _this = this;
        var onFrame = this._onFrame;
        var t = now();
        var elapsed = t - this._playStartTime;
        if (this.options['repeat'] && elapsed >= this.duration) {
            this._playStartTime = t;
            elapsed = 0;
        }
        if ('running' !== this.playState) {
            if (this.target) delete this.target[KEY];
            if (onFrame) {
                if ('finished' === this.playState) elapsed = this.duration;
                else if ('idle' === this.playState) elapsed = 0;
                var _frame = this._animation(elapsed, this.duration);
                _frame.state.playState = this.playState;
                onFrame(_frame);
            }
            return;
        }
        var frame = this._animation(elapsed, this.duration);
        this.playState = frame.state['playState'];
        if ('running' !== this.playState && this.target) delete this.target[KEY];
        if ('idle' === this.playState) {
            if (this.startTime > t) setTimeout(this._run.bind(this), this.startTime - t);
        } else if ('running' === this.playState) this._framer(function() {
            if ('running' !== _this.playState) return;
            _this.currentTime = elapsed;
            if (onFrame) onFrame(frame);
            _this._run();
        });
        else if ('finished' === this.playState) {
            this.finished = true;
            if (onFrame) onFrame(frame);
        }
    }
});
var maptalks_es_simplify = createCommonjsModule(function(module) {
    (function() {
        function getSqDist(p1, p2) {
            var dx = p1.x - p2.x, dy = p1.y - p2.y;
            return dx * dx + dy * dy;
        }
        function getSqSegDist(p, p1, p2) {
            var x = p1.x, y = p1.y, dx = p2.x - x, dy = p2.y - y;
            if (0 !== dx || 0 !== dy) {
                var t = ((p.x - x) * dx + (p.y - y) * dy) / (dx * dx + dy * dy);
                if (t > 1) {
                    x = p2.x;
                    y = p2.y;
                } else if (t > 0) {
                    x += dx * t;
                    y += dy * t;
                }
            }
            dx = p.x - x;
            dy = p.y - y;
            return dx * dx + dy * dy;
        }
        function simplifyRadialDist(points, sqTolerance) {
            var prevPoint = points[0], newPoints = [
                prevPoint
            ], point;
            for(var i = 1, len = points.length; i < len; i++){
                point = points[i];
                if (getSqDist(point, prevPoint) > sqTolerance) {
                    newPoints.push(point);
                    prevPoint = point;
                }
            }
            if (prevPoint !== point) newPoints.push(point);
            return newPoints;
        }
        function simplifyDPStep(points, first, last, sqTolerance, simplified) {
            var maxSqDist = sqTolerance, index;
            for(var i = first + 1; i < last; i++){
                var sqDist = getSqSegDist(points[i], points[first], points[last]);
                if (sqDist > maxSqDist) {
                    index = i;
                    maxSqDist = sqDist;
                }
            }
            if (maxSqDist > sqTolerance) {
                if (index - first > 1) simplifyDPStep(points, first, index, sqTolerance, simplified);
                simplified.push(points[index]);
                if (last - index > 1) simplifyDPStep(points, index, last, sqTolerance, simplified);
            }
        }
        function simplifyDouglasPeucker(points, sqTolerance) {
            var last = points.length - 1;
            var simplified = [
                points[0]
            ];
            simplifyDPStep(points, 0, last, sqTolerance, simplified);
            simplified.push(points[last]);
            return simplified;
        }
        function simplify(points, tolerance, highestQuality) {
            if (points.length <= 2) return points;
            var sqTolerance = void 0 !== tolerance ? tolerance * tolerance : 1;
            points = highestQuality ? points : simplifyRadialDist(points, sqTolerance);
            points = simplifyDouglasPeucker(points, sqTolerance);
            return points;
        }
        module.exports = simplify;
        module.exports.default = simplify;
    })();
});
var options$3 = {
    smoothness: 0,
    enableClip: true,
    enableSimplify: true,
    simplifyTolerance: 2,
    symbol: {
        lineColor: '#000',
        lineWidth: 2,
        lineOpacity: 1,
        polygonFill: '#fff',
        polygonOpacity: 1,
        opacity: 1
    }
};
var maptalks_es_Path = function(_Geometry) {
    _inheritsLoose(Path, _Geometry);
    function Path() {
        return _Geometry.apply(this, arguments) || this;
    }
    var _proto = Path.prototype;
    _proto.getOutline = function() {
        var painter = this._getPainter();
        if (!painter) return null;
        var extent = this.getExtent();
        return new maptalks_es_Polygon(extent.toArray(), {
            symbol: {
                lineWidth: 1,
                lineColor: '6b707b'
            }
        });
    };
    _proto.animateShow = function(options, cb) {
        var _this = this;
        if (void 0 === options) options = {};
        if (this._showPlayer) this._showPlayer.finish();
        if (isFunction(options)) {
            options = {};
            cb = options;
        }
        var coordinates = this.getCoordinates();
        if (0 === coordinates.length) return this;
        this._animIdx = 0;
        this._animLenSoFar = 0;
        this.show();
        var isPolygon = !!this.getShell;
        var animCoords = isPolygon ? this.getShell().concat(this.getShell()[0]) : this.getCoordinates();
        var projection = this._getProjection();
        var prjAnimCoords = projection.projectCoords(animCoords);
        this._prjAniShowCenter = this._getPrjExtent().getCenter();
        this._aniShowCenter = projection.unproject(this._prjAniShowCenter);
        var duration = options['duration'] || 1000, easing = options['easing'] || 'out';
        this.setCoordinates([]);
        var length = 0;
        for(var i = 1; i < prjAnimCoords.length; i++)length += prjAnimCoords[i].distanceTo(prjAnimCoords[i - 1]);
        var player = this._showPlayer = Animation.animate({
            t: duration
        }, {
            duration: duration,
            easing: easing
        }, function(frame) {
            if (!_this.getMap()) {
                if ('finished' !== player.playState) {
                    player.finish();
                    if (cb) {
                        var _coordinates = _this.getCoordinates();
                        cb(frame, _coordinates[_coordinates.length - 1]);
                    }
                }
                return;
            }
            var currentCoord = _this._drawAnimShowFrame(frame.styles.t, duration, length, animCoords, prjAnimCoords);
            if ('finished' === frame.state.playState) {
                delete _this._showPlayer;
                delete _this._aniShowCenter;
                delete _this._prjAniShowCenter;
                delete _this._animIdx;
                delete _this._animLenSoFar;
                delete _this._animTailRatio;
                _this.setCoordinates(coordinates);
            }
            if (cb) cb(frame, currentCoord);
        }, this);
        player.play();
        return player;
    };
    _proto._drawAnimShowFrame = function(t, duration, length, coordinates, prjCoords) {
        if (0 === t) return coordinates[0];
        var projection = this._getProjection();
        var targetLength = t / duration * length;
        var segLen = 0;
        var i, l;
        for(i = this._animIdx, l = prjCoords.length; i < l - 1; i++){
            segLen = prjCoords[i].distanceTo(prjCoords[i + 1]);
            if (this._animLenSoFar + segLen > targetLength) break;
            this._animLenSoFar += segLen;
        }
        this._animIdx = i;
        if (this._animIdx >= l - 1) {
            this.setCoordinates(coordinates);
            return coordinates[coordinates.length - 1];
        }
        var idx = this._animIdx;
        var p1 = prjCoords[idx], p2 = prjCoords[idx + 1], span = targetLength - this._animLenSoFar, r = span / segLen;
        this._animTailRatio = r;
        var x = p1.x + (p2.x - p1.x) * r, y = p1.y + (p2.y - p1.y) * r, lastCoord = new maptalks_es_Coordinate(x, y);
        var targetCoord = projection.unproject(lastCoord);
        var isPolygon = !!this.getShell;
        if (!isPolygon && this.options['smoothness'] > 0) {
            var animCoords = coordinates.slice(0, this._animIdx + 3);
            this.setCoordinates(animCoords);
            var prjAnimCoords = prjCoords.slice(0, this._animIdx + 3);
            this._setPrjCoordinates(prjAnimCoords);
        } else {
            var _animCoords = coordinates.slice(0, this._animIdx + 1);
            _animCoords.push(targetCoord);
            var _prjAnimCoords = prjCoords.slice(0, this._animIdx + 1);
            _prjAnimCoords.push(lastCoord);
            if (isPolygon) {
                this.setCoordinates([
                    this._aniShowCenter
                ].concat(_animCoords));
                this._setPrjCoordinates([
                    this._prjAniShowCenter
                ].concat(_prjAnimCoords));
            } else {
                this.setCoordinates(_animCoords);
                this._setPrjCoordinates(_prjAnimCoords);
            }
        }
        return targetCoord;
    };
    _proto._getCenterInExtent = function(extent, coordinates, clipFn) {
        var meExtent = this.getExtent();
        if (!extent.intersects(meExtent)) return null;
        var clipped = clipFn(coordinates, extent);
        if (0 === clipped.length) return null;
        var sumx = 0, sumy = 0, counter = 0;
        clipped.forEach(function(part) {
            if (Array.isArray(part)) part.forEach(function(c) {
                if (c.point) c = c.point;
                sumx += c.x;
                sumy += c.y;
                counter++;
            });
            else {
                if (part.point) part = part.point;
                sumx += part.x;
                sumy += part.y;
                counter++;
            }
        });
        var c = new maptalks_es_Coordinate(sumx, sumy)._multi(1 / counter);
        c.count = counter;
        return c;
    };
    _proto._getPath2DPoints = function(prjCoords, disableSimplify, zoom) {
        if (!isArrayHasData(prjCoords)) return [];
        var map = this.getMap(), isSimplify = !disableSimplify && this._shouldSimplify(), tolerance = this.options['simplifyTolerance'] * map._getResolution(), isMulti = Array.isArray(prjCoords[0]);
        delete this._simplified;
        if (isSimplify && !isMulti) {
            var count = prjCoords.length;
            prjCoords = maptalks_es_simplify(prjCoords, tolerance, false);
            this._simplified = prjCoords.length < count;
        }
        if (isNil(zoom)) zoom = map.getZoom();
        return forEachCoord(prjCoords, function(c) {
            return map._prjToPoint(c, zoom);
        });
    };
    _proto._shouldSimplify = function() {
        var layer = this.getLayer(), properties = this.getProperties();
        var hasAltitude = properties && layer.options['enableAltitude'] && !isNil(properties[layer.options['altitudeProperty']]);
        return layer && layer.options['enableSimplify'] && !hasAltitude && this.options['enableSimplify'] && !this._showPlayer;
    };
    _proto._setPrjCoordinates = function(prjPoints) {
        this._prjCoords = prjPoints;
        this.onShapeChanged();
    };
    _proto._getPrjCoordinates = function() {
        this._verifyProjection();
        if (!this._prjCoords && this._getProjection()) this._prjCoords = this._projectCoords(this._coordinates);
        return this._prjCoords;
    };
    _proto._updateCache = function() {
        this._clearCache();
        var projection = this._getProjection();
        if (!projection) return;
        if (this._prjCoords) this._coordinates = this._unprojectCoords(this._getPrjCoordinates());
    };
    _proto._clearProjection = function() {
        this._prjCoords = null;
        _Geometry.prototype._clearProjection.call(this);
    };
    _proto._projectCoords = function(points) {
        var projection = this._getProjection();
        if (projection) return projection.projectCoords(points);
        return [];
    };
    _proto._unprojectCoords = function(prjPoints) {
        var projection = this._getProjection();
        if (projection) return projection.unprojectCoords(prjPoints);
        return [];
    };
    _proto._computeCenter = function() {
        var ring = this._coordinates;
        if (!isArrayHasData(ring)) return null;
        var sumx = 0, sumy = 0, counter = 0;
        var size = ring.length;
        for(var i = 0; i < size; i++)if (ring[i]) {
            if (isNumber(ring[i].x) && isNumber(ring[i].y)) {
                sumx += ring[i].x;
                sumy += ring[i].y;
                counter++;
            }
        }
        return new maptalks_es_Coordinate(sumx / counter, sumy / counter);
    };
    _proto._computeExtent = function() {
        var shell = this._coordinates;
        if (!isArrayHasData(shell)) return null;
        var rings = [
            shell
        ];
        if (this.hasHoles && this.hasHoles()) rings.push.apply(rings, this.getHoles());
        return this._coords2Extent(rings, this._getProjection());
    };
    _proto._computePrjExtent = function() {
        var coords = [
            this._getPrjCoordinates()
        ];
        if (this.hasHoles && this.hasHoles()) coords.push.apply(coords, this._getPrjHoles());
        return this._coords2Extent(coords);
    };
    _proto._get2DLength = function() {
        var vertexes = this._getPath2DPoints(this._getPrjCoordinates(), true);
        var len = 0;
        for(var i = 1, l = vertexes.length; i < l; i++)len += vertexes[i].distanceTo(vertexes[i - 1]);
        return len;
    };
    _proto._hitTestTolerance = function() {
        var symbol = this._getInternalSymbol();
        var w;
        if (Array.isArray(symbol)) {
            w = 0;
            for(var i = 0; i < symbol.length; i++)if (isNumber(symbol[i]['lineWidth'])) {
                if (symbol[i]['lineWidth'] > w) w = symbol[i]['lineWidth'];
            }
        } else w = symbol['lineWidth'];
        return isNumber(w) ? w / 2 : 1.5;
    };
    _proto._coords2Extent = function(coords, proj) {
        var result = new maptalks_es_Extent(proj);
        for(var i = 0, l = coords.length; i < l; i++)for(var j = 0, ll = coords[i].length; j < ll; j++)result._combine(coords[i][j]);
        return result;
    };
    return Path;
}(maptalks_es_Geometry);
maptalks_es_Path.mergeOptions(options$3);
var JSON_TYPE = 'Polygon';
var maptalks_es_Polygon = function(_Path) {
    _inheritsLoose(Polygon, _Path);
    function Polygon(coordinates, opts) {
        var _this;
        _this = _Path.call(this, opts) || this;
        _this.type = 'Polygon';
        if (coordinates) _this.setCoordinates(coordinates);
        return _this;
    }
    var _proto = Polygon.prototype;
    _proto.setCoordinates = function(coordinates) {
        if (!coordinates) {
            this._coordinates = null;
            this._holes = null;
            this._projectRings();
            return this;
        }
        var rings = maptalks_es_Coordinate.toCoordinates(coordinates);
        var len = rings.length;
        if (Array.isArray(rings[0])) {
            this._coordinates = this._trimRing(rings[0]);
            if (len > 1) {
                var holes = [];
                for(var i = 1; i < len; i++){
                    if (!!rings[i]) holes.push(this._trimRing(rings[i]));
                }
                this._holes = holes;
            }
        } else this._coordinates = this._trimRing(rings);
        this._projectRings();
        return this;
    };
    _proto.getCoordinates = function() {
        if (!this._coordinates) return [];
        var holes = this.getHoles();
        var rings = [
            this._copyAndCloseRing(this._coordinates)
        ];
        for(var i = 0, l = holes.length; i < l; i++)rings.push(this._copyAndCloseRing(holes[i]));
        return rings;
    };
    _proto.getCenterInExtent = function(extent) {
        return this._getCenterInExtent(extent, this.getShell(), clipPolygon);
    };
    _proto.getShell = function() {
        return this._coordinates || [];
    };
    _proto.getHoles = function() {
        return this._holes || [];
    };
    _proto.hasHoles = function() {
        return this.getHoles().length > 0;
    };
    _proto._projectRings = function() {
        if (!this.getMap()) {
            this.onShapeChanged();
            return;
        }
        this._prjCoords = this._projectCoords(this._coordinates);
        this._prjHoles = this._projectCoords(this._holes);
        this.onShapeChanged();
    };
    _proto._setPrjCoordinates = function(prjCoords) {
        this._prjCoords = prjCoords;
        this.onShapeChanged();
    };
    _proto._cleanRing = function(ring) {
        for(var i = ring.length - 1; i >= 0; i--)if (!ring[i]) ring.splice(i, 1);
    };
    _proto._checkRing = function(ring) {
        this._cleanRing(ring);
        if (!ring || !isArrayHasData(ring)) return false;
        var lastPoint = ring[ring.length - 1];
        var isClose = true;
        if (ring[0].x !== lastPoint.x || ring[0].y !== lastPoint.y) isClose = false;
        return isClose;
    };
    _proto._trimRing = function(ring) {
        var isClose = this._checkRing(ring);
        if (isArrayHasData(ring) && isClose) ring.splice(ring.length - 1, 1);
        return ring;
    };
    _proto._copyAndCloseRing = function(ring) {
        ring = ring.slice(0);
        var isClose = this._checkRing(ring);
        if (!isArrayHasData(ring) || !!isClose) return ring;
        ring.push(ring[0].copy());
        return ring;
    };
    _proto._getPrjShell = function() {
        if (this.getJSONType() === JSON_TYPE) return this._getPrjCoordinates();
        this._verifyProjection();
        if (this._getProjection() && !this._prjShell) this._prjShell = this._projectCoords(this.getShell());
        return this._prjShell;
    };
    _proto._getPrjHoles = function() {
        var projection = this._getProjection();
        this._verifyProjection();
        if (projection && !this._prjHoles) this._prjHoles = this._projectCoords(this.getHoles());
        return this._prjHoles;
    };
    _proto._computeGeodesicLength = function(measurer) {
        var rings = this.getCoordinates();
        if (!isArrayHasData(rings)) return 0;
        var result = 0;
        for(var i = 0, len = rings.length; i < len; i++)result += measurer.measureLength(rings[i]);
        return result;
    };
    _proto._computeGeodesicArea = function(measurer) {
        var rings = this.getCoordinates();
        if (!isArrayHasData(rings)) return 0;
        var result = measurer.measureArea(rings[0]);
        for(var i = 1, len = rings.length; i < len; i++)result -= measurer.measureArea(rings[i]);
        return result;
    };
    _proto._updateCache = function() {
        _Path.prototype._updateCache.call(this);
        if (this._prjHoles) this._holes = this._unprojectCoords(this._getPrjHoles());
    };
    _proto._clearCache = function() {
        delete this._prjShell;
        return _Path.prototype._clearCache.call(this);
    };
    _proto._clearProjection = function() {
        if (this._prjHoles) this._prjHoles = null;
        if (this._prjShell) this._prjShell = null;
        _Path.prototype._clearProjection.call(this);
    };
    return Polygon;
}(maptalks_es_Path);
maptalks_es_Polygon.registerJSONType(JSON_TYPE);
function CenterMixin(Base) {
    return function(_Base) {
        _inheritsLoose(_class, _Base);
        function _class() {
            return _Base.apply(this, arguments) || this;
        }
        var _proto = _class.prototype;
        _proto.getCoordinates = function() {
            return this._coordinates;
        };
        _proto.setCoordinates = function(coordinates) {
            var center = coordinates instanceof maptalks_es_Coordinate ? coordinates : new maptalks_es_Coordinate(coordinates);
            if (center.equals(this._coordinates)) return this;
            this._coordinates = center;
            if (!this.getMap()) {
                this.onPositionChanged();
                return this;
            }
            var projection = this._getProjection();
            this._setPrjCoordinates(projection.project(this._coordinates));
            return this;
        };
        _proto._getCenter2DPoint = function(zoom) {
            var map = this.getMap();
            if (!map) return null;
            var z = isNil(zoom) ? map.getZoom() : map.getGLZoom();
            var pcenter = this._getPrjCoordinates();
            if (!pcenter) return null;
            return map._prjToPoint(pcenter, z);
        };
        _proto._getPrjCoordinates = function() {
            var projection = this._getProjection();
            this._verifyProjection();
            if (!this._pcenter && projection) {
                if (this._coordinates) this._pcenter = projection.project(this._coordinates);
            }
            return this._pcenter;
        };
        _proto._setPrjCoordinates = function(pcenter) {
            this._pcenter = pcenter;
            this.onPositionChanged();
        };
        _proto._updateCache = function() {
            this._clearCache();
            var projection = this._getProjection();
            if (this._pcenter && projection) this._coordinates = projection.unproject(this._pcenter);
        };
        _proto._clearProjection = function() {
            this._pcenter = null;
            _Base.prototype._clearProjection.call(this);
        };
        _proto._computeCenter = function() {
            return this._coordinates ? this._coordinates.copy() : null;
        };
        return _class;
    }(Base);
}
var options$4 = {
    symbol: {
        markerType: 'path',
        markerPath: [
            {
                path: 'M8 23l0 0 0 0 0 0 0 0 0 0c-4,-5 -8,-10 -8,-14 0,-5 4,-9 8,-9l0 0 0 0c4,0 8,4 8,9 0,4 -4,9 -8,14z M3,9 a5,5 0,1,0,0,-0.9Z',
                fill: '#DE3333'
            }
        ],
        markerPathWidth: 16,
        markerPathHeight: 23,
        markerWidth: 24,
        markerHeight: 34
    },
    hitTestForEvent: false
};
var maptalks_es_Marker = function(_CenterMixin) {
    _inheritsLoose(Marker, _CenterMixin);
    function Marker(coordinates, opts) {
        var _this;
        _this = _CenterMixin.call(this, opts) || this;
        _this.type = 'Point';
        if (coordinates) _this.setCoordinates(coordinates);
        return _this;
    }
    var _proto = Marker.prototype;
    _proto.getOutline = function() {
        var painter = this._getPainter();
        if (!painter) return null;
        var coord = this.getCoordinates();
        var extent = painter.getContainerExtent();
        var anchor = this.getMap().coordToContainerPoint(coord);
        return new Marker(coord, {
            symbol: {
                markerType: 'square',
                markerWidth: extent.getWidth(),
                markerHeight: extent.getHeight(),
                markerLineWidth: 1,
                markerLineColor: '6b707b',
                markerFill: 'rgba(0, 0, 0, 0)',
                markerDx: extent.xmin - (anchor.x - extent.getWidth() / 2),
                markerDy: extent.ymin - (anchor.y - extent.getHeight() / 2)
            }
        });
    };
    _proto._isVectorMarker = function() {
        var symbol = this._getInternalSymbol();
        if (Array.isArray(symbol)) return false;
        return maptalks_es_VectorMarkerSymbolizer.test(symbol);
    };
    _proto._canEdit = function() {
        var symbol = this._getInternalSymbol();
        if (Array.isArray(symbol)) return false;
        return maptalks_es_VectorMarkerSymbolizer.test(symbol) || maptalks_es_VectorPathMarkerSymbolizer.test(symbol) || maptalks_es_ImageMarkerSymbolizer.test(symbol);
    };
    _proto._containsPoint = function(point, t) {
        var extent = this.getContainerExtent();
        if (t) extent = extent.expand(t);
        if (!extent.contains(point)) return false;
        if (this.options['hitTestForEvent']) return _CenterMixin.prototype._containsPoint.call(this, point, t);
        return true;
    };
    _proto._computeExtent = function() {
        return computeExtent.call(this, 'getCenter');
    };
    _proto._computePrjExtent = function() {
        return computeExtent.call(this, '_getPrjCoordinates');
    };
    _proto._computeGeodesicLength = function() {
        return 0;
    };
    _proto._computeGeodesicArea = function() {
        return 0;
    };
    _proto._getSprite = function(resources, canvasClass) {
        if (this._getPainter()) return this._getPainter().getSprite(resources, canvasClass);
        return new maptalks_es_Painter(this).getSprite(resources, canvasClass);
    };
    return Marker;
}(CenterMixin(maptalks_es_Geometry));
maptalks_es_Marker.mergeOptions(options$4);
maptalks_es_Marker.registerJSONType('Marker');
function computeExtent(fn) {
    var coordinates = this[fn]();
    if (!coordinates) return null;
    return new maptalks_es_Extent(coordinates, coordinates, this._getProjection());
}
var options$5 = {
    arrowStyle: null,
    arrowPlacement: 'vertex-last'
};
var maptalks_es_LineString = function(_Path) {
    _inheritsLoose(LineString, _Path);
    function LineString(coordinates, options) {
        var _this;
        _this = _Path.call(this, options) || this;
        _this.type = 'LineString';
        if (coordinates) _this.setCoordinates(coordinates);
        return _this;
    }
    var _proto = LineString.prototype;
    _proto.setCoordinates = function(coordinates) {
        if (!coordinates) {
            this._coordinates = null;
            this._setPrjCoordinates(null);
            return this;
        }
        this._coordinates = maptalks_es_Coordinate.toCoordinates(coordinates);
        if (this.getMap()) this._setPrjCoordinates(this._projectCoords(this._coordinates));
        else this.onShapeChanged();
        return this;
    };
    _proto.getCoordinates = function() {
        return this._coordinates || [];
    };
    _proto.getCenterInExtent = function(extent) {
        return this._getCenterInExtent(extent, this.getCoordinates(), clipLine);
    };
    _proto._computeGeodesicLength = function(measurer) {
        return measurer.measureLength(this.getCoordinates());
    };
    _proto._computeGeodesicArea = function() {
        return 0;
    };
    return LineString;
}(maptalks_es_Path);
maptalks_es_LineString.mergeOptions(options$5);
maptalks_es_LineString.registerJSONType('LineString');
var maptalks_es_GeometryCollection = function(_Geometry) {
    _inheritsLoose(GeometryCollection, _Geometry);
    function GeometryCollection(geometries, opts) {
        var _this;
        _this = _Geometry.call(this, opts) || this;
        _this.type = 'GeometryCollection';
        _this.setGeometries(geometries);
        return _this;
    }
    var _proto = GeometryCollection.prototype;
    _proto.setGeometries = function(_geometries) {
        var geometries = this._checkGeometries(_geometries || []);
        var symbol = this._getSymbol();
        var options = this.config();
        for(var i = geometries.length - 1; i >= 0; i--){
            geometries[i]._initOptions(options);
            geometries[i]._setParent(this);
            geometries[i]._setEventParent(this);
            if (symbol) geometries[i].setSymbol(symbol);
        }
        this._geometries = geometries;
        if (this.getLayer()) {
            this._bindGeometriesToLayer();
            this.onShapeChanged();
        }
        return this;
    };
    _proto.getGeometries = function() {
        return this._geometries || [];
    };
    _proto.forEach = function(fn, context) {
        var geometries = this.getGeometries();
        for(var i = 0, l = geometries.length; i < l; i++){
            if (!!geometries[i]) if (context) fn.call(context, geometries[i], i);
            else fn(geometries[i], i);
        }
        return this;
    };
    _proto.filter = function(fn, context) {
        if (!fn) return new GeometryCollection();
        var selected = [];
        var isFn = isFunction(fn);
        var filter = isFn ? fn : createFilter(fn);
        this.forEach(function(geometry) {
            var g = isFn ? geometry : getFilterFeature(geometry);
            if (context ? filter.call(context, g) : filter(g)) selected.push(geometry);
        }, this);
        return new GeometryCollection(selected);
    };
    _proto.translate = function(offset) {
        if (!offset) return this;
        if (this.isEmpty()) return this;
        var args = arguments;
        this.forEach(function(geometry) {
            if (geometry && geometry.translate) geometry.translate.apply(geometry, args);
        });
        return this;
    };
    _proto.isEmpty = function() {
        return !isArrayHasData(this.getGeometries());
    };
    _proto.remove = function() {
        this.forEach(function(geometry) {
            geometry._unbind();
        });
        return maptalks_es_Geometry.prototype.remove.apply(this, arguments);
    };
    _proto.show = function() {
        this.options['visible'] = true;
        this.forEach(function(geometry) {
            geometry.show();
        });
        return this;
    };
    _proto.hide = function() {
        this.options['visible'] = false;
        this.forEach(function(geometry) {
            geometry.hide();
        });
        return this;
    };
    _proto.onConfig = function(config) {
        this.forEach(function(geometry) {
            geometry.config(config);
        });
    };
    _proto.getSymbol = function() {
        var s = _Geometry.prototype.getSymbol.call(this);
        if (!s) {
            var symbols = [];
            var is = false;
            this.forEach(function(g) {
                var symbol = g.getSymbol();
                if (symbol && !is) is = true;
                symbols.push(g.getSymbol());
            });
            if (is) s = {
                children: symbols
            };
        }
        return s;
    };
    _proto.setSymbol = function(s) {
        if (s && s['children']) {
            this._symbol = null;
            this.forEach(function(g, i) {
                g.setSymbol(s['children'][i]);
            });
        } else {
            var symbol = this._prepareSymbol(s);
            this._symbol = symbol;
            this.forEach(function(g) {
                g.setSymbol(symbol);
            });
        }
        this.onSymbolChanged();
        return this;
    };
    _proto._setExternSymbol = function(symbol) {
        symbol = this._prepareSymbol(symbol);
        this._externSymbol = symbol;
        this.forEach(function(geometry) {
            geometry._setExternSymbol(symbol);
        });
        this.onSymbolChanged();
        return this;
    };
    _proto._bindLayer = function() {
        _Geometry.prototype._bindLayer.apply(this, arguments);
        this._bindGeometriesToLayer();
    };
    _proto._bindGeometriesToLayer = function() {
        var layer = this.getLayer();
        this.forEach(function(geometry) {
            geometry._bindLayer(layer);
        });
    };
    _proto._checkGeometries = function(geometries) {
        var invalidGeoError = 'The geometry added to collection is invalid.';
        if (geometries && !Array.isArray(geometries)) {
            if (geometries instanceof maptalks_es_Geometry) return [
                geometries
            ];
            throw new Error(invalidGeoError);
        }
        for(var i = 0, l = geometries.length; i < l; i++)if (!this._checkGeo(geometries[i])) throw new Error(invalidGeoError + ' Index: ' + i);
        return geometries;
    };
    _proto._checkGeo = function(geo) {
        return geo instanceof maptalks_es_Geometry;
    };
    _proto._updateCache = function() {
        this._clearCache();
        if (this.isEmpty()) return;
        this.forEach(function(geometry) {
            if (geometry && geometry._updateCache) geometry._updateCache();
        });
    };
    _proto._removePainter = function() {
        if (this._painter) this._painter.remove();
        delete this._painter;
        this.forEach(function(geometry) {
            geometry._removePainter();
        });
    };
    _proto._computeCenter = function(projection) {
        if (!projection || this.isEmpty()) return null;
        var sumX = 0, sumY = 0, counter = 0;
        var geometries = this.getGeometries();
        for(var i = 0, l = geometries.length; i < l; i++){
            if (!!geometries[i]) {
                var center = geometries[i]._computeCenter(projection);
                if (center) {
                    sumX += center.x;
                    sumY += center.y;
                    counter++;
                }
            }
        }
        if (0 === counter) return null;
        return new maptalks_es_Coordinate(sumX / counter, sumY / counter);
    };
    _proto._containsPoint = function(point, t) {
        if (this.isEmpty()) return false;
        var geometries = this.getGeometries();
        for(var i = 0, l = geometries.length; i < l; i++)if (geometries[i]._containsPoint(point, t)) return true;
        return false;
    };
    _proto._computeExtent = function(projection) {
        return computeExtent$1.call(this, projection, '_computeExtent');
    };
    _proto._computePrjExtent = function(projection) {
        return computeExtent$1.call(this, projection, '_computePrjExtent');
    };
    _proto._computeGeodesicLength = function(projection) {
        if (!projection || this.isEmpty()) return 0;
        var geometries = this.getGeometries();
        var result = 0;
        for(var i = 0, l = geometries.length; i < l; i++){
            if (!!geometries[i]) result += geometries[i]._computeGeodesicLength(projection);
        }
        return result;
    };
    _proto._computeGeodesicArea = function(projection) {
        if (!projection || this.isEmpty()) return 0;
        var geometries = this.getGeometries();
        var result = 0;
        for(var i = 0, l = geometries.length; i < l; i++){
            if (!!geometries[i]) result += geometries[i]._computeGeodesicArea(projection);
        }
        return result;
    };
    _proto._exportGeoJSONGeometry = function() {
        var children = [];
        if (!this.isEmpty()) {
            var geometries = this.getGeometries();
            for(var i = 0, l = geometries.length; i < l; i++){
                if (!!geometries[i]) children.push(geometries[i]._exportGeoJSONGeometry());
            }
        }
        return {
            type: 'GeometryCollection',
            geometries: children
        };
    };
    _proto._clearProjection = function() {
        if (this.isEmpty()) return;
        var geometries = this.getGeometries();
        for(var i = 0, l = geometries.length; i < l; i++){
            if (!!geometries[i]) geometries[i]._clearProjection();
        }
    };
    _proto._getConnectPoints = function() {
        var extent = this.getExtent();
        var anchors = [
            new maptalks_es_Coordinate(extent.xmin, extent.ymax),
            new maptalks_es_Coordinate(extent.xmax, extent.ymin),
            new maptalks_es_Coordinate(extent.xmin, extent.ymin),
            new maptalks_es_Coordinate(extent.xmax, extent.ymax)
        ];
        return anchors;
    };
    _proto._getExternalResources = function() {
        if (this.isEmpty()) return [];
        var geometries = this.getGeometries(), resources = [];
        var cache = {};
        var symbol, res, key;
        for(var i = 0, l = geometries.length; i < l; i++){
            if (!!geometries[i]) {
                symbol = geometries[i]._getInternalSymbol();
                res = getExternalResources(symbol);
                for(var ii = 0, ll = res.length; ii < ll; ii++){
                    key = res[ii].join();
                    if (!cache[key]) {
                        resources.push(res[ii]);
                        cache[key] = 1;
                    }
                }
            }
        }
        return resources;
    };
    _proto.startEdit = function(opts) {
        var _this2 = this;
        if (this.isEmpty()) return this;
        if (!opts) opts = {};
        if (opts['symbol']) {
            this._originalSymbol = this.getSymbol();
            this.setSymbol(opts['symbol']);
        }
        this._draggbleBeforeEdit = this.options['draggable'];
        this.config('draggable', false);
        var geometries = this.getGeometries();
        for(var i = 0, l = geometries.length; i < l; i++)geometries[i].startEdit(opts);
        this._editing = true;
        this.hide();
        setTimeout(function() {
            _this2.fire('editstart');
        }, 1);
        return this;
    };
    _proto.endEdit = function() {
        if (this.isEmpty()) return this;
        var geometries = this.getGeometries();
        for(var i = 0, l = geometries.length; i < l; i++)geometries[i].endEdit();
        if (this._originalSymbol) {
            this.setSymbol(this._originalSymbol);
            delete this._originalSymbol;
        }
        this._editing = false;
        this.show();
        this.config('draggable', this._draggbleBeforeEdit);
        this.fire('editend');
        return this;
    };
    _proto.isEditing = function() {
        if (!this._editing) return false;
        return true;
    };
    return GeometryCollection;
}(maptalks_es_Geometry);
maptalks_es_GeometryCollection.registerJSONType('GeometryCollection');
function computeExtent$1(projection, fn) {
    if (this.isEmpty()) return null;
    var geometries = this.getGeometries();
    var result = null;
    for(var i = 0, l = geometries.length; i < l; i++){
        var geo = geometries[i];
        if (!!geo) {
            var geoExtent = geo[fn](projection);
            if (geoExtent) result = geoExtent.combine(result);
        }
    }
    return result;
}
var maptalks_es_MultiGeometry = function(_GeometryCollection) {
    _inheritsLoose(MultiGeometry, _GeometryCollection);
    function MultiGeometry(geoType, type, data, options) {
        var _this;
        _this = _GeometryCollection.call(this, null, options) || this;
        _this.GeometryType = geoType;
        _this.type = type;
        _this._initData(data);
        return _this;
    }
    var _proto = MultiGeometry.prototype;
    _proto.getCoordinates = function() {
        var coordinates = [];
        var geometries = this.getGeometries();
        for(var i = 0, l = geometries.length; i < l; i++){
            var child = geometries[i];
            coordinates.push(child.getShell && 'Polygon' !== child.getJSONType() ? [
                child.getShell()
            ] : child.getCoordinates());
        }
        return coordinates;
    };
    _proto.setCoordinates = function(coordinates) {
        coordinates = coordinates || [];
        var geometries = [];
        for(var i = 0, l = coordinates.length; i < l; i++){
            var g = new this.GeometryType(coordinates[i], this.config());
            geometries.push(g);
        }
        this.setGeometries(geometries);
        return this;
    };
    _proto._initData = function(data) {
        data = data || [];
        if (data.length) {
            if (data[0] instanceof this.GeometryType) this.setGeometries(data);
            else this.setCoordinates(data);
        }
    };
    _proto._checkGeo = function(geo) {
        return geo instanceof this.GeometryType;
    };
    _proto._exportGeoJSONGeometry = function() {
        var points = this.getCoordinates();
        var coordinates = maptalks_es_Coordinate.toNumberArrays(points);
        return {
            type: this.getType(),
            coordinates: coordinates
        };
    };
    return MultiGeometry;
}(maptalks_es_GeometryCollection);
var maptalks_es_MultiPoint = function(_MultiGeometry) {
    _inheritsLoose(MultiPoint, _MultiGeometry);
    function MultiPoint(data, opts) {
        return _MultiGeometry.call(this, maptalks_es_Marker, 'MultiPoint', data, opts) || this;
    }
    var _proto = MultiPoint.prototype;
    _proto.findClosest = function(coordinate) {
        if (!coordinate) return null;
        var coords = this.getCoordinates();
        var hit = null;
        var max = 1 / 0;
        coords.forEach(function(c) {
            var dist = maptalks_es_distanceTo(c, coordinate);
            if (dist < max) {
                hit = c;
                max = dist;
            }
        });
        return hit;
    };
    return MultiPoint;
}(maptalks_es_MultiGeometry);
maptalks_es_MultiPoint.registerJSONType('MultiPoint');
function maptalks_es_distanceTo(p0, p1) {
    var x = p1.x - p0.x, y = p1.y - p0.y;
    return Math.sqrt(x * x + y * y);
}
var maptalks_es_MultiPath = function(_MultiGeometry) {
    _inheritsLoose(MultiPath, _MultiGeometry);
    function MultiPath() {
        return _MultiGeometry.apply(this, arguments) || this;
    }
    var _proto = MultiPath.prototype;
    _proto.getCenterInExtent = function(extent) {
        var children = this.getGeometries();
        var sumx = 0, sumy = 0, counter = 0;
        children.forEach(function(l) {
            var c = l.getCenterInExtent(extent);
            if (c) {
                sumx += c.x * c.count;
                sumy += c.y * c.count;
                counter += c.count;
            }
        });
        if (0 === counter) return null;
        return new maptalks_es_Coordinate(sumx, sumy)._multi(1 / counter);
    };
    return MultiPath;
}(maptalks_es_MultiGeometry);
var maptalks_es_MultiLineString = function(_MultiPath) {
    _inheritsLoose(MultiLineString, _MultiPath);
    function MultiLineString(data, options) {
        return _MultiPath.call(this, maptalks_es_LineString, 'MultiLineString', data, options) || this;
    }
    return MultiLineString;
}(maptalks_es_MultiPath);
maptalks_es_MultiLineString.registerJSONType('MultiLineString');
var maptalks_es_MultiPolygon = function(_MultiPath) {
    _inheritsLoose(MultiPolygon, _MultiPath);
    function MultiPolygon(data, opts) {
        return _MultiPath.call(this, maptalks_es_Polygon, 'MultiPolygon', data, opts) || this;
    }
    return MultiPolygon;
}(maptalks_es_MultiPath);
maptalks_es_MultiPolygon.registerJSONType('MultiPolygon');
var types$1 = {
    Marker: maptalks_es_Marker,
    LineString: maptalks_es_LineString,
    Polygon: maptalks_es_Polygon,
    MultiPoint: maptalks_es_MultiPoint,
    MultiLineString: maptalks_es_MultiLineString,
    MultiPolygon: maptalks_es_MultiPolygon
};
var GeoJSON = {
    toGeometry: function(geoJSON, foreachFn) {
        if (isString(geoJSON)) geoJSON = parseJSON(geoJSON);
        if (Array.isArray(geoJSON)) {
            var resultGeos = [];
            for(var i = 0, len = geoJSON.length; i < len; i++){
                var geo = GeoJSON._convert(geoJSON[i], foreachFn);
                if (Array.isArray(geo)) pushIn(resultGeos, geo);
                else resultGeos.push(geo);
            }
            return resultGeos;
        }
        var resultGeo = GeoJSON._convert(geoJSON, foreachFn);
        return resultGeo;
    },
    _convert: function(json, foreachFn) {
        if (!json || isNil(json['type'])) return null;
        var type = json['type'];
        if ('Feature' === type) {
            var g = json['geometry'];
            var geometry = GeoJSON._convert(g);
            if (!geometry) return null;
            geometry.setId(json['id']);
            geometry.setProperties(json['properties']);
            if (foreachFn) foreachFn(geometry);
            return geometry;
        }
        if ('FeatureCollection' === type) {
            var features = json['features'];
            if (!features) return null;
            return GeoJSON.toGeometry(features, foreachFn);
        }
        if ([
            'Point',
            'LineString',
            'Polygon',
            'MultiPoint',
            'MultiLineString',
            'MultiPolygon'
        ].indexOf(type) >= 0) {
            var clazz = 'Point' === type ? 'Marker' : type;
            var result = new types$1[clazz](json['coordinates']);
            if (foreachFn) foreachFn(result);
            return result;
        } else if ('GeometryCollection' === type) {
            var geometries = json['geometries'];
            if (!isArrayHasData(geometries)) {
                var _result2 = new maptalks_es_GeometryCollection();
                if (foreachFn) foreachFn(_result2);
                return _result2;
            }
            var mGeos = [];
            var size = geometries.length;
            for(var i = 0; i < size; i++)mGeos.push(GeoJSON._convert(geometries[i]));
            var _result = new maptalks_es_GeometryCollection(mGeos);
            if (foreachFn) foreachFn(_result);
            return _result;
        }
        return null;
    }
};
var options$6 = {
    numberOfShellPoints: 60
};
var maptalks_es_Circle = function(_CenterMixin) {
    _inheritsLoose(Circle, _CenterMixin);
    Circle.fromJSON = function(json) {
        var feature = json['feature'];
        var circle = new Circle(json['coordinates'], json['radius'], json['options']);
        circle.setProperties(feature['properties']);
        return circle;
    };
    function Circle(coordinates, radius, opts) {
        var _this;
        _this = _CenterMixin.call(this, null, opts) || this;
        if (coordinates) _this.setCoordinates(coordinates);
        _this._radius = radius;
        return _this;
    }
    var _proto = Circle.prototype;
    _proto.getRadius = function() {
        return this._radius;
    };
    _proto.setRadius = function(radius) {
        this._radius = radius;
        this.onShapeChanged();
        return this;
    };
    _proto.getShell = function() {
        var measurer = this._getMeasurer(), center = this.getCoordinates(), numberOfPoints = this.options['numberOfShellPoints'], radius = this.getRadius();
        var shell = [];
        var rad, dx, dy;
        for(var i = 0, len = numberOfPoints - 1; i < len; i++){
            rad = 360 * i / len * Math.PI / 180;
            dx = radius * Math.cos(rad);
            dy = radius * Math.sin(rad);
            var vertex = measurer.locate(center, dx, dy);
            shell.push(vertex);
        }
        shell.push(shell[0]);
        return shell;
    };
    _proto.getHoles = function() {
        return [];
    };
    _proto.animateShow = function() {
        return this.show();
    };
    _proto._containsPoint = function(point, tolerance) {
        var map = this.getMap();
        if (map.getPitch()) return _CenterMixin.prototype._containsPoint.call(this, point, tolerance);
        var center = map._pointToContainerPoint(this._getCenter2DPoint()), size = this.getSize(), t = isNil(tolerance) ? this._hitTestTolerance() : tolerance, se = center.add(size.width / 2, size.height / 2);
        return withInEllipse(point, center, se, t);
    };
    _proto._computePrjExtent = function(projection) {
        var minmax = this._getMinMax(projection);
        if (!minmax) return null;
        var pcenter = this._getPrjCoordinates();
        var pminmax = minmax.map(function(c) {
            return projection.project(c);
        });
        var leftx = pminmax[0].x - pcenter.x;
        var rightx = pminmax[1].x - pcenter.x;
        var topy = pminmax[2].y - pcenter.y;
        var bottomy = pminmax[3].y - pcenter.y;
        return new maptalks_es_Extent(pcenter.add(leftx, topy), pcenter.add(rightx, bottomy));
    };
    _proto._computeExtent = function(measurer) {
        var minmax = this._getMinMax(measurer);
        if (!minmax) return null;
        return new maptalks_es_Extent(minmax[0].x, minmax[2].y, minmax[1].x, minmax[3].y, this._getProjection());
    };
    _proto._getMinMax = function(measurer) {
        if (!measurer || !this._coordinates || isNil(this._radius)) return null;
        var radius = this._radius;
        var p1 = measurer.locate(this._coordinates, -radius, 0), p2 = measurer.locate(this._coordinates, radius, 0), p3 = measurer.locate(this._coordinates, 0, radius), p4 = measurer.locate(this._coordinates, 0, -radius);
        return [
            p1,
            p2,
            p3,
            p4
        ];
    };
    _proto._computeGeodesicLength = function() {
        if (isNil(this._radius)) return 0;
        return 2 * Math.PI * this._radius;
    };
    _proto._computeGeodesicArea = function() {
        if (isNil(this._radius)) return 0;
        return Math.PI * Math.pow(this._radius, 2);
    };
    _proto._exportGeoJSONGeometry = function() {
        var coordinates = maptalks_es_Coordinate.toNumberArrays([
            this.getShell()
        ]);
        return {
            type: 'Polygon',
            coordinates: coordinates
        };
    };
    _proto._toJSON = function(options) {
        var center = this.getCenter();
        var opts = extend({}, options);
        opts.geometry = false;
        var feature = this.toGeoJSON(opts);
        feature['geometry'] = {
            type: 'Polygon'
        };
        return {
            feature: feature,
            subType: 'Circle',
            coordinates: [
                center.x,
                center.y
            ],
            radius: this.getRadius()
        };
    };
    return Circle;
}(CenterMixin(maptalks_es_Polygon));
maptalks_es_Circle.mergeOptions(options$6);
maptalks_es_Circle.registerJSONType('Circle');
var options$7 = {
    numberOfShellPoints: 80
};
var maptalks_es_Ellipse = function(_CenterMixin) {
    _inheritsLoose(Ellipse, _CenterMixin);
    Ellipse.fromJSON = function(json) {
        var feature = json['feature'];
        var ellipse = new Ellipse(json['coordinates'], json['width'], json['height'], json['options']);
        ellipse.setProperties(feature['properties']);
        return ellipse;
    };
    function Ellipse(coordinates, width, height, opts) {
        var _this;
        _this = _CenterMixin.call(this, null, opts) || this;
        if (coordinates) _this.setCoordinates(coordinates);
        _this.width = width;
        _this.height = height;
        return _this;
    }
    var _proto = Ellipse.prototype;
    _proto.getWidth = function() {
        return this.width;
    };
    _proto.setWidth = function(width) {
        this.width = width;
        this.onShapeChanged();
        return this;
    };
    _proto.getHeight = function() {
        return this.height;
    };
    _proto.setHeight = function(height) {
        this.height = height;
        this.onShapeChanged();
        return this;
    };
    _proto.getShell = function() {
        var measurer = this._getMeasurer(), center = this.getCoordinates(), numberOfPoints = this.options['numberOfShellPoints'], width = this.getWidth(), height = this.getHeight();
        var shell = [];
        var s = Math.pow(width / 2, 2) * Math.pow(height / 2, 2), sx = Math.pow(width / 2, 2), sy = Math.pow(height / 2, 2);
        var deg, rad, dx, dy;
        for(var i = 0; i < numberOfPoints; i++){
            deg = 360 * i / numberOfPoints;
            rad = deg * Math.PI / 180;
            dx = Math.sqrt(s / (sx * Math.pow(Math.tan(rad), 2) + sy));
            dy = Math.sqrt(s / (sy * Math.pow(1 / Math.tan(rad), 2) + sx));
            if (deg > 90 && deg < 270) dx *= -1;
            if (deg > 180 && deg < 360) dy *= -1;
            var vertex = measurer.locate(center, dx, dy);
            shell.push(vertex);
        }
        return shell;
    };
    _proto.getHoles = function() {
        return [];
    };
    _proto.animateShow = function() {
        return this.show();
    };
    _proto._containsPoint = function(point, tolerance) {
        var map = this.getMap();
        if (map.isTransforming()) return _CenterMixin.prototype._containsPoint.call(this, point, tolerance);
        var projection = map.getProjection();
        var t = isNil(tolerance) ? this._hitTestTolerance() : tolerance, pps = projection.projectCoords([
            this._coordinates,
            map.locate(this._coordinates, this.getWidth() / 2, this.getHeight() / 2)
        ]), p0 = map._prjToContainerPoint(pps[0]), p1 = map._prjToContainerPoint(pps[1]);
        return withInEllipse(point, p0, p1, t);
    };
    _proto._computePrjExtent = function() {
        return maptalks_es_Circle.prototype._computePrjExtent.apply(this, arguments);
    };
    _proto._computeExtent = function() {
        return maptalks_es_Circle.prototype._computeExtent.apply(this, arguments);
    };
    _proto._getMinMax = function(measurer) {
        if (!measurer || !this._coordinates || isNil(this.width) || isNil(this.height)) return null;
        var width = this.getWidth(), height = this.getHeight();
        var p1 = measurer.locate(this._coordinates, -width / 2, 0), p2 = measurer.locate(this._coordinates, width / 2, 0), p3 = measurer.locate(this._coordinates, 0, -height / 2), p4 = measurer.locate(this._coordinates, 0, height / 2);
        return [
            p1,
            p2,
            p3,
            p4
        ];
    };
    _proto._computeGeodesicLength = function() {
        if (isNil(this.width) || isNil(this.height)) return 0;
        var longer = this.width > this.height ? this.width : this.height;
        return 2 * Math.PI * longer / 2 - 4 * Math.abs(this.width - this.height);
    };
    _proto._computeGeodesicArea = function() {
        if (isNil(this.width) || isNil(this.height)) return 0;
        return Math.PI * this.width * this.height / 4;
    };
    _proto._exportGeoJSONGeometry = function() {
        var coordinates = maptalks_es_Coordinate.toNumberArrays([
            this.getShell()
        ]);
        return {
            type: 'Polygon',
            coordinates: coordinates
        };
    };
    _proto._toJSON = function(options) {
        var opts = extend({}, options);
        var center = this.getCenter();
        opts.geometry = false;
        var feature = this.toGeoJSON(opts);
        feature['geometry'] = {
            type: 'Polygon'
        };
        return {
            feature: feature,
            subType: 'Ellipse',
            coordinates: [
                center.x,
                center.y
            ],
            width: this.getWidth(),
            height: this.getHeight()
        };
    };
    return Ellipse;
}(CenterMixin(maptalks_es_Polygon));
maptalks_es_Ellipse.mergeOptions(options$7);
maptalks_es_Ellipse.registerJSONType('Ellipse');
var maptalks_es_Rectangle = function(_Polygon) {
    _inheritsLoose(Rectangle, _Polygon);
    Rectangle.fromJSON = function(json) {
        var feature = json['feature'];
        var rect = new Rectangle(json['coordinates'], json['width'], json['height'], json['options']);
        rect.setProperties(feature['properties']);
        return rect;
    };
    function Rectangle(coordinates, width, height, opts) {
        var _this;
        _this = _Polygon.call(this, null, opts) || this;
        if (coordinates) _this.setCoordinates(coordinates);
        _this._width = width;
        _this._height = height;
        return _this;
    }
    var _proto = Rectangle.prototype;
    _proto.getCoordinates = function() {
        return this._coordinates;
    };
    _proto.setCoordinates = function(nw) {
        this._coordinates = nw instanceof maptalks_es_Coordinate ? nw : new maptalks_es_Coordinate(nw);
        if (!this._coordinates || !this.getMap()) {
            this.onPositionChanged();
            return this;
        }
        var projection = this._getProjection();
        this._setPrjCoordinates(projection.project(this._coordinates));
        return this;
    };
    _proto.getWidth = function() {
        return this._width;
    };
    _proto.setWidth = function(width) {
        this._width = width;
        this.onShapeChanged();
        return this;
    };
    _proto.getHeight = function() {
        return this._height;
    };
    _proto.setHeight = function(height) {
        this._height = height;
        this.onShapeChanged();
        return this;
    };
    _proto.getShell = function() {
        var measurer = this._getMeasurer();
        var nw = this._coordinates;
        var map = this.getMap();
        var sx = 1, sy = -1;
        if (map) {
            var fExt = map.getFullExtent();
            if (fExt['left'] > fExt['right']) sx = -1;
            if (fExt['bottom'] > fExt['top']) sy = 1;
        }
        var points = [];
        points.push(nw);
        points.push(measurer.locate(nw, sx * this._width, 0));
        points.push(measurer.locate(nw, sx * this._width, sy * this._height));
        points.push(measurer.locate(nw, 0, sy * this._height));
        points.push(nw);
        return points;
    };
    _proto.getHoles = function() {
        return [];
    };
    _proto.animateShow = function() {
        return this.show();
    };
    _proto._getPrjCoordinates = function() {
        var projection = this._getProjection();
        this._verifyProjection();
        if (!this._pnw && projection) {
            if (this._coordinates) this._pnw = projection.project(this._coordinates);
        }
        return this._pnw;
    };
    _proto._setPrjCoordinates = function(pnw) {
        this._pnw = pnw;
        this.onPositionChanged();
    };
    _proto._getPrjShell = function() {
        var shell = _Polygon.prototype._getPrjShell.call(this);
        var projection = this._getProjection();
        if (!projection.isSphere()) return shell;
        var sphereExtent = projection.getSphereExtent(), sx = sphereExtent.sx, sy = sphereExtent.sy;
        var circum = this._getProjection().getCircum();
        var nw = shell[0];
        for(var i = 1, l = shell.length; i < l; i++){
            var p = shell[i];
            var dx = 0, dy = 0;
            if (sx * (nw.x - p.x) > 0) dx = circum.x * sx;
            if (sy * (nw.y - p.y) < 0) dy = circum.y * sy;
            shell[i]._add(dx, dy);
        }
        return shell;
    };
    _proto._updateCache = function() {
        this._clearCache();
        var projection = this._getProjection();
        if (this._pnw && projection) this._coordinates = projection.unproject(this._pnw);
    };
    _proto._clearProjection = function() {
        this._pnw = null;
        _Polygon.prototype._clearProjection.call(this);
    };
    _proto._computeCenter = function(measurer) {
        return measurer.locate(this._coordinates, this._width / 2, -this._height / 2);
    };
    _proto._containsPoint = function(point, tolerance) {
        var map = this.getMap();
        if (map.isTransforming()) return _Polygon.prototype._containsPoint.call(this, point, tolerance);
        var t = isNil(tolerance) ? this._hitTestTolerance() : tolerance, r = map._getResolution() * t;
        var extent = this._getPrjExtent().expand(r);
        var p = map._containerPointToPrj(point);
        return extent.contains(p);
    };
    _proto._computePrjExtent = function(projection) {
        var se = this._getSouthEast(projection);
        if (!se) return null;
        var prjs = projection.projectCoords([
            new maptalks_es_Coordinate(this._coordinates.x, se.y),
            new maptalks_es_Coordinate(se.x, this._coordinates.y)
        ]);
        return new maptalks_es_Extent(prjs[0], prjs[1]);
    };
    _proto._computeExtent = function(measurer) {
        var se = this._getSouthEast(measurer);
        if (!se) return null;
        return new maptalks_es_Extent(this._coordinates, se, this._getProjection());
    };
    _proto._getSouthEast = function(measurer) {
        if (!measurer || !this._coordinates || isNil(this._width) || isNil(this._height)) return null;
        var width = this.getWidth(), height = this.getHeight();
        var w = width, h = -height;
        if (measurer.fullExtent) {
            var fullExtent = measurer.fullExtent, sx = fullExtent.right > fullExtent.left ? 1 : -1, sy = fullExtent.top > fullExtent.bottom ? 1 : -1;
            w *= sx;
            h *= sy;
        }
        var se = measurer.locate(this._coordinates, w, h);
        return se;
    };
    _proto._computeGeodesicLength = function() {
        if (isNil(this._width) || isNil(this._height)) return 0;
        return 2 * (this._width + this._height);
    };
    _proto._computeGeodesicArea = function() {
        if (isNil(this._width) || isNil(this._height)) return 0;
        return this._width * this._height;
    };
    _proto._exportGeoJSONGeometry = function() {
        var coordinates = maptalks_es_Coordinate.toNumberArrays([
            this.getShell()
        ]);
        return {
            type: 'Polygon',
            coordinates: coordinates
        };
    };
    _proto._toJSON = function(options) {
        var opts = extend({}, options);
        var nw = this.getCoordinates();
        opts.geometry = false;
        var feature = this.toGeoJSON(opts);
        feature['geometry'] = {
            type: 'Polygon'
        };
        return {
            feature: feature,
            subType: 'Rectangle',
            coordinates: [
                nw.x,
                nw.y
            ],
            width: this.getWidth(),
            height: this.getHeight()
        };
    };
    return Rectangle;
}(maptalks_es_Polygon);
maptalks_es_Rectangle.registerJSONType('Rectangle');
var options$8 = {
    numberOfShellPoints: 60
};
var maptalks_es_Sector = function(_Circle) {
    _inheritsLoose(Sector, _Circle);
    Sector.fromJSON = function(json) {
        var feature = json['feature'];
        var sector = new Sector(json['coordinates'], json['radius'], json['startAngle'], json['endAngle'], json['options']);
        sector.setProperties(feature['properties']);
        return sector;
    };
    function Sector(coordinates, radius, startAngle, endAngle, opts) {
        var _this;
        _this = _Circle.call(this, coordinates, radius, opts) || this;
        _this.startAngle = startAngle;
        _this.endAngle = endAngle;
        return _this;
    }
    var _proto = Sector.prototype;
    _proto.getStartAngle = function() {
        return this.startAngle;
    };
    _proto.setStartAngle = function(startAngle) {
        this.startAngle = startAngle;
        this.onShapeChanged();
        return this;
    };
    _proto.getEndAngle = function() {
        return this.endAngle;
    };
    _proto.setEndAngle = function(endAngle) {
        this.endAngle = endAngle;
        this.onShapeChanged();
        return this;
    };
    _proto.getShell = function() {
        var measurer = this._getMeasurer(), center = this.getCoordinates(), numberOfPoints = this.options['numberOfShellPoints'] - 2, radius = this.getRadius(), shell = [
            center.copy()
        ], startAngle = this.getStartAngle(), angle = this.getEndAngle() - startAngle;
        var rad, dx, dy;
        for(var i = 0; i < numberOfPoints; i++){
            rad = (angle * i / (numberOfPoints - 1) + startAngle) * Math.PI / 180;
            dx = radius * Math.cos(rad);
            dy = radius * Math.sin(rad);
            var vertex = measurer.locate(center, dx, dy);
            shell.push(vertex);
        }
        shell.push(center.copy());
        return shell;
    };
    _proto._containsPoint = function(point, tolerance) {
        var map = this.getMap();
        if (map.isTransforming()) return _Circle.prototype._containsPoint.call(this, point, tolerance);
        var center = map._pointToContainerPoint(this._getCenter2DPoint()), t = isNil(tolerance) ? this._hitTestTolerance() : tolerance, size = this.getSize(), pc = center, pp = point, x = pp.x - pc.x, y = pc.y - pp.y, atan2 = Math.atan2(y, x), angle = atan2 < 0 ? (atan2 + 2 * Math.PI) * 360 / (2 * Math.PI) : 360 * atan2 / (2 * Math.PI);
        var sAngle = this.startAngle % 360, eAngle = this.endAngle % 360;
        var between = false;
        between = sAngle > eAngle ? !(angle > eAngle && angle < sAngle) : angle >= sAngle && angle <= eAngle;
        return pp.distanceTo(pc) <= size.width / 2 + t && between;
    };
    _proto._computeGeodesicLength = function() {
        if (isNil(this._radius)) return 0;
        return 2 * Math.PI * this._radius * Math.abs(this.startAngle - this.endAngle) / 360 + 2 * this._radius;
    };
    _proto._computeGeodesicArea = function() {
        if (isNil(this._radius)) return 0;
        return Math.PI * Math.pow(this._radius, 2) * Math.abs(this.startAngle - this.endAngle) / 360;
    };
    _proto._toJSON = function(options) {
        var opts = extend({}, options);
        var center = this.getCenter();
        opts.geometry = false;
        var feature = this.toGeoJSON(opts);
        feature['geometry'] = {
            type: 'Polygon'
        };
        return {
            feature: feature,
            subType: 'Sector',
            coordinates: [
                center.x,
                center.y
            ],
            radius: this.getRadius(),
            startAngle: this.getStartAngle(),
            endAngle: this.getEndAngle()
        };
    };
    return Sector;
}(maptalks_es_Circle);
maptalks_es_Sector.mergeOptions(options$8);
maptalks_es_Sector.registerJSONType('Sector');
var options$9 = {
    enableSimplify: false,
    enableClip: false
};
var maptalks_es_Curve = function(_LineString) {
    _inheritsLoose(Curve, _LineString);
    function Curve() {
        return _LineString.apply(this, arguments) || this;
    }
    var _proto = Curve.prototype;
    _proto._arc = function(ctx, points, lineOpacity) {
        var degree = this.options['arcDegree'] * Math.PI / 180;
        for(var i = 1, l = points.length; i < l; i++){
            var c = Canvas._arcBetween(ctx, points[i - 1], points[i], degree);
            var ctrlPoint = [
                points[i - 1].x + points[i].x - c[0],
                points[i - 1].y + points[i].y - c[1]
            ];
            points[i - 1].nextCtrlPoint = ctrlPoint;
            points[i].prevCtrlPoint = ctrlPoint;
            Canvas._stroke(ctx, lineOpacity);
        }
    };
    _proto._quadraticCurve = function(ctx, points) {
        if (points.length <= 2) {
            Canvas._path(ctx, points);
            return;
        }
        var i, l;
        for(i = 2, l = points.length; i < l; i += 2)ctx.quadraticCurveTo(points[i - 1].x, points[i - 1].y, points[i].x, points[i].y);
        i -= 1;
        if (i < l) for(; i < l; i++)ctx.lineTo(points[i].x, points[i].y);
    };
    _proto._bezierCurve = function(ctx, points) {
        if (points.length <= 3) {
            Canvas._path(ctx, points);
            return;
        }
        var i, l;
        for(i = 1, l = points.length; i + 2 < l; i += 3)ctx.bezierCurveTo(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y, points[i + 2].x, points[i + 2].y);
        if (i < l) for(; i < l; i++)ctx.lineTo(points[i].x, points[i].y);
    };
    _proto._getCurveArrowPoints = function(arrows, segments, lineWidth, arrowStyle, tolerance, step) {
        var l = segments.length;
        var i;
        for(i = step; i < l; i += step){
            var arrow = this._getArrowShape(segments[i - 1], segments[i], lineWidth, arrowStyle, tolerance);
            if (arrow) arrows.push(arrow);
        }
        i -= step;
        if (i < l - 1) for(i += 1; i < l; i++){
            var _arrow = this._getArrowShape(segments[i - 1], segments[i], lineWidth, arrowStyle, tolerance);
            if (_arrow) arrows.push(_arrow);
        }
    };
    return Curve;
}(maptalks_es_LineString);
maptalks_es_Curve.mergeOptions(options$9);
var options$a = {
    arcDegree: 90
};
var maptalks_es_ArcCurve = function(_Curve) {
    _inheritsLoose(ArcCurve, _Curve);
    function ArcCurve() {
        return _Curve.apply(this, arguments) || this;
    }
    var _proto = ArcCurve.prototype;
    _proto._toJSON = function(options) {
        return {
            feature: this.toGeoJSON(options),
            subType: 'ArcCurve'
        };
    };
    _proto._paintOn = function(ctx, points, lineOpacity) {
        ctx.beginPath();
        this._arc(ctx, points, lineOpacity);
        Canvas._stroke(ctx, lineOpacity);
        this._paintArrow(ctx, points, lineOpacity);
    };
    ArcCurve.fromJSON = function(json) {
        var feature = json['feature'];
        var arc = new ArcCurve(feature['geometry']['coordinates'], json['options']);
        arc.setProperties(feature['properties']);
        return arc;
    };
    return ArcCurve;
}(maptalks_es_Curve);
maptalks_es_ArcCurve.registerJSONType('ArcCurve');
maptalks_es_ArcCurve.mergeOptions(options$a);
var maptalks_es_CubicBezierCurve = function(_Curve) {
    _inheritsLoose(CubicBezierCurve, _Curve);
    function CubicBezierCurve() {
        return _Curve.apply(this, arguments) || this;
    }
    CubicBezierCurve.fromJSON = function(json) {
        var feature = json['feature'];
        var curve = new CubicBezierCurve(feature['geometry']['coordinates'], json['options']);
        curve.setProperties(feature['properties']);
        return curve;
    };
    var _proto = CubicBezierCurve.prototype;
    _proto._toJSON = function(options) {
        return {
            feature: this.toGeoJSON(options),
            subType: 'CubicBezierCurve'
        };
    };
    _proto._paintOn = function(ctx, points, lineOpacity) {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        this._bezierCurve(ctx, points);
        Canvas._stroke(ctx, lineOpacity);
        this._paintArrow(ctx, points, lineOpacity);
    };
    _proto._getArrowPoints = function(arrows, segments, lineWidth, arrowStyle, tolerance) {
        return this._getCurveArrowPoints(arrows, segments, lineWidth, arrowStyle, tolerance, 3);
    };
    return CubicBezierCurve;
}(maptalks_es_Curve);
maptalks_es_CubicBezierCurve.registerJSONType('CubicBezierCurve');
var maptalks_es_QuadBezierCurve = function(_Curve) {
    _inheritsLoose(QuadBezierCurve, _Curve);
    function QuadBezierCurve() {
        return _Curve.apply(this, arguments) || this;
    }
    QuadBezierCurve.fromJSON = function(json) {
        var feature = json['feature'];
        var curve = new QuadBezierCurve(feature['geometry']['coordinates'], json['options']);
        curve.setProperties(feature['properties']);
        return curve;
    };
    var _proto = QuadBezierCurve.prototype;
    _proto._toJSON = function(options) {
        return {
            feature: this.toGeoJSON(options),
            subType: 'QuadBezierCurve'
        };
    };
    _proto._paintOn = function(ctx, points, lineOpacity) {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        this._quadraticCurve(ctx, points, lineOpacity);
        Canvas._stroke(ctx, lineOpacity);
        this._paintArrow(ctx, points, lineOpacity);
    };
    _proto._getArrowPoints = function(arrows, segments, lineWidth, arrowStyle, tolerance) {
        return this._getCurveArrowPoints(arrows, segments, lineWidth, arrowStyle, tolerance, 2);
    };
    return QuadBezierCurve;
}(maptalks_es_Curve);
maptalks_es_QuadBezierCurve.registerJSONType('QuadBezierCurve');
var defaultSymbol$1 = {
    textFaceName: 'monospace',
    textSize: 12,
    textLineSpacing: 8,
    textWrapCharacter: '\n',
    textHorizontalAlignment: 'middle',
    textVerticalAlignment: 'middle'
};
var defaultBoxSymbol = {
    markerType: 'square',
    markerLineColor: '#000',
    markerLineWidth: 2,
    markerLineOpacity: 1,
    markerFill: '#fff',
    markerOpacity: 1
};
var maptalks_es_TextMarker = function(_Marker) {
    _inheritsLoose(TextMarker, _Marker);
    function TextMarker() {
        return _Marker.apply(this, arguments) || this;
    }
    var _proto = TextMarker.prototype;
    _proto.getContent = function() {
        return this._content;
    };
    _proto.setContent = function(content) {
        var old = this._content;
        this._content = escapeSpecialChars(content);
        this._refresh();
        this._fireEvent('contentchange', {
            old: old,
            new: content
        });
        return this;
    };
    _proto.onAdd = function() {
        this._refresh();
    };
    _proto.toJSON = function() {
        var json = _Marker.prototype.toJSON.call(this);
        delete json['symbol'];
        return json;
    };
    _proto.setSymbol = function(symbol) {
        if (this._refreshing || !symbol) return _Marker.prototype.setSymbol.call(this, symbol);
        var s = this._parseSymbol(symbol);
        if (this.setTextStyle) {
            var style = this.getTextStyle() || {};
            style.symbol = s[0];
            this.setTextStyle(style);
        } else if (this.setTextSymbol) this.setTextSymbol(s[0]);
        if (this.setBoxStyle) {
            var _style = this.getBoxStyle() || {};
            _style.symbol = s[1];
            this.setBoxStyle(_style);
        } else if (this.setBoxSymbol) this.setBoxSymbol(s[1]);
        return this;
    };
    _proto._parseSymbol = function(symbol) {
        var t = {};
        var b = {};
        for(var p in symbol)if (hasOwn(symbol, p)) {
            if (0 === p.indexOf('text')) t[p] = symbol[p];
            else b[p] = symbol[p];
        }
        return [
            t,
            b
        ];
    };
    _proto._getTextSize = function(symbol) {
        return splitTextToRow(this._content, symbol)['size'];
    };
    _proto._getInternalSymbol = function() {
        return this._symbol;
    };
    _proto._getDefaultTextSymbol = function() {
        return extend({}, defaultSymbol$1);
    };
    _proto._getDefaultBoxSymbol = function() {
        return extend({}, defaultBoxSymbol);
    };
    _proto._getDefaultPadding = function() {
        return [
            12,
            8
        ];
    };
    return TextMarker;
}(maptalks_es_Marker);
var options$b = {
    textStyle: {
        wrap: true,
        padding: [
            12,
            8
        ],
        verticalAlignment: 'middle',
        horizontalAlignment: 'middle'
    },
    boxSymbol: null
};
var maptalks_es_TextBox = function(_TextMarker) {
    _inheritsLoose(TextBox, _TextMarker);
    function TextBox(content, coordinates, width, height, options) {
        var _this;
        if (void 0 === options) options = {};
        _this = _TextMarker.call(this, coordinates, options) || this;
        _this._content = escapeSpecialChars(content);
        _this._width = isNil(width) ? 100 : width;
        _this._height = isNil(height) ? 40 : height;
        if (options.boxSymbol) _this.setBoxSymbol(options.boxSymbol);
        if (options.textStyle) _this.setTextStyle(options.textStyle);
        _this._refresh();
        return _this;
    }
    var _proto = TextBox.prototype;
    _proto.getWidth = function() {
        return this._width;
    };
    _proto.setWidth = function(width) {
        this._width = width;
        this._refresh();
        return this;
    };
    _proto.getHeight = function() {
        return this._height;
    };
    _proto.setHeight = function(height) {
        this._height = height;
        this._refresh();
        return this;
    };
    _proto.getBoxSymbol = function() {
        return extend({}, this.options.boxSymbol);
    };
    _proto.setBoxSymbol = function(symbol) {
        this.options.boxSymbol = symbol ? extend({}, symbol) : symbol;
        if (this.getSymbol()) this._refresh();
        return this;
    };
    _proto.getTextStyle = function() {
        if (!this.options.textStyle) return null;
        return extend({}, this.options.textStyle);
    };
    _proto.setTextStyle = function(style) {
        this.options.textStyle = style ? extend({}, style) : style;
        if (this.getSymbol()) this._refresh();
        return this;
    };
    TextBox.fromJSON = function(json) {
        var feature = json['feature'];
        var textBox = new TextBox(json['content'], feature['geometry']['coordinates'], json['width'], json['height'], json['options']);
        textBox.setProperties(feature['properties']);
        textBox.setId(feature['id']);
        if (json['symbol']) textBox.setSymbol(json['symbol']);
        return textBox;
    };
    _proto._toJSON = function(options) {
        return {
            feature: this.toGeoJSON(options),
            width: this.getWidth(),
            height: this.getHeight(),
            subType: 'TextBox',
            content: this._content
        };
    };
    _proto._refresh = function() {
        var textStyle = this.getTextStyle() || {}, padding = textStyle['padding'] || [
            12,
            8
        ], maxWidth = this._width - 2 * padding[0], maxHeight = this._height - 2 * padding[1];
        var symbol = extend({}, textStyle.symbol || this._getDefaultTextSymbol(), this.options.boxSymbol || this._getDefaultBoxSymbol(), {
            textName: this._content,
            markerWidth: this._width,
            markerHeight: this._height,
            textHorizontalAlignment: 'middle',
            textVerticalAlignment: 'middle',
            textMaxWidth: maxWidth,
            textMaxHeight: maxHeight
        });
        if (textStyle['wrap'] && !symbol['textWrapWidth']) symbol['textWrapWidth'] = maxWidth;
        var hAlign = textStyle['horizontalAlignment'];
        symbol['textDx'] = symbol['markerDx'] || 0;
        var offsetX = symbol['markerWidth'] / 2 - padding[0];
        if ('left' === hAlign) {
            symbol['textHorizontalAlignment'] = 'right';
            symbol['textDx'] = symbol['textDx'] - offsetX;
        } else if ('right' === hAlign) {
            symbol['textHorizontalAlignment'] = 'left';
            symbol['textDx'] = symbol['textDx'] + offsetX;
        }
        var vAlign = textStyle['verticalAlignment'];
        symbol['textDy'] = symbol['markerDy'] || 0;
        var offsetY = symbol['markerHeight'] / 2 - padding[1];
        if ('top' === vAlign) {
            symbol['textVerticalAlignment'] = 'bottom';
            symbol['textDy'] -= offsetY;
        } else if ('bottom' === vAlign) {
            symbol['textVerticalAlignment'] = 'top';
            symbol['textDy'] += offsetY;
        }
        this._refreshing = true;
        this.updateSymbol(symbol);
        delete this._refreshing;
    };
    return TextBox;
}(maptalks_es_TextMarker);
maptalks_es_TextBox.mergeOptions(options$b);
maptalks_es_TextBox.registerJSONType('TextBox');
var options$c = {
    boxStyle: null,
    textSymbol: null
};
var maptalks_es_Label = function(_TextMarker) {
    _inheritsLoose(Label, _TextMarker);
    function Label(content, coordinates, options) {
        var _this;
        if (void 0 === options) options = {};
        _this = _TextMarker.call(this, coordinates, options) || this;
        if (options.textSymbol) _this.setTextSymbol(options.textSymbol);
        if (options.boxStyle) _this.setBoxStyle(options.boxStyle);
        _this._content = escapeSpecialChars(content);
        _this._refresh();
        return _this;
    }
    var _proto = Label.prototype;
    _proto.getBoxStyle = function() {
        if (!this.options.boxStyle) return null;
        return extend({}, this.options.boxStyle);
    };
    _proto.setBoxStyle = function(style) {
        this.options.boxStyle = style ? extend({}, style) : style;
        this._refresh();
        return this;
    };
    _proto.getTextSymbol = function() {
        return extend({}, this._getDefaultTextSymbol(), this.options.textSymbol);
    };
    _proto.setTextSymbol = function(symbol) {
        this.options.textSymbol = symbol ? extend({}, symbol) : symbol;
        this._refresh();
        return this;
    };
    Label.fromJSON = function(json) {
        var feature = json['feature'];
        var label = new Label(json['content'], feature['geometry']['coordinates'], json['options']);
        label.setProperties(feature['properties']);
        label.setId(feature['id']);
        if (json['symbol']) label.setSymbol(json['symbol']);
        return label;
    };
    _proto._canEdit = function() {
        return false;
    };
    _proto._toJSON = function(options) {
        return {
            feature: this.toGeoJSON(options),
            subType: 'Label',
            content: this._content
        };
    };
    _proto._refresh = function() {
        var symbol = extend({}, this.getTextSymbol(), {
            textName: this._content
        });
        var boxStyle = this.getBoxStyle();
        if (boxStyle) {
            extend(symbol, boxStyle.symbol);
            var sizes = this._getBoxSize(symbol), textSize = sizes[1], padding = boxStyle['padding'] || this._getDefaultPadding();
            var boxSize = sizes[0];
            symbol['markerWidth'] = boxSize['width'];
            symbol['markerHeight'] = boxSize['height'];
            var dx = symbol['textDx'] || 0, dy = symbol['textDy'] || 0, textAlignPoint = getAlignPoint(textSize, symbol['textHorizontalAlignment'], symbol['textVerticalAlignment'])._add(dx, dy);
            var hAlign = boxStyle['horizontalAlignment'] || 'middle';
            symbol['markerDx'] = textAlignPoint.x;
            if ('left' === hAlign) symbol['markerDx'] += symbol['markerWidth'] / 2 - padding[0];
            else if ('right' === hAlign) symbol['markerDx'] -= symbol['markerWidth'] / 2 - textSize['width'] - padding[0];
            else symbol['markerDx'] += textSize['width'] / 2;
            var vAlign = boxStyle['verticalAlignment'] || 'middle';
            symbol['markerDy'] = textAlignPoint.y;
            if ('top' === vAlign) symbol['markerDy'] += symbol['markerHeight'] / 2 - padding[1];
            else if ('bottom' === vAlign) symbol['markerDy'] -= symbol['markerHeight'] / 2 - textSize['height'] - padding[1];
            else symbol['markerDy'] += textSize['height'] / 2;
        }
        this._refreshing = true;
        this.updateSymbol(symbol);
        delete this._refreshing;
    };
    _proto._getBoxSize = function(symbol) {
        if (!symbol['markerType']) symbol['markerType'] = 'square';
        var boxStyle = this.getBoxStyle();
        var size = this._getTextSize(symbol);
        var width, height;
        var padding = boxStyle['padding'] || this._getDefaultPadding();
        width = size['width'] + 2 * padding[0];
        height = size['height'] + 2 * padding[1];
        if (boxStyle['minWidth']) {
            if (!width || width < boxStyle['minWidth']) width = boxStyle['minWidth'];
        }
        if (boxStyle['minHeight']) {
            if (!height || height < boxStyle['minHeight']) height = boxStyle['minHeight'];
        }
        return [
            new maptalks_es_Size(width, height),
            size
        ];
    };
    return Label;
}(maptalks_es_TextMarker);
maptalks_es_Label.mergeOptions(options$c);
maptalks_es_Label.registerJSONType('Label');
var maptalks_es_Connectable = function(Base) {
    return function(_Base) {
        _inheritsLoose(_class, _Base);
        function _class() {
            return _Base.apply(this, arguments) || this;
        }
        _class._hasConnectors = function(geometry) {
            return !isNil(geometry.__connectors) && geometry.__connectors.length > 0;
        };
        _class._getConnectors = function(geometry) {
            return geometry.__connectors;
        };
        var _proto = _class.prototype;
        _proto.getConnectSource = function() {
            return this._connSource;
        };
        _proto.setConnectSource = function(src) {
            var target = this._connTarget;
            this.onRemove();
            this._connSource = src;
            this._connTarget = target;
            this.onAdd();
            return this;
        };
        _proto.getConnectTarget = function() {
            return this._connTarget;
        };
        _proto.setConnectTarget = function(target) {
            var src = this._connSource;
            this.onRemove();
            this._connSource = src;
            this._connTarget = target;
            this._updateCoordinates();
            this._registerEvents();
            return this;
        };
        _proto._updateCoordinates = function() {
            var map = this.getMap();
            if (!map && this._connSource) map = this._connSource.getMap();
            if (!map && this._connTarget) map = this._connTarget.getMap();
            if (!map) return;
            if (!this._connSource || !this._connTarget) return;
            var srcPoints = this._connSource._getConnectPoints();
            var targetPoints = this._connTarget._getConnectPoints();
            var minDist = 0;
            var oldCoordinates = this.getCoordinates();
            var c1, c2;
            for(var i = 0, len = srcPoints.length; i < len; i++){
                var p1 = srcPoints[i];
                for(var j = 0, length = targetPoints.length; j < length; j++){
                    var p2 = targetPoints[j];
                    var dist = map.computeLength(p1, p2);
                    if (0 === i && 0 === j) {
                        c1 = p1;
                        c2 = p2;
                        minDist = dist;
                    } else if (dist < minDist) {
                        c1 = p1;
                        c2 = p2;
                    }
                }
            }
            if (!isArrayHasData(oldCoordinates) || !oldCoordinates[0].equals(c1) || !oldCoordinates[1].equals(c2)) this.setCoordinates([
                c1,
                c2
            ]);
        };
        _proto.onAdd = function() {
            this._registerEvents();
            this._updateCoordinates();
        };
        _proto.onRemove = function() {
            if (this._connSource) {
                if (this._connSource.__connectors) removeFromArray(this, this._connSource.__connectors);
                this._connSource.off('dragging positionchange', this._updateCoordinates, this).off('remove', this.onRemove, this);
                this._connSource.off('dragstart mousedown mouseover', this._showConnect, this);
                this._connSource.off('dragend mouseup mouseout', this.hide, this);
                this._connSource.off('show', this._showConnect, this).off('hide', this.hide, this);
                delete this._connSource;
            }
            if (this._connTarget) {
                removeFromArray(this, this._connTarget.__connectors);
                this._connTarget.off('dragging positionchange', this._updateCoordinates, this).off('remove', this.onRemove, this);
                this._connTarget.off('show', this._showConnect, this).off('hide', this.hide, this);
                delete this._connTarget;
            }
            if (!(this._connSource instanceof maptalks_es_Geometry) || !(this._connTarget instanceof maptalks_es_Geometry)) {
                var map = this.getMap();
                if (map) map.off('movestart moving moveend zoomstart zooming zoomend rotate pitch fovchange spatialreferencechange', this._updateCoordinates, this);
            }
        };
        _proto._showConnect = function() {
            if (!this._connSource || !this._connTarget) return;
            if (this._connSource.isVisible() && this._connTarget.isVisible()) {
                this._updateCoordinates();
                this.show();
            }
        };
        _proto._registerEvents = function() {
            if (!this._connSource || !this._connTarget) return;
            if (!this._connSource.__connectors) this._connSource.__connectors = [];
            if (!this._connTarget.__connectors) this._connTarget.__connectors = [];
            this._connSource.__connectors.push(this);
            this._connTarget.__connectors.push(this);
            this._connSource.on('dragging positionchange', this._updateCoordinates, this).on('remove', this.remove, this);
            this._connTarget.on('dragging positionchange', this._updateCoordinates, this).on('remove', this.remove, this);
            this._connSource.on('show', this._showConnect, this).on('hide', this.hide, this);
            this._connTarget.on('show', this._showConnect, this).on('hide', this.hide, this);
            var trigger = this.options['showOn'];
            this.hide();
            if ('moving' === trigger) {
                this._connSource.on('dragstart', this._showConnect, this).on('dragend', this.hide, this);
                this._connTarget.on('dragstart', this._showConnect, this).on('dragend', this.hide, this);
            } else if ('click' === trigger) {
                this._connSource.on('mousedown', this._showConnect, this).on('mouseup', this.hide, this);
                this._connTarget.on('mousedown', this._showConnect, this).on('mouseup', this.hide, this);
            } else if ('mouseover' === trigger) {
                this._connSource.on('mouseover', this._showConnect, this).on('mouseout', this.hide, this);
                this._connTarget.on('mouseover', this._showConnect, this).on('mouseout', this.hide, this);
            } else this._showConnect();
            if (!(this._connSource instanceof maptalks_es_Geometry) || !(this._connTarget instanceof maptalks_es_Geometry)) {
                var map = this.getMap();
                if (map) map.on('movestart moving moveend zoomstart zooming zoomend rotate pitch fovchange spatialreferencechange', this._updateCoordinates, this);
            }
        };
        return _class;
    }(Base);
};
var options$d = {
    showOn: 'always'
};
var maptalks_es_ConnectorLine = function(_Connectable) {
    _inheritsLoose(ConnectorLine, _Connectable);
    function ConnectorLine(src, target, options) {
        var _this;
        _this = _Connectable.call(this, null, options) || this;
        if (1 === arguments.length) {
            options = src;
            src = null;
            target = null;
        }
        _this._connSource = src;
        _this._connTarget = target;
        return _this;
    }
    return ConnectorLine;
}(maptalks_es_Connectable(maptalks_es_LineString));
maptalks_es_ConnectorLine.mergeOptions(options$d);
maptalks_es_ConnectorLine.registerJSONType('ConnectorLine');
var maptalks_es_ArcConnectorLine = function(_Connectable2) {
    _inheritsLoose(ArcConnectorLine, _Connectable2);
    function ArcConnectorLine(src, target, options) {
        var _this2;
        _this2 = _Connectable2.call(this, null, options) || this;
        if (1 === arguments.length) {
            options = src;
            src = null;
            target = null;
        }
        _this2._connSource = src;
        _this2._connTarget = target;
        return _this2;
    }
    return ArcConnectorLine;
}(maptalks_es_Connectable(maptalks_es_ArcCurve));
maptalks_es_ArcConnectorLine.mergeOptions(options$d);
maptalks_es_ArcConnectorLine.registerJSONType('ArcConnectorLine');
var options$e = {
    drawImmediate: false
};
var maptalks_es_OverlayLayer = function(_Layer) {
    _inheritsLoose(OverlayLayer, _Layer);
    function OverlayLayer(id, geometries, options) {
        var _this;
        if (geometries && !(geometries instanceof maptalks_es_Geometry) && !Array.isArray(geometries) && GEOJSON_TYPES.indexOf(geometries.type) < 0) {
            options = geometries;
            geometries = null;
        }
        _this = _Layer.call(this, id, options) || this;
        _this._maxZIndex = 0;
        _this._minZIndex = 0;
        _this._initCache();
        if (geometries) _this.addGeometry(geometries);
        var style = _this.options['style'];
        if (style) _this.setStyle(style);
        return _this;
    }
    var _proto = OverlayLayer.prototype;
    _proto.getGeometryById = function(id) {
        if (isNil(id) || '' === id) return null;
        if (!this._geoMap[id]) return null;
        return this._geoMap[id];
    };
    _proto.getGeometries = function(filter, context) {
        if (!filter) return this._geoList.slice(0);
        var result = [];
        var geometry, filtered;
        for(var i = 0, l = this._geoList.length; i < l; i++){
            geometry = this._geoList[i];
            filtered = context ? filter.call(context, geometry) : filter(geometry);
            if (filtered) result.push(geometry);
        }
        return result;
    };
    _proto.getFirstGeometry = function() {
        if (!this._geoList.length) return null;
        return this._geoList[0];
    };
    _proto.getLastGeometry = function() {
        var len = this._geoList.length;
        if (0 === len) return null;
        return this._geoList[len - 1];
    };
    _proto.getCount = function() {
        return this._geoList.length;
    };
    _proto.getExtent = function() {
        if (0 === this.getCount()) return null;
        var extent = new maptalks_es_Extent(this.getProjection());
        this.forEach(function(g) {
            extent._combine(g.getExtent());
        });
        return extent;
    };
    _proto.forEach = function(fn, context) {
        var copyOnWrite = this._geoList.slice(0);
        for(var i = 0, l = copyOnWrite.length; i < l; i++)if (context) fn.call(context, copyOnWrite[i], i);
        else fn(copyOnWrite[i], i);
        return this;
    };
    _proto.filter = function(fn, context) {
        var selected = [];
        var isFn = isFunction(fn);
        var filter = isFn ? fn : createFilter(fn);
        this.forEach(function(geometry) {
            var g = isFn ? geometry : getFilterFeature(geometry);
            if (context ? filter.call(context, g) : filter(g)) selected.push(geometry);
        }, this);
        return selected;
    };
    _proto.isEmpty = function() {
        return !this._geoList.length;
    };
    _proto.addGeometry = function(geometries, fitView) {
        if (!geometries) return this;
        if ('FeatureCollection' === geometries.type) return this.addGeometry(GeoJSON.toGeometry(geometries), fitView);
        if (Array.isArray(geometries)) {
            if (0 === geometries.length) return this;
        } else {
            var count = arguments.length;
            var last = arguments[count - 1];
            geometries = Array.prototype.slice.call(arguments, 0, count - 1);
            fitView = last;
            if (last && isObject(last) && ('type' in last || last instanceof maptalks_es_Geometry)) {
                geometries.push(last);
                fitView = false;
            }
            return this.addGeometry(geometries, fitView);
        }
        this._initCache();
        var extent;
        if (fitView) extent = new maptalks_es_Extent();
        this._toSort = this._maxZIndex > 0;
        var geos = [];
        for(var i = 0, l = geometries.length; i < l; i++){
            var geo = geometries[i];
            if (!geo) throw new Error('Invalid geometry to add to layer(' + this.getId() + ') at index:' + i);
            if (!(geo instanceof maptalks_es_Geometry)) {
                geo = maptalks_es_Geometry.fromJSON(geo);
                if (Array.isArray(geo)) for(var ii = 0, ll = geo.length; ii < ll; ii++){
                    this._add(geo[ii], extent, i);
                    geos.push(geo[ii]);
                }
            }
            if (!Array.isArray(geo)) {
                this._add(geo, extent, i);
                geos.push(geo);
            }
        }
        var map = this.getMap();
        if (map) {
            this._getRenderer().onGeometryAdd(geos);
            if (extent && !isNil(extent.xmin)) {
                var center = extent.getCenter();
                var z = map.getFitZoom(extent);
                if (isObject(fitView)) {
                    var step = isFunction(fitView.step) ? fitView.step : function() {};
                    map.animateTo({
                        center: center,
                        zoom: z
                    }, extend({
                        duration: map.options.zoomAnimationDuration,
                        easing: 'out'
                    }, fitView), step);
                } else if (true === fitView) map.setCenterAndZoom(center, z);
            }
        }
        this.fire('addgeo', {
            geometries: geometries
        });
        return this;
    };
    _proto.getGeoMinZIndex = function() {
        return this._minZIndex;
    };
    _proto.getGeoMaxZIndex = function() {
        return this._maxZIndex;
    };
    _proto._add = function(geo, extent, i) {
        if (!this._toSort) this._toSort = 0 !== geo.getZIndex();
        this._updateZIndex(geo.getZIndex());
        var geoId = geo.getId();
        if (!isNil(geoId)) {
            if (!isNil(this._geoMap[geoId])) throw new Error('Duplicate geometry id in layer(' + this.getId() + '):' + geoId + ', at index:' + i);
            this._geoMap[geoId] = geo;
        }
        var internalId = UID();
        geo._setInternalId(internalId);
        this._geoList.push(geo);
        this.onAddGeometry(geo);
        geo._bindLayer(this);
        if (geo.onAdd) geo.onAdd();
        if (extent) extent._combine(geo.getExtent());
        geo._fireEvent('add', {
            layer: this
        });
        if (this._cookedStyles) this._styleGeometry(geo);
    };
    _proto.removeGeometry = function(geometries) {
        if (!Array.isArray(geometries)) return this.removeGeometry([
            geometries
        ]);
        for(var i = geometries.length - 1; i >= 0; i--){
            if (!(geometries[i] instanceof maptalks_es_Geometry)) geometries[i] = this.getGeometryById(geometries[i]);
            if (!!geometries[i] && this === geometries[i].getLayer()) geometries[i].remove();
        }
        this.fire('removegeo', {
            geometries: geometries
        });
        return this;
    };
    _proto.clear = function() {
        this._clearing = true;
        this.forEach(function(geo) {
            geo.remove();
        });
        this._geoMap = {};
        var old = this._geoList;
        this._geoList = [];
        if (this._getRenderer()) this._getRenderer().onGeometryRemove(old);
        this._clearing = false;
        this.fire('clear');
        return this;
    };
    _proto.onRemoveGeometry = function(geometry) {
        if (!geometry || this._clearing) return;
        if (this !== geometry.getLayer()) return;
        var internalId = geometry._getInternalId();
        if (isNil(internalId)) return;
        var geoId = geometry.getId();
        if (!isNil(geoId)) delete this._geoMap[geoId];
        var idx = this._findInList(geometry);
        if (idx >= 0) this._geoList.splice(idx, 1);
        if (this._getRenderer()) this._getRenderer().onGeometryRemove([
            geometry
        ]);
    };
    _proto.getStyle = function() {
        if (!this.options['style']) return null;
        return this.options['style'];
    };
    _proto.setStyle = function(style) {
        this.options.style = style;
        style = parseStyleRootPath(style);
        this._cookedStyles = compileStyle(style);
        this.forEach(function(geometry) {
            this._styleGeometry(geometry);
        }, this);
        this.fire('setstyle', {
            style: style
        });
        return this;
    };
    _proto._styleGeometry = function(geometry) {
        if (!this._cookedStyles) return false;
        var g = getFilterFeature(geometry);
        for(var i = 0, len = this._cookedStyles.length; i < len; i++)if (true === this._cookedStyles[i]['filter'](g)) {
            geometry._setExternSymbol(this._cookedStyles[i]['symbol']);
            return true;
        }
        return false;
    };
    _proto.removeStyle = function() {
        if (!this.options.style) return this;
        delete this.options.style;
        delete this._cookedStyles;
        this.forEach(function(geometry) {
            geometry._setExternSymbol(null);
        }, this);
        this.fire('removestyle');
        return this;
    };
    _proto.onAddGeometry = function(geo) {
        var style = this.getStyle();
        if (style) this._styleGeometry(geo);
    };
    _proto.hide = function() {
        for(var i = 0, l = this._geoList.length; i < l; i++)this._geoList[i].onHide();
        return maptalks_es_Layer.prototype.hide.call(this);
    };
    _proto._initCache = function() {
        if (!this._geoList) {
            this._geoList = [];
            this._geoMap = {};
        }
    };
    _proto._updateZIndex = function() {
        for(var _len = arguments.length, zIndex = new Array(_len), _key = 0; _key < _len; _key++)zIndex[_key] = arguments[_key];
        this._maxZIndex = Math.max(this._maxZIndex, Math.max.apply(Math, zIndex));
        this._minZIndex = Math.min(this._minZIndex, Math.min.apply(Math, zIndex));
    };
    _proto._sortGeometries = function() {
        var _this2 = this;
        if (!this._toSort) return;
        this._maxZIndex = 0;
        this._minZIndex = 0;
        this._geoList.sort(function(a, b) {
            _this2._updateZIndex(a.getZIndex(), b.getZIndex());
            return _this2._compare(a, b);
        });
        this._toSort = false;
    };
    _proto._compare = function(a, b) {
        if (a.getZIndex() === b.getZIndex()) return a._getInternalId() - b._getInternalId();
        return a.getZIndex() - b.getZIndex();
    };
    _proto._findInList = function(geo) {
        var len = this._geoList.length;
        if (0 === len) return -1;
        this._sortGeometries();
        var low = 0, high = len - 1, middle;
        while(low <= high){
            middle = Math.floor((low + high) / 2);
            if (this._geoList[middle] === geo) return middle;
            if (this._compare(this._geoList[middle], geo) > 0) high = middle - 1;
            else low = middle + 1;
        }
        return -1;
    };
    _proto._onGeometryEvent = function(param) {
        if (!param || !param['target']) return;
        var type = param['type'];
        if ('idchange' === type) this._onGeometryIdChange(param);
        else if ('zindexchange' === type) this._onGeometryZIndexChange(param);
        else if ('positionchange' === type) this._onGeometryPositionChange(param);
        else if ('shapechange' === type) this._onGeometryShapeChange(param);
        else if ('symbolchange' === type) this._onGeometrySymbolChange(param);
        else if ('show' === type) this._onGeometryShow(param);
        else if ('hide' === type) this._onGeometryHide(param);
        else if ('propertieschange' === type) this._onGeometryPropertiesChange(param);
    };
    _proto._onGeometryIdChange = function(param) {
        if (param['new'] === param['old']) {
            if (this._geoMap[param['old']] && this._geoMap[param['old']] === param['target']) return;
        }
        if (!isNil(param['new'])) {
            if (this._geoMap[param['new']]) throw new Error('Duplicate geometry id in layer(' + this.getId() + '):' + param['new']);
            this._geoMap[param['new']] = param['target'];
        }
        if (!isNil(param['old']) && param['new'] !== param['old']) delete this._geoMap[param['old']];
    };
    _proto._onGeometryZIndexChange = function(param) {
        if (param['old'] !== param['new']) {
            this._updateZIndex(param['new']);
            this._toSort = true;
            if (this._getRenderer()) this._getRenderer().onGeometryZIndexChange(param);
        }
    };
    _proto._onGeometryPositionChange = function(param) {
        if (this._getRenderer()) this._getRenderer().onGeometryPositionChange(param);
    };
    _proto._onGeometryShapeChange = function(param) {
        if (this._getRenderer()) this._getRenderer().onGeometryShapeChange(param);
    };
    _proto._onGeometrySymbolChange = function(param) {
        if (this._getRenderer()) this._getRenderer().onGeometrySymbolChange(param);
    };
    _proto._onGeometryShow = function(param) {
        if (this._getRenderer()) this._getRenderer().onGeometryShow(param);
    };
    _proto._onGeometryHide = function(param) {
        if (this._getRenderer()) this._getRenderer().onGeometryHide(param);
    };
    _proto._onGeometryPropertiesChange = function(param) {
        if (this._getRenderer()) this._getRenderer().onGeometryPropertiesChange(param);
    };
    return OverlayLayer;
}(maptalks_es_Layer);
maptalks_es_OverlayLayer.mergeOptions(options$e);
var TEMP_EXTENT$3 = new maptalks_es_PointExtent();
var options$f = {
    debug: false,
    enableSimplify: true,
    geometryEvents: true,
    defaultIconSize: [
        20,
        20
    ],
    cacheVectorOnCanvas: true,
    cacheSvgOnCanvas: Browser$1.gecko,
    enableAltitude: false,
    altitudeProperty: 'altitude',
    drawAltitude: false,
    altitude: 0
};
var maptalks_es_VectorLayer = function(_OverlayLayer) {
    _inheritsLoose(VectorLayer, _OverlayLayer);
    function VectorLayer(id, geometries, options) {
        return _OverlayLayer.call(this, id, geometries, options) || this;
    }
    var _proto = VectorLayer.prototype;
    _proto.onConfig = function(conf) {
        _OverlayLayer.prototype.onConfig.call(this, conf);
        if (conf['enableAltitude'] || conf['drawAltitude'] || conf['altitudeProperty']) {
            var renderer = this.getRenderer();
            if (renderer && renderer.setToRedraw) renderer.setToRedraw();
        }
    };
    _proto.identify = function(coordinate, options) {
        if (void 0 === options) options = {};
        var renderer = this.getRenderer();
        if (options['onlyVisible'] && renderer && renderer.identify) return renderer.identify(coordinate, options);
        if (!(coordinate instanceof maptalks_es_Coordinate)) coordinate = new maptalks_es_Coordinate(coordinate);
        return this._hitGeos(this._geoList, coordinate, options);
    };
    _proto._hitGeos = function(geometries, coordinate, options) {
        if (void 0 === options) options = {};
        var filter = options['filter'], tolerance = options['tolerance'], hits = [];
        var map = this.getMap();
        var point = map.coordToPoint(coordinate);
        var cp = map._pointToContainerPoint(point, void 0, 0, point);
        for(var i = geometries.length - 1; i >= 0; i--){
            var geo = geometries[i];
            if (!!geo && !!geo.isVisible() && !!geo._getPainter() && !!geo.options['interactive']) {
                if (!(geo instanceof maptalks_es_LineString) || !geo._getArrowStyle() && !(geo instanceof maptalks_es_Curve)) {
                    var extent = geo.getContainerExtent(TEMP_EXTENT$3);
                    if (tolerance) extent = extent._expand(tolerance);
                    if (!extent || !extent.contains(cp)) continue;
                }
                if (geo._containsPoint(cp, tolerance) && (!filter || filter(geo))) {
                    hits.push(geo);
                    if (options['count']) {
                        if (hits.length >= options['count']) break;
                    }
                }
            }
        }
        return hits;
    };
    _proto.getAltitude = function() {
        return this.options['altitude'] || 0;
    };
    _proto.toJSON = function(options) {
        if (!options) options = {};
        var profile = {
            type: this.getJSONType(),
            id: this.getId(),
            options: this.config()
        };
        if (isNil(options['geometries']) || options['geometries']) {
            var clipExtent;
            if (options['clipExtent']) {
                var map = this.getMap();
                var projection = map ? map.getProjection() : null;
                clipExtent = new maptalks_es_Extent(options['clipExtent'], projection);
            }
            var geoJSONs = [];
            var geometries = this.getGeometries();
            for(var i = 0, len = geometries.length; i < len; i++){
                var geo = geometries[i];
                var geoExt = geo.getExtent();
                if (!!geoExt && (!clipExtent || !!clipExtent.intersects(geoExt))) {
                    var json = geo.toJSON(options['geometries']);
                    geoJSONs.push(json);
                }
            }
            profile['geometries'] = geoJSONs;
        }
        return profile;
    };
    VectorLayer.fromJSON = function(json) {
        if (!json || 'VectorLayer' !== json['type']) return null;
        var layer = new VectorLayer(json['id'], json['options']);
        var geoJSONs = json['geometries'];
        var geometries = [];
        for(var i = 0; i < geoJSONs.length; i++){
            var geo = maptalks_es_Geometry.fromJSON(geoJSONs[i]);
            if (geo) geometries.push(geo);
        }
        layer.addGeometry(geometries);
        return layer;
    };
    VectorLayer.getPainterClass = function() {
        return maptalks_es_Painter;
    };
    VectorLayer.getCollectionPainterClass = function() {
        return maptalks_es_CollectionPainter;
    };
    return VectorLayer;
}(maptalks_es_OverlayLayer);
maptalks_es_VectorLayer.mergeOptions(options$f);
maptalks_es_VectorLayer.registerJSONType('VectorLayer');
var maptalks_es_key = '_map_tool';
var maptalks_es_MapTool = function(_Eventable) {
    _inheritsLoose(MapTool, _Eventable);
    function MapTool() {
        return _Eventable.apply(this, arguments) || this;
    }
    var _proto = MapTool.prototype;
    _proto.addTo = function(map) {
        if (!map) return this;
        this._map = map;
        if (map[maptalks_es_key]) map[maptalks_es_key].disable();
        if (this.onAdd) this.onAdd();
        this.enable();
        map[maptalks_es_key] = this;
        this._fireEvent('add');
        return this;
    };
    _proto.getMap = function() {
        return this._map;
    };
    _proto.enable = function() {
        var map = this._map;
        if (!map || this._enabled) return this;
        this._enabled = true;
        this._switchEvents('off');
        this._registerEvents();
        if (this.onEnable) this.onEnable();
        this._fireEvent('enable');
        return this;
    };
    _proto.disable = function() {
        if (!this._enabled || !this._map) return this;
        this._enabled = false;
        this._switchEvents('off');
        if (this.onDisable) this.onDisable();
        this._fireEvent('disable');
        return this;
    };
    _proto.isEnabled = function() {
        if (!this._enabled) return false;
        return true;
    };
    _proto.remove = function() {
        if (!this._map) return this;
        this.disable();
        if (this._map) {
            delete this._map[maptalks_es_key];
            delete this._map;
        }
        this._fireEvent('remove');
        return this;
    };
    _proto._registerEvents = function() {
        this._switchEvents('on');
    };
    _proto._switchEvents = function(to) {
        var events = this.getEvents();
        if (events) this._map[to](events, this);
    };
    _proto._fireEvent = function(eventName, param) {
        if (!param) param = {};
        this.fire(eventName, param);
    };
    return MapTool;
}(maptalks_es_Eventable(maptalks_es_Class));
var options$g = {
    symbol: {
        lineColor: '#000',
        lineWidth: 2,
        lineOpacity: 1,
        polygonFill: '#fff',
        polygonOpacity: 0.3
    },
    doubleClickZoom: false,
    mode: null,
    once: false,
    autoPanAtEdge: false,
    ignoreMouseleave: true
};
var registeredMode = {};
var maptalks_es_DrawTool = function(_MapTool) {
    _inheritsLoose(DrawTool, _MapTool);
    DrawTool.registerMode = function(name, modeAction) {
        registeredMode[name.toLowerCase()] = modeAction;
    };
    DrawTool.getRegisterMode = function(name) {
        return registeredMode[name.toLowerCase()];
    };
    function DrawTool(options) {
        var _this;
        _this = _MapTool.call(this, options) || this;
        _this._checkMode();
        _this._events = {
            click: _this._clickHandler,
            mousemove: _this._mouseMoveHandler,
            dblclick: _this._doubleClickHandler,
            mousedown: _this._mouseDownHandler,
            mouseup: _this._mouseUpHandler
        };
        return _this;
    }
    var _proto = DrawTool.prototype;
    _proto.getMode = function() {
        if (this.options['mode']) return this.options['mode'].toLowerCase();
        return null;
    };
    _proto.setMode = function(mode) {
        if (this._geometry) {
            this._geometry.remove();
            delete this._geometry;
        }
        this._clearStage();
        this._switchEvents('off');
        this.options['mode'] = mode;
        this._checkMode();
        if (this.isEnabled()) {
            this._switchEvents('on');
            this._restoreMapCfg();
            this._saveMapCfg();
        }
        return this;
    };
    _proto.getSymbol = function() {
        var symbol = this.options['symbol'];
        if (symbol) return extendSymbol(symbol);
        return extendSymbol(this.options['symbol']);
    };
    _proto.setSymbol = function(symbol) {
        if (!symbol) return this;
        this.options['symbol'] = symbol;
        if (this._geometry) this._geometry.setSymbol(symbol);
        return this;
    };
    _proto.getCurrentGeometry = function() {
        return this._geometry;
    };
    _proto.onAdd = function() {
        this._checkMode();
    };
    _proto.onEnable = function() {
        this._saveMapCfg();
        this._drawToolLayer = this._getDrawLayer();
        this._clearStage();
        this._loadResources();
        if (this.options['autoPanAtEdge']) {
            var map = this.getMap();
            this._mapAutoPanAtEdge = map.options['autoPanAtEdge'];
            if (!this._mapAutoPanAtEdge) map.config({
                autoPanAtEdge: true
            });
        }
        return this;
    };
    _proto.onDisable = function() {
        var map = this.getMap();
        this._restoreMapCfg();
        this.endDraw();
        if (this._map) {
            map.removeLayer(this._getDrawLayer());
            if (this.options['autoPanAtEdge']) {
                if (!this._mapAutoPanAtEdge) map.config({
                    autoPanAtEdge: false
                });
            }
        }
        return this;
    };
    _proto.undo = function() {
        var registerMode = this._getRegisterMode();
        var action = registerMode.action;
        if (!this._shouldRecordHistory(action) || !this._historyPointer) return this;
        var coords = this._clickCoords.slice(0, --this._historyPointer);
        registerMode.update(this.getMap().getProjection(), coords, this._geometry);
        return this;
    };
    _proto.redo = function() {
        var registerMode = this._getRegisterMode();
        var action = registerMode.action;
        if (!this._shouldRecordHistory(action) || isNil(this._historyPointer) || this._historyPointer === this._clickCoords.length) return this;
        var coords = this._clickCoords.slice(0, ++this._historyPointer);
        registerMode.update(this.getMap().getProjection(), coords, this._geometry);
        return this;
    };
    _proto._shouldRecordHistory = function(actions) {
        return Array.isArray(actions) && 'click' === actions[0] && 'mousemove' === actions[1] && 'dblclick' === actions[2];
    };
    _proto._checkMode = function() {
        this._getRegisterMode();
    };
    _proto._saveMapCfg = function() {
        var map = this.getMap();
        this._mapDoubleClickZoom = map.options['doubleClickZoom'];
        map.config({
            doubleClickZoom: this.options['doubleClickZoom']
        });
        var actions = this._getRegisterMode()['action'];
        if (actions.indexOf('mousedown') > -1) {
            var _map = this.getMap();
            this._mapDraggable = _map.options['draggable'];
            _map.config({
                draggable: false
            });
        }
    };
    _proto._restoreMapCfg = function() {
        var map = this.getMap();
        map.config({
            doubleClickZoom: this._mapDoubleClickZoom
        });
        if (!isNil(this._mapDraggable)) map.config('draggable', this._mapDraggable);
        delete this._mapDraggable;
        delete this._mapDoubleClickZoom;
    };
    _proto._loadResources = function() {
        var symbol = this.getSymbol();
        var resources = getExternalResources(symbol);
        if (resources.length > 0) this._drawToolLayer._getRenderer().loadResources(resources);
    };
    _proto._getProjection = function() {
        return this._map.getProjection();
    };
    _proto._getRegisterMode = function() {
        var mode = this.getMode();
        var registerMode = DrawTool.getRegisterMode(mode);
        if (!registerMode) throw new Error(mode + ' is not a valid mode of DrawTool.');
        return registerMode;
    };
    _proto.getEvents = function() {
        var action = this._getRegisterMode()['action'];
        var _events = {};
        if (Array.isArray(action)) {
            for(var i = 0; i < action.length; i++)_events[action[i]] = this._events[action[i]];
            return _events;
        }
        return null;
    };
    _proto._mouseDownHandler = function(event) {
        this._createGeometry(event);
    };
    _proto._mouseUpHandler = function(event) {
        this.endDraw(event);
    };
    _proto._clickHandler = function(event) {
        var registerMode = this._getRegisterMode();
        if (this._geometry) {
            var prjCoord = this.getMap()._pointToPrj(event['point2d']);
            if (!isNil(this._historyPointer)) this._clickCoords = this._clickCoords.slice(0, this._historyPointer);
            this._clickCoords.push(prjCoord);
            this._historyPointer = this._clickCoords.length;
            event.drawTool = this;
            registerMode['update'](this.getMap().getProjection(), this._clickCoords, this._geometry, event);
            this._fireEvent('drawvertex', event);
            if (registerMode['clickLimit'] && registerMode['clickLimit'] === this._historyPointer) this.endDraw(event);
        } else this._createGeometry(event);
    };
    _proto._createGeometry = function(event) {
        var mode = this.getMode();
        var registerMode = this._getRegisterMode();
        var prjCoord = this.getMap()._pointToPrj(event['point2d']);
        var symbol = this.getSymbol();
        if (!this._geometry) {
            this._clickCoords = [
                prjCoord
            ];
            event.drawTool = this;
            this._geometry = registerMode['create'](this.getMap().getProjection(), this._clickCoords, event);
            if (symbol && 'point' !== mode) this._geometry.setSymbol(symbol);
            else if (this.options.hasOwnProperty('symbol')) this._geometry.setSymbol(this.options['symbol']);
            this._addGeometryToStage(this._geometry);
            this._fireEvent('drawstart', event);
        }
        if ('point' === mode) this.endDraw(event);
    };
    _proto._mouseMoveHandler = function(event) {
        var map = this.getMap();
        if (!this._geometry || !map || map.isInteracting()) return;
        var containerPoint = this._getMouseContainerPoint(event);
        if (!this._isValidContainerPoint(containerPoint)) return;
        var prjCoord = this.getMap()._pointToPrj(event['point2d']);
        var projection = map.getProjection();
        event.drawTool = this;
        var registerMode = this._getRegisterMode();
        if (this._shouldRecordHistory(registerMode.action)) {
            var path = this._clickCoords.slice(0, this._historyPointer);
            if (path && path.length > 0 && prjCoord.equals(path[path.length - 1])) return;
            registerMode['update'](projection, path.concat([
                prjCoord
            ]), this._geometry, event);
        } else registerMode['update'](projection, prjCoord, this._geometry, event);
        this._fireEvent('mousemove', event);
    };
    _proto._doubleClickHandler = function(event) {
        if (!this._geometry) return;
        var containerPoint = this._getMouseContainerPoint(event);
        if (!this._isValidContainerPoint(containerPoint)) return;
        var registerMode = this._getRegisterMode();
        var clickCoords = this._clickCoords;
        if (clickCoords.length < 2) return;
        var projection = this.getMap().getProjection();
        var path = [
            clickCoords[0]
        ];
        for(var i = 1, len = clickCoords.length; i < len; i++)if (clickCoords[i].x !== clickCoords[i - 1].x || clickCoords[i].y !== clickCoords[i - 1].y) path.push(clickCoords[i]);
        if (path.length < 2 || this._geometry && this._geometry instanceof maptalks_es_Polygon && path.length < 3) return;
        event.drawTool = this;
        registerMode['update'](projection, path, this._geometry, event);
        this.endDraw(event);
    };
    _proto._addGeometryToStage = function(geometry) {
        var drawLayer = this._getDrawLayer();
        drawLayer.addGeometry(geometry);
    };
    _proto.endDraw = function(param) {
        if (!this._geometry || this._ending) return this;
        this._ending = true;
        var geometry = this._geometry;
        this._clearStage();
        param = param || {};
        this._geometry = geometry;
        this._fireEvent('drawend', param);
        delete this._geometry;
        if (this.options['once']) this.disable();
        delete this._ending;
        delete this._historyPointer;
        return this;
    };
    _proto._clearStage = function() {
        this._getDrawLayer().clear();
        delete this._geometry;
        delete this._clickCoords;
    };
    _proto._getMouseContainerPoint = function(event) {
        var action = this._getRegisterMode()['action'];
        if ('mousedown' === action) stopPropagation(event['domEvent']);
        return event['containerPoint'];
    };
    _proto._isValidContainerPoint = function(containerPoint) {
        var mapSize = this._map.getSize();
        var w = mapSize['width'], h = mapSize['height'];
        if (containerPoint.x < 0 || containerPoint.y < 0) return false;
        if (containerPoint.x > w || containerPoint.y > h) return false;
        return true;
    };
    _proto._getDrawLayer = function() {
        var drawLayerId = INTERNAL_LAYER_PREFIX + 'drawtool';
        var drawToolLayer = this._map.getLayer(drawLayerId);
        if (!drawToolLayer) {
            drawToolLayer = new maptalks_es_VectorLayer(drawLayerId, {
                enableSimplify: false
            });
            this._map.addLayer(drawToolLayer);
        }
        return drawToolLayer;
    };
    _proto._fireEvent = function(eventName, param) {
        if (!param) param = {};
        if (this._geometry) param['geometry'] = this._getRegisterMode()['generate'](this._geometry, {
            drawTool: this
        });
        maptalks_es_MapTool.prototype._fireEvent.call(this, eventName, param);
    };
    return DrawTool;
}(maptalks_es_MapTool);
maptalks_es_DrawTool.mergeOptions(options$g);
var maptalks_es_MapBoxZoomHander = function(_Handler) {
    _inheritsLoose(MapBoxZoomHander, _Handler);
    function MapBoxZoomHander(target) {
        var _this;
        _this = _Handler.call(this, target) || this;
        _this.drawTool = new maptalks_es_DrawTool({
            mode: 'boxZoom',
            ignoreMouseleave: false
        });
        return _this;
    }
    var _proto = MapBoxZoomHander.prototype;
    _proto.addHooks = function() {
        this.target.on('_mousedown', this._onMouseDown, this);
    };
    _proto.removeHooks = function() {
        this.target.off('_mousedown', this._onMouseDown, this);
        if (this.drawTool.isEnabled()) this.drawTool.remove();
    };
    _proto._onMouseDown = function(param) {
        if (!this.target.options['boxZoom']) return;
        if (param.domEvent.shiftKey) this.drawTool.setSymbol(this.target.options['boxZoomSymbol']).on('drawend', this._boxZoom, this).addTo(this.target);
    };
    _proto._boxZoom = function(param) {
        var map = this.target;
        this.drawTool.remove();
        var geometry = param.geometry, center = geometry.getCenter(), symbol = geometry.getSymbol(), w = symbol.markerWidth, h = symbol.markerHeight;
        var extent = new maptalks_es_Extent(center, map.locateByPoint(center, w, h), map.getProjection());
        var zoom = map.getFitZoom(extent);
        map._animateTo({
            center: extent.getCenter(),
            zoom: zoom
        });
    };
    return MapBoxZoomHander;
}(Handler$1);
Map$1.mergeOptions({
    boxZoom: true,
    boxZoomSymbol: {
        markerType: 'rectangle',
        markerLineWidth: 3,
        markerLineColor: '#1bbc9b',
        markerLineDasharray: [
            10,
            5
        ],
        markerFillOpacity: 0.1,
        markerFill: '#1bbc9b',
        markerWidth: 1,
        markerHeight: 1
    }
});
Map$1.addOnLoadHook('addHandler', 'boxZoom', maptalks_es_MapBoxZoomHander);
var PANOFFSET = 30;
var maptalks_es_MapAutoPanAtEdgeHandler = function(_Handler) {
    _inheritsLoose(MapAutoPanAtEdgeHandler, _Handler);
    function MapAutoPanAtEdgeHandler() {
        return _Handler.apply(this, arguments) || this;
    }
    var _proto = MapAutoPanAtEdgeHandler.prototype;
    _proto.addHooks = function() {
        if (!this.target) return;
        this.target.on('_mousemove', this._onMouseMove, this);
    };
    _proto.removeHooks = function() {
        if (!this.target) return;
        this.target.off('_mousemove', this._onMouseMove, this);
    };
    _proto._onMouseMove = function(event) {
        var map = this.target;
        if (map.options['autoPanAtEdge']) {
            var containerPoint = event.containerPoint;
            var containerExtent = map.getContainerExtent();
            if (containerExtent) {
                var x = containerPoint.x, y = containerPoint.y;
                var xmax = containerExtent.xmax, ymax = containerExtent.ymax;
                var p;
                if (x < PANOFFSET) p = [
                    Math.abs(x - PANOFFSET),
                    0
                ];
                if (y < PANOFFSET) p = [
                    0,
                    Math.abs(y - PANOFFSET)
                ];
                if (x + PANOFFSET > xmax) p = [
                    -Math.abs(x + PANOFFSET - xmax),
                    0
                ];
                if (y + PANOFFSET > ymax) p = [
                    0,
                    -Math.abs(y + PANOFFSET - ymax)
                ];
                if (p) map.panBy(p, {
                    duration: 1
                });
            }
        }
    };
    return MapAutoPanAtEdgeHandler;
}(Handler$1);
Map$1.mergeOptions({
    autoPanAtEdge: false
});
Map$1.addOnLoadHook('addHandler', 'autoPanAtEdge', maptalks_es_MapAutoPanAtEdgeHandler);
Map$1.include({
    animateTo: function(view, options, step) {
        var _this = this;
        if (void 0 === options) options = {};
        if (isFunction(options)) {
            step = options;
            options = {};
        }
        var projection = this.getProjection(), currView = this.getView(), props = {};
        var empty = true;
        for(var p in view)if (hasOwn(view, p) && !isNil(view[p]) && ('prjCenter' === p || !isNil(currView[p]))) {
            empty = false;
            if ('center' === p) {
                var from = new maptalks_es_Coordinate(currView[p]).toFixed(7), to = new maptalks_es_Coordinate(view[p]).toFixed(7);
                if (!from.equals(to)) props['center'] = [
                    from,
                    to
                ];
            } else if ('prjCenter' === p) {
                var _from = new maptalks_es_Coordinate(this._getPrjCenter());
                var _to = new maptalks_es_Coordinate(view[p]);
                if (!_from.equals(_to)) props['prjCenter'] = [
                    _from,
                    _to
                ];
            } else if (currView[p] !== view[p] && 'around' !== p) props[p] = [
                currView[p],
                view[p]
            ];
        }
        if (empty) return null;
        if (this._animPlayer) {
            if (this._isInternalAnimation) {
                if ('running' === this._animPlayer.playState) {
                    this._animPlayer.pause();
                    this._prevAnimPlayer = this._animPlayer;
                }
            } else {
                delete this._prevAnimPlayer;
                this._stopAnim(this._animPlayer);
            }
        }
        var zoomOrigin = view['around'] || new maptalks_es_Point(this.width / 2, this.height / 2);
        var renderer = this._getRenderer(), framer = function(fn) {
            renderer.callInNextFrame(fn);
        };
        var player = this._animPlayer = Animation.animate(props, {
            easing: options['easing'] || 'out',
            duration: options['duration'] || this.options['zoomAnimationDuration'],
            framer: framer
        }, function(frame) {
            if (_this.isRemoved()) {
                player.finish();
                return;
            }
            if ('running' === player.playState) {
                if (frame.styles['center']) {
                    var center = frame.styles['center'];
                    _this._setPrjCenter(projection.project(center));
                    _this.onMoving(_this._parseEventFromCoord(_this.getCenter()));
                } else if (frame.styles['prjCenter']) {
                    var _center = frame.styles['prjCenter'];
                    _this._setPrjCenter(_center);
                    _this.onMoving(_this._parseEventFromCoord(_this.getCenter()));
                }
                if (!isNil(frame.styles['zoom'])) _this.onZooming(frame.styles['zoom'], zoomOrigin);
                if (!isNil(frame.styles['pitch'])) _this.setPitch(frame.styles['pitch']);
                if (!isNil(frame.styles['bearing'])) _this.setBearing(frame.styles['bearing']);
                _this._fireEvent('animating');
            } else if ('paused' !== player.playState || player === _this._mapAnimPlayer) {
                if (!player._interupted) {
                    if (props['center']) _this._setPrjCenter(projection.project(props['center'][1]));
                    else if (props['prjCenter']) _this._setPrjCenter(props['prjCenter'][1]);
                    if (!isNil(props['pitch'])) _this.setPitch(props['pitch'][1]);
                    if (!isNil(props['bearing'])) _this.setBearing(props['bearing'][1]);
                }
                _this._endAnim(player, props, zoomOrigin, options);
            }
            if (step) step(frame);
        }, this);
        this._startAnim(props, zoomOrigin);
        return player;
    },
    _animateTo: function(view, options, step) {
        if (void 0 === options) options = {};
        if (this._mapAnimPlayer) this._stopAnim(this._mapAnimPlayer);
        this._isInternalAnimation = true;
        this._mapAnimPlayer = this.animateTo(view, options, step);
        delete this._isInternalAnimation;
        return this._mapAnimPlayer;
    },
    isAnimating: function() {
        return !!this._animPlayer;
    },
    isRotating: function() {
        return this.isDragRotating() || !!this._animRotating;
    },
    _endAnim: function(player, props, zoomOrigin, options) {
        delete this._animRotating;
        var evtType = player._interupted ? 'animateinterrupted' : 'animateend';
        if (player === this._animPlayer) delete this._animPlayer;
        if (player === this._mapAnimPlayer) delete this._mapAnimPlayer;
        if (props['center']) {
            var endCoord;
            endCoord = player._interupted ? this.getCenter() : props['center'][1];
            this.onMoveEnd(this._parseEventFromCoord(endCoord));
        } else if (props['prjCenter']) {
            var _endCoord;
            _endCoord = player._interupted ? this._getPrjCenter() : props['prjCenter'][1];
            var event = this._parseEventFromCoord(this.getProjection().unproject(_endCoord));
            event['point2d'] = this._prjToPoint(_endCoord);
            this.onMoveEnd(event);
        }
        if (!isNil(props['zoom'])) {
            if (player._interupted) this.onZoomEnd(this.getZoom(), zoomOrigin);
            else if (options['wheelZoom']) this.onZooming(props['zoom'][1], zoomOrigin);
            else this.onZoomEnd(props['zoom'][1], zoomOrigin);
        }
        if (evtType) this._fireEvent(evtType);
        if (!isNil(props['pitch']) && !this.getPitch()) this.getRenderer().setToRedraw();
        this._resumePrev(player);
    },
    _startAnim: function(props, zoomOrigin) {
        if (!this._animPlayer) return;
        if (props['center']) this.onMoveStart();
        if (props['zoom'] && !this.isZooming()) this.onZoomStart(props['zoom'][1], zoomOrigin);
        if (props['pitch'] || props['bearing']) this._animRotating = true;
        this._fireEvent('animatestart');
        this._animPlayer.play();
    },
    _stopAnim: function(player) {
        if (!player) return;
        delete this._animRotating;
        if ('finished' !== player.playState) {
            player._interupted = true;
            player.cancel();
        }
        if (player === this._animPlayer) delete this._animPlayer;
        if (player === this._mapAnimPlayer) delete this._mapAnimPlayer;
    },
    _resumePrev: function(player) {
        if (!this._prevAnimPlayer) return;
        var prevPlayer = this._prevAnimPlayer;
        if ('paused' !== prevPlayer.playState) delete this._prevAnimPlayer;
        if (player !== prevPlayer) {
            this._animPlayer = prevPlayer;
            prevPlayer.play();
        }
    }
});
var maptalks_es_events = "mousedown mouseup mouseover mouseout mouseenter mouseleave mousemove click dblclick contextmenu keypress touchstart touchmove touchend ";
Map$1.include({
    _registerDomEvents: function() {
        var dom = this._panels.mapWrapper || this._containerDOM;
        addDomEvent(dom, maptalks_es_events, this._handleDOMEvent, this);
    },
    _removeDomEvents: function() {
        var dom = this._panels.mapWrapper || this._containerDOM;
        removeDomEvent(dom, maptalks_es_events, this._handleDOMEvent, this);
    },
    _handleDOMEvent: function(e) {
        var type = e.type;
        if ('contextmenu' === type) preventDefault(e);
        if (this._ignoreEvent(e)) return;
        var mimicClick = false;
        if ('mousedown' === type || 'touchstart' === type && 1 === e.touches.length) this._mouseDownTime = now();
        else if ('click' === type || 'touchend' === type || 'contextmenu' === type) {
            if (!this._mouseDownTime) return;
            var downTime = this._mouseDownTime;
            delete this._mouseDownTime;
            var time = now();
            if (time - downTime > 300) {
                if ('click' === type || 'contextmenu' === type) return;
            } else if ('touchend' === type) mimicClick = true;
        }
        this._fireDOMEvent(this, e, type);
        if (mimicClick) {
            if (this._clickTime && now() - this._clickTime <= 300) {
                delete this._clickTime;
                this._fireDOMEvent(this, e, 'dblclick');
            } else {
                this._clickTime = now();
                this._fireDOMEvent(this, e, 'click');
            }
        }
    },
    _ignoreEvent: function(domEvent) {
        if (!domEvent || !this._panels.control) return false;
        if (this._isEventOutMap(domEvent)) return true;
        var target = domEvent.srcElement || domEvent.target;
        var preTarget;
        if (target) while(target && target !== this._containerDOM){
            if (target.className && target.className.indexOf && (target.className.indexOf('maptalks-control') >= 0 || target.className.indexOf('maptalks-ui') >= 0 && !preTarget['eventsPropagation'])) return true;
            preTarget = target;
            target = target.parentNode;
        }
        return false;
    },
    _isEventOutMap: function(domEvent) {
        if (this.getPitch() > this.options['maxVisualPitch']) {
            var actualEvent = this._getActualEvent(domEvent);
            var eventPos = getEventContainerPoint(actualEvent, this._containerDOM);
            if (!this.getContainerExtent().contains(eventPos)) return true;
        }
        return false;
    },
    _parseEvent: function(e, type) {
        if (!e) return null;
        var eventParam = {
            domEvent: e
        };
        if ('keypress' !== type) {
            var actual = this._getActualEvent(e);
            if (actual) {
                var containerPoint = getEventContainerPoint(actual, this._containerDOM);
                eventParam = extend(eventParam, {
                    coordinate: this.containerPointToCoord(containerPoint),
                    containerPoint: containerPoint,
                    viewPoint: this.containerPointToViewPoint(containerPoint),
                    point2d: this._containerPointToPoint(containerPoint)
                });
            }
        }
        return eventParam;
    },
    _parseEventFromCoord: function(coord) {
        var containerPoint = this.coordToContainerPoint(coord), viewPoint = this.containerPointToViewPoint(containerPoint);
        var e = {
            coordinate: coord,
            containerPoint: containerPoint,
            viewPoint: viewPoint,
            point2d: this.coordToPoint(coord)
        };
        return e;
    },
    _getActualEvent: function(e) {
        return e.touches && e.touches.length > 0 ? e.touches[0] : e.changedTouches && e.changedTouches.length > 0 ? e.changedTouches[0] : e;
    },
    _fireDOMEvent: function(target, e, type) {
        if (this.isRemoved()) return;
        var eventParam = this._parseEvent(e, type);
        this._fireEvent(type, eventParam);
    }
});
Map$1.addOnLoadHook('_registerDomEvents');
Map$1.include({
    isFullScreen: function() {
        return !!(document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement);
    },
    requestFullScreen: function(dom) {
        this._fireEvent('fullscreenstart');
        this._requestFullScreen(dom || this._containerDOM);
        this._fireEvent('fullscreenend');
        return this;
    },
    cancelFullScreen: function() {
        this._cancelFullScreen();
        this._fireEvent('cancelfullscreen');
        return this;
    },
    _requestFullScreen: function(dom) {
        if (dom.requestFullscreen) dom.requestFullscreen();
        else if (dom.mozRequestFullScreen) dom.mozRequestFullScreen();
        else if (dom.webkitRequestFullScreen) dom.webkitRequestFullScreen();
        else if (dom.msRequestFullScreen) dom.msRequestFullScreen();
        else {
            var features = "fullscreen=1,status=no,resizable=yes,top=0,left=0,scrollbars=no,titlebar=no,menubar=no,location=no,toolbar=no,z-look=yes,width=" + (screen.availWidth - 8) + ',height=' + (screen.availHeight - 45);
            var newWin = window.open(location.href, '_blank', features);
            if (null !== newWin) {
                window.opener = null;
                window.close();
            }
        }
    },
    _cancelFullScreen: function() {
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
        else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
        else {
            var features = "fullscreen=no,status=yes,resizable=yes,scrollbars=no,titlebar=no,menubar=yes,location=yes,toolbar=yes,z-look=yes";
            var newWin = window.open(location.href, '_blank', features);
            if (null !== newWin) {
                window.opener = null;
                window.close();
            }
        }
    }
});
Map$1.include({
    panTo: function(coordinate, options, step) {
        if (void 0 === options) options = {};
        if (!coordinate) return this;
        if (isFunction(options)) {
            step = options;
            options = {};
        }
        coordinate = new maptalks_es_Coordinate(coordinate);
        if (void 0 === options['animation'] || options['animation']) {
            var prjCoord = this.getProjection().project(coordinate);
            return this._panAnimation(prjCoord, options['duration'], step);
        }
        this.setCenter(coordinate);
        return this;
    },
    _panTo: function(prjCoord, options) {
        if (void 0 === options) options = {};
        if (void 0 === options['animation'] || options['animation']) return this._panAnimation(prjCoord, options['duration']);
        this.onMoveStart();
        this._setPrjCenter(prjCoord);
        this.onMoveEnd(this._parseEventFromCoord(this.getCenter()));
        return this;
    },
    panBy: function(offset, options, step) {
        if (void 0 === options) options = {};
        if (!offset) return this;
        if (isFunction(options)) {
            step = options;
            options = {};
        }
        offset = new maptalks_es_Point(offset);
        var containerExtent = this.getContainerExtent();
        var ymin = containerExtent.ymin;
        if (ymin > 0 && offset.y > 30) {
            var y = offset.y;
            offset.y = 30;
            offset.x = 30 * offset.x / y;
            console.warn('offset is limited to panBy when pitch is above maxPitch');
        }
        this.onMoveStart();
        if (void 0 === options['animation'] || options['animation']) {
            offset = offset.multi(-1);
            var target = this._containerPointToPrj(new maptalks_es_Point(this.width / 2 + offset.x, this.height / 2 + offset.y));
            this._panAnimation(target, options['duration'], step);
        } else {
            this._offsetCenterByPixel(offset);
            this.onMoveEnd(this._parseEventFromCoord(this.getCenter()));
        }
        return this;
    },
    _panAnimation: function(target, t, cb) {
        return this._animateTo({
            prjCenter: target
        }, {
            duration: t || this.options['panAnimationDuration']
        }, cb);
    }
});
maptalks_es_Geometry.fromJSON = function(json) {
    if (Array.isArray(json)) {
        var result = [];
        for(var i = 0, len = json.length; i < len; i++){
            var c = maptalks_es_Geometry.fromJSON(json[i]);
            if (Array.isArray(json)) result = result.concat(c);
            else result.push(c);
        }
        return result;
    }
    if (json && !json['feature']) return GeoJSON.toGeometry(json);
    var geometry;
    if (json['subType']) {
        geometry = maptalks_es_Geometry.getJSONClass(json['subType']).fromJSON(json);
        if (!isNil(json['feature']['id'])) geometry.setId(json['feature']['id']);
    } else {
        geometry = GeoJSON.toGeometry(json['feature']);
        if (json['options']) geometry.config(json['options']);
    }
    if (json['symbol']) geometry.setSymbol(json['symbol']);
    if (json['infoWindow']) geometry.setInfoWindow(json['infoWindow']);
    return geometry;
};
maptalks_es_Layer.fromJSON = function(layerJSON) {
    if (!layerJSON) return null;
    var layerType = layerJSON['type'];
    var clazz = maptalks_es_Layer.getJSONClass(layerType);
    if (!clazz || !clazz.fromJSON) throw new Error('unsupported layer type:' + layerType);
    return clazz.fromJSON(layerJSON);
};
Map$1.include({
    JSON_VERSION: '1.0',
    toJSON: function(options) {
        if (!options) options = {};
        var json = {
            jsonVersion: this['JSON_VERSION'],
            version: this.VERSION,
            extent: this.getExtent().toJSON()
        };
        json['options'] = this.config();
        json['options']['center'] = this.getCenter();
        json['options']['zoom'] = this.getZoom();
        json['options']['bearing'] = this.getBearing();
        json['options']['pitch'] = this.getPitch();
        var baseLayer = this.getBaseLayer();
        if ((isNil(options['baseLayer']) || options['baseLayer']) && baseLayer) json['baseLayer'] = baseLayer.toJSON(options['baseLayer']);
        var extraLayerOptions = {};
        if (options['clipExtent']) {
            if (true === options['clipExtent']) extraLayerOptions['clipExtent'] = this.getExtent();
            else extraLayerOptions['clipExtent'] = options['clipExtent'];
        }
        var layersJSON = [];
        if (isNil(options['layers']) || options['layers'] && !Array.isArray(options['layers'])) {
            var layers = this.getLayers();
            for(var i = 0, len = layers.length; i < len; i++){
                if (!!layers[i].toJSON) {
                    var opts = extend({}, isObject(options['layers']) ? options['layers'] : {}, extraLayerOptions);
                    layersJSON.push(layers[i].toJSON(opts));
                }
            }
            json['layers'] = layersJSON;
        } else if (isArrayHasData(options['layers'])) {
            var _layers = options['layers'];
            for(var _i = 0; _i < _layers.length; _i++){
                var exportOption = _layers[_i];
                var layer = this.getLayer(exportOption['id']);
                if (!!layer.toJSON) {
                    var _opts = extend({}, exportOption['options'], extraLayerOptions);
                    layersJSON.push(layer.toJSON(_opts));
                }
            }
            json['layers'] = layersJSON;
        } else json['layers'] = [];
        return json;
    }
});
Map$1.fromJSON = function(container, profile, options) {
    if (!container || !profile) return null;
    if (!options) options = {};
    var map = new Map$1(container, profile['options']);
    if (isNil(options['baseLayer']) || options['baseLayer']) {
        var baseLayer = maptalks_es_Layer.fromJSON(profile['baseLayer']);
        if (baseLayer) map.setBaseLayer(baseLayer);
    }
    if (isNil(options['layers']) || options['layers']) {
        var layers = [];
        var layerJSONs = profile['layers'];
        for(var i = 0; i < layerJSONs.length; i++){
            var layer = maptalks_es_Layer.fromJSON(layerJSONs[i]);
            layers.push(layer);
        }
        map.addLayer(layers);
    }
    return map;
};
Map$1.include({
    computeLength: function(coord1, coord2) {
        if (!this.getProjection()) return null;
        var p1 = new maptalks_es_Coordinate(coord1), p2 = new maptalks_es_Coordinate(coord2);
        if (p1.equals(p2)) return 0;
        return this.getProjection().measureLength(p1, p2);
    },
    computeGeometryLength: function(geometry) {
        return geometry._computeGeodesicLength(this.getProjection());
    },
    computeGeometryArea: function(geometry) {
        return geometry._computeGeodesicArea(this.getProjection());
    },
    identify: function(opts, callback) {
        if (!opts) return this;
        var reqLayers = opts['layers'];
        if (!isArrayHasData(reqLayers)) return this;
        var layers = [];
        for(var i = 0, len = reqLayers.length; i < len; i++)if (isString(reqLayers[i])) layers.push(this.getLayer(reqLayers[i]));
        else layers.push(reqLayers[i]);
        var coordinate = new maptalks_es_Coordinate(opts['coordinate']);
        var options = extend({}, opts);
        var hits = [];
        for(var _i = layers.length - 1; _i >= 0; _i--){
            if (opts['count'] && hits.length >= opts['count']) break;
            var layer = layers[_i];
            if (!(!layer || !layer.getMap() || !opts['includeInvisible'] && !layer.isVisible() || !opts['includeInternals'] && layer.getId().indexOf(INTERNAL_LAYER_PREFIX) >= 0)) {
                var layerHits = layer.identify(coordinate, options);
                if (layerHits) {
                    if (Array.isArray(layerHits)) pushIn(hits, layerHits);
                    else hits.push(layerHits);
                }
            }
        }
        callback.call(this, hits);
        return this;
    }
});
Map$1.include({
    _zoom: function(nextZoom, origin) {
        if (!this.options['zoomable'] || this.isZooming()) return;
        origin = this._checkZoomOrigin(origin);
        nextZoom = this._checkZoom(nextZoom);
        this.onZoomStart(nextZoom, origin);
        this._frameZoom = this.getZoom();
        this.onZoomEnd(nextZoom, origin);
    },
    _zoomAnimation: function(nextZoom, origin, startScale) {
        if (!this.options['zoomable'] || this.isZooming()) return;
        nextZoom = this._checkZoom(nextZoom);
        if (this.getZoom() === nextZoom) return;
        origin = this._checkZoomOrigin(origin);
        this._startZoomAnim(nextZoom, origin, startScale);
    },
    _checkZoomOrigin: function(origin) {
        if (!origin || this.options['zoomInCenter']) origin = new maptalks_es_Point(this.width / 2, this.height / 2);
        if (this.options['zoomOrigin']) origin = new maptalks_es_Point(this.options['zoomOrigin']);
        return origin;
    },
    _startZoomAnim: function(nextZoom, origin, startScale) {
        if (isNil(startScale)) startScale = 1;
        var endScale = this._getResolution(this._startZoomVal) / this._getResolution(nextZoom);
        var duration = this.options['zoomAnimationDuration'] * Math.abs(endScale - startScale) / Math.abs(endScale - 1);
        this._frameZoom = this._startZoomVal;
        this._animateTo({
            zoom: nextZoom,
            around: origin
        }, {
            continueOnViewChanged: true,
            duration: duration
        });
    },
    onZoomStart: function(nextZoom, origin) {
        if (!this.options['zoomable'] || this.isZooming()) return;
        if (this._mapAnimPlayer) this._stopAnim(this._mapAnimPlayer);
        this._zooming = true;
        this._startZoomVal = this.getZoom();
        this._startZoomCoord = this._containerPointToPrj(origin);
        this._fireEvent('zoomstart', {
            from: this._startZoomVal,
            to: nextZoom
        });
    },
    onZooming: function(nextZoom, origin, startScale) {
        if (!this.options['zoomable']) return;
        var frameZoom = this._frameZoom;
        if (frameZoom === nextZoom) return;
        if (isNil(startScale)) startScale = 1;
        this._zoomTo(nextZoom, origin);
        var res = this.getResolution(nextZoom), fromRes = this.getResolution(this._startZoomVal), scale = fromRes / res / startScale, startPoint = this._prjToContainerPoint(this._startZoomCoord, this._startZoomVal);
        var offset = this.getViewPoint();
        if (!this.isRotating() && !startPoint.equals(origin) && 1 !== scale) {
            var pitch = this.getPitch();
            var originOffset = startPoint._sub(origin)._multi(1 / (1 - scale));
            if (pitch) originOffset.y /= Math.cos(pitch * Math.PI / 180);
            origin = origin.add(originOffset);
        }
        var matrix = {
            view: [
                scale,
                0,
                0,
                scale,
                (origin.x - offset.x) * (1 - scale),
                (origin.y - offset.y) * (1 - scale)
            ]
        };
        var dpr = this.getDevicePixelRatio();
        if (1 !== dpr) origin = origin.multi(dpr);
        matrix['container'] = [
            scale,
            0,
            0,
            scale,
            origin.x * (1 - scale),
            origin.y * (1 - scale)
        ];
        this._fireEvent('zooming', {
            from: this._startZoomVal,
            to: nextZoom,
            origin: origin,
            matrix: matrix
        });
        this._frameZoom = nextZoom;
    },
    onZoomEnd: function(nextZoom, origin) {
        if (!this.options['zoomable']) return;
        var startZoomVal = this._startZoomVal;
        this._zoomTo(nextZoom, origin);
        this._zooming = false;
        this._getRenderer().onZoomEnd();
        this._fireEvent('zoomend', {
            from: startZoomVal,
            to: nextZoom
        });
        if (!this._verifyExtent(this._getPrjCenter())) this._panTo(this._prjMaxExtent.getCenter());
    },
    _zoomTo: function(nextZoom, origin) {
        this._zoomLevel = nextZoom;
        this._calcMatrices();
        if (origin) this._setPrjCoordAtContainerPoint(this._startZoomCoord, origin);
    },
    _checkZoom: function(nextZoom) {
        var maxZoom = this.getMaxZoom(), minZoom = this.getMinZoom();
        if (nextZoom < minZoom) nextZoom = minZoom;
        if (nextZoom > maxZoom) nextZoom = maxZoom;
        return nextZoom;
    }
});
function perspective(out, fovy, aspect, near, far) {
    var f = 1.0 / Math.tan(fovy / 2), nf = 1 / (near - far);
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = 2 * far * near * nf;
    out[15] = 0;
    return out;
}
function maptalks_es_translate(out, a, v) {
    var x = v[0], y = v[1], z = v[2], a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23;
    if (a === out) {
        out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
        out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
        out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
        out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {
        a00 = a[0];
        a01 = a[1];
        a02 = a[2];
        a03 = a[3];
        a10 = a[4];
        a11 = a[5];
        a12 = a[6];
        a13 = a[7];
        a20 = a[8];
        a21 = a[9];
        a22 = a[10];
        a23 = a[11];
        out[0] = a00;
        out[1] = a01;
        out[2] = a02;
        out[3] = a03;
        out[4] = a10;
        out[5] = a11;
        out[6] = a12;
        out[7] = a13;
        out[8] = a20;
        out[9] = a21;
        out[10] = a22;
        out[11] = a23;
        out[12] = a00 * x + a10 * y + a20 * z + a[12];
        out[13] = a01 * x + a11 * y + a21 * z + a[13];
        out[14] = a02 * x + a12 * y + a22 * z + a[14];
        out[15] = a03 * x + a13 * y + a23 * z + a[15];
    }
    return out;
}
function maptalks_es_scale(out, a, v) {
    var x = v[0], y = v[1], z = v[2];
    out[0] = a[0] * x;
    out[1] = a[1] * x;
    out[2] = a[2] * x;
    out[3] = a[3] * x;
    out[4] = a[4] * y;
    out[5] = a[5] * y;
    out[6] = a[6] * y;
    out[7] = a[7] * y;
    out[8] = a[8] * z;
    out[9] = a[9] * z;
    out[10] = a[10] * z;
    out[11] = a[11] * z;
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
}
function rotateX(out, a, rad) {
    var s = Math.sin(rad), c = Math.cos(rad), a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7], a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
    if (a !== out) {
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        out[3] = a[3];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }
    out[4] = a10 * c + a20 * s;
    out[5] = a11 * c + a21 * s;
    out[6] = a12 * c + a22 * s;
    out[7] = a13 * c + a23 * s;
    out[8] = a20 * c - a10 * s;
    out[9] = a21 * c - a11 * s;
    out[10] = a22 * c - a12 * s;
    out[11] = a23 * c - a13 * s;
    return out;
}
function rotateZ(out, a, rad) {
    var s = Math.sin(rad), c = Math.cos(rad), a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3], a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
    if (a !== out) {
        out[8] = a[8];
        out[9] = a[9];
        out[10] = a[10];
        out[11] = a[11];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }
    out[0] = a00 * c + a10 * s;
    out[1] = a01 * c + a11 * s;
    out[2] = a02 * c + a12 * s;
    out[3] = a03 * c + a13 * s;
    out[4] = a10 * c - a00 * s;
    out[5] = a11 * c - a01 * s;
    out[6] = a12 * c - a02 * s;
    out[7] = a13 * c - a03 * s;
    return out;
}
function multiply(out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3], a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7], a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11], a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[4];
    b1 = b[5];
    b2 = b[6];
    b3 = b[7];
    out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[8];
    b1 = b[9];
    b2 = b[10];
    b3 = b[11];
    out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[12];
    b1 = b[13];
    b2 = b[14];
    b3 = b[15];
    out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    return out;
}
function invert(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3], a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7], a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11], a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15], b00 = a00 * a11 - a01 * a10, b01 = a00 * a12 - a02 * a10, b02 = a00 * a13 - a03 * a10, b03 = a01 * a12 - a02 * a11, b04 = a01 * a13 - a03 * a11, b05 = a02 * a13 - a03 * a12, b06 = a20 * a31 - a21 * a30, b07 = a20 * a32 - a22 * a30, b08 = a20 * a33 - a23 * a30, b09 = a21 * a32 - a22 * a31, b10 = a21 * a33 - a23 * a31, b11 = a22 * a33 - a23 * a32, det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
    if (!det) return null;
    det = 1.0 / det;
    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
    return out;
}
function identity(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
}
function maptalks_es_copy(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
}
function set$2(out, x, y, z) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
}
function maptalks_es_add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
}
function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
}
function maptalks_es_length(a) {
    var x = a[0], y = a[1], z = a[2];
    return Math.sqrt(x * x + y * y + z * z);
}
function normalize(out, a) {
    var x = a[0], y = a[1], z = a[2];
    var len = x * x + y * y + z * z;
    if (len > 0) {
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
        out[2] = a[2] * len;
    }
    return out;
}
function maptalks_es_dot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}
function scale$1(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    return out;
}
function maptalks_es_cross(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2], bx = b[0], by = b[1], bz = b[2];
    out[0] = ay * bz - az * by;
    out[1] = az * bx - ax * bz;
    out[2] = ax * by - ay * bx;
    return out;
}
function maptalks_es_distance(a, b) {
    var x = b[0] - a[0];
    var y = b[1] - a[1];
    var z = b[2] - a[2];
    return Math.hypot ? Math.hypot(x, y, z) : hypot(x, y, z);
}
function transformMat4(out, a, m) {
    var x = a[0], y = a[1], z = a[2];
    var w = m[3] * x + m[7] * y + m[11] * z + m[15];
    w = w || 1.0;
    out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
    out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
    out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
    return out;
}
function hypot() {
    var y = 0;
    var i = arguments.length;
    while(i--)y += arguments[i] * arguments[i];
    return Math.sqrt(y);
}
function applyMatrix(out, v, e) {
    var x = v[0], y = v[1], z = v[2];
    var w = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15]);
    out[0] = (e[0] * x + e[4] * y + e[8] * z + e[12]) * w;
    out[1] = (e[1] * x + e[5] * y + e[9] * z + e[13]) * w;
    out[2] = (e[2] * x + e[6] * y + e[10] * z + e[14]) * w;
    return out;
}
function matrixToQuaternion(out, te) {
    var m11 = te[0], m12 = te[4], m13 = te[8], m21 = te[1], m22 = te[5], m23 = te[9], m31 = te[2], m32 = te[6], m33 = te[10], trace = m11 + m22 + m33;
    var s;
    if (trace > 0) {
        s = 0.5 / Math.sqrt(trace + 1.0);
        out.w = 0.25 / s;
        out.x = (m32 - m23) * s;
        out.y = (m13 - m31) * s;
        out.z = (m21 - m12) * s;
    } else if (m11 > m22 && m11 > m33) {
        s = 2.0 * Math.sqrt(1.0 + m11 - m22 - m33);
        out.w = (m32 - m23) / s;
        out.x = 0.25 * s;
        out.y = (m12 + m21) / s;
        out.z = (m13 + m31) / s;
    } else if (m22 > m33) {
        s = 2.0 * Math.sqrt(1.0 + m22 - m11 - m33);
        out.w = (m13 - m31) / s;
        out.x = (m12 + m21) / s;
        out.y = 0.25 * s;
        out.z = (m23 + m32) / s;
    } else {
        s = 2.0 * Math.sqrt(1.0 + m33 - m11 - m22);
        out.w = (m21 - m12) / s;
        out.x = (m13 + m31) / s;
        out.y = (m23 + m32) / s;
        out.z = 0.25 * s;
    }
    return this;
}
function quaternionToMatrix(out, q) {
    var te = out;
    var x = q.x, y = q.y, z = q.z, w = q.w;
    var x2 = x + x, y2 = y + y, z2 = z + z;
    var xx = x * x2, xy = x * y2, xz = x * z2;
    var yy = y * y2, yz = y * z2, zz = z * z2;
    var wx = w * x2, wy = w * y2, wz = w * z2;
    te[0] = 1 - (yy + zz);
    te[4] = xy - wz;
    te[8] = xz + wy;
    te[1] = xy + wz;
    te[5] = 1 - (xx + zz);
    te[9] = yz - wx;
    te[2] = xz - wy;
    te[6] = yz + wx;
    te[10] = 1 - (xx + yy);
    te[3] = 0;
    te[7] = 0;
    te[11] = 0;
    te[12] = 0;
    te[13] = 0;
    te[14] = 0;
    te[15] = 1;
    return te;
}
function maptalks_es_setPosition(out, v) {
    var te = out;
    te[12] = v[0];
    te[13] = v[1];
    te[14] = v[2];
    return out;
}
function lookAt(te, eye, target, up) {
    var x = [
        0,
        0,
        0
    ];
    var y = [
        0,
        0,
        0
    ];
    var z = [
        0,
        0,
        0
    ];
    subtract(z, eye, target);
    if (0 === maptalks_es_length(z)) z[2] = 1;
    normalize(z, z);
    maptalks_es_cross(x, up, z);
    if (0 === maptalks_es_length(z)) {
        if (1 === Math.abs(up[2])) z[0] += 0.0001;
        else z[2] += 0.0001;
        normalize(z, z);
        maptalks_es_cross(x, up, z);
    }
    normalize(x, x);
    maptalks_es_cross(y, z, x);
    te[0] = x[0];
    te[4] = y[0];
    te[8] = z[0];
    te[1] = x[1];
    te[5] = y[1];
    te[9] = z[1];
    te[2] = x[2];
    te[6] = y[2];
    te[10] = z[2];
    return te;
}
var RADIAN$1 = Math.PI / 180;
var DEFAULT_FOV = 0.6435011087932844;
var TEMP_COORD = new maptalks_es_Coordinate(0, 0);
Map$1.include({
    getFov: function() {
        if (!this._fov) this._fov = DEFAULT_FOV;
        return this._fov / RADIAN$1;
    },
    setFov: function(fov) {
        if (this.isZooming()) return this;
        fov = Math.max(0.01, Math.min(60, fov));
        if (this._fov === fov) return this;
        var from = this.getFov();
        this._fov = fov * RADIAN$1;
        this._calcMatrices();
        this._renderLayers();
        this._fireEvent('fovchange', {
            from: from,
            to: this.getFov()
        });
        return this;
    },
    getBearing: function() {
        if (!this._angle) return 0;
        return -this._angle / RADIAN$1;
    },
    setBearing: function(bearing) {
        if (Browser$1.ie9) throw new Error('map can\'t rotate in IE9.');
        var b = -wrap(bearing, -180, 180) * RADIAN$1;
        if (this._angle === b) return this;
        var from = this.getBearing();
        this._fireEvent('rotatestart', {
            from: from,
            to: b
        });
        this._angle = b;
        this._calcMatrices();
        this._renderLayers();
        this._fireEvent('rotate', {
            from: from,
            to: b
        });
        this._fireEvent('rotateend', {
            from: from,
            to: b
        });
        return this;
    },
    getPitch: function() {
        if (!this._pitch) return 0;
        return this._pitch / Math.PI * 180;
    },
    setPitch: function(pitch) {
        if (Browser$1.ie9) throw new Error('map can\'t tilt in IE9.');
        var p = clamp(pitch, 0, this.options['maxPitch']) * RADIAN$1;
        if (this._pitch === p) return this;
        var from = this.getPitch();
        this._fireEvent('pitchstart', {
            from: from,
            to: p
        });
        this._pitch = p;
        this._calcMatrices();
        this._renderLayers();
        this._fireEvent('pitch', {
            from: from,
            to: p
        });
        this._fireEvent('pitchend', {
            from: from,
            to: p
        });
        return this;
    },
    isTransforming: function() {
        return !!(this._pitch || this._angle);
    },
    getFrustumAltitude: function() {
        return this._frustumAltitude;
    },
    _calcFrustumAltitude: function() {
        var pitch = 90 - this.getPitch();
        var fov = this.getFov() / 2;
        var cameraAlt = this.cameraPosition ? this.cameraPosition[2] : 0;
        if (fov <= pitch) return cameraAlt;
        fov = Math.PI * fov / 180;
        var d1 = new maptalks_es_Point(this.cameraPosition).distanceTo(new maptalks_es_Point(this.cameraLookAt)), d2 = cameraAlt * Math.tan(2 * fov);
        var d = Math.tan(fov) * (d1 + d2);
        return cameraAlt + d;
    },
    _pointToContainerPoint: function() {
        var a = [
            0,
            0,
            0
        ];
        return function(point, zoom, altitude, out) {
            if (void 0 === altitude) altitude = 0;
            point = this._pointToPoint(point, zoom, out);
            if (this.isTransforming() || altitude) {
                altitude *= this._getResolution(zoom) / this._getResolution();
                var _scale = this._glScale;
                set$2(a, point.x * _scale, point.y * _scale, altitude * _scale);
                var t = this._projIfBehindCamera(a, this.cameraPosition, this.cameraForward);
                applyMatrix(t, t, this.projViewMatrix);
                var w2 = this.width / 2, h2 = this.height / 2;
                t[0] = t[0] * w2 + w2;
                t[1] = -(t[1] * h2) + h2;
                if (out) {
                    out.x = t[0];
                    out.y = t[1];
                    return out;
                }
                return new maptalks_es_Point(t[0], t[1]);
            }
            var centerPoint = this._prjToPoint(this._getPrjCenter(), void 0, TEMP_COORD);
            if (out) {
                out.x = point.x;
                out.y = point.y;
            } else out = point;
            out._sub(centerPoint.x, centerPoint.y);
            out.set(out.x, -out.y);
            return out._add(this.width / 2, this.height / 2);
        };
    }(),
    _projIfBehindCamera: function() {
        var vectorFromCam = new Array(3);
        var proj = new Array(3);
        var sub = new Array(3);
        return function(position, cameraPos, camForward) {
            subtract(vectorFromCam, position, cameraPos);
            var camNormDot = maptalks_es_dot(camForward, vectorFromCam);
            if (camNormDot <= 0) {
                scale$1(proj, camForward, 1.01 * camNormDot);
                maptalks_es_add(position, cameraPos, subtract(sub, vectorFromCam, proj));
            }
            return position;
        };
    }(),
    _containerPointToPoint: function() {
        var cp = [
            0,
            0,
            0
        ], coord0 = [
            0,
            0,
            0,
            1
        ], coord1 = [
            0,
            0,
            0,
            1
        ];
        return function(p, zoom, out) {
            if (this.isTransforming()) {
                var w2 = this.width / 2 || 1, h2 = this.height / 2 || 1;
                set$2(cp, (p.x - w2) / w2, (h2 - p.y) / h2, 0);
                set$2(coord0, cp[0], cp[1], 0);
                set$2(coord1, cp[0], cp[1], 1);
                coord0[3] = coord1[3] = 1;
                applyMatrix(coord0, coord0, this.projViewMatrixInverse);
                applyMatrix(coord1, coord1, this.projViewMatrixInverse);
                var x0 = coord0[0];
                var x1 = coord1[0];
                var y0 = coord0[1];
                var y1 = coord1[1];
                var z0 = coord0[2];
                var z1 = coord1[2];
                var t = z0 === z1 ? 0 : (0 - z0) / (z1 - z0);
                var _x = maptalks_es_interpolate(x0, x1, t);
                var _y = maptalks_es_interpolate(y0, y1, t);
                if (out) {
                    out.x = _x;
                    out.y = _y;
                } else out = new maptalks_es_Point(_x, _y);
                out._multi(1 / this._glScale);
                return void 0 === zoom || this.getZoom() === zoom ? out : this._pointToPointAtZoom(out, zoom, out);
            }
            var centerPoint = this._prjToPoint(this._getPrjCenter(), zoom, out), scale$$1 = void 0 !== zoom ? this._getResolution() / this._getResolution(zoom) : 1;
            var x = scale$$1 * (p.x - this.width / 2), y = scale$$1 * (p.y - this.height / 2);
            return centerPoint._add(x, -y);
        };
    }(),
    _calcMatrices: function() {
        var m1 = createMat4();
        return function() {
            delete this._mapRes;
            delete this._mapGlRes;
            delete this._mapExtent2D;
            delete this._mapGlExtent2D;
            var size = this.getSize();
            var w = size.width || 1, h = size.height || 1;
            this._glScale = this.getGLScale();
            var pitch = this.getPitch() * Math.PI / 180;
            var worldMatrix = this._getCameraWorldMatrix();
            var fov = this.getFov() * Math.PI / 180;
            var farZ = this._getCameraFar(fov, this.getPitch());
            this.cameraFar = farZ;
            this.cameraNear = Math.max(this._glScale * this.getResolution(this.getGLZoom()) * Math.cos(pitch), 0.1);
            var projMatrix = this.projMatrix || createMat4();
            perspective(projMatrix, fov, w / h, this.cameraNear, farZ);
            this.projMatrix = projMatrix;
            this.viewMatrix = invert(this.viewMatrix || createMat4(), worldMatrix);
            this.projViewMatrix = multiply(this.projViewMatrix || createMat4(), projMatrix, this.viewMatrix);
            this._calcCascadeMatrixes();
            this.projViewMatrixInverse = multiply(this.projViewMatrixInverse || createMat4(), worldMatrix, invert(m1, projMatrix));
            this.domCssMatrix = this._calcDomMatrix();
            this._frustumAltitude = this._calcFrustumAltitude();
            this._mapRes = this._getResolution();
            this._mapGlRes = this._getResolution(this.getGLZoom());
            this._mapExtent2D = this._get2DExtent();
            this._mapGlExtent2D = this._get2DExtent(this.getGLZoom());
        };
    }(),
    _getCameraFar: function(fov, pitch) {
        var cameraCenterDistance = this.cameraCenterDistance = maptalks_es_distance(this.cameraPosition, this.cameraLookAt);
        var farZ = cameraCenterDistance;
        if (pitch > 0) {
            pitch = pitch * Math.PI / 180;
            var y;
            if (2 / Math.PI - pitch <= fov / 2) y = 4 * cameraCenterDistance;
            else {
                var tanFov = Math.tan(fov / 2);
                var tanP = Math.tan(pitch);
                y = cameraCenterDistance * tanFov / (1 / tanP - tanFov);
            }
            farZ += y;
        }
        return farZ + 1.0;
    },
    _calcCascadeMatrixes: function() {
        var projMatrix = createMat4();
        function cal(curPitch, pitch, out) {
            var w = this.width;
            var h = this.height;
            var fov = this.getFov() * Math.PI / 180;
            var farZ = this._getCameraFar(fov, pitch);
            var cameraCenterDistance = this.cameraCenterDistance;
            farZ = cameraCenterDistance + (farZ - cameraCenterDistance) / Math.cos((90 - pitch) * Math.PI / 180) * Math.cos((90 - curPitch) * Math.PI / 180);
            perspective(projMatrix, fov, w / h, 0.1, farZ);
            var viewMatrix = this.viewMatrix;
            return multiply(out, projMatrix, viewMatrix);
        }
        return function() {
            var pitch = this.getPitch();
            var cascadePitch0 = this.options['cascadePitches'][0];
            var cascadePitch1 = this.options['cascadePitches'][1];
            var projViewMatrix0 = this.cascadeFrustumMatrix0 = this.cascadeFrustumMatrix0 || createMat4();
            var projViewMatrix1 = this.cascadeFrustumMatrix1 = this.cascadeFrustumMatrix1 || createMat4();
            if (pitch > cascadePitch0) cal.call(this, pitch, cascadePitch0, projViewMatrix0);
            else maptalks_es_copy(this.cascadeFrustumMatrix0, this.projViewMatrix);
            if (pitch > cascadePitch1) cal.call(this, pitch, cascadePitch1, projViewMatrix1);
            else maptalks_es_copy(this.cascadeFrustumMatrix1, this.cascadeFrustumMatrix0);
        };
    }(),
    _calcDomMatrix: function() {
        var m = createMat4(), m1 = createMat4(), minusY = [
            1,
            -1,
            1
        ], arr = [
            0,
            0,
            0
        ];
        return function() {
            var width = this.width || 1;
            var height = this.height || 1;
            var cameraToCenterDistance = 0.5 / Math.tan(this._fov / 2) * height;
            maptalks_es_scale(m, this.projMatrix, minusY);
            maptalks_es_translate(m, m, set$2(arr, 0, 0, -cameraToCenterDistance));
            if (this._pitch) rotateX(m, m, this._pitch);
            if (this._angle) rotateZ(m, m, this._angle);
            identity(m1);
            maptalks_es_scale(m1, m1, set$2(arr, width / 2, -height / 2, 1));
            return multiply(this.domCssMatrix || createMat4(), m1, m);
        };
    }(),
    _getCameraWorldMatrix: function() {
        var q = {};
        return function() {
            var targetZ = this.getGLZoom();
            var size = this.getSize(), scale$$1 = this.getGLScale();
            var center2D = this._prjToPoint(this._prjCenter, targetZ);
            this.cameraLookAt = set$2(this.cameraLookAt || [
                0,
                0,
                0
            ], center2D.x, center2D.y, 0);
            var pitch = this.getPitch() * RADIAN$1;
            var bearing = this.getBearing() * RADIAN$1;
            var ratio = this._getFovRatio();
            var z = scale$$1 * (size.height || 1) / 2 / ratio;
            var cz = z * Math.cos(pitch);
            var dist = Math.sin(pitch) * z;
            var cx = center2D.x - dist * Math.sin(bearing);
            var cy = center2D.y - dist * Math.cos(bearing);
            this.cameraPosition = set$2(this.cameraPosition || [
                0,
                0,
                0
            ], cx, cy, cz);
            var d = dist || 1;
            var up = this.cameraUp = set$2(this.cameraUp || [
                0,
                0,
                0
            ], Math.sin(bearing) * d, Math.cos(bearing) * d, 0);
            var m = this.cameraWorldMatrix = this.cameraWorldMatrix || createMat4();
            lookAt(m, this.cameraPosition, this.cameraLookAt, up);
            var cameraForward = this.cameraForward || [
                0,
                0,
                0
            ];
            subtract(cameraForward, this.cameraLookAt, this.cameraPosition);
            this.cameraForward = normalize(cameraForward, cameraForward);
            matrixToQuaternion(q, m);
            quaternionToMatrix(m, q);
            maptalks_es_setPosition(m, this.cameraPosition);
            return m;
        };
    }(),
    _getFovRatio: function() {
        var fov = this.getFov();
        return Math.tan(fov / 2 * RADIAN$1);
    },
    _renderLayers: function() {
        if (this.isInteracting()) return;
        var layers = this._getLayers();
        layers.forEach(function(layer) {
            if (!layer) return;
            var renderer = layer._getRenderer();
            if (renderer && renderer.setToRedraw) renderer.setToRedraw();
        });
    }
});
function createMat4() {
    return identity(new Array(16));
}
Map$1.include({
    _onViewChange: function(view) {
        if (!this._viewHistory) {
            this._viewHistory = [];
            this._viewHistoryPointer = 0;
        }
        var old = this._getCurrentView();
        for(var i = this._viewHistory.length - 1; i >= 0; i--)if (equalMapView(view, this._viewHistory[i])) {
            this._viewHistoryPointer = i;
            this._fireViewChange(old, view);
            return;
        }
        if (this._viewHistoryPointer < this._viewHistory.length - 1) this._viewHistory.splice(this._viewHistoryPointer + 1);
        this._viewHistory.push(view);
        var count = this.options['viewHistoryCount'];
        if (count > 0 && this._viewHistory.length > count) this._viewHistory.splice(0, this._viewHistory.length - count);
        this._viewHistoryPointer = this._viewHistory.length - 1;
        this._fireViewChange(old, view);
    },
    zoomToPreviousView: function(options) {
        if (void 0 === options) options = {};
        if (!this.hasPreviousView()) return null;
        var view = this._viewHistory[--this._viewHistoryPointer];
        this._zoomToView(view, options);
        return view;
    },
    hasPreviousView: function() {
        if (!this._viewHistory || 0 === this._viewHistoryPointer) return false;
        return true;
    },
    zoomToNextView: function(options) {
        if (void 0 === options) options = {};
        if (!this.hasNextView()) return null;
        var view = this._viewHistory[++this._viewHistoryPointer];
        this._zoomToView(view, options);
        return view;
    },
    hasNextView: function() {
        if (!this._viewHistory || this._viewHistoryPointer === this._viewHistory.length - 1) return false;
        return true;
    },
    _zoomToView: function(view, options) {
        var _this = this;
        var old = this.getView();
        if (options['animation']) this._animateTo(view, {
            duration: options['duration']
        }, function(frame) {
            if ('finished' === frame.state.playState) _this._fireViewChange(old, view);
        });
        else {
            this.setView(view);
            this._fireViewChange(old, view);
        }
    },
    getViewHistory: function() {
        return this._viewHistory;
    },
    _fireViewChange: function(old, view) {
        this._fireEvent('viewchange', {
            old: old,
            new: view
        });
    },
    _getCurrentView: function() {
        if (!this._viewHistory) return null;
        return this._viewHistory[this._viewHistoryPointer];
    }
});
Map$1.mergeOptions({
    viewHistory: true,
    viewHistoryCount: 10
});
var options$h = {
    mode: 'LineString',
    language: 'zh-CN',
    metric: true,
    imperial: false,
    symbol: {
        lineColor: '#000',
        lineWidth: 3,
        lineOpacity: 1
    },
    vertexSymbol: {
        markerType: 'ellipse',
        markerFill: '#fff',
        markerLineColor: '#000',
        markerLineWidth: 3,
        markerWidth: 11,
        markerHeight: 11
    },
    labelOptions: {
        textSymbol: {
            textFaceName: 'monospace',
            textLineSpacing: 1,
            textHorizontalAlignment: 'right',
            textDx: 15
        },
        boxStyle: {
            padding: [
                6,
                2
            ],
            symbol: {
                markerType: 'square',
                markerFill: '#fff',
                markerFillOpacity: 0.9,
                markerLineColor: '#b4b3b3'
            }
        }
    },
    clearButtonSymbol: [
        {
            markerType: 'square',
            markerFill: '#fff',
            markerLineColor: '#b4b3b3',
            markerLineWidth: 2,
            markerWidth: 15,
            markerHeight: 15,
            markerDx: 20
        },
        {
            markerType: 'x',
            markerWidth: 10,
            markerHeight: 10,
            markerDx: 20
        }
    ]
};
var maptalks_es_DistanceTool = function(_DrawTool) {
    _inheritsLoose(DistanceTool, _DrawTool);
    function DistanceTool(options) {
        var _this;
        _this = _DrawTool.call(this, options) || this;
        _this.on('enable', _this._afterEnable, _assertThisInitialized(_assertThisInitialized(_this))).on('disable', _this._afterDisable, _assertThisInitialized(_assertThisInitialized(_this)));
        _this._measureLayers = [];
        return _this;
    }
    var _proto = DistanceTool.prototype;
    _proto.clear = function() {
        if (isArrayHasData(this._measureLayers)) for(var i = 0; i < this._measureLayers.length; i++)this._measureLayers[i].remove();
        delete this._lastMeasure;
        delete this._lastVertex;
        this._measureLayers = [];
        return this;
    };
    _proto.getMeasureLayers = function() {
        return this._measureLayers;
    };
    _proto.getLastMeasure = function() {
        if (!this._lastMeasure) return 0;
        return this._lastMeasure;
    };
    _proto.undo = function() {
        _DrawTool.prototype.undo.call(this);
        var pointer = this._historyPointer;
        if (pointer !== this._vertexes.length) for(var i = pointer; i < this._vertexes.length; i++){
            if (this._vertexes[i].label) this._vertexes[i].label.remove();
            this._vertexes[i].marker.remove();
        }
        return this;
    };
    _proto.redo = function() {
        _DrawTool.prototype.redo.call(this);
        var i = this._historyPointer - 1;
        if (this._vertexes[i]) {
            if (!this._vertexes[i].marker.getLayer()) {
                if (this._vertexes[i].label) this._vertexes[i].label.addTo(this._measureMarkerLayer);
                this._vertexes[i].marker.addTo(this._measureMarkerLayer);
            }
        }
        return this;
    };
    _proto._measure = function(toMeasure) {
        var map = this.getMap();
        var length;
        if (toMeasure instanceof maptalks_es_Geometry) length = map.computeGeometryLength(toMeasure);
        else if (Array.isArray(toMeasure)) length = map.getProjection().measureLength(toMeasure);
        this._lastMeasure = length;
        var units;
        units = 'zh-CN' === this.options['language'] ? [
            ' 米',
            ' 公里',
            ' 英尺',
            ' 英里'
        ] : [
            ' m',
            ' km',
            ' feet',
            ' mile'
        ];
        var content = '';
        if (this.options['metric']) content += length < 1000 ? length.toFixed(0) + units[0] : (length / 1000).toFixed(2) + units[1];
        if (this.options['imperial']) {
            length *= 3.2808399;
            if (content.length > 0) content += '\n';
            content += length < 5280 ? length.toFixed(0) + units[2] : (length / 5280).toFixed(2) + units[3];
        }
        return content;
    };
    _proto._registerMeasureEvents = function() {
        this.on('drawstart', this._msOnDrawStart, this).on('drawvertex', this._msOnDrawVertex, this).on('mousemove', this._msOnMouseMove, this).on('drawend', this._msOnDrawEnd, this);
    };
    _proto._afterEnable = function() {
        this._registerMeasureEvents();
    };
    _proto._afterDisable = function() {
        this.off('drawstart', this._msOnDrawStart, this).off('drawvertex', this._msOnDrawVertex, this).off('mousemove', this._msOnMouseMove, this).off('drawend', this._msOnDrawEnd, this);
    };
    _proto._msOnDrawStart = function(param) {
        var map = this.getMap();
        var prjCoord = map._pointToPrj(param['point2d']);
        var uid = UID();
        var layerId = 'distancetool_' + uid;
        var markerLayerId = 'distancetool_markers_' + uid;
        if (map.getLayer(layerId)) {
            this._measureLineLayer = map.getLayer(layerId);
            this._measureMarkerLayer = map.getLayer(markerLayerId);
        } else {
            this._measureLineLayer = new maptalks_es_VectorLayer(layerId).addTo(map);
            this._measureMarkerLayer = new maptalks_es_VectorLayer(markerLayerId).addTo(map);
        }
        this._measureLayers.push(this._measureLineLayer);
        this._measureLayers.push(this._measureMarkerLayer);
        var marker = new maptalks_es_Marker(param['coordinate'], {
            symbol: this.options['vertexSymbol']
        });
        marker._setPrjCoordinates(prjCoord);
        var content = 'zh-CN' === this.options['language'] ? '起点' : 'start';
        var startLabel = new maptalks_es_Label(content, param['coordinate'], this.options['labelOptions']);
        startLabel._setPrjCoordinates(prjCoord);
        this._lastVertex = startLabel;
        this._addVertexMarker(marker, startLabel);
    };
    _proto._msOnMouseMove = function(param) {
        var ms = this._measure(this._msGetCoordsToMeasure(param));
        if (!this._tailMarker) {
            var symbol = extendSymbol(this.options['vertexSymbol']);
            symbol['markerWidth'] /= 2;
            symbol['markerHeight'] /= 2;
            this._tailMarker = new maptalks_es_Marker(param['coordinate'], {
                symbol: symbol
            }).addTo(this._measureMarkerLayer);
            this._tailLabel = new maptalks_es_Label(ms, param['coordinate'], this.options['labelOptions']).addTo(this._measureMarkerLayer);
        }
        var prjCoords = this._geometry._getPrjCoordinates();
        var lastCoord = prjCoords[prjCoords.length - 1];
        this._tailMarker.setCoordinates(param['coordinate']);
        this._tailMarker._setPrjCoordinates(lastCoord);
        this._tailLabel.setContent(ms);
        this._tailLabel.setCoordinates(param['coordinate']);
        this._tailLabel._setPrjCoordinates(lastCoord);
    };
    _proto._msGetCoordsToMeasure = function(param) {
        return param['geometry'].getCoordinates().concat([
            param['coordinate']
        ]);
    };
    _proto._msOnDrawVertex = function(param) {
        var prjCoords = this._geometry._getPrjCoordinates();
        var lastCoord = prjCoords[prjCoords.length - 1];
        var geometry = param['geometry'];
        var marker = new maptalks_es_Marker(param['coordinate'], {
            symbol: this.options['vertexSymbol']
        });
        var length = this._measure(geometry);
        var vertexLabel = new maptalks_es_Label(length, param['coordinate'], this.options['labelOptions']);
        this._addVertexMarker(marker, vertexLabel);
        vertexLabel._setPrjCoordinates(lastCoord);
        marker._setPrjCoordinates(lastCoord);
        this._lastVertex = vertexLabel;
    };
    _proto._addVertexMarker = function(marker, vertexLabel) {
        if (!this._vertexes) this._vertexes = [];
        this._vertexes.push({
            label: vertexLabel,
            marker: marker
        });
        if (void 0 !== this._historyPointer) this._vertexes.length = this._historyPointer;
        this._measureMarkerLayer.addGeometry(marker);
        if (vertexLabel) this._measureMarkerLayer.addGeometry(vertexLabel);
    };
    _proto._msOnDrawEnd = function(param) {
        this._clearTailMarker();
        var size = this._lastVertex.getSize();
        if (!size) size = new maptalks_es_Size(10, 10);
        this._addClearMarker(this._lastVertex.getCoordinates(), this._lastVertex._getPrjCoordinates(), size['width']);
        var geo = param['geometry'].copy();
        geo._setPrjCoordinates(param['geometry']._getPrjCoordinates());
        geo.addTo(this._measureLineLayer);
        this._lastMeasure = geo.getLength();
    };
    _proto._addClearMarker = function(coordinates, prjCoord, dx) {
        var symbol = this.options['clearButtonSymbol'];
        var dxSymbol = {
            markerDx: (symbol['markerDx'] || 0) + dx,
            textDx: (symbol['textDx'] || 0) + dx
        };
        if (Array.isArray(symbol)) dxSymbol = symbol.map(function(s) {
            if (s) return {
                markerDx: (s['markerDx'] || 0) + dx,
                textDx: (s['textDx'] || 0) + dx
            };
            return null;
        });
        symbol = extendSymbol(symbol, dxSymbol);
        var endMarker = new maptalks_es_Marker(coordinates, {
            symbol: symbol
        });
        var measureLineLayer = this._measureLineLayer, measureMarkerLayer = this._measureMarkerLayer;
        endMarker.on('click', function() {
            measureLineLayer.remove();
            measureMarkerLayer.remove();
            return false;
        }, this);
        endMarker.addTo(this._measureMarkerLayer);
        endMarker._setPrjCoordinates(prjCoord);
    };
    _proto._clearTailMarker = function() {
        if (this._tailMarker) {
            this._tailMarker.remove();
            delete this._tailMarker;
        }
        if (this._tailLabel) {
            this._tailLabel.remove();
            delete this._tailLabel;
        }
    };
    return DistanceTool;
}(maptalks_es_DrawTool);
maptalks_es_DistanceTool.mergeOptions(options$h);
var options$i = {
    mode: 'Polygon',
    symbol: {
        lineColor: '#000000',
        lineWidth: 2,
        lineOpacity: 1,
        lineDasharray: '',
        polygonFill: '#ffffff',
        polygonOpacity: 0.5
    }
};
var maptalks_es_AreaTool = function(_DistanceTool) {
    _inheritsLoose(AreaTool, _DistanceTool);
    function AreaTool(options) {
        var _this;
        _this = _DistanceTool.call(this, options) || this;
        _this.on('enable', _this._afterEnable, _assertThisInitialized(_assertThisInitialized(_this))).on('disable', _this._afterDisable, _assertThisInitialized(_assertThisInitialized(_this)));
        _this._measureLayers = [];
        return _this;
    }
    var _proto = AreaTool.prototype;
    _proto._measure = function(toMeasure) {
        var map = this.getMap();
        var area;
        if (toMeasure instanceof maptalks_es_Geometry) area = map.computeGeometryArea(toMeasure);
        else if (Array.isArray(toMeasure)) area = map.getProjection().measureArea(toMeasure);
        this._lastMeasure = area;
        var units;
        units = 'zh-CN' === this.options['language'] ? [
            ' 平方米',
            ' 平方公里',
            ' 平方英尺',
            ' 平方英里'
        ] : [
            ' sq.m',
            ' sq.km',
            ' sq.ft',
            ' sq.mi'
        ];
        var content = '';
        if (this.options['metric']) content += area < 1E6 ? area.toFixed(0) + units[0] : (area / 1E6).toFixed(2) + units[1];
        if (this.options['imperial']) {
            area *= 3.2808399;
            if (content.length > 0) content += '\n';
            var sqmi = 27878400;
            content += area < sqmi ? area.toFixed(0) + units[2] : (area / sqmi).toFixed(2) + units[3];
        }
        return content;
    };
    _proto._msGetCoordsToMeasure = function(param) {
        return param['geometry'].getShell().concat([
            param['coordinate']
        ]);
    };
    _proto._msOnDrawVertex = function(param) {
        var prjCoord = this.getMap()._pointToPrj(param['point2d']);
        var vertexMarker = new maptalks_es_Marker(param['coordinate'], {
            symbol: this.options['vertexSymbol']
        });
        vertexMarker._setPrjCoordinates(prjCoord);
        this._measure(param['geometry']);
        this._lastVertex = vertexMarker;
        this._addVertexMarker(vertexMarker);
    };
    _proto._msOnDrawEnd = function(param) {
        this._clearTailMarker();
        var prjCoord = this.getMap()._pointToPrj(param['point2d']);
        var ms = this._measure(param['geometry']);
        var endLabel = new maptalks_es_Label(ms, param['coordinate'], this.options['labelOptions']).addTo(this._measureMarkerLayer);
        endLabel._setPrjCoordinates(prjCoord);
        var size = endLabel.getSize();
        if (!size) size = new maptalks_es_Size(10, 10);
        this._addClearMarker(param['coordinate'], prjCoord, size['width']);
        var geo = param['geometry'].copy();
        geo._setPrjCoordinates(param['geometry']._getPrjCoordinates());
        geo.addTo(this._measureLineLayer);
        this._lastMeasure = geo.getArea();
    };
    return AreaTool;
}(maptalks_es_DistanceTool);
maptalks_es_AreaTool.mergeOptions(options$i);
var circleHooks = {
    create: function(projection, prjCoord) {
        var center = projection.unproject(prjCoord[0]);
        var circle = new maptalks_es_Circle(center, 0);
        circle._setPrjCoordinates(prjCoord[0]);
        return circle;
    },
    update: function(projection, prjPath, geometry) {
        var map = geometry.getMap();
        var prjCoord = Array.isArray(prjPath) ? prjPath[prjPath.length - 1] : prjPath;
        var nextCoord = projection.unproject(prjCoord);
        var radius = map.computeLength(geometry.getCenter(), nextCoord);
        geometry.setRadius(radius);
    },
    generate: function(geometry) {
        return geometry;
    }
};
maptalks_es_DrawTool.registerMode('circle', extend({
    clickLimit: 2,
    action: [
        'click',
        'mousemove',
        'click'
    ]
}, circleHooks));
maptalks_es_DrawTool.registerMode('freeHandCircle', extend({
    action: [
        'mousedown',
        'mousemove',
        'mouseup'
    ]
}, circleHooks));
var ellipseHooks = {
    create: function(projection, prjCoord) {
        var center = projection.unproject(prjCoord[0]);
        var ellipse = new maptalks_es_Ellipse(center, 0, 0);
        ellipse._setPrjCoordinates(prjCoord[0]);
        return ellipse;
    },
    update: function(projection, prjPath, geometry) {
        var map = geometry.getMap();
        var center = geometry.getCenter();
        var prjCoord = Array.isArray(prjPath) ? prjPath[prjPath.length - 1] : prjPath;
        var nextCoord = projection.unproject(prjCoord);
        var rx = map.computeLength(center, new maptalks_es_Coordinate({
            x: nextCoord.x,
            y: center.y
        }));
        var ry = map.computeLength(center, new maptalks_es_Coordinate({
            x: center.x,
            y: nextCoord.y
        }));
        geometry.setWidth(2 * rx);
        geometry.setHeight(2 * ry);
    },
    generate: function(geometry) {
        return geometry;
    }
};
maptalks_es_DrawTool.registerMode('ellipse', extend({
    clickLimit: 2,
    action: [
        'click',
        'mousemove',
        'click'
    ]
}, ellipseHooks));
maptalks_es_DrawTool.registerMode('freeHandEllipse', extend({
    action: [
        'mousedown',
        'mousemove',
        'mouseup'
    ]
}, ellipseHooks));
var rectangleHooks = {
    create: function(projection, prjCoords) {
        var rect = new maptalks_es_Polygon([]);
        rect._firstClick = prjCoords[0];
        return rect;
    },
    update: function(projection, prjCoords, geometry, param) {
        var map = geometry.getMap();
        var containerPoint = param['containerPoint'];
        var firstClick = map._prjToContainerPoint(geometry._firstClick);
        var ring = [
            [
                firstClick.x,
                firstClick.y
            ],
            [
                containerPoint.x,
                firstClick.y
            ],
            [
                containerPoint.x,
                containerPoint.y
            ],
            [
                firstClick.x,
                containerPoint.y
            ]
        ];
        geometry.setCoordinates(ring.map(function(c) {
            return map.containerPointToCoord(new maptalks_es_Point(c));
        }));
        geometry._setPrjCoordinates(ring.map(function(c) {
            return map._containerPointToPrj(new maptalks_es_Point(c));
        }));
    },
    generate: function(geometry) {
        return geometry;
    }
};
maptalks_es_DrawTool.registerMode('rectangle', extend({
    clickLimit: 2,
    action: [
        'click',
        'mousemove',
        'click'
    ]
}, rectangleHooks));
maptalks_es_DrawTool.registerMode('freeHandRectangle', extend({
    action: [
        'mousedown',
        'mousemove',
        'mouseup'
    ]
}, rectangleHooks));
maptalks_es_DrawTool.registerMode('point', {
    clickLimit: 1,
    action: [
        'click'
    ],
    create: function(projection, prjCoord) {
        var center = projection.unproject(prjCoord[0]);
        var marker = new maptalks_es_Marker(center);
        marker._setPrjCoordinates(prjCoord[0]);
        return marker;
    },
    generate: function(geometry) {
        return geometry;
    }
});
var polygonHooks = {
    create: function(projection, prjPath) {
        var path = prjPath.map(function(c) {
            return projection.unproject(c);
        });
        var line = new maptalks_es_LineString(path);
        line._setPrjCoordinates(prjPath);
        return line;
    },
    update: function(projection, path, geometry) {
        var symbol = geometry.getSymbol();
        var prjCoords;
        if (Array.isArray(path)) prjCoords = path;
        else {
            prjCoords = geometry._getPrjCoordinates();
            prjCoords.push(path);
        }
        var coordinates = prjCoords.map(function(c) {
            return projection.unproject(c);
        });
        geometry.setCoordinates(coordinates);
        geometry._setPrjCoordinates(prjCoords);
        var layer = geometry.getLayer();
        if (layer) {
            var polygon = layer.getGeometryById('polygon');
            if (!polygon && prjCoords.length >= 3) {
                polygon = new maptalks_es_Polygon([
                    coordinates
                ], {
                    id: 'polygon'
                });
                if (symbol) {
                    var pSymbol = extendSymbol(symbol, {
                        lineOpacity: 0
                    });
                    polygon.setSymbol(pSymbol);
                }
                polygon.addTo(layer);
            }
            if (polygon) polygon._setPrjCoordinates(prjCoords);
        }
    },
    generate: function(geometry) {
        var polygon = new maptalks_es_Polygon(geometry.getCoordinates(), {
            symbol: geometry.getSymbol()
        });
        polygon._setPrjCoordinates(geometry._getPrjCoordinates());
        polygon._projCode = geometry._projCode;
        return polygon;
    }
};
maptalks_es_DrawTool.registerMode('polygon', extend({
    action: [
        'click',
        'mousemove',
        'dblclick'
    ]
}, polygonHooks));
maptalks_es_DrawTool.registerMode('freeHandPolygon', extend({
    action: [
        'mousedown',
        'mousemove',
        'mouseup'
    ]
}, polygonHooks));
var lineStringHooks = {
    create: function(projection, prjPath) {
        var path = prjPath.map(function(c) {
            return projection.unproject(c);
        });
        var line = new maptalks_es_LineString(path);
        line._setPrjCoordinates(prjPath);
        return line;
    },
    update: function(projection, prjPath, geometry) {
        var prjCoords;
        if (Array.isArray(prjPath)) prjCoords = prjPath;
        else {
            prjCoords = geometry._getPrjCoordinates();
            prjCoords.push(prjPath);
        }
        var path = prjCoords.map(function(c) {
            return projection.unproject(c);
        });
        geometry.setCoordinates(path);
        geometry._setPrjCoordinates(prjCoords);
    },
    generate: function(geometry) {
        return geometry;
    }
};
maptalks_es_DrawTool.registerMode('linestring', extend({
    action: [
        'click',
        'mousemove',
        'dblclick'
    ]
}, lineStringHooks));
maptalks_es_DrawTool.registerMode('freeHandLinestring', extend({
    action: [
        'mousedown',
        'mousemove',
        'mouseup'
    ]
}, lineStringHooks));
maptalks_es_DrawTool.registerMode('arccurve', {
    action: [
        'click',
        'mousemove',
        'dblclick'
    ],
    create: function(projection, prjPath) {
        var path = prjPath.map(function(c) {
            return projection.unproject(c);
        });
        var arc = new maptalks_es_ArcCurve(path);
        arc._setPrjCoordinates(prjPath);
        return arc;
    },
    update: lineStringHooks.update,
    generate: function(geometry) {
        return geometry;
    }
});
maptalks_es_DrawTool.registerMode('quadbeziercurve', {
    action: [
        'click',
        'mousemove',
        'dblclick'
    ],
    create: function(projection, prjPath) {
        var path = prjPath.map(function(c) {
            return projection.unproject(c);
        });
        var curve = new maptalks_es_QuadBezierCurve(path);
        curve._setPrjCoordinates(prjPath);
        return curve;
    },
    update: lineStringHooks.update,
    generate: function(geometry) {
        return geometry;
    }
});
maptalks_es_DrawTool.registerMode('cubicbeziercurve', {
    action: [
        'click',
        'mousemove',
        'dblclick'
    ],
    create: function(projection, prjPath) {
        var path = prjPath.map(function(c) {
            return projection.unproject(c);
        });
        var curve = new maptalks_es_CubicBezierCurve(path);
        curve._setPrjCoordinates(prjPath);
        return curve;
    },
    update: lineStringHooks.update,
    generate: function(geometry) {
        return geometry;
    }
});
maptalks_es_DrawTool.registerMode('boxZoom', {
    action: [
        'mousedown',
        'mousemove',
        'mouseup'
    ],
    create: function(projection, prjCoord) {
        prjCoord = prjCoord[0];
        var center = projection.unproject(prjCoord);
        var marker = new maptalks_es_Marker(center);
        marker._firstClick = prjCoord;
        return marker;
    },
    update: function(projection, prjCoord, geometry, param) {
        var map = geometry.getMap();
        var p1 = map._prjToContainerPoint(geometry._firstClick), p2 = param['containerPoint'];
        prjCoord = map._containerPointToPrj(new maptalks_es_Coordinate(Math.min(p1.x, p2.x), Math.min(p1.y, p2.y)));
        var center = projection.unproject(prjCoord);
        geometry.setCoordinates(center)._setPrjCoordinates(prjCoord);
        geometry.updateSymbol({
            markerWidth: Math.abs(p1.x - p2.x),
            markerHeight: Math.abs(p1.y - p2.y)
        });
    },
    generate: function(geometry) {
        return geometry;
    }
});
function parse(arcConf) {
    var tileInfo = arcConf['tileInfo'], tileSize = [
        tileInfo['cols'],
        tileInfo['rows']
    ], resolutions = [], lods = tileInfo['lods'];
    for(var i = 0, len = lods.length; i < len; i++)resolutions.push(lods[i]['resolution']);
    var fullExtent = arcConf['fullExtent'], origin = tileInfo['origin'], tileSystem = [
        1,
        -1,
        origin['x'],
        origin['y']
    ];
    delete fullExtent['spatialReference'];
    return {
        spatialReference: {
            resolutions: resolutions,
            fullExtent: fullExtent
        },
        tileSystem: tileSystem,
        tileSize: tileSize
    };
}
maptalks_es_SpatialReference.loadArcgis = function(url, cb, options) {
    if (void 0 === options) options = {
        jsonp: true
    };
    if (isString(url) && '{' !== url.substring(0, 1)) Ajax.getJSON(url, function(err, json) {
        if (err) {
            cb(err);
            return;
        }
        var spatialRef = parse(json);
        cb(null, spatialRef);
    }, options);
    else {
        if (isString(url)) url = parseJSON(url);
        var spatialRef = parse(url);
        cb(null, spatialRef);
    }
    return this;
};
function maptalks_es_getProjection(projection) {
    var prj = projection.indexOf('EPSG') > -1 ? projection : 'EPSG:' + projection;
    prj = strReplace(prj, [
        [
            '4490',
            '4326'
        ],
        [
            '102100',
            '3857'
        ],
        [
            '900913',
            '3857'
        ]
    ]);
    return prj;
}
function strReplace(str, repArray) {
    if (void 0 === repArray) repArray = [];
    repArray.forEach(function(rep) {
        var template = rep[0], value = rep[1];
        str = str.replace(template, value);
    });
    return str;
}
function parseWMTSXML(str, requestUrl, options) {
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(str, 'text/xml');
    var content = xmlDoc.querySelectorAll('Contents')[0];
    if (!content) return [];
    var layers = content.getElementsByTagName('Layer');
    if (!layers.length) return [];
    var TileMatrixSets = [];
    for(var i = 0, len = content.childNodes.length; i < len; i++)if ('TileMatrixSet' === content.childNodes[i].nodeName) TileMatrixSets.push(content.childNodes[i]);
    if (!TileMatrixSets.length) return [];
    var result = [];
    for(var _i = 0, _len = layers.length; _i < _len; _i++){
        var layer = layers[_i];
        var style = layer.querySelectorAll('Style')[0];
        if (style) {
            style = style.getElementsByTagName('ows:Identifier')[0];
            if (style) style = style.textContent;
        }
        var layerName = layer.getElementsByTagName('ows:Identifier')[0];
        if (layerName) layerName = layerName.textContent;
        var resourceURL = layer.querySelectorAll('ResourceURL')[0];
        var url = '';
        if (resourceURL) url = resourceURL.attributes.template.value;
        var _parseTileMatrixSet = parseTileMatrixSet(TileMatrixSets, _i, options), resolutions = _parseTileMatrixSet.resolutions, tileSize = _parseTileMatrixSet.tileSize, tileSystem = _parseTileMatrixSet.tileSystem, projection = _parseTileMatrixSet.projection, TileMatrixSet = _parseTileMatrixSet.TileMatrixSet;
        if (!url.length) {
            url = requestUrl.substr(0, requestUrl.lastIndexOf('?'));
            url += '?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER={LAYER}&STYLE={Style}&TILEMATRIXSET={TileMatrixSet}&FORMAT=tiles&TILEMATRIX={TileMatrix}&TILEROW={TileRow}&TILECOL={TileCol}';
        }
        var urlTemplate = strReplace(url, [
            [
                '{LAYER}',
                layerName
            ],
            [
                '{Layer}',
                layerName
            ],
            [
                '{layer}',
                layerName
            ],
            [
                '{STYLE}',
                style
            ],
            [
                '{Style}',
                style
            ],
            [
                '{style}',
                style
            ],
            [
                '{TileMatrixSet}',
                TileMatrixSet
            ],
            [
                '{TileMatrix}',
                '{z}'
            ],
            [
                '{TileRow}',
                '{y}'
            ],
            [
                '{TileCol}',
                '{x}'
            ]
        ]);
        result.push({
            tileSize: tileSize,
            tileSystem: tileSystem,
            spatialReference: {
                resolutions: resolutions,
                projection: projection
            },
            urlTemplate: urlTemplate,
            info: {
                layerName: layerName,
                TileMatrixSet: TileMatrixSet,
                style: style,
                tileSize: tileSize,
                tileSystem: tileSystem,
                resolutions: resolutions,
                projection: projection,
                urlTemplate: urlTemplate
            }
        });
    }
    return result;
}
function parseTileMatrixSet(TileMatrixSets, index, options) {
    if (void 0 === options) options = {};
    var TileMatrixSet = TileMatrixSets[index];
    var TileMatrixs = TileMatrixSet.getElementsByTagName('TileMatrix');
    var resolutions = [], tileSystem = [], tileSize = [];
    var projection, tset;
    if (!projection) {
        var supportedCRS = TileMatrixSet.getElementsByTagName('ows:SupportedCRS')[0];
        if (supportedCRS) {
            projection = supportedCRS.textContent;
            projection = projection.split('EPSG')[1];
            while(projection.indexOf(':') > -1)projection = projection.replace(':', '');
            projection = maptalks_es_getProjection(projection);
        }
    }
    if (!tset) {
        tset = TileMatrixSet.getElementsByTagName('ows:Identifier')[0];
        if (tset) tset = tset.textContent;
    }
    var transformValue = 0.0002645833333333333;
    if (options.isArcgis) transformValue = 0.00028;
    if (projection && projection.indexOf('4326') > -1) {
        transformValue = 2.3767925226029154e-9;
        if (options.isArcgis) transformValue = 2.518101729011901e-9;
    }
    var minLevel = 1 / 0;
    for(var _index = 0; _index < TileMatrixs.length; _index++){
        var TileMatrix = TileMatrixs[_index];
        var level = TileMatrix.getElementsByTagName('ows:Identifier')[0].textContent;
        level = parseInt(level);
        minLevel = Math.min(minLevel, level);
        var ScaleDenominator = TileMatrix.getElementsByTagName('ScaleDenominator')[0].textContent;
        var TopLeftCorner = TileMatrix.getElementsByTagName('TopLeftCorner')[0].textContent;
        var TileWidth = TileMatrix.getElementsByTagName('TileWidth')[0].textContent;
        var TileHeight = TileMatrix.getElementsByTagName('TileHeight')[0].textContent;
        if (0 === tileSize.length) tileSize.push(parseInt(TileWidth), parseInt(TileHeight));
        if (0 === tileSystem.length) {
            var _TopLeftCorner$split$ = TopLeftCorner.split(' ').filter(function(s) {
                return '' !== s;
            }).map(function(v) {
                return parseFloat(v);
            }), x = _TopLeftCorner$split$[0], y = _TopLeftCorner$split$[1];
            if (x > 0) tileSystem.push(1, -1, y, x);
            else tileSystem.push(1, -1, x, y);
        }
        var res = parseFloat(ScaleDenominator) * transformValue;
        resolutions.push(res);
    }
    if (minLevel > 0) {
        var _res = resolutions[0];
        for(var i = minLevel - 1; i >= 0; i--){
            _res *= 2;
            resolutions.splice(0, 0, _res);
        }
    }
    return {
        resolutions: resolutions,
        tileSize: tileSize,
        tileSystem: tileSystem,
        projection: projection,
        TileMatrixSet: tset
    };
}
maptalks_es_SpatialReference.loadWMTS = function(url, cb, options) {
    if (void 0 === options) options = {
        jsonp: true
    };
    if (isString(url)) Ajax.get(url, function(err, xml) {
        if (err) {
            cb(err);
            return;
        }
        var layers = parseWMTSXML(xml, url, options);
        cb(null, layers);
    }, options);
    return this;
};
var options$j = {
    eventsPropagation: false,
    eventsToStop: null,
    dx: 0,
    dy: 0,
    autoPan: false,
    autoPanDuration: 600,
    single: true,
    animation: 'scale',
    animationOnHide: true,
    animationDuration: 500,
    pitchWithMap: false,
    rotateWithMap: false
};
var maptalks_es_UIComponent = function(_Eventable) {
    _inheritsLoose(UIComponent, _Eventable);
    function UIComponent(options) {
        return _Eventable.call(this, options) || this;
    }
    var _proto = UIComponent.prototype;
    _proto.addTo = function(owner) {
        this._owner = owner;
        this._switchEvents('on');
        if (this.onAdd) this.onAdd();
        this.fire('add');
        return this;
    };
    _proto.getMap = function() {
        if (!this._owner) return null;
        if (this._owner.getBaseLayer) return this._owner;
        return this._owner.getMap();
    };
    _proto.show = function(coordinate) {
        var map = this.getMap();
        if (!map) return this;
        if (!this._mapEventsOn) this._switchMapEvents('on');
        coordinate = coordinate || this._coordinate || this._owner.getCenter();
        var visible = this.isVisible();
        this.fire('showstart');
        var container = this._getUIContainer();
        this._coordinate = coordinate;
        this._removePrevDOM();
        var dom = this.__uiDOM = this.buildOn(map);
        dom['eventsPropagation'] = this.options['eventsPropagation'];
        if (!dom) {
            this.fire('showend');
            return this;
        }
        this._measureSize(dom);
        if (this._singleton()) map[this._uiDomKey()] = dom;
        this._setPosition();
        dom.style[TRANSITION] = null;
        container.appendChild(dom);
        var anim = this._getAnimation();
        if (visible) anim.ok = false;
        if (anim.ok) {
            if (anim.fade) dom.style.opacity = 0;
            if (anim.scale) {
                if (this.getTransformOrigin) {
                    var origin = this.getTransformOrigin();
                    dom.style[TRANSFORMORIGIN] = origin;
                }
                dom.style[TRANSFORM] = this._toCSSTranslate(this._pos) + ' scale(0)';
            }
        }
        dom.style.display = '';
        if (this.options['eventsToStop']) on(dom, this.options['eventsToStop'], stopPropagation);
        if (this.options['autoPan']) this._autoPan();
        var transition = anim.transition;
        if (anim.ok && transition) {
            dom.offsetHeight;
            if (transition) dom.style[TRANSITION] = transition;
            if (anim.fade) dom.style.opacity = 1;
            if (anim.scale) dom.style[TRANSFORM] = this._toCSSTranslate(this._pos) + ' scale(1)';
        }
        this.fire('showend');
        return this;
    };
    _proto.hide = function() {
        var _this = this;
        if (!this.getDOM() || !this.getMap()) return this;
        var anim = this._getAnimation(), dom = this.getDOM();
        if (!this.options['animationOnHide']) anim.ok = false;
        if (anim.ok) {
            dom.offsetHeight;
            dom.style[TRANSITION] = anim.transition;
            setTimeout(function() {
                dom.style.display = 'none';
                _this.fire('hide');
            }, this.options['animationDuration']);
        } else {
            dom.style.display = 'none';
            this.fire('hide');
        }
        if (anim.fade) dom.style.opacity = 0;
        if (anim.scale) dom.style[TRANSFORM] = this._toCSSTranslate(this._pos) + ' scale(0)';
        return this;
    };
    _proto.isVisible = function() {
        var dom = this.getDOM();
        return this.getMap() && dom && dom.parentNode && 'none' !== dom.style.display;
    };
    _proto.remove = function() {
        delete this._mapEventsOn;
        if (!this._owner) return this;
        this.hide();
        this._switchEvents('off');
        if (this.onRemove) this.onRemove();
        if (!this._singleton() && this.__uiDOM) this._removePrevDOM();
        delete this._owner;
        this.fire('remove');
        return this;
    };
    _proto.getSize = function() {
        if (this._size) return this._size.copy();
        return null;
    };
    _proto.getOwner = function() {
        return this._owner;
    };
    _proto.getDOM = function() {
        return this.__uiDOM;
    };
    _proto.getPosition = function() {
        if (!this.getMap()) return null;
        var p = this._getViewPoint()._round();
        if (this.getOffset) {
            var o = this.getOffset()._round();
            if (o) p._add(o);
        }
        return p;
    };
    _proto._getAnimation = function() {
        var anim = {
            fade: false,
            scale: false
        };
        var animations = this.options['animation'] ? this.options['animation'].split(',') : [];
        for(var i = 0; i < animations.length; i++){
            var trimed = trim(animations[i]);
            if ('fade' === trimed) anim.fade = true;
            else if ('scale' === trimed) anim.scale = true;
        }
        var transition = null;
        if (anim.fade) transition = 'opacity ' + this.options['animationDuration'] + 'ms';
        if (anim.scale) {
            transition = transition ? transition + ',' : '';
            transition += TRANSFORM + ' ' + this.options['animationDuration'] + 'ms';
        }
        anim.transition = transition;
        anim.ok = null !== transition;
        return anim;
    };
    _proto._getViewPoint = function() {
        var alt = 0;
        if (this._owner && this._owner.getAltitude) {
            var altitude = this._owner.getAltitude();
            if (altitude > 0) alt = this._meterToPoint(this._coordinate, altitude);
        }
        return this.getMap().coordToViewPoint(this._coordinate, void 0, alt)._add(this.options['dx'], this.options['dy']);
    };
    _proto._meterToPoint = function(center, altitude) {
        var map = this.getMap();
        return map.distanceToPoint(altitude, 0, void 0, center).x * sign(altitude);
    };
    _proto._autoPan = function() {
        var map = this.getMap(), dom = this.getDOM();
        if (map.isMoving()) return;
        var point = this._pos;
        var mapSize = map.getSize(), mapWidth = mapSize['width'], mapHeight = mapSize['height'];
        var containerPoint = map.viewPointToContainerPoint(point);
        var clientWidth = parseInt(dom.clientWidth), clientHeight = parseInt(dom.clientHeight);
        var left = 0, top = 0;
        if (containerPoint.x < 0) left = -(containerPoint.x - clientWidth / 2);
        else if (containerPoint.x + clientWidth - 35 > mapWidth) left = mapWidth - (containerPoint.x + 3 * clientWidth / 2);
        if (containerPoint.y - clientHeight < 0) top = -(containerPoint.y - clientHeight) + 50;
        else if (containerPoint.y > mapHeight) top = mapHeight - containerPoint.y - clientHeight - 30;
        if (0 !== top || 0 !== left) map.panBy(new maptalks_es_Point(left, top), {
            duration: this.options['autoPanDuration']
        });
    };
    _proto._measureSize = function(dom) {
        var container = this._getUIContainer();
        dom.style.position = 'absolute';
        dom.style.left = "-99999px";
        var anchor = dom.style.bottom ? 'bottom' : 'top';
        dom.style[anchor] = "-99999px";
        dom.style.display = '';
        container.appendChild(dom);
        this._size = new maptalks_es_Size(dom.clientWidth, dom.clientHeight);
        dom.style.display = 'none';
        dom.style.left = '0px';
        dom.style[anchor] = '0px';
        return this._size;
    };
    _proto._removePrevDOM = function() {
        if (this.onDomRemove) this.onDomRemove();
        var eventsToStop = this.options['eventsToStop'];
        if (this._singleton()) {
            var map = this.getMap(), key = this._uiDomKey();
            if (map[key]) {
                if (eventsToStop) off(map[key], eventsToStop, stopPropagation);
                removeDomNode(map[key]);
                delete map[key];
            }
            delete this.__uiDOM;
        } else if (this.__uiDOM) {
            if (eventsToStop) off(this.__uiDOM, eventsToStop, stopPropagation);
            removeDomNode(this.__uiDOM);
            delete this.__uiDOM;
        }
    };
    _proto._uiDomKey = function() {
        return '__ui_' + this._getClassName();
    };
    _proto._singleton = function() {
        return this.options['single'];
    };
    _proto._getUIContainer = function() {
        return this.getMap()._panels['ui'];
    };
    _proto._getClassName = function() {
        return 'UIComponent';
    };
    _proto._switchMapEvents = function(to) {
        var map = this.getMap();
        if (!map) return;
        this._mapEventsOn = 'on' === to;
        var events = this._getDefaultEvents();
        if (this.getEvents) extend(events, this.getEvents());
        if (events) {
            for(var p in events)if (events.hasOwnProperty(p)) map[to](p, events[p], this);
        }
    };
    _proto._switchEvents = function(to) {
        this._switchMapEvents(to);
        var ownerEvents = this._getOwnerEvents();
        if (this._owner) {
            for(var p in ownerEvents)if (ownerEvents.hasOwnProperty(p)) this._owner[to](p, ownerEvents[p], this);
        }
    };
    _proto._getDefaultEvents = function() {
        return {
            'zooming rotate pitch': this.onEvent,
            zoomend: this.onZoomEnd,
            moving: this.onMoving,
            resize: this.onResize
        };
    };
    _proto._getOwnerEvents = function() {
        var events = {};
        if (this._owner && this._owner instanceof maptalks_es_Geometry) events.positionchange = this.onGeometryPositionChange;
        if (this.getOwnerEvents) extend(events, this.getOwnerEvents());
        return events;
    };
    _proto.onGeometryPositionChange = function(param) {
        if (this._owner && this.isVisible()) this.show(param['target'].getCenter());
    };
    _proto.onMoving = function() {
        if (this.isVisible() && this.getMap().isTransforming()) this._updatePosition();
    };
    _proto.onEvent = function() {
        if (this.isVisible()) this._updatePosition();
    };
    _proto.onZoomEnd = function() {
        if (this.isVisible()) this._setPosition();
    };
    _proto.onResize = function() {
        if (this.isVisible()) this._setPosition();
    };
    _proto._updatePosition = function() {
        var renderer = this.getMap()._getRenderer();
        renderer.callInNextFrame(this._setPosition.bind(this));
    };
    _proto._setPosition = function() {
        var dom = this.getDOM();
        if (!dom) return;
        dom.style[TRANSITION] = null;
        var p = this.getPosition();
        this._pos = p;
        dom.style[TRANSFORM] = this._toCSSTranslate(p) + ' scale(1)';
    };
    _proto._toCSSTranslate = function(p) {
        if (!p) return '';
        if (!Browser$1.any3d) return 'translate(' + p.x + 'px,' + p.y + 'px)';
        var map = this.getMap(), bearing = map ? map.getBearing() : 0, pitch = map ? map.getPitch() : 0;
        var r = '';
        if (this.options['pitchWithMap'] && pitch) r += " rotateX(" + Math.round(pitch) + "deg)";
        if (this.options['rotateWithMap'] && bearing) r += " rotateZ(" + Math.round(-bearing) + "deg)";
        return 'translate3d(' + p.x + 'px,' + p.y + 'px, 0px)' + r;
    };
    UIComponent.isSupport = function(owner) {
        if (owner && isFunction(owner.on) && isFunction(owner.off) && isFunction(owner.getCenter)) return true;
        return false;
    };
    return UIComponent;
}(maptalks_es_Eventable(maptalks_es_Class));
maptalks_es_UIComponent.mergeOptions(options$j);
var options$k = {
    containerClass: null,
    eventsPropagation: true,
    draggable: false,
    single: false,
    content: null
};
var domEvents = "mousedown mouseup mouseenter mouseover mouseout mousemove click dblclick contextmenu keypress touchstart touchmove touchend";
var maptalks_es_UIMarker = function(_Handlerable) {
    _inheritsLoose(UIMarker, _Handlerable);
    function UIMarker(coordinate, options) {
        var _this;
        _this = _Handlerable.call(this, options) || this;
        _this._markerCoord = new maptalks_es_Coordinate(coordinate);
        return _this;
    }
    var _proto = UIMarker.prototype;
    _proto._getClassName = function() {
        return 'UIMarker';
    };
    _proto.setCoordinates = function(coordinates) {
        this._markerCoord = coordinates;
        this.fire('positionchange');
        if (this.isVisible()) {
            this._coordinate = this._markerCoord;
            this._setPosition();
        }
        return this;
    };
    _proto.getCoordinates = function() {
        return this._markerCoord;
    };
    _proto.setContent = function(content) {
        var old = this.options['content'];
        this.options['content'] = content;
        this.fire('contentchange', {
            old: old,
            new: content
        });
        if (this.isVisible()) this.show();
        return this;
    };
    _proto.getContent = function() {
        return this.options['content'];
    };
    _proto.onAdd = function() {
        this.show();
    };
    _proto.show = function() {
        return _Handlerable.prototype.show.call(this, this._markerCoord);
    };
    _proto.flash = function(interval, count, cb, context) {
        return flash.call(this, interval, count, cb, context);
    };
    _proto.buildOn = function() {
        var dom;
        if (isString(this.options['content'])) {
            dom = createEl('div');
            dom.innerHTML = this.options['content'];
        } else dom = this.options['content'];
        if (this.options['containerClass']) dom.className = this.options['containerClass'];
        this._registerDOMEvents(dom);
        return dom;
    };
    _proto.getOffset = function() {
        var size = this.getSize();
        return new maptalks_es_Point(-size.width / 2, -size.height / 2);
    };
    _proto.getTransformOrigin = function() {
        return 'center center';
    };
    _proto.onDomRemove = function() {
        var dom = this.getDOM();
        this._removeDOMEvents(dom);
    };
    _proto.isDragging = function() {
        if (this['draggable']) return this['draggable'].isDragging();
        return false;
    };
    _proto._registerDOMEvents = function(dom) {
        on(dom, domEvents, this._onDomEvents, this);
    };
    _proto._onDomEvents = function(e) {
        var event = this.getMap()._parseEvent(e, e.type);
        this.fire(e.type, event);
    };
    _proto._removeDOMEvents = function(dom) {
        off(dom, domEvents, this._onDomEvents, this);
    };
    _proto._getConnectPoints = function() {
        var map = this.getMap();
        var containerPoint = map.coordToContainerPoint(this.getCoordinates());
        var size = this.getSize(), width = size.width, height = size.height;
        var anchors = [
            map.containerPointToCoordinate(containerPoint.add(-width / 2, 0)),
            map.containerPointToCoordinate(containerPoint.add(width / 2, 0)),
            map.containerPointToCoordinate(containerPoint.add(0, height / 2)),
            map.containerPointToCoordinate(containerPoint.add(0, -height / 2))
        ];
        return anchors;
    };
    return UIMarker;
}(Handlerable(maptalks_es_UIComponent));
maptalks_es_UIMarker.mergeOptions(options$k);
var EVENTS$1 = Browser$1.touch ? 'touchstart mousedown' : 'mousedown';
var maptalks_es_UIMarkerDragHandler = function(_Handler) {
    _inheritsLoose(UIMarkerDragHandler, _Handler);
    function UIMarkerDragHandler(target) {
        return _Handler.call(this, target) || this;
    }
    var _proto2 = UIMarkerDragHandler.prototype;
    _proto2.addHooks = function() {
        this.target.on(EVENTS$1, this._startDrag, this);
    };
    _proto2.removeHooks = function() {
        this.target.off(EVENTS$1, this._startDrag, this);
    };
    _proto2._startDrag = function(param) {
        var domEvent = param['domEvent'];
        if (domEvent.touches && domEvent.touches.length > 1 || 2 === domEvent.button) return;
        if (this.isDragging()) return;
        this.target.on('click', this._endDrag, this);
        this._lastCoord = param['coordinate'];
        this._lastPoint = param['containerPoint'];
        this._prepareDragHandler();
        this._dragHandler.onMouseDown(param['domEvent']);
        this.target.fire('dragstart', param);
    };
    _proto2._prepareDragHandler = function() {
        this._dragHandler = new maptalks_es_DragHandler(this.target.getDOM(), {
            cancelOn: this._cancelOn.bind(this),
            ignoreMouseleave: true
        });
        this._dragHandler.on('mousedown', this._onMouseDown, this);
        this._dragHandler.on('dragging', this._dragging, this);
        this._dragHandler.on('mouseup', this._endDrag, this);
        this._dragHandler.enable();
    };
    _proto2._cancelOn = function(domEvent) {
        var target = domEvent.srcElement || domEvent.target, tagName = target.tagName.toLowerCase();
        if ('button' === tagName || 'input' === tagName || 'select' === tagName || 'option' === tagName || 'textarea' === tagName) return true;
        return false;
    };
    _proto2._onMouseDown = function(param) {
        stopPropagation(param['domEvent']);
    };
    _proto2._dragging = function(param) {
        var target = this.target, map = target.getMap(), eventParam = map._parseEvent(param['domEvent']), domEvent = eventParam['domEvent'];
        if (domEvent.touches && domEvent.touches.length > 1) return;
        if (!this._isDragging) {
            this._isDragging = true;
            return;
        }
        var coord = eventParam['coordinate'], point = eventParam['containerPoint'];
        if (!this._lastCoord) this._lastCoord = coord;
        if (!this._lastPoint) this._lastPoint = point;
        var coordOffset = coord.sub(this._lastCoord), pointOffset = point.sub(this._lastPoint);
        this._lastCoord = coord;
        this._lastPoint = point;
        this.target.setCoordinates(this.target.getCoordinates().add(coordOffset));
        eventParam['coordOffset'] = coordOffset;
        eventParam['pointOffset'] = pointOffset;
        target.fire('dragging', eventParam);
    };
    _proto2._endDrag = function(param) {
        var target = this.target, map = target.getMap();
        if (this._dragHandler) {
            target.off('click', this._endDrag, this);
            this._dragHandler.disable();
            delete this._dragHandler;
        }
        delete this._lastCoord;
        delete this._lastPoint;
        this._isDragging = false;
        if (!map) return;
        var eventParam = map._parseEvent(param['domEvent']);
        target.fire('dragend', eventParam);
    };
    _proto2.isDragging = function() {
        if (!this._isDragging) return false;
        return true;
    };
    return UIMarkerDragHandler;
}(Handler$1);
maptalks_es_UIMarker.addInitHook('addHandler', 'draggable', maptalks_es_UIMarkerDragHandler);
var options$l = {
    containerClass: 'maptalks-msgBox',
    autoPan: true,
    autoCloseOn: null,
    autoOpenOn: 'click',
    width: 300,
    minHeight: 120,
    custom: false,
    title: null,
    content: null
};
var maptalks_es_InfoWindow = function(_UIComponent) {
    _inheritsLoose(InfoWindow, _UIComponent);
    function InfoWindow() {
        return _UIComponent.apply(this, arguments) || this;
    }
    var _proto = InfoWindow.prototype;
    _proto._getClassName = function() {
        return 'InfoWindow';
    };
    _proto.addTo = function(owner) {
        if (owner instanceof maptalks_es_Geometry) {
            if (owner.getInfoWindow() && owner.getInfoWindow() !== this) owner.removeInfoWindow();
            owner._infoWindow = this;
        }
        return _UIComponent.prototype.addTo.call(this, owner);
    };
    _proto.setContent = function(content) {
        var old = this.options['content'];
        this.options['content'] = content;
        this.fire('contentchange', {
            old: old,
            new: content
        });
        if (this.isVisible()) this.show(this._coordinate);
        return this;
    };
    _proto.getContent = function() {
        return this.options['content'];
    };
    _proto.setTitle = function(title) {
        var old = title;
        this.options['title'] = title;
        this.fire('contentchange', {
            old: old,
            new: title
        });
        if (this.isVisible()) this.show(this._coordinate);
        return this;
    };
    _proto.getTitle = function() {
        return this.options['title'];
    };
    _proto.buildOn = function() {
        if (this.options['custom']) {
            if (!isString(this.options['content'])) return this.options['content'];
            var _dom = createEl('div');
            _dom.innerHTML = this.options['content'];
            return _dom;
        }
        var dom = createEl('div');
        if (this.options['containerClass']) dom.className = this.options['containerClass'];
        dom.style.width = this._getWindowWidth() + 'px';
        dom.style.bottom = '0px';
        var content = '<em class="maptalks-ico"></em>';
        if (this.options['title']) content += '<h2>' + this.options['title'] + '</h2>';
        content += '<a href="javascript:void(0);" class="maptalks-close"></a><div class="maptalks-msgContent"></div>';
        dom.innerHTML = content;
        var msgContent = dom.querySelector('.maptalks-msgContent');
        if (isString(this.options['content'])) msgContent.innerHTML = this.options['content'];
        else msgContent.appendChild(this.options['content']);
        this._onCloseBtnClick = this.hide.bind(this);
        var closeBtn = dom.querySelector('.maptalks-close');
        addDomEvent(closeBtn, 'click touchend', this._onCloseBtnClick);
        return dom;
    };
    _proto.getTransformOrigin = function() {
        var size = this.getSize();
        return size.width / 2 + 'px bottom';
    };
    _proto.getOffset = function() {
        var size = this.getSize();
        var o = new maptalks_es_Point(-size['width'] / 2, 0);
        if (this.options['custom']) o._sub(0, size['height']);
        else o._sub(4, 12);
        var owner = this.getOwner();
        if (owner instanceof maptalks_es_Marker || owner instanceof maptalks_es_MultiPoint) {
            var painter, markerSize;
            if (owner instanceof maptalks_es_Marker) {
                painter = owner._getPainter();
                markerSize = owner.getSize();
            } else {
                var children = owner.getGeometries();
                if (!children || !children.length) return o;
                painter = children[0]._getPainter();
                markerSize = children[0].getSize();
            }
            if (painter) {
                var fixExtent = painter.getFixedExtent();
                o._add(fixExtent.xmax - markerSize.width / 2, fixExtent.ymin);
            } else o._add(0, -markerSize.height);
        }
        return o;
    };
    _proto.show = function(coordinate) {
        if (!this.getMap()) return this;
        if (!this.getMap().options['enableInfoWindow']) return this;
        return _UIComponent.prototype.show.call(this, coordinate);
    };
    _proto.getEvents = function() {
        if (!this.options['autoCloseOn']) return null;
        var events = {};
        events[this.options['autoCloseOn']] = this.hide;
        return events;
    };
    _proto.getOwnerEvents = function() {
        var owner = this.getOwner();
        if (!this.options['autoOpenOn'] || !owner) return null;
        var events = {};
        events[this.options['autoOpenOn']] = this._onAutoOpen;
        return events;
    };
    _proto.onRemove = function() {
        this.onDomRemove();
    };
    _proto.onDomRemove = function() {
        if (this._onCloseBtnClick) {
            var dom = this.getDOM();
            var closeBtn = dom.childNodes[2];
            removeDomEvent(closeBtn, 'click touchend', this._onCloseBtnClick);
            delete this._onCloseBtnClick;
        }
    };
    _proto._onAutoOpen = function(e) {
        var _this = this;
        var owner = this.getOwner();
        setTimeout(function() {
            if (owner instanceof maptalks_es_Marker || owner instanceof maptalks_es_UIComponent) _this.show(owner.getCoordinates());
            else if (owner instanceof maptalks_es_MultiPoint) _this.show(owner.findClosest(e.coordinate));
            else if (owner instanceof maptalks_es_LineString || owner instanceof maptalks_es_MultiLineString) {
                if (_this.getMap().getScale() >= 8) e.coordinate = _this._rectifyMouseCoordinte(owner, e.coordinate);
                _this.show(e.coordinate);
            } else _this.show(e.coordinate);
        }, 1);
    };
    _proto._rectifyMouseCoordinte = function(owner, mouseCoordinate) {
        var _this2 = this;
        if (owner instanceof maptalks_es_LineString) return this._rectifyLineStringMouseCoordinate(owner, mouseCoordinate).coordinate;
        if (owner instanceof maptalks_es_MultiLineString) return owner.getGeometries().map(function(lineString) {
            return _this2._rectifyLineStringMouseCoordinate(lineString, mouseCoordinate);
        }).sort(function(a, b) {
            return a.dis - b.dis;
        })[0].coordinate;
        return mouseCoordinate;
    };
    _proto._rectifyLineStringMouseCoordinate = function(lineString, mouseCoordinate) {
        var _this3 = this;
        var pts = lineString.getCoordinates().map(function(coordinate) {
            return _this3.getMap().coordToContainerPoint(coordinate);
        });
        var mousePt = this.getMap().coordToContainerPoint(mouseCoordinate);
        var minDis = 1 / 0, coordinateIndex = -1;
        for(var i = 0, len = pts.length; i < len; i++){
            var pt = pts[i];
            var dis = mousePt.distanceTo(pt);
            if (dis < minDis) {
                minDis = dis;
                coordinateIndex = i;
            }
        }
        var filterPts = [];
        if (0 === coordinateIndex) filterPts.push(pts[0], pts[1]);
        else if (coordinateIndex === pts.length - 1) filterPts.push(pts[coordinateIndex - 1], pts[coordinateIndex]);
        else filterPts.push(pts[coordinateIndex - 1], pts[coordinateIndex], pts[coordinateIndex + 1]);
        var xys = [];
        var _this$getMap$getSize = this.getMap().getSize(), width = _this$getMap$getSize.width, height = _this$getMap$getSize.height;
        for(var _i = 0, _len = filterPts.length - 1; _i < _len; _i++){
            var pt1 = filterPts[_i], pt2 = filterPts[_i + 1];
            if (pt1.x === pt2.x) {
                var miny = Math.max(0, Math.min(pt1.y, pt2.y));
                var maxy = Math.min(height, Math.max(pt1.y, pt2.y));
                for(var y = miny; y <= maxy; y++)xys.push(new maptalks_es_Point(pt1.x, y));
            } else {
                var k = (pt2.y - pt1.y) / (pt2.x - pt1.x);
                var minx = Math.max(0, Math.min(pt1.x, pt2.x));
                var maxx = Math.min(width, Math.max(pt1.x, pt2.x));
                for(var x = minx; x <= maxx; x++){
                    var _y = k * (x - pt1.x) + pt1.y;
                    xys.push(new maptalks_es_Point(x, _y));
                }
            }
        }
        var minPtDis = 1 / 0, ptIndex = -1;
        for(var _i2 = 0, _len2 = xys.length; _i2 < _len2; _i2++){
            var _pt = xys[_i2];
            var _dis = mousePt.distanceTo(_pt);
            if (_dis < minPtDis) {
                minPtDis = _dis;
                ptIndex = _i2;
            }
        }
        return {
            dis: minPtDis,
            coordinate: ptIndex < 0 ? mouseCoordinate : this.getMap().containerPointToCoord(xys[ptIndex])
        };
    };
    _proto._getWindowWidth = function() {
        var defaultWidth = 300;
        var width = this.options['width'];
        if (!width) width = defaultWidth;
        return width;
    };
    return InfoWindow;
}(maptalks_es_UIComponent);
maptalks_es_InfoWindow.mergeOptions(options$l);
var options$m = {
    width: 0,
    height: 0,
    animation: 'fade',
    containerClass: 'maptalks-tooltip',
    showTimeout: 400
};
var maptalks_es_ToolTip = function(_UIComponent) {
    _inheritsLoose(ToolTip, _UIComponent);
    var _proto = ToolTip.prototype;
    _proto._getClassName = function() {
        return 'ToolTip';
    };
    function ToolTip(content, options) {
        var _this;
        if (void 0 === options) options = {};
        _this = _UIComponent.call(this, options) || this;
        _this._content = content;
        return _this;
    }
    _proto.addTo = function(owner) {
        if (ToolTip.isSupport(owner)) {
            owner.on('mousemove', this.onMouseMove, this);
            owner.on('mouseout', this.onMouseOut, this);
            return _UIComponent.prototype.addTo.call(this, owner);
        }
        throw new Error('Invalid geometry or UIMarker the tooltip is added to.');
    };
    _proto.setStyle = function(cssName) {
        this.options.containerClass = cssName;
        return this;
    };
    _proto.getStyle = function() {
        return this.options.containerClass;
    };
    _proto.getContent = function() {
        return this._content;
    };
    _proto.buildOn = function() {
        var dom = createEl('div');
        var options = this.options || {};
        if (options.height) dom.style.height = options.height + 'px';
        if (options.width) dom.style.width = options.width + 'px';
        var cssName = options.containerClass || options.cssName;
        if (!cssName && options.height) dom.style.lineHeight = options.height + 'px';
        dom.innerHTML = "<div class=\"" + cssName + "\">" + this._content + "</div>";
        return dom;
    };
    _proto.onMouseOut = function() {
        clearTimeout(this._timeout);
        if (this.isVisible()) this._removePrevDOM();
    };
    _proto.onMouseMove = function(e) {
        var _this2 = this;
        clearTimeout(this._timeout);
        var map = this.getMap();
        if (!map) return;
        var coord = map.locateByPoint(e.coordinate, -5, 25);
        if (0 === this.options['showTimeout']) this.show(coord);
        else this._timeout = setTimeout(function() {
            if (map) _this2.show(coord);
        }, this.options['showTimeout']);
    };
    _proto.onRemove = function() {
        clearTimeout(this._timeout);
        if (this._owner) {
            this._owner.off('mouseover', this.onMouseOver, this);
            this._owner.off('mouseout', this.onMouseOut, this);
        }
    };
    _proto._getViewPoint = function() {
        return this.getMap().coordToViewPoint(this._coordinate, void 0, 0)._add(this.options['dx'], this.options['dy']);
    };
    return ToolTip;
}(maptalks_es_UIComponent);
maptalks_es_ToolTip.mergeOptions(options$m);
var defaultOptions = {
    containerClass: 'maptalks-menu',
    animation: null,
    animationDelay: 10,
    animationOnHide: false,
    autoPan: false,
    width: 160,
    maxHeight: 0,
    custom: false,
    items: []
};
var maptalks_es_Menu = function(_UIComponent) {
    _inheritsLoose(Menu, _UIComponent);
    function Menu(options) {
        return _UIComponent.call(this, options) || this;
    }
    var _proto = Menu.prototype;
    _proto._getClassName = function() {
        return 'Menu';
    };
    _proto.addTo = function(owner) {
        if (owner._menu && owner._menu !== this) owner.removeMenu();
        owner._menu = this;
        return maptalks_es_UIComponent.prototype.addTo.apply(this, arguments);
    };
    _proto.setItems = function(items) {
        this.options['items'] = items;
        return this;
    };
    _proto.getItems = function() {
        return this.options['items'] || [];
    };
    _proto.buildOn = function() {
        if (this.options['custom']) {
            if (!isString(this.options['items'])) return this.options['items'];
            var container = createEl('div');
            container.innerHTML = this.options['items'];
            return container;
        }
        var dom = createEl('div');
        if (this.options['containerClass']) addClass(dom, this.options['containerClass']);
        dom.style.width = this._getMenuWidth() + 'px';
        var menuItems = this._createMenuItemDom();
        dom.appendChild(menuItems);
        on(dom, 'contextmenu', preventDefault);
        return dom;
    };
    _proto.getOffset = function() {
        if (!this.getMap()) return null;
        var mapSize = this.getMap().getSize(), p = this.getMap().viewPointToContainerPoint(this._getViewPoint()), size = this.getSize();
        var dx = 0, dy = 0;
        if (p.x + size['width'] > mapSize['width']) dx = -size['width'];
        if (p.y + size['height'] > mapSize['height']) dy = -size['height'];
        return new maptalks_es_Point(dx, dy);
    };
    _proto.getTransformOrigin = function() {
        var p = this.getOffset()._multi(-1);
        return p.x + 'px ' + p.y + 'px';
    };
    _proto.getEvents = function() {
        return {
            '_zoomstart _zoomend _movestart _dblclick _click': this._removePrevDOM
        };
    };
    _proto._createMenuItemDom = function() {
        var me = this;
        var map = this.getMap();
        var ul = createEl('ul');
        addClass(ul, 'maptalks-menu-items');
        var items = this.getItems();
        function onMenuClick(index) {
            return function(e) {
                var param = map._parseEvent(e, 'click');
                param['target'] = me;
                param['owner'] = me._owner;
                param['index'] = index;
                var result = this._callback(param);
                if (false === result) return;
                me.hide();
            };
        }
        var item, itemDOM;
        for(var i = 0, len = items.length; i < len; i++){
            item = items[i];
            if ('-' === item || '_' === item) {
                itemDOM = createEl('li');
                addClass(itemDOM, 'maptalks-menu-splitter');
            } else {
                itemDOM = createEl('li');
                var itemTitle = item['item'];
                if (isFunction(itemTitle)) itemTitle = itemTitle({
                    owner: this._owner,
                    index: i
                });
                itemDOM.innerHTML = itemTitle;
                itemDOM._callback = item['click'];
                on(itemDOM, 'click', onMenuClick(i));
            }
            ul.appendChild(itemDOM);
        }
        var maxHeight = this.options['maxHeight'] || 0;
        if (maxHeight > 0) maptalks_es_setStyle(ul, 'max-height: ' + maxHeight + 'px; overflow-y: auto;');
        return ul;
    };
    _proto._getMenuWidth = function() {
        var defaultWidth = 160;
        var width = this.options['width'] || defaultWidth;
        return width;
    };
    return Menu;
}(maptalks_es_UIComponent);
maptalks_es_Menu.mergeOptions(defaultOptions);
var Menuable = {
    setMenu: function(options) {
        this._menuOptions = options;
        if (this._menu) this._menu.setOptions(options);
        else this.on('contextmenu', this._defaultOpenMenu, this);
        return this;
    },
    openMenu: function(coordinate) {
        var map = this instanceof Map$1 ? this : this.getMap();
        if (!coordinate) coordinate = this.getCenter();
        if (this._menu) this._menu.show(coordinate);
        else if (this._menuOptions && map) {
            this._bindMenu(this._menuOptions);
            this._menu.show(coordinate);
        }
        return this;
    },
    setMenuItems: function(items) {
        if (!this._menuOptions) this._menuOptions = {};
        if (Array.isArray(items)) this._menuOptions['custom'] = false;
        this._menuOptions['items'] = items;
        this.setMenu(this._menuOptions);
        return this;
    },
    getMenuItems: function() {
        if (this._menu) return this._menu.getItems();
        if (this._menuOptions) return this._menuOptions['items'] || [];
        return [];
    },
    closeMenu: function() {
        if (this._menu) this._menu.hide();
        return this;
    },
    removeMenu: function() {
        this.off('contextmenu', this._defaultOpenMenu, this);
        this._unbindMenu();
        delete this._menuOptions;
        return this;
    },
    _bindMenu: function(options) {
        this._menu = new maptalks_es_Menu(options);
        this._menu.addTo(this);
        return this;
    },
    _unbindMenu: function() {
        if (this._menu) {
            this.closeMenu();
            this._menu.remove();
            delete this._menu;
        }
        return this;
    },
    _defaultOpenMenu: function(param) {
        if (this.listens('contextmenu') > 1) return true;
        this.openMenu(param['coordinate']);
        return false;
    }
};
Map$1.include(Menuable);
maptalks_es_Geometry.include(Menuable);
var maptalks_es_Control = function(_Eventable) {
    _inheritsLoose(Control, _Eventable);
    function Control(options) {
        if (options && options['position'] && !isString(options['position'])) options['position'] = extend({}, options['position']);
        return _Eventable.call(this, options) || this;
    }
    var _proto = Control.prototype;
    _proto.addTo = function(map) {
        this.remove();
        if (!map.options['control']) return this;
        this._map = map;
        var controlContainer = map._panels.control;
        this.__ctrlContainer = createEl('div');
        maptalks_es_setStyle(this.__ctrlContainer, 'position:absolute;overflow:visible;');
        this.update();
        controlContainer.appendChild(this.__ctrlContainer);
        if (this.onAdd) this.onAdd();
        this.fire('add', {
            dom: controlContainer
        });
        return this;
    };
    _proto.update = function() {
        this.__ctrlContainer.innerHTML = '';
        this._controlDom = this.buildOn(this.getMap());
        if (this._controlDom) {
            this._updatePosition();
            this.__ctrlContainer.appendChild(this._controlDom);
        }
        return this;
    };
    _proto.getMap = function() {
        return this._map;
    };
    _proto.getPosition = function() {
        return extend({}, this._parse(this.options['position']));
    };
    _proto.setPosition = function(position) {
        if (isString(position)) this.options['position'] = position;
        else this.options['position'] = extend({}, position);
        this._updatePosition();
        return this;
    };
    _proto.getContainerPoint = function() {
        var position = this.getPosition();
        var size = this.getMap().getSize();
        var x, y;
        if (isNil(position['left'])) {
            if (!isNil(position['right'])) x = size['width'] - parseInt(position['right']);
        } else x = parseInt(position['left']);
        if (isNil(position['top'])) {
            if (!isNil(position['bottom'])) y = size['height'] - parseInt(position['bottom']);
        } else y = parseInt(position['top']);
        return new maptalks_es_Point(x, y);
    };
    _proto.getContainer = function() {
        return this.__ctrlContainer;
    };
    _proto.getDOM = function() {
        return this._controlDom;
    };
    _proto.show = function() {
        this.__ctrlContainer.style.display = '';
        return this;
    };
    _proto.hide = function() {
        this.__ctrlContainer.style.display = 'none';
        return this;
    };
    _proto.isVisible = function() {
        return this.__ctrlContainer && '' === this.__ctrlContainer.style.display;
    };
    _proto.remove = function() {
        if (!this._map) return this;
        removeDomNode(this.__ctrlContainer);
        if (this.onRemove) this.onRemove();
        delete this._map;
        delete this.__ctrlContainer;
        delete this._controlDom;
        this.fire('remove');
        return this;
    };
    _proto._parse = function(position) {
        var p = position;
        if (isString(position)) p = Control['positions'][p];
        return p;
    };
    _proto._updatePosition = function() {
        var position = this.getPosition();
        if (!position) position = {
            top: 20,
            left: 20
        };
        for(var p in position)if (position.hasOwnProperty(p)) {
            position[p] = parseInt(position[p]);
            this.__ctrlContainer.style[p] = position[p] + 'px';
        }
        this.fire('positionchange', {
            position: extend({}, position)
        });
    };
    return Control;
}(maptalks_es_Eventable(maptalks_es_Class));
maptalks_es_Control.positions = {
    'top-left': {
        top: 20,
        left: 20
    },
    'top-right': {
        top: 20,
        right: 20
    },
    'bottom-left': {
        bottom: 20,
        left: 20
    },
    'bottom-right': {
        bottom: 20,
        right: 20
    }
};
Map$1.mergeOptions({
    control: true
});
Map$1.include({
    addControl: function(control) {
        if (this._containerDOM.getContext) return this;
        control.addTo(this);
        return this;
    },
    removeControl: function(control) {
        if (!control || control.getMap() !== this) return this;
        control.remove();
        return this;
    }
});
var options$n = {
    position: {
        bottom: 0,
        left: 0
    },
    content: '<a href="http://maptalks.org" target="_blank">maptalks</a>'
};
var layerEvents = 'addlayer removelayer setbaselayer baselayerremove';
var maptalks_es_Attribution = function(_Control) {
    _inheritsLoose(Attribution, _Control);
    function Attribution() {
        return _Control.apply(this, arguments) || this;
    }
    var _proto = Attribution.prototype;
    _proto.buildOn = function() {
        this._attributionContainer = createEl('div');
        this._attributionContainer.className = 'maptalks-attribution';
        this._update();
        return this._attributionContainer;
    };
    _proto.onAdd = function() {
        this.getMap().on(layerEvents, this._update, this);
    };
    _proto.onRemove = function() {
        this.getMap().off(layerEvents, this._update, this);
    };
    _proto._update = function() {
        var map = this.getMap();
        if (!map) return;
        var attributions = map._getLayers(function(layer) {
            return layer.options['attribution'];
        }).reverse().map(function(layer) {
            return layer.options['attribution'];
        });
        var content = this.options['content'] + (attributions.length > 0 ? ' - ' + attributions.join(', ') : '');
        this._attributionContainer.innerHTML = '<span style="padding:0px 4px">' + content + '</span>';
    };
    return Attribution;
}(maptalks_es_Control);
maptalks_es_Attribution.mergeOptions(options$n);
Map$1.mergeOptions({
    attribution: true
});
Map$1.addOnLoadHook(function() {
    var a = this.options['attribution'] || this.options['attributionControl'];
    if (a) {
        this.attributionControl = new maptalks_es_Attribution(a);
        this.addControl(this.attributionControl);
    }
});
var options$o = {
    position: 'top-right',
    baseTitle: 'Base Layers',
    overlayTitle: 'Layers',
    excludeLayers: [],
    containerClass: 'maptalks-layer-switcher'
};
var maptalks_es_LayerSwitcher = function(_Control) {
    _inheritsLoose(LayerSwitcher, _Control);
    function LayerSwitcher() {
        return _Control.apply(this, arguments) || this;
    }
    var _proto = LayerSwitcher.prototype;
    _proto.buildOn = function() {
        var container = this.container = createEl('div', this.options['containerClass']), panel = this.panel = createEl('div', 'panel'), button = this.button = createEl('button');
        container.appendChild(button);
        container.appendChild(panel);
        return container;
    };
    _proto.onAdd = function() {
        on(this.button, 'mouseover', this._show, this);
        on(this.panel, 'mouseleave', this._hide, this);
        on(this.getMap(), 'click', this._hide, this);
    };
    _proto.onRemove = function() {
        if (this.panel) {
            off(this.button, 'mouseover', this._show, this);
            off(this.panel, 'mouseleave', this._hide, this);
            off(this.getMap(), 'click', this._hide, this);
            removeDomNode(this.panel);
            removeDomNode(this.button);
            delete this.panel;
            delete this.button;
            delete this.container;
        }
    };
    _proto._show = function() {
        if (!hasClass(this.container, 'shown')) {
            addClass(this.container, 'shown');
            this._createPanel();
        }
    };
    _proto._hide = function(e) {
        if (!this.panel.contains(e.toElement || e.relatedTarget)) setClass(this.container, this.options['containerClass']);
    };
    _proto._createPanel = function() {
        this.panel.innerHTML = '';
        var ul = createEl('ul');
        this.panel.appendChild(ul);
        this._renderLayers(this.getMap(), ul);
    };
    _proto._renderLayers = function(map, elm) {
        var base = map.getBaseLayer(), layers = map.getLayers(), len = layers.length;
        if (base) {
            var baseLayers = base.layers || [
                base
            ], li = createEl('li', 'group'), ul = createEl('ul'), label = createEl('label');
            label.innerHTML = this.options['baseTitle'];
            li.appendChild(label);
            for(var i = 0, _len = baseLayers.length; i < _len; i++){
                var layer = baseLayers[i];
                if (this._isExcluded(layer)) {
                    ul.appendChild(this._renderLayer(baseLayers[i], true));
                    li.appendChild(ul);
                    elm.appendChild(li);
                }
            }
        }
        if (len) {
            var _li = createEl('li', 'group'), _ul = createEl('ul'), _label = createEl('label');
            _label.innerHTML = this.options['overlayTitle'];
            _li.appendChild(_label);
            for(var _i = 0; _i < len; _i++){
                var _layer = layers[_i];
                if (this._isExcluded(_layer)) _ul.appendChild(this._renderLayer(_layer));
            }
            _li.appendChild(_ul);
            elm.appendChild(_li);
        }
    };
    _proto._isExcluded = function(layer) {
        var id = layer.getId(), excludeLayers = this.options['excludeLayers'];
        return !(excludeLayers.length && excludeLayers.indexOf(id) >= 0);
    };
    _proto._renderLayer = function(layer, isBase) {
        var _this = this;
        var li = createEl('li', 'layer'), label = createEl('label'), input = createEl('input'), map = this.getMap();
        var visible = layer.options['visible'];
        layer.options['visible'] = true;
        var enabled = layer.isVisible();
        layer.options['visible'] = visible;
        li.className = 'layer';
        if (isBase) {
            input.type = 'radio';
            input.name = 'base';
        } else input.type = 'checkbox';
        input.checked = visible && enabled;
        if (!enabled) input.setAttribute('disabled', 'disabled');
        input.onchange = function(e) {
            if ('radio' === e.target.type) {
                var baseLayer = map.getBaseLayer(), baseLayers = baseLayer.layers;
                if (baseLayers) for(var i = 0, len = baseLayers.length; i < len; i++){
                    var _baseLayer = baseLayers[i];
                    _baseLayer[_baseLayer === layer ? 'show' : 'hide']();
                }
                else if (!baseLayer.isVisible()) baseLayer.show();
                map._fireEvent('setbaselayer');
            } else layer[e.target.checked ? 'show' : 'hide']();
            _this.fire('layerchange', {
                target: layer
            });
        };
        li.appendChild(input);
        label.innerHTML = layer.getId();
        li.appendChild(label);
        return li;
    };
    return LayerSwitcher;
}(maptalks_es_Control);
maptalks_es_LayerSwitcher.mergeOptions(options$o);
Map$1.mergeOptions({
    layerSwitcherControl: false
});
Map$1.addOnLoadHook(function() {
    if (this.options['layerSwitcherControl']) {
        this.layerSwitcherControl = new maptalks_es_LayerSwitcher(this.options['layerSwitcherControl']);
        this.addControl(this.layerSwitcherControl);
    }
});
var options$p = {
    level: 4,
    position: {
        right: 1,
        bottom: 1
    },
    size: [
        300,
        200
    ],
    maximize: true,
    symbol: {
        lineWidth: 3,
        lineColor: '#1bbc9b',
        polygonFill: '#1bbc9b',
        polygonOpacity: 0.4
    },
    containerClass: 'maptalks-overview',
    buttonClass: 'maptalks-overview-button'
};
var maptalks_es_Overview = function(_Control) {
    _inheritsLoose(Overview, _Control);
    function Overview() {
        return _Control.apply(this, arguments) || this;
    }
    var _proto = Overview.prototype;
    _proto.buildOn = function() {
        var size = this.options['size'];
        if (!this.options['maximize']) size = [
            0,
            0
        ];
        var container = createEl('div');
        var mapContainer = this.mapContainer = createEl('div');
        mapContainer.style.width = size[0] + 'px';
        mapContainer.style.height = size[1] + 'px';
        mapContainer.className = this.options['containerClass'];
        var button = this.button = createEl('div');
        button.className = this.options['buttonClass'];
        container.appendChild(mapContainer);
        container.appendChild(button);
        return container;
    };
    _proto.onAdd = function() {
        if (this.options['maximize']) this._createOverview();
        this.getMap().on('resize moving zooming rotate dragrotating viewchange', this._update, this).on('setbaselayer', this._updateBaseLayer, this).on('spatialreferencechange', this._updateSpatialReference, this);
        on(this.button, 'click', this._onButtonClick, this);
        this._updateButtonText();
    };
    _proto.onRemove = function() {
        this.getMap().off('resize moving zooming rotate dragrotating viewchange', this._update, this).off('setbaselayer', this._updateBaseLayer, this).off('spatialreferencechange', this._updateSpatialReference, this);
        if (this._overview) {
            this._overview.remove();
            delete this._overview;
            delete this._perspective;
        }
        off(this.button, 'click', this._onButtonClick, this);
    };
    _proto.maxmize = function() {
        var size = this.options['size'];
        var dom = this.mapContainer;
        dom.style.width = size[0] + 'px';
        dom.style.height = size[1] + 'px';
        this._createOverview();
        return this;
    };
    _proto.minimize = function() {
        if (this._overview) this._overview.remove();
        delete this._overview;
        delete this._perspective;
        var dom = this.mapContainer;
        dom.style.width = "0px";
        dom.style.height = "0px";
        return this;
    };
    _proto.getOverviewMap = function() {
        return this._overview;
    };
    _proto._onButtonClick = function() {
        if (this._overview) this.minimize();
        else this.maxmize();
        this._updateButtonText();
    };
    _proto._updateButtonText = function() {
        if (this._overview) this.button.innerHTML = '-';
        else this.button.innerHTML = '+';
    };
    _proto._createOverview = function() {
        var map = this.getMap(), dom = this.mapContainer;
        var options = map.config();
        extend(options, {
            center: map.getCenter(),
            zoom: this._getOverviewZoom(),
            zoomAnimationDuration: 150,
            pitch: 0,
            bearing: 0,
            scrollWheelZoom: false,
            checkSize: false,
            doubleClickZoom: false,
            touchZoom: false,
            control: false,
            draggable: false,
            maxExtent: null
        });
        this._overview = new Map$1(dom, options);
        this._updateBaseLayer();
        this._perspective = new maptalks_es_Polygon(this._getPerspectiveCoords(), {
            draggable: true,
            cursor: 'move',
            symbol: this.options['symbol']
        }).on('dragend', this._onDragEnd, this);
        new maptalks_es_VectorLayer('perspective_layer', this._perspective).addTo(this._overview);
        this.fire('load');
    };
    _proto._getOverviewZoom = function() {
        var map = this.getMap(), zoom = map.getZoom(), minZoom = map.getMinZoom(), level = this.options['level'];
        if (level > 0) {
            for(var i = level; i > 0; i--)if (zoom - i >= minZoom) return zoom - i;
        } else for(var _i = level; _i < 0; _i++)if (zoom - _i >= minZoom) return zoom - _i;
        return zoom;
    };
    _proto._onDragEnd = function() {
        var center = this._perspective.getCenter();
        this._overview.setCenter(center);
        this.getMap().panTo(center);
    };
    _proto._getPerspectiveCoords = function() {
        var map = this.getMap();
        return map.getContainerExtent().toArray().map(function(c) {
            return map.containerPointToCoordinate(c);
        });
    };
    _proto._update = function() {
        if (!this._overview) return;
        computeDomPosition(this._overview._containerDOM);
        var coords = this._getPerspectiveCoords();
        this._perspective.setCoordinates(coords);
        this._overview.setCenterAndZoom(this.getMap().getCenter(), this._getOverviewZoom());
    };
    _proto._updateSpatialReference = function() {
        if (!this._overview) return;
        var map = this.getMap();
        var spatialRef = map.options['spatialReference'];
        this._overview.setSpatialReference(spatialRef);
    };
    _proto._updateBaseLayer = function() {
        if (!this._overview) return;
        var map = this.getMap(), baseLayer = map.getBaseLayer();
        if (!baseLayer) {
            this._overview.setBaseLayer(null);
            return;
        }
        var layers = baseLayer.layers;
        var showIndex = 0;
        if (layers) for(var i = 0, l = layers.length; i < l; i++){
            var _layer = layers[i];
            if (_layer.isVisible()) {
                showIndex = i;
                break;
            }
        }
        var json = baseLayer.toJSON();
        var options = null;
        if (layers) {
            options = json.layers[showIndex].options;
            options.visible = true;
        } else options = json.options;
        this._overview.setMinZoom(options.minZoom || null).setMaxZoom(options.maxZoom || null);
        delete options.minZoom;
        delete options.maxZoom;
        delete json.options.canvas;
        json.options.visible = true;
        json.options.renderer = 'canvas';
        var layer = maptalks_es_Layer.fromJSON(json);
        for(var p in baseLayer)if (isFunction(baseLayer[p]) && baseLayer.hasOwnProperty(p) && baseLayer[p] !== baseLayer.constructor.prototype[p]) layer[p] = baseLayer[p];
        this._overview.setBaseLayer(layer);
    };
    return Overview;
}(maptalks_es_Control);
maptalks_es_Overview.mergeOptions(options$p);
Map$1.mergeOptions({
    overviewControl: false
});
Map$1.addOnLoadHook(function() {
    if (this.options['overviewControl']) {
        this.overviewControl = new maptalks_es_Overview(this.options['overviewControl']);
        this.addControl(this.overviewControl);
    }
});
var options$q = {
    position: 'top-right',
    draggable: true,
    custom: false,
    content: '',
    closeButton: true
};
var maptalks_es_Panel = function(_Control) {
    _inheritsLoose(Panel, _Control);
    function Panel() {
        return _Control.apply(this, arguments) || this;
    }
    var _proto = Panel.prototype;
    _proto.buildOn = function() {
        var dom;
        if (this.options['custom']) {
            if (isString(this.options['content'])) {
                dom = createEl('div');
                dom.innerHTML = this.options['content'];
            } else dom = this.options['content'];
        } else {
            dom = createEl('div', 'maptalks-panel');
            if (this.options['closeButton']) {
                var closeButton = createEl('a', 'maptalks-close');
                closeButton.href = 'javascript:;';
                closeButton.onclick = function() {
                    dom.style.display = 'none';
                };
                dom.appendChild(closeButton);
            }
            var panelContent = createEl('div', 'maptalks-panel-content');
            panelContent.innerHTML = this.options['content'];
            dom.appendChild(panelContent);
        }
        this.draggable = new maptalks_es_DragHandler(dom, {
            cancelOn: this._cancelOn.bind(this),
            ignoreMouseleave: true
        });
        this.draggable.on('dragstart', this._onDragStart, this).on('dragging', this._onDragging, this).on('dragend', this._onDragEnd, this);
        if (this.options['draggable']) this.draggable.enable();
        return dom;
    };
    _proto.update = function() {
        if (this.draggable) {
            this.draggable.disable();
            delete this.draggable;
        }
        return maptalks_es_Control.prototype.update.call(this);
    };
    _proto.setContent = function(content) {
        var old = this.options['content'];
        this.options['content'] = content;
        this.fire('contentchange', {
            old: old,
            new: content
        });
        if (this.isVisible()) this.update();
        return this;
    };
    _proto.getContent = function() {
        return this.options['content'];
    };
    _proto._cancelOn = function(domEvent) {
        var target = domEvent.srcElement || domEvent.target, tagName = target.tagName.toLowerCase();
        if ('button' === tagName || 'input' === tagName || 'select' === tagName || 'option' === tagName || 'textarea' === tagName) return true;
        return false;
    };
    _proto._onDragStart = function(param) {
        this._startPos = param['mousePos'];
        this._startPosition = extend({}, this.getPosition());
        this.fire('dragstart', param);
    };
    _proto._onDragging = function(param) {
        var pos = param['mousePos'];
        var offset = pos.sub(this._startPos);
        var startPosition = this._startPosition;
        var position = this.getPosition();
        if (!isNil(position['top'])) position['top'] = parseInt(startPosition['top']) + offset.y;
        if (!isNil(position['bottom'])) position['bottom'] = parseInt(startPosition['bottom']) - offset.y;
        if (!isNil(position['left'])) position['left'] = parseInt(startPosition['left']) + offset.x;
        if (!isNil(position['right'])) position['right'] = parseInt(startPosition['right']) - offset.x;
        this.setPosition(position);
        this.fire('dragging', param);
    };
    _proto._onDragEnd = function(param) {
        delete this._startPos;
        delete this._startPosition;
        this.fire('dragend', param);
    };
    _proto._getConnectPoints = function() {
        var map = this.getMap();
        var containerPoint = this.getContainerPoint();
        var dom = this.getDOM(), width = parseInt(dom.clientWidth), height = parseInt(dom.clientHeight);
        var anchors = [
            map.containerPointToCoordinate(containerPoint.add(width / 2, 0)),
            map.containerPointToCoordinate(containerPoint.add(width, height / 2)),
            map.containerPointToCoordinate(containerPoint.add(width / 2, height)),
            map.containerPointToCoordinate(containerPoint.add(0, height / 2))
        ];
        return anchors;
    };
    return Panel;
}(maptalks_es_Control);
maptalks_es_Panel.mergeOptions(options$q);
var options$r = {
    position: 'bottom-left',
    maxWidth: 100,
    metric: true,
    imperial: false,
    containerClass: null
};
var maptalks_es_Scale = function(_Control) {
    _inheritsLoose(Scale, _Control);
    function Scale() {
        return _Control.apply(this, arguments) || this;
    }
    var _proto = Scale.prototype;
    _proto.buildOn = function(map) {
        this._map = map;
        this._scaleContainer = createEl('div', this.options['containerClass']);
        this._addScales();
        map.on('zoomend', this._update, this);
        if (this._map._loaded) this._update();
        return this._scaleContainer;
    };
    _proto.onRemove = function() {
        this.getMap().off('zoomend', this._update, this);
    };
    _proto._addScales = function() {
        var css = "border: 2px solid #000000;border-top: none;line-height: 1.1;padding: 0px;color: #000000;font-size: 11px;text-align:center;white-space: nowrap;overflow: hidden;-moz-box-sizing: content-box;box-sizing: content-box;background: #fff; background: rgba(255, 255, 255, 0);";
        if (this.options['metric']) this._mScale = createElOn('div', this.options['containerClass'] ? null : css, this._scaleContainer);
        if (this.options['imperial']) this._iScale = createElOn('div', this.options['containerClass'] ? null : css, this._scaleContainer);
    };
    _proto._update = function() {
        var map = this._map;
        var maxMeters = map.pixelToDistance(this.options['maxWidth'], 0);
        this._updateScales(maxMeters);
    };
    _proto._updateScales = function(maxMeters) {
        if (this.options['metric'] && maxMeters) this._updateMetric(maxMeters);
        if (this.options['imperial'] && maxMeters) this._updateImperial(maxMeters);
    };
    _proto._updateMetric = function(maxMeters) {
        var meters = this._getRoundNum(maxMeters), label = meters < 1000 ? meters + ' m' : meters / 1000 + ' km';
        this._updateScale(this._mScale, label, meters / maxMeters);
    };
    _proto._updateImperial = function(maxMeters) {
        var maxFeet = 3.2808399 * maxMeters;
        var maxMiles, miles, feet;
        if (maxFeet > 5280) {
            maxMiles = maxFeet / 5280;
            miles = this._getRoundNum(maxMiles);
            this._updateScale(this._iScale, miles + ' mile', miles / maxMiles);
        } else {
            feet = this._getRoundNum(maxFeet);
            this._updateScale(this._iScale, feet + ' feet', feet / maxFeet);
        }
    };
    _proto._updateScale = function(scale, text, ratio) {
        scale['style']['width'] = Math.round(this.options['maxWidth'] * ratio) + 'px';
        scale['innerHTML'] = text;
    };
    _proto._getRoundNum = function(num) {
        var pow10 = Math.pow(10, (Math.floor(num) + '').length - 1);
        var d = num / pow10;
        d = d >= 10 ? 10 : d >= 5 ? 5 : d >= 3 ? 3 : d >= 2 ? 2 : 1;
        return pow10 * d;
    };
    return Scale;
}(maptalks_es_Control);
maptalks_es_Scale.mergeOptions(options$r);
Map$1.mergeOptions({
    scaleControl: false
});
Map$1.addOnLoadHook(function() {
    if (this.options['scaleControl']) {
        this.scaleControl = new maptalks_es_Scale(this.options['scaleControl']);
        this.addControl(this.scaleControl);
    }
});
var options$s = {
    height: 28,
    vertical: false,
    position: 'top-right',
    reverseMenu: false,
    items: {}
};
var maptalks_es_Toolbar = function(_Control) {
    _inheritsLoose(Toolbar, _Control);
    function Toolbar() {
        return _Control.apply(this, arguments) || this;
    }
    var _proto = Toolbar.prototype;
    _proto.buildOn = function(map) {
        this._map = map;
        var dom = createEl('div');
        var ul = createEl('ul', 'maptalks-toolbar-hx');
        dom.appendChild(ul);
        this.options['vertical'] ? addClass(dom, 'maptalks-toolbar-vertical') : addClass(dom, 'maptalks-toolbar-horizonal');
        var me = this;
        function onButtonClick(fn, index, childIndex, targetDom) {
            var item = me._getItems()[index];
            return function(e) {
                stopPropagation(e);
                return fn({
                    target: item,
                    index: index,
                    childIndex: childIndex,
                    dom: targetDom
                });
            };
        }
        var items = this.options['items'];
        if (isArrayHasData(items)) for(var i = 0, len = items.length; i < len; i++){
            var item = items[i];
            var li = createEl('li');
            if (28 !== this.options['height']) li.style.lineHeight = this.options['height'] + 'px';
            li.style.height = this.options['height'] + 'px';
            li.style.cursor = 'pointer';
            if (isHTML(item['item'])) {
                li.style.textAlign = 'center';
                var itemSize = measureDom('div', item['item']);
                li.innerHTML = '<div style="margin-top:' + (this.options['height'] - itemSize['height']) / 2 + 'px;">' + item['item'] + '</div>';
            } else li.innerHTML = item['item'];
            if (item['click']) on(li, 'click', onButtonClick(item['click'], i, null, li));
            if (isArrayHasData(item['children'])) {
                var dropMenu = this._createDropMenu(i);
                li.appendChild(dropMenu);
                li._menu = dropMenu;
                on(li, 'mouseover', function() {
                    this._menu.style.display = '';
                });
                on(li, 'mouseout', function() {
                    this._menu.style.display = 'none';
                });
            }
            ul.appendChild(li);
        }
        return dom;
    };
    _proto._createDropMenu = function(index) {
        var me = this;
        function onButtonClick(fn, index, childIndex) {
            var item = me._getItems()[index]['children'][childIndex];
            return function(e) {
                stopPropagation(e);
                return fn({
                    target: item,
                    index: index,
                    childIndex: childIndex
                });
            };
        }
        var menuDom = createEl('div', 'maptalks-dropMenu'), items = this._getItems(), len = items.length, menuUL = createEl('ul'), children = items[index]['children'];
        if (index === len - 1 && children) {
            menuDom.style.cssText = 'right: 0px;';
            menuUL.style.cssText = 'right: 0px;position: absolute;';
            if (this.options['reverseMenu']) menuUL.style.bottom = 0;
        }
        menuDom.appendChild(createEl('em', 'maptalks-ico'));
        var liWidth = 0;
        for(var i = 0, l = children.length; i < l; i++){
            var size = stringLength(children[i]['item'], '12px');
            if (size.width > liWidth) liWidth = size.width;
        }
        for(var _i = 0, _l = children.length; _i < _l; _i++){
            var child = children[_i];
            var li = createEl('li');
            li.innerHTML = '<a href="javascript:;">' + child['item'] + '</a>';
            li.style.cursor = 'pointer';
            li.style.width = liWidth + 24 + 'px';
            on(li.childNodes[0], 'click', onButtonClick(child['click'], index, _i));
            menuUL.appendChild(li);
        }
        if (this.options['vertical']) {
            var width = liWidth < 95 ? 95 : liWidth;
            if (this.options['reverseMenu']) menuDom.style.right = -(width + 20) + 'px';
            else menuDom.style.left = -(width + 20) + 'px';
        } else if (this.options['reverseMenu']) menuDom.style.bottom = '28px';
        else menuDom.style.top = '28px';
        menuDom.appendChild(menuUL);
        menuDom.style.display = 'none';
        return menuDom;
    };
    _proto._getItems = function() {
        return this.options['items'] || [];
    };
    return Toolbar;
}(maptalks_es_Control);
maptalks_es_Toolbar.mergeOptions(options$s);
var options$t = {
    position: 'top-left',
    slider: true,
    zoomLevel: true,
    seamless: false
};
var UNIT = 10;
var maptalks_es_Zoom = function(_Control) {
    _inheritsLoose(Zoom, _Control);
    function Zoom() {
        return _Control.apply(this, arguments) || this;
    }
    var _proto = Zoom.prototype;
    _proto.buildOn = function(map) {
        var options = this.options;
        var dom = createEl('div', 'maptalks-zoom');
        if (options['zoomLevel']) {
            var levelDOM = createEl('span', 'maptalks-zoom-zoomlevel');
            dom.appendChild(levelDOM);
            this._levelDOM = levelDOM;
        }
        var zoomDOM = createEl('div', 'maptalks-zoom-slider');
        var zoomInButton = createEl('a', 'maptalks-zoom-zoomin');
        zoomInButton.href = 'javascript:;';
        zoomInButton.innerHTML = '+';
        zoomDOM.appendChild(zoomInButton);
        this._zoomInButton = zoomInButton;
        if (options['slider']) {
            var box = createEl('div', 'maptalks-zoom-slider-box');
            var ruler = createEl('div', 'maptalks-zoom-slider-ruler');
            var reading = createEl('span', 'maptalks-zoom-slider-reading');
            var dot = createEl('span', 'maptalks-zoom-slider-dot');
            ruler.appendChild(reading);
            box.appendChild(ruler);
            box.appendChild(dot);
            zoomDOM.appendChild(box);
            this._sliderBox = box;
            this._sliderRuler = ruler;
            this._sliderReading = reading;
            this._sliderDot = dot;
        }
        var zoomOutButton = createEl('a', 'maptalks-zoom-zoomout');
        zoomOutButton.href = 'javascript:;';
        zoomOutButton.innerHTML = '-';
        zoomDOM.appendChild(zoomOutButton);
        this._zoomOutButton = zoomOutButton;
        dom.appendChild(zoomDOM);
        map.on('_zoomend _zooming _zoomstart _spatialreferencechange', this._update, this);
        this._update();
        this._registerDomEvents();
        return dom;
    };
    _proto.onRemove = function() {
        this.getMap().off('_zoomend _zooming _zoomstart _spatialreferencechange', this._update, this);
        if (this._zoomInButton) off(this._zoomInButton, 'click', this._onZoomInClick, this);
        if (this._zoomOutButton) off(this._zoomOutButton, 'click', this._onZoomOutClick, this);
        if (this._sliderRuler) {
            off(this._sliderRuler, 'click', this._onClickRuler, this);
            this.dotDragger.disable();
            delete this.dotDragger;
        }
    };
    _proto._update = function() {
        var map = this.getMap();
        if (this._sliderBox) {
            var totalRange = (map.getMaxZoom() - map.getMinZoom()) * UNIT;
            this._sliderBox.style.height = totalRange + 16 + 'px';
            this._sliderRuler.style.height = totalRange + 8 + 'px';
            this._sliderRuler.style.cursor = 'pointer';
            var zoomRange = (map.getMaxZoom() - map.getZoom()) * UNIT;
            this._sliderReading.style.height = (map.getZoom() - map.getMinZoom() + 1) * UNIT + 'px';
            this._sliderDot.style.top = zoomRange + 'px';
        }
        this._updateText();
    };
    _proto._updateText = function() {
        if (this._levelDOM) {
            var map = this.getMap();
            var zoom = map.getZoom();
            if (!isInteger(zoom)) zoom = Math.floor(10 * zoom) / 10;
            this._levelDOM.innerHTML = zoom;
        }
    };
    _proto._registerDomEvents = function() {
        if (this._zoomInButton) on(this._zoomInButton, 'click', this._onZoomInClick, this);
        if (this._zoomOutButton) on(this._zoomOutButton, 'click', this._onZoomOutClick, this);
        if (this._sliderRuler) {
            on(this._sliderRuler, 'click', this._onClickRuler, this);
            this.dotDragger = new maptalks_es_DragHandler(this._sliderDot, {
                ignoreMouseleave: true
            });
            this.dotDragger.on('dragstart', this._onDotDragstart, this).on('dragging dragend', this._onDotDrag, this).enable();
        }
    };
    _proto._onZoomInClick = function(e) {
        preventDefault(e);
        this.getMap().zoomIn();
    };
    _proto._onZoomOutClick = function(e) {
        preventDefault(e);
        this.getMap().zoomOut();
    };
    _proto._onClickRuler = function(e) {
        preventDefault(e);
        var map = this.getMap(), point = getEventContainerPoint(e, this._sliderRuler), h = point.y;
        var maxZoom = map.getMaxZoom(), zoom = Math.floor(maxZoom - h / UNIT);
        map.setZoom(zoom);
    };
    _proto._onDotDragstart = function(e) {
        preventDefault(e.domEvent);
        var map = this.getMap(), origin = map.getSize().toPoint()._multi(0.5);
        map.onZoomStart(map.getZoom(), origin);
    };
    _proto._onDotDrag = function(e) {
        preventDefault(e.domEvent);
        var map = this.getMap(), origin = map.getSize().toPoint()._multi(0.5), point = getEventContainerPoint(e.domEvent, this._sliderRuler), maxZoom = map.getMaxZoom(), minZoom = map.getMinZoom();
        var top = point.y, z = maxZoom - top / UNIT;
        if (maxZoom < z) {
            z = maxZoom;
            top = 0;
        } else if (minZoom > z) {
            z = minZoom;
            top = (maxZoom - minZoom) * UNIT;
        }
        if ('dragging' === e.type) map.onZooming(z, origin, 1);
        else if ('dragend' === e.type) {
            if (this.options['seamless']) map.onZoomEnd(z, origin);
            else map.onZoomEnd(Math.round(z), origin);
        }
        this._sliderDot.style.top = top + 'px';
        this._sliderReading.style.height = (map.getZoom() - minZoom + 1) * UNIT + 'px';
        this._updateText();
    };
    return Zoom;
}(maptalks_es_Control);
maptalks_es_Zoom.mergeOptions(options$t);
Map$1.mergeOptions({
    zoomControl: false
});
Map$1.addOnLoadHook(function() {
    if (this.options['zoomControl']) {
        this.zoomControl = new maptalks_es_Zoom(this.options['zoomControl']);
        this.addControl(this.zoomControl);
    }
});
var maptalks_es_TileSystem = function() {
    function TileSystem(sx, sy, ox, oy) {
        if (Array.isArray(sx)) {
            this.scale = {
                x: sx[0],
                y: sx[1]
            };
            this.origin = {
                x: sx[2],
                y: sx[3]
            };
        } else {
            this.scale = {
                x: sx,
                y: sy
            };
            this.origin = {
                x: ox,
                y: oy
            };
        }
    }
    TileSystem.getDefault = function(projection) {
        if ('baidu' === projection['code'].toLowerCase()) return 'baidu';
        if (projection['code'].toLowerCase() === 'EPSG:4326'.toLowerCase()) return 'tms-global-geodetic';
        if ('identity' === projection['code'].toLowerCase()) return [
            1,
            -1,
            0,
            0
        ];
        else return 'web-mercator';
    };
    return TileSystem;
}();
var semiCircum = 6378137 * Math.PI;
extend(maptalks_es_TileSystem, {
    'web-mercator': new maptalks_es_TileSystem([
        1,
        -1,
        -semiCircum,
        semiCircum
    ]),
    'tms-global-mercator': new maptalks_es_TileSystem([
        1,
        1,
        -semiCircum,
        -semiCircum
    ]),
    'tms-global-geodetic': new maptalks_es_TileSystem([
        1,
        1,
        -180,
        -90
    ]),
    baidu: new maptalks_es_TileSystem([
        1,
        1,
        0,
        0
    ])
});
var maptalks_es_TileConfig = function() {
    function TileConfig(map, tileSystem, fullExtent, tileSize) {
        this.map = map;
        this.tileSize = tileSize;
        this.fullExtent = fullExtent;
        this.prepareTileInfo(tileSystem, fullExtent);
        this._xScale = fullExtent['right'] >= fullExtent['left'] ? 1 : -1;
        this._yScale = fullExtent['top'] >= fullExtent['bottom'] ? 1 : -1;
        this._pointOrigin = map._prjToPoint(new maptalks_es_Point(this.tileSystem['origin']), map.getGLZoom());
        this._glRes = map.getResolution(map.getGLZoom());
    }
    var _proto = TileConfig.prototype;
    _proto.prepareTileInfo = function(tileSystem, fullExtent) {
        if (isString(tileSystem)) tileSystem = maptalks_es_TileSystem[tileSystem.toLowerCase()];
        else if (Array.isArray(tileSystem)) tileSystem = new maptalks_es_TileSystem(tileSystem);
        if (!tileSystem) throw new Error('Invalid TileSystem');
        this.tileSystem = tileSystem;
        var a = fullExtent['right'] > fullExtent['left'] ? 1 : -1, b = fullExtent['top'] > fullExtent['bottom'] ? -1 : 1, c = tileSystem['origin']['x'], d = tileSystem['origin']['y'];
        this.transformation = new maptalks_es_Transformation([
            a,
            b,
            c,
            d
        ]);
    };
    _proto._getTileNum = function(point, res) {
        var tileSystem = this.tileSystem, tileSize = this['tileSize'], delta = 1E-7;
        var tileX = Math.floor(delta * tileSystem['scale']['x'] + point.x / (tileSize['width'] * res));
        var tileY = Math.ceil(delta * tileSystem['scale']['y'] + point.y / (tileSize['height'] * res));
        return {
            x: tileSystem['scale']['x'] * tileX,
            y: tileSystem['scale']['y'] * tileY
        };
    };
    _proto.getTileIndex = function(pCoord, res, repeatWorld) {
        var tileSystem = this.tileSystem;
        var point = this.transformation.transform(pCoord, 1);
        var tileIndex = this._getTileNum(point, res);
        if (tileSystem['scale']['x'] < 0) tileIndex['x'] -= 1;
        if (tileSystem['scale']['y'] > 0) tileIndex['y'] -= 1;
        return this.getNeighorTileIndex(tileIndex['x'], tileIndex['y'], 0, 0, res, repeatWorld);
    };
    _proto.getNeighorTileIndex = function(tileX, tileY, offsetX, offsetY, res, repeatWorld) {
        var tileSystem = this.tileSystem;
        var x = tileX + tileSystem['scale']['x'] * offsetX;
        var y = tileY - tileSystem['scale']['y'] * offsetY;
        var out = false;
        var idx = x;
        var idy = y;
        var ext = this._getTileFullIndex(res);
        if (repeatWorld) {
            if (true === repeatWorld || 'x' === repeatWorld) {
                if (ext['xmax'] === ext['xmin']) x = ext['xmin'];
                else if (x < ext['xmin']) {
                    x = ext['xmax'] - (ext['xmin'] - x) % (ext['xmax'] - ext['xmin']);
                    if (x === ext['xmax']) x = ext['xmin'];
                } else if (x >= ext['xmax']) x = ext['xmin'] + (x - ext['xmin']) % (ext['xmax'] - ext['xmin']);
            }
            if (true === repeatWorld || 'y' === repeatWorld) {
                if (ext['ymax'] === ext['ymin']) y = ext['ymin'];
                else if (y >= ext['ymax']) y = ext['ymin'] + (y - ext['ymin']) % (ext['ymax'] - ext['ymin']);
                else if (y < ext['ymin']) {
                    y = ext['ymax'] - (ext['ymin'] - y) % (ext['ymax'] - ext['ymin']);
                    if (y === ext['ymax']) y = ext['ymin'];
                }
            }
        }
        if (x < ext['xmin'] || x > ext['xmax'] || y > ext['ymax'] || y < ext['ymin']) out = true;
        return {
            x: x,
            y: y,
            idx: idx,
            idy: idy,
            out: out
        };
    };
    _proto._getTileFullIndex = function(res) {
        if (!this._tileFullIndex) this._tileFullIndex = {};
        if (this._tileFullIndex[res]) return this._tileFullIndex[res];
        var ext = this.fullExtent;
        var transformation = this.transformation;
        var nwIndex = this._getTileNum(transformation.transform(new maptalks_es_Coordinate(ext['left'], ext['top']), 1), res);
        var seIndex = this._getTileNum(transformation.transform(new maptalks_es_Coordinate(ext['right'], ext['bottom']), 1), res);
        var tileSystem = this.tileSystem;
        if (tileSystem['scale']['x'] < 0) {
            nwIndex.x -= 1;
            seIndex.x -= 1;
        }
        if (tileSystem['scale']['y'] > 0) {
            nwIndex.y -= 1;
            seIndex.y -= 1;
        }
        this._tileFullIndex[res] = new maptalks_es_Extent(nwIndex, seIndex);
        return this._tileFullIndex[res];
    };
    _proto.getTilePrjNW = function(tileX, tileY, res) {
        var tileSystem = this.tileSystem;
        var tileSize = this['tileSize'];
        var y = tileSystem['origin']['y'] + this._yScale * tileSystem['scale']['y'] * (tileY + (1 === tileSystem['scale']['y'] ? 1 : 0)) * res * tileSize['height'];
        var x = tileSystem['origin']['x'] + this._xScale * tileSystem['scale']['x'] * (tileX + (1 === tileSystem['scale']['x'] ? 0 : 1)) * res * tileSize['width'];
        return new maptalks_es_Coordinate(x, y);
    };
    _proto.getTilePointNW = function(tileX, tileY, res) {
        var scale = this._glRes / res;
        var tileSystem = this.tileSystem;
        var tileSize = this['tileSize'];
        var y = this._pointOrigin.y * scale + this._yScale * tileSystem['scale']['y'] * (tileY + (1 === tileSystem['scale']['y'] ? 1 : 0)) * tileSize['height'];
        var x = this._pointOrigin.x * scale + this._xScale * tileSystem['scale']['x'] * (tileX + (1 === tileSystem['scale']['x'] ? 0 : 1)) * tileSize['width'];
        return new maptalks_es_Point(x, y);
    };
    _proto.getTilePrjSE = function(tileX, tileY, res) {
        var tileSystem = this.tileSystem;
        var tileSize = this['tileSize'];
        var y = tileSystem['origin']['y'] + this._yScale * tileSystem['scale']['y'] * (tileY + (1 === tileSystem['scale']['y'] ? 0 : 1)) * res * tileSize['height'];
        var x = tileSystem['origin']['x'] + this._xScale * tileSystem['scale']['x'] * (tileX + (1 === tileSystem['scale']['x'] ? 1 : 0)) * res * tileSize['width'];
        return new maptalks_es_Coordinate(x, y);
    };
    _proto.getTilePointSE = function(tileX, tileY, res) {
        var scale = this._glRes / res;
        var tileSystem = this.tileSystem;
        var tileSize = this['tileSize'];
        var y = this._pointOrigin.y * scale + this._yScale * tileSystem['scale']['y'] * (tileY + (1 === tileSystem['scale']['y'] ? 0 : 1)) * tileSize['height'];
        var x = this._pointOrigin.x * scale + this._xScale * tileSystem['scale']['x'] * (tileX + (1 === tileSystem['scale']['x'] ? 1 : 0)) * tileSize['width'];
        return new maptalks_es_Point(x, y);
    };
    _proto.getTilePrjExtent = function(tileX, tileY, res) {
        var nw = this.getTilePrjNW(tileX, tileY, res), se = this.getTilePrjSE(tileX, tileY, res);
        return new maptalks_es_Extent(nw, se);
    };
    return TileConfig;
}();
var planes = [];
for(var maptalks_es_i = 0; maptalks_es_i < 6; maptalks_es_i++)planes[maptalks_es_i] = [];
var maptalks_es_p = [];
function intersectsBox(matrix, box, mask) {
    setPlanes(matrix);
    for(var i = 0; i < 6; i++){
        if (!mask || '0' !== mask.charAt(i)) {
            var plane = planes[i];
            maptalks_es_p[0] = plane[0] > 0 ? box[1][0] : box[0][0];
            maptalks_es_p[1] = plane[1] > 0 ? box[1][1] : box[0][1];
            maptalks_es_p[2] = plane[2] > 0 ? box[1][2] : box[0][2];
            if (distanceToPoint(plane, maptalks_es_p) < 0) return false;
        }
    }
    return true;
}
function setPlanes(m) {
    var me = m;
    var me0 = me[0], me1 = me[1], me2 = me[2], me3 = me[3];
    var me4 = me[4], me5 = me[5], me6 = me[6], me7 = me[7];
    var me8 = me[8], me9 = me[9], me10 = me[10], me11 = me[11];
    var me12 = me[12], me13 = me[13], me14 = me[14], me15 = me[15];
    setComponents(planes[0], me3 - me0, me7 - me4, me11 - me8, me15 - me12);
    setComponents(planes[1], me3 + me0, me7 + me4, me11 + me8, me15 + me12);
    setComponents(planes[2], me3 + me1, me7 + me5, me11 + me9, me15 + me13);
    setComponents(planes[3], me3 - me1, me7 - me5, me11 - me9, me15 - me13);
    setComponents(planes[4], me3 - me2, me7 - me6, me11 - me10, me15 - me14);
    setComponents(planes[5], me3 + me2, me7 + me6, me11 + me10, me15 + me14);
}
var normalLength = 1.0 / 6;
function setComponents(out, x, y, z, w) {
    out[0] = x * normalLength;
    out[1] = y * normalLength;
    out[2] = z * normalLength;
    out[3] = w * normalLength;
    return out;
}
function distanceToPoint(plane, p) {
    return plane[0] * p[0] + plane[1] * p[1] + plane[2] * p[2] + plane[3];
}
var isSetAvailable = 'undefined' != typeof Set;
var maptalks_es_TileHashset = function() {
    function TileHashset() {
        this._table = isSetAvailable ? new Set() : {};
    }
    var _proto = TileHashset.prototype;
    _proto.add = function(key) {
        if (isSetAvailable) this._table.add(key);
        else this._table[key] = true;
    };
    _proto.has = function(key) {
        if (isSetAvailable) return this._table.has(key);
        return this._table[key];
    };
    _proto.reset = function() {
        if (isSetAvailable) this._table.clear();
        else this._table = {};
    };
    return TileHashset;
}();
var options$u = {
    urlTemplate: null,
    subdomains: null,
    errorUrl: null,
    repeatWorld: true,
    background: true,
    backgroundZoomDiff: 6,
    loadingLimitOnInteracting: 3,
    tileRetryCount: 0,
    placeholder: false,
    crossOrigin: null,
    tileSize: [
        256,
        256
    ],
    offset: [
        0,
        0
    ],
    tileSystem: null,
    fadeAnimation: !IS_NODE,
    debug: false,
    spatialReference: null,
    maxCacheSize: 256,
    renderer: function() {
        return Browser$1.webgl ? 'gl' : 'canvas';
    }(),
    clipByPitch: true,
    maxAvailableZoom: null,
    cascadeTiles: true,
    zoomOffset: 0
};
var URL_PATTERN$1 = /\{ *([\w_]+) *\}/g;
var TEMP_POINT = new maptalks_es_Point(0, 0);
var TEMP_POINT0$3 = new maptalks_es_Point(0, 0);
var TEMP_POINT1$1 = new maptalks_es_Point(0, 0);
var TEMP_POINT2 = new maptalks_es_Point(0, 0);
var TEMP_POINT3 = new maptalks_es_Point(0, 0);
var TEMP_POINT4 = new maptalks_es_Point(0, 0);
var TEMP_POINT6 = new maptalks_es_Point(0, 0);
var TILE_BOX = [
    [
        0,
        0,
        0
    ],
    [
        0,
        0,
        0
    ]
];
var ARR3 = [];
var maptalks_es_TileLayer = function(_Layer) {
    _inheritsLoose(TileLayer, _Layer);
    function TileLayer() {
        return _Layer.apply(this, arguments) || this;
    }
    TileLayer.fromJSON = function(layerJSON) {
        if (!layerJSON || 'TileLayer' !== layerJSON['type']) return null;
        return new TileLayer(layerJSON['id'], layerJSON['options']);
    };
    var _proto2 = TileLayer.prototype;
    _proto2.getTileSize = function() {
        if (this._tileSize) return this._tileSize;
        var size = this.options['tileSize'];
        if (isNumber(size)) size = [
            size,
            size
        ];
        this._tileSize = new maptalks_es_Size(size);
        return this._tileSize;
    };
    _proto2.getTiles = function(z, parentLayer) {
        var map = this.getMap();
        var pitch = map.getPitch();
        var parentRenderer = parentLayer && parentLayer.getRenderer();
        var mapExtent = map.getContainerExtent();
        var tileGrids = [];
        var count = 0;
        var minZoom = this.getMinZoom();
        var cascadePitch0 = map.options['cascadePitches'][0];
        var cascadePitch1 = map.options['cascadePitches'][1];
        var visualHeight1 = Math.floor(map._getVisualHeight(cascadePitch1));
        var tileZoom = isNil(z) ? this._getTileZoom(map.getZoom()) : z;
        this._visitedTiles = new maptalks_es_TileHashset();
        this._coordCache = {};
        if (!isNil(z) || !this.options['cascadeTiles'] || pitch <= cascadePitch0 || !isNil(minZoom) && tileZoom <= minZoom) {
            var containerExtent = pitch <= cascadePitch1 ? mapExtent : new maptalks_es_PointExtent(0, map.height - visualHeight1, map.width, map.height);
            var _currentTiles = this._getTiles(tileZoom, containerExtent, 2, parentRenderer);
            if (_currentTiles) {
                count += _currentTiles.tiles.length;
                tileGrids.push(_currentTiles);
            }
            return {
                tileGrids: tileGrids,
                count: count
            };
        }
        var visualHeight0 = Math.floor(map._getVisualHeight(cascadePitch0));
        var extent0 = new maptalks_es_PointExtent(0, map.height - visualHeight0, map.width, map.height);
        var currentTiles = this._getTiles(tileZoom, extent0, 0, parentRenderer);
        count += currentTiles ? currentTiles.tiles.length : 0;
        tileGrids.push(currentTiles);
        var cascadeHeight = extent0.ymin;
        var d = map.getSpatialReference().getZoomDirection();
        var cascadeLevels = d;
        var cascadeTiles1;
        if (pitch > cascadePitch1) {
            if (tileZoom - cascadeLevels <= minZoom) cascadeLevels = 0;
            var extent1 = new maptalks_es_PointExtent(0, map.height - visualHeight1, map.width, cascadeHeight);
            cascadeTiles1 = this._getTiles(tileZoom - cascadeLevels, extent1, 1, parentRenderer);
            count += cascadeTiles1 ? cascadeTiles1.tiles.length : 0;
            cascadeHeight = extent1.ymin;
            cascadeLevels += 4 * d;
        }
        var cascadeTiles2;
        if (tileZoom - cascadeLevels >= minZoom) {
            var extent2 = new maptalks_es_PointExtent(0, mapExtent.ymin, map.width, cascadeHeight);
            cascadeTiles2 = this._getTiles(tileZoom - cascadeLevels, extent2, 2, parentRenderer);
            count += cascadeTiles2 ? cascadeTiles2.tiles.length : 0;
            tileGrids.push(cascadeTiles2);
        }
        if (cascadeTiles1 && cascadeTiles2) {
            tileGrids[1] = cascadeTiles2;
            tileGrids[2] = cascadeTiles1;
        }
        return {
            tileGrids: tileGrids,
            count: count
        };
    };
    _proto2.getTileUrl = function(x, y, z) {
        var urlTemplate = this.options['urlTemplate'];
        var domain = '';
        if (this.options['subdomains']) {
            var subdomains = this.options['subdomains'];
            if (isArrayHasData(subdomains)) {
                var length$$1 = subdomains.length;
                var s = (x + y) % length$$1;
                if (s < 0) s = 0;
                domain = subdomains[s];
            }
        }
        if (isFunction(urlTemplate)) return urlTemplate(x, y, z, domain);
        var data = {
            x: x,
            y: y,
            z: z,
            s: domain
        };
        return urlTemplate.replace(URL_PATTERN$1, function(str, key) {
            var value = data[key];
            if (void 0 === value) throw new Error('No value provided for variable ' + str);
            if ('function' == typeof value) value = value(data);
            return value;
        });
    };
    _proto2.clear = function() {
        if (this._renderer) this._renderer.clear();
        this.fire('clear');
        return this;
    };
    _proto2.toJSON = function() {
        var profile = {
            type: this.getJSONType(),
            id: this.getId(),
            options: this.config()
        };
        return profile;
    };
    _proto2.getSpatialReference = function() {
        var map = this.getMap();
        if (map && (!this.options['spatialReference'] || maptalks_es_SpatialReference.equals(this.options['spatialReference'], map.options['spatialReference']))) return map.getSpatialReference();
        this._sr = this._sr || new maptalks_es_SpatialReference(this.options['spatialReference']);
        if (void 0 === this._srMinZoom) {
            this._srMinZoom = this._sr.getMinZoom();
            this._srMaxZoom = this._sr.getMaxZoom();
        }
        return this._sr;
    };
    _proto2.getMinZoom = function() {
        var sr = this.getSpatialReference();
        if (sr !== this.getMap().getSpatialReference()) return Math.max(_Layer.prototype.getMinZoom.call(this), this._srMinZoom);
        return _Layer.prototype.getMinZoom.call(this);
    };
    _proto2.getMaxZoom = function() {
        var sr = this.getSpatialReference();
        if (sr !== this.getMap().getSpatialReference()) return Math.min(_Layer.prototype.getMaxZoom.call(this), this._srMaxZoom);
        return _Layer.prototype.getMaxZoom.call(this);
    };
    _proto2._getTileZoom = function(zoom) {
        if (!isInteger(zoom)) zoom = Math.round(zoom);
        var maxZoom = this.options['maxAvailableZoom'];
        if (!isNil(maxZoom) && zoom > maxZoom) zoom = maxZoom;
        return zoom;
    };
    _proto2._getTiles = function(tileZoom, containerExtent, cascadeLevel, parentRenderer) {
        var _this = this;
        var map = this.getMap();
        var z = tileZoom;
        var frustumMatrix = map.projViewMatrix;
        if (cascadeLevel < 2) {
            if (0 === cascadeLevel) z -= 1;
            frustumMatrix = 0 === cascadeLevel ? map.cascadeFrustumMatrix0 : 1 === cascadeLevel ? map.cascadeFrustumMatrix1 : map.projViewMatrix;
        }
        var zoom = z + this.options['zoomOffset'];
        var offset = this._getTileOffset(zoom), hasOffset = offset[0] || offset[1];
        var emptyGrid = {
            zoom: z,
            extent: null,
            offset: offset,
            tiles: []
        };
        if (zoom < 0) return emptyGrid;
        var minZoom = this.getMinZoom(), maxZoom = this.getMaxZoom();
        if (!map || !this.isVisible() || !map.width || !map.height) return emptyGrid;
        if (!isNil(minZoom) && z < minZoom || !isNil(maxZoom) && z > maxZoom) return emptyGrid;
        var tileConfig = this._getTileConfig();
        if (!tileConfig) return emptyGrid;
        var tileOffsets = {
            zoom: offset
        };
        var sr = this.getSpatialReference();
        var mapSR = map.getSpatialReference();
        var res = sr.getResolution(zoom);
        var glScale = map.getGLScale(z);
        var repeatWorld = sr === mapSR && this.options['repeatWorld'];
        var extent2d = containerExtent.convertTo(function(c) {
            var result;
            if (c.y > 0 && c.y < map.height) {
                var key = (0 === c.x ? 0 : 1) + c.y;
                if (!_this._coordCache[key]) _this._coordCache[key] = map._containerPointToPoint(c);
                result = _this._coordCache[key];
            }
            result = map._containerPointToPoint(c, void 0, TEMP_POINT);
            return result;
        });
        var maskExtent = this._getMask2DExtent();
        if (maskExtent) {
            var intersection = maskExtent.intersection(extent2d);
            if (!intersection) return emptyGrid;
            containerExtent = intersection.convertTo(function(c) {
                return map._pointToContainerPoint(c, void 0, 0, TEMP_POINT);
            });
        }
        var prjCenter = map._containerPointToPrj(containerExtent.getCenter(), TEMP_POINT0$3);
        var centerPoint = map._prjToPoint(prjCenter, zoom, TEMP_POINT1$1);
        var c;
        c = hasOffset ? this._project(map._pointToPrj(centerPoint._add(offset), zoom, TEMP_POINT1$1), TEMP_POINT1$1) : this._project(prjCenter, TEMP_POINT1$1);
        var extentScale = map.getGLScale() / map.getGLScale(zoom);
        TEMP_POINT2.x = extent2d.xmin * extentScale;
        TEMP_POINT2.y = extent2d.ymax * extentScale;
        TEMP_POINT3.x = extent2d.xmax * extentScale;
        TEMP_POINT3.y = extent2d.ymin * extentScale;
        var pmin = this._project(map._pointToPrj(TEMP_POINT2._add(offset), zoom, TEMP_POINT2), TEMP_POINT2);
        var pmax = this._project(map._pointToPrj(TEMP_POINT3._add(offset), zoom, TEMP_POINT3), TEMP_POINT3);
        var centerTile = tileConfig.getTileIndex(c, res, repeatWorld);
        var ltTile = tileConfig.getTileIndex(pmin, res, repeatWorld);
        var rbTile = tileConfig.getTileIndex(pmax, res, repeatWorld);
        var top = Math.ceil(Math.abs(centerTile.idy - ltTile.idy)), left = Math.ceil(Math.abs(centerTile.idx - ltTile.idx)), bottom = Math.ceil(Math.abs(centerTile.idy - rbTile.idy)), right = Math.ceil(Math.abs(centerTile.idx - rbTile.idx));
        var allCount = (top + bottom + 1) * (left + right + 1);
        var tileSize = this.getTileSize();
        var renderer = this.getRenderer() || parentRenderer, scale = this._getTileConfig().tileSystem.scale;
        var tiles = [], extent = new maptalks_es_PointExtent();
        var tilePoint = new maptalks_es_Point(0, 0);
        for(var i = -top; i <= bottom; i++){
            var j = -left;
            var leftVisitEnd = -1 / 0;
            var rightVisitEnd = false;
            while(j >= leftVisitEnd && j <= right){
                var idx = tileConfig.getNeighorTileIndex(centerTile.idx, centerTile.idy, j, i, res, repeatWorld);
                if (leftVisitEnd === -1 / 0) j++;
                else j--;
                var tileId = this._getTileId(idx.idx, idx.idy, z);
                if (idx.out || this._visitedTiles && this._visitedTiles.has(tileId)) continue;
                var tileInfo = renderer && renderer.isTileCachedOrLoading(tileId);
                if (tileInfo) tileInfo = tileInfo.info;
                var p = void 0;
                if (tileInfo) {
                    var _tileInfo = tileInfo, _extent2d = _tileInfo.extent2d;
                    tilePoint.set(_extent2d.xmin, _extent2d.ymax);
                    p = tilePoint;
                } else if (this._hasOwnSR) {
                    var pnw = tileConfig.getTilePrjNW(idx.x, idx.y, res);
                    p = map._prjToPoint(this._unproject(pnw, TEMP_POINT3), z);
                } else p = tileConfig.getTilePointNW(idx.x, idx.y, res);
                var width = void 0, height = void 0;
                if (sr === mapSR) {
                    width = tileSize.width;
                    height = tileSize.height;
                } else {
                    var pp = void 0;
                    if (this._hasOwnSR) {
                        var pse = tileConfig.getTilePrjSE(idx.x, idx.y, res);
                        pp = map._prjToPoint(this._unproject(pse, TEMP_POINT3), z, TEMP_POINT3);
                    } else pp = tileConfig.getTilePointSE(idx.x, idx.y, res);
                    width = Math.ceil(Math.abs(pp.x - p.x));
                    height = Math.ceil(Math.abs(pp.y - p.y));
                }
                var dx = scale.x * (idx.idx - idx.x) * width, dy = scale.y * (idx.idy - idx.y) * height;
                if (!tileInfo && (dx || dy)) p._add(dx, dy);
                var tileExtent = tileInfo && tileInfo.extent2d || new maptalks_es_PointExtent(p.x, p.y - height, p.x + width, p.y);
                if (allCount <= 4 || rightVisitEnd || this._isTileInExtent(frustumMatrix, tileExtent, offset, glScale)) {
                    if (this._visitedTiles && 0 === cascadeLevel) this._visitedTiles.add(tileId);
                    if (0 === cascadeLevel) {
                        this._splitTiles(frustumMatrix, tiles, renderer, idx, z + 1, tileExtent, dx, dy, tileOffsets, parentRenderer);
                        extent._combine(tileExtent);
                    } else {
                        if (tileInfo) {
                            tileInfo.offset[0] = offset[0];
                            tileInfo.offset[1] = offset[1];
                        } else {
                            tileInfo = {
                                z: z,
                                x: idx.x,
                                y: idx.y,
                                extent2d: tileExtent,
                                offset: offset,
                                id: tileId,
                                url: this.getTileUrl(idx.x, idx.y, z)
                            };
                            if (parentRenderer) tileInfo['layer'] = this.getId();
                        }
                        tiles.push(tileInfo);
                        extent._combine(tileExtent);
                    }
                    if (leftVisitEnd === -1 / 0) {
                        leftVisitEnd = j;
                        j = right;
                    } else if (!rightVisitEnd) rightVisitEnd = true;
                }
            }
        }
        if (tiles.length) {
            var center = map._containerPointToPoint(containerExtent.getCenter(), z, TEMP_POINT)._add(offset);
            var point0 = new maptalks_es_Point(0, 0);
            var point1 = new maptalks_es_Point(0, 0);
            tiles.sort(function(a, b) {
                point0.set((a.extent2d.xmin + a.extent2d.xmax) / 2, (a.extent2d.ymin + a.extent2d.ymax) / 2);
                point1.set((b.extent2d.xmin + b.extent2d.xmax) / 2, (b.extent2d.ymin + b.extent2d.ymax) / 2);
                return point0.distanceTo(center) - point1.distanceTo(center);
            });
        }
        return {
            offset: offset,
            zoom: tileZoom,
            extent: extent,
            tiles: tiles
        };
    };
    _proto2._splitTiles = function(frustumMatrix, tiles, renderer, tileIdx, z, tileExtent, dx, dy, tileOffsets, parentRenderer) {
        var yOrder = this._getTileConfig().tileSystem.scale.y;
        var glScale = this.getMap().getGLScale(z);
        var corner = TEMP_POINT4.set(2 * tileExtent.xmin, yOrder < 0 ? 2 * tileExtent.ymax : 2 * tileExtent.ymin);
        var w = tileExtent.getWidth();
        var h = tileExtent.getHeight();
        var idx = 2 * tileIdx.idx;
        var idy = 2 * tileIdx.idy;
        var x = 2 * tileIdx.x;
        var y = 2 * tileIdx.y;
        var tile = this._checkAndAddTile(frustumMatrix, renderer, idx, idy, x, y, z, 0, 0, w, h, corner, glScale, tileOffsets, parentRenderer);
        if (tile) tiles.push(tile);
        tile = this._checkAndAddTile(frustumMatrix, renderer, idx, idy, x, y, z, 0, 1, w, h, corner, glScale, tileOffsets, parentRenderer);
        if (tile) tiles.push(tile);
        tile = this._checkAndAddTile(frustumMatrix, renderer, idx, idy, x, y, z, 1, 0, w, h, corner, glScale, tileOffsets, parentRenderer);
        if (tile) tiles.push(tile);
        tile = this._checkAndAddTile(frustumMatrix, renderer, idx, idy, x, y, z, 1, 1, w, h, corner, glScale, tileOffsets, parentRenderer);
        if (tile) tiles.push(tile);
    };
    _proto2._checkAndAddTile = function(frustumMatrix, renderer, idx, idy, x, y, z, i, j, w, h, corner, glScale, tileOffsets, parentRenderer) {
        var tileId = this._getTileId(idx + i, idy + j, z);
        if (this._visitedTiles && this._visitedTiles.has(tileId)) return null;
        var offset = tileOffsets[z];
        if (!offset) offset = tileOffsets[z] = this._getTileOffset(z);
        var yOrder = this._getTileConfig().tileSystem.scale.y;
        var childExtent = new maptalks_es_PointExtent(corner.x + i * w, corner.y + yOrder * j * h, corner.x + (i + 1) * w, corner.y + yOrder * (j + 1) * h);
        if (!this._isSplittedTileInExtent(frustumMatrix, childExtent, offset, glScale)) return null;
        var tileInfo = renderer && renderer.isTileCachedOrLoading(tileId);
        if (tileInfo) tileInfo = tileInfo.info;
        else {
            tileInfo = {
                z: z,
                x: x + i,
                y: y + j,
                extent2d: childExtent,
                id: tileId,
                offset: offset,
                url: this.getTileUrl(x + i, y + j, z + this.options['zoomOffset'])
            };
            if (parentRenderer) tileInfo['layer'] = this.getId();
        }
        return tileInfo;
    };
    _proto2._getTileOffset = function(z) {
        var offset = this.options['offset'];
        if (isFunction(offset)) offset = offset(z);
        return offset;
    };
    _proto2._getTileId = function(x, y, zoom, id) {
        return (id || this.getId()) + "_" + y + "_" + x + "_" + zoom;
    };
    _proto2._project = function(pcoord, out) {
        if (!this._hasOwnSR) return pcoord;
        var map = this.getMap();
        var mapProjection = map.getProjection();
        var projection = this.getSpatialReference().getProjection();
        return projection.project(mapProjection.unproject(pcoord, out), out);
    };
    _proto2._unproject = function(pcoord, out) {
        if (!this._hasOwnSR) return pcoord;
        var map = this.getMap();
        var sr = this.getSpatialReference();
        var mapProjection = map.getProjection();
        var projection = sr.getProjection();
        return mapProjection.project(projection.unproject(pcoord, out), out);
    };
    _proto2._initTileConfig = function() {
        var map = this.getMap(), tileSize = this.getTileSize();
        var sr = this.getSpatialReference();
        var projection = sr.getProjection(), fullExtent = sr.getFullExtent();
        this._defaultTileConfig = new maptalks_es_TileConfig(map, maptalks_es_TileSystem.getDefault(projection), fullExtent, tileSize);
        if (this.options['tileSystem']) this._tileConfig = new maptalks_es_TileConfig(map, this.options['tileSystem'], fullExtent, tileSize);
        this._hasOwnSR = sr !== map.getSpatialReference();
    };
    _proto2._getTileConfig = function() {
        if (!this._defaultTileConfig) this._initTileConfig();
        return this._tileConfig || this._defaultTileConfig;
    };
    _proto2._bindMap = function(map) {
        var baseLayer = map.getBaseLayer();
        if (baseLayer === this) {
            if (!baseLayer.options.hasOwnProperty('forceRenderOnMoving')) this.config({
                forceRenderOnMoving: true
            });
        }
        return _Layer.prototype._bindMap.apply(this, arguments);
    };
    _proto2._isTileInExtent = function(frustumMatrix, tileExtent, offset, glScale) {
        var map = this.getMap();
        var matrix;
        if (frustumMatrix !== map.projViewMatrix) {
            var tileCenter = tileExtent.getCenter(TEMP_POINT6)._sub(offset[0], offset[1])._multi(glScale);
            set$2(ARR3, tileCenter.x, tileCenter.y, 0);
            var ndc = transformMat4(ARR3, ARR3, map.projViewMatrix);
            matrix = ndc[1] < 0 ? map.projViewMatrix : frustumMatrix;
        } else matrix = map.projViewMatrix;
        TILE_BOX[0][0] = (tileExtent.xmin - offset[0]) * glScale;
        TILE_BOX[0][1] = (tileExtent.ymin - offset[1]) * glScale;
        TILE_BOX[1][0] = (tileExtent.xmax - offset[0]) * glScale;
        TILE_BOX[1][1] = (tileExtent.ymax - offset[1]) * glScale;
        return intersectsBox(matrix, TILE_BOX);
    };
    _proto2._isSplittedTileInExtent = function(frustumMatrix, tileExtent, offset, glScale) {
        var map = this.getMap();
        TILE_BOX[0][0] = (tileExtent.xmin - offset[0]) * glScale;
        TILE_BOX[0][1] = (tileExtent.ymin - offset[1]) * glScale;
        TILE_BOX[1][0] = (tileExtent.xmax - offset[0]) * glScale;
        TILE_BOX[1][1] = (tileExtent.ymax - offset[1]) * glScale;
        return intersectsBox(map.projViewMatrix, TILE_BOX);
    };
    _proto2.getEvents = function() {
        return {
            spatialreferencechange: this._onSpatialReferenceChange
        };
    };
    _proto2._onSpatialReferenceChange = function() {
        delete this._tileConfig;
        delete this._defaultTileConfig;
        delete this._sr;
        var renderer = this.getRenderer();
        if (renderer) renderer.clear();
    };
    return TileLayer;
}(maptalks_es_Layer);
maptalks_es_TileLayer.registerJSONType('TileLayer');
maptalks_es_TileLayer.mergeOptions(options$u);
var maptalks_es_GroupTileLayer = function(_TileLayer) {
    _inheritsLoose(GroupTileLayer, _TileLayer);
    GroupTileLayer.fromJSON = function(layerJSON) {
        if (!layerJSON || 'GroupTileLayer' !== layerJSON['type']) return null;
        var layers = layerJSON['layers'].map(function(json) {
            return maptalks_es_Layer.fromJSON(json);
        });
        return new GroupTileLayer(layerJSON['id'], layers, layerJSON['options']);
    };
    function GroupTileLayer(id, layers, options) {
        var _this;
        _this = _TileLayer.call(this, id, options) || this;
        _this.layers = layers || [];
        _this._checkChildren();
        _this.layerMap = {};
        _this._groupChildren = [];
        return _this;
    }
    var _proto = GroupTileLayer.prototype;
    _proto.getLayers = function() {
        return this.layers;
    };
    _proto.toJSON = function() {
        var profile = {
            type: this.getJSONType(),
            id: this.getId(),
            layers: this.layers.map(function(layer) {
                return layer.toJSON();
            }),
            options: this.config()
        };
        return profile;
    };
    _proto.getTiles = function(z) {
        var layers = this.layers;
        var tiles = [];
        var count = 0;
        for(var i = 0, l = layers.length; i < l; i++){
            var layer = layers[i];
            if (!layer.options['visible']) continue;
            var childGrid = layer.getTiles(z, this);
            if (!!childGrid && 0 !== childGrid.count) {
                count += childGrid.count;
                pushIn(tiles, childGrid.tileGrids);
            }
        }
        return {
            count: count,
            tileGrids: tiles
        };
    };
    _proto.onAdd = function() {
        var _this2 = this;
        var map = this.getMap();
        this.layers.forEach(function(layer) {
            _this2.layerMap[layer.getId()] = layer;
            if (layer.getChildLayer) _this2._groupChildren.push(layer);
            layer._bindMap(map);
            layer.on('show hide', _this2._onLayerShowHide, _this2);
        });
        _TileLayer.prototype.onAdd.call(this);
    };
    _proto.onRemove = function() {
        var _this3 = this;
        this.layers.forEach(function(layer) {
            layer._doRemove();
            layer.off('show hide', _this3._onLayerShowHide, _this3);
        });
        this.layerMap = {};
        this._groupChildren = [];
        _TileLayer.prototype.onRemove.call(this);
    };
    _proto.getChildLayer = function(id) {
        var layer = this.layerMap[id];
        if (layer) return layer;
        for(var i = 0; i < this._groupChildren.length; i++){
            var child = this._groupChildren[i].getChildLayer(id);
            if (child) return child;
        }
        return null;
    };
    _proto._onLayerShowHide = function() {
        var renderer = this.getRenderer();
        if (renderer) renderer.setToRedraw();
    };
    _proto.isVisible = function() {
        if (!_TileLayer.prototype.isVisible.call(this)) return false;
        var children = this.layers;
        for(var i = 0, l = children.length; i < l; i++)if (children[i].isVisible()) return true;
        return false;
    };
    _proto._checkChildren = function() {
        var _this4 = this;
        var ids = {};
        this.layers.forEach(function(layer) {
            var layerId = layer.getId();
            if (ids[layerId]) throw new Error("Duplicate child layer id (" + layerId + ") in the GroupTileLayer (" + _this4.getId() + ")");
            ids[layerId] = 1;
        });
    };
    return GroupTileLayer;
}(maptalks_es_TileLayer);
maptalks_es_GroupTileLayer.registerJSONType('GroupTileLayer');
var options$v = {
    crs: null,
    uppercase: false,
    detectRetina: false
};
var defaultWmsParams = {
    service: 'WMS',
    request: 'GetMap',
    layers: '',
    styles: '',
    format: 'image/jpeg',
    transparent: false,
    version: '1.1.1'
};
var maptalks_es_WMSTileLayer = function(_TileLayer) {
    _inheritsLoose(WMSTileLayer, _TileLayer);
    function WMSTileLayer(id, options) {
        var _this;
        _this = _TileLayer.call(this, id) || this;
        var wmsParams = extend({}, defaultWmsParams);
        for(var p in options)if (!(p in _this.options)) wmsParams[p] = options[p];
        _this.setOptions(options);
        _this.setZIndex(options.zIndex);
        var tileSize = _this.getTileSize();
        wmsParams.width = tileSize.width;
        wmsParams.height = tileSize.height;
        _this.wmsParams = wmsParams;
        _this._wmsVersion = parseFloat(wmsParams.version);
        return _this;
    }
    var _proto = WMSTileLayer.prototype;
    _proto.onAdd = function() {
        var dpr = this.getMap().getDevicePixelRatio();
        var r = options$v.detectRetina ? dpr : 1;
        this.wmsParams.width *= r;
        this.wmsParams.height *= r;
        var crs = this.options.crs || this.getMap().getProjection().code;
        var projectionKey = this._wmsVersion >= 1.3 ? 'crs' : 'srs';
        this.wmsParams[projectionKey] = crs;
        _TileLayer.prototype.onAdd.call(this);
    };
    _proto.getTileUrl = function(x, y, z) {
        var res = this.getSpatialReference().getResolution(z), tileConfig = this._getTileConfig(), tileExtent = tileConfig.getTilePrjExtent(x, y, res);
        var max = tileExtent.getMax(), min = tileExtent.getMin();
        var bbox = (this._wmsVersion >= 1.3 && 'EPSG:4326' === this.wmsParams.crs ? [
            min.y,
            min.x,
            max.y,
            max.x
        ] : [
            min.x,
            min.y,
            max.x,
            max.y
        ]).join(',');
        var url = _TileLayer.prototype.getTileUrl.call(this, x, y, z);
        return url + getParamString(this.wmsParams, url, this.options.uppercase) + (this.options.uppercase ? '&BBOX=' : '&bbox=') + bbox;
    };
    _proto.toJSON = function() {
        return {
            type: 'WMSTileLayer',
            id: this.getId(),
            options: this.config()
        };
    };
    WMSTileLayer.fromJSON = function(layerJSON) {
        if (!layerJSON || 'WMSTileLayer' !== layerJSON['type']) return null;
        return new WMSTileLayer(layerJSON['id'], layerJSON['options']);
    };
    return WMSTileLayer;
}(maptalks_es_TileLayer);
maptalks_es_WMSTileLayer.registerJSONType('WMSTileLayer');
maptalks_es_WMSTileLayer.mergeOptions(options$v);
function getParamString(obj, existingUrl, uppercase) {
    var params = [];
    for(var i in obj)params.push(encodeURIComponent(uppercase ? i.toUpperCase() : i) + '=' + encodeURIComponent(obj[i]));
    return (existingUrl && -1 !== existingUrl.indexOf('?') ? '&' : '?') + params.join('&');
}
var maptalks_es_CanvasTileLayer = function(_TileLayer) {
    _inheritsLoose(CanvasTileLayer, _TileLayer);
    function CanvasTileLayer(id, options) {
        var _this;
        _this = _TileLayer.call(this, id, options) || this;
        if (!_this.options.hasOwnProperty('forceRenderOnMoving')) _this.options['forceRenderOnMoving'] = false;
        return _this;
    }
    var _proto = CanvasTileLayer.prototype;
    _proto.drawTile = function() {};
    _proto.toJSON = function() {
        return {
            type: 'CanvasTileLayer',
            id: this.getId(),
            options: this.config()
        };
    };
    CanvasTileLayer.fromJSON = function(layerJSON) {
        if (!layerJSON || 'CanvasTileLayer' !== layerJSON['type']) return null;
        return new CanvasTileLayer(layerJSON['id'], layerJSON['options']);
    };
    return CanvasTileLayer;
}(maptalks_es_TileLayer);
maptalks_es_CanvasTileLayer.registerJSONType('CanvasTileLayer');
function createGLContext(canvas, options) {
    var attributes = {
        alpha: true,
        stencil: true,
        preserveDrawingBuffer: true,
        antialias: false
    };
    var names = [
        'webgl',
        'experimental-webgl'
    ];
    var context = null;
    for(var i = 0; i < names.length; ++i){
        try {
            context = canvas.getContext(names[i], options || attributes);
        } catch (e) {}
        if (context) break;
    }
    return context;
}
function compileShader(gl, type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!compiled) {
        var error = gl.getShaderInfoLog(shader);
        gl.deleteShader(shader);
        throw new Error('Failed to compile shader: ' + error);
    }
    return shader;
}
function createProgram(gl, vert, frag) {
    var vertexShader = compileShader(gl, gl.VERTEX_SHADER, vert);
    var fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, frag);
    if (!vertexShader || !fragmentShader) return null;
    var program = gl.createProgram();
    if (!program) return null;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    return {
        program: program,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
    };
}
function enableVertexAttrib(gl, program, attributes) {
    if (Array.isArray(attributes[0])) {
        var FSIZE = Float32Array.BYTES_PER_ELEMENT;
        var STRIDE = 0;
        for(var i = 0; i < attributes.length; i++)STRIDE += attributes[i][1] || 0;
        var offset = 0;
        for(var _i = 0; _i < attributes.length; _i++){
            var attr = gl.getAttribLocation(program, attributes[_i][0]);
            if (attr < 0) throw new Error('Failed to get the storage location of ' + attributes[_i][0]);
            gl.vertexAttribPointer(attr, attributes[_i][1], gl[attributes[_i][2] || 'FLOAT'], false, FSIZE * STRIDE, FSIZE * offset);
            offset += attributes[_i][1] || 0;
            gl.enableVertexAttribArray(attr);
        }
    } else {
        var _attr = gl.getAttribLocation(program, attributes[0]);
        gl.vertexAttribPointer(_attr, attributes[1], gl[attributes[2] || 'FLOAT'], false, 0, 0);
        gl.enableVertexAttribArray(_attr);
    }
}
var shaders = {
    vertexShader: "\n        attribute vec2 a_position;\n\n        attribute vec2 a_texCoord;\n\n        uniform mat4 u_matrix;\n\n        varying vec2 v_texCoord;\n\n        void main() {\n            gl_Position = u_matrix * vec4(a_position, 0., 1.);\n\n            v_texCoord = a_texCoord;\n        }\n    ",
    fragmentShader: "\n        precision mediump float;\n\n        uniform sampler2D u_image;\n\n        uniform float u_opacity;\n        uniform float u_debug_line;\n\n        varying vec2 v_texCoord;\n\n        void main() {\n            if (u_debug_line == 1.) {\n                gl_FragColor = vec4(0., 1., 0., 1.);\n            } else {\n                gl_FragColor = texture2D(u_image, v_texCoord) * u_opacity;\n            }\n        }\n    "
};
var maptalks_es_v2 = [
    0,
    0
], maptalks_es_v3 = [
    0,
    0,
    0
], arr16 = new Array(16);
var DEBUG_POINT = new maptalks_es_Point(20, 20);
var maptalks_es_ImageGLRenderable = function(Base) {
    var renderable = function(_Base) {
        _inheritsLoose(renderable, _Base);
        function renderable() {
            return _Base.apply(this, arguments) || this;
        }
        var _proto = renderable.prototype;
        _proto.drawGLImage = function(image, x, y, w, h, scale$$1, opacity, debug) {
            if (this.gl.program !== this.program) this.useProgram(this.program);
            var gl = this.gl;
            this.loadTexture(image);
            maptalks_es_v3[0] = x || 0;
            maptalks_es_v3[1] = y || 0;
            var uMatrix = identity(arr16);
            maptalks_es_translate(uMatrix, uMatrix, maptalks_es_v3);
            maptalks_es_scale(uMatrix, uMatrix, [
                scale$$1,
                scale$$1,
                1
            ]);
            multiply(uMatrix, this.getMap().projViewMatrix, uMatrix);
            gl.uniformMatrix4fv(this.program['u_matrix'], false, uMatrix);
            gl.uniform1f(this.program['u_opacity'], opacity);
            gl.uniform1f(this.program['u_debug_line'], 0);
            var glBuffer = image.glBuffer;
            if (glBuffer && (glBuffer.width !== w || glBuffer.height !== h)) {
                this.saveImageBuffer(glBuffer);
                delete image.glBuffer;
            }
            if (image.glBuffer) gl.bindBuffer(gl.ARRAY_BUFFER, glBuffer);
            else image.glBuffer = this.bufferTileData(0, 0, w, h);
            maptalks_es_v2[0] = 'a_position';
            maptalks_es_v2[1] = 2;
            maptalks_es_v2[2] = image.glBuffer.type;
            this.enableVertexAttrib(maptalks_es_v2);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
            if (debug) this.drawDebug(uMatrix, maptalks_es_v2, 0, 0, w, h, debug);
        };
        _proto.drawDebug = function(uMatrix, attrib, x, y, w, h, debugInfo) {
            var gl = this.gl;
            gl.bindBuffer(gl.ARRAY_BUFFER, this._debugBuffer);
            this.enableVertexAttrib([
                'a_position',
                2,
                'FLOAT'
            ]);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
                x,
                y,
                x + w,
                y,
                x + w,
                y - h,
                x,
                y - h,
                x,
                y
            ]), gl.DYNAMIC_DRAW);
            gl.uniformMatrix4fv(this.program['u_matrix'], false, uMatrix);
            gl.uniform1f(this.program['u_debug_line'], 1);
            gl.drawArrays(gl.LINE_STRIP, 0, 5);
            var canvas = this._debugInfoCanvas;
            if (!canvas) {
                var dpr = this.getMap().getDevicePixelRatio() > 1 ? 2 : 1;
                canvas = this._debugInfoCanvas = document.createElement('canvas');
                canvas.width = 256 * dpr;
                canvas.height = 32 * dpr;
                var _ctx = canvas.getContext('2d');
                _ctx.font = '20px monospace';
                _ctx.scale(dpr, dpr);
            }
            var ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            var color = this.layer.options['debugOutline'];
            Canvas.fillText(ctx, debugInfo, DEBUG_POINT, color);
            this.loadTexture(canvas);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);
            w = 256;
            h = 32;
            var x1 = x;
            var x2 = x + w;
            var y1 = y;
            var y2 = y - h;
            gl.bufferData(gl.ARRAY_BUFFER, this.set8(x1, y1, x1, y2, x2, y1, x2, y2), gl.DYNAMIC_DRAW);
            gl.uniform1f(this.program['u_debug_line'], 0);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        };
        _proto.bufferTileData = function(x, y, w, h, buffer) {
            var x1 = x;
            var x2 = x + w;
            var y1 = y;
            var y2 = y - h;
            var data;
            data = isInteger(x1) && isInteger(x2) && isInteger(y1) && isInteger(y2) ? this.set8Int(x1, y1, x1, y2, x2, y1, x2, y2) : this.set8(x1, y1, x1, y2, x2, y1, x2, y2);
            var glBuffer = this.loadImageBuffer(data, buffer);
            glBuffer.width = w;
            glBuffer.height = h;
            glBuffer.type = data instanceof Int16Array ? 'SHORT' : 'FLOAT';
            return glBuffer;
        };
        _proto.drawTinImage = function(image, vertices, texCoords, indices, opacity) {
            var gl = this.gl;
            this.loadTexture(image);
            gl.uniformMatrix4fv(this.program['u_matrix'], false, this.getMap().projViewMatrix);
            gl.uniform1f(this.program['u_opacity'], opacity);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.posBuffer);
            this.enableVertexAttrib([
                'a_position',
                3
            ]);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.texBuffer);
            this.enableVertexAttrib([
                'a_texCoord',
                2
            ]);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoords), gl.DYNAMIC_DRAW);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.DYNAMIC_DRAW);
            gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
        };
        _proto.createCanvas2 = function() {
            this.canvas2 = Canvas.createCanvas(this.canvas.width, this.canvas.height);
        };
        _proto.createGLContext = function() {
            if (this.canvas.gl && this.canvas.gl.wrap) this.gl = this.canvas.gl.wrap();
            else this.gl = createGLContext(this.canvas2 || this.canvas, this.layer.options['glOptions']);
            var gl = this.gl;
            gl.clearColor(0.0, 0.0, 0.0, 0.0);
            gl.disable(gl.DEPTH_TEST);
            gl.enable(gl.STENCIL_TEST);
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
            this.program = this.createProgram(shaders['vertexShader'], this.layer.options['fragmentShader'] || shaders['fragmentShader'], [
                'u_matrix',
                'u_image',
                'u_opacity',
                'u_debug_line'
            ]);
            this._debugBuffer = this.createBuffer();
            this.useProgram(this.program);
            this.texBuffer = this.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.texBuffer);
            this.enableVertexAttrib([
                'a_texCoord',
                2,
                'UNSIGNED_BYTE'
            ]);
            gl.bufferData(gl.ARRAY_BUFFER, new Uint8Array([
                0.0,
                0.0,
                0.0,
                1.0,
                1.0,
                0.0,
                1.0,
                1.0
            ]), gl.STATIC_DRAW);
            this.enableSampler('u_image');
            gl.activeTexture(gl['TEXTURE0']);
            gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
        };
        _proto.resizeGLCanvas = function() {
            if (this.gl) this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
            if (!this.canvas2) return;
            if (this.canvas2.width !== this.canvas.width || this.canvas2.height !== this.canvas.height) {
                this.canvas2.width = this.canvas.width;
                this.canvas2.height = this.canvas.height;
            }
        };
        _proto.clearGLCanvas = function() {
            if (this.gl) this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.STENCIL_BUFFER_BIT);
        };
        _proto.disposeImage = function(image) {
            if (!image) return;
            if (image.texture) this.saveTexture(image.texture);
            if (image.glBuffer) this.saveImageBuffer(image.glBuffer);
            delete image.texture;
            delete image.glBuffer;
        };
        _proto._createTexture = function(image) {
            var gl = this.gl;
            var texture = this.getTexture() || gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
            if (isInteger(log2(image.width)) && isInteger(log2(image.width))) gl.generateMipmap(gl.TEXTURE_2D);
            return texture;
        };
        _proto.getTexture = function() {
            if (!this._textures) this._textures = [];
            var textures = this._textures;
            return textures && textures.length > 0 ? textures.pop() : null;
        };
        _proto.saveTexture = function(texture) {
            this._textures.push(texture);
        };
        _proto.loadTexture = function(image) {
            var gl = this.gl;
            var texture = image.texture;
            if (!texture) {
                texture = this._createTexture(image);
                image.texture = texture;
            }
            gl.bindTexture(gl.TEXTURE_2D, texture);
            return texture;
        };
        _proto.getImageBuffer = function() {
            if (!this._imageBuffers) this._imageBuffers = [];
            var imageBuffers = this._imageBuffers;
            return imageBuffers && imageBuffers.length > 0 ? imageBuffers.pop() : null;
        };
        _proto.saveImageBuffer = function(buffer) {
            this._imageBuffers.push(buffer);
        };
        _proto.loadImageBuffer = function(data, glBuffer) {
            var gl = this.gl;
            var buffer = glBuffer || this.createImageBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
            return buffer;
        };
        _proto.createImageBuffer = function() {
            return this.getImageBuffer() || this.createBuffer();
        };
        _proto.removeGLCanvas = function() {
            var gl = this.gl;
            if (!gl) return;
            if (this._debugBuffer) {
                gl.deleteBuffer(this._debugBuffer);
                delete this._debugBuffer;
            }
            if (this._buffers) {
                this._buffers.forEach(function(b) {
                    gl.deleteBuffer(b);
                });
                delete this._buffers;
            }
            if (this._textures) {
                this._textures.forEach(function(t) {
                    return gl.deleteTexture(t);
                });
                delete this._textures;
            }
            if (this._debugInfoCanvas) {
                var texture = this._debugInfoCanvas.texture;
                if (texture) gl.deleteTexture(texture);
                delete this._debugInfoCanvas.texture;
                delete this._debugInfoCanvas;
            }
            var program = gl.program;
            gl.deleteShader(program.fragmentShader);
            gl.deleteShader(program.vertexShader);
            gl.deleteProgram(program);
            delete this.gl;
            delete this.canvas2;
        };
        _proto.createBuffer = function() {
            var gl = this.gl;
            var buffer = gl.createBuffer();
            if (!buffer) throw new Error('Failed to create the buffer object');
            if (!this._buffers) this._buffers = [];
            this._buffers.push(buffer);
            return buffer;
        };
        _proto.enableVertexAttrib = function(attributes) {
            enableVertexAttrib(this.gl, this.gl.program, attributes);
        };
        _proto.createProgram = function(vert, frag, uniforms) {
            var gl = this.gl;
            var _createProgram2 = createProgram(gl, vert, frag), program = _createProgram2.program, vertexShader = _createProgram2.vertexShader, fragmentShader = _createProgram2.fragmentShader;
            program.vertexShader = vertexShader;
            program.fragmentShader = fragmentShader;
            this._initUniforms(program, uniforms);
            return program;
        };
        _proto.useProgram = function(program) {
            var gl = this.gl;
            gl.useProgram(program);
            gl.program = program;
            return this;
        };
        _proto.enableSampler = function(sampler, texIdx) {
            var gl = this.gl;
            var uSampler = this._getUniform(gl.program, sampler);
            if (!texIdx) texIdx = 0;
            gl.uniform1i(uSampler, texIdx);
            return uSampler;
        };
        _proto._initUniforms = function(program, uniforms) {
            for(var i = 0; i < uniforms.length; i++){
                var name = uniforms[i];
                var uniform = uniforms[i];
                var b = name.indexOf('[');
                if (b >= 0) {
                    name = name.substring(0, b);
                    if (!IS_NODE) uniform = uniform.substring(0, b);
                }
                program[name] = this._getUniform(program, uniform);
            }
        };
        _proto._getUniform = function(program, uniformName) {
            var gl = this.gl;
            var uniform = gl.getUniformLocation(program, uniformName);
            if (!uniform) throw new Error('Failed to get the storage location of ' + uniformName);
            return uniform;
        };
        return renderable;
    }(Base);
    extend(renderable.prototype, {
        set8: function() {
            var out = Browser$1.ie9 ? null : new Float32Array(8);
            return function(a0, a1, a2, a3, a4, a5, a6, a7) {
                out[0] = a0;
                out[1] = a1;
                out[2] = a2;
                out[3] = a3;
                out[4] = a4;
                out[5] = a5;
                out[6] = a6;
                out[7] = a7;
                return out;
            };
        }(),
        set8Int: function() {
            var out = Browser$1.ie9 ? null : new Int16Array(8);
            return function(a0, a1, a2, a3, a4, a5, a6, a7) {
                out[0] = a0;
                out[1] = a1;
                out[2] = a2;
                out[3] = a3;
                out[4] = a4;
                out[5] = a5;
                out[6] = a6;
                out[7] = a7;
                return out;
            };
        }()
    });
    return renderable;
};
var options$w = {
    renderer: Browser$1.webgl ? 'gl' : 'canvas',
    crossOrigin: null
};
var TEMP_POINT$1 = new maptalks_es_Point(0, 0);
var maptalks_es_ImageLayer = function(_Layer) {
    _inheritsLoose(ImageLayer, _Layer);
    function ImageLayer(id, images, options) {
        var _this;
        if (images && !Array.isArray(images) && !images.url) {
            options = images;
            images = null;
        }
        _this = _Layer.call(this, id, options) || this;
        _this._images = images;
        return _this;
    }
    var _proto = ImageLayer.prototype;
    _proto.onAdd = function() {
        this._prepareImages(this._images);
    };
    _proto.setImages = function(images) {
        this._images = images;
        this._prepareImages(images);
        return this;
    };
    _proto.getImages = function() {
        return this._images;
    };
    _proto._prepareImages = function(images) {
        images = images || [];
        if (!Array.isArray(images)) images = [
            images
        ];
        var map = this.getMap();
        this._imageData = images.map(function(img) {
            var extent = new maptalks_es_Extent(img.extent);
            return extend({}, img, {
                extent: extent,
                extent2d: extent.convertTo(function(c) {
                    return map.coordToPoint(c, map.getGLZoom());
                })
            });
        });
        this._images = images;
        var renderer = this.getRenderer();
        if (renderer) renderer.refreshImages();
    };
    return ImageLayer;
}(maptalks_es_Layer);
maptalks_es_ImageLayer.mergeOptions(options$w);
var EMPTY_ARRAY = [];
var maptalks_es_ImageLayerCanvasRenderer = function(_CanvasRenderer) {
    _inheritsLoose(ImageLayerCanvasRenderer, _CanvasRenderer);
    function ImageLayerCanvasRenderer() {
        return _CanvasRenderer.apply(this, arguments) || this;
    }
    var _proto2 = ImageLayerCanvasRenderer.prototype;
    _proto2.isDrawable = function() {
        if (this.getMap().getPitch()) {
            if (console) console.warn('ImageLayer with canvas renderer can\'t be pitched, use gl renderer (\'renderer\' : \'gl\') instead.');
            return false;
        }
        return true;
    };
    _proto2.checkResources = function() {
        var _this2 = this;
        if (this._imageLoaded) return EMPTY_ARRAY;
        var layer = this.layer;
        var urls = layer._imageData.map(function(img) {
            return [
                img.url,
                null,
                null
            ];
        });
        if (this.resources) {
            var unloaded = [];
            var resources = new maptalks_es_ResourceCache();
            urls.forEach(function(url) {
                if (_this2.resources.isResourceLoaded(url)) {
                    var img = _this2.resources.getImage(url);
                    resources.addResource(url, img);
                } else unloaded.push(url);
            });
            this.resources.forEach(function(url, res) {
                if (!resources.isResourceLoaded(url)) _this2.retireImage(res.image);
            });
            this.resources = resources;
            urls = unloaded;
        }
        this._imageLoaded = true;
        return urls;
    };
    _proto2.retireImage = function() {};
    _proto2.refreshImages = function() {
        this._imageLoaded = false;
        this.setToRedraw();
    };
    _proto2.needToRedraw = function() {
        var map = this.getMap();
        if (map.isZooming() && !map.getPitch()) return false;
        return _CanvasRenderer.prototype.needToRedraw.call(this);
    };
    _proto2.draw = function() {
        if (!this.isDrawable()) return;
        this.prepareCanvas();
        this._painted = false;
        this._drawImages();
        this.completeRender();
    };
    _proto2._drawImages = function() {
        var imgData = this.layer._imageData;
        var map = this.getMap();
        var mapExtent = map._get2DExtent(map.getGLZoom());
        if (imgData && imgData.length) for(var i = 0; i < imgData.length; i++){
            var extent = imgData[i].extent2d;
            var image = this.resources && this.resources.getImage(imgData[i].url);
            if (image && mapExtent.intersects(extent)) {
                this._painted = true;
                this._drawImage(image, extent, imgData[i].opacity || 1);
            }
        }
    };
    _proto2._drawImage = function(image, extent, opacity) {
        var globalAlpha = 0;
        var ctx = this.context;
        if (opacity < 1) {
            globalAlpha = ctx.globalAlpha;
            ctx.globalAlpha = opacity;
        }
        var map = this.getMap();
        var nw = TEMP_POINT$1.set(extent.xmin, extent.ymax);
        var point = map._pointToContainerPoint(nw, map.getGLZoom());
        var x = point.x, y = point.y;
        var bearing = map.getBearing();
        if (bearing) {
            ctx.save();
            ctx.translate(x, y);
            if (bearing) ctx.rotate(-bearing * Math.PI / 180);
            x = y = 0;
        }
        var scale = map.getGLScale();
        ctx.drawImage(image, x, y, extent.getWidth() / scale, extent.getHeight() / scale);
        if (bearing) ctx.restore();
        if (globalAlpha) ctx.globalAlpha = globalAlpha;
    };
    _proto2.drawOnInteracting = function() {
        this.draw();
    };
    return ImageLayerCanvasRenderer;
}(maptalks_es_CanvasRenderer);
var maptalks_es_ImageLayerGLRenderer = function(_ImageGLRenderable) {
    _inheritsLoose(ImageLayerGLRenderer, _ImageGLRenderable);
    function ImageLayerGLRenderer() {
        return _ImageGLRenderable.apply(this, arguments) || this;
    }
    var _proto3 = ImageLayerGLRenderer.prototype;
    _proto3.isDrawable = function() {
        return true;
    };
    _proto3._drawImage = function(image, extent, opacity) {
        this.drawGLImage(image, extent.xmin, extent.ymax, extent.getWidth(), extent.getHeight(), 1, opacity);
    };
    _proto3.createContext = function() {
        this.createGLContext();
    };
    _proto3.resizeCanvas = function(canvasSize) {
        if (!this.canvas) return;
        _ImageGLRenderable.prototype.resizeCanvas.call(this, canvasSize);
        this.resizeGLCanvas();
    };
    _proto3.clearCanvas = function() {
        if (!this.canvas) return;
        _ImageGLRenderable.prototype.clearCanvas.call(this);
        this.clearGLCanvas();
    };
    _proto3.retireImage = function(image) {
        this.disposeImage(image);
    };
    _proto3.onRemove = function() {
        this.removeGLCanvas();
        _ImageGLRenderable.prototype.onRemove.call(this);
    };
    return ImageLayerGLRenderer;
}(maptalks_es_ImageGLRenderable(maptalks_es_ImageLayerCanvasRenderer));
maptalks_es_ImageLayer.registerRenderer('canvas', maptalks_es_ImageLayerCanvasRenderer);
maptalks_es_ImageLayer.registerRenderer('gl', maptalks_es_ImageLayerGLRenderer);
var maptalks_es_CanvasLayerRenderer = function(_CanvasRenderer) {
    _inheritsLoose(CanvasLayerRenderer, _CanvasRenderer);
    function CanvasLayerRenderer() {
        return _CanvasRenderer.apply(this, arguments) || this;
    }
    var _proto = CanvasLayerRenderer.prototype;
    _proto.getPrepareParams = function() {
        return [];
    };
    _proto.getDrawParams = function() {
        return [];
    };
    _proto.onCanvasCreate = function() {
        if (this.canvas && this.layer.options['doubleBuffer']) this.buffer = Canvas.createCanvas(this.canvas.width, this.canvas.height, this.getMap().CanvasClass);
    };
    _proto.needToRedraw = function() {
        if (this.layer.options['animation']) return true;
        var map = this.getMap();
        if (map.isInteracting() && !this.layer.drawOnInteracting) return false;
        return _CanvasRenderer.prototype.needToRedraw.call(this);
    };
    _proto.draw = function() {
        this.prepareCanvas();
        this.prepareDrawContext();
        this._drawLayer();
    };
    _proto.drawOnInteracting = function() {
        this._drawLayerOnInteracting();
    };
    _proto.getCanvasImage = function() {
        var canvasImg = _CanvasRenderer.prototype.getCanvasImage.call(this);
        if (canvasImg && canvasImg.image && this.layer.options['doubleBuffer']) {
            var canvas = canvasImg.image;
            if (this.buffer.width !== canvas.width || this.buffer.height !== canvas.height) {
                this.buffer.width = canvas.width;
                this.buffer.height = canvas.height;
            }
            var bufferContext = this.buffer.getContext('2d');
            var prevent = this.layer.doubleBuffer(bufferContext, this.context);
            if (void 0 === prevent || prevent) {
                Canvas.image(bufferContext, canvas, 0, 0);
                canvasImg.image = this.buffer;
            }
        }
        return canvasImg;
    };
    _proto.remove = function() {
        delete this._drawContext;
        return _CanvasRenderer.prototype.remove.call(this);
    };
    _proto.onZoomStart = function(param) {
        this.layer.onZoomStart(param);
        _CanvasRenderer.prototype.onZoomStart.call(this, param);
    };
    _proto.onZooming = function(param) {
        this.layer.onZooming(param);
        _CanvasRenderer.prototype.onZooming.call(this, param);
    };
    _proto.onZoomEnd = function(param) {
        this.layer.onZoomEnd(param);
        _CanvasRenderer.prototype.onZoomEnd.call(this, param);
    };
    _proto.onMoveStart = function(param) {
        this.layer.onMoveStart(param);
        _CanvasRenderer.prototype.onMoveStart.call(this, param);
    };
    _proto.onMoving = function(param) {
        this.layer.onMoving(param);
        _CanvasRenderer.prototype.onMoving.call(this, param);
    };
    _proto.onMoveEnd = function(param) {
        this.layer.onMoveEnd(param);
        _CanvasRenderer.prototype.onMoveEnd.call(this, param);
    };
    _proto.onResize = function(param) {
        this.layer.onResize(param);
        _CanvasRenderer.prototype.onResize.call(this, param);
    };
    _proto.prepareDrawContext = function() {
        if (!this._predrawed) {
            var params = ensureParams(this.getPrepareParams());
            this._drawContext = this.layer.prepareToDraw.apply(this.layer, [
                this.context
            ].concat(params));
            if (!this._drawContext) this._drawContext = [];
            if (!Array.isArray(this._drawContext)) this._drawContext = [
                this._drawContext
            ];
            this._predrawed = true;
        }
    };
    _proto._prepareDrawParams = function() {
        if (!this.getMap()) return null;
        var view = this.getViewExtent();
        if (view['maskExtent'] && !view['extent'].intersects(view['maskExtent'])) {
            this.completeRender();
            return null;
        }
        var args = [
            this.context,
            view
        ];
        var params = ensureParams(this.getDrawParams());
        args.push.apply(args, params);
        args.push.apply(args, this._drawContext);
        return args;
    };
    _proto._drawLayer = function() {
        var args = this._prepareDrawParams();
        if (!args) return;
        this.layer.draw.apply(this.layer, args);
        this.completeRender();
    };
    _proto._drawLayerOnInteracting = function() {
        if (!this.layer.drawOnInteracting) return;
        var args = this._prepareDrawParams();
        if (!args) return;
        this.layer.drawOnInteracting.apply(this.layer, args);
        this.completeRender();
    };
    return CanvasLayerRenderer;
}(maptalks_es_CanvasRenderer);
function ensureParams(params) {
    if (!params) params = [];
    if (!Array.isArray(params)) params = [
        params
    ];
    return params;
}
var options$x = {
    doubleBuffer: false,
    animation: false
};
var maptalks_es_CanvasLayer = function(_Layer) {
    _inheritsLoose(CanvasLayer, _Layer);
    function CanvasLayer() {
        return _Layer.apply(this, arguments) || this;
    }
    var _proto = CanvasLayer.prototype;
    _proto.isCanvasRender = function() {
        return true;
    };
    _proto.prepareToDraw = function() {};
    _proto.draw = function() {};
    _proto.redraw = function() {
        if (this._getRenderer()) this._getRenderer().setToRedraw();
        return this;
    };
    _proto.play = function() {
        this.config('animation', true);
        return this;
    };
    _proto.pause = function() {
        this.config('animation', false);
        return this;
    };
    _proto.isPlaying = function() {
        return this.options['animation'];
    };
    _proto.clearCanvas = function() {
        if (this._getRenderer()) this._getRenderer().clearCanvas();
        return this;
    };
    _proto.requestMapToRender = function() {
        if (this._getRenderer()) this._getRenderer().requestMapToRender();
        return this;
    };
    _proto.completeRender = function() {
        if (this._getRenderer()) this._getRenderer().completeRender();
        return this;
    };
    _proto.onCanvasCreate = function() {
        return this;
    };
    _proto.onZoomStart = function() {};
    _proto.onZooming = function() {};
    _proto.onZoomEnd = function() {};
    _proto.onMoveStart = function() {};
    _proto.onMoving = function() {};
    _proto.onMoveEnd = function() {};
    _proto.onResize = function() {};
    _proto.doubleBuffer = function(bufferContext) {
        bufferContext.clearRect(0, 0, bufferContext.canvas.width, bufferContext.canvas.height);
        return this;
    };
    return CanvasLayer;
}(maptalks_es_Layer);
maptalks_es_CanvasLayer.mergeOptions(options$x);
maptalks_es_CanvasLayer.registerRenderer('canvas', maptalks_es_CanvasLayerRenderer);
var TEMP_POINT$2 = new maptalks_es_Point(0, 0);
var options$y = {
    animation: true
};
var maptalks_es_ParticleLayer = function(_CanvasLayer) {
    _inheritsLoose(ParticleLayer, _CanvasLayer);
    function ParticleLayer() {
        return _CanvasLayer.apply(this, arguments) || this;
    }
    var _proto = ParticleLayer.prototype;
    _proto.getParticles = function() {};
    _proto.draw = function(context, view) {
        var points = this.getParticles(now());
        if (!points || 0 === points.length) {
            var renderer = this._getRenderer();
            if (renderer) this._getRenderer()._shouldClear = true;
            return;
        }
        var map = this.getMap();
        var extent = view.extent;
        if (view.maskExtent) extent = view.extent.intersection(view.maskExtent);
        extent = extent.convertTo(function(c) {
            return map._pointToContainerPoint(c, void 0, 0, TEMP_POINT$2);
        });
        var e = 2 * Math.PI;
        for(var i = 0, l = points.length; i < l; i++){
            var pos = points[i].point;
            if (extent.contains(pos)) {
                var color = points[i].color || this.options['lineColor'] || '#fff', r = points[i].r;
                if (context.fillStyle !== color) context.fillStyle = color;
                if (r <= 2) context.fillRect(pos.x - r / 2, pos.y - r / 2, r, r);
                else {
                    context.beginPath();
                    context.arc(pos.x, pos.y, r / 2, 0, e);
                    context.fill();
                }
            }
        }
        this._fillCanvas(context);
    };
    _proto._fillCanvas = function(context) {
        var g = context.globalCompositeOperation;
        context.globalCompositeOperation = 'destination-out';
        var trail = this.options['trail'] || 30;
        context.fillStyle = 'rgba(0, 0, 0, ' + 1 / trail + ')';
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        context.globalCompositeOperation = g;
    };
    return ParticleLayer;
}(maptalks_es_CanvasLayer);
maptalks_es_ParticleLayer.mergeOptions(options$y);
maptalks_es_ParticleLayer.registerRenderer('canvas', function(_CanvasLayerRenderer) {
    _inheritsLoose(_class, _CanvasLayerRenderer);
    function _class() {
        return _CanvasLayerRenderer.apply(this, arguments) || this;
    }
    var _proto2 = _class.prototype;
    _proto2.draw = function() {
        if (!this.canvas || !this.layer.options['animation'] || this._shouldClear) {
            this.prepareCanvas();
            this._shouldClear = false;
        }
        this.prepareDrawContext();
        this._drawLayer();
    };
    _proto2.drawOnInteracting = function() {
        this.draw();
        this._shouldClear = false;
    };
    _proto2.onSkipDrawOnInteracting = function() {
        this._shouldClear = true;
    };
    return _class;
}(maptalks_es_CanvasLayerRenderer));
var EDIT_STAGE_LAYER_PREFIX = INTERNAL_LAYER_PREFIX + '_edit_stage_';
function createHandleSymbol(markerType, opacity) {
    return {
        markerType: markerType,
        markerFill: '#fff',
        markerLineColor: '#000',
        markerLineWidth: 2,
        markerWidth: 10,
        markerHeight: 10,
        opacity: opacity
    };
}
var options$z = {
    fixAspectRatio: false,
    symbol: null,
    removeVertexOn: 'contextmenu',
    centerHandleSymbol: createHandleSymbol('ellipse', 1),
    vertexHandleSymbol: createHandleSymbol('square', 1),
    newVertexHandleSymbol: createHandleSymbol('square', 0.4)
};
var maptalks_es_GeometryEditor = function(_Eventable) {
    _inheritsLoose(GeometryEditor, _Eventable);
    function GeometryEditor(geometry, opts) {
        var _this;
        _this = _Eventable.call(this, opts) || this;
        _this._geometry = geometry;
        if (!_this._geometry) return _assertThisInitialized(_this);
        return _this;
    }
    var _proto = GeometryEditor.prototype;
    _proto.getMap = function() {
        return this._geometry.getMap();
    };
    _proto.prepare = function() {
        var map = this.getMap();
        if (!map) return;
        if (this.options['symbol']) {
            this._originalSymbol = this._geometry.getSymbol();
            this._geometry.setSymbol(this.options['symbol']);
        }
        this._prepareEditStageLayer();
    };
    _proto._prepareEditStageLayer = function() {
        var map = this.getMap();
        var uid = UID();
        var stageId = EDIT_STAGE_LAYER_PREFIX + uid, shadowId = EDIT_STAGE_LAYER_PREFIX + uid + '_shadow';
        this._editStageLayer = map.getLayer(stageId);
        this._shadowLayer = map.getLayer(shadowId);
        if (!this._editStageLayer) {
            this._editStageLayer = new maptalks_es_VectorLayer(stageId);
            map.addLayer(this._editStageLayer);
        }
        if (!this._shadowLayer) {
            this._shadowLayer = new maptalks_es_VectorLayer(shadowId);
            map.addLayer(this._shadowLayer);
        }
    };
    _proto.start = function() {
        var _this2 = this;
        if (!this._geometry || !this._geometry.getMap() || this._geometry.editing) return;
        var map = this.getMap();
        this.editing = true;
        var geometry = this._geometry;
        this._geometryDraggble = geometry.options['draggable'];
        geometry.config('draggable', false);
        this.prepare();
        var shadow = geometry.copy();
        shadow.setSymbol(geometry._getInternalSymbol());
        shadow.copyEventListeners(geometry);
        if (geometry._getParent()) shadow.copyEventListeners(geometry._getParent());
        shadow._setEventTarget(geometry);
        shadow.setId(null).config({
            draggable: false
        });
        this._shadow = shadow;
        this._switchGeometryEvents('on');
        geometry.hide();
        if (geometry instanceof maptalks_es_Marker || geometry instanceof maptalks_es_Circle || geometry instanceof maptalks_es_Rectangle || geometry instanceof maptalks_es_Ellipse) this._createOrRefreshOutline();
        this._shadowLayer.bringToFront().addGeometry(shadow);
        this._editStageLayer.bringToFront();
        this._addListener([
            map,
            'zoomstart',
            function() {
                _this2._editStageLayer.hide();
            }
        ]);
        this._addListener([
            map,
            'zoomend',
            function() {
                _this2._editStageLayer.show();
            }
        ]);
        if (geometry instanceof maptalks_es_Marker) {
            shadow.config('draggable', true);
            shadow.on('dragend', this._onMarkerDragEnd, this);
        } else this._createCenterHandle();
        if (geometry instanceof maptalks_es_Marker) this.createMarkerEditor();
        else if (geometry instanceof maptalks_es_Circle) this.createCircleEditor();
        else if (geometry instanceof maptalks_es_Rectangle) this.createEllipseOrRectEditor();
        else if (geometry instanceof maptalks_es_Ellipse) this.createEllipseOrRectEditor();
        else if (geometry instanceof maptalks_es_Sector) ;
        else if (geometry instanceof maptalks_es_Polygon || geometry instanceof maptalks_es_LineString) this.createPolygonEditor();
    };
    _proto.stop = function() {
        delete this._history;
        delete this._historyPointer;
        delete this._editOutline;
        this._switchGeometryEvents('off');
        var map = this.getMap();
        if (!map) return;
        delete this._shadow;
        this._geometry.config('draggable', this._geometryDraggble);
        delete this._geometryDraggble;
        this._geometry.show();
        this._editStageLayer.remove();
        this._shadowLayer.remove();
        this._clearAllListeners();
        this._refreshHooks = [];
        if (this.options['symbol']) {
            this._geometry.setSymbol(this._originalSymbol);
            delete this._originalSymbol;
        }
        this.editing = false;
    };
    _proto.isEditing = function() {
        if (isNil(this.editing)) return false;
        return this.editing;
    };
    _proto._getGeometryEvents = function() {
        return {
            symbolchange: this._onGeoSymbolChange,
            'positionchange shapechange': this._exeAndReset
        };
    };
    _proto._switchGeometryEvents = function(oper) {
        if (this._geometry) {
            var events = this._getGeometryEvents();
            for(var p in events)this._geometry[oper](p, events[p], this);
        }
    };
    _proto._onGeoSymbolChange = function(param) {
        if (this._shadow) this._shadow.setSymbol(param.target._getInternalSymbol());
    };
    _proto._onMarkerDragEnd = function() {
        this._update('setCoordinates', this._shadow.getCoordinates().toArray());
        this._refresh();
    };
    _proto._createOrRefreshOutline = function() {
        var geometry = this._geometry;
        var outline = this._editOutline;
        if (outline) {
            outline.remove();
            this._editOutline = outline = geometry.getOutline();
            this._editStageLayer.addGeometry(outline);
        } else {
            outline = geometry.getOutline();
            this._editStageLayer.addGeometry(outline);
            this._editOutline = outline;
            this._addRefreshHook(this._createOrRefreshOutline);
        }
        return outline;
    };
    _proto._createCenterHandle = function() {
        var _this3 = this;
        var center = this._shadow.getCenter();
        var symbol = this.options['centerHandleSymbol'];
        var shadow;
        var handle = this.createHandle(center, {
            symbol: symbol,
            cursor: 'move',
            onDown: function() {
                shadow = _this3._shadow.copy();
                var symbol = lowerSymbolOpacity(shadow._getInternalSymbol(), 0.5);
                shadow.setSymbol(symbol).addTo(_this3._editStageLayer);
            },
            onMove: function(v, param) {
                var offset = param['coordOffset'];
                shadow.translate(offset);
            },
            onUp: function() {
                _this3._update('setCoordinates', maptalks_es_Coordinate.toNumberArrays(shadow.getCoordinates()));
                shadow.remove();
                _this3._refresh();
            }
        });
        this._addRefreshHook(function() {
            var center = _this3._shadow.getCenter();
            handle.setCoordinates(center);
        });
    };
    _proto._createHandleInstance = function(coordinate, opts) {
        var symbol = opts['symbol'];
        var handle = new maptalks_es_Marker(coordinate, {
            draggable: true,
            dragShadow: false,
            dragOnAxis: opts['axis'],
            cursor: opts['cursor'],
            symbol: symbol
        });
        return handle;
    };
    _proto.createHandle = function(coordinate, opts) {
        if (!opts) opts = {};
        var map = this.getMap();
        var handle = this._createHandleInstance(coordinate, opts);
        var me = this;
        function onHandleDragstart(param) {
            if (opts.onDown) {
                this._geometry.fire('handledragstart');
                opts.onDown.call(me, param['viewPoint'], param);
            }
            return false;
        }
        function onHandleDragging(param) {
            me._hideContext();
            var viewPoint = map._prjToViewPoint(handle._getPrjCoordinates());
            if (opts.onMove) {
                this._geometry.fire('handledragging');
                opts.onMove.call(me, viewPoint, param);
            }
            return false;
        }
        function onHandleDragEnd(ev) {
            if (opts.onUp) {
                this._geometry.fire('handledragend');
                opts.onUp.call(me, ev);
            }
            return false;
        }
        function onHandleRemove() {
            handle.config('draggable', false);
            handle.off('dragstart', onHandleDragstart, me);
            handle.off('dragging', onHandleDragging, me);
            handle.off('dragend', onHandleDragEnd, me);
            handle.off('removestart', onHandleRemove, me);
            delete handle['maptalks--editor-refresh-fn'];
        }
        handle.on('dragstart', onHandleDragstart, this);
        handle.on('dragging', onHandleDragging, this);
        handle.on('dragend', onHandleDragEnd, this);
        handle.on('removestart', onHandleRemove, this);
        if (opts.onRefresh) handle['maptalks--editor-refresh-fn'] = opts.onRefresh;
        this._editStageLayer.addGeometry(handle);
        return handle;
    };
    _proto._createResizeHandles = function(blackList, onHandleMove, onHandleUp) {
        var _this4 = this;
        var cursors = [
            'nw-resize',
            'n-resize',
            'ne-resize',
            'w-resize',
            'e-resize',
            'sw-resize',
            's-resize',
            'se-resize'
        ];
        var axis = [
            null,
            'y',
            null,
            'x',
            'x',
            null,
            'y',
            null
        ];
        var geometry = this._geometry;
        function getResizeAnchors(ext) {
            return [
                new maptalks_es_Point(ext['xmin'], ext['ymax']),
                new maptalks_es_Point((ext['xmax'] + ext['xmin']) / 2, ext['ymax']),
                new maptalks_es_Point(ext['xmax'], ext['ymax']),
                new maptalks_es_Point(ext['xmin'], (ext['ymax'] + ext['ymin']) / 2),
                new maptalks_es_Point(ext['xmax'], (ext['ymax'] + ext['ymin']) / 2),
                new maptalks_es_Point(ext['xmin'], ext['ymin']),
                new maptalks_es_Point((ext['xmax'] + ext['xmin']) / 2, ext['ymin']),
                new maptalks_es_Point(ext['xmax'], ext['ymin'])
            ];
        }
        if (!blackList) blackList = [];
        var me = this;
        var resizeHandles = [], anchorIndexes = {}, map = this.getMap(), handleSymbol = this.options['vertexHandleSymbol'];
        var fnLocateHandles = function() {
            var pExt = geometry._getPainter().get2DExtent(), anchors = getResizeAnchors(pExt);
            var _loop = function(i) {
                if (Array.isArray(blackList)) {
                    var isBlack = blackList.some(function(ele) {
                        return ele === i;
                    });
                    if (isBlack) return "continue";
                }
                var anchor = anchors[i], coordinate = map.pointToCoordinate(anchor);
                if (resizeHandles.length < anchors.length - blackList.length) {
                    var handle = _this4.createHandle(coordinate, {
                        symbol: handleSymbol,
                        cursor: cursors[i],
                        axis: axis[i],
                        onMove: function(_index) {
                            return function(handleViewPoint) {
                                me._updating = true;
                                onHandleMove(handleViewPoint, _index);
                                geometry.fire('resizing');
                            };
                        }(i),
                        onUp: function() {
                            me._updating = false;
                            onHandleUp();
                            _this4._refresh();
                        }
                    });
                    handle.setId(i);
                    anchorIndexes[i] = resizeHandles.length;
                    resizeHandles.push(handle);
                } else resizeHandles[anchorIndexes[i]].setCoordinates(coordinate);
            };
            for(var i = 0; i < anchors.length; i++){
                var _ret = _loop(i);
                if ("continue" === _ret) continue;
            }
        };
        fnLocateHandles();
        this._addRefreshHook(fnLocateHandles);
        return resizeHandles;
    };
    _proto.createMarkerEditor = function() {
        var _this5 = this;
        var geometryToEdit = this._geometry, shadow = this._shadow, map = this.getMap();
        if (!shadow._canEdit()) {
            if (console) console.warn('A marker can\'t be resized with symbol:', shadow.getSymbol());
            return;
        }
        if (!this._history) this._recordHistory(getUpdates());
        var symbol = shadow._getInternalSymbol();
        var dxdy = new maptalks_es_Point(0, 0);
        if (isNumber(symbol['markerDx'])) dxdy.x = symbol['markerDx'];
        if (isNumber(symbol['markerDy'])) dxdy.y = symbol['markerDy'];
        var blackList = null;
        if (maptalks_es_VectorMarkerSymbolizer.test(symbol)) {
            if ('pin' === symbol['markerType'] || 'pie' === symbol['markerType'] || 'bar' === symbol['markerType']) blackList = [
                5,
                6,
                7
            ];
        } else if (maptalks_es_ImageMarkerSymbolizer.test(symbol) || maptalks_es_VectorPathMarkerSymbolizer.test(symbol)) blackList = [
            5,
            6,
            7
        ];
        var resizeAbilities = [
            2,
            1,
            2,
            0,
            0,
            2,
            1,
            2
        ];
        var aspectRatio;
        if (this.options['fixAspectRatio']) {
            var size = shadow.getSize();
            aspectRatio = size.width / size.height;
        }
        var resizeHandles = this._createResizeHandles(null, function(handleViewPoint, i) {
            if (blackList && blackList.indexOf(i) >= 0) {
                var newCoordinates = map.viewPointToCoordinate(handleViewPoint.sub(dxdy));
                var coordinates = shadow.getCoordinates();
                newCoordinates.x = coordinates.x;
                shadow.setCoordinates(newCoordinates);
                _this5._updateCoordFromShadow(true);
                var mirrorHandle = resizeHandles[resizeHandles.length - 1 - i];
                var mirrorViewPoint = map.coordToViewPoint(mirrorHandle.getCoordinates());
                handleViewPoint = mirrorViewPoint;
            }
            var viewCenter = map._pointToViewPoint(shadow._getCenter2DPoint()).add(dxdy), symbol = shadow._getInternalSymbol();
            var wh = handleViewPoint.sub(viewCenter);
            if (blackList && handleViewPoint.y > viewCenter.y) wh.y = 0;
            var r = blackList ? 1 : 2;
            var width = 2 * Math.abs(wh.x), height = Math.abs(wh.y) * r;
            if (aspectRatio) {
                width = Math.max(width, height * aspectRatio);
                height = width / aspectRatio;
            }
            var ability = resizeAbilities[i];
            if (shadow instanceof maptalks_es_TextBox) {
                if (aspectRatio || 0 === ability || 2 === ability) {
                    shadow.setWidth(width);
                    geometryToEdit.setWidth(width);
                }
                if (aspectRatio || 1 === ability || 2 === ability) {
                    shadow.setHeight(height);
                    geometryToEdit.setHeight(height);
                }
            } else {
                if (aspectRatio || 0 === ability || 2 === ability) symbol['markerWidth'] = width;
                if (aspectRatio || 1 === ability || 2 === ability) symbol['markerHeight'] = height;
                shadow.setSymbol(symbol);
                geometryToEdit.setSymbol(symbol);
            }
        }, function() {
            _this5._update(getUpdates());
        });
        function getUpdates() {
            var updates = [
                [
                    'setCoordinates',
                    shadow.getCoordinates().toArray()
                ]
            ];
            if (shadow instanceof maptalks_es_TextBox) {
                updates.push([
                    'setWidth',
                    shadow.getWidth()
                ]);
                updates.push([
                    'setHeight',
                    shadow.getHeight()
                ]);
            } else updates.push([
                'setSymbol',
                shadow.getSymbol()
            ]);
            return updates;
        }
        function onZoomEnd() {
            this._refresh();
        }
        this._addListener([
            map,
            'zoomend',
            onZoomEnd
        ]);
    };
    _proto.createCircleEditor = function() {
        var _this6 = this;
        var circle = this._geometry, shadow = this._shadow;
        var map = this.getMap();
        if (!this._history) this._recordHistory([
            [
                'setCoordinates',
                shadow.getCoordinates().toArray()
            ],
            [
                'setRadius',
                shadow.getRadius()
            ]
        ]);
        this._createResizeHandles(null, function(handleViewPoint) {
            var center = circle.getCenter();
            var mouseCoordinate = map.viewPointToCoordinate(handleViewPoint);
            var wline = new maptalks_es_LineString([
                [
                    center.x,
                    center.y
                ],
                [
                    mouseCoordinate.x,
                    center.y
                ]
            ]);
            var hline = new maptalks_es_LineString([
                [
                    center.x,
                    center.y
                ],
                [
                    center.x,
                    mouseCoordinate.y
                ]
            ]);
            var r = Math.max(map.computeGeometryLength(wline), map.computeGeometryLength(hline));
            shadow.setRadius(r);
            circle.setRadius(r);
        }, function() {
            _this6._update('setRadius', shadow.getRadius());
        });
    };
    _proto.createEllipseOrRectEditor = function() {
        var _this7 = this;
        var resizeAbilities = [
            2,
            1,
            2,
            0,
            0,
            2,
            1,
            2
        ];
        var geometryToEdit = this._geometry, shadow = this._shadow;
        if (!this._history) this._recordHistory(getUpdates());
        var map = this.getMap();
        var isRect = this._geometry instanceof maptalks_es_Rectangle;
        var aspectRatio;
        if (this.options['fixAspectRatio']) aspectRatio = geometryToEdit.getWidth() / geometryToEdit.getHeight();
        var resizeHandles = this._createResizeHandles(null, function(mouseViewPoint, i) {
            var r = isRect ? 1 : 2;
            var pointSub, w, h;
            var targetPoint = mouseViewPoint;
            var ability = resizeAbilities[i];
            if (isRect) {
                var mirror = resizeHandles[7 - i];
                var mirrorViewPoint = map.coordToViewPoint(mirror.getCoordinates());
                pointSub = targetPoint.sub(mirrorViewPoint);
                var absSub = pointSub.abs();
                w = map.pixelToDistance(absSub.x, 0);
                h = map.pixelToDistance(0, absSub.y);
                var size = geometryToEdit.getSize();
                var firstMirrorCoordinate = resizeHandles[0].getCoordinates();
                var mouseCoordinate = map.viewPointToCoordinate(mouseViewPoint);
                var mirrorCoordinate = mirror.getCoordinates();
                var wline = new maptalks_es_LineString([
                    [
                        mirrorCoordinate.x,
                        mirrorCoordinate.y
                    ],
                    [
                        mouseCoordinate.x,
                        mirrorCoordinate.y
                    ]
                ]);
                var hline = new maptalks_es_LineString([
                    [
                        mirrorCoordinate.x,
                        mirrorCoordinate.y
                    ],
                    [
                        mirrorCoordinate.x,
                        mouseCoordinate.y
                    ]
                ]);
                w = map.computeGeometryLength(wline);
                h = map.computeGeometryLength(hline);
                if (0 === ability) {
                    if (aspectRatio) {
                        absSub.y = absSub.x / aspectRatio;
                        size.height = Math.abs(absSub.y);
                        h = w / aspectRatio;
                    }
                    targetPoint.y = mirrorViewPoint.y - size.height / 2;
                    mouseCoordinate.y = firstMirrorCoordinate.y;
                    if (4 === i) mouseCoordinate.x = Math.min(mouseCoordinate.x, firstMirrorCoordinate.x);
                    else mouseCoordinate.x = Math.min(mouseCoordinate.x, mirrorCoordinate.x);
                } else if (1 === ability) {
                    if (aspectRatio) {
                        absSub.x = absSub.y * aspectRatio;
                        size.width = Math.abs(absSub.x);
                        w = h * aspectRatio;
                    }
                    targetPoint.x = mirrorViewPoint.x - size.width / 2;
                    mouseCoordinate.x = firstMirrorCoordinate.x;
                    mouseCoordinate.y = Math.max(mouseCoordinate.y, mirrorCoordinate.y);
                } else {
                    if (aspectRatio) {
                        if (w > h * aspectRatio) {
                            h = w / aspectRatio;
                            targetPoint.y = mirrorViewPoint.y + absSub.x * sign(pointSub.y) / aspectRatio;
                        } else {
                            w = h * aspectRatio;
                            targetPoint.x = mirrorViewPoint.x + absSub.y * sign(pointSub.x) * aspectRatio;
                        }
                    }
                    mouseCoordinate.x = Math.min(mouseCoordinate.x, mirrorCoordinate.x);
                    mouseCoordinate.y = Math.max(mouseCoordinate.y, mirrorCoordinate.y);
                }
                shadow.setCoordinates(mouseCoordinate);
                _this7._updateCoordFromShadow(true);
            } else {
                var center = geometryToEdit.getCenter();
                var _mouseCoordinate = map.viewPointToCoordinate(targetPoint);
                var _wline = new maptalks_es_LineString([
                    [
                        center.x,
                        center.y
                    ],
                    [
                        _mouseCoordinate.x,
                        center.y
                    ]
                ]);
                var _hline = new maptalks_es_LineString([
                    [
                        center.x,
                        center.y
                    ],
                    [
                        center.x,
                        _mouseCoordinate.y
                    ]
                ]);
                w = map.computeGeometryLength(_wline);
                h = map.computeGeometryLength(_hline);
                if (aspectRatio) {
                    w = Math.max(w, h * aspectRatio);
                    h = w / aspectRatio;
                }
            }
            if (aspectRatio || 0 === ability || 2 === ability) {
                shadow.setWidth(w * r);
                geometryToEdit.setWidth(w * r);
            }
            if (aspectRatio || 1 === ability || 2 === ability) {
                shadow.setHeight(h * r);
                geometryToEdit.setHeight(h * r);
            }
        }, function() {
            _this7._update(getUpdates());
        });
        function getUpdates() {
            return [
                [
                    'setCoordinates',
                    shadow.getCoordinates().toArray()
                ],
                [
                    'setWidth',
                    shadow.getWidth()
                ],
                [
                    'setHeight',
                    shadow.getHeight()
                ]
            ];
        }
    };
    _proto.createPolygonEditor = function() {
        var map = this.getMap(), shadow = this._shadow, me = this, projection = map.getProjection();
        if (!this._history) this._recordHistory('setCoordinates', maptalks_es_Coordinate.toNumberArrays(shadow.getCoordinates()));
        var verticeLimit = shadow instanceof maptalks_es_Polygon ? 3 : 2;
        var propertyOfVertexRefreshFn = 'maptalks--editor-refresh-fn', propertyOfVertexIndex = 'maptalks--editor-vertex-index';
        var vertexHandles = {
            0: []
        }, newVertexHandles = {
            0: []
        };
        function getVertexCoordinates(ringIndex) {
            if (void 0 === ringIndex) ringIndex = 0;
            if (!(shadow instanceof maptalks_es_Polygon)) return shadow.getCoordinates();
            var coordinates = shadow.getCoordinates()[ringIndex] || [];
            return coordinates.slice(0, coordinates.length - 1);
        }
        function getVertexPrjCoordinates(ringIndex) {
            if (void 0 === ringIndex) ringIndex = 0;
            if (0 === ringIndex) return shadow._getPrjCoordinates();
            return shadow._getPrjHoles()[ringIndex - 1];
        }
        function onVertexAddOrRemove() {
            for(var ringIndex in vertexHandles){
                for(var i = vertexHandles[ringIndex].length - 1; i >= 0; i--)vertexHandles[ringIndex][i][propertyOfVertexIndex] = i;
                for(var _i = newVertexHandles[ringIndex].length - 1; _i >= 0; _i--)newVertexHandles[ringIndex][_i][propertyOfVertexIndex] = _i;
            }
            me._updateCoordFromShadow();
        }
        function removeVertex(param) {
            var handle = param['target'], index = handle[propertyOfVertexIndex];
            var ringIndex = isNumber(handle._ringIndex) ? handle._ringIndex : 0;
            var prjCoordinates = getVertexPrjCoordinates(ringIndex);
            if (prjCoordinates.length <= verticeLimit) return;
            prjCoordinates.splice(index, 1);
            if (ringIndex > 0) shadow._prjHoles[ringIndex - 1] = prjCoordinates;
            else shadow._setPrjCoordinates(prjCoordinates);
            shadow._updateCache();
            vertexHandles[ringIndex].splice(index, 1)[0].remove();
            if (index < newVertexHandles[ringIndex].length) newVertexHandles[ringIndex].splice(index, 1)[0].remove();
            var nextIndex;
            nextIndex = 0 === index ? newVertexHandles[ringIndex].length - 1 : index - 1;
            newVertexHandles[ringIndex].splice(nextIndex, 1)[0].remove();
            newVertexHandles[ringIndex].splice(nextIndex, 0, createNewVertexHandle.call(me, nextIndex, ringIndex));
            onVertexAddOrRemove();
            me._refresh();
        }
        function moveVertexHandle(handleViewPoint, index, ringIndex) {
            if (void 0 === ringIndex) ringIndex = 0;
            var vertice = getVertexPrjCoordinates(ringIndex);
            var nVertex = map._viewPointToPrj(handleViewPoint);
            var pVertex = vertice[index];
            pVertex.x = nVertex.x;
            pVertex.y = nVertex.y;
            shadow._updateCache();
            shadow.onShapeChanged();
            me._updateCoordFromShadow(true);
            var nextIndex;
            nextIndex = 0 === index ? newVertexHandles[ringIndex].length - 1 : index - 1;
            if (newVertexHandles[ringIndex][index]) newVertexHandles[ringIndex][index][propertyOfVertexRefreshFn]();
            if (newVertexHandles[ringIndex][nextIndex]) newVertexHandles[ringIndex][nextIndex][propertyOfVertexRefreshFn]();
        }
        function createVertexHandle(index, ringIndex) {
            if (void 0 === ringIndex) ringIndex = 0;
            var vertex = getVertexCoordinates(ringIndex)[index];
            var handle = me.createHandle(vertex, {
                symbol: me.options['vertexHandleSymbol'],
                cursor: 'pointer',
                axis: null,
                onMove: function(handleViewPoint) {
                    moveVertexHandle(handleViewPoint, handle[propertyOfVertexIndex], ringIndex);
                },
                onRefresh: function() {
                    vertex = getVertexCoordinates(ringIndex)[handle[propertyOfVertexIndex]];
                    handle.setCoordinates(vertex);
                },
                onUp: function() {
                    me._refresh();
                    me._updateCoordFromShadow();
                },
                onDown: function(param, e) {
                    if (e && e.domEvent && 2 === e.domEvent.button) return;
                }
            });
            handle[propertyOfVertexIndex] = index;
            handle._ringIndex = ringIndex;
            handle.on(me.options['removeVertexOn'], removeVertex);
            return handle;
        }
        function createNewVertexHandle(index, ringIndex) {
            if (void 0 === ringIndex) ringIndex = 0;
            var vertexCoordinates = getVertexCoordinates(ringIndex);
            var nextVertex;
            nextVertex = index + 1 >= vertexCoordinates.length ? vertexCoordinates[0] : vertexCoordinates[index + 1];
            var vertex = vertexCoordinates[index].add(nextVertex).multi(0.5);
            var handle = me.createHandle(vertex, {
                symbol: me.options['newVertexHandleSymbol'],
                cursor: 'pointer',
                axis: null,
                onDown: function(param, e) {
                    if (e && e.domEvent && 2 === e.domEvent.button) return;
                    var prjCoordinates = getVertexPrjCoordinates(ringIndex);
                    var vertexIndex = handle[propertyOfVertexIndex];
                    var pVertex = projection.project(handle.getCoordinates());
                    prjCoordinates.splice(vertexIndex + 1, 0, pVertex);
                    if (ringIndex > 0) shadow._prjHoles[ringIndex - 1] = prjCoordinates;
                    else shadow._setPrjCoordinates(prjCoordinates);
                    shadow._updateCache();
                    var symbol = handle.getSymbol();
                    delete symbol['opacity'];
                    handle.setSymbol(symbol);
                    newVertexHandles[ringIndex].splice(vertexIndex, 0, createNewVertexHandle.call(me, vertexIndex, ringIndex), createNewVertexHandle.call(me, vertexIndex + 1, ringIndex));
                },
                onMove: function(handleViewPoint) {
                    moveVertexHandle(handleViewPoint, handle[propertyOfVertexIndex] + 1, ringIndex);
                },
                onUp: function(e) {
                    if (e && e.domEvent && 2 === e.domEvent.button) return;
                    var vertexIndex = handle[propertyOfVertexIndex];
                    removeFromArray(handle, newVertexHandles[ringIndex]);
                    handle.remove();
                    vertexHandles[ringIndex].splice(vertexIndex + 1, 0, createVertexHandle.call(me, vertexIndex + 1, ringIndex));
                    onVertexAddOrRemove();
                    me._updateCoordFromShadow();
                    me._refresh();
                },
                onRefresh: function() {
                    vertexCoordinates = getVertexCoordinates(ringIndex);
                    var vertexIndex = handle[propertyOfVertexIndex];
                    var nextIndex;
                    nextIndex = vertexIndex === vertexCoordinates.length - 1 ? 0 : vertexIndex + 1;
                    var refreshVertex = vertexCoordinates[vertexIndex].add(vertexCoordinates[nextIndex]).multi(0.5);
                    handle.setCoordinates(refreshVertex);
                }
            });
            handle[propertyOfVertexIndex] = index;
            return handle;
        }
        if (shadow instanceof maptalks_es_Polygon) {
            var rings = shadow.getHoles().length + 1;
            for(var ringIndex = 0; ringIndex < rings; ringIndex++){
                vertexHandles[ringIndex] = [];
                newVertexHandles[ringIndex] = [];
                var vertexCoordinates = getVertexCoordinates(ringIndex);
                for(var i = 0, len = vertexCoordinates.length; i < len; i++){
                    vertexHandles[ringIndex].push(createVertexHandle.call(this, i, ringIndex));
                    if (i < len - 1) newVertexHandles[ringIndex].push(createNewVertexHandle.call(this, i, ringIndex));
                }
                newVertexHandles[ringIndex].push(createNewVertexHandle.call(this, vertexCoordinates.length - 1, ringIndex));
            }
        } else {
            var _ringIndex = 0;
            var _vertexCoordinates = getVertexCoordinates(_ringIndex);
            for(var _i2 = 0, _len = _vertexCoordinates.length; _i2 < _len; _i2++){
                vertexHandles[_ringIndex].push(createVertexHandle.call(this, _i2, _ringIndex));
                if (_i2 < _len - 1) newVertexHandles[_ringIndex].push(createNewVertexHandle.call(this, _i2, _ringIndex));
            }
        }
        this._addRefreshHook(function() {
            for(var _ringIndex2 in newVertexHandles)for(var _i3 = newVertexHandles[_ringIndex2].length - 1; _i3 >= 0; _i3--)newVertexHandles[_ringIndex2][_i3][propertyOfVertexRefreshFn](_ringIndex2);
            for(var _ringIndex3 in vertexHandles)for(var _i4 = vertexHandles[_ringIndex3].length - 1; _i4 >= 0; _i4--)vertexHandles[_ringIndex3][_i4][propertyOfVertexRefreshFn](_ringIndex3);
        });
    };
    _proto._refresh = function() {
        if (this._refreshHooks) for(var i = this._refreshHooks.length - 1; i >= 0; i--)this._refreshHooks[i].call(this);
    };
    _proto._hideContext = function() {
        if (this._geometry) {
            this._geometry.closeMenu();
            this._geometry.closeInfoWindow();
        }
    };
    _proto._addListener = function(listener) {
        if (!this._eventListeners) this._eventListeners = [];
        this._eventListeners.push(listener);
        listener[0].on(listener[1], listener[2], this);
    };
    _proto._clearAllListeners = function() {
        if (this._eventListeners && this._eventListeners.length > 0) {
            for(var i = this._eventListeners.length - 1; i >= 0; i--){
                var listener = this._eventListeners[i];
                listener[0].off(listener[1], listener[2], this);
            }
            this._eventListeners = [];
        }
    };
    _proto._addRefreshHook = function(fn) {
        if (!fn) return;
        if (!this._refreshHooks) this._refreshHooks = [];
        this._refreshHooks.push(fn);
    };
    _proto._update = function(method) {
        for(var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key = 1; _key < _len2; _key++)args[_key - 1] = arguments[_key];
        this._exeHistory([
            method,
            args
        ]);
        this._recordHistory.apply(this, [
            method
        ].concat(args));
    };
    _proto._updateCoordFromShadow = function(ignoreRecord) {
        if (!this._shadow) return;
        var coords = this._shadow.getCoordinates();
        var geo = this._geometry;
        var updating = this._updating;
        this._updating = true;
        geo.setCoordinates(coords);
        if (!ignoreRecord) this._recordHistory('setCoordinates', maptalks_es_Coordinate.toNumberArrays(geo.getCoordinates()));
        this._updating = updating;
    };
    _proto._recordHistory = function(method) {
        if (!this._history) {
            this._history = [];
            this._historyPointer = 0;
        }
        for(var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key2 = 1; _key2 < _len3; _key2++)args[_key2 - 1] = arguments[_key2];
        if (this._history.length) {
            var lastOperation = this._history[this._history.length - 1];
            if (lastOperation[0] === method && JSON.stringify(lastOperation[1]) === JSON.stringify(args)) return;
        }
        if (this._historyPointer < this._history.length - 1) this._history.splice(this._historyPointer + 1);
        this._history.push([
            method,
            args
        ]);
        this._historyPointer = this._history.length - 1;
        this._geometry.fire('editrecord');
    };
    _proto.cancel = function() {
        if (!this._history || 0 === this._historyPointer) return this;
        this._historyPointer = 0;
        var record = this._history[0];
        this._exeAndReset(record);
        return this;
    };
    _proto.undo = function() {
        if (!this._history || 0 === this._historyPointer) return this;
        var record = this._history[--this._historyPointer];
        this._exeAndReset(record);
        return this;
    };
    _proto.redo = function() {
        if (!this._history || this._historyPointer === this._history.length - 1) return this;
        var record = this._history[++this._historyPointer];
        this._exeAndReset(record);
        return this;
    };
    _proto._exeAndReset = function(record) {
        if (this._updating) return;
        this._exeHistory(record);
        var history = this._history, pointer = this._historyPointer;
        this.stop();
        this._history = history;
        this._historyPointer = pointer;
        this.start();
    };
    _proto._exeHistory = function(record) {
        var _this8 = this;
        if (!Array.isArray(record)) return;
        var updating = this._updating;
        this._updating = true;
        var geo = this._geometry;
        if (Array.isArray(record[0])) record[0].forEach(function(o) {
            var m = o[0], args = o.slice(1);
            _this8._shadow[m].apply(_this8._shadow, args);
            geo[m].apply(geo, args);
        });
        else {
            this._shadow[record[0]].apply(this._shadow, record[1]);
            geo[record[0]].apply(geo, record[1]);
        }
        this._updating = updating;
    };
    return GeometryEditor;
}(maptalks_es_Eventable(maptalks_es_Class));
maptalks_es_GeometryEditor.mergeOptions(options$z);
var TextEditable = {
    startEditText: function() {
        if (!this.getMap()) return this;
        this.hide();
        this.endEditText();
        this._prepareEditor();
        this._fireEvent('edittextstart');
        return this;
    },
    endEditText: function() {
        if (this._textEditor) {
            var html = this._textEditor.innerHTML;
            html = html.replace(/<p>/ig, '').replace(/<\/p>/ig, '<br/>');
            this._textEditor.innerHTML = html;
            var content = this._textEditor.innerText.replace(/[\r\n]+$/gi, '');
            this.setContent(content);
            off(this._textEditor, 'mousedown dblclick', stopPropagation);
            this.getMap().off('mousedown', this.endEditText, this);
            this._editUIMarker.remove();
            delete this._editUIMarker;
            this._textEditor.onkeyup = null;
            delete this._textEditor;
            this.show();
            this._fireEvent('edittextend');
        }
        return this;
    },
    isEditingText: function() {
        if (this._textEditor) return true;
        return false;
    },
    getTextEditor: function() {
        return this._editUIMarker;
    },
    _prepareEditor: function() {
        var map = this.getMap();
        var editContainer = this._createEditor();
        this._textEditor = editContainer;
        map.on('mousedown', this.endEditText, this);
        var offset = this._getEditorOffset();
        this._editUIMarker = new maptalks_es_UIMarker(this.getCoordinates(), {
            animation: null,
            content: editContainer,
            dx: offset.dx,
            dy: offset.dy
        }).addTo(map);
        this._setCursorToLast(this._textEditor);
    },
    _getEditorOffset: function() {
        var symbol = this._getInternalSymbol() || {};
        var dx = 0, dy = 0;
        var textAlign = symbol['textHorizontalAlignment'];
        if ('middle' === textAlign || isNil(textAlign)) {
            dx = (symbol['textDx'] || 0) - 2;
            dy = (symbol['textDy'] || 0) - 2;
        } else {
            dx = (symbol['markerDx'] || 0) - 2;
            dy = (symbol['markerDy'] || 0) - 2;
        }
        return {
            dx: dx,
            dy: dy
        };
    },
    _createEditor: function() {
        var content = this.getContent();
        var labelSize = this.getSize(), symbol = this._getInternalSymbol() || {}, width = labelSize.width, textColor = symbol['textFill'] || '#000000', textSize = symbol['textSize'] || 12, height = labelSize.height, lineColor = symbol['markerLineColor'] || '#000', fill = symbol['markerFill'] || '#3398CC', spacing = symbol['textLineSpacing'] || 0;
        var editor = createEl('div');
        editor.contentEditable = true;
        editor.style.cssText = "background:" + fill + "; border:1px solid " + lineColor + ";\n            color:" + textColor + ";font-size:" + textSize + "px;width:" + (width - 2) + "px;height:" + (height - 2) + "px;margin: auto;\n            line-height:" + (textSize + spacing) + "px;outline: 0; padding:0; margin:0;word-wrap: break-word;\n            overflow: hidden;-webkit-user-modify: read-write-plaintext-only;";
        editor.innerText = content;
        on(editor, 'mousedown dblclick', stopPropagation);
        editor.onkeyup = function(event) {
            var h = editor.style.height || 0;
            if (13 === event.keyCode) editor.style.height = parseInt(h) + textSize / 2 + 'px';
        };
        return editor;
    },
    _setCursorToLast: function(obj) {
        var range;
        if (window.getSelection) {
            obj.focus();
            range = window.getSelection();
            range.selectAllChildren(obj);
            range.collapseToEnd();
        } else if (document.selection) {
            range = document.selection.createRange();
            range.moveToElementText(obj);
            range.collapse(false);
            range.select();
        }
    }
};
maptalks_es_TextMarker.include(TextEditable);
maptalks_es_Geometry.include({
    animate: function(styles, options, step) {
        var _this = this;
        if (this._animPlayer) this._animPlayer.finish();
        if (isFunction(options)) step = options;
        if (!options) options = {};
        var map = this.getMap(), projection = this._getProjection(), symbol = this.getSymbol() || {}, stylesToAnimate = this._prepareAnimationStyles(styles);
        var preTranslate;
        var isFocusing = options['focus'];
        delete this._animationStarted;
        if (map) {
            var renderer = map._getRenderer();
            var framer = function(fn) {
                renderer.callInNextFrame(fn);
            };
            options['framer'] = framer;
        }
        var player = Animation.animate(stylesToAnimate, options, function(frame) {
            if (map && map.isRemoved()) {
                player.finish();
                return;
            }
            if (map && !_this._animationStarted && isFocusing) map.onMoveStart();
            var styles = frame.styles;
            for(var p in styles)if ('symbol' !== p && 'translate' !== p && styles.hasOwnProperty(p)) {
                var fnName = 'set' + p[0].toUpperCase() + p.slice(1);
                _this[fnName](styles[p]);
            }
            var translate = styles['translate'];
            if (translate) {
                var toTranslate = translate;
                if (preTranslate) toTranslate = translate.sub(preTranslate);
                preTranslate = translate;
                _this.translate(toTranslate);
            }
            var dSymbol = styles['symbol'];
            if (dSymbol) _this.setSymbol(extendSymbol(symbol, dSymbol));
            if (map && isFocusing) {
                var pcenter = projection.project(_this.getCenter());
                map._setPrjCenter(pcenter);
                var e = map._parseEventFromCoord(projection.unproject(pcenter));
                if ('running' !== player.playState) map.onMoveEnd(e);
                else map.onMoving(e);
            }
            _this._fireAnimateEvent(player.playState);
            if (step) step(frame);
        }, this);
        this._animPlayer = player;
        return this._animPlayer.play();
    },
    _prepareAnimationStyles: function(styles) {
        var symbol = this._getInternalSymbol();
        var stylesToAnimate = {};
        for(var p in styles)if (styles.hasOwnProperty(p)) {
            var v = styles[p];
            if ('translate' !== p && 'symbol' !== p) {
                var fnName = 'get' + p[0].toUpperCase() + p.substring(1);
                var current = this[fnName]();
                stylesToAnimate[p] = [
                    current,
                    v
                ];
            } else if ('symbol' === p) {
                var symbolToAnimate = void 0;
                if (Array.isArray(styles['symbol'])) {
                    if (!Array.isArray(symbol)) throw new Error('geometry\'symbol isn\'t a composite symbol, while the symbol in styles is.');
                    symbolToAnimate = [];
                    var symbolInStyles = styles['symbol'];
                    for(var i = 0; i < symbolInStyles.length; i++){
                        if (!symbolInStyles[i]) {
                            symbolToAnimate.push(null);
                            continue;
                        }
                        var a = {};
                        for(var sp in symbolInStyles[i])if (symbolInStyles[i].hasOwnProperty(sp)) a[sp] = [
                            symbol[i][sp],
                            symbolInStyles[i][sp]
                        ];
                        symbolToAnimate.push(a);
                    }
                } else {
                    if (Array.isArray(symbol)) throw new Error('geometry\'symbol is a composite symbol, while the symbol in styles isn\'t.');
                    symbolToAnimate = {};
                    for(var _sp in v)if (v.hasOwnProperty(_sp)) symbolToAnimate[_sp] = [
                        symbol[_sp],
                        v[_sp]
                    ];
                }
                stylesToAnimate['symbol'] = symbolToAnimate;
            } else if ('translate' === p) stylesToAnimate['translate'] = new maptalks_es_Coordinate(v);
        }
        return stylesToAnimate;
    },
    _fireAnimateEvent: function(playState) {
        if ('finished' === playState) {
            delete this._animationStarted;
            this._fireEvent('animateend');
        } else if ('running' === playState) {
            if (this._animationStarted) this._fireEvent('animating');
            else {
                this._fireEvent('animatestart');
                this._animationStarted = true;
            }
        }
    }
});
var DRAG_STAGE_LAYER_ID = INTERNAL_LAYER_PREFIX + '_drag_stage';
var EVENTS$2 = Browser$1.touch ? 'touchstart mousedown' : 'mousedown';
var maptalks_es_GeometryDragHandler = function(_Handler) {
    _inheritsLoose(GeometryDragHandler, _Handler);
    function GeometryDragHandler(target) {
        return _Handler.call(this, target) || this;
    }
    var _proto = GeometryDragHandler.prototype;
    _proto.addHooks = function() {
        this.target.on(EVENTS$2, this._startDrag, this);
    };
    _proto.removeHooks = function() {
        this._endDrag();
        this.target.off(EVENTS$2, this._startDrag, this);
        delete this.container;
    };
    _proto._prepareDragHandler = function() {
        this._dragHandler = new maptalks_es_DragHandler(this.container);
        this._dragHandler.on('dragging', this._dragging, this).on('mouseup', this._endDrag, this).enable();
    };
    _proto._prepareShadow = function() {
        var _this = this;
        var target = this.target;
        this._prepareDragStageLayer();
        if (this._shadow) this._shadow.remove();
        var shadow = this._shadow = target.copy();
        if (shadow.getGeometries) {
            var shadows = shadow.getGeometries();
            var geos = target.getGeometries();
            shadows.forEach(function(g, i) {
                _this._updateShadowSymbol(g, geos[i]);
            });
        } else this._updateShadowSymbol(shadow, target);
        shadow.setId(null);
        this._prepareShadowConnectors();
    };
    _proto._updateShadowSymbol = function(shadow, target) {
        shadow.setSymbol(target._getInternalSymbol());
        if (target.options['dragShadow']) {
            var symbol = lowerSymbolOpacity(shadow._getInternalSymbol(), 0.5);
            shadow.setSymbol(symbol);
        }
    };
    _proto._prepareShadowConnectors = function() {
        var target = this.target;
        var shadow = this._shadow;
        var resources = this._dragStageLayer._getRenderer().resources;
        var shadowConnectors = [];
        if (maptalks_es_ConnectorLine._hasConnectors(target)) {
            var connectors = maptalks_es_ConnectorLine._getConnectors(target);
            for(var i = 0, l = connectors.length; i < l; i++){
                var targetConn = connectors[i];
                var connOptions = targetConn.config(), connSymbol = targetConn._getInternalSymbol();
                connOptions['symbol'] = lowerSymbolOpacity(connSymbol, 0.5);
                var conn = void 0;
                conn = targetConn.getConnectSource() === target ? new targetConn.constructor(shadow, targetConn.getConnectTarget(), connOptions) : new targetConn.constructor(targetConn.getConnectSource(), shadow, connOptions);
                shadowConnectors.push(conn);
                if (targetConn.getLayer() && targetConn.getLayer()._getRenderer()) resources.merge(targetConn.getLayer()._getRenderer().resources);
            }
        }
        this._shadowConnectors = shadowConnectors;
        shadowConnectors.push(shadow);
        this._dragStageLayer.bringToFront().addGeometry(shadowConnectors);
    };
    _proto._onTargetUpdated = function() {
        if (this._shadow) this._shadow.setSymbol(this.target._getSymbol());
    };
    _proto._prepareDragStageLayer = function() {
        var map = this.target.getMap(), layer = this.target.getLayer();
        this._dragStageLayer = map.getLayer(DRAG_STAGE_LAYER_ID);
        if (!this._dragStageLayer) {
            this._dragStageLayer = new maptalks_es_VectorLayer(DRAG_STAGE_LAYER_ID, {
                enableAltitude: layer.options['enableAltitude'],
                altitudeProperty: layer.options['altitudeProperty']
            });
            map.addLayer(this._dragStageLayer);
        }
        var resources = new maptalks_es_ResourceCache();
        resources.merge(layer._getRenderer().resources);
        this._dragStageLayer._getRenderer().resources = resources;
    };
    _proto._startDrag = function(param) {
        var map = this.target.getMap();
        if (!map) return;
        var parent = this.target._getParent();
        if (parent) return;
        if (this.isDragging()) return;
        var domEvent = param['domEvent'];
        if (domEvent.touches && domEvent.touches.length > 1 || 2 === domEvent.button) return;
        this.container = map._panels.mapWrapper || map._containerDOM;
        this.target.on('click', this._endDrag, this);
        this._lastCoord = this._correctCoord(param['coordinate']);
        this._lastPoint = param['containerPoint'];
        this._prepareDragHandler();
        this._dragHandler.onMouseDown(param['domEvent']);
        on(this.container, 'mouseleave', this._endDrag, this);
        this._startParam = param;
        this._moved = false;
    };
    _proto._dragging = function(param) {
        var target = this.target;
        var map = target.getMap(), e = map._parseEvent(param['domEvent']);
        var domEvent = e['domEvent'];
        if (domEvent.touches && domEvent.touches.length > 1) return;
        if (!this._moved) {
            this._moved = true;
            target.on('symbolchange', this._onTargetUpdated, this);
            this._isDragging = true;
            this._prepareShadow();
            if (!target.options['dragShadow']) target.hide();
            this._shadow._fireEvent('dragstart', e);
            this.target._fireEvent('dragstart', this._startParam || e);
            delete this._startParam;
            return;
        }
        if (!this._shadow) return;
        var axis = this._shadow.options['dragOnAxis'], coord = this._correctCoord(e['coordinate']), point = e['containerPoint'];
        this._lastPoint = this._lastPoint || point;
        this._lastCoord = this._lastCoord || coord;
        var pointOffset = point.sub(this._lastPoint);
        var coordOffset = coord.sub(this._lastCoord);
        if ('x' === axis) pointOffset.y = coordOffset.y = 0;
        else if ('y' === axis) pointOffset.x = coordOffset.x = 0;
        this._lastPoint = point;
        this._lastCoord = coord;
        this._shadow.translate(coordOffset);
        if (!target.options['dragShadow']) target.translate(coordOffset);
        e['coordOffset'] = coordOffset;
        e['pointOffset'] = pointOffset;
        this._shadow._fireEvent('dragging', e);
        target._fireEvent('dragging', e);
    };
    _proto._endDrag = function(param) {
        if (this._dragHandler) {
            this._dragHandler.disable();
            delete this._dragHandler;
        }
        if (this.container) off(this.container, 'mouseleave', this._endDrag, this);
        if (!this.target) return;
        var target = this.target;
        target.off('click', this._endDrag, this);
        target.off('symbolchange', this._onTargetUpdated, this);
        delete this._lastCoord;
        delete this._lastPoint;
        this._isDragging = false;
        var map = target.getMap();
        if (this.enabled() && map) {
            var e = map._parseEvent(param ? param['domEvent'] : null);
            this._updateTargetAndRemoveShadow(e);
            if (this._moved) target._fireEvent('dragend', e);
        }
    };
    _proto.isDragging = function() {
        if (!this._isDragging) return false;
        return true;
    };
    _proto._updateTargetAndRemoveShadow = function(eventParam) {
        var target = this.target, map = target.getMap();
        if (!target.options['dragShadow']) target.show();
        var shadow = this._shadow;
        if (shadow) {
            if (target.options['dragShadow']) {
                if (target.getGeometries) {
                    var shadows = shadow.getGeometries();
                    var geos = target.getGeometries();
                    shadows.forEach(function(g, i) {
                        geos[i].setCoordinates(shadows[i].getCoordinates());
                    });
                } else target.setCoordinates(shadow.getCoordinates());
            }
            shadow._fireEvent('dragend', eventParam);
            shadow.remove();
            delete this._shadow;
        }
        if (this._shadowConnectors) {
            map.getLayer(DRAG_STAGE_LAYER_ID).removeGeometry(this._shadowConnectors);
            delete this._shadowConnectors;
        }
        if (this._dragStageLayer) this._dragStageLayer.remove();
    };
    _proto._correctCoord = function(coord) {
        var map = this.target.getMap();
        if (!map.getPitch()) return coord;
        var painter = this.target._getPainter();
        if (!painter.getMinAltitude()) return coord;
        var alt = (painter.getMinAltitude() + painter.getMaxAltitude()) / 2;
        return map.locateByPoint(coord, 0, -alt);
    };
    return GeometryDragHandler;
}(Handler$1);
maptalks_es_Geometry.mergeOptions({
    draggable: false,
    dragShadow: true,
    dragOnAxis: null
});
maptalks_es_Geometry.addInitHook('addHandler', 'draggable', maptalks_es_GeometryDragHandler);
maptalks_es_Geometry.include({
    isDragging: function() {
        if (this._getParent()) return this._getParent().isDragging();
        if (this['draggable']) return this['draggable'].isDragging();
        return false;
    }
});
maptalks_es_Geometry.include({
    startEdit: function(opts) {
        if (!this.getMap() || !this.options['editable']) return this;
        this.endEdit();
        this._editor = new maptalks_es_GeometryEditor(this, opts);
        this._editor.start();
        this.fire('editstart');
        return this;
    },
    endEdit: function() {
        if (this._editor) {
            this._editor.stop();
            delete this._editor;
            this.fire('editend');
        }
        return this;
    },
    redoEdit: function() {
        if (!this.isEditing()) return this;
        this._editor.redo();
        this.fire('redoedit');
        return this;
    },
    undoEdit: function() {
        if (!this.isEditing()) return this;
        this._editor.undo();
        this.fire('undoedit');
        return this;
    },
    cancelEdit: function() {
        if (!this.isEditing()) return this;
        this._editor.cancel();
        this.fire('canceledit');
        return this;
    },
    isEditing: function() {
        if (this._editor) return this._editor.isEditing();
        return false;
    }
});
maptalks_es_Geometry.include({
    _onEvent: function(event, type) {
        if (!this.getMap()) return;
        var eventType = type || this._getEventTypeToFire(event);
        if ('contextmenu' === eventType && this.listens('contextmenu')) {
            stopPropagation(event);
            preventDefault(event);
        }
        var params = this._getEventParams(event);
        this._fireEvent(eventType, params);
    },
    _getEventTypeToFire: function(domEvent) {
        return domEvent.type;
    },
    _getEventParams: function(e) {
        var map = this.getMap();
        var eventParam = {
            domEvent: e
        };
        var actual = e.touches && e.touches.length > 0 ? e.touches[0] : e.changedTouches && e.changedTouches.length > 0 ? e.changedTouches[0] : e;
        if (actual) {
            var containerPoint = getEventContainerPoint(actual, map._containerDOM);
            eventParam['coordinate'] = map.containerPointToCoordinate(containerPoint);
            eventParam['containerPoint'] = containerPoint;
            eventParam['viewPoint'] = map.containerPointToViewPoint(containerPoint);
            eventParam['pont2d'] = map._containerPointToPoint(containerPoint);
        }
        return eventParam;
    }
});
maptalks_es_Geometry.include({
    setInfoWindow: function(options) {
        this.removeInfoWindow();
        if (options instanceof maptalks_es_InfoWindow) {
            this._infoWindow = options;
            this._infoWinOptions = extend({}, this._infoWindow.options);
            this._infoWindow.addTo(this);
            return this;
        }
        this._infoWinOptions = extend({}, options);
        if (this._infoWindow) this._infoWindow.setOptions(options);
        else if (this.getMap()) this._bindInfoWindow(this._infoWinOptions);
        return this;
    },
    getInfoWindow: function() {
        if (!this._infoWindow) return null;
        return this._infoWindow;
    },
    openInfoWindow: function(coordinate) {
        if (!this.getMap()) return this;
        if (!coordinate) coordinate = this.getCenter();
        if (this._infoWindow) this._infoWindow.show(coordinate);
        else if (this._infoWinOptions && this.getMap()) {
            this._bindInfoWindow(this._infoWinOptions);
            this._infoWindow.show(coordinate);
        }
        return this;
    },
    closeInfoWindow: function() {
        if (this._infoWindow) this._infoWindow.hide();
        return this;
    },
    removeInfoWindow: function() {
        this._unbindInfoWindow();
        delete this._infoWinOptions;
        delete this._infoWindow;
        return this;
    },
    _bindInfoWindow: function(options) {
        this._infoWindow = new maptalks_es_InfoWindow(options);
        this._infoWindow.addTo(this);
        return this;
    },
    _unbindInfoWindow: function() {
        if (this._infoWindow) {
            this.closeInfoWindow();
            this._infoWindow.remove();
            delete this._infoWindow;
        }
        return this;
    }
});
var maptalks_es_LRUCache = function() {
    function LRUCache(max, onRemove) {
        this.max = max;
        this.onRemove = onRemove;
        this.reset();
    }
    var _proto = LRUCache.prototype;
    _proto.reset = function() {
        for(var key in this.data)this.onRemove(this.data[key]);
        this.data = {};
        this.order = [];
        return this;
    };
    _proto.clear = function() {
        this.reset();
        delete this.onRemove;
    };
    _proto.add = function(key, data) {
        if (this.has(key)) {
            this.order.splice(this.order.indexOf(key), 1);
            this.data[key] = data;
            this.order.push(key);
        } else {
            this.data[key] = data;
            this.order.push(key);
            if (this.order.length > this.max) {
                var removedData = this.getAndRemove(this.order[0]);
                if (removedData) this.onRemove(removedData);
            }
        }
        return this;
    };
    _proto.has = function(key) {
        return key in this.data;
    };
    _proto.keys = function() {
        return this.order;
    };
    _proto.getAndRemove = function(key) {
        if (!this.has(key)) return null;
        var data = this.data[key];
        delete this.data[key];
        this.order.splice(this.order.indexOf(key), 1);
        return data;
    };
    _proto.get = function(key) {
        if (!this.has(key)) return null;
        var data = this.data[key];
        return data;
    };
    _proto.remove = function(key) {
        if (!this.has(key)) return this;
        var data = this.data[key];
        delete this.data[key];
        this.onRemove(data);
        this.order.splice(this.order.indexOf(key), 1);
        return this;
    };
    _proto.setMaxSize = function(max) {
        this.max = max;
        while(this.order.length > this.max){
            var removedData = this.getAndRemove(this.order[0]);
            if (removedData) this.onRemove(removedData);
        }
        return this;
    };
    return LRUCache;
}();
var TILE_POINT = new maptalks_es_Point(0, 0);
var TEMP_POINT$3 = new maptalks_es_Point(0, 0);
var TEMP_POINT1$2 = new maptalks_es_Point(0, 0);
var TEMP_POINT2$1 = new maptalks_es_Point(0, 0);
var maptalks_es_TileLayerCanvasRenderer = function(_CanvasRenderer) {
    _inheritsLoose(TileLayerCanvasRenderer, _CanvasRenderer);
    function TileLayerCanvasRenderer(layer) {
        var _this;
        _this = _CanvasRenderer.call(this, layer) || this;
        _this.tilesInView = {};
        _this.tilesLoading = {};
        _this._parentTiles = [];
        _this._childTiles = [];
        _this.tileCache = new maptalks_es_LRUCache(layer.options['maxCacheSize'], _this.deleteTile.bind(_assertThisInitialized(_assertThisInitialized(_this))));
        return _this;
    }
    var _proto = TileLayerCanvasRenderer.prototype;
    _proto.getCurrentTileZoom = function() {
        return this._tileZoom;
    };
    _proto.draw = function() {
        var map = this.getMap();
        if (!this.isDrawable()) return;
        var mask2DExtent = this.prepareCanvas();
        if (mask2DExtent) {
            if (!mask2DExtent.intersects(this.canvasExtent2D)) {
                this.completeRender();
                return;
            }
        }
        var layer = this.layer;
        var tileGrids = layer.getTiles().tileGrids;
        if (!tileGrids || !tileGrids.length) {
            this.completeRender();
            return;
        }
        var loadingCount = 0;
        var loading = false;
        var checkedTiles = {};
        var tiles = [], parentTiles = [], parentKeys = {}, childTiles = [], childKeys = {}, placeholders = [], placeholderKeys = {};
        var tileQueue = {};
        var preLoadingCount = this._markTiles(), loadingLimit = this._getLoadLimit();
        var l = tileGrids.length;
        this._tileZoom = tileGrids[0]['zoom'];
        for(var i = 0; i < l; i++){
            var tileGrid = tileGrids[i];
            var allTiles = tileGrid['tiles'];
            var placeholder = this._generatePlaceHolder(tileGrid.zoom);
            for(var _i = 0, _l = allTiles.length; _i < _l; _i++){
                var tile = allTiles[_i], tileId = tile['id'];
                var tileLoading = false;
                if (this._isLoadingTile(tileId)) {
                    tileLoading = loading = true;
                    this.tilesLoading[tileId].current = true;
                } else {
                    var cached = this._getCachedTile(tileId);
                    if (cached) {
                        if (cached.image && this.getTileOpacity(cached.image) < 1) tileLoading = loading = true;
                        tiles.push(cached);
                    } else {
                        tileLoading = loading = true;
                        var hitLimit = loadingLimit && loadingCount + preLoadingCount[0] > loadingLimit;
                        if (!hitLimit && (!map.isInteracting() || map.isMoving() || map.isRotating())) {
                            loadingCount++;
                            var key = tileId;
                            tileQueue[key] = tile;
                        }
                    }
                }
                if (!!tileLoading) {
                    if (checkedTiles[tileId]) continue;
                    checkedTiles[tileId] = 1;
                    if (placeholder && !placeholderKeys[tileId]) {
                        tile.cache = false;
                        placeholders.push({
                            image: placeholder,
                            info: tile
                        });
                        placeholderKeys[tileId] = 1;
                    }
                    var parentTile = this._findParentTile(tile);
                    if (parentTile) {
                        var parentId = parentTile.info.id;
                        if (void 0 === parentKeys[parentId]) {
                            parentKeys[parentId] = parentTiles.length;
                            parentTiles.push(parentTile);
                        }
                    } else if (!parentTiles.length) {
                        var children = this._findChildTiles(tile);
                        if (children.length) children.forEach(function(c) {
                            if (!childKeys[c.info.id]) {
                                childTiles.push(c);
                                childKeys[c.info.id] = 1;
                            }
                        });
                    }
                }
            }
        }
        if (parentTiles.length) {
            childTiles.length = 0;
            this._childTiles.length = 0;
        }
        this._drawTiles(tiles, parentTiles, childTiles, placeholders);
        if (loadingCount) this.loadTileQueue(tileQueue);
        else if (!loading) {
            if (!map.isAnimating() && (this._parentTiles.length || this._childTiles.length)) {
                this._parentTiles = [];
                this._childTiles = [];
                this.setToRedraw();
            }
            this.completeRender();
        }
        this._retireTiles();
    };
    _proto.isTileCachedOrLoading = function(tileId) {
        return this.tilesLoading[tileId] || this.tilesInView[tileId] || this.tileCache.get(tileId);
    };
    _proto._drawTiles = function(tiles, parentTiles, childTiles, placeholders) {
        var _this2 = this;
        if (parentTiles.length) {
            parentTiles.sort(function(t1, t2) {
                return Math.abs(t2.info.z - _this2._tileZoom) - Math.abs(t1.info.z - _this2._tileZoom);
            });
            this._parentTiles = parentTiles;
        }
        if (childTiles.length) this._childTiles = childTiles;
        var context = {
            tiles: tiles,
            parentTiles: this._parentTiles,
            childTiles: this._childTiles
        };
        this.onDrawTileStart(context);
        this._parentTiles.forEach(function(t) {
            return _this2._drawTileAndCache(t);
        });
        this._childTiles.forEach(function(t) {
            return _this2._drawTile(t.info, t.image);
        });
        placeholders.forEach(function(t) {
            return _this2._drawTile(t.info, t.image);
        });
        var layer = this.layer, map = this.getMap();
        if (!layer.options['cascadeTiles'] || map.getPitch() <= map.options['cascadePitches'][0]) tiles.forEach(function(t) {
            return _this2._drawTileAndCache(t);
        });
        else {
            this.writeZoomStencil();
            var started = false;
            for(var i = 0, l = tiles.length; i < l; i++){
                if (tiles[i].info.z !== this._tileZoom) {
                    if (started) this.resumeZoomStencilTest();
                    else {
                        this.startZoomStencilTest();
                        started = true;
                    }
                } else if (started) this.pauseZoomStencilTest();
                this._drawTileAndCache(tiles[i]);
            }
            this.endZoomStencilTest();
        }
        this.onDrawTileEnd(context);
    };
    _proto.writeZoomStencil = function() {};
    _proto.startZoomStencilTest = function() {};
    _proto.endZoomStencilTest = function() {};
    _proto.pauseZoomStencilTest = function() {};
    _proto.resumeZoomStencilTest = function() {};
    _proto.onDrawTileStart = function() {};
    _proto.onDrawTileEnd = function() {};
    _proto._drawTile = function(info, image) {
        if (image) this.drawTile(info, image);
    };
    _proto._drawTileAndCache = function(tile) {
        tile.current = true;
        this.tilesInView[tile.info.id] = tile;
        this._drawTile(tile.info, tile.image);
        this.tileCache.add(tile.info.id, tile);
    };
    _proto.drawOnInteracting = function() {
        this.draw();
    };
    _proto.needToRedraw = function() {
        var map = this.getMap();
        if (map.getPitch()) return _CanvasRenderer.prototype.needToRedraw.call(this);
        if (map.isRotating() || map.isZooming()) return true;
        if (map.isMoving()) return !!this.layer.options['forceRenderOnMoving'];
        return _CanvasRenderer.prototype.needToRedraw.call(this);
    };
    _proto.hitDetect = function() {
        return false;
    };
    _proto._getLoadLimit = function() {
        if (this.getMap().isInteracting()) return this.layer.options['loadingLimitOnInteracting'];
        return 0;
    };
    _proto.isDrawable = function() {
        if (this.getMap().getPitch()) {
            if (console) console.warn('TileLayer with canvas renderer can\'t be pitched, use gl renderer (\'renderer\' : \'gl\') instead.');
            this.clear();
            return false;
        }
        return true;
    };
    _proto.clear = function() {
        this._retireTiles(true);
        this.tileCache.reset();
        this.tilesInView = {};
        this.tilesLoading = {};
        this._parentTiles = [];
        this._childTiles = [];
        _CanvasRenderer.prototype.clear.call(this);
    };
    _proto._isLoadingTile = function(tileId) {
        return !!this.tilesLoading[tileId];
    };
    _proto.clipCanvas = function(context) {
        return _CanvasRenderer.prototype.clipCanvas.call(this, context);
    };
    _proto._clipByPitch = function(ctx) {
        var map = this.getMap();
        if (map.getPitch() <= map.options['maxVisualPitch']) return false;
        if (!this.layer.options['clipByPitch']) return false;
        var clipExtent = map.getContainerExtent();
        var r = map.getDevicePixelRatio();
        ctx.save();
        ctx.strokeStyle = 'rgba(0, 0, 0, 0)';
        ctx.beginPath();
        ctx.rect(0, Math.ceil(clipExtent.ymin) * r, Math.ceil(clipExtent.getWidth()) * r, Math.ceil(clipExtent.getHeight()) * r);
        ctx.stroke();
        ctx.clip();
        return true;
    };
    _proto.loadTileQueue = function(tileQueue) {
        for(var p in tileQueue)if (tileQueue.hasOwnProperty(p)) {
            var tile = tileQueue[p];
            var tileImage = this.loadTile(tile);
            if (void 0 === tileImage.loadTime) this.tilesLoading[tile['id']] = {
                image: tileImage,
                current: true,
                info: tile
            };
        }
    };
    _proto.loadTile = function(tile) {
        var tileSize = this.layer.getTileSize();
        var tileImage = new Image();
        tileImage.width = tileSize['width'];
        tileImage.height = tileSize['height'];
        tileImage.onload = this.onTileLoad.bind(this, tileImage, tile);
        tileImage.onerror = this.onTileError.bind(this, tileImage, tile);
        this.loadTileImage(tileImage, tile['url']);
        return tileImage;
    };
    _proto.loadTileImage = function(tileImage, url) {
        var crossOrigin = this.layer.options['crossOrigin'];
        if (!isNil(crossOrigin)) tileImage.crossOrigin = crossOrigin;
        return loadImage(tileImage, [
            url
        ]);
    };
    _proto.abortTileLoading = function(tileImage) {
        if (!tileImage) return;
        tileImage.onload = falseFn;
        tileImage.onerror = falseFn;
        tileImage.src = emptyImageUrl;
    };
    _proto.onTileLoad = function(tileImage, tileInfo) {
        if (!this.layer) return;
        var id = tileInfo['id'];
        if (!this.tilesInView) return;
        var e = {
            tile: tileInfo,
            tileImage: tileImage
        };
        this.layer.fire('tileload', e);
        tileImage = e.tileImage;
        tileImage.loadTime = now();
        delete this.tilesLoading[id];
        this._addTileToCache(tileInfo, tileImage);
        this.setToRedraw();
    };
    _proto.onTileError = function(tileImage, tileInfo) {
        if (!this.layer) return;
        tileImage.onerrorTick = tileImage.onerrorTick || 0;
        var tileRetryCount = this.layer.options['tileRetryCount'];
        if (tileRetryCount > tileImage.onerrorTick) {
            tileImage.onerrorTick++;
            tileImage.src = tileInfo.url;
            return;
        }
        if (tileImage instanceof Image) {
            var errorUrl = this.layer.options['errorUrl'];
            if (errorUrl && tileImage.src !== errorUrl) {
                tileImage.src = errorUrl;
                return;
            }
            this.abortTileLoading(tileImage, tileInfo);
        }
        tileImage.loadTime = 0;
        delete this.tilesLoading[tileInfo['id']];
        this._addTileToCache(tileInfo, tileImage);
        this.setToRedraw();
        this.layer.fire('tileerror', {
            tile: tileInfo
        });
    };
    _proto.drawTile = function(tileInfo, tileImage) {
        if (!tileImage || !this.getMap()) return;
        var extent2d = tileInfo.extent2d, offset = tileInfo.offset;
        var point = TILE_POINT.set(extent2d.xmin - offset[0], extent2d.ymax - offset[1]), tileZoom = tileInfo.z, tileId = tileInfo.id;
        var map = this.getMap(), tileSize = this.layer.getTileSize(), zoom = map.getZoom(), ctx = this.context, cp = map._pointToContainerPoint(point, tileZoom, 0, TEMP_POINT$3), bearing = map.getBearing(), transformed = bearing || zoom !== tileZoom;
        var opacity = this.getTileOpacity(tileImage);
        var alpha = ctx.globalAlpha;
        if (opacity < 1) {
            ctx.globalAlpha = opacity;
            this.setToRedraw();
        }
        if (!transformed) cp._round();
        var x = cp.x, y = cp.y;
        var w = tileSize.width, h = tileSize.height;
        if (transformed) {
            ctx.save();
            ctx.translate(x, y);
            if (bearing) {
                ctx.rotate(-bearing * Math.PI / 180);
                w += 0.1;
                h += 0.1;
            }
            if (zoom !== tileZoom) {
                var scale = map._getResolution(tileZoom) / map._getResolution();
                ctx.scale(scale, scale);
            }
            x = y = 0;
        }
        Canvas.image(ctx, tileImage, x, y, w, h);
        if (this.layer.options['debug']) {
            var color = this.layer.options['debugOutline'];
            ctx.save();
            ctx.strokeStyle = color;
            ctx.fillStyle = color;
            ctx.strokeWidth = 10;
            ctx.font = '20px monospace';
            var _point = new maptalks_es_Point(x, y);
            Canvas.rectangle(ctx, _point, {
                width: w,
                height: h
            }, 1, 0);
            Canvas.fillText(ctx, this.getDebugInfo(tileId), _point._add(10, 20), color);
            Canvas.drawCross(ctx, x + w / 2, y + h / 2, 2, color);
            ctx.restore();
        }
        if (transformed) ctx.restore();
        if (ctx.globalAlpha !== alpha) ctx.globalAlpha = alpha;
        this.setCanvasUpdated();
    };
    _proto.getDebugInfo = function(tileId) {
        var xyz = tileId.split('_');
        var length = xyz.length;
        return 'x:' + xyz[length - 2] + ', y:' + xyz[length - 3] + ', z:' + xyz[length - 1];
    };
    _proto._findChildTiles = function(info) {
        var layer = this._getLayerOfTile(info.layer);
        if (!layer.options['background']) return [];
        var map = this.getMap();
        var children = [];
        var min = info.extent2d.getMin(), max = info.extent2d.getMax(), offset = info.offset, pmin = layer._project(map._pointToPrj(min, info.z, TEMP_POINT1$2), TEMP_POINT1$2), pmax = layer._project(map._pointToPrj(max, info.z, TEMP_POINT2$1), TEMP_POINT2$1);
        var zoomDiff = 2;
        for(var i = 1; i < zoomDiff; i++)this._findChildTilesAt(children, pmin, pmax, layer, info.z + i, offset);
        return children;
    };
    _proto._findChildTilesAt = function(children, pmin, pmax, layer, childZoom, offset) {
        var zoomOffset = layer.options['zoomOffset'];
        var layerId = layer.getId(), res = layer.getSpatialReference().getResolution(childZoom + zoomOffset);
        if (!res) return;
        var dmin = layer._getTileConfig().getTileIndex(pmin, res, offset), dmax = layer._getTileConfig().getTileIndex(pmax, res, offset);
        var sx = Math.min(dmin.idx, dmax.idx), ex = Math.max(dmin.idx, dmax.idx);
        var sy = Math.min(dmin.idy, dmax.idy), ey = Math.max(dmin.idy, dmax.idy);
        var id, tile;
        for(var i = sx; i < ex; i++)for(var ii = sy; ii < ey; ii++){
            id = layer._getTileId(i, ii, childZoom + zoomOffset, layerId);
            if (this.tileCache.has(id)) {
                tile = this.tileCache.getAndRemove(id);
                children.push(tile);
                this.tileCache.add(id, tile);
            }
        }
    };
    _proto._findParentTile = function(info) {
        var map = this.getMap(), layer = this._getLayerOfTile(info.layer);
        if (!layer.options['background']) return null;
        var sr = layer.getSpatialReference();
        var d = sr.getZoomDirection(), zoomOffset = layer.options['zoomOffset'], zoomDiff = layer.options['backgroundZoomDiff'];
        var center = info.extent2d.getCenter(), offset = info.offset, prj = layer._project(map._pointToPrj(center, info.z));
        for(var diff = 1; diff <= zoomDiff; diff++){
            var z = info.z - d * diff;
            var res = sr.getResolution(z + zoomOffset);
            if (!!res) {
                var tileIndex = layer._getTileConfig().getTileIndex(prj, res, offset);
                var id = layer._getTileId(tileIndex.x, tileIndex.y, z + zoomOffset, info.layer);
                if (this.tileCache.has(id)) {
                    var tile = this.tileCache.getAndRemove(id);
                    this.tileCache.add(id, tile);
                    return tile;
                }
            }
        }
        return null;
    };
    _proto._getLayerOfTile = function(layerId) {
        return this.layer.getChildLayer ? this.layer.getChildLayer(layerId) : this.layer;
    };
    _proto._getCachedTile = function(tileId) {
        var tilesInView = this.tilesInView;
        var cached = this.tileCache.getAndRemove(tileId);
        if (cached) {
            tilesInView[tileId] = cached;
            var tilesLoading = this.tilesLoading;
            if (tilesLoading && tilesLoading[tileId]) {
                tilesLoading[tileId].current = false;
                var _tilesLoading$tileId = tilesLoading[tileId], image = _tilesLoading$tileId.image, info = _tilesLoading$tileId.info;
                this.abortTileLoading(image, info);
                delete tilesLoading[tileId];
            }
        } else cached = tilesInView[tileId];
        return cached;
    };
    _proto._addTileToCache = function(tileInfo, tileImage) {
        this.tilesInView[tileInfo.id] = {
            image: tileImage,
            current: true,
            info: tileInfo
        };
    };
    _proto.getTileOpacity = function(tileImage) {
        if (!this.layer.options['fadeAnimation'] || !tileImage.loadTime) return 1;
        return Math.min(1, (now() - tileImage.loadTime) / (1000 / 60 * 10));
    };
    _proto.onRemove = function() {
        this.clear();
        delete this.tileCache;
        delete this._tilePlaceHolder;
        _CanvasRenderer.prototype.onRemove.call(this);
    };
    _proto._markTiles = function() {
        var a = 0, b = 0;
        if (this.tilesLoading) for(var p in this.tilesLoading){
            this.tilesLoading[p].current = false;
            a++;
        }
        if (this.tilesInView) for(var _p in this.tilesInView){
            this.tilesInView[_p].current = false;
            b++;
        }
        return [
            a,
            b
        ];
    };
    _proto._retireTiles = function(force) {
        for(var i in this.tilesLoading){
            var tile = this.tilesLoading[i];
            if (force || !tile.current) {
                if (tile.image) this.abortTileLoading(tile.image, tile.info);
                this.deleteTile(tile);
                delete this.tilesLoading[i];
            }
        }
        for(var _i2 in this.tilesInView){
            var _tile = this.tilesInView[_i2];
            if (!_tile.current) {
                delete this.tilesInView[_i2];
                if (!this.tileCache.has(_i2)) this.deleteTile(_tile);
            }
        }
    };
    _proto.deleteTile = function(tile) {
        if (!tile || !tile.image) return;
        tile.image.onload = null;
        tile.image.onerror = null;
    };
    _proto._generatePlaceHolder = function(z) {
        var map = this.getMap();
        var placeholder = this.layer.options['placeholder'];
        if (!placeholder || map.getPitch()) return null;
        var tileSize = this.layer.getTileSize(), scale = map._getResolution(z) / map._getResolution(), canvas = this._tilePlaceHolder = this._tilePlaceHolder || Canvas.createCanvas(1, 1, map.CanvasClass);
        canvas.width = tileSize.width * scale;
        canvas.height = tileSize.height * scale;
        if (isFunction(placeholder)) placeholder(canvas);
        else defaultPlaceholder(canvas);
        return canvas;
    };
    return TileLayerCanvasRenderer;
}(maptalks_es_CanvasRenderer);
maptalks_es_TileLayer.registerRenderer('canvas', maptalks_es_TileLayerCanvasRenderer);
function falseFn() {
    return false;
}
function defaultPlaceholder(canvas) {
    var ctx = canvas.getContext('2d'), cw = canvas.width, ch = canvas.height, w = cw / 16, h = ch / 16;
    ctx.beginPath();
    for(var i = 0; i < 16; i++){
        ctx.moveTo(0, i * h);
        ctx.lineTo(cw, i * h);
        ctx.moveTo(i * w, 0);
        ctx.lineTo(i * w, ch);
    }
    ctx.strokeStyle = 'rgba(180, 180, 180, 0.1)';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.beginPath();
    var path = [
        [
            0,
            0
        ],
        [
            cw,
            0
        ],
        [
            0,
            ch
        ],
        [
            cw,
            ch
        ],
        [
            0,
            0
        ],
        [
            0,
            ch
        ],
        [
            cw,
            0
        ],
        [
            cw,
            ch
        ],
        [
            0,
            ch / 2
        ],
        [
            cw,
            ch / 2
        ],
        [
            cw / 2,
            0
        ],
        [
            cw / 2,
            ch
        ]
    ];
    for(var _i3 = 1; _i3 < path.length; _i3 += 2){
        ctx.moveTo(path[_i3 - 1][0], path[_i3 - 1][1]);
        ctx.lineTo(path[_i3][0], path[_i3][1]);
    }
    ctx.lineWidth = 4;
    ctx.stroke();
}
var TILE_POINT$1 = new maptalks_es_Point(0, 0);
var maptalks_es_TileLayerGLRenderer = function(_ImageGLRenderable) {
    _inheritsLoose(TileLayerGLRenderer, _ImageGLRenderable);
    function TileLayerGLRenderer() {
        return _ImageGLRenderable.apply(this, arguments) || this;
    }
    var _proto = TileLayerGLRenderer.prototype;
    _proto.isDrawable = function() {
        return true;
    };
    _proto.needToRedraw = function() {
        var map = this.getMap();
        if (this._gl() && !map.getPitch() && map.isZooming() && !map.isMoving() && !map.isRotating()) return true;
        return _ImageGLRenderable.prototype.needToRedraw.call(this);
    };
    _proto.drawTile = function(tileInfo, tileImage) {
        var map = this.getMap();
        if (!tileInfo || !map || !tileImage) return;
        var scale = tileInfo._glScale = tileInfo._glScale || map.getGLScale(tileInfo.z);
        var size = this.layer.getTileSize();
        var w = size.width;
        var h = size.height;
        if (false !== tileInfo.cache) this._bindGLBuffer(tileImage, w, h);
        if (!this._gl()) {
            _ImageGLRenderable.prototype.drawTile.call(this, tileInfo, tileImage);
            return;
        }
        var extent2d = tileInfo.extent2d, offset = tileInfo.offset;
        var point = TILE_POINT$1.set(extent2d.xmin - offset[0], tileInfo.extent2d.ymax - offset[1]);
        var x = point.x * scale, y = point.y * scale;
        var opacity = this.getTileOpacity(tileImage);
        var debugInfo = null;
        if (this.layer.options['debug']) debugInfo = this.getDebugInfo(tileInfo.id);
        this.drawGLImage(tileImage, x, y, w, h, scale, opacity, debugInfo);
        if (opacity < 1) this.setToRedraw();
        else this.setCanvasUpdated();
    };
    _proto.writeZoomStencil = function() {
        var gl = this.gl;
        gl.stencilFunc(gl.ALWAYS, 1, 0xFF);
        gl.stencilOp(gl.KEEP, gl.KEEP, gl.REPLACE);
    };
    _proto.startZoomStencilTest = function() {
        var gl = this.gl;
        gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
        gl.stencilFunc(gl.EQUAL, 0, 0xFF);
    };
    _proto.endZoomStencilTest = function() {
        this.pauseZoomStencilTest();
    };
    _proto.pauseZoomStencilTest = function() {
        var gl = this.gl;
        gl.stencilFunc(gl.ALWAYS, 1, 0xFF);
    };
    _proto.resumeZoomStencilTest = function() {
        var gl = this.gl;
        gl.stencilFunc(gl.EQUAL, 0, 0xFF);
    };
    _proto._bindGLBuffer = function(image, w, h) {
        if (!image.glBuffer) image.glBuffer = this.bufferTileData(0, 0, w, h);
    };
    _proto.loadTileImage = function(tileImage, url) {
        var crossOrigin = this.layer.options['crossOrigin'];
        tileImage.crossOrigin = null !== crossOrigin ? crossOrigin : '';
        tileImage.src = url;
    };
    _proto.onCanvasCreate = function() {
        if (!this.canvas.gl || !this.canvas.gl.wrap) this.createCanvas2();
    };
    _proto.createContext = function() {
        _ImageGLRenderable.prototype.createContext.call(this);
        this.createGLContext();
    };
    _proto.resizeCanvas = function(canvasSize) {
        if (!this.canvas) return;
        _ImageGLRenderable.prototype.resizeCanvas.call(this, canvasSize);
        this.resizeGLCanvas();
    };
    _proto.clearCanvas = function() {
        if (!this.canvas) return;
        _ImageGLRenderable.prototype.clearCanvas.call(this);
        this.clearGLCanvas();
    };
    _proto.getCanvasImage = function() {
        if (!this._gl() || !this.canvas2) return _ImageGLRenderable.prototype.getCanvasImage.call(this);
        var img = _ImageGLRenderable.prototype.getCanvasImage.call(this);
        if (img) img.image = this.canvas2;
        return img;
    };
    _proto._gl = function() {
        if (this.canvas.gl && this.canvas.gl.wrap) return true;
        var map = this.getMap();
        return map && (map.getPitch() || map.getBearing()) || this.layer && !!this.layer.options['fragmentShader'];
    };
    _proto.deleteTile = function(tile) {
        _ImageGLRenderable.prototype.deleteTile.call(this, tile);
        if (tile && tile.image) this.disposeImage(tile.image);
        delete tile.image;
    };
    _proto.onRemove = function() {
        _ImageGLRenderable.prototype.onRemove.call(this);
        this.removeGLCanvas();
    };
    return TileLayerGLRenderer;
}(maptalks_es_ImageGLRenderable(maptalks_es_TileLayerCanvasRenderer));
maptalks_es_TileLayer.registerRenderer('gl', maptalks_es_TileLayerGLRenderer);
function _loadTile(tile) {
    var tileSize = this.layer.getTileSize(), canvasClass = this.canvas.constructor, map = this.getMap();
    var r = map.getDevicePixelRatio();
    var tileCanvas = Canvas.createCanvas(tileSize['width'] * r, tileSize['height'] * r, canvasClass);
    tileCanvas['layer'] = this.layer;
    var me = this;
    var point = new maptalks_es_Point(tile['extent2d'].xmin, tile['extent2d'].ymax);
    var extent = new maptalks_es_Extent(map.pointToCoordinate(point), map.pointToCoordinate(point.add(tileSize.width, tileSize.height)), map.getProjection());
    this.layer.drawTile(tileCanvas, {
        url: tile['url'],
        point: point,
        center: map.pointToCoordinate(point.add(tileSize['width'] / 2, tileSize['height'] / 2)),
        extent: extent,
        z: tile['z'],
        x: tile['x'],
        y: tile['y']
    }, function(error) {
        if (error) {
            me.onTileError(tileCanvas, tile);
            return;
        }
        me.onTileLoad(tileCanvas, tile);
    });
    return tileCanvas;
}
var CanvasRenderer$1 = function(_TileLayerCanvasRende) {
    _inheritsLoose(CanvasRenderer, _TileLayerCanvasRende);
    function CanvasRenderer() {
        return _TileLayerCanvasRende.apply(this, arguments) || this;
    }
    var _proto = CanvasRenderer.prototype;
    _proto.loadTile = function() {
        return _loadTile.apply(this, arguments);
    };
    return CanvasRenderer;
}(maptalks_es_TileLayerCanvasRenderer);
var maptalks_es_GLRenderer = function(_TileLayerGLRenderer) {
    _inheritsLoose(GLRenderer, _TileLayerGLRenderer);
    function GLRenderer() {
        return _TileLayerGLRenderer.apply(this, arguments) || this;
    }
    var _proto2 = GLRenderer.prototype;
    _proto2.loadTile = function() {
        return _loadTile.apply(this, arguments);
    };
    return GLRenderer;
}(maptalks_es_TileLayerGLRenderer);
maptalks_es_CanvasTileLayer.registerRenderer('canvas', CanvasRenderer$1);
maptalks_es_CanvasTileLayer.registerRenderer('gl', maptalks_es_GLRenderer);
var maptalks_es_OverlayLayerRenderer = function(_CanvasRenderer) {
    _inheritsLoose(OverlayLayerRenderer, _CanvasRenderer);
    function OverlayLayerRenderer() {
        return _CanvasRenderer.apply(this, arguments) || this;
    }
    var _proto = OverlayLayerRenderer.prototype;
    _proto.checkResources = function() {
        var geometries = this._geosToCheck;
        if (!this._resourceChecked && !geometries) geometries = this.layer._geoList;
        if (!isArrayHasData(geometries)) return [];
        var resources = [];
        var cache = {};
        for(var i = geometries.length - 1; i >= 0; i--){
            var geo = geometries[i];
            var res = geo._getExternalResources();
            if (!!res.length) if (this.resources) for(var _i = 0; _i < res.length; _i++){
                var url = res[_i][0];
                if (!this.resources.isResourceLoaded(res[_i]) && !cache[url]) {
                    resources.push(res[_i]);
                    cache[url] = 1;
                }
            }
            else resources.push.apply(resources, res);
        }
        this._resourceChecked = true;
        delete this._geosToCheck;
        return resources;
    };
    _proto.render = function() {
        this.layer._sortGeometries();
        return _CanvasRenderer.prototype.render.apply(this, arguments);
    };
    _proto._addGeoToCheckRes = function(res) {
        if (!res) return;
        if (!Array.isArray(res)) res = [
            res
        ];
        if (!this._geosToCheck) this._geosToCheck = [];
        pushIn(this._geosToCheck, res);
    };
    _proto.onGeometryAdd = function(geometries) {
        this._addGeoToCheckRes(geometries);
        maptalks_es_redraw(this);
    };
    _proto.onGeometryRemove = function() {
        maptalks_es_redraw(this);
    };
    _proto.onGeometrySymbolChange = function(e) {
        this._addGeoToCheckRes(e.target);
        maptalks_es_redraw(this);
    };
    _proto.onGeometryShapeChange = function() {
        maptalks_es_redraw(this);
    };
    _proto.onGeometryPositionChange = function() {
        maptalks_es_redraw(this);
    };
    _proto.onGeometryZIndexChange = function() {
        maptalks_es_redraw(this);
    };
    _proto.onGeometryShow = function() {
        maptalks_es_redraw(this);
    };
    _proto.onGeometryHide = function() {
        maptalks_es_redraw(this);
    };
    _proto.onGeometryPropertiesChange = function() {
        maptalks_es_redraw(this);
    };
    return OverlayLayerRenderer;
}(maptalks_es_CanvasRenderer);
function maptalks_es_redraw(renderer) {
    if (renderer.layer.options['drawImmediate']) renderer.render();
    renderer.setToRedraw();
}
var TEMP_EXTENT$4 = new maptalks_es_PointExtent();
var maptalks_es_VectorLayerRenderer = function(_OverlayLayerCanvasRe) {
    _inheritsLoose(VectorLayerRenderer, _OverlayLayerCanvasRe);
    function VectorLayerRenderer() {
        return _OverlayLayerCanvasRe.apply(this, arguments) || this;
    }
    var _proto = VectorLayerRenderer.prototype;
    _proto.checkResources = function() {
        var _this = this;
        var resources = _OverlayLayerCanvasRe.prototype.checkResources.apply(this, arguments);
        var style = this.layer.getStyle();
        if (style) {
            if (!Array.isArray(style)) style = [
                style
            ];
            style.forEach(function(s) {
                var res = getExternalResources(s['symbol'], true);
                for(var i = 0, l = res.length; i < l; i++)if (!_this.resources.isResourceLoaded(res[i])) resources.push(res[i]);
            });
        }
        return resources;
    };
    _proto.needToRedraw = function() {
        var map = this.getMap();
        if (map.isInteracting() && this.layer.options['enableAltitude']) return true;
        if (map.isZooming() && !map.isRotating() && !map.getPitch() && !this._hasPoint && this.layer.constructor === maptalks_es_VectorLayer) return false;
        return _OverlayLayerCanvasRe.prototype.needToRedraw.call(this);
    };
    _proto.draw = function() {
        if (!this.getMap()) return;
        if (!this.layer.isVisible() || this.layer.isEmpty()) {
            this.clearCanvas();
            this.completeRender();
            return;
        }
        this.prepareCanvas();
        this.drawGeos();
        this.completeRender();
    };
    _proto.isBlank = function() {
        if (!this.context) return false;
        return !this.context.canvas._drawn;
    };
    _proto.drawOnInteracting = function() {
        if (!this._geosToDraw) return;
        this._updateDisplayExtent();
        var map = this.getMap();
        var count = this.layer.getCount();
        var res = this.getMap().getResolution();
        if (map.isZooming() && map.options['seamlessZoom'] && void 0 !== this._drawnRes && res > 1.5 * this._drawnRes && this._geosToDraw.length < count || map.isMoving() || map.isInteracting()) {
            this.prepareToDraw();
            this.forEachGeo(this.checkGeo, this);
            this._drawnRes = res;
        }
        for(var i = 0, l = this._geosToDraw.length; i < l; i++){
            var geo = this._geosToDraw[i];
            if (!!geo.isVisible()) geo._paint(this._displayExtent);
        }
    };
    _proto.show = function() {
        this.layer.forEach(function(geo) {
            geo._repaint();
        });
        _OverlayLayerCanvasRe.prototype.show.apply(this, arguments);
    };
    _proto.forEachGeo = function(fn, context) {
        this.layer.forEach(fn, context);
    };
    _proto.drawGeos = function() {
        this._drawnRes = this.getMap().getResolution();
        this._updateDisplayExtent();
        this.prepareToDraw();
        this.forEachGeo(this.checkGeo, this);
        for(var i = 0, len = this._geosToDraw.length; i < len; i++)this._geosToDraw[i]._paint();
    };
    _proto.prepareToDraw = function() {
        this._hasPoint = false;
        this._geosToDraw = [];
    };
    _proto.checkGeo = function(geo) {
        if (!geo || !geo.isVisible() || !geo.getMap() || !geo.getLayer() || !geo.getLayer().isCanvasRender()) return;
        var painter = geo._getPainter();
        var extent2D = painter.get2DExtent(this.resources, TEMP_EXTENT$4);
        if (!extent2D || !extent2D.intersects(this._displayExtent)) return;
        if (painter.hasPoint()) this._hasPoint = true;
        this._geosToDraw.push(geo);
    };
    _proto.onZoomEnd = function() {
        delete this.canvasExtent2D;
        _OverlayLayerCanvasRe.prototype.onZoomEnd.apply(this, arguments);
    };
    _proto.onRemove = function() {
        this.forEachGeo(function(g) {
            g.onHide();
        });
        delete this._geosToDraw;
    };
    _proto.onGeometryPropertiesChange = function(param) {
        if (param) this.layer._styleGeometry(param['target']);
        _OverlayLayerCanvasRe.prototype.onGeometryPropertiesChange.call(this, param);
    };
    _proto._updateDisplayExtent = function() {
        var extent2D = this.canvasExtent2D;
        if (this._maskExtent) {
            if (!this._maskExtent.intersects(extent2D)) {
                this.completeRender();
                return;
            }
            extent2D = extent2D.intersection(this._maskExtent);
        }
        this._displayExtent = extent2D;
    };
    _proto.identify = function(coordinate, options) {
        if (void 0 === options) options = {};
        var geometries = this._geosToDraw;
        if (!geometries) return [];
        return this.layer._hitGeos(geometries, coordinate, options);
    };
    return VectorLayerRenderer;
}(maptalks_es_OverlayLayerRenderer);
maptalks_es_VectorLayer.registerRenderer('canvas', maptalks_es_VectorLayerRenderer);
var maptalks_es_MapRenderer = function(_Class) {
    _inheritsLoose(MapRenderer, _Class);
    function MapRenderer(map) {
        var _this;
        _this = _Class.call(this) || this;
        _this.map = map;
        _this._handlerQueue = {};
        return _this;
    }
    var _proto = MapRenderer.prototype;
    _proto.callInNextFrame = function(fn) {
        this._handlerQueue.push(fn);
    };
    _proto.executeFrameCallbacks = function() {
        var running = this._handlerQueue;
        this._handlerQueue = [];
        for(var i = 0, l = running.length; i < l; i++)running[i]();
    };
    _proto.offsetPlatform = function(offset, force) {
        if (!this.map._panels.front) return this;
        if (!force && 0 === offset.x && 0 === offset.y) return this;
        var panels = this.map._panels;
        var hasFront = this._frontCount = panels.back.layerDOM.childElementCount;
        var hasBack = this._backCount = panels.front.layerDOM.childElementCount;
        var hasUI = this._uiCount = panels.front.uiDOM.childElementCount;
        if (hasFront || hasBack || hasUI) {
            var pos = this.map.offsetPlatform();
            pos = offset ? pos.add(offset)._round() : pos.round();
            if (hasBack) offsetDom(panels.back, pos);
            if (hasFront || hasUI) offsetDom(panels.front, pos);
        }
        return this;
    };
    _proto.domChanged = function() {
        var panels = this.map._panels;
        if (!panels.front) return false;
        var frontCount = panels.back.layerDOM.childElementCount;
        if (void 0 === this._frontCount || this._frontCount !== frontCount) return true;
        var backCount = panels.front.layerDOM.childElementCount;
        if (void 0 === this._backCount || this._backCount !== backCount) return true;
        var uiCount = panels.front.uiDOM.childElementCount;
        if (void 0 === this._uiCount || this._uiCount !== uiCount) return true;
        return false;
    };
    _proto.resetContainer = function() {
        if (!this.map) return;
        this.map._resetMapViewPoint();
        if (this.map._panels.front) {
            var pos = new maptalks_es_Point(0, 0);
            offsetDom(this.map._panels.back, pos);
            offsetDom(this.map._panels.front, pos);
        }
    };
    _proto.onZoomEnd = function() {
        this.resetContainer();
    };
    _proto.onLoad = function() {
        this._frameLoop();
    };
    return MapRenderer;
}(maptalks_es_Class);
var maptalks_es_MapCanvasRenderer = function(_MapRenderer) {
    _inheritsLoose(MapCanvasRenderer, _MapRenderer);
    function MapCanvasRenderer(map) {
        var _this;
        _this = _MapRenderer.call(this, map) || this;
        _this._containerIsCanvas = !!map._containerDOM.getContext;
        _this._thisVisibilitychange = _this._onVisibilitychange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        _this._registerEvents();
        _this._loopTime = 0;
        return _this;
    }
    var _proto = MapCanvasRenderer.prototype;
    _proto.load = function() {
        this.initContainer();
    };
    _proto.renderFrame = function(framestamp) {
        if (!this.map) return false;
        delete this._isViewChanged;
        var map = this.map;
        map._fireEvent('framestart');
        this.updateMapDOM();
        var layers = this._getAllLayerToRender();
        this.drawLayers(layers, framestamp);
        var updated = this.drawLayerCanvas(layers);
        if (updated) this._drawCenterCross();
        map._fireEvent('frameend');
        this._recordView();
        this._mapview = this._getMapView();
        delete this._spatialRefChanged;
        this._fireLayerLoadEvents();
        this.executeFrameCallbacks();
        this._canvasUpdated = false;
        return true;
    };
    _proto.updateMapDOM = function() {
        var map = this.map;
        if (map.isZooming()) return;
        var offset = map._getViewPointFrameOffset();
        if (offset) map.offsetPlatform(offset);
        else if (this.domChanged()) this.offsetPlatform(null, true);
    };
    _proto.drawLayers = function(layers, framestamp) {
        var map = this.map, isInteracting = map.isInteracting(), canvasIds = [], updatedIds = [], fps = map.options['fpsOnInteracting'] || 0, timeLimit = 0 === fps ? 0 : 1000 / fps, layerLimit = this.map.options['layerCanvasLimitOnInteracting'], l = layers.length;
        var baseLayer = map.getBaseLayer();
        var t = 0;
        for(var i = 0; i < l; i++){
            var layer = layers[i];
            if (!layer.isVisible()) continue;
            var isCanvas = layer.isCanvasRender();
            if (isCanvas) canvasIds.push(layer.getId());
            var renderer = layer._getRenderer();
            if (!!renderer) {
                var needsRedraw = this._checkLayerRedraw(layer);
                if (isCanvas && renderer.isCanvasUpdated()) {
                    if (!needsRedraw) updatedIds.push(layer.getId());
                    this.setLayerCanvasUpdated();
                }
                var transformMatrix = renderer.__zoomTransformMatrix;
                delete renderer.__zoomTransformMatrix;
                if (!needsRedraw) {
                    if (isCanvas && isInteracting) {
                        if (map.isZooming() && !map.getPitch()) {
                            renderer.prepareRender();
                            renderer.__zoomTransformMatrix = this._zoomMatrix;
                        } else if (map.getPitch() || map.isRotating()) renderer.clearCanvas();
                    }
                    continue;
                }
                if (isInteracting && isCanvas) {
                    if (layerLimit > 0 && l - 1 - i > layerLimit && layer !== baseLayer) {
                        layer._getRenderer().clearCanvas();
                        continue;
                    }
                    t += this._drawCanvasLayerOnInteracting(layer, t, timeLimit, framestamp);
                } else if (isInteracting && renderer.drawOnInteracting) {
                    if (renderer.prepareRender) renderer.prepareRender();
                    if (renderer.checkAndDraw) renderer.checkAndDraw(renderer.drawOnInteracting, this._eventParam, framestamp);
                    else renderer.drawOnInteracting(this._eventParam, framestamp);
                } else {
                    renderer.render(framestamp);
                    if (isCanvas && transformMatrix && renderer.isLoadingResource()) renderer.__zoomTransformMatrix = transformMatrix;
                }
                if (isCanvas) {
                    updatedIds.push(layer.getId());
                    this.setLayerCanvasUpdated();
                }
            }
        }
        var preCanvasIds = this._canvasIds || [];
        var preUpdatedIds = this._updatedIds || [];
        this._canvasIds = canvasIds;
        this._updatedIds = updatedIds;
        if (!this.isLayerCanvasUpdated()) {
            var sep = '---';
            if (preCanvasIds.join(sep) !== canvasIds.join(sep) || preUpdatedIds.join(sep) !== updatedIds.join(sep)) this.setLayerCanvasUpdated();
        }
    };
    _proto._checkLayerRedraw = function(layer) {
        if (this.isSpatialReferenceChanged()) return true;
        var map = this.map;
        var renderer = layer._getRenderer();
        if (layer.isCanvasRender()) return renderer.testIfNeedRedraw();
        if (renderer.needToRedraw && renderer.needToRedraw()) return true;
        return map.isInteracting() || this.isViewChanged();
    };
    _proto._drawCanvasLayerOnInteracting = function(layer, t, timeLimit, framestamp) {
        var map = this.map, renderer = layer._getRenderer(), drawTime = renderer.getDrawTime(), inTime = 0 === timeLimit || timeLimit > 0 && t + drawTime <= timeLimit;
        if (renderer.mustRenderOnInteracting && renderer.mustRenderOnInteracting()) renderer.render(framestamp);
        else if (renderer.drawOnInteracting && (layer === map.getBaseLayer() || inTime || map.isZooming() && layer.options['forceRenderOnZooming'] || map.isMoving() && layer.options['forceRenderOnMoving'] || map.isRotating() && layer.options['forceRenderOnRotating'])) {
            renderer.prepareRender();
            renderer.prepareCanvas();
            if (renderer.checkAndDraw) renderer.checkAndDraw(renderer.drawOnInteracting, this._eventParam, framestamp);
            else renderer.drawOnInteracting(this._eventParam, framestamp);
            return drawTime;
        } else if (!map.isZooming() || map.getPitch() || map.isRotating()) {
            if (map.getPitch() || map.isRotating()) renderer.clearCanvas();
        } else {
            renderer.prepareRender();
            renderer.__zoomTransformMatrix = this._zoomMatrix;
        }
        if (renderer.drawOnInteracting && !inTime) renderer.onSkipDrawOnInteracting(this._eventParam, framestamp);
        return 0;
    };
    _proto._fireLayerLoadEvents = function() {
        if (this._updatedIds && this._updatedIds.length > 0) {
            var map = this.map;
            this._updatedIds.reverse().forEach(function(id) {
                var layer = map.getLayer(id);
                if (!layer) return;
                var renderer = layer._getRenderer();
                if (!renderer || !renderer.isRenderComplete()) return;
                layer.fire('layerload');
            });
        }
    };
    _proto.isLayerCanvasUpdated = function() {
        return this._canvasUpdated;
    };
    _proto.setLayerCanvasUpdated = function() {
        this._canvasUpdated = true;
    };
    _proto.drawLayerCanvas = function(layers) {
        var map = this.map;
        if (!map) return false;
        if (!this.isLayerCanvasUpdated() && !this.isViewChanged()) return false;
        if (!this.canvas) this.createCanvas();
        map._fireEvent('renderstart', {
            context: this.context
        });
        if (!this._updateCanvasSize()) this.clearCanvas();
        var interacting = map.isInteracting(), limit = map.options['layerCanvasLimitOnInteracting'];
        var len = layers.length;
        var baseLayerImage;
        var images = [];
        for(var i = 0; i < len; i++){
            if (!layers[i].isVisible() || !layers[i].isCanvasRender()) continue;
            var renderer = layers[i]._getRenderer();
            if (!!renderer) {
                var layerImage = this._getLayerImage(layers[i]);
                if (layerImage && layerImage['image']) {
                    if (layers[i] === map.getBaseLayer()) baseLayerImage = [
                        layers[i],
                        layerImage
                    ];
                    else images.push([
                        layers[i],
                        layerImage
                    ]);
                }
            }
        }
        if (baseLayerImage) {
            this._drawLayerCanvasImage(baseLayerImage[0], baseLayerImage[1]);
            this._drawFog();
        }
        len = images.length;
        var start = interacting && limit >= 0 && len > limit ? len - limit : 0;
        for(var _i = start; _i < len; _i++)this._drawLayerCanvasImage(images[_i][0], images[_i][1]);
        map._fireEvent('renderend', {
            context: this.context
        });
        return true;
    };
    _proto.setToRedraw = function() {
        var layers = this._getAllLayerToRender();
        for(var i = 0, l = layers.length; i < l; i++){
            var renderer = layers[i].getRenderer();
            if (renderer && renderer.canvas && renderer.setToRedraw) renderer.setToRedraw();
        }
    };
    _proto.updateMapSize = function(size) {
        if (!size || this._containerIsCanvas) return;
        var width = size['width'] + 'px', height = size['height'] + 'px';
        var panels = this.map._panels;
        panels.mapWrapper.style.width = width;
        panels.mapWrapper.style.height = height;
        this._updateCanvasSize();
    };
    _proto.getMainPanel = function() {
        if (!this.map) return null;
        if (this._containerIsCanvas) return this.map._containerDOM;
        if (this.map._panels) return this.map._panels.mapWrapper;
        return null;
    };
    _proto.toDataURL = function(mimeType) {
        if (!this.canvas) return null;
        return this.canvas.toDataURL(mimeType);
    };
    _proto.remove = function() {
        if (Browser$1.webgl && 'undefined' != typeof document) removeDomEvent(document, 'visibilitychange', this._thisVisibilitychange, this);
        if (this._resizeInterval) clearInterval(this._resizeInterval);
        delete this.context;
        delete this.canvas;
        delete this.map;
        delete this._spatialRefChanged;
        this._cancelFrameLoop();
    };
    _proto.hitDetect = function(point) {
        var map = this.map;
        if (!map || !map.options['hitDetect'] || map.isInteracting()) return;
        var layers = map._getLayers();
        var cursor = 'default';
        var limit = map.options['hitDetectLimit'] || 0;
        var counter = 0;
        for(var i = layers.length - 1; i >= 0; i--){
            var layer = layers[i];
            if (!layer.options['hitDetect'] || layer.isEmpty && layer.isEmpty()) continue;
            var renderer = layer._getRenderer();
            if (!renderer || !renderer.hitDetect) continue;
            if (!(renderer.isBlank && renderer.isBlank())) {
                if ('default' !== layer.options['cursor'] && renderer.hitDetect(point)) {
                    cursor = layer.options['cursor'] || 'pointer';
                    break;
                }
                counter++;
                if (limit > 0 && counter > limit) break;
            }
        }
        map._trySetCursor(cursor);
    };
    _proto._getLayerImage = function(layer) {
        var renderer = layer._getRenderer();
        if (renderer.getCanvasImage) return renderer.getCanvasImage();
        return null;
    };
    _proto.initContainer = function() {
        var panels = this.map._panels;
        function createContainer(name, className, cssText, enableSelect) {
            var c = createEl('div', className);
            if (cssText) c.style.cssText = cssText;
            panels[name] = c;
            if (!enableSelect) preventSelection(c);
            return c;
        }
        var containerDOM = this.map._containerDOM;
        if (this._containerIsCanvas) return;
        containerDOM.innerHTML = '';
        var POSITION0 = 'position:absolute;top:0px;left:0px;';
        var mapWrapper = createContainer('mapWrapper', 'maptalks-wrapper', 'position:absolute;overflow:hidden;', true), mapAllLayers = createContainer('allLayers', 'maptalks-all-layers', POSITION0 + 'padding:0px;margin:0px;z-index:0;overflow:visible;', true), backStatic = createContainer('backStatic', 'maptalks-back-static', POSITION0 + 'z-index:0;', true), back = createContainer('back', 'maptalks-back', POSITION0 + 'z-index:1;'), backLayer = createContainer('backLayer', 'maptalks-back-layer', POSITION0), canvasContainer = createContainer('canvasContainer', 'maptalks-canvas-layer', POSITION0 + 'border:none;z-index:2;'), frontStatic = createContainer('frontStatic', 'maptalks-front-static', POSITION0 + 'z-index:3;', true), front = createContainer('front', 'maptalks-front', POSITION0 + 'z-index:4;', true), frontLayer = createContainer('frontLayer', 'maptalks-front-layer', POSITION0 + 'z-index:0;'), ui = createContainer('ui', 'maptalks-ui', POSITION0 + 'border:none;z-index:1;', true), control = createContainer('control', 'maptalks-control', 'z-index:1', true);
        containerDOM.appendChild(mapWrapper);
        mapAllLayers.appendChild(backStatic);
        back.appendChild(backLayer);
        back.layerDOM = backLayer;
        mapAllLayers.appendChild(back);
        mapAllLayers.appendChild(canvasContainer);
        front.appendChild(frontLayer);
        front.layerDOM = frontLayer;
        front.uiDOM = ui;
        mapAllLayers.appendChild(frontStatic);
        mapAllLayers.appendChild(front);
        front.appendChild(ui);
        mapWrapper.appendChild(mapAllLayers);
        mapWrapper.appendChild(control);
        this.createCanvas();
        this.resetContainer();
        var mapSize = this.map._getContainerDomSize();
        this.updateMapSize(mapSize);
    };
    _proto.isViewChanged = function() {
        if (void 0 !== this._isViewChanged) return this._isViewChanged;
        var previous = this._mapview;
        var view = this._getMapView();
        this._isViewChanged = !previous || !equalMapView(previous, view);
        return this._isViewChanged;
    };
    _proto._recordView = function() {
        var map = this.map;
        if (!map._onViewChange || map.isInteracting() || map.isAnimating()) return;
        if (!equalMapView(map.getView(), map._getCurrentView())) map._onViewChange(map.getView());
    };
    _proto.isSpatialReferenceChanged = function() {
        return this._spatialRefChanged;
    };
    _proto._getMapView = function() {
        var map = this.map;
        var center = map._getPrjCenter();
        return {
            x: center.x,
            y: center.y,
            zoom: map.getZoom(),
            pitch: map.getPitch(),
            bearing: map.getBearing(),
            width: map.width,
            height: map.height
        };
    };
    _proto._frameLoop = function(framestamp) {
        var _this2 = this;
        if (!this.map) {
            this._cancelFrameLoop();
            return;
        }
        this.renderFrame(framestamp);
        this._animationFrame = maptalks_es_requestAnimFrame(function(framestamp) {
            _this2._frameLoop(framestamp);
        });
    };
    _proto._cancelFrameLoop = function() {
        if (this._animationFrame) maptalks_es_cancelAnimFrame(this._animationFrame);
    };
    _proto._drawLayerCanvasImage = function(layer, layerImage) {
        var ctx = this.context;
        var point = layerImage['point'].round();
        var dpr = this.map.getDevicePixelRatio();
        if (1 !== dpr) point._multi(dpr);
        var canvasImage = layerImage['image'];
        var width = canvasImage.width, height = canvasImage.height;
        if (point.x + width <= 0 || point.y + height <= 0) return;
        var op = layer.options['opacity'];
        if (!isNumber(op)) op = 1;
        if (op <= 0) return;
        var imgOp = layerImage['opacity'];
        if (!isNumber(imgOp)) imgOp = 1;
        if (imgOp <= 0) return;
        var alpha = ctx.globalAlpha;
        if (op < 1) ctx.globalAlpha *= op;
        if (imgOp < 1) ctx.globalAlpha *= imgOp;
        if (layer.options['cssFilter']) ctx.filter = layer.options['cssFilter'];
        var renderer = layer.getRenderer();
        var matrix = renderer.__zoomTransformMatrix;
        var clipped = renderer.clipCanvas(this.context);
        if (matrix) {
            ctx.save();
            ctx.setTransform.apply(ctx, matrix);
        }
        ctx.drawImage(canvasImage, 0, 0, width, height, point.x, point.y, width, height);
        if (matrix) ctx.restore();
        if (clipped) ctx.restore();
        if ('none' !== ctx.filter) ctx.filter = 'none';
        ctx.globalAlpha = alpha;
    };
    _proto._drawCenterCross = function() {
        var cross = this.map.options['centerCross'];
        if (cross) {
            var ctx = this.context;
            var p = new maptalks_es_Point(this.canvas.width / 2, this.canvas.height / 2);
            if (isFunction(cross)) cross(ctx, p);
            else Canvas.drawCross(this.context, p.x, p.y, 2, '#f00');
        }
    };
    _proto._drawContainerExtent = function() {
        var cascadePitches = this.map.options.cascadePitches;
        var h30 = this.map.height - this.map._getVisualHeight(cascadePitches[0]);
        var h60 = this.map.height - this.map._getVisualHeight(cascadePitches[1]);
        var extent = this.map.getContainerExtent();
        var ctx = this.context;
        ctx.beginPath();
        ctx.moveTo(0, extent.ymin);
        ctx.lineTo(extent.xmax, extent.ymin);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, h30);
        ctx.lineTo(extent.xmax, h30);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, h60);
        ctx.lineTo(extent.xmax, h60);
        ctx.stroke();
    };
    _proto._drawFog = function() {
        var map = this.map;
        if (map.getPitch() <= map.options['maxVisualPitch'] || !map.options['fog']) return;
        var fogThickness = 30;
        var r = map.getDevicePixelRatio();
        var ctx = this.context, clipExtent = map.getContainerExtent();
        var top = (map.height - map._getVisualHeight(75)) * r;
        if (top < 0) top = 0;
        var bottom = clipExtent.ymin * r, h = Math.ceil(bottom - top), color = map.options['fogColor'].join();
        var gradient = ctx.createLinearGradient(0, top, 0, bottom + fogThickness);
        var landscape = 1 - fogThickness / (h + fogThickness);
        gradient.addColorStop(0, "rgba(" + color + ", 0)");
        gradient.addColorStop(0.3, "rgba(" + color + ", 0.3)");
        gradient.addColorStop(landscape, "rgba(" + color + ", 1)");
        gradient.addColorStop(1, "rgba(" + color + ", 0)");
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.fillRect(0, top, Math.ceil(clipExtent.getWidth()) * r, Math.ceil(h + fogThickness));
    };
    _proto._getAllLayerToRender = function() {
        return this.map._getLayers();
    };
    _proto.clearCanvas = function() {
        if (!this.canvas) return;
        Canvas.clearRect(this.context, 0, 0, this.canvas.width, this.canvas.height);
    };
    _proto._updateCanvasSize = function() {
        if (!this.canvas || this._containerIsCanvas) return false;
        var map = this.map, mapSize = map.getSize(), canvas = this.canvas, r = map.getDevicePixelRatio();
        if (mapSize['width'] * r === canvas.width && mapSize['height'] * r === canvas.height) return false;
        canvas.height = r * mapSize['height'];
        canvas.width = r * mapSize['width'];
        if (canvas.style) {
            canvas.style.width = mapSize['width'] + 'px';
            canvas.style.height = mapSize['height'] + 'px';
        }
        return true;
    };
    _proto.createCanvas = function() {
        if (this._containerIsCanvas) this.canvas = this.map._containerDOM;
        else {
            this.canvas = createEl('canvas');
            this._updateCanvasSize();
            this.map._panels.canvasContainer.appendChild(this.canvas);
        }
        this.context = this.canvas.getContext('2d');
    };
    _proto._checkSize = function() {
        if (!this.map || this.map.isInteracting()) return;
        computeDomPosition(this.map._containerDOM);
        this.map.checkSize();
    };
    _proto._setCheckSizeInterval = function(interval) {
        var _this3 = this;
        clearInterval(this._resizeInterval);
        this._checkSizeInterval = interval;
        this._resizeInterval = setInterval(function() {
            if (!_this3.map || _this3.map.isRemoved()) clearInterval(_this3._resizeInterval);
            else _this3._checkSize();
        }, this._checkSizeInterval);
    };
    _proto._registerEvents = function() {
        var _this4 = this;
        var map = this.map;
        if (map.options['checkSize'] && !IS_NODE && 'undefined' != typeof window) this._setCheckSizeInterval(map.options['checkSizeInterval']);
        if (!Browser$1.mobile) map.on('_mousemove', this._onMapMouseMove, this);
        map.on('_dragrotatestart _dragrotating _dragrotateend _movestart _moving _moveend _zoomstart', function(param) {
            _this4._eventParam = param;
        });
        map.on('_zooming', function(param) {
            if (!map.getPitch()) _this4._zoomMatrix = param['matrix']['container'];
            _this4._eventParam = param;
        });
        map.on('_zoomend', function(param) {
            _this4._eventParam = param;
            delete _this4._zoomMatrix;
        });
        map.on('_spatialreferencechange', function() {
            _this4._spatialRefChanged = true;
        });
        if (Browser$1.webgl && 'undefined' != typeof document) addDomEvent(document, 'visibilitychange', this._thisVisibilitychange, this);
    };
    _proto._onMapMouseMove = function(param) {
        var _this5 = this;
        var map = this.map;
        if (map.isInteracting() || !map.options['hitDetect']) return;
        if (this._hitDetectFrame) maptalks_es_cancelAnimFrame(this._hitDetectFrame);
        this._hitDetectFrame = maptalks_es_requestAnimFrame(function() {
            _this5.hitDetect(param['containerPoint']);
        });
    };
    _proto._getCanvasLayers = function() {
        return this.map._getLayers(function(layer) {
            return layer.isCanvasRender();
        });
    };
    _proto._onVisibilitychange = function() {
        if ('visible' !== document.visibilityState) return;
        this.setToRedraw();
    };
    return MapCanvasRenderer;
}(maptalks_es_MapRenderer);
Map$1.registerRenderer('canvas', maptalks_es_MapCanvasRenderer);
Map$1.mergeOptions({
    fog: false,
    fogColor: [
        233,
        233,
        233
    ]
});
var CenterPointRenderer = {
    _getRenderPoints: function() {
        return [
            [
                this._getCenter2DPoint(this.getMap().getGLZoom())
            ],
            null
        ];
    }
};
maptalks_es_Marker.include(CenterPointRenderer);
maptalks_es_Ellipse.include(CenterPointRenderer);
maptalks_es_Circle.include(CenterPointRenderer);
maptalks_es_Sector.include(CenterPointRenderer);
maptalks_es_Rectangle.include({
    _getRenderPoints: function(placement) {
        var map = this.getMap();
        if ('vertex' === placement) {
            var shell = this._trimRing(this.getShell());
            var points = [];
            for(var i = 0, len = shell.length; i < len; i++)points.push(map.coordToPoint(shell[i], map.getGLZoom()));
            return [
                points,
                null
            ];
        }
        var c = map.coordToPoint(this.getCenter(), map.getGLZoom());
        return [
            [
                c
            ],
            null
        ];
    }
});
var PolyRenderer = {
    _getRenderPoints: function(placement) {
        var map = this.getMap();
        var glZoom = map.getGLZoom();
        var points, rotations = null;
        if ('point' === placement) {
            points = this._getPath2DPoints(this._getPrjCoordinates(), false, glZoom);
            if (points && points.length > 0 && Array.isArray(points[0])) points = points[0].concat(points[1]);
        } else if ('vertex' === placement) {
            points = this._getPath2DPoints(this._getPrjCoordinates(), false, glZoom);
            rotations = [];
            if (points && points.length > 0 && Array.isArray(points[0])) {
                for(var i = 0, l = points.length; i < l; i++)for(var ii = 0, ll = points[i].length; ii < ll; ii++)if (0 === ii) rotations.push([
                    points[i][ii],
                    points[i][ii + 1]
                ]);
                else rotations.push([
                    points[i][ii - 1],
                    points[i][ii]
                ]);
                points = points[0].concat(points[1]);
            } else for(var _i = 0, _l = points.length; _i < _l; _i++)if (0 === _i) rotations.push([
                points[_i],
                points[_i + 1]
            ]);
            else rotations.push([
                points[_i - 1],
                points[_i]
            ]);
        } else if ('line' === placement) {
            points = [];
            rotations = [];
            var vertice = this._getPath2DPoints(this._getPrjCoordinates(), false, glZoom), isSplitted = vertice.length > 0 && Array.isArray(vertice[0]);
            if (isSplitted) {
                var ring;
                for(var _i2 = 1, _l2 = vertice.length; _i2 < _l2; _i2++){
                    ring = vertice[_i2];
                    if (this instanceof maptalks_es_Polygon && ring.length > 0 && !ring[0].equals(ring[ring.length - 1])) ring.push(ring[0]);
                    for(var _ii = 1, _ll = ring.length; _ii < _ll; _ii++){
                        points.push(ring[_ii].add(ring[_ii - 1])._multi(0.5));
                        rotations.push([
                            ring[_ii - 1],
                            ring[_ii]
                        ]);
                    }
                }
            } else {
                if (this instanceof maptalks_es_Polygon && vertice.length > 0 && !vertice[0].equals(vertice[vertice.length - 1])) vertice.push(vertice[0]);
                for(var _i3 = 1, _l3 = vertice.length; _i3 < _l3; _i3++){
                    points.push(vertice[_i3].add(vertice[_i3 - 1])._multi(0.5));
                    rotations.push([
                        vertice[_i3 - 1],
                        vertice[_i3]
                    ]);
                }
            }
        } else if ('vertex-first' === placement) {
            var coords = this._getPrjCoordinates();
            points = coords.length ? [
                map._prjToPoint(coords[0], glZoom)
            ] : [];
            rotations = coords.length ? [
                [
                    map._prjToPoint(coords[0], glZoom),
                    map._prjToPoint(coords[1], glZoom)
                ]
            ] : [];
        } else if ('vertex-last' === placement) {
            var _coords = this._getPrjCoordinates();
            var _l4 = _coords.length;
            points = _l4 ? [
                map._prjToPoint(_coords[_l4 - 1], glZoom)
            ] : [];
            var current = _l4 - 1, previous = _l4 > 1 ? _l4 - 2 : _l4 - 1;
            rotations = _l4 ? [
                [
                    map._prjToPoint(_coords[previous], glZoom),
                    map._prjToPoint(_coords[current], glZoom)
                ]
            ] : [];
        } else {
            var pcenter = this._getProjection().project(this.getCenter());
            points = [
                map._prjToPoint(pcenter, glZoom)
            ];
        }
        return [
            points,
            rotations
        ];
    }
};
maptalks_es_LineString.include(PolyRenderer);
maptalks_es_Polygon.include(PolyRenderer);
maptalks_es_Geometry.include({
    _redrawWhenPitch: function() {
        return false;
    },
    _redrawWhenRotate: function() {
        return false;
    }
});
var maptalks_es_el = {
    _redrawWhenPitch: function() {
        return true;
    },
    _redrawWhenRotate: function() {
        return this instanceof maptalks_es_Ellipse || this instanceof maptalks_es_Sector;
    },
    _paintAsPath: function() {
        var map = this.getMap();
        var altitude = this.getAltitude();
        return altitude > 0 || map.getPitch() || this instanceof maptalks_es_Ellipse && map.getBearing();
    },
    _getPaintParams: function() {
        var map = this.getMap();
        if (this._paintAsPath()) return maptalks_es_Polygon.prototype._getPaintParams.call(this, true);
        var pcenter = this._getPrjCoordinates();
        var pt = map._prjToPoint(pcenter, map.getGLZoom());
        var size = this._getRenderSize(pt);
        return [
            pt
        ].concat(size);
    },
    _paintOn: function() {
        if (this._paintAsPath()) return Canvas.polygon.apply(Canvas, arguments);
        return Canvas.ellipse.apply(Canvas, arguments);
    },
    _getRenderSize: function(pt) {
        var map = this.getMap(), z = map.getGLZoom();
        var prjExtent = this._getPrjExtent();
        var pmin = map._prjToPoint(prjExtent.getMin(), z), pmax = map._prjToPoint(prjExtent.getMax(), z);
        return [
            Math.abs(pmax.x - pmin.x) / 2,
            Math.abs(pmax.y - pt.y),
            Math.abs(pt.y - pmin.y)
        ];
    }
};
maptalks_es_Ellipse.include(maptalks_es_el);
maptalks_es_Circle.include(maptalks_es_el);
maptalks_es_Rectangle.include({
    _getPaintParams: function() {
        var map = this.getMap();
        var pointZoom = map.getGLZoom();
        var shell = this._getPrjShell();
        var points = this._getPath2DPoints(shell, false, pointZoom);
        return [
            points
        ];
    },
    _paintOn: Canvas.polygon
});
maptalks_es_Sector.include(maptalks_es_el, {
    _redrawWhenPitch: function() {
        return true;
    },
    _getPaintParams: function() {
        if (this._paintAsPath()) return maptalks_es_Polygon.prototype._getPaintParams.call(this, true);
        var map = this.getMap();
        var pt = map._prjToPoint(this._getPrjCoordinates(), map.getGLZoom());
        var size = this._getRenderSize(pt);
        return [
            pt,
            size[0],
            [
                this.getStartAngle(),
                this.getEndAngle()
            ]
        ];
    },
    _paintOn: function() {
        if (this._paintAsPath()) return Canvas.polygon.apply(Canvas, arguments);
        var r = this.getMap().getBearing();
        var args = arguments;
        if (r) {
            args[3] = args[3].slice(0);
            args[3][0] += r;
            args[3][1] += r;
        }
        return Canvas.sector.apply(Canvas, args);
    }
});
maptalks_es_Path.include({
    _paintAsPath: function() {
        return true;
    }
});
maptalks_es_LineString.include({
    arrowStyles: {
        classic: [
            3,
            4
        ]
    },
    _getArrowShape: function(prePoint, point, lineWidth, arrowStyle, tolerance) {
        if (!prePoint || !point || prePoint.equals(point)) return null;
        if (!tolerance) tolerance = 0;
        var width = lineWidth * arrowStyle[0], height = lineWidth * arrowStyle[1] + tolerance, hw = width / 2 + tolerance;
        var normal;
        normal = point.nextCtrlPoint || point.prevCtrlPoint ? point.prevCtrlPoint ? point.sub(new maptalks_es_Point(point.prevCtrlPoint)) : point.sub(new maptalks_es_Point(point.nextCtrlPoint)) : point.sub(prePoint);
        normal._unit();
        var p1 = point.sub(normal.multi(height));
        normal._perp();
        var p0 = p1.add(normal.multi(hw));
        normal._multi(-1);
        var p2 = p1.add(normal.multi(hw));
        return [
            p0,
            point,
            p2,
            p0
        ];
    },
    _getPaintParams: function() {
        var prjVertexes = this._getPrjCoordinates();
        var points = this._getPath2DPoints(prjVertexes, false, this.getMap().getGLZoom());
        return [
            points
        ];
    },
    _paintOn: function(ctx, points, lineOpacity, fillOpacity, dasharray) {
        if (this.options['smoothness']) Canvas.paintSmoothLine(ctx, points, lineOpacity, this.options['smoothness'], false, this._animIdx, this._animTailRatio);
        else Canvas.path(ctx, points, lineOpacity, null, dasharray);
        this._paintArrow(ctx, points, lineOpacity);
    },
    _getArrowPlacement: function() {
        return this.options['arrowPlacement'];
    },
    _getArrowStyle: function() {
        var arrowStyle = this.options['arrowStyle'];
        if (arrowStyle) return Array.isArray(arrowStyle) ? arrowStyle : this.arrowStyles[arrowStyle];
        return null;
    },
    _getArrows: function(points, lineWidth, tolerance) {
        var arrowStyle = this._getArrowStyle();
        if (!arrowStyle || points.length < 2) return [];
        var isSplitted = points.length > 0 && Array.isArray(points[0]);
        var segments = isSplitted ? points : [
            points
        ];
        var placement = this._getArrowPlacement();
        var arrows = [];
        var map = this.getMap(), first = map.coordToContainerPoint(this.getFirstCoordinate()), last = map.coordToContainerPoint(this.getLastCoordinate());
        for(var i = segments.length - 1; i >= 0; i--){
            if ('vertex-first' === placement || 'vertex-firstlast' === placement && segments[i][0].closeTo(first, 0.01)) {
                var arrow = this._getArrowShape(segments[i][1], segments[i][0], lineWidth, arrowStyle, tolerance);
                if (arrow) arrows.push(arrow);
            }
            if ('vertex-last' === placement || 'vertex-firstlast' === placement && segments[i][segments[i].length - 1].closeTo(last, 0.01)) {
                var _arrow = this._getArrowShape(segments[i][segments[i].length - 2], segments[i][segments[i].length - 1], lineWidth, arrowStyle, tolerance);
                if (_arrow) arrows.push(_arrow);
            } else if ('point' === placement) this._getArrowPoints(arrows, segments[i], lineWidth, arrowStyle, tolerance);
        }
        return arrows;
    },
    _getArrowPoints: function(arrows, segments, lineWidth, arrowStyle, tolerance) {
        for(var ii = 0, ll = segments.length - 1; ii < ll; ii++){
            var arrow = this._getArrowShape(segments[ii], segments[ii + 1], lineWidth, arrowStyle, tolerance);
            if (arrow) arrows.push(arrow);
        }
    },
    _paintArrow: function(ctx, points, lineOpacity) {
        var lineWidth = this._getInternalSymbol()['lineWidth'];
        if (!isNumber(lineWidth) || lineWidth < 3) lineWidth = 3;
        var arrows = this._getArrows(points, lineWidth);
        if (!arrows.length) return;
        if (ctx.setLineDash) ctx.setLineDash([]);
        for(var i = arrows.length - 1; i >= 0; i--){
            ctx.fillStyle = ctx.strokeStyle;
            Canvas.polygon(ctx, arrows[i], lineOpacity, lineOpacity);
        }
    }
});
maptalks_es_Polygon.include({
    _getPaintParams: function(disableSimplify) {
        var maxZoom = this.getMap().getGLZoom();
        var prjVertexes = this._getPrjShell();
        var points = this._getPath2DPoints(prjVertexes, disableSimplify, maxZoom);
        var isSplitted = points.length > 0 && Array.isArray(points[0]);
        if (isSplitted) points = [
            [
                points[0]
            ],
            [
                points[1]
            ]
        ];
        var prjHoles = this._getPrjHoles();
        var holePoints = [];
        if (prjHoles && prjHoles.length > 0) {
            var simplified = this._simplified;
            for(var i = 0; i < prjHoles.length; i++){
                var hole = this._getPath2DPoints(prjHoles[i], disableSimplify, maxZoom);
                if (Array.isArray(hole) && isSplitted) {
                    if (Array.isArray(hole[0])) {
                        points[0].push(hole[0]);
                        points[1].push(hole[1]);
                    } else points[0].push(hole);
                } else holePoints.push(hole);
            }
            if (simplified) this._simplified = simplified;
        }
        if (!isSplitted) {
            points = [
                points
            ];
            pushIn(points, holePoints);
        }
        return [
            points
        ];
    },
    _paintOn: function(ctx, points, lineOpacity, fillOpacity, dasharray) {
        Canvas.polygon(ctx, points, lineOpacity, fillOpacity, dasharray, this.options['smoothness']);
    }
});
Map$1.VERSION = version;
const FITTING_COUNT = 100;
const HALF_PI = Math.PI / 2;
const ZERO_TOLERANCE = 0.0001;
/**
 * There are many interpolation method
 * based on code finished by @sakitam-fdd https://github.com/sakitam-fdd/maptalks.plot.git
 */ const PlotUtils_Coordinate = maptalks_es_Coordinate;
const PlotUtils_Canvas = Canvas;
/**
 *                  nextNormal
 *    currentVertex    ↑
 *                .________. nextVertex
 *                |\
 *     normal  ←  | \ joinNormal
 *                |
 *     prevVertex !
 *
 * get join normal between 2 line segments
 * @param  {[type]} normal     [description]
 * @param  {[type]} nextNormal [description]
 * @return {[type]}            [description]
 */ function getJoinNormal(normal, nextNormal) {
    const joinNormal = normal.add(nextNormal)._unit();
    const cosHalfAngle = joinNormal.x * nextNormal.x + joinNormal.y * nextNormal.y;
    const miterLength = 1 / cosHalfAngle;
    return joinNormal._mult(miterLength);
}
function getPlotPair(vertex, normal, lineWidth) {
    // first plot pair
    const dx = normal.x * lineWidth;
    const dy = normal.y * lineWidth;
    const p1 = vertex.add(dx, dy);
    const p2 = vertex.add(-dx, -dy);
    return [
        p1,
        p2
    ];
}
/**
     * Get arrow body for given vertexes.
     * @param  {maptalks.Coordinate[]} vertexes    - input vertexes
     * @param  {[type]} lineWidth [description]
     * @param  {[type]} map       [description]
     * @param  {[type]} ratio     [description]
     * @return {[type]}           [description]
     */ const getArrowBody = (vertexes, lineWidth, map, ratio, arrowLength)=>{
    lineWidth /= 2;
    let arrowWidth;
    let currentLen = 0;
    const upPlots = [], downPlots = [];
    let pair;
    // let dx, dy;
    let current, prev, next;
    let normal, currentNormal, nextNormal;
    for(let i = 1, l = vertexes.length; i < l; i++){
        current = new __WEBPACK_EXTERNAL_MODULE__mapbox_point_geometry__["default"](vertexes[i].x, vertexes[i].y);
        prev = new __WEBPACK_EXTERNAL_MODULE__mapbox_point_geometry__["default"](vertexes[i - 1].x, vertexes[i - 1].y);
        if (ratio && arrowLength) {
            currentLen += current.dist(prev);
            arrowWidth = (1 - (1 - ratio) * currentLen / arrowLength) * lineWidth;
        } else arrowWidth = lineWidth;
        next = i < l - 1 ? new __WEBPACK_EXTERNAL_MODULE__mapbox_point_geometry__["default"](vertexes[i + 1].x, vertexes[i + 1].y) : null;
        normal = current.sub(prev)._unit()._perp();
        if (1 === i) {
            pair = getPlotPair(vertexes[i - 1], normal, lineWidth, map);
            upPlots.push(pair[0]);
            downPlots.push(pair[1]);
        }
        if (next) {
            nextNormal = next.sub(current)._unit()._perp();
            currentNormal = getJoinNormal(normal, nextNormal);
        } else currentNormal = normal;
        if (!(isNaN(currentNormal.x) || isNaN(currentNormal.y))) {
            pair = getPlotPair(vertexes[i], currentNormal, arrowWidth, map);
            upPlots.push(pair[0]);
            downPlots.push(pair[1]);
        }
    }
    return [
        upPlots,
        downPlots
    ];
};
/**
 * 计算两个坐标之间的距离
 * @param pnt1
 * @param pnt2
 * @returns {number}
 * @constructor
 */ const MathDistance = (pnt1, pnt2)=>Math.sqrt(Math.pow(pnt1[0] - pnt2[0], 2) + Math.pow(pnt1[1] - pnt2[1], 2));
/**
 * 计算距离
 * @param measurer
 * @param pnt1
 * @param pnt2
 * @returns {*}
 */ const pointDistance = (measurer, pnt1, pnt2)=>measurer.measureLength(PlotUtils_Coordinate.toCoordinates(pnt1), PlotUtils_Coordinate.toCoordinates(pnt2));
/**
 * 插值弓形线段点
 * @param measurer
 * @param center
 * @param radius
 * @param startAngle
 * @param endAngle
 * @param numberOfPoints
 * @returns {null}
 */ const getSectorPoints = function(measurer, center, radius, startAngle, endAngle) {
    let numberOfPoints = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 100;
    let [dx, dy, angleDiff] = [
        null,
        null,
        endAngle - startAngle
    ];
    const points = [];
    angleDiff = angleDiff < 0 ? angleDiff + 2 * Math.PI : angleDiff;
    for(let i = 0; i < numberOfPoints; i++){
        const rad = angleDiff * i / numberOfPoints + startAngle;
        dx = radius * Math.cos(rad);
        dy = radius * Math.sin(rad);
        const vertex = measurer.locate({
            x: center[0],
            y: center[1]
        }, dx, dy);
        points.push([
            vertex['x'],
            vertex['y']
        ]);
    }
    return points;
};
/**
 * 计算点集合的总距离
 * @param points
 * @returns {number}
 */ const wholeDistance = (points)=>{
    let distance = 0;
    if (points && Array.isArray(points) && points.length > 0) points.forEach((item, index)=>{
        if (index < points.length - 1) distance += MathDistance(item, points[index + 1]);
    });
    return distance;
};
/**
 * 获取基础长度
 * @param points
 * @returns {number}
 */ const getBaseLength = (points)=>Math.pow(wholeDistance(points), 0.99);
/**
 * 求取两个坐标的中间值
 * @param point1
 * @param point2
 * @returns {[*,*]}
 * @constructor
 */ const Mid = (point1, point2)=>[
        (point1[0] + point2[0]) / 2,
        (point1[1] + point2[1]) / 2
    ];
/**
 * 获取方位角（地平经度）
 * @param startPoint
 * @param endPoint
 * @returns {*}
 */ const getAzimuth = (startPoint, endPoint)=>{
    let azimuth;
    const angle = Math.asin(Math.abs(endPoint[1] - startPoint[1]) / MathDistance(startPoint, endPoint));
    if (endPoint[1] >= startPoint[1] && endPoint[0] >= startPoint[0]) azimuth = angle + Math.PI;
    else if (endPoint[1] >= startPoint[1] && endPoint[0] < startPoint[0]) azimuth = 2 * Math.PI - angle;
    else if (endPoint[1] < startPoint[1] && endPoint[0] < startPoint[0]) azimuth = angle;
    else if (endPoint[1] < startPoint[1] && endPoint[0] >= startPoint[0]) azimuth = Math.PI - angle;
    return azimuth;
};
/**
 * 通过三个点获取方位角
 * @param pntA
 * @param pntB
 * @param pntC
 * @returns {number}
 */ const getAngleOfThreePoints = (pntA, pntB, pntC)=>{
    const angle = getAzimuth(pntB, pntA) - getAzimuth(pntB, pntC);
    return angle < 0 ? angle + 2 * Math.PI : angle;
};
/**
 * 判断是否是顺时针
 * @param pnt1
 * @param pnt2
 * @param pnt3
 * @returns {boolean}
 */ const isClockWise = (pnt1, pnt2, pnt3)=>(pnt3[1] - pnt1[1]) * (pnt2[0] - pnt1[0]) > (pnt2[1] - pnt1[1]) * (pnt3[0] - pnt1[0]);
/**
 * 获取立方值
 * @param t
 * @param startPnt
 * @param cPnt1
 * @param cPnt2
 * @param endPnt
 * @returns {[*,*]}
 */ const getCubicValue = (t, startPnt, cPnt1, cPnt2, endPnt)=>{
    t = Math.max(Math.min(t, 1), 0);
    const [tp, t2] = [
        1 - t,
        t * t
    ];
    const t3 = t2 * t;
    const tp2 = tp * tp;
    const tp3 = tp2 * tp;
    const x = tp3 * startPnt[0] + 3 * tp2 * t * cPnt1[0] + 3 * tp * t2 * cPnt2[0] + t3 * endPnt[0];
    const y = tp3 * startPnt[1] + 3 * tp2 * t * cPnt1[1] + 3 * tp * t2 * cPnt2[1] + t3 * endPnt[1];
    return [
        x,
        y
    ];
};
/**
 * 根据起止点和旋转方向求取第三个点
 * @param startPnt
 * @param endPnt
 * @param angle
 * @param distance
 * @param clockWise
 * @returns {[*,*]}
 */ const getThirdPoint = (startPnt, endPnt, angle, distance, clockWise)=>{
    const azimuth = getAzimuth(startPnt, endPnt);
    const alpha = clockWise ? azimuth + angle : azimuth - angle;
    const dx = distance * Math.cos(alpha);
    const dy = distance * Math.sin(alpha);
    return [
        endPnt[0] + dx,
        endPnt[1] + dy
    ];
};
/**
 * 获取默认三点的内切圆
 * @param pnt1
 * @param pnt2
 * @param pnt3
 * @returns {[*,*]}
 */ const getNormal = (pnt1, pnt2, pnt3)=>{
    let dX1 = pnt1[0] - pnt2[0];
    let dY1 = pnt1[1] - pnt2[1];
    const d1 = Math.sqrt(dX1 * dX1 + dY1 * dY1);
    dX1 /= d1;
    dY1 /= d1;
    let dX2 = pnt3[0] - pnt2[0];
    let dY2 = pnt3[1] - pnt2[1];
    const d2 = Math.sqrt(dX2 * dX2 + dY2 * dY2);
    dX2 /= d2;
    dY2 /= d2;
    const uX = dX1 + dX2;
    const uY = dY1 + dY2;
    return [
        uX,
        uY
    ];
};
/**
 * getBisectorNormals
 * @param t
 * @param pnt1
 * @param pnt2
 * @param pnt3
 * @returns {[*,*]}
 */ const getBisectorNormals = (t, pnt1, pnt2, pnt3)=>{
    const normal = getNormal(pnt1, pnt2, pnt3);
    let [bisectorNormalRight, bisectorNormalLeft, dt, x, y] = [
        null,
        null,
        null,
        null,
        null
    ];
    const dist = Math.sqrt(normal[0] * normal[0] + normal[1] * normal[1]);
    const uX = normal[0] / dist;
    const uY = normal[1] / dist;
    const d1 = MathDistance(pnt1, pnt2);
    const d2 = MathDistance(pnt2, pnt3);
    if (dist > ZERO_TOLERANCE) {
        if (isClockWise(pnt1, pnt2, pnt3)) {
            dt = t * d1;
            x = pnt2[0] - dt * uY;
            y = pnt2[1] + dt * uX;
            bisectorNormalRight = [
                x,
                y
            ];
            dt = t * d2;
            x = pnt2[0] + dt * uY;
            y = pnt2[1] - dt * uX;
            bisectorNormalLeft = [
                x,
                y
            ];
        } else {
            dt = t * d1;
            x = pnt2[0] + dt * uY;
            y = pnt2[1] - dt * uX;
            bisectorNormalRight = [
                x,
                y
            ];
            dt = t * d2;
            x = pnt2[0] - dt * uY;
            y = pnt2[1] + dt * uX;
            bisectorNormalLeft = [
                x,
                y
            ];
        }
    } else {
        x = pnt2[0] + t * (pnt1[0] - pnt2[0]);
        y = pnt2[1] + t * (pnt1[1] - pnt2[1]);
        bisectorNormalRight = [
            x,
            y
        ];
        x = pnt2[0] + t * (pnt3[0] - pnt2[0]);
        y = pnt2[1] + t * (pnt3[1] - pnt2[1]);
        bisectorNormalLeft = [
            x,
            y
        ];
    }
    return [
        bisectorNormalRight,
        bisectorNormalLeft
    ];
};
/**
 * 获取阶乘数据
 * @param n
 * @returns {number}
 */ const getFactorial = (n)=>{
    let result = 1;
    switch(n){
        case n <= 1:
            result = 1;
            break;
        case 2 === n:
            result = 2;
            break;
        case 3 === n:
            result = 6;
            break;
        case 24 === n:
            result = 24;
            break;
        case 5 === n:
            result = 120;
            break;
        default:
            for(let i = 1; i <= n; i++)result *= i;
            break;
    }
    return result;
};
/**
 * 获取二项分布
 * @param n
 * @param index
 * @returns {number}
 */ const getBinomialFactor = (n, index)=>getFactorial(n) / (getFactorial(index) * getFactorial(n - index));
/**
 * 贝塞尔曲线
 * @param points
 * @returns {*}
 */ const getBezierPoints = function(points) {
    if (points.length <= 2) return points;
    {
        const bezierPoints = [];
        const n = points.length - 1;
        for(let t = 0; t <= 1; t += 0.01){
            let [x, y] = [
                0,
                0
            ];
            for(let index = 0; index <= n; index++){
                const factor = getBinomialFactor(n, index);
                const a = Math.pow(t, index);
                const b = Math.pow(1 - t, n - index);
                x += factor * a * b * points[index][0];
                y += factor * a * b * points[index][1];
            }
            bezierPoints.push([
                x,
                y
            ]);
        }
        bezierPoints.push(points[n]);
        return bezierPoints;
    }
};
/**
     * 判断是否为对象
     * @param value
     * @returns {boolean}
     */ const PlotUtils_isObject = (value)=>{
    const type = typeof value;
    return null !== value && ('object' === type || 'function' === type);
};
//和maptalks.Canvas.paintSmoothLine类似，只不过去掉了begainPath的逻辑
const PlotUtils_paintSmoothLine = (ctx, points, lineOpacity, smoothValue, draw, close, tailIdx, tailRatio)=>{
    //推算 cubic 贝塞尔曲线片段的起终点和控制点坐标
    //t0: 片段起始比例 0-1
    //t1: 片段结束比例 0-1
    //x1, y1, 曲线起点
    //bx1, by1, bx2, by2，曲线控制点
    //x2, y2  曲线终点
    //结果是曲线片段的起点，2个控制点坐标和终点坐标
    //https://stackoverflow.com/questions/878862/drawing-part-of-a-b%C3%A9zier-curve-by-reusing-a-basic-b%C3%A9zier-curve-function/879213#879213
    function interpolate(t0, t1, x1, y1, bx1, by1, bx2, by2, x2, y2) {
        const u0 = 1.0 - t0;
        const u1 = 1.0 - t1;
        const qxa = x1 * u0 * u0 + 2 * bx1 * t0 * u0 + bx2 * t0 * t0;
        const qxb = x1 * u1 * u1 + 2 * bx1 * t1 * u1 + bx2 * t1 * t1;
        const qxc = bx1 * u0 * u0 + 2 * bx2 * t0 * u0 + x2 * t0 * t0;
        const qxd = bx1 * u1 * u1 + 2 * bx2 * t1 * u1 + x2 * t1 * t1;
        const qya = y1 * u0 * u0 + 2 * by1 * t0 * u0 + by2 * t0 * t0;
        const qyb = y1 * u1 * u1 + 2 * by1 * t1 * u1 + by2 * t1 * t1;
        const qyc = by1 * u0 * u0 + 2 * by2 * t0 * u0 + y2 * t0 * t0;
        const qyd = by1 * u1 * u1 + 2 * by2 * t1 * u1 + y2 * t1 * t1;
        // const xa = qxa * u0 + qxc * t0;
        const xb = qxa * u1 + qxc * t1;
        const xc = qxb * u0 + qxd * t0;
        const xd = qxb * u1 + qxd * t1;
        // const ya = qya * u0 + qyc * t0;
        const yb = qya * u1 + qyc * t1;
        const yc = qyb * u0 + qyd * t0;
        const yd = qyb * u1 + qyd * t1;
        return [
            xb,
            yb,
            xc,
            yc,
            xd,
            yd
        ];
    }
    //from http://www.antigrain.com/research/bezier_interpolation/
    function getCubicControlPoints(x0, y0, x1, y1, x2, y2, x3, y3, smoothValue, t) {
        // Assume we need to calculate the control
        // points between (x1,y1) and (x2,y2).
        // Then x0,y0 - the previous vertex,
        //      x3,y3 - the next one.
        const xc1 = (x0 + x1) / 2.0, yc1 = (y0 + y1) / 2.0;
        const xc2 = (x1 + x2) / 2.0, yc2 = (y1 + y2) / 2.0;
        const xc3 = (x2 + x3) / 2.0, yc3 = (y2 + y3) / 2.0;
        const len1 = Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0));
        const len2 = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
        const len3 = Math.sqrt((x3 - x2) * (x3 - x2) + (y3 - y2) * (y3 - y2));
        const k1 = len1 / (len1 + len2);
        const k2 = len2 / (len2 + len3);
        const xm1 = xc1 + (xc2 - xc1) * k1, ym1 = yc1 + (yc2 - yc1) * k1;
        const xm2 = xc2 + (xc3 - xc2) * k2, ym2 = yc2 + (yc3 - yc2) * k2;
        // Resulting control points. Here smoothValue is mentioned
        // above coefficient K whose value should be in range [0...1].
        const ctrl1X = xm1 + (xc2 - xm1) * smoothValue + x1 - xm1, ctrl1Y = ym1 + (yc2 - ym1) * smoothValue + y1 - ym1, ctrl2X = xm2 + (xc2 - xm2) * smoothValue + x2 - xm2, ctrl2Y = ym2 + (yc2 - ym2) * smoothValue + y2 - ym2;
        const ctrlPoints = [
            ctrl1X,
            ctrl1Y,
            ctrl2X,
            ctrl2Y
        ];
        if (t < 1) return interpolate(0, t, x1, y1, ctrl1X, ctrl1Y, ctrl2X, ctrl2Y, x2, y2);
        return ctrlPoints;
    }
    function path(ctx, points, lineOpacity, fillOpacity, lineDashArray) {
        if (!index$1.isArrayHasData(points)) return;
        PlotUtils_Canvas._path(ctx, points, lineDashArray, lineOpacity);
        PlotUtils_Canvas._stroke(ctx, lineOpacity);
    }
    if (!points) return null;
    if (points.length <= 2 || !smoothValue) {
        if (draw) path(ctx, points, lineOpacity);
        return null;
    }
    let count = points.length;
    let l = close ? count : count - 1;
    if (void 0 !== tailRatio) l -= Math.max(l - tailIdx - 1, 0);
    let preCtrlPoints;
    for(let i = 0; i < l; i++){
        const x1 = points[i].x, y1 = points[i].y;
        let x0, y0, x2, y2, x3, y3;
        if (i - 1 < 0) {
            if (close) {
                x0 = points[l - 1].x;
                y0 = points[l - 1].y;
            } else {
                x0 = points[i + 1].x;
                y0 = points[i + 1].y;
            }
        } else {
            x0 = points[i - 1].x;
            y0 = points[i - 1].y;
        }
        if (i + 1 < count) {
            x2 = points[i + 1].x;
            y2 = points[i + 1].y;
        } else {
            x2 = points[i + 1 - count].x;
            y2 = points[i + 1 - count].y;
        }
        if (i + 2 < count) {
            x3 = points[i + 2].x;
            y3 = points[i + 2].y;
        } else if (close) {
            x3 = points[i + 2 - count].x;
            y3 = points[i + 2 - count].y;
        } else {
            x3 = points[i].x;
            y3 = points[i].y;
        }
        const ctrlPoints = getCubicControlPoints(x0, y0, x1, y1, x2, y2, x3, y3, smoothValue, i === l - 1 ? tailRatio : 1);
        if (i === l - 1 && tailRatio >= 0 && tailRatio < 1) {
            if (ctx) ctx.bezierCurveTo(ctrlPoints[0], ctrlPoints[1], ctrlPoints[2], ctrlPoints[3], ctrlPoints[4], ctrlPoints[5]);
            points.splice(l - 1, count - (l - 1) - 1);
            const lastPoint = new __WEBPACK_EXTERNAL_MODULE__mapbox_point_geometry__["default"](ctrlPoints[4], ctrlPoints[5]);
            lastPoint.prevCtrlPoint = new __WEBPACK_EXTERNAL_MODULE__mapbox_point_geometry__["default"](ctrlPoints[2], ctrlPoints[3]);
            points.push(lastPoint);
            count = points.length;
        } else if (ctx) ctx.bezierCurveTo(ctrlPoints[0], ctrlPoints[1], ctrlPoints[2], ctrlPoints[3], x2, y2);
        points[i].nextCtrlPoint = ctrlPoints.slice(0, 2);
        points[i].prevCtrlPoint = preCtrlPoints ? preCtrlPoints.slice(2) : null;
        preCtrlPoints = ctrlPoints;
    }
    if (!close && points[1].prevCtrlPoint) {
        points[0].nextCtrlPoint = points[1].prevCtrlPoint;
        delete points[0].prevCtrlPoint;
    }
    if (!points[count - 1].prevCtrlPoint) points[count - 1].prevCtrlPoint = points[count - 2].nextCtrlPoint;
    if (draw) PlotUtils_Canvas._stroke(ctx, lineOpacity);
    return points;
};
/**
 * @property {Object} options
 */ const StraightArrow_options = {
    widthRatio: 0.10,
    arrowStyle: [],
    tailWidthFactor: 0.1,
    headWidthFactor: 1,
    neckWidthFactor: 0.2,
    headAngle: Math.PI / 8.5,
    neckAngle: Math.PI / 13
};
class StraightArrow extends maptalks_es_Curve {
    static fromJSON(json) {
        const feature = json['feature'];
        const arrow = new StraightArrow(feature['geometry']['coordinates'], json['options']);
        arrow.setProperties(feature['properties']);
        return arrow;
    }
    _toJSON(options) {
        return {
            feature: this.toGeoJSON(options),
            subType: 'StraightArrow'
        };
    }
    startEdit() {
        let options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        options.newVertexHandleSymbol = {
            markerType: 'ellipse',
            markerFill: '#fff',
            markerLineColor: '#000',
            markerLineWidth: 2,
            markerWidth: 10,
            markerHeight: 10,
            opacity: 0
        };
        return super.startEdit(options);
    }
    _getPaintParams() {
        const map = this.getMap();
        const zoomScale = map.getGLScale();
        const points = this._getPath2DPoints(this._getPrjCoordinates());
        if (points.length <= 1) return null;
        const length = this._get2DLength();
        const lineWidth = length * this.options['widthRatio'];
        const arrowPairs = getArrowBody(points, lineWidth, this.getMap());
        const h1 = arrowPairs[0][arrowPairs[0].length - 1], h2 = arrowPairs[1][arrowPairs[1].length - 1];
        const arrowHead = this._getArrowHead(h1, h2, points, lineWidth, 1, 0.8, 1.4, 2.2, 0.7, 2.3);
        let plots = [];
        plots.push.apply(plots, arrowPairs[0]);
        plots.push.apply(plots, arrowHead);
        for(let i = arrowPairs[1].length - 1; i >= 0; i--)plots.push(arrowPairs[1][i]);
        // convert to point in maxZoom
        plots = plots.map((p)=>p.multi(zoomScale));
        return [
            plots,
            [
                arrowPairs[0].length,
                arrowHead.length,
                arrowPairs[1].length
            ]
        ];
    }
    _paintOn(ctx, points, segs, lineOpacity, fillOpacity, lineDasharray) {
        ctx.beginPath();
        let seg;
        //draw body upside
        let i = 0;
        ctx.moveTo(points[0].x, points[0].y);
        seg = points.slice(0, segs[0]);
        // this._quadraticCurve(ctx, seg);
        PlotUtils_paintSmoothLine(ctx, seg, lineOpacity, 0.7, true);
        //draw head
        i += segs[0];
        Canvas._path(ctx, points.slice(i, i + segs[1]), lineDasharray, lineOpacity);
        //draw body downside
        i += segs[1];
        seg = points.slice(i, i + segs[2]);
        //this._quadraticCurve(ctx, seg);
        PlotUtils_paintSmoothLine(ctx, seg, lineOpacity, 0.7, true);
        this._closeArrow(ctx, points[points.length - 1], points[0]);
        Canvas._stroke(ctx, lineOpacity);
        Canvas.fillCanvas(ctx, fillOpacity, points[0].x, points[0].y);
    }
    _closeArrow(ctx) {
        ctx.closePath();
    }
    /**
     * Get points of arrow head
     * @param  {maptalks.Point} h1   - head point 1
     * @param  {maptalks.Point} h2   - head point 2
     * @param  {maptalks.Point} points   - all points
     * @param  {Number} lineWidth    - line width
     * @return {maptalks.Point[]}
     */ _getArrowHead(h1, h2, points, lineWidth, lineRatio, f1, f2, hScale1, hScale2, h1h2Ratio) {
        const arrowHead = this._getArrowHeadPoint(h1, h2, points[points.length - 1], lineWidth * lineRatio, f1, hScale1);
        const vertex01 = new maptalks_es_Point((arrowHead[0].x + arrowHead[1].x) / 2, (arrowHead[0].y + arrowHead[1].y) / 2);
        const head0 = this._getArrowHeadPoint(arrowHead[0], arrowHead[1], vertex01, lineWidth * lineRatio, f2, hScale2)[0];
        const vertex21 = new maptalks_es_Point((arrowHead[2].x + arrowHead[1].x) / 2, (arrowHead[2].y + arrowHead[1].y) / 2);
        const head2 = this._getArrowHeadPoint(arrowHead[2], arrowHead[1], vertex21, lineWidth * lineRatio, f2, hScale2)[0];
        let arrowPoints;
        if (2 === points.length) arrowPoints = [
            h1,
            head0,
            arrowHead[1],
            head2,
            h2
        ];
        else {
            const besierPoints = PlotUtils_paintSmoothLine(null, points, null, 0.8, false);
            const controlPoint = new maptalks_es_Point(besierPoints[besierPoints.length - 1].prevCtrlPoint);
            //计算控制点与最后一个点构成的延长线上的某一点
            const lastPoint = points[points.length - 1];
            const sub = lastPoint.sub(controlPoint);
            if (0 === sub.x && 0 === sub.y) return [
                h1,
                head0,
                arrowHead[1],
                head2,
                h2
            ];
            const h1h2Length = h1.distanceTo(h2);
            const direction = sub.unit();
            const headPoint = new maptalks_es_Point(lastPoint.x + direction.x * h1h2Length * h1h2Ratio, lastPoint.y + direction.y * h1h2Length * h1h2Ratio);
            arrowPoints = [
                h1,
                head0,
                headPoint,
                head2,
                h2
            ];
        }
        return arrowPoints;
    }
    _getArrowHeadPoint(h1, h2, vertex, lineWidth, f, hScale) {
        if (!hScale) hScale = 1;
        h1 = new __WEBPACK_EXTERNAL_MODULE__mapbox_point_geometry__["default"](h1.x, h1.y);
        h2 = new __WEBPACK_EXTERNAL_MODULE__mapbox_point_geometry__["default"](h2.x, h2.y);
        const normal = h1.sub(h2)._unit();
        const head0 = vertex.add(lineWidth * normal.x * f, lineWidth * normal.y * f);
        const head2 = vertex.add(lineWidth * -normal.x * f, lineWidth * -normal.y * f);
        normal._perp()._mult(-1);
        const head1 = vertex.add(hScale * lineWidth * normal.x, hScale * lineWidth * normal.y);
        return [
            head0,
            head1,
            head2
        ];
    }
}
/**
 * @classdesc Curve style LineString
 * @class
 * @category geometry
 * @extends {maptalks.LineString}
 * @param {maptalks.Coordinate[]|Number[][]} coordinates - coordinates of the line string
 * @param {Object} [options=null]   - construct options defined in [maptalks.StraightArrow]{@link maptalks.StraightArrow#options}
 * @example
 * var curve = new maptalks.StraightArrow(
 *     [
 *         [121.47083767181408,31.214448123476995],
 *         [121.4751292062378,31.215475523000404],
 *         [121.47869117980943,31.211916269810335]
 *     ],
 *     {
 *         symbol : {
 *             'lineWidth': 5
 *         }
 *     }
 * ).addTo(layer);
 */ StraightArrow.mergeOptions(StraightArrow_options);
StraightArrow.registerJSONType('StraightArrow');
maptalks_es_DrawTool.registerMode('StraightArrow', {
    action: [
        'click',
        'mousemove',
        'dblclick'
    ],
    create (projection, prjPath) {
        const path = prjPath.map((c)=>projection.unproject(c));
        const line = new StraightArrow(path);
        line._setPrjCoordinates(prjPath);
        return line;
    },
    update (projection, prjPath, geometry) {
        let prjCoords;
        if (Array.isArray(prjPath)) prjCoords = prjPath;
        else {
            prjCoords = geometry._getPrjCoordinates();
            prjCoords.push(prjPath);
        }
        const path = prjCoords.map((c)=>projection.unproject(c));
        geometry.setCoordinates(path);
        geometry._setPrjCoordinates(prjCoords);
    },
    generate (geometry) {
        return geometry;
    }
});
/**
 * @property {Object} options
 */ const DiagonalArrow_options = {
    widthRatio: 0.20,
    arrowStyle: []
};
class DiagonalArrow extends StraightArrow {
    static fromJSON(json) {
        const feature = json['feature'];
        const arrow = new DiagonalArrow(feature['geometry']['coordinates'], json['options']);
        arrow.setProperties(feature['properties']);
        return arrow;
    }
    _toJSON(options) {
        return {
            feature: this.toGeoJSON(options),
            subType: 'DiagonalArrow'
        };
    }
    _getPaintParams() {
        const points = this._getPath2DPoints(this._getPrjCoordinates());
        if (points.length <= 1) return null;
        const zoomScale = this.getMap().getGLScale();
        const length = this._get2DLength();
        const lineWidth = length * this.options['widthRatio'];
        const arrowPairs = getArrowBody(points, lineWidth, this.getMap(), 0.15, length);
        const h1 = arrowPairs[0][arrowPairs[0].length - 1], h2 = arrowPairs[1][arrowPairs[1].length - 1];
        const arrowHead = this._getArrowHead(h1, h2, points, lineWidth, 0.3, 0.6, 1.4, 2.2, 0.8, 3.3);
        let plots = [];
        plots.push.apply(plots, arrowPairs[0]);
        plots.push.apply(plots, arrowHead);
        for(let i = arrowPairs[1].length - 1; i >= 0; i--)plots.push(arrowPairs[1][i]);
        // convert to point in maxZoom
        plots = plots.map((p)=>p.multi(zoomScale));
        return [
            plots,
            [
                arrowPairs[0].length,
                arrowHead.length,
                arrowPairs[1].length
            ]
        ];
    }
}
/**
 * @classdesc Curve style LineString
 * @class
 * @category geometry
 * @extends {maptalks.LineString}
 * @param {maptalks.Coordinate[]|Number[][]} coordinates - coordinates of the line string
 * @param {Object} [options=null]   - construct options defined in [maptalks.DiagonalArrow]{@link maptalks.DiagonalArrow#options}
 * @example
 * var curve = new maptalks.DiagonalArrow(
 *     [
 *         [121.47083767181408,31.214448123476995],
 *         [121.4751292062378,31.215475523000404],
 *         [121.47869117980943,31.211916269810335]
 *     ],
 *     {
 *         symbol : {
 *             'lineWidth' : 5
 *         }
 *     }
 * ).addTo(layer);
 */ DiagonalArrow.mergeOptions(DiagonalArrow_options);
DiagonalArrow.registerJSONType('DiagonalArrow');
maptalks_es_DrawTool.registerMode('DiagonalArrow', {
    action: [
        'click',
        'mousemove',
        'dblclick'
    ],
    create: function(projection, prjPath) {
        const path = prjPath.map((c)=>projection.unproject(c));
        const line = new DiagonalArrow(path);
        line._setPrjCoordinates(prjPath);
        return line;
    },
    update: function(projection, prjPath, geometry) {
        let prjCoords;
        if (Array.isArray(prjPath)) prjCoords = prjPath;
        else {
            prjCoords = geometry._getPrjCoordinates();
            prjCoords.push(prjPath);
        }
        const path = prjCoords.map((c)=>projection.unproject(c));
        geometry.setCoordinates(path);
        geometry._setPrjCoordinates(prjCoords);
    },
    generate: function(geometry) {
        return geometry;
    }
});
/**
 * @property {Object} options
 */ const DoveTailDiagonalArrow_options = {
    widthRatio: 0.20,
    arrowStyle: []
};
class DoveTailDiagonalArrow extends DiagonalArrow {
    static fromJSON(json) {
        const feature = json['feature'];
        const arrow = new DoveTailDiagonalArrow(feature['geometry']['coordinates'], json['options']);
        arrow.setProperties(feature['properties']);
        return arrow;
    }
    _toJSON(options) {
        return {
            feature: this.toGeoJSON(options),
            subType: 'DoveTailDiagonalArrow'
        };
    }
    _closeArrow(ctx, last, first) {
        const pitch = this.getMap().getPitch();
        const t1 = new __WEBPACK_EXTERNAL_MODULE__mapbox_point_geometry__["default"](last.x, last.y);
        const t2 = new __WEBPACK_EXTERNAL_MODULE__mapbox_point_geometry__["default"](first.x, first.y);
        const m = new __WEBPACK_EXTERNAL_MODULE__mapbox_point_geometry__["default"](t1.x + t2.x, t1.y + t2.y).mult(0.5);
        const dist = -t1.dist(t2);
        const normal = t1.sub(t2)._unit()._perp();
        const max = 0.618;
        const min = 0.1;
        const maxPitch = 80; //map's default max pitch
        const ratio = max - pitch * (max - min) / maxPitch;
        const xc = m.x + dist * ratio * normal.x, yc = m.y + dist * ratio * normal.y;
        ctx.lineTo(xc, yc);
        ctx.closePath();
    }
}
/**
 * @classdesc Curve style LineString
 * @class
 * @category geometry
 * @extends {maptalks.LineString}
 * @param {maptalks.Coordinate[]|Number[][]} coordinates - coordinates of the line string
 * @param {Object} [options=null]   - construct options defined in [maptalks.DoveTailDiagonalArrow]{@link maptalks.DoveTailDiagonalArrow#options}
 * @example
 * var curve = new maptalks.DoveTailDiagonalArrow(
 *     [
 *         [121.47083767181408,31.214448123476995],
 *         [121.4751292062378,31.215475523000404],
 *         [121.47869117980943,31.211916269810335]
 *     ],
 *     {
 *         symbol : {
 *             'lineWidth' : 5
 *         }
 *     }
 * ).addTo(layer);
 */ DoveTailDiagonalArrow.mergeOptions(DoveTailDiagonalArrow_options);
DoveTailDiagonalArrow.registerJSONType('DoveTailDiagonalArrow');
maptalks_es_DrawTool.registerMode('DoveTailDiagonalArrow', {
    action: [
        'click',
        'mousemove',
        'dblclick'
    ],
    create: function(projection, prjPath) {
        const path = prjPath.map((c)=>projection.unproject(c));
        const line = new DoveTailDiagonalArrow(path);
        line._setPrjCoordinates(prjPath);
        return line;
    },
    update: function(projection, prjPath, geometry) {
        let prjCoords;
        if (Array.isArray(prjPath)) prjCoords = prjPath;
        else {
            prjCoords = geometry._getPrjCoordinates();
            prjCoords.push(prjPath);
        }
        const path = prjCoords.map((c)=>projection.unproject(c));
        geometry.setCoordinates(path);
        geometry._setPrjCoordinates(prjCoords);
    },
    generate: function(geometry) {
        return geometry;
    }
});
class InterpolationGeometry extends maptalks_es_Curve {
    startEdit() {
        let options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        options.newVertexHandleSymbol = {
            markerType: 'ellipse',
            markerFill: '#fff',
            markerLineColor: '#000',
            markerLineWidth: 2,
            markerWidth: 10,
            markerHeight: 10,
            opacity: 0
        };
        return super.startEdit(options);
    }
    _getPaintParams() {
        const map = this.getMap();
        const zoomScale = map.getGLScale();
        const coordinates = this._generate();
        if (!coordinates) return null;
        const projection = this._getProjection();
        if (!projection) return null;
        this._verifyProjection();
        const prjCoords = this._projectCoords(coordinates);
        let points = this._getPath2DPoints(prjCoords);
        points = points.map((p)=>p.multi(zoomScale));
        return [
            points,
            []
        ];
    }
    _paintOn(ctx, points, segs, lineOpacity, fillOpacity) {
        if (points.length <= 0) return;
        ctx.strokeStyle = this.getSymbol()['lineColor'] || '#f00';
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for(let i = 1; i < points.length; i++)ctx.lineTo(points[i].x, points[i].y);
        ctx.closePath();
        Canvas._stroke(ctx, lineOpacity);
        Canvas.fillCanvas(ctx, fillOpacity, points[0].x, points[0].y);
    }
}
/* ESM default export */ const src_InterpolationGeometry = InterpolationGeometry;
const _options = {
    headHeightFactor: 0.25,
    headWidthFactor: 0.3,
    neckHeightFactor: 0.85,
    neckWidthFactor: 0.15
};
class DoubleArrow_DoubleArrow extends src_InterpolationGeometry {
    /**
     * 处理插值
     */ _generate() {
        let points = [];
        const coordinates = this.getCoordinates();
        const count = coordinates.length;
        const _points = maptalks_es_Coordinate.toNumberArrays(coordinates);
        if (count < 2) return null;
        if (2 === count) {
            this.setCoordinates(coordinates);
            return null;
        }
        {
            const [pnt1, pnt2, pnt3] = [
                _points[0],
                _points[1],
                _points[2]
            ];
            if (3 === count) {
                this.symmetricalPoints = DoubleArrow_DoubleArrow.getSymmetricalPoints(pnt1, pnt2, pnt3);
                this.connetPoints = Mid(pnt1, pnt2);
            } else if (4 === count) {
                this.symmetricalPoints = _points[3];
                this.connetPoints = Mid(pnt1, pnt2);
            } else ;
            let [leftArrowPoints, rightArrowPoints] = [
                void 0,
                void 0
            ];
            if (isClockWise(pnt1, pnt2, pnt3)) {
                leftArrowPoints = DoubleArrow_DoubleArrow.getArrowPoints(pnt1, this.connetPoints, this.symmetricalPoints, false);
                rightArrowPoints = DoubleArrow_DoubleArrow.getArrowPoints(this.connetPoints, pnt2, pnt3, true);
            } else {
                leftArrowPoints = DoubleArrow_DoubleArrow.getArrowPoints(pnt2, this.connetPoints, pnt3, false);
                rightArrowPoints = DoubleArrow_DoubleArrow.getArrowPoints(this.connetPoints, pnt1, this.symmetricalPoints, true);
            }
            const m = leftArrowPoints.length;
            const t = (m - 5) / 2;
            const llBodyPoints = leftArrowPoints.slice(0, t);
            const lArrowPoints = leftArrowPoints.slice(t, t + 5);
            let lrBodyPoints = leftArrowPoints.slice(t + 5, m);
            let rlBodyPoints = rightArrowPoints.slice(0, t);
            const rArrowPoints = rightArrowPoints.slice(t, t + 5);
            const rrBodyPoints = rightArrowPoints.slice(t + 5, m);
            rlBodyPoints = getBezierPoints(rlBodyPoints);
            const bodyPoints = getBezierPoints(rrBodyPoints.concat(llBodyPoints.slice(1)));
            lrBodyPoints = getBezierPoints(lrBodyPoints);
            points = rlBodyPoints.concat(rArrowPoints, bodyPoints, lArrowPoints, lrBodyPoints);
            points = points.map((p)=>new maptalks_es_Coordinate(p));
        }
        return points;
    }
    /**
     * 获取geom类型
     * @returns {string}
     */ getPlotType() {
        return this.type;
    }
    _exportGeoJSONGeometry() {
        const coordinates = maptalks_es_Coordinate.toNumberArrays([
            this.getShell()
        ]);
        return {
            type: 'Polygon',
            coordinates: coordinates
        };
    }
    _toJSON(options) {
        const opts = index$1.extend({}, options);
        const coordinates = this.getCoordinates();
        opts.geometry = false;
        const feature = this.toGeoJSON(opts);
        feature['geometry'] = {
            type: 'Polygon'
        };
        return {
            feature: feature,
            subType: 'DoubleArrow',
            coordinates: coordinates
        };
    }
    /**
     * 插值箭形上的点
     * @param pnt1
     * @param pnt2
     * @param pnt3
     * @param clockWise
     * @returns {*[]}
     */ static getArrowPoints(pnt1, pnt2, pnt3, clockWise) {
        const midPnt = Mid(pnt1, pnt2);
        const len = MathDistance(midPnt, pnt3);
        let midPnt1 = getThirdPoint(pnt3, midPnt, 0, 0.3 * len, true);
        let midPnt2 = getThirdPoint(pnt3, midPnt, 0, 0.5 * len, true);
        midPnt1 = getThirdPoint(midPnt, midPnt1, HALF_PI, len / 5, clockWise);
        midPnt2 = getThirdPoint(midPnt, midPnt2, HALF_PI, len / 4, clockWise);
        const points = [
            midPnt,
            midPnt1,
            midPnt2,
            pnt3
        ];
        const arrowPnts = DoubleArrow_DoubleArrow._getArrowHeadPoints(points);
        if (arrowPnts && Array.isArray(arrowPnts) && arrowPnts.length > 0) {
            const [neckLeftPoint, neckRightPoint] = [
                arrowPnts[0],
                arrowPnts[4]
            ];
            const tailWidthFactor = MathDistance(pnt1, pnt2) / getBaseLength(points) / 2;
            const bodyPnts = DoubleArrow_DoubleArrow._getArrowBodyPoints(points, neckLeftPoint, neckRightPoint, tailWidthFactor);
            if (bodyPnts) {
                const n = bodyPnts.length;
                let lPoints = bodyPnts.slice(0, n / 2);
                let rPoints = bodyPnts.slice(n / 2, n);
                lPoints.push(neckLeftPoint);
                rPoints.push(neckRightPoint);
                lPoints = lPoints.reverse();
                lPoints.push(pnt2);
                rPoints = rPoints.reverse();
                rPoints.push(pnt1);
                return lPoints.reverse().concat(arrowPnts, rPoints);
            }
        }
        return null;
    }
    /**
     * 插值头部点
     * @param points
     * @returns {*[]}
     */ static _getArrowHeadPoints(points) {
        const len = getBaseLength(points);
        const headHeight = len * _options.headHeightFactor;
        const headPnt = points[points.length - 1];
        const headWidth = headHeight * _options.headWidthFactor;
        const neckWidth = headHeight * _options.neckWidthFactor;
        const neckHeight = headHeight * _options.neckHeightFactor;
        const headEndPnt = getThirdPoint(points[points.length - 2], headPnt, 0, headHeight, true);
        const neckEndPnt = getThirdPoint(points[points.length - 2], headPnt, 0, neckHeight, true);
        const headLeft = getThirdPoint(headPnt, headEndPnt, HALF_PI, headWidth, false);
        const headRight = getThirdPoint(headPnt, headEndPnt, HALF_PI, headWidth, true);
        const neckLeft = getThirdPoint(headPnt, neckEndPnt, HALF_PI, neckWidth, false);
        const neckRight = getThirdPoint(headPnt, neckEndPnt, HALF_PI, neckWidth, true);
        return [
            neckLeft,
            headLeft,
            headPnt,
            headRight,
            neckRight
        ];
    }
    /**
     * 插值面部分数据
     * @param points
     * @param neckLeft
     * @param neckRight
     * @param tailWidthFactor
     * @returns {*|T[]|string}
     */ static _getArrowBodyPoints(points, neckLeft, neckRight, tailWidthFactor) {
        const allLen = wholeDistance(points);
        const len = getBaseLength(points);
        const tailWidth = len * tailWidthFactor;
        const neckWidth = MathDistance(neckLeft, neckRight);
        const widthDif = (tailWidth - neckWidth) / 2;
        let tempLen = 0;
        const leftBodyPnts = [];
        const rightBodyPnts = [];
        for(let i = 1; i < points.length - 1; i++){
            const angle = getAngleOfThreePoints(points[i - 1], points[i], points[i + 1]) / 2;
            tempLen += MathDistance(points[i - 1], points[i]);
            const w = (tailWidth / 2 - tempLen / allLen * widthDif) / Math.sin(angle);
            const left = getThirdPoint(points[i - 1], points[i], Math.PI - angle, w, true);
            const right = getThirdPoint(points[i - 1], points[i], angle, w, false);
            leftBodyPnts.push(left);
            rightBodyPnts.push(right);
        }
        return leftBodyPnts.concat(rightBodyPnts);
    }
    /**
     * 获取对称点
     * @param linePnt1
     * @param linePnt2
     * @param point
     * @returns {undefined}
     */ static getSymmetricalPoints(linePnt1, linePnt2, point) {
        const midPnt = Mid(linePnt1, linePnt2);
        const len = MathDistance(midPnt, point);
        const angle = getAngleOfThreePoints(linePnt1, midPnt, point);
        let [symPnt, distance1, distance2, mid] = [
            void 0,
            void 0,
            void 0,
            void 0
        ];
        if (angle < HALF_PI) {
            distance1 = len * Math.sin(angle);
            distance2 = len * Math.cos(angle);
            mid = getThirdPoint(linePnt1, midPnt, HALF_PI, distance1, false);
            symPnt = getThirdPoint(midPnt, mid, HALF_PI, distance2, true);
        } else if (angle >= HALF_PI && angle < Math.PI) {
            distance1 = len * Math.sin(Math.PI - angle);
            distance2 = len * Math.cos(Math.PI - angle);
            mid = getThirdPoint(linePnt1, midPnt, HALF_PI, distance1, false);
            symPnt = getThirdPoint(midPnt, mid, HALF_PI, distance2, false);
        } else if (angle >= Math.PI && angle < 1.5 * Math.PI) {
            distance1 = len * Math.sin(angle - Math.PI);
            distance2 = len * Math.cos(angle - Math.PI);
            mid = getThirdPoint(linePnt1, midPnt, HALF_PI, distance1, true);
            symPnt = getThirdPoint(midPnt, mid, HALF_PI, distance2, true);
        } else {
            distance1 = len * Math.sin(2 * Math.PI - angle);
            distance2 = len * Math.cos(2 * Math.PI - angle);
            mid = getThirdPoint(linePnt1, midPnt, HALF_PI, distance1, true);
            symPnt = getThirdPoint(midPnt, mid, HALF_PI, distance2, false);
        }
        return symPnt;
    }
    static fromJSON(json) {
        const feature = json['feature'];
        const doubleArrow = new DoubleArrow_DoubleArrow(json['coordinates'], json['options']);
        doubleArrow.setProperties(feature['properties']);
        return doubleArrow;
    }
    constructor(coordinates, options = {}){
        super(coordinates, options);
        this.type = 'DoubleArrow';
        this.connetPoints = [];
        this.symmetricalPoints = [];
    }
}
DoubleArrow_DoubleArrow.registerJSONType('DoubleArrow');
maptalks_es_DrawTool.registerMode('DoubleArrow', {
    action: [
        'click',
        'mousemove',
        'dblclick'
    ],
    create (projection, prjPath) {
        const path = prjPath.map((c)=>projection.unproject(c));
        const line = new maptalks_es_LineString(path);
        line._setPrjCoordinates(prjPath);
        return line;
    },
    update (projection, path, geometry, e) {
        const symbol = geometry.getSymbol();
        let prjCoords;
        if (Array.isArray(path)) prjCoords = path;
        else {
            prjCoords = geometry._getPrjCoordinates();
            prjCoords.push(path);
        }
        const coordinates = prjCoords.map((c)=>projection.unproject(c));
        geometry.setCoordinates(coordinates);
        geometry._setPrjCoordinates(prjCoords);
        const layer = geometry.getLayer();
        if (layer) {
            const map = layer.getMap();
            let doublearrow = layer.getGeometryById('doublearrow');
            if (!doublearrow && path.length >= 3) {
                doublearrow = new DoubleArrow_DoubleArrow(path, {
                    id: 'doublearrow'
                });
                doublearrow._drawTool = e.drawTool || map['_map_tool'];
                doublearrow.addTo(layer);
                if (symbol) doublearrow.setSymbol(symbol);
                geometry.updateSymbol({
                    lineOpacity: 0
                });
            }
            if (doublearrow) {
                doublearrow.setCoordinates(coordinates);
                doublearrow._setPrjCoordinates(path);
                geometry.updateSymbol({
                    lineOpacity: 0
                });
            }
        }
    },
    generate (geometry) {
        const symbol = geometry.getSymbol();
        symbol.lineOpacity = 1;
        let coordinates = geometry.getCoordinates();
        if (coordinates.length > 4) coordinates = coordinates.slice(0, 4);
        return new DoubleArrow_DoubleArrow(coordinates, {
            symbol: symbol
        });
    }
});
/* ESM default export */ const DoubleArrow = DoubleArrow_DoubleArrow;
class ClosedCurve_ClosedCurve extends src_InterpolationGeometry {
    /**
     * 获取geom类型
     * @returns {string}
     */ getPlotType() {
        return this.type;
    }
    /**
     * 处理插值
     * @returns {*}
     * @private
     */ _generate() {
        const coordinates = this.getCoordinates();
        const count = coordinates.length;
        if (count < 2) return null;
        if (2 === count) {
            this.setCoordinates(coordinates);
            return null;
        }
        {
            const points = maptalks_es_Coordinate.toNumberArrays(coordinates);
            points.push(points[0], points[1]);
            let [normals, pList] = [
                [],
                []
            ];
            for(let i = 0; i < points.length - 2; i++){
                const normalPoints = getBisectorNormals(this._offset, points[i], points[i + 1], points[i + 2]);
                normals = normals.concat(normalPoints);
            }
            const count = normals.length;
            normals = [
                normals[count - 1]
            ].concat(normals.slice(0, count - 1));
            for(let i = 0; i < points.length - 2; i++){
                const pnt1 = points[i];
                const pnt2 = points[i + 1];
                pList.push(pnt1);
                for(let t = 0; t <= FITTING_COUNT; t++){
                    const pnt = getCubicValue(t / FITTING_COUNT, pnt1, normals[2 * i], normals[2 * i + 1], pnt2);
                    pList.push(pnt);
                }
                pList.push(pnt2);
            }
            pList = pList.map((p)=>new maptalks_es_Coordinate(p));
            return pList;
        }
    }
    _exportGeoJSONGeometry() {
        const coordinates = maptalks_es_Coordinate.toNumberArrays([
            this.getShell()
        ]);
        return {
            type: 'Polygon',
            coordinates: coordinates
        };
    }
    _toJSON(options) {
        const opts = index$1.extend({}, options);
        const coordinates = this.getCoordinates();
        opts.geometry = false;
        const feature = this.toGeoJSON(opts);
        feature['geometry'] = {
            type: 'Polygon'
        };
        return {
            feature: feature,
            subType: 'ClosedCurve',
            coordinates: coordinates
        };
    }
    static fromJSON(json) {
        const feature = json['feature'];
        const _closedCurve = new ClosedCurve_ClosedCurve(json['coordinates'], json['options']);
        _closedCurve.setProperties(feature['properties']);
        return _closedCurve;
    }
    constructor(coordinates, options = {}){
        super(coordinates, options);
        this.type = 'ClosedCurve';
        this._offset = 0.3;
        if (coordinates) this.setCoordinates(coordinates);
    }
}
ClosedCurve_ClosedCurve.registerJSONType('ClosedCurve');
maptalks_es_DrawTool.registerMode('ClosedCurve', {
    action: [
        'click',
        'mousemove',
        'dblclick'
    ],
    create (projection, prjPath) {
        const path = prjPath.map((c)=>projection.unproject(c));
        const line = new maptalks_es_LineString(path);
        line._setPrjCoordinates(prjPath);
        return line;
    },
    update (projection, path, geometry) {
        const symbol = geometry.getSymbol();
        let prjCoords;
        if (Array.isArray(path)) prjCoords = path;
        else {
            prjCoords = geometry._getPrjCoordinates();
            prjCoords.push(path);
        }
        const coordinates = prjCoords.map((c)=>projection.unproject(c));
        geometry.setCoordinates(coordinates);
        geometry._setPrjCoordinates(prjCoords);
        const layer = geometry.getLayer();
        if (layer) {
            let doublearrow = layer.getGeometryById('closedcurve');
            if (!doublearrow && path.length >= 3) {
                doublearrow = new ClosedCurve_ClosedCurve([
                    path
                ], {
                    id: 'closedcurve'
                });
                doublearrow.addTo(layer);
                if (symbol) doublearrow.setSymbol(symbol);
                geometry.updateSymbol({
                    lineOpacity: 0
                });
            }
            if (doublearrow) {
                doublearrow.setCoordinates(coordinates);
                doublearrow._setPrjCoordinates(path);
                geometry.updateSymbol({
                    lineOpacity: 0
                });
            }
        }
    },
    generate (geometry) {
        const symbol = geometry.getSymbol();
        symbol.lineOpacity = 1;
        return new ClosedCurve_ClosedCurve(geometry.getCoordinates(), {
            symbol: symbol
        });
    }
});
/* ESM default export */ const ClosedCurve = ClosedCurve_ClosedCurve;
class Sector_Sector extends src_InterpolationGeometry {
    /**
     * 获取geom类型
     * @returns {string}
     */ getPlotType() {
        return this.type;
    }
    /**
     * handle coordinates
     * @private
     */ _generate() {
        let points = [];
        const coordinates = this.getCoordinates();
        const count = coordinates.length;
        const _points = maptalks_es_Coordinate.toNumberArrays(coordinates);
        if (count <= 2) {
            this.setCoordinates(_points);
            return null;
        }
        if (3 === count) {
            const [center, pnt2, pnt3] = [
                _points[0],
                _points[1],
                _points[2]
            ];
            const measurer = this._getMeasurer();
            const radius = pointDistance(measurer, pnt2, center);
            const startAngle = getAzimuth(pnt2, center);
            const endAngle = getAzimuth(pnt3, center);
            const pList = getSectorPoints(measurer, center, radius, startAngle, endAngle);
            pList.push(center, pList[0]);
            points = pList.map((p)=>new maptalks_es_Coordinate(p));
        } else ;
        return points;
    }
    _exportGeoJSONGeometry() {
        const coordinates = maptalks_es_Coordinate.toNumberArrays([
            this.getShell()
        ]);
        return {
            type: 'Polygon',
            coordinates: coordinates
        };
    }
    _toJSON(options) {
        const opts = index$1.extend({}, options);
        const coordinates = this.getCoordinates();
        opts.geometry = false;
        const feature = this.toGeoJSON(opts);
        feature['geometry'] = {
            type: 'Polygon'
        };
        return {
            feature: feature,
            subType: 'PlotSector',
            coordinates: coordinates
        };
    }
    static fromJSON(json) {
        const feature = json['feature'];
        const _geometry = new Sector_Sector(json['coordinates'], json['options']);
        _geometry.setProperties(feature['properties']);
        return _geometry;
    }
    constructor(coordinates, options = {}){
        super(coordinates, options);
        this.type = 'PlotSector';
        if (coordinates) this.setCoordinates(coordinates);
    }
}
Sector_Sector.registerJSONType('PlotSector');
maptalks_es_DrawTool.registerMode('PlotSector', {
    action: [
        'click',
        'mousemove',
        'dblclick'
    ],
    create (projection, prjPath) {
        const path = prjPath.map((c)=>projection.unproject(c));
        const line = new maptalks_es_LineString(path);
        line._setPrjCoordinates(prjPath);
        return line;
    },
    update (projection, path, geometry, e) {
        const symbol = geometry.getSymbol();
        let prjCoords;
        if (Array.isArray(path)) prjCoords = path;
        else {
            prjCoords = geometry._getPrjCoordinates();
            prjCoords.push(path);
        }
        const coordinates = prjCoords.map((c)=>projection.unproject(c));
        geometry.setCoordinates(coordinates);
        geometry._setPrjCoordinates(prjCoords);
        const layer = geometry.getLayer();
        if (layer) {
            const map = layer.getMap();
            let sector = layer.getGeometryById('sector');
            if (!sector && path.length >= 3) {
                sector = new Sector_Sector(path, {
                    id: 'sector'
                });
                sector._drawTool = e.drawTool || map['_map_tool'];
                sector.addTo(layer);
                const pSymbol = index$1.extendSymbol(symbol, {});
                if (pSymbol) sector.setSymbol(pSymbol);
                geometry.updateSymbol({
                    lineOpacity: 0
                });
            }
            if (sector) {
                sector.setCoordinates(coordinates);
                sector._setPrjCoordinates(prjCoords);
                geometry.updateSymbol({
                    lineOpacity: 0
                });
            }
        }
    },
    generate (geometry) {
        const symbol = geometry.getSymbol();
        symbol.lineOpacity = 1;
        let coordinates = geometry.getCoordinates();
        if (coordinates.length > 3) coordinates = coordinates.slice(0, 3);
        return new Sector_Sector(coordinates, {
            symbol: symbol
        });
    }
});
/* ESM default export */ const Polygon_Sector = Sector_Sector;
class GatheringPlace_GatheringPlace extends src_InterpolationGeometry {
    getPlotType() {
        return this.type;
    }
    _generate() {
        const coordinates = this.getCoordinates();
        let count = coordinates.length;
        let _points = maptalks_es_Coordinate.toNumberArrays(coordinates);
        if (count < 2) return;
        if (2 === count) {
            let mid = Mid(_points[0], _points[1]);
            const distance = MathDistance(_points[0], mid) / 0.9;
            let pnt = getThirdPoint(_points[0], mid, HALF_PI, distance, true);
            _points = [
                _points[0],
                pnt,
                _points[1]
            ];
        }
        let mid = Mid(_points[0], _points[2]);
        _points.push(mid, _points[0], _points[1]);
        let [normals, pnt1, pnt2, pnt3, pList] = [
            [],
            void 0,
            void 0,
            void 0,
            []
        ];
        for(let i = 0; i < _points.length - 2; i++){
            pnt1 = _points[i];
            pnt2 = _points[i + 1];
            pnt3 = _points[i + 2];
            let normalPoints = getBisectorNormals(this._offset, pnt1, pnt2, pnt3);
            normals = normals.concat(normalPoints);
        }
        count = normals.length;
        normals = [
            normals[count - 1]
        ].concat(normals.slice(0, count - 1));
        for(let i = 0; i < _points.length - 2; i++){
            pnt1 = _points[i];
            pnt2 = _points[i + 1];
            pList.push(pnt1);
            for(let t = 0; t <= FITTING_COUNT; t++){
                let pnt = getCubicValue(t / FITTING_COUNT, pnt1, normals[2 * i], normals[2 * i + 1], pnt2);
                pList.push(pnt);
            }
            pList.push(pnt2);
        }
        pList = pList.map((p)=>new maptalks_es_Coordinate(p));
        return pList;
    }
    _exportGeoJSONGeometry() {
        const coordinates = maptalks_es_Coordinate.toNumberArrays([
            this.getShell()
        ]);
        return {
            type: 'Polygon',
            coordinates: coordinates
        };
    }
    _toJSON(options) {
        const opts = index$1.extend({}, options);
        const coordinates = this.getCoordinates();
        opts.geometry = false;
        const feature = this.toGeoJSON(opts);
        feature['geometry'] = {
            type: 'Polygon'
        };
        return {
            feature: feature,
            subType: 'GatheringPlace',
            coordinates: coordinates
        };
    }
    static fromJSON(json) {
        const feature = json['feature'];
        const _atheringPlace = new GatheringPlace_GatheringPlace(json['coordinates'], json['options']);
        _atheringPlace.setProperties(feature['properties']);
        return _atheringPlace;
    }
    constructor(coordinates, options = {}){
        super(coordinates, options);
        this.type = 'GatheringPlace';
        this._offset = 0.4;
        if (coordinates) this.setCoordinates(coordinates);
    }
}
GatheringPlace_GatheringPlace.registerJSONType('GatheringPlace');
maptalks_es_DrawTool.registerMode('GatheringPlace', {
    action: [
        'click',
        'mousemove',
        'dblclick'
    ],
    create (projection, prjPath) {
        const path = prjPath.map((c)=>projection.unproject(c));
        const line = new GatheringPlace_GatheringPlace(path);
        line._setPrjCoordinates(prjPath);
        return line;
    },
    update (projection, path, geometry) {
        const symbol = geometry.getSymbol();
        let prjCoords;
        if (Array.isArray(path)) prjCoords = path;
        else {
            prjCoords = geometry._getPrjCoordinates();
            prjCoords.push(path);
        }
        const coordinates = prjCoords.map((c)=>projection.unproject(c));
        geometry.setCoordinates(coordinates);
        geometry._setPrjCoordinates(prjCoords);
        const layer = geometry.getLayer();
        if (layer) {
            let doublearrow = layer.getGeometryById('gatheringplace');
            if (!doublearrow && path.length >= 3) {
                doublearrow = new GatheringPlace_GatheringPlace([
                    path
                ], {
                    id: 'gatheringplace'
                });
                doublearrow.addTo(layer);
                if (symbol) doublearrow.setSymbol(symbol);
                geometry.updateSymbol({
                    lineOpacity: 0
                });
            }
            if (doublearrow) {
                doublearrow.setCoordinates(coordinates);
                doublearrow._setPrjCoordinates(path);
                geometry.updateSymbol({
                    lineOpacity: 0
                });
            }
        }
    },
    generate (geometry) {
        const symbol = geometry.getSymbol();
        symbol.lineOpacity = 1;
        return new GatheringPlace_GatheringPlace(geometry.getCoordinates(), {
            symbol: symbol
        });
    }
});
/* ESM default export */ const GatheringPlace = GatheringPlace_GatheringPlace;
export { ClosedCurve, DiagonalArrow, DoubleArrow, DoveTailDiagonalArrow, GatheringPlace, Polygon_Sector as Sector, StraightArrow };
