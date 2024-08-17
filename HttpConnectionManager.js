import Gio from "gi://Gio";
import GLib from "gi://GLib";
import St from "gi://St";

export default class HttpConnectionManager{
    makeHttpRequest() {
        // URL to request
        const url = '';

        // Create a new HTTP request
        const session = new Gio.Session();

        try {
        // Create a request object
        const request = new Gio.Request({
            method: 'GET',
            url: url,
            session: session,
        });

        // Send the request
        request.send_async(null, (src, res) => {
            try {
            // Get the response stream
            const stream = request.send_finish(res);

            // Read the response data
            let responseData = [];
            stream.read_all_async(GLib.PRIORITY_DEFAULT, null, (input, result) => {
                responseData = input.read_all_finish(result)[1];

                // Parse and log the response data
                const responseText = String.fromCharCode.apply(null, responseData);
                log(`Response: ${responseText}`);

                // Optionally, show a notification with the response data
                Main.notify('HTTP Response', responseText);
            });
            } catch (e) {
            logError(e, 'Failed to process HTTP response');
            }
        });
        } catch (e) {
        logError(e, 'Failed to create HTTP request');
        }
    }
}
