# Offline speech recognition files

- `vosk.js` – vosk-browser 0.0.8 (Apache-2.0), a WebAssembly build of the Vosk/Kaldi recogniser that runs in a Web Worker.
- `vosk-model-small-en-us-0.15.tar.gz` – the small English acoustic model from Alpha Cephei (Apache-2.0), repacked from the published zip.

These are downloaded by the app only when a pilot turns on Offline recognition (Status → Voice), stored in a separate
browser cache (`ga-ecl-offline`) that survives app updates, and never included in the app's normal precache.
