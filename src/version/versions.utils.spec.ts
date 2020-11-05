import { versionUtils } from "./versions.utils";

describe("versionUtils.getPackageVersion()", () => {
  it("should return a string", () => {
    expect(versionUtils.getPackageJSONVersion()).toEqual("1.0.0");
  });
});
