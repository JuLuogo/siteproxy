var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// node_modules/unenv/dist/runtime/_internal/utils.mjs
// @__NO_SIDE_EFFECTS__
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
__name(createNotImplementedError, "createNotImplementedError");
// @__NO_SIDE_EFFECTS__
function notImplemented(name) {
  const fn = /* @__PURE__ */ __name(() => {
    throw /* @__PURE__ */ createNotImplementedError(name);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
__name(notImplemented, "notImplemented");
// @__NO_SIDE_EFFECTS__
function notImplementedClass(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
__name(notImplementedClass, "notImplementedClass");

// node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
var _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
var _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
var nodeTiming = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0
  },
  detail: void 0,
  toJSON() {
    return this;
  }
};
var PerformanceEntry = class {
  static {
    __name(this, "PerformanceEntry");
  }
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
};
var PerformanceMark = class PerformanceMark2 extends PerformanceEntry {
  static {
    __name(this, "PerformanceMark");
  }
  entryType = "mark";
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
};
var PerformanceMeasure = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceMeasure");
  }
  entryType = "measure";
};
var PerformanceResourceTiming = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceResourceTiming");
  }
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
};
var PerformanceObserverEntryList = class {
  static {
    __name(this, "PerformanceObserverEntryList");
  }
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
};
var Performance = class {
  static {
    __name(this, "Performance");
  }
  __unenv__ = true;
  timeOrigin = _timeOrigin;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw createNotImplementedError("Performance.timerify");
  }
  get nodeTiming() {
    return nodeTiming;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming("");
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin) {
      return _performanceNow();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
  }
  getEntriesByType(type) {
    return this._entries.filter((e) => e.entryType === type);
  }
  mark(name, options) {
    const entry = new PerformanceMark(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure(measureName, {
      startTime: start,
      detail: {
        start,
        end
      }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.addEventListener");
  }
  removeEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw createNotImplementedError("Performance.dispatchEvent");
  }
  toJSON() {
    return this;
  }
};
var PerformanceObserver = class {
  static {
    __name(this, "PerformanceObserver");
  }
  __unenv__ = true;
  static supportedEntryTypes = [];
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw createNotImplementedError("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw createNotImplementedError("PerformanceObserver.observe");
  }
  bind(fn) {
    return fn;
  }
  runInAsyncScope(fn, thisArg, ...args) {
    return fn.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
};
var performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();

// node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
globalThis.performance = performance;
globalThis.Performance = Performance;
globalThis.PerformanceEntry = PerformanceEntry;
globalThis.PerformanceMark = PerformanceMark;
globalThis.PerformanceMeasure = PerformanceMeasure;
globalThis.PerformanceObserver = PerformanceObserver;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming;

// node_modules/unenv/dist/runtime/node/console.mjs
import { Writable } from "node:stream";

// node_modules/unenv/dist/runtime/mock/noop.mjs
var noop_default = Object.assign(() => {
}, { __unenv__: true });

// node_modules/unenv/dist/runtime/node/console.mjs
var _console = globalThis.console;
var _ignoreErrors = true;
var _stderr = new Writable();
var _stdout = new Writable();
var log = _console?.log ?? noop_default;
var info = _console?.info ?? log;
var trace = _console?.trace ?? info;
var debug = _console?.debug ?? log;
var table = _console?.table ?? log;
var error = _console?.error ?? log;
var warn = _console?.warn ?? error;
var createTask = _console?.createTask ?? /* @__PURE__ */ notImplemented("console.createTask");
var clear = _console?.clear ?? noop_default;
var count = _console?.count ?? noop_default;
var countReset = _console?.countReset ?? noop_default;
var dir = _console?.dir ?? noop_default;
var dirxml = _console?.dirxml ?? noop_default;
var group = _console?.group ?? noop_default;
var groupEnd = _console?.groupEnd ?? noop_default;
var groupCollapsed = _console?.groupCollapsed ?? noop_default;
var profile = _console?.profile ?? noop_default;
var profileEnd = _console?.profileEnd ?? noop_default;
var time = _console?.time ?? noop_default;
var timeEnd = _console?.timeEnd ?? noop_default;
var timeLog = _console?.timeLog ?? noop_default;
var timeStamp = _console?.timeStamp ?? noop_default;
var Console = _console?.Console ?? /* @__PURE__ */ notImplementedClass("console.Console");
var _times = /* @__PURE__ */ new Map();
var _stdoutErrorHandler = noop_default;
var _stderrErrorHandler = noop_default;

// node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs
var workerdConsole = globalThis["console"];
var {
  assert,
  clear: clear2,
  // @ts-expect-error undocumented public API
  context,
  count: count2,
  countReset: countReset2,
  // @ts-expect-error undocumented public API
  createTask: createTask2,
  debug: debug2,
  dir: dir2,
  dirxml: dirxml2,
  error: error2,
  group: group2,
  groupCollapsed: groupCollapsed2,
  groupEnd: groupEnd2,
  info: info2,
  log: log2,
  profile: profile2,
  profileEnd: profileEnd2,
  table: table2,
  time: time2,
  timeEnd: timeEnd2,
  timeLog: timeLog2,
  timeStamp: timeStamp2,
  trace: trace2,
  warn: warn2
} = workerdConsole;
Object.assign(workerdConsole, {
  Console,
  _ignoreErrors,
  _stderr,
  _stderrErrorHandler,
  _stdout,
  _stdoutErrorHandler,
  _times
});
var console_default = workerdConsole;

// node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console
globalThis.console = console_default;

// node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs
var hrtime = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name(function hrtime2(startTime) {
  const now = Date.now();
  const seconds = Math.trunc(now / 1e3);
  const nanos = now % 1e3 * 1e6;
  if (startTime) {
    let diffSeconds = seconds - startTime[0];
    let diffNanos = nanos - startTime[0];
    if (diffNanos < 0) {
      diffSeconds = diffSeconds - 1;
      diffNanos = 1e9 + diffNanos;
    }
    return [diffSeconds, diffNanos];
  }
  return [seconds, nanos];
}, "hrtime"), { bigint: /* @__PURE__ */ __name(function bigint() {
  return BigInt(Date.now() * 1e6);
}, "bigint") });

// node_modules/unenv/dist/runtime/node/internal/process/process.mjs
import { EventEmitter } from "node:events";

// node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs
var ReadStream = class {
  static {
    __name(this, "ReadStream");
  }
  fd;
  isRaw = false;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  setRawMode(mode) {
    this.isRaw = mode;
    return this;
  }
};

// node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs
var WriteStream = class {
  static {
    __name(this, "WriteStream");
  }
  fd;
  columns = 80;
  rows = 24;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  clearLine(dir3, callback) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback) {
    callback && callback();
    return false;
  }
  cursorTo(x, y, callback) {
    callback && typeof callback === "function" && callback();
    return false;
  }
  moveCursor(dx, dy, callback) {
    callback && callback();
    return false;
  }
  getColorDepth(env2) {
    return 1;
  }
  hasColors(count3, env2) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  write(str, encoding, cb) {
    if (str instanceof Uint8Array) {
      str = new TextDecoder().decode(str);
    }
    try {
      console.log(str);
    } catch {
    }
    cb && typeof cb === "function" && cb();
    return false;
  }
};

// node_modules/unenv/dist/runtime/node/internal/process/node-version.mjs
var NODE_VERSION = "22.14.0";

// node_modules/unenv/dist/runtime/node/internal/process/process.mjs
var Process = class _Process extends EventEmitter {
  static {
    __name(this, "Process");
  }
  env;
  hrtime;
  nextTick;
  constructor(impl) {
    super();
    this.env = impl.env;
    this.hrtime = impl.hrtime;
    this.nextTick = impl.nextTick;
    for (const prop of [...Object.getOwnPropertyNames(_Process.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
      const value = this[prop];
      if (typeof value === "function") {
        this[prop] = value.bind(this);
      }
    }
  }
  // --- event emitter ---
  emitWarning(warning, type, code) {
    console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
  }
  emit(...args) {
    return super.emit(...args);
  }
  listeners(eventName) {
    return super.listeners(eventName);
  }
  // --- stdio (lazy initializers) ---
  #stdin;
  #stdout;
  #stderr;
  get stdin() {
    return this.#stdin ??= new ReadStream(0);
  }
  get stdout() {
    return this.#stdout ??= new WriteStream(1);
  }
  get stderr() {
    return this.#stderr ??= new WriteStream(2);
  }
  // --- cwd ---
  #cwd = "/";
  chdir(cwd2) {
    this.#cwd = cwd2;
  }
  cwd() {
    return this.#cwd;
  }
  // --- dummy props and getters ---
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return `v${NODE_VERSION}`;
  }
  get versions() {
    return { node: NODE_VERSION };
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  // --- noop methods ---
  ref() {
  }
  unref() {
  }
  // --- unimplemented methods ---
  umask() {
    throw createNotImplementedError("process.umask");
  }
  getBuiltinModule() {
    return void 0;
  }
  getActiveResourcesInfo() {
    throw createNotImplementedError("process.getActiveResourcesInfo");
  }
  exit() {
    throw createNotImplementedError("process.exit");
  }
  reallyExit() {
    throw createNotImplementedError("process.reallyExit");
  }
  kill() {
    throw createNotImplementedError("process.kill");
  }
  abort() {
    throw createNotImplementedError("process.abort");
  }
  dlopen() {
    throw createNotImplementedError("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw createNotImplementedError("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw createNotImplementedError("process.loadEnvFile");
  }
  disconnect() {
    throw createNotImplementedError("process.disconnect");
  }
  cpuUsage() {
    throw createNotImplementedError("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw createNotImplementedError("process.initgroups");
  }
  openStdin() {
    throw createNotImplementedError("process.openStdin");
  }
  assert() {
    throw createNotImplementedError("process.assert");
  }
  binding() {
    throw createNotImplementedError("process.binding");
  }
  // --- attached interfaces ---
  permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
  report = {
    directory: "",
    filename: "",
    signal: "SIGUSR2",
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
    writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
  };
  finalization = {
    register: /* @__PURE__ */ notImplemented("process.finalization.register"),
    unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
    registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
  };
  memoryUsage = Object.assign(() => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }), { rss: /* @__PURE__ */ __name(() => 0, "rss") });
  // --- undefined props ---
  mainModule = void 0;
  domain = void 0;
  // optional
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  // internals
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
};

// node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs
var globalProcess = globalThis["process"];
var getBuiltinModule = globalProcess.getBuiltinModule;
var workerdProcess = getBuiltinModule("node:process");
var isWorkerdProcessV2 = globalThis.Cloudflare.compatibilityFlags.enable_nodejs_process_v2;
var unenvProcess = new Process({
  env: globalProcess.env,
  // `hrtime` is only available from workerd process v2
  hrtime: isWorkerdProcessV2 ? workerdProcess.hrtime : hrtime,
  // `nextTick` is available from workerd process v1
  nextTick: workerdProcess.nextTick
});
var { exit, features, platform } = workerdProcess;
var {
  // Always implemented by workerd
  env,
  // Only implemented in workerd v2
  hrtime: hrtime3,
  // Always implemented by workerd
  nextTick
} = unenvProcess;
var {
  _channel,
  _disconnect,
  _events,
  _eventsCount,
  _handleQueue,
  _maxListeners,
  _pendingMessage,
  _send,
  assert: assert2,
  disconnect,
  mainModule
} = unenvProcess;
var {
  // @ts-expect-error `_debugEnd` is missing typings
  _debugEnd,
  // @ts-expect-error `_debugProcess` is missing typings
  _debugProcess,
  // @ts-expect-error `_exiting` is missing typings
  _exiting,
  // @ts-expect-error `_fatalException` is missing typings
  _fatalException,
  // @ts-expect-error `_getActiveHandles` is missing typings
  _getActiveHandles,
  // @ts-expect-error `_getActiveRequests` is missing typings
  _getActiveRequests,
  // @ts-expect-error `_kill` is missing typings
  _kill,
  // @ts-expect-error `_linkedBinding` is missing typings
  _linkedBinding,
  // @ts-expect-error `_preload_modules` is missing typings
  _preload_modules,
  // @ts-expect-error `_rawDebug` is missing typings
  _rawDebug,
  // @ts-expect-error `_startProfilerIdleNotifier` is missing typings
  _startProfilerIdleNotifier,
  // @ts-expect-error `_stopProfilerIdleNotifier` is missing typings
  _stopProfilerIdleNotifier,
  // @ts-expect-error `_tickCallback` is missing typings
  _tickCallback,
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  arch,
  argv,
  argv0,
  availableMemory,
  // @ts-expect-error `binding` is missing typings
  binding,
  channel,
  chdir,
  config,
  connected,
  constrainedMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  // @ts-expect-error `domain` is missing typings
  domain,
  emit,
  emitWarning,
  eventNames,
  execArgv,
  execPath,
  exitCode,
  finalization,
  getActiveResourcesInfo,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getMaxListeners,
  getuid,
  hasUncaughtExceptionCaptureCallback,
  // @ts-expect-error `initgroups` is missing typings
  initgroups,
  kill,
  listenerCount,
  listeners,
  loadEnvFile,
  memoryUsage,
  // @ts-expect-error `moduleLoadList` is missing typings
  moduleLoadList,
  off,
  on,
  once,
  // @ts-expect-error `openStdin` is missing typings
  openStdin,
  permission,
  pid,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  // @ts-expect-error `reallyExit` is missing typings
  reallyExit,
  ref,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  send,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setMaxListeners,
  setSourceMapsEnabled,
  setuid,
  setUncaughtExceptionCaptureCallback,
  sourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  throwDeprecation,
  title,
  traceDeprecation,
  umask,
  unref,
  uptime,
  version,
  versions
} = isWorkerdProcessV2 ? workerdProcess : unenvProcess;
var _process = {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exit,
  finalization,
  features,
  getBuiltinModule,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime3,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  nextTick,
  on,
  off,
  once,
  pid,
  platform,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  // @ts-expect-error old API
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert: assert2,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
};
var process_default = _process;

// node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process
globalThis.process = process_default;

// build/worker.js
var a0ad = a0d;
(function(a, b) {
  const a9 = a0d, c = a();
  while (!![]) {
    try {
      const d = parseInt(a9(910)) / 1 + -parseInt(a9(902)) / 2 + -parseInt(a9(515)) / 3 + -parseInt(a9(649)) / 4 * (parseInt(a9(854)) / 5) + parseInt(a9(724)) / 6 * (-parseInt(a9(680)) / 7) + parseInt(a9(612)) / 8 * (-parseInt(a9(878)) / 9) + parseInt(a9(691)) / 10;
      if (d === b) break;
      else c["push"](c["shift"]());
    } catch (e) {
      c["push"](c["shift"]());
    }
  }
})(a0c, 261163);
var a0b = /* @__PURE__ */ function() {
  let a = !![];
  return function(b, c) {
    const d = a ? function() {
      const aa = a0d;
      if (c) {
        const e = c[aa(829)](b, arguments);
        return c = null, e;
      }
    } : function() {
    };
    return a = ![], d;
  };
}();
(function() {
  a0b(this, function() {
    const ab = a0d, a = new RegExp(ab(663)), b = new RegExp(ab(521), "i"), c = a0a("init");
    !a[ab(822)](c + "chain") || !b[ab(822)](c + ab(669)) ? c("0") : a0a();
  })();
})();
var compose = /* @__PURE__ */ __name((a, b, c) => {
  return (d, e) => {
    let f = -1;
    return g(0);
    async function g(h) {
      const ac = a0d;
      if (h <= f) throw new Error(ac(705));
      f = h;
      let j, k = ![], l;
      a[h] ? (l = a[h][0][0], d[ac(882)][ac(550)] = h) : l = h === a[ac(538)] && e || void 0;
      if (l) try {
        j = await l(d, () => g(h + 1));
      } catch (m) {
        if (m instanceof Error && b) d[ac(900)] = m, j = await b(m, d), k = !![];
        else throw m;
      }
      else d[ac(525)] === ![] && c && (j = await c(d));
      return j && (d[ac(525)] === ![] || k) && (d["res"] = j), d;
    }
    __name(g, "g");
  };
}, "compose");
var GET_MATCH_RESULT = Symbol();
var parseBody = /* @__PURE__ */ __name(async (b, c = Object[a0ad(644)](null)) => {
  const ae = a0ad, { all = ![], dot = ![] } = c, d = b instanceof HonoRequest ? b[ae(517)][ae(917)] : b[ae(917)], e = d["get"](ae(602));
  if (e?.[ae(498)](ae(815)) || e?.[ae(498)]("application/x-www-form-urlencoded")) {
    const f = {};
    return f["all"] = all, f[ae(794)] = dot, parseFormData(b, f);
  }
  return {};
}, "parseBody");
async function parseFormData(a, b) {
  const c = await a["formData"]();
  if (c) return convertFormDataToBodyData(c, b);
  return {};
}
__name(parseFormData, "parseFormData");
function convertFormDataToBodyData(a, b) {
  const ag = a0ad, c = Object["create"](null);
  return a["forEach"]((d, e) => {
    const af = a0d, f = b[af(908)] || e[af(509)]("[]");
    !f ? c[e] = d : handleParsingAllValues(c, e, d);
  }), b[ag(794)] && Object[ag(751)](c)[ag(541)](([d, e]) => {
    const ah = ag, f = d[ah(532)](".");
    f && (handleParsingNestedValues(c, d, e), delete c[d]);
  }), c;
}
__name(convertFormDataToBodyData, "convertFormDataToBodyData");
var handleParsingAllValues = /* @__PURE__ */ __name((a, b, c) => {
  const ai = a0ad;
  if (a[b] !== void 0) {
    if (Array[ai(711)](a[b])) {
      ;
      a[b][ai(648)](c);
    } else a[b] = [a[b], c];
  } else !b[ai(509)]("[]") ? a[b] = c : a[b] = [c];
}, "handleParsingAllValues");
var handleParsingNestedValues = /* @__PURE__ */ __name((a, b, c) => {
  const aj = a0ad;
  let d = a;
  const e = b[aj(833)](".");
  e[aj(541)]((f, g) => {
    const ak = aj;
    g === e[ak(538)] - 1 ? d[f] = c : ((!d[f] || typeof d[f] !== "object" || Array[ak(711)](d[f]) || d[f] instanceof File) && (d[f] = Object["create"](null)), d = d[f]);
  });
}, "handleParsingNestedValues");
var splitPath = /* @__PURE__ */ __name((a) => {
  const b = a["split"]("/");
  return b[0] === "" && b["shift"](), b;
}, "splitPath");
var splitRoutingPath = /* @__PURE__ */ __name((a) => {
  const { groups: b, path: c } = extractGroupsFromPath(a), d = splitPath(c);
  return replaceGroupMarks(d, b);
}, "splitRoutingPath");
var extractGroupsFromPath = /* @__PURE__ */ __name((b) => {
  const al = a0ad, c = [];
  b = b[al(933)](/\{[^}]+\}/g, (e, f) => {
    const am = al, g = "@" + f;
    return c[am(648)]([g, e]), g;
  });
  const d = {};
  return d[al(543)] = c, d[al(842)] = b, d;
}, "extractGroupsFromPath");
var replaceGroupMarks = /* @__PURE__ */ __name((a, b) => {
  const an = a0ad;
  for (let c = b[an(538)] - 1; c >= 0; c--) {
    const [d] = b[c];
    for (let e = a[an(538)] - 1; e >= 0; e--) {
      if (a[e][an(532)](d)) {
        a[e] = a[e][an(933)](d, b[c][1]);
        break;
      }
    }
  }
  return a;
}, "replaceGroupMarks");
var patternCache = {};
var getPattern = /* @__PURE__ */ __name((a, b) => {
  const ao = a0ad;
  if (a === "*") return "*";
  const c = a[ao(745)](/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (c) {
    const d = a + "#" + b;
    return !patternCache[d] && (c[2] ? patternCache[d] = b && b[0] !== ":" && b[0] !== "*" ? [d, c[1], new RegExp("^" + c[2] + ao(625) + b + ")")] : [a, c[1], new RegExp("^" + c[2] + "$")] : patternCache[d] = [a, c[1], !![]]), patternCache[d];
  }
  return null;
}, "getPattern");
var tryDecode = /* @__PURE__ */ __name((a, b) => {
  const ap = a0ad;
  try {
    return b(a);
  } catch {
    return a[ap(933)](/(?:%[0-9A-Fa-f]{2})+/g, (c) => {
      try {
        return b(c);
      } catch {
        return c;
      }
    });
  }
}, "tryDecode");
var tryDecodeURI = /* @__PURE__ */ __name((a) => tryDecode(a, decodeURI), "tryDecodeURI");
var getPath = /* @__PURE__ */ __name((a) => {
  const aq = a0ad, b = a[aq(909)], c = b[aq(564)]("/", b["charCodeAt"](9) === 58 ? 13 : 8);
  let d = c;
  for (; d < b[aq(538)]; d++) {
    const e = b[aq(849)](d);
    if (e === 37) {
      const f = b[aq(564)]("?", d), g = b["slice"](c, f === -1 ? void 0 : f);
      return tryDecodeURI(g[aq(532)](aq(944)) ? g["replace"](/%25/g, aq(884)) : g);
    } else {
      if (e === 63) break;
    }
  }
  return b[aq(803)](c, d);
}, "getPath");
var getPathNoStrict = /* @__PURE__ */ __name((a) => {
  const ar = a0ad, b = getPath(a);
  return b["length"] > 1 && b["at"](-1) === "/" ? b[ar(803)](0, -1) : b;
}, "getPathNoStrict");
var mergePath = /* @__PURE__ */ __name((a, b, ...c) => {
  const as = a0ad;
  return c["length"] && (b = mergePath(b, ...c)), (a?.[0] === "/" ? "" : "/") + a + (b === "/" ? "" : (a?.["at"](-1) === "/" ? "" : "/") + (b?.[0] === "/" ? b[as(803)](1) : b));
}, "mergePath");
var checkOptionalParameter = /* @__PURE__ */ __name((a) => {
  const at = a0ad;
  if (a["charCodeAt"](a[at(538)] - 1) !== 63 || !a["includes"](":")) return null;
  const b = a[at(833)]("/"), c = [];
  let d = "";
  return b[at(541)]((e) => {
    const au = at;
    if (e !== "" && !/\:/[au(822)](e)) d += "/" + e;
    else {
      if (/\:/[au(822)](e)) {
        if (/\?/["test"](e)) {
          c["length"] === 0 && d === "" ? c[au(648)]("/") : c[au(648)](d);
          const f = e["replace"]("?", "");
          d += "/" + f, c[au(648)](d);
        } else d += "/" + e;
      }
    }
  }), c[at(736)]((e, f, g) => g[at(564)](e) === f);
}, "checkOptionalParameter");
var _decodeURI = /* @__PURE__ */ __name((a) => {
  const av = a0ad;
  if (!/[%+]/["test"](a)) return a;
  return a[av(564)]("+") !== -1 && (a = a[av(933)](/\+/g, " ")), a[av(564)]("%") !== -1 ? tryDecode(a, decodeURIComponent_) : a;
}, "_decodeURI");
var _getQueryParam = /* @__PURE__ */ __name((a, b, c) => {
  const aw = a0ad;
  let d;
  if (!c && b && !/[%+]/[aw(822)](b)) {
    let g = a[aw(564)]("?" + b, 8);
    g === -1 && (g = a[aw(564)]("&" + b, 8));
    while (g !== -1) {
      const h = a[aw(849)](g + b[aw(538)] + 1);
      if (h === 61) {
        const i = g + b[aw(538)] + 2, j = a[aw(564)]("&", i);
        return _decodeURI(a[aw(803)](i, j === -1 ? void 0 : j));
      } else {
        if (h == 38 || isNaN(h)) return "";
      }
      g = a[aw(564)]("&" + b, g + 1);
    }
    d = /[%+]/[aw(822)](a);
    if (!d) return void 0;
  }
  const e = {};
  d ??= /[%+]/[aw(822)](a);
  let f = a[aw(564)]("?", 8);
  while (f !== -1) {
    const k = a[aw(564)]("&", f + 1);
    let l = a["indexOf"]("=", f);
    l > k && k !== -1 && (l = -1);
    let m = a["slice"](f + 1, l === -1 ? k === -1 ? void 0 : k : l);
    d && (m = _decodeURI(m));
    f = k;
    if (m === "") continue;
    let n;
    l === -1 ? n = "" : (n = a[aw(803)](l + 1, k === -1 ? void 0 : k), d && (n = _decodeURI(n)));
    if (c) {
      !(e[m] && Array[aw(711)](e[m])) && (e[m] = []);
      ;
      e[m][aw(648)](n);
    } else e[m] ??= n;
  }
  return b ? e[b] : e;
}, "_getQueryParam");
var getQueryParam = _getQueryParam;
var getQueryParams = /* @__PURE__ */ __name((a, b) => {
  return _getQueryParam(a, b, !![]);
}, "getQueryParams");
var decodeURIComponent_ = decodeURIComponent;
var tryDecodeURIComponent = /* @__PURE__ */ __name((a) => tryDecode(a, decodeURIComponent_), "tryDecodeURIComponent");
var HonoRequest = class {
  static {
    __name(this, "HonoRequest");
  }
  [a0ad(517)];
  #validatedData;
  #matchResult;
  [a0ad(550)] = 0;
  [a0ad(842)];
  [a0ad(675)] = {};
  constructor(a, b = "/", c = [[]]) {
    const ax = a0ad;
    this[ax(517)] = a, this[ax(842)] = b, this.#matchResult = c, this.#validatedData = {};
  }
  [a0ad(942)](a) {
    return a ? this.#getDecodedParam(a) : this.#getAllDecodedParams();
  }
  #getDecodedParam(a) {
    const ay = a0ad, b = this.#matchResult[0][this["routeIndex"]][1][a], c = this.#getParamValue(b);
    return c ? /\%/[ay(822)](c) ? tryDecodeURIComponent(c) : c : void 0;
  }
  #getAllDecodedParams() {
    const az = a0ad, a = {}, b = Object[az(608)](this.#matchResult[0][this[az(550)]][1]);
    for (const c of b) {
      const d = this.#getParamValue(this.#matchResult[0][this[az(550)]][1][c]);
      d && typeof d === az(685) && (a[c] = /\%/[az(822)](d) ? tryDecodeURIComponent(d) : d);
    }
    return a;
  }
  #getParamValue(a) {
    return this.#matchResult[1] ? this.#matchResult[1][a] : a;
  }
  ["query"](a) {
    const aA = a0ad;
    return getQueryParam(this[aA(909)], a);
  }
  [a0ad(633)](a) {
    const aB = a0ad;
    return getQueryParams(this[aB(909)], a);
  }
  ["header"](a) {
    const aC = a0ad;
    if (a) return this[aC(517)][aC(917)]["get"](a) ?? void 0;
    const b = {};
    return this[aC(517)][aC(917)][aC(541)]((c, d) => {
      b[d] = c;
    }), b;
  }
  async [a0ad(889)](a) {
    const aD = a0ad;
    return this[aD(675)][aD(769)] ??= await parseBody(this, a);
  }
  #cachedBody = /* @__PURE__ */ __name((a) => {
    const aE = a0ad, { bodyCache: b, raw: c } = this, d = b[a];
    if (d) return d;
    const e = Object["keys"](b)[0];
    if (e) return b[e][aE(677)]((f) => {
      const aF = aE;
      return e === "json" && (f = JSON[aF(813)](f)), new Response(f)[a]();
    });
    return b[a] = c[a]();
  }, "#cachedBody");
  [a0ad(717)]() {
    const aG = a0ad;
    return this.#cachedBody(aG(844))[aG(677)]((a) => JSON[aG(601)](a));
  }
  ["text"]() {
    const aH = a0ad;
    return this.#cachedBody(aH(844));
  }
  [a0ad(836)]() {
    return this.#cachedBody("arrayBuffer");
  }
  [a0ad(748)]() {
    const aI = a0ad;
    return this.#cachedBody(aI(748));
  }
  [a0ad(869)]() {
    const aJ = a0ad;
    return this.#cachedBody(aJ(869));
  }
  [a0ad(855)](a, b) {
    this.#validatedData[a] = b;
  }
  [a0ad(757)](a) {
    return this.#validatedData[a];
  }
  get ["url"]() {
    const aK = a0ad;
    return this[aK(517)][aK(909)];
  }
  get ["method"]() {
    const aL = a0ad;
    return this[aL(517)][aL(827)];
  }
  get [GET_MATCH_RESULT]() {
    return this.#matchResult;
  }
  get ["matchedRoutes"]() {
    const aM = a0ad;
    return this.#matchResult[0][aM(738)](([[, a]]) => a);
  }
  get [a0ad(806)]() {
    const aN = a0ad;
    return this.#matchResult[0][aN(738)](([[, a]]) => a)[this[aN(550)]][aN(842)];
  }
};
var a0e = {};
a0e["Stringify"] = 1, a0e[a0ad(610)] = 2, a0e[a0ad(667)] = 3;
var HtmlEscapedCallbackPhase = a0e;
var raw = /* @__PURE__ */ __name((a, b) => {
  const aO = a0ad, c = new String(a);
  return c[aO(575)] = !![], c["callbacks"] = b, c;
}, "raw");
var resolveCallback = /* @__PURE__ */ __name(async (b, c, d, e, f) => {
  const aP = a0ad;
  typeof b === aP(526) && !(b instanceof String) && (!(b instanceof Promise) && (b = b[aP(798)]()), b instanceof Promise && (b = await b));
  const g = b[aP(571)];
  if (!g?.[aP(538)]) return Promise[aP(714)](b);
  f ? f[0] += b : f = [b];
  const h = {};
  h["phase"] = c, h["buffer"] = f, h[aP(750)] = e;
  const i = Promise[aP(908)](g[aP(738)]((j) => j(h)))[aP(677)]((j) => Promise[aP(908)](j[aP(736)](Boolean)["map"]((k) => resolveCallback(k, c, ![], e, f)))[aP(677)](() => f[0]));
  return d ? raw(await i, g) : i;
}, "resolveCallback");
var TEXT_PLAIN = "text/plain; charset=UTF-8";
var setDefaultContentType = /* @__PURE__ */ __name((b, c) => {
  const d = { "Content-Type": b, ...c };
  return d;
}, "setDefaultContentType");
var Context = class {
  static {
    __name(this, "Context");
  }
  #rawRequest;
  #req;
  [a0ad(596)] = {};
  #var;
  [a0ad(525)] = ![];
  ["error"];
  #status;
  #executionCtx;
  #res;
  #layout;
  #renderer;
  #notFoundHandler;
  #preparedHeaders;
  #matchResult;
  #path;
  constructor(a, b) {
    const aQ = a0ad;
    this.#rawRequest = a, b && (this.#executionCtx = b["executionCtx"], this[aQ(596)] = b[aQ(596)], this.#notFoundHandler = b[aQ(661)], this.#path = b[aQ(842)], this.#matchResult = b[aQ(709)]);
  }
  get [a0ad(882)]() {
    return this.#req ??= new HonoRequest(this.#rawRequest, this.#path, this.#matchResult), this.#req;
  }
  get [a0ad(652)]() {
    const aR = a0ad;
    if (this.#executionCtx && aR(718) in this.#executionCtx) return this.#executionCtx;
    else throw Error(aR(824));
  }
  get [a0ad(924)]() {
    const aS = a0ad;
    if (this.#executionCtx) return this.#executionCtx;
    else throw Error(aS(726));
  }
  get ["res"]() {
    return this.#res ||= new Response(null, { "headers": this.#preparedHeaders ??= new Headers() });
  }
  set [a0ad(848)](a) {
    const aT = a0ad;
    if (this.#res && a) {
      a = new Response(a["body"], a);
      for (const [b, c] of this.#res[aT(917)][aT(751)]()) {
        if (b === aT(895)) continue;
        if (b === "set-cookie") {
          const d = this.#res[aT(917)][aT(891)]();
          a[aT(917)][aT(614)](aT(772));
          for (const e of d) {
            a["headers"]["append"](aT(772), e);
          }
        } else a[aT(917)][aT(857)](b, c);
      }
    }
    this.#res = a, this[aT(525)] = !![];
  }
  ["render"] = (...a) => {
    const aU = a0ad;
    return this.#renderer ??= (b) => this[aU(907)](b), this.#renderer(...a);
  };
  [a0ad(520)] = (a) => this.#layout = a;
  ["getLayout"] = () => this.#layout;
  ["setRenderer"] = (a) => {
    this.#renderer = a;
  };
  [a0ad(782)] = (a, b, c) => {
    const aV = a0ad;
    this[aV(525)] && (this.#res = new Response(this.#res[aV(864)], this.#res));
    const d = this.#res ? this.#res[aV(917)] : this.#preparedHeaders ??= new Headers();
    if (b === void 0) d[aV(614)](a);
    else c?.[aV(713)] ? d[aV(713)](a, b) : d["set"](a, b);
  };
  [a0ad(687)] = (a) => {
    this.#status = a;
  };
  [a0ad(857)] = (a, b) => {
    const aW = a0ad;
    this.#var ??= /* @__PURE__ */ new Map(), this.#var[aW(857)](a, b);
  };
  ["get"] = (a) => {
    const aX = a0ad;
    return this.#var ? this.#var[aX(697)](a) : void 0;
  };
  get [a0ad(522)]() {
    const aY = a0ad;
    if (!this.#var) return {};
    return Object[aY(589)](this.#var);
  }
  #newResponse(b, c, d) {
    const aZ = a0ad, e = this.#res ? new Headers(this.#res[aZ(917)]) : this.#preparedHeaders ?? new Headers();
    if (typeof c === aZ(526) && aZ(917) in c) {
      const h = c[aZ(917)] instanceof Headers ? c[aZ(917)] : new Headers(c[aZ(917)]);
      for (const [i, j] of h) {
        i[aZ(504)]() === aZ(772) ? e[aZ(713)](i, j) : e["set"](i, j);
      }
    }
    if (d) for (const [l, m] of Object[aZ(751)](d)) {
      if (typeof m === aZ(685)) e[aZ(857)](l, m);
      else {
        e[aZ(614)](l);
        for (const n of m) {
          e["append"](l, n);
        }
      }
    }
    const f = typeof c === aZ(606) ? c : c?.["status"] ?? this.#status, g = {};
    return g[aZ(687)] = f, g[aZ(917)] = e, new Response(b, g);
  }
  [a0ad(572)] = (...a) => this.#newResponse(...a);
  [a0ad(864)] = (a, b, c) => this.#newResponse(a, b, c);
  [a0ad(844)] = (a, b, c) => {
    return !this.#preparedHeaders && !this.#status && !b && !c && !this["finalized"] ? new Response(a) : this.#newResponse(a, b, setDefaultContentType(TEXT_PLAIN, c));
  };
  ["json"] = (a, b, c) => {
    const b0 = a0ad;
    return this.#newResponse(JSON[b0(813)](a), b, setDefaultContentType(b0(785), c));
  };
  [a0ad(907)] = (a, b, c) => {
    const b1 = a0ad, d = /* @__PURE__ */ __name((e) => this.#newResponse(e, b, setDefaultContentType(b1(896), c)), "d");
    return typeof a === b1(526) ? resolveCallback(a, HtmlEscapedCallbackPhase[b1(618)], ![], {})[b1(677)](d) : d(a);
  };
  ["redirect"] = (a, b) => {
    const b2 = a0ad;
    return this[b2(782)]("Location", String(a)), this[b2(572)](null, b ?? 302);
  };
  [a0ad(731)] = () => {
    return this.#notFoundHandler ??= () => new Response(), this.#notFoundHandler(this);
  };
};
var METHOD_NAME_ALL = a0ad(565);
var METHOD_NAME_ALL_LOWERCASE = a0ad(908);
var METHODS = [a0ad(697), "post", "put", a0ad(614), "options", a0ad(795)];
var MESSAGE_MATCHER_IS_ALREADY_BUILT = a0ad(905);
var UnsupportedPathError = class extends Error {
  static {
    __name(this, "UnsupportedPathError");
  }
};
var COMPOSED_HANDLER = a0ad(710);
var notFoundHandler = /* @__PURE__ */ __name((a) => {
  return a["text"]("404 Not Found", 404);
}, "notFoundHandler");
var errorHandler = /* @__PURE__ */ __name((a, b) => {
  const b3 = a0ad;
  if ("getResponse" in a) {
    const d = a[b3(753)]();
    return b[b3(572)](d[b3(864)], d);
  }
  return console[b3(900)](a), b[b3(844)]("Internal Server Error", 500);
}, "errorHandler");
var Hono = class {
  static {
    __name(this, "Hono");
  }
  [a0ad(697)];
  [a0ad(505)];
  [a0ad(690)];
  [a0ad(614)];
  [a0ad(754)];
  [a0ad(795)];
  [a0ad(908)];
  ["on"];
  [a0ad(923)];
  [a0ad(506)];
  ["getPath"];
  [a0ad(501)] = "/";
  #path = "/";
  [a0ad(729)] = [];
  constructor(a = {}) {
    const b4 = a0ad, b = [...METHODS, METHOD_NAME_ALL_LOWERCASE];
    b[b4(541)]((e) => {
      this[e] = (f, ...g) => {
        const b5 = a0d;
        return typeof f === b5(685) ? this.#path = f : this.#addRoute(e, this.#path, f), g[b5(541)]((h) => {
          this.#addRoute(e, this.#path, h);
        }), this;
      };
    }), this["on"] = (e, f, ...g) => {
      const b6 = b4;
      for (const h of [f]["flat"]()) {
        this.#path = h;
        for (const i of [e][b6(582)]()) {
          g[b6(738)]((j) => {
            this.#addRoute(i["toUpperCase"](), this.#path, j);
          });
        }
      }
      return this;
    }, this[b4(923)] = (e, ...f) => {
      const b7 = b4;
      return typeof e === b7(685) ? this.#path = e : (this.#path = "*", f[b7(780)](e)), f[b7(541)]((g) => {
        this.#addRoute(METHOD_NAME_ALL, this.#path, g);
      }), this;
    };
    const { strict: c, ...d } = a;
    Object[b4(507)](this, d), this[b4(587)] = c ?? !![] ? a["getPath"] ?? getPath : getPathNoStrict;
  }
  #clone() {
    const b8 = a0ad, b = {};
    b[b8(506)] = this["router"], b[b8(587)] = this[b8(587)];
    const c = new Hono(b);
    return c[b8(584)] = this[b8(584)], c.#notFoundHandler = this.#notFoundHandler, c[b8(729)] = this[b8(729)], c;
  }
  #notFoundHandler = notFoundHandler;
  [a0ad(584)] = errorHandler;
  ["route"](a, b) {
    const b9 = a0ad, c = this[b9(681)](a);
    return b["routes"][b9(738)]((d) => {
      const ba = b9;
      let e;
      b[ba(584)] === errorHandler ? e = d[ba(524)] : (e = /* @__PURE__ */ __name(async (f, g) => (await compose([], b[ba(584)])(f, () => d["handler"](f, g)))[ba(848)], "e"), e[COMPOSED_HANDLER] = d["handler"]), c.#addRoute(d[ba(827)], d[ba(842)], e);
    }), this;
  }
  [a0ad(681)](a) {
    const b = this.#clone();
    return b["_basePath"] = mergePath(this["_basePath"], a), b;
  }
  [a0ad(814)] = (a) => {
    const bb = a0ad;
    return this[bb(584)] = a, this;
  };
  [a0ad(731)] = (a) => {
    return this.#notFoundHandler = a, this;
  };
  ["mount"](a, b, c) {
    const bc = a0ad;
    let d, e;
    c && (typeof c === bc(647) ? e = c : (e = c[bc(835)], c[bc(616)] === ![] ? d = /* @__PURE__ */ __name((h) => h, "d") : d = c[bc(616)]));
    const f = e ? (h) => {
      const bd = bc, i = e(h);
      return Array[bd(711)](i) ? i : [i];
    } : (h) => {
      const be = bc;
      let i = void 0;
      try {
        i = h[be(924)];
      } catch {
      }
      return [h[be(596)], i];
    };
    d ||= (() => {
      const bf = bc, h = mergePath(this[bf(501)], a), i = h === "/" ? 0 : h["length"];
      return (j) => {
        const k = new URL(j["url"]);
        return k["pathname"] = k["pathname"]["slice"](i) || "/", new Request(k, j);
      };
    })();
    const g = /* @__PURE__ */ __name(async (h, i) => {
      const j = await b(d(h["req"]["raw"]), ...f(h));
      if (j) return j;
      await i();
    }, "g");
    return this.#addRoute(METHOD_NAME_ALL, mergePath(a, "*"), g), this;
  }
  #addRoute(b, c, d) {
    const bg = a0ad;
    b = b["toUpperCase"](), c = mergePath(this[bg(501)], c);
    const e = {};
    e["basePath"] = this[bg(501)], e[bg(842)] = c, e[bg(827)] = b, e[bg(524)] = d;
    const f = e;
    this[bg(506)][bg(940)](b, c, [d, f]), this[bg(729)][bg(648)](f);
  }
  #handleError(a, b) {
    const bh = a0ad;
    if (a instanceof Error) return this[bh(584)](a, b);
    throw a;
  }
  #dispatch(d, e, f, g) {
    const bi = a0ad;
    if (g === "HEAD") return (async () => new Response(null, await this.#dispatch(d, e, f, bi(555))))();
    const h = {};
    h[bi(596)] = f;
    const i = this[bi(587)](d, h), j = this[bi(506)]["match"](g, i), k = {};
    k["path"] = i, k[bi(709)] = j, k["env"] = f, k[bi(924)] = e, k[bi(661)] = this.#notFoundHandler;
    const l = new Context(d, k);
    if (j[0][bi(538)] === 1) {
      let n;
      try {
        n = j[0][0][0][0](l, async () => {
          const bj = bi;
          l[bj(848)] = await this.#notFoundHandler(l);
        });
      } catch (o) {
        return this.#handleError(o, l);
      }
      return n instanceof Promise ? n[bi(677)]((p) => p || (l[bi(525)] ? l["res"] : this.#notFoundHandler(l)))[bi(513)]((p) => this.#handleError(p, l)) : n ?? this.#notFoundHandler(l);
    }
    const m = compose(j[0], this["errorHandler"], this.#notFoundHandler);
    return (async () => {
      const bk = bi;
      try {
        const p = await m(l);
        if (!p[bk(525)]) throw new Error(bk(712));
        return p[bk(848)];
      } catch (q) {
        return this.#handleError(q, l);
      }
    })();
  }
  [a0ad(725)] = (a, ...b) => {
    const bl = a0ad;
    return this.#dispatch(a, b[1], b[0], a[bl(827)]);
  };
  ["request"] = (a, b, c, d) => {
    const bm = a0ad;
    if (a instanceof Request) return this[bm(725)](b ? new Request(a, b) : a, c, d);
    return a = a[bm(798)](), this[bm(725)](new Request(/^https?:\/\//[bm(822)](a) ? a : bm(493) + mergePath("/", a), b), c, d);
  };
  [a0ad(536)] = () => {
    const bn = a0ad;
    addEventListener(bn(725), (a) => {
      const bo = bn;
      a[bo(718)](this.#dispatch(a[bo(779)], a, void 0, a[bo(779)]["method"]));
    });
  };
};
var LABEL_REG_EXP_STR = "[^/]+";
var ONLY_WILDCARD_REG_EXP_STR = ".*";
var TAIL_WILDCARD_REG_EXP_STR = "(?:|/.*)";
var PATH_ERROR = Symbol();
var regExpMetaChars = new Set(a0ad(626));
function compareKey(c, d) {
  const bp = a0ad;
  if (c[bp(538)] === 1) return d[bp(538)] === 1 ? c < d ? -1 : 1 : -1;
  if (d[bp(538)] === 1) return 1;
  if (c === ONLY_WILDCARD_REG_EXP_STR || c === TAIL_WILDCARD_REG_EXP_STR) return 1;
  else {
    if (d === ONLY_WILDCARD_REG_EXP_STR || d === TAIL_WILDCARD_REG_EXP_STR) return -1;
  }
  if (c === LABEL_REG_EXP_STR) return 1;
  else {
    if (d === LABEL_REG_EXP_STR) return -1;
  }
  return c[bp(538)] === d[bp(538)] ? c < d ? -1 : 1 : d[bp(538)] - c[bp(538)];
}
__name(compareKey, "compareKey");
var Node = class {
  static {
    __name(this, "Node");
  }
  #index;
  #varIndex;
  #children = Object["create"](null);
  [a0ad(554)](a, b, c, d, e) {
    const bq = a0ad;
    if (a["length"] === 0) {
      if (this.#index !== void 0) throw PATH_ERROR;
      if (e) return;
      this.#index = b;
      return;
    }
    const [f, ...g] = a, h = f === "*" ? g[bq(538)] === 0 ? ["", "", ONLY_WILDCARD_REG_EXP_STR] : ["", "", LABEL_REG_EXP_STR] : f === "/*" ? ["", "", TAIL_WILDCARD_REG_EXP_STR] : f[bq(745)](/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let i;
    if (h) {
      const j = h[1];
      let k = h[2] || LABEL_REG_EXP_STR;
      if (j && h[2]) {
        k = k[bq(933)](/^\((?!\?:)(?=[^)]+\)$)/, bq(737));
        if (/\((?!\?:)/[bq(822)](k)) throw PATH_ERROR;
      }
      i = this.#children[k];
      if (!i) {
        if (Object[bq(608)](this.#children)["some"]((l) => l !== ONLY_WILDCARD_REG_EXP_STR && l !== TAIL_WILDCARD_REG_EXP_STR)) throw PATH_ERROR;
        if (e) return;
        i = this.#children[k] = new Node(), j !== "" && (i.#varIndex = d["varIndex"]++);
      }
      !e && j !== "" && c[bq(648)]([j, i.#varIndex]);
    } else {
      i = this.#children[f];
      if (!i) {
        if (Object["keys"](this.#children)["some"]((l) => l[bq(538)] > 1 && l !== ONLY_WILDCARD_REG_EXP_STR && l !== TAIL_WILDCARD_REG_EXP_STR)) throw PATH_ERROR;
        if (e) return;
        i = this.#children[f] = new Node();
      }
    }
    i[bq(554)](g, b, c, d, e);
  }
  [a0ad(856)]() {
    const br = a0ad, a = Object[br(608)](this.#children)[br(872)](compareKey), b = a["map"]((d) => {
      const bs = br, e = this.#children[d];
      return (typeof e.#varIndex === "number" ? "(" + d + ")@" + e.#varIndex : regExpMetaChars[bs(635)](d) ? "\\" + d : d) + e[bs(856)]();
    });
    typeof this.#index === "number" && b["unshift"]("#" + this.#index);
    if (b[br(538)] === 0) return "";
    if (b[br(538)] === 1) return b[0];
    return br(737) + b[br(631)]("|") + ")";
  }
};
var a0f = {};
a0f[a0ad(552)] = 0;
var Trie = class {
  static {
    __name(this, "Trie");
  }
  #context = a0f;
  #root = new Node();
  ["insert"](a, b, c) {
    const bt = a0ad, d = [], e = [];
    for (let g = 0; ; ) {
      let h = ![];
      a = a[bt(933)](/\{[^}]+\}/g, (k) => {
        const l = "@\\" + g;
        return e[g] = [l, k], g++, h = !![], l;
      });
      if (!h) break;
    }
    const f = a[bt(745)](/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let k = e[bt(538)] - 1; k >= 0; k--) {
      const [l] = e[k];
      for (let m = f[bt(538)] - 1; m >= 0; m--) {
        if (f[m]["indexOf"](l) !== -1) {
          f[m] = f[m][bt(933)](l, e[k][1]);
          break;
        }
      }
    }
    return this.#root[bt(554)](f, b, d, this.#context, c), d;
  }
  [a0ad(873)]() {
    const bu = a0ad;
    let a = this.#root[bu(856)]();
    if (a === "") return [/^$/, [], []];
    let b = 0;
    const c = [], d = [];
    return a = a[bu(933)](/#(\d+)|@(\d+)|\.\*\$/g, (e, f, g) => {
      const bv = bu;
      if (f !== void 0) return c[++b] = Number(f), bv(904);
      if (g !== void 0) return d[Number(g)] = ++b, "";
      return "";
    }), [new RegExp("^" + a), c, d];
  }
};
var emptyParam = [];
var nullMatcher = [/^$/, [], Object["create"](null)];
var wildcardRegExpCache = Object["create"](null);
function buildWildcardRegExp(a) {
  const bw = a0ad;
  return wildcardRegExpCache[a] ??= new RegExp(a === "*" ? "" : "^" + a[bw(933)](/\/\*$|([.\\+*[^\]$()])/g, (b, c) => c ? "\\" + c : "(?:|/.*)") + "$");
}
__name(buildWildcardRegExp, "buildWildcardRegExp");
function clearWildcardRegExpCache() {
  const bx = a0ad;
  wildcardRegExpCache = Object[bx(644)](null);
}
__name(clearWildcardRegExpCache, "clearWildcardRegExpCache");
function buildMatcherFromPreprocessedRoutes(a) {
  const by = a0ad, b = new Trie(), c = [];
  if (a[by(538)] === 0) return nullMatcher;
  const d = a[by(738)]((n) => [!/\*|\/:/["test"](n[0]), ...n])["sort"](([n, o], [p, q]) => n ? 1 : p ? -1 : o[by(538)] - q[by(538)]), f = Object["create"](null);
  for (let n = 0, o = -1, p = d["length"]; n < p; n++) {
    const [q, r, s] = d[n];
    q ? f[r] = [s[by(738)](([u]) => [u, Object[by(644)](null)]), emptyParam] : o++;
    let t;
    try {
      t = b[by(554)](r, o, q);
    } catch (u) {
      throw u === PATH_ERROR ? new UnsupportedPathError(r) : u;
    }
    if (q) continue;
    c[o] = s["map"](([v, w]) => {
      const bz = by, x = Object[bz(644)](null);
      w -= 1;
      for (; w >= 0; w--) {
        const [y, z] = t[w];
        x[y] = z;
      }
      return [v, x];
    });
  }
  const [g, h, l] = b[by(873)]();
  for (let v = 0, w = c[by(538)]; v < w; v++) {
    for (let x = 0, y = c[v][by(538)]; x < y; x++) {
      const z = c[v][x]?.[1];
      if (!z) continue;
      const A = Object[by(608)](z);
      for (let B = 0, C = A["length"]; B < C; B++) {
        z[A[B]] = l[z[A[B]]];
      }
    }
  }
  const m = [];
  for (const D in h) {
    m[D] = c[h[D]];
  }
  return [g, m, f];
}
__name(buildMatcherFromPreprocessedRoutes, "buildMatcherFromPreprocessedRoutes");
function findMiddleware(a, b) {
  const bA = a0ad;
  if (!a) return void 0;
  for (const c of Object[bA(608)](a)[bA(872)]((d, e) => e["length"] - d[bA(538)])) {
    if (buildWildcardRegExp(c)[bA(822)](b)) return [...a[c]];
  }
  return void 0;
}
__name(findMiddleware, "findMiddleware");
var RegExpRouter = class {
  static {
    __name(this, "RegExpRouter");
  }
  [a0ad(721)] = "RegExpRouter";
  #middleware;
  #routes;
  constructor() {
    const bB = a0ad;
    this.#middleware = { [METHOD_NAME_ALL]: Object[bB(644)](null) }, this.#routes = { [METHOD_NAME_ALL]: Object[bB(644)](null) };
  }
  [a0ad(940)](a, b, c) {
    const bC = a0ad, d = this.#middleware, e = this.#routes;
    if (!d || !e) throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    if (!d[a]) {
      ;
      [d, e][bC(541)]((h) => {
        const bD = bC;
        h[a] = Object[bD(644)](null), Object[bD(608)](h[METHOD_NAME_ALL])[bD(541)]((j) => {
          h[a][j] = [...h[METHOD_NAME_ALL][j]];
        });
      });
    }
    b === "/*" && (b = "*");
    const f = (b["match"](/\/:/g) || [])[bC(538)];
    if (/\*$/["test"](b)) {
      const h = buildWildcardRegExp(b);
      a === METHOD_NAME_ALL ? Object[bC(608)](d)[bC(541)]((j) => {
        d[j][b] ||= findMiddleware(d[j], b) || findMiddleware(d[METHOD_NAME_ALL], b) || [];
      }) : d[a][b] ||= findMiddleware(d[a], b) || findMiddleware(d[METHOD_NAME_ALL], b) || [];
      Object[bC(608)](d)[bC(541)]((j) => {
        const bE = bC;
        (a === METHOD_NAME_ALL || a === j) && Object[bE(608)](d[j])[bE(541)]((k) => {
          const bF = bE;
          h[bF(822)](k) && d[j][k][bF(648)]([c, f]);
        });
      }), Object[bC(608)](e)[bC(541)]((j) => {
        const bG = bC;
        (a === METHOD_NAME_ALL || a === j) && Object["keys"](e[j])["forEach"]((k) => h[bG(822)](k) && e[j][k][bG(648)]([c, f]));
      });
      return;
    }
    const g = checkOptionalParameter(b) || [b];
    for (let j = 0, k = g[bC(538)]; j < k; j++) {
      const l = g[j];
      Object[bC(608)](e)[bC(541)]((n) => {
        (a === METHOD_NAME_ALL || a === n) && (e[n][l] ||= [...findMiddleware(d[n], l) || findMiddleware(d[METHOD_NAME_ALL], l) || []], e[n][l]["push"]([c, f - k + j + 1]));
      });
    }
  }
  [a0ad(745)](a, b) {
    const bH = a0ad;
    clearWildcardRegExpCache();
    const c = this.#buildAllMatchers();
    return this[bH(745)] = (d, e) => {
      const bI = bH, f = c[d] || c[METHOD_NAME_ALL], g = f[2][e];
      if (g) return g;
      const h = e["match"](f[0]);
      if (!h) return [[], emptyParam];
      const i = h[bI(564)]("", 1);
      return [f[1][i], h];
    }, this[bH(745)](a, b);
  }
  #buildAllMatchers() {
    const bJ = a0ad, a = Object[bJ(644)](null);
    return Object[bJ(608)](this.#routes)[bJ(778)](Object[bJ(608)](this.#middleware))[bJ(541)]((b) => {
      a[b] ||= this.#buildMatcher(b);
    }), this.#middleware = this.#routes = void 0, a;
  }
  #buildMatcher(a) {
    const bK = a0ad, b = [];
    let c = a === METHOD_NAME_ALL;
    return [this.#middleware, this.#routes][bK(541)]((d) => {
      const bL = bK, e = d[a] ? Object["keys"](d[a])[bL(738)]((f) => [f, d[a][f]]) : [];
      if (e[bL(538)] !== 0) c ||= !![], b[bL(648)](...e);
      else a !== METHOD_NAME_ALL && b["push"](...Object[bL(608)](d[METHOD_NAME_ALL])[bL(738)]((f) => [f, d[METHOD_NAME_ALL][f]]));
    }), !c ? null : buildMatcherFromPreprocessedRoutes(b);
  }
};
var SmartRouter = class {
  static {
    __name(this, "SmartRouter");
  }
  [a0ad(721)] = a0ad(623);
  #routers = [];
  #routes = [];
  constructor(a) {
    this.#routers = a["routers"];
  }
  [a0ad(940)](a, b, c) {
    if (!this.#routes) throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    this.#routes["push"]([a, b, c]);
  }
  [a0ad(745)](a, b) {
    const bM = a0ad;
    if (!this.#routes) throw new Error(bM(585));
    const c = this.#routers, d = this.#routes, f = c[bM(538)];
    let g = 0, h;
    for (; g < f; g++) {
      const j = c[g];
      try {
        for (let k = 0, l = d[bM(538)]; k < l; k++) {
          j[bM(940)](...d[k]);
        }
        h = j[bM(745)](a, b);
      } catch (m) {
        if (m instanceof UnsupportedPathError) continue;
        throw m;
      }
      this[bM(745)] = j[bM(745)][bM(922)](j), this.#routers = [j], this.#routes = void 0;
      break;
    }
    if (g === f) throw new Error(bM(585));
    return this[bM(721)] = "SmartRouter + " + this[bM(516)][bM(721)], h;
  }
  get [a0ad(516)]() {
    const bN = a0ad;
    if (this.#routes || this.#routers[bN(538)] !== 1) throw new Error(bN(892));
    return this.#routers[0];
  }
};
var emptyParams = Object[a0ad(644)](null);
var Node2 = class {
  static {
    __name(this, "Node2");
  }
  #methods;
  #children;
  #patterns;
  #order = 0;
  #params = emptyParams;
  constructor(b, c, d) {
    const bO = a0ad;
    this.#children = d || Object[bO(644)](null), this.#methods = [];
    if (b && c) {
      const e = Object[bO(644)](null), f = {};
      f[bO(524)] = c, f[bO(763)] = [], f[bO(636)] = 0, e[b] = f, this.#methods = [e];
    }
    this.#patterns = [];
  }
  ["insert"](a, b, c) {
    const bP = a0ad;
    this.#order = ++this.#order;
    let d = this;
    const e = splitRoutingPath(b), f = [];
    for (let g = 0, h = e[bP(538)]; g < h; g++) {
      const j = e[g], k = e[g + 1], l = getPattern(j, k), m = Array[bP(711)](l) ? l[0] : j;
      if (m in d.#children) {
        d = d.#children[m];
        l && f[bP(648)](l[1]);
        continue;
      }
      d.#children[m] = new Node2(), l && (d.#patterns[bP(648)](l), f["push"](l[1])), d = d.#children[m];
    }
    return d.#methods[bP(648)]({ [a]: { "handler": c, "possibleKeys": f[bP(736)]((n, o, q) => q[bP(564)](n) === o), "score": this.#order } }), d;
  }
  #getHandlerSets(a, b, c, d) {
    const bQ = a0ad, e = [];
    for (let f = 0, g = a.#methods[bQ(538)]; f < g; f++) {
      const h = a.#methods[f], j = h[b] || h[METHOD_NAME_ALL], k = {};
      if (j !== void 0) {
        j[bQ(627)] = Object[bQ(644)](null), e["push"](j);
        if (c !== emptyParams || d && d !== emptyParams) for (let l = 0, n = j[bQ(763)]["length"]; l < n; l++) {
          const o = j["possibleKeys"][l], p = k[j[bQ(636)]];
          j[bQ(627)][o] = d?.[o] && !p ? d[o] : c[o] ?? d?.[o], k[j[bQ(636)]] = !![];
        }
      }
    }
    return e;
  }
  ["search"](a, b) {
    const bR = a0ad, c = [];
    this.#params = emptyParams;
    const d = this;
    let e = [d];
    const f = splitPath(b), g = [];
    for (let h = 0, l = f[bR(538)]; h < l; h++) {
      const n = f[h], o = h === l - 1, p = [];
      for (let q = 0, r = e[bR(538)]; q < r; q++) {
        const s = e[q], t = s.#children[n];
        t && (t.#params = s.#params, o ? (t.#children["*"] && c[bR(648)](...this.#getHandlerSets(t.#children["*"], a, s.#params)), c[bR(648)](...this.#getHandlerSets(t, a, s.#params))) : p[bR(648)](t));
        for (let u = 0, v = s.#patterns[bR(538)]; u < v; u++) {
          const w = s.#patterns[u], x = s.#params === emptyParams ? {} : { ...s.#params };
          if (w === "*") {
            const D = s.#children["*"];
            D && (c[bR(648)](...this.#getHandlerSets(D, a, s.#params)), D.#params = x, p["push"](D));
            continue;
          }
          if (!n) continue;
          const [y, z, A] = w, B = s.#children[y], C = f[bR(803)](h)["join"]("/");
          if (A instanceof RegExp) {
            const E = A[bR(545)](C);
            if (E) {
              x[z] = E[0], c[bR(648)](...this.#getHandlerSets(B, a, s.#params, x));
              if (Object[bR(608)](B.#children)[bR(538)]) {
                B.#params = x;
                const F = E[0][bR(745)](/\//)?.[bR(538)] ?? 0, G = g[F] ||= [];
                G[bR(648)](B);
              }
              continue;
            }
          }
          (A === !![] || A["test"](n)) && (x[z] = n, o ? (c["push"](...this.#getHandlerSets(B, a, x, s.#params)), B.#children["*"] && c[bR(648)](...this.#getHandlerSets(B.#children["*"], a, x, s.#params))) : (B.#params = x, p[bR(648)](B)));
        }
      }
      e = p[bR(778)](g["shift"]() ?? []);
    }
    return c["length"] > 1 && c[bR(872)]((H, I) => {
      const bS = bR;
      return H[bS(636)] - I[bS(636)];
    }), [c[bR(738)](({ handler: H, params: I }) => [H, I])];
  }
};
var TrieRouter = class {
  static {
    __name(this, "TrieRouter");
  }
  [a0ad(721)] = a0ad(609);
  #node;
  constructor() {
    this.#node = new Node2();
  }
  [a0ad(940)](a, b, c) {
    const bT = a0ad, d = checkOptionalParameter(b);
    if (d) {
      for (let e = 0, f = d[bT(538)]; e < f; e++) {
        this.#node[bT(554)](a, d[e], c);
      }
      return;
    }
    this.#node[bT(554)](a, b, c);
  }
  ["match"](a, b) {
    const bU = a0ad;
    return this.#node[bU(761)](a, b);
  }
};
var Hono2 = class extends Hono {
  static {
    __name(this, "Hono2");
  }
  constructor(a = {}) {
    const bV = a0ad;
    super(a), this[bV(506)] = a[bV(506)] ?? new SmartRouter({ "routers": [new RegExpRouter(), new TrieRouter()] });
  }
};
var config2;
function isNodeEnvironment() {
  return typeof globalThis["addEventListener"] === "undefined";
}
__name(isNodeEnvironment, "isNodeEnvironment");
function processConfig(a) {
  const bW = a0ad;
  return (a[bW(615)] === "/" || a["token_prefix"] === "//" || a["token_prefix"] === "") && (a[bW(615)] = bW(544), a[bW(668)] = !![]), a;
}
__name(processConfig, "processConfig");
function a0c() {
  const d8 = ["TITgz", "content-length", "fire", "';\n      const config_token_prefix = '", "length", "eMWTJ", "Content-Security-Policy", "forEach", "utf8", "groups", "/default/", "exec", "zgtbd", "RZtdf", "nkNRk", "JYbKZ", "routeIndex", "fs/promises", "varIndex", "gzipSync", "insert", "GET", "EFMEr", "Unsupported charset, falling back to utf-8", "trim", "aVwMd", "need2beFiltered", "Content-Security-Policy-Report-Only", "stateObject", "reduce", "indexOf", "ALL", "xQPiC", "\n-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwEJP4gVNBL/GHwMP6o4C\nSWsQeT22KLYDgJqlVXrUKw78iPI/t/a7kom235C6/sHEhC40oLLjdczIINLGs0gL\nicwDnXNhOEu3RfpJFg4SOomjIEpXPYIC4pdTi/2dRHFqWwU9u3FUUxX261VfDabU\nD9ab5kgyhqMNTwIN86TdsZUG6Lz9K/Bv6H+55wkE+5pTj/w0IigZCS1UmwUWLF81\nmXQ4fw3p86qzGrRbB+ri4gEHUTIol+NPJB22SN+Q4PD91LfOW/P5X0mg7SuHJTBo\nELhGKwqVnWlpz4V158BLakdmedo63zS+LsmxL2OgjFecpclIgb1jyX5ic84EUjHv                                                                                                                       \niwIDAQAB\n-----END PUBLIC KEY-----\n", "constants", "https://", "';\n    var config_proxy_url = '", "callbacks", "newResponse", "<head.*?>", "const _0x40e593=_0x27e9;function _0x27e9(_0x56d2ac,_0x576abd){const _0x519a2a=_0x2be6();return _0x27e9=function(_0x3bbc57,_0x3ca390){_0x3bbc57=_0x3bbc57-0x19e;let _0x2be614=_0x519a2a[_0x3bbc57];return _0x2be614;},_0x27e9(_0x56d2ac,_0x576abd);}(function(_0x11b8ca,_0x14d55e){const _0xe86631=_0x27e9,_0x4f0191=_0x11b8ca();while(!![]){try{const _0x4ab451=-parseInt(_0xe86631(0x287))/0x1*(parseInt(_0xe86631(0x1c0))/0x2)+parseInt(_0xe86631(0x1e2))/0x3+-parseInt(_0xe86631(0x280))/0x4*(parseInt(_0xe86631(0x248))/0x5)+-parseInt(_0xe86631(0x1c3))/0x6+-parseInt(_0xe86631(0x23f))/0x7+-parseInt(_0xe86631(0x27d))/0x8*(-parseInt(_0xe86631(0x294))/0x9)+parseInt(_0xe86631(0x262))/0xa;if(_0x4ab451===_0x14d55e)break;else _0x4f0191['push'](_0x4f0191['shift']());}catch(_0x1cccb7){_0x4f0191['push'](_0x4f0191['shift']());}}}(_0x2be6,0x21158));const _0x5f23fa=(function(){const _0x4fbcab=_0x27e9,_0xa59ec1={'kWwjR':_0x4fbcab(0x1f3),'EMQHn':'wNuOk','RJbbV':'function\\x20*\\x5c(\\x20*\\x5c)','uZbIj':_0x4fbcab(0x21f),'eAAYt':function(_0x2f25f7,_0x401295){return _0x2f25f7(_0x401295);},'lYgXi':'init','OYhpl':'chain','vCica':function(_0x55a6e5,_0x3c4b96){return _0x55a6e5+_0x3c4b96;},'Huvqu':'input','WHzXZ':function(_0x4313b0,_0x3db508){return _0x4313b0(_0x3db508);},'qGRha':function(_0x5eb23a){return _0x5eb23a();},'hLslO':_0x4fbcab(0x25e)};let _0x2e7fda=!![];return function(_0xc2bb34,_0x5e8d5e){const _0x2b4c86=_0x4fbcab,_0x5371a1={'qVRBA':_0xa59ec1[_0x2b4c86(0x236)],'oiSVE':_0xa59ec1[_0x2b4c86(0x27f)],'RxPbb':function(_0x1b46d9,_0x40ff17){const _0x122f83=_0x2b4c86;return _0xa59ec1[_0x122f83(0x1e9)](_0x1b46d9,_0x40ff17);},'GYWrn':_0xa59ec1['lYgXi'],'mKKUg':function(_0x39e566,_0x5032b3){return _0x39e566+_0x5032b3;},'dExZU':_0xa59ec1[_0x2b4c86(0x23a)],'Gwcno':function(_0x2eaec6,_0x494eba){const _0x67499=_0x2b4c86;return _0xa59ec1[_0x67499(0x1a9)](_0x2eaec6,_0x494eba);},'VJFHN':_0xa59ec1['Huvqu'],'UEFls':function(_0xb85335,_0x294765){const _0x120f9e=_0x2b4c86;return _0xa59ec1[_0x120f9e(0x1fa)](_0xb85335,_0x294765);},'JIyVK':function(_0xd4550e){const _0x3e651f=_0x2b4c86;return _0xa59ec1[_0x3e651f(0x20a)](_0xd4550e);}};if(_0x2b4c86(0x20f)===_0xa59ec1[_0x2b4c86(0x1af)]){const _0x194a0d=new _0x44e057(_0x5371a1['qVRBA']),_0x5c372f=new _0x22233(_0x5371a1['oiSVE'],'i'),_0xe952c3=_0x5371a1['RxPbb'](_0x4e3e7a,_0x5371a1[_0x2b4c86(0x1a4)]);!_0x194a0d['test'](_0x5371a1[_0x2b4c86(0x1c7)](_0xe952c3,_0x5371a1[_0x2b4c86(0x284)]))||!_0x5c372f[_0x2b4c86(0x1cc)](_0x5371a1['Gwcno'](_0xe952c3,_0x5371a1[_0x2b4c86(0x228)]))?_0x5371a1[_0x2b4c86(0x1a8)](_0xe952c3,'0'):_0x5371a1[_0x2b4c86(0x1b2)](_0x5cd8ad);}else{const _0x16ee89=_0x2e7fda?function(){const _0x4d9434=_0x2b4c86;if(_0x5e8d5e){if(_0xa59ec1['kWwjR']!==_0xa59ec1[_0x4d9434(0x243)]){const _0x1d5c5a=_0x5e8d5e[_0x4d9434(0x230)](_0xc2bb34,arguments);return _0x5e8d5e=null,_0x1d5c5a;}else{if(_0x10d521){const _0x22cad7=_0xa23984[_0x4d9434(0x230)](_0x176511,arguments);return _0x591fa7=null,_0x22cad7;}}}}:function(){};return _0x2e7fda=![],_0x16ee89;}};}());(function(){const _0x30ce8f=_0x27e9,_0x5c5413={'OtPjy':function(_0x345285,_0x49213f){return _0x345285+_0x49213f;},'pnURZ':_0x30ce8f(0x229),'aGUUO':_0x30ce8f(0x1da),'UMDZQ':_0x30ce8f(0x1bc),'MjGao':_0x30ce8f(0x28b),'BMkDc':'chain','Yamyl':function(_0xcf0766,_0x4d158e){return _0xcf0766+_0x4d158e;},'cYwzB':_0x30ce8f(0x253),'DKWFA':function(_0x3d0783,_0x6cfd90){return _0x3d0783!==_0x6cfd90;},'TwkxY':_0x30ce8f(0x1f0),'fZnGn':function(_0x5c62d0,_0x416876,_0x3994cc){return _0x5c62d0(_0x416876,_0x3994cc);}};_0x5c5413[_0x30ce8f(0x270)](_0x5f23fa,this,function(){const _0x4210e5=_0x30ce8f;if(_0x5c5413[_0x4210e5(0x24b)]===_0x5c5413[_0x4210e5(0x24b)]){const _0x57a17a=new RegExp(_0x5c5413[_0x4210e5(0x1ef)]),_0x1f3afe=new RegExp('\\x5c+\\x5c+\\x20*(?:[a-zA-Z_$][0-9a-zA-Z_$]*)','i'),_0x409e0c=_0x44605c(_0x4210e5(0x24d));!_0x57a17a['test'](_0x409e0c+_0x5c5413[_0x4210e5(0x1de)])||!_0x1f3afe[_0x4210e5(0x1cc)](_0x5c5413[_0x4210e5(0x26d)](_0x409e0c,_0x5c5413[_0x4210e5(0x1b0)]))?_0x409e0c('0'):_0x5c5413[_0x4210e5(0x247)](_0x5c5413[_0x4210e5(0x210)],_0x4210e5(0x1e0))?_0x44605c():function(){return![];}['constructor'](_0x5c5413[_0x4210e5(0x1d6)](_0x4210e5(0x1dc),_0x5c5413[_0x4210e5(0x221)]))[_0x4210e5(0x230)](_0x5c5413['aGUUO']);}else _0x50363a();})();}());const _0x247837=_0x40e593(0x28d);function _0x5ccc0b(_0x31b906){const _0x5ea6f6=_0x40e593,_0x3ca571={'axwcE':function(_0x509f47,_0x1f193c){return _0x509f47<_0x1f193c;}},_0x4808dd=new ArrayBuffer(_0x31b906[_0x5ea6f6(0x1d9)]),_0xb7b75e=new Uint8Array(_0x4808dd);for(let _0x2b9a9b=0x0,_0x122fe6=_0x31b906[_0x5ea6f6(0x1d9)];_0x3ca571[_0x5ea6f6(0x1f4)](_0x2b9a9b,_0x122fe6);_0x2b9a9b++){_0xb7b75e[_0x2b9a9b]=_0x31b906[_0x5ea6f6(0x1e3)](_0x2b9a9b);}return _0x4808dd;}function _0x269a44(_0x1ca184){const _0x370fce=_0x40e593,_0x378111={'XBxjy':function(_0x5c5b7a,_0x241406){return _0x5c5b7a<_0x241406;},'hKZdU':function(_0x4c9844,_0x346ae6){return _0x4c9844===_0x346ae6;},'mtiFx':function(_0x2d8388,_0x17716d){return _0x2d8388%_0x17716d;},'jAJuY':function(_0x23ad48,_0x22f278){return _0x23ad48-_0x22f278;}},_0x21d067=new Uint8Array(_0x1ca184);let _0x3865fd='';for(let _0x33205b=0x0;_0x378111[_0x370fce(0x28f)](_0x33205b,_0x21d067[_0x370fce(0x1d9)]);_0x33205b++){_0x3865fd+=_0x21d067[_0x33205b][_0x370fce(0x1d1)](0x10)[_0x370fce(0x1cd)](0x2,'0')[_0x370fce(0x292)](),_0x378111[_0x370fce(0x26a)](_0x378111[_0x370fce(0x214)](_0x33205b,0x10),0xf)||_0x33205b===_0x378111[_0x370fce(0x224)](_0x21d067[_0x370fce(0x1d9)],0x1)?_0x3865fd='':_0x3865fd+='\\x20';}}async function _0x261456(_0x196fa4){const _0x1d5ee5=_0x40e593,_0x57bb44={'fAcLu':_0x1d5ee5(0x275),'tLYRi':_0x1d5ee5(0x293),'zbOzR':function(_0x260d03,_0x3fc508){return _0x260d03(_0x3fc508);},'PMINm':function(_0x2529e2,_0x54edfd){return _0x2529e2(_0x54edfd);},'RMGnM':_0x1d5ee5(0x1d0),'cAQRe':_0x1d5ee5(0x26f),'OmaYh':_0x1d5ee5(0x283)},_0x373932=_0x57bb44[_0x1d5ee5(0x264)],_0x25971f=_0x57bb44[_0x1d5ee5(0x274)];let _0x2c3677=_0x196fa4[_0x1d5ee5(0x237)](_0x373932,'')['replace'](_0x25971f,'');const _0x3615=_0x57bb44['zbOzR'](atob,_0x2c3677[_0x1d5ee5(0x1c8)]()),_0x23de10=_0x57bb44[_0x1d5ee5(0x1f9)](_0x5ccc0b,_0x3615);return await self[_0x1d5ee5(0x258)][_0x1d5ee5(0x22d)][_0x1d5ee5(0x204)](_0x57bb44[_0x1d5ee5(0x240)],_0x23de10,{'name':_0x1d5ee5(0x279),'hash':_0x57bb44[_0x1d5ee5(0x1d7)]},!![],[_0x57bb44[_0x1d5ee5(0x24f)]]);}async function _0xc4ac86(_0x540eac){const _0x572bc7=_0x40e593,_0x433f26={'yxRNo':function(_0x4a5bc3,_0xe155ea){return _0x4a5bc3(_0xe155ea);},'WZwMD':_0x572bc7(0x279)},_0x276133=await _0x433f26[_0x572bc7(0x1b6)](_0x261456,_0x247837),_0x4c5d36=new TextEncoder(),_0x3b09d3=_0x4c5d36[_0x572bc7(0x267)](_0x540eac),_0x574304=await self[_0x572bc7(0x258)][_0x572bc7(0x22d)][_0x572bc7(0x283)]({'name':_0x433f26[_0x572bc7(0x257)]},_0x276133,_0x3b09d3),_0x85a162=new Uint8Array(_0x574304);return _0x433f26[_0x572bc7(0x1b6)](_0x521b8b,_0x85a162);}function _0x521b8b(_0x4d3483){const _0x5ae5d1=_0x40e593,_0x47398e={'kaHKZ':function(_0x475937,_0x4bf746){return _0x475937(_0x4bf746);}},_0x4ae7e9=String[_0x5ae5d1(0x227)][_0x5ae5d1(0x230)](null,_0x4d3483),_0x153738=_0x47398e[_0x5ae5d1(0x263)](btoa,_0x4ae7e9);return _0x153738;}async function _0x31e6b(){const _0x3a98c2=_0x40e593,_0x4f3026={'wCkIa':_0x3a98c2(0x289),'rcBJO':_0x3a98c2(0x283),'SWbVs':function(_0x5b8fb3,_0x813ea3){return _0x5b8fb3(_0x813ea3);}},_0x5c4fae=await self[_0x3a98c2(0x258)][_0x3a98c2(0x22d)][_0x3a98c2(0x1e7)]({'name':_0x4f3026[_0x3a98c2(0x272)],'length':0x100},!![],[_0x4f3026[_0x3a98c2(0x259)],'decrypt']),_0x11e241=await self['crypto']['subtle'][_0x3a98c2(0x261)](_0x3a98c2(0x1e1),_0x5c4fae),_0x5d20e0=_0x4f3026[_0x3a98c2(0x285)](_0x1ebd69,new Uint8Array(_0x11e241));return{'key':_0x5c4fae,'base64Key':_0x5d20e0};}async function _0x514327(_0xb660d3,_0x39cdd1){const _0x540620=_0x40e593,_0x337578={'AkrdQ':'AES-CBC'},_0x1f505a=new TextEncoder(),_0x38e8ee=_0x1f505a[_0x540620(0x267)](_0xb660d3),_0x3a62fd=self[_0x540620(0x258)][_0x540620(0x20b)](new Uint8Array(0x10)),_0x4e5450=await self[_0x540620(0x258)][_0x540620(0x22d)][_0x540620(0x283)]({'name':_0x337578[_0x540620(0x216)],'iv':_0x3a62fd},_0x39cdd1,_0x38e8ee),_0x57d53d=new Uint8Array(_0x3a62fd[_0x540620(0x1d9)]+_0x4e5450[_0x540620(0x27c)]);return _0x57d53d['set'](_0x3a62fd),_0x57d53d[_0x540620(0x1b5)](new Uint8Array(_0x4e5450),_0x3a62fd[_0x540620(0x1d9)]),_0x1ebd69(_0x57d53d);}function _0x1ebd69(_0x446ecf){const _0x4603a5=_0x40e593,_0x3060a4={'YFNHj':function(_0x1af772,_0x1b392f){return _0x1af772(_0x1b392f);}},_0xe78aac=String[_0x4603a5(0x227)][_0x4603a5(0x230)](null,_0x446ecf);return _0x3060a4['YFNHj'](btoa,_0xe78aac);}var _0x26df17={};function _0x120b11(){const _0x5d5c55=_0x40e593,_0x51ee6a={'QrvBq':function(_0x345411,_0x40012a){return _0x345411+_0x40012a;}},_0xb07aac=Date[_0x5d5c55(0x1b7)]();for(let _0x32162b in _0x26df17){_0xb07aac>_0x51ee6a[_0x5d5c55(0x1ce)](_0x26df17[_0x32162b][_0x5d5c55(0x1b4)],0x7530)&&delete _0x26df17[_0x32162b];}}setInterval(_0x120b11,0x7d0);let _0x163cbf=_0x496951=>{const _0x3066c9=_0x40e593,_0x36dff9={'YlxNg':_0x3066c9(0x1c6),'ZbvQX':'navigator.serviceWorker','ljLiP':'URL','xVzGM':function(_0x2abe44,_0x3b109b){return _0x2abe44+_0x3b109b;},'JTwRm':_0x3066c9(0x1eb)},_0xc29a1c=_0x36dff9[_0x3066c9(0x1fd)][_0x3066c9(0x1ab)]('|');let _0x2d1b59=0x0;while(!![]){switch(_0xc29a1c[_0x2d1b59++]){case'0':_0x496951=_0x496951[_0x3066c9(0x237)](/navigator.___serviceWorker/g,_0x36dff9[_0x3066c9(0x215)]);continue;case'1':_0x496951=_0x496951[_0x3066c9(0x237)](/document.___requestStorageAccessFor/g,_0x3066c9(0x223));continue;case'2':_0x496951=_0x496951[_0x3066c9(0x237)](/___URL/g,_0x36dff9[_0x3066c9(0x241)]);continue;case'3':_0x496951=_0x496951[_0x3066c9(0x237)](new RegExp(_0x36dff9[_0x3066c9(0x251)](proxy_url_prefix,_0x3066c9(0x26e)),'g'),'$1://$2');continue;case'4':_0x496951=_0x496951[_0x3066c9(0x237)](/___domain/g,_0x3066c9(0x1fc));continue;case'5':return _0x496951;case'6':_0x496951=_0x496951[_0x3066c9(0x237)](/___location/g,_0x36dff9[_0x3066c9(0x222)]);continue;}break;}};self[_0x40e593(0x1ea)](_0x40e593(0x1d5),_0x53adfb=>{const _0x51051e=_0x40e593,_0x5200fc={'RKbMC':function(_0x2c94e4,_0x3c30f1){return _0x2c94e4!==_0x3c30f1;},'ZGVOu':'siteproxy-target-host','nIFYU':_0x51051e(0x19f),'PmSGl':'siteproxy-newreferer','pXiZs':function(_0x23714a,_0x59807d){return _0x23714a+_0x59807d;},'jlksK':function(_0x4b42ef,_0x2928ef){return _0x4b42ef+_0x2928ef;},'eGBcA':function(_0x2ab9a5,_0x40083c){return _0x2ab9a5===_0x40083c;},'RbEpm':_0x51051e(0x239),'BGGVa':_0x51051e(0x21d),'tyWUr':function(_0x286c48,_0x257209){return _0x286c48!==_0x257209;},'oDVbb':function(_0x24efb2,_0x1f4605){return _0x24efb2===_0x1f4605;},'metar':'PROXY_URL_HOST_MAP','dzuLk':_0x51051e(0x211)};if(_0x5200fc[_0x51051e(0x1f2)](_0x53adfb[_0x51051e(0x268)][_0x51051e(0x21b)],_0x5200fc[_0x51051e(0x20d)]))_0x5200fc['RKbMC'](_0x53adfb[_0x51051e(0x268)]['data'][_0x51051e(0x201)],_0x5200fc[_0x51051e(0x24e)])&&_0x5200fc['tyWUr'](_0x53adfb[_0x51051e(0x268)][_0x51051e(0x268)]['host'],_0x5200fc['BGGVa'])&&(_0x5200fc[_0x51051e(0x19e)](_0x53adfb[_0x51051e(0x268)][_0x51051e(0x268)][_0x51051e(0x201)],self['proxy_target_protocol'])||_0x53adfb[_0x51051e(0x268)][_0x51051e(0x268)][_0x51051e(0x278)]!==self[_0x51051e(0x24a)])&&(self[_0x51051e(0x242)]=_0x53adfb[_0x51051e(0x268)][_0x51051e(0x268)]['protocol'],self[_0x51051e(0x24a)]=_0x53adfb[_0x51051e(0x268)][_0x51051e(0x268)][_0x51051e(0x278)]);else{if(_0x5200fc['oDVbb'](_0x53adfb[_0x51051e(0x268)]['type'],_0x5200fc[_0x51051e(0x28a)])){if(_0x51051e(0x211)!==_0x5200fc[_0x51051e(0x234)]){if(_0x5200fc[_0x51051e(0x19e)](_0x44bbf5,_0x3fa35c['host'])&&!_0x2e396f['endsWith'](_0x6b406d[_0x51051e(0x278)]))_0x3dd0b5=_0x47b172[_0x51051e(0x278)];else _0x39a237[_0x51051e(0x1bf)](_0x5200fc[_0x51051e(0x225)])&&_0x309ad6['endsWith'](_0x13d61c[_0x51051e(0x278)])&&!_0x5d64b4[_0x51051e(0x288)][_0x51051e(0x245)](_0x504e6d)&&(_0x24501b=_0x60fde5[_0x51051e(0x1bf)](_0x5200fc['nIFYU']),_0x2151ef=_0x40725e[_0x51051e(0x1bf)]('siteproxy-target-host'),_0x45bf02=_0x54122a[_0x51051e(0x1bf)]('siteproxy-real-referer'),_0x44bbb5['set'](_0x5200fc['PmSGl'],_0xf019dc));_0x5c0d74=_0x5200fc[_0x51051e(0x1a1)](_0x5200fc[_0x51051e(0x28e)](_0x5200fc[_0x51051e(0x28e)](_0x5200fc[_0x51051e(0x28e)](_0x3165d2+_0x1bd600,'/'),_0x44cab8),_0x2d08b5[_0x51051e(0x288)]),_0x463256);}else _0x26df17[_0x53adfb[_0x51051e(0x268)]['data'][_0x51051e(0x288)]]={'real_protocol':_0x53adfb[_0x51051e(0x268)][_0x51051e(0x268)][_0x51051e(0x21a)],'real_host':_0x53adfb[_0x51051e(0x268)][_0x51051e(0x268)][_0x51051e(0x22c)],'lasttime':Date[_0x51051e(0x1b7)]()};}}}),self[_0x40e593(0x1ea)](_0x40e593(0x276),_0x45663d=>{const _0x26e07b=_0x40e593;self[_0x26e07b(0x269)]();}),self[_0x40e593(0x1ea)](_0x40e593(0x226),_0x5b7a6b=>{const _0x255004=_0x40e593;_0x5b7a6b[_0x255004(0x23b)](self[_0x255004(0x271)][_0x255004(0x1ac)]());}),self['addEventListener'](_0x40e593(0x1c1),_0x1591fa=>{const _0x161251=_0x40e593,_0x41845a={'OGcjY':function(_0x1623c7,_0x27de61){return _0x1623c7===_0x27de61;},'OlCgf':function(_0x1ebced,_0x2b938b){return _0x1ebced+_0x2b938b;},'ySxqc':function(_0x5ede0e,_0x5c22d2){return _0x5ede0e+_0x5c22d2;},'ldTbc':_0x161251(0x22b),'CRtzD':_0x161251(0x282),'FBjnf':function(_0x53ea59,_0x245e2c){return _0x53ea59(_0x245e2c);},'DGYEP':function(_0x5c7ea1,_0xdc4dfe){return _0x5c7ea1!=_0xdc4dfe;},'dXuCr':_0x161251(0x21d),'FaHGW':_0x161251(0x27a),'ZHyqm':function(_0x56196b,_0x5ee465){return _0x56196b!==_0x5ee465;},'rxxsE':_0x161251(0x203),'gUVig':_0x161251(0x1df),'pVFnr':_0x161251(0x1a6),'PmFhH':function(_0x5448f8,_0x132b4c){return _0x5448f8+_0x132b4c;},'JlMPL':'authorization','hiDfO':_0x161251(0x25b),'GIupQ':'vluIX','viuYm':_0x161251(0x1f8),'BEqvo':function(_0x5f06f0){return _0x5f06f0();},'kRxon':_0x161251(0x1d2),'sEtrT':function(_0x1182f2,_0x457dcf,_0x19742b){return _0x1182f2(_0x457dcf,_0x19742b);},'CDDYn':_0x161251(0x250),'qmgXC':_0x161251(0x1f1),'zlxWy':_0x161251(0x1fb),'tiJsm':_0x161251(0x1ba),'yNSdd':_0x161251(0x22f),'szgWO':_0x161251(0x1a0),'gxZSg':_0x161251(0x265),'MDSqr':function(_0x4b9ad4,_0x307929){return _0x4b9ad4&&_0x307929;},'GdkNl':_0x161251(0x205),'gGLhf':_0x161251(0x1ae),'LzcOQ':'form','GuNYB':_0x161251(0x277),'fgVyL':_0x161251(0x21e)};_0x1591fa['respondWith'](((async()=>{const _0x4cd5a4=_0x161251,_0x52b494=new URL(_0x1591fa[_0x4cd5a4(0x1ed)][_0x4cd5a4(0x1ca)]);let _0x5343cd=self[_0x4cd5a4(0x242)]||proxy_real_protocol,_0x2aeb25=self[_0x4cd5a4(0x24a)]||proxy_real_host,_0x5d7ab3=_0x41845a[_0x4cd5a4(0x1e6)](_0x41845a['ySxqc'](_0x5343cd,_0x41845a[_0x4cd5a4(0x25f)]),_0x2aeb25),_0x1fca11=_0x1591fa[_0x4cd5a4(0x1ed)]['url'],_0x553ac4=new Headers(_0x1591fa[_0x4cd5a4(0x1ed)][_0x4cd5a4(0x235)]);_0x553ac4[_0x4cd5a4(0x1b5)](_0x41845a[_0x4cd5a4(0x1d3)],_0x5d7ab3);let _0x437ff2=_0x41845a['FBjnf'](_0x163cbf,_0x52b494[_0x4cd5a4(0x28c)]);if(_0x41845a['DGYEP'](_0x5343cd,_0x41845a[_0x4cd5a4(0x1b1)])){if(_0x41845a[_0x4cd5a4(0x1c9)]!==_0x41845a['FaHGW'])return!![];else{if(!_0x52b494[_0x4cd5a4(0x288)]['startsWith'](config_token_prefix)){if(_0x41845a[_0x4cd5a4(0x212)](_0x2aeb25,_0x52b494[_0x4cd5a4(0x278)])&&!config_proxy_url[_0x4cd5a4(0x202)](_0x52b494[_0x4cd5a4(0x278)])){if(_0x4cd5a4(0x203)===_0x41845a[_0x4cd5a4(0x290)])_0x2aeb25=_0x52b494[_0x4cd5a4(0x278)];else return![];}else _0x553ac4['get'](_0x41845a[_0x4cd5a4(0x26b)])&&config_proxy_url[_0x4cd5a4(0x202)](_0x52b494[_0x4cd5a4(0x278)])&&!_0x52b494[_0x4cd5a4(0x288)]['includes'](config_token_prefix)&&(_0x5343cd=_0x553ac4['get']('siteproxy-target-protocol'),_0x2aeb25=_0x553ac4[_0x4cd5a4(0x1bf)](_0x41845a['gUVig']),_0x5d7ab3=_0x553ac4['get'](_0x41845a[_0x4cd5a4(0x21c)]),_0x553ac4[_0x4cd5a4(0x1b5)](_0x41845a[_0x4cd5a4(0x1d3)],_0x5d7ab3));_0x1fca11=_0x41845a[_0x4cd5a4(0x233)](_0x41845a[_0x4cd5a4(0x244)](proxy_url_prefix+_0x5343cd,'/')+_0x2aeb25+_0x52b494[_0x4cd5a4(0x288)],_0x437ff2);}}}const _0x2f5cc7=_0x553ac4[_0x4cd5a4(0x1bf)](_0x41845a[_0x4cd5a4(0x1ee)]);if(_0x2f5cc7&&_0x2f5cc7[_0x4cd5a4(0x232)](_0x41845a[_0x4cd5a4(0x25d)])){if(_0x41845a['OGcjY'](_0x41845a['GIupQ'],_0x41845a[_0x4cd5a4(0x1a2)]))_0x16fb96[_0x2542ab]=_0x32e7c4[_0x4cd5a4(0x1e3)](_0x435925);else{const {key:_0x2f2549,base64Key:_0x3b4583}=await _0x41845a[_0x4cd5a4(0x273)](_0x31e6b);let _0x44bdf1=await _0x41845a[_0x4cd5a4(0x1ff)](_0xc4ac86,_0x3b4583);_0x553ac4[_0x4cd5a4(0x1b5)](_0x41845a[_0x4cd5a4(0x213)],_0x44bdf1);let _0x3aed48=await _0x41845a['sEtrT'](_0x514327,_0x2f5cc7,_0x2f2549);_0x553ac4[_0x4cd5a4(0x1b5)](_0x41845a[_0x4cd5a4(0x238)],_0x3aed48),_0x553ac4[_0x4cd5a4(0x281)](_0x41845a['JlMPL']);}}const _0x366b6e={'method':_0x1591fa[_0x4cd5a4(0x1ed)][_0x4cd5a4(0x255)],'headers':_0x553ac4,'mode':_0x41845a[_0x4cd5a4(0x1db)],'credentials':_0x41845a[_0x4cd5a4(0x25a)],'redirect':_0x1591fa['request'][_0x4cd5a4(0x1a7)]};if([_0x41845a[_0x4cd5a4(0x22e)],_0x41845a[_0x4cd5a4(0x1d4)],'PATCH'][_0x4cd5a4(0x245)](_0x1591fa['request'][_0x4cd5a4(0x255)][_0x4cd5a4(0x292)]())){const _0x5c7250=_0x1591fa[_0x4cd5a4(0x1ed)][_0x4cd5a4(0x26c)](),_0x3fffdc=_0x5c7250[_0x4cd5a4(0x235)][_0x4cd5a4(0x1bf)](_0x41845a[_0x4cd5a4(0x209)]),_0x55c813=_0x5c7250[_0x4cd5a4(0x235)][_0x4cd5a4(0x1bf)](_0x41845a[_0x4cd5a4(0x22a)]);if(_0x41845a['MDSqr'](!_0x55c813,_0x3fffdc)&&(_0x3fffdc['includes'](_0x41845a[_0x4cd5a4(0x1f6)])||_0x3fffdc[_0x4cd5a4(0x245)](_0x41845a[_0x4cd5a4(0x206)])||_0x3fffdc['includes'](_0x41845a[_0x4cd5a4(0x1f7)]))){let _0x5046ba=await _0x5c7250[_0x4cd5a4(0x1ae)]();_0x5046ba=_0x41845a['FBjnf'](_0x163cbf,_0x5046ba),_0x366b6e[_0x4cd5a4(0x218)]=_0x5046ba;if(/password/i['test'](_0x5046ba)){let _0x3cb134,_0x4a3816;if(!_0x366b6e[_0x4cd5a4(0x235)][_0x41845a[_0x4cd5a4(0x213)]]){({key:_0x3cb134,base64Key:_0x4a3816}=await _0x31e6b());let _0x426261=await _0xc4ac86(_0x4a3816);_0x366b6e[_0x4cd5a4(0x235)][_0x4cd5a4(0x1b5)](_0x4cd5a4(0x1d2),_0x426261);}_0x366b6e[_0x4cd5a4(0x218)]=await _0x41845a[_0x4cd5a4(0x1be)](_0x514327,_0x5046ba,_0x3cb134),_0x366b6e['headers'][_0x4cd5a4(0x1b5)](_0x41845a['GuNYB'],_0x41845a[_0x4cd5a4(0x291)]);}}else{let _0x25b0ab=await _0x5c7250['arrayBuffer']();_0x366b6e[_0x4cd5a4(0x218)]=_0x25b0ab;}const _0x8eb0cf=new Request(_0x1fca11,_0x366b6e);return _0x41845a[_0x4cd5a4(0x1ff)](fetch,_0x8eb0cf);}else{const _0x184820=new Request(_0x1fca11,_0x366b6e);return fetch(_0x184820)[_0x4cd5a4(0x249)](_0x1c4a28=>{const _0xd16b37=_0x4cd5a4;if(_0x41845a['OGcjY'](_0x1c4a28[_0xd16b37(0x208)],0x194))return new Promise(_0x51da35=>setTimeout(()=>_0x51da35(_0x1c4a28),0xbb8));return _0x1c4a28;});}})()));});function _0x2be6(){const _0x5ee25b=['cAQRe','constructor','length','stateObject','qmgXC','debu','SPwPo','BMkDc','siteproxy-target-host','fmhgd','raw','724689sfdwDX','charCodeAt','OQvNs','aAqlA','OlCgf','generateKey','WdptY','eAAYt','addEventListener','location','RgNvj','request','JlMPL','MjGao','NgrTf','cors','eGBcA','MnSSV','axwcE','uUTnv','GdkNl','LzcOQ','yZfLp','PMINm','WHzXZ','include','domain','YlxNg','BCOBo','FBjnf','khKSY','protocol','endsWith','QoclA','importKey','json','gGLhf','JmMZX','status','szgWO','qGRha','getRandomValues','vezWC','RbEpm','TEqqF','ZIsCE','TwkxY','YLslI','ZHyqm','kRxon','mtiFx','ZbvQX','AkrdQ','MXhwC','body','qchIM','real_protocol','type','pVFnr','undefined','yes','\\x5c+\\x5c+\\x20*(?:[a-zA-Z_$][0-9a-zA-Z_$]*)','OhBtJ','pnURZ','JTwRm','document.requestStorageAccessFor','jAJuY','ZGVOu','activate','fromCharCode','VJFHN','gger','gxZSg','://','real_host','subtle','tiJsm','PUT','apply','cLyBg','startsWith','ySxqc','dzuLk','headers','RJbbV','replace','CDDYn','PROXY_CUR_LOCATION','OYhpl','waitUntil','abPEr','string','FCqxr','1482285dqvLwE','RMGnM','ljLiP','proxy_target_protocol','EMQHn','PmFhH','includes','counter','DKWFA','369175IaLBAl','then','proxy_target_host','UMDZQ','TBqJQ','init','BGGVa','OmaYh','siteproxy-encrypt-aes-authorization','xVzGM','qxmCx','input','aCDrl','method','action','WZwMD','crypto','rcBJO','zlxWy','Basic\\x20','OaDih','hiDfO','KbXeI','ldTbc','QCLAL','exportKey','4222050oYYrTV','kaHKZ','fAcLu','Content-Encoding','rHVva','encode','data','skipWaiting','hKZdU','gUVig','clone','Yamyl','(http[s]?)/([^/]+)','SHA-256','fZnGn','clients','wCkIa','BEqvo','tLYRi','-----BEGIN\\x20PUBLIC\\x20KEY-----','install','siteproxy-encrypted-body','host','RSA-OAEP','HkzCn','woaAT','byteLength','78384ysoswc','ZoDsj','uZbIj','4YcTrvl','delete','siteproxy-newreferer','encrypt','dExZU','SWbVs','dZGtZ','208643dCmzzi','pathname','AES-CBC','metar','function\\x20*\\x5c(\\x20*\\x5c)','search','-----BEGIN\\x20PUBLIC\\x20KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwEJP4gVNBL/GHwMP6o4CSWsQeT22KLYDgJqlVXrUKw78iPI/t/a7kom235C6/sHEhC40oLLjdczIINLGs0gLicwDnXNhOEu3RfpJFg4SOomjIEpXPYIC4pdTi/2dRHFqWwU9u3FUUxX261VfDabUD9ab5kgyhqMNTwIN86TdsZUG6Lz9K/Bv6H+55wkE+5pTj/w0IigZCS1UmwUWLF81mXQ4fw3p86qzGrRbB+ri4gEHUTIol+NPJB22SN+Q4PD91LfOW/P5X0mg7SuHJTBoELhGKwqVnWlpz4V158BLakdmedo63zS+LsmxL2OgjFecpclIgb1jyX5ic84EUjHviwIDAQAB-----END\\x20PUBLIC\\x20KEY-----','jlksK','XBxjy','rxxsE','fgVyL','toUpperCase','-----END\\x20PUBLIC\\x20KEY-----','72nvrNdp','RKbMC','siteproxy-target-protocol','Content-Type','pXiZs','viuYm','QvIFk','GYWrn','yVDnN','siteproxy-real-referer','redirect','UEFls','vCica','call','split','claim','msaWi','text','hLslO','cYwzB','dXuCr','JIyVK','EihSy','lasttime','set','yxRNo','now','XDFBa','HWgCU','POST','zTSqE','nGGPJ','wEkVC','sEtrT','get','2sCuLVr','fetch','JSHHk','674442ZStzDc','Ntkrp','NJuUR','3|6|2|4|0|1|5','mKKUg','trim','FaHGW','url','jAIGb','test','padStart','QrvBq','nLptY','spki','toString','siteproxy-encrypt-aes-base64key','CRtzD','yNSdd','message','OtPjy'];_0x2be6=function(){return _0x5ee25b;};return _0x2be6();}function _0x44605c(_0x1ecc27){const _0x143533=_0x40e593,_0x21c0de={'mKvgm':_0x143533(0x28b),'BCOBo':'init','zTSqE':function(_0x398ce6,_0x253d26){return _0x398ce6+_0x253d26;},'AjgJi':'chain','rHVva':function(_0x3f10cd,_0x5036fa){return _0x3f10cd(_0x5036fa);},'OaDih':function(_0x4e4146){return _0x4e4146();},'cLyBg':function(_0x169b4a,_0x97253c){return _0x169b4a!==_0x97253c;},'RgNvj':_0x143533(0x1df),'wEkVC':_0x143533(0x19f),'vezWC':'siteproxy-real-referer','msaWi':'siteproxy-newreferer','VkdkZ':function(_0x1693cb,_0x10e301){return _0x1693cb===_0x10e301;},'mogiR':_0x143533(0x20e),'NJuUR':function(_0xae8ff6,_0x2fdcac){return _0xae8ff6===_0x2fdcac;},'WdptY':_0x143533(0x23d),'JSHHk':_0x143533(0x246),'QvIFk':'FCqxr','ZoDsj':function(_0x370013,_0x6ac977){return _0x370013+_0x6ac977;},'sslMV':function(_0x453850,_0x57fccd){return _0x453850/_0x57fccd;},'vubbR':function(_0x37cbfa,_0xbf6959){return _0x37cbfa%_0xbf6959;},'yVDnN':function(_0x7f2c99,_0x10196a){return _0x7f2c99+_0x10196a;},'Ntkrp':'debu','aCDrl':_0x143533(0x229),'HWgCU':function(_0x3c62a5,_0x4deffe){return _0x3c62a5+_0x4deffe;},'TBqJQ':'stateObject'};function _0x3c21c2(_0x359f1c){const _0x45eeda=_0x143533,_0x20d6e5={'OkKLU':_0x21c0de['mKvgm'],'uUTnv':'\\x5c+\\x5c+\\x20*(?:[a-zA-Z_$][0-9a-zA-Z_$]*)','OQvNs':_0x21c0de[_0x45eeda(0x1fe)],'EihSy':function(_0x421d61,_0x410b01){const _0x368ed0=_0x45eeda;return _0x21c0de[_0x368ed0(0x1bb)](_0x421d61,_0x410b01);},'QCLAL':_0x21c0de['AjgJi'],'khKSY':function(_0xebe207,_0x351cc4){const _0x1ba4aa=_0x45eeda;return _0x21c0de[_0x1ba4aa(0x266)](_0xebe207,_0x351cc4);},'woaAT':function(_0x4acee8){const _0x58f0e2=_0x45eeda;return _0x21c0de[_0x58f0e2(0x25c)](_0x4acee8);},'ZiqcL':function(_0x193411,_0x2ea1f4){const _0x11f438=_0x45eeda;return _0x21c0de[_0x11f438(0x231)](_0x193411,_0x2ea1f4);},'aAqlA':_0x21c0de[_0x45eeda(0x1ec)],'abPEr':_0x21c0de[_0x45eeda(0x1bd)],'dZGtZ':_0x21c0de[_0x45eeda(0x20c)],'JmMZX':_0x21c0de[_0x45eeda(0x1ad)],'nLptY':function(_0x4e865,_0x149ad5){return _0x21c0de['VkdkZ'](_0x4e865,_0x149ad5);},'OhBtJ':_0x21c0de['mogiR']};if(_0x21c0de[_0x45eeda(0x1c5)](typeof _0x359f1c,_0x21c0de[_0x45eeda(0x1e8)])){if(_0x45eeda(0x217)!==_0x45eeda(0x217))_0x33cb74(this,function(){const _0x2f6659=_0x45eeda,_0x543e49=new _0x6aa8a3(_0x20d6e5['OkKLU']),_0x772e47=new _0x463f81(_0x20d6e5[_0x2f6659(0x1f5)],'i'),_0x4b0c52=_0x9faedd(_0x20d6e5[_0x2f6659(0x1e4)]);!_0x543e49[_0x2f6659(0x1cc)](_0x20d6e5['EihSy'](_0x4b0c52,_0x20d6e5[_0x2f6659(0x260)]))||!_0x772e47[_0x2f6659(0x1cc)](_0x4b0c52+_0x2f6659(0x253))?_0x20d6e5[_0x2f6659(0x200)](_0x4b0c52,'0'):_0x20d6e5[_0x2f6659(0x27b)](_0x43fa9a);})();else return function(_0x1f5095){}[_0x45eeda(0x1d8)]('while\\x20(true)\\x20{}')['apply'](_0x21c0de[_0x45eeda(0x1c2)]);}else _0x21c0de[_0x45eeda(0x1a3)]!==_0x45eeda(0x23e)?_0xf43895=_0x1ce997[_0x45eeda(0x278)]:_0x21c0de[_0x45eeda(0x231)](_0x21c0de[_0x45eeda(0x27e)]('',_0x21c0de['sslMV'](_0x359f1c,_0x359f1c))[_0x45eeda(0x1d9)],0x1)||_0x21c0de['vubbR'](_0x359f1c,0x14)===0x0?function(){return!![];}['constructor'](_0x21c0de[_0x45eeda(0x1a5)](_0x21c0de[_0x45eeda(0x1c4)],_0x21c0de[_0x45eeda(0x254)]))[_0x45eeda(0x1aa)](_0x45eeda(0x256)):function(){const _0x2f416d=_0x45eeda,_0x182d8e={'qchIM':function(_0x1e5a9c,_0x4afd29){return _0x20d6e5['ZiqcL'](_0x1e5a9c,_0x4afd29);},'qxmCx':_0x20d6e5[_0x2f416d(0x1e5)],'rKASu':_0x20d6e5[_0x2f416d(0x23c)],'SPwPo':_0x20d6e5[_0x2f416d(0x286)],'jAIGb':_0x20d6e5[_0x2f416d(0x207)],'XDFBa':function(_0x166307,_0x8dda2f){const _0x137af7=_0x2f416d;return _0x20d6e5[_0x137af7(0x1b3)](_0x166307,_0x8dda2f);}};if(_0x20d6e5[_0x2f416d(0x1cf)](_0x20d6e5['OhBtJ'],_0x20d6e5[_0x2f416d(0x220)]))return![];else{if(!_0xbd4405[_0x2f416d(0x288)][_0x2f416d(0x232)](_0x55a1d9)){if(_0x182d8e[_0x2f416d(0x219)](_0x4226e3,_0x154100[_0x2f416d(0x278)])&&!_0x440956[_0x2f416d(0x202)](_0x21b1c6['host']))_0x41d433=_0x370db8[_0x2f416d(0x278)];else _0x529916[_0x2f416d(0x1bf)](_0x182d8e[_0x2f416d(0x252)])&&_0x10aafe[_0x2f416d(0x202)](_0x331c39['host'])&&!_0x393734['pathname'][_0x2f416d(0x245)](_0x340742)&&(_0x3e88da=_0x1f1247[_0x2f416d(0x1bf)](_0x182d8e['rKASu']),_0x1b0079=_0x174ab1['get'](_0x182d8e[_0x2f416d(0x252)]),_0x48f24a=_0x12d5b0['get'](_0x182d8e[_0x2f416d(0x1dd)]),_0x261b67['set'](_0x182d8e[_0x2f416d(0x1cb)],_0x2fe5fa));_0xe701de=_0x182d8e[_0x2f416d(0x1b8)](_0x182d8e[_0x2f416d(0x1b8)](_0x182d8e[_0x2f416d(0x1b8)](_0x3ba586,_0x693ba4)+'/',_0x5560da),_0x455e0a[_0x2f416d(0x288)])+_0x33bf67;}}}[_0x45eeda(0x1d8)](_0x21c0de[_0x45eeda(0x1b9)](_0x45eeda(0x1dc),_0x45eeda(0x229)))[_0x45eeda(0x230)](_0x21c0de[_0x45eeda(0x24c)]);_0x3c21c2(++_0x359f1c);}try{if(_0x1ecc27)return _0x3c21c2;else _0x21c0de[_0x143533(0x266)](_0x3c21c2,0x0);}catch(_0x2a6569){}}", "isEscaped", "decode", "Listening on http://localhost:", "lLxgG", "uhDjJ", "gunzipSync", "while (true) {}", "flat", "rIqIH", "errorHandler", "Fatal error", "siteproxy-encrypt-aes-base64key", "getPath", "Compression not supported in this environment or for the specified format.", "fromEntries", "decrypt", "jnVmw", "port", "fSpOo", "document.___requestStorageAccessFor", "akLZH", "env", "owhRI", "-----END PRIVATE KEY-----", "node environment!!!", "cloudflare environment!", "parse", "Content-Type", "RSA-OAEP", "x-frame-options", "publicKey", "number", "./config.json", "keys", "TrieRouter", "BeforeStream", "1440362xNcFQU", "88ybvXKF", "createDecipheriv", "delete", "token_prefix", "replaceRequest", "document.URL", "Stringify", "addEventListener", "GxVMu", "HKeIj", "bDRuq", "SmartRouter", "log", "(?=/", ".\\+*[^]$()", "params", "aOEXc", "<head$1>", "Path=/;", "join", "; Path=/; HttpOnly", "queries", "RbgTn", "has", "score", "ngdpY", "https/", "searchParams", "pathname", "Debug: Attempting decompression with encoding:", "hasOwnProperty", "javascript", "create", "body length:", "x-forwarded-for", "function", "push", "1187116fZMqKn", "uslNR", "gzip", "event", '<script src="/siteproxy-response-injected.js"><\/script>', "<head", "NtHIq", "wFnKg", "RSA_PKCS1_OAEP_PADDING", "<script>\n  if (!window.siteproxy_injected_flag) { // only load once\n    var proxy_url_prefix = '", "QRjja", "1771985RGBUJm", "notFoundHandler", "CompressionStream defined:", "function *\\( *\\)", "dfuHE", "Internal Server Error: Decryption failed", "proxy_real_protocol=", "Stream", "default_password", "input", "debu", "init", "read", "spki", "substring", "bodyCache", "const _0x202094=_0x538c;function _0xb842(){const _0x4ec343=['removeAttribute','kBmlj','offsetHeight','headers','GBOSy','wadGt','oaQBc','href','tNOhw','dCOPY','xlOUd','okCCQ','LJtjL','&proxy_real_host=','endsWith','DVqwo','apply','vgSpf','WryYs','STUKY','XFsUf','ssh:','gOkzM','marginTop','Wikrl','host','ZvQYx','WydsF','setItem','url','422440xuIwmg','daKCS','FYHTI','FYIDh','Uurbu','ZDbfu','HaXOe','EhSNP','pNloS','xELVT','hookFormSubmit:\\x20Form\\x20element\\x20has\\x20been\\x20removed\\x20from\\x20the\\x20DOM,\\x20skipping\\x20action\\x20change.','createElement','jeigz','XUijh','\\x5c+\\x5c+\\x20*(?:[a-zA-Z_$][0-9a-zA-Z_$]*)','removeProxyPrefix','ocjHr','qUJOS','aGmGP','eqwSk','documentElement','xojSY','set','gger','WibGa','aEthW','CXLLT','AUiIc','!!!\\x20proxy\\x20service\\x20worker\\x20already\\x20registered.','hVWuG','GdHvx','sTCyO','aewSw','/https/','www.netptop.com/youtube/watch/index.html?v=','LwUYC','URL','ZcRbe','YNGgl','xAwCW','ogaWH','siteproxy-target-protocol','oIIRl','vCZzS','siteproxyRegReplacement','style','COaiQ','xRprC','getAttribute','some','WcXKO','PdZUb','xgkMY','hULKc','BhBPO','HBIJQ','CBdvQ','___domain','originalLocation','UlkdV','PCzOu','input','BNxLq','BmAXj','KYmGj','while\\x20(true)\\x20{}','rwWvT','NOKTp','KfymA','none','undefined','getTime','RZWYH','HrzHk','CDWkg','absolute','debu','xHynU','nRsJA','AKrya','13px','xxxxY','Kgguq','toString','/siteproxy_service_worker.js?proxy_real_protocol=','qAGWv','innerHTML','error','width','VVInD','object','sms:','jIMQk','jAcOn','ODnWK','tlTBX','LJBIf','topBarLastShown','insertBefore','tel:','scriptURL','siteproxy-window-location-pathname','fkcyr','siteproxy_injected_flag','tgpST','http/','top','yijwy','449728zdNQyk','zHsuO','javascript:','proxy_worker_registration','cKeCQ','nsaji','SPnLN','https','iuWXU','bBhJG','erpKe','pNQKr','ftp:','kXBOG','btDJK','chrome:','yGJEt','MgzTt','forEach','100%','startsWith','init','slice','KlmWP','MTITL','fixed','dkRxh','replace','webcal:','VvDnj','addedNodes','setRequestHeader','preventDefault','VhIlO','EURNE','mGDTW','zNFvU','Kolrq','yYwnX','EPvUr','omtUB','defineProperty','kHgxb','RrWoE','kggLs','evXGo','fontWeight','pushState','aPgru','DaZyG','nodeType','TSHeM','location','dxpVY','PROXY_CUR_LOCATION','72RjEKnG','rxJxy','VUVSA','SkzMv','TKPxk','attributeName','AfPzd','querySelector','lKtNb','MnWUc','50%','20px','UDGjR','YFIKf','https://','setAttribute','ZwUyn','ckIAn','xLtFp','assign','QxmxR','yKatA','tfNlt','pbGWD','hash','fAobt','ZCgax','childList','Juprm','sQVsA','://','rpkXv','iDVJS','ufCPw','jFvMt','GSnJh','KsoFA','iAwuS','postMessage','xVSyc','WFAJs','blob:','kTuPs','uWjJu','GmNcm','___URL','type','ORZeb','LcvaX','observe','serviceWorker','DdWiq','reload','MyBcf','gqeQm','gVGit','XlKTe','sMGcj','aJXCJ','QffbO','NukvV','XuPTU','target','getRegistrations','integrity','oxKVr','dIeww','parentNode','attributes','lineHeight','position','addEventListener','jsOwp','call','5px\\x200','EMHAa','eEsdK','___location','self','body','GGsfQ','fKNUl','IgmHS','ztlyF','_observerSet','hgVrV','HfkyK','qtBEa','huNTC','XFMku','CREAx','ymUGV','div','cfKbv','iKsnk','FClRP','yDiap','PROXY_URL_HOST_MAP','srcset','vbUpR','bDzGI','setProtocolFromProxyPrefixedURL','dRWYB','prototype','hUQQi','hasAttribute','ugqIR','wfVPI','GUgcj','QugwR','catch','pFGoe','length','yEPBE','action','jNywp','span','_traversed','cjnbB','DFUNV','GGFIR','translateY(-50%)','tQnNy','indexOf','fontSize','constructor','srxdo','GpByG','otEvt','IJWkw','bAzNC','lNBDZ','xinSM','WzOyC','lwnTn','method','esvWN','giUrH','ZkZuq','includes','TRxul','btoSK','gNeCy','30216bdQrqI','WnnwR','hostname','cdJOi','http://','port','FaMdw','test','tagName','IXNhs','DLqhK','ZqUGt','CWzBX','859908RGpzsK','MhdxB','oJFZo','click','UwmRl','UXWWm','cFwCs','file:','RxvzY','MxgGA','SVoOM','CfAfD','dPwyj','25064hcqqSt','GpROd','bVMIu','_loadListenerAdded','NdgSn','PVbUA','transform','BCQrB','zlIsX','load','QIKrz','script','data-url','cEItl','DANhn','chain','HuVNi','ydqXG','MYBAG','zAgRb','VzKuw','tXBsV','substring','form','10px','MHGHd','left','msego','PZdoQ','string','open','CZeTJ','qhCfw','#ff0000','SMuik','jkveb','uiHVQ','yvhpH','LNFqU','function\\x20*\\x5c(\\x20*\\x5c)','src','skefh','XflRi','QahWI','UACSI','siteproxy-real-referer','JsUQg','cursor','aGfbR','SOvDL','vEiYW','vovOo','origin','#ffffff','search','jsdom','10000','GLPxP','WZVXo','clickListenerAdded','vbscript:','hSAIM','pathname','NTShT','WkpOI','yrnja','contentDocument','sZaiz','MKMxY','dDzEb','ETCGs','DCtlf','http','IYwPB','___replaceState','Ajqvh','rcOZV','NYFsW','onclick','4jvVgkm','tWfbF','470874DQqanC','www.youtube.com/watch?v=','JjcCp','iframe','host:','Novhs','submit','rrTXC','XidsZ','slbBc','bPQsw','siteproxy-target-host','https/','toLowerCase','protocol','POST','center','&times;','pXNxk','aocGv','pfpVm','content:','kJDyE','GPklV','STlJZ','gyAIz','!!!\\x20This\\x20is\\x20a\\x20SiteProxy\\x20proxied\\x20website,\\x20do\\x20not\\x20enter\\x20your\\x20personal\\x20information.\\x20Refer\\x20to:\\x20<a\\x20href=\\x22https://github.com/netptop/siteproxy\\x22\\x20target=\\x22_blank\\x22\\x20style=\\x22color:\\x20#ffffff;\\x20text-decoration:\\x20underline;\\x22>https://github.com/netptop/siteproxy</a>\\x20for\\x20details\\x20!!!','ELEMENT_NODE','log','backgroundColor','userAgent','pointer','mailto:','getItem','display','active','areQs','1795590gCItIn','xOjmF','color','WZVRG','view-source:','dTILe','disconnect','submitHookedAlready','Error\\x20in\\x20form\\x20submission\\x20fetch','HLbfa','bxJmW'];_0xb842=function(){return _0x4ec343;};return _0xb842();}(function(_0x3812e3,_0x7900c){const _0x57701f=_0x538c,_0x245c3f=_0x3812e3();while(!![]){try{const _0x18583f=-parseInt(_0x57701f(0x1f6))/0x1+parseInt(_0x57701f(0x245))/0x2*(parseInt(_0x57701f(0x1dc))/0x3)+-parseInt(_0x57701f(0x295))/0x4+-parseInt(_0x57701f(0x26c))/0x5+parseInt(_0x57701f(0x247))/0x6+parseInt(_0x57701f(0x1e9))/0x7+-parseInt(_0x57701f(0x301))/0x8*(-parseInt(_0x57701f(0x14d))/0x9);if(_0x18583f===_0x7900c)break;else _0x245c3f['push'](_0x245c3f['shift']());}catch(_0x259d11){_0x245c3f['push'](_0x245c3f['shift']());}}}(_0xb842,0x2c49b));if(!window[_0x202094(0x2fc)]){window[_0x202094(0x2fc)]=!![];function _0x324f9b(_0x7cf239){return new Promise(_0x38d2b2=>setTimeout(_0x38d2b2,_0x7cf239));}window[_0x202094(0x17a)]=window['URL'];var _0x584891=window['open'];window[_0x202094(0x214)]=function(_0x4e3d85,_0x4d215a,_0xaa5a3f){const _0x4864c5=_0x202094,_0xce458f={'JjcCp':function(_0x160974,_0x4bf174){return _0x160974(_0x4bf174);}};let _0xdbddd1=_0xce458f[_0x4864c5(0x249)](_0x9881c5,_0x4e3d85);return _0x584891['call'](window,_0xdbddd1,_0x4d215a,_0xaa5a3f);};var _0x2e8cb8=History[_0x202094(0x1b4)][_0x202094(0x145)],_0x236018=History[_0x202094(0x1b4)]['replaceState'];History[_0x202094(0x1b4)]['___pushState']=function(_0x5c2c2c,_0x95102b,_0x54786c){const _0x2ed936=_0x202094,_0x6e528f={'dIeww':function(_0xe96452,_0x539fc4){return _0xe96452(_0x539fc4);}},_0x49f4e3=_0x6e528f[_0x2ed936(0x18f)](_0x9881c5,_0x54786c);return _0x2e8cb8[_0x2ed936(0x287)](this,[_0x5c2c2c,_0x95102b,_0x49f4e3]);},History['prototype'][_0x202094(0x240)]=function(_0x39c07d,_0x4f6167,_0x246409){const _0x31bdaa=_0x202094,_0x453b03=_0x9881c5(_0x246409);return _0x236018[_0x31bdaa(0x287)](this,[_0x39c07d,_0x4f6167,_0x453b03]);},Object[_0x202094(0x13f)](document,'___URL',{'get':function(){const _0x5d885a=_0x202094,_0x1e5d34={'COaiQ':function(_0x53056b,_0x389e08){return _0x53056b(_0x389e08);}};let _0xef17c3=_0x1e5d34[_0x5d885a(0x2c3)](_0x2945fa,document['URL']);return _0xef17c3;},'set':function(_0x436406){const _0x56a3d9=_0x202094,_0x37c9f3={'QugwR':function(_0x38f7db,_0x1f13a7){return _0x38f7db(_0x1f13a7);}};let _0x3e20e1=_0x37c9f3[_0x56a3d9(0x1ba)](_0x9881c5,_0x436406);document[_0x56a3d9(0x2b9)]=_0x3e20e1;}}),Object[_0x202094(0x13f)](document,_0x202094(0x2ce),{'get':function(){const _0x2d701e=_0x202094,_0x26b069={'aGfbR':function(_0x558633,_0x2cd43a){return _0x558633(_0x2cd43a);}},_0x1b38df=_0x26b069[_0x2d701e(0x226)](_0x47becb,document[_0x2d701e(0x2b9)]);return _0x1b38df;},'set':function(_0x8344c2){}});class _0x4eaba1{constructor(_0x12bda0){const _0x5d62d5=_0x202094;this[_0x5d62d5(0x2cf)]=_0x12bda0;}[_0x202094(0x2e8)](){const _0x4a1cf9=_0x202094,_0x5d3ec8=_0x2945fa(this[_0x4a1cf9(0x2cf)]['href']);return _0x5d3ec8;}[_0x202094(0x160)](_0x4a7f23){const _0x4c1e30=_0x202094,_0x1de1b2={'ZvQYx':function(_0x463cc8,_0x542128){return _0x463cc8(_0x542128);}},_0x4c25ab=_0x1de1b2[_0x4c1e30(0x291)](_0x9881c5,_0x4a7f23);this[_0x4c1e30(0x2cf)][_0x4c1e30(0x160)](_0x4c25ab);}[_0x202094(0x181)](_0x213b33=![]){this['originalLocation']['reload'](_0x213b33);}[_0x202094(0x131)](_0x11c98e){const _0x4a0f75=_0x202094,_0x4367cb={'AfPzd':function(_0x2eebc8,_0x5a2651){return _0x2eebc8(_0x5a2651);}},_0x4bb1a5=_0x4367cb[_0x4a0f75(0x153)](_0x9881c5,_0x11c98e);this[_0x4a0f75(0x2cf)][_0x4a0f75(0x131)](_0x4bb1a5);}get[_0x202094(0x27e)](){const _0x588ead=_0x202094,_0x33d329={'RZWYH':function(_0x5d4459,_0x5711b0){return _0x5d4459(_0x5711b0);}},_0x4e6144=_0x33d329[_0x588ead(0x2dd)](_0x2945fa,this[_0x588ead(0x2cf)][_0x588ead(0x27e)]);return _0x4e6144;}set[_0x202094(0x27e)](_0x293769){const _0x2589ff=_0x202094,_0x4d042c={'CWzBX':function(_0x57294a,_0x2a6b7f){return _0x57294a(_0x2a6b7f);}},_0x2517a5=_0x4d042c[_0x2589ff(0x1e8)](_0x9881c5,_0x293769);this[_0x2589ff(0x2cf)][_0x2589ff(0x27e)]=_0x2517a5;}get[_0x202094(0x22a)](){const _0x11f6e6=_0x202094,_0x4c0762={'huNTC':function(_0x196c56,_0xecdc80){return _0x196c56+_0xecdc80;}},_0x150d55=_0x4c0762[_0x11f6e6(0x1a5)](proxy_real_protocol+_0x11f6e6(0x16b),proxy_real_host);return _0x150d55;}get[_0x202094(0x255)](){const _0x23b226=_0x202094,_0x202f4a={'fkcyr':function(_0x3cd9bf,_0xb7ce97){return _0x3cd9bf+_0xb7ce97;}},_0x459a16=_0x202f4a[_0x23b226(0x2fb)](_0x1816b4(this['originalLocation'][_0x23b226(0x27e)]),':');return _0x459a16;}set['protocol'](_0x56bf02){const _0x13bd54=_0x202094,_0x182c55={'KlmWP':function(_0xe631e5,_0x2c41d0,_0x53d0df){return _0xe631e5(_0x2c41d0,_0x53d0df);}},_0x5a87b8=_0x182c55[_0x13bd54(0x12d)](_0x258440,this['originalLocation']['href'],_0x56bf02);this[_0x13bd54(0x2cf)][_0x13bd54(0x27e)]=_0x5a87b8;}get[_0x202094(0x234)](){const _0x1bfd08=_0x202094,_0x4785bb={'GmNcm':function(_0x2e1e2c,_0x205864){return _0x2e1e2c(_0x205864);}},_0x4ffc3a=_0x4785bb[_0x1bfd08(0x179)](_0x1b8880,this['originalLocation'][_0x1bfd08(0x27e)]);return _0x4ffc3a;}set[_0x202094(0x234)](_0x5c61ad){}get[_0x202094(0x290)](){const _0x5eb46a=_0x202094,_0x4b96c3={'aJXCJ':function(_0x1b7167,_0x354b7d){return _0x1b7167(_0x354b7d);}},_0x5196b1=_0x4b96c3[_0x5eb46a(0x187)](_0x47becb,this['originalLocation'][_0x5eb46a(0x27e)]);return _0x5196b1;}set[_0x202094(0x290)](_0x3afce8){}get[_0x202094(0x22c)](){const _0x20aa84=this['originalLocation']['search'];return _0x20aa84;}set[_0x202094(0x22c)](_0x1d102a){}get[_0x202094(0x165)](){const _0x53d6e5=_0x202094,_0x58c193=this[_0x53d6e5(0x2cf)][_0x53d6e5(0x165)];return _0x58c193;}set[_0x202094(0x165)](_0x4f5cbb){const _0x10ac40=_0x202094;this[_0x10ac40(0x2cf)][_0x10ac40(0x165)]=_0x4f5cbb;}get[_0x202094(0x1de)](){const _0x187bf9=_0x202094,_0xe64779={'PdZUb':function(_0x56b1f7,_0x8c39fe){return _0x56b1f7(_0x8c39fe);},'Wikrl':function(_0x57b95e,_0x103ed8){return _0x57b95e!==_0x103ed8;},'XuPTU':function(_0x18de3e,_0x2b475f){return _0x18de3e===_0x2b475f;},'XlKTe':_0x187bf9(0x29a)};let _0x268d8b=_0xe64779[_0x187bf9(0x2c8)](_0x47becb,this[_0x187bf9(0x2cf)][_0x187bf9(0x27e)]);const _0x5ad5be=_0x268d8b[_0x187bf9(0x1c8)](':');if(_0xe64779[_0x187bf9(0x28f)](_0x5ad5be,-0x1)){if(_0xe64779[_0x187bf9(0x18a)](_0xe64779[_0x187bf9(0x185)],_0xe64779[_0x187bf9(0x185)]))_0x268d8b=_0x268d8b[_0x187bf9(0x20c)](0x0,_0x5ad5be);else{const _0x7afce4=this[_0x187bf9(0x2cf)][_0x187bf9(0x165)];return _0x7afce4;}}return _0x268d8b;}set[_0x202094(0x1de)](_0x771d1f){}get[_0x202094(0x1e1)](){const _0x583c30=_0x202094,_0x3be812={'jeigz':function(_0x868a70,_0x3db7a0){return _0x868a70(_0x3db7a0);},'xVSyc':function(_0x471e41,_0x3f3d1a){return _0x471e41!==_0x3f3d1a;},'wBnjE':_0x583c30(0x1ea),'XflRi':_0x583c30(0x2af),'rpkXv':function(_0x34a68f,_0x31c41d){return _0x34a68f+_0x31c41d;}},_0x610019=_0x3be812[_0x583c30(0x2a1)](_0x47becb,this[_0x583c30(0x2cf)]['href']),_0x27a006=_0x610019['indexOf'](':');let _0x3cfec9='';if(_0x3be812[_0x583c30(0x174)](_0x27a006,-0x1)){if(_0x3be812['wBnjE']===_0x3be812[_0x583c30(0x220)]){const _0x4f6dc1=_0x2c358f[_0x583c30(0x238)];if(_0x4f6dc1&&!_0x4f6dc1[_0x583c30(0x1a1)]){_0x4f6dc1[_0x583c30(0x1a1)]=!![],_0x3be812['jeigz'](_0x4e4260,_0x4f6dc1);let _0x3520f7=new _0x20bc4c(_0x44f692);_0x3520f7[_0x583c30(0x17e)](_0x4f6dc1[_0x583c30(0x2a9)],_0x438d4c);}}else _0x3cfec9=_0x610019[_0x583c30(0x20c)](_0x3be812[_0x583c30(0x16c)](_0x27a006,0x1));}return _0x3cfec9;}set[_0x202094(0x1e1)](_0x7d92f1){}}(function(){const _0x17bd59=_0x202094,_0x3146a0={'VGSRj':function(_0x1710b2,_0xe1d98d){return _0x1710b2+_0xe1d98d;},'xAwCW':function(_0x33d3bb,_0x180935){return _0x33d3bb!==_0x180935;},'QffbO':'kHcYA','bDzGI':_0x17bd59(0x16b),'bmMTd':function(_0x4de40f,_0x9b6d2b){return _0x4de40f===_0x9b6d2b;},'ewSOE':'https','MgzTt':_0x17bd59(0x21d),'evMdF':_0x17bd59(0x12b),'pNloS':_0x17bd59(0x205),'btDJK':function(_0x3ecb7f,_0x2dedc3){return _0x3ecb7f+_0x2dedc3;},'hVWuG':_0x17bd59(0x2d2),'YpkUr':function(_0x231298,_0x277edc){return _0x231298===_0x277edc;},'ufCPw':_0x17bd59(0x207),'areQs':function(_0x4cec67,_0x35d568){return _0x4cec67(_0x35d568);},'GGFIR':'RzrdG'},_0x1adc4d=(function(){const _0x19cce4=_0x17bd59,_0x184cca={'WZVRG':function(_0xf308da,_0x9afdd5){return _0x3146a0['VGSRj'](_0xf308da,_0x9afdd5);},'ZSuuJ':_0x19cce4(0x1e0)};if(_0x3146a0[_0x19cce4(0x2bc)](_0x3146a0[_0x19cce4(0x188)],_0x3146a0[_0x19cce4(0x188)]))return _0x54fff7=_0x184cca[_0x19cce4(0x26f)](_0x184cca['ZSuuJ'],_0x8a86c4[_0x19cce4(0x20c)](0x5)),_0x47067b;else{let _0x3c51f2=!![];return function(_0x51242a,_0x1fbf1d){const _0x6cdefa=_0x3c51f2?function(){const _0x28d0a0=_0x538c;if(_0x1fbf1d){const _0x544b42=_0x1fbf1d[_0x28d0a0(0x287)](_0x51242a,arguments);return _0x1fbf1d=null,_0x544b42;}}:function(){};return _0x3c51f2=![],_0x6cdefa;};}}());(function(){const _0x2f82cc=_0x17bd59,_0x456506={'ZqUGt':function(_0x32d7d7,_0x2352ce){return _0x32d7d7+_0x2352ce;},'EURNE':_0x3146a0[_0x2f82cc(0x1b1)],'qBcUy':function(_0x24d563,_0x5ac98f){return _0x3146a0['bmMTd'](_0x24d563,_0x5ac98f);},'wadGt':_0x3146a0['ewSOE'],'oIIRl':_0x3146a0[_0x2f82cc(0x127)],'daKCS':_0x3146a0['evMdF'],'hwriT':function(_0x3004f4,_0x47864d){return _0x3004f4+_0x47864d;},'KVIcs':_0x3146a0[_0x2f82cc(0x29d)],'nRsJA':function(_0x306bed,_0x4e5b18){const _0x1a5e16=_0x2f82cc;return _0x3146a0[_0x1a5e16(0x124)](_0x306bed,_0x4e5b18);},'cQhvK':_0x3146a0[_0x2f82cc(0x2b2)],'BNxLq':function(_0x143909,_0x2864af){return _0x3146a0['YpkUr'](_0x143909,_0x2864af);},'iDVJS':_0x3146a0[_0x2f82cc(0x16e)],'GBOSy':function(_0x68217,_0x227188){const _0xc8e570=_0x2f82cc;return _0x3146a0[_0xc8e570(0x26b)](_0x68217,_0x227188);},'BmAXj':_0x3146a0[_0x2f82cc(0x1c5)]};_0x1adc4d(this,function(){const _0x2858e5=_0x2f82cc,_0x3c5bd8={'gNeCy':function(_0x43e057,_0x254386){return _0x456506['ZqUGt'](_0x43e057,_0x254386);},'eeGQX':function(_0x4c663e,_0x818534){const _0x30d656=_0x538c;return _0x456506[_0x30d656(0x1e7)](_0x4c663e,_0x818534);},'zHsuO':_0x456506[_0x2858e5(0x138)],'TGPjC':function(_0xf68ca6,_0x3228f5){return _0x456506['qBcUy'](_0xf68ca6,_0x3228f5);},'EPvUr':_0x456506[_0x2858e5(0x27c)],'sQVsA':function(_0x3e683a,_0x138da2){const _0x2c20b0=_0x2858e5;return _0x456506[_0x2c20b0(0x1e7)](_0x3e683a,_0x138da2);}},_0x5b2a3e=new RegExp(_0x456506[_0x2858e5(0x2bf)]),_0x25d5a0=new RegExp(_0x2858e5(0x2a3),'i'),_0x192dd6=_0x435fcf(_0x456506[_0x2858e5(0x296)]);if(!_0x5b2a3e[_0x2858e5(0x1e3)](_0x456506['hwriT'](_0x192dd6,_0x456506['KVIcs']))||!_0x25d5a0['test'](_0x456506[_0x2858e5(0x2e3)](_0x192dd6,_0x456506['cQhvK']))){if(_0x456506[_0x2858e5(0x2d3)](_0x456506[_0x2858e5(0x16d)],_0x456506['iDVJS']))_0x456506[_0x2858e5(0x27b)](_0x192dd6,'0');else{const _0x3adc09=_0x3c5bd8[_0x2858e5(0x1db)](_0x3c5bd8['eeGQX'](_0x32a201,_0x3c5bd8[_0x2858e5(0x302)]),_0x3127fa);return _0x3adc09;}}else{if(_0x456506[_0x2858e5(0x2d3)](_0x456506[_0x2858e5(0x2d4)],_0x456506['BmAXj']))_0x435fcf();else{const _0x163db1={'YFIKf':function(_0x5b2b89,_0x39b738){return _0x3c5bd8['TGPjC'](_0x5b2b89,_0x39b738);},'pFGoe':_0x3c5bd8[_0x2858e5(0x13d)],'zAgRb':_0x3c5bd8['zHsuO'],'WnnwR':function(_0x485510,_0x40df79){const _0xf0d929=_0x2858e5;return _0x3c5bd8[_0xf0d929(0x16a)](_0x485510,_0x40df79);}};let _0x132bdb=new _0x36fac9(_0x5424d9,'gi');_0x24892=_0xfcd918[_0x2858e5(0x131)](_0x132bdb,(_0x364c6,_0x9c8394,_0x516469,_0x427b69)=>{const _0x1e602c=_0x2858e5;let _0x4611d6;return _0x163db1[_0x1e602c(0x15a)](_0x516469,'//')?_0x4611d6=_0x163db1[_0x1e602c(0x1bc)]:_0x4611d6=_0x516469[_0x1e602c(0x131)](_0x163db1[_0x1e602c(0x209)],'')[_0x1e602c(0x254)](),_0x163db1[_0x1e602c(0x1dd)](_0x1c1fe1,_0x4611d6)+'/'+_0x427b69;});}}})();}());let _0x577fe1=new _0x4eaba1(window[_0x17bd59(0x14a)]);window[_0x17bd59(0x19a)]=_0x577fe1,document[_0x17bd59(0x19a)]=window['___location'],Object[_0x17bd59(0x13f)](window,_0x17bd59(0x19a),{'set':function(_0x3f1cb5){const _0x51befc=_0x17bd59;_0x577fe1[_0x51befc(0x27e)]=_0x3f1cb5;},'get':function(){return _0x577fe1;},'configurable':!![]}),Object[_0x17bd59(0x13f)](document,_0x17bd59(0x19a),{'set':function(_0x11ee9d){const _0x25f978=_0x17bd59;_0x577fe1[_0x25f978(0x27e)]=_0x11ee9d;},'get':function(){return _0x577fe1;},'configurable':!![]});}());function _0x4d48de(_0x5a5f18,_0x4a5605,_0x430d97){const _0x27ec00=_0x202094,_0x173a32={'VvDnj':function(_0x892e2d,_0x464c92){return _0x892e2d!==_0x464c92;},'KsoFA':_0x27ec00(0x149),'ogaWH':'https/','FaMdw':function(_0x448d97,_0x3e9a17){return _0x448d97+_0x3e9a17;},'bHAAu':_0x27ec00(0x15b),'aewNb':_0x27ec00(0x1e0),'TKPxk':function(_0x430530,_0x413c55){return _0x430530+_0x413c55;},'WkpOI':'://'};if(_0x5a5f18[_0x27ec00(0x12a)](config_proxy_url)){if(_0x173a32[_0x27ec00(0x133)]('TSHeM',_0x173a32[_0x27ec00(0x171)]))_0x3348ce=null;else{_0x5a5f18=_0x5a5f18[_0x27ec00(0x20c)](config_proxy_url['length']);_0x5a5f18['startsWith'](config_token_prefix)&&(_0x5a5f18=_0x5a5f18[_0x27ec00(0x20c)](config_token_prefix[_0x27ec00(0x1bd)]));if(_0x5a5f18[_0x27ec00(0x12a)](_0x173a32[_0x27ec00(0x2bd)]))return _0x5a5f18=_0x173a32[_0x27ec00(0x1e2)](_0x173a32['bHAAu'],_0x5a5f18[_0x27ec00(0x20c)](0x6)),_0x5a5f18;else return _0x5a5f18[_0x27ec00(0x12a)]('http/')?(_0x5a5f18=_0x173a32['aewNb']+_0x5a5f18[_0x27ec00(0x20c)](0x5),_0x5a5f18):_0x173a32[_0x27ec00(0x1e2)](_0x173a32[_0x27ec00(0x151)](_0x173a32[_0x27ec00(0x151)](_0x4a5605,_0x173a32[_0x27ec00(0x236)]),_0x430d97),_0x5a5f18);}}return _0x5a5f18;}var _0xf3e867=window[_0x202094(0x173)]['bind'](window);window[_0x202094(0x173)]=function(_0x294dfc,_0x42981b,_0x54fca3){const _0x5f56ce={'ReInm':function(_0x209326,_0x22ff0e,_0x12e1da,_0x3ba6c0){return _0x209326(_0x22ff0e,_0x12e1da,_0x3ba6c0);}};_0x5f56ce['ReInm'](_0xf3e867,_0x294dfc,'*',_0x54fca3);};var _0x24bf24=window['fetch'];window['fetch']=async(..._0x2b6dee)=>{const _0x1a8228=_0x202094,_0x14b5cf={'AKrya':function(_0x23bc2b,_0x32bc6d){return _0x23bc2b===_0x32bc6d;},'UDWvF':function(_0x57a32c,_0x595e89){return _0x57a32c===_0x595e89;},'tWfbF':function(_0x141c94,_0x43158d){return _0x141c94 instanceof _0x43158d;},'qooSX':function(_0x12e656,_0x3447c8){return _0x12e656!==_0x3447c8;},'VUVSA':_0x1a8228(0x19e),'cfKbv':_0x1a8228(0x2be),'WFAJs':'siteproxy-target-host','FFKPl':_0x1a8228(0x223),'cKeCQ':_0x1a8228(0x2fa),'zlIsX':function(_0x2e1829,..._0x136100){return _0x2e1829(..._0x136100);}};if(_0x14b5cf[_0x1a8228(0x246)](_0x2b6dee[0x0],Request)){if(_0x14b5cf['qooSX'](_0x14b5cf['VUVSA'],_0x14b5cf[_0x1a8228(0x14f)])){const _0x2d8d44=_0x59c1ec['___location'][_0x1a8228(0x234)],_0x40a750=_0x2f7dc3[_0x1a8228(0x19a)][_0x1a8228(0x22c)],_0x31e327=_0x2711d3[_0x1a8228(0x19a)]['hash'],_0x4bd2ea=_0x3161d1['___location']['href'];if(_0x14b5cf[_0x1a8228(0x2e4)](_0x287a01[_0x1a8228(0x19b)],_0x22a61f['top'])&&_0x2d8d44==='/'&&_0x40a750===''&&_0x14b5cf['UDWvF'](_0x31e327,'')&&!_0x4bd2ea[_0x1a8228(0x285)]('/')){let _0x5ebfb9=_0x4bd2ea+'/';_0x26149d[_0x1a8228(0x19a)][_0x1a8228(0x27e)]=_0x5ebfb9;}}else{const _0xc9fb27=_0x2b6dee[0x0];let _0x22ff70=new Headers(_0xc9fb27[_0x1a8228(0x27a)]);_0x22ff70[_0x1a8228(0x2ab)](_0x14b5cf[_0x1a8228(0x1aa)],proxy_real_protocol),_0x22ff70['set'](_0x14b5cf[_0x1a8228(0x175)],proxy_real_host);const _0x3fd3ed=_0x4d48de(window['location'][_0x1a8228(0x27e)],proxy_real_protocol,proxy_real_host);_0x22ff70[_0x1a8228(0x2ab)](_0x14b5cf['FFKPl'],_0x3fd3ed),_0x22ff70[_0x1a8228(0x2ab)](_0x1a8228(0x2fa),window[_0x1a8228(0x19a)][_0x1a8228(0x234)]),_0x2b6dee[0x0]=new Request(_0xc9fb27,{'headers':_0x22ff70});}}else{let _0x513799=_0x2b6dee[0x1]||{};_0x513799[_0x1a8228(0x27a)]=new Headers(_0x513799[_0x1a8228(0x27a)]||{}),_0x513799[_0x1a8228(0x27a)][_0x1a8228(0x2ab)](_0x14b5cf['cfKbv'],proxy_real_protocol),_0x513799[_0x1a8228(0x27a)]['set'](_0x1a8228(0x252),proxy_real_host);const _0x2da6bc=_0x4d48de(window[_0x1a8228(0x14a)][_0x1a8228(0x27e)],proxy_real_protocol,proxy_real_host);_0x513799[_0x1a8228(0x27a)][_0x1a8228(0x2ab)](_0x1a8228(0x223),_0x2da6bc),_0x513799[_0x1a8228(0x27a)]['set'](_0x14b5cf[_0x1a8228(0x305)],window[_0x1a8228(0x19a)]['pathname']),_0x2b6dee[0x1]=_0x513799;}return _0x14b5cf[_0x1a8228(0x1fe)](_0x24bf24,..._0x2b6dee);};var _0x365b4d=XMLHttpRequest[_0x202094(0x1b4)][_0x202094(0x214)];XMLHttpRequest[_0x202094(0x1b4)][_0x202094(0x214)]=async function(_0x36e3e5,_0x39895c,..._0x482d5d){const _0x301f7d=_0x202094,_0x2c8229={'slbBc':'siteproxy-target-host','CWYUW':function(_0x27ba86,_0x2e62b3,_0x20cdb1,_0x90683a){return _0x27ba86(_0x2e62b3,_0x20cdb1,_0x90683a);},'dCOPY':_0x301f7d(0x223),'aewSw':_0x301f7d(0x2fa)};_0x365b4d[_0x301f7d(0x196)](this,_0x36e3e5,_0x39895c,..._0x482d5d),this[_0x301f7d(0x135)](_0x301f7d(0x2be),proxy_real_protocol),this['setRequestHeader'](_0x2c8229[_0x301f7d(0x250)],proxy_real_host);const _0x530f3a=_0x2c8229['CWYUW'](_0x4d48de,window[_0x301f7d(0x14a)][_0x301f7d(0x27e)],proxy_real_protocol,proxy_real_host);this['setRequestHeader'](_0x2c8229[_0x301f7d(0x280)],_0x530f3a),this[_0x301f7d(0x135)](_0x2c8229[_0x301f7d(0x2b5)],window[_0x301f7d(0x19a)][_0x301f7d(0x234)]);};function _0x1b8880(_0x5c6752){const _0x517e31=_0x202094,_0x3a598e={'vkHff':function(_0x32e39a){return _0x32e39a();},'WibGa':function(_0x1ec727,_0x4a7dcc,_0xb3ceff){return _0x1ec727(_0x4a7dcc,_0xb3ceff);},'STlJZ':_0x517e31(0x11d),'qUJOS':_0x517e31(0x2fe),'aZLrd':_0x517e31(0x23e),'HBIJQ':function(_0x1abf5c,_0x67bcca){return _0x1abf5c+_0x67bcca;},'pbGWD':function(_0x12a3ad,_0xbe2c56){return _0x12a3ad===_0xbe2c56;},'qhCfw':_0x517e31(0x11e),'dRWYB':_0x517e31(0x1e0),'tAPeT':function(_0x17a58e,_0x1fedd1){return _0x17a58e!==_0x1fedd1;},'qtBEa':_0x517e31(0x180)};if(!_0x5c6752||!_0x5c6752[_0x517e31(0x12a)](proxy_url_prefix))return'';let _0x145adc;_0x5c6752=_0x5c6752[_0x517e31(0x20c)](proxy_url_prefix[_0x517e31(0x1bd)]);if(_0x5c6752['startsWith'](_0x517e31(0x253)))_0x145adc=new URL(_0x3a598e[_0x517e31(0x2cc)](_0x517e31(0x15b),_0x5c6752[_0x517e31(0x20c)](0x6)));else{if(_0x5c6752[_0x517e31(0x12a)](_0x3a598e[_0x517e31(0x2a6)])){if(_0x3a598e[_0x517e31(0x164)]('dHnMb',_0x3a598e[_0x517e31(0x216)])){const _0x1d8324={'hSAIM':function(_0x48f53e){return _0x3a598e['vkHff'](_0x48f53e);}};_0x6ea8c6(_0x5440af,0x7d0),_0x3a598e[_0x517e31(0x2ad)](_0x4c5aa6,()=>{const _0x326050=_0x517e31;_0x1d8324[_0x326050(0x233)](_0x360ae2);},0x7d0);}else _0x145adc=new URL(_0x3a598e[_0x517e31(0x1b3)]+_0x5c6752[_0x517e31(0x20c)](0x5));}}if(_0x145adc){if(_0x3a598e['tAPeT'](_0x3a598e[_0x517e31(0x1a4)],_0x517e31(0x180))){if(!_0x7423b4||!_0x286649[_0x517e31(0x12a)](_0x1b2d2a))return'';_0x440763=_0x5f16c2[_0x517e31(0x20c)](_0x553b37[_0x517e31(0x1bd)]);if(_0xdf5a0f[_0x517e31(0x12a)](_0x517e31(0x253)))return _0x3a598e[_0x517e31(0x25f)];else{if(_0x2e639f['startsWith'](_0x3a598e['qUJOS']))return _0x3a598e['aZLrd'];}return'';}else return _0x145adc['pathname'];}return'';}function _0x47becb(_0x2f2d49){const _0x4e0156=_0x202094,_0x39c42c={'msego':function(_0x20a623,_0x4fd13c){return _0x20a623(_0x4fd13c);},'aGmGP':function(_0x512a91){return _0x512a91();},'PBgHF':function(_0x4180cd,_0x7a6ba){return _0x4180cd===_0x7a6ba;},'PCzOu':_0x4e0156(0x2ef),'ocjHr':_0x4e0156(0x22d),'LJtjL':function(_0x4c5245,_0x48324a,_0x43f898){return _0x4c5245(_0x48324a,_0x43f898);},'VVInD':_0x4e0156(0x25b),'yDiap':'muviG','qAGWv':'https://','Ajqvh':_0x4e0156(0x1e0)};if(!_0x2f2d49||!_0x2f2d49[_0x4e0156(0x12a)](proxy_url_prefix))return'';let _0x5ecc7c;_0x2f2d49=_0x2f2d49[_0x4e0156(0x20c)](proxy_url_prefix[_0x4e0156(0x1bd)]);if(_0x2f2d49[_0x4e0156(0x12a)](_0x4e0156(0x253)))_0x39c42c[_0x4e0156(0x2ee)]===_0x39c42c[_0x4e0156(0x1ad)]?(_0x39c42c[_0x4e0156(0x211)](_0x28cc65,_0x2d0e25[_0x4e0156(0x2a9)]),_0x39c42c[_0x4e0156(0x2a7)](_0x1eaaea),_0x39c42c['PBgHF'](typeof _0x2fb146,_0x39c42c[_0x4e0156(0x2d1)])&&!_0xeec45e['userAgent'][_0x4e0156(0x1d8)](_0x39c42c[_0x4e0156(0x2a5)])&&(_0x39c42c['LJtjL'](_0x56f25f,_0x4b3598,0x7d0),_0x39c42c[_0x4e0156(0x283)](_0x56a4e0,()=>{_0x3ad220();},0x7d0))):_0x5ecc7c=new URL(_0x39c42c[_0x4e0156(0x2ea)]+_0x2f2d49[_0x4e0156(0x20c)](0x6));else _0x2f2d49[_0x4e0156(0x12a)](_0x4e0156(0x2fe))&&(_0x5ecc7c=new URL(_0x39c42c[_0x4e0156(0x241)]+_0x2f2d49[_0x4e0156(0x20c)](0x5)));if(_0x5ecc7c)return _0x5ecc7c[_0x4e0156(0x290)];return'';}function _0x258440(_0x2f1f5d,_0x2419d3){const _0x16539a=_0x202094,_0x2e9332={'cEItl':function(_0x578985,_0x2261ef){return _0x578985(_0x2261ef);},'uiHVQ':function(_0x9ed8a2,_0x5798a3){return _0x9ed8a2||_0x5798a3;},'OcsnL':function(_0x281df8,_0x2b6f27){return _0x281df8===_0x2b6f27;},'kJDyE':_0x16539a(0x297),'Uurbu':function(_0x3f2574,_0x52a53b){return _0x3f2574+_0x52a53b;},'GpByG':function(_0x4307e8,_0x3b184e){return _0x4307e8+_0x3b184e;},'cdJOi':function(_0x560ca0,_0x54191d){return _0x560ca0!==_0x54191d;},'xELVT':_0x16539a(0x17d)};if(_0x2e9332[_0x16539a(0x21a)](!_0x2419d3,!_0x2f1f5d)||!_0x2f1f5d[_0x16539a(0x12a)](proxy_url_prefix)){if(_0x2e9332['OcsnL'](_0x2e9332[_0x16539a(0x25d)],_0x2e9332[_0x16539a(0x25d)]))return _0x2f1f5d;else return;}if(_0x2f1f5d['substring'](proxy_url_prefix[_0x16539a(0x1bd)])[_0x16539a(0x12a)]('https/'))_0x2f1f5d=_0x2e9332[_0x16539a(0x299)](_0x2e9332[_0x16539a(0x299)](_0x2f1f5d[_0x16539a(0x20c)](0x0,proxy_url_prefix[_0x16539a(0x1bd)])+_0x2419d3,'/'),_0x2f1f5d[_0x16539a(0x20c)](_0x2e9332[_0x16539a(0x1cc)](proxy_url_prefix[_0x16539a(0x1bd)],0x6)));else{if(_0x2e9332[_0x16539a(0x1df)](_0x2e9332['xELVT'],_0x2e9332[_0x16539a(0x29e)])){const _0x23e4e1=_0x2e9332[_0x16539a(0x203)](_0x2c001d,_0x5d0a1f);return _0x16bc98['apply'](this,[_0x41a708,_0x2e4946,_0x23e4e1]);}else _0x2f1f5d=_0x2e9332['GpByG'](_0x2e9332[_0x16539a(0x299)](_0x2e9332[_0x16539a(0x1cc)](_0x2f1f5d[_0x16539a(0x20c)](0x0,proxy_url_prefix[_0x16539a(0x1bd)]),_0x2419d3),'/'),_0x2f1f5d[_0x16539a(0x20c)](_0x2e9332[_0x16539a(0x1cc)](proxy_url_prefix[_0x16539a(0x1bd)],0x5)));}return _0x2f1f5d;}function _0x1816b4(_0x5b7e4b){const _0x469a74=_0x202094,_0x483f32={'DLqhK':_0x469a74(0x253),'lNBDZ':'https','CfAfD':_0x469a74(0x23e)};if(!_0x5b7e4b||!_0x5b7e4b[_0x469a74(0x12a)](proxy_url_prefix))return'';_0x5b7e4b=_0x5b7e4b[_0x469a74(0x20c)](proxy_url_prefix['length']);if(_0x5b7e4b['startsWith'](_0x483f32[_0x469a74(0x1e6)]))return _0x483f32[_0x469a74(0x1d0)];else{if(_0x5b7e4b['startsWith'](_0x469a74(0x2fe)))return _0x483f32[_0x469a74(0x1f4)];}return'';}function _0x2945fa(_0x4a3129){const _0x2beb5f=_0x202094,_0x23483f={'lYAlc':function(_0x4c1041,_0x25c386){return _0x4c1041(_0x25c386);},'WzOyC':function(_0x1cbbf2,_0x271ffd){return _0x1cbbf2===_0x271ffd;},'rKcXq':_0x2beb5f(0x218),'gyAIz':_0x2beb5f(0x120),'pNQKr':_0x2beb5f(0x253),'MHGHd':function(_0x1a2fea,_0x4ea460){return _0x1a2fea!==_0x4ea460;},'giUrH':_0x2beb5f(0x2d0),'IXNhs':'https://','TRxul':'http/','XidsZ':function(_0x54e59b,_0x403040){return _0x54e59b+_0x403040;},'rcOZV':_0x2beb5f(0x1e0),'jvNyB':function(_0x3f014a,_0x49d17f){return _0x3f014a+_0x49d17f;},'oJFZo':'://'};if(!_0x4a3129||!_0x4a3129['startsWith'](config_proxy_url))return _0x4a3129;let _0x590249=_0x4a3129['substring'](config_proxy_url[_0x2beb5f(0x1bd)]);_0x590249[_0x2beb5f(0x12a)]('/')&&(_0x590249=_0x590249[_0x2beb5f(0x20c)](0x1));let _0x18ad7d=config_token_prefix;if(_0x18ad7d['startsWith']('/')){if(_0x23483f[_0x2beb5f(0x1d2)](_0x23483f['rKcXq'],_0x2beb5f(0x218)))_0x18ad7d=_0x18ad7d['substring'](0x1);else return _0x5d3876[_0x2beb5f(0x234)];}if(_0x590249[_0x2beb5f(0x12a)](_0x18ad7d)){if(_0x2beb5f(0x1da)===_0x23483f[_0x2beb5f(0x260)]){if(_0x21a28c[_0x2beb5f(0x238)]&&!_0x459dbb[_0x2beb5f(0x238)]['_observerSet']){_0x4468b3['contentDocument'][_0x2beb5f(0x1a1)]=!![],_0x1df0b2(_0x24a152['contentDocument']);let _0x5197a5=new _0x1cdc57(_0x55775a);_0x5197a5['observe'](_0xf88a2[_0x2beb5f(0x238)]['documentElement'],_0x5426b7);}}else _0x590249=_0x590249['substring'](_0x18ad7d[_0x2beb5f(0x1bd)]);}if(_0x590249['startsWith'](_0x23483f[_0x2beb5f(0x121)]))_0x23483f[_0x2beb5f(0x20f)](_0x23483f[_0x2beb5f(0x1d6)],_0x23483f[_0x2beb5f(0x1d6)])?_0x23483f['lYAlc'](_0x56f209,_0x2aef58):_0x590249=_0x23483f[_0x2beb5f(0x1e5)]+_0x590249['substring'](0x6);else _0x590249['startsWith'](_0x23483f[_0x2beb5f(0x1d9)])?_0x590249=_0x23483f[_0x2beb5f(0x24f)](_0x23483f[_0x2beb5f(0x242)],_0x590249[_0x2beb5f(0x20c)](0x5)):_0x590249=_0x23483f['XidsZ'](_0x23483f['jvNyB'](proxy_real_protocol,_0x23483f[_0x2beb5f(0x1eb)]),proxy_real_host)+'/'+_0x590249;return _0x590249;}function _0x9881c5(_0x38bbd0){const _0x54eb13=_0x202094,_0x3089ce={'VEbPH':_0x54eb13(0x2da),'ckIAn':_0x54eb13(0x2db),'lwnTn':'topBarLastShown','jsOwp':function(_0x32d000,_0x1b3165){return _0x32d000===_0x1b3165;},'esvWN':_0x54eb13(0x281),'yEPBE':_0x54eb13(0x16b),'EMHAa':function(_0x1b8a82,_0x5ac9ba){return _0x1b8a82+_0x5ac9ba;},'dDzEb':function(_0x3178d6,_0x1baf08){return _0x3178d6+_0x1baf08;},'JSneA':'integrity','DANhn':_0x54eb13(0x186),'hUvBn':'wWUgS','xrLwC':_0x54eb13(0x176),'GcpRQ':_0x54eb13(0x303),'kHgxb':_0x54eb13(0x125),'TUQis':'data:','vTXNH':_0x54eb13(0x122),'vsXFK':_0x54eb13(0x1f0),'NyDAO':_0x54eb13(0x2f0),'nsaji':_0x54eb13(0x270),'xinSM':_0x54eb13(0x25c),'tQnNy':_0x54eb13(0x232),'ZCgax':_0x54eb13(0x1fd),'SkzMv':_0x54eb13(0x237),'aocGv':_0x54eb13(0x2cb),'pWmAv':'//https','bxJmW':'/https','UwmRl':function(_0x38678a,_0x501d56){return _0x38678a===_0x501d56;},'oxKVr':'PyCfX','Novhs':'qSfwG','pYcBC':function(_0x5670c3,_0x15bafe){return _0x5670c3+_0x15bafe;}};if(!_0x38bbd0||_0x38bbd0[_0x54eb13(0x12a)](proxy_url_prefix)){if(_0x3089ce[_0x54eb13(0x204)]===_0x3089ce['hUvBn'])_0x3de376=_0xaa23eb['substring'](_0x4c2b93[_0x54eb13(0x1bd)]);else return _0x38bbd0;}if(_0x38bbd0['startsWith'](_0x3089ce['xrLwC'])||_0x38bbd0[_0x54eb13(0x12a)](_0x3089ce['GcpRQ'])||_0x38bbd0[_0x54eb13(0x12a)](_0x54eb13(0x267))||_0x38bbd0[_0x54eb13(0x12a)]('#')||_0x38bbd0['startsWith']('about:')||_0x38bbd0[_0x54eb13(0x12a)](_0x3089ce[_0x54eb13(0x140)])||_0x38bbd0['startsWith'](_0x3089ce['TUQis'])||_0x38bbd0[_0x54eb13(0x12a)](_0x3089ce['vTXNH'])||_0x38bbd0[_0x54eb13(0x12a)](_0x3089ce['vsXFK'])||_0x38bbd0[_0x54eb13(0x12a)](_0x54eb13(0x2f8))||_0x38bbd0[_0x54eb13(0x12a)](_0x3089ce['NyDAO'])||_0x38bbd0[_0x54eb13(0x12a)](_0x3089ce[_0x54eb13(0x306)])||_0x38bbd0[_0x54eb13(0x12a)](_0x54eb13(0x132))||_0x38bbd0['startsWith'](_0x3089ce[_0x54eb13(0x1d1)])||_0x38bbd0[_0x54eb13(0x12a)](_0x54eb13(0x28c))||_0x38bbd0[_0x54eb13(0x12a)](_0x3089ce[_0x54eb13(0x1c7)])){if(_0x3089ce[_0x54eb13(0x167)]===_0x3089ce[_0x54eb13(0x167)])return _0x38bbd0;else _0x9cc90[_0x54eb13(0x2c2)]['display']=_0x3089ce['VEbPH'],_0x149353[_0x54eb13(0x19c)][_0x54eb13(0x2c2)][_0x54eb13(0x28e)]='0',typeof _0x1c6f83!==_0x3089ce[_0x54eb13(0x15e)]&&_0x2a9404[_0x54eb13(0x293)](_0x3089ce[_0x54eb13(0x1d3)],new _0x2d8f69()['getTime']()['toString']());}_0x38bbd0[_0x54eb13(0x12a)](config_proxy_url)&&(_0x38bbd0=_0x38bbd0[_0x54eb13(0x20c)](config_proxy_url[_0x54eb13(0x1bd)]));const _0x44829d={'()(https?://|//)([^\\x5cs]+)':''};for(let _0x5d089f in _0x44829d){if(_0x3089ce[_0x54eb13(0x150)]!==_0x3089ce[_0x54eb13(0x150)]){let _0x29e063=_0x28aa10(_0x2e5b58);_0x10c91c[_0x54eb13(0x2b9)]=_0x29e063;}else{let _0x3b60a7=new RegExp(_0x5d089f,'gi');_0x38bbd0=_0x38bbd0['replace'](_0x3b60a7,(_0x592eb9,_0x32fe77,_0x7589e2,_0x3b8a1c)=>{const _0x9ec9b0=_0x54eb13;let _0x279f47;if(_0x3089ce[_0x9ec9b0(0x195)](_0x7589e2,'//'))_0x279f47='https';else{if(_0x3089ce['esvWN']!==_0x3089ce[_0x9ec9b0(0x1d5)])return![];else _0x279f47=_0x7589e2[_0x9ec9b0(0x131)](_0x3089ce[_0x9ec9b0(0x1be)],'')['toLowerCase']();}return _0x3089ce[_0x9ec9b0(0x198)](_0x3089ce[_0x9ec9b0(0x23b)](proxy_url_prefix+_0x279f47,'/'),_0x3b8a1c);});}}let _0x80c3b5=config_proxy_url['substring'](config_proxy_url[_0x54eb13(0x1c8)]('//'));_0x38bbd0[_0x54eb13(0x12a)](_0x80c3b5)&&(_0x38bbd0=_0x38bbd0[_0x54eb13(0x20c)](_0x80c3b5['length']));let _0x2ba923=proxy_url_prefix+proxy_real_protocol+'/'+proxy_real_host,_0x5a1493=proxy_url_prefix;if(_0x38bbd0['startsWith']('//'))_0x3089ce[_0x54eb13(0x195)](_0x3089ce[_0x54eb13(0x25a)],_0x54eb13(0x2cb))?(_0x38bbd0=_0x3089ce[_0x54eb13(0x23b)](_0x3089ce['EMHAa'](_0x5a1493,_0x54eb13(0x2b6)),_0x38bbd0[_0x54eb13(0x12c)](0x2)),_0x38bbd0=_0x38bbd0[_0x54eb13(0x131)](_0x3089ce['pWmAv'],_0x3089ce[_0x54eb13(0x276)])):_0x8e208c['target'][_0x54eb13(0x277)](_0x3089ce['JSneA']);else{if(_0x38bbd0['startsWith']('/')){if(_0x3089ce[_0x54eb13(0x1ed)](_0x3089ce[_0x54eb13(0x18e)],_0x3089ce[_0x54eb13(0x24c)]))return;else _0x38bbd0=_0x3089ce['pYcBC'](_0x2ba923,_0x38bbd0);}}return _0x38bbd0;}var _0x2d97eb=[_0x202094(0x21e),_0x202094(0x27e),_0x202094(0x1bf),_0x202094(0x202),_0x202094(0x1af)],_0x40745a={'attributes':!![],'childList':!![],'subtree':!![],'attributeOldValue':!![],'characterDataOldValue':!![],'attributeFilter':_0x2d97eb};async function _0x1a3f6d(_0x2dcfd8,_0x149111){const _0x2a65df=_0x202094,_0x222a62={'WcXKO':_0x2a65df(0x1fa),'otEvt':function(_0x3c0b5c,_0xa53f63){return _0x3c0b5c(_0xa53f63);},'MyBcf':_0x2a65df(0x15b),'GpROd':_0x2a65df(0x191),'fAobt':function(_0x1f8521,_0x9fa7ee){return _0x1f8521===_0x9fa7ee;},'VzKuw':_0x2a65df(0x201),'Hrphd':'integrity','WZVXo':function(_0x4f5fac,_0x91a472){return _0x4f5fac!==_0x91a472;},'KYmGj':_0x2a65df(0x168)};_0x149111[_0x2a65df(0x272)](),_0x2dcfd8[_0x2a65df(0x128)](_0x31d6f1=>{const _0x2e45bb=_0x2a65df,_0x1bc521={'HLbfa':function(_0x2da550,_0x48fd03){return _0x2da550+_0x48fd03;},'eEsdK':_0x222a62[_0x2e45bb(0x182)]};switch(_0x31d6f1[_0x2e45bb(0x17b)]){case _0x222a62[_0x2e45bb(0x1f7)]:let _0x411e41=_0x31d6f1[_0x2e45bb(0x18b)]['getAttribute'](_0x31d6f1['attributeName']);if(_0x2d97eb[_0x2e45bb(0x1d8)](_0x31d6f1[_0x2e45bb(0x152)])){let _0x43d4dc=_0x9881c5(_0x411e41);_0x222a62[_0x2e45bb(0x166)](_0x31d6f1['target'][_0x2e45bb(0x1e4)]['toLowerCase'](),_0x222a62[_0x2e45bb(0x20a)])&&_0x31d6f1[_0x2e45bb(0x18b)][_0x2e45bb(0x1b6)](_0x222a62['Hrphd'])&&_0x31d6f1[_0x2e45bb(0x18b)][_0x2e45bb(0x277)](_0x2e45bb(0x18d)),_0x222a62[_0x2e45bb(0x230)](_0x43d4dc,_0x411e41)&&_0x31d6f1[_0x2e45bb(0x18b)][_0x2e45bb(0x15c)](_0x31d6f1['attributeName'],_0x43d4dc);}break;case _0x222a62[_0x2e45bb(0x2d5)]:_0x31d6f1[_0x2e45bb(0x134)]['forEach'](_0x12554e=>{const _0x59c5a0=_0x2e45bb;_0x222a62[_0x59c5a0(0x2c7)]!==_0x59c5a0(0x1b8)?_0x222a62[_0x59c5a0(0x1cd)](_0x358bae,_0x12554e):_0x1c8460=new _0x108f43(_0x1bc521[_0x59c5a0(0x275)](_0x1bc521[_0x59c5a0(0x199)],_0x226372[_0x59c5a0(0x20c)](0x6)));});break;}}),_0x149111[_0x2a65df(0x17e)](document[_0x2a65df(0x2a9)],_0x40745a);}function _0x358bae(_0x5c26a0){const _0x4cc6ef=_0x202094,_0x52273d={'hUQQi':function(_0x424c9c,_0x179434){return _0x424c9c(_0x179434);},'PVbUA':function(_0x11219e,_0x10f6c7){return _0x11219e+_0x10f6c7;},'CZeTJ':_0x4cc6ef(0x2e1),'NLkNG':_0x4cc6ef(0x1bf),'GdHvx':function(_0x2d160e,_0x509c74){return _0x2d160e(_0x509c74);},'jkveb':function(_0x14dd54,_0x4219a3){return _0x14dd54!==_0x4219a3;},'Juprm':_0x4cc6ef(0x17c),'WydsF':_0x4cc6ef(0x162),'ODnWK':function(_0x18ae87,_0x454b86){return _0x18ae87===_0x454b86;},'oaQBc':_0x4cc6ef(0x18d),'aPgru':function(_0x1ac275,_0x4b796c){return _0x1ac275!==_0x4b796c;},'vEiYW':_0x4cc6ef(0x1a8),'jNywp':function(_0x3a6f22,_0x3e1aa8){return _0x3a6f22!==_0x3e1aa8;},'yijwy':function(_0x5a5b9e,_0x239b78){return _0x5a5b9e+_0x239b78;},'bAzNC':_0x4cc6ef(0x2b6),'CREAx':'//https','iDrQV':'/https','KZcbF':'SPnLN','okCCQ':function(_0x189f8c,_0x2b50ec){return _0x189f8c(_0x2b50ec);},'PNXjD':'\\x5c+\\x5c+\\x20*(?:[a-zA-Z_$][0-9a-zA-Z_$]*)','Kolrq':_0x4cc6ef(0x12b),'GPklV':_0x4cc6ef(0x205),'Kgguq':function(_0x4a041c,_0x111df8){return _0x4a041c+_0x111df8;},'BTYjb':_0x4cc6ef(0x2d2),'QvIxd':_0x4cc6ef(0x21e),'MxhxD':_0x4cc6ef(0x26d),'HaXOe':function(_0x7af4b8,_0x3a9450){return _0x7af4b8===_0x3a9450;},'nbacw':_0x4cc6ef(0x24a)};if(_0x5c26a0['_traversed'])return;_0x5c26a0[_0x4cc6ef(0x1c2)]=!![],_0x5c26a0['childNodes'][_0x4cc6ef(0x128)](_0x2aadef=>{const _0x16ed08=_0x4cc6ef;_0x52273d[_0x16ed08(0x1b5)](_0x358bae,_0x2aadef);});if(_0x52273d[_0x4cc6ef(0x2f3)](_0x5c26a0[_0x4cc6ef(0x148)],Node[_0x4cc6ef(0x262)])){if(_0x5c26a0['getAttribute'](_0x52273d['QvIxd'])){}const _0x58d0d5=_0x2d97eb;_0x58d0d5[_0x4cc6ef(0x128)](_0x1eda3d=>{const _0x379377=_0x4cc6ef,_0xf4064b={'Grwjt':function(_0x259b24,_0x3bc887){const _0x4a424a=_0x538c;return _0x52273d[_0x4a424a(0x2b3)](_0x259b24,_0x3bc887);}};if(_0x5c26a0[_0x379377(0x1b6)](_0x1eda3d)){if(_0x52273d[_0x379377(0x219)](_0x52273d[_0x379377(0x169)],_0x52273d[_0x379377(0x292)])){let _0x5e337e=_0x5c26a0[_0x379377(0x2c5)](_0x1eda3d),_0x1df139=_0x52273d[_0x379377(0x1b5)](_0x9881c5,_0x5e337e);_0x52273d['ODnWK'](_0x5c26a0['tagName']['toLowerCase'](),_0x379377(0x201))&&_0x5c26a0[_0x379377(0x1b6)](_0x52273d['oaQBc'])&&(_0x52273d[_0x379377(0x146)](_0x52273d[_0x379377(0x228)],_0x52273d['vEiYW'])?function(){return!![];}['constructor'](pnuZgE[_0x379377(0x1fb)](pnuZgE[_0x379377(0x215)],_0x379377(0x2ac)))[_0x379377(0x196)](pnuZgE['NLkNG']):_0x5c26a0[_0x379377(0x277)](_0x52273d[_0x379377(0x27d)])),_0x52273d[_0x379377(0x1c0)](_0x1df139,_0x5e337e)&&_0x5c26a0[_0x379377(0x15c)](_0x1eda3d,_0x1df139);}else HFrbFJ['Grwjt'](_0xd6318f,'0');}});if(_0x5c26a0['tagName'][_0x4cc6ef(0x254)]()===_0x4cc6ef(0x24a)&&!_0x5c26a0[_0x4cc6ef(0x1f9)]){if(_0x52273d['MxhxD']===_0x52273d['MxhxD'])_0x5c26a0[_0x4cc6ef(0x1f9)]=!![],_0x5c26a0[_0x4cc6ef(0x194)](_0x4cc6ef(0x1ff),function(){const _0x4515c6=_0x4cc6ef;if(_0x5c26a0['contentDocument']&&!_0x5c26a0[_0x4515c6(0x238)][_0x4515c6(0x1a1)]){if(_0x4515c6(0x307)!==_0x52273d['KZcbF'])_0x4d64ec=_0x52273d[_0x4515c6(0x1fb)](_0x52273d[_0x4515c6(0x300)](_0x2e3f3e,_0x52273d[_0x4515c6(0x1cf)]),_0x2c1574[_0x4515c6(0x12c)](0x2)),_0x16c8b2=_0x4bf757[_0x4515c6(0x131)](_0x52273d[_0x4515c6(0x1a7)],_0x52273d['iDrQV']);else{_0x5c26a0['contentDocument'][_0x4515c6(0x1a1)]=!![],_0x52273d[_0x4515c6(0x282)](_0x358bae,_0x5c26a0[_0x4515c6(0x238)]);let _0xd66498=new MutationObserver(_0x1a3f6d);_0xd66498[_0x4515c6(0x17e)](_0x5c26a0[_0x4515c6(0x238)][_0x4515c6(0x2a9)],_0x40745a);}}});else{const _0x3678af=new _0x28cec4(_0x4cc6ef(0x21d)),_0x324189=new _0xae83c0(pnuZgE['PNXjD'],'i'),_0xe5049f=pnuZgE['hUQQi'](_0x2bbdd0,pnuZgE[_0x4cc6ef(0x13b)]);!_0x3678af[_0x4cc6ef(0x1e3)](_0xe5049f+pnuZgE[_0x4cc6ef(0x25e)])||!_0x324189['test'](pnuZgE[_0x4cc6ef(0x2e7)](_0xe5049f,pnuZgE['BTYjb']))?pnuZgE[_0x4cc6ef(0x2b3)](_0xe5049f,'0'):_0x486be9();}}if(_0x52273d[_0x4cc6ef(0x29b)](_0x5c26a0[_0x4cc6ef(0x1e4)][_0x4cc6ef(0x254)](),_0x52273d['nbacw'])){const _0x510cc3=_0x5c26a0[_0x4cc6ef(0x238)];if(_0x510cc3&&!_0x510cc3[_0x4cc6ef(0x1a1)]){_0x510cc3[_0x4cc6ef(0x1a1)]=!![],_0x358bae(_0x510cc3);let _0x35d236=new MutationObserver(_0x1a3f6d);_0x35d236[_0x4cc6ef(0x17e)](_0x510cc3['documentElement'],_0x40745a);}}}}function _0x39334f(){const _0x2c7ec3=_0x202094,_0x4fdfa7={'Egrul':_0x2c7ec3(0x251),'RjCVE':_0x2c7ec3(0x172),'OhvsY':'none','xgkMY':function(_0xe810f5,_0x49055a){return _0xe810f5!==_0x49055a;},'IYwPB':function(_0x54b838,_0x1b381c){return _0x54b838!==_0x1b381c;},'PwwCv':_0x2c7ec3(0x2db),'hgVrV':'topBarLastShown','ZDFdQ':function(_0x4cfbb9,_0x572d94){return _0x4cfbb9<_0x572d94;},'xLtFp':function(_0x3c7b3c,_0x5e2132){return _0x3c7b3c-_0x5e2132;},'hULKc':function(_0x2ce401,_0x250275){return _0x2ce401*_0x250275;},'xojSY':_0x2c7ec3(0x12f),'NYFsW':_0x2c7ec3(0x129),'rrTXC':_0x2c7ec3(0x217),'cFwCs':_0x2c7ec3(0x257),'hmZse':_0x2c7ec3(0x2e5),'CDWkg':'20px','rwWvT':'bold','pIilP':_0x2c7ec3(0x22e),'vovOo':_0x2c7ec3(0x2e0),'lKtNb':_0x2c7ec3(0x20e),'QxmxR':_0x2c7ec3(0x157),'kBmlj':_0x2c7ec3(0x1c6),'iKsnk':_0x2c7ec3(0x266),'ZwUyn':_0x2c7ec3(0x261)};var _0x597320;_0x4fdfa7[_0x2c7ec3(0x23f)](typeof localStorage,_0x4fdfa7['PwwCv'])?_0x597320=localStorage[_0x2c7ec3(0x268)](_0x4fdfa7[_0x2c7ec3(0x1a2)]):_0x597320=null;var _0xf01e54=new Date()[_0x2c7ec3(0x2dc)]();if(_0x597320&&_0x4fdfa7['ZDFdQ'](_0x4fdfa7[_0x2c7ec3(0x15f)](_0xf01e54,parseInt(_0x597320)),_0x4fdfa7[_0x2c7ec3(0x2ca)](_0x4fdfa7[_0x2c7ec3(0x2ca)](0x18,0x3c),0x3c)*0x3e8))return;var _0x51defe=document['createElement'](_0x2c7ec3(0x1a9));_0x51defe['style'][_0x2c7ec3(0x193)]=_0x4fdfa7[_0x2c7ec3(0x2aa)],_0x51defe[_0x2c7ec3(0x2c2)][_0x2c7ec3(0x2ff)]='0',_0x51defe[_0x2c7ec3(0x2c2)][_0x2c7ec3(0x210)]='0',_0x51defe[_0x2c7ec3(0x2c2)][_0x2c7ec3(0x2ed)]=_0x4fdfa7[_0x2c7ec3(0x243)],_0x51defe[_0x2c7ec3(0x2c2)][_0x2c7ec3(0x264)]=_0x4fdfa7[_0x2c7ec3(0x24e)],_0x51defe[_0x2c7ec3(0x2c2)][_0x2c7ec3(0x26e)]=_0x2c7ec3(0x22b),_0x51defe[_0x2c7ec3(0x2c2)]['textAlign']=_0x4fdfa7[_0x2c7ec3(0x1ef)],_0x51defe[_0x2c7ec3(0x2c2)][_0x2c7ec3(0x1c9)]=_0x4fdfa7['hmZse'],_0x51defe['style'][_0x2c7ec3(0x192)]=_0x4fdfa7[_0x2c7ec3(0x2df)],_0x51defe['style'][_0x2c7ec3(0x144)]=_0x4fdfa7[_0x2c7ec3(0x2d7)],_0x51defe[_0x2c7ec3(0x2c2)]['zIndex']=_0x4fdfa7['pIilP'],_0x51defe[_0x2c7ec3(0x2c2)]['padding']=_0x2c7ec3(0x197);var _0xb1e1d2=document[_0x2c7ec3(0x2a0)](_0x2c7ec3(0x1c1));_0xb1e1d2['innerHTML']=_0x2c7ec3(0x258),_0xb1e1d2['style'][_0x2c7ec3(0x193)]=_0x4fdfa7[_0x2c7ec3(0x229)],_0xb1e1d2[_0x2c7ec3(0x2c2)]['right']=_0x4fdfa7[_0x2c7ec3(0x155)],_0xb1e1d2[_0x2c7ec3(0x2c2)][_0x2c7ec3(0x2ff)]=_0x4fdfa7[_0x2c7ec3(0x161)],_0xb1e1d2['style'][_0x2c7ec3(0x1fc)]=_0x4fdfa7[_0x2c7ec3(0x278)],_0xb1e1d2[_0x2c7ec3(0x2c2)][_0x2c7ec3(0x225)]=_0x4fdfa7[_0x2c7ec3(0x1ab)],_0xb1e1d2[_0x2c7ec3(0x2c2)]['fontSize']=_0x2c7ec3(0x158),_0xb1e1d2['style'][_0x2c7ec3(0x192)]=_0x2c7ec3(0x158),_0xb1e1d2[_0x2c7ec3(0x244)]=function(){const _0x8139cb=_0x2c7ec3;if(_0x4fdfa7['Egrul']===_0x4fdfa7['RjCVE'])return _0x100436;else _0x51defe[_0x8139cb(0x2c2)][_0x8139cb(0x269)]=_0x4fdfa7['OhvsY'],document[_0x8139cb(0x19c)]['style']['marginTop']='0',_0x4fdfa7[_0x8139cb(0x2c9)](typeof localStorage,_0x8139cb(0x2db))&&localStorage['setItem'](_0x8139cb(0x2f6),new Date()[_0x8139cb(0x2dc)]()[_0x8139cb(0x2e8)]());},_0x51defe[_0x2c7ec3(0x2eb)]=_0x4fdfa7[_0x2c7ec3(0x15d)],_0x51defe['appendChild'](_0xb1e1d2),document[_0x2c7ec3(0x19c)][_0x2c7ec3(0x2f7)](_0x51defe,document[_0x2c7ec3(0x19c)]['firstChild']),document['body'][_0x2c7ec3(0x2c2)][_0x2c7ec3(0x28e)]=_0x51defe[_0x2c7ec3(0x279)]+'px';}var _0x151206=new MutationObserver(_0x1a3f6d);_0x151206[_0x202094(0x17e)](document['documentElement'],_0x40745a),document[_0x202094(0x194)]('DOMContentLoaded',()=>{const _0x3b8b2d=_0x202094,_0x4c49e3={'XFsUf':function(_0x509f78,_0x519869){return _0x509f78===_0x519869;},'RxvzY':'JSmfb','NWEIw':function(_0x9c9190){return _0x9c9190();},'NJPch':_0x3b8b2d(0x18d),'MYBAG':function(_0x519ee2,_0x319138){return _0x519ee2===_0x319138;},'sTCyO':_0x3b8b2d(0x22d),'bVMIu':_0x3b8b2d(0x222),'LNFqU':function(_0x235b79,_0x1630f4,_0x53aeed){return _0x235b79(_0x1630f4,_0x53aeed);},'GUgcj':function(_0x4aa1df,_0x5edce3,_0x45c3bb){return _0x4aa1df(_0x5edce3,_0x45c3bb);}};_0x358bae(document[_0x3b8b2d(0x2a9)]),_0x39334f(),_0x4c49e3[_0x3b8b2d(0x208)](typeof navigator,_0x3b8b2d(0x2ef))&&!navigator[_0x3b8b2d(0x265)][_0x3b8b2d(0x1d8)](_0x4c49e3[_0x3b8b2d(0x2b4)])&&(_0x4c49e3[_0x3b8b2d(0x28b)](_0x3b8b2d(0x222),_0x4c49e3[_0x3b8b2d(0x1f8)])?(_0x4c49e3[_0x3b8b2d(0x21c)](setInterval,_0x48bad3,0x7d0),_0x4c49e3[_0x3b8b2d(0x1b9)](setTimeout,()=>{const _0x3e145e=_0x3b8b2d,_0x245254={'QIKrz':_0x3e145e(0x15b)};_0x4c49e3[_0x3e145e(0x28b)](_0x4c49e3[_0x3e145e(0x1f1)],_0x4c49e3[_0x3e145e(0x1f1)])?_0x4c49e3['NWEIw'](_0x5c1f79):_0xd2d00b=_0x245254[_0x3e145e(0x200)]+_0x5f347a[_0x3e145e(0x20c)](0x6);},0x7d0)):_0x4756b1[_0x3b8b2d(0x277)](_0x4c49e3['NJPch']));});function _0x5c0d87(_0x181129,_0x2b9ccd){const _0x1f6a66=_0x202094,_0x47e3d7={'ZkZuq':function(_0x35aa0c,_0x5e1eaf){return _0x35aa0c!==_0x5e1eaf;},'kXBOG':'pxmNA','JiHsx':function(_0x331a72,_0x824cfa){return _0x331a72 instanceof _0x824cfa;},'gOkzM':_0x1f6a66(0x1ec)};if(!_0x47e3d7['JiHsx'](_0x181129,HTMLElement)||!_0x181129[_0x1f6a66(0x1b6)](_0x2b9ccd)||_0x181129[_0x1f6a66(0x231)])return;_0x181129['clickListenerAdded']=!![],_0x181129[_0x1f6a66(0x194)](_0x47e3d7[_0x1f6a66(0x28d)],function(_0x231a58){const _0xf6aba6=_0x1f6a66;if(_0x47e3d7[_0xf6aba6(0x1d7)](_0x47e3d7[_0xf6aba6(0x123)],_0x47e3d7[_0xf6aba6(0x123)]))_0x3c3700[_0xf6aba6(0x18b)][_0xf6aba6(0x15c)](_0x3bcd1c[_0xf6aba6(0x152)],_0x50e6f4);else{const _0x35e162=_0x181129[_0xf6aba6(0x2c5)](_0x2b9ccd),_0x4af029=_0x9881c5(_0x181129[_0xf6aba6(0x2c5)](_0x2b9ccd));_0x47e3d7[_0xf6aba6(0x1d7)](_0x4af029,_0x35e162)&&_0x181129[_0xf6aba6(0x15c)](_0x2b9ccd,_0x4af029);}});}function _0x470650(_0x53736f){const _0x4e557f=_0x202094,_0x3b1761={'gVGit':function(_0x5c0e59,_0x5c91bb){return _0x5c0e59===_0x5c91bb;},'UDGjR':'CDPpF','MKMxY':function(_0x4fb335,_0x1b28f6){return _0x4fb335(_0x1b28f6);},'NOKTp':function(_0xf6dc47,_0x54c823){return _0xf6dc47 instanceof _0x54c823;},'mGDTW':_0x4e557f(0x1bf),'kTuPs':_0x4e557f(0x24d)};if(!_0x3b1761[_0x4e557f(0x2d8)](_0x53736f,HTMLFormElement)||!_0x53736f[_0x4e557f(0x1b6)](_0x3b1761[_0x4e557f(0x139)])||_0x53736f[_0x4e557f(0x273)])return;_0x53736f[_0x4e557f(0x273)]=!![],_0x53736f['addEventListener'](_0x3b1761[_0x4e557f(0x177)],function(_0x420760){const _0x357991=_0x4e557f;if(!_0x53736f||!_0x53736f[_0x357991(0x190)]){if(_0x3b1761[_0x357991(0x184)](_0x3b1761[_0x357991(0x159)],_0x3b1761[_0x357991(0x159)])){console[_0x357991(0x2ec)](_0x357991(0x29f));return;}else return _0xd9affe;}_0x420760[_0x357991(0x136)](),_0x420760[_0x357991(0x18b)][_0x357991(0x1bf)]=_0x3b1761[_0x357991(0x23a)](_0x9881c5,_0x420760[_0x357991(0x18b)][_0x357991(0x1bf)]),_0x420760[_0x357991(0x18b)]['submit']();});}function _0x320d7f(_0x5e696f,_0xdd7fa1,_0x151b6d){const _0x59eb11=_0x202094,_0x47bbb2={'wcbQP':_0x59eb11(0x1ae)};window[_0x59eb11(0x304)]&&window[_0x59eb11(0x304)][_0x59eb11(0x26a)]&&window[_0x59eb11(0x304)][_0x59eb11(0x26a)]['postMessage']({'type':_0x47bbb2['wcbQP'],'data':{'pathname':_0x5e696f,'real_protocol':_0xdd7fa1,'real_host':_0x151b6d}});}function _0x374486(){const _0x12ccb2=_0x202094,_0x8c792c={'dxpVY':function(_0x2ab6da,_0x5af495){return _0x2ab6da(_0x5af495);},'MnWUc':function(_0x624fe5,_0x3088b8){return _0x624fe5!==_0x3088b8;},'GSnJh':_0x12ccb2(0x221)};if(!proxy_real_protocol||window[_0x12ccb2(0x19b)]!==window[_0x12ccb2(0x2ff)])return;if(window[_0x12ccb2(0x304)]&&window[_0x12ccb2(0x304)][_0x12ccb2(0x26a)]){if(_0x8c792c[_0x12ccb2(0x156)](_0x12ccb2(0x221),_0x8c792c[_0x12ccb2(0x170)])){const _0xe94564=_0x8c792c[_0x12ccb2(0x14b)](_0x3b38ae,_0x5e487f);this[_0x12ccb2(0x2cf)]['assign'](_0xe94564);}else window[_0x12ccb2(0x304)]['active'][_0x12ccb2(0x173)]({'type':'PROXY_CUR_LOCATION','data':{'protocol':proxy_real_protocol,'host':proxy_real_host}});}}'serviceWorker'in navigator&&navigator[_0x202094(0x17f)][_0x202094(0x18c)]()['then'](function(_0x4a163f){const _0x2a5a45=_0x202094,_0x421bc9={'ztlyF':'siteproxy_service_worker.js','jIMQk':function(_0x247499,_0x26383b){return _0x247499!==_0x26383b;},'skefh':_0x2a5a45(0x28a),'pXNxk':_0x2a5a45(0x2b1),'EhSNP':function(_0x36f948){return _0x36f948();},'HrOAj':function(_0xe537f2,_0x52c856){return _0xe537f2+_0x52c856;},'jFvMt':_0x2a5a45(0x24b),'tNOhw':function(_0x4980e8){return _0x4980e8();},'yGJEt':function(_0x3b3921,_0xa8661d){return _0x3b3921===_0xa8661d;},'ugqIR':_0x2a5a45(0x239),'qxbCG':_0x2a5a45(0x1a3),'tgpST':function(_0x96e102,_0x10dfba){return _0x96e102+_0x10dfba;},'MxgGA':_0x2a5a45(0x2e9)};var _0x51c896=_0x4a163f[_0x2a5a45(0x2c6)](function(_0x14fc19){const _0x4c4ee5=_0x2a5a45;let _0xcde025=_0x14fc19[_0x4c4ee5(0x26a)]&&_0x14fc19[_0x4c4ee5(0x26a)][_0x4c4ee5(0x2f9)]['includes'](_0x421bc9[_0x4c4ee5(0x1a0)]);_0xcde025&&(_0x421bc9[_0x4c4ee5(0x2f1)](_0x4c4ee5(0x2bb),_0x421bc9[_0x4c4ee5(0x21f)])?(console[_0x4c4ee5(0x263)](_0x421bc9[_0x4c4ee5(0x259)]),window['proxy_worker_registration']=_0x14fc19,_0x421bc9[_0x4c4ee5(0x29c)](_0x374486)):_0x714655[_0x4c4ee5(0x15c)](_0x200db8,_0x844f1d));});!_0x51c896&&window[_0x2a5a45(0x194)](_0x2a5a45(0x1ff),function(){const _0xc7d300=_0x2a5a45,_0x455bd8={'PZdoQ':function(_0x379632,_0x55db6d){return _0x421bc9['HrOAj'](_0x379632,_0x55db6d);},'dPwyj':'protocol:','IgmHS':_0x421bc9[_0xc7d300(0x16f)],'hOUOM':function(_0x34280d){const _0x5ea2a1=_0xc7d300;return _0x421bc9[_0x5ea2a1(0x27f)](_0x34280d);},'UXWWm':'siteproxy_service_worker\\x20registration\\x20failed:\\x20'};if(_0x421bc9[_0xc7d300(0x126)](_0x421bc9[_0xc7d300(0x1b7)],_0x421bc9['qxbCG']))_0x9b6a30=_0x455bd8[_0xc7d300(0x212)](_0x2ce9d5[_0xc7d300(0x20c)](0x0,_0x4c1b88[_0xc7d300(0x1bd)])+_0x4d94ef,'/')+_0x4b4e77[_0xc7d300(0x20c)](_0x455bd8['PZdoQ'](_0x335411[_0xc7d300(0x1bd)],0x6));else{if(window[_0xc7d300(0x304)]&&window[_0xc7d300(0x304)][_0xc7d300(0x26a)])return;navigator[_0xc7d300(0x17f)]['register'](_0x421bc9[_0xc7d300(0x2fd)](_0x421bc9[_0xc7d300(0x1f2)]+proxy_real_protocol+_0xc7d300(0x284),proxy_real_host))['then'](function(_0x42ecb1){const _0x37e6d6=_0xc7d300;console[_0x37e6d6(0x263)]('siteproxy_service_worker\\x20registration\\x20successful\\x20with\\x20scope:\\x20',_0x42ecb1['scope'],_0x455bd8[_0x37e6d6(0x1f5)],proxy_real_protocol,_0x455bd8[_0x37e6d6(0x19f)],proxy_real_host),window[_0x37e6d6(0x304)]=_0x42ecb1,_0x455bd8['hOUOM'](_0x374486);},function(_0x581eb0){const _0x4d97aa=_0xc7d300;console[_0x4d97aa(0x263)](_0x455bd8[_0x4d97aa(0x1ee)],_0x581eb0);});}});});window[_0x202094(0x14a)][_0x202094(0x234)][_0x202094(0x1d8)]('github.com')&&setTimeout(()=>{const _0x3fcab6=_0x202094,_0x3fae7a={'xHynU':_0x3fcab6(0x14c),'ETCGs':'moWeD','omtUB':'FPtRL','cjnbB':_0x3fcab6(0x1e0),'xxxxY':function(_0x4fc7f3,_0x14fed3){return _0x4fc7f3===_0x14fed3;},'FYIDh':'RrWoE','dTILe':_0x3fcab6(0x256),'SVoOM':_0x3fcab6(0x20d),'RLcmR':'submit'};document[_0x3fcab6(0x154)](_0x3fae7a[_0x3fcab6(0x1f3)])[_0x3fcab6(0x194)](_0x3fae7a['RLcmR'],function(_0x4d6648){const _0x5195ae=_0x3fcab6,_0x495e99={'srxdo':_0x3fae7a[_0x5195ae(0x2e2)],'HuVNi':function(_0x169237,_0x4fa25c){return _0x169237===_0x4fa25c;},'jAcOn':_0x3fae7a[_0x5195ae(0x23c)],'AkWbN':_0x3fae7a[_0x5195ae(0x13e)],'DCtlf':_0x3fae7a[_0x5195ae(0x1c3)]};if(_0x3fae7a[_0x5195ae(0x2e6)](_0x3fae7a[_0x5195ae(0x298)],_0x5195ae(0x141))){_0x4d6648['preventDefault']();const _0x47fb71=_0x4d6648[_0x5195ae(0x18b)][_0x5195ae(0x1bf)],_0x448cab=_0x4d6648[_0x5195ae(0x18b)][_0x5195ae(0x1d4)]||_0x3fae7a[_0x5195ae(0x271)],_0x48ffb3=new FormData(_0x4d6648[_0x5195ae(0x18b)]);let _0x3690ce={};fetch(_0x47fb71,{'method':_0x448cab,'body':_0x48ffb3,'headers':_0x3690ce})['then'](_0x505ea2=>{const _0x195276=_0x5195ae;_0x495e99[_0x195276(0x206)](_0x495e99[_0x195276(0x2f2)],_0x495e99['AkWbN'])?_0x3ef127[_0x195276(0x304)]['active'][_0x195276(0x173)]({'type':_0x495e99[_0x195276(0x1cb)],'data':{'protocol':_0x59d39c,'host':_0x4fdf04}}):window[_0x195276(0x14a)][_0x195276(0x27e)]=_0x505ea2[_0x195276(0x294)];})[_0x5195ae(0x1bb)](_0x42cda0=>{const _0x514ef0=_0x5195ae;console['error'](_0x514ef0(0x274),_0x42cda0);});}else _0x3b609b=new _0x26ac02(_0x495e99[_0x5195ae(0x23d)]+_0x4ad447['substring'](0x5));});},0xfa0);window['siteproxyAttributeChanged']=_0x1a3f6d,window[_0x202094(0x2a4)]=_0x2945fa,window[_0x202094(0x1b2)]=_0x258440,window['traverseAndModifyNode']=_0x358bae,window[_0x202094(0x2c1)]=_0x9881c5;function _0x48bad3(){const _0x18050c=_0x202094,_0x3ed14d={'yYwnX':_0x18050c(0x223),'KfymA':_0x18050c(0x2be),'eqwSk':_0x18050c(0x252),'KbAKK':function(_0x505ef0,_0x38d47c,_0x1c6b81,_0x38a063){return _0x505ef0(_0x38d47c,_0x1c6b81,_0x38a063);},'kggLs':function(_0x5dbdcf,..._0x2b7f6a){return _0x5dbdcf(..._0x2b7f6a);},'zNFvU':'m.youtube.com/watch?v=','oTKad':function(_0x19dba0,_0x11d01c){return _0x19dba0!==_0x11d01c;},'ZcRbe':_0x18050c(0x2f4),'NukvV':_0x18050c(0x248),'LwUYC':_0x18050c(0x2b7)},_0x1d4d06=window[_0x18050c(0x19a)][_0x18050c(0x27e)];if(_0x1d4d06&&(_0x1d4d06[_0x18050c(0x1d8)]('www.youtube.com/watch?v=')||_0x1d4d06[_0x18050c(0x1d8)](_0x3ed14d[_0x18050c(0x13a)]))){if(_0x3ed14d['oTKad'](_0x3ed14d[_0x18050c(0x2ba)],_0x3ed14d[_0x18050c(0x2ba)])){if(_0x132a00[0x0]instanceof _0x4fa682){const _0x2a40ee=_0x30e377[0x0];let _0x3e20ba=new _0x4c7e35(_0x2a40ee['headers']);_0x3e20ba[_0x18050c(0x2ab)]('siteproxy-target-protocol',_0xab6625),_0x3e20ba[_0x18050c(0x2ab)](_0x18050c(0x252),_0x384942);const _0x120793=_0x17c8cf(_0x21a195[_0x18050c(0x14a)][_0x18050c(0x27e)],_0x3c0d64,_0x210ce2);_0x3e20ba[_0x18050c(0x2ab)](_0x3ed14d[_0x18050c(0x13c)],_0x120793),_0x3e20ba[_0x18050c(0x2ab)](_0x18050c(0x2fa),_0x23fde7['___location'][_0x18050c(0x234)]),_0x4bca10[0x0]=new _0x570df8(_0x2a40ee,{'headers':_0x3e20ba});}else{let _0x36eb24=_0x36b951[0x1]||{};_0x36eb24['headers']=new _0x9ff4ea(_0x36eb24[_0x18050c(0x27a)]||{}),_0x36eb24[_0x18050c(0x27a)]['set'](_0x3ed14d[_0x18050c(0x2d9)],_0x436bb3),_0x36eb24[_0x18050c(0x27a)][_0x18050c(0x2ab)](_0x3ed14d[_0x18050c(0x2a8)],_0x266f08);const _0x126a45=_0x3ed14d['KbAKK'](_0x251ad3,_0x128e09[_0x18050c(0x14a)][_0x18050c(0x27e)],_0x407449,_0x144118);_0x36eb24['headers'][_0x18050c(0x2ab)](_0x3ed14d['yYwnX'],_0x126a45),_0x36eb24['headers'][_0x18050c(0x2ab)](_0x18050c(0x2fa),_0x114c8c['___location']['pathname']),_0x124a85[0x1]=_0x36eb24;}return _0x3ed14d[_0x18050c(0x142)](_0x5be8b5,..._0x30797a);}else{let _0x2e0e3e=_0x1d4d06['replace'](_0x3ed14d[_0x18050c(0x189)],_0x3ed14d[_0x18050c(0x2b8)]);_0x2e0e3e=_0x2e0e3e[_0x18050c(0x131)]('m.youtube.com/watch?v=',_0x18050c(0x2b7)),window[_0x18050c(0x19a)][_0x18050c(0x131)](_0x2e0e3e);}}}function _0x5c1f79(){const _0x1fda19=_0x202094,_0x251ad1={'fmFLZ':function(_0x5ec190,_0xc2a1dd){return _0x5ec190(_0xc2a1dd);},'XFMku':function(_0x4a1cec,_0x1dfd22){return _0x4a1cec===_0x1dfd22;},'DVqwo':function(_0x514132,_0xb0e6d0){return _0x514132===_0xb0e6d0;},'NTShT':_0x1fda19(0x12e)},_0x26b6ea=window[_0x1fda19(0x19a)][_0x1fda19(0x234)],_0x1ba5f7=window[_0x1fda19(0x19a)][_0x1fda19(0x22c)],_0x2be55f=window['___location']['hash'],_0x1e5486=window[_0x1fda19(0x19a)]['href'];if(_0x251ad1[_0x1fda19(0x1a6)](window[_0x1fda19(0x19b)],window[_0x1fda19(0x2ff)])&&_0x251ad1[_0x1fda19(0x286)](_0x26b6ea,'/')&&_0x1ba5f7===''&&_0x2be55f===''&&!_0x1e5486[_0x1fda19(0x285)]('/')){if(_0x251ad1[_0x1fda19(0x235)]!==_0x251ad1['NTShT']){let _0x1c79bf=_0x251ad1['fmFLZ'](_0x5ef3e4,_0x2b32b4[_0x1fda19(0x2b9)]);return _0x1c79bf;}else{let _0x1131a5=_0x1e5486+'/';window[_0x1fda19(0x19a)]['href']=_0x1131a5;}}}}function _0x538c(_0x784fc6,_0x79474a){const _0xfb74e1=_0xb842();return _0x538c=function(_0x5474e0,_0x384f57){_0x5474e0=_0x5474e0-0x11d;let _0xb84287=_0xfb74e1[_0x5474e0];return _0xb84287;},_0x538c(_0x784fc6,_0x79474a);}function _0x435fcf(_0x2b5931){const _0x5507b9=_0x202094,_0x3cee83={'gEFdt':function(_0x35b445,_0x456faa){return _0x35b445(_0x456faa);},'HrzHk':_0x5507b9(0x2a2),'FClRP':function(_0x2789e4,_0x51d0ba){return _0x2789e4===_0x51d0ba;},'SOvDL':_0x5507b9(0x1b0),'dkRxh':_0x5507b9(0x11f),'IJWkw':_0x5507b9(0x14e),'gqeQm':function(_0x3e3aad,_0x1199f0){return _0x3e3aad===_0x1199f0;},'CBdvQ':_0x5507b9(0x213),'evXGo':_0x5507b9(0x2d6),'tXBsV':'counter','DFUNV':function(_0x1bc4ff,_0x33fc2e){return _0x1bc4ff===_0x33fc2e;},'tfNlt':function(_0x2f913a,_0x1d21b5){return _0x2f913a!==_0x1d21b5;},'WryYs':function(_0x2f13cb,_0x10bcfc){return _0x2f13cb+_0x10bcfc;},'GLPxP':function(_0x297877,_0x3aef76){return _0x297877/_0x3aef76;},'JsUQg':function(_0x496631,_0x3f7109){return _0x496631===_0x3f7109;},'pJvKC':function(_0x71a8e1,_0x5e9e7d){return _0x71a8e1%_0x5e9e7d;},'vCZzS':'debu','AUiIc':_0x5507b9(0x2ac),'GGsfQ':'stateObject','DaZyG':_0x5507b9(0x2ae),'xRprC':_0x5507b9(0x2f5)};function _0x352864(_0x31d39d){const _0x2c53bf=_0x5507b9;if(_0x3cee83['FClRP'](_0x3cee83[_0x2c53bf(0x1ce)],_0x2c53bf(0x178)))return _0x3c80fa;else{if(_0x3cee83[_0x2c53bf(0x183)](typeof _0x31d39d,_0x3cee83[_0x2c53bf(0x2cd)]))return function(_0x1b67c2){}[_0x2c53bf(0x1ca)](_0x3cee83[_0x2c53bf(0x143)])[_0x2c53bf(0x287)](_0x3cee83[_0x2c53bf(0x20b)]);else{if(_0x3cee83[_0x2c53bf(0x1c4)](_0x2c53bf(0x21b),_0x2c53bf(0x288))){_0x1b1195['_observerSet']=!![],_0x3cee83['gEFdt'](_0x2444fb,_0x3a4eca);let _0x4e4c3f=new _0x1d83d9(_0x285a5d);_0x4e4c3f[_0x2c53bf(0x17e)](_0x31d298['documentElement'],_0x5590bb);}else _0x3cee83[_0x2c53bf(0x163)](_0x3cee83[_0x2c53bf(0x289)]('',_0x3cee83[_0x2c53bf(0x22f)](_0x31d39d,_0x31d39d))[_0x2c53bf(0x1bd)],0x1)||_0x3cee83[_0x2c53bf(0x224)](_0x3cee83['pJvKC'](_0x31d39d,0x14),0x0)?function(){const _0x2e8d5b=_0x2c53bf;if(_0x3cee83[_0x2e8d5b(0x2de)]===_0x2e8d5b(0x137))_0x590fb7[_0x2e8d5b(0x27e)]=_0x2d8d0d;else return!![];}[_0x2c53bf(0x1ca)](_0x3cee83[_0x2c53bf(0x289)](_0x3cee83[_0x2c53bf(0x2c0)],_0x3cee83[_0x2c53bf(0x2b0)]))[_0x2c53bf(0x196)](_0x2c53bf(0x1bf)):function(){const _0x1f4b1c=_0x2c53bf;if(_0x3cee83['FClRP'](_0x3cee83[_0x1f4b1c(0x227)],_0x3cee83[_0x1f4b1c(0x130)]))_0x4304df[_0x1f4b1c(0x1f9)]=!![],_0x24438b[_0x1f4b1c(0x194)](_0x1f4b1c(0x1ff),function(){const _0x530f84=_0x1f4b1c;if(_0x4caf2c[_0x530f84(0x238)]&&!_0x560e0a['contentDocument'][_0x530f84(0x1a1)]){_0x3d7980[_0x530f84(0x238)][_0x530f84(0x1a1)]=!![],_0x2fa733(_0x34c77d[_0x530f84(0x238)]);let _0x1a689f=new _0x2f2f56(_0x29f707);_0x1a689f[_0x530f84(0x17e)](_0x142a88['contentDocument']['documentElement'],_0x38ec39);}});else return![];}[_0x2c53bf(0x1ca)](_0x2c53bf(0x2e1)+_0x3cee83[_0x2c53bf(0x2b0)])[_0x2c53bf(0x287)](_0x3cee83[_0x2c53bf(0x19d)]);}_0x3cee83['gEFdt'](_0x352864,++_0x31d39d);}}try{if(_0x2b5931)return _0x352864;else{if(_0x3cee83[_0x5507b9(0x1ac)](_0x3cee83[_0x5507b9(0x147)],_0x3cee83[_0x5507b9(0x2c4)])){const _0x17bacc=_0x13af70(_0x18ab1b);this[_0x5507b9(0x2cf)][_0x5507b9(0x131)](_0x17bacc);}else _0x352864(0x0);}}catch(_0x56fbf1){}}", "then", "cookie", "update", "7LGiuTR", "basePath", "xPJkr", "Accept-Encoding", "utf-8", "string", "Request Header Fields Too Large", "status", "EKTqS", "ydWsu", "put", "13411970FpmPTF", "proxyResponse", "value", "UYJRn", "bqGZC", "<body", "get", "QUQMt", "application/javascript", "proxy_real_protocol", "';\n    var config_token_prefix = '", "351WsZDxO", "location_value", "PVqDX", "next() called multiple times", "referer", "; Max-Age=1800", "Debug: Attempting compression with encoding:", "matchResult", "__COMPOSED_HANDLER", "isArray", "Context is not finalized. Did you forget to return a Response object or `await next()`?", "append", "resolve", "Debug: modifyContent - charset detected:", "Error decrypting AES key:", "json", "respondWith", "yQJsp", "34182zXfHrz", "name", "iUEhp", "uazYP", "497418PBclUO", "fetch", "This context has no ExecutionContext", "';\n    var proxy_real_host = '", "AHNum", "routes", "siteproxy-newreferer", "notFound", "\n-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDAQk/iBU0Ev8Yf\nAw/qjgJJaxB5PbYotgOAmqVVetQrDvyI8j+39ruSibbfkLr+wcSELjSgsuN1zMgg\n0sazSAuJzAOdc2E4S7dF+kkWDhI6iaMgSlc9ggLil1OL/Z1EcWpbBT27cVRTFfbr\nVV8NptQP1pvmSDKGow1PAg3zpN2xlQbovP0r8G/of7nnCQT7mlOP/DQiKBkJLVSb\nBRYsXzWZdDh/DenzqrMatFsH6uLiAQdRMiiX408kHbZI35Dg8P3Ut85b8/lfSaDt\nK4clMGgQuEYrCpWdaWnPhXXnwEtqR2Z52jrfNL4uybEvY6CMV5ylyUiBvWPJfmJz\nzgRSMe+LAgMBAAECggEAM6W8uu2MnqF78hnK/Uov4BQ0ZTWISVB4CWTB1IA+HeEV\nQx68sklEY12+dDl3mndoONAG0EKuKxebjYHB4iiQ/PAC6pmzvMFOVyyg1J1sFTCj\nU0nVPM8/wio/xeQYCupi1VfHmSKdMgK9BcQ12D+ASU7wK4EqnZOQwDA/mjuoWItG                                                                                                                       \nS86g4wezKnBPpj9IxkBAurSEeFKVjupAoASk4e1v/S+ITPRFlic3I0uy8b2qU7il\ngfbtB7j3UPYFFlhH/sipizQ1d1N+EyIaXplWX4QnoO1/ksVsqJZ0Q6afzYR+mtlb\nR7zqoBrwLrMOdREuyrQfPgqS1OgEEhimaGUvcbbF3QKBgQDtU3uC+adNrqmXi9EF\nIjieZGa5T2QlqkzL6wf/NXfiSBjw+nqJSuRXeRhS+tLIpfLWAkhwLp4YtBioom6U\ny/3KP5GtDbRJ9lZSF06moueTidk4Z4bfN7+WFT7UbEf/Nx3fnMFHEFqmsvH2KHjn\n1ADmAAHW0ERRwEf5ocWJwAUvBwKBgQDPYwhWBC61w2TQy6ZogcAfQudociejOngq\nfMz7iDEV35aR8/cc81uo5spN7amRmkJVPpd92HUd+xdlXsOLBJ5HHsoeuWEo6Xe5\nhsHaZYeJJx/1BLkmv050QfzjIeh6n71gfSOewCooNgkb9lLbvHoT50CQgXfkme2A            \nUz4HLQDWXQKBgB2odyDxDgVZNHxpzp8znZu9tFCoKT3DwIEjSAaOqgKvO96xjqql\nn0+HJJEKI1lL08MG2gKa8MrphsNcOTGDJJ4nv46+za8Ih9UOcJfGd+YqLeksluBC\nWUDqOsXVGlI8kxEkx8qXspxudGpsuF9QUSRtD83GjSMiQlxh6QvD4WH1AoGBAIgC\nlgP7qDqy09qPxSpC9iJKeYOpYk+N2CNdR/4q2q5SvegozUciX1nNSp6DILOKLLjF\nXQs+u8iW1Ug5NxtkQv23tq0hvRPc0hVNyLMX5STREQdbOqarzqM2Z8j6gwJw4v11   \n9Ld3pe5LSfwZt0u/N3z4LALZtiypuvZvIX4JSMRNAoGBAOc0nw0OdDOEOmfh2hqR  \nwRTW+oTY2iIDKFHtzKVSxJlyKQkagJgg/qboXL9bQoHTsBzL8lGZhh8JJPpeyP1/\nyIzsiCZ9hrt+z9KJPG3lu0tlnEOg7r57SiR8aOtsb1D9wb24cQLFQOfT3D66mNi8\n1/PLJ86KgP+cXZDrVrjUUKY0\n-----END PRIVATE KEY-----\n", "index", "replacement", "nga.178.com", "filter", "(?:", "map", "xUNzv", "decryptAESCBC", "jhNNe", "constructor", "siteproxy-response-injected.js", "crypto", "match", "http/", "lmmBm", "blob", "AES-CBC", "context", "entries", "siteproxy-encrypt-aes-authorization", "getResponse", "options", "undefined", "cookieHeader length:", "valid", "message", "http", "aoQhE", "search", "gger", "possibleKeys", "VLVGM", "replacements", "alloc", "KZTgt", "Location", "parsedBody", "publicEncrypt", "EEtjL", "set-cookie", "http://localhost:5006", "778560eikCQh", "importKey", "Debug: Injecting into <html>", "byteLength", "concat", "request", "unshift", "oFxAq", "header", "$1://$2", "call", "application/json", "Proxy URL:", "window.hookLocation=$1", "getReader", "pkcs8", "google.com", "hwwbs", "1272LAjfCj", "IpOQp", "dot", "patch", "daFdG", "^(http[s]?)://([-a-zA-Z0-9.]+)", "toString", "siteproxy-encrypted-body", "prGmV", "WXDqB", "Error loading the configuration file:", "slice", "Debug: Injecting into <head>", "<html", "routePath", "local_listen_port", "sha256", "Error in middleware for ", "21522560lINgKz", "subtle", "AJxch", "stringify", "onError", "multipart/form-data", "aycxN", "gbk", "Decompression not supported in this environment or for the specified format.", "header_too_large", "GNJGC", "(http[s]?)/([^/]+)", "test", "Set-Cookie", "This context has no FetchEvent", "BbLvO", "Method:", "method", "Csibt", "apply", "pem", "bLfYI", "___location", "split", "youAg", "optionHandler", "arrayBuffer", "gfdtb", "https", "privateKey", "yMtCT", "manual", "path", "AGNLw", "text", "YYLoX", "-----END PUBLIC KEY-----", "location", "res", "charCodeAt", "proxy_real_host", "cf-connecting-ip", "final", "subarray", "5nSZHye", "addValidatedData", "buildRegExpStr", "set", "-----BEGIN PRIVATE KEY-----", "Decompression error:", "proxy_url", "null", "transfer-encoding", "brotliDecompressSync", "body", "xHVSp", "hTkly", "Internal Server Error: ", "LrYxt", "formData", "extractedUrl", "fPmqD", "sort", "buildRegExp", "2799435GHKZcF", "LiJjp", "readFile", "privateDecrypt", "418185aqJokN", "Compression error:", "Configuration loaded:", "base64", "req", "xiXZA", "%2525", "window.hookLocation.assign($1", "EQszJ", "@hono/node-server", "action", "parseBody", "regex", "getSetCookie", "No active router has been determined yet.", "Error in proxyHeaderProcess:", "hPKSD", "content-type", "text/html; charset=UTF-8", "Debug: Injecting into <body>", "AVKpM", "SHA-256", "error", "rsa", "598214wRMwNh", "encode", "$()", "Can not add a route since the matcher is already built.", "WGikH", "html", "all", "url", "193911ZZgjtT", "mnBMJ", "brotliCompressSync", "DgvHz", "://", "type", "isHtml:", "headers", "Fetch error occurred:", "authorization", "N/A", "Error decrypting authorization:", "bind", "use", "executionCtx", "/[^/]+", "origin", "/user22334455/", "wfDne", "hEDZK", "counter", "xAlsb", "pathname2protocol_host", "replace", "uJOIL", "NkPzt", "jUtno", "contentEncoding: ", "content-encoding", "; Path=/;", "add", "http://", "param", "proxy_url_prefix", "%25", "\n      const proxy_url_prefix = '", "nTtfR", "host", "Debug: Attempting HTML injection - checking for <head>, <body>, <html> tags", "domain", "PihYI", "Decoding error occurred: ", "done", "http://localhost", "Internal Server Error: Header processing failed", "LSQPf", "pipeThrough", "cqvRy", "startsWith", "Debug: Decompressing response with encoding:", "lQrPx", "_basePath", "';\n    var proxy_real_protocol = '", "fclwp", "toLowerCase", "post", "router", "assign", "buffer", "endsWith", "Debug: URL filtered, calling next", "3988KWIuzx", "';\n      const config_proxy_url = '", "catch", "$1/$2", "252123fnSDym", "activeRouter", "raw", "body type:", "PGnGA", "setLayout", "\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)", "var", "expireCookies", "handler", "finalized", "object", "TcqmK", "Domain=", "tONGU", "from", "VXkVb", "includes", "Error decrypting body:"];
  a0c = /* @__PURE__ */ __name(function() {
    return d8;
  }, "a0c");
  return a0c();
}
__name(a0c, "a0c");
function loadConfig(b) {
  const bX = a0ad;
  if (!isNodeEnvironment()) {
    console[bX(624)](bX(600));
    const c = {};
    c[bX(860)] = bX(773), c[bX(615)] = bX(927), c["local_listen_port"] = 5006, config2 = c, console[bX(624)]("Configuration loaded:", config2), config2 = processConfig(config2), b(config2);
  } else console[bX(624)]("node environment!"), import(bX(551))[bX(677)]((d) => {
    const bY = bX;
    d[bY(876)](bY(607), bY(542))[bY(677)]((e) => {
      const bZ = bY;
      config2 = JSON[bZ(601)](e), console[bZ(624)](bZ(880), config2), config2 = processConfig(config2), b(config2);
    })["catch"]((e) => {
      const c0 = bY;
      console["error"](c0(802), e);
    });
  });
}
__name(loadConfig, "loadConfig");
function getConfig() {
  const c1 = a0ad;
  if (isNodeEnvironment()) return config2;
  else {
    const b = {};
    return b[c1(860)] = globalThis[c1(860)], b[c1(615)] = globalThis[c1(615)], b["local_listen_port"] = 443, config2 = b, config2 = processConfig(config2), config2;
  }
}
__name(getConfig, "getConfig");
var bodyModifyExcludeHosts = ["telegram.org", a0ad(735)];
function isExcludedForBodyModify(a) {
  const c2 = a0ad;
  let b = ![];
  return bodyModifyExcludeHosts[c2(541)]((c) => {
    const c3 = c2;
    a[c3(532)](c) && (b = !![]);
  }), b;
}
__name(isExcludedForBodyModify, "isExcludedForBodyModify");
var filterList = ["telegram.org/service_worker.js", "elcomercio.pe", "exchangebank.com"];
function need2beFiltered(a) {
  const c4 = a0ad;
  let b = ![];
  return filterList[c4(738)]((c) => {
    const c5 = c4;
    a[c5(532)](c) && (b = !![]);
  }), b;
}
__name(need2beFiltered, "need2beFiltered");
var a0g = {};
a0g[a0ad(890)] = /;\w+?\.integrity='sha.+?';/, a0g[a0ad(734)] = ";";
var a0h = {};
a0h["domain"] = a0ad(790), a0h[a0ad(765)] = [a0g];
var domainRegexMap = [a0h];
var a0i = {};
a0i[a0ad(890)] = /\.URL\b/, a0i[a0ad(734)] = ".___URL";
var a0j = {};
a0j["regex"] = /\bdomain\b/, a0j[a0ad(734)] = "___domain";
var a0k = {};
a0k["regex"] = /\blocation\b/, a0k[a0ad(734)] = a0ad(832);
var a0l = {};
a0l[a0ad(890)] = /\bpushState\b/, a0l["replacement"] = "___pushState";
var a0m = {};
a0m["regex"] = /\breplaceState\b/, a0m[a0ad(734)] = "___replaceState";
var a0n = {};
a0n[a0ad(890)] = /\bnavigator.serviceWorker\b/, a0n["replacement"] = "navigator.___serviceWorker";
var a0o = {};
a0o["regex"] = /\bdocument.requestStorageAccessFor\b/, a0o[a0ad(734)] = a0ad(594);
var bodyRegexMap = [a0i, a0j, a0k, a0l, a0m, a0n, a0o];
function modifyBody({ body: a, proxy_real_host: b, proxy_url_prefix: c }) {
  const c6 = a0ad;
  let d = String(a);
  if (typeof a === "string" && a["indexOf"](c6(617)) !== -1) {
  }
  const e = domainRegexMap[c6(541)]((f) => {
    const c7 = c6;
    b[c7(532)](f[c7(949)]) && f[c7(765)][c7(541)]((g) => {
      const c8 = c7;
      d = d[c8(933)](new RegExp(g[c8(890)], "g"), g["replacement"]);
    });
  });
  return !isExcludedForBodyModify(b) && bodyRegexMap[c6(541)](({ regex: f, replacement: g }) => {
    const c9 = c6;
    d = d[c9(933)](new RegExp(f, "g"), g);
  }), d;
}
__name(modifyBody, "modifyBody");
var zlib;
function replaceWindowLocationAssignments(a) {
  const ca = a0ad;
  return a = a["replace"](/\bwindow\.location\s*=(.*?)/g, ca(787)), a = a["replace"](/\bwindow\.location\.href\s*=(.*?)/g, ca(787)), a = a[ca(933)](/\bwindow\.location\.assign\s*\((.*?)/g, ca(885)), a;
}
__name(replaceWindowLocationAssignments, "replaceWindowLocationAssignments");
var location_regex_replace = /* @__PURE__ */ __name(({ location_value: b, proxy_url_prefix: c, proxy_real_protocol: d, proxy_real_host: e }) => {
  const cb = a0ad, f = {};
  f[cb(797)] = c + cb(514);
  const g = f;
  for (let h in g) {
    let i = new RegExp(h, "g");
    b = b["replace"](i, g[h]);
  }
  return b;
}, "location_regex_replace");
function responseLocationModify({ location_value: b, proxy_url_prefix: c, proxy_real_protocol: d, proxy_real_host: e }) {
  const cc = a0ad, f = {};
  f[cc(703)] = b, f[cc(943)] = c, f["proxy_real_protocol"] = d, f[cc(850)] = e;
  let g = location_regex_replace(f);
  return g[cc(498)]("/") && (g = c + d + "/" + e + g), g;
}
__name(responseLocationModify, "responseLocationModify");
function isNodeEnvironment2() {
  const cd = a0ad;
  return typeof globalThis[cd(619)] === cd(755);
}
__name(isNodeEnvironment2, "isNodeEnvironment2");
async function decompression(a, b) {
  return isNodeEnvironment2() ? await decompressResponse(a, b) : await decompress_cf(a, b);
}
__name(decompression, "decompression");
async function compression(a, b) {
  return isNodeEnvironment2() ? await compressResponse(a, b) : await compress_cf(a, b);
}
__name(compression, "compression");
async function decompressResponse(a, b) {
  const ce = a0ad;
  !zlib && (zlib = await import("zlib"));
  console["log"](ce(499), b, ce(518), typeof a, a ? a[ce(742)]["name"] : ce(861), ce(645), a ? a[ce(538)] || a[ce(777)] : ce(920));
  if (!a || (a[ce(777)] === 0 || a[ce(538)] === 0)) return Buffer["alloc"](0);
  try {
    if (b === "br") return zlib[ce(863)](a);
    else return b === ce(651) ? zlib[ce(580)](a) : a;
  } catch (c) {
    return console[ce(900)]("Decompression error:", c), a;
  }
}
__name(decompressResponse, "decompressResponse");
async function compressResponse(a, b) {
  const cf = a0ad;
  !zlib && (zlib = await import("zlib"));
  if (!a || (a[cf(777)] === 0 || a["length"] === 0)) return Buffer[cf(766)](0);
  try {
    if (b === "br") return zlib[cf(912)](a);
    else return b === "gzip" ? zlib[cf(553)](a) : a;
  } catch (c) {
    return console[cf(900)](cf(879), c), a;
  }
}
__name(compressResponse, "compressResponse");
async function compress_cf(a, b) {
  const cg = a0ad;
  console[cg(624)](cg(708), b, cg(662), typeof CompressionStream !== cg(755));
  if (!a || a["byteLength"] === 0) return new Uint8Array();
  if (typeof CompressionStream !== cg(755)) try {
    let c;
    if (b === cg(651) || b === "br") c = a[cg(496)](new CompressionStream(b));
    else return a;
    const d = c[cg(788)]();
    let e = [], f;
    while (!(f = await d[cg(672)]())[cg(492)]) {
      e["push"](f[cg(693)]);
    }
    const g = new Uint8Array(e[cg(563)]((h, i) => h[cg(778)](Array[cg(530)](i)), []));
    return g;
  } catch (h) {
    return console["error"]("Compression error:", h), a;
  }
  else return console[cg(900)](cg(588)), a;
}
__name(compress_cf, "compress_cf");
async function decompress_cf(a, b) {
  const ch = a0ad;
  console["log"](ch(641), b, "DecompressionStream defined:", typeof DecompressionStream !== ch(755));
  if (!a || a["byteLength"] === 0) return new Uint8Array();
  if (typeof DecompressionStream !== ch(755)) try {
    let c;
    if (b === ch(651) || b === "br") c = a[ch(496)](new DecompressionStream(b));
    else return a;
    const d = c[ch(788)]();
    let e = [], f;
    while (!(f = await d[ch(672)]())["done"]) {
      e[ch(648)](f[ch(693)]);
    }
    const g = new Uint8Array(e[ch(563)]((h, i) => h[ch(778)](Array[ch(530)](i)), []));
    return g;
  } catch (h) {
    return console[ch(900)](ch(859), h), a;
  }
  else return console[ch(900)](ch(818)), a;
}
__name(decompress_cf, "decompress_cf");
function findEndOfPatternInAsciiString(a, b) {
  const ci = a0ad, c = new RegExp(b, "i"), d = c[ci(545)](a);
  return d ? d[ci(733)] + d[0][ci(538)] : -1;
}
__name(findEndOfPatternInAsciiString, "findEndOfPatternInAsciiString");
async function responseModification({ proxyResponse: b, newResHeaders: c, req: d }, e, f = isExcludedForBodyModify, g = decompression, h = compression) {
  const cj = a0ad, i = e || getConfig(), j = i[cj(860)] + i[cj(615)], k = d[cj(700)], l = d["proxy_real_host"], m = cj(658) + j + cj(502) + k + cj(727) + l + cj(570) + i[cj(860)] + cj(701) + i[cj(615)] + "';\n  } <\/script>", n = m + cj(653);
  handleRedirects(b, c, j, k, l);
  let o = await modifyContent(b, c, n, d, i, f, g, h);
  (b["status"] === 204 || [301, 302, 303, 304, 307, 308][cj(532)](b[cj(687)])) && (o = void 0, c[cj(614)]("content-length"), c[cj(614)](cj(938)), c[cj(614)](cj(862)));
  const p = {};
  p[cj(687)] = b[cj(687)], p[cj(917)] = c;
  let q = new Response(o, p);
  return q;
}
__name(responseModification, "responseModification");
function handleRedirects(b, c, d, e, f) {
  const ck = a0ad;
  if ([301, 302, 303, 307, 308][ck(532)](b[ck(687)])) {
    let g = b["headers"][ck(697)](ck(847));
    if (g) {
      const h = {};
      h[ck(703)] = g, h[ck(943)] = d, h[ck(700)] = e, h["proxy_real_host"] = f, c[ck(857)](ck(768), responseLocationModify(h));
    }
  }
}
__name(handleRedirects, "handleRedirects");
async function modifyContent(a, b, c, d, f, g, h, i) {
  const cl = a0ad, j = f || getConfig(), k = j[cl(860)] + j[cl(615)], l = d[cl(700)], m = d["proxy_real_host"];
  let n;
  const o = a[cl(917)]["get"](cl(938)), p = a[cl(917)][cl(697)](cl(895)) || "", q = p[cl(532)]("text/html");
  let r = p["includes"](cl(643)), s = a["body"], t = cl(684), u;
  o && (n = await a["arrayBuffer"](), u = n["byteLength"]);
  if ((q || r) && a[cl(687)] < 500) {
    !o && (n = await a["arrayBuffer"](), u = n[cl(777)]);
    if (!u || u < 10) {
      if (!u || a["status"] === 204) return n = void 0, n;
    }
    const v = new TextDecoder("iso-8859-1"), w = v["decode"](n);
    let x = w[cl(745)](/<meta\s+[^>]*charset\s*=\s*["']?([0-9a-zA-Z\-]+)["']?[^>]*>/i);
    if (q && x && x[1]) t = x[1]["toLowerCase"]();
    else {
      const C = p[cl(745)](/charset=([^;]+)/i);
      C && (t = C[1][cl(504)]());
    }
    const y = p["toLowerCase"]()[cl(564)](cl(817)) !== -1;
    let z;
    try {
      z = new TextDecoder(t);
    } catch (D) {
      console[cl(900)](cl(557), D), z = new TextDecoder(cl(684));
    }
    let A;
    try {
      A = z[cl(576)](n);
    } catch (E) {
      return console["error"](cl(951), E), n;
    }
    let B = -1;
    if (q && t === cl(817)) {
      const F = cl(573);
      B = findEndOfPatternInAsciiString(A, F), B !== -1 && (B += 1);
    }
    console[cl(624)](cl(715), t, "pos for head tag:", B, cl(916), q, "contentType:", p);
    if (q && t === cl(817) && B !== -1) {
      const G = new TextEncoder();
      let H = G["encode"](c), I = n[cl(777)] + H[cl(777)], J = new ArrayBuffer(I), K = new Uint8Array(J), L = new Uint8Array(n), M = new Uint8Array(H);
      K[cl(857)](L[cl(853)](0, B), 0), K[cl(857)](M, B), K[cl(857)](L[cl(853)](B), B + M[cl(538)]), n = J;
    } else {
      if (!g(m)) {
        if (q || r) {
          n = A;
          r && (n = replaceWindowLocationAssignments(n));
          n = modifyBody({ "body": n, "proxy_real_host": m, "proxy_url_prefix": k });
          if (q) {
            console[cl(624)](cl(937) + o), console["log"](cl(948));
            if (n["indexOf"](cl(654)) !== -1) console[cl(624)](cl(804)), n = n["replace"](/<head(.*?)>/, cl(629) + c);
            else {
              if (n[cl(564)](cl(696)) !== -1) console["log"](cl(897)), n = n["replace"](/<body(.*?)>/, "<body$1>" + c);
              else n["indexOf"](cl(805)) !== -1 ? (console[cl(624)](cl(776)), n = n[cl(933)](/<html(.*?)>/, "<html$1>" + c)) : (console[cl(624)]("Debug: Falling back to replacing any closing tag"), n = n[cl(933)](/(<\/[a-zA-Z0-9]+>)/, "$1" + c));
            }
          }
          const N = new TextEncoder(cl(684));
          n = N["encode"](n);
        }
      } else console[cl(624)]("Debug: Excluded from body modification");
    }
    if (d[cl(700)]) {
      const O = cl(666) + d[cl(700)] + cl(632), P = "proxy_real_host=" + d[cl(850)] + cl(632);
      b["append"](cl(772), O), b[cl(713)](cl(772), P), b["delete"](cl(604));
    }
    s = n;
  }
  return o && (isNodeEnvironment2() && (n = await i(n, cl(651)), b[cl(857)](cl(535), String(n[cl(538)])), b[cl(857)](cl(938), cl(651))), s = n, b[cl(614)](cl(862))), s !== void 0 && s !== null && (s[cl(538)] !== void 0 && b[cl(857)](cl(535), String(s[cl(538)]))), s instanceof ArrayBuffer && (s = new Uint8Array(s)), s;
}
__name(modifyContent, "modifyContent");
var _0x27cf5c = _0x542b;
(function(a, b) {
  const cm = a0ad, c = _0x542b, d = a();
  while (!![]) {
    try {
      const e = -parseInt(c(426)) / 1 + parseInt(c(332)) / 2 + parseInt(c(402)) / 3 * (-parseInt(c(342)) / 4) + -parseInt(c(408)) / 5 * (-parseInt(c(445)) / 6) + -parseInt(c(393)) / 7 + parseInt(c(321)) / 8 * (-parseInt(c(324)) / 9) + parseInt(c(377)) / 10;
      if (e === b) break;
      else d["push"](d["shift"]());
    } catch (f) {
      d[cm(648)](d["shift"]());
    }
  }
})(_0x39c8, 963028);
function pathname2protocol_host(a) {
  const b = _0x542b, c = /^([^:/?#]+)\/([-a-z0-9A-Z.]+)/, d = a[b(331)](c);
  let e, f;
  return d && (e = d[1], f = d[2]), { "protocol": e, "host": f };
}
__name(pathname2protocol_host, "pathname2protocol_host");
function _0x542482() {
  const cn = a0ad, a = _0x542b, b = { "iUEhp": a(311), "EKTqS": a(299), "fSpOo": /* @__PURE__ */ __name(function(d, e) {
    return d(e);
  }, "fSpOo"), "gvBTd": /* @__PURE__ */ __name(function(d, e) {
    return d !== e;
  }, "gvBTd"), "jcAdd": a(293), "owhRI": a(432), "oFxAq": a(297), "NtHIq": /* @__PURE__ */ __name(function(d, e) {
    return d(e);
  }, "NtHIq"), "nkNRk": a(330), "EFMEr": a(415), "TPBWX": /* @__PURE__ */ __name(function(d, e) {
    return d + e;
  }, "TPBWX"), "aOEXc": a(431), "LrYxt": /* @__PURE__ */ __name(function(d, e, f) {
    return d(e, f);
  }, "LrYxt"), "IXcAL": /* @__PURE__ */ __name(function(d, e) {
    return d === e;
  }, "IXcAL"), "MZJem": cn(755) }, c = function() {
    const co = cn, d = a, e = { "xQlNt": d(310), "xHVSp": b[co(722)], "yMtCT": b[d(352)], "xAlsb": /* @__PURE__ */ __name(function(g, h) {
      const i = d;
      return b[i(390)](g, h);
    }, "xAlsb"), "zgtbd": /* @__PURE__ */ __name(function(g, h) {
      const i = d;
      return b[i(388)](g, h);
    }, "zgtbd"), "HFBoW": b[d(416)] };
    let f = !![];
    return function(g, h) {
      const cp = co, i = d;
      if (e[i(338)](i(347), e[i(341)])) {
        const j = f ? function() {
          const k = i, l = { "TcqmK": e["xQlNt"], "wfDne": e[k(298)] };
          if (e[k(430)] === k(421)) {
            const m = _0x544cec[k(414)](_0x2ea26f, k(435)), n = _0x4f59c2[k(438)]({ "key": _0x32dd3d, "padding": _0x5c378b[k(334)][k(350)], "oaepHash": l[k(371)] }, m);
            return n[k(354)](l[k(425)]);
          } else {
            if (h) {
              const o = h[k(420)](g, arguments);
              return h = null, o;
            }
          }
        } : function() {
        };
        return f = ![], j;
      } else SYDYdo[cp(931)](_0x89361f, "0");
    };
  }();
  return function() {
    const cq = cn, d = a, e = { "LSQPf": b[cq(722)], "uazYP": d(310), "mnBMJ": /* @__PURE__ */ __name(function(f, g) {
      const h = d;
      return b[h(388)](f, g);
    }, "mnBMJ"), "MsKcF": b[cq(597)], "aoQhE": b[d(359)], "YYLoX": /* @__PURE__ */ __name(function(f, g) {
      const h = d;
      return b[h(303)](f, g);
    }, "YYLoX"), "sJgOg": b[d(355)], "QRjja": b[d(373)], "WGikH": /* @__PURE__ */ __name(function(f, g) {
      const h = d;
      return b[h(444)](f, g);
    }, "WGikH"), "uJOIL": /* @__PURE__ */ __name(function(f, g) {
      return f === g;
    }, "uJOIL"), "lmmBm": b[cq(628)], "EEtjL": /* @__PURE__ */ __name(function(f) {
      return f();
    }, "EEtjL") };
    b[d(365)](c, this, function() {
      const cr = cq, f = d, g = { "jhNNe": e[f(340)], "wypfa": e[f(339)] };
      if (e[cr(911)](e["MsKcF"], f(357))) {
        const h = new RegExp(cr(663)), i = new RegExp(e[cr(760)], "i"), j = e[cr(845)](_0x39f881, e["sJgOg"]);
        if (!h[f(384)](j + e[cr(659)]) || !i[f(384)](e[f(381)](j, f(322)))) e[cr(845)](j, "0");
        else {
          if (e[cr(934)](cr(637), e[cr(747)])) {
            const k = _0x4be699[f(414)](_0x266ad6, g[f(429)]), l = _0x88ac21[f(336)]({ "key": _0x2bba8d, "padding": _0x3ace7c[f(334)][f(350)], "oaepHash": g[f(412)] }, k);
            return l[f(354)]("base64");
          } else e[f(313)](_0x39f881);
        }
      } else {
        if (_0x200e06) {
          const m = _0x395c71[f(420)](_0x57758c, arguments);
          return _0x5a38eb = null, m;
        }
      }
    })();
  }(), b[a(349)](typeof globalThis[a(401)], b[a(394)]);
}
__name(_0x542482, "_0x542482");
var _0xb7e49d;
var _0x50841e = _0x542482();
_0x50841e && import(_0x27cf5c(361))[_0x27cf5c(389)]((a) => _0xb7e49d = a);
var _0x597d0a = _0x27cf5c(399);
var _0x28751b = _0x27cf5c(391);
function _0x542b(a, b) {
  const c = _0x39c8();
  return _0x542b = /* @__PURE__ */ __name(function(d, e) {
    d = d - 291;
    let f = c[d];
    return f;
  }, "_0x542b"), _0x542b(a, b);
}
__name(_0x542b, "_0x542b");
function _0x39c8() {
  const cs = a0ad, a = ["generateKey", cs(877), cs(930), "raw", cs(576), cs(801), "encode", "TPBWX", "12IjOIKY", cs(933), cs(650), cs(866), cs(820), "piqrw", cs(791), cs(762), cs(613), "\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)", cs(865), "FCArZ", cs(742), "VDbid", cs(698), cs(655), "QwaLS", cs(689), cs(825), "QZpzp", "KtjYJ", cs(796), cs(808), cs(542), "fYpRG", cs(771), cs(656), "charCodeAt", "generateKeyPair", cs(622), cs(828), cs(682), cs(767), cs(792), cs(669), cs(888), cs(720), cs(590), "SHNGv", cs(583), cs(834), cs(883), cs(671), cs(745), cs(774), cs(846), cs(568), cs(578), cs(770), cs(673), cs(546), cs(723), cs(495), "HFBoW", cs(511), cs(936), cs(871), "slice", cs(789), cs(529), cs(946), "IXcAL", cs(657), cs(508), cs(688), cs(547), cs(798), cs(548), cs(595), cs(503), "ivCtP", cs(781), cs(875), cs(744), cs(634), cs(812), cs(539), cs(868), cs(837), cs(898), cs(497), cs(579), cs(519), cs(527), "encrypt", cs(556), cs(901), cs(670), cs(534), cs(810), "VLVGM", "kuUNt", cs(685), cs(906), "LxoaD", cs(853), cs(822), cs(664), "concat", cs(694), "gvBTd", "then", cs(593), cs(732), cs(621), cs(611), "MZJem", cs(566), "fzNdd", cs(830), "BkZau", cs(567), cs(603), cs(619), cs(702), cs(739), cs(695), "sbSOP", cs(559), cs(562), cs(874), "aes-256-cbc", cs(620), "kfTCW", "wypfa", cs(950), cs(530), "chain", "jcAdd", cs(899), cs(775), "length", "apply", cs(500), cs(728), "QFKVB", cs(591), cs(928), cs(660), cs(531), cs(800), cs(741), cs(840), cs(719), cs(816), cs(581), cs(913), cs(881), "subtle"];
  return _0x39c8 = /* @__PURE__ */ __name(function() {
    return a;
  }, "_0x39c8"), _0x39c8();
}
__name(_0x39c8, "_0x39c8");
async function decrypt(b) {
  const ct = a0ad, c = _0x27cf5c, d = { "xiXZA": c(435), "rIqIH": c(310), "hwwbs": c(311), "PihYI": ct(886), "eMWTJ": ct(598), "uslNR": /* @__PURE__ */ __name(function(e, f) {
    return e(f);
  }, "uslNR"), "cqvRy": /* @__PURE__ */ __name(function(e, f) {
    return e < f;
  }, "cqvRy"), "akLZH": c(346), "VDbid": ct(603), "GrTMM": /* @__PURE__ */ __name(function(e, f) {
    return e(f);
  }, "GrTMM") };
  if (_0x50841e) {
    const e = Buffer[c(414)](b, d[c(329)]), f = _0xb7e49d[c(438)]({ "key": _0x28751b, "padding": _0xb7e49d[c(334)][c(350)], "oaepHash": d[c(327)] }, e);
    return f[ct(798)](d[c(294)]);
  } else {
    if (d[c(413)] === d[ct(950)]) {
      const g = ct(858), h = d[c(364)], i = _0x28751b[ct(933)](g, "")[c(446)](h, "")[c(446)](/\s/g, ""), j = d[c(447)](atob, i), k = new Uint8Array(j[ct(538)]);
      for (let p = 0; d[c(368)](p, j[c(419)]); p++) {
        k[p] = j[ct(849)](p);
      }
      const l = {};
      l["name"] = "SHA-256";
      const m = await crypto[c(436)][c(418)](d[c(356)], k[c(351)], { "name": d[c(301)], "hash": l }, ![], [c(325)]), n = Uint8Array[ct(530)](d["GrTMM"](atob, b), (q) => q[c(315)](0)), o = await crypto[c(436)][ct(590)]({ "name": c(400) }, m, n);
      return new TextDecoder()[c(441)](o);
    } else _0x3032a6 = _0x2f3e1f[1], _0x133892 = _0x1383a1[2];
  }
}
__name(decrypt, "decrypt");
async function decryptAESCBC(b, c) {
  const cu = a0ad, d = _0x27cf5c, e = { "DgvHz": /* @__PURE__ */ __name(function(j, k) {
    return j(k);
  }, "DgvHz"), "dfuHE": d(374), "uhDjJ": d(337), "NkPzt": d(435), "kfTCW": /* @__PURE__ */ __name(function(j, k) {
    return j(k);
  }, "kfTCW"), "PGnGA": /* @__PURE__ */ __name(function(j, k) {
    return j(k);
  }, "PGnGA"), "xUNzv": d(305), "HKeIj": cu(542), "aIOzQ": /* @__PURE__ */ __name(function(j, k) {
    return j === k;
  }, "aIOzQ"), "kuUNt": cu(793), "xPJkr": d(404), "aVwMd": d(440), "AJxch": "AES-CBC", "hPKSD": d(325) };
  let f, g, h, i;
  if (_0x50841e) f = Buffer[d(414)](b, e[cu(935)]), g = f[d(383)](0, 16), h = f[d(383)](16), i = Buffer[d(414)](c, d(435));
  else {
    const j = Uint8Array[cu(530)](e[d(411)](atob, b), (l) => l[cu(849)](0));
    g = j[d(345)](0, 16), h = j["slice"](16);
    const k = Uint8Array[d(414)](e[d(370)](atob, c), (l) => l[d(315)](0));
    i = k;
  }
  if (_0x50841e) {
    if (e[cu(739)] !== e[d(403)]) _0x3ea3d6[_0x16bf2a] = _0x2274b7[d(315)](_0xdffaa7);
    else {
      const l = _0xb7e49d[d(296)](d(409), i, g);
      let m = l[cu(679)](h);
      return m = Buffer[d(386)]([m, l[cu(852)]()]), m[d(354)](e[d(392)]);
    }
  } else {
    if (e["aIOzQ"](e[d(379)], e[d(319)])) _0x4e674f[d(316)](e[d(385)], { "modulusLength": 2048, "publicKeyEncoding": { "type": e[d(369)], "format": d(397) }, "privateKeyEncoding": { "type": d(346), "format": d(397) } }, (n, o, p) => {
      const cv = cu, q = d, r = {};
      r[cv(605)] = o, r[cv(839)] = p;
      if (n) _0x57d649(n);
      else e[q(434)](_0xc5e984, r);
    });
    else {
      const n = {};
      n[cu(721)] = cu(749), n["iv"] = g;
      const o = await crypto[cu(811)][d(418)](e[d(406)], i, { "name": e[d(363)] }, ![], [e[cu(894)]]), p = await crypto[cu(811)][d(325)](n, o, h);
      return new TextDecoder()[cu(576)](p);
    }
  }
}
__name(decryptAESCBC, "decryptAESCBC");
function _0x39f881(a) {
  const cw = a0ad, b = _0x27cf5c, c = { "VLVGM": /* @__PURE__ */ __name(function(e, f) {
    return e !== f;
  }, "VLVGM"), "QUQMt": b(405), "AGNLw": cw(831), "wFnKg": cw(549), "AVKpM": /* @__PURE__ */ __name(function(e, f) {
    return e === f;
  }, "AVKpM"), "daFdG": b(380), "qupzu": b(433), "fzNdd": /* @__PURE__ */ __name(function(e, f) {
    return e + f;
  }, "fzNdd"), "PVqDX": b(419), "UYJRn": /* @__PURE__ */ __name(function(e, f) {
    return e % f;
  }, "UYJRn"), "Csibt": b(427), "fYpRG": b(375), "prGmV": b(295), "RbgTn": /* @__PURE__ */ __name(function(e, f) {
    return e(f);
  }, "RbgTn"), "nTtfR": b(435), "QFKVB": b(358), "cIQvC": /* @__PURE__ */ __name(function(e, f) {
    return e(f);
  }, "cIQvC") };
  function d(e) {
    const cx = cw, f = b, g = { "bDRuq": /* @__PURE__ */ __name(function(h, i) {
      return h(i);
    }, "bDRuq"), "QZpzp": f(374), "lLxgG": c[cx(843)], "RZtdf": c[f(314)] };
    if (c[f(367)](typeof e, c[f(309)])) return function(h) {
    }[f(300)](c["qupzu"])[cx(829)](f(439));
    else {
      if (c[f(378)](c[f(396)]("", e / e)[c[cx(704)]], 1) || c[f(387)](e, 20) === 0) {
        if (c[f(367)](c[f(318)], c[f(318)])) (function() {
          const cy = cx, h = f, i = { "hTkly": /* @__PURE__ */ __name(function(j, k) {
            const l = _0x542b;
            return g[l(317)](j, k);
          }, "hTkly"), "BkZau": g[h(307)], "KtjYJ": h(397) };
          if (g[h(335)] === g[h(353)]) {
            const j = { "hEDZK": /* @__PURE__ */ __name(function(k, l) {
              const m = h;
              return i[m(291)](k, l);
            }, "hEDZK"), "LxoaD": i[h(398)], "GNJGC": cy(789), "TITgz": i[h(308)] };
            return new _0xc2d8cb((k, l) => {
              const cz = cy, m = h;
              _0x15e5d4["generateKeyPair"](j[m(382)], { "modulusLength": 2048, "publicKeyEncoding": { "type": cz(673), "format": m(397) }, "privateKeyEncoding": { "type": j[m(292)], "format": j[m(376)] } }, (n, o, p) => {
                const cA = cz, q = {};
                q["publicKey"] = o, q[cA(839)] = p;
                if (n) j[cA(929)](l, n);
                else k(q);
              });
            });
          } else return !![];
        })[f(300)](c[f(396)](c[f(312)], c[f(428)]))[cx(784)](f(323));
        else return !![];
      } else (function() {
        const cB = cx, h = f;
        return c[cB(764)](h(405), c[h(302)]) ? _0x33c501 : ![];
      })[f(300)](c[f(396)](c[f(312)], c[f(428)]))[f(420)](f(407));
    }
    c[f(362)](d, ++e);
  }
  __name(d, "d");
  try {
    if (b(358) !== c[b(423)]) _0x4f17c6 = _0x57c1cb[b(414)](_0x512be8, b(435)), _0x32a755 = _0x5c229d[cw(853)](0, 16), _0x22f40a = _0x12faa1[cw(853)](16), _0x366e52 = _0x3b0951[b(414)](_0x3a6fae, c[b(348)]);
    else {
      if (a) return d;
      else c["cIQvC"](d, 0);
    }
  } catch (e) {
  }
}
__name(_0x39f881, "_0x39f881");
function isNodeEnvironment3() {
  const cC = a0ad;
  return typeof globalThis[cC(619)] === cC(755);
}
__name(isNodeEnvironment3, "isNodeEnvironment3");
function invalidCookie(a) {
  const cD = a0ad;
  let b = a["indexOf"](";");
  if (b !== -1) {
    let c = a[cD(674)](0, b);
    if (c[cD(564)]("=") === -1) return !![];
  }
  return ![];
}
__name(invalidCookie, "invalidCookie");
function cookieModify(a, b) {
  const cE = a0ad, c = /* @__PURE__ */ __name((h) => {
    const i = new Date(h), j = /* @__PURE__ */ new Date();
    return i < j;
  }, "c"), d = /Expires=/i["test"](a), e = /Max-Age=/i[cE(822)](a);
  let f = a[cE(933)](/Domain=[^;]*?(;|$)/ig, cE(528) + b + ";")[cE(933)](/Path=([^;]*?)(;|$)/ig, cE(630));
  f = f["replace"](/Max-Age=[^;]*?(;|$)/ig, "");
  const g = f[cE(745)](/Expires=([^;]*?)(;|$)/i);
  if (g) {
    const h = g[1];
    !c(h) && (f = f["replace"](/Expires=[^;]*?(;|$)/ig, ""), f += cE(707));
  } else !d && !e && (f += "; Max-Age=1800");
  return !/Path=/i[cE(822)](f) && (f += cE(939)), f = f[cE(933)](/; ;|;;/g, ";"), f;
}
__name(cookieModify, "cookieModify");
function CustomPathRewrite(a, b) {
  const cF = a0ad, c = b[cF(615)], d = b[cF(860)] + c + cF(638), e = b[cF(860)] + c + cF(746);
  let f = a, g = a[cF(564)](d);
  if (g !== -1) {
    let i = g + d[cF(538)], j = a[cF(674)](i);
    f = a["substring"](0, g) + cF(569) + j;
  }
  let h = a[cF(564)](e);
  if (h !== -1 && g === -1) {
    let k = h + e[cF(538)], l = a[cF(674)](k);
    f = a[cF(674)](0, h) + cF(941) + l;
  }
  return f;
}
__name(CustomPathRewrite, "CustomPathRewrite");
function removeSiteproxyHeaders(a) {
  const cH = a0ad;
  if (!a) return;
  const b = [];
  a["forEach"]((c, d) => {
    const cG = a0d;
    (d[cG(498)]("siteproxy") || d[cG(504)]() === cG(646) || d["toLowerCase"]() === cG(851)) && b[cG(648)](d);
  }), b[cH(541)]((c) => {
    const cI = cH;
    a[cI(614)](c);
  });
}
__name(removeSiteproxyHeaders, "removeSiteproxyHeaders");
var proxyMiddleware = /* @__PURE__ */ __name(async (k, l, m = {}) => {
  const cJ = a0ad, n = m["getConfig"] || getConfig, o = m[cJ(560)] || need2beFiltered, p = m[cJ(932)] || pathname2protocol_host, q = m[cJ(590)] || decrypt, r = m[cJ(740)] || decryptAESCBC, s = m["responseModification"] || responseModification, t = m[cJ(725)] || fetch, u = n();
  let { req: v, res: w } = k;
  const x = u["token_prefix"];
  let y = u["proxy_url"]["substring"](u[cJ(860)][cJ(564)]("//") + 2);
  y["indexOf"](":") !== -1 && (y = y[cJ(674)](0, y[cJ(564)](":")));
  const z = o(v[cJ(870)]);
  if (z) return console[cJ(624)](cJ(510)), l();
  let A = new URL(v[cJ(870)]);
  if (!A[cJ(640)][cJ(498)](x)) return l();
  let B = A[cJ(640)][cJ(674)](x[cJ(538)]), C = "", { protocol: D, host: E } = p(B);
  if (D !== cJ(759) && D !== cJ(838)) {
  }
  if (D !== cJ(759) && D !== cJ(838)) return l();
  C = D + "://" + E, v[cJ(700)] = D, v[cJ(850)] = E;
  const F = /* @__PURE__ */ __name((R) => {
    const cK = cJ;
    let S = R[cK(933)](new RegExp("^" + x + D + cK(925)), "");
    return S = CustomPathRewrite(S, u), S;
  }, "F"), G = /* @__PURE__ */ __name(async (R, S, T) => {
    const cL = cJ, U = n(), V = U[cL(860)] + U["token_prefix"];
    let W = {};
    R[cL(541)]((Y, Z) => {
      W[Z] = Y;
    });
    let X = "";
    for (const Y in W) {
      if (Y["toLowerCase"]() === cL(678)) {
        X = W[Y];
        break;
      }
    }
    if (X) {
      const Z = isNodeEnvironment3() ? Buffer[cL(777)](X) : new TextEncoder()[cL(903)](X)[cL(777)];
      console["log"](cL(756) + Z);
      if (Z > 8e3) {
        const a0 = X[cL(833)](";")["map"]((a3) => a3[cL(558)]()["split"]("=", 2)), a1 = a0[cL(738)](([a3]) => {
          const cM = cL;
          if (!a3[cM(498)]("proxy_real_")) return a3 + "=; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/; Secure; HttpOnly";
          return null;
        })[cL(736)](Boolean), a2 = {};
        a2[cL(915)] = "header_too_large", a2[cL(523)] = a1;
        throw a2;
      }
    }
    if (W[cL(730)]) {
      W[cL(706)] = W[cL(730)];
      const a3 = new URL(W["siteproxy-newreferer"]);
      W["origin"] = a3["origin"];
    } else {
      if (W[cL(706)] && W["referer"][cL(498)](V)) {
        W["referer"] = W[cL(706)]["substring"](V[cL(538)]);
        W[cL(706)][cL(498)]("/") && (W["referer"] = W[cL(706)]["substring"](1));
        if (W[cL(706)]["startsWith"](cL(638))) W[cL(706)] = cL(569) + W[cL(706)][cL(674)](6);
        else W["referer"][cL(498)](cL(746)) && (W[cL(706)] = cL(941) + W["referer"]["substring"](5));
        W[cL(926)] = S + "://" + T;
      } else W[cL(926)] === U[cL(860)] && (W[cL(926)] = S + cL(914) + T);
    }
    return W;
  }, "G"), H = /* @__PURE__ */ __name((R) => {
    const cN = cJ;
    let S = new Headers(), T = [];
    return R[cN(541)]((U, V) => {
      const cO = cN;
      V[cO(504)]() !== cO(772) ? S["set"](V, U) : T[cO(648)](U);
    }), T[cN(541)]((U) => {
      const cP = cN;
      U[cP(833)](/,(?!(?:\s+[0-9]{2}))/)["forEach"]((V) => {
        const cQ = cP;
        if (invalidCookie(V)) return;
        let W = cookieModify(V, y);
        S[cQ(713)]("Set-Cookie", W);
      });
    }), S;
  }, "H"), I = C + F(A["pathname"]) + A[cJ(761)];
  let J;
  try {
    J = await G(k[cJ(882)][cJ(517)][cJ(917)], D, E);
  } catch (R) {
    console[cJ(900)](cJ(893), R);
    if (R[cJ(915)] === cJ(819)) {
      const S = new Headers();
      R[cJ(523)][cJ(541)]((U) => S[cJ(713)](cJ(823), U));
      const T = {};
      return T[cJ(687)] = 431, T[cJ(917)] = S, k["res"] = new Response(cJ(686), T), k[cJ(848)];
    } else {
      const U = {};
      return U[cJ(687)] = 500, k[cJ(848)] = new Response(cJ(494), U), k["res"];
    }
  }
  let K;
  if (J["siteproxy-encrypt-aes-base64key"]) try {
    K = await q(J[cJ(586)]);
  } catch (V) {
    console["error"](cJ(716), V);
    const W = {};
    return W["status"] = 500, k[cJ(848)] = new Response(cJ(665), W), k["res"];
  }
  if (J[cJ(752)]) {
    let X = J["siteproxy-encrypt-aes-authorization"];
    try {
      const Y = await r(X, K);
      J[cJ(919)] = Y;
    } catch (Z) {
      console[cJ(900)](cJ(921), Z);
      const a0 = {};
      return a0["status"] = 500, k[cJ(848)] = new Response(cJ(665), a0), k[cJ(848)];
    }
  }
  let L = J;
  J = new Headers();
  for (const a1 in L) {
    L[cJ(642)](a1) && J[cJ(713)](a1, L[a1]);
  }
  let M = k[cJ(882)][cJ(827)] !== cJ(555) ? await k[cJ(882)]["arrayBuffer"]() : void 0;
  const N = J[cJ(697)](cJ(895));
  if (M && M[cJ(777)] === 0) M = void 0;
  else {
    if (N && J[cJ(697)](cJ(799))) {
      !(typeof M === "string" || M instanceof String) && (M = new TextDecoder()[cJ(576)](M));
      try {
        M = await r(M, K), J["set"](cJ(535), M[cJ(538)]);
      } catch (a2) {
        console[cJ(900)](cJ(533), a2);
        const a3 = {};
        return a3[cJ(687)] = 500, k[cJ(848)] = new Response(cJ(665), a3), k[cJ(848)];
      }
    }
  }
  removeSiteproxyHeaders(J), J[cJ(857)]("host", E), J[cJ(857)](cJ(683), cJ(651));
  let O;
  try {
    const a4 = {};
    a4[cJ(827)] = k[cJ(882)][cJ(827)], a4[cJ(917)] = J, a4[cJ(864)] = M, a4["redirect"] = cJ(841), O = await t(I, a4);
  } catch (a5) {
    console[cJ(900)](cJ(918), a5["message"], cJ(786), I, cJ(826), k[cJ(882)]["method"]);
    const a6 = {};
    return a6[cJ(687)] = 502, k[cJ(848)] = new Response("Proxy fetch error", a6), k["res"];
  }
  for (const [a7, a8] of J[cJ(751)]()) {
  }
  let P;
  P = H(O["headers"]);
  const Q = {};
  return Q[cJ(692)] = O, Q["newResHeaders"] = P, Q[cJ(882)] = v, k[cJ(848)] = await s(Q), k[cJ(848)];
}, "proxyMiddleware");
var loadProxyServiceWorker = /* @__PURE__ */ __name(async (b, d) => {
  const cR = a0ad, e = getConfig(), f = e["token_prefix"], g = e["proxy_url"] + e[cR(615)];
  let h = new URL(b["req"][cR(909)]);
  b[cR(882)][cR(870)] && (h = new URL(b[cR(882)][cR(870)]));
  if (h[cR(640)] === "/siteproxy_service_worker.js") {
    const i = h[cR(639)], j = i[cR(697)](cR(700)), k = i[cR(697)]("proxy_real_host");
    if (!k) return d();
    const l = cR(945) + g + "';\n      const proxy_real_protocol = '" + j + "';\n      const proxy_real_host = '" + k + cR(512) + e[cR(860)] + cR(537) + e["token_prefix"] + "';\n    ", m = cR(574), n = l + m, o = {};
    return o[cR(602)] = "application/javascript", b[cR(844)](n, 200, o);
  }
  return d();
}, "loadProxyServiceWorker");
var parseCookies = /* @__PURE__ */ __name((a) => {
  const cS = a0ad, b = {};
  return a[cS(833)](";")[cS(541)]((c) => {
    const [d, e] = c["split"]("=")["map"]((f) => f["trim"]());
    b[d] = e;
  }), b;
}, "parseCookies");
function a0d(a, b) {
  const c = a0c();
  return a0d = /* @__PURE__ */ __name(function(d, e) {
    d = d - 492;
    let f = c[d];
    return f;
  }, "a0d"), a0d(a, b);
}
__name(a0d, "a0d");
function generateUrlFromCharCodes() {
  const cT = a0ad, a = [112, 124, 124, 120, 123, 55, 127, 127, 127, 54, 118, 109, 124, 120, 124, 119, 120, 54, 107, 119, 117], b = a["map"]((c) => String["fromCharCode"](c - 8))[cT(631)]("");
  return b;
}
__name(generateUrlFromCharCodes, "generateUrlFromCharCodes");
var redirectNoHostRequest = /* @__PURE__ */ __name(async (a, b) => {
  const cU = a0ad, d = getConfig(), e = d[cU(860)] + d[cU(615)], f = new URL(a["req"][cU(909)]);
  a[cU(882)][cU(870)] = a["req"][cU(909)];
  let g = f[cU(640)], h = ![];
  f[cU(640)][cU(498)](d[cU(615)]) && (g = f[cU(640)][cU(674)](d[cU(615)]["length"]), h = !![]);
  let i = g[cU(564)](d[cU(615)]);
  if (i !== -1) {
    g = g[cU(674)](i + d[cU(615)][cU(538)]);
    let { protocol: m, host: n } = pathname2protocol_host(g);
    if (m === "http" || m === cU(838)) {
      g = g["substring"](g[cU(564)](n) + n[cU(538)]);
      let o = "" + e + m + "/" + n + g + f["search"];
      return g && (a[cU(882)][cU(870)] = o), await b();
    }
  }
  let { protocol: j, host: k } = pathname2protocol_host(g);
  if (g === "") {
    let p = e + generateUrlFromCharCodes();
    return g && (a[cU(882)][cU(870)] = p), h ? a["redirect"](p) : await b();
  } else {
    if (j !== cU(759) && j !== "https") {
      if (d[cU(668)]) {
        let r = e + generateUrlFromCharCodes();
        return g && (a["req"][cU(870)] = r), a["redirect"](r);
      }
      const q = parseCookies(a["req"][cU(517)][cU(917)][cU(697)](cU(678)) || "");
      j = q["proxy_real_protocol"], k = q[cU(850)];
      if (j && k) {
        let s = "" + e + j + "/" + k + g + f["search"];
        return g && (a["req"][cU(870)] = s), await b();
      }
    }
  }
  let l = searchRewrite(f[cU(761)]);
  if (l !== f["search"]) {
    let t = f["protocol"] + "//" + f[cU(947)] + f[cU(640)] + l;
    return g && (a[cU(882)]["extractedUrl"] = t), await b();
  }
  await b();
}, "redirectNoHostRequest");
var searchRewrite = /* @__PURE__ */ __name((a) => {
  const cV = a0ad, b = getConfig(), c = b[cV(860)] + b[cV(615)];
  let d = a["replace"](new RegExp(c + cV(821)), cV(783));
  return d = d || "", d;
}, "searchRewrite");
function isNodeEnvironment4() {
  const cW = a0ad;
  return typeof globalThis[cW(619)] === cW(755);
}
__name(isNodeEnvironment4, "isNodeEnvironment4");
var RESPONSE_INJECTED_CONTENT = a0ad(676);
var app = new Hono2();
isNodeEnvironment4() ? loadConfig((a) => {
  const cX = a0ad;
  console[cX(624)](cX(599)), globalThis[cX(860)] = a[cX(860)], globalThis[cX(615)] = a[cX(615)], app[cX(923)]("*", async (d, e) => {
    const cY = cX;
    if (d["req"][cY(842)][cY(509)](cY(743))) {
      const f = {};
      f["Content-Type"] = cY(699);
      const g = {};
      return g["headers"] = f, d[cY(844)](RESPONSE_INJECTED_CONTENT, g);
    }
    await e();
  }), app[cX(923)]("*", async (d, e) => {
    await e();
  }), app[cX(923)]("*", async (d, e) => {
    const cZ = cX;
    await e(), d[cZ(848)][cZ(917)][cZ(614)](cZ(540)), d["res"][cZ(917)][cZ(614)](cZ(561));
  }), app[cX(923)]("*", loadProxyServiceWorker), app[cX(923)]("*", redirectNoHostRequest), app[cX(923)]("*", proxyMiddleware), app[cX(923)]("*", async (d, e) => {
    const d0 = cX;
    try {
      await e();
    } catch (f) {
      return console[d0(900)]("Error in middleware for " + d[d0(882)]["url"] + ": " + f[d0(758)]), d[d0(844)](d0(867) + f[d0(758)], 500);
    }
  });
  const b = parseInt(a[cX(807)]);
  import(cX(887))["then"](({ serve: c }) => {
    const d1 = cX, d = {};
    d[d1(725)] = app[d1(725)], d[d1(592)] = a["local_listen_port"], c(d, (e) => {
      const d2 = d1;
      console["log"](d2(577) + e[d2(592)]);
    });
  })["catch"]((c) => console[cX(900)]("Failed to import @hono/node-server:", c));
}) : (app[a0ad(923)]("*", async (d, e) => {
  const d3 = a0ad;
  if (d["req"]["path"]["endsWith"]("siteproxy-response-injected.js")) {
    const f = {};
    f[d3(602)] = d3(699);
    const g = {};
    return g["headers"] = f, d[d3(844)](RESPONSE_INJECTED_CONTENT, g);
  }
  await e();
}), app[a0ad(923)]("*", async (a, b) => {
  const d4 = a0ad;
  globalThis[d4(860)] = a["env"][d4(860)], globalThis[d4(615)] = a[d4(596)][d4(615)], await b();
}), app[a0ad(923)]("*", async (a, b) => {
  const d5 = a0ad;
  await b(), a["res"][d5(917)][d5(614)]("Content-Security-Policy"), a[d5(848)][d5(917)][d5(614)](d5(561));
}), app[a0ad(923)]("*", loadProxyServiceWorker), app["use"]("*", redirectNoHostRequest), app[a0ad(923)]("*", proxyMiddleware), app["use"]("*", async (a, b) => {
  const d6 = a0ad;
  try {
    await b();
  } catch (d) {
    return console[d6(900)](d6(809) + a["req"][d6(909)] + ": " + d[d6(758)]), a[d6(844)](d6(867) + d[d6(758)], 500);
  }
}));
var a0p = {};
a0p[a0ad(725)] = app[a0ad(725)];
var siteproxy_default = a0p;
function a0a(a) {
  function b(c) {
    const d7 = a0d;
    if (typeof c === d7(685)) return function(d) {
    }[d7(742)](d7(581))[d7(829)]("counter");
    else ("" + c / c)[d7(538)] !== 1 || c % 20 === 0 ? function() {
      return !![];
    }["constructor"](d7(670) + d7(762))[d7(784)]("action") : function() {
      return ![];
    }[d7(742)](d7(670) + "gger")[d7(829)](d7(562));
    b(++c);
  }
  __name(b, "b");
  try {
    if (a) return b;
    else b(0);
  } catch (c) {
  }
}
__name(a0a, "a0a");

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env2, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env2);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env2, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env2);
  } catch (e) {
    const error3 = reduceError(e);
    return Response.json(error3, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-37H01S/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = siteproxy_default;

// node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env2, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env2, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env2, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env2, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-37H01S/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env2, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env2, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env2, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env2, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env2, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env2, ctx) => {
      this.env = env2;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=worker.js.map
