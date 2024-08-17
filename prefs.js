import Gtk from 'gi://Gtk';
import Adw from 'gi://Adw';
import Gio from 'gi://Gio';
import { ExtensionPreferences } from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

export default class ExamplePreferences extends ExtensionPreferences {
    fillPreferencesWindow(window) {
        const settings = this.getSettings('org.gnome.shell.extensions.gnomezdesk');

        // Creazione di una pagina delle preferenze
        const page = new Adw.PreferencesPage();

        // Creazione di un gruppo di preferenze
        const group = new Adw.PreferencesGroup();
        page.add(group);

        // Aggiunta del campo per il nome utente
        const usernameRow = new Adw.ActionRow({
            title: 'Username',
        });
        const usernameEntry = new Gtk.Entry({
            text: settings.get_string('username'),
        });
        usernameEntry.connect('changed', (entry) => {
            settings.set_string('username', entry.get_text());
        });
        usernameRow.add_suffix(usernameEntry);
        group.add(usernameRow);

        // Aggiunta del campo per la password
        const passwordRow = new Adw.ActionRow({
            title: 'Password',
        });
        const passwordEntry = new Gtk.Entry({
            text: settings.get_string('password'),
            visibility: false,  // Nasconde i caratteri della password
        });
        passwordEntry.connect('changed', (entry) => {
            settings.set_string('password', entry.get_text());
        });
        passwordRow.add_suffix(passwordEntry);
        group.add(passwordRow);

        // Aggiunta della pagina delle preferenze alla finestra
        window.add(page);
    }
}
