/* extension.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */

import GObject from 'gi://GObject';
import St from 'gi://St';
import Gio from 'gi://Gio'

import { Extension, gettext as _ } from 'resource:///org/gnome/shell/extensions/extension.js';
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';
import * as PopupMenu from 'resource:///org/gnome/shell/ui/popupMenu.js';

import * as Main from 'resource:///org/gnome/shell/ui/main.js';

const Indicator = GObject.registerClass(
    class Indicator extends PanelMenu.Button {
        _init(settings) {
            super._init(0.0, _('Zdesk'));
            this.add_child(new St.Icon({
                icon_name: 'face-smile-symbolic',
                style_class: 'system-status-icon',
            }));
            const username = settings.get_string('username')
            const password = settings.get_string('password')
            let clockIn = new PopupMenu.PopupMenuItem('Timbra Entrata');
            clockIn.connect('activate', () => {
                const username = settings.get_string('username')
                const password = settings.get_string('password')
                Main.notify('Entrata Timbrata!', 'Entrata timbrata alle ore'+password);
            });
            this.menu.addMenuItem(clockIn);

            let clockOut = new PopupMenu.PopupMenuItem('Timbra Uscita');
            clockOut.connect('activate', () => {
                const username = settings.get_string('username')
                const password = settings.get_string('password')
                Main.notify('Uscita Timbrata!', 'Uscita timbrata alle ore '+username)
            });
            this.menu.addMenuItem(clockOut)
        }
    });

export default class IndicatorExampleExtension extends Extension {
    enable() {
        this.settings=this.getSettings('org.gnome.shell.extensions.gnomezdesk')
        this._indicator = new Indicator(this.settings);
        Main.panel.addToStatusArea(this.uuid, this._indicator);
    }

    disable() {
        this._indicator.destroy();
        this._indicator = null; 
    }
}
