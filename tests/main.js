import assert from "assert";

import './imports/api/products.test';
import './imports/api/categories.test';

describe("e-shop", function () {

    it("package.json has correct name", async function () {
      const { name } = await import("../package.json");
      assert.strictEqual(name, "e-shop");
    });

    if (Meteor.isClient) {
      it("client is not server", function () {
        assert.strictEqual(Meteor.isServer, false);
      });
    }

    if (Meteor.isServer) {
      it("server is not client", function () {
        assert.strictEqual(Meteor.isClient, false);
      });
    }

});
