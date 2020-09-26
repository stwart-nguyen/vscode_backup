"use strict";
function getRelated(file) {
    if (isSpec(file)) {
        return specToCode(file);
    }
    else {
        return codeToSpec(file);
    }
}
exports.getRelated = getRelated;
function isSpec(file) {
    return file.indexOf('_spec.rb') > -1;
}
exports.isSpec = isSpec;
function codeToSpec(file) {
    var viewRegex = /erb$|haml$|slim$/;
    var isViewFile = file.match(viewRegex);
    if (isViewFile) {
        return file
            .replace('/app/', '/spec/')
            .replace('.haml', '.haml_spec.rb')
            .replace('.erb', '.erb_spec.rb')
            .replace('.slim', '.slim_spec.rb');
    }
    file = file.replace('.rb', '_spec.rb');
    var isLibFile = file.indexOf('/lib/') > -1;
    if (isLibFile) {
        return file.replace('/lib/', '/spec/lib/');
    }
    return file.replace('/app/', '/spec/');
}
exports.codeToSpec = codeToSpec;
function specToCode(file) {
    var viewRegex = /(.erb|.haml|.slim)_spec.rb$/;
    var isViewFile = file.match(viewRegex);
    if (isViewFile) {
        return file
            .replace('_spec.rb', '')
            .replace('/spec', '/app');
    }
    file = file.replace('_spec.rb', '.rb');
    var isLibFile = file.indexOf('/spec/lib/') > -1;
    if (isLibFile) {
        return file.replace('/spec/lib/', '/lib/');
    }
    return file.replace('/spec/', '/app/');
}
exports.specToCode = specToCode;
//# sourceMappingURL=resolver.js.map