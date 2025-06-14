import { importShared } from './__federation_fn_import-JrT3xvdd.js';
import { j as jsxRuntimeExports } from './jsx-runtime-BA-u0cS_.js';
import { c as commonjsGlobal, g as getDefaultExportFromCjs } from './_commonjsHelpers-BFTU3MAI.js';

/**
 * @license lucide-react v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */

const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const toCamelCase = (string) => string.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
);
const toPascalCase = (string) => {
  const camelCase = toCamelCase(string);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
const mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
const hasA11yProp = (props) => {
  for (const prop in props) {
    if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
      return true;
    }
  }
};

/**
 * @license lucide-react v0.513.0 - ISC
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

/**
 * @license lucide-react v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */

const {forwardRef: forwardRef$1,createElement: createElement$1} = await importShared('react');

const Icon = forwardRef$1(
  ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => createElement$1(
    "svg",
    {
      ref,
      ...defaultAttributes,
      width: size,
      height: size,
      stroke: color,
      strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
      className: mergeClasses("lucide", className),
      ...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
      ...rest
    },
    [
      ...iconNode.map(([tag, attrs]) => createElement$1(tag, attrs)),
      ...Array.isArray(children) ? children : [children]
    ]
  )
);

/**
 * @license lucide-react v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */

const {forwardRef,createElement} = await importShared('react');

const createLucideIcon = (iconName, iconNode) => {
  const Component = forwardRef(
    ({ className, ...props }, ref) => createElement(Icon, {
      ref,
      iconNode,
      className: mergeClasses(
        `lucide-${toKebabCase(toPascalCase(iconName))}`,
        `lucide-${iconName}`,
        className
      ),
      ...props
    })
  );
  Component.displayName = toPascalCase(iconName);
  return Component;
};

/**
 * @license lucide-react v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const __iconNode$c = [
  [
    "path",
    {
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse"
    }
  ]
];
const Activity = createLucideIcon("activity", __iconNode$c);

/**
 * @license lucide-react v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const __iconNode$b = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$b);

/**
 * @license lucide-react v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const __iconNode$a = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$a);

/**
 * @license lucide-react v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const __iconNode$9 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode$9);

/**
 * @license lucide-react v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const __iconNode$8 = [
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M17 20v2", key: "1rnc9c" }],
  ["path", { d: "M17 2v2", key: "11trls" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M2 17h2", key: "7oei6x" }],
  ["path", { d: "M2 7h2", key: "asdhe0" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "M20 17h2", key: "1fpfkl" }],
  ["path", { d: "M20 7h2", key: "1o8tra" }],
  ["path", { d: "M7 20v2", key: "4gnj0m" }],
  ["path", { d: "M7 2v2", key: "1i4yhu" }],
  ["rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", key: "1vbyd7" }],
  ["rect", { x: "8", y: "8", width: "8", height: "8", rx: "1", key: "z9xiuo" }]
];
const Cpu = createLucideIcon("cpu", __iconNode$8);

/**
 * @license lucide-react v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const __iconNode$7 = [
  ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3", key: "msslwz" }],
  ["path", { d: "M3 5V19A9 3 0 0 0 21 19V5", key: "1wlel7" }],
  ["path", { d: "M3 12A9 3 0 0 0 21 12", key: "mv7ke4" }]
];
const Database = createLucideIcon("database", __iconNode$7);

/**
 * @license lucide-react v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const __iconNode$6 = [
  ["line", { x1: "22", x2: "2", y1: "12", y2: "12", key: "1y58io" }],
  [
    "path",
    {
      d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
      key: "oot6mr"
    }
  ],
  ["line", { x1: "6", x2: "6.01", y1: "16", y2: "16", key: "sgf278" }],
  ["line", { x1: "10", x2: "10.01", y1: "16", y2: "16", key: "1l4acy" }]
];
const HardDrive = createLucideIcon("hard-drive", __iconNode$6);

/**
 * @license lucide-react v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const __iconNode$5 = [
  [
    "path",
    {
      d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
      key: "zw3jo"
    }
  ],
  [
    "path",
    {
      d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
      key: "1wduqc"
    }
  ],
  [
    "path",
    {
      d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
      key: "kqbvx6"
    }
  ]
];
const Layers = createLucideIcon("layers", __iconNode$5);

/**
 * @license lucide-react v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const __iconNode$4 = [
  ["path", { d: "M6 19v-3", key: "1nvgqn" }],
  ["path", { d: "M10 19v-3", key: "iu8nkm" }],
  ["path", { d: "M14 19v-3", key: "kcehxu" }],
  ["path", { d: "M18 19v-3", key: "1vh91z" }],
  ["path", { d: "M8 11V9", key: "63erz4" }],
  ["path", { d: "M16 11V9", key: "fru6f3" }],
  ["path", { d: "M12 11V9", key: "ha00sb" }],
  ["path", { d: "M2 15h20", key: "16ne18" }],
  [
    "path",
    {
      d: "M2 7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1.1a2 2 0 0 0 0 3.837V17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-5.1a2 2 0 0 0 0-3.837Z",
      key: "lhddv3"
    }
  ]
];
const MemoryStick = createLucideIcon("memory-stick", __iconNode$4);

/**
 * @license lucide-react v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const __iconNode$3 = [
  ["rect", { width: "20", height: "14", x: "2", y: "3", rx: "2", key: "48i651" }],
  ["line", { x1: "8", x2: "16", y1: "21", y2: "21", key: "1svkeh" }],
  ["line", { x1: "12", x2: "12", y1: "17", y2: "21", key: "vw1qmm" }]
];
const Monitor = createLucideIcon("monitor", __iconNode$3);

/**
 * @license lucide-react v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const __iconNode$2 = [
  ["path", { d: "M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z", key: "17jzev" }]
];
const Thermometer = createLucideIcon("thermometer", __iconNode$2);

/**
 * @license lucide-react v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const __iconNode$1 = [
  ["line", { x1: "10", x2: "14", y1: "2", y2: "2", key: "14vaq8" }],
  ["line", { x1: "12", x2: "15", y1: "14", y2: "11", key: "17fdiu" }],
  ["circle", { cx: "12", cy: "14", r: "8", key: "1e1u0o" }]
];
const Timer = createLucideIcon("timer", __iconNode$1);

/**
 * @license lucide-react v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const __iconNode = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
];
const Zap = createLucideIcon("zap", __iconNode);

function ShinyText({ text, disabled = false, speed = 5, className = "" }) {
  const animationDuration = `${speed}s`;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      style: {
        backgroundImage: "linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)",
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        animationDuration
      },
      className: `text-[#b5b5b5a4] bg-clip-text inline-block ${disabled ? "" : "animate-shine"} ${className}`,
      children: text
    }
  );
}

const HMONITOR_STORAGE_ID = "hmonitor_storage";
const HMONITOR_IPC_DATA_ID = "hardware-data-update";
const HMONITOR_IPC_UPDATE_CONFIG = "hmonitor-update-config";
const initialSystemMetrics = [
  "cpuTemp",
  "cpuUsage",
  "gpuTemp",
  "gpuUsage",
  "memory",
  "vram",
  "uptimeSystemSeconds",
  "uptimeSeconds"
];

function isPlainObject$2(obj) {
  if (typeof obj !== "object" || obj === null)
    return false;
  let proto = obj;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(obj) === proto || Object.getPrototypeOf(obj) === null;
}
function isAction(action) {
  return isPlainObject$2(action) && "type" in action && typeof action.type === "string";
}

var NOTHING = Symbol.for("immer-nothing");
var DRAFTABLE = Symbol.for("immer-draftable");
var DRAFT_STATE = Symbol.for("immer-state");
function die(error, ...args) {
  throw new Error(
    `[Immer] minified error nr: ${error}. Full error at: https://bit.ly/3cXEKWf`
  );
}
var getPrototypeOf = Object.getPrototypeOf;
function isDraft(value) {
  return !!value && !!value[DRAFT_STATE];
}
function isDraftable(value) {
  if (!value)
    return false;
  return isPlainObject$1(value) || Array.isArray(value) || !!value[DRAFTABLE] || !!value.constructor?.[DRAFTABLE] || isMap(value) || isSet(value);
}
var objectCtorString = Object.prototype.constructor.toString();
function isPlainObject$1(value) {
  if (!value || typeof value !== "object")
    return false;
  const proto = getPrototypeOf(value);
  if (proto === null) {
    return true;
  }
  const Ctor = Object.hasOwnProperty.call(proto, "constructor") && proto.constructor;
  if (Ctor === Object)
    return true;
  return typeof Ctor == "function" && Function.toString.call(Ctor) === objectCtorString;
}
function each$1(obj, iter) {
  if (getArchtype(obj) === 0) {
    Reflect.ownKeys(obj).forEach((key) => {
      iter(key, obj[key], obj);
    });
  } else {
    obj.forEach((entry, index) => iter(index, entry, obj));
  }
}
function getArchtype(thing) {
  const state = thing[DRAFT_STATE];
  return state ? state.type_ : Array.isArray(thing) ? 1 : isMap(thing) ? 2 : isSet(thing) ? 3 : 0;
}
function has(thing, prop) {
  return getArchtype(thing) === 2 ? thing.has(prop) : Object.prototype.hasOwnProperty.call(thing, prop);
}
function set(thing, propOrOldValue, value) {
  const t = getArchtype(thing);
  if (t === 2)
    thing.set(propOrOldValue, value);
  else if (t === 3) {
    thing.add(value);
  } else
    thing[propOrOldValue] = value;
}
function is$1(x, y) {
  if (x === y) {
    return x !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}
function isMap(target) {
  return target instanceof Map;
}
function isSet(target) {
  return target instanceof Set;
}
function latest(state) {
  return state.copy_ || state.base_;
}
function shallowCopy(base, strict) {
  if (isMap(base)) {
    return new Map(base);
  }
  if (isSet(base)) {
    return new Set(base);
  }
  if (Array.isArray(base))
    return Array.prototype.slice.call(base);
  const isPlain = isPlainObject$1(base);
  if (strict === true || strict === "class_only" && !isPlain) {
    const descriptors = Object.getOwnPropertyDescriptors(base);
    delete descriptors[DRAFT_STATE];
    let keys = Reflect.ownKeys(descriptors);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const desc = descriptors[key];
      if (desc.writable === false) {
        desc.writable = true;
        desc.configurable = true;
      }
      if (desc.get || desc.set)
        descriptors[key] = {
          configurable: true,
          writable: true,
          // could live with !!desc.set as well here...
          enumerable: desc.enumerable,
          value: base[key]
        };
    }
    return Object.create(getPrototypeOf(base), descriptors);
  } else {
    const proto = getPrototypeOf(base);
    if (proto !== null && isPlain) {
      return { ...base };
    }
    const obj = Object.create(proto);
    return Object.assign(obj, base);
  }
}
function freeze(obj, deep = false) {
  if (isFrozen(obj) || isDraft(obj) || !isDraftable(obj))
    return obj;
  if (getArchtype(obj) > 1) {
    obj.set = obj.add = obj.clear = obj.delete = dontMutateFrozenCollections;
  }
  Object.freeze(obj);
  if (deep)
    Object.entries(obj).forEach(([key, value]) => freeze(value, true));
  return obj;
}
function dontMutateFrozenCollections() {
  die(2);
}
function isFrozen(obj) {
  return Object.isFrozen(obj);
}
var plugins = {};
function getPlugin(pluginKey) {
  const plugin = plugins[pluginKey];
  if (!plugin) {
    die(0, pluginKey);
  }
  return plugin;
}
var currentScope;
function getCurrentScope() {
  return currentScope;
}
function createScope(parent_, immer_) {
  return {
    drafts_: [],
    parent_,
    immer_,
    // Whenever the modified draft contains a draft from another scope, we
    // need to prevent auto-freezing so the unowned draft can be finalized.
    canAutoFreeze_: true,
    unfinalizedDrafts_: 0
  };
}
function usePatchesInScope(scope, patchListener) {
  if (patchListener) {
    getPlugin("Patches");
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
  if (scope === currentScope) {
    currentScope = scope.parent_;
  }
}
function enterScope(immer2) {
  return currentScope = createScope(currentScope, immer2);
}
function revokeDraft(draft) {
  const state = draft[DRAFT_STATE];
  if (state.type_ === 0 || state.type_ === 1)
    state.revoke_();
  else
    state.revoked_ = true;
}
function processResult(result, scope) {
  scope.unfinalizedDrafts_ = scope.drafts_.length;
  const baseDraft = scope.drafts_[0];
  const isReplaced = result !== void 0 && result !== baseDraft;
  if (isReplaced) {
    if (baseDraft[DRAFT_STATE].modified_) {
      revokeScope(scope);
      die(4);
    }
    if (isDraftable(result)) {
      result = finalize(scope, result);
      if (!scope.parent_)
        maybeFreeze(scope, result);
    }
    if (scope.patches_) {
      getPlugin("Patches").generateReplacementPatches_(
        baseDraft[DRAFT_STATE].base_,
        result,
        scope.patches_,
        scope.inversePatches_
      );
    }
  } else {
    result = finalize(scope, baseDraft, []);
  }
  revokeScope(scope);
  if (scope.patches_) {
    scope.patchListener_(scope.patches_, scope.inversePatches_);
  }
  return result !== NOTHING ? result : void 0;
}
function finalize(rootScope, value, path) {
  if (isFrozen(value))
    return value;
  const state = value[DRAFT_STATE];
  if (!state) {
    each$1(
      value,
      (key, childValue) => finalizeProperty(rootScope, state, value, key, childValue, path)
    );
    return value;
  }
  if (state.scope_ !== rootScope)
    return value;
  if (!state.modified_) {
    maybeFreeze(rootScope, state.base_, true);
    return state.base_;
  }
  if (!state.finalized_) {
    state.finalized_ = true;
    state.scope_.unfinalizedDrafts_--;
    const result = state.copy_;
    let resultEach = result;
    let isSet2 = false;
    if (state.type_ === 3) {
      resultEach = new Set(result);
      result.clear();
      isSet2 = true;
    }
    each$1(
      resultEach,
      (key, childValue) => finalizeProperty(rootScope, state, result, key, childValue, path, isSet2)
    );
    maybeFreeze(rootScope, result, false);
    if (path && rootScope.patches_) {
      getPlugin("Patches").generatePatches_(
        state,
        path,
        rootScope.patches_,
        rootScope.inversePatches_
      );
    }
  }
  return state.copy_;
}
function finalizeProperty(rootScope, parentState, targetObject, prop, childValue, rootPath, targetIsSet) {
  if (isDraft(childValue)) {
    const path = rootPath && parentState && parentState.type_ !== 3 && // Set objects are atomic since they have no keys.
    !has(parentState.assigned_, prop) ? rootPath.concat(prop) : void 0;
    const res = finalize(rootScope, childValue, path);
    set(targetObject, prop, res);
    if (isDraft(res)) {
      rootScope.canAutoFreeze_ = false;
    } else
      return;
  } else if (targetIsSet) {
    targetObject.add(childValue);
  }
  if (isDraftable(childValue) && !isFrozen(childValue)) {
    if (!rootScope.immer_.autoFreeze_ && rootScope.unfinalizedDrafts_ < 1) {
      return;
    }
    finalize(rootScope, childValue);
    if ((!parentState || !parentState.scope_.parent_) && typeof prop !== "symbol" && Object.prototype.propertyIsEnumerable.call(targetObject, prop))
      maybeFreeze(rootScope, childValue);
  }
}
function maybeFreeze(scope, value, deep = false) {
  if (!scope.parent_ && scope.immer_.autoFreeze_ && scope.canAutoFreeze_) {
    freeze(value, deep);
  }
}
function createProxyProxy(base, parent) {
  const isArray = Array.isArray(base);
  const state = {
    type_: isArray ? 1 : 0,
    // Track which produce call this is associated with.
    scope_: parent ? parent.scope_ : getCurrentScope(),
    // True for both shallow and deep changes.
    modified_: false,
    // Used during finalization.
    finalized_: false,
    // Track which properties have been assigned (true) or deleted (false).
    assigned_: {},
    // The parent draft state.
    parent_: parent,
    // The base state.
    base_: base,
    // The base proxy.
    draft_: null,
    // set below
    // The base copy with any updated values.
    copy_: null,
    // Called by the `produce` function.
    revoke_: null,
    isManual_: false
  };
  let target = state;
  let traps = objectTraps;
  if (isArray) {
    target = [state];
    traps = arrayTraps;
  }
  const { revoke, proxy } = Proxy.revocable(target, traps);
  state.draft_ = proxy;
  state.revoke_ = revoke;
  return proxy;
}
var objectTraps = {
  get(state, prop) {
    if (prop === DRAFT_STATE)
      return state;
    const source = latest(state);
    if (!has(source, prop)) {
      return readPropFromProto(state, source, prop);
    }
    const value = source[prop];
    if (state.finalized_ || !isDraftable(value)) {
      return value;
    }
    if (value === peek(state.base_, prop)) {
      prepareCopy(state);
      return state.copy_[prop] = createProxy(value, state);
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
        state.assigned_[prop] = false;
        return true;
      }
      if (is$1(value, current2) && (value !== void 0 || has(state.base_, prop)))
        return true;
      prepareCopy(state);
      markChanged(state);
    }
    if (state.copy_[prop] === value && // special case: handle new props with value 'undefined'
    (value !== void 0 || prop in state.copy_) || // special case: NaN
    Number.isNaN(value) && Number.isNaN(state.copy_[prop]))
      return true;
    state.copy_[prop] = value;
    state.assigned_[prop] = true;
    return true;
  },
  deleteProperty(state, prop) {
    if (peek(state.base_, prop) !== void 0 || prop in state.base_) {
      state.assigned_[prop] = false;
      prepareCopy(state);
      markChanged(state);
    } else {
      delete state.assigned_[prop];
    }
    if (state.copy_) {
      delete state.copy_[prop];
    }
    return true;
  },
  // Note: We never coerce `desc.value` into an Immer draft, because we can't make
  // the same guarantee in ES5 mode.
  getOwnPropertyDescriptor(state, prop) {
    const owner = latest(state);
    const desc = Reflect.getOwnPropertyDescriptor(owner, prop);
    if (!desc)
      return desc;
    return {
      writable: true,
      configurable: state.type_ !== 1 || prop !== "length",
      enumerable: desc.enumerable,
      value: owner[prop]
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
each$1(objectTraps, (key, fn) => {
  arrayTraps[key] = function() {
    arguments[0] = arguments[0][0];
    return fn.apply(this, arguments);
  };
});
arrayTraps.deleteProperty = function(state, prop) {
  return arrayTraps.set.call(this, state, prop, void 0);
};
arrayTraps.set = function(state, prop, value) {
  return objectTraps.set.call(this, state[0], prop, value, state[0]);
};
function peek(draft, prop) {
  const state = draft[DRAFT_STATE];
  const source = state ? latest(state) : draft;
  return source[prop];
}
function readPropFromProto(state, source, prop) {
  const desc = getDescriptorFromProto(source, prop);
  return desc ? `value` in desc ? desc.value : (
    // This is a very special case, if the prop is a getter defined by the
    // prototype, we should invoke it with the draft as context!
    desc.get?.call(state.draft_)
  ) : void 0;
}
function getDescriptorFromProto(source, prop) {
  if (!(prop in source))
    return void 0;
  let proto = getPrototypeOf(source);
  while (proto) {
    const desc = Object.getOwnPropertyDescriptor(proto, prop);
    if (desc)
      return desc;
    proto = getPrototypeOf(proto);
  }
  return void 0;
}
function markChanged(state) {
  if (!state.modified_) {
    state.modified_ = true;
    if (state.parent_) {
      markChanged(state.parent_);
    }
  }
}
function prepareCopy(state) {
  if (!state.copy_) {
    state.copy_ = shallowCopy(
      state.base_,
      state.scope_.immer_.useStrictShallowCopy_
    );
  }
}
var Immer2 = class {
  constructor(config) {
    this.autoFreeze_ = true;
    this.useStrictShallowCopy_ = false;
    this.produce = (base, recipe, patchListener) => {
      if (typeof base === "function" && typeof recipe !== "function") {
        const defaultBase = recipe;
        recipe = base;
        const self = this;
        return function curriedProduce(base2 = defaultBase, ...args) {
          return self.produce(base2, (draft) => recipe.call(this, draft, ...args));
        };
      }
      if (typeof recipe !== "function")
        die(6);
      if (patchListener !== void 0 && typeof patchListener !== "function")
        die(7);
      let result;
      if (isDraftable(base)) {
        const scope = enterScope(this);
        const proxy = createProxy(base, void 0);
        let hasError = true;
        try {
          result = recipe(proxy);
          hasError = false;
        } finally {
          if (hasError)
            revokeScope(scope);
          else
            leaveScope(scope);
        }
        usePatchesInScope(scope, patchListener);
        return processResult(result, scope);
      } else if (!base || typeof base !== "object") {
        result = recipe(base);
        if (result === void 0)
          result = base;
        if (result === NOTHING)
          result = void 0;
        if (this.autoFreeze_)
          freeze(result, true);
        if (patchListener) {
          const p = [];
          const ip = [];
          getPlugin("Patches").generateReplacementPatches_(base, result, p, ip);
          patchListener(p, ip);
        }
        return result;
      } else
        die(1, base);
    };
    this.produceWithPatches = (base, recipe) => {
      if (typeof base === "function") {
        return (state, ...args) => this.produceWithPatches(state, (draft) => base(draft, ...args));
      }
      let patches, inversePatches;
      const result = this.produce(base, recipe, (p, ip) => {
        patches = p;
        inversePatches = ip;
      });
      return [result, patches, inversePatches];
    };
    if (typeof config?.autoFreeze === "boolean")
      this.setAutoFreeze(config.autoFreeze);
    if (typeof config?.useStrictShallowCopy === "boolean")
      this.setUseStrictShallowCopy(config.useStrictShallowCopy);
  }
  createDraft(base) {
    if (!isDraftable(base))
      die(8);
    if (isDraft(base))
      base = current(base);
    const scope = enterScope(this);
    const proxy = createProxy(base, void 0);
    proxy[DRAFT_STATE].isManual_ = true;
    leaveScope(scope);
    return proxy;
  }
  finishDraft(draft, patchListener) {
    const state = draft && draft[DRAFT_STATE];
    if (!state || !state.isManual_)
      die(9);
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
  applyPatches(base, patches) {
    let i;
    for (i = patches.length - 1; i >= 0; i--) {
      const patch = patches[i];
      if (patch.path.length === 0 && patch.op === "replace") {
        base = patch.value;
        break;
      }
    }
    if (i > -1) {
      patches = patches.slice(i + 1);
    }
    const applyPatchesImpl = getPlugin("Patches").applyPatches_;
    if (isDraft(base)) {
      return applyPatchesImpl(base, patches);
    }
    return this.produce(
      base,
      (draft) => applyPatchesImpl(draft, patches)
    );
  }
};
function createProxy(value, parent) {
  const draft = isMap(value) ? getPlugin("MapSet").proxyMap_(value, parent) : isSet(value) ? getPlugin("MapSet").proxySet_(value, parent) : createProxyProxy(value, parent);
  const scope = parent ? parent.scope_ : getCurrentScope();
  scope.drafts_.push(draft);
  return draft;
}
function current(value) {
  if (!isDraft(value))
    die(10, value);
  return currentImpl(value);
}
function currentImpl(value) {
  if (!isDraftable(value) || isFrozen(value))
    return value;
  const state = value[DRAFT_STATE];
  let copy;
  if (state) {
    if (!state.modified_)
      return state.base_;
    state.finalized_ = true;
    copy = shallowCopy(value, state.scope_.immer_.useStrictShallowCopy_);
  } else {
    copy = shallowCopy(value, true);
  }
  each$1(copy, (key, childValue) => {
    set(copy, key, currentImpl(childValue));
  });
  if (state) {
    state.finalized_ = false;
  }
  return copy;
}
var immer = new Immer2();
var produce = immer.produce;
immer.produceWithPatches.bind(
  immer
);
immer.setAutoFreeze.bind(immer);
immer.setUseStrictShallowCopy.bind(immer);
immer.applyPatches.bind(immer);
immer.createDraft.bind(immer);
immer.finishDraft.bind(immer);

function createAction(type, prepareAction) {
  function actionCreator(...args) {
    if (prepareAction) {
      let prepared = prepareAction(...args);
      if (!prepared) {
        throw new Error(formatProdErrorMessage(0) );
      }
      return {
        type,
        payload: prepared.payload,
        ..."meta" in prepared && {
          meta: prepared.meta
        },
        ..."error" in prepared && {
          error: prepared.error
        }
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
  return isDraftable(val) ? produce(val, () => {
  }) : val;
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
      if (!type) {
        throw new Error(formatProdErrorMessage(28) );
      }
      if (type in actionsMap) {
        throw new Error(formatProdErrorMessage(29) );
      }
      actionsMap[type] = reducer;
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
  return [actionsMap, actionMatchers, defaultCaseReducer];
}
function isStateFunction(x) {
  return typeof x === "function";
}
function createReducer(initialState, mapOrBuilderCallback) {
  let [actionsMap, finalActionMatchers, finalDefaultCaseReducer] = executeReducerBuilderCallback(mapOrBuilderCallback);
  let getInitialState;
  if (isStateFunction(initialState)) {
    getInitialState = () => freezeDraftable(initialState());
  } else {
    const frozenInitialState = freezeDraftable(initialState);
    getInitialState = () => frozenInitialState;
  }
  function reducer(state = getInitialState(), action) {
    let caseReducers = [actionsMap[action.type], ...finalActionMatchers.filter(({
      matcher
    }) => matcher(action)).map(({
      reducer: reducer2
    }) => reducer2)];
    if (caseReducers.filter((cr) => !!cr).length === 0) {
      caseReducers = [finalDefaultCaseReducer];
    }
    return caseReducers.reduce((previousState, caseReducer) => {
      if (caseReducer) {
        if (isDraft(previousState)) {
          const draft = previousState;
          const result = caseReducer(draft, action);
          if (result === void 0) {
            return previousState;
          }
          return result;
        } else if (!isDraftable(previousState)) {
          const result = caseReducer(previousState, action);
          if (result === void 0) {
            if (previousState === null) {
              return previousState;
            }
            throw Error("A case reducer on a non-draftable value must not return undefined");
          }
          return result;
        } else {
          return produce(previousState, (draft) => {
            return caseReducer(draft, action);
          });
        }
      }
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
function buildCreateSlice({
  creators
} = {}) {
  const cAT = creators?.asyncThunk?.[asyncThunkSymbol];
  return function createSlice2(options) {
    const {
      name,
      reducerPath = name
    } = options;
    if (!name) {
      throw new Error(formatProdErrorMessage(11) );
    }
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
        if (!type) {
          throw new Error(formatProdErrorMessage(12) );
        }
        if (type in context.sliceCaseReducersByType) {
          throw new Error(formatProdErrorMessage(13) );
        }
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
      if (isAsyncThunkSliceReducerDefinition(reducerDefinition)) {
        handleThunkCaseReducerDefinition(reducerDetails, reducerDefinition, contextMethods, cAT);
      } else {
        handleNormalReducerDefinition(reducerDetails, reducerDefinition, contextMethods);
      }
    });
    function buildReducer() {
      const [extraReducers = {}, actionMatchers = [], defaultCaseReducer = void 0] = typeof options.extraReducers === "function" ? executeReducerBuilderCallback(options.extraReducers) : [options.extraReducers];
      const finalCaseReducers = {
        ...extraReducers,
        ...context.sliceCaseReducersByType
      };
      return createReducer(options.initialState, (builder) => {
        for (let key in finalCaseReducers) {
          builder.addCase(key, finalCaseReducers[key]);
        }
        for (let sM of context.sliceMatchers) {
          builder.addMatcher(sM.matcher, sM.reducer);
        }
        for (let m of actionMatchers) {
          builder.addMatcher(m.matcher, m.reducer);
        }
        if (defaultCaseReducer) {
          builder.addDefaultCase(defaultCaseReducer);
        }
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
          if (injected) {
            sliceState = getOrInsertComputed(injectedStateCache, selectSlice, getInitialState);
          }
        }
        return sliceState;
      }
      function getSelectors(selectState = selectSelf) {
        const selectorCache = getOrInsertComputed(injectedSelectorCache, injected, () => /* @__PURE__ */ new WeakMap());
        return getOrInsertComputed(selectorCache, selectState, () => {
          const map = {};
          for (const [name2, selector] of Object.entries(options.selectors ?? {})) {
            map[name2] = wrapSelector(selector, selectState, () => getOrInsertComputed(injectedStateCache, selectState, getInitialState), injected);
          }
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
      injectInto(injectable, {
        reducerPath: pathOpt,
        ...config
      } = {}) {
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
      if (injected) {
        sliceState = getInitialState();
      }
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
      return Object.assign({
        // hack so the wrapping function has the same name as the original
        // we need to create a wrapper so the `reducerDefinitionType` is not assigned to the original
        [caseReducer.name](...args) {
          return caseReducer(...args);
        }
      }[caseReducer.name], {
        _reducerDefinitionType: "reducer"
        /* reducer */
      });
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
function handleNormalReducerDefinition({
  type,
  reducerName,
  createNotation
}, maybeReducerWithPrepare, context) {
  let caseReducer;
  let prepareCallback;
  if ("reducer" in maybeReducerWithPrepare) {
    if (createNotation && !isCaseReducerWithPrepareDefinition(maybeReducerWithPrepare)) {
      throw new Error(formatProdErrorMessage(17) );
    }
    caseReducer = maybeReducerWithPrepare.reducer;
    prepareCallback = maybeReducerWithPrepare.prepare;
  } else {
    caseReducer = maybeReducerWithPrepare;
  }
  context.addCase(type, caseReducer).exposeCaseReducer(reducerName, caseReducer).exposeAction(reducerName, prepareCallback ? createAction(type, prepareCallback) : createAction(type));
}
function isAsyncThunkSliceReducerDefinition(reducerDefinition) {
  return reducerDefinition._reducerDefinitionType === "asyncThunk";
}
function isCaseReducerWithPrepareDefinition(reducerDefinition) {
  return reducerDefinition._reducerDefinitionType === "reducerWithPrepare";
}
function handleThunkCaseReducerDefinition({
  type,
  reducerName
}, reducerDefinition, context, cAT) {
  if (!cAT) {
    throw new Error(formatProdErrorMessage(18) );
  }
  const {
    payloadCreator,
    fulfilled,
    pending,
    rejected,
    settled,
    options
  } = reducerDefinition;
  const thunk = cAT(type, payloadCreator, options);
  context.exposeAction(reducerName, thunk);
  if (fulfilled) {
    context.addCase(thunk.fulfilled, fulfilled);
  }
  if (pending) {
    context.addCase(thunk.pending, pending);
  }
  if (rejected) {
    context.addCase(thunk.rejected, rejected);
  }
  if (settled) {
    context.addMatcher(thunk.settled, settled);
  }
  context.exposeCaseReducer(reducerName, {
    fulfilled: fulfilled || noop$1,
    pending: pending || noop$1,
    rejected: rejected || noop$1,
    settled: settled || noop$1
  });
}
function noop$1() {
}
function formatProdErrorMessage(code) {
  return `Minified Redux Toolkit error #${code}; visit https://redux-toolkit.js.org/Errors?code=${code} for the full message or use the non-minified dev environment for full errors. `;
}

const {omit} = await importShared('lodash');

const {useSelector: useSelector$2} = await importShared('react-redux');
const initialState$2 = {
  refreshInterval: 1,
  enabled: true,
  compactMode: false,
  showSectionLabel: true,
  enabledMetrics: initialSystemMetrics,
  modals: []
};
const systemMonitorSlice = createSlice({
  initialState: initialState$2,
  name: "systemMonitor",
  reducers: {
    updateState: (state, action) => {
      state[action.payload.key] = action.payload.value;
    },
    setConfig: (_, action) => {
      return { ...action.payload, modals: [] };
    },
    saveSettings: (state) => {
      window.electron.ipcRenderer.send(HMONITOR_IPC_UPDATE_CONFIG, JSON.stringify(omit(state, "modals")));
    },
    openModal: (state, action) => {
      state.modals.push({ isOpen: true, tabID: action.payload.tabID });
    },
    closeModal: (state, action) => {
      state.modals = state.modals.map(
        (item) => item.tabID === action.payload.tabID ? { ...item, isOpen: false } : { ...item }
      );
    },
    removeModal: (state, action) => {
      state.modals = state.modals.filter((item) => item.tabID !== action.payload.tabID);
    }
  }
});
const useSystemMonitorState = (propertyName) => useSelector$2((state) => state.extension[propertyName]);
const systemMonitorActions = systemMonitorSlice.actions;
const extensionReducer = systemMonitorSlice.reducer;

const getTemperatureColor = (temp) => {
  if (temp < 50) return "text-emerald-400 border-emerald-400/30 bg-emerald-400/10";
  if (temp < 70) return "text-amber-400 border-amber-400/30 bg-amber-400/10";
  if (temp < 85) return "text-orange-400 border-orange-400/30 bg-orange-400/10";
  return "text-red-400 border-red-400/30 bg-red-400/10";
};
const getUsageColor = (usage) => {
  if (usage < 30) return "text-emerald-400 border-emerald-400/30 bg-emerald-400/10";
  if (usage < 60) return "text-blue-400 border-blue-400/30 bg-blue-400/10";
  if (usage < 85) return "text-amber-400 border-amber-400/30 bg-amber-400/10";
  return "text-red-400 border-red-400/30 bg-red-400/10";
};
const getProgressColor = (value, isTemp = false) => {
  const thresholds = isTemp ? [50, 70, 85] : [30, 60, 85];
  if (value < thresholds[0]) return "from-emerald-400 to-emerald-500";
  if (value < thresholds[1]) return isTemp ? "from-amber-400 to-amber-500" : "from-blue-400 to-blue-500";
  if (value < thresholds[2]) return "from-amber-400 to-amber-500";
  return "from-red-400 to-red-500";
};

const ProgressBar = ({ value, max = 100, isTemp = false }) => {
  const compactMode = useSystemMonitorState("compactMode");
  const percentage = Math.min(value / max * 100, 100);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `${compactMode ? "w-8 h-1" : "w-12 h-1.5"} bg-white/10 rounded-full overflow-hidden`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: `h-full bg-gradient-to-r ${getProgressColor(isTemp ? value : percentage, isTemp)} rounded-full transition-all duration-700 ease-out`,
      style: { width: `${percentage}%` }
    }
  ) });
};
function MetricItem({
  icon: Icon,
  label,
  value,
  unit = "",
  progress,
  colorClass
}) {
  const compactMode = useSystemMonitorState("compactMode");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `flex items-center ${compactMode ? "px-2 py-0.5 gap-x-1.5" : "px-3 py-2 gap-x-2"} rounded-lg border backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg ${colorClass || "text-slate-300 border-slate-600/30 bg-slate-800/40"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `${compactMode ? "size-3" : "size-4"} flex-shrink-0` }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs font-medium whitespace-nowrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "opacity-80", children: [
            label,
            ":"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            value,
            unit
          ] }),
          progress && /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressBar, { ...progress })
        ] })
      ]
    },
    `${label}`
  );
}

function Section({
  title,
  icon: Icon,
  children
}) {
  const compactMode = useSystemMonitorState("compactMode");
  const showSectionLabel = useSystemMonitorState("showSectionLabel");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center ${compactMode ? "gap-x-2" : "gap-x-3"}`, children: [
    showSectionLabel && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `flex items-center ${compactMode ? "gap-x-1.5 px-1.5 py-0.5" : "gap-x-2 px-2 py-1"} rounded-md bg-slate-700/50 border border-slate-600/30`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `${compactMode ? "size-3" : "size-3.5"} text-slate-400` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-slate-300 uppercase tracking-wide", children: title })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-x-2", children })
  ] });
}

const {useMemo: useMemo$5} = await importShared('react');
function CpuSection({ data }) {
  const enabledMetrics = useSystemMonitorState("enabledMetrics");
  const { hasTemp, hasUsage } = useMemo$5(() => {
    const hasTemp2 = enabledMetrics.includes("cpuTemp");
    const hasUsage2 = enabledMetrics.includes("cpuUsage");
    return { hasTemp: hasTemp2, hasUsage: hasUsage2 };
  }, [enabledMetrics]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { icon: Cpu, title: "CPU", children: [
    hasTemp && /* @__PURE__ */ jsxRuntimeExports.jsx(
      MetricItem,
      {
        unit: "°C",
        label: "Temp",
        icon: Thermometer,
        value: data.cpuTemp,
        colorClass: getTemperatureColor(data.cpuTemp),
        progress: { value: data.cpuTemp, max: 100, isTemp: true }
      }
    ),
    hasUsage && /* @__PURE__ */ jsxRuntimeExports.jsx(
      MetricItem,
      {
        unit: "%",
        label: "Usage",
        icon: Activity,
        value: data.cpuUsage,
        progress: { value: data.cpuUsage },
        colorClass: getUsageColor(data.cpuUsage)
      }
    )
  ] });
}

const {useMemo: useMemo$4} = await importShared('react');
function GpuSection({ data }) {
  const enabledMetrics = useSystemMonitorState("enabledMetrics");
  const { hasTemp, hasVram, hasUsage } = useMemo$4(() => {
    const hasTemp2 = enabledMetrics.includes("gpuTemp");
    const hasVram2 = enabledMetrics.includes("vram");
    const hasUsage2 = enabledMetrics.includes("gpuUsage");
    return { hasTemp: hasTemp2, hasVram: hasVram2, hasUsage: hasUsage2 };
  }, [enabledMetrics]);
  const vramPercentage = useMemo$4(() => {
    return data.vramTotal > 0 ? data.vramUsed / data.vramTotal * 100 : 0;
  }, [data]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "GPU", icon: Monitor, children: [
    hasTemp && /* @__PURE__ */ jsxRuntimeExports.jsx(
      MetricItem,
      {
        unit: "°C",
        label: "Temp",
        icon: Thermometer,
        value: data.gpuTemp,
        colorClass: getTemperatureColor(data.gpuTemp),
        progress: { value: data.gpuTemp, max: 100, isTemp: true }
      }
    ),
    hasVram && /* @__PURE__ */ jsxRuntimeExports.jsx(
      MetricItem,
      {
        label: "VRAM",
        icon: Database,
        progress: { value: vramPercentage },
        colorClass: getUsageColor(vramPercentage),
        value: `${data.vramUsed.toFixed(1)}/${Math.round(data.vramTotal)}GB`
      }
    ),
    hasUsage && /* @__PURE__ */ jsxRuntimeExports.jsx(
      MetricItem,
      {
        unit: "%",
        icon: Zap,
        label: "Usage",
        value: data.gpuUsage,
        progress: { value: data.gpuUsage },
        colorClass: getUsageColor(data.gpuUsage)
      }
    )
  ] });
}

const {useMemo: useMemo$3} = await importShared('react');
function MemorySection({ data }) {
  const memPercentage = useMemo$3(() => {
    return data.memTotal > 0 ? data.memUsed / data.memTotal * 100 : 0;
  }, [data]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Memory", icon: MemoryStick, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    MetricItem,
    {
      label: "RAM",
      icon: HardDrive,
      progress: { value: memPercentage },
      colorClass: getUsageColor(memPercentage),
      value: `${data.memUsed.toFixed(1)}/${data.memTotal}GB`
    }
  ) });
}

const {useMemo: useMemo$2} = await importShared('react');
const formatUptime = (seconds) => {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor(seconds % 86400 / 3600);
  const minutes = Math.floor(seconds % 3600 / 60);
  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
};
function UpTimeSection({ data }) {
  const enabledMetrics = useSystemMonitorState("enabledMetrics");
  const { upApp, upSystem } = useMemo$2(() => {
    const upApp2 = enabledMetrics.includes("uptimeSeconds");
    const upSystem2 = enabledMetrics.includes("uptimeSystemSeconds");
    return { upApp: upApp2, upSystem: upSystem2 };
  }, [enabledMetrics]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { icon: Clock, title: "Uptime", children: [
    upSystem && /* @__PURE__ */ jsxRuntimeExports.jsx(MetricItem, { icon: Clock, label: "System", value: formatUptime(data.uptimeSystemSeconds) }),
    upApp && /* @__PURE__ */ jsxRuntimeExports.jsx(MetricItem, { label: "App", icon: Activity, value: formatUptime(data.uptimeSeconds) })
  ] });
}

const {Divider: Divider$1} = await importShared('antd');
const {useEffect: useEffect$3,useMemo: useMemo$1,useState: useState$2} = await importShared('react');
const convertMBtoGB = (mb) => {
  return Number((mb / 1024).toFixed(2));
};
const HardwareStatusBar = ({ ref }) => {
  const enabled = useSystemMonitorState("enabled");
  const compactMode = useSystemMonitorState("compactMode");
  const enabledMetrics = useSystemMonitorState("enabledMetrics");
  const [hardwareData, setHardwareData] = useState$2({
    cpuTemp: 0,
    cpuUsage: 0,
    gpuTemp: 0,
    gpuUsage: 0,
    memUsed: 0,
    memTotal: 0,
    vramUsed: 0,
    vramTotal: 0,
    uptimeSystemSeconds: 0,
    uptimeSeconds: 0
  });
  const [canScrollLeft, setCanScrollLeft] = useState$2(false);
  const [canScrollRight, setCanScrollRight] = useState$2(false);
  const [dataConnected, setDataConnected] = useState$2(false);
  const updateScrollArrows = () => {
    if (!ref.current) return;
    const container = ref.current;
    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  };
  const scroll = (direction) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === "left" ? -250 : 250,
        behavior: "smooth"
      });
    }
  };
  useEffect$3(() => {
    const handleHardwareUpdate = (_event, data) => {
      if (data) {
        const uptimeSeconds = data.ElapsedTime?.rawSeconds || 0;
        const uptimeSystemSeconds = data.Uptime?.rawSeconds || 0;
        const cpuTemp = data.CPU[0].Sensors.find((sensor) => sensor.Name === "CPU Package" && sensor.Type === "Temperature")?.Value || 0;
        const cpuUsage = Math.round(
          data.CPU[0].Sensors.find((sensor) => sensor.Name === "CPU Total" && sensor.Type === "Load")?.Value || 0
        );
        const gpuTemp = data.GPU[0].Sensors.find((sensor) => sensor.Name === "GPU Core" && sensor.Type === "Temperature")?.Value || 0;
        const gpuUsage = Math.round(
          data.GPU[0].Sensors.find((sensor) => sensor.Name === "D3D 3D" && sensor.Type === "Load")?.Value || 0
        );
        const vramTotal = convertMBtoGB(
          data.GPU[0].Sensors.find((sensor) => sensor.Name === "GPU Memory Total" && sensor.Type === "SmallData")?.Value || 0
        );
        const vramUsed = convertMBtoGB(
          data.GPU[0].Sensors.find((sensor) => sensor.Name === "GPU Memory Used" && sensor.Type === "SmallData")?.Value || 0
        );
        const memUsed = Math.round(
          data.Memory[0].Sensors.find((sensor) => sensor.Name === "Memory Used" && sensor.Type === "Data")?.Value || 0
        );
        const memAvailable = Math.round(
          data.Memory[0].Sensors.find((sensor) => sensor.Name === "Memory Available" && sensor.Type === "Data")?.Value || 0
        );
        const memTotal = Math.round(memUsed + memAvailable);
        const result = {
          uptimeSeconds,
          uptimeSystemSeconds,
          cpuTemp,
          cpuUsage,
          gpuTemp,
          gpuUsage,
          vramTotal,
          vramUsed,
          memTotal,
          memUsed
        };
        setHardwareData(result);
        setDataConnected(true);
      }
    };
    window.electron.ipcRenderer.on(HMONITOR_IPC_DATA_ID, handleHardwareUpdate);
    return () => {
      window.electron.ipcRenderer.removeAllListeners(HMONITOR_IPC_DATA_ID);
    };
  }, []);
  useEffect$3(() => {
    updateScrollArrows();
    const handleResize = () => updateScrollArrows();
    window.removeEventListener("resize", handleResize);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [hardwareData]);
  const { hasCpuSection, hasMemory, hasUptime, hasGpuSection } = useMemo$1(() => {
    const hasCpuSection2 = enabledMetrics.includes("cpuTemp") || enabledMetrics.includes("cpuUsage");
    const hasGpuSection2 = enabledMetrics.includes("gpuTemp") || enabledMetrics.includes("gpuUsage");
    const hasMemory2 = enabledMetrics.includes("memory");
    const hasUptime2 = enabledMetrics.includes("uptimeSeconds") || enabledMetrics.includes("uptimeSystemSeconds");
    return { hasCpuSection: hasCpuSection2, hasGpuSection: hasGpuSection2, hasMemory: hasMemory2, hasUptime: hasUptime2 };
  }, [enabledMetrics]);
  useEffect$3(() => {
    const scrollContainer = ref.current;
    if (scrollContainer) {
      const handleWheel = (event) => {
        if (!event.ctrlKey) {
          event.preventDefault();
          scrollContainer.scrollLeft += event.deltaY;
        }
      };
      scrollContainer.addEventListener("wheel", handleWheel);
      return () => {
        scrollContainer.removeEventListener("wheel", handleWheel);
      };
    }
    return () => {
    };
  }, [ref]);
  if (!enabled) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `relative ${compactMode ? "h-7" : "h-12"} w-full bg-gradient-to-r from-slate-900/95 to-slate-800/95 border-t border-slate-700/50 backdrop-blur-sm`,
      children: [
        canScrollLeft && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: `absolute left-2 top-1/2 -translate-y-1/2 z-10 ${compactMode ? "size-5" : "size-8"} rounded-full bg-slate-800/80 border border-slate-600/50 flex items-center justify-center hover:bg-slate-700/80 transition-all duration-200 backdrop-blur-sm`,
            onClick: () => scroll("left"),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "size-4 text-slate-300" })
          }
        ),
        canScrollRight && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: `absolute right-2 top-1/2 -translate-y-1/2 z-10 ${compactMode ? "size-5" : "size-8"} rounded-full bg-slate-800/80 border border-slate-600/50 flex items-center justify-center hover:bg-slate-700/80 transition-all duration-200 backdrop-blur-sm`,
            onClick: () => scroll("right"),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "size-4 text-slate-300" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            ref,
            onScroll: updateScrollArrows,
            style: { scrollbarWidth: "none", msOverflowStyle: "none" },
            className: `h-full flex items-center ${compactMode ? "px-2" : "px-3"} gap-x-4 overflow-x-auto scrollbar-hide`,
            children: dataConnected ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              hasCpuSection && /* @__PURE__ */ jsxRuntimeExports.jsx(CpuSection, { data: hardwareData }),
              (hasGpuSection || hasMemory || hasUptime) && hasCpuSection && /* @__PURE__ */ jsxRuntimeExports.jsx(Divider$1, { type: "vertical", className: "mx-0" }),
              hasGpuSection && /* @__PURE__ */ jsxRuntimeExports.jsx(GpuSection, { data: hardwareData }),
              (hasGpuSection || hasUptime) && hasMemory && /* @__PURE__ */ jsxRuntimeExports.jsx(Divider$1, { type: "vertical", className: "mx-0" }),
              hasMemory && /* @__PURE__ */ jsxRuntimeExports.jsx(MemorySection, { data: hardwareData }),
              (hasGpuSection || hasMemory) && hasUptime && /* @__PURE__ */ jsxRuntimeExports.jsx(Divider$1, { type: "vertical", className: "mx-0" }),
              hasUptime && /* @__PURE__ */ jsxRuntimeExports.jsx(UpTimeSection, { data: hardwareData })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShinyText, { speed: 2, className: "font-semibold", text: "Waiting for hardware information..." }) })
          }
        )
      ]
    }
  );
};

function Clock_Icon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { ...props, height: "1rem", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        opacity: "0.5",
        fill: "currentColor",
        d: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        fill: "currentColor",
        d: "M12 7.25a.75.75 0 0 1 .75.75v3.69l2.28 2.28a.75.75 0 1 1-1.06 1.06l-2.5-2.5a.75.75 0 0 1-.22-.53V8a.75.75 0 0 1 .75-.75"
      }
    )
  ] });
}

const storageChannels = {
  get: "storage:getData",
  getCustom: "storage:get-custom",
  setCustom: "storage:set-custom",
  getAll: "storage:getAllData",
  update: "storage:updateData",
  clear: "storage:clearStorage"
};

const ipc = window.electron.ipcRenderer;
const rendererIpc = {
  /** Managing app storage data */
  storage: {
    getCustom: (key) => ipc.invoke(storageChannels.getCustom, key),
    setCustom: (key, data) => ipc.send(storageChannels.setCustom, key, data),
    get: (key) => ipc.invoke(storageChannels.get, key),
    getAll: () => ipc.invoke(storageChannels.getAll),
    update: (key, updateData) => ipc.invoke(storageChannels.update, key, updateData),
    clear: () => ipc.invoke(storageChannels.clear)
  }};

const {addToast} = await importShared('@heroui/react');

const {isEmpty: isEmpty$2,isNil} = await importShared('lodash');

const {Fragment: Fragment$1,useMemo} = await importShared('react');
function topToast(options) {
  const { title, color = "success", timeout = 2e3, promise } = options;
  addToast({
    title,
    color,
    variant: "flat",
    size: "sm",
    timeout,
    promise
  });
}
const lynxTopToast = {
  success: (title, timeout) => topToast({ title, color: "success", timeout }),
  error: (title, timeout) => topToast({ title, color: "danger", timeout }),
  warning: (title, timeout) => topToast({ title, color: "warning", timeout }),
  info: (title, timeout) => topToast({ title, color: "default", timeout }),
  loading: (title, promise) => topToast({ title, color: "default", promise, timeout: 1 })
};

/** Detect free variable `global` from Node.js. */

var _freeGlobal;
var hasRequired_freeGlobal;

function require_freeGlobal () {
	if (hasRequired_freeGlobal) return _freeGlobal;
	hasRequired_freeGlobal = 1;
	var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

	_freeGlobal = freeGlobal;
	return _freeGlobal;
}

var _root;
var hasRequired_root;

function require_root () {
	if (hasRequired_root) return _root;
	hasRequired_root = 1;
	var freeGlobal = /*@__PURE__*/ require_freeGlobal();

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	_root = root;
	return _root;
}

var _Symbol;
var hasRequired_Symbol;

function require_Symbol () {
	if (hasRequired_Symbol) return _Symbol;
	hasRequired_Symbol = 1;
	var root = /*@__PURE__*/ require_root();

	/** Built-in value references. */
	var Symbol = root.Symbol;

	_Symbol = Symbol;
	return _Symbol;
}

var _getRawTag;
var hasRequired_getRawTag;

function require_getRawTag () {
	if (hasRequired_getRawTag) return _getRawTag;
	hasRequired_getRawTag = 1;
	var Symbol = /*@__PURE__*/ require_Symbol();

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

	/**
	 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the raw `toStringTag`.
	 */
	function getRawTag(value) {
	  var isOwn = hasOwnProperty.call(value, symToStringTag),
	      tag = value[symToStringTag];

	  try {
	    value[symToStringTag] = undefined;
	    var unmasked = true;
	  } catch (e) {}

	  var result = nativeObjectToString.call(value);
	  if (unmasked) {
	    if (isOwn) {
	      value[symToStringTag] = tag;
	    } else {
	      delete value[symToStringTag];
	    }
	  }
	  return result;
	}

	_getRawTag = getRawTag;
	return _getRawTag;
}

/** Used for built-in method references. */

var _objectToString;
var hasRequired_objectToString;

function require_objectToString () {
	if (hasRequired_objectToString) return _objectToString;
	hasRequired_objectToString = 1;
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

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

	_objectToString = objectToString;
	return _objectToString;
}

var _baseGetTag;
var hasRequired_baseGetTag;

function require_baseGetTag () {
	if (hasRequired_baseGetTag) return _baseGetTag;
	hasRequired_baseGetTag = 1;
	var Symbol = /*@__PURE__*/ require_Symbol(),
	    getRawTag = /*@__PURE__*/ require_getRawTag(),
	    objectToString = /*@__PURE__*/ require_objectToString();

	/** `Object#toString` result references. */
	var nullTag = '[object Null]',
	    undefinedTag = '[object Undefined]';

	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

	/**
	 * The base implementation of `getTag` without fallbacks for buggy environments.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag(value) {
	  if (value == null) {
	    return value === undefined ? undefinedTag : nullTag;
	  }
	  return (symToStringTag && symToStringTag in Object(value))
	    ? getRawTag(value)
	    : objectToString(value);
	}

	_baseGetTag = baseGetTag;
	return _baseGetTag;
}

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

var isObjectLike_1;
var hasRequiredIsObjectLike;

function requireIsObjectLike () {
	if (hasRequiredIsObjectLike) return isObjectLike_1;
	hasRequiredIsObjectLike = 1;
	function isObjectLike(value) {
	  return value != null && typeof value == 'object';
	}

	isObjectLike_1 = isObjectLike;
	return isObjectLike_1;
}

var isBoolean_1;
var hasRequiredIsBoolean;

function requireIsBoolean () {
	if (hasRequiredIsBoolean) return isBoolean_1;
	hasRequiredIsBoolean = 1;
	var baseGetTag = /*@__PURE__*/ require_baseGetTag(),
	    isObjectLike = /*@__PURE__*/ requireIsObjectLike();

	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]';

	/**
	 * Checks if `value` is classified as a boolean primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a boolean, else `false`.
	 * @example
	 *
	 * _.isBoolean(false);
	 * // => true
	 *
	 * _.isBoolean(null);
	 * // => false
	 */
	function isBoolean(value) {
	  return value === true || value === false ||
	    (isObjectLike(value) && baseGetTag(value) == boolTag);
	}

	isBoolean_1 = isBoolean;
	return isBoolean_1;
}

var isBooleanExports = /*@__PURE__*/ requireIsBoolean();
const isBoolean$1 = /*@__PURE__*/getDefaultExportFromCjs(isBooleanExports);

const {useSelector: useSelector$1} = await importShared('react-redux');

const initialState$1 = {
  darkMode: true,
  fullscreen: false,
  isOnline: false,
  maximized: false,
  onFocus: true,
  navBar: true,
  appTitle: void 0
};
createSlice({
  name: "app",
  initialState: initialState$1,
  reducers: {
    setAppState: (state, action) => {
      state[action.payload.key] = action.payload.value;
    },
    setAppTitle: (state, action) => {
      state.appTitle = action.payload;
    },
    toggleAppState: (state, action) => {
      const key = action.payload;
      if (isBoolean$1(state[key])) {
        state[key] = !state[key];
      }
    }
  }
});
const useAppState = (key) => useSelector$1((state) => state.app[key]);

const {isEmpty: isEmpty$1} = await importShared('lodash');
function convertBlobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

const {Image: Image$1} = await importShared('@heroui/react');

const {isEmpty} = await importShared('lodash');

const {useEffect: useEffect$2,useState: useState$1} = await importShared('react');
function useCachedImageUrl(id, url) {
  const isOnline = useAppState("isOnline");
  const [imageSrc, setImageSrc] = useState$1("");
  useEffect$2(() => {
    const fetchAndStoreImage = async () => {
      try {
        const response = await fetch(url);
        const data = await response.blob();
        const imageDataUrl = await convertBlobToDataUrl(data);
        localStorage.setItem(id, imageDataUrl);
        setImageSrc(imageDataUrl);
      } catch (error) {
        console.error("Error fetching and storing image:", error);
      }
    };
    {
      const cachedImage = localStorage.getItem(id);
      if (cachedImage) {
        setImageSrc(cachedImage);
      } else if (isOnline) {
        fetchAndStoreImage();
      }
    }
  }, [id, url, isOnline]);
  return imageSrc;
}

/*!
 * OverlayScrollbars
 * Version: 2.11.3
 *
 * Copyright (c) Rene Haas | KingSora.
 * https://github.com/KingSora
 *
 * Released under the MIT license.
 */
const createCache = (t, n) => {
  const {o: o, i: s, u: e} = t;
  let c = o;
  let r;
  const cacheUpdateContextual = (t, n) => {
    const o = c;
    const i = t;
    const l = n || (s ? !s(o, i) : o !== i);
    if (l || e) {
      c = i;
      r = o;
    }
    return [ c, l, r ];
  };
  const cacheUpdateIsolated = t => cacheUpdateContextual(n(c, r), t);
  const getCurrentCache = t => [ c, !!t, r ];
  return [ n ? cacheUpdateIsolated : cacheUpdateContextual, getCurrentCache ];
};

const t = typeof window !== "undefined" && typeof HTMLElement !== "undefined" && !!window.document;

const n = t ? window : {};

const o = Math.max;

const s = Math.min;

const e = Math.round;

const c = Math.abs;

const r = Math.sign;

const i = n.cancelAnimationFrame;

const l = n.requestAnimationFrame;

const a = n.setTimeout;

const u = n.clearTimeout;

const getApi = t => typeof n[t] !== "undefined" ? n[t] : void 0;

const f = getApi("MutationObserver");

const _ = getApi("IntersectionObserver");

const d$1 = getApi("ResizeObserver");

const p$1 = getApi("ScrollTimeline");

const isUndefined = t => t === void 0;

const isNull = t => t === null;

const isNumber = t => typeof t === "number";

const isString = t => typeof t === "string";

const isBoolean = t => typeof t === "boolean";

const isFunction = t => typeof t === "function";

const isArray = t => Array.isArray(t);

const isObject = t => typeof t === "object" && !isArray(t) && !isNull(t);

const isArrayLike = t => {
  const n = !!t && t.length;
  const o = isNumber(n) && n > -1 && n % 1 == 0;
  return isArray(t) || !isFunction(t) && o ? n > 0 && isObject(t) ? n - 1 in t : true : false;
};

const isPlainObject = t => !!t && t.constructor === Object;

const isHTMLElement = t => t instanceof HTMLElement;

const isElement = t => t instanceof Element;

function each(t, n) {
  if (isArrayLike(t)) {
    for (let o = 0; o < t.length; o++) {
      if (n(t[o], o, t) === false) {
        break;
      }
    }
  } else if (t) {
    each(Object.keys(t), (o => n(t[o], o, t)));
  }
  return t;
}

const inArray = (t, n) => t.indexOf(n) >= 0;

const concat = (t, n) => t.concat(n);

const push = (t, n, o) => {
  if (!isString(n) && isArrayLike(n)) {
    Array.prototype.push.apply(t, n);
  } else {
    t.push(n);
  }
  return t;
};

const from = t => Array.from(t || []);

const createOrKeepArray = t => {
  if (isArray(t)) {
    return t;
  }
  return !isString(t) && isArrayLike(t) ? from(t) : [ t ];
};

const isEmptyArray = t => !!t && !t.length;

const deduplicateArray = t => from(new Set(t));

const runEachAndClear = (t, n, o) => {
  const runFn = t => t ? t.apply(void 0, n || []) : true;
  each(t, runFn);
  if (!o) {
    t.length = 0;
  }
};

const v = "paddingTop";

const g$1 = "paddingRight";

const h = "paddingLeft";

const b = "paddingBottom";

const w$1 = "marginLeft";

const y = "marginRight";

const S$1 = "marginBottom";

const m = "overflowX";

const O$1 = "overflowY";

const $ = "width";

const C$1 = "height";

const x = "visible";

const H = "hidden";

const E$1 = "scroll";

const capitalizeFirstLetter = t => {
  const n = String(t || "");
  return n ? n[0].toUpperCase() + n.slice(1) : "";
};

const equal = (t, n, o, s) => {
  if (t && n) {
    let s = true;
    each(o, (o => {
      const e = t[o];
      const c = n[o];
      if (e !== c) {
        s = false;
      }
    }));
    return s;
  }
  return false;
};

const equalWH = (t, n) => equal(t, n, [ "w", "h" ]);

const equalXY = (t, n) => equal(t, n, [ "x", "y" ]);

const equalTRBL = (t, n) => equal(t, n, [ "t", "r", "b", "l" ]);

const bind = (t, ...n) => t.bind(0, ...n);

const selfClearTimeout = t => {
  let n;
  const o = t ? a : l;
  const s = t ? u : i;
  return [ e => {
    s(n);
    n = o((() => e()), isFunction(t) ? t() : t);
  }, () => s(n) ];
};

const getDebouncer = t => {
  const n = isFunction(t) ? t() : t;
  if (isNumber(n)) {
    const t = n ? a : l;
    const o = n ? u : i;
    return s => {
      const e = t((() => s()), n);
      return () => {
        o(e);
      };
    };
  }
  return n && n._;
};

const debounce = (t, n) => {
  const {p: o, v: s, S: e, m: c} = n || {};
  let r;
  let i;
  let l;
  let a;
  let u;
  const f = function invokeFunctionToDebounce(n) {
    if (i) {
      i();
    }
    if (r) {
      r();
    }
    u = i = r = l = void 0;
    t.apply(this, n);
  };
  const mergeParms = t => c && l ? c(l, t) : t;
  const flush = () => {
    if (i) {
      f(mergeParms(a) || a);
    }
  };
  const _ = function debouncedFn() {
    const t = from(arguments);
    const n = getDebouncer(o);
    if (n) {
      const o = getDebouncer(s);
      const c = mergeParms(t);
      const _ = c || t;
      const d = f.bind(0, _);
      if (i) {
        i();
      }
      if (e && !u) {
        d();
        u = true;
        i = n((() => u = void 0));
      } else {
        i = n(d);
        if (o && !r) {
          r = o(flush);
        }
      }
      l = a = _;
    } else {
      f(t);
    }
  };
  _.O = flush;
  return _;
};

const hasOwnProperty = (t, n) => Object.prototype.hasOwnProperty.call(t, n);

const keys = t => t ? Object.keys(t) : [];

const assignDeep = (t, n, o, s, e, c, r) => {
  const i = [ n, o, s, e, c, r ];
  if ((typeof t !== "object" || isNull(t)) && !isFunction(t)) {
    t = {};
  }
  each(i, (n => {
    each(n, ((o, s) => {
      const e = n[s];
      if (t === e) {
        return true;
      }
      const c = isArray(e);
      if (e && isPlainObject(e)) {
        const n = t[s];
        let o = n;
        if (c && !isArray(n)) {
          o = [];
        } else if (!c && !isPlainObject(n)) {
          o = {};
        }
        t[s] = assignDeep(o, e);
      } else {
        t[s] = c ? e.slice() : e;
      }
    }));
  }));
  return t;
};

const removeUndefinedProperties = (t, n) => each(assignDeep({}, t), ((t, n, o) => {
  if (t === void 0) {
    delete o[n];
  } else if (t && isPlainObject(t)) {
    o[n] = removeUndefinedProperties(t);
  }
}));

const isEmptyObject = t => !keys(t).length;

const noop = () => {};

const capNumber = (t, n, e) => o(t, s(n, e));

const getDomTokensArray = t => deduplicateArray((isArray(t) ? t : (t || "").split(" ")).filter((t => t)));

const getAttr = (t, n) => t && t.getAttribute(n);

const hasAttr = (t, n) => t && t.hasAttribute(n);

const setAttrs = (t, n, o) => {
  each(getDomTokensArray(n), (n => {
    if (t) {
      t.setAttribute(n, String(o || ""));
    }
  }));
};

const removeAttrs = (t, n) => {
  each(getDomTokensArray(n), (n => t && t.removeAttribute(n)));
};

const domTokenListAttr = (t, n) => {
  const o = getDomTokensArray(getAttr(t, n));
  const s = bind(setAttrs, t, n);
  const domTokenListOperation = (t, n) => {
    const s = new Set(o);
    each(getDomTokensArray(t), (t => {
      s[n](t);
    }));
    return from(s).join(" ");
  };
  return {
    $: t => s(domTokenListOperation(t, "delete")),
    C: t => s(domTokenListOperation(t, "add")),
    H: t => {
      const n = getDomTokensArray(t);
      return n.reduce(((t, n) => t && o.includes(n)), n.length > 0);
    }
  };
};

const removeAttrClass = (t, n, o) => {
  domTokenListAttr(t, n).$(o);
  return bind(addAttrClass, t, n, o);
};

const addAttrClass = (t, n, o) => {
  domTokenListAttr(t, n).C(o);
  return bind(removeAttrClass, t, n, o);
};

const addRemoveAttrClass = (t, n, o, s) => (s ? addAttrClass : removeAttrClass)(t, n, o);

const hasAttrClass = (t, n, o) => domTokenListAttr(t, n).H(o);

const createDomTokenListClass = t => domTokenListAttr(t, "class");

const removeClass = (t, n) => {
  createDomTokenListClass(t).$(n);
};

const addClass = (t, n) => {
  createDomTokenListClass(t).C(n);
  return bind(removeClass, t, n);
};

const find = (t, n) => {
  const o = n ? isElement(n) && n : document;
  return o ? from(o.querySelectorAll(t)) : [];
};

const findFirst = (t, n) => {
  const o = n ? isElement(n) && n : document;
  return o && o.querySelector(t);
};

const is = (t, n) => isElement(t) && t.matches(n);

const isBodyElement = t => is(t, "body");

const contents = t => t ? from(t.childNodes) : [];

const parent = t => t && t.parentElement;

const closest = (t, n) => isElement(t) && t.closest(n);

const getFocusedElement = t => document.activeElement;

const liesBetween = (t, n, o) => {
  const s = closest(t, n);
  const e = t && findFirst(o, s);
  const c = closest(e, n) === s;
  return s && e ? s === t || e === t || c && closest(closest(t, o), n) !== s : false;
};

const removeElements = t => {
  each(createOrKeepArray(t), (t => {
    const n = parent(t);
    if (t && n) {
      n.removeChild(t);
    }
  }));
};

const appendChildren = (t, n) => bind(removeElements, t && n && each(createOrKeepArray(n), (n => {
  if (n) {
    t.appendChild(n);
  }
})));

let z;

const getTrustedTypePolicy = () => z;

const setTrustedTypePolicy = t => {
  z = t;
};

const createDiv = t => {
  const n = document.createElement("div");
  setAttrs(n, "class", t);
  return n;
};

const createDOM = t => {
  const n = createDiv();
  const o = getTrustedTypePolicy();
  const s = t.trim();
  n.innerHTML = o ? o.createHTML(s) : s;
  return each(contents(n), (t => removeElements(t)));
};

const getCSSVal = (t, n) => t.getPropertyValue(n) || t[n] || "";

const validFiniteNumber = t => {
  const n = t || 0;
  return isFinite(n) ? n : 0;
};

const parseToZeroOrNumber = t => validFiniteNumber(parseFloat(t || ""));

const roundCssNumber = t => Math.round(t * 1e4) / 1e4;

const numberToCssPx = t => `${roundCssNumber(validFiniteNumber(t))}px`;

function setStyles(t, n) {
  t && n && each(n, ((n, o) => {
    try {
      const s = t.style;
      const e = isNull(n) || isBoolean(n) ? "" : isNumber(n) ? numberToCssPx(n) : n;
      if (o.indexOf("--") === 0) {
        s.setProperty(o, e);
      } else {
        s[o] = e;
      }
    } catch (s) {}
  }));
}

function getStyles(t, o, s) {
  const e = isString(o);
  let c = e ? "" : {};
  if (t) {
    const r = n.getComputedStyle(t, s) || t.style;
    c = e ? getCSSVal(r, o) : from(o).reduce(((t, n) => {
      t[n] = getCSSVal(r, n);
      return t;
    }), c);
  }
  return c;
}

const topRightBottomLeft = (t, n, o) => {
  const s = n ? `${n}-` : "";
  const e = o ? `-${o}` : "";
  const c = `${s}top${e}`;
  const r = `${s}right${e}`;
  const i = `${s}bottom${e}`;
  const l = `${s}left${e}`;
  const a = getStyles(t, [ c, r, i, l ]);
  return {
    t: parseToZeroOrNumber(a[c]),
    r: parseToZeroOrNumber(a[r]),
    b: parseToZeroOrNumber(a[i]),
    l: parseToZeroOrNumber(a[l])
  };
};

const getTrasformTranslateValue = (t, n) => `translate${isObject(t) ? `(${t.x},${t.y})` : `${n ? "X" : "Y"}(${t})`}`;

const elementHasDimensions = t => !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);

const I = {
  w: 0,
  h: 0
};

const getElmWidthHeightProperty = (t, n) => n ? {
  w: n[`${t}Width`],
  h: n[`${t}Height`]
} : I;

const getWindowSize = t => getElmWidthHeightProperty("inner", t || n);

const T = bind(getElmWidthHeightProperty, "offset");

const A = bind(getElmWidthHeightProperty, "client");

const D = bind(getElmWidthHeightProperty, "scroll");

const getFractionalSize = t => {
  const n = parseFloat(getStyles(t, $)) || 0;
  const o = parseFloat(getStyles(t, C$1)) || 0;
  return {
    w: n - e(n),
    h: o - e(o)
  };
};

const getBoundingClientRect = t => t.getBoundingClientRect();

const hasDimensions = t => !!t && elementHasDimensions(t);

const domRectHasDimensions = t => !!(t && (t[C$1] || t[$]));

const domRectAppeared = (t, n) => {
  const o = domRectHasDimensions(t);
  const s = domRectHasDimensions(n);
  return !s && o;
};

const removeEventListener = (t, n, o, s) => {
  each(getDomTokensArray(n), (n => {
    if (t) {
      t.removeEventListener(n, o, s);
    }
  }));
};

const addEventListener = (t, n, o, s) => {
  var e;
  const c = (e = s && s.I) != null ? e : true;
  const r = s && s.T || false;
  const i = s && s.A || false;
  const l = {
    passive: c,
    capture: r
  };
  return bind(runEachAndClear, getDomTokensArray(n).map((n => {
    const s = i ? e => {
      removeEventListener(t, n, s, r);
      if (o) {
        o(e);
      }
    } : o;
    if (t) {
      t.addEventListener(n, s, l);
    }
    return bind(removeEventListener, t, n, s, r);
  })));
};

const stopPropagation = t => t.stopPropagation();

const preventDefault = t => t.preventDefault();

const stopAndPrevent = t => stopPropagation(t) || preventDefault(t);

const scrollElementTo = (t, n) => {
  const {x: o, y: s} = isNumber(n) ? {
    x: n,
    y: n
  } : n || {};
  isNumber(o) && (t.scrollLeft = o);
  isNumber(s) && (t.scrollTop = s);
};

const getElementScroll = t => ({
  x: t.scrollLeft,
  y: t.scrollTop
});

const getZeroScrollCoordinates = () => ({
  D: {
    x: 0,
    y: 0
  },
  M: {
    x: 0,
    y: 0
  }
});

const sanitizeScrollCoordinates = (t, n) => {
  const {D: o, M: s} = t;
  const {w: e, h: i} = n;
  const sanitizeAxis = (t, n, o) => {
    let s = r(t) * o;
    let e = r(n) * o;
    if (s === e) {
      const o = c(t);
      const r = c(n);
      e = o > r ? 0 : e;
      s = o < r ? 0 : s;
    }
    s = s === e ? 0 : s;
    return [ s + 0, e + 0 ];
  };
  const [l, a] = sanitizeAxis(o.x, s.x, e);
  const [u, f] = sanitizeAxis(o.y, s.y, i);
  return {
    D: {
      x: l,
      y: u
    },
    M: {
      x: a,
      y: f
    }
  };
};

const isDefaultDirectionScrollCoordinates = ({D: t, M: n}) => {
  const getAxis = (t, n) => t === 0 && t <= n;
  return {
    x: getAxis(t.x, n.x),
    y: getAxis(t.y, n.y)
  };
};

const getScrollCoordinatesPercent = ({D: t, M: n}, o) => {
  const getAxis = (t, n, o) => capNumber(0, 1, (t - o) / (t - n) || 0);
  return {
    x: getAxis(t.x, n.x, o.x),
    y: getAxis(t.y, n.y, o.y)
  };
};

const focusElement = t => {
  if (t && t.focus) {
    t.focus({
      preventScroll: true
    });
  }
};

const manageListener = (t, n) => {
  each(createOrKeepArray(n), t);
};

const createEventListenerHub = t => {
  const n = new Map;
  const removeEvent = (t, o) => {
    if (t) {
      const s = n.get(t);
      manageListener((t => {
        if (s) {
          s[t ? "delete" : "clear"](t);
        }
      }), o);
    } else {
      n.forEach((t => {
        t.clear();
      }));
      n.clear();
    }
  };
  const addEvent = (t, o) => {
    if (isString(t)) {
      const s = n.get(t) || new Set;
      n.set(t, s);
      manageListener((t => {
        if (isFunction(t)) {
          s.add(t);
        }
      }), o);
      return bind(removeEvent, t, o);
    }
    if (isBoolean(o) && o) {
      removeEvent();
    }
    const s = keys(t);
    const e = [];
    each(s, (n => {
      const o = t[n];
      if (o) {
        push(e, addEvent(n, o));
      }
    }));
    return bind(runEachAndClear, e);
  };
  const triggerEvent = (t, o) => {
    each(from(n.get(t)), (t => {
      if (o && !isEmptyArray(o)) {
        t.apply(0, o);
      } else {
        t();
      }
    }));
  };
  addEvent(t || {});
  return [ addEvent, removeEvent, triggerEvent ];
};

const M = {};

const k = {};

const addPlugins = t => {
  each(t, (t => each(t, ((n, o) => {
    M[o] = t[o];
  }))));
};

const registerPluginModuleInstances = (t, n, o) => keys(t).map((s => {
  const {static: e, instance: c} = t[s];
  const [r, i, l] = o || [];
  const a = o ? c : e;
  if (a) {
    const t = o ? a(r, i, n) : a(n);
    return (l || k)[s] = t;
  }
}));

const getStaticPluginModuleInstance = t => k[t];

const R = "__osOptionsValidationPlugin";

const V = `data-overlayscrollbars`;

const L = "os-environment";

const U = `${L}-scrollbar-hidden`;

const P = `${V}-initialize`;

const N = "noClipping";

const q$1 = `${V}-body`;

const B = V;

const F$1 = "host";

const j = `${V}-viewport`;

const X = m;

const Y = O$1;

const W = "arrange";

const J = "measuring";

const G = "scrolling";

const K = "scrollbarHidden";

const Q = "noContent";

const Z = `${V}-padding`;

const tt = `${V}-content`;

const nt = "os-size-observer";

const ot = `${nt}-appear`;

const st = `${nt}-listener`;

const it = "os-trinsic-observer";

const lt = "os-theme-none";

const at = "os-scrollbar";

const ut = `${at}-rtl`;

const ft = `${at}-horizontal`;

const _t = `${at}-vertical`;

const dt = `${at}-track`;

const pt = `${at}-handle`;

const vt = `${at}-visible`;

const gt = `${at}-cornerless`;

const ht = `${at}-interaction`;

const bt = `${at}-unusable`;

const wt = `${at}-auto-hide`;

const yt = `${wt}-hidden`;

const St = `${at}-wheel`;

const mt = `${dt}-interactive`;

const Ot = `${pt}-interactive`;

const $t = "__osSizeObserverPlugin";

const getShowNativeOverlaidScrollbars = (t, n) => {
  const {k: o} = n;
  const [s, e] = t("showNativeOverlaidScrollbars");
  return [ s && o.x && o.y, e ];
};

const overflowIsVisible = t => t.indexOf(x) === 0;

const overflowBehaviorToOverflowStyle = t => t.replace(`${x}-`, "");

const overflowCssValueToOverflowStyle = (t, n) => {
  if (t === "auto") {
    return n ? E$1 : H;
  }
  const o = t || H;
  return [ H, E$1, x ].includes(o) ? o : H;
};

const getElementOverflowStyle = (t, n) => {
  const {overflowX: o, overflowY: s} = getStyles(t, [ m, O$1 ]);
  return {
    x: overflowCssValueToOverflowStyle(o, n.x),
    y: overflowCssValueToOverflowStyle(s, n.y)
  };
};

const xt = "__osScrollbarsHidingPlugin";

const Et = "__osClickScrollPlugin";

const opsStringify = t => JSON.stringify(t, ((t, n) => {
  if (isFunction(n)) {
    throw 0;
  }
  return n;
}));

const getPropByPath = (t, n) => t ? `${n}`.split(".").reduce(((t, n) => t && hasOwnProperty(t, n) ? t[n] : void 0), t) : void 0;

const It = {
  paddingAbsolute: false,
  showNativeOverlaidScrollbars: false,
  update: {
    elementEvents: [ [ "img", "load" ] ],
    debounce: [ 0, 33 ],
    attributes: null,
    ignoreMutation: null
  },
  overflow: {
    x: "scroll",
    y: "scroll"
  },
  scrollbars: {
    theme: "os-theme-dark",
    visibility: "auto",
    autoHide: "never",
    autoHideDelay: 1300,
    autoHideSuspend: false,
    dragScroll: true,
    clickScroll: false,
    pointers: [ "mouse", "touch", "pen" ]
  }
};

const getOptionsDiff = (t, n) => {
  const o = {};
  const s = concat(keys(n), keys(t));
  each(s, (s => {
    const e = t[s];
    const c = n[s];
    if (isObject(e) && isObject(c)) {
      assignDeep(o[s] = {}, getOptionsDiff(e, c));
      if (isEmptyObject(o[s])) {
        delete o[s];
      }
    } else if (hasOwnProperty(n, s) && c !== e) {
      let t = true;
      if (isArray(e) || isArray(c)) {
        try {
          if (opsStringify(e) === opsStringify(c)) {
            t = false;
          }
        } catch (r) {}
      }
      if (t) {
        o[s] = c;
      }
    }
  }));
  return o;
};

const createOptionCheck = (t, n, o) => s => [ getPropByPath(t, s), o || getPropByPath(n, s) !== void 0 ];

let Tt;

const getNonce = () => Tt;

const setNonce = t => {
  Tt = t;
};

let At;

const createEnvironment = () => {
  const getNativeScrollbarSize = (t, n, o) => {
    appendChildren(document.body, t);
    appendChildren(document.body, t);
    const s = A(t);
    const e = T(t);
    const c = getFractionalSize(n);
    if (o) {
      removeElements(t);
    }
    return {
      x: e.h - s.h + c.h,
      y: e.w - s.w + c.w
    };
  };
  const getNativeScrollbarsHiding = t => {
    let n = false;
    const o = addClass(t, U);
    try {
      n = getStyles(t, "scrollbar-width") === "none" || getStyles(t, "display", "::-webkit-scrollbar") === "none";
    } catch (s) {}
    o();
    return n;
  };
  const t = `.${L}{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}.${L} div{width:200%;height:200%;margin:10px 0}.${U}{scrollbar-width:none!important}.${U}::-webkit-scrollbar,.${U}::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}`;
  const o = createDOM(`<div class="${L}"><div></div><style>${t}</style></div>`);
  const s = o[0];
  const e = s.firstChild;
  const c = s.lastChild;
  const r = getNonce();
  if (r) {
    c.nonce = r;
  }
  const [i, , l] = createEventListenerHub();
  const [a, u] = createCache({
    o: getNativeScrollbarSize(s, e),
    i: equalXY
  }, bind(getNativeScrollbarSize, s, e, true));
  const [f] = u();
  const _ = getNativeScrollbarsHiding(s);
  const d = {
    x: f.x === 0,
    y: f.y === 0
  };
  const v = {
    elements: {
      host: null,
      padding: !_,
      viewport: t => _ && isBodyElement(t) && t,
      content: false
    },
    scrollbars: {
      slot: true
    },
    cancel: {
      nativeScrollbarsOverlaid: false,
      body: null
    }
  };
  const g = assignDeep({}, It);
  const h = bind(assignDeep, {}, g);
  const b = bind(assignDeep, {}, v);
  const w = {
    P: f,
    k: d,
    U: _,
    J: !!p$1,
    G: bind(i, "r"),
    K: b,
    Z: t => assignDeep(v, t) && b(),
    tt: h,
    nt: t => assignDeep(g, t) && h(),
    ot: assignDeep({}, v),
    st: assignDeep({}, g)
  };
  removeAttrs(s, "style");
  removeElements(s);
  addEventListener(n, "resize", (() => {
    l("r", []);
  }));
  if (isFunction(n.matchMedia) && !_ && (!d.x || !d.y)) {
    const addZoomListener = t => {
      const o = n.matchMedia(`(resolution: ${n.devicePixelRatio}dppx)`);
      addEventListener(o, "change", (() => {
        t();
        addZoomListener(t);
      }), {
        A: true
      });
    };
    addZoomListener((() => {
      const [t, n] = a();
      assignDeep(w.P, t);
      l("r", [ n ]);
    }));
  }
  return w;
};

const getEnvironment = () => {
  if (!At) {
    At = createEnvironment();
  }
  return At;
};

const createEventContentChange = (t, n, o) => {
  let s = false;
  const e = o ? new WeakMap : false;
  const destroy = () => {
    s = true;
  };
  const updateElements = c => {
    if (e && o) {
      const r = o.map((n => {
        const [o, s] = n || [];
        const e = s && o ? (c || find)(o, t) : [];
        return [ e, s ];
      }));
      each(r, (o => each(o[0], (c => {
        const r = o[1];
        const i = e.get(c) || [];
        const l = t.contains(c);
        if (l && r) {
          const t = addEventListener(c, r, (o => {
            if (s) {
              t();
              e.delete(c);
            } else {
              n(o);
            }
          }));
          e.set(c, push(i, t));
        } else {
          runEachAndClear(i);
          e.delete(c);
        }
      }))));
    }
  };
  updateElements();
  return [ destroy, updateElements ];
};

const createDOMObserver = (t, n, o, s) => {
  let e = false;
  const {et: c, ct: r, rt: i, it: l, lt: a, ut: u} = s || {};
  const _ = debounce((() => e && o(true)), {
    p: 33,
    v: 99
  });
  const [d, p] = createEventContentChange(t, _, i);
  const v = c || [];
  const g = r || [];
  const h = concat(v, g);
  const observerCallback = (e, c) => {
    if (!isEmptyArray(c)) {
      const r = a || noop;
      const i = u || noop;
      const f = [];
      const _ = [];
      let d = false;
      let v = false;
      each(c, (o => {
        const {attributeName: e, target: c, type: a, oldValue: u, addedNodes: p, removedNodes: h} = o;
        const b = a === "attributes";
        const w = a === "childList";
        const y = t === c;
        const S = b && e;
        const m = S && getAttr(c, e || "");
        const O = isString(m) ? m : null;
        const $ = S && u !== O;
        const C = inArray(g, e) && $;
        if (n && (w || !y)) {
          const n = b && $;
          const a = n && l && is(c, l);
          const _ = a ? !r(c, e, u, O) : !b || n;
          const d = _ && !i(o, !!a, t, s);
          each(p, (t => push(f, t)));
          each(h, (t => push(f, t)));
          v = v || d;
        }
        if (!n && y && $ && !r(c, e, u, O)) {
          push(_, e);
          d = d || C;
        }
      }));
      p((t => deduplicateArray(f).reduce(((n, o) => {
        push(n, find(t, o));
        return is(o, t) ? push(n, o) : n;
      }), [])));
      if (n) {
        if (!e && v) {
          o(false);
        }
        return [ false ];
      }
      if (!isEmptyArray(_) || d) {
        const t = [ deduplicateArray(_), d ];
        if (!e) {
          o.apply(0, t);
        }
        return t;
      }
    }
  };
  const b = new f(bind(observerCallback, false));
  return [ () => {
    b.observe(t, {
      attributes: true,
      attributeOldValue: true,
      attributeFilter: h,
      subtree: n,
      childList: n,
      characterData: n
    });
    e = true;
    return () => {
      if (e) {
        d();
        b.disconnect();
        e = false;
      }
    };
  }, () => {
    if (e) {
      _.O();
      return observerCallback(true, b.takeRecords());
    }
  } ];
};

let Dt = null;

const createSizeObserver = (t, n, o) => {
  const {ft: s} = o || {};
  const e = getStaticPluginModuleInstance($t);
  const [c] = createCache({
    o: false,
    u: true
  });
  return () => {
    const o = [];
    const r = createDOM(`<div class="${nt}"><div class="${st}"></div></div>`);
    const i = r[0];
    const l = i.firstChild;
    const onSizeChangedCallbackProxy = t => {
      const o = isArray(t) && !isEmptyArray(t);
      let s = false;
      let e = false;
      if (o) {
        const n = t[0];
        const [o, , r] = c(n.contentRect);
        const i = domRectHasDimensions(o);
        e = domRectAppeared(o, r);
        s = !e && !i;
      } else {
        e = t === true;
      }
      if (!s) {
        n({
          _t: true,
          ft: e
        });
      }
    };
    if (d$1) {
      if (!isBoolean(Dt)) {
        const n = new d$1(noop);
        n.observe(t, {
          get box() {
            Dt = true;
          }
        });
        Dt = Dt || false;
        n.disconnect();
      }
      const n = debounce(onSizeChangedCallbackProxy, {
        p: 0,
        v: 0
      });
      const resizeObserverCallback = t => n(t);
      const s = new d$1(resizeObserverCallback);
      s.observe(Dt ? t : l);
      push(o, [ () => {
        s.disconnect();
      }, !Dt && appendChildren(t, i) ]);
      if (Dt) {
        const n = new d$1(resizeObserverCallback);
        n.observe(t, {
          box: "border-box"
        });
        push(o, (() => n.disconnect()));
      }
    } else if (e) {
      const [n, c] = e(l, onSizeChangedCallbackProxy, s);
      push(o, concat([ addClass(i, ot), addEventListener(i, "animationstart", n), appendChildren(t, i) ], c));
    } else {
      return noop;
    }
    return bind(runEachAndClear, o);
  };
};

const createTrinsicObserver = (t, n) => {
  let o;
  const isHeightIntrinsic = t => t.h === 0 || t.isIntersecting || t.intersectionRatio > 0;
  const s = createDiv(it);
  const [e] = createCache({
    o: false
  });
  const triggerOnTrinsicChangedCallback = (t, o) => {
    if (t) {
      const s = e(isHeightIntrinsic(t));
      const [, c] = s;
      return c && !o && n(s) && [ s ];
    }
  };
  const intersectionObserverCallback = (t, n) => triggerOnTrinsicChangedCallback(n.pop(), t);
  return [ () => {
    const n = [];
    if (_) {
      o = new _(bind(intersectionObserverCallback, false), {
        root: t
      });
      o.observe(s);
      push(n, (() => {
        o.disconnect();
      }));
    } else {
      const onSizeChanged = () => {
        const t = T(s);
        triggerOnTrinsicChangedCallback(t);
      };
      push(n, createSizeObserver(s, onSizeChanged)());
      onSizeChanged();
    }
    return bind(runEachAndClear, push(n, appendChildren(t, s)));
  }, () => o && intersectionObserverCallback(true, o.takeRecords()) ];
};

const createObserversSetup = (t, n, o, s) => {
  let e;
  let c;
  let r;
  let i;
  let l;
  let a;
  const u = `[${B}]`;
  const f = `[${j}]`;
  const _ = [ "id", "class", "style", "open", "wrap", "cols", "rows" ];
  const {dt: p, vt: v, L: g, gt: h, ht: b, V: w, bt: y, wt: S, yt: m, St: O} = t;
  const getDirectionIsRTL = t => getStyles(t, "direction") === "rtl";
  const $ = {
    Ot: false,
    B: getDirectionIsRTL(p)
  };
  const C = getEnvironment();
  const x = getStaticPluginModuleInstance(xt);
  const [H] = createCache({
    i: equalWH,
    o: {
      w: 0,
      h: 0
    }
  }, (() => {
    const s = x && x.R(t, n, $, C, o).Y;
    const e = y && w;
    const c = !e && hasAttrClass(v, B, N);
    const r = !w && S(W);
    const i = r && getElementScroll(h);
    const l = i && O();
    const a = m(J, c);
    const u = r && s && s();
    const f = D(g);
    const _ = getFractionalSize(g);
    if (u) {
      u();
    }
    scrollElementTo(h, i);
    if (l) {
      l();
    }
    if (c) {
      a();
    }
    return {
      w: f.w + _.w,
      h: f.h + _.h
    };
  }));
  const E = debounce(s, {
    p: () => e,
    v: () => c,
    m(t, n) {
      const [o] = t;
      const [s] = n;
      return [ concat(keys(o), keys(s)).reduce(((t, n) => {
        t[n] = o[n] || s[n];
        return t;
      }), {}) ];
    }
  });
  const setDirection = t => {
    const n = getDirectionIsRTL(p);
    assignDeep(t, {
      $t: a !== n
    });
    assignDeep($, {
      B: n
    });
    a = n;
  };
  const onTrinsicChanged = (t, n) => {
    const [o, e] = t;
    const c = {
      Ct: e
    };
    assignDeep($, {
      Ot: o
    });
    if (!n) {
      s(c);
    }
    return c;
  };
  const onSizeChanged = ({_t: t, ft: n}) => {
    const o = t && !n;
    const e = !o && C.U ? E : s;
    const c = {
      _t: t || n,
      ft: n
    };
    setDirection(c);
    e(c);
  };
  const onContentMutation = (t, n) => {
    const [, o] = H();
    const e = {
      xt: o
    };
    setDirection(e);
    const c = t ? s : E;
    if (o && !n) {
      c(e);
    }
    return e;
  };
  const onHostMutation = (t, n, o) => {
    const s = {
      Ht: n
    };
    setDirection(s);
    if (n && !o) {
      E(s);
    }
    return s;
  };
  const [z, I] = b ? createTrinsicObserver(v, onTrinsicChanged) : [];
  const T = !w && createSizeObserver(v, onSizeChanged, {
    ft: true
  });
  const [A, M] = createDOMObserver(v, false, onHostMutation, {
    ct: _,
    et: _
  });
  const k = w && d$1 && new d$1((t => {
    const n = t[t.length - 1].contentRect;
    onSizeChanged({
      _t: true,
      ft: domRectAppeared(n, l)
    });
    l = n;
  }));
  const R = debounce((() => {
    const [, t] = H();
    s({
      xt: t
    });
  }), {
    p: 222,
    S: true
  });
  return [ () => {
    if (k) {
      k.observe(v);
    }
    const t = T && T();
    const n = z && z();
    const o = A();
    const s = C.G((t => {
      if (t) {
        E({
          Et: t
        });
      } else {
        R();
      }
    }));
    return () => {
      if (k) {
        k.disconnect();
      }
      if (t) {
        t();
      }
      if (n) {
        n();
      }
      if (i) {
        i();
      }
      o();
      s();
    };
  }, ({zt: t, It: n, Tt: o}) => {
    const s = {};
    const [l] = t("update.ignoreMutation");
    const [a, d] = t("update.attributes");
    const [p, v] = t("update.elementEvents");
    const [h, y] = t("update.debounce");
    const S = v || d;
    const m = n || o;
    const ignoreMutationFromOptions = t => isFunction(l) && l(t);
    if (S) {
      if (r) {
        r();
      }
      if (i) {
        i();
      }
      const [t, n] = createDOMObserver(b || g, true, onContentMutation, {
        et: concat(_, a || []),
        rt: p,
        it: u,
        ut: (t, n) => {
          const {target: o, attributeName: s} = t;
          const e = !n && s && !w ? liesBetween(o, u, f) : false;
          return e || !!closest(o, `.${at}`) || !!ignoreMutationFromOptions(t);
        }
      });
      i = t();
      r = n;
    }
    if (y) {
      E.O();
      if (isArray(h)) {
        const t = h[0];
        const n = h[1];
        e = isNumber(t) && t;
        c = isNumber(n) && n;
      } else if (isNumber(h)) {
        e = h;
        c = false;
      } else {
        e = false;
        c = false;
      }
    }
    if (m) {
      const t = M();
      const n = I && I();
      const o = r && r();
      if (t) {
        assignDeep(s, onHostMutation(t[0], t[1], m));
      }
      if (n) {
        assignDeep(s, onTrinsicChanged(n[0], m));
      }
      if (o) {
        assignDeep(s, onContentMutation(o[0], m));
      }
    }
    setDirection(s);
    return s;
  }, $ ];
};

const resolveInitialization = (t, n) => isFunction(n) ? n.apply(0, t) : n;

const staticInitializationElement = (t, n, o, s) => {
  const e = isUndefined(s) ? o : s;
  const c = resolveInitialization(t, e);
  return c || n.apply(0, t);
};

const dynamicInitializationElement = (t, n, o, s) => {
  const e = isUndefined(s) ? o : s;
  const c = resolveInitialization(t, e);
  return !!c && (isHTMLElement(c) ? c : n.apply(0, t));
};

const cancelInitialization = (t, n) => {
  const {nativeScrollbarsOverlaid: o, body: s} = n || {};
  const {k: e, U: c, K: r} = getEnvironment();
  const {nativeScrollbarsOverlaid: i, body: l} = r().cancel;
  const a = o != null ? o : i;
  const u = isUndefined(s) ? l : s;
  const f = (e.x || e.y) && a;
  const _ = t && (isNull(u) ? !c : u);
  return !!f || !!_;
};

const createScrollbarsSetupElements = (t, n, o, s) => {
  const e = "--os-viewport-percent";
  const c = "--os-scroll-percent";
  const r = "--os-scroll-direction";
  const {K: i} = getEnvironment();
  const {scrollbars: l} = i();
  const {slot: a} = l;
  const {dt: u, vt: f, L: _, At: d, gt: v, bt: g, V: h} = n;
  const {scrollbars: b} = d ? {} : t;
  const {slot: w} = b || {};
  const y = [];
  const S = [];
  const m = [];
  const O = dynamicInitializationElement([ u, f, _ ], (() => h && g ? u : f), a, w);
  const initScrollTimeline = t => {
    if (p$1) {
      let n = null;
      let s = [];
      const e = new p$1({
        source: v,
        axis: t
      });
      const cancelAnimation = () => {
        if (n) {
          n.cancel();
        }
        n = null;
      };
      const _setScrollPercentAnimation = c => {
        const {Dt: r} = o;
        const i = isDefaultDirectionScrollCoordinates(r)[t];
        const l = t === "x";
        const a = [ getTrasformTranslateValue(0, l), getTrasformTranslateValue(`calc(100cq${l ? "w" : "h"} + -100%)`, l) ];
        const u = i ? a : a.reverse();
        if (s[0] === u[0] && s[1] === u[1]) {
          return cancelAnimation;
        }
        cancelAnimation();
        s = u;
        n = c.Mt.animate({
          clear: [ "left" ],
          transform: u
        }, {
          timeline: e
        });
        return cancelAnimation;
      };
      return {
        kt: _setScrollPercentAnimation
      };
    }
  };
  const $ = {
    x: initScrollTimeline("x"),
    y: initScrollTimeline("y")
  };
  const getViewportPercent = () => {
    const {Rt: t, Vt: n} = o;
    const getAxisValue = (t, n) => capNumber(0, 1, t / (t + n) || 0);
    return {
      x: getAxisValue(n.x, t.x),
      y: getAxisValue(n.y, t.y)
    };
  };
  const scrollbarStructureAddRemoveClass = (t, n, o) => {
    const s = o ? addClass : removeClass;
    each(t, (t => {
      s(t.Lt, n);
    }));
  };
  const scrollbarStyle = (t, n) => {
    each(t, (t => {
      const [o, s] = n(t);
      setStyles(o, s);
    }));
  };
  const scrollbarsAddRemoveClass = (t, n, o) => {
    const s = isBoolean(o);
    const e = s ? o : true;
    const c = s ? !o : true;
    if (e) {
      scrollbarStructureAddRemoveClass(S, t, n);
    }
    if (c) {
      scrollbarStructureAddRemoveClass(m, t, n);
    }
  };
  const refreshScrollbarsHandleLength = () => {
    const t = getViewportPercent();
    const createScrollbarStyleFn = t => n => [ n.Lt, {
      [e]: roundCssNumber(t) + ""
    } ];
    scrollbarStyle(S, createScrollbarStyleFn(t.x));
    scrollbarStyle(m, createScrollbarStyleFn(t.y));
  };
  const refreshScrollbarsHandleOffset = () => {
    if (!p$1) {
      const {Dt: t} = o;
      const n = getScrollCoordinatesPercent(t, getElementScroll(v));
      const createScrollbarStyleFn = t => n => [ n.Lt, {
        [c]: roundCssNumber(t) + ""
      } ];
      scrollbarStyle(S, createScrollbarStyleFn(n.x));
      scrollbarStyle(m, createScrollbarStyleFn(n.y));
    }
  };
  const refreshScrollbarsScrollCoordinates = () => {
    const {Dt: t} = o;
    const n = isDefaultDirectionScrollCoordinates(t);
    const createScrollbarStyleFn = t => n => [ n.Lt, {
      [r]: t ? "0" : "1"
    } ];
    scrollbarStyle(S, createScrollbarStyleFn(n.x));
    scrollbarStyle(m, createScrollbarStyleFn(n.y));
    if (p$1) {
      S.forEach($.x.kt);
      m.forEach($.y.kt);
    }
  };
  const refreshScrollbarsScrollbarOffset = () => {
    if (h && !g) {
      const {Rt: t, Dt: n} = o;
      const s = isDefaultDirectionScrollCoordinates(n);
      const e = getScrollCoordinatesPercent(n, getElementScroll(v));
      const styleScrollbarPosition = n => {
        const {Lt: o} = n;
        const c = parent(o) === _ && o;
        const getTranslateValue = (t, n, o) => {
          const s = n * t;
          return numberToCssPx(o ? s : -s);
        };
        return [ c, c && {
          transform: getTrasformTranslateValue({
            x: getTranslateValue(e.x, t.x, s.x),
            y: getTranslateValue(e.y, t.y, s.y)
          })
        } ];
      };
      scrollbarStyle(S, styleScrollbarPosition);
      scrollbarStyle(m, styleScrollbarPosition);
    }
  };
  const generateScrollbarDOM = t => {
    const n = t ? "x" : "y";
    const o = t ? ft : _t;
    const e = createDiv(`${at} ${o}`);
    const c = createDiv(dt);
    const r = createDiv(pt);
    const i = {
      Lt: e,
      Ut: c,
      Mt: r
    };
    const l = $[n];
    push(t ? S : m, i);
    push(y, [ appendChildren(e, c), appendChildren(c, r), bind(removeElements, e), l && l.kt(i), s(i, scrollbarsAddRemoveClass, t) ]);
    return i;
  };
  const C = bind(generateScrollbarDOM, true);
  const x = bind(generateScrollbarDOM, false);
  const appendElements = () => {
    appendChildren(O, S[0].Lt);
    appendChildren(O, m[0].Lt);
    return bind(runEachAndClear, y);
  };
  C();
  x();
  return [ {
    Pt: refreshScrollbarsHandleLength,
    Nt: refreshScrollbarsHandleOffset,
    qt: refreshScrollbarsScrollCoordinates,
    Bt: refreshScrollbarsScrollbarOffset,
    Ft: scrollbarsAddRemoveClass,
    jt: {
      Xt: S,
      Yt: C,
      Wt: bind(scrollbarStyle, S)
    },
    Jt: {
      Xt: m,
      Yt: x,
      Wt: bind(scrollbarStyle, m)
    }
  }, appendElements ];
};

const createScrollbarsSetupEvents = (t, n, o, s) => (r, i, l) => {
  const {vt: u, L: f, V: _, gt: d, Gt: p, St: v} = n;
  const {Lt: g, Ut: h, Mt: b} = r;
  const [w, y] = selfClearTimeout(333);
  const [S, m] = selfClearTimeout(444);
  const scrollOffsetElementScrollBy = t => {
    if (isFunction(d.scrollBy)) {
      d.scrollBy({
        behavior: "smooth",
        left: t.x,
        top: t.y
      });
    }
  };
  const createInteractiveScrollEvents = () => {
    const n = "pointerup pointercancel lostpointercapture";
    const s = `client${l ? "X" : "Y"}`;
    const r = l ? $ : C$1;
    const i = l ? "left" : "top";
    const a = l ? "w" : "h";
    const u = l ? "x" : "y";
    const createRelativeHandleMove = (t, n) => s => {
      const {Rt: e} = o;
      const c = T(h)[a] - T(b)[a];
      const r = n * s / c;
      const i = r * e[u];
      scrollElementTo(d, {
        [u]: t + i
      });
    };
    const f = [];
    return addEventListener(h, "pointerdown", (o => {
      const l = closest(o.target, `.${pt}`) === b;
      const _ = l ? b : h;
      const g = t.scrollbars;
      const w = g[l ? "dragScroll" : "clickScroll"];
      const {button: y, isPrimary: O, pointerType: $} = o;
      const {pointers: C} = g;
      const x = y === 0 && O && w && (C || []).includes($);
      if (x) {
        runEachAndClear(f);
        m();
        const t = !l && (o.shiftKey || w === "instant");
        const g = bind(getBoundingClientRect, b);
        const y = bind(getBoundingClientRect, h);
        const getHandleOffset = (t, n) => (t || g())[i] - (n || y())[i];
        const O = e(getBoundingClientRect(d)[r]) / T(d)[a] || 1;
        const $ = createRelativeHandleMove(getElementScroll(d)[u], 1 / O);
        const C = o[s];
        const x = g();
        const H = y();
        const E = x[r];
        const z = getHandleOffset(x, H) + E / 2;
        const I = C - H[i];
        const A = l ? 0 : I - z;
        const releasePointerCapture = t => {
          runEachAndClear(k);
          _.releasePointerCapture(t.pointerId);
        };
        const D = l || t;
        const M = v();
        const k = [ addEventListener(p, n, releasePointerCapture), addEventListener(p, "selectstart", (t => preventDefault(t)), {
          I: false
        }), addEventListener(h, n, releasePointerCapture), D && addEventListener(h, "pointermove", (t => $(A + (t[s] - C)))), D && (() => {
          const t = getElementScroll(d);
          M();
          const n = getElementScroll(d);
          const o = {
            x: n.x - t.x,
            y: n.y - t.y
          };
          if (c(o.x) > 3 || c(o.y) > 3) {
            v();
            scrollElementTo(d, t);
            scrollOffsetElementScrollBy(o);
            S(M);
          }
        }) ];
        _.setPointerCapture(o.pointerId);
        if (t) {
          $(A);
        } else if (!l) {
          const t = getStaticPluginModuleInstance(Et);
          if (t) {
            const n = t($, A, E, (t => {
              if (t) {
                M();
              } else {
                push(k, M);
              }
            }));
            push(k, n);
            push(f, bind(n, true));
          }
        }
      }
    }));
  };
  let O = true;
  return bind(runEachAndClear, [ addEventListener(b, "pointermove pointerleave", s), addEventListener(g, "pointerenter", (() => {
    i(ht, true);
  })), addEventListener(g, "pointerleave pointercancel", (() => {
    i(ht, false);
  })), !_ && addEventListener(g, "mousedown", (() => {
    const t = getFocusedElement();
    if (hasAttr(t, j) || hasAttr(t, B) || t === document.body) {
      a(bind(focusElement, f), 25);
    }
  })), addEventListener(g, "wheel", (t => {
    const {deltaX: n, deltaY: o, deltaMode: s} = t;
    if (O && s === 0 && parent(g) === u) {
      scrollOffsetElementScrollBy({
        x: n,
        y: o
      });
    }
    O = false;
    i(St, true);
    w((() => {
      O = true;
      i(St);
    }));
    preventDefault(t);
  }), {
    I: false,
    T: true
  }), addEventListener(g, "pointerdown", bind(addEventListener, p, "click", stopAndPrevent, {
    A: true,
    T: true,
    I: false
  }), {
    T: true
  }), createInteractiveScrollEvents(), y, m ]);
};

const createScrollbarsSetup = (t, n, o, s, e, c) => {
  let r;
  let i;
  let l;
  let a;
  let u;
  let f = noop;
  let _ = 0;
  const d = [ "mouse", "pen" ];
  const isHoverablePointerType = t => d.includes(t.pointerType);
  const [p, v] = selfClearTimeout();
  const [g, h] = selfClearTimeout(100);
  const [b, w] = selfClearTimeout(100);
  const [y, S] = selfClearTimeout((() => _));
  const [m, O] = createScrollbarsSetupElements(t, e, s, createScrollbarsSetupEvents(n, e, s, (t => isHoverablePointerType(t) && manageScrollbarsAutoHideInstantInteraction())));
  const {vt: $, Kt: C, bt: H} = e;
  const {Ft: z, Pt: I, Nt: T, qt: A, Bt: D} = m;
  const manageScrollbarsAutoHide = (t, n) => {
    S();
    if (t) {
      z(yt);
    } else {
      const t = bind(z, yt, true);
      if (_ > 0 && !n) {
        y(t);
      } else {
        t();
      }
    }
  };
  const manageScrollbarsAutoHideInstantInteraction = () => {
    if (l ? !r : !a) {
      manageScrollbarsAutoHide(true);
      g((() => {
        manageScrollbarsAutoHide(false);
      }));
    }
  };
  const manageAutoHideSuspension = t => {
    z(wt, t, true);
    z(wt, t, false);
  };
  const onHostMouseEnter = t => {
    if (isHoverablePointerType(t)) {
      r = l;
      if (l) {
        manageScrollbarsAutoHide(true);
      }
    }
  };
  const M = [ S, h, w, v, () => f(), addEventListener($, "pointerover", onHostMouseEnter, {
    A: true
  }), addEventListener($, "pointerenter", onHostMouseEnter), addEventListener($, "pointerleave", (t => {
    if (isHoverablePointerType(t)) {
      r = false;
      if (l) {
        manageScrollbarsAutoHide(false);
      }
    }
  })), addEventListener($, "pointermove", (t => {
    if (isHoverablePointerType(t) && i) {
      manageScrollbarsAutoHideInstantInteraction();
    }
  })), addEventListener(C, "scroll", (t => {
    p((() => {
      T();
      manageScrollbarsAutoHideInstantInteraction();
    }));
    c(t);
    D();
  })) ];
  return [ () => bind(runEachAndClear, push(M, O())), ({zt: t, Tt: n, Qt: e, Zt: c}) => {
    const {tn: r, nn: d, sn: p, en: v} = c || {};
    const {$t: g, ft: h} = e || {};
    const {B: w} = o;
    const {k: y} = getEnvironment();
    const {cn: S, j: m} = s;
    const [O, $] = t("showNativeOverlaidScrollbars");
    const [M, k] = t("scrollbars.theme");
    const [R, V] = t("scrollbars.visibility");
    const [L, U] = t("scrollbars.autoHide");
    const [P, N] = t("scrollbars.autoHideSuspend");
    const [q] = t("scrollbars.autoHideDelay");
    const [B, F] = t("scrollbars.dragScroll");
    const [j, X] = t("scrollbars.clickScroll");
    const [Y, W] = t("overflow");
    const J = h && !n;
    const G = m.x || m.y;
    const K = r || d || v || g || n;
    const Q = p || V || W;
    const Z = O && y.x && y.y;
    const setScrollbarVisibility = (t, n, o) => {
      const s = t.includes(E$1) && (R === x || R === "auto" && n === E$1);
      z(vt, s, o);
      return s;
    };
    _ = q;
    if (J) {
      if (P && G) {
        manageAutoHideSuspension(false);
        f();
        b((() => {
          f = addEventListener(C, "scroll", bind(manageAutoHideSuspension, true), {
            A: true
          });
        }));
      } else {
        manageAutoHideSuspension(true);
      }
    }
    if ($) {
      z(lt, Z);
    }
    if (k) {
      z(u);
      z(M, true);
      u = M;
    }
    if (N && !P) {
      manageAutoHideSuspension(true);
    }
    if (U) {
      i = L === "move";
      l = L === "leave";
      a = L === "never";
      manageScrollbarsAutoHide(a, true);
    }
    if (F) {
      z(Ot, B);
    }
    if (X) {
      z(mt, !!j);
    }
    if (Q) {
      const t = setScrollbarVisibility(Y.x, S.x, true);
      const n = setScrollbarVisibility(Y.y, S.y, false);
      const o = t && n;
      z(gt, !o);
    }
    if (K) {
      T();
      I();
      D();
      if (v) {
        A();
      }
      z(bt, !m.x, true);
      z(bt, !m.y, false);
      z(ut, w && !H);
    }
  }, {}, m ];
};

const createStructureSetupElements = t => {
  const o = getEnvironment();
  const {K: s, U: e} = o;
  const {elements: c} = s();
  const {padding: r, viewport: i, content: l} = c;
  const a = isHTMLElement(t);
  const u = a ? {} : t;
  const {elements: f} = u;
  const {padding: _, viewport: d, content: p} = f || {};
  const v = a ? t : u.target;
  const g = isBodyElement(v);
  const h = v.ownerDocument;
  const b = h.documentElement;
  const getDocumentWindow = () => h.defaultView || n;
  const w = bind(staticInitializationElement, [ v ]);
  const y = bind(dynamicInitializationElement, [ v ]);
  const S = bind(createDiv, "");
  const $ = bind(w, S, i);
  const C = bind(y, S, l);
  const elementHasOverflow = t => {
    const n = T(t);
    const o = D(t);
    const s = getStyles(t, m);
    const e = getStyles(t, O$1);
    return o.w - n.w > 0 && !overflowIsVisible(s) || o.h - n.h > 0 && !overflowIsVisible(e);
  };
  const x = $(d);
  const H = x === v;
  const E = H && g;
  const z = !H && C(p);
  const I = !H && x === z;
  const A = E ? b : x;
  const M = E ? A : v;
  const k = !H && y(S, r, _);
  const R = !I && z;
  const V = [ R, A, k, M ].map((t => isHTMLElement(t) && !parent(t) && t));
  const elementIsGenerated = t => t && inArray(V, t);
  const L = !elementIsGenerated(A) && elementHasOverflow(A) ? A : v;
  const U = E ? b : A;
  const N = E ? h : A;
  const X = {
    dt: v,
    vt: M,
    L: A,
    rn: k,
    ht: R,
    gt: U,
    Kt: N,
    ln: g ? b : L,
    Gt: h,
    bt: g,
    At: a,
    V: H,
    an: getDocumentWindow,
    wt: t => hasAttrClass(A, j, t),
    yt: (t, n) => addRemoveAttrClass(A, j, t, n),
    St: () => addRemoveAttrClass(U, j, G, true)
  };
  const {dt: Y, vt: W, rn: J, L: Q, ht: nt} = X;
  const ot = [ () => {
    removeAttrs(W, [ B, P ]);
    removeAttrs(Y, P);
    if (g) {
      removeAttrs(b, [ P, B ]);
    }
  } ];
  let st = contents([ nt, Q, J, W, Y ].find((t => t && !elementIsGenerated(t))));
  const et = E ? Y : nt || Q;
  const ct = bind(runEachAndClear, ot);
  const appendElements = () => {
    const t = getDocumentWindow();
    const n = getFocusedElement();
    const unwrap = t => {
      appendChildren(parent(t), contents(t));
      removeElements(t);
    };
    const prepareWrapUnwrapFocus = t => addEventListener(t, "focusin focusout focus blur", stopAndPrevent, {
      T: true,
      I: false
    });
    const o = "tabindex";
    const s = getAttr(Q, o);
    const c = prepareWrapUnwrapFocus(n);
    setAttrs(W, B, H ? "" : F$1);
    setAttrs(J, Z, "");
    setAttrs(Q, j, "");
    setAttrs(nt, tt, "");
    if (!H) {
      setAttrs(Q, o, s || "-1");
      if (g) {
        setAttrs(b, q$1, "");
      }
    }
    appendChildren(et, st);
    appendChildren(W, J);
    appendChildren(J || W, !H && Q);
    appendChildren(Q, nt);
    push(ot, [ c, () => {
      const t = getFocusedElement();
      const n = elementIsGenerated(Q);
      const e = n && t === Q ? Y : t;
      const c = prepareWrapUnwrapFocus(e);
      removeAttrs(J, Z);
      removeAttrs(nt, tt);
      removeAttrs(Q, j);
      if (g) {
        removeAttrs(b, q$1);
      }
      if (s) {
        setAttrs(Q, o, s);
      } else {
        removeAttrs(Q, o);
      }
      if (elementIsGenerated(nt)) {
        unwrap(nt);
      }
      if (n) {
        unwrap(Q);
      }
      if (elementIsGenerated(J)) {
        unwrap(J);
      }
      focusElement(e);
      c();
    } ]);
    if (e && !H) {
      addAttrClass(Q, j, K);
      push(ot, bind(removeAttrs, Q, j));
    }
    focusElement(!H && g && n === Y && t.top === t ? Q : n);
    c();
    st = 0;
    return ct;
  };
  return [ X, appendElements, ct ];
};

const createTrinsicUpdateSegment = ({ht: t}) => ({Qt: n, un: o, Tt: s}) => {
  const {Ct: e} = n || {};
  const {Ot: c} = o;
  const r = t && (e || s);
  if (r) {
    setStyles(t, {
      [C$1]: c && "100%"
    });
  }
};

const createPaddingUpdateSegment = ({vt: t, rn: n, L: o, V: s}, e) => {
  const [c, r] = createCache({
    i: equalTRBL,
    o: topRightBottomLeft()
  }, bind(topRightBottomLeft, t, "padding", ""));
  return ({zt: t, Qt: i, un: l, Tt: a}) => {
    let [u, f] = r(a);
    const {U: _} = getEnvironment();
    const {_t: d, xt: p, $t: m} = i || {};
    const {B: O} = l;
    const [C, x] = t("paddingAbsolute");
    const H = a || p;
    if (d || f || H) {
      [u, f] = c(a);
    }
    const E = !s && (x || m || f);
    if (E) {
      const t = !C || !n && !_;
      const s = u.r + u.l;
      const c = u.t + u.b;
      const r = {
        [y]: t && !O ? -s : 0,
        [S$1]: t ? -c : 0,
        [w$1]: t && O ? -s : 0,
        top: t ? -u.t : 0,
        right: t ? O ? -u.r : "auto" : 0,
        left: t ? O ? "auto" : -u.l : 0,
        [$]: t && `calc(100% + ${s}px)`
      };
      const i = {
        [v]: t ? u.t : 0,
        [g$1]: t ? u.r : 0,
        [b]: t ? u.b : 0,
        [h]: t ? u.l : 0
      };
      setStyles(n || o, r);
      setStyles(o, i);
      assignDeep(e, {
        rn: u,
        fn: !t,
        F: n ? i : assignDeep({}, r, i)
      });
    }
    return {
      _n: E
    };
  };
};

const createOverflowUpdateSegment = (t, s) => {
  const e = getEnvironment();
  const {vt: c, rn: r, L: i, V: a, Kt: u, gt: f, bt: _, yt: d, an: p} = t;
  const {U: v} = e;
  const g = _ && a;
  const h = bind(o, 0);
  const b = {
    display: () => false,
    direction: t => t !== "ltr",
    flexDirection: t => t.endsWith("-reverse"),
    writingMode: t => t !== "horizontal-tb"
  };
  const w = keys(b);
  const y = {
    i: equalWH,
    o: {
      w: 0,
      h: 0
    }
  };
  const S = {
    i: equalXY,
    o: {}
  };
  const setMeasuringMode = t => {
    d(J, !g && t);
  };
  const getMeasuredScrollCoordinates = t => {
    const n = w.some((n => {
      const o = t[n];
      return o && b[n](o);
    }));
    if (!n) {
      return {
        D: {
          x: 0,
          y: 0
        },
        M: {
          x: 1,
          y: 1
        }
      };
    }
    setMeasuringMode(true);
    const o = getElementScroll(f);
    const s = d(Q, true);
    const e = addEventListener(u, E$1, (t => {
      const n = getElementScroll(f);
      if (t.isTrusted && n.x === o.x && n.y === o.y) {
        stopPropagation(t);
      }
    }), {
      T: true,
      A: true
    });
    scrollElementTo(f, {
      x: 0,
      y: 0
    });
    s();
    const c = getElementScroll(f);
    const r = D(f);
    scrollElementTo(f, {
      x: r.w,
      y: r.h
    });
    const i = getElementScroll(f);
    scrollElementTo(f, {
      x: i.x - c.x < 1 && -r.w,
      y: i.y - c.y < 1 && -r.h
    });
    const a = getElementScroll(f);
    scrollElementTo(f, o);
    l((() => e()));
    return {
      D: c,
      M: a
    };
  };
  const getOverflowAmount = (t, o) => {
    const s = n.devicePixelRatio % 1 !== 0 ? 1 : 0;
    const e = {
      w: h(t.w - o.w),
      h: h(t.h - o.h)
    };
    return {
      w: e.w > s ? e.w : 0,
      h: e.h > s ? e.h : 0
    };
  };
  const getViewportOverflowStyle = (t, n) => {
    const getAxisOverflowStyle = (t, n, o, s) => {
      const e = t === x ? H : overflowBehaviorToOverflowStyle(t);
      const c = overflowIsVisible(t);
      const r = overflowIsVisible(o);
      if (!n && !s) {
        return H;
      }
      if (c && r) {
        return x;
      }
      if (c) {
        const t = n ? x : H;
        return n && s ? e : t;
      }
      const i = r && s ? x : H;
      return n ? e : i;
    };
    return {
      x: getAxisOverflowStyle(n.x, t.x, n.y, t.y),
      y: getAxisOverflowStyle(n.y, t.y, n.x, t.x)
    };
  };
  const setViewportOverflowStyle = t => {
    const createAllOverflowStyleClassNames = t => [ x, H, E$1 ].map((n => createViewportOverflowStyleClassName(overflowCssValueToOverflowStyle(n), t)));
    const n = createAllOverflowStyleClassNames(true).concat(createAllOverflowStyleClassNames()).join(" ");
    d(n);
    d(keys(t).map((n => createViewportOverflowStyleClassName(t[n], n === "x"))).join(" "), true);
  };
  const [m, O] = createCache(y, bind(getFractionalSize, i));
  const [$, C] = createCache(y, bind(D, i));
  const [z, I] = createCache(y);
  const [T] = createCache(S);
  const [M, k] = createCache(y);
  const [R] = createCache(S);
  const [V] = createCache({
    i: (t, n) => equal(t, n, w),
    o: {}
  }, (() => hasDimensions(i) ? getStyles(i, w) : {}));
  const [L, U] = createCache({
    i: (t, n) => equalXY(t.D, n.D) && equalXY(t.M, n.M),
    o: getZeroScrollCoordinates()
  });
  const P = getStaticPluginModuleInstance(xt);
  const createViewportOverflowStyleClassName = (t, n) => {
    const o = n ? X : Y;
    return `${o}${capitalizeFirstLetter(t)}`;
  };
  return ({zt: n, Qt: o, un: l, Tt: a}, {_n: u}) => {
    const {_t: f, Ht: _, xt: b, $t: w, ft: y, Et: S} = o || {};
    const x = P && P.R(t, s, l, e, n);
    const {X: H, Y: E, W: D} = x || {};
    const [q, F] = getShowNativeOverlaidScrollbars(n, e);
    const [j, X] = n("overflow");
    const Y = overflowIsVisible(j.x);
    const W = overflowIsVisible(j.y);
    const J = f || u || b || w || S || F;
    let G = O(a);
    let Q = C(a);
    let tt = I(a);
    let nt = k(a);
    if (F && v) {
      d(K, !q);
    }
    if (J) {
      if (hasAttrClass(c, B, N)) {
        setMeasuringMode(true);
      }
      const t = E && E();
      const [n] = G = m(a);
      const [o] = Q = $(a);
      const s = A(i);
      const e = g && getWindowSize(p());
      const r = {
        w: h(o.w + n.w),
        h: h(o.h + n.h)
      };
      const l = {
        w: h((e ? e.w : s.w + h(s.w - o.w)) + n.w),
        h: h((e ? e.h : s.h + h(s.h - o.h)) + n.h)
      };
      if (t) {
        t();
      }
      nt = M(l);
      tt = z(getOverflowAmount(r, l), a);
    }
    const [ot, st] = nt;
    const [et, ct] = tt;
    const [rt, it] = Q;
    const [lt, at] = G;
    const [ut, ft] = T({
      x: et.w > 0,
      y: et.h > 0
    });
    const _t = Y && W && (ut.x || ut.y) || Y && ut.x && !ut.y || W && ut.y && !ut.x;
    const dt = u || w || S || at || it || st || ct || X || F || J || _ && g;
    const [pt, vt] = V(a);
    const gt = w || y || vt || ft || a;
    const [ht, bt] = gt ? L(getMeasuredScrollCoordinates(pt), a) : U();
    let wt = getViewportOverflowStyle(ut, j);
    setMeasuringMode(false);
    if (dt) {
      setViewportOverflowStyle(wt);
      wt = getElementOverflowStyle(i, ut);
      if (D && H) {
        H(wt, rt, lt);
        setStyles(i, D(wt));
      }
    }
    const [yt, St] = R(wt);
    addRemoveAttrClass(c, B, N, _t);
    addRemoveAttrClass(r, Z, N, _t);
    assignDeep(s, {
      cn: yt,
      Vt: {
        x: ot.w,
        y: ot.h
      },
      Rt: {
        x: et.w,
        y: et.h
      },
      j: ut,
      Dt: sanitizeScrollCoordinates(ht, et)
    });
    return {
      sn: St,
      tn: st,
      nn: ct,
      en: bt || ct,
      dn: gt
    };
  };
};

const createStructureSetup = t => {
  const [n, o, s] = createStructureSetupElements(t);
  const e = {
    rn: {
      t: 0,
      r: 0,
      b: 0,
      l: 0
    },
    fn: false,
    F: {
      [y]: 0,
      [S$1]: 0,
      [w$1]: 0,
      [v]: 0,
      [g$1]: 0,
      [b]: 0,
      [h]: 0
    },
    Vt: {
      x: 0,
      y: 0
    },
    Rt: {
      x: 0,
      y: 0
    },
    cn: {
      x: H,
      y: H
    },
    j: {
      x: false,
      y: false
    },
    Dt: getZeroScrollCoordinates()
  };
  const {dt: c, gt: r, V: i, St: l} = n;
  const {U: a, k: u} = getEnvironment();
  const f = !a && (u.x || u.y);
  const _ = [ createTrinsicUpdateSegment(n), createPaddingUpdateSegment(n, e), createOverflowUpdateSegment(n, e) ];
  return [ o, t => {
    const n = {};
    const o = f;
    const s = o && getElementScroll(r);
    const e = s && l();
    each(_, (o => {
      assignDeep(n, o(t, n) || {});
    }));
    scrollElementTo(r, s);
    if (e) {
      e();
    }
    if (!i) {
      scrollElementTo(c, 0);
    }
    return n;
  }, e, n, s ];
};

const createSetups = (t, n, o, s, e) => {
  let c = false;
  const r = createOptionCheck(n, {});
  const [i, l, a, u, f] = createStructureSetup(t);
  const [_, d, p] = createObserversSetup(u, a, r, (t => {
    update({}, t);
  }));
  const [v, g, , h] = createScrollbarsSetup(t, n, p, a, u, e);
  const updateHintsAreTruthy = t => keys(t).some((n => !!t[n]));
  const update = (t, e) => {
    if (o()) {
      return false;
    }
    const {pn: r, Tt: i, It: a, vn: u} = t;
    const f = r || {};
    const _ = !!i || !c;
    const v = {
      zt: createOptionCheck(n, f, _),
      pn: f,
      Tt: _
    };
    if (u) {
      g(v);
      return false;
    }
    const h = e || d(assignDeep({}, v, {
      It: a
    }));
    const b = l(assignDeep({}, v, {
      un: p,
      Qt: h
    }));
    g(assignDeep({}, v, {
      Qt: h,
      Zt: b
    }));
    const w = updateHintsAreTruthy(h);
    const y = updateHintsAreTruthy(b);
    const S = w || y || !isEmptyObject(f) || _;
    c = true;
    if (S) {
      s(t, {
        Qt: h,
        Zt: b
      });
    }
    return S;
  };
  return [ () => {
    const {ln: t, gt: n, St: o} = u;
    const s = getElementScroll(t);
    const e = [ _(), i(), v() ];
    const c = o();
    scrollElementTo(n, s);
    c();
    return bind(runEachAndClear, e);
  }, update, () => ({
    gn: p,
    hn: a
  }), {
    bn: u,
    wn: h
  }, f ];
};

const Mt = new WeakMap;

const addInstance = (t, n) => {
  Mt.set(t, n);
};

const removeInstance = t => {
  Mt.delete(t);
};

const getInstance = t => Mt.get(t);

const OverlayScrollbars = (t, n, o) => {
  const {tt: s} = getEnvironment();
  const e = isHTMLElement(t);
  const c = e ? t : t.target;
  const r = getInstance(c);
  if (n && !r) {
    let r = false;
    const i = [];
    const l = {};
    const validateOptions = t => {
      const n = removeUndefinedProperties(t);
      const o = getStaticPluginModuleInstance(R);
      return o ? o(n, true) : n;
    };
    const a = assignDeep({}, s(), validateOptions(n));
    const [u, f, _] = createEventListenerHub();
    const [d, p, v] = createEventListenerHub(o);
    const triggerEvent = (t, n) => {
      v(t, n);
      _(t, n);
    };
    const [g, h, b, w, y] = createSetups(t, a, (() => r), (({pn: t, Tt: n}, {Qt: o, Zt: s}) => {
      const {_t: e, $t: c, Ct: r, xt: i, Ht: l, ft: a} = o;
      const {tn: u, nn: f, sn: _, en: d} = s;
      triggerEvent("updated", [ S, {
        updateHints: {
          sizeChanged: !!e,
          directionChanged: !!c,
          heightIntrinsicChanged: !!r,
          overflowEdgeChanged: !!u,
          overflowAmountChanged: !!f,
          overflowStyleChanged: !!_,
          scrollCoordinatesChanged: !!d,
          contentMutation: !!i,
          hostMutation: !!l,
          appear: !!a
        },
        changedOptions: t || {},
        force: !!n
      } ]);
    }), (t => triggerEvent("scroll", [ S, t ])));
    const destroy = t => {
      removeInstance(c);
      runEachAndClear(i);
      r = true;
      triggerEvent("destroyed", [ S, t ]);
      f();
      p();
    };
    const S = {
      options(t, n) {
        if (t) {
          const o = n ? s() : {};
          const e = getOptionsDiff(a, assignDeep(o, validateOptions(t)));
          if (!isEmptyObject(e)) {
            assignDeep(a, e);
            h({
              pn: e
            });
          }
        }
        return assignDeep({}, a);
      },
      on: d,
      off: (t, n) => {
        if (t && n) {
          p(t, n);
        }
      },
      state() {
        const {gn: t, hn: n} = b();
        const {B: o} = t;
        const {Vt: s, Rt: e, cn: c, j: i, rn: l, fn: a, Dt: u} = n;
        return assignDeep({}, {
          overflowEdge: s,
          overflowAmount: e,
          overflowStyle: c,
          hasOverflow: i,
          scrollCoordinates: {
            start: u.D,
            end: u.M
          },
          padding: l,
          paddingAbsolute: a,
          directionRTL: o,
          destroyed: r
        });
      },
      elements() {
        const {dt: t, vt: n, rn: o, L: s, ht: e, gt: c, Kt: r} = w.bn;
        const {jt: i, Jt: l} = w.wn;
        const translateScrollbarStructure = t => {
          const {Mt: n, Ut: o, Lt: s} = t;
          return {
            scrollbar: s,
            track: o,
            handle: n
          };
        };
        const translateScrollbarsSetupElement = t => {
          const {Xt: n, Yt: o} = t;
          const s = translateScrollbarStructure(n[0]);
          return assignDeep({}, s, {
            clone: () => {
              const t = translateScrollbarStructure(o());
              h({
                vn: true
              });
              return t;
            }
          });
        };
        return assignDeep({}, {
          target: t,
          host: n,
          padding: o || s,
          viewport: s,
          content: e || s,
          scrollOffsetElement: c,
          scrollEventElement: r,
          scrollbarHorizontal: translateScrollbarsSetupElement(i),
          scrollbarVertical: translateScrollbarsSetupElement(l)
        });
      },
      update: t => h({
        Tt: t,
        It: true
      }),
      destroy: bind(destroy, false),
      plugin: t => l[keys(t)[0]]
    };
    push(i, [ y ]);
    addInstance(c, S);
    registerPluginModuleInstances(M, OverlayScrollbars, [ S, u, l ]);
    if (cancelInitialization(w.bn.bt, !e && t.cancel)) {
      destroy(true);
      return S;
    }
    push(i, g());
    triggerEvent("initialized", [ S ]);
    S.update();
    return S;
  }
  return r;
};

OverlayScrollbars.plugin = t => {
  const n = isArray(t);
  const o = n ? t : [ t ];
  const s = o.map((t => registerPluginModuleInstances(t, OverlayScrollbars)[0]));
  addPlugins(o);
  return n ? s : s[0];
};

OverlayScrollbars.valid = t => {
  const n = t && t.elements;
  const o = isFunction(n) && n();
  return isPlainObject(o) && !!getInstance(o.target);
};

OverlayScrollbars.env = () => {
  const {P: t, k: n, U: o, J: s, ot: e, st: c, K: r, Z: i, tt: l, nt: a} = getEnvironment();
  return assignDeep({}, {
    scrollbarsSize: t,
    scrollbarsOverlaid: n,
    scrollbarsHiding: o,
    scrollTimeline: s,
    staticDefaultInitialization: e,
    staticDefaultOptions: c,
    getDefaultInitialization: r,
    setDefaultInitialization: i,
    getDefaultOptions: l,
    setDefaultOptions: a
  });
};

OverlayScrollbars.nonce = setNonce;

OverlayScrollbars.trustedTypePolicy = setTrustedTypePolicy;

const w = await importShared('react');
const {useMemo:C,useRef:d,useEffect:p,forwardRef:E,useImperativeHandle:O} = w;
const S = () => {
  if (typeof window > "u") {
    const n = () => {
    };
    return [n, n];
  }
  let l, o;
  const t = window, c = typeof t.requestIdleCallback == "function", a = t.requestAnimationFrame, i = t.cancelAnimationFrame, r = c ? t.requestIdleCallback : a, u = c ? t.cancelIdleCallback : i, s = () => {
    u(l), i(o);
  };
  return [
    (n, e) => {
      s(), l = r(
        c ? () => {
          s(), o = a(n);
        } : n,
        typeof e == "object" ? e : { timeout: 2233 }
      );
    },
    s
  ];
}, F = (l) => {
  const { options: o, events: t, defer: c } = l || {}, [a, i] = C(S, []), r = d(null), u = d(c), s = d(o), n = d(t);
  return p(() => {
    u.current = c;
  }, [c]), p(() => {
    const { current: e } = r;
    s.current = o, OverlayScrollbars.valid(e) && e.options(o || {}, true);
  }, [o]), p(() => {
    const { current: e } = r;
    n.current = t, OverlayScrollbars.valid(e) && e.on(t || {}, true);
  }, [t]), p(
    () => () => {
      var e;
      i(), (e = r.current) == null || e.destroy();
    },
    []
  ), C(
    () => [
      (e) => {
        const v = r.current;
        if (OverlayScrollbars.valid(v))
          return;
        const f = u.current, y = s.current || {}, b = n.current || {}, m = () => r.current = OverlayScrollbars(e, y, b);
        f ? a(m, f) : m();
      },
      () => r.current
    ],
    []
  );
}, q = (l, o) => {
  const { element: t = "div", options: c, events: a, defer: i, children: r, ...u } = l, s = t, n = d(null), e = d(null), [v, f] = F({ options: c, events: a, defer: i });
  return p(() => {
    const { current: y } = n, { current: b } = e;
    if (!y)
      return;
    const m = y;
    return v(
      t === "body" ? {
        target: m,
        cancel: {
          body: null
        }
      } : {
        target: m,
        elements: {
          viewport: b,
          content: b
        }
      }
    ), () => {
      var R;
      return (R = f()) == null ? void 0 : R.destroy();
    };
  }, [v, t]), O(
    o,
    () => ({
      osInstance: f,
      getElement: () => n.current
    }),
    []
  ), // @ts-ignore
  /* @__PURE__ */ w.createElement(s, { "data-overlayscrollbars-initialize": "", ref: n, ...u }, t === "body" ? r : /* @__PURE__ */ w.createElement("div", { "data-overlayscrollbars-contents": "", ref: e }, r));
}, g = E(q);

function LynxScroll({ children, className, overflow = { x: "hidden", y: "scroll" } }) {
  const isDarkMode = useAppState("darkMode");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    g,
    {
      options: {
        overflow,
        scrollbars: {
          autoHide: "leave",
          theme: isDarkMode ? "os-theme-light" : "os-theme-dark"
        }
      },
      className,
      children
    }
  );
}

const PageID = {
  home: "home_page"};
const defaultTabItem = {
  id: "tab",
  title: "Home",
  isLoading: false,
  isTerminal: false,
  pageID: PageID.home,
  favIcon: { show: false, url: "" }
};

const {useSelector} = await importShared('react-redux');
const initialState = {
  tabs: [defaultTabItem],
  activeTab: defaultTabItem.id,
  activePage: defaultTabItem.pageID,
  prevTab: ""
};
createSlice({
  name: "tabs",
  initialState,
  reducers: {
    setTabState: (state, action) => {
      state[action.payload.key] = action.payload.value;
    },
    addTab: (state, action) => {
      let newID = action.payload.id;
      let idNumber = 1;
      const checkDuplicateId = () => {
        const existTab = state.tabs.find((tab) => tab.id === newID);
        if (existTab) {
          newID = `${action.payload.id}_${idNumber}`;
          idNumber++;
          checkDuplicateId();
        }
      };
      checkDuplicateId();
      state.tabs.push({ ...action.payload, id: newID });
      state.activeTab = newID;
      state.activePage = action.payload.pageID;
    },
    removeTab: (state, action) => {
      const tabIdToRemove = action.payload;
      const tabIndexToRemove = state.tabs.findIndex((tab) => tab.id === tabIdToRemove);
      state.tabs = state.tabs.filter((tab) => tab.id !== tabIdToRemove);
      if (state.activeTab === tabIdToRemove) {
        if (state.tabs.length > 0) {
          const newActiveTabIndex = Math.min(tabIndexToRemove, state.tabs.length - 1);
          state.activeTab = state.tabs[newActiveTabIndex].id;
          state.activePage = state.tabs[newActiveTabIndex].pageID;
        } else {
          state.activeTab = defaultTabItem.id;
          state.activePage = defaultTabItem.pageID;
        }
      }
      if (state.tabs.length <= 0) {
        state.tabs = initialState.tabs;
      }
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
      if (direction === "next") {
        nextIndex = (currentIndex + 1) % state.tabs.length;
      } else {
        nextIndex = (currentIndex - 1 + state.tabs.length) % state.tabs.length;
      }
      state.prevTab = state.activeTab;
      state.activeTab = state.tabs[nextIndex].id;
      state.activePage = state.tabs[nextIndex].pageID;
    },
    setTabLoading: (state, action) => {
      const { tabID, isLoading } = action.payload;
      state.tabs = state.tabs.map((tab) => tab.id === tabID ? { ...tab, isLoading } : tab);
    },
    setActiveTabLoading: (state, action) => {
      state.tabs = state.tabs.map((tab) => tab.id === state.activeTab ? { ...tab, isLoading: action.payload } : tab);
    },
    setTabTitle: (state, action) => {
      const { tabID, title } = action.payload;
      state.tabs = state.tabs.map((tab) => tab.id === tabID ? { ...tab, title } : tab);
    },
    setTabIsTerminal: (state, action) => {
      const { tabID, isTerminal } = action.payload;
      state.tabs = state.tabs.map((tab) => tab.id === tabID ? { ...tab, isTerminal } : tab);
    },
    setActiveTabTitle: (state, action) => {
      state.tabs = state.tabs.map((tab) => tab.id === state.activeTab ? { ...tab, title: action.payload } : tab);
    },
    setTabFavIcon: (state, action) => {
      const { tabID, ...favIcon } = action.payload;
      state.tabs = state.tabs.map((tab) => tab.id === tabID ? { ...tab, favIcon } : tab);
    },
    setActivePage: (state, action) => {
      const index = state.tabs.findIndex((tab) => tab.id === state.activeTab);
      if (index !== -1) {
        const { pageID, title, isTerminal } = action.payload;
        state.tabs[index] = {
          ...state.tabs[index],
          pageID,
          title,
          isTerminal: isTerminal || false,
          favIcon: { show: false, url: "" }
        };
      }
      state.activePage = action.payload.pageID;
    }
  }
});
const useTabsState = (key) => useSelector((state) => state.tabs[key]);

function Settings_Icon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { ...props, height: "1rem", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "path",
    {
      fillRule: "evenodd",
      clipRule: "evenodd",
      fill: "currentColor",
      d: "M12.428 2c-1.114 0-2.129.6-4.157 1.802l-.686.406C5.555 5.41 4.542 6.011 3.985 7c-.557.99-.557 2.19-.557 4.594v.812c0 2.403 0 3.605.557 4.594s1.57 1.59 3.6 2.791l.686.407C10.299 21.399 11.314 22 12.428 22s2.128-.6 4.157-1.802l.686-.407c2.028-1.2 3.043-1.802 3.6-2.791c.557-.99.557-2.19.557-4.594v-.812c0-2.403 0-3.605-.557-4.594s-1.572-1.59-3.6-2.792l-.686-.406C14.555 2.601 13.542 2 12.428 2m-3.75 10a3.75 3.75 0 1 1 7.5 0a3.75 3.75 0 0 1-7.5 0"
    }
  ) });
}

const {Button: Button$1,Checkbox,Divider,Modal,ModalBody,ModalContent,ModalFooter,ModalHeader,NumberInput,Switch} = await importShared('@heroui/react');
const {useState} = await importShared('react');

const {useDispatch: useDispatch$3} = await importShared('react-redux');
const metrics = [
  {
    id: "cpuTemp",
    label: "CPU Temperature",
    description: "Monitor CPU temperature in real-time",
    Icon: Thermometer
  },
  { id: "cpuUsage", label: "CPU Usage", description: "Track CPU utilization percentage", Icon: Cpu },
  {
    id: "gpuTemp",
    label: "GPU Temperature",
    description: "Monitor GPU temperature in real-time",
    Icon: Thermometer
  },
  { id: "gpuUsage", label: "GPU Usage", description: "Track GPU utilization percentage", Icon: Layers },
  { id: "vram", label: "GPU VRAM", description: "Monitor GPU memory usage", Icon: Database },
  { id: "memory", label: "Memory Usage", description: "Monitor RAM usage and availability", Icon: Database },
  { id: "uptimeSystemSeconds", label: "System Uptime", description: "Track total system uptime", Icon: Clock },
  { id: "uptimeSeconds", label: "Application Uptime", description: "Track application runtime", Icon: Timer }
];
function SettingsModal({ show, isOpen, tabID }) {
  const dispatch = useDispatch$3();
  const appEnabled = useSystemMonitorState("enabled");
  const enabledMetrics = useSystemMonitorState("enabledMetrics");
  const compactMode = useSystemMonitorState("compactMode");
  const refreshInterval = useSystemMonitorState("refreshInterval");
  const showSectionLabel = useSystemMonitorState("showSectionLabel");
  const [isSaving, setIsSaving] = useState(false);
  const updateState = (key, value) => dispatch(
    systemMonitorActions.updateState({
      key,
      value
    })
  );
  const toggleMetric = (metric) => {
    const newEnabledMetrics = new Set(enabledMetrics);
    if (newEnabledMetrics.has(metric)) {
      newEnabledMetrics.delete(metric);
    } else {
      newEnabledMetrics.add(metric);
    }
    updateState("enabledMetrics", Array.from(newEnabledMetrics));
  };
  const onOpenChange = (value) => {
    if (!value) {
      rendererIpc.storage.getCustom(HMONITOR_STORAGE_ID).then((result) => {
        dispatch(systemMonitorActions.setConfig(result));
      });
      dispatch(systemMonitorActions.closeModal({ tabID }));
      setTimeout(() => {
        dispatch(systemMonitorActions.removeModal({ tabID }));
      }, 500);
    }
  };
  const saveSettings = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      lynxTopToast.success("Settings saved successfully!");
    }, 700);
    dispatch(systemMonitorActions.saveSettings());
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Modal,
    {
      classNames: {
        backdrop: `!top-10 ${show}`,
        wrapper: `!top-10 pb-8 ${show}`
      },
      size: "2xl",
      isOpen,
      placement: "center",
      isDismissable: false,
      scrollBehavior: "inside",
      onOpenChange,
      hideCloseButton: true,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(ModalContent, { children: (onClose) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ModalHeader, { className: "flex flex-col gap-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 justify-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Settings_Icon, { className: "size-6" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Hardware Monitor Settings" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(ModalBody, { as: LynxScroll, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 rounded-lg bg-content2 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-medium", children: "Enable System Monitoring" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-default-500", children: "When disabled, all metrics collection will be paused" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Switch,
              {
                size: "lg",
                color: "primary",
                isSelected: appEnabled,
                onValueChange: (value) => updateState("enabled", value)
              }
            )
          ] }) }),
          appEnabled && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Divider, { className: "my-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-2 text-medium font-medium", children: "Refresh Interval" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                NumberInput,
                {
                  step: 0.5,
                  maxValue: 60,
                  minValue: 0.5,
                  className: "max-w-xs",
                  value: refreshInterval,
                  label: "Seconds between updates",
                  startContent: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock_Icon, { className: "size-6" }),
                  onValueChange: (value) => updateState("refreshInterval", value),
                  description: "How frequently metrics should update (0.5-60 seconds)"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-medium font-medium", children: "Display Options" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  onClick: () => {
                    updateState("compactMode", !compactMode);
                  },
                  className: "flex items-center justify-between rounded-lg px-2 py-2 hover:bg-content2 transition-all duration-300 cursor-pointer",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "Compact Mode" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-default-500", children: "Use condensed layout to save space" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Switch,
                      {
                        onValueChange: (value) => {
                          updateState("compactMode", value);
                        },
                        size: "md",
                        isSelected: compactMode
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  onClick: () => {
                    updateState("showSectionLabel", !showSectionLabel);
                  },
                  className: "flex items-center justify-between rounded-lg px-2 py-2 hover:bg-content2 transition-all duration-300 cursor-pointer",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "Show Section Labels" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-default-500", children: "Display headers for metric groups" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Switch,
                      {
                        onValueChange: (value) => {
                          updateState("showSectionLabel", value);
                        },
                        size: "md",
                        isSelected: showSectionLabel
                      }
                    )
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Divider, { className: "my-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-3 text-medium font-medium", children: "Active Metrics" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: metrics.map((metric) => {
                const { Icon } = metric;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center justify-between rounded-lg px-2 py-2 hover:bg-content2 transition-all duration-300 cursor-pointer",
                    onClick: () => toggleMetric(metric.id),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "text-xl" })
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: metric.label }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-default-500", children: metric.description })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Checkbox,
                        {
                          color: "primary",
                          onValueChange: () => toggleMetric(metric.id),
                          isSelected: enabledMetrics.includes(metric.id)
                        }
                      )
                    ]
                  },
                  metric.id
                );
              }) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(ModalFooter, { className: "justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button$1, { color: "warning", variant: "light", onPress: onClose, className: "cursor-default", children: "Close" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button$1, { color: "success", variant: "light", isLoading: isSaving, onPress: saveSettings, children: !isSaving && "Save Settings" })
        ] })
      ] }) })
    }
  );
}

const {useEffect: useEffect$1} = await importShared('react');

const {useDispatch: useDispatch$2} = await importShared('react-redux');
function ModalManager() {
  const dispatch = useDispatch$2();
  const activeTab = useTabsState("activeTab");
  const tabs = useTabsState("tabs");
  const modals = useSystemMonitorState("modals");
  useEffect$1(() => {
    modals.forEach((card) => {
      const exist = tabs.some((tab) => tab.id === card.tabID);
      if (!exist) dispatch(systemMonitorActions.closeModal({ tabID: card.tabID }));
    });
  }, [tabs, modals, dispatch]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: modals.map((modal) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    SettingsModal,
    {
      tabID: modal.tabID,
      isOpen: modal.isOpen,
      show: activeTab === modal.tabID ? "flex" : "hidden"
    },
    `${modal.tabID}_hw_card`
  )) });
}

const {Button,Card,Image} = await importShared('@heroui/react');

const {useCallback} = await importShared('react');

const {useDispatch: useDispatch$1} = await importShared('react-redux');
const iconUrl = "https://raw.githubusercontent.com/KindaBrazy/LynxHub-Hardware-Monitor/refs/heads/source_ea/resources/icon.png";
function ToolsPage() {
  const iconSrc = useCachedImageUrl(`hwmonitor_card_icon`, iconUrl);
  const activeTab = useTabsState("activeTab");
  const dispatch = useDispatch$1();
  const openModal = useCallback(() => {
    dispatch(systemMonitorActions.openModal({ tabID: activeTab }));
  }, [activeTab]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      className: "w-[276px] h-[367px] relative group transform cursor-default border-1 border-foreground/10 transition-all duration-300 hover:-translate-y-1 shadow-small hover:shadow-medium",
      as: "div",
      isPressable: true,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-2xl bg-white dark:bg-stone-900" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-full flex flex-col justify-between p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 flex justify-center", children: iconSrc && /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { src: iconSrc, radius: "none", className: "size-20" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-bold tracking-tight", children: "Hardware Monitor" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/70 text-sm leading-relaxed", children: "A configurable LynxHub extension for real-time monitoring of CPU, GPU, and Memory usage, displayed conveniently in the status bar." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              radius: "full",
              color: "primary",
              onPress: openModal,
              startContent: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings_Icon, { className: "size-4" }),
              fullWidth: true,
              children: "Settings"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-2xl border border-white/20 pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          }
        )
      ]
    }
  ) });
}

const {Fragment,useEffect} = await importShared('react');

const {useDispatch} = await importShared('react-redux');
function UpdateConfig() {
  const dispatch = useDispatch();
  useEffect(() => {
    rendererIpc.storage.getCustom(HMONITOR_STORAGE_ID).then((result) => {
      dispatch(systemMonitorActions.setConfig(result));
    });
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Fragment, {});
}

function InitialExtensions(lynxAPI) {
  lynxAPI.statusBar.replaceContainer(HardwareStatusBar);
  lynxAPI.addReducer([{ name: "extension", reducer: extensionReducer }]);
  lynxAPI.addCustomHook(UpdateConfig);
  lynxAPI.customizePages.tools.addComponent(ToolsPage);
  lynxAPI.addModal(ModalManager);
}

export { InitialExtensions };
