import Gtk from "gi://Gtk";
import GObject from "gi://GObject";
import Gio from "gi://Gio";

function init() {}

function buildPrefsWidget() {
  const settings = new Gio.Settings({ schema_id: 'org.gnome.shell.extensions.example' });

  const prefsWidget = new Gtk.Grid({
    column_spacing: 12,
    row_spacing: 12,
    margin_top: 12,
    margin_bottom: 12,
    margin_start: 12,
    margin_end: 12,
    visible: true,
  });

  // Username label and entry
  const usernameLabel = new Gtk.Label({
    label: 'Username:',
    halign: Gtk.Align.START,
    visible: true,
  });
  prefsWidget.attach(usernameLabel, 0, 0, 1, 1);

  const usernameEntry = new Gtk.Entry({
    text: settings.get_string('username'),
    visible: true,
  });
  prefsWidget.attach(usernameEntry, 1, 0, 2, 1);

  // Password label and entry
  const passwordLabel = new Gtk.Label({
    label: 'Password:',
    halign: Gtk.Align.START,
    visible: true,
  });
  prefsWidget.attach(passwordLabel, 0, 1, 1, 1);

  const passwordEntry = new Gtk.Entry({
    text: settings.get_string('password'),
    visibility: false,  // Hide the password characters
    visible: true,
  });
  prefsWidget.attach(passwordEntry, 1, 1, 2, 1);

  // Save username and password on change
  usernameEntry.connect('changed', (entry) => {
    settings.set_string('username', entry.get_text());
  });

  passwordEntry.connect('changed', (entry) => {
    settings.set_string('password', entry.get_text());
  });

  return prefsWidget;
}
