import { a as __toCommonJS, i as __exportAll, n as __commonJSMin, o as __toESM, r as __esmMin, t as require_react } from "./react-G_MRPtAP.js";
import { r as importShared } from "./_virtual___federation_fn_import-ChPcBYrR.js";
import { t as require_jsx_runtime } from "./jsx-runtime-qEX3bJsW.js";
//#region extension/src/renderer/classHolder.ts
var toastHolder;
var setToast = (t) => toastHolder = t;
//#endregion
//#region src/renderer/mainWindow/components/ShinyText.tsx
var import_jsx_runtime = require_jsx_runtime();
var { useMemo: useMemo$17 } = await importShared("react");
/**
* Renders text with a shiny animation effect.
*/
function ShinyText({ text, disabled = false, speed = 5, className = "", darkMode = true }) {
	const animationDuration = `${speed}s`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		style: {
			backgroundImage: useMemo$17(() => {
				const color = darkMode ? "255" : "70";
				const rgb = `${color}, ${color}, ${color}`;
				return `linear-gradient(120deg, rgba(${rgb}, 0) 40%, rgba(${rgb}, 0.8) 50%, rgba(${rgb}, 0) 60%)`;
			}, [darkMode]),
			backgroundSize: "200% 100%",
			WebkitBackgroundClip: "text",
			animationDuration
		},
		className: `text-[#b5b5b5a4] bg-clip-text inline-block ${disabled ? "" : "animate-shine"} ${className}`,
		children: text
	});
}
//#endregion
//#region node_modules/redux/dist/redux.mjs
var randomString = () => Math.random().toString(36).substring(7).split("").join(".");
`${/* @__PURE__ */ randomString()}`, `${/* @__PURE__ */ randomString()}`;
function isPlainObject$2(obj) {
	if (typeof obj !== "object" || obj === null) return false;
	let proto = obj;
	while (Object.getPrototypeOf(proto) !== null) proto = Object.getPrototypeOf(proto);
	return Object.getPrototypeOf(obj) === proto || Object.getPrototypeOf(obj) === null;
}
function isAction(action) {
	return isPlainObject$2(action) && "type" in action && typeof action.type === "string";
}
//#endregion
//#region node_modules/immer/dist/immer.mjs
var NOTHING = Symbol.for("immer-nothing");
var DRAFTABLE = Symbol.for("immer-draftable");
var DRAFT_STATE = Symbol.for("immer-state");
function die(error, ...args) {
	throw new Error(`[Immer] minified error nr: ${error}. Full error at: https://bit.ly/3cXEKWf`);
}
var O = Object;
var getPrototypeOf = O.getPrototypeOf;
var CONSTRUCTOR = "constructor";
var PROTOTYPE = "prototype";
var CONFIGURABLE = "configurable";
var ENUMERABLE = "enumerable";
var WRITABLE = "writable";
var VALUE = "value";
var isDraft = (value) => !!value && !!value[DRAFT_STATE];
function isDraftable(value) {
	if (!value) return false;
	return isPlainObject$1(value) || isArray$1(value) || !!value[DRAFTABLE] || !!value[CONSTRUCTOR]?.[DRAFTABLE] || isMap$1(value) || isSet$1(value);
}
var objectCtorString$1 = O[PROTOTYPE][CONSTRUCTOR].toString();
var cachedCtorStrings = /* @__PURE__ */ new WeakMap();
function isPlainObject$1(value) {
	if (!value || !isObjectish(value)) return false;
	const proto = getPrototypeOf(value);
	if (proto === null || proto === O[PROTOTYPE]) return true;
	const Ctor = O.hasOwnProperty.call(proto, CONSTRUCTOR) && proto[CONSTRUCTOR];
	if (Ctor === Object) return true;
	if (!isFunction$1(Ctor)) return false;
	let ctorString = cachedCtorStrings.get(Ctor);
	if (ctorString === void 0) {
		ctorString = Function.toString.call(Ctor);
		cachedCtorStrings.set(Ctor, ctorString);
	}
	return ctorString === objectCtorString$1;
}
function each(obj, iter, strict = true) {
	if (getArchtype(obj) === 0) (strict ? Reflect.ownKeys(obj) : O.keys(obj)).forEach((key) => {
		iter(key, obj[key], obj);
	});
	else obj.forEach((entry, index) => iter(index, entry, obj));
}
function getArchtype(thing) {
	const state = thing[DRAFT_STATE];
	return state ? state.type_ : isArray$1(thing) ? 1 : isMap$1(thing) ? 2 : isSet$1(thing) ? 3 : 0;
}
var has = (thing, prop, type = getArchtype(thing)) => type === 2 ? thing.has(prop) : O[PROTOTYPE].hasOwnProperty.call(thing, prop);
var get = (thing, prop, type = getArchtype(thing)) => type === 2 ? thing.get(prop) : thing[prop];
var set = (thing, propOrOldValue, value, type = getArchtype(thing)) => {
	if (type === 2) thing.set(propOrOldValue, value);
	else if (type === 3) thing.add(value);
	else thing[propOrOldValue] = value;
};
function is(x, y) {
	if (x === y) return x !== 0 || 1 / x === 1 / y;
	else return x !== x && y !== y;
}
var isArray$1 = Array.isArray;
var isMap$1 = (target) => target instanceof Map;
var isSet$1 = (target) => target instanceof Set;
var isObjectish = (target) => typeof target === "object";
var isFunction$1 = (target) => typeof target === "function";
var isBoolean = (target) => typeof target === "boolean";
function isArrayIndex(value) {
	const n = +value;
	return Number.isInteger(n) && String(n) === value;
}
var latest = (state) => state.copy_ || state.base_;
var getFinalValue = (state) => state.modified_ ? state.copy_ : state.base_;
function shallowCopy(base, strict) {
	if (isMap$1(base)) return new Map(base);
	if (isSet$1(base)) return new Set(base);
	if (isArray$1(base)) return Array[PROTOTYPE].slice.call(base);
	const isPlain = isPlainObject$1(base);
	if (strict === true || strict === "class_only" && !isPlain) {
		const descriptors = O.getOwnPropertyDescriptors(base);
		delete descriptors[DRAFT_STATE];
		let keys = Reflect.ownKeys(descriptors);
		for (let i = 0; i < keys.length; i++) {
			const key = keys[i];
			const desc = descriptors[key];
			if (desc[WRITABLE] === false) {
				desc[WRITABLE] = true;
				desc[CONFIGURABLE] = true;
			}
			if (desc.get || desc.set) descriptors[key] = {
				[CONFIGURABLE]: true,
				[WRITABLE]: true,
				[ENUMERABLE]: desc[ENUMERABLE],
				[VALUE]: base[key]
			};
		}
		return O.create(getPrototypeOf(base), descriptors);
	} else {
		const proto = getPrototypeOf(base);
		if (proto !== null && isPlain) return { ...base };
		const obj = O.create(proto);
		return O.assign(obj, base);
	}
}
function freeze(obj, deep = false) {
	if (isFrozen(obj) || isDraft(obj) || !isDraftable(obj)) return obj;
	if (getArchtype(obj) > 1) O.defineProperties(obj, {
		set: dontMutateMethodOverride,
		add: dontMutateMethodOverride,
		clear: dontMutateMethodOverride,
		delete: dontMutateMethodOverride
	});
	O.freeze(obj);
	if (deep) each(obj, (_key, value) => {
		freeze(value, true);
	}, false);
	return obj;
}
function dontMutateFrozenCollections() {
	die(2);
}
var dontMutateMethodOverride = { [VALUE]: dontMutateFrozenCollections };
function isFrozen(obj) {
	if (obj === null || !isObjectish(obj)) return true;
	return O.isFrozen(obj);
}
var PluginMapSet = "MapSet";
var PluginPatches = "Patches";
var PluginArrayMethods = "ArrayMethods";
var plugins = {};
function getPlugin(pluginKey) {
	const plugin = plugins[pluginKey];
	if (!plugin) die(0, pluginKey);
	return plugin;
}
var isPluginLoaded = (pluginKey) => !!plugins[pluginKey];
var currentScope;
var getCurrentScope = () => currentScope;
var createScope = (parent_, immer_) => ({
	drafts_: [],
	parent_,
	immer_,
	canAutoFreeze_: true,
	unfinalizedDrafts_: 0,
	handledSet_: /* @__PURE__ */ new Set(),
	processedForPatches_: /* @__PURE__ */ new Set(),
	mapSetPlugin_: isPluginLoaded(PluginMapSet) ? getPlugin(PluginMapSet) : void 0,
	arrayMethodsPlugin_: isPluginLoaded(PluginArrayMethods) ? getPlugin(PluginArrayMethods) : void 0
});
function usePatchesInScope(scope, patchListener) {
	if (patchListener) {
		scope.patchPlugin_ = getPlugin(PluginPatches);
		scope.patches_ = [];
		scope.inversePatches_ = [];
		scope.patchListener_ = patchListener;
	}
}
function revokeScope(scope) {
	leaveScope(scope);
	scope.drafts_.forEach(revokeDraft);
	scope.drafts_ = null;
}
function leaveScope(scope) {
	if (scope === currentScope) currentScope = scope.parent_;
}
var enterScope = (immer2) => currentScope = createScope(currentScope, immer2);
function revokeDraft(draft) {
	const state = draft[DRAFT_STATE];
	if (state.type_ === 0 || state.type_ === 1) state.revoke_();
	else state.revoked_ = true;
}
function processResult(result, scope) {
	scope.unfinalizedDrafts_ = scope.drafts_.length;
	const baseDraft = scope.drafts_[0];
	if (result !== void 0 && result !== baseDraft) {
		if (baseDraft[DRAFT_STATE].modified_) {
			revokeScope(scope);
			die(4);
		}
		if (isDraftable(result)) result = finalize(scope, result);
		const { patchPlugin_ } = scope;
		if (patchPlugin_) patchPlugin_.generateReplacementPatches_(baseDraft[DRAFT_STATE].base_, result, scope);
	} else result = finalize(scope, baseDraft);
	maybeFreeze(scope, result, true);
	revokeScope(scope);
	if (scope.patches_) scope.patchListener_(scope.patches_, scope.inversePatches_);
	return result !== NOTHING ? result : void 0;
}
function finalize(rootScope, value) {
	if (isFrozen(value)) return value;
	const state = value[DRAFT_STATE];
	if (!state) return handleValue(value, rootScope.handledSet_, rootScope);
	if (!isSameScope(state, rootScope)) return value;
	if (!state.modified_) return state.base_;
	if (!state.finalized_) {
		const { callbacks_ } = state;
		if (callbacks_) while (callbacks_.length > 0) callbacks_.pop()(rootScope);
		generatePatchesAndFinalize(state, rootScope);
	}
	return state.copy_;
}
function maybeFreeze(scope, value, deep = false) {
	if (!scope.parent_ && scope.immer_.autoFreeze_ && scope.canAutoFreeze_) freeze(value, deep);
}
function markStateFinalized(state) {
	state.finalized_ = true;
	state.scope_.unfinalizedDrafts_--;
}
var isSameScope = (state, rootScope) => state.scope_ === rootScope;
var EMPTY_LOCATIONS_RESULT = [];
function updateDraftInParent(parent, draftValue, finalizedValue, originalKey) {
	const parentCopy = latest(parent);
	const parentType = parent.type_;
	if (originalKey !== void 0) {
		if (get(parentCopy, originalKey, parentType) === draftValue) {
			set(parentCopy, originalKey, finalizedValue, parentType);
			return;
		}
	}
	if (!parent.draftLocations_) {
		const draftLocations = parent.draftLocations_ = /* @__PURE__ */ new Map();
		each(parentCopy, (key, value) => {
			if (isDraft(value)) {
				const keys = draftLocations.get(value) || [];
				keys.push(key);
				draftLocations.set(value, keys);
			}
		});
	}
	const locations = parent.draftLocations_.get(draftValue) ?? EMPTY_LOCATIONS_RESULT;
	for (const location of locations) set(parentCopy, location, finalizedValue, parentType);
}
function registerChildFinalizationCallback(parent, child, key) {
	parent.callbacks_.push(function childCleanup(rootScope) {
		const state = child;
		if (!state || !isSameScope(state, rootScope)) return;
		rootScope.mapSetPlugin_?.fixSetContents(state);
		const finalizedValue = getFinalValue(state);
		updateDraftInParent(parent, state.draft_ ?? state, finalizedValue, key);
		generatePatchesAndFinalize(state, rootScope);
	});
}
function generatePatchesAndFinalize(state, rootScope) {
	if (state.modified_ && !state.finalized_ && (state.type_ === 3 || state.type_ === 1 && state.allIndicesReassigned_ || (state.assigned_?.size ?? 0) > 0)) {
		const { patchPlugin_ } = rootScope;
		if (patchPlugin_) {
			const basePath = patchPlugin_.getPath(state);
			if (basePath) patchPlugin_.generatePatches_(state, basePath, rootScope);
		}
		markStateFinalized(state);
	}
}
function handleCrossReference(target, key, value) {
	const { scope_ } = target;
	if (isDraft(value)) {
		const state = value[DRAFT_STATE];
		if (isSameScope(state, scope_)) state.callbacks_.push(function crossReferenceCleanup() {
			prepareCopy(target);
			updateDraftInParent(target, value, getFinalValue(state), key);
		});
	} else if (isDraftable(value)) target.callbacks_.push(function nestedDraftCleanup() {
		const targetCopy = latest(target);
		if (target.type_ === 3) {
			if (targetCopy.has(value)) handleValue(value, scope_.handledSet_, scope_);
		} else if (get(targetCopy, key, target.type_) === value) {
			if (scope_.drafts_.length > 1 && (target.assigned_.get(key) ?? false) === true && target.copy_) handleValue(get(target.copy_, key, target.type_), scope_.handledSet_, scope_);
		}
	});
}
function handleValue(target, handledSet, rootScope) {
	if (!rootScope.immer_.autoFreeze_ && rootScope.unfinalizedDrafts_ < 1) return target;
	if (isDraft(target) || handledSet.has(target) || !isDraftable(target) || isFrozen(target)) return target;
	handledSet.add(target);
	each(target, (key, value) => {
		if (isDraft(value)) {
			const state = value[DRAFT_STATE];
			if (isSameScope(state, rootScope)) {
				set(target, key, getFinalValue(state), target.type_);
				markStateFinalized(state);
			}
		} else if (isDraftable(value)) handleValue(value, handledSet, rootScope);
	});
	return target;
}
function createProxyProxy(base, parent) {
	const baseIsArray = isArray$1(base);
	const state = {
		type_: baseIsArray ? 1 : 0,
		scope_: parent ? parent.scope_ : getCurrentScope(),
		modified_: false,
		finalized_: false,
		assigned_: void 0,
		parent_: parent,
		base_: base,
		draft_: null,
		copy_: null,
		revoke_: null,
		isManual_: false,
		callbacks_: void 0
	};
	let target = state;
	let traps = objectTraps;
	if (baseIsArray) {
		target = [state];
		traps = arrayTraps;
	}
	const { revoke, proxy } = Proxy.revocable(target, traps);
	state.draft_ = proxy;
	state.revoke_ = revoke;
	return [proxy, state];
}
var objectTraps = {
	get(state, prop) {
		if (prop === DRAFT_STATE) return state;
		let arrayPlugin = state.scope_.arrayMethodsPlugin_;
		const isArrayWithStringProp = state.type_ === 1 && typeof prop === "string";
		if (isArrayWithStringProp) {
			if (arrayPlugin?.isArrayOperationMethod(prop)) return arrayPlugin.createMethodInterceptor(state, prop);
		}
		const source = latest(state);
		if (!has(source, prop, state.type_)) return readPropFromProto(state, source, prop);
		const value = source[prop];
		if (state.finalized_ || !isDraftable(value)) return value;
		if (isArrayWithStringProp && state.operationMethod && arrayPlugin?.isMutatingArrayMethod(state.operationMethod) && isArrayIndex(prop)) return value;
		if (value === peek(state.base_, prop)) {
			prepareCopy(state);
			const childKey = state.type_ === 1 ? +prop : prop;
			const childDraft = createProxy(state.scope_, value, state, childKey);
			return state.copy_[childKey] = childDraft;
		}
		return value;
	},
	has(state, prop) {
		return prop in latest(state);
	},
	ownKeys(state) {
		return Reflect.ownKeys(latest(state));
	},
	set(state, prop, value) {
		const desc = getDescriptorFromProto(latest(state), prop);
		if (desc?.set) {
			desc.set.call(state.draft_, value);
			return true;
		}
		if (!state.modified_) {
			const current2 = peek(latest(state), prop);
			const currentState = current2?.[DRAFT_STATE];
			if (currentState && currentState.base_ === value) {
				state.copy_[prop] = value;
				state.assigned_.set(prop, false);
				return true;
			}
			if (is(value, current2) && (value !== void 0 || has(state.base_, prop, state.type_))) return true;
			prepareCopy(state);
			markChanged(state);
		}
		if (state.copy_[prop] === value && (value !== void 0 || prop in state.copy_) || Number.isNaN(value) && Number.isNaN(state.copy_[prop])) return true;
		state.copy_[prop] = value;
		state.assigned_.set(prop, true);
		handleCrossReference(state, prop, value);
		return true;
	},
	deleteProperty(state, prop) {
		prepareCopy(state);
		if (peek(state.base_, prop) !== void 0 || prop in state.base_) {
			state.assigned_.set(prop, false);
			markChanged(state);
		} else state.assigned_.delete(prop);
		if (state.copy_) delete state.copy_[prop];
		return true;
	},
	getOwnPropertyDescriptor(state, prop) {
		const owner = latest(state);
		const desc = Reflect.getOwnPropertyDescriptor(owner, prop);
		if (!desc) return desc;
		return {
			[WRITABLE]: true,
			[CONFIGURABLE]: state.type_ !== 1 || prop !== "length",
			[ENUMERABLE]: desc[ENUMERABLE],
			[VALUE]: owner[prop]
		};
	},
	defineProperty() {
		die(11);
	},
	getPrototypeOf(state) {
		return getPrototypeOf(state.base_);
	},
	setPrototypeOf() {
		die(12);
	}
};
var arrayTraps = {};
for (let key in objectTraps) {
	let fn = objectTraps[key];
	arrayTraps[key] = function() {
		const args = arguments;
		args[0] = args[0][0];
		return fn.apply(this, args);
	};
}
arrayTraps.deleteProperty = function(state, prop) {
	return arrayTraps.set.call(this, state, prop, void 0);
};
arrayTraps.set = function(state, prop, value) {
	return objectTraps.set.call(this, state[0], prop, value, state[0]);
};
function peek(draft, prop) {
	const state = draft[DRAFT_STATE];
	return (state ? latest(state) : draft)[prop];
}
function readPropFromProto(state, source, prop) {
	const desc = getDescriptorFromProto(source, prop);
	return desc ? VALUE in desc ? desc[VALUE] : desc.get?.call(state.draft_) : void 0;
}
function getDescriptorFromProto(source, prop) {
	if (!(prop in source)) return void 0;
	let proto = getPrototypeOf(source);
	while (proto) {
		const desc = Object.getOwnPropertyDescriptor(proto, prop);
		if (desc) return desc;
		proto = getPrototypeOf(proto);
	}
}
function markChanged(state) {
	if (!state.modified_) {
		state.modified_ = true;
		if (state.parent_) markChanged(state.parent_);
	}
}
function prepareCopy(state) {
	if (!state.copy_) {
		state.assigned_ = /* @__PURE__ */ new Map();
		state.copy_ = shallowCopy(state.base_, state.scope_.immer_.useStrictShallowCopy_);
	}
}
var Immer2 = class {
	constructor(config) {
		this.autoFreeze_ = true;
		this.useStrictShallowCopy_ = false;
		this.useStrictIteration_ = false;
		/**
		* The `produce` function takes a value and a "recipe function" (whose
		* return value often depends on the base state). The recipe function is
		* free to mutate its first argument however it wants. All mutations are
		* only ever applied to a __copy__ of the base state.
		*
		* Pass only a function to create a "curried producer" which relieves you
		* from passing the recipe function every time.
		*
		* Only plain objects and arrays are made mutable. All other objects are
		* considered uncopyable.
		*
		* Note: This function is __bound__ to its `Immer` instance.
		*
		* @param {any} base - the initial state
		* @param {Function} recipe - function that receives a proxy of the base state as first argument and which can be freely modified
		* @param {Function} patchListener - optional function that will be called with all the patches produced here
		* @returns {any} a new state, or the initial state if nothing was modified
		*/
		this.produce = (base, recipe, patchListener) => {
			if (isFunction$1(base) && !isFunction$1(recipe)) {
				const defaultBase = recipe;
				recipe = base;
				const self = this;
				return function curriedProduce(base2 = defaultBase, ...args) {
					return self.produce(base2, (draft) => recipe.call(this, draft, ...args));
				};
			}
			if (!isFunction$1(recipe)) die(6);
			if (patchListener !== void 0 && !isFunction$1(patchListener)) die(7);
			let result;
			if (isDraftable(base)) {
				const scope = enterScope(this);
				const proxy = createProxy(scope, base, void 0);
				let hasError = true;
				try {
					result = recipe(proxy);
					hasError = false;
				} finally {
					if (hasError) revokeScope(scope);
					else leaveScope(scope);
				}
				usePatchesInScope(scope, patchListener);
				return processResult(result, scope);
			} else if (!base || !isObjectish(base)) {
				result = recipe(base);
				if (result === void 0) result = base;
				if (result === NOTHING) result = void 0;
				if (this.autoFreeze_) freeze(result, true);
				if (patchListener) {
					const p = [];
					const ip = [];
					getPlugin(PluginPatches).generateReplacementPatches_(base, result, {
						patches_: p,
						inversePatches_: ip
					});
					patchListener(p, ip);
				}
				return result;
			} else die(1, base);
		};
		this.produceWithPatches = (base, recipe) => {
			if (isFunction$1(base)) return (state, ...args) => this.produceWithPatches(state, (draft) => base(draft, ...args));
			let patches, inversePatches;
			return [
				this.produce(base, recipe, (p, ip) => {
					patches = p;
					inversePatches = ip;
				}),
				patches,
				inversePatches
			];
		};
		if (isBoolean(config?.autoFreeze)) this.setAutoFreeze(config.autoFreeze);
		if (isBoolean(config?.useStrictShallowCopy)) this.setUseStrictShallowCopy(config.useStrictShallowCopy);
		if (isBoolean(config?.useStrictIteration)) this.setUseStrictIteration(config.useStrictIteration);
	}
	createDraft(base) {
		if (!isDraftable(base)) die(8);
		if (isDraft(base)) base = current(base);
		const scope = enterScope(this);
		const proxy = createProxy(scope, base, void 0);
		proxy[DRAFT_STATE].isManual_ = true;
		leaveScope(scope);
		return proxy;
	}
	finishDraft(draft, patchListener) {
		const state = draft && draft[DRAFT_STATE];
		if (!state || !state.isManual_) die(9);
		const { scope_: scope } = state;
		usePatchesInScope(scope, patchListener);
		return processResult(void 0, scope);
	}
	/**
	* Pass true to automatically freeze all copies created by Immer.
	*
	* By default, auto-freezing is enabled.
	*/
	setAutoFreeze(value) {
		this.autoFreeze_ = value;
	}
	/**
	* Pass true to enable strict shallow copy.
	*
	* By default, immer does not copy the object descriptors such as getter, setter and non-enumrable properties.
	*/
	setUseStrictShallowCopy(value) {
		this.useStrictShallowCopy_ = value;
	}
	/**
	* Pass false to use faster iteration that skips non-enumerable properties
	* but still handles symbols for compatibility.
	*
	* By default, strict iteration is enabled (includes all own properties).
	*/
	setUseStrictIteration(value) {
		this.useStrictIteration_ = value;
	}
	shouldUseStrictIteration() {
		return this.useStrictIteration_;
	}
	applyPatches(base, patches) {
		let i;
		for (i = patches.length - 1; i >= 0; i--) {
			const patch = patches[i];
			if (patch.path.length === 0 && patch.op === "replace") {
				base = patch.value;
				break;
			}
		}
		if (i > -1) patches = patches.slice(i + 1);
		const applyPatchesImpl = getPlugin(PluginPatches).applyPatches_;
		if (isDraft(base)) return applyPatchesImpl(base, patches);
		return this.produce(base, (draft) => applyPatchesImpl(draft, patches));
	}
};
function createProxy(rootScope, value, parent, key) {
	const [draft, state] = isMap$1(value) ? getPlugin(PluginMapSet).proxyMap_(value, parent) : isSet$1(value) ? getPlugin(PluginMapSet).proxySet_(value, parent) : createProxyProxy(value, parent);
	(parent?.scope_ ?? getCurrentScope()).drafts_.push(draft);
	state.callbacks_ = parent?.callbacks_ ?? [];
	state.key_ = key;
	if (parent && key !== void 0) registerChildFinalizationCallback(parent, state, key);
	else state.callbacks_.push(function rootDraftCleanup(rootScope2) {
		rootScope2.mapSetPlugin_?.fixSetContents(state);
		const { patchPlugin_ } = rootScope2;
		if (state.modified_ && patchPlugin_) patchPlugin_.generatePatches_(state, [], rootScope2);
	});
	return draft;
}
function current(value) {
	if (!isDraft(value)) die(10, value);
	return currentImpl(value);
}
function currentImpl(value) {
	if (!isDraftable(value) || isFrozen(value)) return value;
	const state = value[DRAFT_STATE];
	let copy;
	let strict = true;
	if (state) {
		if (!state.modified_) return state.base_;
		state.finalized_ = true;
		copy = shallowCopy(value, state.scope_.immer_.useStrictShallowCopy_);
		strict = state.scope_.immer_.shouldUseStrictIteration();
	} else copy = shallowCopy(value, true);
	each(copy, (key, childValue) => {
		set(copy, key, currentImpl(childValue));
	}, strict);
	if (state) state.finalized_ = false;
	return copy;
}
var produce = new Immer2().produce;
typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__;
function createAction(type, prepareAction) {
	function actionCreator(...args) {
		if (prepareAction) {
			let prepared = prepareAction(...args);
			if (!prepared) throw new Error(formatProdErrorMessage(0));
			return {
				type,
				payload: prepared.payload,
				..."meta" in prepared && { meta: prepared.meta },
				..."error" in prepared && { error: prepared.error }
			};
		}
		return {
			type,
			payload: args[0]
		};
	}
	actionCreator.toString = () => `${type}`;
	actionCreator.type = type;
	actionCreator.match = (action) => isAction(action) && action.type === type;
	return actionCreator;
}
function freezeDraftable(val) {
	return isDraftable(val) ? produce(val, () => {}) : val;
}
function getOrInsertComputed(map, key, compute) {
	if (map.has(key)) return map.get(key);
	return map.set(key, compute(key)).get(key);
}
function executeReducerBuilderCallback(builderCallback) {
	const actionsMap = {};
	const actionMatchers = [];
	let defaultCaseReducer;
	const builder = {
		addCase(typeOrActionCreator, reducer) {
			const type = typeof typeOrActionCreator === "string" ? typeOrActionCreator : typeOrActionCreator.type;
			if (!type) throw new Error(formatProdErrorMessage(28));
			if (type in actionsMap) throw new Error(formatProdErrorMessage(29));
			actionsMap[type] = reducer;
			return builder;
		},
		addAsyncThunk(asyncThunk, reducers) {
			if (reducers.pending) actionsMap[asyncThunk.pending.type] = reducers.pending;
			if (reducers.rejected) actionsMap[asyncThunk.rejected.type] = reducers.rejected;
			if (reducers.fulfilled) actionsMap[asyncThunk.fulfilled.type] = reducers.fulfilled;
			if (reducers.settled) actionMatchers.push({
				matcher: asyncThunk.settled,
				reducer: reducers.settled
			});
			return builder;
		},
		addMatcher(matcher, reducer) {
			actionMatchers.push({
				matcher,
				reducer
			});
			return builder;
		},
		addDefaultCase(reducer) {
			defaultCaseReducer = reducer;
			return builder;
		}
	};
	builderCallback(builder);
	return [
		actionsMap,
		actionMatchers,
		defaultCaseReducer
	];
}
function isStateFunction(x) {
	return typeof x === "function";
}
function createReducer(initialState, mapOrBuilderCallback) {
	let [actionsMap, finalActionMatchers, finalDefaultCaseReducer] = executeReducerBuilderCallback(mapOrBuilderCallback);
	let getInitialState;
	if (isStateFunction(initialState)) getInitialState = () => freezeDraftable(initialState());
	else {
		const frozenInitialState = freezeDraftable(initialState);
		getInitialState = () => frozenInitialState;
	}
	function reducer(state = getInitialState(), action) {
		let caseReducers = [actionsMap[action.type], ...finalActionMatchers.filter(({ matcher }) => matcher(action)).map(({ reducer: reducer2 }) => reducer2)];
		if (caseReducers.filter((cr) => !!cr).length === 0) caseReducers = [finalDefaultCaseReducer];
		return caseReducers.reduce((previousState, caseReducer) => {
			if (caseReducer) if (isDraft(previousState)) {
				const result = caseReducer(previousState, action);
				if (result === void 0) return previousState;
				return result;
			} else if (!isDraftable(previousState)) {
				const result = caseReducer(previousState, action);
				if (result === void 0) {
					if (previousState === null) return previousState;
					throw Error("A case reducer on a non-draftable value must not return undefined");
				}
				return result;
			} else return produce(previousState, (draft) => {
				return caseReducer(draft, action);
			});
			return previousState;
		}, state);
	}
	reducer.getInitialState = getInitialState;
	return reducer;
}
var asyncThunkSymbol = /* @__PURE__ */ Symbol.for("rtk-slice-createasyncthunk");
function getType(slice, actionKey) {
	return `${slice}/${actionKey}`;
}
function buildCreateSlice({ creators } = {}) {
	const cAT = creators?.asyncThunk?.[asyncThunkSymbol];
	return function createSlice2(options) {
		const { name, reducerPath = name } = options;
		if (!name) throw new Error(formatProdErrorMessage(11));
		const reducers = (typeof options.reducers === "function" ? options.reducers(buildReducerCreators()) : options.reducers) || {};
		const reducerNames = Object.keys(reducers);
		const context = {
			sliceCaseReducersByName: {},
			sliceCaseReducersByType: {},
			actionCreators: {},
			sliceMatchers: []
		};
		const contextMethods = {
			addCase(typeOrActionCreator, reducer2) {
				const type = typeof typeOrActionCreator === "string" ? typeOrActionCreator : typeOrActionCreator.type;
				if (!type) throw new Error(formatProdErrorMessage(12));
				if (type in context.sliceCaseReducersByType) throw new Error(formatProdErrorMessage(13));
				context.sliceCaseReducersByType[type] = reducer2;
				return contextMethods;
			},
			addMatcher(matcher, reducer2) {
				context.sliceMatchers.push({
					matcher,
					reducer: reducer2
				});
				return contextMethods;
			},
			exposeAction(name2, actionCreator) {
				context.actionCreators[name2] = actionCreator;
				return contextMethods;
			},
			exposeCaseReducer(name2, reducer2) {
				context.sliceCaseReducersByName[name2] = reducer2;
				return contextMethods;
			}
		};
		reducerNames.forEach((reducerName) => {
			const reducerDefinition = reducers[reducerName];
			const reducerDetails = {
				reducerName,
				type: getType(name, reducerName),
				createNotation: typeof options.reducers === "function"
			};
			if (isAsyncThunkSliceReducerDefinition(reducerDefinition)) handleThunkCaseReducerDefinition(reducerDetails, reducerDefinition, contextMethods, cAT);
			else handleNormalReducerDefinition(reducerDetails, reducerDefinition, contextMethods);
		});
		function buildReducer() {
			const [extraReducers = {}, actionMatchers = [], defaultCaseReducer = void 0] = typeof options.extraReducers === "function" ? executeReducerBuilderCallback(options.extraReducers) : [options.extraReducers];
			const finalCaseReducers = {
				...extraReducers,
				...context.sliceCaseReducersByType
			};
			return createReducer(options.initialState, (builder) => {
				for (let key in finalCaseReducers) builder.addCase(key, finalCaseReducers[key]);
				for (let sM of context.sliceMatchers) builder.addMatcher(sM.matcher, sM.reducer);
				for (let m of actionMatchers) builder.addMatcher(m.matcher, m.reducer);
				if (defaultCaseReducer) builder.addDefaultCase(defaultCaseReducer);
			});
		}
		const selectSelf = (state) => state;
		const injectedSelectorCache = /* @__PURE__ */ new Map();
		const injectedStateCache = /* @__PURE__ */ new WeakMap();
		let _reducer;
		function reducer(state, action) {
			if (!_reducer) _reducer = buildReducer();
			return _reducer(state, action);
		}
		function getInitialState() {
			if (!_reducer) _reducer = buildReducer();
			return _reducer.getInitialState();
		}
		function makeSelectorProps(reducerPath2, injected = false) {
			function selectSlice(state) {
				let sliceState = state[reducerPath2];
				if (typeof sliceState === "undefined") {
					if (injected) sliceState = getOrInsertComputed(injectedStateCache, selectSlice, getInitialState);
				}
				return sliceState;
			}
			function getSelectors(selectState = selectSelf) {
				return getOrInsertComputed(getOrInsertComputed(injectedSelectorCache, injected, () => /* @__PURE__ */ new WeakMap()), selectState, () => {
					const map = {};
					for (const [name2, selector] of Object.entries(options.selectors ?? {})) map[name2] = wrapSelector(selector, selectState, () => getOrInsertComputed(injectedStateCache, selectState, getInitialState), injected);
					return map;
				});
			}
			return {
				reducerPath: reducerPath2,
				getSelectors,
				get selectors() {
					return getSelectors(selectSlice);
				},
				selectSlice
			};
		}
		const slice = {
			name,
			reducer,
			actions: context.actionCreators,
			caseReducers: context.sliceCaseReducersByName,
			getInitialState,
			...makeSelectorProps(reducerPath),
			injectInto(injectable, { reducerPath: pathOpt, ...config } = {}) {
				const newReducerPath = pathOpt ?? reducerPath;
				injectable.inject({
					reducerPath: newReducerPath,
					reducer
				}, config);
				return {
					...slice,
					...makeSelectorProps(newReducerPath, true)
				};
			}
		};
		return slice;
	};
}
function wrapSelector(selector, selectState, getInitialState, injected) {
	function wrapper(rootState, ...args) {
		let sliceState = selectState(rootState);
		if (typeof sliceState === "undefined") {
			if (injected) sliceState = getInitialState();
		}
		return selector(sliceState, ...args);
	}
	wrapper.unwrapped = selector;
	return wrapper;
}
var createSlice = /* @__PURE__ */ buildCreateSlice();
function buildReducerCreators() {
	function asyncThunk(payloadCreator, config) {
		return {
			_reducerDefinitionType: "asyncThunk",
			payloadCreator,
			...config
		};
	}
	asyncThunk.withTypes = () => asyncThunk;
	return {
		reducer(caseReducer) {
			return Object.assign({ [caseReducer.name](...args) {
				return caseReducer(...args);
			} }[caseReducer.name], { _reducerDefinitionType: "reducer" });
		},
		preparedReducer(prepare, reducer) {
			return {
				_reducerDefinitionType: "reducerWithPrepare",
				prepare,
				reducer
			};
		},
		asyncThunk
	};
}
function handleNormalReducerDefinition({ type, reducerName, createNotation }, maybeReducerWithPrepare, context) {
	let caseReducer;
	let prepareCallback;
	if ("reducer" in maybeReducerWithPrepare) {
		if (createNotation && !isCaseReducerWithPrepareDefinition(maybeReducerWithPrepare)) throw new Error(formatProdErrorMessage(17));
		caseReducer = maybeReducerWithPrepare.reducer;
		prepareCallback = maybeReducerWithPrepare.prepare;
	} else caseReducer = maybeReducerWithPrepare;
	context.addCase(type, caseReducer).exposeCaseReducer(reducerName, caseReducer).exposeAction(reducerName, prepareCallback ? createAction(type, prepareCallback) : createAction(type));
}
function isAsyncThunkSliceReducerDefinition(reducerDefinition) {
	return reducerDefinition._reducerDefinitionType === "asyncThunk";
}
function isCaseReducerWithPrepareDefinition(reducerDefinition) {
	return reducerDefinition._reducerDefinitionType === "reducerWithPrepare";
}
function handleThunkCaseReducerDefinition({ type, reducerName }, reducerDefinition, context, cAT) {
	if (!cAT) throw new Error(formatProdErrorMessage(18));
	const { payloadCreator, fulfilled, pending, rejected, settled, options } = reducerDefinition;
	const thunk = cAT(type, payloadCreator, options);
	context.exposeAction(reducerName, thunk);
	if (fulfilled) context.addCase(thunk.fulfilled, fulfilled);
	if (pending) context.addCase(thunk.pending, pending);
	if (rejected) context.addCase(thunk.rejected, rejected);
	if (settled) context.addMatcher(thunk.settled, settled);
	context.exposeCaseReducer(reducerName, {
		fulfilled: fulfilled || noop$1,
		pending: pending || noop$1,
		rejected: rejected || noop$1,
		settled: settled || noop$1
	});
}
function noop$1() {}
var listener = "listener";
var completed = "completed";
var cancelled = "cancelled";
`${cancelled}`;
`${completed}`;
`${listener}${cancelled}`;
`${listener}${completed}`;
var { assign } = Object;
var alm = "listenerMiddleware";
var addListener = /* @__PURE__ */ assign(/* @__PURE__ */ createAction(`${alm}/add`), { withTypes: () => addListener });
`${alm}`;
var removeListener = /* @__PURE__ */ assign(/* @__PURE__ */ createAction(`${alm}/remove`), { withTypes: () => removeListener });
function formatProdErrorMessage(code) {
	return `Minified Redux Toolkit error #${code}; visit https://redux-toolkit.js.org/Errors?code=${code} for the full message or use the non-minified dev environment for full errors. `;
}
//#endregion
//#region src/renderer/mainWindow/redux/reducers/app.ts
var { useSelector: useSelector$3 } = await importShared("react-redux");
var appSlice = createSlice({
	name: "app",
	initialState: {
		darkMode: true,
		fullscreen: false,
		isOnline: false,
		maximized: false,
		onFocus: true,
		navBar: true,
		appTitle: void 0,
		initializer: {
			showWizard: false,
			isUpgradeFlow: false
		},
		showUpgradePromo: false,
		showStarPromo: false
	},
	reducers: {
		setAppState: (state, action) => {
			state[action.payload.key] = action.payload.value;
		},
		setAppTitle: (state, action) => {
			state.appTitle = action.payload;
		},
		toggleAppState: (state, action) => {
			const key = action.payload;
			state[key] = !state[key];
		}
	}
});
/**
* Hook to access app state
* @param key - The key of the app state to retrieve
* @returns The value of the specified app state
*/
var useAppState = (key) => useSelector$3((state) => state.app[key]);
appSlice.actions;
appSlice.reducer;
//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils/mergeClasses.mjs
/**
* @license lucide-react v1.21.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var mergeClasses = (...classes) => classes.filter((className, index, array) => {
	return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils/toKebabCase.mjs
/**
* @license lucide-react v1.21.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils/toCamelCase.mjs
/**
* @license lucide-react v1.21.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var toCamelCase = (string) => string.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase());
//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils/toPascalCase.mjs
/**
* @license lucide-react v1.21.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var toPascalCase = (string) => {
	const camelCase = toCamelCase(string);
	return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
//#endregion
//#region node_modules/lucide-react/dist/esm/defaultAttributes.mjs
/**
* @license lucide-react v1.21.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var defaultAttributes = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: 2,
	strokeLinecap: "round",
	strokeLinejoin: "round"
};
//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils/hasA11yProp.mjs
/**
* @license lucide-react v1.21.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var hasA11yProp = (props) => {
	for (const prop in props) if (prop.startsWith("aria-") || prop === "role" || prop === "title") return true;
	return false;
};
//#endregion
//#region node_modules/lucide-react/dist/esm/context.mjs
/**
* @license lucide-react v1.21.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var { createContext: createContext$7, useContext: useContext$10, useMemo: useMemo$16, createElement: createElement$3 } = await importShared("react");
var LucideContext = createContext$7({});
var useLucideContext = () => useContext$10(LucideContext);
//#endregion
//#region node_modules/lucide-react/dist/esm/Icon.mjs
/**
* @license lucide-react v1.21.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var { forwardRef: forwardRef$4, createElement: createElement$2 } = await importShared("react");
var Icon = forwardRef$4(({ color, size, strokeWidth, absoluteStrokeWidth, className = "", children, iconNode, ...rest }, ref) => {
	const { size: contextSize = 24, strokeWidth: contextStrokeWidth = 2, absoluteStrokeWidth: contextAbsoluteStrokeWidth = false, color: contextColor = "currentColor", className: contextClass = "" } = useLucideContext() ?? {};
	const calculatedStrokeWidth = absoluteStrokeWidth ?? contextAbsoluteStrokeWidth ? Number(strokeWidth ?? contextStrokeWidth) * 24 / Number(size ?? contextSize) : strokeWidth ?? contextStrokeWidth;
	return createElement$2("svg", {
		ref,
		...defaultAttributes,
		width: size ?? contextSize ?? defaultAttributes.width,
		height: size ?? contextSize ?? defaultAttributes.height,
		stroke: color ?? contextColor,
		strokeWidth: calculatedStrokeWidth,
		className: mergeClasses("lucide", contextClass, className),
		...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
		...rest
	}, [...iconNode.map(([tag, attrs]) => createElement$2(tag, attrs)), ...Array.isArray(children) ? children : [children]]);
});
//#endregion
//#region node_modules/lucide-react/dist/esm/createLucideIcon.mjs
/**
* @license lucide-react v1.21.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var { forwardRef: forwardRef$3, createElement: createElement$1 } = await importShared("react");
var createLucideIcon = (iconName, iconNode) => {
	const Component = forwardRef$3(({ className, ...props }, ref) => createElement$1(Icon, {
		ref,
		iconNode,
		className: mergeClasses(`lucide-${toKebabCase(toPascalCase(iconName))}`, `lucide-${iconName}`, className),
		...props
	}));
	Component.displayName = toPascalCase(iconName);
	return Component;
};
/**
* @license lucide-react v1.21.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Activity = createLucideIcon("activity", [["path", {
	d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
	key: "169zse"
}]]);
/**
* @license lucide-react v1.21.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ArrowDown = createLucideIcon("arrow-down", [["path", {
	d: "M12 5v14",
	key: "s699le"
}], ["path", {
	d: "m19 12-7 7-7-7",
	key: "1idqje"
}]]);
/**
* @license lucide-react v1.21.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ArrowUp = createLucideIcon("arrow-up", [["path", {
	d: "m5 12 7-7 7 7",
	key: "hav0vg"
}], ["path", {
	d: "M12 19V5",
	key: "x0mq9r"
}]]);
/**
* @license lucide-react v1.21.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ChevronLeft = createLucideIcon("chevron-left", [["path", {
	d: "m15 18-6-6 6-6",
	key: "1wnfg3"
}]]);
/**
* @license lucide-react v1.21.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ChevronRight = createLucideIcon("chevron-right", [["path", {
	d: "m9 18 6-6-6-6",
	key: "mthhwq"
}]]);
/**
* @license lucide-react v1.21.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Clock = createLucideIcon("clock", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}], ["path", {
	d: "M12 6v6l4 2",
	key: "mmk7yg"
}]]);
/**
* @license lucide-react v1.21.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Cpu = createLucideIcon("cpu", [
	["path", {
		d: "M12 20v2",
		key: "1lh1kg"
	}],
	["path", {
		d: "M12 2v2",
		key: "tus03m"
	}],
	["path", {
		d: "M17 20v2",
		key: "1rnc9c"
	}],
	["path", {
		d: "M17 2v2",
		key: "11trls"
	}],
	["path", {
		d: "M2 12h2",
		key: "1t8f8n"
	}],
	["path", {
		d: "M2 17h2",
		key: "7oei6x"
	}],
	["path", {
		d: "M2 7h2",
		key: "asdhe0"
	}],
	["path", {
		d: "M20 12h2",
		key: "1q8mjw"
	}],
	["path", {
		d: "M20 17h2",
		key: "1fpfkl"
	}],
	["path", {
		d: "M20 7h2",
		key: "1o8tra"
	}],
	["path", {
		d: "M7 20v2",
		key: "4gnj0m"
	}],
	["path", {
		d: "M7 2v2",
		key: "1i4yhu"
	}],
	["rect", {
		x: "4",
		y: "4",
		width: "16",
		height: "16",
		rx: "2",
		key: "1vbyd7"
	}],
	["rect", {
		x: "8",
		y: "8",
		width: "8",
		height: "8",
		rx: "1",
		key: "z9xiuo"
	}]
]);
/**
* @license lucide-react v1.21.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Database = createLucideIcon("database", [
	["ellipse", {
		cx: "12",
		cy: "5",
		rx: "9",
		ry: "3",
		key: "msslwz"
	}],
	["path", {
		d: "M3 5V19A9 3 0 0 0 21 19V5",
		key: "1wlel7"
	}],
	["path", {
		d: "M3 12A9 3 0 0 0 21 12",
		key: "mv7ke4"
	}]
]);
/**
* @license lucide-react v1.21.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Gauge = createLucideIcon("gauge", [["path", {
	d: "m12 14 4-4",
	key: "9kzdfg"
}], ["path", {
	d: "M3.34 19a10 10 0 1 1 17.32 0",
	key: "19p75a"
}]]);
/**
* @license lucide-react v1.21.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var GripVertical = createLucideIcon("grip-vertical", [
	["circle", {
		cx: "9",
		cy: "12",
		r: "1",
		key: "1vctgf"
	}],
	["circle", {
		cx: "9",
		cy: "5",
		r: "1",
		key: "hp0tcf"
	}],
	["circle", {
		cx: "9",
		cy: "19",
		r: "1",
		key: "fkjjf6"
	}],
	["circle", {
		cx: "15",
		cy: "12",
		r: "1",
		key: "1tmaij"
	}],
	["circle", {
		cx: "15",
		cy: "5",
		r: "1",
		key: "19l28e"
	}],
	["circle", {
		cx: "15",
		cy: "19",
		r: "1",
		key: "f4zoj3"
	}]
]);
/**
* @license lucide-react v1.21.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var HardDrive = createLucideIcon("hard-drive", [
	["path", {
		d: "M10 16h.01",
		key: "1bzywj"
	}],
	["path", {
		d: "M2.212 11.577a2 2 0 0 0-.212.896V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5.527a2 2 0 0 0-.212-.896L18.55 5.11A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
		key: "18tbho"
	}],
	["path", {
		d: "M21.946 12.013H2.054",
		key: "zqlbp7"
	}],
	["path", {
		d: "M6 16h.01",
		key: "1pmjb7"
	}]
]);
/**
* @license lucide-react v1.21.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var MemoryStick = createLucideIcon("memory-stick", [
	["path", {
		d: "M12 12v-2",
		key: "fwoke6"
	}],
	["path", {
		d: "M12 18v-2",
		key: "qj6yno"
	}],
	["path", {
		d: "M16 12v-2",
		key: "heuere"
	}],
	["path", {
		d: "M16 18v-2",
		key: "s1ct0w"
	}],
	["path", {
		d: "M2 11h1.5",
		key: "15p63e"
	}],
	["path", {
		d: "M20 18v-2",
		key: "12ehxp"
	}],
	["path", {
		d: "M20.5 11H22",
		key: "khsy7a"
	}],
	["path", {
		d: "M4 18v-2",
		key: "1c3oqr"
	}],
	["path", {
		d: "M8 12v-2",
		key: "1mwtfd"
	}],
	["path", {
		d: "M8 18v-2",
		key: "qcmpov"
	}],
	["rect", {
		x: "2",
		y: "6",
		width: "20",
		height: "10",
		rx: "2",
		key: "1qcswk"
	}]
]);
/**
* @license lucide-react v1.21.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Monitor = createLucideIcon("monitor", [
	["rect", {
		width: "20",
		height: "14",
		x: "2",
		y: "3",
		rx: "2",
		key: "48i651"
	}],
	["line", {
		x1: "8",
		x2: "16",
		y1: "21",
		y2: "21",
		key: "1svkeh"
	}],
	["line", {
		x1: "12",
		x2: "12",
		y1: "17",
		y2: "21",
		key: "vw1qmm"
	}]
]);
/**
* @license lucide-react v1.21.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Plus = createLucideIcon("plus", [["path", {
	d: "M5 12h14",
	key: "1ays0h"
}], ["path", {
	d: "M12 5v14",
	key: "s699le"
}]]);
/**
* @license lucide-react v1.21.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Power = createLucideIcon("power", [["path", {
	d: "M12 2v10",
	key: "mnfbl"
}], ["path", {
	d: "M18.4 6.6a9 9 0 1 1-12.77.04",
	key: "obofu9"
}]]);
/**
* @license lucide-react v1.21.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Radar = createLucideIcon("radar", [
	["path", {
		d: "M19.07 4.93A10 10 0 0 0 6.99 3.34",
		key: "z3du51"
	}],
	["path", {
		d: "M4 6h.01",
		key: "oypzma"
	}],
	["path", {
		d: "M2.29 9.62A10 10 0 1 0 21.31 8.35",
		key: "qzzz0"
	}],
	["path", {
		d: "M16.24 7.76A6 6 0 1 0 8.23 16.67",
		key: "1yjesh"
	}],
	["path", {
		d: "M12 18h.01",
		key: "mhygvu"
	}],
	["path", {
		d: "M17.99 11.66A6 6 0 0 1 15.77 16.67",
		key: "1u2y91"
	}],
	["circle", {
		cx: "12",
		cy: "12",
		r: "2",
		key: "1c9p78"
	}],
	["path", {
		d: "m13.41 10.59 5.66-5.66",
		key: "mhq4k0"
	}]
]);
/**
* @license lucide-react v1.21.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var RotateCcw = createLucideIcon("rotate-ccw", [["path", {
	d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
	key: "1357e3"
}], ["path", {
	d: "M3 3v5h5",
	key: "1xhq8a"
}]]);
/**
* @license lucide-react v1.21.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Thermometer = createLucideIcon("thermometer", [["path", {
	d: "M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z",
	key: "17jzev"
}]]);
/**
* @license lucide-react v1.21.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Timer = createLucideIcon("timer", [
	["line", {
		x1: "10",
		x2: "14",
		y1: "2",
		y2: "2",
		key: "14vaq8"
	}],
	["line", {
		x1: "12",
		x2: "15",
		y1: "14",
		y2: "11",
		key: "17fdiu"
	}],
	["circle", {
		cx: "12",
		cy: "14",
		r: "8",
		key: "1e1u0o"
	}]
]);
/**
* @license lucide-react v1.21.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Wifi = createLucideIcon("wifi", [
	["path", {
		d: "M12 20h.01",
		key: "zekei9"
	}],
	["path", {
		d: "M2 8.82a15 15 0 0 1 20 0",
		key: "dnpr2z"
	}],
	["path", {
		d: "M5 12.859a10 10 0 0 1 14 0",
		key: "1x1e6c"
	}],
	["path", {
		d: "M8.5 16.429a5 5 0 0 1 7 0",
		key: "1bycff"
	}]
]);
/**
* @license lucide-react v1.21.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var X = createLucideIcon("x", [["path", {
	d: "M18 6 6 18",
	key: "1bl5f8"
}], ["path", {
	d: "m6 6 12 12",
	key: "d8bk6v"
}]]);
/**
* @license lucide-react v1.21.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Zap = createLucideIcon("zap", [["path", {
	d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
	key: "1xq2db"
}]]);
//#endregion
//#region extension/src/cross/constants.ts
var HMONITOR_STORAGE_ID = "hmonitor_storage";
var HMONITOR_IPC_DATA_UPDATE = "hmonitor-data-update";
var HMONITOR_IPC_CONFIG_UPDATE = "hmonitor-config-update";
var HMONITOR_IPC_MONITORING_ERROR = "hmonitor-monitoring-error";
var HMONITOR_IPC_SET_CONFIG = "hmonitor-set-config";
var HMONITOR_IPC_RESET_CONFIG = "hmonitor-reset-config";
var HMONITOR_IPC_UPDATE_PING = "hmonitor-update-ping";
var HMONITOR_IPC_STOP_PING = "hmonitor-stop-ping";
var initialSettings = {
	configVersion: .6,
	refreshInterval: 1,
	enabled: true,
	displayStyle: "default",
	showSectionLabel: true,
	metricVisibility: {
		icon: true,
		label: true,
		value: true,
		progressBar: true
	},
	enabledMetrics: {
		cpu: [],
		gpu: [],
		memory: [],
		network: [],
		uptime: {
			system: true,
			app: true
		}
	},
	availableHardware: {
		gpu: [],
		cpu: [],
		memory: [],
		network: []
	},
	pingState: {
		isActive: false,
		hosts: [],
		enabledHosts: [],
		interval: 1e3,
		timeout: 2e3
	},
	showAliasCpu: true,
	showAliasGpu: true,
	showAliasMemory: true,
	showAliasNetwork: true,
	sectionOrder: [
		"cpu",
		"gpu",
		"memory",
		"network",
		"uptime",
		"ping"
	],
	uptimeOrder: ["uptimeSystem", "uptimeApp"]
};
//#endregion
//#region extension/src/renderer/hooks/useHardwareData.ts
var { useEffect: useEffect$11, useState: useState$9 } = await importShared("react");
var convertMBtoGB = (mb) => Number((mb / 1024).toFixed(2));
var initialData = {
	gpu: [],
	cpu: [],
	memory: [],
	network: [],
	uptime: {
		system: 0,
		app: 0
	},
	rawSensors: []
};
/**
* Custom hook to manage hardware data fetching and state.
* It listens for IPC events from the main process and transforms the raw data.
*/
function useHardwareData() {
	const [hardwareData, setHardwareData] = useState$9(initialData);
	const [isConnected, setIsConnected] = useState$9(false);
	const [error, setError] = useState$9(null);
	useEffect$11(() => {
		const handleHardwareUpdate = (_, data) => {
			if (!data) return;
			setHardwareData({
				cpu: data.CPU.map((item) => ({
					name: item.Name,
					temp: item.Sensors.find((s) => s.Name === "CPU Package" && s.Type === "Temperature")?.Value || 0,
					usage: Math.round(item.Sensors.find((s) => s.Name === "CPU Total" && s.Type === "Load")?.Value || 0)
				})),
				gpu: data.GPU.map((item) => ({
					name: item.Name,
					temp: item.Sensors.find((s) => s.Name === "GPU Core" && s.Type === "Temperature")?.Value || 0,
					usage: Math.round(item.Sensors.find((s) => s.Name === "D3D 3D" && s.Type === "Load")?.Value || 0),
					totalVram: convertMBtoGB(item.Sensors.find((s) => s.Name === "GPU Memory Total")?.Value || 0),
					usedVram: convertMBtoGB(item.Sensors.find((s) => s.Name === "GPU Memory Used")?.Value || 0)
				})),
				memory: data.Memory.map((item) => {
					const used = item.Sensors.find((s) => s.Name === "Memory Used" && s.Type === "Data")?.Value || 0;
					const available = item.Sensors.find((s) => s.Name === "Memory Available" && s.Type === "Data")?.Value || 0;
					return {
						name: item.Name,
						used,
						available,
						total: used + available
					};
				}),
				network: (data.Network ?? []).map((item) => ({
					name: item.Name,
					uploadSpeed: item.Sensors.find((s) => s.Name === "Upload Speed")?.Value || 0,
					downloadSpeed: item.Sensors.find((s) => s.Name === "Download Speed")?.Value || 0,
					uploadData: item.Sensors.find((s) => s.Name === "Data Uploaded")?.Value || 0,
					downloadData: item.Sensors.find((s) => s.Name === "Data Downloaded")?.Value || 0
				})),
				uptime: {
					system: data.Uptime?.rawSeconds || 0,
					app: data.ElapsedTime?.rawSeconds || 0
				},
				rawSensors: data.rawSensors || []
			});
			setIsConnected(true);
			setError(null);
		};
		const handleError = (_, err) => {
			console.error("Received monitoring error:", err);
			setError(err);
			setIsConnected(false);
		};
		const clearDataListener = window.electron.ipcRenderer.on(HMONITOR_IPC_DATA_UPDATE, handleHardwareUpdate);
		const clearMonitorError = window.electron.ipcRenderer.on(HMONITOR_IPC_MONITORING_ERROR, handleError);
		return () => {
			clearDataListener();
			clearMonitorError();
		};
	}, []);
	return {
		hardwareData,
		isConnected,
		error
	};
}
//#endregion
//#region extension/src/renderer/hooks/useScrollManager.ts
var { useCallback: useCallback$5, useEffect: useEffect$10, useRef: useRef$8, useState: useState$8 } = await importShared("react");
/**
* A hook to manage the scrolling state and behavior of a container element.
* @returns Functions and state to manage scrolling, including refs and scroll button visibility.
*/
function useScrollManager() {
	const [canScrollLeft, setCanScrollLeft] = useState$8(false);
	const [canScrollRight, setCanScrollRight] = useState$8(false);
	const ref = useRef$8(null);
	const updateScrollState = useCallback$5(() => {
		const element = ref.current;
		if (!element) return;
		const { scrollLeft, scrollWidth, clientWidth } = element;
		setCanScrollLeft(scrollLeft > 0);
		setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
	}, []);
	const scroll = useCallback$5((direction) => {
		ref.current?.scrollBy({
			left: direction === "left" ? -250 : 250,
			behavior: "smooth"
		});
	}, []);
	useEffect$10(() => {
		const element = ref.current;
		if (!element) return;
		const handleResize = () => updateScrollState();
		window.addEventListener("resize", handleResize);
		element.addEventListener("scroll", updateScrollState);
		updateScrollState();
		return () => {
			window.removeEventListener("resize", handleResize);
			element.removeEventListener("scroll", updateScrollState);
		};
	}, [updateScrollState]);
	useEffect$10(() => {
		const element = ref.current;
		if (!element) return;
		const handleWheel = (event) => {
			if (event.deltaY === 0) return;
			event.preventDefault();
			element.scrollLeft += event.deltaY;
		};
		element.addEventListener("wheel", handleWheel, { passive: false });
		return () => element.removeEventListener("wheel", handleWheel);
	}, []);
	return {
		containerRef: useCallback$5((node) => {
			if (node) {
				ref.current = node;
				updateScrollState();
			}
		}, [updateScrollState]),
		canScrollLeft,
		canScrollRight,
		scroll
	};
}
//#endregion
//#region node_modules/lodash-es/_freeGlobal.js
/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
//#endregion
//#region node_modules/lodash-es/_root.js
/** Detect free variable `self`. */
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function("return this")();
//#endregion
//#region node_modules/lodash-es/_Symbol.js
/** Built-in value references. */
var Symbol$1 = root.Symbol;
//#endregion
//#region node_modules/lodash-es/_arrayMap.js
/**
* A specialized version of `_.map` for arrays without support for iteratee
* shorthands.
*
* @private
* @param {Array} [array] The array to iterate over.
* @param {Function} iteratee The function invoked per iteration.
* @returns {Array} Returns the new mapped array.
*/
function arrayMap(array, iteratee) {
	var index = -1, length = array == null ? 0 : array.length, result = Array(length);
	while (++index < length) result[index] = iteratee(array[index], index, array);
	return result;
}
//#endregion
//#region node_modules/lodash-es/isArray.js
/**
* Checks if `value` is classified as an `Array` object.
*
* @static
* @memberOf _
* @since 0.1.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is an array, else `false`.
* @example
*
* _.isArray([1, 2, 3]);
* // => true
*
* _.isArray(document.body.children);
* // => false
*
* _.isArray('abc');
* // => false
*
* _.isArray(_.noop);
* // => false
*/
var isArray = Array.isArray;
//#endregion
//#region node_modules/lodash-es/_getRawTag.js
/** Used for built-in method references. */
var objectProto$4 = Object.prototype;
/** Used to check objects for own properties. */
var hasOwnProperty$14 = objectProto$4.hasOwnProperty;
/**
* Used to resolve the
* [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
* of values.
*/
var nativeObjectToString$1 = objectProto$4.toString;
/** Built-in value references. */
var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : void 0;
/**
* A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
*
* @private
* @param {*} value The value to query.
* @returns {string} Returns the raw `toStringTag`.
*/
function getRawTag(value) {
	var isOwn = hasOwnProperty$14.call(value, symToStringTag$1), tag = value[symToStringTag$1];
	try {
		value[symToStringTag$1] = void 0;
		var unmasked = true;
	} catch (e) {}
	var result = nativeObjectToString$1.call(value);
	if (unmasked) if (isOwn) value[symToStringTag$1] = tag;
	else delete value[symToStringTag$1];
	return result;
}
//#endregion
//#region node_modules/lodash-es/_objectToString.js
/**
* Used to resolve the
* [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
* of values.
*/
var nativeObjectToString = Object.prototype.toString;
/**
* Converts `value` to a string using `Object.prototype.toString`.
*
* @private
* @param {*} value The value to convert.
* @returns {string} Returns the converted string.
*/
function objectToString(value) {
	return nativeObjectToString.call(value);
}
//#endregion
//#region node_modules/lodash-es/_baseGetTag.js
/** `Object#toString` result references. */
var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
/** Built-in value references. */
var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : void 0;
/**
* The base implementation of `getTag` without fallbacks for buggy environments.
*
* @private
* @param {*} value The value to query.
* @returns {string} Returns the `toStringTag`.
*/
function baseGetTag(value) {
	if (value == null) return value === void 0 ? undefinedTag : nullTag;
	return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}
//#endregion
//#region node_modules/lodash-es/isObjectLike.js
/**
* Checks if `value` is object-like. A value is object-like if it's not `null`
* and has a `typeof` result of "object".
*
* @static
* @memberOf _
* @since 4.0.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is object-like, else `false`.
* @example
*
* _.isObjectLike({});
* // => true
*
* _.isObjectLike([1, 2, 3]);
* // => true
*
* _.isObjectLike(_.noop);
* // => false
*
* _.isObjectLike(null);
* // => false
*/
function isObjectLike(value) {
	return value != null && typeof value == "object";
}
//#endregion
//#region node_modules/lodash-es/isSymbol.js
/** `Object#toString` result references. */
var symbolTag$3 = "[object Symbol]";
/**
* Checks if `value` is classified as a `Symbol` primitive or object.
*
* @static
* @memberOf _
* @since 4.0.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
* @example
*
* _.isSymbol(Symbol.iterator);
* // => true
*
* _.isSymbol('abc');
* // => false
*/
function isSymbol(value) {
	return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag$3;
}
//#endregion
//#region node_modules/lodash-es/_baseToString.js
/** Used as references for various `Number` constants. */
var INFINITY$1 = Infinity;
/** Used to convert symbols to primitives and strings. */
var symbolProto$2 = Symbol$1 ? Symbol$1.prototype : void 0, symbolToString = symbolProto$2 ? symbolProto$2.toString : void 0;
/**
* The base implementation of `_.toString` which doesn't convert nullish
* values to empty strings.
*
* @private
* @param {*} value The value to process.
* @returns {string} Returns the string.
*/
function baseToString(value) {
	if (typeof value == "string") return value;
	if (isArray(value)) return arrayMap(value, baseToString) + "";
	if (isSymbol(value)) return symbolToString ? symbolToString.call(value) : "";
	var result = value + "";
	return result == "0" && 1 / value == -INFINITY$1 ? "-0" : result;
}
//#endregion
//#region node_modules/lodash-es/toString.js
/**
* Converts `value` to a string. An empty string is returned for `null`
* and `undefined` values. The sign of `-0` is preserved.
*
* @static
* @memberOf _
* @since 4.0.0
* @category Lang
* @param {*} value The value to convert.
* @returns {string} Returns the converted string.
* @example
*
* _.toString(null);
* // => ''
*
* _.toString(-0);
* // => '-0'
*
* _.toString([1, 2, 3]);
* // => '1,2,3'
*/
function toString(value) {
	return value == null ? "" : baseToString(value);
}
//#endregion
//#region node_modules/lodash-es/_baseSlice.js
/**
* The base implementation of `_.slice` without an iteratee call guard.
*
* @private
* @param {Array} array The array to slice.
* @param {number} [start=0] The start position.
* @param {number} [end=array.length] The end position.
* @returns {Array} Returns the slice of `array`.
*/
function baseSlice(array, start, end) {
	var index = -1, length = array.length;
	if (start < 0) start = -start > length ? 0 : length + start;
	end = end > length ? length : end;
	if (end < 0) end += length;
	length = start > end ? 0 : end - start >>> 0;
	start >>>= 0;
	var result = Array(length);
	while (++index < length) result[index] = array[index + start];
	return result;
}
//#endregion
//#region node_modules/lodash-es/_castSlice.js
/**
* Casts `array` to a slice if it's needed.
*
* @private
* @param {Array} array The array to inspect.
* @param {number} start The start position.
* @param {number} [end=array.length] The end position.
* @returns {Array} Returns the cast slice.
*/
function castSlice(array, start, end) {
	var length = array.length;
	end = end === void 0 ? length : end;
	return !start && end >= length ? array : baseSlice(array, start, end);
}
//#endregion
//#region node_modules/lodash-es/_hasUnicode.js
/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
var reHasUnicode = RegExp("[\\u200d\\ud800-\\udfff\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff\\ufe0e\\ufe0f]");
/**
* Checks if `string` contains Unicode symbols.
*
* @private
* @param {string} string The string to inspect.
* @returns {boolean} Returns `true` if a symbol is found, else `false`.
*/
function hasUnicode(string) {
	return reHasUnicode.test(string);
}
//#endregion
//#region node_modules/lodash-es/_asciiToArray.js
/**
* Converts an ASCII `string` to an array.
*
* @private
* @param {string} string The string to convert.
* @returns {Array} Returns the converted array.
*/
function asciiToArray(string) {
	return string.split("");
}
//#endregion
//#region node_modules/lodash-es/_unicodeToArray.js
/** Used to compose unicode character classes. */
var rsAstralRange = "\\ud800-\\udfff", rsComboRange = "\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff", rsVarRange = "\\ufe0e\\ufe0f";
/** Used to compose unicode capture groups. */
var rsAstral = "[" + rsAstralRange + "]", rsCombo = "[" + rsComboRange + "]", rsFitz = "\\ud83c[\\udffb-\\udfff]", rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")", rsNonAstral = "[^" + rsAstralRange + "]", rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsZWJ = "\\u200d";
/** Used to compose unicode regexes. */
var reOptMod = rsModifier + "?", rsOptVar = "[" + rsVarRange + "]?", rsOptJoin = "(?:" + rsZWJ + "(?:" + [
	rsNonAstral,
	rsRegional,
	rsSurrPair
].join("|") + ")" + rsOptVar + reOptMod + ")*", rsSeq = rsOptVar + reOptMod + rsOptJoin, rsSymbol = "(?:" + [
	rsNonAstral + rsCombo + "?",
	rsCombo,
	rsRegional,
	rsSurrPair,
	rsAstral
].join("|") + ")";
/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
/**
* Converts a Unicode `string` to an array.
*
* @private
* @param {string} string The string to convert.
* @returns {Array} Returns the converted array.
*/
function unicodeToArray(string) {
	return string.match(reUnicode) || [];
}
//#endregion
//#region node_modules/lodash-es/_stringToArray.js
/**
* Converts `string` to an array.
*
* @private
* @param {string} string The string to convert.
* @returns {Array} Returns the converted array.
*/
function stringToArray(string) {
	return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
}
//#endregion
//#region node_modules/lodash-es/_createCaseFirst.js
/**
* Creates a function like `_.lowerFirst`.
*
* @private
* @param {string} methodName The name of the `String` case method to use.
* @returns {Function} Returns the new case function.
*/
function createCaseFirst(methodName) {
	return function(string) {
		string = toString(string);
		var strSymbols = hasUnicode(string) ? stringToArray(string) : void 0;
		var chr = strSymbols ? strSymbols[0] : string.charAt(0);
		var trailing = strSymbols ? castSlice(strSymbols, 1).join("") : string.slice(1);
		return chr[methodName]() + trailing;
	};
}
//#endregion
//#region node_modules/lodash-es/upperFirst.js
/**
* Converts the first character of `string` to upper case.
*
* @static
* @memberOf _
* @since 4.0.0
* @category String
* @param {string} [string=''] The string to convert.
* @returns {string} Returns the converted string.
* @example
*
* _.upperFirst('fred');
* // => 'Fred'
*
* _.upperFirst('FRED');
* // => 'FRED'
*/
var upperFirst = createCaseFirst("toUpperCase");
//#endregion
//#region node_modules/lodash-es/capitalize.js
/**
* Converts the first character of `string` to upper case and the remaining
* to lower case.
*
* @static
* @memberOf _
* @since 3.0.0
* @category String
* @param {string} [string=''] The string to capitalize.
* @returns {string} Returns the capitalized string.
* @example
*
* _.capitalize('FRED');
* // => 'Fred'
*/
function capitalize(string) {
	return upperFirst(toString(string).toLowerCase());
}
//#endregion
//#region node_modules/lodash-es/_isPrototype.js
/** Used for built-in method references. */
var objectProto$3 = Object.prototype;
/**
* Checks if `value` is likely a prototype object.
*
* @private
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
*/
function isPrototype(value) {
	var Ctor = value && value.constructor;
	return value === (typeof Ctor == "function" && Ctor.prototype || objectProto$3);
}
//#endregion
//#region node_modules/lodash-es/_overArg.js
/**
* Creates a unary function that invokes `func` with its argument transformed.
*
* @private
* @param {Function} func The function to wrap.
* @param {Function} transform The argument transform.
* @returns {Function} Returns the new function.
*/
function overArg(func, transform) {
	return function(arg) {
		return func(transform(arg));
	};
}
//#endregion
//#region node_modules/lodash-es/_nativeKeys.js
var nativeKeys = overArg(Object.keys, Object);
//#endregion
//#region node_modules/lodash-es/_baseKeys.js
/** Used to check objects for own properties. */
var hasOwnProperty$13 = Object.prototype.hasOwnProperty;
/**
* The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
*
* @private
* @param {Object} object The object to query.
* @returns {Array} Returns the array of property names.
*/
function baseKeys(object) {
	if (!isPrototype(object)) return nativeKeys(object);
	var result = [];
	for (var key in Object(object)) if (hasOwnProperty$13.call(object, key) && key != "constructor") result.push(key);
	return result;
}
//#endregion
//#region node_modules/lodash-es/isObject.js
/**
* Checks if `value` is the
* [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
* of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
*
* @static
* @memberOf _
* @since 0.1.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is an object, else `false`.
* @example
*
* _.isObject({});
* // => true
*
* _.isObject([1, 2, 3]);
* // => true
*
* _.isObject(_.noop);
* // => true
*
* _.isObject(null);
* // => false
*/
function isObject$1(value) {
	var type = typeof value;
	return value != null && (type == "object" || type == "function");
}
//#endregion
//#region node_modules/lodash-es/isFunction.js
/** `Object#toString` result references. */
var asyncTag = "[object AsyncFunction]", funcTag$2 = "[object Function]", genTag$1 = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
/**
* Checks if `value` is classified as a `Function` object.
*
* @static
* @memberOf _
* @since 0.1.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a function, else `false`.
* @example
*
* _.isFunction(_);
* // => true
*
* _.isFunction(/abc/);
* // => false
*/
function isFunction(value) {
	if (!isObject$1(value)) return false;
	var tag = baseGetTag(value);
	return tag == funcTag$2 || tag == genTag$1 || tag == asyncTag || tag == proxyTag;
}
//#endregion
//#region node_modules/lodash-es/_coreJsData.js
/** Used to detect overreaching core-js shims. */
var coreJsData = root["__core-js_shared__"];
//#endregion
//#region node_modules/lodash-es/_isMasked.js
/** Used to detect methods masquerading as native. */
var maskSrcKey = function() {
	var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
	return uid ? "Symbol(src)_1." + uid : "";
}();
/**
* Checks if `func` has its source masked.
*
* @private
* @param {Function} func The function to check.
* @returns {boolean} Returns `true` if `func` is masked, else `false`.
*/
function isMasked(func) {
	return !!maskSrcKey && maskSrcKey in func;
}
//#endregion
//#region node_modules/lodash-es/_toSource.js
/** Used to resolve the decompiled source of functions. */
var funcToString$2 = Function.prototype.toString;
/**
* Converts `func` to its source code.
*
* @private
* @param {Function} func The function to convert.
* @returns {string} Returns the source code.
*/
function toSource(func) {
	if (func != null) {
		try {
			return funcToString$2.call(func);
		} catch (e) {}
		try {
			return func + "";
		} catch (e) {}
	}
	return "";
}
//#endregion
//#region node_modules/lodash-es/_baseIsNative.js
/**
* Used to match `RegExp`
* [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
*/
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;
/** Used for built-in method references. */
var funcProto$1 = Function.prototype, objectProto$2 = Object.prototype;
/** Used to resolve the decompiled source of functions. */
var funcToString$1 = funcProto$1.toString;
/** Used to check objects for own properties. */
var hasOwnProperty$12 = objectProto$2.hasOwnProperty;
/** Used to detect if a method is native. */
var reIsNative = RegExp("^" + funcToString$1.call(hasOwnProperty$12).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
/**
* The base implementation of `_.isNative` without bad shim checks.
*
* @private
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a native function,
*  else `false`.
*/
function baseIsNative(value) {
	if (!isObject$1(value) || isMasked(value)) return false;
	return (isFunction(value) ? reIsNative : reIsHostCtor).test(toSource(value));
}
//#endregion
//#region node_modules/lodash-es/_getValue.js
/**
* Gets the value at `key` of `object`.
*
* @private
* @param {Object} [object] The object to query.
* @param {string} key The key of the property to get.
* @returns {*} Returns the property value.
*/
function getValue(object, key) {
	return object == null ? void 0 : object[key];
}
//#endregion
//#region node_modules/lodash-es/_getNative.js
/**
* Gets the native function at `key` of `object`.
*
* @private
* @param {Object} object The object to query.
* @param {string} key The key of the method to get.
* @returns {*} Returns the function if it's native, else `undefined`.
*/
function getNative(object, key) {
	var value = getValue(object, key);
	return baseIsNative(value) ? value : void 0;
}
//#endregion
//#region node_modules/lodash-es/_DataView.js
var DataView = getNative(root, "DataView");
//#endregion
//#region node_modules/lodash-es/_Map.js
var Map$1 = getNative(root, "Map");
//#endregion
//#region node_modules/lodash-es/_Promise.js
var Promise$1 = getNative(root, "Promise");
//#endregion
//#region node_modules/lodash-es/_Set.js
var Set$1 = getNative(root, "Set");
//#endregion
//#region node_modules/lodash-es/_WeakMap.js
var WeakMap$1 = getNative(root, "WeakMap");
//#endregion
//#region node_modules/lodash-es/_getTag.js
/** `Object#toString` result references. */
var mapTag$6 = "[object Map]", objectTag$4 = "[object Object]", promiseTag = "[object Promise]", setTag$6 = "[object Set]", weakMapTag$2 = "[object WeakMap]";
var dataViewTag$4 = "[object DataView]";
/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map$1), promiseCtorString = toSource(Promise$1), setCtorString = toSource(Set$1), weakMapCtorString = toSource(WeakMap$1);
/**
* Gets the `toStringTag` of `value`.
*
* @private
* @param {*} value The value to query.
* @returns {string} Returns the `toStringTag`.
*/
var getTag = baseGetTag;
if (DataView && getTag(new DataView(/* @__PURE__ */ new ArrayBuffer(1))) != dataViewTag$4 || Map$1 && getTag(new Map$1()) != mapTag$6 || Promise$1 && getTag(Promise$1.resolve()) != promiseTag || Set$1 && getTag(new Set$1()) != setTag$6 || WeakMap$1 && getTag(new WeakMap$1()) != weakMapTag$2) getTag = function(value) {
	var result = baseGetTag(value), Ctor = result == objectTag$4 ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
	if (ctorString) switch (ctorString) {
		case dataViewCtorString: return dataViewTag$4;
		case mapCtorString: return mapTag$6;
		case promiseCtorString: return promiseTag;
		case setCtorString: return setTag$6;
		case weakMapCtorString: return weakMapTag$2;
	}
	return result;
};
var _getTag_default = getTag;
//#endregion
//#region node_modules/lodash-es/_baseIsArguments.js
/** `Object#toString` result references. */
var argsTag$3 = "[object Arguments]";
/**
* The base implementation of `_.isArguments`.
*
* @private
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is an `arguments` object,
*/
function baseIsArguments(value) {
	return isObjectLike(value) && baseGetTag(value) == argsTag$3;
}
//#endregion
//#region node_modules/lodash-es/isArguments.js
/** Used for built-in method references. */
var objectProto$1 = Object.prototype;
/** Used to check objects for own properties. */
var hasOwnProperty$11 = objectProto$1.hasOwnProperty;
/** Built-in value references. */
var propertyIsEnumerable$1 = objectProto$1.propertyIsEnumerable;
/**
* Checks if `value` is likely an `arguments` object.
*
* @static
* @memberOf _
* @since 0.1.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is an `arguments` object,
*  else `false`.
* @example
*
* _.isArguments(function() { return arguments; }());
* // => true
*
* _.isArguments([1, 2, 3]);
* // => false
*/
var isArguments = baseIsArguments(function() {
	return arguments;
}()) ? baseIsArguments : function(value) {
	return isObjectLike(value) && hasOwnProperty$11.call(value, "callee") && !propertyIsEnumerable$1.call(value, "callee");
};
//#endregion
//#region node_modules/lodash-es/isLength.js
/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER$1 = 9007199254740991;
/**
* Checks if `value` is a valid array-like length.
*
* **Note:** This method is loosely based on
* [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
*
* @static
* @memberOf _
* @since 4.0.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
* @example
*
* _.isLength(3);
* // => true
*
* _.isLength(Number.MIN_VALUE);
* // => false
*
* _.isLength(Infinity);
* // => false
*
* _.isLength('3');
* // => false
*/
function isLength(value) {
	return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER$1;
}
//#endregion
//#region node_modules/lodash-es/isArrayLike.js
/**
* Checks if `value` is array-like. A value is considered array-like if it's
* not a function and has a `value.length` that's an integer greater than or
* equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
*
* @static
* @memberOf _
* @since 4.0.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is array-like, else `false`.
* @example
*
* _.isArrayLike([1, 2, 3]);
* // => true
*
* _.isArrayLike(document.body.children);
* // => true
*
* _.isArrayLike('abc');
* // => true
*
* _.isArrayLike(_.noop);
* // => false
*/
function isArrayLike(value) {
	return value != null && isLength(value.length) && !isFunction(value);
}
//#endregion
//#region node_modules/lodash-es/stubFalse.js
/**
* This method returns `false`.
*
* @static
* @memberOf _
* @since 4.13.0
* @category Util
* @returns {boolean} Returns `false`.
* @example
*
* _.times(2, _.stubFalse);
* // => [false, false]
*/
function stubFalse() {
	return false;
}
//#endregion
//#region node_modules/lodash-es/isBuffer.js
/** Detect free variable `exports`. */
var freeExports$2 = typeof exports == "object" && exports && !exports.nodeType && exports;
/** Detect free variable `module`. */
var freeModule$2 = freeExports$2 && typeof module == "object" && module && !module.nodeType && module;
/** Built-in value references. */
var Buffer$1 = freeModule$2 && freeModule$2.exports === freeExports$2 ? root.Buffer : void 0;
/**
* Checks if `value` is a buffer.
*
* @static
* @memberOf _
* @since 4.3.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
* @example
*
* _.isBuffer(new Buffer(2));
* // => true
*
* _.isBuffer(new Uint8Array(2));
* // => false
*/
var isBuffer = (Buffer$1 ? Buffer$1.isBuffer : void 0) || stubFalse;
//#endregion
//#region node_modules/lodash-es/_baseIsTypedArray.js
/** `Object#toString` result references. */
var argsTag$2 = "[object Arguments]", arrayTag$2 = "[object Array]", boolTag$3 = "[object Boolean]", dateTag$3 = "[object Date]", errorTag$2 = "[object Error]", funcTag$1 = "[object Function]", mapTag$5 = "[object Map]", numberTag$3 = "[object Number]", objectTag$3 = "[object Object]", regexpTag$3 = "[object RegExp]", setTag$5 = "[object Set]", stringTag$3 = "[object String]", weakMapTag$1 = "[object WeakMap]";
var arrayBufferTag$3 = "[object ArrayBuffer]", dataViewTag$3 = "[object DataView]", float32Tag$2 = "[object Float32Array]", float64Tag$2 = "[object Float64Array]", int8Tag$2 = "[object Int8Array]", int16Tag$2 = "[object Int16Array]", int32Tag$2 = "[object Int32Array]", uint8Tag$2 = "[object Uint8Array]", uint8ClampedTag$2 = "[object Uint8ClampedArray]", uint16Tag$2 = "[object Uint16Array]", uint32Tag$2 = "[object Uint32Array]";
/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag$2] = typedArrayTags[float64Tag$2] = typedArrayTags[int8Tag$2] = typedArrayTags[int16Tag$2] = typedArrayTags[int32Tag$2] = typedArrayTags[uint8Tag$2] = typedArrayTags[uint8ClampedTag$2] = typedArrayTags[uint16Tag$2] = typedArrayTags[uint32Tag$2] = true;
typedArrayTags[argsTag$2] = typedArrayTags[arrayTag$2] = typedArrayTags[arrayBufferTag$3] = typedArrayTags[boolTag$3] = typedArrayTags[dataViewTag$3] = typedArrayTags[dateTag$3] = typedArrayTags[errorTag$2] = typedArrayTags[funcTag$1] = typedArrayTags[mapTag$5] = typedArrayTags[numberTag$3] = typedArrayTags[objectTag$3] = typedArrayTags[regexpTag$3] = typedArrayTags[setTag$5] = typedArrayTags[stringTag$3] = typedArrayTags[weakMapTag$1] = false;
/**
* The base implementation of `_.isTypedArray` without Node.js optimizations.
*
* @private
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
*/
function baseIsTypedArray(value) {
	return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}
//#endregion
//#region node_modules/lodash-es/_baseUnary.js
/**
* The base implementation of `_.unary` without support for storing metadata.
*
* @private
* @param {Function} func The function to cap arguments for.
* @returns {Function} Returns the new capped function.
*/
function baseUnary(func) {
	return function(value) {
		return func(value);
	};
}
//#endregion
//#region node_modules/lodash-es/_nodeUtil.js
/** Detect free variable `exports`. */
var freeExports$1 = typeof exports == "object" && exports && !exports.nodeType && exports;
/** Detect free variable `module`. */
var freeModule$1 = freeExports$1 && typeof module == "object" && module && !module.nodeType && module;
/** Detect free variable `process` from Node.js. */
var freeProcess = freeModule$1 && freeModule$1.exports === freeExports$1 && freeGlobal.process;
/** Used to access faster Node.js helpers. */
var nodeUtil = function() {
	try {
		var types = freeModule$1 && freeModule$1.require && freeModule$1.require("util").types;
		if (types) return types;
		return freeProcess && freeProcess.binding && freeProcess.binding("util");
	} catch (e) {}
}();
//#endregion
//#region node_modules/lodash-es/isTypedArray.js
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
/**
* Checks if `value` is classified as a typed array.
*
* @static
* @memberOf _
* @since 3.0.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
* @example
*
* _.isTypedArray(new Uint8Array);
* // => true
*
* _.isTypedArray([]);
* // => false
*/
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
//#endregion
//#region node_modules/lodash-es/isEmpty.js
/** `Object#toString` result references. */
var mapTag$4 = "[object Map]", setTag$4 = "[object Set]";
/** Used to check objects for own properties. */
var hasOwnProperty$10 = Object.prototype.hasOwnProperty;
/**
* Checks if `value` is an empty object, collection, map, or set.
*
* Objects are considered empty if they have no own enumerable string keyed
* properties.
*
* Array-like values such as `arguments` objects, arrays, buffers, strings, or
* jQuery-like collections are considered empty if they have a `length` of `0`.
* Similarly, maps and sets are considered empty if they have a `size` of `0`.
*
* @static
* @memberOf _
* @since 0.1.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is empty, else `false`.
* @example
*
* _.isEmpty(null);
* // => true
*
* _.isEmpty(true);
* // => true
*
* _.isEmpty(1);
* // => true
*
* _.isEmpty([1, 2, 3]);
* // => false
*
* _.isEmpty({ 'a': 1 });
* // => false
*/
function isEmpty(value) {
	if (value == null) return true;
	if (isArrayLike(value) && (isArray(value) || typeof value == "string" || typeof value.splice == "function" || isBuffer(value) || isTypedArray(value) || isArguments(value))) return !value.length;
	var tag = _getTag_default(value);
	if (tag == mapTag$4 || tag == setTag$4) return !value.size;
	if (isPrototype(value)) return !baseKeys(value).length;
	for (var key in value) if (hasOwnProperty$10.call(value, key)) return false;
	return true;
}
//#endregion
//#region node_modules/lodash-es/_listCacheClear.js
/**
* Removes all key-value entries from the list cache.
*
* @private
* @name clear
* @memberOf ListCache
*/
function listCacheClear() {
	this.__data__ = [];
	this.size = 0;
}
//#endregion
//#region node_modules/lodash-es/eq.js
/**
* Performs a
* [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
* comparison between two values to determine if they are equivalent.
*
* @static
* @memberOf _
* @since 4.0.0
* @category Lang
* @param {*} value The value to compare.
* @param {*} other The other value to compare.
* @returns {boolean} Returns `true` if the values are equivalent, else `false`.
* @example
*
* var object = { 'a': 1 };
* var other = { 'a': 1 };
*
* _.eq(object, object);
* // => true
*
* _.eq(object, other);
* // => false
*
* _.eq('a', 'a');
* // => true
*
* _.eq('a', Object('a'));
* // => false
*
* _.eq(NaN, NaN);
* // => true
*/
function eq(value, other) {
	return value === other || value !== value && other !== other;
}
//#endregion
//#region node_modules/lodash-es/_assocIndexOf.js
/**
* Gets the index at which the `key` is found in `array` of key-value pairs.
*
* @private
* @param {Array} array The array to inspect.
* @param {*} key The key to search for.
* @returns {number} Returns the index of the matched value, else `-1`.
*/
function assocIndexOf(array, key) {
	var length = array.length;
	while (length--) if (eq(array[length][0], key)) return length;
	return -1;
}
//#endregion
//#region node_modules/lodash-es/_listCacheDelete.js
/** Built-in value references. */
var splice = Array.prototype.splice;
/**
* Removes `key` and its value from the list cache.
*
* @private
* @name delete
* @memberOf ListCache
* @param {string} key The key of the value to remove.
* @returns {boolean} Returns `true` if the entry was removed, else `false`.
*/
function listCacheDelete(key) {
	var data = this.__data__, index = assocIndexOf(data, key);
	if (index < 0) return false;
	if (index == data.length - 1) data.pop();
	else splice.call(data, index, 1);
	--this.size;
	return true;
}
//#endregion
//#region node_modules/lodash-es/_listCacheGet.js
/**
* Gets the list cache value for `key`.
*
* @private
* @name get
* @memberOf ListCache
* @param {string} key The key of the value to get.
* @returns {*} Returns the entry value.
*/
function listCacheGet(key) {
	var data = this.__data__, index = assocIndexOf(data, key);
	return index < 0 ? void 0 : data[index][1];
}
//#endregion
//#region node_modules/lodash-es/_listCacheHas.js
/**
* Checks if a list cache value for `key` exists.
*
* @private
* @name has
* @memberOf ListCache
* @param {string} key The key of the entry to check.
* @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
*/
function listCacheHas(key) {
	return assocIndexOf(this.__data__, key) > -1;
}
//#endregion
//#region node_modules/lodash-es/_listCacheSet.js
/**
* Sets the list cache `key` to `value`.
*
* @private
* @name set
* @memberOf ListCache
* @param {string} key The key of the value to set.
* @param {*} value The value to set.
* @returns {Object} Returns the list cache instance.
*/
function listCacheSet(key, value) {
	var data = this.__data__, index = assocIndexOf(data, key);
	if (index < 0) {
		++this.size;
		data.push([key, value]);
	} else data[index][1] = value;
	return this;
}
//#endregion
//#region node_modules/lodash-es/_ListCache.js
/**
* Creates an list cache object.
*
* @private
* @constructor
* @param {Array} [entries] The key-value pairs to cache.
*/
function ListCache(entries) {
	var index = -1, length = entries == null ? 0 : entries.length;
	this.clear();
	while (++index < length) {
		var entry = entries[index];
		this.set(entry[0], entry[1]);
	}
}
ListCache.prototype.clear = listCacheClear;
ListCache.prototype["delete"] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;
//#endregion
//#region node_modules/lodash-es/_stackClear.js
/**
* Removes all key-value entries from the stack.
*
* @private
* @name clear
* @memberOf Stack
*/
function stackClear() {
	this.__data__ = new ListCache();
	this.size = 0;
}
//#endregion
//#region node_modules/lodash-es/_stackDelete.js
/**
* Removes `key` and its value from the stack.
*
* @private
* @name delete
* @memberOf Stack
* @param {string} key The key of the value to remove.
* @returns {boolean} Returns `true` if the entry was removed, else `false`.
*/
function stackDelete(key) {
	var data = this.__data__, result = data["delete"](key);
	this.size = data.size;
	return result;
}
//#endregion
//#region node_modules/lodash-es/_stackGet.js
/**
* Gets the stack value for `key`.
*
* @private
* @name get
* @memberOf Stack
* @param {string} key The key of the value to get.
* @returns {*} Returns the entry value.
*/
function stackGet(key) {
	return this.__data__.get(key);
}
//#endregion
//#region node_modules/lodash-es/_stackHas.js
/**
* Checks if a stack value for `key` exists.
*
* @private
* @name has
* @memberOf Stack
* @param {string} key The key of the entry to check.
* @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
*/
function stackHas(key) {
	return this.__data__.has(key);
}
//#endregion
//#region node_modules/lodash-es/_nativeCreate.js
var nativeCreate = getNative(Object, "create");
//#endregion
//#region node_modules/lodash-es/_hashClear.js
/**
* Removes all key-value entries from the hash.
*
* @private
* @name clear
* @memberOf Hash
*/
function hashClear() {
	this.__data__ = nativeCreate ? nativeCreate(null) : {};
	this.size = 0;
}
//#endregion
//#region node_modules/lodash-es/_hashDelete.js
/**
* Removes `key` and its value from the hash.
*
* @private
* @name delete
* @memberOf Hash
* @param {Object} hash The hash to modify.
* @param {string} key The key of the value to remove.
* @returns {boolean} Returns `true` if the entry was removed, else `false`.
*/
function hashDelete(key) {
	var result = this.has(key) && delete this.__data__[key];
	this.size -= result ? 1 : 0;
	return result;
}
//#endregion
//#region node_modules/lodash-es/_hashGet.js
/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$2 = "__lodash_hash_undefined__";
/** Used to check objects for own properties. */
var hasOwnProperty$9 = Object.prototype.hasOwnProperty;
/**
* Gets the hash value for `key`.
*
* @private
* @name get
* @memberOf Hash
* @param {string} key The key of the value to get.
* @returns {*} Returns the entry value.
*/
function hashGet(key) {
	var data = this.__data__;
	if (nativeCreate) {
		var result = data[key];
		return result === HASH_UNDEFINED$2 ? void 0 : result;
	}
	return hasOwnProperty$9.call(data, key) ? data[key] : void 0;
}
//#endregion
//#region node_modules/lodash-es/_hashHas.js
/** Used to check objects for own properties. */
var hasOwnProperty$8 = Object.prototype.hasOwnProperty;
/**
* Checks if a hash value for `key` exists.
*
* @private
* @name has
* @memberOf Hash
* @param {string} key The key of the entry to check.
* @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
*/
function hashHas(key) {
	var data = this.__data__;
	return nativeCreate ? data[key] !== void 0 : hasOwnProperty$8.call(data, key);
}
//#endregion
//#region node_modules/lodash-es/_hashSet.js
/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$1 = "__lodash_hash_undefined__";
/**
* Sets the hash `key` to `value`.
*
* @private
* @name set
* @memberOf Hash
* @param {string} key The key of the value to set.
* @param {*} value The value to set.
* @returns {Object} Returns the hash instance.
*/
function hashSet(key, value) {
	var data = this.__data__;
	this.size += this.has(key) ? 0 : 1;
	data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED$1 : value;
	return this;
}
//#endregion
//#region node_modules/lodash-es/_Hash.js
/**
* Creates a hash object.
*
* @private
* @constructor
* @param {Array} [entries] The key-value pairs to cache.
*/
function Hash(entries) {
	var index = -1, length = entries == null ? 0 : entries.length;
	this.clear();
	while (++index < length) {
		var entry = entries[index];
		this.set(entry[0], entry[1]);
	}
}
Hash.prototype.clear = hashClear;
Hash.prototype["delete"] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;
//#endregion
//#region node_modules/lodash-es/_mapCacheClear.js
/**
* Removes all key-value entries from the map.
*
* @private
* @name clear
* @memberOf MapCache
*/
function mapCacheClear() {
	this.size = 0;
	this.__data__ = {
		"hash": new Hash(),
		"map": new (Map$1 || ListCache)(),
		"string": new Hash()
	};
}
//#endregion
//#region node_modules/lodash-es/_isKeyable.js
/**
* Checks if `value` is suitable for use as unique object key.
*
* @private
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is suitable, else `false`.
*/
function isKeyable(value) {
	var type = typeof value;
	return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
}
//#endregion
//#region node_modules/lodash-es/_getMapData.js
/**
* Gets the data for `map`.
*
* @private
* @param {Object} map The map to query.
* @param {string} key The reference key.
* @returns {*} Returns the map data.
*/
function getMapData(map, key) {
	var data = map.__data__;
	return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
}
//#endregion
//#region node_modules/lodash-es/_mapCacheDelete.js
/**
* Removes `key` and its value from the map.
*
* @private
* @name delete
* @memberOf MapCache
* @param {string} key The key of the value to remove.
* @returns {boolean} Returns `true` if the entry was removed, else `false`.
*/
function mapCacheDelete(key) {
	var result = getMapData(this, key)["delete"](key);
	this.size -= result ? 1 : 0;
	return result;
}
//#endregion
//#region node_modules/lodash-es/_mapCacheGet.js
/**
* Gets the map value for `key`.
*
* @private
* @name get
* @memberOf MapCache
* @param {string} key The key of the value to get.
* @returns {*} Returns the entry value.
*/
function mapCacheGet(key) {
	return getMapData(this, key).get(key);
}
//#endregion
//#region node_modules/lodash-es/_mapCacheHas.js
/**
* Checks if a map value for `key` exists.
*
* @private
* @name has
* @memberOf MapCache
* @param {string} key The key of the entry to check.
* @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
*/
function mapCacheHas(key) {
	return getMapData(this, key).has(key);
}
//#endregion
//#region node_modules/lodash-es/_mapCacheSet.js
/**
* Sets the map `key` to `value`.
*
* @private
* @name set
* @memberOf MapCache
* @param {string} key The key of the value to set.
* @param {*} value The value to set.
* @returns {Object} Returns the map cache instance.
*/
function mapCacheSet(key, value) {
	var data = getMapData(this, key), size = data.size;
	data.set(key, value);
	this.size += data.size == size ? 0 : 1;
	return this;
}
//#endregion
//#region node_modules/lodash-es/_MapCache.js
/**
* Creates a map cache object to store key-value pairs.
*
* @private
* @constructor
* @param {Array} [entries] The key-value pairs to cache.
*/
function MapCache(entries) {
	var index = -1, length = entries == null ? 0 : entries.length;
	this.clear();
	while (++index < length) {
		var entry = entries[index];
		this.set(entry[0], entry[1]);
	}
}
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype["delete"] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;
//#endregion
//#region node_modules/lodash-es/_stackSet.js
/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;
/**
* Sets the stack `key` to `value`.
*
* @private
* @name set
* @memberOf Stack
* @param {string} key The key of the value to set.
* @param {*} value The value to set.
* @returns {Object} Returns the stack cache instance.
*/
function stackSet(key, value) {
	var data = this.__data__;
	if (data instanceof ListCache) {
		var pairs = data.__data__;
		if (!Map$1 || pairs.length < LARGE_ARRAY_SIZE - 1) {
			pairs.push([key, value]);
			this.size = ++data.size;
			return this;
		}
		data = this.__data__ = new MapCache(pairs);
	}
	data.set(key, value);
	this.size = data.size;
	return this;
}
//#endregion
//#region node_modules/lodash-es/_Stack.js
/**
* Creates a stack cache object to store key-value pairs.
*
* @private
* @constructor
* @param {Array} [entries] The key-value pairs to cache.
*/
function Stack(entries) {
	var data = this.__data__ = new ListCache(entries);
	this.size = data.size;
}
Stack.prototype.clear = stackClear;
Stack.prototype["delete"] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;
//#endregion
//#region node_modules/lodash-es/_setCacheAdd.js
/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = "__lodash_hash_undefined__";
/**
* Adds `value` to the array cache.
*
* @private
* @name add
* @memberOf SetCache
* @alias push
* @param {*} value The value to cache.
* @returns {Object} Returns the cache instance.
*/
function setCacheAdd(value) {
	this.__data__.set(value, HASH_UNDEFINED);
	return this;
}
//#endregion
//#region node_modules/lodash-es/_setCacheHas.js
/**
* Checks if `value` is in the array cache.
*
* @private
* @name has
* @memberOf SetCache
* @param {*} value The value to search for.
* @returns {boolean} Returns `true` if `value` is found, else `false`.
*/
function setCacheHas(value) {
	return this.__data__.has(value);
}
//#endregion
//#region node_modules/lodash-es/_SetCache.js
/**
*
* Creates an array cache object to store unique values.
*
* @private
* @constructor
* @param {Array} [values] The values to cache.
*/
function SetCache(values) {
	var index = -1, length = values == null ? 0 : values.length;
	this.__data__ = new MapCache();
	while (++index < length) this.add(values[index]);
}
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;
//#endregion
//#region node_modules/lodash-es/_arraySome.js
/**
* A specialized version of `_.some` for arrays without support for iteratee
* shorthands.
*
* @private
* @param {Array} [array] The array to iterate over.
* @param {Function} predicate The function invoked per iteration.
* @returns {boolean} Returns `true` if any element passes the predicate check,
*  else `false`.
*/
function arraySome(array, predicate) {
	var index = -1, length = array == null ? 0 : array.length;
	while (++index < length) if (predicate(array[index], index, array)) return true;
	return false;
}
//#endregion
//#region node_modules/lodash-es/_cacheHas.js
/**
* Checks if a `cache` value for `key` exists.
*
* @private
* @param {Object} cache The cache to query.
* @param {string} key The key of the entry to check.
* @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
*/
function cacheHas(cache, key) {
	return cache.has(key);
}
//#endregion
//#region node_modules/lodash-es/_equalArrays.js
/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$3 = 1, COMPARE_UNORDERED_FLAG$1 = 2;
/**
* A specialized version of `baseIsEqualDeep` for arrays with support for
* partial deep comparisons.
*
* @private
* @param {Array} array The array to compare.
* @param {Array} other The other array to compare.
* @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
* @param {Function} customizer The function to customize comparisons.
* @param {Function} equalFunc The function to determine equivalents of values.
* @param {Object} stack Tracks traversed `array` and `other` objects.
* @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
*/
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
	var isPartial = bitmask & COMPARE_PARTIAL_FLAG$3, arrLength = array.length, othLength = other.length;
	if (arrLength != othLength && !(isPartial && othLength > arrLength)) return false;
	var arrStacked = stack.get(array);
	var othStacked = stack.get(other);
	if (arrStacked && othStacked) return arrStacked == other && othStacked == array;
	var index = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG$1 ? new SetCache() : void 0;
	stack.set(array, other);
	stack.set(other, array);
	while (++index < arrLength) {
		var arrValue = array[index], othValue = other[index];
		if (customizer) var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
		if (compared !== void 0) {
			if (compared) continue;
			result = false;
			break;
		}
		if (seen) {
			if (!arraySome(other, function(othValue, othIndex) {
				if (!cacheHas(seen, othIndex) && (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) return seen.push(othIndex);
			})) {
				result = false;
				break;
			}
		} else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
			result = false;
			break;
		}
	}
	stack["delete"](array);
	stack["delete"](other);
	return result;
}
//#endregion
//#region node_modules/lodash-es/_Uint8Array.js
/** Built-in value references. */
var Uint8Array = root.Uint8Array;
//#endregion
//#region node_modules/lodash-es/_mapToArray.js
/**
* Converts `map` to its key-value pairs.
*
* @private
* @param {Object} map The map to convert.
* @returns {Array} Returns the key-value pairs.
*/
function mapToArray(map) {
	var index = -1, result = Array(map.size);
	map.forEach(function(value, key) {
		result[++index] = [key, value];
	});
	return result;
}
//#endregion
//#region node_modules/lodash-es/_setToArray.js
/**
* Converts `set` to an array of its values.
*
* @private
* @param {Object} set The set to convert.
* @returns {Array} Returns the values.
*/
function setToArray(set) {
	var index = -1, result = Array(set.size);
	set.forEach(function(value) {
		result[++index] = value;
	});
	return result;
}
//#endregion
//#region node_modules/lodash-es/_equalByTag.js
/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$2 = 1, COMPARE_UNORDERED_FLAG = 2;
/** `Object#toString` result references. */
var boolTag$2 = "[object Boolean]", dateTag$2 = "[object Date]", errorTag$1 = "[object Error]", mapTag$3 = "[object Map]", numberTag$2 = "[object Number]", regexpTag$2 = "[object RegExp]", setTag$3 = "[object Set]", stringTag$2 = "[object String]", symbolTag$2 = "[object Symbol]";
var arrayBufferTag$2 = "[object ArrayBuffer]", dataViewTag$2 = "[object DataView]";
/** Used to convert symbols to primitives and strings. */
var symbolProto$1 = Symbol$1 ? Symbol$1.prototype : void 0, symbolValueOf$1 = symbolProto$1 ? symbolProto$1.valueOf : void 0;
/**
* A specialized version of `baseIsEqualDeep` for comparing objects of
* the same `toStringTag`.
*
* **Note:** This function only supports comparing values with tags of
* `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
*
* @private
* @param {Object} object The object to compare.
* @param {Object} other The other object to compare.
* @param {string} tag The `toStringTag` of the objects to compare.
* @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
* @param {Function} customizer The function to customize comparisons.
* @param {Function} equalFunc The function to determine equivalents of values.
* @param {Object} stack Tracks traversed `object` and `other` objects.
* @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
*/
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
	switch (tag) {
		case dataViewTag$2:
			if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) return false;
			object = object.buffer;
			other = other.buffer;
		case arrayBufferTag$2:
			if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array(object), new Uint8Array(other))) return false;
			return true;
		case boolTag$2:
		case dateTag$2:
		case numberTag$2: return eq(+object, +other);
		case errorTag$1: return object.name == other.name && object.message == other.message;
		case regexpTag$2:
		case stringTag$2: return object == other + "";
		case mapTag$3: var convert = mapToArray;
		case setTag$3:
			var isPartial = bitmask & COMPARE_PARTIAL_FLAG$2;
			convert || (convert = setToArray);
			if (object.size != other.size && !isPartial) return false;
			var stacked = stack.get(object);
			if (stacked) return stacked == other;
			bitmask |= COMPARE_UNORDERED_FLAG;
			stack.set(object, other);
			var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
			stack["delete"](object);
			return result;
		case symbolTag$2: if (symbolValueOf$1) return symbolValueOf$1.call(object) == symbolValueOf$1.call(other);
	}
	return false;
}
//#endregion
//#region node_modules/lodash-es/_arrayPush.js
/**
* Appends the elements of `values` to `array`.
*
* @private
* @param {Array} array The array to modify.
* @param {Array} values The values to append.
* @returns {Array} Returns `array`.
*/
function arrayPush(array, values) {
	var index = -1, length = values.length, offset = array.length;
	while (++index < length) array[offset + index] = values[index];
	return array;
}
//#endregion
//#region node_modules/lodash-es/_baseGetAllKeys.js
/**
* The base implementation of `getAllKeys` and `getAllKeysIn` which uses
* `keysFunc` and `symbolsFunc` to get the enumerable property names and
* symbols of `object`.
*
* @private
* @param {Object} object The object to query.
* @param {Function} keysFunc The function to get the keys of `object`.
* @param {Function} symbolsFunc The function to get the symbols of `object`.
* @returns {Array} Returns the array of property names and symbols.
*/
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
	var result = keysFunc(object);
	return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}
//#endregion
//#region node_modules/lodash-es/_arrayFilter.js
/**
* A specialized version of `_.filter` for arrays without support for
* iteratee shorthands.
*
* @private
* @param {Array} [array] The array to iterate over.
* @param {Function} predicate The function invoked per iteration.
* @returns {Array} Returns the new filtered array.
*/
function arrayFilter(array, predicate) {
	var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
	while (++index < length) {
		var value = array[index];
		if (predicate(value, index, array)) result[resIndex++] = value;
	}
	return result;
}
//#endregion
//#region node_modules/lodash-es/stubArray.js
/**
* This method returns a new empty array.
*
* @static
* @memberOf _
* @since 4.13.0
* @category Util
* @returns {Array} Returns the new empty array.
* @example
*
* var arrays = _.times(2, _.stubArray);
*
* console.log(arrays);
* // => [[], []]
*
* console.log(arrays[0] === arrays[1]);
* // => false
*/
function stubArray() {
	return [];
}
//#endregion
//#region node_modules/lodash-es/_getSymbols.js
/** Built-in value references. */
var propertyIsEnumerable = Object.prototype.propertyIsEnumerable;
var nativeGetSymbols = Object.getOwnPropertySymbols;
/**
* Creates an array of the own enumerable symbols of `object`.
*
* @private
* @param {Object} object The object to query.
* @returns {Array} Returns the array of symbols.
*/
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
	if (object == null) return [];
	object = Object(object);
	return arrayFilter(nativeGetSymbols(object), function(symbol) {
		return propertyIsEnumerable.call(object, symbol);
	});
};
//#endregion
//#region node_modules/lodash-es/_baseTimes.js
/**
* The base implementation of `_.times` without support for iteratee shorthands
* or max array length checks.
*
* @private
* @param {number} n The number of times to invoke `iteratee`.
* @param {Function} iteratee The function invoked per iteration.
* @returns {Array} Returns the array of results.
*/
function baseTimes(n, iteratee) {
	var index = -1, result = Array(n);
	while (++index < n) result[index] = iteratee(index);
	return result;
}
//#endregion
//#region node_modules/lodash-es/_isIndex.js
/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;
/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;
/**
* Checks if `value` is a valid array-like index.
*
* @private
* @param {*} value The value to check.
* @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
* @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
*/
function isIndex(value, length) {
	var type = typeof value;
	length = length == null ? MAX_SAFE_INTEGER : length;
	return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
}
//#endregion
//#region node_modules/lodash-es/_arrayLikeKeys.js
/** Used to check objects for own properties. */
var hasOwnProperty$7 = Object.prototype.hasOwnProperty;
/**
* Creates an array of the enumerable property names of the array-like `value`.
*
* @private
* @param {*} value The value to query.
* @param {boolean} inherited Specify returning inherited property names.
* @returns {Array} Returns the array of property names.
*/
function arrayLikeKeys(value, inherited) {
	var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
	for (var key in value) if ((inherited || hasOwnProperty$7.call(value, key)) && !(skipIndexes && (key == "length" || isBuff && (key == "offset" || key == "parent") || isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || isIndex(key, length)))) result.push(key);
	return result;
}
//#endregion
//#region node_modules/lodash-es/keys.js
/**
* Creates an array of the own enumerable property names of `object`.
*
* **Note:** Non-object values are coerced to objects. See the
* [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
* for more details.
*
* @static
* @since 0.1.0
* @memberOf _
* @category Object
* @param {Object} object The object to query.
* @returns {Array} Returns the array of property names.
* @example
*
* function Foo() {
*   this.a = 1;
*   this.b = 2;
* }
*
* Foo.prototype.c = 3;
*
* _.keys(new Foo);
* // => ['a', 'b'] (iteration order is not guaranteed)
*
* _.keys('hi');
* // => ['0', '1']
*/
function keys(object) {
	return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}
//#endregion
//#region node_modules/lodash-es/_getAllKeys.js
/**
* Creates an array of own enumerable property names and symbols of `object`.
*
* @private
* @param {Object} object The object to query.
* @returns {Array} Returns the array of property names and symbols.
*/
function getAllKeys(object) {
	return baseGetAllKeys(object, keys, getSymbols);
}
//#endregion
//#region node_modules/lodash-es/_equalObjects.js
/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$1 = 1;
/** Used to check objects for own properties. */
var hasOwnProperty$6 = Object.prototype.hasOwnProperty;
/**
* A specialized version of `baseIsEqualDeep` for objects with support for
* partial deep comparisons.
*
* @private
* @param {Object} object The object to compare.
* @param {Object} other The other object to compare.
* @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
* @param {Function} customizer The function to customize comparisons.
* @param {Function} equalFunc The function to determine equivalents of values.
* @param {Object} stack Tracks traversed `object` and `other` objects.
* @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
*/
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
	var isPartial = bitmask & COMPARE_PARTIAL_FLAG$1, objProps = getAllKeys(object), objLength = objProps.length;
	if (objLength != getAllKeys(other).length && !isPartial) return false;
	var index = objLength;
	while (index--) {
		var key = objProps[index];
		if (!(isPartial ? key in other : hasOwnProperty$6.call(other, key))) return false;
	}
	var objStacked = stack.get(object);
	var othStacked = stack.get(other);
	if (objStacked && othStacked) return objStacked == other && othStacked == object;
	var result = true;
	stack.set(object, other);
	stack.set(other, object);
	var skipCtor = isPartial;
	while (++index < objLength) {
		key = objProps[index];
		var objValue = object[key], othValue = other[key];
		if (customizer) var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
		if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
			result = false;
			break;
		}
		skipCtor || (skipCtor = key == "constructor");
	}
	if (result && !skipCtor) {
		var objCtor = object.constructor, othCtor = other.constructor;
		if (objCtor != othCtor && "constructor" in object && "constructor" in other && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) result = false;
	}
	stack["delete"](object);
	stack["delete"](other);
	return result;
}
//#endregion
//#region node_modules/lodash-es/_baseIsEqualDeep.js
/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1;
/** `Object#toString` result references. */
var argsTag$1 = "[object Arguments]", arrayTag$1 = "[object Array]", objectTag$2 = "[object Object]";
/** Used to check objects for own properties. */
var hasOwnProperty$5 = Object.prototype.hasOwnProperty;
/**
* A specialized version of `baseIsEqual` for arrays and objects which performs
* deep comparisons and tracks traversed objects enabling objects with circular
* references to be compared.
*
* @private
* @param {Object} object The object to compare.
* @param {Object} other The other object to compare.
* @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
* @param {Function} customizer The function to customize comparisons.
* @param {Function} equalFunc The function to determine equivalents of values.
* @param {Object} [stack] Tracks traversed `object` and `other` objects.
* @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
*/
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
	var objIsArr = isArray(object), othIsArr = isArray(other), objTag = objIsArr ? arrayTag$1 : _getTag_default(object), othTag = othIsArr ? arrayTag$1 : _getTag_default(other);
	objTag = objTag == argsTag$1 ? objectTag$2 : objTag;
	othTag = othTag == argsTag$1 ? objectTag$2 : othTag;
	var objIsObj = objTag == objectTag$2, othIsObj = othTag == objectTag$2, isSameTag = objTag == othTag;
	if (isSameTag && isBuffer(object)) {
		if (!isBuffer(other)) return false;
		objIsArr = true;
		objIsObj = false;
	}
	if (isSameTag && !objIsObj) {
		stack || (stack = new Stack());
		return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
	}
	if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
		var objIsWrapped = objIsObj && hasOwnProperty$5.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty$5.call(other, "__wrapped__");
		if (objIsWrapped || othIsWrapped) {
			var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
			stack || (stack = new Stack());
			return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
		}
	}
	if (!isSameTag) return false;
	stack || (stack = new Stack());
	return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}
//#endregion
//#region node_modules/lodash-es/_baseIsEqual.js
/**
* The base implementation of `_.isEqual` which supports partial comparisons
* and tracks traversed objects.
*
* @private
* @param {*} value The value to compare.
* @param {*} other The other value to compare.
* @param {boolean} bitmask The bitmask flags.
*  1 - Unordered comparison
*  2 - Partial comparison
* @param {Function} [customizer] The function to customize comparisons.
* @param {Object} [stack] Tracks traversed `value` and `other` objects.
* @returns {boolean} Returns `true` if the values are equivalent, else `false`.
*/
function baseIsEqual(value, other, bitmask, customizer, stack) {
	if (value === other) return true;
	if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) return value !== value && other !== other;
	return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}
//#endregion
//#region node_modules/lodash-es/isEqual.js
/**
* Performs a deep comparison between two values to determine if they are
* equivalent.
*
* **Note:** This method supports comparing arrays, array buffers, booleans,
* date objects, error objects, maps, numbers, `Object` objects, regexes,
* sets, strings, symbols, and typed arrays. `Object` objects are compared
* by their own, not inherited, enumerable properties. Functions and DOM
* nodes are compared by strict equality, i.e. `===`.
*
* @static
* @memberOf _
* @since 0.1.0
* @category Lang
* @param {*} value The value to compare.
* @param {*} other The other value to compare.
* @returns {boolean} Returns `true` if the values are equivalent, else `false`.
* @example
*
* var object = { 'a': 1 };
* var other = { 'a': 1 };
*
* _.isEqual(object, other);
* // => true
*
* object === other;
* // => false
*/
function isEqual(value, other) {
	return baseIsEqual(value, other);
}
//#endregion
//#region node_modules/lodash-es/_arrayEach.js
/**
* A specialized version of `_.forEach` for arrays without support for
* iteratee shorthands.
*
* @private
* @param {Array} [array] The array to iterate over.
* @param {Function} iteratee The function invoked per iteration.
* @returns {Array} Returns `array`.
*/
function arrayEach(array, iteratee) {
	var index = -1, length = array == null ? 0 : array.length;
	while (++index < length) if (iteratee(array[index], index, array) === false) break;
	return array;
}
//#endregion
//#region node_modules/lodash-es/_defineProperty.js
var defineProperty = function() {
	try {
		var func = getNative(Object, "defineProperty");
		func({}, "", {});
		return func;
	} catch (e) {}
}();
//#endregion
//#region node_modules/lodash-es/_baseAssignValue.js
/**
* The base implementation of `assignValue` and `assignMergeValue` without
* value checks.
*
* @private
* @param {Object} object The object to modify.
* @param {string} key The key of the property to assign.
* @param {*} value The value to assign.
*/
function baseAssignValue(object, key, value) {
	if (key == "__proto__" && defineProperty) defineProperty(object, key, {
		"configurable": true,
		"enumerable": true,
		"value": value,
		"writable": true
	});
	else object[key] = value;
}
//#endregion
//#region node_modules/lodash-es/_assignValue.js
/** Used to check objects for own properties. */
var hasOwnProperty$4 = Object.prototype.hasOwnProperty;
/**
* Assigns `value` to `key` of `object` if the existing value is not equivalent
* using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
* for equality comparisons.
*
* @private
* @param {Object} object The object to modify.
* @param {string} key The key of the property to assign.
* @param {*} value The value to assign.
*/
function assignValue(object, key, value) {
	var objValue = object[key];
	if (!(hasOwnProperty$4.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) baseAssignValue(object, key, value);
}
//#endregion
//#region node_modules/lodash-es/_copyObject.js
/**
* Copies properties of `source` to `object`.
*
* @private
* @param {Object} source The object to copy properties from.
* @param {Array} props The property identifiers to copy.
* @param {Object} [object={}] The object to copy properties to.
* @param {Function} [customizer] The function to customize copied values.
* @returns {Object} Returns `object`.
*/
function copyObject(source, props, object, customizer) {
	var isNew = !object;
	object || (object = {});
	var index = -1, length = props.length;
	while (++index < length) {
		var key = props[index];
		var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
		if (newValue === void 0) newValue = source[key];
		if (isNew) baseAssignValue(object, key, newValue);
		else assignValue(object, key, newValue);
	}
	return object;
}
//#endregion
//#region node_modules/lodash-es/_baseAssign.js
/**
* The base implementation of `_.assign` without support for multiple sources
* or `customizer` functions.
*
* @private
* @param {Object} object The destination object.
* @param {Object} source The source object.
* @returns {Object} Returns `object`.
*/
function baseAssign(object, source) {
	return object && copyObject(source, keys(source), object);
}
//#endregion
//#region node_modules/lodash-es/_nativeKeysIn.js
/**
* This function is like
* [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
* except that it includes inherited enumerable properties.
*
* @private
* @param {Object} object The object to query.
* @returns {Array} Returns the array of property names.
*/
function nativeKeysIn(object) {
	var result = [];
	if (object != null) for (var key in Object(object)) result.push(key);
	return result;
}
//#endregion
//#region node_modules/lodash-es/_baseKeysIn.js
/** Used to check objects for own properties. */
var hasOwnProperty$3 = Object.prototype.hasOwnProperty;
/**
* The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
*
* @private
* @param {Object} object The object to query.
* @returns {Array} Returns the array of property names.
*/
function baseKeysIn(object) {
	if (!isObject$1(object)) return nativeKeysIn(object);
	var isProto = isPrototype(object), result = [];
	for (var key in object) if (!(key == "constructor" && (isProto || !hasOwnProperty$3.call(object, key)))) result.push(key);
	return result;
}
//#endregion
//#region node_modules/lodash-es/keysIn.js
/**
* Creates an array of the own and inherited enumerable property names of `object`.
*
* **Note:** Non-object values are coerced to objects.
*
* @static
* @memberOf _
* @since 3.0.0
* @category Object
* @param {Object} object The object to query.
* @returns {Array} Returns the array of property names.
* @example
*
* function Foo() {
*   this.a = 1;
*   this.b = 2;
* }
*
* Foo.prototype.c = 3;
*
* _.keysIn(new Foo);
* // => ['a', 'b', 'c'] (iteration order is not guaranteed)
*/
function keysIn(object) {
	return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}
//#endregion
//#region node_modules/lodash-es/_baseAssignIn.js
/**
* The base implementation of `_.assignIn` without support for multiple sources
* or `customizer` functions.
*
* @private
* @param {Object} object The destination object.
* @param {Object} source The source object.
* @returns {Object} Returns `object`.
*/
function baseAssignIn(object, source) {
	return object && copyObject(source, keysIn(source), object);
}
//#endregion
//#region node_modules/lodash-es/_cloneBuffer.js
/** Detect free variable `exports`. */
var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
/** Built-in value references. */
var Buffer = freeModule && freeModule.exports === freeExports ? root.Buffer : void 0, allocUnsafe = Buffer ? Buffer.allocUnsafe : void 0;
/**
* Creates a clone of  `buffer`.
*
* @private
* @param {Buffer} buffer The buffer to clone.
* @param {boolean} [isDeep] Specify a deep clone.
* @returns {Buffer} Returns the cloned buffer.
*/
function cloneBuffer(buffer, isDeep) {
	if (isDeep) return buffer.slice();
	var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
	buffer.copy(result);
	return result;
}
//#endregion
//#region node_modules/lodash-es/_copyArray.js
/**
* Copies the values of `source` to `array`.
*
* @private
* @param {Array} source The array to copy values from.
* @param {Array} [array=[]] The array to copy values to.
* @returns {Array} Returns `array`.
*/
function copyArray(source, array) {
	var index = -1, length = source.length;
	array || (array = Array(length));
	while (++index < length) array[index] = source[index];
	return array;
}
//#endregion
//#region node_modules/lodash-es/_copySymbols.js
/**
* Copies own symbols of `source` to `object`.
*
* @private
* @param {Object} source The object to copy symbols from.
* @param {Object} [object={}] The object to copy symbols to.
* @returns {Object} Returns `object`.
*/
function copySymbols(source, object) {
	return copyObject(source, getSymbols(source), object);
}
//#endregion
//#region node_modules/lodash-es/_getPrototype.js
/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);
//#endregion
//#region node_modules/lodash-es/_getSymbolsIn.js
/**
* Creates an array of the own and inherited enumerable symbols of `object`.
*
* @private
* @param {Object} object The object to query.
* @returns {Array} Returns the array of symbols.
*/
var getSymbolsIn = !Object.getOwnPropertySymbols ? stubArray : function(object) {
	var result = [];
	while (object) {
		arrayPush(result, getSymbols(object));
		object = getPrototype(object);
	}
	return result;
};
//#endregion
//#region node_modules/lodash-es/_copySymbolsIn.js
/**
* Copies own and inherited symbols of `source` to `object`.
*
* @private
* @param {Object} source The object to copy symbols from.
* @param {Object} [object={}] The object to copy symbols to.
* @returns {Object} Returns `object`.
*/
function copySymbolsIn(source, object) {
	return copyObject(source, getSymbolsIn(source), object);
}
//#endregion
//#region node_modules/lodash-es/_getAllKeysIn.js
/**
* Creates an array of own and inherited enumerable property names and
* symbols of `object`.
*
* @private
* @param {Object} object The object to query.
* @returns {Array} Returns the array of property names and symbols.
*/
function getAllKeysIn(object) {
	return baseGetAllKeys(object, keysIn, getSymbolsIn);
}
//#endregion
//#region node_modules/lodash-es/_initCloneArray.js
/** Used to check objects for own properties. */
var hasOwnProperty$2 = Object.prototype.hasOwnProperty;
/**
* Initializes an array clone.
*
* @private
* @param {Array} array The array to clone.
* @returns {Array} Returns the initialized clone.
*/
function initCloneArray(array) {
	var length = array.length, result = new array.constructor(length);
	if (length && typeof array[0] == "string" && hasOwnProperty$2.call(array, "index")) {
		result.index = array.index;
		result.input = array.input;
	}
	return result;
}
//#endregion
//#region node_modules/lodash-es/_cloneArrayBuffer.js
/**
* Creates a clone of `arrayBuffer`.
*
* @private
* @param {ArrayBuffer} arrayBuffer The array buffer to clone.
* @returns {ArrayBuffer} Returns the cloned array buffer.
*/
function cloneArrayBuffer(arrayBuffer) {
	var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
	new Uint8Array(result).set(new Uint8Array(arrayBuffer));
	return result;
}
//#endregion
//#region node_modules/lodash-es/_cloneDataView.js
/**
* Creates a clone of `dataView`.
*
* @private
* @param {Object} dataView The data view to clone.
* @param {boolean} [isDeep] Specify a deep clone.
* @returns {Object} Returns the cloned data view.
*/
function cloneDataView(dataView, isDeep) {
	var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
	return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}
//#endregion
//#region node_modules/lodash-es/_cloneRegExp.js
/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;
/**
* Creates a clone of `regexp`.
*
* @private
* @param {Object} regexp The regexp to clone.
* @returns {Object} Returns the cloned regexp.
*/
function cloneRegExp(regexp) {
	var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
	result.lastIndex = regexp.lastIndex;
	return result;
}
//#endregion
//#region node_modules/lodash-es/_cloneSymbol.js
/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol$1 ? Symbol$1.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
/**
* Creates a clone of the `symbol` object.
*
* @private
* @param {Object} symbol The symbol object to clone.
* @returns {Object} Returns the cloned symbol object.
*/
function cloneSymbol(symbol) {
	return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}
//#endregion
//#region node_modules/lodash-es/_cloneTypedArray.js
/**
* Creates a clone of `typedArray`.
*
* @private
* @param {Object} typedArray The typed array to clone.
* @param {boolean} [isDeep] Specify a deep clone.
* @returns {Object} Returns the cloned typed array.
*/
function cloneTypedArray(typedArray, isDeep) {
	var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
	return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}
//#endregion
//#region node_modules/lodash-es/_initCloneByTag.js
/** `Object#toString` result references. */
var boolTag$1 = "[object Boolean]", dateTag$1 = "[object Date]", mapTag$2 = "[object Map]", numberTag$1 = "[object Number]", regexpTag$1 = "[object RegExp]", setTag$2 = "[object Set]", stringTag$1 = "[object String]", symbolTag$1 = "[object Symbol]";
var arrayBufferTag$1 = "[object ArrayBuffer]", dataViewTag$1 = "[object DataView]", float32Tag$1 = "[object Float32Array]", float64Tag$1 = "[object Float64Array]", int8Tag$1 = "[object Int8Array]", int16Tag$1 = "[object Int16Array]", int32Tag$1 = "[object Int32Array]", uint8Tag$1 = "[object Uint8Array]", uint8ClampedTag$1 = "[object Uint8ClampedArray]", uint16Tag$1 = "[object Uint16Array]", uint32Tag$1 = "[object Uint32Array]";
/**
* Initializes an object clone based on its `toStringTag`.
*
* **Note:** This function only supports cloning values with tags of
* `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
*
* @private
* @param {Object} object The object to clone.
* @param {string} tag The `toStringTag` of the object to clone.
* @param {boolean} [isDeep] Specify a deep clone.
* @returns {Object} Returns the initialized clone.
*/
function initCloneByTag(object, tag, isDeep) {
	var Ctor = object.constructor;
	switch (tag) {
		case arrayBufferTag$1: return cloneArrayBuffer(object);
		case boolTag$1:
		case dateTag$1: return new Ctor(+object);
		case dataViewTag$1: return cloneDataView(object, isDeep);
		case float32Tag$1:
		case float64Tag$1:
		case int8Tag$1:
		case int16Tag$1:
		case int32Tag$1:
		case uint8Tag$1:
		case uint8ClampedTag$1:
		case uint16Tag$1:
		case uint32Tag$1: return cloneTypedArray(object, isDeep);
		case mapTag$2: return new Ctor();
		case numberTag$1:
		case stringTag$1: return new Ctor(object);
		case regexpTag$1: return cloneRegExp(object);
		case setTag$2: return new Ctor();
		case symbolTag$1: return cloneSymbol(object);
	}
}
//#endregion
//#region node_modules/lodash-es/_baseCreate.js
/** Built-in value references. */
var objectCreate = Object.create;
/**
* The base implementation of `_.create` without support for assigning
* properties to the created object.
*
* @private
* @param {Object} proto The object to inherit from.
* @returns {Object} Returns the new object.
*/
var baseCreate = function() {
	function object() {}
	return function(proto) {
		if (!isObject$1(proto)) return {};
		if (objectCreate) return objectCreate(proto);
		object.prototype = proto;
		var result = new object();
		object.prototype = void 0;
		return result;
	};
}();
//#endregion
//#region node_modules/lodash-es/_initCloneObject.js
/**
* Initializes an object clone.
*
* @private
* @param {Object} object The object to clone.
* @returns {Object} Returns the initialized clone.
*/
function initCloneObject(object) {
	return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
}
//#endregion
//#region node_modules/lodash-es/_baseIsMap.js
/** `Object#toString` result references. */
var mapTag$1 = "[object Map]";
/**
* The base implementation of `_.isMap` without Node.js optimizations.
*
* @private
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a map, else `false`.
*/
function baseIsMap(value) {
	return isObjectLike(value) && _getTag_default(value) == mapTag$1;
}
//#endregion
//#region node_modules/lodash-es/isMap.js
var nodeIsMap = nodeUtil && nodeUtil.isMap;
/**
* Checks if `value` is classified as a `Map` object.
*
* @static
* @memberOf _
* @since 4.3.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a map, else `false`.
* @example
*
* _.isMap(new Map);
* // => true
*
* _.isMap(new WeakMap);
* // => false
*/
var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
//#endregion
//#region node_modules/lodash-es/_baseIsSet.js
/** `Object#toString` result references. */
var setTag$1 = "[object Set]";
/**
* The base implementation of `_.isSet` without Node.js optimizations.
*
* @private
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a set, else `false`.
*/
function baseIsSet(value) {
	return isObjectLike(value) && _getTag_default(value) == setTag$1;
}
//#endregion
//#region node_modules/lodash-es/isSet.js
var nodeIsSet = nodeUtil && nodeUtil.isSet;
/**
* Checks if `value` is classified as a `Set` object.
*
* @static
* @memberOf _
* @since 4.3.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a set, else `false`.
* @example
*
* _.isSet(new Set);
* // => true
*
* _.isSet(new WeakSet);
* // => false
*/
var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
//#endregion
//#region node_modules/lodash-es/_baseClone.js
/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG$1 = 1, CLONE_FLAT_FLAG$1 = 2, CLONE_SYMBOLS_FLAG$1 = 4;
/** `Object#toString` result references. */
var argsTag = "[object Arguments]", arrayTag = "[object Array]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", objectTag$1 = "[object Object]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]", weakMapTag = "[object WeakMap]";
var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag$1] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
/**
* The base implementation of `_.clone` and `_.cloneDeep` which tracks
* traversed objects.
*
* @private
* @param {*} value The value to clone.
* @param {boolean} bitmask The bitmask flags.
*  1 - Deep clone
*  2 - Flatten inherited properties
*  4 - Clone symbols
* @param {Function} [customizer] The function to customize cloning.
* @param {string} [key] The key of `value`.
* @param {Object} [object] The parent object of `value`.
* @param {Object} [stack] Tracks traversed objects and their clone counterparts.
* @returns {*} Returns the cloned value.
*/
function baseClone(value, bitmask, customizer, key, object, stack) {
	var result, isDeep = bitmask & CLONE_DEEP_FLAG$1, isFlat = bitmask & CLONE_FLAT_FLAG$1, isFull = bitmask & CLONE_SYMBOLS_FLAG$1;
	if (customizer) result = object ? customizer(value, key, object, stack) : customizer(value);
	if (result !== void 0) return result;
	if (!isObject$1(value)) return value;
	var isArr = isArray(value);
	if (isArr) {
		result = initCloneArray(value);
		if (!isDeep) return copyArray(value, result);
	} else {
		var tag = _getTag_default(value), isFunc = tag == funcTag || tag == genTag;
		if (isBuffer(value)) return cloneBuffer(value, isDeep);
		if (tag == objectTag$1 || tag == argsTag || isFunc && !object) {
			result = isFlat || isFunc ? {} : initCloneObject(value);
			if (!isDeep) return isFlat ? copySymbolsIn(value, baseAssignIn(result, value)) : copySymbols(value, baseAssign(result, value));
		} else {
			if (!cloneableTags[tag]) return object ? value : {};
			result = initCloneByTag(value, tag, isDeep);
		}
	}
	stack || (stack = new Stack());
	var stacked = stack.get(value);
	if (stacked) return stacked;
	stack.set(value, result);
	if (isSet(value)) value.forEach(function(subValue) {
		result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
	});
	else if (isMap(value)) value.forEach(function(subValue, key) {
		result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
	});
	var props = isArr ? void 0 : (isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys)(value);
	arrayEach(props || value, function(subValue, key) {
		if (props) {
			key = subValue;
			subValue = value[key];
		}
		assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
	});
	return result;
}
//#endregion
//#region node_modules/lodash-es/_isKey.js
/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/;
/**
* Checks if `value` is a property name and not a property path.
*
* @private
* @param {*} value The value to check.
* @param {Object} [object] The object to query keys on.
* @returns {boolean} Returns `true` if `value` is a property name, else `false`.
*/
function isKey(value, object) {
	if (isArray(value)) return false;
	var type = typeof value;
	if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) return true;
	return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
}
//#endregion
//#region node_modules/lodash-es/memoize.js
/** Error message constants. */
var FUNC_ERROR_TEXT = "Expected a function";
/**
* Creates a function that memoizes the result of `func`. If `resolver` is
* provided, it determines the cache key for storing the result based on the
* arguments provided to the memoized function. By default, the first argument
* provided to the memoized function is used as the map cache key. The `func`
* is invoked with the `this` binding of the memoized function.
*
* **Note:** The cache is exposed as the `cache` property on the memoized
* function. Its creation may be customized by replacing the `_.memoize.Cache`
* constructor with one whose instances implement the
* [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
* method interface of `clear`, `delete`, `get`, `has`, and `set`.
*
* @static
* @memberOf _
* @since 0.1.0
* @category Function
* @param {Function} func The function to have its output memoized.
* @param {Function} [resolver] The function to resolve the cache key.
* @returns {Function} Returns the new memoized function.
* @example
*
* var object = { 'a': 1, 'b': 2 };
* var other = { 'c': 3, 'd': 4 };
*
* var values = _.memoize(_.values);
* values(object);
* // => [1, 2]
*
* values(other);
* // => [3, 4]
*
* object.a = 2;
* values(object);
* // => [1, 2]
*
* // Modify the result cache.
* values.cache.set(object, ['a', 'b']);
* values(object);
* // => ['a', 'b']
*
* // Replace `_.memoize.Cache`.
* _.memoize.Cache = WeakMap;
*/
function memoize(func, resolver) {
	if (typeof func != "function" || resolver != null && typeof resolver != "function") throw new TypeError(FUNC_ERROR_TEXT);
	var memoized = function() {
		var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
		if (cache.has(key)) return cache.get(key);
		var result = func.apply(this, args);
		memoized.cache = cache.set(key, result) || cache;
		return result;
	};
	memoized.cache = new (memoize.Cache || MapCache)();
	return memoized;
}
memoize.Cache = MapCache;
//#endregion
//#region node_modules/lodash-es/_memoizeCapped.js
/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;
/**
* A specialized version of `_.memoize` which clears the memoized function's
* cache when it exceeds `MAX_MEMOIZE_SIZE`.
*
* @private
* @param {Function} func The function to have its output memoized.
* @returns {Function} Returns the new memoized function.
*/
function memoizeCapped(func) {
	var result = memoize(func, function(key) {
		if (cache.size === MAX_MEMOIZE_SIZE) cache.clear();
		return key;
	});
	var cache = result.cache;
	return result;
}
//#endregion
//#region node_modules/lodash-es/_stringToPath.js
/** Used to match property names within property paths. */
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;
/**
* Converts `string` to a property path array.
*
* @private
* @param {string} string The string to convert.
* @returns {Array} Returns the property path array.
*/
var stringToPath = memoizeCapped(function(string) {
	var result = [];
	if (string.charCodeAt(0) === 46) result.push("");
	string.replace(rePropName, function(match, number, quote, subString) {
		result.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
	});
	return result;
});
//#endregion
//#region node_modules/lodash-es/_castPath.js
/**
* Casts `value` to a path array if it's not one.
*
* @private
* @param {*} value The value to inspect.
* @param {Object} [object] The object to query keys on.
* @returns {Array} Returns the cast property path array.
*/
function castPath(value, object) {
	if (isArray(value)) return value;
	return isKey(value, object) ? [value] : stringToPath(toString(value));
}
//#endregion
//#region node_modules/lodash-es/last.js
/**
* Gets the last element of `array`.
*
* @static
* @memberOf _
* @since 0.1.0
* @category Array
* @param {Array} array The array to query.
* @returns {*} Returns the last element of `array`.
* @example
*
* _.last([1, 2, 3]);
* // => 3
*/
function last(array) {
	var length = array == null ? 0 : array.length;
	return length ? array[length - 1] : void 0;
}
//#endregion
//#region node_modules/lodash-es/_toKey.js
/** Used as references for various `Number` constants. */
var INFINITY = Infinity;
/**
* Converts `value` to a string key if it's not a string or symbol.
*
* @private
* @param {*} value The value to inspect.
* @returns {string|symbol} Returns the key.
*/
function toKey(value) {
	if (typeof value == "string" || isSymbol(value)) return value;
	var result = value + "";
	return result == "0" && 1 / value == -INFINITY ? "-0" : result;
}
//#endregion
//#region node_modules/lodash-es/_baseGet.js
/**
* The base implementation of `_.get` without support for default values.
*
* @private
* @param {Object} object The object to query.
* @param {Array|string} path The path of the property to get.
* @returns {*} Returns the resolved value.
*/
function baseGet(object, path) {
	path = castPath(path, object);
	var index = 0, length = path.length;
	while (object != null && index < length) object = object[toKey(path[index++])];
	return index && index == length ? object : void 0;
}
//#endregion
//#region node_modules/lodash-es/_parent.js
/**
* Gets the parent value at `path` of `object`.
*
* @private
* @param {Object} object The object to query.
* @param {Array} path The path to get the parent value of.
* @returns {*} Returns the parent value.
*/
function parent(object, path) {
	return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
}
//#endregion
//#region node_modules/lodash-es/_baseUnset.js
/** Used to check objects for own properties. */
var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
/**
* The base implementation of `_.unset`.
*
* @private
* @param {Object} object The object to modify.
* @param {Array|string} path The property path to unset.
* @returns {boolean} Returns `true` if the property is deleted, else `false`.
*/
function baseUnset(object, path) {
	path = castPath(path, object);
	var index = -1, length = path.length;
	if (!length) return true;
	while (++index < length) {
		var key = toKey(path[index]);
		if (key === "__proto__" && !hasOwnProperty$1.call(object, "__proto__")) return false;
		if ((key === "constructor" || key === "prototype") && index < length - 1) return false;
	}
	var obj = parent(object, path);
	return obj == null || delete obj[toKey(last(path))];
}
//#endregion
//#region node_modules/lodash-es/isPlainObject.js
/** `Object#toString` result references. */
var objectTag = "[object Object]";
/** Used for built-in method references. */
var funcProto = Function.prototype, objectProto = Object.prototype;
/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;
/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;
/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);
/**
* Checks if `value` is a plain object, that is, an object created by the
* `Object` constructor or one with a `[[Prototype]]` of `null`.
*
* @static
* @memberOf _
* @since 0.8.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
* @example
*
* function Foo() {
*   this.a = 1;
* }
*
* _.isPlainObject(new Foo);
* // => false
*
* _.isPlainObject([1, 2, 3]);
* // => false
*
* _.isPlainObject({ 'x': 0, 'y': 0 });
* // => true
*
* _.isPlainObject(Object.create(null));
* // => true
*/
function isPlainObject(value) {
	if (!isObjectLike(value) || baseGetTag(value) != objectTag) return false;
	var proto = getPrototype(value);
	if (proto === null) return true;
	var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
	return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
}
//#endregion
//#region node_modules/lodash-es/_customOmitClone.js
/**
* Used by `_.omit` to customize its `_.cloneDeep` use to only clone plain
* objects.
*
* @private
* @param {*} value The value to inspect.
* @param {string} key The key of the property to inspect.
* @returns {*} Returns the uncloned value or `undefined` to defer cloning to `_.cloneDeep`.
*/
function customOmitClone(value) {
	return isPlainObject(value) ? void 0 : value;
}
//#endregion
//#region node_modules/lodash-es/_isFlattenable.js
/** Built-in value references. */
var spreadableSymbol = Symbol$1 ? Symbol$1.isConcatSpreadable : void 0;
/**
* Checks if `value` is a flattenable `arguments` object or array.
*
* @private
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
*/
function isFlattenable(value) {
	return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
}
//#endregion
//#region node_modules/lodash-es/_baseFlatten.js
/**
* The base implementation of `_.flatten` with support for restricting flattening.
*
* @private
* @param {Array} array The array to flatten.
* @param {number} depth The maximum recursion depth.
* @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
* @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
* @param {Array} [result=[]] The initial result value.
* @returns {Array} Returns the new flattened array.
*/
function baseFlatten(array, depth, predicate, isStrict, result) {
	var index = -1, length = array.length;
	predicate || (predicate = isFlattenable);
	result || (result = []);
	while (++index < length) {
		var value = array[index];
		if (depth > 0 && predicate(value)) if (depth > 1) baseFlatten(value, depth - 1, predicate, isStrict, result);
		else arrayPush(result, value);
		else if (!isStrict) result[result.length] = value;
	}
	return result;
}
//#endregion
//#region node_modules/lodash-es/flatten.js
/**
* Flattens `array` a single level deep.
*
* @static
* @memberOf _
* @since 0.1.0
* @category Array
* @param {Array} array The array to flatten.
* @returns {Array} Returns the new flattened array.
* @example
*
* _.flatten([1, [2, [3, [4]], 5]]);
* // => [1, 2, [3, [4]], 5]
*/
function flatten(array) {
	return (array == null ? 0 : array.length) ? baseFlatten(array, 1) : [];
}
//#endregion
//#region node_modules/lodash-es/_apply.js
/**
* A faster alternative to `Function#apply`, this function invokes `func`
* with the `this` binding of `thisArg` and the arguments of `args`.
*
* @private
* @param {Function} func The function to invoke.
* @param {*} thisArg The `this` binding of `func`.
* @param {Array} args The arguments to invoke `func` with.
* @returns {*} Returns the result of `func`.
*/
function apply(func, thisArg, args) {
	switch (args.length) {
		case 0: return func.call(thisArg);
		case 1: return func.call(thisArg, args[0]);
		case 2: return func.call(thisArg, args[0], args[1]);
		case 3: return func.call(thisArg, args[0], args[1], args[2]);
	}
	return func.apply(thisArg, args);
}
//#endregion
//#region node_modules/lodash-es/_overRest.js
var nativeMax = Math.max;
/**
* A specialized version of `baseRest` which transforms the rest array.
*
* @private
* @param {Function} func The function to apply a rest parameter to.
* @param {number} [start=func.length-1] The start position of the rest parameter.
* @param {Function} transform The rest array transform.
* @returns {Function} Returns the new function.
*/
function overRest(func, start, transform) {
	start = nativeMax(start === void 0 ? func.length - 1 : start, 0);
	return function() {
		var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array(length);
		while (++index < length) array[index] = args[start + index];
		index = -1;
		var otherArgs = Array(start + 1);
		while (++index < start) otherArgs[index] = args[index];
		otherArgs[start] = transform(array);
		return apply(func, this, otherArgs);
	};
}
//#endregion
//#region node_modules/lodash-es/constant.js
/**
* Creates a function that returns `value`.
*
* @static
* @memberOf _
* @since 2.4.0
* @category Util
* @param {*} value The value to return from the new function.
* @returns {Function} Returns the new constant function.
* @example
*
* var objects = _.times(2, _.constant({ 'a': 1 }));
*
* console.log(objects);
* // => [{ 'a': 1 }, { 'a': 1 }]
*
* console.log(objects[0] === objects[1]);
* // => true
*/
function constant(value) {
	return function() {
		return value;
	};
}
//#endregion
//#region node_modules/lodash-es/identity.js
/**
* This method returns the first argument it receives.
*
* @static
* @since 0.1.0
* @memberOf _
* @category Util
* @param {*} value Any value.
* @returns {*} Returns `value`.
* @example
*
* var object = { 'a': 1 };
*
* console.log(_.identity(object) === object);
* // => true
*/
function identity(value) {
	return value;
}
//#endregion
//#region node_modules/lodash-es/_baseSetToString.js
/**
* The base implementation of `setToString` without support for hot loop shorting.
*
* @private
* @param {Function} func The function to modify.
* @param {Function} string The `toString` result.
* @returns {Function} Returns `func`.
*/
var baseSetToString = !defineProperty ? identity : function(func, string) {
	return defineProperty(func, "toString", {
		"configurable": true,
		"enumerable": false,
		"value": constant(string),
		"writable": true
	});
};
//#endregion
//#region node_modules/lodash-es/_shortOut.js
/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800, HOT_SPAN = 16;
var nativeNow = Date.now;
/**
* Creates a function that'll short out and invoke `identity` instead
* of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
* milliseconds.
*
* @private
* @param {Function} func The function to restrict.
* @returns {Function} Returns the new shortable function.
*/
function shortOut(func) {
	var count = 0, lastCalled = 0;
	return function() {
		var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
		lastCalled = stamp;
		if (remaining > 0) {
			if (++count >= HOT_COUNT) return arguments[0];
		} else count = 0;
		return func.apply(void 0, arguments);
	};
}
//#endregion
//#region node_modules/lodash-es/_setToString.js
/**
* Sets the `toString` method of `func` to return `string`.
*
* @private
* @param {Function} func The function to modify.
* @param {Function} string The `toString` result.
* @returns {Function} Returns `func`.
*/
var setToString = shortOut(baseSetToString);
//#endregion
//#region node_modules/lodash-es/_flatRest.js
/**
* A specialized version of `baseRest` which flattens the rest array.
*
* @private
* @param {Function} func The function to apply a rest parameter to.
* @returns {Function} Returns the new function.
*/
function flatRest(func) {
	return setToString(overRest(func, void 0, flatten), func + "");
}
//#endregion
//#region node_modules/lodash-es/omit.js
/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG = 4;
/**
* The opposite of `_.pick`; this method creates an object composed of the
* own and inherited enumerable property paths of `object` that are not omitted.
*
* **Note:** This method is considerably slower than `_.pick`.
*
* @static
* @since 0.1.0
* @memberOf _
* @category Object
* @param {Object} object The source object.
* @param {...(string|string[])} [paths] The property paths to omit.
* @returns {Object} Returns the new object.
* @example
*
* var object = { 'a': 1, 'b': '2', 'c': 3 };
*
* _.omit(object, ['a', 'c']);
* // => { 'b': '2' }
*/
var omit = flatRest(function(object, paths) {
	var result = {};
	if (object == null) return result;
	var isDeep = false;
	paths = arrayMap(paths, function(path) {
		path = castPath(path, object);
		isDeep || (isDeep = path.length > 1);
		return path;
	});
	copyObject(object, getAllKeysIn(object), result);
	if (isDeep) result = baseClone(result, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
	var length = paths.length;
	while (length--) baseUnset(result, paths[length]);
	return result;
});
//#endregion
//#region extension/src/renderer/state/hmonitorSlice.ts
var { useSelector: useSelector$2 } = await importShared("react-redux");
var hmonitorSlice = createSlice({
	initialState: { ...initialSettings },
	name: "hmonitor",
	reducers: {
		updateState: (state, action) => {
			state[action.payload.key] = action.payload.value;
		},
		setConfig: (state, action) => {
			return {
				...state,
				...action.payload
			};
		},
		setPingState: (state, action) => {
			state.pingState = action.payload;
		},
		saveSettings: (state) => {
			window.electron.ipcRenderer.send(HMONITOR_IPC_SET_CONFIG, JSON.stringify(omit(state, "modals")));
		},
		updateHardwareMetrics: (state, action) => {
			const { type, name, enabled } = action.payload;
			const hardwareList = state.enabledMetrics[type];
			const index = hardwareList.findIndex((item) => item.name === name);
			if (index !== -1) hardwareList[index].enabled = enabled;
		},
		updateHardwareActive: (state, action) => {
			const { type, name, active } = action.payload;
			const hardwareList = state.enabledMetrics[type];
			const index = hardwareList.findIndex((item) => item.name === name);
			if (index !== -1) hardwareList[index].active = active;
		},
		updateMetricVisibility: (state, action) => {
			state.metricVisibility = action.payload;
		},
		updateUptime: (state, action) => {
			state.enabledMetrics.uptime = {
				...state.enabledMetrics.uptime,
				...action.payload
			};
		},
		addCustomMetric: (state, action) => {
			const { type, name, metric } = action.payload;
			const hardware = state.enabledMetrics[type].find((item) => item.name === name);
			if (hardware) {
				hardware.custom.push(metric);
				if (!hardware.enabled.includes(metric.id)) hardware.enabled.push(metric.id);
			}
		},
		removeCustomMetric: (state, action) => {
			const { type, name, metricId } = action.payload;
			const hardware = state.enabledMetrics[type].find((item) => item.name === name);
			if (hardware) {
				hardware.custom = hardware.custom.filter((m) => m.id !== metricId);
				hardware.enabled = hardware.enabled.filter((m) => m !== metricId);
			}
		},
		updateSectionOrder: (state, action) => {
			state.sectionOrder = action.payload;
		},
		updateUptimeOrder: (state, action) => {
			state.uptimeOrder = action.payload;
		}
	}
});
var useHMonitorSelector = useSelector$2;
var useHMonitorState = (propertyName) => useSelector$2((state) => state.hmonitor[propertyName]);
var hmonitorActions = hmonitorSlice.actions;
var hmonitorSlice_default = hmonitorSlice.reducer;
//#endregion
//#region extension/src/renderer/utils/aliasUtils.ts
/**
* Utility functions to get user-friendly aliases for various hardware devices.
*/
var getCpuAlias = (_name) => {
	return "CPU";
};
var getGpuAlias = (_name) => {
	return "GPU";
};
var getMemoryAlias = (_name) => {
	return "RAM";
};
var getNetworkAlias = (name) => {
	const lowerName = name.toLowerCase();
	if (lowerName.includes("wi-fi") || lowerName.includes("wifi") || lowerName.includes("wireless") || lowerName.includes("wlan") || lowerName.includes("802.11")) return "Wi-Fi";
	if (lowerName.includes("ethernet") || lowerName.includes("lan") || lowerName.includes("gigabit") || lowerName.includes("realtek pcie")) return "Ethernet";
	return "Ethernet/Wi-Fi";
};
//#endregion
//#region extension/src/renderer/utils/colorUtils.ts
/**
* Hardware temperature thresholds (Celsius).
* Safely handles idle (green), moderate (amber), heavy load (orange), and critical limits (red).
*/
var TEMP_THRESHOLDS = [
	{
		max: 60,
		classes: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
		gradient: "from-emerald-400 to-emerald-500"
	},
	{
		max: 70,
		classes: "text-amber-400 border-amber-400/30 bg-amber-400/10",
		gradient: "from-amber-400 to-amber-500"
	},
	{
		max: 85,
		classes: "text-orange-400 border-orange-400/30 bg-orange-400/10",
		gradient: "from-orange-400 to-orange-500"
	},
	{
		max: Infinity,
		classes: "text-red-400 border-red-400/30 bg-red-400/10",
		gradient: "from-red-400 to-red-500"
	}
];
/**
* Hardware usage thresholds (0-100%).
* Handles low (green), moderate (blue), heavy (amber), and near-capacity (red) utilization.
*/
var USAGE_THRESHOLDS = [
	{
		max: 30,
		classes: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
		gradient: "from-emerald-400 to-emerald-500"
	},
	{
		max: 60,
		classes: "text-blue-400 border-blue-400/30 bg-blue-400/10",
		gradient: "from-blue-400 to-blue-500"
	},
	{
		max: 85,
		classes: "text-amber-400 border-amber-400/30 bg-amber-400/10",
		gradient: "from-amber-400 to-amber-500"
	},
	{
		max: Infinity,
		classes: "text-red-400 border-red-400/30 bg-red-400/10",
		gradient: "from-red-400 to-red-500"
	}
];
/**
* Returns a Tailwind CSS color class based on a PC hardware temperature value.
* @param temp - The hardware temperature in Celsius.
* @returns A string of Tailwind classes for text, border, and background color.
*/
var getTemperatureColor = (temp) => {
	return TEMP_THRESHOLDS.find((t) => temp < t.max).classes;
};
/**
* Returns a Tailwind CSS color class based on a usage percentage.
* @param usage - The usage percentage (0-100).
* @returns A string of Tailwind classes for text, border, and background color.
*/
var getUsageColor = (usage) => {
	return USAGE_THRESHOLDS.find((u) => usage < u.max).classes;
};
/**
* Returns Tailwind CSS gradient classes for the progress bar based on value.
* @param value - The current value (temperature or percentage).
* @param isTemp - A flag to indicate if the value is a temperature.
* @returns A string of Tailwind classes for a background gradient.
*/
var getProgressColor = (value, isTemp = false) => {
	return (isTemp ? TEMP_THRESHOLDS : USAGE_THRESHOLDS).find((d) => value < d.max).gradient;
};
//#endregion
//#region extension/src/renderer/components/common/MetricItem.tsx
var { memo: memo$10, useMemo: useMemo$15 } = await importShared("react");
var ProgressBar = memo$10(({ value, max = 100, isTemp = false }) => {
	const displayStyle = useHMonitorState("displayStyle");
	const isTwoColumn = displayStyle === "two-column";
	const isCompact = ["compact", "two-column"].includes(displayStyle);
	const percentage = Math.min(value / max * 100, 100);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `${isTwoColumn ? "w-7" : isCompact ? "w-8" : "w-12"} ${isCompact ? "h-1" : "h-1.5"} bg-white/10 rounded-full overflow-hidden shrink-0`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `h-full bg-linear-to-r ${getProgressColor(isTemp ? value : percentage, isTemp)} rounded-full transition-all duration-700 ease-out`,
			style: { width: `${percentage}%` }
		})
	});
});
ProgressBar.displayName = "ProgressBar";
var MetricItem = memo$10(({ icon: Icon, label, value, unit = "", progress, colorClass, children }) => {
	const displayStyle = useHMonitorState("displayStyle");
	const metricVisibility = useHMonitorState("metricVisibility");
	const isRaw = ["raw", "raw-two-column"].includes(displayStyle);
	const isTwoColumn = displayStyle === "two-column";
	const isCompact = ["compact", "two-column"].includes(displayStyle);
	const renderProgress = useMemo$15(() => {
		if (!progress || !metricVisibility.progressBar) return null;
		const max = progress.max || 100;
		const progressValue = Math.min(progress.value, max);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressBar, {
			...progress,
			value: progressValue
		});
	}, [progress, metricVisibility]);
	if (isRaw) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex items-baseline gap-1 whitespace-nowrap",
		children: [metricVisibility.label && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "text-foreground/60",
			children: [label, ":"]
		}), metricVisibility.value && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "font-semibold text-foreground",
			children: [value, unit]
		})]
	});
	if (children) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `flex items-center ${isCompact ? "px-2 py-0.5 gap-x-1.5" : "px-3 py-2 gap-x-2"} ${isTwoColumn ? "h-5 min-w-0" : ""} rounded-lg border backdrop-blur-sm transition-colors duration-200 text-foreground bg-surface border-surface-secondary`,
		children
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `flex items-center ${isCompact ? "px-2 py-0.5 gap-x-1.5" : "px-3 py-2 gap-x-2"} ${isTwoColumn ? "h-5 min-w-0" : ""} rounded-lg border backdrop-blur-sm transition-colors duration-200 ${colorClass || "text-semi-muted bg-surface border-surface-secondary"}`,
		children: [metricVisibility.icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `${isCompact ? "size-3" : "size-4"} shrink-0` }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `flex items-center ${isTwoColumn ? "gap-1.5 min-w-0" : "gap-2"} text-xs font-medium`,
			children: [
				metricVisibility.label && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "opacity-80 shrink-0",
					children: [label, ":"]
				}),
				metricVisibility.value && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "shrink-0",
					children: [value, unit]
				}),
				renderProgress
			]
		})]
	});
});
//#endregion
//#region extension/src/renderer/components/common/Section.tsx
var { Spinner: Spinner$1 } = await importShared("@heroui/react");
var { Children: Children$1, Fragment: Fragment$4, memo: memo$9 } = await importShared("react");
var Section = memo$9(({ title, icon: Icon, children }) => {
	const displayStyle = useHMonitorState("displayStyle");
	const showSectionLabel = useHMonitorState("showSectionLabel");
	const isRaw = ["raw", "raw-two-column"].includes(displayStyle);
	const isTwoColumn = ["two-column", "raw-two-column"].includes(displayStyle);
	const isCompact = ["compact", "two-column"].includes(displayStyle);
	if (isRaw) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `flex items-center shrink-0 ${isTwoColumn ? "gap-x-2" : "gap-x-1.5"} text-xs font-mono whitespace-nowrap text-foreground leading-none`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "font-semibold text-foreground/80",
			children: [title, ":"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `${isTwoColumn ? "grid grid-flow-col grid-rows-2 auto-cols-max gap-x-4 gap-y-1 h-10" : "flex items-center gap-x-2 h-7"} shrink-0 ${isTwoColumn && `content-center items-start ${Children$1.count(children) > 1 ? "justify-start" : "justify-center"}`}`,
			children: Children$1.map(children, (child, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Fragment$4, { children: [child, !isTwoColumn && i < Children$1.count(children) - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-foreground/30",
				children: "/"
			})] }, i))
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `flex items-center shrink-0 ${isTwoColumn ? "gap-x-1.5" : isCompact ? "gap-x-2" : "gap-x-3"}`,
		children: [showSectionLabel && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `flex items-center ${isTwoColumn ? "h-10 gap-x-1.5 px-2" : isCompact ? "gap-x-1.5 px-1.5 py-0.5" : "gap-x-2 px-2 py-1"} rounded-md bg-surface border border-surface-secondary`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `${isCompact ? "size-3" : "size-3.5"} text-foreground/70` }), isEmpty(title) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner$1, {
				size: "sm",
				color: "current",
				className: "text-muted"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `text-xs font-semibold text-foreground uppercase tracking-wide text-nowrap${isTwoColumn ? " max-w-38 truncate" : ""}`,
				children: title
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: isTwoColumn ? `grid grid-flow-col grid-rows-2 auto-cols-max gap-x-1 gap-y-0.5 h-10 content-center items-center` : " flex items-center gap-x-2",
			children
		})]
	});
});
//#endregion
//#region extension/src/renderer/components/status-bar/sections/CpuSection.tsx
var { memo: memo$8, useMemo: useMemo$14 } = await importShared("react");
var getIconForSensorType$3 = (type) => {
	switch (type) {
		case "Temperature": return Thermometer;
		case "Load": return Activity;
		case "Power": return Power;
		case "Clock": return Gauge;
		default: return Activity;
	}
};
var CpuSection = memo$8(({ data, metrics, hardwareInfo, rawSensorValues }) => {
	const displayStyle = useHMonitorState("displayStyle");
	const showAliasCpu = useHMonitorState("showAliasCpu");
	const { temp, usage, name } = data || {
		temp: 0,
		usage: 0,
		name: ""
	};
	const sensorReadingMap = useMemo$14(() => {
		const map = /* @__PURE__ */ new Map();
		rawSensorValues.forEach((val) => map.set(val.Identifier, val));
		return map;
	}, [rawSensorValues]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
		title: showAliasCpu ? getCpuAlias(name) : name,
		icon: Cpu,
		children: useMemo$14(() => {
			const list = [];
			const processedIds = /* @__PURE__ */ new Set();
			metrics.enabled.forEach((metricId) => {
				processedIds.add(metricId);
				if (metricId === "temp") list.push(temp > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricItem, {
					unit: "°C",
					label: "Temp",
					value: temp,
					icon: Thermometer,
					colorClass: getTemperatureColor(temp),
					progress: {
						value: temp,
						max: 100,
						isTemp: true
					}
				}, "temp") : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MetricItem, {
					label: "Temp",
					icon: Thermometer,
					value: "Admin Required",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thermometer, { className: `${["compact", "two-column"].includes(displayStyle) ? "size-3" : "size-4"} shrink-0 text-danger` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-medium text-danger whitespace-nowrap",
						children: "Admin Required"
					})]
				}, "temp"));
				else if (metricId === "usage") list.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricItem, {
					unit: "%",
					label: "Usage",
					value: usage,
					icon: Activity,
					progress: { value: usage },
					colorClass: getUsageColor(usage)
				}, "usage"));
				else {
					const customMetric = metrics.custom?.find((m) => m.id === metricId);
					if (customMetric) {
						const sensorInfo = hardwareInfo?.sensors.find((s) => s.Identifier === customMetric.sensorIdentifier);
						const sensorReading = sensorReadingMap.get(customMetric.sensorIdentifier);
						if (sensorInfo && sensorReading?.Value !== null && sensorReading?.Value !== void 0) {
							const value = Number.isInteger(sensorReading.Value) ? sensorReading.Value : parseFloat(sensorReading.Value.toFixed(1));
							list.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricItem, {
								value,
								unit: sensorInfo.Unit,
								label: customMetric.label,
								icon: getIconForSensorType$3(sensorInfo.Type)
							}, customMetric.id));
						}
					}
				}
			});
			metrics.custom?.forEach((customMetric) => {
				if (processedIds.has(customMetric.id)) return;
				const sensorInfo = hardwareInfo?.sensors.find((s) => s.Identifier === customMetric.sensorIdentifier);
				const sensorReading = sensorReadingMap.get(customMetric.sensorIdentifier);
				if (sensorInfo && sensorReading?.Value !== null && sensorReading?.Value !== void 0) {
					const value = Number.isInteger(sensorReading.Value) ? sensorReading.Value : parseFloat(sensorReading.Value.toFixed(1));
					list.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricItem, {
						value,
						unit: sensorInfo.Unit,
						label: customMetric.label,
						icon: getIconForSensorType$3(sensorInfo.Type)
					}, customMetric.id));
				}
			});
			return list;
		}, [
			metrics.enabled,
			metrics.custom,
			temp,
			usage,
			displayStyle,
			hardwareInfo,
			sensorReadingMap
		])
	});
});
//#endregion
//#region extension/src/renderer/components/status-bar/sections/GpuSection.tsx
var { memo: memo$7, useMemo: useMemo$13 } = await importShared("react");
var getIconForSensorType$2 = (type) => {
	switch (type) {
		case "Temperature": return Thermometer;
		case "Load": return Activity;
		case "Power": return Power;
		case "Clock": return Gauge;
		case "Data":
		case "SmallData": return Database;
		default: return Activity;
	}
};
var GpuSection = memo$7(({ data, metrics, hardwareInfo, rawSensorValues }) => {
	const showAliasGpu = useHMonitorState("showAliasGpu");
	const { temp, usage, name, totalVram, usedVram } = data || {
		temp: 0,
		usage: 0,
		name: "",
		totalVram: 0,
		usedVram: 0
	};
	const vramPercentage = useMemo$13(() => totalVram > 0 ? usedVram / totalVram * 100 : 0, [totalVram, usedVram]);
	const sensorReadingMap = useMemo$13(() => {
		const map = /* @__PURE__ */ new Map();
		rawSensorValues.forEach((val) => map.set(val.Identifier, val));
		return map;
	}, [rawSensorValues]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
		title: showAliasGpu ? getGpuAlias(name) : name,
		icon: Monitor,
		children: useMemo$13(() => {
			const list = [];
			const processedIds = /* @__PURE__ */ new Set();
			metrics.enabled.forEach((metricId) => {
				processedIds.add(metricId);
				if (metricId === "temp") list.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricItem, {
					unit: "°C",
					label: "Temp",
					value: temp,
					icon: Thermometer,
					colorClass: getTemperatureColor(temp),
					progress: {
						value: temp,
						max: 100,
						isTemp: true
					}
				}, "temp"));
				else if (metricId === "vram") list.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricItem, {
					label: "VRAM",
					icon: Database,
					progress: { value: vramPercentage },
					colorClass: getUsageColor(vramPercentage),
					value: `${usedVram.toFixed(1)}/${Math.round(totalVram)}GB`
				}, "vram"));
				else if (metricId === "usage") list.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricItem, {
					unit: "%",
					icon: Zap,
					label: "Usage",
					value: Math.min(usage, 100),
					colorClass: getUsageColor(usage),
					progress: { value: Math.min(usage, 100) }
				}, "usage"));
				else {
					const customMetric = metrics.custom?.find((m) => m.id === metricId);
					if (customMetric) {
						const sensorInfo = hardwareInfo?.sensors.find((s) => s.Identifier === customMetric.sensorIdentifier);
						const sensorReading = sensorReadingMap.get(customMetric.sensorIdentifier);
						if (sensorInfo && sensorReading?.Value !== null && sensorReading?.Value !== void 0) {
							const value = Number.isInteger(sensorReading.Value) ? sensorReading.Value : parseFloat(sensorReading.Value.toFixed(1));
							list.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricItem, {
								value,
								unit: sensorInfo.Unit,
								label: customMetric.label,
								icon: getIconForSensorType$2(sensorInfo.Type)
							}, customMetric.id));
						}
					}
				}
			});
			metrics.custom?.forEach((customMetric) => {
				if (processedIds.has(customMetric.id)) return;
				const sensorInfo = hardwareInfo?.sensors.find((s) => s.Identifier === customMetric.sensorIdentifier);
				const sensorReading = sensorReadingMap.get(customMetric.sensorIdentifier);
				if (sensorInfo && sensorReading?.Value !== null && sensorReading?.Value !== void 0) {
					const value = Number.isInteger(sensorReading.Value) ? sensorReading.Value : parseFloat(sensorReading.Value.toFixed(1));
					list.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricItem, {
						value,
						unit: sensorInfo.Unit,
						label: customMetric.label,
						icon: getIconForSensorType$2(sensorInfo.Type)
					}, customMetric.id));
				}
			});
			return list;
		}, [
			metrics.enabled,
			metrics.custom,
			temp,
			usage,
			vramPercentage,
			usedVram,
			totalVram,
			hardwareInfo,
			sensorReadingMap
		])
	});
});
//#endregion
//#region extension/src/renderer/components/status-bar/sections/MemorySection.tsx
var { memo: memo$6, useMemo: useMemo$12 } = await importShared("react");
var getIconForSensorType$1 = (type) => {
	switch (type) {
		case "Temperature": return Thermometer;
		case "Load": return Activity;
		case "Power": return Power;
		case "Clock": return Gauge;
		case "Data":
		case "SmallData": return Database;
		default: return Activity;
	}
};
var MemorySection = memo$6(({ data, metrics, hardwareInfo, rawSensorValues }) => {
	const showAliasMemory = useHMonitorState("showAliasMemory");
	const { name, used, total } = data || {
		name: "",
		used: 0,
		total: 0
	};
	const memPercentage = useMemo$12(() => total > 0 ? used / total * 100 : 0, [total, used]);
	const sensorReadingMap = useMemo$12(() => {
		const map = /* @__PURE__ */ new Map();
		rawSensorValues.forEach((val) => map.set(val.Identifier, val));
		return map;
	}, [rawSensorValues]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
		title: showAliasMemory ? getMemoryAlias(name) : name,
		icon: MemoryStick,
		children: useMemo$12(() => {
			const list = [];
			const processedIds = /* @__PURE__ */ new Set();
			metrics.enabled.forEach((metricId) => {
				processedIds.add(metricId);
				if (metricId === "memory") list.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricItem, {
					label: "RAM",
					icon: HardDrive,
					progress: { value: memPercentage },
					colorClass: getUsageColor(memPercentage),
					value: `${used.toFixed(1)}/${total.toFixed(1)}GB`
				}, "memory"));
				else {
					const customMetric = metrics.custom?.find((m) => m.id === metricId);
					if (customMetric) {
						const sensorInfo = hardwareInfo?.sensors.find((s) => s.Identifier === customMetric.sensorIdentifier);
						const sensorReading = sensorReadingMap.get(customMetric.sensorIdentifier);
						if (sensorInfo && sensorReading?.Value !== null && sensorReading?.Value !== void 0) {
							const value = Number.isInteger(sensorReading.Value) ? sensorReading.Value : parseFloat(sensorReading.Value.toFixed(1));
							list.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricItem, {
								value,
								unit: sensorInfo.Unit,
								label: customMetric.label,
								icon: getIconForSensorType$1(sensorInfo.Type)
							}, customMetric.id));
						}
					}
				}
			});
			metrics.custom?.forEach((customMetric) => {
				if (processedIds.has(customMetric.id)) return;
				const sensorInfo = hardwareInfo?.sensors.find((s) => s.Identifier === customMetric.sensorIdentifier);
				const sensorReading = sensorReadingMap.get(customMetric.sensorIdentifier);
				if (sensorInfo && sensorReading?.Value !== null && sensorReading?.Value !== void 0) {
					const value = Number.isInteger(sensorReading.Value) ? sensorReading.Value : parseFloat(sensorReading.Value.toFixed(1));
					list.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricItem, {
						value,
						unit: sensorInfo.Unit,
						label: customMetric.label,
						icon: getIconForSensorType$1(sensorInfo.Type)
					}, customMetric.id));
				}
			});
			return list;
		}, [
			metrics.enabled,
			metrics.custom,
			memPercentage,
			used,
			total,
			hardwareInfo,
			sensorReadingMap
		])
	});
});
//#endregion
//#region src/common/utils/formatting.ts
/**
* Formatting utilities.
*/
/**
* Formats the total size into a human-readable format (MB or GB).
*
* @param {number} size - The total size in bytes.
* @returns {string} The formatted size with the appropriate unit (MB or GB).
*/
function formatSize(size) {
	if (!size) return "0KB";
	if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
	else if (size < 1024 * 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(2)} MB`;
	else return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}
/**
* Gets a numerical value from a string, converts it based on the initial unit,
* and then converts it to the specified target unit.
*
* @param {string} valueString - The string containing the value (e.g., "1024", "2.5").
* @param {StorageUnit} initialUnit - The unit of the provided value.
* @param {StorageUnit} targetUnit - The unit to convert the final value to.
* @returns {number | null} The converted numerical value, or null if parsing fails.
*/
function convertStorageUnit(valueString, initialUnit, targetUnit) {
	const UNIT_FACTORS = {
		b: 1,
		kb: 1024,
		mb: 1024 * 1024,
		gb: 1024 * 1024 * 1024,
		tb: 1024 * 1024 * 1024 * 1024,
		pb: 1024 * 1024 * 1024 * 1024 * 1024
	};
	const standardizeUnit = (unit) => unit.toLowerCase().trim();
	const initialKey = standardizeUnit(initialUnit);
	const targetKey = standardizeUnit(targetUnit);
	if (!UNIT_FACTORS[initialKey] || !UNIT_FACTORS[targetKey]) {
		console.error(`Internal error: Unit factor missing for Initial: ${initialUnit} or Target: ${targetUnit}`);
		return null;
	}
	const match = valueString.match(/(\d+\.?\d*)/);
	if (!match) {
		console.error(`Could not parse numerical value from string: ${valueString}`);
		return null;
	}
	const numericValue = parseFloat(match[0]);
	if (isNaN(numericValue)) {
		console.error(`Parsed value is not a number: ${match[0]}`);
		return null;
	}
	return numericValue * UNIT_FACTORS[initialKey] / UNIT_FACTORS[targetKey];
}
//#endregion
//#region src/common/utils/strings.ts
function getFallbackString(value) {
	return value.replace(/[^a-zA-Z0-9\s]/g, "").split(" ").map((item) => item.slice(0, 1).toUpperCase()).join("");
}
//#endregion
//#region extension/src/renderer/components/status-bar/sections/NetworkSection.tsx
var { memo: memo$5, useMemo: useMemo$11 } = await importShared("react");
var getIconForSensorType = (type) => {
	switch (type) {
		case "Temperature": return Thermometer;
		case "Load": return Activity;
		case "Power": return Power;
		case "Clock": return Gauge;
		case "Data":
		case "SmallData": return Database;
		default: return Activity;
	}
};
var NetworkSection = memo$5(({ data, metrics, hardwareInfo, rawSensorValues }) => {
	const showAliasNetwork = useHMonitorState("showAliasNetwork");
	const { name, uploadSpeed, downloadSpeed, uploadData, downloadData } = data || {
		name: "",
		uploadSpeed: 0,
		downloadSpeed: 0,
		uploadData: 0,
		downloadData: 0
	};
	const hasUploadSpeed = useMemo$11(() => metrics.enabled.includes("uploadSpeed"), [metrics.enabled]);
	const hasDownloadSpeed = useMemo$11(() => metrics.enabled.includes("downloadSpeed"), [metrics.enabled]);
	const hasUploadData = useMemo$11(() => metrics.enabled.includes("uploadData"), [metrics.enabled]);
	const hasDownloadData = useMemo$11(() => metrics.enabled.includes("downloadData"), [metrics.enabled]);
	const sensorReadingMap = useMemo$11(() => {
		const map = /* @__PURE__ */ new Map();
		rawSensorValues.forEach((val) => map.set(val.Identifier, val));
		return map;
	}, [rawSensorValues]);
	const title = showAliasNetwork ? getNetworkAlias(name) : name;
	const renderedMetrics = useMemo$11(() => {
		const list = [];
		const processedIds = /* @__PURE__ */ new Set();
		metrics.enabled.forEach((metricId) => {
			processedIds.add(metricId);
			if (metricId === "uploadSpeed") list.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricItem, {
				label: "Up",
				icon: ArrowUp,
				value: formatSize(uploadSpeed)
			}, "uploadSpeed"));
			else if (metricId === "downloadSpeed") list.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricItem, {
				label: "Down",
				icon: ArrowDown,
				value: formatSize(downloadSpeed)
			}, "downloadSpeed"));
			else if (metricId === "uploadData") list.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricItem, {
				icon: ArrowUp,
				label: "Up Data",
				value: formatSize(convertStorageUnit(uploadData?.toString() ?? "0", "GB", "B") || 0)
			}, "uploadData"));
			else if (metricId === "downloadData") list.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricItem, {
				icon: ArrowDown,
				label: "Down Data",
				value: formatSize(convertStorageUnit(downloadData?.toString() ?? "0", "GB", "B") || 0)
			}, "downloadData"));
			else {
				const customMetric = metrics.custom?.find((m) => m.id === metricId);
				if (customMetric) {
					const sensorInfo = hardwareInfo?.sensors.find((s) => s.Identifier === customMetric.sensorIdentifier);
					const sensorReading = sensorReadingMap.get(customMetric.sensorIdentifier);
					if (sensorInfo && sensorReading?.Value !== null && sensorReading?.Value !== void 0) {
						const value = Number.isInteger(sensorReading.Value) ? sensorReading.Value : parseFloat(sensorReading.Value.toFixed(1));
						list.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricItem, {
							value,
							unit: sensorInfo.Unit,
							label: customMetric.label,
							icon: getIconForSensorType(sensorInfo.Type)
						}, customMetric.id));
					}
				}
			}
		});
		if (!hasUploadSpeed && !hasDownloadSpeed && !hasUploadData && !hasDownloadData) return null;
		metrics.custom?.forEach((customMetric) => {
			if (processedIds.has(customMetric.id)) return;
			const sensorInfo = hardwareInfo?.sensors.find((s) => s.Identifier === customMetric.sensorIdentifier);
			const sensorReading = sensorReadingMap.get(customMetric.sensorIdentifier);
			if (sensorInfo && sensorReading?.Value !== null && sensorReading?.Value !== void 0) {
				const value = Number.isInteger(sensorReading.Value) ? sensorReading.Value : parseFloat(sensorReading.Value.toFixed(1));
				list.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricItem, {
					value,
					unit: sensorInfo.Unit,
					label: customMetric.label,
					icon: getIconForSensorType(sensorInfo.Type)
				}, customMetric.id));
			}
		});
		return list;
	}, [
		metrics.enabled,
		metrics.custom,
		uploadSpeed,
		downloadSpeed,
		uploadData,
		downloadData,
		hardwareInfo,
		sensorReadingMap
	]);
	if (renderedMetrics?.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
		icon: Wifi,
		title,
		children: renderedMetrics
	});
});
//#endregion
//#region extension/src/renderer/components/status-bar/sections/PingSection.tsx
var { memo: memo$4, useEffect: useEffect$9, useMemo: useMemo$10, useState: useState$7 } = await importShared("react");
function PingSection() {
	const pingState = useHMonitorState("pingState");
	const [hostResults, setHostResults] = useState$7({});
	const renderElements = useMemo$10(() => {
		return Array.from(new Set(pingState.enabledHosts)).map((host) => {
			const item = hostResults[host];
			const value = !item || !item.latency ? "-1" : `${item.latency} ms`;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricItem, {
				icon: Zap,
				label: host,
				value,
				colorClass: value === "-1" ? "text-warning" : void 0
			}, host);
		});
	}, [hostResults, pingState]);
	useEffect$9(() => {
		const clearListener = window.electron.ipcRenderer.on(HMONITOR_IPC_UPDATE_PING, (_, result) => {
			if (typeof result === "string") setHostResults((prevResults) => ({
				...prevResults,
				[result]: null
			}));
			else {
				const data = result;
				setHostResults((prevResults) => ({
					...prevResults,
					[data.host]: data
				}));
			}
		});
		const clearStopListener = window.electron.ipcRenderer.on(HMONITOR_IPC_STOP_PING, (_, host) => {
			setHostResults((prevState) => {
				const { [host]: _, ...remainingHosts } = prevState;
				return remainingHosts;
			});
		});
		return () => {
			clearListener();
			clearStopListener();
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
		title: "Ping",
		icon: Radar,
		children: renderElements
	});
}
var PingSection_default = memo$4(PingSection);
//#endregion
//#region extension/src/renderer/utils/formatUtils.ts
/**
* Formats a duration in seconds into a human-readable string (e.g., "5d 4h", "3h 2m", "15m").
* @param totalSeconds - The duration in seconds.
* @returns A formatted string representing the uptime.
*/
var formatUptime = (totalSeconds) => {
	if (totalSeconds < 60) return "0m";
	const days = Math.floor(totalSeconds / 86400);
	const hours = Math.floor(totalSeconds % 86400 / 3600);
	const minutes = Math.floor(totalSeconds % 3600 / 60);
	if (days > 0) return `${days}d ${hours}h`;
	if (hours > 0) return `${hours}h ${minutes}m`;
	return `${minutes}m`;
};
//#endregion
//#region extension/src/renderer/components/status-bar/sections/UptimeSection.tsx
var { memo: memo$3, useMemo: useMemo$9 } = await importShared("react");
function UpTimeSection({ data, metrics }) {
	const uptimeOrder = useHMonitorState("uptimeOrder") || ["uptimeSystem", "uptimeApp"];
	const { hasApp, hasSystem } = useMemo$9(() => ({
		hasApp: metrics.app,
		hasSystem: metrics.system
	}), [metrics]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
		icon: Clock,
		title: "Uptime",
		children: useMemo$9(() => {
			return uptimeOrder.map((item) => {
				if (item === "uptimeSystem" && hasSystem) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricItem, {
					icon: Clock,
					label: "System",
					value: formatUptime(data.system || 0)
				}, "system");
				if (item === "uptimeApp" && hasApp) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricItem, {
					label: "App",
					icon: Activity,
					value: formatUptime(data.app || 0)
				}, "app");
				return null;
			});
		}, [
			uptimeOrder,
			hasSystem,
			hasApp,
			data
		])
	});
}
var UptimeSection_default = memo$3(UpTimeSection);
//#endregion
//#region extension/src/renderer/components/status-bar/HardwareStatusBar.tsx
var { Link, Separator: Separator$1 } = await importShared("@heroui/react");
var { memo: memo$2, useMemo: useMemo$8 } = await importShared("react");
var SECTIONS_CONFIG = [
	{
		type: "cpu",
		Component: CpuSection
	},
	{
		type: "gpu",
		Component: GpuSection
	},
	{
		type: "memory",
		Component: MemorySection
	},
	{
		type: "network",
		Component: NetworkSection
	}
];
var isSectionActive = (items) => {
	if (!items) return false;
	return items.some((item) => item.active && (item.enabled?.length > 0 || item.custom?.length > 0));
};
function HardwareStatusBar() {
	const enabled = useHMonitorState("enabled");
	const displayStyle = useHMonitorState("displayStyle");
	const enabledMetrics = useHMonitorState("enabledMetrics");
	const availableHardware = useHMonitorState("availableHardware");
	const pingState = useHMonitorState("pingState");
	const sectionOrder = useHMonitorState("sectionOrder");
	const darkMode = useAppState("darkMode");
	const { hardwareData, isConnected, error } = useHardwareData();
	const { containerRef, canScrollLeft, canScrollRight, scroll } = useScrollManager();
	const initRef = (node) => {
		if (node) containerRef(node);
	};
	const hasMetricsEnabled = useMemo$8(() => {
		if (!enabledMetrics) return {
			cpu: false,
			gpu: false,
			memory: false,
			network: false,
			uptime: false
		};
		return {
			cpu: isSectionActive(enabledMetrics.cpu),
			gpu: isSectionActive(enabledMetrics.gpu),
			memory: isSectionActive(enabledMetrics.memory),
			network: isSectionActive(enabledMetrics.network),
			uptime: !!(enabledMetrics.uptime?.system || enabledMetrics.uptime?.app)
		};
	}, [enabledMetrics]);
	const errorElement = useMemo$8(() => {
		if (!error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShinyText, {
			speed: 2,
			darkMode,
			text: "Waiting for hardware information...",
			className: "font-semibold text-semi-muted text-sm"
		});
		if (error.message?.includes("dotnet")) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-semi-muted",
				children: ".NET 10.0 runtime not found. Please install it "
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				onPress: () => window.open("https://dotnet.microsoft.com/en-us/download/dotnet/10.0"),
				children: "Here"
			})]
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-warning",
			children: "Couldn't load metrics. Please try restarting LynxHub."
		});
	}, [error, darkMode]);
	const renderedElements = useMemo$8(() => {
		if (!isConnected || !hardwareData) return [];
		const elements = [];
		(sectionOrder || [
			"cpu",
			"gpu",
			"memory",
			"network",
			"uptime",
			"ping"
		]).forEach((sectionType) => {
			if (sectionType === "uptime") {
				if (hasMetricsEnabled.uptime) elements.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UptimeSection_default, {
					data: hardwareData.uptime,
					metrics: enabledMetrics.uptime
				}, "uptime"));
			} else if (sectionType === "ping") {
				if (pingState.isActive) elements.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PingSection_default, {}, "ping"));
			} else {
				const config = SECTIONS_CONFIG.find((c) => c.type === sectionType);
				if (!config || !hasMetricsEnabled[sectionType]) return;
				const metricsList = enabledMetrics?.[sectionType] || [];
				const hardwareDataList = hardwareData[sectionType] || [];
				const availableList = availableHardware?.[sectionType] || [];
				const GenericComponent = config.Component;
				metricsList.forEach((metric, index) => {
					if (!metric.active) return;
					const data = hardwareDataList.find((item) => item.name === metric.name);
					const hardwareInfo = availableList.find((h) => h.name === metric.name);
					if (!data && !hardwareInfo) return;
					elements.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenericComponent, {
						data,
						metrics: metric,
						hardwareInfo,
						rawSensorValues: hardwareData.rawSensors
					}, `${sectionType}_${metric.name}_${index}`));
				});
			}
		});
		return elements.reduce((acc, element, index) => {
			if (index > 0) acc.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator$1, {
				orientation: "vertical",
				className: displayStyle.includes("two-column") ? "my-1 h-10" : "my-2"
			}, `sep_${index}`));
			acc.push(element);
			return acc;
		}, []);
	}, [
		isConnected,
		hardwareData,
		enabledMetrics,
		availableHardware,
		hasMetricsEnabled,
		pingState,
		displayStyle,
		sectionOrder
	]);
	if (!enabled) return null;
	const isSmallStyle = ["compact", "raw"].includes(displayStyle);
	const isTwoColumn = ["two-column", "raw-two-column"].includes(displayStyle);
	const heightClass = displayStyle === "raw" ? "h-8" : isSmallStyle ? "h-7" : isTwoColumn ? "h-11" : "h-12";
	const buttonSizeClass = isSmallStyle ? "size-5" : "size-8";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `relative ${heightClass} w-full bg-surface`,
		children: [
			canScrollLeft && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: `absolute left-2 top-1/2 -translate-y-1/2 z-10 ${buttonSizeClass} rounded-full bg-surface-secondary border border-foreground/30 flex items-center justify-center hover:bg-surface-tertiary transition-all duration-200 backdrop-blur-sm`,
				onClick: () => scroll("left"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4 text-foreground" })
			}),
			canScrollRight && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: `absolute right-2 top-1/2 -translate-y-1/2 z-10 ${buttonSizeClass} rounded-full bg-surface-secondary border border-foreground/30 flex items-center justify-center hover:bg-surface-tertiary transition-all duration-200 backdrop-blur-sm`,
				onClick: () => scroll("right"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4 text-foreground" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `h-full flex items-center ${isSmallStyle ? "px-2" : "px-3"} ${displayStyle.includes("raw") ? "gap-x-3" : "gap-x-2"} overflow-x-auto`,
				ref: initRef,
				style: {
					scrollbarWidth: "none",
					msOverflowStyle: "none"
				},
				children: isConnected ? renderedElements : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-full text-center",
					children: errorElement
				})
			})
		]
	});
}
var HardwareStatusBar_default = memo$2(HardwareStatusBar);
//#endregion
//#region extension/src/renderer/integrations/ConfigProvider.tsx
var { Fragment: Fragment$3, useEffect: useEffect$8 } = await importShared("react");
var { useDispatch: useDispatch$4 } = await importShared("react-redux");
/**
* A provider component that listens for configuration updates from the main process
* and syncs them with the Redux state. This is registered via LynxHub's `addCustomHook`.
*/
function ConfigProviderWrapper() {
	const dispatch = useDispatch$4();
	useEffect$8(() => {
		const handleConfigUpdate = (_, newConfig) => {
			if (newConfig) dispatch(hmonitorActions.setConfig(newConfig));
		};
		const clearListener = window.electron.ipcRenderer.on(HMONITOR_IPC_CONFIG_UPDATE, handleConfigUpdate);
		return () => clearListener();
	}, [dispatch]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fragment$3, {});
}
function ConfigProvider(lynxAPI) {
	lynxAPI.addCustomHook(ConfigProviderWrapper);
}
//#endregion
//#region src/renderer/mainWindow/components/ToolsCard.tsx
var { Avatar, Card: Card$3, Description: Description$3, Label: Label$3 } = await importShared("@heroui/react");
/**
* A card component for the Tools page, featuring a spotlight effect and hover animations.
*/
function ToolsCard({ title, description, icon, onPress, footer, avatarClassName }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card$3, {
		className: "w-75 h-46 relative group transform border border-surface  hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer",
		onClick: onPress,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card$3.Header, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "inline-flex items-center gap-2",
				children: [typeof icon === "string" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
					className: `size-12 shrink-0 ring-LynxPurple ring-2 ${avatarClassName}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar.Image, {
						src: icon,
						alt: title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar.Fallback, { children: getFallbackString(title) })]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `size-12 rounded-full ring-2 ring-LynxPurple flex items-center justify-center  ${avatarClassName}`,
					children: icon
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col pointer-events-none",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$3, { children: title })
				})]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card$3.Content, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description$3, {
				className: "line-clamp-3 text-xs",
				children: description
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card$3.Footer, { children: footer })
		]
	});
}
//#endregion
//#region node_modules/@solar-icons/react-perf/dist/lib/IconBase.mjs
var { forwardRef: e } = await importShared("react");
var r$3 = e((e, r) => {
	let { alt: i, color: a = `currentColor`, size: o = `1em`, mirrored: s = !1, children: c, ...l } = e;
	return (0, import_jsx_runtime.jsxs)(`svg`, {
		ref: r,
		xmlns: `http://www.w3.org/2000/svg`,
		width: o,
		height: o,
		color: a,
		fill: `none`,
		viewBox: `0 0 24 24`,
		transform: s ? `scale(-1, 1)` : void 0,
		...l,
		children: [!!i && (0, import_jsx_runtime.jsx)(`title`, { children: i }), c]
	});
});
r$3.displayName = `IconBase`;
//#endregion
//#region node_modules/@solar-icons/react-perf/dist/icons/devices/BoldDuotone/CpuBolt.mjs
var { forwardRef: t$2 } = await importShared("react");
var i$1 = t$2((t, i) => (0, import_jsx_runtime.jsxs)(r$3, {
	ref: i,
	...t,
	children: [
		(0, import_jsx_runtime.jsx)(`path`, {
			opacity: `0.5`,
			d: `M9.18091 9.18091C9.23402 9.1278 9.32886 9.06211 9.63147 9.02143C9.95415 8.97804 10.3921 8.97656 11.0696 8.97656H12.9301C13.6075 8.97656 14.0455 8.97804 14.3682 9.02143C14.6708 9.06211 14.7656 9.1278 14.8187 9.18091C14.8718 9.23402 14.9375 9.32886 14.9782 9.63147C15.0216 9.95415 15.0231 10.3921 15.0231 11.0696V12.9301C15.0231 13.6075 15.0216 14.0455 14.9782 14.3682C14.9375 14.6708 14.8718 14.7656 14.8187 14.8187C14.7656 14.8718 14.6708 14.9375 14.3682 14.9782C14.0455 15.0216 13.6075 15.0231 12.9301 15.0231H11.0696C10.3921 15.0231 9.95415 15.0216 9.63147 14.9782C9.32886 14.9375 9.23402 14.8718 9.18091 14.8187C9.1278 14.7656 9.06211 14.6708 9.02143 14.3682C8.97804 14.0455 8.97656 13.6075 8.97656 12.9301V11.0696C8.97656 10.3921 8.97804 9.95415 9.02143 9.63147C9.06211 9.32886 9.1278 9.23402 9.18091 9.18091Z`,
			fill: `currentColor`
		}),
		(0, import_jsx_runtime.jsx)(`path`, {
			fillRule: `evenodd`,
			clipRule: `evenodd`,
			d: `M12.6977 2.69767C12.6977 2.31236 12.3853 2 12 2C11.6147 2 11.3023 2.31236 11.3023 2.69767V5.48837C10.7916 5.48944 10.3283 5.49342 9.90678 5.50495L9.90698 5.48837V2.69767C9.90698 2.31236 9.59462 2 9.2093 2C8.82399 2 8.51163 2.31236 8.51163 2.69767V5.48837C8.51163 5.52487 8.51443 5.56072 8.51984 5.5957C7.58381 5.71067 6.93517 5.94879 6.44198 6.44198C5.94879 6.93517 5.71067 7.58381 5.5957 8.51984C5.56071 8.51443 5.52487 8.51163 5.48837 8.51163H2.69767C2.31236 8.51163 2 8.82399 2 9.2093C2 9.59462 2.31236 9.90698 2.69767 9.90698H5.48837L5.50495 9.90678C5.49342 10.3283 5.48991 10.7916 5.48884 11.3023L2.69767 11.3023C2.31236 11.3023 2 11.6147 2 12C2 12.3853 2.31236 12.6977 2.69767 12.6977H5.48837C5.48944 13.2084 5.49342 13.6717 5.50495 14.0932L5.48837 14.093H2.69767C2.31236 14.093 2 14.4054 2 14.7907C2 15.176 2.31236 15.4884 2.69767 15.4884H5.48837C5.52487 15.4884 5.56071 15.4856 5.5957 15.4802C5.71067 16.4162 5.94879 17.0648 6.44198 17.558C6.93517 18.0512 7.58381 18.2893 8.51984 18.4043C8.51443 18.4393 8.51163 18.4751 8.51163 18.5116V21.3023C8.51163 21.6876 8.82399 22 9.2093 22C9.59462 22 9.90698 21.6876 9.90698 21.3023V18.5116L9.90678 18.495C10.3283 18.5066 10.7916 18.5101 11.3023 18.5112L11.3023 21.3023C11.3023 21.6876 11.6147 22 12 22C12.3853 22 12.6977 21.6876 12.6977 21.3023V18.5116C13.2084 18.5106 13.6717 18.5066 14.0932 18.495L14.093 18.5116V21.3023C14.093 21.6876 14.4054 22 14.7907 22C15.176 22 15.4884 21.6876 15.4884 21.3023V18.5116C15.4884 18.4751 15.4856 18.4393 15.4802 18.4043C16.4162 18.2893 17.0648 18.0512 17.558 17.558C18.0512 17.0648 18.2893 16.4162 18.4043 15.4802C18.4393 15.4856 18.4751 15.4884 18.5116 15.4884H21.3023C21.6876 15.4884 22 15.176 22 14.7907C22 14.4054 21.6876 14.093 21.3023 14.093H18.5116L18.495 14.0932C18.5066 13.6717 18.5101 13.2084 18.5112 12.6977L21.3023 12.6977C21.6876 12.6977 22 12.3853 22 12C22 11.6147 21.6876 11.3023 21.3023 11.3023H18.5116C18.5106 10.7916 18.5066 10.3283 18.495 9.90678L18.5116 9.90698H21.3023C21.6876 9.90698 22 9.59462 22 9.2093C22 8.82399 21.6876 8.51163 21.3023 8.51163H18.5116C18.4751 8.51163 18.4393 8.51443 18.4043 8.51984C18.2893 7.58381 18.0512 6.93517 17.558 6.44198C17.0648 5.94879 16.4162 5.71067 15.4802 5.5957C15.4856 5.56072 15.4884 5.52487 15.4884 5.48837V2.69767C15.4884 2.31236 15.176 2 14.7907 2C14.4054 2 14.093 2.31236 14.093 2.69767V5.48837L14.0932 5.50495C13.6717 5.49342 13.2084 5.48991 12.6977 5.48884V2.69767ZM9.44573 7.63871C9.87247 7.58133 10.4054 7.58136 11.0238 7.5814H12.9762C13.5947 7.58136 14.1275 7.58133 14.5543 7.63871C15.0116 7.70019 15.45 7.83885 15.8056 8.19443C16.1612 8.55001 16.2998 8.98839 16.3613 9.44573C16.4187 9.87246 16.4186 10.4053 16.4186 11.0238V12.9762C16.4186 13.5946 16.4187 14.1275 16.3613 14.5543C16.2998 15.0116 16.1612 15.45 15.8056 15.8056C15.45 16.1612 15.0116 16.2998 14.5543 16.3613C14.1275 16.4187 13.5947 16.4186 12.9762 16.4186H11.0238C10.4054 16.4186 9.87246 16.4187 9.44573 16.3613C8.98839 16.2998 8.55001 16.1612 8.19443 15.8056C7.83885 15.45 7.70019 15.0116 7.63871 14.5543C7.58133 14.1275 7.58136 13.5946 7.5814 12.9762V11.0238C7.58136 10.4054 7.58133 9.87247 7.63871 9.44573C7.70019 8.98839 7.83885 8.55001 8.19443 8.19443C8.55001 7.83885 8.98839 7.70019 9.44573 7.63871Z`,
			fill: `currentColor`
		}),
		(0, import_jsx_runtime.jsx)(`path`, {
			d: `M12.9664 10.5446C13.1903 10.2311 13.1177 9.79537 12.8042 9.57141C12.4906 9.34745 12.0549 9.42008 11.8309 9.73362L10.502 11.5941C10.3501 11.8067 10.3298 12.0865 10.4494 12.3188C10.569 12.5512 10.8084 12.6973 11.0697 12.6973H11.5745L11.0336 13.4545C10.8096 13.7681 10.8822 14.2038 11.1958 14.4278C11.5093 14.6517 11.9451 14.5791 12.169 14.2656L13.4979 12.4051C13.6498 12.1925 13.6701 11.9127 13.5506 11.6804C13.431 11.448 13.1916 11.3019 12.9302 11.3019H12.4255L12.9664 10.5446Z`,
			fill: `currentColor`
		})
	]
}));
i$1.displayName = `CpuBolt`;
//#endregion
//#region node_modules/@solar-icons/react-perf/dist/icons/devices/BoldDuotone/Diskette.mjs
var { forwardRef: t$1 } = await importShared("react");
var i = t$1((t, i) => (0, import_jsx_runtime.jsxs)(r$3, {
	ref: i,
	...t,
	children: [
		(0, import_jsx_runtime.jsx)(`path`, {
			opacity: `0.5`,
			d: `M20.5355 20.5355C22 19.0711 22 16.714 22 12C22 11.6585 22 11.4878 21.9848 11.3142C21.9142 10.5049 21.586 9.71257 21.0637 9.09034C20.9516 8.95687 20.828 8.83317 20.5806 8.58578L15.4142 3.41944C15.1668 3.17206 15.0431 3.04835 14.9097 2.93631C14.2874 2.414 13.4951 2.08581 12.6858 2.01515C12.5122 2 12.3415 2 12 2C7.28595 2 4.92893 2 3.46447 3.46447C2 4.92893 2 7.28595 2 12C2 16.714 2 19.0711 3.46447 20.5355C4.1485 21.2196 5.02727 21.5841 6.25 21.7784L7.75 21.9313C8.9058 22 10.2996 22 12 22C13.7004 22 15.0942 22 16.25 21.9313L17.75 21.7784C18.9727 21.5841 19.8515 21.2196 20.5355 20.5355Z`,
			fill: `currentColor`
		}),
		(0, import_jsx_runtime.jsx)(`path`, {
			d: `M7 7.25C6.58579 7.25 6.25 7.58579 6.25 8C6.25 8.41421 6.58579 8.75 7 8.75H13C13.4142 8.75 13.75 8.41421 13.75 8C13.75 7.58579 13.4142 7.25 13 7.25H7Z`,
			fill: `currentColor`
		}),
		(0, import_jsx_runtime.jsx)(`path`, {
			d: `M13.052 16.25C13.9505 16.25 14.6997 16.2499 15.2945 16.3299C15.9223 16.4143 16.4891 16.6 16.9445 17.0555C17.4 17.5109 17.5857 18.0777 17.6701 18.7055C17.7501 19.3003 17.75 20.0495 17.75 20.948V20.948L17.75 21.7812L16.25 21.9219V21C16.25 20.036 16.2484 19.3884 16.1835 18.9054C16.1214 18.4439 16.0142 18.2464 15.8839 18.1161C15.7536 17.9858 15.5561 17.8786 15.0946 17.8165C14.6116 17.7516 13.964 17.75 13 17.75H11C10.036 17.75 9.38843 17.7516 8.90539 17.8165C8.44393 17.8786 8.24644 17.9858 8.11612 18.1161C7.9858 18.2464 7.87858 18.4439 7.81654 18.9054C7.7516 19.3884 7.75 20.036 7.75 21V21.9258L6.25 21.7773L6.25 20.948V20.948C6.24997 20.0495 6.24995 19.3003 6.32991 18.7055C6.41432 18.0777 6.59999 17.5109 7.05546 17.0555C7.51093 16.6 8.07773 16.4143 8.70552 16.3299C9.3003 16.2499 10.0495 16.25 10.948 16.25H10.948H13.052H13.052Z`,
			fill: `currentColor`
		})
	]
}));
i.displayName = `Diskette`;
//#endregion
//#region src/renderer/mainWindow/redux/reducers/settings.ts
var { useSelector: useSelector$1 } = await importShared("react-redux");
var settingsSlice = createSlice({
	initialState: {
		tooltipLevel: "essential",
		closeConfirm: true,
		closeTabConfirm: true,
		terminateAIConfirm: true,
		exitSignalConfirm: true,
		openLastSize: false,
		updatedModules: [],
		newModules: [],
		updateAvailable: false,
		dynamicAppTitle: false,
		openLinkExternal: false,
		hardwareAcceleration: true,
		disableLoadingAnimations: false,
		checkCustomUpdate: false,
		searchValue: "",
		searchWords: [],
		selectedSection: ""
	},
	name: "settings",
	reducers: {
		setSettingsState: (state, action) => {
			state[action.payload.key] = action.payload.value;
		},
		setSearchValue: (state, action) => {
			const searchValue = action.payload;
			state.searchValue = searchValue;
			state.searchWords = searchValue ? searchValue.split(/\s+/) : [];
		}
	}
});
/**
* Hook to access a single settings state field with key-safe typing.
*/
var useSettingsState = (name) => useSelector$1((state) => state.settings[name]);
settingsSlice.actions;
settingsSlice.reducer;
//#endregion
//#region src/renderer/mainWindow/pages/settings/SettingsSearchHighlight.tsx
var import_main = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = (function(modules) {
		var installedModules = {};
		function __webpack_require__(moduleId) {
			if (installedModules[moduleId]) return installedModules[moduleId].exports;
			var module$1 = installedModules[moduleId] = {
				exports: {},
				id: moduleId,
				loaded: false
			};
			modules[moduleId].call(module$1.exports, module$1, module$1.exports, __webpack_require__);
			module$1.loaded = true;
			return module$1.exports;
		}
		__webpack_require__.m = modules;
		__webpack_require__.c = installedModules;
		__webpack_require__.p = "";
		return __webpack_require__(0);
	})([
		(function(module$2, exports$1, __webpack_require__) {
			module$2.exports = __webpack_require__(1);
		}),
		(function(module$3, exports$2, __webpack_require__) {
			"use strict";
			Object.defineProperty(exports$2, "__esModule", { value: true });
			function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : { "default": obj };
			}
			exports$2["default"] = _interopRequireDefault(__webpack_require__(2))["default"];
			module$3.exports = exports$2["default"];
		}),
		(function(module$4, exports$3, __webpack_require__) {
			"use strict";
			Object.defineProperty(exports$3, "__esModule", { value: true });
			var _extends = Object.assign || function(target) {
				for (var i = 1; i < arguments.length; i++) {
					var source = arguments[i];
					for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
				}
				return target;
			};
			exports$3["default"] = Highlighter;
			function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : { "default": obj };
			}
			function _objectWithoutProperties(obj, keys) {
				var target = {};
				for (var i in obj) {
					if (keys.indexOf(i) >= 0) continue;
					if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
					target[i] = obj[i];
				}
				return target;
			}
			var _highlightWordsCore = __webpack_require__(3);
			var _react = __webpack_require__(4);
			var _memoizeOne2 = _interopRequireDefault(__webpack_require__(5));
			/**
			* Highlighter component
			* @param {object} props - Component properties
			* @param {string} [props.activeClassName] - The class name to be applied to an active match. Use along with `activeIndex`.
			* @param {number} [props.activeIndex] - Specify the match index that should be actively highlighted. Use along with `activeClassName`.
			* @param {object} [props.activeStyle] - The inline style to be applied to an active match. Use along with `activeIndex`.
			* @param {boolean} [props.autoEscape] - Escape characters in searchWords which are meaningful in regular expressions.
			* @param {string} [props.className] - CSS class name applied to the outer/wrapper `<span>`.
			* @param {(options: object) => Array<{start: number, end: number}>} [props.findChunks] - Use a custom function to search for matching chunks.  See the default `findChunks` function in `highlight-words-core` for signature.
			* @param {string|object} [props.highlightClassName] - CSS class name applied to highlighted text or object mapping search term matches to class names.
			* @param {object} [props.highlightStyle] - Inline styles applied to highlighted text.
			* @param {React.ComponentType|string} [props.highlightTag] - Type of tag to wrap around highlighted matches. Defaults to `mark` but can also be a React component (class or functional).
			* @param {(text: string) => string} [props.sanitize] - Process each search word and text to highlight before comparing.
			* @param {Array<string|RegExp>} props.searchWords - Array of search words. String search terms are automatically cast to RegExps unless `autoEscape` is true.
			* @param {string} props.textToHighlight - The text to highlight matches in.
			* @param {React.ComponentType|string} [props.unhighlightTag] - Type of tag applied to unhighlighted parts. Defaults to `span` but can also be a React component (class or functional).
			* @param {string} [props.unhighlightClassName] - CSS class name applied to unhighlighted text.
			* @param {object} [props.unhighlightStyle] - Inline styles applied to the unhighlighted text.
			* @param {object} [props.rest] - Additional attributes passed to the outer `<span>` element.
			*/
			function Highlighter(_ref) {
				var _ref$activeClassName = _ref.activeClassName;
				var activeClassName = _ref$activeClassName === void 0 ? "" : _ref$activeClassName;
				var _ref$activeIndex = _ref.activeIndex;
				var activeIndex = _ref$activeIndex === void 0 ? -1 : _ref$activeIndex;
				var activeStyle = _ref.activeStyle;
				var autoEscape = _ref.autoEscape;
				var _ref$caseSensitive = _ref.caseSensitive;
				var caseSensitive = _ref$caseSensitive === void 0 ? false : _ref$caseSensitive;
				var className = _ref.className;
				var findChunks = _ref.findChunks;
				var _ref$highlightClassName = _ref.highlightClassName;
				var highlightClassName = _ref$highlightClassName === void 0 ? "" : _ref$highlightClassName;
				var _ref$highlightStyle = _ref.highlightStyle;
				var highlightStyle = _ref$highlightStyle === void 0 ? {} : _ref$highlightStyle;
				var _ref$highlightTag = _ref.highlightTag;
				var highlightTag = _ref$highlightTag === void 0 ? "mark" : _ref$highlightTag;
				var sanitize = _ref.sanitize;
				var searchWords = _ref.searchWords;
				var textToHighlight = _ref.textToHighlight;
				var _ref$unhighlightTag = _ref.unhighlightTag;
				var unhighlightTag = _ref$unhighlightTag === void 0 ? "span" : _ref$unhighlightTag;
				var _ref$unhighlightClassName = _ref.unhighlightClassName;
				var unhighlightClassName = _ref$unhighlightClassName === void 0 ? "" : _ref$unhighlightClassName;
				var unhighlightStyle = _ref.unhighlightStyle;
				var rest = _objectWithoutProperties(_ref, [
					"activeClassName",
					"activeIndex",
					"activeStyle",
					"autoEscape",
					"caseSensitive",
					"className",
					"findChunks",
					"highlightClassName",
					"highlightStyle",
					"highlightTag",
					"sanitize",
					"searchWords",
					"textToHighlight",
					"unhighlightTag",
					"unhighlightClassName",
					"unhighlightStyle"
				]);
				var chunks = (0, _highlightWordsCore.findAll)({
					autoEscape,
					caseSensitive,
					findChunks,
					sanitize,
					searchWords,
					textToHighlight
				});
				var HighlightTag = highlightTag;
				var highlightIndex = -1;
				var highlightClassNames = "";
				var highlightStyles = void 0;
				var memoizedLowercaseProps = (0, _memoizeOne2["default"])(function lowercaseProps(object) {
					var mapped = {};
					for (var key in object) mapped[key.toLowerCase()] = object[key];
					return mapped;
				});
				return (0, _react.createElement)("span", _extends({ className }, rest, { children: chunks.map(function(chunk, index) {
					var text = textToHighlight.substr(chunk.start, chunk.end - chunk.start);
					if (chunk.highlight) {
						highlightIndex++;
						var highlightClass = void 0;
						if (typeof highlightClassName === "object") if (!caseSensitive) {
							highlightClassName = memoizedLowercaseProps(highlightClassName);
							highlightClass = highlightClassName[text.toLowerCase()];
						} else highlightClass = highlightClassName[text];
						else highlightClass = highlightClassName;
						var isActive = highlightIndex === +activeIndex;
						highlightClassNames = highlightClass + " " + (isActive ? activeClassName : "");
						highlightStyles = isActive === true && activeStyle != null ? Object.assign({}, highlightStyle, activeStyle) : highlightStyle;
						var props = {
							children: text,
							className: highlightClassNames,
							key: index,
							style: highlightStyles
						};
						if (typeof HighlightTag !== "string") props.highlightIndex = highlightIndex;
						return (0, _react.createElement)(HighlightTag, props);
					} else return (0, _react.createElement)(unhighlightTag, {
						children: text,
						className: unhighlightClassName,
						key: index,
						style: unhighlightStyle
					});
				}) }));
			}
			module$4.exports = exports$3["default"];
		}),
		(function(module$5, exports$4) {
			module$5.exports = (function(modules) {
				var installedModules = {};
				function __webpack_require__(moduleId) {
					if (installedModules[moduleId]) return installedModules[moduleId].exports;
					var module$6 = installedModules[moduleId] = {
						exports: {},
						id: moduleId,
						loaded: false
					};
					modules[moduleId].call(module$6.exports, module$6, module$6.exports, __webpack_require__);
					module$6.loaded = true;
					return module$6.exports;
				}
				__webpack_require__.m = modules;
				__webpack_require__.c = installedModules;
				__webpack_require__.p = "";
				return __webpack_require__(0);
			})([
				(function(module$7, exports$5, __webpack_require__) {
					module$7.exports = __webpack_require__(1);
				}),
				(function(module$8, exports$6, __webpack_require__) {
					"use strict";
					Object.defineProperty(exports$6, "__esModule", { value: true });
					var _utils = __webpack_require__(2);
					Object.defineProperty(exports$6, "combineChunks", {
						enumerable: true,
						get: function get() {
							return _utils.combineChunks;
						}
					});
					Object.defineProperty(exports$6, "fillInChunks", {
						enumerable: true,
						get: function get() {
							return _utils.fillInChunks;
						}
					});
					Object.defineProperty(exports$6, "findAll", {
						enumerable: true,
						get: function get() {
							return _utils.findAll;
						}
					});
					Object.defineProperty(exports$6, "findChunks", {
						enumerable: true,
						get: function get() {
							return _utils.findChunks;
						}
					});
				}),
				(function(module$9, exports$7) {
					"use strict";
					Object.defineProperty(exports$7, "__esModule", { value: true });
					exports$7.findAll = function findAll(_ref) {
						var autoEscape = _ref.autoEscape, _ref$caseSensitive = _ref.caseSensitive, caseSensitive = _ref$caseSensitive === void 0 ? false : _ref$caseSensitive, _ref$findChunks = _ref.findChunks, findChunks = _ref$findChunks === void 0 ? defaultFindChunks : _ref$findChunks, sanitize = _ref.sanitize, searchWords = _ref.searchWords, textToHighlight = _ref.textToHighlight;
						return fillInChunks({
							chunksToHighlight: combineChunks({ chunks: findChunks({
								autoEscape,
								caseSensitive,
								sanitize,
								searchWords,
								textToHighlight
							}) }),
							totalLength: textToHighlight ? textToHighlight.length : 0
						});
					};
					/**
					* Takes an array of {start:number, end:number} objects and combines chunks that overlap into single chunks.
					* @return {start:number, end:number}[]
					*/
					var combineChunks = exports$7.combineChunks = function combineChunks(_ref2) {
						var chunks = _ref2.chunks;
						chunks = chunks.sort(function(first, second) {
							return first.start - second.start;
						}).reduce(function(processedChunks, nextChunk) {
							if (processedChunks.length === 0) return [nextChunk];
							else {
								var prevChunk = processedChunks.pop();
								if (nextChunk.start <= prevChunk.end) {
									var endIndex = Math.max(prevChunk.end, nextChunk.end);
									processedChunks.push({
										start: prevChunk.start,
										end: endIndex
									});
								} else processedChunks.push(prevChunk, nextChunk);
								return processedChunks;
							}
						}, []);
						return chunks;
					};
					/**
					* Examine text for any matches.
					* If we find matches, add them to the returned array as a "chunk" object ({start:number, end:number}).
					* @return {start:number, end:number}[]
					*/
					var defaultFindChunks = function defaultFindChunks(_ref3) {
						var autoEscape = _ref3.autoEscape, caseSensitive = _ref3.caseSensitive, _ref3$sanitize = _ref3.sanitize, sanitize = _ref3$sanitize === void 0 ? identity : _ref3$sanitize, searchWords = _ref3.searchWords, textToHighlight = _ref3.textToHighlight;
						textToHighlight = sanitize(textToHighlight);
						return searchWords.filter(function(searchWord) {
							return searchWord;
						}).reduce(function(chunks, searchWord) {
							searchWord = sanitize(searchWord);
							if (autoEscape) searchWord = escapeRegExpFn(searchWord);
							var regex = new RegExp(searchWord, caseSensitive ? "g" : "gi");
							var match = void 0;
							while (match = regex.exec(textToHighlight)) {
								var start = match.index;
								var end = regex.lastIndex;
								if (end > start) chunks.push({
									start,
									end
								});
								if (match.index == regex.lastIndex) regex.lastIndex++;
							}
							return chunks;
						}, []);
					};
					exports$7.findChunks = defaultFindChunks;
					/**
					* Given a set of chunks to highlight, create an additional set of chunks
					* to represent the bits of text between the highlighted text.
					* @param chunksToHighlight {start:number, end:number}[]
					* @param totalLength number
					* @return {start:number, end:number, highlight:boolean}[]
					*/
					var fillInChunks = exports$7.fillInChunks = function fillInChunks(_ref4) {
						var chunksToHighlight = _ref4.chunksToHighlight, totalLength = _ref4.totalLength;
						var allChunks = [];
						var append = function append(start, end, highlight) {
							if (end - start > 0) allChunks.push({
								start,
								end,
								highlight
							});
						};
						if (chunksToHighlight.length === 0) append(0, totalLength, false);
						else {
							var lastIndex = 0;
							chunksToHighlight.forEach(function(chunk) {
								append(lastIndex, chunk.start, false);
								append(chunk.start, chunk.end, true);
								lastIndex = chunk.end;
							});
							append(lastIndex, totalLength, false);
						}
						return allChunks;
					};
					function identity(value) {
						return value;
					}
					function escapeRegExpFn(str) {
						return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
					}
				})
			]);
		}),
		(function(module$10, exports$8) {
			module$10.exports = require_react();
		}),
		(function(module$11, exports$9) {
			"use strict";
			var simpleIsEqual = function simpleIsEqual(a, b) {
				return a === b;
			};
			function index(resultFn) {
				var isEqual = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : simpleIsEqual;
				var lastThis = void 0;
				var lastArgs = [];
				var lastResult = void 0;
				var calledOnce = false;
				var isNewArgEqualToLast = function isNewArgEqualToLast(newArg, index) {
					return isEqual(newArg, lastArgs[index]);
				};
				return function result() {
					for (var _len = arguments.length, newArgs = Array(_len), _key = 0; _key < _len; _key++) newArgs[_key] = arguments[_key];
					if (calledOnce && lastThis === this && newArgs.length === lastArgs.length && newArgs.every(isNewArgEqualToLast)) return lastResult;
					calledOnce = true;
					lastThis = this;
					lastArgs = newArgs;
					lastResult = resultFn.apply(this, newArgs);
					return lastResult;
				};
			}
			module$11.exports = index;
		})
	]);
})))(), 1);
/**
* Renders text matching the active settings search terminology with a highlight wrapper.
* Will render text minimally without highlights if empty or no text provided.
*/
var SettingsSearchHighlight = ({ text, children, className, highlightClassName }) => {
	const searchWords = useSettingsState("searchWords");
	const content = text ?? children ?? "";
	if (!content) return null;
	if (!searchWords || !searchWords.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className,
		children: content
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_main.default, {
		className,
		searchWords,
		textToHighlight: content,
		highlightClassName: highlightClassName ?? "bg-warning/40 rounded-sm px-0.5",
		autoEscape: true
	});
};
//#endregion
//#region src/renderer/mainWindow/components/LynxSwitch.tsx
var { Description: Description$2, Surface, Switch: Switch$3 } = await importShared("@heroui/react");
var { useCallback: useCallback$4, useEffect: useEffect$7, useState: useState$6 } = await importShared("react");
/**
* Customizable switch component with title, description, and search highlighting.
* Supports both controlled and uncontrolled modes.
*/
function LynxSwitch({ enabled = false, onEnabledChange, title, description, isDisabled, className, size = "md", thumbIcon, icon, variant = "default" }) {
	const [isSelected, setIsSelected] = useState$6(enabled);
	useEffect$7(() => {
		setIsSelected(enabled);
	}, [enabled]);
	const onChange = useCallback$4((selected) => {
		setIsSelected(selected);
		onEnabledChange?.(selected);
	}, [onEnabledChange]);
	const toggle = () => {
		setIsSelected(!isSelected);
		onEnabledChange?.(!isSelected);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Surface, {
		className: `px-3 py-2 rounded-2xl transition-colors duration-300 ${isDisabled ? "" : "cursor-pointer"} border-2 ${isSelected ? "border-accent/40" : "border-surface"} w-full shadow-surface`,
		variant,
		onClick: isDisabled ? void 0 : toggle,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$3, {
			size,
			onChange,
			isDisabled,
			isSelected,
			className: ["", className].join(" "),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Switch$3.Content, {
				className: "flex flex-row items-center justify-between w-full gap-x-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-row items-center gap-x-2",
					children: [icon, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm cursor-pointer",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsSearchHighlight, { text: title })
					})]
				}), description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description$2, {
					className: "pointer-events-none p-0",
					children: typeof description === "string" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsSearchHighlight, {
						text: description,
						className: "text-xs text-muted"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted",
						children: description
					})
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$3.Control, { children: thumbIcon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$3.Thumb, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$3.Icon, { children: thumbIcon }) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$3.Thumb, {}) })]
			})
		})
	});
}
var package_default = {
	name: "lynxhub",
	productName: "LynxHub",
	desktopName: "ai.kindabrazy.lynxhub.desktop",
	version: "3.5.5",
	type: "module",
	description: "Cross-platform, extensible terminal/browser for AI management",
	main: "./out/main/index.cjs",
	author: {
		"name": "KindaBrazy",
		"email": "kindofbrazy@gmail.com"
	},
	repository: {
		"type": "git",
		"url": "https://github.com/KindaBrazy/LynxHub"
	},
	license: "AGPL-3.0",
	homepage: "https://github.com/KindaBrazy/LynxHub",
	appDetails: {
		"title": "LynxHub",
		"buildNumber": 52,
		"detailedDescription": "Open-source, cross-platform terminal and browser, designed for managing AI. Highly modular and extensible, it's the all-in-one environment for AI power users.",
		"moduleApiVersion": "2.1.0",
		"extensionApiVersion": "2.0.0"
	},
	scripts: {
		"typecheck:node": "tsc --noEmit -p tsconfig.node.json --composite false",
		"typecheck:web": "tsc --noEmit -p tsconfig.web.json --composite false",
		"typecheck": "npm run typecheck:node && npm run typecheck:web",
		"fix-linter:web": "prettier --write src/renderer --list-different && eslint --fix src/renderer",
		"fix-linter:node": "prettier --write src/main --list-different && eslint --fix src/main",
		"fix-linter": "prettier --write src --list-different && eslint --fix src",
		"fix-linter-ext": "prettier --write extension --list-different && eslint --fix extension",
		"validate:web": "npm run fix-linter:web && npm run typecheck:web",
		"validate:node": "npm run fix-linter:node && npm run typecheck:node",
		"validate:ext": "npm run fix-linter-ext && npm run typecheck",
		"validate": "npm run fix-linter && npm run typecheck",
		"preview": "electron-vite preview --noSandbox",
		"preview:skip": "electron-vite preview --noSandbox --skipBuild",
		"dev": "run-script-os",
		"dev:win32": "electron-vite dev",
		"dev:default": "electron-vite dev --noSandbox",
		"prof": "electron-vite dev -w --noSandbox -- --js-flags=\"--prof\"",
		"dev:srouce": "electron-vite dev -w --noSandbox --sourcemap",
		"postinstall": "node node_modules/electron/install.js && electron-builder install-app-deps",
		"build": "electron-vite build",
		"rebuild": "electron-builder node-gyp-rebuild",
		"removeDotExtension": "node fixExtension.js",
		"build:extension": "rimraf extension_out && electron-vite build --config extension/electron.vite.config.ts && npm run removeDotExtension",
		"build:module": "rimraf module_out && npx --prefix module rolldown --config module/rolldown.config.mjs",
		"build:unpack": "npm run build && electron-builder --dir --config electron-builder_x64.config.cjs",
		"build:win_x64": "npm run build && electron-builder --win --config electron-builder_x64.config.cjs --publish never",
		"build:win_arm": "npm run build && electron-builder --win --config electron-builder_arm.config.cjs --publish never",
		"build:win_portable_x64": "npm run build && electron-builder --win --config electron-builder-portable_x64.config.cjs --publish never",
		"build:win_portable_arm": "npm run build && electron-builder --win --config electron-builder-portable_arm.config.cjs --publish never",
		"build:linux_x64": "npm run build && electron-builder --linux --config electron-builder_x64.config.cjs --publish never",
		"build:linux_arm": "npm run build && electron-builder --linux --config electron-builder_arm.config.cjs --publish never",
		"build:linux_portable_x64": "npm run build && electron-builder --linux --config electron-builder-portable_x64.config.cjs --publish never",
		"build:linux_portable_arm": "npm run build && electron-builder --linux --config electron-builder-portable_arm.config.cjs --publish never",
		"build:mac_x64": "npm run build && electron-builder --mac --config electron-builder_x64.config.cjs --publish never",
		"build:mac_arm": "npm run build && electron-builder --mac --config electron-builder_arm.config.cjs --publish never",
		"build:linux-test": "npm run build && electron-builder --linux --config electron-builder-test.config.cjs --publish never",
		"release": "electron-builder",
		"publish": "electron-builder -p always --config electron-builder_x64.config.cjs"
	},
	dependencies: {
		"@electron-toolkit/preload": "^3.0.2",
		"@electron-toolkit/utils": "^4.0.0",
		"@originjs/vite-plugin-federation": "^1.4.1",
		"@sentry/electron": "^7.14.0",
		"@sentry/react": "^10.60.0",
		"axios": "^1.18.1",
		"fix-path": "^5.0.0",
		"graceful-fs": "^4.2.11",
		"lowdb": "^7.0.1",
		"node-pty": "^1.2.0-beta.13",
		"prism-react-renderer": "^2.4.1",
		"react-syntax-highlighter": "^16.1.1",
		"semver": "^7.8.5",
		"tree-kill": "^1.2.2",
		"zustand": "^5.0.14"
	},
	devDependencies: {
		"@electron-toolkit/eslint-config-prettier": "^3.0.0",
		"@electron-toolkit/tsconfig": "^2.0.0",
		"@eslint/js": "^10.0.1",
		"@heroui/react": "^3.2.1",
		"@heroui/styles": "^3.2.1",
		"@icons-pack/react-simple-icons": "^13.13.0",
		"@number-flow/react": "^0.6.0",
		"@reduxjs/toolkit": "^2.12.0",
		"@sentry/vite-plugin": "^5.3.0",
		"@solar-icons/react-perf": "^2.1.1",
		"@tailwindcss/typography": "^0.5.20",
		"@tailwindcss/vite": "^4.3.1",
		"@types/decompress": "^4.2.7",
		"@types/fontfaceobserver": "^2.1.3",
		"@types/graceful-fs": "^4.1.9",
		"@types/lodash-es": "^4.17.12",
		"@types/node": "^24.13.2",
		"@types/react": "^19.2.17",
		"@types/react-dom": "^19.2.3",
		"@types/react-highlight-words": "^0.20.1",
		"@types/react-syntax-highlighter": "^15.5.13",
		"@types/semver": "^7.7.1",
		"@types/serve-handler": "^6.1.4",
		"@vitejs/plugin-react": "^6.0.3",
		"@xterm/addon-canvas": "^0.7.0",
		"@xterm/addon-clipboard": "^0.2.0",
		"@xterm/addon-fit": "^0.11.0",
		"@xterm/addon-ligatures": "^0.10.0",
		"@xterm/addon-progress": "^0.2.0",
		"@xterm/addon-search": "^0.16.0",
		"@xterm/addon-serialize": "^0.14.0",
		"@xterm/addon-unicode11": "^0.9.0",
		"@xterm/addon-web-links": "^0.12.0",
		"@xterm/addon-webgl": "^0.19.0",
		"@xterm/xterm": "^6.0.0",
		"chokidar": "^5.0.0",
		"decompress": "^4.2.1",
		"electron": "^42.5.0",
		"electron-builder": "^26.15.3",
		"electron-dl": "^4.0.0",
		"electron-log": "^5.4.4",
		"electron-updater": "^6.8.9",
		"electron-vite": "^6.0.0-beta.1",
		"eslint": "^10.5.0",
		"eslint-plugin-jsx-a11y": "^6.10.2",
		"eslint-plugin-perfectionist": "^5.9.1",
		"eslint-plugin-react": "^7.37.5",
		"eslint-plugin-react-hooks": "^7.1.1",
		"eslint-plugin-simple-import-sort": "^13.0.0",
		"fontfaceobserver": "^2.3.0",
		"framer-motion": "^12.41.0",
		"globals": "^17.7.0",
		"lodash-es": "^4.18.1",
		"lucide-react": "^1.21.0",
		"normalize-url": "^9.0.1",
		"ogl": "^1.0.11",
		"prettier": "^3.8.4",
		"react": "^19.2.7",
		"react-dom": "^19.2.7",
		"react-error-boundary": "^6.1.2",
		"react-highlight-words": "^0.21.0",
		"react-intersection-observer": "^10.0.3",
		"react-markdown": "^10.1.0",
		"react-redux": "^9.3.0",
		"rehype-highlight": "^7.0.2",
		"rehype-raw": "^7.0.0",
		"rehype-slug": "^6.0.0",
		"remark-gfm": "^4.0.1",
		"run-script-os": "^1.1.6",
		"simple-git": "^3.36.0",
		"tailwindcss": "^4.3.1",
		"three": "^0.184.0",
		"typescript": "^6.0.3",
		"typescript-eslint": "^8.62.0",
		"vite": "^8.1.0"
	},
	allowScripts: {
		"electron": true,
		"esbuild": true,
		"node-pty": true,
		"@sentry/cli": true
	}
};
//#endregion
//#region src/common/consts/index.ts
/** Application name from package.json */
var APP_NAME = package_default.appDetails.title;
/** Application version from package.json */
var APP_VERSION = package_default.version;
package_default.appDetails.buildNumber;
package_default.description;
package_default.author.name;
package_default.appDetails.detailedDescription;
`${package_default.homepage}`;
package_default.author.email;
`${package_default.repository.url}`;
`${package_default.repository.url}`;
package_default.license;
package_default.appDetails.moduleApiVersion;
package_default.appDetails.extensionApiVersion;
/** Application version with 'V' prefix */
var APP_VERSION_V = `V${APP_VERSION}`;
`${APP_NAME}${APP_VERSION}`;
`${APP_NAME}${APP_VERSION_V}`;
APP_VERSION_V.split("-").map((v) => capitalize(v)).join(" ");
/**
* Page IDs used for navigation.
*/
var PageID = {
	home: "home_page",
	imageGen: "imageGen_page",
	textGen: "textGen_page",
	audioGen: "audioGen_page",
	tools: "tools_page",
	games: "games_page",
	others: "others_page",
	agents: "agents_page",
	dashboard: "dashboard_page",
	plugins: "plugins_page",
	settings: "settings_page"
};
PageID.home, PageID.imageGen, PageID.textGen, PageID.audioGen, PageID.tools, PageID.games, PageID.others, PageID.agents, PageID.dashboard, PageID.plugins, PageID.settings;
//#endregion
//#region src/renderer/mainWindow/utils/constants.tsx
/**
* Default tab descriptor used when creating or resetting tabs.
*/
var defaultTabItem = {
	id: "tab",
	title: "Home",
	isLoading: false,
	isTerminal: false,
	pageID: PageID.home,
	favIcon: {
		show: false,
		url: ""
	}
};
//#endregion
//#region src/renderer/mainWindow/redux/reducers/tabs.ts
var { useSelector } = await importShared("react-redux");
var findUniqueTabId = (baseId, tabs) => {
	let idNumber = 1;
	let candidateId = baseId;
	while (tabs.some((tab) => tab.id === candidateId)) {
		candidateId = `${baseId}_${idNumber}`;
		idNumber += 1;
	}
	return candidateId;
};
var updateTabById = (tabs, tabID, updater) => tabs.map((tab) => tab.id === tabID ? updater(tab) : tab);
var tabsSlice = createSlice({
	name: "tabs",
	initialState: {
		tabs: [defaultTabItem],
		activeTab: defaultTabItem.id,
		activePage: defaultTabItem.pageID,
		prevTab: ""
	},
	reducers: {
		setTabState: (state, action) => {
			state[action.payload.key] = action.payload.value;
		},
		addTab: (state, action) => {
			const { background, ...nextTabPayload } = action.payload;
			const newID = findUniqueTabId(nextTabPayload.id, state.tabs);
			state.tabs.push({
				...nextTabPayload,
				id: newID
			});
			if (!background) {
				state.activeTab = newID;
				state.activePage = nextTabPayload.pageID;
			}
		},
		removeTab: (state, action) => {
			const tabIdToRemove = action.payload;
			const tabIndexToRemove = state.tabs.findIndex((tab) => tab.id === tabIdToRemove);
			state.tabs = state.tabs.filter((tab) => tab.id !== tabIdToRemove);
			if (state.activeTab === tabIdToRemove) if (state.tabs.length > 0) {
				const newActiveTabIndex = Math.min(tabIndexToRemove, state.tabs.length - 1);
				state.activeTab = state.tabs[newActiveTabIndex].id;
				state.activePage = state.tabs[newActiveTabIndex].pageID;
			} else {
				state.activeTab = defaultTabItem.id;
				state.activePage = defaultTabItem.pageID;
			}
			if (state.tabs.length <= 0) state.tabs = [defaultTabItem];
		},
		setActiveTab: (state, action) => {
			state.prevTab = state.activeTab;
			state.activeTab = action.payload;
			state.activePage = state.tabs.find((tab) => tab.id === action.payload)?.pageID || defaultTabItem.pageID;
		},
		switchTab: (state, action) => {
			if (state.tabs.length <= 1) return;
			const currentIndex = state.tabs.findIndex((tab) => tab.id === state.activeTab);
			if (currentIndex === -1) return;
			const direction = action.payload?.direction || "next";
			let nextIndex;
			if (direction === "next") nextIndex = (currentIndex + 1) % state.tabs.length;
			else nextIndex = (currentIndex - 1 + state.tabs.length) % state.tabs.length;
			state.prevTab = state.activeTab;
			state.activeTab = state.tabs[nextIndex].id;
			state.activePage = state.tabs[nextIndex].pageID;
		},
		setTabLoading: (state, action) => {
			const { tabID, isLoading } = action.payload;
			state.tabs = updateTabById(state.tabs, tabID, (tab) => ({
				...tab,
				isLoading
			}));
		},
		setActiveTabLoading: (state, action) => {
			state.tabs = updateTabById(state.tabs, state.activeTab, (tab) => ({
				...tab,
				isLoading: action.payload
			}));
		},
		setTabTitle: (state, action) => {
			const { tabID, title } = action.payload;
			state.tabs = updateTabById(state.tabs, tabID, (tab) => ({
				...tab,
				title
			}));
		},
		setTabIsTerminal: (state, action) => {
			const { tabID, isTerminal } = action.payload;
			state.tabs = updateTabById(state.tabs, tabID, (tab) => ({
				...tab,
				isTerminal
			}));
		},
		setActiveTabTitle: (state, action) => {
			state.tabs = updateTabById(state.tabs, state.activeTab, (tab) => ({
				...tab,
				title: action.payload
			}));
		},
		setTabFavIcon: (state, action) => {
			const { tabID, ...favIcon } = action.payload;
			state.tabs = updateTabById(state.tabs, tabID, (tab) => ({
				...tab,
				favIcon
			}));
		},
		setTabProgress: (state, action) => {
			const { tabID, progress } = action.payload;
			state.tabs = updateTabById(state.tabs, tabID, (tab) => ({
				...tab,
				progress
			}));
		},
		setActivePage: (state, action) => {
			const index = state.tabs.findIndex((tab) => tab.id === state.activeTab);
			if (index !== -1) {
				const { pageID, title, isTerminal } = action.payload;
				state.tabs[index] = {
					...state.tabs[index],
					pageID,
					title,
					isTerminal: isTerminal ?? false,
					favIcon: {
						show: false,
						url: ""
					}
				};
			}
			state.activePage = action.payload.pageID;
		}
	}
});
/**
* Hook to access tabs reducer state by key with inferred return type.
*/
var useTabsState = (key) => useSelector((state) => state.tabs[key]);
tabsSlice.actions;
tabsSlice.reducer;
//#endregion
//#region src/renderer/mainWindow/components/TabModal.tsx
var { Modal: Modal$1 } = await importShared("@heroui/react");
var { useEffect: useEffect$6, useState: useState$5 } = await importShared("react");
var { UNSAFE_PortalProvider } = await importShared("react-aria");
function TabModal({ isOpen, onOpenChange, children, size = "cover", isDismissable = false, backdropVariant, dialogClassName, containerClassName, isKeyboardDismissDisabled }) {
	const activeTab = useTabsState("activeTab");
	const [targetContainer, setTargetContainer] = useState$5(null);
	useEffect$6(() => {
		setTargetContainer(isOpen ? document.getElementById(`${activeTab}_wrapper`) : null);
	}, [isOpen]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal$1, {
		isOpen,
		onOpenChange,
		children: targetContainer && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UNSAFE_PortalProvider, {
			getContainer: () => targetContainer,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal$1.Backdrop, {
				className: "h-full",
				variant: backdropVariant,
				isDismissable,
				isKeyboardDismissDisabled,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal$1.Container, {
					size,
					scroll: "inside",
					className: `h-full max-h-full ${containerClassName}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal$1.Dialog, {
						className: size === "cover" ? `h-full max-h-full ${dialogClassName}` : dialogClassName,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UNSAFE_PortalProvider, {
							getContainer: () => document.body,
							children
						})
					})
				})
			})
		})
	});
}
//#endregion
//#region src/common/consts/ipcChannels/storage.ts
/**
* IPC channels for storage operations.
* Handles data persistence, custom settings, and nested updates.
*/
var storageChannels = {
	get: "storage:getData",
	getCustom: "storage:get-custom",
	setCustom: "storage:set-custom",
	getAll: "storage:getAllData",
	update: "storage:updateData",
	updateNested: "storage:updateNested",
	clear: "storage:clearStorage"
};
//#endregion
//#region src/renderer/shared/ipc/ipcEvents.ts
var listeners = {
	before: /* @__PURE__ */ new Set(),
	after: /* @__PURE__ */ new Set()
};
var channelListeners = {
	before: /* @__PURE__ */ new Map(),
	after: /* @__PURE__ */ new Map()
};
var getListenersForEvent = (event) => {
	const base = [...listeners[event.phase]];
	const perChannel = channelListeners[event.phase].get(event.channel);
	if (perChannel) base.push(...perChannel);
	return base;
};
var logHookError = (error) => {
	console.error("Extension renderer IPC hook failed:", error);
};
var runListenerSync = (listener, event) => {
	try {
		const result = listener(event);
		if (result && typeof result.then === "function") result.catch(logHookError);
	} catch (error) {
		logHookError(error);
	}
};
var runListener = async (listener, event) => {
	try {
		await listener(event);
	} catch (error) {
		logHookError(error);
	}
};
var emitRendererIpcEventSync = (event) => {
	for (const listener of getListenersForEvent(event)) runListenerSync(listener, event);
};
var emitRendererIpcEvent = async (event) => {
	for (const listener of getListenersForEvent(event)) await runListener(listener, event);
};
//#endregion
//#region src/renderer/shared/ipc/lynxIpc.ts
var ipc = window.electron.ipcRenderer;
var send = (channel, ...args) => {
	const eventStart = Date.now();
	const beforeEvent = {
		phase: "before",
		method: "send",
		channel,
		args: [...args],
		timestamp: eventStart
	};
	emitRendererIpcEventSync(beforeEvent);
	try {
		ipc.send(channel, ...args);
		emitRendererIpcEventSync({
			...beforeEvent,
			phase: "after",
			status: "success",
			durationMs: Date.now() - eventStart
		});
	} catch (error) {
		emitRendererIpcEventSync({
			...beforeEvent,
			phase: "after",
			status: "error",
			durationMs: Date.now() - eventStart,
			error
		});
		throw error;
	}
};
var sendSync = (channel, ...args) => {
	const eventStart = Date.now();
	const beforeEvent = {
		phase: "before",
		method: "sendSync",
		channel,
		args: [...args],
		timestamp: eventStart
	};
	emitRendererIpcEventSync(beforeEvent);
	try {
		const result = ipc.sendSync(channel, ...args);
		emitRendererIpcEventSync({
			...beforeEvent,
			phase: "after",
			status: "success",
			durationMs: Date.now() - eventStart,
			result
		});
		return result;
	} catch (error) {
		emitRendererIpcEventSync({
			...beforeEvent,
			phase: "after",
			status: "error",
			durationMs: Date.now() - eventStart,
			error
		});
		throw error;
	}
};
var invoke = async (channel, ...args) => {
	const eventStart = Date.now();
	const beforeEvent = {
		phase: "before",
		method: "invoke",
		channel,
		args: [...args],
		timestamp: eventStart
	};
	await emitRendererIpcEvent(beforeEvent);
	try {
		const result = await ipc.invoke(channel, ...args);
		await emitRendererIpcEvent({
			...beforeEvent,
			phase: "after",
			status: "success",
			durationMs: Date.now() - eventStart,
			result
		});
		return result;
	} catch (error) {
		await emitRendererIpcEvent({
			...beforeEvent,
			phase: "after",
			status: "error",
			durationMs: Date.now() - eventStart,
			error
		});
		throw error;
	}
};
var on = (channel, callback) => ipc.on(channel, (_, ...args) => {
	const typedArgs = args;
	const eventStart = Date.now();
	const beforeEvent = {
		phase: "before",
		method: "on",
		channel,
		args: [...typedArgs],
		timestamp: eventStart
	};
	emitRendererIpcEventSync(beforeEvent);
	try {
		const result = callback(...typedArgs);
		emitRendererIpcEventSync({
			...beforeEvent,
			phase: "after",
			status: "success",
			durationMs: Date.now() - eventStart,
			result
		});
	} catch (error) {
		emitRendererIpcEventSync({
			...beforeEvent,
			phase: "after",
			status: "error",
			durationMs: Date.now() - eventStart,
			error
		});
		throw error;
	}
});
var once = (channel, callback) => ipc.once(channel, (_, ...args) => {
	const typedArgs = args;
	const eventStart = Date.now();
	const beforeEvent = {
		phase: "before",
		method: "once",
		channel,
		args: [...typedArgs],
		timestamp: eventStart
	};
	emitRendererIpcEventSync(beforeEvent);
	try {
		const result = callback(...typedArgs);
		emitRendererIpcEventSync({
			...beforeEvent,
			phase: "after",
			status: "success",
			durationMs: Date.now() - eventStart,
			result
		});
	} catch (error) {
		emitRendererIpcEventSync({
			...beforeEvent,
			phase: "after",
			status: "error",
			durationMs: Date.now() - eventStart,
			error
		});
		throw error;
	}
});
var lynxIpc = {
	send,
	sendSync,
	on,
	once,
	invoke
};
//#endregion
//#region src/renderer/shared/ipc/storage.ts
var storageIpc = {
	getCustom: (key) => lynxIpc.invoke(storageChannels.getCustom, key),
	setCustom: (key, data) => lynxIpc.send(storageChannels.setCustom, key, data),
	get: (key) => lynxIpc.invoke(storageChannels.get, key),
	getAll: () => lynxIpc.invoke(storageChannels.getAll),
	update: (key, updateData) => lynxIpc.invoke(storageChannels.update, key, updateData),
	clear: () => lynxIpc.invoke(storageChannels.clear)
};
//#endregion
//#region node_modules/framer-motion/dist/es/context/LayoutGroupContext.mjs
var { createContext: createContext$6 } = await importShared("react");
var LayoutGroupContext = createContext$6({});
//#endregion
//#region node_modules/framer-motion/dist/es/utils/use-constant.mjs
var { useRef: useRef$7 } = await importShared("react");
/**
* Creates a constant value over the lifecycle of a component.
*
* Even if `useMemo` is provided an empty array as its final argument, it doesn't offer
* a guarantee that it won't re-run for performance reasons later on. By using `useConstant`
* you can ensure that initialisers don't execute twice or more.
*/
function useConstant(init) {
	const ref = useRef$7(null);
	if (ref.current === null) ref.current = init();
	return ref.current;
}
//#endregion
//#region node_modules/framer-motion/dist/es/utils/is-browser.mjs
var isBrowser$1 = typeof window !== "undefined";
//#endregion
//#region node_modules/framer-motion/dist/es/utils/use-isomorphic-effect.mjs
var { useLayoutEffect, useEffect: useEffect$5 } = await importShared("react");
var useIsomorphicLayoutEffect = isBrowser$1 ? useLayoutEffect : useEffect$5;
//#endregion
//#region node_modules/framer-motion/dist/es/context/PresenceContext.mjs
var { createContext: createContext$5 } = await importShared("react");
/**
* @public
*/
var PresenceContext = /* @__PURE__ */ createContext$5(null);
//#endregion
//#region node_modules/motion-utils/dist/es/array.mjs
function addUniqueItem(arr, item) {
	if (arr.indexOf(item) === -1) arr.push(item);
}
function removeItem(arr, item) {
	const index = arr.indexOf(item);
	if (index > -1) arr.splice(index, 1);
}
function moveItem([ ...arr], fromIndex, toIndex) {
	const startIndex = fromIndex < 0 ? arr.length + fromIndex : fromIndex;
	if (startIndex >= 0 && startIndex < arr.length) {
		const endIndex = toIndex < 0 ? arr.length + toIndex : toIndex;
		const [item] = arr.splice(fromIndex, 1);
		arr.splice(endIndex, 0, item);
	}
	return arr;
}
//#endregion
//#region node_modules/motion-utils/dist/es/clamp.mjs
var clamp = (min, max, v) => {
	if (v > max) return max;
	if (v < min) return min;
	return v;
};
//#endregion
//#region node_modules/motion-utils/dist/es/global-config.mjs
var MotionGlobalConfig = {};
//#endregion
//#region node_modules/motion-utils/dist/es/is-numerical-string.mjs
/**
* Check if value is a numerical string, ie a string that is purely a number eg "100" or "-100.1"
*/
var isNumericalString = (v) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(v);
//#endregion
//#region node_modules/motion-utils/dist/es/is-object.mjs
var isObject = (value) => typeof value === "object" && value !== null;
//#endregion
//#region node_modules/motion-utils/dist/es/is-zero-value-string.mjs
/**
* Check if the value is a zero value string like "0px" or "0%"
*/
var isZeroValueString = (v) => /^0[^.\s]+$/u.test(v);
//#endregion
//#region node_modules/motion-utils/dist/es/memo.mjs
/*#__NO_SIDE_EFFECTS__*/
function memo$1(callback) {
	let result;
	return () => {
		if (result === void 0) result = callback();
		return result;
	};
}
//#endregion
//#region node_modules/motion-utils/dist/es/noop.mjs
var noop = /* @__NO_SIDE_EFFECTS__ */ (any) => any;
//#endregion
//#region node_modules/motion-utils/dist/es/pipe.mjs
/**
* Pipe
* Compose other transformers to run linearily
* pipe(min(20), max(40))
* @param  {...functions} transformers
* @return {function}
*/
var pipe = (...transformers) => transformers.reduce((a, b) => (v) => b(a(v)));
//#endregion
//#region node_modules/motion-utils/dist/es/progress.mjs
var progress = /* @__NO_SIDE_EFFECTS__ */ (from, to, value) => {
	const range = to - from;
	return range ? (value - from) / range : 1;
};
//#endregion
//#region node_modules/motion-utils/dist/es/subscription-manager.mjs
var SubscriptionManager = class {
	constructor() {
		this.subscriptions = [];
	}
	add(handler) {
		addUniqueItem(this.subscriptions, handler);
		return () => removeItem(this.subscriptions, handler);
	}
	notify(a, b, c) {
		const numSubscriptions = this.subscriptions.length;
		if (!numSubscriptions) return;
		if (numSubscriptions === 1)
 /**
		* If there's only a single handler we can just call it without invoking a loop.
		*/
		this.subscriptions[0](a, b, c);
		else for (let i = 0; i < numSubscriptions; i++) {
			/**
			* Check whether the handler exists before firing as it's possible
			* the subscriptions were modified during this loop running.
			*/
			const handler = this.subscriptions[i];
			handler && handler(a, b, c);
		}
	}
	getSize() {
		return this.subscriptions.length;
	}
	clear() {
		this.subscriptions.length = 0;
	}
};
//#endregion
//#region node_modules/motion-utils/dist/es/time-conversion.mjs
/**
* Converts seconds to milliseconds
*
* @param seconds - Time in seconds.
* @return milliseconds - Converted time in milliseconds.
*/
var secondsToMilliseconds = /* @__NO_SIDE_EFFECTS__ */ (seconds) => seconds * 1e3;
var millisecondsToSeconds = /* @__NO_SIDE_EFFECTS__ */ (milliseconds) => milliseconds / 1e3;
//#endregion
//#region node_modules/motion-utils/dist/es/velocity-per-second.mjs
var velocityPerSecond = /* @__NO_SIDE_EFFECTS__ */ (velocity, frameDuration) => frameDuration ? velocity * (1e3 / frameDuration) : 0;
//#endregion
//#region node_modules/motion-utils/dist/es/easing/cubic-bezier.mjs
var calcBezier = (t, a1, a2) => (((1 - 3 * a2 + 3 * a1) * t + (3 * a2 - 6 * a1)) * t + 3 * a1) * t;
var subdivisionPrecision = 1e-7;
var subdivisionMaxIterations = 12;
function binarySubdivide(x, lowerBound, upperBound, mX1, mX2) {
	let currentX;
	let currentT;
	let i = 0;
	do {
		currentT = lowerBound + (upperBound - lowerBound) / 2;
		currentX = calcBezier(currentT, mX1, mX2) - x;
		if (currentX > 0) upperBound = currentT;
		else lowerBound = currentT;
	} while (Math.abs(currentX) > subdivisionPrecision && ++i < subdivisionMaxIterations);
	return currentT;
}
/*#__NO_SIDE_EFFECTS__*/
function cubicBezier(mX1, mY1, mX2, mY2) {
	if (mX1 === mY1 && mX2 === mY2) return noop;
	const getTForX = (aX) => binarySubdivide(aX, 0, 1, mX1, mX2);
	return (t) => t === 0 || t === 1 ? t : calcBezier(getTForX(t), mY1, mY2);
}
//#endregion
//#region node_modules/motion-utils/dist/es/easing/modifiers/mirror.mjs
var mirrorEasing = /* @__NO_SIDE_EFFECTS__ */ (easing) => (p) => p <= .5 ? easing(2 * p) / 2 : (2 - easing(2 * (1 - p))) / 2;
//#endregion
//#region node_modules/motion-utils/dist/es/easing/modifiers/reverse.mjs
var reverseEasing = /* @__NO_SIDE_EFFECTS__ */ (easing) => (p) => 1 - easing(1 - p);
//#endregion
//#region node_modules/motion-utils/dist/es/easing/back.mjs
var backOut = /*@__PURE__*/ cubicBezier(.33, 1.53, .69, .99);
var backIn = /*@__PURE__*/ reverseEasing(backOut);
var backInOut = /*@__PURE__*/ mirrorEasing(backIn);
//#endregion
//#region node_modules/motion-utils/dist/es/easing/anticipate.mjs
var anticipate = (p) => p >= 1 ? 1 : (p *= 2) < 1 ? .5 * backIn(p) : .5 * (2 - Math.pow(2, -10 * (p - 1)));
//#endregion
//#region node_modules/motion-utils/dist/es/easing/circ.mjs
var circIn = (p) => 1 - Math.sin(Math.acos(p));
var circOut = /* @__PURE__ */ reverseEasing(circIn);
var circInOut = /* @__PURE__ */ mirrorEasing(circIn);
//#endregion
//#region node_modules/motion-utils/dist/es/easing/ease.mjs
var easeIn = /*@__PURE__*/ cubicBezier(.42, 0, 1, 1);
var easeOut = /*@__PURE__*/ cubicBezier(0, 0, .58, 1);
var easeInOut = /*@__PURE__*/ cubicBezier(.42, 0, .58, 1);
//#endregion
//#region node_modules/motion-utils/dist/es/easing/utils/is-bezier-definition.mjs
var isBezierDefinition = /* @__NO_SIDE_EFFECTS__ */ (easing) => Array.isArray(easing) && typeof easing[0] === "number";
//#endregion
//#region node_modules/motion-utils/dist/es/easing/utils/is-easing-array.mjs
var isEasingArray = /* @__NO_SIDE_EFFECTS__ */ (ease) => {
	return Array.isArray(ease) && typeof ease[0] !== "number";
};
//#endregion
//#region node_modules/motion-utils/dist/es/easing/utils/map.mjs
var easingLookup = {
	linear: noop,
	easeIn,
	easeInOut,
	easeOut,
	circIn,
	circInOut,
	circOut,
	backIn,
	backInOut,
	backOut,
	anticipate
};
var isValidEasing = (easing) => {
	return typeof easing === "string";
};
var easingDefinitionToFunction = (definition) => {
	if (/* @__PURE__ */ isBezierDefinition(definition)) {
		definition.length;
		const [x1, y1, x2, y2] = definition;
		return /* @__PURE__ */ cubicBezier(x1, y1, x2, y2);
	} else if (isValidEasing(definition)) {
		easingLookup[definition], `${definition}`;
		return easingLookup[definition];
	}
	return definition;
};
//#endregion
//#region node_modules/motion-dom/dist/es/frameloop/order.mjs
var stepsOrder = [
	"setup",
	"read",
	"resolveKeyframes",
	"preUpdate",
	"update",
	"preRender",
	"render",
	"postRender"
];
//#endregion
//#region node_modules/motion-dom/dist/es/frameloop/render-step.mjs
function createRenderStep(runNextFrame) {
	/**
	* We create and reuse two queues, one to queue jobs for the current frame
	* and one for the next. We reuse to avoid triggering GC after x frames.
	*/
	let thisFrame = /* @__PURE__ */ new Set();
	let nextFrame = /* @__PURE__ */ new Set();
	/**
	* Track whether we're currently processing jobs in this step. This way
	* we can decide whether to schedule new jobs for this frame or next.
	*/
	let isProcessing = false;
	let flushNextFrame = false;
	/**
	* A set of processes which were marked keepAlive when scheduled.
	*/
	const toKeepAlive = /* @__PURE__ */ new WeakSet();
	let latestFrameData = {
		delta: 0,
		timestamp: 0,
		isProcessing: false
	};
	function triggerCallback(callback) {
		if (toKeepAlive.has(callback)) {
			step.schedule(callback);
			runNextFrame();
		}
		callback(latestFrameData);
	}
	const step = {
		/**
		* Schedule a process to run on the next frame.
		*/
		schedule: (callback, keepAlive = false, immediate = false) => {
			const queue = immediate && isProcessing ? thisFrame : nextFrame;
			if (keepAlive) toKeepAlive.add(callback);
			queue.add(callback);
			return callback;
		},
		/**
		* Cancel the provided callback from running on the next frame.
		*/
		cancel: (callback) => {
			nextFrame.delete(callback);
			toKeepAlive.delete(callback);
		},
		/**
		* Execute all schedule callbacks.
		*/
		process: (frameData) => {
			latestFrameData = frameData;
			/**
			* If we're already processing we've probably been triggered by a flushSync
			* inside an existing process. Instead of executing, mark flushNextFrame
			* as true and ensure we flush the following frame at the end of this one.
			*/
			if (isProcessing) {
				flushNextFrame = true;
				return;
			}
			isProcessing = true;
			const prevFrame = thisFrame;
			thisFrame = nextFrame;
			nextFrame = prevFrame;
			thisFrame.forEach(triggerCallback);
			thisFrame.clear();
			isProcessing = false;
			if (flushNextFrame) {
				flushNextFrame = false;
				step.process(frameData);
			}
		}
	};
	return step;
}
//#endregion
//#region node_modules/motion-dom/dist/es/frameloop/batcher.mjs
var maxElapsed = 40;
function createRenderBatcher(scheduleNextBatch, allowKeepAlive) {
	let runNextFrame = false;
	let useDefaultElapsed = true;
	const state = {
		delta: 0,
		timestamp: 0,
		isProcessing: false
	};
	const flagRunNextFrame = () => runNextFrame = true;
	const steps = stepsOrder.reduce((acc, key) => {
		acc[key] = createRenderStep(flagRunNextFrame);
		return acc;
	}, {});
	const { setup, read, resolveKeyframes, preUpdate, update, preRender, render, postRender } = steps;
	const processBatch = () => {
		const useManualTiming = MotionGlobalConfig.useManualTiming;
		const timestamp = useManualTiming ? state.timestamp : performance.now();
		runNextFrame = false;
		if (!useManualTiming) state.delta = useDefaultElapsed ? 1e3 / 60 : Math.max(Math.min(timestamp - state.timestamp, maxElapsed), 1);
		state.timestamp = timestamp;
		state.isProcessing = true;
		setup.process(state);
		read.process(state);
		resolveKeyframes.process(state);
		preUpdate.process(state);
		update.process(state);
		preRender.process(state);
		render.process(state);
		postRender.process(state);
		state.isProcessing = false;
		if (runNextFrame && allowKeepAlive) {
			useDefaultElapsed = false;
			scheduleNextBatch(processBatch);
		}
	};
	const wake = () => {
		runNextFrame = true;
		useDefaultElapsed = true;
		if (!state.isProcessing) scheduleNextBatch(processBatch);
	};
	const schedule = stepsOrder.reduce((acc, key) => {
		const step = steps[key];
		acc[key] = (process, keepAlive = false, immediate = false) => {
			if (!runNextFrame) wake();
			return step.schedule(process, keepAlive, immediate);
		};
		return acc;
	}, {});
	const cancel = (process) => {
		for (let i = 0; i < stepsOrder.length; i++) steps[stepsOrder[i]].cancel(process);
	};
	return {
		schedule,
		cancel,
		state,
		steps
	};
}
//#endregion
//#region node_modules/motion-dom/dist/es/frameloop/frame.mjs
var { schedule: frame, cancel: cancelFrame, state: frameData, steps: frameSteps } = /* @__PURE__ */ createRenderBatcher(typeof requestAnimationFrame !== "undefined" ? requestAnimationFrame : noop, true);
//#endregion
//#region node_modules/motion-dom/dist/es/frameloop/sync-time.mjs
var now;
function clearTime() {
	now = void 0;
}
/**
* An eventloop-synchronous alternative to performance.now().
*
* Ensures that time measurements remain consistent within a synchronous context.
* Usually calling performance.now() twice within the same synchronous context
* will return different values which isn't useful for animations when we're usually
* trying to sync animations to the same frame.
*/
var time = {
	now: () => {
		if (now === void 0) time.set(frameData.isProcessing || MotionGlobalConfig.useManualTiming ? frameData.timestamp : performance.now());
		return now;
	},
	set: (newTime) => {
		now = newTime;
		queueMicrotask(clearTime);
	}
};
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/is-css-variable.mjs
var checkStringStartsWith = (token) => (key) => typeof key === "string" && key.startsWith(token);
var isCSSVariableName = /*@__PURE__*/ checkStringStartsWith("--");
var startsAsVariableToken = /*@__PURE__*/ checkStringStartsWith("var(--");
var isCSSVariableToken = (value) => {
	if (!startsAsVariableToken(value)) return false;
	return singleCssVariableRegex.test(value.split("/*")[0].trim());
};
var singleCssVariableRegex = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
/**
* Check if a value contains a CSS variable anywhere (e.g. inside calc()).
* Unlike isCSSVariableToken which checks if the value IS a var() token,
* this checks if the value CONTAINS var() somewhere in the string.
*/
function containsCSSVariable(value) {
	if (typeof value !== "string") return false;
	return value.split("/*")[0].includes("var(--");
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/numbers/index.mjs
var number = {
	test: (v) => typeof v === "number",
	parse: parseFloat,
	transform: (v) => v
};
var alpha = {
	...number,
	transform: (v) => clamp(0, 1, v)
};
var scale = {
	...number,
	default: 1
};
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/utils/sanitize.mjs
var sanitize = (v) => Math.round(v * 1e5) / 1e5;
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/utils/float-regex.mjs
var floatRegex = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/utils/is-nullish.mjs
function isNullish(v) {
	return v == null;
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/utils/single-color-regex.mjs
var singleColorRegex = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu;
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/color/utils.mjs
/**
* Returns true if the provided string is a color, ie rgba(0,0,0,0) or #000,
* but false if a number or multiple colors
*/
var isColorString = (type, testProp) => (v) => {
	return Boolean(typeof v === "string" && singleColorRegex.test(v) && v.startsWith(type) || testProp && !isNullish(v) && Object.prototype.hasOwnProperty.call(v, testProp));
};
var splitColor = (aName, bName, cName) => (v) => {
	if (typeof v !== "string") return v;
	const [a, b, c, alpha] = v.match(floatRegex);
	return {
		[aName]: parseFloat(a),
		[bName]: parseFloat(b),
		[cName]: parseFloat(c),
		alpha: alpha !== void 0 ? parseFloat(alpha) : 1
	};
};
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/color/rgba.mjs
var clampRgbUnit = (v) => clamp(0, 255, v);
var rgbUnit = {
	...number,
	transform: (v) => Math.round(clampRgbUnit(v))
};
var rgba = {
	test: /*@__PURE__*/ isColorString("rgb", "red"),
	parse: /*@__PURE__*/ splitColor("red", "green", "blue"),
	transform: ({ red, green, blue, alpha: alpha$1 = 1 }) => "rgba(" + rgbUnit.transform(red) + ", " + rgbUnit.transform(green) + ", " + rgbUnit.transform(blue) + ", " + sanitize(alpha.transform(alpha$1)) + ")"
};
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/color/hex.mjs
function parseHex(v) {
	let r = "";
	let g = "";
	let b = "";
	let a = "";
	if (v.length > 5) {
		r = v.substring(1, 3);
		g = v.substring(3, 5);
		b = v.substring(5, 7);
		a = v.substring(7, 9);
	} else {
		r = v.substring(1, 2);
		g = v.substring(2, 3);
		b = v.substring(3, 4);
		a = v.substring(4, 5);
		r += r;
		g += g;
		b += b;
		a += a;
	}
	return {
		red: parseInt(r, 16),
		green: parseInt(g, 16),
		blue: parseInt(b, 16),
		alpha: a ? parseInt(a, 16) / 255 : 1
	};
}
var hex = {
	test: /*@__PURE__*/ isColorString("#"),
	parse: parseHex,
	transform: rgba.transform
};
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/numbers/units.mjs
var createUnitType = /* @__NO_SIDE_EFFECTS__ */ (unit) => ({
	test: (v) => typeof v === "string" && v.endsWith(unit) && v.split(" ").length === 1,
	parse: parseFloat,
	transform: (v) => `${v}${unit}`
});
var degrees = /*@__PURE__*/ createUnitType("deg");
var percent = /*@__PURE__*/ createUnitType("%");
var px = /*@__PURE__*/ createUnitType("px");
var vh = /*@__PURE__*/ createUnitType("vh");
var vw = /*@__PURE__*/ createUnitType("vw");
var progressPercentage = /*@__PURE__*/ (() => ({
	...percent,
	parse: (v) => percent.parse(v) / 100,
	transform: (v) => percent.transform(v * 100)
}))();
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/color/hsla.mjs
var hsla = {
	test: /*@__PURE__*/ isColorString("hsl", "hue"),
	parse: /*@__PURE__*/ splitColor("hue", "saturation", "lightness"),
	transform: ({ hue, saturation, lightness, alpha: alpha$1 = 1 }) => {
		return "hsla(" + Math.round(hue) + ", " + percent.transform(sanitize(saturation)) + ", " + percent.transform(sanitize(lightness)) + ", " + sanitize(alpha.transform(alpha$1)) + ")";
	}
};
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/color/index.mjs
var color = {
	test: (v) => rgba.test(v) || hex.test(v) || hsla.test(v),
	parse: (v) => {
		if (rgba.test(v)) return rgba.parse(v);
		else if (hsla.test(v)) return hsla.parse(v);
		else return hex.parse(v);
	},
	transform: (v) => {
		return typeof v === "string" ? v : v.hasOwnProperty("red") ? rgba.transform(v) : hsla.transform(v);
	},
	getAnimatableNone: (v) => {
		const parsed = color.parse(v);
		parsed.alpha = 0;
		return color.transform(parsed);
	}
};
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/utils/color-regex.mjs
var colorRegex = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/complex/index.mjs
function test(v) {
	return isNaN(v) && typeof v === "string" && (v.match(floatRegex)?.length || 0) + (v.match(colorRegex)?.length || 0) > 0;
}
var NUMBER_TOKEN = "number";
var COLOR_TOKEN = "color";
var VAR_TOKEN = "var";
var VAR_FUNCTION_TOKEN = "var(";
var SPLIT_TOKEN = "${}";
var complexRegex = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function analyseComplexValue(value) {
	const originalValue = value.toString();
	const values = [];
	const indexes = {
		color: [],
		number: [],
		var: []
	};
	const types = [];
	let i = 0;
	return {
		values,
		split: originalValue.replace(complexRegex, (parsedValue) => {
			if (color.test(parsedValue)) {
				indexes.color.push(i);
				types.push(COLOR_TOKEN);
				values.push(color.parse(parsedValue));
			} else if (parsedValue.startsWith(VAR_FUNCTION_TOKEN)) {
				indexes.var.push(i);
				types.push(VAR_TOKEN);
				values.push(parsedValue);
			} else {
				indexes.number.push(i);
				types.push(NUMBER_TOKEN);
				values.push(parseFloat(parsedValue));
			}
			++i;
			return SPLIT_TOKEN;
		}).split(SPLIT_TOKEN),
		indexes,
		types
	};
}
function parseComplexValue(v) {
	return analyseComplexValue(v).values;
}
function buildTransformer({ split, types }) {
	const numSections = split.length;
	return (v) => {
		let output = "";
		for (let i = 0; i < numSections; i++) {
			output += split[i];
			if (v[i] !== void 0) {
				const type = types[i];
				if (type === NUMBER_TOKEN) output += sanitize(v[i]);
				else if (type === COLOR_TOKEN) output += color.transform(v[i]);
				else output += v[i];
			}
		}
		return output;
	};
}
function createTransformer(source) {
	return buildTransformer(analyseComplexValue(source));
}
var convertNumbersToZero = (v) => typeof v === "number" ? 0 : color.test(v) ? color.getAnimatableNone(v) : v;
/**
* Convert a parsed value to its zero equivalent, but preserve numbers
* that act as divisors in CSS calc() expressions.
*
* analyseComplexValue extracts numbers from CSS strings and puts the
* surrounding text into a `split` template array. For example:
*   "calc(var(--gap) / 5)"  →  values: [var(--gap), 5]
*                               split:  ["calc(", " / ", ")"]
*
* When building a zero-equivalent for animation, naively zeroing all
* numbers turns the divisor into 0 → "calc(var(--gap) / 0)" → NaN.
* We detect this by checking whether the text preceding a number
* (split[i]) ends with "/" — the CSS calc division operator.
*/
var convertToZero = (value, splitBefore) => {
	if (typeof value === "number") return splitBefore?.trim().endsWith("/") ? value : 0;
	return convertNumbersToZero(value);
};
function getAnimatableNone$1(v) {
	const info = analyseComplexValue(v);
	return buildTransformer(info)(info.values.map((value, i) => convertToZero(value, info.split[i])));
}
var complex = {
	test,
	parse: parseComplexValue,
	createTransformer,
	getAnimatableNone: getAnimatableNone$1
};
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/color/hsla-to-rgba.mjs
function hueToRgb(p, q, t) {
	if (t < 0) t += 1;
	if (t > 1) t -= 1;
	if (t < 1 / 6) return p + (q - p) * 6 * t;
	if (t < 1 / 2) return q;
	if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
	return p;
}
function hslaToRgba({ hue, saturation, lightness, alpha }) {
	hue /= 360;
	saturation /= 100;
	lightness /= 100;
	let red = 0;
	let green = 0;
	let blue = 0;
	if (!saturation) red = green = blue = lightness;
	else {
		const q = lightness < .5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation;
		const p = 2 * lightness - q;
		red = hueToRgb(p, q, hue + 1 / 3);
		green = hueToRgb(p, q, hue);
		blue = hueToRgb(p, q, hue - 1 / 3);
	}
	return {
		red: Math.round(red * 255),
		green: Math.round(green * 255),
		blue: Math.round(blue * 255),
		alpha
	};
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/mix/immediate.mjs
function mixImmediate(a, b) {
	return (p) => p > 0 ? b : a;
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/mix/number.mjs
var mixNumber$1 = (from, to, progress) => {
	return from + (to - from) * progress;
};
//#endregion
//#region node_modules/motion-dom/dist/es/utils/mix/color.mjs
var mixLinearColor = (from, to, v) => {
	const fromExpo = from * from;
	const expo = v * (to * to - fromExpo) + fromExpo;
	return expo < 0 ? 0 : Math.sqrt(expo);
};
var colorTypes = [
	hex,
	rgba,
	hsla
];
var getColorType = (v) => colorTypes.find((type) => type.test(v));
function asRGBA(color) {
	const type = getColorType(color);
	`${color}`;
	if (!Boolean(type)) return false;
	let model = type.parse(color);
	if (type === hsla) model = hslaToRgba(model);
	return model;
}
var mixColor = (from, to) => {
	const fromRGBA = asRGBA(from);
	const toRGBA = asRGBA(to);
	if (!fromRGBA || !toRGBA) return mixImmediate(from, to);
	const blended = { ...fromRGBA };
	return (v) => {
		blended.red = mixLinearColor(fromRGBA.red, toRGBA.red, v);
		blended.green = mixLinearColor(fromRGBA.green, toRGBA.green, v);
		blended.blue = mixLinearColor(fromRGBA.blue, toRGBA.blue, v);
		blended.alpha = mixNumber$1(fromRGBA.alpha, toRGBA.alpha, v);
		return rgba.transform(blended);
	};
};
//#endregion
//#region node_modules/motion-dom/dist/es/utils/mix/visibility.mjs
var invisibleValues = /* @__PURE__ */ new Set(["none", "hidden"]);
/**
* Returns a function that, when provided a progress value between 0 and 1,
* will return the "none" or "hidden" string only when the progress is that of
* the origin or target.
*/
function mixVisibility(origin, target) {
	if (invisibleValues.has(origin)) return (p) => p <= 0 ? origin : target;
	else return (p) => p >= 1 ? target : origin;
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/mix/complex.mjs
function mixNumber(a, b) {
	return (p) => mixNumber$1(a, b, p);
}
function getMixer(a) {
	if (typeof a === "number") return mixNumber;
	else if (typeof a === "string") return isCSSVariableToken(a) ? mixImmediate : color.test(a) ? mixColor : mixComplex;
	else if (Array.isArray(a)) return mixArray;
	else if (typeof a === "object") return color.test(a) ? mixColor : mixObject;
	return mixImmediate;
}
function mixArray(a, b) {
	const output = [...a];
	const numValues = output.length;
	const blendValue = a.map((v, i) => getMixer(v)(v, b[i]));
	return (p) => {
		for (let i = 0; i < numValues; i++) output[i] = blendValue[i](p);
		return output;
	};
}
function mixObject(a, b) {
	const output = {
		...a,
		...b
	};
	const blendValue = {};
	for (const key in output) if (a[key] !== void 0 && b[key] !== void 0) blendValue[key] = getMixer(a[key])(a[key], b[key]);
	return (v) => {
		for (const key in blendValue) output[key] = blendValue[key](v);
		return output;
	};
}
function matchOrder(origin, target) {
	const orderedOrigin = [];
	const pointers = {
		color: 0,
		var: 0,
		number: 0
	};
	for (let i = 0; i < target.values.length; i++) {
		const type = target.types[i];
		const originIndex = origin.indexes[type][pointers[type]];
		orderedOrigin[i] = origin.values[originIndex] ?? 0;
		pointers[type]++;
	}
	return orderedOrigin;
}
var mixComplex = (origin, target) => {
	const template = complex.createTransformer(target);
	const originStats = analyseComplexValue(origin);
	const targetStats = analyseComplexValue(target);
	if (originStats.indexes.var.length === targetStats.indexes.var.length && originStats.indexes.color.length === targetStats.indexes.color.length && originStats.indexes.number.length >= targetStats.indexes.number.length) {
		if (invisibleValues.has(origin) && !targetStats.values.length || invisibleValues.has(target) && !originStats.values.length) return mixVisibility(origin, target);
		return pipe(mixArray(matchOrder(originStats, targetStats), targetStats.values), template);
	} else {
		`${origin}${target}`;
		return mixImmediate(origin, target);
	}
};
//#endregion
//#region node_modules/motion-dom/dist/es/utils/mix/index.mjs
function mix(from, to, p) {
	if (typeof from === "number" && typeof to === "number" && typeof p === "number") return mixNumber$1(from, to, p);
	return getMixer(from)(from, to);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/drivers/frame.mjs
var frameloopDriver = (update) => {
	const passTimestamp = ({ timestamp }) => update(timestamp);
	return {
		start: (keepAlive = true) => frame.update(passTimestamp, keepAlive),
		stop: () => cancelFrame(passTimestamp),
		/**
		* If we're processing this frame we can use the
		* framelocked timestamp to keep things in sync.
		*/
		now: () => frameData.isProcessing ? frameData.timestamp : time.now()
	};
};
//#endregion
//#region node_modules/motion-dom/dist/es/animation/waapi/utils/linear.mjs
var generateLinearEasing = (easing, duration, resolution = 10) => {
	let points = "";
	const numPoints = Math.max(Math.round(duration / resolution), 2);
	for (let i = 0; i < numPoints; i++) points += Math.round(easing(i / (numPoints - 1)) * 1e4) / 1e4 + ", ";
	return `linear(${points.substring(0, points.length - 2)})`;
};
//#endregion
//#region node_modules/motion-dom/dist/es/animation/generators/utils/calc-duration.mjs
/**
* Implement a practical max duration for keyframe generation
* to prevent infinite loops
*/
var maxGeneratorDuration = 2e4;
function calcGeneratorDuration(generator) {
	let duration = 0;
	const timeStep = 50;
	let state = generator.next(duration);
	while (!state.done && duration < 2e4) {
		duration += timeStep;
		state = generator.next(duration);
	}
	return duration >= 2e4 ? Infinity : duration;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/generators/utils/create-generator-easing.mjs
/**
* Create a progress => progress easing function from a generator.
*/
function createGeneratorEasing(options, scale = 100, createGenerator) {
	const generator = createGenerator({
		...options,
		keyframes: [0, scale]
	});
	const duration = Math.min(calcGeneratorDuration(generator), maxGeneratorDuration);
	return {
		type: "keyframes",
		ease: (progress) => {
			return generator.next(duration * progress).value / scale;
		},
		duration: /* @__PURE__ */ millisecondsToSeconds(duration)
	};
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/generators/spring.mjs
var springDefaults = {
	stiffness: 100,
	damping: 10,
	mass: 1,
	velocity: 0,
	duration: 800,
	bounce: .3,
	visualDuration: .3,
	restSpeed: {
		granular: .01,
		default: 2
	},
	restDelta: {
		granular: .005,
		default: .5
	},
	minDuration: .01,
	maxDuration: 10,
	minDamping: .05,
	maxDamping: 1
};
function calcAngularFreq(undampedFreq, dampingRatio) {
	return undampedFreq * Math.sqrt(1 - dampingRatio * dampingRatio);
}
var rootIterations = 12;
function approximateRoot(envelope, derivative, initialGuess) {
	let result = initialGuess;
	for (let i = 1; i < rootIterations; i++) result = result - envelope(result) / derivative(result);
	return result;
}
/**
* This is ported from the Framer implementation of duration-based spring resolution.
*/
var safeMin = .001;
function findSpring({ duration = springDefaults.duration, bounce = springDefaults.bounce, velocity = springDefaults.velocity, mass = springDefaults.mass }) {
	let envelope;
	let derivative;
	springDefaults.maxDuration;
	let dampingRatio = 1 - bounce;
	/**
	* Restrict dampingRatio and duration to within acceptable ranges.
	*/
	dampingRatio = clamp(springDefaults.minDamping, springDefaults.maxDamping, dampingRatio);
	duration = clamp(springDefaults.minDuration, springDefaults.maxDuration, /* @__PURE__ */ millisecondsToSeconds(duration));
	if (dampingRatio < 1) {
		/**
		* Underdamped spring
		*/
		envelope = (undampedFreq) => {
			const exponentialDecay = undampedFreq * dampingRatio;
			const delta = exponentialDecay * duration;
			const a = exponentialDecay - velocity;
			const b = calcAngularFreq(undampedFreq, dampingRatio);
			const c = Math.exp(-delta);
			return safeMin - a / b * c;
		};
		derivative = (undampedFreq) => {
			const delta = undampedFreq * dampingRatio * duration;
			const d = delta * velocity + velocity;
			const e = Math.pow(dampingRatio, 2) * Math.pow(undampedFreq, 2) * duration;
			const f = Math.exp(-delta);
			const g = calcAngularFreq(Math.pow(undampedFreq, 2), dampingRatio);
			return (-envelope(undampedFreq) + safeMin > 0 ? -1 : 1) * ((d - e) * f) / g;
		};
	} else {
		/**
		* Critically-damped spring
		*/
		envelope = (undampedFreq) => {
			return -.001 + Math.exp(-undampedFreq * duration) * ((undampedFreq - velocity) * duration + 1);
		};
		derivative = (undampedFreq) => {
			return Math.exp(-undampedFreq * duration) * ((velocity - undampedFreq) * (duration * duration));
		};
	}
	const initialGuess = 5 / duration;
	const undampedFreq = approximateRoot(envelope, derivative, initialGuess);
	duration = /* @__PURE__ */ secondsToMilliseconds(duration);
	if (isNaN(undampedFreq)) return {
		stiffness: springDefaults.stiffness,
		damping: springDefaults.damping,
		duration
	};
	else {
		const stiffness = Math.pow(undampedFreq, 2) * mass;
		return {
			stiffness,
			damping: dampingRatio * 2 * Math.sqrt(mass * stiffness),
			duration
		};
	}
}
var durationKeys = ["duration", "bounce"];
var physicsKeys = [
	"stiffness",
	"damping",
	"mass"
];
function isSpringType(options, keys) {
	return keys.some((key) => options[key] !== void 0);
}
function getSpringOptions(options) {
	let springOptions = {
		velocity: springDefaults.velocity,
		stiffness: springDefaults.stiffness,
		damping: springDefaults.damping,
		mass: springDefaults.mass,
		isResolvedFromDuration: false,
		...options
	};
	if (!isSpringType(options, physicsKeys) && isSpringType(options, durationKeys)) {
		springOptions.velocity = 0;
		if (options.visualDuration) {
			const visualDuration = options.visualDuration;
			const root = 2 * Math.PI / (visualDuration * 1.2);
			const stiffness = root * root;
			const damping = 2 * clamp(.05, 1, 1 - (options.bounce || 0)) * Math.sqrt(stiffness);
			springOptions = {
				...springOptions,
				mass: springDefaults.mass,
				stiffness,
				damping
			};
		} else {
			const derived = findSpring({
				...options,
				velocity: 0
			});
			springOptions = {
				...springOptions,
				...derived,
				mass: springDefaults.mass
			};
			springOptions.isResolvedFromDuration = true;
		}
	}
	return springOptions;
}
function spring(optionsOrVisualDuration = springDefaults.visualDuration, bounce = springDefaults.bounce) {
	const options = typeof optionsOrVisualDuration !== "object" ? {
		visualDuration: optionsOrVisualDuration,
		keyframes: [0, 1],
		bounce
	} : optionsOrVisualDuration;
	let { restSpeed, restDelta } = options;
	const origin = options.keyframes[0];
	const target = options.keyframes[options.keyframes.length - 1];
	/**
	* This is the Iterator-spec return value. We ensure it's mutable rather than using a generator
	* to reduce GC during animation.
	*/
	const state = {
		done: false,
		value: origin
	};
	const { stiffness, damping, mass, duration, velocity, isResolvedFromDuration } = getSpringOptions({
		...options,
		velocity: -/* @__PURE__ */ millisecondsToSeconds(options.velocity || 0)
	});
	const initialVelocity = velocity || 0;
	const dampingRatio = damping / (2 * Math.sqrt(stiffness * mass));
	const initialDelta = target - origin;
	const undampedAngularFreq = /* @__PURE__ */ millisecondsToSeconds(Math.sqrt(stiffness / mass));
	/**
	* If we're working on a granular scale, use smaller defaults for determining
	* when the spring is finished.
	*
	* These defaults have been selected emprically based on what strikes a good
	* ratio between feeling good and finishing as soon as changes are imperceptible.
	*/
	const isGranularScale = Math.abs(initialDelta) < 5;
	restSpeed || (restSpeed = isGranularScale ? springDefaults.restSpeed.granular : springDefaults.restSpeed.default);
	restDelta || (restDelta = isGranularScale ? springDefaults.restDelta.granular : springDefaults.restDelta.default);
	let resolveSpring;
	let resolveVelocity;
	let angularFreq;
	let A;
	let sinCoeff;
	let cosCoeff;
	if (dampingRatio < 1) {
		angularFreq = calcAngularFreq(undampedAngularFreq, dampingRatio);
		A = (initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) / angularFreq;
		resolveSpring = (t) => {
			return target - Math.exp(-dampingRatio * undampedAngularFreq * t) * (A * Math.sin(angularFreq * t) + initialDelta * Math.cos(angularFreq * t));
		};
		sinCoeff = dampingRatio * undampedAngularFreq * A + initialDelta * angularFreq;
		cosCoeff = dampingRatio * undampedAngularFreq * initialDelta - A * angularFreq;
		resolveVelocity = (t) => {
			return Math.exp(-dampingRatio * undampedAngularFreq * t) * (sinCoeff * Math.sin(angularFreq * t) + cosCoeff * Math.cos(angularFreq * t));
		};
	} else if (dampingRatio === 1) {
		resolveSpring = (t) => target - Math.exp(-undampedAngularFreq * t) * (initialDelta + (initialVelocity + undampedAngularFreq * initialDelta) * t);
		const C = initialVelocity + undampedAngularFreq * initialDelta;
		resolveVelocity = (t) => Math.exp(-undampedAngularFreq * t) * (undampedAngularFreq * C * t - initialVelocity);
	} else {
		const dampedAngularFreq = undampedAngularFreq * Math.sqrt(dampingRatio * dampingRatio - 1);
		resolveSpring = (t) => {
			const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
			const freqForT = Math.min(dampedAngularFreq * t, 300);
			return target - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) * Math.sinh(freqForT) + dampedAngularFreq * initialDelta * Math.cosh(freqForT)) / dampedAngularFreq;
		};
		const P = (initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) / dampedAngularFreq;
		const sinhCoeff = dampingRatio * undampedAngularFreq * P - initialDelta * dampedAngularFreq;
		const coshCoeff = dampingRatio * undampedAngularFreq * initialDelta - P * dampedAngularFreq;
		resolveVelocity = (t) => {
			const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
			const freqForT = Math.min(dampedAngularFreq * t, 300);
			return envelope * (sinhCoeff * Math.sinh(freqForT) + coshCoeff * Math.cosh(freqForT));
		};
	}
	const generator = {
		calculatedDuration: isResolvedFromDuration ? duration || null : null,
		velocity: (t) => /* @__PURE__ */ secondsToMilliseconds(resolveVelocity(t)),
		next: (t) => {
			/**
			* For underdamped physics springs we need both position and
			* velocity each tick. Compute shared trig values once to avoid
			* duplicate Math.exp/sin/cos calls on the hot path.
			*/
			if (!isResolvedFromDuration && dampingRatio < 1) {
				const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
				const sin = Math.sin(angularFreq * t);
				const cos = Math.cos(angularFreq * t);
				const current = target - envelope * (A * sin + initialDelta * cos);
				const currentVelocity = /* @__PURE__ */ secondsToMilliseconds(envelope * (sinCoeff * sin + cosCoeff * cos));
				state.done = Math.abs(currentVelocity) <= restSpeed && Math.abs(target - current) <= restDelta;
				state.value = state.done ? target : current;
				return state;
			}
			const current = resolveSpring(t);
			if (!isResolvedFromDuration) {
				const currentVelocity = /* @__PURE__ */ secondsToMilliseconds(resolveVelocity(t));
				state.done = Math.abs(currentVelocity) <= restSpeed && Math.abs(target - current) <= restDelta;
			} else state.done = t >= duration;
			state.value = state.done ? target : current;
			return state;
		},
		toString: () => {
			const calculatedDuration = Math.min(calcGeneratorDuration(generator), maxGeneratorDuration);
			const easing = generateLinearEasing((progress) => generator.next(calculatedDuration * progress).value, calculatedDuration, 30);
			return calculatedDuration + "ms " + easing;
		},
		toTransition: () => {}
	};
	return generator;
}
spring.applyToOptions = (options) => {
	const generatorOptions = createGeneratorEasing(options, 100, spring);
	options.ease = generatorOptions.ease;
	options.duration = /* @__PURE__ */ secondsToMilliseconds(generatorOptions.duration);
	options.type = "keyframes";
	return options;
};
//#endregion
//#region node_modules/motion-dom/dist/es/animation/generators/utils/velocity.mjs
var velocitySampleDuration = 5;
function getGeneratorVelocity(resolveValue, t, current) {
	const prevT = Math.max(t - velocitySampleDuration, 0);
	return /* @__PURE__ */ velocityPerSecond(current - resolveValue(prevT), t - prevT);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/generators/inertia.mjs
function inertia({ keyframes, velocity = 0, power = .8, timeConstant = 325, bounceDamping = 10, bounceStiffness = 500, modifyTarget, min, max, restDelta = .5, restSpeed }) {
	const origin = keyframes[0];
	const state = {
		done: false,
		value: origin
	};
	const isOutOfBounds = (v) => min !== void 0 && v < min || max !== void 0 && v > max;
	const nearestBoundary = (v) => {
		if (min === void 0) return max;
		if (max === void 0) return min;
		return Math.abs(min - v) < Math.abs(max - v) ? min : max;
	};
	let amplitude = power * velocity;
	const ideal = origin + amplitude;
	const target = modifyTarget === void 0 ? ideal : modifyTarget(ideal);
	/**
	* If the target has changed we need to re-calculate the amplitude, otherwise
	* the animation will start from the wrong position.
	*/
	if (target !== ideal) amplitude = target - origin;
	const calcDelta = (t) => -amplitude * Math.exp(-t / timeConstant);
	const calcLatest = (t) => target + calcDelta(t);
	const applyFriction = (t) => {
		const delta = calcDelta(t);
		const latest = calcLatest(t);
		state.done = Math.abs(delta) <= restDelta;
		state.value = state.done ? target : latest;
	};
	/**
	* Ideally this would resolve for t in a stateless way, we could
	* do that by always precalculating the animation but as we know
	* this will be done anyway we can assume that spring will
	* be discovered during that.
	*/
	let timeReachedBoundary;
	let spring$1;
	const checkCatchBoundary = (t) => {
		if (!isOutOfBounds(state.value)) return;
		timeReachedBoundary = t;
		spring$1 = spring({
			keyframes: [state.value, nearestBoundary(state.value)],
			velocity: getGeneratorVelocity(calcLatest, t, state.value),
			damping: bounceDamping,
			stiffness: bounceStiffness,
			restDelta,
			restSpeed
		});
	};
	checkCatchBoundary(0);
	return {
		calculatedDuration: null,
		next: (t) => {
			/**
			* We need to resolve the friction to figure out if we need a
			* spring but we don't want to do this twice per frame. So here
			* we flag if we updated for this frame and later if we did
			* we can skip doing it again.
			*/
			let hasUpdatedFrame = false;
			if (!spring$1 && timeReachedBoundary === void 0) {
				hasUpdatedFrame = true;
				applyFriction(t);
				checkCatchBoundary(t);
			}
			/**
			* If we have a spring and the provided t is beyond the moment the friction
			* animation crossed the min/max boundary, use the spring.
			*/
			if (timeReachedBoundary !== void 0 && t >= timeReachedBoundary) return spring$1.next(t - timeReachedBoundary);
			else {
				!hasUpdatedFrame && applyFriction(t);
				return state;
			}
		}
	};
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/interpolate.mjs
function createMixers(output, ease, customMixer) {
	const mixers = [];
	const mixerFactory = customMixer || MotionGlobalConfig.mix || mix;
	const numMixers = output.length - 1;
	for (let i = 0; i < numMixers; i++) {
		let mixer = mixerFactory(output[i], output[i + 1]);
		if (ease) mixer = pipe(Array.isArray(ease) ? ease[i] || noop : ease, mixer);
		mixers.push(mixer);
	}
	return mixers;
}
/**
* Create a function that maps from a numerical input array to a generic output array.
*
* Accepts:
*   - Numbers
*   - Colors (hex, hsl, hsla, rgb, rgba)
*   - Complex (combinations of one or more numbers or strings)
*
* ```jsx
* const mixColor = interpolate([0, 1], ['#fff', '#000'])
*
* mixColor(0.5) // 'rgba(128, 128, 128, 1)'
* ```
*
* TODO Revisit this approach once we've moved to data models for values,
* probably not needed to pregenerate mixer functions.
*
* @public
*/
function interpolate(input, output, { clamp: isClamp = true, ease, mixer } = {}) {
	const inputLength = input.length;
	output.length;
	/**
	* If we're only provided a single input, we can just make a function
	* that returns the output.
	*/
	if (inputLength === 1) return () => output[0];
	if (inputLength === 2 && output[0] === output[1]) return () => output[1];
	const isZeroDeltaRange = input[0] === input[1];
	if (input[0] > input[inputLength - 1]) {
		input = [...input].reverse();
		output = [...output].reverse();
	}
	const mixers = createMixers(output, ease, mixer);
	const numMixers = mixers.length;
	const interpolator = (v) => {
		if (isZeroDeltaRange && v < input[0]) return output[0];
		let i = 0;
		if (numMixers > 1) {
			for (; i < input.length - 2; i++) if (v < input[i + 1]) break;
		}
		const progressInRange = /* @__PURE__ */ progress(input[i], input[i + 1], v);
		return mixers[i](progressInRange);
	};
	return isClamp ? (v) => interpolator(clamp(input[0], input[inputLength - 1], v)) : interpolator;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/offsets/fill.mjs
function fillOffset(offset, remaining) {
	const min = offset[offset.length - 1];
	for (let i = 1; i <= remaining; i++) {
		const offsetProgress = /* @__PURE__ */ progress(0, remaining, i);
		offset.push(mixNumber$1(min, 1, offsetProgress));
	}
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/offsets/default.mjs
function defaultOffset(arr) {
	const offset = [0];
	fillOffset(offset, arr.length - 1);
	return offset;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/offsets/time.mjs
function convertOffsetToTimes(offset, duration) {
	return offset.map((o) => o * duration);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/generators/keyframes.mjs
function defaultEasing(values, easing) {
	return values.map(() => easing || easeInOut).splice(0, values.length - 1);
}
function keyframes({ duration = 300, keyframes: keyframeValues, times, ease = "easeInOut" }) {
	/**
	* Easing functions can be externally defined as strings. Here we convert them
	* into actual functions.
	*/
	const easingFunctions = /* @__PURE__ */ isEasingArray(ease) ? ease.map(easingDefinitionToFunction) : easingDefinitionToFunction(ease);
	/**
	* This is the Iterator-spec return value. We ensure it's mutable rather than using a generator
	* to reduce GC during animation.
	*/
	const state = {
		done: false,
		value: keyframeValues[0]
	};
	const mapTimeToKeyframe = interpolate(convertOffsetToTimes(times && times.length === keyframeValues.length ? times : defaultOffset(keyframeValues), duration), keyframeValues, { ease: Array.isArray(easingFunctions) ? easingFunctions : defaultEasing(keyframeValues, easingFunctions) });
	return {
		calculatedDuration: duration,
		next: (t) => {
			state.value = mapTimeToKeyframe(t);
			state.done = t >= duration;
			return state;
		}
	};
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/get-final.mjs
var isNotNull = (value) => value !== null;
function getFinalKeyframe(keyframes, { repeat, repeatType = "loop" }, finalKeyframe, speed = 1) {
	const resolvedKeyframes = keyframes.filter(isNotNull);
	const index = speed < 0 || repeat && repeatType !== "loop" && repeat % 2 === 1 ? 0 : resolvedKeyframes.length - 1;
	return !index || finalKeyframe === void 0 ? resolvedKeyframes[index] : finalKeyframe;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/replace-transition-type.mjs
var transitionTypeMap = {
	decay: inertia,
	inertia,
	tween: keyframes,
	keyframes,
	spring
};
function replaceTransitionType(transition) {
	if (typeof transition.type === "string") transition.type = transitionTypeMap[transition.type];
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/WithPromise.mjs
var WithPromise = class {
	constructor() {
		this.updateFinished();
	}
	get finished() {
		return this._finished;
	}
	updateFinished() {
		this._finished = new Promise((resolve) => {
			this.resolve = resolve;
		});
	}
	notifyFinished() {
		this.resolve();
	}
	/**
	* Allows the animation to be awaited.
	*
	* @deprecated Use `finished` instead.
	*/
	then(onResolve, onReject) {
		return this.finished.then(onResolve, onReject);
	}
};
//#endregion
//#region node_modules/motion-dom/dist/es/animation/JSAnimation.mjs
var percentToProgress = (percent) => percent / 100;
var JSAnimation = class extends WithPromise {
	constructor(options) {
		super();
		this.state = "idle";
		this.startTime = null;
		this.isStopped = false;
		/**
		* The current time of the animation.
		*/
		this.currentTime = 0;
		/**
		* The time at which the animation was paused.
		*/
		this.holdTime = null;
		/**
		* Playback speed as a factor. 0 would be stopped, -1 reverse and 2 double speed.
		*/
		this.playbackSpeed = 1;
		/**
		* Reusable state object for the delay phase to avoid
		* allocating a new object every frame.
		*/
		this.delayState = {
			done: false,
			value: void 0
		};
		/**
		* This method is bound to the instance to fix a pattern where
		* animation.stop is returned as a reference from a useEffect.
		*/
		this.stop = () => {
			const { motionValue } = this.options;
			if (motionValue && motionValue.updatedAt !== time.now()) this.tick(time.now());
			this.isStopped = true;
			if (this.state === "idle") return;
			this.teardown();
			this.options.onStop?.();
		};
		this.options = options;
		this.initAnimation();
		this.play();
		if (options.autoplay === false) this.pause();
	}
	initAnimation() {
		const { options } = this;
		replaceTransitionType(options);
		const { type = keyframes, repeat = 0, repeatDelay = 0, repeatType, velocity = 0 } = options;
		let { keyframes: keyframes$1 } = options;
		const generatorFactory = type || keyframes;
		if (generatorFactory !== keyframes && typeof keyframes$1[0] !== "number") {
			this.mixKeyframes = pipe(percentToProgress, mix(keyframes$1[0], keyframes$1[1]));
			keyframes$1 = [0, 100];
		}
		const generator = generatorFactory({
			...options,
			keyframes: keyframes$1
		});
		/**
		* If we have a mirror repeat type we need to create a second generator that outputs the
		* mirrored (not reversed) animation and later ping pong between the two generators.
		*/
		if (repeatType === "mirror") this.mirroredGenerator = generatorFactory({
			...options,
			keyframes: [...keyframes$1].reverse(),
			velocity: -velocity
		});
		/**
		* If duration is undefined and we have repeat options,
		* we need to calculate a duration from the generator.
		*
		* We set it to the generator itself to cache the duration.
		* Any timeline resolver will need to have already precalculated
		* the duration by this step.
		*/
		if (generator.calculatedDuration === null) generator.calculatedDuration = calcGeneratorDuration(generator);
		const { calculatedDuration } = generator;
		this.calculatedDuration = calculatedDuration;
		this.resolvedDuration = calculatedDuration + repeatDelay;
		this.totalDuration = this.resolvedDuration * (repeat + 1) - repeatDelay;
		this.generator = generator;
	}
	updateTime(timestamp) {
		const animationTime = Math.round(timestamp - this.startTime) * this.playbackSpeed;
		if (this.holdTime !== null) this.currentTime = this.holdTime;
		else this.currentTime = animationTime;
	}
	tick(timestamp, sample = false) {
		const { generator, totalDuration, mixKeyframes, mirroredGenerator, resolvedDuration, calculatedDuration } = this;
		if (this.startTime === null) return generator.next(0);
		const { delay = 0, keyframes, repeat, repeatType, repeatDelay, type, onUpdate, finalKeyframe } = this.options;
		/**
		* requestAnimationFrame timestamps can come through as lower than
		* the startTime as set by performance.now(). Here we prevent this,
		* though in the future it could be possible to make setting startTime
		* a pending operation that gets resolved here.
		*/
		if (this.speed > 0) this.startTime = Math.min(this.startTime, timestamp);
		else if (this.speed < 0) this.startTime = Math.min(timestamp - totalDuration / this.speed, this.startTime);
		if (sample) this.currentTime = timestamp;
		else this.updateTime(timestamp);
		const timeWithoutDelay = this.currentTime - delay * (this.playbackSpeed >= 0 ? 1 : -1);
		const isInDelayPhase = this.playbackSpeed >= 0 ? timeWithoutDelay < 0 : timeWithoutDelay > totalDuration;
		this.currentTime = Math.max(timeWithoutDelay, 0);
		if (this.state === "finished" && this.holdTime === null) this.currentTime = totalDuration;
		let elapsed = this.currentTime;
		let frameGenerator = generator;
		if (repeat) {
			/**
			* Get the current progress (0-1) of the animation. If t is >
			* than duration we'll get values like 2.5 (midway through the
			* third iteration)
			*/
			const progress = Math.min(this.currentTime, totalDuration) / resolvedDuration;
			/**
			* Get the current iteration (0 indexed). For instance the floor of
			* 2.5 is 2.
			*/
			let currentIteration = Math.floor(progress);
			/**
			* Get the current progress of the iteration by taking the remainder
			* so 2.5 is 0.5 through iteration 2
			*/
			let iterationProgress = progress % 1;
			/**
			* If iteration progress is 1 we count that as the end
			* of the previous iteration.
			*/
			if (!iterationProgress && progress >= 1) iterationProgress = 1;
			iterationProgress === 1 && currentIteration--;
			currentIteration = Math.min(currentIteration, repeat + 1);
			if (Boolean(currentIteration % 2)) {
				if (repeatType === "reverse") {
					iterationProgress = 1 - iterationProgress;
					if (repeatDelay) iterationProgress -= repeatDelay / resolvedDuration;
				} else if (repeatType === "mirror") frameGenerator = mirroredGenerator;
			}
			elapsed = clamp(0, 1, iterationProgress) * resolvedDuration;
		}
		/**
		* If we're in negative time, set state as the initial keyframe.
		* This prevents delay: x, duration: 0 animations from finishing
		* instantly.
		*/
		let state;
		if (isInDelayPhase) {
			this.delayState.value = keyframes[0];
			state = this.delayState;
		} else state = frameGenerator.next(elapsed);
		if (mixKeyframes && !isInDelayPhase) state.value = mixKeyframes(state.value);
		let { done } = state;
		if (!isInDelayPhase && calculatedDuration !== null) done = this.playbackSpeed >= 0 ? this.currentTime >= totalDuration : this.currentTime <= 0;
		const isAnimationFinished = this.holdTime === null && (this.state === "finished" || this.state === "running" && done);
		if (isAnimationFinished && type !== inertia) state.value = getFinalKeyframe(keyframes, this.options, finalKeyframe, this.speed);
		if (onUpdate) onUpdate(state.value);
		if (isAnimationFinished) this.finish();
		return state;
	}
	/**
	* Allows the returned animation to be awaited or promise-chained. Currently
	* resolves when the animation finishes at all but in a future update could/should
	* reject if its cancels.
	*/
	then(resolve, reject) {
		return this.finished.then(resolve, reject);
	}
	get duration() {
		return /* @__PURE__ */ millisecondsToSeconds(this.calculatedDuration);
	}
	get iterationDuration() {
		const { delay = 0 } = this.options || {};
		return this.duration + /* @__PURE__ */ millisecondsToSeconds(delay);
	}
	get time() {
		return /* @__PURE__ */ millisecondsToSeconds(this.currentTime);
	}
	set time(newTime) {
		newTime = /* @__PURE__ */ secondsToMilliseconds(newTime);
		this.currentTime = newTime;
		if (this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0) this.holdTime = newTime;
		else if (this.driver) this.startTime = this.driver.now() - newTime / this.playbackSpeed;
		if (this.driver) this.driver.start(false);
		else {
			this.startTime = 0;
			this.state = "paused";
			this.holdTime = newTime;
			this.tick(newTime);
		}
	}
	/**
	* Returns the generator's velocity at the current time in units/second.
	* Uses the analytical derivative when available (springs), avoiding
	* the MotionValue's frame-dependent velocity estimation.
	*/
	getGeneratorVelocity() {
		const t = this.currentTime;
		if (t <= 0) return this.options.velocity || 0;
		if (this.generator.velocity) return this.generator.velocity(t);
		const current = this.generator.next(t).value;
		return getGeneratorVelocity((s) => this.generator.next(s).value, t, current);
	}
	get speed() {
		return this.playbackSpeed;
	}
	set speed(newSpeed) {
		const hasChanged = this.playbackSpeed !== newSpeed;
		if (hasChanged && this.driver) this.updateTime(time.now());
		this.playbackSpeed = newSpeed;
		if (hasChanged && this.driver) this.time = /* @__PURE__ */ millisecondsToSeconds(this.currentTime);
	}
	play() {
		if (this.isStopped) return;
		const { driver = frameloopDriver, startTime } = this.options;
		if (!this.driver) this.driver = driver((timestamp) => this.tick(timestamp));
		this.options.onPlay?.();
		const now = this.driver.now();
		if (this.state === "finished") {
			this.updateFinished();
			this.startTime = now;
		} else if (this.holdTime !== null) this.startTime = now - this.holdTime;
		else if (!this.startTime) this.startTime = startTime ?? now;
		if (this.state === "finished" && this.speed < 0) this.startTime += this.calculatedDuration;
		this.holdTime = null;
		/**
		* Set playState to running only after we've used it in
		* the previous logic.
		*/
		this.state = "running";
		this.driver.start();
	}
	pause() {
		this.state = "paused";
		this.updateTime(time.now());
		this.holdTime = this.currentTime;
	}
	complete() {
		if (this.state !== "running") this.play();
		this.state = "finished";
		this.holdTime = null;
	}
	finish() {
		this.notifyFinished();
		this.teardown();
		this.state = "finished";
		this.options.onComplete?.();
	}
	cancel() {
		this.holdTime = null;
		this.startTime = 0;
		this.tick(0);
		this.teardown();
		this.options.onCancel?.();
	}
	teardown() {
		this.state = "idle";
		this.stopDriver();
		this.startTime = this.holdTime = null;
	}
	stopDriver() {
		if (!this.driver) return;
		this.driver.stop();
		this.driver = void 0;
	}
	sample(sampleTime) {
		this.startTime = 0;
		return this.tick(sampleTime, true);
	}
	attachTimeline(timeline) {
		if (this.options.allowFlatten) {
			this.options.type = "keyframes";
			this.options.ease = "linear";
			this.initAnimation();
		}
		this.driver?.stop();
		return timeline.observe(this);
	}
};
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/utils/fill-wildcards.mjs
function fillWildcards(keyframes) {
	for (let i = 1; i < keyframes.length; i++) keyframes[i] ?? (keyframes[i] = keyframes[i - 1]);
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/dom/parse-transform.mjs
var radToDeg = (rad) => rad * 180 / Math.PI;
var rotate = (v) => {
	return rebaseAngle(radToDeg(Math.atan2(v[1], v[0])));
};
var matrix2dParsers = {
	x: 4,
	y: 5,
	translateX: 4,
	translateY: 5,
	scaleX: 0,
	scaleY: 3,
	scale: (v) => (Math.abs(v[0]) + Math.abs(v[3])) / 2,
	rotate,
	rotateZ: rotate,
	skewX: (v) => radToDeg(Math.atan(v[1])),
	skewY: (v) => radToDeg(Math.atan(v[2])),
	skew: (v) => (Math.abs(v[1]) + Math.abs(v[2])) / 2
};
var rebaseAngle = (angle) => {
	angle = angle % 360;
	if (angle < 0) angle += 360;
	return angle;
};
var rotateZ = rotate;
var scaleX = (v) => Math.sqrt(v[0] * v[0] + v[1] * v[1]);
var scaleY = (v) => Math.sqrt(v[4] * v[4] + v[5] * v[5]);
var matrix3dParsers = {
	x: 12,
	y: 13,
	z: 14,
	translateX: 12,
	translateY: 13,
	translateZ: 14,
	scaleX,
	scaleY,
	scale: (v) => (scaleX(v) + scaleY(v)) / 2,
	rotateX: (v) => rebaseAngle(radToDeg(Math.atan2(v[6], v[5]))),
	rotateY: (v) => rebaseAngle(radToDeg(Math.atan2(-v[2], v[0]))),
	rotateZ,
	rotate: rotateZ,
	skewX: (v) => radToDeg(Math.atan(v[4])),
	skewY: (v) => radToDeg(Math.atan(v[1])),
	skew: (v) => (Math.abs(v[1]) + Math.abs(v[4])) / 2
};
function defaultTransformValue(name) {
	return name.includes("scale") ? 1 : 0;
}
function parseValueFromTransform(transform, name) {
	if (!transform || transform === "none") return defaultTransformValue(name);
	const matrix3dMatch = transform.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
	let parsers;
	let match;
	if (matrix3dMatch) {
		parsers = matrix3dParsers;
		match = matrix3dMatch;
	} else {
		const matrix2dMatch = transform.match(/^matrix\(([-\d.e\s,]+)\)$/u);
		parsers = matrix2dParsers;
		match = matrix2dMatch;
	}
	if (!match) return defaultTransformValue(name);
	const valueParser = parsers[name];
	const values = match[1].split(",").map(convertTransformToNumber);
	return typeof valueParser === "function" ? valueParser(values) : values[valueParser];
}
var readTransformValue = (instance, name) => {
	const { transform = "none" } = getComputedStyle(instance);
	return parseValueFromTransform(transform, name);
};
function convertTransformToNumber(value) {
	return parseFloat(value.trim());
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/keys-transform.mjs
/**
* Generate a list of every possible transform key.
*/
var transformPropOrder = [
	"transformPerspective",
	"x",
	"y",
	"z",
	"translateX",
	"translateY",
	"translateZ",
	"scale",
	"scaleX",
	"scaleY",
	"rotate",
	"rotateX",
	"rotateY",
	"rotateZ",
	"skew",
	"skewX",
	"skewY"
];
/**
* A quick lookup for transform props.
*
* `pathRotation` is a transform for routing purposes (skipped from raw
* style application, wired to the transform composite, flags transform
* dirty) but is intentionally NOT in `transformPropOrder` — it is
* composed onto `rotate` at the build sites, not serialized in its own
* slot, and must stay out of the order-array consumers (parse-transform,
* unit-conversion, keys-position).
*/
var transformProps = /*@__PURE__*/ (() => /* @__PURE__ */ new Set([...transformPropOrder, "pathRotation"]))();
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/utils/unit-conversion.mjs
var isNumOrPxType = (v) => v === number || v === px;
var transformKeys = /* @__PURE__ */ new Set([
	"x",
	"y",
	"z"
]);
var nonTranslationalTransformKeys = transformPropOrder.filter((key) => !transformKeys.has(key));
function removeNonTranslationalTransform(visualElement) {
	const removedTransforms = [];
	nonTranslationalTransformKeys.forEach((key) => {
		const value = visualElement.getValue(key);
		if (value !== void 0) {
			removedTransforms.push([key, value.get()]);
			value.set(key.startsWith("scale") ? 1 : 0);
		}
	});
	return removedTransforms;
}
var positionalValues = {
	width: ({ x }, { paddingLeft = "0", paddingRight = "0", boxSizing }) => {
		const width = x.max - x.min;
		return boxSizing === "border-box" ? width : width - parseFloat(paddingLeft) - parseFloat(paddingRight);
	},
	height: ({ y }, { paddingTop = "0", paddingBottom = "0", boxSizing }) => {
		const height = y.max - y.min;
		return boxSizing === "border-box" ? height : height - parseFloat(paddingTop) - parseFloat(paddingBottom);
	},
	top: (_bbox, { top }) => parseFloat(top),
	left: (_bbox, { left }) => parseFloat(left),
	bottom: ({ y }, { top }) => parseFloat(top) + (y.max - y.min),
	right: ({ x }, { left }) => parseFloat(left) + (x.max - x.min),
	x: (_bbox, { transform }) => parseValueFromTransform(transform, "x"),
	y: (_bbox, { transform }) => parseValueFromTransform(transform, "y")
};
positionalValues.translateX = positionalValues.x;
positionalValues.translateY = positionalValues.y;
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/KeyframesResolver.mjs
var toResolve = /* @__PURE__ */ new Set();
var isScheduled = false;
var anyNeedsMeasurement = false;
var isForced = false;
function measureAllKeyframes() {
	if (anyNeedsMeasurement) {
		const resolversToMeasure = Array.from(toResolve).filter((resolver) => resolver.needsMeasurement);
		const elementsToMeasure = new Set(resolversToMeasure.map((resolver) => resolver.element));
		const transformsToRestore = /* @__PURE__ */ new Map();
		/**
		* Write pass
		* If we're measuring elements we want to remove bounding box-changing transforms.
		*/
		elementsToMeasure.forEach((element) => {
			const removedTransforms = removeNonTranslationalTransform(element);
			if (!removedTransforms.length) return;
			transformsToRestore.set(element, removedTransforms);
			element.render();
		});
		resolversToMeasure.forEach((resolver) => resolver.measureInitialState());
		elementsToMeasure.forEach((element) => {
			element.render();
			const restore = transformsToRestore.get(element);
			if (restore) restore.forEach(([key, value]) => {
				element.getValue(key)?.set(value);
			});
		});
		resolversToMeasure.forEach((resolver) => resolver.measureEndState());
		resolversToMeasure.forEach((resolver) => {
			if (resolver.suspendedScrollY !== void 0) window.scrollTo(0, resolver.suspendedScrollY);
		});
	}
	anyNeedsMeasurement = false;
	isScheduled = false;
	toResolve.forEach((resolver) => resolver.complete(isForced));
	toResolve.clear();
}
function readAllKeyframes() {
	toResolve.forEach((resolver) => {
		resolver.readKeyframes();
		if (resolver.needsMeasurement) anyNeedsMeasurement = true;
	});
}
function flushKeyframeResolvers() {
	isForced = true;
	readAllKeyframes();
	measureAllKeyframes();
	isForced = false;
}
var KeyframeResolver = class {
	constructor(unresolvedKeyframes, onComplete, name, motionValue, element, isAsync = false) {
		this.state = "pending";
		/**
		* Track whether this resolver is async. If it is, it'll be added to the
		* resolver queue and flushed in the next frame. Resolvers that aren't going
		* to trigger read/write thrashing don't need to be async.
		*/
		this.isAsync = false;
		/**
		* Track whether this resolver needs to perform a measurement
		* to resolve its keyframes.
		*/
		this.needsMeasurement = false;
		this.unresolvedKeyframes = [...unresolvedKeyframes];
		this.onComplete = onComplete;
		this.name = name;
		this.motionValue = motionValue;
		this.element = element;
		this.isAsync = isAsync;
	}
	scheduleResolve() {
		this.state = "scheduled";
		if (this.isAsync) {
			toResolve.add(this);
			if (!isScheduled) {
				isScheduled = true;
				frame.read(readAllKeyframes);
				frame.resolveKeyframes(measureAllKeyframes);
			}
		} else {
			this.readKeyframes();
			this.complete();
		}
	}
	readKeyframes() {
		const { unresolvedKeyframes, name, element, motionValue } = this;
		if (unresolvedKeyframes[0] === null) {
			const currentValue = motionValue?.get();
			const finalKeyframe = unresolvedKeyframes[unresolvedKeyframes.length - 1];
			if (currentValue !== void 0) unresolvedKeyframes[0] = currentValue;
			else if (element && name) {
				const valueAsRead = element.readValue(name, finalKeyframe);
				if (valueAsRead !== void 0 && valueAsRead !== null) unresolvedKeyframes[0] = valueAsRead;
			}
			if (unresolvedKeyframes[0] === void 0) unresolvedKeyframes[0] = finalKeyframe;
			if (motionValue && currentValue === void 0) motionValue.set(unresolvedKeyframes[0]);
		}
		fillWildcards(unresolvedKeyframes);
	}
	setFinalKeyframe() {}
	measureInitialState() {}
	renderEndStyles() {}
	measureEndState() {}
	complete(isForcedComplete = false) {
		this.state = "complete";
		this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, isForcedComplete);
		toResolve.delete(this);
	}
	cancel() {
		if (this.state === "scheduled") {
			toResolve.delete(this);
			this.state = "pending";
		}
	}
	resume() {
		if (this.state === "pending") this.scheduleResolve();
	}
};
//#endregion
//#region node_modules/motion-dom/dist/es/render/dom/is-css-var.mjs
var isCSSVar = (name) => name.startsWith("--");
//#endregion
//#region node_modules/motion-dom/dist/es/render/dom/style-set.mjs
function setStyle(element, name, value) {
	isCSSVar(name) ? element.style.setProperty(name, value) : element.style[name] = value;
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/supports/flags.mjs
/**
* Add the ability for test suites to manually set support flags
* to better test more environments.
*/
var supportsFlags = {};
//#endregion
//#region node_modules/motion-dom/dist/es/utils/supports/memo.mjs
function memoSupports(callback, supportsFlag) {
	const memoized = /* @__PURE__ */ memo$1(callback);
	return () => supportsFlags[supportsFlag] ?? memoized();
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/supports/scroll-timeline.mjs
var supportsScrollTimeline = /* @__PURE__ */ memoSupports(() => window.ScrollTimeline !== void 0, "scrollTimeline");
//#endregion
//#region node_modules/motion-dom/dist/es/utils/supports/linear-easing.mjs
var supportsLinearEasing = /*@__PURE__*/ memoSupports(() => {
	try {
		document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
	} catch (e) {
		return false;
	}
	return true;
}, "linearEasing");
//#endregion
//#region node_modules/motion-dom/dist/es/animation/waapi/easing/cubic-bezier.mjs
var cubicBezierAsString = ([a, b, c, d]) => `cubic-bezier(${a}, ${b}, ${c}, ${d})`;
//#endregion
//#region node_modules/motion-dom/dist/es/animation/waapi/easing/supported.mjs
var supportedWaapiEasing = {
	linear: "linear",
	ease: "ease",
	easeIn: "ease-in",
	easeOut: "ease-out",
	easeInOut: "ease-in-out",
	circIn: /*@__PURE__*/ cubicBezierAsString([
		0,
		.65,
		.55,
		1
	]),
	circOut: /*@__PURE__*/ cubicBezierAsString([
		.55,
		0,
		1,
		.45
	]),
	backIn: /*@__PURE__*/ cubicBezierAsString([
		.31,
		.01,
		.66,
		-.59
	]),
	backOut: /*@__PURE__*/ cubicBezierAsString([
		.33,
		1.53,
		.69,
		.99
	])
};
//#endregion
//#region node_modules/motion-dom/dist/es/animation/waapi/easing/map-easing.mjs
function mapEasingToNativeEasing(easing, duration) {
	if (!easing) return;
	else if (typeof easing === "function") return supportsLinearEasing() ? generateLinearEasing(easing, duration) : "ease-out";
	else if (/* @__PURE__ */ isBezierDefinition(easing)) return cubicBezierAsString(easing);
	else if (Array.isArray(easing)) return easing.map((segmentEasing) => mapEasingToNativeEasing(segmentEasing, duration) || supportedWaapiEasing.easeOut);
	else return supportedWaapiEasing[easing];
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/waapi/start-waapi-animation.mjs
function startWaapiAnimation(element, valueName, keyframes, { delay = 0, duration = 300, repeat = 0, repeatType = "loop", ease = "easeOut", times } = {}, pseudoElement = void 0) {
	const keyframeOptions = { [valueName]: keyframes };
	if (times) keyframeOptions.offset = times;
	const easing = mapEasingToNativeEasing(ease, duration);
	/**
	* If this is an easing array, apply to keyframes, not animation as a whole
	*/
	if (Array.isArray(easing)) keyframeOptions.easing = easing;
	const options = {
		delay,
		duration,
		easing: !Array.isArray(easing) ? easing : "linear",
		fill: "both",
		iterations: repeat + 1,
		direction: repeatType === "reverse" ? "alternate" : "normal"
	};
	if (pseudoElement) options.pseudoElement = pseudoElement;
	return element.animate(keyframeOptions, options);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/generators/utils/is-generator.mjs
function isGenerator(type) {
	return typeof type === "function" && "applyToOptions" in type;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/waapi/utils/apply-generator.mjs
function applyGeneratorOptions({ type, ...options }) {
	if (isGenerator(type) && supportsLinearEasing()) return type.applyToOptions(options);
	else {
		options.duration ?? (options.duration = 300);
		options.ease ?? (options.ease = "easeOut");
	}
	return options;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/NativeAnimation.mjs
/**
* NativeAnimation implements AnimationPlaybackControls for the browser's Web Animations API.
*/
var NativeAnimation = class extends WithPromise {
	constructor(options) {
		super();
		this.finishedTime = null;
		this.isStopped = false;
		/**
		* Tracks a manually-set start time that takes precedence over WAAPI's
		* dynamic startTime. This is cleared when play() or time setter is called,
		* allowing WAAPI to take over timing.
		*/
		this.manualStartTime = null;
		if (!options) return;
		const { element, name, keyframes, pseudoElement, allowFlatten = false, finalKeyframe, onComplete } = options;
		this.isPseudoElement = Boolean(pseudoElement);
		this.allowFlatten = allowFlatten;
		this.options = options;
		options.type;
		const transition = applyGeneratorOptions(options);
		this.animation = startWaapiAnimation(element, name, keyframes, transition, pseudoElement);
		if (transition.autoplay === false) this.animation.pause();
		this.animation.onfinish = () => {
			this.finishedTime = this.time;
			if (!pseudoElement) {
				const keyframe = getFinalKeyframe(keyframes, this.options, finalKeyframe, this.speed);
				if (this.updateMotionValue) this.updateMotionValue(keyframe);
				/**
				* If we can, we want to commit the final style as set by the user,
				* rather than the computed keyframe value supplied by the animation.
				* We always do this, even when a motion value is present, to prevent
				* a visual flash in Firefox where the WAAPI animation's fill is removed
				* during cancel() before the scheduled render can apply the correct value.
				*/
				setStyle(element, name, keyframe);
				this.animation.cancel();
			}
			onComplete?.();
			this.notifyFinished();
		};
	}
	play() {
		if (this.isStopped) return;
		this.manualStartTime = null;
		this.animation.play();
		if (this.state === "finished") this.updateFinished();
	}
	pause() {
		this.animation.pause();
	}
	complete() {
		this.animation.finish?.();
	}
	cancel() {
		try {
			this.animation.cancel();
		} catch (e) {}
	}
	stop() {
		if (this.isStopped) return;
		this.isStopped = true;
		const { state } = this;
		if (state === "idle" || state === "finished") return;
		if (this.updateMotionValue) this.updateMotionValue();
		else this.commitStyles();
		if (!this.isPseudoElement) this.cancel();
	}
	/**
	* WAAPI doesn't natively have any interruption capabilities.
	*
	* In this method, we commit styles back to the DOM before cancelling
	* the animation.
	*
	* This is designed to be overridden by NativeAnimationExtended, which
	* will create a renderless JS animation and sample it twice to calculate
	* its current value, "previous" value, and therefore allow
	* Motion to also correctly calculate velocity for any subsequent animation
	* while deferring the commit until the next animation frame.
	*/
	commitStyles() {
		const element = this.options?.element;
		if (!this.isPseudoElement && element?.isConnected) this.animation.commitStyles?.();
	}
	get duration() {
		const duration = this.animation.effect?.getComputedTiming?.().duration || 0;
		return /* @__PURE__ */ millisecondsToSeconds(Number(duration));
	}
	get iterationDuration() {
		const { delay = 0 } = this.options || {};
		return this.duration + /* @__PURE__ */ millisecondsToSeconds(delay);
	}
	get time() {
		return /* @__PURE__ */ millisecondsToSeconds(Number(this.animation.currentTime) || 0);
	}
	set time(newTime) {
		const wasFinished = this.finishedTime !== null;
		this.manualStartTime = null;
		this.finishedTime = null;
		this.animation.currentTime = /* @__PURE__ */ secondsToMilliseconds(newTime);
		if (wasFinished) this.animation.pause();
	}
	/**
	* The playback speed of the animation.
	* 1 = normal speed, 2 = double speed, 0.5 = half speed.
	*/
	get speed() {
		return this.animation.playbackRate;
	}
	set speed(newSpeed) {
		if (newSpeed < 0) this.finishedTime = null;
		this.animation.playbackRate = newSpeed;
	}
	get state() {
		return this.finishedTime !== null ? "finished" : this.animation.playState;
	}
	get startTime() {
		return this.manualStartTime ?? Number(this.animation.startTime);
	}
	set startTime(newStartTime) {
		this.manualStartTime = this.animation.startTime = newStartTime;
	}
	/**
	* Attaches a timeline to the animation, for instance the `ScrollTimeline`.
	*/
	attachTimeline({ timeline, rangeStart, rangeEnd, observe }) {
		if (this.allowFlatten) this.animation.effect?.updateTiming({ easing: "linear" });
		this.animation.onfinish = null;
		if (timeline && supportsScrollTimeline()) {
			this.animation.timeline = timeline;
			if (rangeStart) this.animation.rangeStart = rangeStart;
			if (rangeEnd) this.animation.rangeEnd = rangeEnd;
			return noop;
		} else return observe(this);
	}
};
//#endregion
//#region node_modules/motion-dom/dist/es/animation/waapi/utils/unsupported-easing.mjs
var unsupportedEasingFunctions = {
	anticipate,
	backInOut,
	circInOut
};
function isUnsupportedEase(key) {
	return key in unsupportedEasingFunctions;
}
function replaceStringEasing(transition) {
	if (typeof transition.ease === "string" && isUnsupportedEase(transition.ease)) transition.ease = unsupportedEasingFunctions[transition.ease];
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/NativeAnimationExtended.mjs
/**
* 10ms is chosen here as it strikes a balance between smooth
* results (more than one keyframe per frame at 60fps) and
* keyframe quantity.
*/
var sampleDelta = 10;
var NativeAnimationExtended = class extends NativeAnimation {
	constructor(options) {
		/**
		* The base NativeAnimation function only supports a subset
		* of Motion easings, and WAAPI also only supports some
		* easing functions via string/cubic-bezier definitions.
		*
		* This function replaces those unsupported easing functions
		* with a JS easing function. This will later get compiled
		* to a linear() easing function.
		*/
		replaceStringEasing(options);
		/**
		* Ensure we replace the transition type with a generator function
		* before passing to WAAPI.
		*
		* TODO: Does this have a better home? It could be shared with
		* JSAnimation.
		*/
		replaceTransitionType(options);
		super(options);
		/**
		* Only set startTime when the animation should autoplay.
		* Setting startTime on a paused WAAPI animation unpauses it
		* (per the WAAPI spec), which breaks autoplay: false.
		*/
		if (options.startTime !== void 0 && options.autoplay !== false) this.startTime = options.startTime;
		this.options = options;
	}
	/**
	* WAAPI doesn't natively have any interruption capabilities.
	*
	* Rather than read committed styles back out of the DOM, we can
	* create a renderless JS animation and sample it twice to calculate
	* its current value, "previous" value, and therefore allow
	* Motion to calculate velocity for any subsequent animation.
	*/
	updateMotionValue(value) {
		const { motionValue, onUpdate, onComplete, element, ...options } = this.options;
		if (!motionValue) return;
		if (value !== void 0) {
			motionValue.set(value);
			return;
		}
		const sampleAnimation = new JSAnimation({
			...options,
			autoplay: false
		});
		/**
		* Use wall-clock elapsed time for sampling.
		* Under CPU load, WAAPI's currentTime may not reflect actual
		* elapsed time, causing incorrect sampling and visual jumps.
		*/
		const sampleTime = Math.max(sampleDelta, time.now() - this.startTime);
		const delta = clamp(0, sampleDelta, sampleTime - sampleDelta);
		const current = sampleAnimation.sample(sampleTime).value;
		/**
		* Write the estimated value to inline style so it persists
		* after cancel(), covering the async gap before the next
		* animation starts.
		*/
		const { name } = this.options;
		if (element && name) setStyle(element, name, current);
		motionValue.setWithVelocity(sampleAnimation.sample(Math.max(0, sampleTime - delta)).value, current, delta);
		sampleAnimation.stop();
	}
};
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/is-animatable.mjs
/**
* Check if a value is animatable. Examples:
*
* ✅: 100, "100px", "#fff"
* ❌: "block", "url(2.jpg)"
* @param value
*
* @internal
*/
var isAnimatable = (value, name) => {
	if (name === "zIndex") return false;
	if (typeof value === "number" || Array.isArray(value)) return true;
	if (typeof value === "string" && (complex.test(value) || value === "0") && !value.startsWith("url(")) return true;
	return false;
};
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/can-animate.mjs
function hasKeyframesChanged(keyframes) {
	const current = keyframes[0];
	if (keyframes.length === 1) return true;
	for (let i = 0; i < keyframes.length; i++) if (keyframes[i] !== current) return true;
}
function canAnimate(keyframes, name, type, velocity) {
	/**
	* Check if we're able to animate between the start and end keyframes,
	* and throw a warning if we're attempting to animate between one that's
	* animatable and another that isn't.
	*/
	const originKeyframe = keyframes[0];
	if (originKeyframe === null) return false;
	/**
	* These aren't traditionally animatable but we do support them.
	* In future we could look into making this more generic or replacing
	* this function with mix() === mixImmediate
	*/
	if (name === "display" || name === "visibility") return true;
	const targetKeyframe = keyframes[keyframes.length - 1];
	const isOriginAnimatable = isAnimatable(originKeyframe, name);
	const isTargetAnimatable = isAnimatable(targetKeyframe, name);
	`${name}${originKeyframe}${targetKeyframe}${isOriginAnimatable ? targetKeyframe : originKeyframe}`;
	if (!isOriginAnimatable || !isTargetAnimatable) return false;
	return hasKeyframesChanged(keyframes) || (type === "spring" || isGenerator(type)) && velocity;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/make-animation-instant.mjs
function makeAnimationInstant(options) {
	options.duration = 0;
	options.type = "keyframes";
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/waapi/utils/accelerated-values.mjs
/**
* A list of values that can be hardware-accelerated.
*/
var acceleratedValues = /* @__PURE__ */ new Set([
	"opacity",
	"clipPath",
	"filter",
	"transform"
]);
//#endregion
//#region node_modules/motion-dom/dist/es/animation/waapi/utils/is-browser-color.mjs
var browserColorFunctions = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function hasBrowserOnlyColors(keyframes) {
	for (let i = 0; i < keyframes.length; i++) if (typeof keyframes[i] === "string" && browserColorFunctions.test(keyframes[i])) return true;
	return false;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/waapi/supports/waapi.mjs
var colorProperties = /* @__PURE__ */ new Set([
	"color",
	"backgroundColor",
	"outlineColor",
	"fill",
	"stroke",
	"borderColor",
	"borderTopColor",
	"borderRightColor",
	"borderBottomColor",
	"borderLeftColor"
]);
var supportsWaapi = /*@__PURE__*/ memo$1(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function supportsBrowserAnimation(options) {
	const { motionValue, name, repeatDelay, repeatType, damping, type, keyframes } = options;
	/**
	* We use this check instead of isHTMLElement() because we explicitly
	* **don't** want elements in different timing contexts (i.e. popups)
	* to be accelerated, as it's not possible to sync these animations
	* properly with those driven from the main window frameloop.
	*/
	if (!(motionValue?.owner?.current instanceof HTMLElement)) return false;
	const { onUpdate, transformTemplate } = motionValue.owner.getProps();
	return supportsWaapi() && name && (acceleratedValues.has(name) || colorProperties.has(name) && hasBrowserOnlyColors(keyframes)) && (name !== "transform" || !transformTemplate) && !onUpdate && !repeatDelay && repeatType !== "mirror" && damping !== 0 && type !== "inertia";
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/AsyncMotionValueAnimation.mjs
/**
* Maximum time allowed between an animation being created and it being
* resolved for us to use the latter as the start time.
*
* This is to ensure that while we prefer to "start" an animation as soon
* as it's triggered, we also want to avoid a visual jump if there's a big delay
* between these two moments.
*/
var MAX_RESOLVE_DELAY = 40;
var AsyncMotionValueAnimation = class extends WithPromise {
	constructor({ autoplay = true, delay = 0, type = "keyframes", repeat = 0, repeatDelay = 0, repeatType = "loop", keyframes, name, motionValue, element, ...options }) {
		super();
		/**
		* Bound to support return animation.stop pattern
		*/
		this.stop = () => {
			if (this._animation) {
				this._animation.stop();
				this.stopTimeline?.();
			}
			this.keyframeResolver?.cancel();
		};
		this.createdAt = time.now();
		const optionsWithDefaults = {
			autoplay,
			delay,
			type,
			repeat,
			repeatDelay,
			repeatType,
			name,
			motionValue,
			element,
			...options
		};
		const KeyframeResolver$1 = element?.KeyframeResolver || KeyframeResolver;
		this.keyframeResolver = new KeyframeResolver$1(keyframes, (resolvedKeyframes, finalKeyframe, forced) => this.onKeyframesResolved(resolvedKeyframes, finalKeyframe, optionsWithDefaults, !forced), name, motionValue, element);
		this.keyframeResolver?.scheduleResolve();
	}
	onKeyframesResolved(keyframes, finalKeyframe, options, sync) {
		this.keyframeResolver = void 0;
		const { name, type, velocity, delay, isHandoff, onUpdate } = options;
		this.resolvedAt = time.now();
		/**
		* If we can't animate this value with the resolved keyframes
		* then we should complete it immediately.
		*/
		let canAnimateValue = true;
		if (!canAnimate(keyframes, name, type, velocity)) {
			canAnimateValue = false;
			if (MotionGlobalConfig.instantAnimations || !delay) onUpdate?.(getFinalKeyframe(keyframes, options, finalKeyframe));
			keyframes[0] = keyframes[keyframes.length - 1];
			makeAnimationInstant(options);
			options.repeat = 0;
		}
		const resolvedOptions = {
			startTime: sync ? !this.resolvedAt ? this.createdAt : this.resolvedAt - this.createdAt > MAX_RESOLVE_DELAY ? this.resolvedAt : this.createdAt : void 0,
			finalKeyframe,
			...options,
			keyframes
		};
		/**
		* Animate via WAAPI if possible. If this is a handoff animation, the optimised animation will be running via
		* WAAPI. Therefore, this animation must be JS to ensure it runs "under" the
		* optimised animation.
		*
		* Also skip WAAPI when keyframes aren't animatable, as the resolved
		* values may not be valid CSS and would trigger browser warnings.
		*/
		const useWaapi = canAnimateValue && !isHandoff && supportsBrowserAnimation(resolvedOptions);
		const element = resolvedOptions.motionValue?.owner?.current;
		let animation;
		if (useWaapi) try {
			animation = new NativeAnimationExtended({
				...resolvedOptions,
				element
			});
		} catch {
			animation = new JSAnimation(resolvedOptions);
		}
		else animation = new JSAnimation(resolvedOptions);
		animation.finished.then(() => {
			this.notifyFinished();
		}).catch(noop);
		if (this.pendingTimeline) {
			this.stopTimeline = animation.attachTimeline(this.pendingTimeline);
			this.pendingTimeline = void 0;
		}
		this._animation = animation;
	}
	get finished() {
		if (!this._animation) return this._finished;
		else return this.animation.finished;
	}
	then(onResolve, _onReject) {
		return this.finished.finally(onResolve).then(() => {});
	}
	get animation() {
		if (!this._animation) {
			this.keyframeResolver?.resume();
			flushKeyframeResolvers();
		}
		return this._animation;
	}
	get duration() {
		return this.animation.duration;
	}
	get iterationDuration() {
		return this.animation.iterationDuration;
	}
	get time() {
		return this.animation.time;
	}
	set time(newTime) {
		this.animation.time = newTime;
	}
	get speed() {
		return this.animation.speed;
	}
	get state() {
		return this.animation.state;
	}
	set speed(newSpeed) {
		this.animation.speed = newSpeed;
	}
	get startTime() {
		return this.animation.startTime;
	}
	attachTimeline(timeline) {
		if (this._animation) this.stopTimeline = this.animation.attachTimeline(timeline);
		else this.pendingTimeline = timeline;
		return () => this.stop();
	}
	play() {
		this.animation.play();
	}
	pause() {
		this.animation.pause();
	}
	complete() {
		this.animation.complete();
	}
	cancel() {
		if (this._animation) this.animation.cancel();
		this.keyframeResolver?.cancel();
	}
};
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/resolve-transition.mjs
/**
* If `transition` has `inherit: true`, shallow-merge it with
* `parentTransition` (child keys win) and strip the `inherit` key.
* Otherwise return `transition` unchanged.
*/
function resolveTransition(transition, parentTransition) {
	if (transition?.inherit && parentTransition) {
		const { inherit: _, ...rest } = transition;
		return {
			...parentTransition,
			...rest
		};
	}
	return transition;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/get-value-transition.mjs
function getValueTransition(transition, key) {
	const valueTransition = transition?.[key] ?? transition?.["default"] ?? transition;
	if (valueTransition !== transition) return resolveTransition(valueTransition, transition);
	return valueTransition;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/default-transitions.mjs
var underDampedSpring = {
	type: "spring",
	stiffness: 500,
	damping: 25,
	restSpeed: 10
};
var criticallyDampedSpring = (target) => ({
	type: "spring",
	stiffness: 550,
	damping: target === 0 ? 2 * Math.sqrt(550) : 30,
	restSpeed: 10
});
var keyframesTransition = {
	type: "keyframes",
	duration: .8
};
/**
* Default easing curve is a slightly shallower version of
* the default browser easing curve.
*/
var ease = {
	type: "keyframes",
	ease: [
		.25,
		.1,
		.35,
		1
	],
	duration: .3
};
var getDefaultTransition = (valueKey, { keyframes }) => {
	if (keyframes.length > 2) return keyframesTransition;
	else if (transformProps.has(valueKey)) return valueKey.startsWith("scale") ? criticallyDampedSpring(keyframes[1]) : underDampedSpring;
	return ease;
};
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/is-transition-defined.mjs
var orchestrationKeys = /* @__PURE__ */ new Set([
	"when",
	"delay",
	"delayChildren",
	"staggerChildren",
	"staggerDirection",
	"repeat",
	"repeatType",
	"repeatDelay",
	"from",
	"elapsed"
]);
/**
* Decide whether a transition is defined on a given Transition.
* This filters out orchestration options and returns true
* if any options are left.
*/
function isTransitionDefined(transition) {
	for (const key in transition) if (!orchestrationKeys.has(key)) return true;
	return false;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/interfaces/motion-value.mjs
var animateMotionValue = (name, value, target, transition = {}, element, isHandoff) => (onComplete) => {
	const valueTransition = getValueTransition(transition, name) || {};
	/**
	* Most transition values are currently completely overwritten by value-specific
	* transitions. In the future it'd be nicer to blend these transitions. But for now
	* delay actually does inherit from the root transition if not value-specific.
	*/
	const delay = valueTransition.delay || transition.delay || 0;
	/**
	* Elapsed isn't a public transition option but can be passed through from
	* optimized appear effects in milliseconds.
	*/
	let { elapsed = 0 } = transition;
	elapsed = elapsed - /* @__PURE__ */ secondsToMilliseconds(delay);
	const options = {
		keyframes: Array.isArray(target) ? target : [null, target],
		ease: "easeOut",
		velocity: value.getVelocity(),
		...valueTransition,
		delay: -elapsed,
		onUpdate: (v) => {
			value.set(v);
			valueTransition.onUpdate && valueTransition.onUpdate(v);
		},
		onComplete: () => {
			onComplete();
			valueTransition.onComplete && valueTransition.onComplete();
		},
		name,
		motionValue: value,
		element: isHandoff ? void 0 : element
	};
	/**
	* If there's no transition defined for this value, we can generate
	* unique transition settings for this value.
	*/
	if (!isTransitionDefined(valueTransition)) Object.assign(options, getDefaultTransition(name, options));
	/**
	* Both WAAPI and our internal animation functions use durations
	* as defined by milliseconds, while our external API defines them
	* as seconds.
	*/
	options.duration && (options.duration = /* @__PURE__ */ secondsToMilliseconds(options.duration));
	options.repeatDelay && (options.repeatDelay = /* @__PURE__ */ secondsToMilliseconds(options.repeatDelay));
	/**
	* Support deprecated way to set initial value. Prefer keyframe syntax.
	*/
	if (options.from !== void 0) options.keyframes[0] = options.from;
	let shouldSkip = false;
	if (options.type === false || options.duration === 0 && !options.repeatDelay) {
		makeAnimationInstant(options);
		if (options.delay === 0) shouldSkip = true;
	}
	if (MotionGlobalConfig.instantAnimations || MotionGlobalConfig.skipAnimations || element?.shouldSkipAnimations || valueTransition.skipAnimations) {
		shouldSkip = true;
		makeAnimationInstant(options);
		options.delay = 0;
	}
	/**
	* If the transition type or easing has been explicitly set by the user
	* then we don't want to allow flattening the animation.
	*/
	options.allowFlatten = !valueTransition.type && !valueTransition.ease;
	/**
	* If we can or must skip creating the animation, and apply only
	* the final keyframe, do so. We also check once keyframes are resolved but
	* this early check prevents the need to create an animation at all.
	*/
	if (shouldSkip && !isHandoff && value.get() !== void 0) {
		const finalKeyframe = getFinalKeyframe(options.keyframes, valueTransition);
		if (finalKeyframe !== void 0) {
			frame.update(() => {
				options.onUpdate(finalKeyframe);
				options.onComplete();
			});
			return;
		}
	}
	return valueTransition.isSync ? new JSAnimation(options) : new AsyncMotionValueAnimation(options);
};
//#endregion
//#region node_modules/motion-dom/dist/es/render/dom/utils/camel-to-dash.mjs
function camelToDash(str) {
	return str.replace(/([A-Z])/g, (match) => `-${match.toLowerCase()}`);
}
var optimizedAppearDataAttribute = "data-" + camelToDash("framerAppearId");
//#endregion
//#region node_modules/motion-dom/dist/es/frameloop/microtask.mjs
var { schedule: microtask, cancel: cancelMicrotask } = /* @__PURE__ */ createRenderBatcher(queueMicrotask, false);
//#endregion
//#region node_modules/motion-dom/dist/es/gestures/drag/state/is-active.mjs
var isDragging = {
	x: false,
	y: false
};
function isDragActive() {
	return isDragging.x || isDragging.y;
}
//#endregion
//#region node_modules/motion-dom/dist/es/gestures/drag/state/set-active.mjs
function setDragLock(axis) {
	if (axis === "x" || axis === "y") if (isDragging[axis]) return null;
	else {
		isDragging[axis] = true;
		return () => {
			isDragging[axis] = false;
		};
	}
	else if (isDragging.x || isDragging.y) return null;
	else {
		isDragging.x = isDragging.y = true;
		return () => {
			isDragging.x = isDragging.y = false;
		};
	}
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/resolve-elements.mjs
function resolveElements(elementOrSelector, scope, selectorCache) {
	if (elementOrSelector == null) return [];
	if (elementOrSelector instanceof EventTarget) return [elementOrSelector];
	else if (typeof elementOrSelector === "string") {
		let root = document;
		if (scope) root = scope.current;
		const elements = selectorCache?.[elementOrSelector] ?? root.querySelectorAll(elementOrSelector);
		return elements ? Array.from(elements) : [];
	}
	return Array.from(elementOrSelector).filter((element) => element != null);
}
//#endregion
//#region node_modules/motion-dom/dist/es/gestures/utils/setup.mjs
function setupGesture(elementOrSelector, options) {
	const elements = resolveElements(elementOrSelector);
	const gestureAbortController = new AbortController();
	const eventOptions = {
		passive: true,
		...options,
		signal: gestureAbortController.signal
	};
	const cancel = () => gestureAbortController.abort();
	return [
		elements,
		eventOptions,
		cancel
	];
}
//#endregion
//#region node_modules/motion-dom/dist/es/gestures/hover.mjs
function isValidHover(event) {
	return !(event.pointerType === "touch" || isDragActive());
}
/**
* Create a hover gesture. hover() is different to .addEventListener("pointerenter")
* in that it has an easier syntax, filters out polyfilled touch events, interoperates
* with drag gestures, and automatically removes the "pointerennd" event listener when the hover ends.
*
* @public
*/
function hover(elementOrSelector, onHoverStart, options = {}) {
	const [elements, eventOptions, cancel] = setupGesture(elementOrSelector, options);
	elements.forEach((element) => {
		let isPressed = false;
		let deferredHoverEnd = false;
		let hoverEndCallback;
		const removePointerLeave = () => {
			element.removeEventListener("pointerleave", onPointerLeave);
		};
		const endHover = (event) => {
			if (hoverEndCallback) {
				hoverEndCallback(event);
				hoverEndCallback = void 0;
			}
			removePointerLeave();
		};
		const onPointerUp = (event) => {
			isPressed = false;
			window.removeEventListener("pointerup", onPointerUp);
			window.removeEventListener("pointercancel", onPointerUp);
			if (deferredHoverEnd) {
				deferredHoverEnd = false;
				endHover(event);
			}
		};
		const onPointerDown = () => {
			isPressed = true;
			window.addEventListener("pointerup", onPointerUp, eventOptions);
			window.addEventListener("pointercancel", onPointerUp, eventOptions);
		};
		const onPointerLeave = (leaveEvent) => {
			if (leaveEvent.pointerType === "touch") return;
			if (isPressed) {
				deferredHoverEnd = true;
				return;
			}
			endHover(leaveEvent);
		};
		const onPointerEnter = (enterEvent) => {
			if (!isValidHover(enterEvent)) return;
			deferredHoverEnd = false;
			const onHoverEnd = onHoverStart(element, enterEvent);
			if (typeof onHoverEnd !== "function") return;
			hoverEndCallback = onHoverEnd;
			element.addEventListener("pointerleave", onPointerLeave, eventOptions);
		};
		element.addEventListener("pointerenter", onPointerEnter, eventOptions);
		element.addEventListener("pointerdown", onPointerDown, eventOptions);
	});
	return cancel;
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/is-html-element.mjs
/**
* Checks if an element is an HTML element in a way
* that works across iframes
*/
function isHTMLElement(element) {
	return isObject(element) && "offsetHeight" in element && !("ownerSVGElement" in element);
}
//#endregion
//#region node_modules/motion-dom/dist/es/gestures/utils/is-node-or-child.mjs
/**
* Recursively traverse up the tree to check whether the provided child node
* is the parent or a descendant of it.
*
* @param parent - Element to find
* @param child - Element to test against parent
*/
var isNodeOrChild = (parent, child) => {
	if (!child) return false;
	else if (parent === child) return true;
	else return isNodeOrChild(parent, child.parentElement);
};
//#endregion
//#region node_modules/motion-dom/dist/es/gestures/utils/is-primary-pointer.mjs
var isPrimaryPointer = (event) => {
	if (event.pointerType === "mouse") return typeof event.button !== "number" || event.button <= 0;
	else
 /**
	* isPrimary is true for all mice buttons, whereas every touch point
	* is regarded as its own input. So subsequent concurrent touch points
	* will be false.
	*
	* Specifically match against false here as incomplete versions of
	* PointerEvents in very old browser might have it set as undefined.
	*/
	return event.isPrimary !== false;
};
//#endregion
//#region node_modules/motion-dom/dist/es/gestures/press/utils/is-keyboard-accessible.mjs
var keyboardAccessibleElements = /* @__PURE__ */ new Set([
	"BUTTON",
	"INPUT",
	"SELECT",
	"TEXTAREA",
	"A"
]);
/**
* Checks if an element is natively keyboard accessible (focusable).
* Used by the press gesture to determine if we need to add tabIndex.
*/
function isElementKeyboardAccessible(element) {
	return keyboardAccessibleElements.has(element.tagName) || element.isContentEditable === true;
}
var textInputElements = /* @__PURE__ */ new Set([
	"INPUT",
	"SELECT",
	"TEXTAREA"
]);
/**
* Checks if an element has text selection or direct interaction behavior
* that should block drag gestures from starting.
*
* This specifically targets form controls where the user might want to select
* text or interact with the control (e.g., sliders, dropdowns).
*
* Buttons and links are NOT included because they don't have click-and-move
* actions of their own - they only respond to click events, so dragging
* should still work when initiated from these elements.
*/
function isElementTextInput(element) {
	return textInputElements.has(element.tagName) || element.isContentEditable === true;
}
//#endregion
//#region node_modules/motion-dom/dist/es/gestures/press/utils/state.mjs
var isPressing = /* @__PURE__ */ new WeakSet();
//#endregion
//#region node_modules/motion-dom/dist/es/gestures/press/utils/keyboard.mjs
/**
* Filter out events that are not "Enter" keys.
*/
function filterEvents(callback) {
	return (event) => {
		if (event.key !== "Enter") return;
		callback(event);
	};
}
function firePointerEvent(target, type) {
	target.dispatchEvent(new PointerEvent("pointer" + type, {
		isPrimary: true,
		bubbles: true
	}));
}
var enableKeyboardPress = (focusEvent, eventOptions) => {
	const element = focusEvent.currentTarget;
	if (!element) return;
	const handleKeydown = filterEvents(() => {
		if (isPressing.has(element)) return;
		firePointerEvent(element, "down");
		const handleKeyup = filterEvents(() => {
			firePointerEvent(element, "up");
		});
		const handleBlur = () => firePointerEvent(element, "cancel");
		element.addEventListener("keyup", handleKeyup, eventOptions);
		element.addEventListener("blur", handleBlur, eventOptions);
	});
	element.addEventListener("keydown", handleKeydown, eventOptions);
	/**
	* Add an event listener that fires on blur to remove the keydown events.
	*/
	element.addEventListener("blur", () => element.removeEventListener("keydown", handleKeydown), eventOptions);
};
//#endregion
//#region node_modules/motion-dom/dist/es/gestures/press/index.mjs
/**
* Filter out events that are not primary pointer events, or are triggering
* while a Motion gesture is active.
*/
function isValidPressEvent(event) {
	return isPrimaryPointer(event) && !isDragActive();
}
var claimedPointerDownEvents = /* @__PURE__ */ new WeakSet();
/**
* Create a press gesture.
*
* Press is different to `"pointerdown"`, `"pointerup"` in that it
* automatically filters out secondary pointer events like right
* click and multitouch.
*
* It also adds accessibility support for keyboards, where
* an element with a press gesture will receive focus and
*  trigger on Enter `"keydown"` and `"keyup"` events.
*
* This is different to a browser's `"click"` event, which does
* respond to keyboards but only for the `"click"` itself, rather
* than the press start and end/cancel. The element also needs
* to be focusable for this to work, whereas a press gesture will
* make an element focusable by default.
*
* @public
*/
function press(targetOrSelector, onPressStart, options = {}) {
	const [targets, eventOptions, cancelEvents] = setupGesture(targetOrSelector, options);
	const startPress = (startEvent) => {
		const target = startEvent.currentTarget;
		if (!isValidPressEvent(startEvent)) return;
		if (claimedPointerDownEvents.has(startEvent)) return;
		isPressing.add(target);
		if (options.stopPropagation) claimedPointerDownEvents.add(startEvent);
		const onPressEnd = onPressStart(target, startEvent);
		/**
		* End listeners run in the capture phase so a descendant calling
		* stopPropagation() in its own pointerup handler can't prevent the
		* press gesture from ending. This also keeps the gesture-end
		* ordering consistent with the drag gesture. See #2794.
		*/
		const endEventOptions = {
			...eventOptions,
			capture: true
		};
		const onPointerEnd = (endEvent, success) => {
			window.removeEventListener("pointerup", onPointerUp, endEventOptions);
			window.removeEventListener("pointercancel", onPointerCancel, endEventOptions);
			if (isPressing.has(target)) isPressing.delete(target);
			if (!isValidPressEvent(endEvent)) return;
			if (typeof onPressEnd === "function") onPressEnd(endEvent, { success });
		};
		const onPointerUp = (upEvent) => {
			onPointerEnd(upEvent, target === window || target === document || options.useGlobalTarget || isNodeOrChild(target, upEvent.target));
		};
		const onPointerCancel = (cancelEvent) => {
			onPointerEnd(cancelEvent, false);
		};
		window.addEventListener("pointerup", onPointerUp, endEventOptions);
		window.addEventListener("pointercancel", onPointerCancel, endEventOptions);
	};
	targets.forEach((target) => {
		(options.useGlobalTarget ? window : target).addEventListener("pointerdown", startPress, eventOptions);
		if (isHTMLElement(target)) {
			target.addEventListener("focus", (event) => enableKeyboardPress(event, eventOptions));
			if (!isElementKeyboardAccessible(target) && !target.hasAttribute("tabindex")) target.tabIndex = 0;
		}
	});
	return cancelEvents;
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/is-svg-element.mjs
/**
* Checks if an element is an SVG element in a way
* that works across iframes
*/
function isSVGElement(element) {
	return isObject(element) && "ownerSVGElement" in element;
}
//#endregion
//#region node_modules/motion-dom/dist/es/resize/handle-element.mjs
var resizeHandlers = /* @__PURE__ */ new WeakMap();
var observer;
var getSize = (borderBoxAxis, svgAxis, htmlAxis) => (target, borderBoxSize) => {
	if (borderBoxSize && borderBoxSize[0]) return borderBoxSize[0][borderBoxAxis + "Size"];
	else if (isSVGElement(target) && "getBBox" in target) return target.getBBox()[svgAxis];
	else return target[htmlAxis];
};
var getWidth = /*@__PURE__*/ getSize("inline", "width", "offsetWidth");
var getHeight = /*@__PURE__*/ getSize("block", "height", "offsetHeight");
function notifyTarget({ target, borderBoxSize }) {
	resizeHandlers.get(target)?.forEach((handler) => {
		handler(target, {
			get width() {
				return getWidth(target, borderBoxSize);
			},
			get height() {
				return getHeight(target, borderBoxSize);
			}
		});
	});
}
function notifyAll(entries) {
	entries.forEach(notifyTarget);
}
function createResizeObserver() {
	if (typeof ResizeObserver === "undefined") return;
	observer = new ResizeObserver(notifyAll);
}
function resizeElement(target, handler) {
	if (!observer) createResizeObserver();
	const elements = resolveElements(target);
	elements.forEach((element) => {
		let elementHandlers = resizeHandlers.get(element);
		if (!elementHandlers) {
			elementHandlers = /* @__PURE__ */ new Set();
			resizeHandlers.set(element, elementHandlers);
		}
		elementHandlers.add(handler);
		observer?.observe(element);
	});
	return () => {
		elements.forEach((element) => {
			const elementHandlers = resizeHandlers.get(element);
			elementHandlers?.delete(handler);
			if (!elementHandlers?.size) observer?.unobserve(element);
		});
	};
}
//#endregion
//#region node_modules/motion-dom/dist/es/resize/handle-window.mjs
var windowCallbacks = /* @__PURE__ */ new Set();
var windowResizeHandler;
function createWindowResizeHandler() {
	windowResizeHandler = () => {
		const info = {
			get width() {
				return window.innerWidth;
			},
			get height() {
				return window.innerHeight;
			}
		};
		windowCallbacks.forEach((callback) => callback(info));
	};
	window.addEventListener("resize", windowResizeHandler);
}
function resizeWindow(callback) {
	windowCallbacks.add(callback);
	if (!windowResizeHandler) createWindowResizeHandler();
	return () => {
		windowCallbacks.delete(callback);
		if (!windowCallbacks.size && typeof windowResizeHandler === "function") {
			window.removeEventListener("resize", windowResizeHandler);
			windowResizeHandler = void 0;
		}
	};
}
//#endregion
//#region node_modules/motion-dom/dist/es/resize/index.mjs
function resize(a, b) {
	return typeof a === "function" ? resizeWindow(a) : resizeElement(a, b);
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/transform.mjs
function transform(...args) {
	const useImmediate = !Array.isArray(args[0]);
	const argOffset = useImmediate ? 0 : -1;
	const inputValue = args[0 + argOffset];
	const inputRange = args[1 + argOffset];
	const outputRange = args[2 + argOffset];
	const options = args[3 + argOffset];
	const interpolator = interpolate(inputRange, outputRange, options);
	return useImmediate ? interpolator(inputValue) : interpolator;
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/index.mjs
/**
* Maximum time between the value of two frames, beyond which we
* assume the velocity has since been 0.
*/
var MAX_VELOCITY_DELTA = 30;
var isFloat = (value) => {
	return !isNaN(parseFloat(value));
};
var collectMotionValues = { current: void 0 };
/**
* `MotionValue` is used to track the state and velocity of motion values.
*
* @public
*/
var MotionValue = class {
	/**
	* @param init - The initiating value
	* @param config - Optional configuration options
	*
	* -  `transformer`: A function to transform incoming values with.
	*/
	constructor(init, options = {}) {
		/**
		* Tracks whether this value can output a velocity. Currently this is only true
		* if the value is numerical, but we might be able to widen the scope here and support
		* other value types.
		*
		* @internal
		*/
		this.canTrackVelocity = null;
		/**
		* An object containing a SubscriptionManager for each active event.
		*/
		this.events = {};
		this.updateAndNotify = (v) => {
			const currentTime = time.now();
			/**
			* If we're updating the value during another frame or eventloop
			* than the previous frame, then the we set the previous frame value
			* to current.
			*/
			if (this.updatedAt !== currentTime) this.setPrevFrameValue();
			this.prev = this.current;
			this.setCurrent(v);
			if (this.current !== this.prev) {
				this.events.change?.notify(this.current);
				if (this.dependents) for (const dependent of this.dependents) dependent.dirty();
			}
		};
		this.hasAnimated = false;
		this.setCurrent(init);
		this.owner = options.owner;
	}
	setCurrent(current) {
		this.current = current;
		this.updatedAt = time.now();
		if (this.canTrackVelocity === null && current !== void 0) this.canTrackVelocity = isFloat(this.current);
	}
	setPrevFrameValue(prevFrameValue = this.current) {
		this.prevFrameValue = prevFrameValue;
		this.prevUpdatedAt = this.updatedAt;
	}
	/**
	* Adds a function that will be notified when the `MotionValue` is updated.
	*
	* It returns a function that, when called, will cancel the subscription.
	*
	* When calling `onChange` inside a React component, it should be wrapped with the
	* `useEffect` hook. As it returns an unsubscribe function, this should be returned
	* from the `useEffect` function to ensure you don't add duplicate subscribers..
	*
	* ```jsx
	* export const MyComponent = () => {
	*   const x = useMotionValue(0)
	*   const y = useMotionValue(0)
	*   const opacity = useMotionValue(1)
	*
	*   useEffect(() => {
	*     function updateOpacity() {
	*       const maxXY = Math.max(x.get(), y.get())
	*       const newOpacity = transform(maxXY, [0, 100], [1, 0])
	*       opacity.set(newOpacity)
	*     }
	*
	*     const unsubscribeX = x.on("change", updateOpacity)
	*     const unsubscribeY = y.on("change", updateOpacity)
	*
	*     return () => {
	*       unsubscribeX()
	*       unsubscribeY()
	*     }
	*   }, [])
	*
	*   return <motion.div style={{ x }} />
	* }
	* ```
	*
	* @param subscriber - A function that receives the latest value.
	* @returns A function that, when called, will cancel this subscription.
	*
	* @deprecated
	*/
	onChange(subscription) {
		return this.on("change", subscription);
	}
	on(eventName, callback) {
		if (!this.events[eventName]) this.events[eventName] = new SubscriptionManager();
		const unsubscribe = this.events[eventName].add(callback);
		if (eventName === "change") return () => {
			unsubscribe();
			/**
			* If we have no more change listeners by the start
			* of the next frame, stop active animations.
			*/
			frame.read(() => {
				if (!this.events.change.getSize()) this.stop();
			});
		};
		return unsubscribe;
	}
	clearListeners() {
		for (const eventManagers in this.events) this.events[eventManagers].clear();
	}
	/**
	* Attaches a passive effect to the `MotionValue`.
	*/
	attach(passiveEffect, stopPassiveEffect) {
		this.passiveEffect = passiveEffect;
		this.stopPassiveEffect = stopPassiveEffect;
	}
	/**
	* Sets the state of the `MotionValue`.
	*
	* @remarks
	*
	* ```jsx
	* const x = useMotionValue(0)
	* x.set(10)
	* ```
	*
	* @param latest - Latest value to set.
	* @param render - Whether to notify render subscribers. Defaults to `true`
	*
	* @public
	*/
	set(v) {
		if (!this.passiveEffect) this.updateAndNotify(v);
		else this.passiveEffect(v, this.updateAndNotify);
	}
	setWithVelocity(prev, current, delta) {
		this.set(current);
		this.prev = void 0;
		this.prevFrameValue = prev;
		this.prevUpdatedAt = this.updatedAt - delta;
	}
	/**
	* Set the state of the `MotionValue`, stopping any active animations,
	* effects, and resets velocity to `0`.
	*/
	jump(v, endAnimation = true) {
		this.updateAndNotify(v);
		this.prev = v;
		this.prevUpdatedAt = this.prevFrameValue = void 0;
		endAnimation && this.stop();
		if (this.stopPassiveEffect) this.stopPassiveEffect();
	}
	dirty() {
		this.events.change?.notify(this.current);
	}
	addDependent(dependent) {
		if (!this.dependents) this.dependents = /* @__PURE__ */ new Set();
		this.dependents.add(dependent);
	}
	removeDependent(dependent) {
		if (this.dependents) this.dependents.delete(dependent);
	}
	/**
	* Returns the latest state of `MotionValue`
	*
	* @returns - The latest state of `MotionValue`
	*
	* @public
	*/
	get() {
		if (collectMotionValues.current) collectMotionValues.current.push(this);
		return this.current;
	}
	/**
	* @public
	*/
	getPrevious() {
		return this.prev;
	}
	/**
	* Returns the latest velocity of `MotionValue`
	*
	* @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
	*
	* @public
	*/
	getVelocity() {
		const currentTime = time.now();
		if (!this.canTrackVelocity || this.prevFrameValue === void 0 || currentTime - this.updatedAt > MAX_VELOCITY_DELTA) return 0;
		const delta = Math.min(this.updatedAt - this.prevUpdatedAt, MAX_VELOCITY_DELTA);
		return /* @__PURE__ */ velocityPerSecond(parseFloat(this.current) - parseFloat(this.prevFrameValue), delta);
	}
	/**
	* Registers a new animation to control this `MotionValue`. Only one
	* animation can drive a `MotionValue` at one time.
	*
	* ```jsx
	* value.start()
	* ```
	*
	* @param animation - A function that starts the provided animation
	*/
	start(startAnimation) {
		this.stop();
		return new Promise((resolve) => {
			this.hasAnimated = true;
			this.animation = startAnimation(resolve);
			if (this.events.animationStart) this.events.animationStart.notify();
		}).then(() => {
			if (this.events.animationComplete) this.events.animationComplete.notify();
			this.clearAnimation();
		});
	}
	/**
	* Stop the currently active animation.
	*
	* @public
	*/
	stop() {
		if (this.animation) {
			this.animation.stop();
			if (this.events.animationCancel) this.events.animationCancel.notify();
		}
		this.clearAnimation();
	}
	/**
	* Returns `true` if this value is currently animating.
	*
	* @public
	*/
	isAnimating() {
		return !!this.animation;
	}
	clearAnimation() {
		delete this.animation;
	}
	/**
	* Destroy and clean up subscribers to this `MotionValue`.
	*
	* The `MotionValue` hooks like `useMotionValue` and `useTransform` automatically
	* handle the lifecycle of the returned `MotionValue`, so this method is only necessary if you've manually
	* created a `MotionValue` via the `motionValue` function.
	*
	* @public
	*/
	destroy() {
		this.dependents?.clear();
		this.events.destroy?.notify();
		this.clearListeners();
		this.stop();
		if (this.stopPassiveEffect) this.stopPassiveEffect();
	}
};
function motionValue(init, options) {
	return new MotionValue(init, options);
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/utils/is-motion-value.mjs
var isMotionValue = (value) => Boolean(value && value.getVelocity);
//#endregion
//#region node_modules/motion-dom/dist/es/value/will-change/is.mjs
function isWillChangeMotionValue(value) {
	return Boolean(isMotionValue(value) && value.add);
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/will-change/add-will-change.mjs
function addValueToWillChange(visualElement, key) {
	const willChange = visualElement.getValue("willChange");
	/**
	* It could be that a user has set willChange to a regular MotionValue,
	* in which case we can't add the value to it.
	*/
	if (isWillChangeMotionValue(willChange)) return willChange.add(key);
	else if (!willChange && MotionGlobalConfig.WillChange) {
		const newWillChange = new MotionGlobalConfig.WillChange("auto");
		visualElement.addValue("willChange", newWillChange);
		newWillChange.add(key);
	}
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/Feature.mjs
/**
* Feature base class for extending VisualElement functionality.
* Features are plugins that can be mounted/unmounted to add behavior
* like gestures, animations, or layout tracking.
*/
var Feature = class {
	constructor(node) {
		this.isMounted = false;
		this.node = node;
	}
	update() {}
};
//#endregion
//#region node_modules/motion-dom/dist/es/projection/geometry/conversion.mjs
/**
* Bounding boxes tend to be defined as top, left, right, bottom. For various operations
* it's easier to consider each axis individually. This function returns a bounding box
* as a map of single-axis min/max values.
*/
function convertBoundingBoxToBox({ top, left, right, bottom }) {
	return {
		x: {
			min: left,
			max: right
		},
		y: {
			min: top,
			max: bottom
		}
	};
}
function convertBoxToBoundingBox({ x, y }) {
	return {
		top: y.min,
		right: x.max,
		bottom: y.max,
		left: x.min
	};
}
/**
* Applies a TransformPoint function to a bounding box. TransformPoint is usually a function
* provided by Framer to allow measured points to be corrected for device scaling. This is used
* when measuring DOM elements and DOM event points.
*/
function transformBoxPoints(point, transformPoint) {
	if (!transformPoint) return point;
	const topLeft = transformPoint({
		x: point.left,
		y: point.top
	});
	const bottomRight = transformPoint({
		x: point.right,
		y: point.bottom
	});
	return {
		top: topLeft.y,
		left: topLeft.x,
		bottom: bottomRight.y,
		right: bottomRight.x
	};
}
//#endregion
//#region node_modules/motion-dom/dist/es/projection/utils/has-transform.mjs
function isIdentityScale(scale) {
	return scale === void 0 || scale === 1;
}
function hasScale({ scale, scaleX, scaleY }) {
	return !isIdentityScale(scale) || !isIdentityScale(scaleX) || !isIdentityScale(scaleY);
}
function hasTransform(values) {
	return hasScale(values) || has2DTranslate(values) || values.z || values.rotate || values.rotateX || values.rotateY || values.skewX || values.skewY;
}
function has2DTranslate(values) {
	return is2DTranslate(values.x) || is2DTranslate(values.y);
}
function is2DTranslate(value) {
	return value && value !== "0%";
}
//#endregion
//#region node_modules/motion-dom/dist/es/projection/geometry/delta-apply.mjs
/**
* Scales a point based on a factor and an originPoint
*/
function scalePoint(point, scale, originPoint) {
	return originPoint + scale * (point - originPoint);
}
/**
* Applies a translate/scale delta to a point
*/
function applyPointDelta(point, translate, scale, originPoint, boxScale) {
	if (boxScale !== void 0) point = scalePoint(point, boxScale, originPoint);
	return scalePoint(point, scale, originPoint) + translate;
}
/**
* Applies a translate/scale delta to an axis
*/
function applyAxisDelta(axis, translate = 0, scale = 1, originPoint, boxScale) {
	axis.min = applyPointDelta(axis.min, translate, scale, originPoint, boxScale);
	axis.max = applyPointDelta(axis.max, translate, scale, originPoint, boxScale);
}
/**
* Applies a translate/scale delta to a box
*/
function applyBoxDelta(box, { x, y }) {
	applyAxisDelta(box.x, x.translate, x.scale, x.originPoint);
	applyAxisDelta(box.y, y.translate, y.scale, y.originPoint);
}
var TREE_SCALE_SNAP_MIN = .999999999999;
var TREE_SCALE_SNAP_MAX = 1.0000000000001;
/**
* Apply a tree of deltas to a box. We do this to calculate the effect of all the transforms
* in a tree upon our box before then calculating how to project it into our desired viewport-relative box
*
* This is the final nested loop within updateLayoutDelta for future refactoring
*/
function applyTreeDeltas(box, treeScale, treePath, isSharedTransition = false) {
	const treeLength = treePath.length;
	if (!treeLength) return;
	treeScale.x = treeScale.y = 1;
	let node;
	let delta;
	for (let i = 0; i < treeLength; i++) {
		node = treePath[i];
		delta = node.projectionDelta;
		/**
		* TODO: Prefer to remove this, but currently we have motion components with
		* display: contents in Framer.
		*/
		const { visualElement } = node.options;
		if (visualElement && visualElement.props.style && visualElement.props.style.display === "contents") continue;
		if (isSharedTransition && node.options.layoutScroll && node.scroll && node !== node.root) {
			translateAxis(box.x, -node.scroll.offset.x);
			translateAxis(box.y, -node.scroll.offset.y);
		}
		if (delta) {
			treeScale.x *= delta.x.scale;
			treeScale.y *= delta.y.scale;
			applyBoxDelta(box, delta);
		}
		if (isSharedTransition && hasTransform(node.latestValues)) transformBox(box, node.latestValues, node.layout?.layoutBox);
	}
	/**
	* Snap tree scale back to 1 if it's within a non-perceivable threshold.
	* This will help reduce useless scales getting rendered.
	*/
	if (treeScale.x < TREE_SCALE_SNAP_MAX && treeScale.x > TREE_SCALE_SNAP_MIN) treeScale.x = 1;
	if (treeScale.y < TREE_SCALE_SNAP_MAX && treeScale.y > TREE_SCALE_SNAP_MIN) treeScale.y = 1;
}
function translateAxis(axis, distance) {
	axis.min += distance;
	axis.max += distance;
}
/**
* Apply a transform to an axis from the latest resolved motion values.
* This function basically acts as a bridge between a flat motion value map
* and applyAxisDelta
*/
function transformAxis(axis, axisTranslate, axisScale, boxScale, axisOrigin = .5) {
	applyAxisDelta(axis, axisTranslate, axisScale, mixNumber$1(axis.min, axis.max, axisOrigin), boxScale);
}
function resolveAxisTranslate(value, axis) {
	if (typeof value === "string") return parseFloat(value) / 100 * (axis.max - axis.min);
	return value;
}
/**
* Apply a transform to a box from the latest resolved motion values.
*/
function transformBox(box, transform, sourceBox) {
	const resolveBox = sourceBox ?? box;
	transformAxis(box.x, resolveAxisTranslate(transform.x, resolveBox.x), transform.scaleX, transform.scale, transform.originX);
	transformAxis(box.y, resolveAxisTranslate(transform.y, resolveBox.y), transform.scaleY, transform.scale, transform.originY);
}
//#endregion
//#region node_modules/motion-dom/dist/es/projection/utils/measure.mjs
function measureViewportBox(instance, transformPoint) {
	return convertBoundingBoxToBox(transformBoxPoints(instance.getBoundingClientRect(), transformPoint));
}
function measurePageBox(element, rootProjectionNode, transformPagePoint) {
	const viewportBox = measureViewportBox(element, transformPagePoint);
	const { scroll } = rootProjectionNode;
	if (scroll) {
		translateAxis(viewportBox.x, scroll.offset.x);
		translateAxis(viewportBox.y, scroll.offset.y);
	}
	return viewportBox;
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/keys-position.mjs
var positionalKeys = /* @__PURE__ */ new Set([
	"width",
	"height",
	"top",
	"left",
	"right",
	"bottom",
	...transformPropOrder
]);
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/auto.mjs
/**
* ValueType for "auto"
*/
var auto = {
	test: (v) => v === "auto",
	parse: (v) => v
};
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/test.mjs
/**
* Tests a provided value against a ValueType
*/
var testValueType = (v) => (type) => type.test(v);
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/dimensions.mjs
/**
* A list of value types commonly used for dimensions
*/
var dimensionValueTypes = [
	number,
	px,
	percent,
	degrees,
	vw,
	vh,
	auto
];
/**
* Tests a dimensional value against the list of dimension ValueTypes
*/
var findDimensionValueType = (v) => dimensionValueTypes.find(testValueType(v));
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/css-variables-conversion.mjs
/**
* Parse Framer's special CSS variable format into a CSS token and a fallback.
*
* ```
* `var(--foo, #fff)` => [`--foo`, '#fff']
* ```
*
* @param current
*/
var splitCSSVariableRegex = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;
function parseCSSVariable(current) {
	const match = splitCSSVariableRegex.exec(current);
	if (!match) return [,];
	const [, token1, token2, fallback] = match;
	return [`--${token1 ?? token2}`, fallback];
}
function getVariableValue(current, element, depth = 1) {
	`${current}`;
	const [token, fallback] = parseCSSVariable(current);
	if (!token) return;
	const resolved = window.getComputedStyle(element).getPropertyValue(token);
	if (resolved) {
		const trimmed = resolved.trim();
		return isNumericalString(trimmed) ? parseFloat(trimmed) : trimmed;
	}
	return isCSSVariableToken(fallback) ? getVariableValue(fallback, element, depth + 1) : fallback;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/utils/is-none.mjs
function isNone(value) {
	if (typeof value === "number") return value === 0;
	else if (value !== null) return value === "none" || value === "0" || isZeroValueString(value);
	else return true;
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/complex/filter.mjs
/**
* Properties that should default to 1 or 100%
*/
var maxDefaults = /* @__PURE__ */ new Set([
	"brightness",
	"contrast",
	"saturate",
	"opacity"
]);
function applyDefaultFilter(v) {
	const [name, value] = v.slice(0, -1).split("(");
	if (name === "drop-shadow") return v;
	const [number] = value.match(floatRegex) || [];
	if (!number) return v;
	const unit = value.replace(number, "");
	let defaultValue = maxDefaults.has(name) ? 1 : 0;
	if (number !== value) defaultValue *= 100;
	return name + "(" + defaultValue + unit + ")";
}
var functionRegex = /\b([a-z-]*)\(.*?\)/gu;
var filter = {
	...complex,
	getAnimatableNone: (v) => {
		const functions = v.match(functionRegex);
		return functions ? functions.map(applyDefaultFilter).join(" ") : v;
	}
};
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/complex/mask.mjs
var mask = {
	...complex,
	getAnimatableNone: (v) => {
		const parsed = complex.parse(v);
		return complex.createTransformer(v)(parsed.map((v) => typeof v === "number" ? 0 : typeof v === "object" ? {
			...v,
			alpha: 1
		} : v));
	}
};
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/int.mjs
var int = {
	...number,
	transform: Math.round
};
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/maps/number.mjs
var numberValueTypes = {
	borderWidth: px,
	borderTopWidth: px,
	borderRightWidth: px,
	borderBottomWidth: px,
	borderLeftWidth: px,
	borderRadius: px,
	borderTopLeftRadius: px,
	borderTopRightRadius: px,
	borderBottomRightRadius: px,
	borderBottomLeftRadius: px,
	width: px,
	maxWidth: px,
	height: px,
	maxHeight: px,
	top: px,
	right: px,
	bottom: px,
	left: px,
	inset: px,
	insetBlock: px,
	insetBlockStart: px,
	insetBlockEnd: px,
	insetInline: px,
	insetInlineStart: px,
	insetInlineEnd: px,
	padding: px,
	paddingTop: px,
	paddingRight: px,
	paddingBottom: px,
	paddingLeft: px,
	paddingBlock: px,
	paddingBlockStart: px,
	paddingBlockEnd: px,
	paddingInline: px,
	paddingInlineStart: px,
	paddingInlineEnd: px,
	margin: px,
	marginTop: px,
	marginRight: px,
	marginBottom: px,
	marginLeft: px,
	marginBlock: px,
	marginBlockStart: px,
	marginBlockEnd: px,
	marginInline: px,
	marginInlineStart: px,
	marginInlineEnd: px,
	fontSize: px,
	backgroundPositionX: px,
	backgroundPositionY: px,
	rotate: degrees,
	/**
	* Internal channel for `transition.path` orientToPath. Composed onto
	* `rotate` at the transform-build sites so the user's `rotate` is
	* never read or overwritten. Not part of `transformPropOrder`.
	*/
	pathRotation: degrees,
	rotateX: degrees,
	rotateY: degrees,
	rotateZ: degrees,
	scale,
	scaleX: scale,
	scaleY: scale,
	scaleZ: scale,
	skew: degrees,
	skewX: degrees,
	skewY: degrees,
	distance: px,
	translateX: px,
	translateY: px,
	translateZ: px,
	x: px,
	y: px,
	z: px,
	perspective: px,
	transformPerspective: px,
	opacity: alpha,
	originX: progressPercentage,
	originY: progressPercentage,
	originZ: px,
	zIndex: int,
	fillOpacity: alpha,
	strokeOpacity: alpha,
	numOctaves: int
};
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/maps/defaults.mjs
/**
* A map of default value types for common values
*/
var defaultValueTypes = {
	...numberValueTypes,
	color,
	backgroundColor: color,
	outlineColor: color,
	fill: color,
	stroke: color,
	borderColor: color,
	borderTopColor: color,
	borderRightColor: color,
	borderBottomColor: color,
	borderLeftColor: color,
	filter,
	WebkitFilter: filter,
	mask,
	WebkitMask: mask
};
/**
* Gets the default ValueType for the provided value key
*/
var getDefaultValueType = (key) => defaultValueTypes[key];
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/utils/animatable-none.mjs
var customTypes = /*@__PURE__*/ new Set([filter, mask]);
function getAnimatableNone(key, value) {
	let defaultValueType = getDefaultValueType(key);
	if (!customTypes.has(defaultValueType)) defaultValueType = complex;
	return defaultValueType.getAnimatableNone ? defaultValueType.getAnimatableNone(value) : void 0;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/utils/make-none-animatable.mjs
/**
* If we encounter keyframes like "none" or "0" and we also have keyframes like
* "#fff" or "200px 200px" we want to find a keyframe to serve as a template for
* the "none" keyframes. In this case "#fff" or "200px 200px" - then these get turned into
* zero equivalents, i.e. "#fff0" or "0px 0px".
*/
var invalidTemplates = /* @__PURE__ */ new Set([
	"auto",
	"none",
	"0"
]);
function makeNoneKeyframesAnimatable(unresolvedKeyframes, noneKeyframeIndexes, name) {
	let i = 0;
	let animatableTemplate = void 0;
	while (i < unresolvedKeyframes.length && !animatableTemplate) {
		const keyframe = unresolvedKeyframes[i];
		if (typeof keyframe === "string" && !invalidTemplates.has(keyframe) && analyseComplexValue(keyframe).values.length) animatableTemplate = unresolvedKeyframes[i];
		i++;
	}
	if (animatableTemplate && name) for (const noneIndex of noneKeyframeIndexes) unresolvedKeyframes[noneIndex] = getAnimatableNone(name, animatableTemplate);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/DOMKeyframesResolver.mjs
var DOMKeyframesResolver = class extends KeyframeResolver {
	constructor(unresolvedKeyframes, onComplete, name, motionValue, element) {
		super(unresolvedKeyframes, onComplete, name, motionValue, element, true);
	}
	readKeyframes() {
		const { unresolvedKeyframes, element, name } = this;
		if (!element || !element.current) return;
		super.readKeyframes();
		/**
		* If any keyframe is a CSS variable, we need to find its value by sampling the element
		*/
		for (let i = 0; i < unresolvedKeyframes.length; i++) {
			let keyframe = unresolvedKeyframes[i];
			if (typeof keyframe === "string") {
				keyframe = keyframe.trim();
				if (isCSSVariableToken(keyframe)) {
					const resolved = getVariableValue(keyframe, element.current);
					if (resolved !== void 0) unresolvedKeyframes[i] = resolved;
					if (i === unresolvedKeyframes.length - 1) this.finalKeyframe = keyframe;
				}
			}
		}
		/**
		* Resolve "none" values. We do this potentially twice - once before and once after measuring keyframes.
		* This could be seen as inefficient but it's a trade-off to avoid measurements in more situations, which
		* have a far bigger performance impact.
		*/
		this.resolveNoneKeyframes();
		/**
		* Check to see if unit type has changed. If so schedule jobs that will
		* temporarily set styles to the destination keyframes.
		* Skip if we have more than two keyframes or this isn't a positional value.
		* TODO: We can throw if there are multiple keyframes and the value type changes.
		*/
		if (!positionalKeys.has(name) || unresolvedKeyframes.length !== 2) return;
		const [origin, target] = unresolvedKeyframes;
		const originType = findDimensionValueType(origin);
		const targetType = findDimensionValueType(target);
		if (containsCSSVariable(origin) !== containsCSSVariable(target) && positionalValues[name]) {
			this.needsMeasurement = true;
			return;
		}
		/**
		* Either we don't recognise these value types or we can animate between them.
		*/
		if (originType === targetType) return;
		/**
		* If both values are numbers or pixels, we can animate between them by
		* converting them to numbers.
		*/
		if (isNumOrPxType(originType) && isNumOrPxType(targetType)) for (let i = 0; i < unresolvedKeyframes.length; i++) {
			const value = unresolvedKeyframes[i];
			if (typeof value === "string") unresolvedKeyframes[i] = parseFloat(value);
		}
		else if (positionalValues[name])
 /**
		* Else, the only way to resolve this is by measuring the element.
		*/
		this.needsMeasurement = true;
	}
	resolveNoneKeyframes() {
		const { unresolvedKeyframes, name } = this;
		const noneKeyframeIndexes = [];
		for (let i = 0; i < unresolvedKeyframes.length; i++) if (unresolvedKeyframes[i] === null || isNone(unresolvedKeyframes[i])) noneKeyframeIndexes.push(i);
		if (noneKeyframeIndexes.length) makeNoneKeyframesAnimatable(unresolvedKeyframes, noneKeyframeIndexes, name);
	}
	measureInitialState() {
		const { element, unresolvedKeyframes, name } = this;
		if (!element || !element.current) return;
		if (name === "height") this.suspendedScrollY = window.pageYOffset;
		this.measuredOrigin = positionalValues[name](element.measureViewportBox(), window.getComputedStyle(element.current));
		unresolvedKeyframes[0] = this.measuredOrigin;
		const measureKeyframe = unresolvedKeyframes[unresolvedKeyframes.length - 1];
		if (measureKeyframe !== void 0) element.getValue(name, measureKeyframe).jump(measureKeyframe, false);
	}
	measureEndState() {
		const { element, name, unresolvedKeyframes } = this;
		if (!element || !element.current) return;
		const value = element.getValue(name);
		value && value.jump(this.measuredOrigin, false);
		const finalKeyframeIndex = unresolvedKeyframes.length - 1;
		const finalKeyframe = unresolvedKeyframes[finalKeyframeIndex];
		unresolvedKeyframes[finalKeyframeIndex] = positionalValues[name](element.measureViewportBox(), window.getComputedStyle(element.current));
		if (finalKeyframe !== null && this.finalKeyframe === void 0) this.finalKeyframe = finalKeyframe;
		if (this.removedTransforms?.length) this.removedTransforms.forEach(([unsetTransformName, unsetTransformValue]) => {
			element.getValue(unsetTransformName).set(unsetTransformValue);
		});
		this.resolveNoneKeyframes();
	}
};
//#endregion
//#region node_modules/motion-dom/dist/es/projection/geometry/models.mjs
var createAxisDelta = () => ({
	translate: 0,
	scale: 1,
	origin: 0,
	originPoint: 0
});
var createDelta = () => ({
	x: createAxisDelta(),
	y: createAxisDelta()
});
var createAxis = () => ({
	min: 0,
	max: 0
});
var createBox = () => ({
	x: createAxis(),
	y: createAxis()
});
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/utils/find.mjs
/**
* A list of all ValueTypes
*/
var valueTypes = [
	...dimensionValueTypes,
	color,
	complex
];
/**
* Tests a value against the list of ValueTypes
*/
var findValueType = (v) => valueTypes.find(testValueType(v));
//#endregion
//#region node_modules/motion-dom/dist/es/render/store.mjs
var visualElementStore = /* @__PURE__ */ new WeakMap();
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/is-animation-controls.mjs
function isAnimationControls(v) {
	return v !== null && typeof v === "object" && typeof v.start === "function";
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/is-variant-label.mjs
/**
* Decides if the supplied variable is variant label
*/
function isVariantLabel(v) {
	return typeof v === "string" || Array.isArray(v);
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/variant-props.mjs
var variantPriorityOrder = [
	"animate",
	"whileInView",
	"whileFocus",
	"whileHover",
	"whileTap",
	"whileDrag",
	"exit"
];
var variantProps = ["initial", ...variantPriorityOrder];
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/is-controlling-variants.mjs
function isControllingVariants(props) {
	return isAnimationControls(props.animate) || variantProps.some((name) => isVariantLabel(props[name]));
}
function isVariantNode(props) {
	return Boolean(isControllingVariants(props) || props.variants);
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/motion-values.mjs
/**
* Updates motion values from props changes.
* Uses `any` type for element to avoid circular dependencies with VisualElement.
*/
function updateMotionValuesFromProps(element, next, prev) {
	for (const key in next) {
		const nextValue = next[key];
		const prevValue = prev[key];
		if (isMotionValue(nextValue))
 /**
		* If this is a motion value found in props or style, we want to add it
		* to our visual element's motion value map.
		*/
		element.addValue(key, nextValue);
		else if (isMotionValue(prevValue))
 /**
		* If we're swapping from a motion value to a static value,
		* create a new motion value from that
		*/
		element.addValue(key, motionValue(nextValue, { owner: element }));
		else if (prevValue !== nextValue)
 /**
		* If this is a flat value that has changed, update the motion value
		* or create one if it doesn't exist. We only want to do this if we're
		* not handling the value with our animation state.
		*/
		if (element.hasValue(key)) {
			const existingValue = element.getValue(key);
			if (existingValue.liveStyle === true) existingValue.jump(nextValue);
			else if (!existingValue.hasAnimated) existingValue.set(nextValue);
		} else {
			const latestValue = element.getStaticValue(key);
			element.addValue(key, motionValue(latestValue !== void 0 ? latestValue : nextValue, { owner: element }));
		}
	}
	for (const key in prev) if (next[key] === void 0) element.removeValue(key);
	return next;
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/reduced-motion/state.mjs
var prefersReducedMotion = { current: null };
var hasReducedMotionListener = { current: false };
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/reduced-motion/index.mjs
var isBrowser = typeof window !== "undefined";
function initPrefersReducedMotion() {
	hasReducedMotionListener.current = true;
	if (!isBrowser) return;
	if (window.matchMedia) {
		const motionMediaQuery = window.matchMedia("(prefers-reduced-motion)");
		const setReducedMotionPreferences = () => prefersReducedMotion.current = motionMediaQuery.matches;
		motionMediaQuery.addEventListener("change", setReducedMotionPreferences);
		setReducedMotionPreferences();
	} else prefersReducedMotion.current = false;
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/resolve-variants.mjs
function getValueState(visualElement) {
	const state = [{}, {}];
	visualElement?.values.forEach((value, key) => {
		state[0][key] = value.get();
		state[1][key] = value.getVelocity();
	});
	return state;
}
function resolveVariantFromProps(props, definition, custom, visualElement) {
	/**
	* If the variant definition is a function, resolve.
	*/
	if (typeof definition === "function") {
		const [current, velocity] = getValueState(visualElement);
		definition = definition(custom !== void 0 ? custom : props.custom, current, velocity);
	}
	/**
	* If the variant definition is a variant label, or
	* the function returned a variant label, resolve.
	*/
	if (typeof definition === "string") definition = props.variants && props.variants[definition];
	/**
	* At this point we've resolved both functions and variant labels,
	* but the resolved variant label might itself have been a function.
	* If so, resolve. This can only have returned a valid target object.
	*/
	if (typeof definition === "function") {
		const [current, velocity] = getValueState(visualElement);
		definition = definition(custom !== void 0 ? custom : props.custom, current, velocity);
	}
	return definition;
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/VisualElement.mjs
var propEventHandlers = [
	"AnimationStart",
	"AnimationComplete",
	"Update",
	"BeforeLayoutMeasure",
	"LayoutMeasure",
	"LayoutAnimationStart",
	"LayoutAnimationComplete"
];
/**
* Static feature definitions - can be injected by framework layer
*/
var featureDefinitions = {};
/**
* Set feature definitions for all VisualElements.
* This should be called by the framework layer (e.g., framer-motion) during initialization.
*/
function setFeatureDefinitions(definitions) {
	featureDefinitions = definitions;
}
/**
* Get the current feature definitions
*/
function getFeatureDefinitions() {
	return featureDefinitions;
}
/**
* A VisualElement is an imperative abstraction around UI elements such as
* HTMLElement, SVGElement, Three.Object3D etc.
*/
var VisualElement = class {
	/**
	* This method takes React props and returns found MotionValues. For example, HTML
	* MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
	*
	* This isn't an abstract method as it needs calling in the constructor, but it is
	* intended to be one.
	*/
	scrapeMotionValuesFromProps(_props, _prevProps, _visualElement) {
		return {};
	}
	constructor({ parent, props, presenceContext, reducedMotionConfig, skipAnimations, blockInitialAnimation, visualState }, options = {}) {
		/**
		* A reference to the current underlying Instance, e.g. a HTMLElement
		* or Three.Mesh etc.
		*/
		this.current = null;
		/**
		* A set containing references to this VisualElement's children.
		*/
		this.children = /* @__PURE__ */ new Set();
		/**
		* Determine what role this visual element should take in the variant tree.
		*/
		this.isVariantNode = false;
		this.isControllingVariants = false;
		/**
		* Decides whether this VisualElement should animate in reduced motion
		* mode.
		*
		* TODO: This is currently set on every individual VisualElement but feels
		* like it could be set globally.
		*/
		this.shouldReduceMotion = null;
		/**
		* Decides whether animations should be skipped for this VisualElement.
		* Useful for E2E tests and visual regression testing.
		*/
		this.shouldSkipAnimations = false;
		/**
		* A map of all motion values attached to this visual element. Motion
		* values are source of truth for any given animated value. A motion
		* value might be provided externally by the component via props.
		*/
		this.values = /* @__PURE__ */ new Map();
		this.KeyframeResolver = KeyframeResolver;
		/**
		* Cleanup functions for active features (hover/tap/exit etc)
		*/
		this.features = {};
		/**
		* A map of every subscription that binds the provided or generated
		* motion values onChange listeners to this visual element.
		*/
		this.valueSubscriptions = /* @__PURE__ */ new Map();
		/**
		* A reference to the previously-provided motion values as returned
		* from scrapeMotionValuesFromProps. We use the keys in here to determine
		* if any motion values need to be removed after props are updated.
		*/
		this.prevMotionValues = {};
		/**
		* Track whether this element has been mounted before, to detect
		* remounts after Suspense unmount/remount cycles.
		*/
		this.hasBeenMounted = false;
		/**
		* An object containing a SubscriptionManager for each active event.
		*/
		this.events = {};
		/**
		* An object containing an unsubscribe function for each prop event subscription.
		* For example, every "Update" event can have multiple subscribers via
		* VisualElement.on(), but only one of those can be defined via the onUpdate prop.
		*/
		this.propEventSubscriptions = {};
		this.notifyUpdate = () => this.notify("Update", this.latestValues);
		this.render = () => {
			if (!this.current) return;
			this.triggerBuild();
			this.renderInstance(this.current, this.renderState, this.props.style, this.projection);
		};
		this.renderScheduledAt = 0;
		this.scheduleRender = () => {
			const now = time.now();
			if (this.renderScheduledAt < now) {
				this.renderScheduledAt = now;
				frame.render(this.render, false, true);
			}
		};
		const { latestValues, renderState } = visualState;
		this.latestValues = latestValues;
		this.baseTarget = { ...latestValues };
		this.initialValues = props.initial ? { ...latestValues } : {};
		this.renderState = renderState;
		this.parent = parent;
		this.props = props;
		this.presenceContext = presenceContext;
		this.depth = parent ? parent.depth + 1 : 0;
		this.reducedMotionConfig = reducedMotionConfig;
		this.skipAnimationsConfig = skipAnimations;
		this.options = options;
		this.blockInitialAnimation = Boolean(blockInitialAnimation);
		this.isControllingVariants = isControllingVariants(props);
		this.isVariantNode = isVariantNode(props);
		if (this.isVariantNode) this.variantChildren = /* @__PURE__ */ new Set();
		this.manuallyAnimateOnMount = Boolean(parent && parent.current);
		/**
		* Any motion values that are provided to the element when created
		* aren't yet bound to the element, as this would technically be impure.
		* However, we iterate through the motion values and set them to the
		* initial values for this component.
		*
		* TODO: This is impure and we should look at changing this to run on mount.
		* Doing so will break some tests but this isn't necessarily a breaking change,
		* more a reflection of the test.
		*/
		const { willChange, ...initialMotionValues } = this.scrapeMotionValuesFromProps(props, {}, this);
		for (const key in initialMotionValues) {
			const value = initialMotionValues[key];
			if (latestValues[key] !== void 0 && isMotionValue(value)) value.set(latestValues[key]);
		}
	}
	mount(instance) {
		/**
		* If this element has been mounted before (e.g. after a Suspense
		* unmount/remount), reset motion values to their initial state
		* so animations replay correctly from initial → animate.
		*/
		if (this.hasBeenMounted) for (const key in this.initialValues) {
			this.values.get(key)?.jump(this.initialValues[key]);
			this.latestValues[key] = this.initialValues[key];
		}
		this.current = instance;
		visualElementStore.set(instance, this);
		if (this.projection && !this.projection.instance) this.projection.mount(instance);
		if (this.parent && this.isVariantNode && !this.isControllingVariants) this.removeFromVariantTree = this.parent.addVariantChild(this);
		this.values.forEach((value, key) => this.bindToMotionValue(key, value));
		/**
		* Determine reduced motion preference. Only initialize the matchMedia
		* listener if we actually need the dynamic value (i.e., when config
		* is neither "never" nor "always").
		*/
		if (this.reducedMotionConfig === "never") this.shouldReduceMotion = false;
		else if (this.reducedMotionConfig === "always") this.shouldReduceMotion = true;
		else {
			if (!hasReducedMotionListener.current) initPrefersReducedMotion();
			this.shouldReduceMotion = prefersReducedMotion.current;
		}
		/**
		* Set whether animations should be skipped based on the config.
		*/
		this.shouldSkipAnimations = this.skipAnimationsConfig ?? false;
		this.parent?.addChild(this);
		this.update(this.props, this.presenceContext);
		this.hasBeenMounted = true;
	}
	unmount() {
		this.projection && this.projection.unmount();
		cancelFrame(this.notifyUpdate);
		cancelFrame(this.render);
		this.valueSubscriptions.forEach((remove) => remove());
		this.valueSubscriptions.clear();
		this.removeFromVariantTree && this.removeFromVariantTree();
		this.parent?.removeChild(this);
		for (const key in this.events) this.events[key].clear();
		for (const key in this.features) {
			const feature = this.features[key];
			if (feature) {
				feature.unmount();
				feature.isMounted = false;
			}
		}
		this.current = null;
	}
	addChild(child) {
		this.children.add(child);
		this.enteringChildren ?? (this.enteringChildren = /* @__PURE__ */ new Set());
		this.enteringChildren.add(child);
	}
	removeChild(child) {
		this.children.delete(child);
		this.enteringChildren && this.enteringChildren.delete(child);
	}
	bindToMotionValue(key, value) {
		if (this.valueSubscriptions.has(key)) this.valueSubscriptions.get(key)();
		if (value.accelerate && acceleratedValues.has(key) && this.current instanceof HTMLElement) {
			const { factory, keyframes, times, ease, duration } = value.accelerate;
			const animation = new NativeAnimation({
				element: this.current,
				name: key,
				keyframes,
				times,
				ease,
				duration: /* @__PURE__ */ secondsToMilliseconds(duration)
			});
			const cleanup = factory(animation);
			this.valueSubscriptions.set(key, () => {
				cleanup();
				animation.cancel();
			});
			return;
		}
		const valueIsTransform = transformProps.has(key);
		if (valueIsTransform && this.onBindTransform) this.onBindTransform();
		const removeOnChange = value.on("change", (latestValue) => {
			this.latestValues[key] = latestValue;
			this.props.onUpdate && frame.preRender(this.notifyUpdate);
			if (valueIsTransform && this.projection) this.projection.isTransformDirty = true;
			this.scheduleRender();
		});
		let removeSyncCheck;
		if (typeof window !== "undefined" && window.MotionCheckAppearSync) removeSyncCheck = window.MotionCheckAppearSync(this, key, value);
		this.valueSubscriptions.set(key, () => {
			removeOnChange();
			if (removeSyncCheck) removeSyncCheck();
		});
	}
	sortNodePosition(other) {
		/**
		* If these nodes aren't even of the same type we can't compare their depth.
		*/
		if (!this.current || !this.sortInstanceNodePosition || this.type !== other.type) return 0;
		return this.sortInstanceNodePosition(this.current, other.current);
	}
	updateFeatures() {
		let key = "animation";
		for (key in featureDefinitions) {
			const featureDefinition = featureDefinitions[key];
			if (!featureDefinition) continue;
			const { isEnabled, Feature: FeatureConstructor } = featureDefinition;
			/**
			* If this feature is enabled but not active, make a new instance.
			*/
			if (!this.features[key] && FeatureConstructor && isEnabled(this.props)) this.features[key] = new FeatureConstructor(this);
			/**
			* If we have a feature, mount or update it.
			*/
			if (this.features[key]) {
				const feature = this.features[key];
				if (feature.isMounted) feature.update();
				else {
					feature.mount();
					feature.isMounted = true;
				}
			}
		}
	}
	triggerBuild() {
		this.build(this.renderState, this.latestValues, this.props);
	}
	/**
	* Measure the current viewport box with or without transforms.
	* Only measures axis-aligned boxes, rotate and skew must be manually
	* removed with a re-render to work.
	*/
	measureViewportBox() {
		return this.current ? this.measureInstanceViewportBox(this.current, this.props) : createBox();
	}
	getStaticValue(key) {
		return this.latestValues[key];
	}
	setStaticValue(key, value) {
		this.latestValues[key] = value;
	}
	/**
	* Update the provided props. Ensure any newly-added motion values are
	* added to our map, old ones removed, and listeners updated.
	*/
	update(props, presenceContext) {
		if (props.transformTemplate || this.props.transformTemplate) this.scheduleRender();
		this.prevProps = this.props;
		this.props = props;
		this.prevPresenceContext = this.presenceContext;
		this.presenceContext = presenceContext;
		/**
		* Update prop event handlers ie onAnimationStart, onAnimationComplete
		*/
		for (let i = 0; i < propEventHandlers.length; i++) {
			const key = propEventHandlers[i];
			if (this.propEventSubscriptions[key]) {
				this.propEventSubscriptions[key]();
				delete this.propEventSubscriptions[key];
			}
			const listener = props["on" + key];
			if (listener) this.propEventSubscriptions[key] = this.on(key, listener);
		}
		this.prevMotionValues = updateMotionValuesFromProps(this, this.scrapeMotionValuesFromProps(props, this.prevProps || {}, this), this.prevMotionValues);
		if (this.handleChildMotionValue) this.handleChildMotionValue();
	}
	getProps() {
		return this.props;
	}
	/**
	* Returns the variant definition with a given name.
	*/
	getVariant(name) {
		return this.props.variants ? this.props.variants[name] : void 0;
	}
	/**
	* Returns the defined default transition on this component.
	*/
	getDefaultTransition() {
		return this.props.transition;
	}
	getTransformPagePoint() {
		return this.props.transformPagePoint;
	}
	getClosestVariantNode() {
		return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
	}
	/**
	* Add a child visual element to our set of children.
	*/
	addVariantChild(child) {
		const closestVariantNode = this.getClosestVariantNode();
		if (closestVariantNode) {
			closestVariantNode.variantChildren && closestVariantNode.variantChildren.add(child);
			return () => closestVariantNode.variantChildren.delete(child);
		}
	}
	/**
	* Add a motion value and bind it to this visual element.
	*/
	addValue(key, value) {
		const existingValue = this.values.get(key);
		if (value !== existingValue) {
			if (existingValue) this.removeValue(key);
			this.bindToMotionValue(key, value);
			this.values.set(key, value);
			this.latestValues[key] = value.get();
		}
	}
	/**
	* Remove a motion value and unbind any active subscriptions.
	*/
	removeValue(key) {
		this.values.delete(key);
		const unsubscribe = this.valueSubscriptions.get(key);
		if (unsubscribe) {
			unsubscribe();
			this.valueSubscriptions.delete(key);
		}
		delete this.latestValues[key];
		this.removeValueFromRenderState(key, this.renderState);
	}
	/**
	* Check whether we have a motion value for this key
	*/
	hasValue(key) {
		return this.values.has(key);
	}
	getValue(key, defaultValue) {
		if (this.props.values && this.props.values[key]) return this.props.values[key];
		let value = this.values.get(key);
		if (value === void 0 && defaultValue !== void 0) {
			value = motionValue(defaultValue === null ? void 0 : defaultValue, { owner: this });
			this.addValue(key, value);
		}
		return value;
	}
	/**
	* If we're trying to animate to a previously unencountered value,
	* we need to check for it in our state and as a last resort read it
	* directly from the instance (which might have performance implications).
	*/
	readValue(key, target) {
		let value = this.latestValues[key] !== void 0 || !this.current ? this.latestValues[key] : this.getBaseTargetFromProps(this.props, key) ?? this.readValueFromInstance(this.current, key, this.options);
		if (value !== void 0 && value !== null) {
			if (typeof value === "string" && (isNumericalString(value) || isZeroValueString(value))) value = parseFloat(value);
			else if (!findValueType(value) && complex.test(target)) value = getAnimatableNone(key, target);
			this.setBaseTarget(key, isMotionValue(value) ? value.get() : value);
		}
		return isMotionValue(value) ? value.get() : value;
	}
	/**
	* Set the base target to later animate back to. This is currently
	* only hydrated on creation and when we first read a value.
	*/
	setBaseTarget(key, value) {
		this.baseTarget[key] = value;
	}
	/**
	* Find the base target for a value thats been removed from all animation
	* props.
	*/
	getBaseTarget(key) {
		const { initial } = this.props;
		let valueFromInitial;
		if (typeof initial === "string" || typeof initial === "object") {
			const variant = resolveVariantFromProps(this.props, initial, this.presenceContext?.custom);
			if (variant) valueFromInitial = variant[key];
		}
		/**
		* If this value still exists in the current initial variant, read that.
		*/
		if (initial && valueFromInitial !== void 0) return valueFromInitial;
		/**
		* Alternatively, if this VisualElement config has defined a getBaseTarget
		* so we can read the value from an alternative source, try that.
		*/
		const target = this.getBaseTargetFromProps(this.props, key);
		if (target !== void 0 && !isMotionValue(target)) return target;
		/**
		* If the value was initially defined on initial, but it doesn't any more,
		* return undefined. Otherwise return the value as initially read from the DOM.
		*/
		return this.initialValues[key] !== void 0 && valueFromInitial === void 0 ? void 0 : this.baseTarget[key];
	}
	on(eventName, callback) {
		if (!this.events[eventName]) this.events[eventName] = new SubscriptionManager();
		return this.events[eventName].add(callback);
	}
	notify(eventName, ...args) {
		if (this.events[eventName]) this.events[eventName].notify(...args);
	}
	scheduleRenderMicrotask() {
		microtask.render(this.render);
	}
};
//#endregion
//#region node_modules/motion-dom/dist/es/render/dom/DOMVisualElement.mjs
var DOMVisualElement = class extends VisualElement {
	constructor() {
		super(...arguments);
		this.KeyframeResolver = DOMKeyframesResolver;
	}
	sortInstanceNodePosition(a, b) {
		/**
		* compareDocumentPosition returns a bitmask, by using the bitwise &
		* we're returning true if 2 in that bitmask is set to true. 2 is set
		* to true if b preceeds a.
		*/
		return a.compareDocumentPosition(b) & 2 ? 1 : -1;
	}
	getBaseTargetFromProps(props, key) {
		const style = props.style;
		return style ? style[key] : void 0;
	}
	removeValueFromRenderState(key, { vars, style }) {
		delete vars[key];
		delete style[key];
	}
	handleChildMotionValue() {
		if (this.childSubscription) {
			this.childSubscription();
			delete this.childSubscription;
		}
		const { children } = this.props;
		if (isMotionValue(children)) this.childSubscription = children.on("change", (latest) => {
			if (this.current) this.current.textContent = `${latest}`;
		});
	}
};
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/utils/get-as-type.mjs
/**
* Provided a value and a ValueType, returns the value as that value type.
*/
var getValueAsType = (value, type) => {
	return type && typeof value === "number" ? type.transform(value) : value;
};
//#endregion
//#region node_modules/motion-dom/dist/es/render/html/utils/build-transform.mjs
var translateAlias = {
	x: "translateX",
	y: "translateY",
	z: "translateZ",
	transformPerspective: "perspective"
};
var numTransforms = transformPropOrder.length;
/**
* Build a CSS transform style from individual x/y/scale etc properties.
*
* This outputs with a default order of transforms/scales/rotations, this can be customised by
* providing a transformTemplate function.
*/
function buildTransform(latestValues, transform, transformTemplate) {
	let transformString = "";
	let transformIsDefault = true;
	/**
	* Loop over all possible transforms in order, adding the ones that
	* are present to the transform string.
	*/
	for (let i = 0; i < numTransforms; i++) {
		const key = transformPropOrder[i];
		const value = latestValues[key];
		if (value === void 0) continue;
		let valueIsDefault = true;
		if (typeof value === "number") valueIsDefault = value === (key.startsWith("scale") ? 1 : 0);
		else {
			const parsed = parseFloat(value);
			valueIsDefault = key.startsWith("scale") ? parsed === 1 : parsed === 0;
		}
		if (!valueIsDefault || transformTemplate) {
			const valueAsType = getValueAsType(value, numberValueTypes[key]);
			if (!valueIsDefault) {
				transformIsDefault = false;
				const transformName = translateAlias[key] || key;
				transformString += `${transformName}(${valueAsType}) `;
			}
			if (transformTemplate) transform[key] = valueAsType;
		}
	}
	const pathRotation = latestValues.pathRotation;
	if (pathRotation) {
		transformIsDefault = false;
		transformString += `rotate(${getValueAsType(pathRotation, numberValueTypes.pathRotation)}) `;
	}
	transformString = transformString.trim();
	if (transformTemplate) transformString = transformTemplate(transform, transformIsDefault ? "" : transformString);
	else if (transformIsDefault) transformString = "none";
	return transformString;
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/html/utils/build-styles.mjs
function buildHTMLStyles(state, latestValues, transformTemplate) {
	const { style, vars, transformOrigin } = state;
	let hasTransform = false;
	let hasTransformOrigin = false;
	/**
	* Loop over all our latest animated values and decide whether to handle them
	* as a style or CSS variable.
	*
	* Transforms and transform origins are kept separately for further processing.
	*/
	for (const key in latestValues) {
		const value = latestValues[key];
		if (transformProps.has(key)) {
			hasTransform = true;
			continue;
		} else if (isCSSVariableName(key)) {
			vars[key] = value;
			continue;
		} else {
			const valueAsType = getValueAsType(value, numberValueTypes[key]);
			if (key.startsWith("origin")) {
				hasTransformOrigin = true;
				transformOrigin[key] = valueAsType;
			} else style[key] = valueAsType;
		}
	}
	if (!latestValues.transform) {
		if (hasTransform || transformTemplate) style.transform = buildTransform(latestValues, state.transform, transformTemplate);
		else if (style.transform)
 /**
		* If we have previously created a transform but currently don't have any,
		* reset transform style to none.
		*/
		style.transform = "none";
	}
	/**
	* Build a transformOrigin style. Uses the same defaults as the browser for
	* undefined origins.
	*/
	if (hasTransformOrigin) {
		const { originX = "50%", originY = "50%", originZ = 0 } = transformOrigin;
		style.transformOrigin = `${originX} ${originY} ${originZ}`;
	}
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/html/utils/render.mjs
function renderHTML(element, { style, vars }, styleProp, projection) {
	const elementStyle = element.style;
	let key;
	for (key in style) elementStyle[key] = style[key];
	projection?.applyProjectionStyles(elementStyle, styleProp);
	for (key in vars) elementStyle.setProperty(key, vars[key]);
}
//#endregion
//#region node_modules/motion-dom/dist/es/projection/styles/scale-border-radius.mjs
function pixelsToPercent(pixels, axis) {
	if (axis.max === axis.min) return 0;
	return pixels / (axis.max - axis.min) * 100;
}
/**
* We always correct borderRadius as a percentage rather than pixels to reduce paints.
* For example, if you are projecting a box that is 100px wide with a 10px borderRadius
* into a box that is 200px wide with a 20px borderRadius, that is actually a 10%
* borderRadius in both states. If we animate between the two in pixels that will trigger
* a paint each time. If we animate between the two in percentage we'll avoid a paint.
*/
var correctBorderRadius = { correct: (latest, node) => {
	if (!node.target) return latest;
	/**
	* If latest is a string, if it's a percentage we can return immediately as it's
	* going to be stretched appropriately. Otherwise, if it's a pixel, convert it to a number.
	*/
	if (typeof latest === "string") if (px.test(latest)) latest = parseFloat(latest);
	else return latest;
	return `${pixelsToPercent(latest, node.target.x)}% ${pixelsToPercent(latest, node.target.y)}%`;
} };
//#endregion
//#region node_modules/motion-dom/dist/es/projection/styles/scale-box-shadow.mjs
var correctBoxShadow = { correct: (latest, { treeScale, projectionDelta }) => {
	const original = latest;
	const shadow = complex.parse(latest);
	if (shadow.length > 5) return original;
	const template = complex.createTransformer(latest);
	const offset = typeof shadow[0] !== "number" ? 1 : 0;
	const xScale = projectionDelta.x.scale * treeScale.x;
	const yScale = projectionDelta.y.scale * treeScale.y;
	shadow[0 + offset] /= xScale;
	shadow[1 + offset] /= yScale;
	/**
	* Ideally we'd correct x and y scales individually, but because blur and
	* spread apply to both we have to take a scale average and apply that instead.
	* We could potentially improve the outcome of this by incorporating the ratio between
	* the two scales.
	*/
	const averageScale = mixNumber$1(xScale, yScale, .5);
	if (typeof shadow[2 + offset] === "number") shadow[2 + offset] /= averageScale;
	if (typeof shadow[3 + offset] === "number") shadow[3 + offset] /= averageScale;
	return template(shadow);
} };
//#endregion
//#region node_modules/motion-dom/dist/es/projection/styles/scale-correction.mjs
var scaleCorrectors = {
	borderRadius: {
		...correctBorderRadius,
		applyTo: [
			"borderTopLeftRadius",
			"borderTopRightRadius",
			"borderBottomLeftRadius",
			"borderBottomRightRadius"
		]
	},
	borderTopLeftRadius: correctBorderRadius,
	borderTopRightRadius: correctBorderRadius,
	borderBottomLeftRadius: correctBorderRadius,
	borderBottomRightRadius: correctBorderRadius,
	boxShadow: correctBoxShadow
};
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/is-forced-motion-value.mjs
function isForcedMotionValue(key, { layout, layoutId }) {
	return transformProps.has(key) || key.startsWith("origin") || (layout || layoutId !== void 0) && (!!scaleCorrectors[key] || key === "opacity");
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/html/utils/scrape-motion-values.mjs
function scrapeMotionValuesFromProps$1(props, prevProps, visualElement) {
	const style = props.style;
	const prevStyle = prevProps?.style;
	const newValues = {};
	if (!style) return newValues;
	for (const key in style) if (isMotionValue(style[key]) || prevStyle && isMotionValue(prevStyle[key]) || isForcedMotionValue(key, props) || visualElement?.getValue(key)?.liveStyle !== void 0) newValues[key] = style[key];
	return newValues;
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/html/HTMLVisualElement.mjs
function getComputedStyle$1(element) {
	return window.getComputedStyle(element);
}
var HTMLVisualElement = class extends DOMVisualElement {
	constructor() {
		super(...arguments);
		this.type = "html";
		this.renderInstance = renderHTML;
	}
	readValueFromInstance(instance, key) {
		if (transformProps.has(key)) return this.projection?.isProjecting ? defaultTransformValue(key) : readTransformValue(instance, key);
		else {
			const computedStyle = getComputedStyle$1(instance);
			const value = (isCSSVariableName(key) ? computedStyle.getPropertyValue(key) : computedStyle[key]) || 0;
			return typeof value === "string" ? value.trim() : value;
		}
	}
	measureInstanceViewportBox(instance, { transformPagePoint }) {
		return measureViewportBox(instance, transformPagePoint);
	}
	build(renderState, latestValues, props) {
		buildHTMLStyles(renderState, latestValues, props.transformTemplate);
	}
	scrapeMotionValuesFromProps(props, prevProps, visualElement) {
		return scrapeMotionValuesFromProps$1(props, prevProps, visualElement);
	}
};
//#endregion
//#region node_modules/motion-dom/dist/es/render/svg/utils/path.mjs
var dashKeys = {
	offset: "stroke-dashoffset",
	array: "stroke-dasharray"
};
var camelKeys = {
	offset: "strokeDashoffset",
	array: "strokeDasharray"
};
/**
* Build SVG path properties. Uses the path's measured length to convert
* our custom pathLength, pathSpacing and pathOffset into stroke-dashoffset
* and stroke-dasharray attributes.
*
* This function is mutative to reduce per-frame GC.
*
* Note: We use unitless values for stroke-dasharray and stroke-dashoffset
* because Safari incorrectly scales px values when the page is zoomed.
*/
function buildSVGPath(attrs, length, spacing = 1, offset = 0, useDashCase = true) {
	attrs.pathLength = 1;
	const keys = useDashCase ? dashKeys : camelKeys;
	attrs[keys.offset] = `${-offset}`;
	attrs[keys.array] = `${length} ${spacing}`;
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/svg/utils/build-attrs.mjs
/**
* CSS Motion Path properties that should remain as CSS styles on SVG elements.
*/
var cssMotionPathProperties = [
	"offsetDistance",
	"offsetPath",
	"offsetRotate",
	"offsetAnchor"
];
/**
* Build SVG visual attributes, like cx and style.transform
*/
function buildSVGAttrs(state, { attrX, attrY, attrScale, pathLength, pathSpacing = 1, pathOffset = 0, ...latest }, isSVGTag, transformTemplate, styleProp) {
	buildHTMLStyles(state, latest, transformTemplate);
	/**
	* For svg tags we just want to make sure viewBox is animatable and treat all the styles
	* as normal HTML tags.
	*/
	if (isSVGTag) {
		if (state.style.viewBox) state.attrs.viewBox = state.style.viewBox;
		return;
	}
	state.attrs = state.style;
	state.style = {};
	const { attrs, style } = state;
	/**
	* However, we apply transforms as CSS transforms.
	* So if we detect a transform, transformOrigin we take it from attrs and copy it into style.
	*/
	if (attrs.transform) {
		style.transform = attrs.transform;
		delete attrs.transform;
	}
	if (style.transform || attrs.transformOrigin) {
		style.transformOrigin = attrs.transformOrigin ?? "50% 50%";
		delete attrs.transformOrigin;
	}
	if (style.transform) {
		/**
		* SVG's element transform-origin uses its own median as a reference.
		* Therefore, transformBox becomes a fill-box
		*/
		style.transformBox = styleProp?.transformBox ?? "fill-box";
		delete attrs.transformBox;
	}
	for (const key of cssMotionPathProperties) if (attrs[key] !== void 0) {
		style[key] = attrs[key];
		delete attrs[key];
	}
	if (attrX !== void 0) attrs.x = attrX;
	if (attrY !== void 0) attrs.y = attrY;
	if (attrScale !== void 0) attrs.scale = attrScale;
	if (pathLength !== void 0) buildSVGPath(attrs, pathLength, pathSpacing, pathOffset, false);
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/svg/utils/camel-case-attrs.mjs
/**
* A set of attribute names that are always read/written as camel case.
*/
var camelCaseAttributes = /* @__PURE__ */ new Set([
	"baseFrequency",
	"diffuseConstant",
	"kernelMatrix",
	"kernelUnitLength",
	"keySplines",
	"keyTimes",
	"limitingConeAngle",
	"markerHeight",
	"markerWidth",
	"numOctaves",
	"targetX",
	"targetY",
	"surfaceScale",
	"specularConstant",
	"specularExponent",
	"stdDeviation",
	"tableValues",
	"viewBox",
	"gradientTransform",
	"pathLength",
	"startOffset",
	"textLength",
	"lengthAdjust"
]);
//#endregion
//#region node_modules/motion-dom/dist/es/render/svg/utils/is-svg-tag.mjs
var isSVGTag = (tag) => typeof tag === "string" && tag.toLowerCase() === "svg";
//#endregion
//#region node_modules/motion-dom/dist/es/render/svg/utils/render.mjs
function renderSVG(element, renderState, _styleProp, projection) {
	renderHTML(element, renderState, void 0, projection);
	for (const key in renderState.attrs) element.setAttribute(!camelCaseAttributes.has(key) ? camelToDash(key) : key, renderState.attrs[key]);
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/svg/utils/scrape-motion-values.mjs
function scrapeMotionValuesFromProps(props, prevProps, visualElement) {
	const newValues = scrapeMotionValuesFromProps$1(props, prevProps, visualElement);
	for (const key in props) if (isMotionValue(props[key]) || isMotionValue(prevProps[key])) {
		const targetKey = transformPropOrder.indexOf(key) !== -1 ? "attr" + key.charAt(0).toUpperCase() + key.substring(1) : key;
		newValues[targetKey] = props[key];
	}
	return newValues;
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/svg/SVGVisualElement.mjs
var SVGVisualElement = class extends DOMVisualElement {
	constructor() {
		super(...arguments);
		this.type = "svg";
		this.isSVGTag = false;
		this.measureInstanceViewportBox = createBox;
	}
	getBaseTargetFromProps(props, key) {
		return props[key];
	}
	readValueFromInstance(instance, key) {
		if (transformProps.has(key)) {
			const defaultType = getDefaultValueType(key);
			return defaultType ? defaultType.default || 0 : 0;
		}
		key = !camelCaseAttributes.has(key) ? camelToDash(key) : key;
		return instance.getAttribute(key);
	}
	scrapeMotionValuesFromProps(props, prevProps, visualElement) {
		return scrapeMotionValuesFromProps(props, prevProps, visualElement);
	}
	build(renderState, latestValues, props) {
		buildSVGAttrs(renderState, latestValues, this.isSVGTag, props.transformTemplate, props.style);
	}
	renderInstance(instance, renderState, styleProp, projection) {
		renderSVG(instance, renderState, styleProp, projection);
	}
	mount(instance) {
		this.isSVGTag = isSVGTag(instance.tagName);
		super.mount(instance);
	}
};
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/resolve-dynamic-variants.mjs
function resolveVariant(visualElement, definition, custom) {
	const props = visualElement.getProps();
	return resolveVariantFromProps(props, definition, custom !== void 0 ? custom : props.custom, visualElement);
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/is-keyframes-target.mjs
var isKeyframesTarget = (v) => {
	return Array.isArray(v);
};
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/setters.mjs
/**
* Set VisualElement's MotionValue, creating a new MotionValue for it if
* it doesn't exist.
*/
function setMotionValue(visualElement, key, value) {
	if (visualElement.hasValue(key)) visualElement.getValue(key).set(value);
	else visualElement.addValue(key, motionValue(value));
}
function resolveFinalValueInKeyframes(v) {
	return isKeyframesTarget(v) ? v[v.length - 1] || 0 : v;
}
function setTarget(visualElement, definition) {
	let { transitionEnd = {}, transition = {}, ...target } = resolveVariant(visualElement, definition) || {};
	target = {
		...target,
		...transitionEnd
	};
	for (const key in target) setMotionValue(visualElement, key, resolveFinalValueInKeyframes(target[key]));
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/optimized-appear/get-appear-id.mjs
function getOptimisedAppearId(visualElement) {
	return visualElement.props[optimizedAppearDataAttribute];
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/interfaces/visual-element-target.mjs
/**
* Decide whether we should block this animation. Previously, we achieved this
* just by checking whether the key was listed in protectedKeys, but this
* posed problems if an animation was triggered by afterChildren and protectedKeys
* had been set to true in the meantime.
*/
function shouldBlockAnimation({ protectedKeys, needsAnimating }, key) {
	const shouldBlock = protectedKeys.hasOwnProperty(key) && needsAnimating[key] !== true;
	needsAnimating[key] = false;
	return shouldBlock;
}
function animateTarget(visualElement, targetAndTransition, { delay = 0, transitionOverride, type } = {}) {
	let { transition, transitionEnd, ...target } = targetAndTransition;
	const defaultTransition = visualElement.getDefaultTransition();
	transition = transition ? resolveTransition(transition, defaultTransition) : defaultTransition;
	const reduceMotion = transition?.reduceMotion;
	const skipAnimations = transition?.skipAnimations;
	if (transitionOverride) transition = transitionOverride;
	const animations = [];
	const animationTypeState = type && visualElement.animationState && visualElement.animationState.getState()[type];
	const path = transition?.path;
	if (path) path.animateVisualElement(visualElement, target, transition, delay, animations);
	for (const key in target) {
		const value = visualElement.getValue(key, visualElement.latestValues[key] ?? null);
		const valueTarget = target[key];
		if (valueTarget === void 0 || animationTypeState && shouldBlockAnimation(animationTypeState, key)) continue;
		const valueTransition = {
			delay,
			...getValueTransition(transition || {}, key)
		};
		if (skipAnimations) valueTransition.skipAnimations = true;
		/**
		* If the value is already at the defined target, skip the animation.
		* We still re-assert the value via frame.update to take precedence
		* over any stale transitionEnd callbacks from previous animations.
		*/
		const currentValue = value.get();
		if (currentValue !== void 0 && !value.isAnimating() && !Array.isArray(valueTarget) && valueTarget === currentValue && !valueTransition.velocity) {
			frame.update(() => value.set(valueTarget));
			continue;
		}
		/**
		* If this is the first time a value is being animated, check
		* to see if we're handling off from an existing animation.
		*/
		let isHandoff = false;
		if (window.MotionHandoffAnimation) {
			const appearId = getOptimisedAppearId(visualElement);
			if (appearId) {
				const startTime = window.MotionHandoffAnimation(appearId, key, frame);
				if (startTime !== null) {
					valueTransition.startTime = startTime;
					isHandoff = true;
				}
			}
		}
		addValueToWillChange(visualElement, key);
		const shouldReduceMotion = reduceMotion ?? visualElement.shouldReduceMotion;
		value.start(animateMotionValue(key, value, valueTarget, shouldReduceMotion && positionalKeys.has(key) ? { type: false } : valueTransition, visualElement, isHandoff));
		const animation = value.animation;
		if (animation) animations.push(animation);
	}
	if (transitionEnd) {
		const applyTransitionEnd = () => frame.update(() => {
			transitionEnd && setTarget(visualElement, transitionEnd);
		});
		if (animations.length) Promise.all(animations).then(applyTransitionEnd);
		else applyTransitionEnd();
	}
	return animations;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/calc-child-stagger.mjs
function calcChildStagger(children, child, delayChildren, staggerChildren = 0, staggerDirection = 1) {
	const index = Array.from(children).sort((a, b) => a.sortNodePosition(b)).indexOf(child);
	const numChildren = children.size;
	const maxStaggerDuration = (numChildren - 1) * staggerChildren;
	return typeof delayChildren === "function" ? delayChildren(index, numChildren) : staggerDirection === 1 ? index * staggerChildren : maxStaggerDuration - index * staggerChildren;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/interfaces/visual-element-variant.mjs
function animateVariant(visualElement, variant, options = {}) {
	const resolved = resolveVariant(visualElement, variant, options.type === "exit" ? visualElement.presenceContext?.custom : void 0);
	let { transition = visualElement.getDefaultTransition() || {} } = resolved || {};
	if (options.transitionOverride) transition = options.transitionOverride;
	/**
	* If we have a variant, create a callback that runs it as an animation.
	* Otherwise, we resolve a Promise immediately for a composable no-op.
	*/
	const getAnimation = resolved ? () => Promise.all(animateTarget(visualElement, resolved, options)) : () => Promise.resolve();
	/**
	* If we have children, create a callback that runs all their animations.
	* Otherwise, we resolve a Promise immediately for a composable no-op.
	*/
	const getChildAnimations = visualElement.variantChildren && visualElement.variantChildren.size ? (forwardDelay = 0) => {
		const { delayChildren = 0, staggerChildren, staggerDirection } = transition;
		return animateChildren(visualElement, variant, forwardDelay, delayChildren, staggerChildren, staggerDirection, options);
	} : () => Promise.resolve();
	/**
	* If the transition explicitly defines a "when" option, we need to resolve either
	* this animation or all children animations before playing the other.
	*/
	const { when } = transition;
	if (when) {
		const [first, last] = when === "beforeChildren" ? [getAnimation, getChildAnimations] : [getChildAnimations, getAnimation];
		return first().then(() => last());
	} else return Promise.all([getAnimation(), getChildAnimations(options.delay)]);
}
function animateChildren(visualElement, variant, delay = 0, delayChildren = 0, staggerChildren = 0, staggerDirection = 1, options) {
	const animations = [];
	for (const child of visualElement.variantChildren) {
		child.notify("AnimationStart", variant);
		animations.push(animateVariant(child, variant, {
			...options,
			delay: delay + (typeof delayChildren === "function" ? 0 : delayChildren) + calcChildStagger(visualElement.variantChildren, child, delayChildren, staggerChildren, staggerDirection)
		}).then(() => child.notify("AnimationComplete", variant)));
	}
	return Promise.all(animations);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/interfaces/visual-element.mjs
function animateVisualElement(visualElement, definition, options = {}) {
	visualElement.notify("AnimationStart", definition);
	let animation;
	if (Array.isArray(definition)) {
		const animations = definition.map((variant) => animateVariant(visualElement, variant, options));
		animation = Promise.all(animations);
	} else if (typeof definition === "string") animation = animateVariant(visualElement, definition, options);
	else {
		const resolvedDefinition = typeof definition === "function" ? resolveVariant(visualElement, definition, options.custom) : definition;
		animation = Promise.all(animateTarget(visualElement, resolvedDefinition, options));
	}
	return animation.then(() => {
		visualElement.notify("AnimationComplete", definition);
	});
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/get-variant-context.mjs
var numVariantProps = variantProps.length;
/**
* Get variant context from a visual element's parent chain.
* Uses `any` type for visualElement to avoid circular dependencies.
*/
function getVariantContext(visualElement) {
	if (!visualElement) return void 0;
	if (!visualElement.isControllingVariants) {
		const context = visualElement.parent ? getVariantContext(visualElement.parent) || {} : {};
		if (visualElement.props.initial !== void 0) context.initial = visualElement.props.initial;
		return context;
	}
	const context = {};
	for (let i = 0; i < numVariantProps; i++) {
		const name = variantProps[i];
		const prop = visualElement.props[name];
		if (isVariantLabel(prop) || prop === false) context[name] = prop;
	}
	return context;
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/shallow-compare.mjs
function shallowCompare(next, prev) {
	if (!Array.isArray(prev)) return false;
	const prevLength = prev.length;
	if (prevLength !== next.length) return false;
	for (let i = 0; i < prevLength; i++) if (prev[i] !== next[i]) return false;
	return true;
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/animation-state.mjs
var reversePriorityOrder = [...variantPriorityOrder].reverse();
var numAnimationTypes = variantPriorityOrder.length;
function createAnimateFunction(visualElement) {
	return (animations) => {
		return Promise.all(animations.map(({ animation, options }) => animateVisualElement(visualElement, animation, options)));
	};
}
function createAnimationState(visualElement) {
	let animate = createAnimateFunction(visualElement);
	let state = createState();
	let isInitialRender = true;
	/**
	* Track whether the animation state has been reset (e.g. via StrictMode
	* double-invocation or Suspense unmount/remount). On the first
	* animateChanges() call after a reset we need to behave like the initial
	* render for variant-inheritance checks, even though isInitialRender is
	* already false.
	*/
	let wasReset = false;
	/**
	* This function will be used to reduce the animation definitions for
	* each active animation type into an object of resolved values for it.
	*/
	const buildResolvedTypeValues = (type) => (acc, definition) => {
		const resolved = resolveVariant(visualElement, definition, type === "exit" ? visualElement.presenceContext?.custom : void 0);
		if (resolved) {
			const { transition, transitionEnd, ...target } = resolved;
			acc = {
				...acc,
				...target,
				...transitionEnd
			};
		}
		return acc;
	};
	/**
	* This just allows us to inject mocked animation functions
	* @internal
	*/
	function setAnimateFunction(makeAnimator) {
		animate = makeAnimator(visualElement);
	}
	/**
	* When we receive new props, we need to:
	* 1. Create a list of protected keys for each type. This is a directory of
	*    value keys that are currently being "handled" by types of a higher priority
	*    so that whenever an animation is played of a given type, these values are
	*    protected from being animated.
	* 2. Determine if an animation type needs animating.
	* 3. Determine if any values have been removed from a type and figure out
	*    what to animate those to.
	*/
	function animateChanges(changedActiveType) {
		const { props } = visualElement;
		const context = getVariantContext(visualElement.parent) || {};
		/**
		* A list of animations that we'll build into as we iterate through the animation
		* types. This will get executed at the end of the function.
		*/
		const animations = [];
		/**
		* Keep track of which values have been removed. Then, as we hit lower priority
		* animation types, we can check if they contain removed values and animate to that.
		*/
		const removedKeys = /* @__PURE__ */ new Set();
		/**
		* A dictionary of all encountered keys. This is an object to let us build into and
		* copy it without iteration. Each time we hit an animation type we set its protected
		* keys - the keys its not allowed to animate - to the latest version of this object.
		*/
		let encounteredKeys = {};
		/**
		* If a variant has been removed at a given index, and this component is controlling
		* variant animations, we want to ensure lower-priority variants are forced to animate.
		*/
		let removedVariantIndex = Infinity;
		/**
		* Iterate through all animation types in reverse priority order. For each, we want to
		* detect which values it's handling and whether or not they've changed (and therefore
		* need to be animated). If any values have been removed, we want to detect those in
		* lower priority props and flag for animation.
		*/
		for (let i = 0; i < numAnimationTypes; i++) {
			const type = reversePriorityOrder[i];
			const typeState = state[type];
			const prop = props[type] !== void 0 ? props[type] : context[type];
			const propIsVariant = isVariantLabel(prop);
			/**
			* If this type has *just* changed isActive status, set activeDelta
			* to that status. Otherwise set to null.
			*/
			const activeDelta = type === changedActiveType ? typeState.isActive : null;
			if (activeDelta === false) removedVariantIndex = i;
			/**
			* If this prop is an inherited variant, rather than been set directly on the
			* component itself, we want to make sure we allow the parent to trigger animations.
			*
			* TODO: Can probably change this to a !isControllingVariants check
			*/
			let isInherited = prop === context[type] && prop !== props[type] && propIsVariant;
			if (isInherited && (isInitialRender || wasReset) && visualElement.manuallyAnimateOnMount) isInherited = false;
			/**
			* Set all encountered keys so far as the protected keys for this type. This will
			* be any key that has been animated or otherwise handled by active, higher-priortiy types.
			*/
			typeState.protectedKeys = { ...encounteredKeys };
			if (!typeState.isActive && activeDelta === null || !prop && !typeState.prevProp || isAnimationControls(prop) || typeof prop === "boolean") continue;
			/**
			* If exit is already active and wasn't just activated, skip
			* re-processing to prevent interrupting running exit animations.
			* Re-resolving exit with a changed custom value can start new
			* value animations that stop the originals, leaving the exit
			* animation promise unresolved and the component stuck in the DOM.
			*/
			if (type === "exit" && typeState.isActive && activeDelta !== true) {
				if (typeState.prevResolvedValues) encounteredKeys = {
					...encounteredKeys,
					...typeState.prevResolvedValues
				};
				continue;
			}
			/**
			* As we go look through the values defined on this type, if we detect
			* a changed value or a value that was removed in a higher priority, we set
			* this to true and add this prop to the animation list.
			*/
			const variantDidChange = checkVariantsDidChange(typeState.prevProp, prop);
			let shouldAnimateType = variantDidChange || type === changedActiveType && typeState.isActive && !isInherited && propIsVariant || i > removedVariantIndex && propIsVariant;
			let handledRemovedValues = false;
			/**
			* As animations can be set as variant lists, variants or target objects, we
			* coerce everything to an array if it isn't one already
			*/
			const definitionList = Array.isArray(prop) ? prop : [prop];
			/**
			* Build an object of all the resolved values. We'll use this in the subsequent
			* animateChanges calls to determine whether a value has changed.
			*/
			let resolvedValues = definitionList.reduce(buildResolvedTypeValues(type), {});
			if (activeDelta === false) resolvedValues = {};
			/**
			* Now we need to loop through all the keys in the prev prop and this prop,
			* and decide:
			* 1. If the value has changed, and needs animating
			* 2. If it has been removed, and needs adding to the removedKeys set
			* 3. If it has been removed in a higher priority type and needs animating
			* 4. If it hasn't been removed in a higher priority but hasn't changed, and
			*    needs adding to the type's protectedKeys list.
			*/
			const { prevResolvedValues = {} } = typeState;
			const allKeys = {
				...prevResolvedValues,
				...resolvedValues
			};
			const markToAnimate = (key) => {
				shouldAnimateType = true;
				if (removedKeys.has(key)) {
					handledRemovedValues = true;
					removedKeys.delete(key);
				}
				typeState.needsAnimating[key] = true;
				const motionValue = visualElement.getValue(key);
				if (motionValue) motionValue.liveStyle = false;
			};
			for (const key in allKeys) {
				const next = resolvedValues[key];
				const prev = prevResolvedValues[key];
				if (encounteredKeys.hasOwnProperty(key)) continue;
				/**
				* If the value has changed, we probably want to animate it.
				*/
				let valueHasChanged = false;
				if (isKeyframesTarget(next) && isKeyframesTarget(prev)) valueHasChanged = !shallowCompare(next, prev) || variantDidChange;
				else valueHasChanged = next !== prev;
				if (valueHasChanged) if (next !== void 0 && next !== null) markToAnimate(key);
				else removedKeys.add(key);
				else if (next !== void 0 && removedKeys.has(key))
 /**
				* If next hasn't changed and it isn't undefined, we want to check if it's
				* been removed by a higher priority
				*/
				markToAnimate(key);
				else
 /**
				* If it hasn't changed, we add it to the list of protected values
				* to ensure it doesn't get animated.
				*/
				typeState.protectedKeys[key] = true;
			}
			/**
			* Update the typeState so next time animateChanges is called we can compare the
			* latest prop and resolvedValues to these.
			*/
			typeState.prevProp = prop;
			typeState.prevResolvedValues = resolvedValues;
			if (typeState.isActive) encounteredKeys = {
				...encounteredKeys,
				...resolvedValues
			};
			if ((isInitialRender || wasReset) && visualElement.blockInitialAnimation) shouldAnimateType = false;
			/**
			* If this is an inherited prop we want to skip this animation
			* unless the inherited variants haven't changed on this render.
			*/
			const willAnimateViaParent = isInherited && variantDidChange;
			if (shouldAnimateType && (!willAnimateViaParent || handledRemovedValues)) animations.push(...definitionList.map((animation) => {
				const options = { type };
				/**
				* If we're performing the initial animation, but we're not
				* rendering at the same time as the variant-controlling parent,
				* we want to use the parent's transition to calculate the stagger.
				*/
				if (typeof animation === "string" && (isInitialRender || wasReset) && !willAnimateViaParent && visualElement.manuallyAnimateOnMount && visualElement.parent) {
					const { parent } = visualElement;
					const parentVariant = resolveVariant(parent, animation);
					if (parent.enteringChildren && parentVariant) {
						const { delayChildren } = parentVariant.transition || {};
						options.delay = calcChildStagger(parent.enteringChildren, visualElement, delayChildren);
					}
				}
				return {
					animation,
					options
				};
			}));
		}
		/**
		* If there are some removed value that haven't been dealt with,
		* we need to create a new animation that falls back either to the value
		* defined in the style prop, or the last read value.
		*/
		if (removedKeys.size) {
			const fallbackAnimation = {};
			/**
			* If the initial prop contains a transition we can use that, otherwise
			* allow the animation function to use the visual element's default.
			*/
			if (typeof props.initial !== "boolean") {
				const initialTransition = resolveVariant(visualElement, Array.isArray(props.initial) ? props.initial[0] : props.initial);
				if (initialTransition && initialTransition.transition) fallbackAnimation.transition = initialTransition.transition;
			}
			removedKeys.forEach((key) => {
				const fallbackTarget = visualElement.getBaseTarget(key);
				const motionValue = visualElement.getValue(key);
				if (motionValue) motionValue.liveStyle = true;
				fallbackAnimation[key] = fallbackTarget ?? null;
			});
			animations.push({ animation: fallbackAnimation });
		}
		let shouldAnimate = Boolean(animations.length);
		if (isInitialRender && (props.initial === false || props.initial === props.animate) && !visualElement.manuallyAnimateOnMount) shouldAnimate = false;
		isInitialRender = false;
		wasReset = false;
		return shouldAnimate ? animate(animations) : Promise.resolve();
	}
	/**
	* Change whether a certain animation type is active.
	*/
	function setActive(type, isActive) {
		if (state[type].isActive === isActive) return Promise.resolve();
		visualElement.variantChildren?.forEach((child) => child.animationState?.setActive(type, isActive));
		state[type].isActive = isActive;
		const animations = animateChanges(type);
		for (const key in state) state[key].protectedKeys = {};
		return animations;
	}
	return {
		animateChanges,
		setActive,
		setAnimateFunction,
		getState: () => state,
		reset: () => {
			state = createState();
			wasReset = true;
		}
	};
}
function checkVariantsDidChange(prev, next) {
	if (typeof next === "string") return next !== prev;
	else if (Array.isArray(next)) return !shallowCompare(next, prev);
	return false;
}
function createTypeState(isActive = false) {
	return {
		isActive,
		protectedKeys: {},
		needsAnimating: {},
		prevResolvedValues: {}
	};
}
function createState() {
	return {
		animate: createTypeState(true),
		whileInView: createTypeState(),
		whileHover: createTypeState(),
		whileTap: createTypeState(),
		whileDrag: createTypeState(),
		whileFocus: createTypeState(),
		exit: createTypeState()
	};
}
//#endregion
//#region node_modules/motion-dom/dist/es/projection/geometry/delta-calc.mjs
var SCALE_MIN = .9999;
var SCALE_MAX = 1.0001;
var TRANSLATE_MIN = -.01;
var TRANSLATE_MAX = .01;
function calcLength(axis) {
	return axis.max - axis.min;
}
function isNear(value, target, maxDistance) {
	return Math.abs(value - target) <= maxDistance;
}
function calcAxisDelta(delta, source, target, origin = .5) {
	delta.origin = origin;
	delta.originPoint = mixNumber$1(source.min, source.max, delta.origin);
	delta.scale = calcLength(target) / calcLength(source);
	delta.translate = mixNumber$1(target.min, target.max, delta.origin) - delta.originPoint;
	if (delta.scale >= SCALE_MIN && delta.scale <= SCALE_MAX || isNaN(delta.scale)) delta.scale = 1;
	if (delta.translate >= TRANSLATE_MIN && delta.translate <= TRANSLATE_MAX || isNaN(delta.translate)) delta.translate = 0;
}
function calcBoxDelta(delta, source, target, origin) {
	calcAxisDelta(delta.x, source.x, target.x, origin ? origin.originX : void 0);
	calcAxisDelta(delta.y, source.y, target.y, origin ? origin.originY : void 0);
}
function calcRelativeAxis(target, relative, parent, anchor = 0) {
	target.min = (anchor ? mixNumber$1(parent.min, parent.max, anchor) : parent.min) + relative.min;
	target.max = target.min + calcLength(relative);
}
function calcRelativeBox(target, relative, parent, anchor) {
	calcRelativeAxis(target.x, relative.x, parent.x, anchor?.x);
	calcRelativeAxis(target.y, relative.y, parent.y, anchor?.y);
}
function calcRelativeAxisPosition(target, layout, parent, anchor = 0) {
	const anchorPoint = anchor ? mixNumber$1(parent.min, parent.max, anchor) : parent.min;
	target.min = layout.min - anchorPoint;
	target.max = target.min + calcLength(layout);
}
function calcRelativePosition(target, layout, parent, anchor) {
	calcRelativeAxisPosition(target.x, layout.x, parent.x, anchor?.x);
	calcRelativeAxisPosition(target.y, layout.y, parent.y, anchor?.y);
}
//#endregion
//#region node_modules/motion-dom/dist/es/projection/utils/each-axis.mjs
function eachAxis(callback) {
	return [callback("x"), callback("y")];
}
//#endregion
//#region node_modules/motion-dom/dist/es/events/add-dom-event.mjs
function addDomEvent(target, eventName, handler, options = { passive: true }) {
	target.addEventListener(eventName, handler, options);
	return () => target.removeEventListener(eventName, handler, options);
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/utils/resolve-motion-value.mjs
/**
* If the provided value is a MotionValue, this returns the actual value, otherwise just the value itself
*/
function resolveMotionValue(value) {
	return isMotionValue(value) ? value.get() : value;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/animate/single-value.mjs
function animateSingleValue(value, keyframes, options) {
	const motionValue$1 = isMotionValue(value) ? value : motionValue(value);
	motionValue$1.start(animateMotionValue("", motionValue$1, keyframes, options));
	return motionValue$1.animation;
}
//#endregion
//#region node_modules/motion-dom/dist/es/stats/buffer.mjs
var statsBuffer = {
	value: null,
	addProjectionMetrics: null
};
//#endregion
//#region node_modules/motion-dom/dist/es/utils/delay.mjs
/**
* Timeout defined in ms
*/
function delay(callback, timeout) {
	const start = time.now();
	const checkElapsed = ({ timestamp }) => {
		const elapsed = timestamp - start;
		if (elapsed >= timeout) {
			cancelFrame(checkElapsed);
			callback(elapsed - timeout);
		}
	};
	frame.setup(checkElapsed, true);
	return () => cancelFrame(checkElapsed);
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/is-svg-svg-element.mjs
/**
* Checks if an element is specifically an SVGSVGElement (the root SVG element)
* in a way that works across iframes
*/
function isSVGSVGElement(element) {
	return isSVGElement(element) && element.tagName === "svg";
}
//#endregion
//#region node_modules/motion-dom/dist/es/projection/animation/mix-values.mjs
var borderLabels = [
	"borderTopLeftRadius",
	"borderTopRightRadius",
	"borderBottomLeftRadius",
	"borderBottomRightRadius"
];
var numBorders = borderLabels.length;
var asNumber = (value) => typeof value === "string" ? parseFloat(value) : value;
var isPx = (value) => typeof value === "number" || px.test(value);
function mixValues(target, follow, lead, progress, shouldCrossfadeOpacity, isOnlyMember) {
	if (shouldCrossfadeOpacity) {
		target.opacity = mixNumber$1(0, lead.opacity ?? 1, easeCrossfadeIn(progress));
		target.opacityExit = mixNumber$1(follow.opacity ?? 1, 0, easeCrossfadeOut(progress));
	} else if (isOnlyMember) target.opacity = mixNumber$1(follow.opacity ?? 1, lead.opacity ?? 1, progress);
	/**
	* Mix border radius
	*/
	for (let i = 0; i < numBorders; i++) {
		const borderLabel = borderLabels[i];
		let followRadius = getRadius(follow, borderLabel);
		let leadRadius = getRadius(lead, borderLabel);
		if (followRadius === void 0 && leadRadius === void 0) continue;
		followRadius || (followRadius = 0);
		leadRadius || (leadRadius = 0);
		if (followRadius === 0 || leadRadius === 0 || isPx(followRadius) === isPx(leadRadius)) {
			target[borderLabel] = Math.max(mixNumber$1(asNumber(followRadius), asNumber(leadRadius), progress), 0);
			if (percent.test(leadRadius) || percent.test(followRadius)) target[borderLabel] += "%";
		} else target[borderLabel] = leadRadius;
	}
	/**
	* Mix rotation
	*/
	if (follow.rotate || lead.rotate) target.rotate = mixNumber$1(follow.rotate || 0, lead.rotate || 0, progress);
}
function getRadius(values, radiusName) {
	return values[radiusName] !== void 0 ? values[radiusName] : values.borderRadius;
}
var easeCrossfadeIn = /*@__PURE__*/ compress(0, .5, circOut);
var easeCrossfadeOut = /*@__PURE__*/ compress(.5, .95, noop);
function compress(min, max, easing) {
	return (p) => {
		if (p < min) return 0;
		if (p > max) return 1;
		return easing(/* @__PURE__ */ progress(min, max, p));
	};
}
//#endregion
//#region node_modules/motion-dom/dist/es/projection/geometry/copy.mjs
/**
* Reset an axis to the provided origin box.
*
* This is a mutative operation.
*/
function copyAxisInto(axis, originAxis) {
	axis.min = originAxis.min;
	axis.max = originAxis.max;
}
/**
* Reset a box to the provided origin box.
*
* This is a mutative operation.
*/
function copyBoxInto(box, originBox) {
	copyAxisInto(box.x, originBox.x);
	copyAxisInto(box.y, originBox.y);
}
/**
* Reset a delta to the provided origin box.
*
* This is a mutative operation.
*/
function copyAxisDeltaInto(delta, originDelta) {
	delta.translate = originDelta.translate;
	delta.scale = originDelta.scale;
	delta.originPoint = originDelta.originPoint;
	delta.origin = originDelta.origin;
}
//#endregion
//#region node_modules/motion-dom/dist/es/projection/geometry/delta-remove.mjs
/**
* Remove a delta from a point. This is essentially the steps of applyPointDelta in reverse
*/
function removePointDelta(point, translate, scale, originPoint, boxScale) {
	point -= translate;
	point = scalePoint(point, 1 / scale, originPoint);
	if (boxScale !== void 0) point = scalePoint(point, 1 / boxScale, originPoint);
	return point;
}
/**
* Remove a delta from an axis. This is essentially the steps of applyAxisDelta in reverse
*/
function removeAxisDelta(axis, translate = 0, scale = 1, origin = .5, boxScale, originAxis = axis, sourceAxis = axis) {
	if (percent.test(translate)) {
		translate = parseFloat(translate);
		translate = mixNumber$1(sourceAxis.min, sourceAxis.max, translate / 100) - sourceAxis.min;
	}
	if (typeof translate !== "number") return;
	let originPoint = mixNumber$1(originAxis.min, originAxis.max, origin);
	if (axis === originAxis) originPoint -= translate;
	axis.min = removePointDelta(axis.min, translate, scale, originPoint, boxScale);
	axis.max = removePointDelta(axis.max, translate, scale, originPoint, boxScale);
}
/**
* Remove a transforms from an axis. This is essentially the steps of applyAxisTransforms in reverse
* and acts as a bridge between motion values and removeAxisDelta
*/
function removeAxisTransforms(axis, transforms, [key, scaleKey, originKey], origin, sourceAxis) {
	removeAxisDelta(axis, transforms[key], transforms[scaleKey], transforms[originKey], transforms.scale, origin, sourceAxis);
}
/**
* The names of the motion values we want to apply as translation, scale and origin.
*/
var xKeys = [
	"x",
	"scaleX",
	"originX"
];
var yKeys = [
	"y",
	"scaleY",
	"originY"
];
/**
* Remove a transforms from an box. This is essentially the steps of applyAxisBox in reverse
* and acts as a bridge between motion values and removeAxisDelta
*/
function removeBoxTransforms(box, transforms, originBox, sourceBox) {
	removeAxisTransforms(box.x, transforms, xKeys, originBox ? originBox.x : void 0, sourceBox ? sourceBox.x : void 0);
	removeAxisTransforms(box.y, transforms, yKeys, originBox ? originBox.y : void 0, sourceBox ? sourceBox.y : void 0);
}
//#endregion
//#region node_modules/motion-dom/dist/es/projection/geometry/utils.mjs
function isAxisDeltaZero(delta) {
	return delta.translate === 0 && delta.scale === 1;
}
function isDeltaZero(delta) {
	return isAxisDeltaZero(delta.x) && isAxisDeltaZero(delta.y);
}
function axisEquals(a, b) {
	return a.min === b.min && a.max === b.max;
}
function boxEquals(a, b) {
	return axisEquals(a.x, b.x) && axisEquals(a.y, b.y);
}
function axisEqualsRounded(a, b) {
	return Math.round(a.min) === Math.round(b.min) && Math.round(a.max) === Math.round(b.max);
}
function boxEqualsRounded(a, b) {
	return axisEqualsRounded(a.x, b.x) && axisEqualsRounded(a.y, b.y);
}
function aspectRatio(box) {
	return calcLength(box.x) / calcLength(box.y);
}
function axisDeltaEquals(a, b) {
	return a.translate === b.translate && a.scale === b.scale && a.originPoint === b.originPoint;
}
//#endregion
//#region node_modules/motion-dom/dist/es/projection/shared/stack.mjs
var NodeStack = class {
	constructor() {
		this.members = [];
	}
	add(node) {
		addUniqueItem(this.members, node);
		for (let i = this.members.length - 1; i >= 0; i--) {
			const member = this.members[i];
			if (member === node || member === this.lead || member === this.prevLead) continue;
			const inst = member.instance;
			if ((!inst || inst.isConnected === false) && !member.snapshot) {
				removeItem(this.members, member);
				member.unmount();
			}
		}
		node.scheduleRender();
	}
	remove(node) {
		removeItem(this.members, node);
		if (node === this.prevLead) this.prevLead = void 0;
		if (node === this.lead) {
			const prevLead = this.members[this.members.length - 1];
			if (prevLead) this.promote(prevLead);
		}
	}
	relegate(node) {
		for (let i = this.members.indexOf(node) - 1; i >= 0; i--) {
			const member = this.members[i];
			if (member.isPresent !== false && member.instance?.isConnected !== false) {
				this.promote(member);
				return true;
			}
		}
		return false;
	}
	promote(node, preserveFollowOpacity) {
		const prevLead = this.lead;
		if (node === prevLead) return;
		this.prevLead = prevLead;
		this.lead = node;
		node.show();
		if (prevLead) {
			prevLead.updateSnapshot();
			node.scheduleRender();
			const { layoutDependency: prevDep } = prevLead.options;
			const { layoutDependency: nextDep } = node.options;
			if (prevDep === void 0 || prevDep !== nextDep) {
				node.resumeFrom = prevLead;
				if (preserveFollowOpacity) prevLead.preserveOpacity = true;
				if (prevLead.snapshot) {
					node.snapshot = prevLead.snapshot;
					node.snapshot.latestValues = prevLead.animationValues || prevLead.latestValues;
				}
				if (node.root?.isUpdating) node.isLayoutDirty = true;
			}
			if (node.options.crossfade === false) prevLead.hide();
		}
	}
	exitAnimationComplete() {
		this.members.forEach((member) => {
			member.options.onExitComplete?.();
			member.resumingFrom?.options.onExitComplete?.();
		});
	}
	scheduleRender() {
		this.members.forEach((member) => member.instance && member.scheduleRender(false));
	}
	removeLeadSnapshot() {
		if (this.lead?.snapshot) this.lead.snapshot = void 0;
	}
};
//#endregion
//#region node_modules/motion-dom/dist/es/projection/styles/transform.mjs
function buildProjectionTransform(delta, treeScale, latestTransform) {
	let transform = "";
	/**
	* The translations we use to calculate are always relative to the viewport coordinate space.
	* But when we apply scales, we also scale the coordinate space of an element and its children.
	* For instance if we have a treeScale (the culmination of all parent scales) of 0.5 and we need
	* to move an element 100 pixels, we actually need to move it 200 in within that scaled space.
	*/
	const xTranslate = delta.x.translate / treeScale.x;
	const yTranslate = delta.y.translate / treeScale.y;
	const zTranslate = latestTransform?.z || 0;
	if (xTranslate || yTranslate || zTranslate) transform = `translate3d(${xTranslate}px, ${yTranslate}px, ${zTranslate}px) `;
	/**
	* Apply scale correction for the tree transform.
	* This will apply scale to the screen-orientated axes.
	*/
	if (treeScale.x !== 1 || treeScale.y !== 1) transform += `scale(${1 / treeScale.x}, ${1 / treeScale.y}) `;
	if (latestTransform) {
		const { transformPerspective, rotate, pathRotation, rotateX, rotateY, skewX, skewY } = latestTransform;
		if (transformPerspective) transform = `perspective(${transformPerspective}px) ${transform}`;
		if (rotate) transform += `rotate(${rotate}deg) `;
		if (pathRotation) transform += `rotate(${pathRotation}deg) `;
		if (rotateX) transform += `rotateX(${rotateX}deg) `;
		if (rotateY) transform += `rotateY(${rotateY}deg) `;
		if (skewX) transform += `skewX(${skewX}deg) `;
		if (skewY) transform += `skewY(${skewY}deg) `;
	}
	/**
	* Apply scale to match the size of the element to the size we want it.
	* This will apply scale to the element-orientated axes.
	*/
	const elementScaleX = delta.x.scale * treeScale.x;
	const elementScaleY = delta.y.scale * treeScale.y;
	if (elementScaleX !== 1 || elementScaleY !== 1) transform += `scale(${elementScaleX}, ${elementScaleY})`;
	return transform || "none";
}
//#endregion
//#region node_modules/motion-dom/dist/es/projection/utils/compare-by-depth.mjs
var compareByDepth = (a, b) => a.depth - b.depth;
//#endregion
//#region node_modules/motion-dom/dist/es/projection/utils/flat-tree.mjs
var FlatTree = class {
	constructor() {
		this.children = [];
		this.isDirty = false;
	}
	add(child) {
		addUniqueItem(this.children, child);
		this.isDirty = true;
	}
	remove(child) {
		removeItem(this.children, child);
		this.isDirty = true;
	}
	forEach(callback) {
		this.isDirty && this.children.sort(compareByDepth);
		this.isDirty = false;
		this.children.forEach(callback);
	}
};
//#endregion
//#region node_modules/motion-dom/dist/es/projection/node/state.mjs
/**
* This should only ever be modified on the client otherwise it'll
* persist through server requests. If we need instanced states we
* could lazy-init via root.
*/
var globalProjectionState = {
	/**
	* Global flag as to whether the tree has animated since the last time
	* we resized the window
	*/
	hasAnimatedSinceResize: true,
	/**
	* We set this to true once, on the first update. Any nodes added to the tree beyond that
	* update will be given a `data-projection-id` attribute.
	*/
	hasEverUpdated: false
};
//#endregion
//#region node_modules/motion-dom/dist/es/projection/node/create-projection-node.mjs
var metrics = {
	nodes: 0,
	calculatedTargetDeltas: 0,
	calculatedProjections: 0
};
var transformAxes = [
	"",
	"X",
	"Y",
	"Z"
];
/**
* We use 1000 as the animation target as 0-1000 maps better to pixels than 0-1
* which has a noticeable difference in spring animations
*/
var animationTarget = 1e3;
var id$1 = 0;
function resetDistortingTransform(key, visualElement, values, sharedAnimationValues) {
	const { latestValues } = visualElement;
	if (latestValues[key]) {
		values[key] = latestValues[key];
		visualElement.setStaticValue(key, 0);
		if (sharedAnimationValues) sharedAnimationValues[key] = 0;
	}
}
function cancelTreeOptimisedTransformAnimations(projectionNode) {
	projectionNode.hasCheckedOptimisedAppear = true;
	if (projectionNode.root === projectionNode) return;
	const { visualElement } = projectionNode.options;
	if (!visualElement) return;
	const appearId = getOptimisedAppearId(visualElement);
	if (window.MotionHasOptimisedAnimation(appearId, "transform")) {
		const { layout, layoutId } = projectionNode.options;
		window.MotionCancelOptimisedAnimation(appearId, "transform", frame, !(layout || layoutId));
	}
	const { parent } = projectionNode;
	if (parent && !parent.hasCheckedOptimisedAppear) cancelTreeOptimisedTransformAnimations(parent);
}
function createProjectionNode$1({ attachResizeListener, defaultParent, measureScroll, checkIsScrollRoot, resetTransform }) {
	return class ProjectionNode {
		constructor(latestValues = {}, parent = defaultParent?.()) {
			/**
			* A unique ID generated for every projection node.
			*/
			this.id = id$1++;
			/**
			* An id that represents a unique session instigated by startUpdate.
			*/
			this.animationId = 0;
			this.animationCommitId = 0;
			/**
			* A Set containing all this component's children. This is used to iterate
			* through the children.
			*
			* TODO: This could be faster to iterate as a flat array stored on the root node.
			*/
			this.children = /* @__PURE__ */ new Set();
			/**
			* Options for the node. We use this to configure what kind of layout animations
			* we should perform (if any).
			*/
			this.options = {};
			/**
			* We use this to detect when its safe to shut down part of a projection tree.
			* We have to keep projecting children for scale correction and relative projection
			* until all their parents stop performing layout animations.
			*/
			this.isTreeAnimating = false;
			this.isAnimationBlocked = false;
			/**
			* Flag to true if we think this layout has been changed. We can't always know this,
			* currently we set it to true every time a component renders, or if it has a layoutDependency
			* if that has changed between renders. Additionally, components can be grouped by LayoutGroup
			* and if one node is dirtied, they all are.
			*/
			this.isLayoutDirty = false;
			/**
			* Flag to true if we think the projection calculations for this node needs
			* recalculating as a result of an updated transform or layout animation.
			*/
			this.isProjectionDirty = false;
			/**
			* Flag to true if the layout *or* transform has changed. This then gets propagated
			* throughout the projection tree, forcing any element below to recalculate on the next frame.
			*/
			this.isSharedProjectionDirty = false;
			/**
			* Flag transform dirty. This gets propagated throughout the whole tree but is only
			* respected by shared nodes.
			*/
			this.isTransformDirty = false;
			/**
			* Block layout updates for instant layout transitions throughout the tree.
			*/
			this.updateManuallyBlocked = false;
			this.updateBlockedByResize = false;
			/**
			* Set to true between the start of the first `willUpdate` call and the end of the `didUpdate`
			* call.
			*/
			this.isUpdating = false;
			/**
			* If this is an SVG element we currently disable projection transforms
			*/
			this.isSVG = false;
			/**
			* Flag to true (during promotion) if a node doing an instant layout transition needs to reset
			* its projection styles.
			*/
			this.needsReset = false;
			/**
			* Flags whether this node should have its transform reset prior to measuring.
			*/
			this.shouldResetTransform = false;
			/**
			* Store whether this node has been checked for optimised appear animations. As
			* effects fire bottom-up, and we want to look up the tree for appear animations,
			* this makes sure we only check each path once, stopping at nodes that
			* have already been checked.
			*/
			this.hasCheckedOptimisedAppear = false;
			/**
			* An object representing the calculated contextual/accumulated/tree scale.
			* This will be used to scale calculcated projection transforms, as these are
			* calculated in screen-space but need to be scaled for elements to layoutly
			* make it to their calculated destinations.
			*
			* TODO: Lazy-init
			*/
			this.treeScale = {
				x: 1,
				y: 1
			};
			/**
			*
			*/
			this.eventHandlers = /* @__PURE__ */ new Map();
			this.hasTreeAnimated = false;
			this.layoutVersion = 0;
			this.updateScheduled = false;
			this.scheduleUpdate = () => this.update();
			this.projectionUpdateScheduled = false;
			this.checkUpdateFailed = () => {
				if (this.isUpdating) {
					this.isUpdating = false;
					this.clearAllSnapshots();
				}
			};
			/**
			* This is a multi-step process as shared nodes might be of different depths. Nodes
			* are sorted by depth order, so we need to resolve the entire tree before moving to
			* the next step.
			*/
			this.updateProjection = () => {
				this.projectionUpdateScheduled = false;
				/**
				* Reset debug counts. Manually resetting rather than creating a new
				* object each frame.
				*/
				if (statsBuffer.value) metrics.nodes = metrics.calculatedTargetDeltas = metrics.calculatedProjections = 0;
				this.nodes.forEach(propagateDirtyNodes);
				this.nodes.forEach(resolveTargetDelta);
				this.nodes.forEach(calcProjection);
				this.nodes.forEach(cleanDirtyNodes);
				if (statsBuffer.addProjectionMetrics) statsBuffer.addProjectionMetrics(metrics);
			};
			/**
			* Frame calculations
			*/
			this.resolvedRelativeTargetAt = 0;
			this.linkedParentVersion = 0;
			this.hasProjected = false;
			this.isVisible = true;
			this.animationProgress = 0;
			/**
			* Shared layout
			*/
			this.sharedNodes = /* @__PURE__ */ new Map();
			this.latestValues = latestValues;
			this.root = parent ? parent.root || parent : this;
			this.path = parent ? [...parent.path, parent] : [];
			this.parent = parent;
			this.depth = parent ? parent.depth + 1 : 0;
			for (let i = 0; i < this.path.length; i++) this.path[i].shouldResetTransform = true;
			if (this.root === this) this.nodes = new FlatTree();
		}
		addEventListener(name, handler) {
			if (!this.eventHandlers.has(name)) this.eventHandlers.set(name, new SubscriptionManager());
			return this.eventHandlers.get(name).add(handler);
		}
		notifyListeners(name, ...args) {
			const subscriptionManager = this.eventHandlers.get(name);
			subscriptionManager && subscriptionManager.notify(...args);
		}
		hasListeners(name) {
			return this.eventHandlers.has(name);
		}
		/**
		* Lifecycles
		*/
		mount(instance) {
			if (this.instance) return;
			this.isSVG = isSVGElement(instance) && !isSVGSVGElement(instance);
			this.instance = instance;
			const { layoutId, layout, visualElement } = this.options;
			if (visualElement && !visualElement.current) visualElement.mount(instance);
			this.root.nodes.add(this);
			this.parent && this.parent.children.add(this);
			if (this.root.hasTreeAnimated && (layout || layoutId)) this.isLayoutDirty = true;
			if (attachResizeListener) {
				let cancelDelay;
				let innerWidth = 0;
				const resizeUnblockUpdate = () => this.root.updateBlockedByResize = false;
				frame.read(() => {
					innerWidth = window.innerWidth;
				});
				attachResizeListener(instance, () => {
					const newInnerWidth = window.innerWidth;
					if (newInnerWidth === innerWidth) return;
					innerWidth = newInnerWidth;
					this.root.updateBlockedByResize = true;
					cancelDelay && cancelDelay();
					cancelDelay = delay(resizeUnblockUpdate, 250);
					if (globalProjectionState.hasAnimatedSinceResize) {
						globalProjectionState.hasAnimatedSinceResize = false;
						this.nodes.forEach(finishAnimation);
					}
				});
			}
			if (layoutId) this.root.registerSharedNode(layoutId, this);
			if (this.options.animate !== false && visualElement && (layoutId || layout)) this.addEventListener("didUpdate", ({ delta, hasLayoutChanged, hasRelativeLayoutChanged, layout: newLayout }) => {
				if (this.isTreeAnimationBlocked()) {
					this.target = void 0;
					this.relativeTarget = void 0;
					return;
				}
				const layoutTransition = this.options.transition || visualElement.getDefaultTransition() || defaultLayoutTransition;
				const { onLayoutAnimationStart, onLayoutAnimationComplete } = visualElement.getProps();
				/**
				* The target layout of the element might stay the same,
				* but its position relative to its parent has changed.
				*/
				const hasTargetChanged = !this.targetLayout || !boxEqualsRounded(this.targetLayout, newLayout);
				/**
				* If the layout hasn't seemed to have changed, it might be that the
				* element is visually in the same place in the document but its position
				* relative to its parent has indeed changed. So here we check for that.
				*/
				const hasOnlyRelativeTargetChanged = !hasLayoutChanged && hasRelativeLayoutChanged;
				if (this.options.layoutRoot || this.resumeFrom || hasOnlyRelativeTargetChanged || hasLayoutChanged && (hasTargetChanged || !this.currentAnimation)) {
					if (this.resumeFrom) {
						this.resumingFrom = this.resumeFrom;
						this.resumingFrom.resumingFrom = void 0;
					}
					const animationOptions = {
						...getValueTransition(layoutTransition, "layout"),
						onPlay: onLayoutAnimationStart,
						onComplete: onLayoutAnimationComplete
					};
					if (visualElement.shouldReduceMotion || this.options.layoutRoot) {
						animationOptions.delay = 0;
						animationOptions.type = false;
					}
					this.startAnimation(animationOptions);
					/**
					* Set animation origin after starting animation to avoid layout jump
					* caused by stopping previous layout animation
					*/
					this.setAnimationOrigin(delta, hasOnlyRelativeTargetChanged, animationOptions.path);
				} else {
					/**
					* If the layout hasn't changed and we have an animation that hasn't started yet,
					* finish it immediately. Otherwise it will be animating from a location
					* that was probably never committed to screen and look like a jumpy box.
					*/
					if (!hasLayoutChanged) finishAnimation(this);
					if (this.isLead() && this.options.onExitComplete) this.options.onExitComplete();
				}
				this.targetLayout = newLayout;
			});
		}
		unmount() {
			this.options.layoutId && this.willUpdate();
			this.root.nodes.remove(this);
			const stack = this.getStack();
			stack && stack.remove(this);
			this.parent && this.parent.children.delete(this);
			this.instance = void 0;
			this.eventHandlers.clear();
			cancelFrame(this.updateProjection);
		}
		blockUpdate() {
			this.updateManuallyBlocked = true;
		}
		unblockUpdate() {
			this.updateManuallyBlocked = false;
		}
		isUpdateBlocked() {
			return this.updateManuallyBlocked || this.updateBlockedByResize;
		}
		isTreeAnimationBlocked() {
			return this.isAnimationBlocked || this.parent && this.parent.isTreeAnimationBlocked() || false;
		}
		startUpdate() {
			if (this.isUpdateBlocked()) return;
			this.isUpdating = true;
			this.nodes && this.nodes.forEach(resetSkewAndRotation);
			this.animationId++;
		}
		getTransformTemplate() {
			const { visualElement } = this.options;
			return visualElement && visualElement.getProps().transformTemplate;
		}
		willUpdate(shouldNotifyListeners = true) {
			this.root.hasTreeAnimated = true;
			if (this.root.isUpdateBlocked()) {
				this.options.onExitComplete && this.options.onExitComplete();
				return;
			}
			/**
			* If we're running optimised appear animations then these must be
			* cancelled before measuring the DOM. This is so we can measure
			* the true layout of the element rather than the WAAPI animation
			* which will be unaffected by the resetSkewAndRotate step.
			*
			* Note: This is a DOM write. Worst case scenario is this is sandwiched
			* between other snapshot reads which will cause unnecessary style recalculations.
			* This has to happen here though, as we don't yet know which nodes will need
			* snapshots in startUpdate(), but we only want to cancel optimised animations
			* if a layout animation measurement is actually going to be affected by them.
			*/
			if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear) cancelTreeOptimisedTransformAnimations(this);
			!this.root.isUpdating && this.root.startUpdate();
			if (this.isLayoutDirty) return;
			this.isLayoutDirty = true;
			for (let i = 0; i < this.path.length; i++) {
				const node = this.path[i];
				node.shouldResetTransform = true;
				/**
				* Percentage translates resolve against layoutBox dimensions,
				* so ancestors with them must be re-measured after transform reset.
				*/
				if (typeof node.latestValues.x === "string" || typeof node.latestValues.y === "string") node.isLayoutDirty = true;
				node.updateScroll("snapshot");
				if (node.options.layoutRoot) node.willUpdate(false);
			}
			const { layoutId, layout } = this.options;
			if (layoutId === void 0 && !layout) return;
			const transformTemplate = this.getTransformTemplate();
			this.prevTransformTemplateValue = transformTemplate ? transformTemplate(this.latestValues, "") : void 0;
			this.updateSnapshot();
			shouldNotifyListeners && this.notifyListeners("willUpdate");
		}
		update() {
			this.updateScheduled = false;
			if (this.isUpdateBlocked()) {
				const wasBlockedByResize = this.updateBlockedByResize;
				this.unblockUpdate();
				this.updateBlockedByResize = false;
				this.clearAllSnapshots();
				/**
				* When blocked by resize, still measure layouts so
				* callbacks like onLayoutMeasure fire (e.g. Reorder).
				* Skip notifyLayoutUpdate to prevent animations.
				*/
				if (wasBlockedByResize) this.nodes.forEach(forceLayoutMeasure);
				this.nodes.forEach(clearMeasurements);
				return;
			}
			/**
			* If this is a repeat of didUpdate then ignore the animation.
			*/
			if (this.animationId <= this.animationCommitId) {
				this.nodes.forEach(clearIsLayoutDirty);
				return;
			}
			this.animationCommitId = this.animationId;
			if (!this.isUpdating) this.nodes.forEach(clearIsLayoutDirty);
			else {
				this.isUpdating = false;
				/**
				* Ensure animation-blocked nodes (e.g. during drag)
				* get measured even when memoized (willUpdate skipped).
				*/
				this.nodes.forEach(ensureDraggedNodesSnapshotted);
				/**
				* Write
				*/
				this.nodes.forEach(resetTransformStyle);
				/**
				* Read ==================
				*/
				this.nodes.forEach(updateLayout);
				/**
				* Write
				*/
				this.nodes.forEach(notifyLayoutUpdate);
			}
			this.clearAllSnapshots();
			/**
			* Manually flush any pending updates. Ideally
			* we could leave this to the following requestAnimationFrame but this seems
			* to leave a flash of incorrectly styled content.
			*/
			const now = time.now();
			frameData.delta = clamp(0, 1e3 / 60, now - frameData.timestamp);
			frameData.timestamp = now;
			frameData.isProcessing = true;
			frameSteps.update.process(frameData);
			frameSteps.preRender.process(frameData);
			frameSteps.render.process(frameData);
			frameData.isProcessing = false;
		}
		didUpdate() {
			if (!this.updateScheduled) {
				this.updateScheduled = true;
				microtask.read(this.scheduleUpdate);
			}
		}
		clearAllSnapshots() {
			this.nodes.forEach(clearSnapshot);
			this.sharedNodes.forEach(removeLeadSnapshots);
		}
		scheduleUpdateProjection() {
			if (!this.projectionUpdateScheduled) {
				this.projectionUpdateScheduled = true;
				frame.preRender(this.updateProjection, false, true);
			}
		}
		scheduleCheckAfterUnmount() {
			/**
			* If the unmounting node is in a layoutGroup and did trigger a willUpdate,
			* we manually call didUpdate to give a chance to the siblings to animate.
			* Otherwise, cleanup all snapshots to prevents future nodes from reusing them.
			*/
			frame.postRender(() => {
				if (this.isLayoutDirty) this.root.didUpdate();
				else this.root.checkUpdateFailed();
			});
		}
		/**
		* Update measurements
		*/
		updateSnapshot() {
			if (this.snapshot || !this.instance) return;
			this.snapshot = this.measure();
			if (this.snapshot && !calcLength(this.snapshot.measuredBox.x) && !calcLength(this.snapshot.measuredBox.y)) this.snapshot = void 0;
		}
		updateLayout() {
			if (!this.instance) return;
			this.updateScroll();
			if (!(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty) return;
			/**
			* When a node is mounted, it simply resumes from the prevLead's
			* snapshot instead of taking a new one, but the ancestors scroll
			* might have updated while the prevLead is unmounted. We need to
			* update the scroll again to make sure the layout we measure is
			* up to date.
			*/
			if (this.resumeFrom && !this.resumeFrom.instance) for (let i = 0; i < this.path.length; i++) this.path[i].updateScroll();
			const prevLayout = this.layout;
			this.layout = this.measure(false);
			this.layoutVersion++;
			if (!this.layoutCorrected) this.layoutCorrected = createBox();
			this.isLayoutDirty = false;
			this.projectionDelta = void 0;
			this.notifyListeners("measure", this.layout.layoutBox);
			const { visualElement } = this.options;
			visualElement && visualElement.notify("LayoutMeasure", this.layout.layoutBox, prevLayout ? prevLayout.layoutBox : void 0);
		}
		updateScroll(phase = "measure") {
			let needsMeasurement = Boolean(this.options.layoutScroll && this.instance);
			if (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === phase) needsMeasurement = false;
			if (needsMeasurement && this.instance) {
				const isRoot = checkIsScrollRoot(this.instance);
				this.scroll = {
					animationId: this.root.animationId,
					phase,
					isRoot,
					offset: measureScroll(this.instance),
					wasRoot: this.scroll ? this.scroll.isRoot : isRoot
				};
			}
		}
		resetTransform() {
			if (!resetTransform) return;
			const isResetRequested = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout;
			const hasProjection = this.projectionDelta && !isDeltaZero(this.projectionDelta);
			const transformTemplate = this.getTransformTemplate();
			const transformTemplateValue = transformTemplate ? transformTemplate(this.latestValues, "") : void 0;
			const transformTemplateHasChanged = transformTemplateValue !== this.prevTransformTemplateValue;
			if (isResetRequested && this.instance && (hasProjection || hasTransform(this.latestValues) || transformTemplateHasChanged)) {
				resetTransform(this.instance, transformTemplateValue);
				this.shouldResetTransform = false;
				this.scheduleRender();
			}
		}
		measure(removeTransform = true) {
			const pageBox = this.measurePageBox();
			let layoutBox = this.removeElementScroll(pageBox);
			/**
			* Measurements taken during the pre-render stage
			* still have transforms applied so we remove them
			* via calculation.
			*/
			if (removeTransform) layoutBox = this.removeTransform(layoutBox);
			roundBox(layoutBox);
			return {
				animationId: this.root.animationId,
				measuredBox: pageBox,
				layoutBox,
				latestValues: {},
				source: this.id
			};
		}
		measurePageBox() {
			const { visualElement } = this.options;
			if (!visualElement) return createBox();
			const box = visualElement.measureViewportBox();
			if (!(this.scroll?.wasRoot || this.path.some(checkNodeWasScrollRoot))) {
				const { scroll } = this.root;
				if (scroll) {
					translateAxis(box.x, scroll.offset.x);
					translateAxis(box.y, scroll.offset.y);
				}
			}
			return box;
		}
		removeElementScroll(box) {
			const boxWithoutScroll = createBox();
			copyBoxInto(boxWithoutScroll, box);
			if (this.scroll?.wasRoot) return boxWithoutScroll;
			/**
			* Performance TODO: Keep a cumulative scroll offset down the tree
			* rather than loop back up the path.
			*/
			for (let i = 0; i < this.path.length; i++) {
				const node = this.path[i];
				const { scroll, options } = node;
				if (node !== this.root && scroll && options.layoutScroll) {
					/**
					* If this is a new scroll root, we want to remove all previous scrolls
					* from the viewport box.
					*/
					if (scroll.wasRoot) copyBoxInto(boxWithoutScroll, box);
					translateAxis(boxWithoutScroll.x, scroll.offset.x);
					translateAxis(boxWithoutScroll.y, scroll.offset.y);
				}
			}
			return boxWithoutScroll;
		}
		applyTransform(box, transformOnly = false, output) {
			const withTransforms = output || createBox();
			copyBoxInto(withTransforms, box);
			for (let i = 0; i < this.path.length; i++) {
				const node = this.path[i];
				if (!transformOnly && node.options.layoutScroll && node.scroll && node !== node.root) {
					translateAxis(withTransforms.x, -node.scroll.offset.x);
					translateAxis(withTransforms.y, -node.scroll.offset.y);
				}
				if (!hasTransform(node.latestValues)) continue;
				transformBox(withTransforms, node.latestValues, node.layout?.layoutBox);
			}
			if (hasTransform(this.latestValues)) transformBox(withTransforms, this.latestValues, this.layout?.layoutBox);
			return withTransforms;
		}
		removeTransform(box) {
			const boxWithoutTransform = createBox();
			copyBoxInto(boxWithoutTransform, box);
			for (let i = 0; i < this.path.length; i++) {
				const node = this.path[i];
				if (!hasTransform(node.latestValues)) continue;
				let sourceBox;
				if (node.instance) {
					hasScale(node.latestValues) && node.updateSnapshot();
					sourceBox = createBox();
					copyBoxInto(sourceBox, node.measurePageBox());
				}
				removeBoxTransforms(boxWithoutTransform, node.latestValues, node.snapshot?.layoutBox, sourceBox);
			}
			if (hasTransform(this.latestValues)) removeBoxTransforms(boxWithoutTransform, this.latestValues);
			return boxWithoutTransform;
		}
		setTargetDelta(delta) {
			this.targetDelta = delta;
			this.root.scheduleUpdateProjection();
			this.isProjectionDirty = true;
		}
		setOptions(options) {
			this.options = {
				...this.options,
				...options,
				crossfade: options.crossfade !== void 0 ? options.crossfade : true
			};
		}
		clearMeasurements() {
			this.scroll = void 0;
			this.layout = void 0;
			this.snapshot = void 0;
			this.prevTransformTemplateValue = void 0;
			this.targetDelta = void 0;
			this.target = void 0;
			this.isLayoutDirty = false;
		}
		forceRelativeParentToResolveTarget() {
			if (!this.relativeParent) return;
			/**
			* If the parent target isn't up-to-date, force it to update.
			* This is an unfortunate de-optimisation as it means any updating relative
			* projection will cause all the relative parents to recalculate back
			* up the tree.
			*/
			if (this.relativeParent.resolvedRelativeTargetAt !== frameData.timestamp) this.relativeParent.resolveTargetDelta(true);
		}
		resolveTargetDelta(forceRecalculation = false) {
			/**
			* Once the dirty status of nodes has been spread through the tree, we also
			* need to check if we have a shared node of a different depth that has itself
			* been dirtied.
			*/
			const lead = this.getLead();
			this.isProjectionDirty || (this.isProjectionDirty = lead.isProjectionDirty);
			this.isTransformDirty || (this.isTransformDirty = lead.isTransformDirty);
			this.isSharedProjectionDirty || (this.isSharedProjectionDirty = lead.isSharedProjectionDirty);
			const isShared = Boolean(this.resumingFrom) || this !== lead;
			if (!(forceRecalculation || isShared && this.isSharedProjectionDirty || this.isProjectionDirty || this.parent?.isProjectionDirty || this.attemptToResolveRelativeTarget || this.root.updateBlockedByResize)) return;
			const { layout, layoutId } = this.options;
			/**
			* If we have no layout, we can't perform projection, so early return
			*/
			if (!this.layout || !(layout || layoutId)) return;
			this.resolvedRelativeTargetAt = frameData.timestamp;
			const relativeParent = this.getClosestProjectingParent();
			if (relativeParent && this.linkedParentVersion !== relativeParent.layoutVersion && !relativeParent.options.layoutRoot) this.removeRelativeTarget();
			/**
			* If we don't have a targetDelta but do have a layout, we can attempt to resolve
			* a relativeParent. This will allow a component to perform scale correction
			* even if no animation has started.
			*/
			if (!this.targetDelta && !this.relativeTarget) if (this.options.layoutAnchor !== false && relativeParent && relativeParent.layout) this.createRelativeTarget(relativeParent, this.layout.layoutBox, relativeParent.layout.layoutBox);
			else this.removeRelativeTarget();
			/**
			* If we have no relative target or no target delta our target isn't valid
			* for this frame.
			*/
			if (!this.relativeTarget && !this.targetDelta) return;
			/**
			* Lazy-init target data structure
			*/
			if (!this.target) {
				this.target = createBox();
				this.targetWithTransforms = createBox();
			}
			/**
			* If we've got a relative box for this component, resolve it into a target relative to the parent.
			*/
			if (this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target) {
				this.forceRelativeParentToResolveTarget();
				calcRelativeBox(this.target, this.relativeTarget, this.relativeParent.target, this.options.layoutAnchor || void 0);
			} else if (this.targetDelta) {
				if (Boolean(this.resumingFrom)) this.applyTransform(this.layout.layoutBox, false, this.target);
				else copyBoxInto(this.target, this.layout.layoutBox);
				applyBoxDelta(this.target, this.targetDelta);
			} else
 /**
			* If no target, use own layout as target
			*/
			copyBoxInto(this.target, this.layout.layoutBox);
			/**
			* If we've been told to attempt to resolve a relative target, do so.
			*/
			if (this.attemptToResolveRelativeTarget) {
				this.attemptToResolveRelativeTarget = false;
				if (this.options.layoutAnchor !== false && relativeParent && Boolean(relativeParent.resumingFrom) === Boolean(this.resumingFrom) && !relativeParent.options.layoutScroll && relativeParent.target && this.animationProgress !== 1) this.createRelativeTarget(relativeParent, this.target, relativeParent.target);
				else this.relativeParent = this.relativeTarget = void 0;
			}
			/**
			* Increase debug counter for resolved target deltas
			*/
			if (statsBuffer.value) metrics.calculatedTargetDeltas++;
		}
		getClosestProjectingParent() {
			if (!this.parent || hasScale(this.parent.latestValues) || has2DTranslate(this.parent.latestValues)) return;
			if (this.parent.isProjecting()) return this.parent;
			else return this.parent.getClosestProjectingParent();
		}
		isProjecting() {
			return Boolean((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
		}
		createRelativeTarget(relativeParent, layout, parentLayout) {
			this.relativeParent = relativeParent;
			this.linkedParentVersion = relativeParent.layoutVersion;
			this.forceRelativeParentToResolveTarget();
			this.relativeTarget = createBox();
			this.relativeTargetOrigin = createBox();
			calcRelativePosition(this.relativeTargetOrigin, layout, parentLayout, this.options.layoutAnchor || void 0);
			copyBoxInto(this.relativeTarget, this.relativeTargetOrigin);
		}
		removeRelativeTarget() {
			this.relativeParent = this.relativeTarget = void 0;
		}
		calcProjection() {
			const lead = this.getLead();
			const isShared = Boolean(this.resumingFrom) || this !== lead;
			let canSkip = true;
			/**
			* If this is a normal layout animation and neither this node nor its nearest projecting
			* is dirty then we can't skip.
			*/
			if (this.isProjectionDirty || this.parent?.isProjectionDirty) canSkip = false;
			/**
			* If this is a shared layout animation and this node's shared projection is dirty then
			* we can't skip.
			*/
			if (isShared && (this.isSharedProjectionDirty || this.isTransformDirty)) canSkip = false;
			/**
			* If we have resolved the target this frame we must recalculate the
			* projection to ensure it visually represents the internal calculations.
			*/
			if (this.resolvedRelativeTargetAt === frameData.timestamp) canSkip = false;
			if (canSkip) return;
			const { layout, layoutId } = this.options;
			/**
			* If this section of the tree isn't animating we can
			* delete our target sources for the following frame.
			*/
			this.isTreeAnimating = Boolean(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation);
			if (!this.isTreeAnimating) this.targetDelta = this.relativeTarget = void 0;
			if (!this.layout || !(layout || layoutId)) return;
			/**
			* Reset the corrected box with the latest values from box, as we're then going
			* to perform mutative operations on it.
			*/
			copyBoxInto(this.layoutCorrected, this.layout.layoutBox);
			/**
			* Record previous tree scales before updating.
			*/
			const prevTreeScaleX = this.treeScale.x;
			const prevTreeScaleY = this.treeScale.y;
			/**
			* Apply all the parent deltas to this box to produce the corrected box. This
			* is the layout box, as it will appear on screen as a result of the transforms of its parents.
			*/
			applyTreeDeltas(this.layoutCorrected, this.treeScale, this.path, isShared);
			/**
			* If this layer needs to perform scale correction but doesn't have a target,
			* use the layout as the target.
			*/
			if (lead.layout && !lead.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1)) {
				lead.target = lead.layout.layoutBox;
				lead.targetWithTransforms = createBox();
			}
			const { target } = lead;
			if (!target) {
				/**
				* If we don't have a target to project into, but we were previously
				* projecting, we want to remove the stored transform and schedule
				* a render to ensure the elements reflect the removed transform.
				*/
				if (this.prevProjectionDelta) {
					this.createProjectionDeltas();
					this.scheduleRender();
				}
				return;
			}
			if (!this.projectionDelta || !this.prevProjectionDelta) this.createProjectionDeltas();
			else {
				copyAxisDeltaInto(this.prevProjectionDelta.x, this.projectionDelta.x);
				copyAxisDeltaInto(this.prevProjectionDelta.y, this.projectionDelta.y);
			}
			/**
			* Update the delta between the corrected box and the target box before user-set transforms were applied.
			* This will allow us to calculate the corrected borderRadius and boxShadow to compensate
			* for our layout reprojection, but still allow them to be scaled correctly by the user.
			* It might be that to simplify this we may want to accept that user-set scale is also corrected
			* and we wouldn't have to keep and calc both deltas, OR we could support a user setting
			* to allow people to choose whether these styles are corrected based on just the
			* layout reprojection or the final bounding box.
			*/
			calcBoxDelta(this.projectionDelta, this.layoutCorrected, target, this.latestValues);
			if (this.treeScale.x !== prevTreeScaleX || this.treeScale.y !== prevTreeScaleY || !axisDeltaEquals(this.projectionDelta.x, this.prevProjectionDelta.x) || !axisDeltaEquals(this.projectionDelta.y, this.prevProjectionDelta.y)) {
				this.hasProjected = true;
				this.scheduleRender();
				this.notifyListeners("projectionUpdate", target);
			}
			/**
			* Increase debug counter for recalculated projections
			*/
			if (statsBuffer.value) metrics.calculatedProjections++;
		}
		hide() {
			this.isVisible = false;
		}
		show() {
			this.isVisible = true;
		}
		scheduleRender(notifyAll = true) {
			this.options.visualElement?.scheduleRender();
			if (notifyAll) {
				const stack = this.getStack();
				stack && stack.scheduleRender();
			}
			if (this.resumingFrom && !this.resumingFrom.instance) this.resumingFrom = void 0;
		}
		createProjectionDeltas() {
			this.prevProjectionDelta = createDelta();
			this.projectionDelta = createDelta();
			this.projectionDeltaWithTransform = createDelta();
		}
		setAnimationOrigin(delta, hasOnlyRelativeTargetChanged = false, pathFn) {
			const snapshot = this.snapshot;
			const snapshotLatestValues = snapshot ? snapshot.latestValues : {};
			const mixedValues = { ...this.latestValues };
			const targetDelta = createDelta();
			if (!this.relativeParent || !this.relativeParent.options.layoutRoot) this.relativeTarget = this.relativeTargetOrigin = void 0;
			this.attemptToResolveRelativeTarget = !hasOnlyRelativeTargetChanged;
			const relativeLayout = createBox();
			const isSharedLayoutAnimation = (snapshot ? snapshot.source : void 0) !== (this.layout ? this.layout.source : void 0);
			const stack = this.getStack();
			const isOnlyMember = !stack || stack.members.length <= 1;
			const shouldCrossfadeOpacity = Boolean(isSharedLayoutAnimation && !isOnlyMember && this.options.crossfade === true && !this.path.some(hasOpacityCrossfade));
			this.animationProgress = 0;
			let prevRelativeTarget;
			const interpolate = pathFn?.interpolateProjection(delta);
			this.mixTargetDelta = (latest) => {
				const progress = latest / 1e3;
				const point = interpolate?.(progress);
				if (point) {
					targetDelta.x.translate = point.x;
					targetDelta.x.scale = mixNumber$1(delta.x.scale, 1, progress);
					targetDelta.x.origin = delta.x.origin;
					targetDelta.x.originPoint = delta.x.originPoint;
					targetDelta.y.translate = point.y;
					targetDelta.y.scale = mixNumber$1(delta.y.scale, 1, progress);
					targetDelta.y.origin = delta.y.origin;
					targetDelta.y.originPoint = delta.y.originPoint;
				} else {
					mixAxisDeltaLinear(targetDelta.x, delta.x, progress);
					mixAxisDeltaLinear(targetDelta.y, delta.y, progress);
				}
				this.setTargetDelta(targetDelta);
				if (this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout) {
					calcRelativePosition(relativeLayout, this.layout.layoutBox, this.relativeParent.layout.layoutBox, this.options.layoutAnchor || void 0);
					mixBox(this.relativeTarget, this.relativeTargetOrigin, relativeLayout, progress);
					/**
					* If this is an unchanged relative target we can consider the
					* projection not dirty.
					*/
					if (prevRelativeTarget && boxEquals(this.relativeTarget, prevRelativeTarget)) this.isProjectionDirty = false;
					if (!prevRelativeTarget) prevRelativeTarget = createBox();
					copyBoxInto(prevRelativeTarget, this.relativeTarget);
				}
				if (isSharedLayoutAnimation) {
					this.animationValues = mixedValues;
					mixValues(mixedValues, snapshotLatestValues, this.latestValues, progress, shouldCrossfadeOpacity, isOnlyMember);
				}
				if (point && point.rotate !== void 0) {
					if (!this.animationValues) this.animationValues = mixedValues;
					this.animationValues.pathRotation = point.rotate;
				}
				this.root.scheduleUpdateProjection();
				this.scheduleRender();
				this.animationProgress = progress;
			};
			this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
		}
		startAnimation(options) {
			this.notifyListeners("animationStart");
			this.currentAnimation?.stop();
			this.resumingFrom?.currentAnimation?.stop();
			if (this.pendingAnimation) {
				cancelFrame(this.pendingAnimation);
				this.pendingAnimation = void 0;
			}
			/**
			* Start the animation in the next frame to have a frame with progress 0,
			* where the target is the same as when the animation started, so we can
			* calculate the relative positions correctly for instant transitions.
			*/
			this.pendingAnimation = frame.update(() => {
				globalProjectionState.hasAnimatedSinceResize = true;
				this.motionValue || (this.motionValue = motionValue(0));
				this.motionValue.jump(0, false);
				this.currentAnimation = animateSingleValue(this.motionValue, [0, 1e3], {
					...options,
					velocity: 0,
					isSync: true,
					onUpdate: (latest) => {
						this.mixTargetDelta(latest);
						options.onUpdate && options.onUpdate(latest);
					},
					onComplete: () => {
						options.onComplete && options.onComplete();
						this.completeAnimation();
					}
				});
				if (this.resumingFrom) this.resumingFrom.currentAnimation = this.currentAnimation;
				this.pendingAnimation = void 0;
			});
		}
		completeAnimation() {
			if (this.resumingFrom) {
				this.resumingFrom.currentAnimation = void 0;
				this.resumingFrom.preserveOpacity = void 0;
			}
			const stack = this.getStack();
			stack && stack.exitAnimationComplete();
			this.resumingFrom = this.currentAnimation = this.animationValues = void 0;
			this.notifyListeners("animationComplete");
		}
		finishAnimation() {
			if (this.currentAnimation) {
				this.mixTargetDelta && this.mixTargetDelta(animationTarget);
				this.currentAnimation.stop();
			}
			this.completeAnimation();
		}
		applyTransformsToTarget() {
			const lead = this.getLead();
			let { targetWithTransforms, target, layout, latestValues } = lead;
			if (!targetWithTransforms || !target || !layout) return;
			/**
			* If we're only animating position, and this element isn't the lead element,
			* then instead of projecting into the lead box we instead want to calculate
			* a new target that aligns the two boxes but maintains the layout shape.
			*/
			if (this !== lead && this.layout && layout && shouldAnimatePositionOnly(this.options.animationType, this.layout.layoutBox, layout.layoutBox)) {
				target = this.target || createBox();
				const xLength = calcLength(this.layout.layoutBox.x);
				target.x.min = lead.target.x.min;
				target.x.max = target.x.min + xLength;
				const yLength = calcLength(this.layout.layoutBox.y);
				target.y.min = lead.target.y.min;
				target.y.max = target.y.min + yLength;
			}
			copyBoxInto(targetWithTransforms, target);
			/**
			* Apply the latest user-set transforms to the targetBox to produce the targetBoxFinal.
			* This is the final box that we will then project into by calculating a transform delta and
			* applying it to the corrected box.
			*/
			transformBox(targetWithTransforms, latestValues);
			/**
			* Update the delta between the corrected box and the final target box, after
			* user-set transforms are applied to it. This will be used by the renderer to
			* create a transform style that will reproject the element from its layout layout
			* into the desired bounding box.
			*/
			calcBoxDelta(this.projectionDeltaWithTransform, this.layoutCorrected, targetWithTransforms, latestValues);
		}
		registerSharedNode(layoutId, node) {
			if (!this.sharedNodes.has(layoutId)) this.sharedNodes.set(layoutId, new NodeStack());
			this.sharedNodes.get(layoutId).add(node);
			const config = node.options.initialPromotionConfig;
			node.promote({
				transition: config ? config.transition : void 0,
				preserveFollowOpacity: config && config.shouldPreserveFollowOpacity ? config.shouldPreserveFollowOpacity(node) : void 0
			});
		}
		isLead() {
			const stack = this.getStack();
			return stack ? stack.lead === this : true;
		}
		getLead() {
			const { layoutId } = this.options;
			return layoutId ? this.getStack()?.lead || this : this;
		}
		getPrevLead() {
			const { layoutId } = this.options;
			return layoutId ? this.getStack()?.prevLead : void 0;
		}
		getStack() {
			const { layoutId } = this.options;
			if (layoutId) return this.root.sharedNodes.get(layoutId);
		}
		promote({ needsReset, transition, preserveFollowOpacity } = {}) {
			const stack = this.getStack();
			if (stack) stack.promote(this, preserveFollowOpacity);
			if (needsReset) {
				this.projectionDelta = void 0;
				this.needsReset = true;
			}
			if (transition) this.setOptions({ transition });
		}
		relegate() {
			const stack = this.getStack();
			if (stack) return stack.relegate(this);
			else return false;
		}
		resetSkewAndRotation() {
			const { visualElement } = this.options;
			if (!visualElement) return;
			let hasDistortingTransform = false;
			/**
			* An unrolled check for rotation values. Most elements don't have any rotation and
			* skipping the nested loop and new object creation is 50% faster.
			*/
			const { latestValues } = visualElement;
			if (latestValues.z || latestValues.rotate || latestValues.rotateX || latestValues.rotateY || latestValues.rotateZ || latestValues.skewX || latestValues.skewY) hasDistortingTransform = true;
			if (!hasDistortingTransform) return;
			const resetValues = {};
			if (latestValues.z) resetDistortingTransform("z", visualElement, resetValues, this.animationValues);
			for (let i = 0; i < transformAxes.length; i++) {
				resetDistortingTransform(`rotate${transformAxes[i]}`, visualElement, resetValues, this.animationValues);
				resetDistortingTransform(`skew${transformAxes[i]}`, visualElement, resetValues, this.animationValues);
			}
			visualElement.render();
			for (const key in resetValues) {
				visualElement.setStaticValue(key, resetValues[key]);
				if (this.animationValues) this.animationValues[key] = resetValues[key];
			}
			visualElement.scheduleRender();
		}
		applyProjectionStyles(targetStyle, styleProp) {
			if (!this.instance || this.isSVG) return;
			if (!this.isVisible) {
				targetStyle.visibility = "hidden";
				return;
			}
			const transformTemplate = this.getTransformTemplate();
			if (this.needsReset) {
				this.needsReset = false;
				targetStyle.visibility = "";
				targetStyle.opacity = "";
				targetStyle.pointerEvents = resolveMotionValue(styleProp?.pointerEvents) || "";
				targetStyle.transform = transformTemplate ? transformTemplate(this.latestValues, "") : "none";
				return;
			}
			const lead = this.getLead();
			if (!this.projectionDelta || !this.layout || !lead.target) {
				if (this.options.layoutId) {
					targetStyle.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1;
					targetStyle.pointerEvents = resolveMotionValue(styleProp?.pointerEvents) || "";
				}
				if (this.hasProjected && !hasTransform(this.latestValues)) {
					targetStyle.transform = transformTemplate ? transformTemplate({}, "") : "none";
					this.hasProjected = false;
				}
				return;
			}
			targetStyle.visibility = "";
			const valuesToRender = lead.animationValues || lead.latestValues;
			this.applyTransformsToTarget();
			let transform = buildProjectionTransform(this.projectionDeltaWithTransform, this.treeScale, valuesToRender);
			if (transformTemplate) transform = transformTemplate(valuesToRender, transform);
			targetStyle.transform = transform;
			const { x, y } = this.projectionDelta;
			targetStyle.transformOrigin = `${x.origin * 100}% ${y.origin * 100}% 0`;
			if (lead.animationValues)
 /**
			* If the lead component is animating, assign this either the entering/leaving
			* opacity
			*/
			targetStyle.opacity = lead === this ? valuesToRender.opacity ?? this.latestValues.opacity ?? 1 : this.preserveOpacity ? this.latestValues.opacity : valuesToRender.opacityExit;
			else
 /**
			* Or we're not animating at all, set the lead component to its layout
			* opacity and other components to hidden.
			*/
			targetStyle.opacity = lead === this ? valuesToRender.opacity !== void 0 ? valuesToRender.opacity : "" : valuesToRender.opacityExit !== void 0 ? valuesToRender.opacityExit : 0;
			/**
			* Apply scale correction
			*/
			for (const key in scaleCorrectors) {
				if (valuesToRender[key] === void 0) continue;
				const { correct, applyTo, isCSSVariable } = scaleCorrectors[key];
				/**
				* Only apply scale correction to the value if we have an
				* active projection transform. Otherwise these values become
				* vulnerable to distortion if the element changes size without
				* a corresponding layout animation.
				*/
				const corrected = transform === "none" ? valuesToRender[key] : correct(valuesToRender[key], lead);
				if (applyTo) {
					const num = applyTo.length;
					for (let i = 0; i < num; i++) targetStyle[applyTo[i]] = corrected;
				} else if (isCSSVariable) this.options.visualElement.renderState.vars[key] = corrected;
				else targetStyle[key] = corrected;
			}
			/**
			* Disable pointer events on follow components. This is to ensure
			* that if a follow component covers a lead component it doesn't block
			* pointer events on the lead.
			*/
			if (this.options.layoutId) targetStyle.pointerEvents = lead === this ? resolveMotionValue(styleProp?.pointerEvents) || "" : "none";
		}
		clearSnapshot() {
			this.resumeFrom = this.snapshot = void 0;
		}
		resetTree() {
			this.root.nodes.forEach((node) => node.currentAnimation?.stop());
			this.root.nodes.forEach(clearMeasurements);
			this.root.sharedNodes.clear();
		}
	};
}
function updateLayout(node) {
	node.updateLayout();
}
function notifyLayoutUpdate(node) {
	const snapshot = node.resumeFrom?.snapshot || node.snapshot;
	if (node.isLead() && node.layout && snapshot && node.hasListeners("didUpdate")) {
		const { layoutBox: layout, measuredBox: measuredLayout } = node.layout;
		const { animationType } = node.options;
		const isShared = snapshot.source !== node.layout.source;
		if (animationType === "size") eachAxis((axis) => {
			const axisSnapshot = isShared ? snapshot.measuredBox[axis] : snapshot.layoutBox[axis];
			const length = calcLength(axisSnapshot);
			axisSnapshot.min = layout[axis].min;
			axisSnapshot.max = axisSnapshot.min + length;
		});
		else if (animationType === "x" || animationType === "y") {
			const snapAxis = animationType === "x" ? "y" : "x";
			copyAxisInto(isShared ? snapshot.measuredBox[snapAxis] : snapshot.layoutBox[snapAxis], layout[snapAxis]);
		} else if (shouldAnimatePositionOnly(animationType, snapshot.layoutBox, layout)) eachAxis((axis) => {
			const axisSnapshot = isShared ? snapshot.measuredBox[axis] : snapshot.layoutBox[axis];
			const length = calcLength(layout[axis]);
			axisSnapshot.max = axisSnapshot.min + length;
			/**
			* Ensure relative target gets resized and rerendererd
			*/
			if (node.relativeTarget && !node.currentAnimation) {
				node.isProjectionDirty = true;
				node.relativeTarget[axis].max = node.relativeTarget[axis].min + length;
			}
		});
		const layoutDelta = createDelta();
		calcBoxDelta(layoutDelta, layout, snapshot.layoutBox);
		const visualDelta = createDelta();
		if (isShared) calcBoxDelta(visualDelta, node.applyTransform(measuredLayout, true), snapshot.measuredBox);
		else calcBoxDelta(visualDelta, layout, snapshot.layoutBox);
		const hasLayoutChanged = !isDeltaZero(layoutDelta);
		let hasRelativeLayoutChanged = false;
		if (!node.resumeFrom) {
			const relativeParent = node.getClosestProjectingParent();
			/**
			* If the relativeParent is itself resuming from a different element then
			* the relative snapshot is not relavent
			*/
			if (relativeParent && !relativeParent.resumeFrom) {
				const { snapshot: parentSnapshot, layout: parentLayout } = relativeParent;
				if (parentSnapshot && parentLayout) {
					const anchor = node.options.layoutAnchor || void 0;
					const relativeSnapshot = createBox();
					calcRelativePosition(relativeSnapshot, snapshot.layoutBox, parentSnapshot.layoutBox, anchor);
					const relativeLayout = createBox();
					calcRelativePosition(relativeLayout, layout, parentLayout.layoutBox, anchor);
					if (!boxEqualsRounded(relativeSnapshot, relativeLayout)) hasRelativeLayoutChanged = true;
					if (relativeParent.options.layoutRoot) {
						node.relativeTarget = relativeLayout;
						node.relativeTargetOrigin = relativeSnapshot;
						node.relativeParent = relativeParent;
					}
				}
			}
		}
		node.notifyListeners("didUpdate", {
			layout,
			snapshot,
			delta: visualDelta,
			layoutDelta,
			hasLayoutChanged,
			hasRelativeLayoutChanged
		});
	} else if (node.isLead()) {
		const { onExitComplete } = node.options;
		onExitComplete && onExitComplete();
	}
	/**
	* Clearing transition
	* TODO: Investigate why this transition is being passed in as {type: false } from Framer
	* and why we need it at all
	*/
	node.options.transition = void 0;
}
function propagateDirtyNodes(node) {
	/**
	* Increase debug counter for nodes encountered this frame
	*/
	if (statsBuffer.value) metrics.nodes++;
	if (!node.parent) return;
	/**
	* If this node isn't projecting, propagate isProjectionDirty. It will have
	* no performance impact but it will allow the next child that *is* projecting
	* but *isn't* dirty to just check its parent to see if *any* ancestor needs
	* correcting.
	*/
	if (!node.isProjecting()) node.isProjectionDirty = node.parent.isProjectionDirty;
	/**
	* Propagate isSharedProjectionDirty and isTransformDirty
	* throughout the whole tree. A future revision can take another look at
	* this but for safety we still recalcualte shared nodes.
	*/
	node.isSharedProjectionDirty || (node.isSharedProjectionDirty = Boolean(node.isProjectionDirty || node.parent.isProjectionDirty || node.parent.isSharedProjectionDirty));
	node.isTransformDirty || (node.isTransformDirty = node.parent.isTransformDirty);
}
function cleanDirtyNodes(node) {
	node.isProjectionDirty = node.isSharedProjectionDirty = node.isTransformDirty = false;
}
function clearSnapshot(node) {
	node.clearSnapshot();
}
function clearMeasurements(node) {
	node.clearMeasurements();
}
function forceLayoutMeasure(node) {
	node.isLayoutDirty = true;
	node.updateLayout();
}
function clearIsLayoutDirty(node) {
	node.isLayoutDirty = false;
}
/**
* When a node is animation-blocked (e.g. during drag) and its component
* didn't re-render (memoized), willUpdate() is never called so there's
* no snapshot. Use the previous layout as a snapshot and mark dirty so
* resetTransform/updateLayout/notifyLayoutUpdate process it normally.
*/
function ensureDraggedNodesSnapshotted(node) {
	if (node.isAnimationBlocked && node.layout && !node.isLayoutDirty) {
		node.snapshot = node.layout;
		node.isLayoutDirty = true;
	}
}
function resetTransformStyle(node) {
	const { visualElement } = node.options;
	if (visualElement && visualElement.getProps().onBeforeLayoutMeasure) visualElement.notify("BeforeLayoutMeasure");
	node.resetTransform();
}
function finishAnimation(node) {
	node.finishAnimation();
	node.targetDelta = node.relativeTarget = node.target = void 0;
	node.isProjectionDirty = true;
}
function resolveTargetDelta(node) {
	node.resolveTargetDelta();
}
function calcProjection(node) {
	node.calcProjection();
}
function resetSkewAndRotation(node) {
	node.resetSkewAndRotation();
}
function removeLeadSnapshots(stack) {
	stack.removeLeadSnapshot();
}
function mixAxisDeltaLinear(output, delta, p) {
	output.translate = mixNumber$1(delta.translate, 0, p);
	output.scale = mixNumber$1(delta.scale, 1, p);
	output.origin = delta.origin;
	output.originPoint = delta.originPoint;
}
function mixAxis(output, from, to, p) {
	output.min = mixNumber$1(from.min, to.min, p);
	output.max = mixNumber$1(from.max, to.max, p);
}
function mixBox(output, from, to, p) {
	mixAxis(output.x, from.x, to.x, p);
	mixAxis(output.y, from.y, to.y, p);
}
function hasOpacityCrossfade(node) {
	return node.animationValues && node.animationValues.opacityExit !== void 0;
}
var defaultLayoutTransition = {
	duration: .45,
	ease: [
		.4,
		0,
		.1,
		1
	]
};
var userAgentContains = (string) => typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(string);
/**
* Measured bounding boxes must be rounded in Safari and
* left untouched in Chrome, otherwise non-integer layouts within scaled-up elements
* can appear to jump.
*/
var roundPoint = userAgentContains("applewebkit/") && !userAgentContains("chrome/") ? Math.round : noop;
function roundAxis(axis) {
	axis.min = roundPoint(axis.min);
	axis.max = roundPoint(axis.max);
}
function roundBox(box) {
	roundAxis(box.x);
	roundAxis(box.y);
}
function shouldAnimatePositionOnly(animationType, snapshot, layout) {
	return animationType === "position" || animationType === "preserve-aspect" && !isNear(aspectRatio(snapshot), aspectRatio(layout), .2);
}
function checkNodeWasScrollRoot(node) {
	return node !== node.root && node.scroll?.wasRoot;
}
//#endregion
//#region node_modules/motion-dom/dist/es/projection/node/DocumentProjectionNode.mjs
var DocumentProjectionNode = createProjectionNode$1({
	attachResizeListener: (ref, notify) => addDomEvent(ref, "resize", notify),
	measureScroll: () => ({
		x: document.documentElement.scrollLeft || document.body?.scrollLeft || 0,
		y: document.documentElement.scrollTop || document.body?.scrollTop || 0
	}),
	checkIsScrollRoot: () => true
});
//#endregion
//#region node_modules/motion-dom/dist/es/projection/node/HTMLProjectionNode.mjs
var rootProjectionNode = { current: void 0 };
var HTMLProjectionNode = createProjectionNode$1({
	measureScroll: (instance) => ({
		x: instance.scrollLeft,
		y: instance.scrollTop
	}),
	defaultParent: () => {
		if (!rootProjectionNode.current) {
			const documentNode = new DocumentProjectionNode({});
			documentNode.mount(window);
			documentNode.setOptions({ layoutScroll: true });
			rootProjectionNode.current = documentNode;
		}
		return rootProjectionNode.current;
	},
	resetTransform: (instance, value) => {
		instance.style.transform = value !== void 0 ? value : "none";
	},
	checkIsScrollRoot: (instance) => Boolean(window.getComputedStyle(instance).position === "fixed")
});
//#endregion
//#region node_modules/framer-motion/dist/es/context/MotionConfigContext.mjs
var { createContext: createContext$4 } = await importShared("react");
/**
* @public
*/
var MotionConfigContext = createContext$4({
	transformPagePoint: (p) => p,
	isStatic: false,
	reducedMotion: "never"
});
//#endregion
//#region node_modules/framer-motion/dist/es/utils/use-composed-ref.mjs
var React$2 = await importShared("react");
/**
* Taken from https://github.com/radix-ui/primitives/blob/main/packages/react/compose-refs/src/compose-refs.tsx
*/
/**
* Set a given ref to a given value
* This utility takes care of different types of refs: callback refs and RefObject(s)
*/
function setRef(ref, value) {
	if (typeof ref === "function") return ref(value);
	else if (ref !== null && ref !== void 0) ref.current = value;
}
/**
* A utility to compose multiple refs together
* Accepts callback refs and RefObject(s)
*/
function composeRefs(...refs) {
	return (node) => {
		let hasCleanup = false;
		const cleanups = refs.map((ref) => {
			const cleanup = setRef(ref, node);
			if (!hasCleanup && typeof cleanup === "function") hasCleanup = true;
			return cleanup;
		});
		if (hasCleanup) return () => {
			for (let i = 0; i < cleanups.length; i++) {
				const cleanup = cleanups[i];
				if (typeof cleanup === "function") cleanup();
				else setRef(refs[i], null);
			}
		};
	};
}
/**
* A custom hook that composes multiple refs
* Accepts callback refs and RefObject(s)
*/
function useComposedRefs(...refs) {
	return React$2.useCallback(composeRefs(...refs), refs);
}
//#endregion
//#region node_modules/framer-motion/dist/es/components/AnimatePresence/PopChild.mjs
var React$1 = await importShared("react");
var { useId: useId$2, useRef: useRef$6, useContext: useContext$9, useInsertionEffect: useInsertionEffect$2 } = await importShared("react");
/**
* Measurement functionality has to be within a separate component
* to leverage snapshot lifecycle.
*/
var PopChildMeasure = class extends React$1.Component {
	getSnapshotBeforeUpdate(prevProps) {
		const element = this.props.childRef.current;
		if (isHTMLElement(element) && prevProps.isPresent && !this.props.isPresent && this.props.pop !== false) {
			const parent = element.offsetParent;
			const parentWidth = isHTMLElement(parent) ? parent.offsetWidth || 0 : 0;
			const parentHeight = isHTMLElement(parent) ? parent.offsetHeight || 0 : 0;
			const computedStyle = getComputedStyle(element);
			const size = this.props.sizeRef.current;
			size.height = parseFloat(computedStyle.height);
			size.width = parseFloat(computedStyle.width);
			size.top = element.offsetTop;
			size.left = element.offsetLeft;
			size.right = parentWidth - size.width - size.left;
			size.bottom = parentHeight - size.height - size.top;
			size.direction = computedStyle.direction;
		}
		return null;
	}
	/**
	* Required with getSnapshotBeforeUpdate to stop React complaining.
	*/
	componentDidUpdate() {}
	render() {
		return this.props.children;
	}
};
function PopChild({ children, isPresent, anchorX, anchorY, root, pop }) {
	const id = useId$2();
	const ref = useRef$6(null);
	const size = useRef$6({
		width: 0,
		height: 0,
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		direction: "ltr"
	});
	const { nonce } = useContext$9(MotionConfigContext);
	const composedRef = useComposedRefs(ref, children.props?.ref ?? children?.ref);
	/**
	* We create and inject a style block so we can apply this explicit
	* sizing in a non-destructive manner by just deleting the style block.
	*
	* We can't apply size via render as the measurement happens
	* in getSnapshotBeforeUpdate (post-render), likewise if we apply the
	* styles directly on the DOM node, we might be overwriting
	* styles set via the style prop.
	*/
	useInsertionEffect$2(() => {
		const { width, height, top, left, right, bottom, direction } = size.current;
		if (isPresent || pop === false || !ref.current || !width || !height) return;
		const isRTL = direction === "rtl";
		const x = anchorX === "left" ? isRTL ? `right: ${right}` : `left: ${left}` : isRTL ? `left: ${left}` : `right: ${right}`;
		const y = anchorY === "bottom" ? `bottom: ${bottom}` : `top: ${top}`;
		ref.current.dataset.motionPopId = id;
		const style = document.createElement("style");
		if (nonce) style.nonce = nonce;
		const parent = root ?? document.head;
		parent.appendChild(style);
		if (style.sheet) style.sheet.insertRule(`
          [data-motion-pop-id="${id}"] {
            position: absolute !important;
            width: ${width}px !important;
            height: ${height}px !important;
            ${x}px !important;
            ${y}px !important;
          }
        `);
		return () => {
			ref.current?.removeAttribute("data-motion-pop-id");
			if (parent.contains(style)) parent.removeChild(style);
		};
	}, [isPresent]);
	return (0, import_jsx_runtime.jsx)(PopChildMeasure, {
		isPresent,
		childRef: ref,
		sizeRef: size,
		pop,
		children: pop === false ? children : React$1.cloneElement(children, { ref: composedRef })
	});
}
//#endregion
//#region node_modules/framer-motion/dist/es/components/AnimatePresence/PresenceChild.mjs
var React = await importShared("react");
var { useId: useId$1, useRef: useRef$5, useMemo: useMemo$7 } = await importShared("react");
var PresenceChild = ({ children, initial, isPresent, onExitComplete, custom, presenceAffectsLayout, mode, anchorX, anchorY, root }) => {
	const presenceChildren = useConstant(newChildrenMap);
	const id = useId$1();
	const isPresentRef = useRef$5(isPresent);
	const onExitCompleteRef = useRef$5(onExitComplete);
	useIsomorphicLayoutEffect(() => {
		isPresentRef.current = isPresent;
		onExitCompleteRef.current = onExitComplete;
	});
	let isReusedContext = true;
	let context = useMemo$7(() => {
		isReusedContext = false;
		return {
			id,
			initial,
			isPresent,
			custom,
			onExitComplete: (childId) => {
				presenceChildren.set(childId, true);
				for (const isComplete of presenceChildren.values()) if (!isComplete) return;
				onExitComplete && onExitComplete();
			},
			register: (childId) => {
				presenceChildren.set(childId, false);
				return () => {
					presenceChildren.delete(childId);
					!isPresentRef.current && !presenceChildren.size && onExitCompleteRef.current?.();
				};
			}
		};
	}, [
		isPresent,
		presenceChildren,
		onExitComplete
	]);
	/**
	* If the presence of a child affects the layout of the components around it,
	* we want to make a new context value to ensure they get re-rendered
	* so they can detect that layout change.
	*/
	if (presenceAffectsLayout && isReusedContext) context = { ...context };
	useMemo$7(() => {
		presenceChildren.forEach((_, key) => presenceChildren.set(key, false));
	}, [isPresent]);
	/**
	* If there's no `motion` components to fire exit animations, we want to remove this
	* component immediately.
	*/
	React.useEffect(() => {
		!isPresent && !presenceChildren.size && onExitComplete && onExitComplete();
	}, [isPresent]);
	children = (0, import_jsx_runtime.jsx)(PopChild, {
		pop: mode === "popLayout",
		isPresent,
		anchorX,
		anchorY,
		root,
		children
	});
	return (0, import_jsx_runtime.jsx)(PresenceContext.Provider, {
		value: context,
		children
	});
};
function newChildrenMap() {
	return /* @__PURE__ */ new Map();
}
//#endregion
//#region node_modules/framer-motion/dist/es/components/AnimatePresence/use-presence.mjs
var { useContext: useContext$8, useId, useEffect: useEffect$4, useCallback: useCallback$3 } = await importShared("react");
/**
* When a component is the child of `AnimatePresence`, it can use `usePresence`
* to access information about whether it's still present in the React tree.
*
* ```jsx
* import { usePresence } from "framer-motion"
*
* export const Component = () => {
*   const [isPresent, safeToRemove] = usePresence()
*
*   useEffect(() => {
*     !isPresent && setTimeout(safeToRemove, 1000)
*   }, [isPresent])
*
*   return <div />
* }
* ```
*
* If `isPresent` is `false`, it means that a component has been removed from the tree,
* but `AnimatePresence` won't really remove it until `safeToRemove` has been called.
*
* @public
*/
function usePresence(subscribe = true) {
	const context = useContext$8(PresenceContext);
	if (context === null) return [true, null];
	const { isPresent, onExitComplete, register } = context;
	const id = useId();
	useEffect$4(() => {
		if (subscribe) return register(id);
	}, [subscribe]);
	const safeToRemove = useCallback$3(() => subscribe && onExitComplete && onExitComplete(id), [
		id,
		onExitComplete,
		subscribe
	]);
	return !isPresent && onExitComplete ? [false, safeToRemove] : [true];
}
//#endregion
//#region node_modules/framer-motion/dist/es/components/AnimatePresence/utils.mjs
var { Children, isValidElement } = await importShared("react");
var getChildKey = (child) => child.key || "";
function onlyElements(children) {
	const filtered = [];
	Children.forEach(children, (child) => {
		if (isValidElement(child)) filtered.push(child);
	});
	return filtered;
}
//#endregion
//#region node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs
var { useMemo: useMemo$6, useRef: useRef$4, useState: useState$4, useContext: useContext$7 } = await importShared("react");
/**
* `AnimatePresence` enables the animation of components that have been removed from the tree.
*
* When adding/removing more than a single child, every child **must** be given a unique `key` prop.
*
* Any `motion` components that have an `exit` property defined will animate out when removed from
* the tree.
*
* ```jsx
* import { motion, AnimatePresence } from 'framer-motion'
*
* export const Items = ({ items }) => (
*   <AnimatePresence>
*     {items.map(item => (
*       <motion.div
*         key={item.id}
*         initial={{ opacity: 0 }}
*         animate={{ opacity: 1 }}
*         exit={{ opacity: 0 }}
*       />
*     ))}
*   </AnimatePresence>
* )
* ```
*
* You can sequence exit animations throughout a tree using variants.
*
* If a child contains multiple `motion` components with `exit` props, it will only unmount the child
* once all `motion` components have finished animating out. Likewise, any components using
* `usePresence` all need to call `safeToRemove`.
*
* @public
*/
var AnimatePresence = ({ children, custom, initial = true, onExitComplete, presenceAffectsLayout = true, mode = "sync", propagate = false, anchorX = "left", anchorY = "top", root }) => {
	const [isParentPresent, safeToRemove] = usePresence(propagate);
	/**
	* Filter any children that aren't ReactElements. We can only track components
	* between renders with a props.key.
	*/
	const presentChildren = useMemo$6(() => onlyElements(children), [children]);
	/**
	* Track the keys of the currently rendered children. This is used to
	* determine which children are exiting.
	*/
	const presentKeys = propagate && !isParentPresent ? [] : presentChildren.map(getChildKey);
	/**
	* If `initial={false}` we only want to pass this to components in the first render.
	*/
	const isInitialRender = useRef$4(true);
	/**
	* A ref containing the currently present children. When all exit animations
	* are complete, we use this to re-render the component with the latest children
	* *committed* rather than the latest children *rendered*.
	*/
	const pendingPresentChildren = useRef$4(presentChildren);
	/**
	* Track which exiting children have finished animating out.
	*/
	const exitComplete = useConstant(() => /* @__PURE__ */ new Map());
	/**
	* Track which components are currently processing exit to prevent duplicate processing.
	*/
	const exitingComponents = useRef$4(/* @__PURE__ */ new Set());
	/**
	* Save children to render as React state. To ensure this component is concurrent-safe,
	* we check for exiting children via an effect.
	*/
	const [diffedChildren, setDiffedChildren] = useState$4(presentChildren);
	const [renderedChildren, setRenderedChildren] = useState$4(presentChildren);
	useIsomorphicLayoutEffect(() => {
		isInitialRender.current = false;
		pendingPresentChildren.current = presentChildren;
		/**
		* Update complete status of exiting children.
		*/
		for (let i = 0; i < renderedChildren.length; i++) {
			const key = getChildKey(renderedChildren[i]);
			if (!presentKeys.includes(key)) {
				if (exitComplete.get(key) !== true) exitComplete.set(key, false);
			} else {
				exitComplete.delete(key);
				exitingComponents.current.delete(key);
			}
		}
	}, [
		renderedChildren,
		presentKeys.length,
		presentKeys.join("-")
	]);
	const exitingChildren = [];
	if (presentChildren !== diffedChildren) {
		let nextChildren = [...presentChildren];
		/**
		* Loop through all the currently rendered components and decide which
		* are exiting.
		*/
		for (let i = 0; i < renderedChildren.length; i++) {
			const child = renderedChildren[i];
			const key = getChildKey(child);
			if (!presentKeys.includes(key)) {
				nextChildren.splice(i, 0, child);
				exitingChildren.push(child);
			}
		}
		/**
		* If we're in "wait" mode, and we have exiting children, we want to
		* only render these until they've all exited.
		*/
		if (mode === "wait" && exitingChildren.length) nextChildren = exitingChildren;
		setRenderedChildren(onlyElements(nextChildren));
		setDiffedChildren(presentChildren);
		/**
		* Early return to ensure once we've set state with the latest diffed
		* children, we can immediately re-render.
		*/
		return null;
	}
	/**
	* If we've been provided a forceRender function by the LayoutGroupContext,
	* we can use it to force a re-render amongst all surrounding components once
	* all components have finished animating out.
	*/
	const { forceRender } = useContext$7(LayoutGroupContext);
	return (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: renderedChildren.map((child) => {
		const key = getChildKey(child);
		const isPresent = propagate && !isParentPresent ? false : presentChildren === renderedChildren || presentKeys.includes(key);
		const onExit = () => {
			if (exitingComponents.current.has(key)) return;
			if (exitComplete.has(key)) {
				exitingComponents.current.add(key);
				exitComplete.set(key, true);
			} else return;
			let isEveryExitComplete = true;
			exitComplete.forEach((isExitComplete) => {
				if (!isExitComplete) isEveryExitComplete = false;
			});
			if (isEveryExitComplete) {
				forceRender?.();
				setRenderedChildren(pendingPresentChildren.current);
				propagate && safeToRemove?.();
				onExitComplete && onExitComplete();
			}
		};
		return (0, import_jsx_runtime.jsx)(PresenceChild, {
			isPresent,
			initial: !isInitialRender.current || initial ? void 0 : false,
			custom,
			presenceAffectsLayout,
			mode,
			root,
			onExitComplete: isPresent ? void 0 : onExit,
			anchorX,
			anchorY,
			children: child
		}, key);
	}) });
};
//#endregion
//#region node_modules/framer-motion/dist/es/render/svg/lowercase-elements.mjs
/**
* We keep these listed separately as we use the lowercase tag names as part
* of the runtime bundle to detect SVG components
*/
var lowercaseSVGElements = [
	"animate",
	"circle",
	"defs",
	"desc",
	"ellipse",
	"g",
	"image",
	"line",
	"filter",
	"marker",
	"mask",
	"metadata",
	"path",
	"pattern",
	"polygon",
	"polyline",
	"rect",
	"stop",
	"switch",
	"symbol",
	"svg",
	"text",
	"tspan",
	"use",
	"view"
];
//#endregion
//#region node_modules/framer-motion/dist/es/render/dom/utils/is-svg-component.mjs
function isSVGComponent(Component) {
	if (typeof Component !== "string" || Component.includes("-")) return false;
	else if (lowercaseSVGElements.indexOf(Component) > -1 || /[A-Z]/u.test(Component)) return true;
	return false;
}
//#endregion
//#region node_modules/framer-motion/dist/es/render/dom/create-visual-element.mjs
var { Fragment: Fragment$1 } = await importShared("react");
var createDomVisualElement = (Component, options) => {
	return options.isSVG ?? isSVGComponent(Component) ? new SVGVisualElement(options) : new HTMLVisualElement(options, { allowProjection: Component !== Fragment$1 });
};
//#endregion
//#region node_modules/framer-motion/dist/es/context/LazyContext.mjs
var { createContext: createContext$3 } = await importShared("react");
var LazyContext = createContext$3({ strict: false });
//#endregion
//#region node_modules/framer-motion/dist/es/context/MotionContext/index.mjs
var { createContext: createContext$2 } = await importShared("react");
var MotionContext = /* @__PURE__ */ createContext$2({});
//#endregion
//#region node_modules/framer-motion/dist/es/context/MotionContext/utils.mjs
function getCurrentTreeVariants(props, context) {
	if (isControllingVariants(props)) {
		const { initial, animate } = props;
		return {
			initial: initial === false || isVariantLabel(initial) ? initial : void 0,
			animate: isVariantLabel(animate) ? animate : void 0
		};
	}
	return props.inherit !== false ? context : {};
}
//#endregion
//#region node_modules/framer-motion/dist/es/context/MotionContext/create.mjs
var { useContext: useContext$6, useMemo: useMemo$5 } = await importShared("react");
function useCreateMotionContext(props) {
	const { initial, animate } = getCurrentTreeVariants(props, useContext$6(MotionContext));
	return useMemo$5(() => ({
		initial,
		animate
	}), [variantLabelsAsDependency(initial), variantLabelsAsDependency(animate)]);
}
function variantLabelsAsDependency(prop) {
	return Array.isArray(prop) ? prop.join(" ") : prop;
}
//#endregion
//#region node_modules/framer-motion/dist/es/render/html/utils/create-render-state.mjs
var createHtmlRenderState = () => ({
	style: {},
	transform: {},
	transformOrigin: {},
	vars: {}
});
//#endregion
//#region node_modules/framer-motion/dist/es/render/html/use-props.mjs
var { useMemo: useMemo$4 } = await importShared("react");
function copyRawValuesOnly(target, source, props) {
	for (const key in source) if (!isMotionValue(source[key]) && !isForcedMotionValue(key, props)) target[key] = source[key];
}
function useInitialMotionValues({ transformTemplate }, visualState) {
	return useMemo$4(() => {
		const state = createHtmlRenderState();
		buildHTMLStyles(state, visualState, transformTemplate);
		return Object.assign({}, state.vars, state.style);
	}, [visualState]);
}
function useStyle(props, visualState) {
	const styleProp = props.style || {};
	const style = {};
	/**
	* Copy non-Motion Values straight into style
	*/
	copyRawValuesOnly(style, styleProp, props);
	Object.assign(style, useInitialMotionValues(props, visualState));
	return style;
}
function useHTMLProps(props, visualState) {
	const htmlProps = {};
	const style = useStyle(props, visualState);
	if (props.drag && props.dragListener !== false) {
		htmlProps.draggable = false;
		style.userSelect = style.WebkitUserSelect = style.WebkitTouchCallout = "none";
		style.touchAction = props.drag === true ? "none" : `pan-${props.drag === "x" ? "y" : "x"}`;
	}
	if (props.tabIndex === void 0 && (props.onTap || props.onTapStart || props.whileTap)) htmlProps.tabIndex = 0;
	htmlProps.style = style;
	return htmlProps;
}
//#endregion
//#region node_modules/framer-motion/dist/es/render/svg/utils/create-render-state.mjs
var createSvgRenderState = () => ({
	...createHtmlRenderState(),
	attrs: {}
});
//#endregion
//#region node_modules/framer-motion/dist/es/render/svg/use-props.mjs
var { useMemo: useMemo$3 } = await importShared("react");
function useSVGProps(props, visualState, _isStatic, Component) {
	const visualProps = useMemo$3(() => {
		const state = createSvgRenderState();
		buildSVGAttrs(state, visualState, isSVGTag(Component), props.transformTemplate, props.style);
		return {
			...state.attrs,
			style: { ...state.style }
		};
	}, [visualState]);
	if (props.style) {
		const rawStyles = {};
		copyRawValuesOnly(rawStyles, props.style, props);
		visualProps.style = {
			...rawStyles,
			...visualProps.style
		};
	}
	return visualProps;
}
//#endregion
//#region node_modules/framer-motion/dist/es/motion/utils/valid-prop.mjs
/**
* A list of all valid MotionProps.
*
* @privateRemarks
* This doesn't throw if a `MotionProp` name is missing - it should.
*/
var validMotionProps = /* @__PURE__ */ new Set([
	"animate",
	"exit",
	"variants",
	"initial",
	"style",
	"values",
	"variants",
	"transition",
	"transformTemplate",
	"custom",
	"inherit",
	"onBeforeLayoutMeasure",
	"onAnimationStart",
	"onAnimationComplete",
	"onUpdate",
	"onDragStart",
	"onDrag",
	"onDragEnd",
	"onMeasureDragConstraints",
	"onDirectionLock",
	"onDragTransitionEnd",
	"_dragX",
	"_dragY",
	"onHoverStart",
	"onHoverEnd",
	"onViewportEnter",
	"onViewportLeave",
	"globalTapTarget",
	"propagate",
	"ignoreStrict",
	"viewport"
]);
/**
* Check whether a prop name is a valid `MotionProp` key.
*
* @param key - Name of the property to check
* @returns `true` is key is a valid `MotionProp`.
*
* @public
*/
function isValidMotionProp(key) {
	return key.startsWith("while") || key.startsWith("drag") && key !== "draggable" || key.startsWith("layout") || key.startsWith("onTap") || key.startsWith("onPan") || key.startsWith("onLayout") || validMotionProps.has(key);
}
//#endregion
//#region __vite-optional-peer-dep:@emotion/is-prop-valid:framer-motion
var is_prop_valid_framer_motion_exports = /* @__PURE__ */ __exportAll({ default: () => is_prop_valid_framer_motion_default });
var is_prop_valid_framer_motion_default;
var init_is_prop_valid_framer_motion = __esmMin((() => {
	is_prop_valid_framer_motion_default = {};
	throw new Error(`Could not resolve "@emotion/is-prop-valid" imported by "framer-motion". Is it installed?`);
}));
//#endregion
//#region node_modules/framer-motion/dist/es/render/dom/utils/filter-props.mjs
var shouldForward = (key) => !isValidMotionProp(key);
function loadExternalIsValidProp(isValidProp) {
	if (typeof isValidProp !== "function") return;
	shouldForward = (key) => key.startsWith("on") ? !isValidMotionProp(key) : isValidProp(key);
}
/**
* Emotion and Styled Components both allow users to pass through arbitrary props to their components
* to dynamically generate CSS. They both use the `@emotion/is-prop-valid` package to determine which
* of these should be passed to the underlying DOM node.
*
* However, when styling a Motion component `styled(motion.div)`, both packages pass through *all* props
* as it's seen as an arbitrary component rather than a DOM node. Motion only allows arbitrary props
* passed through the `custom` prop so it doesn't *need* the payload or computational overhead of
* `@emotion/is-prop-valid`, however to fix this problem we need to use it.
*
* By making it an optionalDependency we can offer this functionality only in the situations where it's
* actually required.
*/
try {
	loadExternalIsValidProp((init_is_prop_valid_framer_motion(), __toCommonJS(is_prop_valid_framer_motion_exports)).default);
} catch {}
function filterProps(props, isDom, forwardMotionProps) {
	const filteredProps = {};
	for (const key in props) {
		/**
		* values is considered a valid prop by Emotion, so if it's present
		* this will be rendered out to the DOM unless explicitly filtered.
		*
		* We check the type as it could be used with the `feColorMatrix`
		* element, which we support.
		*/
		if (key === "values" && typeof props.values === "object") continue;
		if (isMotionValue(props[key])) continue;
		if (shouldForward(key) || forwardMotionProps === true && isValidMotionProp(key) || !isDom && !isValidMotionProp(key) || props["draggable"] && key.startsWith("onDrag")) filteredProps[key] = props[key];
	}
	return filteredProps;
}
//#endregion
//#region node_modules/framer-motion/dist/es/render/dom/use-render.mjs
var { Fragment, useMemo: useMemo$2, createElement } = await importShared("react");
function useRender(Component, props, ref, { latestValues }, isStatic, forwardMotionProps = false, isSVG) {
	const visualProps = (isSVG ?? isSVGComponent(Component) ? useSVGProps : useHTMLProps)(props, latestValues, isStatic, Component);
	const filteredProps = filterProps(props, typeof Component === "string", forwardMotionProps);
	const elementProps = Component !== Fragment ? {
		...filteredProps,
		...visualProps,
		ref
	} : {};
	/**
	* If component has been handed a motion value as its child,
	* memoise its initial value and render that. Subsequent updates
	* will be handled by the onChange handler
	*/
	const { children } = props;
	const renderedChildren = useMemo$2(() => isMotionValue(children) ? children.get() : children, [children]);
	return createElement(Component, {
		...elementProps,
		children: renderedChildren
	});
}
//#endregion
//#region node_modules/framer-motion/dist/es/motion/utils/use-visual-state.mjs
var { useContext: useContext$5 } = await importShared("react");
function makeState({ scrapeMotionValuesFromProps, createRenderState }, props, context, presenceContext) {
	return {
		latestValues: makeLatestValues(props, context, presenceContext, scrapeMotionValuesFromProps),
		renderState: createRenderState()
	};
}
function makeLatestValues(props, context, presenceContext, scrapeMotionValues) {
	const values = {};
	const motionValues = scrapeMotionValues(props, {});
	for (const key in motionValues) values[key] = resolveMotionValue(motionValues[key]);
	let { initial, animate } = props;
	const isControllingVariants$1 = isControllingVariants(props);
	const isVariantNode$1 = isVariantNode(props);
	if (context && isVariantNode$1 && !isControllingVariants$1 && props.inherit !== false) {
		if (initial === void 0) initial = context.initial;
		if (animate === void 0) animate = context.animate;
	}
	let isInitialAnimationBlocked = presenceContext ? presenceContext.initial === false : false;
	isInitialAnimationBlocked = isInitialAnimationBlocked || initial === false;
	const variantToSet = isInitialAnimationBlocked ? animate : initial;
	if (variantToSet && typeof variantToSet !== "boolean" && !isAnimationControls(variantToSet)) {
		const list = Array.isArray(variantToSet) ? variantToSet : [variantToSet];
		for (let i = 0; i < list.length; i++) {
			const resolved = resolveVariantFromProps(props, list[i]);
			if (resolved) {
				const { transitionEnd, transition, ...target } = resolved;
				for (const key in target) {
					let valueTarget = target[key];
					if (Array.isArray(valueTarget)) {
						/**
						* Take final keyframe if the initial animation is blocked because
						* we want to initialise at the end of that blocked animation.
						*/
						const index = isInitialAnimationBlocked ? valueTarget.length - 1 : 0;
						valueTarget = valueTarget[index];
					}
					if (valueTarget !== null) values[key] = valueTarget;
				}
				for (const key in transitionEnd) values[key] = transitionEnd[key];
			}
		}
	}
	return values;
}
var makeUseVisualState = (config) => (props, isStatic) => {
	const context = useContext$5(MotionContext);
	const presenceContext = useContext$5(PresenceContext);
	const make = () => makeState(config, props, context, presenceContext);
	return isStatic ? make() : useConstant(make);
};
//#endregion
//#region node_modules/framer-motion/dist/es/render/html/use-html-visual-state.mjs
var useHTMLVisualState = /*@__PURE__*/ makeUseVisualState({
	scrapeMotionValuesFromProps: scrapeMotionValuesFromProps$1,
	createRenderState: createHtmlRenderState
});
//#endregion
//#region node_modules/framer-motion/dist/es/render/svg/use-svg-visual-state.mjs
var useSVGVisualState = /*@__PURE__*/ makeUseVisualState({
	scrapeMotionValuesFromProps,
	createRenderState: createSvgRenderState
});
//#endregion
//#region node_modules/framer-motion/dist/es/motion/features/definitions.mjs
var featureProps = {
	animation: [
		"animate",
		"variants",
		"whileHover",
		"whileTap",
		"exit",
		"whileInView",
		"whileFocus",
		"whileDrag"
	],
	exit: ["exit"],
	drag: ["drag", "dragControls"],
	focus: ["whileFocus"],
	hover: [
		"whileHover",
		"onHoverStart",
		"onHoverEnd"
	],
	tap: [
		"whileTap",
		"onTap",
		"onTapStart",
		"onTapCancel"
	],
	pan: [
		"onPan",
		"onPanStart",
		"onPanSessionStart",
		"onPanEnd"
	],
	inView: [
		"whileInView",
		"onViewportEnter",
		"onViewportLeave"
	],
	layout: ["layout", "layoutId"]
};
var isInitialized = false;
/**
* Initialize feature definitions with isEnabled checks.
* This must be called before any motion components are rendered.
*/
function initFeatureDefinitions() {
	if (isInitialized) return;
	const initialFeatureDefinitions = {};
	for (const key in featureProps) initialFeatureDefinitions[key] = { isEnabled: (props) => featureProps[key].some((name) => !!props[name]) };
	setFeatureDefinitions(initialFeatureDefinitions);
	isInitialized = true;
}
/**
* Get the current feature definitions, initializing if needed.
*/
function getInitializedFeatureDefinitions() {
	initFeatureDefinitions();
	return getFeatureDefinitions();
}
//#endregion
//#region node_modules/framer-motion/dist/es/motion/features/load-features.mjs
function loadFeatures(features) {
	const featureDefinitions = getInitializedFeatureDefinitions();
	for (const key in features) featureDefinitions[key] = {
		...featureDefinitions[key],
		...features[key]
	};
	setFeatureDefinitions(featureDefinitions);
}
//#endregion
//#region node_modules/framer-motion/dist/es/motion/utils/symbol.mjs
var motionComponentSymbol = Symbol.for("motionComponentSymbol");
//#endregion
//#region node_modules/framer-motion/dist/es/motion/utils/use-motion-ref.mjs
var { useRef: useRef$3, useInsertionEffect: useInsertionEffect$1, useCallback: useCallback$2 } = await importShared("react");
/**
* Creates a ref function that, when called, hydrates the provided
* external ref and VisualElement.
*/
function useMotionRef(visualState, visualElement, externalRef) {
	/**
	* Store externalRef in a ref to avoid including it in the useCallback
	* dependency array. Including externalRef in dependencies causes issues
	* with libraries like Radix UI that create new callback refs on each render
	* when using asChild - this would cause the callback to be recreated,
	* triggering element remounts and breaking AnimatePresence exit animations.
	*/
	const externalRefContainer = useRef$3(externalRef);
	useInsertionEffect$1(() => {
		externalRefContainer.current = externalRef;
	});
	const refCleanup = useRef$3(null);
	return useCallback$2((instance) => {
		if (instance) visualState.onMount?.(instance);
		if (visualElement) instance ? visualElement.mount(instance) : visualElement.unmount();
		const ref = externalRefContainer.current;
		if (typeof ref === "function") if (instance) {
			const cleanup = ref(instance);
			if (typeof cleanup === "function") refCleanup.current = cleanup;
		} else if (refCleanup.current) {
			refCleanup.current();
			refCleanup.current = null;
		} else ref(instance);
		else if (ref) ref.current = instance;
	}, [visualElement]);
}
//#endregion
//#region node_modules/framer-motion/dist/es/context/SwitchLayoutGroupContext.mjs
var { createContext: createContext$1 } = await importShared("react");
/**
* Internal, exported only for usage in Framer
*/
var SwitchLayoutGroupContext = createContext$1({});
//#endregion
//#region node_modules/framer-motion/dist/es/utils/is-ref-object.mjs
function isRefObject(ref) {
	return ref && typeof ref === "object" && Object.prototype.hasOwnProperty.call(ref, "current");
}
//#endregion
//#region node_modules/framer-motion/dist/es/motion/utils/use-visual-element.mjs
var { useContext: useContext$4, useRef: useRef$2, useInsertionEffect, useEffect: useEffect$3 } = await importShared("react");
function useVisualElement(Component, visualState, props, createVisualElement, ProjectionNodeConstructor, isSVG) {
	const { visualElement: parent } = useContext$4(MotionContext);
	const lazyContext = useContext$4(LazyContext);
	const presenceContext = useContext$4(PresenceContext);
	const motionConfig = useContext$4(MotionConfigContext);
	const reducedMotionConfig = motionConfig.reducedMotion;
	const skipAnimations = motionConfig.skipAnimations;
	const visualElementRef = useRef$2(null);
	/**
	* Track whether the component has been through React's commit phase.
	* Used to detect when LazyMotion features load after the component has mounted.
	*/
	const hasMountedOnce = useRef$2(false);
	/**
	* If we haven't preloaded a renderer, check to see if we have one lazy-loaded
	*/
	createVisualElement = createVisualElement || lazyContext.renderer;
	if (!visualElementRef.current && createVisualElement) {
		visualElementRef.current = createVisualElement(Component, {
			visualState,
			parent,
			props,
			presenceContext,
			blockInitialAnimation: presenceContext ? presenceContext.initial === false : false,
			reducedMotionConfig,
			skipAnimations,
			isSVG
		});
		/**
		* If the component has already mounted before features loaded (e.g. via
		* LazyMotion with async feature loading), we need to force the initial
		* animation to run. Otherwise state changes that occurred before features
		* loaded will be lost and the element will snap to its final state.
		*/
		if (hasMountedOnce.current && visualElementRef.current) visualElementRef.current.manuallyAnimateOnMount = true;
	}
	const visualElement = visualElementRef.current;
	/**
	* Load Motion gesture and animation features. These are rendered as renderless
	* components so each feature can optionally make use of React lifecycle methods.
	*/
	const initialLayoutGroupConfig = useContext$4(SwitchLayoutGroupContext);
	if (visualElement && !visualElement.projection && ProjectionNodeConstructor && (visualElement.type === "html" || visualElement.type === "svg")) createProjectionNode(visualElementRef.current, props, ProjectionNodeConstructor, initialLayoutGroupConfig);
	const isMounted = useRef$2(false);
	useInsertionEffect(() => {
		/**
		* Check the component has already mounted before calling
		* `update` unnecessarily. This ensures we skip the initial update.
		*/
		if (visualElement && isMounted.current) visualElement.update(props, presenceContext);
	});
	/**
	* Cache this value as we want to know whether HandoffAppearAnimations
	* was present on initial render - it will be deleted after this.
	*/
	const optimisedAppearId = props[optimizedAppearDataAttribute];
	const wantsHandoff = useRef$2(Boolean(optimisedAppearId) && typeof window !== "undefined" && !window.MotionHandoffIsComplete?.(optimisedAppearId) && window.MotionHasOptimisedAnimation?.(optimisedAppearId));
	useIsomorphicLayoutEffect(() => {
		/**
		* Track that this component has mounted. This is used to detect when
		* LazyMotion features load after the component has already committed.
		*/
		hasMountedOnce.current = true;
		if (!visualElement) return;
		isMounted.current = true;
		window.MotionIsMounted = true;
		visualElement.updateFeatures();
		visualElement.scheduleRenderMicrotask();
		/**
		* Ideally this function would always run in a useEffect.
		*
		* However, if we have optimised appear animations to handoff from,
		* it needs to happen synchronously to ensure there's no flash of
		* incorrect styles in the event of a hydration error.
		*
		* So if we detect a situtation where optimised appear animations
		* are running, we use useLayoutEffect to trigger animations.
		*/
		if (wantsHandoff.current && visualElement.animationState) visualElement.animationState.animateChanges();
	});
	useEffect$3(() => {
		if (!visualElement) return;
		if (!wantsHandoff.current && visualElement.animationState) visualElement.animationState.animateChanges();
		if (wantsHandoff.current) {
			queueMicrotask(() => {
				window.MotionHandoffMarkAsComplete?.(optimisedAppearId);
			});
			wantsHandoff.current = false;
		}
		/**
		* Now we've finished triggering animations for this element we
		* can wipe the enteringChildren set for the next render.
		*/
		visualElement.enteringChildren = void 0;
	});
	return visualElement;
}
function createProjectionNode(visualElement, props, ProjectionNodeConstructor, initialPromotionConfig) {
	const { layoutId, layout, drag, dragConstraints, layoutScroll, layoutRoot, layoutAnchor, layoutCrossfade } = props;
	visualElement.projection = new ProjectionNodeConstructor(visualElement.latestValues, props["data-framer-portal-id"] ? void 0 : getClosestProjectingNode(visualElement.parent));
	visualElement.projection.setOptions({
		layoutId,
		layout,
		alwaysMeasureLayout: Boolean(drag) || dragConstraints && isRefObject(dragConstraints),
		visualElement,
		/**
		* TODO: Update options in an effect. This could be tricky as it'll be too late
		* to update by the time layout animations run.
		* We also need to fix this safeToRemove by linking it up to the one returned by usePresence,
		* ensuring it gets called if there's no potential layout animations.
		*
		*/
		animationType: typeof layout === "string" ? layout : "both",
		initialPromotionConfig,
		crossfade: layoutCrossfade,
		layoutScroll,
		layoutRoot,
		layoutAnchor
	});
}
function getClosestProjectingNode(visualElement) {
	if (!visualElement) return void 0;
	return visualElement.options.allowProjection !== false ? visualElement.projection : getClosestProjectingNode(visualElement.parent);
}
//#endregion
//#region node_modules/framer-motion/dist/es/motion/index.mjs
var { forwardRef: forwardRef$2, useContext: useContext$3 } = await importShared("react");
/**
* Create a `motion` component.
*
* This function accepts a Component argument, which can be either a string (ie "div"
* for `motion.div`), or an actual React component.
*
* Alongside this is a config option which provides a way of rendering the provided
* component "offline", or outside the React render cycle.
*/
function createMotionComponent(Component, { forwardMotionProps = false, type } = {}, preloadedFeatures, createVisualElement) {
	preloadedFeatures && loadFeatures(preloadedFeatures);
	/**
	* Determine whether to use SVG or HTML rendering based on:
	* 1. Explicit `type` option (highest priority)
	* 2. Auto-detection via `isSVGComponent`
	*/
	const isSVG = type ? type === "svg" : isSVGComponent(Component);
	const useVisualState = isSVG ? useSVGVisualState : useHTMLVisualState;
	function MotionDOMComponent(props, externalRef) {
		/**
		* If we need to measure the element we load this functionality in a
		* separate class component in order to gain access to getSnapshotBeforeUpdate.
		*/
		let MeasureLayout;
		const configAndProps = {
			...useContext$3(MotionConfigContext),
			...props,
			layoutId: useLayoutId(props)
		};
		const { isStatic } = configAndProps;
		const context = useCreateMotionContext(props);
		const visualState = useVisualState(props, isStatic);
		if (!isStatic && typeof window !== "undefined") {
			useStrictMode(configAndProps, preloadedFeatures);
			const layoutProjection = getProjectionFunctionality(configAndProps);
			MeasureLayout = layoutProjection.MeasureLayout;
			/**
			* Create a VisualElement for this component. A VisualElement provides a common
			* interface to renderer-specific APIs (ie DOM/Three.js etc) as well as
			* providing a way of rendering to these APIs outside of the React render loop
			* for more performant animations and interactions
			*/
			context.visualElement = useVisualElement(Component, visualState, configAndProps, createVisualElement, layoutProjection.ProjectionNode, isSVG);
		}
		/**
		* The mount order and hierarchy is specific to ensure our element ref
		* is hydrated by the time features fire their effects.
		*/
		return (0, import_jsx_runtime.jsxs)(MotionContext.Provider, {
			value: context,
			children: [MeasureLayout && context.visualElement ? (0, import_jsx_runtime.jsx)(MeasureLayout, {
				visualElement: context.visualElement,
				...configAndProps
			}) : null, useRender(Component, props, useMotionRef(visualState, context.visualElement, externalRef), visualState, isStatic, forwardMotionProps, isSVG)]
		});
	}
	MotionDOMComponent.displayName = `motion.${typeof Component === "string" ? Component : `create(${Component.displayName ?? Component.name ?? ""})`}`;
	const ForwardRefMotionComponent = forwardRef$2(MotionDOMComponent);
	ForwardRefMotionComponent[motionComponentSymbol] = Component;
	return ForwardRefMotionComponent;
}
function useLayoutId({ layoutId }) {
	const layoutGroupId = useContext$3(LayoutGroupContext).id;
	return layoutGroupId && layoutId !== void 0 ? layoutGroupId + "-" + layoutId : layoutId;
}
function useStrictMode(configAndProps, preloadedFeatures) {
	useContext$3(LazyContext).strict;
}
function getProjectionFunctionality(props) {
	const { drag, layout } = getInitializedFeatureDefinitions();
	if (!drag && !layout) return {};
	const combined = {
		...drag,
		...layout
	};
	return {
		MeasureLayout: drag?.isEnabled(props) || layout?.isEnabled(props) ? combined.MeasureLayout : void 0,
		ProjectionNode: combined.ProjectionNode
	};
}
//#endregion
//#region node_modules/framer-motion/dist/es/render/components/create-proxy.mjs
function createMotionProxy(preloadedFeatures, createVisualElement) {
	if (typeof Proxy === "undefined") return createMotionComponent;
	/**
	* A cache of generated `motion` components, e.g `motion.div`, `motion.input` etc.
	* Rather than generating them anew every render.
	*/
	const componentCache = /* @__PURE__ */ new Map();
	const factory = (Component, options) => {
		return createMotionComponent(Component, options, preloadedFeatures, createVisualElement);
	};
	/**
	* Support for deprecated`motion(Component)` pattern
	*/
	const deprecatedFactoryFunction = (Component, options) => {
		return factory(Component, options);
	};
	return new Proxy(deprecatedFactoryFunction, { 
	/**
	* Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
	* The prop name is passed through as `key` and we can use that to generate a `motion`
	* DOM component with that name.
	*/
get: (_target, key) => {
		if (key === "create") return factory;
		/**
		* If this element doesn't exist in the component cache, create it and cache.
		*/
		if (!componentCache.has(key)) componentCache.set(key, createMotionComponent(key, void 0, preloadedFeatures, createVisualElement));
		return componentCache.get(key);
	} });
}
//#endregion
//#region node_modules/framer-motion/dist/es/motion/features/animation/index.mjs
var AnimationFeature = class extends Feature {
	/**
	* We dynamically generate the AnimationState manager as it contains a reference
	* to the underlying animation library. We only want to load that if we load this,
	* so people can optionally code split it out using the `m` component.
	*/
	constructor(node) {
		super(node);
		node.animationState || (node.animationState = createAnimationState(node));
	}
	updateAnimationControlsSubscription() {
		const { animate } = this.node.getProps();
		if (isAnimationControls(animate)) this.unmountControls = animate.subscribe(this.node);
	}
	/**
	* Subscribe any provided AnimationControls to the component's VisualElement
	*/
	mount() {
		this.updateAnimationControlsSubscription();
	}
	update() {
		const { animate } = this.node.getProps();
		const { animate: prevAnimate } = this.node.prevProps || {};
		if (animate !== prevAnimate) this.updateAnimationControlsSubscription();
	}
	unmount() {
		this.node.animationState.reset();
		this.unmountControls?.();
	}
};
//#endregion
//#region node_modules/framer-motion/dist/es/motion/features/animation/exit.mjs
var id = 0;
var ExitAnimationFeature = class extends Feature {
	constructor() {
		super(...arguments);
		this.id = id++;
		this.isExitComplete = false;
	}
	update() {
		if (!this.node.presenceContext) return;
		const { isPresent, onExitComplete } = this.node.presenceContext;
		const { isPresent: prevIsPresent } = this.node.prevPresenceContext || {};
		if (!this.node.animationState || isPresent === prevIsPresent) return;
		if (isPresent && prevIsPresent === false) {
			/**
			* When re-entering, if the exit animation already completed
			* (element is at rest), reset to initial values so the enter
			* animation replays from the correct position.
			*/
			if (this.isExitComplete) {
				const { initial, custom } = this.node.getProps();
				if (typeof initial === "string" || typeof initial === "object" && initial !== null && !Array.isArray(initial)) {
					const resolved = resolveVariant(this.node, initial, custom);
					if (resolved) {
						const { transition, transitionEnd, ...target } = resolved;
						for (const key in target) this.node.getValue(key)?.jump(target[key]);
					}
				}
				this.node.animationState.reset();
				this.node.animationState.animateChanges();
			} else this.node.animationState.setActive("exit", false);
			this.isExitComplete = false;
			return;
		}
		const exitAnimation = this.node.animationState.setActive("exit", !isPresent);
		if (onExitComplete && !isPresent) exitAnimation.then(() => {
			this.isExitComplete = true;
			onExitComplete(this.id);
		});
	}
	mount() {
		const { register, onExitComplete } = this.node.presenceContext || {};
		if (onExitComplete) onExitComplete(this.id);
		if (register) this.unmount = register(this.id);
	}
	unmount() {}
};
//#endregion
//#region node_modules/framer-motion/dist/es/motion/features/animations.mjs
var animations = {
	animation: { Feature: AnimationFeature },
	exit: { Feature: ExitAnimationFeature }
};
//#endregion
//#region node_modules/framer-motion/dist/es/events/event-info.mjs
function extractEventInfo(event) {
	return { point: {
		x: event.pageX,
		y: event.pageY
	} };
}
var addPointerInfo = (handler) => (event) => isPrimaryPointer(event) && handler(event, extractEventInfo(event));
//#endregion
//#region node_modules/framer-motion/dist/es/events/add-pointer-event.mjs
function addPointerEvent(target, eventName, handler, options) {
	return addDomEvent(target, eventName, addPointerInfo(handler), options);
}
//#endregion
//#region node_modules/framer-motion/dist/es/utils/get-context-window.mjs
var getContextWindow = ({ current }) => {
	return current ? current.ownerDocument.defaultView : null;
};
//#endregion
//#region node_modules/framer-motion/dist/es/utils/distance.mjs
var distance = (a, b) => Math.abs(a - b);
function distance2D(a, b) {
	const xDelta = distance(a.x, b.x);
	const yDelta = distance(a.y, b.y);
	return Math.sqrt(xDelta ** 2 + yDelta ** 2);
}
//#endregion
//#region node_modules/framer-motion/dist/es/gestures/pan/PanSession.mjs
var overflowStyles$1 = /*#__PURE__*/ new Set(["auto", "scroll"]);
/**
* @internal
*/
var PanSession = class {
	constructor(event, handlers, { transformPagePoint, contextWindow = window, dragSnapToOrigin = false, distanceThreshold = 3, element } = {}) {
		/**
		* @internal
		*/
		this.startEvent = null;
		/**
		* @internal
		*/
		this.lastMoveEvent = null;
		/**
		* @internal
		*/
		this.lastMoveEventInfo = null;
		/**
		* Raw (untransformed) event info, re-transformed each frame
		* so transformPagePoint sees the current parent matrix.
		* @internal
		*/
		this.lastRawMoveEventInfo = null;
		/**
		* @internal
		*/
		this.handlers = {};
		/**
		* @internal
		*/
		this.contextWindow = window;
		/**
		* Scroll positions of scrollable ancestors and window.
		* @internal
		*/
		this.scrollPositions = /* @__PURE__ */ new Map();
		/**
		* Cleanup function for scroll listeners.
		* @internal
		*/
		this.removeScrollListeners = null;
		this.onElementScroll = (event) => {
			this.handleScroll(event.target);
		};
		this.onWindowScroll = () => {
			this.handleScroll(window);
		};
		this.updatePoint = () => {
			if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
			if (this.lastRawMoveEventInfo) this.lastMoveEventInfo = transformPoint(this.lastRawMoveEventInfo, this.transformPagePoint);
			const info = getPanInfo(this.lastMoveEventInfo, this.history);
			const isPanStarted = this.startEvent !== null;
			const isDistancePastThreshold = distance2D(info.offset, {
				x: 0,
				y: 0
			}) >= this.distanceThreshold;
			if (!isPanStarted && !isDistancePastThreshold) return;
			const { point } = info;
			const { timestamp } = frameData;
			this.history.push({
				...point,
				timestamp
			});
			const { onStart, onMove } = this.handlers;
			if (!isPanStarted) {
				onStart && onStart(this.lastMoveEvent, info);
				this.startEvent = this.lastMoveEvent;
			}
			onMove && onMove(this.lastMoveEvent, info);
		};
		this.handlePointerMove = (event, info) => {
			this.lastMoveEvent = event;
			this.lastRawMoveEventInfo = info;
			this.lastMoveEventInfo = transformPoint(info, this.transformPagePoint);
			frame.update(this.updatePoint, true);
		};
		this.handlePointerUp = (event, info) => {
			this.end();
			const { onEnd, onSessionEnd, resumeAnimation } = this.handlers;
			if (this.dragSnapToOrigin || !this.startEvent) resumeAnimation && resumeAnimation();
			if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
			const panInfo = getPanInfo(event.type === "pointercancel" ? this.lastMoveEventInfo : transformPoint(info, this.transformPagePoint), this.history);
			if (this.startEvent && onEnd) onEnd(event, panInfo);
			onSessionEnd && onSessionEnd(event, panInfo);
		};
		if (!isPrimaryPointer(event)) return;
		this.dragSnapToOrigin = dragSnapToOrigin;
		this.handlers = handlers;
		this.transformPagePoint = transformPagePoint;
		this.distanceThreshold = distanceThreshold;
		this.contextWindow = contextWindow || window;
		const initialInfo = transformPoint(extractEventInfo(event), this.transformPagePoint);
		const { point } = initialInfo;
		const { timestamp } = frameData;
		this.history = [{
			...point,
			timestamp
		}];
		const { onSessionStart } = handlers;
		onSessionStart && onSessionStart(event, getPanInfo(initialInfo, this.history));
		const eventOptions = {
			passive: true,
			capture: true
		};
		this.removeListeners = pipe(addPointerEvent(this.contextWindow, "pointermove", this.handlePointerMove, eventOptions), addPointerEvent(this.contextWindow, "pointerup", this.handlePointerUp, eventOptions), addPointerEvent(this.contextWindow, "pointercancel", this.handlePointerUp, eventOptions));
		if (element) this.startScrollTracking(element);
	}
	/**
	* Start tracking scroll on ancestors and window.
	*/
	startScrollTracking(element) {
		let current = element.parentElement;
		while (current) {
			const style = getComputedStyle(current);
			if (overflowStyles$1.has(style.overflowX) || overflowStyles$1.has(style.overflowY)) this.scrollPositions.set(current, {
				x: current.scrollLeft,
				y: current.scrollTop
			});
			current = current.parentElement;
		}
		this.scrollPositions.set(window, {
			x: window.scrollX,
			y: window.scrollY
		});
		window.addEventListener("scroll", this.onElementScroll, { capture: true });
		window.addEventListener("scroll", this.onWindowScroll);
		this.removeScrollListeners = () => {
			window.removeEventListener("scroll", this.onElementScroll, { capture: true });
			window.removeEventListener("scroll", this.onWindowScroll);
		};
	}
	/**
	* Handle scroll compensation during drag.
	*
	* For element scroll: adjusts history origin since pageX/pageY doesn't change.
	* For window scroll: adjusts lastMoveEventInfo since pageX/pageY would change.
	*/
	handleScroll(target) {
		const initial = this.scrollPositions.get(target);
		if (!initial) return;
		const isWindow = target === window;
		const current = isWindow ? {
			x: window.scrollX,
			y: window.scrollY
		} : {
			x: target.scrollLeft,
			y: target.scrollTop
		};
		const delta = {
			x: current.x - initial.x,
			y: current.y - initial.y
		};
		if (delta.x === 0 && delta.y === 0) return;
		if (isWindow) {
			if (this.lastMoveEventInfo) {
				this.lastMoveEventInfo.point.x += delta.x;
				this.lastMoveEventInfo.point.y += delta.y;
			}
		} else if (this.history.length > 0) {
			this.history[0].x -= delta.x;
			this.history[0].y -= delta.y;
		}
		this.scrollPositions.set(target, current);
		frame.update(this.updatePoint, true);
	}
	updateHandlers(handlers) {
		this.handlers = handlers;
	}
	end() {
		this.removeListeners && this.removeListeners();
		this.removeScrollListeners && this.removeScrollListeners();
		this.scrollPositions.clear();
		cancelFrame(this.updatePoint);
	}
};
function transformPoint(info, transformPagePoint) {
	return transformPagePoint ? { point: transformPagePoint(info.point) } : info;
}
function subtractPoint(a, b) {
	return {
		x: a.x - b.x,
		y: a.y - b.y
	};
}
function getPanInfo({ point }, history) {
	return {
		point,
		delta: subtractPoint(point, lastDevicePoint(history)),
		offset: subtractPoint(point, startDevicePoint(history)),
		velocity: getVelocity(history, .1)
	};
}
function startDevicePoint(history) {
	return history[0];
}
function lastDevicePoint(history) {
	return history[history.length - 1];
}
function getVelocity(history, timeDelta) {
	if (history.length < 2) return {
		x: 0,
		y: 0
	};
	let i = history.length - 1;
	let timestampedPoint = null;
	const lastPoint = lastDevicePoint(history);
	while (i >= 0) {
		timestampedPoint = history[i];
		if (lastPoint.timestamp - timestampedPoint.timestamp > /* @__PURE__ */ secondsToMilliseconds(timeDelta)) break;
		i--;
	}
	if (!timestampedPoint) return {
		x: 0,
		y: 0
	};
	/**
	* If the selected point is the pointer-down origin (history[0]),
	* there are better movement points available, and the time gap
	* is suspiciously large (>2x timeDelta), use the next point instead.
	* This prevents stale pointer-down points from diluting velocity
	* in hold-then-flick gestures.
	*/
	if (timestampedPoint === history[0] && history.length > 2 && lastPoint.timestamp - timestampedPoint.timestamp > /* @__PURE__ */ secondsToMilliseconds(timeDelta) * 2) timestampedPoint = history[1];
	const time = /* @__PURE__ */ millisecondsToSeconds(lastPoint.timestamp - timestampedPoint.timestamp);
	if (time === 0) return {
		x: 0,
		y: 0
	};
	const currentVelocity = {
		x: (lastPoint.x - timestampedPoint.x) / time,
		y: (lastPoint.y - timestampedPoint.y) / time
	};
	if (currentVelocity.x === Infinity) currentVelocity.x = 0;
	if (currentVelocity.y === Infinity) currentVelocity.y = 0;
	return currentVelocity;
}
//#endregion
//#region node_modules/framer-motion/dist/es/gestures/drag/utils/constraints.mjs
/**
* Apply constraints to a point. These constraints are both physical along an
* axis, and an elastic factor that determines how much to constrain the point
* by if it does lie outside the defined parameters.
*/
function applyConstraints(point, { min, max }, elastic) {
	if (min !== void 0 && point < min) point = elastic ? mixNumber$1(min, point, elastic.min) : Math.max(point, min);
	else if (max !== void 0 && point > max) point = elastic ? mixNumber$1(max, point, elastic.max) : Math.min(point, max);
	return point;
}
/**
* Calculate constraints in terms of the viewport when defined relatively to the
* measured axis. This is measured from the nearest edge, so a max constraint of 200
* on an axis with a max value of 300 would return a constraint of 500 - axis length
*/
function calcRelativeAxisConstraints(axis, min, max) {
	return {
		min: min !== void 0 ? axis.min + min : void 0,
		max: max !== void 0 ? axis.max + max - (axis.max - axis.min) : void 0
	};
}
/**
* Calculate constraints in terms of the viewport when
* defined relatively to the measured bounding box.
*/
function calcRelativeConstraints(layoutBox, { top, left, bottom, right }) {
	return {
		x: calcRelativeAxisConstraints(layoutBox.x, left, right),
		y: calcRelativeAxisConstraints(layoutBox.y, top, bottom)
	};
}
/**
* Calculate viewport constraints when defined as another viewport-relative axis
*/
function calcViewportAxisConstraints(layoutAxis, constraintsAxis) {
	let min = constraintsAxis.min - layoutAxis.min;
	let max = constraintsAxis.max - layoutAxis.max;
	if (constraintsAxis.max - constraintsAxis.min < layoutAxis.max - layoutAxis.min) [min, max] = [max, min];
	return {
		min,
		max
	};
}
/**
* Calculate viewport constraints when defined as another viewport-relative box
*/
function calcViewportConstraints(layoutBox, constraintsBox) {
	return {
		x: calcViewportAxisConstraints(layoutBox.x, constraintsBox.x),
		y: calcViewportAxisConstraints(layoutBox.y, constraintsBox.y)
	};
}
/**
* Calculate a transform origin relative to the source axis, between 0-1, that results
* in an asthetically pleasing scale/transform needed to project from source to target.
*/
function calcOrigin(source, target) {
	let origin = .5;
	const sourceLength = calcLength(source);
	const targetLength = calcLength(target);
	if (targetLength > sourceLength) origin = /* @__PURE__ */ progress(target.min, target.max - sourceLength, source.min);
	else if (sourceLength > targetLength) origin = /* @__PURE__ */ progress(source.min, source.max - targetLength, target.min);
	return clamp(0, 1, origin);
}
/**
* Rebase the calculated viewport constraints relative to the layout.min point.
*/
function rebaseAxisConstraints(layout, constraints) {
	const relativeConstraints = {};
	if (constraints.min !== void 0) relativeConstraints.min = constraints.min - layout.min;
	if (constraints.max !== void 0) relativeConstraints.max = constraints.max - layout.min;
	return relativeConstraints;
}
var defaultElastic = .35;
/**
* Accepts a dragElastic prop and returns resolved elastic values for each axis.
*/
function resolveDragElastic(dragElastic = defaultElastic) {
	if (dragElastic === false) dragElastic = 0;
	else if (dragElastic === true) dragElastic = defaultElastic;
	return {
		x: resolveAxisElastic(dragElastic, "left", "right"),
		y: resolveAxisElastic(dragElastic, "top", "bottom")
	};
}
function resolveAxisElastic(dragElastic, minLabel, maxLabel) {
	return {
		min: resolvePointElastic(dragElastic, minLabel),
		max: resolvePointElastic(dragElastic, maxLabel)
	};
}
function resolvePointElastic(dragElastic, label) {
	return typeof dragElastic === "number" ? dragElastic : dragElastic[label] || 0;
}
//#endregion
//#region node_modules/framer-motion/dist/es/gestures/drag/VisualElementDragControls.mjs
var elementDragControls = /* @__PURE__ */ new WeakMap();
var VisualElementDragControls = class {
	constructor(visualElement) {
		this.openDragLock = null;
		this.isDragging = false;
		this.currentDirection = null;
		this.originPoint = {
			x: 0,
			y: 0
		};
		/**
		* The permitted boundaries of travel, in pixels.
		*/
		this.constraints = false;
		this.hasMutatedConstraints = false;
		/**
		* The per-axis resolved elastic values.
		*/
		this.elastic = createBox();
		/**
		* The latest pointer event. Used as fallback when the `cancel` and `stop` functions are called without arguments.
		*/
		this.latestPointerEvent = null;
		/**
		* The latest pan info. Used as fallback when the `cancel` and `stop` functions are called without arguments.
		*/
		this.latestPanInfo = null;
		this.visualElement = visualElement;
	}
	start(originEvent, { snapToCursor = false, distanceThreshold } = {}) {
		/**
		* Don't start dragging if this component is exiting
		*/
		const { presenceContext } = this.visualElement;
		if (presenceContext && presenceContext.isPresent === false) return;
		const onSessionStart = (event) => {
			if (snapToCursor) this.snapToCursor(extractEventInfo(event).point);
			this.stopAnimation();
		};
		const onStart = (event, info) => {
			const { drag, dragPropagation, onDragStart } = this.getProps();
			if (drag && !dragPropagation) {
				if (this.openDragLock) this.openDragLock();
				this.openDragLock = setDragLock(drag);
				if (!this.openDragLock) return;
			}
			this.latestPointerEvent = event;
			this.latestPanInfo = info;
			this.isDragging = true;
			this.currentDirection = null;
			this.resolveConstraints();
			if (this.visualElement.projection) {
				this.visualElement.projection.isAnimationBlocked = true;
				this.visualElement.projection.target = void 0;
			}
			/**
			* Record gesture origin and pointer offset
			*/
			eachAxis((axis) => {
				let current = this.getAxisMotionValue(axis).get() || 0;
				/**
				* If the MotionValue is a percentage value convert to px
				*/
				if (percent.test(current)) {
					const { projection } = this.visualElement;
					if (projection && projection.layout) {
						const measuredAxis = projection.layout.layoutBox[axis];
						if (measuredAxis) current = calcLength(measuredAxis) * (parseFloat(current) / 100);
					}
				}
				this.originPoint[axis] = current;
			});
			if (onDragStart) frame.update(() => onDragStart(event, info), false, true);
			addValueToWillChange(this.visualElement, "transform");
			const { animationState } = this.visualElement;
			animationState && animationState.setActive("whileDrag", true);
		};
		const onMove = (event, info) => {
			this.latestPointerEvent = event;
			this.latestPanInfo = info;
			const { dragPropagation, dragDirectionLock, onDirectionLock, onDrag } = this.getProps();
			if (!dragPropagation && !this.openDragLock) return;
			const { offset } = info;
			if (dragDirectionLock && this.currentDirection === null) {
				this.currentDirection = getCurrentDirection(offset);
				if (this.currentDirection !== null) onDirectionLock && onDirectionLock(this.currentDirection);
				return;
			}
			this.updateAxis("x", info.point, offset);
			this.updateAxis("y", info.point, offset);
			/**
			* Ideally we would leave the renderer to fire naturally at the end of
			* this frame but if the element is about to change layout as the result
			* of a re-render we want to ensure the browser can read the latest
			* bounding box to ensure the pointer and element don't fall out of sync.
			*/
			this.visualElement.render();
			/**
			* This must fire after the render call as it might trigger a state
			* change which itself might trigger a layout update.
			*/
			if (onDrag) frame.update(() => onDrag(event, info), false, true);
		};
		const onSessionEnd = (event, info) => {
			this.latestPointerEvent = event;
			this.latestPanInfo = info;
			this.stop(event, info);
			this.latestPointerEvent = null;
			this.latestPanInfo = null;
		};
		const resumeAnimation = () => {
			const { dragSnapToOrigin: snap } = this.getProps();
			if (snap || this.constraints) this.startAnimation({
				x: 0,
				y: 0
			});
		};
		const { dragSnapToOrigin } = this.getProps();
		this.panSession = new PanSession(originEvent, {
			onSessionStart,
			onStart,
			onMove,
			onSessionEnd,
			resumeAnimation
		}, {
			transformPagePoint: this.visualElement.getTransformPagePoint(),
			dragSnapToOrigin,
			distanceThreshold,
			contextWindow: getContextWindow(this.visualElement),
			element: this.visualElement.current
		});
	}
	/**
	* @internal
	*/
	stop(event, panInfo) {
		const finalEvent = event || this.latestPointerEvent;
		const finalPanInfo = panInfo || this.latestPanInfo;
		const isDragging = this.isDragging;
		this.cancel();
		if (!isDragging || !finalPanInfo || !finalEvent) return;
		const { velocity } = finalPanInfo;
		this.startAnimation(velocity);
		const { onDragEnd } = this.getProps();
		if (onDragEnd) frame.postRender(() => onDragEnd(finalEvent, finalPanInfo));
	}
	/**
	* @internal
	*/
	cancel() {
		this.isDragging = false;
		const { projection, animationState } = this.visualElement;
		if (projection) projection.isAnimationBlocked = false;
		this.endPanSession();
		const { dragPropagation } = this.getProps();
		if (!dragPropagation && this.openDragLock) {
			this.openDragLock();
			this.openDragLock = null;
		}
		animationState && animationState.setActive("whileDrag", false);
	}
	/**
	* Clean up the pan session without modifying other drag state.
	* This is used during unmount to ensure event listeners are removed
	* without affecting projection animations or drag locks.
	* @internal
	*/
	endPanSession() {
		this.panSession && this.panSession.end();
		this.panSession = void 0;
	}
	updateAxis(axis, _point, offset) {
		const { drag } = this.getProps();
		if (!offset || !shouldDrag(axis, drag, this.currentDirection)) return;
		const axisValue = this.getAxisMotionValue(axis);
		let next = this.originPoint[axis] + offset[axis];
		if (this.constraints && this.constraints[axis]) next = applyConstraints(next, this.constraints[axis], this.elastic[axis]);
		axisValue.set(next);
	}
	resolveConstraints() {
		const { dragConstraints, dragElastic } = this.getProps();
		const layout = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(false) : this.visualElement.projection?.layout;
		const prevConstraints = this.constraints;
		if (dragConstraints && isRefObject(dragConstraints)) {
			if (!this.constraints) this.constraints = this.resolveRefConstraints();
		} else if (dragConstraints && layout) this.constraints = calcRelativeConstraints(layout.layoutBox, dragConstraints);
		else this.constraints = false;
		this.elastic = resolveDragElastic(dragElastic);
		/**
		* If we're outputting to external MotionValues, we want to rebase the measured constraints
		* from viewport-relative to component-relative. This only applies to relative (non-ref)
		* constraints, as ref-based constraints from calcViewportConstraints are already in the
		* correct coordinate space for the motion value transform offset.
		*/
		if (prevConstraints !== this.constraints && !isRefObject(dragConstraints) && layout && this.constraints && !this.hasMutatedConstraints) eachAxis((axis) => {
			if (this.constraints !== false && this.getAxisMotionValue(axis)) this.constraints[axis] = rebaseAxisConstraints(layout.layoutBox[axis], this.constraints[axis]);
		});
	}
	resolveRefConstraints() {
		const { dragConstraints: constraints, onMeasureDragConstraints } = this.getProps();
		if (!constraints || !isRefObject(constraints)) return false;
		const constraintsElement = constraints.current;
		const { projection } = this.visualElement;
		if (!projection || !projection.layout) return false;
		/**
		* Refresh the root scroll offset so the constraint's viewport box
		* translates to correct page coordinates. The scroll captured at
		* drag mount can be stale if the document was scrolled afterwards —
		* e.g. via the browser restoring scroll on refresh, or an ancestor
		* layout effect running after this element's mount (#2829).
		*
		* Clear the cached scroll first so `updateScroll` bypasses its
		* per-animationId cache and re-reads the live value.
		*/
		if (projection.root) {
			projection.root.scroll = void 0;
			projection.root.updateScroll();
		}
		const constraintsBox = measurePageBox(constraintsElement, projection.root, this.visualElement.getTransformPagePoint());
		let measuredConstraints = calcViewportConstraints(projection.layout.layoutBox, constraintsBox);
		/**
		* If there's an onMeasureDragConstraints listener we call it and
		* if different constraints are returned, set constraints to that
		*/
		if (onMeasureDragConstraints) {
			const userConstraints = onMeasureDragConstraints(convertBoxToBoundingBox(measuredConstraints));
			this.hasMutatedConstraints = !!userConstraints;
			if (userConstraints) measuredConstraints = convertBoundingBoxToBox(userConstraints);
		}
		return measuredConstraints;
	}
	startAnimation(velocity) {
		const { drag, dragMomentum, dragElastic, dragTransition, dragSnapToOrigin, onDragTransitionEnd } = this.getProps();
		const constraints = this.constraints || {};
		const momentumAnimations = eachAxis((axis) => {
			if (!shouldDrag(axis, drag, this.currentDirection)) return;
			let transition = constraints && constraints[axis] || {};
			if (dragSnapToOrigin === true || dragSnapToOrigin === axis) transition = {
				min: 0,
				max: 0
			};
			/**
			* Overdamp the boundary spring if `dragElastic` is disabled. There's still a frame
			* of spring animations so we should look into adding a disable spring option to `inertia`.
			* We could do something here where we affect the `bounceStiffness` and `bounceDamping`
			* using the value of `dragElastic`.
			*/
			const bounceStiffness = dragElastic ? 200 : 1e6;
			const bounceDamping = dragElastic ? 40 : 1e7;
			const inertia = {
				type: "inertia",
				velocity: dragMomentum ? velocity[axis] : 0,
				bounceStiffness,
				bounceDamping,
				timeConstant: 750,
				restDelta: 1,
				restSpeed: 10,
				...dragTransition,
				...transition
			};
			return this.startAxisValueAnimation(axis, inertia);
		});
		return Promise.all(momentumAnimations).then(onDragTransitionEnd);
	}
	startAxisValueAnimation(axis, transition) {
		const axisValue = this.getAxisMotionValue(axis);
		addValueToWillChange(this.visualElement, axis);
		return axisValue.start(animateMotionValue(axis, axisValue, 0, transition, this.visualElement, false));
	}
	stopAnimation() {
		eachAxis((axis) => this.getAxisMotionValue(axis).stop());
	}
	/**
	* Drag works differently depending on which props are provided.
	*
	* - If _dragX and _dragY are provided, we output the gesture delta directly to those motion values.
	* - Otherwise, we apply the delta to the x/y motion values.
	*/
	getAxisMotionValue(axis) {
		const dragKey = `_drag${axis.toUpperCase()}`;
		const externalMotionValue = this.visualElement.getProps()[dragKey];
		return externalMotionValue ? externalMotionValue : this.visualElement.getValue(axis, this.visualElement.latestValues[axis] ?? 0);
	}
	snapToCursor(point) {
		eachAxis((axis) => {
			const { drag } = this.getProps();
			if (!shouldDrag(axis, drag, this.currentDirection)) return;
			const { projection } = this.visualElement;
			const axisValue = this.getAxisMotionValue(axis);
			if (projection && projection.layout) {
				const { min, max } = projection.layout.layoutBox[axis];
				/**
				* The layout measurement includes the current transform value,
				* so we need to add it back to get the correct snap position.
				* This fixes an issue where elements with initial coordinates
				* would snap to the wrong position on the first drag.
				*/
				const current = axisValue.get() || 0;
				axisValue.set(point[axis] - mixNumber$1(min, max, .5) + current);
			}
		});
	}
	/**
	* When the viewport resizes we want to check if the measured constraints
	* have changed and, if so, reposition the element within those new constraints
	* relative to where it was before the resize.
	*/
	scalePositionWithinConstraints() {
		if (!this.visualElement.current) return;
		const { drag, dragConstraints } = this.getProps();
		const { projection } = this.visualElement;
		if (!isRefObject(dragConstraints) || !projection || !this.constraints) return;
		/**
		* Stop current animations as there can be visual glitching if we try to do
		* this mid-animation
		*/
		this.stopAnimation();
		/**
		* Record the relative position of the dragged element relative to the
		* constraints box and save as a progress value.
		*/
		const boxProgress = {
			x: 0,
			y: 0
		};
		eachAxis((axis) => {
			const axisValue = this.getAxisMotionValue(axis);
			if (axisValue && this.constraints !== false) {
				const latest = axisValue.get();
				boxProgress[axis] = calcOrigin({
					min: latest,
					max: latest
				}, this.constraints[axis]);
			}
		});
		/**
		* Update the layout of this element and resolve the latest drag constraints
		*/
		const { transformTemplate } = this.visualElement.getProps();
		this.visualElement.current.style.transform = transformTemplate ? transformTemplate({}, "") : "none";
		projection.root && projection.root.updateScroll();
		projection.updateLayout();
		/**
		* Reset constraints so resolveConstraints() will recalculate them
		* with the freshly measured layout rather than returning the cached value.
		*/
		this.constraints = false;
		this.resolveConstraints();
		/**
		* For each axis, calculate the current progress of the layout axis
		* within the new constraints.
		*/
		eachAxis((axis) => {
			if (!shouldDrag(axis, drag, null)) return;
			/**
			* Calculate a new transform based on the previous box progress
			*/
			const axisValue = this.getAxisMotionValue(axis);
			const { min, max } = this.constraints[axis];
			axisValue.set(mixNumber$1(min, max, boxProgress[axis]));
		});
		/**
		* Flush the updated transform to the DOM synchronously to prevent
		* a visual flash at the element's CSS layout position (0,0) when
		* the transform was stripped for measurement.
		*/
		this.visualElement.render();
	}
	addListeners() {
		if (!this.visualElement.current) return;
		elementDragControls.set(this.visualElement, this);
		const element = this.visualElement.current;
		/**
		* Attach a pointerdown event listener on this DOM element to initiate drag tracking.
		*/
		const stopPointerListener = addPointerEvent(element, "pointerdown", (event) => {
			const { drag, dragListener = true } = this.getProps();
			const target = event.target;
			/**
			* Only block drag if clicking on a text input child element
			* (input, textarea, select, contenteditable) where users might
			* want to select text or interact with the control.
			*
			* Buttons and links don't block drag since they don't have
			* click-and-move actions of their own.
			*/
			const isClickingTextInputChild = target !== element && isElementTextInput(target);
			if (drag && dragListener && !isClickingTextInputChild) this.start(event);
		});
		/**
		* If using ref-based constraints, observe both the draggable element
		* and the constraint container for size changes via ResizeObserver.
		* Setup is deferred because dragConstraints.current is null when
		* addListeners first runs (React hasn't committed the ref yet).
		*/
		let stopResizeObservers;
		const measureDragConstraints = () => {
			const { dragConstraints } = this.getProps();
			if (isRefObject(dragConstraints) && dragConstraints.current) {
				this.constraints = this.resolveRefConstraints();
				if (!stopResizeObservers) stopResizeObservers = startResizeObservers(element, dragConstraints.current, () => this.scalePositionWithinConstraints());
			}
		};
		const { projection } = this.visualElement;
		const stopMeasureLayoutListener = projection.addEventListener("measure", measureDragConstraints);
		if (projection && !projection.layout) {
			projection.root && projection.root.updateScroll();
			projection.updateLayout();
		}
		frame.read(measureDragConstraints);
		/**
		* Attach a window resize listener to scale the draggable target within its defined
		* constraints as the window resizes.
		*/
		const stopResizeListener = addDomEvent(window, "resize", () => this.scalePositionWithinConstraints());
		/**
		* If the element's layout changes, calculate the delta and apply that to
		* the drag gesture's origin point.
		*/
		const stopLayoutUpdateListener = projection.addEventListener("didUpdate", (({ delta, hasLayoutChanged }) => {
			if (this.isDragging && hasLayoutChanged) {
				eachAxis((axis) => {
					const motionValue = this.getAxisMotionValue(axis);
					if (!motionValue) return;
					this.originPoint[axis] += delta[axis].translate;
					motionValue.set(motionValue.get() + delta[axis].translate);
				});
				this.visualElement.render();
			}
		}));
		return () => {
			stopResizeListener();
			stopPointerListener();
			stopMeasureLayoutListener();
			stopLayoutUpdateListener && stopLayoutUpdateListener();
			stopResizeObservers && stopResizeObservers();
		};
	}
	getProps() {
		const props = this.visualElement.getProps();
		const { drag = false, dragDirectionLock = false, dragPropagation = false, dragConstraints = false, dragElastic = defaultElastic, dragMomentum = true } = props;
		return {
			...props,
			drag,
			dragDirectionLock,
			dragPropagation,
			dragConstraints,
			dragElastic,
			dragMomentum
		};
	}
};
function skipFirstCall(callback) {
	let isFirst = true;
	return () => {
		if (isFirst) {
			isFirst = false;
			return;
		}
		callback();
	};
}
function startResizeObservers(element, constraintsElement, onResize) {
	const stopElement = resize(element, skipFirstCall(onResize));
	const stopContainer = resize(constraintsElement, skipFirstCall(onResize));
	return () => {
		stopElement();
		stopContainer();
	};
}
function shouldDrag(direction, drag, currentDirection) {
	return (drag === true || drag === direction) && (currentDirection === null || currentDirection === direction);
}
/**
* Based on an x/y offset determine the current drag direction. If both axis' offsets are lower
* than the provided threshold, return `null`.
*
* @param offset - The x/y offset from origin.
* @param lockThreshold - (Optional) - the minimum absolute offset before we can determine a drag direction.
*/
function getCurrentDirection(offset, lockThreshold = 10) {
	let direction = null;
	if (Math.abs(offset.y) > lockThreshold) direction = "y";
	else if (Math.abs(offset.x) > lockThreshold) direction = "x";
	return direction;
}
//#endregion
//#region node_modules/framer-motion/dist/es/gestures/drag/index.mjs
var DragGesture = class extends Feature {
	constructor(node) {
		super(node);
		this.removeGroupControls = noop;
		this.removeListeners = noop;
		this.controls = new VisualElementDragControls(node);
	}
	mount() {
		const { dragControls } = this.node.getProps();
		if (dragControls) this.removeGroupControls = dragControls.subscribe(this.controls);
		this.removeListeners = this.controls.addListeners() || noop;
	}
	update() {
		const { dragControls } = this.node.getProps();
		const { dragControls: prevDragControls } = this.node.prevProps || {};
		if (dragControls !== prevDragControls) {
			this.removeGroupControls();
			if (dragControls) this.removeGroupControls = dragControls.subscribe(this.controls);
		}
	}
	unmount() {
		this.removeGroupControls();
		this.removeListeners();
		/**
		* In React 19, during list reorder reconciliation, components may
		* briefly unmount and remount while the drag is still active. If we're
		* actively dragging, we should NOT end the pan session - it will
		* continue tracking pointer events via its window-level listeners.
		*
		* The pan session will be properly cleaned up when:
		* 1. The drag ends naturally (pointerup/pointercancel)
		* 2. The component is truly removed from the DOM
		*/
		if (!this.controls.isDragging) this.controls.endPanSession();
	}
};
//#endregion
//#region node_modules/framer-motion/dist/es/gestures/pan/index.mjs
var asyncHandler = (handler) => (event, info) => {
	if (handler) frame.update(() => handler(event, info), false, true);
};
var PanGesture = class extends Feature {
	constructor() {
		super(...arguments);
		this.removePointerDownListener = noop;
	}
	onPointerDown(pointerDownEvent) {
		this.session = new PanSession(pointerDownEvent, this.createPanHandlers(), {
			transformPagePoint: this.node.getTransformPagePoint(),
			contextWindow: getContextWindow(this.node)
		});
	}
	createPanHandlers() {
		const { onPanSessionStart, onPanStart, onPan, onPanEnd } = this.node.getProps();
		return {
			onSessionStart: asyncHandler(onPanSessionStart),
			onStart: asyncHandler(onPanStart),
			onMove: asyncHandler(onPan),
			onEnd: (event, info) => {
				delete this.session;
				if (onPanEnd) frame.postRender(() => onPanEnd(event, info));
			}
		};
	}
	mount() {
		this.removePointerDownListener = addPointerEvent(this.node.current, "pointerdown", (event) => this.onPointerDown(event));
	}
	update() {
		this.session && this.session.updateHandlers(this.createPanHandlers());
	}
	unmount() {
		this.removePointerDownListener();
		this.session && this.session.end();
	}
};
//#endregion
//#region node_modules/framer-motion/dist/es/motion/features/layout/MeasureLayout.mjs
var { useContext: useContext$2, Component } = await importShared("react");
/**
* Track whether we've taken any snapshots yet. If not,
* we can safely skip notification of didUpdate.
*
* Difficult to capture in a test but to prevent flickering
* we must set this to true either on update or unmount.
* Running `next-env/layout-id` in Safari will show this behaviour if broken.
*/
var hasTakenAnySnapshot = false;
var MeasureLayoutWithContext = class extends Component {
	/**
	* This only mounts projection nodes for components that
	* need measuring, we might want to do it for all components
	* in order to incorporate transforms
	*/
	componentDidMount() {
		const { visualElement, layoutGroup, switchLayoutGroup, layoutId } = this.props;
		const { projection } = visualElement;
		if (projection) {
			if (layoutGroup.group) layoutGroup.group.add(projection);
			if (switchLayoutGroup && switchLayoutGroup.register && layoutId) switchLayoutGroup.register(projection);
			if (hasTakenAnySnapshot) projection.root.didUpdate();
			projection.addEventListener("animationComplete", () => {
				this.safeToRemove();
			});
			projection.setOptions({
				...projection.options,
				layoutDependency: this.props.layoutDependency,
				onExitComplete: () => this.safeToRemove()
			});
		}
		globalProjectionState.hasEverUpdated = true;
	}
	getSnapshotBeforeUpdate(prevProps) {
		const { layoutDependency, visualElement, drag, isPresent } = this.props;
		const { projection } = visualElement;
		if (!projection) return null;
		/**
		* TODO: We use this data in relegate to determine whether to
		* promote a previous element. There's no guarantee its presence data
		* will have updated by this point - if a bug like this arises it will
		* have to be that we markForRelegation and then find a new lead some other way,
		* perhaps in didUpdate
		*/
		projection.isPresent = isPresent;
		if (prevProps.layoutDependency !== layoutDependency) projection.setOptions({
			...projection.options,
			layoutDependency
		});
		hasTakenAnySnapshot = true;
		if (drag || prevProps.layoutDependency !== layoutDependency || layoutDependency === void 0 || prevProps.isPresent !== isPresent) projection.willUpdate();
		else this.safeToRemove();
		if (prevProps.isPresent !== isPresent) {
			if (isPresent) projection.promote();
			else if (!projection.relegate())
 /**
			* If there's another stack member taking over from this one,
			* it's in charge of the exit animation and therefore should
			* be in charge of the safe to remove. Otherwise we call it here.
			*/
			frame.postRender(() => {
				const stack = projection.getStack();
				if (!stack || !stack.members.length) this.safeToRemove();
			});
		}
		return null;
	}
	componentDidUpdate() {
		const { visualElement, layoutAnchor } = this.props;
		const { projection } = visualElement;
		if (projection) {
			projection.options.layoutAnchor = layoutAnchor;
			projection.root.didUpdate();
			microtask.postRender(() => {
				if (!projection.currentAnimation && projection.isLead()) this.safeToRemove();
			});
		}
	}
	componentWillUnmount() {
		const { visualElement, layoutGroup, switchLayoutGroup: promoteContext } = this.props;
		const { projection } = visualElement;
		hasTakenAnySnapshot = true;
		if (projection) {
			projection.scheduleCheckAfterUnmount();
			if (layoutGroup && layoutGroup.group) layoutGroup.group.remove(projection);
			if (promoteContext && promoteContext.deregister) promoteContext.deregister(projection);
		}
	}
	safeToRemove() {
		const { safeToRemove } = this.props;
		safeToRemove && safeToRemove();
	}
	render() {
		return null;
	}
};
function MeasureLayout(props) {
	const [isPresent, safeToRemove] = usePresence();
	const layoutGroup = useContext$2(LayoutGroupContext);
	return (0, import_jsx_runtime.jsx)(MeasureLayoutWithContext, {
		...props,
		layoutGroup,
		switchLayoutGroup: useContext$2(SwitchLayoutGroupContext),
		isPresent,
		safeToRemove
	});
}
//#endregion
//#region node_modules/framer-motion/dist/es/motion/features/drag.mjs
var drag = {
	pan: { Feature: PanGesture },
	drag: {
		Feature: DragGesture,
		ProjectionNode: HTMLProjectionNode,
		MeasureLayout
	}
};
//#endregion
//#region node_modules/framer-motion/dist/es/gestures/hover.mjs
function handleHoverEvent(node, event, lifecycle) {
	const { props } = node;
	if (node.animationState && props.whileHover) node.animationState.setActive("whileHover", lifecycle === "Start");
	const callback = props["onHover" + lifecycle];
	if (callback) frame.postRender(() => callback(event, extractEventInfo(event)));
}
var HoverGesture = class extends Feature {
	mount() {
		const { current } = this.node;
		if (!current) return;
		this.unmount = hover(current, (_element, startEvent) => {
			handleHoverEvent(this.node, startEvent, "Start");
			return (endEvent) => handleHoverEvent(this.node, endEvent, "End");
		});
	}
	unmount() {}
};
//#endregion
//#region node_modules/framer-motion/dist/es/gestures/focus.mjs
var FocusGesture = class extends Feature {
	constructor() {
		super(...arguments);
		this.isActive = false;
	}
	onFocus() {
		let isFocusVisible = false;
		/**
		* If this element doesn't match focus-visible then don't
		* apply whileHover. But, if matches throws that focus-visible
		* is not a valid selector then in that browser outline styles will be applied
		* to the element by default and we want to match that behaviour with whileFocus.
		*/
		try {
			isFocusVisible = this.node.current.matches(":focus-visible");
		} catch (e) {
			isFocusVisible = true;
		}
		if (!isFocusVisible || !this.node.animationState) return;
		this.node.animationState.setActive("whileFocus", true);
		this.isActive = true;
	}
	onBlur() {
		if (!this.isActive || !this.node.animationState) return;
		this.node.animationState.setActive("whileFocus", false);
		this.isActive = false;
	}
	mount() {
		this.unmount = pipe(addDomEvent(this.node.current, "focus", () => this.onFocus()), addDomEvent(this.node.current, "blur", () => this.onBlur()));
	}
	unmount() {}
};
//#endregion
//#region node_modules/framer-motion/dist/es/gestures/press.mjs
function handlePressEvent(node, event, lifecycle) {
	const { props } = node;
	if (node.current instanceof HTMLButtonElement && node.current.disabled) return;
	if (node.animationState && props.whileTap) node.animationState.setActive("whileTap", lifecycle === "Start");
	const callback = props["onTap" + (lifecycle === "End" ? "" : lifecycle)];
	if (callback) frame.postRender(() => callback(event, extractEventInfo(event)));
}
var PressGesture = class extends Feature {
	mount() {
		const { current } = this.node;
		if (!current) return;
		const { globalTapTarget, propagate } = this.node.props;
		this.unmount = press(current, (_element, startEvent) => {
			handlePressEvent(this.node, startEvent, "Start");
			return (endEvent, { success }) => handlePressEvent(this.node, endEvent, success ? "End" : "Cancel");
		}, {
			useGlobalTarget: globalTapTarget,
			stopPropagation: propagate?.tap === false
		});
	}
	unmount() {}
};
//#endregion
//#region node_modules/framer-motion/dist/es/motion/features/viewport/observers.mjs
/**
* Map an IntersectionHandler callback to an element. We only ever make one handler for one
* element, so even though these handlers might all be triggered by different
* observers, we can keep them in the same map.
*/
var observerCallbacks = /* @__PURE__ */ new WeakMap();
/**
* Multiple observers can be created for multiple element/document roots. Each with
* different settings. So here we store dictionaries of observers to each root,
* using serialised settings (threshold/margin) as lookup keys.
*/
var observers = /* @__PURE__ */ new WeakMap();
var fireObserverCallback = (entry) => {
	const callback = observerCallbacks.get(entry.target);
	callback && callback(entry);
};
var fireAllObserverCallbacks = (entries) => {
	entries.forEach(fireObserverCallback);
};
function initIntersectionObserver({ root, ...options }) {
	const lookupRoot = root || document;
	/**
	* If we don't have an observer lookup map for this root, create one.
	*/
	if (!observers.has(lookupRoot)) observers.set(lookupRoot, {});
	const rootObservers = observers.get(lookupRoot);
	const key = JSON.stringify(options);
	/**
	* If we don't have an observer for this combination of root and settings,
	* create one.
	*/
	if (!rootObservers[key]) rootObservers[key] = new IntersectionObserver(fireAllObserverCallbacks, {
		root,
		...options
	});
	return rootObservers[key];
}
function observeIntersection(element, options, callback) {
	const rootInteresectionObserver = initIntersectionObserver(options);
	observerCallbacks.set(element, callback);
	rootInteresectionObserver.observe(element);
	return () => {
		observerCallbacks.delete(element);
		rootInteresectionObserver.unobserve(element);
	};
}
//#endregion
//#region node_modules/framer-motion/dist/es/motion/features/viewport/index.mjs
var thresholdNames = {
	some: 0,
	all: 1
};
var InViewFeature = class extends Feature {
	constructor() {
		super(...arguments);
		this.hasEnteredView = false;
		this.isInView = false;
	}
	startObserver() {
		this.stopObserver?.();
		const { viewport = {} } = this.node.getProps();
		const { root, margin: rootMargin, amount = "some", once } = viewport;
		const options = {
			root: root ? root.current : void 0,
			rootMargin,
			threshold: typeof amount === "number" ? amount : thresholdNames[amount]
		};
		const onIntersectionUpdate = (entry) => {
			const { isIntersecting } = entry;
			/**
			* If there's been no change in the viewport state, early return.
			*/
			if (this.isInView === isIntersecting) return;
			this.isInView = isIntersecting;
			/**
			* Handle hasEnteredView. If this is only meant to run once, and
			* element isn't visible, early return. Otherwise set hasEnteredView to true.
			*/
			if (once && !isIntersecting && this.hasEnteredView) return;
			else if (isIntersecting) this.hasEnteredView = true;
			if (this.node.animationState) this.node.animationState.setActive("whileInView", isIntersecting);
			/**
			* Use the latest committed props rather than the ones in scope
			* when this observer is created
			*/
			const { onViewportEnter, onViewportLeave } = this.node.getProps();
			const callback = isIntersecting ? onViewportEnter : onViewportLeave;
			callback && callback(entry);
		};
		this.stopObserver = observeIntersection(this.node.current, options, onIntersectionUpdate);
	}
	mount() {
		this.startObserver();
	}
	update() {
		if (typeof IntersectionObserver === "undefined") return;
		const { props, prevProps } = this.node;
		if ([
			"amount",
			"margin",
			"root"
		].some(hasViewportOptionChanged(props, prevProps))) this.startObserver();
	}
	unmount() {
		this.stopObserver?.();
		this.hasEnteredView = false;
		this.isInView = false;
	}
};
function hasViewportOptionChanged({ viewport = {} }, { viewport: prevViewport = {} } = {}) {
	return (name) => viewport[name] !== prevViewport[name];
}
//#endregion
//#region node_modules/framer-motion/dist/es/motion/features/gestures.mjs
var gestureAnimations = {
	inView: { Feature: InViewFeature },
	tap: { Feature: PressGesture },
	focus: { Feature: FocusGesture },
	hover: { Feature: HoverGesture }
};
//#endregion
//#region node_modules/framer-motion/dist/es/motion/features/layout.mjs
var layout = { layout: {
	ProjectionNode: HTMLProjectionNode,
	MeasureLayout
} };
//#endregion
//#region node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs
var motion = /*@__PURE__*/ createMotionProxy({
	...animations,
	...gestureAnimations,
	...drag,
	...layout
}, createDomVisualElement);
//#endregion
//#region node_modules/framer-motion/dist/es/context/ReorderContext.mjs
var { createContext } = await importShared("react");
var ReorderContext = createContext(null);
//#endregion
//#region node_modules/framer-motion/dist/es/components/Reorder/utils/check-reorder.mjs
function checkReorder(order, value, offset, velocity) {
	if (!velocity) return order;
	const index = order.findIndex((item) => item.value === value);
	if (index === -1) return order;
	const nextOffset = velocity > 0 ? 1 : -1;
	const nextItem = order[index + nextOffset];
	if (!nextItem) return order;
	const item = order[index];
	const nextLayout = nextItem.layout;
	const nextItemCenter = mixNumber$1(nextLayout.min, nextLayout.max, .5);
	if (nextOffset === 1 && item.layout.max + offset > nextItemCenter || nextOffset === -1 && item.layout.min + offset < nextItemCenter) return moveItem(order, index, index + nextOffset);
	return order;
}
//#endregion
//#region node_modules/framer-motion/dist/es/components/Reorder/Group.mjs
var { forwardRef: forwardRef$1, useRef: useRef$1, useEffect: useEffect$2 } = await importShared("react");
function ReorderGroupComponent({ children, as = "ul", axis = "y", onReorder, values, ...props }, externalRef) {
	const Component = useConstant(() => motion[as]);
	const order = [];
	const isReordering = useRef$1(false);
	const groupRef = useRef$1(null);
	const context = {
		axis,
		groupRef,
		registerItem: (value, layout) => {
			const idx = order.findIndex((entry) => value === entry.value);
			if (idx !== -1) order[idx].layout = layout[axis];
			else order.push({
				value,
				layout: layout[axis]
			});
			order.sort(compareMin);
		},
		updateOrder: (item, offset, velocity) => {
			if (isReordering.current) return;
			const newOrder = checkReorder(order, item, offset, velocity);
			if (order !== newOrder) {
				isReordering.current = true;
				const newValues = [...values];
				for (let i = 0; i < newOrder.length; i++) if (order[i].value !== newOrder[i].value) {
					const a = values.indexOf(order[i].value);
					const b = values.indexOf(newOrder[i].value);
					if (a !== -1 && b !== -1) [newValues[a], newValues[b]] = [newValues[b], newValues[a]];
					break;
				}
				onReorder(newValues);
			}
		}
	};
	useEffect$2(() => {
		isReordering.current = false;
	});
	const setRef = (element) => {
		groupRef.current = element;
		if (typeof externalRef === "function") externalRef(element);
		else if (externalRef) externalRef.current = element;
	};
	/**
	* Disable browser scroll anchoring on the group container.
	* When items reorder, scroll anchoring can cause the browser to adjust
	* the scroll position, which interferes with drag position calculations.
	*/
	const groupStyle = {
		overflowAnchor: "none",
		...props.style
	};
	return (0, import_jsx_runtime.jsx)(Component, {
		...props,
		style: groupStyle,
		ref: setRef,
		ignoreStrict: true,
		children: (0, import_jsx_runtime.jsx)(ReorderContext.Provider, {
			value: context,
			children
		})
	});
}
var ReorderGroup = /*@__PURE__*/ forwardRef$1(ReorderGroupComponent);
function compareMin(a, b) {
	return a.layout.min - b.layout.min;
}
//#endregion
//#region node_modules/framer-motion/dist/es/value/use-motion-value.mjs
var { useContext: useContext$1, useState: useState$3, useEffect: useEffect$1 } = await importShared("react");
/**
* Creates a `MotionValue` to track the state and velocity of a value.
*
* Usually, these are created automatically. For advanced use-cases, like use with `useTransform`, you can create `MotionValue`s externally and pass them into the animated component via the `style` prop.
*
* ```jsx
* export const MyComponent = () => {
*   const scale = useMotionValue(1)
*
*   return <motion.div style={{ scale }} />
* }
* ```
*
* @param initial - The initial state.
*
* @public
*/
function useMotionValue(initial) {
	const value = useConstant(() => motionValue(initial));
	/**
	* If this motion value is being used in static mode, like on
	* the Framer canvas, force components to rerender when the motion
	* value is updated.
	*/
	const { isStatic } = useContext$1(MotionConfigContext);
	if (isStatic) {
		const [, setLatest] = useState$3(initial);
		useEffect$1(() => value.on("change", setLatest), []);
	}
	return value;
}
//#endregion
//#region node_modules/framer-motion/dist/es/value/use-combine-values.mjs
function useCombineMotionValues(values, combineValues) {
	/**
	* Initialise the returned motion value. This remains the same between renders.
	*/
	const value = useMotionValue(combineValues());
	/**
	* Create a function that will update the template motion value with the latest values.
	* This is pre-bound so whenever a motion value updates it can schedule its
	* execution in Framesync. If it's already been scheduled it won't be fired twice
	* in a single frame.
	*/
	const updateValue = () => value.set(combineValues());
	/**
	* Synchronously update the motion value with the latest values during the render.
	* This ensures that within a React render, the styles applied to the DOM are up-to-date.
	*/
	updateValue();
	/**
	* Subscribe to all motion values found within the template. Whenever any of them change,
	* schedule an update.
	*/
	useIsomorphicLayoutEffect(() => {
		const scheduleUpdate = () => frame.preRender(updateValue, false, true);
		const subscriptions = values.map((v) => v.on("change", scheduleUpdate));
		return () => {
			subscriptions.forEach((unsubscribe) => unsubscribe());
			cancelFrame(updateValue);
		};
	});
	return value;
}
//#endregion
//#region node_modules/framer-motion/dist/es/value/use-computed.mjs
function useComputed(compute) {
	/**
	* Open session of collectMotionValues. Any MotionValue that calls get()
	* will be saved into this array.
	*/
	collectMotionValues.current = [];
	compute();
	const value = useCombineMotionValues(collectMotionValues.current, compute);
	/**
	* Synchronously close session of collectMotionValues.
	*/
	collectMotionValues.current = void 0;
	return value;
}
//#endregion
//#region node_modules/framer-motion/dist/es/value/use-transform.mjs
function useTransform(input, inputRangeOrTransformer, outputRangeOrMap, options) {
	if (typeof input === "function") return useComputed(input);
	if (outputRangeOrMap !== void 0 && !Array.isArray(outputRangeOrMap) && typeof inputRangeOrTransformer !== "function") return useMapTransform(input, inputRangeOrTransformer, outputRangeOrMap, options);
	const transformer = typeof inputRangeOrTransformer === "function" ? inputRangeOrTransformer : transform(inputRangeOrTransformer, outputRangeOrMap, options);
	const result = Array.isArray(input) ? useListTransform(input, transformer) : useListTransform([input], ([latest]) => transformer(latest));
	const inputAccelerate = !Array.isArray(input) ? input.accelerate : void 0;
	if (inputAccelerate && !inputAccelerate.isTransformed && typeof inputRangeOrTransformer !== "function" && Array.isArray(outputRangeOrMap) && options?.clamp !== false) result.accelerate = {
		...inputAccelerate,
		times: inputRangeOrTransformer,
		keyframes: outputRangeOrMap,
		isTransformed: true,
		...options?.ease ? { ease: options.ease } : {}
	};
	return result;
}
function useListTransform(values, transformer) {
	const latest = useConstant(() => []);
	return useCombineMotionValues(values, () => {
		latest.length = 0;
		const numValues = values.length;
		for (let i = 0; i < numValues; i++) latest[i] = values[i].get();
		return transformer(latest);
	});
}
function useMapTransform(inputValue, inputRange, outputMap, options) {
	/**
	* Capture keys once to ensure hooks are called in consistent order.
	*/
	const keys = useConstant(() => Object.keys(outputMap));
	const output = useConstant(() => ({}));
	for (const key of keys) output[key] = useTransform(inputValue, inputRange, outputMap[key], options);
	return output;
}
//#endregion
//#region node_modules/framer-motion/dist/es/components/Reorder/utils/auto-scroll.mjs
var threshold = 50;
var maxSpeed = 25;
var overflowStyles = /* @__PURE__ */ new Set(["auto", "scroll"]);
var initialScrollLimits = /* @__PURE__ */ new WeakMap();
var activeScrollEdge = /* @__PURE__ */ new WeakMap();
var currentGroupElement = null;
function resetAutoScrollState() {
	if (currentGroupElement) {
		const scrollableAncestor = findScrollableAncestor(currentGroupElement, "y");
		if (scrollableAncestor) {
			activeScrollEdge.delete(scrollableAncestor);
			initialScrollLimits.delete(scrollableAncestor);
		}
		const scrollableAncestorX = findScrollableAncestor(currentGroupElement, "x");
		if (scrollableAncestorX && scrollableAncestorX !== scrollableAncestor) {
			activeScrollEdge.delete(scrollableAncestorX);
			initialScrollLimits.delete(scrollableAncestorX);
		}
		currentGroupElement = null;
	}
}
function isScrollableElement(element, axis) {
	const style = getComputedStyle(element);
	const overflow = axis === "x" ? style.overflowX : style.overflowY;
	const isDocumentScroll = element === document.body || element === document.documentElement;
	return overflowStyles.has(overflow) || isDocumentScroll;
}
function findScrollableAncestor(element, axis) {
	let current = element?.parentElement;
	while (current) {
		if (isScrollableElement(current, axis)) return current;
		current = current.parentElement;
	}
	return null;
}
function getScrollAmount(pointerPosition, scrollElement, axis) {
	const rect = scrollElement.getBoundingClientRect();
	const start = axis === "x" ? Math.max(0, rect.left) : Math.max(0, rect.top);
	const end = axis === "x" ? Math.min(window.innerWidth, rect.right) : Math.min(window.innerHeight, rect.bottom);
	const distanceFromStart = pointerPosition - start;
	const distanceFromEnd = end - pointerPosition;
	if (distanceFromStart < threshold) {
		const intensity = 1 - distanceFromStart / threshold;
		return {
			amount: -25 * intensity * intensity,
			edge: "start"
		};
	} else if (distanceFromEnd < threshold) {
		const intensity = 1 - distanceFromEnd / threshold;
		return {
			amount: maxSpeed * intensity * intensity,
			edge: "end"
		};
	}
	return {
		amount: 0,
		edge: null
	};
}
function autoScrollIfNeeded(groupElement, pointerPosition, axis, velocity) {
	if (!groupElement) return;
	currentGroupElement = groupElement;
	const scrollableAncestor = findScrollableAncestor(groupElement, axis);
	if (!scrollableAncestor) return;
	const { amount: scrollAmount, edge } = getScrollAmount(pointerPosition - (axis === "x" ? window.scrollX : window.scrollY), scrollableAncestor, axis);
	if (edge === null) {
		activeScrollEdge.delete(scrollableAncestor);
		initialScrollLimits.delete(scrollableAncestor);
		return;
	}
	const currentActiveEdge = activeScrollEdge.get(scrollableAncestor);
	const isDocumentScroll = scrollableAncestor === document.body || scrollableAncestor === document.documentElement;
	if (currentActiveEdge !== edge) {
		if (!(edge === "start" && velocity < 0 || edge === "end" && velocity > 0)) return;
		activeScrollEdge.set(scrollableAncestor, edge);
		const maxScroll = axis === "x" ? scrollableAncestor.scrollWidth - (isDocumentScroll ? window.innerWidth : scrollableAncestor.clientWidth) : scrollableAncestor.scrollHeight - (isDocumentScroll ? window.innerHeight : scrollableAncestor.clientHeight);
		initialScrollLimits.set(scrollableAncestor, maxScroll);
	}
	if (scrollAmount > 0) {
		const initialLimit = initialScrollLimits.get(scrollableAncestor);
		if ((axis === "x" ? isDocumentScroll ? window.scrollX : scrollableAncestor.scrollLeft : isDocumentScroll ? window.scrollY : scrollableAncestor.scrollTop) >= initialLimit) return;
	}
	if (axis === "x") if (isDocumentScroll) window.scrollBy({ left: scrollAmount });
	else scrollableAncestor.scrollLeft += scrollAmount;
	else if (isDocumentScroll) window.scrollBy({ top: scrollAmount });
	else scrollableAncestor.scrollTop += scrollAmount;
}
//#endregion
//#region node_modules/framer-motion/dist/es/components/Reorder/Item.mjs
var { forwardRef, useContext } = await importShared("react");
function useDefaultMotionValue(value, defaultValue = 0) {
	return isMotionValue(value) ? value : useMotionValue(defaultValue);
}
function ReorderItemComponent({ children, style = {}, value, as = "li", onDrag, onDragEnd, layout = true, ...props }, externalRef) {
	const Component = useConstant(() => motion[as]);
	const context = useContext(ReorderContext);
	const point = {
		x: useDefaultMotionValue(style.x),
		y: useDefaultMotionValue(style.y)
	};
	const zIndex = useTransform([point.x, point.y], ([latestX, latestY]) => latestX || latestY ? 1 : "unset");
	const { axis, registerItem, updateOrder, groupRef } = context;
	return (0, import_jsx_runtime.jsx)(Component, {
		drag: axis,
		...props,
		dragSnapToOrigin: true,
		style: {
			...style,
			x: point.x,
			y: point.y,
			zIndex
		},
		layout,
		onDrag: (event, gesturePoint) => {
			const { velocity, point: pointerPoint } = gesturePoint;
			updateOrder(value, point[axis].get(), velocity[axis]);
			autoScrollIfNeeded(groupRef.current, pointerPoint[axis], axis, velocity[axis]);
			onDrag && onDrag(event, gesturePoint);
		},
		onDragEnd: (event, gesturePoint) => {
			resetAutoScrollState();
			onDragEnd && onDragEnd(event, gesturePoint);
		},
		onLayoutMeasure: (measured) => {
			registerItem(value, measured);
		},
		ref: externalRef,
		ignoreStrict: true,
		children
	});
}
var ReorderItem = /*@__PURE__*/ forwardRef(ReorderItemComponent);
//#endregion
//#region extension/src/renderer/components/settings/MetricVisibilitySettings.tsx
var { Checkbox: Checkbox$1, CheckboxGroup, Label: Label$2 } = await importShared("@heroui/react");
var { useCallback: useCallback$1, useMemo: useMemo$1 } = await importShared("react");
var { useDispatch: useDispatch$3 } = await importShared("react-redux");
var VISIBILITY_OPTIONS = [
	{
		value: "icon",
		label: "Icon"
	},
	{
		value: "label",
		label: "Label"
	},
	{
		value: "value",
		label: "Value"
	},
	{
		value: "progressBar",
		label: "Progress Bar"
	}
];
function MetricVisibilitySettings() {
	const metricVisibility = useHMonitorState("metricVisibility");
	const dispatch = useDispatch$3();
	const selectedValues = useMemo$1(() => {
		return Object.entries(metricVisibility).filter(([, isVisible]) => isVisible).map(([key]) => key);
	}, [metricVisibility]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CheckboxGroup, {
		value: selectedValues,
		onChange: useCallback$1((values) => {
			if (values.length < 1) return;
			dispatch(hmonitorActions.updateMetricVisibility({
				icon: values.includes("icon"),
				label: values.includes("label"),
				value: values.includes("value"),
				progressBar: values.includes("progressBar")
			}));
		}, [dispatch]),
		isInvalid: selectedValues.length === 0,
		isRequired: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$2, { children: "Metric Visibility" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-row gap-x-4",
			children: VISIBILITY_OPTIONS.map(({ value, label }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$1, {
				id: value,
				value,
				className: "mt-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Checkbox$1.Content, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$1.Control, {
					className: "size-5 rounded-lg before:rounded-lg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$1.Indicator, {})
				}), label] })
			}, value))
		})]
	});
}
//#endregion
//#region node_modules/@solar-icons/react-perf/dist/icons/messages/Linear/Unread.mjs
var { forwardRef: t } = await importShared("react");
var r = t((t, r) => (0, import_jsx_runtime.jsx)(r$3, {
	ref: r,
	...t,
	children: (0, import_jsx_runtime.jsx)(`path`, {
		d: `M7 12.9L10.1429 16.5L18 7.5`,
		stroke: `currentColor`,
		strokeWidth: `1.5`,
		strokeLinecap: `round`,
		strokeLinejoin: `round`
	})
}));
r.displayName = `Unread`;
//#endregion
//#region extension/src/renderer/components/settings/PingSettings.tsx
var { Card: Card$2, CloseButton, Description: Description$1, Input: Input$1, Kbd, Label: Label$1, NumberField: NumberField$1, Switch: Switch$2, TextField, ToggleButton } = await importShared("@heroui/react");
var { useEffect, useRef, useState: useState$2 } = await importShared("react");
var { useDispatch: useDispatch$2 } = await importShared("react-redux");
function PingSettings({ dragHandle }) {
	const dispatch = useDispatch$2();
	const preConfig = useHMonitorState("pingState");
	const debounceTimerRef = useRef(null);
	const [isActive, setIsActive] = useState$2(preConfig.isActive);
	const [hostInput, setHostInput] = useState$2("");
	const [interval, setInterval] = useState$2(preConfig.interval);
	const [timeoutMs, setTimeoutMs] = useState$2(preConfig.timeout);
	const [hosts, setHosts] = useState$2(preConfig.hosts);
	const [enabledHosts, setEnabledHosts] = useState$2(preConfig.enabledHosts);
	useEffect(() => {
		debounceTimerRef.current = setTimeout(() => {
			const uniqueHosts = Array.from(new Set(hosts));
			const newState = {
				hosts: uniqueHosts,
				enabledHosts: Array.from(new Set(enabledHosts)).filter((host) => uniqueHosts.includes(host)),
				timeout: timeoutMs,
				interval,
				isActive
			};
			if (!isEqual(newState, preConfig)) dispatch(hmonitorActions.setPingState(newState));
		}, 300);
		return () => {
			if (debounceTimerRef.current) {
				clearTimeout(debounceTimerRef.current);
				debounceTimerRef.current = null;
			}
		};
	}, [
		isActive,
		interval,
		timeoutMs,
		hosts,
		enabledHosts
	]);
	const onToggleActivate = () => setIsActive((prevState) => !prevState);
	const onToggleHost = (host) => setEnabledHosts((preConfig) => preConfig.includes(host) ? preConfig.filter((p) => p !== host) : [...preConfig, host]);
	const onHostChange = (e) => {
		const force = e?.key === "Enter";
		const value = hostInput.replaceAll(",", "").trim();
		if (!value) return;
		if (force || hostInput.endsWith(" ") || hostInput.endsWith(",")) {
			setHosts((prevState) => prevState.includes(value) ? prevState : [value, ...prevState]);
			setHostInput("");
		}
	};
	const removeHost = (host) => {
		setHosts((prevState) => prevState.filter((h) => h !== host));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card$2, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card$2.Header, {
		className: "flex flex-row justify-between items-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-row items-center gap-x-2",
			children: [dragHandle, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				onClick: onToggleActivate,
				className: "font-medium cursor-pointer",
				children: "Ping"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$2, {
			isSelected: isActive,
			"aria-label": "Activate Ping",
			onChange: onToggleActivate,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$2.Content, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$2.Control, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$2.Thumb, {}) }) })
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card$2.Content, {
		className: "flex-col items-start gap-y-1",
		children: [
			!isActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-1.5 top-10.5 bg-surface-secondary/50 z-20 rounded-3xl" }),
			hosts.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, { children: "Select hosts to display in the status bar" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-row flex-wrap gap-2 mb-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: hosts.map((host) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					layout: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleButton, {
						size: "sm",
						onChange: () => onToggleHost(host),
						isSelected: enabledHosts.includes(host),
						children: ({ isSelected: selected }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(r, { className: "size-5" }),
							host,
							!selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloseButton, { onPress: () => removeHost(host) })
						] })
					})
				}, host)) })
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TextField, {
				type: "text",
				value: hostInput,
				variant: "secondary",
				onKeyUp: onHostChange,
				onChange: setHostInput,
				fullWidth: true,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, { children: "Host" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, { placeholder: "8.8.8.8" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Description$1, {
						className: "flex flex-row items-center gap-x-1",
						children: [
							"Type a host and press",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kbd, {
								className: "h-5",
								children: "Enter"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kbd, {
								className: "h-5",
								children: "Space"
							}),
							"or",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kbd, {
								className: "h-5",
								children: ","
							}),
							"to add"
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NumberField$1, {
				minValue: 100,
				value: interval,
				variant: "secondary",
				onChange: setInterval,
				fullWidth: true,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, { children: "Interval" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NumberField$1.Group, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField$1.DecrementButton, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField$1.Input, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField$1.IncrementButton, {})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description$1, { children: "Interval in milliseconds" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NumberField$1, {
				minValue: 100,
				value: timeoutMs,
				variant: "secondary",
				onChange: setTimeoutMs,
				fullWidth: true,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, { children: "Timeout" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NumberField$1.Group, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField$1.DecrementButton, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField$1.Input, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField$1.IncrementButton, {})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description$1, { children: "Timeout in milliseconds" })
				]
			})
		]
	})] });
}
//#endregion
//#region extension/src/renderer/components/settings/SettingsModalCard.tsx
var { Button: Button$1, Card: Card$1, Chip, Input, ListBox: ListBox$1, Select: Select$1, Separator, Switch: Switch$1 } = await importShared("@heroui/react");
var { memo, useState: useState$1 } = await importShared("react");
var { useDispatch: useDispatch$1 } = await importShared("react-redux");
/**
* A reusable component for managing custom metrics for a piece of hardware.
*/
function CustomMetricsSection({ config, hardware, type }) {
	const dispatch = useDispatch$1();
	const [isAdding, setIsAdding] = useState$1(false);
	const [formState, setFormState] = useState$1({
		sensorIdentifier: "",
		label: ""
	});
	const { name, custom = [] } = config;
	const handleAddMetric = () => {
		if (!formState.sensorIdentifier || !formState.label) return;
		const newMetric = {
			id: crypto.randomUUID(),
			label: formState.label,
			sensorIdentifier: formState.sensorIdentifier
		};
		dispatch(hmonitorActions.addCustomMetric({
			type,
			name,
			metric: newMetric
		}));
		setFormState({
			sensorIdentifier: "",
			label: ""
		});
		setIsAdding(false);
	};
	const handleRemoveMetric = (metricId) => {
		dispatch(hmonitorActions.removeCustomMetric({
			type,
			name,
			metricId
		}));
	};
	if (hardware.sensors.length === 0 && custom.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [(custom.length > 0 || isAdding) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "my-2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-full flex flex-col gap-2",
		children: [custom.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap gap-2",
			children: custom.map((metric) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
				size: "lg",
				variant: "soft",
				color: "accent",
				className: "px-2",
				children: [metric.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					size: "sm",
					className: "size-4.5",
					variant: "danger-soft",
					onPress: () => handleRemoveMetric(metric.id),
					isIconOnly: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3" })
				})]
			}, metric.id))
		}), isAdding ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 p-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select$1, {
					onChange: (key) => {
						if (!key) return;
						const value = key;
						setFormState((prev) => ({
							...prev,
							sensorIdentifier: value,
							label: value ? hardware.sensors.find((s) => s.Identifier === value)?.Name ?? "" : ""
						}));
					},
					variant: "secondary",
					placeholder: "Select a sensor",
					value: formState.sensorIdentifier,
					fullWidth: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select$1.Trigger, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select$1.Value, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select$1.Indicator, {})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select$1.Popover, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListBox$1, {
						items: hardware.sensors,
						children: (sensor) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListBox$1.Item, {
							id: sensor.Identifier,
							textValue: `${sensor.Name} (${sensor.Type})`,
							children: [`${sensor.Name} (${sensor.Type})`, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListBox$1.ItemIndicator, {})]
						}, sensor.Identifier)
					}) })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					variant: "secondary",
					value: formState.label,
					placeholder: "Display Label",
					onChange: (e) => setFormState((prev) => ({
						...prev,
						label: e.target.value
					}))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					size: "sm",
					variant: "secondary",
					className: "shrink-0",
					onPress: handleAddMetric,
					isIconOnly: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					size: "sm",
					variant: "tertiary",
					className: "shrink-0",
					onPress: () => setIsAdding(false),
					isIconOnly: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
			className: "mt-2",
			variant: "tertiary",
			onPress: () => setIsAdding(true),
			fullWidth: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3" }), "Add Custom Metric"]
		})]
	})] });
}
var SettingsModalCard = memo(({ onToggle, config, hardware, type, children, dragHandle, headerExtra }) => {
	if (!config) return null;
	const { active } = config;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card$1, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card$1.Header, {
		className: "flex flex-row justify-between items-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-row items-center gap-x-2",
			children: [dragHandle, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				onClick: onToggle,
				className: "font-medium cursor-pointer",
				children: hardware.name
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-row items-center gap-x-4",
			children: [headerExtra?.(active), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
				isSelected: active,
				onChange: onToggle,
				"aria-label": "Toggle active",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1.Content, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1.Control, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1.Thumb, {}) }) })
			})]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card$1.Content, {
		className: "flex-col items-start gap-y-1 relative",
		children: [
			!active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-1.5 top-1.5 bg-surface-secondary/50 z-20 rounded-3xl" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-row items-center gap-x-2",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomMetricsSection, {
				type,
				config,
				hardware
			})
		]
	})] });
});
//#endregion
//#region extension/src/renderer/components/settings/SettingsModal.tsx
var { Button, Card, Checkbox, Description, Label, ListBox, Modal, NumberField, ScrollShadow, Select, Spinner, Switch } = await importShared("@heroui/react");
var { useCallback, useMemo, useState } = await importShared("react");
var { useDispatch } = await importShared("react-redux");
var METRIC_CONFIG = {
	temp: {
		label: "Temperature",
		Icon: Thermometer
	},
	usage: {
		label: "Usage",
		Icon: Cpu
	},
	vram: {
		label: "VRAM",
		Icon: Database
	},
	memory: {
		label: "Memory Usage",
		Icon: Database
	},
	uploadSpeed: {
		label: "Upload Speed",
		Icon: ArrowUp
	},
	downloadSpeed: {
		label: "Download Speed",
		Icon: ArrowDown
	},
	uploadData: {
		label: "Data Uploaded",
		Icon: ArrowUp
	},
	downloadData: {
		label: "Data Downloaded",
		Icon: ArrowDown
	},
	uptimeSystem: {
		label: "System Uptime",
		Icon: Clock
	},
	uptimeApp: {
		label: "Application Uptime",
		Icon: Timer
	}
};
var DISPLAY_STYLES = [
	{
		value: "default",
		label: "Default",
		description: "Standard view with progress bars and labels."
	},
	{
		value: "compact",
		label: "Compact",
		description: "A smaller, space-saving layout."
	},
	{
		value: "two-column",
		label: "Two Column",
		description: "Metrics are stacked vertically to save horizontal space."
	},
	{
		value: "raw",
		label: "Raw Text",
		description: "Minimalist text-only view for the smallest footprint."
	},
	{
		value: "raw-two-column",
		label: "Raw Text (Two Column)",
		description: "Minimalist text stacked vertically."
	}
];
function SettingsModal({ state }) {
	const dispatch = useDispatch();
	const settings = useHMonitorSelector((state) => state.hmonitor);
	const { enabled, enabledMetrics, displayStyle, refreshInterval, showSectionLabel, availableHardware } = settings;
	const [isSaving, setIsSaving] = useState(false);
	const [selectedNetworkName, setSelectedNetworkName] = useState(availableHardware.network[0]?.name || "");
	const isRawStyle = useMemo(() => displayStyle === "raw" || displayStyle === "raw-two-column", [displayStyle]);
	const selectedNetworkConfig = useMemo(() => enabledMetrics.network.find((n) => n.name === selectedNetworkName), [selectedNetworkName, enabledMetrics.network]);
	const selectedNetworkHardware = useMemo(() => availableHardware.network.find((n) => n.name === selectedNetworkName), [selectedNetworkName, availableHardware.network]);
	function updateState(key, value) {
		dispatch(hmonitorActions.updateState({
			key,
			value
		}));
	}
	const handleDisplayStyleChange = (style) => {
		updateState("displayStyle", style);
		if (style === "raw" || style === "raw-two-column") updateState("showSectionLabel", false);
	};
	const handleOpenChange = (value) => {
		if (!value) storageIpc.getCustom(HMONITOR_STORAGE_ID).then((savedSettings) => {
			if (savedSettings) dispatch(hmonitorActions.setConfig(savedSettings));
		});
		state.setOpen(value);
	};
	const saveSettings = () => {
		setIsSaving(true);
		dispatch(hmonitorActions.saveSettings());
		setTimeout(() => {
			setIsSaving(false);
			toastHolder?.top.success("Settings saved successfully!");
		}, 700);
	};
	const resetSettings = () => {
		setIsSaving(true);
		window.electron.ipcRenderer.send(HMONITOR_IPC_RESET_CONFIG);
		setTimeout(() => {
			setIsSaving(false);
			toastHolder?.top.success("Settings reset successfully!");
		}, 1e3);
	};
	const toggleHardwareActive = useCallback((name, type) => {
		const hardwareConfig = enabledMetrics[type].find((metric) => metric.name === name);
		if (hardwareConfig) dispatch(hmonitorActions.updateHardwareActive({
			type,
			name,
			active: !hardwareConfig.active
		}));
	}, [enabledMetrics, dispatch]);
	const sectionsToRender = useMemo(() => {
		return (settings.sectionOrder && settings.sectionOrder.length > 0 ? settings.sectionOrder : [
			"cpu",
			"gpu",
			"memory",
			"network",
			"uptime",
			"ping"
		]).filter((type) => {
			if (type === "cpu") return availableHardware.cpu.length > 0;
			if (type === "gpu") return availableHardware.gpu.length > 0;
			if (type === "memory") return availableHardware.memory.length > 0;
			if (type === "network") return availableHardware.network.length > 0;
			return true;
		});
	}, [settings.sectionOrder, availableHardware]);
	const handleSectionReorder = (newOrder) => {
		const missing = [
			"cpu",
			"gpu",
			"memory",
			"network",
			"uptime",
			"ping"
		].filter((type) => !newOrder.includes(type));
		dispatch(hmonitorActions.updateSectionOrder([...newOrder, ...missing]));
	};
	const renderMetricsReorderGroup = (type, hardwareName) => {
		const config = enabledMetrics[type].find((m) => m.name === hardwareName);
		if (!config) return null;
		let nativeMetrics = [];
		if (type === "cpu") nativeMetrics = ["temp", "usage"];
		else if (type === "gpu") nativeMetrics = [
			"temp",
			"usage",
			"vram"
		];
		else if (type === "memory") nativeMetrics = ["memory"];
		else if (type === "network") nativeMetrics = [
			"uploadSpeed",
			"downloadSpeed",
			"uploadData",
			"downloadData"
		];
		const customIds = config.custom.map((m) => m.id);
		const allAvailableMetricIds = [...nativeMetrics, ...customIds];
		const currentEnabled = config.enabled;
		const orderedMetricIds = [...currentEnabled.filter((id) => allAvailableMetricIds.includes(id)), ...allAvailableMetricIds.filter((id) => !currentEnabled.includes(id))];
		const handleReorder = (newOrder) => {
			const newEnabled = newOrder.filter((id) => currentEnabled.includes(id));
			dispatch(hmonitorActions.updateHardwareMetrics({
				type,
				name: hardwareName,
				enabled: newEnabled
			}));
		};
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-col gap-y-2 w-full",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReorderGroup, {
				axis: "x",
				values: orderedMetricIds,
				onReorder: handleReorder,
				className: "flex flex-row flex-wrap items-center gap-2 w-full",
				children: orderedMetricIds.map((metricId) => {
					const isCustom = !nativeMetrics.includes(metricId);
					const isSelected = currentEnabled.includes(metricId);
					const onToggle = () => {
						const newEnabled = isSelected ? currentEnabled.filter((id) => id !== metricId) : [...currentEnabled, metricId];
						dispatch(hmonitorActions.updateHardwareMetrics({
							type,
							name: hardwareName,
							enabled: newEnabled
						}));
					};
					let labelText;
					let IconComp;
					if (isCustom) {
						labelText = config.custom.find((c) => c.id === metricId)?.label || "Custom Metric";
						IconComp = Database;
					} else {
						const metConfig = METRIC_CONFIG[metricId];
						labelText = metConfig?.label || metricId;
						IconComp = metConfig?.Icon || Cpu;
					}
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ReorderItem, {
						className: `flex flex-row items-center gap-x-1.5 px-3 py-1.5 bg-surface rounded-xl border border-foreground/10 ${!isSelected ? "opacity-50" : ""}`,
						value: metricId,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GripVertical, { className: "size-3.5 cursor-grab text-foreground/40 hover:text-foreground/80 active:cursor-grabbing shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
							variant: "secondary",
							onChange: onToggle,
							isSelected,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Checkbox.Content, {
								className: "flex flex-row items-center gap-x-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox.Control, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox.Indicator, {}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconComp, { className: "size-3.5 shrink-0" }),
									labelText
								]
							})
						})]
					}, metricId);
				})
			})
		});
	};
	const renderUptimeMetricsReorderGroup = () => {
		const currentOrder = settings.uptimeOrder || ["uptimeSystem", "uptimeApp"];
		const handleReorder = (newOrder) => {
			dispatch(hmonitorActions.updateUptimeOrder(newOrder));
		};
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReorderGroup, {
			axis: "x",
			values: currentOrder,
			onReorder: handleReorder,
			className: "flex flex-row items-center gap-2 w-full",
			children: currentOrder.map((metricId) => {
				const isSelected = metricId === "uptimeApp" ? enabledMetrics.uptime.app : enabledMetrics.uptime.system;
				const labelText = metricId === "uptimeApp" ? "Application Uptime" : "System Uptime";
				const IconComp = metricId === "uptimeApp" ? Timer : Clock;
				const onToggle = () => {
					if (metricId === "uptimeApp") dispatch(hmonitorActions.updateUptime({
						...enabledMetrics.uptime,
						app: !isSelected
					}));
					else dispatch(hmonitorActions.updateUptime({
						...enabledMetrics.uptime,
						system: !isSelected
					}));
				};
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ReorderItem, {
					className: `flex flex-row items-center gap-x-1.5 px-3 py-1.5 bg-surface rounded-xl border border-foreground/10 ${!isSelected ? "opacity-50" : ""}`,
					value: metricId,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GripVertical, { className: "size-3.5 cursor-grab text-foreground/40 hover:text-foreground/80 active:cursor-grabbing shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
						variant: "secondary",
						onChange: onToggle,
						isSelected,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Checkbox.Content, {
							className: "flex flex-row items-center gap-x-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox.Control, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox.Indicator, {}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconComp, { className: "size-3.5 shrink-0" }),
								labelText
							]
						})
					})]
				}, metricId);
			})
		});
	};
	const renderSectionSetting = (type, dragHandle) => {
		switch (type) {
			case "gpu": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-y-2",
				children: availableHardware.gpu.map((hw) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsModalCard, {
					headerExtra: (active) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
						variant: "secondary",
						isDisabled: !active,
						isSelected: settings.showAliasGpu,
						onChange: (val) => updateState("showAliasGpu", val),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Checkbox.Content, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox.Control, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox.Indicator, {}) }), "Use Alias"] })
					}),
					type: "gpu",
					hardware: hw,
					dragHandle,
					onToggle: () => toggleHardwareActive(hw.name, "gpu"),
					config: enabledMetrics.gpu.find((m) => m.name === hw.name),
					children: renderMetricsReorderGroup("gpu", hw.name)
				}, `gpu-settings-${hw.name}`))
			});
			case "cpu": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-y-2",
				children: availableHardware.cpu.map((hw) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsModalCard, {
					headerExtra: (active) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
						variant: "secondary",
						isDisabled: !active,
						isSelected: settings.showAliasCpu,
						onChange: (val) => updateState("showAliasCpu", val),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Checkbox.Content, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox.Control, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox.Indicator, {}) }), "Use Alias"] })
					}),
					type: "cpu",
					hardware: hw,
					dragHandle,
					onToggle: () => toggleHardwareActive(hw.name, "cpu"),
					config: enabledMetrics.cpu.find((m) => m.name === hw.name),
					children: renderMetricsReorderGroup("cpu", hw.name)
				}, `cpu-settings-${hw.name}`))
			});
			case "memory": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-y-2",
				children: availableHardware.memory.map((hw) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsModalCard, {
					headerExtra: (active) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
						variant: "secondary",
						isDisabled: !active,
						isSelected: settings.showAliasMemory,
						onChange: (val) => updateState("showAliasMemory", val),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Checkbox.Content, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox.Control, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox.Indicator, {}) }), "Use Alias"] })
					}),
					type: "memory",
					hardware: hw,
					dragHandle,
					onToggle: () => toggleHardwareActive(hw.name, "memory"),
					config: enabledMetrics.memory.find((m) => m.name === hw.name),
					children: renderMetricsReorderGroup("memory", hw.name)
				}, `memory-settings-${hw.name}`))
			});
			case "network": return availableHardware.network.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card.Header, {
				className: "flex flex-row justify-between items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-row items-center gap-x-2",
					children: [dragHandle, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: "Network Interface"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-row items-center gap-x-4",
					children: [selectedNetworkConfig && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
						variant: "secondary",
						isSelected: settings.showAliasNetwork,
						isDisabled: !selectedNetworkConfig.active,
						onChange: (val) => updateState("showAliasNetwork", val),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Checkbox.Content, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox.Control, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox.Indicator, {}) }), "Use Alias"] })
					}), selectedNetworkConfig && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
						"aria-label": "Toggle network monitoring",
						isSelected: selectedNetworkConfig.active,
						onChange: () => toggleHardwareActive(selectedNetworkName, "network"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch.Content, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch.Control, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch.Thumb, {}) }) })
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card.Content, {
				className: "flex-col items-start relative gap-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-full flex items-center justify-between gap-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						onChange: (value) => {
							if (value) setSelectedNetworkName(value);
						},
						variant: "secondary",
						selectionMode: "single",
						value: selectedNetworkName,
						placeholder: "Select a network interface to configure",
						fullWidth: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select.Trigger, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select.Value, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select.Indicator, {})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select.Popover, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListBox, {
							items: availableHardware.network,
							children: (item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListBox.Item, {
								id: item.name,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: item.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListBox.ItemIndicator, {})]
							}, item.name)
						}) })]
					})
				}), selectedNetworkConfig && selectedNetworkHardware && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full relative",
					children: [!selectedNetworkConfig.active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-background/50 z-20 -m-1 rounded-xl" }), renderMetricsReorderGroup("network", selectedNetworkName)]
				})]
			})] });
			case "uptime": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card.Header, {
				className: "flex flex-row items-center gap-x-2",
				children: [dragHandle, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium",
					children: "Uptime"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card.Content, {
				className: "flex-row items-center gap-2",
				children: renderUptimeMetricsReorderGroup()
			})] });
			case "ping": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PingSettings, { dragHandle });
			default: return null;
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabModal, {
		size: "lg",
		isOpen: state.isOpen,
		onOpenChange: handleOpenChange,
		dialogClassName: "max-w-4xl px-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal.CloseTrigger, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal.Header, {
				className: "px-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal.Heading, {
					className: "items-center justify-center",
					children: "Hardware Monitor Settings"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal.Body, {
				className: "overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ScrollShadow, {
					className: "px-4 size-full",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						onClick: () => updateState("enabled", !enabled),
						className: "mb-4 rounded-xl bg-surface-secondary p-4 cursor-pointer flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-base pointer-events-none",
								children: "Enable System Monitoring"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description, {
								className: "pointer-events-none",
								children: "When disabled, all metrics collection will be paused"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							size: "lg",
							isSelected: enabled,
							"aria-label": "Toggle system monitoring",
							onChange: (value) => updateState("enabled", value),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch.Content, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch.Control, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch.Thumb, {}) }) })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: enabled && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						transition: { delay: .1 },
						className: "flex flex-col gap-y-4",
						exit: {
							translateY: -10,
							opacity: 0
						},
						animate: {
							translateY: 0,
							opacity: 1
						},
						initial: {
							translateY: 10,
							opacity: 0
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4 bg-surface-secondary rounded-3xl flex flex-col gap-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NumberField, {
									step: .5,
									maxValue: 60,
									minValue: .5,
									value: refreshInterval,
									onChange: (value) => updateState("refreshInterval", value),
									fullWidth: true,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Refresh Interval (Seconds)" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NumberField.Group, { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField.DecrementButton, {}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField.Input, {}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField.IncrementButton, {})
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description, { children: "How frequently metrics should update (0.5-60 seconds)" })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: displayStyle,
									selectionMode: "single",
									placeholder: "Select a display style",
									onChange: (value) => handleDisplayStyleChange(value),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Display Style" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select.Trigger, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select.Value, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select.Indicator, {})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select.Popover, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListBox, { children: DISPLAY_STYLES.map((style) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListBox.Item, {
											id: style.value,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-col",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: style.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description, { children: style.description })]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListBox.ItemIndicator, {})]
										}, style.value)) }) })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LynxSwitch, {
									onEnabledChange: (value) => {
										if (!isRawStyle) updateState("showSectionLabel", value);
									},
									className: "p-1",
									isDisabled: isRawStyle,
									enabled: showSectionLabel,
									title: "Show Section Labels",
									description: "Display headers for metric groups (disabled for Raw styles)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: isRawStyle ? "opacity-50 pointer-events-none" : "",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricVisibilitySettings, {}), isRawStyle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted mt-1",
										children: "Metric visibility is not applicable for Raw display styles."
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReorderGroup, {
							axis: "y",
							values: sectionsToRender,
							onReorder: handleSectionReorder,
							className: "flex flex-col gap-y-2 p-2 bg-surface-secondary rounded-3xl",
							children: sectionsToRender.map((type) => {
								const dragHandle = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "cursor-grab active:cursor-grabbing p-1 text-foreground/40 hover:text-foreground/80 transition-colors shrink-0",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GripVertical, { className: "size-4" })
								});
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReorderItem, {
									value: type,
									className: "relative select-none",
									children: renderSectionSetting(type, dragHandle)
								}, type);
							})
						})]
					}) })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal.Footer, {
				className: "px-4 justify-between w-full flex flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "danger-soft",
					isDisabled: isSaving,
					onPress: resetSettings,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" }), "Reset to Default"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					isPending: isSaving,
					onPress: saveSettings,
					children: [isSaving ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { color: "current" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(i, {}), !isSaving && "Save Settings"]
				})]
			})
		]
	});
}
//#endregion
//#region extension/src/renderer/integrations/ToolsPage.tsx
var { useOverlayState } = await importShared("@heroui/react");
/**
* Renders a card on the LynxHub "Tools" page that allows users
* to open the hardware monitor settings.
*/
function ToolsPage() {
	const state = useOverlayState();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsModal, { state }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolsCard, {
		onPress: state.open,
		title: "Hardware Monitor",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(i$1, { className: "size-full m-1 text-indigo-500" }),
		description: "Configure real-time monitoring of CPU, GPU, and Memory usage in the status bar."
	})] });
}
//#endregion
//#region extension/src/renderer/Extension.tsx
/**
* Entry point for the extension's renderer process.
* This function is called by LynxHub to integrate the extension's UI components.
*/
function InitialExtensions(lynxAPI) {
	lynxAPI.addReducer([{
		name: "hmonitor",
		reducer: hmonitorSlice_default
	}]);
	if (lynxAPI.toast) setToast(lynxAPI.toast);
	lynxAPI.statusBar.replaceContainer(HardwareStatusBar_default);
	lynxAPI.customizePages.tools.add.cardsContainer(ToolsPage);
	ConfigProvider(lynxAPI);
}
//#endregion
export { InitialExtensions as t };
