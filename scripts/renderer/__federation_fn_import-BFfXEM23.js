(function() {
	try {
		var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {};
		e.SENTRY_RELEASE = { id: "17561bda7d32de6a59c60e7229a41d6eb183b31a" };
		var n = new e.Error().stack;
		n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "c4b5d1b2-cd41-4a6e-8521-0febd6b65c0f", e._sentryDebugIdIdentifier = "sentry-dbid-c4b5d1b2-cd41-4a6e-8521-0febd6b65c0f");
	} catch (e) {}
})();
import { n as getSharedFromRuntime, r as importShared, t as getSharedFromLocal } from "./_virtual___federation_fn_import-BRUIZv03.js";
export { importShared, getSharedFromLocal as importSharedLocal, getSharedFromRuntime as importSharedRuntime };
