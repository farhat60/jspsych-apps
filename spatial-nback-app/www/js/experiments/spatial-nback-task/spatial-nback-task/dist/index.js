import jsPsychHtmlButtonResponse from '@jspsych/plugin-html-button-response';

var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// ../../node_modules/auto-bind/index.js
var require_auto_bind = __commonJS({
  "../../node_modules/auto-bind/index.js"(exports, module) {
    var getAllProperties = (object) => {
      const properties = /* @__PURE__ */ new Set();
      do {
        for (const key of Reflect.ownKeys(object)) {
          properties.add([object, key]);
        }
      } while ((object = Reflect.getPrototypeOf(object)) && object !== Object.prototype);
      return properties;
    };
    module.exports = (self2, { include, exclude } = {}) => {
      const filter = (key) => {
        const match = (pattern) => typeof pattern === "string" ? key === pattern : pattern.test(key);
        if (include) {
          return include.some(match);
        }
        if (exclude) {
          return !exclude.some(match);
        }
        return true;
      };
      for (const [object, key] of getAllProperties(self2.constructor.prototype)) {
        if (key === "constructor" || !filter(key)) {
          continue;
        }
        const descriptor = Reflect.getOwnPropertyDescriptor(object, key);
        if (descriptor && typeof descriptor.value === "function") {
          self2[key] = self2[key].bind(self2);
        }
      }
      return self2;
    };
  }
});

// ../../node_modules/seedrandom/lib/alea.js
var require_alea = __commonJS({
  "../../node_modules/seedrandom/lib/alea.js"(exports, module) {
    (function(global, module2, define2) {
      function Alea(seed) {
        var me = this, mash = Mash();
        me.next = function() {
          var t = 2091639 * me.s0 + me.c * 23283064365386963e-26;
          me.s0 = me.s1;
          me.s1 = me.s2;
          return me.s2 = t - (me.c = t | 0);
        };
        me.c = 1;
        me.s0 = mash(" ");
        me.s1 = mash(" ");
        me.s2 = mash(" ");
        me.s0 -= mash(seed);
        if (me.s0 < 0) {
          me.s0 += 1;
        }
        me.s1 -= mash(seed);
        if (me.s1 < 0) {
          me.s1 += 1;
        }
        me.s2 -= mash(seed);
        if (me.s2 < 0) {
          me.s2 += 1;
        }
        mash = null;
      }
      function copy(f, t) {
        t.c = f.c;
        t.s0 = f.s0;
        t.s1 = f.s1;
        t.s2 = f.s2;
        return t;
      }
      function impl(seed, opts) {
        var xg = new Alea(seed), state = opts && opts.state, prng = xg.next;
        prng.int32 = function() {
          return xg.next() * 4294967296 | 0;
        };
        prng.double = function() {
          return prng() + (prng() * 2097152 | 0) * 11102230246251565e-32;
        };
        prng.quick = prng;
        if (state) {
          if (typeof state == "object")
            copy(state, xg);
          prng.state = function() {
            return copy(xg, {});
          };
        }
        return prng;
      }
      function Mash() {
        var n = 4022871197;
        var mash = function(data) {
          data = String(data);
          for (var i = 0; i < data.length; i++) {
            n += data.charCodeAt(i);
            var h = 0.02519603282416938 * n;
            n = h >>> 0;
            h -= n;
            h *= n;
            n = h >>> 0;
            h -= n;
            n += h * 4294967296;
          }
          return (n >>> 0) * 23283064365386963e-26;
        };
        return mash;
      }
      if (module2 && module2.exports) {
        module2.exports = impl;
      } else if (define2 && define2.amd) {
        define2(function() {
          return impl;
        });
      } else {
        this.alea = impl;
      }
    })(
      exports,
      typeof module == "object" && module,
      // present in node.js
      typeof define == "function" && define
      // present with an AMD loader
    );
  }
});

// ../../node_modules/seedrandom/lib/xor128.js
var require_xor128 = __commonJS({
  "../../node_modules/seedrandom/lib/xor128.js"(exports, module) {
    (function(global, module2, define2) {
      function XorGen(seed) {
        var me = this, strseed = "";
        me.x = 0;
        me.y = 0;
        me.z = 0;
        me.w = 0;
        me.next = function() {
          var t = me.x ^ me.x << 11;
          me.x = me.y;
          me.y = me.z;
          me.z = me.w;
          return me.w ^= me.w >>> 19 ^ t ^ t >>> 8;
        };
        if (seed === (seed | 0)) {
          me.x = seed;
        } else {
          strseed += seed;
        }
        for (var k = 0; k < strseed.length + 64; k++) {
          me.x ^= strseed.charCodeAt(k) | 0;
          me.next();
        }
      }
      function copy(f, t) {
        t.x = f.x;
        t.y = f.y;
        t.z = f.z;
        t.w = f.w;
        return t;
      }
      function impl(seed, opts) {
        var xg = new XorGen(seed), state = opts && opts.state, prng = function() {
          return (xg.next() >>> 0) / 4294967296;
        };
        prng.double = function() {
          do {
            var top = xg.next() >>> 11, bot = (xg.next() >>> 0) / 4294967296, result = (top + bot) / (1 << 21);
          } while (result === 0);
          return result;
        };
        prng.int32 = xg.next;
        prng.quick = prng;
        if (state) {
          if (typeof state == "object")
            copy(state, xg);
          prng.state = function() {
            return copy(xg, {});
          };
        }
        return prng;
      }
      if (module2 && module2.exports) {
        module2.exports = impl;
      } else if (define2 && define2.amd) {
        define2(function() {
          return impl;
        });
      } else {
        this.xor128 = impl;
      }
    })(
      exports,
      typeof module == "object" && module,
      // present in node.js
      typeof define == "function" && define
      // present with an AMD loader
    );
  }
});

// ../../node_modules/seedrandom/lib/xorwow.js
var require_xorwow = __commonJS({
  "../../node_modules/seedrandom/lib/xorwow.js"(exports, module) {
    (function(global, module2, define2) {
      function XorGen(seed) {
        var me = this, strseed = "";
        me.next = function() {
          var t = me.x ^ me.x >>> 2;
          me.x = me.y;
          me.y = me.z;
          me.z = me.w;
          me.w = me.v;
          return (me.d = me.d + 362437 | 0) + (me.v = me.v ^ me.v << 4 ^ (t ^ t << 1)) | 0;
        };
        me.x = 0;
        me.y = 0;
        me.z = 0;
        me.w = 0;
        me.v = 0;
        if (seed === (seed | 0)) {
          me.x = seed;
        } else {
          strseed += seed;
        }
        for (var k = 0; k < strseed.length + 64; k++) {
          me.x ^= strseed.charCodeAt(k) | 0;
          if (k == strseed.length) {
            me.d = me.x << 10 ^ me.x >>> 4;
          }
          me.next();
        }
      }
      function copy(f, t) {
        t.x = f.x;
        t.y = f.y;
        t.z = f.z;
        t.w = f.w;
        t.v = f.v;
        t.d = f.d;
        return t;
      }
      function impl(seed, opts) {
        var xg = new XorGen(seed), state = opts && opts.state, prng = function() {
          return (xg.next() >>> 0) / 4294967296;
        };
        prng.double = function() {
          do {
            var top = xg.next() >>> 11, bot = (xg.next() >>> 0) / 4294967296, result = (top + bot) / (1 << 21);
          } while (result === 0);
          return result;
        };
        prng.int32 = xg.next;
        prng.quick = prng;
        if (state) {
          if (typeof state == "object")
            copy(state, xg);
          prng.state = function() {
            return copy(xg, {});
          };
        }
        return prng;
      }
      if (module2 && module2.exports) {
        module2.exports = impl;
      } else if (define2 && define2.amd) {
        define2(function() {
          return impl;
        });
      } else {
        this.xorwow = impl;
      }
    })(
      exports,
      typeof module == "object" && module,
      // present in node.js
      typeof define == "function" && define
      // present with an AMD loader
    );
  }
});

// ../../node_modules/seedrandom/lib/xorshift7.js
var require_xorshift7 = __commonJS({
  "../../node_modules/seedrandom/lib/xorshift7.js"(exports, module) {
    (function(global, module2, define2) {
      function XorGen(seed) {
        var me = this;
        me.next = function() {
          var X = me.x, i = me.i, t, v;
          t = X[i];
          t ^= t >>> 7;
          v = t ^ t << 24;
          t = X[i + 1 & 7];
          v ^= t ^ t >>> 10;
          t = X[i + 3 & 7];
          v ^= t ^ t >>> 3;
          t = X[i + 4 & 7];
          v ^= t ^ t << 7;
          t = X[i + 7 & 7];
          t = t ^ t << 13;
          v ^= t ^ t << 9;
          X[i] = v;
          me.i = i + 1 & 7;
          return v;
        };
        function init(me2, seed2) {
          var j, X = [];
          if (seed2 === (seed2 | 0)) {
            X[0] = seed2;
          } else {
            seed2 = "" + seed2;
            for (j = 0; j < seed2.length; ++j) {
              X[j & 7] = X[j & 7] << 15 ^ seed2.charCodeAt(j) + X[j + 1 & 7] << 13;
            }
          }
          while (X.length < 8)
            X.push(0);
          for (j = 0; j < 8 && X[j] === 0; ++j)
            ;
          if (j == 8)
            X[7] = -1;
          else
            X[j];
          me2.x = X;
          me2.i = 0;
          for (j = 256; j > 0; --j) {
            me2.next();
          }
        }
        init(me, seed);
      }
      function copy(f, t) {
        t.x = f.x.slice();
        t.i = f.i;
        return t;
      }
      function impl(seed, opts) {
        if (seed == null)
          seed = +/* @__PURE__ */ new Date();
        var xg = new XorGen(seed), state = opts && opts.state, prng = function() {
          return (xg.next() >>> 0) / 4294967296;
        };
        prng.double = function() {
          do {
            var top = xg.next() >>> 11, bot = (xg.next() >>> 0) / 4294967296, result = (top + bot) / (1 << 21);
          } while (result === 0);
          return result;
        };
        prng.int32 = xg.next;
        prng.quick = prng;
        if (state) {
          if (state.x)
            copy(state, xg);
          prng.state = function() {
            return copy(xg, {});
          };
        }
        return prng;
      }
      if (module2 && module2.exports) {
        module2.exports = impl;
      } else if (define2 && define2.amd) {
        define2(function() {
          return impl;
        });
      } else {
        this.xorshift7 = impl;
      }
    })(
      exports,
      typeof module == "object" && module,
      // present in node.js
      typeof define == "function" && define
      // present with an AMD loader
    );
  }
});

// ../../node_modules/seedrandom/lib/xor4096.js
var require_xor4096 = __commonJS({
  "../../node_modules/seedrandom/lib/xor4096.js"(exports, module) {
    (function(global, module2, define2) {
      function XorGen(seed) {
        var me = this;
        me.next = function() {
          var w = me.w, X = me.X, i = me.i, t, v;
          me.w = w = w + 1640531527 | 0;
          v = X[i + 34 & 127];
          t = X[i = i + 1 & 127];
          v ^= v << 13;
          t ^= t << 17;
          v ^= v >>> 15;
          t ^= t >>> 12;
          v = X[i] = v ^ t;
          me.i = i;
          return v + (w ^ w >>> 16) | 0;
        };
        function init(me2, seed2) {
          var t, v, i, j, w, X = [], limit = 128;
          if (seed2 === (seed2 | 0)) {
            v = seed2;
            seed2 = null;
          } else {
            seed2 = seed2 + "\0";
            v = 0;
            limit = Math.max(limit, seed2.length);
          }
          for (i = 0, j = -32; j < limit; ++j) {
            if (seed2)
              v ^= seed2.charCodeAt((j + 32) % seed2.length);
            if (j === 0)
              w = v;
            v ^= v << 10;
            v ^= v >>> 15;
            v ^= v << 4;
            v ^= v >>> 13;
            if (j >= 0) {
              w = w + 1640531527 | 0;
              t = X[j & 127] ^= v + w;
              i = 0 == t ? i + 1 : 0;
            }
          }
          if (i >= 128) {
            X[(seed2 && seed2.length || 0) & 127] = -1;
          }
          i = 127;
          for (j = 4 * 128; j > 0; --j) {
            v = X[i + 34 & 127];
            t = X[i = i + 1 & 127];
            v ^= v << 13;
            t ^= t << 17;
            v ^= v >>> 15;
            t ^= t >>> 12;
            X[i] = v ^ t;
          }
          me2.w = w;
          me2.X = X;
          me2.i = i;
        }
        init(me, seed);
      }
      function copy(f, t) {
        t.i = f.i;
        t.w = f.w;
        t.X = f.X.slice();
        return t;
      }
      function impl(seed, opts) {
        if (seed == null)
          seed = +/* @__PURE__ */ new Date();
        var xg = new XorGen(seed), state = opts && opts.state, prng = function() {
          return (xg.next() >>> 0) / 4294967296;
        };
        prng.double = function() {
          do {
            var top = xg.next() >>> 11, bot = (xg.next() >>> 0) / 4294967296, result = (top + bot) / (1 << 21);
          } while (result === 0);
          return result;
        };
        prng.int32 = xg.next;
        prng.quick = prng;
        if (state) {
          if (state.X)
            copy(state, xg);
          prng.state = function() {
            return copy(xg, {});
          };
        }
        return prng;
      }
      if (module2 && module2.exports) {
        module2.exports = impl;
      } else if (define2 && define2.amd) {
        define2(function() {
          return impl;
        });
      } else {
        this.xor4096 = impl;
      }
    })(
      exports,
      // window object or global
      typeof module == "object" && module,
      // present in node.js
      typeof define == "function" && define
      // present with an AMD loader
    );
  }
});

// ../../node_modules/seedrandom/lib/tychei.js
var require_tychei = __commonJS({
  "../../node_modules/seedrandom/lib/tychei.js"(exports, module) {
    (function(global, module2, define2) {
      function XorGen(seed) {
        var me = this, strseed = "";
        me.next = function() {
          var b = me.b, c = me.c, d = me.d, a = me.a;
          b = b << 25 ^ b >>> 7 ^ c;
          c = c - d | 0;
          d = d << 24 ^ d >>> 8 ^ a;
          a = a - b | 0;
          me.b = b = b << 20 ^ b >>> 12 ^ c;
          me.c = c = c - d | 0;
          me.d = d << 16 ^ c >>> 16 ^ a;
          return me.a = a - b | 0;
        };
        me.a = 0;
        me.b = 0;
        me.c = 2654435769 | 0;
        me.d = 1367130551;
        if (seed === Math.floor(seed)) {
          me.a = seed / 4294967296 | 0;
          me.b = seed | 0;
        } else {
          strseed += seed;
        }
        for (var k = 0; k < strseed.length + 20; k++) {
          me.b ^= strseed.charCodeAt(k) | 0;
          me.next();
        }
      }
      function copy(f, t) {
        t.a = f.a;
        t.b = f.b;
        t.c = f.c;
        t.d = f.d;
        return t;
      }
      function impl(seed, opts) {
        var xg = new XorGen(seed), state = opts && opts.state, prng = function() {
          return (xg.next() >>> 0) / 4294967296;
        };
        prng.double = function() {
          do {
            var top = xg.next() >>> 11, bot = (xg.next() >>> 0) / 4294967296, result = (top + bot) / (1 << 21);
          } while (result === 0);
          return result;
        };
        prng.int32 = xg.next;
        prng.quick = prng;
        if (state) {
          if (typeof state == "object")
            copy(state, xg);
          prng.state = function() {
            return copy(xg, {});
          };
        }
        return prng;
      }
      if (module2 && module2.exports) {
        module2.exports = impl;
      } else if (define2 && define2.amd) {
        define2(function() {
          return impl;
        });
      } else {
        this.tychei = impl;
      }
    })(
      exports,
      typeof module == "object" && module,
      // present in node.js
      typeof define == "function" && define
      // present with an AMD loader
    );
  }
});

// ../../node_modules/seedrandom/seedrandom.js
var require_seedrandom = __commonJS({
  "../../node_modules/seedrandom/seedrandom.js"(exports, module) {
    (function(global, pool, math) {
      var width = 256, chunks = 6, digits = 52, rngname = "random", startdenom = math.pow(width, chunks), significance = math.pow(2, digits), overflow = significance * 2, mask = width - 1, nodecrypto;
      function seedrandom2(seed, options, callback) {
        var key = [];
        options = options == true ? { entropy: true } : options || {};
        var shortseed = mixkey(flatten(
          options.entropy ? [seed, tostring(pool)] : seed == null ? autoseed() : seed,
          3
        ), key);
        var arc4 = new ARC4(key);
        var prng = function() {
          var n = arc4.g(chunks), d = startdenom, x = 0;
          while (n < significance) {
            n = (n + x) * width;
            d *= width;
            x = arc4.g(1);
          }
          while (n >= overflow) {
            n /= 2;
            d /= 2;
            x >>>= 1;
          }
          return (n + x) / d;
        };
        prng.int32 = function() {
          return arc4.g(4) | 0;
        };
        prng.quick = function() {
          return arc4.g(4) / 4294967296;
        };
        prng.double = prng;
        mixkey(tostring(arc4.S), pool);
        return (options.pass || callback || function(prng2, seed2, is_math_call, state) {
          if (state) {
            if (state.S) {
              copy(state, arc4);
            }
            prng2.state = function() {
              return copy(arc4, {});
            };
          }
          if (is_math_call) {
            math[rngname] = prng2;
            return seed2;
          } else
            return prng2;
        })(
          prng,
          shortseed,
          "global" in options ? options.global : this == math,
          options.state
        );
      }
      function ARC4(key) {
        var t, keylen = key.length, me = this, i = 0, j = me.i = me.j = 0, s = me.S = [];
        if (!keylen) {
          key = [keylen++];
        }
        while (i < width) {
          s[i] = i++;
        }
        for (i = 0; i < width; i++) {
          s[i] = s[j = mask & j + key[i % keylen] + (t = s[i])];
          s[j] = t;
        }
        (me.g = function(count) {
          var t2, r = 0, i2 = me.i, j2 = me.j, s2 = me.S;
          while (count--) {
            t2 = s2[i2 = mask & i2 + 1];
            r = r * width + s2[mask & (s2[i2] = s2[j2 = mask & j2 + t2]) + (s2[j2] = t2)];
          }
          me.i = i2;
          me.j = j2;
          return r;
        })(width);
      }
      function copy(f, t) {
        t.i = f.i;
        t.j = f.j;
        t.S = f.S.slice();
        return t;
      }
      function flatten(obj, depth) {
        var result = [], typ = typeof obj, prop;
        if (depth && typ == "object") {
          for (prop in obj) {
            try {
              result.push(flatten(obj[prop], depth - 1));
            } catch (e) {
            }
          }
        }
        return result.length ? result : typ == "string" ? obj : obj + "\0";
      }
      function mixkey(seed, key) {
        var stringseed = seed + "", smear, j = 0;
        while (j < stringseed.length) {
          key[mask & j] = mask & (smear ^= key[mask & j] * 19) + stringseed.charCodeAt(j++);
        }
        return tostring(key);
      }
      function autoseed() {
        try {
          var out;
          if (nodecrypto && (out = nodecrypto.randomBytes)) {
            out = out(width);
          } else {
            out = new Uint8Array(width);
            (global.crypto || global.msCrypto).getRandomValues(out);
          }
          return tostring(out);
        } catch (e) {
          var browser = global.navigator, plugins = browser && browser.plugins;
          return [+/* @__PURE__ */ new Date(), global, plugins, global.screen, tostring(pool)];
        }
      }
      function tostring(a) {
        return String.fromCharCode.apply(0, a);
      }
      mixkey(math.random(), pool);
      if (typeof module == "object" && module.exports) {
        module.exports = seedrandom2;
        try {
          nodecrypto = __require("crypto");
        } catch (ex) {
        }
      } else if (typeof define == "function" && define.amd) {
        define(function() {
          return seedrandom2;
        });
      } else {
        math["seed" + rngname] = seedrandom2;
      }
    })(
      // global: `self` in browsers (including strict mode and web workers),
      // otherwise `this` in Node and other environments
      typeof self !== "undefined" ? self : exports,
      [],
      // pool: entropy pool starts empty
      Math
      // math: package containing random, pow, and seedrandom
    );
  }
});

// ../../node_modules/seedrandom/index.js
var require_seedrandom2 = __commonJS({
  "../../node_modules/seedrandom/index.js"(exports, module) {
    var alea = require_alea();
    var xor128 = require_xor128();
    var xorwow = require_xorwow();
    var xorshift7 = require_xorshift7();
    var xor4096 = require_xor4096();
    var tychei = require_tychei();
    var sr = require_seedrandom();
    sr.alea = alea;
    sr.xor128 = xor128;
    sr.xorwow = xorwow;
    sr.xorshift7 = xorshift7;
    sr.xor4096 = xor4096;
    sr.tychei = tychei;
    module.exports = sr;
  }
});

// ../../node_modules/random-words/index.js
var require_random_words = __commonJS({
  "../../node_modules/random-words/index.js"(exports, module) {
    var seedrandom2 = require_seedrandom2();
    var wordList = [
      // Borrowed from xkcd password generator which borrowed it from wherever
      "ability",
      "able",
      "aboard",
      "about",
      "above",
      "accept",
      "accident",
      "according",
      "account",
      "accurate",
      "acres",
      "across",
      "act",
      "action",
      "active",
      "activity",
      "actual",
      "actually",
      "add",
      "addition",
      "additional",
      "adjective",
      "adult",
      "adventure",
      "advice",
      "affect",
      "afraid",
      "after",
      "afternoon",
      "again",
      "against",
      "age",
      "ago",
      "agree",
      "ahead",
      "aid",
      "air",
      "airplane",
      "alike",
      "alive",
      "all",
      "allow",
      "almost",
      "alone",
      "along",
      "aloud",
      "alphabet",
      "already",
      "also",
      "although",
      "am",
      "among",
      "amount",
      "ancient",
      "angle",
      "angry",
      "animal",
      "announced",
      "another",
      "answer",
      "ants",
      "any",
      "anybody",
      "anyone",
      "anything",
      "anyway",
      "anywhere",
      "apart",
      "apartment",
      "appearance",
      "apple",
      "applied",
      "appropriate",
      "are",
      "area",
      "arm",
      "army",
      "around",
      "arrange",
      "arrangement",
      "arrive",
      "arrow",
      "art",
      "article",
      "as",
      "aside",
      "ask",
      "asleep",
      "at",
      "ate",
      "atmosphere",
      "atom",
      "atomic",
      "attached",
      "attack",
      "attempt",
      "attention",
      "audience",
      "author",
      "automobile",
      "available",
      "average",
      "avoid",
      "aware",
      "away",
      "baby",
      "back",
      "bad",
      "badly",
      "bag",
      "balance",
      "ball",
      "balloon",
      "band",
      "bank",
      "bar",
      "bare",
      "bark",
      "barn",
      "base",
      "baseball",
      "basic",
      "basis",
      "basket",
      "bat",
      "battle",
      "be",
      "bean",
      "bear",
      "beat",
      "beautiful",
      "beauty",
      "became",
      "because",
      "become",
      "becoming",
      "bee",
      "been",
      "before",
      "began",
      "beginning",
      "begun",
      "behavior",
      "behind",
      "being",
      "believed",
      "bell",
      "belong",
      "below",
      "belt",
      "bend",
      "beneath",
      "bent",
      "beside",
      "best",
      "bet",
      "better",
      "between",
      "beyond",
      "bicycle",
      "bigger",
      "biggest",
      "bill",
      "birds",
      "birth",
      "birthday",
      "bit",
      "bite",
      "black",
      "blank",
      "blanket",
      "blew",
      "blind",
      "block",
      "blood",
      "blow",
      "blue",
      "board",
      "boat",
      "body",
      "bone",
      "book",
      "border",
      "born",
      "both",
      "bottle",
      "bottom",
      "bound",
      "bow",
      "bowl",
      "box",
      "boy",
      "brain",
      "branch",
      "brass",
      "brave",
      "bread",
      "break",
      "breakfast",
      "breath",
      "breathe",
      "breathing",
      "breeze",
      "brick",
      "bridge",
      "brief",
      "bright",
      "bring",
      "broad",
      "broke",
      "broken",
      "brother",
      "brought",
      "brown",
      "brush",
      "buffalo",
      "build",
      "building",
      "built",
      "buried",
      "burn",
      "burst",
      "bus",
      "bush",
      "business",
      "busy",
      "but",
      "butter",
      "buy",
      "by",
      "cabin",
      "cage",
      "cake",
      "call",
      "calm",
      "came",
      "camera",
      "camp",
      "can",
      "canal",
      "cannot",
      "cap",
      "capital",
      "captain",
      "captured",
      "car",
      "carbon",
      "card",
      "care",
      "careful",
      "carefully",
      "carried",
      "carry",
      "case",
      "cast",
      "castle",
      "cat",
      "catch",
      "cattle",
      "caught",
      "cause",
      "cave",
      "cell",
      "cent",
      "center",
      "central",
      "century",
      "certain",
      "certainly",
      "chain",
      "chair",
      "chamber",
      "chance",
      "change",
      "changing",
      "chapter",
      "character",
      "characteristic",
      "charge",
      "chart",
      "check",
      "cheese",
      "chemical",
      "chest",
      "chicken",
      "chief",
      "child",
      "children",
      "choice",
      "choose",
      "chose",
      "chosen",
      "church",
      "circle",
      "circus",
      "citizen",
      "city",
      "class",
      "classroom",
      "claws",
      "clay",
      "clean",
      "clear",
      "clearly",
      "climate",
      "climb",
      "clock",
      "close",
      "closely",
      "closer",
      "cloth",
      "clothes",
      "clothing",
      "cloud",
      "club",
      "coach",
      "coal",
      "coast",
      "coat",
      "coffee",
      "cold",
      "collect",
      "college",
      "colony",
      "color",
      "column",
      "combination",
      "combine",
      "come",
      "comfortable",
      "coming",
      "command",
      "common",
      "community",
      "company",
      "compare",
      "compass",
      "complete",
      "completely",
      "complex",
      "composed",
      "composition",
      "compound",
      "concerned",
      "condition",
      "congress",
      "connected",
      "consider",
      "consist",
      "consonant",
      "constantly",
      "construction",
      "contain",
      "continent",
      "continued",
      "contrast",
      "control",
      "conversation",
      "cook",
      "cookies",
      "cool",
      "copper",
      "copy",
      "corn",
      "corner",
      "correct",
      "correctly",
      "cost",
      "cotton",
      "could",
      "count",
      "country",
      "couple",
      "courage",
      "course",
      "court",
      "cover",
      "cow",
      "cowboy",
      "crack",
      "cream",
      "create",
      "creature",
      "crew",
      "crop",
      "cross",
      "crowd",
      "cry",
      "cup",
      "curious",
      "current",
      "curve",
      "customs",
      "cut",
      "cutting",
      "daily",
      "damage",
      "dance",
      "danger",
      "dangerous",
      "dark",
      "darkness",
      "date",
      "daughter",
      "dawn",
      "day",
      "dead",
      "deal",
      "dear",
      "death",
      "decide",
      "declared",
      "deep",
      "deeply",
      "deer",
      "definition",
      "degree",
      "depend",
      "depth",
      "describe",
      "desert",
      "design",
      "desk",
      "detail",
      "determine",
      "develop",
      "development",
      "diagram",
      "diameter",
      "did",
      "die",
      "differ",
      "difference",
      "different",
      "difficult",
      "difficulty",
      "dig",
      "dinner",
      "direct",
      "direction",
      "directly",
      "dirt",
      "dirty",
      "disappear",
      "discover",
      "discovery",
      "discuss",
      "discussion",
      "disease",
      "dish",
      "distance",
      "distant",
      "divide",
      "division",
      "do",
      "doctor",
      "does",
      "dog",
      "doing",
      "doll",
      "dollar",
      "done",
      "donkey",
      "door",
      "dot",
      "double",
      "doubt",
      "down",
      "dozen",
      "draw",
      "drawn",
      "dream",
      "dress",
      "drew",
      "dried",
      "drink",
      "drive",
      "driven",
      "driver",
      "driving",
      "drop",
      "dropped",
      "drove",
      "dry",
      "duck",
      "due",
      "dug",
      "dull",
      "during",
      "dust",
      "duty",
      "each",
      "eager",
      "ear",
      "earlier",
      "early",
      "earn",
      "earth",
      "easier",
      "easily",
      "east",
      "easy",
      "eat",
      "eaten",
      "edge",
      "education",
      "effect",
      "effort",
      "egg",
      "eight",
      "either",
      "electric",
      "electricity",
      "element",
      "elephant",
      "eleven",
      "else",
      "empty",
      "end",
      "enemy",
      "energy",
      "engine",
      "engineer",
      "enjoy",
      "enough",
      "enter",
      "entire",
      "entirely",
      "environment",
      "equal",
      "equally",
      "equator",
      "equipment",
      "escape",
      "especially",
      "essential",
      "establish",
      "even",
      "evening",
      "event",
      "eventually",
      "ever",
      "every",
      "everybody",
      "everyone",
      "everything",
      "everywhere",
      "evidence",
      "exact",
      "exactly",
      "examine",
      "example",
      "excellent",
      "except",
      "exchange",
      "excited",
      "excitement",
      "exciting",
      "exclaimed",
      "exercise",
      "exist",
      "expect",
      "experience",
      "experiment",
      "explain",
      "explanation",
      "explore",
      "express",
      "expression",
      "extra",
      "eye",
      "face",
      "facing",
      "fact",
      "factor",
      "factory",
      "failed",
      "fair",
      "fairly",
      "fall",
      "fallen",
      "familiar",
      "family",
      "famous",
      "far",
      "farm",
      "farmer",
      "farther",
      "fast",
      "fastened",
      "faster",
      "fat",
      "father",
      "favorite",
      "fear",
      "feathers",
      "feature",
      "fed",
      "feed",
      "feel",
      "feet",
      "fell",
      "fellow",
      "felt",
      "fence",
      "few",
      "fewer",
      "field",
      "fierce",
      "fifteen",
      "fifth",
      "fifty",
      "fight",
      "fighting",
      "figure",
      "fill",
      "film",
      "final",
      "finally",
      "find",
      "fine",
      "finest",
      "finger",
      "finish",
      "fire",
      "fireplace",
      "firm",
      "first",
      "fish",
      "five",
      "fix",
      "flag",
      "flame",
      "flat",
      "flew",
      "flies",
      "flight",
      "floating",
      "floor",
      "flow",
      "flower",
      "fly",
      "fog",
      "folks",
      "follow",
      "food",
      "foot",
      "football",
      "for",
      "force",
      "foreign",
      "forest",
      "forget",
      "forgot",
      "forgotten",
      "form",
      "former",
      "fort",
      "forth",
      "forty",
      "forward",
      "fought",
      "found",
      "four",
      "fourth",
      "fox",
      "frame",
      "free",
      "freedom",
      "frequently",
      "fresh",
      "friend",
      "friendly",
      "frighten",
      "frog",
      "from",
      "front",
      "frozen",
      "fruit",
      "fuel",
      "full",
      "fully",
      "fun",
      "function",
      "funny",
      "fur",
      "furniture",
      "further",
      "future",
      "gain",
      "game",
      "garage",
      "garden",
      "gas",
      "gasoline",
      "gate",
      "gather",
      "gave",
      "general",
      "generally",
      "gentle",
      "gently",
      "get",
      "getting",
      "giant",
      "gift",
      "girl",
      "give",
      "given",
      "giving",
      "glad",
      "glass",
      "globe",
      "go",
      "goes",
      "gold",
      "golden",
      "gone",
      "good",
      "goose",
      "got",
      "government",
      "grabbed",
      "grade",
      "gradually",
      "grain",
      "grandfather",
      "grandmother",
      "graph",
      "grass",
      "gravity",
      "gray",
      "great",
      "greater",
      "greatest",
      "greatly",
      "green",
      "grew",
      "ground",
      "group",
      "grow",
      "grown",
      "growth",
      "guard",
      "guess",
      "guide",
      "gulf",
      "gun",
      "habit",
      "had",
      "hair",
      "half",
      "halfway",
      "hall",
      "hand",
      "handle",
      "handsome",
      "hang",
      "happen",
      "happened",
      "happily",
      "happy",
      "harbor",
      "hard",
      "harder",
      "hardly",
      "has",
      "hat",
      "have",
      "having",
      "hay",
      "he",
      "headed",
      "heading",
      "health",
      "heard",
      "hearing",
      "heart",
      "heat",
      "heavy",
      "height",
      "held",
      "hello",
      "help",
      "helpful",
      "her",
      "herd",
      "here",
      "herself",
      "hidden",
      "hide",
      "high",
      "higher",
      "highest",
      "highway",
      "hill",
      "him",
      "himself",
      "his",
      "history",
      "hit",
      "hold",
      "hole",
      "hollow",
      "home",
      "honor",
      "hope",
      "horn",
      "horse",
      "hospital",
      "hot",
      "hour",
      "house",
      "how",
      "however",
      "huge",
      "human",
      "hundred",
      "hung",
      "hungry",
      "hunt",
      "hunter",
      "hurried",
      "hurry",
      "hurt",
      "husband",
      "ice",
      "idea",
      "identity",
      "if",
      "ill",
      "image",
      "imagine",
      "immediately",
      "importance",
      "important",
      "impossible",
      "improve",
      "in",
      "inch",
      "include",
      "including",
      "income",
      "increase",
      "indeed",
      "independent",
      "indicate",
      "individual",
      "industrial",
      "industry",
      "influence",
      "information",
      "inside",
      "instance",
      "instant",
      "instead",
      "instrument",
      "interest",
      "interior",
      "into",
      "introduced",
      "invented",
      "involved",
      "iron",
      "is",
      "island",
      "it",
      "its",
      "itself",
      "jack",
      "jar",
      "jet",
      "job",
      "join",
      "joined",
      "journey",
      "joy",
      "judge",
      "jump",
      "jungle",
      "just",
      "keep",
      "kept",
      "key",
      "kids",
      "kill",
      "kind",
      "kitchen",
      "knew",
      "knife",
      "know",
      "knowledge",
      "known",
      "label",
      "labor",
      "lack",
      "lady",
      "laid",
      "lake",
      "lamp",
      "land",
      "language",
      "large",
      "larger",
      "largest",
      "last",
      "late",
      "later",
      "laugh",
      "law",
      "lay",
      "layers",
      "lead",
      "leader",
      "leaf",
      "learn",
      "least",
      "leather",
      "leave",
      "leaving",
      "led",
      "left",
      "leg",
      "length",
      "lesson",
      "let",
      "letter",
      "level",
      "library",
      "lie",
      "life",
      "lift",
      "light",
      "like",
      "likely",
      "limited",
      "line",
      "lion",
      "lips",
      "liquid",
      "list",
      "listen",
      "little",
      "live",
      "living",
      "load",
      "local",
      "locate",
      "location",
      "log",
      "lonely",
      "long",
      "longer",
      "look",
      "loose",
      "lose",
      "loss",
      "lost",
      "lot",
      "loud",
      "love",
      "lovely",
      "low",
      "lower",
      "luck",
      "lucky",
      "lunch",
      "lungs",
      "lying",
      "machine",
      "machinery",
      "mad",
      "made",
      "magic",
      "magnet",
      "mail",
      "main",
      "mainly",
      "major",
      "make",
      "making",
      "man",
      "managed",
      "manner",
      "manufacturing",
      "many",
      "map",
      "mark",
      "market",
      "married",
      "mass",
      "massage",
      "master",
      "material",
      "mathematics",
      "matter",
      "may",
      "maybe",
      "me",
      "meal",
      "mean",
      "means",
      "meant",
      "measure",
      "meat",
      "medicine",
      "meet",
      "melted",
      "member",
      "memory",
      "men",
      "mental",
      "merely",
      "met",
      "metal",
      "method",
      "mice",
      "middle",
      "might",
      "mighty",
      "mile",
      "military",
      "milk",
      "mill",
      "mind",
      "mine",
      "minerals",
      "minute",
      "mirror",
      "missing",
      "mission",
      "mistake",
      "mix",
      "mixture",
      "model",
      "modern",
      "molecular",
      "moment",
      "money",
      "monkey",
      "month",
      "mood",
      "moon",
      "more",
      "morning",
      "most",
      "mostly",
      "mother",
      "motion",
      "motor",
      "mountain",
      "mouse",
      "mouth",
      "move",
      "movement",
      "movie",
      "moving",
      "mud",
      "muscle",
      "music",
      "musical",
      "must",
      "my",
      "myself",
      "mysterious",
      "nails",
      "name",
      "nation",
      "national",
      "native",
      "natural",
      "naturally",
      "nature",
      "near",
      "nearby",
      "nearer",
      "nearest",
      "nearly",
      "necessary",
      "neck",
      "needed",
      "needle",
      "needs",
      "negative",
      "neighbor",
      "neighborhood",
      "nervous",
      "nest",
      "never",
      "new",
      "news",
      "newspaper",
      "next",
      "nice",
      "night",
      "nine",
      "no",
      "nobody",
      "nodded",
      "noise",
      "none",
      "noon",
      "nor",
      "north",
      "nose",
      "not",
      "note",
      "noted",
      "nothing",
      "notice",
      "noun",
      "now",
      "number",
      "numeral",
      "nuts",
      "object",
      "observe",
      "obtain",
      "occasionally",
      "occur",
      "ocean",
      "of",
      "off",
      "offer",
      "office",
      "officer",
      "official",
      "oil",
      "old",
      "older",
      "oldest",
      "on",
      "once",
      "one",
      "only",
      "onto",
      "open",
      "operation",
      "opinion",
      "opportunity",
      "opposite",
      "or",
      "orange",
      "orbit",
      "order",
      "ordinary",
      "organization",
      "organized",
      "origin",
      "original",
      "other",
      "ought",
      "our",
      "ourselves",
      "out",
      "outer",
      "outline",
      "outside",
      "over",
      "own",
      "owner",
      "oxygen",
      "pack",
      "package",
      "page",
      "paid",
      "pain",
      "paint",
      "pair",
      "palace",
      "pale",
      "pan",
      "paper",
      "paragraph",
      "parallel",
      "parent",
      "park",
      "part",
      "particles",
      "particular",
      "particularly",
      "partly",
      "parts",
      "party",
      "pass",
      "passage",
      "past",
      "path",
      "pattern",
      "pay",
      "peace",
      "pen",
      "pencil",
      "people",
      "per",
      "percent",
      "perfect",
      "perfectly",
      "perhaps",
      "period",
      "person",
      "personal",
      "pet",
      "phrase",
      "physical",
      "piano",
      "pick",
      "picture",
      "pictured",
      "pie",
      "piece",
      "pig",
      "pile",
      "pilot",
      "pine",
      "pink",
      "pipe",
      "pitch",
      "place",
      "plain",
      "plan",
      "plane",
      "planet",
      "planned",
      "planning",
      "plant",
      "plastic",
      "plate",
      "plates",
      "play",
      "pleasant",
      "please",
      "pleasure",
      "plenty",
      "plural",
      "plus",
      "pocket",
      "poem",
      "poet",
      "poetry",
      "point",
      "pole",
      "police",
      "policeman",
      "political",
      "pond",
      "pony",
      "pool",
      "poor",
      "popular",
      "population",
      "porch",
      "port",
      "position",
      "positive",
      "possible",
      "possibly",
      "post",
      "pot",
      "potatoes",
      "pound",
      "pour",
      "powder",
      "power",
      "powerful",
      "practical",
      "practice",
      "prepare",
      "present",
      "president",
      "press",
      "pressure",
      "pretty",
      "prevent",
      "previous",
      "price",
      "pride",
      "primitive",
      "principal",
      "principle",
      "printed",
      "private",
      "prize",
      "probably",
      "problem",
      "process",
      "produce",
      "product",
      "production",
      "program",
      "progress",
      "promised",
      "proper",
      "properly",
      "property",
      "protection",
      "proud",
      "prove",
      "provide",
      "public",
      "pull",
      "pupil",
      "pure",
      "purple",
      "purpose",
      "push",
      "put",
      "putting",
      "quarter",
      "queen",
      "question",
      "quick",
      "quickly",
      "quiet",
      "quietly",
      "quite",
      "rabbit",
      "race",
      "radio",
      "railroad",
      "rain",
      "raise",
      "ran",
      "ranch",
      "range",
      "rapidly",
      "rate",
      "rather",
      "raw",
      "rays",
      "reach",
      "read",
      "reader",
      "ready",
      "real",
      "realize",
      "rear",
      "reason",
      "recall",
      "receive",
      "recent",
      "recently",
      "recognize",
      "record",
      "red",
      "refer",
      "refused",
      "region",
      "regular",
      "related",
      "relationship",
      "religious",
      "remain",
      "remarkable",
      "remember",
      "remove",
      "repeat",
      "replace",
      "replied",
      "report",
      "represent",
      "require",
      "research",
      "respect",
      "rest",
      "result",
      "return",
      "review",
      "rhyme",
      "rhythm",
      "rice",
      "rich",
      "ride",
      "riding",
      "right",
      "ring",
      "rise",
      "rising",
      "river",
      "road",
      "roar",
      "rock",
      "rocket",
      "rocky",
      "rod",
      "roll",
      "roof",
      "room",
      "root",
      "rope",
      "rose",
      "rough",
      "round",
      "route",
      "row",
      "rubbed",
      "rubber",
      "rule",
      "ruler",
      "run",
      "running",
      "rush",
      "sad",
      "saddle",
      "safe",
      "safety",
      "said",
      "sail",
      "sale",
      "salmon",
      "salt",
      "same",
      "sand",
      "sang",
      "sat",
      "satellites",
      "satisfied",
      "save",
      "saved",
      "saw",
      "say",
      "scale",
      "scared",
      "scene",
      "school",
      "science",
      "scientific",
      "scientist",
      "score",
      "screen",
      "sea",
      "search",
      "season",
      "seat",
      "second",
      "secret",
      "section",
      "see",
      "seed",
      "seeing",
      "seems",
      "seen",
      "seldom",
      "select",
      "selection",
      "sell",
      "send",
      "sense",
      "sent",
      "sentence",
      "separate",
      "series",
      "serious",
      "serve",
      "service",
      "sets",
      "setting",
      "settle",
      "settlers",
      "seven",
      "several",
      "shade",
      "shadow",
      "shake",
      "shaking",
      "shall",
      "shallow",
      "shape",
      "share",
      "sharp",
      "she",
      "sheep",
      "sheet",
      "shelf",
      "shells",
      "shelter",
      "shine",
      "shinning",
      "ship",
      "shirt",
      "shoe",
      "shoot",
      "shop",
      "shore",
      "short",
      "shorter",
      "shot",
      "should",
      "shoulder",
      "shout",
      "show",
      "shown",
      "shut",
      "sick",
      "sides",
      "sight",
      "sign",
      "signal",
      "silence",
      "silent",
      "silk",
      "silly",
      "silver",
      "similar",
      "simple",
      "simplest",
      "simply",
      "since",
      "sing",
      "single",
      "sink",
      "sister",
      "sit",
      "sitting",
      "situation",
      "six",
      "size",
      "skill",
      "skin",
      "sky",
      "slabs",
      "slave",
      "sleep",
      "slept",
      "slide",
      "slight",
      "slightly",
      "slip",
      "slipped",
      "slope",
      "slow",
      "slowly",
      "small",
      "smaller",
      "smallest",
      "smell",
      "smile",
      "smoke",
      "smooth",
      "snake",
      "snow",
      "so",
      "soap",
      "social",
      "society",
      "soft",
      "softly",
      "soil",
      "solar",
      "sold",
      "soldier",
      "solid",
      "solution",
      "solve",
      "some",
      "somebody",
      "somehow",
      "someone",
      "something",
      "sometime",
      "somewhere",
      "son",
      "song",
      "soon",
      "sort",
      "sound",
      "source",
      "south",
      "southern",
      "space",
      "speak",
      "special",
      "species",
      "specific",
      "speech",
      "speed",
      "spell",
      "spend",
      "spent",
      "spider",
      "spin",
      "spirit",
      "spite",
      "split",
      "spoken",
      "sport",
      "spread",
      "spring",
      "square",
      "stage",
      "stairs",
      "stand",
      "standard",
      "star",
      "stared",
      "start",
      "state",
      "statement",
      "station",
      "stay",
      "steady",
      "steam",
      "steel",
      "steep",
      "stems",
      "step",
      "stepped",
      "stick",
      "stiff",
      "still",
      "stock",
      "stomach",
      "stone",
      "stood",
      "stop",
      "stopped",
      "store",
      "storm",
      "story",
      "stove",
      "straight",
      "strange",
      "stranger",
      "straw",
      "stream",
      "street",
      "strength",
      "stretch",
      "strike",
      "string",
      "strip",
      "strong",
      "stronger",
      "struck",
      "structure",
      "struggle",
      "stuck",
      "student",
      "studied",
      "studying",
      "subject",
      "substance",
      "success",
      "successful",
      "such",
      "sudden",
      "suddenly",
      "sugar",
      "suggest",
      "suit",
      "sum",
      "summer",
      "sun",
      "sunlight",
      "supper",
      "supply",
      "support",
      "suppose",
      "sure",
      "surface",
      "surprise",
      "surrounded",
      "swam",
      "sweet",
      "swept",
      "swim",
      "swimming",
      "swing",
      "swung",
      "syllable",
      "symbol",
      "system",
      "table",
      "tail",
      "take",
      "taken",
      "tales",
      "talk",
      "tall",
      "tank",
      "tape",
      "task",
      "taste",
      "taught",
      "tax",
      "tea",
      "teach",
      "teacher",
      "team",
      "tears",
      "teeth",
      "telephone",
      "television",
      "tell",
      "temperature",
      "ten",
      "tent",
      "term",
      "terrible",
      "test",
      "than",
      "thank",
      "that",
      "thee",
      "them",
      "themselves",
      "then",
      "theory",
      "there",
      "therefore",
      "these",
      "they",
      "thick",
      "thin",
      "thing",
      "think",
      "third",
      "thirty",
      "this",
      "those",
      "thou",
      "though",
      "thought",
      "thousand",
      "thread",
      "three",
      "threw",
      "throat",
      "through",
      "throughout",
      "throw",
      "thrown",
      "thumb",
      "thus",
      "thy",
      "tide",
      "tie",
      "tight",
      "tightly",
      "till",
      "time",
      "tin",
      "tiny",
      "tip",
      "tired",
      "title",
      "to",
      "tobacco",
      "today",
      "together",
      "told",
      "tomorrow",
      "tone",
      "tongue",
      "tonight",
      "too",
      "took",
      "tool",
      "top",
      "topic",
      "torn",
      "total",
      "touch",
      "toward",
      "tower",
      "town",
      "toy",
      "trace",
      "track",
      "trade",
      "traffic",
      "trail",
      "train",
      "transportation",
      "trap",
      "travel",
      "treated",
      "tree",
      "triangle",
      "tribe",
      "trick",
      "tried",
      "trip",
      "troops",
      "tropical",
      "trouble",
      "truck",
      "trunk",
      "truth",
      "try",
      "tube",
      "tune",
      "turn",
      "twelve",
      "twenty",
      "twice",
      "two",
      "type",
      "typical",
      "uncle",
      "under",
      "underline",
      "understanding",
      "unhappy",
      "union",
      "unit",
      "universe",
      "unknown",
      "unless",
      "until",
      "unusual",
      "up",
      "upon",
      "upper",
      "upward",
      "us",
      "use",
      "useful",
      "using",
      "usual",
      "usually",
      "valley",
      "valuable",
      "value",
      "vapor",
      "variety",
      "various",
      "vast",
      "vegetable",
      "verb",
      "vertical",
      "very",
      "vessels",
      "victory",
      "view",
      "village",
      "visit",
      "visitor",
      "voice",
      "volume",
      "vote",
      "vowel",
      "voyage",
      "wagon",
      "wait",
      "walk",
      "wall",
      "want",
      "war",
      "warm",
      "warn",
      "was",
      "wash",
      "waste",
      "watch",
      "water",
      "wave",
      "way",
      "we",
      "weak",
      "wealth",
      "wear",
      "weather",
      "week",
      "weigh",
      "weight",
      "welcome",
      "well",
      "went",
      "were",
      "west",
      "western",
      "wet",
      "whale",
      "what",
      "whatever",
      "wheat",
      "wheel",
      "when",
      "whenever",
      "where",
      "wherever",
      "whether",
      "which",
      "while",
      "whispered",
      "whistle",
      "white",
      "who",
      "whole",
      "whom",
      "whose",
      "why",
      "wide",
      "widely",
      "wife",
      "wild",
      "will",
      "willing",
      "win",
      "wind",
      "window",
      "wing",
      "winter",
      "wire",
      "wise",
      "wish",
      "with",
      "within",
      "without",
      "wolf",
      "women",
      "won",
      "wonder",
      "wonderful",
      "wood",
      "wooden",
      "wool",
      "word",
      "wore",
      "work",
      "worker",
      "world",
      "worried",
      "worry",
      "worse",
      "worth",
      "would",
      "wrapped",
      "write",
      "writer",
      "writing",
      "written",
      "wrong",
      "wrote",
      "yard",
      "year",
      "yellow",
      "yes",
      "yesterday",
      "yet",
      "you",
      "young",
      "younger",
      "your",
      "yourself",
      "youth",
      "zero",
      "zebra",
      "zipper",
      "zoo",
      "zulu"
    ];
    function words(options) {
      const random = (options == null ? void 0 : options.seed) ? new seedrandom2(options.seed) : null;
      function word() {
        if (options && options.maxLength > 1) {
          return generateWordWithMaxLength();
        } else {
          return generateRandomWord();
        }
      }
      function generateWordWithMaxLength() {
        var rightSize = false;
        var wordUsed;
        while (!rightSize) {
          wordUsed = generateRandomWord();
          if (wordUsed.length <= options.maxLength) {
            rightSize = true;
          }
        }
        return wordUsed;
      }
      function generateRandomWord() {
        return wordList[randInt(wordList.length)];
      }
      function randInt(lessThan) {
        const r = random ? random() : Math.random();
        return Math.floor(r * lessThan);
      }
      if (typeof options === "undefined") {
        return word();
      }
      if (typeof options === "number") {
        options = { exactly: options };
      }
      if (options.exactly) {
        options.min = options.exactly;
        options.max = options.exactly;
      }
      if (typeof options.wordsPerString !== "number") {
        options.wordsPerString = 1;
      }
      if (typeof options.formatter !== "function") {
        options.formatter = (word2) => word2;
      }
      if (typeof options.separator !== "string") {
        options.separator = " ";
      }
      var total = options.min + randInt(options.max + 1 - options.min);
      var results = [];
      var token = "";
      var relativeIndex = 0;
      for (var i = 0; i < total * options.wordsPerString; i++) {
        if (relativeIndex === options.wordsPerString - 1) {
          token += options.formatter(word(), relativeIndex);
        } else {
          token += options.formatter(word(), relativeIndex) + options.separator;
        }
        relativeIndex++;
        if ((i + 1) % options.wordsPerString === 0) {
          results.push(token);
          token = "";
          relativeIndex = 0;
        }
      }
      if (typeof options.join === "string") {
        results = results.join(options.join);
      }
      return results;
    }
    module.exports = words;
    words.wordList = wordList;
  }
});

// ../../node_modules/jspsych/dist/index.js
__toESM(require_auto_bind(), 1);
__toESM(require_random_words(), 1);
__toESM(require_alea(), 1);
var ParameterType = /* @__PURE__ */ ((ParameterType2) => {
  ParameterType2[ParameterType2["BOOL"] = 0] = "BOOL";
  ParameterType2[ParameterType2["STRING"] = 1] = "STRING";
  ParameterType2[ParameterType2["INT"] = 2] = "INT";
  ParameterType2[ParameterType2["FLOAT"] = 3] = "FLOAT";
  ParameterType2[ParameterType2["FUNCTION"] = 4] = "FUNCTION";
  ParameterType2[ParameterType2["KEY"] = 5] = "KEY";
  ParameterType2[ParameterType2["KEYS"] = 6] = "KEYS";
  ParameterType2[ParameterType2["SELECT"] = 7] = "SELECT";
  ParameterType2[ParameterType2["HTML_STRING"] = 8] = "HTML_STRING";
  ParameterType2[ParameterType2["IMAGE"] = 9] = "IMAGE";
  ParameterType2[ParameterType2["AUDIO"] = 10] = "AUDIO";
  ParameterType2[ParameterType2["VIDEO"] = 11] = "VIDEO";
  ParameterType2[ParameterType2["OBJECT"] = 12] = "OBJECT";
  ParameterType2[ParameterType2["COMPLEX"] = 13] = "COMPLEX";
  ParameterType2[ParameterType2["TIMELINE"] = 14] = "TIMELINE";
  return ParameterType2;
})(ParameterType || {});
[
  ParameterType.AUDIO,
  ParameterType.IMAGE,
  ParameterType.VIDEO
];
var MigrationError = class extends Error {
  constructor(message = "The global `jsPsych` variable is no longer available in jsPsych v7.") {
    super(
      `${message} Please follow the migration guide at https://www.jspsych.org/7.0/support/migration-v7/ to update your experiment.`
    );
    this.name = "MigrationError";
  }
};
window.jsPsych = {
  get init() {
    throw new MigrationError("`jsPsych.init()` was replaced by `initJsPsych()` in jsPsych v7.");
  },
  get data() {
    throw new MigrationError();
  },
  get randomization() {
    throw new MigrationError();
  },
  get turk() {
    throw new MigrationError();
  },
  get pluginAPI() {
    throw new MigrationError();
  },
  get ALL_KEYS() {
    throw new MigrationError(
      'jsPsych.ALL_KEYS was replaced by the "ALL_KEYS" string in jsPsych v7.'
    );
  },
  get NO_KEYS() {
    throw new MigrationError('jsPsych.NO_KEYS was replaced by the "NO_KEYS" string in jsPsych v7.');
  }
};
if (typeof window !== "undefined" && window.hasOwnProperty("webkitAudioContext") && !window.hasOwnProperty("AudioContext")) {
  window.AudioContext = webkitAudioContext;
}

// ../../node_modules/@jspsych/plugin-spatial-nback-ts/dist/index.js
var version = "0.0.1";
var info = {
  name: "plugin-spatial-nback-ts",
  version,
  parameters: {
    /** Number of rows in the spatial grid */
    rows: {
      type: ParameterType.INT,
      default: 3
    },
    /** Number of columns in the spatial grid */
    cols: {
      type: ParameterType.INT,
      default: 3
    },
    /** Size of each cell in pixels, this will affect size of whole grid also */
    cell_size: {
      type: ParameterType.INT,
      default: 100
    },
    /** Row position of the stimulus (0-indexed) */
    stimulus_row: {
      type: ParameterType.INT,
      default: 0
    },
    /** Column position of the stimulus (0-indexed) */
    stimulus_col: {
      type: ParameterType.INT,
      default: 0
    },
    /** Whether this trial is a target trial */
    is_target: {
      type: ParameterType.BOOL,
      default: false
    },
    /** Duration the stimulus is displayed (ms) */
    stimulus_duration: {
      type: ParameterType.INT,
      default: 500
    },
    /** Inter-stimulus interval (ms) */
    // I recommend using feedback_duration as ISI if you have any type of feedback showing
    isi_duration: {
      type: ParameterType.INT,
      default: 1e3
    },
    /** Duration of feedback display (ms) */
    feedback_duration: {
      type: ParameterType.INT,
      default: 500
    },
    /** Whether to show feedback "Incorrect! (231ms)" after response */
    show_feedback_time: {
      type: ParameterType.BOOL,
      default: true
    },
    /** Whether to show feedback border around the grid */
    show_feedback_border: {
      type: ParameterType.BOOL,
      default: true
    },
    /** Whether to show feedback when there is no response */
    showFeedbackNoResponse: {
      type: ParameterType.BOOL,
      default: true
    },
    /** Whether to wait for feedback duration before ending trial when no response */
    /** if using feedback_duration as interstimulus response, keep this true */
    feedbackWaitNoResponse: {
      type: ParameterType.BOOL,
      default: true
    },
    /** Text for the response button */
    button_text: {
      type: ParameterType.STRING,
      default: ""
    },
    /** Color of the stimulus square */
    stimulus_color: {
      type: ParameterType.STRING,
      default: "#0066cc"
    },
    /** Color of correct feedback border */
    correct_color: {
      type: ParameterType.STRING,
      default: "#00cc00"
    },
    /** Color of incorrect feedback border */
    incorrect_color: {
      type: ParameterType.STRING,
      default: "#cc0000"
    },
    /** Instructions to display above the grid */
    instructions: {
      type: ParameterType.STRING,
      default: "Click MATCH when this is a target trial."
    }
  },
  data: {
    /** Row position of the stimulus */
    stimulus_row: {
      type: ParameterType.INT
    },
    /** Column position of the stimulus */
    stimulus_col: {
      type: ParameterType.INT
    },
    /** Whether this trial was a target */
    is_target: {
      type: ParameterType.BOOL
    },
    /** Whether participant responded */
    response: {
      type: ParameterType.BOOL
    },
    /** Response time in milliseconds */
    response_time: {
      type: ParameterType.INT
    },
    /** Whether the response was correct */
    correct: {
      type: ParameterType.BOOL
    }
  },
  citations: {
    "apa": "A. Hunter Farhat A. Hunter Farhat, A. H. F. (2023). {title}. Journal for Open Source Software, 1(1), 1. https://doi.org/10.21105/joss.12345 ",
    "bibtex": "@article{Hunter2023title, 	author = {A. Hunter Farhat A. Hunter Farhat, A. Hunter Farhat}, 	journal = {Journal for Open Source Software}, 	doi = {10.21105/joss.12345}, 	issn = {1234-5678}, 	number = {1}, 	year = {2023}, 	month = {may 11}, 	pages = {1}, 	publisher = {Open Journals}, 	title = {\\textbraceleft{}title\\textbraceright{}}, 	url = {{linkToPublicationInJournal}}, 	volume = {1}, }  "
  }
};
var _SpatialNbackTsPlugin = class {
  constructor(jsPsych) {
    this.jsPsych = jsPsych;
  }
  trial(display_element, trial) {
    var _a, _b;
    let trial_start_time;
    let response_allowed = false;
    let response_given = false;
    let stimulus_timeout;
    let isi_timeout;
    let stimulus_hidden = false;
    const stimulus_row = (_a = trial.stimulus_row) != null ? _a : Math.floor(Math.random() * trial.rows);
    const stimulus_col = (_b = trial.stimulus_col) != null ? _b : Math.floor(Math.random() * trial.cols);
    const createDisplay = () => {
      let html = `
        <div id="nback-container" style="
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100vw;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-family: Arial, sans-serif;
          box-sizing: border-box;
          padding: 20px;
        ">`;
      html += `<div id="nback-instructions" style="
        position: absolute;
        top: 15vh;
        left: 50%;
        transform: translateX(-50%);
        width: 80%;
        max-width: 520px;
        text-align: center;
        font-size: clamp(14px, 2vmin, 18px);
        z-index: 10;
      ">${trial.instructions}</div>`;
      const grid_size = Math.min(50, 80 / Math.max(trial.rows, trial.cols));
      const cell_size = `${grid_size / Math.max(trial.rows, trial.cols)}vmin`;
      html += `<div id="nback-grid" style="
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border: 2px solid #000;
        box-sizing: border-box;
        display: inline-block;
        z-index: 5;
      ">`;
      for (let row = 0; row < trial.rows; row++) {
        html += '<div style="display: flex;">';
        for (let col = 0; col < trial.cols; col++) {
          html += `<div id="cell-${row}-${col}" style="
            width: ${cell_size};
            height: ${cell_size};
            border: 1px solid #ccc;
            background-color: white;
            box-sizing: border-box;
            min-width: ${Math.max(40, trial.cell_size * 0.5)}px;
            min-height: ${Math.max(40, trial.cell_size * 0.5)}px;
          "></div>`;
        }
        html += "</div>";
      }
      html += "</div>";
      html += `<div id="nback-button-container" style="
        position: absolute;
        bottom: 15vh;
        left: 50%;
        transform: translateX(-50%);
        z-index: 10;
      ">`;
      html += `<button id="nback-response-btn" style="
        font-size: clamp(18px, 3vmin, 26px);
        padding: clamp(18px, 2.5vmin, 30px) clamp(35px, 5vmin, 60px);
        background-color: #2196F3;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-weight: bold;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        transition: all 0.2s;
      " disabled>${trial.button_text}</button>`;
      html += "</div>";
      html += `<div id="nback-feedback" style="
        position: absolute;
        bottom: 8vh;
        left: 50%;
        transform: translateX(-50%);
        height: 40px;
        font-size: clamp(14px, 2vmin, 20px);
        font-weight: bold;
        text-align: center;
        z-index: 10;
        width: 80%;
      "></div>`;
      html += "</div>";
      display_element.innerHTML = html;
      const button = document.getElementById("nback-response-btn");
      button.addEventListener("mouseenter", () => {
        if (!button.disabled) {
          button.style.backgroundColor = "#1976D2";
          button.style.transform = "translateY(-2px)";
        }
      });
      button.addEventListener("mouseleave", () => {
        button.style.backgroundColor = "#2196F3";
        button.style.transform = "translateY(0)";
      });
      button.addEventListener("click", handleResponse);
    };
    const startTrial = () => {
      const cell = document.getElementById(`cell-${stimulus_row}-${stimulus_col}`);
      cell.style.backgroundColor = trial.stimulus_color;
      response_allowed = true;
      trial_start_time = performance.now();
      stimulus_hidden = false;
      const responseButton = document.getElementById("nback-response-btn");
      responseButton.disabled = false;
      stimulus_timeout = window.setTimeout(() => {
        cell.style.backgroundColor = "white";
        stimulus_hidden = true;
        isi_timeout = window.setTimeout(() => {
          if (response_allowed && !response_given) {
            handleNoResponse();
          }
        }, trial.isi_duration);
      }, trial.stimulus_duration);
    };
    const handleResponse = () => {
      if (!response_allowed || response_given)
        return;
      response_allowed = false;
      response_given = true;
      const response_time = performance.now() - trial_start_time;
      const is_correct = trial.is_target;
      clearTimeout(stimulus_timeout);
      clearTimeout(isi_timeout);
      showFeedback(is_correct, response_time, true);
    };
    const handleNoResponse = () => {
      if (!response_allowed || response_given)
        return;
      response_allowed = false;
      response_given = true;
      const is_correct = !trial.is_target;
      showFeedback(is_correct, null, false);
    };
    const showFeedback = (is_correct, response_time, made_response) => {
      if (!trial.show_feedback_time && !trial.show_feedback_border) {
        if (made_response && !stimulus_hidden) {
          const elapsed_time = performance.now() - trial_start_time;
          const remaining_stimulus_time = Math.max(0, trial.stimulus_duration - elapsed_time);
          const feedback_wait_time = remaining_stimulus_time + trial.feedback_duration;
          setTimeout(() => {
            const cell = document.getElementById(`cell-${stimulus_row}-${stimulus_col}`);
            cell.style.backgroundColor = "white";
            setTimeout(() => {
              endTrial(is_correct, response_time, made_response);
            }, trial.isi_duration);
          }, feedback_wait_time);
        } else {
          endTrial(is_correct, response_time, made_response);
        }
        return;
      }
      const button = document.getElementById("nback-response-btn");
      button.disabled = true;
      button.style.opacity = "0.6";
      let total_feedback_duration;
      if (made_response && !stimulus_hidden) {
        const elapsed_time = performance.now() - trial_start_time;
        const remaining_stimulus_time = Math.max(0, trial.stimulus_duration - elapsed_time);
        total_feedback_duration = remaining_stimulus_time + trial.feedback_duration;
      } else if (made_response && stimulus_hidden) {
        const elapsed_time = performance.now() - trial_start_time;
        const isi_start_time = trial.stimulus_duration;
        const elapsed_isi_time = elapsed_time - isi_start_time;
        const remaining_isi_time = Math.max(0, trial.isi_duration - elapsed_isi_time);
        total_feedback_duration = remaining_isi_time + trial.feedback_duration;
      } else {
        if (trial.feedbackWaitNoResponse) {
          total_feedback_duration = trial.feedback_duration;
        } else {
          endTrial(is_correct, response_time, made_response);
          return;
        }
      }
      if (response_time === null && !trial.showFeedbackNoResponse) {
        if (trial.feedbackWaitNoResponse) {
          setTimeout(() => {
            endTrial(is_correct, response_time, made_response);
          }, total_feedback_duration);
        } else {
          endTrial(is_correct, response_time, made_response);
        }
        return;
      }
      const grid = document.getElementById("nback-grid");
      const feedback_div = document.getElementById("nback-feedback");
      const stimulus_cell = document.getElementById(`cell-${stimulus_row}-${stimulus_col}`);
      if (trial.show_feedback_border) {
        grid.style.border = `6px solid ${is_correct ? trial.correct_color : trial.incorrect_color}`;
      }
      if (trial.show_feedback_time) {
        let feedback_text = is_correct ? "Correct!" : "Incorrect!";
        if (response_time !== null) {
          feedback_text += ` (${Math.round(response_time)}ms)`;
        }
        feedback_div.textContent = feedback_text;
        feedback_div.style.color = is_correct ? trial.correct_color : trial.incorrect_color;
      }
      if (made_response && !stimulus_hidden) {
        const elapsed_time = performance.now() - trial_start_time;
        const remaining_stimulus_time = Math.max(0, trial.stimulus_duration - elapsed_time);
        setTimeout(() => {
          stimulus_cell.style.backgroundColor = "white";
          setTimeout(() => {
            endTrial(is_correct, response_time, made_response);
          }, trial.feedback_duration + trial.isi_duration);
        }, remaining_stimulus_time);
      } else if (made_response && stimulus_hidden) {
        const elapsed_time = performance.now() - trial_start_time;
        const isi_start_time = trial.stimulus_duration;
        const elapsed_isi_time = elapsed_time - isi_start_time;
        const remaining_isi_time = Math.max(0, trial.isi_duration - elapsed_isi_time);
        setTimeout(() => {
          endTrial(is_correct, response_time, made_response);
        }, remaining_isi_time + trial.feedback_duration);
      } else {
        setTimeout(() => {
          endTrial(is_correct, response_time, made_response);
        }, total_feedback_duration);
      }
    };
    const endTrial = (is_correct, response_time, made_response) => {
      const trial_data = {
        stimulus_row,
        stimulus_col,
        is_target: trial.is_target,
        response: made_response,
        response_time,
        correct: is_correct
      };
      display_element.innerHTML = "";
      this.jsPsych.finishTrial(trial_data);
    };
    createDisplay();
    startTrial();
  }
};
var SpatialNbackTsPlugin = _SpatialNbackTsPlugin;
(() => {
  _SpatialNbackTsPlugin.info = info;
})();
var task_instructions = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
        <div style="text-align: center; font-size: clamp(16px, 4vw, 20px); line-height: 1.5; padding: 10px; max-width: 90vw; margin: 0 auto;">
            <h2 style="font-size: clamp(20px, 5vw, 28px); margin-bottom: 20px;">Spatial N-Back Task</h2>
            <p style="margin-bottom: 15px;">In this task, you will see a grid with blue squares appearing in different positions.</p>
            <p style="margin-bottom: 15px;">Your job is to click the MATCH button whenever the current position is the same as the position from <strong>1 trial ago</strong>.</p>
            <p style="margin-bottom: 15px;">Try to respond as quickly and accurately as possible.</p>
            <p style="font-weight: bold; color: #2196F3;">Click the button below to begin the task.</p>
        </div>
    `,
  choices: ["Continue"]
};
function generateNBackSequence(total_trials, n_back_level, target_percentage, rows, cols) {
  const positions = [];
  const is_target = [];
  for (let i = 0; i < n_back_level; i++) {
    positions.push({
      row: Math.floor(Math.random() * rows),
      col: Math.floor(Math.random() * cols)
    });
    is_target.push(false);
  }
  const n_targets = Math.round(target_percentage / 100 * (total_trials - n_back_level));
  let targets_placed = 0;
  for (let i = n_back_level; i < total_trials; i++) {
    const can_be_target = targets_placed < n_targets;
    const should_be_target = can_be_target && Math.random() < 0.5;
    if (should_be_target) {
      positions.push({
        row: positions[i - n_back_level].row,
        col: positions[i - n_back_level].col
      });
      is_target.push(true);
      targets_placed++;
    } else {
      let new_position;
      do {
        new_position = {
          row: Math.floor(Math.random() * rows),
          col: Math.floor(Math.random() * cols)
        };
      } while (new_position.row === positions[i - n_back_level].row && new_position.col === positions[i - n_back_level].col);
      positions.push(new_position);
      is_target.push(false);
    }
  }
  return { positions, is_target };
}
function createSpatialNBackTimeline({
  rows = 3,
  cols = 3,
  n_back_level = 1,
  total_trials = 20,
  target_percentage = 25,
  stimulus_duration = 750,
  isi_duration = 250,
  feedback_duration = 1e3,
  show_feedback = false,
  show_feedback_border = false,
  showFeedbackNoResponse = false,
  feedbackWaitNoResponse = true,
  cell_size = 150,
  instructions_template = "Click the button when the position matches the one from {n} trial(s) ago",
  button_text = "MATCH",
  stimulus_color = "#2196F3",
  correct_color = "#4CAF50",
  incorrect_color = "#F44336",
  include_instructions = false,
  randomize_trials = false
} = {}) {
  const sequence = generateNBackSequence(total_trials, n_back_level, target_percentage, rows, cols);
  const trials = [];
  for (let i = 0; i < total_trials; i++) {
    const trial_instructions = instructions_template.replace("{n}", n_back_level.toString()).replace("{trial}", (i + 1).toString()).replace("{total}", total_trials.toString());
    trials.push({
      type: SpatialNbackTsPlugin,
      rows,
      cols,
      stimulus_row: sequence.positions[i].row,
      stimulus_col: sequence.positions[i].col,
      is_target: sequence.is_target[i],
      stimulus_duration,
      isi_duration,
      feedback_duration,
      show_feedback,
      show_feedback_border,
      showFeedbackNoResponse,
      feedbackWaitNoResponse,
      cell_size,
      instructions: trial_instructions,
      button_text,
      stimulus_color,
      correct_color,
      incorrect_color,
      data: {
        trial_number: i + 1,
        n_back_level,
        total_trials,
        task: "spatial-nback"
      }
    });
  }
  const task_timeline = {
    timeline: trials,
    randomize_order: randomize_trials
  };
  if (include_instructions) {
    const custom_instructions = __spreadProps(__spreadValues({}, task_instructions), {
      stimulus: task_instructions.stimulus.replace(
        "<strong>1 trial ago</strong>",
        `<strong>${n_back_level} trial${n_back_level > 1 ? "s" : ""} ago</strong>`
      )
    });
    return {
      timeline: [custom_instructions, task_timeline]
    };
  } else {
    return task_timeline;
  }
}
function createPracticeTimeline(options = {}) {
  return createSpatialNBackTimeline(__spreadProps(__spreadValues({}, options), {
    total_trials: 6,
    target_percentage: 33,
    show_feedback: true,
    show_feedback_border: true,
    include_instructions: true
  }));
}
function createMultiLevelNBackTimeline(_a = {}) {
  var _b = _a, {
    n_back_levels = [1, 2],
    trials_per_level = 20,
    randomize_levels = false
  } = _b, sharedOptions = __objRest(_b, [
    "n_back_levels",
    "trials_per_level",
    "randomize_levels"
  ]);
  const level_timelines = n_back_levels.map((level) => {
    return createSpatialNBackTimeline(__spreadProps(__spreadValues({}, sharedOptions), {
      n_back_level: level,
      total_trials: trials_per_level,
      include_instructions: false
    }));
  });
  return {
    timeline: level_timelines,
    randomize_order: randomize_levels
  };
}
var presetConfigurations = {
  easy: () => createSpatialNBackTimeline({
    n_back_level: 1,
    total_trials: 20,
    target_percentage: 30,
    show_feedback: true
  }),
  medium: () => createSpatialNBackTimeline({
    n_back_level: 2,
    total_trials: 30,
    target_percentage: 25,
    show_feedback: false
  }),
  hard: () => createSpatialNBackTimeline({
    n_back_level: 3,
    total_trials: 40,
    target_percentage: 20,
    show_feedback: false,
    rows: 4,
    cols: 4
  }),
  research: () => createMultiLevelNBackTimeline({
    n_back_levels: [1, 2, 3],
    trials_per_level: 50,
    target_percentage: 25,
    show_feedback: false,
    randomize_levels: true
  })
};
var src_default = createSpatialNBackTimeline;
var timelineUnits = {
  createPracticeTimeline,
  createSpatialNBackTimeline,
  createMultiLevelNBackTimeline
};
var utils = {
  presetConfigurations,
  generateNBackSequence,
  task_instructions
};

export { createMultiLevelNBackTimeline, createPracticeTimeline, createSpatialNBackTimeline, src_default as default, generateNBackSequence, presetConfigurations, task_instructions, timelineUnits, utils };
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.js.map