//#region node_modules/tailwind-variants/dist/chunk-LQJYWU4O.js
var SPACE_REGEX = /\s+/g;
var removeExtraSpaces = (str) => {
	if (typeof str !== "string" || !str) return str;
	return str.replace(SPACE_REGEX, " ").trim();
};
var cx = (...classnames) => {
	const classList = [];
	const buildClassString = (input) => {
		if (!input && input !== 0 && input !== 0n) return;
		if (Array.isArray(input)) {
			for (let i = 0, len = input.length; i < len; i++) buildClassString(input[i]);
			return;
		}
		const type = typeof input;
		if (type === "string" || type === "number" || type === "bigint") {
			if (type === "number" && input !== input) return;
			classList.push(String(input));
		} else if (type === "object") {
			const keys = Object.keys(input);
			for (let i = 0, len = keys.length; i < len; i++) {
				const key = keys[i];
				if (input[key]) classList.push(key);
			}
		}
	};
	for (let i = 0, len = classnames.length; i < len; i++) {
		const c = classnames[i];
		if (c !== null && c !== void 0) buildClassString(c);
	}
	return classList.length > 0 ? removeExtraSpaces(classList.join(" ")) : void 0;
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
	const keys1 = Object.keys(obj1);
	const keys2 = Object.keys(obj2);
	if (keys1.length !== keys2.length) return false;
	for (let i = 0; i < keys1.length; i++) {
		const key = keys1[i];
		if (!keys2.includes(key)) return false;
		if (obj1[key] !== obj2[key]) return false;
	}
	return true;
};
var joinObjects = (obj1, obj2) => {
	for (const key in obj2) if (Object.prototype.hasOwnProperty.call(obj2, key)) {
		const val2 = obj2[key];
		if (key in obj1) obj1[key] = cx(obj1[key], val2);
		else obj1[key] = val2;
	}
	return obj1;
};
var flat = (arr, target) => {
	for (let i = 0; i < arr.length; i++) {
		const el = arr[i];
		if (Array.isArray(el)) flat(el, target);
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
	const result = {};
	for (const key in obj1) {
		const val1 = obj1[key];
		if (key in obj2) {
			const val2 = obj2[key];
			if (Array.isArray(val1) || Array.isArray(val2)) result[key] = flatMergeArrays(val2, val1);
			else if (typeof val1 === "object" && typeof val2 === "object" && val1 && val2) result[key] = mergeObjects(val1, val2);
			else result[key] = val2 + " " + val1;
		} else result[key] = val1;
	}
	for (const key in obj2) if (!(key in obj1)) result[key] = obj2[key];
	return result;
};
//#endregion
//#region node_modules/tailwind-variants/dist/chunk-RZF76H2U.js
var defaultConfig = {
	twMerge: true,
	twMergeConfig: {}
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
var getTailwindVariants = (cn) => {
	const tv = (options, configProp) => {
		const { extend = null, slots: slotProps = {}, variants: variantsProps = {}, compoundVariants: compoundVariantsProps = [], compoundSlots = [], defaultVariants: defaultVariantsProps = {} } = options;
		const config = {
			...defaultConfig,
			...configProp
		};
		const base = extend?.base ? cx(extend.base, options?.base) : options?.base;
		const variants = extend?.variants && !isEmptyObject(extend.variants) ? mergeObjects(variantsProps, extend.variants) : variantsProps;
		const defaultVariants = extend?.defaultVariants && !isEmptyObject(extend.defaultVariants) ? {
			...extend.defaultVariants,
			...defaultVariantsProps
		} : defaultVariantsProps;
		if (!isEmptyObject(config.twMergeConfig) && !isEqual(config.twMergeConfig, state.cachedTwMergeConfig)) {
			state.didTwMergeConfigChange = true;
			state.cachedTwMergeConfig = config.twMergeConfig;
		}
		const isExtendedSlotsEmpty = isEmptyObject(extend?.slots);
		const componentSlots = !isEmptyObject(slotProps) ? {
			base: cx(options?.base, isExtendedSlotsEmpty && extend?.base),
			...slotProps
		} : {};
		const slots = isExtendedSlotsEmpty ? componentSlots : joinObjects({ ...extend?.slots }, isEmptyObject(componentSlots) ? { base: options?.base } : componentSlots);
		const compoundVariants = isEmptyObject(extend?.compoundVariants) ? compoundVariantsProps : flatMergeArrays(extend?.compoundVariants, compoundVariantsProps);
		const component = (props) => {
			if (isEmptyObject(variants) && isEmptyObject(slotProps) && isExtendedSlotsEmpty) return cn(base, props?.class, props?.className)(config);
			if (compoundVariants && !Array.isArray(compoundVariants)) throw new TypeError(`The "compoundVariants" prop must be an array. Received: ${typeof compoundVariants}`);
			if (compoundSlots && !Array.isArray(compoundSlots)) throw new TypeError(`The "compoundSlots" prop must be an array. Received: ${typeof compoundSlots}`);
			const getVariantValue = (variant, vrs = variants, _slotKey = null, slotProps2 = null) => {
				const variantObj = vrs[variant];
				if (!variantObj || isEmptyObject(variantObj)) return null;
				const variantProp = slotProps2?.[variant] ?? props?.[variant];
				if (variantProp === null) return null;
				const variantKey = falsyToString(variantProp);
				if (typeof variantKey === "object") return null;
				const defaultVariantProp = defaultVariants?.[variant];
				return variantObj[(variantKey != null ? variantKey : falsyToString(defaultVariantProp)) || "false"];
			};
			const getVariantClassNames = () => {
				if (!variants) return null;
				const keys = Object.keys(variants);
				const result = [];
				for (let i = 0; i < keys.length; i++) {
					const value = getVariantValue(keys[i], variants);
					if (value) result.push(value);
				}
				return result;
			};
			const getVariantClassNamesBySlotKey = (slotKey, slotProps2) => {
				if (!variants || typeof variants !== "object") return null;
				const result = [];
				for (const variant in variants) {
					const variantValue = getVariantValue(variant, variants, slotKey, slotProps2);
					const value = slotKey === "base" && typeof variantValue === "string" ? variantValue : variantValue && variantValue[slotKey];
					if (value) result.push(value);
				}
				return result;
			};
			const propsWithoutUndefined = {};
			for (const prop in props) {
				const value = props[prop];
				if (value !== void 0) propsWithoutUndefined[prop] = value;
			}
			const getCompleteProps = (key, slotProps2) => {
				const initialProp = typeof props?.[key] === "object" ? { [key]: props[key]?.initial } : {};
				return {
					...defaultVariants,
					...propsWithoutUndefined,
					...initialProp,
					...slotProps2
				};
			};
			const getCompoundVariantsValue = (cv = [], slotProps2) => {
				const result = [];
				const cvLength = cv.length;
				for (let i = 0; i < cvLength; i++) {
					const { class: tvClass, className: tvClassName, ...compoundVariantOptions } = cv[i];
					let isValid = true;
					const completeProps = getCompleteProps(null, slotProps2);
					for (const key in compoundVariantOptions) {
						const value = compoundVariantOptions[key];
						const completePropsValue = completeProps[key];
						if (Array.isArray(value)) {
							if (!value.includes(completePropsValue)) {
								isValid = false;
								break;
							}
						} else {
							if ((value == null || value === false) && (completePropsValue == null || completePropsValue === false)) continue;
							if (completePropsValue !== value) {
								isValid = false;
								break;
							}
						}
					}
					if (isValid) {
						if (tvClass) result.push(tvClass);
						if (tvClassName) result.push(tvClassName);
					}
				}
				return result;
			};
			const getCompoundVariantClassNamesBySlot = (slotProps2) => {
				const compoundClassNames = getCompoundVariantsValue(compoundVariants, slotProps2);
				if (!Array.isArray(compoundClassNames)) return compoundClassNames;
				const result = {};
				const cnFn = cn;
				for (let i = 0; i < compoundClassNames.length; i++) {
					const className = compoundClassNames[i];
					if (typeof className === "string") result.base = cnFn(result.base, className)(config);
					else if (typeof className === "object") for (const slot in className) result[slot] = cnFn(result[slot], className[slot])(config);
				}
				return result;
			};
			const getCompoundSlotClassNameBySlot = (slotProps2) => {
				if (compoundSlots.length < 1) return null;
				const result = {};
				const completeProps = getCompleteProps(null, slotProps2);
				for (let i = 0; i < compoundSlots.length; i++) {
					const { slots: slots2 = [], class: slotClass, className: slotClassName, ...slotVariants } = compoundSlots[i];
					if (!isEmptyObject(slotVariants)) {
						let isValid = true;
						for (const key in slotVariants) {
							const completePropsValue = completeProps[key];
							const slotVariantValue = slotVariants[key];
							if (completePropsValue === void 0 || (Array.isArray(slotVariantValue) ? !slotVariantValue.includes(completePropsValue) : slotVariantValue !== completePropsValue)) {
								isValid = false;
								break;
							}
						}
						if (!isValid) continue;
					}
					for (let j = 0; j < slots2.length; j++) {
						const slotName = slots2[j];
						if (!result[slotName]) result[slotName] = [];
						result[slotName].push([slotClass, slotClassName]);
					}
				}
				return result;
			};
			if (!isEmptyObject(slotProps) || !isExtendedSlotsEmpty) {
				const slotsFns = {};
				if (typeof slots === "object" && !isEmptyObject(slots)) {
					const cnFn = cn;
					for (const slotKey in slots) slotsFns[slotKey] = (slotProps2) => {
						const compoundVariantClasses = getCompoundVariantClassNamesBySlot(slotProps2);
						const compoundSlotClasses = getCompoundSlotClassNameBySlot(slotProps2);
						return cnFn(slots[slotKey], getVariantClassNamesBySlotKey(slotKey, slotProps2), compoundVariantClasses ? compoundVariantClasses[slotKey] : void 0, compoundSlotClasses ? compoundSlotClasses[slotKey] : void 0, slotProps2?.class, slotProps2?.className)(config);
					};
				}
				return slotsFns;
			}
			return cn(base, getVariantClassNames(), getCompoundVariantsValue(compoundVariants), props?.class, props?.className)(config);
		};
		const getVariantKeys = () => {
			if (!variants || typeof variants !== "object") return;
			return Object.keys(variants);
		};
		component.variantKeys = getVariantKeys();
		component.extend = extend;
		component.base = base;
		component.slots = slots;
		component.variants = variants;
		component.defaultVariants = defaultVariants;
		component.compoundSlots = compoundSlots;
		component.compoundVariants = compoundVariants;
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
//#region node_modules/tailwind-merge/dist/bundle-mjs.mjs
/**
* Concatenates two arrays faster than the array spread operator.
*/
var concatArrays = (array1, array2) => {
	const combinedArray = new Array(array1.length + array2.length);
	for (let i = 0; i < array1.length; i++) combinedArray[i] = array1[i];
	for (let i = 0; i < array2.length; i++) combinedArray[array1.length + i] = array2[i];
	return combinedArray;
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
		if (className.startsWith("[") && className.endsWith("]")) return getGroupIdForArbitraryProperty(className);
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
	for (let i = 0; i < validatorsLength; i++) {
		const validatorObj = validators[i];
		if (validatorObj.validator(classRest)) return validatorObj.classGroupId;
	}
};
/**
* Get the class group ID for an arbitrary property.
*
* @param className - The class name to get the group ID for. Is expected to be string starting with `[` and ending with `]`.
*/
var getGroupIdForArbitraryProperty = (className) => className.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
	const content = className.slice(1, -1);
	const colonIndex = content.indexOf(":");
	const property = content.slice(0, colonIndex);
	return property ? ARBITRARY_PROPERTY_PREFIX + property : void 0;
})();
/**
* Exported for testing only
*/
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
	const len = classGroup.length;
	for (let i = 0; i < len; i++) {
		const classDefinition = classGroup[i];
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
	const len = entries.length;
	for (let i = 0; i < len; i++) {
		const [key, value] = entries[i];
		processClassesRecursively(value, getPart(classPartObject, key), classGroupId, theme);
	}
};
var getPart = (classPartObject, path) => {
	let current = classPartObject;
	const parts = path.split(CLASS_PART_SEPARATOR);
	const len = parts.length;
	for (let i = 0; i < len; i++) {
		const part = parts[i];
		let next = current.nextPart.get(part);
		if (!next) {
			next = createClassPartObject();
			current.nextPart.set(part, next);
		}
		current = next;
	}
	return current;
};
var isThemeGetter = (func) => "isThemeGetter" in func && func.isThemeGetter === true;
var createLruCache = (maxCacheSize) => {
	if (maxCacheSize < 1) return {
		get: () => void 0,
		set: () => {}
	};
	let cacheSize = 0;
	let cache = Object.create(null);
	let previousCache = Object.create(null);
	const update = (key, value) => {
		cache[key] = value;
		cacheSize++;
		if (cacheSize > maxCacheSize) {
			cacheSize = 0;
			previousCache = cache;
			cache = Object.create(null);
		}
	};
	return {
		get(key) {
			let value = cache[key];
			if (value !== void 0) return value;
			if ((value = previousCache[key]) !== void 0) {
				update(key, value);
				return value;
			}
		},
		set(key, value) {
			if (key in cache) cache[key] = value;
			else update(key, value);
		}
	};
};
var IMPORTANT_MODIFIER = "!";
var MODIFIER_SEPARATOR = ":";
var EMPTY_MODIFIERS = [];
var createResultObject = (modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition, isExternal) => ({
	modifiers,
	hasImportantModifier,
	baseClassName,
	maybePostfixModifierPosition,
	isExternal
});
var createParseClassName = (config) => {
	const { prefix, experimentalParseClassName } = config;
	/**
	* Parse class name into parts.
	*
	* Inspired by `splitAtTopLevelOnly` used in Tailwind CSS
	* @see https://github.com/tailwindlabs/tailwindcss/blob/v3.2.2/src/util/splitAtTopLevelOnly.js
	*/
	let parseClassName = (className) => {
		const modifiers = [];
		let bracketDepth = 0;
		let parenDepth = 0;
		let modifierStart = 0;
		let postfixModifierPosition;
		const len = className.length;
		for (let index = 0; index < len; index++) {
			const currentCharacter = className[index];
			if (bracketDepth === 0 && parenDepth === 0) {
				if (currentCharacter === MODIFIER_SEPARATOR) {
					modifiers.push(className.slice(modifierStart, index));
					modifierStart = index + 1;
					continue;
				}
				if (currentCharacter === "/") {
					postfixModifierPosition = index;
					continue;
				}
			}
			if (currentCharacter === "[") bracketDepth++;
			else if (currentCharacter === "]") bracketDepth--;
			else if (currentCharacter === "(") parenDepth++;
			else if (currentCharacter === ")") parenDepth--;
		}
		const baseClassNameWithImportantModifier = modifiers.length === 0 ? className : className.slice(modifierStart);
		let baseClassName = baseClassNameWithImportantModifier;
		let hasImportantModifier = false;
		if (baseClassNameWithImportantModifier.endsWith(IMPORTANT_MODIFIER)) {
			baseClassName = baseClassNameWithImportantModifier.slice(0, -1);
			hasImportantModifier = true;
		} else if (baseClassNameWithImportantModifier.startsWith(IMPORTANT_MODIFIER)) {
			baseClassName = baseClassNameWithImportantModifier.slice(1);
			hasImportantModifier = true;
		}
		const maybePostfixModifierPosition = postfixModifierPosition && postfixModifierPosition > modifierStart ? postfixModifierPosition - modifierStart : void 0;
		return createResultObject(modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition);
	};
	if (prefix) {
		const fullPrefix = prefix + MODIFIER_SEPARATOR;
		const parseClassNameOriginal = parseClassName;
		parseClassName = (className) => className.startsWith(fullPrefix) ? parseClassNameOriginal(className.slice(fullPrefix.length)) : createResultObject(EMPTY_MODIFIERS, false, className, void 0, true);
	}
	if (experimentalParseClassName) {
		const parseClassNameOriginal = parseClassName;
		parseClassName = (className) => experimentalParseClassName({
			className,
			parseClassName: parseClassNameOriginal
		});
	}
	return parseClassName;
};
/**
* Sorts modifiers according to following schema:
* - Predefined modifiers are sorted alphabetically
* - When an arbitrary variant appears, it must be preserved which modifiers are before and after it
*/
var createSortModifiers = (config) => {
	const modifierWeights = /* @__PURE__ */ new Map();
	config.orderSensitiveModifiers.forEach((mod, index) => {
		modifierWeights.set(mod, 1e6 + index);
	});
	return (modifiers) => {
		const result = [];
		let currentSegment = [];
		for (let i = 0; i < modifiers.length; i++) {
			const modifier = modifiers[i];
			const isArbitrary = modifier[0] === "[";
			const isOrderSensitive = modifierWeights.has(modifier);
			if (isArbitrary || isOrderSensitive) {
				if (currentSegment.length > 0) {
					currentSegment.sort();
					result.push(...currentSegment);
					currentSegment = [];
				}
				result.push(modifier);
			} else currentSegment.push(modifier);
		}
		if (currentSegment.length > 0) {
			currentSegment.sort();
			result.push(...currentSegment);
		}
		return result;
	};
};
var createConfigUtils = (config) => ({
	cache: createLruCache(config.cacheSize),
	parseClassName: createParseClassName(config),
	sortModifiers: createSortModifiers(config),
	...createClassGroupUtils(config)
});
var SPLIT_CLASSES_REGEX = /\s+/;
var mergeClassList = (classList, configUtils) => {
	const { parseClassName, getClassGroupId, getConflictingClassGroupIds, sortModifiers } = configUtils;
	/**
	* Set of classGroupIds in following format:
	* `{importantModifier}{variantModifiers}{classGroupId}`
	* @example 'float'
	* @example 'hover:focus:bg-color'
	* @example 'md:!pr'
	*/
	const classGroupsInConflict = [];
	const classNames = classList.trim().split(SPLIT_CLASSES_REGEX);
	let result = "";
	for (let index = classNames.length - 1; index >= 0; index -= 1) {
		const originalClassName = classNames[index];
		const { isExternal, modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition } = parseClassName(originalClassName);
		if (isExternal) {
			result = originalClassName + (result.length > 0 ? " " + result : result);
			continue;
		}
		let hasPostfixModifier = !!maybePostfixModifierPosition;
		let classGroupId = getClassGroupId(hasPostfixModifier ? baseClassName.substring(0, maybePostfixModifierPosition) : baseClassName);
		if (!classGroupId) {
			if (!hasPostfixModifier) {
				result = originalClassName + (result.length > 0 ? " " + result : result);
				continue;
			}
			classGroupId = getClassGroupId(baseClassName);
			if (!classGroupId) {
				result = originalClassName + (result.length > 0 ? " " + result : result);
				continue;
			}
			hasPostfixModifier = false;
		}
		const variantModifier = modifiers.length === 0 ? "" : modifiers.length === 1 ? modifiers[0] : sortModifiers(modifiers).join(":");
		const modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier;
		const classId = modifierId + classGroupId;
		if (classGroupsInConflict.indexOf(classId) > -1) continue;
		classGroupsInConflict.push(classId);
		const conflictGroups = getConflictingClassGroupIds(classGroupId, hasPostfixModifier);
		for (let i = 0; i < conflictGroups.length; ++i) {
			const group = conflictGroups[i];
			classGroupsInConflict.push(modifierId + group);
		}
		result = originalClassName + (result.length > 0 ? " " + result : result);
	}
	return result;
};
/**
* The code in this file is copied from https://github.com/lukeed/clsx and modified to suit the needs of tailwind-merge better.
*
* Specifically:
* - Runtime code from https://github.com/lukeed/clsx/blob/v1.2.1/src/index.js
* - TypeScript types from https://github.com/lukeed/clsx/blob/v1.2.1/clsx.d.ts
*
* Original code has MIT license: Copyright (c) Luke Edwards <luke.edwards05@gmail.com> (lukeed.com)
*/
var twJoin = (...classLists) => {
	let index = 0;
	let argument;
	let resolvedValue;
	let string = "";
	while (index < classLists.length) if (argument = classLists[index++]) {
		if (resolvedValue = toValue(argument)) {
			string && (string += " ");
			string += resolvedValue;
		}
	}
	return string;
};
var toValue = (mix) => {
	if (typeof mix === "string") return mix;
	let resolvedValue;
	let string = "";
	for (let k = 0; k < mix.length; k++) if (mix[k]) {
		if (resolvedValue = toValue(mix[k])) {
			string && (string += " ");
			string += resolvedValue;
		}
	}
	return string;
};
var createTailwindMerge = (createConfigFirst, ...createConfigRest) => {
	let configUtils;
	let cacheGet;
	let cacheSet;
	let functionToCall;
	const initTailwindMerge = (classList) => {
		configUtils = createConfigUtils(createConfigRest.reduce((previousConfig, createConfigCurrent) => createConfigCurrent(previousConfig), createConfigFirst()));
		cacheGet = configUtils.cache.get;
		cacheSet = configUtils.cache.set;
		functionToCall = tailwindMerge;
		return tailwindMerge(classList);
	};
	const tailwindMerge = (classList) => {
		const cachedResult = cacheGet(classList);
		if (cachedResult) return cachedResult;
		const result = mergeClassList(classList, configUtils);
		cacheSet(classList, result);
		return result;
	};
	functionToCall = initTailwindMerge;
	return (...args) => functionToCall(twJoin(...args));
};
var fallbackThemeArr = [];
var fromTheme = (key) => {
	const themeGetter = (theme) => theme[key] || fallbackThemeArr;
	themeGetter.isThemeGetter = true;
	return themeGetter;
};
var arbitraryValueRegex = /^\[(?:(\w[\w-]*):)?(.+)\]$/i;
var arbitraryVariableRegex = /^\((?:(\w[\w-]*):)?(.+)\)$/i;
var fractionRegex = /^\d+\/\d+$/;
var tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
var lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
var colorFunctionRegex = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/;
var shadowRegex = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
var imageRegex = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
var isFraction = (value) => fractionRegex.test(value);
var isNumber = (value) => !!value && !Number.isNaN(Number(value));
var isInteger = (value) => !!value && Number.isInteger(Number(value));
var isPercent = (value) => value.endsWith("%") && isNumber(value.slice(0, -1));
var isTshirtSize = (value) => tshirtUnitRegex.test(value);
var isAny = () => true;
var isLengthOnly = (value) => lengthUnitRegex.test(value) && !colorFunctionRegex.test(value);
var isNever = () => false;
var isShadow = (value) => shadowRegex.test(value);
var isImage = (value) => imageRegex.test(value);
var isAnyNonArbitrary = (value) => !isArbitraryValue(value) && !isArbitraryVariable(value);
var isArbitrarySize = (value) => getIsArbitraryValue(value, isLabelSize, isNever);
var isArbitraryValue = (value) => arbitraryValueRegex.test(value);
var isArbitraryLength = (value) => getIsArbitraryValue(value, isLabelLength, isLengthOnly);
var isArbitraryNumber = (value) => getIsArbitraryValue(value, isLabelNumber, isNumber);
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
var isLabelShadow = (label) => label === "shadow";
var getDefaultConfig = () => {
	/**
	* Theme getters for theme variable namespaces
	* @see https://tailwindcss.com/docs/theme#theme-variable-namespaces
	*/
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
	/**
	* Helpers to avoid repeating the same scales
	*
	* We use functions that create a new array every time they're called instead of static arrays.
	* This ensures that users who modify any scale by mutating the array (e.g. with `array.push(element)`) don't accidentally mutate arrays in other parts of the config.
	*/
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
		cacheSize: 500,
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
			* Top / Right / Bottom / Left
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			*/
			inset: [{ inset: scaleInset() }],
			/**
			* Right / Left
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			*/
			"inset-x": [{ "inset-x": scaleInset() }],
			/**
			* Top / Bottom
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			*/
			"inset-y": [{ "inset-y": scaleInset() }],
			/**
			* Start
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			*/
			start: [{ start: scaleInset() }],
			/**
			* End
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			*/
			end: [{ end: scaleInset() }],
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
			* Padding X
			* @see https://tailwindcss.com/docs/padding
			*/
			px: [{ px: scaleUnambiguousSpacing() }],
			/**
			* Padding Y
			* @see https://tailwindcss.com/docs/padding
			*/
			py: [{ py: scaleUnambiguousSpacing() }],
			/**
			* Padding Start
			* @see https://tailwindcss.com/docs/padding
			*/
			ps: [{ ps: scaleUnambiguousSpacing() }],
			/**
			* Padding End
			* @see https://tailwindcss.com/docs/padding
			*/
			pe: [{ pe: scaleUnambiguousSpacing() }],
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
			* Margin X
			* @see https://tailwindcss.com/docs/margin
			*/
			mx: [{ mx: scaleMargin() }],
			/**
			* Margin Y
			* @see https://tailwindcss.com/docs/margin
			*/
			my: [{ my: scaleMargin() }],
			/**
			* Margin Start
			* @see https://tailwindcss.com/docs/margin
			*/
			ms: [{ ms: scaleMargin() }],
			/**
			* Margin End
			* @see https://tailwindcss.com/docs/margin
			*/
			me: [{ me: scaleMargin() }],
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
				{ screen: [themeBreakpoint] },
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
				isArbitraryVariable,
				isArbitraryNumber
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
				isArbitraryValue,
				themeFont
			] }],
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
			* Border Width X
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-x": [{ "border-x": scaleBorderWidth() }],
			/**
			* Border Width Y
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-y": [{ "border-y": scaleBorderWidth() }],
			/**
			* Border Width Start
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-s": [{ "border-s": scaleBorderWidth() }],
			/**
			* Border Width End
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-e": [{ "border-e": scaleBorderWidth() }],
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
			* Border Color X
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-x": [{ "border-x": scaleColor() }],
			/**
			* Border Color Y
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-y": [{ "border-y": scaleColor() }],
			/**
			* Border Color S
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-s": [{ "border-s": scaleColor() }],
			/**
			* Border Color E
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-e": [{ "border-e": scaleColor() }],
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
			* Scroll Margin
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-m": [{ "scroll-m": scaleUnambiguousSpacing() }],
			/**
			* Scroll Margin X
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-mx": [{ "scroll-mx": scaleUnambiguousSpacing() }],
			/**
			* Scroll Margin Y
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-my": [{ "scroll-my": scaleUnambiguousSpacing() }],
			/**
			* Scroll Margin Start
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-ms": [{ "scroll-ms": scaleUnambiguousSpacing() }],
			/**
			* Scroll Margin End
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-me": [{ "scroll-me": scaleUnambiguousSpacing() }],
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
			* Scroll Padding X
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-px": [{ "scroll-px": scaleUnambiguousSpacing() }],
			/**
			* Scroll Padding Y
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-py": [{ "scroll-py": scaleUnambiguousSpacing() }],
			/**
			* Scroll Padding Start
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-ps": [{ "scroll-ps": scaleUnambiguousSpacing() }],
			/**
			* Scroll Padding End
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-pe": [{ "scroll-pe": scaleUnambiguousSpacing() }],
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
			overflow: ["overflow-x", "overflow-y"],
			overscroll: ["overscroll-x", "overscroll-y"],
			inset: [
				"inset-x",
				"inset-y",
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
/**
* @param baseConfig Config where other config will be merged into. This object will be mutated.
* @param configExtension Partial config to merge into the `baseConfig`.
*/
var mergeConfigs = (baseConfig, { cacheSize, prefix, experimentalParseClassName, extend = {}, override = {} }) => {
	overrideProperty(baseConfig, "cacheSize", cacheSize);
	overrideProperty(baseConfig, "prefix", prefix);
	overrideProperty(baseConfig, "experimentalParseClassName", experimentalParseClassName);
	overrideConfigProperties(baseConfig.theme, override.theme);
	overrideConfigProperties(baseConfig.classGroups, override.classGroups);
	overrideConfigProperties(baseConfig.conflictingClassGroups, override.conflictingClassGroups);
	overrideConfigProperties(baseConfig.conflictingClassGroupModifiers, override.conflictingClassGroupModifiers);
	overrideProperty(baseConfig, "orderSensitiveModifiers", override.orderSensitiveModifiers);
	mergeConfigProperties(baseConfig.theme, extend.theme);
	mergeConfigProperties(baseConfig.classGroups, extend.classGroups);
	mergeConfigProperties(baseConfig.conflictingClassGroups, extend.conflictingClassGroups);
	mergeConfigProperties(baseConfig.conflictingClassGroupModifiers, extend.conflictingClassGroupModifiers);
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
var extendTailwindMerge = (configExtension, ...createConfig) => typeof configExtension === "function" ? createTailwindMerge(getDefaultConfig, configExtension, ...createConfig) : createTailwindMerge(() => mergeConfigs(getDefaultConfig(), configExtension), ...createConfig);
var twMerge = /*#__PURE__*/ createTailwindMerge(getDefaultConfig);
//#endregion
//#region node_modules/tailwind-variants/dist/index.js
var createTwMerge = (cachedTwMergeConfig) => {
	return isEmptyObject(cachedTwMergeConfig) ? twMerge : extendTailwindMerge({
		...cachedTwMergeConfig,
		extend: {
			theme: cachedTwMergeConfig.theme,
			classGroups: cachedTwMergeConfig.classGroups,
			conflictingClassGroupModifiers: cachedTwMergeConfig.conflictingClassGroupModifiers,
			conflictingClassGroups: cachedTwMergeConfig.conflictingClassGroups,
			...cachedTwMergeConfig.extend
		}
	});
};
var executeMerge = (classnames, config) => {
	const base = cx(classnames);
	if (!base || !(config?.twMerge ?? true)) return base;
	if (!state.cachedTwMerge || state.didTwMergeConfigChange) {
		state.didTwMergeConfigChange = false;
		state.cachedTwMerge = createTwMerge(state.cachedTwMergeConfig);
	}
	return state.cachedTwMerge(base) || void 0;
};
var cn = (...classnames) => {
	return executeMerge(classnames, {});
};
var cnMerge = (...classnames) => {
	return (config) => executeMerge(classnames, config);
};
var { createTV, tv } = getTailwindVariants(cnMerge);
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
		popoverDialog: "autocomplete__popover-dialog",
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
		trigger: "combo-box__trigger"
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
export { drawerVariants as $, menuSectionVariants as A, ariaDisabledClasses as At, labelVariants as B, scrollShadowVariants as C, breadcrumbsVariants as Ct, paginationVariants as D, alertDialogVariants as Dt, popoverVariants as E, autocompleteVariants as Et, menuVariants as F, cx as Ft, headerVariants as G, inputOTPVariants as H, listboxSectionVariants as I, errorMessageVariants as J, fieldsetVariants as K, listboxItemVariants as L, progressCircleVariants as M, focusRingClasses as Mt, progressBarVariants as N, cn as Nt, numberFieldVariants as O, alertVariants as Ot, meterVariants as P, tv as Pt, disclosureVariants as Q, listboxVariants as R, searchFieldVariants as S, buttonVariants as St, radioVariants as T, avatarVariants as Tt, inputGroupVariants as U, kbdVariants as V, inputVariants as W, dropdownVariants as X, emptyStateVariants as Y, disclosureGroupVariants as Z, spinnerVariants as _, cardVariants as _t, toastVariants as a, comboBoxVariants as at, separatorVariants as b, calendarVariants as bt, textFieldVariants as c, colorSwatchVariants as ct, tagVariants as d, colorInputGroupVariants as dt, descriptionVariants as et, tabsVariants as f, colorFieldVariants as ft, surfaceVariants as g, checkboxVariants as gt, switchVariants as h, checkboxGroupVariants as ht, toggleButtonVariants as i, dateFieldVariants as it, menuItemVariants as j, disabledClasses as jt, modalVariants as k, accordionVariants as kt, typographyVariants as l, colorSliderVariants as lt, switchGroupVariants as m, chipVariants as mt, toolbarVariants as n, dateRangePickerVariants as nt, timeFieldVariants as o, colorSwatchPickerVariants as ot, tableVariants as p, colorAreaVariants as pt, fieldErrorVariants as q, toggleButtonGroupVariants as r, datePickerVariants as rt, textAreaVariants as s, closeButtonVariants as st, tooltipVariants as t, dateInputGroupVariants as tt, tagGroupVariants as u, colorPickerVariants as ut, sliderVariants as v, rangeCalendarVariants as vt, radioGroupVariants as w, badgeVariants as wt, selectVariants as x, buttonGroupVariants as xt, skeletonVariants as y, calendarYearPickerVariants as yt, linkVariants as z };
