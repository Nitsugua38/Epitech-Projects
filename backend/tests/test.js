const assert = require("assert");
const { normalizeSalary } = require("../DATA/datafeature.js");

require("dotenv").config();
require("../index.js");

const PORT = process.env.PORT;
const baseUrl = `http://localhost:${PORT}`;


(async () => {
    // Test: Data Normalization function
    assert.strictEqual(normalizeSalary(null), "Non précisé");
    assert.strictEqual(normalizeSalary("35k"), "Moins de 40k");
    assert.strictEqual(normalizeSalary("45k - 55k €"), "50k - 60k");


    // Test: Two backend API routes
    const res1 = await fetch(`${baseUrl}/api/user`);
    assert.strictEqual(res1.status, 401);
    const json1 = await res1.json();
    assert.deepStrictEqual(json1, { error: "No token" });

    const res2 = await fetch(`${baseUrl}/api/jobs`);
    assert.strictEqual(res2.status, 200);
    const json2 = await res2.json();
    assert.ok(json2.jobs);

    process.exit(0);
})();