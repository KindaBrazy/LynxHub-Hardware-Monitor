import { c as clamp, i as isEasingArray, N as NativeAnimation, s as supportsLinearEasing, a as supportedWaapiEasing, b as isBezierDefinition, m as memo, r as resolveElements, g as getValueAsType, n as numberValueTypes, f as frame, e as cancelFrame, t as transformPropOrder, h as transformProps, j as isHTMLElement, M as MotionValue, k as isCSSVar, p as px, l as statsBuffer, o as frameData, q as activeAnimations, u as interpolate, v as collectMotionValues, w as motionValue, x as isMotionValue, J as JSAnimation, y as getValueTransition$1, z as secondsToMilliseconds, A as applyGeneratorOptions, B as mapEasingToNativeEasing, C as microtask, D as removeItem, E as noop, F as stepsOrder, G as createMotionComponentFactory, H as animations, I as createDomVisualElement, K as layout, L as drag, O as gestureAnimations, P as createDOMMotionComponentProxy, Q as isSVGElement, R as progress, S as velocityPerSecond, T as defaultOffset$1, U as supportsScrollTimeline, V as useConstant, W as useIsomorphicLayoutEffect, X as warning, Y as MotionConfigContext, Z as hasReducedMotionListener, _ as initPrefersReducedMotion, $ as prefersReducedMotion, a0 as animateVisualElement, a1 as setTarget, a2 as mixNumber, a3 as createGeneratorEasing, a4 as fillOffset, a5 as isGenerator, a6 as VisualElement, a7 as createBox, a8 as isSVGSVGElement, a9 as SVGVisualElement, aa as HTMLVisualElement, ab as visualElementStore, ac as animateSingleValue, ad as animateTarget, ae as spring, af as fillWildcards, ag as PresenceContext, ah as addDomEvent, ai as motionComponentSymbol, aj as rootProjectionNode, ak as MotionGlobalConfig, al as useForceUpdate, am as optimizedAppearDataId, an as startWaapiAnimation, ao as getOptimisedAppearId, ap as makeUseVisualState, aq as LayoutGroup, ar as MotionContext, as as moveItem, at as easingDefinitionToFunction } from './index-C0vUcMw0.js';
export { au as AnimatePresence, be as AsyncMotionValueAnimation, bq as DOMKeyframesResolver, aR as DeprecatedLayoutGroupContext, aQ as FlatTree, br as KeyframeResolver, aO as LayoutGroupContext, av as LazyMotion, aw as MotionConfig, bg as NativeAnimationExtended, a$ as SubscriptionManager, aP as SwitchLayoutGroupContext, aF as WillChangeMotionValue, bw as acceleratedValues, ay as addPointerEvent, az as addPointerInfo, aL as addScaleCorrector, aV as addUniqueItem, c9 as alpha, c2 as analyseComplexValue, bf as animateValue, b1 as anticipate, b2 as backIn, b3 as backInOut, b4 as backOut, aM as buildTransform, bo as calcGeneratorDuration, aA as calcLength, bz as cancelMicrotask, b5 as circIn, b6 as circInOut, b7 as circOut, bY as color, c3 as complex, bt as convertOffsetToTimes, by as createRenderBatcher, aJ as createRendererMotionComponent, b8 as cubicBezier, bu as cubicBezierAsString, bm as defaultEasing, bI as defaultTransformValue, c6 as defaultValueTypes, cc as degrees, aS as delay, c4 as dimensionValueTypes, aT as distance, aU as distance2D, d as domAnimation, aD as domMax, b9 as easeIn, ba as easeInOut, bb as easeOut, aB as filterProps, c5 as findDimensionValueType, cj as findValueType, bs as flushKeyframeResolvers, ck as frameSteps, bx as generateLinearEasing, ci as getAnimatableNone, c7 as getDefaultValueType, bQ as getMixer, bh as getVariableValue, bZ as hex, bE as hover, b_ as hsla, b$ as hslaToRgba, bl as inertia, aW as invariant, bV as invisibleValues, aC as isBrowser, bj as isCSSVariableName, bk as isCSSVariableToken, bB as isDragActive, bC as isDragging, bG as isNodeOrChild, aX as isNumericalString, aY as isObject, bH as isPrimaryPointer, aK as isValidMotionProp, aZ as isZeroValueString, bn as keyframes, ax as m, bp as maxGeneratorDuration, b0 as millisecondsToSeconds, bc as mirrorEasing, bN as mix, bR as mixArray, bO as mixColor, bS as mixComplex, bU as mixImmediate, bP as mixLinearColor, bT as mixObject, bW as mixVisibility, ca as number, aN as optimizedAppearDataAttribute, bi as parseCSSVariable, bJ as parseValueFromTransform, cd as percent, a_ as pipe, bM as positionalKeys, bF as press, ce as progressPercentage, bK as readTransformValue, aG as resolveMotionValue, bd as reverseEasing, c0 as rgbUnit, c1 as rgba, cb as scale, bD as setDragLock, bL as setStyle, bv as supportsBrowserAnimation, bX as supportsFlags, ch as testValueType, bA as time, c8 as transformValueTypes, aH as useIsPresent, aI as usePresence, aE as useWillChange, cf as vh, cg as vw } from './index-C0vUcMw0.js';
import { importShared } from './__federation_fn_import-JrT3xvdd.js';
import { j as jsxRuntimeExports } from './jsx-runtime-BA-u0cS_.js';

const warned = new Set();
function hasWarned(message) {
    return warned.has(message);
}
function warnOnce(condition, message, element) {
    if (condition || warned.has(message))
        return;
    console.warn(message);
    if (element)
        console.warn(element);
    warned.add(message);
}

const wrap = (min, max, v) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

function steps(numSteps, direction = "end") {
    return (progress) => {
        progress =
            direction === "end"
                ? Math.min(progress, 0.999)
                : Math.max(progress, 0.001);
        const expanded = progress * numSteps;
        const rounded = direction === "end" ? Math.floor(expanded) : Math.ceil(expanded);
        return clamp(0, 1, rounded / numSteps);
    };
}

function getEasingForSegment(easing, i) {
    return isEasingArray(easing) ? easing[wrap(0, easing.length, i)] : easing;
}

class GroupAnimation {
    constructor(animations) {
        // Bound to accomadate common `return animation.stop` pattern
        this.stop = () => this.runAll("stop");
        this.animations = animations.filter(Boolean);
    }
    get finished() {
        return Promise.all(this.animations.map((animation) => animation.finished));
    }
    /**
     * TODO: Filter out cancelled or stopped animations before returning
     */
    getAll(propName) {
        return this.animations[0][propName];
    }
    setAll(propName, newValue) {
        for (let i = 0; i < this.animations.length; i++) {
            this.animations[i][propName] = newValue;
        }
    }
    attachTimeline(timeline) {
        const subscriptions = this.animations.map((animation) => animation.attachTimeline(timeline));
        return () => {
            subscriptions.forEach((cancel, i) => {
                cancel && cancel();
                this.animations[i].stop();
            });
        };
    }
    get time() {
        return this.getAll("time");
    }
    set time(time) {
        this.setAll("time", time);
    }
    get speed() {
        return this.getAll("speed");
    }
    set speed(speed) {
        this.setAll("speed", speed);
    }
    get state() {
        return this.getAll("state");
    }
    get startTime() {
        return this.getAll("startTime");
    }
    get duration() {
        let max = 0;
        for (let i = 0; i < this.animations.length; i++) {
            max = Math.max(max, this.animations[i].duration);
        }
        return max;
    }
    runAll(methodName) {
        this.animations.forEach((controls) => controls[methodName]());
    }
    play() {
        this.runAll("play");
    }
    pause() {
        this.runAll("pause");
    }
    cancel() {
        this.runAll("cancel");
    }
    complete() {
        this.runAll("complete");
    }
}

class GroupAnimationWithThen extends GroupAnimation {
    then(onResolve, _onReject) {
        return this.finished.finally(onResolve).then(() => { });
    }
}

class NativeAnimationWrapper extends NativeAnimation {
    constructor(animation) {
        super();
        this.animation = animation;
        animation.onfinish = () => {
            this.finishedTime = this.time;
            this.notifyFinished();
        };
    }
}

const animationMaps = new WeakMap();
const animationMapKey = (name, pseudoElement = "") => `${name}:${pseudoElement}`;
function getAnimationMap(element) {
    const map = animationMaps.get(element) || new Map();
    animationMaps.set(element, map);
    return map;
}

const pxValues = new Set([
    // Border props
    "borderWidth",
    "borderTopWidth",
    "borderRightWidth",
    "borderBottomWidth",
    "borderLeftWidth",
    "borderRadius",
    "radius",
    "borderTopLeftRadius",
    "borderTopRightRadius",
    "borderBottomRightRadius",
    "borderBottomLeftRadius",
    // Positioning props
    "width",
    "maxWidth",
    "height",
    "maxHeight",
    "top",
    "right",
    "bottom",
    "left",
    // Spacing props
    "padding",
    "paddingTop",
    "paddingRight",
    "paddingBottom",
    "paddingLeft",
    "margin",
    "marginTop",
    "marginRight",
    "marginBottom",
    "marginLeft",
    // Misc
    "backgroundPositionX",
    "backgroundPositionY",
]);

function applyPxDefaults(keyframes, name) {
    for (let i = 0; i < keyframes.length; i++) {
        if (typeof keyframes[i] === "number" && pxValues.has(name)) {
            keyframes[i] = keyframes[i] + "px";
        }
    }
}

function isWaapiSupportedEasing(easing) {
    return Boolean((typeof easing === "function" && supportsLinearEasing()) ||
        !easing ||
        (typeof easing === "string" &&
            (easing in supportedWaapiEasing || supportsLinearEasing())) ||
        isBezierDefinition(easing) ||
        (Array.isArray(easing) && easing.every(isWaapiSupportedEasing)));
}

const supportsPartialKeyframes = /*@__PURE__*/ memo(() => {
    try {
        document.createElement("div").animate({ opacity: [1] });
    }
    catch (e) {
        return false;
    }
    return true;
});

function camelToDash(str) {
    return str.replace(/([A-Z])/g, (match) => `-${match.toLowerCase()}`);
}

function createSelectorEffect(subjectEffect) {
    return (subject, values) => {
        const elements = resolveElements(subject);
        const subscriptions = [];
        for (const element of elements) {
            const remove = subjectEffect(element, values);
            subscriptions.push(remove);
        }
        return () => {
            for (const remove of subscriptions)
                remove();
        };
    };
}

class MotionValueState {
    constructor() {
        this.latest = {};
        this.values = new Map();
    }
    set(name, value, render, computed, useDefaultValueType = true) {
        const existingValue = this.values.get(name);
        if (existingValue) {
            existingValue.onRemove();
        }
        const onChange = () => {
            const v = value.get();
            if (useDefaultValueType) {
                this.latest[name] = getValueAsType(v, numberValueTypes[name]);
            }
            else {
                this.latest[name] = v;
            }
            render && frame.render(render);
        };
        onChange();
        const cancelOnChange = value.on("change", onChange);
        computed && value.addDependent(computed);
        const remove = () => {
            cancelOnChange();
            render && cancelFrame(render);
            this.values.delete(name);
            computed && value.removeDependent(computed);
        };
        this.values.set(name, { value, onRemove: remove });
        return remove;
    }
    get(name) {
        return this.values.get(name)?.value;
    }
    destroy() {
        for (const value of this.values.values()) {
            value.onRemove();
        }
    }
}

function createEffect(addValue) {
    const stateCache = new WeakMap();
    const subscriptions = [];
    return (subject, values) => {
        const state = stateCache.get(subject) ?? new MotionValueState();
        stateCache.set(subject, state);
        for (const key in values) {
            const value = values[key];
            const remove = addValue(subject, state, key, value);
            subscriptions.push(remove);
        }
        return () => {
            for (const cancel of subscriptions)
                cancel();
        };
    };
}

function canSetAsProperty(element, name) {
    if (!(name in element))
        return false;
    const descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(element), name) ||
        Object.getOwnPropertyDescriptor(element, name);
    // Check if it has a setter
    return descriptor && typeof descriptor.set === "function";
}
const addAttrValue = (element, state, key, value) => {
    const isProp = canSetAsProperty(element, key);
    const name = isProp
        ? key
        : key.startsWith("data") || key.startsWith("aria")
            ? camelToDash(key)
            : key;
    /**
     * Set attribute directly via property if available
     */
    const render = isProp
        ? () => {
            element[name] = state.latest[key];
        }
        : () => {
            const v = state.latest[key];
            if (v === null || v === undefined) {
                element.removeAttribute(name);
            }
            else {
                element.setAttribute(name, String(v));
            }
        };
    return state.set(key, value, render);
};
const attrEffect = /*@__PURE__*/ createSelectorEffect(
/*@__PURE__*/ createEffect(addAttrValue));

const propEffect = /*@__PURE__*/ createEffect((subject, state, key, value) => {
    return state.set(key, value, () => {
        subject[key] = state.latest[key];
    }, undefined, false);
});

const translateAlias = {
    x: "translateX",
    y: "translateY",
    z: "translateZ",
    transformPerspective: "perspective",
};
function buildTransform(state) {
    let transform = "";
    let transformIsDefault = true;
    /**
     * Loop over all possible transforms in order, adding the ones that
     * are present to the transform string.
     */
    for (let i = 0; i < transformPropOrder.length; i++) {
        const key = transformPropOrder[i];
        const value = state.latest[key];
        if (value === undefined)
            continue;
        let valueIsDefault = true;
        if (typeof value === "number") {
            valueIsDefault = value === (key.startsWith("scale") ? 1 : 0);
        }
        else {
            valueIsDefault = parseFloat(value) === 0;
        }
        if (!valueIsDefault) {
            transformIsDefault = false;
            const transformName = translateAlias[key] || key;
            const valueToRender = state.latest[key];
            transform += `${transformName}(${valueToRender}) `;
        }
    }
    return transformIsDefault ? "none" : transform.trim();
}

const originProps = new Set(["originX", "originY", "originZ"]);
const addStyleValue = (element, state, key, value) => {
    let render = undefined;
    let computed = undefined;
    if (transformProps.has(key)) {
        if (!state.get("transform")) {
            // If this is an HTML element, we need to set the transform-box to fill-box
            // to normalise the transform relative to the element's bounding box
            if (!isHTMLElement(element) && !state.get("transformBox")) {
                addStyleValue(element, state, "transformBox", new MotionValue("fill-box"));
            }
            state.set("transform", new MotionValue("none"), () => {
                element.style.transform = buildTransform(state);
            });
        }
        computed = state.get("transform");
    }
    else if (originProps.has(key)) {
        if (!state.get("transformOrigin")) {
            state.set("transformOrigin", new MotionValue(""), () => {
                const originX = state.latest.originX ?? "50%";
                const originY = state.latest.originY ?? "50%";
                const originZ = state.latest.originZ ?? 0;
                element.style.transformOrigin = `${originX} ${originY} ${originZ}`;
            });
        }
        computed = state.get("transformOrigin");
    }
    else if (isCSSVar(key)) {
        render = () => {
            element.style.setProperty(key, state.latest[key]);
        };
    }
    else {
        render = () => {
            element.style[key] = state.latest[key];
        };
    }
    return state.set(key, value, render, computed);
};
const styleEffect = /*@__PURE__*/ createSelectorEffect(
/*@__PURE__*/ createEffect(addStyleValue));

const toPx = px.transform;
function addSVGPathValue(element, state, key, value) {
    frame.render(() => element.setAttribute("pathLength", "1"));
    if (key === "pathOffset") {
        return state.set(key, value, () => element.setAttribute("stroke-dashoffset", toPx(-state.latest[key])));
    }
    else {
        if (!state.get("stroke-dasharray")) {
            state.set("stroke-dasharray", new MotionValue("1 1"), () => {
                const { pathLength = 1, pathSpacing } = state.latest;
                element.setAttribute("stroke-dasharray", `${toPx(pathLength)} ${toPx(pathSpacing ?? 1 - Number(pathLength))}`);
            });
        }
        return state.set(key, value, undefined, state.get("stroke-dasharray"));
    }
}
const addSVGValue = (element, state, key, value) => {
    if (key.startsWith("path")) {
        return addSVGPathValue(element, state, key, value);
    }
    else if (key.startsWith("attr")) {
        return addAttrValue(element, state, convertAttrKey(key), value);
    }
    const handler = key in element.style ? addStyleValue : addAttrValue;
    return handler(element, state, key, value);
};
const svgEffect = /*@__PURE__*/ createSelectorEffect(
/*@__PURE__*/ createEffect(addSVGValue));
function convertAttrKey(key) {
    return key.replace(/^attr([A-Z])/, (_, firstChar) => firstChar.toLowerCase());
}

function getComputedStyle$1(element, name) {
    const computedStyle = window.getComputedStyle(element);
    return isCSSVar(name)
        ? computedStyle.getPropertyValue(name)
        : computedStyle[name];
}

function observeTimeline(update, timeline) {
    let prevProgress;
    const onFrame = () => {
        const { currentTime } = timeline;
        const percentage = currentTime === null ? 0 : currentTime.value;
        const progress = percentage / 100;
        if (prevProgress !== progress) {
            update(progress);
        }
        prevProgress = progress;
    };
    frame.preUpdate(onFrame, true);
    return () => cancelFrame(onFrame);
}

function record() {
    const { value } = statsBuffer;
    if (value === null) {
        cancelFrame(record);
        return;
    }
    value.frameloop.rate.push(frameData.delta);
    value.animations.mainThread.push(activeAnimations.mainThread);
    value.animations.waapi.push(activeAnimations.waapi);
    value.animations.layout.push(activeAnimations.layout);
}
function mean(values) {
    return values.reduce((acc, value) => acc + value, 0) / values.length;
}
function summarise(values, calcAverage = mean) {
    if (values.length === 0) {
        return {
            min: 0,
            max: 0,
            avg: 0,
        };
    }
    return {
        min: Math.min(...values),
        max: Math.max(...values),
        avg: calcAverage(values),
    };
}
const msToFps = (ms) => Math.round(1000 / ms);
function clearStatsBuffer() {
    statsBuffer.value = null;
    statsBuffer.addProjectionMetrics = null;
}
function reportStats() {
    const { value } = statsBuffer;
    if (!value) {
        throw new Error("Stats are not being measured");
    }
    clearStatsBuffer();
    cancelFrame(record);
    const summary = {
        frameloop: {
            setup: summarise(value.frameloop.setup),
            rate: summarise(value.frameloop.rate),
            read: summarise(value.frameloop.read),
            resolveKeyframes: summarise(value.frameloop.resolveKeyframes),
            preUpdate: summarise(value.frameloop.preUpdate),
            update: summarise(value.frameloop.update),
            preRender: summarise(value.frameloop.preRender),
            render: summarise(value.frameloop.render),
            postRender: summarise(value.frameloop.postRender),
        },
        animations: {
            mainThread: summarise(value.animations.mainThread),
            waapi: summarise(value.animations.waapi),
            layout: summarise(value.animations.layout),
        },
        layoutProjection: {
            nodes: summarise(value.layoutProjection.nodes),
            calculatedTargetDeltas: summarise(value.layoutProjection.calculatedTargetDeltas),
            calculatedProjections: summarise(value.layoutProjection.calculatedProjections),
        },
    };
    /**
     * Convert the rate to FPS
     */
    const { rate } = summary.frameloop;
    rate.min = msToFps(rate.min);
    rate.max = msToFps(rate.max);
    rate.avg = msToFps(rate.avg);
    [rate.min, rate.max] = [rate.max, rate.min];
    return summary;
}
function recordStats() {
    if (statsBuffer.value) {
        clearStatsBuffer();
        throw new Error("Stats are already being measured");
    }
    const newStatsBuffer = statsBuffer;
    newStatsBuffer.value = {
        frameloop: {
            setup: [],
            rate: [],
            read: [],
            resolveKeyframes: [],
            preUpdate: [],
            update: [],
            preRender: [],
            render: [],
            postRender: [],
        },
        animations: {
            mainThread: [],
            waapi: [],
            layout: [],
        },
        layoutProjection: {
            nodes: [],
            calculatedTargetDeltas: [],
            calculatedProjections: [],
        },
    };
    newStatsBuffer.addProjectionMetrics = (metrics) => {
        const { layoutProjection } = newStatsBuffer.value;
        layoutProjection.nodes.push(metrics.nodes);
        layoutProjection.calculatedTargetDeltas.push(metrics.calculatedTargetDeltas);
        layoutProjection.calculatedProjections.push(metrics.calculatedProjections);
    };
    frame.postRender(record, true);
    return reportStats;
}

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

function subscribeValue(inputValues, outputValue, getLatest) {
    const update = () => outputValue.set(getLatest());
    const scheduleUpdate = () => frame.preRender(update, false, true);
    const subscriptions = inputValues.map((v) => v.on("change", scheduleUpdate));
    outputValue.on("destroy", () => {
        subscriptions.forEach((unsubscribe) => unsubscribe());
        cancelFrame(update);
    });
}

/**
 * Create a `MotionValue` that transforms the output of other `MotionValue`s by
 * passing their latest values through a transform function.
 *
 * Whenever a `MotionValue` referred to in the provided function is updated,
 * it will be re-evaluated.
 *
 * ```jsx
 * const x = motionValue(0)
 * const y = transformValue(() => x.get() * 2) // double x
 * ```
 *
 * @param transformer - A transform function. This function must be pure with no side-effects or conditional statements.
 * @returns `MotionValue`
 *
 * @public
 */
function transformValue(transform) {
    const collectedValues = [];
    /**
     * Open session of collectMotionValues. Any MotionValue that calls get()
     * inside transform will be saved into this array.
     */
    collectMotionValues.current = collectedValues;
    const initialValue = transform();
    collectMotionValues.current = undefined;
    const value = motionValue(initialValue);
    subscribeValue(collectedValues, value, transform);
    return value;
}

/**
 * Create a `MotionValue` that maps the output of another `MotionValue` by
 * mapping it from one range of values into another.
 *
 * @remarks
 *
 * Given an input range of `[-200, -100, 100, 200]` and an output range of
 * `[0, 1, 1, 0]`, the returned `MotionValue` will:
 *
 * - When provided a value between `-200` and `-100`, will return a value between `0` and  `1`.
 * - When provided a value between `-100` and `100`, will return `1`.
 * - When provided a value between `100` and `200`, will return a value between `1` and  `0`
 *
 * The input range must be a linear series of numbers. The output range
 * can be any value type supported by Motion: numbers, colors, shadows, etc.
 *
 * Every value in the output range must be of the same type and in the same format.
 *
 * ```jsx
 * const x = motionValue(0)
 * const xRange = [-200, -100, 100, 200]
 * const opacityRange = [0, 1, 1, 0]
 * const opacity = mapValue(x, xRange, opacityRange)
 * ```
 *
 * @param inputValue - `MotionValue`
 * @param inputRange - A linear series of numbers (either all increasing or decreasing)
 * @param outputRange - A series of numbers, colors or strings. Must be the same length as `inputRange`.
 * @param options -
 *
 *  - clamp: boolean. Clamp values to within the given range. Defaults to `true`
 *  - ease: EasingFunction[]. Easing functions to use on the interpolations between each value in the input and output ranges. If provided as an array, the array must be one item shorter than the input and output ranges, as the easings apply to the transition between each.
 *
 * @returns `MotionValue`
 *
 * @public
 */
function mapValue(inputValue, inputRange, outputRange, options) {
    const map = transform(inputRange, outputRange, options);
    return transformValue(() => map(inputValue.get()));
}

/**
 * Create a `MotionValue` that animates to its latest value using a spring.
 * Can either be a value or track another `MotionValue`.
 *
 * ```jsx
 * const x = motionValue(0)
 * const y = transformValue(() => x.get() * 2) // double x
 * ```
 *
 * @param transformer - A transform function. This function must be pure with no side-effects or conditional statements.
 * @returns `MotionValue`
 *
 * @public
 */
function springValue(source, options) {
    const initialValue = isMotionValue(source) ? source.get() : source;
    const value = motionValue(initialValue);
    attachSpring(value, source, options);
    return value;
}
function attachSpring(value, source, options) {
    const initialValue = value.get();
    let activeAnimation = null;
    let latestValue = initialValue;
    let latestSetter;
    const unit = typeof initialValue === "string"
        ? initialValue.replace(/[\d.-]/g, "")
        : undefined;
    const stopAnimation = () => {
        if (activeAnimation) {
            activeAnimation.stop();
            activeAnimation = null;
        }
    };
    const startAnimation = () => {
        stopAnimation();
        activeAnimation = new JSAnimation({
            keyframes: [asNumber(value.get()), asNumber(latestValue)],
            velocity: value.getVelocity(),
            type: "spring",
            restDelta: 0.001,
            restSpeed: 0.01,
            ...options,
            onUpdate: latestSetter,
        });
    };
    value.attach((v, set) => {
        latestValue = v;
        latestSetter = (latest) => set(parseValue(latest, unit));
        frame.postRender(startAnimation);
        return value.get();
    }, stopAnimation);
    let unsubscribe = undefined;
    if (isMotionValue(source)) {
        unsubscribe = source.on("change", (v) => value.set(parseValue(v, unit)));
        value.on("destroy", unsubscribe);
    }
    return unsubscribe;
}
function parseValue(v, unit) {
    return unit ? v + unit : v;
}
function asNumber(v) {
    return typeof v === "number" ? v : parseFloat(v);
}

function chooseLayerType(valueName) {
    if (valueName === "layout")
        return "group";
    if (valueName === "enter" || valueName === "new")
        return "new";
    if (valueName === "exit" || valueName === "old")
        return "old";
    return "group";
}

let pendingRules = {};
let style = null;
const css = {
    set: (selector, values) => {
        pendingRules[selector] = values;
    },
    commit: () => {
        if (!style) {
            style = document.createElement("style");
            style.id = "motion-view";
        }
        let cssText = "";
        for (const selector in pendingRules) {
            const rule = pendingRules[selector];
            cssText += `${selector} {\n`;
            for (const [property, value] of Object.entries(rule)) {
                cssText += `  ${property}: ${value};\n`;
            }
            cssText += "}\n";
        }
        style.textContent = cssText;
        document.head.appendChild(style);
        pendingRules = {};
    },
    remove: () => {
        if (style && style.parentElement) {
            style.parentElement.removeChild(style);
        }
    },
};

function getLayerName(pseudoElement) {
    const match = pseudoElement.match(/::view-transition-(old|new|group|image-pair)\((.*?)\)/);
    if (!match)
        return null;
    return { layer: match[2], type: match[1] };
}

function filterViewAnimations(animation) {
    const { effect } = animation;
    if (!effect)
        return false;
    return (effect.target === document.documentElement &&
        effect.pseudoElement?.startsWith("::view-transition"));
}
function getViewAnimations() {
    return document.getAnimations().filter(filterViewAnimations);
}

function hasTarget(target, targets) {
    return targets.has(target) && Object.keys(targets.get(target)).length > 0;
}

const definitionNames = ["layout", "enter", "exit", "new", "old"];
function startViewAnimation(builder) {
    const { update, targets, options: defaultOptions } = builder;
    if (!document.startViewTransition) {
        return new Promise(async (resolve) => {
            await update();
            resolve(new GroupAnimation([]));
        });
    }
    // TODO: Go over existing targets and ensure they all have ids
    /**
     * If we don't have any animations defined for the root target,
     * remove it from being captured.
     */
    if (!hasTarget("root", targets)) {
        css.set(":root", {
            "view-transition-name": "none",
        });
    }
    /**
     * Set the timing curve to linear for all view transition layers.
     * This gets baked into the keyframes, which can't be changed
     * without breaking the generated animation.
     *
     * This allows us to set easing via updateTiming - which can be changed.
     */
    css.set("::view-transition-group(*), ::view-transition-old(*), ::view-transition-new(*)", { "animation-timing-function": "linear !important" });
    css.commit(); // Write
    const transition = document.startViewTransition(async () => {
        await update();
        // TODO: Go over new targets and ensure they all have ids
    });
    transition.finished.finally(() => {
        css.remove(); // Write
    });
    return new Promise((resolve) => {
        transition.ready.then(() => {
            const generatedViewAnimations = getViewAnimations();
            const animations = [];
            /**
             * Create animations for each of our explicitly-defined subjects.
             */
            targets.forEach((definition, target) => {
                // TODO: If target is not "root", resolve elements
                // and iterate over each
                for (const key of definitionNames) {
                    if (!definition[key])
                        continue;
                    const { keyframes, options } = definition[key];
                    for (let [valueName, valueKeyframes] of Object.entries(keyframes)) {
                        if (!valueKeyframes)
                            continue;
                        const valueOptions = {
                            ...getValueTransition$1(defaultOptions, valueName),
                            ...getValueTransition$1(options, valueName),
                        };
                        const type = chooseLayerType(key);
                        /**
                         * If this is an opacity animation, and keyframes are not an array,
                         * we need to convert them into an array and set an initial value.
                         */
                        if (valueName === "opacity" &&
                            !Array.isArray(valueKeyframes)) {
                            const initialValue = type === "new" ? 0 : 1;
                            valueKeyframes = [initialValue, valueKeyframes];
                        }
                        /**
                         * Resolve stagger function if provided.
                         */
                        if (typeof valueOptions.delay === "function") {
                            valueOptions.delay = valueOptions.delay(0, 1);
                        }
                        valueOptions.duration && (valueOptions.duration = secondsToMilliseconds(valueOptions.duration));
                        valueOptions.delay && (valueOptions.delay = secondsToMilliseconds(valueOptions.delay));
                        const animation = new NativeAnimation({
                            ...valueOptions,
                            element: document.documentElement,
                            name: valueName,
                            pseudoElement: `::view-transition-${type}(${target})`,
                            keyframes: valueKeyframes,
                        });
                        animations.push(animation);
                    }
                }
            });
            /**
             * Handle browser generated animations
             */
            for (const animation of generatedViewAnimations) {
                if (animation.playState === "finished")
                    continue;
                const { effect } = animation;
                if (!effect || !(effect instanceof KeyframeEffect))
                    continue;
                const { pseudoElement } = effect;
                if (!pseudoElement)
                    continue;
                const name = getLayerName(pseudoElement);
                if (!name)
                    continue;
                const targetDefinition = targets.get(name.layer);
                if (!targetDefinition) {
                    /**
                     * If transition name is group then update the timing of the animation
                     * whereas if it's old or new then we could possibly replace it using
                     * the above method.
                     */
                    const transitionName = name.type === "group" ? "layout" : "";
                    let animationTransition = {
                        ...getValueTransition$1(defaultOptions, transitionName),
                    };
                    animationTransition.duration && (animationTransition.duration = secondsToMilliseconds(animationTransition.duration));
                    animationTransition =
                        applyGeneratorOptions(animationTransition);
                    const easing = mapEasingToNativeEasing(animationTransition.ease, animationTransition.duration);
                    effect.updateTiming({
                        delay: secondsToMilliseconds(animationTransition.delay ?? 0),
                        duration: animationTransition.duration,
                        easing,
                    });
                    animations.push(new NativeAnimationWrapper(animation));
                }
                else if (hasOpacity(targetDefinition, "enter") &&
                    hasOpacity(targetDefinition, "exit") &&
                    effect
                        .getKeyframes()
                        .some((keyframe) => keyframe.mixBlendMode)) {
                    animations.push(new NativeAnimationWrapper(animation));
                }
                else {
                    animation.cancel();
                }
            }
            resolve(new GroupAnimation(animations));
        });
    });
}
function hasOpacity(target, key) {
    return target?.[key]?.keyframes.opacity;
}

let builders = [];
let current = null;
function next() {
    current = null;
    const [nextBuilder] = builders;
    if (nextBuilder)
        start(nextBuilder);
}
function start(builder) {
    removeItem(builders, builder);
    current = builder;
    startViewAnimation(builder).then((animation) => {
        builder.notifyReady(animation);
        animation.finished.finally(next);
    });
}
function processQueue() {
    /**
     * Iterate backwards over the builders array. We can ignore the
     * "wait" animations. If we have an interrupting animation in the
     * queue then we need to batch all preceeding animations into it.
     * Currently this only batches the update functions but will also
     * need to batch the targets.
     */
    for (let i = builders.length - 1; i >= 0; i--) {
        const builder = builders[i];
        const { interrupt } = builder.options;
        if (interrupt === "immediate") {
            const batchedUpdates = builders.slice(0, i + 1).map((b) => b.update);
            const remaining = builders.slice(i + 1);
            builder.update = () => {
                batchedUpdates.forEach((update) => update());
            };
            // Put the current builder at the front, followed by any "wait" builders
            builders = [builder, ...remaining];
            break;
        }
    }
    if (!current || builders[0]?.options.interrupt === "immediate") {
        next();
    }
}
function addToQueue(builder) {
    builders.push(builder);
    microtask.render(processQueue);
}

class ViewTransitionBuilder {
    constructor(update, options = {}) {
        this.currentTarget = "root";
        this.targets = new Map();
        this.notifyReady = noop;
        this.readyPromise = new Promise((resolve) => {
            this.notifyReady = resolve;
        });
        this.update = update;
        this.options = {
            interrupt: "wait",
            ...options,
        };
        addToQueue(this);
    }
    get(selector) {
        this.currentTarget = selector;
        return this;
    }
    layout(keyframes, options) {
        this.updateTarget("layout", keyframes, options);
        return this;
    }
    new(keyframes, options) {
        this.updateTarget("new", keyframes, options);
        return this;
    }
    old(keyframes, options) {
        this.updateTarget("old", keyframes, options);
        return this;
    }
    enter(keyframes, options) {
        this.updateTarget("enter", keyframes, options);
        return this;
    }
    exit(keyframes, options) {
        this.updateTarget("exit", keyframes, options);
        return this;
    }
    crossfade(options) {
        this.updateTarget("enter", { opacity: 1 }, options);
        this.updateTarget("exit", { opacity: 0 }, options);
        return this;
    }
    updateTarget(target, keyframes, options = {}) {
        const { currentTarget, targets } = this;
        if (!targets.has(currentTarget)) {
            targets.set(currentTarget, {});
        }
        const targetData = targets.get(currentTarget);
        targetData[target] = { keyframes, options };
    }
    then(resolve, reject) {
        return this.readyPromise.then(resolve, reject);
    }
}
function animateView(update, defaultOptions = {}) {
    return new ViewTransitionBuilder(update, defaultOptions);
}

/**
 * @deprecated
 *
 * Import as `frame` instead.
 */
const sync = frame;
/**
 * @deprecated
 *
 * Use cancelFrame(callback) instead.
 */
const cancelSync = stepsOrder.reduce((acc, key) => {
    acc[key] = (process) => cancelFrame(process);
    return acc;
}, {});

const createMotionComponent = /*@__PURE__*/ createMotionComponentFactory({
    ...animations,
    ...gestureAnimations,
    ...drag,
    ...layout,
}, createDomVisualElement);

const motion = /*@__PURE__*/ createDOMMotionComponentProxy(createMotionComponent);

const {useEffect: useEffect$7} = await importShared('react');


function useUnmountEffect(callback) {
    return useEffect$7(() => () => callback(), []);
}

/**
 * @public
 */
const domMin = {
    renderer: createDomVisualElement,
    ...animations,
};

const {useInsertionEffect: useInsertionEffect$1} = await importShared('react');


function useMotionValueEvent(value, event, callback) {
    /**
     * useInsertionEffect will create subscriptions before any other
     * effects will run. Effects run upwards through the tree so it
     * can be that binding a useLayoutEffect higher up the tree can
     * miss changes from lower down the tree.
     */
    useInsertionEffect$1(() => value.on(event, callback), [value, event, callback]);
}

const resizeHandlers = new WeakMap();
let observer;
function getElementSize(target, borderBoxSize) {
    if (borderBoxSize) {
        const { inlineSize, blockSize } = borderBoxSize[0];
        return { width: inlineSize, height: blockSize };
    }
    else if (isSVGElement(target) && "getBBox" in target) {
        return target.getBBox();
    }
    else {
        return {
            width: target.offsetWidth,
            height: target.offsetHeight,
        };
    }
}
function notifyTarget({ target, contentRect, borderBoxSize, }) {
    resizeHandlers.get(target)?.forEach((handler) => {
        handler({
            target,
            contentSize: contentRect,
            get size() {
                return getElementSize(target, borderBoxSize);
            },
        });
    });
}
function notifyAll(entries) {
    entries.forEach(notifyTarget);
}
function createResizeObserver() {
    if (typeof ResizeObserver === "undefined")
        return;
    observer = new ResizeObserver(notifyAll);
}
function resizeElement(target, handler) {
    if (!observer)
        createResizeObserver();
    const elements = resolveElements(target);
    elements.forEach((element) => {
        let elementHandlers = resizeHandlers.get(element);
        if (!elementHandlers) {
            elementHandlers = new Set();
            resizeHandlers.set(element, elementHandlers);
        }
        elementHandlers.add(handler);
        observer?.observe(element);
    });
    return () => {
        elements.forEach((element) => {
            const elementHandlers = resizeHandlers.get(element);
            elementHandlers?.delete(handler);
            if (!elementHandlers?.size) {
                observer?.unobserve(element);
            }
        });
    };
}

const windowCallbacks = new Set();
let windowResizeHandler;
function createWindowResizeHandler() {
    windowResizeHandler = () => {
        const size = {
            width: window.innerWidth,
            height: window.innerHeight,
        };
        const info = {
            target: window,
            size,
            contentSize: size,
        };
        windowCallbacks.forEach((callback) => callback(info));
    };
    window.addEventListener("resize", windowResizeHandler);
}
function resizeWindow(callback) {
    windowCallbacks.add(callback);
    if (!windowResizeHandler)
        createWindowResizeHandler();
    return () => {
        windowCallbacks.delete(callback);
        if (!windowCallbacks.size && windowResizeHandler) {
            windowResizeHandler = undefined;
        }
    };
}

function resize(a, b) {
    return typeof a === "function" ? resizeWindow(a) : resizeElement(a, b);
}

/**
 * A time in milliseconds, beyond which we consider the scroll velocity to be 0.
 */
const maxElapsed = 50;
const createAxisInfo = () => ({
    current: 0,
    offset: [],
    progress: 0,
    scrollLength: 0,
    targetOffset: 0,
    targetLength: 0,
    containerLength: 0,
    velocity: 0,
});
const createScrollInfo = () => ({
    time: 0,
    x: createAxisInfo(),
    y: createAxisInfo(),
});
const keys = {
    x: {
        length: "Width",
        position: "Left",
    },
    y: {
        length: "Height",
        position: "Top",
    },
};
function updateAxisInfo(element, axisName, info, time) {
    const axis = info[axisName];
    const { length, position } = keys[axisName];
    const prev = axis.current;
    const prevTime = info.time;
    axis.current = element[`scroll${position}`];
    axis.scrollLength = element[`scroll${length}`] - element[`client${length}`];
    axis.offset.length = 0;
    axis.offset[0] = 0;
    axis.offset[1] = axis.scrollLength;
    axis.progress = progress(0, axis.scrollLength, axis.current);
    const elapsed = time - prevTime;
    axis.velocity =
        elapsed > maxElapsed
            ? 0
            : velocityPerSecond(axis.current - prev, elapsed);
}
function updateScrollInfo(element, info, time) {
    updateAxisInfo(element, "x", info, time);
    updateAxisInfo(element, "y", info, time);
    info.time = time;
}

function calcInset(element, container) {
    const inset = { x: 0, y: 0 };
    let current = element;
    while (current && current !== container) {
        if (isHTMLElement(current)) {
            inset.x += current.offsetLeft;
            inset.y += current.offsetTop;
            current = current.offsetParent;
        }
        else if (current.tagName === "svg") {
            /**
             * This isn't an ideal approach to measuring the offset of <svg /> tags.
             * It would be preferable, given they behave like HTMLElements in most ways
             * to use offsetLeft/Top. But these don't exist on <svg />. Likewise we
             * can't use .getBBox() like most SVG elements as these provide the offset
             * relative to the SVG itself, which for <svg /> is usually 0x0.
             */
            const svgBoundingBox = current.getBoundingClientRect();
            current = current.parentElement;
            const parentBoundingBox = current.getBoundingClientRect();
            inset.x += svgBoundingBox.left - parentBoundingBox.left;
            inset.y += svgBoundingBox.top - parentBoundingBox.top;
        }
        else if (current instanceof SVGGraphicsElement) {
            const { x, y } = current.getBBox();
            inset.x += x;
            inset.y += y;
            let svg = null;
            let parent = current.parentNode;
            while (!svg) {
                if (parent.tagName === "svg") {
                    svg = parent;
                }
                parent = current.parentNode;
            }
            current = svg;
        }
        else {
            break;
        }
    }
    return inset;
}

const namedEdges = {
    start: 0,
    center: 0.5,
    end: 1,
};
function resolveEdge(edge, length, inset = 0) {
    let delta = 0;
    /**
     * If we have this edge defined as a preset, replace the definition
     * with the numerical value.
     */
    if (edge in namedEdges) {
        edge = namedEdges[edge];
    }
    /**
     * Handle unit values
     */
    if (typeof edge === "string") {
        const asNumber = parseFloat(edge);
        if (edge.endsWith("px")) {
            delta = asNumber;
        }
        else if (edge.endsWith("%")) {
            edge = asNumber / 100;
        }
        else if (edge.endsWith("vw")) {
            delta = (asNumber / 100) * document.documentElement.clientWidth;
        }
        else if (edge.endsWith("vh")) {
            delta = (asNumber / 100) * document.documentElement.clientHeight;
        }
        else {
            edge = asNumber;
        }
    }
    /**
     * If the edge is defined as a number, handle as a progress value.
     */
    if (typeof edge === "number") {
        delta = length * edge;
    }
    return inset + delta;
}

const defaultOffset = [0, 0];
function resolveOffset(offset, containerLength, targetLength, targetInset) {
    let offsetDefinition = Array.isArray(offset) ? offset : defaultOffset;
    let targetPoint = 0;
    let containerPoint = 0;
    if (typeof offset === "number") {
        /**
         * If we're provided offset: [0, 0.5, 1] then each number x should become
         * [x, x], so we default to the behaviour of mapping 0 => 0 of both target
         * and container etc.
         */
        offsetDefinition = [offset, offset];
    }
    else if (typeof offset === "string") {
        offset = offset.trim();
        if (offset.includes(" ")) {
            offsetDefinition = offset.split(" ");
        }
        else {
            /**
             * If we're provided a definition like "100px" then we want to apply
             * that only to the top of the target point, leaving the container at 0.
             * Whereas a named offset like "end" should be applied to both.
             */
            offsetDefinition = [offset, namedEdges[offset] ? offset : `0`];
        }
    }
    targetPoint = resolveEdge(offsetDefinition[0], targetLength, targetInset);
    containerPoint = resolveEdge(offsetDefinition[1], containerLength);
    return targetPoint - containerPoint;
}

const ScrollOffset = {
    All: [
        [0, 0],
        [1, 1],
    ],
};

const point = { x: 0, y: 0 };
function getTargetSize(target) {
    return "getBBox" in target && target.tagName !== "svg"
        ? target.getBBox()
        : { width: target.clientWidth, height: target.clientHeight };
}
function resolveOffsets(container, info, options) {
    const { offset: offsetDefinition = ScrollOffset.All } = options;
    const { target = container, axis = "y" } = options;
    const lengthLabel = axis === "y" ? "height" : "width";
    const inset = target !== container ? calcInset(target, container) : point;
    /**
     * Measure the target and container. If they're the same thing then we
     * use the container's scrollWidth/Height as the target, from there
     * all other calculations can remain the same.
     */
    const targetSize = target === container
        ? { width: container.scrollWidth, height: container.scrollHeight }
        : getTargetSize(target);
    const containerSize = {
        width: container.clientWidth,
        height: container.clientHeight,
    };
    /**
     * Reset the length of the resolved offset array rather than creating a new one.
     * TODO: More reusable data structures for targetSize/containerSize would also be good.
     */
    info[axis].offset.length = 0;
    /**
     * Populate the offset array by resolving the user's offset definition into
     * a list of pixel scroll offets.
     */
    let hasChanged = !info[axis].interpolate;
    const numOffsets = offsetDefinition.length;
    for (let i = 0; i < numOffsets; i++) {
        const offset = resolveOffset(offsetDefinition[i], containerSize[lengthLabel], targetSize[lengthLabel], inset[axis]);
        if (!hasChanged && offset !== info[axis].interpolatorOffsets[i]) {
            hasChanged = true;
        }
        info[axis].offset[i] = offset;
    }
    /**
     * If the pixel scroll offsets have changed, create a new interpolator function
     * to map scroll value into a progress.
     */
    if (hasChanged) {
        info[axis].interpolate = interpolate(info[axis].offset, defaultOffset$1(offsetDefinition), { clamp: false });
        info[axis].interpolatorOffsets = [...info[axis].offset];
    }
    info[axis].progress = clamp(0, 1, info[axis].interpolate(info[axis].current));
}

function measure(container, target = container, info) {
  info.x.targetOffset = 0;
  info.y.targetOffset = 0;
  if (target !== container) {
    let node = target;
    while (node && node !== container) {
      info.x.targetOffset += node.offsetLeft;
      info.y.targetOffset += node.offsetTop;
      node = node.offsetParent;
    }
  }
  info.x.targetLength = target === container ? target.scrollWidth : target.clientWidth;
  info.y.targetLength = target === container ? target.scrollHeight : target.clientHeight;
  info.x.containerLength = container.clientWidth;
  info.y.containerLength = container.clientHeight;
}
function createOnScrollHandler(element, onScroll, info, options = {}) {
  return {
    measure: (time) => {
      measure(element, options.target, info);
      updateScrollInfo(element, info, time);
      if (options.offset || options.target) {
        resolveOffsets(element, info, options);
      }
    },
    notify: () => onScroll(info)
  };
}

const scrollListeners = new WeakMap();
const resizeListeners = new WeakMap();
const onScrollHandlers = new WeakMap();
const getEventTarget = (element) => element === document.scrollingElement ? window : element;
function scrollInfo(onScroll, { container = document.scrollingElement, ...options } = {}) {
    if (!container)
        return noop;
    let containerHandlers = onScrollHandlers.get(container);
    /**
     * Get the onScroll handlers for this container.
     * If one isn't found, create a new one.
     */
    if (!containerHandlers) {
        containerHandlers = new Set();
        onScrollHandlers.set(container, containerHandlers);
    }
    /**
     * Create a new onScroll handler for the provided callback.
     */
    const info = createScrollInfo();
    const containerHandler = createOnScrollHandler(container, onScroll, info, options);
    containerHandlers.add(containerHandler);
    /**
     * Check if there's a scroll event listener for this container.
     * If not, create one.
     */
    if (!scrollListeners.has(container)) {
        const measureAll = () => {
            for (const handler of containerHandlers) {
                handler.measure(frameData.timestamp);
            }
            frame.preUpdate(notifyAll);
        };
        const notifyAll = () => {
            for (const handler of containerHandlers) {
                handler.notify();
            }
        };
        const listener = () => frame.read(measureAll);
        scrollListeners.set(container, listener);
        const target = getEventTarget(container);
        window.addEventListener("resize", listener, { passive: true });
        if (container !== document.documentElement) {
            resizeListeners.set(container, resize(container, listener));
        }
        target.addEventListener("scroll", listener, { passive: true });
        listener();
    }
    const listener = scrollListeners.get(container);
    frame.read(listener, false, true);
    return () => {
        cancelFrame(listener);
        /**
         * Check if we even have any handlers for this container.
         */
        const currentHandlers = onScrollHandlers.get(container);
        if (!currentHandlers)
            return;
        currentHandlers.delete(containerHandler);
        if (currentHandlers.size)
            return;
        /**
         * If no more handlers, remove the scroll listener too.
         */
        const scrollListener = scrollListeners.get(container);
        scrollListeners.delete(container);
        if (scrollListener) {
            getEventTarget(container).removeEventListener("scroll", scrollListener);
            resizeListeners.get(container)?.();
            window.removeEventListener("resize", scrollListener);
        }
    };
}

const timelineCache = new Map();
function scrollTimelineFallback(options) {
    const currentTime = { value: 0 };
    const cancel = scrollInfo((info) => {
        currentTime.value = info[options.axis].progress * 100;
    }, options);
    return { currentTime, cancel };
}
function getTimeline({ source, container, ...options }) {
    const { axis } = options;
    if (source)
        container = source;
    const containerCache = timelineCache.get(container) ?? new Map();
    timelineCache.set(container, containerCache);
    const targetKey = options.target ?? "self";
    const targetCache = containerCache.get(targetKey) ?? {};
    const axisKey = axis + (options.offset ?? []).join(",");
    if (!targetCache[axisKey]) {
        targetCache[axisKey] =
            !options.target && supportsScrollTimeline()
                ? new ScrollTimeline({ source: container, axis })
                : scrollTimelineFallback({ container, ...options });
    }
    return targetCache[axisKey];
}

function attachToAnimation(animation, options) {
    const timeline = getTimeline(options);
    return animation.attachTimeline({
        timeline: options.target ? undefined : timeline,
        observe: (valueAnimation) => {
            valueAnimation.pause();
            return observeTimeline((progress) => {
                valueAnimation.time = valueAnimation.duration * progress;
            }, timeline);
        },
    });
}

/**
 * If the onScroll function has two arguments, it's expecting
 * more specific information about the scroll from scrollInfo.
 */
function isOnScrollWithInfo(onScroll) {
    return onScroll.length === 2;
}
function attachToFunction(onScroll, options) {
    if (isOnScrollWithInfo(onScroll)) {
        return scrollInfo((info) => {
            onScroll(info[options.axis].progress, info);
        }, options);
    }
    else {
        return observeTimeline(onScroll, getTimeline(options));
    }
}

function scroll(onScroll, { axis = "y", container = document.scrollingElement, ...options } = {}) {
    if (!container)
        return noop;
    const optionsWithDefaults = { axis, container, ...options };
    return typeof onScroll === "function"
        ? attachToFunction(onScroll, optionsWithDefaults)
        : attachToAnimation(onScroll, optionsWithDefaults);
}

const {useEffect: useEffect$6} = await importShared('react');

function refWarning(name, ref) {
    warning(Boolean(!ref || ref.current));
}
const createScrollMotionValues = () => ({
    scrollX: motionValue(0),
    scrollY: motionValue(0),
    scrollXProgress: motionValue(0),
    scrollYProgress: motionValue(0),
});
function useScroll({ container, target, layoutEffect = true, ...options } = {}) {
    const values = useConstant(createScrollMotionValues);
    const useLifecycleEffect = layoutEffect
        ? useIsomorphicLayoutEffect
        : useEffect$6;
    useLifecycleEffect(() => {
        refWarning("target", target);
        refWarning("container", container);
        return scroll((_progress, { x, y, }) => {
            values.scrollX.set(x.current);
            values.scrollXProgress.set(x.progress);
            values.scrollY.set(y.current);
            values.scrollYProgress.set(y.progress);
        }, {
            ...options,
            container: container?.current || undefined,
            target: target?.current || undefined,
        });
    }, [container, target, JSON.stringify(options.offset)]);
    return values;
}

function useElementScroll(ref) {
  return useScroll({ container: ref });
}

function useViewportScroll() {
  return useScroll();
}

const {useContext: useContext$6,useState: useState$4,useEffect: useEffect$5} = await importShared('react');

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
    const { isStatic } = useContext$6(MotionConfigContext);
    if (isStatic) {
        const [, setLatest] = useState$4(initial);
        useEffect$5(() => value.on("change", setLatest), []);
    }
    return value;
}

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

/**
 * Combine multiple motion values into a new one using a string template literal.
 *
 * ```jsx
 * import {
 *   motion,
 *   useSpring,
 *   useMotionValue,
 *   useMotionTemplate
 * } from "framer-motion"
 *
 * function Component() {
 *   const shadowX = useSpring(0)
 *   const shadowY = useMotionValue(0)
 *   const shadow = useMotionTemplate`drop-shadow(${shadowX}px ${shadowY}px 20px rgba(0,0,0,0.3))`
 *
 *   return <motion.div style={{ filter: shadow }} />
 * }
 * ```
 *
 * @public
 */
function useMotionTemplate(fragments, ...values) {
    /**
     * Create a function that will build a string from the latest motion values.
     */
    const numFragments = fragments.length;
    function buildValue() {
        let output = ``;
        for (let i = 0; i < numFragments; i++) {
            output += fragments[i];
            const value = values[i];
            if (value) {
                output += isMotionValue(value) ? value.get() : value;
            }
        }
        return output;
    }
    return useCombineMotionValues(values.filter(isMotionValue), buildValue);
}

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
    collectMotionValues.current = undefined;
    return value;
}

function useTransform(input, inputRangeOrTransformer, outputRange, options) {
    if (typeof input === "function") {
        return useComputed(input);
    }
    const transformer = typeof inputRangeOrTransformer === "function"
        ? inputRangeOrTransformer
        : transform(inputRangeOrTransformer, outputRange, options);
    return Array.isArray(input)
        ? useListTransform(input, transformer)
        : useListTransform([input], ([latest]) => transformer(latest));
}
function useListTransform(values, transformer) {
    const latest = useConstant(() => []);
    return useCombineMotionValues(values, () => {
        latest.length = 0;
        const numValues = values.length;
        for (let i = 0; i < numValues; i++) {
            latest[i] = values[i].get();
        }
        return transformer(latest);
    });
}

const {useContext: useContext$5,useInsertionEffect} = await importShared('react');

function useSpring(source, options = {}) {
    const { isStatic } = useContext$5(MotionConfigContext);
    const getFromSource = () => (isMotionValue(source) ? source.get() : source);
    // isStatic will never change, allowing early hooks return
    if (isStatic) {
        return useTransform(getFromSource);
    }
    const value = useMotionValue(getFromSource());
    useInsertionEffect(() => {
        return attachSpring(value, source, options);
    }, [value, JSON.stringify(options)]);
    return value;
}

const {useRef: useRef$3,useContext: useContext$4,useEffect: useEffect$4} = await importShared('react');

function useAnimationFrame(callback) {
    const initialTimestamp = useRef$3(0);
    const { isStatic } = useContext$4(MotionConfigContext);
    useEffect$4(() => {
        if (isStatic)
            return;
        const provideTimeSinceStart = ({ timestamp, delta }) => {
            if (!initialTimestamp.current)
                initialTimestamp.current = timestamp;
            callback(timestamp - initialTimestamp.current, delta);
        };
        frame.update(provideTimeSinceStart, true);
        return () => cancelFrame(provideTimeSinceStart);
    }, [callback]);
}

function useTime() {
    const time = useMotionValue(0);
    useAnimationFrame((t) => time.set(t));
    return time;
}

/**
 * Creates a `MotionValue` that updates when the velocity of the provided `MotionValue` changes.
 *
 * ```javascript
 * const x = useMotionValue(0)
 * const xVelocity = useVelocity(x)
 * const xAcceleration = useVelocity(xVelocity)
 * ```
 *
 * @public
 */
function useVelocity(value) {
    const velocity = useMotionValue(value.getVelocity());
    const updateVelocity = () => {
        const latest = value.getVelocity();
        velocity.set(latest);
        /**
         * If we still have velocity, schedule an update for the next frame
         * to keep checking until it is zero.
         */
        if (latest)
            frame.update(updateVelocity);
    };
    useMotionValueEvent(value, "change", () => {
        // Schedule an update to this value at the end of the current frame.
        frame.update(updateVelocity, false, true);
    });
    return velocity;
}

const {useState: useState$3} = await importShared('react');
function useReducedMotion() {
  !hasReducedMotionListener.current && initPrefersReducedMotion();
  const [shouldReduceMotion] = useState$3(prefersReducedMotion.current);
  return shouldReduceMotion;
}

const {useContext: useContext$3} = await importShared('react');

function useReducedMotionConfig() {
    const reducedMotionPreference = useReducedMotion();
    const { reducedMotion } = useContext$3(MotionConfigContext);
    if (reducedMotion === "never") {
        return false;
    }
    else if (reducedMotion === "always") {
        return true;
    }
    else {
        return reducedMotionPreference;
    }
}

function stopAnimation(visualElement) {
    visualElement.values.forEach((value) => value.stop());
}
function setVariants(visualElement, variantLabels) {
    const reversedLabels = [...variantLabels].reverse();
    reversedLabels.forEach((key) => {
        const variant = visualElement.getVariant(key);
        variant && setTarget(visualElement, variant);
        if (visualElement.variantChildren) {
            visualElement.variantChildren.forEach((child) => {
                setVariants(child, variantLabels);
            });
        }
    });
}
function setValues(visualElement, definition) {
    if (Array.isArray(definition)) {
        return setVariants(visualElement, definition);
    }
    else if (typeof definition === "string") {
        return setVariants(visualElement, [definition]);
    }
    else {
        setTarget(visualElement, definition);
    }
}
/**
 * @public
 */
function animationControls() {
    /**
     * A collection of linked component animation controls.
     */
    const subscribers = new Set();
    const controls = {
        subscribe(visualElement) {
            subscribers.add(visualElement);
            return () => void subscribers.delete(visualElement);
        },
        start(definition, transitionOverride) {
            const animations = [];
            subscribers.forEach((visualElement) => {
                animations.push(animateVisualElement(visualElement, definition, {
                    transitionOverride,
                }));
            });
            return Promise.all(animations);
        },
        set(definition) {
            return subscribers.forEach((visualElement) => {
                setValues(visualElement, definition);
            });
        },
        stop() {
            subscribers.forEach((visualElement) => {
                stopAnimation(visualElement);
            });
        },
        mount() {
            return () => {
                controls.stop();
            };
        },
    };
    return controls;
}

function isDOMKeyframes(keyframes) {
    return typeof keyframes === "object" && !Array.isArray(keyframes);
}

function resolveSubjects(subject, keyframes, scope, selectorCache) {
    if (typeof subject === "string" && isDOMKeyframes(keyframes)) {
        return resolveElements(subject, scope, selectorCache);
    }
    else if (subject instanceof NodeList) {
        return Array.from(subject);
    }
    else if (Array.isArray(subject)) {
        return subject;
    }
    else {
        return [subject];
    }
}

function calculateRepeatDuration(duration, repeat, _repeatDelay) {
    return duration * (repeat + 1);
}

/**
 * Given a absolute or relative time definition and current/prev time state of the sequence,
 * calculate an absolute time for the next keyframes.
 */
function calcNextTime(current, next, prev, labels) {
    if (typeof next === "number") {
        return next;
    }
    else if (next.startsWith("-") || next.startsWith("+")) {
        return Math.max(0, current + parseFloat(next));
    }
    else if (next === "<") {
        return prev;
    }
    else {
        return labels.get(next) ?? current;
    }
}

function eraseKeyframes(sequence, startTime, endTime) {
    for (let i = 0; i < sequence.length; i++) {
        const keyframe = sequence[i];
        if (keyframe.at > startTime && keyframe.at < endTime) {
            removeItem(sequence, keyframe);
            // If we remove this item we have to push the pointer back one
            i--;
        }
    }
}
function addKeyframes(sequence, keyframes, easing, offset, startTime, endTime) {
    /**
     * Erase every existing value between currentTime and targetTime,
     * this will essentially splice this timeline into any currently
     * defined ones.
     */
    eraseKeyframes(sequence, startTime, endTime);
    for (let i = 0; i < keyframes.length; i++) {
        sequence.push({
            value: keyframes[i],
            at: mixNumber(startTime, endTime, offset[i]),
            easing: getEasingForSegment(easing, i),
        });
    }
}

/**
 * Take an array of times that represent repeated keyframes. For instance
 * if we have original times of [0, 0.5, 1] then our repeated times will
 * be [0, 0.5, 1, 1, 1.5, 2]. Loop over the times and scale them back
 * down to a 0-1 scale.
 */
function normalizeTimes(times, repeat) {
    for (let i = 0; i < times.length; i++) {
        times[i] = times[i] / (repeat + 1);
    }
}

function compareByTime(a, b) {
    if (a.at === b.at) {
        if (a.value === null)
            return 1;
        if (b.value === null)
            return -1;
        return 0;
    }
    else {
        return a.at - b.at;
    }
}

const defaultSegmentEasing = "easeInOut";
function createAnimationsFromSequence(sequence, { defaultTransition = {}, ...sequenceTransition } = {}, scope, generators) {
    const defaultDuration = defaultTransition.duration || 0.3;
    const animationDefinitions = new Map();
    const sequences = new Map();
    const elementCache = {};
    const timeLabels = new Map();
    let prevTime = 0;
    let currentTime = 0;
    let totalDuration = 0;
    /**
     * Build the timeline by mapping over the sequence array and converting
     * the definitions into keyframes and offsets with absolute time values.
     * These will later get converted into relative offsets in a second pass.
     */
    for (let i = 0; i < sequence.length; i++) {
        const segment = sequence[i];
        /**
         * If this is a timeline label, mark it and skip the rest of this iteration.
         */
        if (typeof segment === "string") {
            timeLabels.set(segment, currentTime);
            continue;
        }
        else if (!Array.isArray(segment)) {
            timeLabels.set(segment.name, calcNextTime(currentTime, segment.at, prevTime, timeLabels));
            continue;
        }
        let [subject, keyframes, transition = {}] = segment;
        /**
         * If a relative or absolute time value has been specified we need to resolve
         * it in relation to the currentTime.
         */
        if (transition.at !== undefined) {
            currentTime = calcNextTime(currentTime, transition.at, prevTime, timeLabels);
        }
        /**
         * Keep track of the maximum duration in this definition. This will be
         * applied to currentTime once the definition has been parsed.
         */
        let maxDuration = 0;
        const resolveValueSequence = (valueKeyframes, valueTransition, valueSequence, elementIndex = 0, numSubjects = 0) => {
            const valueKeyframesAsList = keyframesAsList(valueKeyframes);
            const { delay = 0, times = defaultOffset$1(valueKeyframesAsList), type = "keyframes", repeat, repeatType, repeatDelay = 0, ...remainingTransition } = valueTransition;
            let { ease = defaultTransition.ease || "easeOut", duration } = valueTransition;
            /**
             * Resolve stagger() if defined.
             */
            const calculatedDelay = typeof delay === "function"
                ? delay(elementIndex, numSubjects)
                : delay;
            /**
             * If this animation should and can use a spring, generate a spring easing function.
             */
            const numKeyframes = valueKeyframesAsList.length;
            const createGenerator = isGenerator(type)
                ? type
                : generators?.[type];
            if (numKeyframes <= 2 && createGenerator) {
                /**
                 * As we're creating an easing function from a spring,
                 * ideally we want to generate it using the real distance
                 * between the two keyframes. However this isn't always
                 * possible - in these situations we use 0-100.
                 */
                let absoluteDelta = 100;
                if (numKeyframes === 2 &&
                    isNumberKeyframesArray(valueKeyframesAsList)) {
                    const delta = valueKeyframesAsList[1] - valueKeyframesAsList[0];
                    absoluteDelta = Math.abs(delta);
                }
                const springTransition = { ...remainingTransition };
                if (duration !== undefined) {
                    springTransition.duration = secondsToMilliseconds(duration);
                }
                const springEasing = createGeneratorEasing(springTransition, absoluteDelta, createGenerator);
                ease = springEasing.ease;
                duration = springEasing.duration;
            }
            duration ?? (duration = defaultDuration);
            const startTime = currentTime + calculatedDelay;
            /**
             * If there's only one time offset of 0, fill in a second with length 1
             */
            if (times.length === 1 && times[0] === 0) {
                times[1] = 1;
            }
            /**
             * Fill out if offset if fewer offsets than keyframes
             */
            const remainder = times.length - valueKeyframesAsList.length;
            remainder > 0 && fillOffset(times, remainder);
            /**
             * If only one value has been set, ie [1], push a null to the start of
             * the keyframe array. This will let us mark a keyframe at this point
             * that will later be hydrated with the previous value.
             */
            valueKeyframesAsList.length === 1 &&
                valueKeyframesAsList.unshift(null);
            /**
             * Handle repeat options
             */
            if (repeat) {
                duration = calculateRepeatDuration(duration, repeat);
                const originalKeyframes = [...valueKeyframesAsList];
                const originalTimes = [...times];
                ease = Array.isArray(ease) ? [...ease] : [ease];
                const originalEase = [...ease];
                for (let repeatIndex = 0; repeatIndex < repeat; repeatIndex++) {
                    valueKeyframesAsList.push(...originalKeyframes);
                    for (let keyframeIndex = 0; keyframeIndex < originalKeyframes.length; keyframeIndex++) {
                        times.push(originalTimes[keyframeIndex] + (repeatIndex + 1));
                        ease.push(keyframeIndex === 0
                            ? "linear"
                            : getEasingForSegment(originalEase, keyframeIndex - 1));
                    }
                }
                normalizeTimes(times, repeat);
            }
            const targetTime = startTime + duration;
            /**
             * Add keyframes, mapping offsets to absolute time.
             */
            addKeyframes(valueSequence, valueKeyframesAsList, ease, times, startTime, targetTime);
            maxDuration = Math.max(calculatedDelay + duration, maxDuration);
            totalDuration = Math.max(targetTime, totalDuration);
        };
        if (isMotionValue(subject)) {
            const subjectSequence = getSubjectSequence(subject, sequences);
            resolveValueSequence(keyframes, transition, getValueSequence("default", subjectSequence));
        }
        else {
            const subjects = resolveSubjects(subject, keyframes, scope, elementCache);
            const numSubjects = subjects.length;
            /**
             * For every element in this segment, process the defined values.
             */
            for (let subjectIndex = 0; subjectIndex < numSubjects; subjectIndex++) {
                /**
                 * Cast necessary, but we know these are of this type
                 */
                keyframes = keyframes;
                transition = transition;
                const thisSubject = subjects[subjectIndex];
                const subjectSequence = getSubjectSequence(thisSubject, sequences);
                for (const key in keyframes) {
                    resolveValueSequence(keyframes[key], getValueTransition(transition, key), getValueSequence(key, subjectSequence), subjectIndex, numSubjects);
                }
            }
        }
        prevTime = currentTime;
        currentTime += maxDuration;
    }
    /**
     * For every element and value combination create a new animation.
     */
    sequences.forEach((valueSequences, element) => {
        for (const key in valueSequences) {
            const valueSequence = valueSequences[key];
            /**
             * Arrange all the keyframes in ascending time order.
             */
            valueSequence.sort(compareByTime);
            const keyframes = [];
            const valueOffset = [];
            const valueEasing = [];
            /**
             * For each keyframe, translate absolute times into
             * relative offsets based on the total duration of the timeline.
             */
            for (let i = 0; i < valueSequence.length; i++) {
                const { at, value, easing } = valueSequence[i];
                keyframes.push(value);
                valueOffset.push(progress(0, totalDuration, at));
                valueEasing.push(easing || "easeOut");
            }
            /**
             * If the first keyframe doesn't land on offset: 0
             * provide one by duplicating the initial keyframe. This ensures
             * it snaps to the first keyframe when the animation starts.
             */
            if (valueOffset[0] !== 0) {
                valueOffset.unshift(0);
                keyframes.unshift(keyframes[0]);
                valueEasing.unshift(defaultSegmentEasing);
            }
            /**
             * If the last keyframe doesn't land on offset: 1
             * provide one with a null wildcard value. This will ensure it
             * stays static until the end of the animation.
             */
            if (valueOffset[valueOffset.length - 1] !== 1) {
                valueOffset.push(1);
                keyframes.push(null);
            }
            if (!animationDefinitions.has(element)) {
                animationDefinitions.set(element, {
                    keyframes: {},
                    transition: {},
                });
            }
            const definition = animationDefinitions.get(element);
            definition.keyframes[key] = keyframes;
            definition.transition[key] = {
                ...defaultTransition,
                duration: totalDuration,
                ease: valueEasing,
                times: valueOffset,
                ...sequenceTransition,
            };
        }
    });
    return animationDefinitions;
}
function getSubjectSequence(subject, sequences) {
    !sequences.has(subject) && sequences.set(subject, {});
    return sequences.get(subject);
}
function getValueSequence(name, sequences) {
    if (!sequences[name])
        sequences[name] = [];
    return sequences[name];
}
function keyframesAsList(keyframes) {
    return Array.isArray(keyframes) ? keyframes : [keyframes];
}
function getValueTransition(transition, key) {
    return transition && transition[key]
        ? {
            ...transition,
            ...transition[key],
        }
        : { ...transition };
}
const isNumber = (keyframe) => typeof keyframe === "number";
const isNumberKeyframesArray = (keyframes) => keyframes.every(isNumber);

function isObjectKey(key, object) {
    return key in object;
}
class ObjectVisualElement extends VisualElement {
    constructor() {
        super(...arguments);
        this.type = "object";
    }
    readValueFromInstance(instance, key) {
        if (isObjectKey(key, instance)) {
            const value = instance[key];
            if (typeof value === "string" || typeof value === "number") {
                return value;
            }
        }
        return undefined;
    }
    getBaseTargetFromProps() {
        return undefined;
    }
    removeValueFromRenderState(key, renderState) {
        delete renderState.output[key];
    }
    measureInstanceViewportBox() {
        return createBox();
    }
    build(renderState, latestValues) {
        Object.assign(renderState.output, latestValues);
    }
    renderInstance(instance, { output }) {
        Object.assign(instance, output);
    }
    sortInstanceNodePosition() {
        return 0;
    }
}

function createDOMVisualElement(element) {
    const options = {
        presenceContext: null,
        props: {},
        visualState: {
            renderState: {
                transform: {},
                transformOrigin: {},
                style: {},
                vars: {},
                attrs: {},
            },
            latestValues: {},
        },
    };
    const node = isSVGElement(element) && !isSVGSVGElement(element)
        ? new SVGVisualElement(options)
        : new HTMLVisualElement(options);
    node.mount(element);
    visualElementStore.set(element, node);
}
function createObjectVisualElement(subject) {
    const options = {
        presenceContext: null,
        props: {},
        visualState: {
            renderState: {
                output: {},
            },
            latestValues: {},
        },
    };
    const node = new ObjectVisualElement(options);
    node.mount(subject);
    visualElementStore.set(subject, node);
}

function isSingleValue(subject, keyframes) {
    return (isMotionValue(subject) ||
        typeof subject === "number" ||
        (typeof subject === "string" && !isDOMKeyframes(keyframes)));
}
/**
 * Implementation
 */
function animateSubject(subject, keyframes, options, scope) {
    const animations = [];
    if (isSingleValue(subject, keyframes)) {
        animations.push(animateSingleValue(subject, isDOMKeyframes(keyframes)
            ? keyframes.default || keyframes
            : keyframes, options ? options.default || options : options));
    }
    else {
        const subjects = resolveSubjects(subject, keyframes, scope);
        const numSubjects = subjects.length;
        for (let i = 0; i < numSubjects; i++) {
            const thisSubject = subjects[i];
            const createVisualElement = thisSubject instanceof Element
                ? createDOMVisualElement
                : createObjectVisualElement;
            if (!visualElementStore.has(thisSubject)) {
                createVisualElement(thisSubject);
            }
            const visualElement = visualElementStore.get(thisSubject);
            const transition = { ...options };
            /**
             * Resolve stagger function if provided.
             */
            if ("delay" in transition &&
                typeof transition.delay === "function") {
                transition.delay = transition.delay(i, numSubjects);
            }
            animations.push(...animateTarget(visualElement, { ...keyframes, transition }, {}));
        }
    }
    return animations;
}

function animateSequence(sequence, options, scope) {
    const animations = [];
    const animationDefinitions = createAnimationsFromSequence(sequence, options, scope, { spring });
    animationDefinitions.forEach(({ keyframes, transition }, subject) => {
        animations.push(...animateSubject(subject, keyframes, transition));
    });
    return animations;
}

function isSequence(value) {
    return Array.isArray(value) && value.some(Array.isArray);
}
/**
 * Creates an animation function that is optionally scoped
 * to a specific element.
 */
function createScopedAnimate(scope) {
    /**
     * Implementation
     */
    function scopedAnimate(subjectOrSequence, optionsOrKeyframes, options) {
        let animations = [];
        if (isSequence(subjectOrSequence)) {
            animations = animateSequence(subjectOrSequence, optionsOrKeyframes, scope);
        }
        else {
            animations = animateSubject(subjectOrSequence, optionsOrKeyframes, options, scope);
        }
        const animation = new GroupAnimationWithThen(animations);
        if (scope) {
            scope.animations.push(animation);
        }
        return animation;
    }
    return scopedAnimate;
}
const animate = createScopedAnimate();

function useAnimate() {
    const scope = useConstant(() => ({
        current: null, // Will be hydrated by React
        animations: [],
    }));
    const animate = useConstant(() => createScopedAnimate(scope));
    useUnmountEffect(() => {
        scope.animations.forEach((animation) => animation.stop());
    });
    return [scope, animate];
}

function animateElements(elementOrSelector, keyframes, options, scope) {
    const elements = resolveElements(elementOrSelector, scope);
    const numElements = elements.length;
    /**
     * WAAPI doesn't support interrupting animations.
     *
     * Therefore, starting animations requires a three-step process:
     * 1. Stop existing animations (write styles to DOM)
     * 2. Resolve keyframes (read styles from DOM)
     * 3. Create new animations (write styles to DOM)
     *
     * The hybrid `animate()` function uses AsyncAnimation to resolve
     * keyframes before creating new animations, which removes style
     * thrashing. Here, we have much stricter filesize constraints.
     * Therefore we do this in a synchronous way that ensures that
     * at least within `animate()` calls there is no style thrashing.
     *
     * In the motion-native-animate-mini-interrupt benchmark this
     * was 80% faster than a single loop.
     */
    const animationDefinitions = [];
    /**
     * Step 1: Build options and stop existing animations (write)
     */
    for (let i = 0; i < numElements; i++) {
        const element = elements[i];
        const elementTransition = { ...options };
        /**
         * Resolve stagger function if provided.
         */
        if (typeof elementTransition.delay === "function") {
            elementTransition.delay = elementTransition.delay(i, numElements);
        }
        for (const valueName in keyframes) {
            let valueKeyframes = keyframes[valueName];
            if (!Array.isArray(valueKeyframes)) {
                valueKeyframes = [valueKeyframes];
            }
            const valueOptions = {
                ...getValueTransition$1(elementTransition, valueName),
            };
            valueOptions.duration && (valueOptions.duration = secondsToMilliseconds(valueOptions.duration));
            valueOptions.delay && (valueOptions.delay = secondsToMilliseconds(valueOptions.delay));
            /**
             * If there's an existing animation playing on this element then stop it
             * before creating a new one.
             */
            const map = getAnimationMap(element);
            const key = animationMapKey(valueName, valueOptions.pseudoElement || "");
            const currentAnimation = map.get(key);
            currentAnimation && currentAnimation.stop();
            animationDefinitions.push({
                map,
                key,
                unresolvedKeyframes: valueKeyframes,
                options: {
                    ...valueOptions,
                    element,
                    name: valueName,
                    allowFlatten: !elementTransition.type && !elementTransition.ease,
                },
            });
        }
    }
    /**
     * Step 2: Resolve keyframes (read)
     */
    for (let i = 0; i < animationDefinitions.length; i++) {
        const { unresolvedKeyframes, options: animationOptions } = animationDefinitions[i];
        const { element, name, pseudoElement } = animationOptions;
        if (!pseudoElement && unresolvedKeyframes[0] === null) {
            unresolvedKeyframes[0] = getComputedStyle$1(element, name);
        }
        fillWildcards(unresolvedKeyframes);
        applyPxDefaults(unresolvedKeyframes, name);
        /**
         * If we only have one keyframe, explicitly read the initial keyframe
         * from the computed style. This is to ensure consistency with WAAPI behaviour
         * for restarting animations, for instance .play() after finish, when it
         * has one vs two keyframes.
         */
        if (!pseudoElement && unresolvedKeyframes.length < 2) {
            unresolvedKeyframes.unshift(getComputedStyle$1(element, name));
        }
        animationOptions.keyframes = unresolvedKeyframes;
    }
    /**
     * Step 3: Create new animations (write)
     */
    const animations = [];
    for (let i = 0; i < animationDefinitions.length; i++) {
        const { map, key, options: animationOptions } = animationDefinitions[i];
        const animation = new NativeAnimation(animationOptions);
        map.set(key, animation);
        animation.finished.finally(() => map.delete(key));
        animations.push(animation);
    }
    return animations;
}

const createScopedWaapiAnimate = (scope) => {
    function scopedAnimate(elementOrSelector, keyframes, options) {
        return new GroupAnimationWithThen(animateElements(elementOrSelector, keyframes, options, scope));
    }
    return scopedAnimate;
};
const animateMini = /*@__PURE__*/ createScopedWaapiAnimate();

function useAnimateMini() {
    const scope = useConstant(() => ({
        current: null, // Will be hydrated by React
        animations: [],
    }));
    const animate = useConstant(() => createScopedWaapiAnimate(scope));
    useUnmountEffect(() => {
        scope.animations.forEach((animation) => animation.stop());
    });
    return [scope, animate];
}

/**
 * Creates `AnimationControls`, which can be used to manually start, stop
 * and sequence animations on one or more components.
 *
 * The returned `AnimationControls` should be passed to the `animate` property
 * of the components you want to animate.
 *
 * These components can then be animated with the `start` method.
 *
 * ```jsx
 * import * as React from 'react'
 * import { motion, useAnimation } from 'framer-motion'
 *
 * export function MyComponent(props) {
 *    const controls = useAnimation()
 *
 *    controls.start({
 *        x: 100,
 *        transition: { duration: 0.5 },
 *    })
 *
 *    return <motion.div animate={controls} />
 * }
 * ```
 *
 * @returns Animation controller with `start` and `stop` methods
 *
 * @public
 */
function useAnimationControls() {
    const controls = useConstant(animationControls);
    useIsomorphicLayoutEffect(controls.mount, []);
    return controls;
}
const useAnimation = useAnimationControls;

const {useContext: useContext$2} = await importShared('react');

function usePresenceData() {
    const context = useContext$2(PresenceContext);
    return context ? context.custom : undefined;
}

const {useEffect: useEffect$3} = await importShared('react');

/**
 * Attaches an event listener directly to the provided DOM element.
 *
 * Bypassing React's event system can be desirable, for instance when attaching non-passive
 * event handlers.
 *
 * ```jsx
 * const ref = useRef(null)
 *
 * useDomEvent(ref, 'wheel', onWheel, { passive: false })
 *
 * return <div ref={ref} />
 * ```
 *
 * @param ref - React.RefObject that's been provided to the element you want to bind the listener to.
 * @param eventName - Name of the event you want listen for.
 * @param handler - Function to fire when receiving the event.
 * @param options - Options to pass to `Event.addEventListener`.
 *
 * @public
 */
function useDomEvent(ref, eventName, handler, options) {
    useEffect$3(() => {
        const element = ref.current;
        if (handler && element) {
            return addDomEvent(element, eventName, handler, options);
        }
    }, [ref, eventName, handler, options]);
}

/**
 * Can manually trigger a drag gesture on one or more `drag`-enabled `motion` components.
 *
 * ```jsx
 * const dragControls = useDragControls()
 *
 * function startDrag(event) {
 *   dragControls.start(event, { snapToCursor: true })
 * }
 *
 * return (
 *   <>
 *     <div onPointerDown={startDrag} />
 *     <motion.div drag="x" dragControls={dragControls} />
 *   </>
 * )
 * ```
 *
 * @public
 */
class DragControls {
    constructor() {
        this.componentControls = new Set();
    }
    /**
     * Subscribe a component's internal `VisualElementDragControls` to the user-facing API.
     *
     * @internal
     */
    subscribe(controls) {
        this.componentControls.add(controls);
        return () => this.componentControls.delete(controls);
    }
    /**
     * Start a drag gesture on every `motion` component that has this set of drag controls
     * passed into it via the `dragControls` prop.
     *
     * ```jsx
     * dragControls.start(e, {
     *   snapToCursor: true
     * })
     * ```
     *
     * @param event - PointerEvent
     * @param options - Options
     *
     * @public
     */
    start(event, options) {
        this.componentControls.forEach((controls) => {
            controls.start(event.nativeEvent || event, options);
        });
    }
}
const createDragControls = () => new DragControls();
/**
 * Usually, dragging is initiated by pressing down on a `motion` component with a `drag` prop
 * and moving it. For some use-cases, for instance clicking at an arbitrary point on a video scrubber, we
 * might want to initiate that dragging from a different component than the draggable one.
 *
 * By creating a `dragControls` using the `useDragControls` hook, we can pass this into
 * the draggable component's `dragControls` prop. It exposes a `start` method
 * that can start dragging from pointer events on other components.
 *
 * ```jsx
 * const dragControls = useDragControls()
 *
 * function startDrag(event) {
 *   dragControls.start(event, { snapToCursor: true })
 * }
 *
 * return (
 *   <>
 *     <div onPointerDown={startDrag} />
 *     <motion.div drag="x" dragControls={dragControls} />
 *   </>
 * )
 * ```
 *
 * @public
 */
function useDragControls() {
    return useConstant(createDragControls);
}

/**
 * Checks if a component is a `motion` component.
 */
function isMotionComponent(component) {
    return (component !== null &&
        typeof component === "object" &&
        motionComponentSymbol in component);
}

/**
 * Unwraps a `motion` component and returns either a string for `motion.div` or
 * the React component for `motion(Component)`.
 *
 * If the component is not a `motion` component it returns undefined.
 */
function unwrapMotionComponent(component) {
    if (isMotionComponent(component)) {
        return component[motionComponentSymbol];
    }
    return undefined;
}

function useInstantLayoutTransition() {
    return startTransition;
}
function startTransition(callback) {
    if (!rootProjectionNode.current)
        return;
    rootProjectionNode.current.isUpdating = false;
    rootProjectionNode.current.blockUpdate();
    callback && callback();
}

const {useCallback: useCallback$1} = await importShared('react');

function useResetProjection() {
    const reset = useCallback$1(() => {
        const root = rootProjectionNode.current;
        if (!root)
            return;
        root.resetTree();
    }, []);
    return reset;
}

const {useRef: useRef$2,useState: useState$2,useCallback} = await importShared('react');


/**
 * Cycles through a series of visual properties. Can be used to toggle between or cycle through animations. It works similar to `useState` in React. It is provided an initial array of possible states, and returns an array of two arguments.
 *
 * An index value can be passed to the returned `cycle` function to cycle to a specific index.
 *
 * ```jsx
 * import * as React from "react"
 * import { motion, useCycle } from "framer-motion"
 *
 * export const MyComponent = () => {
 *   const [x, cycleX] = useCycle(0, 50, 100)
 *
 *   return (
 *     <motion.div
 *       animate={{ x: x }}
 *       onTap={() => cycleX()}
 *      />
 *    )
 * }
 * ```
 *
 * @param items - items to cycle through
 * @returns [currentState, cycleState]
 *
 * @public
 */
function useCycle(...items) {
    const index = useRef$2(0);
    const [item, setItem] = useState$2(items[index.current]);
    const runCycle = useCallback((next) => {
        index.current =
            typeof next !== "number"
                ? wrap(0, items.length, index.current + 1)
                : next;
        setItem(items[index.current]);
    }, 
    // The array will change on each call, but by putting items.length at
    // the front of this array, we guarantee the dependency comparison will match up
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items.length, ...items]);
    return [item, runCycle];
}

const thresholds = {
    some: 0,
    all: 1,
};
function inView(elementOrSelector, onStart, { root, margin: rootMargin, amount = "some" } = {}) {
    const elements = resolveElements(elementOrSelector);
    const activeIntersections = new WeakMap();
    const onIntersectionChange = (entries) => {
        entries.forEach((entry) => {
            const onEnd = activeIntersections.get(entry.target);
            /**
             * If there's no change to the intersection, we don't need to
             * do anything here.
             */
            if (entry.isIntersecting === Boolean(onEnd))
                return;
            if (entry.isIntersecting) {
                const newOnEnd = onStart(entry.target, entry);
                if (typeof newOnEnd === "function") {
                    activeIntersections.set(entry.target, newOnEnd);
                }
                else {
                    observer.unobserve(entry.target);
                }
            }
            else if (typeof onEnd === "function") {
                onEnd(entry);
                activeIntersections.delete(entry.target);
            }
        });
    };
    const observer = new IntersectionObserver(onIntersectionChange, {
        root,
        rootMargin,
        threshold: typeof amount === "number" ? amount : thresholds[amount],
    });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
}

const {useState: useState$1,useEffect: useEffect$2} = await importShared('react');

function useInView(ref, { root, margin, amount, once = false, initial = false, } = {}) {
    const [isInView, setInView] = useState$1(initial);
    useEffect$2(() => {
        if (!ref.current || (once && isInView))
            return;
        const onEnter = () => {
            setInView(true);
            return once ? undefined : () => setInView(false);
        };
        const options = {
            root: (root && root.current) || undefined,
            margin,
            amount,
        };
        return inView(ref.current, onEnter, options);
    }, [root, ref, margin, once, amount]);
    return isInView;
}

const {useRef: useRef$1,useEffect: useEffect$1} = await importShared('react');

function useInstantTransition() {
    const [forceUpdate, forcedRenderCount] = useForceUpdate();
    const startInstantLayoutTransition = useInstantLayoutTransition();
    const unlockOnFrameRef = useRef$1(-1);
    useEffect$1(() => {
        /**
         * Unblock after two animation frames, otherwise this will unblock too soon.
         */
        frame.postRender(() => frame.postRender(() => {
            /**
             * If the callback has been called again after the effect
             * triggered this 2 frame delay, don't unblock animations. This
             * prevents the previous effect from unblocking the current
             * instant transition too soon. This becomes more likely when
             * used in conjunction with React.startTransition().
             */
            if (forcedRenderCount !== unlockOnFrameRef.current)
                return;
            MotionGlobalConfig.instantAnimations = false;
        }));
    }, [forcedRenderCount]);
    return (callback) => {
        startInstantLayoutTransition(() => {
            MotionGlobalConfig.instantAnimations = true;
            forceUpdate();
            callback();
            unlockOnFrameRef.current = forcedRenderCount + 1;
        });
    };
}
function disableInstantTransitions() {
    MotionGlobalConfig.instantAnimations = false;
}

const appearAnimationStore = new Map();
const appearComplete = new Map();

const appearStoreId = (elementId, valueName) => {
    const key = transformProps.has(valueName) ? "transform" : valueName;
    return `${elementId}: ${key}`;
};

function handoffOptimizedAppearAnimation(elementId, valueName, frame) {
    const storeId = appearStoreId(elementId, valueName);
    const optimisedAnimation = appearAnimationStore.get(storeId);
    if (!optimisedAnimation) {
        return null;
    }
    const { animation, startTime } = optimisedAnimation;
    function cancelAnimation() {
        window.MotionCancelOptimisedAnimation?.(elementId, valueName, frame);
    }
    /**
     * We can cancel the animation once it's finished now that we've synced
     * with Motion.
     *
     * Prefer onfinish over finished as onfinish is backwards compatible with
     * older browsers.
     */
    animation.onfinish = cancelAnimation;
    if (startTime === null || window.MotionHandoffIsComplete?.(elementId)) {
        /**
         * If the startTime is null, this animation is the Paint Ready detection animation
         * and we can cancel it immediately without handoff.
         *
         * Or if we've already handed off the animation then we're now interrupting it.
         * In which case we need to cancel it.
         */
        cancelAnimation();
        return null;
    }
    else {
        return startTime;
    }
}

/**
 * A single time to use across all animations to manually set startTime
 * and ensure they're all in sync.
 */
let startFrameTime;
/**
 * A dummy animation to detect when Chrome is ready to start
 * painting the page and hold off from triggering the real animation
 * until then. We only need one animation to detect paint ready.
 *
 * https://bugs.chromium.org/p/chromium/issues/detail?id=1406850
 */
let readyAnimation;
/**
 * Keep track of animations that were suspended vs cancelled so we
 * can easily resume them when we're done measuring layout.
 */
const suspendedAnimations = new Set();
function resumeSuspendedAnimations() {
    suspendedAnimations.forEach((data) => {
        data.animation.play();
        data.animation.startTime = data.startTime;
    });
    suspendedAnimations.clear();
}
function startOptimizedAppearAnimation(element, name, keyframes, options, onReady) {
    // Prevent optimised appear animations if Motion has already started animating.
    if (window.MotionIsMounted) {
        return;
    }
    const id = element.dataset[optimizedAppearDataId];
    if (!id)
        return;
    window.MotionHandoffAnimation = handoffOptimizedAppearAnimation;
    const storeId = appearStoreId(id, name);
    if (!readyAnimation) {
        readyAnimation = startWaapiAnimation(element, name, [keyframes[0], keyframes[0]], 
        /**
         * 10 secs is basically just a super-safe duration to give Chrome
         * long enough to get the animation ready.
         */
        { duration: 10000, ease: "linear" });
        appearAnimationStore.set(storeId, {
            animation: readyAnimation,
            startTime: null,
        });
        /**
         * If there's no readyAnimation then there's been no instantiation
         * of handoff animations.
         */
        window.MotionHandoffAnimation = handoffOptimizedAppearAnimation;
        window.MotionHasOptimisedAnimation = (elementId, valueName) => {
            if (!elementId)
                return false;
            /**
             * Keep a map of elementIds that have started animating. We check
             * via ID instead of Element because of hydration errors and
             * pre-hydration checks. We also actively record IDs as they start
             * animating rather than simply checking for data-appear-id as
             * this attrbute might be present but not lead to an animation, for
             * instance if the element's appear animation is on a different
             * breakpoint.
             */
            if (!valueName) {
                return appearComplete.has(elementId);
            }
            const animationId = appearStoreId(elementId, valueName);
            return Boolean(appearAnimationStore.get(animationId));
        };
        window.MotionHandoffMarkAsComplete = (elementId) => {
            if (appearComplete.has(elementId)) {
                appearComplete.set(elementId, true);
            }
        };
        window.MotionHandoffIsComplete = (elementId) => {
            return appearComplete.get(elementId) === true;
        };
        /**
         * We only need to cancel transform animations as
         * they're the ones that will interfere with the
         * layout animation measurements.
         */
        window.MotionCancelOptimisedAnimation = (elementId, valueName, frame, canResume) => {
            const animationId = appearStoreId(elementId, valueName);
            const data = appearAnimationStore.get(animationId);
            if (!data)
                return;
            if (frame && canResume === undefined) {
                /**
                 * Wait until the end of the subsequent frame to cancel the animation
                 * to ensure we don't remove the animation before the main thread has
                 * had a chance to resolve keyframes and render.
                 */
                frame.postRender(() => {
                    frame.postRender(() => {
                        data.animation.cancel();
                    });
                });
            }
            else {
                data.animation.cancel();
            }
            if (frame && canResume) {
                suspendedAnimations.add(data);
                frame.render(resumeSuspendedAnimations);
            }
            else {
                appearAnimationStore.delete(animationId);
                /**
                 * If there are no more animations left, we can remove the cancel function.
                 * This will let us know when we can stop checking for conflicting layout animations.
                 */
                if (!appearAnimationStore.size) {
                    window.MotionCancelOptimisedAnimation = undefined;
                }
            }
        };
        window.MotionCheckAppearSync = (visualElement, valueName, value) => {
            const appearId = getOptimisedAppearId(visualElement);
            if (!appearId)
                return;
            const valueIsOptimised = window.MotionHasOptimisedAnimation?.(appearId, valueName);
            const externalAnimationValue = visualElement.props.values?.[valueName];
            if (!valueIsOptimised || !externalAnimationValue)
                return;
            const removeSyncCheck = value.on("change", (latestValue) => {
                if (externalAnimationValue.get() !== latestValue) {
                    window.MotionCancelOptimisedAnimation?.(appearId, valueName);
                    removeSyncCheck();
                }
            });
            return removeSyncCheck;
        };
    }
    const startAnimation = () => {
        readyAnimation.cancel();
        const appearAnimation = startWaapiAnimation(element, name, keyframes, options);
        /**
         * Record the time of the first started animation. We call performance.now() once
         * here and once in handoff to ensure we're getting
         * close to a frame-locked time. This keeps all animations in sync.
         */
        if (startFrameTime === undefined) {
            startFrameTime = performance.now();
        }
        appearAnimation.startTime = startFrameTime;
        appearAnimationStore.set(storeId, {
            animation: appearAnimation,
            startTime: startFrameTime,
        });
        if (onReady)
            onReady(appearAnimation);
    };
    appearComplete.set(id, false);
    if (readyAnimation.ready) {
        readyAnimation.ready.then(startAnimation).catch(noop);
    }
    else {
        startAnimation();
    }
}

const {useState,useLayoutEffect} = await importShared('react');

const createObject = () => ({});
class StateVisualElement extends VisualElement {
    constructor() {
        super(...arguments);
        this.measureInstanceViewportBox = createBox;
    }
    build() { }
    resetTransform() { }
    restoreTransform() { }
    removeValueFromRenderState() { }
    renderInstance() { }
    scrapeMotionValuesFromProps() {
        return createObject();
    }
    getBaseTargetFromProps() {
        return undefined;
    }
    readValueFromInstance(_state, key, options) {
        return options.initialState[key] || 0;
    }
    sortInstanceNodePosition() {
        return 0;
    }
}
const useVisualState = makeUseVisualState({
    scrapeMotionValuesFromProps: createObject,
    createRenderState: createObject,
});
/**
 * This is not an officially supported API and may be removed
 * on any version.
 */
function useAnimatedState(initialState) {
    const [animationState, setAnimationState] = useState(initialState);
    const visualState = useVisualState({}, false);
    const element = useConstant(() => {
        return new StateVisualElement({
            props: {
                onUpdate: (v) => {
                    setAnimationState({ ...v });
                },
            },
            visualState,
            presenceContext: null,
        }, { initialState });
    });
    useLayoutEffect(() => {
        element.mount({});
        return () => element.unmount();
    }, [element]);
    const startAnimation = useConstant(() => (animationDefinition) => {
        return animateVisualElement(element, animationDefinition);
    });
    return [animationState, startAnimation];
}

const React = await importShared('react');

let id = 0;
const AnimateSharedLayout = ({ children }) => {
    React.useEffect(() => {
    }, []);
    return (jsxRuntimeExports.jsx(LayoutGroup, { id: useConstant(() => `asl-${id++}`), children: children }));
};

const {useContext: useContext$1} = await importShared('react');

// Keep things reasonable and avoid scale: Infinity. In practise we might need
// to add another value, opacity, that could interpolate scaleX/Y [0,0.01] => [0,1]
// to simply hide content at unreasonable scales.
const maxScale = 100000;
const invertScale = (scale) => scale > 0.001 ? 1 / scale : maxScale;
/**
 * Returns a `MotionValue` each for `scaleX` and `scaleY` that update with the inverse
 * of their respective parent scales.
 *
 * This is useful for undoing the distortion of content when scaling a parent component.
 *
 * By default, `useInvertedScale` will automatically fetch `scaleX` and `scaleY` from the nearest parent.
 * By passing other `MotionValue`s in as `useInvertedScale({ scaleX, scaleY })`, it will invert the output
 * of those instead.
 *
 * ```jsx
 * const MyComponent = () => {
 *   const { scaleX, scaleY } = useInvertedScale()
 *   return <motion.div style={{ scaleX, scaleY }} />
 * }
 * ```
 *
 * @deprecated
 */
function useInvertedScale(scale) {
    let parentScaleX = useMotionValue(1);
    let parentScaleY = useMotionValue(1);
    const { visualElement } = useContext$1(MotionContext);
    if (scale) {
        parentScaleX = scale.scaleX || parentScaleX;
        parentScaleY = scale.scaleY || parentScaleY;
    }
    else if (visualElement) {
        parentScaleX = visualElement.getValue("scaleX", 1);
        parentScaleY = visualElement.getValue("scaleY", 1);
    }
    const scaleX = useTransform(parentScaleX, invertScale);
    const scaleY = useTransform(parentScaleY, invertScale);
    return { scaleX, scaleY };
}

const {createContext} = await importShared('react');


const ReorderContext = createContext(null);

function checkReorder(order, value, offset, velocity) {
    if (!velocity)
        return order;
    const index = order.findIndex((item) => item.value === value);
    if (index === -1)
        return order;
    const nextOffset = velocity > 0 ? 1 : -1;
    const nextItem = order[index + nextOffset];
    if (!nextItem)
        return order;
    const item = order[index];
    const nextLayout = nextItem.layout;
    const nextItemCenter = mixNumber(nextLayout.min, nextLayout.max, 0.5);
    if ((nextOffset === 1 && item.layout.max + offset > nextItemCenter) ||
        (nextOffset === -1 && item.layout.min + offset < nextItemCenter)) {
        return moveItem(order, index, index + nextOffset);
    }
    return order;
}

const {forwardRef: forwardRef$1,useRef,useEffect} = await importShared('react');

function ReorderGroupComponent({ children, as = "ul", axis = "y", onReorder, values, ...props }, externalRef) {
    const Component = useConstant(() => motion[as]);
    const order = [];
    const isReordering = useRef(false);
    const context = {
        axis,
        registerItem: (value, layout) => {
            // If the entry was already added, update it rather than adding it again
            const idx = order.findIndex((entry) => value === entry.value);
            if (idx !== -1) {
                order[idx].layout = layout[axis];
            }
            else {
                order.push({ value: value, layout: layout[axis] });
            }
            order.sort(compareMin);
        },
        updateOrder: (item, offset, velocity) => {
            if (isReordering.current)
                return;
            const newOrder = checkReorder(order, item, offset, velocity);
            if (order !== newOrder) {
                isReordering.current = true;
                onReorder(newOrder
                    .map(getValue)
                    .filter((value) => values.indexOf(value) !== -1));
            }
        },
    };
    useEffect(() => {
        isReordering.current = false;
    });
    return (jsxRuntimeExports.jsx(Component, { ...props, ref: externalRef, ignoreStrict: true, children: jsxRuntimeExports.jsx(ReorderContext.Provider, { value: context, children: children }) }));
}
const ReorderGroup = /*@__PURE__*/ forwardRef$1(ReorderGroupComponent);
function getValue(item) {
    return item.value;
}
function compareMin(a, b) {
    return a.layout.min - b.layout.min;
}

const {forwardRef,useContext} = await importShared('react');

function useDefaultMotionValue(value, defaultValue = 0) {
    return isMotionValue(value) ? value : useMotionValue(defaultValue);
}
function ReorderItemComponent({ children, style = {}, value, as = "li", onDrag, layout = true, ...props }, externalRef) {
    const Component = useConstant(() => motion[as]);
    const context = useContext(ReorderContext);
    const point = {
        x: useDefaultMotionValue(style.x),
        y: useDefaultMotionValue(style.y),
    };
    const zIndex = useTransform([point.x, point.y], ([latestX, latestY]) => latestX || latestY ? 1 : "unset");
    const { axis, registerItem, updateOrder } = context;
    return (jsxRuntimeExports.jsx(Component, { drag: axis, ...props, dragSnapToOrigin: true, style: { ...style, x: point.x, y: point.y, zIndex }, layout: layout, onDrag: (event, gesturePoint) => {
            const { velocity } = gesturePoint;
            velocity[axis] &&
                updateOrder(value, point[axis].get(), velocity[axis]);
            onDrag && onDrag(event, gesturePoint);
        }, onLayoutMeasure: (measured) => registerItem(value, measured), ref: externalRef, ignoreStrict: true, children: children }));
}
const ReorderItem = /*@__PURE__*/ forwardRef(ReorderItemComponent);

const namespace = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    Group: ReorderGroup,
    Item: ReorderItem
}, Symbol.toStringTag, { value: 'Module' }));

function getOriginIndex(from, total) {
    if (from === "first") {
        return 0;
    }
    else {
        const lastIndex = total - 1;
        return from === "last" ? lastIndex : lastIndex / 2;
    }
}
function stagger(duration = 0.1, { startDelay = 0, from = 0, ease } = {}) {
    return (i, total) => {
        const fromIndex = typeof from === "number" ? from : getOriginIndex(from, total);
        const distance = Math.abs(fromIndex - i);
        let delay = duration * distance;
        if (ease) {
            const maxDelay = total * duration;
            const easingFunction = easingDefinitionToFunction(ease);
            delay = easingFunction(delay / maxDelay) * maxDelay;
        }
        return startDelay + delay;
    };
}

export { AnimateSharedLayout, DragControls, GroupAnimation, GroupAnimationWithThen, JSAnimation, LayoutGroup, MotionConfigContext, MotionContext, MotionGlobalConfig, MotionValue, NativeAnimation, NativeAnimationWrapper, PresenceContext, namespace as Reorder, ViewTransitionBuilder, VisualElement, activeAnimations, addAttrValue, addStyleValue, animate, animateMini, animateView, animateVisualElement, animationControls, animationMapKey, animations, applyPxDefaults, attachSpring, attrEffect, cancelFrame, cancelSync, clamp, collectMotionValues, createBox, createGeneratorEasing, createScopedAnimate, defaultOffset$1 as defaultOffset, disableInstantTransitions, domMin, easingDefinitionToFunction, fillOffset, fillWildcards, frame, frameData, getAnimationMap, getComputedStyle$1 as getComputedStyle, getEasingForSegment, getValueAsType, getValueTransition$1 as getValueTransition, hasWarned, inView, interpolate, isBezierDefinition, isEasingArray, isGenerator, isHTMLElement, isMotionComponent, isMotionValue, isSVGElement, isSVGSVGElement, isWaapiSupportedEasing, makeUseVisualState, mapEasingToNativeEasing, mapValue, memo, microtask, mixNumber, motion, motionValue, moveItem, noop, numberValueTypes, observeTimeline, progress, propEffect, px, recordStats, removeItem, resolveElements, scroll, scrollInfo, secondsToMilliseconds, spring, springValue, stagger, startOptimizedAppearAnimation, startWaapiAnimation, statsBuffer, steps, styleEffect, supportedWaapiEasing, supportsLinearEasing, supportsPartialKeyframes, supportsScrollTimeline, svgEffect, sync, transform, transformPropOrder, transformProps, transformValue, unwrapMotionComponent, useAnimate, useAnimateMini, useAnimation, useAnimationControls, useAnimationFrame, useCycle, useAnimatedState as useDeprecatedAnimatedState, useInvertedScale as useDeprecatedInvertedScale, useDomEvent, useDragControls, useElementScroll, useForceUpdate, useInView, useInstantLayoutTransition, useInstantTransition, useIsomorphicLayoutEffect, useMotionTemplate, useMotionValue, useMotionValueEvent, usePresenceData, useReducedMotion, useReducedMotionConfig, useResetProjection, useScroll, useSpring, useTime, useTransform, useUnmountEffect, useVelocity, useViewportScroll, velocityPerSecond, visualElementStore, warnOnce, warning, wrap };
