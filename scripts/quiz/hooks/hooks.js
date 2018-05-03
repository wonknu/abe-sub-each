'use strict';

var hooks = {
  afterHandlebarsHelpers: function(Handlebars, abe) {
    Handlebars.registerHelper('decode', function(encoded, json, key, obj, ctx) {
      var decoded = decodeURI(encoded);
      json[key] = (decoded != null && decoded != 'undefined') ? JSON.parse(decoded) : [];

      var html = '';

      json[key].forEach(function(item) {
        html += `
          <span>${item.answer}</span>
          <img src="${item.image}" />
        `;
      })

      return html;
    });
  },

  afterEditorInput: function (htmlString, params, abe) {
    if(params.subEach != null) {
      htmlString = htmlString.replace(
        '<div class="input-group">',
          `
          <div class="input-group">
          <div class="daddy-sub" data-sub='${params.subEach}'></div>
        `
      );
    }

    return htmlString
  }
};

exports.default = hooks;
