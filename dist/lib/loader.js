"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var urlParser = require("url");
var zlib = require('zlib');
var request = require('request');
var chalk_1 = require("chalk");
var Spinner = require('cli-spinner').Spinner;
var settings_1 = require("./settings");
var utils_1 = require("./utils");
var Loader = /** @class */ (function () {
    function Loader(fileManager, folder, originalUrl, hostUrl) {
        this.fileManager = fileManager;
        this.folder = folder;
        this.originalUrl = originalUrl;
        this.hostUrl = hostUrl;
        this.resourcesQueue = new Map();
        this.errors = [];
    }
    Loader.prototype.addToQueue = function (url, fileType, folder) {
        var host = urlParser.parse(url);
        if (url.startsWith('//') || /woff|woff2|ttf$/.test(url) ||
            settings_1.settings.excludedDomains.indexOf(host.hostname) !== -1) {
            return url;
        }
        var split = url.split('/');
        var filename = split[split.length - 1].replace('%', '_');
        var subfolder = this.getLinkFolder(fileType);
        var savePath = "./save/" + folder + "/" + subfolder + "/" + filename;
        if (!this.resourcesQueue.get(savePath)) {
            this.resourcesQueue.set(savePath, {
                url: this.normalizeUrl(url),
                isLoaded: false,
                flags: {}
            });
        }
        var sanitizedHost = utils_1.removeEndSlash(this.hostUrl);
        return sanitizedHost + "/" + subfolder + "/" + filename;
    };
    Loader.prototype.getLinkFolder = function (linkType) {
        var types = [
            {
                type: 'text/css',
                folder: 'assets/css'
            }, {
                type: 'javascript',
                folder: 'assets/js'
            }, {
                type: 'image',
                folder: 'assets/images'
            }
        ];
        var folder = types.find(function (item) { return item.type === linkType; });
        return folder ? folder.folder : 'assets/images';
    };
    Loader.prototype.normalizeUrl = function (url) {
        if (url.startsWith('http')) {
            return url;
        }
        return utils_1.removeEndSlash(this.originalUrl) + "/" + utils_1.removeStartSlash(url);
    };
    Loader.prototype.loadResources = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1, _a, counter, _b, _c, entry, _d, key, val, e_1_1;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        counter = 0;
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 6, 7, 8]);
                        _b = __values(this.resourcesQueue.entries()), _c = _b.next();
                        _e.label = 2;
                    case 2:
                        if (!!_c.done) return [3 /*break*/, 5];
                        entry = _c.value;
                        counter++;
                        _d = __read(entry, 2), key = _d[0], val = _d[1];
                        if (val.isLoaded) {
                            return [3 /*break*/, 4];
                        }
                        return [4 /*yield*/, this.downloadResource(key, val, { total: this.resourcesQueue.size, index: counter })];
                    case 3:
                        _e.sent();
                        val.isLoaded = true;
                        _e.label = 4;
                    case 4:
                        _c = _b.next();
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_1_1 = _e.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 8:
                        if (this.errors.length > 0) {
                            console.log(chalk_1.default.red(chalk_1.default.bold('Some errors was occurred')));
                            this.errors.forEach(function (error) {
                                console.log('\n\n\n');
                                console.log(chalk_1.default.red(error));
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Loader.prototype.downloadResource = function (filename, resource, meta) {
        var _this = this;
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            var spinner;
            var _this = this;
            return __generator(this, function (_a) {
                spinner = new Spinner({ text: meta.index + "/" + meta.total + ": " + resource.url + " %s" });
                spinner.setSpinnerString(27);
                spinner.start();
                request({
                    url: resource.url,
                    method: 'head'
                }, function (err, res) {
                    if (err) {
                        _this.errors.push(resource.url + " was not loaded. Error: " + err.message);
                        spinner.stop(true);
                        console.log(resource.url + chalk_1.default.red(' error'));
                        return resolve();
                    }
                    var piped = request(resource.url);
                    if (res && res.headers) {
                        if (res.headers['content-encoding'] === 'gzip') {
                            piped = piped.pipe(zlib.createGunzip());
                        }
                    }
                    piped.on('close', function () {
                        spinner.stop(true);
                        console.log(resource.url + chalk_1.default.green(' done'));
                        resolve();
                    });
                    piped.on('error', function (error) {
                        _this.errors.push(resource.url + " was not loaded. Error: " + error.message);
                        spinner.stop(true);
                        console.log(resource.url + chalk_1.default.red(' error'));
                        resolve();
                    });
                    piped.pipe(_this.fileManager.getWriteStream(filename));
                });
                return [2 /*return*/];
            });
        }); });
    };
    Loader.prototype.processCssFiles = function (filesList, dd) {
        var _this = this;
        return new Promise(function (res) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                filesList.forEach(function (file) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.postProcessCSS("./save/" + dd.folder + "/assets/css/" + file, dd.folder)];
                            case 1:
                                _a.sent();
                                res();
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        }); });
    };
    Loader.prototype.postProcessCSS = function (filePath, folder) {
        var _this = this;
        return new Promise(function (res) { return __awaiter(_this, void 0, void 0, function () {
            var content, urlRegex, outFB;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!filePath.endsWith('.css')) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.fileManager.read(filePath)];
                    case 1:
                        content = _a.sent();
                        urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;()]*[-A-Z0-9+&@#\/%=~_|])/ig;
                        outFB = content.toString().replace(urlRegex, function (url) {
                            return _this.addToQueue(url, 'image', folder);
                        });
                        return [4 /*yield*/, this.fileManager.directSave(filePath, outFB)];
                    case 2:
                        _a.sent();
                        res();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    return Loader;
}());
exports.default = Loader;
//# sourceMappingURL=loader.js.map