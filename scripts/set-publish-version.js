#!/usr/bin/env node
/**
 * Set package.json (and package-lock.json) to an unpublished version before npm publish.
 *
 * Reads RELEASE_TAG or GITHUB_REF_NAME for the GitHub release tag.
 * Queries the npm registry for already-published versions of this package.
 */
const {execFileSync} = require("child_process");
const path = require("path");
const {resolvePublishVersion} = require("./next-publish-version");

function readPublishedVersions(packageName) {
    try {
        const output = execFileSync(
            "npm",
            ["view", packageName, "versions", "--json"],
            {encoding: "utf8", stdio: ["ignore", "pipe", "pipe"]}
        );
        const parsed = JSON.parse(output);
        if (Array.isArray(parsed)) {
            return parsed;
        }
        if (typeof parsed === "string") {
            return [parsed];
        }
        return [];
    } catch (error) {
        const stderr = error.stderr ? String(error.stderr) : String(error.message || error);
        if (/E404|404 Not Found|code E404/i.test(stderr)) {
            return [];
        }
        console.warn("Could not read published versions from npm; treating as none.");
        console.warn(stderr.trim());
        return [];
    }
}

function main() {
    const packageJsonPath = path.join(__dirname, "..", "package.json");
    const pkg = require(packageJsonPath);
    const releaseTag = process.env.RELEASE_TAG || process.env.GITHUB_REF_NAME || "";
    const published = readPublishedVersions(pkg.name);
    const nextVersion = resolvePublishVersion(pkg.version, releaseTag, published);

    console.log(`package.json version: ${pkg.version}`);
    console.log(`release tag: ${releaseTag || "(none)"}`);
    console.log(`latest published: ${published[published.length - 1] || "(none)"}`);
    console.log(`publish version: ${nextVersion}`);

    if (nextVersion === pkg.version) {
        console.log("package.json already matches an unpublished version");
        return;
    }

    execFileSync("npm", ["version", nextVersion, "--no-git-tag-version", "--allow-same-version"], {
        stdio: "inherit",
        cwd: path.join(__dirname, ".."),
    });
}

if (require.main === module) {
    main();
}

module.exports = {readPublishedVersions, main};
