# Release process

GitHub Actions is configured to handle the release and upload to NPM. To initiate a release, simply create a new tag and publish it at https://github.com/veryfi/veryfi-nodejs/releases

## Versioning

package.json manages all the package metadata:
* it uses version to track the current version of the package
* it uses main to point to the entry point of the package
* it uses typings to point to the typescript definition file
* it uses scripts to create documentation, run tests, and build the package
