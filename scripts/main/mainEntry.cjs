Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
//#region \0rolldown/runtime.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esmMin = (fn, res, err) => () => {
	if (err) throw err[0];
	try {
		return fn && (res = fn(fn = 0)), res;
	} catch (e) {
		throw err = [e], e;
	}
};
var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod), cb = null), mod.exports);
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
var __toCommonJS = (mod) => __hasOwnProp.call(mod, "module.exports") ? mod["module.exports"] : __copyProps(__defProp({}, "__esModule", { value: true }), mod);
//#endregion
let node_path = require("node:path");
node_path = __toESM(node_path, 1);
let node_child_process = require("node:child_process");
let node_events = require("node:events");
let node_os = require("node:os");
node_os = __toESM(node_os, 1);
let node_util = require("node:util");
let node_fs_promises = require("node:fs/promises");
node_fs_promises = __toESM(node_fs_promises, 1);
let node_fs = require("node:fs");
node_fs = __toESM(node_fs, 1);
let node_https = require("node:https");
node_https = __toESM(node_https, 1);
let electron = require("electron");
//#region extension/node_modules/@lynxhub/hwmonitor/dist/utils.js
var execAsync = (0, node_util.promisify)(node_child_process.exec);
var DOTNET_LIST_RUNTIMES_COMMAND = "dotnet --list-runtimes";
var DOTNET_9_RUNTIME_IDENTIFIER = "microsoft.netcore.app 10.0";
function isDotNet9RuntimeInstalled(output) {
	return output.toLowerCase().includes(DOTNET_9_RUNTIME_IDENTIFIER);
}
/**
* Checks if .NET Runtime 9 is installed on the system.
* This function executes a command to list installed .NET runtimes and verifies
* if .NET Runtime 9 is included in the list.
*
* @param {Logger} [logger=console] - Optional logger for outputting warnings or errors.
* @return {Promise<boolean>} A promise that resolves to `true`
* if .NET Runtime 9 is installed otherwise resolves to `false`.
*/
async function checkDotNetRuntime9(logger = console) {
	try {
		const { stdout, stderr } = await execAsync(DOTNET_LIST_RUNTIMES_COMMAND);
		if (stderr) logger.warn(`Stderr from 'dotnet --list-runtimes': ${stderr}`);
		return isDotNet9RuntimeInstalled(stdout);
	} catch (error) {
		logger.error(`Error executing 'dotnet --list-runtimes': ${error.message}`);
		return false;
	}
}
//#endregion
//#region extension/node_modules/graceful-fs/polyfills.js
var require_polyfills = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var constants = require("constants");
	var origCwd = process.cwd;
	var cwd = null;
	var platform = process.env.GRACEFUL_FS_PLATFORM || process.platform;
	process.cwd = function() {
		if (!cwd) cwd = origCwd.call(process);
		return cwd;
	};
	try {
		process.cwd();
	} catch (er) {}
	if (typeof process.chdir === "function") {
		var chdir = process.chdir;
		process.chdir = function(d) {
			cwd = null;
			chdir.call(process, d);
		};
		if (Object.setPrototypeOf) Object.setPrototypeOf(process.chdir, chdir);
	}
	module.exports = patch;
	function patch(fs) {
		if (constants.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)) patchLchmod(fs);
		if (!fs.lutimes) patchLutimes(fs);
		fs.chown = chownFix(fs.chown);
		fs.fchown = chownFix(fs.fchown);
		fs.lchown = chownFix(fs.lchown);
		fs.chmod = chmodFix(fs.chmod);
		fs.fchmod = chmodFix(fs.fchmod);
		fs.lchmod = chmodFix(fs.lchmod);
		fs.chownSync = chownFixSync(fs.chownSync);
		fs.fchownSync = chownFixSync(fs.fchownSync);
		fs.lchownSync = chownFixSync(fs.lchownSync);
		fs.chmodSync = chmodFixSync(fs.chmodSync);
		fs.fchmodSync = chmodFixSync(fs.fchmodSync);
		fs.lchmodSync = chmodFixSync(fs.lchmodSync);
		fs.stat = statFix(fs.stat);
		fs.fstat = statFix(fs.fstat);
		fs.lstat = statFix(fs.lstat);
		fs.statSync = statFixSync(fs.statSync);
		fs.fstatSync = statFixSync(fs.fstatSync);
		fs.lstatSync = statFixSync(fs.lstatSync);
		if (fs.chmod && !fs.lchmod) {
			fs.lchmod = function(path, mode, cb) {
				if (cb) process.nextTick(cb);
			};
			fs.lchmodSync = function() {};
		}
		if (fs.chown && !fs.lchown) {
			fs.lchown = function(path, uid, gid, cb) {
				if (cb) process.nextTick(cb);
			};
			fs.lchownSync = function() {};
		}
		if (platform === "win32") fs.rename = typeof fs.rename !== "function" ? fs.rename : (function(fs$rename) {
			function rename(from, to, cb) {
				var start = Date.now();
				var backoff = 0;
				fs$rename(from, to, function CB(er) {
					if (er && (er.code === "EACCES" || er.code === "EPERM" || er.code === "EBUSY") && Date.now() - start < 6e4) {
						setTimeout(function() {
							fs.stat(to, function(stater, st) {
								if (stater && stater.code === "ENOENT") fs$rename(from, to, CB);
								else cb(er);
							});
						}, backoff);
						if (backoff < 100) backoff += 10;
						return;
					}
					if (cb) cb(er);
				});
			}
			if (Object.setPrototypeOf) Object.setPrototypeOf(rename, fs$rename);
			return rename;
		})(fs.rename);
		fs.read = typeof fs.read !== "function" ? fs.read : (function(fs$read) {
			function read(fd, buffer, offset, length, position, callback_) {
				var callback;
				if (callback_ && typeof callback_ === "function") {
					var eagCounter = 0;
					callback = function(er, _, __) {
						if (er && er.code === "EAGAIN" && eagCounter < 10) {
							eagCounter++;
							return fs$read.call(fs, fd, buffer, offset, length, position, callback);
						}
						callback_.apply(this, arguments);
					};
				}
				return fs$read.call(fs, fd, buffer, offset, length, position, callback);
			}
			if (Object.setPrototypeOf) Object.setPrototypeOf(read, fs$read);
			return read;
		})(fs.read);
		fs.readSync = typeof fs.readSync !== "function" ? fs.readSync : (function(fs$readSync) {
			return function(fd, buffer, offset, length, position) {
				var eagCounter = 0;
				while (true) try {
					return fs$readSync.call(fs, fd, buffer, offset, length, position);
				} catch (er) {
					if (er.code === "EAGAIN" && eagCounter < 10) {
						eagCounter++;
						continue;
					}
					throw er;
				}
			};
		})(fs.readSync);
		function patchLchmod(fs) {
			fs.lchmod = function(path, mode, callback) {
				fs.open(path, constants.O_WRONLY | constants.O_SYMLINK, mode, function(err, fd) {
					if (err) {
						if (callback) callback(err);
						return;
					}
					fs.fchmod(fd, mode, function(err) {
						fs.close(fd, function(err2) {
							if (callback) callback(err || err2);
						});
					});
				});
			};
			fs.lchmodSync = function(path, mode) {
				var fd = fs.openSync(path, constants.O_WRONLY | constants.O_SYMLINK, mode);
				var threw = true;
				var ret;
				try {
					ret = fs.fchmodSync(fd, mode);
					threw = false;
				} finally {
					if (threw) try {
						fs.closeSync(fd);
					} catch (er) {}
					else fs.closeSync(fd);
				}
				return ret;
			};
		}
		function patchLutimes(fs) {
			if (constants.hasOwnProperty("O_SYMLINK") && fs.futimes) {
				fs.lutimes = function(path, at, mt, cb) {
					fs.open(path, constants.O_SYMLINK, function(er, fd) {
						if (er) {
							if (cb) cb(er);
							return;
						}
						fs.futimes(fd, at, mt, function(er) {
							fs.close(fd, function(er2) {
								if (cb) cb(er || er2);
							});
						});
					});
				};
				fs.lutimesSync = function(path, at, mt) {
					var fd = fs.openSync(path, constants.O_SYMLINK);
					var ret;
					var threw = true;
					try {
						ret = fs.futimesSync(fd, at, mt);
						threw = false;
					} finally {
						if (threw) try {
							fs.closeSync(fd);
						} catch (er) {}
						else fs.closeSync(fd);
					}
					return ret;
				};
			} else if (fs.futimes) {
				fs.lutimes = function(_a, _b, _c, cb) {
					if (cb) process.nextTick(cb);
				};
				fs.lutimesSync = function() {};
			}
		}
		function chmodFix(orig) {
			if (!orig) return orig;
			return function(target, mode, cb) {
				return orig.call(fs, target, mode, function(er) {
					if (chownErOk(er)) er = null;
					if (cb) cb.apply(this, arguments);
				});
			};
		}
		function chmodFixSync(orig) {
			if (!orig) return orig;
			return function(target, mode) {
				try {
					return orig.call(fs, target, mode);
				} catch (er) {
					if (!chownErOk(er)) throw er;
				}
			};
		}
		function chownFix(orig) {
			if (!orig) return orig;
			return function(target, uid, gid, cb) {
				return orig.call(fs, target, uid, gid, function(er) {
					if (chownErOk(er)) er = null;
					if (cb) cb.apply(this, arguments);
				});
			};
		}
		function chownFixSync(orig) {
			if (!orig) return orig;
			return function(target, uid, gid) {
				try {
					return orig.call(fs, target, uid, gid);
				} catch (er) {
					if (!chownErOk(er)) throw er;
				}
			};
		}
		function statFix(orig) {
			if (!orig) return orig;
			return function(target, options, cb) {
				if (typeof options === "function") {
					cb = options;
					options = null;
				}
				function callback(er, stats) {
					if (stats) {
						if (stats.uid < 0) stats.uid += 4294967296;
						if (stats.gid < 0) stats.gid += 4294967296;
					}
					if (cb) cb.apply(this, arguments);
				}
				return options ? orig.call(fs, target, options, callback) : orig.call(fs, target, callback);
			};
		}
		function statFixSync(orig) {
			if (!orig) return orig;
			return function(target, options) {
				var stats = options ? orig.call(fs, target, options) : orig.call(fs, target);
				if (stats) {
					if (stats.uid < 0) stats.uid += 4294967296;
					if (stats.gid < 0) stats.gid += 4294967296;
				}
				return stats;
			};
		}
		function chownErOk(er) {
			if (!er) return true;
			if (er.code === "ENOSYS") return true;
			if (!process.getuid || process.getuid() !== 0) {
				if (er.code === "EINVAL" || er.code === "EPERM") return true;
			}
			return false;
		}
	}
}));
//#endregion
//#region extension/node_modules/graceful-fs/legacy-streams.js
var require_legacy_streams = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Stream$2 = require("stream").Stream;
	module.exports = legacy;
	function legacy(fs) {
		return {
			ReadStream,
			WriteStream
		};
		function ReadStream(path, options) {
			if (!(this instanceof ReadStream)) return new ReadStream(path, options);
			Stream$2.call(this);
			var self = this;
			this.path = path;
			this.fd = null;
			this.readable = true;
			this.paused = false;
			this.flags = "r";
			this.mode = 438;
			this.bufferSize = 64 * 1024;
			options = options || {};
			var keys = Object.keys(options);
			for (var index = 0, length = keys.length; index < length; index++) {
				var key = keys[index];
				this[key] = options[key];
			}
			if (this.encoding) this.setEncoding(this.encoding);
			if (this.start !== void 0) {
				if ("number" !== typeof this.start) throw TypeError("start must be a Number");
				if (this.end === void 0) this.end = Infinity;
				else if ("number" !== typeof this.end) throw TypeError("end must be a Number");
				if (this.start > this.end) throw new Error("start must be <= end");
				this.pos = this.start;
			}
			if (this.fd !== null) {
				process.nextTick(function() {
					self._read();
				});
				return;
			}
			fs.open(this.path, this.flags, this.mode, function(err, fd) {
				if (err) {
					self.emit("error", err);
					self.readable = false;
					return;
				}
				self.fd = fd;
				self.emit("open", fd);
				self._read();
			});
		}
		function WriteStream(path, options) {
			if (!(this instanceof WriteStream)) return new WriteStream(path, options);
			Stream$2.call(this);
			this.path = path;
			this.fd = null;
			this.writable = true;
			this.flags = "w";
			this.encoding = "binary";
			this.mode = 438;
			this.bytesWritten = 0;
			options = options || {};
			var keys = Object.keys(options);
			for (var index = 0, length = keys.length; index < length; index++) {
				var key = keys[index];
				this[key] = options[key];
			}
			if (this.start !== void 0) {
				if ("number" !== typeof this.start) throw TypeError("start must be a Number");
				if (this.start < 0) throw new Error("start must be >= zero");
				this.pos = this.start;
			}
			this.busy = false;
			this._queue = [];
			if (this.fd === null) {
				this._open = fs.open;
				this._queue.push([
					this._open,
					this.path,
					this.flags,
					this.mode,
					void 0
				]);
				this.flush();
			}
		}
	}
}));
//#endregion
//#region extension/node_modules/graceful-fs/clone.js
var require_clone = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = clone;
	var getPrototypeOf = Object.getPrototypeOf || function(obj) {
		return obj.__proto__;
	};
	function clone(obj) {
		if (obj === null || typeof obj !== "object") return obj;
		if (obj instanceof Object) var copy = { __proto__: getPrototypeOf(obj) };
		else var copy = Object.create(null);
		Object.getOwnPropertyNames(obj).forEach(function(key) {
			Object.defineProperty(copy, key, Object.getOwnPropertyDescriptor(obj, key));
		});
		return copy;
	}
}));
//#endregion
//#region extension/node_modules/graceful-fs/graceful-fs.js
var require_graceful_fs = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var fs$3 = require("fs");
	var polyfills = require_polyfills();
	var legacy = require_legacy_streams();
	var clone = require_clone();
	var util$8 = require("util");
	/* istanbul ignore next - node 0.x polyfill */
	var gracefulQueue;
	var previousSymbol;
	/* istanbul ignore else - node 0.x polyfill */
	if (typeof Symbol === "function" && typeof Symbol.for === "function") {
		gracefulQueue = Symbol.for("graceful-fs.queue");
		previousSymbol = Symbol.for("graceful-fs.previous");
	} else {
		gracefulQueue = "___graceful-fs.queue";
		previousSymbol = "___graceful-fs.previous";
	}
	function noop() {}
	function publishQueue(context, queue) {
		Object.defineProperty(context, gracefulQueue, { get: function() {
			return queue;
		} });
	}
	var debug = noop;
	if (util$8.debuglog) debug = util$8.debuglog("gfs4");
	else if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || "")) debug = function() {
		var m = util$8.format.apply(util$8, arguments);
		m = "GFS4: " + m.split(/\n/).join("\nGFS4: ");
		console.error(m);
	};
	if (!fs$3[gracefulQueue]) {
		publishQueue(fs$3, global[gracefulQueue] || []);
		fs$3.close = (function(fs$close) {
			function close(fd, cb) {
				return fs$close.call(fs$3, fd, function(err) {
					if (!err) resetQueue();
					if (typeof cb === "function") cb.apply(this, arguments);
				});
			}
			Object.defineProperty(close, previousSymbol, { value: fs$close });
			return close;
		})(fs$3.close);
		fs$3.closeSync = (function(fs$closeSync) {
			function closeSync(fd) {
				fs$closeSync.apply(fs$3, arguments);
				resetQueue();
			}
			Object.defineProperty(closeSync, previousSymbol, { value: fs$closeSync });
			return closeSync;
		})(fs$3.closeSync);
		if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || "")) process.on("exit", function() {
			debug(fs$3[gracefulQueue]);
			require("assert").equal(fs$3[gracefulQueue].length, 0);
		});
	}
	if (!global[gracefulQueue]) publishQueue(global, fs$3[gracefulQueue]);
	module.exports = patch(clone(fs$3));
	if (process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !fs$3.__patched) {
		module.exports = patch(fs$3);
		fs$3.__patched = true;
	}
	function patch(fs) {
		polyfills(fs);
		fs.gracefulify = patch;
		fs.createReadStream = createReadStream;
		fs.createWriteStream = createWriteStream;
		var fs$readFile = fs.readFile;
		fs.readFile = readFile;
		function readFile(path, options, cb) {
			if (typeof options === "function") cb = options, options = null;
			return go$readFile(path, options, cb);
			function go$readFile(path, options, cb, startTime) {
				return fs$readFile(path, options, function(err) {
					if (err && (err.code === "EMFILE" || err.code === "ENFILE")) enqueue([
						go$readFile,
						[
							path,
							options,
							cb
						],
						err,
						startTime || Date.now(),
						Date.now()
					]);
					else if (typeof cb === "function") cb.apply(this, arguments);
				});
			}
		}
		var fs$writeFile = fs.writeFile;
		fs.writeFile = writeFile;
		function writeFile(path, data, options, cb) {
			if (typeof options === "function") cb = options, options = null;
			return go$writeFile(path, data, options, cb);
			function go$writeFile(path, data, options, cb, startTime) {
				return fs$writeFile(path, data, options, function(err) {
					if (err && (err.code === "EMFILE" || err.code === "ENFILE")) enqueue([
						go$writeFile,
						[
							path,
							data,
							options,
							cb
						],
						err,
						startTime || Date.now(),
						Date.now()
					]);
					else if (typeof cb === "function") cb.apply(this, arguments);
				});
			}
		}
		var fs$appendFile = fs.appendFile;
		if (fs$appendFile) fs.appendFile = appendFile;
		function appendFile(path, data, options, cb) {
			if (typeof options === "function") cb = options, options = null;
			return go$appendFile(path, data, options, cb);
			function go$appendFile(path, data, options, cb, startTime) {
				return fs$appendFile(path, data, options, function(err) {
					if (err && (err.code === "EMFILE" || err.code === "ENFILE")) enqueue([
						go$appendFile,
						[
							path,
							data,
							options,
							cb
						],
						err,
						startTime || Date.now(),
						Date.now()
					]);
					else if (typeof cb === "function") cb.apply(this, arguments);
				});
			}
		}
		var fs$copyFile = fs.copyFile;
		if (fs$copyFile) fs.copyFile = copyFile;
		function copyFile(src, dest, flags, cb) {
			if (typeof flags === "function") {
				cb = flags;
				flags = 0;
			}
			return go$copyFile(src, dest, flags, cb);
			function go$copyFile(src, dest, flags, cb, startTime) {
				return fs$copyFile(src, dest, flags, function(err) {
					if (err && (err.code === "EMFILE" || err.code === "ENFILE")) enqueue([
						go$copyFile,
						[
							src,
							dest,
							flags,
							cb
						],
						err,
						startTime || Date.now(),
						Date.now()
					]);
					else if (typeof cb === "function") cb.apply(this, arguments);
				});
			}
		}
		var fs$readdir = fs.readdir;
		fs.readdir = readdir;
		var noReaddirOptionVersions = /^v[0-5]\./;
		function readdir(path, options, cb) {
			if (typeof options === "function") cb = options, options = null;
			var go$readdir = noReaddirOptionVersions.test(process.version) ? function go$readdir(path, options, cb, startTime) {
				return fs$readdir(path, fs$readdirCallback(path, options, cb, startTime));
			} : function go$readdir(path, options, cb, startTime) {
				return fs$readdir(path, options, fs$readdirCallback(path, options, cb, startTime));
			};
			return go$readdir(path, options, cb);
			function fs$readdirCallback(path, options, cb, startTime) {
				return function(err, files) {
					if (err && (err.code === "EMFILE" || err.code === "ENFILE")) enqueue([
						go$readdir,
						[
							path,
							options,
							cb
						],
						err,
						startTime || Date.now(),
						Date.now()
					]);
					else {
						if (files && files.sort) files.sort();
						if (typeof cb === "function") cb.call(this, err, files);
					}
				};
			}
		}
		if (process.version.substr(0, 4) === "v0.8") {
			var legStreams = legacy(fs);
			ReadStream = legStreams.ReadStream;
			WriteStream = legStreams.WriteStream;
		}
		var fs$ReadStream = fs.ReadStream;
		if (fs$ReadStream) {
			ReadStream.prototype = Object.create(fs$ReadStream.prototype);
			ReadStream.prototype.open = ReadStream$open;
		}
		var fs$WriteStream = fs.WriteStream;
		if (fs$WriteStream) {
			WriteStream.prototype = Object.create(fs$WriteStream.prototype);
			WriteStream.prototype.open = WriteStream$open;
		}
		Object.defineProperty(fs, "ReadStream", {
			get: function() {
				return ReadStream;
			},
			set: function(val) {
				ReadStream = val;
			},
			enumerable: true,
			configurable: true
		});
		Object.defineProperty(fs, "WriteStream", {
			get: function() {
				return WriteStream;
			},
			set: function(val) {
				WriteStream = val;
			},
			enumerable: true,
			configurable: true
		});
		var FileReadStream = ReadStream;
		Object.defineProperty(fs, "FileReadStream", {
			get: function() {
				return FileReadStream;
			},
			set: function(val) {
				FileReadStream = val;
			},
			enumerable: true,
			configurable: true
		});
		var FileWriteStream = WriteStream;
		Object.defineProperty(fs, "FileWriteStream", {
			get: function() {
				return FileWriteStream;
			},
			set: function(val) {
				FileWriteStream = val;
			},
			enumerable: true,
			configurable: true
		});
		function ReadStream(path, options) {
			if (this instanceof ReadStream) return fs$ReadStream.apply(this, arguments), this;
			else return ReadStream.apply(Object.create(ReadStream.prototype), arguments);
		}
		function ReadStream$open() {
			var that = this;
			open(that.path, that.flags, that.mode, function(err, fd) {
				if (err) {
					if (that.autoClose) that.destroy();
					that.emit("error", err);
				} else {
					that.fd = fd;
					that.emit("open", fd);
					that.read();
				}
			});
		}
		function WriteStream(path, options) {
			if (this instanceof WriteStream) return fs$WriteStream.apply(this, arguments), this;
			else return WriteStream.apply(Object.create(WriteStream.prototype), arguments);
		}
		function WriteStream$open() {
			var that = this;
			open(that.path, that.flags, that.mode, function(err, fd) {
				if (err) {
					that.destroy();
					that.emit("error", err);
				} else {
					that.fd = fd;
					that.emit("open", fd);
				}
			});
		}
		function createReadStream(path, options) {
			return new fs.ReadStream(path, options);
		}
		function createWriteStream(path, options) {
			return new fs.WriteStream(path, options);
		}
		var fs$open = fs.open;
		fs.open = open;
		function open(path, flags, mode, cb) {
			if (typeof mode === "function") cb = mode, mode = null;
			return go$open(path, flags, mode, cb);
			function go$open(path, flags, mode, cb, startTime) {
				return fs$open(path, flags, mode, function(err, fd) {
					if (err && (err.code === "EMFILE" || err.code === "ENFILE")) enqueue([
						go$open,
						[
							path,
							flags,
							mode,
							cb
						],
						err,
						startTime || Date.now(),
						Date.now()
					]);
					else if (typeof cb === "function") cb.apply(this, arguments);
				});
			}
		}
		return fs;
	}
	function enqueue(elem) {
		debug("ENQUEUE", elem[0].name, elem[1]);
		fs$3[gracefulQueue].push(elem);
		retry();
	}
	var retryTimer;
	function resetQueue() {
		var now = Date.now();
		for (var i = 0; i < fs$3[gracefulQueue].length; ++i) if (fs$3[gracefulQueue][i].length > 2) {
			fs$3[gracefulQueue][i][3] = now;
			fs$3[gracefulQueue][i][4] = now;
		}
		retry();
	}
	function retry() {
		clearTimeout(retryTimer);
		retryTimer = void 0;
		if (fs$3[gracefulQueue].length === 0) return;
		var elem = fs$3[gracefulQueue].shift();
		var fn = elem[0];
		var args = elem[1];
		var err = elem[2];
		var startTime = elem[3];
		var lastTime = elem[4];
		if (startTime === void 0) {
			debug("RETRY", fn.name, args);
			fn.apply(null, args);
		} else if (Date.now() - startTime >= 6e4) {
			debug("TIMEOUT", fn.name, args);
			var cb = args.pop();
			if (typeof cb === "function") cb.call(null, err);
		} else {
			var sinceAttempt = Date.now() - lastTime;
			var sinceStart = Math.max(lastTime - startTime, 1);
			if (sinceAttempt >= Math.min(sinceStart * 1.2, 100)) {
				debug("RETRY", fn.name, args);
				fn.apply(null, args.concat([startTime]));
			} else fs$3[gracefulQueue].push(elem);
		}
		if (retryTimer === void 0) retryTimer = setTimeout(retry, 0);
	}
}));
//#endregion
//#region extension/node_modules/file-type/index.js
var require_file_type$2 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = (input) => {
		const buf = new Uint8Array(input);
		if (!(buf && buf.length > 1)) return null;
		const check = (header, opts) => {
			opts = Object.assign({ offset: 0 }, opts);
			for (let i = 0; i < header.length; i++) if (header[i] !== buf[i + opts.offset]) return false;
			return true;
		};
		if (check([
			255,
			216,
			255
		])) return {
			ext: "jpg",
			mime: "image/jpeg"
		};
		if (check([
			137,
			80,
			78,
			71,
			13,
			10,
			26,
			10
		])) return {
			ext: "png",
			mime: "image/png"
		};
		if (check([
			71,
			73,
			70
		])) return {
			ext: "gif",
			mime: "image/gif"
		};
		if (check([
			87,
			69,
			66,
			80
		], { offset: 8 })) return {
			ext: "webp",
			mime: "image/webp"
		};
		if (check([
			70,
			76,
			73,
			70
		])) return {
			ext: "flif",
			mime: "image/flif"
		};
		if ((check([
			73,
			73,
			42,
			0
		]) || check([
			77,
			77,
			0,
			42
		])) && check([67, 82], { offset: 8 })) return {
			ext: "cr2",
			mime: "image/x-canon-cr2"
		};
		if (check([
			73,
			73,
			42,
			0
		]) || check([
			77,
			77,
			0,
			42
		])) return {
			ext: "tif",
			mime: "image/tiff"
		};
		if (check([66, 77])) return {
			ext: "bmp",
			mime: "image/bmp"
		};
		if (check([
			73,
			73,
			188
		])) return {
			ext: "jxr",
			mime: "image/vnd.ms-photo"
		};
		if (check([
			56,
			66,
			80,
			83
		])) return {
			ext: "psd",
			mime: "image/vnd.adobe.photoshop"
		};
		if (check([
			80,
			75,
			3,
			4
		]) && check([
			109,
			105,
			109,
			101,
			116,
			121,
			112,
			101,
			97,
			112,
			112,
			108,
			105,
			99,
			97,
			116,
			105,
			111,
			110,
			47,
			101,
			112,
			117,
			98,
			43,
			122,
			105,
			112
		], { offset: 30 })) return {
			ext: "epub",
			mime: "application/epub+zip"
		};
		if (check([
			80,
			75,
			3,
			4
		]) && check([
			77,
			69,
			84,
			65,
			45,
			73,
			78,
			70,
			47,
			109,
			111,
			122,
			105,
			108,
			108,
			97,
			46,
			114,
			115,
			97
		], { offset: 30 })) return {
			ext: "xpi",
			mime: "application/x-xpinstall"
		};
		if (check([80, 75]) && (buf[2] === 3 || buf[2] === 5 || buf[2] === 7) && (buf[3] === 4 || buf[3] === 6 || buf[3] === 8)) return {
			ext: "zip",
			mime: "application/zip"
		};
		if (check([
			117,
			115,
			116,
			97,
			114
		], { offset: 257 })) return {
			ext: "tar",
			mime: "application/x-tar"
		};
		if (check([
			82,
			97,
			114,
			33,
			26,
			7
		]) && (buf[6] === 0 || buf[6] === 1)) return {
			ext: "rar",
			mime: "application/x-rar-compressed"
		};
		if (check([
			31,
			139,
			8
		])) return {
			ext: "gz",
			mime: "application/gzip"
		};
		if (check([
			66,
			90,
			104
		])) return {
			ext: "bz2",
			mime: "application/x-bzip2"
		};
		if (check([
			55,
			122,
			188,
			175,
			39,
			28
		])) return {
			ext: "7z",
			mime: "application/x-7z-compressed"
		};
		if (check([120, 1])) return {
			ext: "dmg",
			mime: "application/x-apple-diskimage"
		};
		if (check([
			0,
			0,
			0
		]) && (buf[3] === 24 || buf[3] === 32) && check([
			102,
			116,
			121,
			112
		], { offset: 4 }) || check([
			51,
			103,
			112,
			53
		]) || check([
			0,
			0,
			0,
			28,
			102,
			116,
			121,
			112,
			109,
			112,
			52,
			50
		]) && check([
			109,
			112,
			52,
			49,
			109,
			112,
			52,
			50,
			105,
			115,
			111,
			109
		], { offset: 16 }) || check([
			0,
			0,
			0,
			28,
			102,
			116,
			121,
			112,
			105,
			115,
			111,
			109
		]) || check([
			0,
			0,
			0,
			28,
			102,
			116,
			121,
			112,
			109,
			112,
			52,
			50,
			0,
			0,
			0,
			0
		])) return {
			ext: "mp4",
			mime: "video/mp4"
		};
		if (check([
			0,
			0,
			0,
			28,
			102,
			116,
			121,
			112,
			77,
			52,
			86
		])) return {
			ext: "m4v",
			mime: "video/x-m4v"
		};
		if (check([
			77,
			84,
			104,
			100
		])) return {
			ext: "mid",
			mime: "audio/midi"
		};
		if (check([
			26,
			69,
			223,
			163
		])) {
			const sliced = buf.subarray(4, 4100);
			const idPos = sliced.findIndex((el, i, arr) => arr[i] === 66 && arr[i + 1] === 130);
			if (idPos >= 0) {
				const docTypePos = idPos + 3;
				const findDocType = (type) => Array.from(type).every((c, i) => sliced[docTypePos + i] === c.charCodeAt(0));
				if (findDocType("matroska")) return {
					ext: "mkv",
					mime: "video/x-matroska"
				};
				if (findDocType("webm")) return {
					ext: "webm",
					mime: "video/webm"
				};
			}
		}
		if (check([
			0,
			0,
			0,
			20,
			102,
			116,
			121,
			112,
			113,
			116,
			32,
			32
		]) || check([
			102,
			114,
			101,
			101
		], { offset: 4 }) || check([
			102,
			116,
			121,
			112,
			113,
			116,
			32,
			32
		], { offset: 4 }) || check([
			109,
			100,
			97,
			116
		], { offset: 4 }) || check([
			119,
			105,
			100,
			101
		], { offset: 4 })) return {
			ext: "mov",
			mime: "video/quicktime"
		};
		if (check([
			82,
			73,
			70,
			70
		]) && check([
			65,
			86,
			73
		], { offset: 8 })) return {
			ext: "avi",
			mime: "video/x-msvideo"
		};
		if (check([
			48,
			38,
			178,
			117,
			142,
			102,
			207,
			17,
			166,
			217
		])) return {
			ext: "wmv",
			mime: "video/x-ms-wmv"
		};
		if (check([
			0,
			0,
			1,
			186
		])) return {
			ext: "mpg",
			mime: "video/mpeg"
		};
		if (check([
			73,
			68,
			51
		]) || check([255, 251])) return {
			ext: "mp3",
			mime: "audio/mpeg"
		};
		if (check([
			102,
			116,
			121,
			112,
			77,
			52,
			65
		], { offset: 4 }) || check([
			77,
			52,
			65,
			32
		])) return {
			ext: "m4a",
			mime: "audio/m4a"
		};
		if (check([
			79,
			112,
			117,
			115,
			72,
			101,
			97,
			100
		], { offset: 28 })) return {
			ext: "opus",
			mime: "audio/opus"
		};
		if (check([
			79,
			103,
			103,
			83
		])) return {
			ext: "ogg",
			mime: "audio/ogg"
		};
		if (check([
			102,
			76,
			97,
			67
		])) return {
			ext: "flac",
			mime: "audio/x-flac"
		};
		if (check([
			82,
			73,
			70,
			70
		]) && check([
			87,
			65,
			86,
			69
		], { offset: 8 })) return {
			ext: "wav",
			mime: "audio/x-wav"
		};
		if (check([
			35,
			33,
			65,
			77,
			82,
			10
		])) return {
			ext: "amr",
			mime: "audio/amr"
		};
		if (check([
			37,
			80,
			68,
			70
		])) return {
			ext: "pdf",
			mime: "application/pdf"
		};
		if (check([77, 90])) return {
			ext: "exe",
			mime: "application/x-msdownload"
		};
		if ((buf[0] === 67 || buf[0] === 70) && check([87, 83], { offset: 1 })) return {
			ext: "swf",
			mime: "application/x-shockwave-flash"
		};
		if (check([
			123,
			92,
			114,
			116,
			102
		])) return {
			ext: "rtf",
			mime: "application/rtf"
		};
		if (check([
			0,
			97,
			115,
			109
		])) return {
			ext: "wasm",
			mime: "application/wasm"
		};
		if (check([
			119,
			79,
			70,
			70
		]) && (check([
			0,
			1,
			0,
			0
		], { offset: 4 }) || check([
			79,
			84,
			84,
			79
		], { offset: 4 }))) return {
			ext: "woff",
			mime: "font/woff"
		};
		if (check([
			119,
			79,
			70,
			50
		]) && (check([
			0,
			1,
			0,
			0
		], { offset: 4 }) || check([
			79,
			84,
			84,
			79
		], { offset: 4 }))) return {
			ext: "woff2",
			mime: "font/woff2"
		};
		if (check([76, 80], { offset: 34 }) && (check([
			0,
			0,
			1
		], { offset: 8 }) || check([
			1,
			0,
			2
		], { offset: 8 }) || check([
			2,
			0,
			2
		], { offset: 8 }))) return {
			ext: "eot",
			mime: "application/octet-stream"
		};
		if (check([
			0,
			1,
			0,
			0,
			0
		])) return {
			ext: "ttf",
			mime: "font/ttf"
		};
		if (check([
			79,
			84,
			84,
			79,
			0
		])) return {
			ext: "otf",
			mime: "font/otf"
		};
		if (check([
			0,
			0,
			1,
			0
		])) return {
			ext: "ico",
			mime: "image/x-icon"
		};
		if (check([
			70,
			76,
			86,
			1
		])) return {
			ext: "flv",
			mime: "video/x-flv"
		};
		if (check([37, 33])) return {
			ext: "ps",
			mime: "application/postscript"
		};
		if (check([
			253,
			55,
			122,
			88,
			90,
			0
		])) return {
			ext: "xz",
			mime: "application/x-xz"
		};
		if (check([
			83,
			81,
			76,
			105
		])) return {
			ext: "sqlite",
			mime: "application/x-sqlite3"
		};
		if (check([
			78,
			69,
			83,
			26
		])) return {
			ext: "nes",
			mime: "application/x-nintendo-nes-rom"
		};
		if (check([
			67,
			114,
			50,
			52
		])) return {
			ext: "crx",
			mime: "application/x-google-chrome-extension"
		};
		if (check([
			77,
			83,
			67,
			70
		]) || check([
			73,
			83,
			99,
			40
		])) return {
			ext: "cab",
			mime: "application/vnd.ms-cab-compressed"
		};
		if (check([
			33,
			60,
			97,
			114,
			99,
			104,
			62,
			10,
			100,
			101,
			98,
			105,
			97,
			110,
			45,
			98,
			105,
			110,
			97,
			114,
			121
		])) return {
			ext: "deb",
			mime: "application/x-deb"
		};
		if (check([
			33,
			60,
			97,
			114,
			99,
			104,
			62
		])) return {
			ext: "ar",
			mime: "application/x-unix-archive"
		};
		if (check([
			237,
			171,
			238,
			219
		])) return {
			ext: "rpm",
			mime: "application/x-rpm"
		};
		if (check([31, 160]) || check([31, 157])) return {
			ext: "Z",
			mime: "application/x-compress"
		};
		if (check([
			76,
			90,
			73,
			80
		])) return {
			ext: "lz",
			mime: "application/x-lzip"
		};
		if (check([
			208,
			207,
			17,
			224,
			161,
			177,
			26,
			225
		])) return {
			ext: "msi",
			mime: "application/x-msi"
		};
		if (check([
			6,
			14,
			43,
			52,
			2,
			5,
			1,
			1,
			13,
			1,
			2,
			1,
			1,
			2
		])) return {
			ext: "mxf",
			mime: "application/mxf"
		};
		if (check([71], { offset: 4 }) && (check([71], { offset: 192 }) || check([71], { offset: 196 }))) return {
			ext: "mts",
			mime: "video/mp2t"
		};
		if (check([
			66,
			76,
			69,
			78,
			68,
			69,
			82
		])) return {
			ext: "blend",
			mime: "application/x-blender"
		};
		if (check([
			66,
			80,
			71,
			251
		])) return {
			ext: "bpg",
			mime: "image/bpg"
		};
		return null;
	};
}));
//#endregion
//#region extension/node_modules/is-stream/index.js
var require_is_stream = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var isStream = module.exports = function(stream) {
		return stream !== null && typeof stream === "object" && typeof stream.pipe === "function";
	};
	isStream.writable = function(stream) {
		return isStream(stream) && stream.writable !== false && typeof stream._write === "function" && typeof stream._writableState === "object";
	};
	isStream.readable = function(stream) {
		return isStream(stream) && stream.readable !== false && typeof stream._read === "function" && typeof stream._readableState === "object";
	};
	isStream.duplex = function(stream) {
		return isStream.writable(stream) && isStream.readable(stream);
	};
	isStream.transform = function(stream) {
		return isStream.duplex(stream) && typeof stream._transform === "function" && typeof stream._transformState === "object";
	};
}));
//#endregion
//#region extension/node_modules/process-nextick-args/index.js
var require_process_nextick_args = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	if (typeof process === "undefined" || !process.version || process.version.indexOf("v0.") === 0 || process.version.indexOf("v1.") === 0 && process.version.indexOf("v1.8.") !== 0) module.exports = { nextTick };
	else module.exports = process;
	function nextTick(fn, arg1, arg2, arg3) {
		if (typeof fn !== "function") throw new TypeError("\"callback\" argument must be a function");
		var len = arguments.length;
		var args, i;
		switch (len) {
			case 0:
			case 1: return process.nextTick(fn);
			case 2: return process.nextTick(function afterTickOne() {
				fn.call(null, arg1);
			});
			case 3: return process.nextTick(function afterTickTwo() {
				fn.call(null, arg1, arg2);
			});
			case 4: return process.nextTick(function afterTickThree() {
				fn.call(null, arg1, arg2, arg3);
			});
			default:
				args = new Array(len - 1);
				i = 0;
				while (i < args.length) args[i++] = arguments[i];
				return process.nextTick(function afterTick() {
					fn.apply(null, args);
				});
		}
	}
}));
//#endregion
//#region extension/node_modules/isarray/index.js
var require_isarray$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var toString = {}.toString;
	module.exports = Array.isArray || function(arr) {
		return toString.call(arr) == "[object Array]";
	};
}));
//#endregion
//#region extension/node_modules/readable-stream/lib/internal/streams/stream.js
var require_stream$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require("stream");
}));
//#endregion
//#region extension/node_modules/readable-stream/node_modules/safe-buffer/index.js
var require_safe_buffer$2 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var buffer$2 = require("buffer");
	var Buffer = buffer$2.Buffer;
	function copyProps(src, dst) {
		for (var key in src) dst[key] = src[key];
	}
	if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) module.exports = buffer$2;
	else {
		copyProps(buffer$2, exports);
		exports.Buffer = SafeBuffer;
	}
	function SafeBuffer(arg, encodingOrOffset, length) {
		return Buffer(arg, encodingOrOffset, length);
	}
	copyProps(Buffer, SafeBuffer);
	SafeBuffer.from = function(arg, encodingOrOffset, length) {
		if (typeof arg === "number") throw new TypeError("Argument must not be a number");
		return Buffer(arg, encodingOrOffset, length);
	};
	SafeBuffer.alloc = function(size, fill, encoding) {
		if (typeof size !== "number") throw new TypeError("Argument must be a number");
		var buf = Buffer(size);
		if (fill !== void 0) if (typeof encoding === "string") buf.fill(fill, encoding);
		else buf.fill(fill);
		else buf.fill(0);
		return buf;
	};
	SafeBuffer.allocUnsafe = function(size) {
		if (typeof size !== "number") throw new TypeError("Argument must be a number");
		return Buffer(size);
	};
	SafeBuffer.allocUnsafeSlow = function(size) {
		if (typeof size !== "number") throw new TypeError("Argument must be a number");
		return buffer$2.SlowBuffer(size);
	};
}));
//#endregion
//#region extension/node_modules/core-util-is/lib/util.js
var require_util = /* @__PURE__ */ __commonJSMin(((exports) => {
	function isArray(arg) {
		if (Array.isArray) return Array.isArray(arg);
		return objectToString(arg) === "[object Array]";
	}
	exports.isArray = isArray;
	function isBoolean(arg) {
		return typeof arg === "boolean";
	}
	exports.isBoolean = isBoolean;
	function isNull(arg) {
		return arg === null;
	}
	exports.isNull = isNull;
	function isNullOrUndefined(arg) {
		return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;
	function isNumber(arg) {
		return typeof arg === "number";
	}
	exports.isNumber = isNumber;
	function isString(arg) {
		return typeof arg === "string";
	}
	exports.isString = isString;
	function isSymbol(arg) {
		return typeof arg === "symbol";
	}
	exports.isSymbol = isSymbol;
	function isUndefined(arg) {
		return arg === void 0;
	}
	exports.isUndefined = isUndefined;
	function isRegExp(re) {
		return objectToString(re) === "[object RegExp]";
	}
	exports.isRegExp = isRegExp;
	function isObject(arg) {
		return typeof arg === "object" && arg !== null;
	}
	exports.isObject = isObject;
	function isDate(d) {
		return objectToString(d) === "[object Date]";
	}
	exports.isDate = isDate;
	function isError(e) {
		return objectToString(e) === "[object Error]" || e instanceof Error;
	}
	exports.isError = isError;
	function isFunction(arg) {
		return typeof arg === "function";
	}
	exports.isFunction = isFunction;
	function isPrimitive(arg) {
		return arg === null || typeof arg === "boolean" || typeof arg === "number" || typeof arg === "string" || typeof arg === "symbol" || typeof arg === "undefined";
	}
	exports.isPrimitive = isPrimitive;
	exports.isBuffer = require("buffer").Buffer.isBuffer;
	function objectToString(o) {
		return Object.prototype.toString.call(o);
	}
}));
//#endregion
//#region extension/node_modules/inherits/inherits_browser.js
var require_inherits_browser = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	if (typeof Object.create === "function") module.exports = function inherits(ctor, superCtor) {
		if (superCtor) {
			ctor.super_ = superCtor;
			ctor.prototype = Object.create(superCtor.prototype, { constructor: {
				value: ctor,
				enumerable: false,
				writable: true,
				configurable: true
			} });
		}
	};
	else module.exports = function inherits(ctor, superCtor) {
		if (superCtor) {
			ctor.super_ = superCtor;
			var TempCtor = function() {};
			TempCtor.prototype = superCtor.prototype;
			ctor.prototype = new TempCtor();
			ctor.prototype.constructor = ctor;
		}
	};
}));
//#endregion
//#region extension/node_modules/inherits/inherits.js
var require_inherits = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	try {
		var util$7 = require("util");
		/* istanbul ignore next */
		if (typeof util$7.inherits !== "function") throw "";
		module.exports = util$7.inherits;
	} catch (e) {
		/* istanbul ignore next */
		module.exports = require_inherits_browser();
	}
}));
//#endregion
//#region extension/node_modules/readable-stream/lib/internal/streams/BufferList.js
var require_BufferList = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
	}
	var Buffer = require_safe_buffer$2().Buffer;
	var util$6 = require("util");
	function copyBuffer(src, target, offset) {
		src.copy(target, offset);
	}
	module.exports = function() {
		function BufferList() {
			_classCallCheck(this, BufferList);
			this.head = null;
			this.tail = null;
			this.length = 0;
		}
		BufferList.prototype.push = function push(v) {
			var entry = {
				data: v,
				next: null
			};
			if (this.length > 0) this.tail.next = entry;
			else this.head = entry;
			this.tail = entry;
			++this.length;
		};
		BufferList.prototype.unshift = function unshift(v) {
			var entry = {
				data: v,
				next: this.head
			};
			if (this.length === 0) this.tail = entry;
			this.head = entry;
			++this.length;
		};
		BufferList.prototype.shift = function shift() {
			if (this.length === 0) return;
			var ret = this.head.data;
			if (this.length === 1) this.head = this.tail = null;
			else this.head = this.head.next;
			--this.length;
			return ret;
		};
		BufferList.prototype.clear = function clear() {
			this.head = this.tail = null;
			this.length = 0;
		};
		BufferList.prototype.join = function join(s) {
			if (this.length === 0) return "";
			var p = this.head;
			var ret = "" + p.data;
			while (p = p.next) ret += s + p.data;
			return ret;
		};
		BufferList.prototype.concat = function concat(n) {
			if (this.length === 0) return Buffer.alloc(0);
			var ret = Buffer.allocUnsafe(n >>> 0);
			var p = this.head;
			var i = 0;
			while (p) {
				copyBuffer(p.data, ret, i);
				i += p.data.length;
				p = p.next;
			}
			return ret;
		};
		return BufferList;
	}();
	if (util$6 && util$6.inspect && util$6.inspect.custom) module.exports.prototype[util$6.inspect.custom] = function() {
		var obj = util$6.inspect({ length: this.length });
		return this.constructor.name + " " + obj;
	};
}));
//#endregion
//#region extension/node_modules/readable-stream/lib/internal/streams/destroy.js
var require_destroy = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var pna = require_process_nextick_args();
	function destroy(err, cb) {
		var _this = this;
		var readableDestroyed = this._readableState && this._readableState.destroyed;
		var writableDestroyed = this._writableState && this._writableState.destroyed;
		if (readableDestroyed || writableDestroyed) {
			if (cb) cb(err);
			else if (err) {
				if (!this._writableState) pna.nextTick(emitErrorNT, this, err);
				else if (!this._writableState.errorEmitted) {
					this._writableState.errorEmitted = true;
					pna.nextTick(emitErrorNT, this, err);
				}
			}
			return this;
		}
		if (this._readableState) this._readableState.destroyed = true;
		if (this._writableState) this._writableState.destroyed = true;
		this._destroy(err || null, function(err) {
			if (!cb && err) {
				if (!_this._writableState) pna.nextTick(emitErrorNT, _this, err);
				else if (!_this._writableState.errorEmitted) {
					_this._writableState.errorEmitted = true;
					pna.nextTick(emitErrorNT, _this, err);
				}
			} else if (cb) cb(err);
		});
		return this;
	}
	function undestroy() {
		if (this._readableState) {
			this._readableState.destroyed = false;
			this._readableState.reading = false;
			this._readableState.ended = false;
			this._readableState.endEmitted = false;
		}
		if (this._writableState) {
			this._writableState.destroyed = false;
			this._writableState.ended = false;
			this._writableState.ending = false;
			this._writableState.finalCalled = false;
			this._writableState.prefinished = false;
			this._writableState.finished = false;
			this._writableState.errorEmitted = false;
		}
	}
	function emitErrorNT(self, err) {
		self.emit("error", err);
	}
	module.exports = {
		destroy,
		undestroy
	};
}));
//#endregion
//#region extension/node_modules/util-deprecate/node.js
var require_node = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* For Node.js, simply re-export the core `util.deprecate` function.
	*/
	module.exports = require("util").deprecate;
}));
//#endregion
//#region extension/node_modules/readable-stream/lib/_stream_writable.js
var require__stream_writable = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var pna = require_process_nextick_args();
	module.exports = Writable;
	function CorkedRequest(state) {
		var _this = this;
		this.next = null;
		this.entry = null;
		this.finish = function() {
			onCorkedFinish(_this, state);
		};
	}
	var asyncWrite = !process.browser && ["v0.10", "v0.9."].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : pna.nextTick;
	var Duplex;
	Writable.WritableState = WritableState;
	var util = Object.create(require_util());
	util.inherits = require_inherits();
	var internalUtil = { deprecate: require_node() };
	var Stream = require_stream$1();
	var Buffer = require_safe_buffer$2().Buffer;
	var OurUint8Array = (typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : {}).Uint8Array || function() {};
	function _uint8ArrayToBuffer(chunk) {
		return Buffer.from(chunk);
	}
	function _isUint8Array(obj) {
		return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
	}
	var destroyImpl = require_destroy();
	util.inherits(Writable, Stream);
	function nop() {}
	function WritableState(options, stream) {
		Duplex = Duplex || require__stream_duplex();
		options = options || {};
		var isDuplex = stream instanceof Duplex;
		this.objectMode = !!options.objectMode;
		if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode;
		var hwm = options.highWaterMark;
		var writableHwm = options.writableHighWaterMark;
		var defaultHwm = this.objectMode ? 16 : 16 * 1024;
		if (hwm || hwm === 0) this.highWaterMark = hwm;
		else if (isDuplex && (writableHwm || writableHwm === 0)) this.highWaterMark = writableHwm;
		else this.highWaterMark = defaultHwm;
		this.highWaterMark = Math.floor(this.highWaterMark);
		this.finalCalled = false;
		this.needDrain = false;
		this.ending = false;
		this.ended = false;
		this.finished = false;
		this.destroyed = false;
		var noDecode = options.decodeStrings === false;
		this.decodeStrings = !noDecode;
		this.defaultEncoding = options.defaultEncoding || "utf8";
		this.length = 0;
		this.writing = false;
		this.corked = 0;
		this.sync = true;
		this.bufferProcessing = false;
		this.onwrite = function(er) {
			onwrite(stream, er);
		};
		this.writecb = null;
		this.writelen = 0;
		this.bufferedRequest = null;
		this.lastBufferedRequest = null;
		this.pendingcb = 0;
		this.prefinished = false;
		this.errorEmitted = false;
		this.bufferedRequestCount = 0;
		this.corkedRequestsFree = new CorkedRequest(this);
	}
	WritableState.prototype.getBuffer = function getBuffer() {
		var current = this.bufferedRequest;
		var out = [];
		while (current) {
			out.push(current);
			current = current.next;
		}
		return out;
	};
	(function() {
		try {
			Object.defineProperty(WritableState.prototype, "buffer", { get: internalUtil.deprecate(function() {
				return this.getBuffer();
			}, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003") });
		} catch (_) {}
	})();
	var realHasInstance;
	if (typeof Symbol === "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === "function") {
		realHasInstance = Function.prototype[Symbol.hasInstance];
		Object.defineProperty(Writable, Symbol.hasInstance, { value: function(object) {
			if (realHasInstance.call(this, object)) return true;
			if (this !== Writable) return false;
			return object && object._writableState instanceof WritableState;
		} });
	} else realHasInstance = function(object) {
		return object instanceof this;
	};
	function Writable(options) {
		Duplex = Duplex || require__stream_duplex();
		if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) return new Writable(options);
		this._writableState = new WritableState(options, this);
		this.writable = true;
		if (options) {
			if (typeof options.write === "function") this._write = options.write;
			if (typeof options.writev === "function") this._writev = options.writev;
			if (typeof options.destroy === "function") this._destroy = options.destroy;
			if (typeof options.final === "function") this._final = options.final;
		}
		Stream.call(this);
	}
	Writable.prototype.pipe = function() {
		this.emit("error", /* @__PURE__ */ new Error("Cannot pipe, not readable"));
	};
	function writeAfterEnd(stream, cb) {
		var er = /* @__PURE__ */ new Error("write after end");
		stream.emit("error", er);
		pna.nextTick(cb, er);
	}
	function validChunk(stream, state, chunk, cb) {
		var valid = true;
		var er = false;
		if (chunk === null) er = /* @__PURE__ */ new TypeError("May not write null values to stream");
		else if (typeof chunk !== "string" && chunk !== void 0 && !state.objectMode) er = /* @__PURE__ */ new TypeError("Invalid non-string/buffer chunk");
		if (er) {
			stream.emit("error", er);
			pna.nextTick(cb, er);
			valid = false;
		}
		return valid;
	}
	Writable.prototype.write = function(chunk, encoding, cb) {
		var state = this._writableState;
		var ret = false;
		var isBuf = !state.objectMode && _isUint8Array(chunk);
		if (isBuf && !Buffer.isBuffer(chunk)) chunk = _uint8ArrayToBuffer(chunk);
		if (typeof encoding === "function") {
			cb = encoding;
			encoding = null;
		}
		if (isBuf) encoding = "buffer";
		else if (!encoding) encoding = state.defaultEncoding;
		if (typeof cb !== "function") cb = nop;
		if (state.ended) writeAfterEnd(this, cb);
		else if (isBuf || validChunk(this, state, chunk, cb)) {
			state.pendingcb++;
			ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
		}
		return ret;
	};
	Writable.prototype.cork = function() {
		var state = this._writableState;
		state.corked++;
	};
	Writable.prototype.uncork = function() {
		var state = this._writableState;
		if (state.corked) {
			state.corked--;
			if (!state.writing && !state.corked && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
		}
	};
	Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
		if (typeof encoding === "string") encoding = encoding.toLowerCase();
		if (!([
			"hex",
			"utf8",
			"utf-8",
			"ascii",
			"binary",
			"base64",
			"ucs2",
			"ucs-2",
			"utf16le",
			"utf-16le",
			"raw"
		].indexOf((encoding + "").toLowerCase()) > -1)) throw new TypeError("Unknown encoding: " + encoding);
		this._writableState.defaultEncoding = encoding;
		return this;
	};
	function decodeChunk(state, chunk, encoding) {
		if (!state.objectMode && state.decodeStrings !== false && typeof chunk === "string") chunk = Buffer.from(chunk, encoding);
		return chunk;
	}
	Object.defineProperty(Writable.prototype, "writableHighWaterMark", {
		enumerable: false,
		get: function() {
			return this._writableState.highWaterMark;
		}
	});
	function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
		if (!isBuf) {
			var newChunk = decodeChunk(state, chunk, encoding);
			if (chunk !== newChunk) {
				isBuf = true;
				encoding = "buffer";
				chunk = newChunk;
			}
		}
		var len = state.objectMode ? 1 : chunk.length;
		state.length += len;
		var ret = state.length < state.highWaterMark;
		if (!ret) state.needDrain = true;
		if (state.writing || state.corked) {
			var last = state.lastBufferedRequest;
			state.lastBufferedRequest = {
				chunk,
				encoding,
				isBuf,
				callback: cb,
				next: null
			};
			if (last) last.next = state.lastBufferedRequest;
			else state.bufferedRequest = state.lastBufferedRequest;
			state.bufferedRequestCount += 1;
		} else doWrite(stream, state, false, len, chunk, encoding, cb);
		return ret;
	}
	function doWrite(stream, state, writev, len, chunk, encoding, cb) {
		state.writelen = len;
		state.writecb = cb;
		state.writing = true;
		state.sync = true;
		if (writev) stream._writev(chunk, state.onwrite);
		else stream._write(chunk, encoding, state.onwrite);
		state.sync = false;
	}
	function onwriteError(stream, state, sync, er, cb) {
		--state.pendingcb;
		if (sync) {
			pna.nextTick(cb, er);
			pna.nextTick(finishMaybe, stream, state);
			stream._writableState.errorEmitted = true;
			stream.emit("error", er);
		} else {
			cb(er);
			stream._writableState.errorEmitted = true;
			stream.emit("error", er);
			finishMaybe(stream, state);
		}
	}
	function onwriteStateUpdate(state) {
		state.writing = false;
		state.writecb = null;
		state.length -= state.writelen;
		state.writelen = 0;
	}
	function onwrite(stream, er) {
		var state = stream._writableState;
		var sync = state.sync;
		var cb = state.writecb;
		onwriteStateUpdate(state);
		if (er) onwriteError(stream, state, sync, er, cb);
		else {
			var finished = needFinish(state);
			if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) clearBuffer(stream, state);
			if (sync) asyncWrite(afterWrite, stream, state, finished, cb);
			else afterWrite(stream, state, finished, cb);
		}
	}
	function afterWrite(stream, state, finished, cb) {
		if (!finished) onwriteDrain(stream, state);
		state.pendingcb--;
		cb();
		finishMaybe(stream, state);
	}
	function onwriteDrain(stream, state) {
		if (state.length === 0 && state.needDrain) {
			state.needDrain = false;
			stream.emit("drain");
		}
	}
	function clearBuffer(stream, state) {
		state.bufferProcessing = true;
		var entry = state.bufferedRequest;
		if (stream._writev && entry && entry.next) {
			var l = state.bufferedRequestCount;
			var buffer = new Array(l);
			var holder = state.corkedRequestsFree;
			holder.entry = entry;
			var count = 0;
			var allBuffers = true;
			while (entry) {
				buffer[count] = entry;
				if (!entry.isBuf) allBuffers = false;
				entry = entry.next;
				count += 1;
			}
			buffer.allBuffers = allBuffers;
			doWrite(stream, state, true, state.length, buffer, "", holder.finish);
			state.pendingcb++;
			state.lastBufferedRequest = null;
			if (holder.next) {
				state.corkedRequestsFree = holder.next;
				holder.next = null;
			} else state.corkedRequestsFree = new CorkedRequest(state);
			state.bufferedRequestCount = 0;
		} else {
			while (entry) {
				var chunk = entry.chunk;
				var encoding = entry.encoding;
				var cb = entry.callback;
				doWrite(stream, state, false, state.objectMode ? 1 : chunk.length, chunk, encoding, cb);
				entry = entry.next;
				state.bufferedRequestCount--;
				if (state.writing) break;
			}
			if (entry === null) state.lastBufferedRequest = null;
		}
		state.bufferedRequest = entry;
		state.bufferProcessing = false;
	}
	Writable.prototype._write = function(chunk, encoding, cb) {
		cb(/* @__PURE__ */ new Error("_write() is not implemented"));
	};
	Writable.prototype._writev = null;
	Writable.prototype.end = function(chunk, encoding, cb) {
		var state = this._writableState;
		if (typeof chunk === "function") {
			cb = chunk;
			chunk = null;
			encoding = null;
		} else if (typeof encoding === "function") {
			cb = encoding;
			encoding = null;
		}
		if (chunk !== null && chunk !== void 0) this.write(chunk, encoding);
		if (state.corked) {
			state.corked = 1;
			this.uncork();
		}
		if (!state.ending) endWritable(this, state, cb);
	};
	function needFinish(state) {
		return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
	}
	function callFinal(stream, state) {
		stream._final(function(err) {
			state.pendingcb--;
			if (err) stream.emit("error", err);
			state.prefinished = true;
			stream.emit("prefinish");
			finishMaybe(stream, state);
		});
	}
	function prefinish(stream, state) {
		if (!state.prefinished && !state.finalCalled) if (typeof stream._final === "function") {
			state.pendingcb++;
			state.finalCalled = true;
			pna.nextTick(callFinal, stream, state);
		} else {
			state.prefinished = true;
			stream.emit("prefinish");
		}
	}
	function finishMaybe(stream, state) {
		var need = needFinish(state);
		if (need) {
			prefinish(stream, state);
			if (state.pendingcb === 0) {
				state.finished = true;
				stream.emit("finish");
			}
		}
		return need;
	}
	function endWritable(stream, state, cb) {
		state.ending = true;
		finishMaybe(stream, state);
		if (cb) if (state.finished) pna.nextTick(cb);
		else stream.once("finish", cb);
		state.ended = true;
		stream.writable = false;
	}
	function onCorkedFinish(corkReq, state, err) {
		var entry = corkReq.entry;
		corkReq.entry = null;
		while (entry) {
			var cb = entry.callback;
			state.pendingcb--;
			cb(err);
			entry = entry.next;
		}
		state.corkedRequestsFree.next = corkReq;
	}
	Object.defineProperty(Writable.prototype, "destroyed", {
		get: function() {
			if (this._writableState === void 0) return false;
			return this._writableState.destroyed;
		},
		set: function(value) {
			if (!this._writableState) return;
			this._writableState.destroyed = value;
		}
	});
	Writable.prototype.destroy = destroyImpl.destroy;
	Writable.prototype._undestroy = destroyImpl.undestroy;
	Writable.prototype._destroy = function(err, cb) {
		this.end();
		cb(err);
	};
}));
//#endregion
//#region extension/node_modules/readable-stream/lib/_stream_duplex.js
var require__stream_duplex = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var pna = require_process_nextick_args();
	var objectKeys = Object.keys || function(obj) {
		var keys = [];
		for (var key in obj) keys.push(key);
		return keys;
	};
	module.exports = Duplex;
	var util = Object.create(require_util());
	util.inherits = require_inherits();
	var Readable = require__stream_readable();
	var Writable = require__stream_writable();
	util.inherits(Duplex, Readable);
	var keys = objectKeys(Writable.prototype);
	for (var v = 0; v < keys.length; v++) {
		var method = keys[v];
		if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
	}
	function Duplex(options) {
		if (!(this instanceof Duplex)) return new Duplex(options);
		Readable.call(this, options);
		Writable.call(this, options);
		if (options && options.readable === false) this.readable = false;
		if (options && options.writable === false) this.writable = false;
		this.allowHalfOpen = true;
		if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;
		this.once("end", onend);
	}
	Object.defineProperty(Duplex.prototype, "writableHighWaterMark", {
		enumerable: false,
		get: function() {
			return this._writableState.highWaterMark;
		}
	});
	function onend() {
		if (this.allowHalfOpen || this._writableState.ended) return;
		pna.nextTick(onEndNT, this);
	}
	function onEndNT(self) {
		self.end();
	}
	Object.defineProperty(Duplex.prototype, "destroyed", {
		get: function() {
			if (this._readableState === void 0 || this._writableState === void 0) return false;
			return this._readableState.destroyed && this._writableState.destroyed;
		},
		set: function(value) {
			if (this._readableState === void 0 || this._writableState === void 0) return;
			this._readableState.destroyed = value;
			this._writableState.destroyed = value;
		}
	});
	Duplex.prototype._destroy = function(err, cb) {
		this.push(null);
		this.end();
		pna.nextTick(cb, err);
	};
}));
//#endregion
//#region extension/node_modules/string_decoder/node_modules/safe-buffer/index.js
var require_safe_buffer$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var buffer$1 = require("buffer");
	var Buffer = buffer$1.Buffer;
	function copyProps(src, dst) {
		for (var key in src) dst[key] = src[key];
	}
	if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) module.exports = buffer$1;
	else {
		copyProps(buffer$1, exports);
		exports.Buffer = SafeBuffer;
	}
	function SafeBuffer(arg, encodingOrOffset, length) {
		return Buffer(arg, encodingOrOffset, length);
	}
	copyProps(Buffer, SafeBuffer);
	SafeBuffer.from = function(arg, encodingOrOffset, length) {
		if (typeof arg === "number") throw new TypeError("Argument must not be a number");
		return Buffer(arg, encodingOrOffset, length);
	};
	SafeBuffer.alloc = function(size, fill, encoding) {
		if (typeof size !== "number") throw new TypeError("Argument must be a number");
		var buf = Buffer(size);
		if (fill !== void 0) if (typeof encoding === "string") buf.fill(fill, encoding);
		else buf.fill(fill);
		else buf.fill(0);
		return buf;
	};
	SafeBuffer.allocUnsafe = function(size) {
		if (typeof size !== "number") throw new TypeError("Argument must be a number");
		return Buffer(size);
	};
	SafeBuffer.allocUnsafeSlow = function(size) {
		if (typeof size !== "number") throw new TypeError("Argument must be a number");
		return buffer$1.SlowBuffer(size);
	};
}));
//#endregion
//#region extension/node_modules/string_decoder/lib/string_decoder.js
var require_string_decoder = /* @__PURE__ */ __commonJSMin(((exports) => {
	var Buffer = require_safe_buffer$1().Buffer;
	var isEncoding = Buffer.isEncoding || function(encoding) {
		encoding = "" + encoding;
		switch (encoding && encoding.toLowerCase()) {
			case "hex":
			case "utf8":
			case "utf-8":
			case "ascii":
			case "binary":
			case "base64":
			case "ucs2":
			case "ucs-2":
			case "utf16le":
			case "utf-16le":
			case "raw": return true;
			default: return false;
		}
	};
	function _normalizeEncoding(enc) {
		if (!enc) return "utf8";
		var retried;
		while (true) switch (enc) {
			case "utf8":
			case "utf-8": return "utf8";
			case "ucs2":
			case "ucs-2":
			case "utf16le":
			case "utf-16le": return "utf16le";
			case "latin1":
			case "binary": return "latin1";
			case "base64":
			case "ascii":
			case "hex": return enc;
			default:
				if (retried) return;
				enc = ("" + enc).toLowerCase();
				retried = true;
		}
	}
	function normalizeEncoding(enc) {
		var nenc = _normalizeEncoding(enc);
		if (typeof nenc !== "string" && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error("Unknown encoding: " + enc);
		return nenc || enc;
	}
	exports.StringDecoder = StringDecoder;
	function StringDecoder(encoding) {
		this.encoding = normalizeEncoding(encoding);
		var nb;
		switch (this.encoding) {
			case "utf16le":
				this.text = utf16Text;
				this.end = utf16End;
				nb = 4;
				break;
			case "utf8":
				this.fillLast = utf8FillLast;
				nb = 4;
				break;
			case "base64":
				this.text = base64Text;
				this.end = base64End;
				nb = 3;
				break;
			default:
				this.write = simpleWrite;
				this.end = simpleEnd;
				return;
		}
		this.lastNeed = 0;
		this.lastTotal = 0;
		this.lastChar = Buffer.allocUnsafe(nb);
	}
	StringDecoder.prototype.write = function(buf) {
		if (buf.length === 0) return "";
		var r;
		var i;
		if (this.lastNeed) {
			r = this.fillLast(buf);
			if (r === void 0) return "";
			i = this.lastNeed;
			this.lastNeed = 0;
		} else i = 0;
		if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
		return r || "";
	};
	StringDecoder.prototype.end = utf8End;
	StringDecoder.prototype.text = utf8Text;
	StringDecoder.prototype.fillLast = function(buf) {
		if (this.lastNeed <= buf.length) {
			buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
			return this.lastChar.toString(this.encoding, 0, this.lastTotal);
		}
		buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
		this.lastNeed -= buf.length;
	};
	function utf8CheckByte(byte) {
		if (byte <= 127) return 0;
		else if (byte >> 5 === 6) return 2;
		else if (byte >> 4 === 14) return 3;
		else if (byte >> 3 === 30) return 4;
		return byte >> 6 === 2 ? -1 : -2;
	}
	function utf8CheckIncomplete(self, buf, i) {
		var j = buf.length - 1;
		if (j < i) return 0;
		var nb = utf8CheckByte(buf[j]);
		if (nb >= 0) {
			if (nb > 0) self.lastNeed = nb - 1;
			return nb;
		}
		if (--j < i || nb === -2) return 0;
		nb = utf8CheckByte(buf[j]);
		if (nb >= 0) {
			if (nb > 0) self.lastNeed = nb - 2;
			return nb;
		}
		if (--j < i || nb === -2) return 0;
		nb = utf8CheckByte(buf[j]);
		if (nb >= 0) {
			if (nb > 0) if (nb === 2) nb = 0;
			else self.lastNeed = nb - 3;
			return nb;
		}
		return 0;
	}
	function utf8CheckExtraBytes(self, buf, p) {
		if ((buf[0] & 192) !== 128) {
			self.lastNeed = 0;
			return "�";
		}
		if (self.lastNeed > 1 && buf.length > 1) {
			if ((buf[1] & 192) !== 128) {
				self.lastNeed = 1;
				return "�";
			}
			if (self.lastNeed > 2 && buf.length > 2) {
				if ((buf[2] & 192) !== 128) {
					self.lastNeed = 2;
					return "�";
				}
			}
		}
	}
	function utf8FillLast(buf) {
		var p = this.lastTotal - this.lastNeed;
		var r = utf8CheckExtraBytes(this, buf, p);
		if (r !== void 0) return r;
		if (this.lastNeed <= buf.length) {
			buf.copy(this.lastChar, p, 0, this.lastNeed);
			return this.lastChar.toString(this.encoding, 0, this.lastTotal);
		}
		buf.copy(this.lastChar, p, 0, buf.length);
		this.lastNeed -= buf.length;
	}
	function utf8Text(buf, i) {
		var total = utf8CheckIncomplete(this, buf, i);
		if (!this.lastNeed) return buf.toString("utf8", i);
		this.lastTotal = total;
		var end = buf.length - (total - this.lastNeed);
		buf.copy(this.lastChar, 0, end);
		return buf.toString("utf8", i, end);
	}
	function utf8End(buf) {
		var r = buf && buf.length ? this.write(buf) : "";
		if (this.lastNeed) return r + "�";
		return r;
	}
	function utf16Text(buf, i) {
		if ((buf.length - i) % 2 === 0) {
			var r = buf.toString("utf16le", i);
			if (r) {
				var c = r.charCodeAt(r.length - 1);
				if (c >= 55296 && c <= 56319) {
					this.lastNeed = 2;
					this.lastTotal = 4;
					this.lastChar[0] = buf[buf.length - 2];
					this.lastChar[1] = buf[buf.length - 1];
					return r.slice(0, -1);
				}
			}
			return r;
		}
		this.lastNeed = 1;
		this.lastTotal = 2;
		this.lastChar[0] = buf[buf.length - 1];
		return buf.toString("utf16le", i, buf.length - 1);
	}
	function utf16End(buf) {
		var r = buf && buf.length ? this.write(buf) : "";
		if (this.lastNeed) {
			var end = this.lastTotal - this.lastNeed;
			return r + this.lastChar.toString("utf16le", 0, end);
		}
		return r;
	}
	function base64Text(buf, i) {
		var n = (buf.length - i) % 3;
		if (n === 0) return buf.toString("base64", i);
		this.lastNeed = 3 - n;
		this.lastTotal = 3;
		if (n === 1) this.lastChar[0] = buf[buf.length - 1];
		else {
			this.lastChar[0] = buf[buf.length - 2];
			this.lastChar[1] = buf[buf.length - 1];
		}
		return buf.toString("base64", i, buf.length - n);
	}
	function base64End(buf) {
		var r = buf && buf.length ? this.write(buf) : "";
		if (this.lastNeed) return r + this.lastChar.toString("base64", 0, 3 - this.lastNeed);
		return r;
	}
	function simpleWrite(buf) {
		return buf.toString(this.encoding);
	}
	function simpleEnd(buf) {
		return buf && buf.length ? this.write(buf) : "";
	}
}));
//#endregion
//#region extension/node_modules/readable-stream/lib/_stream_readable.js
var require__stream_readable = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var pna = require_process_nextick_args();
	module.exports = Readable;
	var isArray = require_isarray$1();
	var Duplex;
	Readable.ReadableState = ReadableState;
	require("events").EventEmitter;
	var EElistenerCount = function(emitter, type) {
		return emitter.listeners(type).length;
	};
	var Stream = require_stream$1();
	var Buffer = require_safe_buffer$2().Buffer;
	var OurUint8Array = (typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : {}).Uint8Array || function() {};
	function _uint8ArrayToBuffer(chunk) {
		return Buffer.from(chunk);
	}
	function _isUint8Array(obj) {
		return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
	}
	var util = Object.create(require_util());
	util.inherits = require_inherits();
	var debugUtil = require("util");
	var debug = void 0;
	if (debugUtil && debugUtil.debuglog) debug = debugUtil.debuglog("stream");
	else debug = function() {};
	var BufferList = require_BufferList();
	var destroyImpl = require_destroy();
	var StringDecoder;
	util.inherits(Readable, Stream);
	var kProxyEvents = [
		"error",
		"close",
		"destroy",
		"pause",
		"resume"
	];
	function prependListener(emitter, event, fn) {
		if (typeof emitter.prependListener === "function") return emitter.prependListener(event, fn);
		if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);
		else if (isArray(emitter._events[event])) emitter._events[event].unshift(fn);
		else emitter._events[event] = [fn, emitter._events[event]];
	}
	function ReadableState(options, stream) {
		Duplex = Duplex || require__stream_duplex();
		options = options || {};
		var isDuplex = stream instanceof Duplex;
		this.objectMode = !!options.objectMode;
		if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode;
		var hwm = options.highWaterMark;
		var readableHwm = options.readableHighWaterMark;
		var defaultHwm = this.objectMode ? 16 : 16 * 1024;
		if (hwm || hwm === 0) this.highWaterMark = hwm;
		else if (isDuplex && (readableHwm || readableHwm === 0)) this.highWaterMark = readableHwm;
		else this.highWaterMark = defaultHwm;
		this.highWaterMark = Math.floor(this.highWaterMark);
		this.buffer = new BufferList();
		this.length = 0;
		this.pipes = null;
		this.pipesCount = 0;
		this.flowing = null;
		this.ended = false;
		this.endEmitted = false;
		this.reading = false;
		this.sync = true;
		this.needReadable = false;
		this.emittedReadable = false;
		this.readableListening = false;
		this.resumeScheduled = false;
		this.destroyed = false;
		this.defaultEncoding = options.defaultEncoding || "utf8";
		this.awaitDrain = 0;
		this.readingMore = false;
		this.decoder = null;
		this.encoding = null;
		if (options.encoding) {
			if (!StringDecoder) StringDecoder = require_string_decoder().StringDecoder;
			this.decoder = new StringDecoder(options.encoding);
			this.encoding = options.encoding;
		}
	}
	function Readable(options) {
		Duplex = Duplex || require__stream_duplex();
		if (!(this instanceof Readable)) return new Readable(options);
		this._readableState = new ReadableState(options, this);
		this.readable = true;
		if (options) {
			if (typeof options.read === "function") this._read = options.read;
			if (typeof options.destroy === "function") this._destroy = options.destroy;
		}
		Stream.call(this);
	}
	Object.defineProperty(Readable.prototype, "destroyed", {
		get: function() {
			if (this._readableState === void 0) return false;
			return this._readableState.destroyed;
		},
		set: function(value) {
			if (!this._readableState) return;
			this._readableState.destroyed = value;
		}
	});
	Readable.prototype.destroy = destroyImpl.destroy;
	Readable.prototype._undestroy = destroyImpl.undestroy;
	Readable.prototype._destroy = function(err, cb) {
		this.push(null);
		cb(err);
	};
	Readable.prototype.push = function(chunk, encoding) {
		var state = this._readableState;
		var skipChunkCheck;
		if (!state.objectMode) {
			if (typeof chunk === "string") {
				encoding = encoding || state.defaultEncoding;
				if (encoding !== state.encoding) {
					chunk = Buffer.from(chunk, encoding);
					encoding = "";
				}
				skipChunkCheck = true;
			}
		} else skipChunkCheck = true;
		return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
	};
	Readable.prototype.unshift = function(chunk) {
		return readableAddChunk(this, chunk, null, true, false);
	};
	function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
		var state = stream._readableState;
		if (chunk === null) {
			state.reading = false;
			onEofChunk(stream, state);
		} else {
			var er;
			if (!skipChunkCheck) er = chunkInvalid(state, chunk);
			if (er) stream.emit("error", er);
			else if (state.objectMode || chunk && chunk.length > 0) {
				if (typeof chunk !== "string" && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) chunk = _uint8ArrayToBuffer(chunk);
				if (addToFront) if (state.endEmitted) stream.emit("error", /* @__PURE__ */ new Error("stream.unshift() after end event"));
				else addChunk(stream, state, chunk, true);
				else if (state.ended) stream.emit("error", /* @__PURE__ */ new Error("stream.push() after EOF"));
				else {
					state.reading = false;
					if (state.decoder && !encoding) {
						chunk = state.decoder.write(chunk);
						if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);
						else maybeReadMore(stream, state);
					} else addChunk(stream, state, chunk, false);
				}
			} else if (!addToFront) state.reading = false;
		}
		return needMoreData(state);
	}
	function addChunk(stream, state, chunk, addToFront) {
		if (state.flowing && state.length === 0 && !state.sync) {
			stream.emit("data", chunk);
			stream.read(0);
		} else {
			state.length += state.objectMode ? 1 : chunk.length;
			if (addToFront) state.buffer.unshift(chunk);
			else state.buffer.push(chunk);
			if (state.needReadable) emitReadable(stream);
		}
		maybeReadMore(stream, state);
	}
	function chunkInvalid(state, chunk) {
		var er;
		if (!_isUint8Array(chunk) && typeof chunk !== "string" && chunk !== void 0 && !state.objectMode) er = /* @__PURE__ */ new TypeError("Invalid non-string/buffer chunk");
		return er;
	}
	function needMoreData(state) {
		return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
	}
	Readable.prototype.isPaused = function() {
		return this._readableState.flowing === false;
	};
	Readable.prototype.setEncoding = function(enc) {
		if (!StringDecoder) StringDecoder = require_string_decoder().StringDecoder;
		this._readableState.decoder = new StringDecoder(enc);
		this._readableState.encoding = enc;
		return this;
	};
	var MAX_HWM = 8388608;
	function computeNewHighWaterMark(n) {
		if (n >= MAX_HWM) n = MAX_HWM;
		else {
			n--;
			n |= n >>> 1;
			n |= n >>> 2;
			n |= n >>> 4;
			n |= n >>> 8;
			n |= n >>> 16;
			n++;
		}
		return n;
	}
	function howMuchToRead(n, state) {
		if (n <= 0 || state.length === 0 && state.ended) return 0;
		if (state.objectMode) return 1;
		if (n !== n) if (state.flowing && state.length) return state.buffer.head.data.length;
		else return state.length;
		if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
		if (n <= state.length) return n;
		if (!state.ended) {
			state.needReadable = true;
			return 0;
		}
		return state.length;
	}
	Readable.prototype.read = function(n) {
		debug("read", n);
		n = parseInt(n, 10);
		var state = this._readableState;
		var nOrig = n;
		if (n !== 0) state.emittedReadable = false;
		if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
			debug("read: emitReadable", state.length, state.ended);
			if (state.length === 0 && state.ended) endReadable(this);
			else emitReadable(this);
			return null;
		}
		n = howMuchToRead(n, state);
		if (n === 0 && state.ended) {
			if (state.length === 0) endReadable(this);
			return null;
		}
		var doRead = state.needReadable;
		debug("need readable", doRead);
		if (state.length === 0 || state.length - n < state.highWaterMark) {
			doRead = true;
			debug("length less than watermark", doRead);
		}
		if (state.ended || state.reading) {
			doRead = false;
			debug("reading or ended", doRead);
		} else if (doRead) {
			debug("do read");
			state.reading = true;
			state.sync = true;
			if (state.length === 0) state.needReadable = true;
			this._read(state.highWaterMark);
			state.sync = false;
			if (!state.reading) n = howMuchToRead(nOrig, state);
		}
		var ret;
		if (n > 0) ret = fromList(n, state);
		else ret = null;
		if (ret === null) {
			state.needReadable = true;
			n = 0;
		} else state.length -= n;
		if (state.length === 0) {
			if (!state.ended) state.needReadable = true;
			if (nOrig !== n && state.ended) endReadable(this);
		}
		if (ret !== null) this.emit("data", ret);
		return ret;
	};
	function onEofChunk(stream, state) {
		if (state.ended) return;
		if (state.decoder) {
			var chunk = state.decoder.end();
			if (chunk && chunk.length) {
				state.buffer.push(chunk);
				state.length += state.objectMode ? 1 : chunk.length;
			}
		}
		state.ended = true;
		emitReadable(stream);
	}
	function emitReadable(stream) {
		var state = stream._readableState;
		state.needReadable = false;
		if (!state.emittedReadable) {
			debug("emitReadable", state.flowing);
			state.emittedReadable = true;
			if (state.sync) pna.nextTick(emitReadable_, stream);
			else emitReadable_(stream);
		}
	}
	function emitReadable_(stream) {
		debug("emit readable");
		stream.emit("readable");
		flow(stream);
	}
	function maybeReadMore(stream, state) {
		if (!state.readingMore) {
			state.readingMore = true;
			pna.nextTick(maybeReadMore_, stream, state);
		}
	}
	function maybeReadMore_(stream, state) {
		var len = state.length;
		while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
			debug("maybeReadMore read 0");
			stream.read(0);
			if (len === state.length) break;
			else len = state.length;
		}
		state.readingMore = false;
	}
	Readable.prototype._read = function(n) {
		this.emit("error", /* @__PURE__ */ new Error("_read() is not implemented"));
	};
	Readable.prototype.pipe = function(dest, pipeOpts) {
		var src = this;
		var state = this._readableState;
		switch (state.pipesCount) {
			case 0:
				state.pipes = dest;
				break;
			case 1:
				state.pipes = [state.pipes, dest];
				break;
			default:
				state.pipes.push(dest);
				break;
		}
		state.pipesCount += 1;
		debug("pipe count=%d opts=%j", state.pipesCount, pipeOpts);
		var endFn = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr ? onend : unpipe;
		if (state.endEmitted) pna.nextTick(endFn);
		else src.once("end", endFn);
		dest.on("unpipe", onunpipe);
		function onunpipe(readable, unpipeInfo) {
			debug("onunpipe");
			if (readable === src) {
				if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
					unpipeInfo.hasUnpiped = true;
					cleanup();
				}
			}
		}
		function onend() {
			debug("onend");
			dest.end();
		}
		var ondrain = pipeOnDrain(src);
		dest.on("drain", ondrain);
		var cleanedUp = false;
		function cleanup() {
			debug("cleanup");
			dest.removeListener("close", onclose);
			dest.removeListener("finish", onfinish);
			dest.removeListener("drain", ondrain);
			dest.removeListener("error", onerror);
			dest.removeListener("unpipe", onunpipe);
			src.removeListener("end", onend);
			src.removeListener("end", unpipe);
			src.removeListener("data", ondata);
			cleanedUp = true;
			if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
		}
		var increasedAwaitDrain = false;
		src.on("data", ondata);
		function ondata(chunk) {
			debug("ondata");
			increasedAwaitDrain = false;
			if (false === dest.write(chunk) && !increasedAwaitDrain) {
				if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
					debug("false write response, pause", state.awaitDrain);
					state.awaitDrain++;
					increasedAwaitDrain = true;
				}
				src.pause();
			}
		}
		function onerror(er) {
			debug("onerror", er);
			unpipe();
			dest.removeListener("error", onerror);
			if (EElistenerCount(dest, "error") === 0) dest.emit("error", er);
		}
		prependListener(dest, "error", onerror);
		function onclose() {
			dest.removeListener("finish", onfinish);
			unpipe();
		}
		dest.once("close", onclose);
		function onfinish() {
			debug("onfinish");
			dest.removeListener("close", onclose);
			unpipe();
		}
		dest.once("finish", onfinish);
		function unpipe() {
			debug("unpipe");
			src.unpipe(dest);
		}
		dest.emit("pipe", src);
		if (!state.flowing) {
			debug("pipe resume");
			src.resume();
		}
		return dest;
	};
	function pipeOnDrain(src) {
		return function() {
			var state = src._readableState;
			debug("pipeOnDrain", state.awaitDrain);
			if (state.awaitDrain) state.awaitDrain--;
			if (state.awaitDrain === 0 && EElistenerCount(src, "data")) {
				state.flowing = true;
				flow(src);
			}
		};
	}
	Readable.prototype.unpipe = function(dest) {
		var state = this._readableState;
		var unpipeInfo = { hasUnpiped: false };
		if (state.pipesCount === 0) return this;
		if (state.pipesCount === 1) {
			if (dest && dest !== state.pipes) return this;
			if (!dest) dest = state.pipes;
			state.pipes = null;
			state.pipesCount = 0;
			state.flowing = false;
			if (dest) dest.emit("unpipe", this, unpipeInfo);
			return this;
		}
		if (!dest) {
			var dests = state.pipes;
			var len = state.pipesCount;
			state.pipes = null;
			state.pipesCount = 0;
			state.flowing = false;
			for (var i = 0; i < len; i++) dests[i].emit("unpipe", this, { hasUnpiped: false });
			return this;
		}
		var index = indexOf(state.pipes, dest);
		if (index === -1) return this;
		state.pipes.splice(index, 1);
		state.pipesCount -= 1;
		if (state.pipesCount === 1) state.pipes = state.pipes[0];
		dest.emit("unpipe", this, unpipeInfo);
		return this;
	};
	Readable.prototype.on = function(ev, fn) {
		var res = Stream.prototype.on.call(this, ev, fn);
		if (ev === "data") {
			if (this._readableState.flowing !== false) this.resume();
		} else if (ev === "readable") {
			var state = this._readableState;
			if (!state.endEmitted && !state.readableListening) {
				state.readableListening = state.needReadable = true;
				state.emittedReadable = false;
				if (!state.reading) pna.nextTick(nReadingNextTick, this);
				else if (state.length) emitReadable(this);
			}
		}
		return res;
	};
	Readable.prototype.addListener = Readable.prototype.on;
	function nReadingNextTick(self) {
		debug("readable nexttick read 0");
		self.read(0);
	}
	Readable.prototype.resume = function() {
		var state = this._readableState;
		if (!state.flowing) {
			debug("resume");
			state.flowing = true;
			resume(this, state);
		}
		return this;
	};
	function resume(stream, state) {
		if (!state.resumeScheduled) {
			state.resumeScheduled = true;
			pna.nextTick(resume_, stream, state);
		}
	}
	function resume_(stream, state) {
		if (!state.reading) {
			debug("resume read 0");
			stream.read(0);
		}
		state.resumeScheduled = false;
		state.awaitDrain = 0;
		stream.emit("resume");
		flow(stream);
		if (state.flowing && !state.reading) stream.read(0);
	}
	Readable.prototype.pause = function() {
		debug("call pause flowing=%j", this._readableState.flowing);
		if (false !== this._readableState.flowing) {
			debug("pause");
			this._readableState.flowing = false;
			this.emit("pause");
		}
		return this;
	};
	function flow(stream) {
		var state = stream._readableState;
		debug("flow", state.flowing);
		while (state.flowing && stream.read() !== null);
	}
	Readable.prototype.wrap = function(stream) {
		var _this = this;
		var state = this._readableState;
		var paused = false;
		stream.on("end", function() {
			debug("wrapped end");
			if (state.decoder && !state.ended) {
				var chunk = state.decoder.end();
				if (chunk && chunk.length) _this.push(chunk);
			}
			_this.push(null);
		});
		stream.on("data", function(chunk) {
			debug("wrapped data");
			if (state.decoder) chunk = state.decoder.write(chunk);
			if (state.objectMode && (chunk === null || chunk === void 0)) return;
			else if (!state.objectMode && (!chunk || !chunk.length)) return;
			if (!_this.push(chunk)) {
				paused = true;
				stream.pause();
			}
		});
		for (var i in stream) if (this[i] === void 0 && typeof stream[i] === "function") this[i] = function(method) {
			return function() {
				return stream[method].apply(stream, arguments);
			};
		}(i);
		for (var n = 0; n < kProxyEvents.length; n++) stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
		this._read = function(n) {
			debug("wrapped _read", n);
			if (paused) {
				paused = false;
				stream.resume();
			}
		};
		return this;
	};
	Object.defineProperty(Readable.prototype, "readableHighWaterMark", {
		enumerable: false,
		get: function() {
			return this._readableState.highWaterMark;
		}
	});
	Readable._fromList = fromList;
	function fromList(n, state) {
		if (state.length === 0) return null;
		var ret;
		if (state.objectMode) ret = state.buffer.shift();
		else if (!n || n >= state.length) {
			if (state.decoder) ret = state.buffer.join("");
			else if (state.buffer.length === 1) ret = state.buffer.head.data;
			else ret = state.buffer.concat(state.length);
			state.buffer.clear();
		} else ret = fromListPartial(n, state.buffer, state.decoder);
		return ret;
	}
	function fromListPartial(n, list, hasStrings) {
		var ret;
		if (n < list.head.data.length) {
			ret = list.head.data.slice(0, n);
			list.head.data = list.head.data.slice(n);
		} else if (n === list.head.data.length) ret = list.shift();
		else ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
		return ret;
	}
	function copyFromBufferString(n, list) {
		var p = list.head;
		var c = 1;
		var ret = p.data;
		n -= ret.length;
		while (p = p.next) {
			var str = p.data;
			var nb = n > str.length ? str.length : n;
			if (nb === str.length) ret += str;
			else ret += str.slice(0, n);
			n -= nb;
			if (n === 0) {
				if (nb === str.length) {
					++c;
					if (p.next) list.head = p.next;
					else list.head = list.tail = null;
				} else {
					list.head = p;
					p.data = str.slice(nb);
				}
				break;
			}
			++c;
		}
		list.length -= c;
		return ret;
	}
	function copyFromBuffer(n, list) {
		var ret = Buffer.allocUnsafe(n);
		var p = list.head;
		var c = 1;
		p.data.copy(ret);
		n -= p.data.length;
		while (p = p.next) {
			var buf = p.data;
			var nb = n > buf.length ? buf.length : n;
			buf.copy(ret, ret.length - n, 0, nb);
			n -= nb;
			if (n === 0) {
				if (nb === buf.length) {
					++c;
					if (p.next) list.head = p.next;
					else list.head = list.tail = null;
				} else {
					list.head = p;
					p.data = buf.slice(nb);
				}
				break;
			}
			++c;
		}
		list.length -= c;
		return ret;
	}
	function endReadable(stream) {
		var state = stream._readableState;
		if (state.length > 0) throw new Error("\"endReadable()\" called on non-empty stream");
		if (!state.endEmitted) {
			state.ended = true;
			pna.nextTick(endReadableNT, state, stream);
		}
	}
	function endReadableNT(state, stream) {
		if (!state.endEmitted && state.length === 0) {
			state.endEmitted = true;
			stream.readable = false;
			stream.emit("end");
		}
	}
	function indexOf(xs, x) {
		for (var i = 0, l = xs.length; i < l; i++) if (xs[i] === x) return i;
		return -1;
	}
}));
//#endregion
//#region extension/node_modules/readable-stream/lib/_stream_transform.js
var require__stream_transform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = Transform;
	var Duplex = require__stream_duplex();
	var util = Object.create(require_util());
	util.inherits = require_inherits();
	util.inherits(Transform, Duplex);
	function afterTransform(er, data) {
		var ts = this._transformState;
		ts.transforming = false;
		var cb = ts.writecb;
		if (!cb) return this.emit("error", /* @__PURE__ */ new Error("write callback called multiple times"));
		ts.writechunk = null;
		ts.writecb = null;
		if (data != null) this.push(data);
		cb(er);
		var rs = this._readableState;
		rs.reading = false;
		if (rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
	}
	function Transform(options) {
		if (!(this instanceof Transform)) return new Transform(options);
		Duplex.call(this, options);
		this._transformState = {
			afterTransform: afterTransform.bind(this),
			needTransform: false,
			transforming: false,
			writecb: null,
			writechunk: null,
			writeencoding: null
		};
		this._readableState.needReadable = true;
		this._readableState.sync = false;
		if (options) {
			if (typeof options.transform === "function") this._transform = options.transform;
			if (typeof options.flush === "function") this._flush = options.flush;
		}
		this.on("prefinish", prefinish);
	}
	function prefinish() {
		var _this = this;
		if (typeof this._flush === "function") this._flush(function(er, data) {
			done(_this, er, data);
		});
		else done(this, null, null);
	}
	Transform.prototype.push = function(chunk, encoding) {
		this._transformState.needTransform = false;
		return Duplex.prototype.push.call(this, chunk, encoding);
	};
	Transform.prototype._transform = function(chunk, encoding, cb) {
		throw new Error("_transform() is not implemented");
	};
	Transform.prototype._write = function(chunk, encoding, cb) {
		var ts = this._transformState;
		ts.writecb = cb;
		ts.writechunk = chunk;
		ts.writeencoding = encoding;
		if (!ts.transforming) {
			var rs = this._readableState;
			if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
		}
	};
	Transform.prototype._read = function(n) {
		var ts = this._transformState;
		if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
			ts.transforming = true;
			this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
		} else ts.needTransform = true;
	};
	Transform.prototype._destroy = function(err, cb) {
		var _this2 = this;
		Duplex.prototype._destroy.call(this, err, function(err2) {
			cb(err2);
			_this2.emit("close");
		});
	};
	function done(stream, er, data) {
		if (er) return stream.emit("error", er);
		if (data != null) stream.push(data);
		if (stream._writableState.length) throw new Error("Calling transform done when ws.length != 0");
		if (stream._transformState.transforming) throw new Error("Calling transform done when still transforming");
		return stream.push(null);
	}
}));
//#endregion
//#region extension/node_modules/readable-stream/lib/_stream_passthrough.js
var require__stream_passthrough = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = PassThrough;
	var Transform = require__stream_transform();
	var util = Object.create(require_util());
	util.inherits = require_inherits();
	util.inherits(PassThrough, Transform);
	function PassThrough(options) {
		if (!(this instanceof PassThrough)) return new PassThrough(options);
		Transform.call(this, options);
	}
	PassThrough.prototype._transform = function(chunk, encoding, cb) {
		cb(null, chunk);
	};
}));
//#endregion
//#region extension/node_modules/readable-stream/readable.js
var require_readable = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Stream$1 = require("stream");
	if (process.env.READABLE_STREAM === "disable" && Stream$1) {
		module.exports = Stream$1;
		exports = module.exports = Stream$1.Readable;
		exports.Readable = Stream$1.Readable;
		exports.Writable = Stream$1.Writable;
		exports.Duplex = Stream$1.Duplex;
		exports.Transform = Stream$1.Transform;
		exports.PassThrough = Stream$1.PassThrough;
		exports.Stream = Stream$1;
	} else {
		exports = module.exports = require__stream_readable();
		exports.Stream = Stream$1 || exports;
		exports.Readable = exports;
		exports.Writable = require__stream_writable();
		exports.Duplex = require__stream_duplex();
		exports.Transform = require__stream_transform();
		exports.PassThrough = require__stream_passthrough();
	}
}));
//#endregion
//#region extension/node_modules/readable-stream/duplex.js
var require_duplex = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_readable().Duplex;
}));
//#endregion
//#region extension/node_modules/safe-buffer/index.js
var require_safe_buffer = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
	var buffer = require("buffer");
	var Buffer = buffer.Buffer;
	function copyProps(src, dst) {
		for (var key in src) dst[key] = src[key];
	}
	if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) module.exports = buffer;
	else {
		copyProps(buffer, exports);
		exports.Buffer = SafeBuffer;
	}
	function SafeBuffer(arg, encodingOrOffset, length) {
		return Buffer(arg, encodingOrOffset, length);
	}
	SafeBuffer.prototype = Object.create(Buffer.prototype);
	copyProps(Buffer, SafeBuffer);
	SafeBuffer.from = function(arg, encodingOrOffset, length) {
		if (typeof arg === "number") throw new TypeError("Argument must not be a number");
		return Buffer(arg, encodingOrOffset, length);
	};
	SafeBuffer.alloc = function(size, fill, encoding) {
		if (typeof size !== "number") throw new TypeError("Argument must be a number");
		var buf = Buffer(size);
		if (fill !== void 0) if (typeof encoding === "string") buf.fill(fill, encoding);
		else buf.fill(fill);
		else buf.fill(0);
		return buf;
	};
	SafeBuffer.allocUnsafe = function(size) {
		if (typeof size !== "number") throw new TypeError("Argument must be a number");
		return Buffer(size);
	};
	SafeBuffer.allocUnsafeSlow = function(size) {
		if (typeof size !== "number") throw new TypeError("Argument must be a number");
		return buffer.SlowBuffer(size);
	};
}));
//#endregion
//#region extension/node_modules/bl/bl.js
var require_bl = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var DuplexStream = require_duplex(), util$5 = require("util"), Buffer$3 = require_safe_buffer().Buffer;
	function BufferList(callback) {
		if (!(this instanceof BufferList)) return new BufferList(callback);
		this._bufs = [];
		this.length = 0;
		if (typeof callback == "function") {
			this._callback = callback;
			var piper = function piper(err) {
				if (this._callback) {
					this._callback(err);
					this._callback = null;
				}
			}.bind(this);
			this.on("pipe", function onPipe(src) {
				src.on("error", piper);
			});
			this.on("unpipe", function onUnpipe(src) {
				src.removeListener("error", piper);
			});
		} else this.append(callback);
		DuplexStream.call(this);
	}
	util$5.inherits(BufferList, DuplexStream);
	BufferList.prototype._offset = function _offset(offset) {
		var tot = 0, i = 0, _t;
		if (offset === 0) return [0, 0];
		for (; i < this._bufs.length; i++) {
			_t = tot + this._bufs[i].length;
			if (offset < _t || i == this._bufs.length - 1) return [i, offset - tot];
			tot = _t;
		}
	};
	BufferList.prototype.append = function append(buf) {
		var i = 0;
		if (Buffer$3.isBuffer(buf)) this._appendBuffer(buf);
		else if (Array.isArray(buf)) for (; i < buf.length; i++) this.append(buf[i]);
		else if (buf instanceof BufferList) for (; i < buf._bufs.length; i++) this.append(buf._bufs[i]);
		else if (buf != null) {
			if (typeof buf == "number") buf = buf.toString();
			this._appendBuffer(Buffer$3.from(buf));
		}
		return this;
	};
	BufferList.prototype._appendBuffer = function appendBuffer(buf) {
		this._bufs.push(buf);
		this.length += buf.length;
	};
	BufferList.prototype._write = function _write(buf, encoding, callback) {
		this._appendBuffer(buf);
		if (typeof callback == "function") callback();
	};
	BufferList.prototype._read = function _read(size) {
		if (!this.length) return this.push(null);
		size = Math.min(size, this.length);
		this.push(this.slice(0, size));
		this.consume(size);
	};
	BufferList.prototype.end = function end(chunk) {
		DuplexStream.prototype.end.call(this, chunk);
		if (this._callback) {
			this._callback(null, this.slice());
			this._callback = null;
		}
	};
	BufferList.prototype.get = function get(index) {
		return this.slice(index, index + 1)[0];
	};
	BufferList.prototype.slice = function slice(start, end) {
		if (typeof start == "number" && start < 0) start += this.length;
		if (typeof end == "number" && end < 0) end += this.length;
		return this.copy(null, 0, start, end);
	};
	BufferList.prototype.copy = function copy(dst, dstStart, srcStart, srcEnd) {
		if (typeof srcStart != "number" || srcStart < 0) srcStart = 0;
		if (typeof srcEnd != "number" || srcEnd > this.length) srcEnd = this.length;
		if (srcStart >= this.length) return dst || Buffer$3.alloc(0);
		if (srcEnd <= 0) return dst || Buffer$3.alloc(0);
		var copy = !!dst, off = this._offset(srcStart), len = srcEnd - srcStart, bytes = len, bufoff = copy && dstStart || 0, start = off[1], l, i;
		if (srcStart === 0 && srcEnd == this.length) {
			if (!copy) return this._bufs.length === 1 ? this._bufs[0] : Buffer$3.concat(this._bufs, this.length);
			for (i = 0; i < this._bufs.length; i++) {
				this._bufs[i].copy(dst, bufoff);
				bufoff += this._bufs[i].length;
			}
			return dst;
		}
		if (bytes <= this._bufs[off[0]].length - start) return copy ? this._bufs[off[0]].copy(dst, dstStart, start, start + bytes) : this._bufs[off[0]].slice(start, start + bytes);
		if (!copy) dst = Buffer$3.allocUnsafe(len);
		for (i = off[0]; i < this._bufs.length; i++) {
			l = this._bufs[i].length - start;
			if (bytes > l) {
				this._bufs[i].copy(dst, bufoff, start);
				bufoff += l;
			} else {
				this._bufs[i].copy(dst, bufoff, start, start + bytes);
				bufoff += l;
				break;
			}
			bytes -= l;
			if (start) start = 0;
		}
		if (dst.length > bufoff) return dst.slice(0, bufoff);
		return dst;
	};
	BufferList.prototype.shallowSlice = function shallowSlice(start, end) {
		start = start || 0;
		end = end || this.length;
		if (start < 0) start += this.length;
		if (end < 0) end += this.length;
		var startOffset = this._offset(start), endOffset = this._offset(end), buffers = this._bufs.slice(startOffset[0], endOffset[0] + 1);
		if (endOffset[1] == 0) buffers.pop();
		else buffers[buffers.length - 1] = buffers[buffers.length - 1].slice(0, endOffset[1]);
		if (startOffset[1] != 0) buffers[0] = buffers[0].slice(startOffset[1]);
		return new BufferList(buffers);
	};
	BufferList.prototype.toString = function toString(encoding, start, end) {
		return this.slice(start, end).toString(encoding);
	};
	BufferList.prototype.consume = function consume(bytes) {
		bytes = Math.trunc(bytes);
		if (Number.isNaN(bytes) || bytes <= 0) return this;
		while (this._bufs.length) if (bytes >= this._bufs[0].length) {
			bytes -= this._bufs[0].length;
			this.length -= this._bufs[0].length;
			this._bufs.shift();
		} else {
			this._bufs[0] = this._bufs[0].slice(bytes);
			this.length -= bytes;
			break;
		}
		return this;
	};
	BufferList.prototype.duplicate = function duplicate() {
		var i = 0, copy = new BufferList();
		for (; i < this._bufs.length; i++) copy.append(this._bufs[i]);
		return copy;
	};
	BufferList.prototype.destroy = function destroy() {
		this._bufs.length = 0;
		this.length = 0;
		this.push(null);
	};
	(function() {
		var methods = {
			"readDoubleBE": 8,
			"readDoubleLE": 8,
			"readFloatBE": 4,
			"readFloatLE": 4,
			"readInt32BE": 4,
			"readInt32LE": 4,
			"readUInt32BE": 4,
			"readUInt32LE": 4,
			"readInt16BE": 2,
			"readInt16LE": 2,
			"readUInt16BE": 2,
			"readUInt16LE": 2,
			"readInt8": 1,
			"readUInt8": 1
		};
		for (var m in methods) (function(m) {
			BufferList.prototype[m] = function(offset) {
				return this.slice(offset, offset + methods[m])[m](0);
			};
		})(m);
	})();
	module.exports = BufferList;
}));
//#endregion
//#region extension/node_modules/xtend/immutable.js
var require_immutable = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = extend;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	function extend() {
		var target = {};
		for (var i = 0; i < arguments.length; i++) {
			var source = arguments[i];
			for (var key in source) if (hasOwnProperty.call(source, key)) target[key] = source[key];
		}
		return target;
	}
}));
//#endregion
//#region extension/node_modules/to-buffer/node_modules/isarray/index.js
var require_isarray = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var toString = {}.toString;
	module.exports = Array.isArray || function(arr) {
		return toString.call(arr) == "[object Array]";
	};
}));
//#endregion
//#region extension/node_modules/es-errors/type.js
var require_type = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('./type')} */
	module.exports = TypeError;
}));
//#endregion
//#region extension/node_modules/es-object-atoms/index.js
var require_es_object_atoms = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('.')} */
	module.exports = Object;
}));
//#endregion
//#region extension/node_modules/es-errors/index.js
var require_es_errors = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('.')} */
	module.exports = Error;
}));
//#endregion
//#region extension/node_modules/es-errors/eval.js
var require_eval = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('./eval')} */
	module.exports = EvalError;
}));
//#endregion
//#region extension/node_modules/es-errors/range.js
var require_range = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('./range')} */
	module.exports = RangeError;
}));
//#endregion
//#region extension/node_modules/es-errors/ref.js
var require_ref = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('./ref')} */
	module.exports = ReferenceError;
}));
//#endregion
//#region extension/node_modules/es-errors/syntax.js
var require_syntax = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('./syntax')} */
	module.exports = SyntaxError;
}));
//#endregion
//#region extension/node_modules/es-errors/uri.js
var require_uri = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('./uri')} */
	module.exports = URIError;
}));
//#endregion
//#region extension/node_modules/math-intrinsics/abs.js
var require_abs = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('./abs')} */
	module.exports = Math.abs;
}));
//#endregion
//#region extension/node_modules/math-intrinsics/floor.js
var require_floor = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('./floor')} */
	module.exports = Math.floor;
}));
//#endregion
//#region extension/node_modules/math-intrinsics/max.js
var require_max = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('./max')} */
	module.exports = Math.max;
}));
//#endregion
//#region extension/node_modules/math-intrinsics/min.js
var require_min = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('./min')} */
	module.exports = Math.min;
}));
//#endregion
//#region extension/node_modules/math-intrinsics/pow.js
var require_pow = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('./pow')} */
	module.exports = Math.pow;
}));
//#endregion
//#region extension/node_modules/math-intrinsics/round.js
var require_round = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('./round')} */
	module.exports = Math.round;
}));
//#endregion
//#region extension/node_modules/math-intrinsics/isNaN.js
var require_isNaN = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('./isNaN')} */
	module.exports = Number.isNaN || function isNaN(a) {
		return a !== a;
	};
}));
//#endregion
//#region extension/node_modules/math-intrinsics/sign.js
var require_sign = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var $isNaN = require_isNaN();
	/** @type {import('./sign')} */
	module.exports = function sign(number) {
		if ($isNaN(number) || number === 0) return number;
		return number < 0 ? -1 : 1;
	};
}));
//#endregion
//#region extension/node_modules/gopd/gOPD.js
var require_gOPD = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('./gOPD')} */
	module.exports = Object.getOwnPropertyDescriptor;
}));
//#endregion
//#region extension/node_modules/gopd/index.js
var require_gopd = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('.')} */
	var $gOPD = require_gOPD();
	if ($gOPD) try {
		$gOPD([], "length");
	} catch (e) {
		$gOPD = null;
	}
	module.exports = $gOPD;
}));
//#endregion
//#region extension/node_modules/es-define-property/index.js
var require_es_define_property = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('.')} */
	var $defineProperty = Object.defineProperty || false;
	if ($defineProperty) try {
		$defineProperty({}, "a", { value: 1 });
	} catch (e) {
		$defineProperty = false;
	}
	module.exports = $defineProperty;
}));
//#endregion
//#region extension/node_modules/has-symbols/shams.js
var require_shams$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('./shams')} */
	module.exports = function hasSymbols() {
		if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") return false;
		if (typeof Symbol.iterator === "symbol") return true;
		/** @type {{ [k in symbol]?: unknown }} */
		var obj = {};
		var sym = Symbol("test");
		var symObj = Object(sym);
		if (typeof sym === "string") return false;
		if (Object.prototype.toString.call(sym) !== "[object Symbol]") return false;
		if (Object.prototype.toString.call(symObj) !== "[object Symbol]") return false;
		var symVal = 42;
		obj[sym] = symVal;
		for (var _ in obj) return false;
		if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) return false;
		if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj).length !== 0) return false;
		var syms = Object.getOwnPropertySymbols(obj);
		if (syms.length !== 1 || syms[0] !== sym) return false;
		if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) return false;
		if (typeof Object.getOwnPropertyDescriptor === "function") {
			var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
			if (descriptor.value !== symVal || descriptor.enumerable !== true) return false;
		}
		return true;
	};
}));
//#endregion
//#region extension/node_modules/has-symbols/index.js
var require_has_symbols = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var origSymbol = typeof Symbol !== "undefined" && Symbol;
	var hasSymbolSham = require_shams$1();
	/** @type {import('.')} */
	module.exports = function hasNativeSymbols() {
		if (typeof origSymbol !== "function") return false;
		if (typeof Symbol !== "function") return false;
		if (typeof origSymbol("foo") !== "symbol") return false;
		if (typeof Symbol("bar") !== "symbol") return false;
		return hasSymbolSham();
	};
}));
//#endregion
//#region extension/node_modules/get-proto/Reflect.getPrototypeOf.js
var require_Reflect_getPrototypeOf = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('./Reflect.getPrototypeOf')} */
	module.exports = typeof Reflect !== "undefined" && Reflect.getPrototypeOf || null;
}));
//#endregion
//#region extension/node_modules/get-proto/Object.getPrototypeOf.js
var require_Object_getPrototypeOf = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('./Object.getPrototypeOf')} */
	module.exports = require_es_object_atoms().getPrototypeOf || null;
}));
//#endregion
//#region extension/node_modules/function-bind/implementation.js
var require_implementation = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
	var toStr = Object.prototype.toString;
	var max = Math.max;
	var funcType = "[object Function]";
	var concatty = function concatty(a, b) {
		var arr = [];
		for (var i = 0; i < a.length; i += 1) arr[i] = a[i];
		for (var j = 0; j < b.length; j += 1) arr[j + a.length] = b[j];
		return arr;
	};
	var slicy = function slicy(arrLike, offset) {
		var arr = [];
		for (var i = offset || 0, j = 0; i < arrLike.length; i += 1, j += 1) arr[j] = arrLike[i];
		return arr;
	};
	var joiny = function(arr, joiner) {
		var str = "";
		for (var i = 0; i < arr.length; i += 1) {
			str += arr[i];
			if (i + 1 < arr.length) str += joiner;
		}
		return str;
	};
	module.exports = function bind(that) {
		var target = this;
		if (typeof target !== "function" || toStr.apply(target) !== funcType) throw new TypeError(ERROR_MESSAGE + target);
		var args = slicy(arguments, 1);
		var bound;
		var binder = function() {
			if (this instanceof bound) {
				var result = target.apply(this, concatty(args, arguments));
				if (Object(result) === result) return result;
				return this;
			}
			return target.apply(that, concatty(args, arguments));
		};
		var boundLength = max(0, target.length - args.length);
		var boundArgs = [];
		for (var i = 0; i < boundLength; i++) boundArgs[i] = "$" + i;
		bound = Function("binder", "return function (" + joiny(boundArgs, ",") + "){ return binder.apply(this,arguments); }")(binder);
		if (target.prototype) {
			var Empty = function Empty() {};
			Empty.prototype = target.prototype;
			bound.prototype = new Empty();
			Empty.prototype = null;
		}
		return bound;
	};
}));
//#endregion
//#region extension/node_modules/function-bind/index.js
var require_function_bind = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var implementation = require_implementation();
	module.exports = Function.prototype.bind || implementation;
}));
//#endregion
//#region extension/node_modules/call-bind-apply-helpers/functionCall.js
var require_functionCall = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('./functionCall')} */
	module.exports = Function.prototype.call;
}));
//#endregion
//#region extension/node_modules/call-bind-apply-helpers/functionApply.js
var require_functionApply = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('./functionApply')} */
	module.exports = Function.prototype.apply;
}));
//#endregion
//#region extension/node_modules/call-bind-apply-helpers/reflectApply.js
var require_reflectApply = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('./reflectApply')} */
	module.exports = typeof Reflect !== "undefined" && Reflect && Reflect.apply;
}));
//#endregion
//#region extension/node_modules/call-bind-apply-helpers/actualApply.js
var require_actualApply = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var bind = require_function_bind();
	var $apply = require_functionApply();
	var $call = require_functionCall();
	/** @type {import('./actualApply')} */
	module.exports = require_reflectApply() || bind.call($call, $apply);
}));
//#endregion
//#region extension/node_modules/call-bind-apply-helpers/index.js
var require_call_bind_apply_helpers = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var bind = require_function_bind();
	var $TypeError = require_type();
	var $call = require_functionCall();
	var $actualApply = require_actualApply();
	/** @type {(args: [Function, thisArg?: unknown, ...args: unknown[]]) => Function} TODO FIXME, find a way to use import('.') */
	module.exports = function callBindBasic(args) {
		if (args.length < 1 || typeof args[0] !== "function") throw new $TypeError("a function is required");
		return $actualApply(bind, $call, args);
	};
}));
//#endregion
//#region extension/node_modules/dunder-proto/get.js
var require_get = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var callBind = require_call_bind_apply_helpers();
	var gOPD = require_gopd();
	var hasProtoAccessor;
	try {
		hasProtoAccessor = [].__proto__ === Array.prototype;
	} catch (e) {
		if (!e || typeof e !== "object" || !("code" in e) || e.code !== "ERR_PROTO_ACCESS") throw e;
	}
	var desc = !!hasProtoAccessor && gOPD && gOPD(Object.prototype, "__proto__");
	var $Object = Object;
	var $getPrototypeOf = $Object.getPrototypeOf;
	/** @type {import('./get')} */
	module.exports = desc && typeof desc.get === "function" ? callBind([desc.get]) : typeof $getPrototypeOf === "function" ? function getDunder(value) {
		return $getPrototypeOf(value == null ? value : $Object(value));
	} : false;
}));
//#endregion
//#region extension/node_modules/get-proto/index.js
var require_get_proto = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var reflectGetProto = require_Reflect_getPrototypeOf();
	var originalGetProto = require_Object_getPrototypeOf();
	var getDunderProto = require_get();
	/** @type {import('.')} */
	module.exports = reflectGetProto ? function getProto(O) {
		return reflectGetProto(O);
	} : originalGetProto ? function getProto(O) {
		if (!O || typeof O !== "object" && typeof O !== "function") throw new TypeError("getProto: not an object");
		return originalGetProto(O);
	} : getDunderProto ? function getProto(O) {
		return getDunderProto(O);
	} : null;
}));
//#endregion
//#region extension/node_modules/hasown/index.js
var require_hasown = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var call = Function.prototype.call;
	var $hasOwn = Object.prototype.hasOwnProperty;
	/** @type {import('.')} */
	module.exports = require_function_bind().call(call, $hasOwn);
}));
//#endregion
//#region extension/node_modules/get-intrinsic/index.js
var require_get_intrinsic = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var undefined;
	var $Object = require_es_object_atoms();
	var $Error = require_es_errors();
	var $EvalError = require_eval();
	var $RangeError = require_range();
	var $ReferenceError = require_ref();
	var $SyntaxError = require_syntax();
	var $TypeError = require_type();
	var $URIError = require_uri();
	var abs = require_abs();
	var floor = require_floor();
	var max = require_max();
	var min = require_min();
	var pow = require_pow();
	var round = require_round();
	var sign = require_sign();
	var $Function = Function;
	var getEvalledConstructor = function(expressionSyntax) {
		try {
			return $Function("\"use strict\"; return (" + expressionSyntax + ").constructor;")();
		} catch (e) {}
	};
	var $gOPD = require_gopd();
	var $defineProperty = require_es_define_property();
	var throwTypeError = function() {
		throw new $TypeError();
	};
	var ThrowTypeError = $gOPD ? function() {
		try {
			arguments.callee;
			return throwTypeError;
		} catch (calleeThrows) {
			try {
				return $gOPD(arguments, "callee").get;
			} catch (gOPDthrows) {
				return throwTypeError;
			}
		}
	}() : throwTypeError;
	var hasSymbols = require_has_symbols()();
	var getProto = require_get_proto();
	var $ObjectGPO = require_Object_getPrototypeOf();
	var $ReflectGPO = require_Reflect_getPrototypeOf();
	var $apply = require_functionApply();
	var $call = require_functionCall();
	var needsEval = {};
	var TypedArray = typeof Uint8Array === "undefined" || !getProto ? undefined : getProto(Uint8Array);
	var INTRINSICS = {
		__proto__: null,
		"%AggregateError%": typeof AggregateError === "undefined" ? undefined : AggregateError,
		"%Array%": Array,
		"%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined : ArrayBuffer,
		"%ArrayIteratorPrototype%": hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined,
		"%AsyncFromSyncIteratorPrototype%": undefined,
		"%AsyncFunction%": needsEval,
		"%AsyncGenerator%": needsEval,
		"%AsyncGeneratorFunction%": needsEval,
		"%AsyncIteratorPrototype%": needsEval,
		"%Atomics%": typeof Atomics === "undefined" ? undefined : Atomics,
		"%BigInt%": typeof BigInt === "undefined" ? undefined : BigInt,
		"%BigInt64Array%": typeof BigInt64Array === "undefined" ? undefined : BigInt64Array,
		"%BigUint64Array%": typeof BigUint64Array === "undefined" ? undefined : BigUint64Array,
		"%Boolean%": Boolean,
		"%DataView%": typeof DataView === "undefined" ? undefined : DataView,
		"%Date%": Date,
		"%decodeURI%": decodeURI,
		"%decodeURIComponent%": decodeURIComponent,
		"%encodeURI%": encodeURI,
		"%encodeURIComponent%": encodeURIComponent,
		"%Error%": $Error,
		"%eval%": eval,
		"%EvalError%": $EvalError,
		"%Float16Array%": typeof Float16Array === "undefined" ? undefined : Float16Array,
		"%Float32Array%": typeof Float32Array === "undefined" ? undefined : Float32Array,
		"%Float64Array%": typeof Float64Array === "undefined" ? undefined : Float64Array,
		"%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? undefined : FinalizationRegistry,
		"%Function%": $Function,
		"%GeneratorFunction%": needsEval,
		"%Int8Array%": typeof Int8Array === "undefined" ? undefined : Int8Array,
		"%Int16Array%": typeof Int16Array === "undefined" ? undefined : Int16Array,
		"%Int32Array%": typeof Int32Array === "undefined" ? undefined : Int32Array,
		"%isFinite%": isFinite,
		"%isNaN%": isNaN,
		"%IteratorPrototype%": hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined,
		"%JSON%": typeof JSON === "object" ? JSON : undefined,
		"%Map%": typeof Map === "undefined" ? undefined : Map,
		"%MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols || !getProto ? undefined : getProto((/* @__PURE__ */ new Map())[Symbol.iterator]()),
		"%Math%": Math,
		"%Number%": Number,
		"%Object%": $Object,
		"%Object.getOwnPropertyDescriptor%": $gOPD,
		"%parseFloat%": parseFloat,
		"%parseInt%": parseInt,
		"%Promise%": typeof Promise === "undefined" ? undefined : Promise,
		"%Proxy%": typeof Proxy === "undefined" ? undefined : Proxy,
		"%RangeError%": $RangeError,
		"%ReferenceError%": $ReferenceError,
		"%Reflect%": typeof Reflect === "undefined" ? undefined : Reflect,
		"%RegExp%": RegExp,
		"%Set%": typeof Set === "undefined" ? undefined : Set,
		"%SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols || !getProto ? undefined : getProto((/* @__PURE__ */ new Set())[Symbol.iterator]()),
		"%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined : SharedArrayBuffer,
		"%String%": String,
		"%StringIteratorPrototype%": hasSymbols && getProto ? getProto(""[Symbol.iterator]()) : undefined,
		"%Symbol%": hasSymbols ? Symbol : undefined,
		"%SyntaxError%": $SyntaxError,
		"%ThrowTypeError%": ThrowTypeError,
		"%TypedArray%": TypedArray,
		"%TypeError%": $TypeError,
		"%Uint8Array%": typeof Uint8Array === "undefined" ? undefined : Uint8Array,
		"%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? undefined : Uint8ClampedArray,
		"%Uint16Array%": typeof Uint16Array === "undefined" ? undefined : Uint16Array,
		"%Uint32Array%": typeof Uint32Array === "undefined" ? undefined : Uint32Array,
		"%URIError%": $URIError,
		"%WeakMap%": typeof WeakMap === "undefined" ? undefined : WeakMap,
		"%WeakRef%": typeof WeakRef === "undefined" ? undefined : WeakRef,
		"%WeakSet%": typeof WeakSet === "undefined" ? undefined : WeakSet,
		"%Function.prototype.call%": $call,
		"%Function.prototype.apply%": $apply,
		"%Object.defineProperty%": $defineProperty,
		"%Object.getPrototypeOf%": $ObjectGPO,
		"%Math.abs%": abs,
		"%Math.floor%": floor,
		"%Math.max%": max,
		"%Math.min%": min,
		"%Math.pow%": pow,
		"%Math.round%": round,
		"%Math.sign%": sign,
		"%Reflect.getPrototypeOf%": $ReflectGPO
	};
	if (getProto) try {
		null.error;
	} catch (e) {
		INTRINSICS["%Error.prototype%"] = getProto(getProto(e));
	}
	var doEval = function doEval(name) {
		var value;
		if (name === "%AsyncFunction%") value = getEvalledConstructor("async function () {}");
		else if (name === "%GeneratorFunction%") value = getEvalledConstructor("function* () {}");
		else if (name === "%AsyncGeneratorFunction%") value = getEvalledConstructor("async function* () {}");
		else if (name === "%AsyncGenerator%") {
			var fn = doEval("%AsyncGeneratorFunction%");
			if (fn) value = fn.prototype;
		} else if (name === "%AsyncIteratorPrototype%") {
			var gen = doEval("%AsyncGenerator%");
			if (gen && getProto) value = getProto(gen.prototype);
		}
		INTRINSICS[name] = value;
		return value;
	};
	var LEGACY_ALIASES = {
		__proto__: null,
		"%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
		"%ArrayPrototype%": ["Array", "prototype"],
		"%ArrayProto_entries%": [
			"Array",
			"prototype",
			"entries"
		],
		"%ArrayProto_forEach%": [
			"Array",
			"prototype",
			"forEach"
		],
		"%ArrayProto_keys%": [
			"Array",
			"prototype",
			"keys"
		],
		"%ArrayProto_values%": [
			"Array",
			"prototype",
			"values"
		],
		"%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
		"%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
		"%AsyncGeneratorPrototype%": [
			"AsyncGeneratorFunction",
			"prototype",
			"prototype"
		],
		"%BooleanPrototype%": ["Boolean", "prototype"],
		"%DataViewPrototype%": ["DataView", "prototype"],
		"%DatePrototype%": ["Date", "prototype"],
		"%ErrorPrototype%": ["Error", "prototype"],
		"%EvalErrorPrototype%": ["EvalError", "prototype"],
		"%Float32ArrayPrototype%": ["Float32Array", "prototype"],
		"%Float64ArrayPrototype%": ["Float64Array", "prototype"],
		"%FunctionPrototype%": ["Function", "prototype"],
		"%Generator%": ["GeneratorFunction", "prototype"],
		"%GeneratorPrototype%": [
			"GeneratorFunction",
			"prototype",
			"prototype"
		],
		"%Int8ArrayPrototype%": ["Int8Array", "prototype"],
		"%Int16ArrayPrototype%": ["Int16Array", "prototype"],
		"%Int32ArrayPrototype%": ["Int32Array", "prototype"],
		"%JSONParse%": ["JSON", "parse"],
		"%JSONStringify%": ["JSON", "stringify"],
		"%MapPrototype%": ["Map", "prototype"],
		"%NumberPrototype%": ["Number", "prototype"],
		"%ObjectPrototype%": ["Object", "prototype"],
		"%ObjProto_toString%": [
			"Object",
			"prototype",
			"toString"
		],
		"%ObjProto_valueOf%": [
			"Object",
			"prototype",
			"valueOf"
		],
		"%PromisePrototype%": ["Promise", "prototype"],
		"%PromiseProto_then%": [
			"Promise",
			"prototype",
			"then"
		],
		"%Promise_all%": ["Promise", "all"],
		"%Promise_reject%": ["Promise", "reject"],
		"%Promise_resolve%": ["Promise", "resolve"],
		"%RangeErrorPrototype%": ["RangeError", "prototype"],
		"%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
		"%RegExpPrototype%": ["RegExp", "prototype"],
		"%SetPrototype%": ["Set", "prototype"],
		"%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
		"%StringPrototype%": ["String", "prototype"],
		"%SymbolPrototype%": ["Symbol", "prototype"],
		"%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
		"%TypedArrayPrototype%": ["TypedArray", "prototype"],
		"%TypeErrorPrototype%": ["TypeError", "prototype"],
		"%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
		"%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
		"%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
		"%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
		"%URIErrorPrototype%": ["URIError", "prototype"],
		"%WeakMapPrototype%": ["WeakMap", "prototype"],
		"%WeakSetPrototype%": ["WeakSet", "prototype"]
	};
	var bind = require_function_bind();
	var hasOwn = require_hasown();
	var $concat = bind.call($call, Array.prototype.concat);
	var $spliceApply = bind.call($apply, Array.prototype.splice);
	var $replace = bind.call($call, String.prototype.replace);
	var $strSlice = bind.call($call, String.prototype.slice);
	var $exec = bind.call($call, RegExp.prototype.exec);
	var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
	var reEscapeChar = /\\(\\)?/g;
	var stringToPath = function stringToPath(string) {
		var first = $strSlice(string, 0, 1);
		var last = $strSlice(string, -1);
		if (first === "%" && last !== "%") throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
		else if (last === "%" && first !== "%") throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
		var result = [];
		$replace(string, rePropName, function(match, number, quote, subString) {
			result[result.length] = quote ? $replace(subString, reEscapeChar, "$1") : number || match;
		});
		return result;
	};
	var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
		var intrinsicName = name;
		var alias;
		if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
			alias = LEGACY_ALIASES[intrinsicName];
			intrinsicName = "%" + alias[0] + "%";
		}
		if (hasOwn(INTRINSICS, intrinsicName)) {
			var value = INTRINSICS[intrinsicName];
			if (value === needsEval) value = doEval(intrinsicName);
			if (typeof value === "undefined" && !allowMissing) throw new $TypeError("intrinsic " + name + " exists, but is not available. Please file an issue!");
			return {
				alias,
				name: intrinsicName,
				value
			};
		}
		throw new $SyntaxError("intrinsic " + name + " does not exist!");
	};
	module.exports = function GetIntrinsic(name, allowMissing) {
		if (typeof name !== "string" || name.length === 0) throw new $TypeError("intrinsic name must be a non-empty string");
		if (arguments.length > 1 && typeof allowMissing !== "boolean") throw new $TypeError("\"allowMissing\" argument must be a boolean");
		if ($exec(/^%?[^%]*%?$/, name) === null) throw new $SyntaxError("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
		var parts = stringToPath(name);
		var intrinsicBaseName = parts.length > 0 ? parts[0] : "";
		var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing);
		var intrinsicRealName = intrinsic.name;
		var value = intrinsic.value;
		var skipFurtherCaching = false;
		var alias = intrinsic.alias;
		if (alias) {
			intrinsicBaseName = alias[0];
			$spliceApply(parts, $concat([0, 1], alias));
		}
		for (var i = 1, isOwn = true; i < parts.length; i += 1) {
			var part = parts[i];
			var first = $strSlice(part, 0, 1);
			var last = $strSlice(part, -1);
			if ((first === "\"" || first === "'" || first === "`" || last === "\"" || last === "'" || last === "`") && first !== last) throw new $SyntaxError("property names with quotes must have matching quotes");
			if (part === "constructor" || !isOwn) skipFurtherCaching = true;
			intrinsicBaseName += "." + part;
			intrinsicRealName = "%" + intrinsicBaseName + "%";
			if (hasOwn(INTRINSICS, intrinsicRealName)) value = INTRINSICS[intrinsicRealName];
			else if (value != null) {
				if (!(part in value)) {
					if (!allowMissing) throw new $TypeError("base intrinsic for " + name + " exists, but the property is not available.");
					return;
				}
				if ($gOPD && i + 1 >= parts.length) {
					var desc = $gOPD(value, part);
					isOwn = !!desc;
					if (isOwn && "get" in desc && !("originalValue" in desc.get)) value = desc.get;
					else value = value[part];
				} else {
					isOwn = hasOwn(value, part);
					value = value[part];
				}
				if (isOwn && !skipFurtherCaching) INTRINSICS[intrinsicRealName] = value;
			}
		}
		return value;
	};
}));
//#endregion
//#region extension/node_modules/call-bound/index.js
var require_call_bound = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var GetIntrinsic = require_get_intrinsic();
	var callBindBasic = require_call_bind_apply_helpers();
	/** @type {(thisArg: string, searchString: string, position?: number) => number} */
	var $indexOf = callBindBasic([GetIntrinsic("%String.prototype.indexOf%")]);
	/** @type {import('.')} */
	module.exports = function callBoundIntrinsic(name, allowMissing) {
		var intrinsic = GetIntrinsic(name, !!allowMissing);
		if (typeof intrinsic === "function" && $indexOf(name, ".prototype.") > -1) return callBindBasic([intrinsic]);
		return intrinsic;
	};
}));
//#endregion
//#region extension/node_modules/is-callable/index.js
var require_is_callable = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var fnToStr = Function.prototype.toString;
	var reflectApply = typeof Reflect === "object" && Reflect !== null && Reflect.apply;
	var badArrayLike;
	var isCallableMarker;
	if (typeof reflectApply === "function" && typeof Object.defineProperty === "function") try {
		badArrayLike = Object.defineProperty({}, "length", { get: function() {
			throw isCallableMarker;
		} });
		isCallableMarker = {};
		reflectApply(function() {
			throw 42;
		}, null, badArrayLike);
	} catch (_) {
		if (_ !== isCallableMarker) reflectApply = null;
	}
	else reflectApply = null;
	var constructorRegex = /^\s*class\b/;
	var isES6ClassFn = function isES6ClassFunction(value) {
		try {
			var fnStr = fnToStr.call(value);
			return constructorRegex.test(fnStr);
		} catch (e) {
			return false;
		}
	};
	var tryFunctionObject = function tryFunctionToStr(value) {
		try {
			if (isES6ClassFn(value)) return false;
			fnToStr.call(value);
			return true;
		} catch (e) {
			return false;
		}
	};
	var toStr = Object.prototype.toString;
	var objectClass = "[object Object]";
	var fnClass = "[object Function]";
	var genClass = "[object GeneratorFunction]";
	var ddaClass = "[object HTMLAllCollection]";
	var ddaClass2 = "[object HTML document.all class]";
	var ddaClass3 = "[object HTMLCollection]";
	var hasToStringTag = typeof Symbol === "function" && !!Symbol.toStringTag;
	var isIE68 = !(0 in [,]);
	var isDDA = function isDocumentDotAll() {
		return false;
	};
	if (typeof document === "object") {
		var all = document.all;
		if (toStr.call(all) === toStr.call(document.all)) isDDA = function isDocumentDotAll(value) {
			if ((isIE68 || !value) && (typeof value === "undefined" || typeof value === "object")) try {
				var str = toStr.call(value);
				return (str === ddaClass || str === ddaClass2 || str === ddaClass3 || str === objectClass) && value("") == null;
			} catch (e) {}
			return false;
		};
	}
	module.exports = reflectApply ? function isCallable(value) {
		if (isDDA(value)) return true;
		if (!value) return false;
		if (typeof value !== "function" && typeof value !== "object") return false;
		try {
			reflectApply(value, null, badArrayLike);
		} catch (e) {
			if (e !== isCallableMarker) return false;
		}
		return !isES6ClassFn(value) && tryFunctionObject(value);
	} : function isCallable(value) {
		if (isDDA(value)) return true;
		if (!value) return false;
		if (typeof value !== "function" && typeof value !== "object") return false;
		if (hasToStringTag) return tryFunctionObject(value);
		if (isES6ClassFn(value)) return false;
		var strClass = toStr.call(value);
		if (strClass !== fnClass && strClass !== genClass && !/^\[object HTML/.test(strClass)) return false;
		return tryFunctionObject(value);
	};
}));
//#endregion
//#region extension/node_modules/for-each/index.js
var require_for_each = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var isCallable = require_is_callable();
	var toStr = Object.prototype.toString;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	/** @type {<This, A extends readonly unknown[]>(arr: A, iterator: (this: This | void, value: A[number], index: number, arr: A) => void, receiver: This | undefined) => void} */
	var forEachArray = function forEachArray(array, iterator, receiver) {
		for (var i = 0, len = array.length; i < len; i++) if (hasOwnProperty.call(array, i)) if (receiver == null) iterator(array[i], i, array);
		else iterator.call(receiver, array[i], i, array);
	};
	/** @type {<This, S extends string>(string: S, iterator: (this: This | void, value: S[number], index: number, string: S) => void, receiver: This | undefined) => void} */
	var forEachString = function forEachString(string, iterator, receiver) {
		for (var i = 0, len = string.length; i < len; i++) if (receiver == null) iterator(string.charAt(i), i, string);
		else iterator.call(receiver, string.charAt(i), i, string);
	};
	/** @type {<This, O>(obj: O, iterator: (this: This | void, value: O[keyof O], index: keyof O, obj: O) => void, receiver: This | undefined) => void} */
	var forEachObject = function forEachObject(object, iterator, receiver) {
		for (var k in object) if (hasOwnProperty.call(object, k)) if (receiver == null) iterator(object[k], k, object);
		else iterator.call(receiver, object[k], k, object);
	};
	/** @type {(x: unknown) => x is readonly unknown[]} */
	function isArray(x) {
		return toStr.call(x) === "[object Array]";
	}
	/** @type {import('.')._internal} */
	module.exports = function forEach(list, iterator, thisArg) {
		if (!isCallable(iterator)) throw new TypeError("iterator must be a function");
		var receiver;
		if (arguments.length >= 3) receiver = thisArg;
		if (isArray(list)) forEachArray(list, iterator, receiver);
		else if (typeof list === "string") forEachString(list, iterator, receiver);
		else forEachObject(list, iterator, receiver);
	};
}));
//#endregion
//#region extension/node_modules/possible-typed-array-names/index.js
var require_possible_typed_array_names = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('.')} */
	module.exports = [
		"Float16Array",
		"Float32Array",
		"Float64Array",
		"Int8Array",
		"Int16Array",
		"Int32Array",
		"Uint8Array",
		"Uint8ClampedArray",
		"Uint16Array",
		"Uint32Array",
		"BigInt64Array",
		"BigUint64Array"
	];
}));
//#endregion
//#region extension/node_modules/available-typed-arrays/index.js
var require_available_typed_arrays = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var possibleNames = require_possible_typed_array_names();
	var g = typeof globalThis === "undefined" ? global : globalThis;
	/** @type {import('.')} */
	module.exports = function availableTypedArrays() {
		var out = [];
		for (var i = 0; i < possibleNames.length; i++) if (typeof g[possibleNames[i]] === "function") out[out.length] = possibleNames[i];
		return out;
	};
}));
//#endregion
//#region extension/node_modules/define-data-property/index.js
var require_define_data_property = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var $defineProperty = require_es_define_property();
	var $SyntaxError = require_syntax();
	var $TypeError = require_type();
	var gopd = require_gopd();
	/** @type {import('.')} */
	module.exports = function defineDataProperty(obj, property, value) {
		if (!obj || typeof obj !== "object" && typeof obj !== "function") throw new $TypeError("`obj` must be an object or a function`");
		if (typeof property !== "string" && typeof property !== "symbol") throw new $TypeError("`property` must be a string or a symbol`");
		if (arguments.length > 3 && typeof arguments[3] !== "boolean" && arguments[3] !== null) throw new $TypeError("`nonEnumerable`, if provided, must be a boolean or null");
		if (arguments.length > 4 && typeof arguments[4] !== "boolean" && arguments[4] !== null) throw new $TypeError("`nonWritable`, if provided, must be a boolean or null");
		if (arguments.length > 5 && typeof arguments[5] !== "boolean" && arguments[5] !== null) throw new $TypeError("`nonConfigurable`, if provided, must be a boolean or null");
		if (arguments.length > 6 && typeof arguments[6] !== "boolean") throw new $TypeError("`loose`, if provided, must be a boolean");
		var nonEnumerable = arguments.length > 3 ? arguments[3] : null;
		var nonWritable = arguments.length > 4 ? arguments[4] : null;
		var nonConfigurable = arguments.length > 5 ? arguments[5] : null;
		var loose = arguments.length > 6 ? arguments[6] : false;
		var desc = !!gopd && gopd(obj, property);
		if ($defineProperty) $defineProperty(obj, property, {
			configurable: nonConfigurable === null && desc ? desc.configurable : !nonConfigurable,
			enumerable: nonEnumerable === null && desc ? desc.enumerable : !nonEnumerable,
			value,
			writable: nonWritable === null && desc ? desc.writable : !nonWritable
		});
		else if (loose || !nonEnumerable && !nonWritable && !nonConfigurable) obj[property] = value;
		else throw new $SyntaxError("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
	};
}));
//#endregion
//#region extension/node_modules/has-property-descriptors/index.js
var require_has_property_descriptors = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var $defineProperty = require_es_define_property();
	var hasPropertyDescriptors = function hasPropertyDescriptors() {
		return !!$defineProperty;
	};
	hasPropertyDescriptors.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
		if (!$defineProperty) return null;
		try {
			return $defineProperty([], "length", { value: 1 }).length !== 1;
		} catch (e) {
			return true;
		}
	};
	module.exports = hasPropertyDescriptors;
}));
//#endregion
//#region extension/node_modules/set-function-length/index.js
var require_set_function_length = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var GetIntrinsic = require_get_intrinsic();
	var define = require_define_data_property();
	var hasDescriptors = require_has_property_descriptors()();
	var gOPD = require_gopd();
	var $TypeError = require_type();
	var $floor = GetIntrinsic("%Math.floor%");
	/** @type {import('.')} */
	module.exports = function setFunctionLength(fn, length) {
		if (typeof fn !== "function") throw new $TypeError("`fn` is not a function");
		if (typeof length !== "number" || length < 0 || length > 4294967295 || $floor(length) !== length) throw new $TypeError("`length` must be a positive 32-bit integer");
		var loose = arguments.length > 2 && !!arguments[2];
		var functionLengthIsConfigurable = true;
		var functionLengthIsWritable = true;
		if ("length" in fn && gOPD) {
			var desc = gOPD(fn, "length");
			if (desc && !desc.configurable) functionLengthIsConfigurable = false;
			if (desc && !desc.writable) functionLengthIsWritable = false;
		}
		if (functionLengthIsConfigurable || functionLengthIsWritable || !loose) if (hasDescriptors) define(fn, "length", length, true, true);
		else define(fn, "length", length);
		return fn;
	};
}));
//#endregion
//#region extension/node_modules/call-bind-apply-helpers/applyBind.js
var require_applyBind = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var bind = require_function_bind();
	var $apply = require_functionApply();
	var actualApply = require_actualApply();
	/** @type {import('./applyBind')} */
	module.exports = function applyBind() {
		return actualApply(bind, $apply, arguments);
	};
}));
//#endregion
//#region extension/node_modules/call-bind/index.js
var require_call_bind = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var setFunctionLength = require_set_function_length();
	var $defineProperty = require_es_define_property();
	var callBindBasic = require_call_bind_apply_helpers();
	var applyBind = require_applyBind();
	module.exports = function callBind(originalFunction) {
		var func = callBindBasic(arguments);
		var adjustedLength = 1 + originalFunction.length - (arguments.length - 1);
		return setFunctionLength(func, adjustedLength > 0 ? adjustedLength : 0, true);
	};
	if ($defineProperty) $defineProperty(module.exports, "apply", { value: applyBind });
	else module.exports.apply = applyBind;
}));
//#endregion
//#region extension/node_modules/has-tostringtag/shams.js
var require_shams = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var hasSymbols = require_shams$1();
	/** @type {import('.')} */
	module.exports = function hasToStringTagShams() {
		return hasSymbols() && !!Symbol.toStringTag;
	};
}));
//#endregion
//#region extension/node_modules/which-typed-array/index.js
var require_which_typed_array = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var forEach = require_for_each();
	var availableTypedArrays = require_available_typed_arrays();
	var callBind = require_call_bind();
	var callBound = require_call_bound();
	var gOPD = require_gopd();
	var getProto = require_get_proto();
	var $toString = callBound("Object.prototype.toString");
	var hasToStringTag = require_shams()();
	var g = typeof globalThis === "undefined" ? global : globalThis;
	var typedArrays = availableTypedArrays();
	var $slice = callBound("String.prototype.slice");
	/** @import { BoundSet, BoundSlice, Cache, Getter } from './types' */
	/** @import { TypedArrayName } from '.' */
	/** @type {<T = unknown>(array: readonly T[], value: unknown) => number} */
	var $indexOf = callBound("Array.prototype.indexOf", true) || function indexOf(array, value) {
		for (var i = 0; i < array.length; i += 1) if (array[i] === value) return i;
		return -1;
	};
	/** @type {Cache} */
	var cache = { __proto__: null };
	if (hasToStringTag && gOPD && getProto) forEach(typedArrays, function(typedArray) {
		var arr = new g[typedArray]();
		if (Symbol.toStringTag in arr && getProto) {
			var proto = getProto(arr);
			var descriptor = gOPD(proto, Symbol.toStringTag);
			if (!descriptor && proto) descriptor = gOPD(getProto(proto), Symbol.toStringTag);
			if (descriptor && descriptor.get) {
				var bound = callBind(descriptor.get);
				cache["$" + typedArray] = bound;
			}
		}
	});
	else forEach(typedArrays, function(typedArray) {
		var arr = new g[typedArray]();
		var fn = arr.slice || arr.set;
		if (fn) {
			var bound = callBind(fn);
			cache["$" + typedArray] = bound;
		}
	});
	/** @type {(value: object) => false | TypedArrayName} */
	function tryTypedArrays(value) {
		/** @type {ReturnType<typeof tryTypedArrays>} */ var found = false;
		forEach(
			cache,
			/** @param {Getter} getter @param {`$${TypedArrayName}`} typedArray */
			function(getter, typedArray) {
				if (!found) try {
					if ("$" + getter(value) === typedArray) found = $slice(typedArray, 1);
				} catch (e) {}
			}
		);
		return found;
	}
	/** @type {(value: object) => false | TypedArrayName} */
	function trySlices(value) {
		/** @type {ReturnType<typeof trySlices>} */ var found = false;
		forEach(
			cache,
			/** @param {Getter} getter @param {`$${TypedArrayName}`} name */
			function(getter, name) {
				if (!found) try {
					getter(value);
					found = $slice(name, 1);
				} catch (e) {}
			}
		);
		return found;
	}
	/** @type {(tag: unknown) => tag is typeof typedArrays[number]} */
	function isTATag(tag) {
		return $indexOf(typedArrays, tag) > -1;
	}
	/**
	* @type {import('.')}
	* @param {unknown} value
	*/
	module.exports = function whichTypedArray(value) {
		if (!value || typeof value !== "object") return false;
		if (!hasToStringTag) {
			var tag = $slice($toString(value), 8, -1);
			if (isTATag(tag)) return tag;
			if (tag !== "Object") return false;
			return trySlices(value);
		}
		if (!gOPD) return null;
		return tryTypedArrays(value);
	};
}));
//#endregion
//#region extension/node_modules/is-typed-array/index.js
var require_is_typed_array = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var whichTypedArray = require_which_typed_array();
	/** @type {import('.')} */
	module.exports = function isTypedArray(value) {
		return !!whichTypedArray(value);
	};
}));
//#endregion
//#region extension/node_modules/typed-array-buffer/index.js
var require_typed_array_buffer = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var $TypeError = require_type();
	/** @type {undefined | ((thisArg: import('.').TypedArray) => Buffer<ArrayBufferLike>)} */
	var $typedArrayBuffer = require_call_bound()("TypedArray.prototype.buffer", true);
	var isTypedArray = require_is_typed_array();
	/** @type {import('.')} */
	module.exports = $typedArrayBuffer || function typedArrayBuffer(x) {
		if (!isTypedArray(x)) throw new $TypeError("Not a Typed Array");
		return x.buffer;
	};
}));
//#endregion
//#region extension/node_modules/to-buffer/index.js
var require_to_buffer = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Buffer = require_safe_buffer().Buffer;
	var isArray = require_isarray();
	var typedArrayBuffer = require_typed_array_buffer();
	var isView = ArrayBuffer.isView || function isView(obj) {
		try {
			typedArrayBuffer(obj);
			return true;
		} catch (e) {
			return false;
		}
	};
	var useUint8Array = typeof Uint8Array !== "undefined";
	var useArrayBuffer = typeof ArrayBuffer !== "undefined" && typeof Uint8Array !== "undefined";
	var useFromArrayBuffer = useArrayBuffer && (Buffer.prototype instanceof Uint8Array || Buffer.TYPED_ARRAY_SUPPORT);
	module.exports = function toBuffer(data, encoding) {
		if (Buffer.isBuffer(data)) {
			if (data.constructor && !("isBuffer" in data)) return Buffer.from(data);
			return data;
		}
		if (typeof data === "string") return Buffer.from(data, encoding);
		if (useArrayBuffer && isView(data)) {
			if (data.byteLength === 0) return Buffer.alloc(0);
			if (useFromArrayBuffer) {
				var res = Buffer.from(data.buffer, data.byteOffset, data.byteLength);
				if (res.byteLength === data.byteLength) return res;
			}
			var uint8 = data instanceof Uint8Array ? data : new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
			var result = Buffer.from(uint8);
			if (result.length === data.byteLength) return result;
		}
		if (useUint8Array && data instanceof Uint8Array) return Buffer.from(data);
		var isArr = isArray(data);
		if (isArr) for (var i = 0; i < data.length; i += 1) {
			var x = data[i];
			if (typeof x !== "number" || x < 0 || x > 255 || ~~x !== x) throw new RangeError("Array items must be numbers in the range 0-255.");
		}
		if (isArr || Buffer.isBuffer(data) && data.constructor && typeof data.constructor.isBuffer === "function" && data.constructor.isBuffer(data)) return Buffer.from(data);
		throw new TypeError("The \"data\" argument must be a string, an Array, a Buffer, a Uint8Array, or a DataView.");
	};
}));
//#endregion
//#region extension/node_modules/buffer-fill/index.js
var require_buffer_fill = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var hasFullSupport = function() {
		try {
			if (!Buffer.isEncoding("latin1")) return false;
			var buf = Buffer.alloc ? Buffer.alloc(4) : new Buffer(4);
			buf.fill("ab", "ucs2");
			return buf.toString("hex") === "61006200";
		} catch (_) {
			return false;
		}
	}();
	function isSingleByte(val) {
		return val.length === 1 && val.charCodeAt(0) < 256;
	}
	function fillWithNumber(buffer, val, start, end) {
		if (start < 0 || end > buffer.length) throw new RangeError("Out of range index");
		start = start >>> 0;
		end = end === void 0 ? buffer.length : end >>> 0;
		if (end > start) buffer.fill(val, start, end);
		return buffer;
	}
	function fillWithBuffer(buffer, val, start, end) {
		if (start < 0 || end > buffer.length) throw new RangeError("Out of range index");
		if (end <= start) return buffer;
		start = start >>> 0;
		end = end === void 0 ? buffer.length : end >>> 0;
		var pos = start;
		var len = val.length;
		while (pos <= end - len) {
			val.copy(buffer, pos);
			pos += len;
		}
		if (pos !== end) val.copy(buffer, pos, 0, end - pos);
		return buffer;
	}
	function fill(buffer, val, start, end, encoding) {
		if (hasFullSupport) return buffer.fill(val, start, end, encoding);
		if (typeof val === "number") return fillWithNumber(buffer, val, start, end);
		if (typeof val === "string") {
			if (typeof start === "string") {
				encoding = start;
				start = 0;
				end = buffer.length;
			} else if (typeof end === "string") {
				encoding = end;
				end = buffer.length;
			}
			if (encoding !== void 0 && typeof encoding !== "string") throw new TypeError("encoding must be a string");
			if (encoding === "latin1") encoding = "binary";
			if (typeof encoding === "string" && !Buffer.isEncoding(encoding)) throw new TypeError("Unknown encoding: " + encoding);
			if (val === "") return fillWithNumber(buffer, 0, start, end);
			if (isSingleByte(val)) return fillWithNumber(buffer, val.charCodeAt(0), start, end);
			val = new Buffer(val, encoding);
		}
		if (Buffer.isBuffer(val)) return fillWithBuffer(buffer, val, start, end);
		return fillWithNumber(buffer, 0, start, end);
	}
	module.exports = fill;
}));
//#endregion
//#region extension/node_modules/buffer-alloc-unsafe/index.js
var require_buffer_alloc_unsafe = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function allocUnsafe(size) {
		if (typeof size !== "number") throw new TypeError("\"size\" argument must be a number");
		if (size < 0) throw new RangeError("\"size\" argument must not be negative");
		if (Buffer.allocUnsafe) return Buffer.allocUnsafe(size);
		else return new Buffer(size);
	}
	module.exports = allocUnsafe;
}));
//#endregion
//#region extension/node_modules/buffer-alloc/index.js
var require_buffer_alloc = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var bufferFill = require_buffer_fill();
	var allocUnsafe = require_buffer_alloc_unsafe();
	module.exports = function alloc(size, fill, encoding) {
		if (typeof size !== "number") throw new TypeError("\"size\" argument must be a number");
		if (size < 0) throw new RangeError("\"size\" argument must not be negative");
		if (Buffer.alloc) return Buffer.alloc(size, fill, encoding);
		var buffer = allocUnsafe(size);
		if (size === 0) return buffer;
		if (fill === void 0) return bufferFill(buffer, 0);
		if (typeof encoding !== "string") encoding = void 0;
		return bufferFill(buffer, fill, encoding);
	};
}));
//#endregion
//#region extension/node_modules/tar-stream/headers.js
var require_headers = /* @__PURE__ */ __commonJSMin(((exports) => {
	var toBuffer = require_to_buffer();
	var alloc = require_buffer_alloc();
	var ZEROS = "0000000000000000000";
	var SEVENS = "7777777777777777777";
	var ZERO_OFFSET = "0".charCodeAt(0);
	var USTAR = "ustar\x0000";
	var MASK = parseInt("7777", 8);
	var clamp = function(index, len, defaultValue) {
		if (typeof index !== "number") return defaultValue;
		index = ~~index;
		if (index >= len) return len;
		if (index >= 0) return index;
		index += len;
		if (index >= 0) return index;
		return 0;
	};
	var toType = function(flag) {
		switch (flag) {
			case 0: return "file";
			case 1: return "link";
			case 2: return "symlink";
			case 3: return "character-device";
			case 4: return "block-device";
			case 5: return "directory";
			case 6: return "fifo";
			case 7: return "contiguous-file";
			case 72: return "pax-header";
			case 55: return "pax-global-header";
			case 27: return "gnu-long-link-path";
			case 28:
			case 30: return "gnu-long-path";
		}
		return null;
	};
	var toTypeflag = function(flag) {
		switch (flag) {
			case "file": return 0;
			case "link": return 1;
			case "symlink": return 2;
			case "character-device": return 3;
			case "block-device": return 4;
			case "directory": return 5;
			case "fifo": return 6;
			case "contiguous-file": return 7;
			case "pax-header": return 72;
		}
		return 0;
	};
	var indexOf = function(block, num, offset, end) {
		for (; offset < end; offset++) if (block[offset] === num) return offset;
		return end;
	};
	var cksum = function(block) {
		var sum = 256;
		for (var i = 0; i < 148; i++) sum += block[i];
		for (var j = 156; j < 512; j++) sum += block[j];
		return sum;
	};
	var encodeOct = function(val, n) {
		val = val.toString(8);
		if (val.length > n) return SEVENS.slice(0, n) + " ";
		else return ZEROS.slice(0, n - val.length) + val + " ";
	};
	function parse256(buf) {
		var positive;
		if (buf[0] === 128) positive = true;
		else if (buf[0] === 255) positive = false;
		else return null;
		var zero = false;
		var tuple = [];
		for (var i = buf.length - 1; i > 0; i--) {
			var byte = buf[i];
			if (positive) tuple.push(byte);
			else if (zero && byte === 0) tuple.push(0);
			else if (zero) {
				zero = false;
				tuple.push(256 - byte);
			} else tuple.push(255 - byte);
		}
		var sum = 0;
		var l = tuple.length;
		for (i = 0; i < l; i++) sum += tuple[i] * Math.pow(256, i);
		return positive ? sum : -1 * sum;
	}
	var decodeOct = function(val, offset, length) {
		val = val.slice(offset, offset + length);
		offset = 0;
		if (val[offset] & 128) return parse256(val);
		else {
			while (offset < val.length && val[offset] === 32) offset++;
			var end = clamp(indexOf(val, 32, offset, val.length), val.length, val.length);
			while (offset < end && val[offset] === 0) offset++;
			if (end === offset) return 0;
			return parseInt(val.slice(offset, end).toString(), 8);
		}
	};
	var decodeStr = function(val, offset, length, encoding) {
		return val.slice(offset, indexOf(val, 0, offset, offset + length)).toString(encoding);
	};
	var addLength = function(str) {
		var len = Buffer.byteLength(str);
		var digits = Math.floor(Math.log(len) / Math.log(10)) + 1;
		if (len + digits >= Math.pow(10, digits)) digits++;
		return len + digits + str;
	};
	exports.decodeLongPath = function(buf, encoding) {
		return decodeStr(buf, 0, buf.length, encoding);
	};
	exports.encodePax = function(opts) {
		var result = "";
		if (opts.name) result += addLength(" path=" + opts.name + "\n");
		if (opts.linkname) result += addLength(" linkpath=" + opts.linkname + "\n");
		var pax = opts.pax;
		if (pax) for (var key in pax) result += addLength(" " + key + "=" + pax[key] + "\n");
		return toBuffer(result);
	};
	exports.decodePax = function(buf) {
		var result = {};
		while (buf.length) {
			var i = 0;
			while (i < buf.length && buf[i] !== 32) i++;
			var len = parseInt(buf.slice(0, i).toString(), 10);
			if (!len) return result;
			var b = buf.slice(i + 1, len - 1).toString();
			var keyIndex = b.indexOf("=");
			if (keyIndex === -1) return result;
			result[b.slice(0, keyIndex)] = b.slice(keyIndex + 1);
			buf = buf.slice(len);
		}
		return result;
	};
	exports.encode = function(opts) {
		var buf = alloc(512);
		var name = opts.name;
		var prefix = "";
		if (opts.typeflag === 5 && name[name.length - 1] !== "/") name += "/";
		if (Buffer.byteLength(name) !== name.length) return null;
		while (Buffer.byteLength(name) > 100) {
			var i = name.indexOf("/");
			if (i === -1) return null;
			prefix += prefix ? "/" + name.slice(0, i) : name.slice(0, i);
			name = name.slice(i + 1);
		}
		if (Buffer.byteLength(name) > 100 || Buffer.byteLength(prefix) > 155) return null;
		if (opts.linkname && Buffer.byteLength(opts.linkname) > 100) return null;
		buf.write(name);
		buf.write(encodeOct(opts.mode & MASK, 6), 100);
		buf.write(encodeOct(opts.uid, 6), 108);
		buf.write(encodeOct(opts.gid, 6), 116);
		buf.write(encodeOct(opts.size, 11), 124);
		buf.write(encodeOct(opts.mtime.getTime() / 1e3 | 0, 11), 136);
		buf[156] = ZERO_OFFSET + toTypeflag(opts.type);
		if (opts.linkname) buf.write(opts.linkname, 157);
		buf.write(USTAR, 257);
		if (opts.uname) buf.write(opts.uname, 265);
		if (opts.gname) buf.write(opts.gname, 297);
		buf.write(encodeOct(opts.devmajor || 0, 6), 329);
		buf.write(encodeOct(opts.devminor || 0, 6), 337);
		if (prefix) buf.write(prefix, 345);
		buf.write(encodeOct(cksum(buf), 6), 148);
		return buf;
	};
	exports.decode = function(buf, filenameEncoding) {
		var typeflag = buf[156] === 0 ? 0 : buf[156] - ZERO_OFFSET;
		var name = decodeStr(buf, 0, 100, filenameEncoding);
		var mode = decodeOct(buf, 100, 8);
		var uid = decodeOct(buf, 108, 8);
		var gid = decodeOct(buf, 116, 8);
		var size = decodeOct(buf, 124, 12);
		var mtime = decodeOct(buf, 136, 12);
		var type = toType(typeflag);
		var linkname = buf[157] === 0 ? null : decodeStr(buf, 157, 100, filenameEncoding);
		var uname = decodeStr(buf, 265, 32);
		var gname = decodeStr(buf, 297, 32);
		var devmajor = decodeOct(buf, 329, 8);
		var devminor = decodeOct(buf, 337, 8);
		if (buf[345]) name = decodeStr(buf, 345, 155, filenameEncoding) + "/" + name;
		if (typeflag === 0 && name && name[name.length - 1] === "/") typeflag = 5;
		var c = cksum(buf);
		if (c === 256) return null;
		if (c !== decodeOct(buf, 148, 8)) throw new Error("Invalid tar header. Maybe the tar is corrupted or it needs to be gunzipped?");
		return {
			name,
			mode,
			uid,
			gid,
			size,
			mtime: /* @__PURE__ */ new Date(1e3 * mtime),
			type,
			linkname,
			uname,
			gname,
			devmajor,
			devminor
		};
	};
}));
//#endregion
//#region extension/node_modules/tar-stream/extract.js
var require_extract = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var util$4 = require("util");
	var bl = require_bl();
	var xtend = require_immutable();
	var headers = require_headers();
	var Writable = require_readable().Writable;
	var PassThrough = require_readable().PassThrough;
	var noop = function() {};
	var overflow = function(size) {
		size &= 511;
		return size && 512 - size;
	};
	var emptyStream = function(self, offset) {
		var s = new Source(self, offset);
		s.end();
		return s;
	};
	var mixinPax = function(header, pax) {
		if (pax.path) header.name = pax.path;
		if (pax.linkpath) header.linkname = pax.linkpath;
		if (pax.size) header.size = parseInt(pax.size, 10);
		header.pax = pax;
		return header;
	};
	var Source = function(self, offset) {
		this._parent = self;
		this.offset = offset;
		PassThrough.call(this);
	};
	util$4.inherits(Source, PassThrough);
	Source.prototype.destroy = function(err) {
		this._parent.destroy(err);
	};
	var Extract = function(opts) {
		if (!(this instanceof Extract)) return new Extract(opts);
		Writable.call(this, opts);
		opts = opts || {};
		this._offset = 0;
		this._buffer = bl();
		this._missing = 0;
		this._partial = false;
		this._onparse = noop;
		this._header = null;
		this._stream = null;
		this._overflow = null;
		this._cb = null;
		this._locked = false;
		this._destroyed = false;
		this._pax = null;
		this._paxGlobal = null;
		this._gnuLongPath = null;
		this._gnuLongLinkPath = null;
		var self = this;
		var b = self._buffer;
		var oncontinue = function() {
			self._continue();
		};
		var onunlock = function(err) {
			self._locked = false;
			if (err) return self.destroy(err);
			if (!self._stream) oncontinue();
		};
		var onstreamend = function() {
			self._stream = null;
			var drain = overflow(self._header.size);
			if (drain) self._parse(drain, ondrain);
			else self._parse(512, onheader);
			if (!self._locked) oncontinue();
		};
		var ondrain = function() {
			self._buffer.consume(overflow(self._header.size));
			self._parse(512, onheader);
			oncontinue();
		};
		var onpaxglobalheader = function() {
			var size = self._header.size;
			self._paxGlobal = headers.decodePax(b.slice(0, size));
			b.consume(size);
			onstreamend();
		};
		var onpaxheader = function() {
			var size = self._header.size;
			self._pax = headers.decodePax(b.slice(0, size));
			if (self._paxGlobal) self._pax = xtend(self._paxGlobal, self._pax);
			b.consume(size);
			onstreamend();
		};
		var ongnulongpath = function() {
			var size = self._header.size;
			this._gnuLongPath = headers.decodeLongPath(b.slice(0, size), opts.filenameEncoding);
			b.consume(size);
			onstreamend();
		};
		var ongnulonglinkpath = function() {
			var size = self._header.size;
			this._gnuLongLinkPath = headers.decodeLongPath(b.slice(0, size), opts.filenameEncoding);
			b.consume(size);
			onstreamend();
		};
		var onheader = function() {
			var offset = self._offset;
			var header;
			try {
				header = self._header = headers.decode(b.slice(0, 512), opts.filenameEncoding);
			} catch (err) {
				self.emit("error", err);
			}
			b.consume(512);
			if (!header) {
				self._parse(512, onheader);
				oncontinue();
				return;
			}
			if (header.type === "gnu-long-path") {
				self._parse(header.size, ongnulongpath);
				oncontinue();
				return;
			}
			if (header.type === "gnu-long-link-path") {
				self._parse(header.size, ongnulonglinkpath);
				oncontinue();
				return;
			}
			if (header.type === "pax-global-header") {
				self._parse(header.size, onpaxglobalheader);
				oncontinue();
				return;
			}
			if (header.type === "pax-header") {
				self._parse(header.size, onpaxheader);
				oncontinue();
				return;
			}
			if (self._gnuLongPath) {
				header.name = self._gnuLongPath;
				self._gnuLongPath = null;
			}
			if (self._gnuLongLinkPath) {
				header.linkname = self._gnuLongLinkPath;
				self._gnuLongLinkPath = null;
			}
			if (self._pax) {
				self._header = header = mixinPax(header, self._pax);
				self._pax = null;
			}
			self._locked = true;
			if (!header.size || header.type === "directory") {
				self._parse(512, onheader);
				self.emit("entry", header, emptyStream(self, offset), onunlock);
				return;
			}
			self._stream = new Source(self, offset);
			self.emit("entry", header, self._stream, onunlock);
			self._parse(header.size, onstreamend);
			oncontinue();
		};
		this._onheader = onheader;
		this._parse(512, onheader);
	};
	util$4.inherits(Extract, Writable);
	Extract.prototype.destroy = function(err) {
		if (this._destroyed) return;
		this._destroyed = true;
		if (err) this.emit("error", err);
		this.emit("close");
		if (this._stream) this._stream.emit("close");
	};
	Extract.prototype._parse = function(size, onparse) {
		if (this._destroyed) return;
		this._offset += size;
		this._missing = size;
		if (onparse === this._onheader) this._partial = false;
		this._onparse = onparse;
	};
	Extract.prototype._continue = function() {
		if (this._destroyed) return;
		var cb = this._cb;
		this._cb = noop;
		if (this._overflow) this._write(this._overflow, void 0, cb);
		else cb();
	};
	Extract.prototype._write = function(data, enc, cb) {
		if (this._destroyed) return;
		var s = this._stream;
		var b = this._buffer;
		var missing = this._missing;
		if (data.length) this._partial = true;
		if (data.length < missing) {
			this._missing -= data.length;
			this._overflow = null;
			if (s) return s.write(data, cb);
			b.append(data);
			return cb();
		}
		this._cb = cb;
		this._missing = 0;
		var overflow = null;
		if (data.length > missing) {
			overflow = data.slice(missing);
			data = data.slice(0, missing);
		}
		if (s) s.end(data);
		else b.append(data);
		this._overflow = overflow;
		this._onparse();
	};
	Extract.prototype._final = function(cb) {
		if (this._partial) return this.destroy(/* @__PURE__ */ new Error("Unexpected end of data"));
		cb();
	};
	module.exports = Extract;
}));
//#endregion
//#region extension/node_modules/fs-constants/index.js
var require_fs_constants = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require("fs").constants || require("constants");
}));
//#endregion
//#region extension/node_modules/wrappy/wrappy.js
var require_wrappy = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = wrappy;
	function wrappy(fn, cb) {
		if (fn && cb) return wrappy(fn)(cb);
		if (typeof fn !== "function") throw new TypeError("need wrapper function");
		Object.keys(fn).forEach(function(k) {
			wrapper[k] = fn[k];
		});
		return wrapper;
		function wrapper() {
			var args = new Array(arguments.length);
			for (var i = 0; i < args.length; i++) args[i] = arguments[i];
			var ret = fn.apply(this, args);
			var cb = args[args.length - 1];
			if (typeof ret === "function" && ret !== cb) Object.keys(cb).forEach(function(k) {
				ret[k] = cb[k];
			});
			return ret;
		}
	}
}));
//#endregion
//#region extension/node_modules/once/once.js
var require_once = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var wrappy = require_wrappy();
	module.exports = wrappy(once);
	module.exports.strict = wrappy(onceStrict);
	once.proto = once(function() {
		Object.defineProperty(Function.prototype, "once", {
			value: function() {
				return once(this);
			},
			configurable: true
		});
		Object.defineProperty(Function.prototype, "onceStrict", {
			value: function() {
				return onceStrict(this);
			},
			configurable: true
		});
	});
	function once(fn) {
		var f = function() {
			if (f.called) return f.value;
			f.called = true;
			return f.value = fn.apply(this, arguments);
		};
		f.called = false;
		return f;
	}
	function onceStrict(fn) {
		var f = function() {
			if (f.called) throw new Error(f.onceError);
			f.called = true;
			return f.value = fn.apply(this, arguments);
		};
		f.onceError = (fn.name || "Function wrapped with `once`") + " shouldn't be called more than once";
		f.called = false;
		return f;
	}
}));
//#endregion
//#region extension/node_modules/end-of-stream/index.js
var require_end_of_stream = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var once = require_once();
	var noop = function() {};
	var qnt = global.Bare ? queueMicrotask : process.nextTick.bind(process);
	var isRequest = function(stream) {
		return stream.setHeader && typeof stream.abort === "function";
	};
	var isChildProcess = function(stream) {
		return stream.stdio && Array.isArray(stream.stdio) && stream.stdio.length === 3;
	};
	var eos = function(stream, opts, callback) {
		if (typeof opts === "function") return eos(stream, null, opts);
		if (!opts) opts = {};
		callback = once(callback || noop);
		var ws = stream._writableState;
		var rs = stream._readableState;
		var readable = opts.readable || opts.readable !== false && stream.readable;
		var writable = opts.writable || opts.writable !== false && stream.writable;
		var cancelled = false;
		var onlegacyfinish = function() {
			if (!stream.writable) onfinish();
		};
		var onfinish = function() {
			writable = false;
			if (!readable) callback.call(stream);
		};
		var onend = function() {
			readable = false;
			if (!writable) callback.call(stream);
		};
		var onexit = function(exitCode) {
			callback.call(stream, exitCode ? /* @__PURE__ */ new Error("exited with error code: " + exitCode) : null);
		};
		var onerror = function(err) {
			callback.call(stream, err);
		};
		var onclose = function() {
			qnt(onclosenexttick);
		};
		var onclosenexttick = function() {
			if (cancelled) return;
			if (readable && !(rs && rs.ended && !rs.destroyed)) return callback.call(stream, /* @__PURE__ */ new Error("premature close"));
			if (writable && !(ws && ws.ended && !ws.destroyed)) return callback.call(stream, /* @__PURE__ */ new Error("premature close"));
		};
		var onrequest = function() {
			stream.req.on("finish", onfinish);
		};
		if (isRequest(stream)) {
			stream.on("complete", onfinish);
			stream.on("abort", onclose);
			if (stream.req) onrequest();
			else stream.on("request", onrequest);
		} else if (writable && !ws) {
			stream.on("end", onlegacyfinish);
			stream.on("close", onlegacyfinish);
		}
		if (isChildProcess(stream)) stream.on("exit", onexit);
		stream.on("end", onend);
		stream.on("finish", onfinish);
		if (opts.error !== false) stream.on("error", onerror);
		stream.on("close", onclose);
		return function() {
			cancelled = true;
			stream.removeListener("complete", onfinish);
			stream.removeListener("abort", onclose);
			stream.removeListener("request", onrequest);
			if (stream.req) stream.req.removeListener("finish", onfinish);
			stream.removeListener("end", onlegacyfinish);
			stream.removeListener("close", onlegacyfinish);
			stream.removeListener("finish", onfinish);
			stream.removeListener("exit", onexit);
			stream.removeListener("end", onend);
			stream.removeListener("error", onerror);
			stream.removeListener("close", onclose);
		};
	};
	module.exports = eos;
}));
//#endregion
//#region extension/node_modules/tar-stream/pack.js
var require_pack = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var constants = require_fs_constants();
	var eos = require_end_of_stream();
	var util$3 = require("util");
	var alloc = require_buffer_alloc();
	var toBuffer = require_to_buffer();
	var Readable = require_readable().Readable;
	var Writable = require_readable().Writable;
	var StringDecoder = require("string_decoder").StringDecoder;
	var headers = require_headers();
	var DMODE = parseInt("755", 8);
	var FMODE = parseInt("644", 8);
	var END_OF_TAR = alloc(1024);
	var noop = function() {};
	var overflow = function(self, size) {
		size &= 511;
		if (size) self.push(END_OF_TAR.slice(0, 512 - size));
	};
	function modeToType(mode) {
		switch (mode & constants.S_IFMT) {
			case constants.S_IFBLK: return "block-device";
			case constants.S_IFCHR: return "character-device";
			case constants.S_IFDIR: return "directory";
			case constants.S_IFIFO: return "fifo";
			case constants.S_IFLNK: return "symlink";
		}
		return "file";
	}
	var Sink = function(to) {
		Writable.call(this);
		this.written = 0;
		this._to = to;
		this._destroyed = false;
	};
	util$3.inherits(Sink, Writable);
	Sink.prototype._write = function(data, enc, cb) {
		this.written += data.length;
		if (this._to.push(data)) return cb();
		this._to._drain = cb;
	};
	Sink.prototype.destroy = function() {
		if (this._destroyed) return;
		this._destroyed = true;
		this.emit("close");
	};
	var LinkSink = function() {
		Writable.call(this);
		this.linkname = "";
		this._decoder = new StringDecoder("utf-8");
		this._destroyed = false;
	};
	util$3.inherits(LinkSink, Writable);
	LinkSink.prototype._write = function(data, enc, cb) {
		this.linkname += this._decoder.write(data);
		cb();
	};
	LinkSink.prototype.destroy = function() {
		if (this._destroyed) return;
		this._destroyed = true;
		this.emit("close");
	};
	var Void = function() {
		Writable.call(this);
		this._destroyed = false;
	};
	util$3.inherits(Void, Writable);
	Void.prototype._write = function(data, enc, cb) {
		cb(/* @__PURE__ */ new Error("No body allowed for this entry"));
	};
	Void.prototype.destroy = function() {
		if (this._destroyed) return;
		this._destroyed = true;
		this.emit("close");
	};
	var Pack = function(opts) {
		if (!(this instanceof Pack)) return new Pack(opts);
		Readable.call(this, opts);
		this._drain = noop;
		this._finalized = false;
		this._finalizing = false;
		this._destroyed = false;
		this._stream = null;
	};
	util$3.inherits(Pack, Readable);
	Pack.prototype.entry = function(header, buffer, callback) {
		if (this._stream) throw new Error("already piping an entry");
		if (this._finalized || this._destroyed) return;
		if (typeof buffer === "function") {
			callback = buffer;
			buffer = null;
		}
		if (!callback) callback = noop;
		var self = this;
		if (!header.size || header.type === "symlink") header.size = 0;
		if (!header.type) header.type = modeToType(header.mode);
		if (!header.mode) header.mode = header.type === "directory" ? DMODE : FMODE;
		if (!header.uid) header.uid = 0;
		if (!header.gid) header.gid = 0;
		if (!header.mtime) header.mtime = /* @__PURE__ */ new Date();
		if (typeof buffer === "string") buffer = toBuffer(buffer);
		if (Buffer.isBuffer(buffer)) {
			header.size = buffer.length;
			this._encode(header);
			this.push(buffer);
			overflow(self, header.size);
			process.nextTick(callback);
			return new Void();
		}
		if (header.type === "symlink" && !header.linkname) {
			var linkSink = new LinkSink();
			eos(linkSink, function(err) {
				if (err) {
					self.destroy();
					return callback(err);
				}
				header.linkname = linkSink.linkname;
				self._encode(header);
				callback();
			});
			return linkSink;
		}
		this._encode(header);
		if (header.type !== "file" && header.type !== "contiguous-file") {
			process.nextTick(callback);
			return new Void();
		}
		var sink = new Sink(this);
		this._stream = sink;
		eos(sink, function(err) {
			self._stream = null;
			if (err) {
				self.destroy();
				return callback(err);
			}
			if (sink.written !== header.size) {
				self.destroy();
				return callback(/* @__PURE__ */ new Error("size mismatch"));
			}
			overflow(self, header.size);
			if (self._finalizing) self.finalize();
			callback();
		});
		return sink;
	};
	Pack.prototype.finalize = function() {
		if (this._stream) {
			this._finalizing = true;
			return;
		}
		if (this._finalized) return;
		this._finalized = true;
		this.push(END_OF_TAR);
		this.push(null);
	};
	Pack.prototype.destroy = function(err) {
		if (this._destroyed) return;
		this._destroyed = true;
		if (err) this.emit("error", err);
		this.emit("close");
		if (this._stream && this._stream.destroy) this._stream.destroy();
	};
	Pack.prototype._encode = function(header) {
		if (!header.pax) {
			var buf = headers.encode(header);
			if (buf) {
				this.push(buf);
				return;
			}
		}
		this._encodePax(header);
	};
	Pack.prototype._encodePax = function(header) {
		var paxHeader = headers.encodePax({
			name: header.name,
			linkname: header.linkname,
			pax: header.pax
		});
		var newHeader = {
			name: "PaxHeader",
			mode: header.mode,
			uid: header.uid,
			gid: header.gid,
			size: paxHeader.length,
			mtime: header.mtime,
			type: "pax-header",
			linkname: header.linkname && "PaxHeader",
			uname: header.uname,
			gname: header.gname,
			devmajor: header.devmajor,
			devminor: header.devminor
		};
		this.push(headers.encode(newHeader));
		this.push(paxHeader);
		overflow(this, paxHeader.length);
		newHeader.size = header.size;
		newHeader.type = header.type;
		this.push(headers.encode(newHeader));
	};
	Pack.prototype._read = function(n) {
		var drain = this._drain;
		this._drain = noop;
		drain();
	};
	module.exports = Pack;
}));
//#endregion
//#region extension/node_modules/tar-stream/index.js
var require_tar_stream = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.extract = require_extract();
	exports.pack = require_pack();
}));
//#endregion
//#region extension/node_modules/decompress-tar/index.js
var require_decompress_tar = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var fileType = require_file_type$2();
	var isStream = require_is_stream();
	var tarStream = require_tar_stream();
	module.exports = () => (input) => {
		if (!Buffer.isBuffer(input) && !isStream(input)) return Promise.reject(/* @__PURE__ */ new TypeError(`Expected a Buffer or Stream, got ${typeof input}`));
		if (Buffer.isBuffer(input) && (!fileType(input) || fileType(input).ext !== "tar")) return Promise.resolve([]);
		const extract = tarStream.extract();
		const files = [];
		extract.on("entry", (header, stream, cb) => {
			const chunk = [];
			stream.on("data", (data) => chunk.push(data));
			stream.on("end", () => {
				const file = {
					data: Buffer.concat(chunk),
					mode: header.mode,
					mtime: header.mtime,
					path: header.name,
					type: header.type
				};
				if (header.type === "symlink" || header.type === "link") file.linkname = header.linkname;
				files.push(file);
				cb();
			});
		});
		const promise = new Promise((resolve, reject) => {
			if (!Buffer.isBuffer(input)) input.on("error", reject);
			extract.on("finish", () => resolve(files));
			extract.on("error", reject);
		});
		extract.then = promise.then.bind(promise);
		extract.catch = promise.catch.bind(promise);
		if (Buffer.isBuffer(input)) extract.end(input);
		else input.pipe(extract);
		return extract;
	};
}));
//#endregion
//#region extension/node_modules/decompress-tarbz2/node_modules/file-type/index.js
var require_file_type$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var toBytes = (s) => Array.from(s).map((c) => c.charCodeAt(0));
	var xpiZipFilename = toBytes("META-INF/mozilla.rsa");
	var oxmlContentTypes = toBytes("[Content_Types].xml");
	var oxmlRels = toBytes("_rels/.rels");
	module.exports = (input) => {
		const buf = new Uint8Array(input);
		if (!(buf && buf.length > 1)) return null;
		const check = (header, opts) => {
			opts = Object.assign({ offset: 0 }, opts);
			for (let i = 0; i < header.length; i++) if (opts.mask) {
				if (header[i] !== (opts.mask[i] & buf[i + opts.offset])) return false;
			} else if (header[i] !== buf[i + opts.offset]) return false;
			return true;
		};
		if (check([
			255,
			216,
			255
		])) return {
			ext: "jpg",
			mime: "image/jpeg"
		};
		if (check([
			137,
			80,
			78,
			71,
			13,
			10,
			26,
			10
		])) return {
			ext: "png",
			mime: "image/png"
		};
		if (check([
			71,
			73,
			70
		])) return {
			ext: "gif",
			mime: "image/gif"
		};
		if (check([
			87,
			69,
			66,
			80
		], { offset: 8 })) return {
			ext: "webp",
			mime: "image/webp"
		};
		if (check([
			70,
			76,
			73,
			70
		])) return {
			ext: "flif",
			mime: "image/flif"
		};
		if ((check([
			73,
			73,
			42,
			0
		]) || check([
			77,
			77,
			0,
			42
		])) && check([67, 82], { offset: 8 })) return {
			ext: "cr2",
			mime: "image/x-canon-cr2"
		};
		if (check([
			73,
			73,
			42,
			0
		]) || check([
			77,
			77,
			0,
			42
		])) return {
			ext: "tif",
			mime: "image/tiff"
		};
		if (check([66, 77])) return {
			ext: "bmp",
			mime: "image/bmp"
		};
		if (check([
			73,
			73,
			188
		])) return {
			ext: "jxr",
			mime: "image/vnd.ms-photo"
		};
		if (check([
			56,
			66,
			80,
			83
		])) return {
			ext: "psd",
			mime: "image/vnd.adobe.photoshop"
		};
		if (check([
			80,
			75,
			3,
			4
		])) {
			if (check([
				109,
				105,
				109,
				101,
				116,
				121,
				112,
				101,
				97,
				112,
				112,
				108,
				105,
				99,
				97,
				116,
				105,
				111,
				110,
				47,
				101,
				112,
				117,
				98,
				43,
				122,
				105,
				112
			], { offset: 30 })) return {
				ext: "epub",
				mime: "application/epub+zip"
			};
			if (check(xpiZipFilename, { offset: 30 })) return {
				ext: "xpi",
				mime: "application/x-xpinstall"
			};
			if (check(oxmlContentTypes, { offset: 30 }) || check(oxmlRels, { offset: 30 })) {
				const sliced = buf.subarray(4, 2004);
				const nextZipHeaderIndex = (arr) => arr.findIndex((el, i, arr) => arr[i] === 80 && arr[i + 1] === 75 && arr[i + 2] === 3 && arr[i + 3] === 4);
				const header2Pos = nextZipHeaderIndex(sliced);
				if (header2Pos !== -1) {
					const header3Pos = nextZipHeaderIndex(buf.subarray(header2Pos + 8, header2Pos + 8 + 1e3));
					if (header3Pos !== -1) {
						const offset = 8 + header2Pos + header3Pos + 30;
						if (check(toBytes("word/"), { offset })) return {
							ext: "docx",
							mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
						};
						if (check(toBytes("ppt/"), { offset })) return {
							ext: "pptx",
							mime: "application/vnd.openxmlformats-officedocument.presentationml.presentation"
						};
						if (check(toBytes("xl/"), { offset })) return {
							ext: "xlsx",
							mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
						};
					}
				}
			}
		}
		if (check([80, 75]) && (buf[2] === 3 || buf[2] === 5 || buf[2] === 7) && (buf[3] === 4 || buf[3] === 6 || buf[3] === 8)) return {
			ext: "zip",
			mime: "application/zip"
		};
		if (check([
			117,
			115,
			116,
			97,
			114
		], { offset: 257 })) return {
			ext: "tar",
			mime: "application/x-tar"
		};
		if (check([
			82,
			97,
			114,
			33,
			26,
			7
		]) && (buf[6] === 0 || buf[6] === 1)) return {
			ext: "rar",
			mime: "application/x-rar-compressed"
		};
		if (check([
			31,
			139,
			8
		])) return {
			ext: "gz",
			mime: "application/gzip"
		};
		if (check([
			66,
			90,
			104
		])) return {
			ext: "bz2",
			mime: "application/x-bzip2"
		};
		if (check([
			55,
			122,
			188,
			175,
			39,
			28
		])) return {
			ext: "7z",
			mime: "application/x-7z-compressed"
		};
		if (check([120, 1])) return {
			ext: "dmg",
			mime: "application/x-apple-diskimage"
		};
		if (check([
			51,
			103,
			112,
			53
		]) || check([
			0,
			0,
			0
		]) && check([
			102,
			116,
			121,
			112
		], { offset: 4 }) && (check([
			109,
			112,
			52,
			49
		], { offset: 8 }) || check([
			109,
			112,
			52,
			50
		], { offset: 8 }) || check([
			105,
			115,
			111,
			109
		], { offset: 8 }) || check([
			105,
			115,
			111,
			50
		], { offset: 8 }) || check([
			109,
			109,
			112,
			52
		], { offset: 8 }) || check([
			77,
			52,
			86
		], { offset: 8 }) || check([
			100,
			97,
			115,
			104
		], { offset: 8 }))) return {
			ext: "mp4",
			mime: "video/mp4"
		};
		if (check([
			77,
			84,
			104,
			100
		])) return {
			ext: "mid",
			mime: "audio/midi"
		};
		if (check([
			26,
			69,
			223,
			163
		])) {
			const sliced = buf.subarray(4, 4100);
			const idPos = sliced.findIndex((el, i, arr) => arr[i] === 66 && arr[i + 1] === 130);
			if (idPos !== -1) {
				const docTypePos = idPos + 3;
				const findDocType = (type) => Array.from(type).every((c, i) => sliced[docTypePos + i] === c.charCodeAt(0));
				if (findDocType("matroska")) return {
					ext: "mkv",
					mime: "video/x-matroska"
				};
				if (findDocType("webm")) return {
					ext: "webm",
					mime: "video/webm"
				};
			}
		}
		if (check([
			0,
			0,
			0,
			20,
			102,
			116,
			121,
			112,
			113,
			116,
			32,
			32
		]) || check([
			102,
			114,
			101,
			101
		], { offset: 4 }) || check([
			102,
			116,
			121,
			112,
			113,
			116,
			32,
			32
		], { offset: 4 }) || check([
			109,
			100,
			97,
			116
		], { offset: 4 }) || check([
			119,
			105,
			100,
			101
		], { offset: 4 })) return {
			ext: "mov",
			mime: "video/quicktime"
		};
		if (check([
			82,
			73,
			70,
			70
		]) && check([
			65,
			86,
			73
		], { offset: 8 })) return {
			ext: "avi",
			mime: "video/x-msvideo"
		};
		if (check([
			48,
			38,
			178,
			117,
			142,
			102,
			207,
			17,
			166,
			217
		])) return {
			ext: "wmv",
			mime: "video/x-ms-wmv"
		};
		if (check([
			0,
			0,
			1,
			186
		])) return {
			ext: "mpg",
			mime: "video/mpeg"
		};
		for (let start = 0; start < 2 && start < buf.length - 16; start++) if (check([
			73,
			68,
			51
		], { offset: start }) || check([255, 226], {
			offset: start,
			mask: [255, 226]
		})) return {
			ext: "mp3",
			mime: "audio/mpeg"
		};
		if (check([
			102,
			116,
			121,
			112,
			77,
			52,
			65
		], { offset: 4 }) || check([
			77,
			52,
			65,
			32
		])) return {
			ext: "m4a",
			mime: "audio/m4a"
		};
		if (check([
			79,
			112,
			117,
			115,
			72,
			101,
			97,
			100
		], { offset: 28 })) return {
			ext: "opus",
			mime: "audio/opus"
		};
		if (check([
			79,
			103,
			103,
			83
		])) return {
			ext: "ogg",
			mime: "audio/ogg"
		};
		if (check([
			102,
			76,
			97,
			67
		])) return {
			ext: "flac",
			mime: "audio/x-flac"
		};
		if (check([
			82,
			73,
			70,
			70
		]) && check([
			87,
			65,
			86,
			69
		], { offset: 8 })) return {
			ext: "wav",
			mime: "audio/x-wav"
		};
		if (check([
			35,
			33,
			65,
			77,
			82,
			10
		])) return {
			ext: "amr",
			mime: "audio/amr"
		};
		if (check([
			37,
			80,
			68,
			70
		])) return {
			ext: "pdf",
			mime: "application/pdf"
		};
		if (check([77, 90])) return {
			ext: "exe",
			mime: "application/x-msdownload"
		};
		if ((buf[0] === 67 || buf[0] === 70) && check([87, 83], { offset: 1 })) return {
			ext: "swf",
			mime: "application/x-shockwave-flash"
		};
		if (check([
			123,
			92,
			114,
			116,
			102
		])) return {
			ext: "rtf",
			mime: "application/rtf"
		};
		if (check([
			0,
			97,
			115,
			109
		])) return {
			ext: "wasm",
			mime: "application/wasm"
		};
		if (check([
			119,
			79,
			70,
			70
		]) && (check([
			0,
			1,
			0,
			0
		], { offset: 4 }) || check([
			79,
			84,
			84,
			79
		], { offset: 4 }))) return {
			ext: "woff",
			mime: "font/woff"
		};
		if (check([
			119,
			79,
			70,
			50
		]) && (check([
			0,
			1,
			0,
			0
		], { offset: 4 }) || check([
			79,
			84,
			84,
			79
		], { offset: 4 }))) return {
			ext: "woff2",
			mime: "font/woff2"
		};
		if (check([76, 80], { offset: 34 }) && (check([
			0,
			0,
			1
		], { offset: 8 }) || check([
			1,
			0,
			2
		], { offset: 8 }) || check([
			2,
			0,
			2
		], { offset: 8 }))) return {
			ext: "eot",
			mime: "application/octet-stream"
		};
		if (check([
			0,
			1,
			0,
			0,
			0
		])) return {
			ext: "ttf",
			mime: "font/ttf"
		};
		if (check([
			79,
			84,
			84,
			79,
			0
		])) return {
			ext: "otf",
			mime: "font/otf"
		};
		if (check([
			0,
			0,
			1,
			0
		])) return {
			ext: "ico",
			mime: "image/x-icon"
		};
		if (check([
			70,
			76,
			86,
			1
		])) return {
			ext: "flv",
			mime: "video/x-flv"
		};
		if (check([37, 33])) return {
			ext: "ps",
			mime: "application/postscript"
		};
		if (check([
			253,
			55,
			122,
			88,
			90,
			0
		])) return {
			ext: "xz",
			mime: "application/x-xz"
		};
		if (check([
			83,
			81,
			76,
			105
		])) return {
			ext: "sqlite",
			mime: "application/x-sqlite3"
		};
		if (check([
			78,
			69,
			83,
			26
		])) return {
			ext: "nes",
			mime: "application/x-nintendo-nes-rom"
		};
		if (check([
			67,
			114,
			50,
			52
		])) return {
			ext: "crx",
			mime: "application/x-google-chrome-extension"
		};
		if (check([
			77,
			83,
			67,
			70
		]) || check([
			73,
			83,
			99,
			40
		])) return {
			ext: "cab",
			mime: "application/vnd.ms-cab-compressed"
		};
		if (check([
			33,
			60,
			97,
			114,
			99,
			104,
			62,
			10,
			100,
			101,
			98,
			105,
			97,
			110,
			45,
			98,
			105,
			110,
			97,
			114,
			121
		])) return {
			ext: "deb",
			mime: "application/x-deb"
		};
		if (check([
			33,
			60,
			97,
			114,
			99,
			104,
			62
		])) return {
			ext: "ar",
			mime: "application/x-unix-archive"
		};
		if (check([
			237,
			171,
			238,
			219
		])) return {
			ext: "rpm",
			mime: "application/x-rpm"
		};
		if (check([31, 160]) || check([31, 157])) return {
			ext: "Z",
			mime: "application/x-compress"
		};
		if (check([
			76,
			90,
			73,
			80
		])) return {
			ext: "lz",
			mime: "application/x-lzip"
		};
		if (check([
			208,
			207,
			17,
			224,
			161,
			177,
			26,
			225
		])) return {
			ext: "msi",
			mime: "application/x-msi"
		};
		if (check([
			6,
			14,
			43,
			52,
			2,
			5,
			1,
			1,
			13,
			1,
			2,
			1,
			1,
			2
		])) return {
			ext: "mxf",
			mime: "application/mxf"
		};
		if (check([71], { offset: 4 }) && (check([71], { offset: 192 }) || check([71], { offset: 196 }))) return {
			ext: "mts",
			mime: "video/mp2t"
		};
		if (check([
			66,
			76,
			69,
			78,
			68,
			69,
			82
		])) return {
			ext: "blend",
			mime: "application/x-blender"
		};
		if (check([
			66,
			80,
			71,
			251
		])) return {
			ext: "bpg",
			mime: "image/bpg"
		};
		return null;
	};
}));
//#endregion
//#region extension/node_modules/seek-bzip/lib/bitreader.js
var require_bitreader = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BITMASK = [
		0,
		1,
		3,
		7,
		15,
		31,
		63,
		127,
		255
	];
	var BitReader = function(stream) {
		this.stream = stream;
		this.bitOffset = 0;
		this.curByte = 0;
		this.hasByte = false;
	};
	BitReader.prototype._ensureByte = function() {
		if (!this.hasByte) {
			this.curByte = this.stream.readByte();
			this.hasByte = true;
		}
	};
	BitReader.prototype.read = function(bits) {
		var result = 0;
		while (bits > 0) {
			this._ensureByte();
			var remaining = 8 - this.bitOffset;
			if (bits >= remaining) {
				result <<= remaining;
				result |= BITMASK[remaining] & this.curByte;
				this.hasByte = false;
				this.bitOffset = 0;
				bits -= remaining;
			} else {
				result <<= bits;
				var shift = remaining - bits;
				result |= (this.curByte & BITMASK[bits] << shift) >> shift;
				this.bitOffset += bits;
				bits = 0;
			}
		}
		return result;
	};
	BitReader.prototype.seek = function(pos) {
		var n_bit = pos % 8;
		var n_byte = (pos - n_bit) / 8;
		this.bitOffset = n_bit;
		this.stream.seek(n_byte);
		this.hasByte = false;
	};
	BitReader.prototype.pi = function() {
		var buf = new Buffer(6), i;
		for (i = 0; i < buf.length; i++) buf[i] = this.read(8);
		return buf.toString("hex");
	};
	module.exports = BitReader;
}));
//#endregion
//#region extension/node_modules/seek-bzip/lib/stream.js
var require_stream = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Stream = function() {};
	/** Returns the next byte, or -1 for EOF. */
	Stream.prototype.readByte = function() {
		throw new Error("abstract method readByte() not implemented");
	};
	/** Attempts to fill the buffer; returns number of bytes read, or
	*  -1 for EOF. */
	Stream.prototype.read = function(buffer, bufOffset, length) {
		var bytesRead = 0;
		while (bytesRead < length) {
			var c = this.readByte();
			if (c < 0) return bytesRead === 0 ? -1 : bytesRead;
			buffer[bufOffset++] = c;
			bytesRead++;
		}
		return bytesRead;
	};
	Stream.prototype.seek = function(new_pos) {
		throw new Error("abstract method seek() not implemented");
	};
	Stream.prototype.writeByte = function(_byte) {
		throw new Error("abstract method readByte() not implemented");
	};
	Stream.prototype.write = function(buffer, bufOffset, length) {
		var i;
		for (i = 0; i < length; i++) this.writeByte(buffer[bufOffset++]);
		return length;
	};
	Stream.prototype.flush = function() {};
	module.exports = Stream;
}));
//#endregion
//#region extension/node_modules/seek-bzip/lib/crc32.js
var require_crc32 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = (function() {
		/**
		* A static CRC lookup table
		*/
		var crc32Lookup = new Uint32Array([
			0,
			79764919,
			159529838,
			222504665,
			319059676,
			398814059,
			445009330,
			507990021,
			638119352,
			583659535,
			797628118,
			726387553,
			890018660,
			835552979,
			1015980042,
			944750013,
			1276238704,
			1221641927,
			1167319070,
			1095957929,
			1595256236,
			1540665371,
			1452775106,
			1381403509,
			1780037320,
			1859660671,
			1671105958,
			1733955601,
			2031960084,
			2111593891,
			1889500026,
			1952343757,
			2552477408,
			2632100695,
			2443283854,
			2506133561,
			2334638140,
			2414271883,
			2191915858,
			2254759653,
			3190512472,
			3135915759,
			3081330742,
			3009969537,
			2905550212,
			2850959411,
			2762807018,
			2691435357,
			3560074640,
			3505614887,
			3719321342,
			3648080713,
			3342211916,
			3287746299,
			3467911202,
			3396681109,
			4063920168,
			4143685023,
			4223187782,
			4286162673,
			3779000052,
			3858754371,
			3904687514,
			3967668269,
			881225847,
			809987520,
			1023691545,
			969234094,
			662832811,
			591600412,
			771767749,
			717299826,
			311336399,
			374308984,
			453813921,
			533576470,
			25881363,
			88864420,
			134795389,
			214552010,
			2023205639,
			2086057648,
			1897238633,
			1976864222,
			1804852699,
			1867694188,
			1645340341,
			1724971778,
			1587496639,
			1516133128,
			1461550545,
			1406951526,
			1302016099,
			1230646740,
			1142491917,
			1087903418,
			2896545431,
			2825181984,
			2770861561,
			2716262478,
			3215044683,
			3143675388,
			3055782693,
			3001194130,
			2326604591,
			2389456536,
			2200899649,
			2280525302,
			2578013683,
			2640855108,
			2418763421,
			2498394922,
			3769900519,
			3832873040,
			3912640137,
			3992402750,
			4088425275,
			4151408268,
			4197601365,
			4277358050,
			3334271071,
			3263032808,
			3476998961,
			3422541446,
			3585640067,
			3514407732,
			3694837229,
			3640369242,
			1762451694,
			1842216281,
			1619975040,
			1682949687,
			2047383090,
			2127137669,
			1938468188,
			2001449195,
			1325665622,
			1271206113,
			1183200824,
			1111960463,
			1543535498,
			1489069629,
			1434599652,
			1363369299,
			622672798,
			568075817,
			748617968,
			677256519,
			907627842,
			853037301,
			1067152940,
			995781531,
			51762726,
			131386257,
			177728840,
			240578815,
			269590778,
			349224269,
			429104020,
			491947555,
			4046411278,
			4126034873,
			4172115296,
			4234965207,
			3794477266,
			3874110821,
			3953728444,
			4016571915,
			3609705398,
			3555108353,
			3735388376,
			3664026991,
			3290680682,
			3236090077,
			3449943556,
			3378572211,
			3174993278,
			3120533705,
			3032266256,
			2961025959,
			2923101090,
			2868635157,
			2813903052,
			2742672763,
			2604032198,
			2683796849,
			2461293480,
			2524268063,
			2284983834,
			2364738477,
			2175806836,
			2238787779,
			1569362073,
			1498123566,
			1409854455,
			1355396672,
			1317987909,
			1246755826,
			1192025387,
			1137557660,
			2072149281,
			2135122070,
			1912620623,
			1992383480,
			1753615357,
			1816598090,
			1627664531,
			1707420964,
			295390185,
			358241886,
			404320391,
			483945776,
			43990325,
			106832002,
			186451547,
			266083308,
			932423249,
			861060070,
			1041341759,
			986742920,
			613929101,
			542559546,
			756411363,
			701822548,
			3316196985,
			3244833742,
			3425377559,
			3370778784,
			3601682597,
			3530312978,
			3744426955,
			3689838204,
			3819031489,
			3881883254,
			3928223919,
			4007849240,
			4037393693,
			4100235434,
			4180117107,
			4259748804,
			2310601993,
			2373574846,
			2151335527,
			2231098320,
			2596047829,
			2659030626,
			2470359227,
			2550115596,
			2947551409,
			2876312838,
			2788305887,
			2733848168,
			3165939309,
			3094707162,
			3040238851,
			2985771188
		]);
		var CRC32 = function() {
			/**
			* The current CRC
			*/
			var crc = 4294967295;
			/**
			* @return The current CRC
			*/
			this.getCRC = function() {
				return ~crc >>> 0;
			};
			/**
			* Update the CRC with a single byte
			* @param value The value to update the CRC with
			*/
			this.updateCRC = function(value) {
				crc = crc << 8 ^ crc32Lookup[(crc >>> 24 ^ value) & 255];
			};
			/**
			* Update the CRC with a sequence of identical bytes
			* @param value The value to update the CRC with
			* @param count The number of bytes
			*/
			this.updateCRCRun = function(value, count) {
				while (count-- > 0) crc = crc << 8 ^ crc32Lookup[(crc >>> 24 ^ value) & 255];
			};
		};
		return CRC32;
	})();
}));
//#endregion
//#region extension/node_modules/seek-bzip/package.json
var package_exports = /* @__PURE__ */ __exportAll({
	bin: () => bin,
	contributors: () => contributors,
	default: () => package_default,
	dependencies: () => dependencies,
	description: () => description,
	devDependencies: () => devDependencies,
	directories: () => directories,
	license: () => "MIT",
	main: () => main,
	name: () => name,
	repository: () => repository,
	scripts: () => scripts,
	version: () => version
}), name, version, contributors, description, main, repository, bin, directories, dependencies, devDependencies, scripts, package_default;
var init_package = __esmMin((() => {
	name = "seek-bzip";
	version = "1.0.6";
	contributors = [
		"C. Scott Ananian (http://cscott.net)",
		"Eli Skeggs",
		"Kevin Kwok",
		"Rob Landley (http://landley.net)"
	];
	description = "a pure-JavaScript Node.JS module for random-access decoding bzip2 data";
	main = "./lib/index.js";
	repository = {
		"type": "git",
		"url": "https://github.com/cscott/seek-bzip.git"
	};
	bin = {
		"seek-bunzip": "./bin/seek-bunzip",
		"seek-table": "./bin/seek-bzip-table"
	};
	directories = { "test": "test" };
	dependencies = { "commander": "^2.8.1" };
	devDependencies = {
		"fibers": "~1.0.6",
		"mocha": "~2.2.5"
	};
	scripts = { "test": "mocha" };
	package_default = {
		name,
		version,
		contributors,
		description,
		main,
		repository,
		license: "MIT",
		bin,
		directories,
		dependencies,
		devDependencies,
		scripts
	};
}));
//#endregion
//#region extension/node_modules/seek-bzip/lib/index.js
var require_lib = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BitReader = require_bitreader();
	var Stream = require_stream();
	var CRC32 = require_crc32();
	var pjson = (init_package(), __toCommonJS(package_exports).default);
	var MAX_HUFCODE_BITS = 20;
	var MAX_SYMBOLS = 258;
	var SYMBOL_RUNA = 0;
	var SYMBOL_RUNB = 1;
	var MIN_GROUPS = 2;
	var MAX_GROUPS = 6;
	var GROUP_SIZE = 50;
	var WHOLEPI = "314159265359";
	var SQRTPI = "177245385090";
	var mtf = function(array, index) {
		var src = array[index], i;
		for (i = index; i > 0; i--) array[i] = array[i - 1];
		array[0] = src;
		return src;
	};
	var Err = {
		OK: 0,
		LAST_BLOCK: -1,
		NOT_BZIP_DATA: -2,
		UNEXPECTED_INPUT_EOF: -3,
		UNEXPECTED_OUTPUT_EOF: -4,
		DATA_ERROR: -5,
		OUT_OF_MEMORY: -6,
		OBSOLETE_INPUT: -7,
		END_OF_BLOCK: -8
	};
	var ErrorMessages = {};
	ErrorMessages[Err.LAST_BLOCK] = "Bad file checksum";
	ErrorMessages[Err.NOT_BZIP_DATA] = "Not bzip data";
	ErrorMessages[Err.UNEXPECTED_INPUT_EOF] = "Unexpected input EOF";
	ErrorMessages[Err.UNEXPECTED_OUTPUT_EOF] = "Unexpected output EOF";
	ErrorMessages[Err.DATA_ERROR] = "Data error";
	ErrorMessages[Err.OUT_OF_MEMORY] = "Out of memory";
	ErrorMessages[Err.OBSOLETE_INPUT] = "Obsolete (pre 0.9.5) bzip format not supported.";
	var _throw = function(status, optDetail) {
		var msg = ErrorMessages[status] || "unknown error";
		if (optDetail) msg += ": " + optDetail;
		var e = new TypeError(msg);
		e.errorCode = status;
		throw e;
	};
	var Bunzip = function(inputStream, outputStream) {
		this.writePos = this.writeCurrent = this.writeCount = 0;
		this._start_bunzip(inputStream, outputStream);
	};
	Bunzip.prototype._init_block = function() {
		if (!this._get_next_block()) {
			this.writeCount = -1;
			return false;
		}
		this.blockCRC = new CRC32();
		return true;
	};
	Bunzip.prototype._start_bunzip = function(inputStream, outputStream) {
		var buf = new Buffer(4);
		if (inputStream.read(buf, 0, 4) !== 4 || String.fromCharCode(buf[0], buf[1], buf[2]) !== "BZh") _throw(Err.NOT_BZIP_DATA, "bad magic");
		var level = buf[3] - 48;
		if (level < 1 || level > 9) _throw(Err.NOT_BZIP_DATA, "level out of range");
		this.reader = new BitReader(inputStream);
		this.dbufSize = 1e5 * level;
		this.nextoutput = 0;
		this.outputStream = outputStream;
		this.streamCRC = 0;
	};
	Bunzip.prototype._get_next_block = function() {
		var i, j, k;
		var reader = this.reader;
		var h = reader.pi();
		if (h === SQRTPI) return false;
		if (h !== WHOLEPI) _throw(Err.NOT_BZIP_DATA);
		this.targetBlockCRC = reader.read(32) >>> 0;
		this.streamCRC = (this.targetBlockCRC ^ (this.streamCRC << 1 | this.streamCRC >>> 31)) >>> 0;
		if (reader.read(1)) _throw(Err.OBSOLETE_INPUT);
		var origPointer = reader.read(24);
		if (origPointer > this.dbufSize) _throw(Err.DATA_ERROR, "initial position out of bounds");
		var t = reader.read(16);
		var symToByte = new Buffer(256), symTotal = 0;
		for (i = 0; i < 16; i++) if (t & 1 << 15 - i) {
			var o = i * 16;
			k = reader.read(16);
			for (j = 0; j < 16; j++) if (k & 1 << 15 - j) symToByte[symTotal++] = o + j;
		}
		var groupCount = reader.read(3);
		if (groupCount < MIN_GROUPS || groupCount > MAX_GROUPS) _throw(Err.DATA_ERROR);
		var nSelectors = reader.read(15);
		if (nSelectors === 0) _throw(Err.DATA_ERROR);
		var mtfSymbol = new Buffer(256);
		for (i = 0; i < groupCount; i++) mtfSymbol[i] = i;
		var selectors = new Buffer(nSelectors);
		for (i = 0; i < nSelectors; i++) {
			for (j = 0; reader.read(1); j++) if (j >= groupCount) _throw(Err.DATA_ERROR);
			selectors[i] = mtf(mtfSymbol, j);
		}
		var symCount = symTotal + 2;
		var groups = [], hufGroup;
		for (j = 0; j < groupCount; j++) {
			var length = new Buffer(symCount), temp = new Uint16Array(MAX_HUFCODE_BITS + 1);
			t = reader.read(5);
			for (i = 0; i < symCount; i++) {
				for (;;) {
					if (t < 1 || t > MAX_HUFCODE_BITS) _throw(Err.DATA_ERROR);
					if (!reader.read(1)) break;
					if (!reader.read(1)) t++;
					else t--;
				}
				length[i] = t;
			}
			var minLen = maxLen = length[0], maxLen;
			for (i = 1; i < symCount; i++) if (length[i] > maxLen) maxLen = length[i];
			else if (length[i] < minLen) minLen = length[i];
			hufGroup = {};
			groups.push(hufGroup);
			hufGroup.permute = new Uint16Array(MAX_SYMBOLS);
			hufGroup.limit = new Uint32Array(MAX_HUFCODE_BITS + 2);
			hufGroup.base = new Uint32Array(MAX_HUFCODE_BITS + 1);
			hufGroup.minLen = minLen;
			hufGroup.maxLen = maxLen;
			var pp = 0;
			for (i = minLen; i <= maxLen; i++) {
				temp[i] = hufGroup.limit[i] = 0;
				for (t = 0; t < symCount; t++) if (length[t] === i) hufGroup.permute[pp++] = t;
			}
			for (i = 0; i < symCount; i++) temp[length[i]]++;
			pp = t = 0;
			for (i = minLen; i < maxLen; i++) {
				pp += temp[i];
				hufGroup.limit[i] = pp - 1;
				pp <<= 1;
				t += temp[i];
				hufGroup.base[i + 1] = pp - t;
			}
			hufGroup.limit[maxLen + 1] = Number.MAX_VALUE;
			hufGroup.limit[maxLen] = pp + temp[maxLen] - 1;
			hufGroup.base[minLen] = 0;
		}
		var byteCount = /* @__PURE__ */ new Uint32Array(256);
		for (i = 0; i < 256; i++) mtfSymbol[i] = i;
		var runPos = 0, dbufCount = 0, selector = 0, uc;
		var dbuf = this.dbuf = new Uint32Array(this.dbufSize);
		symCount = 0;
		for (;;) {
			if (!symCount--) {
				symCount = GROUP_SIZE - 1;
				if (selector >= nSelectors) _throw(Err.DATA_ERROR);
				hufGroup = groups[selectors[selector++]];
			}
			i = hufGroup.minLen;
			j = reader.read(i);
			for (;; i++) {
				if (i > hufGroup.maxLen) _throw(Err.DATA_ERROR);
				if (j <= hufGroup.limit[i]) break;
				j = j << 1 | reader.read(1);
			}
			j -= hufGroup.base[i];
			if (j < 0 || j >= MAX_SYMBOLS) _throw(Err.DATA_ERROR);
			var nextSym = hufGroup.permute[j];
			if (nextSym === SYMBOL_RUNA || nextSym === SYMBOL_RUNB) {
				if (!runPos) {
					runPos = 1;
					t = 0;
				}
				if (nextSym === SYMBOL_RUNA) t += runPos;
				else t += 2 * runPos;
				runPos <<= 1;
				continue;
			}
			if (runPos) {
				runPos = 0;
				if (dbufCount + t > this.dbufSize) _throw(Err.DATA_ERROR);
				uc = symToByte[mtfSymbol[0]];
				byteCount[uc] += t;
				while (t--) dbuf[dbufCount++] = uc;
			}
			if (nextSym > symTotal) break;
			if (dbufCount >= this.dbufSize) _throw(Err.DATA_ERROR);
			i = nextSym - 1;
			uc = mtf(mtfSymbol, i);
			uc = symToByte[uc];
			byteCount[uc]++;
			dbuf[dbufCount++] = uc;
		}
		if (origPointer < 0 || origPointer >= dbufCount) _throw(Err.DATA_ERROR);
		j = 0;
		for (i = 0; i < 256; i++) {
			k = j + byteCount[i];
			byteCount[i] = j;
			j = k;
		}
		for (i = 0; i < dbufCount; i++) {
			uc = dbuf[i] & 255;
			dbuf[byteCount[uc]] |= i << 8;
			byteCount[uc]++;
		}
		var pos = 0, current = 0, run = 0;
		if (dbufCount) {
			pos = dbuf[origPointer];
			current = pos & 255;
			pos >>= 8;
			run = -1;
		}
		this.writePos = pos;
		this.writeCurrent = current;
		this.writeCount = dbufCount;
		this.writeRun = run;
		return true;
	};
	Bunzip.prototype._read_bunzip = function(outputBuffer, len) {
		var copies, previous, outbyte;
		if (this.writeCount < 0) return 0;
		var dbuf = this.dbuf, pos = this.writePos, current = this.writeCurrent, dbufCount = this.writeCount;
		this.outputsize;
		var run = this.writeRun;
		while (dbufCount) {
			dbufCount--;
			previous = current;
			pos = dbuf[pos];
			current = pos & 255;
			pos >>= 8;
			if (run++ === 3) {
				copies = current;
				outbyte = previous;
				current = -1;
			} else {
				copies = 1;
				outbyte = current;
			}
			this.blockCRC.updateCRCRun(outbyte, copies);
			while (copies--) {
				this.outputStream.writeByte(outbyte);
				this.nextoutput++;
			}
			if (current != previous) run = 0;
		}
		this.writeCount = dbufCount;
		if (this.blockCRC.getCRC() !== this.targetBlockCRC) _throw(Err.DATA_ERROR, "Bad block CRC (got " + this.blockCRC.getCRC().toString(16) + " expected " + this.targetBlockCRC.toString(16) + ")");
		return this.nextoutput;
	};
	var coerceInputStream = function(input) {
		if ("readByte" in input) return input;
		var inputStream = new Stream();
		inputStream.pos = 0;
		inputStream.readByte = function() {
			return input[this.pos++];
		};
		inputStream.seek = function(pos) {
			this.pos = pos;
		};
		inputStream.eof = function() {
			return this.pos >= input.length;
		};
		return inputStream;
	};
	var coerceOutputStream = function(output) {
		var outputStream = new Stream();
		var resizeOk = true;
		if (output) if (typeof output === "number") {
			outputStream.buffer = new Buffer(output);
			resizeOk = false;
		} else if ("writeByte" in output) return output;
		else {
			outputStream.buffer = output;
			resizeOk = false;
		}
		else outputStream.buffer = new Buffer(16384);
		outputStream.pos = 0;
		outputStream.writeByte = function(_byte) {
			if (resizeOk && this.pos >= this.buffer.length) {
				var newBuffer = new Buffer(this.buffer.length * 2);
				this.buffer.copy(newBuffer);
				this.buffer = newBuffer;
			}
			this.buffer[this.pos++] = _byte;
		};
		outputStream.getBuffer = function() {
			if (this.pos !== this.buffer.length) {
				if (!resizeOk) throw new TypeError("outputsize does not match decoded input");
				var newBuffer = new Buffer(this.pos);
				this.buffer.copy(newBuffer, 0, 0, this.pos);
				this.buffer = newBuffer;
			}
			return this.buffer;
		};
		outputStream._coerced = true;
		return outputStream;
	};
	Bunzip.Err = Err;
	Bunzip.decode = function(input, output, multistream) {
		var inputStream = coerceInputStream(input);
		var outputStream = coerceOutputStream(output);
		var bz = new Bunzip(inputStream, outputStream);
		while (true) {
			if ("eof" in inputStream && inputStream.eof()) break;
			if (bz._init_block()) bz._read_bunzip();
			else {
				var targetStreamCRC = bz.reader.read(32) >>> 0;
				if (targetStreamCRC !== bz.streamCRC) _throw(Err.DATA_ERROR, "Bad stream CRC (got " + bz.streamCRC.toString(16) + " expected " + targetStreamCRC.toString(16) + ")");
				if (multistream && "eof" in inputStream && !inputStream.eof()) bz._start_bunzip(inputStream, outputStream);
				else break;
			}
		}
		if ("getBuffer" in outputStream) return outputStream.getBuffer();
	};
	Bunzip.decodeBlock = function(input, pos, output) {
		var inputStream = coerceInputStream(input);
		var outputStream = coerceOutputStream(output);
		var bz = new Bunzip(inputStream, outputStream);
		bz.reader.seek(pos);
		if (bz._get_next_block()) {
			bz.blockCRC = new CRC32();
			bz.writeCopies = 0;
			bz._read_bunzip();
		}
		if ("getBuffer" in outputStream) return outputStream.getBuffer();
	};
	Bunzip.table = function(input, callback, multistream) {
		var inputStream = new Stream();
		inputStream.delegate = coerceInputStream(input);
		inputStream.pos = 0;
		inputStream.readByte = function() {
			this.pos++;
			return this.delegate.readByte();
		};
		if (inputStream.delegate.eof) inputStream.eof = inputStream.delegate.eof.bind(inputStream.delegate);
		var outputStream = new Stream();
		outputStream.pos = 0;
		outputStream.writeByte = function() {
			this.pos++;
		};
		var bz = new Bunzip(inputStream, outputStream);
		var blockSize = bz.dbufSize;
		while (true) {
			if ("eof" in inputStream && inputStream.eof()) break;
			var position = inputStream.pos * 8 + bz.reader.bitOffset;
			if (bz.reader.hasByte) position -= 8;
			if (bz._init_block()) {
				var start = outputStream.pos;
				bz._read_bunzip();
				callback(position, outputStream.pos - start);
			} else {
				bz.reader.read(32);
				if (multistream && "eof" in inputStream && !inputStream.eof()) {
					bz._start_bunzip(inputStream, outputStream);
					console.assert(bz.dbufSize === blockSize, "shouldn't change block size within multistream file");
				} else break;
			}
		}
	};
	Bunzip.Stream = Stream;
	Bunzip.version = pjson.version;
	Bunzip.license = pjson.license;
	module.exports = Bunzip;
}));
//#endregion
//#region extension/node_modules/through/index.js
var require_through = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Stream = require("stream");
	exports = module.exports = through;
	through.through = through;
	function through(write, end, opts) {
		write = write || function(data) {
			this.queue(data);
		};
		end = end || function() {
			this.queue(null);
		};
		var ended = false, destroyed = false, buffer = [], _ended = false;
		var stream = new Stream();
		stream.readable = stream.writable = true;
		stream.paused = false;
		stream.autoDestroy = !(opts && opts.autoDestroy === false);
		stream.write = function(data) {
			write.call(this, data);
			return !stream.paused;
		};
		function drain() {
			while (buffer.length && !stream.paused) {
				var data = buffer.shift();
				if (null === data) return stream.emit("end");
				else stream.emit("data", data);
			}
		}
		stream.queue = stream.push = function(data) {
			if (_ended) return stream;
			if (data === null) _ended = true;
			buffer.push(data);
			drain();
			return stream;
		};
		stream.on("end", function() {
			stream.readable = false;
			if (!stream.writable && stream.autoDestroy) process.nextTick(function() {
				stream.destroy();
			});
		});
		function _end() {
			stream.writable = false;
			end.call(stream);
			if (!stream.readable && stream.autoDestroy) stream.destroy();
		}
		stream.end = function(data) {
			if (ended) return;
			ended = true;
			if (arguments.length) stream.write(data);
			_end();
			return stream;
		};
		stream.destroy = function() {
			if (destroyed) return;
			destroyed = true;
			ended = true;
			buffer.length = 0;
			stream.writable = stream.readable = false;
			stream.emit("close");
			return stream;
		};
		stream.pause = function() {
			if (stream.paused) return;
			stream.paused = true;
			return stream;
		};
		stream.resume = function() {
			if (stream.paused) {
				stream.paused = false;
				stream.emit("resume");
			}
			drain();
			if (!stream.paused) stream.emit("drain");
			return stream;
		};
		return stream;
	}
}));
//#endregion
//#region extension/node_modules/unbzip2-stream/lib/bzip2.js
var require_bzip2 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function Bzip2Error(message) {
		this.name = "Bzip2Error";
		this.message = message;
		this.stack = (/* @__PURE__ */ new Error()).stack;
	}
	Bzip2Error.prototype = /* @__PURE__ */ new Error();
	var message = { Error: function(message) {
		throw new Bzip2Error(message);
	} };
	var bzip2 = {};
	bzip2.Bzip2Error = Bzip2Error;
	bzip2.crcTable = [
		0,
		79764919,
		159529838,
		222504665,
		319059676,
		398814059,
		445009330,
		507990021,
		638119352,
		583659535,
		797628118,
		726387553,
		890018660,
		835552979,
		1015980042,
		944750013,
		1276238704,
		1221641927,
		1167319070,
		1095957929,
		1595256236,
		1540665371,
		1452775106,
		1381403509,
		1780037320,
		1859660671,
		1671105958,
		1733955601,
		2031960084,
		2111593891,
		1889500026,
		1952343757,
		2552477408,
		2632100695,
		2443283854,
		2506133561,
		2334638140,
		2414271883,
		2191915858,
		2254759653,
		3190512472,
		3135915759,
		3081330742,
		3009969537,
		2905550212,
		2850959411,
		2762807018,
		2691435357,
		3560074640,
		3505614887,
		3719321342,
		3648080713,
		3342211916,
		3287746299,
		3467911202,
		3396681109,
		4063920168,
		4143685023,
		4223187782,
		4286162673,
		3779000052,
		3858754371,
		3904687514,
		3967668269,
		881225847,
		809987520,
		1023691545,
		969234094,
		662832811,
		591600412,
		771767749,
		717299826,
		311336399,
		374308984,
		453813921,
		533576470,
		25881363,
		88864420,
		134795389,
		214552010,
		2023205639,
		2086057648,
		1897238633,
		1976864222,
		1804852699,
		1867694188,
		1645340341,
		1724971778,
		1587496639,
		1516133128,
		1461550545,
		1406951526,
		1302016099,
		1230646740,
		1142491917,
		1087903418,
		2896545431,
		2825181984,
		2770861561,
		2716262478,
		3215044683,
		3143675388,
		3055782693,
		3001194130,
		2326604591,
		2389456536,
		2200899649,
		2280525302,
		2578013683,
		2640855108,
		2418763421,
		2498394922,
		3769900519,
		3832873040,
		3912640137,
		3992402750,
		4088425275,
		4151408268,
		4197601365,
		4277358050,
		3334271071,
		3263032808,
		3476998961,
		3422541446,
		3585640067,
		3514407732,
		3694837229,
		3640369242,
		1762451694,
		1842216281,
		1619975040,
		1682949687,
		2047383090,
		2127137669,
		1938468188,
		2001449195,
		1325665622,
		1271206113,
		1183200824,
		1111960463,
		1543535498,
		1489069629,
		1434599652,
		1363369299,
		622672798,
		568075817,
		748617968,
		677256519,
		907627842,
		853037301,
		1067152940,
		995781531,
		51762726,
		131386257,
		177728840,
		240578815,
		269590778,
		349224269,
		429104020,
		491947555,
		4046411278,
		4126034873,
		4172115296,
		4234965207,
		3794477266,
		3874110821,
		3953728444,
		4016571915,
		3609705398,
		3555108353,
		3735388376,
		3664026991,
		3290680682,
		3236090077,
		3449943556,
		3378572211,
		3174993278,
		3120533705,
		3032266256,
		2961025959,
		2923101090,
		2868635157,
		2813903052,
		2742672763,
		2604032198,
		2683796849,
		2461293480,
		2524268063,
		2284983834,
		2364738477,
		2175806836,
		2238787779,
		1569362073,
		1498123566,
		1409854455,
		1355396672,
		1317987909,
		1246755826,
		1192025387,
		1137557660,
		2072149281,
		2135122070,
		1912620623,
		1992383480,
		1753615357,
		1816598090,
		1627664531,
		1707420964,
		295390185,
		358241886,
		404320391,
		483945776,
		43990325,
		106832002,
		186451547,
		266083308,
		932423249,
		861060070,
		1041341759,
		986742920,
		613929101,
		542559546,
		756411363,
		701822548,
		3316196985,
		3244833742,
		3425377559,
		3370778784,
		3601682597,
		3530312978,
		3744426955,
		3689838204,
		3819031489,
		3881883254,
		3928223919,
		4007849240,
		4037393693,
		4100235434,
		4180117107,
		4259748804,
		2310601993,
		2373574846,
		2151335527,
		2231098320,
		2596047829,
		2659030626,
		2470359227,
		2550115596,
		2947551409,
		2876312838,
		2788305887,
		2733848168,
		3165939309,
		3094707162,
		3040238851,
		2985771188
	];
	bzip2.array = function(bytes) {
		var bit = 0, byte = 0;
		var BITMASK = [
			0,
			1,
			3,
			7,
			15,
			31,
			63,
			127,
			255
		];
		return function(n) {
			var result = 0;
			while (n > 0) {
				var left = 8 - bit;
				if (n >= left) {
					result <<= left;
					result |= BITMASK[left] & bytes[byte++];
					bit = 0;
					n -= left;
				} else {
					result <<= n;
					result |= (bytes[byte] & BITMASK[n] << 8 - n - bit) >> 8 - n - bit;
					bit += n;
					n = 0;
				}
			}
			return result;
		};
	};
	bzip2.simple = function(srcbuffer, stream) {
		var bits = bzip2.array(srcbuffer);
		var size = bzip2.header(bits);
		var ret = false;
		var bufsize = 1e5 * size;
		var buf = new Int32Array(bufsize);
		do
			ret = bzip2.decompress(bits, stream, buf, bufsize);
		while (!ret);
	};
	bzip2.header = function(bits) {
		this.byteCount = /* @__PURE__ */ new Int32Array(256);
		this.symToByte = /* @__PURE__ */ new Uint8Array(256);
		this.mtfSymbol = /* @__PURE__ */ new Int32Array(256);
		this.selectors = /* @__PURE__ */ new Uint8Array(32768);
		if (bits(24) != 4348520) message.Error("No magic number found");
		var i = bits(8) - 48;
		if (i < 1 || i > 9) message.Error("Not a BZIP archive");
		return i;
	};
	bzip2.decompress = function(bits, stream, buf, bufsize, streamCRC) {
		var MAX_HUFCODE_BITS = 20;
		var MAX_SYMBOLS = 258;
		var SYMBOL_RUNA = 0;
		var SYMBOL_RUNB = 1;
		var GROUP_SIZE = 50;
		var crc = -1;
		for (var h = "", i = 0; i < 6; i++) h += bits(8).toString(16);
		if (h == "177245385090") {
			if ((bits(32) | 0) !== streamCRC) message.Error("Error in bzip2: crc32 do not match");
			bits(null);
			return null;
		}
		if (h != "314159265359") message.Error("eek not valid bzip data");
		var crcblock = bits(32) | 0;
		if (bits(1)) message.Error("unsupported obsolete version");
		var origPtr = bits(24);
		if (origPtr > bufsize) message.Error("Initial position larger than buffer size");
		var t = bits(16);
		var symTotal = 0;
		for (i = 0; i < 16; i++) if (t & 1 << 15 - i) {
			var k = bits(16);
			for (j = 0; j < 16; j++) if (k & 1 << 15 - j) this.symToByte[symTotal++] = 16 * i + j;
		}
		var groupCount = bits(3);
		if (groupCount < 2 || groupCount > 6) message.Error("another error");
		var nSelectors = bits(15);
		if (nSelectors == 0) message.Error("meh");
		for (var i = 0; i < groupCount; i++) this.mtfSymbol[i] = i;
		for (var i = 0; i < nSelectors; i++) {
			for (var j = 0; bits(1); j++) if (j >= groupCount) message.Error("whoops another error");
			var uc = this.mtfSymbol[j];
			for (var k = j - 1; k >= 0; k--) this.mtfSymbol[k + 1] = this.mtfSymbol[k];
			this.mtfSymbol[0] = uc;
			this.selectors[i] = uc;
		}
		var symCount = symTotal + 2;
		var groups = [];
		var length = new Uint8Array(MAX_SYMBOLS), temp = new Uint16Array(MAX_HUFCODE_BITS + 1);
		var hufGroup;
		for (var j = 0; j < groupCount; j++) {
			t = bits(5);
			for (var i = 0; i < symCount; i++) {
				while (true) {
					if (t < 1 || t > MAX_HUFCODE_BITS) message.Error("I gave up a while ago on writing error messages");
					if (!bits(1)) break;
					if (!bits(1)) t++;
					else t--;
				}
				length[i] = t;
			}
			var minLen = maxLen = length[0], maxLen;
			for (var i = 1; i < symCount; i++) if (length[i] > maxLen) maxLen = length[i];
			else if (length[i] < minLen) minLen = length[i];
			hufGroup = groups[j] = {};
			hufGroup.permute = new Int32Array(MAX_SYMBOLS);
			hufGroup.limit = new Int32Array(MAX_HUFCODE_BITS + 1);
			hufGroup.base = new Int32Array(MAX_HUFCODE_BITS + 1);
			hufGroup.minLen = minLen;
			hufGroup.maxLen = maxLen;
			var base = hufGroup.base;
			var limit = hufGroup.limit;
			var pp = 0;
			for (var i = minLen; i <= maxLen; i++) for (var t = 0; t < symCount; t++) if (length[t] == i) hufGroup.permute[pp++] = t;
			for (i = minLen; i <= maxLen; i++) temp[i] = limit[i] = 0;
			for (i = 0; i < symCount; i++) temp[length[i]]++;
			pp = t = 0;
			for (i = minLen; i < maxLen; i++) {
				pp += temp[i];
				limit[i] = pp - 1;
				pp <<= 1;
				base[i + 1] = pp - (t += temp[i]);
			}
			limit[maxLen] = pp + temp[maxLen] - 1;
			base[minLen] = 0;
		}
		for (var i = 0; i < 256; i++) {
			this.mtfSymbol[i] = i;
			this.byteCount[i] = 0;
		}
		var runPos = count = symCount = selector = 0, count, symCount, selector;
		while (true) {
			if (!symCount--) {
				symCount = GROUP_SIZE - 1;
				if (selector >= nSelectors) message.Error("meow i'm a kitty, that's an error");
				hufGroup = groups[this.selectors[selector++]];
				base = hufGroup.base;
				limit = hufGroup.limit;
			}
			i = hufGroup.minLen;
			j = bits(i);
			while (true) {
				if (i > hufGroup.maxLen) message.Error("rawr i'm a dinosaur");
				if (j <= limit[i]) break;
				i++;
				j = j << 1 | bits(1);
			}
			j -= base[i];
			if (j < 0 || j >= MAX_SYMBOLS) message.Error("moo i'm a cow");
			var nextSym = hufGroup.permute[j];
			if (nextSym == SYMBOL_RUNA || nextSym == SYMBOL_RUNB) {
				if (!runPos) {
					runPos = 1;
					t = 0;
				}
				if (nextSym == SYMBOL_RUNA) t += runPos;
				else t += 2 * runPos;
				runPos <<= 1;
				continue;
			}
			if (runPos) {
				runPos = 0;
				if (count + t > bufsize) message.Error("Boom.");
				uc = this.symToByte[this.mtfSymbol[0]];
				this.byteCount[uc] += t;
				while (t--) buf[count++] = uc;
			}
			if (nextSym > symTotal) break;
			if (count >= bufsize) message.Error("I can't think of anything. Error");
			i = nextSym - 1;
			uc = this.mtfSymbol[i];
			for (var k = i - 1; k >= 0; k--) this.mtfSymbol[k + 1] = this.mtfSymbol[k];
			this.mtfSymbol[0] = uc;
			uc = this.symToByte[uc];
			this.byteCount[uc]++;
			buf[count++] = uc;
		}
		if (origPtr < 0 || origPtr >= count) message.Error("I'm a monkey and I'm throwing something at someone, namely you");
		var j = 0;
		for (var i = 0; i < 256; i++) {
			k = j + this.byteCount[i];
			this.byteCount[i] = j;
			j = k;
		}
		for (var i = 0; i < count; i++) {
			uc = buf[i] & 255;
			buf[this.byteCount[uc]] |= i << 8;
			this.byteCount[uc]++;
		}
		var pos = 0, current = 0, run = 0;
		if (count) {
			pos = buf[origPtr];
			current = pos & 255;
			pos >>= 8;
			run = -1;
		}
		count = count;
		var copies, previous, outbyte;
		while (count) {
			count--;
			previous = current;
			pos = buf[pos];
			current = pos & 255;
			pos >>= 8;
			if (run++ == 3) {
				copies = current;
				outbyte = previous;
				current = -1;
			} else {
				copies = 1;
				outbyte = current;
			}
			while (copies--) {
				crc = (crc << 8 ^ this.crcTable[(crc >> 24 ^ outbyte) & 255]) & 4294967295;
				stream(outbyte);
			}
			if (current != previous) run = 0;
		}
		crc = (crc ^ -1) >>> 0;
		if ((crc | 0) != (crcblock | 0)) message.Error("Error in bzip2: crc32 do not match");
		streamCRC = (crc ^ (streamCRC << 1 | streamCRC >>> 31)) & 4294967295;
		return streamCRC;
	};
	module.exports = bzip2;
}));
//#endregion
//#region extension/node_modules/unbzip2-stream/lib/bit_iterator.js
var require_bit_iterator = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BITMASK = [
		0,
		1,
		3,
		7,
		15,
		31,
		63,
		127,
		255
	];
	module.exports = function bitIterator(nextBuffer) {
		var bit = 0, byte = 0;
		var bytes = nextBuffer();
		var f = function(n) {
			if (n === null && bit != 0) {
				bit = 0;
				byte++;
				return;
			}
			var result = 0;
			while (n > 0) {
				if (byte >= bytes.length) {
					byte = 0;
					bytes = nextBuffer();
				}
				var left = 8 - bit;
				if (bit === 0 && n > 0) f.bytesRead++;
				if (n >= left) {
					result <<= left;
					result |= BITMASK[left] & bytes[byte++];
					bit = 0;
					n -= left;
				} else {
					result <<= n;
					result |= (bytes[byte] & BITMASK[n] << 8 - n - bit) >> 8 - n - bit;
					bit += n;
					n = 0;
				}
			}
			return result;
		};
		f.bytesRead = 0;
		return f;
	};
}));
//#endregion
//#region extension/node_modules/unbzip2-stream/index.js
var require_unbzip2_stream = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var through = require_through();
	var bz2 = require_bzip2();
	var bitIterator = require_bit_iterator();
	module.exports = unbzip2Stream;
	function unbzip2Stream() {
		var bufferQueue = [];
		var hasBytes = 0;
		var blockSize = 0;
		var broken = false;
		var bitReader = null;
		var streamCRC = null;
		function decompressBlock(push) {
			if (!blockSize) {
				blockSize = bz2.header(bitReader);
				streamCRC = 0;
				return true;
			} else {
				var bufsize = 1e5 * blockSize;
				var buf = new Int32Array(bufsize);
				var chunk = [];
				var f = function(b) {
					chunk.push(b);
				};
				streamCRC = bz2.decompress(bitReader, f, buf, bufsize, streamCRC);
				if (streamCRC === null) {
					blockSize = 0;
					return false;
				} else {
					push(Buffer.from(chunk));
					return true;
				}
			}
		}
		var outlength = 0;
		function decompressAndQueue(stream) {
			if (broken) return;
			try {
				return decompressBlock(function(d) {
					stream.queue(d);
					if (d !== null) outlength += d.length;
				});
			} catch (e) {
				stream.emit("error", e);
				broken = true;
				return false;
			}
		}
		return through(function write(data) {
			bufferQueue.push(data);
			hasBytes += data.length;
			if (bitReader === null) bitReader = bitIterator(function() {
				return bufferQueue.shift();
			});
			while (!broken && hasBytes - bitReader.bytesRead + 1 >= (25e3 + 1e5 * blockSize || 4)) decompressAndQueue(this);
		}, function end(x) {
			while (!broken && bitReader && hasBytes > bitReader.bytesRead) decompressAndQueue(this);
			if (!broken) {
				if (streamCRC !== null) this.emit("error", /* @__PURE__ */ new Error("input stream ended prematurely"));
				this.queue(null);
			}
		});
	}
}));
//#endregion
//#region extension/node_modules/decompress-tarbz2/index.js
var require_decompress_tarbz2 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var decompressTar = require_decompress_tar();
	var fileType = require_file_type$1();
	var isStream = require_is_stream();
	var seekBzip = require_lib();
	var unbzip2Stream = require_unbzip2_stream();
	module.exports = () => (input) => {
		if (!Buffer.isBuffer(input) && !isStream(input)) return Promise.reject(/* @__PURE__ */ new TypeError(`Expected a Buffer or Stream, got ${typeof input}`));
		if (Buffer.isBuffer(input) && (!fileType(input) || fileType(input).ext !== "bz2")) return Promise.resolve([]);
		if (Buffer.isBuffer(input)) return decompressTar()(seekBzip.decode(input));
		return decompressTar()(input.pipe(unbzip2Stream()));
	};
}));
//#endregion
//#region extension/node_modules/decompress-targz/index.js
var require_decompress_targz = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var zlib$1 = require("zlib");
	var decompressTar = require_decompress_tar();
	var fileType = require_file_type$2();
	var isStream = require_is_stream();
	module.exports = () => (input) => {
		if (!Buffer.isBuffer(input) && !isStream(input)) return Promise.reject(/* @__PURE__ */ new TypeError(`Expected a Buffer or Stream, got ${typeof input}`));
		if (Buffer.isBuffer(input) && (!fileType(input) || fileType(input).ext !== "gz")) return Promise.resolve([]);
		const unzip = zlib$1.createGunzip();
		const result = decompressTar()(unzip);
		if (Buffer.isBuffer(input)) unzip.end(input);
		else input.pipe(unzip);
		return result;
	};
}));
//#endregion
//#region extension/node_modules/decompress-unzip/node_modules/file-type/index.js
var require_file_type = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = function(buf) {
		if (!(buf && buf.length > 1)) return null;
		if (buf[0] === 255 && buf[1] === 216 && buf[2] === 255) return {
			ext: "jpg",
			mime: "image/jpeg"
		};
		if (buf[0] === 137 && buf[1] === 80 && buf[2] === 78 && buf[3] === 71) return {
			ext: "png",
			mime: "image/png"
		};
		if (buf[0] === 71 && buf[1] === 73 && buf[2] === 70) return {
			ext: "gif",
			mime: "image/gif"
		};
		if (buf[8] === 87 && buf[9] === 69 && buf[10] === 66 && buf[11] === 80) return {
			ext: "webp",
			mime: "image/webp"
		};
		if (buf[0] === 70 && buf[1] === 76 && buf[2] === 73 && buf[3] === 70) return {
			ext: "flif",
			mime: "image/flif"
		};
		if ((buf[0] === 73 && buf[1] === 73 && buf[2] === 42 && buf[3] === 0 || buf[0] === 77 && buf[1] === 77 && buf[2] === 0 && buf[3] === 42) && buf[8] === 67 && buf[9] === 82) return {
			ext: "cr2",
			mime: "image/x-canon-cr2"
		};
		if (buf[0] === 73 && buf[1] === 73 && buf[2] === 42 && buf[3] === 0 || buf[0] === 77 && buf[1] === 77 && buf[2] === 0 && buf[3] === 42) return {
			ext: "tif",
			mime: "image/tiff"
		};
		if (buf[0] === 66 && buf[1] === 77) return {
			ext: "bmp",
			mime: "image/bmp"
		};
		if (buf[0] === 73 && buf[1] === 73 && buf[2] === 188) return {
			ext: "jxr",
			mime: "image/vnd.ms-photo"
		};
		if (buf[0] === 56 && buf[1] === 66 && buf[2] === 80 && buf[3] === 83) return {
			ext: "psd",
			mime: "image/vnd.adobe.photoshop"
		};
		if (buf[0] === 80 && buf[1] === 75 && buf[2] === 3 && buf[3] === 4 && buf[30] === 109 && buf[31] === 105 && buf[32] === 109 && buf[33] === 101 && buf[34] === 116 && buf[35] === 121 && buf[36] === 112 && buf[37] === 101 && buf[38] === 97 && buf[39] === 112 && buf[40] === 112 && buf[41] === 108 && buf[42] === 105 && buf[43] === 99 && buf[44] === 97 && buf[45] === 116 && buf[46] === 105 && buf[47] === 111 && buf[48] === 110 && buf[49] === 47 && buf[50] === 101 && buf[51] === 112 && buf[52] === 117 && buf[53] === 98 && buf[54] === 43 && buf[55] === 122 && buf[56] === 105 && buf[57] === 112) return {
			ext: "epub",
			mime: "application/epub+zip"
		};
		if (buf[0] === 80 && buf[1] === 75 && buf[2] === 3 && buf[3] === 4 && buf[30] === 77 && buf[31] === 69 && buf[32] === 84 && buf[33] === 65 && buf[34] === 45 && buf[35] === 73 && buf[36] === 78 && buf[37] === 70 && buf[38] === 47 && buf[39] === 109 && buf[40] === 111 && buf[41] === 122 && buf[42] === 105 && buf[43] === 108 && buf[44] === 108 && buf[45] === 97 && buf[46] === 46 && buf[47] === 114 && buf[48] === 115 && buf[49] === 97) return {
			ext: "xpi",
			mime: "application/x-xpinstall"
		};
		if (buf[0] === 80 && buf[1] === 75 && (buf[2] === 3 || buf[2] === 5 || buf[2] === 7) && (buf[3] === 4 || buf[3] === 6 || buf[3] === 8)) return {
			ext: "zip",
			mime: "application/zip"
		};
		if (buf[257] === 117 && buf[258] === 115 && buf[259] === 116 && buf[260] === 97 && buf[261] === 114) return {
			ext: "tar",
			mime: "application/x-tar"
		};
		if (buf[0] === 82 && buf[1] === 97 && buf[2] === 114 && buf[3] === 33 && buf[4] === 26 && buf[5] === 7 && (buf[6] === 0 || buf[6] === 1)) return {
			ext: "rar",
			mime: "application/x-rar-compressed"
		};
		if (buf[0] === 31 && buf[1] === 139 && buf[2] === 8) return {
			ext: "gz",
			mime: "application/gzip"
		};
		if (buf[0] === 66 && buf[1] === 90 && buf[2] === 104) return {
			ext: "bz2",
			mime: "application/x-bzip2"
		};
		if (buf[0] === 55 && buf[1] === 122 && buf[2] === 188 && buf[3] === 175 && buf[4] === 39 && buf[5] === 28) return {
			ext: "7z",
			mime: "application/x-7z-compressed"
		};
		if (buf[0] === 120 && buf[1] === 1) return {
			ext: "dmg",
			mime: "application/x-apple-diskimage"
		};
		if (buf[0] === 0 && buf[1] === 0 && buf[2] === 0 && (buf[3] === 24 || buf[3] === 32) && buf[4] === 102 && buf[5] === 116 && buf[6] === 121 && buf[7] === 112 || buf[0] === 51 && buf[1] === 103 && buf[2] === 112 && buf[3] === 53 || buf[0] === 0 && buf[1] === 0 && buf[2] === 0 && buf[3] === 28 && buf[4] === 102 && buf[5] === 116 && buf[6] === 121 && buf[7] === 112 && buf[8] === 109 && buf[9] === 112 && buf[10] === 52 && buf[11] === 50 && buf[16] === 109 && buf[17] === 112 && buf[18] === 52 && buf[19] === 49 && buf[20] === 109 && buf[21] === 112 && buf[22] === 52 && buf[23] === 50 && buf[24] === 105 && buf[25] === 115 && buf[26] === 111 && buf[27] === 109 || buf[0] === 0 && buf[1] === 0 && buf[2] === 0 && buf[3] === 28 && buf[4] === 102 && buf[5] === 116 && buf[6] === 121 && buf[7] === 112 && buf[8] === 105 && buf[9] === 115 && buf[10] === 111 && buf[11] === 109 || buf[0] === 0 && buf[1] === 0 && buf[2] === 0 && buf[3] === 28 && buf[4] === 102 && buf[5] === 116 && buf[6] === 121 && buf[7] === 112 && buf[8] === 109 && buf[9] === 112 && buf[10] === 52 && buf[11] === 50 && buf[12] === 0 && buf[13] === 0 && buf[14] === 0 && buf[15] === 0) return {
			ext: "mp4",
			mime: "video/mp4"
		};
		if (buf[0] === 0 && buf[1] === 0 && buf[2] === 0 && buf[3] === 28 && buf[4] === 102 && buf[5] === 116 && buf[6] === 121 && buf[7] === 112 && buf[8] === 77 && buf[9] === 52 && buf[10] === 86) return {
			ext: "m4v",
			mime: "video/x-m4v"
		};
		if (buf[0] === 77 && buf[1] === 84 && buf[2] === 104 && buf[3] === 100) return {
			ext: "mid",
			mime: "audio/midi"
		};
		if (buf[31] === 109 && buf[32] === 97 && buf[33] === 116 && buf[34] === 114 && buf[35] === 111 && buf[36] === 115 && buf[37] === 107 && buf[38] === 97) return {
			ext: "mkv",
			mime: "video/x-matroska"
		};
		if (buf[0] === 26 && buf[1] === 69 && buf[2] === 223 && buf[3] === 163) return {
			ext: "webm",
			mime: "video/webm"
		};
		if (buf[0] === 0 && buf[1] === 0 && buf[2] === 0 && buf[3] === 20 && buf[4] === 102 && buf[5] === 116 && buf[6] === 121 && buf[7] === 112) return {
			ext: "mov",
			mime: "video/quicktime"
		};
		if (buf[0] === 82 && buf[1] === 73 && buf[2] === 70 && buf[3] === 70 && buf[8] === 65 && buf[9] === 86 && buf[10] === 73) return {
			ext: "avi",
			mime: "video/x-msvideo"
		};
		if (buf[0] === 48 && buf[1] === 38 && buf[2] === 178 && buf[3] === 117 && buf[4] === 142 && buf[5] === 102 && buf[6] === 207 && buf[7] === 17 && buf[8] === 166 && buf[9] === 217) return {
			ext: "wmv",
			mime: "video/x-ms-wmv"
		};
		if (buf[0] === 0 && buf[1] === 0 && buf[2] === 1 && buf[3].toString(16)[0] === "b") return {
			ext: "mpg",
			mime: "video/mpeg"
		};
		if (buf[0] === 73 && buf[1] === 68 && buf[2] === 51 || buf[0] === 255 && buf[1] === 251) return {
			ext: "mp3",
			mime: "audio/mpeg"
		};
		if (buf[4] === 102 && buf[5] === 116 && buf[6] === 121 && buf[7] === 112 && buf[8] === 77 && buf[9] === 52 && buf[10] === 65 || buf[0] === 77 && buf[1] === 52 && buf[2] === 65 && buf[3] === 32) return {
			ext: "m4a",
			mime: "audio/m4a"
		};
		if (buf[28] === 79 && buf[29] === 112 && buf[30] === 117 && buf[31] === 115 && buf[32] === 72 && buf[33] === 101 && buf[34] === 97 && buf[35] === 100) return {
			ext: "opus",
			mime: "audio/opus"
		};
		if (buf[0] === 79 && buf[1] === 103 && buf[2] === 103 && buf[3] === 83) return {
			ext: "ogg",
			mime: "audio/ogg"
		};
		if (buf[0] === 102 && buf[1] === 76 && buf[2] === 97 && buf[3] === 67) return {
			ext: "flac",
			mime: "audio/x-flac"
		};
		if (buf[0] === 82 && buf[1] === 73 && buf[2] === 70 && buf[3] === 70 && buf[8] === 87 && buf[9] === 65 && buf[10] === 86 && buf[11] === 69) return {
			ext: "wav",
			mime: "audio/x-wav"
		};
		if (buf[0] === 35 && buf[1] === 33 && buf[2] === 65 && buf[3] === 77 && buf[4] === 82 && buf[5] === 10) return {
			ext: "amr",
			mime: "audio/amr"
		};
		if (buf[0] === 37 && buf[1] === 80 && buf[2] === 68 && buf[3] === 70) return {
			ext: "pdf",
			mime: "application/pdf"
		};
		if (buf[0] === 77 && buf[1] === 90) return {
			ext: "exe",
			mime: "application/x-msdownload"
		};
		if ((buf[0] === 67 || buf[0] === 70) && buf[1] === 87 && buf[2] === 83) return {
			ext: "swf",
			mime: "application/x-shockwave-flash"
		};
		if (buf[0] === 123 && buf[1] === 92 && buf[2] === 114 && buf[3] === 116 && buf[4] === 102) return {
			ext: "rtf",
			mime: "application/rtf"
		};
		if (buf[0] === 119 && buf[1] === 79 && buf[2] === 70 && buf[3] === 70 && (buf[4] === 0 && buf[5] === 1 && buf[6] === 0 && buf[7] === 0 || buf[4] === 79 && buf[5] === 84 && buf[6] === 84 && buf[7] === 79)) return {
			ext: "woff",
			mime: "application/font-woff"
		};
		if (buf[0] === 119 && buf[1] === 79 && buf[2] === 70 && buf[3] === 50 && (buf[4] === 0 && buf[5] === 1 && buf[6] === 0 && buf[7] === 0 || buf[4] === 79 && buf[5] === 84 && buf[6] === 84 && buf[7] === 79)) return {
			ext: "woff2",
			mime: "application/font-woff"
		};
		if (buf[34] === 76 && buf[35] === 80 && (buf[8] === 0 && buf[9] === 0 && buf[10] === 1 || buf[8] === 1 && buf[9] === 0 && buf[10] === 2 || buf[8] === 2 && buf[9] === 0 && buf[10] === 2)) return {
			ext: "eot",
			mime: "application/octet-stream"
		};
		if (buf[0] === 0 && buf[1] === 1 && buf[2] === 0 && buf[3] === 0 && buf[4] === 0) return {
			ext: "ttf",
			mime: "application/font-sfnt"
		};
		if (buf[0] === 79 && buf[1] === 84 && buf[2] === 84 && buf[3] === 79 && buf[4] === 0) return {
			ext: "otf",
			mime: "application/font-sfnt"
		};
		if (buf[0] === 0 && buf[1] === 0 && buf[2] === 1 && buf[3] === 0) return {
			ext: "ico",
			mime: "image/x-icon"
		};
		if (buf[0] === 70 && buf[1] === 76 && buf[2] === 86 && buf[3] === 1) return {
			ext: "flv",
			mime: "video/x-flv"
		};
		if (buf[0] === 37 && buf[1] === 33) return {
			ext: "ps",
			mime: "application/postscript"
		};
		if (buf[0] === 253 && buf[1] === 55 && buf[2] === 122 && buf[3] === 88 && buf[4] === 90 && buf[5] === 0) return {
			ext: "xz",
			mime: "application/x-xz"
		};
		if (buf[0] === 83 && buf[1] === 81 && buf[2] === 76 && buf[3] === 105) return {
			ext: "sqlite",
			mime: "application/x-sqlite3"
		};
		if (buf[0] === 78 && buf[1] === 69 && buf[2] === 83 && buf[3] === 26) return {
			ext: "nes",
			mime: "application/x-nintendo-nes-rom"
		};
		if (buf[0] === 67 && buf[1] === 114 && buf[2] === 50 && buf[3] === 52) return {
			ext: "crx",
			mime: "application/x-google-chrome-extension"
		};
		if (buf[0] === 77 && buf[1] === 83 && buf[2] === 67 && buf[3] === 70 || buf[0] === 73 && buf[1] === 83 && buf[2] === 99 && buf[3] === 40) return {
			ext: "cab",
			mime: "application/vnd.ms-cab-compressed"
		};
		if (buf[0] === 33 && buf[1] === 60 && buf[2] === 97 && buf[3] === 114 && buf[4] === 99 && buf[5] === 104 && buf[6] === 62 && buf[7] === 10 && buf[8] === 100 && buf[9] === 101 && buf[10] === 98 && buf[11] === 105 && buf[12] === 97 && buf[13] === 110 && buf[14] === 45 && buf[15] === 98 && buf[16] === 105 && buf[17] === 110 && buf[18] === 97 && buf[19] === 114 && buf[20] === 121) return {
			ext: "deb",
			mime: "application/x-deb"
		};
		if (buf[0] === 33 && buf[1] === 60 && buf[2] === 97 && buf[3] === 114 && buf[4] === 99 && buf[5] === 104 && buf[6] === 62) return {
			ext: "ar",
			mime: "application/x-unix-archive"
		};
		if (buf[0] === 237 && buf[1] === 171 && buf[2] === 238 && buf[3] === 219) return {
			ext: "rpm",
			mime: "application/x-rpm"
		};
		if (buf[0] === 31 && buf[1] === 160 || buf[0] === 31 && buf[1] === 157) return {
			ext: "Z",
			mime: "application/x-compress"
		};
		if (buf[0] === 76 && buf[1] === 90 && buf[2] === 73 && buf[3] === 80) return {
			ext: "lz",
			mime: "application/x-lzip"
		};
		if (buf[0] === 208 && buf[1] === 207 && buf[2] === 17 && buf[3] === 224 && buf[4] === 161 && buf[5] === 177 && buf[6] === 26 && buf[7] === 225) return {
			ext: "msi",
			mime: "application/x-msi"
		};
		return null;
	};
}));
//#endregion
//#region extension/node_modules/pinkie/index.js
var require_pinkie = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var PENDING = "pending";
	var SETTLED = "settled";
	var FULFILLED = "fulfilled";
	var REJECTED = "rejected";
	var NOOP = function() {};
	var isNode = typeof global !== "undefined" && typeof global.process !== "undefined" && typeof global.process.emit === "function";
	var asyncSetTimer = typeof setImmediate === "undefined" ? setTimeout : setImmediate;
	var asyncQueue = [];
	var asyncTimer;
	function asyncFlush() {
		for (var i = 0; i < asyncQueue.length; i++) asyncQueue[i][0](asyncQueue[i][1]);
		asyncQueue = [];
		asyncTimer = false;
	}
	function asyncCall(callback, arg) {
		asyncQueue.push([callback, arg]);
		if (!asyncTimer) {
			asyncTimer = true;
			asyncSetTimer(asyncFlush, 0);
		}
	}
	function invokeResolver(resolver, promise) {
		function resolvePromise(value) {
			resolve(promise, value);
		}
		function rejectPromise(reason) {
			reject(promise, reason);
		}
		try {
			resolver(resolvePromise, rejectPromise);
		} catch (e) {
			rejectPromise(e);
		}
	}
	function invokeCallback(subscriber) {
		var owner = subscriber.owner;
		var settled = owner._state;
		var value = owner._data;
		var callback = subscriber[settled];
		var promise = subscriber.then;
		if (typeof callback === "function") {
			settled = FULFILLED;
			try {
				value = callback(value);
			} catch (e) {
				reject(promise, e);
			}
		}
		if (!handleThenable(promise, value)) {
			if (settled === FULFILLED) resolve(promise, value);
			if (settled === REJECTED) reject(promise, value);
		}
	}
	function handleThenable(promise, value) {
		var resolved;
		try {
			if (promise === value) throw new TypeError("A promises callback cannot return that same promise.");
			if (value && (typeof value === "function" || typeof value === "object")) {
				var then = value.then;
				if (typeof then === "function") {
					then.call(value, function(val) {
						if (!resolved) {
							resolved = true;
							if (value === val) fulfill(promise, val);
							else resolve(promise, val);
						}
					}, function(reason) {
						if (!resolved) {
							resolved = true;
							reject(promise, reason);
						}
					});
					return true;
				}
			}
		} catch (e) {
			if (!resolved) reject(promise, e);
			return true;
		}
		return false;
	}
	function resolve(promise, value) {
		if (promise === value || !handleThenable(promise, value)) fulfill(promise, value);
	}
	function fulfill(promise, value) {
		if (promise._state === PENDING) {
			promise._state = SETTLED;
			promise._data = value;
			asyncCall(publishFulfillment, promise);
		}
	}
	function reject(promise, reason) {
		if (promise._state === PENDING) {
			promise._state = SETTLED;
			promise._data = reason;
			asyncCall(publishRejection, promise);
		}
	}
	function publish(promise) {
		promise._then = promise._then.forEach(invokeCallback);
	}
	function publishFulfillment(promise) {
		promise._state = FULFILLED;
		publish(promise);
	}
	function publishRejection(promise) {
		promise._state = REJECTED;
		publish(promise);
		if (!promise._handled && isNode) global.process.emit("unhandledRejection", promise._data, promise);
	}
	function notifyRejectionHandled(promise) {
		global.process.emit("rejectionHandled", promise);
	}
	/**
	* @class
	*/
	function Promise(resolver) {
		if (typeof resolver !== "function") throw new TypeError("Promise resolver " + resolver + " is not a function");
		if (this instanceof Promise === false) throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
		this._then = [];
		invokeResolver(resolver, this);
	}
	Promise.prototype = {
		constructor: Promise,
		_state: PENDING,
		_then: null,
		_data: void 0,
		_handled: false,
		then: function(onFulfillment, onRejection) {
			var subscriber = {
				owner: this,
				then: new this.constructor(NOOP),
				fulfilled: onFulfillment,
				rejected: onRejection
			};
			if ((onRejection || onFulfillment) && !this._handled) {
				this._handled = true;
				if (this._state === REJECTED && isNode) asyncCall(notifyRejectionHandled, this);
			}
			if (this._state === FULFILLED || this._state === REJECTED) asyncCall(invokeCallback, subscriber);
			else this._then.push(subscriber);
			return subscriber.then;
		},
		catch: function(onRejection) {
			return this.then(null, onRejection);
		}
	};
	Promise.all = function(promises) {
		if (!Array.isArray(promises)) throw new TypeError("You must pass an array to Promise.all().");
		return new Promise(function(resolve, reject) {
			var results = [];
			var remaining = 0;
			function resolver(index) {
				remaining++;
				return function(value) {
					results[index] = value;
					if (!--remaining) resolve(results);
				};
			}
			for (var i = 0, promise; i < promises.length; i++) {
				promise = promises[i];
				if (promise && typeof promise.then === "function") promise.then(resolver(i), reject);
				else results[i] = promise;
			}
			if (!remaining) resolve(results);
		});
	};
	Promise.race = function(promises) {
		if (!Array.isArray(promises)) throw new TypeError("You must pass an array to Promise.race().");
		return new Promise(function(resolve, reject) {
			for (var i = 0, promise; i < promises.length; i++) {
				promise = promises[i];
				if (promise && typeof promise.then === "function") promise.then(resolve, reject);
				else resolve(promise);
			}
		});
	};
	Promise.resolve = function(value) {
		if (value && typeof value === "object" && value.constructor === Promise) return value;
		return new Promise(function(resolve) {
			resolve(value);
		});
	};
	Promise.reject = function(reason) {
		return new Promise(function(resolve, reject) {
			reject(reason);
		});
	};
	module.exports = Promise;
}));
//#endregion
//#region extension/node_modules/pinkie-promise/index.js
var require_pinkie_promise = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = typeof Promise === "function" ? Promise : require_pinkie();
}));
//#endregion
//#region extension/node_modules/object-assign/index.js
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var require_object_assign = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;
	function toObject(val) {
		if (val === null || val === void 0) throw new TypeError("Object.assign cannot be called with null or undefined");
		return Object(val);
	}
	function shouldUseNative() {
		try {
			if (!Object.assign) return false;
			var test1 = /* @__PURE__ */ new String("abc");
			test1[5] = "de";
			if (Object.getOwnPropertyNames(test1)[0] === "5") return false;
			var test2 = {};
			for (var i = 0; i < 10; i++) test2["_" + String.fromCharCode(i)] = i;
			if (Object.getOwnPropertyNames(test2).map(function(n) {
				return test2[n];
			}).join("") !== "0123456789") return false;
			var test3 = {};
			"abcdefghijklmnopqrst".split("").forEach(function(letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") return false;
			return true;
		} catch (err) {
			return false;
		}
	}
	module.exports = shouldUseNative() ? Object.assign : function(target, source) {
		var from;
		var to = toObject(target);
		var symbols;
		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);
			for (var key in from) if (hasOwnProperty.call(from, key)) to[key] = from[key];
			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) if (propIsEnumerable.call(from, symbols[i])) to[symbols[i]] = from[symbols[i]];
			}
		}
		return to;
	};
}));
//#endregion
//#region extension/node_modules/get-stream/buffer-stream.js
var require_buffer_stream = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var PassThrough$1 = require("stream").PassThrough;
	var objectAssign = require_object_assign();
	module.exports = function(opts) {
		opts = objectAssign({}, opts);
		var array = opts.array;
		var encoding = opts.encoding;
		var buffer = encoding === "buffer";
		var objectMode = false;
		if (array) objectMode = !(encoding || buffer);
		else encoding = encoding || "utf8";
		if (buffer) encoding = null;
		var len = 0;
		var ret = [];
		var stream = new PassThrough$1({ objectMode });
		if (encoding) stream.setEncoding(encoding);
		stream.on("data", function(chunk) {
			ret.push(chunk);
			if (objectMode) len = ret.length;
			else len += chunk.length;
		});
		stream.getBufferedValue = function() {
			if (array) return ret;
			return buffer ? Buffer.concat(ret, len) : ret.join("");
		};
		stream.getBufferedLength = function() {
			return len;
		};
		return stream;
	};
}));
//#endregion
//#region extension/node_modules/get-stream/index.js
var require_get_stream = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Promise = require_pinkie_promise();
	var objectAssign = require_object_assign();
	var bufferStream = require_buffer_stream();
	function getStream(inputStream, opts) {
		if (!inputStream) return Promise.reject(/* @__PURE__ */ new Error("Expected a stream"));
		opts = objectAssign({ maxBuffer: Infinity }, opts);
		var maxBuffer = opts.maxBuffer;
		var stream;
		var clean;
		var p = new Promise(function(resolve, reject) {
			stream = bufferStream(opts);
			inputStream.once("error", error);
			inputStream.pipe(stream);
			stream.on("data", function() {
				if (stream.getBufferedLength() > maxBuffer) reject(/* @__PURE__ */ new Error("maxBuffer exceeded"));
			});
			stream.once("error", error);
			stream.on("end", resolve);
			clean = function() {
				if (inputStream.unpipe) inputStream.unpipe(stream);
			};
			function error(err) {
				if (err) err.bufferedData = stream.getBufferedValue();
				reject(err);
			}
		});
		p.then(clean, clean);
		return p.then(function() {
			return stream.getBufferedValue();
		});
	}
	module.exports = getStream;
	module.exports.buffer = function(stream, opts) {
		return getStream(stream, objectAssign({}, opts, { encoding: "buffer" }));
	};
	module.exports.array = function(stream, opts) {
		return getStream(stream, objectAssign({}, opts, { array: true }));
	};
}));
//#endregion
//#region extension/node_modules/pify/index.js
var require_pify$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var processFn = function(fn, P, opts) {
		return function() {
			var that = this;
			var args = new Array(arguments.length);
			for (var i = 0; i < arguments.length; i++) args[i] = arguments[i];
			return new P(function(resolve, reject) {
				args.push(function(err, result) {
					if (err) reject(err);
					else if (opts.multiArgs) {
						var results = new Array(arguments.length - 1);
						for (var i = 1; i < arguments.length; i++) results[i - 1] = arguments[i];
						resolve(results);
					} else resolve(result);
				});
				fn.apply(that, args);
			});
		};
	};
	var pify = module.exports = function(obj, P, opts) {
		if (typeof P !== "function") {
			opts = P;
			P = Promise;
		}
		opts = opts || {};
		opts.exclude = opts.exclude || [/.+Sync$/];
		var filter = function(key) {
			var match = function(pattern) {
				return typeof pattern === "string" ? key === pattern : pattern.test(key);
			};
			return opts.include ? opts.include.some(match) : !opts.exclude.some(match);
		};
		var ret = typeof obj === "function" ? function() {
			if (opts.excludeMain) return obj.apply(this, arguments);
			return processFn(obj, P, opts).apply(this, arguments);
		} : {};
		return Object.keys(obj).reduce(function(ret, key) {
			var x = obj[key];
			ret[key] = typeof x === "function" && filter(key) ? processFn(x, P, opts) : x;
			return ret;
		}, ret);
	};
	pify.all = pify;
}));
//#endregion
//#region extension/node_modules/pend/index.js
var require_pend = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = Pend;
	function Pend() {
		this.pending = 0;
		this.max = Infinity;
		this.listeners = [];
		this.waiting = [];
		this.error = null;
	}
	Pend.prototype.go = function(fn) {
		if (this.pending < this.max) pendGo(this, fn);
		else this.waiting.push(fn);
	};
	Pend.prototype.wait = function(cb) {
		if (this.pending === 0) cb(this.error);
		else this.listeners.push(cb);
	};
	Pend.prototype.hold = function() {
		return pendHold(this);
	};
	function pendHold(self) {
		self.pending += 1;
		var called = false;
		return onCb;
		function onCb(err) {
			if (called) throw new Error("callback called twice");
			called = true;
			self.error = self.error || err;
			self.pending -= 1;
			if (self.waiting.length > 0 && self.pending < self.max) pendGo(self, self.waiting.shift());
			else if (self.pending === 0) {
				var listeners = self.listeners;
				self.listeners = [];
				listeners.forEach(cbListener);
			}
		}
		function cbListener(listener) {
			listener(self.error);
		}
	}
	function pendGo(self, fn) {
		fn(pendHold(self));
	}
}));
//#endregion
//#region extension/node_modules/fd-slicer/index.js
var require_fd_slicer = /* @__PURE__ */ __commonJSMin(((exports) => {
	var fs$2 = require("fs");
	var util$2 = require("util");
	var stream = require("stream");
	var Readable = stream.Readable;
	var Writable = stream.Writable;
	var PassThrough = stream.PassThrough;
	var Pend = require_pend();
	var EventEmitter$2 = require("events").EventEmitter;
	exports.createFromBuffer = createFromBuffer;
	exports.createFromFd = createFromFd;
	exports.BufferSlicer = BufferSlicer;
	exports.FdSlicer = FdSlicer;
	util$2.inherits(FdSlicer, EventEmitter$2);
	function FdSlicer(fd, options) {
		options = options || {};
		EventEmitter$2.call(this);
		this.fd = fd;
		this.pend = new Pend();
		this.pend.max = 1;
		this.refCount = 0;
		this.autoClose = !!options.autoClose;
	}
	FdSlicer.prototype.read = function(buffer, offset, length, position, callback) {
		var self = this;
		self.pend.go(function(cb) {
			fs$2.read(self.fd, buffer, offset, length, position, function(err, bytesRead, buffer) {
				cb();
				callback(err, bytesRead, buffer);
			});
		});
	};
	FdSlicer.prototype.write = function(buffer, offset, length, position, callback) {
		var self = this;
		self.pend.go(function(cb) {
			fs$2.write(self.fd, buffer, offset, length, position, function(err, written, buffer) {
				cb();
				callback(err, written, buffer);
			});
		});
	};
	FdSlicer.prototype.createReadStream = function(options) {
		return new ReadStream(this, options);
	};
	FdSlicer.prototype.createWriteStream = function(options) {
		return new WriteStream(this, options);
	};
	FdSlicer.prototype.ref = function() {
		this.refCount += 1;
	};
	FdSlicer.prototype.unref = function() {
		var self = this;
		self.refCount -= 1;
		if (self.refCount > 0) return;
		if (self.refCount < 0) throw new Error("invalid unref");
		if (self.autoClose) fs$2.close(self.fd, onCloseDone);
		function onCloseDone(err) {
			if (err) self.emit("error", err);
			else self.emit("close");
		}
	};
	util$2.inherits(ReadStream, Readable);
	function ReadStream(context, options) {
		options = options || {};
		Readable.call(this, options);
		this.context = context;
		this.context.ref();
		this.start = options.start || 0;
		this.endOffset = options.end;
		this.pos = this.start;
		this.destroyed = false;
	}
	ReadStream.prototype._read = function(n) {
		var self = this;
		if (self.destroyed) return;
		var toRead = Math.min(self._readableState.highWaterMark, n);
		if (self.endOffset != null) toRead = Math.min(toRead, self.endOffset - self.pos);
		if (toRead <= 0) {
			self.destroyed = true;
			self.push(null);
			self.context.unref();
			return;
		}
		self.context.pend.go(function(cb) {
			if (self.destroyed) return cb();
			var buffer = new Buffer(toRead);
			fs$2.read(self.context.fd, buffer, 0, toRead, self.pos, function(err, bytesRead) {
				if (err) self.destroy(err);
				else if (bytesRead === 0) {
					self.destroyed = true;
					self.push(null);
					self.context.unref();
				} else {
					self.pos += bytesRead;
					self.push(buffer.slice(0, bytesRead));
				}
				cb();
			});
		});
	};
	ReadStream.prototype.destroy = function(err) {
		if (this.destroyed) return;
		err = err || /* @__PURE__ */ new Error("stream destroyed");
		this.destroyed = true;
		this.emit("error", err);
		this.context.unref();
	};
	util$2.inherits(WriteStream, Writable);
	function WriteStream(context, options) {
		options = options || {};
		Writable.call(this, options);
		this.context = context;
		this.context.ref();
		this.start = options.start || 0;
		this.endOffset = options.end == null ? Infinity : +options.end;
		this.bytesWritten = 0;
		this.pos = this.start;
		this.destroyed = false;
		this.on("finish", this.destroy.bind(this));
	}
	WriteStream.prototype._write = function(buffer, encoding, callback) {
		var self = this;
		if (self.destroyed) return;
		if (self.pos + buffer.length > self.endOffset) {
			var err = /* @__PURE__ */ new Error("maximum file length exceeded");
			err.code = "ETOOBIG";
			self.destroy();
			callback(err);
			return;
		}
		self.context.pend.go(function(cb) {
			if (self.destroyed) return cb();
			fs$2.write(self.context.fd, buffer, 0, buffer.length, self.pos, function(err, bytes) {
				if (err) {
					self.destroy();
					cb();
					callback(err);
				} else {
					self.bytesWritten += bytes;
					self.pos += bytes;
					self.emit("progress");
					cb();
					callback();
				}
			});
		});
	};
	WriteStream.prototype.destroy = function() {
		if (this.destroyed) return;
		this.destroyed = true;
		this.context.unref();
	};
	util$2.inherits(BufferSlicer, EventEmitter$2);
	function BufferSlicer(buffer, options) {
		EventEmitter$2.call(this);
		options = options || {};
		this.refCount = 0;
		this.buffer = buffer;
		this.maxChunkSize = options.maxChunkSize || Number.MAX_SAFE_INTEGER;
	}
	BufferSlicer.prototype.read = function(buffer, offset, length, position, callback) {
		var end = position + length;
		var delta = end - this.buffer.length;
		var written = delta > 0 ? delta : length;
		this.buffer.copy(buffer, offset, position, end);
		setImmediate(function() {
			callback(null, written);
		});
	};
	BufferSlicer.prototype.write = function(buffer, offset, length, position, callback) {
		buffer.copy(this.buffer, position, offset, offset + length);
		setImmediate(function() {
			callback(null, length, buffer);
		});
	};
	BufferSlicer.prototype.createReadStream = function(options) {
		options = options || {};
		var readStream = new PassThrough(options);
		readStream.destroyed = false;
		readStream.start = options.start || 0;
		readStream.endOffset = options.end;
		readStream.pos = readStream.endOffset || this.buffer.length;
		var entireSlice = this.buffer.slice(readStream.start, readStream.pos);
		var offset = 0;
		while (true) {
			var nextOffset = offset + this.maxChunkSize;
			if (nextOffset >= entireSlice.length) {
				if (offset < entireSlice.length) readStream.write(entireSlice.slice(offset, entireSlice.length));
				break;
			}
			readStream.write(entireSlice.slice(offset, nextOffset));
			offset = nextOffset;
		}
		readStream.end();
		readStream.destroy = function() {
			readStream.destroyed = true;
		};
		return readStream;
	};
	BufferSlicer.prototype.createWriteStream = function(options) {
		var bufferSlicer = this;
		options = options || {};
		var writeStream = new Writable(options);
		writeStream.start = options.start || 0;
		writeStream.endOffset = options.end == null ? this.buffer.length : +options.end;
		writeStream.bytesWritten = 0;
		writeStream.pos = writeStream.start;
		writeStream.destroyed = false;
		writeStream._write = function(buffer, encoding, callback) {
			if (writeStream.destroyed) return;
			var end = writeStream.pos + buffer.length;
			if (end > writeStream.endOffset) {
				var err = /* @__PURE__ */ new Error("maximum file length exceeded");
				err.code = "ETOOBIG";
				writeStream.destroyed = true;
				callback(err);
				return;
			}
			buffer.copy(bufferSlicer.buffer, writeStream.pos, 0, buffer.length);
			writeStream.bytesWritten += buffer.length;
			writeStream.pos = end;
			writeStream.emit("progress");
			callback();
		};
		writeStream.destroy = function() {
			writeStream.destroyed = true;
		};
		return writeStream;
	};
	BufferSlicer.prototype.ref = function() {
		this.refCount += 1;
	};
	BufferSlicer.prototype.unref = function() {
		this.refCount -= 1;
		if (this.refCount < 0) throw new Error("invalid unref");
	};
	function createFromBuffer(buffer, options) {
		return new BufferSlicer(buffer, options);
	}
	function createFromFd(fd, options) {
		return new FdSlicer(fd, options);
	}
}));
//#endregion
//#region extension/node_modules/buffer-crc32/index.js
var require_buffer_crc32 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Buffer$2 = require("buffer").Buffer;
	var CRC_TABLE = [
		0,
		1996959894,
		3993919788,
		2567524794,
		124634137,
		1886057615,
		3915621685,
		2657392035,
		249268274,
		2044508324,
		3772115230,
		2547177864,
		162941995,
		2125561021,
		3887607047,
		2428444049,
		498536548,
		1789927666,
		4089016648,
		2227061214,
		450548861,
		1843258603,
		4107580753,
		2211677639,
		325883990,
		1684777152,
		4251122042,
		2321926636,
		335633487,
		1661365465,
		4195302755,
		2366115317,
		997073096,
		1281953886,
		3579855332,
		2724688242,
		1006888145,
		1258607687,
		3524101629,
		2768942443,
		901097722,
		1119000684,
		3686517206,
		2898065728,
		853044451,
		1172266101,
		3705015759,
		2882616665,
		651767980,
		1373503546,
		3369554304,
		3218104598,
		565507253,
		1454621731,
		3485111705,
		3099436303,
		671266974,
		1594198024,
		3322730930,
		2970347812,
		795835527,
		1483230225,
		3244367275,
		3060149565,
		1994146192,
		31158534,
		2563907772,
		4023717930,
		1907459465,
		112637215,
		2680153253,
		3904427059,
		2013776290,
		251722036,
		2517215374,
		3775830040,
		2137656763,
		141376813,
		2439277719,
		3865271297,
		1802195444,
		476864866,
		2238001368,
		4066508878,
		1812370925,
		453092731,
		2181625025,
		4111451223,
		1706088902,
		314042704,
		2344532202,
		4240017532,
		1658658271,
		366619977,
		2362670323,
		4224994405,
		1303535960,
		984961486,
		2747007092,
		3569037538,
		1256170817,
		1037604311,
		2765210733,
		3554079995,
		1131014506,
		879679996,
		2909243462,
		3663771856,
		1141124467,
		855842277,
		2852801631,
		3708648649,
		1342533948,
		654459306,
		3188396048,
		3373015174,
		1466479909,
		544179635,
		3110523913,
		3462522015,
		1591671054,
		702138776,
		2966460450,
		3352799412,
		1504918807,
		783551873,
		3082640443,
		3233442989,
		3988292384,
		2596254646,
		62317068,
		1957810842,
		3939845945,
		2647816111,
		81470997,
		1943803523,
		3814918930,
		2489596804,
		225274430,
		2053790376,
		3826175755,
		2466906013,
		167816743,
		2097651377,
		4027552580,
		2265490386,
		503444072,
		1762050814,
		4150417245,
		2154129355,
		426522225,
		1852507879,
		4275313526,
		2312317920,
		282753626,
		1742555852,
		4189708143,
		2394877945,
		397917763,
		1622183637,
		3604390888,
		2714866558,
		953729732,
		1340076626,
		3518719985,
		2797360999,
		1068828381,
		1219638859,
		3624741850,
		2936675148,
		906185462,
		1090812512,
		3747672003,
		2825379669,
		829329135,
		1181335161,
		3412177804,
		3160834842,
		628085408,
		1382605366,
		3423369109,
		3138078467,
		570562233,
		1426400815,
		3317316542,
		2998733608,
		733239954,
		1555261956,
		3268935591,
		3050360625,
		752459403,
		1541320221,
		2607071920,
		3965973030,
		1969922972,
		40735498,
		2617837225,
		3943577151,
		1913087877,
		83908371,
		2512341634,
		3803740692,
		2075208622,
		213261112,
		2463272603,
		3855990285,
		2094854071,
		198958881,
		2262029012,
		4057260610,
		1759359992,
		534414190,
		2176718541,
		4139329115,
		1873836001,
		414664567,
		2282248934,
		4279200368,
		1711684554,
		285281116,
		2405801727,
		4167216745,
		1634467795,
		376229701,
		2685067896,
		3608007406,
		1308918612,
		956543938,
		2808555105,
		3495958263,
		1231636301,
		1047427035,
		2932959818,
		3654703836,
		1088359270,
		936918e3,
		2847714899,
		3736837829,
		1202900863,
		817233897,
		3183342108,
		3401237130,
		1404277552,
		615818150,
		3134207493,
		3453421203,
		1423857449,
		601450431,
		3009837614,
		3294710456,
		1567103746,
		711928724,
		3020668471,
		3272380065,
		1510334235,
		755167117
	];
	if (typeof Int32Array !== "undefined") CRC_TABLE = new Int32Array(CRC_TABLE);
	function ensureBuffer(input) {
		if (Buffer$2.isBuffer(input)) return input;
		var hasNewBufferAPI = typeof Buffer$2.alloc === "function" && typeof Buffer$2.from === "function";
		if (typeof input === "number") return hasNewBufferAPI ? Buffer$2.alloc(input) : new Buffer$2(input);
		else if (typeof input === "string") return hasNewBufferAPI ? Buffer$2.from(input) : new Buffer$2(input);
		else throw new Error("input must be buffer, number, or string, received " + typeof input);
	}
	function bufferizeInt(num) {
		var tmp = ensureBuffer(4);
		tmp.writeInt32BE(num, 0);
		return tmp;
	}
	function _crc32(buf, previous) {
		buf = ensureBuffer(buf);
		if (Buffer$2.isBuffer(previous)) previous = previous.readUInt32BE(0);
		var crc = ~~previous ^ -1;
		for (var n = 0; n < buf.length; n++) crc = CRC_TABLE[(crc ^ buf[n]) & 255] ^ crc >>> 8;
		return crc ^ -1;
	}
	function crc32() {
		return bufferizeInt(_crc32.apply(null, arguments));
	}
	crc32.signed = function() {
		return _crc32.apply(null, arguments);
	};
	crc32.unsigned = function() {
		return _crc32.apply(null, arguments) >>> 0;
	};
	module.exports = crc32;
}));
//#endregion
//#region extension/node_modules/yauzl/index.js
var require_yauzl = /* @__PURE__ */ __commonJSMin(((exports) => {
	var fs$1 = require("fs");
	var zlib = require("zlib");
	var fd_slicer = require_fd_slicer();
	var crc32 = require_buffer_crc32();
	var util$1 = require("util");
	var EventEmitter$1 = require("events").EventEmitter;
	var Transform = require("stream").Transform;
	var PassThrough = require("stream").PassThrough;
	var Writable = require("stream").Writable;
	exports.open = open;
	exports.fromFd = fromFd;
	exports.fromBuffer = fromBuffer;
	exports.fromRandomAccessReader = fromRandomAccessReader;
	exports.dosDateTimeToDate = dosDateTimeToDate;
	exports.validateFileName = validateFileName;
	exports.ZipFile = ZipFile;
	exports.Entry = Entry;
	exports.RandomAccessReader = RandomAccessReader;
	function open(path, options, callback) {
		if (typeof options === "function") {
			callback = options;
			options = null;
		}
		if (options == null) options = {};
		if (options.autoClose == null) options.autoClose = true;
		if (options.lazyEntries == null) options.lazyEntries = false;
		if (options.decodeStrings == null) options.decodeStrings = true;
		if (options.validateEntrySizes == null) options.validateEntrySizes = true;
		if (options.strictFileNames == null) options.strictFileNames = false;
		if (callback == null) callback = defaultCallback;
		fs$1.open(path, "r", function(err, fd) {
			if (err) return callback(err);
			fromFd(fd, options, function(err, zipfile) {
				if (err) fs$1.close(fd, defaultCallback);
				callback(err, zipfile);
			});
		});
	}
	function fromFd(fd, options, callback) {
		if (typeof options === "function") {
			callback = options;
			options = null;
		}
		if (options == null) options = {};
		if (options.autoClose == null) options.autoClose = false;
		if (options.lazyEntries == null) options.lazyEntries = false;
		if (options.decodeStrings == null) options.decodeStrings = true;
		if (options.validateEntrySizes == null) options.validateEntrySizes = true;
		if (options.strictFileNames == null) options.strictFileNames = false;
		if (callback == null) callback = defaultCallback;
		fs$1.fstat(fd, function(err, stats) {
			if (err) return callback(err);
			fromRandomAccessReader(fd_slicer.createFromFd(fd, { autoClose: true }), stats.size, options, callback);
		});
	}
	function fromBuffer(buffer, options, callback) {
		if (typeof options === "function") {
			callback = options;
			options = null;
		}
		if (options == null) options = {};
		options.autoClose = false;
		if (options.lazyEntries == null) options.lazyEntries = false;
		if (options.decodeStrings == null) options.decodeStrings = true;
		if (options.validateEntrySizes == null) options.validateEntrySizes = true;
		if (options.strictFileNames == null) options.strictFileNames = false;
		fromRandomAccessReader(fd_slicer.createFromBuffer(buffer, { maxChunkSize: 65536 }), buffer.length, options, callback);
	}
	function fromRandomAccessReader(reader, totalSize, options, callback) {
		if (typeof options === "function") {
			callback = options;
			options = null;
		}
		if (options == null) options = {};
		if (options.autoClose == null) options.autoClose = true;
		if (options.lazyEntries == null) options.lazyEntries = false;
		if (options.decodeStrings == null) options.decodeStrings = true;
		var decodeStrings = !!options.decodeStrings;
		if (options.validateEntrySizes == null) options.validateEntrySizes = true;
		if (options.strictFileNames == null) options.strictFileNames = false;
		if (callback == null) callback = defaultCallback;
		if (typeof totalSize !== "number") throw new Error("expected totalSize parameter to be a number");
		if (totalSize > Number.MAX_SAFE_INTEGER) throw new Error("zip file too large. only file sizes up to 2^52 are supported due to JavaScript's Number type being an IEEE 754 double.");
		reader.ref();
		var eocdrWithoutCommentSize = 22;
		var bufferSize = Math.min(eocdrWithoutCommentSize + 65535, totalSize);
		var buffer = newBuffer(bufferSize);
		var bufferReadStart = totalSize - buffer.length;
		readAndAssertNoEof(reader, buffer, 0, bufferSize, bufferReadStart, function(err) {
			if (err) return callback(err);
			for (var i = bufferSize - eocdrWithoutCommentSize; i >= 0; i -= 1) {
				if (buffer.readUInt32LE(i) !== 101010256) continue;
				var eocdrBuffer = buffer.slice(i);
				var diskNumber = eocdrBuffer.readUInt16LE(4);
				if (diskNumber !== 0) return callback(/* @__PURE__ */ new Error("multi-disk zip files are not supported: found disk number: " + diskNumber));
				var entryCount = eocdrBuffer.readUInt16LE(10);
				var centralDirectoryOffset = eocdrBuffer.readUInt32LE(16);
				var commentLength = eocdrBuffer.readUInt16LE(20);
				var expectedCommentLength = eocdrBuffer.length - eocdrWithoutCommentSize;
				if (commentLength !== expectedCommentLength) return callback(/* @__PURE__ */ new Error("invalid comment length. expected: " + expectedCommentLength + ". found: " + commentLength));
				var comment = decodeStrings ? decodeBuffer(eocdrBuffer, 22, eocdrBuffer.length, false) : eocdrBuffer.slice(22);
				if (!(entryCount === 65535 || centralDirectoryOffset === 4294967295)) return callback(null, new ZipFile(reader, centralDirectoryOffset, totalSize, entryCount, comment, options.autoClose, options.lazyEntries, decodeStrings, options.validateEntrySizes, options.strictFileNames));
				var zip64EocdlBuffer = newBuffer(20);
				var zip64EocdlOffset = bufferReadStart + i - zip64EocdlBuffer.length;
				readAndAssertNoEof(reader, zip64EocdlBuffer, 0, zip64EocdlBuffer.length, zip64EocdlOffset, function(err) {
					if (err) return callback(err);
					if (zip64EocdlBuffer.readUInt32LE(0) !== 117853008) return callback(/* @__PURE__ */ new Error("invalid zip64 end of central directory locator signature"));
					var zip64EocdrOffset = readUInt64LE(zip64EocdlBuffer, 8);
					var zip64EocdrBuffer = newBuffer(56);
					readAndAssertNoEof(reader, zip64EocdrBuffer, 0, zip64EocdrBuffer.length, zip64EocdrOffset, function(err) {
						if (err) return callback(err);
						if (zip64EocdrBuffer.readUInt32LE(0) !== 101075792) return callback(/* @__PURE__ */ new Error("invalid zip64 end of central directory record signature"));
						entryCount = readUInt64LE(zip64EocdrBuffer, 32);
						centralDirectoryOffset = readUInt64LE(zip64EocdrBuffer, 48);
						return callback(null, new ZipFile(reader, centralDirectoryOffset, totalSize, entryCount, comment, options.autoClose, options.lazyEntries, decodeStrings, options.validateEntrySizes, options.strictFileNames));
					});
				});
				return;
			}
			callback(/* @__PURE__ */ new Error("end of central directory record signature not found"));
		});
	}
	util$1.inherits(ZipFile, EventEmitter$1);
	function ZipFile(reader, centralDirectoryOffset, fileSize, entryCount, comment, autoClose, lazyEntries, decodeStrings, validateEntrySizes, strictFileNames) {
		var self = this;
		EventEmitter$1.call(self);
		self.reader = reader;
		self.reader.on("error", function(err) {
			emitError(self, err);
		});
		self.reader.once("close", function() {
			self.emit("close");
		});
		self.readEntryCursor = centralDirectoryOffset;
		self.fileSize = fileSize;
		self.entryCount = entryCount;
		self.comment = comment;
		self.entriesRead = 0;
		self.autoClose = !!autoClose;
		self.lazyEntries = !!lazyEntries;
		self.decodeStrings = !!decodeStrings;
		self.validateEntrySizes = !!validateEntrySizes;
		self.strictFileNames = !!strictFileNames;
		self.isOpen = true;
		self.emittedError = false;
		if (!self.lazyEntries) self._readEntry();
	}
	ZipFile.prototype.close = function() {
		if (!this.isOpen) return;
		this.isOpen = false;
		this.reader.unref();
	};
	function emitErrorAndAutoClose(self, err) {
		if (self.autoClose) self.close();
		emitError(self, err);
	}
	function emitError(self, err) {
		if (self.emittedError) return;
		self.emittedError = true;
		self.emit("error", err);
	}
	ZipFile.prototype.readEntry = function() {
		if (!this.lazyEntries) throw new Error("readEntry() called without lazyEntries:true");
		this._readEntry();
	};
	ZipFile.prototype._readEntry = function() {
		var self = this;
		if (self.entryCount === self.entriesRead) {
			setImmediate(function() {
				if (self.autoClose) self.close();
				if (self.emittedError) return;
				self.emit("end");
			});
			return;
		}
		if (self.emittedError) return;
		var buffer = newBuffer(46);
		readAndAssertNoEof(self.reader, buffer, 0, buffer.length, self.readEntryCursor, function(err) {
			if (err) return emitErrorAndAutoClose(self, err);
			if (self.emittedError) return;
			var entry = new Entry();
			var signature = buffer.readUInt32LE(0);
			if (signature !== 33639248) return emitErrorAndAutoClose(self, /* @__PURE__ */ new Error("invalid central directory file header signature: 0x" + signature.toString(16)));
			entry.versionMadeBy = buffer.readUInt16LE(4);
			entry.versionNeededToExtract = buffer.readUInt16LE(6);
			entry.generalPurposeBitFlag = buffer.readUInt16LE(8);
			entry.compressionMethod = buffer.readUInt16LE(10);
			entry.lastModFileTime = buffer.readUInt16LE(12);
			entry.lastModFileDate = buffer.readUInt16LE(14);
			entry.crc32 = buffer.readUInt32LE(16);
			entry.compressedSize = buffer.readUInt32LE(20);
			entry.uncompressedSize = buffer.readUInt32LE(24);
			entry.fileNameLength = buffer.readUInt16LE(28);
			entry.extraFieldLength = buffer.readUInt16LE(30);
			entry.fileCommentLength = buffer.readUInt16LE(32);
			entry.internalFileAttributes = buffer.readUInt16LE(36);
			entry.externalFileAttributes = buffer.readUInt32LE(38);
			entry.relativeOffsetOfLocalHeader = buffer.readUInt32LE(42);
			if (entry.generalPurposeBitFlag & 64) return emitErrorAndAutoClose(self, /* @__PURE__ */ new Error("strong encryption is not supported"));
			self.readEntryCursor += 46;
			buffer = newBuffer(entry.fileNameLength + entry.extraFieldLength + entry.fileCommentLength);
			readAndAssertNoEof(self.reader, buffer, 0, buffer.length, self.readEntryCursor, function(err) {
				if (err) return emitErrorAndAutoClose(self, err);
				if (self.emittedError) return;
				var isUtf8 = (entry.generalPurposeBitFlag & 2048) !== 0;
				entry.fileName = self.decodeStrings ? decodeBuffer(buffer, 0, entry.fileNameLength, isUtf8) : buffer.slice(0, entry.fileNameLength);
				var fileCommentStart = entry.fileNameLength + entry.extraFieldLength;
				var extraFieldBuffer = buffer.slice(entry.fileNameLength, fileCommentStart);
				entry.extraFields = [];
				var i = 0;
				while (i < extraFieldBuffer.length - 3) {
					var headerId = extraFieldBuffer.readUInt16LE(i + 0);
					var dataSize = extraFieldBuffer.readUInt16LE(i + 2);
					var dataStart = i + 4;
					var dataEnd = dataStart + dataSize;
					if (dataEnd > extraFieldBuffer.length) return emitErrorAndAutoClose(self, /* @__PURE__ */ new Error("extra field length exceeds extra field buffer size"));
					var dataBuffer = newBuffer(dataSize);
					extraFieldBuffer.copy(dataBuffer, 0, dataStart, dataEnd);
					entry.extraFields.push({
						id: headerId,
						data: dataBuffer
					});
					i = dataEnd;
				}
				entry.fileComment = self.decodeStrings ? decodeBuffer(buffer, fileCommentStart, fileCommentStart + entry.fileCommentLength, isUtf8) : buffer.slice(fileCommentStart, fileCommentStart + entry.fileCommentLength);
				entry.comment = entry.fileComment;
				self.readEntryCursor += buffer.length;
				self.entriesRead += 1;
				if (entry.uncompressedSize === 4294967295 || entry.compressedSize === 4294967295 || entry.relativeOffsetOfLocalHeader === 4294967295) {
					var zip64EiefBuffer = null;
					for (var i = 0; i < entry.extraFields.length; i++) {
						var extraField = entry.extraFields[i];
						if (extraField.id === 1) {
							zip64EiefBuffer = extraField.data;
							break;
						}
					}
					if (zip64EiefBuffer == null) return emitErrorAndAutoClose(self, /* @__PURE__ */ new Error("expected zip64 extended information extra field"));
					var index = 0;
					if (entry.uncompressedSize === 4294967295) {
						if (index + 8 > zip64EiefBuffer.length) return emitErrorAndAutoClose(self, /* @__PURE__ */ new Error("zip64 extended information extra field does not include uncompressed size"));
						entry.uncompressedSize = readUInt64LE(zip64EiefBuffer, index);
						index += 8;
					}
					if (entry.compressedSize === 4294967295) {
						if (index + 8 > zip64EiefBuffer.length) return emitErrorAndAutoClose(self, /* @__PURE__ */ new Error("zip64 extended information extra field does not include compressed size"));
						entry.compressedSize = readUInt64LE(zip64EiefBuffer, index);
						index += 8;
					}
					if (entry.relativeOffsetOfLocalHeader === 4294967295) {
						if (index + 8 > zip64EiefBuffer.length) return emitErrorAndAutoClose(self, /* @__PURE__ */ new Error("zip64 extended information extra field does not include relative header offset"));
						entry.relativeOffsetOfLocalHeader = readUInt64LE(zip64EiefBuffer, index);
						index += 8;
					}
				}
				if (self.decodeStrings) for (var i = 0; i < entry.extraFields.length; i++) {
					var extraField = entry.extraFields[i];
					if (extraField.id === 28789) {
						if (extraField.data.length < 6) continue;
						if (extraField.data.readUInt8(0) !== 1) continue;
						var oldNameCrc32 = extraField.data.readUInt32LE(1);
						if (crc32.unsigned(buffer.slice(0, entry.fileNameLength)) !== oldNameCrc32) continue;
						entry.fileName = decodeBuffer(extraField.data, 5, extraField.data.length, true);
						break;
					}
				}
				if (self.validateEntrySizes && entry.compressionMethod === 0) {
					var expectedCompressedSize = entry.uncompressedSize;
					if (entry.isEncrypted()) expectedCompressedSize += 12;
					if (entry.compressedSize !== expectedCompressedSize) {
						var msg = "compressed/uncompressed size mismatch for stored file: " + entry.compressedSize + " != " + entry.uncompressedSize;
						return emitErrorAndAutoClose(self, new Error(msg));
					}
				}
				if (self.decodeStrings) {
					if (!self.strictFileNames) entry.fileName = entry.fileName.replace(/\\/g, "/");
					var errorMessage = validateFileName(entry.fileName, self.validateFileNameOptions);
					if (errorMessage != null) return emitErrorAndAutoClose(self, new Error(errorMessage));
				}
				self.emit("entry", entry);
				if (!self.lazyEntries) self._readEntry();
			});
		});
	};
	ZipFile.prototype.openReadStream = function(entry, options, callback) {
		var self = this;
		var relativeStart = 0;
		var relativeEnd = entry.compressedSize;
		if (callback == null) {
			callback = options;
			options = {};
		} else {
			if (options.decrypt != null) {
				if (!entry.isEncrypted()) throw new Error("options.decrypt can only be specified for encrypted entries");
				if (options.decrypt !== false) throw new Error("invalid options.decrypt value: " + options.decrypt);
				if (entry.isCompressed()) {
					if (options.decompress !== false) throw new Error("entry is encrypted and compressed, and options.decompress !== false");
				}
			}
			if (options.decompress != null) {
				if (!entry.isCompressed()) throw new Error("options.decompress can only be specified for compressed entries");
				if (!(options.decompress === false || options.decompress === true)) throw new Error("invalid options.decompress value: " + options.decompress);
			}
			if (options.start != null || options.end != null) {
				if (entry.isCompressed() && options.decompress !== false) throw new Error("start/end range not allowed for compressed entry without options.decompress === false");
				if (entry.isEncrypted() && options.decrypt !== false) throw new Error("start/end range not allowed for encrypted entry without options.decrypt === false");
			}
			if (options.start != null) {
				relativeStart = options.start;
				if (relativeStart < 0) throw new Error("options.start < 0");
				if (relativeStart > entry.compressedSize) throw new Error("options.start > entry.compressedSize");
			}
			if (options.end != null) {
				relativeEnd = options.end;
				if (relativeEnd < 0) throw new Error("options.end < 0");
				if (relativeEnd > entry.compressedSize) throw new Error("options.end > entry.compressedSize");
				if (relativeEnd < relativeStart) throw new Error("options.end < options.start");
			}
		}
		if (!self.isOpen) return callback(/* @__PURE__ */ new Error("closed"));
		if (entry.isEncrypted()) {
			if (options.decrypt !== false) return callback(/* @__PURE__ */ new Error("entry is encrypted, and options.decrypt !== false"));
		}
		self.reader.ref();
		var buffer = newBuffer(30);
		readAndAssertNoEof(self.reader, buffer, 0, buffer.length, entry.relativeOffsetOfLocalHeader, function(err) {
			try {
				if (err) return callback(err);
				var signature = buffer.readUInt32LE(0);
				if (signature !== 67324752) return callback(/* @__PURE__ */ new Error("invalid local file header signature: 0x" + signature.toString(16)));
				var fileNameLength = buffer.readUInt16LE(26);
				var extraFieldLength = buffer.readUInt16LE(28);
				var localFileHeaderEnd = entry.relativeOffsetOfLocalHeader + buffer.length + fileNameLength + extraFieldLength;
				var decompress;
				if (entry.compressionMethod === 0) decompress = false;
				else if (entry.compressionMethod === 8) decompress = options.decompress != null ? options.decompress : true;
				else return callback(/* @__PURE__ */ new Error("unsupported compression method: " + entry.compressionMethod));
				var fileDataStart = localFileHeaderEnd;
				var fileDataEnd = fileDataStart + entry.compressedSize;
				if (entry.compressedSize !== 0) {
					if (fileDataEnd > self.fileSize) return callback(/* @__PURE__ */ new Error("file data overflows file bounds: " + fileDataStart + " + " + entry.compressedSize + " > " + self.fileSize));
				}
				var readStream = self.reader.createReadStream({
					start: fileDataStart + relativeStart,
					end: fileDataStart + relativeEnd
				});
				var endpointStream = readStream;
				if (decompress) {
					var destroyed = false;
					var inflateFilter = zlib.createInflateRaw();
					readStream.on("error", function(err) {
						setImmediate(function() {
							if (!destroyed) inflateFilter.emit("error", err);
						});
					});
					readStream.pipe(inflateFilter);
					if (self.validateEntrySizes) {
						endpointStream = new AssertByteCountStream(entry.uncompressedSize);
						inflateFilter.on("error", function(err) {
							setImmediate(function() {
								if (!destroyed) endpointStream.emit("error", err);
							});
						});
						inflateFilter.pipe(endpointStream);
					} else endpointStream = inflateFilter;
					endpointStream.destroy = function() {
						destroyed = true;
						if (inflateFilter !== endpointStream) inflateFilter.unpipe(endpointStream);
						readStream.unpipe(inflateFilter);
						readStream.destroy();
					};
				}
				callback(null, endpointStream);
			} finally {
				self.reader.unref();
			}
		});
	};
	function Entry() {}
	Entry.prototype.getLastModDate = function() {
		return dosDateTimeToDate(this.lastModFileDate, this.lastModFileTime);
	};
	Entry.prototype.isEncrypted = function() {
		return (this.generalPurposeBitFlag & 1) !== 0;
	};
	Entry.prototype.isCompressed = function() {
		return this.compressionMethod === 8;
	};
	function dosDateTimeToDate(date, time) {
		var day = date & 31;
		var month = (date >> 5 & 15) - 1;
		var year = (date >> 9 & 127) + 1980;
		var millisecond = 0;
		var second = (time & 31) * 2;
		var minute = time >> 5 & 63;
		var hour = time >> 11 & 31;
		return new Date(year, month, day, hour, minute, second, millisecond);
	}
	function validateFileName(fileName) {
		if (fileName.indexOf("\\") !== -1) return "invalid characters in fileName: " + fileName;
		if (/^[a-zA-Z]:/.test(fileName) || /^\//.test(fileName)) return "absolute path: " + fileName;
		if (fileName.split("/").indexOf("..") !== -1) return "invalid relative path: " + fileName;
		return null;
	}
	function readAndAssertNoEof(reader, buffer, offset, length, position, callback) {
		if (length === 0) return setImmediate(function() {
			callback(null, newBuffer(0));
		});
		reader.read(buffer, offset, length, position, function(err, bytesRead) {
			if (err) return callback(err);
			if (bytesRead < length) return callback(/* @__PURE__ */ new Error("unexpected EOF"));
			callback();
		});
	}
	util$1.inherits(AssertByteCountStream, Transform);
	function AssertByteCountStream(byteCount) {
		Transform.call(this);
		this.actualByteCount = 0;
		this.expectedByteCount = byteCount;
	}
	AssertByteCountStream.prototype._transform = function(chunk, encoding, cb) {
		this.actualByteCount += chunk.length;
		if (this.actualByteCount > this.expectedByteCount) {
			var msg = "too many bytes in the stream. expected " + this.expectedByteCount + ". got at least " + this.actualByteCount;
			return cb(new Error(msg));
		}
		cb(null, chunk);
	};
	AssertByteCountStream.prototype._flush = function(cb) {
		if (this.actualByteCount < this.expectedByteCount) {
			var msg = "not enough bytes in the stream. expected " + this.expectedByteCount + ". got only " + this.actualByteCount;
			return cb(new Error(msg));
		}
		cb();
	};
	util$1.inherits(RandomAccessReader, EventEmitter$1);
	function RandomAccessReader() {
		EventEmitter$1.call(this);
		this.refCount = 0;
	}
	RandomAccessReader.prototype.ref = function() {
		this.refCount += 1;
	};
	RandomAccessReader.prototype.unref = function() {
		var self = this;
		self.refCount -= 1;
		if (self.refCount > 0) return;
		if (self.refCount < 0) throw new Error("invalid unref");
		self.close(onCloseDone);
		function onCloseDone(err) {
			if (err) return self.emit("error", err);
			self.emit("close");
		}
	};
	RandomAccessReader.prototype.createReadStream = function(options) {
		var start = options.start;
		var end = options.end;
		if (start === end) {
			var emptyStream = new PassThrough();
			setImmediate(function() {
				emptyStream.end();
			});
			return emptyStream;
		}
		var stream = this._readStreamForRange(start, end);
		var destroyed = false;
		var refUnrefFilter = new RefUnrefFilter(this);
		stream.on("error", function(err) {
			setImmediate(function() {
				if (!destroyed) refUnrefFilter.emit("error", err);
			});
		});
		refUnrefFilter.destroy = function() {
			stream.unpipe(refUnrefFilter);
			refUnrefFilter.unref();
			stream.destroy();
		};
		var byteCounter = new AssertByteCountStream(end - start);
		refUnrefFilter.on("error", function(err) {
			setImmediate(function() {
				if (!destroyed) byteCounter.emit("error", err);
			});
		});
		byteCounter.destroy = function() {
			destroyed = true;
			refUnrefFilter.unpipe(byteCounter);
			refUnrefFilter.destroy();
		};
		return stream.pipe(refUnrefFilter).pipe(byteCounter);
	};
	RandomAccessReader.prototype._readStreamForRange = function(start, end) {
		throw new Error("not implemented");
	};
	RandomAccessReader.prototype.read = function(buffer, offset, length, position, callback) {
		var readStream = this.createReadStream({
			start: position,
			end: position + length
		});
		var writeStream = new Writable();
		var written = 0;
		writeStream._write = function(chunk, encoding, cb) {
			chunk.copy(buffer, offset + written, 0, chunk.length);
			written += chunk.length;
			cb();
		};
		writeStream.on("finish", callback);
		readStream.on("error", function(error) {
			callback(error);
		});
		readStream.pipe(writeStream);
	};
	RandomAccessReader.prototype.close = function(callback) {
		setImmediate(callback);
	};
	util$1.inherits(RefUnrefFilter, PassThrough);
	function RefUnrefFilter(context) {
		PassThrough.call(this);
		this.context = context;
		this.context.ref();
		this.unreffedYet = false;
	}
	RefUnrefFilter.prototype._flush = function(cb) {
		this.unref();
		cb();
	};
	RefUnrefFilter.prototype.unref = function(cb) {
		if (this.unreffedYet) return;
		this.unreffedYet = true;
		this.context.unref();
	};
	var cp437 = "\0☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄↕‼¶§▬↨↑↓→←∟↔▲▼ !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~⌂ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■\xA0";
	function decodeBuffer(buffer, start, end, isUtf8) {
		if (isUtf8) return buffer.toString("utf8", start, end);
		else {
			var result = "";
			for (var i = start; i < end; i++) result += cp437[buffer[i]];
			return result;
		}
	}
	function readUInt64LE(buffer, offset) {
		var lower32 = buffer.readUInt32LE(offset);
		return buffer.readUInt32LE(offset + 4) * 4294967296 + lower32;
	}
	var newBuffer;
	if (typeof Buffer.allocUnsafe === "function") newBuffer = function(len) {
		return Buffer.allocUnsafe(len);
	};
	else newBuffer = function(len) {
		return new Buffer(len);
	};
	function defaultCallback(err) {
		if (err) throw err;
	}
}));
//#endregion
//#region extension/node_modules/decompress-unzip/index.js
var require_decompress_unzip = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var fileType = require_file_type();
	var getStream = require_get_stream();
	var pify = require_pify$1();
	var yauzl = require_yauzl();
	var getType = (entry, mode) => {
		const IFMT = 61440;
		const IFDIR = 16384;
		const IFLNK = 40960;
		const madeBy = entry.versionMadeBy >> 8;
		if ((mode & IFMT) === IFLNK) return "symlink";
		if ((mode & IFMT) === IFDIR || madeBy === 0 && entry.externalFileAttributes === 16) return "directory";
		return "file";
	};
	var extractEntry = (entry, zip) => {
		const file = {
			mode: entry.externalFileAttributes >> 16 & 65535,
			mtime: entry.getLastModDate(),
			path: entry.fileName
		};
		file.type = getType(entry, file.mode);
		if (file.mode === 0 && file.type === "directory") file.mode = 493;
		if (file.mode === 0) file.mode = 420;
		return pify(zip.openReadStream.bind(zip))(entry).then(getStream.buffer).then((buf) => {
			file.data = buf;
			if (file.type === "symlink") file.linkname = buf.toString();
			return file;
		}).catch((err) => {
			zip.close();
			throw err;
		});
	};
	var extractFile = (zip) => new Promise((resolve, reject) => {
		const files = [];
		zip.readEntry();
		zip.on("entry", (entry) => {
			extractEntry(entry, zip).catch(reject).then((file) => {
				files.push(file);
				zip.readEntry();
			});
		});
		zip.on("error", reject);
		zip.on("end", () => resolve(files));
	});
	module.exports = () => (buf) => {
		if (!Buffer.isBuffer(buf)) return Promise.reject(/* @__PURE__ */ new TypeError(`Expected a Buffer, got ${typeof buf}`));
		if (!fileType(buf) || fileType(buf).ext !== "zip") return Promise.resolve([]);
		return pify(yauzl.fromBuffer)(buf, { lazyEntries: true }).then(extractFile);
	};
}));
//#endregion
//#region extension/node_modules/make-dir/node_modules/pify/index.js
var require_pify = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var processFn = (fn, opts) => function() {
		const P = opts.promiseModule;
		const args = new Array(arguments.length);
		for (let i = 0; i < arguments.length; i++) args[i] = arguments[i];
		return new P((resolve, reject) => {
			if (opts.errorFirst) args.push(function(err, result) {
				if (opts.multiArgs) {
					const results = new Array(arguments.length - 1);
					for (let i = 1; i < arguments.length; i++) results[i - 1] = arguments[i];
					if (err) {
						results.unshift(err);
						reject(results);
					} else resolve(results);
				} else if (err) reject(err);
				else resolve(result);
			});
			else args.push(function(result) {
				if (opts.multiArgs) {
					const results = new Array(arguments.length - 1);
					for (let i = 0; i < arguments.length; i++) results[i] = arguments[i];
					resolve(results);
				} else resolve(result);
			});
			fn.apply(this, args);
		});
	};
	module.exports = (obj, opts) => {
		opts = Object.assign({
			exclude: [/.+(Sync|Stream)$/],
			errorFirst: true,
			promiseModule: Promise
		}, opts);
		const filter = (key) => {
			const match = (pattern) => typeof pattern === "string" ? key === pattern : pattern.test(key);
			return opts.include ? opts.include.some(match) : !opts.exclude.some(match);
		};
		let ret;
		if (typeof obj === "function") ret = function() {
			if (opts.excludeMain) return obj.apply(this, arguments);
			return processFn(obj, opts).apply(this, arguments);
		};
		else ret = Object.create(Object.getPrototypeOf(obj));
		for (const key in obj) {
			const x = obj[key];
			ret[key] = typeof x === "function" && filter(key) ? processFn(x, opts) : x;
		}
		return ret;
	};
}));
//#endregion
//#region extension/node_modules/make-dir/index.js
var require_make_dir = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var fs = require("fs");
	var path$3 = require("path");
	var pify = require_pify();
	var defaults = {
		mode: 511 & ~process.umask(),
		fs
	};
	var checkPath = (pth) => {
		if (process.platform === "win32") {
			if (/[<>:"|?*]/.test(pth.replace(path$3.parse(pth).root, ""))) {
				const err = /* @__PURE__ */ new Error(`Path contains invalid characters: ${pth}`);
				err.code = "EINVAL";
				throw err;
			}
		}
	};
	module.exports = (input, opts) => Promise.resolve().then(() => {
		checkPath(input);
		opts = Object.assign({}, defaults, opts);
		const mkdir = pify(opts.fs.mkdir);
		const stat = pify(opts.fs.stat);
		const make = (pth) => {
			return mkdir(pth, opts.mode).then(() => pth).catch((err) => {
				if (err.code === "ENOENT") {
					if (err.message.includes("null bytes") || path$3.dirname(pth) === pth) throw err;
					return make(path$3.dirname(pth)).then(() => make(pth));
				}
				return stat(pth).then((stats) => stats.isDirectory() ? pth : Promise.reject()).catch(() => {
					throw err;
				});
			});
		};
		return make(path$3.resolve(input));
	});
	module.exports.sync = (input, opts) => {
		checkPath(input);
		opts = Object.assign({}, defaults, opts);
		const make = (pth) => {
			try {
				opts.fs.mkdirSync(pth, opts.mode);
			} catch (err) {
				if (err.code === "ENOENT") {
					if (err.message.includes("null bytes") || path$3.dirname(pth) === pth) throw err;
					make(path$3.dirname(pth));
					return make(pth);
				}
				try {
					if (!opts.fs.statSync(pth).isDirectory()) throw new Error("The path is not a directory");
				} catch (_) {
					throw err;
				}
			}
			return pth;
		};
		return make(path$3.resolve(input));
	};
}));
//#endregion
//#region extension/node_modules/is-natural-number/index.jsnext.js
var index_jsnext_exports = /* @__PURE__ */ __exportAll({ default: () => isNaturalNumber });
/*!
* is-natural-number.js | MIT (c) Shinnosuke Watanabe
* https://github.com/shinnn/is-natural-number.js
*/
function isNaturalNumber(val, option) {
	if (option) {
		if (typeof option !== "object") throw new TypeError(String(option) + " is not an object. Expected an object that has boolean `includeZero` property.");
		if ("includeZero" in option) {
			if (typeof option.includeZero !== "boolean") throw new TypeError(String(option.includeZero) + " is neither true nor false. `includeZero` option must be a Boolean value.");
			if (option.includeZero && val === 0) return true;
		}
	}
	return Number.isSafeInteger(val) && val >= 1;
}
var init_index_jsnext = __esmMin((() => {}));
//#endregion
//#region extension/node_modules/strip-dirs/index.js
/*!
* strip-dirs | MIT (c) Shinnosuke Watanabe
* https://github.com/shinnn/node-strip-dirs
*/
var require_strip_dirs = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var path$2 = require("path");
	var util = require("util");
	var isNaturalNumber = (init_index_jsnext(), __toCommonJS(index_jsnext_exports));
	module.exports = function stripDirs(pathStr, count, option) {
		if (typeof pathStr !== "string") throw new TypeError(util.inspect(pathStr) + " is not a string. First argument to strip-dirs must be a path string.");
		if (path$2.posix.isAbsolute(pathStr) || path$2.win32.isAbsolute(pathStr)) throw new Error(`${pathStr} is an absolute path. strip-dirs requires a relative path.`);
		if (!isNaturalNumber(count, { includeZero: true })) throw new Error("The Second argument of strip-dirs must be a natural number or 0, but received " + util.inspect(count) + ".");
		if (option) {
			if (typeof option !== "object") throw new TypeError(util.inspect(option) + " is not an object. Expected an object with a boolean `disallowOverflow` property.");
			if (Array.isArray(option)) throw new TypeError(util.inspect(option) + " is an array. Expected an object with a boolean `disallowOverflow` property.");
			if ("disallowOverflow" in option && typeof option.disallowOverflow !== "boolean") throw new TypeError(util.inspect(option.disallowOverflow) + " is neither true nor false. `disallowOverflow` option must be a Boolean value.");
		} else option = { disallowOverflow: false };
		const pathComponents = path$2.normalize(pathStr).split(path$2.sep);
		if (pathComponents.length > 1 && pathComponents[0] === ".") pathComponents.shift();
		if (count > pathComponents.length - 1) {
			if (option.disallowOverflow) throw new RangeError("Cannot strip more directories than there are.");
			count = pathComponents.length - 1;
		}
		return path$2.join.apply(null, pathComponents.slice(count));
	};
}));
//#endregion
//#region extension/node_modules/@lynxhub/hwmonitor/dist/cli_downloader.js
var import_decompress = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports, module) => {
	var path$1 = require("path");
	var fs = require_graceful_fs();
	var decompressTar = require_decompress_tar();
	var decompressTarbz2 = require_decompress_tarbz2();
	var decompressTargz = require_decompress_targz();
	var decompressUnzip = require_decompress_unzip();
	var makeDir = require_make_dir();
	var pify = require_pify$1();
	var stripDirs = require_strip_dirs();
	var fsP = pify(fs);
	var runPlugins = (input, opts) => {
		if (opts.plugins.length === 0) return Promise.resolve([]);
		return Promise.all(opts.plugins.map((x) => x(input, opts))).then((files) => files.reduce((a, b) => a.concat(b)));
	};
	var safeMakeDir = (dir, realOutputPath) => {
		return fsP.realpath(dir).catch((_) => {
			return safeMakeDir(path$1.dirname(dir), realOutputPath);
		}).then((realParentPath) => {
			if (realParentPath.indexOf(realOutputPath) !== 0) throw /* @__PURE__ */ new Error("Refusing to create a directory outside the output path.");
			return makeDir(dir).then(fsP.realpath);
		});
	};
	var preventWritingThroughSymlink = (destination, realOutputPath) => {
		return fsP.readlink(destination).catch((_) => {
			return null;
		}).then((symlinkPointsTo) => {
			if (symlinkPointsTo) throw new Error("Refusing to write into a symlink");
			return realOutputPath;
		});
	};
	var extractFile = (input, output, opts) => runPlugins(input, opts).then((files) => {
		if (opts.strip > 0) files = files.map((x) => {
			x.path = stripDirs(x.path, opts.strip);
			return x;
		}).filter((x) => x.path !== ".");
		if (typeof opts.filter === "function") files = files.filter(opts.filter);
		if (typeof opts.map === "function") files = files.map(opts.map);
		if (!output) return files;
		return Promise.all(files.map((x) => {
			const dest = path$1.join(output, x.path);
			const mode = x.mode & ~process.umask();
			const now = /* @__PURE__ */ new Date();
			if (x.type === "directory") return makeDir(output).then((outputPath) => fsP.realpath(outputPath)).then((realOutputPath) => safeMakeDir(dest, realOutputPath)).then(() => fsP.utimes(dest, now, x.mtime)).then(() => x);
			return makeDir(output).then((outputPath) => fsP.realpath(outputPath)).then((realOutputPath) => {
				return safeMakeDir(path$1.dirname(dest), realOutputPath).then(() => realOutputPath);
			}).then((realOutputPath) => {
				if (x.type === "file") return preventWritingThroughSymlink(dest, realOutputPath);
				return realOutputPath;
			}).then((realOutputPath) => {
				return fsP.realpath(path$1.dirname(dest)).then((realDestinationDir) => {
					if (realDestinationDir.indexOf(realOutputPath) !== 0) throw /* @__PURE__ */ new Error("Refusing to write outside output directory: " + realDestinationDir);
				});
			}).then(() => {
				if (x.type === "link") return fsP.link(x.linkname, dest);
				if (x.type === "symlink" && process.platform === "win32") return fsP.link(x.linkname, dest);
				if (x.type === "symlink") return fsP.symlink(x.linkname, dest);
				return fsP.writeFile(dest, x.data, { mode });
			}).then(() => x.type === "file" && fsP.utimes(dest, now, x.mtime)).then(() => x);
		}));
	});
	module.exports = (input, output, opts) => {
		if (typeof input !== "string" && !Buffer.isBuffer(input)) return Promise.reject(/* @__PURE__ */ new TypeError("Input file required"));
		if (typeof output === "object") {
			opts = output;
			output = null;
		}
		opts = Object.assign({ plugins: [
			decompressTar(),
			decompressTarbz2(),
			decompressTargz(),
			decompressUnzip()
		] }, opts);
		return (typeof input === "string" ? fsP.readFile(input) : Promise.resolve(input)).then((buf) => extractFile(buf, output, opts));
	};
})))(), 1);
var logLevels = [
	"silent",
	"error",
	"warn",
	"info",
	"debug"
];
var createLogger = (logLevel) => (level, ...messages) => {
	if (logLevels.indexOf(logLevel) >= logLevels.indexOf(level)) {
		if (level === "error") console.error(...messages);
		else if (level === "warn") console.warn(...messages);
		else if (level !== "silent") console.log(...messages);
	}
};
/**
* Downloads a file from a given URL using Node.js https module.
* Handles redirects.
* @param url The URL to download from.
* @param outputPath The path to save the downloaded file.
* @param log The logger function.
* @param redirectCount The current redirect count (internal use).
* @returns A promise that resolves when the download is complete.
*/
function downloadFile(url, outputPath, log, redirectCount = 0) {
	return new Promise((resolve, reject) => {
		if (redirectCount > 5) {
			reject(/* @__PURE__ */ new Error("Too many redirects"));
			return;
		}
		const request = node_https.default.get(url, (response) => {
			if (response.statusCode === 301 || response.statusCode === 302 || response.statusCode === 307) {
				if (!response.headers.location) {
					reject(/* @__PURE__ */ new Error(`Redirect with no location header from ${url}`));
					return;
				}
				log("debug", `Redirecting to ${response.headers.location}`);
				response.resume();
				downloadFile(response.headers.location, outputPath, log, redirectCount + 1).then(resolve).catch(reject);
				return;
			}
			if (response.statusCode !== 200) {
				response.resume();
				reject(/* @__PURE__ */ new Error(`Failed to download file: ${response.statusCode} ${response.statusMessage} from ${url}`));
				return;
			}
			const fileStream = node_fs.default.createWriteStream(outputPath);
			response.pipe(fileStream);
			fileStream.on("finish", () => {
				fileStream.close(() => resolve());
			});
			fileStream.on("error", (err) => {
				node_fs.default.unlink(outputPath, () => {});
				reject(err);
			});
			response.on("error", (err) => {
				node_fs.default.unlink(outputPath, () => {});
				reject(err);
			});
		});
		request.on("error", (err) => {
			reject(err);
		});
		request.end();
	});
}
/**
* Fetches JSON data from a URL using Node.js https module.
* @param url The URL to fetch JSON from.
* @returns A promise that resolves with the parsed JSON data.
*/
function fetchJson(url) {
	return new Promise((resolve, reject) => {
		node_https.default.get(url, { headers: {
			Accept: "application/vnd.github.v3+json",
			"User-Agent": "Node.js-Downloader"
		} }, (response) => {
			if (response.statusCode !== 200) {
				reject(/* @__PURE__ */ new Error(`Failed to fetch JSON: ${response.statusCode} ${response.statusMessage} from ${url}`));
				response.resume();
				return;
			}
			let rawData = "";
			response.setEncoding("utf8");
			response.on("data", (chunk) => {
				rawData += chunk;
			});
			response.on("end", () => {
				try {
					resolve(JSON.parse(rawData));
				} catch (e) {
					reject(e);
				}
			});
		}).on("error", (err) => {
			reject(err);
		});
	});
}
/**
* Cleans up old versions of the CLI tool from the base directory.
* @param baseDir The base directory where different versions are stored.
* @param currentVersion The version string of the currently active CLI.
* @param cliName The base name of the CLI tool.
* @param log The logger function.
*/
async function cleanupOldVersions(baseDir, currentVersion, cliName, log) {
	try {
		const oldVersionDirs = (await node_fs_promises.default.readdir(baseDir, { withFileTypes: true })).filter((dirent) => dirent.isDirectory() && dirent.name.startsWith(`${cliName}-`) && dirent.name !== currentVersion);
		for (const dirent of oldVersionDirs) {
			const oldVersionPath = node_path.default.join(baseDir, dirent.name);
			log("debug", `Removing old version directory: ${oldVersionPath}`);
			await node_fs_promises.default.rm(oldVersionPath, {
				recursive: true,
				force: true
			});
		}
	} catch (error) {
		log("warn", `Could not clean up old versions in ${baseDir}:`, error.message);
	}
}
/**
* Downloads and extracts a CLI tool from the latest GitHub release.
* @param repoOwner The owner of the GitHub repository.
* @param repoName The name of the GitHub repository.
* @param cliName The base name of the CLI tool.
* @param baseDestinationDir The base directory for the CLI.
* @param log The logger function.
* @returns A promise that resolves to the path of the CLI tool's directory.
*/
async function downloadAndExtractLatestCli(repoOwner, repoName, cliName, baseDestinationDir, log) {
	log("info", `Starting setup for ${cliName} from ${repoOwner}/${repoName}...`);
	const platform = node_os.default.platform();
	const arch = node_os.default.arch();
	const osIdentifier = platform === "win32" ? "win" : platform === "darwin" ? "osx" : "linux";
	const archIdentifier = arch === "x64" ? "x64" : "arm64";
	log("debug", `Detected system: ${osIdentifier}-${archIdentifier}`);
	if (![
		"win",
		"osx",
		"linux"
	].includes(osIdentifier)) throw new Error(`Unsupported platform: ${platform}`);
	if (!["x64", "arm64"].includes(archIdentifier)) throw new Error(`Unsupported architecture: ${arch}`);
	const fallbackToLocalVersion = async () => {
		try {
			const versionDirs = (await node_fs_promises.default.readdir(baseDestinationDir, { withFileTypes: true })).filter((dirent) => dirent.isDirectory()).map((dirent) => dirent.name).sort((a, b) => b.localeCompare(a, void 0, {
				numeric: true,
				sensitivity: "base"
			}));
			if (versionDirs.length > 0) {
				const latestLocalVersion = versionDirs[0];
				const fallbackPath = node_path.default.join(baseDestinationDir, latestLocalVersion);
				log("info", `Found existing local version. Using latest available '${latestLocalVersion}' as a fallback.`);
				return fallbackPath;
			}
			log("error", `No local versions of ${cliName} found in ${baseDestinationDir}.`);
			throw new Error(`No local versions of ${cliName} are available.`);
		} catch (fsError) {
			if (fsError.code === "ENOENT") log("error", `Destination directory ${baseDestinationDir} does not exist.`);
			else log("error", "An unexpected error occurred while finding a local fallback:", fsError.message);
			throw new Error(`No local versions of ${cliName} are available.`, { cause: fsError });
		}
	};
	try {
		const releaseUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/releases/latest`;
		log("debug", `Fetching latest release info from: ${releaseUrl}`);
		const releaseData = await fetchJson(releaseUrl);
		log("debug", `Successfully fetched release: ${releaseData.tag_name}`);
		if (!releaseData?.assets?.length) throw new Error(`No assets found in the latest release for ${repoOwner}/${repoName}.`);
		const versionString = releaseData.tag_name;
		const finalExtractionPath = node_path.default.resolve(baseDestinationDir, versionString);
		try {
			await node_fs_promises.default.access(finalExtractionPath);
			log("info", `Latest version '${versionString}' already exists. Skipping download.`);
			await cleanupOldVersions(baseDestinationDir, versionString, cliName, log);
			return finalExtractionPath;
		} catch {
			log("info", `New version '${versionString}' not found locally. Proceeding with download.`);
		}
		const expectedAssetName = `${cliName}-${osIdentifier}-${archIdentifier}-${versionString}.zip`;
		const targetAsset = releaseData.assets.find((asset) => asset.name.toLowerCase() === expectedAssetName.toLowerCase());
		if (!targetAsset) throw new Error(`Could not find asset "${expectedAssetName}" in release ${versionString}.`);
		log("debug", `Found asset: ${targetAsset.name}`);
		const tempDownloadDir = await node_fs_promises.default.mkdtemp(node_path.default.join(node_os.default.tmpdir(), `${cliName}-download-`));
		const zipFilePath = node_path.default.join(tempDownloadDir, targetAsset.name);
		try {
			log("debug", `Downloading ${targetAsset.name} to ${zipFilePath}...`);
			await downloadFile(targetAsset.browser_download_url, zipFilePath, log);
			log("debug", `Extracting ${zipFilePath} to ${finalExtractionPath}...`);
			await node_fs_promises.default.mkdir(finalExtractionPath, { recursive: true });
			await (0, import_decompress.default)(zipFilePath, finalExtractionPath);
			log("debug", "Extraction complete.");
			await cleanupOldVersions(baseDestinationDir, versionString, cliName, log);
		} finally {
			await node_fs_promises.default.rm(tempDownloadDir, {
				recursive: true,
				force: true
			});
		}
		log("info", `${cliName} is ready at ${finalExtractionPath}`);
		return finalExtractionPath;
	} catch (error) {
		log("warn", "An error occurred during setup. Attempting to use a local version as fallback.", error.message);
		return await fallbackToLocalVersion();
	}
}
/**
* Downloads and extracts the latest version of the CLI tool.
* @param {string} targetDir - The base directory where the CLI tool should be saved.
* @param {LogLevel} [logLevel='info'] - The level of logging to use.
* @return {Promise<string>} A promise that resolves with the path to the executable.
*/
async function DownloadCli(targetDir, logLevel = "info") {
	const log = createLogger(logLevel);
	const repoOwner = "KindaBrazy";
	const repoName = "LynxHardwareCLI";
	const cliName = "LynxHardwareCLI";
	const cliBaseDir = node_path.default.join(targetDir, cliName);
	try {
		const extractedPath = await downloadAndExtractLatestCli(repoOwner, repoName, cliName, cliBaseDir, log);
		log("debug", `CLI tool is ready at: ${extractedPath}`);
		const executableName = node_os.default.platform() === "win32" ? `${cliName}.exe` : cliName;
		const executablePath = node_path.default.join(extractedPath, executableName);
		log("debug", `Executable should be at: ${executablePath}`);
		await node_fs_promises.default.access(executablePath, node_fs.default.constants.F_OK);
		log("debug", `Executable ${executablePath} verified.`);
		return executablePath;
	} catch (error) {
		log("error", "An error occurred during CLI download and setup:", error.message);
		throw error;
	}
}
//#endregion
//#region extension/node_modules/@lynxhub/hwmonitor/dist/index.js
var HardwareMonitor = class extends node_events.EventEmitter {
	executablePath = "";
	activeProcess = null;
	buffer = "";
	initialMessageSkipped = false;
	creationTimestamp;
	logLevel;
	constructor(logLevel = "info") {
		super();
		this.creationTimestamp = Date.now();
		this.logLevel = logLevel;
	}
	log(level, ...args) {
		const levels = [
			"silent",
			"error",
			"warn",
			"info",
			"debug"
		];
		if (levels.indexOf(this.logLevel) >= levels.indexOf(level) && level !== "silent") if (level === "error") console.error(...args);
		else if (level === "warn") console.warn(...args);
		else console.log(...args);
	}
	/**
	* Formats seconds into a human-readable string (e.g., "1d, 2h, 3m, 4s").
	* @param totalSeconds The total number of seconds.
	* @returns Formatted string.
	*/
	formatSeconds(totalSeconds) {
		const days = Math.floor(totalSeconds / (3600 * 24));
		totalSeconds %= 3600 * 24;
		const hours = Math.floor(totalSeconds / 3600);
		totalSeconds %= 3600;
		const minutes = Math.floor(totalSeconds / 60);
		const seconds = Math.floor(totalSeconds % 60);
		const parts = [];
		if (days > 0) parts.push(`${days}d`);
		if (hours > 0) parts.push(`${hours}h`);
		if (minutes > 0) parts.push(`${minutes}m`);
		if (seconds > 0 || parts.length === 0) parts.push(`${seconds}s`);
		return parts.join(", ");
	}
	/**
	* Builds arguments for the CLI executable.
	* @param mode - 'once' or 'timed'.
	* @param intervalMs - Interval for timed mode.
	* @param components - Specific components to monitor. 'uptime' is handled internally.
	* @returns Array of string arguments.
	*/
	buildArgs(mode, intervalMs, components) {
		const args = ["--mode", mode];
		const cliComponents = components?.filter((comp) => comp !== "uptime");
		if (mode === "timed" && intervalMs !== void 0) args.push("--interval", intervalMs.toString());
		if (cliComponents && cliComponents.length > 0) args.push("--components", cliComponents.join(","));
		return args;
	}
	/**
	* Checks for .NET 9 runtime and downloads the CLI tool.
	* @param targetDir - Directory to download the CLI tool.
	* @throws Error if .NET 9 is not found or download fails.
	*/
	async checkRequirements(targetDir) {
		if (!await checkDotNetRuntime9({
			warn: (...args) => this.log("warn", ...args),
			error: (...args) => this.log("error", ...args)
		})) throw new Error(".NET 10.0 runtime not found. Please install it from https://dotnet.microsoft.com/download/dotnet/10.0");
		this.executablePath = await DownloadCli(targetDir, this.logLevel);
		this.log("info", "✅ Lynx Hardware Monitor is ready to use.");
	}
	addUptimeDataIfNeeded(report, requestedComponents) {
		if (!requestedComponents || requestedComponents.length === 0 || requestedComponents.includes("uptime")) {
			const osUptimeSeconds = node_os.default.uptime();
			report.Uptime = {
				rawSeconds: osUptimeSeconds,
				formatted: this.formatSeconds(osUptimeSeconds)
			};
			const elapsedTimeSeconds = (Date.now() - this.creationTimestamp) / 1e3;
			report.ElapsedTime = {
				rawSeconds: elapsedTimeSeconds,
				formatted: this.formatSeconds(elapsedTimeSeconds)
			};
		}
	}
	/**
	* Retrieves hardware data once.
	* @param components - Optional array of components to monitor. Defaults to all (including uptime).
	* @param timeoutMs - Optional timeout in milliseconds. Defaults to 10000ms.
	* @returns A Promise resolving to the HardwareReport.
	*/
	getDataOnce(components, timeoutMs = 1e4) {
		return new Promise((resolve, reject) => {
			if (!this.executablePath) {
				const err = /* @__PURE__ */ new Error("Executable path not set. Call checkRequirements() first.");
				err.type = "spawn_error";
				return reject(err);
			}
			const args = this.buildArgs("once", void 0, components);
			let output = "";
			let errorOutput = "";
			let processKilled = false;
			const proc = (0, node_child_process.spawn)(this.executablePath, args);
			const timeoutHandle = setTimeout(() => {
				processKilled = true;
				proc.kill();
				const err = /* @__PURE__ */ new Error(`Hardware monitor 'getDataOnce' timed out after ${timeoutMs}ms.`);
				err.type = "timeout_error";
				reject(err);
			}, timeoutMs);
			proc.stdout.on("data", (data) => {
				output += data.toString();
			});
			proc.stderr.on("data", (data) => {
				errorOutput += data.toString();
			});
			proc.on("error", (err) => {
				if (processKilled) return;
				clearTimeout(timeoutHandle);
				const monitorError = /* @__PURE__ */ new Error(`Failed to start hardware monitor executable: ${err.message}`);
				monitorError.type = "spawn_error";
				monitorError.rawError = err;
				reject(monitorError);
			});
			proc.on("close", (code) => {
				if (processKilled) return;
				clearTimeout(timeoutHandle);
				if (code !== 0) {
					const err = /* @__PURE__ */ new Error(`Hardware monitor executable exited with code ${code}. Stderr: ${errorOutput.trim()}`);
					err.type = "process_error";
					err.stderrData = errorOutput;
					return reject(err);
				}
				try {
					const parsedReport = JSON.parse(output);
					let finalReport;
					const cliComponentsRequested = components?.filter((comp) => comp !== "uptime");
					if (!cliComponentsRequested || cliComponentsRequested.length === 0) finalReport = {
						Timestamp: parsedReport.Timestamp || (/* @__PURE__ */ new Date()).toISOString(),
						CPU: parsedReport.CPU || [],
						GPU: parsedReport.GPU || [],
						Memory: parsedReport.Memory || [],
						Motherboard: parsedReport.Motherboard || [],
						Storage: parsedReport.Storage || [],
						Network: parsedReport.Network || [],
						Battery: parsedReport.Battery || [],
						Controller: parsedReport.Controller || [],
						Psu: parsedReport.Psu || []
					};
					else finalReport = parsedReport;
					this.addUptimeDataIfNeeded(finalReport, components);
					resolve(finalReport);
				} catch (e) {
					const err = /* @__PURE__ */ new Error("Failed to parse JSON output from hardware monitor.");
					err.type = "json_parse_error";
					err.rawError = e;
					err.stderrData = output;
					reject(err);
				}
			});
		});
	}
	/**
	* Starts timed monitoring of hardware data.
	* Emits 'data' event with HardwareReport objects.
	* Emits 'error' event with MonitorError objects.
	* @param intervalMs - Interval in milliseconds for data updates.
	* @param components - Optional array of components to monitor. Defaults to all (including uptime).
	*/
	startTimed(intervalMs, components) {
		if (this.activeProcess) {
			this.emit("error", /* @__PURE__ */ new Error("Timed monitoring is already active. Call stopTimed() first."));
			return;
		}
		if (!this.executablePath) {
			const err = /* @__PURE__ */ new Error("Executable path not set. Call checkRequirements() first.");
			err.type = "spawn_error";
			this.emit("error", err);
			return;
		}
		const args = this.buildArgs("timed", intervalMs, components);
		this.buffer = "";
		this.initialMessageSkipped = false;
		this.activeProcess = (0, node_child_process.spawn)(this.executablePath, args);
		this.activeProcess.stdout?.on("data", (dataChunk) => {
			this.buffer += dataChunk.toString();
			if (!this.initialMessageSkipped) {
				const newlineIndex = this.buffer.indexOf("\r\n");
				if (newlineIndex !== -1) {
					if (!this.buffer.substring(0, newlineIndex).startsWith("{")) this.buffer = this.buffer.substring(newlineIndex + 2);
					this.initialMessageSkipped = true;
				} else if (this.buffer.length > 1024 && !this.buffer.includes("{")) this.initialMessageSkipped = true;
				else return;
			}
			if (!this.initialMessageSkipped) return;
			while (this.buffer.length > 0) {
				if (!this.buffer.startsWith("{")) {
					const nextJsonStartIndex = this.buffer.indexOf("{");
					if (nextJsonStartIndex !== -1) this.buffer = this.buffer.substring(nextJsonStartIndex);
					else {
						if (this.buffer.trim() === "") this.buffer = "";
						break;
					}
				}
				if (!this.buffer.startsWith("{")) break;
				let balance = 0;
				let jsonEndIndex = -1;
				let inString = false;
				let escapeNext = false;
				for (let i = 0; i < this.buffer.length; i++) {
					const char = this.buffer[i];
					if (escapeNext) {
						escapeNext = false;
						continue;
					}
					if (char === "\\") {
						escapeNext = true;
						continue;
					}
					if (char === "\"") inString = !inString;
					if (!inString) {
						if (char === "{") balance++;
						else if (char === "}") {
							balance--;
							if (balance === 0 && i > 0) {
								jsonEndIndex = i;
								break;
							} else if (balance < 0) {
								this.buffer = "";
								this.initialMessageSkipped = false;
								const err = /* @__PURE__ */ new Error("JSON braces unbalanced (too many closing). Resetting buffer.");
								err.type = "json_parse_error";
								this.emit("error", err);
								return;
							}
						}
					}
				}
				if (jsonEndIndex !== -1 && balance === 0) {
					const reportString = this.buffer.substring(0, jsonEndIndex + 1);
					let consumedLength = jsonEndIndex + 1;
					if (this.buffer.length > consumedLength && this.buffer[consumedLength] === "\r" && this.buffer.length > consumedLength + 1 && this.buffer[consumedLength + 1] === "\n") consumedLength += 2;
					else if (this.buffer.length > consumedLength && this.buffer[consumedLength] === "\n") consumedLength += 1;
					try {
						const parsedData = JSON.parse(reportString);
						if (typeof parsedData.Timestamp === "string") {
							let finalReport;
							const cliComponentsRequested = components?.filter((comp) => comp !== "uptime");
							if (!cliComponentsRequested || cliComponentsRequested.length === 0) finalReport = {
								Timestamp: parsedData.Timestamp,
								CPU: parsedData.CPU || [],
								GPU: parsedData.GPU || [],
								Memory: parsedData.Memory || [],
								Motherboard: parsedData.Motherboard || [],
								Storage: parsedData.Storage || [],
								Network: parsedData.Network || [],
								Battery: parsedData.Battery || [],
								Controller: parsedData.Controller || [],
								Psu: parsedData.Psu || []
							};
							else finalReport = parsedData;
							this.addUptimeDataIfNeeded(finalReport, components);
							this.emit("data", finalReport);
						} else {
							const err = /* @__PURE__ */ new Error(`Parsed JSON is not a valid HardwareReport. Snippet: ${reportString.substring(0, 100)}`);
							err.type = "json_parse_error";
							err.stderrData = reportString;
							this.emit("error", err);
						}
						this.buffer = this.buffer.substring(consumedLength);
					} catch (e) {
						const err = /* @__PURE__ */ new Error(`Failed to parse JSON (timed). Snippet: ${reportString.substring(0, 100)}`);
						err.type = "json_parse_error";
						err.rawError = e;
						err.stderrData = reportString;
						this.emit("error", err);
						this.buffer = this.buffer.substring(consumedLength);
						break;
					}
				} else break;
			}
		});
		this.activeProcess.stderr?.on("data", (data) => {
			const errorMessage = data.toString().trim();
			if (errorMessage) {
				const err = /* @__PURE__ */ new Error(`Error from hardware monitor process: ${errorMessage}`);
				err.type = "process_error";
				err.stderrData = errorMessage;
				this.emit("error", err);
			}
		});
		this.activeProcess.on("error", (err) => {
			const monitorError = /* @__PURE__ */ new Error(`Failed to start hardware monitor executable (timed): ${err.message}`);
			monitorError.type = "spawn_error";
			monitorError.rawError = err;
			this.emit("error", monitorError);
			this.activeProcess = null;
		});
		this.activeProcess.on("close", (code) => {
			if (this.activeProcess && !this.activeProcess.killed && code !== 0) {
				const message = `Hardware monitor executable (timed) exited unexpectedly with code ${code}.`;
				const err = new Error(message);
				err.type = "process_error";
				this.emit("error", err);
			}
			this.activeProcess = null;
			this.buffer = "";
			this.initialMessageSkipped = false;
		});
	}
	/**
	* Stops the currently active timed monitoring process.
	*/
	stopTimed() {
		if (this.activeProcess) {
			this.activeProcess.kill();
			this.log("debug", "HardwareMonitor: Timed monitoring stop signal sent.");
		} else this.log("debug", "HardwareMonitor: No active timed monitoring process to stop.");
	}
};
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
//#region node_modules/lodash-es/_getRawTag.js
/** Used for built-in method references. */
var objectProto$3 = Object.prototype;
/** Used to check objects for own properties. */
var hasOwnProperty$8 = objectProto$3.hasOwnProperty;
/**
* Used to resolve the
* [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
* of values.
*/
var nativeObjectToString$1 = objectProto$3.toString;
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
	var isOwn = hasOwnProperty$8.call(value, symToStringTag$1), tag = value[symToStringTag$1];
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
function isObject(value) {
	var type = typeof value;
	return value != null && (type == "object" || type == "function");
}
//#endregion
//#region node_modules/lodash-es/isFunction.js
/** `Object#toString` result references. */
var asyncTag = "[object AsyncFunction]", funcTag$1 = "[object Function]", genTag = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
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
	if (!isObject(value)) return false;
	var tag = baseGetTag(value);
	return tag == funcTag$1 || tag == genTag || tag == asyncTag || tag == proxyTag;
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
var funcToString$1 = Function.prototype.toString;
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
			return funcToString$1.call(func);
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
var funcProto = Function.prototype, objectProto$2 = Object.prototype;
/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;
/** Used to check objects for own properties. */
var hasOwnProperty$7 = objectProto$2.hasOwnProperty;
/** Used to detect if a method is native. */
var reIsNative = RegExp("^" + funcToString.call(hasOwnProperty$7).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
/**
* The base implementation of `_.isNative` without bad shim checks.
*
* @private
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a native function,
*  else `false`.
*/
function baseIsNative(value) {
	if (!isObject(value) || isMasked(value)) return false;
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
//#region node_modules/lodash-es/_Map.js
var Map$1 = getNative(root, "Map");
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
var hasOwnProperty$6 = Object.prototype.hasOwnProperty;
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
	return hasOwnProperty$6.call(data, key) ? data[key] : void 0;
}
//#endregion
//#region node_modules/lodash-es/_hashHas.js
/** Used to check objects for own properties. */
var hasOwnProperty$5 = Object.prototype.hasOwnProperty;
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
	return nativeCreate ? data[key] !== void 0 : hasOwnProperty$5.call(data, key);
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
var Uint8Array$1 = root.Uint8Array;
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
var boolTag$1 = "[object Boolean]", dateTag$1 = "[object Date]", errorTag$1 = "[object Error]", mapTag$2 = "[object Map]", numberTag$1 = "[object Number]", regexpTag$1 = "[object RegExp]", setTag$2 = "[object Set]", stringTag$1 = "[object String]", symbolTag = "[object Symbol]";
var arrayBufferTag$1 = "[object ArrayBuffer]", dataViewTag$2 = "[object DataView]";
/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol$1 ? Symbol$1.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
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
		case arrayBufferTag$1:
			if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array$1(object), new Uint8Array$1(other))) return false;
			return true;
		case boolTag$1:
		case dateTag$1:
		case numberTag$1: return eq(+object, +other);
		case errorTag$1: return object.name == other.name && object.message == other.message;
		case regexpTag$1:
		case stringTag$1: return object == other + "";
		case mapTag$2: var convert = mapToArray;
		case setTag$2:
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
		case symbolTag: if (symbolValueOf) return symbolValueOf.call(object) == symbolValueOf.call(other);
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
var propertyIsEnumerable$1 = Object.prototype.propertyIsEnumerable;
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
		return propertyIsEnumerable$1.call(object, symbol);
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
//#region node_modules/lodash-es/_baseIsArguments.js
/** `Object#toString` result references. */
var argsTag$2 = "[object Arguments]";
/**
* The base implementation of `_.isArguments`.
*
* @private
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is an `arguments` object,
*/
function baseIsArguments(value) {
	return isObjectLike(value) && baseGetTag(value) == argsTag$2;
}
//#endregion
//#region node_modules/lodash-es/isArguments.js
/** Used for built-in method references. */
var objectProto$1 = Object.prototype;
/** Used to check objects for own properties. */
var hasOwnProperty$4 = objectProto$1.hasOwnProperty;
/** Built-in value references. */
var propertyIsEnumerable = objectProto$1.propertyIsEnumerable;
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
	return isObjectLike(value) && hasOwnProperty$4.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
};
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
var freeExports$1 = typeof exports == "object" && exports && !exports.nodeType && exports;
/** Detect free variable `module`. */
var freeModule$1 = freeExports$1 && typeof module == "object" && module && !module.nodeType && module;
/** Built-in value references. */
var Buffer$1 = freeModule$1 && freeModule$1.exports === freeExports$1 ? root.Buffer : void 0;
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
//#region node_modules/lodash-es/_isIndex.js
/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER$1 = 9007199254740991;
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
	length = length == null ? MAX_SAFE_INTEGER$1 : length;
	return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
}
//#endregion
//#region node_modules/lodash-es/isLength.js
/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;
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
	return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}
//#endregion
//#region node_modules/lodash-es/_baseIsTypedArray.js
/** `Object#toString` result references. */
var argsTag$1 = "[object Arguments]", arrayTag$1 = "[object Array]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag = "[object Function]", mapTag$1 = "[object Map]", numberTag = "[object Number]", objectTag$2 = "[object Object]", regexpTag = "[object RegExp]", setTag$1 = "[object Set]", stringTag = "[object String]", weakMapTag$1 = "[object WeakMap]";
var arrayBufferTag = "[object ArrayBuffer]", dataViewTag$1 = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag$1] = typedArrayTags[arrayTag$1] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag$1] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag$1] = typedArrayTags[numberTag] = typedArrayTags[objectTag$2] = typedArrayTags[regexpTag] = typedArrayTags[setTag$1] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag$1] = false;
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
var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
/** Detect free variable `process` from Node.js. */
var freeProcess = freeModule && freeModule.exports === freeExports && freeGlobal.process;
/** Used to access faster Node.js helpers. */
var nodeUtil = function() {
	try {
		var types = freeModule && freeModule.require && freeModule.require("util").types;
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
//#region node_modules/lodash-es/_arrayLikeKeys.js
/** Used to check objects for own properties. */
var hasOwnProperty$3 = Object.prototype.hasOwnProperty;
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
	for (var key in value) if ((inherited || hasOwnProperty$3.call(value, key)) && !(skipIndexes && (key == "length" || isBuff && (key == "offset" || key == "parent") || isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || isIndex(key, length)))) result.push(key);
	return result;
}
//#endregion
//#region node_modules/lodash-es/_isPrototype.js
/** Used for built-in method references. */
var objectProto = Object.prototype;
/**
* Checks if `value` is likely a prototype object.
*
* @private
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
*/
function isPrototype(value) {
	var Ctor = value && value.constructor;
	return value === (typeof Ctor == "function" && Ctor.prototype || objectProto);
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
var hasOwnProperty$2 = Object.prototype.hasOwnProperty;
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
	for (var key in Object(object)) if (hasOwnProperty$2.call(object, key) && key != "constructor") result.push(key);
	return result;
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
var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
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
		if (!(isPartial ? key in other : hasOwnProperty$1.call(other, key))) return false;
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
//#region node_modules/lodash-es/_DataView.js
var DataView$1 = getNative(root, "DataView");
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
var mapTag = "[object Map]", objectTag$1 = "[object Object]", promiseTag = "[object Promise]", setTag = "[object Set]", weakMapTag = "[object WeakMap]";
var dataViewTag = "[object DataView]";
/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView$1), mapCtorString = toSource(Map$1), promiseCtorString = toSource(Promise$1), setCtorString = toSource(Set$1), weakMapCtorString = toSource(WeakMap$1);
/**
* Gets the `toStringTag` of `value`.
*
* @private
* @param {*} value The value to query.
* @returns {string} Returns the `toStringTag`.
*/
var getTag = baseGetTag;
if (DataView$1 && getTag(new DataView$1(/* @__PURE__ */ new ArrayBuffer(1))) != dataViewTag || Map$1 && getTag(new Map$1()) != mapTag || Promise$1 && getTag(Promise$1.resolve()) != promiseTag || Set$1 && getTag(new Set$1()) != setTag || WeakMap$1 && getTag(new WeakMap$1()) != weakMapTag) getTag = function(value) {
	var result = baseGetTag(value), Ctor = result == objectTag$1 ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
	if (ctorString) switch (ctorString) {
		case dataViewCtorString: return dataViewTag;
		case mapCtorString: return mapTag;
		case promiseCtorString: return promiseTag;
		case setCtorString: return setTag;
		case weakMapCtorString: return weakMapTag;
	}
	return result;
};
var _getTag_default = getTag;
//#endregion
//#region node_modules/lodash-es/_baseIsEqualDeep.js
/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1;
/** `Object#toString` result references. */
var argsTag = "[object Arguments]", arrayTag = "[object Array]", objectTag = "[object Object]";
/** Used to check objects for own properties. */
var hasOwnProperty = Object.prototype.hasOwnProperty;
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
	var objIsArr = isArray(object), othIsArr = isArray(other), objTag = objIsArr ? arrayTag : _getTag_default(object), othTag = othIsArr ? arrayTag : _getTag_default(other);
	objTag = objTag == argsTag ? objectTag : objTag;
	othTag = othTag == argsTag ? objectTag : othTag;
	var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
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
		var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
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
//#region node_modules/lodash-es/isNil.js
/**
* Checks if `value` is `null` or `undefined`.
*
* @static
* @memberOf _
* @since 4.0.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is nullish, else `false`.
* @example
*
* _.isNil(null);
* // => true
*
* _.isNil(void 0);
* // => true
*
* _.isNil(NaN);
* // => false
*/
function isNil(value) {
	return value == null;
}
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
//#region extension/src/main/pinger.ts
var Pinger = class {
	config;
	isWindows;
	running = false;
	timer = null;
	host;
	onResult;
	onError;
	constructor(config) {
		this.host = config.host;
		this.config = {
			host: config.host,
			intervalMs: config.intervalMs,
			timeoutMs: config.timeoutMs ?? 2e3
		};
		this.isWindows = (0, node_os.platform)() === "win32";
	}
	/**
	* Starts the ping loop.
	*/
	start() {
		if (this.running) return;
		this.running = true;
		this.loop();
	}
	/**
	* Stops the ping loop.
	*/
	stop() {
		this.running = false;
		if (this.timer) {
			clearTimeout(this.timer);
			this.timer = null;
		}
	}
	/**
	* Recursive loop to ensure pings do not overlap if the response
	* takes longer than the specified interval.
	*/
	async loop() {
		if (!this.running) return;
		const startTime = Date.now();
		try {
			const result = await this.ping();
			if (this.running && this.onResult) this.onResult(result);
		} catch (err) {
			if (this.running && this.onError) this.onError(err instanceof Error ? err : new Error(String(err)));
		}
		const elapsed = Date.now() - startTime;
		const delay = Math.max(0, this.config.intervalMs - elapsed);
		if (this.running) this.timer = setTimeout(() => this.loop(), delay);
	}
	/**
	* Executes a single ping command and parses the output.
	*/
	ping() {
		return new Promise((resolve) => {
			const command = this.buildCommand();
			const timestamp = /* @__PURE__ */ new Date();
			(0, node_child_process.exec)(command, (error, stdout, stderr) => {
				const result = {
					host: this.config.host,
					alive: false,
					timestamp
				};
				if (error) {
					result.error = stderr || error.message;
					result.rawOutput = stdout;
					return resolve(result);
				}
				const latency = this.parseLatency(stdout);
				if (latency !== null) {
					result.alive = true;
					result.latency = latency;
				} else {
					result.alive = false;
					result.rawOutput = stdout;
				}
				resolve(result);
			});
		});
	}
	/**
	* Generates the appropriate OS-specific ping command.
	*/
	buildCommand() {
		const { host, timeoutMs } = this.config;
		if (this.isWindows) return `ping -n 1 -w ${timeoutMs} ${host}`;
		else return `ping -c 1 -W ${Math.max(1, Math.ceil(timeoutMs / 1e3))} ${host}`;
	}
	/**
	* Extract latency in milliseconds from standard ping output.
	*/
	parseLatency(stdout) {
		const match = /time[=<]([\d.]+)\s*ms/i.exec(stdout);
		if (match && match[1]) {
			const parsed = parseFloat(match[1]);
			return isNaN(parsed) ? null : parsed;
		}
		return null;
	}
};
//#endregion
//#region extension/src/main/utils.ts
/**
* Determines which hardware components need to be monitored based on the user's settings.
* This prevents polling hardware that the user has disabled, saving system resources.
* @param metrics - The current configuration for enabled metrics.
* @returns An array of component types to be passed to the hardware monitoring library.
*/
function getActiveComponentTypes(metrics) {
	const activeComponents = /* @__PURE__ */ new Set();
	if (metrics.cpu.some((c) => c.active && (c.enabled.length > 0 || c.custom?.length > 0))) activeComponents.add("cpu");
	if (metrics.gpu.some((g) => g.active && (g.enabled.length > 0 || g.custom?.length > 0))) activeComponents.add("gpu");
	if (metrics.memory.some((m) => m.active && (m.enabled.length > 0 || m.custom?.length > 0))) activeComponents.add("memory");
	if (metrics.network?.some((n) => n.active && (n.enabled.length > 0 || n.custom?.length > 0))) activeComponents.add("network");
	if (metrics.uptime.system || metrics.uptime.app) activeComponents.add("uptime");
	return Array.from(activeComponents);
}
//#endregion
//#region extension/src/main/HardwareMonitorService.ts
var HARDWARE_CHECK_MAX_RETRIES = 5;
var HARDWARE_REDISCOVERY_DELAY_MS = 1e4;
var hardwareMonitorService = class HardwareMonitorService {
	static instance;
	storeManager;
	hwMonitor;
	config = initialSettings;
	webContents;
	isInitialized = false;
	lastError = null;
	pingers = [];
	rediscoveryTimer;
	discoveryPromise;
	constructor() {}
	static getInstance() {
		if (!HardwareMonitorService.instance) HardwareMonitorService.instance = new HardwareMonitorService();
		return HardwareMonitorService.instance;
	}
	/**
	* Initializes the service, loads configuration, and discovers hardware.
	*/
	async initialize(utils) {
		if (this.isInitialized) return;
		this.storeManager = await utils.getStorageManager();
		this.loadConfig();
		this.startPinging();
		this.registerIpcHandlers();
		this.isInitialized = true;
		this.discoverHardware();
	}
	startPinging() {
		const pingState = this.config.pingState;
		const stopPinger = (pinger) => {
			pinger.stop();
			this.sendToRenderer(HMONITOR_IPC_STOP_PING, pinger.host);
		};
		this.pingers.forEach(stopPinger);
		this.pingers = [];
		if (pingState.isActive) Array.from(new Set(pingState.enabledHosts)).forEach((host) => {
			if (!this.pingers.some((p) => p.host === host)) {
				const pinger = new Pinger({
					host,
					timeoutMs: pingState.timeout,
					intervalMs: pingState.interval
				});
				pinger.onResult = (result) => {
					const timeString = result.timestamp.toLocaleTimeString();
					if (result.alive) {
						const data = {
							host,
							timeString,
							latency: result.latency
						};
						this.sendToRenderer(HMONITOR_IPC_UPDATE_PING, data);
					} else this.sendToRenderer(HMONITOR_IPC_UPDATE_PING, host);
				};
				pinger.onError = () => {
					this.sendToRenderer(HMONITOR_IPC_UPDATE_PING, host);
				};
				electron.app.on("window-all-closed", () => pinger.stop());
				pinger.start();
				this.pingers.push(pinger);
			}
		});
	}
	/**
	* Sets the webContents for IPC communication and starts monitoring if enabled.
	*/
	onMainWindowReady(utils) {
		utils.getAppManager().then((appManager) => {
			this.webContents = appManager.getWebContent();
			if (this.lastError) this.sendToRenderer(HMONITOR_IPC_MONITORING_ERROR, this.lastError);
			this.sendToRenderer(HMONITOR_IPC_CONFIG_UPDATE, this.config);
			if (this.config.enabled) this.startMonitoring();
		});
	}
	sendToRenderer(channel, data) {
		if (this.webContents && !this.webContents.isDestroyed()) this.webContents.send(channel, data);
	}
	loadConfig() {
		if (!this.storeManager) return;
		let storedConfig = this.storeManager.getCustomData(HMONITOR_STORAGE_ID);
		if (!storedConfig || storedConfig.configVersion < initialSettings.configVersion) {
			const migratedConfig = {
				...initialSettings,
				...storedConfig && {
					enabled: storedConfig.enabled,
					refreshInterval: storedConfig.refreshInterval,
					showSectionLabel: storedConfig.showSectionLabel,
					enabledMetrics: storedConfig.enabledMetrics,
					displayStyle: storedConfig.compactMode ? "compact" : "default",
					showAliasCpu: storedConfig.showAliasCpu ?? initialSettings.showAliasCpu,
					showAliasGpu: storedConfig.showAliasGpu ?? initialSettings.showAliasGpu,
					showAliasMemory: storedConfig.showAliasMemory ?? initialSettings.showAliasMemory,
					showAliasNetwork: storedConfig.showAliasNetwork ?? initialSettings.showAliasNetwork
				},
				configVersion: initialSettings.configVersion
			};
			migratedConfig.enabledMetrics.cpu.forEach((c) => c.custom ??= []);
			migratedConfig.enabledMetrics.gpu.forEach((g) => g.custom ??= []);
			migratedConfig.enabledMetrics.memory.forEach((m) => m.custom ??= []);
			migratedConfig.enabledMetrics.network ??= [];
			migratedConfig.enabledMetrics.network.forEach((n) => n.custom ??= []);
			storedConfig = migratedConfig;
		}
		if (!storedConfig.pingState) storedConfig.pingState = initialSettings.pingState;
		this.config = {
			...storedConfig,
			availableHardware: storedConfig.availableHardware ?? initialSettings.availableHardware,
			showAliasCpu: storedConfig.showAliasCpu ?? initialSettings.showAliasCpu,
			showAliasGpu: storedConfig.showAliasGpu ?? initialSettings.showAliasGpu,
			showAliasMemory: storedConfig.showAliasMemory ?? initialSettings.showAliasMemory,
			showAliasNetwork: storedConfig.showAliasNetwork ?? initialSettings.showAliasNetwork,
			sectionOrder: storedConfig.sectionOrder ?? initialSettings.sectionOrder,
			uptimeOrder: storedConfig.uptimeOrder ?? initialSettings.uptimeOrder
		};
	}
	saveConfig() {
		this.storeManager?.setCustomData(HMONITOR_STORAGE_ID, this.config);
	}
	async discoverHardware() {
		if (this.discoveryPromise) return this.discoveryPromise;
		this.discoveryPromise = this.performHardwareDiscovery().finally(() => {
			this.discoveryPromise = void 0;
		});
		return this.discoveryPromise;
	}
	async performHardwareDiscovery() {
		this.clearRediscoveryTimer();
		for (let i = 0; i < HARDWARE_CHECK_MAX_RETRIES; i++) try {
			const monitor = new HardwareMonitor("error");
			const targetDir = (0, node_path.join)(electron.app.getPath("downloads"), "LynxHub");
			await monitor.checkRequirements(targetDir);
			const result = await monitor.getDataOnce([
				"cpu",
				"gpu",
				"memory",
				"network"
			]);
			const mapToHardwareInfo = (items) => {
				if (!items) return [];
				return items.map((item) => ({
					name: item.Name,
					sensors: item.Sensors?.map((s) => ({
						Name: s.Name,
						Type: s.Type,
						Unit: s.Unit,
						Identifier: s.Identifier
					})) ?? []
				}));
			};
			this.config.availableHardware = {
				gpu: mapToHardwareInfo(result.GPU),
				cpu: mapToHardwareInfo(result.CPU),
				memory: mapToHardwareInfo(result.Memory),
				network: mapToHardwareInfo(result.Network)
			};
			this.config.availableHardware.gpu.forEach((hw) => {
				if (!this.config.enabledMetrics.gpu.some((g) => g.name === hw.name)) this.config.enabledMetrics.gpu.push({
					name: hw.name,
					active: true,
					enabled: [
						"temp",
						"usage",
						"vram"
					],
					custom: []
				});
			});
			this.config.availableHardware.cpu.forEach((hw) => {
				if (!this.config.enabledMetrics.cpu.some((c) => c.name === hw.name)) this.config.enabledMetrics.cpu.push({
					name: hw.name,
					active: true,
					enabled: ["temp", "usage"],
					custom: []
				});
			});
			this.config.availableHardware.memory.forEach((hw) => {
				if (!this.config.enabledMetrics.memory.some((m) => m.name === hw.name)) this.config.enabledMetrics.memory.push({
					name: hw.name,
					active: true,
					enabled: ["memory"],
					custom: []
				});
			});
			this.config.availableHardware.network.forEach((hw) => {
				if (!this.config.enabledMetrics.network.some((n) => n.name === hw.name)) this.config.enabledMetrics.network.push({
					name: hw.name,
					active: false,
					enabled: ["uploadSpeed", "downloadSpeed"],
					custom: []
				});
			});
			this.lastError = null;
			this.saveConfig();
			this.sendToRenderer(HMONITOR_IPC_CONFIG_UPDATE, this.config);
			if (this.config.enabled && !this.hwMonitor) this.startMonitoring();
			return;
		} catch (error) {
			console.warn(`Hardware discovery attempt ${i + 1} failed:`, error);
			if (i === HARDWARE_CHECK_MAX_RETRIES - 1) {
				console.error("All hardware discovery attempts failed.");
				this.lastError = error;
				this.sendToRenderer(HMONITOR_IPC_MONITORING_ERROR, error);
				this.scheduleRediscovery();
			}
		}
	}
	scheduleRediscovery() {
		if (this.rediscoveryTimer) return;
		this.rediscoveryTimer = setTimeout(() => {
			this.rediscoveryTimer = void 0;
			this.discoverHardware();
		}, HARDWARE_REDISCOVERY_DELAY_MS);
	}
	clearRediscoveryTimer() {
		if (!this.rediscoveryTimer) return;
		clearTimeout(this.rediscoveryTimer);
		this.rediscoveryTimer = void 0;
	}
	async startMonitoring() {
		if (this.hwMonitor || !this.config) return;
		try {
			const components = getActiveComponentTypes(this.config.enabledMetrics);
			if (components.length === 0 || components.every((component) => component === "uptime")) {
				if (!Object.values(this.config.availableHardware).some((items) => items.length > 0)) {
					this.scheduleRediscovery();
					return;
				}
			}
			this.hwMonitor = new HardwareMonitor("error");
			const targetDir = (0, node_path.join)(electron.app.getPath("downloads"), "LynxHub");
			await this.hwMonitor.checkRequirements(targetDir);
			this.hwMonitor.on("data", (data) => {
				const rawSensors = [
					...data.CPU ?? [],
					...data.GPU ?? [],
					...data.Memory ?? [],
					...data.Network ?? []
				].flatMap((h) => h.Sensors?.map((s) => ({
					Identifier: s.Identifier,
					Value: s.Value
				})) ?? []);
				const reportWithRawSensors = {
					...data,
					rawSensors
				};
				this.sendToRenderer(HMONITOR_IPC_DATA_UPDATE, reportWithRawSensors);
			});
			this.hwMonitor.on("error", (error) => {
				console.error("Hardware Monitoring Error:", error.message, error.rawError ?? "");
				this.sendToRenderer(HMONITOR_IPC_MONITORING_ERROR, error);
			});
			const intervalMs = (this.config.refreshInterval || 1) * 1e3;
			if (components.length > 0) this.hwMonitor.startTimed(intervalMs, components);
		} catch (error) {
			console.error("Failed to start monitoring:", error);
			this.sendToRenderer(HMONITOR_IPC_MONITORING_ERROR, error);
		}
	}
	stopMonitoring() {
		this.hwMonitor?.stopTimed();
		this.hwMonitor = void 0;
	}
	updateConfig(newConfig) {
		const oldConfig = this.config;
		const shouldRestart = !isEqual(newConfig.enabledMetrics, oldConfig.enabledMetrics) || !isEqual(newConfig.refreshInterval, oldConfig.refreshInterval);
		this.config = newConfig;
		this.saveConfig();
		if (newConfig.enabled && shouldRestart) this.stopMonitoring();
		if (newConfig.enabled !== oldConfig.enabled) newConfig.enabled ? this.startMonitoring() : this.stopMonitoring();
		else if (newConfig.enabled && shouldRestart) this.startMonitoring();
		this.startPinging();
	}
	async resetConfig() {
		if (!this.storeManager) return;
		this.config = {
			...initialSettings,
			pingState: {
				...initialSettings.pingState,
				hosts: [],
				enabledHosts: []
			}
		};
		this.saveConfig();
		this.stopMonitoring();
		const stopPinger = (pinger) => {
			pinger.stop();
			this.sendToRenderer(HMONITOR_IPC_STOP_PING, pinger.host);
		};
		this.pingers.forEach(stopPinger);
		this.pingers = [];
		await this.discoverHardware();
	}
	registerIpcHandlers() {
		electron.ipcMain.on(HMONITOR_IPC_SET_CONFIG, (_, newConfig) => {
			if (isNil(newConfig)) return;
			this.updateConfig(JSON.parse(newConfig));
		});
		electron.ipcMain.on(HMONITOR_IPC_RESET_CONFIG, () => {
			this.resetConfig();
		});
	}
}.getInstance();
//#endregion
//#region extension/src/main/lynxExtension.ts
/**
* Entry point for the extension's main process logic.
* Hooks into the LynxHub application lifecycle.
*/
async function initialExtension(lynxApi, utils) {
	lynxApi.onAppReady(() => hardwareMonitorService.initialize(utils));
	lynxApi.onReadyToShow(() => hardwareMonitorService.onMainWindowReady(utils));
}
//#endregion
exports.initialExtension = initialExtension;
