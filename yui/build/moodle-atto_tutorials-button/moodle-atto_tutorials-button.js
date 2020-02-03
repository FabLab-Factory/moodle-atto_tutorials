YUI.add('moodle-atto_tutorials-button', function (Y, NAME) {

// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/*
 * @package    atto_tutorials
 * @copyright  2020 Zimcke Van de Staey <zimcke@fablabfactory.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/**
 * @module moodle-atto_tutorials-button
 */

/**
 * Atto text editor tutorials plugin.
 *
 * @namespace M.atto_tutorials
 * @class button
 * @extends M.editor_atto.EditorPlugin
 */

var COMPONENTNAME = 'atto_tutorials';
var LOGNAME = 'atto_tutorials';


var SELECTORS = {
  URLINPUT: '.atto_tutorials_urlentry'
};

var CSS = {
  INPUTSUBMIT: 'atto_tutorials_selectcolumns',
  NEWWINDOW: 'atto_tutorials_openinnewwindow',
  URLINPUT: 'atto_tutorials_urlentry',
};

// The extra div and paragraph tags are there to easily insert additional content before or after the tutorial components.
var component_two_columns_template =
'<div class="tutorial">' +
    '<br>' +
    '<p> </p>' +
'</div>' +
  '<div class="tutorial clearfix-tutorial">' +
        '<section class="component">' +
          '<h3>'+M.util.get_string('componenttitle', COMPONENTNAME)+'</h3>' +
          '<p class="max-2-columns">'+M.util.get_string('placeholdertexttwocolumns', COMPONENTNAME)+'</p>' +
        '</section>' +
  '</div>' +
  '<div class="tutorial">' +
  '<br>' +
      '<p> </p>' +
  '</div>';

var component_subcomponent_two_columns_template =
'<div class="tutorial">' +
    '<br>' +
    '<p> </p>' +
'</div>' +
    '<div class="tutorial clearfix-tutorial">' +
        '<section class="component">' +
          '<h3>'+M.util.get_string('componenttitle', COMPONENTNAME)+'</h3>' +
          '<br>' + 
          '<section class="subcomponent">' +
            '<h4>'+M.util.get_string('subcomponenttitle', COMPONENTNAME)+'</h4>' +
            '<p class="max-2-columns">'+M.util.get_string('placeholdertexttwocolumns', COMPONENTNAME)+'</p>' +
          '</section>' +
          '<br>' + 
        '</section>' +
    '</div>' +
    '<div class="tutorial">' +
    '<br>' +
        '<p> </p>' +
    '</div>';

var subcomponent_two_columns_template =
      '<br>' + 
      '<section class="subcomponent">' +
        '<h4>'+M.util.get_string('subcomponenttitle', COMPONENTNAME)+'</h4>' +
        '<p class="max-2-columns">'+M.util.get_string('placeholdertexttwocolumns', COMPONENTNAME)+'</p>' +
      '</section>' +
      '<br>';

var component_one_column_template =
'<div class="tutorial">' +
    '<br>' +
    '<p> </p>' +
'</div>' +
    '<div class="tutorial clearfix-tutorial">' +
        '<section class="component">' +
          '<h3>'+M.util.get_string('componenttitle', COMPONENTNAME)+'</h3>' +
          '<p class="no-columns">'+M.util.get_string('placeholdertextonecolumn', COMPONENTNAME)+'</p>' +
        '</section>' +
  '</div>' +
  '<div class="tutorial">' +
  '<br>' +
      '<p> </p>' +
  '</div>';

var component_subcomponent_one_column_template =
'<div class="tutorial">' +
    '<br>' +
'</div>' +
    '<div class="tutorial clearfix-tutorial">' +
        '<section class="component">' +
        '<br>' +
          '<h3>'+M.util.get_string('componenttitle', COMPONENTNAME)+'</h3>' +
          '<section class="subcomponent">' +
            '<h4>'+M.util.get_string('subcomponenttitle', COMPONENTNAME)+'</h4>' +
            '<p class="no-columns">'+M.util.get_string('placeholdertextonecolumn', COMPONENTNAME)+'</p>' +
          '</section>' +
          '<br>' +
        '</section>' +
    '</div>' +
    '<div class="tutorial">' +
    '<br>' +
        '<p> </p>' +
    '</div>';

var subcomponent_one_column_template =
    '<br>' + 
    '<section class="subcomponent">' +
      '<h4>'+M.util.get_string('subcomponenttitle', COMPONENTNAME)+'</h4>' +
      '<p class="no-columns">'+M.util.get_string('placeholdertextonecolumn', COMPONENTNAME)+'</p>' +
    '</section>' +
    '<br>';

var templates = { 
    component_two_columns: { template: component_two_columns_template, icon: "component_two_columns", 
      title: M.util.get_string('component_two_columns', COMPONENTNAME) },
    component_subcomponent_two_columns: { template: component_subcomponent_two_columns_template, icon: "component_subcomponent_two_columns", 
      title: M.util.get_string('component_subcomponent_two_columns', COMPONENTNAME) },
    subcomponent_two_columns: { template: subcomponent_two_columns_template, icon: "subcomponent_two_columns",
      title: M.util.get_string('subcomponent_two_columns', COMPONENTNAME) },
    component_one_column: { template: component_one_column_template, icon: "component_one_column", 
      title: M.util.get_string('component_one_column', COMPONENTNAME) },
    component_subcomponent_one_column: { template: component_subcomponent_one_column_template, icon: "component_subcomponent_one_column", 
      title: M.util.get_string('component_subcomponent_one_column', COMPONENTNAME) },
    subcomponent_one_column: { template: subcomponent_one_column_template, icon: "subcomponent_one_column",
      title: M.util.get_string('subcomponent_one_column', COMPONENTNAME) }
};
    
function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}
var TEMPLATE="";
var BUTTON_TEMPLATE="";
Y.namespace('M.atto_tutorials').Button = Y.Base.create('button', Y.M.editor_atto.EditorPlugin, [], {

      /**
     * A reference to the current selection at the time that the dialogue
     * was opened.
     *
     * @property _currentSelection
     * @type Range
     * @private
     */
    _currentSelection: null,

        /**
     * A reference to the dialogue content.
     *
     * @property _content
     * @type Node
     * @private
     */
    _content: null,

  /**
   * Initialize the button
   *
   * @method Initializer
   */
  initializer: function() {
    // If we don't have the capability to view then give up.
    if (this.get('disabled')){
      return;
    }

    var editor_icons = ['editor_icon1', 'editor_icon2'];

    if(TEMPLATE === ""){
      TEMPLATE +=
      '<form class="atto_form">' +
      '<div id="{{elementid}}_{{innerform}}" class="mdl-align">';
      for(var t in templates) {
        if(contains(this.get('enabled_templates'),t)) {
          TEMPLATE += '<a class="tutorialstemplateicon {{CSS.INPUTSUBMIT}}" alt="' + templates[t].title +  '" title="' +
                      templates[t].title + '" data-template="'+ t + '">' +
                          '<img src="'+ M.util.image_url("ed/" + templates[t].icon,"atto_tutorials") + '"/>' +
                      '</a>';
        }
      }

      TEMPLATE += '</div>' + '</form>';
    }

    if(BUTTON_TEMPLATE === ""){
      BUTTON_TEMPLATE +=
      '<form class="atto_form">' +
          '<div class="mb-1">' +
                  '<label for="{{elementid}}_atto_link_textentry">{{get_string "entertext" component}}</label>' +
                  '<input class="form-control fullwidth atto_button_text" type="text" ' +
                  'id="{{elementid}}_atto_link_textentry" size="32"/>' +
          '</div>' +
          '{{#if showFilepicker}}' +
              '<label for="{{elementid}}_atto_link_urlentry">{{get_string "enterurl" component}}</label>' +
              '<div class="input-group input-append w-100 mb-1">' +
                  '<input class="form-control url {{CSS.URLINPUT}}" type="url" ' +
                  'id="{{elementid}}_atto_link_urlentry"/>' +
                  '<span class="input-group-append">' +
                      '<button class="btn btn-secondary openlinkbrowser" type="button">' +
                      '{{get_string "browserepositories" component}}</button>' +
                  '</span>' +
              '</div>' +
          '{{else}}' +
              '<div class="mb-1">' +
                  '<label for="{{elementid}}_atto_link_urlentry">{{get_string "enterurl" component}}</label>' +
                  '<input class="form-control fullwidth url {{CSS.URLINPUT}}" type="url" ' +
                  'id="{{elementid}}_atto_link_urlentry" size="32"/>' +
              '</div>' +
          '{{/if}}' +
          '<div class="form-check">' +
              '<input type="checkbox" class="form-check-input newwindow" id="{{elementid}}_{{CSS.NEWWINDOW}}"/>' +
              '<label class="form-check-label" for="{{elementid}}_{{CSS.NEWWINDOW}}">' +
              '{{get_string "openinnewwindow" component}}' +
              '</label>' +
          '</div>' +
          '<div class="mdl-align">' +
              '<br/>' +
              '<button type="submit" class="btn btn-secondary submit">{{get_string "createlink" component}}</button>' +
          '</div>' +
      '</form>';
    }

    Y.Array.each(editor_icons, function(theicon) {
      // Add the tutorials icon/buttons
      this.addButton({
        icon: 'ed/' + theicon,
        iconComponent: 'atto_tutorials',
        buttonName: theicon,
        callback: this._displayDialogue,
        callbackArgs: theicon
      });
    }, this);

  },

  /**
   * Display the tutorials Dialogue
   *
   * @method _displayDialogue
   * @private
   */
  _displayDialogue: function(e, clickedicon) {
    e.preventDefault();
    var width=500;

    this._currentSelection = this.get('host').getSelection();
    if (this._currentSelection === false) {
        return;
    }

    // TODO make dialogtitle dependent on the clicked icon
    var dialogtitle = '';
    if(clickedicon == 'editor_icon1'){
      dialogtitle = 'templates_title';
    } else if (clickedicon == 'editor_icon2'){
      dialogtitle = 'button_title';
    }

    var dialogue = this.getDialogue({
      headerContent: M.util.get_string(dialogtitle, COMPONENTNAME),
      width: width + 'px',
      focusAfterHide: clickedicon
    });

    //dialog doesn't detect changes in width without this
    //if you reuse the dialog, this seems necessary
    if(dialogue.width !== width + 'px'){
      dialogue.set('width',width+'px');
    }

    //append buttons to iframe
    var buttonform = this._getFormContent(clickedicon);

    var bodycontent =  Y.Node.create('<div></div>');
    bodycontent.append(buttonform);

    //set to bodycontent
    dialogue.set('bodyContent', bodycontent);
    dialogue.show();
    this.markUpdated();
  },


  /**
   * Return the dialogue content for the tool, attaching any required
   * events.
   *
   * @method _getDialogueContent
   * @return {Node} The content to place in the dialogue.
   * @private
   */
  _getFormContent: function(clickedicon) {
    if(clickedicon == 'editor_icon1'){
      var template = Y.Handlebars.compile(TEMPLATE),
      content = Y.Node.create(template({
        elementid: this.get('host').get('elementid'),
        CSS: CSS,
        component: COMPONENTNAME,
        clickedicon: clickedicon
      }));

      this._form = content;
      this._form.all('.' + CSS.INPUTSUBMIT).on('click', this._doInsert, this);
      return content;
    } else if(clickedicon == 'editor_icon2') {

      var canShowFilepicker = this.get('host').canShowFilepicker('link'),
            template = Y.Handlebars.compile(BUTTON_TEMPLATE);

        this._content = Y.Node.create(template({
            showFilepicker: canShowFilepicker,
            component: COMPONENTNAME,
            CSS: CSS
        }));

        this._content.one('.submit').on('click', this._setLink, this);
        if (canShowFilepicker) {
            this._content.one('.openlinkbrowser').on('click', function(e) {
                e.preventDefault();
                this.get('host').showFilepicker('link', this._filepickerCallback, this);
            }, this);
        }

        return this._content;

    }
  },

  /**
   * Inserts the users input onto the page
   * @method _getDialogueContent
   * @private
   */
  _doInsert : function(e){
    e.preventDefault();
    this.getDialogue({
      focusAfterHide: null
    }).hide();
    this.editor.focus();
    var templateName = e.currentTarget.getAttribute('data-template');
    this.get('host').insertContentAtFocusPoint(templates[templateName].template);
    this.markUpdated();

  },


  /** Link helper functions */

  /**
     * Update the dialogue after a link was selected in the File Picker.
     *
     * @method _filepickerCallback
     * @param {object} params The parameters provided by the filepicker
     * containing information about the link.
     * @private
     */
    _filepickerCallback: function(params) {
      this.getDialogue()
              .set('focusAfterHide', null)
              .hide();

      if (params.url !== '') {

        var input_text,
        value_text;

        input_text = this._content.one('.atto_button_text');
        value_text = input_text.get('value');

          // Add the link.
          this._setLinkOnSelection(params.url, value_text);

          // And mark the text area as updated.
          this.markUpdated();
      }
  },

  /**
     * The link was inserted, so make changes to the editor source.
     *
     * @method _setLink
     * @param {EventFacade} e
     * @private
     */
    _setLink: function(e) {
      var input, 
      input_text,
          value,
          value_text;

      e.preventDefault();
      this.getDialogue({
          focusAfterHide: null
      }).hide();

      input = this._content.one('.url');
      input_text = this._content.one('.atto_button_text');

      value_text = input_text.get('value');
      value = input.get('value');
      if (value !== '') {

          // We add a prefix if it is not already prefixed.
          value = value.trim();
          var expr = new RegExp(/^[a-zA-Z]*\.*\/|^#|^[a-zA-Z]*:/);
          if (!expr.test(value)) {
              value = 'http://' + value;
          }

          // Add the link.
          this._setLinkOnSelection(value, value_text);

          this.markUpdated();
      }
  },

  /**
   * Final step setting the anchor on the selection.
   *
   * @private
   * @method _setLinkOnSelection
   * @param  {String} url URL the link will point to.
   * @return {Node} The added Node.
   */
  _setLinkOnSelection: function(url, button_text) {
      var host = this.get('host'),
          link,
          selectednode,
          target,
          anchornodes;

      this.editor.focus();
      host.setSelection(this._currentSelection);

      if (this._currentSelection[0].collapsed) {
          // Firefox cannot add links when the selection is empty so we will add it manually.
          link = Y.Node.create('<a class="download-button">' + button_text + '</a>');
          link.setAttribute('href', url);

          // Add the node and select it to replicate the behaviour of execCommand.
          selectednode = host.insertContentAtFocusPoint(link.get('outerHTML'));
          host.setSelection(host.getSelectionFromNode(selectednode));
      } else {
          document.execCommand('unlink', false, null);
          document.execCommand('createLink', false, url);

          // Now set the target.
          selectednode = host.getSelectionParentNode();
      }

      // Note this is a document fragment and YUI doesn't like them.
      if (!selectednode) {
          return;
      }

      anchornodes = this._findSelectedAnchors(Y.one(selectednode));
      // Add new window attributes if requested.
      Y.Array.each(anchornodes, function(anchornode) {
          target = this._content.one('.newwindow');
          if (target.get('checked')) {
              anchornode.setAttribute('target', '_blank');
          } else {
              anchornode.removeAttribute('target');
          }
      }, this);

      return selectednode;
  },

  /**
   * Look up and down for the nearest anchor tags that are least partly contained in the selection.
   *
   * @method _findSelectedAnchors
   * @param {Node} node The node to search under for the selected anchor.
   * @return {Node|Boolean} The Node, or false if not found.
   * @private
   */
  _findSelectedAnchors: function(node) {
      var tagname = node.get('tagName'),
          hit, hits;

      // Direct hit.
      if (tagname && tagname.toLowerCase() === 'a') {
          return [node];
      }

      // Search down but check that each node is part of the selection.
      hits = [];
      node.all('a').each(function(n) {
          if (!hit && this.get('host').selectionContainsNode(n)) {
              hits.push(n);
          }
      }, this);
      if (hits.length > 0) {
          return hits;
      }
      // Search up.
      hit = node.ancestor('a');
      if (hit) {
          return [hit];
      }
      return [];
  },


}, { ATTRS: {
  enabled_templates: {
    values: ['component_two_columns',
        'component_subcomponent_two_columns',
        'subcomponent_two_columns',
        'component_one_column',
        'component_subcomponent_one_column',
        'subcomponent_one_column']
  }
}
   });


}, '@VERSION@', {"requires": ["moodle-editor_atto-plugin"]});
