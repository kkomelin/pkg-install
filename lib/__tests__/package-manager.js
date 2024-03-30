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
var mockGetCurrentPm = jest.fn();
var mockGetPmFromLock = jest.fn();
var mockIsManagerInstalled = jest.fn();
var mockGetPmFromLockSync = jest.fn();
var mockIsManagerInstalledSync = jest.fn();
jest.mock('../utils/package-manager-utils', function () {
    return {
        getCurrentPackageManager: mockGetCurrentPm,
        getPackageManagerFromLockfile: mockGetPmFromLock,
        isManagerInstalled: mockIsManagerInstalled,
        isManagerInstalledSync: mockIsManagerInstalledSync,
        getPackageManagerFromLockfileSync: mockGetPmFromLockSync,
    };
});
var config_1 = require("../config");
var package_manager_1 = require("../package-manager");
describe('getPackageManager', function () {
    var config = __assign(__assign({}, config_1.defaultInstallConfig), { cwd: '/' });
    beforeEach(function () {
        mockGetCurrentPm.mockRestore();
        mockGetCurrentPm.mockImplementation(function () { return null; });
        mockGetPmFromLock.mockRestore();
        mockGetPmFromLock.mockImplementation(function () { return null; });
        mockIsManagerInstalled.mockRestore();
        mockIsManagerInstalled.mockImplementation(function () { return Promise.resolve(true); });
    });
    it('should respect the prefer flag', function () { return __awaiter(void 0, void 0, void 0, function () {
        var preferYarnConfig, _a, preferNpmConfig, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    preferYarnConfig = __assign(__assign({}, config), { prefer: 'yarn' });
                    _a = expect;
                    return [4 /*yield*/, package_manager_1.getPackageManager(preferYarnConfig)];
                case 1:
                    _a.apply(void 0, [_c.sent()]).toBe('yarn');
                    preferNpmConfig = __assign(__assign({}, config), { prefer: 'npm' });
                    _b = expect;
                    return [4 /*yield*/, package_manager_1.getPackageManager(preferNpmConfig)];
                case 2:
                    _b.apply(void 0, [_c.sent()]).toBe('npm');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should fallback to getCurrentPackageManager', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    mockGetCurrentPm.mockImplementationOnce(function () { return 'npm'; });
                    _a = expect;
                    return [4 /*yield*/, package_manager_1.getPackageManager(config)];
                case 1:
                    _a.apply(void 0, [_c.sent()]).toBe('npm');
                    mockGetCurrentPm.mockImplementationOnce(function () { return 'yarn'; });
                    _b = expect;
                    return [4 /*yield*/, package_manager_1.getPackageManager(config)];
                case 2:
                    _b.apply(void 0, [_c.sent()]).toBe('yarn');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should try to read from lockfile', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    mockGetPmFromLock.mockImplementationOnce(function () { return 'npm'; });
                    _a = expect;
                    return [4 /*yield*/, package_manager_1.getPackageManager(config)];
                case 1:
                    _a.apply(void 0, [_c.sent()]).toBe('npm');
                    mockGetPmFromLock.mockImplementationOnce(function () { return 'yarn'; });
                    _b = expect;
                    return [4 /*yield*/, package_manager_1.getPackageManager(config)];
                case 2:
                    _b.apply(void 0, [_c.sent()]).toBe('yarn');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should always fallback to npm', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = expect;
                    return [4 /*yield*/, package_manager_1.getPackageManager(config)];
                case 1:
                    _a.apply(void 0, [_b.sent()]).toBe('npm');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should try the other package manager if one is missing', function () { return __awaiter(void 0, void 0, void 0, function () {
        var c, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    mockIsManagerInstalled.mockImplementation(function (manager) {
                        return Promise.resolve(manager === 'yarn' ? false : true);
                    });
                    c = __assign(__assign({}, config), { prefer: 'yarn' });
                    _a = expect;
                    return [4 /*yield*/, package_manager_1.getPackageManager(c)];
                case 1:
                    _a.apply(void 0, [_c.sent()]).toBe('npm');
                    expect(mockIsManagerInstalled).toHaveBeenCalledTimes(2);
                    expect(mockIsManagerInstalled).toHaveBeenCalledWith('yarn');
                    expect(mockIsManagerInstalled).toHaveBeenLastCalledWith('npm');
                    mockIsManagerInstalled.mockClear();
                    mockIsManagerInstalled.mockImplementation(function (manager) {
                        return Promise.resolve(manager === 'npm' ? false : true);
                    });
                    c = __assign(__assign({}, config), { prefer: 'npm' });
                    _b = expect;
                    return [4 /*yield*/, package_manager_1.getPackageManager(c)];
                case 2:
                    _b.apply(void 0, [_c.sent()]).toBe('yarn');
                    expect(mockIsManagerInstalled).toHaveBeenCalledTimes(2);
                    expect(mockIsManagerInstalled).toHaveBeenCalledWith('npm');
                    expect(mockIsManagerInstalled).toHaveBeenLastCalledWith('yarn');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should throw an error if no manager is installed', function () { return __awaiter(void 0, void 0, void 0, function () {
        var c, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    c = __assign(__assign({}, config), { prefer: 'yarn' });
                    mockIsManagerInstalled.mockImplementation(function () { return Promise.resolve(false); });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, package_manager_1.getPackageManager(c)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    expect(err_1.message).toBe('No supported package manager found');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
});
describe('getPackageManagerSync', function () {
    var config = __assign(__assign({}, config_1.defaultInstallConfig), { cwd: '/' });
    beforeEach(function () {
        mockGetCurrentPm.mockRestore();
        mockGetCurrentPm.mockImplementation(function () { return null; });
        mockGetPmFromLockSync.mockRestore();
        mockGetPmFromLockSync.mockImplementation(function () { return null; });
        mockIsManagerInstalledSync.mockRestore();
        mockIsManagerInstalledSync.mockImplementation(function () { return true; });
    });
    it('should respect the prefer flag', function () {
        var preferYarnConfig = __assign(__assign({}, config), { prefer: 'yarn' });
        expect(package_manager_1.getPackageManagerSync(preferYarnConfig)).toBe('yarn');
        var preferNpmConfig = __assign(__assign({}, config), { prefer: 'npm' });
        expect(package_manager_1.getPackageManagerSync(preferNpmConfig)).toBe('npm');
    });
    it('should fallback to getCurrentPackageManager', function () {
        mockGetCurrentPm.mockImplementationOnce(function () { return 'npm'; });
        expect(package_manager_1.getPackageManagerSync(config)).toBe('npm');
        mockGetCurrentPm.mockImplementationOnce(function () { return 'yarn'; });
        expect(package_manager_1.getPackageManagerSync(config)).toBe('yarn');
    });
    it('should try to read from lockfile', function () {
        mockGetPmFromLockSync.mockImplementationOnce(function () { return 'npm'; });
        expect(package_manager_1.getPackageManagerSync(config)).toBe('npm');
        mockGetPmFromLockSync.mockImplementationOnce(function () { return 'yarn'; });
        expect(package_manager_1.getPackageManagerSync(config)).toBe('yarn');
    });
    it('should always fallback to npm', function () {
        expect(package_manager_1.getPackageManagerSync(config)).toBe('npm');
    });
    it('should try the other package manager if one is missing', function () {
        mockIsManagerInstalledSync.mockImplementation(function (manager) {
            return manager === 'yarn' ? false : true;
        });
        var c = __assign(__assign({}, config), { prefer: 'yarn' });
        expect(package_manager_1.getPackageManagerSync(c)).toBe('npm');
        expect(mockIsManagerInstalledSync).toHaveBeenCalledTimes(2);
        expect(mockIsManagerInstalledSync).toHaveBeenCalledWith('yarn');
        expect(mockIsManagerInstalledSync).toHaveBeenLastCalledWith('npm');
        mockIsManagerInstalledSync.mockClear();
        mockIsManagerInstalledSync.mockImplementation(function (manager) {
            return manager === 'npm' ? false : true;
        });
        c = __assign(__assign({}, config), { prefer: 'npm' });
        expect(package_manager_1.getPackageManagerSync(c)).toBe('yarn');
        expect(mockIsManagerInstalledSync).toHaveBeenCalledTimes(2);
        expect(mockIsManagerInstalledSync).toHaveBeenCalledWith('npm');
        expect(mockIsManagerInstalledSync).toHaveBeenLastCalledWith('yarn');
    });
    it('should throw an error if no manager is installed', function () {
        var c = __assign(__assign({}, config), { prefer: 'yarn' });
        mockIsManagerInstalledSync.mockImplementation(function () { return false; });
        try {
            package_manager_1.getPackageManagerSync(c);
        }
        catch (err) {
            expect(err.message).toBe('No supported package manager found');
        }
    });
});
//# sourceMappingURL=package-manager.js.map