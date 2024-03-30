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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../config");
var yarn_1 = require("../yarn");
describe('constructYarnArguments', function () {
    var packageList = ['twilio', 'twilio-run@1'];
    it('should handle default config', function () {
        var _a = yarn_1.constructYarnArguments(packageList, config_1.defaultInstallConfig), output = _a.args, ignoredFlags = _a.ignoredFlags;
        expect(output).toEqual(__spreadArrays(['add'], packageList));
        expect(ignoredFlags.length).toBe(0);
    });
    it('should add dev flag', function () {
        var _a = yarn_1.constructYarnArguments(packageList, __assign(__assign({}, config_1.defaultInstallConfig), { dev: true })), output = _a.args, ignoredFlags = _a.ignoredFlags;
        expect(output).toEqual(__spreadArrays(['add'], packageList, ['--dev']));
        expect(ignoredFlags.length).toBe(0);
    });
    it('should ignore dev flag when global', function () {
        var _a = yarn_1.constructYarnArguments(packageList, __assign(__assign({}, config_1.defaultInstallConfig), { dev: true, global: true })), output = _a.args, ignoredFlags = _a.ignoredFlags;
        expect(output).toEqual(__spreadArrays(['global', 'add'], packageList));
        expect(ignoredFlags).toEqual(['dev']);
    });
    it('should add exact flag', function () {
        var _a = yarn_1.constructYarnArguments(packageList, __assign(__assign({}, config_1.defaultInstallConfig), { exact: true })), output = _a.args, ignoredFlags = _a.ignoredFlags;
        expect(output).toEqual(__spreadArrays(['add'], packageList, ['--exact']));
        expect(ignoredFlags.length).toBe(0);
    });
    it('should add verbose flag', function () {
        var _a = yarn_1.constructYarnArguments(packageList, __assign(__assign({}, config_1.defaultInstallConfig), { verbose: true })), output = _a.args, ignoredFlags = _a.ignoredFlags;
        expect(output).toEqual(__spreadArrays(['add'], packageList, ['--verbose']));
        expect(ignoredFlags.length).toBe(0);
    });
    it('should ignore noSave option', function () {
        var _a = yarn_1.constructYarnArguments(packageList, __assign(__assign({}, config_1.defaultInstallConfig), { noSave: true })), output = _a.args, ignoredFlags = _a.ignoredFlags;
        expect(output).toEqual(__spreadArrays(['add'], packageList));
        expect(ignoredFlags).toEqual(['noSave']);
    });
    it('should ignore bundle option', function () {
        var _a = yarn_1.constructYarnArguments(packageList, __assign(__assign({}, config_1.defaultInstallConfig), { bundle: true })), output = _a.args, ignoredFlags = _a.ignoredFlags;
        expect(output).toEqual(__spreadArrays(['add'], packageList));
        expect(ignoredFlags).toEqual(['bundle']);
    });
    it('should handle global option', function () {
        var _a = yarn_1.constructYarnArguments(packageList, __assign(__assign({}, config_1.defaultInstallConfig), { global: true })), output = _a.args, ignoredFlags = _a.ignoredFlags;
        expect(output).toEqual(__spreadArrays(['global', 'add'], packageList));
        expect(ignoredFlags.length).toBe(0);
    });
    it('should handle forceCwd flag', function () {
        var _a = yarn_1.constructYarnArguments(packageList, __assign(__assign({}, config_1.defaultInstallConfig), { forceCwd: true })), output = _a.args, ignoredFlags = _a.ignoredFlags;
        expect(output).toEqual(__spreadArrays(['--cwd', process.cwd(), 'add'], packageList));
        expect(ignoredFlags.length).toBe(0);
    });
    it('should handle all flags', function () {
        var _a = yarn_1.constructYarnArguments(packageList, __assign(__assign({}, config_1.defaultInstallConfig), { dev: true, exact: true, verbose: true })), output = _a.args, ignoredFlags = _a.ignoredFlags;
        expect(output).toEqual(__spreadArrays([
            'add'
        ], packageList, [
            '--dev',
            '--exact',
            '--verbose',
        ]));
        expect(ignoredFlags.length).toBe(0);
    });
});
//# sourceMappingURL=yarn.js.map