//#region node_modules/tailwind-variants/dist/chunk-OYFAXDFZ.js
(function() {
	try {
		var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {};
		e.SENTRY_RELEASE = { id: "17561bda7d32de6a59c60e7229a41d6eb183b31a" };
		var n = new e.Error().stack;
		n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "aca8401c-dc99-4b8e-8f16-f555730ced60", e._sentryDebugIdIdentifier = "sentry-dbid-aca8401c-dc99-4b8e-8f16-f555730ced60");
	} catch (e) {}
})();
var isArray = Array.isArray;
var joinClassValue = (value) => {
	if (!value && value !== 0 && value !== 0n) return "";
	if (typeof value === "string") return value;
	if (typeof value === "number") {
		if (value !== value) return "";
		return "" + value;
	}
	if (typeof value === "bigint") return "" + value;
	let result = "";
	if (isArray(value)) {
		const length = value.length;
		for (let index = 0; index < length; index++) {
			const item = value[index];
			if (!item && item !== 0 && item !== 0n) continue;
			const resolved = typeof item === "string" ? item : joinClassValue(item);
			if (resolved) {
				if (result) result += " ";
				result += resolved;
			}
		}
		return result;
	}
	if (typeof value === "object") {
		for (const key in value) if (value[key]) {
			if (result) result += " ";
			result += key;
		}
	}
	return result;
};
var SPACE_REGEX = /\s+/g;
var isArray2 = Array.isArray;
var removeExtraSpaces = (str) => {
	if (typeof str !== "string" || !str) return str;
	return str.replace(SPACE_REGEX, " ").trim();
};
var stringNeedsNormalize = (str) => {
	const len = str.length;
	if (len === 0) return false;
	const first = str.charCodeAt(0);
	const last = str.charCodeAt(len - 1);
	if (first === 32 || last === 32 || first >= 9 && first <= 13 || first === 160 || last >= 9 && last <= 13 || last === 160) return true;
	for (let i = 0; i < len; i++) {
		const code = str.charCodeAt(i);
		if (code >= 9 && code <= 13 || code === 160) return true;
		if (code === 32 && i + 1 < len && str.charCodeAt(i + 1) === 32) return true;
	}
	return false;
};
var cx = (...classnames) => {
	const result = joinClassValue(classnames);
	if (!result) return void 0;
	return stringNeedsNormalize(result) ? removeExtraSpaces(result) : result;
};
var falsyToString = (value) => value === false ? "false" : value === true ? "true" : value === 0 ? "0" : value;
var isEmptyObject = (obj) => {
	if (!obj || typeof obj !== "object") return true;
	for (const _ in obj) return false;
	return true;
};
var isEqual = (obj1, obj2) => {
	if (obj1 === obj2) return true;
	if (!obj1 || !obj2) return false;
	const record1 = obj1;
	const record2 = obj2;
	const keys1 = Object.keys(record1);
	const keys2 = Object.keys(record2);
	if (keys1.length !== keys2.length) return false;
	for (let i = 0; i < keys1.length; i++) {
		const key = keys1[i];
		if (!keys2.includes(key)) return false;
		if (record1[key] !== record2[key]) return false;
	}
	return true;
};
var joinObjects = (obj1, obj2) => {
	const target = obj1;
	for (const key in obj2) if (Object.hasOwn(obj2, key)) {
		const val2 = obj2[key];
		if (key in target) target[key] = cx(target[key], val2);
		else target[key] = val2;
	}
	return obj1;
};
var flat = (arr, target) => {
	for (let i = 0; i < arr.length; i++) {
		const el = arr[i];
		if (isArray2(el)) flat(el, target);
		else if (el) target.push(el);
	}
};
var flatMergeArrays = (...arrays) => {
	const result = [];
	flat(arrays, result);
	const filtered = [];
	for (let i = 0; i < result.length; i++) if (result[i]) filtered.push(result[i]);
	return filtered;
};
var mergeObjects = (obj1, obj2) => {
	const record1 = obj1;
	const record2 = obj2;
	const result = {};
	for (const key in record1) {
		const val1 = record1[key];
		if (key in record2) {
			const val2 = record2[key];
			if (isArray2(val1) || isArray2(val2)) result[key] = flatMergeArrays(val2, val1);
			else if (typeof val1 === "object" && typeof val2 === "object" && val1 && val2) result[key] = mergeObjects(val1, val2);
			else result[key] = val2 + " " + val1;
		} else result[key] = val1;
	}
	for (const key in record2) if (!(key in record1)) result[key] = record2[key];
	return result;
};
//#endregion
//#region node_modules/tailwind-variants/dist/chunk-SUL6UUW2.js
var defaultConfig = {
	twMerge: true,
	twMergeConfig: {}
};
var VARIANT_CACHE_LIMIT = 256;
var OVERRIDE_CACHE_LIMIT = 128;
var CACHE_MISS = /* @__PURE__ */ Symbol("tv-cache-miss");
var hasClassOverride = (props) => (props == null ? void 0 : props.class) != null && props.class !== "" || (props == null ? void 0 : props.className) != null && props.className !== "";
var serializeFingerprintValue = (value) => {
	if (value === void 0) return "";
	if (value === null) return "null";
	if (typeof value === "string") return value;
	if (typeof value === "boolean") return value ? "true" : "false";
	if (typeof value === "number") return value === 0 ? "0" : String(value);
	if (typeof value === "bigint") return String(value);
	const mapped = falsyToString(value);
	const mappedType = typeof mapped;
	if (mappedType === "string" || mappedType === "number" || mappedType === "boolean" || mappedType === "bigint") return String(mapped);
	if (mappedType === "object") try {
		return JSON.stringify(mapped);
	} catch {
		return null;
	}
	return null;
};
var appendSignatureValue = (out, value) => {
	if (value === void 0) return out;
	if (value === null) return out + "null";
	const type = typeof value;
	if (type === "string" || type === "number" || type === "boolean" || type === "bigint") return out + String(value);
	if (Array.isArray(value)) return out + value.join("\0");
	try {
		return out + JSON.stringify(value);
	} catch {
		return out + "?";
	}
};
var buildPropsFingerprint = (variantKeys, defaultVariants, props, slotProps) => {
	let fingerprint = "";
	const seen = /* @__PURE__ */ Object.create(null);
	for (let i = 0; i < variantKeys.length; i++) {
		const key = variantKeys[i];
		seen[key] = 1;
		let value = defaultVariants[key];
		if (props && props[key] !== void 0) value = props[key];
		const serialized = serializeFingerprintValue(value);
		if (serialized === null) return null;
		fingerprint += key + ":" + serialized + ";";
	}
	const extras = [];
	for (const key in defaultVariants) {
		if (key === "class" || key === "className" || seen[key]) continue;
		seen[key] = 1;
		extras.push(key);
	}
	if (props) for (const key in props) {
		if (key === "class" || key === "className" || seen[key] || props[key] === void 0) continue;
		seen[key] = 1;
		extras.push(key);
	}
	if (extras.length > 1) extras.sort();
	for (let i = 0; i < extras.length; i++) {
		const key = extras[i];
		let value = defaultVariants[key];
		if (props && props[key] !== void 0) value = props[key];
		const serialized = serializeFingerprintValue(value);
		if (serialized === null) return null;
		fingerprint += key + ":" + serialized + ";";
	}
	return fingerprint;
};
var buildCompoundsSignature = (compoundVariants, compoundSlots) => {
	let signature = "";
	for (let i = 0; i < compoundVariants.length; i++) {
		const { conditionKeys, source } = compoundVariants[i];
		for (let j = 0; j < conditionKeys.length; j++) {
			const key = conditionKeys[j];
			signature += key + "=";
			signature = appendSignatureValue(signature, source[key]);
			signature += ",";
		}
		signature += "c=";
		signature = appendSignatureValue(signature, source.class);
		signature += "|cn=";
		signature = appendSignatureValue(signature, source.className);
		signature += ";";
	}
	for (let i = 0; i < compoundSlots.length; i++) {
		const { conditionKeys, source } = compoundSlots[i];
		for (let j = 0; j < conditionKeys.length; j++) {
			const key = conditionKeys[j];
			signature += key + "=";
			signature = appendSignatureValue(signature, source[key]);
			signature += ",";
		}
		if (Array.isArray(source.slots)) signature += "slots=" + source.slots.join(",") + ",";
		signature += "c=";
		signature = appendSignatureValue(signature, source.class);
		signature += "|cn=";
		signature = appendSignatureValue(signature, source.className);
		signature += ";";
	}
	return signature;
};
var createBoundedCache = (limit = VARIANT_CACHE_LIMIT) => {
	let primary = /* @__PURE__ */ new Map();
	let secondary = null;
	return {
		get(key) {
			if (primary.has(key)) return primary.get(key);
			if (secondary == null ? void 0 : secondary.has(key)) {
				const value = secondary.get(key);
				primary.set(key, value);
				return value;
			}
			return CACHE_MISS;
		},
		set(key, value) {
			if (primary.size >= limit) {
				secondary = primary;
				primary = /* @__PURE__ */ new Map();
			}
			primary.set(key, value);
		}
	};
};
var createResultCache = (limit = VARIANT_CACHE_LIMIT) => {
	const cache = createBoundedCache(limit);
	return {
		get(key) {
			return cache.get(key);
		},
		set(key, value) {
			cache.set(key, value);
		}
	};
};
var createNestedOverrideCache = (limit = OVERRIDE_CACHE_LIMIT) => {
	let primary = /* @__PURE__ */ new Map();
	let secondary = null;
	let size = 0;
	return {
		get(coreKey, overrideKey) {
			const primaryInner = primary.get(coreKey);
			if (primaryInner) {
				const value = primaryInner.get(overrideKey);
				if (value !== void 0 || primaryInner.has(overrideKey)) return value;
			}
			if (secondary) {
				const secondaryInner = secondary.get(coreKey);
				if (secondaryInner) {
					const value = secondaryInner.get(overrideKey);
					if (value !== void 0 || secondaryInner.has(overrideKey)) {
						let promoteInner = primary.get(coreKey);
						if (!promoteInner) {
							promoteInner = /* @__PURE__ */ new Map();
							primary.set(coreKey, promoteInner);
						}
						if (!promoteInner.has(overrideKey)) size++;
						promoteInner.set(overrideKey, value);
						return value;
					}
				}
			}
			return CACHE_MISS;
		},
		set(coreKey, overrideKey, value) {
			if (size >= limit) {
				secondary = primary;
				primary = /* @__PURE__ */ new Map();
				size = 0;
			}
			let inner = primary.get(coreKey);
			if (!inner) {
				inner = /* @__PURE__ */ new Map();
				primary.set(coreKey, inner);
			}
			if (!inner.has(overrideKey)) size++;
			inner.set(overrideKey, value);
		}
	};
};
var createLazyOverrideMerge = (cn, config) => {
	let cache = null;
	return (core, props) => {
		if (!hasClassOverride(props)) return core;
		const classVal = props.class;
		const classNameVal = props.className;
		if (classVal != null && classVal !== "" && typeof classVal !== "string" || classNameVal != null && classNameVal !== "" && typeof classNameVal !== "string") return cn(config, core, classVal, classNameVal);
		cache ??= createNestedOverrideCache();
		const coreKey = core ?? "";
		const overrideKey = (typeof classVal === "string" ? classVal : "") + "\0" + (typeof classNameVal === "string" ? classNameVal : "");
		const cached = cache.get(coreKey, overrideKey);
		if (cached !== CACHE_MISS) return cached;
		const merged = cn(config, core, classVal, classNameVal);
		cache.set(coreKey, overrideKey, merged);
		return merged;
	};
};
function createState() {
	let cachedTwMerge = null;
	let cachedTwMergeConfig = {};
	let didTwMergeConfigChange = false;
	return {
		get cachedTwMerge() {
			return cachedTwMerge;
		},
		set cachedTwMerge(value) {
			cachedTwMerge = value;
		},
		get cachedTwMergeConfig() {
			return cachedTwMergeConfig;
		},
		set cachedTwMergeConfig(value) {
			cachedTwMergeConfig = value;
		},
		get didTwMergeConfigChange() {
			return didTwMergeConfigChange;
		},
		set didTwMergeConfigChange(value) {
			didTwMergeConfigChange = value;
		},
		reset() {
			cachedTwMerge = null;
			cachedTwMergeConfig = {};
			didTwMergeConfigChange = false;
		}
	};
}
var state = createState();
var synchronizeTwMergeConfig = (config) => {
	if (!isEmptyObject(config.twMergeConfig) && !isEqual(config.twMergeConfig, state.cachedTwMergeConfig)) {
		state.didTwMergeConfigChange = true;
		state.cachedTwMergeConfig = config.twMergeConfig;
	}
};
var compileVariants = (variants, variantKeys) => {
	const compiledVariants = [];
	for (let i = 0; i < variantKeys.length; i++) {
		const key = variantKeys[i];
		const values = variants[key];
		compiledVariants.push({
			key,
			values,
			isEmpty: isEmptyObject(values)
		});
	}
	return compiledVariants;
};
var compileCompoundVariants = (compoundVariants) => {
	if (!Array.isArray(compoundVariants) || compoundVariants.length === 0) return [];
	const result = [];
	for (let i = 0; i < compoundVariants.length; i++) {
		const compoundVariant = compoundVariants[i];
		const conditionKeys = [];
		for (const key in compoundVariant) if (key !== "class" && key !== "className") conditionKeys.push(key);
		result.push({
			conditionKeys,
			source: compoundVariant
		});
	}
	return result;
};
var compileCompoundSlots = (compoundSlots) => {
	if (!Array.isArray(compoundSlots) || compoundSlots.length === 0) return [];
	const result = [];
	for (let i = 0; i < compoundSlots.length; i++) {
		const compoundSlot = compoundSlots[i];
		const conditionKeys = [];
		for (const key in compoundSlot) if (key !== "slots" && key !== "class" && key !== "className") conditionKeys.push(key);
		result.push({
			conditionKeys,
			source: compoundSlot
		});
	}
	return result;
};
var indexCompoundSlotsBySlot = (compiledCompoundSlots) => {
	const index = {};
	for (let i = 0; i < compiledCompoundSlots.length; i++) {
		const compoundSlot = compiledCompoundSlots[i];
		const slots = compoundSlot.source.slots;
		if (!Array.isArray(slots)) continue;
		for (let j = 0; j < slots.length; j++) {
			const slotKey = slots[j];
			if (!index[slotKey]) index[slotKey] = [];
			index[slotKey].push(compoundSlot);
		}
	}
	return index;
};
var resolveOptions = (options, configProp) => {
	const { extend = null, slots: slotProps = {}, variants: variantsProps = {}, compoundVariants: compoundVariantsProps = [], compoundSlots: compoundSlotsProps = [], defaultVariants: defaultVariantsProps = {} } = options;
	const config = {
		...defaultConfig,
		...configProp
	};
	const hasSlots = options.slots !== void 0;
	const base = (extend == null ? void 0 : extend.base) ? cx(extend.base, options == null ? void 0 : options.base) : options == null ? void 0 : options.base;
	const variants = (extend == null ? void 0 : extend.variants) && !isEmptyObject(extend.variants) ? mergeObjects(variantsProps, extend.variants) : variantsProps;
	const defaultVariants = (extend == null ? void 0 : extend.defaultVariants) && !isEmptyObject(extend.defaultVariants) ? {
		...extend.defaultVariants,
		...defaultVariantsProps
	} : defaultVariantsProps;
	synchronizeTwMergeConfig(config);
	const isExtendedSlotsEmpty = !(extend == null ? void 0 : extend.slots) || isEmptyObject(extend.slots);
	const componentBase = hasSlots ? isExtendedSlotsEmpty && (extend == null ? void 0 : extend.base) ? cx(options == null ? void 0 : options.base, extend.base) : typeof (options == null ? void 0 : options.base) === "string" || (options == null ? void 0 : options.base) == null ? options.base : cx(options.base) : void 0;
	const componentSlots = hasSlots ? {
		base: componentBase,
		...slotProps
	} : {};
	const slots = isExtendedSlotsEmpty ? componentSlots : joinObjects({ ...extend == null ? void 0 : extend.slots }, isEmptyObject(componentSlots) ? { base: options == null ? void 0 : options.base } : componentSlots);
	const compoundVariants = !(extend == null ? void 0 : extend.compoundVariants) || isEmptyObject(extend.compoundVariants) ? compoundVariantsProps : flatMergeArrays(extend == null ? void 0 : extend.compoundVariants, compoundVariantsProps);
	const compoundSlots = !(extend == null ? void 0 : extend.compoundSlots) || isEmptyObject(extend.compoundSlots) ? compoundSlotsProps : flatMergeArrays(extend == null ? void 0 : extend.compoundSlots, compoundSlotsProps);
	const variantKeys = Object.keys(variants);
	return {
		config,
		extend,
		base,
		variants,
		defaultVariants,
		slots,
		compoundVariants,
		compoundSlots,
		compiledVariants: null,
		compiledCompoundVariants: null,
		compiledCompoundSlots: null,
		compiledCompoundSlotsBySlot: null,
		deferredError: compoundVariants && !Array.isArray(compoundVariants) ? /* @__PURE__ */ new TypeError(`The "compoundVariants" prop must be an array. Received: ${typeof compoundVariants}`) : compoundSlots && !Array.isArray(compoundSlots) ? /* @__PURE__ */ new TypeError(`The "compoundSlots" prop must be an array. Received: ${typeof compoundSlots}`) : null,
		mode: hasSlots || !isExtendedSlotsEmpty ? "slots" : variantKeys.length === 0 ? "plain" : "variants",
		slotKeys: null,
		variantKeys
	};
};
var compileResolvedOptions = (resolved) => {
	if (resolved.compiledVariants !== null) return resolved;
	resolved.compiledVariants = compileVariants(resolved.variants, resolved.variantKeys);
	resolved.compiledCompoundVariants = compileCompoundVariants(resolved.compoundVariants);
	resolved.compiledCompoundSlots = compileCompoundSlots(resolved.compoundSlots);
	resolved.compiledCompoundSlotsBySlot = indexCompoundSlotsBySlot(resolved.compiledCompoundSlots);
	resolved.slotKeys = resolved.slots && typeof resolved.slots === "object" ? Object.keys(resolved.slots) : [];
	return resolved;
};
var EMPTY_ARRAY = [];
var variantClassesScratch = [];
var compoundClassesScratch = [];
var compoundVariantBySlotScratch = [];
var compoundSlotClassesScratch = [];
var getCompleteProps = (defaultVariants, props, slotProps) => {
	const result = {};
	for (const key in defaultVariants) result[key] = defaultVariants[key];
	if (props) {
		for (const key in props) if (props[key] !== void 0) result[key] = props[key];
	}
	if (slotProps) {
		for (const key in slotProps) if (slotProps[key] !== void 0) result[key] = slotProps[key];
	}
	return result;
};
var isNullishOrFalse = (value) => value == null || value === false;
var matchesCompoundValue = (expected, actual) => {
	if (!Array.isArray(expected)) return expected === actual || isNullishOrFalse(expected) && isNullishOrFalse(actual);
	for (let i = 0; i < expected.length; i++) {
		const expectedValue = expected[i];
		if (expectedValue === actual || isNullishOrFalse(expectedValue) && isNullishOrFalse(actual)) return true;
	}
	return false;
};
var getVariantValue = (variant, defaultVariants, props, slotProps) => {
	if (variant.isEmpty) return null;
	const variantProp = (slotProps == null ? void 0 : slotProps[variant.key]) ?? (props == null ? void 0 : props[variant.key]);
	if (variantProp === null) return null;
	const variantKey = falsyToString(variantProp);
	if (typeof variantKey === "object") return null;
	const defaultVariantProp = defaultVariants == null ? void 0 : defaultVariants[variant.key];
	const key = variantKey != null ? variantKey : falsyToString(defaultVariantProp);
	return variant.values[key || "false"];
};
var matchesConditions = (compound, completeProps) => {
	const { conditionKeys, source } = compound;
	for (let i = 0; i < conditionKeys.length; i++) {
		const key = conditionKeys[i];
		if (!matchesCompoundValue(source[key], completeProps[key])) return false;
	}
	return true;
};
var pushCompoundClassForSlot = (result, slotKey, classValue) => {
	if (typeof classValue === "string") {
		if (slotKey === "base") result.push(classValue);
	} else if (classValue && typeof classValue === "object" && classValue[slotKey]) result.push(classValue[slotKey]);
};
var getVariantClassNames = (variants, defaultVariants, props) => {
	const result = variantClassesScratch;
	result.length = 0;
	for (let i = 0; i < variants.length; i++) {
		const value = getVariantValue(variants[i], defaultVariants, props);
		if (value) result.push(value);
	}
	return result;
};
var getVariantClassNamesBySlot = (slotKey, variants, defaultVariants, props, slotProps) => {
	const result = variantClassesScratch;
	result.length = 0;
	for (let i = 0; i < variants.length; i++) {
		const variantValue = getVariantValue(variants[i], defaultVariants, props, slotProps);
		const value = slotKey === "base" && typeof variantValue === "string" ? variantValue : variantValue && variantValue[slotKey];
		if (value) result.push(value);
	}
	return result;
};
var getCompoundVariantClasses = (compoundVariants, completeProps) => {
	const result = compoundClassesScratch;
	result.length = 0;
	for (let i = 0; i < compoundVariants.length; i++) {
		const compoundVariant = compoundVariants[i];
		if (!matchesConditions(compoundVariant, completeProps)) continue;
		if (compoundVariant.source.class) result.push(compoundVariant.source.class);
		if (compoundVariant.source.className) result.push(compoundVariant.source.className);
	}
	return result;
};
var getCompoundVariantClassesBySlot = (slotKey, compoundVariants, completeProps) => {
	const result = compoundVariantBySlotScratch;
	result.length = 0;
	for (let i = 0; i < compoundVariants.length; i++) {
		const compoundVariant = compoundVariants[i];
		if (!matchesConditions(compoundVariant, completeProps)) continue;
		pushCompoundClassForSlot(result, slotKey, compoundVariant.source.class);
		pushCompoundClassForSlot(result, slotKey, compoundVariant.source.className);
	}
	return result;
};
var getCompoundSlotClasses = (compoundSlotsForKey, completeProps) => {
	const result = compoundSlotClassesScratch;
	result.length = 0;
	for (let i = 0; i < compoundSlotsForKey.length; i++) {
		const compoundSlot = compoundSlotsForKey[i];
		if (!matchesConditions(compoundSlot, completeProps)) continue;
		if (compoundSlot.source.class) result.push(compoundSlot.source.class);
		if (compoundSlot.source.className) result.push(compoundSlot.source.className);
	}
	return result;
};
var createPlainResolver = (resolved, cn) => {
	const { base, config } = resolved;
	let core = CACHE_MISS;
	const mergeOverride = createLazyOverrideMerge(cn, config);
	return ((props) => {
		if (core === CACHE_MISS) core = cn(config, base);
		return mergeOverride(core, props);
	});
};
var createVariantResolver = (resolved, cn) => {
	const { base, config, defaultVariants, deferredError, variantKeys } = resolved;
	let compiledCompoundVariants = resolved.compiledCompoundVariants;
	let compiledVariants = resolved.compiledVariants;
	let compiledCompoundSlots = EMPTY_ARRAY;
	let cache = null;
	const mergeOverride = createLazyOverrideMerge(cn, config);
	let coldInvokesRemaining = 1;
	const computeCore = (props) => {
		const compoundClasses = compiledCompoundVariants.length > 0 ? getCompoundVariantClasses(compiledCompoundVariants, getCompleteProps(defaultVariants, props)) : void 0;
		return cn(config, base, getVariantClassNames(compiledVariants, defaultVariants, props), compoundClasses);
	};
	return ((props) => {
		if (deferredError) throw deferredError;
		if (compiledVariants === null || compiledCompoundVariants === null) {
			compileResolvedOptions(resolved);
			compiledVariants = resolved.compiledVariants;
			compiledCompoundVariants = resolved.compiledCompoundVariants;
			compiledCompoundSlots = resolved.compiledCompoundSlots ?? EMPTY_ARRAY;
		}
		let core;
		if (coldInvokesRemaining > 0) {
			coldInvokesRemaining--;
			core = computeCore(props);
		} else {
			cache ??= createResultCache();
			const propsFingerprint = buildPropsFingerprint(variantKeys, defaultVariants, props);
			if (propsFingerprint !== null) {
				const compoundsSig = compiledCompoundVariants.length > 0 || compiledCompoundSlots.length > 0 ? buildCompoundsSignature(compiledCompoundVariants, compiledCompoundSlots) : "";
				const cacheKey = propsFingerprint + "#" + compoundsSig;
				const cached = cache.get(cacheKey);
				if (cached !== CACHE_MISS) core = cached;
				else {
					core = computeCore(props);
					cache.set(cacheKey, core);
				}
			} else core = computeCore(props);
		}
		return mergeOverride(core, props);
	});
};
var createSlotsResolver = (resolved, cn) => {
	const { config, defaultVariants, deferredError, slots, variantKeys } = resolved;
	let compoundVariants = null;
	let compoundSlots = null;
	let keys = null;
	let slotComputers = null;
	let hasCompounds = false;
	let mergeOverride = null;
	let parentCache = null;
	let coldParentInvokesRemaining = 1;
	const ensureCompiled = () => {
		if (keys !== null) return;
		if (resolved.compiledVariants === null || resolved.compiledCompoundVariants === null || resolved.compiledCompoundSlots === null || resolved.compiledCompoundSlotsBySlot === null || resolved.slotKeys === null) compileResolvedOptions(resolved);
		const variants = resolved.compiledVariants;
		compoundVariants = resolved.compiledCompoundVariants;
		compoundSlots = resolved.compiledCompoundSlots;
		const compoundSlotsBySlot = resolved.compiledCompoundSlotsBySlot;
		keys = resolved.slotKeys;
		hasCompounds = compoundVariants.length > 0 || compoundSlots.length > 0;
		mergeOverride = createLazyOverrideMerge(cn, config);
		const computers = new Array(keys.length);
		for (let i = 0; i < keys.length; i++) {
			const slotKey = keys[i];
			const compoundSlotsForKey = compoundSlotsBySlot[slotKey] ?? EMPTY_ARRAY;
			computers[i] = (propsRef, slotProps) => {
				const completeProps = hasCompounds ? getCompleteProps(defaultVariants, propsRef, slotProps) : void 0;
				const compoundVariantClasses = completeProps ? getCompoundVariantClassesBySlot(slotKey, compoundVariants, completeProps) : void 0;
				const compoundSlotClasses = completeProps ? getCompoundSlotClasses(compoundSlotsForKey, completeProps) : void 0;
				return cn(config, slots[slotKey], getVariantClassNamesBySlot(slotKey, variants, defaultVariants, propsRef, slotProps), compoundVariantClasses, compoundSlotClasses);
			};
		}
		slotComputers = computers;
	};
	const createSlotsResult = (props) => {
		const slotKeys = keys;
		const computers = slotComputers;
		const overrideMerge = mergeOverride;
		const result = {};
		for (let i = 0; i < slotKeys.length; i++) {
			const compute = computers[i];
			const core = compute(props);
			result[slotKeys[i]] = (slotProps) => {
				if (slotProps == null) return core;
				let hasVariantOverride = false;
				for (const key in slotProps) {
					if (key === "class" || key === "className") continue;
					if (slotProps[key] !== void 0) {
						hasVariantOverride = true;
						break;
					}
				}
				if (!hasVariantOverride) return overrideMerge(core, slotProps);
				return overrideMerge(compute(props, slotProps), slotProps);
			};
		}
		return result;
	};
	return ((props) => {
		if (deferredError) throw deferredError;
		ensureCompiled();
		if (coldParentInvokesRemaining > 0) {
			coldParentInvokesRemaining--;
			return createSlotsResult(props);
		}
		const propsFingerprint = buildPropsFingerprint(variantKeys, defaultVariants, props);
		if (propsFingerprint === null) return createSlotsResult(props);
		const compoundsSig = hasCompounds ? buildCompoundsSignature(compoundVariants, compoundSlots) : "";
		const cacheKey = propsFingerprint + "#" + compoundsSig;
		parentCache ??= createBoundedCache();
		const cached = parentCache.get(cacheKey);
		if (cached !== CACHE_MISS) return cached;
		const next = createSlotsResult(props);
		parentCache.set(cacheKey, next);
		return next;
	});
};
var createClassResolver = (resolved, cn) => {
	if (resolved.mode === "plain") return createPlainResolver(resolved, cn);
	let resolver;
	return ((props) => {
		resolver ??= resolved.mode === "slots" ? createSlotsResolver(resolved, cn) : createVariantResolver(resolved, cn);
		return resolver(props);
	});
};
var attachComponentMetadata = (component, resolved) => {
	component.variantKeys = resolved.variantKeys;
	component.extend = resolved.extend;
	component.base = resolved.base;
	component.slots = resolved.slots;
	component.variants = resolved.variants;
	component.defaultVariants = resolved.defaultVariants;
	component.compoundSlots = resolved.compoundSlots;
	component.compoundVariants = resolved.compoundVariants;
};
var getTailwindVariants = (cn) => {
	const tv = (options, configProp) => {
		const resolved = resolveOptions(options, configProp);
		const component = createClassResolver(resolved, cn);
		attachComponentMetadata(component, resolved);
		return component;
	};
	const createTV = (configProp) => {
		return (options, config) => tv(options, config ? mergeObjects(configProp, config) : configProp);
	};
	return {
		tv,
		createTV
	};
};
//#endregion
//#region node_modules/tailwind-variants/dist/index.js
var concatArrays = (array1, array2) => {
	const length1 = array1.length;
	const length2 = array2.length;
	const combined = new Array(length1 + length2);
	for (let i = 0; i < length1; i++) combined[i] = array1[i];
	for (let i = 0; i < length2; i++) combined[length1 + i] = array2[i];
	return combined;
};
var createClassValidatorObject = (classGroupId, validator) => ({
	classGroupId,
	validator
});
var createClassPartObject = (nextPart = /* @__PURE__ */ new Map(), validators = null, classGroupId) => ({
	nextPart,
	validators,
	classGroupId
});
var CLASS_PART_SEPARATOR = "-";
var EMPTY_CONFLICTS = [];
var ARBITRARY_PROPERTY_PREFIX = "arbitrary..";
var createClassGroupUtils = (config) => {
	const classMap = createClassMap(config);
	const { conflictingClassGroups, conflictingClassGroupModifiers } = config;
	const getClassGroupId = (className) => {
		if (className[0] === "[" && className[className.length - 1] === "]") return getGroupIdForArbitraryProperty(className);
		const classParts = className.split(CLASS_PART_SEPARATOR);
		return getGroupRecursive(classParts, classParts[0] === "" && classParts.length > 1 ? 1 : 0, classMap);
	};
	const getConflictingClassGroupIds = (classGroupId, hasPostfixModifier) => {
		if (hasPostfixModifier) {
			const modifierConflicts = conflictingClassGroupModifiers[classGroupId];
			const baseConflicts = conflictingClassGroups[classGroupId];
			if (modifierConflicts) {
				if (baseConflicts) return concatArrays(baseConflicts, modifierConflicts);
				return modifierConflicts;
			}
			return baseConflicts || EMPTY_CONFLICTS;
		}
		return conflictingClassGroups[classGroupId] || EMPTY_CONFLICTS;
	};
	return {
		getClassGroupId,
		getConflictingClassGroupIds
	};
};
var getGroupRecursive = (classParts, startIndex, classPartObject) => {
	if (classParts.length - startIndex === 0) return classPartObject.classGroupId;
	const currentClassPart = classParts[startIndex];
	const nextClassPartObject = classPartObject.nextPart.get(currentClassPart);
	if (nextClassPartObject) {
		const result = getGroupRecursive(classParts, startIndex + 1, nextClassPartObject);
		if (result) return result;
	}
	const validators = classPartObject.validators;
	if (validators === null) return;
	const classRest = startIndex === 0 ? classParts.join(CLASS_PART_SEPARATOR) : classParts.slice(startIndex).join(CLASS_PART_SEPARATOR);
	const validatorsLength = validators.length;
	for (let index = 0; index < validatorsLength; index++) {
		const validatorObject = validators[index];
		if (validatorObject.validator(classRest)) return validatorObject.classGroupId;
	}
};
var getGroupIdForArbitraryProperty = (className) => {
	const content = className.slice(1, -1);
	const colonIndex = content.indexOf(":");
	if (colonIndex === -1) return;
	const property = content.slice(0, colonIndex);
	return property ? ARBITRARY_PROPERTY_PREFIX + property : void 0;
};
var createClassMap = (config) => {
	const { theme, classGroups } = config;
	return processClassGroups(classGroups, theme);
};
var processClassGroups = (classGroups, theme) => {
	const classMap = createClassPartObject();
	for (const classGroupId in classGroups) {
		const group = classGroups[classGroupId];
		processClassesRecursively(group, classMap, classGroupId, theme);
	}
	return classMap;
};
var processClassesRecursively = (classGroup, classPartObject, classGroupId, theme) => {
	const length = classGroup.length;
	for (let index = 0; index < length; index++) {
		const classDefinition = classGroup[index];
		processClassDefinition(classDefinition, classPartObject, classGroupId, theme);
	}
};
var processClassDefinition = (classDefinition, classPartObject, classGroupId, theme) => {
	if (typeof classDefinition === "string") {
		processStringDefinition(classDefinition, classPartObject, classGroupId);
		return;
	}
	if (typeof classDefinition === "function") {
		processFunctionDefinition(classDefinition, classPartObject, classGroupId, theme);
		return;
	}
	processObjectDefinition(classDefinition, classPartObject, classGroupId, theme);
};
var processStringDefinition = (classDefinition, classPartObject, classGroupId) => {
	const classPartObjectToEdit = classDefinition === "" ? classPartObject : getPart(classPartObject, classDefinition);
	classPartObjectToEdit.classGroupId = classGroupId;
};
var processFunctionDefinition = (classDefinition, classPartObject, classGroupId, theme) => {
	if (isThemeGetter(classDefinition)) {
		processClassesRecursively(classDefinition(theme), classPartObject, classGroupId, theme);
		return;
	}
	if (classPartObject.validators === null) classPartObject.validators = [];
	classPartObject.validators.push(createClassValidatorObject(classGroupId, classDefinition));
};
var processObjectDefinition = (classDefinition, classPartObject, classGroupId, theme) => {
	const entries = Object.entries(classDefinition);
	const length = entries.length;
	for (let index = 0; index < length; index++) {
		const [key, value] = entries[index];
		processClassesRecursively(value, getPart(classPartObject, key), classGroupId, theme);
	}
};
var getPart = (classPartObject, path) => {
	let current = classPartObject;
	const parts = path.split(CLASS_PART_SEPARATOR);
	const length = parts.length;
	for (let index = 0; index < length; index++) {
		const part = parts[index];
		let next = current.nextPart.get(part);
		if (!next) {
			next = createClassPartObject();
			current.nextPart.set(part, next);
		}
		current = next;
	}
	return current;
};
var isThemeGetter = (classDefinition) => "isThemeGetter" in classDefinition && classDefinition.isThemeGetter === true;
var IMPORTANT_MODIFIER = "!";
var CHAR_MODIFIER_SEPARATOR = 58;
var CHAR_POSTFIX_SEPARATOR = 47;
var CHAR_OPEN_BRACKET = 91;
var CHAR_CLOSE_BRACKET = 93;
var CHAR_OPEN_PAREN = 40;
var CHAR_CLOSE_PAREN = 41;
var CHAR_IMPORTANT = 33;
var createResultObject = (modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition) => ({
	modifiers,
	hasImportantModifier,
	baseClassName,
	maybePostfixModifierPosition,
	isExternal: void 0
});
var parseClassName = (className) => {
	const modifiers = [];
	let bracketDepth = 0;
	let parenDepth = 0;
	let modifierStart = 0;
	let postfixModifierPosition;
	const len = className.length;
	for (let index = 0; index < len; index++) {
		const charCode = className.charCodeAt(index);
		if (bracketDepth === 0 && parenDepth === 0) {
			if (charCode === CHAR_MODIFIER_SEPARATOR) {
				modifiers.push(className.slice(modifierStart, index));
				modifierStart = index + 1;
				continue;
			}
			if (charCode === CHAR_POSTFIX_SEPARATOR) {
				postfixModifierPosition = index;
				continue;
			}
		}
		if (charCode === CHAR_OPEN_BRACKET) bracketDepth++;
		else if (charCode === CHAR_CLOSE_BRACKET) bracketDepth--;
		else if (charCode === CHAR_OPEN_PAREN) parenDepth++;
		else if (charCode === CHAR_CLOSE_PAREN) parenDepth--;
	}
	const baseClassNameWithImportantModifier = modifiers.length === 0 ? className : className.slice(modifierStart);
	let baseClassName = baseClassNameWithImportantModifier;
	let hasImportantModifier = false;
	const lastIndex = baseClassNameWithImportantModifier.length - 1;
	if (baseClassNameWithImportantModifier.charCodeAt(lastIndex) === CHAR_IMPORTANT) {
		baseClassName = baseClassNameWithImportantModifier.slice(0, -1);
		hasImportantModifier = true;
	} else if (baseClassNameWithImportantModifier.charCodeAt(0) === CHAR_IMPORTANT) {
		baseClassName = baseClassNameWithImportantModifier.slice(1);
		hasImportantModifier = true;
	}
	const maybePostfixModifierPosition = postfixModifierPosition && postfixModifierPosition > modifierStart ? postfixModifierPosition - modifierStart : void 0;
	return createResultObject(modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition);
};
var createSortModifiers = (config) => {
	const orderSensitiveModifiers = new Set(config.orderSensitiveModifiers);
	return (modifiers) => {
		const result = [];
		let currentSegment = [];
		for (let index = 0; index < modifiers.length; index++) {
			const modifier = modifiers[index];
			const isArbitrary = modifier[0] === "[";
			const isOrderSensitive = orderSensitiveModifiers.has(modifier);
			if (isArbitrary || isOrderSensitive) {
				if (currentSegment.length > 0) {
					currentSegment.sort();
					for (let segmentIndex = 0; segmentIndex < currentSegment.length; segmentIndex++) result.push(currentSegment[segmentIndex]);
					currentSegment = [];
				}
				result.push(modifier);
			} else currentSegment.push(modifier);
		}
		if (currentSegment.length > 0) {
			currentSegment.sort();
			for (let segmentIndex = 0; segmentIndex < currentSegment.length; segmentIndex++) result.push(currentSegment[segmentIndex]);
		}
		return result;
	};
};
var EXTERNAL_DESCRIPTOR = {
	isExternal: true,
	classId: -1,
	conflictIds: []
};
var DESCRIPTOR_CACHE_SIZE = 4096;
var MAX_CONFLICT_KEYS = 16384;
var createConfigUtils = (config) => {
	const sortModifiers = createSortModifiers(config);
	const postfixLookupClassGroupIds = createPostfixLookupClassGroupIds(config);
	const { getClassGroupId, getConflictingClassGroupIds } = createClassGroupUtils(config);
	let descriptorCache = /* @__PURE__ */ Object.create(null);
	let previousDescriptorCache = /* @__PURE__ */ Object.create(null);
	let descriptorCacheSize = 0;
	let claimedGeneration = /* @__PURE__ */ new Int32Array(256);
	let currentGeneration = 0;
	let keepFlags = /* @__PURE__ */ new Uint8Array(64);
	let splitSawNonSpaceWhitespace = false;
	const splitClassList = (classList) => {
		const tokens = [];
		const length = classList.length;
		let tokenStart = -1;
		splitSawNonSpaceWhitespace = false;
		for (let index = 0; index < length; index++) {
			const charCode = classList.charCodeAt(index);
			if (charCode === 32) {
				if (tokenStart !== -1) {
					tokens.push(classList.slice(tokenStart, index));
					tokenStart = -1;
				}
			} else if (charCode >= 9 && charCode <= 13) {
				splitSawNonSpaceWhitespace = true;
				if (tokenStart !== -1) {
					tokens.push(classList.slice(tokenStart, index));
					tokenStart = -1;
				}
			} else if (tokenStart === -1) tokenStart = index;
		}
		if (tokenStart !== -1) tokens.push(classList.slice(tokenStart));
		return tokens;
	};
	const conflictKeyIds = /* @__PURE__ */ new Map();
	let nextConflictKeyId = 0;
	const internConflictKey = (conflictKey) => {
		let id = conflictKeyIds.get(conflictKey);
		if (id === void 0) {
			id = nextConflictKeyId++;
			conflictKeyIds.set(conflictKey, id);
			if (id >= claimedGeneration.length) {
				const grown = new Int32Array(claimedGeneration.length * 2);
				grown.set(claimedGeneration);
				claimedGeneration = grown;
			}
		}
		return id;
	};
	const computeClassDescriptor = (originalClassName) => {
		const { isExternal, modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition } = parseClassName(originalClassName);
		if (isExternal) return EXTERNAL_DESCRIPTOR;
		let hasPostfixModifier = Boolean(maybePostfixModifierPosition);
		let classGroupId;
		if (hasPostfixModifier) {
			const baseClassNameWithoutPostfix = baseClassName.substring(0, maybePostfixModifierPosition);
			classGroupId = getClassGroupId(baseClassNameWithoutPostfix);
			const classGroupIdWithPostfix = classGroupId && postfixLookupClassGroupIds[classGroupId] ? getClassGroupId(baseClassName) : void 0;
			if (classGroupIdWithPostfix && classGroupIdWithPostfix !== classGroupId) {
				classGroupId = classGroupIdWithPostfix;
				hasPostfixModifier = false;
			}
		} else classGroupId = getClassGroupId(baseClassName);
		if (!classGroupId) {
			if (!hasPostfixModifier) return EXTERNAL_DESCRIPTOR;
			classGroupId = getClassGroupId(baseClassName);
			if (!classGroupId) return EXTERNAL_DESCRIPTOR;
			hasPostfixModifier = false;
		}
		const variantModifier = modifiers.length === 0 ? "" : modifiers.length === 1 ? modifiers[0] : sortModifiers(modifiers).join(":");
		const modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier;
		const conflictGroups = getConflictingClassGroupIds(classGroupId, hasPostfixModifier);
		const conflictIds = [];
		for (let index = 0; index < conflictGroups.length; index++) conflictIds.push(internConflictKey(modifierId + conflictGroups[index]));
		return {
			isExternal: false,
			classId: internConflictKey(modifierId + classGroupId),
			conflictIds
		};
	};
	const getClassDescriptor = (originalClassName) => {
		let descriptor = descriptorCache[originalClassName];
		if (descriptor !== void 0) return descriptor;
		descriptor = previousDescriptorCache[originalClassName];
		if (descriptor === void 0) descriptor = computeClassDescriptor(originalClassName);
		descriptorCache[originalClassName] = descriptor;
		if (++descriptorCacheSize > DESCRIPTOR_CACHE_SIZE) {
			descriptorCacheSize = 0;
			previousDescriptorCache = descriptorCache;
			descriptorCache = /* @__PURE__ */ Object.create(null);
		}
		return descriptor;
	};
	const mergeClassList = (classList) => {
		const classNames = splitClassList(classList);
		const classCount = classNames.length;
		if (classCount === 1) return classNames[0];
		if (nextConflictKeyId > MAX_CONFLICT_KEYS) {
			conflictKeyIds.clear();
			nextConflictKeyId = 0;
			descriptorCache = /* @__PURE__ */ Object.create(null);
			previousDescriptorCache = /* @__PURE__ */ Object.create(null);
			descriptorCacheSize = 0;
		}
		currentGeneration = currentGeneration + 1 | 0;
		if (currentGeneration === 0) currentGeneration = 1;
		const generation = currentGeneration;
		if (classCount > keepFlags.length) {
			let capacity = keepFlags.length;
			while (capacity < classCount) capacity *= 2;
			keepFlags = new Uint8Array(capacity);
		}
		let didDrop = false;
		let tokenCharCount = 0;
		for (let index = classCount - 1; index >= 0; index -= 1) {
			const className = classNames[index];
			tokenCharCount += className.length;
			const descriptor = getClassDescriptor(className);
			if (descriptor.isExternal) {
				keepFlags[index] = 1;
				continue;
			}
			const classId = descriptor.classId;
			if (claimedGeneration[classId] === generation) {
				keepFlags[index] = 0;
				didDrop = true;
				continue;
			}
			claimedGeneration[classId] = generation;
			const conflictIds = descriptor.conflictIds;
			for (let conflictIndex = 0; conflictIndex < conflictIds.length; conflictIndex++) claimedGeneration[conflictIds[conflictIndex]] = generation;
			keepFlags[index] = 1;
		}
		if (!didDrop && !splitSawNonSpaceWhitespace && classList.length === tokenCharCount + classCount - 1) return classList;
		let result = "";
		for (let index = 0; index < classCount; index++) if (keepFlags[index] === 1) {
			if (result) result += " ";
			result += classNames[index];
		}
		return result;
	};
	return {
		parseClassName,
		sortModifiers,
		postfixLookupClassGroupIds,
		getClassGroupId,
		getConflictingClassGroupIds,
		getClassDescriptor,
		mergeClassList
	};
};
var createPostfixLookupClassGroupIds = (config) => {
	const lookup = /* @__PURE__ */ Object.create(null);
	const classGroupIds = config.postfixLookupClassGroups;
	if (classGroupIds) for (let index = 0; index < classGroupIds.length; index++) lookup[classGroupIds[index]] = true;
	return lookup;
};
var MERGE_CACHE_SIZE = 500;
var createTailwindMerge = (createConfig) => {
	let configUtils;
	let mergeClassList;
	let cache = /* @__PURE__ */ Object.create(null);
	let previousCache = /* @__PURE__ */ Object.create(null);
	let cacheSize = 0;
	const initTailwindMerge = (classList) => {
		configUtils = createConfigUtils(createConfig());
		mergeClassList = configUtils.mergeClassList;
		merge.mergeString = tailwindMerge;
		return tailwindMerge(classList);
	};
	const tailwindMerge = (classList) => {
		let result = cache[classList];
		if (result !== void 0) return result;
		result = previousCache[classList];
		if (result === void 0) result = mergeClassList(classList);
		cache[classList] = result;
		if (++cacheSize > MERGE_CACHE_SIZE) {
			cacheSize = 0;
			previousCache = cache;
			cache = /* @__PURE__ */ Object.create(null);
		}
		return result;
	};
	const merge = (...args) => merge.mergeString(joinClassValue(args));
	merge.mergeString = initTailwindMerge;
	return merge;
};
var fallbackThemeArr = [];
var fromTheme = (key) => {
	const themeGetter = (theme) => theme[key] || fallbackThemeArr;
	themeGetter.isThemeGetter = true;
	return themeGetter;
};
var arbitraryValueRegex = /^\[(?:(\w[\w-]*):)?(.+)\]$/i;
var arbitraryVariableRegex = /^\((?:(\w[\w-]*):)?(.+)\)$/i;
var fractionRegex = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/;
var tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
var lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
var colorFunctionRegex = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/;
var shadowRegex = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
var imageRegex = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
var toNumber = Number;
var numberIsNaN = Number.isNaN;
var numberIsInteger = Number.isInteger;
var isFraction = (value) => fractionRegex.test(value);
var isNumber = (value) => Boolean(value) && !numberIsNaN(toNumber(value));
var isInteger = (value) => Boolean(value) && numberIsInteger(toNumber(value));
var isPercent = (value) => value.endsWith("%") && isNumber(value.slice(0, -1));
var isTshirtSize = (value) => tshirtUnitRegex.test(value);
var isAny = () => true;
var isLengthOnly = (value) => lengthUnitRegex.test(value) && !colorFunctionRegex.test(value);
var isNever = () => false;
var isShadow = (value) => shadowRegex.test(value);
var isImage = (value) => imageRegex.test(value);
var isAnyNonArbitrary = (value) => !isArbitraryValue(value) && !isArbitraryVariable(value);
var isNamedContainerQuery = (value) => value.startsWith("@container") && (value[10] === "/" && value[11] !== void 0 || value[11] === "s" && value[16] !== void 0 && value.startsWith("-size/", 10) || value[11] === "n" && value[18] !== void 0 && value.startsWith("-normal/", 10));
var isArbitrarySize = (value) => getIsArbitraryValue(value, isLabelSize, isNever);
var isArbitraryValue = (value) => arbitraryValueRegex.test(value);
var isArbitraryLength = (value) => getIsArbitraryValue(value, isLabelLength, isLengthOnly);
var isArbitraryNumber = (value) => getIsArbitraryValue(value, isLabelNumber, isNumber);
var isArbitraryWeight = (value) => getIsArbitraryValue(value, isLabelWeight, isAny);
var isArbitraryFamilyName = (value) => getIsArbitraryValue(value, isLabelFamilyName, isNever);
var isArbitraryPosition = (value) => getIsArbitraryValue(value, isLabelPosition, isNever);
var isArbitraryImage = (value) => getIsArbitraryValue(value, isLabelImage, isImage);
var isArbitraryShadow = (value) => getIsArbitraryValue(value, isLabelShadow, isShadow);
var isArbitraryVariable = (value) => arbitraryVariableRegex.test(value);
var isArbitraryVariableLength = (value) => getIsArbitraryVariable(value, isLabelLength);
var isArbitraryVariableFamilyName = (value) => getIsArbitraryVariable(value, isLabelFamilyName);
var isArbitraryVariablePosition = (value) => getIsArbitraryVariable(value, isLabelPosition);
var isArbitraryVariableSize = (value) => getIsArbitraryVariable(value, isLabelSize);
var isArbitraryVariableImage = (value) => getIsArbitraryVariable(value, isLabelImage);
var isArbitraryVariableShadow = (value) => getIsArbitraryVariable(value, isLabelShadow, true);
var isArbitraryVariableWeight = (value) => getIsArbitraryVariable(value, isLabelWeight, true);
var getIsArbitraryValue = (value, testLabel, testValue) => {
	const result = arbitraryValueRegex.exec(value);
	if (result) {
		if (result[1]) return testLabel(result[1]);
		return testValue(result[2]);
	}
	return false;
};
var getIsArbitraryVariable = (value, testLabel, shouldMatchNoLabel = false) => {
	const result = arbitraryVariableRegex.exec(value);
	if (result) {
		if (result[1]) return testLabel(result[1]);
		return shouldMatchNoLabel;
	}
	return false;
};
var isLabelPosition = (label) => label === "position" || label === "percentage";
var isLabelImage = (label) => label === "image" || label === "url";
var isLabelSize = (label) => label === "length" || label === "size" || label === "bg-size";
var isLabelLength = (label) => label === "length";
var isLabelNumber = (label) => label === "number";
var isLabelFamilyName = (label) => label === "family-name";
var isLabelWeight = (label) => label === "number" || label === "weight";
var isLabelShadow = (label) => label === "shadow";
var getDefaultConfig = () => {
	const themeColor = fromTheme("color");
	const themeFont = fromTheme("font");
	const themeText = fromTheme("text");
	const themeFontWeight = fromTheme("font-weight");
	const themeTracking = fromTheme("tracking");
	const themeLeading = fromTheme("leading");
	const themeBreakpoint = fromTheme("breakpoint");
	const themeContainer = fromTheme("container");
	const themeSpacing = fromTheme("spacing");
	const themeRadius = fromTheme("radius");
	const themeShadow = fromTheme("shadow");
	const themeInsetShadow = fromTheme("inset-shadow");
	const themeTextShadow = fromTheme("text-shadow");
	const themeDropShadow = fromTheme("drop-shadow");
	const themeBlur = fromTheme("blur");
	const themePerspective = fromTheme("perspective");
	const themeAspect = fromTheme("aspect");
	const themeEase = fromTheme("ease");
	const themeAnimate = fromTheme("animate");
	const scaleBreak = () => [
		"auto",
		"avoid",
		"all",
		"avoid-page",
		"page",
		"left",
		"right",
		"column"
	];
	const scalePosition = () => [
		"center",
		"top",
		"bottom",
		"left",
		"right",
		"top-left",
		"left-top",
		"top-right",
		"right-top",
		"bottom-right",
		"right-bottom",
		"bottom-left",
		"left-bottom"
	];
	const scalePositionWithArbitrary = () => [
		...scalePosition(),
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleOverflow = () => [
		"auto",
		"hidden",
		"clip",
		"visible",
		"scroll"
	];
	const scaleOverscroll = () => [
		"auto",
		"contain",
		"none"
	];
	const scaleUnambiguousSpacing = () => [
		isArbitraryVariable,
		isArbitraryValue,
		themeSpacing
	];
	const scaleInset = () => [
		isFraction,
		"full",
		"auto",
		...scaleUnambiguousSpacing()
	];
	const scaleGridTemplateColsRows = () => [
		isInteger,
		"none",
		"subgrid",
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleGridColRowStartAndEnd = () => [
		"auto",
		{ span: [
			"full",
			isInteger,
			isArbitraryVariable,
			isArbitraryValue
		] },
		isInteger,
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleGridColRowStartOrEnd = () => [
		isInteger,
		"auto",
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleGridAutoColsRows = () => [
		"auto",
		"min",
		"max",
		"fr",
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleAlignPrimaryAxis = () => [
		"start",
		"end",
		"center",
		"between",
		"around",
		"evenly",
		"stretch",
		"baseline",
		"center-safe",
		"end-safe"
	];
	const scaleAlignSecondaryAxis = () => [
		"start",
		"end",
		"center",
		"stretch",
		"center-safe",
		"end-safe"
	];
	const scaleMargin = () => ["auto", ...scaleUnambiguousSpacing()];
	const scaleSizing = () => [
		isFraction,
		"auto",
		"full",
		"dvw",
		"dvh",
		"lvw",
		"lvh",
		"svw",
		"svh",
		"min",
		"max",
		"fit",
		...scaleUnambiguousSpacing()
	];
	const scaleSizingInline = () => [
		isFraction,
		"screen",
		"full",
		"dvw",
		"lvw",
		"svw",
		"min",
		"max",
		"fit",
		...scaleUnambiguousSpacing()
	];
	const scaleSizingBlock = () => [
		isFraction,
		"screen",
		"full",
		"lh",
		"dvh",
		"lvh",
		"svh",
		"min",
		"max",
		"fit",
		...scaleUnambiguousSpacing()
	];
	const scaleColor = () => [
		themeColor,
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleBgPosition = () => [
		...scalePosition(),
		isArbitraryVariablePosition,
		isArbitraryPosition,
		{ position: [isArbitraryVariable, isArbitraryValue] }
	];
	const scaleBgRepeat = () => ["no-repeat", { repeat: [
		"",
		"x",
		"y",
		"space",
		"round"
	] }];
	const scaleBgSize = () => [
		"auto",
		"cover",
		"contain",
		isArbitraryVariableSize,
		isArbitrarySize,
		{ size: [isArbitraryVariable, isArbitraryValue] }
	];
	const scaleGradientStopPosition = () => [
		isPercent,
		isArbitraryVariableLength,
		isArbitraryLength
	];
	const scaleRadius = () => [
		"",
		"none",
		"full",
		themeRadius,
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleBorderWidth = () => [
		"",
		isNumber,
		isArbitraryVariableLength,
		isArbitraryLength
	];
	const scaleLineStyle = () => [
		"solid",
		"dashed",
		"dotted",
		"double"
	];
	const scaleBlendMode = () => [
		"normal",
		"multiply",
		"screen",
		"overlay",
		"darken",
		"lighten",
		"color-dodge",
		"color-burn",
		"hard-light",
		"soft-light",
		"difference",
		"exclusion",
		"hue",
		"saturation",
		"color",
		"luminosity"
	];
	const scaleMaskImagePosition = () => [
		isNumber,
		isPercent,
		isArbitraryVariablePosition,
		isArbitraryPosition
	];
	const scaleBlur = () => [
		"",
		"none",
		themeBlur,
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleRotate = () => [
		"none",
		isNumber,
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleScale = () => [
		"none",
		isNumber,
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleSkew = () => [
		isNumber,
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleTranslate = () => [
		isFraction,
		"full",
		...scaleUnambiguousSpacing()
	];
	return {
		theme: {
			animate: [
				"spin",
				"ping",
				"pulse",
				"bounce"
			],
			aspect: ["video"],
			blur: [isTshirtSize],
			breakpoint: [isTshirtSize],
			color: [isAny],
			container: [isTshirtSize],
			"drop-shadow": [isTshirtSize],
			ease: [
				"in",
				"out",
				"in-out"
			],
			font: [isAnyNonArbitrary],
			"font-weight": [
				"thin",
				"extralight",
				"light",
				"normal",
				"medium",
				"semibold",
				"bold",
				"extrabold",
				"black"
			],
			"inset-shadow": [isTshirtSize],
			leading: [
				"none",
				"tight",
				"snug",
				"normal",
				"relaxed",
				"loose"
			],
			perspective: [
				"dramatic",
				"near",
				"normal",
				"midrange",
				"distant",
				"none"
			],
			radius: [isTshirtSize],
			shadow: [isTshirtSize],
			spacing: ["px", isNumber],
			text: [isTshirtSize],
			"text-shadow": [isTshirtSize],
			tracking: [
				"tighter",
				"tight",
				"normal",
				"wide",
				"wider",
				"widest"
			]
		},
		classGroups: {
			/**
			* Aspect Ratio
			* @see https://tailwindcss.com/docs/aspect-ratio
			*/
			aspect: [{ aspect: [
				"auto",
				"square",
				isFraction,
				isArbitraryValue,
				isArbitraryVariable,
				themeAspect
			] }],
			/**
			* Container
			* @see https://tailwindcss.com/docs/container
			* @deprecated since Tailwind CSS v4.0.0
			*/
			container: ["container"],
			/**
			* Container Type
			* @see https://tailwindcss.com/docs/responsive-design#container-queries
			*/
			"container-type": [{ "@container": [
				"",
				"normal",
				"size",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Container Name
			* @see https://tailwindcss.com/docs/responsive-design#named-containers
			*/
			"container-named": [isNamedContainerQuery],
			/**
			* Columns
			* @see https://tailwindcss.com/docs/columns
			*/
			columns: [{ columns: [
				isNumber,
				isArbitraryValue,
				isArbitraryVariable,
				themeContainer
			] }],
			/**
			* Break After
			* @see https://tailwindcss.com/docs/break-after
			*/
			"break-after": [{ "break-after": scaleBreak() }],
			/**
			* Break Before
			* @see https://tailwindcss.com/docs/break-before
			*/
			"break-before": [{ "break-before": scaleBreak() }],
			/**
			* Break Inside
			* @see https://tailwindcss.com/docs/break-inside
			*/
			"break-inside": [{ "break-inside": [
				"auto",
				"avoid",
				"avoid-page",
				"avoid-column"
			] }],
			/**
			* Box Decoration Break
			* @see https://tailwindcss.com/docs/box-decoration-break
			*/
			"box-decoration": [{ "box-decoration": ["slice", "clone"] }],
			/**
			* Box Sizing
			* @see https://tailwindcss.com/docs/box-sizing
			*/
			box: [{ box: ["border", "content"] }],
			/**
			* Display
			* @see https://tailwindcss.com/docs/display
			*/
			display: [
				"block",
				"inline-block",
				"inline",
				"flex",
				"inline-flex",
				"table",
				"inline-table",
				"table-caption",
				"table-cell",
				"table-column",
				"table-column-group",
				"table-footer-group",
				"table-header-group",
				"table-row-group",
				"table-row",
				"flow-root",
				"grid",
				"inline-grid",
				"contents",
				"list-item",
				"hidden"
			],
			/**
			* Screen Reader Only
			* @see https://tailwindcss.com/docs/display#screen-reader-only
			*/
			sr: ["sr-only", "not-sr-only"],
			/**
			* Floats
			* @see https://tailwindcss.com/docs/float
			*/
			float: [{ float: [
				"right",
				"left",
				"none",
				"start",
				"end"
			] }],
			/**
			* Clear
			* @see https://tailwindcss.com/docs/clear
			*/
			clear: [{ clear: [
				"left",
				"right",
				"both",
				"none",
				"start",
				"end"
			] }],
			/**
			* Isolation
			* @see https://tailwindcss.com/docs/isolation
			*/
			isolation: ["isolate", "isolation-auto"],
			/**
			* Object Fit
			* @see https://tailwindcss.com/docs/object-fit
			*/
			"object-fit": [{ object: [
				"contain",
				"cover",
				"fill",
				"none",
				"scale-down"
			] }],
			/**
			* Object Position
			* @see https://tailwindcss.com/docs/object-position
			*/
			"object-position": [{ object: scalePositionWithArbitrary() }],
			/**
			* Overflow
			* @see https://tailwindcss.com/docs/overflow
			*/
			overflow: [{ overflow: scaleOverflow() }],
			/**
			* Overflow X
			* @see https://tailwindcss.com/docs/overflow
			*/
			"overflow-x": [{ "overflow-x": scaleOverflow() }],
			/**
			* Overflow Y
			* @see https://tailwindcss.com/docs/overflow
			*/
			"overflow-y": [{ "overflow-y": scaleOverflow() }],
			/**
			* Overscroll Behavior
			* @see https://tailwindcss.com/docs/overscroll-behavior
			*/
			overscroll: [{ overscroll: scaleOverscroll() }],
			/**
			* Overscroll Behavior X
			* @see https://tailwindcss.com/docs/overscroll-behavior
			*/
			"overscroll-x": [{ "overscroll-x": scaleOverscroll() }],
			/**
			* Overscroll Behavior Y
			* @see https://tailwindcss.com/docs/overscroll-behavior
			*/
			"overscroll-y": [{ "overscroll-y": scaleOverscroll() }],
			/**
			* Position
			* @see https://tailwindcss.com/docs/position
			*/
			position: [
				"static",
				"fixed",
				"absolute",
				"relative",
				"sticky"
			],
			/**
			* Inset
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			*/
			inset: [{ inset: scaleInset() }],
			/**
			* Inset Inline
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			*/
			"inset-x": [{ "inset-x": scaleInset() }],
			/**
			* Inset Block
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			*/
			"inset-y": [{ "inset-y": scaleInset() }],
			/**
			* Inset Inline Start
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			* @todo class group will be renamed to `inset-s` in next major release
			*/
			start: [{
				"inset-s": scaleInset(),
				/**
				* @deprecated since Tailwind CSS v4.2.0 in favor of `inset-s-*` utilities.
				* @see https://github.com/tailwindlabs/tailwindcss/pull/19613
				*/
				start: scaleInset()
			}],
			/**
			* Inset Inline End
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			* @todo class group will be renamed to `inset-e` in next major release
			*/
			end: [{
				"inset-e": scaleInset(),
				/**
				* @deprecated since Tailwind CSS v4.2.0 in favor of `inset-e-*` utilities.
				* @see https://github.com/tailwindlabs/tailwindcss/pull/19613
				*/
				end: scaleInset()
			}],
			/**
			* Inset Block Start
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			*/
			"inset-bs": [{ "inset-bs": scaleInset() }],
			/**
			* Inset Block End
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			*/
			"inset-be": [{ "inset-be": scaleInset() }],
			/**
			* Top
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			*/
			top: [{ top: scaleInset() }],
			/**
			* Right
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			*/
			right: [{ right: scaleInset() }],
			/**
			* Bottom
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			*/
			bottom: [{ bottom: scaleInset() }],
			/**
			* Left
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			*/
			left: [{ left: scaleInset() }],
			/**
			* Visibility
			* @see https://tailwindcss.com/docs/visibility
			*/
			visibility: [
				"visible",
				"invisible",
				"collapse"
			],
			/**
			* Z-Index
			* @see https://tailwindcss.com/docs/z-index
			*/
			z: [{ z: [
				isInteger,
				"auto",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Flex Basis
			* @see https://tailwindcss.com/docs/flex-basis
			*/
			basis: [{ basis: [
				isFraction,
				"full",
				"auto",
				themeContainer,
				...scaleUnambiguousSpacing()
			] }],
			/**
			* Flex Direction
			* @see https://tailwindcss.com/docs/flex-direction
			*/
			"flex-direction": [{ flex: [
				"row",
				"row-reverse",
				"col",
				"col-reverse"
			] }],
			/**
			* Flex Wrap
			* @see https://tailwindcss.com/docs/flex-wrap
			*/
			"flex-wrap": [{ flex: [
				"nowrap",
				"wrap",
				"wrap-reverse"
			] }],
			/**
			* Flex
			* @see https://tailwindcss.com/docs/flex
			*/
			flex: [{ flex: [
				isNumber,
				isFraction,
				"auto",
				"initial",
				"none",
				isArbitraryValue
			] }],
			/**
			* Flex Grow
			* @see https://tailwindcss.com/docs/flex-grow
			*/
			grow: [{ grow: [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Flex Shrink
			* @see https://tailwindcss.com/docs/flex-shrink
			*/
			shrink: [{ shrink: [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Order
			* @see https://tailwindcss.com/docs/order
			*/
			order: [{ order: [
				isInteger,
				"first",
				"last",
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Grid Template Columns
			* @see https://tailwindcss.com/docs/grid-template-columns
			*/
			"grid-cols": [{ "grid-cols": scaleGridTemplateColsRows() }],
			/**
			* Grid Column Start / End
			* @see https://tailwindcss.com/docs/grid-column
			*/
			"col-start-end": [{ col: scaleGridColRowStartAndEnd() }],
			/**
			* Grid Column Start
			* @see https://tailwindcss.com/docs/grid-column
			*/
			"col-start": [{ "col-start": scaleGridColRowStartOrEnd() }],
			/**
			* Grid Column End
			* @see https://tailwindcss.com/docs/grid-column
			*/
			"col-end": [{ "col-end": scaleGridColRowStartOrEnd() }],
			/**
			* Grid Template Rows
			* @see https://tailwindcss.com/docs/grid-template-rows
			*/
			"grid-rows": [{ "grid-rows": scaleGridTemplateColsRows() }],
			/**
			* Grid Row Start / End
			* @see https://tailwindcss.com/docs/grid-row
			*/
			"row-start-end": [{ row: scaleGridColRowStartAndEnd() }],
			/**
			* Grid Row Start
			* @see https://tailwindcss.com/docs/grid-row
			*/
			"row-start": [{ "row-start": scaleGridColRowStartOrEnd() }],
			/**
			* Grid Row End
			* @see https://tailwindcss.com/docs/grid-row
			*/
			"row-end": [{ "row-end": scaleGridColRowStartOrEnd() }],
			/**
			* Grid Auto Flow
			* @see https://tailwindcss.com/docs/grid-auto-flow
			*/
			"grid-flow": [{ "grid-flow": [
				"row",
				"col",
				"dense",
				"row-dense",
				"col-dense"
			] }],
			/**
			* Grid Auto Columns
			* @see https://tailwindcss.com/docs/grid-auto-columns
			*/
			"auto-cols": [{ "auto-cols": scaleGridAutoColsRows() }],
			/**
			* Grid Auto Rows
			* @see https://tailwindcss.com/docs/grid-auto-rows
			*/
			"auto-rows": [{ "auto-rows": scaleGridAutoColsRows() }],
			/**
			* Gap
			* @see https://tailwindcss.com/docs/gap
			*/
			gap: [{ gap: scaleUnambiguousSpacing() }],
			/**
			* Gap X
			* @see https://tailwindcss.com/docs/gap
			*/
			"gap-x": [{ "gap-x": scaleUnambiguousSpacing() }],
			/**
			* Gap Y
			* @see https://tailwindcss.com/docs/gap
			*/
			"gap-y": [{ "gap-y": scaleUnambiguousSpacing() }],
			/**
			* Justify Content
			* @see https://tailwindcss.com/docs/justify-content
			*/
			"justify-content": [{ justify: [...scaleAlignPrimaryAxis(), "normal"] }],
			/**
			* Justify Items
			* @see https://tailwindcss.com/docs/justify-items
			*/
			"justify-items": [{ "justify-items": [...scaleAlignSecondaryAxis(), "normal"] }],
			/**
			* Justify Self
			* @see https://tailwindcss.com/docs/justify-self
			*/
			"justify-self": [{ "justify-self": ["auto", ...scaleAlignSecondaryAxis()] }],
			/**
			* Align Content
			* @see https://tailwindcss.com/docs/align-content
			*/
			"align-content": [{ content: ["normal", ...scaleAlignPrimaryAxis()] }],
			/**
			* Align Items
			* @see https://tailwindcss.com/docs/align-items
			*/
			"align-items": [{ items: [...scaleAlignSecondaryAxis(), { baseline: ["", "last"] }] }],
			/**
			* Align Self
			* @see https://tailwindcss.com/docs/align-self
			*/
			"align-self": [{ self: [
				"auto",
				...scaleAlignSecondaryAxis(),
				{ baseline: ["", "last"] }
			] }],
			/**
			* Place Content
			* @see https://tailwindcss.com/docs/place-content
			*/
			"place-content": [{ "place-content": scaleAlignPrimaryAxis() }],
			/**
			* Place Items
			* @see https://tailwindcss.com/docs/place-items
			*/
			"place-items": [{ "place-items": [...scaleAlignSecondaryAxis(), "baseline"] }],
			/**
			* Place Self
			* @see https://tailwindcss.com/docs/place-self
			*/
			"place-self": [{ "place-self": ["auto", ...scaleAlignSecondaryAxis()] }],
			/**
			* Padding
			* @see https://tailwindcss.com/docs/padding
			*/
			p: [{ p: scaleUnambiguousSpacing() }],
			/**
			* Padding Inline
			* @see https://tailwindcss.com/docs/padding
			*/
			px: [{ px: scaleUnambiguousSpacing() }],
			/**
			* Padding Block
			* @see https://tailwindcss.com/docs/padding
			*/
			py: [{ py: scaleUnambiguousSpacing() }],
			/**
			* Padding Inline Start
			* @see https://tailwindcss.com/docs/padding
			*/
			ps: [{ ps: scaleUnambiguousSpacing() }],
			/**
			* Padding Inline End
			* @see https://tailwindcss.com/docs/padding
			*/
			pe: [{ pe: scaleUnambiguousSpacing() }],
			/**
			* Padding Block Start
			* @see https://tailwindcss.com/docs/padding
			*/
			pbs: [{ pbs: scaleUnambiguousSpacing() }],
			/**
			* Padding Block End
			* @see https://tailwindcss.com/docs/padding
			*/
			pbe: [{ pbe: scaleUnambiguousSpacing() }],
			/**
			* Padding Top
			* @see https://tailwindcss.com/docs/padding
			*/
			pt: [{ pt: scaleUnambiguousSpacing() }],
			/**
			* Padding Right
			* @see https://tailwindcss.com/docs/padding
			*/
			pr: [{ pr: scaleUnambiguousSpacing() }],
			/**
			* Padding Bottom
			* @see https://tailwindcss.com/docs/padding
			*/
			pb: [{ pb: scaleUnambiguousSpacing() }],
			/**
			* Padding Left
			* @see https://tailwindcss.com/docs/padding
			*/
			pl: [{ pl: scaleUnambiguousSpacing() }],
			/**
			* Margin
			* @see https://tailwindcss.com/docs/margin
			*/
			m: [{ m: scaleMargin() }],
			/**
			* Margin Inline
			* @see https://tailwindcss.com/docs/margin
			*/
			mx: [{ mx: scaleMargin() }],
			/**
			* Margin Block
			* @see https://tailwindcss.com/docs/margin
			*/
			my: [{ my: scaleMargin() }],
			/**
			* Margin Inline Start
			* @see https://tailwindcss.com/docs/margin
			*/
			ms: [{ ms: scaleMargin() }],
			/**
			* Margin Inline End
			* @see https://tailwindcss.com/docs/margin
			*/
			me: [{ me: scaleMargin() }],
			/**
			* Margin Block Start
			* @see https://tailwindcss.com/docs/margin
			*/
			mbs: [{ mbs: scaleMargin() }],
			/**
			* Margin Block End
			* @see https://tailwindcss.com/docs/margin
			*/
			mbe: [{ mbe: scaleMargin() }],
			/**
			* Margin Top
			* @see https://tailwindcss.com/docs/margin
			*/
			mt: [{ mt: scaleMargin() }],
			/**
			* Margin Right
			* @see https://tailwindcss.com/docs/margin
			*/
			mr: [{ mr: scaleMargin() }],
			/**
			* Margin Bottom
			* @see https://tailwindcss.com/docs/margin
			*/
			mb: [{ mb: scaleMargin() }],
			/**
			* Margin Left
			* @see https://tailwindcss.com/docs/margin
			*/
			ml: [{ ml: scaleMargin() }],
			/**
			* Space Between X
			* @see https://tailwindcss.com/docs/margin#adding-space-between-children
			*/
			"space-x": [{ "space-x": scaleUnambiguousSpacing() }],
			/**
			* Space Between X Reverse
			* @see https://tailwindcss.com/docs/margin#adding-space-between-children
			*/
			"space-x-reverse": ["space-x-reverse"],
			/**
			* Space Between Y
			* @see https://tailwindcss.com/docs/margin#adding-space-between-children
			*/
			"space-y": [{ "space-y": scaleUnambiguousSpacing() }],
			/**
			* Space Between Y Reverse
			* @see https://tailwindcss.com/docs/margin#adding-space-between-children
			*/
			"space-y-reverse": ["space-y-reverse"],
			/**
			* Size
			* @see https://tailwindcss.com/docs/width#setting-both-width-and-height
			*/
			size: [{ size: scaleSizing() }],
			/**
			* Inline Size
			* @see https://tailwindcss.com/docs/width
			*/
			"inline-size": [{ inline: ["auto", ...scaleSizingInline()] }],
			/**
			* Min-Inline Size
			* @see https://tailwindcss.com/docs/min-width
			*/
			"min-inline-size": [{ "min-inline": ["auto", ...scaleSizingInline()] }],
			/**
			* Max-Inline Size
			* @see https://tailwindcss.com/docs/max-width
			*/
			"max-inline-size": [{ "max-inline": ["none", ...scaleSizingInline()] }],
			/**
			* Block Size
			* @see https://tailwindcss.com/docs/height
			*/
			"block-size": [{ block: ["auto", ...scaleSizingBlock()] }],
			/**
			* Min-Block Size
			* @see https://tailwindcss.com/docs/min-height
			*/
			"min-block-size": [{ "min-block": ["auto", ...scaleSizingBlock()] }],
			/**
			* Max-Block Size
			* @see https://tailwindcss.com/docs/max-height
			*/
			"max-block-size": [{ "max-block": ["none", ...scaleSizingBlock()] }],
			/**
			* Width
			* @see https://tailwindcss.com/docs/width
			*/
			w: [{ w: [
				themeContainer,
				"screen",
				...scaleSizing()
			] }],
			/**
			* Min-Width
			* @see https://tailwindcss.com/docs/min-width
			*/
			"min-w": [{ "min-w": [
				themeContainer,
				"screen",
				"none",
				...scaleSizing()
			] }],
			/**
			* Max-Width
			* @see https://tailwindcss.com/docs/max-width
			*/
			"max-w": [{ "max-w": [
				themeContainer,
				"screen",
				"none",
				"prose",
				(
				/** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
				{ screen: [themeBreakpoint] }),
				...scaleSizing()
			] }],
			/**
			* Height
			* @see https://tailwindcss.com/docs/height
			*/
			h: [{ h: [
				"screen",
				"lh",
				...scaleSizing()
			] }],
			/**
			* Min-Height
			* @see https://tailwindcss.com/docs/min-height
			*/
			"min-h": [{ "min-h": [
				"screen",
				"lh",
				"none",
				...scaleSizing()
			] }],
			/**
			* Max-Height
			* @see https://tailwindcss.com/docs/max-height
			*/
			"max-h": [{ "max-h": [
				"screen",
				"lh",
				...scaleSizing()
			] }],
			/**
			* Font Size
			* @see https://tailwindcss.com/docs/font-size
			*/
			"font-size": [{ text: [
				"base",
				themeText,
				isArbitraryVariableLength,
				isArbitraryLength
			] }],
			/**
			* Font Smoothing
			* @see https://tailwindcss.com/docs/font-smoothing
			*/
			"font-smoothing": ["antialiased", "subpixel-antialiased"],
			/**
			* Font Style
			* @see https://tailwindcss.com/docs/font-style
			*/
			"font-style": ["italic", "not-italic"],
			/**
			* Font Weight
			* @see https://tailwindcss.com/docs/font-weight
			*/
			"font-weight": [{ font: [
				themeFontWeight,
				isArbitraryVariableWeight,
				isArbitraryWeight
			] }],
			/**
			* Font Stretch
			* @see https://tailwindcss.com/docs/font-stretch
			*/
			"font-stretch": [{ "font-stretch": [
				"ultra-condensed",
				"extra-condensed",
				"condensed",
				"semi-condensed",
				"normal",
				"semi-expanded",
				"expanded",
				"extra-expanded",
				"ultra-expanded",
				isPercent,
				isArbitraryValue
			] }],
			/**
			* Font Family
			* @see https://tailwindcss.com/docs/font-family
			*/
			"font-family": [{ font: [
				isArbitraryVariableFamilyName,
				isArbitraryFamilyName,
				themeFont
			] }],
			/**
			* Font Feature Settings
			* @see https://tailwindcss.com/docs/font-feature-settings
			*/
			"font-features": [{ "font-features": [isArbitraryValue] }],
			/**
			* Font Variant Numeric
			* @see https://tailwindcss.com/docs/font-variant-numeric
			*/
			"fvn-normal": ["normal-nums"],
			/**
			* Font Variant Numeric
			* @see https://tailwindcss.com/docs/font-variant-numeric
			*/
			"fvn-ordinal": ["ordinal"],
			/**
			* Font Variant Numeric
			* @see https://tailwindcss.com/docs/font-variant-numeric
			*/
			"fvn-slashed-zero": ["slashed-zero"],
			/**
			* Font Variant Numeric
			* @see https://tailwindcss.com/docs/font-variant-numeric
			*/
			"fvn-figure": ["lining-nums", "oldstyle-nums"],
			/**
			* Font Variant Numeric
			* @see https://tailwindcss.com/docs/font-variant-numeric
			*/
			"fvn-spacing": ["proportional-nums", "tabular-nums"],
			/**
			* Font Variant Numeric
			* @see https://tailwindcss.com/docs/font-variant-numeric
			*/
			"fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
			/**
			* Letter Spacing
			* @see https://tailwindcss.com/docs/letter-spacing
			*/
			tracking: [{ tracking: [
				themeTracking,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Line Clamp
			* @see https://tailwindcss.com/docs/line-clamp
			*/
			"line-clamp": [{ "line-clamp": [
				isNumber,
				"none",
				isArbitraryVariable,
				isArbitraryNumber
			] }],
			/**
			* Line Height
			* @see https://tailwindcss.com/docs/line-height
			*/
			leading: [{ leading: [themeLeading, ...scaleUnambiguousSpacing()] }],
			/**
			* List Style Image
			* @see https://tailwindcss.com/docs/list-style-image
			*/
			"list-image": [{ "list-image": [
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* List Style Position
			* @see https://tailwindcss.com/docs/list-style-position
			*/
			"list-style-position": [{ list: ["inside", "outside"] }],
			/**
			* List Style Type
			* @see https://tailwindcss.com/docs/list-style-type
			*/
			"list-style-type": [{ list: [
				"disc",
				"decimal",
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Text Alignment
			* @see https://tailwindcss.com/docs/text-align
			*/
			"text-alignment": [{ text: [
				"left",
				"center",
				"right",
				"justify",
				"start",
				"end"
			] }],
			/**
			* Placeholder Color
			* @deprecated since Tailwind CSS v3.0.0
			* @see https://v3.tailwindcss.com/docs/placeholder-color
			*/
			"placeholder-color": [{ placeholder: scaleColor() }],
			/**
			* Text Color
			* @see https://tailwindcss.com/docs/text-color
			*/
			"text-color": [{ text: scaleColor() }],
			/**
			* Text Decoration
			* @see https://tailwindcss.com/docs/text-decoration
			*/
			"text-decoration": [
				"underline",
				"overline",
				"line-through",
				"no-underline"
			],
			/**
			* Text Decoration Style
			* @see https://tailwindcss.com/docs/text-decoration-style
			*/
			"text-decoration-style": [{ decoration: [...scaleLineStyle(), "wavy"] }],
			/**
			* Text Decoration Thickness
			* @see https://tailwindcss.com/docs/text-decoration-thickness
			*/
			"text-decoration-thickness": [{ decoration: [
				isNumber,
				"from-font",
				"auto",
				isArbitraryVariable,
				isArbitraryLength
			] }],
			/**
			* Text Decoration Color
			* @see https://tailwindcss.com/docs/text-decoration-color
			*/
			"text-decoration-color": [{ decoration: scaleColor() }],
			/**
			* Text Underline Offset
			* @see https://tailwindcss.com/docs/text-underline-offset
			*/
			"underline-offset": [{ "underline-offset": [
				isNumber,
				"auto",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Text Transform
			* @see https://tailwindcss.com/docs/text-transform
			*/
			"text-transform": [
				"uppercase",
				"lowercase",
				"capitalize",
				"normal-case"
			],
			/**
			* Text Overflow
			* @see https://tailwindcss.com/docs/text-overflow
			*/
			"text-overflow": [
				"truncate",
				"text-ellipsis",
				"text-clip"
			],
			/**
			* Text Wrap
			* @see https://tailwindcss.com/docs/text-wrap
			*/
			"text-wrap": [{ text: [
				"wrap",
				"nowrap",
				"balance",
				"pretty"
			] }],
			/**
			* Text Indent
			* @see https://tailwindcss.com/docs/text-indent
			*/
			indent: [{ indent: scaleUnambiguousSpacing() }],
			/**
			* Tab Size
			* @see https://tailwindcss.com/docs/tab-size
			*/
			"tab-size": [{ tab: [
				isInteger,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Vertical Alignment
			* @see https://tailwindcss.com/docs/vertical-align
			*/
			"vertical-align": [{ align: [
				"baseline",
				"top",
				"middle",
				"bottom",
				"text-top",
				"text-bottom",
				"sub",
				"super",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Whitespace
			* @see https://tailwindcss.com/docs/whitespace
			*/
			whitespace: [{ whitespace: [
				"normal",
				"nowrap",
				"pre",
				"pre-line",
				"pre-wrap",
				"break-spaces"
			] }],
			/**
			* Word Break
			* @see https://tailwindcss.com/docs/word-break
			*/
			break: [{ break: [
				"normal",
				"words",
				"all",
				"keep"
			] }],
			/**
			* Overflow Wrap
			* @see https://tailwindcss.com/docs/overflow-wrap
			*/
			wrap: [{ wrap: [
				"break-word",
				"anywhere",
				"normal"
			] }],
			/**
			* Hyphens
			* @see https://tailwindcss.com/docs/hyphens
			*/
			hyphens: [{ hyphens: [
				"none",
				"manual",
				"auto"
			] }],
			/**
			* Content
			* @see https://tailwindcss.com/docs/content
			*/
			content: [{ content: [
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Background Attachment
			* @see https://tailwindcss.com/docs/background-attachment
			*/
			"bg-attachment": [{ bg: [
				"fixed",
				"local",
				"scroll"
			] }],
			/**
			* Background Clip
			* @see https://tailwindcss.com/docs/background-clip
			*/
			"bg-clip": [{ "bg-clip": [
				"border",
				"padding",
				"content",
				"text"
			] }],
			/**
			* Background Origin
			* @see https://tailwindcss.com/docs/background-origin
			*/
			"bg-origin": [{ "bg-origin": [
				"border",
				"padding",
				"content"
			] }],
			/**
			* Background Position
			* @see https://tailwindcss.com/docs/background-position
			*/
			"bg-position": [{ bg: scaleBgPosition() }],
			/**
			* Background Repeat
			* @see https://tailwindcss.com/docs/background-repeat
			*/
			"bg-repeat": [{ bg: scaleBgRepeat() }],
			/**
			* Background Size
			* @see https://tailwindcss.com/docs/background-size
			*/
			"bg-size": [{ bg: scaleBgSize() }],
			/**
			* Background Image
			* @see https://tailwindcss.com/docs/background-image
			*/
			"bg-image": [{ bg: [
				"none",
				{
					linear: [
						{ to: [
							"t",
							"tr",
							"r",
							"br",
							"b",
							"bl",
							"l",
							"tl"
						] },
						isInteger,
						isArbitraryVariable,
						isArbitraryValue
					],
					radial: [
						"",
						isArbitraryVariable,
						isArbitraryValue
					],
					conic: [
						isInteger,
						isArbitraryVariable,
						isArbitraryValue
					]
				},
				isArbitraryVariableImage,
				isArbitraryImage
			] }],
			/**
			* Background Color
			* @see https://tailwindcss.com/docs/background-color
			*/
			"bg-color": [{ bg: scaleColor() }],
			/**
			* Gradient Color Stops From Position
			* @see https://tailwindcss.com/docs/gradient-color-stops
			*/
			"gradient-from-pos": [{ from: scaleGradientStopPosition() }],
			/**
			* Gradient Color Stops Via Position
			* @see https://tailwindcss.com/docs/gradient-color-stops
			*/
			"gradient-via-pos": [{ via: scaleGradientStopPosition() }],
			/**
			* Gradient Color Stops To Position
			* @see https://tailwindcss.com/docs/gradient-color-stops
			*/
			"gradient-to-pos": [{ to: scaleGradientStopPosition() }],
			/**
			* Gradient Color Stops From
			* @see https://tailwindcss.com/docs/gradient-color-stops
			*/
			"gradient-from": [{ from: scaleColor() }],
			/**
			* Gradient Color Stops Via
			* @see https://tailwindcss.com/docs/gradient-color-stops
			*/
			"gradient-via": [{ via: scaleColor() }],
			/**
			* Gradient Color Stops To
			* @see https://tailwindcss.com/docs/gradient-color-stops
			*/
			"gradient-to": [{ to: scaleColor() }],
			/**
			* Border Radius
			* @see https://tailwindcss.com/docs/border-radius
			*/
			rounded: [{ rounded: scaleRadius() }],
			/**
			* Border Radius Start
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-s": [{ "rounded-s": scaleRadius() }],
			/**
			* Border Radius End
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-e": [{ "rounded-e": scaleRadius() }],
			/**
			* Border Radius Top
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-t": [{ "rounded-t": scaleRadius() }],
			/**
			* Border Radius Right
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-r": [{ "rounded-r": scaleRadius() }],
			/**
			* Border Radius Bottom
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-b": [{ "rounded-b": scaleRadius() }],
			/**
			* Border Radius Left
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-l": [{ "rounded-l": scaleRadius() }],
			/**
			* Border Radius Start Start
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-ss": [{ "rounded-ss": scaleRadius() }],
			/**
			* Border Radius Start End
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-se": [{ "rounded-se": scaleRadius() }],
			/**
			* Border Radius End End
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-ee": [{ "rounded-ee": scaleRadius() }],
			/**
			* Border Radius End Start
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-es": [{ "rounded-es": scaleRadius() }],
			/**
			* Border Radius Top Left
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-tl": [{ "rounded-tl": scaleRadius() }],
			/**
			* Border Radius Top Right
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-tr": [{ "rounded-tr": scaleRadius() }],
			/**
			* Border Radius Bottom Right
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-br": [{ "rounded-br": scaleRadius() }],
			/**
			* Border Radius Bottom Left
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-bl": [{ "rounded-bl": scaleRadius() }],
			/**
			* Border Width
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w": [{ border: scaleBorderWidth() }],
			/**
			* Border Width Inline
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-x": [{ "border-x": scaleBorderWidth() }],
			/**
			* Border Width Block
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-y": [{ "border-y": scaleBorderWidth() }],
			/**
			* Border Width Inline Start
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-s": [{ "border-s": scaleBorderWidth() }],
			/**
			* Border Width Inline End
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-e": [{ "border-e": scaleBorderWidth() }],
			/**
			* Border Width Block Start
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-bs": [{ "border-bs": scaleBorderWidth() }],
			/**
			* Border Width Block End
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-be": [{ "border-be": scaleBorderWidth() }],
			/**
			* Border Width Top
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-t": [{ "border-t": scaleBorderWidth() }],
			/**
			* Border Width Right
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-r": [{ "border-r": scaleBorderWidth() }],
			/**
			* Border Width Bottom
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-b": [{ "border-b": scaleBorderWidth() }],
			/**
			* Border Width Left
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-l": [{ "border-l": scaleBorderWidth() }],
			/**
			* Divide Width X
			* @see https://tailwindcss.com/docs/border-width#between-children
			*/
			"divide-x": [{ "divide-x": scaleBorderWidth() }],
			/**
			* Divide Width X Reverse
			* @see https://tailwindcss.com/docs/border-width#between-children
			*/
			"divide-x-reverse": ["divide-x-reverse"],
			/**
			* Divide Width Y
			* @see https://tailwindcss.com/docs/border-width#between-children
			*/
			"divide-y": [{ "divide-y": scaleBorderWidth() }],
			/**
			* Divide Width Y Reverse
			* @see https://tailwindcss.com/docs/border-width#between-children
			*/
			"divide-y-reverse": ["divide-y-reverse"],
			/**
			* Border Style
			* @see https://tailwindcss.com/docs/border-style
			*/
			"border-style": [{ border: [
				...scaleLineStyle(),
				"hidden",
				"none"
			] }],
			/**
			* Divide Style
			* @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
			*/
			"divide-style": [{ divide: [
				...scaleLineStyle(),
				"hidden",
				"none"
			] }],
			/**
			* Border Color
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color": [{ border: scaleColor() }],
			/**
			* Border Color Inline
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-x": [{ "border-x": scaleColor() }],
			/**
			* Border Color Block
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-y": [{ "border-y": scaleColor() }],
			/**
			* Border Color Inline Start
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-s": [{ "border-s": scaleColor() }],
			/**
			* Border Color Inline End
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-e": [{ "border-e": scaleColor() }],
			/**
			* Border Color Block Start
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-bs": [{ "border-bs": scaleColor() }],
			/**
			* Border Color Block End
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-be": [{ "border-be": scaleColor() }],
			/**
			* Border Color Top
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-t": [{ "border-t": scaleColor() }],
			/**
			* Border Color Right
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-r": [{ "border-r": scaleColor() }],
			/**
			* Border Color Bottom
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-b": [{ "border-b": scaleColor() }],
			/**
			* Border Color Left
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-l": [{ "border-l": scaleColor() }],
			/**
			* Divide Color
			* @see https://tailwindcss.com/docs/divide-color
			*/
			"divide-color": [{ divide: scaleColor() }],
			/**
			* Outline Style
			* @see https://tailwindcss.com/docs/outline-style
			*/
			"outline-style": [{ outline: [
				...scaleLineStyle(),
				"none",
				"hidden"
			] }],
			/**
			* Outline Offset
			* @see https://tailwindcss.com/docs/outline-offset
			*/
			"outline-offset": [{ "outline-offset": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Outline Width
			* @see https://tailwindcss.com/docs/outline-width
			*/
			"outline-w": [{ outline: [
				"",
				isNumber,
				isArbitraryVariableLength,
				isArbitraryLength
			] }],
			/**
			* Outline Color
			* @see https://tailwindcss.com/docs/outline-color
			*/
			"outline-color": [{ outline: scaleColor() }],
			/**
			* Box Shadow
			* @see https://tailwindcss.com/docs/box-shadow
			*/
			shadow: [{ shadow: [
				"",
				"none",
				themeShadow,
				isArbitraryVariableShadow,
				isArbitraryShadow
			] }],
			/**
			* Box Shadow Color
			* @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
			*/
			"shadow-color": [{ shadow: scaleColor() }],
			/**
			* Inset Box Shadow
			* @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
			*/
			"inset-shadow": [{ "inset-shadow": [
				"none",
				themeInsetShadow,
				isArbitraryVariableShadow,
				isArbitraryShadow
			] }],
			/**
			* Inset Box Shadow Color
			* @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
			*/
			"inset-shadow-color": [{ "inset-shadow": scaleColor() }],
			/**
			* Ring Width
			* @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
			*/
			"ring-w": [{ ring: scaleBorderWidth() }],
			/**
			* Ring Width Inset
			* @see https://v3.tailwindcss.com/docs/ring-width#inset-rings
			* @deprecated since Tailwind CSS v4.0.0
			* @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
			*/
			"ring-w-inset": ["ring-inset"],
			/**
			* Ring Color
			* @see https://tailwindcss.com/docs/box-shadow#setting-the-ring-color
			*/
			"ring-color": [{ ring: scaleColor() }],
			/**
			* Ring Offset Width
			* @see https://v3.tailwindcss.com/docs/ring-offset-width
			* @deprecated since Tailwind CSS v4.0.0
			* @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
			*/
			"ring-offset-w": [{ "ring-offset": [isNumber, isArbitraryLength] }],
			/**
			* Ring Offset Color
			* @see https://v3.tailwindcss.com/docs/ring-offset-color
			* @deprecated since Tailwind CSS v4.0.0
			* @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
			*/
			"ring-offset-color": [{ "ring-offset": scaleColor() }],
			/**
			* Inset Ring Width
			* @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
			*/
			"inset-ring-w": [{ "inset-ring": scaleBorderWidth() }],
			/**
			* Inset Ring Color
			* @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
			*/
			"inset-ring-color": [{ "inset-ring": scaleColor() }],
			/**
			* Text Shadow
			* @see https://tailwindcss.com/docs/text-shadow
			*/
			"text-shadow": [{ "text-shadow": [
				"none",
				themeTextShadow,
				isArbitraryVariableShadow,
				isArbitraryShadow
			] }],
			/**
			* Text Shadow Color
			* @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
			*/
			"text-shadow-color": [{ "text-shadow": scaleColor() }],
			/**
			* Opacity
			* @see https://tailwindcss.com/docs/opacity
			*/
			opacity: [{ opacity: [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Mix Blend Mode
			* @see https://tailwindcss.com/docs/mix-blend-mode
			*/
			"mix-blend": [{ "mix-blend": [
				...scaleBlendMode(),
				"plus-darker",
				"plus-lighter"
			] }],
			/**
			* Background Blend Mode
			* @see https://tailwindcss.com/docs/background-blend-mode
			*/
			"bg-blend": [{ "bg-blend": scaleBlendMode() }],
			/**
			* Mask Clip
			* @see https://tailwindcss.com/docs/mask-clip
			*/
			"mask-clip": [{ "mask-clip": [
				"border",
				"padding",
				"content",
				"fill",
				"stroke",
				"view"
			] }, "mask-no-clip"],
			/**
			* Mask Composite
			* @see https://tailwindcss.com/docs/mask-composite
			*/
			"mask-composite": [{ mask: [
				"add",
				"subtract",
				"intersect",
				"exclude"
			] }],
			/**
			* Mask Image
			* @see https://tailwindcss.com/docs/mask-image
			*/
			"mask-image-linear-pos": [{ "mask-linear": [isNumber] }],
			"mask-image-linear-from-pos": [{ "mask-linear-from": scaleMaskImagePosition() }],
			"mask-image-linear-to-pos": [{ "mask-linear-to": scaleMaskImagePosition() }],
			"mask-image-linear-from-color": [{ "mask-linear-from": scaleColor() }],
			"mask-image-linear-to-color": [{ "mask-linear-to": scaleColor() }],
			"mask-image-t-from-pos": [{ "mask-t-from": scaleMaskImagePosition() }],
			"mask-image-t-to-pos": [{ "mask-t-to": scaleMaskImagePosition() }],
			"mask-image-t-from-color": [{ "mask-t-from": scaleColor() }],
			"mask-image-t-to-color": [{ "mask-t-to": scaleColor() }],
			"mask-image-r-from-pos": [{ "mask-r-from": scaleMaskImagePosition() }],
			"mask-image-r-to-pos": [{ "mask-r-to": scaleMaskImagePosition() }],
			"mask-image-r-from-color": [{ "mask-r-from": scaleColor() }],
			"mask-image-r-to-color": [{ "mask-r-to": scaleColor() }],
			"mask-image-b-from-pos": [{ "mask-b-from": scaleMaskImagePosition() }],
			"mask-image-b-to-pos": [{ "mask-b-to": scaleMaskImagePosition() }],
			"mask-image-b-from-color": [{ "mask-b-from": scaleColor() }],
			"mask-image-b-to-color": [{ "mask-b-to": scaleColor() }],
			"mask-image-l-from-pos": [{ "mask-l-from": scaleMaskImagePosition() }],
			"mask-image-l-to-pos": [{ "mask-l-to": scaleMaskImagePosition() }],
			"mask-image-l-from-color": [{ "mask-l-from": scaleColor() }],
			"mask-image-l-to-color": [{ "mask-l-to": scaleColor() }],
			"mask-image-x-from-pos": [{ "mask-x-from": scaleMaskImagePosition() }],
			"mask-image-x-to-pos": [{ "mask-x-to": scaleMaskImagePosition() }],
			"mask-image-x-from-color": [{ "mask-x-from": scaleColor() }],
			"mask-image-x-to-color": [{ "mask-x-to": scaleColor() }],
			"mask-image-y-from-pos": [{ "mask-y-from": scaleMaskImagePosition() }],
			"mask-image-y-to-pos": [{ "mask-y-to": scaleMaskImagePosition() }],
			"mask-image-y-from-color": [{ "mask-y-from": scaleColor() }],
			"mask-image-y-to-color": [{ "mask-y-to": scaleColor() }],
			"mask-image-radial": [{ "mask-radial": [isArbitraryVariable, isArbitraryValue] }],
			"mask-image-radial-from-pos": [{ "mask-radial-from": scaleMaskImagePosition() }],
			"mask-image-radial-to-pos": [{ "mask-radial-to": scaleMaskImagePosition() }],
			"mask-image-radial-from-color": [{ "mask-radial-from": scaleColor() }],
			"mask-image-radial-to-color": [{ "mask-radial-to": scaleColor() }],
			"mask-image-radial-shape": [{ "mask-radial": ["circle", "ellipse"] }],
			"mask-image-radial-size": [{ "mask-radial": [{
				closest: ["side", "corner"],
				farthest: ["side", "corner"]
			}] }],
			"mask-image-radial-pos": [{ "mask-radial-at": scalePosition() }],
			"mask-image-conic-pos": [{ "mask-conic": [isNumber] }],
			"mask-image-conic-from-pos": [{ "mask-conic-from": scaleMaskImagePosition() }],
			"mask-image-conic-to-pos": [{ "mask-conic-to": scaleMaskImagePosition() }],
			"mask-image-conic-from-color": [{ "mask-conic-from": scaleColor() }],
			"mask-image-conic-to-color": [{ "mask-conic-to": scaleColor() }],
			/**
			* Mask Mode
			* @see https://tailwindcss.com/docs/mask-mode
			*/
			"mask-mode": [{ mask: [
				"alpha",
				"luminance",
				"match"
			] }],
			/**
			* Mask Origin
			* @see https://tailwindcss.com/docs/mask-origin
			*/
			"mask-origin": [{ "mask-origin": [
				"border",
				"padding",
				"content",
				"fill",
				"stroke",
				"view"
			] }],
			/**
			* Mask Position
			* @see https://tailwindcss.com/docs/mask-position
			*/
			"mask-position": [{ mask: scaleBgPosition() }],
			/**
			* Mask Repeat
			* @see https://tailwindcss.com/docs/mask-repeat
			*/
			"mask-repeat": [{ mask: scaleBgRepeat() }],
			/**
			* Mask Size
			* @see https://tailwindcss.com/docs/mask-size
			*/
			"mask-size": [{ mask: scaleBgSize() }],
			/**
			* Mask Type
			* @see https://tailwindcss.com/docs/mask-type
			*/
			"mask-type": [{ "mask-type": ["alpha", "luminance"] }],
			/**
			* Mask Image
			* @see https://tailwindcss.com/docs/mask-image
			*/
			"mask-image": [{ mask: [
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Filter
			* @see https://tailwindcss.com/docs/filter
			*/
			filter: [{ filter: [
				"",
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Blur
			* @see https://tailwindcss.com/docs/blur
			*/
			blur: [{ blur: scaleBlur() }],
			/**
			* Brightness
			* @see https://tailwindcss.com/docs/brightness
			*/
			brightness: [{ brightness: [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Contrast
			* @see https://tailwindcss.com/docs/contrast
			*/
			contrast: [{ contrast: [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Drop Shadow
			* @see https://tailwindcss.com/docs/drop-shadow
			*/
			"drop-shadow": [{ "drop-shadow": [
				"",
				"none",
				themeDropShadow,
				isArbitraryVariableShadow,
				isArbitraryShadow
			] }],
			/**
			* Drop Shadow Color
			* @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
			*/
			"drop-shadow-color": [{ "drop-shadow": scaleColor() }],
			/**
			* Grayscale
			* @see https://tailwindcss.com/docs/grayscale
			*/
			grayscale: [{ grayscale: [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Hue Rotate
			* @see https://tailwindcss.com/docs/hue-rotate
			*/
			"hue-rotate": [{ "hue-rotate": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Invert
			* @see https://tailwindcss.com/docs/invert
			*/
			invert: [{ invert: [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Saturate
			* @see https://tailwindcss.com/docs/saturate
			*/
			saturate: [{ saturate: [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Sepia
			* @see https://tailwindcss.com/docs/sepia
			*/
			sepia: [{ sepia: [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Backdrop Filter
			* @see https://tailwindcss.com/docs/backdrop-filter
			*/
			"backdrop-filter": [{ "backdrop-filter": [
				"",
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Backdrop Blur
			* @see https://tailwindcss.com/docs/backdrop-blur
			*/
			"backdrop-blur": [{ "backdrop-blur": scaleBlur() }],
			/**
			* Backdrop Brightness
			* @see https://tailwindcss.com/docs/backdrop-brightness
			*/
			"backdrop-brightness": [{ "backdrop-brightness": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Backdrop Contrast
			* @see https://tailwindcss.com/docs/backdrop-contrast
			*/
			"backdrop-contrast": [{ "backdrop-contrast": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Backdrop Grayscale
			* @see https://tailwindcss.com/docs/backdrop-grayscale
			*/
			"backdrop-grayscale": [{ "backdrop-grayscale": [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Backdrop Hue Rotate
			* @see https://tailwindcss.com/docs/backdrop-hue-rotate
			*/
			"backdrop-hue-rotate": [{ "backdrop-hue-rotate": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Backdrop Invert
			* @see https://tailwindcss.com/docs/backdrop-invert
			*/
			"backdrop-invert": [{ "backdrop-invert": [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Backdrop Opacity
			* @see https://tailwindcss.com/docs/backdrop-opacity
			*/
			"backdrop-opacity": [{ "backdrop-opacity": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Backdrop Saturate
			* @see https://tailwindcss.com/docs/backdrop-saturate
			*/
			"backdrop-saturate": [{ "backdrop-saturate": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Backdrop Sepia
			* @see https://tailwindcss.com/docs/backdrop-sepia
			*/
			"backdrop-sepia": [{ "backdrop-sepia": [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Border Collapse
			* @see https://tailwindcss.com/docs/border-collapse
			*/
			"border-collapse": [{ border: ["collapse", "separate"] }],
			/**
			* Border Spacing
			* @see https://tailwindcss.com/docs/border-spacing
			*/
			"border-spacing": [{ "border-spacing": scaleUnambiguousSpacing() }],
			/**
			* Border Spacing X
			* @see https://tailwindcss.com/docs/border-spacing
			*/
			"border-spacing-x": [{ "border-spacing-x": scaleUnambiguousSpacing() }],
			/**
			* Border Spacing Y
			* @see https://tailwindcss.com/docs/border-spacing
			*/
			"border-spacing-y": [{ "border-spacing-y": scaleUnambiguousSpacing() }],
			/**
			* Table Layout
			* @see https://tailwindcss.com/docs/table-layout
			*/
			"table-layout": [{ table: ["auto", "fixed"] }],
			/**
			* Caption Side
			* @see https://tailwindcss.com/docs/caption-side
			*/
			caption: [{ caption: ["top", "bottom"] }],
			/**
			* Transition Property
			* @see https://tailwindcss.com/docs/transition-property
			*/
			transition: [{ transition: [
				"",
				"all",
				"colors",
				"opacity",
				"shadow",
				"transform",
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Transition Behavior
			* @see https://tailwindcss.com/docs/transition-behavior
			*/
			"transition-behavior": [{ transition: ["normal", "discrete"] }],
			/**
			* Transition Duration
			* @see https://tailwindcss.com/docs/transition-duration
			*/
			duration: [{ duration: [
				isNumber,
				"initial",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Transition Timing Function
			* @see https://tailwindcss.com/docs/transition-timing-function
			*/
			ease: [{ ease: [
				"linear",
				"initial",
				themeEase,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Transition Delay
			* @see https://tailwindcss.com/docs/transition-delay
			*/
			delay: [{ delay: [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Animation
			* @see https://tailwindcss.com/docs/animation
			*/
			animate: [{ animate: [
				"none",
				themeAnimate,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Backface Visibility
			* @see https://tailwindcss.com/docs/backface-visibility
			*/
			backface: [{ backface: ["hidden", "visible"] }],
			/**
			* Perspective
			* @see https://tailwindcss.com/docs/perspective
			*/
			perspective: [{ perspective: [
				themePerspective,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Perspective Origin
			* @see https://tailwindcss.com/docs/perspective-origin
			*/
			"perspective-origin": [{ "perspective-origin": scalePositionWithArbitrary() }],
			/**
			* Rotate
			* @see https://tailwindcss.com/docs/rotate
			*/
			rotate: [{ rotate: scaleRotate() }],
			/**
			* Rotate X
			* @see https://tailwindcss.com/docs/rotate
			*/
			"rotate-x": [{ "rotate-x": scaleRotate() }],
			/**
			* Rotate Y
			* @see https://tailwindcss.com/docs/rotate
			*/
			"rotate-y": [{ "rotate-y": scaleRotate() }],
			/**
			* Rotate Z
			* @see https://tailwindcss.com/docs/rotate
			*/
			"rotate-z": [{ "rotate-z": scaleRotate() }],
			/**
			* Scale
			* @see https://tailwindcss.com/docs/scale
			*/
			scale: [{ scale: scaleScale() }],
			/**
			* Scale X
			* @see https://tailwindcss.com/docs/scale
			*/
			"scale-x": [{ "scale-x": scaleScale() }],
			/**
			* Scale Y
			* @see https://tailwindcss.com/docs/scale
			*/
			"scale-y": [{ "scale-y": scaleScale() }],
			/**
			* Scale Z
			* @see https://tailwindcss.com/docs/scale
			*/
			"scale-z": [{ "scale-z": scaleScale() }],
			/**
			* Scale 3D
			* @see https://tailwindcss.com/docs/scale
			*/
			"scale-3d": ["scale-3d"],
			/**
			* Skew
			* @see https://tailwindcss.com/docs/skew
			*/
			skew: [{ skew: scaleSkew() }],
			/**
			* Skew X
			* @see https://tailwindcss.com/docs/skew
			*/
			"skew-x": [{ "skew-x": scaleSkew() }],
			/**
			* Skew Y
			* @see https://tailwindcss.com/docs/skew
			*/
			"skew-y": [{ "skew-y": scaleSkew() }],
			/**
			* Transform
			* @see https://tailwindcss.com/docs/transform
			*/
			transform: [{ transform: [
				isArbitraryVariable,
				isArbitraryValue,
				"",
				"none",
				"gpu",
				"cpu"
			] }],
			/**
			* Transform Origin
			* @see https://tailwindcss.com/docs/transform-origin
			*/
			"transform-origin": [{ origin: scalePositionWithArbitrary() }],
			/**
			* Transform Style
			* @see https://tailwindcss.com/docs/transform-style
			*/
			"transform-style": [{ transform: ["3d", "flat"] }],
			/**
			* Translate
			* @see https://tailwindcss.com/docs/translate
			*/
			translate: [{ translate: scaleTranslate() }],
			/**
			* Translate X
			* @see https://tailwindcss.com/docs/translate
			*/
			"translate-x": [{ "translate-x": scaleTranslate() }],
			/**
			* Translate Y
			* @see https://tailwindcss.com/docs/translate
			*/
			"translate-y": [{ "translate-y": scaleTranslate() }],
			/**
			* Translate Z
			* @see https://tailwindcss.com/docs/translate
			*/
			"translate-z": [{ "translate-z": scaleTranslate() }],
			/**
			* Translate None
			* @see https://tailwindcss.com/docs/translate
			*/
			"translate-none": ["translate-none"],
			/**
			* Zoom
			* @see https://tailwindcss.com/docs/zoom
			*/
			zoom: [{ zoom: [
				isInteger,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Accent Color
			* @see https://tailwindcss.com/docs/accent-color
			*/
			accent: [{ accent: scaleColor() }],
			/**
			* Appearance
			* @see https://tailwindcss.com/docs/appearance
			*/
			appearance: [{ appearance: ["none", "auto"] }],
			/**
			* Caret Color
			* @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
			*/
			"caret-color": [{ caret: scaleColor() }],
			/**
			* Color Scheme
			* @see https://tailwindcss.com/docs/color-scheme
			*/
			"color-scheme": [{ scheme: [
				"normal",
				"dark",
				"light",
				"light-dark",
				"only-dark",
				"only-light"
			] }],
			/**
			* Cursor
			* @see https://tailwindcss.com/docs/cursor
			*/
			cursor: [{ cursor: [
				"auto",
				"default",
				"pointer",
				"wait",
				"text",
				"move",
				"help",
				"not-allowed",
				"none",
				"context-menu",
				"progress",
				"cell",
				"crosshair",
				"vertical-text",
				"alias",
				"copy",
				"no-drop",
				"grab",
				"grabbing",
				"all-scroll",
				"col-resize",
				"row-resize",
				"n-resize",
				"e-resize",
				"s-resize",
				"w-resize",
				"ne-resize",
				"nw-resize",
				"se-resize",
				"sw-resize",
				"ew-resize",
				"ns-resize",
				"nesw-resize",
				"nwse-resize",
				"zoom-in",
				"zoom-out",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Field Sizing
			* @see https://tailwindcss.com/docs/field-sizing
			*/
			"field-sizing": [{ "field-sizing": ["fixed", "content"] }],
			/**
			* Pointer Events
			* @see https://tailwindcss.com/docs/pointer-events
			*/
			"pointer-events": [{ "pointer-events": ["auto", "none"] }],
			/**
			* Resize
			* @see https://tailwindcss.com/docs/resize
			*/
			resize: [{ resize: [
				"none",
				"",
				"y",
				"x"
			] }],
			/**
			* Scroll Behavior
			* @see https://tailwindcss.com/docs/scroll-behavior
			*/
			"scroll-behavior": [{ scroll: ["auto", "smooth"] }],
			/**
			* Scrollbar Thumb Color
			* @see https://tailwindcss.com/docs/scrollbar-color
			*/
			"scrollbar-thumb-color": [{ "scrollbar-thumb": scaleColor() }],
			/**
			* Scrollbar Track Color
			* @see https://tailwindcss.com/docs/scrollbar-color
			*/
			"scrollbar-track-color": [{ "scrollbar-track": scaleColor() }],
			/**
			* Scrollbar Gutter
			* @see https://tailwindcss.com/docs/scrollbar-gutter
			*/
			"scrollbar-gutter": [{ "scrollbar-gutter": [
				"auto",
				"stable",
				"both"
			] }],
			/**
			* Scrollbar Width
			* @see https://tailwindcss.com/docs/scrollbar-width
			*/
			"scrollbar-w": [{ scrollbar: [
				"auto",
				"thin",
				"none"
			] }],
			/**
			* Scroll Margin
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-m": [{ "scroll-m": scaleUnambiguousSpacing() }],
			/**
			* Scroll Margin Inline
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-mx": [{ "scroll-mx": scaleUnambiguousSpacing() }],
			/**
			* Scroll Margin Block
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-my": [{ "scroll-my": scaleUnambiguousSpacing() }],
			/**
			* Scroll Margin Inline Start
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-ms": [{ "scroll-ms": scaleUnambiguousSpacing() }],
			/**
			* Scroll Margin Inline End
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-me": [{ "scroll-me": scaleUnambiguousSpacing() }],
			/**
			* Scroll Margin Block Start
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-mbs": [{ "scroll-mbs": scaleUnambiguousSpacing() }],
			/**
			* Scroll Margin Block End
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-mbe": [{ "scroll-mbe": scaleUnambiguousSpacing() }],
			/**
			* Scroll Margin Top
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-mt": [{ "scroll-mt": scaleUnambiguousSpacing() }],
			/**
			* Scroll Margin Right
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-mr": [{ "scroll-mr": scaleUnambiguousSpacing() }],
			/**
			* Scroll Margin Bottom
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-mb": [{ "scroll-mb": scaleUnambiguousSpacing() }],
			/**
			* Scroll Margin Left
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-ml": [{ "scroll-ml": scaleUnambiguousSpacing() }],
			/**
			* Scroll Padding
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-p": [{ "scroll-p": scaleUnambiguousSpacing() }],
			/**
			* Scroll Padding Inline
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-px": [{ "scroll-px": scaleUnambiguousSpacing() }],
			/**
			* Scroll Padding Block
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-py": [{ "scroll-py": scaleUnambiguousSpacing() }],
			/**
			* Scroll Padding Inline Start
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-ps": [{ "scroll-ps": scaleUnambiguousSpacing() }],
			/**
			* Scroll Padding Inline End
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-pe": [{ "scroll-pe": scaleUnambiguousSpacing() }],
			/**
			* Scroll Padding Block Start
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-pbs": [{ "scroll-pbs": scaleUnambiguousSpacing() }],
			/**
			* Scroll Padding Block End
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-pbe": [{ "scroll-pbe": scaleUnambiguousSpacing() }],
			/**
			* Scroll Padding Top
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-pt": [{ "scroll-pt": scaleUnambiguousSpacing() }],
			/**
			* Scroll Padding Right
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-pr": [{ "scroll-pr": scaleUnambiguousSpacing() }],
			/**
			* Scroll Padding Bottom
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-pb": [{ "scroll-pb": scaleUnambiguousSpacing() }],
			/**
			* Scroll Padding Left
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-pl": [{ "scroll-pl": scaleUnambiguousSpacing() }],
			/**
			* Scroll Snap Align
			* @see https://tailwindcss.com/docs/scroll-snap-align
			*/
			"snap-align": [{ snap: [
				"start",
				"end",
				"center",
				"align-none"
			] }],
			/**
			* Scroll Snap Stop
			* @see https://tailwindcss.com/docs/scroll-snap-stop
			*/
			"snap-stop": [{ snap: ["normal", "always"] }],
			/**
			* Scroll Snap Type
			* @see https://tailwindcss.com/docs/scroll-snap-type
			*/
			"snap-type": [{ snap: [
				"none",
				"x",
				"y",
				"both"
			] }],
			/**
			* Scroll Snap Type Strictness
			* @see https://tailwindcss.com/docs/scroll-snap-type
			*/
			"snap-strictness": [{ snap: ["mandatory", "proximity"] }],
			/**
			* Touch Action
			* @see https://tailwindcss.com/docs/touch-action
			*/
			touch: [{ touch: [
				"auto",
				"none",
				"manipulation"
			] }],
			/**
			* Touch Action X
			* @see https://tailwindcss.com/docs/touch-action
			*/
			"touch-x": [{ "touch-pan": [
				"x",
				"left",
				"right"
			] }],
			/**
			* Touch Action Y
			* @see https://tailwindcss.com/docs/touch-action
			*/
			"touch-y": [{ "touch-pan": [
				"y",
				"up",
				"down"
			] }],
			/**
			* Touch Action Pinch Zoom
			* @see https://tailwindcss.com/docs/touch-action
			*/
			"touch-pz": ["touch-pinch-zoom"],
			/**
			* User Select
			* @see https://tailwindcss.com/docs/user-select
			*/
			select: [{ select: [
				"none",
				"text",
				"all",
				"auto"
			] }],
			/**
			* Will Change
			* @see https://tailwindcss.com/docs/will-change
			*/
			"will-change": [{ "will-change": [
				"auto",
				"scroll",
				"contents",
				"transform",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Fill
			* @see https://tailwindcss.com/docs/fill
			*/
			fill: [{ fill: ["none", ...scaleColor()] }],
			/**
			* Stroke Width
			* @see https://tailwindcss.com/docs/stroke-width
			*/
			"stroke-w": [{ stroke: [
				isNumber,
				isArbitraryVariableLength,
				isArbitraryLength,
				isArbitraryNumber
			] }],
			/**
			* Stroke
			* @see https://tailwindcss.com/docs/stroke
			*/
			stroke: [{ stroke: ["none", ...scaleColor()] }],
			/**
			* Forced Color Adjust
			* @see https://tailwindcss.com/docs/forced-color-adjust
			*/
			"forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }]
		},
		conflictingClassGroups: {
			"container-named": ["container-type"],
			overflow: ["overflow-x", "overflow-y"],
			overscroll: ["overscroll-x", "overscroll-y"],
			inset: [
				"inset-x",
				"inset-y",
				"inset-bs",
				"inset-be",
				"start",
				"end",
				"top",
				"right",
				"bottom",
				"left"
			],
			"inset-x": ["right", "left"],
			"inset-y": ["top", "bottom"],
			flex: [
				"basis",
				"grow",
				"shrink"
			],
			gap: ["gap-x", "gap-y"],
			p: [
				"px",
				"py",
				"ps",
				"pe",
				"pbs",
				"pbe",
				"pt",
				"pr",
				"pb",
				"pl"
			],
			px: ["pr", "pl"],
			py: ["pt", "pb"],
			m: [
				"mx",
				"my",
				"ms",
				"me",
				"mbs",
				"mbe",
				"mt",
				"mr",
				"mb",
				"ml"
			],
			mx: ["mr", "ml"],
			my: ["mt", "mb"],
			size: ["w", "h"],
			"font-size": ["leading"],
			"fvn-normal": [
				"fvn-ordinal",
				"fvn-slashed-zero",
				"fvn-figure",
				"fvn-spacing",
				"fvn-fraction"
			],
			"fvn-ordinal": ["fvn-normal"],
			"fvn-slashed-zero": ["fvn-normal"],
			"fvn-figure": ["fvn-normal"],
			"fvn-spacing": ["fvn-normal"],
			"fvn-fraction": ["fvn-normal"],
			"line-clamp": ["display", "overflow"],
			rounded: [
				"rounded-s",
				"rounded-e",
				"rounded-t",
				"rounded-r",
				"rounded-b",
				"rounded-l",
				"rounded-ss",
				"rounded-se",
				"rounded-ee",
				"rounded-es",
				"rounded-tl",
				"rounded-tr",
				"rounded-br",
				"rounded-bl"
			],
			"rounded-s": ["rounded-ss", "rounded-es"],
			"rounded-e": ["rounded-se", "rounded-ee"],
			"rounded-t": ["rounded-tl", "rounded-tr"],
			"rounded-r": ["rounded-tr", "rounded-br"],
			"rounded-b": ["rounded-br", "rounded-bl"],
			"rounded-l": ["rounded-tl", "rounded-bl"],
			"border-spacing": ["border-spacing-x", "border-spacing-y"],
			"border-w": [
				"border-w-x",
				"border-w-y",
				"border-w-s",
				"border-w-e",
				"border-w-bs",
				"border-w-be",
				"border-w-t",
				"border-w-r",
				"border-w-b",
				"border-w-l"
			],
			"border-w-x": ["border-w-r", "border-w-l"],
			"border-w-y": ["border-w-t", "border-w-b"],
			"border-color": [
				"border-color-x",
				"border-color-y",
				"border-color-s",
				"border-color-e",
				"border-color-bs",
				"border-color-be",
				"border-color-t",
				"border-color-r",
				"border-color-b",
				"border-color-l"
			],
			"border-color-x": ["border-color-r", "border-color-l"],
			"border-color-y": ["border-color-t", "border-color-b"],
			translate: [
				"translate-x",
				"translate-y",
				"translate-none"
			],
			"translate-none": [
				"translate",
				"translate-x",
				"translate-y",
				"translate-z"
			],
			"scroll-m": [
				"scroll-mx",
				"scroll-my",
				"scroll-ms",
				"scroll-me",
				"scroll-mbs",
				"scroll-mbe",
				"scroll-mt",
				"scroll-mr",
				"scroll-mb",
				"scroll-ml"
			],
			"scroll-mx": ["scroll-mr", "scroll-ml"],
			"scroll-my": ["scroll-mt", "scroll-mb"],
			"scroll-p": [
				"scroll-px",
				"scroll-py",
				"scroll-ps",
				"scroll-pe",
				"scroll-pbs",
				"scroll-pbe",
				"scroll-pt",
				"scroll-pr",
				"scroll-pb",
				"scroll-pl"
			],
			"scroll-px": ["scroll-pr", "scroll-pl"],
			"scroll-py": ["scroll-pt", "scroll-pb"],
			touch: [
				"touch-x",
				"touch-y",
				"touch-pz"
			],
			"touch-x": ["touch"],
			"touch-y": ["touch"],
			"touch-pz": ["touch"]
		},
		conflictingClassGroupModifiers: { "font-size": ["leading"] },
		postfixLookupClassGroups: ["container-type"],
		orderSensitiveModifiers: [
			"*",
			"**",
			"after",
			"backdrop",
			"before",
			"details-content",
			"file",
			"first-letter",
			"first-line",
			"marker",
			"placeholder",
			"selection"
		]
	};
};
var mergeConfigs = (baseConfig, { extend = {}, override = {} }) => {
	overrideConfigProperties(baseConfig.theme, override.theme);
	overrideConfigProperties(baseConfig.classGroups, override.classGroups);
	overrideConfigProperties(baseConfig.conflictingClassGroups, override.conflictingClassGroups);
	overrideConfigProperties(baseConfig.conflictingClassGroupModifiers, override.conflictingClassGroupModifiers);
	overrideProperty(baseConfig, "postfixLookupClassGroups", override.postfixLookupClassGroups);
	overrideProperty(baseConfig, "orderSensitiveModifiers", override.orderSensitiveModifiers);
	mergeConfigProperties(baseConfig.theme, extend.theme);
	mergeConfigProperties(baseConfig.classGroups, extend.classGroups);
	mergeConfigProperties(baseConfig.conflictingClassGroups, extend.conflictingClassGroups);
	mergeConfigProperties(baseConfig.conflictingClassGroupModifiers, extend.conflictingClassGroupModifiers);
	mergeArrayProperties(baseConfig, extend, "postfixLookupClassGroups");
	mergeArrayProperties(baseConfig, extend, "orderSensitiveModifiers");
	return baseConfig;
};
var overrideProperty = (baseObject, overrideKey, overrideValue) => {
	if (overrideValue !== void 0) baseObject[overrideKey] = overrideValue;
};
var overrideConfigProperties = (baseObject, overrideObject) => {
	if (overrideObject) for (const key in overrideObject) overrideProperty(baseObject, key, overrideObject[key]);
};
var mergeConfigProperties = (baseObject, mergeObject) => {
	if (mergeObject) for (const key in mergeObject) mergeArrayProperties(baseObject, mergeObject, key);
};
var mergeArrayProperties = (baseObject, mergeObject, key) => {
	const mergeValue = mergeObject[key];
	if (mergeValue !== void 0) baseObject[key] = baseObject[key] ? baseObject[key].concat(mergeValue) : mergeValue;
};
var createMerger = (config) => {
	if (!config) return createTailwindMerge(getDefaultConfig);
	return createTailwindMerge(typeof config === "function" ? () => config(getDefaultConfig()) : () => mergeConfigs(getDefaultConfig(), config));
};
var toMergerConfig = (config) => {
	if (isEmptyObject(config)) return void 0;
	const source = config;
	const extend = { ...source.extend ?? {} };
	for (const key of [
		"theme",
		"classGroups",
		"conflictingClassGroups",
		"conflictingClassGroupModifiers",
		"postfixLookupClassGroups",
		"orderSensitiveModifiers",
		"cacheSize",
		"prefix",
		"separator",
		"experimentalParseClassName"
	]) if (source[key] !== void 0 && extend[key] === void 0) extend[key] = source[key];
	const result = {};
	if (Object.keys(extend).length > 0) result.extend = extend;
	if (source.override != null && !isEmptyObject(source.override)) result.override = source.override;
	if (!result.extend && !result.override) return void 0;
	return result;
};
var createTwMerge = (cachedTwMergeConfig) => {
	const merger = createMerger(toMergerConfig(cachedTwMergeConfig));
	return (classList) => merger.mergeString(classList);
};
var defaultMerger;
var getDefaultMerger = () => {
	if (!defaultMerger) defaultMerger = createMerger();
	return defaultMerger;
};
var ensureConfiguredMerger = () => {
	if (!state.cachedTwMerge || state.didTwMergeConfigChange) {
		state.didTwMergeConfigChange = false;
		state.cachedTwMerge = createTwMerge(state.cachedTwMergeConfig);
	}
	return state.cachedTwMerge;
};
var syncTwMergeConfig = (config) => {
	const next = config == null ? void 0 : config.twMergeConfig;
	if (!next || isEmptyObject(next)) return;
	if (!isEqual(next, state.cachedTwMergeConfig)) {
		state.cachedTwMergeConfig = next;
		state.didTwMergeConfigChange = true;
	}
};
var joinArgs = (classnames) => joinClassValue(classnames);
var IS_V8 = (() => {
	const error = /* @__PURE__ */ new Error();
	return !("line" in error) && !("lineNumber" in error);
})();
var ARG_CACHE_BUCKET_SIZE = 64;
var ARG_CACHE_SIZE = 500;
var argCache = /* @__PURE__ */ new Map();
var previousArgCache = /* @__PURE__ */ new Map();
var argCacheCount = 0;
var clearArgCache = () => {
	argCache = /* @__PURE__ */ new Map();
	previousArgCache = /* @__PURE__ */ new Map();
	argCacheCount = 0;
};
var mergeStringDefault = (joined) => {
	if (!joined) return void 0;
	if (joined.indexOf(" ") === -1) return joined;
	return getDefaultMerger().mergeString(joined) || void 0;
};
var storeArgCache = (firstKey, rest, result) => {
	let target = argCache.get(firstKey);
	if (target === void 0) {
		target = [];
		argCache.set(firstKey, target);
	}
	if (target.length >= ARG_CACHE_BUCKET_SIZE) target.shift();
	target.push({
		rest,
		result
	});
	if (++argCacheCount > ARG_CACHE_SIZE) {
		argCacheCount = 0;
		previousArgCache = argCache;
		argCache = /* @__PURE__ */ new Map();
	}
};
var lookupArgCache = (firstKey, firstKeyIndex, truthyStringCount, length, getItem) => {
	let bucket = argCache.get(firstKey);
	if (bucket === void 0) bucket = previousArgCache.get(firstKey);
	if (bucket === void 0) return void 0;
	for (let entryIndex = 0; entryIndex < bucket.length; entryIndex++) {
		const entry = bucket[entryIndex];
		const rest = entry.rest;
		if (rest.length !== truthyStringCount - 1) continue;
		let restIndex = 0;
		let isMatch = true;
		for (let index = firstKeyIndex + 1; index < length; index++) {
			const item = getItem(index);
			if (!item) continue;
			if (item !== rest[restIndex++]) {
				isMatch = false;
				break;
			}
		}
		if (isMatch) return entry.result;
	}
};
var mergeVariadicFromGetter = (length, getItem) => {
	let firstKey = "";
	let firstKeyIndex = -1;
	let truthyStringCount = 0;
	let everyTruthyIsString = true;
	for (let index = 0; index < length; index++) {
		const item = getItem(index);
		if (!item) continue;
		if (typeof item !== "string") {
			everyTruthyIsString = false;
			break;
		}
		if (firstKeyIndex === -1) {
			firstKey = item;
			firstKeyIndex = index;
		}
		truthyStringCount++;
	}
	if (!everyTruthyIsString) {
		const inputs = new Array(length);
		for (let index = 0; index < length; index++) inputs[index] = getItem(index);
		return mergeStringDefault(joinArgs(inputs));
	}
	if (truthyStringCount === 0) return void 0;
	if (truthyStringCount === 1) return mergeStringDefault(firstKey);
	const cached = lookupArgCache(firstKey, firstKeyIndex, truthyStringCount, length, getItem);
	if (cached !== void 0) return cached || void 0;
	let joined = firstKey;
	const rest = [];
	for (let index = firstKeyIndex + 1; index < length; index++) {
		const item = getItem(index);
		if (!item) continue;
		joined += " " + item;
		rest.push(item);
	}
	const result = mergeStringDefault(joined) ?? "";
	storeArgCache(firstKey, rest, result);
	return result || void 0;
};
var originalStateReset = state.reset.bind(state);
state.reset = () => {
	defaultMerger = void 0;
	clearArgCache();
	originalStateReset();
};
var executeMerge = (classnames, config) => {
	const base = joinArgs(classnames);
	if (!base || !((config == null ? void 0 : config.twMerge) ?? true)) return base || void 0;
	if (base.indexOf(" ") === -1) return base;
	syncTwMergeConfig(config);
	return (Boolean((config == null ? void 0 : config.twMergeConfig) && !isEmptyObject(config.twMergeConfig)) ? ensureConfiguredMerger() : getDefaultMerger().mergeString)(base) || void 0;
};
var cnAdapter = (config, ...classnames) => executeMerge(classnames, config);
var cn = function cn2() {
	const length = arguments.length;
	if (length === 0) return void 0;
	const first = arguments[0];
	if (length === 1) return mergeStringDefault(typeof first === "string" ? first : joinArgs([first]));
	if (IS_V8) return mergeVariadicFromGetter(length, (index) => arguments[index]);
	const inputs = new Array(length);
	for (let index = 0; index < length; index++) inputs[index] = arguments[index];
	return mergeStringDefault(joinArgs(inputs));
};
var runtime = getTailwindVariants(cnAdapter);
var tv = runtime.tv;
runtime.createTV;
var cx2 = cx;
//#endregion
//#region node_modules/@heroui/styles/dist/utils/index.js
/**
* Utility CSS class strings for common component patterns
* These are framework-agnostic and can be used with any styling approach
*/
var focusRingClasses = "focus-visible:ring-focus focus-visible:ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
var disabledClasses = "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-[var(--disabled-opacity)]";
var ariaDisabledClasses = "aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:opacity-[var(--disabled-opacity)]";
//#endregion
//#region node_modules/@heroui/styles/dist/components/accordion/accordion.styles.js
var accordionVariants = tv({
	slots: {
		base: "accordion",
		body: "accordion__body",
		bodyInner: "accordion__body-inner",
		heading: "accordion__heading",
		indicator: "accordion__indicator",
		item: "accordion__item",
		panel: "accordion__panel",
		trigger: "accordion__trigger"
	},
	variants: { variant: {
		default: {},
		surface: { base: "accordion--surface" }
	} }
});
//#endregion
//#region node_modules/@heroui/styles/dist/components/alert/alert.styles.js
var alertVariants = tv({
	defaultVariants: { status: "default" },
	slots: {
		base: "alert",
		content: "alert__content",
		description: "alert__description",
		indicator: "alert__indicator",
		title: "alert__title"
	},
	variants: { status: {
		accent: { base: "alert--accent" },
		danger: { base: "alert--danger" },
		default: { base: "alert--default" },
		success: { base: "alert--success" },
		warning: { base: "alert--warning" }
	} }
});
//#endregion
//#region node_modules/@heroui/styles/dist/components/alert-dialog/alert-dialog.styles.js
var alertDialogVariants = tv({
	defaultVariants: {
		size: "md",
		status: "danger",
		variant: "opaque"
	},
	slots: {
		backdrop: "alert-dialog__backdrop",
		body: "alert-dialog__body",
		closeTrigger: "alert-dialog__close-trigger",
		container: "alert-dialog__container",
		dialog: "alert-dialog__dialog",
		footer: "alert-dialog__footer",
		header: "alert-dialog__header",
		heading: "alert-dialog__heading",
		icon: "alert-dialog__icon",
		trigger: "alert-dialog__trigger"
	},
	variants: {
		size: {
			cover: { dialog: "alert-dialog__dialog--cover" },
			lg: { dialog: "alert-dialog__dialog--lg" },
			md: { dialog: "alert-dialog__dialog--md" },
			sm: { dialog: "alert-dialog__dialog--sm" },
			xs: { dialog: "alert-dialog__dialog--xs" }
		},
		status: {
			accent: { icon: "alert-dialog__icon--accent" },
			danger: { icon: "alert-dialog__icon--danger" },
			default: { icon: "alert-dialog__icon--default" },
			success: { icon: "alert-dialog__icon--success" },
			warning: { icon: "alert-dialog__icon--warning" }
		},
		variant: {
			blur: { backdrop: "alert-dialog__backdrop--blur" },
			opaque: { backdrop: "alert-dialog__backdrop--opaque" },
			transparent: { backdrop: "alert-dialog__backdrop--transparent" }
		}
	}
});
//#endregion
//#region node_modules/@heroui/styles/dist/components/autocomplete/autocomplete.styles.js
var autocompleteVariants = tv({
	defaultVariants: {
		fullWidth: false,
		variant: "primary"
	},
	slots: {
		base: "autocomplete",
		clearButton: "autocomplete__clear-button",
		filter: "autocomplete__filter",
		indicator: "autocomplete__indicator",
		popover: "autocomplete__popover",
		trigger: "autocomplete__trigger",
		value: "autocomplete__value"
	},
	variants: {
		fullWidth: {
			false: {},
			true: {
				base: "autocomplete--full-width",
				trigger: "autocomplete__trigger--full-width"
			}
		},
		variant: {
			primary: { base: "autocomplete--primary" },
			secondary: { base: "autocomplete--secondary" }
		}
	}
});
//#endregion
//#region node_modules/@heroui/styles/dist/components/avatar/avatar.styles.js
var avatarVariants = tv({
	defaultVariants: {
		color: "default",
		size: "md"
	},
	slots: {
		base: "avatar",
		fallback: "avatar__fallback",
		image: "avatar__image"
	},
	variants: {
		color: {
			accent: { fallback: "avatar__fallback--accent" },
			danger: { fallback: "avatar__fallback--danger" },
			default: { fallback: "avatar__fallback--default" },
			success: { fallback: "avatar__fallback--success" },
			warning: { fallback: "avatar__fallback--warning" }
		},
		size: {
			lg: { base: "avatar--lg" },
			md: { base: "avatar--md" },
			sm: { base: "avatar--sm" }
		},
		variant: {
			default: {},
			soft: { base: "avatar--soft" }
		}
	}
});
//#endregion
//#region node_modules/@heroui/styles/dist/components/badge/badge.styles.js
var badgeVariants = tv({
	defaultVariants: {
		color: "default",
		placement: "top-right",
		size: "md",
		variant: "primary"
	},
	slots: {
		anchor: "badge-anchor",
		base: "badge",
		label: "badge__label"
	},
	variants: {
		color: {
			accent: { base: "badge--accent" },
			danger: { base: "badge--danger" },
			default: { base: "badge--default" },
			success: { base: "badge--success" },
			warning: { base: "badge--warning" }
		},
		placement: {
			"bottom-left": { base: "badge--bottom-left" },
			"bottom-right": { base: "badge--bottom-right" },
			"top-left": { base: "badge--top-left" },
			"top-right": { base: "badge--top-right" }
		},
		size: {
			lg: { base: "badge--lg" },
			md: { base: "badge--md" },
			sm: { base: "badge--sm" }
		},
		variant: {
			primary: { base: "badge--primary" },
			secondary: { base: "badge--secondary" },
			soft: { base: "badge--soft" }
		}
	}
});
//#endregion
//#region node_modules/@heroui/styles/dist/components/breadcrumbs/breadcrumbs.styles.js
var breadcrumbsVariants = tv({ slots: {
	base: "breadcrumbs",
	item: "breadcrumbs__item",
	link: "breadcrumbs__link",
	separator: "breadcrumbs__separator"
} });
//#endregion
//#region node_modules/@heroui/styles/dist/components/button/button.styles.js
var buttonVariants = tv({
	base: "button",
	defaultVariants: {
		fullWidth: false,
		isIconOnly: false,
		size: "md",
		variant: "primary"
	},
	variants: {
		fullWidth: {
			false: "",
			true: "button--full-width"
		},
		isIconOnly: { true: "button--icon-only" },
		size: {
			lg: "button--lg",
			md: "button--md",
			sm: "button--sm"
		},
		variant: {
			danger: "button--danger",
			"danger-soft": "button--danger-soft",
			ghost: "button--ghost",
			outline: "button--outline",
			primary: "button--primary",
			secondary: "button--secondary",
			tertiary: "button--tertiary"
		}
	}
});
//#endregion
//#region node_modules/@heroui/styles/dist/components/button-group/button-group.styles.js
var buttonGroupVariants = tv({
	defaultVariants: {
		fullWidth: false,
		orientation: "horizontal"
	},
	slots: {
		base: "button-group",
		separator: "button-group__separator"
	},
	variants: {
		fullWidth: {
			false: {},
			true: { base: "button-group--full-width" }
		},
		orientation: {
			horizontal: { base: "button-group--horizontal" },
			vertical: { base: "button-group--vertical" }
		}
	}
});
//#endregion
//#region node_modules/@heroui/styles/dist/components/calendar/calendar.styles.js
var calendarVariants = tv({
	defaultVariants: {},
	slots: {
		/** Root calendar container */
		base: "calendar",
		/** Calendar cell (td) */
		cell: "calendar__cell",
		/** Cell indicator (small dot at bottom of cell) */
		cellIndicator: "calendar__cell-indicator",
		/** Calendar grid (table) */
		grid: "calendar__grid",
		/** Grid body (tbody) */
		gridBody: "calendar__grid-body",
		/** Grid header (thead) */
		gridHeader: "calendar__grid-header",
		/** Grid row (tr) */
		gridRow: "calendar__grid-row",
		/** Calendar header containing heading and navigation */
		header: "calendar__header",
		/** Header cell (th - day names) */
		headerCell: "calendar__header-cell",
		/** Month/year heading text */
		heading: "calendar__heading",
		/** Previous/Next navigation button */
		navButton: "calendar__nav-button",
		/** Navigation button icon */
		navButtonIcon: "calendar__nav-button-icon"
	},
	variants: {}
});
//#endregion
//#region node_modules/@heroui/styles/dist/components/calendar-year-picker/calendar-year-picker.styles.js
var calendarYearPickerVariants = tv({ slots: {
	trigger: "calendar-year-picker__trigger",
	triggerHeading: "calendar-year-picker__trigger-heading",
	triggerIndicator: "calendar-year-picker__trigger-indicator",
	yearCell: "calendar-year-picker__year-cell",
	yearGrid: "calendar-year-picker__year-grid"
} });
//#endregion
//#region node_modules/@heroui/styles/dist/components/range-calendar/range-calendar.styles.js
var rangeCalendarVariants = tv({
	defaultVariants: {},
	slots: {
		/** Root range calendar container */
		base: "range-calendar",
		/** Calendar cell (td) */
		cell: "range-calendar__cell",
		/** Cell indicator (small dot at bottom of cell) */
		cellIndicator: "range-calendar__cell-indicator",
		/** Calendar grid (table) */
		grid: "range-calendar__grid",
		/** Grid body (tbody) */
		gridBody: "range-calendar__grid-body",
		/** Grid header (thead) */
		gridHeader: "range-calendar__grid-header",
		/** Grid row (tr) */
		gridRow: "range-calendar__grid-row",
		/** Calendar header containing heading and navigation */
		header: "range-calendar__header",
		/** Header cell (th - day names) */
		headerCell: "range-calendar__header-cell",
		/** Month/year heading text */
		heading: "range-calendar__heading",
		/** Previous/Next navigation button */
		navButton: "range-calendar__nav-button",
		/** Navigation button icon */
		navButtonIcon: "range-calendar__nav-button-icon"
	},
	variants: {}
});
//#endregion
//#region node_modules/@heroui/styles/dist/components/card/card.styles.js
var cardVariants = tv({
	defaultVariants: { variant: "default" },
	slots: {
		base: "card",
		content: "card__content",
		description: "card__description",
		footer: "card__footer",
		header: "card__header",
		title: "card__title"
	},
	variants: { variant: {
		default: { base: "card--default" },
		secondary: { base: "card--secondary" },
		tertiary: { base: "card--tertiary" },
		transparent: { base: "card--transparent" }
	} }
});
//#endregion
//#region node_modules/@heroui/styles/dist/components/checkbox/checkbox.styles.js
var checkboxVariants = tv({
	defaultVariants: { variant: "primary" },
	slots: {
		base: "checkbox",
		content: "checkbox__content",
		control: "checkbox__control",
		indicator: "checkbox__indicator"
	},
	variants: { variant: {
		primary: { base: "checkbox--primary" },
		secondary: { base: "checkbox--secondary" }
	} }
});
//#endregion
//#region node_modules/@heroui/styles/dist/components/checkbox-group/checkbox-group.styles.js
var checkboxGroupVariants = tv({
	base: "checkbox-group",
	defaultVariants: { variant: "primary" },
	variants: { variant: {
		primary: "checkbox-group--primary",
		secondary: "checkbox-group--secondary"
	} }
});
//#endregion
//#region node_modules/@heroui/styles/dist/components/chip/chip.styles.js
var chipVariants = tv({
	defaultVariants: {
		color: "default",
		variant: "secondary"
	},
	slots: {
		base: "chip",
		label: "chip__label"
	},
	variants: {
		color: {
			accent: { base: "chip--accent" },
			danger: { base: "chip--danger" },
			default: { base: "chip--default" },
			success: { base: "chip--success" },
			warning: { base: "chip--warning" }
		},
		size: {
			lg: { base: "chip--lg" },
			md: { base: "chip--md" },
			sm: { base: "chip--sm" }
		},
		variant: {
			primary: { base: "chip--primary" },
			secondary: { base: "chip--secondary" },
			soft: { base: "chip--soft" },
			tertiary: { base: "chip--tertiary" }
		}
	}
});
//#endregion
//#region node_modules/@heroui/styles/dist/components/color-area/color-area.styles.js
var colorAreaVariants = tv({
	defaultVariants: { showDots: false },
	slots: {
		base: "color-area",
		thumb: "color-area__thumb"
	},
	variants: { showDots: {
		false: {},
		true: { base: "color-area--show-dots" }
	} }
});
//#endregion
//#region node_modules/@heroui/styles/dist/components/color-field/color-field.styles.js
var colorFieldVariants = tv({
	base: "color-field",
	defaultVariants: { fullWidth: false },
	variants: { fullWidth: {
		false: "",
		true: "color-field--full-width"
	} }
});
//#endregion
//#region node_modules/@heroui/styles/dist/components/color-input-group/color-input-group.styles.js
var colorInputGroupVariants = tv({
	defaultVariants: {
		fullWidth: false,
		variant: "primary"
	},
	slots: {
		base: "color-input-group",
		input: "color-input-group__input",
		prefix: "color-input-group__prefix",
		suffix: "color-input-group__suffix"
	},
	variants: {
		fullWidth: {
			false: {},
			true: { base: "color-input-group--full-width" }
		},
		variant: {
			primary: { base: "color-input-group--primary" },
			secondary: { base: "color-input-group--secondary" }
		}
	}
});
//#endregion
//#region node_modules/@heroui/styles/dist/components/color-picker/color-picker.styles.js
var colorPickerVariants = tv({ slots: {
	base: "color-picker",
	popover: "color-picker__popover",
	trigger: "color-picker__trigger"
} });
//#endregion
//#region node_modules/@heroui/styles/dist/components/color-slider/color-slider.styles.js
var colorSliderVariants = tv({ slots: {
	base: "color-slider",
	output: "color-slider__output",
	thumb: "color-slider__thumb",
	track: "color-slider__track"
} });
//#endregion
//#region node_modules/@heroui/styles/dist/components/color-swatch/color-swatch.styles.js
var colorSwatchVariants = tv({
	base: "color-swatch",
	defaultVariants: {
		shape: "circle",
		size: "md"
	},
	variants: {
		shape: {
			circle: "color-swatch--circle",
			square: "color-swatch--square"
		},
		size: {
			lg: "color-swatch--lg",
			md: "color-swatch--md",
			sm: "color-swatch--sm",
			xl: "color-swatch--xl",
			xs: "color-swatch--xs"
		}
	}
});
//#endregion
//#region node_modules/@heroui/styles/dist/components/close-button/close-button.styles.js
var closeButtonVariants = tv({
	base: "close-button",
	defaultVariants: { variant: "default" },
	variants: { variant: { default: "close-button--default" } }
});
//#endregion
//#region node_modules/@heroui/styles/dist/components/color-swatch-picker/color-swatch-picker.styles.js
var colorSwatchPickerVariants = tv({
	defaultVariants: {
		layout: "grid",
		size: "md",
		variant: "circle"
	},
	slots: {
		base: "color-swatch-picker",
		indicator: "color-swatch-picker__indicator",
		item: "color-swatch-picker__item",
		swatch: "color-swatch-picker__swatch"
	},
	variants: {
		layout: {
			grid: { base: "color-swatch-picker--grid" },
			stack: { base: "color-swatch-picker--stack" }
		},
		size: {
			lg: { base: "color-swatch-picker--lg" },
			md: { base: "color-swatch-picker--md" },
			sm: { base: "color-swatch-picker--sm" },
			xl: { base: "color-swatch-picker--xl" },
			xs: { base: "color-swatch-picker--xs" }
		},
		variant: {
			circle: { base: "color-swatch-picker--circle" },
			square: { base: "color-swatch-picker--square" }
		}
	}
});
//#endregion
//#region node_modules/@heroui/styles/dist/components/combo-box/combo-box.styles.js
var comboBoxVariants = tv({
	defaultVariants: { fullWidth: false },
	slots: {
		base: "combo-box",
		inputGroup: "combo-box__input-group",
		popover: "combo-box__popover",
		trigger: "combo-box__trigger",
		value: "combo-box__value"
	},
	variants: { fullWidth: {
		false: {},
		true: {
			base: "combo-box--full-width",
			inputGroup: "combo-box__input-group--full-width"
		}
	} }
});
//#endregion
//#region node_modules/@heroui/styles/dist/components/date-field/date-field.styles.js
var dateFieldVariants = tv({
	base: "date-field",
	defaultVariants: { fullWidth: false },
	variants: { fullWidth: {
		false: "",
		true: "date-field--full-width"
	} }
});
//#endregion
//#region node_modules/@heroui/styles/dist/components/date-picker/date-picker.styles.js
var datePickerVariants = tv({ slots: {
	base: "date-picker",
	popover: "date-picker__popover",
	trigger: "date-picker__trigger",
	triggerIndicator: "date-picker__trigger-indicator"
} });
//#endregion
//#region node_modules/@heroui/styles/dist/components/date-range-picker/date-range-picker.styles.js
var dateRangePickerVariants = tv({ slots: {
	base: "date-range-picker",
	popover: "date-range-picker__popover",
	rangeSeparator: "date-range-picker__range-separator",
	trigger: "date-range-picker__trigger",
	triggerIndicator: "date-range-picker__trigger-indicator"
} });
//#endregion
//#region node_modules/@heroui/styles/dist/components/date-input-group/date-input-group.styles.js
var dateInputGroupVariants = tv({
	defaultVariants: {
		fullWidth: false,
		variant: "primary"
	},
	slots: {
		base: "date-input-group",
		input: "date-input-group__input",
		inputContainer: "date-input-group__input-container",
		prefix: "date-input-group__prefix",
		segment: "date-input-group__segment",
		suffix: "date-input-group__suffix"
	},
	variants: {
		fullWidth: {
			false: {},
			true: { base: "date-input-group--full-width" }
		},
		variant: {
			primary: { base: "date-input-group--primary" },
			secondary: { base: "date-input-group--secondary" }
		}
	}
});
//#endregion
//#region node_modules/@heroui/styles/dist/components/description/description.styles.js
var descriptionVariants = tv({ base: "description" });
//#endregion
//#region node_modules/@heroui/styles/dist/components/drawer/drawer.styles.js
var drawerVariants = tv({
	defaultVariants: {
		placement: "bottom",
		variant: "opaque"
	},
	slots: {
		backdrop: "drawer__backdrop",
		body: "drawer__body",
		closeTrigger: "drawer__close-trigger",
		content: "drawer__content",
		dialog: "drawer__dialog",
		footer: "drawer__footer",
		handle: "drawer__handle",
		header: "drawer__header",
		heading: "drawer__heading",
		trigger: "drawer__trigger"
	},
	variants: {
		placement: {
			bottom: {
				content: "drawer__content--bottom",
				dialog: "drawer__dialog--bottom"
			},
			left: {
				content: "drawer__content--left",
				dialog: "drawer__dialog--left"
			},
			right: {
				content: "drawer__content--right",
				dialog: "drawer__dialog--right"
			},
			top: {
				content: "drawer__content--top",
				dialog: "drawer__dialog--top"
			}
		},
		variant: {
			blur: { backdrop: "drawer__backdrop--blur" },
			opaque: { backdrop: "drawer__backdrop--opaque" },
			transparent: { backdrop: "drawer__backdrop--transparent" }
		}
	}
});
//#endregion
//#region node_modules/@heroui/styles/dist/components/disclosure/disclosure.styles.js
var disclosureVariants = tv({
	defaultVariants: {},
	slots: {
		base: "disclosure",
		body: "disclosure__body",
		bodyInner: "disclosure__body-inner",
		content: "disclosure__content",
		heading: "disclosure__heading",
		indicator: "disclosure__indicator",
		trigger: "disclosure__trigger"
	},
	variants: {}
});
//#endregion
//#region node_modules/@heroui/styles/dist/components/disclosure-group/disclosure-group.styles.js
var disclosureGroupVariants = tv({
	defaultVariants: {},
	slots: { base: "disclosure-group" },
	variants: {}
});
//#endregion
//#region node_modules/@heroui/styles/dist/components/dropdown/dropdown.styles.js
var dropdownVariants = tv({ slots: {
	menu: "dropdown__menu",
	popover: "dropdown__popover",
	root: "dropdown",
	trigger: "dropdown__trigger"
} });
//#endregion
//#region node_modules/@heroui/styles/dist/components/empty-state/empty-state.styles.js
var emptyStateVariants = tv({ base: "empty-state" });
//#endregion
//#region node_modules/@heroui/styles/dist/components/error-message/error-message.styles.js
var errorMessageVariants = tv({ base: "error-message" });
//#endregion
//#region node_modules/@heroui/styles/dist/components/field-error/field-error.styles.js
var fieldErrorVariants = tv({ base: "field-error" });
//#endregion
//#region node_modules/@heroui/styles/dist/components/fieldset/fieldset.styles.js
var fieldsetVariants = tv({ slots: {
	actions: "fieldset__actions",
	base: "fieldset",
	description: "fieldset__description",
	fieldGroup: "fieldset__field_group",
	legend: "fieldset__legend"
} });
//#endregion
//#region node_modules/@heroui/styles/dist/components/header/header.styles.js
var headerVariants = tv({ base: "header" });
//#endregion
//#region node_modules/@heroui/styles/dist/components/input/input.styles.js
var inputVariants = tv({
	base: "input",
	defaultVariants: {
		fullWidth: false,
		variant: "primary"
	},
	variants: {
		fullWidth: {
			false: "",
			true: "input--full-width"
		},
		variant: {
			primary: "input--primary",
			secondary: "input--secondary"
		}
	}
});
//#endregion
//#region node_modules/@heroui/styles/dist/components/input-group/input-group.styles.js
var inputGroupVariants = tv({
	defaultVariants: {
		fullWidth: false,
		variant: "primary"
	},
	slots: {
		base: "input-group",
		input: "input-group__input",
		prefix: "input-group__prefix",
		suffix: "input-group__suffix"
	},
	variants: {
		fullWidth: {
			false: {},
			true: { base: "input-group--full-width" }
		},
		variant: {
			primary: { base: "input-group--primary" },
			secondary: { base: "input-group--secondary" }
		}
	}
});
//#endregion
//#region node_modules/@heroui/styles/dist/components/input-otp/input-otp.styles.js
var inputOTPVariants = tv({
	defaultVariants: { variant: "primary" },
	slots: {
		base: "input-otp",
		caret: "input-otp__caret",
		group: "input-otp__group",
		input: "input-otp__input",
		separator: "input-otp__separator",
		slot: "input-otp__slot",
		slotValue: "input-otp__slot-value"
	},
	variants: { variant: {
		primary: { base: "input-otp--primary" },
		secondary: { base: "input-otp--secondary" }
	} }
});
//#endregion
//#region node_modules/@heroui/styles/dist/components/kbd/kbd.styles.js
var kbdVariants = tv({
	defaultVariants: {},
	slots: {
		abbr: "kbd__abbr",
		base: "kbd",
		content: "kbd__content"
	},
	variants: { variant: {
		default: "kbd--default",
		light: "kbd--light"
	} }
});
//#endregion
//#region node_modules/@heroui/styles/dist/components/label/label.styles.js
var labelVariants = tv({
	base: "label",
	defaultVariants: {
		isDisabled: false,
		isInvalid: false,
		isRequired: false
	},
	variants: {
		isDisabled: { true: "label--disabled" },
		isInvalid: { true: "label--invalid" },
		isRequired: { true: "label--required" }
	}
});
//#endregion
//#region node_modules/@heroui/styles/dist/components/link/link.styles.js
var linkVariants = tv({ slots: {
	base: "link",
	icon: "link__icon"
} });
//#endregion
//#region node_modules/@heroui/styles/dist/components/list-box/list-box.styles.js
var listboxVariants = tv({
	base: "list-box",
	defaultVariants: { variant: "default" },
	variants: { variant: {
		danger: "list-box--danger",
		default: "list-box--default"
	} }
});
//#endregion
//#region node_modules/@heroui/styles/dist/components/list-box-item/list-box-item.styles.js
var listboxItemVariants = tv({
	defaultVariants: { variant: "default" },
	slots: {
		indicator: "list-box-item__indicator",
		item: "list-box-item"
	},
	variants: { variant: {
		danger: { item: "list-box-item--danger" },
		default: { item: "list-box-item--default" }
	} }
});
//#endregion
//#region node_modules/@heroui/styles/dist/components/list-box-section/list-box-section.styles.js
var listboxSectionVariants = tv({ base: "list-box-section" });
//#endregion
//#region node_modules/@heroui/styles/dist/components/menu/menu.styles.js
var menuVariants = tv({ base: "menu" });
//#endregion
//#region node_modules/@heroui/styles/dist/components/meter/meter.styles.js
var meterVariants = tv({
	defaultVariants: {
		color: "accent",
		size: "md"
	},
	slots: {
		base: "meter",
		fill: "meter__fill",
		output: "meter__output",
		track: "meter__track"
	},
	variants: {
		color: {
			accent: { base: "meter--accent" },
			danger: { base: "meter--danger" },
			default: { base: "meter--default" },
			success: { base: "meter--success" },
			warning: { base: "meter--warning" }
		},
		size: {
			lg: { base: "meter--lg" },
			md: { base: "meter--md" },
			sm: { base: "meter--sm" }
		}
	}
});
//#endregion
//#region node_modules/@heroui/styles/dist/components/progress-bar/progress-bar.styles.js
var progressBarVariants = tv({
	defaultVariants: {
		color: "accent",
		size: "md"
	},
	slots: {
		base: "progress-bar",
		fill: "progress-bar__fill",
		output: "progress-bar__output",
		track: "progress-bar__track"
	},
	variants: {
		color: {
			accent: { base: "progress-bar--accent" },
			danger: { base: "progress-bar--danger" },
			default: { base: "progress-bar--default" },
			success: { base: "progress-bar--success" },
			warning: { base: "progress-bar--warning" }
		},
		size: {
			lg: { base: "progress-bar--lg" },
			md: { base: "progress-bar--md" },
			sm: { base: "progress-bar--sm" }
		}
	}
});
//#endregion
//#region node_modules/@heroui/styles/dist/components/progress-circle/progress-circle.styles.js
var progressCircleVariants = tv({
	defaultVariants: {
		color: "accent",
		size: "md"
	},
	slots: {
		base: "progress-circle",
		fillCircle: "progress-circle__fill-circle",
		track: "progress-circle__track",
		trackCircle: "progress-circle__track-circle"
	},
	variants: {
		color: {
			accent: { base: "progress-circle--accent" },
			danger: { base: "progress-circle--danger" },
			default: { base: "progress-circle--default" },
			success: { base: "progress-circle--success" },
			warning: { base: "progress-circle--warning" }
		},
		size: {
			lg: { base: "progress-circle--lg" },
			md: { base: "progress-circle--md" },
			sm: { base: "progress-circle--sm" }
		}
	}
});
//#endregion
//#region node_modules/@heroui/styles/dist/components/menu-item/menu-item.styles.js
var menuItemVariants = tv({
	defaultVariants: { variant: "default" },
	slots: {
		indicator: "menu-item__indicator",
		item: "menu-item",
		submenuIndicator: "menu-item__indicator menu-item__indicator--submenu"
	},
	variants: { variant: {
		danger: { item: "menu-item--danger" },
		default: { item: "menu-item--default" }
	} }
});
//#endregion
//#region node_modules/@heroui/styles/dist/components/menu-section/menu-section.styles.js
var menuSectionVariants = tv({ base: "menu-section" });
//#endregion
//#region node_modules/@heroui/styles/dist/components/modal/modal.styles.js
var modalVariants = tv({
	defaultVariants: {
		scroll: "inside",
		size: "md",
		variant: "opaque"
	},
	slots: {
		backdrop: "modal__backdrop",
		body: "modal__body",
		closeTrigger: "modal__close-trigger",
		container: "modal__container",
		dialog: "modal__dialog",
		footer: "modal__footer",
		header: "modal__header",
		heading: "modal__heading",
		icon: "modal__icon",
		trigger: "modal__trigger"
	},
	variants: {
		scroll: {
			inside: {
				body: "modal__body--scroll-inside",
				dialog: "modal__dialog--scroll-inside"
			},
			outside: {
				body: "modal__body--scroll-outside",
				container: "modal__container--scroll-outside",
				dialog: "modal__dialog--scroll-outside"
			}
		},
		size: {
			cover: { dialog: "modal__dialog--cover" },
			full: {
				container: "modal__container--full",
				dialog: "modal__dialog--full"
			},
			lg: { dialog: "modal__dialog--lg" },
			md: { dialog: "modal__dialog--md" },
			sm: { dialog: "modal__dialog--sm" },
			xs: { dialog: "modal__dialog--xs" }
		},
		variant: {
			blur: { backdrop: "modal__backdrop--blur" },
			opaque: { backdrop: "modal__backdrop--opaque" },
			transparent: { backdrop: "modal__backdrop--transparent" }
		}
	}
});
//#endregion
//#region node_modules/@heroui/styles/dist/components/number-field/number-field.styles.js
var numberFieldVariants = tv({
	defaultVariants: {
		fullWidth: false,
		variant: "primary"
	},
	slots: {
		base: "number-field",
		decrementButton: "number-field__decrement-button",
		group: "number-field__group",
		incrementButton: "number-field__increment-button",
		input: "number-field__input"
	},
	variants: {
		fullWidth: {
			false: {},
			true: {
				base: "number-field--full-width",
				group: "number-field__group--full-width"
			}
		},
		variant: {
			primary: { base: "number-field--primary" },
			secondary: { base: "number-field--secondary" }
		}
	}
});
//#endregion
//#region node_modules/@heroui/styles/dist/components/pagination/pagination.styles.js
var paginationVariants = tv({
	defaultVariants: { size: "md" },
	slots: {
		base: "pagination",
		content: "pagination__content",
		ellipsis: "pagination__ellipsis",
		item: "pagination__item",
		link: "pagination__link",
		summary: "pagination__summary"
	},
	variants: { size: {
		lg: { base: "pagination--lg" },
		md: { base: "pagination--md" },
		sm: { base: "pagination--sm" }
	} }
});
//#endregion
//#region node_modules/@heroui/styles/dist/components/popover/popover.styles.js
var popoverVariants = tv({ slots: {
	base: "popover",
	dialog: "popover__dialog",
	heading: "popover__heading",
	trigger: "popover__trigger"
} });
//#endregion
//#region node_modules/@heroui/styles/dist/components/radio/radio.styles.js
var radioVariants = tv({ slots: {
	base: "radio",
	content: "radio__content",
	control: "radio__control",
	indicator: "radio__indicator"
} });
//#endregion
//#region node_modules/@heroui/styles/dist/components/radio-group/radio-group.styles.js
var radioGroupVariants = tv({
	base: "radio-group",
	defaultVariants: { variant: "primary" },
	variants: { variant: {
		primary: "radio-group--primary",
		secondary: "radio-group--secondary"
	} }
});
//#endregion
//#region node_modules/@heroui/styles/dist/components/scroll-shadow/scroll-shadow.styles.js
var scrollShadowVariants = tv({
	defaultVariants: {
		hideScrollBar: false,
		orientation: "vertical",
		variant: "fade"
	},
	slots: { base: "scroll-shadow" },
	variants: {
		hideScrollBar: {
			false: {},
			true: { base: "scroll-shadow--hide-scrollbar" }
		},
		orientation: {
			horizontal: { base: "scroll-shadow--horizontal" },
			vertical: { base: "scroll-shadow--vertical" }
		},
		variant: { fade: { base: "scroll-shadow--fade" } }
	}
});
//#endregion
//#region node_modules/@heroui/styles/dist/components/search-field/search-field.styles.js
var searchFieldVariants = tv({
	defaultVariants: {
		fullWidth: false,
		variant: "primary"
	},
	slots: {
		base: "search-field",
		clearButton: "search-field__clear-button",
		group: "search-field__group",
		input: "search-field__input",
		searchIcon: "search-field__search-icon"
	},
	variants: {
		fullWidth: {
			false: {},
			true: {
				base: "search-field--full-width",
				group: "search-field__group--full-width"
			}
		},
		variant: {
			primary: { base: "search-field--primary" },
			secondary: { base: "search-field--secondary" }
		}
	}
});
//#endregion
//#region node_modules/@heroui/styles/dist/components/select/select.styles.js
var selectVariants = tv({
	defaultVariants: {
		fullWidth: false,
		variant: "primary"
	},
	slots: {
		base: "select",
		indicator: "select__indicator",
		popover: "select__popover",
		trigger: "select__trigger",
		value: "select__value"
	},
	variants: {
		fullWidth: {
			false: {},
			true: {
				base: "select--full-width",
				trigger: "select__trigger--full-width"
			}
		},
		variant: {
			primary: { base: "select--primary" },
			secondary: { base: "select--secondary" }
		}
	}
});
//#endregion
//#region node_modules/@heroui/styles/dist/components/separator/separator.styles.js
var separatorVariants = tv({
	base: "separator",
	defaultVariants: {
		orientation: "horizontal",
		variant: "default"
	},
	variants: {
		orientation: {
			horizontal: "separator--horizontal",
			vertical: "separator--vertical"
		},
		variant: {
			default: "separator--default",
			secondary: "separator--secondary",
			tertiary: "separator--tertiary"
		}
	}
});
//#endregion
//#region node_modules/@heroui/styles/dist/components/skeleton/skeleton.styles.js
var skeletonVariants = tv({
	defaultVariants: { animationType: "shimmer" },
	slots: { base: "skeleton" },
	variants: { animationType: {
		none: "skeleton--none",
		pulse: "skeleton--pulse",
		shimmer: "skeleton--shimmer"
	} }
});
//#endregion
//#region node_modules/@heroui/styles/dist/components/slider/slider.styles.js
var sliderVariants = tv({ slots: {
	base: "slider",
	fill: "slider__fill",
	marks: "slider__marks",
	output: "slider__output",
	thumb: "slider__thumb",
	track: "slider__track"
} });
//#endregion
//#region node_modules/@heroui/styles/dist/components/spinner/spinner.styles.js
var spinnerVariants = tv({
	base: "spinner",
	defaultVariants: {
		color: "accent",
		size: "md"
	},
	variants: {
		color: {
			accent: "spinner--accent",
			current: "spinner--current",
			danger: "spinner--danger",
			success: "spinner--success",
			warning: "spinner--warning"
		},
		size: {
			lg: "spinner--lg",
			md: "spinner--md",
			sm: "spinner--sm",
			xl: "spinner--xl"
		}
	}
});
//#endregion
//#region node_modules/@heroui/styles/dist/components/surface/surface.styles.js
var surfaceVariants = tv({
	base: "surface",
	defaultVariants: { variant: "default" },
	variants: { variant: {
		default: "surface--default",
		secondary: "surface--secondary",
		tertiary: "surface--tertiary",
		transparent: "surface--transparent"
	} }
});
//#endregion
//#region node_modules/@heroui/styles/dist/components/switch/switch.styles.js
var switchVariants = tv({
	defaultVariants: { size: "md" },
	slots: {
		base: "switch",
		content: "switch__content",
		control: "switch__control",
		icon: "switch__icon",
		thumb: "switch__thumb"
	},
	variants: { size: {
		lg: { base: "switch--lg" },
		md: { base: "switch--md" },
		sm: { base: "switch--sm" }
	} }
});
//#endregion
//#region node_modules/@heroui/styles/dist/components/switch-group/switch-group.styles.js
var switchGroupVariants = tv({
	defaultVariants: { orientation: "vertical" },
	slots: {
		base: "switch-group",
		items: "switch-group__items"
	},
	variants: { orientation: {
		horizontal: { base: "switch-group--horizontal" },
		vertical: { base: "switch-group--vertical" }
	} }
});
//#endregion
//#region node_modules/@heroui/styles/dist/components/table/table.styles.js
var tableVariants = tv({
	defaultVariants: { variant: "primary" },
	slots: {
		base: "table-root",
		body: "table__body",
		cell: "table__cell",
		column: "table__column",
		columnResizer: "table__column-resizer",
		content: "table__content",
		footer: "table__footer",
		header: "table__header",
		loadMore: "table__load-more",
		loadMoreContent: "table__load-more-content",
		resizableContainer: "table__resizable-container",
		row: "table__row",
		scrollContainer: "table__scroll-container",
		sortableColumnHeader: "table__sortable-column-header",
		sortableColumnIndicator: "table__sortable-column-indicator"
	},
	variants: { variant: {
		primary: { base: "table-root--primary" },
		secondary: { base: "table-root--secondary" }
	} }
});
//#endregion
//#region node_modules/@heroui/styles/dist/components/tabs/tabs.styles.js
var tabsVariants = tv({
	defaultVariants: { variant: "primary" },
	slots: {
		base: "tabs",
		scrollNext: "tabs__list-container__scroll-next",
		scrollPrev: "tabs__list-container__scroll-prev",
		scroller: "tabs__list-container__scroller",
		separator: "tabs__separator",
		tab: "tabs__tab",
		tabIndicator: "tabs__indicator",
		tabList: "tabs__list",
		tabListContainer: "tabs__list-container",
		tabPanel: "tabs__panel"
	},
	variants: { variant: {
		primary: {},
		secondary: { base: "tabs--secondary" }
	} }
});
//#endregion
//#region node_modules/@heroui/styles/dist/components/tag/tag.styles.js
var tagVariants = tv({
	defaultVariants: {
		size: "md",
		variant: "default"
	},
	slots: {
		base: "tag",
		removeButton: "tag__remove-button"
	},
	variants: {
		size: {
			lg: { base: "tag--lg" },
			md: { base: "tag--md" },
			sm: { base: "tag--sm" }
		},
		variant: {
			default: { base: "tag--default" },
			surface: { base: "tag--surface" }
		}
	}
});
//#endregion
//#region node_modules/@heroui/styles/dist/components/tag-group/tag-group.styles.js
var tagGroupVariants = tv({ slots: {
	base: "tag-group",
	list: "tag-group__list"
} });
//#endregion
//#region node_modules/@heroui/styles/dist/components/typography/typography.styles.js
var typographyVariants = tv({
	defaultVariants: {
		align: "start",
		color: "default",
		type: "body"
	},
	slots: {
		base: "typography",
		prose: "typography-prose"
	},
	variants: {
		align: {
			center: "typography--align-center",
			end: "typography--align-end",
			justify: "typography--align-justify",
			start: "typography--align-start"
		},
		color: {
			default: "typography--color-default",
			muted: "typography--color-muted"
		},
		truncate: { true: "typography--truncate" },
		type: {
			body: "typography--body",
			"body-sm": "typography--body-sm",
			"body-xs": "typography--body-xs",
			code: "typography--code",
			h1: "typography--h1",
			h2: "typography--h2",
			h3: "typography--h3",
			h4: "typography--h4",
			h5: "typography--h5",
			h6: "typography--h6"
		},
		weight: {
			bold: "typography--weight-bold",
			medium: "typography--weight-medium",
			normal: "typography--weight-normal",
			semibold: "typography--weight-semibold"
		}
	}
});
//#endregion
//#region node_modules/@heroui/styles/dist/components/textfield/textfield.styles.js
var textFieldVariants = tv({
	base: "textfield",
	defaultVariants: { fullWidth: false },
	variants: { fullWidth: {
		false: "",
		true: "textfield--full-width"
	} }
});
//#endregion
//#region node_modules/@heroui/styles/dist/components/textarea/textarea.styles.js
var textAreaVariants = tv({
	base: "textarea",
	defaultVariants: {
		fullWidth: false,
		variant: "primary"
	},
	variants: {
		fullWidth: {
			false: "",
			true: "textarea--full-width"
		},
		variant: {
			primary: "textarea--primary",
			secondary: "textarea--secondary"
		}
	}
});
//#endregion
//#region node_modules/@heroui/styles/dist/components/time-field/time-field.styles.js
var timeFieldVariants = tv({
	base: "time-field",
	defaultVariants: { fullWidth: false },
	variants: { fullWidth: {
		false: "",
		true: "time-field--full-width"
	} }
});
//#endregion
//#region node_modules/@heroui/styles/dist/components/toast/toast.styles.js
var toastVariants = tv({
	defaultVariants: {
		placement: "bottom",
		variant: "default"
	},
	slots: {
		action: "toast__action",
		close: "toast__close-button",
		content: "toast__content",
		description: "toast__description",
		indicator: "toast__indicator",
		region: "toast-region",
		title: "toast__title",
		toast: "toast"
	},
	variants: {
		placement: {
			bottom: {
				region: "toast-region--bottom",
				toast: "toast--bottom"
			},
			"bottom end": {
				region: "toast-region--bottom-end",
				toast: "toast--bottom-end"
			},
			"bottom start": {
				region: "toast-region--bottom-start",
				toast: "toast--bottom-start"
			},
			top: {
				region: "toast-region--top",
				toast: "toast--top"
			},
			"top end": {
				region: "toast-region--top-end",
				toast: "toast--top-end"
			},
			"top start": {
				region: "toast-region--top-start",
				toast: "toast--top-start"
			}
		},
		variant: {
			accent: { toast: "toast--accent" },
			danger: { toast: "toast--danger" },
			default: { toast: "toast--default" },
			success: { toast: "toast--success" },
			warning: { toast: "toast--warning" }
		}
	}
});
//#endregion
//#region node_modules/@heroui/styles/dist/components/toggle-button/toggle-button.styles.js
var toggleButtonVariants = tv({
	base: "toggle-button",
	defaultVariants: {
		isIconOnly: false,
		size: "md",
		variant: "default"
	},
	variants: {
		isIconOnly: { true: "toggle-button--icon-only" },
		size: {
			lg: "toggle-button--lg",
			md: "toggle-button--md",
			sm: "toggle-button--sm"
		},
		variant: {
			default: "toggle-button--default",
			ghost: "toggle-button--ghost"
		}
	}
});
//#endregion
//#region node_modules/@heroui/styles/dist/components/toggle-button-group/toggle-button-group.styles.js
var toggleButtonGroupVariants = tv({
	defaultVariants: {
		fullWidth: false,
		isDetached: false,
		orientation: "horizontal"
	},
	slots: {
		base: "toggle-button-group",
		separator: "toggle-button-group__separator"
	},
	variants: {
		fullWidth: {
			false: {},
			true: { base: "toggle-button-group--full-width" }
		},
		isDetached: {
			false: {},
			true: { base: "toggle-button-group--detached" }
		},
		orientation: {
			horizontal: { base: "toggle-button-group--horizontal" },
			vertical: { base: "toggle-button-group--vertical" }
		}
	}
});
//#endregion
//#region node_modules/@heroui/styles/dist/components/toolbar/toolbar.styles.js
var toolbarVariants = tv({
	base: "toolbar",
	defaultVariants: {
		isAttached: false,
		orientation: "horizontal"
	},
	variants: {
		isAttached: { true: "toolbar--attached" },
		orientation: {
			horizontal: "toolbar--horizontal",
			vertical: "toolbar--vertical"
		}
	}
});
//#endregion
//#region node_modules/@heroui/styles/dist/components/tooltip/tooltip.styles.js
var tooltipVariants = tv({ slots: {
	base: "tooltip",
	trigger: "tooltip__trigger"
} });
//#endregion
export { drawerVariants as $, menuSectionVariants as A, ariaDisabledClasses as At, labelVariants as B, scrollShadowVariants as C, breadcrumbsVariants as Ct, paginationVariants as D, alertDialogVariants as Dt, popoverVariants as E, autocompleteVariants as Et, menuVariants as F, tv as Ft, headerVariants as G, inputOTPVariants as H, listboxSectionVariants as I, errorMessageVariants as J, fieldsetVariants as K, listboxItemVariants as L, progressCircleVariants as M, focusRingClasses as Mt, progressBarVariants as N, cn as Nt, numberFieldVariants as O, alertVariants as Ot, meterVariants as P, cx2 as Pt, disclosureVariants as Q, listboxVariants as R, searchFieldVariants as S, buttonVariants as St, radioVariants as T, avatarVariants as Tt, inputGroupVariants as U, kbdVariants as V, inputVariants as W, dropdownVariants as X, emptyStateVariants as Y, disclosureGroupVariants as Z, spinnerVariants as _, cardVariants as _t, toastVariants as a, comboBoxVariants as at, separatorVariants as b, calendarVariants as bt, textFieldVariants as c, colorSwatchVariants as ct, tagVariants as d, colorInputGroupVariants as dt, descriptionVariants as et, tabsVariants as f, colorFieldVariants as ft, surfaceVariants as g, checkboxVariants as gt, switchVariants as h, checkboxGroupVariants as ht, toggleButtonVariants as i, dateFieldVariants as it, menuItemVariants as j, disabledClasses as jt, modalVariants as k, accordionVariants as kt, typographyVariants as l, colorSliderVariants as lt, switchGroupVariants as m, chipVariants as mt, toolbarVariants as n, dateRangePickerVariants as nt, timeFieldVariants as o, colorSwatchPickerVariants as ot, tableVariants as p, colorAreaVariants as pt, fieldErrorVariants as q, toggleButtonGroupVariants as r, datePickerVariants as rt, textAreaVariants as s, closeButtonVariants as st, tooltipVariants as t, dateInputGroupVariants as tt, tagGroupVariants as u, colorPickerVariants as ut, sliderVariants as v, rangeCalendarVariants as vt, radioGroupVariants as w, badgeVariants as wt, selectVariants as x, buttonGroupVariants as xt, skeletonVariants as y, calendarYearPickerVariants as yt, linkVariants as z };

//# sourceMappingURL=dist-Ce1jD3Wl.js.map