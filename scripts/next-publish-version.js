/**
 * Resolve an unpublished npm version for CI releases.
 *
 * Preference order:
 * 1. GitHub release tag (v1.5.0 → 1.5.0) when it is valid semver
 * 2. package.json version
 *
 * If that version is already on the registry, bump the patch until it is free.
 */

/**
 * @param {string|undefined|null} value
 * @returns {{major: number, minor: number, patch: number}|null}
 */
function parseSemver(value) {
    if (!value || typeof value !== "string") {
        return null;
    }
    const match = value.trim().replace(/^v/i, "").match(/^(\d+)\.(\d+)\.(\d+)$/);
    if (!match) {
        return null;
    }
    return {
        major: Number(match[1]),
        minor: Number(match[2]),
        patch: Number(match[3]),
    };
}

/**
 * @param {{major: number, minor: number, patch: number}} version
 * @returns {string}
 */
function formatSemver(version) {
    return `${version.major}.${version.minor}.${version.patch}`;
}

/**
 * @param {{major: number, minor: number, patch: number}} version
 * @returns {{major: number, minor: number, patch: number}}
 */
function incrementPatch(version) {
    return {
        major: version.major,
        minor: version.minor,
        patch: version.patch + 1,
    };
}

/**
 * @param {string} packageVersion
 * @param {string|undefined|null} releaseTag
 * @param {string[]|string|undefined|null} publishedVersions
 * @returns {string}
 */
function resolvePublishVersion(packageVersion, releaseTag, publishedVersions) {
    const fromPackage = parseSemver(packageVersion);
    if (!fromPackage) {
        throw new Error(`Invalid package.json version: ${packageVersion}`);
    }

    const candidate = parseSemver(releaseTag) || fromPackage;
    const publishedList = Array.isArray(publishedVersions)
        ? publishedVersions
        : publishedVersions
            ? [publishedVersions]
            : [];
    const published = new Set(
        publishedList
            .map((version) => parseSemver(version))
            .filter(Boolean)
            .map((version) => formatSemver(version))
    );

    let next = candidate;
    while (published.has(formatSemver(next))) {
        next = incrementPatch(next);
    }
    return formatSemver(next);
}

module.exports = {
    parseSemver,
    formatSemver,
    incrementPatch,
    resolvePublishVersion,
};
