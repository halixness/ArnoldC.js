/// <reference path="typings/qunit.d.ts" />
/// <reference path="testhelpers.ts" />
/// <reference path="../main/transpiler.ts" />
"use strict";

QUnit.module("branchStatement");
QUnit.test("function using simple if statements", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE vartrue\n" +
        "YOU SET US UP @NO PROBLEMO\n" +
        "BECAUSE I'M GOING TO SAY PLEASE vartrue\n" +
        "TALK TO THE HAND \"this branch should be reached\"\n" +
        "YOU HAVE NO RESPECT FOR LOGIC\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], "this branch should be reached");
});
QUnit.test("function using simple if statements vol2", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE vartrue\n" +
        "YOU SET US UP @I LIED\n" +
        "BECAUSE I'M GOING TO SAY PLEASE vartrue\n" +
        "TALK TO THE HAND \"this branch should not be reached\"\n" +
        "YOU HAVE NO RESPECT FOR LOGIC\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 0);
});
QUnit.test("function using simple if else statements", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE vartrue\n" +
        "YOU SET US UP @NO PROBLEMO\n" +
        "BECAUSE I'M GOING TO SAY PLEASE vartrue\n" +
        "TALK TO THE HAND \"this branch should be reached\"\n" +
        "BULLSHIT\n" +
        "TALK TO THE HAND \"this branch should not be reached\"\n" +
        "YOU HAVE NO RESPECT FOR LOGIC\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], "this branch should be reached");
});
QUnit.test("function using simple if else statements vol2", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE varfalse\n" +
        "YOU SET US UP @I LIED\n" +
        "BECAUSE I'M GOING TO SAY PLEASE varfalse\n" +
        "TALK TO THE HAND \"this branch should not be reached\"\n" +
        "BULLSHIT\n" +
        "TALK TO THE HAND \"this branch should be reached\"\n" +
        "YOU HAVE NO RESPECT FOR LOGIC\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], "this branch should be reached");
});
QUnit.test("function using assigning variables in if statements", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE var\n" +
        "YOU SET US UP 0\n" +
        "HEY CHRISTMAS TREE vartrue\n" +
        "YOU SET US UP @NO PROBLEMO\n" +
        "BECAUSE I'M GOING TO SAY PLEASE vartrue\n" +
        "GET TO THE CHOPPER var\n" +
        "HERE IS MY INVITATION 3\n" +
        "ENOUGH TALK\n" +
        "YOU HAVE NO RESPECT FOR LOGIC\n" +
        "TALK TO THE HAND var\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], 3);
});
QUnit.test("function using stub while statement", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE varfalse\n" +
        "YOU SET US UP @I LIED\n" +
        "STICK AROUND varfalse\n" +
        "CHILL\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 0);
});
QUnit.test("function using stub while statement vol2", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "STICK AROUND @I LIED\n" +
        "CHILL\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 0);
});
QUnit.test("function when while loop executed once", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE varfalse\n" +
        "YOU SET US UP @NO PROBLEMO\n" +
        "STICK AROUND varfalse\n" +
        "GET TO THE CHOPPER varfalse\n" +
        "HERE IS MY INVITATION @I LIED\n" +
        "ENOUGH TALK\n" +
        "TALK TO THE HAND \"while statement printed once\"\n" +
        "CHILL\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], "while statement printed once");
});
QUnit.test("function when while loop executed consequently", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE isLessThan10\n" +
        "YOU SET US UP @NO PROBLEMO\n" +
        "HEY CHRISTMAS TREE n\n" +
        "YOU SET US UP 0\n" +
        "STICK AROUND isLessThan10\n" +
        "GET TO THE CHOPPER n\n" +
        "HERE IS MY INVITATION n\n" +
        "GET UP 1\n" +
        "ENOUGH TALK\n" +
        "TALK TO THE HAND n\n" +
        "GET TO THE CHOPPER isLessThan10\n" +
        "HERE IS MY INVITATION 10\n" +
        "LET OFF SOME STEAM BENNET n\n" +
        "ENOUGH TALK\n" +
        "CHILL\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 10);
    assert.strictEqual(output[0], 1);
    assert.strictEqual(output[1], 2);
    assert.strictEqual(output[2], 3);
    assert.strictEqual(output[3], 4);

    assert.strictEqual(output[4], 5);
    assert.strictEqual(output[5], 6);
    assert.strictEqual(output[6], 7);
    assert.strictEqual(output[7], 8);
    assert.strictEqual(output[8], 9);
    assert.strictEqual(output[9], 10);
});
QUnit.test("function using variable from parent block scope", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE vartrue\n" +
        "YOU SET US UP @NO PROBLEMO\n" +
        "BECAUSE I'M GOING TO SAY PLEASE vartrue\n" +
        "TALK TO THE HAND vartrue\n" +
        "GET TO THE CHOPPER vartrue\n" +
        "HERE IS MY INVITATION @I LIED\n" +
        "ENOUGH TALK\n" +
        "TALK TO THE HAND vartrue\n" +
        "YOU HAVE NO RESPECT FOR LOGIC\n" +
        "TALK TO THE HAND vartrue\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 3);
    assert.strictEqual(output[0], 1);
    assert.strictEqual(output[1], 0);
    assert.strictEqual(output[2], 0);
});

QUnit.module("branchStatement errors");
QUnit.test("detect when variable redeclared in child block scope", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE vartrue\n" +
        "YOU SET US UP @NO PROBLEMO\n" +
        "TALK TO THE HAND vartrue\n" +
        "BECAUSE I'M GOING TO SAY PLEASE vartrue\n" +
        "HEY CHRISTMAS TREE vartrue\n" +
        "YOU SET US UP @I LIED\n" +
        "TALK TO THE HAND vartrue\n" +
        "YOU HAVE NO RESPECT FOR LOGIC\n" +
        "TALK TO THE HAND vartrue\n" +
        "YOU HAVE BEEN TERMINATED\n"

    assert.throws(function () {
        testhelpers.transpileAndExecute(code);
    }, testhelpers.isTranspileError);
});
QUnit.test("detect when child block scope variable is redeclared", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE vartrue\n" +
        "YOU SET US UP @NO PROBLEMO\n" +
        "BECAUSE I'M GOING TO SAY PLEASE vartrue\n" +
        "HEY CHRISTMAS TREE varfalse\n" +
        "YOU SET US UP @I LIED\n" +
        "TALK TO THE HAND varfalse\n" +
        "YOU HAVE NO RESPECT FOR LOGIC\n" +
        "HEY CHRISTMAS TREE varfalse\n" +
        "YOU SET US UP @I LIED\n" +
        "TALK TO THE HAND varfalse\n" +
        "YOU HAVE BEEN TERMINATED\n"

    assert.throws(function () {
        testhelpers.transpileAndExecute(code);
    }, testhelpers.isTranspileError);
});
QUnit.test("detect when using variable declared in a child block scope", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE vartrue\n" +
        "YOU SET US UP @NO PROBLEMO\n" +
        "TALK TO THE HAND vartrue\n" +
        "BECAUSE I'M GOING TO SAY PLEASE vartrue\n" +
        "HEY CHRISTMAS TREE varfalse\n" +
        "YOU SET US UP @I LIED\n" +
        "TALK TO THE HAND varfalse\n" +
        "YOU HAVE NO RESPECT FOR LOGIC\n" +
        "TALK TO THE HAND varfalse\n" +
        "YOU HAVE BEEN TERMINATED\n"

    assert.throws(function () {
        testhelpers.transpileAndExecute(code);
    }, testhelpers.isTranspileError);
});