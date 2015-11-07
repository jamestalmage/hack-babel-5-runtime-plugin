"use strict";
var wrappedPlugin = require('babel-plugin-runtime');
var xtend = require('xtend');

module.exports = function(ref) {

	var pluginDef;

	wrappedPlugin(xtend(ref,{
		Plugin: function(pluginName, def) {
			pluginDef = def;
		}
	}));

	var RUNTIME_MODULE_NAME = "babel-runtime";

	pluginDef = xtend(pluginDef, {
		pre: function pre(file) {

			// TODO: This is a copy of the existing implementation. We need to modify so the paths resolve correctly

			file.set("helperGenerator", function (name) {
				return file.addImport(RUNTIME_MODULE_NAME + "/helpers/" + name, name, "absoluteDefault");
			});

			file.setDynamic("regeneratorIdentifier", function () {
				return file.addImport(RUNTIME_MODULE_NAME + "/regenerator", "regeneratorRuntime", "absoluteDefault");
			});
		}
	});

	return new ref.Plugin(pluginDef);
};
