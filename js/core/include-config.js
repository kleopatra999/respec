// Module core/include-config
// Inject's the document's configuration into the head as JSON.
/*globals define*/
'use strict';

define(
  [],
  function () {
    function confFilter(key, val) {
      // DefinitionMap contains array of DOM elements that aren't serializable
      // we replace them by their id
      if (key === 'definitionMap') {
        var ret = {};
        Object.keys(val).forEach(function (k) {
          ret[k] = val[k].map(function (d) {
            return d[0].id;
          });
        });
        return ret;
      }
      return val;
    }
    return {
      run: function (conf, doc, cb, msg) {
        msg.pub('start', 'core/include-config');
        var script = doc.createElement('script');
        script.id = 'respecFinalConfig';
        script.innerText = JSON.stringify(conf, confFilter, 2);
        script.type = 'application/json';
        doc.head.appendChild(script);
        msg.pub('end', 'core/include-config');
        cb();
      }
    };
  }
);
