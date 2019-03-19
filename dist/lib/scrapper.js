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
Object.defineProperty(exports, "__esModule", { value: true });
var request = require("request");
var urlParser = require("url");
var JSDOM = require("jsdom").JSDOM;
var tags_processor_1 = require("./tags-processor");
var utils_1 = require("./utils");
var Scrapper = /** @class */ (function () {
    function Scrapper(url, host, fManager, loader) {
        this.url = url;
        this.host = host;
        this.fManager = fManager;
        this.loader = loader;
        this.tagsProcessor = new tags_processor_1.default(url, host, this.fManager, this.loader);
    }
    Scrapper.prototype.getLinksList = function (inp, folder) {
        var _this = this;
        // array for saving found internal links
        var linksList = [];
        Object.values(inp).forEach(function (item) {
            switch (item.nodeName.toLowerCase()) {
                case 'a':
                    linksList = linksList
                        .concat(_this.tagsProcessor.processATag(item, _this.url, _this.host));
                    break;
                case 'base':
                    if (item.attributes.href) {
                        item.attributes.href.value = _this.host;
                    }
                    break;
                case 'link':
                    _this.tagsProcessor.processLink(item, folder);
                    break;
                case 'script':
                    _this.tagsProcessor.processScript(item, folder);
                    break;
                case 'img':
                    _this.tagsProcessor.processImage(item, folder);
                    break;
                default:
            }
            _this.tagsProcessor.processStyleAttr(item, folder);
            if (!item.children || item.children.length === 0) {
                return;
            }
            var links = _this.getLinksList(item.children, folder);
            linksList = linksList.concat(links);
        });
        return linksList;
    };
    Scrapper.prototype.getPageHTML = function (url, folder, originalUrl) {
        var _this = this;
        return new Promise(function (res, rej) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request(url, function (err, resp, body) { return __awaiter(_this, void 0, void 0, function () {
                            var dom, links, split, pageName, fullPath, i, currentSegment, filename, urlDomain, fileBody;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (err) {
                                            return [2 /*return*/, rej(err)];
                                        }
                                        dom = new JSDOM(body);
                                        links = this.getLinksList(dom.window.document.children, folder);
                                        split = urlParser.parse(url).pathname.split('/');
                                        pageName = split.pop();
                                        fullPath = folder;
                                        i = 0;
                                        _a.label = 1;
                                    case 1:
                                        if (!(i < split.length)) return [3 /*break*/, 4];
                                        currentSegment = split[i];
                                        if (!currentSegment || currentSegment === '') {
                                            return [3 /*break*/, 3];
                                        }
                                        fullPath += "/" + currentSegment;
                                        return [4 /*yield*/, this.fManager.createFolder(fullPath)];
                                    case 2:
                                        _a.sent();
                                        _a.label = 3;
                                    case 3:
                                        i++;
                                        return [3 /*break*/, 1];
                                    case 4:
                                        filename = pageName === '/' || pageName === '' ? 'index' : pageName;
                                        filename = utils_1.addExtension(this.host, filename);
                                        urlDomain = originalUrl.replace(/(^\w+:|^)\/\//, '');
                                        fileBody = dom.window.document.documentElement.outerHTML.replace(urlDomain, this.host);
                                        this.fManager.save(fullPath + "/", filename, fileBody);
                                        res(links);
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    return Scrapper;
}());
exports.default = Scrapper;
//# sourceMappingURL=scrapper.js.map