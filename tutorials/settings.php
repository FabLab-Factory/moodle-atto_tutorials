<?php
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

/**
 * tutorials settings.
 *
 * @package   atto_tutorials
 * @copyright  2020 Zimcke Van de Staey <zimcke@fablabfactory.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */


defined('MOODLE_INTERNAL') || die();

$ADMIN->add('editoratto', new admin_category('atto_tutorials', new lang_string('pluginname', 'atto_tutorials')));

$settings = new admin_settingpage('atto_tutorials_settings', new lang_string('settings', 'atto_tutorials'));
if ($ADMIN->fulltree) {
	// An option setting
	$settings->add(new admin_setting_configmulticheckbox(
        'atto_tutorials/enabled_templates',
        get_string('enabled_templates', 'atto_tutorials'),
        get_string('enabled_templates_desc', 'atto_tutorials'),
        array(
            // 'component_two_columns'   => 'checked',
            // 'component_subcomponent_two_columns'   => 'checked',
            'component_one_column' => 'checked',
            'component_subcomponent_one_column' => 'checked',
            // 'subcomponent_two_columns' => 'checked',
            'subcomponent_one_column' => 'checked'
        ),
        array(
            // 'component_two_columns' => get_string('component_two_columns', 'atto_tutorials'),
            // 'component_subcomponent_two_columns' => get_string('component_subcomponent_two_columns', 'atto_tutorials'),
            'component_one_column' => get_string('component_one_column', 'atto_tutorials'),
            'component_subcomponent_one_column' => get_string('component_subcomponent_one_column', 'atto_tutorials'),
            // 'subcomponent_two_columns' => get_string('subcomponent_two_columns', 'atto_tutorials'),
            'subcomponent_one_column' => get_string('subcomponent_one_column', 'atto_tutorials')
        )));
}
