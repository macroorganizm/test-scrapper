"use strict";
// export function removeTrailingSlashes(link: string): string {
//   return removeStartSlash(removeEndSlash(link));
// }
Object.defineProperty(exports, "__esModule", { value: true });
function removeEndSlash(link) {
    return link.replace(/#\/$/, '');
}
exports.removeEndSlash = removeEndSlash;
function removeStartSlash(link) {
    return link.replace(/^\//, '');
}
exports.removeStartSlash = removeStartSlash;
function addExtension(host, link) {
    if (link === '' || link === '/') {
        return host;
    }
    if (link.startsWith('/')) {
        return "" + host + link + ".html";
    }
    if (link.endsWith('.html')) {
        return link;
    }
    return link + ".html";
}
exports.addExtension = addExtension;
//# sourceMappingURL=utils.js.map