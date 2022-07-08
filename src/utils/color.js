"use strict";
exports.__esModule = true;
exports.color = void 0;
var isCapitalised_1 = require("~/utils/isCapitalised");
var color = function (name, alpha) {
    if (name && (0, isCapitalised_1.isCapitalised)(name[0])) {
        if (alpha === undefined) {
            return "rgba(var(--".concat(name, "))");
        }
        return "rgba(var(--".concat(name, "-rgb),").concat(alpha, ")");
    }
    return name;
};
exports.color = color;
var accentVersions = ['light', 'default'];
var bgVersions = ['1dp', '2dp', '3dp', '4dp'];
var textVersions = ['primary', 'secondary'];
var colors = {
    accent: new Set(accentVersions),
    bg: new Set(bgVersions),
    text: new Set(textVersions)
};
var __color__ = function (name, a, b) {
    if (name in colors) {
        if (!a) {
            return "var(--".concat(name, "-default-default)");
        }
        return colors[name].has(a)
            ? "var(--".concat(name, "-").concat(a, "-").concat(b || 'default', ")")
            : "var(--".concat(name, "-").concat(b, "-").concat(a || 'default', ")");
    }
    return name;
};
__color__('accent', 'active', 'light');
