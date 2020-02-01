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

var CSS = {
  INPUTSUBMIT: 'atto_tutorials_selectcolumns'
};

// The extra div and paragraph tags are there to easily insert additional content before or after the tutorial components.
var component_two_columns_template =
'<div class="tutorial">' +
    '<br>' +
    '<p> </p>' +
'</div>' +
  '<div class="tutorial clearfix-tutorial">' +
        '<section class="component">' +
          '<h3>'+M.util.get_string('componenttitle', 'atto_tutorials')+'</h3>' +
          '<p class="max-2-columns">'+M.util.get_string('placeholdertexttwocolumns', 'atto_tutorials')+'</p>' +
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
          '<h3>'+M.util.get_string('componenttitle', 'atto_tutorials')+'</h3>' +
          '<section class="subcomponent">' +
            '<h4>'+M.util.get_string('subcomponenttitle', 'atto_tutorials')+'</h4>' +
            '<p class="max-2-columns">'+M.util.get_string('placeholdertexttwocolumns', 'atto_tutorials')+'</p>' +
          '</section>' +
        '</section>' +
    '</div>' +
    '<div class="tutorial">' +
    '<br>' +
        '<p> </p>' +
    '</div>';

var component_one_column_template =
'<div class="tutorial">' +
    '<br>' +
    '<p> </p>' +
'</div>' +
    '<div class="tutorial clearfix-tutorial">' +
        '<section class="component">' +
          '<h3>'+M.util.get_string('componenttitle', 'atto_tutorials')+'</h3>' +
          '<p class="no-columns">'+M.util.get_string('placeholdertextonecolumn', 'atto_tutorials')+'</p>' +
        '</section>' +
  '</div>' +
  '<div class="tutorial">' +
  '<br>' +
      '<p> </p>' +
  '</div>';

var component_subcomponent_one_column_template =
'<div class="tutorial">' +
    '<br>' +
    '<p> </p>' +
'</div>' +
    '<div class="tutorial clearfix-tutorial">' +
        '<section class="component">' +
          '<h3>'+M.util.get_string('componenttitle', 'atto_tutorials')+'</h3>' +
          '<section class="subcomponent">' +
            '<h4>'+M.util.get_string('subcomponenttitle', 'atto_tutorials')+'</h4>' +
            '<p class="no-columns">'+M.util.get_string('placeholdertextonecolumn', 'atto_tutorials')+'</p>' +
          '</section>' +
        '</section>' +
    '</div>' +
    '<div class="tutorial">' +
    '<br>' +
        '<p> </p>' +
    '</div>';

var templates = { 
    component_two_columns: { template: component_two_columns_template, icon: "component_two_columns", 
      title: M.util.get_string('component_two_columns', 'atto_tutorials') },
    component_subcomponent_two_columns: { template: component_subcomponent_two_columns_template, icon: "component_subcomponent_two_columns", 
      title: M.util.get_string('component_subcomponent_two_columns', 'atto_tutorials') },
    component_one_column: { template: component_one_column_template, icon: "component_one_column", 
      title: M.util.get_string('component_one_column', 'atto_tutorials') },
    component_subcomponent_one_column: { template: component_subcomponent_one_column_template, icon: "component_subcomponent_one_column", 
      title: M.util.get_string('component_subcomponent_one_column', 'atto_tutorials') }
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
Y.namespace('M.atto_tutorials').Button = Y.Base.create('button', Y.M.editor_atto.EditorPlugin, [], {

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

    var editor_icons = ['editor_icon1'];

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
    var width=400;


    var dialogue = this.getDialogue({
      headerContent: M.util.get_string('dialogtitle', COMPONENTNAME),
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

  }
}, { ATTRS: {
  enabled_templates: {
    values: ['component_two_columns',
        'component_subcomponent_two_columns',
        'component_one_column',
        'component_subcomponent_one_column']
  }
}
   });
