"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var execa = jest.fn().mockImplementation(function () {
    return Promise.resolve({
        failed: false
    });
});
var execaSync = jest.fn().mockImplementation(function () {
    return {
        failed: false
    };
});
Object.defineProperty(execa, 'sync', {
    value: execaSync
});
exports.default = execa;
//# sourceMappingURL=execa.js.map