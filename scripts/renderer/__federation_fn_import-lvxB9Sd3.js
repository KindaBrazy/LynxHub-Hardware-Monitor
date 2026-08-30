(function() {
	try {
		var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {};
		e.SENTRY_RELEASE = { id: "f9f2e045fae8353a4c8417903eeca14e9c7534d6" };
		var n = new e.Error().stack;
		n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "c4b5d1b2-cd41-4a6e-8521-0febd6b65c0f", e._sentryDebugIdIdentifier = "sentry-dbid-c4b5d1b2-cd41-4a6e-8521-0febd6b65c0f");
	} catch (e) {}
})();
import { n as getSharedFromRuntime, r as importShared, t as getSharedFromLocal } from "./_virtual___federation_fn_import-DeyyGZp8.js";
export { importShared, getSharedFromLocal as importSharedLocal, getSharedFromRuntime as importSharedRuntime };
