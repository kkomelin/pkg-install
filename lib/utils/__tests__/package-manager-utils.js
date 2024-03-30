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
Object.defineProperty(exports, "__esModule", { value: true });
var shouldFailExeca = false;
var mockExeca = function () {
    return {
        failed: shouldFailExeca,
    };
};
var asyncExeca = jest
    .fn()
    .mockImplementation(function () { return Promise.resolve(mockExeca()); });
var syncExeca = jest.fn().mockImplementation(mockExeca);
Object.defineProperty(asyncExeca, 'sync', {
    value: syncExeca,
});
jest.mock('execa', function () {
    return asyncExeca;
});
var accessShouldFailOn = [];
var mockAccess = jest.fn().mockImplementation(function (path, callback) {
    if (!accessShouldFailOn.includes(path)) {
        return callback(null);
    }
    else {
        return callback(new Error('Unit test failure message'));
    }
});
var mockAccessSync = jest.fn().mockImplementation(function (path) {
    if (!accessShouldFailOn.includes(path)) {
        return {};
    }
    else {
        throw new Error('Unit test failure message');
    }
});
jest.mock('fs', function () {
    return {
        access: mockAccess,
        accessSync: mockAccessSync,
    };
});
var config_1 = require("../../config");
var package_manager_utils_1 = require("../package-manager-utils");
describe('isManagerInstalled', function () {
    it('should call execa with the right paramters', function () {
        package_manager_utils_1.isManagerInstalled('npm');
        expect(asyncExeca).toHaveBeenLastCalledWith('npm', ['--version']);
        package_manager_utils_1.isManagerInstalled('yarn');
        expect(asyncExeca).toHaveBeenLastCalledWith('yarn', ['--version']);
    });
    it('should forward the result', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    shouldFailExeca = false;
                    _a = expect;
                    return [4 /*yield*/, package_manager_utils_1.isManagerInstalled('npm')];
                case 1:
                    _a.apply(void 0, [_c.sent()]).toBe(true);
                    shouldFailExeca = true;
                    _b = expect;
                    return [4 /*yield*/, package_manager_utils_1.isManagerInstalled('npm')];
                case 2:
                    _b.apply(void 0, [_c.sent()]).toBe(false);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('isManagerInstalledSync', function () {
    it('should call execa with the right paramters', function () {
        package_manager_utils_1.isManagerInstalledSync('npm');
        expect(syncExeca).toHaveBeenLastCalledWith('npm', ['--version']);
        package_manager_utils_1.isManagerInstalledSync('yarn');
        expect(syncExeca).toHaveBeenLastCalledWith('yarn', ['--version']);
    });
    it('should forward the result', function () {
        shouldFailExeca = false;
        expect(package_manager_utils_1.isManagerInstalledSync('npm')).toBe(true);
        shouldFailExeca = true;
        expect(package_manager_utils_1.isManagerInstalledSync('npm')).toBe(false);
    });
});
describe('getCurrentPackageManager', function () {
    var envBackup;
    beforeEach(function () {
        envBackup = __assign({}, process.env);
    });
    afterEach(function () {
        process.env = __assign({}, envBackup);
    });
    it('should handle yarn user agents', function () {
        process.env = {
            npm_config_user_agent: 'yarn/1.13.0 npm/? node/v11.6.0 darwin x64',
        };
        expect(package_manager_utils_1.getCurrentPackageManager()).toBe('yarn');
    });
    it('should handle npm user agents', function () {
        process.env = {
            npm_config_user_agent: 'npm/6.5.0 node/v11.6.0 darwin x64',
        };
        expect(package_manager_utils_1.getCurrentPackageManager()).toBe('npm');
    });
    it('should handle missing user agents', function () {
        process.env = {};
        expect(package_manager_utils_1.getCurrentPackageManager()).toBe(null);
    });
    it('should handle invalid user agents', function () {
        process.env = {
            npm_config_user_agent: 'some-invalid-value',
        };
        expect(package_manager_utils_1.getCurrentPackageManager()).toBe(null);
    });
});
describe('getPackageManagerFromLockfile', function () {
    var config = __assign(__assign({}, config_1.defaultInstallConfig), { cwd: '/' });
    it('should check for npm', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    accessShouldFailOn = [];
                    _a = expect;
                    return [4 /*yield*/, package_manager_utils_1.getPackageManagerFromLockfile(config)];
                case 1:
                    _a.apply(void 0, [_b.sent()]).toBe('npm');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should check for yarn if npm does not exist', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    accessShouldFailOn = ['/package-lock.json'];
                    _a = expect;
                    return [4 /*yield*/, package_manager_utils_1.getPackageManagerFromLockfile(config)];
                case 1:
                    _a.apply(void 0, [_b.sent()]).toBe('yarn');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return null if no lock file exists', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    accessShouldFailOn = ['/package-lock.json', '/yarn.lock'];
                    _a = expect;
                    return [4 /*yield*/, package_manager_utils_1.getPackageManagerFromLockfile(config)];
                case 1:
                    _a.apply(void 0, [_b.sent()]).toBe(null);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('getPackageManagerFromLockfileSync', function () {
    var config = __assign(__assign({}, config_1.defaultInstallConfig), { cwd: '/' });
    it('should check for npm', function () {
        accessShouldFailOn = [];
        expect(package_manager_utils_1.getPackageManagerFromLockfileSync(config)).toBe('npm');
    });
    it('should check for yarn if npm does not exist', function () {
        accessShouldFailOn = ['/package-lock.json'];
        expect(package_manager_utils_1.getPackageManagerFromLockfileSync(config)).toBe('yarn');
    });
    it('should return null if no lock file exists', function () {
        accessShouldFailOn = ['/package-lock.json', '/yarn.lock'];
        expect(package_manager_utils_1.getPackageManagerFromLockfileSync(config)).toBe(null);
    });
});
//# sourceMappingURL=package-manager-utils.js.map