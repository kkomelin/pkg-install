"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
jest.mock('execa');
jest.mock('../package-manager', function () {
    var getPackageManager = jest.fn().mockImplementation(function () {
        return Promise.resolve('npm');
    });
    var getPackageManagerSync = jest.fn().mockReturnValue('npm');
    return {
        getPackageManager: getPackageManager,
        getPackageManagerSync: getPackageManagerSync,
    };
});
jest.mock('../npm', function () {
    return {
        npmProjectInstallArgs: ['install'],
        constructNpmArguments: jest.fn().mockImplementation(function (pkgList) {
            return __spreadArrays(['install'], pkgList);
        }),
    };
});
jest.mock('../yarn', function () {
    return {
        yarnProjectInstallArgs: ['install'],
        constructYarnArguments: jest.fn().mockImplementation(function (pkgList) {
            return __spreadArrays(['add'], pkgList);
        }),
    };
});
var execa_1 = __importDefault(require("execa"));
var config_1 = require("../config");
var install_1 = require("../install");
var npm_1 = require("../npm");
var package_manager_1 = require("../package-manager");
var yarn_1 = require("../yarn");
beforeEach(function () {
    execa_1.default.mockClear();
    execa_1.default.sync.mockClear();
});
describe('install', function () {
    beforeEach(function () {
        npm_1.constructNpmArguments.mockClear();
        yarn_1.constructYarnArguments.mockClear();
    });
    it('should execute execa', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, install_1.install(['twilio'])];
                case 1:
                    result = _a.sent();
                    expect(execa_1.default).toHaveBeenCalledTimes(1);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should merge settings correctly', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result, expectedConfig;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, install_1.install(['twilio'], {
                        noSave: true,
                        global: true,
                        forceCwd: true,
                    })];
                case 1:
                    result = _a.sent();
                    expectedConfig = __assign(__assign({}, config_1.defaultInstallConfig), { noSave: true, global: true, forceCwd: true });
                    expect(package_manager_1.getPackageManager).toHaveBeenCalledWith(expectedConfig);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should call the right argument constructor (npm)', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    package_manager_1.getPackageManager.mockReturnValueOnce(Promise.resolve('npm'));
                    return [4 /*yield*/, install_1.install(['twilio'])];
                case 1:
                    result = _a.sent();
                    expect(npm_1.constructNpmArguments).toHaveBeenCalledTimes(1);
                    expect(npm_1.constructNpmArguments).toHaveBeenCalledWith(['twilio'], config_1.defaultInstallConfig);
                    expect(yarn_1.constructYarnArguments).toHaveBeenCalledTimes(0);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should call the right argument constructor (yarn)', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    package_manager_1.getPackageManager.mockReturnValueOnce(Promise.resolve('yarn'));
                    return [4 /*yield*/, install_1.install(['twilio'])];
                case 1:
                    result = _a.sent();
                    expect(yarn_1.constructYarnArguments).toHaveBeenCalledTimes(1);
                    expect(yarn_1.constructYarnArguments).toHaveBeenCalledWith(['twilio'], config_1.defaultInstallConfig);
                    expect(npm_1.constructNpmArguments).toHaveBeenCalledTimes(0);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('installSync', function () {
    beforeEach(function () {
        npm_1.constructNpmArguments.mockClear();
        yarn_1.constructYarnArguments.mockClear();
    });
    it('should execute execa.sync', function () {
        var result = install_1.installSync(['twilio']);
        expect(execa_1.default.sync).toHaveBeenCalledTimes(1);
    });
    it('should merge settings correctly', function () {
        var result = install_1.installSync(['twilio'], {
            noSave: true,
            global: true,
            forceCwd: true,
        });
        var expectedConfig = __assign(__assign({}, config_1.defaultInstallConfig), { noSave: true, global: true, forceCwd: true });
        expect(package_manager_1.getPackageManager).toHaveBeenCalledWith(expectedConfig);
    });
    it('should call the right argument constructor (npm)', function () {
        package_manager_1.getPackageManagerSync.mockReturnValueOnce('npm');
        var result = install_1.installSync(['twilio']);
        expect(npm_1.constructNpmArguments).toHaveBeenCalledTimes(1);
        expect(npm_1.constructNpmArguments).toHaveBeenCalledWith(['twilio'], config_1.defaultInstallConfig);
        expect(yarn_1.constructYarnArguments).toHaveBeenCalledTimes(0);
    });
    it('should call the right argument constructor (yarn)', function () {
        package_manager_1.getPackageManagerSync.mockReturnValueOnce('yarn');
        var result = install_1.installSync(['twilio']);
        expect(yarn_1.constructYarnArguments).toHaveBeenCalledTimes(1);
        expect(yarn_1.constructYarnArguments).toHaveBeenCalledWith(['twilio'], config_1.defaultInstallConfig);
        expect(npm_1.constructNpmArguments).toHaveBeenCalledTimes(0);
    });
});
describe('projectInstall', function () {
    it('should call execa with the right arguments (npm)', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    package_manager_1.getPackageManager.mockResolvedValueOnce('npm');
                    return [4 /*yield*/, install_1.projectInstall()];
                case 1:
                    result = _a.sent();
                    expect(execa_1.default).toHaveBeenCalledWith('npm', ['install'], {
                        stdio: 'pipe',
                        cwd: process.cwd(),
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('should call execa with the right arguments (yarn)', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    package_manager_1.getPackageManager.mockResolvedValueOnce('yarn');
                    return [4 /*yield*/, install_1.projectInstall()];
                case 1:
                    result = _a.sent();
                    expect(execa_1.default).toHaveBeenCalledWith('yarn', ['install'], {
                        stdio: 'pipe',
                        cwd: process.cwd(),
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('merges config correctly', function () { return __awaiter(void 0, void 0, void 0, function () {
        var expectedConfig, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    expectedConfig = __assign(__assign({}, config_1.defaultInstallConfig), { stdio: 'inherit' });
                    return [4 /*yield*/, install_1.projectInstall({ stdio: 'inherit' })];
                case 1:
                    result = _a.sent();
                    expect(package_manager_1.getPackageManager).toHaveBeenLastCalledWith(expectedConfig);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('projectInstallSync', function () {
    it('should call execa.sync with the right arguments (npm)', function () {
        package_manager_1.getPackageManagerSync.mockReturnValueOnce('npm');
        var result = install_1.projectInstallSync();
        expect(execa_1.default.sync).toHaveBeenCalledWith('npm', ['install'], {
            stdio: 'pipe',
            cwd: process.cwd(),
        });
    });
    it('should call execa.sync with the right arguments (yarn)', function () {
        package_manager_1.getPackageManagerSync.mockReturnValueOnce('yarn');
        var result = install_1.projectInstallSync();
        expect(execa_1.default.sync).toHaveBeenCalledWith('yarn', ['install'], {
            stdio: 'pipe',
            cwd: process.cwd(),
        });
    });
    it('merges config correctly', function () {
        var expectedConfig = __assign(__assign({}, config_1.defaultInstallConfig), { stdio: 'inherit' });
        var result = install_1.projectInstallSync({ stdio: 'inherit' });
        expect(package_manager_1.getPackageManagerSync).toHaveBeenLastCalledWith(expectedConfig);
    });
});
//# sourceMappingURL=install.js.map