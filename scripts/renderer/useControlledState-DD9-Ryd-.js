import { n as __commonJSMin, t as require_react } from "./react-G_MRPtAP.js";
import { r as importShared } from "./_virtual___federation_fn_import-ChPcBYrR.js";
//#region node_modules/react-aria/dist/private/utils/useLayoutEffect.mjs
var $3ARPR$react = await importShared("react");
var $c4867b2f328c2698$export$e5c5a5f917a5871c = typeof document !== "undefined" ? $3ARPR$react.useLayoutEffect : () => {};
//#endregion
//#region node_modules/react-aria/dist/private/ssr/SSRProvider.mjs
var $bl59K$react = await importShared("react");
var { useContext: $bl59K$useContext, useState: $bl59K$useState, useMemo: $bl59K$useMemo, useLayoutEffect: $bl59K$useLayoutEffect, useRef: $bl59K$useRef } = $bl59K$react;
var $c7eafbbe1ea5834e$var$defaultContext = {
	prefix: String(Math.round(Math.random() * 1e10)),
	current: 0
};
var $c7eafbbe1ea5834e$var$SSRContext = /*#__PURE__*/ $bl59K$react.createContext($c7eafbbe1ea5834e$var$defaultContext);
var $c7eafbbe1ea5834e$var$IsSSRContext = /*#__PURE__*/ $bl59K$react.createContext(false);
function $c7eafbbe1ea5834e$var$LegacySSRProvider(props) {
	let cur = $bl59K$useContext($c7eafbbe1ea5834e$var$SSRContext);
	let counter = $c7eafbbe1ea5834e$var$useCounter(cur === $c7eafbbe1ea5834e$var$defaultContext);
	let [isSSR, setIsSSR] = $bl59K$useState(true);
	let value = $bl59K$useMemo(() => ({
		prefix: cur === $c7eafbbe1ea5834e$var$defaultContext ? "" : `${cur.prefix}-${counter}`,
		current: 0
	}), [cur, counter]);
	if (typeof document !== "undefined") $bl59K$useLayoutEffect(() => {
		setIsSSR(false);
	}, []);
	return /*#__PURE__*/ $bl59K$react.createElement($c7eafbbe1ea5834e$var$SSRContext.Provider, { value }, /*#__PURE__*/ $bl59K$react.createElement($c7eafbbe1ea5834e$var$IsSSRContext.Provider, { value: isSSR }, props.children));
}
function $c7eafbbe1ea5834e$export$9f8ac96af4b1b2ae(props) {
	if (typeof $bl59K$react["useId"] === "function") return /*#__PURE__*/ $bl59K$react.createElement($bl59K$react.Fragment, null, props.children);
	return /*#__PURE__*/ $bl59K$react.createElement($c7eafbbe1ea5834e$var$LegacySSRProvider, props);
}
Boolean(typeof window !== "undefined" && window.document && window.document.createElement);
var $c7eafbbe1ea5834e$var$componentIds = /* @__PURE__ */ new WeakMap();
function $c7eafbbe1ea5834e$var$useCounter(isDisabled = false) {
	let ctx = $bl59K$useContext($c7eafbbe1ea5834e$var$SSRContext);
	let ref = $bl59K$useRef(null);
	if (ref.current === null && !isDisabled) {
		let currentOwner = $bl59K$react.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED?.ReactCurrentOwner?.current;
		if (currentOwner) {
			let prevComponentValue = $c7eafbbe1ea5834e$var$componentIds.get(currentOwner);
			if (prevComponentValue == null) $c7eafbbe1ea5834e$var$componentIds.set(currentOwner, {
				id: ctx.current,
				state: currentOwner.memoizedState
			});
			else if (currentOwner.memoizedState !== prevComponentValue.state) {
				ctx.current = prevComponentValue.id;
				$c7eafbbe1ea5834e$var$componentIds.delete(currentOwner);
			}
		}
		ref.current = ++ctx.current;
	}
	return ref.current;
}
function $c7eafbbe1ea5834e$var$useLegacySSRSafeId(defaultId) {
	let ctx = $bl59K$useContext($c7eafbbe1ea5834e$var$SSRContext);
	let counter = $c7eafbbe1ea5834e$var$useCounter(!!defaultId);
	let prefix = `react-aria${ctx.prefix}`;
	return defaultId || `${prefix}-${counter}`;
}
function $c7eafbbe1ea5834e$var$useModernSSRSafeId(defaultId) {
	let id = $bl59K$react.useId();
	let [didSSR] = $bl59K$useState($c7eafbbe1ea5834e$export$535bd6ca7f90a273());
	let prefix = didSSR || false ? "react-aria" : `react-aria${$c7eafbbe1ea5834e$var$defaultContext.prefix}`;
	return defaultId || `${prefix}-${id}`;
}
var $c7eafbbe1ea5834e$export$619500959fc48b26 = typeof $bl59K$react["useId"] === "function" ? $c7eafbbe1ea5834e$var$useModernSSRSafeId : $c7eafbbe1ea5834e$var$useLegacySSRSafeId;
function $c7eafbbe1ea5834e$var$getSnapshot() {
	return false;
}
function $c7eafbbe1ea5834e$var$getServerSnapshot() {
	return true;
}
function $c7eafbbe1ea5834e$var$subscribe(onStoreChange) {
	return () => {};
}
function $c7eafbbe1ea5834e$export$535bd6ca7f90a273() {
	if (typeof $bl59K$react["useSyncExternalStore"] === "function") return $bl59K$react["useSyncExternalStore"]($c7eafbbe1ea5834e$var$subscribe, $c7eafbbe1ea5834e$var$getSnapshot, $c7eafbbe1ea5834e$var$getServerSnapshot);
	return $bl59K$useContext($c7eafbbe1ea5834e$var$IsSSRContext);
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/useValueEffect.mjs
var { useState: $dPTrK$useState, useRef: $dPTrK$useRef, useCallback: $dPTrK$useCallback } = await importShared("react");
function $1a716630a9e3a599$export$14d238f342723f25(defaultValue) {
	let [value, setValue] = $dPTrK$useState(defaultValue);
	let currValue = $dPTrK$useRef(value);
	let effect = $dPTrK$useRef(null);
	let nextRef = $dPTrK$useRef(() => {
		if (!effect.current) return;
		let newValue = effect.current.next();
		if (newValue.done) {
			effect.current = null;
			return;
		}
		if (currValue.current === newValue.value) nextRef.current();
		else setValue(newValue.value);
	});
	$c4867b2f328c2698$export$e5c5a5f917a5871c(() => {
		currValue.current = value;
		if (effect.current) nextRef.current();
	});
	return [value, $dPTrK$useCallback((fn) => {
		effect.current = fn(currValue.current);
		nextRef.current();
	}, [nextRef])];
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/useId.mjs
var { useState: $4QKZm$useState, useRef: $4QKZm$useRef, useEffect: $4QKZm$useEffect, useCallback: $4QKZm$useCallback } = await importShared("react");
var $390e54f620492c70$var$canUseDOM = Boolean(typeof window !== "undefined" && window.document && window.document.createElement);
var $390e54f620492c70$export$d41a04c74483c6ef = /* @__PURE__ */ new Map();
var $390e54f620492c70$var$registry;
if (typeof FinalizationRegistry !== "undefined") $390e54f620492c70$var$registry = new FinalizationRegistry((heldValue) => {
	$390e54f620492c70$export$d41a04c74483c6ef.delete(heldValue);
});
function $390e54f620492c70$export$f680877a34711e37(defaultId) {
	let [value, setValue] = $4QKZm$useState(defaultId);
	let nextId = $4QKZm$useRef(null);
	let res = $c7eafbbe1ea5834e$export$619500959fc48b26(value);
	let cleanupRef = $4QKZm$useRef(null);
	if ($390e54f620492c70$var$registry) $390e54f620492c70$var$registry.register(cleanupRef, res);
	if ($390e54f620492c70$var$canUseDOM) {
		const cacheIdRef = $390e54f620492c70$export$d41a04c74483c6ef.get(res);
		if (cacheIdRef && !cacheIdRef.includes(nextId)) cacheIdRef.push(nextId);
		else $390e54f620492c70$export$d41a04c74483c6ef.set(res, [nextId]);
	}
	$c4867b2f328c2698$export$e5c5a5f917a5871c(() => {
		let r = res;
		return () => {
			if ($390e54f620492c70$var$registry) $390e54f620492c70$var$registry.unregister(cleanupRef);
			$390e54f620492c70$export$d41a04c74483c6ef.delete(r);
		};
	}, [res]);
	$4QKZm$useEffect(() => {
		let newId = nextId.current;
		if (newId) setValue(newId);
		return () => {
			if (newId) nextId.current = null;
		};
	});
	return res;
}
function $390e54f620492c70$export$cd8c9cb68f842629(idA, idB) {
	if (idA === idB) return idA;
	let setIdsA = $390e54f620492c70$export$d41a04c74483c6ef.get(idA);
	if (setIdsA) {
		setIdsA.forEach((ref) => ref.current = idB);
		return idB;
	}
	let setIdsB = $390e54f620492c70$export$d41a04c74483c6ef.get(idB);
	if (setIdsB) {
		setIdsB.forEach((ref) => ref.current = idA);
		return idA;
	}
	return idB;
}
function $390e54f620492c70$export$b4cc09c592e8fdb8(depArray = []) {
	let id = $390e54f620492c70$export$f680877a34711e37();
	let [resolvedId, setResolvedId] = $1a716630a9e3a599$export$14d238f342723f25(id);
	let updateId = $4QKZm$useCallback(() => {
		setResolvedId(function* () {
			yield id;
			yield document.getElementById(id) ? id : void 0;
		});
	}, [id, setResolvedId]);
	$c4867b2f328c2698$export$e5c5a5f917a5871c(updateId, [
		id,
		updateId,
		...depArray
	]);
	return resolvedId;
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/chain.mjs
/**
* Calls all functions in the order they were chained with the same arguments.
*/ function $a4e76a5424781910$export$e08e3b67e392101e(...callbacks) {
	return (...args) => {
		for (let callback of callbacks) if (typeof callback === "function") callback(...args);
	};
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/mergeRefs.mjs
function $4064df0d6f9620e1$export$c9058316764c140e(...refs) {
	if (refs.length === 1 && refs[0]) return refs[0];
	return (value) => {
		let hasCleanup = false;
		const cleanups = refs.map((ref) => {
			const cleanup = $4064df0d6f9620e1$var$setRef(ref, value);
			hasCleanup ||= typeof cleanup == "function";
			return cleanup;
		});
		if (hasCleanup) return () => {
			cleanups.forEach((cleanup, i) => {
				if (typeof cleanup === "function") cleanup();
				else $4064df0d6f9620e1$var$setRef(refs[i], null);
			});
		};
	};
}
function $4064df0d6f9620e1$var$setRef(ref, value) {
	if (typeof ref === "function") return ref(value);
	else if (ref != null) ref.current = value;
}
//#endregion
//#region node_modules/clsx/dist/clsx.mjs
function r(e) {
	var t, f, n = "";
	if ("string" == typeof e || "number" == typeof e) n += e;
	else if ("object" == typeof e) if (Array.isArray(e)) {
		var o = e.length;
		for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
	} else for (f in e) e[f] && (n && (n += " "), n += f);
	return n;
}
function clsx() {
	for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
	return n;
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/mergeProps.mjs
function $bbaa08b3cd72f041$export$9d1611c77c2fe928(...args) {
	let result = { ...args[0] };
	for (let i = 1; i < args.length; i++) {
		let props = args[i];
		for (let key in props) {
			let a = result[key];
			let b = props[key];
			if (typeof a === "function" && typeof b === "function" && key[0] === "o" && key[1] === "n" && key.charCodeAt(2) >= 65 && key.charCodeAt(2) <= 90) result[key] = $a4e76a5424781910$export$e08e3b67e392101e(a, b);
			else if ((key === "className" || key === "UNSAFE_className") && typeof a === "string" && typeof b === "string") result[key] = clsx(a, b);
			else if (key === "id" && a && b) result.id = $390e54f620492c70$export$cd8c9cb68f842629(a, b);
			else if (key === "ref" && a && b) result.ref = $4064df0d6f9620e1$export$c9058316764c140e(a, b);
			else result[key] = b !== void 0 ? b : a;
		}
	}
	return result;
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/useEffectEvent.mjs
var $emnFQ$react = await importShared("react");
var { useRef: $emnFQ$useRef, useCallback: $emnFQ$useCallback } = $emnFQ$react;
var $fe16bffc7a557bf0$var$useEarlyEffect = $emnFQ$react["useInsertionEffect"] ?? $c4867b2f328c2698$export$e5c5a5f917a5871c;
function $fe16bffc7a557bf0$export$7f54fc3180508a52(fn) {
	const ref = $emnFQ$useRef(null);
	$fe16bffc7a557bf0$var$useEarlyEffect(() => {
		ref.current = fn;
	}, [fn]);
	return $emnFQ$useCallback((...args) => {
		const f = ref.current;
		return f?.(...args);
	}, []);
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/useResizeObserver.mjs
var { useEffect: $aLvW6$useEffect } = await importShared("react");
function $970072cf4b13fde3$var$hasResizeObserver() {
	return typeof window.ResizeObserver !== "undefined";
}
function $970072cf4b13fde3$export$683480f191c0e3ea(options) {
	const { ref, box, onResize } = options;
	let onResizeEvent = $fe16bffc7a557bf0$export$7f54fc3180508a52(onResize);
	$aLvW6$useEffect(() => {
		let element = ref?.current;
		if (!element) return;
		if (!$970072cf4b13fde3$var$hasResizeObserver()) {
			window.addEventListener("resize", onResizeEvent, false);
			return () => {
				window.removeEventListener("resize", onResizeEvent, false);
			};
		} else {
			const resizeObserverInstance = new window.ResizeObserver((entries) => {
				if (!entries.length) return;
				onResizeEvent();
			});
			resizeObserverInstance.observe(element, { box });
			return () => {
				if (element) resizeObserverInstance.unobserve(element);
			};
		}
	}, [ref, box]);
}
//#endregion
//#region node_modules/@internationalized/number/dist/private/NumberFormatter.mjs
var $1dfb119a85e764e5$var$formatterCache = /* @__PURE__ */ new Map();
var $1dfb119a85e764e5$var$supportsSignDisplay = false;
try {
	$1dfb119a85e764e5$var$supportsSignDisplay = new Intl.NumberFormat("de-DE", { signDisplay: "exceptZero" }).resolvedOptions().signDisplay === "exceptZero";
} catch {}
var $1dfb119a85e764e5$var$supportsUnit = false;
try {
	$1dfb119a85e764e5$var$supportsUnit = new Intl.NumberFormat("de-DE", {
		style: "unit",
		unit: "degree"
	}).resolvedOptions().style === "unit";
} catch {}
var $1dfb119a85e764e5$var$UNITS = { degree: { narrow: {
	default: "°",
	"ja-JP": " 度",
	"zh-TW": "度",
	"sl-SI": " °"
} } };
var $1dfb119a85e764e5$export$cc77c4ff7e8673c5 = class {
	constructor(locale, options = {}) {
		this.numberFormatter = $1dfb119a85e764e5$var$getCachedNumberFormatter(locale, options);
		this.options = options;
	}
	/**
	* Formats a number value as a string, according to the locale and options provided to the
	* constructor.
	*/ format(value) {
		let res = "";
		if (!$1dfb119a85e764e5$var$supportsSignDisplay && this.options.signDisplay != null) res = $1dfb119a85e764e5$export$711b50b3c525e0f2(this.numberFormatter, this.options.signDisplay, value);
		else res = this.numberFormatter.format(value);
		if (this.options.style === "unit" && !$1dfb119a85e764e5$var$supportsUnit) {
			let { unit, unitDisplay = "short", locale } = this.resolvedOptions();
			if (!unit) return res;
			let values = $1dfb119a85e764e5$var$UNITS[unit]?.[unitDisplay];
			res += values[locale] || values.default;
		}
		return res;
	}
	/** Formats a number to an array of parts such as separators, digits, punctuation, and more. */ formatToParts(value) {
		return this.numberFormatter.formatToParts(value);
	}
	/** Formats a number range as a string. */ formatRange(start, end) {
		if (typeof this.numberFormatter.formatRange === "function") return this.numberFormatter.formatRange(start, end);
		if (end < start) throw new RangeError("End date must be >= start date");
		return `${this.format(start)} \u{2013} ${this.format(end)}`;
	}
	/** Formats a number range as an array of parts. */ formatRangeToParts(start, end) {
		if (typeof this.numberFormatter.formatRangeToParts === "function") return this.numberFormatter.formatRangeToParts(start, end);
		if (end < start) throw new RangeError("End date must be >= start date");
		let startParts = this.numberFormatter.formatToParts(start);
		let endParts = this.numberFormatter.formatToParts(end);
		return [
			...startParts.map((p) => ({
				...p,
				source: "startRange"
			})),
			{
				type: "literal",
				value: " – ",
				source: "shared"
			},
			...endParts.map((p) => ({
				...p,
				source: "endRange"
			}))
		];
	}
	/** Returns the resolved formatting options based on the values passed to the constructor. */ resolvedOptions() {
		let options = this.numberFormatter.resolvedOptions();
		if (!$1dfb119a85e764e5$var$supportsSignDisplay && this.options.signDisplay != null) options = {
			...options,
			signDisplay: this.options.signDisplay
		};
		if (!$1dfb119a85e764e5$var$supportsUnit && this.options.style === "unit") options = {
			...options,
			style: "unit",
			unit: this.options.unit,
			unitDisplay: this.options.unitDisplay
		};
		return options;
	}
};
function $1dfb119a85e764e5$var$getCachedNumberFormatter(locale, options = {}) {
	let { numberingSystem } = options;
	if (numberingSystem && locale.includes("-nu-")) {
		if (!locale.includes("-u-")) locale += "-u-";
		locale += `-nu-${numberingSystem}`;
	}
	if (options.style === "unit" && !$1dfb119a85e764e5$var$supportsUnit) {
		let { unit, unitDisplay = "short" } = options;
		if (!unit) throw new Error("unit option must be provided with style: \"unit\"");
		if (!$1dfb119a85e764e5$var$UNITS[unit]?.[unitDisplay]) throw new Error(`Unsupported unit ${unit} with unitDisplay = ${unitDisplay}`);
		options = {
			...options,
			style: "decimal"
		};
	}
	let cacheKey = locale + (options ? Object.entries(options).sort((a, b) => a[0] < b[0] ? -1 : 1).join() : "");
	if ($1dfb119a85e764e5$var$formatterCache.has(cacheKey)) return $1dfb119a85e764e5$var$formatterCache.get(cacheKey);
	let numberFormatter = new Intl.NumberFormat(locale, options);
	$1dfb119a85e764e5$var$formatterCache.set(cacheKey, numberFormatter);
	return numberFormatter;
}
function $1dfb119a85e764e5$export$711b50b3c525e0f2(numberFormat, signDisplay, num) {
	if (signDisplay === "auto") return numberFormat.format(num);
	else if (signDisplay === "never") return numberFormat.format(Math.abs(num));
	else {
		let needsPositiveSign = false;
		if (signDisplay === "always") needsPositiveSign = num > 0 || Object.is(num, 0);
		else if (signDisplay === "exceptZero") if (Object.is(num, -0) || Object.is(num, 0)) num = Math.abs(num);
		else needsPositiveSign = num > 0;
		if (needsPositiveSign) {
			let negative = numberFormat.format(-num);
			let noSign = numberFormat.format(num);
			let minus = negative.replace(noSign, "").replace(/\u200e|\u061C/, "");
			if ([...minus].length !== 1) console.warn("@react-aria/i18n polyfill for NumberFormat signDisplay: Unsupported case");
			return negative.replace(noSign, "!!!").replace(minus, "+").replace("!!!", noSign);
		} else return numberFormat.format(num);
	}
}
//#endregion
//#region node_modules/@internationalized/number/dist/private/NumberParser.mjs
var $eb76cf4feb040f77$var$CURRENCY_SIGN_REGEX = /* @__PURE__ */ new RegExp("^.*\\(.*\\).*$");
var $eb76cf4feb040f77$var$NUMBERING_SYSTEMS = [
	"latn",
	"arab",
	"hanidec",
	"deva",
	"beng",
	"fullwide"
];
var $eb76cf4feb040f77$export$cd11ab140839f11d = class {
	constructor(locale, options = {}) {
		this.locale = locale;
		this.options = options;
	}
	/**
	* Parses the given string to a number. Returns NaN if a valid number could not be parsed.
	*/ parse(value) {
		return $eb76cf4feb040f77$var$getNumberParserImpl(this.locale, this.options, value).parse(value);
	}
	/**
	* Returns whether the given string could potentially be a valid number. This should be used to
	* validate user input as the user types. If a `minValue` or `maxValue` is provided, the validity
	* of the minus/plus sign characters can be checked.
	*/ isValidPartialNumber(value, minValue, maxValue) {
		return $eb76cf4feb040f77$var$getNumberParserImpl(this.locale, this.options, value).isValidPartialNumber(value, minValue, maxValue);
	}
	/**
	* Returns a numbering system for which the given string is valid in the current locale.
	* If no numbering system could be detected, the default numbering system for the current
	* locale is returned.
	*/ getNumberingSystem(value) {
		return $eb76cf4feb040f77$var$getNumberParserImpl(this.locale, this.options, value).options.numberingSystem;
	}
};
var $eb76cf4feb040f77$var$numberParserCache = /* @__PURE__ */ new Map();
function $eb76cf4feb040f77$var$getNumberParserImpl(locale, options, value) {
	let defaultParser = $eb76cf4feb040f77$var$getCachedNumberParser(locale, options);
	if (!locale.includes("-nu-") && !defaultParser.isValidPartialNumber(value)) {
		for (let numberingSystem of $eb76cf4feb040f77$var$NUMBERING_SYSTEMS) if (numberingSystem !== defaultParser.options.numberingSystem) {
			let parser = $eb76cf4feb040f77$var$getCachedNumberParser(locale + (locale.includes("-u-") ? "-nu-" : "-u-nu-") + numberingSystem, options);
			if (parser.isValidPartialNumber(value)) return parser;
		}
	}
	return defaultParser;
}
function $eb76cf4feb040f77$var$getCachedNumberParser(locale, options) {
	let cacheKey = locale + (options ? Object.entries(options).sort((a, b) => a[0] < b[0] ? -1 : 1).join() : "");
	let parser = $eb76cf4feb040f77$var$numberParserCache.get(cacheKey);
	if (!parser) {
		parser = new $eb76cf4feb040f77$var$NumberParserImpl(locale, options);
		$eb76cf4feb040f77$var$numberParserCache.set(cacheKey, parser);
	}
	return parser;
}
var $eb76cf4feb040f77$var$NumberParserImpl = class {
	constructor(locale, options = {}) {
		this.locale = locale;
		if (options.roundingIncrement !== 1 && options.roundingIncrement != null) {
			if (options.maximumFractionDigits == null && options.minimumFractionDigits == null) {
				options.maximumFractionDigits = 0;
				options.minimumFractionDigits = 0;
			} else if (options.maximumFractionDigits == null) options.maximumFractionDigits = options.minimumFractionDigits;
			else if (options.minimumFractionDigits == null) options.minimumFractionDigits = options.maximumFractionDigits;
		}
		this.formatter = new Intl.NumberFormat(locale, options);
		this.options = this.formatter.resolvedOptions();
		this.symbols = $eb76cf4feb040f77$var$getSymbols(locale, this.formatter, this.options, options);
		if (this.options.style === "percent" && ((this.options.minimumFractionDigits ?? 0) > 18 || (this.options.maximumFractionDigits ?? 0) > 18)) console.warn("NumberParser cannot handle percentages with greater than 18 decimal places, please reduce the number in your options.");
	}
	parse(value) {
		let isGroupSymbolAllowed = this.formatter.resolvedOptions().useGrouping;
		let fullySanitizedValue = this.sanitize(value);
		if (!isGroupSymbolAllowed && this.symbols.group && fullySanitizedValue.includes(this.symbols.group)) return NaN;
		else if (this.symbols.group) fullySanitizedValue = fullySanitizedValue.replaceAll(this.symbols.group, "");
		if (this.symbols.decimal) fullySanitizedValue = fullySanitizedValue.replace(this.symbols.decimal, ".");
		if (this.symbols.minusSign) fullySanitizedValue = fullySanitizedValue.replace(this.symbols.minusSign, "-");
		fullySanitizedValue = fullySanitizedValue.replace(this.symbols.numeral, this.symbols.index);
		if (this.options.style === "percent") {
			let isNegative = fullySanitizedValue.indexOf("-");
			fullySanitizedValue = fullySanitizedValue.replace("-", "");
			fullySanitizedValue = fullySanitizedValue.replace("+", "");
			let index = fullySanitizedValue.indexOf(".");
			if (index === -1) index = fullySanitizedValue.length;
			fullySanitizedValue = fullySanitizedValue.replace(".", "");
			if (index - 2 === 0) fullySanitizedValue = `0.${fullySanitizedValue}`;
			else if (index - 2 === -1) fullySanitizedValue = `0.0${fullySanitizedValue}`;
			else if (index - 2 === -2) fullySanitizedValue = "0.00";
			else fullySanitizedValue = `${fullySanitizedValue.slice(0, index - 2)}.${fullySanitizedValue.slice(index - 2)}`;
			if (isNegative > -1) fullySanitizedValue = `-${fullySanitizedValue}`;
		}
		let newValue = fullySanitizedValue ? +fullySanitizedValue : NaN;
		if (isNaN(newValue)) return NaN;
		if (this.options.style === "percent") {
			let options = {
				...this.options,
				style: "decimal",
				minimumFractionDigits: Math.min((this.options.minimumFractionDigits ?? 0) + 2, 20),
				maximumFractionDigits: Math.min((this.options.maximumFractionDigits ?? 0) + 2, 20)
			};
			return new $eb76cf4feb040f77$export$cd11ab140839f11d(this.locale, options).parse(new $1dfb119a85e764e5$export$cc77c4ff7e8673c5(this.locale, options).format(newValue));
		}
		if (this.options.currencySign === "accounting" && $eb76cf4feb040f77$var$CURRENCY_SIGN_REGEX.test(value)) newValue = -1 * newValue;
		return newValue;
	}
	sanitize(value) {
		let isGroupSymbolAllowed = this.formatter.resolvedOptions().useGrouping;
		if (this.symbols.noNumeralUnits.length > 0 && this.symbols.noNumeralUnits.find((obj) => obj.unit === value)) return this.symbols.noNumeralUnits.find((obj) => obj.unit === value).value.toString();
		value = value.replace(this.symbols.literals, "");
		if (this.symbols.minusSign) value = value.replace("-", this.symbols.minusSign);
		if (this.options.numberingSystem === "arab") {
			if (this.symbols.decimal) {
				value = $eb76cf4feb040f77$var$replaceAll(value, ",", this.symbols.decimal);
				value = $eb76cf4feb040f77$var$replaceAll(value, String.fromCharCode(1548), this.symbols.decimal);
			}
			if (this.symbols.group && isGroupSymbolAllowed) value = $eb76cf4feb040f77$var$replaceAll(value, ".", this.symbols.group);
		}
		if (this.symbols.group === "’" && value.includes("'") && isGroupSymbolAllowed) value = $eb76cf4feb040f77$var$replaceAll(value, "'", this.symbols.group);
		if (this.symbols.group === "'" && value.includes("’") && isGroupSymbolAllowed) value = $eb76cf4feb040f77$var$replaceAll(value, "’", this.symbols.group);
		if (this.options.locale === "fr-FR" && this.symbols.group && isGroupSymbolAllowed) {
			value = $eb76cf4feb040f77$var$replaceAll(value, " ", this.symbols.group);
			value = $eb76cf4feb040f77$var$replaceAll(value, /\u00A0/g, this.symbols.group);
		}
		return value;
	}
	isValidPartialNumber(value, minValue = -Infinity, maxValue = Infinity) {
		let isGroupSymbolAllowed = this.formatter.resolvedOptions().useGrouping;
		value = this.sanitize(value);
		if (this.symbols.minusSign && value.startsWith(this.symbols.minusSign) && minValue < 0) value = value.slice(this.symbols.minusSign.length);
		else if (this.symbols.plusSign && value.startsWith(this.symbols.plusSign) && maxValue > 0) value = value.slice(this.symbols.plusSign.length);
		if (this.symbols.decimal && value.indexOf(this.symbols.decimal) > -1 && this.options.maximumFractionDigits === 0) return false;
		if (this.symbols.group && isGroupSymbolAllowed) value = $eb76cf4feb040f77$var$replaceAll(value, this.symbols.group, "");
		value = value.replace(this.symbols.numeral, "");
		if (this.symbols.decimal) value = value.replace(this.symbols.decimal, "");
		return value.length === 0;
	}
};
var $eb76cf4feb040f77$var$nonLiteralParts = /* @__PURE__ */ new Set([
	"decimal",
	"fraction",
	"integer",
	"minusSign",
	"plusSign",
	"group"
]);
var $eb76cf4feb040f77$var$pluralNumbers = [
	0,
	4,
	2,
	1,
	11,
	20,
	3,
	7,
	100,
	21,
	.1,
	1.1
];
function $eb76cf4feb040f77$var$getSymbols(locale, formatter, intlOptions, originalOptions) {
	let symbolFormatter = new Intl.NumberFormat(locale, {
		...intlOptions,
		minimumSignificantDigits: 1,
		maximumSignificantDigits: 21,
		roundingIncrement: 1,
		roundingPriority: "auto",
		roundingMode: "halfExpand",
		useGrouping: true
	});
	let allParts = symbolFormatter.formatToParts(-10000.111);
	let posAllParts = symbolFormatter.formatToParts(10000.111);
	let pluralParts = $eb76cf4feb040f77$var$pluralNumbers.map((n) => symbolFormatter.formatToParts(n));
	let noNumeralUnits = pluralParts.map((p, i) => {
		let unit = p.find((p) => p.type === "unit");
		if (unit && !p.some((p) => p.type === "integer" || p.type === "fraction")) return {
			unit: unit.value,
			value: $eb76cf4feb040f77$var$pluralNumbers[i]
		};
		return null;
	}).filter((p) => !!p);
	let minusSign = allParts.find((p) => p.type === "minusSign")?.value ?? "-";
	let plusSign = posAllParts.find((p) => p.type === "plusSign")?.value;
	if (!plusSign && (originalOptions?.signDisplay === "exceptZero" || originalOptions?.signDisplay === "always")) plusSign = "+";
	let decimal = new Intl.NumberFormat(locale, {
		...intlOptions,
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	}).formatToParts(.001).find((p) => p.type === "decimal")?.value;
	let group = allParts.find((p) => p.type === "group")?.value;
	let allPartsLiterals = allParts.filter((p) => !$eb76cf4feb040f77$var$nonLiteralParts.has(p.type)).map((p) => $eb76cf4feb040f77$var$escapeRegex(p.value));
	let pluralPartsLiterals = pluralParts.flatMap((p) => p.filter((p) => !$eb76cf4feb040f77$var$nonLiteralParts.has(p.type)).map((p) => $eb76cf4feb040f77$var$escapeRegex(p.value)));
	let sortedLiterals = [.../* @__PURE__ */ new Set([...allPartsLiterals, ...pluralPartsLiterals])].sort((a, b) => b.length - a.length);
	let literals = sortedLiterals.length === 0 ? /* @__PURE__ */ new RegExp("\\p{White_Space}|\\p{Cf}", "gu") : new RegExp(`${sortedLiterals.join("|")}|\\p{White_Space}|\\p{Cf}`, "gu");
	let numerals = [...new Intl.NumberFormat(intlOptions.locale, { useGrouping: false }).format(9876543210)].reverse();
	let indexes = new Map(numerals.map((d, i) => [d, i]));
	let numeral = new RegExp(`[${numerals.join("")}]`, "g");
	let index = (d) => String(indexes.get(d));
	return {
		minusSign,
		plusSign,
		decimal,
		group,
		literals,
		numeral,
		numerals,
		index,
		noNumeralUnits
	};
}
function $eb76cf4feb040f77$var$replaceAll(str, find, replace) {
	if (str.replaceAll) return str.replaceAll(find, replace);
	return str.split(find).join(replace);
}
function $eb76cf4feb040f77$var$escapeRegex(string) {
	return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
//#endregion
//#region node_modules/@internationalized/string/dist/private/LocalizedStringDictionary.mjs
var $a747a10fe70a57da$var$localeSymbol = Symbol.for("react-aria.i18n.locale");
var $a747a10fe70a57da$var$stringsSymbol = Symbol.for("react-aria.i18n.strings");
var $a747a10fe70a57da$var$cachedGlobalStrings = void 0;
var $a747a10fe70a57da$export$c17fa47878dc55b6 = class $a747a10fe70a57da$export$c17fa47878dc55b6 {
	constructor(messages, defaultLocale = "en-US") {
		this.strings = Object.fromEntries(Object.entries(messages).filter(([, v]) => v));
		this.defaultLocale = defaultLocale;
	}
	/** Returns a localized string for the given key and locale. */ getStringForLocale(key, locale) {
		let string = this.getStringsForLocale(locale)[key];
		if (!string) throw new Error(`Could not find intl message ${key} in ${locale} locale`);
		return string;
	}
	/** Returns all localized strings for the given locale. */ getStringsForLocale(locale) {
		let strings = this.strings[locale];
		if (!strings) {
			strings = $a747a10fe70a57da$var$getStringsForLocale(locale, this.strings, this.defaultLocale);
			this.strings[locale] = strings;
		}
		return strings;
	}
	static getGlobalDictionaryForPackage(packageName) {
		if (typeof window === "undefined") return null;
		let locale = window[$a747a10fe70a57da$var$localeSymbol];
		if ($a747a10fe70a57da$var$cachedGlobalStrings === void 0) {
			let globalStrings = window[$a747a10fe70a57da$var$stringsSymbol];
			if (!globalStrings) return null;
			$a747a10fe70a57da$var$cachedGlobalStrings = {};
			for (let pkg in globalStrings) $a747a10fe70a57da$var$cachedGlobalStrings[pkg] = new $a747a10fe70a57da$export$c17fa47878dc55b6({ [locale]: globalStrings[pkg] }, locale);
		}
		let dictionary = $a747a10fe70a57da$var$cachedGlobalStrings?.[packageName];
		if (!dictionary) throw new Error(`Strings for package "${packageName}" were not included by LocalizedStringProvider. Please add it to the list passed to createLocalizedStringDictionary.`);
		return dictionary;
	}
};
function $a747a10fe70a57da$var$getStringsForLocale(locale, strings, defaultLocale = "en-US") {
	if (strings[locale]) return strings[locale];
	let language = $a747a10fe70a57da$var$getLanguage(locale);
	if (strings[language]) return strings[language];
	for (let key in strings) if (key.startsWith(language + "-")) return strings[key];
	return strings[defaultLocale];
}
function $a747a10fe70a57da$var$getLanguage(locale) {
	if (Intl.Locale) return new Intl.Locale(locale).language;
	return locale.split("-")[0];
}
//#endregion
//#region node_modules/@internationalized/string/dist/private/LocalizedStringFormatter.mjs
var $b27c684a33948c64$var$pluralRulesCache = /* @__PURE__ */ new Map();
var $b27c684a33948c64$var$numberFormatCache = /* @__PURE__ */ new Map();
var $b27c684a33948c64$export$2f817fcdc4b89ae0 = class {
	constructor(locale, strings) {
		this.locale = locale;
		this.strings = strings;
	}
	/** Formats a localized string for the given key with the provided variables. */ format(key, variables) {
		let message = this.strings.getStringForLocale(key, this.locale);
		return typeof message === "function" ? message(variables, this) : message;
	}
	plural(count, options, type = "cardinal") {
		let opt = options["=" + count];
		if (opt) return typeof opt === "function" ? opt() : opt;
		let key = this.locale + ":" + type;
		let pluralRules = $b27c684a33948c64$var$pluralRulesCache.get(key);
		if (!pluralRules) {
			pluralRules = new Intl.PluralRules(this.locale, { type });
			$b27c684a33948c64$var$pluralRulesCache.set(key, pluralRules);
		}
		opt = options[pluralRules.select(count)] || options.other;
		return typeof opt === "function" ? opt() : opt;
	}
	number(value) {
		let numberFormat = $b27c684a33948c64$var$numberFormatCache.get(this.locale);
		if (!numberFormat) {
			numberFormat = new Intl.NumberFormat(this.locale);
			$b27c684a33948c64$var$numberFormatCache.set(this.locale, numberFormat);
		}
		return numberFormat.format(value);
	}
	select(options, value) {
		let opt = options[value] || options.other;
		return typeof opt === "function" ? opt() : opt;
	}
};
//#endregion
//#region node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.production.js
/**
* @license React
* use-sync-external-store-shim.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_use_sync_external_store_shim_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var React = require_react();
	function is(x, y) {
		return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
	}
	var objectIs = "function" === typeof Object.is ? Object.is : is, useState = React.useState, useEffect = React.useEffect, useLayoutEffect = React.useLayoutEffect, useDebugValue = React.useDebugValue;
	function useSyncExternalStore$2(subscribe, getSnapshot) {
		var value = getSnapshot(), _useState = useState({ inst: {
			value,
			getSnapshot
		} }), inst = _useState[0].inst, forceUpdate = _useState[1];
		useLayoutEffect(function() {
			inst.value = value;
			inst.getSnapshot = getSnapshot;
			checkIfSnapshotChanged(inst) && forceUpdate({ inst });
		}, [
			subscribe,
			value,
			getSnapshot
		]);
		useEffect(function() {
			checkIfSnapshotChanged(inst) && forceUpdate({ inst });
			return subscribe(function() {
				checkIfSnapshotChanged(inst) && forceUpdate({ inst });
			});
		}, [subscribe]);
		useDebugValue(value);
		return value;
	}
	function checkIfSnapshotChanged(inst) {
		var latestGetSnapshot = inst.getSnapshot;
		inst = inst.value;
		try {
			var nextValue = latestGetSnapshot();
			return !objectIs(inst, nextValue);
		} catch (error) {
			return !0;
		}
	}
	function useSyncExternalStore$1(subscribe, getSnapshot) {
		return getSnapshot();
	}
	var shim = "undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement ? useSyncExternalStore$1 : useSyncExternalStore$2;
	exports.useSyncExternalStore = void 0 !== React.useSyncExternalStore ? React.useSyncExternalStore : shim;
}));
//#endregion
//#region node_modules/use-sync-external-store/shim/index.js
var require_shim = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_use_sync_external_store_shim_production();
}));
//#endregion
//#region node_modules/@internationalized/date/dist/private/utils.mjs
function $09ec6a572d60460f$export$842a2cf37af977e1(amount, numerator) {
	return amount - numerator * Math.floor(amount / numerator);
}
//#endregion
//#region node_modules/@internationalized/date/dist/private/calendars/GregorianCalendar.mjs
var $93635573935797de$var$EPOCH = 1721426;
function $93635573935797de$export$f297eb839006d339(era, year, month, day) {
	year = $93635573935797de$export$c36e0ecb2d4fa69d(era, year);
	let y1 = year - 1;
	let monthOffset = -2;
	if (month <= 2) monthOffset = 0;
	else if ($93635573935797de$export$553d7fa8e3805fc0(year)) monthOffset = -1;
	return $93635573935797de$var$EPOCH - 1 + 365 * y1 + Math.floor(y1 / 4) - Math.floor(y1 / 100) + Math.floor(y1 / 400) + Math.floor((367 * month - 362) / 12 + monthOffset + day);
}
function $93635573935797de$export$553d7fa8e3805fc0(year) {
	return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}
function $93635573935797de$export$c36e0ecb2d4fa69d(era, year) {
	return era === "BC" ? 1 - year : year;
}
function $93635573935797de$export$4475b7e617eb123c(year) {
	let era = "AD";
	if (year <= 0) {
		era = "BC";
		year = 1 - year;
	}
	return [era, year];
}
var $93635573935797de$var$daysInMonth = {
	standard: [
		31,
		28,
		31,
		30,
		31,
		30,
		31,
		31,
		30,
		31,
		30,
		31
	],
	leapyear: [
		31,
		29,
		31,
		30,
		31,
		30,
		31,
		31,
		30,
		31,
		30,
		31
	]
};
var $93635573935797de$export$80ee6245ec4f29ec = class {
	fromJulianDay(jd) {
		let jd0 = jd;
		let depoch = jd0 - $93635573935797de$var$EPOCH;
		let quadricent = Math.floor(depoch / 146097);
		let dqc = $09ec6a572d60460f$export$842a2cf37af977e1(depoch, 146097);
		let cent = Math.floor(dqc / 36524);
		let dcent = $09ec6a572d60460f$export$842a2cf37af977e1(dqc, 36524);
		let quad = Math.floor(dcent / 1461);
		let dquad = $09ec6a572d60460f$export$842a2cf37af977e1(dcent, 1461);
		let yindex = Math.floor(dquad / 365);
		let [era, year] = $93635573935797de$export$4475b7e617eb123c(quadricent * 400 + cent * 100 + quad * 4 + yindex + (cent !== 4 && yindex !== 4 ? 1 : 0));
		let yearDay = jd0 - $93635573935797de$export$f297eb839006d339(era, year, 1, 1);
		let leapAdj = 2;
		if (jd0 < $93635573935797de$export$f297eb839006d339(era, year, 3, 1)) leapAdj = 0;
		else if ($93635573935797de$export$553d7fa8e3805fc0(year)) leapAdj = 1;
		let month = Math.floor(((yearDay + leapAdj) * 12 + 373) / 367);
		return new $2aaf608024c21ca1$export$99faa760c7908e4f(era, year, month, jd0 - $93635573935797de$export$f297eb839006d339(era, year, month, 1) + 1);
	}
	toJulianDay(date) {
		return $93635573935797de$export$f297eb839006d339(date.era, date.year, date.month, date.day);
	}
	getDaysInMonth(date) {
		return $93635573935797de$var$daysInMonth[$93635573935797de$export$553d7fa8e3805fc0(date.year) ? "leapyear" : "standard"][date.month - 1];
	}
	getMonthsInYear(date) {
		return 12;
	}
	getDaysInYear(date) {
		return $93635573935797de$export$553d7fa8e3805fc0(date.year) ? 366 : 365;
	}
	getMaximumMonthsInYear() {
		return 12;
	}
	getMaximumDaysInMonth() {
		return 31;
	}
	getYearsInEra(date) {
		return 9999;
	}
	getEras() {
		return ["BC", "AD"];
	}
	isInverseEra(date) {
		return date.era === "BC";
	}
	balanceDate(date) {
		if (date.year <= 0) {
			date.era = date.era === "BC" ? "AD" : "BC";
			date.year = 1 - date.year;
		}
	}
	constructor() {
		this.identifier = "gregory";
	}
};
//#endregion
//#region node_modules/@internationalized/date/dist/private/weekStartData.mjs
var $d2ca8165c9aa885a$export$7a5acbd77d414bd9 = {
	"001": 1,
	AD: 1,
	AE: 6,
	AF: 6,
	AI: 1,
	AL: 1,
	AM: 1,
	AN: 1,
	AR: 1,
	AT: 1,
	AU: 1,
	AX: 1,
	AZ: 1,
	BA: 1,
	BE: 1,
	BG: 1,
	BH: 6,
	BM: 1,
	BN: 1,
	BY: 1,
	CH: 1,
	CL: 1,
	CM: 1,
	CN: 1,
	CR: 1,
	CY: 1,
	CZ: 1,
	DE: 1,
	DJ: 6,
	DK: 1,
	DZ: 6,
	EC: 1,
	EE: 1,
	EG: 6,
	ES: 1,
	FI: 1,
	FJ: 1,
	FO: 1,
	FR: 1,
	GB: 1,
	GE: 1,
	GF: 1,
	GP: 1,
	GR: 1,
	HR: 1,
	HU: 1,
	IE: 1,
	IQ: 6,
	IR: 6,
	IS: 1,
	IT: 1,
	JO: 6,
	KG: 1,
	KW: 6,
	KZ: 1,
	LB: 1,
	LI: 1,
	LK: 1,
	LT: 1,
	LU: 1,
	LV: 1,
	LY: 6,
	MC: 1,
	MD: 1,
	ME: 1,
	MK: 1,
	MN: 1,
	MQ: 1,
	MV: 5,
	MY: 1,
	NL: 1,
	NO: 1,
	NZ: 1,
	OM: 6,
	PL: 1,
	QA: 6,
	RE: 1,
	RO: 1,
	RS: 1,
	RU: 1,
	SD: 6,
	SE: 1,
	SI: 1,
	SK: 1,
	SM: 1,
	SY: 6,
	TJ: 1,
	TM: 1,
	TR: 1,
	UA: 1,
	UY: 1,
	UZ: 1,
	VA: 1,
	VN: 1,
	XK: 1
};
//#endregion
//#region node_modules/@internationalized/date/dist/private/queries.mjs
function $ad063034c8620db8$export$ea39ec197993aef0(a, b) {
	b = $d07e34cce18680fd$export$b4a036af3fc0b032(b, a.calendar);
	return a.era === b.era && a.year === b.year && a.month === b.month && a.day === b.day;
}
function $ad063034c8620db8$export$a18c89cbd24170ff(a, b) {
	b = $d07e34cce18680fd$export$b4a036af3fc0b032(b, a.calendar);
	a = $ad063034c8620db8$export$a5a3b454ada2268e(a);
	b = $ad063034c8620db8$export$a5a3b454ada2268e(b);
	return a.era === b.era && a.year === b.year && a.month === b.month;
}
function $ad063034c8620db8$export$5841f9eb9773f25f(a, b) {
	b = $d07e34cce18680fd$export$b4a036af3fc0b032(b, a.calendar);
	a = $ad063034c8620db8$export$f91e89d3d0406102(a);
	b = $ad063034c8620db8$export$f91e89d3d0406102(b);
	return a.era === b.era && a.year === b.year;
}
function $ad063034c8620db8$export$91b62ebf2ba703ee(a, b) {
	return $ad063034c8620db8$export$dbc69fd56b53d5e(a.calendar, b.calendar) && $ad063034c8620db8$export$ea39ec197993aef0(a, b);
}
function $ad063034c8620db8$export$dbc69fd56b53d5e(a, b) {
	return a.isEqual?.(b) ?? b.isEqual?.(a) ?? a.identifier === b.identifier;
}
function $ad063034c8620db8$export$629b0a497aa65267(date, timeZone) {
	return $ad063034c8620db8$export$ea39ec197993aef0(date, $ad063034c8620db8$export$d0bdf45af03a6ea3(timeZone));
}
var $ad063034c8620db8$var$DAY_MAP = {
	sun: 0,
	mon: 1,
	tue: 2,
	wed: 3,
	thu: 4,
	fri: 5,
	sat: 6
};
function $ad063034c8620db8$export$2061056d06d7cdf7(date, locale, firstDayOfWeek) {
	let julian = date.calendar.toJulianDay(date);
	let weekStart = firstDayOfWeek ? $ad063034c8620db8$var$DAY_MAP[firstDayOfWeek] : $ad063034c8620db8$var$getWeekStart(locale);
	let dayOfWeek = Math.ceil(julian + 1 - weekStart) % 7;
	if (dayOfWeek < 0) dayOfWeek += 7;
	return dayOfWeek;
}
function $ad063034c8620db8$export$461939dd4422153(timeZone) {
	return $d07e34cce18680fd$export$1b96692a1ba042ac(Date.now(), timeZone);
}
function $ad063034c8620db8$export$d0bdf45af03a6ea3(timeZone) {
	return $d07e34cce18680fd$export$93522d1a439f3617($ad063034c8620db8$export$461939dd4422153(timeZone));
}
function $ad063034c8620db8$export$68781ddf31c0090f(a, b) {
	return a.calendar.toJulianDay(a) - b.calendar.toJulianDay(b);
}
function $ad063034c8620db8$export$c19a80a9721b80f6(a, b) {
	return $ad063034c8620db8$var$timeToMs(a) - $ad063034c8620db8$var$timeToMs(b);
}
function $ad063034c8620db8$var$timeToMs(a) {
	return a.hour * 36e5 + a.minute * 6e4 + a.second * 1e3 + a.millisecond;
}
var $ad063034c8620db8$var$localTimeZone = null;
var $ad063034c8620db8$var$localTimeZoneOverride = false;
function $ad063034c8620db8$export$aa8b41735afcabd2() {
	if ($ad063034c8620db8$var$localTimeZone == null) $ad063034c8620db8$var$localTimeZone = new Intl.DateTimeFormat().resolvedOptions().timeZone;
	return $ad063034c8620db8$var$localTimeZone;
}
function $ad063034c8620db8$export$6ab69b273755230b() {
	return $ad063034c8620db8$var$localTimeZoneOverride;
}
function $ad063034c8620db8$export$a5a3b454ada2268e(date) {
	return date.subtract({ days: date.day - 1 });
}
function $ad063034c8620db8$export$a2258d9c4118825c(date) {
	return date.add({ days: date.calendar.getDaysInMonth(date) - date.day });
}
function $ad063034c8620db8$export$f91e89d3d0406102(date) {
	return $ad063034c8620db8$export$a5a3b454ada2268e(date.subtract({ months: date.month - 1 }));
}
function $ad063034c8620db8$export$42c81a444fbfb5d4(date, locale, firstDayOfWeek) {
	let dayOfWeek = $ad063034c8620db8$export$2061056d06d7cdf7(date, locale, firstDayOfWeek);
	return date.subtract({ days: dayOfWeek });
}
function $ad063034c8620db8$export$ef8b6d9133084f4e(date, locale, firstDayOfWeek) {
	return $ad063034c8620db8$export$42c81a444fbfb5d4(date, locale, firstDayOfWeek).add({ days: 6 });
}
var $ad063034c8620db8$var$cachedRegions = /* @__PURE__ */ new Map();
var $ad063034c8620db8$var$cachedWeekInfo = /* @__PURE__ */ new Map();
function $ad063034c8620db8$var$getRegion(locale) {
	if (Intl.Locale) {
		let region = $ad063034c8620db8$var$cachedRegions.get(locale);
		if (!region) {
			region = new Intl.Locale(locale).maximize().region;
			if (region) $ad063034c8620db8$var$cachedRegions.set(locale, region);
		}
		return region;
	}
	let part = locale.split("-")[1];
	return part === "u" ? void 0 : part;
}
function $ad063034c8620db8$var$getWeekStart(locale) {
	let weekInfo = $ad063034c8620db8$var$cachedWeekInfo.get(locale);
	if (!weekInfo) {
		if (Intl.Locale) {
			let localeInst = new Intl.Locale(locale);
			if ("getWeekInfo" in localeInst) {
				weekInfo = localeInst.getWeekInfo();
				if (weekInfo) {
					$ad063034c8620db8$var$cachedWeekInfo.set(locale, weekInfo);
					return weekInfo.firstDay;
				}
			}
		}
		let region = $ad063034c8620db8$var$getRegion(locale);
		if (locale.includes("-fw-")) {
			let day = locale.split("-fw-")[1].split("-")[0];
			if (day === "mon") weekInfo = { firstDay: 1 };
			else if (day === "tue") weekInfo = { firstDay: 2 };
			else if (day === "wed") weekInfo = { firstDay: 3 };
			else if (day === "thu") weekInfo = { firstDay: 4 };
			else if (day === "fri") weekInfo = { firstDay: 5 };
			else if (day === "sat") weekInfo = { firstDay: 6 };
			else weekInfo = { firstDay: 0 };
		} else if (locale.includes("-ca-iso8601")) weekInfo = { firstDay: 1 };
		else weekInfo = { firstDay: region ? $d2ca8165c9aa885a$export$7a5acbd77d414bd9[region] || 0 : 0 };
		$ad063034c8620db8$var$cachedWeekInfo.set(locale, weekInfo);
	}
	return weekInfo.firstDay;
}
function $ad063034c8620db8$export$ccc1b2479e7dd654(date, locale, firstDayOfWeek) {
	let days = date.calendar.getDaysInMonth(date);
	return Math.ceil(($ad063034c8620db8$export$2061056d06d7cdf7($ad063034c8620db8$export$a5a3b454ada2268e(date), locale, firstDayOfWeek) + days) / 7);
}
function $ad063034c8620db8$export$5c333a116e949cdd(a, b) {
	if (a && b) return a.compare(b) <= 0 ? a : b;
	return a || b;
}
function $ad063034c8620db8$export$a75f2bff57811055(a, b) {
	if (a && b) return a.compare(b) >= 0 ? a : b;
	return a || b;
}
//#endregion
//#region node_modules/@internationalized/date/dist/private/conversion.mjs
function $d07e34cce18680fd$export$bd4fb2bc8bb06fb(date) {
	date = $d07e34cce18680fd$export$b4a036af3fc0b032(date, new $93635573935797de$export$80ee6245ec4f29ec());
	return $d07e34cce18680fd$var$epochFromParts($93635573935797de$export$c36e0ecb2d4fa69d(date.era, date.year), date.month, date.day, date.hour, date.minute, date.second, date.millisecond);
}
function $d07e34cce18680fd$var$epochFromParts(year, month, day, hour, minute, second, millisecond) {
	let date = /* @__PURE__ */ new Date();
	date.setUTCHours(hour, minute, second, millisecond);
	date.setUTCFullYear(year, month - 1, day);
	return date.getTime();
}
function $d07e34cce18680fd$export$59c99f3515d3493f(ms, timeZone) {
	if (timeZone === "UTC") return 0;
	if (ms > 0 && timeZone === $ad063034c8620db8$export$aa8b41735afcabd2() && !$ad063034c8620db8$export$6ab69b273755230b()) return new Date(ms).getTimezoneOffset() * -6e4;
	let { year, month, day, hour, minute, second } = $d07e34cce18680fd$var$getTimeZoneParts(ms, timeZone);
	return $d07e34cce18680fd$var$epochFromParts(year, month, day, hour, minute, second, 0) - Math.floor(ms / 1e3) * 1e3;
}
var $d07e34cce18680fd$var$formattersByTimeZone = /* @__PURE__ */ new Map();
function $d07e34cce18680fd$var$getTimeZoneParts(ms, timeZone) {
	let formatter = $d07e34cce18680fd$var$formattersByTimeZone.get(timeZone);
	if (!formatter) {
		formatter = new Intl.DateTimeFormat("en-US", {
			timeZone,
			hour12: false,
			era: "short",
			year: "numeric",
			month: "numeric",
			day: "numeric",
			hour: "numeric",
			minute: "numeric",
			second: "numeric"
		});
		$d07e34cce18680fd$var$formattersByTimeZone.set(timeZone, formatter);
	}
	let parts = formatter.formatToParts(new Date(ms));
	let namedParts = {};
	for (let part of parts) if (part.type !== "literal") namedParts[part.type] = part.value;
	return {
		year: namedParts.era === "BC" || namedParts.era === "B" ? -namedParts.year + 1 : +namedParts.year,
		month: +namedParts.month,
		day: +namedParts.day,
		hour: namedParts.hour === "24" ? 0 : +namedParts.hour,
		minute: +namedParts.minute,
		second: +namedParts.second
	};
}
var $d07e34cce18680fd$var$DAYMILLIS = 864e5;
function $d07e34cce18680fd$var$getValidWallTimes(date, timeZone, earlier, later) {
	return (earlier === later ? [earlier] : [earlier, later]).filter((absolute) => $d07e34cce18680fd$var$isValidWallTime(date, timeZone, absolute));
}
function $d07e34cce18680fd$var$isValidWallTime(date, timeZone, absolute) {
	let parts = $d07e34cce18680fd$var$getTimeZoneParts(absolute, timeZone);
	return date.year === parts.year && date.month === parts.month && date.day === parts.day && date.hour === parts.hour && date.minute === parts.minute && date.second === parts.second;
}
function $d07e34cce18680fd$export$5107c82f94518f5c(date, timeZone, disambiguation = "compatible") {
	let dateTime = $d07e34cce18680fd$export$b21e0b124e224484(date);
	if (timeZone === "UTC") return $d07e34cce18680fd$export$bd4fb2bc8bb06fb(dateTime);
	if (timeZone === $ad063034c8620db8$export$aa8b41735afcabd2() && disambiguation === "compatible" && !$ad063034c8620db8$export$6ab69b273755230b()) {
		dateTime = $d07e34cce18680fd$export$b4a036af3fc0b032(dateTime, new $93635573935797de$export$80ee6245ec4f29ec());
		let date = /* @__PURE__ */ new Date();
		let year = $93635573935797de$export$c36e0ecb2d4fa69d(dateTime.era, dateTime.year);
		date.setFullYear(year, dateTime.month - 1, dateTime.day);
		date.setHours(dateTime.hour, dateTime.minute, dateTime.second, dateTime.millisecond);
		return date.getTime();
	}
	let ms = $d07e34cce18680fd$export$bd4fb2bc8bb06fb(dateTime);
	let offsetBefore = $d07e34cce18680fd$export$59c99f3515d3493f(ms - $d07e34cce18680fd$var$DAYMILLIS, timeZone);
	let offsetAfter = $d07e34cce18680fd$export$59c99f3515d3493f(ms + $d07e34cce18680fd$var$DAYMILLIS, timeZone);
	let valid = $d07e34cce18680fd$var$getValidWallTimes(dateTime, timeZone, ms - offsetBefore, ms - offsetAfter);
	if (valid.length === 1) return valid[0];
	if (valid.length > 1) switch (disambiguation) {
		case "compatible":
		case "earlier": return valid[0];
		case "later": return valid[valid.length - 1];
		case "reject": throw new RangeError("Multiple possible absolute times found");
	}
	switch (disambiguation) {
		case "earlier": return Math.min(ms - offsetBefore, ms - offsetAfter);
		case "compatible":
		case "later": return Math.max(ms - offsetBefore, ms - offsetAfter);
		case "reject": throw new RangeError("No such absolute time found");
	}
}
function $d07e34cce18680fd$export$e67a095c620b86fe(dateTime, timeZone, disambiguation = "compatible") {
	return new Date($d07e34cce18680fd$export$5107c82f94518f5c(dateTime, timeZone, disambiguation));
}
function $d07e34cce18680fd$export$1b96692a1ba042ac(ms, timeZone) {
	let offset = $d07e34cce18680fd$export$59c99f3515d3493f(ms, timeZone);
	let date = new Date(ms + offset);
	let year = date.getUTCFullYear();
	let month = date.getUTCMonth() + 1;
	let day = date.getUTCDate();
	let hour = date.getUTCHours();
	let minute = date.getUTCMinutes();
	let second = date.getUTCSeconds();
	let millisecond = date.getUTCMilliseconds();
	return new $2aaf608024c21ca1$export$d3b7288e7994edea(year < 1 ? "BC" : "AD", year < 1 ? -year + 1 : year, month, day, timeZone, offset, hour, minute, second, millisecond);
}
function $d07e34cce18680fd$export$93522d1a439f3617(dateTime) {
	return new $2aaf608024c21ca1$export$99faa760c7908e4f(dateTime.calendar, dateTime.era, dateTime.year, dateTime.month, dateTime.day);
}
function $d07e34cce18680fd$export$b21e0b124e224484(date, time) {
	let hour = 0, minute = 0, second = 0, millisecond = 0;
	if ("timeZone" in date) ({hour: hour, minute: minute, second: second, millisecond: millisecond} = date);
	else if ("hour" in date && !time) return date;
	if (time) ({hour: hour, minute: minute, second: second, millisecond: millisecond} = time);
	return new $2aaf608024c21ca1$export$ca871e8dbb80966f(date.calendar, date.era, date.year, date.month, date.day, hour, minute, second, millisecond);
}
function $d07e34cce18680fd$export$d33f79e3ffc3dc83(dateTime) {
	return new $2aaf608024c21ca1$export$680ea196effce5f(dateTime.hour, dateTime.minute, dateTime.second, dateTime.millisecond);
}
function $d07e34cce18680fd$export$b4a036af3fc0b032(date, calendar) {
	if ($ad063034c8620db8$export$dbc69fd56b53d5e(date.calendar, calendar)) return date;
	let calendarDate = calendar.fromJulianDay(date.calendar.toJulianDay(date));
	let copy = date.copy();
	copy.calendar = calendar;
	copy.era = calendarDate.era;
	copy.year = calendarDate.year;
	copy.month = calendarDate.month;
	copy.day = calendarDate.day;
	$435a2ceaa8778ed8$export$c4e2ecac49351ef2(copy);
	return copy;
}
function $d07e34cce18680fd$export$84c95a83c799e074(date, timeZone, disambiguation) {
	if (date instanceof $2aaf608024c21ca1$export$d3b7288e7994edea) {
		if (date.timeZone === timeZone) return date;
		return $d07e34cce18680fd$export$538b00033cc11c75(date, timeZone);
	}
	return $d07e34cce18680fd$export$1b96692a1ba042ac($d07e34cce18680fd$export$5107c82f94518f5c(date, timeZone, disambiguation), timeZone);
}
function $d07e34cce18680fd$export$83aac07b4c37b25(date) {
	let ms = $d07e34cce18680fd$export$bd4fb2bc8bb06fb(date) - date.offset;
	return new Date(ms);
}
function $d07e34cce18680fd$export$538b00033cc11c75(date, timeZone) {
	return $d07e34cce18680fd$export$b4a036af3fc0b032($d07e34cce18680fd$export$1b96692a1ba042ac($d07e34cce18680fd$export$bd4fb2bc8bb06fb(date) - date.offset, timeZone), date.calendar);
}
function $d07e34cce18680fd$export$d9b67bc93c097491(date) {
	return $d07e34cce18680fd$export$538b00033cc11c75(date, $ad063034c8620db8$export$aa8b41735afcabd2());
}
//#endregion
//#region node_modules/@internationalized/date/dist/private/manipulation.mjs
var $435a2ceaa8778ed8$var$ONE_HOUR = 36e5;
function $435a2ceaa8778ed8$export$e16d8520af44a096(date, duration) {
	let mutableDate = date.copy();
	let days = "hour" in mutableDate ? $435a2ceaa8778ed8$var$addTimeFields(mutableDate, duration) : 0;
	$435a2ceaa8778ed8$var$addYears(mutableDate, duration.years || 0);
	if (mutableDate.calendar.balanceYearMonth) mutableDate.calendar.balanceYearMonth(mutableDate, date);
	mutableDate.month += duration.months || 0;
	$435a2ceaa8778ed8$var$balanceYearMonth(mutableDate);
	$435a2ceaa8778ed8$var$constrainMonthDay(mutableDate);
	mutableDate.day += (duration.weeks || 0) * 7;
	mutableDate.day += duration.days || 0;
	mutableDate.day += days;
	$435a2ceaa8778ed8$var$balanceDay(mutableDate);
	if (mutableDate.calendar.balanceDate) mutableDate.calendar.balanceDate(mutableDate);
	if (mutableDate.year < 1) {
		mutableDate.year = 1;
		mutableDate.month = 1;
		mutableDate.day = 1;
	}
	let maxYear = mutableDate.calendar.getYearsInEra(mutableDate);
	if (mutableDate.year > maxYear) {
		let isInverseEra = mutableDate.calendar.isInverseEra?.(mutableDate);
		mutableDate.year = maxYear;
		mutableDate.month = isInverseEra ? 1 : mutableDate.calendar.getMonthsInYear(mutableDate);
		mutableDate.day = isInverseEra ? 1 : mutableDate.calendar.getDaysInMonth(mutableDate);
	}
	if (mutableDate.month < 1) {
		mutableDate.month = 1;
		mutableDate.day = 1;
	}
	let maxMonth = mutableDate.calendar.getMonthsInYear(mutableDate);
	if (mutableDate.month > maxMonth) {
		mutableDate.month = maxMonth;
		mutableDate.day = mutableDate.calendar.getDaysInMonth(mutableDate);
	}
	mutableDate.day = Math.max(1, Math.min(mutableDate.calendar.getDaysInMonth(mutableDate), mutableDate.day));
	return mutableDate;
}
function $435a2ceaa8778ed8$var$addYears(date, years) {
	if (date.calendar.isInverseEra?.(date)) years = -years;
	date.year += years;
}
function $435a2ceaa8778ed8$var$balanceYearMonth(date) {
	while (date.month < 1) {
		$435a2ceaa8778ed8$var$addYears(date, -1);
		date.month += date.calendar.getMonthsInYear(date);
	}
	let monthsInYear = 0;
	while (date.month > (monthsInYear = date.calendar.getMonthsInYear(date))) {
		date.month -= monthsInYear;
		$435a2ceaa8778ed8$var$addYears(date, 1);
	}
}
function $435a2ceaa8778ed8$var$balanceDay(date) {
	while (date.day < 1) {
		date.month--;
		$435a2ceaa8778ed8$var$balanceYearMonth(date);
		date.day += date.calendar.getDaysInMonth(date);
	}
	while (date.day > date.calendar.getDaysInMonth(date)) {
		date.day -= date.calendar.getDaysInMonth(date);
		date.month++;
		$435a2ceaa8778ed8$var$balanceYearMonth(date);
	}
}
function $435a2ceaa8778ed8$var$constrainMonthDay(date) {
	date.month = Math.max(1, Math.min(date.calendar.getMonthsInYear(date), date.month));
	date.day = Math.max(1, Math.min(date.calendar.getDaysInMonth(date), date.day));
}
function $435a2ceaa8778ed8$export$c4e2ecac49351ef2(date) {
	if (date.calendar.constrainDate) date.calendar.constrainDate(date);
	date.year = Math.max(1, Math.min(date.calendar.getYearsInEra(date), date.year));
	$435a2ceaa8778ed8$var$constrainMonthDay(date);
}
function $435a2ceaa8778ed8$export$3e2544e88a25bff8(duration) {
	let inverseDuration = {};
	for (let key in duration) if (typeof duration[key] === "number") inverseDuration[key] = -duration[key];
	return inverseDuration;
}
function $435a2ceaa8778ed8$export$4e2d2ead65e5f7e3(date, duration) {
	return $435a2ceaa8778ed8$export$e16d8520af44a096(date, $435a2ceaa8778ed8$export$3e2544e88a25bff8(duration));
}
function $435a2ceaa8778ed8$export$adaa4cf7ef1b65be(date, fields) {
	let mutableDate = date.copy();
	if (fields.era != null) mutableDate.era = fields.era;
	if (fields.year != null) mutableDate.year = fields.year;
	if (fields.month != null) mutableDate.month = fields.month;
	if (fields.day != null) mutableDate.day = fields.day;
	$435a2ceaa8778ed8$export$c4e2ecac49351ef2(mutableDate);
	return mutableDate;
}
function $435a2ceaa8778ed8$export$e5d5e1c1822b6e56(value, fields) {
	let mutableValue = value.copy();
	if (fields.hour != null) mutableValue.hour = fields.hour;
	if (fields.minute != null) mutableValue.minute = fields.minute;
	if (fields.second != null) mutableValue.second = fields.second;
	if (fields.millisecond != null) mutableValue.millisecond = fields.millisecond;
	$435a2ceaa8778ed8$export$7555de1e070510cb(mutableValue);
	return mutableValue;
}
function $435a2ceaa8778ed8$var$balanceTime(time) {
	time.second += Math.floor(time.millisecond / 1e3);
	time.millisecond = $435a2ceaa8778ed8$var$nonNegativeMod(time.millisecond, 1e3);
	time.minute += Math.floor(time.second / 60);
	time.second = $435a2ceaa8778ed8$var$nonNegativeMod(time.second, 60);
	time.hour += Math.floor(time.minute / 60);
	time.minute = $435a2ceaa8778ed8$var$nonNegativeMod(time.minute, 60);
	let days = Math.floor(time.hour / 24);
	time.hour = $435a2ceaa8778ed8$var$nonNegativeMod(time.hour, 24);
	return days;
}
function $435a2ceaa8778ed8$export$7555de1e070510cb(time) {
	time.millisecond = Math.max(0, Math.min(time.millisecond, 1e3));
	time.second = Math.max(0, Math.min(time.second, 59));
	time.minute = Math.max(0, Math.min(time.minute, 59));
	time.hour = Math.max(0, Math.min(time.hour, 23));
}
function $435a2ceaa8778ed8$var$nonNegativeMod(a, b) {
	let result = a % b;
	if (result < 0) result += b;
	return result;
}
function $435a2ceaa8778ed8$var$addTimeFields(time, duration) {
	time.hour += duration.hours || 0;
	time.minute += duration.minutes || 0;
	time.second += duration.seconds || 0;
	time.millisecond += duration.milliseconds || 0;
	return $435a2ceaa8778ed8$var$balanceTime(time);
}
function $435a2ceaa8778ed8$export$7ed87b6bc2506470(time, duration) {
	let res = time.copy();
	$435a2ceaa8778ed8$var$addTimeFields(res, duration);
	return res;
}
function $435a2ceaa8778ed8$export$fe34d3a381cd7501(time, duration) {
	return $435a2ceaa8778ed8$export$7ed87b6bc2506470(time, $435a2ceaa8778ed8$export$3e2544e88a25bff8(duration));
}
function $435a2ceaa8778ed8$export$d52ced6badfb9a4c(value, field, amount, options) {
	let mutable = value.copy();
	switch (field) {
		case "era": {
			let eras = value.calendar.getEras();
			let eraIndex = eras.indexOf(value.era);
			if (eraIndex < 0) throw new Error("Invalid era: " + value.era);
			eraIndex = $435a2ceaa8778ed8$var$cycleValue(eraIndex, amount, 0, eras.length - 1, options?.round);
			mutable.era = eras[eraIndex];
			$435a2ceaa8778ed8$export$c4e2ecac49351ef2(mutable);
			break;
		}
		case "year":
			if (mutable.calendar.isInverseEra?.(mutable)) amount = -amount;
			mutable.year = $435a2ceaa8778ed8$var$cycleValue(value.year, amount, -Infinity, 9999, options?.round);
			if (mutable.year === -Infinity) mutable.year = 1;
			if (mutable.calendar.balanceYearMonth) mutable.calendar.balanceYearMonth(mutable, value);
			break;
		case "month":
			mutable.month = $435a2ceaa8778ed8$var$cycleValue(value.month, amount, 1, value.calendar.getMonthsInYear(value), options?.round);
			break;
		case "day":
			mutable.day = $435a2ceaa8778ed8$var$cycleValue(value.day, amount, 1, value.calendar.getDaysInMonth(value), options?.round);
			break;
		default: throw new Error("Unsupported field " + field);
	}
	if (value.calendar.balanceDate) value.calendar.balanceDate(mutable);
	$435a2ceaa8778ed8$export$c4e2ecac49351ef2(mutable);
	return mutable;
}
function $435a2ceaa8778ed8$export$dd02b3e0007dfe28(value, field, amount, options) {
	let mutable = value.copy();
	switch (field) {
		case "hour": {
			let hours = value.hour;
			let min = 0;
			let max = 23;
			if (options?.hourCycle === 12) {
				let isPM = hours >= 12;
				min = isPM ? 12 : 0;
				max = isPM ? 23 : 11;
			}
			mutable.hour = $435a2ceaa8778ed8$var$cycleValue(hours, amount, min, max, options?.round);
			break;
		}
		case "minute":
			mutable.minute = $435a2ceaa8778ed8$var$cycleValue(value.minute, amount, 0, 59, options?.round);
			break;
		case "second":
			mutable.second = $435a2ceaa8778ed8$var$cycleValue(value.second, amount, 0, 59, options?.round);
			break;
		case "millisecond":
			mutable.millisecond = $435a2ceaa8778ed8$var$cycleValue(value.millisecond, amount, 0, 999, options?.round);
			break;
		default: throw new Error("Unsupported field " + field);
	}
	return mutable;
}
function $435a2ceaa8778ed8$var$cycleValue(value, amount, min, max, round = false) {
	if (round) {
		value += Math.sign(amount);
		if (value < min) value = max;
		let div = Math.abs(amount);
		if (amount > 0) value = Math.ceil(value / div) * div;
		else value = Math.floor(value / div) * div;
		if (value > max) value = min;
	} else {
		value += amount;
		if (value < min) value = max - (min - value - 1);
		else if (value > max) value = min + (value - max - 1);
	}
	return value;
}
function $435a2ceaa8778ed8$export$96b1d28349274637(dateTime, duration) {
	let ms;
	if (duration.years != null && duration.years !== 0 || duration.months != null && duration.months !== 0 || duration.weeks != null && duration.weeks !== 0 || duration.days != null && duration.days !== 0) ms = $d07e34cce18680fd$export$5107c82f94518f5c($435a2ceaa8778ed8$export$e16d8520af44a096($d07e34cce18680fd$export$b21e0b124e224484(dateTime), {
		years: duration.years,
		months: duration.months,
		weeks: duration.weeks,
		days: duration.days
	}), dateTime.timeZone);
	else ms = $d07e34cce18680fd$export$bd4fb2bc8bb06fb(dateTime) - dateTime.offset;
	ms += duration.milliseconds || 0;
	ms += (duration.seconds || 0) * 1e3;
	ms += (duration.minutes || 0) * 6e4;
	ms += (duration.hours || 0) * 36e5;
	return $d07e34cce18680fd$export$b4a036af3fc0b032($d07e34cce18680fd$export$1b96692a1ba042ac(ms, dateTime.timeZone), dateTime.calendar);
}
function $435a2ceaa8778ed8$export$6814caac34ca03c7(dateTime, duration) {
	return $435a2ceaa8778ed8$export$96b1d28349274637(dateTime, $435a2ceaa8778ed8$export$3e2544e88a25bff8(duration));
}
function $435a2ceaa8778ed8$export$9a297d111fc86b79(dateTime, field, amount, options) {
	switch (field) {
		case "hour": {
			let min = 0;
			let max = 23;
			if (options?.hourCycle === 12) {
				let isPM = dateTime.hour >= 12;
				min = isPM ? 12 : 0;
				max = isPM ? 23 : 11;
			}
			let plainDateTime = $d07e34cce18680fd$export$b21e0b124e224484(dateTime);
			let minDate = $d07e34cce18680fd$export$b4a036af3fc0b032($435a2ceaa8778ed8$export$e5d5e1c1822b6e56(plainDateTime, { hour: min }), new $93635573935797de$export$80ee6245ec4f29ec());
			let minAbsolute = [$d07e34cce18680fd$export$5107c82f94518f5c(minDate, dateTime.timeZone, "earlier"), $d07e34cce18680fd$export$5107c82f94518f5c(minDate, dateTime.timeZone, "later")].filter((ms) => $d07e34cce18680fd$export$1b96692a1ba042ac(ms, dateTime.timeZone).day === minDate.day)[0];
			let maxDate = $d07e34cce18680fd$export$b4a036af3fc0b032($435a2ceaa8778ed8$export$e5d5e1c1822b6e56(plainDateTime, { hour: max }), new $93635573935797de$export$80ee6245ec4f29ec());
			let maxAbsolute = [$d07e34cce18680fd$export$5107c82f94518f5c(maxDate, dateTime.timeZone, "earlier"), $d07e34cce18680fd$export$5107c82f94518f5c(maxDate, dateTime.timeZone, "later")].filter((ms) => $d07e34cce18680fd$export$1b96692a1ba042ac(ms, dateTime.timeZone).day === maxDate.day).pop();
			let ms = $d07e34cce18680fd$export$bd4fb2bc8bb06fb(dateTime) - dateTime.offset;
			let hours = Math.floor(ms / $435a2ceaa8778ed8$var$ONE_HOUR);
			let remainder = ms % $435a2ceaa8778ed8$var$ONE_HOUR;
			ms = $435a2ceaa8778ed8$var$cycleValue(hours, amount, Math.floor(minAbsolute / $435a2ceaa8778ed8$var$ONE_HOUR), Math.floor(maxAbsolute / $435a2ceaa8778ed8$var$ONE_HOUR), options?.round) * $435a2ceaa8778ed8$var$ONE_HOUR + remainder;
			return $d07e34cce18680fd$export$b4a036af3fc0b032($d07e34cce18680fd$export$1b96692a1ba042ac(ms, dateTime.timeZone), dateTime.calendar);
		}
		case "minute":
		case "second":
		case "millisecond": return $435a2ceaa8778ed8$export$dd02b3e0007dfe28(dateTime, field, amount, options);
		case "era":
		case "year":
		case "month":
		case "day": return $d07e34cce18680fd$export$b4a036af3fc0b032($d07e34cce18680fd$export$1b96692a1ba042ac($d07e34cce18680fd$export$5107c82f94518f5c($435a2ceaa8778ed8$export$d52ced6badfb9a4c($d07e34cce18680fd$export$b21e0b124e224484(dateTime), field, amount, options), dateTime.timeZone), dateTime.timeZone), dateTime.calendar);
		default: throw new Error("Unsupported field " + field);
	}
}
function $435a2ceaa8778ed8$export$31b5430eb18be4f8(dateTime, fields, disambiguation) {
	let plainDateTime = $d07e34cce18680fd$export$b21e0b124e224484(dateTime);
	let res = $435a2ceaa8778ed8$export$e5d5e1c1822b6e56($435a2ceaa8778ed8$export$adaa4cf7ef1b65be(plainDateTime, fields), fields);
	if (res.compare(plainDateTime) === 0) return dateTime;
	return $d07e34cce18680fd$export$b4a036af3fc0b032($d07e34cce18680fd$export$1b96692a1ba042ac($d07e34cce18680fd$export$5107c82f94518f5c(res, dateTime.timeZone, disambiguation), dateTime.timeZone), dateTime.calendar);
}
//#endregion
//#region node_modules/@internationalized/date/dist/private/string.mjs
var $58246871e4652552$var$DATE_RE = /^([+-]\d{6}|\d{4})-(\d{2})-(\d{2})$/;
var $58246871e4652552$var$DATE_TIME_RE = /^([+-]\d{6}|\d{4})-(\d{2})-(\d{2})(?:T(\d{2}))?(?::(\d{2}))?(?::(\d{2}))?(\.\d+)?$/;
var $58246871e4652552$var$ABSOLUTE_RE = /^([+-]\d{6}|\d{4})-(\d{2})-(\d{2})(?:T(\d{2}))?(?::(\d{2}))?(?::(\d{2}))?(\.\d+)?(?:(?:([+-]\d{2})(?::?(\d{2}))?)|Z)$/;
function $58246871e4652552$export$6b862160d295c8e(value) {
	let m = value.match($58246871e4652552$var$DATE_RE);
	if (!m) {
		if ($58246871e4652552$var$ABSOLUTE_RE.test(value)) throw new Error(`Invalid ISO 8601 date string: ${value}. Use parseAbsolute() instead.`);
		throw new Error("Invalid ISO 8601 date string: " + value);
	}
	let date = new $2aaf608024c21ca1$export$99faa760c7908e4f($58246871e4652552$var$parseNumber(m[1], 0, 9999), $58246871e4652552$var$parseNumber(m[2], 1, 12), 1);
	date.day = $58246871e4652552$var$parseNumber(m[3], 1, date.calendar.getDaysInMonth(date));
	return date;
}
function $58246871e4652552$export$588937bcd60ade55(value) {
	let m = value.match($58246871e4652552$var$DATE_TIME_RE);
	if (!m) {
		if ($58246871e4652552$var$ABSOLUTE_RE.test(value)) throw new Error(`Invalid ISO 8601 date time string: ${value}. Use parseAbsolute() instead.`);
		throw new Error("Invalid ISO 8601 date time string: " + value);
	}
	let year = $58246871e4652552$var$parseNumber(m[1], -9999, 9999);
	let date = new $2aaf608024c21ca1$export$ca871e8dbb80966f(year < 1 ? "BC" : "AD", year < 1 ? -year + 1 : year, $58246871e4652552$var$parseNumber(m[2], 1, 12), 1, m[4] ? $58246871e4652552$var$parseNumber(m[4], 0, 23) : 0, m[5] ? $58246871e4652552$var$parseNumber(m[5], 0, 59) : 0, m[6] ? $58246871e4652552$var$parseNumber(m[6], 0, 59) : 0, m[7] ? $58246871e4652552$var$parseNumber(m[7], 0, Infinity) * 1e3 : 0);
	date.day = $58246871e4652552$var$parseNumber(m[3], 0, date.calendar.getDaysInMonth(date));
	return date;
}
function $58246871e4652552$var$parseNumber(value, min, max) {
	let val = Number(value);
	if (val < min || val > max) throw new RangeError(`Value out of range: ${min} <= ${val} <= ${max}`);
	return val;
}
function $58246871e4652552$export$f59dee82248f5ad4(time) {
	return `${String(time.hour).padStart(2, "0")}:${String(time.minute).padStart(2, "0")}:${String(time.second).padStart(2, "0")}${time.millisecond ? String(time.millisecond / 1e3).slice(1) : ""}`;
}
function $58246871e4652552$export$60dfd74aa96791bd(date) {
	let gregorianDate = $d07e34cce18680fd$export$b4a036af3fc0b032(date, new $93635573935797de$export$80ee6245ec4f29ec());
	let year;
	if (gregorianDate.era === "BC") year = gregorianDate.year === 1 ? "0000" : "-" + String(Math.abs(1 - gregorianDate.year)).padStart(6, "00");
	else year = String(gregorianDate.year).padStart(4, "0");
	return `${year}-${String(gregorianDate.month).padStart(2, "0")}-${String(gregorianDate.day).padStart(2, "0")}`;
}
function $58246871e4652552$export$4223de14708adc63(date) {
	return `${$58246871e4652552$export$60dfd74aa96791bd(date)}T${$58246871e4652552$export$f59dee82248f5ad4(date)}`;
}
function $58246871e4652552$var$offsetToString(offset) {
	let sign = Math.sign(offset) < 0 ? "-" : "+";
	offset = Math.abs(offset);
	let offsetHours = Math.floor(offset / 36e5);
	let offsetMinutes = Math.floor(offset % 36e5 / 6e4);
	let offsetSeconds = Math.floor(offset % 36e5 % 6e4 / 1e3);
	let stringOffset = `${sign}${String(offsetHours).padStart(2, "0")}:${String(offsetMinutes).padStart(2, "0")}`;
	if (offsetSeconds !== 0) stringOffset += `:${String(offsetSeconds).padStart(2, "0")}`;
	return stringOffset;
}
function $58246871e4652552$export$bf79f1ebf4b18792(date) {
	return `${$58246871e4652552$export$4223de14708adc63(date)}${$58246871e4652552$var$offsetToString(date.offset)}[${date.timeZone}]`;
}
//#endregion
//#region node_modules/@internationalized/date/dist/private/CalendarDate.mjs
function $2aaf608024c21ca1$var$shiftArgs(args) {
	let calendar = typeof args[0] === "object" ? args.shift() : new $93635573935797de$export$80ee6245ec4f29ec();
	let era;
	if (typeof args[0] === "string") era = args.shift();
	else {
		let eras = calendar.getEras();
		era = eras[eras.length - 1];
	}
	let year = args.shift();
	let month = args.shift();
	let day = args.shift();
	return [
		calendar,
		era,
		year,
		month,
		day
	];
}
var $2aaf608024c21ca1$export$99faa760c7908e4f = class $2aaf608024c21ca1$export$99faa760c7908e4f {
	#type;
	constructor(...args) {
		let [calendar, era, year, month, day] = $2aaf608024c21ca1$var$shiftArgs(args);
		this.calendar = calendar;
		this.era = era;
		this.year = year;
		this.month = month;
		this.day = day;
		$435a2ceaa8778ed8$export$c4e2ecac49351ef2(this);
	}
	/** Returns a copy of this date. */ copy() {
		if (this.era) return new $2aaf608024c21ca1$export$99faa760c7908e4f(this.calendar, this.era, this.year, this.month, this.day);
		else return new $2aaf608024c21ca1$export$99faa760c7908e4f(this.calendar, this.year, this.month, this.day);
	}
	/** Returns a new `CalendarDate` with the given duration added to it. */ add(duration) {
		return $435a2ceaa8778ed8$export$e16d8520af44a096(this, duration);
	}
	/** Returns a new `CalendarDate` with the given duration subtracted from it. */ subtract(duration) {
		return $435a2ceaa8778ed8$export$4e2d2ead65e5f7e3(this, duration);
	}
	/**
	* Returns a new `CalendarDate` with the given fields set to the provided values. Other fields
	* will be constrained accordingly.
	*/ set(fields) {
		return $435a2ceaa8778ed8$export$adaa4cf7ef1b65be(this, fields);
	}
	/**
	* Returns a new `CalendarDate` with the given field adjusted by a specified amount.
	* When the resulting value reaches the limits of the field, it wraps around.
	*/ cycle(field, amount, options) {
		return $435a2ceaa8778ed8$export$d52ced6badfb9a4c(this, field, amount, options);
	}
	/**
	* Converts the date to a native JavaScript Date object, with the time set to midnight in the
	* given time zone.
	*/ toDate(timeZone) {
		return $d07e34cce18680fd$export$e67a095c620b86fe(this, timeZone);
	}
	/** Converts the date to an ISO 8601 formatted string. */ toString() {
		return $58246871e4652552$export$60dfd74aa96791bd(this);
	}
	/**
	* Compares this date with another. A negative result indicates that this date is before the given
	* one, and a positive date indicates that it is after.
	*/ compare(b) {
		return $ad063034c8620db8$export$68781ddf31c0090f(this, b);
	}
};
var $2aaf608024c21ca1$export$680ea196effce5f = class $2aaf608024c21ca1$export$680ea196effce5f {
	#type;
	constructor(hour = 0, minute = 0, second = 0, millisecond = 0) {
		this.hour = hour;
		this.minute = minute;
		this.second = second;
		this.millisecond = millisecond;
		$435a2ceaa8778ed8$export$7555de1e070510cb(this);
	}
	/** Returns a copy of this time. */ copy() {
		return new $2aaf608024c21ca1$export$680ea196effce5f(this.hour, this.minute, this.second, this.millisecond);
	}
	/** Returns a new `Time` with the given duration added to it. */ add(duration) {
		return $435a2ceaa8778ed8$export$7ed87b6bc2506470(this, duration);
	}
	/** Returns a new `Time` with the given duration subtracted from it. */ subtract(duration) {
		return $435a2ceaa8778ed8$export$fe34d3a381cd7501(this, duration);
	}
	/**
	* Returns a new `Time` with the given fields set to the provided values. Other fields will be
	* constrained accordingly.
	*/ set(fields) {
		return $435a2ceaa8778ed8$export$e5d5e1c1822b6e56(this, fields);
	}
	/**
	* Returns a new `Time` with the given field adjusted by a specified amount.
	* When the resulting value reaches the limits of the field, it wraps around.
	*/ cycle(field, amount, options) {
		return $435a2ceaa8778ed8$export$dd02b3e0007dfe28(this, field, amount, options);
	}
	/** Converts the time to an ISO 8601 formatted string. */ toString() {
		return $58246871e4652552$export$f59dee82248f5ad4(this);
	}
	/**
	* Compares this time with another. A negative result indicates that this time is before the given
	* one, and a positive time indicates that it is after.
	*/ compare(b) {
		return $ad063034c8620db8$export$c19a80a9721b80f6(this, b);
	}
};
var $2aaf608024c21ca1$export$ca871e8dbb80966f = class $2aaf608024c21ca1$export$ca871e8dbb80966f {
	#type;
	constructor(...args) {
		let [calendar, era, year, month, day] = $2aaf608024c21ca1$var$shiftArgs(args);
		this.calendar = calendar;
		this.era = era;
		this.year = year;
		this.month = month;
		this.day = day;
		this.hour = args.shift() || 0;
		this.minute = args.shift() || 0;
		this.second = args.shift() || 0;
		this.millisecond = args.shift() || 0;
		$435a2ceaa8778ed8$export$c4e2ecac49351ef2(this);
	}
	/** Returns a copy of this date. */ copy() {
		if (this.era) return new $2aaf608024c21ca1$export$ca871e8dbb80966f(this.calendar, this.era, this.year, this.month, this.day, this.hour, this.minute, this.second, this.millisecond);
		else return new $2aaf608024c21ca1$export$ca871e8dbb80966f(this.calendar, this.year, this.month, this.day, this.hour, this.minute, this.second, this.millisecond);
	}
	/** Returns a new `CalendarDateTime` with the given duration added to it. */ add(duration) {
		return $435a2ceaa8778ed8$export$e16d8520af44a096(this, duration);
	}
	/** Returns a new `CalendarDateTime` with the given duration subtracted from it. */ subtract(duration) {
		return $435a2ceaa8778ed8$export$4e2d2ead65e5f7e3(this, duration);
	}
	/**
	* Returns a new `CalendarDateTime` with the given fields set to the provided values. Other fields
	* will be constrained accordingly.
	*/ set(fields) {
		return $435a2ceaa8778ed8$export$adaa4cf7ef1b65be($435a2ceaa8778ed8$export$e5d5e1c1822b6e56(this, fields), fields);
	}
	/**
	* Returns a new `CalendarDateTime` with the given field adjusted by a specified amount.
	* When the resulting value reaches the limits of the field, it wraps around.
	*/ cycle(field, amount, options) {
		switch (field) {
			case "era":
			case "year":
			case "month":
			case "day": return $435a2ceaa8778ed8$export$d52ced6badfb9a4c(this, field, amount, options);
			default: return $435a2ceaa8778ed8$export$dd02b3e0007dfe28(this, field, amount, options);
		}
	}
	/** Converts the date to a native JavaScript Date object in the given time zone. */ toDate(timeZone, disambiguation) {
		return $d07e34cce18680fd$export$e67a095c620b86fe(this, timeZone, disambiguation);
	}
	/** Converts the date to an ISO 8601 formatted string. */ toString() {
		return $58246871e4652552$export$4223de14708adc63(this);
	}
	/**
	* Compares this date with another. A negative result indicates that this date is before the given
	* one, and a positive date indicates that it is after.
	*/ compare(b) {
		let res = $ad063034c8620db8$export$68781ddf31c0090f(this, b);
		if (res === 0) return $ad063034c8620db8$export$c19a80a9721b80f6(this, $d07e34cce18680fd$export$b21e0b124e224484(b));
		return res;
	}
};
var $2aaf608024c21ca1$export$d3b7288e7994edea = class $2aaf608024c21ca1$export$d3b7288e7994edea {
	#type;
	constructor(...args) {
		let [calendar, era, year, month, day] = $2aaf608024c21ca1$var$shiftArgs(args);
		let timeZone = args.shift();
		let offset = args.shift();
		this.calendar = calendar;
		this.era = era;
		this.year = year;
		this.month = month;
		this.day = day;
		this.timeZone = timeZone;
		this.offset = offset;
		this.hour = args.shift() || 0;
		this.minute = args.shift() || 0;
		this.second = args.shift() || 0;
		this.millisecond = args.shift() || 0;
		$435a2ceaa8778ed8$export$c4e2ecac49351ef2(this);
	}
	/** Returns a copy of this date. */ copy() {
		if (this.era) return new $2aaf608024c21ca1$export$d3b7288e7994edea(this.calendar, this.era, this.year, this.month, this.day, this.timeZone, this.offset, this.hour, this.minute, this.second, this.millisecond);
		else return new $2aaf608024c21ca1$export$d3b7288e7994edea(this.calendar, this.year, this.month, this.day, this.timeZone, this.offset, this.hour, this.minute, this.second, this.millisecond);
	}
	/** Returns a new `ZonedDateTime` with the given duration added to it. */ add(duration) {
		return $435a2ceaa8778ed8$export$96b1d28349274637(this, duration);
	}
	/** Returns a new `ZonedDateTime` with the given duration subtracted from it. */ subtract(duration) {
		return $435a2ceaa8778ed8$export$6814caac34ca03c7(this, duration);
	}
	/**
	* Returns a new `ZonedDateTime` with the given fields set to the provided values. Other fields
	* will be constrained accordingly.
	*/ set(fields, disambiguation) {
		return $435a2ceaa8778ed8$export$31b5430eb18be4f8(this, fields, disambiguation);
	}
	/**
	* Returns a new `ZonedDateTime` with the given field adjusted by a specified amount.
	* When the resulting value reaches the limits of the field, it wraps around.
	*/ cycle(field, amount, options) {
		return $435a2ceaa8778ed8$export$9a297d111fc86b79(this, field, amount, options);
	}
	/** Converts the date to a native JavaScript Date object. */ toDate() {
		return $d07e34cce18680fd$export$83aac07b4c37b25(this);
	}
	/**
	* Converts the date to an ISO 8601 formatted string, including the UTC offset and time zone
	* identifier.
	*/ toString() {
		return $58246871e4652552$export$bf79f1ebf4b18792(this);
	}
	/** Converts the date to an ISO 8601 formatted string in UTC. */ toAbsoluteString() {
		return this.toDate().toISOString();
	}
	/**
	* Compares this date with another. A negative result indicates that this date is before the given
	* one, and a positive date indicates that it is after.
	*/ compare(b) {
		return this.toDate().getTime() - $d07e34cce18680fd$export$84c95a83c799e074(b, this.timeZone).toDate().getTime();
	}
};
//#endregion
//#region node_modules/@internationalized/date/dist/private/DateFormatter.mjs
var $12a3c853105e5a70$var$formatterCache = /* @__PURE__ */ new Map();
var $12a3c853105e5a70$export$ad991b66133851cf = class {
	constructor(locale, options = {}) {
		this.formatter = $12a3c853105e5a70$var$getCachedDateFormatter(locale, options);
		this.options = options;
	}
	/**
	* Formats a date as a string according to the locale and format options passed to the
	* constructor.
	*/ format(value) {
		return this.formatter.format(value);
	}
	/** Formats a date to an array of parts such as separators, numbers, punctuation, and more. */ formatToParts(value) {
		return this.formatter.formatToParts(value);
	}
	/** Formats a date range as a string. */ formatRange(start, end) {
		if (typeof this.formatter.formatRange === "function") return this.formatter.formatRange(start, end);
		if (end < start) throw new RangeError("End date must be >= start date");
		return `${this.formatter.format(start)} \u{2013} ${this.formatter.format(end)}`;
	}
	/** Formats a date range as an array of parts. */ formatRangeToParts(start, end) {
		if (typeof this.formatter.formatRangeToParts === "function") return this.formatter.formatRangeToParts(start, end);
		if (end < start) throw new RangeError("End date must be >= start date");
		let startParts = this.formatter.formatToParts(start);
		let endParts = this.formatter.formatToParts(end);
		return [
			...startParts.map((p) => ({
				...p,
				source: "startRange"
			})),
			{
				type: "literal",
				value: " – ",
				source: "shared"
			},
			...endParts.map((p) => ({
				...p,
				source: "endRange"
			}))
		];
	}
	/** Returns the resolved formatting options based on the values passed to the constructor. */ resolvedOptions() {
		let resolvedOptions = this.formatter.resolvedOptions();
		if ($12a3c853105e5a70$var$hasBuggyResolvedHourCycle()) {
			if (!this.resolvedHourCycle) this.resolvedHourCycle = $12a3c853105e5a70$var$getResolvedHourCycle(resolvedOptions.locale, this.options);
			resolvedOptions.hourCycle = this.resolvedHourCycle;
			resolvedOptions.hour12 = this.resolvedHourCycle === "h11" || this.resolvedHourCycle === "h12";
		}
		if (resolvedOptions.calendar === "ethiopic-amete-alem") resolvedOptions.calendar = "ethioaa";
		return resolvedOptions;
	}
};
var $12a3c853105e5a70$var$hour12Preferences = {
	true: { ja: "h11" },
	false: {}
};
function $12a3c853105e5a70$var$getCachedDateFormatter(locale, options = {}) {
	if (typeof options.hour12 === "boolean" && $12a3c853105e5a70$var$hasBuggyHour12Behavior()) {
		options = { ...options };
		let pref = $12a3c853105e5a70$var$hour12Preferences[String(options.hour12)][locale.split("-")[0]];
		let defaultHourCycle = options.hour12 ? "h12" : "h23";
		options.hourCycle = pref ?? defaultHourCycle;
		delete options.hour12;
	}
	let cacheKey = locale + (options ? Object.entries(options).sort((a, b) => a[0] < b[0] ? -1 : 1).join() : "");
	if ($12a3c853105e5a70$var$formatterCache.has(cacheKey)) return $12a3c853105e5a70$var$formatterCache.get(cacheKey);
	let numberFormatter = new Intl.DateTimeFormat(locale, options);
	$12a3c853105e5a70$var$formatterCache.set(cacheKey, numberFormatter);
	return numberFormatter;
}
var $12a3c853105e5a70$var$_hasBuggyHour12Behavior = null;
function $12a3c853105e5a70$var$hasBuggyHour12Behavior() {
	if ($12a3c853105e5a70$var$_hasBuggyHour12Behavior == null) $12a3c853105e5a70$var$_hasBuggyHour12Behavior = new Intl.DateTimeFormat("en-US", {
		hour: "numeric",
		hour12: false
	}).format(new Date(2020, 2, 3, 0)) === "24";
	return $12a3c853105e5a70$var$_hasBuggyHour12Behavior;
}
var $12a3c853105e5a70$var$_hasBuggyResolvedHourCycle = null;
function $12a3c853105e5a70$var$hasBuggyResolvedHourCycle() {
	if ($12a3c853105e5a70$var$_hasBuggyResolvedHourCycle == null) $12a3c853105e5a70$var$_hasBuggyResolvedHourCycle = new Intl.DateTimeFormat("fr", {
		hour: "numeric",
		hour12: false
	}).resolvedOptions().hourCycle === "h12";
	return $12a3c853105e5a70$var$_hasBuggyResolvedHourCycle;
}
function $12a3c853105e5a70$var$getResolvedHourCycle(locale, options) {
	if (!options.timeStyle && !options.hour) return void 0;
	locale = locale.replace(/(-u-)?-nu-[a-zA-Z0-9]+/, "");
	locale += (locale.includes("-u-") ? "" : "-u") + "-nu-latn";
	let formatter = $12a3c853105e5a70$var$getCachedDateFormatter(locale, {
		...options,
		timeZone: void 0
	});
	let min = parseInt(formatter.formatToParts(new Date(2020, 2, 3, 0)).find((p) => p.type === "hour").value, 10);
	let max = parseInt(formatter.formatToParts(new Date(2020, 2, 3, 23)).find((p) => p.type === "hour").value, 10);
	if (min === 0 && max === 23) return "h23";
	if (min === 24 && max === 23) return "h24";
	if (min === 0 && max === 11) return "h11";
	if (min === 12 && max === 11) return "h12";
	throw new Error("Unexpected hour cycle result");
}
//#endregion
//#region node_modules/react-stately/dist/private/utils/useControlledState.mjs
var $1CcWn$react = await importShared("react");
var { useState: $1CcWn$useState, useRef: $1CcWn$useRef, useEffect: $1CcWn$useEffect, useReducer: $1CcWn$useReducer, useCallback: $1CcWn$useCallback } = $1CcWn$react;
var $3e6197669829fe11$var$useEarlyEffect = typeof document !== "undefined" ? $1CcWn$react["useInsertionEffect"] ?? $1CcWn$react.useLayoutEffect : () => {};
function $3e6197669829fe11$export$40bfa8c7b0832715(value, defaultValue, onChange) {
	let [stateValue, setStateValue] = $1CcWn$useState(value || defaultValue);
	let valueRef = $1CcWn$useRef(stateValue);
	let isControlledRef = $1CcWn$useRef(value !== void 0);
	let isControlled = value !== void 0;
	$1CcWn$useEffect(() => {
		isControlledRef.current;
		isControlledRef.current = isControlled;
	}, [isControlled]);
	let currentValue = isControlled ? value : stateValue;
	$3e6197669829fe11$var$useEarlyEffect(() => {
		valueRef.current = currentValue;
	});
	let [, forceUpdate] = $1CcWn$useReducer(() => ({}), {});
	return [currentValue, $1CcWn$useCallback((value, ...args) => {
		let newValue = typeof value === "function" ? value(valueRef.current) : value;
		if (!Object.is(valueRef.current, newValue)) {
			valueRef.current = newValue;
			setStateValue(newValue);
			forceUpdate();
			onChange?.(newValue, ...args);
		}
	}, [onChange])];
}
//#endregion
export { $ad063034c8620db8$export$f91e89d3d0406102 as A, $eb76cf4feb040f77$export$cd11ab140839f11d as B, $ad063034c8620db8$export$a75f2bff57811055 as C, $ad063034c8620db8$export$dbc69fd56b53d5e as D, $ad063034c8620db8$export$d0bdf45af03a6ea3 as E, $93635573935797de$export$f297eb839006d339 as F, clsx as G, $970072cf4b13fde3$export$683480f191c0e3ea as H, $09ec6a572d60460f$export$842a2cf37af977e1 as I, $390e54f620492c70$export$b4cc09c592e8fdb8 as J, $4064df0d6f9620e1$export$c9058316764c140e as K, require_shim as L, $93635573935797de$export$553d7fa8e3805fc0 as M, $93635573935797de$export$80ee6245ec4f29ec as N, $ad063034c8620db8$export$ea39ec197993aef0 as O, $93635573935797de$export$c36e0ecb2d4fa69d as P, $c4867b2f328c2698$export$e5c5a5f917a5871c as Q, $b27c684a33948c64$export$2f817fcdc4b89ae0 as R, $ad063034c8620db8$export$a5a3b454ada2268e as S, $ad063034c8620db8$export$ccc1b2479e7dd654 as T, $fe16bffc7a557bf0$export$7f54fc3180508a52 as U, $1dfb119a85e764e5$export$cc77c4ff7e8673c5 as V, $bbaa08b3cd72f041$export$9d1611c77c2fe928 as W, $c7eafbbe1ea5834e$export$535bd6ca7f90a273 as X, $390e54f620492c70$export$f680877a34711e37 as Y, $c7eafbbe1ea5834e$export$9f8ac96af4b1b2ae as Z, $ad063034c8620db8$export$5c333a116e949cdd as _, $58246871e4652552$export$588937bcd60ade55 as a, $ad063034c8620db8$export$a18c89cbd24170ff as b, $d07e34cce18680fd$export$93522d1a439f3617 as c, $d07e34cce18680fd$export$d33f79e3ffc3dc83 as d, $d07e34cce18680fd$export$d9b67bc93c097491 as f, $ad063034c8620db8$export$5841f9eb9773f25f as g, $ad063034c8620db8$export$461939dd4422153 as h, $2aaf608024c21ca1$export$99faa760c7908e4f as i, $93635573935797de$export$4475b7e617eb123c as j, $ad063034c8620db8$export$ef8b6d9133084f4e as k, $d07e34cce18680fd$export$b21e0b124e224484 as l, $ad063034c8620db8$export$42c81a444fbfb5d4 as m, $12a3c853105e5a70$export$ad991b66133851cf as n, $58246871e4652552$export$6b862160d295c8e as o, $ad063034c8620db8$export$2061056d06d7cdf7 as p, $a4e76a5424781910$export$e08e3b67e392101e as q, $2aaf608024c21ca1$export$680ea196effce5f as r, $d07e34cce18680fd$export$84c95a83c799e074 as s, $3e6197669829fe11$export$40bfa8c7b0832715 as t, $d07e34cce18680fd$export$b4a036af3fc0b032 as u, $ad063034c8620db8$export$629b0a497aa65267 as v, $ad063034c8620db8$export$aa8b41735afcabd2 as w, $ad063034c8620db8$export$a2258d9c4118825c as x, $ad063034c8620db8$export$91b62ebf2ba703ee as y, $a747a10fe70a57da$export$c17fa47878dc55b6 as z };
