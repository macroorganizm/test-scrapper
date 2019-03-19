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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
var clear = require('clear');
var figlet = require('figlet');
var inquirer = require('inquirer');
var file_manager_commands_1 = require("./file-manager-commands");
var fCommands = new file_manager_commands_1.default();
function main() {
    var _this = this;
    return new Promise(function (res) { return __awaiter(_this, void 0, void 0, function () {
        var options, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, inquirer.prompt([{
                            name: 'option',
                            type: 'list',
                            message: '',
                            choices: [
                                { name: 'Manage commands', value: 0 },
                                { name: 'Scrap a new site', value: 1 },
                                { name: 'Serve', value: 2 },
                                { name: 'Deploy to gh-pages', value: 3 },
                                { name: 'Exit', value: 4 }
                            ],
                            default: 2,
                        }])];
                case 1:
                    options = _b.sent();
                    _a = options.option;
                    switch (_a) {
                        case 0: return [3 /*break*/, 2];
                        case 1: return [3 /*break*/, 4];
                        case 2: return [3 /*break*/, 6];
                        case 3: return [3 /*break*/, 8];
                        case 4: return [3 /*break*/, 10];
                    }
                    return [3 /*break*/, 10];
                case 2: return [4 /*yield*/, fCommands.manageSites()];
                case 3:
                    _b.sent();
                    return [3 /*break*/, 11];
                case 4: return [4 /*yield*/, fCommands.grabPage()];
                case 5:
                    _b.sent();
                    return [3 /*break*/, 11];
                case 6: return [4 /*yield*/, fCommands.serveSite()];
                case 7:
                    _b.sent();
                    return [3 /*break*/, 11];
                case 8: return [4 /*yield*/, fCommands.deployToGHPages()];
                case 9:
                    _b.sent();
                    return [3 /*break*/, 11];
                case 10:
                    process.exit(0);
                    _b.label = 11;
                case 11:
                    res();
                    return [2 /*return*/];
            }
        });
    }); });
}
(function () { return __awaiter(_this, void 0, void 0, function () {
    var e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                clear();
                console.log(chalk_1.default.yellow(figlet.textSync('Scrapper', { horizontalLayout: 'full' })));
                _a.label = 1;
            case 1:
                if (!true) return [3 /*break*/, 6];
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, main()];
            case 3:
                _a.sent();
                return [3 /*break*/, 5];
            case 4:
                e_1 = _a.sent();
                console.log(chalk_1.default.red(chalk_1.default.bold(e_1)));
                process.exit(0);
                return [3 /*break*/, 5];
            case 5: return [3 /*break*/, 1];
            case 6: return [2 /*return*/];
        }
    });
}); })();
//# sourceMappingURL=main.js.map