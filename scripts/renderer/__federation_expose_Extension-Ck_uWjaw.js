import { importShared } from './__federation_fn_import-JrT3xvdd.js';
import { j as jsxRuntimeExports } from './jsx-runtime-BA-u0cS_.js';
import { c as commonjsGlobal, g as getDefaultExportFromCjs } from './_commonjsHelpers-BFTU3MAI.js';

/**
 * @license lucide-react v0.542.0 - ISC
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
 * @license lucide-react v0.542.0 - ISC
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
 * @license lucide-react v0.542.0 - ISC
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
 * @license lucide-react v0.542.0 - ISC
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
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const __iconNode$b = [
  [
    "path",
    {
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse"
    }
  ]
];
const Activity = createLucideIcon("activity", __iconNode$b);

/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const __iconNode$a = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$a);

/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const __iconNode$9 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$9);

/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const __iconNode$8 = [
  ["path", { d: "M12 6v6l4 2", key: "mmk7yg" }],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
];
const Clock = createLucideIcon("clock", __iconNode$8);

/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const __iconNode$7 = [
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
const Cpu = createLucideIcon("cpu", __iconNode$7);

/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const __iconNode$6 = [
  ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3", key: "msslwz" }],
  ["path", { d: "M3 5V19A9 3 0 0 0 21 19V5", key: "1wlel7" }],
  ["path", { d: "M3 12A9 3 0 0 0 21 12", key: "mv7ke4" }]
];
const Database = createLucideIcon("database", __iconNode$6);

/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const __iconNode$5 = [
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
const HardDrive = createLucideIcon("hard-drive", __iconNode$5);

/**
 * @license lucide-react v0.542.0 - ISC
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
 * @license lucide-react v0.542.0 - ISC
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
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const __iconNode$2 = [
  ["path", { d: "M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z", key: "17jzev" }]
];
const Thermometer = createLucideIcon("thermometer", __iconNode$2);

/**
 * @license lucide-react v0.542.0 - ISC
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
 * @license lucide-react v0.542.0 - ISC
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
const HMONITOR_IPC_ERROR_MONITORING = "hmonitor-error-monitoring";
const HMONITOR_IPC_ON_CONFIG = "hmonitor-on-config";
const initialSystemMetrics = {
  cpu: [],
  gpu: [],
  memory: [],
  uptime: { system: true, app: true }
};
const initAvailableHardware = {
  gpu: [],
  cpu: [],
  memory: []
};
const initMetricVisibility = {
  icon: true,
  label: true,
  value: true,
  progressBar: true
};
const initialSettings = {
  configVersion: 0.1,
  refreshInterval: 1,
  enabled: true,
  compactMode: false,
  showSectionLabel: true,
  metricVisibility: initMetricVisibility,
  enabledMetrics: initialSystemMetrics,
  availableHardware: initAvailableHardware
};

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

const {useSelector: useSelector$3} = await importShared('react-redux');
const initialState$3 = {
  ...initialSettings,
  modals: []
};
const systemMonitorSlice = createSlice({
  initialState: initialState$3,
  name: "systemMonitor",
  reducers: {
    updateState: (state, action) => {
      state[action.payload.key] = action.payload.value;
    },
    setConfig: (state, action) => {
      return { ...state, ...action.payload };
    },
    saveSettings: (state) => {
      window.electron.ipcRenderer.send(HMONITOR_IPC_UPDATE_CONFIG, JSON.stringify(omit(state, "modals")));
    },
    updateMetrics: (state, action) => {
      state.enabledMetrics = { ...state.enabledMetrics, ...action.payload };
    },
    updateMetricVisibility: (state, action) => {
      state.metricVisibility = action.payload;
    },
    updateUptime: (state, action) => {
      state.enabledMetrics.uptime = { ...state.enabledMetrics.uptime, ...action.payload };
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
const useSystemMonitorState = (propertyName) => useSelector$3((state) => state.extension[propertyName]);
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
      className: `h-full bg-linear-to-r ${getProgressColor(isTemp ? value : percentage, isTemp)} rounded-full transition-all duration-700 ease-out`,
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
  const metricVisibility = useSystemMonitorState("metricVisibility");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `flex items-center ${compactMode ? "px-2 py-0.5 gap-x-1.5" : "px-3 py-2 gap-x-2"} rounded-lg border backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg ${colorClass || "text-slate-300 border-slate-600/30 bg-slate-800/40"}`,
      children: [
        metricVisibility.icon && /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `${compactMode ? "size-3" : "size-4"} shrink-0` }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs font-medium whitespace-nowrap", children: [
          metricVisibility.label && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "opacity-80", children: [
            label,
            ":"
          ] }),
          metricVisibility.value && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            value,
            unit
          ] }),
          progress && metricVisibility.progressBar && /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressBar, { ...progress })
        ] })
      ]
    },
    `${label}`
  );
}

const {Spinner} = await importShared('@heroui/react');

const {isEmpty: isEmpty$3} = await importShared('lodash');
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
          isEmpty$3(title) ? /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, { size: "sm", variant: "dots" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-slate-300 uppercase tracking-wide text-nowrap", children: title })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-x-2", children })
  ] });
}

const {useMemo: useMemo$5} = await importShared('react');
function CpuSection({ data, metrics }) {
  const compactMode = useSystemMonitorState("compactMode");
  const { hasTemp, hasUsage } = useMemo$5(() => {
    const hasTemp2 = metrics.enabled.includes("temp");
    const hasUsage2 = metrics.enabled.includes("usage");
    return { hasTemp: hasTemp2, hasUsage: hasUsage2 };
  }, [metrics]);
  const { temp, usage, name } = useMemo$5(
    () => ({ temp: data?.temp || 0, usage: data?.usage || 0, name: data?.name || "" }),
    [data]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { icon: Cpu, title: name, children: [
    hasTemp && (temp === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `flex items-center ${compactMode ? "px-2 py-0.5 gap-x-1.5" : "px-3 py-2 gap-x-2"} rounded-lg border backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg text-slate-300 border-slate-600/30 bg-slate-800/40`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Thermometer, { className: `${compactMode ? "size-3" : "size-4"} shrink-0 text-danger` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 text-xs font-medium whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-danger", children: "Admin Require" }) })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      MetricItem,
      {
        unit: "°C",
        label: "Temp",
        value: temp,
        icon: Thermometer,
        colorClass: getTemperatureColor(temp),
        progress: { value: temp, max: 100, isTemp: true }
      }
    )),
    hasUsage && /* @__PURE__ */ jsxRuntimeExports.jsx(
      MetricItem,
      {
        unit: "%",
        label: "Usage",
        value: usage,
        icon: Activity,
        progress: { value: usage },
        colorClass: getUsageColor(usage)
      }
    )
  ] });
}

const {useMemo: useMemo$4} = await importShared('react');
function GpuSection({ data, metrics }) {
  const { hasTemp, hasUsage, hasVram } = useMemo$4(() => {
    const hasTemp2 = metrics.enabled.includes("temp");
    const hasUsage2 = metrics.enabled.includes("usage");
    const hasVram2 = metrics.enabled.includes("vram");
    return { hasTemp: hasTemp2, hasUsage: hasUsage2, hasVram: hasVram2 };
  }, [metrics]);
  const { temp, usage, name, totalVram, usedVram } = useMemo$4(
    () => ({
      temp: data?.temp || 0,
      usage: data?.usage || 0,
      name: data?.name || "",
      totalVram: data?.totalVram || 0,
      usedVram: data?.usedVram || 0
    }),
    [data]
  );
  const vramPercentage = useMemo$4(() => {
    return totalVram > 0 ? usedVram / totalVram * 100 : 0;
  }, [totalVram, usedVram]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: name, icon: Monitor, children: [
    hasTemp && /* @__PURE__ */ jsxRuntimeExports.jsx(
      MetricItem,
      {
        unit: "°C",
        label: "Temp",
        value: temp,
        icon: Thermometer,
        colorClass: getTemperatureColor(temp),
        progress: { value: temp, max: 100, isTemp: true }
      }
    ),
    hasVram && /* @__PURE__ */ jsxRuntimeExports.jsx(
      MetricItem,
      {
        label: "VRAM",
        icon: Database,
        progress: { value: vramPercentage },
        colorClass: getUsageColor(vramPercentage),
        value: `${usedVram.toFixed(1)}/${Math.round(totalVram)}GB`
      }
    ),
    hasUsage && /* @__PURE__ */ jsxRuntimeExports.jsx(
      MetricItem,
      {
        unit: "%",
        icon: Zap,
        label: "Usage",
        value: usage,
        progress: { value: usage },
        colorClass: getUsageColor(usage)
      }
    )
  ] });
}

const {useMemo: useMemo$3} = await importShared('react');
function MemorySection({ data }) {
  const { name, used, total } = useMemo$3(
    () => ({
      total: data?.total || 0,
      used: data?.used || 0,
      name: data?.name || ""
    }),
    [data]
  );
  const memPercentage = useMemo$3(() => {
    return total > 0 ? used / total * 100 : 0;
  }, [total, used]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: name, icon: MemoryStick, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    MetricItem,
    {
      label: "RAM",
      icon: HardDrive,
      progress: { value: memPercentage },
      value: `${used.toFixed(1)}/${total}GB`,
      colorClass: getUsageColor(memPercentage)
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
function UpTimeSection({ data, metrics }) {
  const { hasApp, hasSystem } = useMemo$2(() => ({ hasApp: metrics.app, hasSystem: metrics.system }), [metrics]);
  const { app, system } = useMemo$2(
    () => ({
      app: data?.app || 0,
      system: data?.system || 0
    }),
    [data]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { icon: Clock, title: "Uptime", children: [
    hasSystem && /* @__PURE__ */ jsxRuntimeExports.jsx(MetricItem, { icon: Clock, label: "System", value: formatUptime(system) }),
    hasApp && /* @__PURE__ */ jsxRuntimeExports.jsx(MetricItem, { label: "App", icon: Activity, value: formatUptime(app) })
  ] });
}

const {Link} = await importShared('@heroui/react');

const {Divider: Divider$1} = await importShared('antd');
const {useEffect: useEffect$5,useMemo: useMemo$1,useState: useState$4} = await importShared('react');
const convertMBtoGB = (mb) => {
  return Number((mb / 1024).toFixed(2));
};
const initialData = {
  gpu: [],
  cpu: [],
  memory: [],
  uptime: {
    system: 0,
    app: 0
  }
};
const HardwareStatusBar = ({ ref }) => {
  const enabled = useSystemMonitorState("enabled");
  const compactMode = useSystemMonitorState("compactMode");
  const enabledMetrics = useSystemMonitorState("enabledMetrics");
  const [hardwareData, setHardwareData] = useState$4(initialData);
  const [containerRef, setContainerRef] = useState$4(null);
  const initRef = (node) => {
    if (node) {
      ref(node);
      setContainerRef(node);
    }
  };
  const [canScrollLeft, setCanScrollLeft] = useState$4(false);
  const [canScrollRight, setCanScrollRight] = useState$4(false);
  const [dataConnected, setDataConnected] = useState$4(false);
  const [errorElement, setErrorElement] = useState$4(
    /* @__PURE__ */ jsxRuntimeExports.jsx(ShinyText, { speed: 2, className: "font-semibold", text: "Waiting for hardware information..." })
  );
  const updateScrollArrows = () => {
    if (!containerRef) return;
    const { scrollLeft, scrollWidth, clientWidth } = containerRef;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  };
  const scroll = (direction) => {
    if (containerRef) {
      containerRef.scrollBy({
        left: direction === "left" ? -250 : 250,
        behavior: "smooth"
      });
    }
  };
  useEffect$5(() => {
    const handleHardwareUpdate = (_event, data) => {
      if (data) {
        const cpu = data.CPU.map((item) => {
          return {
            name: item.Name,
            temp: item.Sensors.find((sensor) => sensor.Name === "CPU Package" && sensor.Type === "Temperature")?.Value || 0,
            usage: Math.round(
              item.Sensors.find((sensor) => sensor.Name === "CPU Total" && sensor.Type === "Load")?.Value || 0
            )
          };
        });
        const gpu = data.GPU.map((item) => {
          return {
            name: item.Name,
            temp: item.Sensors.find((sensor) => sensor.Name === "GPU Core" && sensor.Type === "Temperature")?.Value || 0,
            usage: Math.round(
              item.Sensors.find((sensor) => sensor.Name === "D3D 3D" && sensor.Type === "Load")?.Value || 0
            ),
            totalVram: convertMBtoGB(
              item.Sensors.find((sensor) => sensor.Name === "GPU Memory Total" && sensor.Type === "SmallData")?.Value || 0
            ),
            usedVram: convertMBtoGB(
              item.Sensors.find((sensor) => sensor.Name === "GPU Memory Used" && sensor.Type === "SmallData")?.Value || 0
            )
          };
        });
        const memory = data.Memory.map((item) => {
          const used = Math.round(
            item.Sensors.find((sensor) => sensor.Name === "Memory Used" && sensor.Type === "Data")?.Value || 0
          );
          const available = Math.round(
            item.Sensors.find((sensor) => sensor.Name === "Memory Available" && sensor.Type === "Data")?.Value || 0
          );
          return {
            name: item.Name,
            used,
            available,
            total: Math.round(used + available)
          };
        });
        const uptimeSeconds = data.ElapsedTime?.rawSeconds || 0;
        const uptimeSystemSeconds = data.Uptime?.rawSeconds || 0;
        const uptime = { system: uptimeSystemSeconds, app: uptimeSeconds };
        const result = {
          gpu,
          cpu,
          memory,
          uptime
        };
        setHardwareData(result);
        setDataConnected(true);
      }
    };
    window.electron.ipcRenderer.on(HMONITOR_IPC_DATA_ID, handleHardwareUpdate);
    window.electron.ipcRenderer.on(HMONITOR_IPC_ERROR_MONITORING, (_, error) => {
      if (error.message.includes("dotnet")) {
        setErrorElement(
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: ".NET 8 runtime not found. Please install it " }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                className: "cursor-pointer",
                onPress: () => window.open("https://dotnet.microsoft.com/download/dotnet/8.0"),
                children: "Here"
              }
            )
          ] })
        );
      }
    });
    return () => {
      window.electron.ipcRenderer.removeAllListeners(HMONITOR_IPC_DATA_ID);
      window.electron.ipcRenderer.removeAllListeners(HMONITOR_IPC_ERROR_MONITORING);
    };
  }, []);
  useEffect$5(() => {
    updateScrollArrows();
    const handleResize = () => updateScrollArrows();
    window.removeEventListener("resize", handleResize);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [hardwareData]);
  const { hasCpuSection, hasMemory, hasUptime, hasGpuSection } = useMemo$1(() => {
    if (!enabledMetrics) {
      setErrorElement(
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-warning", children: "Couldn't load metrics settings. Please restart LynxHub." })
      );
      return { hasCpuSection: false, hasGpuSection: false, hasMemory: false, hasUptime: false };
    }
    const hasGpuSection2 = enabledMetrics.gpu.some(
      (item) => item.active && (item.enabled.includes("temp") || item.enabled.includes("usage") || item.enabled.includes("vram"))
    );
    const hasCpuSection2 = enabledMetrics.cpu.some(
      (item) => item.active && (item.enabled.includes("temp") || item.enabled.includes("usage"))
    );
    const hasMemory2 = enabledMetrics.memory.some((item) => item.active && item.enabled.includes("memory"));
    const hasUptime2 = enabledMetrics.uptime.system || enabledMetrics.uptime.app;
    return { hasCpuSection: hasCpuSection2, hasGpuSection: hasGpuSection2, hasMemory: hasMemory2, hasUptime: hasUptime2 };
  }, [enabledMetrics]);
  useEffect$5(() => {
    if (containerRef) {
      const handleWheel = (event) => {
        if (!event.ctrlKey) {
          event.preventDefault();
          containerRef.scrollLeft += event.deltaY;
        }
      };
      containerRef.addEventListener("wheel", handleWheel);
      return () => {
        containerRef.removeEventListener("wheel", handleWheel);
      };
    }
    return () => {
    };
  }, [containerRef]);
  if (!enabled) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `relative ${compactMode ? "h-7" : "h-12"} w-full bg-linear-to-r from-slate-900/95 to-slate-800/95 border-t border-slate-700/50 backdrop-blur-sm`,
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
            ref: initRef,
            onScroll: updateScrollArrows,
            style: { scrollbarWidth: "none", msOverflowStyle: "none" },
            className: `h-full flex items-center ${compactMode ? "px-2" : "px-3"} gap-x-4 overflow-x-auto scrollbar-hide`,
            children: dataConnected ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              hasCpuSection && enabledMetrics.cpu.map((cpu, index) => {
                if (!cpu.active) return null;
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                  CpuSection,
                  {
                    metrics: cpu,
                    data: hardwareData.cpu.find((item) => item.name === cpu.name)
                  },
                  `hardware_${cpu.name}_${index}`
                );
              }),
              (hasGpuSection || hasMemory || hasUptime) && hasCpuSection && /* @__PURE__ */ jsxRuntimeExports.jsx(Divider$1, { type: "vertical", className: "mx-0" }),
              hasGpuSection && enabledMetrics.gpu.map((gpu, index) => {
                if (!gpu.active) return null;
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                  GpuSection,
                  {
                    metrics: gpu,
                    data: hardwareData.gpu.find((item) => item.name === gpu.name)
                  },
                  `hardware_${gpu.name}_${index}`
                );
              }),
              (hasGpuSection || hasUptime) && hasMemory && /* @__PURE__ */ jsxRuntimeExports.jsx(Divider$1, { type: "vertical", className: "mx-0" }),
              hasMemory && enabledMetrics.memory.map((memory, index) => {
                if (!memory.active) return null;
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                  MemorySection,
                  {
                    data: hardwareData.memory.find((item) => item.name === memory.name)
                  },
                  `hardware_${memory.name}_${index}`
                );
              }),
              (hasGpuSection || hasMemory) && hasUptime && /* @__PURE__ */ jsxRuntimeExports.jsx(Divider$1, { type: "vertical", className: "mx-0" }),
              hasUptime && /* @__PURE__ */ jsxRuntimeExports.jsx(UpTimeSection, { data: hardwareData.uptime, metrics: enabledMetrics.uptime })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full text-center", children: errorElement })
          }
        )
      ]
    }
  );
};

function AudioGeneration_Icon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { ...props, height: "1em", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        fill: "currentColor",
        d: "M2 12.124C2 6.533 6.477 2 12 2s10 4.533 10 10.124v5.243c0 .817 0 1.378-.143 1.87a3.52 3.52 0 0 1-1.847 2.188c-.458.22-1.004.307-1.801.434l-.13.02a13 13 0 0 1-.727.105c-.209.02-.422.027-.64-.016a2.1 2.1 0 0 1-1.561-1.35a2.2 2.2 0 0 1-.116-.639c-.012-.204-.012-.452-.012-.742v-4.173c0-.425 0-.791.097-1.105a2.1 2.1 0 0 1 1.528-1.43c.316-.073.677-.044 1.096-.01l.093.007l.11.01c.783.062 1.32.104 1.775.275q.481.181.883.487v-1.174c0-4.811-3.853-8.711-8.605-8.711s-8.605 3.9-8.605 8.711v1.174c.267-.203.563-.368.883-.487c.455-.17.992-.213 1.775-.276l.11-.009l.093-.007c.42-.034.78-.063 1.096.01a2.1 2.1 0 0 1 1.528 1.43c.098.314.097.68.097 1.105v4.172c0 .291 0 .54-.012.743c-.012.213-.04.427-.116.638a2.1 2.1 0 0 1-1.56 1.35a2.2 2.2 0 0 1-.641.017c-.201-.02-.444-.059-.727-.104l-.13-.02c-.797-.128-1.344-.215-1.801-.436a3.52 3.52 0 0 1-1.847-2.188c-.118-.405-.139-.857-.142-1.461L2 17.58z"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        fill: "currentColor",
        d: "M12 5.75a.75.75 0 0 1 .75.75v5a.75.75 0 1 1-1.5 0v-5a.75.75 0 0 1 .75-.75m3 1.5a.75.75 0 0 1 .75.75v2a.75.75 0 1 1-1.5 0V8a.75.75 0 0 1 .75-.75m-6 0a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-1.5 0V8A.75.75 0 0 1 9 7.25"
      }
    )
  ] });
}
function Circle_Icon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { ...props, height: "1em", viewBox: "0 0 256 256", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "path",
    {
      fill: "currentColor",
      d: "M128 20a108 108 0 1 0 108 108A108.12 108.12 0 0 0 128 20m0 192a84 84 0 1 1 84-84a84.09 84.09 0 0 1-84 84"
    }
  ) });
}
function Copy_Icon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { ...props, height: "1em", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        fill: "currentColor",
        d: "M15.24 2h-3.894c-1.764 0-3.162 0-4.255.148c-1.126.152-2.037.472-2.755 1.193c-.719.721-1.038 1.636-1.189 2.766C3 7.205 3 8.608 3 10.379v5.838c0 1.508.92 2.8 2.227 3.342c-.067-.91-.067-2.185-.067-3.247v-5.01c0-1.281 0-2.386.118-3.27c.127-.948.413-1.856 1.147-2.593c.734-.737 1.639-1.024 2.583-1.152c.88-.118 1.98-.118 3.257-.118h3.07c1.276 0 2.374 0 3.255.118A3.601 3.601 0 0 0 15.24 2"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        fill: "currentColor",
        d: "M6.6 11.397c0-2.726 0-4.089.844-4.936c.843-.847 2.2-.847 4.916-.847h2.88c2.715 0 4.073 0 4.917.847c.843.847.843 2.21.843 4.936v4.82c0 2.726 0 4.089-.843 4.936c-.844.847-2.202.847-4.917.847h-2.88c-2.715 0-4.073 0-4.916-.847c-.844-.847-.844-2.21-.844-4.936z"
      }
    )
  ] });
}
function Download_Icon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { ...props, height: "1em", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        fill: "currentColor",
        d: "M12.554 16.506a.75.75 0 0 1-1.107 0l-4-4.375a.75.75 0 0 1 1.107-1.012l2.696 2.95V3a.75.75 0 0 1 1.5 0v11.068l2.697-2.95a.75.75 0 1 1 1.107 1.013z"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        fill: "currentColor",
        d: "M3.75 15a.75.75 0 0 0-1.5 0v.055c0 1.367 0 2.47.117 3.337c.12.9.38 1.658.981 2.26c.602.602 1.36.86 2.26.982c.867.116 1.97.116 3.337.116h6.11c1.367 0 2.47 0 3.337-.116c.9-.122 1.658-.38 2.26-.982c.602-.602.86-1.36.982-2.26c.116-.867.116-1.97.116-3.337V15a.75.75 0 0 0-1.5 0c0 1.435-.002 2.436-.103 3.192c-.099.734-.28 1.122-.556 1.399c-.277.277-.665.457-1.4.556c-.755.101-1.756.103-3.191.103H9c-1.435 0-2.437-.002-3.192-.103c-.734-.099-1.122-.28-1.399-.556c-.277-.277-.457-.665-.556-1.4c-.101-.755-.103-1.756-.103-3.191"
      }
    )
  ] });
}
function Download2_Icon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { ...props, height: "1em", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        fill: "currentColor",
        d: "M12 1.25a.75.75 0 0 0-.75.75v10.973l-1.68-1.961a.75.75 0 1 0-1.14.976l3 3.5a.75.75 0 0 0 1.14 0l3-3.5a.75.75 0 1 0-1.14-.976l-1.68 1.96V2a.75.75 0 0 0-.75-.75"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        fill: "currentColor",
        d: "M14.25 9v.378a2.249 2.249 0 0 1 2.458 3.586l-3 3.5a2.25 2.25 0 0 1-3.416 0l-3-3.5A2.25 2.25 0 0 1 9.75 9.378V9H8c-2.828 0-4.243 0-5.121.879C2 10.757 2 12.172 2 15v1c0 2.828 0 4.243.879 5.121C3.757 22 5.172 22 8 22h8c2.828 0 4.243 0 5.121-.879C22 20.243 22 18.828 22 16v-1c0-2.828 0-4.243-.879-5.121C20.243 9 18.828 9 16 9z"
      }
    )
  ] });
}
function Extensions_Icon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { ...props, height: "1em", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        fill: "currentColor",
        d: "M17.5 2.75a.75.75 0 0 1 .75.75v2.25h2.25a.75.75 0 0 1 0 1.5h-2.25V9.5a.75.75 0 0 1-1.5 0V7.25H14.5a.75.75 0 0 1 0-1.5h2.25V3.5a.75.75 0 0 1 .75-.75"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        fill: "currentColor",
        d: "M2 6.5c0-2.121 0-3.182.659-3.841C3.318 2 4.379 2 6.5 2c2.121 0 3.182 0 3.841.659C11 3.318 11 4.379 11 6.5c0 2.121 0 3.182-.659 3.841C9.682 11 8.621 11 6.5 11c-2.121 0-3.182 0-3.841-.659C2 9.682 2 8.621 2 6.5m11 11c0-2.121 0-3.182.659-3.841C14.318 13 15.379 13 17.5 13c2.121 0 3.182 0 3.841.659c.659.659.659 1.72.659 3.841c0 2.121 0 3.182-.659 3.841c-.659.659-1.72.659-3.841.659c-2.121 0-3.182 0-3.841-.659C13 20.682 13 19.621 13 17.5"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        opacity: ".4",
        fill: "currentColor",
        d: "M2 17.5c0-2.121 0-3.182.659-3.841C3.318 13 4.379 13 6.5 13c2.121 0 3.182 0 3.841.659c.659.659.659 1.72.659 3.841c0 2.121 0 3.182-.659 3.841C9.682 22 8.621 22 6.5 22c-2.121 0-3.182 0-3.841-.659C2 20.682 2 19.621 2 17.5"
      }
    )
  ] });
}
function Extensions2_Icon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { ...props, height: "1em", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "path",
    {
      fill: "currentColor",
      d: "M19 10V7c0-1.103-.897-2-2-2h-3c0-1.654-1.346-3-3-3S8 3.346 8 5H5c-1.103 0-2 .897-2 2v4h1a2 2 0 0 1 0 4H3v4c0 1.103.897 2 2 2h4v-1a2 2 0 0 1 4 0v1h4c1.103 0 2-.897 2-2v-3c1.654 0 3-1.346 3-3s-1.346-3-3-3"
    }
  ) });
}
function ExternalLink_Icon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { ...props, height: "1em", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { fill: "none", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        fill: "currentColor",
        d: "M11 6a1 1 0 1 1 0 2H5v11h11v-6a1 1 0 1 1 2 0v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zm9-3a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0V6.414l-8.293 8.293a1 1 0 0 1-1.414-1.414L17.586 5H15a1 1 0 1 1 0-2Z"
      }
    )
  ] }) });
}
function Fork_Icon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { ...props, height: "1em", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "path",
    {
      fill: "currentColor",
      d: "M5.559 8.855c.166 1.183.789 3.207 3.087 4.079C11 13.829 11 14.534 11 15v.163c-1.44.434-2.5 1.757-2.5 3.337c0 1.93 1.57 3.5 3.5 3.5s3.5-1.57 3.5-3.5c0-1.58-1.06-2.903-2.5-3.337V15c0-.466 0-1.171 2.354-2.065c2.298-.872 2.921-2.896 3.087-4.079C19.912 8.441 21 7.102 21 5.5C21 3.57 19.43 2 17.5 2S14 3.57 14 5.5c0 1.552 1.022 2.855 2.424 3.313c-.146.735-.565 1.791-1.778 2.252c-1.192.452-2.053.953-2.646 1.536c-.593-.583-1.453-1.084-2.646-1.536c-1.213-.461-1.633-1.517-1.778-2.252C8.978 8.355 10 7.052 10 5.5C10 3.57 8.43 2 6.5 2S3 3.57 3 5.5c0 1.602 1.088 2.941 2.559 3.355M17.5 4c.827 0 1.5.673 1.5 1.5S18.327 7 17.5 7S16 6.327 16 5.5S16.673 4 17.5 4m-4 14.5c0 .827-.673 1.5-1.5 1.5s-1.5-.673-1.5-1.5s.673-1.5 1.5-1.5s1.5.673 1.5 1.5M6.5 4C7.327 4 8 4.673 8 5.5S7.327 7 6.5 7S5 6.327 5 5.5S5.673 4 6.5 4"
    }
  ) });
}
function GitHub_Icon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { ...props, height: "1em", viewBox: "0 0 16 16", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "path",
    {
      fill: "currentColor",
      d: "M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59c.4.07.55-.17.55-.38c0-.19-.01-.82-.01-1.49c-2.01.37-2.53-.49-2.69-.94c-.09-.23-.48-.94-.82-1.13c-.28-.15-.68-.52-.01-.53c.63-.01 1.08.58 1.23.82c.72 1.21 1.87.87 2.33.66c.07-.52.28-.87.51-1.07c-1.78-.2-3.64-.89-3.64-3.95c0-.87.31-1.59.8-2.15c-.08-.2-.36-1.02.08-2.12c0 0 .67-.21 2.2.82c.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82c.44 1.1.16 1.92.08 2.12c.51.56.82 1.27.82 2.15c0 3.07-1.87 3.75-3.65 3.95c.29.25.54.73.54 1.48c0 1.07-.01 1.93-.01 2.2c0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"
    }
  ) });
}
function HomeSmile_Icon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { ...props, height: "1em", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { fill: "none", height: "1em" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        fill: "currentColor",
        d: "M13.106 22h-2.212c-3.447 0-5.17 0-6.345-1.012s-1.419-2.705-1.906-6.093l-.279-1.937c-.38-2.637-.57-3.956-.029-5.083s1.691-1.813 3.992-3.183l1.385-.825C9.8 2.622 10.846 2 12 2s2.199.622 4.288 1.867l1.385.825c2.3 1.37 3.451 2.056 3.992 3.183s.35 2.446-.03 5.083l-.278 1.937c-.487 3.388-.731 5.081-1.906 6.093S16.553 22 13.106 22m-4.708-6.447a.75.75 0 0 1 1.049-.156c.728.54 1.607.853 2.553.853s1.825-.313 2.553-.853a.75.75 0 1 1 .894 1.205A5.77 5.77 0 0 1 12 17.75a5.77 5.77 0 0 1-3.447-1.148a.75.75 0 0 1-.155-1.049"
      }
    )
  ] });
}
function ImageGeneration_Icon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { ...props, height: "1em", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "currentColor", d: "M18 8a2 2 0 1 1-4 0a2 2 0 0 1 4 0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        fill: "currentColor",
        d: "M12.057 1.25h-.114c-2.309 0-4.118 0-5.53.19c-1.444.194-2.584.6-3.479 1.494c-.895.895-1.3 2.035-1.494 3.48c-.19 1.411-.19 3.22-.19 5.529v.114c0 2.309 0 4.118.19 5.53c.194 1.444.6 2.584 1.494 3.479c.895.895 2.035 1.3 3.48 1.494c1.411.19 3.22.19 5.529.19h.114c2.309 0 4.118 0 5.53-.19c1.444-.194 2.584-.6 3.479-1.494c.895-.895 1.3-2.035 1.494-3.48c.19-1.411.19-3.22.19-5.529v-.114c0-2.309 0-4.118-.19-5.53c-.194-1.444-.6-2.584-1.494-3.479c-.895-.895-2.035-1.3-3.48-1.494c-1.411-.19-3.22-.19-5.529-.19M3.995 3.995c.57-.57 1.34-.897 2.619-1.069c1.3-.174 3.008-.176 5.386-.176s4.086.002 5.386.176c1.279.172 2.05.5 2.62 1.069c.569.57.896 1.34 1.068 2.619c.174 1.3.176 3.008.176 5.386l-.001 1.28l-.222-.03c-2.844-.394-5.446 1.084-6.772 3.313c-1.71-4.325-6.227-7.275-11.274-6.55l-.226.032c.011-1.405.049-2.519.171-3.431c.172-1.279.5-2.05 1.069-2.62"
      }
    )
  ] });
}
function Info_Icon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { ...props, height: "1em", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "path",
    {
      fillRule: "evenodd",
      clipRule: "evenodd",
      fill: "currentColor",
      d: "M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10m-10 5.75a.75.75 0 0 0 .75-.75v-6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75M12 7a1 1 0 1 1 0 2a1 1 0 0 1 0-2"
    }
  ) });
}
function ListCheck_Icon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { ...props, height: "1em", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "path",
    {
      fillRule: "evenodd",
      clipRule: "evenodd",
      fill: "currentColor",
      d: "M3.464 3.464C2 4.93 2 7.286 2 12c0 4.714 0 7.071 1.464 8.535C4.93 22 7.286 22 12 22c4.714 0 7.071 0 8.535-1.465C22 19.072 22 16.714 22 12s0-7.071-1.465-8.536C19.072 2 16.714 2 12 2S4.929 2 3.464 3.464m7.08 4.053a.75.75 0 1 0-1.087-1.034l-2.314 2.43l-.6-.63a.75.75 0 1 0-1.086 1.034l1.143 1.2a.75.75 0 0 0 1.086 0zM13 8.25a.75.75 0 0 0 0 1.5h5a.75.75 0 0 0 0-1.5zm-2.457 6.267a.75.75 0 1 0-1.086-1.034l-2.314 2.43l-.6-.63a.75.75 0 1 0-1.086 1.034l1.143 1.2a.75.75 0 0 0 1.086 0zM13 15.25a.75.75 0 0 0 0 1.5h5a.75.75 0 0 0 0-1.5z"
    }
  ) });
}
function MenuDots_Icon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { ...props, height: "1em", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "path",
    {
      fill: "currentColor",
      d: "M7 12a2 2 0 1 1-4 0a2 2 0 0 1 4 0m7 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0m7 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0"
    }
  ) });
}
function Pin_Icon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { ...props, height: "1em", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "path",
    {
      fill: "currentColor",
      d: "m19.184 7.805l-2.965-2.967c-2.027-2.03-3.04-3.043-4.129-2.803c-1.088.24-1.581 1.587-2.568 4.28l-.668 1.823c-.263.718-.395 1.077-.632 1.355a2.035 2.035 0 0 1-.36.332c-.296.213-.664.314-1.4.517c-1.66.458-2.491.687-2.804 1.23a1.528 1.528 0 0 0-.204.773c.004.627.613 1.236 1.83 2.455L6.7 16.216l-4.476 4.48a.764.764 0 0 0 1.08 1.08l4.475-4.48l1.466 1.468c1.226 1.226 1.839 1.84 2.47 1.84c.265 0 .526-.068.757-.2c.548-.313.778-1.149 1.239-2.822c.202-.735.303-1.102.515-1.399c.093-.129.201-.247.322-.352c.275-.238.632-.372 1.345-.64l1.844-.693c2.664-1 3.996-1.501 4.23-2.586c.235-1.086-.77-2.093-2.783-4.107"
    }
  ) });
}
function Play_Icon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { ...props, height: "1em", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "path",
    {
      fill: "currentColor",
      d: "M21.409 9.353a2.998 2.998 0 0 1 0 5.294L8.597 21.614C6.534 22.737 4 21.277 4 18.968V5.033c0-2.31 2.534-3.769 4.597-2.648z"
    }
  ) });
}
function Refresh_Icon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { ...props, height: "1em", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { fill: "none", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M24 0v24H0V0zM12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036c-.01-.003-.019 0-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        fill: "currentColor",
        d: "M4 9.5A1.5 1.5 0 0 1 5.5 11a5.5 5.5 0 0 0 5.279 5.496L11 16.5h2.382a1.5 1.5 0 0 1 2.065-2.164l.114.103l2.5 2.5a1.494 1.494 0 0 1 .43.89l.009.157v.028a1.49 1.49 0 0 1-.348.947l-.097.105l-2.494 2.495a1.5 1.5 0 0 1-2.272-1.947l.093-.114H11A8.5 8.5 0 0 1 2.5 11A1.5 1.5 0 0 1 4 9.5m4.44-7.06a1.5 1.5 0 0 1 2.27 1.946l-.092.114H13a8.5 8.5 0 0 1 8.5 8.5a1.5 1.5 0 1 1-3 0a5.5 5.5 0 0 0-5.279-5.496L13 7.5h-2.382a1.5 1.5 0 0 1-2.065 2.164L8.44 9.56l-2.5-2.5a1.5 1.5 0 0 1-.103-2.008l.103-.114l2.5-2.5Z"
      }
    )
  ] }) });
}
function CallChat_Icon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { ...props, height: "1em", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        opacity: "0.5",
        fill: "currentColor",
        d: "m14.556 15.548l-.455.48s-1.083 1.139-4.038-1.972c-2.955-3.111-1.872-4.25-1.872-4.25l.287-.303c.706-.744.773-1.938.156-2.81L7.374 4.91C6.61 3.83 5.135 3.688 4.26 4.609L2.691 6.26c-.433.457-.723 1.048-.688 1.705c.09 1.68.808 5.293 4.812 9.51c4.247 4.47 8.232 4.648 9.861 4.487c.516-.05.964-.329 1.325-.709l1.42-1.496c.96-1.01.69-2.74-.538-3.446l-1.91-1.1c-.806-.463-1.787-.327-2.417.336"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        fill: "currentColor",
        d: "M17 12a5 5 0 1 0-4.478-2.774a.817.817 0 0 1 .067.574l-.298 1.113a.65.65 0 0 0 .796.796l1.113-.298a.817.817 0 0 1 .574.067A4.98 4.98 0 0 0 17 12"
      }
    )
  ] });
}
function Database_Icon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { ...props, height: "1em", viewBox: "0 0 20 20", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "path",
    {
      fill: "currentColor",
      d: "M18 4c0 1.657-2.686 3-6 3S6 5.657 6 4s2.686-3 6-3s6 1.343 6 3m0 2.12c-.383.362-.84.661-1.31.896C15.438 7.642 13.778 8 12 8c-.623 0-1.23-.044-1.811-.128c.935.528 1.724 1.341 1.804 2.442l.01-.008L12 12.553V16.5q0 .26-.051.5H12c3.314 0 6-1.343 6-3zm-10.69.896l.05.025A9 9 0 0 0 6 7.014V6.12c.383.362.84.661 1.31.896M9 8.42a6.5 6.5 0 0 0-1.12-.301A8 8 0 0 0 6.5 8C4.015 8 2 9.12 2 10.5S4.015 13 6.5 13s4.5-1.12 4.5-2.5c0-.867-.794-1.63-2-2.08m1.168 4.72c-.99.55-2.288.859-3.668.859s-2.679-.309-3.668-.858A4.6 4.6 0 0 1 2 12.554v3.945C2 17.88 4.015 19 6.5 19s4.5-1.12 4.5-2.5l.001-3.946a4.5 4.5 0 0 1-.833.589"
    }
  ) });
}
function Discord_Icon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { ...props, height: "1em", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "path",
    {
      fill: "currentColor",
      d: "M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02M8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12m6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12"
    }
  ) });
}
function Heart_Icon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { ...props, height: "1em", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        opacity: "0.5",
        fillRule: "evenodd",
        clipRule: "evenodd",
        fill: "currentColor",
        d: "M8.106 18.247C5.298 16.083 2 13.542 2 9.137C2 4.274 7.5.825 12 5.501V20.5c-1 0-2-.77-3.038-1.59c-.277-.218-.564-.438-.856-.663"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        fill: "currentColor",
        d: "M15.038 18.91C17.981 16.592 22 14 22 9.138c0-4.863-5.5-8.312-10-3.636V20.5c1 0 2-.77 3.038-1.59"
      }
    )
  ] });
}
function Scales_Icon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { ...props, height: "1em", viewBox: "0 0 20 20", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "path",
    {
      fill: "currentColor",
      d: "M3.5 3a.5.5 0 1 0 0 1h.75L2.077 9.215a1 1 0 0 0-.075.405a3 3 0 0 0 5.996 0a1 1 0 0 0-.075-.405L5.75 4H9.5v11h-4a1.5 1.5 0 0 0 0 3h9a1.5 1.5 0 0 0 0-3h-4V4h3.75l-2.173 5.215a1 1 0 0 0-.075.405a3 3 0 0 0 5.996 0a1 1 0 0 0-.075-.405L15.75 4h.75a.5.5 0 0 0 0-1zM5 4.8L6.75 9h-3.5zM16.75 9h-3.5L15 4.8z"
    }
  ) });
}
function SettingsMinimal_Icon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { ...props, height: "1em", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "path",
    {
      fillRule: "evenodd",
      clipRule: "evenodd",
      fill: "currentColor",
      d: "M12.428 2c-1.114 0-2.129.6-4.157 1.802l-.686.406C5.555 5.41 4.542 6.011 3.985 7c-.557.99-.557 2.19-.557 4.594v.812c0 2.403 0 3.605.557 4.594c.557.99 1.57 1.59 3.6 2.791l.686.407C10.299 21.399 11.314 22 12.428 22c1.114 0 2.128-.6 4.157-1.802l.686-.407c2.028-1.2 3.043-1.802 3.6-2.791c.557-.99.557-2.19.557-4.594v-.812c0-2.403 0-3.605-.557-4.594c-.557-.99-1.572-1.59-3.6-2.792l-.686-.406C14.555 2.601 13.542 2 12.428 2m-3.75 10a3.75 3.75 0 1 1 7.5 0a3.75 3.75 0 0 1-7.5 0"
    }
  ) });
}
function Star_Icon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { ...props, height: "1em", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "path",
    {
      fill: "currentColor",
      d: "M9.153 5.408C10.42 3.136 11.053 2 12 2c.947 0 1.58 1.136 2.847 3.408l.328.588c.36.646.54.969.82 1.182c.28.213.63.292 1.33.45l.636.144c2.46.557 3.689.835 3.982 1.776c.292.94-.546 1.921-2.223 3.882l-.434.507c-.476.557-.715.836-.822 1.18c-.107.345-.071.717.001 1.46l.066.677c.253 2.617.38 3.925-.386 4.506c-.766.582-1.918.051-4.22-1.009l-.597-.274c-.654-.302-.981-.452-1.328-.452c-.347 0-.674.15-1.328.452l-.596.274c-2.303 1.06-3.455 1.59-4.22 1.01c-.767-.582-.64-1.89-.387-4.507l.066-.676c.072-.744.108-1.116 0-1.46c-.106-.345-.345-.624-.821-1.18l-.434-.508c-1.677-1.96-2.515-2.941-2.223-3.882c.293-.941 1.523-1.22 3.983-1.776l.636-.144c.699-.158 1.048-.237 1.329-.45c.28-.213.46-.536.82-1.182z"
    }
  ) });
}
function Terminal_Icon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { ...props, height: "1em", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { fill: "none", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        fill: "currentColor",
        d: "M20 16.5a1.5 1.5 0 0 1 .145 2.993L20 19.5h-8a1.5 1.5 0 0 1-.144-2.993L12 16.5zM3.283 5.283A1.5 1.5 0 0 1 5.29 5.18l.114.103l5.657 5.657a1.5 1.5 0 0 1 .103 2.007l-.103.114l-5.657 5.657A1.5 1.5 0 0 1 3.18 16.71l.103-.114L7.879 12L3.283 7.404a1.5 1.5 0 0 1 0-2.121"
      }
    )
  ] }) });
}
function TextGeneration_Icon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { ...props, height: "1em", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { fill: "none", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        fill: "currentColor",
        d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10H4a2 2 0 0 1-2-2v-8C2 6.477 6.477 2 12 2m0 12H9a1 1 0 1 0 0 2h3a1 1 0 1 0 0-2m3-4H9a1 1 0 0 0-.117 1.993L9 12h6a1 1 0 0 0 .117-1.993z"
      }
    )
  ] }) });
}
function Trash_Icon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { ...props, height: "1em", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "path",
    {
      fill: "currentColor",
      d: "M2.75 6.167c0-.46.345-.834.771-.834h2.665c.529-.015.996-.378 1.176-.916l.03-.095l.115-.372c.07-.228.131-.427.217-.605c.338-.702.964-1.189 1.687-1.314c.184-.031.377-.031.6-.031h3.478c.223 0 .417 0 .6.031c.723.125 1.35.612 1.687 1.314c.086.178.147.377.217.605l.115.372l.03.095c.18.538.74.902 1.27.916h2.57c.427 0 .772.373.772.834c0 .46-.345.833-.771.833H3.52c-.426 0-.771-.373-.771-.833M11.607 22h.787c2.707 0 4.06 0 4.941-.863c.88-.864.97-2.28 1.15-5.111l.26-4.081c.098-1.537.147-2.305-.295-2.792c-.442-.487-1.187-.487-2.679-.487H8.23c-1.491 0-2.237 0-2.679.487c-.441.487-.392 1.255-.295 2.792l.26 4.08c.18 2.833.27 4.248 1.15 5.112C7.545 22 8.9 22 11.607 22"
    }
  ) });
}
function Tuning_Icon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { ...props, height: "1em", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "path",
    {
      fill: "currentColor",
      d: "M9.25 14a3 3 0 1 1 0 6a3 3 0 0 1 0-6m5-10a3 3 0 1 0 0 6a3 3 0 0 0 0-6m-5.5 2.209a.75.75 0 0 1 0 1.5h-7a.75.75 0 0 1 0-1.5zm6 10a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5zM1 16.959a.75.75 0 0 1 .75-.75h2a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1-.75-.75m20.75-10.75a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5z"
    }
  ) });
}
function User_Icon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { ...props, height: "1em", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { r: "4", cy: "6", cx: "12", fill: "currentColor" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { rx: "7", ry: "4", cx: "12", cy: "17", fill: "currentColor" })
  ] });
}
function Web_Icon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { ...props, height: "1em", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { r: "10", cx: "12", cy: "12", opacity: "0.5", fill: "currentColor" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        fill: "currentColor",
        d: "M8.575 9.447C8.388 7.363 6.781 5.421 6 4.711l-.43-.37A9.96 9.96 0 0 1 12 2c2.214 0 4.26.72 5.916 1.936c.234.711-.212 2.196-.68 2.906c-.17.257-.554.577-.976.88c-.95.683-2.15 1.02-2.76 2.278a1.42 1.42 0 0 0-.083 1.016c.06.22.1.459.1.692c.002.755-.762 1.3-1.517 1.292c-1.964-.021-3.25-1.604-3.425-3.553m4.862 8.829c.988-1.862 4.281-1.862 4.281-1.862c3.432-.036 3.896-2.12 4.206-3.173a10.006 10.006 0 0 1-8.535 8.664c-.323-.68-.705-2.21.048-3.629"
      }
    )
  ] });
}
function Gmail_Icon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { ...props, height: "1em", width: "1.33em", viewBox: "0 0 256 193", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        fill: "#4285f4",
        d: "M58.182 192.05V93.14L27.507 65.077L0 49.504v125.091c0 9.658 7.825 17.455 17.455 17.455z"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        fill: "#34a853",
        d: "M197.818 192.05h40.727c9.659 0 17.455-7.826 17.455-17.455V49.505l-31.156 17.837l-27.026 25.798z"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        fill: "#ea4335",
        d: "m58.182 93.14l-4.174-38.647l4.174-36.989L128 69.868l69.818-52.364l4.669 34.992l-4.669 40.644L128 145.504z"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#fbbc04", d: "M197.818 17.504V93.14L256 49.504V26.231c0-21.585-24.64-33.89-41.89-20.945z" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#c5221f", d: "m0 49.504l26.759 20.07L58.182 93.14V17.504L41.89 5.286C24.61-7.66 0 4.646 0 26.23z" })
  ] });
}
function DiscordColor_Icon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { ...props, height: "1em", width: "1.29em", viewBox: "0 0 256 199", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "path",
    {
      fill: "#5865f2",
      d: "M216.856 16.597A208.502 208.502 0 0 0 164.042 0c-2.275 4.113-4.933 9.645-6.766 14.046c-19.692-2.961-39.203-2.961-58.533 0c-1.832-4.4-4.55-9.933-6.846-14.046a207.809 207.809 0 0 0-52.855 16.638C5.618 67.147-3.443 116.4 1.087 164.956c22.169 16.555 43.653 26.612 64.775 33.193A161.094 161.094 0 0 0 79.735 175.3a136.413 136.413 0 0 1-21.846-10.632a108.636 108.636 0 0 0 5.356-4.237c42.122 19.702 87.89 19.702 129.51 0a131.66 131.66 0 0 0 5.355 4.237a136.07 136.07 0 0 1-21.886 10.653c4.006 8.02 8.638 15.67 13.873 22.848c21.142-6.58 42.646-16.637 64.815-33.213c5.316-56.288-9.08-105.09-38.056-148.36M85.474 135.095c-12.645 0-23.015-11.805-23.015-26.18s10.149-26.2 23.015-26.2c12.867 0 23.236 11.804 23.015 26.2c.02 14.375-10.148 26.18-23.015 26.18m85.051 0c-12.645 0-23.014-11.805-23.014-26.18s10.148-26.2 23.014-26.2c12.867 0 23.236 11.804 23.015 26.2c0 14.375-10.148 26.18-23.015 26.18"
    }
  ) });
}
function Patreon_Icon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { ...props, height: "1em", viewBox: "0 0 256 256", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "path",
    {
      fill: "currentColor",
      d: "M232 93.17c0 41-29.69 52.47-53.55 61.67c-8.41 3.24-16.35 6.3-22.21 10.28c-11.39 7.72-18.59 21.78-25.55 35.38c-9.94 19.42-20.23 39.5-43.17 39.5c-12.91 0-24.61-11.64-33.85-33.66s-14.31-51-13.61-77.45c1.08-40.65 14.58-62.68 25.7-74c14.95-15.2 35.24-25.3 58.68-29.2c21.79-3.62 44.14-1.38 62.93 6.3C215.73 43.6 232 65.9 232 93.17"
    }
  ) });
}
function Keyboard_Icon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { ...props, height: "1em", viewBox: "0 0 16 16", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "path",
    {
      fill: "currentColor",
      d: "M2.75 3A1.75 1.75 0 0 0 1 4.75v6.5c0 .966.784 1.75 1.75 1.75h10.5A1.75 1.75 0 0 0 15 11.25v-6.5A1.75 1.75 0 0 0 13.25 3zM3 10.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3.25 7a.75.75 0 1 1 0-1.5a.75.75 0 0 1 0 1.5M10 6.25a.75.75 0 1 1-1.5 0a.75.75 0 0 1 1.5 0M6.25 7a.75.75 0 1 1 0-1.5a.75.75 0 0 1 0 1.5M13 6.25a.75.75 0 1 1-1.5 0a.75.75 0 0 1 1.5 0M5.25 9a.75.75 0 1 1 0-1.5a.75.75 0 0 1 0 1.5M9 8.25a.75.75 0 1 1-1.5 0a.75.75 0 0 1 1.5 0m2.25.75a.75.75 0 1 1 0-1.5a.75.75 0 0 1 0 1.5"
    }
  ) });
}
function OpenFolder_Icon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { ...props, height: "1em", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        fill: "currentColor",
        d: "M16.07 9.952c1.329 0 2.462 0 3.366.102c.154.017.306.038.458.064c.532.09 1.05.235 1.53.488v-.85c0-.91 0-1.663-.085-2.264c-.09-.635-.286-1.197-.756-1.66a3.082 3.082 0 0 0-.241-.214c-.512-.408-1.126-.575-1.82-.652c-.67-.074-1.512-.074-2.545-.074h-.353c-.982 0-1.335-.006-1.653-.087a2.717 2.717 0 0 1-.536-.196c-.285-.14-.532-.351-1.228-.968l-.474-.42a6.91 6.91 0 0 0-.48-.403a4.289 4.289 0 0 0-2.182-.803A8.075 8.075 0 0 0 8.413 2h-.116c-.641 0-1.064 0-1.431.061c-1.605.268-2.903 1.39-3.219 2.875c-.072.337-.071.724-.071 1.283v4.387c.48-.253.998-.399 1.53-.488c.151-.026.304-.047.458-.064c.904-.102 2.037-.102 3.367-.102z"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        fill: "currentColor",
        d: "M3.358 12.779c-.61.941-.358 2.25.145 4.868c.363 1.885.544 2.827 1.172 3.452c.163.163.346.306.544.429C5.982 22 6.995 22 9.022 22h6.956c2.027 0 3.04 0 3.803-.472c.199-.123.38-.266.544-.429c.628-.625.81-1.567 1.172-3.452c.503-2.618.755-3.927.145-4.868a2.937 2.937 0 0 0-.57-.646c-.87-.735-2.279-.735-5.094-.735H9.022c-2.815 0-4.223 0-5.094.735a2.936 2.936 0 0 0-.57.646m6.337 4.402c0-.4.343-.723.765-.723h4.08c.422 0 .765.324.765.723c0 .399-.343.723-.765.723h-4.08c-.422 0-.765-.324-.765-.723"
      }
    )
  ] });
}
function UserHeart_Icon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { ...props, height: "1em", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { fill: "none", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        fill: "currentColor",
        d: "M11 2a5 5 0 1 0 0 10a5 5 0 0 0 0-10m0 11c-2.395 0-4.575.694-6.178 1.672c-.8.488-1.484 1.064-1.978 1.69C2.358 16.976 2 17.713 2 18.5c0 .845.411 1.511 1.003 1.986c.56.45 1.299.748 2.084.956C6.665 21.859 8.771 22 11 22l.685-.005a1 1 0 0 0 .89-1.428A6 6 0 0 1 12 18c0-1.252.383-2.412 1.037-3.373a1 1 0 0 0-.72-1.557Q11.671 13 11 13m4.5 1.691c.753-.439 1.679-.496 2.5-.046c.821-.45 1.747-.393 2.5.046c.916.534 1.526 1.59 1.5 2.788c-.036 1.57-1.248 2.798-2.886 3.771c-.343.203-.703.417-1.114.417c-.41 0-.771-.214-1.114-.417c-1.638-.973-2.85-2.202-2.885-3.77c-.027-1.198.583-2.255 1.499-2.789"
      }
    )
  ] }) });
}
function XSite_Icon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { ...props, height: "1em", viewBox: "0 0 14 14", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { fill: "none", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("g", { clipPath: "url(#primeTwitter0)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        fill: "currentColor",
        d: "M11.025.656h2.147L8.482 6.03L14 13.344H9.68L6.294 8.909l-3.87 4.435H.275l5.016-5.75L0 .657h4.43L7.486 4.71zm-.755 11.4h1.19L3.78 1.877H2.504z"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("clipPath", { id: "primeTwitter0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#fff", d: "M0 0h14v14H0z" }) }) })
  ] }) });
}
function Reddit_Icon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { ...props, height: "1em", viewBox: "0 0 256 256", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { r: "128", cx: "128", cy: "128", fill: "#ff4500" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        fill: "#fff",
        d: "M213.15 129.22c0-10.376-8.391-18.617-18.617-18.617a18.74 18.74 0 0 0-12.97 5.189c-12.818-9.157-30.368-15.107-49.9-15.87l8.544-39.981l27.773 5.95c.307 7.02 6.104 12.667 13.278 12.667c7.324 0 13.275-5.95 13.275-13.278c0-7.324-5.95-13.275-13.275-13.275c-5.188 0-9.768 3.052-11.904 7.478l-30.976-6.562c-.916-.154-1.832 0-2.443.458c-.763.458-1.22 1.22-1.371 2.136l-9.464 44.558c-19.837.612-37.692 6.562-50.662 15.872a18.74 18.74 0 0 0-12.971-5.188c-10.377 0-18.617 8.391-18.617 18.617c0 7.629 4.577 14.037 10.988 16.939a33.6 33.6 0 0 0-.458 5.646c0 28.686 33.42 52.036 74.621 52.036c41.202 0 74.622-23.196 74.622-52.036a35 35 0 0 0-.458-5.646c6.408-2.902 10.985-9.464 10.985-17.093M85.272 142.495c0-7.324 5.95-13.275 13.278-13.275c7.324 0 13.275 5.95 13.275 13.275s-5.95 13.278-13.275 13.278c-7.327.15-13.278-5.953-13.278-13.278m74.317 35.251c-9.156 9.157-26.553 9.768-31.588 9.768c-5.188 0-22.584-.765-31.59-9.768c-1.371-1.373-1.371-3.51 0-4.883c1.374-1.371 3.51-1.371 4.884 0c5.8 5.8 18.008 7.782 26.706 7.782s21.058-1.983 26.704-7.782c1.374-1.371 3.51-1.371 4.884 0c1.22 1.373 1.22 3.51 0 4.883m-2.443-21.822c-7.325 0-13.275-5.95-13.275-13.275s5.95-13.275 13.275-13.275c7.327 0 13.277 5.95 13.277 13.275c0 7.17-5.95 13.275-13.277 13.275"
      }
    )
  ] });
}
function EditCard_Icon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { ...props, height: "1em", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        fill: "currentColor",
        d: "M12 2c1.845 0 3.33 0 4.54.088L13.1 7.25H8.4L11.9 2zM3.464 3.464c1.253-1.252 3.158-1.433 6.632-1.46L6.599 7.25H2.104c.147-1.764.503-2.928 1.36-3.786M2 12c0-1.237 0-2.311.026-3.25h19.948C22 9.689 22 10.763 22 12v.258c-.567-.405-1.205-.578-1.831-.662c-.714-.096-1.595-.096-2.577-.096h-.184c-.982 0-1.863 0-2.577.096c-.779.104-1.578.348-2.233 1.002c-.654.655-.898 1.454-1.002 2.233c-.096.714-.096 1.595-.096 2.577v.184c0 .982 0 1.863.096 2.577c.084.626.257 1.264.662 1.831H12c-4.714 0-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12m19.896-4.75c-.147-1.764-.503-2.928-1.36-3.786c-.598-.597-1.344-.95-2.337-1.16L14.9 7.25z"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        clipRule: "evenodd",
        fillRule: "evenodd",
        fill: "currentColor",
        d: "M17.5 22c-2.121 0-3.182 0-3.841-.659S13 19.621 13 17.5s0-3.182.659-3.841S15.379 13 17.5 13s3.182 0 3.841.659S22 15.379 22 17.5s0 3.182-.659 3.841S19.621 22 17.5 22m2.212-6.712a.983.983 0 0 1 0 1.39l-.058.058a.24.24 0 0 1-.211.067a1.6 1.6 0 0 1-.81-.436a1.6 1.6 0 0 1-.436-.81a.24.24 0 0 1 .067-.211l.058-.058a.983.983 0 0 1 1.39 0M17.35 19.04a3 3 0 0 1-.296.279a1.6 1.6 0 0 1-.303.187a3 3 0 0 1-.381.14l-1.021.34a.265.265 0 0 1-.335-.335l.34-1.02c.064-.194.097-.291.14-.382q.077-.163.187-.303c.062-.08.134-.152.279-.296l1.799-1.799c.043-.043.118-.023.138.035a1.98 1.98 0 0 0 1.217 1.217c.058.02.078.095.035.138z"
      }
    )
  ] });
}
function Refresh3_Icon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { ...props, height: "1em", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        fill: "currentColor",
        d: "M12.079 2.25c-4.794 0-8.734 3.663-9.118 8.333H2a.75.75 0 0 0-.528 1.283l1.68 1.666a.75.75 0 0 0 1.056 0l1.68-1.666a.75.75 0 0 0-.528-1.283h-.893c.38-3.831 3.638-6.833 7.612-6.833a7.66 7.66 0 0 1 6.537 3.643a.75.75 0 1 0 1.277-.786A9.16 9.16 0 0 0 12.08 2.25"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        opacity: "0.5",
        fill: "currentColor",
        d: "M20.841 10.467a.75.75 0 0 0-1.054 0L18.1 12.133a.75.75 0 0 0 .527 1.284h.899c-.381 3.83-3.651 6.833-7.644 6.833a7.7 7.7 0 0 1-6.565-3.644a.75.75 0 1 0-1.276.788a9.2 9.2 0 0 0 7.84 4.356c4.809 0 8.766-3.66 9.151-8.333H22a.75.75 0 0 0 .527-1.284z"
      }
    )
  ] });
}
function Rocket_Icon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { ...props, width: "1em", height: "1em", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        fill: "currentColor",
        d: "m14.447 16.377l5.847-5.83c.842-.839 1.263-1.259 1.484-1.792S22 7.627 22 6.44v-.567c0-1.826 0-2.739-.569-3.306S19.947 2 18.116 2h-.57c-1.19 0-1.785 0-2.32.221c-.536.221-.957.641-1.8 1.48L7.58 9.531c-.984.98-1.594 1.589-1.83 2.176a1.5 1.5 0 0 0-.112.562c0 .802.647 1.448 1.942 2.739l.174.173l2.038-2.069a.75.75 0 1 1 1.069 1.053L8.816 16.24l.137.137c1.295 1.29 1.943 1.936 2.747 1.936c.178 0 .348-.031.519-.094c.603-.222 1.219-.836 2.228-1.842m2.747-6.846a1.946 1.946 0 0 1-2.747 0a1.93 1.93 0 0 1 0-2.738a1.946 1.946 0 0 1 2.747 0a1.93 1.93 0 0 1 0 2.738"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        opacity: 0.5,
        fill: "currentColor",
        d: "M9.034 5.963L6.491 8.5c-.467.466-.896.893-1.235 1.28a6 6 0 0 0-.619.82l-.024-.025l-.095-.094a4.9 4.9 0 0 0-1.532-1.004l-.123-.05l-.379-.15a.764.764 0 0 1-.259-1.252C3.345 6.907 4.69 5.566 5.34 5.297a3.4 3.4 0 0 1 1.788-.229c.546.081 1.063.362 1.907.895m4.342 13.35c.205.208.34.355.464.512q.243.311.434.658c.142.26.253.537.474 1.092a.69.69 0 0 0 1.126.224l.084-.083c1.12-1.117 2.465-2.458 2.735-3.105a3.35 3.35 0 0 0 .229-1.782c-.081-.545-.362-1.06-.897-1.902l-2.552 2.544c-.478.477-.916.914-1.313 1.256c-.237.206-.497.41-.784.586"
      }
    )
  ] });
}
function Linux_Icon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { ...props, height: "1rem", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { fill: "none", height: "1rem" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        fill: "currentColor",
        d: "M14.62 8.35c-.42.28-1.75 1.04-1.95 1.19c-.39.31-.75.29-1.14-.01c-.2-.16-1.53-.92-1.95-1.19c-.48-.31-.45-.7.08-.92c1.64-.69 3.28-.64 4.91.03c.49.21.51.6.05.9m7.22 7.28c-.93-2.09-2.2-3.99-3.84-5.66a4.3 4.3 0 0 1-1.06-1.88c-.1-.33-.17-.67-.24-1.01c-.2-.88-.29-1.78-.7-2.61c-.73-1.58-2-2.4-3.84-2.47c-1.81.05-3.16.81-3.95 2.4c-.21.43-.36.88-.46 1.34c-.17.76-.32 1.55-.5 2.32c-.15.65-.45 1.21-.96 1.71c-1.61 1.57-2.9 3.37-3.88 5.35c-.14.29-.28.58-.37.88c-.19.66.29 1.12.99.96c.44-.09.88-.18 1.3-.31c.41-.15.57-.05.67.35c.65 2.15 2.07 3.66 4.24 4.5c4.12 1.56 8.93-.66 9.97-4.58c.07-.27.17-.37.47-.27c.46.14.93.24 1.4.35c.49.09.85-.16.92-.64c.03-.26-.06-.49-.16-.73"
      }
    )
  ] });
}
function Windows_Icon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { ...props, width: "256", height: "256", viewBox: "0 0 256 256", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "256", fill: "none", height: "256" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        fill: "currentColor",
        d: "M104 144v51.64a8 8 0 0 1-8 8a8.5 8.5 0 0 1-1.43-.13l-64-11.64A8 8 0 0 1 24 184v-40a8 8 0 0 1 8-8h64a8 8 0 0 1 8 8m-2.87-89.78a8 8 0 0 0-6.56-1.73l-64 11.64A8 8 0 0 0 24 72v40a8 8 0 0 0 8 8h64a8 8 0 0 0 8-8V60.36a8 8 0 0 0-2.87-6.14M208 136h-80a8 8 0 0 0-8 8v57.45a8 8 0 0 0 6.57 7.88l80 14.54a7.6 7.6 0 0 0 1.43.13a8 8 0 0 0 8-8v-72a8 8 0 0 0-8-8m5.13-102.14a8 8 0 0 0-6.56-1.73l-80 14.55a8 8 0 0 0-6.57 7.87V112a8 8 0 0 0 8 8h80a8 8 0 0 0 8-8V40a8 8 0 0 0-2.87-6.14"
      }
    )
  ] });
}
function MacOS_Icon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { ...props, width: "26", height: "26", viewBox: "0 0 26 26", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "26", height: "26", fill: "none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        fill: "currentColor",
        d: "M23.934 18.947c-.598 1.324-.884 1.916-1.652 3.086c-1.073 1.634-2.588 3.673-4.461 3.687c-1.666.014-2.096-1.087-4.357-1.069c-2.261.011-2.732 1.089-4.4 1.072c-1.873-.017-3.307-1.854-4.381-3.485c-3.003-4.575-3.32-9.937-1.464-12.79C4.532 7.425 6.61 6.237 8.561 6.237c1.987 0 3.236 1.092 4.879 1.092c1.594 0 2.565-1.095 4.863-1.095c1.738 0 3.576.947 4.889 2.581c-4.296 2.354-3.598 8.49.742 10.132M16.559 4.408c.836-1.073 1.47-2.587 1.24-4.131c-1.364.093-2.959.964-3.891 2.092c-.844 1.027-1.544 2.553-1.271 4.029c1.488.048 3.028-.839 3.922-1.99"
      }
    )
  ] });
}
function ShieldWarning_Icon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { ...props, height: "1rem", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        opacity: "0.5",
        fill: "currentColor",
        d: "M3 10.417c0-3.198 0-4.797.378-5.335c.377-.537 1.88-1.052 4.887-2.081l.573-.196C10.405 2.268 11.188 2 12 2s1.595.268 3.162.805l.573.196c3.007 1.029 4.51 1.544 4.887 2.081C21 5.62 21 7.22 21 10.417v1.574c0 5.638-4.239 8.375-6.899 9.536C13.38 21.842 13.02 22 12 22s-1.38-.158-2.101-.473C7.239 20.365 3 17.63 3 11.991z"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        fill: "currentColor",
        d: "M12 7.25a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-1.5 0V8a.75.75 0 0 1 .75-.75M12 16a1 1 0 1 0 0-2a1 1 0 0 0 0 2"
      }
    )
  ] });
}
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
function CheckDuo_Icon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { ...props, height: "1rem", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { fill: "none", strokeWidth: "1.5", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { opacity: "0.5", d: "m4 12.9l3.143 3.6L15 7.5" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "m20 7.563l-8.571 9L11 16" })
  ] }) });
}
function DiskDuo_Icon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { ...props, height: "1rem", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        opacity: "0.5",
        fill: "currentColor",
        d: "M20.536 20.536C22 19.07 22 16.714 22 12c0-.341 0-.512-.015-.686a4.04 4.04 0 0 0-.921-2.224a8 8 0 0 0-.483-.504l-5.167-5.167a9 9 0 0 0-.504-.483a4.04 4.04 0 0 0-2.224-.92C12.512 2 12.342 2 12 2C7.286 2 4.929 2 3.464 3.464C2 4.93 2 7.286 2 12s0 7.071 1.464 8.535c.685.685 1.563 1.05 2.786 1.243l1.5.153C8.906 22 10.3 22 12 22s3.094 0 4.25-.069l1.5-.153c1.223-.194 2.102-.558 2.785-1.242"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        fill: "currentColor",
        d: "M7 7.25a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5zm6.052 9c.899 0 1.648 0 2.242.08c.628.084 1.195.27 1.65.726c.456.455.642 1.022.726 1.65c.08.594.08 1.343.08 2.242v.833l-1.5.14V21c0-.964-.002-1.612-.067-2.095c-.062-.461-.169-.659-.3-.789s-.327-.237-.788-.3c-.483-.064-1.131-.066-2.095-.066h-2c-.964 0-1.612.002-2.095.067c-.461.062-.659.169-.789.3s-.237.327-.3.788c-.064.483-.066 1.131-.066 2.095v.926l-1.5-.149v-.829c0-.899 0-1.648.08-2.242c.084-.628.27-1.195.725-1.65c.456-.456 1.023-.642 1.65-.726c.595-.08 1.345-.08 2.243-.08z"
      }
    )
  ] });
}
function BroomDuo_Icon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { ...props, height: "1em", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        opacity: "0.5",
        fill: "currentColor",
        d: "M22.53 2.53a.75.75 0 1 0-1.06-1.06l-2.403 2.402a4.5 4.5 0 0 1 1.061 1.06zM2.449 11.411l.74 1.218a24.45 24.45 0 0 0 8.181 8.181l1.219.741c1.898.97 4.353.347 5.414-1.661c.5-.949.977-2.012 1.279-3.07a19.5 19.5 0 0 0 .712-4.33c.033-.64.049-.961-.104-1.357c-.152-.395-.416-.66-.944-1.187L14.12 5.12c-.491-.491-.737-.737-1.107-.89c-.37-.151-.664-.15-1.253-.148a17.2 17.2 0 0 0-4.581.635c-1.057.302-2.12.778-3.069 1.28c-2.008 1.06-2.63 3.515-1.661 5.413"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        fill: "currentColor",
        d: "M19.643 4.358a4.445 4.445 0 0 0-6.287 0l-.038.037c.232.156.456.38.802.726l4.825 4.825c.302.302.518.517.675.72l.023-.022a4.445 4.445 0 0 0 0-6.286"
      }
    )
  ] });
}
function FilterDuo_Icon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { ...props, height: "1rem", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        fill: "currentColor",
        d: "M5 3h14L8.816 13.184a2.7 2.7 0 0 0-.778-1.086c-.228-.198-.547-.377-1.183-.736l-2.913-1.64c-.949-.533-1.423-.8-1.682-1.23C2 8.061 2 7.541 2 6.503v-.69c0-1.326 0-1.99.44-2.402C2.878 3 3.585 3 5 3"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        opacity: "0.5",
        fill: "currentColor",
        d: "M22 6.504v-.69c0-1.326 0-1.99-.44-2.402C21.122 3 20.415 3 19 3L8.815 13.184q.075.193.121.403c.064.285.064.619.064 1.286v2.67c0 .909 0 1.364.252 1.718c.252.355.7.53 1.594.88c1.879.734 2.818 1.101 3.486.683S15 19.452 15 17.542v-2.67c0-.666 0-1 .063-1.285a2.68 2.68 0 0 1 .9-1.49c.227-.197.545-.376 1.182-.735l2.913-1.64c.948-.533 1.423-.8 1.682-1.23c.26-.43.26-.95.26-1.988"
      }
    )
  ] });
}
function BellDuo_Icon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { ...props, height: "1rem", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        opacity: "0.5",
        fill: "currentColor",
        d: "M18.75 9v.704c0 .845.24 1.671.692 2.374l1.108 1.723c1.011 1.574.239 3.713-1.52 4.21a25.8 25.8 0 0 1-14.06 0c-1.759-.497-2.531-2.636-1.52-4.21l1.108-1.723a4.4 4.4 0 0 0 .693-2.374V9c0-3.866 3.022-7 6.749-7s6.75 3.134 6.75 7"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "currentColor", d: "M7.243 18.545a5.002 5.002 0 0 0 9.513 0c-3.145.59-6.367.59-9.513 0" })
  ] });
}
function BoxDuo_Icon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { ...props, height: "1rem", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        fill: "currentColor",
        d: "M8.422 20.618C10.178 21.54 11.056 22 12 22V12L2.638 7.073l-.04.067C2 8.154 2 9.417 2 11.942v.117c0 2.524 0 3.787.597 4.801c.598 1.015 1.674 1.58 3.825 2.709z"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        opacity: "0.7",
        fill: "currentColor",
        d: "m17.577 4.432l-2-1.05C13.822 2.461 12.944 2 12 2c-.945 0-1.822.46-3.578 1.382l-2 1.05C4.318 5.536 3.242 6.1 2.638 7.072L12 12l9.362-4.927c-.606-.973-1.68-1.537-3.785-2.641"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        opacity: "0.5",
        fill: "currentColor",
        d: "m21.403 7.14l-.041-.067L12 12v10c.944 0 1.822-.46 3.578-1.382l2-1.05c2.151-1.129 3.227-1.693 3.825-2.708c.597-1.014.597-2.277.597-4.8v-.117c0-2.525 0-3.788-.597-4.802"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        fill: "currentColor",
        d: "m6.323 4.484l.1-.052l1.493-.784l9.1 5.005l4.025-2.011q.205.232.362.498c.15.254.262.524.346.825L17.75 9.964V13a.75.75 0 0 1-1.5 0v-2.286l-3.5 1.75v9.44A3 3 0 0 1 12 22c-.248 0-.493-.032-.75-.096v-9.44l-8.998-4.5c.084-.3.196-.57.346-.824q.156-.266.362-.498l9.04 4.52l3.387-1.693z"
      }
    )
  ] });
}
function CalendarDuo_Icon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { ...props, width: "1em", height: "1em", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        fill: "currentColor",
        d: "M6.94 2c.416 0 .753.324.753.724v1.46c.668-.012 1.417-.012 2.26-.012h4.015c.842 0 1.591 0 2.259.013v-1.46c0-.4.337-.725.753-.725s.753.324.753.724V4.25c1.445.111 2.394.384 3.09 1.055c.698.67.982 1.582 1.097 2.972L22 9H2v-.724c.116-1.39.4-2.302 1.097-2.972s1.645-.944 3.09-1.055V2.724c0-.4.337-.724.753-.724"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        opacity: 0.5,
        fill: "currentColor",
        d: "M22 14v-2c0-.839-.004-2.335-.017-3H2.01c-.013.665-.01 2.161-.01 3v2c0 3.771 0 5.657 1.172 6.828S6.228 22 10 22h4c3.77 0 5.656 0 6.828-1.172S22 17.772 22 14"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        fill: "currentColor",
        d: "M18 17a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0-4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-5 4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0-4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-5 4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0-4a1 1 0 1 1-2 0a1 1 0 0 1 2 0"
      }
    )
  ] });
}
function UserDuo_Icon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { ...props, width: "1em", height: "1em", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { r: 4, cy: 6, cx: 12, fill: "currentColor" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        opacity: 0.5,
        fill: "currentColor",
        d: "M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5"
      }
    )
  ] });
}
function SmileCircleDuo_Icon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { ...props, width: "1em", height: "1em", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        opacity: 0.5,
        fill: "currentColor",
        d: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        fill: "currentColor",
        d: "M8.397 15.553a.75.75 0 0 1 1.05-.155c.728.54 1.607.852 2.553.852s1.825-.313 2.553-.852a.75.75 0 1 1 .894 1.204A5.77 5.77 0 0 1 12 17.75a5.77 5.77 0 0 1-3.447-1.148a.75.75 0 0 1-.156-1.049M15 12c.552 0 1-.672 1-1.5S15.552 9 15 9s-1 .672-1 1.5s.448 1.5 1 1.5m-6 0c.552 0 1-.672 1-1.5S9.552 9 9 9s-1 .672-1 1.5s.448 1.5 1 1.5"
      }
    )
  ] });
}
function MinusSquareDuo_Icon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { ...props, width: "1em", height: "1em", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        opacity: 0.5,
        fill: "currentColor",
        d: "M12 22c-4.714 0-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2s7.071 0 8.535 1.464C22 4.93 22 7.286 22 12s0 7.071-1.465 8.535C19.072 22 16.714 22 12 22"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "currentColor", d: "M15 12.75a.75.75 0 0 0 0-1.5H9a.75.75 0 0 0 0 1.5z" })
  ] });
}

function mitt(n){return {all:n=n||new Map,on:function(t,e){var i=n.get(t);i?i.push(e):n.set(t,[e]);},off:function(t,e){var i=n.get(t);i&&(e?i.splice(i.indexOf(e)>>>0,1):n.set(t,[]));},emit:function(t,e){var i=n.get(t);i&&i.slice().map(function(n){n(e);}),(i=n.get("*"))&&i.slice().map(function(n){n(t,e);});}}}

const {isEqual} = await importShared('lodash');
function extractGitUrl(url) {
  const gitRepoRegex = /^(https?:\/\/)?(www\.)?(github|gitlab)\.com\/([^/]+)\/([^/]+?)(?:\.git)?$/;
  const match = url.match(gitRepoRegex);
  if (!match) {
    throw new Error(`Invalid Git repository URL: ${url}`);
  }
  const [, , , platform, owner, repo] = match;
  return { owner, repo, platform };
}
function formatSizeKB(sizeKB) {
  if (!sizeKB) return "0 KB";
  if (sizeKB < 1024) {
    return `${sizeKB.toFixed(2)} KB`;
  } else if (sizeKB < 1024 * 1024) {
    return `${(sizeKB / 1024).toFixed(2)} MB`;
  } else {
    return `${(sizeKB / (1024 * 1024)).toFixed(2)} GB`;
  }
}
function validateGitRepoUrl(url) {
  const githubMatch = url.toLowerCase().match(/^(?:https?:\/\/)?(?:www\.)?github\.com\/([^/]+)\/([^/]+?)(\.git)?(\/)?$/i);
  if (githubMatch) {
    return `https://github.com/${githubMatch[1]}/${githubMatch[2]}`;
  }
  const gitlabMatch = url.toLowerCase().match(/^(?:https?:\/\/)?(?:www\.)?gitlab\.com\/([^/]+)\/([^/]+?)(\.git)?(\/)?$/i);
  if (gitlabMatch) {
    return `https://gitlab.com/${gitlabMatch[1]}/${gitlabMatch[2]}`;
  }
  return "";
}
function isValidURL(str) {
  const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z]{2,6})(?:[\\/\w .-]*)?$/i;
  const check = (url) => {
    if (urlRegex.test(url)) {
      return true;
    }
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };
  return Array.isArray(str) ? str.every(check) : check(str);
}

const browserDownloadChannels = {
  onDone: "browserDL:on-done",
  onProgress: "browserDL:on-progress",
  onDlStart: "browserDL:on-dl-start",
  cancel: "browserDL:cancel",
  pause: "browserDL:pause",
  resume: "browserDL:resume",
  clear: "browserDL:clear",
  openDownloadsMenu: "browserDL:open-downloads-menu",
  openItem: "browserDL:open-item",
  mainDownloadCount: "browserDL:main-download-count"
};
const customNotifChannels = {
  onOpen: "customNotif-onOpen",
  onClose: "customNotif-onClose",
  onBtnPress: "customNotif-onBtnPress"
};

const winChannels = {
  changeState: "win:state-change",
  onChangeState: "win:on-state-change",
  setDarkMode: "win:set-darkMode",
  getSystemDarkMode: "win:get-system-darkMode",
  onDarkMode: "win:on-darkMode",
  setTaskBarStatus: "win:set-taskbar-status",
  setDiscordRP: "win:set-discord-rp",
  setDiscordRpAiRunning: "win:set-discord-rp-ai-running",
  getSystemInfo: "win:get-system-info",
  openUrlDefaultBrowser: "win:open-url-default-browser"
};
const fileChannels = {
  getAppDirectories: "app:getAppDirectories",
  dialog: "app:openDialog",
  openPath: "app:openPath",
  removeDir: "app:removeDir",
  trashDir: "app:trashDir",
  listDir: "app:listDir",
  checkFilesExist: "app:checkFilesExist",
  calcFolderSize: "app:calcFolderSize",
  getRelativePath: "app:getRelativePath",
  getAbsolutePath: "app:getAbsolutePath",
  isEmptyDir: "app:isEmptyDir"
};
const gitChannels = {
  cloneShallow: "git:clone-shallow",
  cloneShallowPromise: "git:clone-shallow-promise",
  stashDrop: "git:stash-drop",
  validateGitDir: "git:validateGitDir",
  getRepoInfo: "git:get-repo-info",
  changeBranch: "git:changeBranch",
  unShallow: "git:unShallow",
  resetHard: "git:resetHard",
  pull: "git:pull",
  onProgress: "git:on-progress"
};
const utilsChannels = {
  cancelExtensionsData: "utils:cancel-extensions-data",
  updateAllExtensions: "utils:update-all-extensions",
  disableExtension: "utils:disable-extension",
  onUpdateAllExtensions: "utils:on-update-all-extensions",
  extensionsDetails: "utils:extensions-details",
  updateStatus: "utils:extensions-update-status",
  downloadFile: "utils:download-file",
  cancelDownload: "utils:cancel-download",
  onDownloadFile: "utils:on-download-file",
  decompressFile: "utils:decompress-file",
  isResponseValid: "utils:is-response-valid",
  getImageAsDataURL: "utils:get-image-as-data-url"
};
const modulesChannels = {
  cardUpdateAvailable: "modules:card-update-available",
  installModule: "modules:install-module",
  uninstallModule: "modules:uninstall-module",
  uninstallCardByID: "modules:uninstall-card-by-id",
  isUpdateAvailable: "modules:is-update-available",
  updateAvailableList: "modules:update-available-list",
  updateModule: "modules:update-module",
  updateAllModules: "modules:update-all-modules",
  checkEa: "modules:check-ea",
  checkCardsUpdateInterval: "modules:cards_update_interval",
  onCardsUpdateAvailable: "modules:on_cards_update_available",
  onReload: "modules:on-reload",
  onUpdatedModules: "modules:on-updated-modules",
  getModulesData: "modules:get-modules-data",
  getInstalledModulesInfo: "modules:get-installed-modules-info",
  getSkipped: "modules:get-skipped"
};
const extensionsChannels = {
  installExtension: "extensions:install-extensions",
  uninstallExtension: "extensions:uninstall-extensions",
  isUpdateAvailable: "extensions:is-update-available",
  updateAvailableList: "extensions:any-update-available",
  updateExtension: "extensions:update-extensions",
  updateAllExtensions: "extensions:update-all-extensions",
  checkEa: "extensions:check-ea",
  onReload: "extensions:on-reload",
  onUpdatedExtensions: "extensions:on-updated-extensions",
  getExtensionsData: "extensions:get-extensions-data",
  getInstalledExtensionsInfo: "extensions:get-installed-extensions-info",
  getSkipped: "extensions:get-skipped"
};
const ptyChannels = {
  process: "pty-process",
  customProcess: "pty-custom-process",
  emptyProcess: "pty-custom-process",
  customCommands: "pty-custom-commands",
  write: "pty-write",
  clear: "pty-clear",
  resize: "pty-resize",
  onData: "pty-on-data",
  onTitle: "pty-on-title",
  onExit: "pty-on-exit-code"
};
const appUpdateChannels = {
  statusError: "appUpdate:statusError",
  status: "appUpdate:status",
  download: "appUpdate:download",
  cancel: "appUpdate:cancel",
  install: "appUpdate:install"};
const appDataChannels = {
  getCurrentPath: "appData:get-current-path",
  selectAnother: "appData:select-another",
  isAppDir: "appData:is-app-dir"
};
const storageChannels = {
  get: "storage:getData",
  getCustom: "storage:get-custom",
  setCustom: "storage:set-custom",
  getAll: "storage:getAllData",
  update: "storage:updateData",
  clear: "storage:clearStorage"
};
const moduleApiChannels = {
  getFolderCreationTime: "module_api_getFolderCreationTime",
  getLastPulledDate: "module_api_getLastPulledDate",
  getCurrentReleaseTag: "module_api_getCurrentReleaseTag"
};
const storageUtilsChannels = {
  setSystemStartup: "storageUtils:setSystemStartup",
  addInstalledCard: "storageUtils:add-installed-card",
  removeInstalledCard: "storageUtils:remove-installed-card",
  onInstalledCards: "storageUtils:on-installed-cards",
  addAutoUpdateCard: "storageUtils:add-autoUpdate-card",
  removeAutoUpdateCard: "storageUtils:remove-autoUpdate-card",
  addAutoUpdateExtensions: "storageUtils:add-autoUpdate-extensions",
  removeAutoUpdateExtensions: "storageUtils:remove-autoUpdate-extensions",
  onAutoUpdateCards: "storageUtils:on-autoUpdate-cards",
  onAutoUpdateExtensions: "storageUtils:on-autoUpdate-extensions",
  onPinnedCardsChange: "storageUtils:on-pinned-cards",
  pinnedCards: "storageUtils:pinned-cards",
  recentlyUsedCards: "storageUtils:recently-used-cards",
  onRecentlyUsedCardsChange: "storageUtils:on-recently-used-cards",
  homeCategory: "storageUtils:home-category",
  onHomeCategory: "storageUtils:on-home-category",
  preCommands: "storageUtils:pre-commands",
  onPreCommands: "storageUtils:on-pre-commands",
  customRun: "storageUtils:custom-run",
  onCustomRun: "storageUtils:on-custom-run",
  customRunBehavior: "storageUtils:custom-run-behavior",
  preOpen: "storageUtils:pre-open",
  getCardArguments: "storageUtils:get-card-arguments",
  setCardArguments: "storageUtils:set-card-arguments",
  updateZoomFactor: "storageUtils:update-zoom-factor",
  addBrowserRecent: "storageUtils:add-browser-recent",
  addBrowserFavorite: "storageUtils:add-browser-favorite",
  addBrowserHistory: "storageUtils:add-browser-history",
  addBrowserRecentFavIcon: "storageUtils:add-browser-recent-favicon",
  removeBrowserRecent: "storageUtils:remove-browser-recent",
  removeBrowserFavorite: "storageUtils:remove-browser-favorite",
  removeBrowserHistory: "storageUtils:remove-browser-favorite",
  setShowConfirm: "storage:set-show-confirm",
  onConfirmChange: "storage:on-confirm-change",
  addReadNotif: "storageUtils:add-read-notif",
  setCardTerminalPreCommands: "storageUtils:card-terminal-preCommands",
  unassignCard: "storageUtils:unassign-card",
  getBrowserHistoryData: "storageUtils:getBrowserHistoryData"
};
const appWindowChannels = {
  hotkeysChange: "window:hotkeys-change",
  showToast: "window:show-toast"};
const contextMenuChannels = {
  onInitView: "context:init-view",
  onFind: "context:find-in-page",
  onTerminateAI: "context:on-terminate-ai",
  onTerminateTab: "context:on-terminate-tab",
  onCloseApp: "context:on-close-app",
  onZoom: "context:zoom-page",
  relaunchAI: "context:relaunch-ai",
  onRelaunchAI: "context:on-relaunch-ai",
  stopAI: "context:stop-ai",
  onStopAI: "context:on-stop-ai",
  removeTab: "context:remove-tab",
  onRemoveTab: "context:on-remove-tab",
  resizeWindow: "context:resize-window",
  showWindow: "context:show-window",
  hideWindow: "context:hide-window",
  copy: "context:copy",
  paste: "context:paste",
  replaceMisspelling: "context:replaceMisspelling",
  selectAll: "context:selectAll",
  undo: "context:undo",
  redo: "context:redo",
  newTab: "context:newTab",
  openExternal: "context:openExternal",
  downloadImage: "context:download-image",
  navigate: "context:navigate",
  openTerminateAI: "context:open-terminate-ai",
  openTerminateTab: "context:open-terminate-tab",
  openCloseApp: "context:open-close-app"
};
const tabsChannels = {
  onNewTab: "tabs:new-tab"
};
const browserChannels = {
  createBrowser: "browser:create-browser",
  removeBrowser: "browser:remove-browser",
  loadURL: "browser:load-url",
  setVisible: "browser:set-visible",
  openFindInPage: "browser:openFindInPage",
  openZoom: "browser:openZoom",
  findInPage: "browser:findInPage",
  stopFindInPage: "browser:stopFindInPage",
  setZoomFactor: "browser:setZoomFactor",
  focusWebView: "browser:focus-webview",
  clearCache: "browser:clear-cache",
  clearCookies: "browser:clear-cookies",
  reload: "browser:reload",
  goBack: "browser:goBack",
  goForward: "browser:goForward",
  onCanGo: "browser:on-can-go",
  isLoading: "browser:is-loading",
  onTitleChange: "browser:on-title-change",
  onFavIconChange: "browser:on-favicon-change",
  onUrlChange: "browser:on-url-change",
  onDomReady: "browser:on-dom-ready",
  getUserAgent: "browser:get-user-agent",
  updateUserAgent: "browser:update-user-agent",
  addOffset: "browser:add-offset",
  clearHistory: "browser:clear-history"
};
const staticsChannels = {
  pull: "statics:pull",
  getReleases: "statics:getReleases",
  getInsider: "statics:getInsider",
  getNotification: "statics:getNotification",
  getModules: "statics:getModules",
  getExtensions: "statics:getExtensions",
  getExtensionsEA: "statics:getExtensionsEA",
  getPatrons: "statics:getPatrons"
};
const eventsChannels = {
  card_PreCommandUninstall: "events:card_PreCommandUninstall"
};

const ipc = window.electron.ipcRenderer;
const rendererIpc = {
  /** Managing app window states */
  win: {
    changeWinState: (state) => {
      extensionRendererApi.events_ipc.emit("win_change_state", { state });
      ipc.send(winChannels.changeState, state);
    },
    onChangeState: (result) => ipc.on(winChannels.onChangeState, result),
    setDarkMode: (darkMode) => {
      extensionRendererApi.events_ipc.emit("win_set_dark_mode", { darkMode });
      ipc.send(winChannels.setDarkMode, darkMode);
    },
    getSystemDarkMode: () => {
      extensionRendererApi.events_ipc.emit("win_get_system_dark_mode", {});
      return ipc.invoke(winChannels.getSystemDarkMode);
    },
    onDarkMode: (result) => ipc.on(winChannels.onDarkMode, result),
    setTaskBarStatus: (status) => {
      extensionRendererApi.events_ipc.emit("win_set_taskbar_status", { status });
      ipc.send(winChannels.setTaskBarStatus, status);
    },
    setDiscordRP: (discordRp) => {
      extensionRendererApi.events_ipc.emit("win_set_discord_rp", { discordRp });
      ipc.send(winChannels.setDiscordRP, discordRp);
    },
    setDiscordRpAiRunning: (status) => {
      extensionRendererApi.events_ipc.emit("win_set_discord_rp_ai_running", { status });
      ipc.send(winChannels.setDiscordRpAiRunning, status);
    },
    getSystemInfo: () => {
      extensionRendererApi.events_ipc.emit("win_get_system_info", {});
      return ipc.invoke(winChannels.getSystemInfo);
    },
    openUrlDefaultBrowser: (url) => {
      extensionRendererApi.events_ipc.emit("win_open_url_default_browser", { url });
      ipc.send(winChannels.openUrlDefaultBrowser, url);
    }
  },
  /** Managing files and directories */
  file: {
    openDlg: (option) => {
      extensionRendererApi.events_ipc.emit("file_open_dialog", { option });
      return ipc.invoke(fileChannels.dialog, option);
    },
    openPath: (dir) => {
      extensionRendererApi.events_ipc.emit("file_open_path", { dir });
      ipc.send(fileChannels.openPath, dir);
    },
    getAppDirectories: (name) => {
      extensionRendererApi.events_ipc.emit("file_get_app_directories", { name });
      return ipc.invoke(fileChannels.getAppDirectories, name);
    },
    removeDir: (dir) => {
      extensionRendererApi.events_ipc.emit("file_remove_dir", { dir });
      return ipc.invoke(fileChannels.removeDir, dir);
    },
    trashDir: (dir) => {
      extensionRendererApi.events_ipc.emit("file_trash_dir", { dir });
      return ipc.invoke(fileChannels.trashDir, dir);
    },
    listDir: (dirPath, relatives) => {
      extensionRendererApi.events_ipc.emit("file_list_dir", { dirPath, relatives });
      return ipc.invoke(fileChannels.listDir, dirPath, relatives);
    },
    checkFilesExist: (dir, fileNames) => {
      extensionRendererApi.events_ipc.emit("file_check_files_exist", { dir, fileNames });
      return ipc.invoke(fileChannels.checkFilesExist, dir, fileNames);
    },
    calcFolderSize: (dir) => {
      extensionRendererApi.events_ipc.emit("file_calc_folder_size", { dir });
      return ipc.invoke(fileChannels.calcFolderSize, dir);
    },
    getRelativePath: (basePath, targetPath) => {
      extensionRendererApi.events_ipc.emit("file_get_relative_path", { basePath, targetPath });
      return ipc.invoke(fileChannels.getRelativePath, basePath, targetPath);
    },
    getAbsolutePath: (basePath, targetPath) => {
      extensionRendererApi.events_ipc.emit("file_get_absolute_path", { basePath, targetPath });
      return ipc.invoke(fileChannels.getAbsolutePath, basePath, targetPath);
    },
    isEmptyDir: (dir) => {
      extensionRendererApi.events_ipc.emit("file_is_empty_dir", { dir });
      return ipc.invoke(fileChannels.isEmptyDir, dir);
    }
  },
  /** Git operations */
  git: {
    cloneShallow: (url, directory, singleBranch, depth, branch) => {
      extensionRendererApi.events_ipc.emit("git_clone_shallow", { url, directory, singleBranch, depth, branch });
      ipc.send(gitChannels.cloneShallow, url, directory, singleBranch, depth, branch);
    },
    cloneShallowPromise: (url, directory, singleBranch, depth, branch) => {
      extensionRendererApi.events_ipc.emit("git_clone_shallow_promise", {
        url,
        directory,
        singleBranch,
        depth,
        branch
      });
      return ipc.invoke(gitChannels.cloneShallowPromise, url, directory, singleBranch, depth, branch);
    },
    getRepoInfo: (dir) => {
      extensionRendererApi.events_ipc.emit("git_get_repo_info", { dir });
      return ipc.invoke(gitChannels.getRepoInfo, dir);
    },
    changeBranch: (dir, branchName) => {
      extensionRendererApi.events_ipc.emit("git_change_branch", { dir, branchName });
      return ipc.invoke(gitChannels.changeBranch, dir, branchName);
    },
    unShallow: (dir) => {
      extensionRendererApi.events_ipc.emit("git_unshallow", { dir });
      return ipc.invoke(gitChannels.unShallow, dir);
    },
    resetHard: (dir) => {
      extensionRendererApi.events_ipc.emit("git_reset_hard", { dir });
      return ipc.invoke(gitChannels.resetHard, dir);
    },
    validateGitDir: (dir, url) => {
      extensionRendererApi.events_ipc.emit("git_validate_git_dir", { dir, url });
      return ipc.invoke(gitChannels.validateGitDir, dir, url);
    },
    onProgress: (callback) => ipc.on(gitChannels.onProgress, callback),
    offProgress: () => ipc.removeAllListeners(gitChannels.onProgress),
    pull: (repoDir, id) => {
      extensionRendererApi.events_ipc.emit("git_pull", { repoDir, id });
      ipc.send(gitChannels.pull, repoDir, id);
    },
    stashDrop: (dir) => {
      extensionRendererApi.events_ipc.emit("git_stash_drop", { dir });
      return ipc.invoke(gitChannels.stashDrop, dir);
    }
  },
  /** Managing app modules */
  module: {
    cardUpdateAvailable: (card, updateType) => {
      extensionRendererApi.events_ipc.emit("module_card_update_available", { card, updateType });
      return ipc.invoke(modulesChannels.cardUpdateAvailable, card, updateType);
    },
    getModulesData: () => {
      extensionRendererApi.events_ipc.emit("module_get_modules_data", {});
      return ipc.invoke(modulesChannels.getModulesData);
    },
    getInstalledModulesInfo: () => {
      extensionRendererApi.events_ipc.emit("module_get_installed_modules_info", {});
      return ipc.invoke(modulesChannels.getInstalledModulesInfo);
    },
    getSkipped: () => {
      extensionRendererApi.events_ipc.emit("module_get_skipped", {});
      return ipc.invoke(modulesChannels.getSkipped);
    },
    checkEa: (isEA, isInsider) => {
      extensionRendererApi.events_ipc.emit("module_check_ea", { isEA, isInsider });
      return ipc.invoke(modulesChannels.checkEa, isEA, isInsider);
    },
    installModule: (url) => {
      extensionRendererApi.events_ipc.emit("module_install_module", { url });
      return ipc.invoke(modulesChannels.installModule, url);
    },
    uninstallModule: (id) => {
      extensionRendererApi.events_ipc.emit("module_uninstall_module", { id });
      return ipc.invoke(modulesChannels.uninstallModule, id);
    },
    uninstallCardByID: (id) => {
      extensionRendererApi.events_ipc.emit("module_uninstall_card_by_id", { id });
      return ipc.invoke(modulesChannels.uninstallCardByID, id);
    },
    isUpdateAvailable: (id) => {
      extensionRendererApi.events_ipc.emit("module_is_update_available", { id });
      return ipc.invoke(modulesChannels.isUpdateAvailable, id);
    },
    updateAvailableList: () => {
      extensionRendererApi.events_ipc.emit("module_update_available_list", {});
      return ipc.invoke(modulesChannels.updateAvailableList);
    },
    updateModule: (id) => {
      extensionRendererApi.events_ipc.emit("module_update_module", { id });
      return ipc.invoke(modulesChannels.updateModule, id);
    },
    updateAllModules: () => {
      extensionRendererApi.events_ipc.emit("module_update_all_modules", {});
      return ipc.invoke(modulesChannels.updateAllModules);
    },
    onReload: (result) => ipc.on(modulesChannels.onReload, result),
    onUpdatedModules: (result) => ipc.on(modulesChannels.onUpdatedModules, result),
    checkCardsUpdateInterval: (updateType) => {
      extensionRendererApi.events_ipc.emit("module_check_cards_update_interval", { updateType });
      ipc.send(modulesChannels.checkCardsUpdateInterval, updateType);
    },
    onCardsUpdateAvailable: (result) => ipc.on(modulesChannels.onCardsUpdateAvailable, result)
  },
  moduleApi: {
    getFolderCreationTime: (dir) => {
      extensionRendererApi.events_ipc.emit("module_api_get_folder_creation_time", { dir });
      return ipc.invoke(moduleApiChannels.getFolderCreationTime, dir);
    },
    getLastPulledDate: (dir) => {
      extensionRendererApi.events_ipc.emit("module_api_get_last_pulled_date", { dir });
      return ipc.invoke(moduleApiChannels.getLastPulledDate, dir);
    },
    getCurrentReleaseTag: (dir) => {
      extensionRendererApi.events_ipc.emit("module_api_get_current_release_tag", { dir });
      return ipc.invoke(moduleApiChannels.getCurrentReleaseTag, dir);
    }
  },
  /** Managing app extensions */
  extension: {
    getExtensionsData: () => {
      extensionRendererApi.events_ipc.emit("extension_get_extensions_data", {});
      return ipc.invoke(extensionsChannels.getExtensionsData);
    },
    getInstalledExtensionsInfo: () => {
      extensionRendererApi.events_ipc.emit("extension_get_installed_extensions_info", {});
      return ipc.invoke(extensionsChannels.getInstalledExtensionsInfo);
    },
    getSkipped: () => {
      extensionRendererApi.events_ipc.emit("extension_get_skipped", {});
      return ipc.invoke(extensionsChannels.getSkipped);
    },
    installExtension: (url) => {
      extensionRendererApi.events_ipc.emit("extension_install_extension", { url });
      return ipc.invoke(extensionsChannels.installExtension, url);
    },
    uninstallExtension: (id) => {
      extensionRendererApi.events_ipc.emit("extension_uninstall_extension", { id });
      return ipc.invoke(extensionsChannels.uninstallExtension, id);
    },
    isUpdateAvailable: (id) => {
      extensionRendererApi.events_ipc.emit("extension_is_update_available", { id });
      return ipc.invoke(extensionsChannels.isUpdateAvailable, id);
    },
    updateAvailableList: () => {
      extensionRendererApi.events_ipc.emit("extension_update_available_list", {});
      return ipc.invoke(extensionsChannels.updateAvailableList);
    },
    updateExtension: (id) => {
      extensionRendererApi.events_ipc.emit("extension_update_extension", { id });
      return ipc.invoke(extensionsChannels.updateExtension, id);
    },
    checkEa: (isEA, isInsider) => {
      extensionRendererApi.events_ipc.emit("extension_check_ea", { isEA, isInsider });
      return ipc.invoke(extensionsChannels.checkEa, isEA, isInsider);
    },
    updateAllExtensions: () => {
      extensionRendererApi.events_ipc.emit("extension_update_all_extensions", {});
      return ipc.invoke(extensionsChannels.updateAllExtensions);
    },
    onReload: (result) => ipc.on(extensionsChannels.onReload, result),
    onUpdatedExtensions: (result) => ipc.on(extensionsChannels.onUpdatedExtensions, result)
  },
  /** Utilities methods for working with app storage data */
  storageUtils: {
    addInstalledCard: (cardData) => {
      extensionRendererApi.events_ipc.emit("storage_utils_add_installed_card", { cardData });
      ipc.send(storageUtilsChannels.addInstalledCard, cardData);
    },
    removeInstalledCard: (cardId) => {
      extensionRendererApi.events_ipc.emit("storage_utils_remove_installed_card", { cardId });
      ipc.send(storageUtilsChannels.removeInstalledCard, cardId);
    },
    onInstalledCards: (result) => ipc.on(storageUtilsChannels.onInstalledCards, result),
    addAutoUpdateCard: (cardId) => {
      extensionRendererApi.events_ipc.emit("storage_utils_add_auto_update_card", { cardId });
      ipc.send(storageUtilsChannels.addAutoUpdateCard, cardId);
    },
    removeAutoUpdateCard: (cardId) => {
      extensionRendererApi.events_ipc.emit("storage_utils_remove_auto_update_card", { cardId });
      ipc.send(storageUtilsChannels.removeAutoUpdateCard, cardId);
    },
    onAutoUpdateCards: (result) => ipc.on(storageUtilsChannels.onAutoUpdateCards, result),
    addAutoUpdateExtensions: (cardId) => {
      extensionRendererApi.events_ipc.emit("storage_utils_add_auto_update_extensions", { cardId });
      ipc.send(storageUtilsChannels.addAutoUpdateExtensions, cardId);
    },
    removeAutoUpdateExtensions: (cardId) => {
      extensionRendererApi.events_ipc.emit("storage_utils_remove_auto_update_extensions", { cardId });
      ipc.send(storageUtilsChannels.removeAutoUpdateExtensions, cardId);
    },
    onAutoUpdateExtensions: (result) => ipc.on(storageUtilsChannels.onAutoUpdateExtensions, result),
    pinnedCards: (opt, id, pinnedCards) => {
      extensionRendererApi.events_ipc.emit("storage_utils_pinned_cards", { opt, id, pinnedCards });
      return ipc.invoke(storageUtilsChannels.pinnedCards, opt, id, pinnedCards);
    },
    onPinnedCardsChange: (result) => ipc.on(storageUtilsChannels.onPinnedCardsChange, result),
    preCommands: (opt, data) => {
      extensionRendererApi.events_ipc.emit("storage_utils_pre_commands", { opt, data });
      return ipc.invoke(storageUtilsChannels.preCommands, opt, data);
    },
    onPreCommands: (result) => ipc.on(storageUtilsChannels.onPreCommands, result),
    offPreCommands: () => ipc.removeAllListeners(storageUtilsChannels.onPreCommands),
    customRun: (opt, data) => {
      extensionRendererApi.events_ipc.emit("storage_utils_custom_run", { opt, data });
      return ipc.invoke(storageUtilsChannels.customRun, opt, data);
    },
    onCustomRun: (result) => ipc.on(storageUtilsChannels.onCustomRun, result),
    offCustomRun: () => ipc.removeAllListeners(storageUtilsChannels.onCustomRun),
    updateCustomRunBehavior: (data) => {
      extensionRendererApi.events_ipc.emit("storage_utils_update_custom_run_behavior", { data });
      ipc.send(storageUtilsChannels.customRunBehavior, data);
    },
    preOpen: (opt, open) => {
      extensionRendererApi.events_ipc.emit("storage_utils_pre_open", { opt, open });
      return ipc.invoke(storageUtilsChannels.preOpen, opt, open);
    },
    getCardArguments: (cardId) => {
      extensionRendererApi.events_ipc.emit("storage_utils_get_card_arguments", { cardId });
      return ipc.invoke(storageUtilsChannels.getCardArguments, cardId);
    },
    setCardArguments: (cardId, args) => {
      extensionRendererApi.events_ipc.emit("storage_utils_set_card_arguments", { cardId, args });
      return ipc.invoke(storageUtilsChannels.setCardArguments, cardId, args);
    },
    recentlyUsedCards: (opt, id) => {
      extensionRendererApi.events_ipc.emit("storage_utils_recently_used_cards", { opt, id });
      return ipc.invoke(storageUtilsChannels.recentlyUsedCards, opt, id);
    },
    onRecentlyUsedCardsChange: (result) => ipc.on(storageUtilsChannels.onRecentlyUsedCardsChange, result),
    homeCategory: (opt, data) => {
      extensionRendererApi.events_ipc.emit("storage_utils_home_category", { opt, data });
      return ipc.invoke(storageUtilsChannels.homeCategory, opt, data);
    },
    onHomeCategory: (result) => ipc.on(storageUtilsChannels.onHomeCategory, result),
    setSystemStartup: (startup) => {
      extensionRendererApi.events_ipc.emit("storage_utils_set_system_startup", { startup });
      ipc.send(storageUtilsChannels.setSystemStartup, startup);
    },
    updateZoomFactor: (zoomFactor) => {
      extensionRendererApi.events_ipc.emit("storage_utils_update_zoom_factor", { zoomFactor });
      ipc.send(storageUtilsChannels.updateZoomFactor, zoomFactor);
    },
    addBrowserRecent: (recentEntry) => {
      extensionRendererApi.events_ipc.emit("storage_utils_add_browser_recent", { recentEntry });
      ipc.send(storageUtilsChannels.addBrowserRecent, recentEntry);
    },
    addBrowserFavorite: (favoriteEntry) => {
      extensionRendererApi.events_ipc.emit("storage_utils_add_browser_favorite", { favoriteEntry });
      ipc.send(storageUtilsChannels.addBrowserFavorite, favoriteEntry);
    },
    addBrowserHistory: (historyEntry) => {
      extensionRendererApi.events_ipc.emit("storage_utils_add_browser_history", { historyEntry });
      ipc.send(storageUtilsChannels.addBrowserHistory, historyEntry);
    },
    addBrowserRecentFavIcon: (url, favIcon) => {
      extensionRendererApi.events_ipc.emit("storage_utils_add_browser_recent_favicon", { url, favIcon });
      ipc.send(storageUtilsChannels.addBrowserRecentFavIcon, url, favIcon);
    },
    removeBrowserRecent: (url) => {
      extensionRendererApi.events_ipc.emit("storage_utils_remove_browser_recent", { url });
      ipc.send(storageUtilsChannels.removeBrowserRecent, url);
    },
    removeBrowserFavorite: (url) => {
      extensionRendererApi.events_ipc.emit("storage_utils_remove_browser_favorite", { url });
      ipc.send(storageUtilsChannels.removeBrowserFavorite, url);
    },
    removeBrowserHistory: (url) => {
      extensionRendererApi.events_ipc.emit("storage_utils_remove_browser_history", { url });
      ipc.send(storageUtilsChannels.removeBrowserHistory, url);
    },
    setShowConfirm: (type, enable) => {
      extensionRendererApi.events_ipc.emit("storage_utils_set_show_confirm", { type, enable });
      ipc.send(storageUtilsChannels.setShowConfirm, type, enable);
    },
    onConfirmChange: (result) => ipc.on(storageUtilsChannels.onConfirmChange, result),
    addReadNotif: (id) => {
      extensionRendererApi.events_ipc.emit("storage_utils_add_read_notif", { id });
      ipc.send(storageUtilsChannels.addReadNotif, id);
    },
    setCardTerminalPreCommands: (id, commands) => {
      extensionRendererApi.events_ipc.emit("storage_utils_setCardTerminalPreCommands", { id, commands });
      ipc.send(storageUtilsChannels.setCardTerminalPreCommands, id, commands);
    },
    unassignCard: (id, clearConfigs) => {
      extensionRendererApi.events_ipc.emit("storage_utils_unassignCard", { id, clearConfigs });
      return ipc.invoke(storageUtilsChannels.unassignCard, id, clearConfigs);
    },
    getBrowserHistoryData: () => ipc.invoke(storageUtilsChannels.getBrowserHistoryData)
  },
  /** Utilities methods */
  utils: {
    updateAllExtensions: (data) => {
      extensionRendererApi.events_ipc.emit("utils_update_all_extensions", { data });
      ipc.send(utilsChannels.updateAllExtensions, data);
    },
    onUpdateAllExtensions: (result) => ipc.on(utilsChannels.onUpdateAllExtensions, result),
    offUpdateAllExtensions: () => ipc.removeAllListeners(utilsChannels.onUpdateAllExtensions),
    getExtensionsDetails: (dir) => {
      extensionRendererApi.events_ipc.emit("utils_get_extensions_details", { dir });
      return ipc.invoke(utilsChannels.extensionsDetails, dir);
    },
    getExtensionsUpdateStatus: (dir) => {
      extensionRendererApi.events_ipc.emit("utils_get_extensions_update_status", { dir });
      return ipc.invoke(utilsChannels.updateStatus, dir);
    },
    disableExtension: (disable, dir) => {
      extensionRendererApi.events_ipc.emit("utils_disable_extension", { disable, dir });
      return ipc.invoke(utilsChannels.disableExtension, disable, dir);
    },
    cancelExtensionsData: () => {
      extensionRendererApi.events_ipc.emit("utils_cancel_extensions_data", {});
      ipc.send(utilsChannels.cancelExtensionsData);
    },
    downloadFile: (url) => {
      extensionRendererApi.events_ipc.emit("utils_download_file", { url });
      ipc.send(utilsChannels.downloadFile, url);
    },
    cancelDownload: () => {
      extensionRendererApi.events_ipc.emit("utils_cancel_download", {});
      ipc.send(utilsChannels.cancelDownload);
    },
    onDownloadFile: (result) => ipc.on(utilsChannels.onDownloadFile, result),
    offDownloadFile: () => ipc.removeAllListeners(utilsChannels.onDownloadFile),
    decompressFile: (filePath) => {
      extensionRendererApi.events_ipc.emit("utils_decompress_file", { filePath });
      return ipc.invoke(utilsChannels.decompressFile, filePath);
    },
    isResponseValid: (url) => {
      extensionRendererApi.events_ipc.emit("utils_is_response_valid", { url });
      return ipc.invoke(utilsChannels.isResponseValid, url);
    },
    getImageAsDataURL: (url) => {
      extensionRendererApi.events_ipc.emit("utils_get_image_as_data_url", { url });
      return ipc.invoke(utilsChannels.getImageAsDataURL, url);
    }
  },
  /** Managing and using node_pty(Pseudo Terminal ) */
  pty: {
    process: (id, opt, cardId) => {
      extensionRendererApi.events_ipc.emit("terminal_process", { id, opt, cardId });
      ipc.send(ptyChannels.process, id, opt, cardId);
    },
    customProcess: (id, opt, dir, file) => {
      extensionRendererApi.events_ipc.emit("terminal_process_custom", { id, opt, dir, file });
      ipc.send(ptyChannels.customProcess, id, opt, dir, file);
    },
    emptyProcess: (id, opt, dir) => {
      extensionRendererApi.events_ipc.emit("terminal_process_empty", { id, opt, dir });
      ipc.send(ptyChannels.emptyProcess, id, opt, dir);
    },
    customCommands: (id, opt, commands, dir) => {
      extensionRendererApi.events_ipc.emit("terminal_process_custom_command", { id, opt, commands, dir });
      ipc.send(ptyChannels.customCommands, id, opt, commands, dir);
    },
    write: (id, data) => {
      extensionRendererApi.events_ipc.emit("terminal_write", { id, data });
      ipc.send(ptyChannels.write, id, data);
    },
    clear: (id) => {
      extensionRendererApi.events_ipc.emit("terminal_clear", { id });
      ipc.send(ptyChannels.clear, id);
    },
    resize: (id, cols, rows) => {
      extensionRendererApi.events_ipc.emit("terminal_resize", { id, cols, rows });
      ipc.send(ptyChannels.resize, id, cols, rows);
    },
    onData: (result) => ipc.on(ptyChannels.onData, result),
    onTitle: (result) => ipc.on(ptyChannels.onTitle, result),
    onExit: (result) => ipc.on(ptyChannels.onExit, result),
    offData: () => ipc.removeAllListeners(ptyChannels.onData),
    offTitle: () => ipc.removeAllListeners(ptyChannels.onTitle),
    offExit: () => ipc.removeAllListeners(ptyChannels.onExit)
  },
  /** Managing app automatic updates */
  appUpdate: {
    statusError: (result) => ipc.on(appUpdateChannels.statusError, result),
    offStatusError: () => ipc.removeAllListeners(appUpdateChannels.statusError),
    status: (result) => ipc.on(appUpdateChannels.status, result),
    offStatus: () => ipc.removeAllListeners(appUpdateChannels.status),
    download: () => {
      extensionRendererApi.events_ipc.emit("app_update_download", {});
      ipc.send(appUpdateChannels.download);
    },
    cancel: () => {
      extensionRendererApi.events_ipc.emit("app_update_cancel", {});
      ipc.send(appUpdateChannels.cancel);
    },
    install: () => {
      extensionRendererApi.events_ipc.emit("app_update_install", {});
      ipc.send(appUpdateChannels.install);
    }
  },
  /** Managing app data directories */
  appData: {
    getCurrentPath: () => {
      extensionRendererApi.events_ipc.emit("app_data_get_current_path", {});
      return ipc.invoke(appDataChannels.getCurrentPath);
    },
    selectAnother: () => {
      extensionRendererApi.events_ipc.emit("app_data_select_another", {});
      return ipc.invoke(appDataChannels.selectAnother);
    },
    isAppDir: (dir) => {
      extensionRendererApi.events_ipc.emit("app_data_is_app_dir", { dir });
      return ipc.invoke(appDataChannels.isAppDir, dir);
    }
  },
  /** Managing app storage data */
  storage: {
    getCustom: (key) => {
      extensionRendererApi.events_ipc.emit("storage_get_custom", { key });
      return ipc.invoke(storageChannels.getCustom, key);
    },
    setCustom: (key, data) => {
      extensionRendererApi.events_ipc.emit("storage_set_custom", { key, data });
      ipc.send(storageChannels.setCustom, key, data);
    },
    get: (key) => {
      extensionRendererApi.events_ipc.emit("storage_get", { key });
      return ipc.invoke(storageChannels.get, key);
    },
    getAll: () => {
      extensionRendererApi.events_ipc.emit("storage_get_all", {});
      return ipc.invoke(storageChannels.getAll);
    },
    update: (key, updateData) => {
      extensionRendererApi.events_ipc.emit("storage_update", { key, updateData });
      return ipc.invoke(storageChannels.update, key, updateData);
    },
    clear: () => {
      extensionRendererApi.events_ipc.emit("storage_clear", {});
      return ipc.invoke(storageChannels.clear);
    }
  },
  appWindow: {
    onHotkeysChange: (result) => ipc.on(appWindowChannels.hotkeysChange, result),
    offHotkeysChange: () => ipc.removeAllListeners(appWindowChannels.hotkeysChange),
    onShowToast: (result) => ipc.on(appWindowChannels.showToast, result),
    offShowToast: () => ipc.removeAllListeners(appWindowChannels.showToast)
  },
  contextMenu: {
    resizeWindow: (dimensions) => {
      extensionRendererApi.events_ipc.emit("context_menu_resize_window", { dimensions });
      ipc.send(contextMenuChannels.resizeWindow, dimensions);
    },
    showWindow: () => {
      extensionRendererApi.events_ipc.emit("context_menu_show_window", {});
      ipc.send(contextMenuChannels.showWindow);
    },
    hideWindow: () => {
      extensionRendererApi.events_ipc.emit("context_menu_hide_window", {});
      ipc.send(contextMenuChannels.hideWindow);
    },
    onInitView: (result) => ipc.on(contextMenuChannels.onInitView, result),
    offInitView: () => ipc.removeAllListeners(contextMenuChannels.onInitView),
    openTerminateAI: (id) => {
      extensionRendererApi.events_ipc.emit("context_menu_open_terminate_ai", { id });
      ipc.send(contextMenuChannels.openTerminateAI, id);
    },
    openTerminateTab: (id, customPosition) => {
      extensionRendererApi.events_ipc.emit("context_menu_open_terminate_tab", { id, customPosition });
      ipc.send(contextMenuChannels.openTerminateTab, id, customPosition);
    },
    openCloseApp: () => {
      extensionRendererApi.events_ipc.emit("context_menu_open_close_app", {});
      ipc.send(contextMenuChannels.openCloseApp);
    },
    onFind: (result) => ipc.on(contextMenuChannels.onFind, result),
    offFind: () => ipc.removeAllListeners(contextMenuChannels.onFind),
    onTerminateAI: (result) => ipc.on(contextMenuChannels.onTerminateAI, result),
    offTerminateAI: () => ipc.removeAllListeners(contextMenuChannels.onTerminateAI),
    onTerminateTab: (result) => ipc.on(contextMenuChannels.onTerminateTab, result),
    offTerminateTab: () => ipc.removeAllListeners(contextMenuChannels.onTerminateTab),
    onCloseApp: (result) => ipc.on(contextMenuChannels.onCloseApp, result),
    offCloseApp: () => ipc.removeAllListeners(contextMenuChannels.onCloseApp),
    onZoom: (result) => ipc.on(contextMenuChannels.onZoom, result),
    offZoom: () => ipc.removeAllListeners(contextMenuChannels.onZoom),
    relaunchAI: (id) => {
      extensionRendererApi.events_ipc.emit("context_menu_relaunch_ai", { id });
      ipc.send(contextMenuChannels.relaunchAI, id);
    },
    onRelaunchAI: (result) => ipc.on(contextMenuChannels.onRelaunchAI, result),
    offRelaunchAI: () => ipc.removeAllListeners(contextMenuChannels.onRelaunchAI),
    stopAI: (id) => {
      extensionRendererApi.events_ipc.emit("context_menu_stop_ai", { id });
      ipc.send(contextMenuChannels.stopAI, id);
    },
    onStopAI: (result) => ipc.on(contextMenuChannels.onStopAI, result),
    offStopAI: () => ipc.removeAllListeners(contextMenuChannels.onStopAI),
    removeTab: (tabID) => {
      extensionRendererApi.events_ipc.emit("context_menu_remove_tab", { tabID });
      ipc.send(contextMenuChannels.removeTab, tabID);
    },
    onRemoveTab: (result) => ipc.on(contextMenuChannels.onRemoveTab, result),
    offRemoveTab: () => ipc.removeAllListeners(contextMenuChannels.onRemoveTab)
  },
  tab: {
    onNewTab: (result) => ipc.on(tabsChannels.onNewTab, result),
    offNewTab: () => ipc.removeAllListeners(tabsChannels.onNewTab)
  },
  contextItems: {
    copy: (id) => {
      extensionRendererApi.events_ipc.emit("context_items_copy", { id });
      ipc.send(contextMenuChannels.copy, id);
    },
    paste: (id) => {
      extensionRendererApi.events_ipc.emit("context_items_paste", { id });
      ipc.send(contextMenuChannels.paste, id);
    },
    replaceMisspelling: (id, text) => {
      extensionRendererApi.events_ipc.emit("context_items_replace_misspelling", { id, text });
      ipc.send(contextMenuChannels.replaceMisspelling, id, text);
    },
    selectAll: (id) => {
      extensionRendererApi.events_ipc.emit("context_items_select_all", { id });
      ipc.send(contextMenuChannels.selectAll, id);
    },
    undo: (id) => {
      extensionRendererApi.events_ipc.emit("context_items_undo", { id });
      ipc.send(contextMenuChannels.undo, id);
    },
    redo: (id) => {
      extensionRendererApi.events_ipc.emit("context_items_redo", { id });
      ipc.send(contextMenuChannels.redo, id);
    },
    newTab: (url) => {
      extensionRendererApi.events_ipc.emit("context_items_new_tab", { url });
      ipc.send(contextMenuChannels.newTab, url);
    },
    openExternal: (url) => {
      extensionRendererApi.events_ipc.emit("context_items_open_external", { url });
      ipc.send(contextMenuChannels.openExternal, url);
    },
    downloadImage: (id, url) => {
      extensionRendererApi.events_ipc.emit("context_items_download_image", { id, url });
      ipc.send(contextMenuChannels.downloadImage, id, url);
    },
    navigate: (id, action) => {
      extensionRendererApi.events_ipc.emit("context_items_navigate", { id, action });
      ipc.send(contextMenuChannels.navigate, id, action);
    }
  },
  browser: {
    createBrowser: (id) => {
      extensionRendererApi.events_ipc.emit("browser_create", { id });
      ipc.send(browserChannels.createBrowser, id);
    },
    removeBrowser: (id) => {
      extensionRendererApi.events_ipc.emit("browser_remove", { id });
      ipc.send(browserChannels.removeBrowser, id);
    },
    loadURL: (id, url) => {
      extensionRendererApi.events_ipc.emit("browser_load_url", { id, url });
      ipc.send(browserChannels.loadURL, id, url);
    },
    setVisible: (id, visible) => {
      extensionRendererApi.events_ipc.emit("browser_set_visible", { id, visible });
      ipc.send(browserChannels.setVisible, id, visible);
    },
    openFindInPage: (id, customPosition) => {
      extensionRendererApi.events_ipc.emit("browser_open_find_in_page", { id, customPosition });
      ipc.send(browserChannels.openFindInPage, id, customPosition);
    },
    openZoom: (id) => {
      extensionRendererApi.events_ipc.emit("browser_open_zoom", { id });
      ipc.send(browserChannels.openZoom, id);
    },
    findInPage: (id, value, options) => {
      extensionRendererApi.events_ipc.emit("browser_find_in_page", { id, value, options });
      ipc.send(browserChannels.findInPage, id, value, options);
    },
    stopFindInPage: (id, action) => {
      extensionRendererApi.events_ipc.emit("browser_stop_find_in_page", { id, action });
      ipc.send(browserChannels.stopFindInPage, id, action);
    },
    focusWebView: (id) => {
      extensionRendererApi.events_ipc.emit("browser_focus_web_view", { id });
      ipc.send(browserChannels.focusWebView, id);
    },
    clearCache: () => {
      extensionRendererApi.events_ipc.emit("browser_clear_cache", {});
      ipc.send(browserChannels.clearCache);
    },
    clearCookies: () => {
      extensionRendererApi.events_ipc.emit("browser_clear_cookies", {});
      ipc.send(browserChannels.clearCookies);
    },
    setZoomFactor: (id, factor) => {
      extensionRendererApi.events_ipc.emit("browser_set_zoom_factor", { id, factor });
      ipc.send(browserChannels.setZoomFactor, id, factor);
    },
    reload: (id) => {
      extensionRendererApi.events_ipc.emit("browser_reload", { id });
      ipc.send(browserChannels.reload, id);
    },
    goBack: (id) => {
      extensionRendererApi.events_ipc.emit("browser_go_back", { id });
      ipc.send(browserChannels.goBack, id);
    },
    goForward: (id) => {
      extensionRendererApi.events_ipc.emit("browser_go_forward", { id });
      ipc.send(browserChannels.goForward, id);
    },
    onCanGo: (result) => ipc.on(browserChannels.onCanGo, result),
    offCanGo: () => ipc.removeAllListeners(browserChannels.onCanGo),
    onIsLoading: (result) => ipc.on(browserChannels.isLoading, result),
    offIsLoading: () => ipc.removeAllListeners(browserChannels.isLoading),
    onTitleChange: (result) => ipc.on(browserChannels.onTitleChange, result),
    offTitleChange: () => ipc.removeAllListeners(browserChannels.onTitleChange),
    onFavIconChange: (result) => ipc.on(browserChannels.onFavIconChange, result),
    offFavIconChange: () => ipc.removeAllListeners(browserChannels.onFavIconChange),
    onUrlChange: (result) => ipc.on(browserChannels.onUrlChange, result),
    offUrlChange: () => ipc.removeAllListeners(browserChannels.onUrlChange),
    onDomReady: (result) => ipc.on(browserChannels.onDomReady, result),
    offDomReady: () => ipc.removeAllListeners(browserChannels.onDomReady),
    getUserAgent: (type) => {
      extensionRendererApi.events_ipc.emit("browser_get_user_agent", { type });
      return ipc.invoke(browserChannels.getUserAgent, type);
    },
    updateUserAgent: () => {
      extensionRendererApi.events_ipc.emit("browser_update_user_agent", {});
      ipc.send(browserChannels.updateUserAgent);
    },
    addOffset: (id, offset) => {
      extensionRendererApi.events_ipc.emit("browser_add_offset", { id, offset });
      ipc.send(browserChannels.addOffset, id, offset);
    },
    clearHistory: (selected) => ipc.send(browserChannels.clearHistory, selected)
  },
  statics: {
    pull: () => {
      extensionRendererApi.events_ipc.emit("statics_pull", {});
      return ipc.invoke(staticsChannels.pull);
    },
    getReleases: () => {
      extensionRendererApi.events_ipc.emit("statics_get_releases", {});
      return ipc.invoke(staticsChannels.getReleases);
    },
    getInsider: () => {
      extensionRendererApi.events_ipc.emit("statics_get_insider", {});
      return ipc.invoke(staticsChannels.getInsider);
    },
    getNotification: () => {
      extensionRendererApi.events_ipc.emit("statics_get_notification", {});
      return ipc.invoke(staticsChannels.getNotification);
    },
    getModules: () => {
      extensionRendererApi.events_ipc.emit("statics_get_modules", {});
      return ipc.invoke(staticsChannels.getModules);
    },
    getExtensions: () => {
      extensionRendererApi.events_ipc.emit("statics_get_extensions", {});
      return ipc.invoke(staticsChannels.getExtensions);
    },
    getExtensionsEA: () => {
      extensionRendererApi.events_ipc.emit("statics_get_extensions_ea", {});
      return ipc.invoke(staticsChannels.getExtensionsEA);
    },
    getPatrons: () => {
      extensionRendererApi.events_ipc.emit("statics_get_patrons", {});
      return ipc.invoke(staticsChannels.getPatrons);
    }
  },
  events: {
    card_PreCommandUninstall: (preCommands) => ipc.send(eventsChannels.card_PreCommandUninstall, preCommands)
  },
  downloadManager: {
    onDownloadCount: (result) => ipc.on(browserDownloadChannels.mainDownloadCount, result),
    offDownloadCount: () => ipc.removeAllListeners(browserDownloadChannels.mainDownloadCount),
    onDlStart: (result) => ipc.on(browserDownloadChannels.onDlStart, result),
    offDlStart: () => ipc.removeAllListeners(browserDownloadChannels.onDlStart),
    onProgress: (result) => ipc.on(browserDownloadChannels.onProgress, result),
    offProgress: () => ipc.removeAllListeners(browserDownloadChannels.onProgress),
    onDone: (result) => ipc.on(browserDownloadChannels.onDone, result),
    offDone: () => ipc.removeAllListeners(browserDownloadChannels.onDone),
    openMenu: () => ipc.send(browserDownloadChannels.openDownloadsMenu),
    openItem: (name, action) => ipc.send(browserDownloadChannels.openItem, name, action),
    cancel: (name) => ipc.send(browserDownloadChannels.cancel, name),
    pause: (name) => ipc.send(browserDownloadChannels.pause, name),
    resume: (name) => ipc.send(browserDownloadChannels.resume, name),
    clear: (name) => ipc.send(browserDownloadChannels.clear, name)
  },
  customNotification: {
    onOpen: (result) => ipc.on(customNotifChannels.onOpen, result),
    onClose: (result) => ipc.on(customNotifChannels.onClose, result),
    btnPress: (btnId, notifKey) => ipc.send(customNotifChannels.onBtnPress, btnId, notifKey),
    offOpen: () => ipc.removeAllListeners(customNotifChannels.onOpen),
    offClose: () => ipc.removeAllListeners(customNotifChannels.onClose)
  }
};

const {isEmpty: isEmpty$2} = await importShared('lodash');

function formatNumber(num) {
  const suffixes = ["", "K", "M", "B", "T"];
  const magnitude = Math.floor(Math.log10(Math.abs(num)) / 3);
  if (magnitude === 0 || !Number.isFinite(num)) return num.toString();
  const scaled = num / Math.pow(10, magnitude * 3);
  return `${scaled.toFixed(1).replace(/\.0$/, "")}${suffixes[magnitude]}`;
}
function convertBlobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
function searchInStrings(searchText, targetTexts) {
  if (isEmpty$2(searchText) || !targetTexts) return true;
  const searchWords = searchText.toLowerCase().split(/\s+/);
  const lowerTargetTexts = targetTexts.filter(Boolean).map((text) => text.toLowerCase());
  return searchWords.every((word) => lowerTargetTexts.some((text) => text.includes(word)));
}

const emitter = mitt();
const emitter_ipc = mitt();
const extensionsData = {
  customizePages: {
    home: {
      replace: {
        searchAndFilter: void 0,
        categories: void 0,
        searchResult: void 0
      },
      add: {
        top: [],
        bottom: [],
        scrollTop: [],
        scrollBottom: [],
        pinCategory: [],
        recentlyCategory: [],
        allCategory: []
      }
    },
    audio: {
      add: {
        top: [],
        bottom: [],
        scrollTop: [],
        scrollBottom: [],
        cardsContainer: []
      }
    },
    image: {
      add: {
        top: [],
        bottom: [],
        scrollTop: [],
        scrollBottom: [],
        cardsContainer: []
      }
    },
    text: {
      add: {
        top: [],
        bottom: [],
        scrollTop: [],
        scrollBottom: [],
        cardsContainer: []
      }
    },
    settings: {
      add: {
        navButton: [],
        content: []
      }
    },
    dashboard: {
      add: {
        navButton: [],
        content: []
      }
    },
    tools: {
      addComponent: []
    }},
  cards: {
    replace: void 0,
    replaceComponent: void 0,
    customize: {
      header: void 0,
      body: void 0,
      footer: void 0,
      menu: {
        replace: void 0,
        addSection: []
      }
    }
  },
  replaceMarkdownViewer: void 0
};
const extensionRendererApi = {
  events: {
    on: emitter.on,
    off: emitter.off,
    emit: emitter.emit,
    getListenerCount: (eventName) => {
      const listeners = emitter.all.get(eventName);
      return listeners ? listeners.length : 0;
    }
  },
  events_ipc: {
    on: emitter_ipc.on,
    off: emitter_ipc.off,
    emit: emitter_ipc.emit,
    getListenerCount: (eventName) => {
      const listeners = emitter_ipc.all.get(eventName);
      return listeners ? listeners.length : 0;
    }
  }};

const {includes} = await importShared('lodash');

const {useSelector: useSelector$2} = await importShared('react-redux');
const {
  installedCards,
  autoUpdateCards,
  pinnedCards,
  recentlyUsedCards,
  autoUpdateExtensions,
  duplicated,
  checkUpdateInterval
} = await rendererIpc.storage.get("cards");
const { homeCategory } = await rendererIpc.storage.get("app");
const initialState$2 = {
  autoUpdate: autoUpdateCards,
  installedCards,
  pinnedCards,
  updateAvailable: [],
  updatingCards: [],
  runningCard: [],
  recentlyUsedCards,
  homeCategory,
  autoUpdateExtensions,
  updatingExtensions: void 0,
  duplicates: duplicated,
  checkUpdateInterval,
  activeTab: ""
};
const cardsSlice = createSlice({
  initialState: initialState$2,
  name: "cards",
  reducers: {
    addUpdateAvailable: (state, action) => {
      if (!includes(state.updateAvailable, action.payload)) {
        state.updateAvailable = [...state.updateAvailable, action.payload];
      }
    },
    setUpdateAvailable: (state, action) => {
      state.updateAvailable = action.payload;
    },
    removeUpdateAvailable: (state, action) => {
      state.updateAvailable = state.updateAvailable.filter((card) => card !== action.payload);
    },
    setUpdatingExtensions: (state, action) => {
      state.updatingExtensions = action.payload;
    },
    setUpdateInterval: (state, action) => {
      state.checkUpdateInterval = action.payload;
    },
    addUpdatingCard: (state, action) => {
      if (!includes(state.updatingCards, action.payload)) {
        state.updatingCards = [...state.updatingCards, action.payload];
      }
    },
    removeUpdatingCard: (state, action) => {
      const cardId = action.payload;
      state.updatingCards = state.updatingCards.filter((card) => card.id !== cardId);
    },
    setAutoUpdate: (state, action) => {
      state.autoUpdate = action.payload;
    },
    setAutoUpdateExtensions: (state, action) => {
      state.autoUpdateExtensions = action.payload;
    },
    setInstalledCards: (state, action) => {
      state.installedCards = action.payload;
    },
    setPinnedCards: (state, action) => {
      state.pinnedCards = action.payload;
    },
    setHomeCategory: (state, action) => {
      state.homeCategory = action.payload;
    },
    setRecentlyUsedCards: (state, action) => {
      state.recentlyUsedCards = action.payload;
    },
    setDuplicates: (state, action) => {
      state.duplicates = action.payload;
    },
    addRunningEmpty: (state, action) => {
      const { tabId, type } = action.payload;
      const id = `${tabId}_${type}`;
      const currentView = type === "browser" ? "browser" : "terminal";
      state.runningCard = [
        ...state.runningCard,
        {
          tabId,
          type,
          id,
          currentView,
          webUIAddress: "",
          customAddress: "",
          currentAddress: "",
          browserTitle: "Browser",
          startTime: (/* @__PURE__ */ new Date()).toString(),
          isEmptyRunning: true
        }
      ];
      if (type !== "terminal") rendererIpc.browser.createBrowser(id);
      if (type !== "browser") rendererIpc.pty.emptyProcess(id, "start");
    },
    addRunningCard: (state, action) => {
      const { tabId, id } = action.payload;
      state.runningCard = [
        ...state.runningCard,
        {
          tabId,
          id,
          type: "both",
          webUIAddress: "",
          customAddress: "",
          currentAddress: "",
          browserTitle: "Browser",
          currentView: "terminal",
          startTime: (/* @__PURE__ */ new Date()).toString(),
          isEmptyRunning: false
        }
      ];
      rendererIpc.browser.createBrowser(id);
    },
    setRunningCardAddress: (state, action) => {
      const { tabId, address } = action.payload;
      state.runningCard = state.runningCard.map(
        (card) => card.tabId === tabId ? {
          ...card,
          webUIAddress: address
        } : card
      );
    },
    setRunningCardCustomAddress: (state, action) => {
      const { tabId, address } = action.payload;
      state.runningCard = state.runningCard.map(
        (card) => card.tabId === tabId ? {
          ...card,
          customAddress: address
        } : card
      );
    },
    setRunningCardCurrentAddress: (state, action) => {
      const { tabId, address } = action.payload;
      state.runningCard = state.runningCard.map(
        (card) => card.tabId === tabId ? {
          ...card,
          currentAddress: address
        } : card
      );
    },
    setRunningCardView: (state, action) => {
      const { tabId, view } = action.payload;
      state.runningCard = state.runningCard.map((card) => card.tabId === tabId ? { ...card, currentView: view } : card);
    },
    setRunningCardBrowserTitle: (state, action) => {
      const { tabId, title } = action.payload;
      state.runningCard = state.runningCard.map((card) => card.tabId === tabId ? { ...card, browserTitle: title } : card);
    },
    toggleRunningCardView: (state, action) => {
      if (!state.runningCard) return;
      const { tabId } = action.payload;
      state.runningCard = state.runningCard.map((card) => {
        const currentView = card.currentView === "browser" ? "terminal" : "browser";
        return card.tabId === tabId ? { ...card, currentView } : card;
      });
    },
    stopRunningCard: (state, action) => {
      const id = state.runningCard.find((card) => card.tabId === action.payload.tabId)?.id;
      if (id) rendererIpc.browser.removeBrowser(id);
      state.runningCard = state.runningCard.filter((card) => card.tabId !== action.payload.tabId);
    }
  }
});
const useCardsState = (name) => useSelector$2((state) => state.cards[name]);
const cardsActions = cardsSlice.actions;

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
const storageData = await rendererIpc.storage.get("app");
let darkMode = true;
if (storageData.darkMode === "dark") {
  darkMode = true;
} else if (storageData.darkMode === "light") {
  darkMode = false;
} else {
  const systemDark = await rendererIpc.win.getSystemDarkMode();
  darkMode = systemDark === "dark";
}
const initialState$1 = {
  darkMode,
  fullscreen: false,
  isOnline: false,
  maximized: false,
  onFocus: true,
  navBar: true,
  appTitle: void 0,
  toastPlacement: "top-center"
};
const appSlice = createSlice({
  name: "app",
  initialState: initialState$1,
  reducers: {
    setAppState: (state, action) => {
      state[action.payload.key] = action.payload.value;
    },
    setAppTitle: (state, action) => {
      state.appTitle = action.payload;
    },
    setToastPlacement: (state, action) => {
      state.toastPlacement = action.payload;
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
const appActions = appSlice.actions;

const {addToast,Button: Button$2} = await importShared('@heroui/react');

const {isEmpty: isEmpty$1,isNil} = await importShared('lodash');

const {Fragment: Fragment$1,useEffect: useEffect$4,useMemo,useState: useState$3} = await importShared('react');
function useInstalledCard(cardId) {
  const installedCards = useCardsState("installedCards");
  return useMemo(() => installedCards.find((card) => card.id === cardId), [installedCards, cardId]);
}
function useUpdatingCard(cardId) {
  const updatingCards = useCardsState("updatingCards");
  return useMemo(() => updatingCards.find((card) => card.id === cardId), [updatingCards, cardId]);
}
function useUpdateAvailable(cardId) {
  const updateAvailable = useCardsState("updateAvailable");
  return useMemo(() => updateAvailable.includes(cardId), [updateAvailable, cardId]);
}
function useIsAutoUpdateCard(cardId) {
  const autoUpdate = useCardsState("autoUpdate");
  return useMemo(() => autoUpdate.includes(cardId), [autoUpdate, cardId]);
}
function useIsAutoUpdateExtensions(cardId) {
  const autoUpdate = useCardsState("autoUpdateExtensions");
  return useMemo(() => autoUpdate.includes(cardId), [autoUpdate, cardId]);
}
function useIsPinnedCard(cardId) {
  const pinnedCards = useCardsState("pinnedCards");
  return useMemo(() => pinnedCards.includes(cardId), [pinnedCards, cardId]);
}
function topToast(options) {
  const { title, color = "success", timeout = 2e3, promise, placement } = options;
  addToast({
    title,
    color,
    variant: "flat",
    size: "sm",
    timeout,
    promise,
    classNames: {
      base: placement.includes("top") ? "top-10" : `right-6 bottom-8 flex flex-col gap-y-2 cursor-default ${color === "danger" && "pt-6"}`
    },
    endContent: placement.includes("bottom") && color === "danger" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full flex flex-row justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button$2, { size: "sm", color: "warning", variant: "light", children: "Restart App" }) }) : null
  });
}
const lynxTopToast = (dispatch, placement = "top-center") => {
  dispatch(appActions.setToastPlacement(placement));
  return {
    success: (title, timeout) => topToast({ title, color: "success", timeout, placement }),
    error: (title, timeout) => topToast({ title, color: "danger", timeout, placement }),
    warning: (title, timeout) => topToast({ title, color: "warning", timeout, placement }),
    info: (title, timeout) => topToast({ title, color: "default", timeout, placement }),
    loading: (title, promise) => topToast({ title, color: "default", promise, timeout: 1, placement })
  };
};
const isLinuxPortable = window.isPortable === "linux";

const {Image: Image$1} = await importShared('@heroui/react');

const {isEmpty} = await importShared('lodash');

const {useEffect: useEffect$3,useState: useState$2} = await importShared('react');
function renderImage(type, img) {
  const commonProps = {
    src: img,
    className: "size-full object-cover",
    isZoomed: true,
    removeWrapper: true,
    disableSkeleton: true
  };
  return type === "avatar" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Image$1, { ...commonProps, className: "absolute size-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute size-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image$1, { ...commonProps, radius: "none" }) });
}
async function fetchRepoDetails(url) {
  if (!url) return void 0;
  const { owner, repo, platform } = extractGitUrl(url);
  const cacheKey = `${owner}_${repo}_repo_details`;
  const cachedData = localStorage.getItem(cacheKey);
  if (cachedData) return JSON.parse(cachedData);
  try {
    let apiUrl;
    let repoDetails;
    if (platform === "github") {
      apiUrl = `https://api.github.com/repos/${owner}/${repo}`;
      const response = await fetch(apiUrl);
      const { forks_count, open_issues_count, stargazers_count, size } = await response.json();
      if (!stargazers_count || !forks_count || !open_issues_count || !size) return void 0;
      repoDetails = {
        forks: forks_count,
        issues: open_issues_count,
        stars: stargazers_count,
        size
      };
      localStorage.setItem(cacheKey, JSON.stringify(repoDetails));
    } else if (platform === "gitlab") {
      apiUrl = `https://gitlab.com/api/v4/projects/${encodeURIComponent(`${owner}/${repo}`)}`;
      const response = await fetch(apiUrl);
      const { forks_count, star_count } = await response.json();
      if (!star_count || !forks_count) return void 0;
      repoDetails = {
        forks: forks_count,
        stars: star_count
      };
      localStorage.setItem(cacheKey, JSON.stringify(repoDetails));
    } else {
      console.error(`Unsupported platform: ${platform}`);
      return void 0;
    }
    return repoDetails;
  } catch (error) {
    console.error("Error fetching repo details:", error);
    return void 0;
  }
}
function useDevInfo(repoUrl) {
  const isOnline = useAppState("isOnline");
  const [devInfo, setDevInfo] = useState$2({ name: "Unknown", picUrl: "" });
  useEffect$3(() => {
    if (!repoUrl) return;
    const fetchDevInfo = async () => {
      const { owner, repo, platform } = extractGitUrl(repoUrl);
      const cacheKey = `${owner}_${repo}_dev_info`;
      const cachedData = localStorage.getItem(cacheKey);
      if (cachedData) {
        setDevInfo(JSON.parse(cachedData));
        return;
      }
      if (!isOnline) {
        setDevInfo({ name: "Unknown", picUrl: "" });
        return;
      }
      try {
        let apiUrl;
        let newDevInfo;
        if (platform === "github") {
          apiUrl = `https://api.github.com/repos/${owner}/${repo}`;
          const response = await fetch(apiUrl);
          const {
            owner: { login, avatar_url }
          } = await response.json();
          if (login && avatar_url) {
            newDevInfo = { name: login, picUrl: avatar_url };
            localStorage.setItem(cacheKey, JSON.stringify(newDevInfo));
          } else {
            newDevInfo = { name: "Unknown", picUrl: "" };
            console.error("Invalid GitHub API response");
          }
        } else if (platform === "gitlab") {
          apiUrl = `https://gitlab.com/api/v4/projects/${encodeURIComponent(`${owner}/${repo}`)}`;
          const response = await fetch(apiUrl);
          const resp = await response.json();
          const { avatar_url: a_url } = resp;
          const {
            namespace: { avatar_url, name }
          } = resp;
          console.info("resp", resp);
          if (name && a_url) {
            newDevInfo = { name, picUrl: a_url };
            localStorage.setItem(cacheKey, JSON.stringify(newDevInfo));
          } else if (name && avatar_url) {
            newDevInfo = { name, picUrl: avatar_url };
            localStorage.setItem(cacheKey, JSON.stringify(newDevInfo));
          } else {
            newDevInfo = { name: "Unknown", picUrl: "" };
            console.error("Invalid GitLab API response");
          }
        } else {
          newDevInfo = { name: "Unknown", picUrl: "" };
          console.error(`Unsupported platform: ${platform}`);
        }
        setDevInfo(newDevInfo);
      } catch (error) {
        console.error("Error fetching dev info:", error);
        setDevInfo({ name: "Unknown", picUrl: "" });
      }
    };
    fetchDevInfo();
  }, [repoUrl, isOnline]);
  return devInfo;
}
function useRepoDetails(url) {
  const isOnline = useAppState("isOnline");
  const [repoDetails, setRepoDetails] = useState$2(void 0);
  useEffect$3(() => {
    if (!url) return;
    const repoDetails2 = async () => {
      const details = await fetchRepoDetails(url);
      setRepoDetails(details);
    };
    repoDetails2();
  }, [url, isOnline]);
  return repoDetails;
}
function useCachedImageUrl(id, url) {
  const isOnline = useAppState("isOnline");
  const [imageSrc, setImageSrc] = useState$2("");
  useEffect$3(() => {
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
function useLoadImage(id, url, type = "bg", darkMode) {
  const isOnline = useAppState("isOnline");
  const [imageSrc, setImageSrc] = useState$2(void 0);
  useEffect$3(() => {
    if (isEmpty(url)) return;
    const fetchAndStoreImage = async () => {
      try {
        const response = await fetch(url);
        const data = await response.blob();
        const imageDataUrl = await convertBlobToDataUrl(data);
        localStorage.setItem(id, imageDataUrl);
        setImageSrc(renderImage(type, imageDataUrl));
      } catch (error) {
        console.error("Error fetching and storing image:", error);
        setImageSrc(
          type === "avatar" ? /* @__PURE__ */ jsxRuntimeExports.jsx(User_Icon, { className: "size-full p-2 dark:bg-LynxRaisinBlack/70 bg-white/70" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `${"lightPattern"}` })
        );
      }
    };
    const cachedImage = localStorage.getItem(id);
    if (cachedImage) {
      setImageSrc(renderImage(type, cachedImage));
    } else if (isOnline) {
      fetchAndStoreImage();
    } else {
      setImageSrc(
        type === "avatar" ? /* @__PURE__ */ jsxRuntimeExports.jsx(User_Icon, { className: "size-full p-2 dark:bg-LynxRaisinBlack/70 bg-white/70" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `${"lightPattern"} ` })
      );
    }
  }, [id, url, type, darkMode, isOnline]);
  return imageSrc;
}

/*!
 * OverlayScrollbars
 * Version: 2.12.0
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

const C$1 = "width";

const $ = "height";

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
  const u = function invokeFunctionToDebounce(n) {
    if (i) {
      i();
    }
    if (r) {
      r();
    }
    a = i = r = l = void 0;
    t.apply(this, n);
  };
  const mergeParms = t => c && l ? c(l, t) : t;
  const flush = () => {
    if (i && l) {
      u(mergeParms(l) || l);
    }
  };
  const f = function debouncedFn() {
    const t = from(arguments);
    const n = getDebouncer(o);
    if (n) {
      const o = getDebouncer(s);
      const c = mergeParms(t);
      const f = c || t;
      const _ = u.bind(0, f);
      if (i) {
        i();
      }
      if (e && !a) {
        _();
        a = true;
        i = n((() => a = void 0));
      } else {
        i = n(_);
        if (o && !r) {
          r = o(flush);
        }
      }
      l = f;
    } else {
      u(t);
    }
  };
  f.O = flush;
  return f;
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
    C: t => s(domTokenListOperation(t, "delete")),
    $: t => s(domTokenListOperation(t, "add")),
    H: t => {
      const n = getDomTokensArray(t);
      return n.reduce(((t, n) => t && o.includes(n)), n.length > 0);
    }
  };
};

const removeAttrClass = (t, n, o) => {
  domTokenListAttr(t, n).C(o);
  return bind(addAttrClass, t, n, o);
};

const addAttrClass = (t, n, o) => {
  domTokenListAttr(t, n).$(o);
  return bind(removeAttrClass, t, n, o);
};

const addRemoveAttrClass = (t, n, o, s) => (s ? addAttrClass : removeAttrClass)(t, n, o);

const hasAttrClass = (t, n, o) => domTokenListAttr(t, n).H(o);

const createDomTokenListClass = t => domTokenListAttr(t, "class");

const removeClass = (t, n) => {
  createDomTokenListClass(t).C(n);
};

const addClass = (t, n) => {
  createDomTokenListClass(t).$(n);
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

const T = {
  w: 0,
  h: 0
};

const getElmWidthHeightProperty = (t, n) => n ? {
  w: n[`${t}Width`],
  h: n[`${t}Height`]
} : T;

const getWindowSize = t => getElmWidthHeightProperty("inner", t || n);

const I = bind(getElmWidthHeightProperty, "offset");

const A = bind(getElmWidthHeightProperty, "client");

const D = bind(getElmWidthHeightProperty, "scroll");

const getFractionalSize = t => {
  const n = parseFloat(getStyles(t, C$1)) || 0;
  const o = parseFloat(getStyles(t, $)) || 0;
  return {
    w: n - e(n),
    h: o - e(o)
  };
};

const getBoundingClientRect = t => t.getBoundingClientRect();

const hasDimensions = t => !!t && elementHasDimensions(t);

const domRectHasDimensions = t => !!(t && (t[$] || t[C$1]));

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
  const c = (e = s && s.T) != null ? e : true;
  const r = s && s.I || false;
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

const Ct = "__osSizeObserverPlugin";

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

const Tt = {
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

let It;

const getNonce = () => It;

const setNonce = t => {
  It = t;
};

let At;

const createEnvironment = () => {
  const getNativeScrollbarSize = (t, n, o) => {
    appendChildren(document.body, t);
    appendChildren(document.body, t);
    const s = A(t);
    const e = I(t);
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
  const g = assignDeep({}, Tt);
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
        const C = S && u !== O;
        const $ = inArray(g, e) && C;
        if (n && (w || !y)) {
          const n = b && C;
          const a = n && l && is(c, l);
          const _ = a ? !r(c, e, u, O) : !b || n;
          const d = _ && !i(o, !!a, t, s);
          each(p, (t => push(f, t)));
          each(h, (t => push(f, t)));
          v = v || d;
        }
        if (!n && y && C && !r(c, e, u, O)) {
          push(_, e);
          d = d || $;
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
  const e = getStaticPluginModuleInstance(Ct);
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
        const t = I(s);
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
  const C = {
    Ot: false,
    B: getDirectionIsRTL(p)
  };
  const $ = getEnvironment();
  const x = getStaticPluginModuleInstance(xt);
  const [H] = createCache({
    i: equalWH,
    o: {
      w: 0,
      h: 0
    }
  }, (() => {
    const s = x && x.R(t, n, C, $, o).Y;
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
      Ct: a !== n
    });
    assignDeep(C, {
      B: n
    });
    a = n;
  };
  const onTrinsicChanged = (t, n) => {
    const [o, e] = t;
    const c = {
      $t: e
    };
    assignDeep(C, {
      Ot: o
    });
    if (!n) {
      s(c);
    }
    return c;
  };
  const onSizeChanged = ({_t: t, ft: n}) => {
    const o = t && !n;
    const e = !o && $.U ? E : s;
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
  const [z, T] = b ? createTrinsicObserver(v, onTrinsicChanged) : [];
  const I = !w && createSizeObserver(v, onSizeChanged, {
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
      xt: t,
      _t: y
    });
  }), {
    p: 222,
    S: true
  });
  return [ () => {
    if (k) {
      k.observe(v);
    }
    const t = I && I();
    const n = z && z();
    const o = A();
    const s = $.G((t => {
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
  }, ({zt: t, Tt: n, It: o}) => {
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
      const n = T && T();
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
  }, C ];
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
  const C = {
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
      S.forEach(C.x.kt);
      m.forEach(C.y.kt);
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
    const l = C[n];
    push(t ? S : m, i);
    push(y, [ appendChildren(e, c), appendChildren(c, r), bind(removeElements, e), l && l.kt(i), s(i, scrollbarsAddRemoveClass, t) ]);
    return i;
  };
  const $ = bind(generateScrollbarDOM, true);
  const x = bind(generateScrollbarDOM, false);
  const appendElements = () => {
    appendChildren(O, S[0].Lt);
    appendChildren(O, m[0].Lt);
    return bind(runEachAndClear, y);
  };
  $();
  x();
  return [ {
    Pt: refreshScrollbarsHandleLength,
    Nt: refreshScrollbarsHandleOffset,
    qt: refreshScrollbarsScrollCoordinates,
    Bt: refreshScrollbarsScrollbarOffset,
    Ft: scrollbarsAddRemoveClass,
    jt: {
      Xt: S,
      Yt: $,
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
    const r = l ? C$1 : $;
    const i = l ? "left" : "top";
    const a = l ? "w" : "h";
    const u = l ? "x" : "y";
    const createRelativeHandleMove = (t, n) => s => {
      const {Rt: e} = o;
      const c = I(h)[a] - I(b)[a];
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
      const {button: y, isPrimary: O, pointerType: C} = o;
      const {pointers: $} = g;
      const x = y === 0 && O && w && ($ || []).includes(C);
      if (x) {
        runEachAndClear(f);
        m();
        const t = !l && (o.shiftKey || w === "instant");
        const g = bind(getBoundingClientRect, b);
        const y = bind(getBoundingClientRect, h);
        const getHandleOffset = (t, n) => (t || g())[i] - (n || y())[i];
        const O = e(getBoundingClientRect(d)[r]) / I(d)[a] || 1;
        const C = createRelativeHandleMove(getElementScroll(d)[u], 1 / O);
        const $ = o[s];
        const x = g();
        const H = y();
        const E = x[r];
        const z = getHandleOffset(x, H) + E / 2;
        const T = $ - H[i];
        const A = l ? 0 : T - z;
        const releasePointerCapture = t => {
          runEachAndClear(k);
          _.releasePointerCapture(t.pointerId);
        };
        const D = l || t;
        const M = v();
        const k = [ addEventListener(p, n, releasePointerCapture), addEventListener(p, "selectstart", (t => preventDefault(t)), {
          T: false
        }), addEventListener(h, n, releasePointerCapture), D && addEventListener(h, "pointermove", (t => C(A + (t[s] - $)))), D && (() => {
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
          C(A);
        } else if (!l) {
          const t = getStaticPluginModuleInstance(Et);
          if (t) {
            const n = t(C, A, E, (t => {
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
    T: false,
    I: true
  }), addEventListener(g, "pointerdown", (() => {
    const t = addEventListener(p, "click", (t => {
      n();
      stopAndPrevent(t);
    }), {
      A: true,
      I: true,
      T: false
    });
    const n = addEventListener(p, "pointerup pointercancel", (() => {
      n();
      setTimeout(t, 150);
    }), {
      I: true,
      T: true
    });
  }), {
    I: true,
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
  const {vt: C, Kt: $, bt: H} = e;
  const {Ft: z, Pt: T, Nt: I, qt: A, Bt: D} = m;
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
  const M = [ S, h, w, v, () => f(), addEventListener(C, "pointerover", onHostMouseEnter, {
    A: true
  }), addEventListener(C, "pointerenter", onHostMouseEnter), addEventListener(C, "pointerleave", (t => {
    if (isHoverablePointerType(t)) {
      r = false;
      if (l) {
        manageScrollbarsAutoHide(false);
      }
    }
  })), addEventListener(C, "pointermove", (t => {
    if (isHoverablePointerType(t) && i) {
      manageScrollbarsAutoHideInstantInteraction();
    }
  })), addEventListener($, "scroll", (t => {
    p((() => {
      I();
      manageScrollbarsAutoHideInstantInteraction();
    }));
    c(t);
    D();
  })) ];
  const k = getStaticPluginModuleInstance(xt);
  return [ () => bind(runEachAndClear, push(M, O())), ({zt: t, It: n, Qt: e, Zt: c}) => {
    const {tn: r, nn: d, sn: p, en: v} = c || {};
    const {Ct: g, ft: h} = e || {};
    const {B: w} = o;
    const {k: y, U: S} = getEnvironment();
    const {cn: m, j: O} = s;
    const [C, M] = t("showNativeOverlaidScrollbars");
    const [R, V] = t("scrollbars.theme");
    const [L, U] = t("scrollbars.visibility");
    const [P, N] = t("scrollbars.autoHide");
    const [q, B] = t("scrollbars.autoHideSuspend");
    const [F] = t("scrollbars.autoHideDelay");
    const [j, X] = t("scrollbars.dragScroll");
    const [Y, W] = t("scrollbars.clickScroll");
    const [J, G] = t("overflow");
    const K = h && !n;
    const Q = O.x || O.y;
    const Z = r || d || v || g || n;
    const tt = p || U || G;
    const nt = C && y.x && y.y;
    const ot = !S && !k;
    const st = nt || ot;
    const setScrollbarVisibility = (t, n, o) => {
      const s = t.includes(E$1) && (L === x || L === "auto" && n === E$1);
      z(vt, s, o);
      return s;
    };
    _ = F;
    if (K) {
      if (q && Q) {
        manageAutoHideSuspension(false);
        f();
        b((() => {
          f = addEventListener($, "scroll", bind(manageAutoHideSuspension, true), {
            A: true
          });
        }));
      } else {
        manageAutoHideSuspension(true);
      }
    }
    if (M || ot) {
      z(lt, st);
    }
    if (V) {
      z(u);
      z(R, true);
      u = R;
    }
    if (B && !q) {
      manageAutoHideSuspension(true);
    }
    if (N) {
      i = P === "move";
      l = P === "leave";
      a = P === "never";
      manageScrollbarsAutoHide(a, true);
    }
    if (X) {
      z(Ot, j);
    }
    if (W) {
      z(mt, !!Y);
    }
    if (tt) {
      const t = setScrollbarVisibility(J.x, m.x, true);
      const n = setScrollbarVisibility(J.y, m.y, false);
      const o = t && n;
      z(gt, !o);
    }
    if (Z) {
      I();
      T();
      D();
      if (v) {
        A();
      }
      z(bt, !O.x, true);
      z(bt, !O.y, false);
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
  const C = bind(w, S, i);
  const $ = bind(y, S, l);
  const elementHasOverflow = t => {
    const n = I(t);
    const o = D(t);
    const s = getStyles(t, m);
    const e = getStyles(t, O$1);
    return o.w - n.w > 0 && !overflowIsVisible(s) || o.h - n.h > 0 && !overflowIsVisible(e);
  };
  const x = C(d);
  const H = x === v;
  const E = H && g;
  const z = !H && $(p);
  const T = !H && x === z;
  const A = E ? b : x;
  const M = E ? A : v;
  const k = !H && y(S, r, _);
  const R = !T && z;
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
      I: true,
      T: false
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

const createTrinsicUpdateSegment = ({ht: t}) => ({Qt: n, un: o, It: s}) => {
  const {$t: e} = n || {};
  const {Ot: c} = o;
  const r = t && (e || s);
  if (r) {
    setStyles(t, {
      [$]: c && "100%"
    });
  }
};

const createPaddingUpdateSegment = ({vt: t, rn: n, L: o, V: s}, e) => {
  const [c, r] = createCache({
    i: equalTRBL,
    o: topRightBottomLeft()
  }, bind(topRightBottomLeft, t, "padding", ""));
  return ({zt: t, Qt: i, un: l, It: a}) => {
    let [u, f] = r(a);
    const {U: _} = getEnvironment();
    const {_t: d, xt: p, Ct: m} = i || {};
    const {B: O} = l;
    const [$, x] = t("paddingAbsolute");
    const H = a || p;
    if (d || f || H) {
      [u, f] = c(a);
    }
    const E = !s && (x || m || f);
    if (E) {
      const t = !$ || !n && !_;
      const s = u.r + u.l;
      const c = u.t + u.b;
      const r = {
        [y]: t && !O ? -s : 0,
        [S$1]: t ? -c : 0,
        [w$1]: t && O ? -s : 0,
        top: t ? -u.t : 0,
        right: t ? O ? -u.r : "auto" : 0,
        left: t ? O ? "auto" : -u.l : 0,
        [C$1]: t && `calc(100% + ${s}px)`
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
      I: true,
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
  const [C, $] = createCache(y, bind(D, i));
  const [z, T] = createCache(y);
  const [I] = createCache(S);
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
  return ({zt: n, Qt: o, un: l, It: a}, {_n: u}) => {
    const {_t: f, Ht: _, xt: b, Ct: w, ft: y, Et: S} = o || {};
    const x = P && P.R(t, s, l, e, n);
    const {X: H, Y: E, W: D} = x || {};
    const [q, F] = getShowNativeOverlaidScrollbars(n, e);
    const [j, X] = n("overflow");
    const Y = overflowIsVisible(j.x);
    const W = overflowIsVisible(j.y);
    const J = f || u || b || w || S || F;
    let G = O(a);
    let Q = $(a);
    let tt = T(a);
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
      const [o] = Q = C(a);
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
    const [ut, ft] = I({
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
      en: bt || ct
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
    const {dn: r, It: i, Tt: a, pn: u} = t;
    const f = r || {};
    const _ = !!i || !c;
    const v = {
      zt: createOptionCheck(n, f, _),
      dn: f,
      It: _
    };
    if (u) {
      g(v);
      return false;
    }
    const h = e || d(assignDeep({}, v, {
      Tt: a
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
    vn: p,
    gn: a
  }), {
    hn: u,
    bn: h
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
    const [g, h, b, w, y] = createSetups(t, a, (() => r), (({dn: t, It: n}, {Qt: o, Zt: s}) => {
      const {_t: e, Ct: c, $t: r, xt: i, Ht: l, ft: a} = o;
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
              dn: e
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
        const {vn: t, gn: n} = b();
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
        const {dt: t, vt: n, rn: o, L: s, ht: e, gt: c, Kt: r} = w.hn;
        const {jt: i, Jt: l} = w.bn;
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
                pn: true
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
        It: t,
        Tt: true
      }),
      destroy: bind(destroy, false),
      plugin: t => l[keys(t)[0]]
    };
    push(i, [ y ]);
    addInstance(c, S);
    registerPluginModuleInstances(M, OverlayScrollbars, [ S, u, l ]);
    if (cancelInitialization(w.hn.bt, !e && t.cancel)) {
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
  home: "home_page",
  imageGen: "imageGen_page",
  textGen: "textGen_page",
  audioGen: "audioGen_page",
  tools: "tools_page",
  games: "games_page",
  dashboard: "dashboard_page",
  extensions: "extension_page",
  modules: "modules_page",
  settings: "settings_page"
};
const PageTitles = {
  home: "Home",
  imageGen: "Image Generation",
  textGen: "Text Generation",
  audioGen: "Audio Generation",
  tools: "Tools",
  games: "Games",
  dashboard: "Dashboard",
  extensions: "Extensions",
  modules: "Modules",
  settings: "Settings"
};
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
const tabsSlice = createSlice({
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
const tabsActions = tabsSlice.actions;

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

const {Card: Card$2,CardBody: CardBody$1,CardHeader: CardHeader$1,Switch: Switch$1} = await importShared('@heroui/react');

function SettingsModal_Card({ onPress, title, onValueChange, isSelected, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card$2,
    {
      as: "div",
      className: "border-1 border-foreground-100 pt-2 px-2 hover:border-foreground-200 transition-all duration-200 mt-4",
      fullWidth: true,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader$1, { onClick: onPress, className: "flex flex-row justify-between cursor-pointer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Switch$1, { size: "md", isSelected, onValueChange })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardBody$1, { children })
      ]
    }
  );
}

const {Checkbox: Checkbox$1,CheckboxGroup} = await importShared('@heroui/react');

const {useCallback: useCallback$2,useEffect: useEffect$2,useState: useState$1} = await importShared('react');

const {useDispatch: useDispatch$4} = await importShared('react-redux');
function Settings_MetricVisibility() {
  const [isInvalid, setIsInvalid] = useState$1(false);
  const [defaultValues, setDefaultValues] = useState$1(["icon", "label", "value", "progress-bar"]);
  const [selected, setSelected] = useState$1([]);
  const metricVisibility = useSystemMonitorState("metricVisibility");
  const dispatch = useDispatch$4();
  useEffect$2(() => {
    const selectedResult = [];
    if (metricVisibility.icon) selectedResult.push("icon");
    if (metricVisibility.label) selectedResult.push("label");
    if (metricVisibility.value) selectedResult.push("value");
    if (metricVisibility.progressBar) selectedResult.push("progress-bar");
    setSelected(selectedResult);
    setDefaultValues(selectedResult);
  }, [metricVisibility]);
  const onValueChange = useCallback$2((value) => {
    if (value.length < 1) {
      setIsInvalid(true);
    } else {
      setIsInvalid(false);
      dispatch(
        systemMonitorActions.updateMetricVisibility({
          icon: value.includes("icon"),
          label: value.includes("label"),
          value: value.includes("value"),
          progressBar: value.includes("progress-bar")
        })
      );
    }
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    CheckboxGroup,
    {
      color: "primary",
      value: selected,
      isInvalid,
      orientation: "horizontal",
      defaultValue: defaultValues,
      onValueChange,
      label: "Choose Metric Visibility",
      description: "Select which elements to display for metrics in the status bar.",
      isRequired: true,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox$1, { value: "icon", children: "Icon" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox$1, { value: "label", children: "Label" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox$1, { value: "value", children: "Value" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox$1, { value: "progress-bar", children: "Process Bar" })
      ]
    }
  );
}

const {Button: Button$1,Card: Card$1,CardBody,CardHeader,Checkbox,Divider,Modal,ModalBody,ModalContent,ModalFooter,ModalHeader,NumberInput,Switch} = await importShared('@heroui/react');
const {useCallback: useCallback$1,useState} = await importShared('react');

const {useDispatch: useDispatch$3} = await importShared('react-redux');
const metrics = [
  {
    id: "temp",
    label: "Temperature",
    description: "Monitor temperature in real-time",
    Icon: Thermometer
  },
  { id: "usage", label: "Usage", description: "Track utilization percentage", Icon: Cpu },
  { id: "vram", label: "VRAM", description: "Monitor GPU memory usage", Icon: Database },
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
  const availableHardware = useSystemMonitorState("availableHardware");
  const [isSaving, setIsSaving] = useState(false);
  const updateState = (key, value) => dispatch(
    systemMonitorActions.updateState({
      key,
      value
    })
  );
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
      lynxTopToast(dispatch).success("Settings saved successfully!");
    }, 700);
    dispatch(systemMonitorActions.saveSettings());
  };
  const getMetricItem = useCallback$1(
    (item, type, name) => {
      const result = metrics.find((metric) => metric.id === item);
      if (!result) return null;
      let isSelected;
      let toggle;
      if (type === "uptime") {
        const upType = item === "uptimeSeconds" ? "app" : "system";
        isSelected = enabledMetrics.uptime[upType];
        const result2 = {
          ...enabledMetrics.uptime,
          [upType]: !isSelected
        };
        toggle = () => dispatch(systemMonitorActions.updateUptime(result2));
      } else {
        isSelected = !!enabledMetrics[type].find((metric) => metric.name === name)?.enabled.includes(item);
        toggle = () => {
          const targetMetric = enabledMetrics[type].find((metric) => metric.name === name);
          if (!targetMetric) return;
          const currentEnabled = new Set(targetMetric.enabled);
          if (currentEnabled.has(item)) {
            currentEnabled.delete(item);
          } else {
            currentEnabled.add(item);
          }
          const newEnabledMetrics = {
            ...enabledMetrics,
            [type]: enabledMetrics[type].map((metric) => {
              if (metric.name !== name) return metric;
              return {
                ...metric,
                enabled: Array.from(currentEnabled)
              };
            })
          };
          dispatch(systemMonitorActions.updateMetrics(newEnabledMetrics));
        };
      }
      const { Icon } = result;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center justify-between rounded-lg px-2 py-2 hover:bg-content2 transition-all duration-300 cursor-pointer",
          onClick: toggle,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "text-xl" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: result.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-default-500", children: result.description })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { color: "primary", onValueChange: toggle, isSelected })
          ]
        },
        result.id
      );
    },
    [enabledMetrics]
  );
  const toggleHardware = useCallback$1(
    (name, type, value) => {
      const isActive2 = enabledMetrics[type].find((metric) => metric.name === name)?.active;
      if (isActive2 || value !== true) {
        const result = {
          ...enabledMetrics,
          [type]: enabledMetrics[type].map((metric) => metric.name === name ? { ...metric, active: false } : metric)
        };
        dispatch(systemMonitorActions.updateMetrics(result));
      } else {
        const result = {
          ...enabledMetrics,
          [type]: enabledMetrics[type].map((metric) => metric.name === name ? { ...metric, active: true } : metric)
        };
        dispatch(systemMonitorActions.updateMetrics(result));
      }
    },
    [enabledMetrics]
  );
  const isActive = useCallback$1(
    (name, type) => {
      return enabledMetrics[type].find((metric) => metric.name === name)?.active || false;
    },
    [enabledMetrics]
  );
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
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Settings_MetricVisibility, {})
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Divider, { className: "my-4" }),
            availableHardware.gpu.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              SettingsModal_Card,
              {
                onPress: () => {
                  toggleHardware(item, "gpu");
                },
                onValueChange: (value) => {
                  toggleHardware(item, "gpu", value);
                },
                title: item,
                isSelected: isActive(item, "gpu"),
                children: [
                  getMetricItem("temp", "gpu", item),
                  getMetricItem("usage", "gpu", item),
                  getMetricItem("vram", "gpu", item)
                ]
              },
              `hardware_${item}_item`
            )),
            availableHardware.cpu.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              SettingsModal_Card,
              {
                onPress: () => {
                  toggleHardware(item, "cpu");
                },
                onValueChange: (value) => {
                  toggleHardware(item, "cpu", value);
                },
                title: item,
                isSelected: isActive(item, "cpu"),
                children: [
                  getMetricItem("temp", "cpu", item),
                  getMetricItem("usage", "cpu", item)
                ]
              },
              `hardware_${item}_item`
            )),
            availableHardware.memory.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              SettingsModal_Card,
              {
                onPress: () => {
                  toggleHardware(item, "memory");
                },
                onValueChange: (value) => {
                  toggleHardware(item, "memory", value);
                },
                title: item,
                isSelected: isActive(item, "memory"),
                children: getMetricItem("memory", "memory", item)
              },
              `hardware_${item}_item`
            )),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Card$1,
              {
                className: "border-1 border-foreground-100 pt-2 px-2\r\n                    hover:border-foreground-200 transition-all duration-200 mt-4",
                as: "div",
                fullWidth: true,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "font-medium", children: "Uptime" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(CardBody, { children: [
                    getMetricItem("uptimeSystemSeconds", "uptime", "uptime"),
                    getMetricItem("uptimeSeconds", "uptime", "uptime")
                  ] })
                ]
              }
            )
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/70 text-sm leading-relaxed", children: "A configurable and real-time monitoring of CPU, GPU, and Memory usage, displayed conveniently in the status bar." })
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
            className: "absolute inset-0 rounded-2xl bg-linear-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          }
        )
      ]
    }
  ) });
}

const {Fragment,useEffect} = await importShared('react');

const {useDispatch} = await importShared('react-redux');
function AddCustomHook(lynxAPI) {
  const UpdateConfig = () => {
    const dispatch = useDispatch();
    useEffect(() => {
      window.electron.ipcRenderer.on(HMONITOR_IPC_ON_CONFIG, (_, configs) => {
        dispatch(systemMonitorActions.setConfig(configs));
      });
      return () => window.electron.ipcRenderer.removeAllListeners(HMONITOR_IPC_ON_CONFIG);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Fragment, {});
  };
  lynxAPI.addCustomHook(UpdateConfig);
}

function InitialExtensions(lynxAPI) {
  lynxAPI.statusBar.replaceContainer(HardwareStatusBar);
  lynxAPI.addReducer([{ name: "extension", reducer: extensionReducer }]);
  AddCustomHook(lynxAPI);
  lynxAPI.customizePages.tools.addComponent(ToolsPage);
  lynxAPI.addModal(ModalManager);
}

export { InitialExtensions };
