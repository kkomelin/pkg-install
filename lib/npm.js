"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.npmProjectInstallArgs = exports.constructNpmArguments = void 0;
var flags_1 = require("./flags");
var helpers_1 = require("./helpers");
function constructNpmArguments(packageList, config) {
    var flagsToSet = flags_1.getFlagsToSet(config);
    var globalCommand = config.global ? ['-g'] : [];
    var cwdCommand = config.forceCwd ? ['--prefix', config.cwd] : [];
    var args = __spreadArrays(['install'], globalCommand, cwdCommand, packageList);
    var ignoredFlags = [];
    flagsToSet.forEach(function (flag) {
        switch (flag) {
            case 'dev':
                if (!config.global) {
                    args.push('--save-dev');
                }
                else {
                    ignoredFlags.push(flag);
                }
                break;
            case 'exact':
                args.push('--save-exact');
                break;
            case 'verbose':
                args.push('--verbose');
                break;
            case 'bundle':
                args.push('--save-bundle');
                break;
            case 'noSave':
                args.push('--no-save');
                break;
            /* istanbul ignore next */
            default:
                throw new helpers_1.UnreachableCaseError(flag);
        }
    });
    return { args: args, ignoredFlags: ignoredFlags };
}
exports.constructNpmArguments = constructNpmArguments;
exports.npmProjectInstallArgs = ['install'];
//# sourceMappingURL=npm.js.map