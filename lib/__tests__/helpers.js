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
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../config");
var helpers_1 = require("../helpers");
describe('getPackageList', function () {
    it('should handle arrays', function () {
        var input = ['twilio', 'node-env-run@1', 'twilio-run@1'];
        var output = helpers_1.getPackageList(input);
        expect(output).toEqual(input);
    });
    it('should filter out empty or invalid values', function () {
        var input = ['twilio', undefined, 1.23, 'node-env-run@1'];
        // @ts-ignore
        var output = helpers_1.getPackageList(input);
        expect(output).toEqual(['twilio', 'node-env-run@1']);
    });
    it('should turn objects into arrays', function () {
        var input = {
            twilio: '^3',
            'node-env-run': '1',
            'twilio-run': undefined,
        };
        var output = helpers_1.getPackageList(input);
        expect(output).toEqual(['twilio@^3', 'node-env-run@1', 'twilio-run']);
    });
});
describe('getExecaConfig', function () {
    it('should extract the right config parameters', function () {
        var config = __assign(__assign({}, config_1.defaultInstallConfig), { stdio: 'inherit', cwd: '/some/user/path' });
        var output = helpers_1.getExecaConfig(config);
        expect(output).toEqual({
            stdio: 'inherit',
            cwd: '/some/user/path',
        });
    });
});
//# sourceMappingURL=helpers.js.map