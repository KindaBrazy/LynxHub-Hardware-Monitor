import path, { join } from "node:path";
import { exec, spawn } from "node:child_process";
import { EventEmitter } from "node:events";
import os from "node:os";
import { promisify } from "node:util";
import fsPromises from "node:fs/promises";
import originalFs from "node:fs";
import https from "node:https";
import require$$0$5 from "path";
import require$$0$2 from "fs";
import require$$0 from "constants";
import require$$0$1 from "stream";
import require$$1 from "util";
import require$$5 from "assert";
import require$$2$1 from "events";
import require$$0$3 from "buffer";
import require$$6 from "string_decoder";
import require$$0$4 from "zlib";
import { ipcMain, app } from "electron";
import __cjs_mod__ from "node:module";
const __filename = import.meta.filename;
const __dirname = import.meta.dirname;
const require2 = __cjs_mod__.createRequire(import.meta.url);
const execAsync = promisify(exec);
const DOTNET_LIST_RUNTIMES_COMMAND = "dotnet --list-runtimes";
const DOTNET_8_RUNTIME_IDENTIFIER = "microsoft.netcore.app 8.0";
function isDotNet8RuntimeInstalled(output) {
  return output.toLowerCase().includes(DOTNET_8_RUNTIME_IDENTIFIER);
}
async function checkDotNetRuntime8(logger = console) {
  try {
    const { stdout, stderr } = await execAsync(DOTNET_LIST_RUNTIMES_COMMAND);
    if (stderr) {
      logger.warn(`Stderr from 'dotnet --list-runtimes': ${stderr}`);
    }
    return isDotNet8RuntimeInstalled(stdout);
  } catch (error) {
    logger.error(`Error executing 'dotnet --list-runtimes': ${error.message}`);
    return false;
  }
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
function getAugmentedNamespace(n) {
  if (Object.prototype.hasOwnProperty.call(n, "__esModule")) return n;
  var f = n.default;
  if (typeof f == "function") {
    var a = function a2() {
      if (this instanceof a2) {
        return Reflect.construct(f, arguments, this.constructor);
      }
      return f.apply(this, arguments);
    };
    a.prototype = f.prototype;
  } else a = {};
  Object.defineProperty(a, "__esModule", { value: true });
  Object.keys(n).forEach(function(k) {
    var d = Object.getOwnPropertyDescriptor(n, k);
    Object.defineProperty(a, k, d.get ? d : {
      enumerable: true,
      get: function() {
        return n[k];
      }
    });
  });
  return a;
}
var polyfills;
var hasRequiredPolyfills;
function requirePolyfills() {
  if (hasRequiredPolyfills) return polyfills;
  hasRequiredPolyfills = 1;
  var constants = require$$0;
  var origCwd = process.cwd;
  var cwd = null;
  var platform = process.env.GRACEFUL_FS_PLATFORM || process.platform;
  process.cwd = function() {
    if (!cwd)
      cwd = origCwd.call(process);
    return cwd;
  };
  try {
    process.cwd();
  } catch (er) {
  }
  if (typeof process.chdir === "function") {
    var chdir = process.chdir;
    process.chdir = function(d) {
      cwd = null;
      chdir.call(process, d);
    };
    if (Object.setPrototypeOf) Object.setPrototypeOf(process.chdir, chdir);
  }
  polyfills = patch;
  function patch(fs) {
    if (constants.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)) {
      patchLchmod(fs);
    }
    if (!fs.lutimes) {
      patchLutimes(fs);
    }
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
      fs.lchmod = function(path2, mode, cb) {
        if (cb) process.nextTick(cb);
      };
      fs.lchmodSync = function() {
      };
    }
    if (fs.chown && !fs.lchown) {
      fs.lchown = function(path2, uid, gid, cb) {
        if (cb) process.nextTick(cb);
      };
      fs.lchownSync = function() {
      };
    }
    if (platform === "win32") {
      fs.rename = typeof fs.rename !== "function" ? fs.rename : function(fs$rename) {
        function rename(from, to, cb) {
          var start = Date.now();
          var backoff = 0;
          fs$rename(from, to, function CB(er) {
            if (er && (er.code === "EACCES" || er.code === "EPERM" || er.code === "EBUSY") && Date.now() - start < 6e4) {
              setTimeout(function() {
                fs.stat(to, function(stater, st) {
                  if (stater && stater.code === "ENOENT")
                    fs$rename(from, to, CB);
                  else
                    cb(er);
                });
              }, backoff);
              if (backoff < 100)
                backoff += 10;
              return;
            }
            if (cb) cb(er);
          });
        }
        if (Object.setPrototypeOf) Object.setPrototypeOf(rename, fs$rename);
        return rename;
      }(fs.rename);
    }
    fs.read = typeof fs.read !== "function" ? fs.read : function(fs$read) {
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
    }(fs.read);
    fs.readSync = typeof fs.readSync !== "function" ? fs.readSync : /* @__PURE__ */ function(fs$readSync) {
      return function(fd, buffer, offset, length, position) {
        var eagCounter = 0;
        while (true) {
          try {
            return fs$readSync.call(fs, fd, buffer, offset, length, position);
          } catch (er) {
            if (er.code === "EAGAIN" && eagCounter < 10) {
              eagCounter++;
              continue;
            }
            throw er;
          }
        }
      };
    }(fs.readSync);
    function patchLchmod(fs2) {
      fs2.lchmod = function(path2, mode, callback) {
        fs2.open(
          path2,
          constants.O_WRONLY | constants.O_SYMLINK,
          mode,
          function(err, fd) {
            if (err) {
              if (callback) callback(err);
              return;
            }
            fs2.fchmod(fd, mode, function(err2) {
              fs2.close(fd, function(err22) {
                if (callback) callback(err2 || err22);
              });
            });
          }
        );
      };
      fs2.lchmodSync = function(path2, mode) {
        var fd = fs2.openSync(path2, constants.O_WRONLY | constants.O_SYMLINK, mode);
        var threw = true;
        var ret;
        try {
          ret = fs2.fchmodSync(fd, mode);
          threw = false;
        } finally {
          if (threw) {
            try {
              fs2.closeSync(fd);
            } catch (er) {
            }
          } else {
            fs2.closeSync(fd);
          }
        }
        return ret;
      };
    }
    function patchLutimes(fs2) {
      if (constants.hasOwnProperty("O_SYMLINK") && fs2.futimes) {
        fs2.lutimes = function(path2, at, mt, cb) {
          fs2.open(path2, constants.O_SYMLINK, function(er, fd) {
            if (er) {
              if (cb) cb(er);
              return;
            }
            fs2.futimes(fd, at, mt, function(er2) {
              fs2.close(fd, function(er22) {
                if (cb) cb(er2 || er22);
              });
            });
          });
        };
        fs2.lutimesSync = function(path2, at, mt) {
          var fd = fs2.openSync(path2, constants.O_SYMLINK);
          var ret;
          var threw = true;
          try {
            ret = fs2.futimesSync(fd, at, mt);
            threw = false;
          } finally {
            if (threw) {
              try {
                fs2.closeSync(fd);
              } catch (er) {
              }
            } else {
              fs2.closeSync(fd);
            }
          }
          return ret;
        };
      } else if (fs2.futimes) {
        fs2.lutimes = function(_a, _b, _c, cb) {
          if (cb) process.nextTick(cb);
        };
        fs2.lutimesSync = function() {
        };
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
      if (!er)
        return true;
      if (er.code === "ENOSYS")
        return true;
      var nonroot = !process.getuid || process.getuid() !== 0;
      if (nonroot) {
        if (er.code === "EINVAL" || er.code === "EPERM")
          return true;
      }
      return false;
    }
  }
  return polyfills;
}
var legacyStreams;
var hasRequiredLegacyStreams;
function requireLegacyStreams() {
  if (hasRequiredLegacyStreams) return legacyStreams;
  hasRequiredLegacyStreams = 1;
  var Stream = require$$0$1.Stream;
  legacyStreams = legacy;
  function legacy(fs) {
    return {
      ReadStream,
      WriteStream
    };
    function ReadStream(path2, options) {
      if (!(this instanceof ReadStream)) return new ReadStream(path2, options);
      Stream.call(this);
      var self2 = this;
      this.path = path2;
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
        if ("number" !== typeof this.start) {
          throw TypeError("start must be a Number");
        }
        if (this.end === void 0) {
          this.end = Infinity;
        } else if ("number" !== typeof this.end) {
          throw TypeError("end must be a Number");
        }
        if (this.start > this.end) {
          throw new Error("start must be <= end");
        }
        this.pos = this.start;
      }
      if (this.fd !== null) {
        process.nextTick(function() {
          self2._read();
        });
        return;
      }
      fs.open(this.path, this.flags, this.mode, function(err, fd) {
        if (err) {
          self2.emit("error", err);
          self2.readable = false;
          return;
        }
        self2.fd = fd;
        self2.emit("open", fd);
        self2._read();
      });
    }
    function WriteStream(path2, options) {
      if (!(this instanceof WriteStream)) return new WriteStream(path2, options);
      Stream.call(this);
      this.path = path2;
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
        if ("number" !== typeof this.start) {
          throw TypeError("start must be a Number");
        }
        if (this.start < 0) {
          throw new Error("start must be >= zero");
        }
        this.pos = this.start;
      }
      this.busy = false;
      this._queue = [];
      if (this.fd === null) {
        this._open = fs.open;
        this._queue.push([this._open, this.path, this.flags, this.mode, void 0]);
        this.flush();
      }
    }
  }
  return legacyStreams;
}
var clone_1;
var hasRequiredClone;
function requireClone() {
  if (hasRequiredClone) return clone_1;
  hasRequiredClone = 1;
  clone_1 = clone;
  var getPrototypeOf = Object.getPrototypeOf || function(obj) {
    return obj.__proto__;
  };
  function clone(obj) {
    if (obj === null || typeof obj !== "object")
      return obj;
    if (obj instanceof Object)
      var copy = { __proto__: getPrototypeOf(obj) };
    else
      var copy = /* @__PURE__ */ Object.create(null);
    Object.getOwnPropertyNames(obj).forEach(function(key) {
      Object.defineProperty(copy, key, Object.getOwnPropertyDescriptor(obj, key));
    });
    return copy;
  }
  return clone_1;
}
var gracefulFs;
var hasRequiredGracefulFs;
function requireGracefulFs() {
  if (hasRequiredGracefulFs) return gracefulFs;
  hasRequiredGracefulFs = 1;
  var fs = require$$0$2;
  var polyfills2 = requirePolyfills();
  var legacy = requireLegacyStreams();
  var clone = requireClone();
  var util2 = require$$1;
  var gracefulQueue;
  var previousSymbol;
  if (typeof Symbol === "function" && typeof Symbol.for === "function") {
    gracefulQueue = Symbol.for("graceful-fs.queue");
    previousSymbol = Symbol.for("graceful-fs.previous");
  } else {
    gracefulQueue = "___graceful-fs.queue";
    previousSymbol = "___graceful-fs.previous";
  }
  function noop() {
  }
  function publishQueue(context, queue2) {
    Object.defineProperty(context, gracefulQueue, {
      get: function() {
        return queue2;
      }
    });
  }
  var debug = noop;
  if (util2.debuglog)
    debug = util2.debuglog("gfs4");
  else if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || ""))
    debug = function() {
      var m = util2.format.apply(util2, arguments);
      m = "GFS4: " + m.split(/\n/).join("\nGFS4: ");
      console.error(m);
    };
  if (!fs[gracefulQueue]) {
    var queue = commonjsGlobal[gracefulQueue] || [];
    publishQueue(fs, queue);
    fs.close = function(fs$close) {
      function close(fd, cb) {
        return fs$close.call(fs, fd, function(err) {
          if (!err) {
            resetQueue();
          }
          if (typeof cb === "function")
            cb.apply(this, arguments);
        });
      }
      Object.defineProperty(close, previousSymbol, {
        value: fs$close
      });
      return close;
    }(fs.close);
    fs.closeSync = function(fs$closeSync) {
      function closeSync(fd) {
        fs$closeSync.apply(fs, arguments);
        resetQueue();
      }
      Object.defineProperty(closeSync, previousSymbol, {
        value: fs$closeSync
      });
      return closeSync;
    }(fs.closeSync);
    if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || "")) {
      process.on("exit", function() {
        debug(fs[gracefulQueue]);
        require$$5.equal(fs[gracefulQueue].length, 0);
      });
    }
  }
  if (!commonjsGlobal[gracefulQueue]) {
    publishQueue(commonjsGlobal, fs[gracefulQueue]);
  }
  gracefulFs = patch(clone(fs));
  if (process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !fs.__patched) {
    gracefulFs = patch(fs);
    fs.__patched = true;
  }
  function patch(fs2) {
    polyfills2(fs2);
    fs2.gracefulify = patch;
    fs2.createReadStream = createReadStream;
    fs2.createWriteStream = createWriteStream;
    var fs$readFile = fs2.readFile;
    fs2.readFile = readFile;
    function readFile(path2, options, cb) {
      if (typeof options === "function")
        cb = options, options = null;
      return go$readFile(path2, options, cb);
      function go$readFile(path22, options2, cb2, startTime) {
        return fs$readFile(path22, options2, function(err) {
          if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
            enqueue([go$readFile, [path22, options2, cb2], err, startTime || Date.now(), Date.now()]);
          else {
            if (typeof cb2 === "function")
              cb2.apply(this, arguments);
          }
        });
      }
    }
    var fs$writeFile = fs2.writeFile;
    fs2.writeFile = writeFile;
    function writeFile(path2, data, options, cb) {
      if (typeof options === "function")
        cb = options, options = null;
      return go$writeFile(path2, data, options, cb);
      function go$writeFile(path22, data2, options2, cb2, startTime) {
        return fs$writeFile(path22, data2, options2, function(err) {
          if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
            enqueue([go$writeFile, [path22, data2, options2, cb2], err, startTime || Date.now(), Date.now()]);
          else {
            if (typeof cb2 === "function")
              cb2.apply(this, arguments);
          }
        });
      }
    }
    var fs$appendFile = fs2.appendFile;
    if (fs$appendFile)
      fs2.appendFile = appendFile;
    function appendFile(path2, data, options, cb) {
      if (typeof options === "function")
        cb = options, options = null;
      return go$appendFile(path2, data, options, cb);
      function go$appendFile(path22, data2, options2, cb2, startTime) {
        return fs$appendFile(path22, data2, options2, function(err) {
          if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
            enqueue([go$appendFile, [path22, data2, options2, cb2], err, startTime || Date.now(), Date.now()]);
          else {
            if (typeof cb2 === "function")
              cb2.apply(this, arguments);
          }
        });
      }
    }
    var fs$copyFile = fs2.copyFile;
    if (fs$copyFile)
      fs2.copyFile = copyFile;
    function copyFile(src, dest, flags, cb) {
      if (typeof flags === "function") {
        cb = flags;
        flags = 0;
      }
      return go$copyFile(src, dest, flags, cb);
      function go$copyFile(src2, dest2, flags2, cb2, startTime) {
        return fs$copyFile(src2, dest2, flags2, function(err) {
          if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
            enqueue([go$copyFile, [src2, dest2, flags2, cb2], err, startTime || Date.now(), Date.now()]);
          else {
            if (typeof cb2 === "function")
              cb2.apply(this, arguments);
          }
        });
      }
    }
    var fs$readdir = fs2.readdir;
    fs2.readdir = readdir;
    var noReaddirOptionVersions = /^v[0-5]\./;
    function readdir(path2, options, cb) {
      if (typeof options === "function")
        cb = options, options = null;
      var go$readdir = noReaddirOptionVersions.test(process.version) ? function go$readdir2(path22, options2, cb2, startTime) {
        return fs$readdir(path22, fs$readdirCallback(
          path22,
          options2,
          cb2,
          startTime
        ));
      } : function go$readdir2(path22, options2, cb2, startTime) {
        return fs$readdir(path22, options2, fs$readdirCallback(
          path22,
          options2,
          cb2,
          startTime
        ));
      };
      return go$readdir(path2, options, cb);
      function fs$readdirCallback(path22, options2, cb2, startTime) {
        return function(err, files) {
          if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
            enqueue([
              go$readdir,
              [path22, options2, cb2],
              err,
              startTime || Date.now(),
              Date.now()
            ]);
          else {
            if (files && files.sort)
              files.sort();
            if (typeof cb2 === "function")
              cb2.call(this, err, files);
          }
        };
      }
    }
    if (process.version.substr(0, 4) === "v0.8") {
      var legStreams = legacy(fs2);
      ReadStream = legStreams.ReadStream;
      WriteStream = legStreams.WriteStream;
    }
    var fs$ReadStream = fs2.ReadStream;
    if (fs$ReadStream) {
      ReadStream.prototype = Object.create(fs$ReadStream.prototype);
      ReadStream.prototype.open = ReadStream$open;
    }
    var fs$WriteStream = fs2.WriteStream;
    if (fs$WriteStream) {
      WriteStream.prototype = Object.create(fs$WriteStream.prototype);
      WriteStream.prototype.open = WriteStream$open;
    }
    Object.defineProperty(fs2, "ReadStream", {
      get: function() {
        return ReadStream;
      },
      set: function(val) {
        ReadStream = val;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(fs2, "WriteStream", {
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
    Object.defineProperty(fs2, "FileReadStream", {
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
    Object.defineProperty(fs2, "FileWriteStream", {
      get: function() {
        return FileWriteStream;
      },
      set: function(val) {
        FileWriteStream = val;
      },
      enumerable: true,
      configurable: true
    });
    function ReadStream(path2, options) {
      if (this instanceof ReadStream)
        return fs$ReadStream.apply(this, arguments), this;
      else
        return ReadStream.apply(Object.create(ReadStream.prototype), arguments);
    }
    function ReadStream$open() {
      var that = this;
      open(that.path, that.flags, that.mode, function(err, fd) {
        if (err) {
          if (that.autoClose)
            that.destroy();
          that.emit("error", err);
        } else {
          that.fd = fd;
          that.emit("open", fd);
          that.read();
        }
      });
    }
    function WriteStream(path2, options) {
      if (this instanceof WriteStream)
        return fs$WriteStream.apply(this, arguments), this;
      else
        return WriteStream.apply(Object.create(WriteStream.prototype), arguments);
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
    function createReadStream(path2, options) {
      return new fs2.ReadStream(path2, options);
    }
    function createWriteStream(path2, options) {
      return new fs2.WriteStream(path2, options);
    }
    var fs$open = fs2.open;
    fs2.open = open;
    function open(path2, flags, mode, cb) {
      if (typeof mode === "function")
        cb = mode, mode = null;
      return go$open(path2, flags, mode, cb);
      function go$open(path22, flags2, mode2, cb2, startTime) {
        return fs$open(path22, flags2, mode2, function(err, fd) {
          if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
            enqueue([go$open, [path22, flags2, mode2, cb2], err, startTime || Date.now(), Date.now()]);
          else {
            if (typeof cb2 === "function")
              cb2.apply(this, arguments);
          }
        });
      }
    }
    return fs2;
  }
  function enqueue(elem) {
    debug("ENQUEUE", elem[0].name, elem[1]);
    fs[gracefulQueue].push(elem);
    retry();
  }
  var retryTimer;
  function resetQueue() {
    var now = Date.now();
    for (var i = 0; i < fs[gracefulQueue].length; ++i) {
      if (fs[gracefulQueue][i].length > 2) {
        fs[gracefulQueue][i][3] = now;
        fs[gracefulQueue][i][4] = now;
      }
    }
    retry();
  }
  function retry() {
    clearTimeout(retryTimer);
    retryTimer = void 0;
    if (fs[gracefulQueue].length === 0)
      return;
    var elem = fs[gracefulQueue].shift();
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
      if (typeof cb === "function")
        cb.call(null, err);
    } else {
      var sinceAttempt = Date.now() - lastTime;
      var sinceStart = Math.max(lastTime - startTime, 1);
      var desiredDelay = Math.min(sinceStart * 1.2, 100);
      if (sinceAttempt >= desiredDelay) {
        debug("RETRY", fn.name, args);
        fn.apply(null, args.concat([startTime]));
      } else {
        fs[gracefulQueue].push(elem);
      }
    }
    if (retryTimer === void 0) {
      retryTimer = setTimeout(retry, 0);
    }
  }
  return gracefulFs;
}
var fileType$2;
var hasRequiredFileType$2;
function requireFileType$2() {
  if (hasRequiredFileType$2) return fileType$2;
  hasRequiredFileType$2 = 1;
  fileType$2 = (input) => {
    const buf = new Uint8Array(input);
    if (!(buf && buf.length > 1)) {
      return null;
    }
    const check = (header, opts) => {
      opts = Object.assign({
        offset: 0
      }, opts);
      for (let i = 0; i < header.length; i++) {
        if (header[i] !== buf[i + opts.offset]) {
          return false;
        }
      }
      return true;
    };
    if (check([255, 216, 255])) {
      return {
        ext: "jpg",
        mime: "image/jpeg"
      };
    }
    if (check([137, 80, 78, 71, 13, 10, 26, 10])) {
      return {
        ext: "png",
        mime: "image/png"
      };
    }
    if (check([71, 73, 70])) {
      return {
        ext: "gif",
        mime: "image/gif"
      };
    }
    if (check([87, 69, 66, 80], { offset: 8 })) {
      return {
        ext: "webp",
        mime: "image/webp"
      };
    }
    if (check([70, 76, 73, 70])) {
      return {
        ext: "flif",
        mime: "image/flif"
      };
    }
    if ((check([73, 73, 42, 0]) || check([77, 77, 0, 42])) && check([67, 82], { offset: 8 })) {
      return {
        ext: "cr2",
        mime: "image/x-canon-cr2"
      };
    }
    if (check([73, 73, 42, 0]) || check([77, 77, 0, 42])) {
      return {
        ext: "tif",
        mime: "image/tiff"
      };
    }
    if (check([66, 77])) {
      return {
        ext: "bmp",
        mime: "image/bmp"
      };
    }
    if (check([73, 73, 188])) {
      return {
        ext: "jxr",
        mime: "image/vnd.ms-photo"
      };
    }
    if (check([56, 66, 80, 83])) {
      return {
        ext: "psd",
        mime: "image/vnd.adobe.photoshop"
      };
    }
    if (check([80, 75, 3, 4]) && check([109, 105, 109, 101, 116, 121, 112, 101, 97, 112, 112, 108, 105, 99, 97, 116, 105, 111, 110, 47, 101, 112, 117, 98, 43, 122, 105, 112], { offset: 30 })) {
      return {
        ext: "epub",
        mime: "application/epub+zip"
      };
    }
    if (check([80, 75, 3, 4]) && check([77, 69, 84, 65, 45, 73, 78, 70, 47, 109, 111, 122, 105, 108, 108, 97, 46, 114, 115, 97], { offset: 30 })) {
      return {
        ext: "xpi",
        mime: "application/x-xpinstall"
      };
    }
    if (check([80, 75]) && (buf[2] === 3 || buf[2] === 5 || buf[2] === 7) && (buf[3] === 4 || buf[3] === 6 || buf[3] === 8)) {
      return {
        ext: "zip",
        mime: "application/zip"
      };
    }
    if (check([117, 115, 116, 97, 114], { offset: 257 })) {
      return {
        ext: "tar",
        mime: "application/x-tar"
      };
    }
    if (check([82, 97, 114, 33, 26, 7]) && (buf[6] === 0 || buf[6] === 1)) {
      return {
        ext: "rar",
        mime: "application/x-rar-compressed"
      };
    }
    if (check([31, 139, 8])) {
      return {
        ext: "gz",
        mime: "application/gzip"
      };
    }
    if (check([66, 90, 104])) {
      return {
        ext: "bz2",
        mime: "application/x-bzip2"
      };
    }
    if (check([55, 122, 188, 175, 39, 28])) {
      return {
        ext: "7z",
        mime: "application/x-7z-compressed"
      };
    }
    if (check([120, 1])) {
      return {
        ext: "dmg",
        mime: "application/x-apple-diskimage"
      };
    }
    if (check([0, 0, 0]) && (buf[3] === 24 || buf[3] === 32) && check([102, 116, 121, 112], { offset: 4 }) || check([51, 103, 112, 53]) || check([0, 0, 0, 28, 102, 116, 121, 112, 109, 112, 52, 50]) && check([109, 112, 52, 49, 109, 112, 52, 50, 105, 115, 111, 109], { offset: 16 }) || check([0, 0, 0, 28, 102, 116, 121, 112, 105, 115, 111, 109]) || check([0, 0, 0, 28, 102, 116, 121, 112, 109, 112, 52, 50, 0, 0, 0, 0])) {
      return {
        ext: "mp4",
        mime: "video/mp4"
      };
    }
    if (check([0, 0, 0, 28, 102, 116, 121, 112, 77, 52, 86])) {
      return {
        ext: "m4v",
        mime: "video/x-m4v"
      };
    }
    if (check([77, 84, 104, 100])) {
      return {
        ext: "mid",
        mime: "audio/midi"
      };
    }
    if (check([26, 69, 223, 163])) {
      const sliced = buf.subarray(4, 4 + 4096);
      const idPos = sliced.findIndex((el, i, arr) => arr[i] === 66 && arr[i + 1] === 130);
      if (idPos >= 0) {
        const docTypePos = idPos + 3;
        const findDocType = (type) => Array.from(type).every((c, i) => sliced[docTypePos + i] === c.charCodeAt(0));
        if (findDocType("matroska")) {
          return {
            ext: "mkv",
            mime: "video/x-matroska"
          };
        }
        if (findDocType("webm")) {
          return {
            ext: "webm",
            mime: "video/webm"
          };
        }
      }
    }
    if (check([0, 0, 0, 20, 102, 116, 121, 112, 113, 116, 32, 32]) || check([102, 114, 101, 101], { offset: 4 }) || check([102, 116, 121, 112, 113, 116, 32, 32], { offset: 4 }) || check([109, 100, 97, 116], { offset: 4 }) || // MJPEG
    check([119, 105, 100, 101], { offset: 4 })) {
      return {
        ext: "mov",
        mime: "video/quicktime"
      };
    }
    if (check([82, 73, 70, 70]) && check([65, 86, 73], { offset: 8 })) {
      return {
        ext: "avi",
        mime: "video/x-msvideo"
      };
    }
    if (check([48, 38, 178, 117, 142, 102, 207, 17, 166, 217])) {
      return {
        ext: "wmv",
        mime: "video/x-ms-wmv"
      };
    }
    if (check([0, 0, 1, 186])) {
      return {
        ext: "mpg",
        mime: "video/mpeg"
      };
    }
    if (check([73, 68, 51]) || check([255, 251])) {
      return {
        ext: "mp3",
        mime: "audio/mpeg"
      };
    }
    if (check([102, 116, 121, 112, 77, 52, 65], { offset: 4 }) || check([77, 52, 65, 32])) {
      return {
        ext: "m4a",
        mime: "audio/m4a"
      };
    }
    if (check([79, 112, 117, 115, 72, 101, 97, 100], { offset: 28 })) {
      return {
        ext: "opus",
        mime: "audio/opus"
      };
    }
    if (check([79, 103, 103, 83])) {
      return {
        ext: "ogg",
        mime: "audio/ogg"
      };
    }
    if (check([102, 76, 97, 67])) {
      return {
        ext: "flac",
        mime: "audio/x-flac"
      };
    }
    if (check([82, 73, 70, 70]) && check([87, 65, 86, 69], { offset: 8 })) {
      return {
        ext: "wav",
        mime: "audio/x-wav"
      };
    }
    if (check([35, 33, 65, 77, 82, 10])) {
      return {
        ext: "amr",
        mime: "audio/amr"
      };
    }
    if (check([37, 80, 68, 70])) {
      return {
        ext: "pdf",
        mime: "application/pdf"
      };
    }
    if (check([77, 90])) {
      return {
        ext: "exe",
        mime: "application/x-msdownload"
      };
    }
    if ((buf[0] === 67 || buf[0] === 70) && check([87, 83], { offset: 1 })) {
      return {
        ext: "swf",
        mime: "application/x-shockwave-flash"
      };
    }
    if (check([123, 92, 114, 116, 102])) {
      return {
        ext: "rtf",
        mime: "application/rtf"
      };
    }
    if (check([0, 97, 115, 109])) {
      return {
        ext: "wasm",
        mime: "application/wasm"
      };
    }
    if (check([119, 79, 70, 70]) && (check([0, 1, 0, 0], { offset: 4 }) || check([79, 84, 84, 79], { offset: 4 }))) {
      return {
        ext: "woff",
        mime: "font/woff"
      };
    }
    if (check([119, 79, 70, 50]) && (check([0, 1, 0, 0], { offset: 4 }) || check([79, 84, 84, 79], { offset: 4 }))) {
      return {
        ext: "woff2",
        mime: "font/woff2"
      };
    }
    if (check([76, 80], { offset: 34 }) && (check([0, 0, 1], { offset: 8 }) || check([1, 0, 2], { offset: 8 }) || check([2, 0, 2], { offset: 8 }))) {
      return {
        ext: "eot",
        mime: "application/octet-stream"
      };
    }
    if (check([0, 1, 0, 0, 0])) {
      return {
        ext: "ttf",
        mime: "font/ttf"
      };
    }
    if (check([79, 84, 84, 79, 0])) {
      return {
        ext: "otf",
        mime: "font/otf"
      };
    }
    if (check([0, 0, 1, 0])) {
      return {
        ext: "ico",
        mime: "image/x-icon"
      };
    }
    if (check([70, 76, 86, 1])) {
      return {
        ext: "flv",
        mime: "video/x-flv"
      };
    }
    if (check([37, 33])) {
      return {
        ext: "ps",
        mime: "application/postscript"
      };
    }
    if (check([253, 55, 122, 88, 90, 0])) {
      return {
        ext: "xz",
        mime: "application/x-xz"
      };
    }
    if (check([83, 81, 76, 105])) {
      return {
        ext: "sqlite",
        mime: "application/x-sqlite3"
      };
    }
    if (check([78, 69, 83, 26])) {
      return {
        ext: "nes",
        mime: "application/x-nintendo-nes-rom"
      };
    }
    if (check([67, 114, 50, 52])) {
      return {
        ext: "crx",
        mime: "application/x-google-chrome-extension"
      };
    }
    if (check([77, 83, 67, 70]) || check([73, 83, 99, 40])) {
      return {
        ext: "cab",
        mime: "application/vnd.ms-cab-compressed"
      };
    }
    if (check([33, 60, 97, 114, 99, 104, 62, 10, 100, 101, 98, 105, 97, 110, 45, 98, 105, 110, 97, 114, 121])) {
      return {
        ext: "deb",
        mime: "application/x-deb"
      };
    }
    if (check([33, 60, 97, 114, 99, 104, 62])) {
      return {
        ext: "ar",
        mime: "application/x-unix-archive"
      };
    }
    if (check([237, 171, 238, 219])) {
      return {
        ext: "rpm",
        mime: "application/x-rpm"
      };
    }
    if (check([31, 160]) || check([31, 157])) {
      return {
        ext: "Z",
        mime: "application/x-compress"
      };
    }
    if (check([76, 90, 73, 80])) {
      return {
        ext: "lz",
        mime: "application/x-lzip"
      };
    }
    if (check([208, 207, 17, 224, 161, 177, 26, 225])) {
      return {
        ext: "msi",
        mime: "application/x-msi"
      };
    }
    if (check([6, 14, 43, 52, 2, 5, 1, 1, 13, 1, 2, 1, 1, 2])) {
      return {
        ext: "mxf",
        mime: "application/mxf"
      };
    }
    if (check([71], { offset: 4 }) && (check([71], { offset: 192 }) || check([71], { offset: 196 }))) {
      return {
        ext: "mts",
        mime: "video/mp2t"
      };
    }
    if (check([66, 76, 69, 78, 68, 69, 82])) {
      return {
        ext: "blend",
        mime: "application/x-blender"
      };
    }
    if (check([66, 80, 71, 251])) {
      return {
        ext: "bpg",
        mime: "image/bpg"
      };
    }
    return null;
  };
  return fileType$2;
}
var isStream = { exports: {} };
var hasRequiredIsStream;
function requireIsStream() {
  if (hasRequiredIsStream) return isStream.exports;
  hasRequiredIsStream = 1;
  var isStream$1 = isStream.exports = function(stream2) {
    return stream2 !== null && typeof stream2 === "object" && typeof stream2.pipe === "function";
  };
  isStream$1.writable = function(stream2) {
    return isStream$1(stream2) && stream2.writable !== false && typeof stream2._write === "function" && typeof stream2._writableState === "object";
  };
  isStream$1.readable = function(stream2) {
    return isStream$1(stream2) && stream2.readable !== false && typeof stream2._read === "function" && typeof stream2._readableState === "object";
  };
  isStream$1.duplex = function(stream2) {
    return isStream$1.writable(stream2) && isStream$1.readable(stream2);
  };
  isStream$1.transform = function(stream2) {
    return isStream$1.duplex(stream2) && typeof stream2._transform === "function" && typeof stream2._transformState === "object";
  };
  return isStream.exports;
}
var tarStream = {};
var readable = { exports: {} };
var processNextickArgs = { exports: {} };
var hasRequiredProcessNextickArgs;
function requireProcessNextickArgs() {
  if (hasRequiredProcessNextickArgs) return processNextickArgs.exports;
  hasRequiredProcessNextickArgs = 1;
  if (typeof process === "undefined" || !process.version || process.version.indexOf("v0.") === 0 || process.version.indexOf("v1.") === 0 && process.version.indexOf("v1.8.") !== 0) {
    processNextickArgs.exports = { nextTick };
  } else {
    processNextickArgs.exports = process;
  }
  function nextTick(fn, arg1, arg2, arg3) {
    if (typeof fn !== "function") {
      throw new TypeError('"callback" argument must be a function');
    }
    var len = arguments.length;
    var args, i;
    switch (len) {
      case 0:
      case 1:
        return process.nextTick(fn);
      case 2:
        return process.nextTick(function afterTickOne() {
          fn.call(null, arg1);
        });
      case 3:
        return process.nextTick(function afterTickTwo() {
          fn.call(null, arg1, arg2);
        });
      case 4:
        return process.nextTick(function afterTickThree() {
          fn.call(null, arg1, arg2, arg3);
        });
      default:
        args = new Array(len - 1);
        i = 0;
        while (i < args.length) {
          args[i++] = arguments[i];
        }
        return process.nextTick(function afterTick() {
          fn.apply(null, args);
        });
    }
  }
  return processNextickArgs.exports;
}
var isarray;
var hasRequiredIsarray;
function requireIsarray() {
  if (hasRequiredIsarray) return isarray;
  hasRequiredIsarray = 1;
  var toString = {}.toString;
  isarray = Array.isArray || function(arr) {
    return toString.call(arr) == "[object Array]";
  };
  return isarray;
}
var stream$1;
var hasRequiredStream$1;
function requireStream$1() {
  if (hasRequiredStream$1) return stream$1;
  hasRequiredStream$1 = 1;
  stream$1 = require$$0$1;
  return stream$1;
}
var safeBuffer$2 = { exports: {} };
var hasRequiredSafeBuffer$2;
function requireSafeBuffer$2() {
  if (hasRequiredSafeBuffer$2) return safeBuffer$2.exports;
  hasRequiredSafeBuffer$2 = 1;
  (function(module, exports) {
    var buffer = require$$0$3;
    var Buffer2 = buffer.Buffer;
    function copyProps(src, dst) {
      for (var key in src) {
        dst[key] = src[key];
      }
    }
    if (Buffer2.from && Buffer2.alloc && Buffer2.allocUnsafe && Buffer2.allocUnsafeSlow) {
      module.exports = buffer;
    } else {
      copyProps(buffer, exports);
      exports.Buffer = SafeBuffer;
    }
    function SafeBuffer(arg, encodingOrOffset, length) {
      return Buffer2(arg, encodingOrOffset, length);
    }
    copyProps(Buffer2, SafeBuffer);
    SafeBuffer.from = function(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        throw new TypeError("Argument must not be a number");
      }
      return Buffer2(arg, encodingOrOffset, length);
    };
    SafeBuffer.alloc = function(size, fill, encoding) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      var buf = Buffer2(size);
      if (fill !== void 0) {
        if (typeof encoding === "string") {
          buf.fill(fill, encoding);
        } else {
          buf.fill(fill);
        }
      } else {
        buf.fill(0);
      }
      return buf;
    };
    SafeBuffer.allocUnsafe = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return Buffer2(size);
    };
    SafeBuffer.allocUnsafeSlow = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return buffer.SlowBuffer(size);
    };
  })(safeBuffer$2, safeBuffer$2.exports);
  return safeBuffer$2.exports;
}
var util = {};
var hasRequiredUtil;
function requireUtil() {
  if (hasRequiredUtil) return util;
  hasRequiredUtil = 1;
  function isArray(arg) {
    if (Array.isArray) {
      return Array.isArray(arg);
    }
    return objectToString(arg) === "[object Array]";
  }
  util.isArray = isArray;
  function isBoolean(arg) {
    return typeof arg === "boolean";
  }
  util.isBoolean = isBoolean;
  function isNull(arg) {
    return arg === null;
  }
  util.isNull = isNull;
  function isNullOrUndefined(arg) {
    return arg == null;
  }
  util.isNullOrUndefined = isNullOrUndefined;
  function isNumber(arg) {
    return typeof arg === "number";
  }
  util.isNumber = isNumber;
  function isString(arg) {
    return typeof arg === "string";
  }
  util.isString = isString;
  function isSymbol(arg) {
    return typeof arg === "symbol";
  }
  util.isSymbol = isSymbol;
  function isUndefined(arg) {
    return arg === void 0;
  }
  util.isUndefined = isUndefined;
  function isRegExp(re) {
    return objectToString(re) === "[object RegExp]";
  }
  util.isRegExp = isRegExp;
  function isObject(arg) {
    return typeof arg === "object" && arg !== null;
  }
  util.isObject = isObject;
  function isDate(d) {
    return objectToString(d) === "[object Date]";
  }
  util.isDate = isDate;
  function isError(e) {
    return objectToString(e) === "[object Error]" || e instanceof Error;
  }
  util.isError = isError;
  function isFunction(arg) {
    return typeof arg === "function";
  }
  util.isFunction = isFunction;
  function isPrimitive(arg) {
    return arg === null || typeof arg === "boolean" || typeof arg === "number" || typeof arg === "string" || typeof arg === "symbol" || // ES6 symbol
    typeof arg === "undefined";
  }
  util.isPrimitive = isPrimitive;
  util.isBuffer = require$$0$3.Buffer.isBuffer;
  function objectToString(o) {
    return Object.prototype.toString.call(o);
  }
  return util;
}
var inherits = { exports: {} };
var inherits_browser = { exports: {} };
var hasRequiredInherits_browser;
function requireInherits_browser() {
  if (hasRequiredInherits_browser) return inherits_browser.exports;
  hasRequiredInherits_browser = 1;
  if (typeof Object.create === "function") {
    inherits_browser.exports = function inherits2(ctor, superCtor) {
      if (superCtor) {
        ctor.super_ = superCtor;
        ctor.prototype = Object.create(superCtor.prototype, {
          constructor: {
            value: ctor,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
      }
    };
  } else {
    inherits_browser.exports = function inherits2(ctor, superCtor) {
      if (superCtor) {
        ctor.super_ = superCtor;
        var TempCtor = function() {
        };
        TempCtor.prototype = superCtor.prototype;
        ctor.prototype = new TempCtor();
        ctor.prototype.constructor = ctor;
      }
    };
  }
  return inherits_browser.exports;
}
var hasRequiredInherits;
function requireInherits() {
  if (hasRequiredInherits) return inherits.exports;
  hasRequiredInherits = 1;
  try {
    var util2 = require2("util");
    if (typeof util2.inherits !== "function") throw "";
    inherits.exports = util2.inherits;
  } catch (e) {
    inherits.exports = requireInherits_browser();
  }
  return inherits.exports;
}
var BufferList = { exports: {} };
var hasRequiredBufferList;
function requireBufferList() {
  if (hasRequiredBufferList) return BufferList.exports;
  hasRequiredBufferList = 1;
  (function(module) {
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    var Buffer2 = requireSafeBuffer$2().Buffer;
    var util2 = require$$1;
    function copyBuffer(src, target, offset) {
      src.copy(target, offset);
    }
    module.exports = function() {
      function BufferList2() {
        _classCallCheck(this, BufferList2);
        this.head = null;
        this.tail = null;
        this.length = 0;
      }
      BufferList2.prototype.push = function push(v) {
        var entry = { data: v, next: null };
        if (this.length > 0) this.tail.next = entry;
        else this.head = entry;
        this.tail = entry;
        ++this.length;
      };
      BufferList2.prototype.unshift = function unshift(v) {
        var entry = { data: v, next: this.head };
        if (this.length === 0) this.tail = entry;
        this.head = entry;
        ++this.length;
      };
      BufferList2.prototype.shift = function shift() {
        if (this.length === 0) return;
        var ret = this.head.data;
        if (this.length === 1) this.head = this.tail = null;
        else this.head = this.head.next;
        --this.length;
        return ret;
      };
      BufferList2.prototype.clear = function clear() {
        this.head = this.tail = null;
        this.length = 0;
      };
      BufferList2.prototype.join = function join2(s) {
        if (this.length === 0) return "";
        var p = this.head;
        var ret = "" + p.data;
        while (p = p.next) {
          ret += s + p.data;
        }
        return ret;
      };
      BufferList2.prototype.concat = function concat(n) {
        if (this.length === 0) return Buffer2.alloc(0);
        var ret = Buffer2.allocUnsafe(n >>> 0);
        var p = this.head;
        var i = 0;
        while (p) {
          copyBuffer(p.data, ret, i);
          i += p.data.length;
          p = p.next;
        }
        return ret;
      };
      return BufferList2;
    }();
    if (util2 && util2.inspect && util2.inspect.custom) {
      module.exports.prototype[util2.inspect.custom] = function() {
        var obj = util2.inspect({ length: this.length });
        return this.constructor.name + " " + obj;
      };
    }
  })(BufferList);
  return BufferList.exports;
}
var destroy_1;
var hasRequiredDestroy;
function requireDestroy() {
  if (hasRequiredDestroy) return destroy_1;
  hasRequiredDestroy = 1;
  var pna = requireProcessNextickArgs();
  function destroy(err, cb) {
    var _this = this;
    var readableDestroyed = this._readableState && this._readableState.destroyed;
    var writableDestroyed = this._writableState && this._writableState.destroyed;
    if (readableDestroyed || writableDestroyed) {
      if (cb) {
        cb(err);
      } else if (err) {
        if (!this._writableState) {
          pna.nextTick(emitErrorNT, this, err);
        } else if (!this._writableState.errorEmitted) {
          this._writableState.errorEmitted = true;
          pna.nextTick(emitErrorNT, this, err);
        }
      }
      return this;
    }
    if (this._readableState) {
      this._readableState.destroyed = true;
    }
    if (this._writableState) {
      this._writableState.destroyed = true;
    }
    this._destroy(err || null, function(err2) {
      if (!cb && err2) {
        if (!_this._writableState) {
          pna.nextTick(emitErrorNT, _this, err2);
        } else if (!_this._writableState.errorEmitted) {
          _this._writableState.errorEmitted = true;
          pna.nextTick(emitErrorNT, _this, err2);
        }
      } else if (cb) {
        cb(err2);
      }
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
  function emitErrorNT(self2, err) {
    self2.emit("error", err);
  }
  destroy_1 = {
    destroy,
    undestroy
  };
  return destroy_1;
}
var node;
var hasRequiredNode;
function requireNode() {
  if (hasRequiredNode) return node;
  hasRequiredNode = 1;
  node = require$$1.deprecate;
  return node;
}
var _stream_writable;
var hasRequired_stream_writable;
function require_stream_writable() {
  if (hasRequired_stream_writable) return _stream_writable;
  hasRequired_stream_writable = 1;
  var pna = requireProcessNextickArgs();
  _stream_writable = Writable;
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
  var util2 = Object.create(requireUtil());
  util2.inherits = requireInherits();
  var internalUtil = {
    deprecate: requireNode()
  };
  var Stream = requireStream$1();
  var Buffer2 = requireSafeBuffer$2().Buffer;
  var OurUint8Array = (typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : {}).Uint8Array || function() {
  };
  function _uint8ArrayToBuffer(chunk) {
    return Buffer2.from(chunk);
  }
  function _isUint8Array(obj) {
    return Buffer2.isBuffer(obj) || obj instanceof OurUint8Array;
  }
  var destroyImpl = requireDestroy();
  util2.inherits(Writable, Stream);
  function nop() {
  }
  function WritableState(options, stream2) {
    Duplex = Duplex || require_stream_duplex();
    options = options || {};
    var isDuplex = stream2 instanceof Duplex;
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
      onwrite(stream2, er);
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
      Object.defineProperty(WritableState.prototype, "buffer", {
        get: internalUtil.deprecate(function() {
          return this.getBuffer();
        }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
      });
    } catch (_) {
    }
  })();
  var realHasInstance;
  if (typeof Symbol === "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === "function") {
    realHasInstance = Function.prototype[Symbol.hasInstance];
    Object.defineProperty(Writable, Symbol.hasInstance, {
      value: function(object) {
        if (realHasInstance.call(this, object)) return true;
        if (this !== Writable) return false;
        return object && object._writableState instanceof WritableState;
      }
    });
  } else {
    realHasInstance = function(object) {
      return object instanceof this;
    };
  }
  function Writable(options) {
    Duplex = Duplex || require_stream_duplex();
    if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) {
      return new Writable(options);
    }
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
    this.emit("error", new Error("Cannot pipe, not readable"));
  };
  function writeAfterEnd(stream2, cb) {
    var er = new Error("write after end");
    stream2.emit("error", er);
    pna.nextTick(cb, er);
  }
  function validChunk(stream2, state, chunk, cb) {
    var valid = true;
    var er = false;
    if (chunk === null) {
      er = new TypeError("May not write null values to stream");
    } else if (typeof chunk !== "string" && chunk !== void 0 && !state.objectMode) {
      er = new TypeError("Invalid non-string/buffer chunk");
    }
    if (er) {
      stream2.emit("error", er);
      pna.nextTick(cb, er);
      valid = false;
    }
    return valid;
  }
  Writable.prototype.write = function(chunk, encoding, cb) {
    var state = this._writableState;
    var ret = false;
    var isBuf = !state.objectMode && _isUint8Array(chunk);
    if (isBuf && !Buffer2.isBuffer(chunk)) {
      chunk = _uint8ArrayToBuffer(chunk);
    }
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
    if (!(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((encoding + "").toLowerCase()) > -1)) throw new TypeError("Unknown encoding: " + encoding);
    this._writableState.defaultEncoding = encoding;
    return this;
  };
  function decodeChunk(state, chunk, encoding) {
    if (!state.objectMode && state.decodeStrings !== false && typeof chunk === "string") {
      chunk = Buffer2.from(chunk, encoding);
    }
    return chunk;
  }
  Object.defineProperty(Writable.prototype, "writableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function() {
      return this._writableState.highWaterMark;
    }
  });
  function writeOrBuffer(stream2, state, isBuf, chunk, encoding, cb) {
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
      if (last) {
        last.next = state.lastBufferedRequest;
      } else {
        state.bufferedRequest = state.lastBufferedRequest;
      }
      state.bufferedRequestCount += 1;
    } else {
      doWrite(stream2, state, false, len, chunk, encoding, cb);
    }
    return ret;
  }
  function doWrite(stream2, state, writev, len, chunk, encoding, cb) {
    state.writelen = len;
    state.writecb = cb;
    state.writing = true;
    state.sync = true;
    if (writev) stream2._writev(chunk, state.onwrite);
    else stream2._write(chunk, encoding, state.onwrite);
    state.sync = false;
  }
  function onwriteError(stream2, state, sync, er, cb) {
    --state.pendingcb;
    if (sync) {
      pna.nextTick(cb, er);
      pna.nextTick(finishMaybe, stream2, state);
      stream2._writableState.errorEmitted = true;
      stream2.emit("error", er);
    } else {
      cb(er);
      stream2._writableState.errorEmitted = true;
      stream2.emit("error", er);
      finishMaybe(stream2, state);
    }
  }
  function onwriteStateUpdate(state) {
    state.writing = false;
    state.writecb = null;
    state.length -= state.writelen;
    state.writelen = 0;
  }
  function onwrite(stream2, er) {
    var state = stream2._writableState;
    var sync = state.sync;
    var cb = state.writecb;
    onwriteStateUpdate(state);
    if (er) onwriteError(stream2, state, sync, er, cb);
    else {
      var finished = needFinish(state);
      if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
        clearBuffer(stream2, state);
      }
      if (sync) {
        asyncWrite(afterWrite, stream2, state, finished, cb);
      } else {
        afterWrite(stream2, state, finished, cb);
      }
    }
  }
  function afterWrite(stream2, state, finished, cb) {
    if (!finished) onwriteDrain(stream2, state);
    state.pendingcb--;
    cb();
    finishMaybe(stream2, state);
  }
  function onwriteDrain(stream2, state) {
    if (state.length === 0 && state.needDrain) {
      state.needDrain = false;
      stream2.emit("drain");
    }
  }
  function clearBuffer(stream2, state) {
    state.bufferProcessing = true;
    var entry = state.bufferedRequest;
    if (stream2._writev && entry && entry.next) {
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
      doWrite(stream2, state, true, state.length, buffer, "", holder.finish);
      state.pendingcb++;
      state.lastBufferedRequest = null;
      if (holder.next) {
        state.corkedRequestsFree = holder.next;
        holder.next = null;
      } else {
        state.corkedRequestsFree = new CorkedRequest(state);
      }
      state.bufferedRequestCount = 0;
    } else {
      while (entry) {
        var chunk = entry.chunk;
        var encoding = entry.encoding;
        var cb = entry.callback;
        var len = state.objectMode ? 1 : chunk.length;
        doWrite(stream2, state, false, len, chunk, encoding, cb);
        entry = entry.next;
        state.bufferedRequestCount--;
        if (state.writing) {
          break;
        }
      }
      if (entry === null) state.lastBufferedRequest = null;
    }
    state.bufferedRequest = entry;
    state.bufferProcessing = false;
  }
  Writable.prototype._write = function(chunk, encoding, cb) {
    cb(new Error("_write() is not implemented"));
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
  function callFinal(stream2, state) {
    stream2._final(function(err) {
      state.pendingcb--;
      if (err) {
        stream2.emit("error", err);
      }
      state.prefinished = true;
      stream2.emit("prefinish");
      finishMaybe(stream2, state);
    });
  }
  function prefinish(stream2, state) {
    if (!state.prefinished && !state.finalCalled) {
      if (typeof stream2._final === "function") {
        state.pendingcb++;
        state.finalCalled = true;
        pna.nextTick(callFinal, stream2, state);
      } else {
        state.prefinished = true;
        stream2.emit("prefinish");
      }
    }
  }
  function finishMaybe(stream2, state) {
    var need = needFinish(state);
    if (need) {
      prefinish(stream2, state);
      if (state.pendingcb === 0) {
        state.finished = true;
        stream2.emit("finish");
      }
    }
    return need;
  }
  function endWritable(stream2, state, cb) {
    state.ending = true;
    finishMaybe(stream2, state);
    if (cb) {
      if (state.finished) pna.nextTick(cb);
      else stream2.once("finish", cb);
    }
    state.ended = true;
    stream2.writable = false;
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
      if (this._writableState === void 0) {
        return false;
      }
      return this._writableState.destroyed;
    },
    set: function(value) {
      if (!this._writableState) {
        return;
      }
      this._writableState.destroyed = value;
    }
  });
  Writable.prototype.destroy = destroyImpl.destroy;
  Writable.prototype._undestroy = destroyImpl.undestroy;
  Writable.prototype._destroy = function(err, cb) {
    this.end();
    cb(err);
  };
  return _stream_writable;
}
var _stream_duplex;
var hasRequired_stream_duplex;
function require_stream_duplex() {
  if (hasRequired_stream_duplex) return _stream_duplex;
  hasRequired_stream_duplex = 1;
  var pna = requireProcessNextickArgs();
  var objectKeys = Object.keys || function(obj) {
    var keys2 = [];
    for (var key in obj) {
      keys2.push(key);
    }
    return keys2;
  };
  _stream_duplex = Duplex;
  var util2 = Object.create(requireUtil());
  util2.inherits = requireInherits();
  var Readable = require_stream_readable();
  var Writable = require_stream_writable();
  util2.inherits(Duplex, Readable);
  {
    var keys = objectKeys(Writable.prototype);
    for (var v = 0; v < keys.length; v++) {
      var method = keys[v];
      if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
    }
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
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function() {
      return this._writableState.highWaterMark;
    }
  });
  function onend() {
    if (this.allowHalfOpen || this._writableState.ended) return;
    pna.nextTick(onEndNT, this);
  }
  function onEndNT(self2) {
    self2.end();
  }
  Object.defineProperty(Duplex.prototype, "destroyed", {
    get: function() {
      if (this._readableState === void 0 || this._writableState === void 0) {
        return false;
      }
      return this._readableState.destroyed && this._writableState.destroyed;
    },
    set: function(value) {
      if (this._readableState === void 0 || this._writableState === void 0) {
        return;
      }
      this._readableState.destroyed = value;
      this._writableState.destroyed = value;
    }
  });
  Duplex.prototype._destroy = function(err, cb) {
    this.push(null);
    this.end();
    pna.nextTick(cb, err);
  };
  return _stream_duplex;
}
var string_decoder = {};
var safeBuffer$1 = { exports: {} };
var hasRequiredSafeBuffer$1;
function requireSafeBuffer$1() {
  if (hasRequiredSafeBuffer$1) return safeBuffer$1.exports;
  hasRequiredSafeBuffer$1 = 1;
  (function(module, exports) {
    var buffer = require$$0$3;
    var Buffer2 = buffer.Buffer;
    function copyProps(src, dst) {
      for (var key in src) {
        dst[key] = src[key];
      }
    }
    if (Buffer2.from && Buffer2.alloc && Buffer2.allocUnsafe && Buffer2.allocUnsafeSlow) {
      module.exports = buffer;
    } else {
      copyProps(buffer, exports);
      exports.Buffer = SafeBuffer;
    }
    function SafeBuffer(arg, encodingOrOffset, length) {
      return Buffer2(arg, encodingOrOffset, length);
    }
    copyProps(Buffer2, SafeBuffer);
    SafeBuffer.from = function(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        throw new TypeError("Argument must not be a number");
      }
      return Buffer2(arg, encodingOrOffset, length);
    };
    SafeBuffer.alloc = function(size, fill, encoding) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      var buf = Buffer2(size);
      if (fill !== void 0) {
        if (typeof encoding === "string") {
          buf.fill(fill, encoding);
        } else {
          buf.fill(fill);
        }
      } else {
        buf.fill(0);
      }
      return buf;
    };
    SafeBuffer.allocUnsafe = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return Buffer2(size);
    };
    SafeBuffer.allocUnsafeSlow = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return buffer.SlowBuffer(size);
    };
  })(safeBuffer$1, safeBuffer$1.exports);
  return safeBuffer$1.exports;
}
var hasRequiredString_decoder;
function requireString_decoder() {
  if (hasRequiredString_decoder) return string_decoder;
  hasRequiredString_decoder = 1;
  var Buffer2 = requireSafeBuffer$1().Buffer;
  var isEncoding = Buffer2.isEncoding || function(encoding) {
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
      case "raw":
        return true;
      default:
        return false;
    }
  };
  function _normalizeEncoding(enc) {
    if (!enc) return "utf8";
    var retried;
    while (true) {
      switch (enc) {
        case "utf8":
        case "utf-8":
          return "utf8";
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return "utf16le";
        case "latin1":
        case "binary":
          return "latin1";
        case "base64":
        case "ascii":
        case "hex":
          return enc;
        default:
          if (retried) return;
          enc = ("" + enc).toLowerCase();
          retried = true;
      }
    }
  }
  function normalizeEncoding(enc) {
    var nenc = _normalizeEncoding(enc);
    if (typeof nenc !== "string" && (Buffer2.isEncoding === isEncoding || !isEncoding(enc))) throw new Error("Unknown encoding: " + enc);
    return nenc || enc;
  }
  string_decoder.StringDecoder = StringDecoder;
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
    this.lastChar = Buffer2.allocUnsafe(nb);
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
    } else {
      i = 0;
    }
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
  function utf8CheckIncomplete(self2, buf, i) {
    var j = buf.length - 1;
    if (j < i) return 0;
    var nb = utf8CheckByte(buf[j]);
    if (nb >= 0) {
      if (nb > 0) self2.lastNeed = nb - 1;
      return nb;
    }
    if (--j < i || nb === -2) return 0;
    nb = utf8CheckByte(buf[j]);
    if (nb >= 0) {
      if (nb > 0) self2.lastNeed = nb - 2;
      return nb;
    }
    if (--j < i || nb === -2) return 0;
    nb = utf8CheckByte(buf[j]);
    if (nb >= 0) {
      if (nb > 0) {
        if (nb === 2) nb = 0;
        else self2.lastNeed = nb - 3;
      }
      return nb;
    }
    return 0;
  }
  function utf8CheckExtraBytes(self2, buf, p) {
    if ((buf[0] & 192) !== 128) {
      self2.lastNeed = 0;
      return "�";
    }
    if (self2.lastNeed > 1 && buf.length > 1) {
      if ((buf[1] & 192) !== 128) {
        self2.lastNeed = 1;
        return "�";
      }
      if (self2.lastNeed > 2 && buf.length > 2) {
        if ((buf[2] & 192) !== 128) {
          self2.lastNeed = 2;
          return "�";
        }
      }
    }
  }
  function utf8FillLast(buf) {
    var p = this.lastTotal - this.lastNeed;
    var r = utf8CheckExtraBytes(this, buf);
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
    if (n === 1) {
      this.lastChar[0] = buf[buf.length - 1];
    } else {
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
  return string_decoder;
}
var _stream_readable;
var hasRequired_stream_readable;
function require_stream_readable() {
  if (hasRequired_stream_readable) return _stream_readable;
  hasRequired_stream_readable = 1;
  var pna = requireProcessNextickArgs();
  _stream_readable = Readable;
  var isArray = requireIsarray();
  var Duplex;
  Readable.ReadableState = ReadableState;
  require$$2$1.EventEmitter;
  var EElistenerCount = function(emitter, type) {
    return emitter.listeners(type).length;
  };
  var Stream = requireStream$1();
  var Buffer2 = requireSafeBuffer$2().Buffer;
  var OurUint8Array = (typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : {}).Uint8Array || function() {
  };
  function _uint8ArrayToBuffer(chunk) {
    return Buffer2.from(chunk);
  }
  function _isUint8Array(obj) {
    return Buffer2.isBuffer(obj) || obj instanceof OurUint8Array;
  }
  var util2 = Object.create(requireUtil());
  util2.inherits = requireInherits();
  var debugUtil = require$$1;
  var debug = void 0;
  if (debugUtil && debugUtil.debuglog) {
    debug = debugUtil.debuglog("stream");
  } else {
    debug = function() {
    };
  }
  var BufferList2 = requireBufferList();
  var destroyImpl = requireDestroy();
  var StringDecoder;
  util2.inherits(Readable, Stream);
  var kProxyEvents = ["error", "close", "destroy", "pause", "resume"];
  function prependListener(emitter, event, fn) {
    if (typeof emitter.prependListener === "function") return emitter.prependListener(event, fn);
    if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);
    else if (isArray(emitter._events[event])) emitter._events[event].unshift(fn);
    else emitter._events[event] = [fn, emitter._events[event]];
  }
  function ReadableState(options, stream2) {
    Duplex = Duplex || require_stream_duplex();
    options = options || {};
    var isDuplex = stream2 instanceof Duplex;
    this.objectMode = !!options.objectMode;
    if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode;
    var hwm = options.highWaterMark;
    var readableHwm = options.readableHighWaterMark;
    var defaultHwm = this.objectMode ? 16 : 16 * 1024;
    if (hwm || hwm === 0) this.highWaterMark = hwm;
    else if (isDuplex && (readableHwm || readableHwm === 0)) this.highWaterMark = readableHwm;
    else this.highWaterMark = defaultHwm;
    this.highWaterMark = Math.floor(this.highWaterMark);
    this.buffer = new BufferList2();
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
      if (!StringDecoder) StringDecoder = requireString_decoder().StringDecoder;
      this.decoder = new StringDecoder(options.encoding);
      this.encoding = options.encoding;
    }
  }
  function Readable(options) {
    Duplex = Duplex || require_stream_duplex();
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
      if (this._readableState === void 0) {
        return false;
      }
      return this._readableState.destroyed;
    },
    set: function(value) {
      if (!this._readableState) {
        return;
      }
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
          chunk = Buffer2.from(chunk, encoding);
          encoding = "";
        }
        skipChunkCheck = true;
      }
    } else {
      skipChunkCheck = true;
    }
    return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
  };
  Readable.prototype.unshift = function(chunk) {
    return readableAddChunk(this, chunk, null, true, false);
  };
  function readableAddChunk(stream2, chunk, encoding, addToFront, skipChunkCheck) {
    var state = stream2._readableState;
    if (chunk === null) {
      state.reading = false;
      onEofChunk(stream2, state);
    } else {
      var er;
      if (!skipChunkCheck) er = chunkInvalid(state, chunk);
      if (er) {
        stream2.emit("error", er);
      } else if (state.objectMode || chunk && chunk.length > 0) {
        if (typeof chunk !== "string" && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer2.prototype) {
          chunk = _uint8ArrayToBuffer(chunk);
        }
        if (addToFront) {
          if (state.endEmitted) stream2.emit("error", new Error("stream.unshift() after end event"));
          else addChunk(stream2, state, chunk, true);
        } else if (state.ended) {
          stream2.emit("error", new Error("stream.push() after EOF"));
        } else {
          state.reading = false;
          if (state.decoder && !encoding) {
            chunk = state.decoder.write(chunk);
            if (state.objectMode || chunk.length !== 0) addChunk(stream2, state, chunk, false);
            else maybeReadMore(stream2, state);
          } else {
            addChunk(stream2, state, chunk, false);
          }
        }
      } else if (!addToFront) {
        state.reading = false;
      }
    }
    return needMoreData(state);
  }
  function addChunk(stream2, state, chunk, addToFront) {
    if (state.flowing && state.length === 0 && !state.sync) {
      stream2.emit("data", chunk);
      stream2.read(0);
    } else {
      state.length += state.objectMode ? 1 : chunk.length;
      if (addToFront) state.buffer.unshift(chunk);
      else state.buffer.push(chunk);
      if (state.needReadable) emitReadable(stream2);
    }
    maybeReadMore(stream2, state);
  }
  function chunkInvalid(state, chunk) {
    var er;
    if (!_isUint8Array(chunk) && typeof chunk !== "string" && chunk !== void 0 && !state.objectMode) {
      er = new TypeError("Invalid non-string/buffer chunk");
    }
    return er;
  }
  function needMoreData(state) {
    return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
  }
  Readable.prototype.isPaused = function() {
    return this._readableState.flowing === false;
  };
  Readable.prototype.setEncoding = function(enc) {
    if (!StringDecoder) StringDecoder = requireString_decoder().StringDecoder;
    this._readableState.decoder = new StringDecoder(enc);
    this._readableState.encoding = enc;
    return this;
  };
  var MAX_HWM = 8388608;
  function computeNewHighWaterMark(n) {
    if (n >= MAX_HWM) {
      n = MAX_HWM;
    } else {
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
    if (n !== n) {
      if (state.flowing && state.length) return state.buffer.head.data.length;
      else return state.length;
    }
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
    } else {
      state.length -= n;
    }
    if (state.length === 0) {
      if (!state.ended) state.needReadable = true;
      if (nOrig !== n && state.ended) endReadable(this);
    }
    if (ret !== null) this.emit("data", ret);
    return ret;
  };
  function onEofChunk(stream2, state) {
    if (state.ended) return;
    if (state.decoder) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) {
        state.buffer.push(chunk);
        state.length += state.objectMode ? 1 : chunk.length;
      }
    }
    state.ended = true;
    emitReadable(stream2);
  }
  function emitReadable(stream2) {
    var state = stream2._readableState;
    state.needReadable = false;
    if (!state.emittedReadable) {
      debug("emitReadable", state.flowing);
      state.emittedReadable = true;
      if (state.sync) pna.nextTick(emitReadable_, stream2);
      else emitReadable_(stream2);
    }
  }
  function emitReadable_(stream2) {
    debug("emit readable");
    stream2.emit("readable");
    flow(stream2);
  }
  function maybeReadMore(stream2, state) {
    if (!state.readingMore) {
      state.readingMore = true;
      pna.nextTick(maybeReadMore_, stream2, state);
    }
  }
  function maybeReadMore_(stream2, state) {
    var len = state.length;
    while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
      debug("maybeReadMore read 0");
      stream2.read(0);
      if (len === state.length)
        break;
      else len = state.length;
    }
    state.readingMore = false;
  }
  Readable.prototype._read = function(n) {
    this.emit("error", new Error("_read() is not implemented"));
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
    var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
    var endFn = doEnd ? onend : unpipe;
    if (state.endEmitted) pna.nextTick(endFn);
    else src.once("end", endFn);
    dest.on("unpipe", onunpipe);
    function onunpipe(readable2, unpipeInfo) {
      debug("onunpipe");
      if (readable2 === src) {
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
      var ret = dest.write(chunk);
      if (false === ret && !increasedAwaitDrain) {
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
      for (var i = 0; i < len; i++) {
        dests[i].emit("unpipe", this, { hasUnpiped: false });
      }
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
        if (!state.reading) {
          pna.nextTick(nReadingNextTick, this);
        } else if (state.length) {
          emitReadable(this);
        }
      }
    }
    return res;
  };
  Readable.prototype.addListener = Readable.prototype.on;
  function nReadingNextTick(self2) {
    debug("readable nexttick read 0");
    self2.read(0);
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
  function resume(stream2, state) {
    if (!state.resumeScheduled) {
      state.resumeScheduled = true;
      pna.nextTick(resume_, stream2, state);
    }
  }
  function resume_(stream2, state) {
    if (!state.reading) {
      debug("resume read 0");
      stream2.read(0);
    }
    state.resumeScheduled = false;
    state.awaitDrain = 0;
    stream2.emit("resume");
    flow(stream2);
    if (state.flowing && !state.reading) stream2.read(0);
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
  function flow(stream2) {
    var state = stream2._readableState;
    debug("flow", state.flowing);
    while (state.flowing && stream2.read() !== null) {
    }
  }
  Readable.prototype.wrap = function(stream2) {
    var _this = this;
    var state = this._readableState;
    var paused = false;
    stream2.on("end", function() {
      debug("wrapped end");
      if (state.decoder && !state.ended) {
        var chunk = state.decoder.end();
        if (chunk && chunk.length) _this.push(chunk);
      }
      _this.push(null);
    });
    stream2.on("data", function(chunk) {
      debug("wrapped data");
      if (state.decoder) chunk = state.decoder.write(chunk);
      if (state.objectMode && (chunk === null || chunk === void 0)) return;
      else if (!state.objectMode && (!chunk || !chunk.length)) return;
      var ret = _this.push(chunk);
      if (!ret) {
        paused = true;
        stream2.pause();
      }
    });
    for (var i in stream2) {
      if (this[i] === void 0 && typeof stream2[i] === "function") {
        this[i] = /* @__PURE__ */ function(method) {
          return function() {
            return stream2[method].apply(stream2, arguments);
          };
        }(i);
      }
    }
    for (var n = 0; n < kProxyEvents.length; n++) {
      stream2.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
    }
    this._read = function(n2) {
      debug("wrapped _read", n2);
      if (paused) {
        paused = false;
        stream2.resume();
      }
    };
    return this;
  };
  Object.defineProperty(Readable.prototype, "readableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
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
    } else {
      ret = fromListPartial(n, state.buffer, state.decoder);
    }
    return ret;
  }
  function fromListPartial(n, list, hasStrings) {
    var ret;
    if (n < list.head.data.length) {
      ret = list.head.data.slice(0, n);
      list.head.data = list.head.data.slice(n);
    } else if (n === list.head.data.length) {
      ret = list.shift();
    } else {
      ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
    }
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
    var ret = Buffer2.allocUnsafe(n);
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
  function endReadable(stream2) {
    var state = stream2._readableState;
    if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');
    if (!state.endEmitted) {
      state.ended = true;
      pna.nextTick(endReadableNT, state, stream2);
    }
  }
  function endReadableNT(state, stream2) {
    if (!state.endEmitted && state.length === 0) {
      state.endEmitted = true;
      stream2.readable = false;
      stream2.emit("end");
    }
  }
  function indexOf(xs, x) {
    for (var i = 0, l = xs.length; i < l; i++) {
      if (xs[i] === x) return i;
    }
    return -1;
  }
  return _stream_readable;
}
var _stream_transform;
var hasRequired_stream_transform;
function require_stream_transform() {
  if (hasRequired_stream_transform) return _stream_transform;
  hasRequired_stream_transform = 1;
  _stream_transform = Transform;
  var Duplex = require_stream_duplex();
  var util2 = Object.create(requireUtil());
  util2.inherits = requireInherits();
  util2.inherits(Transform, Duplex);
  function afterTransform(er, data) {
    var ts = this._transformState;
    ts.transforming = false;
    var cb = ts.writecb;
    if (!cb) {
      return this.emit("error", new Error("write callback called multiple times"));
    }
    ts.writechunk = null;
    ts.writecb = null;
    if (data != null)
      this.push(data);
    cb(er);
    var rs = this._readableState;
    rs.reading = false;
    if (rs.needReadable || rs.length < rs.highWaterMark) {
      this._read(rs.highWaterMark);
    }
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
    if (typeof this._flush === "function") {
      this._flush(function(er, data) {
        done(_this, er, data);
      });
    } else {
      done(this, null, null);
    }
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
    } else {
      ts.needTransform = true;
    }
  };
  Transform.prototype._destroy = function(err, cb) {
    var _this2 = this;
    Duplex.prototype._destroy.call(this, err, function(err2) {
      cb(err2);
      _this2.emit("close");
    });
  };
  function done(stream2, er, data) {
    if (er) return stream2.emit("error", er);
    if (data != null)
      stream2.push(data);
    if (stream2._writableState.length) throw new Error("Calling transform done when ws.length != 0");
    if (stream2._transformState.transforming) throw new Error("Calling transform done when still transforming");
    return stream2.push(null);
  }
  return _stream_transform;
}
var _stream_passthrough;
var hasRequired_stream_passthrough;
function require_stream_passthrough() {
  if (hasRequired_stream_passthrough) return _stream_passthrough;
  hasRequired_stream_passthrough = 1;
  _stream_passthrough = PassThrough;
  var Transform = require_stream_transform();
  var util2 = Object.create(requireUtil());
  util2.inherits = requireInherits();
  util2.inherits(PassThrough, Transform);
  function PassThrough(options) {
    if (!(this instanceof PassThrough)) return new PassThrough(options);
    Transform.call(this, options);
  }
  PassThrough.prototype._transform = function(chunk, encoding, cb) {
    cb(null, chunk);
  };
  return _stream_passthrough;
}
var hasRequiredReadable;
function requireReadable() {
  if (hasRequiredReadable) return readable.exports;
  hasRequiredReadable = 1;
  (function(module, exports) {
    var Stream = require$$0$1;
    if (process.env.READABLE_STREAM === "disable" && Stream) {
      module.exports = Stream;
      exports = module.exports = Stream.Readable;
      exports.Readable = Stream.Readable;
      exports.Writable = Stream.Writable;
      exports.Duplex = Stream.Duplex;
      exports.Transform = Stream.Transform;
      exports.PassThrough = Stream.PassThrough;
      exports.Stream = Stream;
    } else {
      exports = module.exports = require_stream_readable();
      exports.Stream = Stream || exports;
      exports.Readable = exports;
      exports.Writable = require_stream_writable();
      exports.Duplex = require_stream_duplex();
      exports.Transform = require_stream_transform();
      exports.PassThrough = require_stream_passthrough();
    }
  })(readable, readable.exports);
  return readable.exports;
}
var duplex;
var hasRequiredDuplex;
function requireDuplex() {
  if (hasRequiredDuplex) return duplex;
  hasRequiredDuplex = 1;
  duplex = requireReadable().Duplex;
  return duplex;
}
var safeBuffer = { exports: {} };
/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
var hasRequiredSafeBuffer;
function requireSafeBuffer() {
  if (hasRequiredSafeBuffer) return safeBuffer.exports;
  hasRequiredSafeBuffer = 1;
  (function(module, exports) {
    var buffer = require$$0$3;
    var Buffer2 = buffer.Buffer;
    function copyProps(src, dst) {
      for (var key in src) {
        dst[key] = src[key];
      }
    }
    if (Buffer2.from && Buffer2.alloc && Buffer2.allocUnsafe && Buffer2.allocUnsafeSlow) {
      module.exports = buffer;
    } else {
      copyProps(buffer, exports);
      exports.Buffer = SafeBuffer;
    }
    function SafeBuffer(arg, encodingOrOffset, length) {
      return Buffer2(arg, encodingOrOffset, length);
    }
    SafeBuffer.prototype = Object.create(Buffer2.prototype);
    copyProps(Buffer2, SafeBuffer);
    SafeBuffer.from = function(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        throw new TypeError("Argument must not be a number");
      }
      return Buffer2(arg, encodingOrOffset, length);
    };
    SafeBuffer.alloc = function(size, fill, encoding) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      var buf = Buffer2(size);
      if (fill !== void 0) {
        if (typeof encoding === "string") {
          buf.fill(fill, encoding);
        } else {
          buf.fill(fill);
        }
      } else {
        buf.fill(0);
      }
      return buf;
    };
    SafeBuffer.allocUnsafe = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return Buffer2(size);
    };
    SafeBuffer.allocUnsafeSlow = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return buffer.SlowBuffer(size);
    };
  })(safeBuffer, safeBuffer.exports);
  return safeBuffer.exports;
}
var bl;
var hasRequiredBl;
function requireBl() {
  if (hasRequiredBl) return bl;
  hasRequiredBl = 1;
  var DuplexStream = requireDuplex(), util2 = require$$1, Buffer2 = requireSafeBuffer().Buffer;
  function BufferList2(callback) {
    if (!(this instanceof BufferList2))
      return new BufferList2(callback);
    this._bufs = [];
    this.length = 0;
    if (typeof callback == "function") {
      this._callback = callback;
      var piper = function piper2(err) {
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
    } else {
      this.append(callback);
    }
    DuplexStream.call(this);
  }
  util2.inherits(BufferList2, DuplexStream);
  BufferList2.prototype._offset = function _offset(offset) {
    var tot = 0, i = 0, _t;
    if (offset === 0) return [0, 0];
    for (; i < this._bufs.length; i++) {
      _t = tot + this._bufs[i].length;
      if (offset < _t || i == this._bufs.length - 1)
        return [i, offset - tot];
      tot = _t;
    }
  };
  BufferList2.prototype.append = function append(buf) {
    var i = 0;
    if (Buffer2.isBuffer(buf)) {
      this._appendBuffer(buf);
    } else if (Array.isArray(buf)) {
      for (; i < buf.length; i++)
        this.append(buf[i]);
    } else if (buf instanceof BufferList2) {
      for (; i < buf._bufs.length; i++)
        this.append(buf._bufs[i]);
    } else if (buf != null) {
      if (typeof buf == "number")
        buf = buf.toString();
      this._appendBuffer(Buffer2.from(buf));
    }
    return this;
  };
  BufferList2.prototype._appendBuffer = function appendBuffer(buf) {
    this._bufs.push(buf);
    this.length += buf.length;
  };
  BufferList2.prototype._write = function _write(buf, encoding, callback) {
    this._appendBuffer(buf);
    if (typeof callback == "function")
      callback();
  };
  BufferList2.prototype._read = function _read(size) {
    if (!this.length)
      return this.push(null);
    size = Math.min(size, this.length);
    this.push(this.slice(0, size));
    this.consume(size);
  };
  BufferList2.prototype.end = function end(chunk) {
    DuplexStream.prototype.end.call(this, chunk);
    if (this._callback) {
      this._callback(null, this.slice());
      this._callback = null;
    }
  };
  BufferList2.prototype.get = function get(index) {
    return this.slice(index, index + 1)[0];
  };
  BufferList2.prototype.slice = function slice(start, end) {
    if (typeof start == "number" && start < 0)
      start += this.length;
    if (typeof end == "number" && end < 0)
      end += this.length;
    return this.copy(null, 0, start, end);
  };
  BufferList2.prototype.copy = function copy(dst, dstStart, srcStart, srcEnd) {
    if (typeof srcStart != "number" || srcStart < 0)
      srcStart = 0;
    if (typeof srcEnd != "number" || srcEnd > this.length)
      srcEnd = this.length;
    if (srcStart >= this.length)
      return dst || Buffer2.alloc(0);
    if (srcEnd <= 0)
      return dst || Buffer2.alloc(0);
    var copy2 = !!dst, off = this._offset(srcStart), len = srcEnd - srcStart, bytes = len, bufoff = copy2 && dstStart || 0, start = off[1], l, i;
    if (srcStart === 0 && srcEnd == this.length) {
      if (!copy2) {
        return this._bufs.length === 1 ? this._bufs[0] : Buffer2.concat(this._bufs, this.length);
      }
      for (i = 0; i < this._bufs.length; i++) {
        this._bufs[i].copy(dst, bufoff);
        bufoff += this._bufs[i].length;
      }
      return dst;
    }
    if (bytes <= this._bufs[off[0]].length - start) {
      return copy2 ? this._bufs[off[0]].copy(dst, dstStart, start, start + bytes) : this._bufs[off[0]].slice(start, start + bytes);
    }
    if (!copy2)
      dst = Buffer2.allocUnsafe(len);
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
      if (start)
        start = 0;
    }
    if (dst.length > bufoff) return dst.slice(0, bufoff);
    return dst;
  };
  BufferList2.prototype.shallowSlice = function shallowSlice(start, end) {
    start = start || 0;
    end = end || this.length;
    if (start < 0)
      start += this.length;
    if (end < 0)
      end += this.length;
    var startOffset = this._offset(start), endOffset = this._offset(end), buffers = this._bufs.slice(startOffset[0], endOffset[0] + 1);
    if (endOffset[1] == 0)
      buffers.pop();
    else
      buffers[buffers.length - 1] = buffers[buffers.length - 1].slice(0, endOffset[1]);
    if (startOffset[1] != 0)
      buffers[0] = buffers[0].slice(startOffset[1]);
    return new BufferList2(buffers);
  };
  BufferList2.prototype.toString = function toString(encoding, start, end) {
    return this.slice(start, end).toString(encoding);
  };
  BufferList2.prototype.consume = function consume(bytes) {
    bytes = Math.trunc(bytes);
    if (Number.isNaN(bytes) || bytes <= 0) return this;
    while (this._bufs.length) {
      if (bytes >= this._bufs[0].length) {
        bytes -= this._bufs[0].length;
        this.length -= this._bufs[0].length;
        this._bufs.shift();
      } else {
        this._bufs[0] = this._bufs[0].slice(bytes);
        this.length -= bytes;
        break;
      }
    }
    return this;
  };
  BufferList2.prototype.duplicate = function duplicate() {
    var i = 0, copy = new BufferList2();
    for (; i < this._bufs.length; i++)
      copy.append(this._bufs[i]);
    return copy;
  };
  BufferList2.prototype.destroy = function destroy() {
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
    for (var m in methods) {
      (function(m2) {
        BufferList2.prototype[m2] = function(offset) {
          return this.slice(offset, offset + methods[m2])[m2](0);
        };
      })(m);
    }
  })();
  bl = BufferList2;
  return bl;
}
var immutable;
var hasRequiredImmutable;
function requireImmutable() {
  if (hasRequiredImmutable) return immutable;
  hasRequiredImmutable = 1;
  immutable = extend;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  function extend() {
    var target = {};
    for (var i = 0; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  }
  return immutable;
}
var headers = {};
var toBuffer_1;
var hasRequiredToBuffer;
function requireToBuffer() {
  if (hasRequiredToBuffer) return toBuffer_1;
  hasRequiredToBuffer = 1;
  toBuffer_1 = toBuffer;
  var makeBuffer = Buffer.from && Buffer.from !== Uint8Array.from ? Buffer.from : bufferFrom;
  function bufferFrom(buf, enc) {
    return new Buffer(buf, enc);
  }
  function toBuffer(buf, enc) {
    if (Buffer.isBuffer(buf)) return buf;
    if (typeof buf === "string") return makeBuffer(buf, enc);
    if (Array.isArray(buf)) return makeBuffer(buf);
    throw new Error("Input should be a buffer or a string");
  }
  return toBuffer_1;
}
var bufferFill;
var hasRequiredBufferFill;
function requireBufferFill() {
  if (hasRequiredBufferFill) return bufferFill;
  hasRequiredBufferFill = 1;
  var hasFullSupport = function() {
    try {
      if (!Buffer.isEncoding("latin1")) {
        return false;
      }
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
    if (start < 0 || end > buffer.length) {
      throw new RangeError("Out of range index");
    }
    start = start >>> 0;
    end = end === void 0 ? buffer.length : end >>> 0;
    if (end > start) {
      buffer.fill(val, start, end);
    }
    return buffer;
  }
  function fillWithBuffer(buffer, val, start, end) {
    if (start < 0 || end > buffer.length) {
      throw new RangeError("Out of range index");
    }
    if (end <= start) {
      return buffer;
    }
    start = start >>> 0;
    end = end === void 0 ? buffer.length : end >>> 0;
    var pos = start;
    var len = val.length;
    while (pos <= end - len) {
      val.copy(buffer, pos);
      pos += len;
    }
    if (pos !== end) {
      val.copy(buffer, pos, 0, end - pos);
    }
    return buffer;
  }
  function fill(buffer, val, start, end, encoding) {
    if (hasFullSupport) {
      return buffer.fill(val, start, end, encoding);
    }
    if (typeof val === "number") {
      return fillWithNumber(buffer, val, start, end);
    }
    if (typeof val === "string") {
      if (typeof start === "string") {
        encoding = start;
        start = 0;
        end = buffer.length;
      } else if (typeof end === "string") {
        encoding = end;
        end = buffer.length;
      }
      if (encoding !== void 0 && typeof encoding !== "string") {
        throw new TypeError("encoding must be a string");
      }
      if (encoding === "latin1") {
        encoding = "binary";
      }
      if (typeof encoding === "string" && !Buffer.isEncoding(encoding)) {
        throw new TypeError("Unknown encoding: " + encoding);
      }
      if (val === "") {
        return fillWithNumber(buffer, 0, start, end);
      }
      if (isSingleByte(val)) {
        return fillWithNumber(buffer, val.charCodeAt(0), start, end);
      }
      val = new Buffer(val, encoding);
    }
    if (Buffer.isBuffer(val)) {
      return fillWithBuffer(buffer, val, start, end);
    }
    return fillWithNumber(buffer, 0, start, end);
  }
  bufferFill = fill;
  return bufferFill;
}
var bufferAllocUnsafe;
var hasRequiredBufferAllocUnsafe;
function requireBufferAllocUnsafe() {
  if (hasRequiredBufferAllocUnsafe) return bufferAllocUnsafe;
  hasRequiredBufferAllocUnsafe = 1;
  function allocUnsafe(size) {
    if (typeof size !== "number") {
      throw new TypeError('"size" argument must be a number');
    }
    if (size < 0) {
      throw new RangeError('"size" argument must not be negative');
    }
    if (Buffer.allocUnsafe) {
      return Buffer.allocUnsafe(size);
    } else {
      return new Buffer(size);
    }
  }
  bufferAllocUnsafe = allocUnsafe;
  return bufferAllocUnsafe;
}
var bufferAlloc;
var hasRequiredBufferAlloc;
function requireBufferAlloc() {
  if (hasRequiredBufferAlloc) return bufferAlloc;
  hasRequiredBufferAlloc = 1;
  var bufferFill2 = requireBufferFill();
  var allocUnsafe = requireBufferAllocUnsafe();
  bufferAlloc = function alloc(size, fill, encoding) {
    if (typeof size !== "number") {
      throw new TypeError('"size" argument must be a number');
    }
    if (size < 0) {
      throw new RangeError('"size" argument must not be negative');
    }
    if (Buffer.alloc) {
      return Buffer.alloc(size, fill, encoding);
    }
    var buffer = allocUnsafe(size);
    if (size === 0) {
      return buffer;
    }
    if (fill === void 0) {
      return bufferFill2(buffer, 0);
    }
    if (typeof encoding !== "string") {
      encoding = void 0;
    }
    return bufferFill2(buffer, fill, encoding);
  };
  return bufferAlloc;
}
var hasRequiredHeaders;
function requireHeaders() {
  if (hasRequiredHeaders) return headers;
  hasRequiredHeaders = 1;
  var toBuffer = requireToBuffer();
  var alloc = requireBufferAlloc();
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
      case 0:
        return "file";
      case 1:
        return "link";
      case 2:
        return "symlink";
      case 3:
        return "character-device";
      case 4:
        return "block-device";
      case 5:
        return "directory";
      case 6:
        return "fifo";
      case 7:
        return "contiguous-file";
      case 72:
        return "pax-header";
      case 55:
        return "pax-global-header";
      case 27:
        return "gnu-long-link-path";
      case 28:
      case 30:
        return "gnu-long-path";
    }
    return null;
  };
  var toTypeflag = function(flag) {
    switch (flag) {
      case "file":
        return 0;
      case "link":
        return 1;
      case "symlink":
        return 2;
      case "character-device":
        return 3;
      case "block-device":
        return 4;
      case "directory":
        return 5;
      case "fifo":
        return 6;
      case "contiguous-file":
        return 7;
      case "pax-header":
        return 72;
    }
    return 0;
  };
  var indexOf = function(block, num, offset, end) {
    for (; offset < end; offset++) {
      if (block[offset] === num) return offset;
    }
    return end;
  };
  var cksum = function(block) {
    var sum = 8 * 32;
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
    var tuple = [];
    for (var i = buf.length - 1; i > 0; i--) {
      var byte = buf[i];
      if (positive) tuple.push(byte);
      else tuple.push(255 - byte);
    }
    var sum = 0;
    var l = tuple.length;
    for (i = 0; i < l; i++) {
      sum += tuple[i] * Math.pow(256, i);
    }
    return positive ? sum : -1 * sum;
  }
  var decodeOct = function(val, offset, length) {
    val = val.slice(offset, offset + length);
    offset = 0;
    if (val[offset] & 128) {
      return parse256(val);
    } else {
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
  headers.decodeLongPath = function(buf, encoding) {
    return decodeStr(buf, 0, buf.length, encoding);
  };
  headers.encodePax = function(opts) {
    var result = "";
    if (opts.name) result += addLength(" path=" + opts.name + "\n");
    if (opts.linkname) result += addLength(" linkpath=" + opts.linkname + "\n");
    var pax = opts.pax;
    if (pax) {
      for (var key in pax) {
        result += addLength(" " + key + "=" + pax[key] + "\n");
      }
    }
    return toBuffer(result);
  };
  headers.decodePax = function(buf) {
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
  headers.encode = function(opts) {
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
  headers.decode = function(buf, filenameEncoding) {
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
    if (c === 8 * 32) return null;
    if (c !== decodeOct(buf, 148, 8)) throw new Error("Invalid tar header. Maybe the tar is corrupted or it needs to be gunzipped?");
    return {
      name,
      mode,
      uid,
      gid,
      size,
      mtime: new Date(1e3 * mtime),
      type,
      linkname,
      uname,
      gname,
      devmajor,
      devminor
    };
  };
  return headers;
}
var extract;
var hasRequiredExtract;
function requireExtract() {
  if (hasRequiredExtract) return extract;
  hasRequiredExtract = 1;
  var util2 = require$$1;
  var bl2 = requireBl();
  var xtend = requireImmutable();
  var headers2 = requireHeaders();
  var Writable = requireReadable().Writable;
  var PassThrough = requireReadable().PassThrough;
  var noop = function() {
  };
  var overflow = function(size) {
    size &= 511;
    return size && 512 - size;
  };
  var emptyStream = function(self2, offset) {
    var s = new Source(self2, offset);
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
  var Source = function(self2, offset) {
    this._parent = self2;
    this.offset = offset;
    PassThrough.call(this);
  };
  util2.inherits(Source, PassThrough);
  Source.prototype.destroy = function(err) {
    this._parent.destroy(err);
  };
  var Extract = function(opts) {
    if (!(this instanceof Extract)) return new Extract(opts);
    Writable.call(this, opts);
    opts = opts || {};
    this._offset = 0;
    this._buffer = bl2();
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
    var self2 = this;
    var b = self2._buffer;
    var oncontinue = function() {
      self2._continue();
    };
    var onunlock = function(err) {
      self2._locked = false;
      if (err) return self2.destroy(err);
      if (!self2._stream) oncontinue();
    };
    var onstreamend = function() {
      self2._stream = null;
      var drain = overflow(self2._header.size);
      if (drain) self2._parse(drain, ondrain);
      else self2._parse(512, onheader);
      if (!self2._locked) oncontinue();
    };
    var ondrain = function() {
      self2._buffer.consume(overflow(self2._header.size));
      self2._parse(512, onheader);
      oncontinue();
    };
    var onpaxglobalheader = function() {
      var size = self2._header.size;
      self2._paxGlobal = headers2.decodePax(b.slice(0, size));
      b.consume(size);
      onstreamend();
    };
    var onpaxheader = function() {
      var size = self2._header.size;
      self2._pax = headers2.decodePax(b.slice(0, size));
      if (self2._paxGlobal) self2._pax = xtend(self2._paxGlobal, self2._pax);
      b.consume(size);
      onstreamend();
    };
    var ongnulongpath = function() {
      var size = self2._header.size;
      this._gnuLongPath = headers2.decodeLongPath(b.slice(0, size), opts.filenameEncoding);
      b.consume(size);
      onstreamend();
    };
    var ongnulonglinkpath = function() {
      var size = self2._header.size;
      this._gnuLongLinkPath = headers2.decodeLongPath(b.slice(0, size), opts.filenameEncoding);
      b.consume(size);
      onstreamend();
    };
    var onheader = function() {
      var offset = self2._offset;
      var header;
      try {
        header = self2._header = headers2.decode(b.slice(0, 512), opts.filenameEncoding);
      } catch (err) {
        self2.emit("error", err);
      }
      b.consume(512);
      if (!header) {
        self2._parse(512, onheader);
        oncontinue();
        return;
      }
      if (header.type === "gnu-long-path") {
        self2._parse(header.size, ongnulongpath);
        oncontinue();
        return;
      }
      if (header.type === "gnu-long-link-path") {
        self2._parse(header.size, ongnulonglinkpath);
        oncontinue();
        return;
      }
      if (header.type === "pax-global-header") {
        self2._parse(header.size, onpaxglobalheader);
        oncontinue();
        return;
      }
      if (header.type === "pax-header") {
        self2._parse(header.size, onpaxheader);
        oncontinue();
        return;
      }
      if (self2._gnuLongPath) {
        header.name = self2._gnuLongPath;
        self2._gnuLongPath = null;
      }
      if (self2._gnuLongLinkPath) {
        header.linkname = self2._gnuLongLinkPath;
        self2._gnuLongLinkPath = null;
      }
      if (self2._pax) {
        self2._header = header = mixinPax(header, self2._pax);
        self2._pax = null;
      }
      self2._locked = true;
      if (!header.size || header.type === "directory") {
        self2._parse(512, onheader);
        self2.emit("entry", header, emptyStream(self2, offset), onunlock);
        return;
      }
      self2._stream = new Source(self2, offset);
      self2.emit("entry", header, self2._stream, onunlock);
      self2._parse(header.size, onstreamend);
      oncontinue();
    };
    this._onheader = onheader;
    this._parse(512, onheader);
  };
  util2.inherits(Extract, Writable);
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
    var overflow2 = null;
    if (data.length > missing) {
      overflow2 = data.slice(missing);
      data = data.slice(0, missing);
    }
    if (s) s.end(data);
    else b.append(data);
    this._overflow = overflow2;
    this._onparse();
  };
  Extract.prototype._final = function(cb) {
    if (this._partial) return this.destroy(new Error("Unexpected end of data"));
    cb();
  };
  extract = Extract;
  return extract;
}
var fsConstants;
var hasRequiredFsConstants;
function requireFsConstants() {
  if (hasRequiredFsConstants) return fsConstants;
  hasRequiredFsConstants = 1;
  fsConstants = require$$0$2.constants || require$$0;
  return fsConstants;
}
var once = { exports: {} };
var wrappy_1;
var hasRequiredWrappy;
function requireWrappy() {
  if (hasRequiredWrappy) return wrappy_1;
  hasRequiredWrappy = 1;
  wrappy_1 = wrappy;
  function wrappy(fn, cb) {
    if (fn && cb) return wrappy(fn)(cb);
    if (typeof fn !== "function")
      throw new TypeError("need wrapper function");
    Object.keys(fn).forEach(function(k) {
      wrapper[k] = fn[k];
    });
    return wrapper;
    function wrapper() {
      var args = new Array(arguments.length);
      for (var i = 0; i < args.length; i++) {
        args[i] = arguments[i];
      }
      var ret = fn.apply(this, args);
      var cb2 = args[args.length - 1];
      if (typeof ret === "function" && ret !== cb2) {
        Object.keys(cb2).forEach(function(k) {
          ret[k] = cb2[k];
        });
      }
      return ret;
    }
  }
  return wrappy_1;
}
var hasRequiredOnce;
function requireOnce() {
  if (hasRequiredOnce) return once.exports;
  hasRequiredOnce = 1;
  var wrappy = requireWrappy();
  once.exports = wrappy(once$1);
  once.exports.strict = wrappy(onceStrict);
  once$1.proto = once$1(function() {
    Object.defineProperty(Function.prototype, "once", {
      value: function() {
        return once$1(this);
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
  function once$1(fn) {
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
      if (f.called)
        throw new Error(f.onceError);
      f.called = true;
      return f.value = fn.apply(this, arguments);
    };
    var name = fn.name || "Function wrapped with `once`";
    f.onceError = name + " shouldn't be called more than once";
    f.called = false;
    return f;
  }
  return once.exports;
}
var endOfStream;
var hasRequiredEndOfStream;
function requireEndOfStream() {
  if (hasRequiredEndOfStream) return endOfStream;
  hasRequiredEndOfStream = 1;
  var once2 = requireOnce();
  var noop = function() {
  };
  var isRequest = function(stream2) {
    return stream2.setHeader && typeof stream2.abort === "function";
  };
  var isChildProcess = function(stream2) {
    return stream2.stdio && Array.isArray(stream2.stdio) && stream2.stdio.length === 3;
  };
  var eos = function(stream2, opts, callback) {
    if (typeof opts === "function") return eos(stream2, null, opts);
    if (!opts) opts = {};
    callback = once2(callback || noop);
    var ws = stream2._writableState;
    var rs = stream2._readableState;
    var readable2 = opts.readable || opts.readable !== false && stream2.readable;
    var writable = opts.writable || opts.writable !== false && stream2.writable;
    var cancelled = false;
    var onlegacyfinish = function() {
      if (!stream2.writable) onfinish();
    };
    var onfinish = function() {
      writable = false;
      if (!readable2) callback.call(stream2);
    };
    var onend = function() {
      readable2 = false;
      if (!writable) callback.call(stream2);
    };
    var onexit = function(exitCode) {
      callback.call(stream2, exitCode ? new Error("exited with error code: " + exitCode) : null);
    };
    var onerror = function(err) {
      callback.call(stream2, err);
    };
    var onclose = function() {
      process.nextTick(onclosenexttick);
    };
    var onclosenexttick = function() {
      if (cancelled) return;
      if (readable2 && !(rs && (rs.ended && !rs.destroyed))) return callback.call(stream2, new Error("premature close"));
      if (writable && !(ws && (ws.ended && !ws.destroyed))) return callback.call(stream2, new Error("premature close"));
    };
    var onrequest = function() {
      stream2.req.on("finish", onfinish);
    };
    if (isRequest(stream2)) {
      stream2.on("complete", onfinish);
      stream2.on("abort", onclose);
      if (stream2.req) onrequest();
      else stream2.on("request", onrequest);
    } else if (writable && !ws) {
      stream2.on("end", onlegacyfinish);
      stream2.on("close", onlegacyfinish);
    }
    if (isChildProcess(stream2)) stream2.on("exit", onexit);
    stream2.on("end", onend);
    stream2.on("finish", onfinish);
    if (opts.error !== false) stream2.on("error", onerror);
    stream2.on("close", onclose);
    return function() {
      cancelled = true;
      stream2.removeListener("complete", onfinish);
      stream2.removeListener("abort", onclose);
      stream2.removeListener("request", onrequest);
      if (stream2.req) stream2.req.removeListener("finish", onfinish);
      stream2.removeListener("end", onlegacyfinish);
      stream2.removeListener("close", onlegacyfinish);
      stream2.removeListener("finish", onfinish);
      stream2.removeListener("exit", onexit);
      stream2.removeListener("end", onend);
      stream2.removeListener("error", onerror);
      stream2.removeListener("close", onclose);
    };
  };
  endOfStream = eos;
  return endOfStream;
}
var pack;
var hasRequiredPack;
function requirePack() {
  if (hasRequiredPack) return pack;
  hasRequiredPack = 1;
  var constants = requireFsConstants();
  var eos = requireEndOfStream();
  var util2 = require$$1;
  var alloc = requireBufferAlloc();
  var toBuffer = requireToBuffer();
  var Readable = requireReadable().Readable;
  var Writable = requireReadable().Writable;
  var StringDecoder = require$$6.StringDecoder;
  var headers2 = requireHeaders();
  var DMODE = parseInt("755", 8);
  var FMODE = parseInt("644", 8);
  var END_OF_TAR = alloc(1024);
  var noop = function() {
  };
  var overflow = function(self2, size) {
    size &= 511;
    if (size) self2.push(END_OF_TAR.slice(0, 512 - size));
  };
  function modeToType(mode) {
    switch (mode & constants.S_IFMT) {
      case constants.S_IFBLK:
        return "block-device";
      case constants.S_IFCHR:
        return "character-device";
      case constants.S_IFDIR:
        return "directory";
      case constants.S_IFIFO:
        return "fifo";
      case constants.S_IFLNK:
        return "symlink";
    }
    return "file";
  }
  var Sink = function(to) {
    Writable.call(this);
    this.written = 0;
    this._to = to;
    this._destroyed = false;
  };
  util2.inherits(Sink, Writable);
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
  util2.inherits(LinkSink, Writable);
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
  util2.inherits(Void, Writable);
  Void.prototype._write = function(data, enc, cb) {
    cb(new Error("No body allowed for this entry"));
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
  util2.inherits(Pack, Readable);
  Pack.prototype.entry = function(header, buffer, callback) {
    if (this._stream) throw new Error("already piping an entry");
    if (this._finalized || this._destroyed) return;
    if (typeof buffer === "function") {
      callback = buffer;
      buffer = null;
    }
    if (!callback) callback = noop;
    var self2 = this;
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
      overflow(self2, header.size);
      process.nextTick(callback);
      return new Void();
    }
    if (header.type === "symlink" && !header.linkname) {
      var linkSink = new LinkSink();
      eos(linkSink, function(err) {
        if (err) {
          self2.destroy();
          return callback(err);
        }
        header.linkname = linkSink.linkname;
        self2._encode(header);
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
      self2._stream = null;
      if (err) {
        self2.destroy();
        return callback(err);
      }
      if (sink.written !== header.size) {
        self2.destroy();
        return callback(new Error("size mismatch"));
      }
      overflow(self2, header.size);
      if (self2._finalizing) self2.finalize();
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
      var buf = headers2.encode(header);
      if (buf) {
        this.push(buf);
        return;
      }
    }
    this._encodePax(header);
  };
  Pack.prototype._encodePax = function(header) {
    var paxHeader = headers2.encodePax({
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
    this.push(headers2.encode(newHeader));
    this.push(paxHeader);
    overflow(this, paxHeader.length);
    newHeader.size = header.size;
    newHeader.type = header.type;
    this.push(headers2.encode(newHeader));
  };
  Pack.prototype._read = function(n) {
    var drain = this._drain;
    this._drain = noop;
    drain();
  };
  pack = Pack;
  return pack;
}
var hasRequiredTarStream;
function requireTarStream() {
  if (hasRequiredTarStream) return tarStream;
  hasRequiredTarStream = 1;
  tarStream.extract = requireExtract();
  tarStream.pack = requirePack();
  return tarStream;
}
var decompressTar;
var hasRequiredDecompressTar;
function requireDecompressTar() {
  if (hasRequiredDecompressTar) return decompressTar;
  hasRequiredDecompressTar = 1;
  const fileType2 = requireFileType$2();
  const isStream2 = requireIsStream();
  const tarStream2 = requireTarStream();
  decompressTar = () => (input) => {
    if (!Buffer.isBuffer(input) && !isStream2(input)) {
      return Promise.reject(new TypeError(`Expected a Buffer or Stream, got ${typeof input}`));
    }
    if (Buffer.isBuffer(input) && (!fileType2(input) || fileType2(input).ext !== "tar")) {
      return Promise.resolve([]);
    }
    const extract2 = tarStream2.extract();
    const files = [];
    extract2.on("entry", (header, stream2, cb) => {
      const chunk = [];
      stream2.on("data", (data) => chunk.push(data));
      stream2.on("end", () => {
        const file = {
          data: Buffer.concat(chunk),
          mode: header.mode,
          mtime: header.mtime,
          path: header.name,
          type: header.type
        };
        if (header.type === "symlink" || header.type === "link") {
          file.linkname = header.linkname;
        }
        files.push(file);
        cb();
      });
    });
    const promise = new Promise((resolve, reject) => {
      if (!Buffer.isBuffer(input)) {
        input.on("error", reject);
      }
      extract2.on("finish", () => resolve(files));
      extract2.on("error", reject);
    });
    extract2.then = promise.then.bind(promise);
    extract2.catch = promise.catch.bind(promise);
    if (Buffer.isBuffer(input)) {
      extract2.end(input);
    } else {
      input.pipe(extract2);
    }
    return extract2;
  };
  return decompressTar;
}
var fileType$1;
var hasRequiredFileType$1;
function requireFileType$1() {
  if (hasRequiredFileType$1) return fileType$1;
  hasRequiredFileType$1 = 1;
  const toBytes = (s) => Array.from(s).map((c) => c.charCodeAt(0));
  const xpiZipFilename = toBytes("META-INF/mozilla.rsa");
  const oxmlContentTypes = toBytes("[Content_Types].xml");
  const oxmlRels = toBytes("_rels/.rels");
  fileType$1 = (input) => {
    const buf = new Uint8Array(input);
    if (!(buf && buf.length > 1)) {
      return null;
    }
    const check = (header, opts) => {
      opts = Object.assign({
        offset: 0
      }, opts);
      for (let i = 0; i < header.length; i++) {
        if (opts.mask) {
          if (header[i] !== (opts.mask[i] & buf[i + opts.offset])) {
            return false;
          }
        } else if (header[i] !== buf[i + opts.offset]) {
          return false;
        }
      }
      return true;
    };
    if (check([255, 216, 255])) {
      return {
        ext: "jpg",
        mime: "image/jpeg"
      };
    }
    if (check([137, 80, 78, 71, 13, 10, 26, 10])) {
      return {
        ext: "png",
        mime: "image/png"
      };
    }
    if (check([71, 73, 70])) {
      return {
        ext: "gif",
        mime: "image/gif"
      };
    }
    if (check([87, 69, 66, 80], { offset: 8 })) {
      return {
        ext: "webp",
        mime: "image/webp"
      };
    }
    if (check([70, 76, 73, 70])) {
      return {
        ext: "flif",
        mime: "image/flif"
      };
    }
    if ((check([73, 73, 42, 0]) || check([77, 77, 0, 42])) && check([67, 82], { offset: 8 })) {
      return {
        ext: "cr2",
        mime: "image/x-canon-cr2"
      };
    }
    if (check([73, 73, 42, 0]) || check([77, 77, 0, 42])) {
      return {
        ext: "tif",
        mime: "image/tiff"
      };
    }
    if (check([66, 77])) {
      return {
        ext: "bmp",
        mime: "image/bmp"
      };
    }
    if (check([73, 73, 188])) {
      return {
        ext: "jxr",
        mime: "image/vnd.ms-photo"
      };
    }
    if (check([56, 66, 80, 83])) {
      return {
        ext: "psd",
        mime: "image/vnd.adobe.photoshop"
      };
    }
    if (check([80, 75, 3, 4])) {
      if (check([109, 105, 109, 101, 116, 121, 112, 101, 97, 112, 112, 108, 105, 99, 97, 116, 105, 111, 110, 47, 101, 112, 117, 98, 43, 122, 105, 112], { offset: 30 })) {
        return {
          ext: "epub",
          mime: "application/epub+zip"
        };
      }
      if (check(xpiZipFilename, { offset: 30 })) {
        return {
          ext: "xpi",
          mime: "application/x-xpinstall"
        };
      }
      if (check(oxmlContentTypes, { offset: 30 }) || check(oxmlRels, { offset: 30 })) {
        const sliced = buf.subarray(4, 4 + 2e3);
        const nextZipHeaderIndex = (arr) => arr.findIndex((el, i, arr2) => arr2[i] === 80 && arr2[i + 1] === 75 && arr2[i + 2] === 3 && arr2[i + 3] === 4);
        const header2Pos = nextZipHeaderIndex(sliced);
        if (header2Pos !== -1) {
          const slicedAgain = buf.subarray(header2Pos + 8, header2Pos + 8 + 1e3);
          const header3Pos = nextZipHeaderIndex(slicedAgain);
          if (header3Pos !== -1) {
            const offset = 8 + header2Pos + header3Pos + 30;
            if (check(toBytes("word/"), { offset })) {
              return {
                ext: "docx",
                mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              };
            }
            if (check(toBytes("ppt/"), { offset })) {
              return {
                ext: "pptx",
                mime: "application/vnd.openxmlformats-officedocument.presentationml.presentation"
              };
            }
            if (check(toBytes("xl/"), { offset })) {
              return {
                ext: "xlsx",
                mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              };
            }
          }
        }
      }
    }
    if (check([80, 75]) && (buf[2] === 3 || buf[2] === 5 || buf[2] === 7) && (buf[3] === 4 || buf[3] === 6 || buf[3] === 8)) {
      return {
        ext: "zip",
        mime: "application/zip"
      };
    }
    if (check([117, 115, 116, 97, 114], { offset: 257 })) {
      return {
        ext: "tar",
        mime: "application/x-tar"
      };
    }
    if (check([82, 97, 114, 33, 26, 7]) && (buf[6] === 0 || buf[6] === 1)) {
      return {
        ext: "rar",
        mime: "application/x-rar-compressed"
      };
    }
    if (check([31, 139, 8])) {
      return {
        ext: "gz",
        mime: "application/gzip"
      };
    }
    if (check([66, 90, 104])) {
      return {
        ext: "bz2",
        mime: "application/x-bzip2"
      };
    }
    if (check([55, 122, 188, 175, 39, 28])) {
      return {
        ext: "7z",
        mime: "application/x-7z-compressed"
      };
    }
    if (check([120, 1])) {
      return {
        ext: "dmg",
        mime: "application/x-apple-diskimage"
      };
    }
    if (check([51, 103, 112, 53]) || // 3gp5
    check([0, 0, 0]) && check([102, 116, 121, 112], { offset: 4 }) && (check([109, 112, 52, 49], { offset: 8 }) || // MP41
    check([109, 112, 52, 50], { offset: 8 }) || // MP42
    check([105, 115, 111, 109], { offset: 8 }) || // ISOM
    check([105, 115, 111, 50], { offset: 8 }) || // ISO2
    check([109, 109, 112, 52], { offset: 8 }) || // MMP4
    check([77, 52, 86], { offset: 8 }) || // M4V
    check([100, 97, 115, 104], { offset: 8 }))) {
      return {
        ext: "mp4",
        mime: "video/mp4"
      };
    }
    if (check([77, 84, 104, 100])) {
      return {
        ext: "mid",
        mime: "audio/midi"
      };
    }
    if (check([26, 69, 223, 163])) {
      const sliced = buf.subarray(4, 4 + 4096);
      const idPos = sliced.findIndex((el, i, arr) => arr[i] === 66 && arr[i + 1] === 130);
      if (idPos !== -1) {
        const docTypePos = idPos + 3;
        const findDocType = (type) => Array.from(type).every((c, i) => sliced[docTypePos + i] === c.charCodeAt(0));
        if (findDocType("matroska")) {
          return {
            ext: "mkv",
            mime: "video/x-matroska"
          };
        }
        if (findDocType("webm")) {
          return {
            ext: "webm",
            mime: "video/webm"
          };
        }
      }
    }
    if (check([0, 0, 0, 20, 102, 116, 121, 112, 113, 116, 32, 32]) || check([102, 114, 101, 101], { offset: 4 }) || check([102, 116, 121, 112, 113, 116, 32, 32], { offset: 4 }) || check([109, 100, 97, 116], { offset: 4 }) || // MJPEG
    check([119, 105, 100, 101], { offset: 4 })) {
      return {
        ext: "mov",
        mime: "video/quicktime"
      };
    }
    if (check([82, 73, 70, 70]) && check([65, 86, 73], { offset: 8 })) {
      return {
        ext: "avi",
        mime: "video/x-msvideo"
      };
    }
    if (check([48, 38, 178, 117, 142, 102, 207, 17, 166, 217])) {
      return {
        ext: "wmv",
        mime: "video/x-ms-wmv"
      };
    }
    if (check([0, 0, 1, 186])) {
      return {
        ext: "mpg",
        mime: "video/mpeg"
      };
    }
    for (let start = 0; start < 2 && start < buf.length - 16; start++) {
      if (check([73, 68, 51], { offset: start }) || // ID3 header
      check([255, 226], { offset: start, mask: [255, 226] })) {
        return {
          ext: "mp3",
          mime: "audio/mpeg"
        };
      }
    }
    if (check([102, 116, 121, 112, 77, 52, 65], { offset: 4 }) || check([77, 52, 65, 32])) {
      return {
        ext: "m4a",
        mime: "audio/m4a"
      };
    }
    if (check([79, 112, 117, 115, 72, 101, 97, 100], { offset: 28 })) {
      return {
        ext: "opus",
        mime: "audio/opus"
      };
    }
    if (check([79, 103, 103, 83])) {
      return {
        ext: "ogg",
        mime: "audio/ogg"
      };
    }
    if (check([102, 76, 97, 67])) {
      return {
        ext: "flac",
        mime: "audio/x-flac"
      };
    }
    if (check([82, 73, 70, 70]) && check([87, 65, 86, 69], { offset: 8 })) {
      return {
        ext: "wav",
        mime: "audio/x-wav"
      };
    }
    if (check([35, 33, 65, 77, 82, 10])) {
      return {
        ext: "amr",
        mime: "audio/amr"
      };
    }
    if (check([37, 80, 68, 70])) {
      return {
        ext: "pdf",
        mime: "application/pdf"
      };
    }
    if (check([77, 90])) {
      return {
        ext: "exe",
        mime: "application/x-msdownload"
      };
    }
    if ((buf[0] === 67 || buf[0] === 70) && check([87, 83], { offset: 1 })) {
      return {
        ext: "swf",
        mime: "application/x-shockwave-flash"
      };
    }
    if (check([123, 92, 114, 116, 102])) {
      return {
        ext: "rtf",
        mime: "application/rtf"
      };
    }
    if (check([0, 97, 115, 109])) {
      return {
        ext: "wasm",
        mime: "application/wasm"
      };
    }
    if (check([119, 79, 70, 70]) && (check([0, 1, 0, 0], { offset: 4 }) || check([79, 84, 84, 79], { offset: 4 }))) {
      return {
        ext: "woff",
        mime: "font/woff"
      };
    }
    if (check([119, 79, 70, 50]) && (check([0, 1, 0, 0], { offset: 4 }) || check([79, 84, 84, 79], { offset: 4 }))) {
      return {
        ext: "woff2",
        mime: "font/woff2"
      };
    }
    if (check([76, 80], { offset: 34 }) && (check([0, 0, 1], { offset: 8 }) || check([1, 0, 2], { offset: 8 }) || check([2, 0, 2], { offset: 8 }))) {
      return {
        ext: "eot",
        mime: "application/octet-stream"
      };
    }
    if (check([0, 1, 0, 0, 0])) {
      return {
        ext: "ttf",
        mime: "font/ttf"
      };
    }
    if (check([79, 84, 84, 79, 0])) {
      return {
        ext: "otf",
        mime: "font/otf"
      };
    }
    if (check([0, 0, 1, 0])) {
      return {
        ext: "ico",
        mime: "image/x-icon"
      };
    }
    if (check([70, 76, 86, 1])) {
      return {
        ext: "flv",
        mime: "video/x-flv"
      };
    }
    if (check([37, 33])) {
      return {
        ext: "ps",
        mime: "application/postscript"
      };
    }
    if (check([253, 55, 122, 88, 90, 0])) {
      return {
        ext: "xz",
        mime: "application/x-xz"
      };
    }
    if (check([83, 81, 76, 105])) {
      return {
        ext: "sqlite",
        mime: "application/x-sqlite3"
      };
    }
    if (check([78, 69, 83, 26])) {
      return {
        ext: "nes",
        mime: "application/x-nintendo-nes-rom"
      };
    }
    if (check([67, 114, 50, 52])) {
      return {
        ext: "crx",
        mime: "application/x-google-chrome-extension"
      };
    }
    if (check([77, 83, 67, 70]) || check([73, 83, 99, 40])) {
      return {
        ext: "cab",
        mime: "application/vnd.ms-cab-compressed"
      };
    }
    if (check([33, 60, 97, 114, 99, 104, 62, 10, 100, 101, 98, 105, 97, 110, 45, 98, 105, 110, 97, 114, 121])) {
      return {
        ext: "deb",
        mime: "application/x-deb"
      };
    }
    if (check([33, 60, 97, 114, 99, 104, 62])) {
      return {
        ext: "ar",
        mime: "application/x-unix-archive"
      };
    }
    if (check([237, 171, 238, 219])) {
      return {
        ext: "rpm",
        mime: "application/x-rpm"
      };
    }
    if (check([31, 160]) || check([31, 157])) {
      return {
        ext: "Z",
        mime: "application/x-compress"
      };
    }
    if (check([76, 90, 73, 80])) {
      return {
        ext: "lz",
        mime: "application/x-lzip"
      };
    }
    if (check([208, 207, 17, 224, 161, 177, 26, 225])) {
      return {
        ext: "msi",
        mime: "application/x-msi"
      };
    }
    if (check([6, 14, 43, 52, 2, 5, 1, 1, 13, 1, 2, 1, 1, 2])) {
      return {
        ext: "mxf",
        mime: "application/mxf"
      };
    }
    if (check([71], { offset: 4 }) && (check([71], { offset: 192 }) || check([71], { offset: 196 }))) {
      return {
        ext: "mts",
        mime: "video/mp2t"
      };
    }
    if (check([66, 76, 69, 78, 68, 69, 82])) {
      return {
        ext: "blend",
        mime: "application/x-blender"
      };
    }
    if (check([66, 80, 71, 251])) {
      return {
        ext: "bpg",
        mime: "image/bpg"
      };
    }
    return null;
  };
  return fileType$1;
}
var bitreader;
var hasRequiredBitreader;
function requireBitreader() {
  if (hasRequiredBitreader) return bitreader;
  hasRequiredBitreader = 1;
  var BITMASK = [0, 1, 3, 7, 15, 31, 63, 127, 255];
  var BitReader = function(stream2) {
    this.stream = stream2;
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
    for (i = 0; i < buf.length; i++) {
      buf[i] = this.read(8);
    }
    return buf.toString("hex");
  };
  bitreader = BitReader;
  return bitreader;
}
var stream;
var hasRequiredStream;
function requireStream() {
  if (hasRequiredStream) return stream;
  hasRequiredStream = 1;
  var Stream = function() {
  };
  Stream.prototype.readByte = function() {
    throw new Error("abstract method readByte() not implemented");
  };
  Stream.prototype.read = function(buffer, bufOffset, length) {
    var bytesRead = 0;
    while (bytesRead < length) {
      var c = this.readByte();
      if (c < 0) {
        return bytesRead === 0 ? -1 : bytesRead;
      }
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
    for (i = 0; i < length; i++) {
      this.writeByte(buffer[bufOffset++]);
    }
    return length;
  };
  Stream.prototype.flush = function() {
  };
  stream = Stream;
  return stream;
}
var crc32;
var hasRequiredCrc32;
function requireCrc32() {
  if (hasRequiredCrc32) return crc32;
  hasRequiredCrc32 = 1;
  crc32 = function() {
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
      var crc = 4294967295;
      this.getCRC = function() {
        return ~crc >>> 0;
      };
      this.updateCRC = function(value) {
        crc = crc << 8 ^ crc32Lookup[(crc >>> 24 ^ value) & 255];
      };
      this.updateCRCRun = function(value, count) {
        while (count-- > 0) {
          crc = crc << 8 ^ crc32Lookup[(crc >>> 24 ^ value) & 255];
        }
      };
    };
    return CRC32;
  }();
  return crc32;
}
const version = "1.0.6";
const license = "MIT";
const require$$3 = {
  version,
  license
};
var lib;
var hasRequiredLib;
function requireLib() {
  if (hasRequiredLib) return lib;
  hasRequiredLib = 1;
  var BitReader = requireBitreader();
  var Stream = requireStream();
  var CRC32 = requireCrc32();
  var pjson = require$$3;
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
    for (i = index; i > 0; i--) {
      array[i] = array[i - 1];
    }
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
    if (optDetail) {
      msg += ": " + optDetail;
    }
    var e = new TypeError(msg);
    e.errorCode = status;
    throw e;
  };
  var Bunzip = function(inputStream, outputStream) {
    this.writePos = this.writeCurrent = this.writeCount = 0;
    this._start_bunzip(inputStream, outputStream);
  };
  Bunzip.prototype._init_block = function() {
    var moreBlocks = this._get_next_block();
    if (!moreBlocks) {
      this.writeCount = -1;
      return false;
    }
    this.blockCRC = new CRC32();
    return true;
  };
  Bunzip.prototype._start_bunzip = function(inputStream, outputStream) {
    var buf = new Buffer(4);
    if (inputStream.read(buf, 0, 4) !== 4 || String.fromCharCode(buf[0], buf[1], buf[2]) !== "BZh")
      _throw(Err.NOT_BZIP_DATA, "bad magic");
    var level = buf[3] - 48;
    if (level < 1 || level > 9)
      _throw(Err.NOT_BZIP_DATA, "level out of range");
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
    if (h === SQRTPI) {
      return false;
    }
    if (h !== WHOLEPI)
      _throw(Err.NOT_BZIP_DATA);
    this.targetBlockCRC = reader.read(32) >>> 0;
    this.streamCRC = (this.targetBlockCRC ^ (this.streamCRC << 1 | this.streamCRC >>> 31)) >>> 0;
    if (reader.read(1))
      _throw(Err.OBSOLETE_INPUT);
    var origPointer = reader.read(24);
    if (origPointer > this.dbufSize)
      _throw(Err.DATA_ERROR, "initial position out of bounds");
    var t = reader.read(16);
    var symToByte = new Buffer(256), symTotal = 0;
    for (i = 0; i < 16; i++) {
      if (t & 1 << 15 - i) {
        var o = i * 16;
        k = reader.read(16);
        for (j = 0; j < 16; j++)
          if (k & 1 << 15 - j)
            symToByte[symTotal++] = o + j;
      }
    }
    var groupCount = reader.read(3);
    if (groupCount < MIN_GROUPS || groupCount > MAX_GROUPS)
      _throw(Err.DATA_ERROR);
    var nSelectors = reader.read(15);
    if (nSelectors === 0)
      _throw(Err.DATA_ERROR);
    var mtfSymbol = new Buffer(256);
    for (i = 0; i < groupCount; i++)
      mtfSymbol[i] = i;
    var selectors = new Buffer(nSelectors);
    for (i = 0; i < nSelectors; i++) {
      for (j = 0; reader.read(1); j++)
        if (j >= groupCount) _throw(Err.DATA_ERROR);
      selectors[i] = mtf(mtfSymbol, j);
    }
    var symCount = symTotal + 2;
    var groups = [], hufGroup;
    for (j = 0; j < groupCount; j++) {
      var length = new Buffer(symCount), temp = new Uint16Array(MAX_HUFCODE_BITS + 1);
      t = reader.read(5);
      for (i = 0; i < symCount; i++) {
        for (; ; ) {
          if (t < 1 || t > MAX_HUFCODE_BITS) _throw(Err.DATA_ERROR);
          if (!reader.read(1))
            break;
          if (!reader.read(1))
            t++;
          else
            t--;
        }
        length[i] = t;
      }
      var minLen, maxLen;
      minLen = maxLen = length[0];
      for (i = 1; i < symCount; i++) {
        if (length[i] > maxLen)
          maxLen = length[i];
        else if (length[i] < minLen)
          minLen = length[i];
      }
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
        for (t = 0; t < symCount; t++)
          if (length[t] === i)
            hufGroup.permute[pp++] = t;
      }
      for (i = 0; i < symCount; i++)
        temp[length[i]]++;
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
    var byteCount = new Uint32Array(256);
    for (i = 0; i < 256; i++)
      mtfSymbol[i] = i;
    var runPos = 0, dbufCount = 0, selector = 0, uc;
    var dbuf = this.dbuf = new Uint32Array(this.dbufSize);
    symCount = 0;
    for (; ; ) {
      if (!symCount--) {
        symCount = GROUP_SIZE - 1;
        if (selector >= nSelectors) {
          _throw(Err.DATA_ERROR);
        }
        hufGroup = groups[selectors[selector++]];
      }
      i = hufGroup.minLen;
      j = reader.read(i);
      for (; ; i++) {
        if (i > hufGroup.maxLen) {
          _throw(Err.DATA_ERROR);
        }
        if (j <= hufGroup.limit[i])
          break;
        j = j << 1 | reader.read(1);
      }
      j -= hufGroup.base[i];
      if (j < 0 || j >= MAX_SYMBOLS) {
        _throw(Err.DATA_ERROR);
      }
      var nextSym = hufGroup.permute[j];
      if (nextSym === SYMBOL_RUNA || nextSym === SYMBOL_RUNB) {
        if (!runPos) {
          runPos = 1;
          t = 0;
        }
        if (nextSym === SYMBOL_RUNA)
          t += runPos;
        else
          t += 2 * runPos;
        runPos <<= 1;
        continue;
      }
      if (runPos) {
        runPos = 0;
        if (dbufCount + t > this.dbufSize) {
          _throw(Err.DATA_ERROR);
        }
        uc = symToByte[mtfSymbol[0]];
        byteCount[uc] += t;
        while (t--)
          dbuf[dbufCount++] = uc;
      }
      if (nextSym > symTotal)
        break;
      if (dbufCount >= this.dbufSize) {
        _throw(Err.DATA_ERROR);
      }
      i = nextSym - 1;
      uc = mtf(mtfSymbol, i);
      uc = symToByte[uc];
      byteCount[uc]++;
      dbuf[dbufCount++] = uc;
    }
    if (origPointer < 0 || origPointer >= dbufCount) {
      _throw(Err.DATA_ERROR);
    }
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
    if (this.writeCount < 0) {
      return 0;
    }
    var dbuf = this.dbuf, pos = this.writePos, current = this.writeCurrent;
    var dbufCount = this.writeCount;
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
      if (current != previous)
        run = 0;
    }
    this.writeCount = dbufCount;
    if (this.blockCRC.getCRC() !== this.targetBlockCRC) {
      _throw(Err.DATA_ERROR, "Bad block CRC (got " + this.blockCRC.getCRC().toString(16) + " expected " + this.targetBlockCRC.toString(16) + ")");
    }
    return this.nextoutput;
  };
  var coerceInputStream = function(input) {
    if ("readByte" in input) {
      return input;
    }
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
    if (output) {
      if (typeof output === "number") {
        outputStream.buffer = new Buffer(output);
        resizeOk = false;
      } else if ("writeByte" in output) {
        return output;
      } else {
        outputStream.buffer = output;
        resizeOk = false;
      }
    } else {
      outputStream.buffer = new Buffer(16384);
    }
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
        if (!resizeOk)
          throw new TypeError("outputsize does not match decoded input");
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
      if (bz._init_block()) {
        bz._read_bunzip();
      } else {
        var targetStreamCRC = bz.reader.read(32) >>> 0;
        if (targetStreamCRC !== bz.streamCRC) {
          _throw(Err.DATA_ERROR, "Bad stream CRC (got " + bz.streamCRC.toString(16) + " expected " + targetStreamCRC.toString(16) + ")");
        }
        if (multistream && "eof" in inputStream && !inputStream.eof()) {
          bz._start_bunzip(inputStream, outputStream);
        } else break;
      }
    }
    if ("getBuffer" in outputStream)
      return outputStream.getBuffer();
  };
  Bunzip.decodeBlock = function(input, pos, output) {
    var inputStream = coerceInputStream(input);
    var outputStream = coerceOutputStream(output);
    var bz = new Bunzip(inputStream, outputStream);
    bz.reader.seek(pos);
    var moreBlocks = bz._get_next_block();
    if (moreBlocks) {
      bz.blockCRC = new CRC32();
      bz.writeCopies = 0;
      bz._read_bunzip();
    }
    if ("getBuffer" in outputStream)
      return outputStream.getBuffer();
  };
  Bunzip.table = function(input, callback, multistream) {
    var inputStream = new Stream();
    inputStream.delegate = coerceInputStream(input);
    inputStream.pos = 0;
    inputStream.readByte = function() {
      this.pos++;
      return this.delegate.readByte();
    };
    if (inputStream.delegate.eof) {
      inputStream.eof = inputStream.delegate.eof.bind(inputStream.delegate);
    }
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
      if (bz.reader.hasByte) {
        position -= 8;
      }
      if (bz._init_block()) {
        var start = outputStream.pos;
        bz._read_bunzip();
        callback(position, outputStream.pos - start);
      } else {
        bz.reader.read(32);
        if (multistream && "eof" in inputStream && !inputStream.eof()) {
          bz._start_bunzip(inputStream, outputStream);
          console.assert(
            bz.dbufSize === blockSize,
            "shouldn't change block size within multistream file"
          );
        } else break;
      }
    }
  };
  Bunzip.Stream = Stream;
  Bunzip.version = pjson.version;
  Bunzip.license = pjson.license;
  lib = Bunzip;
  return lib;
}
var through = { exports: {} };
var hasRequiredThrough;
function requireThrough() {
  if (hasRequiredThrough) return through.exports;
  hasRequiredThrough = 1;
  (function(module, exports) {
    var Stream = require$$0$1;
    module.exports = through2;
    through2.through = through2;
    function through2(write, end, opts) {
      write = write || function(data) {
        this.queue(data);
      };
      end = end || function() {
        this.queue(null);
      };
      var ended = false, destroyed = false, buffer = [], _ended = false;
      var stream2 = new Stream();
      stream2.readable = stream2.writable = true;
      stream2.paused = false;
      stream2.autoDestroy = !(opts && opts.autoDestroy === false);
      stream2.write = function(data) {
        write.call(this, data);
        return !stream2.paused;
      };
      function drain() {
        while (buffer.length && !stream2.paused) {
          var data = buffer.shift();
          if (null === data)
            return stream2.emit("end");
          else
            stream2.emit("data", data);
        }
      }
      stream2.queue = stream2.push = function(data) {
        if (_ended) return stream2;
        if (data === null) _ended = true;
        buffer.push(data);
        drain();
        return stream2;
      };
      stream2.on("end", function() {
        stream2.readable = false;
        if (!stream2.writable && stream2.autoDestroy)
          process.nextTick(function() {
            stream2.destroy();
          });
      });
      function _end() {
        stream2.writable = false;
        end.call(stream2);
        if (!stream2.readable && stream2.autoDestroy)
          stream2.destroy();
      }
      stream2.end = function(data) {
        if (ended) return;
        ended = true;
        if (arguments.length) stream2.write(data);
        _end();
        return stream2;
      };
      stream2.destroy = function() {
        if (destroyed) return;
        destroyed = true;
        ended = true;
        buffer.length = 0;
        stream2.writable = stream2.readable = false;
        stream2.emit("close");
        return stream2;
      };
      stream2.pause = function() {
        if (stream2.paused) return;
        stream2.paused = true;
        return stream2;
      };
      stream2.resume = function() {
        if (stream2.paused) {
          stream2.paused = false;
          stream2.emit("resume");
        }
        drain();
        if (!stream2.paused)
          stream2.emit("drain");
        return stream2;
      };
      return stream2;
    }
  })(through);
  return through.exports;
}
var bzip2_1;
var hasRequiredBzip2;
function requireBzip2() {
  if (hasRequiredBzip2) return bzip2_1;
  hasRequiredBzip2 = 1;
  function Bzip2Error(message2) {
    this.name = "Bzip2Error";
    this.message = message2;
    this.stack = new Error().stack;
  }
  Bzip2Error.prototype = new Error();
  var message = {
    Error: function(message2) {
      throw new Bzip2Error(message2);
    }
  };
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
    var BITMASK = [0, 1, 3, 7, 15, 31, 63, 127, 255];
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
  bzip2.simple = function(srcbuffer, stream2) {
    var bits = bzip2.array(srcbuffer);
    var size = bzip2.header(bits);
    var ret = false;
    var bufsize = 1e5 * size;
    var buf = new Int32Array(bufsize);
    do {
      ret = bzip2.decompress(bits, stream2, buf, bufsize);
    } while (!ret);
  };
  bzip2.header = function(bits) {
    this.byteCount = new Int32Array(256);
    this.symToByte = new Uint8Array(256);
    this.mtfSymbol = new Int32Array(256);
    this.selectors = new Uint8Array(32768);
    if (bits(8 * 3) != 4348520) message.Error("No magic number found");
    var i = bits(8) - 48;
    if (i < 1 || i > 9) message.Error("Not a BZIP archive");
    return i;
  };
  bzip2.decompress = function(bits, stream2, buf, bufsize, streamCRC) {
    var MAX_HUFCODE_BITS = 20;
    var MAX_SYMBOLS = 258;
    var SYMBOL_RUNA = 0;
    var SYMBOL_RUNB = 1;
    var GROUP_SIZE = 50;
    var crc = 0 ^ -1;
    for (var h = "", i = 0; i < 6; i++) h += bits(8).toString(16);
    if (h == "177245385090") {
      var finalCRC = bits(32) | 0;
      if (finalCRC !== streamCRC) message.Error("Error in bzip2: crc32 do not match");
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
    for (i = 0; i < 16; i++) {
      if (t & 1 << 15 - i) {
        var k = bits(16);
        for (j = 0; j < 16; j++) {
          if (k & 1 << 15 - j) {
            this.symToByte[symTotal++] = 16 * i + j;
          }
        }
      }
    }
    var groupCount = bits(3);
    if (groupCount < 2 || groupCount > 6) message.Error("another error");
    var nSelectors = bits(15);
    if (nSelectors == 0) message.Error("meh");
    for (var i = 0; i < groupCount; i++) this.mtfSymbol[i] = i;
    for (var i = 0; i < nSelectors; i++) {
      for (var j = 0; bits(1); j++) if (j >= groupCount) message.Error("whoops another error");
      var uc = this.mtfSymbol[j];
      for (var k = j - 1; k >= 0; k--) {
        this.mtfSymbol[k + 1] = this.mtfSymbol[k];
      }
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
      var minLen, maxLen;
      minLen = maxLen = length[0];
      for (var i = 1; i < symCount; i++) {
        if (length[i] > maxLen) maxLen = length[i];
        else if (length[i] < minLen) minLen = length[i];
      }
      hufGroup = groups[j] = {};
      hufGroup.permute = new Int32Array(MAX_SYMBOLS);
      hufGroup.limit = new Int32Array(MAX_HUFCODE_BITS + 1);
      hufGroup.base = new Int32Array(MAX_HUFCODE_BITS + 1);
      hufGroup.minLen = minLen;
      hufGroup.maxLen = maxLen;
      var base = hufGroup.base;
      var limit = hufGroup.limit;
      var pp = 0;
      for (var i = minLen; i <= maxLen; i++)
        for (var t = 0; t < symCount; t++)
          if (length[t] == i) hufGroup.permute[pp++] = t;
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
    var runPos, count, symCount, selector;
    runPos = count = symCount = selector = 0;
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
      for (var k = i - 1; k >= 0; k--) {
        this.mtfSymbol[k + 1] = this.mtfSymbol[k];
      }
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
        stream2(outbyte);
      }
      if (current != previous) run = 0;
    }
    crc = (crc ^ -1) >>> 0;
    if ((crc | 0) != (crcblock | 0)) message.Error("Error in bzip2: crc32 do not match");
    streamCRC = (crc ^ (streamCRC << 1 | streamCRC >>> 31)) & 4294967295;
    return streamCRC;
  };
  bzip2_1 = bzip2;
  return bzip2_1;
}
var bit_iterator;
var hasRequiredBit_iterator;
function requireBit_iterator() {
  if (hasRequiredBit_iterator) return bit_iterator;
  hasRequiredBit_iterator = 1;
  var BITMASK = [0, 1, 3, 7, 15, 31, 63, 127, 255];
  bit_iterator = function bitIterator(nextBuffer) {
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
        if (bit === 0 && n > 0)
          f.bytesRead++;
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
  return bit_iterator;
}
var unbzip2Stream_1;
var hasRequiredUnbzip2Stream;
function requireUnbzip2Stream() {
  if (hasRequiredUnbzip2Stream) return unbzip2Stream_1;
  hasRequiredUnbzip2Stream = 1;
  var through2 = requireThrough();
  var bz2 = requireBzip2();
  var bitIterator = requireBit_iterator();
  unbzip2Stream_1 = unbzip2Stream;
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
    function decompressAndQueue(stream2) {
      if (broken) return;
      try {
        return decompressBlock(function(d) {
          stream2.queue(d);
          if (d !== null) {
            outlength += d.length;
          } else {
          }
        });
      } catch (e) {
        stream2.emit("error", e);
        broken = true;
        return false;
      }
    }
    return through2(
      function write(data) {
        bufferQueue.push(data);
        hasBytes += data.length;
        if (bitReader === null) {
          bitReader = bitIterator(function() {
            return bufferQueue.shift();
          });
        }
        while (!broken && hasBytes - bitReader.bytesRead + 1 >= (25e3 + 1e5 * blockSize || 4)) {
          decompressAndQueue(this);
        }
      },
      function end(x) {
        while (!broken && bitReader && hasBytes > bitReader.bytesRead) {
          decompressAndQueue(this);
        }
        if (!broken) {
          if (streamCRC !== null)
            this.emit("error", new Error("input stream ended prematurely"));
          this.queue(null);
        }
      }
    );
  }
  return unbzip2Stream_1;
}
var decompressTarbz2;
var hasRequiredDecompressTarbz2;
function requireDecompressTarbz2() {
  if (hasRequiredDecompressTarbz2) return decompressTarbz2;
  hasRequiredDecompressTarbz2 = 1;
  const decompressTar2 = requireDecompressTar();
  const fileType2 = requireFileType$1();
  const isStream2 = requireIsStream();
  const seekBzip = requireLib();
  const unbzip2Stream = requireUnbzip2Stream();
  decompressTarbz2 = () => (input) => {
    if (!Buffer.isBuffer(input) && !isStream2(input)) {
      return Promise.reject(new TypeError(`Expected a Buffer or Stream, got ${typeof input}`));
    }
    if (Buffer.isBuffer(input) && (!fileType2(input) || fileType2(input).ext !== "bz2")) {
      return Promise.resolve([]);
    }
    if (Buffer.isBuffer(input)) {
      return decompressTar2()(seekBzip.decode(input));
    }
    return decompressTar2()(input.pipe(unbzip2Stream()));
  };
  return decompressTarbz2;
}
var decompressTargz;
var hasRequiredDecompressTargz;
function requireDecompressTargz() {
  if (hasRequiredDecompressTargz) return decompressTargz;
  hasRequiredDecompressTargz = 1;
  const zlib = require$$0$4;
  const decompressTar2 = requireDecompressTar();
  const fileType2 = requireFileType$2();
  const isStream2 = requireIsStream();
  decompressTargz = () => (input) => {
    if (!Buffer.isBuffer(input) && !isStream2(input)) {
      return Promise.reject(new TypeError(`Expected a Buffer or Stream, got ${typeof input}`));
    }
    if (Buffer.isBuffer(input) && (!fileType2(input) || fileType2(input).ext !== "gz")) {
      return Promise.resolve([]);
    }
    const unzip = zlib.createGunzip();
    const result = decompressTar2()(unzip);
    if (Buffer.isBuffer(input)) {
      unzip.end(input);
    } else {
      input.pipe(unzip);
    }
    return result;
  };
  return decompressTargz;
}
var fileType;
var hasRequiredFileType;
function requireFileType() {
  if (hasRequiredFileType) return fileType;
  hasRequiredFileType = 1;
  fileType = function(buf) {
    if (!(buf && buf.length > 1)) {
      return null;
    }
    if (buf[0] === 255 && buf[1] === 216 && buf[2] === 255) {
      return {
        ext: "jpg",
        mime: "image/jpeg"
      };
    }
    if (buf[0] === 137 && buf[1] === 80 && buf[2] === 78 && buf[3] === 71) {
      return {
        ext: "png",
        mime: "image/png"
      };
    }
    if (buf[0] === 71 && buf[1] === 73 && buf[2] === 70) {
      return {
        ext: "gif",
        mime: "image/gif"
      };
    }
    if (buf[8] === 87 && buf[9] === 69 && buf[10] === 66 && buf[11] === 80) {
      return {
        ext: "webp",
        mime: "image/webp"
      };
    }
    if (buf[0] === 70 && buf[1] === 76 && buf[2] === 73 && buf[3] === 70) {
      return {
        ext: "flif",
        mime: "image/flif"
      };
    }
    if ((buf[0] === 73 && buf[1] === 73 && buf[2] === 42 && buf[3] === 0 || buf[0] === 77 && buf[1] === 77 && buf[2] === 0 && buf[3] === 42) && buf[8] === 67 && buf[9] === 82) {
      return {
        ext: "cr2",
        mime: "image/x-canon-cr2"
      };
    }
    if (buf[0] === 73 && buf[1] === 73 && buf[2] === 42 && buf[3] === 0 || buf[0] === 77 && buf[1] === 77 && buf[2] === 0 && buf[3] === 42) {
      return {
        ext: "tif",
        mime: "image/tiff"
      };
    }
    if (buf[0] === 66 && buf[1] === 77) {
      return {
        ext: "bmp",
        mime: "image/bmp"
      };
    }
    if (buf[0] === 73 && buf[1] === 73 && buf[2] === 188) {
      return {
        ext: "jxr",
        mime: "image/vnd.ms-photo"
      };
    }
    if (buf[0] === 56 && buf[1] === 66 && buf[2] === 80 && buf[3] === 83) {
      return {
        ext: "psd",
        mime: "image/vnd.adobe.photoshop"
      };
    }
    if (buf[0] === 80 && buf[1] === 75 && buf[2] === 3 && buf[3] === 4 && buf[30] === 109 && buf[31] === 105 && buf[32] === 109 && buf[33] === 101 && buf[34] === 116 && buf[35] === 121 && buf[36] === 112 && buf[37] === 101 && buf[38] === 97 && buf[39] === 112 && buf[40] === 112 && buf[41] === 108 && buf[42] === 105 && buf[43] === 99 && buf[44] === 97 && buf[45] === 116 && buf[46] === 105 && buf[47] === 111 && buf[48] === 110 && buf[49] === 47 && buf[50] === 101 && buf[51] === 112 && buf[52] === 117 && buf[53] === 98 && buf[54] === 43 && buf[55] === 122 && buf[56] === 105 && buf[57] === 112) {
      return {
        ext: "epub",
        mime: "application/epub+zip"
      };
    }
    if (buf[0] === 80 && buf[1] === 75 && buf[2] === 3 && buf[3] === 4 && buf[30] === 77 && buf[31] === 69 && buf[32] === 84 && buf[33] === 65 && buf[34] === 45 && buf[35] === 73 && buf[36] === 78 && buf[37] === 70 && buf[38] === 47 && buf[39] === 109 && buf[40] === 111 && buf[41] === 122 && buf[42] === 105 && buf[43] === 108 && buf[44] === 108 && buf[45] === 97 && buf[46] === 46 && buf[47] === 114 && buf[48] === 115 && buf[49] === 97) {
      return {
        ext: "xpi",
        mime: "application/x-xpinstall"
      };
    }
    if (buf[0] === 80 && buf[1] === 75 && (buf[2] === 3 || buf[2] === 5 || buf[2] === 7) && (buf[3] === 4 || buf[3] === 6 || buf[3] === 8)) {
      return {
        ext: "zip",
        mime: "application/zip"
      };
    }
    if (buf[257] === 117 && buf[258] === 115 && buf[259] === 116 && buf[260] === 97 && buf[261] === 114) {
      return {
        ext: "tar",
        mime: "application/x-tar"
      };
    }
    if (buf[0] === 82 && buf[1] === 97 && buf[2] === 114 && buf[3] === 33 && buf[4] === 26 && buf[5] === 7 && (buf[6] === 0 || buf[6] === 1)) {
      return {
        ext: "rar",
        mime: "application/x-rar-compressed"
      };
    }
    if (buf[0] === 31 && buf[1] === 139 && buf[2] === 8) {
      return {
        ext: "gz",
        mime: "application/gzip"
      };
    }
    if (buf[0] === 66 && buf[1] === 90 && buf[2] === 104) {
      return {
        ext: "bz2",
        mime: "application/x-bzip2"
      };
    }
    if (buf[0] === 55 && buf[1] === 122 && buf[2] === 188 && buf[3] === 175 && buf[4] === 39 && buf[5] === 28) {
      return {
        ext: "7z",
        mime: "application/x-7z-compressed"
      };
    }
    if (buf[0] === 120 && buf[1] === 1) {
      return {
        ext: "dmg",
        mime: "application/x-apple-diskimage"
      };
    }
    if (buf[0] === 0 && buf[1] === 0 && buf[2] === 0 && (buf[3] === 24 || buf[3] === 32) && buf[4] === 102 && buf[5] === 116 && buf[6] === 121 && buf[7] === 112 || buf[0] === 51 && buf[1] === 103 && buf[2] === 112 && buf[3] === 53 || buf[0] === 0 && buf[1] === 0 && buf[2] === 0 && buf[3] === 28 && buf[4] === 102 && buf[5] === 116 && buf[6] === 121 && buf[7] === 112 && buf[8] === 109 && buf[9] === 112 && buf[10] === 52 && buf[11] === 50 && buf[16] === 109 && buf[17] === 112 && buf[18] === 52 && buf[19] === 49 && buf[20] === 109 && buf[21] === 112 && buf[22] === 52 && buf[23] === 50 && buf[24] === 105 && buf[25] === 115 && buf[26] === 111 && buf[27] === 109 || buf[0] === 0 && buf[1] === 0 && buf[2] === 0 && buf[3] === 28 && buf[4] === 102 && buf[5] === 116 && buf[6] === 121 && buf[7] === 112 && buf[8] === 105 && buf[9] === 115 && buf[10] === 111 && buf[11] === 109 || buf[0] === 0 && buf[1] === 0 && buf[2] === 0 && buf[3] === 28 && buf[4] === 102 && buf[5] === 116 && buf[6] === 121 && buf[7] === 112 && buf[8] === 109 && buf[9] === 112 && buf[10] === 52 && buf[11] === 50 && buf[12] === 0 && buf[13] === 0 && buf[14] === 0 && buf[15] === 0) {
      return {
        ext: "mp4",
        mime: "video/mp4"
      };
    }
    if (buf[0] === 0 && buf[1] === 0 && buf[2] === 0 && buf[3] === 28 && buf[4] === 102 && buf[5] === 116 && buf[6] === 121 && buf[7] === 112 && buf[8] === 77 && buf[9] === 52 && buf[10] === 86) {
      return {
        ext: "m4v",
        mime: "video/x-m4v"
      };
    }
    if (buf[0] === 77 && buf[1] === 84 && buf[2] === 104 && buf[3] === 100) {
      return {
        ext: "mid",
        mime: "audio/midi"
      };
    }
    if (buf[31] === 109 && buf[32] === 97 && buf[33] === 116 && buf[34] === 114 && buf[35] === 111 && buf[36] === 115 && buf[37] === 107 && buf[38] === 97) {
      return {
        ext: "mkv",
        mime: "video/x-matroska"
      };
    }
    if (buf[0] === 26 && buf[1] === 69 && buf[2] === 223 && buf[3] === 163) {
      return {
        ext: "webm",
        mime: "video/webm"
      };
    }
    if (buf[0] === 0 && buf[1] === 0 && buf[2] === 0 && buf[3] === 20 && buf[4] === 102 && buf[5] === 116 && buf[6] === 121 && buf[7] === 112) {
      return {
        ext: "mov",
        mime: "video/quicktime"
      };
    }
    if (buf[0] === 82 && buf[1] === 73 && buf[2] === 70 && buf[3] === 70 && buf[8] === 65 && buf[9] === 86 && buf[10] === 73) {
      return {
        ext: "avi",
        mime: "video/x-msvideo"
      };
    }
    if (buf[0] === 48 && buf[1] === 38 && buf[2] === 178 && buf[3] === 117 && buf[4] === 142 && buf[5] === 102 && buf[6] === 207 && buf[7] === 17 && buf[8] === 166 && buf[9] === 217) {
      return {
        ext: "wmv",
        mime: "video/x-ms-wmv"
      };
    }
    if (buf[0] === 0 && buf[1] === 0 && buf[2] === 1 && buf[3].toString(16)[0] === "b") {
      return {
        ext: "mpg",
        mime: "video/mpeg"
      };
    }
    if (buf[0] === 73 && buf[1] === 68 && buf[2] === 51 || buf[0] === 255 && buf[1] === 251) {
      return {
        ext: "mp3",
        mime: "audio/mpeg"
      };
    }
    if (buf[4] === 102 && buf[5] === 116 && buf[6] === 121 && buf[7] === 112 && buf[8] === 77 && buf[9] === 52 && buf[10] === 65 || buf[0] === 77 && buf[1] === 52 && buf[2] === 65 && buf[3] === 32) {
      return {
        ext: "m4a",
        mime: "audio/m4a"
      };
    }
    if (buf[28] === 79 && buf[29] === 112 && buf[30] === 117 && buf[31] === 115 && buf[32] === 72 && buf[33] === 101 && buf[34] === 97 && buf[35] === 100) {
      return {
        ext: "opus",
        mime: "audio/opus"
      };
    }
    if (buf[0] === 79 && buf[1] === 103 && buf[2] === 103 && buf[3] === 83) {
      return {
        ext: "ogg",
        mime: "audio/ogg"
      };
    }
    if (buf[0] === 102 && buf[1] === 76 && buf[2] === 97 && buf[3] === 67) {
      return {
        ext: "flac",
        mime: "audio/x-flac"
      };
    }
    if (buf[0] === 82 && buf[1] === 73 && buf[2] === 70 && buf[3] === 70 && buf[8] === 87 && buf[9] === 65 && buf[10] === 86 && buf[11] === 69) {
      return {
        ext: "wav",
        mime: "audio/x-wav"
      };
    }
    if (buf[0] === 35 && buf[1] === 33 && buf[2] === 65 && buf[3] === 77 && buf[4] === 82 && buf[5] === 10) {
      return {
        ext: "amr",
        mime: "audio/amr"
      };
    }
    if (buf[0] === 37 && buf[1] === 80 && buf[2] === 68 && buf[3] === 70) {
      return {
        ext: "pdf",
        mime: "application/pdf"
      };
    }
    if (buf[0] === 77 && buf[1] === 90) {
      return {
        ext: "exe",
        mime: "application/x-msdownload"
      };
    }
    if ((buf[0] === 67 || buf[0] === 70) && buf[1] === 87 && buf[2] === 83) {
      return {
        ext: "swf",
        mime: "application/x-shockwave-flash"
      };
    }
    if (buf[0] === 123 && buf[1] === 92 && buf[2] === 114 && buf[3] === 116 && buf[4] === 102) {
      return {
        ext: "rtf",
        mime: "application/rtf"
      };
    }
    if (buf[0] === 119 && buf[1] === 79 && buf[2] === 70 && buf[3] === 70 && (buf[4] === 0 && buf[5] === 1 && buf[6] === 0 && buf[7] === 0 || buf[4] === 79 && buf[5] === 84 && buf[6] === 84 && buf[7] === 79)) {
      return {
        ext: "woff",
        mime: "application/font-woff"
      };
    }
    if (buf[0] === 119 && buf[1] === 79 && buf[2] === 70 && buf[3] === 50 && (buf[4] === 0 && buf[5] === 1 && buf[6] === 0 && buf[7] === 0 || buf[4] === 79 && buf[5] === 84 && buf[6] === 84 && buf[7] === 79)) {
      return {
        ext: "woff2",
        mime: "application/font-woff"
      };
    }
    if (buf[34] === 76 && buf[35] === 80 && (buf[8] === 0 && buf[9] === 0 && buf[10] === 1 || buf[8] === 1 && buf[9] === 0 && buf[10] === 2 || buf[8] === 2 && buf[9] === 0 && buf[10] === 2)) {
      return {
        ext: "eot",
        mime: "application/octet-stream"
      };
    }
    if (buf[0] === 0 && buf[1] === 1 && buf[2] === 0 && buf[3] === 0 && buf[4] === 0) {
      return {
        ext: "ttf",
        mime: "application/font-sfnt"
      };
    }
    if (buf[0] === 79 && buf[1] === 84 && buf[2] === 84 && buf[3] === 79 && buf[4] === 0) {
      return {
        ext: "otf",
        mime: "application/font-sfnt"
      };
    }
    if (buf[0] === 0 && buf[1] === 0 && buf[2] === 1 && buf[3] === 0) {
      return {
        ext: "ico",
        mime: "image/x-icon"
      };
    }
    if (buf[0] === 70 && buf[1] === 76 && buf[2] === 86 && buf[3] === 1) {
      return {
        ext: "flv",
        mime: "video/x-flv"
      };
    }
    if (buf[0] === 37 && buf[1] === 33) {
      return {
        ext: "ps",
        mime: "application/postscript"
      };
    }
    if (buf[0] === 253 && buf[1] === 55 && buf[2] === 122 && buf[3] === 88 && buf[4] === 90 && buf[5] === 0) {
      return {
        ext: "xz",
        mime: "application/x-xz"
      };
    }
    if (buf[0] === 83 && buf[1] === 81 && buf[2] === 76 && buf[3] === 105) {
      return {
        ext: "sqlite",
        mime: "application/x-sqlite3"
      };
    }
    if (buf[0] === 78 && buf[1] === 69 && buf[2] === 83 && buf[3] === 26) {
      return {
        ext: "nes",
        mime: "application/x-nintendo-nes-rom"
      };
    }
    if (buf[0] === 67 && buf[1] === 114 && buf[2] === 50 && buf[3] === 52) {
      return {
        ext: "crx",
        mime: "application/x-google-chrome-extension"
      };
    }
    if (buf[0] === 77 && buf[1] === 83 && buf[2] === 67 && buf[3] === 70 || buf[0] === 73 && buf[1] === 83 && buf[2] === 99 && buf[3] === 40) {
      return {
        ext: "cab",
        mime: "application/vnd.ms-cab-compressed"
      };
    }
    if (buf[0] === 33 && buf[1] === 60 && buf[2] === 97 && buf[3] === 114 && buf[4] === 99 && buf[5] === 104 && buf[6] === 62 && buf[7] === 10 && buf[8] === 100 && buf[9] === 101 && buf[10] === 98 && buf[11] === 105 && buf[12] === 97 && buf[13] === 110 && buf[14] === 45 && buf[15] === 98 && buf[16] === 105 && buf[17] === 110 && buf[18] === 97 && buf[19] === 114 && buf[20] === 121) {
      return {
        ext: "deb",
        mime: "application/x-deb"
      };
    }
    if (buf[0] === 33 && buf[1] === 60 && buf[2] === 97 && buf[3] === 114 && buf[4] === 99 && buf[5] === 104 && buf[6] === 62) {
      return {
        ext: "ar",
        mime: "application/x-unix-archive"
      };
    }
    if (buf[0] === 237 && buf[1] === 171 && buf[2] === 238 && buf[3] === 219) {
      return {
        ext: "rpm",
        mime: "application/x-rpm"
      };
    }
    if (buf[0] === 31 && buf[1] === 160 || buf[0] === 31 && buf[1] === 157) {
      return {
        ext: "Z",
        mime: "application/x-compress"
      };
    }
    if (buf[0] === 76 && buf[1] === 90 && buf[2] === 73 && buf[3] === 80) {
      return {
        ext: "lz",
        mime: "application/x-lzip"
      };
    }
    if (buf[0] === 208 && buf[1] === 207 && buf[2] === 17 && buf[3] === 224 && buf[4] === 161 && buf[5] === 177 && buf[6] === 26 && buf[7] === 225) {
      return {
        ext: "msi",
        mime: "application/x-msi"
      };
    }
    return null;
  };
  return fileType;
}
var getStream = { exports: {} };
var pinkie;
var hasRequiredPinkie;
function requirePinkie() {
  if (hasRequiredPinkie) return pinkie;
  hasRequiredPinkie = 1;
  var PENDING = "pending";
  var SETTLED = "settled";
  var FULFILLED = "fulfilled";
  var REJECTED = "rejected";
  var NOOP = function() {
  };
  var isNode = typeof commonjsGlobal !== "undefined" && typeof commonjsGlobal.process !== "undefined" && typeof commonjsGlobal.process.emit === "function";
  var asyncSetTimer = typeof setImmediate === "undefined" ? setTimeout : setImmediate;
  var asyncQueue = [];
  var asyncTimer;
  function asyncFlush() {
    for (var i = 0; i < asyncQueue.length; i++) {
      asyncQueue[i][0](asyncQueue[i][1]);
    }
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
      if (settled === FULFILLED) {
        resolve(promise, value);
      }
      if (settled === REJECTED) {
        reject(promise, value);
      }
    }
  }
  function handleThenable(promise, value) {
    var resolved;
    try {
      if (promise === value) {
        throw new TypeError("A promises callback cannot return that same promise.");
      }
      if (value && (typeof value === "function" || typeof value === "object")) {
        var then = value.then;
        if (typeof then === "function") {
          then.call(value, function(val) {
            if (!resolved) {
              resolved = true;
              if (value === val) {
                fulfill(promise, val);
              } else {
                resolve(promise, val);
              }
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
      if (!resolved) {
        reject(promise, e);
      }
      return true;
    }
    return false;
  }
  function resolve(promise, value) {
    if (promise === value || !handleThenable(promise, value)) {
      fulfill(promise, value);
    }
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
    if (!promise._handled && isNode) {
      commonjsGlobal.process.emit("unhandledRejection", promise._data, promise);
    }
  }
  function notifyRejectionHandled(promise) {
    commonjsGlobal.process.emit("rejectionHandled", promise);
  }
  function Promise2(resolver) {
    if (typeof resolver !== "function") {
      throw new TypeError("Promise resolver " + resolver + " is not a function");
    }
    if (this instanceof Promise2 === false) {
      throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
    }
    this._then = [];
    invokeResolver(resolver, this);
  }
  Promise2.prototype = {
    constructor: Promise2,
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
        if (this._state === REJECTED && isNode) {
          asyncCall(notifyRejectionHandled, this);
        }
      }
      if (this._state === FULFILLED || this._state === REJECTED) {
        asyncCall(invokeCallback, subscriber);
      } else {
        this._then.push(subscriber);
      }
      return subscriber.then;
    },
    catch: function(onRejection) {
      return this.then(null, onRejection);
    }
  };
  Promise2.all = function(promises) {
    if (!Array.isArray(promises)) {
      throw new TypeError("You must pass an array to Promise.all().");
    }
    return new Promise2(function(resolve2, reject2) {
      var results = [];
      var remaining = 0;
      function resolver(index) {
        remaining++;
        return function(value) {
          results[index] = value;
          if (!--remaining) {
            resolve2(results);
          }
        };
      }
      for (var i = 0, promise; i < promises.length; i++) {
        promise = promises[i];
        if (promise && typeof promise.then === "function") {
          promise.then(resolver(i), reject2);
        } else {
          results[i] = promise;
        }
      }
      if (!remaining) {
        resolve2(results);
      }
    });
  };
  Promise2.race = function(promises) {
    if (!Array.isArray(promises)) {
      throw new TypeError("You must pass an array to Promise.race().");
    }
    return new Promise2(function(resolve2, reject2) {
      for (var i = 0, promise; i < promises.length; i++) {
        promise = promises[i];
        if (promise && typeof promise.then === "function") {
          promise.then(resolve2, reject2);
        } else {
          resolve2(promise);
        }
      }
    });
  };
  Promise2.resolve = function(value) {
    if (value && typeof value === "object" && value.constructor === Promise2) {
      return value;
    }
    return new Promise2(function(resolve2) {
      resolve2(value);
    });
  };
  Promise2.reject = function(reason) {
    return new Promise2(function(resolve2, reject2) {
      reject2(reason);
    });
  };
  pinkie = Promise2;
  return pinkie;
}
var pinkiePromise;
var hasRequiredPinkiePromise;
function requirePinkiePromise() {
  if (hasRequiredPinkiePromise) return pinkiePromise;
  hasRequiredPinkiePromise = 1;
  pinkiePromise = typeof Promise === "function" ? Promise : requirePinkie();
  return pinkiePromise;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var objectAssign;
var hasRequiredObjectAssign;
function requireObjectAssign() {
  if (hasRequiredObjectAssign) return objectAssign;
  hasRequiredObjectAssign = 1;
  var getOwnPropertySymbols = Object.getOwnPropertySymbols;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var propIsEnumerable = Object.prototype.propertyIsEnumerable;
  function toObject(val) {
    if (val === null || val === void 0) {
      throw new TypeError("Object.assign cannot be called with null or undefined");
    }
    return Object(val);
  }
  function shouldUseNative() {
    try {
      if (!Object.assign) {
        return false;
      }
      var test1 = new String("abc");
      test1[5] = "de";
      if (Object.getOwnPropertyNames(test1)[0] === "5") {
        return false;
      }
      var test2 = {};
      for (var i = 0; i < 10; i++) {
        test2["_" + String.fromCharCode(i)] = i;
      }
      var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
        return test2[n];
      });
      if (order2.join("") !== "0123456789") {
        return false;
      }
      var test3 = {};
      "abcdefghijklmnopqrst".split("").forEach(function(letter) {
        test3[letter] = letter;
      });
      if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
        return false;
      }
      return true;
    } catch (err) {
      return false;
    }
  }
  objectAssign = shouldUseNative() ? Object.assign : function(target, source) {
    var from;
    var to = toObject(target);
    var symbols;
    for (var s = 1; s < arguments.length; s++) {
      from = Object(arguments[s]);
      for (var key in from) {
        if (hasOwnProperty.call(from, key)) {
          to[key] = from[key];
        }
      }
      if (getOwnPropertySymbols) {
        symbols = getOwnPropertySymbols(from);
        for (var i = 0; i < symbols.length; i++) {
          if (propIsEnumerable.call(from, symbols[i])) {
            to[symbols[i]] = from[symbols[i]];
          }
        }
      }
    }
    return to;
  };
  return objectAssign;
}
var bufferStream;
var hasRequiredBufferStream;
function requireBufferStream() {
  if (hasRequiredBufferStream) return bufferStream;
  hasRequiredBufferStream = 1;
  var PassThrough = require$$0$1.PassThrough;
  var objectAssign2 = requireObjectAssign();
  bufferStream = function(opts) {
    opts = objectAssign2({}, opts);
    var array = opts.array;
    var encoding = opts.encoding;
    var buffer = encoding === "buffer";
    var objectMode = false;
    if (array) {
      objectMode = !(encoding || buffer);
    } else {
      encoding = encoding || "utf8";
    }
    if (buffer) {
      encoding = null;
    }
    var len = 0;
    var ret = [];
    var stream2 = new PassThrough({ objectMode });
    if (encoding) {
      stream2.setEncoding(encoding);
    }
    stream2.on("data", function(chunk) {
      ret.push(chunk);
      if (objectMode) {
        len = ret.length;
      } else {
        len += chunk.length;
      }
    });
    stream2.getBufferedValue = function() {
      if (array) {
        return ret;
      }
      return buffer ? Buffer.concat(ret, len) : ret.join("");
    };
    stream2.getBufferedLength = function() {
      return len;
    };
    return stream2;
  };
  return bufferStream;
}
var hasRequiredGetStream;
function requireGetStream() {
  if (hasRequiredGetStream) return getStream.exports;
  hasRequiredGetStream = 1;
  var Promise2 = requirePinkiePromise();
  var objectAssign2 = requireObjectAssign();
  var bufferStream2 = requireBufferStream();
  function getStream$1(inputStream, opts) {
    if (!inputStream) {
      return Promise2.reject(new Error("Expected a stream"));
    }
    opts = objectAssign2({ maxBuffer: Infinity }, opts);
    var maxBuffer = opts.maxBuffer;
    var stream2;
    var clean;
    var p = new Promise2(function(resolve, reject) {
      stream2 = bufferStream2(opts);
      inputStream.once("error", error);
      inputStream.pipe(stream2);
      stream2.on("data", function() {
        if (stream2.getBufferedLength() > maxBuffer) {
          reject(new Error("maxBuffer exceeded"));
        }
      });
      stream2.once("error", error);
      stream2.on("end", resolve);
      clean = function() {
        if (inputStream.unpipe) {
          inputStream.unpipe(stream2);
        }
      };
      function error(err) {
        if (err) {
          err.bufferedData = stream2.getBufferedValue();
        }
        reject(err);
      }
    });
    p.then(clean, clean);
    return p.then(function() {
      return stream2.getBufferedValue();
    });
  }
  getStream.exports = getStream$1;
  getStream.exports.buffer = function(stream2, opts) {
    return getStream$1(stream2, objectAssign2({}, opts, { encoding: "buffer" }));
  };
  getStream.exports.array = function(stream2, opts) {
    return getStream$1(stream2, objectAssign2({}, opts, { array: true }));
  };
  return getStream.exports;
}
var pify$1 = { exports: {} };
var hasRequiredPify$1;
function requirePify$1() {
  if (hasRequiredPify$1) return pify$1.exports;
  hasRequiredPify$1 = 1;
  var processFn = function(fn, P, opts) {
    return function() {
      var that = this;
      var args = new Array(arguments.length);
      for (var i = 0; i < arguments.length; i++) {
        args[i] = arguments[i];
      }
      return new P(function(resolve, reject) {
        args.push(function(err, result) {
          if (err) {
            reject(err);
          } else if (opts.multiArgs) {
            var results = new Array(arguments.length - 1);
            for (var i2 = 1; i2 < arguments.length; i2++) {
              results[i2 - 1] = arguments[i2];
            }
            resolve(results);
          } else {
            resolve(result);
          }
        });
        fn.apply(that, args);
      });
    };
  };
  var pify2 = pify$1.exports = function(obj, P, opts) {
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
      if (opts.excludeMain) {
        return obj.apply(this, arguments);
      }
      return processFn(obj, P, opts).apply(this, arguments);
    } : {};
    return Object.keys(obj).reduce(function(ret2, key) {
      var x = obj[key];
      ret2[key] = typeof x === "function" && filter(key) ? processFn(x, P, opts) : x;
      return ret2;
    }, ret);
  };
  pify2.all = pify2;
  return pify$1.exports;
}
var yauzl = {};
var fdSlicer = {};
var pend;
var hasRequiredPend;
function requirePend() {
  if (hasRequiredPend) return pend;
  hasRequiredPend = 1;
  pend = Pend;
  function Pend() {
    this.pending = 0;
    this.max = Infinity;
    this.listeners = [];
    this.waiting = [];
    this.error = null;
  }
  Pend.prototype.go = function(fn) {
    if (this.pending < this.max) {
      pendGo(this, fn);
    } else {
      this.waiting.push(fn);
    }
  };
  Pend.prototype.wait = function(cb) {
    if (this.pending === 0) {
      cb(this.error);
    } else {
      this.listeners.push(cb);
    }
  };
  Pend.prototype.hold = function() {
    return pendHold(this);
  };
  function pendHold(self2) {
    self2.pending += 1;
    var called = false;
    return onCb;
    function onCb(err) {
      if (called) throw new Error("callback called twice");
      called = true;
      self2.error = self2.error || err;
      self2.pending -= 1;
      if (self2.waiting.length > 0 && self2.pending < self2.max) {
        pendGo(self2, self2.waiting.shift());
      } else if (self2.pending === 0) {
        var listeners = self2.listeners;
        self2.listeners = [];
        listeners.forEach(cbListener);
      }
    }
    function cbListener(listener) {
      listener(self2.error);
    }
  }
  function pendGo(self2, fn) {
    fn(pendHold(self2));
  }
  return pend;
}
var hasRequiredFdSlicer;
function requireFdSlicer() {
  if (hasRequiredFdSlicer) return fdSlicer;
  hasRequiredFdSlicer = 1;
  var fs = require$$0$2;
  var util2 = require$$1;
  var stream2 = require$$0$1;
  var Readable = stream2.Readable;
  var Writable = stream2.Writable;
  var PassThrough = stream2.PassThrough;
  var Pend = requirePend();
  var EventEmitter2 = require$$2$1.EventEmitter;
  fdSlicer.createFromBuffer = createFromBuffer;
  fdSlicer.createFromFd = createFromFd;
  fdSlicer.BufferSlicer = BufferSlicer;
  fdSlicer.FdSlicer = FdSlicer;
  util2.inherits(FdSlicer, EventEmitter2);
  function FdSlicer(fd, options) {
    options = options || {};
    EventEmitter2.call(this);
    this.fd = fd;
    this.pend = new Pend();
    this.pend.max = 1;
    this.refCount = 0;
    this.autoClose = !!options.autoClose;
  }
  FdSlicer.prototype.read = function(buffer, offset, length, position, callback) {
    var self2 = this;
    self2.pend.go(function(cb) {
      fs.read(self2.fd, buffer, offset, length, position, function(err, bytesRead, buffer2) {
        cb();
        callback(err, bytesRead, buffer2);
      });
    });
  };
  FdSlicer.prototype.write = function(buffer, offset, length, position, callback) {
    var self2 = this;
    self2.pend.go(function(cb) {
      fs.write(self2.fd, buffer, offset, length, position, function(err, written, buffer2) {
        cb();
        callback(err, written, buffer2);
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
    var self2 = this;
    self2.refCount -= 1;
    if (self2.refCount > 0) return;
    if (self2.refCount < 0) throw new Error("invalid unref");
    if (self2.autoClose) {
      fs.close(self2.fd, onCloseDone);
    }
    function onCloseDone(err) {
      if (err) {
        self2.emit("error", err);
      } else {
        self2.emit("close");
      }
    }
  };
  util2.inherits(ReadStream, Readable);
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
    var self2 = this;
    if (self2.destroyed) return;
    var toRead = Math.min(self2._readableState.highWaterMark, n);
    if (self2.endOffset != null) {
      toRead = Math.min(toRead, self2.endOffset - self2.pos);
    }
    if (toRead <= 0) {
      self2.destroyed = true;
      self2.push(null);
      self2.context.unref();
      return;
    }
    self2.context.pend.go(function(cb) {
      if (self2.destroyed) return cb();
      var buffer = new Buffer(toRead);
      fs.read(self2.context.fd, buffer, 0, toRead, self2.pos, function(err, bytesRead) {
        if (err) {
          self2.destroy(err);
        } else if (bytesRead === 0) {
          self2.destroyed = true;
          self2.push(null);
          self2.context.unref();
        } else {
          self2.pos += bytesRead;
          self2.push(buffer.slice(0, bytesRead));
        }
        cb();
      });
    });
  };
  ReadStream.prototype.destroy = function(err) {
    if (this.destroyed) return;
    err = err || new Error("stream destroyed");
    this.destroyed = true;
    this.emit("error", err);
    this.context.unref();
  };
  util2.inherits(WriteStream, Writable);
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
    var self2 = this;
    if (self2.destroyed) return;
    if (self2.pos + buffer.length > self2.endOffset) {
      var err = new Error("maximum file length exceeded");
      err.code = "ETOOBIG";
      self2.destroy();
      callback(err);
      return;
    }
    self2.context.pend.go(function(cb) {
      if (self2.destroyed) return cb();
      fs.write(self2.context.fd, buffer, 0, buffer.length, self2.pos, function(err2, bytes) {
        if (err2) {
          self2.destroy();
          cb();
          callback(err2);
        } else {
          self2.bytesWritten += bytes;
          self2.pos += bytes;
          self2.emit("progress");
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
  util2.inherits(BufferSlicer, EventEmitter2);
  function BufferSlicer(buffer, options) {
    EventEmitter2.call(this);
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
        if (offset < entireSlice.length) {
          readStream.write(entireSlice.slice(offset, entireSlice.length));
        }
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
        var err = new Error("maximum file length exceeded");
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
    if (this.refCount < 0) {
      throw new Error("invalid unref");
    }
  };
  function createFromBuffer(buffer, options) {
    return new BufferSlicer(buffer, options);
  }
  function createFromFd(fd, options) {
    return new FdSlicer(fd, options);
  }
  return fdSlicer;
}
var bufferCrc32;
var hasRequiredBufferCrc32;
function requireBufferCrc32() {
  if (hasRequiredBufferCrc32) return bufferCrc32;
  hasRequiredBufferCrc32 = 1;
  var Buffer2 = require$$0$3.Buffer;
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
  if (typeof Int32Array !== "undefined") {
    CRC_TABLE = new Int32Array(CRC_TABLE);
  }
  function ensureBuffer(input) {
    if (Buffer2.isBuffer(input)) {
      return input;
    }
    var hasNewBufferAPI = typeof Buffer2.alloc === "function" && typeof Buffer2.from === "function";
    if (typeof input === "number") {
      return hasNewBufferAPI ? Buffer2.alloc(input) : new Buffer2(input);
    } else if (typeof input === "string") {
      return hasNewBufferAPI ? Buffer2.from(input) : new Buffer2(input);
    } else {
      throw new Error("input must be buffer, number, or string, received " + typeof input);
    }
  }
  function bufferizeInt(num) {
    var tmp = ensureBuffer(4);
    tmp.writeInt32BE(num, 0);
    return tmp;
  }
  function _crc32(buf, previous) {
    buf = ensureBuffer(buf);
    if (Buffer2.isBuffer(previous)) {
      previous = previous.readUInt32BE(0);
    }
    var crc = ~~previous ^ -1;
    for (var n = 0; n < buf.length; n++) {
      crc = CRC_TABLE[(crc ^ buf[n]) & 255] ^ crc >>> 8;
    }
    return crc ^ -1;
  }
  function crc322() {
    return bufferizeInt(_crc32.apply(null, arguments));
  }
  crc322.signed = function() {
    return _crc32.apply(null, arguments);
  };
  crc322.unsigned = function() {
    return _crc32.apply(null, arguments) >>> 0;
  };
  bufferCrc32 = crc322;
  return bufferCrc32;
}
var hasRequiredYauzl;
function requireYauzl() {
  if (hasRequiredYauzl) return yauzl;
  hasRequiredYauzl = 1;
  var fs = require$$0$2;
  var zlib = require$$0$4;
  var fd_slicer = requireFdSlicer();
  var crc322 = requireBufferCrc32();
  var util2 = require$$1;
  var EventEmitter2 = require$$2$1.EventEmitter;
  var Transform = require$$0$1.Transform;
  var PassThrough = require$$0$1.PassThrough;
  var Writable = require$$0$1.Writable;
  yauzl.open = open;
  yauzl.fromFd = fromFd;
  yauzl.fromBuffer = fromBuffer;
  yauzl.fromRandomAccessReader = fromRandomAccessReader;
  yauzl.dosDateTimeToDate = dosDateTimeToDate;
  yauzl.validateFileName = validateFileName;
  yauzl.ZipFile = ZipFile;
  yauzl.Entry = Entry;
  yauzl.RandomAccessReader = RandomAccessReader;
  function open(path2, options, callback) {
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
    fs.open(path2, "r", function(err, fd) {
      if (err) return callback(err);
      fromFd(fd, options, function(err2, zipfile) {
        if (err2) fs.close(fd, defaultCallback);
        callback(err2, zipfile);
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
    fs.fstat(fd, function(err, stats) {
      if (err) return callback(err);
      var reader = fd_slicer.createFromFd(fd, { autoClose: true });
      fromRandomAccessReader(reader, stats.size, options, callback);
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
    var reader = fd_slicer.createFromBuffer(buffer, { maxChunkSize: 65536 });
    fromRandomAccessReader(reader, buffer.length, options, callback);
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
    if (totalSize > Number.MAX_SAFE_INTEGER) {
      throw new Error("zip file too large. only file sizes up to 2^52 are supported due to JavaScript's Number type being an IEEE 754 double.");
    }
    reader.ref();
    var eocdrWithoutCommentSize = 22;
    var maxCommentSize = 65535;
    var bufferSize = Math.min(eocdrWithoutCommentSize + maxCommentSize, totalSize);
    var buffer = newBuffer(bufferSize);
    var bufferReadStart = totalSize - buffer.length;
    readAndAssertNoEof(reader, buffer, 0, bufferSize, bufferReadStart, function(err) {
      if (err) return callback(err);
      for (var i = bufferSize - eocdrWithoutCommentSize; i >= 0; i -= 1) {
        if (buffer.readUInt32LE(i) !== 101010256) continue;
        var eocdrBuffer = buffer.slice(i);
        var diskNumber = eocdrBuffer.readUInt16LE(4);
        if (diskNumber !== 0) {
          return callback(new Error("multi-disk zip files are not supported: found disk number: " + diskNumber));
        }
        var entryCount = eocdrBuffer.readUInt16LE(10);
        var centralDirectoryOffset = eocdrBuffer.readUInt32LE(16);
        var commentLength = eocdrBuffer.readUInt16LE(20);
        var expectedCommentLength = eocdrBuffer.length - eocdrWithoutCommentSize;
        if (commentLength !== expectedCommentLength) {
          return callback(new Error("invalid comment length. expected: " + expectedCommentLength + ". found: " + commentLength));
        }
        var comment = decodeStrings ? decodeBuffer(eocdrBuffer, 22, eocdrBuffer.length, false) : eocdrBuffer.slice(22);
        if (!(entryCount === 65535 || centralDirectoryOffset === 4294967295)) {
          return callback(null, new ZipFile(reader, centralDirectoryOffset, totalSize, entryCount, comment, options.autoClose, options.lazyEntries, decodeStrings, options.validateEntrySizes, options.strictFileNames));
        }
        var zip64EocdlBuffer = newBuffer(20);
        var zip64EocdlOffset = bufferReadStart + i - zip64EocdlBuffer.length;
        readAndAssertNoEof(reader, zip64EocdlBuffer, 0, zip64EocdlBuffer.length, zip64EocdlOffset, function(err2) {
          if (err2) return callback(err2);
          if (zip64EocdlBuffer.readUInt32LE(0) !== 117853008) {
            return callback(new Error("invalid zip64 end of central directory locator signature"));
          }
          var zip64EocdrOffset = readUInt64LE(zip64EocdlBuffer, 8);
          var zip64EocdrBuffer = newBuffer(56);
          readAndAssertNoEof(reader, zip64EocdrBuffer, 0, zip64EocdrBuffer.length, zip64EocdrOffset, function(err3) {
            if (err3) return callback(err3);
            if (zip64EocdrBuffer.readUInt32LE(0) !== 101075792) {
              return callback(new Error("invalid zip64 end of central directory record signature"));
            }
            entryCount = readUInt64LE(zip64EocdrBuffer, 32);
            centralDirectoryOffset = readUInt64LE(zip64EocdrBuffer, 48);
            return callback(null, new ZipFile(reader, centralDirectoryOffset, totalSize, entryCount, comment, options.autoClose, options.lazyEntries, decodeStrings, options.validateEntrySizes, options.strictFileNames));
          });
        });
        return;
      }
      callback(new Error("end of central directory record signature not found"));
    });
  }
  util2.inherits(ZipFile, EventEmitter2);
  function ZipFile(reader, centralDirectoryOffset, fileSize, entryCount, comment, autoClose, lazyEntries, decodeStrings, validateEntrySizes, strictFileNames) {
    var self2 = this;
    EventEmitter2.call(self2);
    self2.reader = reader;
    self2.reader.on("error", function(err) {
      emitError(self2, err);
    });
    self2.reader.once("close", function() {
      self2.emit("close");
    });
    self2.readEntryCursor = centralDirectoryOffset;
    self2.fileSize = fileSize;
    self2.entryCount = entryCount;
    self2.comment = comment;
    self2.entriesRead = 0;
    self2.autoClose = !!autoClose;
    self2.lazyEntries = !!lazyEntries;
    self2.decodeStrings = !!decodeStrings;
    self2.validateEntrySizes = !!validateEntrySizes;
    self2.strictFileNames = !!strictFileNames;
    self2.isOpen = true;
    self2.emittedError = false;
    if (!self2.lazyEntries) self2._readEntry();
  }
  ZipFile.prototype.close = function() {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.reader.unref();
  };
  function emitErrorAndAutoClose(self2, err) {
    if (self2.autoClose) self2.close();
    emitError(self2, err);
  }
  function emitError(self2, err) {
    if (self2.emittedError) return;
    self2.emittedError = true;
    self2.emit("error", err);
  }
  ZipFile.prototype.readEntry = function() {
    if (!this.lazyEntries) throw new Error("readEntry() called without lazyEntries:true");
    this._readEntry();
  };
  ZipFile.prototype._readEntry = function() {
    var self2 = this;
    if (self2.entryCount === self2.entriesRead) {
      setImmediate(function() {
        if (self2.autoClose) self2.close();
        if (self2.emittedError) return;
        self2.emit("end");
      });
      return;
    }
    if (self2.emittedError) return;
    var buffer = newBuffer(46);
    readAndAssertNoEof(self2.reader, buffer, 0, buffer.length, self2.readEntryCursor, function(err) {
      if (err) return emitErrorAndAutoClose(self2, err);
      if (self2.emittedError) return;
      var entry = new Entry();
      var signature = buffer.readUInt32LE(0);
      if (signature !== 33639248) return emitErrorAndAutoClose(self2, new Error("invalid central directory file header signature: 0x" + signature.toString(16)));
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
      if (entry.generalPurposeBitFlag & 64) return emitErrorAndAutoClose(self2, new Error("strong encryption is not supported"));
      self2.readEntryCursor += 46;
      buffer = newBuffer(entry.fileNameLength + entry.extraFieldLength + entry.fileCommentLength);
      readAndAssertNoEof(self2.reader, buffer, 0, buffer.length, self2.readEntryCursor, function(err2) {
        if (err2) return emitErrorAndAutoClose(self2, err2);
        if (self2.emittedError) return;
        var isUtf8 = (entry.generalPurposeBitFlag & 2048) !== 0;
        entry.fileName = self2.decodeStrings ? decodeBuffer(buffer, 0, entry.fileNameLength, isUtf8) : buffer.slice(0, entry.fileNameLength);
        var fileCommentStart = entry.fileNameLength + entry.extraFieldLength;
        var extraFieldBuffer = buffer.slice(entry.fileNameLength, fileCommentStart);
        entry.extraFields = [];
        var i = 0;
        while (i < extraFieldBuffer.length - 3) {
          var headerId = extraFieldBuffer.readUInt16LE(i + 0);
          var dataSize = extraFieldBuffer.readUInt16LE(i + 2);
          var dataStart = i + 4;
          var dataEnd = dataStart + dataSize;
          if (dataEnd > extraFieldBuffer.length) return emitErrorAndAutoClose(self2, new Error("extra field length exceeds extra field buffer size"));
          var dataBuffer = newBuffer(dataSize);
          extraFieldBuffer.copy(dataBuffer, 0, dataStart, dataEnd);
          entry.extraFields.push({
            id: headerId,
            data: dataBuffer
          });
          i = dataEnd;
        }
        entry.fileComment = self2.decodeStrings ? decodeBuffer(buffer, fileCommentStart, fileCommentStart + entry.fileCommentLength, isUtf8) : buffer.slice(fileCommentStart, fileCommentStart + entry.fileCommentLength);
        entry.comment = entry.fileComment;
        self2.readEntryCursor += buffer.length;
        self2.entriesRead += 1;
        if (entry.uncompressedSize === 4294967295 || entry.compressedSize === 4294967295 || entry.relativeOffsetOfLocalHeader === 4294967295) {
          var zip64EiefBuffer = null;
          for (var i = 0; i < entry.extraFields.length; i++) {
            var extraField = entry.extraFields[i];
            if (extraField.id === 1) {
              zip64EiefBuffer = extraField.data;
              break;
            }
          }
          if (zip64EiefBuffer == null) {
            return emitErrorAndAutoClose(self2, new Error("expected zip64 extended information extra field"));
          }
          var index = 0;
          if (entry.uncompressedSize === 4294967295) {
            if (index + 8 > zip64EiefBuffer.length) {
              return emitErrorAndAutoClose(self2, new Error("zip64 extended information extra field does not include uncompressed size"));
            }
            entry.uncompressedSize = readUInt64LE(zip64EiefBuffer, index);
            index += 8;
          }
          if (entry.compressedSize === 4294967295) {
            if (index + 8 > zip64EiefBuffer.length) {
              return emitErrorAndAutoClose(self2, new Error("zip64 extended information extra field does not include compressed size"));
            }
            entry.compressedSize = readUInt64LE(zip64EiefBuffer, index);
            index += 8;
          }
          if (entry.relativeOffsetOfLocalHeader === 4294967295) {
            if (index + 8 > zip64EiefBuffer.length) {
              return emitErrorAndAutoClose(self2, new Error("zip64 extended information extra field does not include relative header offset"));
            }
            entry.relativeOffsetOfLocalHeader = readUInt64LE(zip64EiefBuffer, index);
            index += 8;
          }
        }
        if (self2.decodeStrings) {
          for (var i = 0; i < entry.extraFields.length; i++) {
            var extraField = entry.extraFields[i];
            if (extraField.id === 28789) {
              if (extraField.data.length < 6) {
                continue;
              }
              if (extraField.data.readUInt8(0) !== 1) {
                continue;
              }
              var oldNameCrc32 = extraField.data.readUInt32LE(1);
              if (crc322.unsigned(buffer.slice(0, entry.fileNameLength)) !== oldNameCrc32) {
                continue;
              }
              entry.fileName = decodeBuffer(extraField.data, 5, extraField.data.length, true);
              break;
            }
          }
        }
        if (self2.validateEntrySizes && entry.compressionMethod === 0) {
          var expectedCompressedSize = entry.uncompressedSize;
          if (entry.isEncrypted()) {
            expectedCompressedSize += 12;
          }
          if (entry.compressedSize !== expectedCompressedSize) {
            var msg = "compressed/uncompressed size mismatch for stored file: " + entry.compressedSize + " != " + entry.uncompressedSize;
            return emitErrorAndAutoClose(self2, new Error(msg));
          }
        }
        if (self2.decodeStrings) {
          if (!self2.strictFileNames) {
            entry.fileName = entry.fileName.replace(/\\/g, "/");
          }
          var errorMessage = validateFileName(entry.fileName, self2.validateFileNameOptions);
          if (errorMessage != null) return emitErrorAndAutoClose(self2, new Error(errorMessage));
        }
        self2.emit("entry", entry);
        if (!self2.lazyEntries) self2._readEntry();
      });
    });
  };
  ZipFile.prototype.openReadStream = function(entry, options, callback) {
    var self2 = this;
    var relativeStart = 0;
    var relativeEnd = entry.compressedSize;
    if (callback == null) {
      callback = options;
      options = {};
    } else {
      if (options.decrypt != null) {
        if (!entry.isEncrypted()) {
          throw new Error("options.decrypt can only be specified for encrypted entries");
        }
        if (options.decrypt !== false) throw new Error("invalid options.decrypt value: " + options.decrypt);
        if (entry.isCompressed()) {
          if (options.decompress !== false) throw new Error("entry is encrypted and compressed, and options.decompress !== false");
        }
      }
      if (options.decompress != null) {
        if (!entry.isCompressed()) {
          throw new Error("options.decompress can only be specified for compressed entries");
        }
        if (!(options.decompress === false || options.decompress === true)) {
          throw new Error("invalid options.decompress value: " + options.decompress);
        }
      }
      if (options.start != null || options.end != null) {
        if (entry.isCompressed() && options.decompress !== false) {
          throw new Error("start/end range not allowed for compressed entry without options.decompress === false");
        }
        if (entry.isEncrypted() && options.decrypt !== false) {
          throw new Error("start/end range not allowed for encrypted entry without options.decrypt === false");
        }
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
    if (!self2.isOpen) return callback(new Error("closed"));
    if (entry.isEncrypted()) {
      if (options.decrypt !== false) return callback(new Error("entry is encrypted, and options.decrypt !== false"));
    }
    self2.reader.ref();
    var buffer = newBuffer(30);
    readAndAssertNoEof(self2.reader, buffer, 0, buffer.length, entry.relativeOffsetOfLocalHeader, function(err) {
      try {
        if (err) return callback(err);
        var signature = buffer.readUInt32LE(0);
        if (signature !== 67324752) {
          return callback(new Error("invalid local file header signature: 0x" + signature.toString(16)));
        }
        var fileNameLength = buffer.readUInt16LE(26);
        var extraFieldLength = buffer.readUInt16LE(28);
        var localFileHeaderEnd = entry.relativeOffsetOfLocalHeader + buffer.length + fileNameLength + extraFieldLength;
        var decompress2;
        if (entry.compressionMethod === 0) {
          decompress2 = false;
        } else if (entry.compressionMethod === 8) {
          decompress2 = options.decompress != null ? options.decompress : true;
        } else {
          return callback(new Error("unsupported compression method: " + entry.compressionMethod));
        }
        var fileDataStart = localFileHeaderEnd;
        var fileDataEnd = fileDataStart + entry.compressedSize;
        if (entry.compressedSize !== 0) {
          if (fileDataEnd > self2.fileSize) {
            return callback(new Error("file data overflows file bounds: " + fileDataStart + " + " + entry.compressedSize + " > " + self2.fileSize));
          }
        }
        var readStream = self2.reader.createReadStream({
          start: fileDataStart + relativeStart,
          end: fileDataStart + relativeEnd
        });
        var endpointStream = readStream;
        if (decompress2) {
          var destroyed = false;
          var inflateFilter = zlib.createInflateRaw();
          readStream.on("error", function(err2) {
            setImmediate(function() {
              if (!destroyed) inflateFilter.emit("error", err2);
            });
          });
          readStream.pipe(inflateFilter);
          if (self2.validateEntrySizes) {
            endpointStream = new AssertByteCountStream(entry.uncompressedSize);
            inflateFilter.on("error", function(err2) {
              setImmediate(function() {
                if (!destroyed) endpointStream.emit("error", err2);
              });
            });
            inflateFilter.pipe(endpointStream);
          } else {
            endpointStream = inflateFilter;
          }
          endpointStream.destroy = function() {
            destroyed = true;
            if (inflateFilter !== endpointStream) inflateFilter.unpipe(endpointStream);
            readStream.unpipe(inflateFilter);
            readStream.destroy();
          };
        }
        callback(null, endpointStream);
      } finally {
        self2.reader.unref();
      }
    });
  };
  function Entry() {
  }
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
    if (fileName.indexOf("\\") !== -1) {
      return "invalid characters in fileName: " + fileName;
    }
    if (/^[a-zA-Z]:/.test(fileName) || /^\//.test(fileName)) {
      return "absolute path: " + fileName;
    }
    if (fileName.split("/").indexOf("..") !== -1) {
      return "invalid relative path: " + fileName;
    }
    return null;
  }
  function readAndAssertNoEof(reader, buffer, offset, length, position, callback) {
    if (length === 0) {
      return setImmediate(function() {
        callback(null, newBuffer(0));
      });
    }
    reader.read(buffer, offset, length, position, function(err, bytesRead) {
      if (err) return callback(err);
      if (bytesRead < length) {
        return callback(new Error("unexpected EOF"));
      }
      callback();
    });
  }
  util2.inherits(AssertByteCountStream, Transform);
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
  util2.inherits(RandomAccessReader, EventEmitter2);
  function RandomAccessReader() {
    EventEmitter2.call(this);
    this.refCount = 0;
  }
  RandomAccessReader.prototype.ref = function() {
    this.refCount += 1;
  };
  RandomAccessReader.prototype.unref = function() {
    var self2 = this;
    self2.refCount -= 1;
    if (self2.refCount > 0) return;
    if (self2.refCount < 0) throw new Error("invalid unref");
    self2.close(onCloseDone);
    function onCloseDone(err) {
      if (err) return self2.emit("error", err);
      self2.emit("close");
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
    var stream2 = this._readStreamForRange(start, end);
    var destroyed = false;
    var refUnrefFilter = new RefUnrefFilter(this);
    stream2.on("error", function(err) {
      setImmediate(function() {
        if (!destroyed) refUnrefFilter.emit("error", err);
      });
    });
    refUnrefFilter.destroy = function() {
      stream2.unpipe(refUnrefFilter);
      refUnrefFilter.unref();
      stream2.destroy();
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
    return stream2.pipe(refUnrefFilter).pipe(byteCounter);
  };
  RandomAccessReader.prototype._readStreamForRange = function(start, end) {
    throw new Error("not implemented");
  };
  RandomAccessReader.prototype.read = function(buffer, offset, length, position, callback) {
    var readStream = this.createReadStream({ start: position, end: position + length });
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
  util2.inherits(RefUnrefFilter, PassThrough);
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
  var cp437 = "\0☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄↕‼¶§▬↨↑↓→←∟↔▲▼ !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~⌂ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ ";
  function decodeBuffer(buffer, start, end, isUtf8) {
    if (isUtf8) {
      return buffer.toString("utf8", start, end);
    } else {
      var result = "";
      for (var i = start; i < end; i++) {
        result += cp437[buffer[i]];
      }
      return result;
    }
  }
  function readUInt64LE(buffer, offset) {
    var lower32 = buffer.readUInt32LE(offset);
    var upper32 = buffer.readUInt32LE(offset + 4);
    return upper32 * 4294967296 + lower32;
  }
  var newBuffer;
  if (typeof Buffer.allocUnsafe === "function") {
    newBuffer = function(len) {
      return Buffer.allocUnsafe(len);
    };
  } else {
    newBuffer = function(len) {
      return new Buffer(len);
    };
  }
  function defaultCallback(err) {
    if (err) throw err;
  }
  return yauzl;
}
var decompressUnzip;
var hasRequiredDecompressUnzip;
function requireDecompressUnzip() {
  if (hasRequiredDecompressUnzip) return decompressUnzip;
  hasRequiredDecompressUnzip = 1;
  const fileType2 = requireFileType();
  const getStream2 = requireGetStream();
  const pify2 = requirePify$1();
  const yauzl2 = requireYauzl();
  const getType = (entry, mode) => {
    const IFMT = 61440;
    const IFDIR = 16384;
    const IFLNK = 40960;
    const madeBy = entry.versionMadeBy >> 8;
    if ((mode & IFMT) === IFLNK) {
      return "symlink";
    }
    if ((mode & IFMT) === IFDIR || madeBy === 0 && entry.externalFileAttributes === 16) {
      return "directory";
    }
    return "file";
  };
  const extractEntry = (entry, zip) => {
    const file = {
      mode: entry.externalFileAttributes >> 16 & 65535,
      mtime: entry.getLastModDate(),
      path: entry.fileName
    };
    file.type = getType(entry, file.mode);
    if (file.mode === 0 && file.type === "directory") {
      file.mode = 493;
    }
    if (file.mode === 0) {
      file.mode = 420;
    }
    return pify2(zip.openReadStream.bind(zip))(entry).then(getStream2.buffer).then((buf) => {
      file.data = buf;
      if (file.type === "symlink") {
        file.linkname = buf.toString();
      }
      return file;
    }).catch((err) => {
      zip.close();
      throw err;
    });
  };
  const extractFile = (zip) => new Promise((resolve, reject) => {
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
  decompressUnzip = () => (buf) => {
    if (!Buffer.isBuffer(buf)) {
      return Promise.reject(new TypeError(`Expected a Buffer, got ${typeof buf}`));
    }
    if (!fileType2(buf) || fileType2(buf).ext !== "zip") {
      return Promise.resolve([]);
    }
    return pify2(yauzl2.fromBuffer)(buf, { lazyEntries: true }).then(extractFile);
  };
  return decompressUnzip;
}
var makeDir = { exports: {} };
var pify;
var hasRequiredPify;
function requirePify() {
  if (hasRequiredPify) return pify;
  hasRequiredPify = 1;
  const processFn = (fn, opts) => function() {
    const P = opts.promiseModule;
    const args = new Array(arguments.length);
    for (let i = 0; i < arguments.length; i++) {
      args[i] = arguments[i];
    }
    return new P((resolve, reject) => {
      if (opts.errorFirst) {
        args.push(function(err, result) {
          if (opts.multiArgs) {
            const results = new Array(arguments.length - 1);
            for (let i = 1; i < arguments.length; i++) {
              results[i - 1] = arguments[i];
            }
            if (err) {
              results.unshift(err);
              reject(results);
            } else {
              resolve(results);
            }
          } else if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      } else {
        args.push(function(result) {
          if (opts.multiArgs) {
            const results = new Array(arguments.length - 1);
            for (let i = 0; i < arguments.length; i++) {
              results[i] = arguments[i];
            }
            resolve(results);
          } else {
            resolve(result);
          }
        });
      }
      fn.apply(this, args);
    });
  };
  pify = (obj, opts) => {
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
    if (typeof obj === "function") {
      ret = function() {
        if (opts.excludeMain) {
          return obj.apply(this, arguments);
        }
        return processFn(obj, opts).apply(this, arguments);
      };
    } else {
      ret = Object.create(Object.getPrototypeOf(obj));
    }
    for (const key in obj) {
      const x = obj[key];
      ret[key] = typeof x === "function" && filter(key) ? processFn(x, opts) : x;
    }
    return ret;
  };
  return pify;
}
var hasRequiredMakeDir;
function requireMakeDir() {
  if (hasRequiredMakeDir) return makeDir.exports;
  hasRequiredMakeDir = 1;
  const fs = require$$0$2;
  const path2 = require$$0$5;
  const pify2 = requirePify();
  const defaults = {
    mode: 511 & ~process.umask(),
    fs
  };
  const checkPath = (pth) => {
    if (process.platform === "win32") {
      const pathHasInvalidWinCharacters = /[<>:"|?*]/.test(pth.replace(path2.parse(pth).root, ""));
      if (pathHasInvalidWinCharacters) {
        const err = new Error(`Path contains invalid characters: ${pth}`);
        err.code = "EINVAL";
        throw err;
      }
    }
  };
  makeDir.exports = (input, opts) => Promise.resolve().then(() => {
    checkPath(input);
    opts = Object.assign({}, defaults, opts);
    const mkdir = pify2(opts.fs.mkdir);
    const stat = pify2(opts.fs.stat);
    const make = (pth) => {
      return mkdir(pth, opts.mode).then(() => pth).catch((err) => {
        if (err.code === "ENOENT") {
          if (err.message.includes("null bytes") || path2.dirname(pth) === pth) {
            throw err;
          }
          return make(path2.dirname(pth)).then(() => make(pth));
        }
        return stat(pth).then((stats) => stats.isDirectory() ? pth : Promise.reject()).catch(() => {
          throw err;
        });
      });
    };
    return make(path2.resolve(input));
  });
  makeDir.exports.sync = (input, opts) => {
    checkPath(input);
    opts = Object.assign({}, defaults, opts);
    const make = (pth) => {
      try {
        opts.fs.mkdirSync(pth, opts.mode);
      } catch (err) {
        if (err.code === "ENOENT") {
          if (err.message.includes("null bytes") || path2.dirname(pth) === pth) {
            throw err;
          }
          make(path2.dirname(pth));
          return make(pth);
        }
        try {
          if (!opts.fs.statSync(pth).isDirectory()) {
            throw new Error("The path is not a directory");
          }
        } catch (_) {
          throw err;
        }
      }
      return pth;
    };
    return make(path2.resolve(input));
  };
  return makeDir.exports;
}
/*!
 * is-natural-number.js | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/is-natural-number.js
*/
function isNaturalNumber(val, option) {
  if (option) {
    if (typeof option !== "object") {
      throw new TypeError(
        String(option) + " is not an object. Expected an object that has boolean `includeZero` property."
      );
    }
    if ("includeZero" in option) {
      if (typeof option.includeZero !== "boolean") {
        throw new TypeError(
          String(option.includeZero) + " is neither true nor false. `includeZero` option must be a Boolean value."
        );
      }
      if (option.includeZero && val === 0) {
        return true;
      }
    }
  }
  return Number.isSafeInteger(val) && val >= 1;
}
const index_jsnext = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: isNaturalNumber
}, Symbol.toStringTag, { value: "Module" }));
const require$$2 = /* @__PURE__ */ getAugmentedNamespace(index_jsnext);
/*!
 * strip-dirs | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/node-strip-dirs
*/
var stripDirs;
var hasRequiredStripDirs;
function requireStripDirs() {
  if (hasRequiredStripDirs) return stripDirs;
  hasRequiredStripDirs = 1;
  const path2 = require$$0$5;
  const util2 = require$$1;
  const isNaturalNumber2 = require$$2;
  stripDirs = function stripDirs2(pathStr, count, option) {
    if (typeof pathStr !== "string") {
      throw new TypeError(
        util2.inspect(pathStr) + " is not a string. First argument to strip-dirs must be a path string."
      );
    }
    if (path2.posix.isAbsolute(pathStr) || path2.win32.isAbsolute(pathStr)) {
      throw new Error(`${pathStr} is an absolute path. strip-dirs requires a relative path.`);
    }
    if (!isNaturalNumber2(count, { includeZero: true })) {
      throw new Error(
        "The Second argument of strip-dirs must be a natural number or 0, but received " + util2.inspect(count) + "."
      );
    }
    if (option) {
      if (typeof option !== "object") {
        throw new TypeError(
          util2.inspect(option) + " is not an object. Expected an object with a boolean `disallowOverflow` property."
        );
      }
      if (Array.isArray(option)) {
        throw new TypeError(
          util2.inspect(option) + " is an array. Expected an object with a boolean `disallowOverflow` property."
        );
      }
      if ("disallowOverflow" in option && typeof option.disallowOverflow !== "boolean") {
        throw new TypeError(
          util2.inspect(option.disallowOverflow) + " is neither true nor false. `disallowOverflow` option must be a Boolean value."
        );
      }
    } else {
      option = { disallowOverflow: false };
    }
    const pathComponents = path2.normalize(pathStr).split(path2.sep);
    if (pathComponents.length > 1 && pathComponents[0] === ".") {
      pathComponents.shift();
    }
    if (count > pathComponents.length - 1) {
      if (option.disallowOverflow) {
        throw new RangeError("Cannot strip more directories than there are.");
      }
      count = pathComponents.length - 1;
    }
    return path2.join.apply(null, pathComponents.slice(count));
  };
  return stripDirs;
}
var decompress$1;
var hasRequiredDecompress;
function requireDecompress() {
  if (hasRequiredDecompress) return decompress$1;
  hasRequiredDecompress = 1;
  const path2 = require$$0$5;
  const fs = requireGracefulFs();
  const decompressTar2 = requireDecompressTar();
  const decompressTarbz22 = requireDecompressTarbz2();
  const decompressTargz2 = requireDecompressTargz();
  const decompressUnzip2 = requireDecompressUnzip();
  const makeDir2 = requireMakeDir();
  const pify2 = requirePify$1();
  const stripDirs2 = requireStripDirs();
  const fsP = pify2(fs);
  const runPlugins = (input, opts) => {
    if (opts.plugins.length === 0) {
      return Promise.resolve([]);
    }
    return Promise.all(opts.plugins.map((x) => x(input, opts))).then((files) => files.reduce((a, b) => a.concat(b)));
  };
  const safeMakeDir = (dir, realOutputPath) => {
    return fsP.realpath(dir).catch((_) => {
      const parent = path2.dirname(dir);
      return safeMakeDir(parent, realOutputPath);
    }).then((realParentPath) => {
      if (realParentPath.indexOf(realOutputPath) !== 0) {
        throw new Error("Refusing to create a directory outside the output path.");
      }
      return makeDir2(dir).then(fsP.realpath);
    });
  };
  const preventWritingThroughSymlink = (destination, realOutputPath) => {
    return fsP.readlink(destination).catch((_) => {
      return null;
    }).then((symlinkPointsTo) => {
      if (symlinkPointsTo) {
        throw new Error("Refusing to write into a symlink");
      }
      return realOutputPath;
    });
  };
  const extractFile = (input, output, opts) => runPlugins(input, opts).then((files) => {
    if (opts.strip > 0) {
      files = files.map((x) => {
        x.path = stripDirs2(x.path, opts.strip);
        return x;
      }).filter((x) => x.path !== ".");
    }
    if (typeof opts.filter === "function") {
      files = files.filter(opts.filter);
    }
    if (typeof opts.map === "function") {
      files = files.map(opts.map);
    }
    if (!output) {
      return files;
    }
    return Promise.all(files.map((x) => {
      const dest = path2.join(output, x.path);
      const mode = x.mode & ~process.umask();
      const now = /* @__PURE__ */ new Date();
      if (x.type === "directory") {
        return makeDir2(output).then((outputPath) => fsP.realpath(outputPath)).then((realOutputPath) => safeMakeDir(dest, realOutputPath)).then(() => fsP.utimes(dest, now, x.mtime)).then(() => x);
      }
      return makeDir2(output).then((outputPath) => fsP.realpath(outputPath)).then((realOutputPath) => {
        return safeMakeDir(path2.dirname(dest), realOutputPath).then(() => realOutputPath);
      }).then((realOutputPath) => {
        if (x.type === "file") {
          return preventWritingThroughSymlink(dest, realOutputPath);
        }
        return realOutputPath;
      }).then((realOutputPath) => {
        return fsP.realpath(path2.dirname(dest)).then((realDestinationDir) => {
          if (realDestinationDir.indexOf(realOutputPath) !== 0) {
            throw new Error("Refusing to write outside output directory: " + realDestinationDir);
          }
        });
      }).then(() => {
        if (x.type === "link") {
          return fsP.link(x.linkname, dest);
        }
        if (x.type === "symlink" && process.platform === "win32") {
          return fsP.link(x.linkname, dest);
        }
        if (x.type === "symlink") {
          return fsP.symlink(x.linkname, dest);
        }
        return fsP.writeFile(dest, x.data, { mode });
      }).then(() => x.type === "file" && fsP.utimes(dest, now, x.mtime)).then(() => x);
    }));
  });
  decompress$1 = (input, output, opts) => {
    if (typeof input !== "string" && !Buffer.isBuffer(input)) {
      return Promise.reject(new TypeError("Input file required"));
    }
    if (typeof output === "object") {
      opts = output;
      output = null;
    }
    opts = Object.assign({ plugins: [
      decompressTar2(),
      decompressTarbz22(),
      decompressTargz2(),
      decompressUnzip2()
    ] }, opts);
    const read = typeof input === "string" ? fsP.readFile(input) : Promise.resolve(input);
    return read.then((buf) => extractFile(buf, output, opts));
  };
  return decompress$1;
}
var decompressExports = requireDecompress();
const decompress = /* @__PURE__ */ getDefaultExportFromCjs(decompressExports);
const logLevels = ["silent", "error", "warn", "info", "debug"];
const createLogger = (logLevel) => (level, ...messages) => {
  if (logLevels.indexOf(logLevel) >= logLevels.indexOf(level)) {
    if (level === "error")
      console.error(...messages);
    else if (level === "warn")
      console.warn(...messages);
    else if (level !== "silent")
      console.log(...messages);
  }
};
function downloadFile(url, outputPath, log, redirectCount = 0) {
  return new Promise((resolve, reject) => {
    if (redirectCount > 5) {
      reject(new Error("Too many redirects"));
      return;
    }
    const request = https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302 || response.statusCode === 307) {
        if (!response.headers.location) {
          reject(new Error(`Redirect with no location header from ${url}`));
          return;
        }
        log("debug", `Redirecting to ${response.headers.location}`);
        response.resume();
        downloadFile(response.headers.location, outputPath, log, redirectCount + 1).then(resolve).catch(reject);
        return;
      }
      if (response.statusCode !== 200) {
        response.resume();
        reject(new Error(`Failed to download file: ${response.statusCode} ${response.statusMessage} from ${url}`));
        return;
      }
      const fileStream = originalFs.createWriteStream(outputPath);
      response.pipe(fileStream);
      fileStream.on("finish", () => {
        fileStream.close(() => resolve());
      });
      fileStream.on("error", (err) => {
        originalFs.unlink(outputPath, () => {
        });
        reject(err);
      });
      response.on("error", (err) => {
        originalFs.unlink(outputPath, () => {
        });
        reject(err);
      });
    });
    request.on("error", (err) => {
      reject(err);
    });
    request.end();
  });
}
function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "Node.js-Downloader"
        // GitHub API requires a User-Agent
      }
    }, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to fetch JSON: ${response.statusCode} ${response.statusMessage} from ${url}`));
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
          const parsedData = JSON.parse(rawData);
          resolve(parsedData);
        } catch (e) {
          reject(e);
        }
      });
    }).on("error", (err) => {
      reject(err);
    });
  });
}
async function cleanupOldVersions(baseDir, currentVersion, cliName, log) {
  try {
    const entries = await fsPromises.readdir(baseDir, { withFileTypes: true });
    const oldVersionDirs = entries.filter((dirent) => dirent.isDirectory() && dirent.name.startsWith(`${cliName}-`) && dirent.name !== currentVersion);
    for (const dirent of oldVersionDirs) {
      const oldVersionPath = path.join(baseDir, dirent.name);
      log("debug", `Removing old version directory: ${oldVersionPath}`);
      await fsPromises.rm(oldVersionPath, { recursive: true, force: true });
    }
  } catch (error) {
    log("warn", `Could not clean up old versions in ${baseDir}:`, error.message);
  }
}
async function downloadAndExtractLatestCli(repoOwner, repoName, cliName, baseDestinationDir, log) {
  log("info", `Starting setup for ${cliName} from ${repoOwner}/${repoName}...`);
  const platform = os.platform();
  const arch = os.arch();
  const osIdentifier = platform === "win32" ? "win" : platform === "darwin" ? "osx" : "linux";
  const archIdentifier = arch === "x64" ? "x64" : "arm64";
  log("debug", `Detected system: ${osIdentifier}-${archIdentifier}`);
  if (!["win", "osx", "linux"].includes(osIdentifier)) {
    throw new Error(`Unsupported platform: ${platform}`);
  }
  if (!["x64", "arm64"].includes(archIdentifier)) {
    throw new Error(`Unsupported architecture: ${arch}`);
  }
  const releaseUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/releases/latest`;
  let releaseData;
  try {
    log("debug", `Fetching latest release info from: ${releaseUrl}`);
    releaseData = await fetchJson(releaseUrl);
    log("debug", `Successfully fetched release: ${releaseData.tag_name}`);
  } catch (error) {
    const errorMessage = error.message;
    log("error", `Error fetching latest release from ${releaseUrl}:`, errorMessage);
    if (errorMessage.toLowerCase().includes("403")) {
      log("warn", "GitHub API rate limit may be exceeded. Checking for existing local versions as a fallback.");
      try {
        const dirents = await fsPromises.readdir(baseDestinationDir, { withFileTypes: true });
        const versionDirs = dirents.filter((dirent) => dirent.isDirectory()).map((dirent) => dirent.name).sort((a, b) => b.localeCompare(a, void 0, { numeric: true, sensitivity: "base" }));
        if (versionDirs.length > 0) {
          const latestLocalVersion = versionDirs[0];
          const fallbackPath = path.join(baseDestinationDir, latestLocalVersion);
          log("info", `Found existing local version. Using latest available '${latestLocalVersion}' as a fallback.`);
          return fallbackPath;
        }
        log("error", `API rate limit exceeded and no local versions of ${cliName} found in ${baseDestinationDir}.`);
        throw new Error(`API rate limit exceeded and no local versions of ${cliName} are available.`);
      } catch (fsError) {
        if (fsError.code === "ENOENT") {
          log("error", `API rate limit exceeded and the destination directory ${baseDestinationDir} does not exist.`);
        } else {
          log("error", "An unexpected error occurred while finding a local fallback:", fsError.message);
        }
        throw new Error(`API rate limit exceeded and no local versions of ${cliName} are available.`);
      }
    }
    throw new Error(`Failed to fetch latest release info for ${repoOwner}/${repoName}.`);
  }
  if (!releaseData?.assets?.length) {
    throw new Error(`No assets found in the latest release for ${repoOwner}/${repoName}.`);
  }
  const versionString = releaseData.tag_name;
  const finalExtractionPath = path.resolve(baseDestinationDir, versionString);
  try {
    await fsPromises.access(finalExtractionPath);
    log("info", `Latest version '${versionString}' already exists. Skipping download.`);
    await cleanupOldVersions(baseDestinationDir, versionString, cliName, log);
    return finalExtractionPath;
  } catch {
    log("info", `New version '${versionString}' not found locally. Proceeding with download.`);
  }
  const expectedAssetName = `${cliName}-${osIdentifier}-${archIdentifier}-${versionString}.zip`;
  const targetAsset = releaseData.assets.find((asset) => asset.name.toLowerCase() === expectedAssetName.toLowerCase());
  if (!targetAsset) {
    throw new Error(`Could not find asset "${expectedAssetName}" in release ${versionString}.`);
  }
  log("debug", `Found asset: ${targetAsset.name}`);
  const tempDownloadDir = await fsPromises.mkdtemp(path.join(os.tmpdir(), `${cliName}-download-`));
  const zipFilePath = path.join(tempDownloadDir, targetAsset.name);
  try {
    log("debug", `Downloading ${targetAsset.name} to ${zipFilePath}...`);
    await downloadFile(targetAsset.browser_download_url, zipFilePath, log);
    log("debug", `Extracting ${zipFilePath} to ${finalExtractionPath}...`);
    await fsPromises.mkdir(finalExtractionPath, { recursive: true });
    await decompress(zipFilePath, finalExtractionPath);
    log("debug", "Extraction complete.");
    await cleanupOldVersions(baseDestinationDir, versionString, cliName, log);
  } catch (error) {
    log("error", "An error occurred during download or extraction:", error.message);
    throw new Error(`Failed to download and extract ${targetAsset.name}.`);
  } finally {
    await fsPromises.rm(tempDownloadDir, { recursive: true, force: true });
  }
  log("info", `${cliName} is ready at ${finalExtractionPath}`);
  return finalExtractionPath;
}
async function DownloadCli(targetDir, logLevel = "info") {
  const log = createLogger(logLevel);
  const repoOwner = "KindaBrazy";
  const repoName = "LynxHardwareCLI";
  const cliName = "LynxHardwareCLI";
  const cliBaseDir = path.join(targetDir, cliName);
  try {
    const extractedPath = await downloadAndExtractLatestCli(repoOwner, repoName, cliName, cliBaseDir, log);
    log("debug", `CLI tool is ready at: ${extractedPath}`);
    const executableName = os.platform() === "win32" ? `${cliName}.exe` : cliName;
    const executablePath = path.join(extractedPath, executableName);
    log("debug", `Executable should be at: ${executablePath}`);
    await fsPromises.access(executablePath, originalFs.constants.F_OK);
    log("debug", `Executable ${executablePath} verified.`);
    return executablePath;
  } catch (error) {
    log("error", "An error occurred during CLI download and setup:", error.message);
    throw error;
  }
}
class HardwareMonitor extends EventEmitter {
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
    const levels = ["silent", "error", "warn", "info", "debug"];
    const currentLevelIndex = levels.indexOf(this.logLevel);
    const messageLevelIndex = levels.indexOf(level);
    if (currentLevelIndex >= messageLevelIndex && level !== "silent") {
      if (level === "error") {
        console.error(...args);
      } else if (level === "warn") {
        console.warn(...args);
      } else {
        console.log(...args);
      }
    }
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
    if (days > 0)
      parts.push(`${days}d`);
    if (hours > 0)
      parts.push(`${hours}h`);
    if (minutes > 0)
      parts.push(`${minutes}m`);
    if (seconds > 0 || parts.length === 0)
      parts.push(`${seconds}s`);
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
    if (mode === "timed" && intervalMs !== void 0) {
      args.push("--interval", intervalMs.toString());
    }
    if (cliComponents && cliComponents.length > 0) {
      args.push("--components", cliComponents.join(","));
    }
    return args;
  }
  /**
   * Checks for .NET 8 runtime and downloads the CLI tool.
   * @param targetDir - Directory to download the CLI tool.
   * @throws Error if .NET 8 is not found or download fails.
   */
  async checkRequirements(targetDir) {
    const logger = {
      warn: (...args) => this.log("warn", ...args),
      error: (...args) => this.log("error", ...args)
    };
    const isDotNetInstalled = await checkDotNetRuntime8(logger);
    if (!isDotNetInstalled) {
      throw new Error(".NET 8 runtime not found. Please install it from https://dotnet.microsoft.com/download/dotnet/8.0");
    }
    this.executablePath = await DownloadCli(targetDir, this.logLevel);
    this.log("info", "✅ Lynx Hardware Monitor is ready to use.");
  }
  addUptimeDataIfNeeded(report, requestedComponents) {
    if (!requestedComponents || requestedComponents.length === 0 || requestedComponents.includes("uptime")) {
      const osUptimeSeconds = os.uptime();
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
        const err = new Error("Executable path not set. Call checkRequirements() first.");
        err.type = "spawn_error";
        return reject(err);
      }
      const args = this.buildArgs("once", void 0, components);
      let output = "";
      let errorOutput = "";
      let processKilled = false;
      const proc = spawn(this.executablePath, args);
      const timeoutHandle = setTimeout(() => {
        processKilled = true;
        proc.kill();
        const err = new Error(`Hardware monitor 'getDataOnce' timed out after ${timeoutMs}ms.`);
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
        if (processKilled)
          return;
        clearTimeout(timeoutHandle);
        const monitorError = new Error(`Failed to start hardware monitor executable: ${err.message}`);
        monitorError.type = "spawn_error";
        monitorError.rawError = err;
        reject(monitorError);
      });
      proc.on("close", (code) => {
        if (processKilled)
          return;
        clearTimeout(timeoutHandle);
        if (code !== 0) {
          const err = new Error(`Hardware monitor executable exited with code ${code}. Stderr: ${errorOutput.trim()}`);
          err.type = "process_error";
          err.stderrData = errorOutput;
          return reject(err);
        }
        try {
          const parsedReport = JSON.parse(output);
          let finalReport;
          const cliComponentsRequested = components?.filter((comp) => comp !== "uptime");
          if (!cliComponentsRequested || cliComponentsRequested.length === 0) {
            finalReport = {
              Timestamp: parsedReport.Timestamp || (/* @__PURE__ */ new Date()).toISOString(),
              CPU: parsedReport.CPU || [],
              GPU: parsedReport.GPU || [],
              Memory: parsedReport.Memory || [],
              Motherboard: parsedReport.Motherboard || [],
              Storage: parsedReport.Storage || [],
              Network: parsedReport.Network || []
            };
          } else {
            finalReport = parsedReport;
          }
          this.addUptimeDataIfNeeded(finalReport, components);
          resolve(finalReport);
        } catch (e) {
          const err = new Error("Failed to parse JSON output from hardware monitor.");
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
      this.emit("error", new Error("Timed monitoring is already active. Call stopTimed() first."));
      return;
    }
    if (!this.executablePath) {
      const err = new Error("Executable path not set. Call checkRequirements() first.");
      err.type = "spawn_error";
      this.emit("error", err);
      return;
    }
    const args = this.buildArgs("timed", intervalMs, components);
    this.buffer = "";
    this.initialMessageSkipped = false;
    this.activeProcess = spawn(this.executablePath, args);
    this.activeProcess.stdout?.on("data", (dataChunk) => {
      this.buffer += dataChunk.toString();
      if (!this.initialMessageSkipped) {
        const newlineIndex = this.buffer.indexOf("\r\n");
        if (newlineIndex !== -1) {
          const firstLine = this.buffer.substring(0, newlineIndex);
          if (!firstLine.startsWith("{")) {
            this.buffer = this.buffer.substring(newlineIndex + 2);
          }
          this.initialMessageSkipped = true;
        } else if (this.buffer.length > 1024 && !this.buffer.includes("{")) {
          this.initialMessageSkipped = true;
        } else {
          return;
        }
      }
      if (!this.initialMessageSkipped)
        return;
      while (this.buffer.length > 0) {
        if (!this.buffer.startsWith("{")) {
          const nextJsonStartIndex = this.buffer.indexOf("{");
          if (nextJsonStartIndex !== -1) {
            this.buffer = this.buffer.substring(nextJsonStartIndex);
          } else {
            if (this.buffer.trim() === "")
              this.buffer = "";
            break;
          }
        }
        if (!this.buffer.startsWith("{"))
          break;
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
          if (char === '"')
            inString = !inString;
          if (!inString) {
            if (char === "{")
              balance++;
            else if (char === "}") {
              balance--;
              if (balance === 0 && i > 0) {
                jsonEndIndex = i;
                break;
              } else if (balance < 0) {
                this.buffer = "";
                this.initialMessageSkipped = false;
                const err = new Error("JSON braces unbalanced (too many closing). Resetting buffer.");
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
          if (this.buffer.length > consumedLength && this.buffer[consumedLength] === "\r" && this.buffer.length > consumedLength + 1 && this.buffer[consumedLength + 1] === "\n") {
            consumedLength += 2;
          } else if (this.buffer.length > consumedLength && this.buffer[consumedLength] === "\n") {
            consumedLength += 1;
          }
          try {
            const parsedData = JSON.parse(reportString);
            if (typeof parsedData.Timestamp === "string") {
              let finalReport;
              const cliComponentsRequested = components?.filter((comp) => comp !== "uptime");
              if (!cliComponentsRequested || cliComponentsRequested.length === 0) {
                finalReport = {
                  Timestamp: parsedData.Timestamp,
                  CPU: parsedData.CPU || [],
                  GPU: parsedData.GPU || [],
                  Memory: parsedData.Memory || [],
                  Motherboard: parsedData.Motherboard || [],
                  Storage: parsedData.Storage || [],
                  Network: parsedData.Network || []
                };
              } else {
                finalReport = parsedData;
              }
              this.addUptimeDataIfNeeded(finalReport, components);
              this.emit("data", finalReport);
            } else {
              const err = new Error(`Parsed JSON is not a valid HardwareReport. Snippet: ${reportString.substring(0, 100)}`);
              err.type = "json_parse_error";
              err.stderrData = reportString;
              this.emit("error", err);
            }
            this.buffer = this.buffer.substring(consumedLength);
          } catch (e) {
            const err = new Error(`Failed to parse JSON (timed). Snippet: ${reportString.substring(0, 100)}`);
            err.type = "json_parse_error";
            err.rawError = e;
            err.stderrData = reportString;
            this.emit("error", err);
            this.buffer = this.buffer.substring(consumedLength);
            break;
          }
        } else {
          break;
        }
      }
    });
    this.activeProcess.stderr?.on("data", (data) => {
      const errorMessage = data.toString().trim();
      if (errorMessage) {
        const err = new Error(`Error from hardware monitor process: ${errorMessage}`);
        err.type = "process_error";
        err.stderrData = errorMessage;
        this.emit("error", err);
      }
    });
    this.activeProcess.on("error", (err) => {
      const monitorError = new Error(`Failed to start hardware monitor executable (timed): ${err.message}`);
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
    } else {
      this.log("debug", "HardwareMonitor: No active timed monitoring process to stop.");
    }
  }
}
const HMONITOR_STORAGE_ID = "hmonitor_storage";
const HMONITOR_IPC_DATA_ID = "hardware-data-update";
const HMONITOR_IPC_STOP_ID = "hmonitor-stop";
const HMONITOR_IPC_UPDATE_CONFIG = "hmonitor-update-config";
const HMONITOR_IPC_ERROR_MONITORING = "hmonitor-error-monitoring";
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
function getComponentTypesFromSystemMetrics(metrics) {
  const componentTypes = [];
  const processedComponents = /* @__PURE__ */ new Set();
  metrics.forEach((metric) => {
    let component = null;
    switch (metric) {
      case "cpuTemp":
      case "cpuUsage":
        component = "cpu";
        break;
      case "gpuTemp":
      case "gpuUsage":
        component = "gpu";
        break;
      case "memory":
        component = "memory";
        break;
      case "uptimeSystemSeconds":
      case "uptimeSeconds":
        component = "uptime";
        break;
    }
    if (component && !processedComponents.has(component)) {
      componentTypes.push(component);
      processedComponents.add(component);
    }
  });
  return componentTypes;
}
let storeManager = void 0;
let hwMonitor = void 0;
let currentConfig = void 0;
let webContent = void 0;
async function startMonitoring() {
  if (!webContent) return;
  try {
    hwMonitor = new HardwareMonitor("info");
    const targetDir = join(app.getPath("downloads"), "LynxHub");
    await hwMonitor.checkRequirements(targetDir);
    hwMonitor.on("data", (data) => {
      webContent?.send(HMONITOR_IPC_DATA_ID, data);
    });
    hwMonitor.on("error", (error) => {
      console.error("Timed Monitoring Error:", error.message);
      if (error.stderrData) console.error("Stderr:", error.stderrData);
      if (error.rawError) console.error("Raw Error:", error.rawError);
      webContent?.send(HMONITOR_IPC_ERROR_MONITORING, error);
    });
    hwMonitor.startTimed(
      (currentConfig?.refreshInterval || 1) * 1e3,
      getComponentTypesFromSystemMetrics(currentConfig?.enabledMetrics || [])
    );
  } catch (e) {
    console.error(e);
    webContent?.send(HMONITOR_IPC_ERROR_MONITORING, e);
  }
}
function stopMonitoring() {
  hwMonitor?.stopTimed();
  hwMonitor = void 0;
}
function onAppStart(utils) {
  utils.getStorageManager().then((manager) => {
    storeManager = manager;
    currentConfig = storeManager.getCustomData(HMONITOR_STORAGE_ID);
    if (!currentConfig) {
      currentConfig = {
        enabled: true,
        compactMode: false,
        showSectionLabel: true,
        refreshInterval: 1,
        enabledMetrics: initialSystemMetrics
      };
      storeManager.setCustomData(HMONITOR_STORAGE_ID, currentConfig);
    }
    utils.getAppManager().then((appManager) => {
      webContent = appManager.getWebContent();
      if (currentConfig?.enabled) startMonitoring();
    });
  });
}
function updateConfig(config) {
  if (config.enabled !== currentConfig?.enabled) {
    if (config.enabled) {
      startMonitoring();
    } else {
      stopMonitoring();
    }
  }
  if (config.enabledMetrics !== currentConfig?.enabledMetrics || config.refreshInterval !== currentConfig?.refreshInterval) {
    stopMonitoring();
    startMonitoring();
  }
  currentConfig = config;
  storeManager?.setCustomData(HMONITOR_STORAGE_ID, config);
}
function listenForHWChannels() {
  ipcMain.on(HMONITOR_IPC_STOP_ID, () => stopMonitoring());
  ipcMain.on(HMONITOR_IPC_UPDATE_CONFIG, (_, config) => updateConfig(JSON.parse(config)));
}
async function initialExtension(lynxApi, utils) {
  lynxApi.listenForChannels(() => listenForHWChannels());
  lynxApi.onReadyToShow(() => onAppStart(utils));
}
export {
  initialExtension
};
