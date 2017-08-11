var isObject = require("./../support/isObject");
var transferBackReferences = require("./../support/transferBackReferences");
var removeNodeAndDescendants = require("./../support/removeNodeAndDescendants");

module.exports = function replaceNode(node, replacement, parent, key, lru, replacedPaths) {
    if (node === replacement) {
        return node;
    } else if (isObject(node)) {
        transferBackReferences(node, replacement);
        if (removeNodeAndDescendants(node, parent, key, lru, replacedPaths) && node.$type !== undefined && replacedPaths && node.$_absolutePath) {
            replacedPaths.push(node.$_absolutePath);
        }
    }

    parent[key] = replacement;
    return replacement;
};
