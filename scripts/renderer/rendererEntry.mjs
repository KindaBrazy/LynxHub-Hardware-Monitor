//#region \0vite/preload-helper.js
(function() {
	try {
		var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {};
		e.SENTRY_RELEASE = { id: "17561bda7d32de6a59c60e7229a41d6eb183b31a" };
		var n = new e.Error().stack;
		n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "31530299-1e7f-484d-bd77-0fac035fd6d9", e._sentryDebugIdIdentifier = "sentry-dbid-31530299-1e7f-484d-bd77-0fac035fd6d9");
	} catch (e) {}
})();
var scriptRel = /* @__PURE__ */ (function detectScriptRel() {
	const relList = typeof document !== "undefined" && document.createElement("link").relList;
	return relList && relList.supports && relList.supports("modulepreload") ? "modulepreload" : "preload";
})();
var assetsURL = function(dep, importerUrl) {
	return new URL(dep, importerUrl).href;
};
var seen$1 = {};
var __vitePreload = function preload(baseModule, deps, importerUrl) {
	let promise = Promise.resolve();
	if (deps && deps.length > 0) {
		const links = document.getElementsByTagName("link");
		const cspNonceMeta = document.querySelector("meta[property=csp-nonce]");
		const cspNonce = cspNonceMeta?.nonce || cspNonceMeta?.getAttribute("nonce");
		function allSettled(promises) {
			return Promise.all(promises.map((p) => Promise.resolve(p).then((value) => ({
				status: "fulfilled",
				value
			}), (reason) => ({
				status: "rejected",
				reason
			}))));
		}
		function importMetaResolve(specifier) {
			if (import.meta.resolve) return import.meta.resolve(specifier);
			return new URL(
				specifier,
				/** #__KEEP__ */
				import.meta.url
			).href;
		}
		promise = allSettled(deps.map((dep) => {
			dep = assetsURL(dep, importerUrl);
			dep = importMetaResolve(dep);
			if (dep in seen$1) return;
			seen$1[dep] = true;
			const isCss = dep.endsWith(".css");
			for (let i = links.length - 1; i >= 0; i--) {
				const link = links[i];
				if (link.href === dep && (!isCss || link.rel === "stylesheet")) return;
			}
			const link = document.createElement("link");
			link.rel = isCss ? "stylesheet" : scriptRel;
			if (!isCss) link.as = "script";
			link.crossOrigin = "";
			link.href = dep;
			if (cspNonce) link.setAttribute("nonce", cspNonce);
			document.head.appendChild(link);
			if (isCss) return new Promise((res, rej) => {
				link.addEventListener("load", res);
				link.addEventListener("error", () => rej(/* @__PURE__ */ new Error(`Unable to preload CSS for ${dep}`)));
			});
		}));
	}
	function handlePreloadError(err) {
		const e = new Event("vite:preloadError", { cancelable: true });
		e.payload = err;
		window.dispatchEvent(e);
		if (!e.defaultPrevented) throw err;
	}
	return promise.then((res) => {
		for (const item of res || []) {
			if (item.status !== "rejected") continue;
			handlePreloadError(item.reason);
		}
		return baseModule().catch(handlePreloadError);
	});
};
//#endregion
//#region \0virtual:__remoteEntryHelper__rendererEntry.mjs
var currentImports = {};
var exportSet = /* @__PURE__ */ new Set([
	"Module",
	"__esModule",
	"default",
	"_export_sfc"
]);
var moduleMap = { "Extension": () => {
	dynamicLoadingCss(["style-ubazG2rJ.css"], false, "Extension");
	return __federation_import("./__federation_expose_Extension-Cpc6CMRw.js").then((module) => Object.keys(module).every((item) => exportSet.has(item)) ? () => module.default : () => module);
} };
var seen = {};
var dynamicLoadingCss = (cssFilePaths, dontAppendStylesToHead, exposeItemName) => {
	const metaUrl = import.meta.url;
	if (typeof metaUrl === "undefined") {
		console.warn("The remote style takes effect only when the build.target option in the vite.config.ts file is higher than that of \"es2020\".");
		return;
	}
	const curUrl = metaUrl.substring(0, metaUrl.lastIndexOf("rendererEntry.mjs"));
	const base = '/';
	'';
	cssFilePaths.forEach((cssPath) => {
		let href = "";
		const baseUrl = base || curUrl;
		if (baseUrl) {
			const trimmer = {
				trailing: (path) => path.endsWith("/") ? path.slice(0, -1) : path,
				leading: (path) => path.startsWith("/") ? path.slice(1) : path
			};
			const isAbsoluteUrl = (url) => url.startsWith("http") || url.startsWith("//");
			const cleanBaseUrl = trimmer.trailing(baseUrl);
			const cleanCssPath = trimmer.leading(cssPath);
			const cleanCurUrl = trimmer.trailing(curUrl);
			if (isAbsoluteUrl(baseUrl)) href = [cleanBaseUrl, cleanCssPath].filter(Boolean).join("/");
			else if (cleanCurUrl.includes(cleanBaseUrl)) href = [cleanCurUrl, cleanCssPath].filter(Boolean).join("/");
			else href = [cleanCurUrl + cleanBaseUrl, cleanCssPath].filter(Boolean).join("/");
		} else href = cssPath;
		if (dontAppendStylesToHead) {
			const key = "css__extension__" + exposeItemName;
			window[key] = window[key] || [];
			window[key].push(href);
			return;
		}
		if (href in seen) return;
		seen[href] = true;
		const element = document.createElement("link");
		element.rel = "stylesheet";
		element.href = href;
		document.head.appendChild(element);
	});
};
async function __federation_import(name) {
	currentImports[name] ??= __vitePreload(() => import(name), [], import.meta.url);
	return currentImports[name];
}
var get = (module) => {
	if (!moduleMap[module]) throw new Error("Can not find remote module " + module);
	return moduleMap[module]();
};
var init = (shareScope) => {
	globalThis.__federation_shared__ = globalThis.__federation_shared__ || {};
	Object.entries(shareScope).forEach(([key, value]) => {
		for (const [versionKey, versionValue] of Object.entries(value)) {
			const scope = versionValue.scope || "default";
			globalThis.__federation_shared__[scope] = globalThis.__federation_shared__[scope] || {};
			const shared = globalThis.__federation_shared__[scope];
			(shared[key] = shared[key] || {})[versionKey] = versionValue;
		}
	});
};
//#endregion
export { dynamicLoadingCss, get, init };
