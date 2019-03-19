"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var TagsProcessor = /** @class */ (function () {
    function TagsProcessor(originalUrl, hostUrl, fileManager, loader) {
        this.originalUrl = originalUrl;
        this.fileManager = fileManager;
        this.loader = loader;
        this.sanitizedHost = utils_1.removeEndSlash(hostUrl);
    }
    TagsProcessor.prototype.processATag = function (item, url, host) {
        var linksList = [];
        if (item.attributes.href) {
            var href = utils_1.removeEndSlash(item.attributes.href.value);
            if (href.startsWith(url)) {
                linksList.push(href);
                item.attributes.href.value = utils_1.addExtension(host, href.replace(url, host));
            }
            if (!href.startsWith('http') && !href.startsWith('#')) {
                linksList.push("" + url + href);
                item.attributes.href.value = utils_1.addExtension(host, href);
            }
        }
        return linksList;
    };
    TagsProcessor.prototype.processScript = function (item, folder) {
        if (!item.attributes || !item.attributes.src) {
            return;
        }
        item.attributes.src.value = this.loader.addToQueue(item.attributes.src.value, 'javascript', folder);
    };
    TagsProcessor.prototype.processLink = function (item, folder) {
        if (!item.attributes.href) {
            return;
        }
        // for links such favicon and similar
        var linkType = item.attributes.type ? item.attributes.type.value : 'image';
        item.attributes.href.value = this.loader.addToQueue(item.attributes.href.value, linkType, folder);
    };
    TagsProcessor.prototype.processImage = function (item, folder) {
        var _this = this;
        if (!item.attributes || !item.attributes.src || item.attributes.src.value === '') {
            return;
        }
        var srcVal = item.attributes.src.value;
        var srcset = item.attributes.srcset;
        if (srcset && srcset.value) {
            var srcsetVals = srcset.value
                .split(',')
                .map(function (srcsetItem) { return srcsetItem.trim().split(' '); })
                .map(function (item) { return item[0]; });
            if (srcsetVals && srcsetVals.length > 0) {
                srcsetVals.forEach(function (val) {
                    item.attributes.srcset.value =
                        item.attributes.srcset.value
                            .replace(val, _this.loader.addToQueue(val, 'image', folder));
                });
            }
        }
        item.attributes.src.value = this.loader.addToQueue(srcVal, 'image', folder);
    };
    TagsProcessor.prototype.processStyleAttr = function (item, folder) {
        var _this = this;
        if (item.attributes && item.attributes.style) {
            var style = item.attributes.style.value;
            var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;()]*[-A-Z0-9+&@#\/%=~_|])/ig;
            item.attributes.style.value = style.replace(urlRegex, function (url) {
                return _this.loader.addToQueue(url, 'image', folder);
            });
        }
    };
    return TagsProcessor;
}());
exports.default = TagsProcessor;
//# sourceMappingURL=tags-processor.js.map