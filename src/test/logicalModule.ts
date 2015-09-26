/// <reference path="typings/qunit.d.ts" />
/// <reference path="testhelpers.ts" />
/// <reference path="../main/transpiler.ts" />
"use strict";

QUnit.module("logical");
QUnit.test("False Or True Evaluate True", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE var\n" +
        "YOU SET US UP 0\n" +
        "GET TO THE CHOPPER var\n" +
        "HERE IS MY INVITATION 0\n" +
        "CONSIDER THAT A DIVORCE 1\n" +
        "ENOUGH TALK\n" +
        "TALK TO THE HAND var\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], 1);
});
QUnit.test("True Or False Evaluate True", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE var\n" +
        "YOU SET US UP @I LIED\n" +
        "GET TO THE CHOPPER var\n" +
        "HERE IS MY INVITATION @NO PROBLEMO\n" +
        "CONSIDER THAT A DIVORCE @I LIED\n" +
        "ENOUGH TALK\n" +
        "TALK TO THE HAND var\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], 1);
});
QUnit.test("True Or True Evaluate True", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE var\n" +
        "YOU SET US UP @I LIED\n" +
        "GET TO THE CHOPPER var\n" +
        "HERE IS MY INVITATION @NO PROBLEMO\n" +
        "CONSIDER THAT A DIVORCE @NO PROBLEMO\n" +
        "ENOUGH TALK\n" +
        "TALK TO THE HAND var\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], 1);
});
QUnit.test("False Or False Evaluate False", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE var\n" +
        "YOU SET US UP @I LIED\n" +
        "GET TO THE CHOPPER var\n" +
        "HERE IS MY INVITATION @I LIED\n" +
        "CONSIDER THAT A DIVORCE @I LIED\n" +
        "ENOUGH TALK\n" +
        "TALK TO THE HAND var\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], 0);
});
QUnit.test("False And True Evaluate False", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE var\n" +
        "YOU SET US UP @I LIED\n" +
        "GET TO THE CHOPPER var\n" +
        "HERE IS MY INVITATION @I LIED\n" +
        "KNOCK KNOCK @NO PROBLEMO\n" +
        "ENOUGH TALK\n" +
        "TALK TO THE HAND var\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], 0);
});
QUnit.test("True And False Evaluate False", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE var\n" +
        "YOU SET US UP @I LIED\n" +
        "GET TO THE CHOPPER var\n" +
        "HERE IS MY INVITATION @NO PROBLEMO\n" +
        "KNOCK KNOCK @I LIED\n" +
        "ENOUGH TALK\n" +
        "TALK TO THE HAND var\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], 0);
});
QUnit.test("True And True Evaluate True", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE var\n" +
        "YOU SET US UP @I LIED\n" +
        "GET TO THE CHOPPER var\n" +
        "HERE IS MY INVITATION @NO PROBLEMO\n" +
        "KNOCK KNOCK @NO PROBLEMO\n" +
        "ENOUGH TALK\n" +
        "TALK TO THE HAND var\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], 1);
});
QUnit.test("True and True and False evaluates False", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE var\n" +
        "YOU SET US UP @I LIED\n" +
        "GET TO THE CHOPPER var\n" +
        "HERE IS MY INVITATION 1\n" +
        "KNOCK KNOCK 1\n" +
        "KNOCK KNOCK 0\n" +
        "ENOUGH TALK\n" +
        "TALK TO THE HAND var\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], 0);
});
QUnit.test("True and True and True evaluates True", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE var\n" +
        "YOU SET US UP @I LIED\n" +
        "GET TO THE CHOPPER var\n" +
        "HERE IS MY INVITATION 1\n" +
        "KNOCK KNOCK 1\n" +
        "KNOCK KNOCK 1\n" +
        "ENOUGH TALK\n" +
        "TALK TO THE HAND var\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], 1);
});
QUnit.test("True and True and True and True and False evaluates False", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE var\n" +
        "YOU SET US UP @I LIED\n" +
        "GET TO THE CHOPPER var\n" +
        "HERE IS MY INVITATION @NO PROBLEMO\n" +
        "KNOCK KNOCK @NO PROBLEMO\n" +
        "KNOCK KNOCK @NO PROBLEMO\n" +
        "KNOCK KNOCK @NO PROBLEMO\n" +
        "KNOCK KNOCK @I LIED\n" +
        "ENOUGH TALK\n" +
        "TALK TO THE HAND var\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], 0);
});
QUnit.test("False or False or False evaluates False", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE var\n" +
        "YOU SET US UP @I LIED\n" +
        "GET TO THE CHOPPER var\n" +
        "HERE IS MY INVITATION @I LIED\n" +
        "CONSIDER THAT A DIVORCE @I LIED\n" +
        "CONSIDER THAT A DIVORCE @I LIED\n" +
        "ENOUGH TALK\n" +
        "TALK TO THE HAND var\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], 0);
});
QUnit.test("False or True and False evaluates False", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE var\n" +
        "YOU SET US UP @I LIED\n" +
        "GET TO THE CHOPPER var\n" +
        "HERE IS MY INVITATION @I LIED\n" +
        "CONSIDER THAT A DIVORCE @NO PROBLEMO\n" +
        "KNOCK KNOCK @I LIED\n" +
        "ENOUGH TALK\n" +
        "TALK TO THE HAND var\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], 0);
});
QUnit.test("False And False Evaluate False", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE var\n" +
        "YOU SET US UP @I LIED\n" +
        "GET TO THE CHOPPER var\n" +
        "HERE IS MY INVITATION @I LIED\n" +
        "KNOCK KNOCK @I LIED\n" +
        "ENOUGH TALK\n" +
        "TALK TO THE HAND var\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], 0);
});
QUnit.test("False Equals False evaluates True", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE varfalse\n" +
        "YOU SET US UP @I LIED\n" +
        "HEY CHRISTMAS TREE varfalse2\n" +
        "YOU SET US UP @I LIED\n" +
        "GET TO THE CHOPPER varfalse\n" +
        "HERE IS MY INVITATION @I LIED\n" +
        "YOU ARE NOT YOU YOU ARE ME varfalse2\n" +
        "ENOUGH TALK\n" +
        "TALK TO THE HAND varfalse\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], 1);
});
QUnit.test("True Equals False evaluates False", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE varfalse\n" +
        "YOU SET US UP @I LIED\n" +
        "HEY CHRISTMAS TREE result\n" +
        "YOU SET US UP @I LIED\n" +
        "GET TO THE CHOPPER result\n" +
        "HERE IS MY INVITATION @NO PROBLEMO\n" +
        "YOU ARE NOT YOU YOU ARE ME varfalse\n" +
        "ENOUGH TALK\n" +
        "TALK TO THE HAND result\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], 0);
});
QUnit.test("True Equals True Equals True evaluates True", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE result\n" +
        "YOU SET US UP @I LIED\n" +
        "GET TO THE CHOPPER result\n" +
        "HERE IS MY INVITATION @NO PROBLEMO\n" +
        "YOU ARE NOT YOU YOU ARE ME @NO PROBLEMO\n" +
        "YOU ARE NOT YOU YOU ARE ME @NO PROBLEMO\n" +
        "ENOUGH TALK\n" +
        "TALK TO THE HAND result\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], 1);
});
QUnit.test("(13 Equals 13) equals True evaluates True", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE result\n" +
        "YOU SET US UP @I LIED\n" +
        "GET TO THE CHOPPER result\n" +
        "HERE IS MY INVITATION 13\n" +
        "YOU ARE NOT YOU YOU ARE ME 13\n" +
        "YOU ARE NOT YOU YOU ARE ME @NO PROBLEMO\n" +
        "ENOUGH TALK\n" +
        "TALK TO THE HAND result\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], 1);
});
QUnit.test("(13 Equals 14) equals False evaluates True", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE result\n" +
        "YOU SET US UP @I LIED\n" +
        "GET TO THE CHOPPER result\n" +
        "HERE IS MY INVITATION 13\n" +
        "YOU ARE NOT YOU YOU ARE ME 14\n" +
        "YOU ARE NOT YOU YOU ARE ME @I LIED\n" +
        "ENOUGH TALK\n" +
        "TALK TO THE HAND result\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], 1);
});
QUnit.test("(1 Equals 2) equals 3 evaluates False", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE result\n" +
        "YOU SET US UP @I LIED\n" +
        "GET TO THE CHOPPER result\n" +
        "HERE IS MY INVITATION 1\n" +
        "YOU ARE NOT YOU YOU ARE ME 2\n" +
        "YOU ARE NOT YOU YOU ARE ME 3\n" +
        "ENOUGH TALK\n" +
        "TALK TO THE HAND result\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], 0);
});
QUnit.test("13 Equals 13 Equals 14 evaluates False", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE result\n" +
        "YOU SET US UP @I LIED\n" +
        "GET TO THE CHOPPER result\n" +
        "HERE IS MY INVITATION 13\n" +
        "YOU ARE NOT YOU YOU ARE ME 13\n" +
        "YOU ARE NOT YOU YOU ARE ME 14\n" +
        "ENOUGH TALK\n" +
        "TALK TO THE HAND result\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], 0);
});
QUnit.test("1 Equals 2 evaluates False", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE one\n" +
        "YOU SET US UP 1\n" +
        "HEY CHRISTMAS TREE two\n" +
        "YOU SET US UP 2\n" +
        "HEY CHRISTMAS TREE result\n" +
        "YOU SET US UP @NO PROBLEMO\n" +
        "GET TO THE CHOPPER result\n" +
        "HERE IS MY INVITATION one\n" +
        "YOU ARE NOT YOU YOU ARE ME two\n" +
        "ENOUGH TALK\n" +
        "TALK TO THE HAND result\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], 0);
});
QUnit.test("2 is greater than 1 evaluates True", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE one\n" +
        "YOU SET US UP 1\n" +
        "HEY CHRISTMAS TREE two\n" +
        "YOU SET US UP 2\n" +
        "HEY CHRISTMAS TREE result\n" +
        "YOU SET US UP @NO PROBLEMO\n" +
        "GET TO THE CHOPPER result\n" +
        "HERE IS MY INVITATION two\n" +
        "LET OFF SOME STEAM BENNET one\n" +
        "ENOUGH TALK\n" +
        "TALK TO THE HAND result\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], 1);
});
QUnit.test("1 is greater than 2 evaluates False", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE one\n" +
        "YOU SET US UP 1\n" +
        "HEY CHRISTMAS TREE two\n" +
        "YOU SET US UP 2\n" +
        "HEY CHRISTMAS TREE result\n" +
        "YOU SET US UP @NO PROBLEMO\n" +
        "GET TO THE CHOPPER result\n" +
        "HERE IS MY INVITATION one\n" +
        "LET OFF SOME STEAM BENNET two\n" +
        "ENOUGH TALK\n" +
        "TALK TO THE HAND result\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], 0);
});
QUnit.test("3 is greater than 3 evaluates False", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE three\n" +
        "YOU SET US UP 3\n" +
        "HEY CHRISTMAS TREE three2\n" +
        "YOU SET US UP 3\n" +
        "HEY CHRISTMAS TREE result\n" +
        "YOU SET US UP @NO PROBLEMO\n" +
        "GET TO THE CHOPPER result\n" +
        "HERE IS MY INVITATION three\n" +
        "LET OFF SOME STEAM BENNET three2\n" +
        "ENOUGH TALK\n" +
        "TALK TO THE HAND result\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], 0);
});

QUnit.module("logical errors");
QUnit.test("detect faulty logical operations", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "RIGHT? WRONG! VAR\n" +
        "YOU SET US UP @I LIED\n" +
        "GET TO THE CHOPPER VAR\n" +
        "@I LIED\n" +
        "@I LIED\n" +
        "CONSIDER THAT A DIVORCE\n" +
        "@NO PROBLEMO\n" +
        "ENOUGH TALK\n" +
        "YOU HAVE BEEN TERMINATED\n"

    assert.throws(function () {
        testhelpers.transpileAndExecute(code);
    }, testhelpers.isSyntaxError);
});
