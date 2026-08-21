const {describe, expect, test} = require("@jest/globals");
const {parseSemver, resolvePublishVersion} = require("../scripts/next-publish-version");

describe("parseSemver", () => {
    test("accepts v-prefixed release tags", () => {
        expect(parseSemver("v1.5.0")).toEqual({major: 1, minor: 5, patch: 0});
    });

    test("rejects extra numeric segments used on some git tags", () => {
        expect(parseSemver("v1.4.8.1")).toBeNull();
    });
});

describe("resolvePublishVersion", () => {
    const published = ["1.4.6", "1.4.8"];

    test("uses an unpublished GitHub release tag instead of package.json", () => {
        expect(resolvePublishVersion("1.4.8", "v1.5.0", published)).toBe("1.5.0");
    });

    test("autoincrements patch when the release tag is already published", () => {
        expect(resolvePublishVersion("1.4.8", "v1.4.8", published)).toBe("1.4.9");
    });

    test("falls back to package.json when the tag is not valid semver", () => {
        expect(resolvePublishVersion("1.4.8", "v1.4.8.1", published)).toBe("1.4.9");
    });

    test("keeps walking patch until the version is unpublished", () => {
        expect(resolvePublishVersion("1.4.8", "v1.4.8", ["1.4.8", "1.4.9"])).toBe("1.4.10");
    });

    test("uses package.json when it is already unpublished and no tag is set", () => {
        expect(resolvePublishVersion("1.5.0", "", published)).toBe("1.5.0");
    });

    test("accepts a single published version string from npm view", () => {
        expect(resolvePublishVersion("1.0.0", "v1.0.0", "1.0.0")).toBe("1.0.1");
    });
});
