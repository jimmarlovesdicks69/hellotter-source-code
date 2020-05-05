import './native';

// The library lib-hellotter-app (externally) depends on the libraries jQuery
(global => {
    // jQuery
    if (typeof global.$ === 'undefined') {
        const jQuery = require('jquery');

        jQuery(global);
        global.$ = jQuery;
    }
})(global || window || this); // eslint-disable-line no-invalid-this

// Re-export JitsiMeetJS from the library lib-hellotter-app to (the other features
// of) the project hellotter-app.
//
// TODO The Web support implemented by the hellotter-app project explicitly uses
// the library lib-hellotter-app as a binary and keeps it out of the application
// bundle. The mobile support implemented by the hellotter-app project did not get
// to keeping the lib-hellotter-app library out of the application bundle and even
// used it from source. As an intermediate step, start using the library
// lib-hellotter-app as a binary on mobile at the time of this writing. In the
// future, implement not packaging it in the application bundle.
import JitsiMeetJS from 'lib-jitsi-meet/lib-jitsi-meet.min';
export { JitsiMeetJS as default };
