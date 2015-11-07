'use strict';

require('babel-core/register')({
	ignore: false // obviously installing the global hook is bad for us, just proving the point right now.
});

var wrappedPlugin = require('babel-plugin-transform-runtime');
var RUNTIME_MODULE_NAME = "babel-runtime";
var HELPER_BLACKLIST = ["interopRequireWildcard", "interopRequireDefault"];


module.exports = function (ref) {
	var pluginDef = wrappedPlugin(ref);

	pluginDef.pre =  function pre(file) {
		// TODO: This is a copy of the existing implementation. We need to modify so the paths resolve correctly

		file.set("helperGenerator", function (name) {
			if (HELPER_BLACKLIST.indexOf(name) < 0) {
				return file.addImport(RUNTIME_MODULE_NAME + "/helpers/" + name, "default", name);
			}
		});

		this.setDynamic("regeneratorIdentifier", function () {
			return file.addImport(RUNTIME_MODULE_NAME + "/regenerator", "default", "regeneratorRuntime");
		});
	};

	return pluginDef;
};
