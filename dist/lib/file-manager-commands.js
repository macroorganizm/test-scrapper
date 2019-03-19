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
var child_process_1 = require("child_process");
var ghPages = require('gh-pages');
var Spinner = require('cli-spinner').Spinner;
var inquirer = require('inquirer');
var chalk_1 = require("chalk");
var file_manager_1 = require("./file-manager");
var scrapper_1 = require("./scrapper");
var loader_1 = require("./loader");
var utils_1 = require("./utils");
var FileManagerCommands = /** @class */ (function () {
    function FileManagerCommands() {
        this.fileManager = new file_manager_1.default();
    }
    FileManagerCommands.prototype.manageSites = function () {
        return __awaiter(this, void 0, void 0, function () {
            var list, options, confirm_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fileManager.getList()];
                    case 1:
                        list = _a.sent();
                        list = list.filter(function (name) { return name !== '.keep'; });
                        return [4 /*yield*/, inquirer.prompt([{
                                    name: 'folders',
                                    type: 'checkbox',
                                    message: 'Select items to remove',
                                    choices: list
                                        .map(function (key) {
                                        return {
                                            value: key,
                                            name: key
                                        };
                                    })
                                        .concat([{ value: 'clear', name: 'Clear all' }])
                                        .concat([{ value: 'cancel', name: 'Cancel' }])
                                }])];
                    case 2:
                        options = _a.sent();
                        if (options.folders.includes('cancel')) {
                            console.log(chalk_1.default.yellow('Canceled'));
                            return [2 /*return*/, Promise.resolve()];
                        }
                        if (!options.folders.includes('clear')) return [3 /*break*/, 4];
                        return [4 /*yield*/, inquirer.prompt([{
                                    name: 'confirm',
                                    type: 'confirm',
                                    message: 'Remove all saved commands'
                                }])];
                    case 3:
                        confirm_1 = _a.sent();
                        if (confirm_1) {
                            return [2 /*return*/, Promise.resolve(this.fileManager.clearBatch(list))];
                        }
                        _a.label = 4;
                    case 4: return [2 /*return*/, Promise.resolve(this.fileManager.clearBatch(options.folders))];
                }
            });
        });
    };
    FileManagerCommands.prototype.serveSite = function () {
        var _this = this;
        return new Promise(function (res, rej) { return __awaiter(_this, void 0, void 0, function () {
            var list, options, aa;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fileManager.getList()];
                    case 1:
                        list = _a.sent();
                        list = list.filter(function (name) { return name !== '.keep'; });
                        return [4 /*yield*/, inquirer.prompt([{
                                    name: 'folders',
                                    type: 'checkbox',
                                    message: 'Select items to remove',
                                    choices: list
                                        .map(function (key) {
                                        return {
                                            value: key,
                                            name: key
                                        };
                                    })
                                        .concat([{ value: 'cancel', name: 'Cancel' }])
                                }])];
                    case 2:
                        options = _a.sent();
                        if (options.folders.includes('cancel')) {
                            console.log(chalk_1.default.yellow('Canceled'));
                            return [2 /*return*/, res()];
                        }
                        aa = child_process_1.spawn('node', ['./dist/lib/server.js', options.folders]);
                        aa.stdout.on('data', function (data) {
                            console.log(data.toString());
                        });
                        aa.stderr.on('data', function (data) {
                            console.log(data.toString());
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    };
    FileManagerCommands.prototype.grabPage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var answers;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, inquirer.prompt([{
                                name: 'folder',
                                type: 'input',
                                message: 'Folder ',
                                validate: function (value) {
                                    if (!value || value === '') {
                                        return ('You need to provide a word');
                                    }
                                    else {
                                        return true;
                                    }
                                }
                            }, {
                                name: 'url',
                                type: 'input',
                                message: 'Specify a original URL? ',
                                default: 'https://valor.webflow.io',
                                validate: function (url) {
                                    if (!url || url === '') {
                                        // || !url.match(new RegExp(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi))) {
                                        return ('You need to provide a URL address');
                                    }
                                    else {
                                        return true;
                                    }
                                }
                            }, {
                                name: 'host',
                                type: 'input',
                                message: 'Specify a URL for host inst? ',
                                default: 'http://localhost:3000',
                                validate: function (url) {
                                    if (!url || url === '') {
                                        // || !url.match(new RegExp(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi))) {
                                        return ('You need to provide a URL address');
                                    }
                                    else {
                                        return true;
                                    }
                                }
                            }])];
                    case 1:
                        answers = _a.sent();
                        answers.url = utils_1.removeEndSlash(answers.url);
                        answers.host = utils_1.removeEndSlash(answers.host);
                        return [2 /*return*/, new Promise(function (res, rej) { return __awaiter(_this, void 0, void 0, function () {
                                var scrapper, pages, _loop_1, state_1, cssFilesList;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            console.log(chalk_1.default.green(chalk_1.default.bold('Preparing files structure\n')));
                                            return [4 /*yield*/, this.fileManager.createSiteStructure(answers.folder)];
                                        case 1:
                                            _a.sent();
                                            console.log(chalk_1.default.green(chalk_1.default.bold('Start parsing\n')));
                                            this.loader = new loader_1.default(this.fileManager, answers.folder, answers.url, answers.host);
                                            scrapper = new scrapper_1.default(answers.url, answers.host, this.fileManager, this.loader);
                                            pages = [{
                                                    page: answers.url,
                                                    isProcessed: false
                                                }];
                                            _loop_1 = function () {
                                                var current, currentUrl, spinner, newpages;
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0:
                                                            current = getUnprocessedUrl(pages);
                                                            if (!current) {
                                                                return [2 /*return*/, "break"];
                                                            }
                                                            currentUrl = current.page;
                                                            spinner = new Spinner({ text: "Parsing: " + currentUrl + " %s" });
                                                            spinner.setSpinnerString(27);
                                                            spinner.start();
                                                            return [4 /*yield*/, scrapper.getPageHTML(currentUrl, answers.folder, answers.url)];
                                                        case 1:
                                                            newpages = _a.sent();
                                                            newpages = newpages.reduce(function (list, item) {
                                                                if (list.indexOf(item) === -1) {
                                                                    list.push(item);
                                                                }
                                                                return list;
                                                            }, []);
                                                            pages.find(function (page) { return page.page === currentUrl; }).isProcessed = true;
                                                            pages = pages.concat(newpages
                                                                .filter(function (page) {
                                                                return (pages.findIndex(function (p) { return p.page === page; })) === -1;
                                                            })
                                                                .map(function (page) {
                                                                return {
                                                                    page: page,
                                                                    isProcessed: false
                                                                };
                                                            }));
                                                            spinner.stop(true);
                                                            console.log(currentUrl + chalk_1.default.green(' done'));
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            };
                                            _a.label = 2;
                                        case 2:
                                            if (!true) return [3 /*break*/, 4];
                                            return [5 /*yield**/, _loop_1()];
                                        case 3:
                                            state_1 = _a.sent();
                                            if (state_1 === "break")
                                                return [3 /*break*/, 4];
                                            return [3 /*break*/, 2];
                                        case 4:
                                            console.log(chalk_1.default.green(chalk_1.default.bold('Parsing complete. Uploading resources\n')));
                                            return [4 /*yield*/, this.loader.loadResources()];
                                        case 5:
                                            _a.sent();
                                            console.log(chalk_1.default.green(chalk_1.default.bold('Uploading complete. Analyzing CSS files\n')));
                                            return [4 /*yield*/, this.fileManager.getFolderContent(answers.folder + "/assets/css")];
                                        case 6:
                                            cssFilesList = _a.sent();
                                            return [4 /*yield*/, this.loader.processCssFiles(cssFilesList, answers)];
                                        case 7:
                                            _a.sent();
                                            return [4 /*yield*/, this.loader.loadResources()];
                                        case 8:
                                            _a.sent();
                                            console.log(chalk_1.default.green(chalk_1.default.bold('Scrapping complete\n')));
                                            res();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                }
            });
        });
    };
    FileManagerCommands.prototype.deployToGHPages = function () {
        return __awaiter(this, void 0, void 0, function () {
            var list, answers, spinner;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fileManager.getList()];
                    case 1:
                        list = _a.sent();
                        list = list.filter(function (name) { return name !== '.keep'; });
                        return [4 /*yield*/, inquirer.prompt([{
                                    name: 'folder',
                                    type: 'list',
                                    message: 'Select items to remove',
                                    choices: list
                                        .map(function (key) {
                                        return {
                                            value: "./save/" + key,
                                            name: key
                                        };
                                    })
                                }, {
                                    name: 'repo',
                                    type: 'input',
                                    message: 'Specify a repository to deploy ',
                                    default: 'git@github.com:VS-work/VS-work.github.io.git',
                                    validate: function (url) {
                                        if (!url || url === '') {
                                            return ('You need to provide a URL address');
                                        }
                                        return true;
                                    }
                                }, {
                                    name: 'branch',
                                    type: 'input',
                                    message: 'Specify a branch ',
                                    default: 'gh-pages'
                                }])];
                    case 2:
                        answers = _a.sent();
                        spinner = new Spinner('Deploying...');
                        spinner.start();
                        console.log(answers);
                        return [4 /*yield*/, ghPages.publish(answers.folder[0], {
                                branch: answers.branch,
                                repo: answers.repo
                            })];
                    case 3:
                        _a.sent();
                        spinner.stop(true);
                        return [2 /*return*/, Promise.resolve()];
                }
            });
        });
    };
    return FileManagerCommands;
}());
exports.default = FileManagerCommands;
function getUnprocessedUrl(pages) {
    return pages.find(function (p) { return !p.isProcessed; });
}
//# sourceMappingURL=file-manager-commands.js.map