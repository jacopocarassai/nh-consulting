globalThis.__nitro_main__ = import.meta.url;
import { a as toEventHandler, c as serve, i as defineLazyEventHandler, n as HTTPError, r as defineHandler, s as NodeResponse, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { i as withoutTrailingSlash, n as joinURL, r as withLeadingSlash, t as decodePath } from "./_libs/ufo.mjs";
import { promises } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"3aee-VPOpKIVr8jl2v/SaIJkNHMG2UBw\"",
		"mtime": "2026-07-16T14:03:07.453Z",
		"size": 15086,
		"path": "../public/favicon.ico"
	},
	"/assets/NH_Logo_sv-Cl52dr9u.svg": {
		"type": "image/svg+xml",
		"etag": "\"3608-Mej2VrVH3jan3PEI8H0l/7dBado\"",
		"mtime": "2026-07-16T14:03:07.227Z",
		"size": 13832,
		"path": "../public/assets/NH_Logo_sv-Cl52dr9u.svg"
	},
	"/assets/admin-C0VXsCLa.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a9a-StVnNvjZhLwhTy4Uin52nBoJNxA\"",
		"mtime": "2026-07-16T14:03:07.226Z",
		"size": 6810,
		"path": "../public/assets/admin-C0VXsCLa.js"
	},
	"/assets/auth-9S6rkQhw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"754-iMJDoITOiTHUnX4KPifMomglTiA\"",
		"mtime": "2026-07-16T14:03:07.226Z",
		"size": 1876,
		"path": "../public/assets/auth-9S6rkQhw.js"
	},
	"/assets/case-1-BlIRlheM.jpg": {
		"type": "image/jpeg",
		"etag": "\"4fd7-7zHhiQvJ3LDffL+DOyb22CdE3dY\"",
		"mtime": "2026-07-16T14:03:07.227Z",
		"size": 20439,
		"path": "../public/assets/case-1-BlIRlheM.jpg"
	},
	"/assets/case-3-RES7DCl7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"81-bB4rrI8SbLf6uQSiilAivK9+wDI\"",
		"mtime": "2026-07-16T14:03:07.226Z",
		"size": 129,
		"path": "../public/assets/case-3-RES7DCl7.js"
	},
	"/assets/case-2-DcRl3Ban.jpg": {
		"type": "image/jpeg",
		"etag": "\"8e00-l/ViZKxPCWPSZTyIGs1aJRJ18C8\"",
		"mtime": "2026-07-16T14:03:07.227Z",
		"size": 36352,
		"path": "../public/assets/case-2-DcRl3Ban.jpg"
	},
	"/assets/case-3-s0q7BQoC.jpg": {
		"type": "image/jpeg",
		"etag": "\"1605d-S/wIsx7Ii8PY+yAT1RgRI9eDm4E\"",
		"mtime": "2026-07-16T14:03:07.227Z",
		"size": 90205,
		"path": "../public/assets/case-3-s0q7BQoC.jpg"
	},
	"/assets/nathalie-I9ue4xde.webp": {
		"type": "image/webp",
		"etag": "\"7c26-Gx/xaSiv31jCWZqglmWQfsdHdpk\"",
		"mtime": "2026-07-16T14:03:07.227Z",
		"size": 31782,
		"path": "../public/assets/nathalie-I9ue4xde.webp"
	},
	"/assets/project._id-B0j7KnFe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1bc-qqQqkTrTNgiqIzdhY8Q7wmHojfA\"",
		"mtime": "2026-07-16T14:03:07.226Z",
		"size": 444,
		"path": "../public/assets/project._id-B0j7KnFe.js"
	},
	"/assets/route-C02KwEUG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8b-5Pe/Y95RUxSyUenb82+WNYT29p0\"",
		"mtime": "2026-07-16T14:03:07.226Z",
		"size": 139,
		"path": "../public/assets/route-C02KwEUG.js"
	},
	"/assets/project._id-DsVox8fi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1710-tdGvm1oCHWbDq7nwrWCut2OiS5k\"",
		"mtime": "2026-07-16T14:03:07.226Z",
		"size": 5904,
		"path": "../public/assets/project._id-DsVox8fi.js"
	},
	"/assets/routes-Ck6SCiQi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"40ab-BNjqTzRkX6rNz6zPlqv3+kMkGyM\"",
		"mtime": "2026-07-16T14:03:07.226Z",
		"size": 16555,
		"path": "../public/assets/routes-Ck6SCiQi.js"
	},
	"/assets/styles-e-ThOE94.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"14d52-kaFXiHVIUKi9jteoTX9V6a98qhE\"",
		"mtime": "2026-07-16T14:03:07.227Z",
		"size": 85330,
		"path": "../public/assets/styles-e-ThOE94.css"
	},
	"/assets/useBaseQuery-DHTKFtCZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2261-P30dp9vPVjOo7uJ60nmLPiHwq0k\"",
		"mtime": "2026-07-16T14:03:07.226Z",
		"size": 8801,
		"path": "../public/assets/useBaseQuery-DHTKFtCZ.js"
	},
	"/assets/useQuery-ux2VJ1J3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"60-r8ZGpg7rs/8jK/8O2c/taNEoHZE\"",
		"mtime": "2026-07-16T14:03:07.227Z",
		"size": 96,
		"path": "../public/assets/useQuery-ux2VJ1J3.js"
	},
	"/assets/index-DkXpRsiT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"84eed-egRUc4mTOrpV4cvgQv9buixbbXs\"",
		"mtime": "2026-07-16T14:03:07.226Z",
		"size": 544493,
		"path": "../public/assets/index-DkXpRsiT.js"
	},
	"/assets/useRouter-Cox3-v4z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"212e-A3nkKsEZa+WTLrFde+IVcdUlJj8\"",
		"mtime": "2026-07-16T14:03:07.227Z",
		"size": 8494,
		"path": "../public/assets/useRouter-Cox3-v4z.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets-node
function readAsset(id) {
	const serverDir = dirname(fileURLToPath(globalThis.__nitro_main__));
	return promises.readFile(resolve(serverDir, public_assets_data_default[id].path));
}
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
function getAsset(id) {
	return public_assets_data_default[id];
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/static.mjs
var METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
var EncodingMap = {
	gzip: ".gz",
	br: ".br",
	zstd: ".zst"
};
var static_default = defineHandler((event) => {
	if (event.req.method && !METHODS.has(event.req.method)) return;
	let id = decodePath(withLeadingSlash(withoutTrailingSlash(event.url.pathname)));
	let asset;
	const encodings = [...(event.req.headers.get("accept-encoding") || "").split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(), ""];
	for (const encoding of encodings) for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
		const _asset = getAsset(_id);
		if (_asset) {
			asset = _asset;
			id = _id;
			break;
		}
	}
	if (!asset) {
		if (isPublicAssetURL(id)) {
			event.res.headers.delete("Cache-Control");
			throw new HTTPError({ status: 404 });
		}
		return;
	}
	if (encodings.length > 1) event.res.headers.append("Vary", "Accept-Encoding");
	if (event.req.headers.get("if-none-match") === asset.etag) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	const ifModifiedSinceH = event.req.headers.get("if-modified-since");
	const mtimeDate = new Date(asset.mtime);
	if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	if (asset.type) event.res.headers.set("Content-Type", asset.type);
	if (asset.etag && !event.res.headers.has("ETag")) event.res.headers.set("ETag", asset.etag);
	if (asset.mtime && !event.res.headers.has("Last-Modified")) event.res.headers.set("Last-Modified", mtimeDate.toUTCString());
	if (asset.encoding && !event.res.headers.has("Content-Encoding")) event.res.headers.set("Content-Encoding", asset.encoding);
	if (asset.size > 0 && !event.res.headers.has("Content-Length")) event.res.headers.set("Content-Length", asset.size.toString());
	return readAsset(id);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy__g2882 = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy__g2882
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
var globalMiddleware = [toEventHandler(static_default)].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new NodeResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~middleware"].push(...globalMiddleware);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		middleware.push(...h3App["~middleware"]);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/hooks.mjs
function _captureError(error, type) {
	console.error(`[${type}]`, error);
	useNitroApp().captureError?.(error, { tags: [type] });
}
function trapUnhandledErrors() {
	process.on("unhandledRejection", (error) => _captureError(error, "unhandledRejection"));
	process.on("uncaughtException", (error) => _captureError(error, "uncaughtException"));
}
//#endregion
//#region #nitro/virtual/tracing
var tracingSrvxPlugins = [];
//#endregion
//#region node_modules/nitro/dist/presets/node/runtime/node-server.mjs
var _parsedPort = Number.parseInt(process.env.NITRO_PORT ?? process.env.PORT ?? "");
var port = Number.isNaN(_parsedPort) ? 3e3 : _parsedPort;
var host = process.env.NITRO_HOST || process.env.HOST;
var cert = process.env.NITRO_SSL_CERT;
var key = process.env.NITRO_SSL_KEY;
var nitroApp = useNitroApp();
serve({
	port,
	hostname: host,
	tls: cert && key ? {
		cert,
		key
	} : void 0,
	fetch: nitroApp.fetch,
	plugins: [...tracingSrvxPlugins]
});
trapUnhandledErrors();
var node_server_default = {};
//#endregion
export { node_server_default as default };
