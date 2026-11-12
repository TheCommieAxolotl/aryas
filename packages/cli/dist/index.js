#!/usr/bin/env node
import { stdin as e, stdout as t } from "node:process";
import { createInterface as n } from "node:readline/promises";
import { createHash as r } from "node:crypto";
import { readFile as i } from "node:fs/promises";
import { basename as a } from "node:path";
//#region \0rolldown/runtime.js
var o = Object.create, s = Object.defineProperty, c = Object.getOwnPropertyDescriptor, l = Object.getOwnPropertyNames, u = Object.getPrototypeOf, d = Object.prototype.hasOwnProperty, f = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), p = (e, t, n, r) => {
	if (t && typeof t == "object" || typeof t == "function") for (var i = l(t), a = 0, o = i.length, u; a < o; a++) u = i[a], !d.call(e, u) && u !== n && s(e, u, {
		get: ((e) => t[e]).bind(null, u),
		enumerable: !(r = c(t, u)) || r.enumerable
	});
	return e;
}, m = (e, t, n) => (n = e == null ? {} : o(u(e)), p(t || !e || !e.__esModule || !d.call(e, "default") ? s(n, "default", {
	value: e,
	enumerable: !0
}) : n, e));
//#endregion
//#region ../../node_modules/.pnpm/universal-user-agent@7.0.3/node_modules/universal-user-agent/index.js
function h() {
	return typeof navigator == "object" && "userAgent" in navigator ? navigator.userAgent : typeof process == "object" && process.version !== void 0 ? `Node.js/${process.version.substr(1)} (${process.platform}; ${process.arch})` : "<environment undetectable>";
}
//#endregion
//#region ../../node_modules/.pnpm/before-after-hook@4.0.0/node_modules/before-after-hook/lib/register.js
function g(e, t, n, r) {
	if (typeof n != "function") throw Error("method for before hook must be a function");
	return r ||= {}, Array.isArray(t) ? t.reverse().reduce((t, n) => g.bind(null, e, n, t, r), n)() : Promise.resolve().then(() => e.registry[t] ? e.registry[t].reduce((e, t) => t.hook.bind(null, e, r), n)() : n(r));
}
//#endregion
//#region ../../node_modules/.pnpm/before-after-hook@4.0.0/node_modules/before-after-hook/lib/add.js
function _(e, t, n, r) {
	let i = r;
	e.registry[n] || (e.registry[n] = []), t === "before" && (r = (e, t) => Promise.resolve().then(i.bind(null, t)).then(e.bind(null, t))), t === "after" && (r = (e, t) => {
		let n;
		return Promise.resolve().then(e.bind(null, t)).then((e) => (n = e, i(n, t))).then(() => n);
	}), t === "error" && (r = (e, t) => Promise.resolve().then(e.bind(null, t)).catch((e) => i(e, t))), e.registry[n].push({
		hook: r,
		orig: i
	});
}
//#endregion
//#region ../../node_modules/.pnpm/before-after-hook@4.0.0/node_modules/before-after-hook/lib/remove.js
function v(e, t, n) {
	if (!e.registry[t]) return;
	let r = e.registry[t].map((e) => e.orig).indexOf(n);
	r !== -1 && e.registry[t].splice(r, 1);
}
//#endregion
//#region ../../node_modules/.pnpm/before-after-hook@4.0.0/node_modules/before-after-hook/index.js
var y = Function.bind, b = y.bind(y);
function x(e, t, n) {
	let r = b(v, null).apply(null, n ? [t, n] : [t]);
	e.api = { remove: r }, e.remove = r, [
		"before",
		"error",
		"after",
		"wrap"
	].forEach((r) => {
		let i = n ? [
			t,
			r,
			n
		] : [t, r];
		e[r] = e.api[r] = b(_, null).apply(null, i);
	});
}
function ee() {
	let e = Symbol("Singular"), t = { registry: {} }, n = g.bind(null, t, e);
	return x(n, t, e), n;
}
function te() {
	let e = { registry: {} }, t = g.bind(null, e);
	return x(t, e), t;
}
var ne = {
	Singular: ee,
	Collection: te
}, re = {
	method: "GET",
	baseUrl: "https://api.github.com",
	headers: {
		accept: "application/vnd.github.v3+json",
		"user-agent": `octokit-endpoint.js/0.0.0-development ${h()}`
	},
	mediaType: { format: "" }
};
function ie(e) {
	return e ? Object.keys(e).reduce((t, n) => (t[n.toLowerCase()] = e[n], t), {}) : {};
}
function ae(e) {
	if (typeof e != "object" || !e || Object.prototype.toString.call(e) !== "[object Object]") return !1;
	let t = Object.getPrototypeOf(e);
	if (t === null) return !0;
	let n = Object.prototype.hasOwnProperty.call(t, "constructor") && t.constructor;
	return typeof n == "function" && n instanceof n && Function.prototype.call(n) === Function.prototype.call(e);
}
function S(e, t) {
	let n = Object.assign({}, e);
	return Object.keys(t).forEach((r) => {
		ae(t[r]) && r in e ? n[r] = S(e[r], t[r]) : Object.assign(n, { [r]: t[r] });
	}), n;
}
function oe(e) {
	for (let t in e) e[t] === void 0 && delete e[t];
	return e;
}
function C(e, t, n) {
	if (typeof t == "string") {
		let [e, r] = t.split(" ");
		n = Object.assign(r ? {
			method: e,
			url: r
		} : { url: e }, n);
	} else n = Object.assign({}, t);
	n.headers = ie(n.headers), oe(n), oe(n.headers);
	let r = S(e || {}, n);
	return n.url === "/graphql" && (e && e.mediaType.previews?.length && (r.mediaType.previews = e.mediaType.previews.filter((e) => !r.mediaType.previews.includes(e)).concat(r.mediaType.previews)), r.mediaType.previews = (r.mediaType.previews || []).map((e) => e.replace(/-preview/, ""))), r;
}
function se(e, t) {
	let n = /\?/.test(e) ? "&" : "?", r = Object.keys(t);
	return r.length === 0 ? e : e + n + r.map((e) => e === "q" ? "q=" + t.q.split("+").map(encodeURIComponent).join("+") : `${e}=${encodeURIComponent(t[e])}`).join("&");
}
var ce = /\{[^{}}]+\}/g;
function le(e) {
	return e.replace(/(?:^\W+)|(?:(?<!\W)\W+$)/g, "").split(/,/);
}
function ue(e) {
	let t = e.match(ce);
	return t ? t.map(le).reduce((e, t) => e.concat(t), []) : [];
}
function de(e, t) {
	let n = { __proto__: null };
	for (let r of Object.keys(e)) t.indexOf(r) === -1 && (n[r] = e[r]);
	return n;
}
function fe(e) {
	return e.split(/(%[0-9A-Fa-f]{2})/g).map(function(e) {
		return /%[0-9A-Fa-f]/.test(e) || (e = encodeURI(e).replace(/%5B/g, "[").replace(/%5D/g, "]")), e;
	}).join("");
}
function w(e) {
	return encodeURIComponent(e).replace(/[!'()*]/g, function(e) {
		return "%" + e.charCodeAt(0).toString(16).toUpperCase();
	});
}
function T(e, t, n) {
	return t = e === "+" || e === "#" ? fe(t) : w(t), n ? w(n) + "=" + t : t;
}
function E(e) {
	return e != null;
}
function D(e) {
	return e === ";" || e === "&" || e === "?";
}
function pe(e, t, n, r) {
	var i = e[n], a = [];
	if (E(i) && i !== "") if (typeof i == "string" || typeof i == "number" || typeof i == "bigint" || typeof i == "boolean") i = i.toString(), r && r !== "*" && (i = i.substring(0, parseInt(r, 10))), a.push(T(t, i, D(t) ? n : ""));
	else if (r === "*") Array.isArray(i) ? i.filter(E).forEach(function(e) {
		a.push(T(t, e, D(t) ? n : ""));
	}) : Object.keys(i).forEach(function(e) {
		E(i[e]) && a.push(T(t, i[e], e));
	});
	else {
		let e = [];
		Array.isArray(i) ? i.filter(E).forEach(function(n) {
			e.push(T(t, n));
		}) : Object.keys(i).forEach(function(n) {
			E(i[n]) && (e.push(w(n)), e.push(T(t, i[n].toString())));
		}), D(t) ? a.push(w(n) + "=" + e.join(",")) : e.length !== 0 && a.push(e.join(","));
	}
	else t === ";" ? E(i) && a.push(w(n)) : i === "" && (t === "&" || t === "?") ? a.push(w(n) + "=") : i === "" && a.push("");
	return a;
}
function me(e) {
	return { expand: he.bind(null, e) };
}
function he(e, t) {
	var n = [
		"+",
		"#",
		".",
		"/",
		";",
		"?",
		"&"
	];
	return e = e.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g, function(e, r, i) {
		if (r) {
			let e = "", i = [];
			if (n.indexOf(r.charAt(0)) !== -1 && (e = r.charAt(0), r = r.substr(1)), r.split(/,/g).forEach(function(n) {
				var r = /([^:\*]*)(?::(\d+)|(\*))?/.exec(n);
				i.push(pe(t, e, r[1], r[2] || r[3]));
			}), e && e !== "+") {
				var a = ",";
				return e === "?" ? a = "&" : e !== "#" && (a = e), (i.length === 0 ? "" : e) + i.join(a);
			}
			return i.join(",");
		}
		return fe(i);
	}), e === "/" ? e : e.replace(/\/$/, "");
}
function ge(e) {
	let t = e.method.toUpperCase(), n = (e.url || "/").replace(/:([a-z]\w+)/g, "{$1}"), r = Object.assign({}, e.headers), i, a = de(e, [
		"method",
		"baseUrl",
		"url",
		"headers",
		"request",
		"mediaType"
	]), o = ue(n);
	n = me(n).expand(a), /^http/.test(n) || (n = e.baseUrl + n);
	let s = de(a, Object.keys(e).filter((e) => o.includes(e)).concat("baseUrl"));
	return /application\/octet-stream/i.test(r.accept) || (e.mediaType.format && (r.accept = r.accept.split(/,/).map((t) => t.replace(/application\/vnd(\.\w+)(\.v3)?(\.\w+)?(\+json)?$/, `application/vnd$1$2.${e.mediaType.format}`)).join(",")), n.endsWith("/graphql") && e.mediaType.previews?.length && (r.accept = (r.accept.match(/(?<![\w-])[\w-]+(?=-preview)/g) || []).concat(e.mediaType.previews).map((t) => `application/vnd.github.${t}-preview${e.mediaType.format ? `.${e.mediaType.format}` : "+json"}`).join(","))), ["GET", "HEAD"].includes(t) ? n = se(n, s) : "data" in s ? i = s.data : Object.keys(s).length && (i = s), !r["content-type"] && i !== void 0 && (r["content-type"] = "application/json; charset=utf-8"), ["PATCH", "PUT"].includes(t) && i === void 0 && (i = ""), Object.assign({
		method: t,
		url: n,
		headers: r
	}, i === void 0 ? null : { body: i }, e.request ? { request: e.request } : null);
}
function _e(e, t, n) {
	return ge(C(e, t, n));
}
function ve(e, t) {
	let n = C(e, t), r = _e.bind(null, n);
	return Object.assign(r, {
		DEFAULTS: n,
		defaults: ve.bind(null, n),
		merge: C.bind(null, n),
		parse: ge
	});
}
var ye = ve(null, re), be = (/* @__PURE__ */ f(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.parse = n;
	var t = /* @__PURE__ */ (() => {
		let e = function() {};
		return e.prototype = Object.create(null), e;
	})();
	function n(e, n) {
		let r = e.length, i = d(e, 0, r), a = i;
		i = u(e, i, r);
		let o = f(e, a, i);
		return {
			type: e.slice(a, o).toLowerCase(),
			parameters: n?.parameters === !1 ? new t() : l(e, i, r)
		};
	}
	var r = 32, i = 9, a = 59, o = 61, s = 34, c = 92;
	function l(e, n, r) {
		let i = new t();
		parameter: for (; n < r;) {
			n = d(e, n + 1, r);
			let t = n;
			for (; n < r;) {
				let l = e.charCodeAt(n);
				if (l === a) continue parameter;
				if (l === o) {
					let a = f(e, t, n), o = e.slice(t, a).toLowerCase();
					if (n = d(e, n + 1, r), n < r && e.charCodeAt(n) === s) {
						n++;
						let t = "";
						for (; n < r;) {
							let a = e.charCodeAt(n++);
							if (a === s) {
								n = u(e, n, r), i[o] === void 0 && (i[o] = t);
								break;
							}
							if (a === c && n < r) {
								t += e[n++];
								continue;
							}
							t += String.fromCharCode(a);
						}
						continue parameter;
					}
					let l = n;
					if (n = u(e, n, r), i[o] === void 0) {
						let t = f(e, l, n);
						i[o] = e.slice(l, t);
					}
					continue parameter;
				}
				n++;
			}
		}
		return i;
	}
	function u(e, t, n) {
		for (; t < n && e.charCodeAt(t) !== a;) t++;
		return t;
	}
	function d(e, t, n) {
		for (; t < n;) {
			let n = e.charCodeAt(t);
			if (n !== r && n !== i) break;
			t++;
		}
		return t;
	}
	function f(e, t, n) {
		for (; n > t;) {
			let t = e.charCodeAt(n - 1);
			if (t !== r && t !== i) break;
			n--;
		}
		return n;
	}
})))(), xe = /^-?\d+$/, O = /^-?\d+n+$/, k = JSON.stringify, Se = JSON.parse, Ce = /^-?\d+n$/, we = /([\[:])?"(-?\d+)n"($|\s*[,\}\]])/g, Te = /([\[:])?("-?\d+n+)n("$|"\s*[,\}\]])/g, A = (e) => e === void 0 || typeof e == "function" || typeof e == "symbol", j = (e) => typeof e == "object" && !!e && e.constructor && e.constructor.name === "RawJSON", Ee = (e, t, n) => {
	let r = "";
	typeof n == "number" ? r = " ".repeat(Math.min(10, Math.max(0, Math.floor(n)))) : typeof n == "string" && (r = n.slice(0, 10));
	let i = typeof t == "function", a = Array.isArray(t) ? new Set(t.map(String)) : null, o = (e, n, r) => (typeof r == "object" && r && typeof r.toJSON == "function" && (r = r.toJSON(n)), typeof r == "string" && O.test(r) ? r + "n" : typeof r == "bigint" ? "rawJSON" in JSON ? JSON.rawJSON(r.toString()) : r.toString() + "n" : (i && (r = t.call(e, n, r)), typeof r == "object" && r && (r instanceof Number || r instanceof String || r instanceof Boolean) && (r = r.valueOf()), r)), s = o({ "": e }, "", e);
	if (A(s)) return;
	let c = typeof s != "object" || !s, l = j(s);
	if (c || l) return k(s);
	let u = [], d = 0, f = [{
		parent: { "": s },
		key: "",
		val: s,
		isArray: Array.isArray(s),
		keys: Array.isArray(s) ? null : Object.keys(s),
		index: 0,
		first: !0
	}], p = new WeakSet([s]);
	for (; f.length > 0;) {
		let e = f[f.length - 1];
		e.index === 0 && (u.push(e.isArray ? "[" : "{"), d++);
		let t = !1;
		if (e.isArray) if (e.index < e.val.length) {
			e.first || u.push(","), r && u.push("\n" + r.repeat(d));
			let t = e.val[e.index], n = o(e.val, String(e.index), t);
			if (A(n)) u.push("null"), e.first = !1, e.index++;
			else {
				let t = typeof n == "object" && !!n, r = j(n);
				if (t && !r) {
					if (p.has(n)) throw TypeError("Converting circular structure to JSON");
					p.add(n), f.push({
						parent: e.val,
						key: String(e.index),
						val: n,
						isArray: Array.isArray(n),
						keys: Array.isArray(n) ? null : Object.keys(n),
						index: 0,
						first: !0
					}), e.first = !1, e.index++;
				} else u.push(k(n)), e.first = !1, e.index++;
			}
		} else t = !0;
		else {
			for (; e.index < e.keys.length;) {
				let t = e.keys[e.index++];
				if (a && !a.has(t)) continue;
				let n = e.val[t], i = o(e.val, t, n);
				if (A(i)) continue;
				e.first || u.push(","), r ? u.push("\n" + r.repeat(d) + k(t) + ": ") : u.push(k(t) + ":");
				let s = typeof i == "object" && !!i, c = j(i);
				if (s && !c) {
					if (p.has(i)) throw TypeError("Converting circular structure to JSON");
					p.add(i), f.push({
						parent: e.val,
						key: t,
						val: i,
						isArray: Array.isArray(i),
						keys: Array.isArray(i) ? null : Object.keys(i),
						index: 0,
						first: !0
					}), e.first = !1;
					break;
				}
				u.push(k(i)), e.first = !1;
			}
			e.index >= e.keys.length && f[f.length - 1] === e && (t = !0);
		}
		t && (d--, !e.first && r && u.push("\n" + r.repeat(d)), u.push(e.isArray ? "]" : "}"), p.delete(e.val), f.pop());
	}
	return u.join("");
}, De = (e, t, n) => {
	try {
		return "rawJSON" in JSON ? k(e, (e, n) => typeof n == "bigint" ? JSON.rawJSON(n.toString()) : typeof t == "function" ? t(e, n) : (Array.isArray(t) && t.includes(e), n), n) : e ? k(e, (e, n) => typeof n == "string" && O.test(n) || typeof n == "bigint" ? n.toString() + "n" : typeof t == "function" ? t(e, n) : (Array.isArray(t) && t.includes(e), n), n).replace(we, "$1$2$3").replace(Te, "$1$2$3") : k(e, t, n);
	} catch (r) {
		if (r instanceof RangeError) {
			let r = Ee(e, t, n);
			return r === void 0 ? void 0 : "rawJSON" in JSON ? r : r.replace(we, "$1$2$3").replace(Te, "$1$2$3");
		}
		throw r;
	}
}, M = /* @__PURE__ */ new Map(), Oe = () => {
	let e = JSON.parse.toString();
	if (M.has(e)) return M.get(e);
	try {
		let t = JSON.parse("1", (e, t, n) => !!n?.source && n.source === "1");
		return M.set(e, t), t;
	} catch {
		return M.set(e, !1), !1;
	}
}, ke = (e, t, n, r) => typeof t == "string" && Ce.test(t) ? BigInt(t.slice(0, -1)) : typeof t == "string" && O.test(t) ? t.slice(0, -1) : typeof r == "function" ? r(e, t, n) : t, Ae = (e, t) => JSON.parse(e, (e, n, r) => {
	let i = typeof n == "number" && (n > 2 ** 53 - 1 || n < -(2 ** 53 - 1)), a = r && xe.test(r.source);
	return i && a ? BigInt(r.source) : typeof t == "function" ? t(e, n, r) : n;
}), je = (2 ** 53 - 1).toString(), Me = je.length, Ne = /"(?:\\.|[^"])*"|-?(0|[1-9][0-9]*)(\.[0-9]+)?([eE][+-]?[0-9]+)?/g, Pe = /^"-?\d+n+"$/, Fe = (e, t) => {
	let n = { "": e }, r = [{
		parent: n,
		key: "",
		visited: !1
	}];
	for (; r.length > 0;) {
		let e = r[r.length - 1];
		if (e.visited) {
			let { parent: n, key: i } = e, a = n[i];
			typeof a == "string" && (Ce.test(a) ? a = BigInt(a.slice(0, -1)) : O.test(a) && (a = a.slice(0, -1))), typeof t == "function" && (a = t.call(n, i, a)), a === void 0 ? delete n[i] : n[i] = a, r.pop();
		} else {
			e.visited = !0;
			let t = e.parent[e.key];
			if (typeof t == "object" && t) {
				let e = Object.keys(t);
				for (let n = e.length - 1; n >= 0; n--) r.push({
					parent: t,
					key: e[n],
					visited: !1
				});
			}
		}
	}
	return n[""];
}, Ie = (e) => e.replace(Ne, (e, t, n, r) => {
	let i = e[0] === "\"";
	if (i && Pe.test(e)) return e.substring(0, e.length - 1) + "n\"";
	let a = n || r, o = t && (t.length < Me || t.length === Me && t <= je);
	return i || a || o ? e : "\"" + e + "n\"";
}), Le = (e, t) => {
	if (!e) return Se(e, t);
	try {
		return Oe() ? Ae(e, t) : Se(Ie(e), (e, n, r) => ke(e, n, r, t));
	} catch (n) {
		if (n instanceof RangeError) return Fe(Se(Ie(e)), t);
		throw n;
	}
}, N = class extends Error {
	name;
	status;
	request;
	response;
	constructor(e, t, n) {
		/* v8 ignore else -- @preserve -- Bug with vitest coverage where it sees an else branch that doesn't exist */
		super(e, { cause: n.cause }), this.name = "HttpError", this.status = Number.parseInt(t), Number.isNaN(this.status) && (this.status = 0), "response" in n && (this.response = n.response);
		let r = Object.assign({}, n.request);
		n.request.headers.authorization && (r.headers = Object.assign({}, n.request.headers, { authorization: n.request.headers.authorization.replace(/(?<! ) .*$/, " [REDACTED]") })), r.url = r.url.replace(/\bclient_secret=\w+/g, "client_secret=[REDACTED]").replace(/\baccess_token=\w+/g, "access_token=[REDACTED]"), this.request = r;
	}
}, Re = { headers: { "user-agent": `octokit-request.js/10.0.13 ${h()}` } };
function ze(e) {
	if (typeof e != "object" || !e || Object.prototype.toString.call(e) !== "[object Object]") return !1;
	let t = Object.getPrototypeOf(e);
	if (t === null) return !0;
	let n = Object.prototype.hasOwnProperty.call(t, "constructor") && t.constructor;
	return typeof n == "function" && n instanceof n && Function.prototype.call(n) === Function.prototype.call(e);
}
var Be = () => "";
async function Ve(e) {
	let t = e.request?.fetch || globalThis.fetch;
	if (!t) throw Error("fetch is not set. Please pass a fetch implementation as new Octokit({ request: { fetch }}). Learn more at https://github.com/octokit/octokit.js/#fetch-missing");
	let n = e.request?.log || console, r = e.request?.parseSuccessResponseBody !== !1, i = ze(e.body) || Array.isArray(e.body) ? De(e.body) : e.body, a = Object.fromEntries(Object.entries(e.headers).map(([e, t]) => [e, String(t)])), o;
	try {
		o = await t(e.url, {
			method: e.method,
			body: i,
			redirect: e.request?.redirect,
			headers: a,
			signal: e.request?.signal,
			...e.body && { duplex: "half" }
		});
	} catch (t) {
		let n = "Unknown Error";
		if (t instanceof Error) {
			if (t.name === "AbortError") throw t.status = 500, t;
			n = t.message, t.name === "TypeError" && "cause" in t && (t.cause instanceof Error ? n = t.cause.message : typeof t.cause == "string" && (n = t.cause));
		}
		let r = new N(n, 500, { request: e });
		throw r.cause = t, r;
	}
	let s = o.status, c = o.url, l = {};
	for (let [e, t] of o.headers) l[e] = t;
	let u = {
		url: c,
		status: s,
		headers: l,
		data: ""
	};
	if ("deprecation" in l) {
		let t = l.link && l.link.match(/<([^<>]+)>; rel="deprecation"/), r = t && t.pop();
		n.warn(`[@octokit/request] "${e.method} ${e.url}" is deprecated. It is scheduled to be removed on ${l.sunset}${r ? `. See ${r}` : ""}`);
	}
	if (s === 204 || s === 205) return u;
	if (e.method === "HEAD") {
		if (s < 400) return u;
		throw new N(o.statusText, s, {
			response: u,
			request: e
		});
	}
	if (s === 304) throw u.data = await P(o), new N("Not modified", s, {
		response: u,
		request: e
	});
	if (s >= 400) throw u.data = await P(o), new N(Ue(u.data), s, {
		response: u,
		request: e
	});
	return u.data = r ? await P(o) : o.body, u;
}
async function P(e) {
	let t = e.headers.get("content-type");
	if (!t) return e.text().catch(Be);
	let n = (0, be.parse)(t);
	if (He(n)) {
		let t = "";
		try {
			return t = await e.text(), Le(t);
		} catch {
			return t;
		}
	}
	return n.type.startsWith("text/") || n.parameters.charset?.toLowerCase() === "utf-8" && n.type !== "application/octet-stream" ? e.text().catch(Be) : e.arrayBuffer().catch(
		/* v8 ignore next -- @preserve */
		() => /* @__PURE__ */ new ArrayBuffer(0)
	);
}
function He(e) {
	return e.type === "application/json" || e.type === "application/scim+json";
}
function Ue(e) {
	if (typeof e == "string") return e;
	if (e instanceof ArrayBuffer) return "Unknown error";
	if (typeof e == "object" && e && "message" in e) {
		let t = e, n = "documentation_url" in t ? ` - ${t.documentation_url}` : "";
		return Array.isArray(t.errors) ? `${t.message}: ${t.errors.map((e) => JSON.stringify(e)).join(", ")}${n}` : `${t.message}${n}`;
	}
	return `Unknown error: ${JSON.stringify(e)}`;
}
function F(e, t) {
	let n = e.defaults(t);
	return Object.assign(function(e, t) {
		let r = n.merge(e, t);
		if (!r.request || !r.request.hook) return Ve(n.parse(r));
		let i = (e, t) => Ve(n.parse(n.merge(e, t)));
		return Object.assign(i, {
			endpoint: n,
			defaults: F.bind(null, n)
		}), r.request.hook(i, r);
	}, {
		endpoint: n,
		defaults: F.bind(null, n)
	});
}
var I = F(ye, Re), We = "0.0.0-development";
function Ge(e) {
	return "Request failed due to following response errors:\n" + e.errors.map((e) => ` - ${e.message}`).join("\n");
}
var Ke = class extends Error {
	constructor(e, t, n) {
		super(Ge(n)), this.request = e, this.headers = t, this.response = n, this.errors = n.errors, this.data = n.data, Error.captureStackTrace && Error.captureStackTrace(this, this.constructor);
	}
	request;
	headers;
	response;
	name = "GraphqlResponseError";
	errors;
	data;
}, qe = [
	"method",
	"baseUrl",
	"url",
	"headers",
	"request",
	"query",
	"mediaType",
	"operationName"
], Je = [
	"query",
	"method",
	"url"
], Ye = /\/api\/v3\/?$/;
function Xe(e, t, n) {
	if (n) {
		if (typeof t == "string" && "query" in n) return Promise.reject(/* @__PURE__ */ Error("[@octokit/graphql] \"query\" cannot be used as variable name"));
		for (let e in n) if (Je.includes(e)) return Promise.reject(/* @__PURE__ */ Error(`[@octokit/graphql] "${e}" cannot be used as variable name`));
	}
	let r = typeof t == "string" ? Object.assign({ query: t }, n) : t, i = Object.keys(r).reduce((e, t) => qe.includes(t) ? (e[t] = r[t], e) : (e.variables ||= {}, e.variables[t] = r[t], e), {}), a = r.baseUrl || e.endpoint.DEFAULTS.baseUrl;
	return Ye.test(a) && (i.url = a.replace(Ye, "/api/graphql")), e(i).then((e) => {
		if (e.data.errors) {
			let t = {};
			for (let n of Object.keys(e.headers)) t[n] = e.headers[n];
			throw new Ke(i, t, e.data);
		}
		return e.data.data;
	});
}
function L(e, t) {
	let n = e.defaults(t);
	return Object.assign((e, t) => Xe(n, e, t), {
		defaults: L.bind(null, n),
		endpoint: n.endpoint
	});
}
L(I, {
	headers: { "user-agent": `octokit-graphql.js/${We} ${h()}` },
	method: "POST",
	url: "/graphql"
});
function Ze(e) {
	return L(e, {
		method: "POST",
		url: "/graphql"
	});
}
/* v8 ignore if -- @preserve */
//#endregion
//#region ../../node_modules/.pnpm/@octokit+auth-token@6.0.0/node_modules/@octokit/auth-token/dist-bundle/index.js
var R = "(?:[a-zA-Z0-9_-]+)", Qe = "\\.", $e = RegExp(`^${R}${Qe}${R}${Qe}${R}$`), et = $e.test.bind($e);
async function tt(e) {
	let t = et(e), n = e.startsWith("v1.") || e.startsWith("ghs_"), r = e.startsWith("ghu_");
	return {
		type: "token",
		token: e,
		tokenType: t ? "app" : n ? "installation" : r ? "user-to-server" : "oauth"
	};
}
function nt(e) {
	return e.split(/\./).length === 3 ? `bearer ${e}` : `token ${e}`;
}
async function rt(e, t, n, r) {
	let i = t.endpoint.merge(n, r);
	return i.headers.authorization = nt(e), t(i);
}
var it = function(e) {
	if (!e) throw Error("[@octokit/auth-token] No token passed to createTokenAuth");
	if (typeof e != "string") throw Error("[@octokit/auth-token] Token passed to createTokenAuth is not a string");
	return e = e.replace(/^(token|bearer) +/i, ""), Object.assign(tt.bind(null, e), { hook: rt.bind(null, e) });
}, at = "7.0.7", ot = () => {}, st = console.warn.bind(console), ct = console.error.bind(console);
function lt(e = {}) {
	return typeof e.debug != "function" && (e.debug = ot), typeof e.info != "function" && (e.info = ot), typeof e.warn != "function" && (e.warn = st), typeof e.error != "function" && (e.error = ct), e;
}
var ut = `octokit-core.js/${at} ${h()}`, dt = class {
	static VERSION = at;
	static defaults(e) {
		return class extends this {
			constructor(...t) {
				let n = t[0] || {};
				if (typeof e == "function") {
					super(e(n));
					return;
				}
				super(Object.assign({}, e, n, n.userAgent && e.userAgent ? { userAgent: `${n.userAgent} ${e.userAgent}` } : null));
			}
		};
	}
	static plugins = [];
	static plugin(...e) {
		let t = this.plugins;
		return class extends this {
			static plugins = t.concat(e.filter((e) => !t.includes(e)));
		};
	}
	constructor(e = {}) {
		let t = new ne.Collection(), n = {
			baseUrl: I.endpoint.DEFAULTS.baseUrl,
			headers: {},
			request: Object.assign({}, e.request, { hook: t.bind(null, "request") }),
			mediaType: {
				previews: [],
				format: ""
			}
		};
		if (n.headers["user-agent"] = e.userAgent ? `${e.userAgent} ${ut}` : ut, e.baseUrl && (n.baseUrl = e.baseUrl), e.previews && (n.mediaType.previews = e.previews), e.timeZone && (n.headers["time-zone"] = e.timeZone), this.request = I.defaults(n), this.graphql = Ze(this.request).defaults(n), this.log = lt(e.log), this.hook = t, e.authStrategy) {
			let { authStrategy: n, ...r } = e, i = n(Object.assign({
				request: this.request,
				log: this.log,
				octokit: this,
				octokitOptions: r
			}, e.auth));
			t.wrap("request", i.hook), this.auth = i;
		} else if (!e.auth) this.auth = async () => ({ type: "unauthenticated" });
		else {
			let n = it(e.auth);
			t.wrap("request", n.hook), this.auth = n;
		}
		let r = this.constructor;
		for (let t = 0; t < r.plugins.length; ++t) Object.assign(this, r.plugins[t](this, e));
	}
	request;
	graphql;
	log;
	hook;
	auth;
}, ft = "6.0.0";
//#endregion
//#region ../../node_modules/.pnpm/@octokit+plugin-request-log@6.0.0_@octokit+core@7.0.7/node_modules/@octokit/plugin-request-log/dist-src/index.js
function pt(e) {
	e.hook.wrap("request", (t, n) => {
		e.log.debug("request", n);
		let r = Date.now(), i = e.request.endpoint.parse(n), a = i.url.replace(n.baseUrl, "");
		return t(n).then((t) => {
			let n = t.headers["x-github-request-id"];
			return e.log.info(`${i.method} ${a} - ${t.status} with id ${n} in ${Date.now() - r}ms`), t;
		}).catch((t) => {
			let n = t.response?.headers["x-github-request-id"] || "UNKNOWN";
			throw e.log.error(`${i.method} ${a} - ${t.status} with id ${n} in ${Date.now() - r}ms`), t;
		});
	});
}
pt.VERSION = ft;
//#endregion
//#region ../../node_modules/.pnpm/@octokit+plugin-paginate-rest@14.0.0_@octokit+core@7.0.7/node_modules/@octokit/plugin-paginate-rest/dist-bundle/index.js
var mt = "0.0.0-development";
function ht(e) {
	if (!e.data) return {
		...e,
		data: []
	};
	if (!(("total_count" in e.data || "total_commits" in e.data) && !("url" in e.data))) return e;
	let t = e.data.incomplete_results, n = e.data.repository_selection, r = e.data.total_count, i = e.data.total_commits;
	delete e.data.incomplete_results, delete e.data.repository_selection, delete e.data.total_count, delete e.data.total_commits;
	let a = Object.keys(e.data)[0];
	return e.data = e.data[a], t !== void 0 && (e.data.incomplete_results = t), n !== void 0 && (e.data.repository_selection = n), e.data.total_count = r, e.data.total_commits = i, e;
}
function z(e, t, n) {
	let r = typeof t == "function" ? t.endpoint(n) : e.request.endpoint(t, n), i = typeof t == "function" ? t : e.request, a = r.method, o = r.headers, s = r.url;
	return { [Symbol.asyncIterator]: () => ({ async next() {
		if (!s) return { done: !0 };
		try {
			let e = ht(await i({
				method: a,
				url: s,
				headers: o
			}));
			if (s = ((e.headers.link || "").match(/<([^<>]+)>;\s*rel="next"/) || [])[1], !s && "total_commits" in e.data) {
				let t = new URL(e.url), n = t.searchParams, r = parseInt(n.get("page") || "1", 10);
				r * parseInt(n.get("per_page") || "250", 10) < e.data.total_commits && (n.set("page", String(r + 1)), s = t.toString());
			}
			return { value: e };
		} catch (e) {
			if (e.status !== 409) throw e;
			return s = "", { value: {
				status: 200,
				headers: {},
				data: []
			} };
		}
	} }) };
}
function gt(e, t, n, r) {
	return typeof n == "function" && (r = n, n = void 0), _t(e, [], z(e, t, n)[Symbol.asyncIterator](), r);
}
function _t(e, t, n, r) {
	return n.next().then((i) => {
		if (i.done) return t;
		let a = !1;
		function o() {
			a = !0;
		}
		return t = t.concat(r ? r(i.value, o) : i.value.data), a ? t : _t(e, t, n, r);
	});
}
Object.assign(gt, { iterator: z });
function vt(e) {
	return { paginate: Object.assign(gt.bind(null, e), { iterator: z.bind(null, e) }) };
}
vt.VERSION = mt;
//#endregion
//#region ../../node_modules/.pnpm/@octokit+plugin-rest-endpoint-methods@17.0.0_@octokit+core@7.0.7/node_modules/@octokit/plugin-rest-endpoint-methods/dist-src/version.js
var yt = "17.0.0", bt = {
	actions: {
		addCustomLabelsToSelfHostedRunnerForOrg: ["POST /orgs/{org}/actions/runners/{runner_id}/labels"],
		addCustomLabelsToSelfHostedRunnerForRepo: ["POST /repos/{owner}/{repo}/actions/runners/{runner_id}/labels"],
		addRepoAccessToSelfHostedRunnerGroupInOrg: ["PUT /orgs/{org}/actions/runner-groups/{runner_group_id}/repositories/{repository_id}"],
		addSelectedRepoToOrgSecret: ["PUT /orgs/{org}/actions/secrets/{secret_name}/repositories/{repository_id}"],
		addSelectedRepoToOrgVariable: ["PUT /orgs/{org}/actions/variables/{name}/repositories/{repository_id}"],
		approveWorkflowRun: ["POST /repos/{owner}/{repo}/actions/runs/{run_id}/approve"],
		cancelWorkflowRun: ["POST /repos/{owner}/{repo}/actions/runs/{run_id}/cancel"],
		createEnvironmentVariable: ["POST /repos/{owner}/{repo}/environments/{environment_name}/variables"],
		createHostedRunnerForOrg: ["POST /orgs/{org}/actions/hosted-runners"],
		createOrUpdateEnvironmentSecret: ["PUT /repos/{owner}/{repo}/environments/{environment_name}/secrets/{secret_name}"],
		createOrUpdateOrgSecret: ["PUT /orgs/{org}/actions/secrets/{secret_name}"],
		createOrUpdateRepoSecret: ["PUT /repos/{owner}/{repo}/actions/secrets/{secret_name}"],
		createOrgVariable: ["POST /orgs/{org}/actions/variables"],
		createRegistrationTokenForOrg: ["POST /orgs/{org}/actions/runners/registration-token"],
		createRegistrationTokenForRepo: ["POST /repos/{owner}/{repo}/actions/runners/registration-token"],
		createRemoveTokenForOrg: ["POST /orgs/{org}/actions/runners/remove-token"],
		createRemoveTokenForRepo: ["POST /repos/{owner}/{repo}/actions/runners/remove-token"],
		createRepoVariable: ["POST /repos/{owner}/{repo}/actions/variables"],
		createWorkflowDispatch: ["POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches"],
		deleteActionsCacheById: ["DELETE /repos/{owner}/{repo}/actions/caches/{cache_id}"],
		deleteActionsCacheByKey: ["DELETE /repos/{owner}/{repo}/actions/caches{?key,ref}"],
		deleteArtifact: ["DELETE /repos/{owner}/{repo}/actions/artifacts/{artifact_id}"],
		deleteCustomImageFromOrg: ["DELETE /orgs/{org}/actions/hosted-runners/images/custom/{image_definition_id}"],
		deleteCustomImageVersionFromOrg: ["DELETE /orgs/{org}/actions/hosted-runners/images/custom/{image_definition_id}/versions/{version}"],
		deleteEnvironmentSecret: ["DELETE /repos/{owner}/{repo}/environments/{environment_name}/secrets/{secret_name}"],
		deleteEnvironmentVariable: ["DELETE /repos/{owner}/{repo}/environments/{environment_name}/variables/{name}"],
		deleteHostedRunnerForOrg: ["DELETE /orgs/{org}/actions/hosted-runners/{hosted_runner_id}"],
		deleteOrgSecret: ["DELETE /orgs/{org}/actions/secrets/{secret_name}"],
		deleteOrgVariable: ["DELETE /orgs/{org}/actions/variables/{name}"],
		deleteRepoSecret: ["DELETE /repos/{owner}/{repo}/actions/secrets/{secret_name}"],
		deleteRepoVariable: ["DELETE /repos/{owner}/{repo}/actions/variables/{name}"],
		deleteSelfHostedRunnerFromOrg: ["DELETE /orgs/{org}/actions/runners/{runner_id}"],
		deleteSelfHostedRunnerFromRepo: ["DELETE /repos/{owner}/{repo}/actions/runners/{runner_id}"],
		deleteWorkflowRun: ["DELETE /repos/{owner}/{repo}/actions/runs/{run_id}"],
		deleteWorkflowRunLogs: ["DELETE /repos/{owner}/{repo}/actions/runs/{run_id}/logs"],
		disableSelectedRepositoryGithubActionsOrganization: ["DELETE /orgs/{org}/actions/permissions/repositories/{repository_id}"],
		disableWorkflow: ["PUT /repos/{owner}/{repo}/actions/workflows/{workflow_id}/disable"],
		downloadArtifact: ["GET /repos/{owner}/{repo}/actions/artifacts/{artifact_id}/{archive_format}"],
		downloadJobLogsForWorkflowRun: ["GET /repos/{owner}/{repo}/actions/jobs/{job_id}/logs"],
		downloadWorkflowRunAttemptLogs: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}/attempts/{attempt_number}/logs"],
		downloadWorkflowRunLogs: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}/logs"],
		enableSelectedRepositoryGithubActionsOrganization: ["PUT /orgs/{org}/actions/permissions/repositories/{repository_id}"],
		enableWorkflow: ["PUT /repos/{owner}/{repo}/actions/workflows/{workflow_id}/enable"],
		forceCancelWorkflowRun: ["POST /repos/{owner}/{repo}/actions/runs/{run_id}/force-cancel"],
		generateRunnerJitconfigForOrg: ["POST /orgs/{org}/actions/runners/generate-jitconfig"],
		generateRunnerJitconfigForRepo: ["POST /repos/{owner}/{repo}/actions/runners/generate-jitconfig"],
		getActionsCacheList: ["GET /repos/{owner}/{repo}/actions/caches"],
		getActionsCacheUsage: ["GET /repos/{owner}/{repo}/actions/cache/usage"],
		getActionsCacheUsageByRepoForOrg: ["GET /orgs/{org}/actions/cache/usage-by-repository"],
		getActionsCacheUsageForOrg: ["GET /orgs/{org}/actions/cache/usage"],
		getAllowedActionsOrganization: ["GET /orgs/{org}/actions/permissions/selected-actions"],
		getAllowedActionsRepository: ["GET /repos/{owner}/{repo}/actions/permissions/selected-actions"],
		getArtifact: ["GET /repos/{owner}/{repo}/actions/artifacts/{artifact_id}"],
		getCustomImageForOrg: ["GET /orgs/{org}/actions/hosted-runners/images/custom/{image_definition_id}"],
		getCustomImageVersionForOrg: ["GET /orgs/{org}/actions/hosted-runners/images/custom/{image_definition_id}/versions/{version}"],
		getCustomOidcSubClaimForRepo: ["GET /repos/{owner}/{repo}/actions/oidc/customization/sub"],
		getEnvironmentPublicKey: ["GET /repos/{owner}/{repo}/environments/{environment_name}/secrets/public-key"],
		getEnvironmentSecret: ["GET /repos/{owner}/{repo}/environments/{environment_name}/secrets/{secret_name}"],
		getEnvironmentVariable: ["GET /repos/{owner}/{repo}/environments/{environment_name}/variables/{name}"],
		getGithubActionsDefaultWorkflowPermissionsOrganization: ["GET /orgs/{org}/actions/permissions/workflow"],
		getGithubActionsDefaultWorkflowPermissionsRepository: ["GET /repos/{owner}/{repo}/actions/permissions/workflow"],
		getGithubActionsPermissionsOrganization: ["GET /orgs/{org}/actions/permissions"],
		getGithubActionsPermissionsRepository: ["GET /repos/{owner}/{repo}/actions/permissions"],
		getHostedRunnerForOrg: ["GET /orgs/{org}/actions/hosted-runners/{hosted_runner_id}"],
		getHostedRunnersGithubOwnedImagesForOrg: ["GET /orgs/{org}/actions/hosted-runners/images/github-owned"],
		getHostedRunnersLimitsForOrg: ["GET /orgs/{org}/actions/hosted-runners/limits"],
		getHostedRunnersMachineSpecsForOrg: ["GET /orgs/{org}/actions/hosted-runners/machine-sizes"],
		getHostedRunnersPartnerImagesForOrg: ["GET /orgs/{org}/actions/hosted-runners/images/partner"],
		getHostedRunnersPlatformsForOrg: ["GET /orgs/{org}/actions/hosted-runners/platforms"],
		getJobForWorkflowRun: ["GET /repos/{owner}/{repo}/actions/jobs/{job_id}"],
		getOrgPublicKey: ["GET /orgs/{org}/actions/secrets/public-key"],
		getOrgSecret: ["GET /orgs/{org}/actions/secrets/{secret_name}"],
		getOrgVariable: ["GET /orgs/{org}/actions/variables/{name}"],
		getPendingDeploymentsForRun: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}/pending_deployments"],
		getRepoPermissions: [
			"GET /repos/{owner}/{repo}/actions/permissions",
			{},
			{ renamed: ["actions", "getGithubActionsPermissionsRepository"] }
		],
		getRepoPublicKey: ["GET /repos/{owner}/{repo}/actions/secrets/public-key"],
		getRepoSecret: ["GET /repos/{owner}/{repo}/actions/secrets/{secret_name}"],
		getRepoVariable: ["GET /repos/{owner}/{repo}/actions/variables/{name}"],
		getReviewsForRun: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}/approvals"],
		getSelfHostedRunnerForOrg: ["GET /orgs/{org}/actions/runners/{runner_id}"],
		getSelfHostedRunnerForRepo: ["GET /repos/{owner}/{repo}/actions/runners/{runner_id}"],
		getWorkflow: ["GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}"],
		getWorkflowAccessToRepository: ["GET /repos/{owner}/{repo}/actions/permissions/access"],
		getWorkflowRun: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}"],
		getWorkflowRunAttempt: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}/attempts/{attempt_number}"],
		getWorkflowRunUsage: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}/timing"],
		getWorkflowUsage: ["GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}/timing"],
		listArtifactsForRepo: ["GET /repos/{owner}/{repo}/actions/artifacts"],
		listCustomImageVersionsForOrg: ["GET /orgs/{org}/actions/hosted-runners/images/custom/{image_definition_id}/versions"],
		listCustomImagesForOrg: ["GET /orgs/{org}/actions/hosted-runners/images/custom"],
		listEnvironmentSecrets: ["GET /repos/{owner}/{repo}/environments/{environment_name}/secrets"],
		listEnvironmentVariables: ["GET /repos/{owner}/{repo}/environments/{environment_name}/variables"],
		listGithubHostedRunnersInGroupForOrg: ["GET /orgs/{org}/actions/runner-groups/{runner_group_id}/hosted-runners"],
		listHostedRunnersForOrg: ["GET /orgs/{org}/actions/hosted-runners"],
		listJobsForWorkflowRun: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}/jobs"],
		listJobsForWorkflowRunAttempt: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}/attempts/{attempt_number}/jobs"],
		listLabelsForSelfHostedRunnerForOrg: ["GET /orgs/{org}/actions/runners/{runner_id}/labels"],
		listLabelsForSelfHostedRunnerForRepo: ["GET /repos/{owner}/{repo}/actions/runners/{runner_id}/labels"],
		listOrgSecrets: ["GET /orgs/{org}/actions/secrets"],
		listOrgVariables: ["GET /orgs/{org}/actions/variables"],
		listRepoOrganizationSecrets: ["GET /repos/{owner}/{repo}/actions/organization-secrets"],
		listRepoOrganizationVariables: ["GET /repos/{owner}/{repo}/actions/organization-variables"],
		listRepoSecrets: ["GET /repos/{owner}/{repo}/actions/secrets"],
		listRepoVariables: ["GET /repos/{owner}/{repo}/actions/variables"],
		listRepoWorkflows: ["GET /repos/{owner}/{repo}/actions/workflows"],
		listRunnerApplicationsForOrg: ["GET /orgs/{org}/actions/runners/downloads"],
		listRunnerApplicationsForRepo: ["GET /repos/{owner}/{repo}/actions/runners/downloads"],
		listSelectedReposForOrgSecret: ["GET /orgs/{org}/actions/secrets/{secret_name}/repositories"],
		listSelectedReposForOrgVariable: ["GET /orgs/{org}/actions/variables/{name}/repositories"],
		listSelectedRepositoriesEnabledGithubActionsOrganization: ["GET /orgs/{org}/actions/permissions/repositories"],
		listSelfHostedRunnersForOrg: ["GET /orgs/{org}/actions/runners"],
		listSelfHostedRunnersForRepo: ["GET /repos/{owner}/{repo}/actions/runners"],
		listWorkflowRunArtifacts: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}/artifacts"],
		listWorkflowRuns: ["GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}/runs"],
		listWorkflowRunsForRepo: ["GET /repos/{owner}/{repo}/actions/runs"],
		reRunJobForWorkflowRun: ["POST /repos/{owner}/{repo}/actions/jobs/{job_id}/rerun"],
		reRunWorkflow: ["POST /repos/{owner}/{repo}/actions/runs/{run_id}/rerun"],
		reRunWorkflowFailedJobs: ["POST /repos/{owner}/{repo}/actions/runs/{run_id}/rerun-failed-jobs"],
		removeAllCustomLabelsFromSelfHostedRunnerForOrg: ["DELETE /orgs/{org}/actions/runners/{runner_id}/labels"],
		removeAllCustomLabelsFromSelfHostedRunnerForRepo: ["DELETE /repos/{owner}/{repo}/actions/runners/{runner_id}/labels"],
		removeCustomLabelFromSelfHostedRunnerForOrg: ["DELETE /orgs/{org}/actions/runners/{runner_id}/labels/{name}"],
		removeCustomLabelFromSelfHostedRunnerForRepo: ["DELETE /repos/{owner}/{repo}/actions/runners/{runner_id}/labels/{name}"],
		removeSelectedRepoFromOrgSecret: ["DELETE /orgs/{org}/actions/secrets/{secret_name}/repositories/{repository_id}"],
		removeSelectedRepoFromOrgVariable: ["DELETE /orgs/{org}/actions/variables/{name}/repositories/{repository_id}"],
		reviewCustomGatesForRun: ["POST /repos/{owner}/{repo}/actions/runs/{run_id}/deployment_protection_rule"],
		reviewPendingDeploymentsForRun: ["POST /repos/{owner}/{repo}/actions/runs/{run_id}/pending_deployments"],
		setAllowedActionsOrganization: ["PUT /orgs/{org}/actions/permissions/selected-actions"],
		setAllowedActionsRepository: ["PUT /repos/{owner}/{repo}/actions/permissions/selected-actions"],
		setCustomLabelsForSelfHostedRunnerForOrg: ["PUT /orgs/{org}/actions/runners/{runner_id}/labels"],
		setCustomLabelsForSelfHostedRunnerForRepo: ["PUT /repos/{owner}/{repo}/actions/runners/{runner_id}/labels"],
		setCustomOidcSubClaimForRepo: ["PUT /repos/{owner}/{repo}/actions/oidc/customization/sub"],
		setGithubActionsDefaultWorkflowPermissionsOrganization: ["PUT /orgs/{org}/actions/permissions/workflow"],
		setGithubActionsDefaultWorkflowPermissionsRepository: ["PUT /repos/{owner}/{repo}/actions/permissions/workflow"],
		setGithubActionsPermissionsOrganization: ["PUT /orgs/{org}/actions/permissions"],
		setGithubActionsPermissionsRepository: ["PUT /repos/{owner}/{repo}/actions/permissions"],
		setSelectedReposForOrgSecret: ["PUT /orgs/{org}/actions/secrets/{secret_name}/repositories"],
		setSelectedReposForOrgVariable: ["PUT /orgs/{org}/actions/variables/{name}/repositories"],
		setSelectedRepositoriesEnabledGithubActionsOrganization: ["PUT /orgs/{org}/actions/permissions/repositories"],
		setWorkflowAccessToRepository: ["PUT /repos/{owner}/{repo}/actions/permissions/access"],
		updateEnvironmentVariable: ["PATCH /repos/{owner}/{repo}/environments/{environment_name}/variables/{name}"],
		updateHostedRunnerForOrg: ["PATCH /orgs/{org}/actions/hosted-runners/{hosted_runner_id}"],
		updateOrgVariable: ["PATCH /orgs/{org}/actions/variables/{name}"],
		updateRepoVariable: ["PATCH /repos/{owner}/{repo}/actions/variables/{name}"]
	},
	activity: {
		checkRepoIsStarredByAuthenticatedUser: ["GET /user/starred/{owner}/{repo}"],
		deleteRepoSubscription: ["DELETE /repos/{owner}/{repo}/subscription"],
		deleteThreadSubscription: ["DELETE /notifications/threads/{thread_id}/subscription"],
		getFeeds: ["GET /feeds"],
		getRepoSubscription: ["GET /repos/{owner}/{repo}/subscription"],
		getThread: ["GET /notifications/threads/{thread_id}"],
		getThreadSubscriptionForAuthenticatedUser: ["GET /notifications/threads/{thread_id}/subscription"],
		listEventsForAuthenticatedUser: ["GET /users/{username}/events"],
		listNotificationsForAuthenticatedUser: ["GET /notifications"],
		listOrgEventsForAuthenticatedUser: ["GET /users/{username}/events/orgs/{org}"],
		listPublicEvents: ["GET /events"],
		listPublicEventsForRepoNetwork: ["GET /networks/{owner}/{repo}/events"],
		listPublicEventsForUser: ["GET /users/{username}/events/public"],
		listPublicOrgEvents: ["GET /orgs/{org}/events"],
		listReceivedEventsForUser: ["GET /users/{username}/received_events"],
		listReceivedPublicEventsForUser: ["GET /users/{username}/received_events/public"],
		listRepoEvents: ["GET /repos/{owner}/{repo}/events"],
		listRepoNotificationsForAuthenticatedUser: ["GET /repos/{owner}/{repo}/notifications"],
		listReposStarredByAuthenticatedUser: ["GET /user/starred"],
		listReposStarredByUser: ["GET /users/{username}/starred"],
		listReposWatchedByUser: ["GET /users/{username}/subscriptions"],
		listStargazersForRepo: ["GET /repos/{owner}/{repo}/stargazers"],
		listWatchedReposForAuthenticatedUser: ["GET /user/subscriptions"],
		listWatchersForRepo: ["GET /repos/{owner}/{repo}/subscribers"],
		markNotificationsAsRead: ["PUT /notifications"],
		markRepoNotificationsAsRead: ["PUT /repos/{owner}/{repo}/notifications"],
		markThreadAsDone: ["DELETE /notifications/threads/{thread_id}"],
		markThreadAsRead: ["PATCH /notifications/threads/{thread_id}"],
		setRepoSubscription: ["PUT /repos/{owner}/{repo}/subscription"],
		setThreadSubscription: ["PUT /notifications/threads/{thread_id}/subscription"],
		starRepoForAuthenticatedUser: ["PUT /user/starred/{owner}/{repo}"],
		unstarRepoForAuthenticatedUser: ["DELETE /user/starred/{owner}/{repo}"]
	},
	apps: {
		addRepoToInstallation: [
			"PUT /user/installations/{installation_id}/repositories/{repository_id}",
			{},
			{ renamed: ["apps", "addRepoToInstallationForAuthenticatedUser"] }
		],
		addRepoToInstallationForAuthenticatedUser: ["PUT /user/installations/{installation_id}/repositories/{repository_id}"],
		checkToken: ["POST /applications/{client_id}/token"],
		createFromManifest: ["POST /app-manifests/{code}/conversions"],
		createInstallationAccessToken: ["POST /app/installations/{installation_id}/access_tokens"],
		deleteAuthorization: ["DELETE /applications/{client_id}/grant"],
		deleteInstallation: ["DELETE /app/installations/{installation_id}"],
		deleteToken: ["DELETE /applications/{client_id}/token"],
		getAuthenticated: ["GET /app"],
		getBySlug: ["GET /apps/{app_slug}"],
		getInstallation: ["GET /app/installations/{installation_id}"],
		getOrgInstallation: ["GET /orgs/{org}/installation"],
		getRepoInstallation: ["GET /repos/{owner}/{repo}/installation"],
		getSubscriptionPlanForAccount: ["GET /marketplace_listing/accounts/{account_id}"],
		getSubscriptionPlanForAccountStubbed: ["GET /marketplace_listing/stubbed/accounts/{account_id}"],
		getUserInstallation: ["GET /users/{username}/installation"],
		getWebhookConfigForApp: ["GET /app/hook/config"],
		getWebhookDelivery: ["GET /app/hook/deliveries/{delivery_id}"],
		listAccountsForPlan: ["GET /marketplace_listing/plans/{plan_id}/accounts"],
		listAccountsForPlanStubbed: ["GET /marketplace_listing/stubbed/plans/{plan_id}/accounts"],
		listInstallationReposForAuthenticatedUser: ["GET /user/installations/{installation_id}/repositories"],
		listInstallationRequestsForAuthenticatedApp: ["GET /app/installation-requests"],
		listInstallations: ["GET /app/installations"],
		listInstallationsForAuthenticatedUser: ["GET /user/installations"],
		listPlans: ["GET /marketplace_listing/plans"],
		listPlansStubbed: ["GET /marketplace_listing/stubbed/plans"],
		listReposAccessibleToInstallation: ["GET /installation/repositories"],
		listSubscriptionsForAuthenticatedUser: ["GET /user/marketplace_purchases"],
		listSubscriptionsForAuthenticatedUserStubbed: ["GET /user/marketplace_purchases/stubbed"],
		listWebhookDeliveries: ["GET /app/hook/deliveries"],
		redeliverWebhookDelivery: ["POST /app/hook/deliveries/{delivery_id}/attempts"],
		removeRepoFromInstallation: [
			"DELETE /user/installations/{installation_id}/repositories/{repository_id}",
			{},
			{ renamed: ["apps", "removeRepoFromInstallationForAuthenticatedUser"] }
		],
		removeRepoFromInstallationForAuthenticatedUser: ["DELETE /user/installations/{installation_id}/repositories/{repository_id}"],
		resetToken: ["PATCH /applications/{client_id}/token"],
		revokeInstallationAccessToken: ["DELETE /installation/token"],
		scopeToken: ["POST /applications/{client_id}/token/scoped"],
		suspendInstallation: ["PUT /app/installations/{installation_id}/suspended"],
		unsuspendInstallation: ["DELETE /app/installations/{installation_id}/suspended"],
		updateWebhookConfigForApp: ["PATCH /app/hook/config"]
	},
	billing: {
		getGithubActionsBillingOrg: ["GET /orgs/{org}/settings/billing/actions"],
		getGithubActionsBillingUser: ["GET /users/{username}/settings/billing/actions"],
		getGithubBillingPremiumRequestUsageReportOrg: ["GET /organizations/{org}/settings/billing/premium_request/usage"],
		getGithubBillingPremiumRequestUsageReportUser: ["GET /users/{username}/settings/billing/premium_request/usage"],
		getGithubBillingUsageReportOrg: ["GET /organizations/{org}/settings/billing/usage"],
		getGithubBillingUsageReportUser: ["GET /users/{username}/settings/billing/usage"],
		getGithubPackagesBillingOrg: ["GET /orgs/{org}/settings/billing/packages"],
		getGithubPackagesBillingUser: ["GET /users/{username}/settings/billing/packages"],
		getSharedStorageBillingOrg: ["GET /orgs/{org}/settings/billing/shared-storage"],
		getSharedStorageBillingUser: ["GET /users/{username}/settings/billing/shared-storage"]
	},
	campaigns: {
		createCampaign: ["POST /orgs/{org}/campaigns"],
		deleteCampaign: ["DELETE /orgs/{org}/campaigns/{campaign_number}"],
		getCampaignSummary: ["GET /orgs/{org}/campaigns/{campaign_number}"],
		listOrgCampaigns: ["GET /orgs/{org}/campaigns"],
		updateCampaign: ["PATCH /orgs/{org}/campaigns/{campaign_number}"]
	},
	checks: {
		create: ["POST /repos/{owner}/{repo}/check-runs"],
		createSuite: ["POST /repos/{owner}/{repo}/check-suites"],
		get: ["GET /repos/{owner}/{repo}/check-runs/{check_run_id}"],
		getSuite: ["GET /repos/{owner}/{repo}/check-suites/{check_suite_id}"],
		listAnnotations: ["GET /repos/{owner}/{repo}/check-runs/{check_run_id}/annotations"],
		listForRef: ["GET /repos/{owner}/{repo}/commits/{ref}/check-runs"],
		listForSuite: ["GET /repos/{owner}/{repo}/check-suites/{check_suite_id}/check-runs"],
		listSuitesForRef: ["GET /repos/{owner}/{repo}/commits/{ref}/check-suites"],
		rerequestRun: ["POST /repos/{owner}/{repo}/check-runs/{check_run_id}/rerequest"],
		rerequestSuite: ["POST /repos/{owner}/{repo}/check-suites/{check_suite_id}/rerequest"],
		setSuitesPreferences: ["PATCH /repos/{owner}/{repo}/check-suites/preferences"],
		update: ["PATCH /repos/{owner}/{repo}/check-runs/{check_run_id}"]
	},
	codeScanning: {
		commitAutofix: ["POST /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/autofix/commits"],
		createAutofix: ["POST /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/autofix"],
		createVariantAnalysis: ["POST /repos/{owner}/{repo}/code-scanning/codeql/variant-analyses"],
		deleteAnalysis: ["DELETE /repos/{owner}/{repo}/code-scanning/analyses/{analysis_id}{?confirm_delete}"],
		deleteCodeqlDatabase: ["DELETE /repos/{owner}/{repo}/code-scanning/codeql/databases/{language}"],
		getAlert: [
			"GET /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}",
			{},
			{ renamedParameters: { alert_id: "alert_number" } }
		],
		getAnalysis: ["GET /repos/{owner}/{repo}/code-scanning/analyses/{analysis_id}"],
		getAutofix: ["GET /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/autofix"],
		getCodeqlDatabase: ["GET /repos/{owner}/{repo}/code-scanning/codeql/databases/{language}"],
		getDefaultSetup: ["GET /repos/{owner}/{repo}/code-scanning/default-setup"],
		getSarif: ["GET /repos/{owner}/{repo}/code-scanning/sarifs/{sarif_id}"],
		getVariantAnalysis: ["GET /repos/{owner}/{repo}/code-scanning/codeql/variant-analyses/{codeql_variant_analysis_id}"],
		getVariantAnalysisRepoTask: ["GET /repos/{owner}/{repo}/code-scanning/codeql/variant-analyses/{codeql_variant_analysis_id}/repos/{repo_owner}/{repo_name}"],
		listAlertInstances: ["GET /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/instances"],
		listAlertsForOrg: ["GET /orgs/{org}/code-scanning/alerts"],
		listAlertsForRepo: ["GET /repos/{owner}/{repo}/code-scanning/alerts"],
		listAlertsInstances: [
			"GET /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/instances",
			{},
			{ renamed: ["codeScanning", "listAlertInstances"] }
		],
		listCodeqlDatabases: ["GET /repos/{owner}/{repo}/code-scanning/codeql/databases"],
		listRecentAnalyses: ["GET /repos/{owner}/{repo}/code-scanning/analyses"],
		updateAlert: ["PATCH /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}"],
		updateDefaultSetup: ["PATCH /repos/{owner}/{repo}/code-scanning/default-setup"],
		uploadSarif: ["POST /repos/{owner}/{repo}/code-scanning/sarifs"]
	},
	codeSecurity: {
		attachConfiguration: ["POST /orgs/{org}/code-security/configurations/{configuration_id}/attach"],
		attachEnterpriseConfiguration: ["POST /enterprises/{enterprise}/code-security/configurations/{configuration_id}/attach"],
		createConfiguration: ["POST /orgs/{org}/code-security/configurations"],
		createConfigurationForEnterprise: ["POST /enterprises/{enterprise}/code-security/configurations"],
		deleteConfiguration: ["DELETE /orgs/{org}/code-security/configurations/{configuration_id}"],
		deleteConfigurationForEnterprise: ["DELETE /enterprises/{enterprise}/code-security/configurations/{configuration_id}"],
		detachConfiguration: ["DELETE /orgs/{org}/code-security/configurations/detach"],
		getConfiguration: ["GET /orgs/{org}/code-security/configurations/{configuration_id}"],
		getConfigurationForRepository: ["GET /repos/{owner}/{repo}/code-security-configuration"],
		getConfigurationsForEnterprise: ["GET /enterprises/{enterprise}/code-security/configurations"],
		getConfigurationsForOrg: ["GET /orgs/{org}/code-security/configurations"],
		getDefaultConfigurations: ["GET /orgs/{org}/code-security/configurations/defaults"],
		getDefaultConfigurationsForEnterprise: ["GET /enterprises/{enterprise}/code-security/configurations/defaults"],
		getRepositoriesForConfiguration: ["GET /orgs/{org}/code-security/configurations/{configuration_id}/repositories"],
		getRepositoriesForEnterpriseConfiguration: ["GET /enterprises/{enterprise}/code-security/configurations/{configuration_id}/repositories"],
		getSingleConfigurationForEnterprise: ["GET /enterprises/{enterprise}/code-security/configurations/{configuration_id}"],
		setConfigurationAsDefault: ["PUT /orgs/{org}/code-security/configurations/{configuration_id}/defaults"],
		setConfigurationAsDefaultForEnterprise: ["PUT /enterprises/{enterprise}/code-security/configurations/{configuration_id}/defaults"],
		updateConfiguration: ["PATCH /orgs/{org}/code-security/configurations/{configuration_id}"],
		updateEnterpriseConfiguration: ["PATCH /enterprises/{enterprise}/code-security/configurations/{configuration_id}"]
	},
	codesOfConduct: {
		getAllCodesOfConduct: ["GET /codes_of_conduct"],
		getConductCode: ["GET /codes_of_conduct/{key}"]
	},
	codespaces: {
		addRepositoryForSecretForAuthenticatedUser: ["PUT /user/codespaces/secrets/{secret_name}/repositories/{repository_id}"],
		addSelectedRepoToOrgSecret: ["PUT /orgs/{org}/codespaces/secrets/{secret_name}/repositories/{repository_id}"],
		checkPermissionsForDevcontainer: ["GET /repos/{owner}/{repo}/codespaces/permissions_check"],
		codespaceMachinesForAuthenticatedUser: ["GET /user/codespaces/{codespace_name}/machines"],
		createForAuthenticatedUser: ["POST /user/codespaces"],
		createOrUpdateOrgSecret: ["PUT /orgs/{org}/codespaces/secrets/{secret_name}"],
		createOrUpdateRepoSecret: ["PUT /repos/{owner}/{repo}/codespaces/secrets/{secret_name}"],
		createOrUpdateSecretForAuthenticatedUser: ["PUT /user/codespaces/secrets/{secret_name}"],
		createWithPrForAuthenticatedUser: ["POST /repos/{owner}/{repo}/pulls/{pull_number}/codespaces"],
		createWithRepoForAuthenticatedUser: ["POST /repos/{owner}/{repo}/codespaces"],
		deleteForAuthenticatedUser: ["DELETE /user/codespaces/{codespace_name}"],
		deleteFromOrganization: ["DELETE /orgs/{org}/members/{username}/codespaces/{codespace_name}"],
		deleteOrgSecret: ["DELETE /orgs/{org}/codespaces/secrets/{secret_name}"],
		deleteRepoSecret: ["DELETE /repos/{owner}/{repo}/codespaces/secrets/{secret_name}"],
		deleteSecretForAuthenticatedUser: ["DELETE /user/codespaces/secrets/{secret_name}"],
		exportForAuthenticatedUser: ["POST /user/codespaces/{codespace_name}/exports"],
		getCodespacesForUserInOrg: ["GET /orgs/{org}/members/{username}/codespaces"],
		getExportDetailsForAuthenticatedUser: ["GET /user/codespaces/{codespace_name}/exports/{export_id}"],
		getForAuthenticatedUser: ["GET /user/codespaces/{codespace_name}"],
		getOrgPublicKey: ["GET /orgs/{org}/codespaces/secrets/public-key"],
		getOrgSecret: ["GET /orgs/{org}/codespaces/secrets/{secret_name}"],
		getPublicKeyForAuthenticatedUser: ["GET /user/codespaces/secrets/public-key"],
		getRepoPublicKey: ["GET /repos/{owner}/{repo}/codespaces/secrets/public-key"],
		getRepoSecret: ["GET /repos/{owner}/{repo}/codespaces/secrets/{secret_name}"],
		getSecretForAuthenticatedUser: ["GET /user/codespaces/secrets/{secret_name}"],
		listDevcontainersInRepositoryForAuthenticatedUser: ["GET /repos/{owner}/{repo}/codespaces/devcontainers"],
		listForAuthenticatedUser: ["GET /user/codespaces"],
		listInOrganization: [
			"GET /orgs/{org}/codespaces",
			{},
			{ renamedParameters: { org_id: "org" } }
		],
		listInRepositoryForAuthenticatedUser: ["GET /repos/{owner}/{repo}/codespaces"],
		listOrgSecrets: ["GET /orgs/{org}/codespaces/secrets"],
		listRepoSecrets: ["GET /repos/{owner}/{repo}/codespaces/secrets"],
		listRepositoriesForSecretForAuthenticatedUser: ["GET /user/codespaces/secrets/{secret_name}/repositories"],
		listSecretsForAuthenticatedUser: ["GET /user/codespaces/secrets"],
		listSelectedReposForOrgSecret: ["GET /orgs/{org}/codespaces/secrets/{secret_name}/repositories"],
		preFlightWithRepoForAuthenticatedUser: ["GET /repos/{owner}/{repo}/codespaces/new"],
		publishForAuthenticatedUser: ["POST /user/codespaces/{codespace_name}/publish"],
		removeRepositoryForSecretForAuthenticatedUser: ["DELETE /user/codespaces/secrets/{secret_name}/repositories/{repository_id}"],
		removeSelectedRepoFromOrgSecret: ["DELETE /orgs/{org}/codespaces/secrets/{secret_name}/repositories/{repository_id}"],
		repoMachinesForAuthenticatedUser: ["GET /repos/{owner}/{repo}/codespaces/machines"],
		setRepositoriesForSecretForAuthenticatedUser: ["PUT /user/codespaces/secrets/{secret_name}/repositories"],
		setSelectedReposForOrgSecret: ["PUT /orgs/{org}/codespaces/secrets/{secret_name}/repositories"],
		startForAuthenticatedUser: ["POST /user/codespaces/{codespace_name}/start"],
		stopForAuthenticatedUser: ["POST /user/codespaces/{codespace_name}/stop"],
		stopInOrganization: ["POST /orgs/{org}/members/{username}/codespaces/{codespace_name}/stop"],
		updateForAuthenticatedUser: ["PATCH /user/codespaces/{codespace_name}"]
	},
	copilot: {
		addCopilotSeatsForTeams: ["POST /orgs/{org}/copilot/billing/selected_teams"],
		addCopilotSeatsForUsers: ["POST /orgs/{org}/copilot/billing/selected_users"],
		cancelCopilotSeatAssignmentForTeams: ["DELETE /orgs/{org}/copilot/billing/selected_teams"],
		cancelCopilotSeatAssignmentForUsers: ["DELETE /orgs/{org}/copilot/billing/selected_users"],
		copilotMetricsForOrganization: ["GET /orgs/{org}/copilot/metrics"],
		copilotMetricsForTeam: ["GET /orgs/{org}/team/{team_slug}/copilot/metrics"],
		getCopilotOrganizationDetails: ["GET /orgs/{org}/copilot/billing"],
		getCopilotSeatDetailsForUser: ["GET /orgs/{org}/members/{username}/copilot"],
		listCopilotSeats: ["GET /orgs/{org}/copilot/billing/seats"]
	},
	credentials: { revoke: ["POST /credentials/revoke"] },
	dependabot: {
		addSelectedRepoToOrgSecret: ["PUT /orgs/{org}/dependabot/secrets/{secret_name}/repositories/{repository_id}"],
		createOrUpdateOrgSecret: ["PUT /orgs/{org}/dependabot/secrets/{secret_name}"],
		createOrUpdateRepoSecret: ["PUT /repos/{owner}/{repo}/dependabot/secrets/{secret_name}"],
		deleteOrgSecret: ["DELETE /orgs/{org}/dependabot/secrets/{secret_name}"],
		deleteRepoSecret: ["DELETE /repos/{owner}/{repo}/dependabot/secrets/{secret_name}"],
		getAlert: ["GET /repos/{owner}/{repo}/dependabot/alerts/{alert_number}"],
		getOrgPublicKey: ["GET /orgs/{org}/dependabot/secrets/public-key"],
		getOrgSecret: ["GET /orgs/{org}/dependabot/secrets/{secret_name}"],
		getRepoPublicKey: ["GET /repos/{owner}/{repo}/dependabot/secrets/public-key"],
		getRepoSecret: ["GET /repos/{owner}/{repo}/dependabot/secrets/{secret_name}"],
		listAlertsForEnterprise: ["GET /enterprises/{enterprise}/dependabot/alerts"],
		listAlertsForOrg: ["GET /orgs/{org}/dependabot/alerts"],
		listAlertsForRepo: ["GET /repos/{owner}/{repo}/dependabot/alerts"],
		listOrgSecrets: ["GET /orgs/{org}/dependabot/secrets"],
		listRepoSecrets: ["GET /repos/{owner}/{repo}/dependabot/secrets"],
		listSelectedReposForOrgSecret: ["GET /orgs/{org}/dependabot/secrets/{secret_name}/repositories"],
		removeSelectedRepoFromOrgSecret: ["DELETE /orgs/{org}/dependabot/secrets/{secret_name}/repositories/{repository_id}"],
		repositoryAccessForOrg: ["GET /organizations/{org}/dependabot/repository-access"],
		setRepositoryAccessDefaultLevel: ["PUT /organizations/{org}/dependabot/repository-access/default-level"],
		setSelectedReposForOrgSecret: ["PUT /orgs/{org}/dependabot/secrets/{secret_name}/repositories"],
		updateAlert: ["PATCH /repos/{owner}/{repo}/dependabot/alerts/{alert_number}"],
		updateRepositoryAccessForOrg: ["PATCH /organizations/{org}/dependabot/repository-access"]
	},
	dependencyGraph: {
		createRepositorySnapshot: ["POST /repos/{owner}/{repo}/dependency-graph/snapshots"],
		diffRange: ["GET /repos/{owner}/{repo}/dependency-graph/compare/{basehead}"],
		exportSbom: ["GET /repos/{owner}/{repo}/dependency-graph/sbom"]
	},
	emojis: { get: ["GET /emojis"] },
	enterpriseTeamMemberships: {
		add: ["PUT /enterprises/{enterprise}/teams/{enterprise-team}/memberships/{username}"],
		bulkAdd: ["POST /enterprises/{enterprise}/teams/{enterprise-team}/memberships/add"],
		bulkRemove: ["POST /enterprises/{enterprise}/teams/{enterprise-team}/memberships/remove"],
		get: ["GET /enterprises/{enterprise}/teams/{enterprise-team}/memberships/{username}"],
		list: ["GET /enterprises/{enterprise}/teams/{enterprise-team}/memberships"],
		remove: ["DELETE /enterprises/{enterprise}/teams/{enterprise-team}/memberships/{username}"]
	},
	enterpriseTeamOrganizations: {
		add: ["PUT /enterprises/{enterprise}/teams/{enterprise-team}/organizations/{org}"],
		bulkAdd: ["POST /enterprises/{enterprise}/teams/{enterprise-team}/organizations/add"],
		bulkRemove: ["POST /enterprises/{enterprise}/teams/{enterprise-team}/organizations/remove"],
		delete: ["DELETE /enterprises/{enterprise}/teams/{enterprise-team}/organizations/{org}"],
		getAssignment: ["GET /enterprises/{enterprise}/teams/{enterprise-team}/organizations/{org}"],
		getAssignments: ["GET /enterprises/{enterprise}/teams/{enterprise-team}/organizations"]
	},
	enterpriseTeams: {
		create: ["POST /enterprises/{enterprise}/teams"],
		delete: ["DELETE /enterprises/{enterprise}/teams/{team_slug}"],
		get: ["GET /enterprises/{enterprise}/teams/{team_slug}"],
		list: ["GET /enterprises/{enterprise}/teams"],
		update: ["PATCH /enterprises/{enterprise}/teams/{team_slug}"]
	},
	gists: {
		checkIsStarred: ["GET /gists/{gist_id}/star"],
		create: ["POST /gists"],
		createComment: ["POST /gists/{gist_id}/comments"],
		delete: ["DELETE /gists/{gist_id}"],
		deleteComment: ["DELETE /gists/{gist_id}/comments/{comment_id}"],
		fork: ["POST /gists/{gist_id}/forks"],
		get: ["GET /gists/{gist_id}"],
		getComment: ["GET /gists/{gist_id}/comments/{comment_id}"],
		getRevision: ["GET /gists/{gist_id}/{sha}"],
		list: ["GET /gists"],
		listComments: ["GET /gists/{gist_id}/comments"],
		listCommits: ["GET /gists/{gist_id}/commits"],
		listForUser: ["GET /users/{username}/gists"],
		listForks: ["GET /gists/{gist_id}/forks"],
		listPublic: ["GET /gists/public"],
		listStarred: ["GET /gists/starred"],
		star: ["PUT /gists/{gist_id}/star"],
		unstar: ["DELETE /gists/{gist_id}/star"],
		update: ["PATCH /gists/{gist_id}"],
		updateComment: ["PATCH /gists/{gist_id}/comments/{comment_id}"]
	},
	git: {
		createBlob: ["POST /repos/{owner}/{repo}/git/blobs"],
		createCommit: ["POST /repos/{owner}/{repo}/git/commits"],
		createRef: ["POST /repos/{owner}/{repo}/git/refs"],
		createTag: ["POST /repos/{owner}/{repo}/git/tags"],
		createTree: ["POST /repos/{owner}/{repo}/git/trees"],
		deleteRef: ["DELETE /repos/{owner}/{repo}/git/refs/{ref}"],
		getBlob: ["GET /repos/{owner}/{repo}/git/blobs/{file_sha}"],
		getCommit: ["GET /repos/{owner}/{repo}/git/commits/{commit_sha}"],
		getRef: ["GET /repos/{owner}/{repo}/git/ref/{ref}"],
		getTag: ["GET /repos/{owner}/{repo}/git/tags/{tag_sha}"],
		getTree: ["GET /repos/{owner}/{repo}/git/trees/{tree_sha}"],
		listMatchingRefs: ["GET /repos/{owner}/{repo}/git/matching-refs/{ref}"],
		updateRef: ["PATCH /repos/{owner}/{repo}/git/refs/{ref}"]
	},
	gitignore: {
		getAllTemplates: ["GET /gitignore/templates"],
		getTemplate: ["GET /gitignore/templates/{name}"]
	},
	hostedCompute: {
		createNetworkConfigurationForOrg: ["POST /orgs/{org}/settings/network-configurations"],
		deleteNetworkConfigurationFromOrg: ["DELETE /orgs/{org}/settings/network-configurations/{network_configuration_id}"],
		getNetworkConfigurationForOrg: ["GET /orgs/{org}/settings/network-configurations/{network_configuration_id}"],
		getNetworkSettingsForOrg: ["GET /orgs/{org}/settings/network-settings/{network_settings_id}"],
		listNetworkConfigurationsForOrg: ["GET /orgs/{org}/settings/network-configurations"],
		updateNetworkConfigurationForOrg: ["PATCH /orgs/{org}/settings/network-configurations/{network_configuration_id}"]
	},
	interactions: {
		getRestrictionsForAuthenticatedUser: ["GET /user/interaction-limits"],
		getRestrictionsForOrg: ["GET /orgs/{org}/interaction-limits"],
		getRestrictionsForRepo: ["GET /repos/{owner}/{repo}/interaction-limits"],
		getRestrictionsForYourPublicRepos: [
			"GET /user/interaction-limits",
			{},
			{ renamed: ["interactions", "getRestrictionsForAuthenticatedUser"] }
		],
		removeRestrictionsForAuthenticatedUser: ["DELETE /user/interaction-limits"],
		removeRestrictionsForOrg: ["DELETE /orgs/{org}/interaction-limits"],
		removeRestrictionsForRepo: ["DELETE /repos/{owner}/{repo}/interaction-limits"],
		removeRestrictionsForYourPublicRepos: [
			"DELETE /user/interaction-limits",
			{},
			{ renamed: ["interactions", "removeRestrictionsForAuthenticatedUser"] }
		],
		setRestrictionsForAuthenticatedUser: ["PUT /user/interaction-limits"],
		setRestrictionsForOrg: ["PUT /orgs/{org}/interaction-limits"],
		setRestrictionsForRepo: ["PUT /repos/{owner}/{repo}/interaction-limits"],
		setRestrictionsForYourPublicRepos: [
			"PUT /user/interaction-limits",
			{},
			{ renamed: ["interactions", "setRestrictionsForAuthenticatedUser"] }
		]
	},
	issues: {
		addAssignees: ["POST /repos/{owner}/{repo}/issues/{issue_number}/assignees"],
		addBlockedByDependency: ["POST /repos/{owner}/{repo}/issues/{issue_number}/dependencies/blocked_by"],
		addLabels: ["POST /repos/{owner}/{repo}/issues/{issue_number}/labels"],
		addSubIssue: ["POST /repos/{owner}/{repo}/issues/{issue_number}/sub_issues"],
		checkUserCanBeAssigned: ["GET /repos/{owner}/{repo}/assignees/{assignee}"],
		checkUserCanBeAssignedToIssue: ["GET /repos/{owner}/{repo}/issues/{issue_number}/assignees/{assignee}"],
		create: ["POST /repos/{owner}/{repo}/issues"],
		createComment: ["POST /repos/{owner}/{repo}/issues/{issue_number}/comments"],
		createLabel: ["POST /repos/{owner}/{repo}/labels"],
		createMilestone: ["POST /repos/{owner}/{repo}/milestones"],
		deleteComment: ["DELETE /repos/{owner}/{repo}/issues/comments/{comment_id}"],
		deleteLabel: ["DELETE /repos/{owner}/{repo}/labels/{name}"],
		deleteMilestone: ["DELETE /repos/{owner}/{repo}/milestones/{milestone_number}"],
		get: ["GET /repos/{owner}/{repo}/issues/{issue_number}"],
		getComment: ["GET /repos/{owner}/{repo}/issues/comments/{comment_id}"],
		getEvent: ["GET /repos/{owner}/{repo}/issues/events/{event_id}"],
		getLabel: ["GET /repos/{owner}/{repo}/labels/{name}"],
		getMilestone: ["GET /repos/{owner}/{repo}/milestones/{milestone_number}"],
		getParent: ["GET /repos/{owner}/{repo}/issues/{issue_number}/parent"],
		list: ["GET /issues"],
		listAssignees: ["GET /repos/{owner}/{repo}/assignees"],
		listComments: ["GET /repos/{owner}/{repo}/issues/{issue_number}/comments"],
		listCommentsForRepo: ["GET /repos/{owner}/{repo}/issues/comments"],
		listDependenciesBlockedBy: ["GET /repos/{owner}/{repo}/issues/{issue_number}/dependencies/blocked_by"],
		listDependenciesBlocking: ["GET /repos/{owner}/{repo}/issues/{issue_number}/dependencies/blocking"],
		listEvents: ["GET /repos/{owner}/{repo}/issues/{issue_number}/events"],
		listEventsForRepo: ["GET /repos/{owner}/{repo}/issues/events"],
		listEventsForTimeline: ["GET /repos/{owner}/{repo}/issues/{issue_number}/timeline"],
		listForAuthenticatedUser: ["GET /user/issues"],
		listForOrg: ["GET /orgs/{org}/issues"],
		listForRepo: ["GET /repos/{owner}/{repo}/issues"],
		listLabelsForMilestone: ["GET /repos/{owner}/{repo}/milestones/{milestone_number}/labels"],
		listLabelsForRepo: ["GET /repos/{owner}/{repo}/labels"],
		listLabelsOnIssue: ["GET /repos/{owner}/{repo}/issues/{issue_number}/labels"],
		listMilestones: ["GET /repos/{owner}/{repo}/milestones"],
		listSubIssues: ["GET /repos/{owner}/{repo}/issues/{issue_number}/sub_issues"],
		lock: ["PUT /repos/{owner}/{repo}/issues/{issue_number}/lock"],
		removeAllLabels: ["DELETE /repos/{owner}/{repo}/issues/{issue_number}/labels"],
		removeAssignees: ["DELETE /repos/{owner}/{repo}/issues/{issue_number}/assignees"],
		removeDependencyBlockedBy: ["DELETE /repos/{owner}/{repo}/issues/{issue_number}/dependencies/blocked_by/{issue_id}"],
		removeLabel: ["DELETE /repos/{owner}/{repo}/issues/{issue_number}/labels/{name}"],
		removeSubIssue: ["DELETE /repos/{owner}/{repo}/issues/{issue_number}/sub_issue"],
		reprioritizeSubIssue: ["PATCH /repos/{owner}/{repo}/issues/{issue_number}/sub_issues/priority"],
		setLabels: ["PUT /repos/{owner}/{repo}/issues/{issue_number}/labels"],
		unlock: ["DELETE /repos/{owner}/{repo}/issues/{issue_number}/lock"],
		update: ["PATCH /repos/{owner}/{repo}/issues/{issue_number}"],
		updateComment: ["PATCH /repos/{owner}/{repo}/issues/comments/{comment_id}"],
		updateLabel: ["PATCH /repos/{owner}/{repo}/labels/{name}"],
		updateMilestone: ["PATCH /repos/{owner}/{repo}/milestones/{milestone_number}"]
	},
	licenses: {
		get: ["GET /licenses/{license}"],
		getAllCommonlyUsed: ["GET /licenses"],
		getForRepo: ["GET /repos/{owner}/{repo}/license"]
	},
	markdown: {
		render: ["POST /markdown"],
		renderRaw: ["POST /markdown/raw", { headers: { "content-type": "text/plain; charset=utf-8" } }]
	},
	meta: {
		get: ["GET /meta"],
		getAllVersions: ["GET /versions"],
		getOctocat: ["GET /octocat"],
		getZen: ["GET /zen"],
		root: ["GET /"]
	},
	migrations: {
		deleteArchiveForAuthenticatedUser: ["DELETE /user/migrations/{migration_id}/archive"],
		deleteArchiveForOrg: ["DELETE /orgs/{org}/migrations/{migration_id}/archive"],
		downloadArchiveForOrg: ["GET /orgs/{org}/migrations/{migration_id}/archive"],
		getArchiveForAuthenticatedUser: ["GET /user/migrations/{migration_id}/archive"],
		getStatusForAuthenticatedUser: ["GET /user/migrations/{migration_id}"],
		getStatusForOrg: ["GET /orgs/{org}/migrations/{migration_id}"],
		listForAuthenticatedUser: ["GET /user/migrations"],
		listForOrg: ["GET /orgs/{org}/migrations"],
		listReposForAuthenticatedUser: ["GET /user/migrations/{migration_id}/repositories"],
		listReposForOrg: ["GET /orgs/{org}/migrations/{migration_id}/repositories"],
		listReposForUser: [
			"GET /user/migrations/{migration_id}/repositories",
			{},
			{ renamed: ["migrations", "listReposForAuthenticatedUser"] }
		],
		startForAuthenticatedUser: ["POST /user/migrations"],
		startForOrg: ["POST /orgs/{org}/migrations"],
		unlockRepoForAuthenticatedUser: ["DELETE /user/migrations/{migration_id}/repos/{repo_name}/lock"],
		unlockRepoForOrg: ["DELETE /orgs/{org}/migrations/{migration_id}/repos/{repo_name}/lock"]
	},
	oidc: {
		getOidcCustomSubTemplateForOrg: ["GET /orgs/{org}/actions/oidc/customization/sub"],
		updateOidcCustomSubTemplateForOrg: ["PUT /orgs/{org}/actions/oidc/customization/sub"]
	},
	orgs: {
		addSecurityManagerTeam: [
			"PUT /orgs/{org}/security-managers/teams/{team_slug}",
			{},
			{ deprecated: "octokit.rest.orgs.addSecurityManagerTeam() is deprecated, see https://docs.github.com/rest/orgs/security-managers#add-a-security-manager-team" }
		],
		assignTeamToOrgRole: ["PUT /orgs/{org}/organization-roles/teams/{team_slug}/{role_id}"],
		assignUserToOrgRole: ["PUT /orgs/{org}/organization-roles/users/{username}/{role_id}"],
		blockUser: ["PUT /orgs/{org}/blocks/{username}"],
		cancelInvitation: ["DELETE /orgs/{org}/invitations/{invitation_id}"],
		checkBlockedUser: ["GET /orgs/{org}/blocks/{username}"],
		checkMembershipForUser: ["GET /orgs/{org}/members/{username}"],
		checkPublicMembershipForUser: ["GET /orgs/{org}/public_members/{username}"],
		convertMemberToOutsideCollaborator: ["PUT /orgs/{org}/outside_collaborators/{username}"],
		createArtifactStorageRecord: ["POST /orgs/{org}/artifacts/metadata/storage-record"],
		createInvitation: ["POST /orgs/{org}/invitations"],
		createIssueType: ["POST /orgs/{org}/issue-types"],
		createWebhook: ["POST /orgs/{org}/hooks"],
		customPropertiesForOrgsCreateOrUpdateOrganizationValues: ["PATCH /organizations/{org}/org-properties/values"],
		customPropertiesForOrgsGetOrganizationValues: ["GET /organizations/{org}/org-properties/values"],
		customPropertiesForReposCreateOrUpdateOrganizationDefinition: ["PUT /orgs/{org}/properties/schema/{custom_property_name}"],
		customPropertiesForReposCreateOrUpdateOrganizationDefinitions: ["PATCH /orgs/{org}/properties/schema"],
		customPropertiesForReposCreateOrUpdateOrganizationValues: ["PATCH /orgs/{org}/properties/values"],
		customPropertiesForReposDeleteOrganizationDefinition: ["DELETE /orgs/{org}/properties/schema/{custom_property_name}"],
		customPropertiesForReposGetOrganizationDefinition: ["GET /orgs/{org}/properties/schema/{custom_property_name}"],
		customPropertiesForReposGetOrganizationDefinitions: ["GET /orgs/{org}/properties/schema"],
		customPropertiesForReposGetOrganizationValues: ["GET /orgs/{org}/properties/values"],
		delete: ["DELETE /orgs/{org}"],
		deleteAttestationsBulk: ["POST /orgs/{org}/attestations/delete-request"],
		deleteAttestationsById: ["DELETE /orgs/{org}/attestations/{attestation_id}"],
		deleteAttestationsBySubjectDigest: ["DELETE /orgs/{org}/attestations/digest/{subject_digest}"],
		deleteIssueType: ["DELETE /orgs/{org}/issue-types/{issue_type_id}"],
		deleteWebhook: ["DELETE /orgs/{org}/hooks/{hook_id}"],
		disableSelectedRepositoryImmutableReleasesOrganization: ["DELETE /orgs/{org}/settings/immutable-releases/repositories/{repository_id}"],
		enableSelectedRepositoryImmutableReleasesOrganization: ["PUT /orgs/{org}/settings/immutable-releases/repositories/{repository_id}"],
		get: ["GET /orgs/{org}"],
		getImmutableReleasesSettings: ["GET /orgs/{org}/settings/immutable-releases"],
		getImmutableReleasesSettingsRepositories: ["GET /orgs/{org}/settings/immutable-releases/repositories"],
		getMembershipForAuthenticatedUser: ["GET /user/memberships/orgs/{org}"],
		getMembershipForUser: ["GET /orgs/{org}/memberships/{username}"],
		getOrgRole: ["GET /orgs/{org}/organization-roles/{role_id}"],
		getOrgRulesetHistory: ["GET /orgs/{org}/rulesets/{ruleset_id}/history"],
		getOrgRulesetVersion: ["GET /orgs/{org}/rulesets/{ruleset_id}/history/{version_id}"],
		getWebhook: ["GET /orgs/{org}/hooks/{hook_id}"],
		getWebhookConfigForOrg: ["GET /orgs/{org}/hooks/{hook_id}/config"],
		getWebhookDelivery: ["GET /orgs/{org}/hooks/{hook_id}/deliveries/{delivery_id}"],
		list: ["GET /organizations"],
		listAppInstallations: ["GET /orgs/{org}/installations"],
		listArtifactStorageRecords: ["GET /orgs/{org}/artifacts/{subject_digest}/metadata/storage-records"],
		listAttestationRepositories: ["GET /orgs/{org}/attestations/repositories"],
		listAttestations: ["GET /orgs/{org}/attestations/{subject_digest}"],
		listAttestationsBulk: ["POST /orgs/{org}/attestations/bulk-list{?per_page,before,after}"],
		listBlockedUsers: ["GET /orgs/{org}/blocks"],
		listFailedInvitations: ["GET /orgs/{org}/failed_invitations"],
		listForAuthenticatedUser: ["GET /user/orgs"],
		listForUser: ["GET /users/{username}/orgs"],
		listInvitationTeams: ["GET /orgs/{org}/invitations/{invitation_id}/teams"],
		listIssueTypes: ["GET /orgs/{org}/issue-types"],
		listMembers: ["GET /orgs/{org}/members"],
		listMembershipsForAuthenticatedUser: ["GET /user/memberships/orgs"],
		listOrgRoleTeams: ["GET /orgs/{org}/organization-roles/{role_id}/teams"],
		listOrgRoleUsers: ["GET /orgs/{org}/organization-roles/{role_id}/users"],
		listOrgRoles: ["GET /orgs/{org}/organization-roles"],
		listOrganizationFineGrainedPermissions: ["GET /orgs/{org}/organization-fine-grained-permissions"],
		listOutsideCollaborators: ["GET /orgs/{org}/outside_collaborators"],
		listPatGrantRepositories: ["GET /orgs/{org}/personal-access-tokens/{pat_id}/repositories"],
		listPatGrantRequestRepositories: ["GET /orgs/{org}/personal-access-token-requests/{pat_request_id}/repositories"],
		listPatGrantRequests: ["GET /orgs/{org}/personal-access-token-requests"],
		listPatGrants: ["GET /orgs/{org}/personal-access-tokens"],
		listPendingInvitations: ["GET /orgs/{org}/invitations"],
		listPublicMembers: ["GET /orgs/{org}/public_members"],
		listSecurityManagerTeams: [
			"GET /orgs/{org}/security-managers",
			{},
			{ deprecated: "octokit.rest.orgs.listSecurityManagerTeams() is deprecated, see https://docs.github.com/rest/orgs/security-managers#list-security-manager-teams" }
		],
		listWebhookDeliveries: ["GET /orgs/{org}/hooks/{hook_id}/deliveries"],
		listWebhooks: ["GET /orgs/{org}/hooks"],
		pingWebhook: ["POST /orgs/{org}/hooks/{hook_id}/pings"],
		redeliverWebhookDelivery: ["POST /orgs/{org}/hooks/{hook_id}/deliveries/{delivery_id}/attempts"],
		removeMember: ["DELETE /orgs/{org}/members/{username}"],
		removeMembershipForUser: ["DELETE /orgs/{org}/memberships/{username}"],
		removeOutsideCollaborator: ["DELETE /orgs/{org}/outside_collaborators/{username}"],
		removePublicMembershipForAuthenticatedUser: ["DELETE /orgs/{org}/public_members/{username}"],
		removeSecurityManagerTeam: [
			"DELETE /orgs/{org}/security-managers/teams/{team_slug}",
			{},
			{ deprecated: "octokit.rest.orgs.removeSecurityManagerTeam() is deprecated, see https://docs.github.com/rest/orgs/security-managers#remove-a-security-manager-team" }
		],
		reviewPatGrantRequest: ["POST /orgs/{org}/personal-access-token-requests/{pat_request_id}"],
		reviewPatGrantRequestsInBulk: ["POST /orgs/{org}/personal-access-token-requests"],
		revokeAllOrgRolesTeam: ["DELETE /orgs/{org}/organization-roles/teams/{team_slug}"],
		revokeAllOrgRolesUser: ["DELETE /orgs/{org}/organization-roles/users/{username}"],
		revokeOrgRoleTeam: ["DELETE /orgs/{org}/organization-roles/teams/{team_slug}/{role_id}"],
		revokeOrgRoleUser: ["DELETE /orgs/{org}/organization-roles/users/{username}/{role_id}"],
		setImmutableReleasesSettings: ["PUT /orgs/{org}/settings/immutable-releases"],
		setImmutableReleasesSettingsRepositories: ["PUT /orgs/{org}/settings/immutable-releases/repositories"],
		setMembershipForUser: ["PUT /orgs/{org}/memberships/{username}"],
		setPublicMembershipForAuthenticatedUser: ["PUT /orgs/{org}/public_members/{username}"],
		unblockUser: ["DELETE /orgs/{org}/blocks/{username}"],
		update: ["PATCH /orgs/{org}"],
		updateIssueType: ["PUT /orgs/{org}/issue-types/{issue_type_id}"],
		updateMembershipForAuthenticatedUser: ["PATCH /user/memberships/orgs/{org}"],
		updatePatAccess: ["POST /orgs/{org}/personal-access-tokens/{pat_id}"],
		updatePatAccesses: ["POST /orgs/{org}/personal-access-tokens"],
		updateWebhook: ["PATCH /orgs/{org}/hooks/{hook_id}"],
		updateWebhookConfigForOrg: ["PATCH /orgs/{org}/hooks/{hook_id}/config"]
	},
	packages: {
		deletePackageForAuthenticatedUser: ["DELETE /user/packages/{package_type}/{package_name}"],
		deletePackageForOrg: ["DELETE /orgs/{org}/packages/{package_type}/{package_name}"],
		deletePackageForUser: ["DELETE /users/{username}/packages/{package_type}/{package_name}"],
		deletePackageVersionForAuthenticatedUser: ["DELETE /user/packages/{package_type}/{package_name}/versions/{package_version_id}"],
		deletePackageVersionForOrg: ["DELETE /orgs/{org}/packages/{package_type}/{package_name}/versions/{package_version_id}"],
		deletePackageVersionForUser: ["DELETE /users/{username}/packages/{package_type}/{package_name}/versions/{package_version_id}"],
		getAllPackageVersionsForAPackageOwnedByAnOrg: [
			"GET /orgs/{org}/packages/{package_type}/{package_name}/versions",
			{},
			{ renamed: ["packages", "getAllPackageVersionsForPackageOwnedByOrg"] }
		],
		getAllPackageVersionsForAPackageOwnedByTheAuthenticatedUser: [
			"GET /user/packages/{package_type}/{package_name}/versions",
			{},
			{ renamed: ["packages", "getAllPackageVersionsForPackageOwnedByAuthenticatedUser"] }
		],
		getAllPackageVersionsForPackageOwnedByAuthenticatedUser: ["GET /user/packages/{package_type}/{package_name}/versions"],
		getAllPackageVersionsForPackageOwnedByOrg: ["GET /orgs/{org}/packages/{package_type}/{package_name}/versions"],
		getAllPackageVersionsForPackageOwnedByUser: ["GET /users/{username}/packages/{package_type}/{package_name}/versions"],
		getPackageForAuthenticatedUser: ["GET /user/packages/{package_type}/{package_name}"],
		getPackageForOrganization: ["GET /orgs/{org}/packages/{package_type}/{package_name}"],
		getPackageForUser: ["GET /users/{username}/packages/{package_type}/{package_name}"],
		getPackageVersionForAuthenticatedUser: ["GET /user/packages/{package_type}/{package_name}/versions/{package_version_id}"],
		getPackageVersionForOrganization: ["GET /orgs/{org}/packages/{package_type}/{package_name}/versions/{package_version_id}"],
		getPackageVersionForUser: ["GET /users/{username}/packages/{package_type}/{package_name}/versions/{package_version_id}"],
		listDockerMigrationConflictingPackagesForAuthenticatedUser: ["GET /user/docker/conflicts"],
		listDockerMigrationConflictingPackagesForOrganization: ["GET /orgs/{org}/docker/conflicts"],
		listDockerMigrationConflictingPackagesForUser: ["GET /users/{username}/docker/conflicts"],
		listPackagesForAuthenticatedUser: ["GET /user/packages"],
		listPackagesForOrganization: ["GET /orgs/{org}/packages"],
		listPackagesForUser: ["GET /users/{username}/packages"],
		restorePackageForAuthenticatedUser: ["POST /user/packages/{package_type}/{package_name}/restore{?token}"],
		restorePackageForOrg: ["POST /orgs/{org}/packages/{package_type}/{package_name}/restore{?token}"],
		restorePackageForUser: ["POST /users/{username}/packages/{package_type}/{package_name}/restore{?token}"],
		restorePackageVersionForAuthenticatedUser: ["POST /user/packages/{package_type}/{package_name}/versions/{package_version_id}/restore"],
		restorePackageVersionForOrg: ["POST /orgs/{org}/packages/{package_type}/{package_name}/versions/{package_version_id}/restore"],
		restorePackageVersionForUser: ["POST /users/{username}/packages/{package_type}/{package_name}/versions/{package_version_id}/restore"]
	},
	privateRegistries: {
		createOrgPrivateRegistry: ["POST /orgs/{org}/private-registries"],
		deleteOrgPrivateRegistry: ["DELETE /orgs/{org}/private-registries/{secret_name}"],
		getOrgPrivateRegistry: ["GET /orgs/{org}/private-registries/{secret_name}"],
		getOrgPublicKey: ["GET /orgs/{org}/private-registries/public-key"],
		listOrgPrivateRegistries: ["GET /orgs/{org}/private-registries"],
		updateOrgPrivateRegistry: ["PATCH /orgs/{org}/private-registries/{secret_name}"]
	},
	projects: {
		addItemForOrg: ["POST /orgs/{org}/projectsV2/{project_number}/items"],
		addItemForUser: ["POST /users/{username}/projectsV2/{project_number}/items"],
		deleteItemForOrg: ["DELETE /orgs/{org}/projectsV2/{project_number}/items/{item_id}"],
		deleteItemForUser: ["DELETE /users/{username}/projectsV2/{project_number}/items/{item_id}"],
		getFieldForOrg: ["GET /orgs/{org}/projectsV2/{project_number}/fields/{field_id}"],
		getFieldForUser: ["GET /users/{username}/projectsV2/{project_number}/fields/{field_id}"],
		getForOrg: ["GET /orgs/{org}/projectsV2/{project_number}"],
		getForUser: ["GET /users/{username}/projectsV2/{project_number}"],
		getOrgItem: ["GET /orgs/{org}/projectsV2/{project_number}/items/{item_id}"],
		getUserItem: ["GET /users/{username}/projectsV2/{project_number}/items/{item_id}"],
		listFieldsForOrg: ["GET /orgs/{org}/projectsV2/{project_number}/fields"],
		listFieldsForUser: ["GET /users/{username}/projectsV2/{project_number}/fields"],
		listForOrg: ["GET /orgs/{org}/projectsV2"],
		listForUser: ["GET /users/{username}/projectsV2"],
		listItemsForOrg: ["GET /orgs/{org}/projectsV2/{project_number}/items"],
		listItemsForUser: ["GET /users/{username}/projectsV2/{project_number}/items"],
		updateItemForOrg: ["PATCH /orgs/{org}/projectsV2/{project_number}/items/{item_id}"],
		updateItemForUser: ["PATCH /users/{username}/projectsV2/{project_number}/items/{item_id}"]
	},
	pulls: {
		checkIfMerged: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/merge"],
		create: ["POST /repos/{owner}/{repo}/pulls"],
		createReplyForReviewComment: ["POST /repos/{owner}/{repo}/pulls/{pull_number}/comments/{comment_id}/replies"],
		createReview: ["POST /repos/{owner}/{repo}/pulls/{pull_number}/reviews"],
		createReviewComment: ["POST /repos/{owner}/{repo}/pulls/{pull_number}/comments"],
		deletePendingReview: ["DELETE /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}"],
		deleteReviewComment: ["DELETE /repos/{owner}/{repo}/pulls/comments/{comment_id}"],
		dismissReview: ["PUT /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/dismissals"],
		get: ["GET /repos/{owner}/{repo}/pulls/{pull_number}"],
		getReview: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}"],
		getReviewComment: ["GET /repos/{owner}/{repo}/pulls/comments/{comment_id}"],
		list: ["GET /repos/{owner}/{repo}/pulls"],
		listCommentsForReview: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/comments"],
		listCommits: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/commits"],
		listFiles: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/files"],
		listRequestedReviewers: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers"],
		listReviewComments: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/comments"],
		listReviewCommentsForRepo: ["GET /repos/{owner}/{repo}/pulls/comments"],
		listReviews: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews"],
		merge: ["PUT /repos/{owner}/{repo}/pulls/{pull_number}/merge"],
		removeRequestedReviewers: ["DELETE /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers"],
		requestReviewers: ["POST /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers"],
		submitReview: ["POST /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/events"],
		update: ["PATCH /repos/{owner}/{repo}/pulls/{pull_number}"],
		updateBranch: ["PUT /repos/{owner}/{repo}/pulls/{pull_number}/update-branch"],
		updateReview: ["PUT /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}"],
		updateReviewComment: ["PATCH /repos/{owner}/{repo}/pulls/comments/{comment_id}"]
	},
	rateLimit: { get: ["GET /rate_limit"] },
	reactions: {
		createForCommitComment: ["POST /repos/{owner}/{repo}/comments/{comment_id}/reactions"],
		createForIssue: ["POST /repos/{owner}/{repo}/issues/{issue_number}/reactions"],
		createForIssueComment: ["POST /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions"],
		createForPullRequestReviewComment: ["POST /repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions"],
		createForRelease: ["POST /repos/{owner}/{repo}/releases/{release_id}/reactions"],
		createForTeamDiscussionCommentInOrg: ["POST /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}/reactions"],
		createForTeamDiscussionInOrg: ["POST /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/reactions"],
		deleteForCommitComment: ["DELETE /repos/{owner}/{repo}/comments/{comment_id}/reactions/{reaction_id}"],
		deleteForIssue: ["DELETE /repos/{owner}/{repo}/issues/{issue_number}/reactions/{reaction_id}"],
		deleteForIssueComment: ["DELETE /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions/{reaction_id}"],
		deleteForPullRequestComment: ["DELETE /repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions/{reaction_id}"],
		deleteForRelease: ["DELETE /repos/{owner}/{repo}/releases/{release_id}/reactions/{reaction_id}"],
		deleteForTeamDiscussion: ["DELETE /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/reactions/{reaction_id}"],
		deleteForTeamDiscussionComment: ["DELETE /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}/reactions/{reaction_id}"],
		listForCommitComment: ["GET /repos/{owner}/{repo}/comments/{comment_id}/reactions"],
		listForIssue: ["GET /repos/{owner}/{repo}/issues/{issue_number}/reactions"],
		listForIssueComment: ["GET /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions"],
		listForPullRequestReviewComment: ["GET /repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions"],
		listForRelease: ["GET /repos/{owner}/{repo}/releases/{release_id}/reactions"],
		listForTeamDiscussionCommentInOrg: ["GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}/reactions"],
		listForTeamDiscussionInOrg: ["GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/reactions"]
	},
	repos: {
		acceptInvitation: [
			"PATCH /user/repository_invitations/{invitation_id}",
			{},
			{ renamed: ["repos", "acceptInvitationForAuthenticatedUser"] }
		],
		acceptInvitationForAuthenticatedUser: ["PATCH /user/repository_invitations/{invitation_id}"],
		addAppAccessRestrictions: [
			"POST /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps",
			{},
			{ mapToData: "apps" }
		],
		addCollaborator: ["PUT /repos/{owner}/{repo}/collaborators/{username}"],
		addStatusCheckContexts: [
			"POST /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts",
			{},
			{ mapToData: "contexts" }
		],
		addTeamAccessRestrictions: [
			"POST /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams",
			{},
			{ mapToData: "teams" }
		],
		addUserAccessRestrictions: [
			"POST /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users",
			{},
			{ mapToData: "users" }
		],
		cancelPagesDeployment: ["POST /repos/{owner}/{repo}/pages/deployments/{pages_deployment_id}/cancel"],
		checkAutomatedSecurityFixes: ["GET /repos/{owner}/{repo}/automated-security-fixes"],
		checkCollaborator: ["GET /repos/{owner}/{repo}/collaborators/{username}"],
		checkImmutableReleases: ["GET /repos/{owner}/{repo}/immutable-releases"],
		checkPrivateVulnerabilityReporting: ["GET /repos/{owner}/{repo}/private-vulnerability-reporting"],
		checkVulnerabilityAlerts: ["GET /repos/{owner}/{repo}/vulnerability-alerts"],
		codeownersErrors: ["GET /repos/{owner}/{repo}/codeowners/errors"],
		compareCommits: ["GET /repos/{owner}/{repo}/compare/{base}...{head}"],
		compareCommitsWithBasehead: ["GET /repos/{owner}/{repo}/compare/{basehead}"],
		createAttestation: ["POST /repos/{owner}/{repo}/attestations"],
		createAutolink: ["POST /repos/{owner}/{repo}/autolinks"],
		createCommitComment: ["POST /repos/{owner}/{repo}/commits/{commit_sha}/comments"],
		createCommitSignatureProtection: ["POST /repos/{owner}/{repo}/branches/{branch}/protection/required_signatures"],
		createCommitStatus: ["POST /repos/{owner}/{repo}/statuses/{sha}"],
		createDeployKey: ["POST /repos/{owner}/{repo}/keys"],
		createDeployment: ["POST /repos/{owner}/{repo}/deployments"],
		createDeploymentBranchPolicy: ["POST /repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies"],
		createDeploymentProtectionRule: ["POST /repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules"],
		createDeploymentStatus: ["POST /repos/{owner}/{repo}/deployments/{deployment_id}/statuses"],
		createDispatchEvent: ["POST /repos/{owner}/{repo}/dispatches"],
		createForAuthenticatedUser: ["POST /user/repos"],
		createFork: ["POST /repos/{owner}/{repo}/forks"],
		createInOrg: ["POST /orgs/{org}/repos"],
		createOrUpdateEnvironment: ["PUT /repos/{owner}/{repo}/environments/{environment_name}"],
		createOrUpdateFileContents: ["PUT /repos/{owner}/{repo}/contents/{path}"],
		createOrgRuleset: ["POST /orgs/{org}/rulesets"],
		createPagesDeployment: ["POST /repos/{owner}/{repo}/pages/deployments"],
		createPagesSite: ["POST /repos/{owner}/{repo}/pages"],
		createRelease: ["POST /repos/{owner}/{repo}/releases"],
		createRepoRuleset: ["POST /repos/{owner}/{repo}/rulesets"],
		createUsingTemplate: ["POST /repos/{template_owner}/{template_repo}/generate"],
		createWebhook: ["POST /repos/{owner}/{repo}/hooks"],
		customPropertiesForReposCreateOrUpdateRepositoryValues: ["PATCH /repos/{owner}/{repo}/properties/values"],
		customPropertiesForReposGetRepositoryValues: ["GET /repos/{owner}/{repo}/properties/values"],
		declineInvitation: [
			"DELETE /user/repository_invitations/{invitation_id}",
			{},
			{ renamed: ["repos", "declineInvitationForAuthenticatedUser"] }
		],
		declineInvitationForAuthenticatedUser: ["DELETE /user/repository_invitations/{invitation_id}"],
		delete: ["DELETE /repos/{owner}/{repo}"],
		deleteAccessRestrictions: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions"],
		deleteAdminBranchProtection: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins"],
		deleteAnEnvironment: ["DELETE /repos/{owner}/{repo}/environments/{environment_name}"],
		deleteAutolink: ["DELETE /repos/{owner}/{repo}/autolinks/{autolink_id}"],
		deleteBranchProtection: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection"],
		deleteCommitComment: ["DELETE /repos/{owner}/{repo}/comments/{comment_id}"],
		deleteCommitSignatureProtection: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_signatures"],
		deleteDeployKey: ["DELETE /repos/{owner}/{repo}/keys/{key_id}"],
		deleteDeployment: ["DELETE /repos/{owner}/{repo}/deployments/{deployment_id}"],
		deleteDeploymentBranchPolicy: ["DELETE /repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies/{branch_policy_id}"],
		deleteFile: ["DELETE /repos/{owner}/{repo}/contents/{path}"],
		deleteInvitation: ["DELETE /repos/{owner}/{repo}/invitations/{invitation_id}"],
		deleteOrgRuleset: ["DELETE /orgs/{org}/rulesets/{ruleset_id}"],
		deletePagesSite: ["DELETE /repos/{owner}/{repo}/pages"],
		deletePullRequestReviewProtection: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews"],
		deleteRelease: ["DELETE /repos/{owner}/{repo}/releases/{release_id}"],
		deleteReleaseAsset: ["DELETE /repos/{owner}/{repo}/releases/assets/{asset_id}"],
		deleteRepoRuleset: ["DELETE /repos/{owner}/{repo}/rulesets/{ruleset_id}"],
		deleteWebhook: ["DELETE /repos/{owner}/{repo}/hooks/{hook_id}"],
		disableAutomatedSecurityFixes: ["DELETE /repos/{owner}/{repo}/automated-security-fixes"],
		disableDeploymentProtectionRule: ["DELETE /repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules/{protection_rule_id}"],
		disableImmutableReleases: ["DELETE /repos/{owner}/{repo}/immutable-releases"],
		disablePrivateVulnerabilityReporting: ["DELETE /repos/{owner}/{repo}/private-vulnerability-reporting"],
		disableVulnerabilityAlerts: ["DELETE /repos/{owner}/{repo}/vulnerability-alerts"],
		downloadArchive: [
			"GET /repos/{owner}/{repo}/zipball/{ref}",
			{},
			{ renamed: ["repos", "downloadZipballArchive"] }
		],
		downloadTarballArchive: ["GET /repos/{owner}/{repo}/tarball/{ref}"],
		downloadZipballArchive: ["GET /repos/{owner}/{repo}/zipball/{ref}"],
		enableAutomatedSecurityFixes: ["PUT /repos/{owner}/{repo}/automated-security-fixes"],
		enableImmutableReleases: ["PUT /repos/{owner}/{repo}/immutable-releases"],
		enablePrivateVulnerabilityReporting: ["PUT /repos/{owner}/{repo}/private-vulnerability-reporting"],
		enableVulnerabilityAlerts: ["PUT /repos/{owner}/{repo}/vulnerability-alerts"],
		generateReleaseNotes: ["POST /repos/{owner}/{repo}/releases/generate-notes"],
		get: ["GET /repos/{owner}/{repo}"],
		getAccessRestrictions: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions"],
		getAdminBranchProtection: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins"],
		getAllDeploymentProtectionRules: ["GET /repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules"],
		getAllEnvironments: ["GET /repos/{owner}/{repo}/environments"],
		getAllStatusCheckContexts: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts"],
		getAllTopics: ["GET /repos/{owner}/{repo}/topics"],
		getAppsWithAccessToProtectedBranch: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps"],
		getAutolink: ["GET /repos/{owner}/{repo}/autolinks/{autolink_id}"],
		getBranch: ["GET /repos/{owner}/{repo}/branches/{branch}"],
		getBranchProtection: ["GET /repos/{owner}/{repo}/branches/{branch}/protection"],
		getBranchRules: ["GET /repos/{owner}/{repo}/rules/branches/{branch}"],
		getClones: ["GET /repos/{owner}/{repo}/traffic/clones"],
		getCodeFrequencyStats: ["GET /repos/{owner}/{repo}/stats/code_frequency"],
		getCollaboratorPermissionLevel: ["GET /repos/{owner}/{repo}/collaborators/{username}/permission"],
		getCombinedStatusForRef: ["GET /repos/{owner}/{repo}/commits/{ref}/status"],
		getCommit: ["GET /repos/{owner}/{repo}/commits/{ref}"],
		getCommitActivityStats: ["GET /repos/{owner}/{repo}/stats/commit_activity"],
		getCommitComment: ["GET /repos/{owner}/{repo}/comments/{comment_id}"],
		getCommitSignatureProtection: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/required_signatures"],
		getCommunityProfileMetrics: ["GET /repos/{owner}/{repo}/community/profile"],
		getContent: ["GET /repos/{owner}/{repo}/contents/{path}"],
		getContributorsStats: ["GET /repos/{owner}/{repo}/stats/contributors"],
		getCustomDeploymentProtectionRule: ["GET /repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules/{protection_rule_id}"],
		getDeployKey: ["GET /repos/{owner}/{repo}/keys/{key_id}"],
		getDeployment: ["GET /repos/{owner}/{repo}/deployments/{deployment_id}"],
		getDeploymentBranchPolicy: ["GET /repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies/{branch_policy_id}"],
		getDeploymentStatus: ["GET /repos/{owner}/{repo}/deployments/{deployment_id}/statuses/{status_id}"],
		getEnvironment: ["GET /repos/{owner}/{repo}/environments/{environment_name}"],
		getLatestPagesBuild: ["GET /repos/{owner}/{repo}/pages/builds/latest"],
		getLatestRelease: ["GET /repos/{owner}/{repo}/releases/latest"],
		getOrgRuleSuite: ["GET /orgs/{org}/rulesets/rule-suites/{rule_suite_id}"],
		getOrgRuleSuites: ["GET /orgs/{org}/rulesets/rule-suites"],
		getOrgRuleset: ["GET /orgs/{org}/rulesets/{ruleset_id}"],
		getOrgRulesets: ["GET /orgs/{org}/rulesets"],
		getPages: ["GET /repos/{owner}/{repo}/pages"],
		getPagesBuild: ["GET /repos/{owner}/{repo}/pages/builds/{build_id}"],
		getPagesDeployment: ["GET /repos/{owner}/{repo}/pages/deployments/{pages_deployment_id}"],
		getPagesHealthCheck: ["GET /repos/{owner}/{repo}/pages/health"],
		getParticipationStats: ["GET /repos/{owner}/{repo}/stats/participation"],
		getPullRequestReviewProtection: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews"],
		getPunchCardStats: ["GET /repos/{owner}/{repo}/stats/punch_card"],
		getReadme: ["GET /repos/{owner}/{repo}/readme"],
		getReadmeInDirectory: ["GET /repos/{owner}/{repo}/readme/{dir}"],
		getRelease: ["GET /repos/{owner}/{repo}/releases/{release_id}"],
		getReleaseAsset: ["GET /repos/{owner}/{repo}/releases/assets/{asset_id}"],
		getReleaseByTag: ["GET /repos/{owner}/{repo}/releases/tags/{tag}"],
		getRepoRuleSuite: ["GET /repos/{owner}/{repo}/rulesets/rule-suites/{rule_suite_id}"],
		getRepoRuleSuites: ["GET /repos/{owner}/{repo}/rulesets/rule-suites"],
		getRepoRuleset: ["GET /repos/{owner}/{repo}/rulesets/{ruleset_id}"],
		getRepoRulesetHistory: ["GET /repos/{owner}/{repo}/rulesets/{ruleset_id}/history"],
		getRepoRulesetVersion: ["GET /repos/{owner}/{repo}/rulesets/{ruleset_id}/history/{version_id}"],
		getRepoRulesets: ["GET /repos/{owner}/{repo}/rulesets"],
		getStatusChecksProtection: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks"],
		getTeamsWithAccessToProtectedBranch: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams"],
		getTopPaths: ["GET /repos/{owner}/{repo}/traffic/popular/paths"],
		getTopReferrers: ["GET /repos/{owner}/{repo}/traffic/popular/referrers"],
		getUsersWithAccessToProtectedBranch: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users"],
		getViews: ["GET /repos/{owner}/{repo}/traffic/views"],
		getWebhook: ["GET /repos/{owner}/{repo}/hooks/{hook_id}"],
		getWebhookConfigForRepo: ["GET /repos/{owner}/{repo}/hooks/{hook_id}/config"],
		getWebhookDelivery: ["GET /repos/{owner}/{repo}/hooks/{hook_id}/deliveries/{delivery_id}"],
		listActivities: ["GET /repos/{owner}/{repo}/activity"],
		listAttestations: ["GET /repos/{owner}/{repo}/attestations/{subject_digest}"],
		listAutolinks: ["GET /repos/{owner}/{repo}/autolinks"],
		listBranches: ["GET /repos/{owner}/{repo}/branches"],
		listBranchesForHeadCommit: ["GET /repos/{owner}/{repo}/commits/{commit_sha}/branches-where-head"],
		listCollaborators: ["GET /repos/{owner}/{repo}/collaborators"],
		listCommentsForCommit: ["GET /repos/{owner}/{repo}/commits/{commit_sha}/comments"],
		listCommitCommentsForRepo: ["GET /repos/{owner}/{repo}/comments"],
		listCommitStatusesForRef: ["GET /repos/{owner}/{repo}/commits/{ref}/statuses"],
		listCommits: ["GET /repos/{owner}/{repo}/commits"],
		listContributors: ["GET /repos/{owner}/{repo}/contributors"],
		listCustomDeploymentRuleIntegrations: ["GET /repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules/apps"],
		listDeployKeys: ["GET /repos/{owner}/{repo}/keys"],
		listDeploymentBranchPolicies: ["GET /repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies"],
		listDeploymentStatuses: ["GET /repos/{owner}/{repo}/deployments/{deployment_id}/statuses"],
		listDeployments: ["GET /repos/{owner}/{repo}/deployments"],
		listForAuthenticatedUser: ["GET /user/repos"],
		listForOrg: ["GET /orgs/{org}/repos"],
		listForUser: ["GET /users/{username}/repos"],
		listForks: ["GET /repos/{owner}/{repo}/forks"],
		listInvitations: ["GET /repos/{owner}/{repo}/invitations"],
		listInvitationsForAuthenticatedUser: ["GET /user/repository_invitations"],
		listLanguages: ["GET /repos/{owner}/{repo}/languages"],
		listPagesBuilds: ["GET /repos/{owner}/{repo}/pages/builds"],
		listPublic: ["GET /repositories"],
		listPullRequestsAssociatedWithCommit: ["GET /repos/{owner}/{repo}/commits/{commit_sha}/pulls"],
		listReleaseAssets: ["GET /repos/{owner}/{repo}/releases/{release_id}/assets"],
		listReleases: ["GET /repos/{owner}/{repo}/releases"],
		listTags: ["GET /repos/{owner}/{repo}/tags"],
		listTeams: ["GET /repos/{owner}/{repo}/teams"],
		listWebhookDeliveries: ["GET /repos/{owner}/{repo}/hooks/{hook_id}/deliveries"],
		listWebhooks: ["GET /repos/{owner}/{repo}/hooks"],
		merge: ["POST /repos/{owner}/{repo}/merges"],
		mergeUpstream: ["POST /repos/{owner}/{repo}/merge-upstream"],
		pingWebhook: ["POST /repos/{owner}/{repo}/hooks/{hook_id}/pings"],
		redeliverWebhookDelivery: ["POST /repos/{owner}/{repo}/hooks/{hook_id}/deliveries/{delivery_id}/attempts"],
		removeAppAccessRestrictions: [
			"DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps",
			{},
			{ mapToData: "apps" }
		],
		removeCollaborator: ["DELETE /repos/{owner}/{repo}/collaborators/{username}"],
		removeStatusCheckContexts: [
			"DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts",
			{},
			{ mapToData: "contexts" }
		],
		removeStatusCheckProtection: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks"],
		removeTeamAccessRestrictions: [
			"DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams",
			{},
			{ mapToData: "teams" }
		],
		removeUserAccessRestrictions: [
			"DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users",
			{},
			{ mapToData: "users" }
		],
		renameBranch: ["POST /repos/{owner}/{repo}/branches/{branch}/rename"],
		replaceAllTopics: ["PUT /repos/{owner}/{repo}/topics"],
		requestPagesBuild: ["POST /repos/{owner}/{repo}/pages/builds"],
		setAdminBranchProtection: ["POST /repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins"],
		setAppAccessRestrictions: [
			"PUT /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps",
			{},
			{ mapToData: "apps" }
		],
		setStatusCheckContexts: [
			"PUT /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts",
			{},
			{ mapToData: "contexts" }
		],
		setTeamAccessRestrictions: [
			"PUT /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams",
			{},
			{ mapToData: "teams" }
		],
		setUserAccessRestrictions: [
			"PUT /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users",
			{},
			{ mapToData: "users" }
		],
		testPushWebhook: ["POST /repos/{owner}/{repo}/hooks/{hook_id}/tests"],
		transfer: ["POST /repos/{owner}/{repo}/transfer"],
		update: ["PATCH /repos/{owner}/{repo}"],
		updateBranchProtection: ["PUT /repos/{owner}/{repo}/branches/{branch}/protection"],
		updateCommitComment: ["PATCH /repos/{owner}/{repo}/comments/{comment_id}"],
		updateDeploymentBranchPolicy: ["PUT /repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies/{branch_policy_id}"],
		updateInformationAboutPagesSite: ["PUT /repos/{owner}/{repo}/pages"],
		updateInvitation: ["PATCH /repos/{owner}/{repo}/invitations/{invitation_id}"],
		updateOrgRuleset: ["PUT /orgs/{org}/rulesets/{ruleset_id}"],
		updatePullRequestReviewProtection: ["PATCH /repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews"],
		updateRelease: ["PATCH /repos/{owner}/{repo}/releases/{release_id}"],
		updateReleaseAsset: ["PATCH /repos/{owner}/{repo}/releases/assets/{asset_id}"],
		updateRepoRuleset: ["PUT /repos/{owner}/{repo}/rulesets/{ruleset_id}"],
		updateStatusCheckPotection: [
			"PATCH /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks",
			{},
			{ renamed: ["repos", "updateStatusCheckProtection"] }
		],
		updateStatusCheckProtection: ["PATCH /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks"],
		updateWebhook: ["PATCH /repos/{owner}/{repo}/hooks/{hook_id}"],
		updateWebhookConfigForRepo: ["PATCH /repos/{owner}/{repo}/hooks/{hook_id}/config"],
		uploadReleaseAsset: ["POST /repos/{owner}/{repo}/releases/{release_id}/assets{?name,label}", { baseUrl: "https://uploads.github.com" }]
	},
	search: {
		code: ["GET /search/code"],
		commits: ["GET /search/commits"],
		issuesAndPullRequests: ["GET /search/issues"],
		labels: ["GET /search/labels"],
		repos: ["GET /search/repositories"],
		topics: ["GET /search/topics"],
		users: ["GET /search/users"]
	},
	secretScanning: {
		createPushProtectionBypass: ["POST /repos/{owner}/{repo}/secret-scanning/push-protection-bypasses"],
		getAlert: ["GET /repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}"],
		getScanHistory: ["GET /repos/{owner}/{repo}/secret-scanning/scan-history"],
		listAlertsForOrg: ["GET /orgs/{org}/secret-scanning/alerts"],
		listAlertsForRepo: ["GET /repos/{owner}/{repo}/secret-scanning/alerts"],
		listLocationsForAlert: ["GET /repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}/locations"],
		listOrgPatternConfigs: ["GET /orgs/{org}/secret-scanning/pattern-configurations"],
		updateAlert: ["PATCH /repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}"],
		updateOrgPatternConfigs: ["PATCH /orgs/{org}/secret-scanning/pattern-configurations"]
	},
	securityAdvisories: {
		createFork: ["POST /repos/{owner}/{repo}/security-advisories/{ghsa_id}/forks"],
		createPrivateVulnerabilityReport: ["POST /repos/{owner}/{repo}/security-advisories/reports"],
		createRepositoryAdvisory: ["POST /repos/{owner}/{repo}/security-advisories"],
		createRepositoryAdvisoryCveRequest: ["POST /repos/{owner}/{repo}/security-advisories/{ghsa_id}/cve"],
		getGlobalAdvisory: ["GET /advisories/{ghsa_id}"],
		getRepositoryAdvisory: ["GET /repos/{owner}/{repo}/security-advisories/{ghsa_id}"],
		listGlobalAdvisories: ["GET /advisories"],
		listOrgRepositoryAdvisories: ["GET /orgs/{org}/security-advisories"],
		listRepositoryAdvisories: ["GET /repos/{owner}/{repo}/security-advisories"],
		updateRepositoryAdvisory: ["PATCH /repos/{owner}/{repo}/security-advisories/{ghsa_id}"]
	},
	teams: {
		addOrUpdateMembershipForUserInOrg: ["PUT /orgs/{org}/teams/{team_slug}/memberships/{username}"],
		addOrUpdateRepoPermissionsInOrg: ["PUT /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}"],
		checkPermissionsForRepoInOrg: ["GET /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}"],
		create: ["POST /orgs/{org}/teams"],
		createDiscussionCommentInOrg: ["POST /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments"],
		createDiscussionInOrg: ["POST /orgs/{org}/teams/{team_slug}/discussions"],
		deleteDiscussionCommentInOrg: ["DELETE /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}"],
		deleteDiscussionInOrg: ["DELETE /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}"],
		deleteInOrg: ["DELETE /orgs/{org}/teams/{team_slug}"],
		getByName: ["GET /orgs/{org}/teams/{team_slug}"],
		getDiscussionCommentInOrg: ["GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}"],
		getDiscussionInOrg: ["GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}"],
		getMembershipForUserInOrg: ["GET /orgs/{org}/teams/{team_slug}/memberships/{username}"],
		list: ["GET /orgs/{org}/teams"],
		listChildInOrg: ["GET /orgs/{org}/teams/{team_slug}/teams"],
		listDiscussionCommentsInOrg: ["GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments"],
		listDiscussionsInOrg: ["GET /orgs/{org}/teams/{team_slug}/discussions"],
		listForAuthenticatedUser: ["GET /user/teams"],
		listMembersInOrg: ["GET /orgs/{org}/teams/{team_slug}/members"],
		listPendingInvitationsInOrg: ["GET /orgs/{org}/teams/{team_slug}/invitations"],
		listReposInOrg: ["GET /orgs/{org}/teams/{team_slug}/repos"],
		removeMembershipForUserInOrg: ["DELETE /orgs/{org}/teams/{team_slug}/memberships/{username}"],
		removeRepoInOrg: ["DELETE /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}"],
		updateDiscussionCommentInOrg: ["PATCH /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}"],
		updateDiscussionInOrg: ["PATCH /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}"],
		updateInOrg: ["PATCH /orgs/{org}/teams/{team_slug}"]
	},
	users: {
		addEmailForAuthenticated: [
			"POST /user/emails",
			{},
			{ renamed: ["users", "addEmailForAuthenticatedUser"] }
		],
		addEmailForAuthenticatedUser: ["POST /user/emails"],
		addSocialAccountForAuthenticatedUser: ["POST /user/social_accounts"],
		block: ["PUT /user/blocks/{username}"],
		checkBlocked: ["GET /user/blocks/{username}"],
		checkFollowingForUser: ["GET /users/{username}/following/{target_user}"],
		checkPersonIsFollowedByAuthenticated: ["GET /user/following/{username}"],
		createGpgKeyForAuthenticated: [
			"POST /user/gpg_keys",
			{},
			{ renamed: ["users", "createGpgKeyForAuthenticatedUser"] }
		],
		createGpgKeyForAuthenticatedUser: ["POST /user/gpg_keys"],
		createPublicSshKeyForAuthenticated: [
			"POST /user/keys",
			{},
			{ renamed: ["users", "createPublicSshKeyForAuthenticatedUser"] }
		],
		createPublicSshKeyForAuthenticatedUser: ["POST /user/keys"],
		createSshSigningKeyForAuthenticatedUser: ["POST /user/ssh_signing_keys"],
		deleteAttestationsBulk: ["POST /users/{username}/attestations/delete-request"],
		deleteAttestationsById: ["DELETE /users/{username}/attestations/{attestation_id}"],
		deleteAttestationsBySubjectDigest: ["DELETE /users/{username}/attestations/digest/{subject_digest}"],
		deleteEmailForAuthenticated: [
			"DELETE /user/emails",
			{},
			{ renamed: ["users", "deleteEmailForAuthenticatedUser"] }
		],
		deleteEmailForAuthenticatedUser: ["DELETE /user/emails"],
		deleteGpgKeyForAuthenticated: [
			"DELETE /user/gpg_keys/{gpg_key_id}",
			{},
			{ renamed: ["users", "deleteGpgKeyForAuthenticatedUser"] }
		],
		deleteGpgKeyForAuthenticatedUser: ["DELETE /user/gpg_keys/{gpg_key_id}"],
		deletePublicSshKeyForAuthenticated: [
			"DELETE /user/keys/{key_id}",
			{},
			{ renamed: ["users", "deletePublicSshKeyForAuthenticatedUser"] }
		],
		deletePublicSshKeyForAuthenticatedUser: ["DELETE /user/keys/{key_id}"],
		deleteSocialAccountForAuthenticatedUser: ["DELETE /user/social_accounts"],
		deleteSshSigningKeyForAuthenticatedUser: ["DELETE /user/ssh_signing_keys/{ssh_signing_key_id}"],
		follow: ["PUT /user/following/{username}"],
		getAuthenticated: ["GET /user"],
		getById: ["GET /user/{account_id}"],
		getByUsername: ["GET /users/{username}"],
		getContextForUser: ["GET /users/{username}/hovercard"],
		getGpgKeyForAuthenticated: [
			"GET /user/gpg_keys/{gpg_key_id}",
			{},
			{ renamed: ["users", "getGpgKeyForAuthenticatedUser"] }
		],
		getGpgKeyForAuthenticatedUser: ["GET /user/gpg_keys/{gpg_key_id}"],
		getPublicSshKeyForAuthenticated: [
			"GET /user/keys/{key_id}",
			{},
			{ renamed: ["users", "getPublicSshKeyForAuthenticatedUser"] }
		],
		getPublicSshKeyForAuthenticatedUser: ["GET /user/keys/{key_id}"],
		getSshSigningKeyForAuthenticatedUser: ["GET /user/ssh_signing_keys/{ssh_signing_key_id}"],
		list: ["GET /users"],
		listAttestations: ["GET /users/{username}/attestations/{subject_digest}"],
		listAttestationsBulk: ["POST /users/{username}/attestations/bulk-list{?per_page,before,after}"],
		listBlockedByAuthenticated: [
			"GET /user/blocks",
			{},
			{ renamed: ["users", "listBlockedByAuthenticatedUser"] }
		],
		listBlockedByAuthenticatedUser: ["GET /user/blocks"],
		listEmailsForAuthenticated: [
			"GET /user/emails",
			{},
			{ renamed: ["users", "listEmailsForAuthenticatedUser"] }
		],
		listEmailsForAuthenticatedUser: ["GET /user/emails"],
		listFollowedByAuthenticated: [
			"GET /user/following",
			{},
			{ renamed: ["users", "listFollowedByAuthenticatedUser"] }
		],
		listFollowedByAuthenticatedUser: ["GET /user/following"],
		listFollowersForAuthenticatedUser: ["GET /user/followers"],
		listFollowersForUser: ["GET /users/{username}/followers"],
		listFollowingForUser: ["GET /users/{username}/following"],
		listGpgKeysForAuthenticated: [
			"GET /user/gpg_keys",
			{},
			{ renamed: ["users", "listGpgKeysForAuthenticatedUser"] }
		],
		listGpgKeysForAuthenticatedUser: ["GET /user/gpg_keys"],
		listGpgKeysForUser: ["GET /users/{username}/gpg_keys"],
		listPublicEmailsForAuthenticated: [
			"GET /user/public_emails",
			{},
			{ renamed: ["users", "listPublicEmailsForAuthenticatedUser"] }
		],
		listPublicEmailsForAuthenticatedUser: ["GET /user/public_emails"],
		listPublicKeysForUser: ["GET /users/{username}/keys"],
		listPublicSshKeysForAuthenticated: [
			"GET /user/keys",
			{},
			{ renamed: ["users", "listPublicSshKeysForAuthenticatedUser"] }
		],
		listPublicSshKeysForAuthenticatedUser: ["GET /user/keys"],
		listSocialAccountsForAuthenticatedUser: ["GET /user/social_accounts"],
		listSocialAccountsForUser: ["GET /users/{username}/social_accounts"],
		listSshSigningKeysForAuthenticatedUser: ["GET /user/ssh_signing_keys"],
		listSshSigningKeysForUser: ["GET /users/{username}/ssh_signing_keys"],
		setPrimaryEmailVisibilityForAuthenticated: [
			"PATCH /user/email/visibility",
			{},
			{ renamed: ["users", "setPrimaryEmailVisibilityForAuthenticatedUser"] }
		],
		setPrimaryEmailVisibilityForAuthenticatedUser: ["PATCH /user/email/visibility"],
		unblock: ["DELETE /user/blocks/{username}"],
		unfollow: ["DELETE /user/following/{username}"],
		updateAuthenticated: ["PATCH /user"]
	}
}, B = /* @__PURE__ */ new Map();
for (let [e, t] of Object.entries(bt)) for (let [n, r] of Object.entries(t)) {
	let [t, i, a] = r, [o, s] = t.split(/ /), c = Object.assign({
		method: o,
		url: s
	}, i);
	B.has(e) || B.set(e, /* @__PURE__ */ new Map()), B.get(e).set(n, {
		scope: e,
		methodName: n,
		endpointDefaults: c,
		decorations: a
	});
}
var xt = {
	has({ scope: e }, t) {
		return B.get(e).has(t);
	},
	getOwnPropertyDescriptor(e, t) {
		return {
			value: this.get(e, t),
			configurable: !0,
			writable: !0,
			enumerable: !0
		};
	},
	defineProperty(e, t, n) {
		return Object.defineProperty(e.cache, t, n), !0;
	},
	deleteProperty(e, t) {
		return delete e.cache[t], !0;
	},
	ownKeys({ scope: e }) {
		return [...B.get(e).keys()];
	},
	set(e, t, n) {
		return e.cache[t] = n;
	},
	get({ octokit: e, scope: t, cache: n }, r) {
		if (n[r]) return n[r];
		let i = B.get(t).get(r);
		if (!i) return;
		let { endpointDefaults: a, decorations: o } = i;
		return n[r] = o ? Ct(e, t, r, a, o) : e.request.defaults(a), n[r];
	}
};
function St(e) {
	let t = {};
	for (let n of B.keys()) t[n] = new Proxy({
		octokit: e,
		scope: n,
		cache: {}
	}, xt);
	return t;
}
function Ct(e, t, n, r, i) {
	let a = e.request.defaults(r);
	function o(...r) {
		let o = a.endpoint.merge(...r);
		if (i.mapToData) return o = Object.assign({}, o, {
			data: o[i.mapToData],
			[i.mapToData]: void 0
		}), a(o);
		if (i.renamed) {
			let [r, a] = i.renamed;
			e.log.warn(`octokit.${t}.${n}() has been renamed to octokit.${r}.${a}()`);
		}
		if (i.deprecated && e.log.warn(i.deprecated), i.renamedParameters) {
			let o = a.endpoint.merge(...r);
			for (let [r, a] of Object.entries(i.renamedParameters)) r in o && (e.log.warn(`"${r}" parameter is deprecated for "octokit.${t}.${n}()". Use "${a}" instead`), a in o || (o[a] = o[r]), delete o[r]);
			return a(o);
		}
		return a(...r);
	}
	return Object.assign(o, a);
}
function wt(e) {
	let t = St(e);
	return {
		...t,
		rest: t
	};
}
wt.VERSION = yt;
//#endregion
//#region ../../node_modules/.pnpm/@octokit+rest@22.0.1/node_modules/@octokit/rest/dist-src/index.js
var Tt = dt.plugin(pt, wt, vt).defaults({ userAgent: "octokit-rest.js/22.0.1" }), V = /* @__PURE__ */ f(((e, t) => {
	t.exports = {
		MAX_LENGTH: 256,
		MAX_SAFE_COMPONENT_LENGTH: 16,
		MAX_SAFE_BUILD_LENGTH: 250,
		MAX_SAFE_INTEGER: 2 ** 53 - 1 || 
		/* istanbul ignore next */ 9007199254740991,
		RELEASE_TYPES: [
			"major",
			"premajor",
			"minor",
			"preminor",
			"patch",
			"prepatch",
			"prerelease"
		],
		SEMVER_SPEC_VERSION: "2.0.0",
		FLAG_INCLUDE_PRERELEASE: 1,
		FLAG_LOOSE: 2
	};
})), H = /* @__PURE__ */ f(((e, t) => {
	t.exports = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {};
})), U = /* @__PURE__ */ f(((e, t) => {
	var { MAX_SAFE_COMPONENT_LENGTH: n, MAX_SAFE_BUILD_LENGTH: r, MAX_LENGTH: i } = V(), a = H();
	e = t.exports = {};
	var o = e.re = [], s = e.safeRe = [], c = e.src = [], l = e.safeSrc = [], u = e.t = {}, d = 0, f = "[a-zA-Z0-9-]", p = [
		["\\s", 1],
		["\\d", i],
		[f, r]
	], m = (e) => {
		for (let [t, n] of p) e = e.split(`${t}*`).join(`${t}{0,${n}}`).split(`${t}+`).join(`${t}{1,${n}}`);
		return e;
	}, h = (e, t, n) => {
		let r = m(t), i = d++;
		a(e, i, t), u[e] = i, c[i] = t, l[i] = r, o[i] = new RegExp(t, n ? "g" : void 0), s[i] = new RegExp(r, n ? "g" : void 0);
	};
	h("NUMERICIDENTIFIER", "0|[1-9]\\d*"), h("NUMERICIDENTIFIERLOOSE", "\\d+"), h("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${f}*`), h("MAINVERSION", `(${c[u.NUMERICIDENTIFIER]})\\.(${c[u.NUMERICIDENTIFIER]})\\.(${c[u.NUMERICIDENTIFIER]})`), h("MAINVERSIONLOOSE", `(${c[u.NUMERICIDENTIFIERLOOSE]})\\.(${c[u.NUMERICIDENTIFIERLOOSE]})\\.(${c[u.NUMERICIDENTIFIERLOOSE]})`), h("PRERELEASEIDENTIFIER", `(?:${c[u.NONNUMERICIDENTIFIER]}|${c[u.NUMERICIDENTIFIER]})`), h("PRERELEASEIDENTIFIERLOOSE", `(?:${c[u.NONNUMERICIDENTIFIER]}|${c[u.NUMERICIDENTIFIERLOOSE]})`), h("PRERELEASE", `(?:-(${c[u.PRERELEASEIDENTIFIER]}(?:\\.${c[u.PRERELEASEIDENTIFIER]})*))`), h("PRERELEASELOOSE", `(?:-?(${c[u.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${c[u.PRERELEASEIDENTIFIERLOOSE]})*))`), h("BUILDIDENTIFIER", `${f}+`), h("BUILD", `(?:\\+(${c[u.BUILDIDENTIFIER]}(?:\\.${c[u.BUILDIDENTIFIER]})*))`), h("FULLPLAIN", `v?${c[u.MAINVERSION]}${c[u.PRERELEASE]}?${c[u.BUILD]}?`), h("FULL", `^${c[u.FULLPLAIN]}$`), h("LOOSEPLAIN", `[v=\\s]*${c[u.MAINVERSIONLOOSE]}${c[u.PRERELEASELOOSE]}?${c[u.BUILD]}?`), h("LOOSE", `^${c[u.LOOSEPLAIN]}$`), h("GTLT", "((?:<|>)?=?)"), h("XRANGEIDENTIFIERLOOSE", `${c[u.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), h("XRANGEIDENTIFIER", `${c[u.NUMERICIDENTIFIER]}|x|X|\\*`), h("XRANGEPLAIN", `[v=\\s]*(${c[u.XRANGEIDENTIFIER]})(?:\\.(${c[u.XRANGEIDENTIFIER]})(?:\\.(${c[u.XRANGEIDENTIFIER]})(?:${c[u.PRERELEASE]})?${c[u.BUILD]}?)?)?`), h("XRANGEPLAINLOOSE", `[v=\\s]*(${c[u.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[u.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[u.XRANGEIDENTIFIERLOOSE]})(?:${c[u.PRERELEASELOOSE]})?${c[u.BUILD]}?)?)?`), h("XRANGE", `^${c[u.GTLT]}\\s*${c[u.XRANGEPLAIN]}$`), h("XRANGELOOSE", `^${c[u.GTLT]}\\s*${c[u.XRANGEPLAINLOOSE]}$`), h("COERCEPLAIN", `(^|[^\\d])(\\d{1,${n}})(?:\\.(\\d{1,${n}}))?(?:\\.(\\d{1,${n}}))?`), h("COERCE", `${c[u.COERCEPLAIN]}(?:$|[^\\d])`), h("COERCEFULL", c[u.COERCEPLAIN] + `(?:${c[u.PRERELEASE]})?(?:${c[u.BUILD]})?(?:$|[^\\d])`), h("COERCERTL", c[u.COERCE], !0), h("COERCERTLFULL", c[u.COERCEFULL], !0), h("LONETILDE", "(?:~>?)"), h("TILDETRIM", `(\\s*)${c[u.LONETILDE]}\\s+`, !0), e.tildeTrimReplace = "$1~", h("TILDE", `^${c[u.LONETILDE]}${c[u.XRANGEPLAIN]}$`), h("TILDELOOSE", `^${c[u.LONETILDE]}${c[u.XRANGEPLAINLOOSE]}$`), h("LONECARET", "(?:\\^)"), h("CARETTRIM", `(\\s*)${c[u.LONECARET]}\\s+`, !0), e.caretTrimReplace = "$1^", h("CARET", `^${c[u.LONECARET]}${c[u.XRANGEPLAIN]}$`), h("CARETLOOSE", `^${c[u.LONECARET]}${c[u.XRANGEPLAINLOOSE]}$`), h("COMPARATORLOOSE", `^${c[u.GTLT]}\\s*(${c[u.LOOSEPLAIN]})$|^$`), h("COMPARATOR", `^${c[u.GTLT]}\\s*(${c[u.FULLPLAIN]})$|^$`), h("COMPARATORTRIM", `(\\s*)${c[u.GTLT]}\\s*(${c[u.LOOSEPLAIN]}|${c[u.XRANGEPLAIN]})`, !0), e.comparatorTrimReplace = "$1$2$3", h("HYPHENRANGE", `^\\s*(${c[u.XRANGEPLAIN]})\\s+-\\s+(${c[u.XRANGEPLAIN]})\\s*$`), h("HYPHENRANGELOOSE", `^\\s*(${c[u.XRANGEPLAINLOOSE]})\\s+-\\s+(${c[u.XRANGEPLAINLOOSE]})\\s*$`), h("STAR", "(<|>)?=?\\s*\\*"), h("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), h("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})), W = /* @__PURE__ */ f(((e, t) => {
	var n = Object.freeze({ loose: !0 }), r = Object.freeze({});
	t.exports = (e) => e ? typeof e == "object" ? e : n : r;
})), Et = /* @__PURE__ */ f(((e, t) => {
	var n = /^[0-9]+$/, r = (e, t) => {
		if (typeof e == "number" && typeof t == "number") return e === t ? 0 : e < t ? -1 : 1;
		let r = n.test(e), i = n.test(t);
		return r && i && (e = +e, t = +t), e === t ? 0 : r && !i ? -1 : i && !r ? 1 : e < t ? -1 : 1;
	};
	t.exports = {
		compareIdentifiers: r,
		rcompareIdentifiers: (e, t) => r(t, e)
	};
})), G = /* @__PURE__ */ f(((e, t) => {
	var n = H(), { MAX_LENGTH: r, MAX_SAFE_INTEGER: i } = V(), { safeRe: a, t: o } = U(), s = W(), { compareIdentifiers: c } = Et(), l = (e, t) => {
		let n = t.split(".");
		if (n.length > e.length) return !1;
		for (let t = 0; t < n.length; t++) if (c(e[t], n[t]) !== 0) return !1;
		return !0;
	};
	t.exports = class e {
		constructor(t, c) {
			if (c = s(c), t instanceof e) {
				if (t.loose === !!c.loose && t.includePrerelease === !!c.includePrerelease) return t;
				t = t.version;
			} else if (typeof t != "string") throw TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
			if (t.length > r) throw TypeError(`version is longer than ${r} characters`);
			n("SemVer", t, c), this.options = c, this.loose = !!c.loose, this.includePrerelease = !!c.includePrerelease;
			let l = t.trim().match(c.loose ? a[o.LOOSE] : a[o.FULL]);
			if (!l) throw TypeError(`Invalid Version: ${t}`);
			if (this.raw = t, this.major = +l[1], this.minor = +l[2], this.patch = +l[3], this.major > i || this.major < 0) throw TypeError("Invalid major version");
			if (this.minor > i || this.minor < 0) throw TypeError("Invalid minor version");
			if (this.patch > i || this.patch < 0) throw TypeError("Invalid patch version");
			this.prerelease = l[4] ? l[4].split(".").map((e) => {
				if (/^[0-9]+$/.test(e)) {
					let t = +e;
					if (t >= 0 && t < i) return t;
				}
				return e;
			}) : [], this.build = l[5] ? l[5].split(".") : [], this.format();
		}
		format() {
			return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
		}
		toString() {
			return this.version;
		}
		compare(t) {
			if (n("SemVer.compare", this.version, this.options, t), !(t instanceof e)) {
				if (typeof t == "string" && t === this.version) return 0;
				t = new e(t, this.options);
			}
			return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
		}
		compareMain(t) {
			return t instanceof e || (t = new e(t, this.options)), this.major < t.major ? -1 : this.major > t.major ? 1 : this.minor < t.minor ? -1 : this.minor > t.minor ? 1 : this.patch < t.patch ? -1 : +(this.patch > t.patch);
		}
		comparePre(t) {
			if (t instanceof e || (t = new e(t, this.options)), this.prerelease.length && !t.prerelease.length) return -1;
			if (!this.prerelease.length && t.prerelease.length) return 1;
			if (!this.prerelease.length && !t.prerelease.length) return 0;
			let r = 0;
			do {
				let e = this.prerelease[r], i = t.prerelease[r];
				if (n("prerelease compare", r, e, i), e === void 0 && i === void 0) return 0;
				if (i === void 0) return 1;
				if (e === void 0) return -1;
				if (e === i) continue;
				return c(e, i);
			} while (++r);
		}
		compareBuild(t) {
			t instanceof e || (t = new e(t, this.options));
			let r = 0;
			do {
				let e = this.build[r], i = t.build[r];
				if (n("build compare", r, e, i), e === void 0 && i === void 0) return 0;
				if (i === void 0) return 1;
				if (e === void 0) return -1;
				if (e === i) continue;
				return c(e, i);
			} while (++r);
		}
		inc(e, t, n) {
			if (e.startsWith("pre")) {
				if (!t && n === !1) throw Error("invalid increment argument: identifier is empty");
				if (t) {
					let e = `-${t}`.match(this.options.loose ? a[o.PRERELEASELOOSE] : a[o.PRERELEASE]);
					if (!e || e[1] !== t) throw Error(`invalid identifier: ${t}`);
				}
			}
			switch (e) {
				case "premajor":
					this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", t, n);
					break;
				case "preminor":
					this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", t, n);
					break;
				case "prepatch":
					this.prerelease.length = 0, this.inc("patch", t, n), this.inc("pre", t, n);
					break;
				case "prerelease":
					this.prerelease.length === 0 && this.inc("patch", t, n), this.inc("pre", t, n);
					break;
				case "release":
					if (this.prerelease.length === 0) throw Error(`version ${this.raw} is not a prerelease`);
					this.prerelease.length = 0;
					break;
				case "major":
					(this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
					break;
				case "minor":
					(this.patch !== 0 || this.prerelease.length === 0) && this.minor++, this.patch = 0, this.prerelease = [];
					break;
				case "patch":
					this.prerelease.length === 0 && this.patch++, this.prerelease = [];
					break;
				case "pre": {
					let e = +!!Number(n);
					if (this.prerelease.length === 0) this.prerelease = [e];
					else {
						let r = this.prerelease.length;
						for (; --r >= 0;) typeof this.prerelease[r] == "number" && (this.prerelease[r]++, r = -2);
						if (r === -1) {
							if (t === this.prerelease.join(".") && n === !1) throw Error("invalid increment argument: identifier already exists");
							this.prerelease.push(e);
						}
					}
					if (t) {
						let r = [t, e];
						if (n === !1 && (r = [t]), l(this.prerelease, t)) {
							let e = this.prerelease[t.split(".").length];
							isNaN(e) && (this.prerelease = r);
						} else this.prerelease = r;
					}
					break;
				}
				default: throw Error(`invalid increment argument: ${e}`);
			}
			return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
		}
	};
})), K = /* @__PURE__ */ f(((e, t) => {
	var n = G();
	t.exports = (e, t, r = !1) => {
		if (e instanceof n) return e;
		try {
			return new n(e, t);
		} catch (e) {
			if (!r) return null;
			throw e;
		}
	};
})), Dt = /* @__PURE__ */ f(((e, t) => {
	var n = K();
	t.exports = (e, t) => {
		let r = n(e, t);
		return r ? r.version : null;
	};
})), Ot = /* @__PURE__ */ f(((e, t) => {
	var n = K();
	t.exports = (e, t) => {
		let r = n(e.trim().replace(/^[=v]+/, ""), t);
		return r ? r.version : null;
	};
})), kt = /* @__PURE__ */ f(((e, t) => {
	var n = G();
	t.exports = (e, t, r, i, a) => {
		typeof r == "string" && (a = i, i = r, r = void 0);
		try {
			return new n(e instanceof n ? e.version : e, r).inc(t, i, a).version;
		} catch {
			return null;
		}
	};
})), At = /* @__PURE__ */ f(((e, t) => {
	var n = K();
	t.exports = (e, t) => {
		let r = n(e, null, !0), i = n(t, null, !0), a = r.compare(i);
		if (a === 0) return null;
		let o = a > 0, s = o ? r : i, c = o ? i : r, l = !!s.prerelease.length;
		if (c.prerelease.length && !l) {
			if (!c.patch && !c.minor) return "major";
			if (c.compareMain(s) === 0) return c.minor && !c.patch ? "minor" : "patch";
		}
		let u = l ? "pre" : "";
		return r.major === i.major ? r.minor === i.minor ? r.patch === i.patch ? "prerelease" : u + "patch" : u + "minor" : u + "major";
	};
})), jt = /* @__PURE__ */ f(((e, t) => {
	var n = G();
	t.exports = (e, t) => new n(e, t).major;
})), Mt = /* @__PURE__ */ f(((e, t) => {
	var n = G();
	t.exports = (e, t) => new n(e, t).minor;
})), Nt = /* @__PURE__ */ f(((e, t) => {
	var n = G();
	t.exports = (e, t) => new n(e, t).patch;
})), Pt = /* @__PURE__ */ f(((e, t) => {
	var n = K();
	t.exports = (e, t) => {
		let r = n(e, t);
		return r && r.prerelease.length ? r.prerelease : null;
	};
})), q = /* @__PURE__ */ f(((e, t) => {
	var n = G();
	t.exports = (e, t, r) => new n(e, r).compare(new n(t, r));
})), Ft = /* @__PURE__ */ f(((e, t) => {
	var n = q();
	t.exports = (e, t, r) => n(t, e, r);
})), It = /* @__PURE__ */ f(((e, t) => {
	var n = q();
	t.exports = (e, t) => n(e, t, !0);
})), Lt = /* @__PURE__ */ f(((e, t) => {
	var n = G();
	t.exports = (e, t, r) => {
		let i = new n(e, r), a = new n(t, r);
		return i.compare(a) || i.compareBuild(a);
	};
})), Rt = /* @__PURE__ */ f(((e, t) => {
	var n = Lt();
	t.exports = (e, t) => e.sort((e, r) => n(e, r, t));
})), zt = /* @__PURE__ */ f(((e, t) => {
	var n = Lt();
	t.exports = (e, t) => e.sort((e, r) => n(r, e, t));
})), J = /* @__PURE__ */ f(((e, t) => {
	var n = q();
	t.exports = (e, t, r) => n(e, t, r) > 0;
})), Bt = /* @__PURE__ */ f(((e, t) => {
	var n = q();
	t.exports = (e, t, r) => n(e, t, r) < 0;
})), Vt = /* @__PURE__ */ f(((e, t) => {
	var n = q();
	t.exports = (e, t, r) => n(e, t, r) === 0;
})), Ht = /* @__PURE__ */ f(((e, t) => {
	var n = q();
	t.exports = (e, t, r) => n(e, t, r) !== 0;
})), Ut = /* @__PURE__ */ f(((e, t) => {
	var n = q();
	t.exports = (e, t, r) => n(e, t, r) >= 0;
})), Wt = /* @__PURE__ */ f(((e, t) => {
	var n = q();
	t.exports = (e, t, r) => n(e, t, r) <= 0;
})), Gt = /* @__PURE__ */ f(((e, t) => {
	var n = Vt(), r = Ht(), i = J(), a = Ut(), o = Bt(), s = Wt();
	t.exports = (e, t, c, l) => {
		switch (t) {
			case "===": return typeof e == "object" && (e = e.version), typeof c == "object" && (c = c.version), e === c;
			case "!==": return typeof e == "object" && (e = e.version), typeof c == "object" && (c = c.version), e !== c;
			case "":
			case "=":
			case "==": return n(e, c, l);
			case "!=": return r(e, c, l);
			case ">": return i(e, c, l);
			case ">=": return a(e, c, l);
			case "<": return o(e, c, l);
			case "<=": return s(e, c, l);
			default: throw TypeError(`Invalid operator: ${t}`);
		}
	};
})), Kt = /* @__PURE__ */ f(((e, t) => {
	var n = G(), r = K(), { safeRe: i, t: a } = U();
	t.exports = (e, t) => {
		if (e instanceof n) return e;
		if (typeof e == "number" && (e = String(e)), typeof e != "string") return null;
		t ||= {};
		let o = null;
		if (!t.rtl) o = e.match(t.includePrerelease ? i[a.COERCEFULL] : i[a.COERCE]);
		else {
			let n = t.includePrerelease ? i[a.COERCERTLFULL] : i[a.COERCERTL], r;
			for (; (r = n.exec(e)) && (!o || o.index + o[0].length !== e.length);) (!o || r.index + r[0].length !== o.index + o[0].length) && (o = r), n.lastIndex = r.index + r[1].length + r[2].length;
			n.lastIndex = -1;
		}
		if (o === null) return null;
		let s = o[2];
		return r(`${s}.${o[3] || "0"}.${o[4] || "0"}${t.includePrerelease && o[5] ? `-${o[5]}` : ""}${t.includePrerelease && o[6] ? `+${o[6]}` : ""}`, t);
	};
})), qt = /* @__PURE__ */ f(((e, t) => {
	var n = K(), r = V(), i = G(), a = (e, t, n) => {
		if (!r.RELEASE_TYPES.includes(t)) return null;
		let i = o(e, n);
		return i && s(i, t);
	}, o = (e, t) => n(e instanceof i ? e.version : e, t), s = (e, t) => {
		if (c(t)) return e.version;
		switch (e.prerelease = [], t) {
			case "major":
				e.minor = 0, e.patch = 0;
				break;
			case "minor": e.patch = 0;
		}
		return e.format();
	}, c = (e) => e.startsWith("pre");
	t.exports = a;
})), Jt = /* @__PURE__ */ f(((e, t) => {
	t.exports = class {
		constructor() {
			this.max = 1e3, this.map = /* @__PURE__ */ new Map();
		}
		get(e) {
			let t = this.map.get(e);
			if (t !== void 0) return this.map.delete(e), this.map.set(e, t), t;
		}
		delete(e) {
			return this.map.delete(e);
		}
		set(e, t) {
			if (!this.delete(e) && t !== void 0) {
				if (this.map.size >= this.max) {
					let e = this.map.keys().next().value;
					this.delete(e);
				}
				this.map.set(e, t);
			}
			return this;
		}
	};
})), Y = /* @__PURE__ */ f(((e, t) => {
	var n = /\s+/g;
	t.exports = class e {
		constructor(t, r) {
			if (r = i(r), t instanceof e) return t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease ? t : new e(t.raw, r);
			if (t instanceof a) return this.raw = t.value, this.set = [[t]], this.formatted = void 0, this;
			if (this.options = r, this.loose = !!r.loose, this.includePrerelease = !!r.includePrerelease, this.raw = t.trim().replace(n, " "), this.set = this.raw.split("||").map((e) => this.parseRange(e.trim())).filter((e) => e.length), !this.set.length) throw TypeError(`Invalid SemVer Range: ${this.raw}`);
			if (this.set.length > 1) {
				let e = this.set[0];
				if (this.set = this.set.filter((e) => !_(e[0])), this.set.length === 0) this.set = [e];
				else if (this.set.length > 1) {
					for (let e of this.set) if (e.length === 1 && v(e[0])) {
						this.set = [e];
						break;
					}
				}
			}
			this.formatted = void 0;
		}
		get range() {
			if (this.formatted === void 0) {
				this.formatted = "";
				for (let e = 0; e < this.set.length; e++) {
					e > 0 && (this.formatted += "||");
					let t = this.set[e];
					for (let e = 0; e < t.length; e++) e > 0 && (this.formatted += " "), this.formatted += t[e].toString().trim();
				}
			}
			return this.formatted;
		}
		format() {
			return this.range;
		}
		toString() {
			return this.range;
		}
		parseRange(e) {
			e = e.replace(g, "");
			let t = ((this.options.includePrerelease && m) | (this.options.loose && h)) + ":" + e, n = r.get(t);
			if (n) return n;
			let i = this.options.loose, s = i ? c[u.HYPHENRANGELOOSE] : c[u.HYPHENRANGE];
			e = e.replace(s, se(this.options.includePrerelease)), o("hyphen replace", e), e = e.replace(c[u.COMPARATORTRIM], d), o("comparator trim", e), e = e.replace(c[u.TILDETRIM], f), o("tilde trim", e), e = e.replace(c[u.CARETTRIM], p), o("caret trim", e);
			let l = e.split(" ").map((e) => b(e, this.options)).join(" ").split(/\s+/).map((e) => C(e, this.options));
			i && (l = l.filter((e) => (o("loose invalid filter", e, this.options), !!e.match(c[u.COMPARATORLOOSE])))), o("range list", l);
			let v = /* @__PURE__ */ new Map(), y = l.map((e) => new a(e, this.options));
			for (let e of y) {
				if (_(e)) return [e];
				v.set(e.value, e);
			}
			v.size > 1 && v.has("") && v.delete("");
			let x = [...v.values()];
			return r.set(t, x), x;
		}
		intersects(t, n) {
			if (!(t instanceof e)) throw TypeError("a Range is required");
			return this.set.some((e) => y(e, n) && t.set.some((t) => y(t, n) && e.every((e) => t.every((t) => e.intersects(t, n)))));
		}
		test(e) {
			if (!e) return !1;
			if (typeof e == "string") try {
				e = new s(e, this.options);
			} catch {
				return !1;
			}
			for (let t = 0; t < this.set.length; t++) if (ce(this.set[t], e, this.options)) return !0;
			return !1;
		}
	};
	var r = new (Jt())(), i = W(), a = X(), o = H(), s = G(), { safeRe: c, src: l, t: u, comparatorTrimReplace: d, tildeTrimReplace: f, caretTrimReplace: p } = U(), { FLAG_INCLUDE_PRERELEASE: m, FLAG_LOOSE: h } = V(), g = new RegExp(l[u.BUILD], "g"), _ = (e) => e.value === "<0.0.0-0", v = (e) => e.value === "", y = (e, t) => {
		let n = !0, r = e.slice(), i = r.pop();
		for (; n && r.length;) n = r.every((e) => i.intersects(e, t)), i = r.pop();
		return n;
	}, b = (e, t) => (e = e.replace(c[u.BUILD], ""), o("comp", e, t), e = re(e, t), o("caret", e), e = te(e, t), o("tildes", e), e = ae(e, t), o("xrange", e), e = oe(e, t), o("stars", e), e), x = (e) => !e || e.toLowerCase() === "x" || e === "*", ee = (e, t, n) => x(e) && !x(t) || x(t) && n && !x(n), te = (e, t) => e.trim().split(/\s+/).map((e) => ne(e, t)).join(" "), ne = (e, t) => {
		let n = t.loose ? c[u.TILDELOOSE] : c[u.TILDE], r = t.includePrerelease ? "-0" : "";
		return e.replace(n, (t, n, i, a, s) => {
			o("tilde", e, t, n, i, a, s);
			let c;
			return x(n) ? c = "" : x(i) ? c = `>=${n}.0.0${r} <${+n + 1}.0.0-0` : x(a) ? c = `>=${n}.${i}.0${r} <${n}.${+i + 1}.0-0` : s ? (o("replaceTilde pr", s), c = `>=${n}.${i}.${a}-${s} <${n}.${+i + 1}.0-0`) : c = `>=${n}.${i}.${a} <${n}.${+i + 1}.0-0`, o("tilde return", c), c;
		});
	}, re = (e, t) => e.trim().split(/\s+/).map((e) => ie(e, t)).join(" "), ie = (e, t) => {
		o("caret", e, t);
		let n = t.loose ? c[u.CARETLOOSE] : c[u.CARET], r = t.includePrerelease ? "-0" : "";
		return e.replace(n, (t, n, i, a, s) => {
			o("caret", e, t, n, i, a, s);
			let c;
			return x(n) ? c = "" : x(i) ? c = `>=${n}.0.0${r} <${+n + 1}.0.0-0` : x(a) ? c = n === "0" ? `>=${n}.${i}.0${r} <${n}.${+i + 1}.0-0` : `>=${n}.${i}.0${r} <${+n + 1}.0.0-0` : s ? (o("replaceCaret pr", s), c = n === "0" ? i === "0" ? `>=${n}.${i}.${a}-${s} <${n}.${i}.${+a + 1}-0` : `>=${n}.${i}.${a}-${s} <${n}.${+i + 1}.0-0` : `>=${n}.${i}.${a}-${s} <${+n + 1}.0.0-0`) : (o("no pr"), c = n === "0" ? i === "0" ? `>=${n}.${i}.${a} <${n}.${i}.${+a + 1}-0` : `>=${n}.${i}.${a} <${n}.${+i + 1}.0-0` : `>=${n}.${i}.${a} <${+n + 1}.0.0-0`), o("caret return", c), c;
		});
	}, ae = (e, t) => (o("replaceXRanges", e, t), e.split(/\s+/).map((e) => S(e, t)).join(" ")), S = (e, t) => {
		e = e.trim();
		let n = t.loose ? c[u.XRANGELOOSE] : c[u.XRANGE];
		return e.replace(n, (n, r, i, a, s, c) => {
			if (o("xRange", e, n, r, i, a, s, c), ee(i, a, s)) return e;
			let l = x(i), u = l || x(a), d = u || x(s), f = d;
			return r === "=" && f && (r = ""), c = t.includePrerelease ? "-0" : "", l ? n = r === ">" || r === "<" ? "<0.0.0-0" : "*" : r && f ? (u && (a = 0), s = 0, r === ">" ? (r = ">=", u ? (i = +i + 1, a = 0, s = 0) : (a = +a + 1, s = 0)) : r === "<=" && (r = "<", u ? i = +i + 1 : a = +a + 1), r === "<" && (c = "-0"), n = `${r + i}.${a}.${s}${c}`) : u ? n = `>=${i}.0.0${c} <${+i + 1}.0.0-0` : d && (n = `>=${i}.${a}.0${c} <${i}.${+a + 1}.0-0`), o("xRange return", n), n;
		});
	}, oe = (e, t) => (o("replaceStars", e, t), e.trim().replace(c[u.STAR], "")), C = (e, t) => (o("replaceGTE0", e, t), e.trim().replace(c[t.includePrerelease ? u.GTE0PRE : u.GTE0], "")), se = (e) => (t, n, r, i, a, o, s, c, l, u, d, f) => (n = x(r) ? "" : x(i) ? `>=${r}.0.0${e ? "-0" : ""}` : x(a) ? `>=${r}.${i}.0${e ? "-0" : ""}` : o ? `>=${n}` : `>=${n}${e ? "-0" : ""}`, c = x(l) ? "" : x(u) ? `<${+l + 1}.0.0-0` : x(d) ? `<${l}.${+u + 1}.0-0` : f ? `<=${l}.${u}.${d}-${f}` : e ? `<${l}.${u}.${+d + 1}-0` : `<=${c}`, `${n} ${c}`.trim()), ce = (e, t, n) => {
		for (let n = 0; n < e.length; n++) if (!e[n].test(t)) return !1;
		if (t.prerelease.length && !n.includePrerelease) {
			for (let n = 0; n < e.length; n++) if (o(e[n].semver), e[n].semver !== a.ANY && e[n].semver.prerelease.length > 0) {
				let r = e[n].semver;
				if (r.major === t.major && r.minor === t.minor && r.patch === t.patch) return !0;
			}
			return !1;
		}
		return !0;
	};
})), X = /* @__PURE__ */ f(((e, t) => {
	var n = Symbol("SemVer ANY");
	t.exports = class e {
		static get ANY() {
			return n;
		}
		constructor(t, i) {
			if (i = r(i), t instanceof e) {
				if (t.loose === !!i.loose) return t;
				t = t.value;
			}
			t = t.trim().split(/\s+/).join(" "), s("comparator", t, i), this.options = i, this.loose = !!i.loose, this.parse(t), this.value = this.semver === n ? "" : this.operator + this.semver.version, s("comp", this);
		}
		parse(e) {
			let t = this.options.loose ? i[a.COMPARATORLOOSE] : i[a.COMPARATOR], r = e.match(t);
			if (!r) throw TypeError(`Invalid comparator: ${e}`);
			this.operator = r[1] === void 0 ? "" : r[1], this.operator === "=" && (this.operator = ""), this.semver = r[2] ? new c(r[2], this.options.loose) : n;
		}
		toString() {
			return this.value;
		}
		test(e) {
			if (s("Comparator.test", e, this.options.loose), this.semver === n || e === n) return !0;
			if (typeof e == "string") try {
				e = new c(e, this.options);
			} catch {
				return !1;
			}
			return o(e, this.operator, this.semver, this.options);
		}
		intersects(t, n) {
			if (!(t instanceof e)) throw TypeError("a Comparator is required");
			return this.operator === "" ? this.value === "" || new l(t.value, n).test(this.value) : t.operator === "" ? t.value === "" || new l(this.value, n).test(t.semver) : (n = r(n), n.includePrerelease && (this.value === "<0.0.0-0" || t.value === "<0.0.0-0") || !n.includePrerelease && (this.value.startsWith("<0.0.0") || t.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && t.operator.startsWith(">") || this.operator.startsWith("<") && t.operator.startsWith("<") || this.semver.version === t.semver.version && this.operator.includes("=") && t.operator.includes("=") || o(this.semver, "<", t.semver, n) && this.operator.startsWith(">") && t.operator.startsWith("<") || o(this.semver, ">", t.semver, n) && this.operator.startsWith("<") && t.operator.startsWith(">")));
		}
	};
	var r = W(), { safeRe: i, t: a } = U(), o = Gt(), s = H(), c = G(), l = Y();
})), Z = /* @__PURE__ */ f(((e, t) => {
	var n = Y();
	t.exports = (e, t, r) => {
		try {
			t = new n(t, r);
		} catch {
			return !1;
		}
		return t.test(e);
	};
})), Yt = /* @__PURE__ */ f(((e, t) => {
	var n = Y();
	t.exports = (e, t) => new n(e, t).set.map((e) => e.map((e) => e.value).join(" ").trim().split(" "));
})), Xt = /* @__PURE__ */ f(((e, t) => {
	var n = G(), r = Y();
	t.exports = (e, t, i) => {
		let a = null, o = null, s = null;
		try {
			s = new r(t, i);
		} catch {
			return null;
		}
		return e.forEach((e) => {
			s.test(e) && (!a || o.compare(e) === -1) && (a = e, o = new n(a, i));
		}), a;
	};
})), Zt = /* @__PURE__ */ f(((e, t) => {
	var n = G(), r = Y();
	t.exports = (e, t, i) => {
		let a = null, o = null, s = null;
		try {
			s = new r(t, i);
		} catch {
			return null;
		}
		return e.forEach((e) => {
			s.test(e) && (!a || o.compare(e) === 1) && (a = e, o = new n(a, i));
		}), a;
	};
})), Qt = /* @__PURE__ */ f(((e, t) => {
	var n = G(), r = Y(), i = J();
	t.exports = (e, t) => {
		e = new r(e, t);
		let a = new n("0.0.0");
		if (e.test(a) || (a = new n("0.0.0-0"), e.test(a))) return a;
		a = null;
		for (let t = 0; t < e.set.length; ++t) {
			let r = e.set[t], o = null;
			r.forEach((e) => {
				let t = new n(e.semver.version);
				switch (e.operator) {
					case ">": t.prerelease.length === 0 ? t.patch++ : t.prerelease.push(0), t.raw = t.format();
					case "":
					case ">=":
						(!o || i(t, o)) && (o = t);
						break;
					case "<":
					case "<=": break;
					/* istanbul ignore next */
					default: throw Error(`Unexpected operation: ${e.operator}`);
				}
			}), o && (!a || i(a, o)) && (a = o);
		}
		return a && e.test(a) ? a : null;
	};
})), $t = /* @__PURE__ */ f(((e, t) => {
	var n = Y();
	t.exports = (e, t) => {
		try {
			return new n(e, t).range || "*";
		} catch {
			return null;
		}
	};
})), Q = /* @__PURE__ */ f(((e, t) => {
	var n = G(), r = X(), { ANY: i } = r, a = Y(), o = Z(), s = J(), c = Bt(), l = Wt(), u = Ut();
	t.exports = (e, t, d, f) => {
		e = new n(e, f), t = new a(t, f);
		let p, m, h, g, _;
		switch (d) {
			case ">":
				p = s, m = l, h = c, g = ">", _ = ">=";
				break;
			case "<":
				p = c, m = u, h = s, g = "<", _ = "<=";
				break;
			default: throw TypeError("Must provide a hilo val of \"<\" or \">\"");
		}
		if (o(e, t, f)) return !1;
		for (let n = 0; n < t.set.length; ++n) {
			let a = t.set[n], o = null, s = null;
			if (a.forEach((e) => {
				e.semver === i && (e = new r(">=0.0.0")), o ||= e, s ||= e, p(e.semver, o.semver, f) ? o = e : h(e.semver, s.semver, f) && (s = e);
			}), o.operator === g || o.operator === _ || (!s.operator || s.operator === g) && m(e, s.semver) || s.operator === _ && h(e, s.semver)) return !1;
		}
		return !0;
	};
})), en = /* @__PURE__ */ f(((e, t) => {
	var n = Q();
	t.exports = (e, t, r) => n(e, t, ">", r);
})), tn = /* @__PURE__ */ f(((e, t) => {
	var n = Q();
	t.exports = (e, t, r) => n(e, t, "<", r);
})), nn = /* @__PURE__ */ f(((e, t) => {
	var n = Y();
	t.exports = (e, t, r) => (e = new n(e, r), t = new n(t, r), e.intersects(t, r));
})), rn = /* @__PURE__ */ f(((e, t) => {
	var n = Z(), r = q();
	t.exports = (e, t, i) => {
		let a = [], o = null, s = null, c = e.sort((e, t) => r(e, t, i));
		for (let e of c) n(e, t, i) ? (s = e, o ||= e) : (s && a.push([o, s]), s = null, o = null);
		o && a.push([o, null]);
		let l = [];
		for (let [e, t] of a) e === t ? l.push(e) : !t && e === c[0] ? l.push("*") : t ? e === c[0] ? l.push(`<=${t}`) : l.push(`${e} - ${t}`) : l.push(`>=${e}`);
		let u = l.join(" || "), d = typeof t.raw == "string" ? t.raw : String(t);
		return u.length < d.length ? u : t;
	};
})), an = /* @__PURE__ */ f(((e, t) => {
	var n = Y(), r = X(), { ANY: i } = r, a = Z(), o = q(), s = (e, t, r = {}) => {
		if (e === t) return !0;
		e = new n(e, r), t = new n(t, r);
		let i = !1;
		OUTER: for (let n of e.set) {
			for (let e of t.set) {
				let t = u(n, e, r);
				if (i ||= t !== null, t) continue OUTER;
			}
			if (i) return !1;
		}
		return !0;
	}, c = [new r(">=0.0.0-0")], l = [new r(">=0.0.0")], u = (e, t, n) => {
		if (e === t) return !0;
		if (e.length === 1 && e[0].semver === i) {
			if (t.length === 1 && t[0].semver === i) return !0;
			e = n.includePrerelease ? c : l;
		}
		if (t.length === 1 && t[0].semver === i) {
			if (n.includePrerelease) return !0;
			t = l;
		}
		let r = /* @__PURE__ */ new Set(), s, u;
		for (let t of e) t.operator === ">" || t.operator === ">=" ? s = d(s, t, n) : t.operator === "<" || t.operator === "<=" ? u = f(u, t, n) : r.add(t.semver);
		if (r.size > 1) return null;
		let p;
		if (s && u && (p = o(s.semver, u.semver, n), p > 0 || p === 0 && (s.operator !== ">=" || u.operator !== "<="))) return null;
		for (let e of r) {
			if (s && !a(e, String(s), n) || u && !a(e, String(u), n)) return null;
			for (let r of t) if (!a(e, String(r), n)) return !1;
			return !0;
		}
		let m, h, g, _, v = u && !n.includePrerelease && u.semver.prerelease.length ? u.semver : !1, y = s && !n.includePrerelease && s.semver.prerelease.length ? s.semver : !1;
		v && v.prerelease.length === 1 && u.operator === "<" && v.prerelease[0] === 0 && (v = !1);
		for (let e of t) {
			if (_ = _ || e.operator === ">" || e.operator === ">=", g = g || e.operator === "<" || e.operator === "<=", s) {
				if (y && e.semver.prerelease && e.semver.prerelease.length && e.semver.major === y.major && e.semver.minor === y.minor && e.semver.patch === y.patch && (y = !1), e.operator === ">" || e.operator === ">=") {
					if (m = d(s, e, n), m === e && m !== s) return !1;
				} else if (s.operator === ">=" && !e.test(s.semver)) return !1;
			}
			if (u) {
				if (v && e.semver.prerelease && e.semver.prerelease.length && e.semver.major === v.major && e.semver.minor === v.minor && e.semver.patch === v.patch && (v = !1), e.operator === "<" || e.operator === "<=") {
					if (h = f(u, e, n), h === e && h !== u) return !1;
				} else if (u.operator === "<=" && !e.test(u.semver)) return !1;
			}
			if (!e.operator && (u || s) && p !== 0) return !1;
		}
		return !(s && g && !u && p !== 0 || u && _ && !s && p !== 0 || y || v);
	}, d = (e, t, n) => {
		if (!e) return t;
		let r = o(e.semver, t.semver, n);
		return r > 0 ? e : r < 0 || t.operator === ">" && e.operator === ">=" ? t : e;
	}, f = (e, t, n) => {
		if (!e) return t;
		let r = o(e.semver, t.semver, n);
		return r < 0 ? e : r > 0 || t.operator === "<" && e.operator === "<=" ? t : e;
	};
	t.exports = s;
})), on = /* @__PURE__ */ m((/* @__PURE__ */ f(((e, t) => {
	var n = U(), r = V(), i = G(), a = Et();
	t.exports = {
		parse: K(),
		valid: Dt(),
		clean: Ot(),
		inc: kt(),
		diff: At(),
		major: jt(),
		minor: Mt(),
		patch: Nt(),
		prerelease: Pt(),
		compare: q(),
		rcompare: Ft(),
		compareLoose: It(),
		compareBuild: Lt(),
		sort: Rt(),
		rsort: zt(),
		gt: J(),
		lt: Bt(),
		eq: Vt(),
		neq: Ht(),
		gte: Ut(),
		lte: Wt(),
		cmp: Gt(),
		coerce: Kt(),
		truncate: qt(),
		Comparator: X(),
		Range: Y(),
		satisfies: Z(),
		toComparators: Yt(),
		maxSatisfying: Xt(),
		minSatisfying: Zt(),
		minVersion: Qt(),
		validRange: $t(),
		outside: Q(),
		gtr: en(),
		ltr: tn(),
		intersects: nn(),
		simplifyRange: rn(),
		subset: an(),
		SemVer: i,
		re: n.re,
		src: n.src,
		tokens: n.t,
		SEMVER_SPEC_VERSION: r.SEMVER_SPEC_VERSION,
		RELEASE_TYPES: r.RELEASE_TYPES,
		compareIdentifiers: a.compareIdentifiers,
		rcompareIdentifiers: a.rcompareIdentifiers
	};
})))(), 1), sn = async (e) => {
	let t = await i(e);
	return {
		data: t,
		name: a(e),
		size: t.length
	};
}, cn = (e) => r("sha256").update(e).digest("hex"), ln = (e) => e.notes?.trim() ? e.notes : `Release ${e.version}`, un = async (e, t, n, r) => {
	let { tag: i } = r, a = ln(r), o = r.draft, s = r.prerelease, c = () => e.rest.repos.getReleaseByTag({
		owner: t,
		repo: n,
		tag: i
	});
	try {
		let { data: r } = await c(), { data: l } = await e.rest.repos.updateRelease({
			owner: t,
			repo: n,
			release_id: r.id,
			name: i,
			body: a,
			tag_name: i,
			...o === void 0 ? {} : { draft: o },
			...s === void 0 ? {} : { prerelease: s }
		});
		return {
			release: l,
			created: !1
		};
	} catch (e) {
		if (e.status !== 404) throw e;
	}
	try {
		let { data: c } = await e.rest.repos.createRelease({
			owner: t,
			repo: n,
			tag_name: i,
			name: i,
			body: a,
			draft: o,
			prerelease: s,
			target_commitish: r.target
		});
		return {
			release: c,
			created: !0
		};
	} catch (e) {
		if (e.status !== 422) throw e;
		let { data: t } = await c();
		return {
			release: t,
			created: !1
		};
	}
}, dn = async (e, t, n, r, i) => {
	let a = new Set(i.map((e) => e.name));
	for (let i of r.assets) a.has(i.name) && await e.rest.repos.deleteReleaseAsset({
		owner: t,
		repo: n,
		asset_id: i.id
	});
	let o = [];
	for (let { name: a, data: s, contentType: c } of i) await e.rest.repos.uploadReleaseAsset({
		owner: t,
		repo: n,
		release_id: r.id,
		name: a,
		data: s,
		headers: { "content-type": c }
	}), o.push(a);
	return o;
}, $ = (e) => process.env[e]?.trim() || void 0, fn = (e) => {
	if (e !== void 0 && e !== "") return /^(1|true|yes|on)$/i.test(e);
}, pn = "Usage: aryas-cli [options]\n\nPublishes a release artifact and its .sha256 checksum to GitHub.\nReads GITHUB_REPO (owner/repo) and GITHUB_TOKEN from the environment.\n\nOptions:\n  --version <semver>    Release version (e.g. 1.2.3)\n  --tag-prefix <prefix> Tag prefix prepended to the version (e.g. \"v\")\n  --zip <path>          Path to the zip artifact\n  --notes <text>        Release notes (defaults to \"Release <version>\")\n  --draft               Mark the release as a draft\n  --prerelease          Mark the release as a pre-release\n  --no-input            Never prompt; fail if a required value is missing\n  --help, -h            Show this message\n\nAny missing value is prompted for interactively, unless --no-input is set or\nstdin is not a TTY (as in CI). The version also falls back to the tag in\nGITHUB_REF_NAME, with the tag prefix stripped.\n\nEnvironment fallbacks: ARYAS_VERSION, ARYAS_TAG_PREFIX, ARYAS_ZIP,\nARYAS_NOTES, ARYAS_DRAFT, ARYAS_PRERELEASE, ARYAS_TARGET, GITHUB_REPO,\nGITHUB_TOKEN, GITHUB_API_URL.\n", mn = (e) => {
	let t = {}, n = !1;
	for (let r = 0; r < e.length; r++) {
		let i = e[r];
		if ((i === "--help" || i === "-h") && (console.log(pn), process.exit(0)), i === "--draft" || i === "--prerelease" || i === "--no-input") {
			i === "--draft" ? t.draft = !0 : i === "--prerelease" ? t.prerelease = !0 : n = !0;
			continue;
		}
		if (i.startsWith("--")) {
			let n = i.slice(2), a = e[r + 1];
			if (a === void 0 || a.startsWith("--")) throw Error(`Missing value for ${i}.`);
			if (r++, n === "version") t.version = a;
			else if (n === "tag-prefix") t.tagPrefix = a;
			else if (n === "zip") t.zipPath = a;
			else if (n === "notes") t.notes = a;
			else throw Error(`Unknown option ${i}.`);
		} else throw Error(`Unexpected argument "${i}".`);
	}
	return {
		flags: t,
		noInput: n
	};
}, hn = (e) => e < 1024 ? `${e} B` : e < 1024 ** 2 ? `${(e / 1024).toFixed(1)} KiB` : e < 1024 ** 3 ? `${(e / 1024 ** 2).toFixed(1)} MiB` : `${(e / 1024 ** 3).toFixed(1)} GiB`, gn = async () => {
	let { flags: r, noInput: i } = mn(process.argv.slice(2)), a = $("GITHUB_TOKEN");
	if (!a) throw Error("GITHUB_TOKEN is not set.");
	let o = $("GITHUB_REPO");
	if (!o) throw Error("GITHUB_REPO is not set (expected owner/repo).");
	let [s, c] = o.split("/");
	if (!s || !c) throw Error(`Invalid GITHUB_REPO "${o}". Expected "owner/repo".`);
	let l = r.tagPrefix ?? $("ARYAS_TAG_PREFIX") ?? "", u = $("GITHUB_REF_NAME"), d = u?.startsWith(l) ? u.slice(l.length) : u, f = !i && e.isTTY === !0, p = null, m = () => {
		p?.close(), p = null;
	}, h = async (r, i) => {
		if (!f) {
			if (i) return i;
			throw Error(`${r} is required (pass it as an option or run interactively).`);
		}
		p ??= n({
			input: e,
			output: t
		});
		let a = i === void 0 ? "" : ` (default: ${i})`, o = (await p.question(`${r}${a}: `)).trim() || i;
		if (!o) throw Error(`${r} is required (pass it as an option or run interactively).`);
		return o;
	};
	try {
		let e = r.version ?? $("ARYAS_VERSION") ?? await h("Version", d), t = r.zipPath ?? $("ARYAS_ZIP") ?? await h("Path to zip artifact"), n = r.notes ?? $("ARYAS_NOTES"), i = r.draft ?? fn($("ARYAS_DRAFT")), o = r.prerelease ?? fn($("ARYAS_PRERELEASE"));
		if (!on.default.valid(e)) throw Error(`"${e}" is not a valid semver version.`);
		let u = `${l}${e}`, f = await sn(t), p = `${f.name}.sha256`, m = Buffer.from(`${cn(f.data)}  ${f.name}\n`, "utf-8"), g = $("GITHUB_API_URL"), _ = new Tt({
			auth: a,
			...g ? { baseUrl: g } : {}
		});
		console.log(`Publishing ${u} to ${s}/${c}...`);
		let { release: v, created: y } = await un(_, s, c, {
			tag: u,
			version: e,
			notes: n,
			draft: i,
			prerelease: o,
			target: $("ARYAS_TARGET")
		});
		console.log(y ? `Created release ${u}.` : `Tag ${u} already existed; release updated.`), await dn(_, s, c, v, [{
			name: f.name,
			data: f.data,
			contentType: "application/zip"
		}, {
			name: p,
			data: m,
			contentType: "text/plain"
		}]), console.log(`Uploaded ${f.name} (${hn(f.size)}).`), console.log(`Uploaded ${p}.`), console.log(`Release: ${v.html_url}`);
	} finally {
		m();
	}
};
try {
	await gn();
} catch (e) {
	console.error(`aryas-cli: ${e instanceof Error ? e.message : String(e)}`), process.exitCode = 1;
}
//#endregion
