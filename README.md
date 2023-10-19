# TITech Matrix Autocomplete (Firefox addons)
*October 2023*

### Presentation

This project aims to provided matrix auto complete in Firefox for TITech Portal Website as it was only available for [chrome](https://chrome.google.com/webstore/detail/titech-matrix-auto-comple/cmgdfekapggmapckikbjjlcnkfojbpbf) at the time of this README is being written-up.

Please note few things:
- Using this extension is at your own risk since it lower the security scheme intended by the portal.
- This extension is provided as it is, without any warranty (see LICENSE file).
- This code is not affiliated by any kind to official TITech software environment.
- The matrix is not cyphered while being stored

### Usage:
The code used is under `firefox/`, last builds are provided under `build/` since the source code needs to be first signed by Mozilla to be deploy under a non nightly firefox build. If you want to compile it by yourself you need to submit the source trough [AMO](https://addons.mozilla.org/fr/firefox/).
The build file (`.xpi`) can "zip-opened" to check the original content.

After the extension is installed, you have to visit `about:addons` and then using the three dots next to the extension name: go to option. There you will be able to enter your personal matrix line by line and save it.

### Enhancement

If you see any improvements (security, design, ...), feel free to raise a pull request (keep in mind that the extension has to remained simple).

