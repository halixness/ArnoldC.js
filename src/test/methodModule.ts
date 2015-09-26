/// <reference path="typings/qunit.d.ts" />
/// <reference path="testhelpers.ts" />
/// <reference path="../main/transpiler.ts" />
"use strict";

QUnit.module("method");
QUnit.test("evalute method other than main", function (assert) {
    var code = "LISTEN TO ME VERY CAREFULLY mymethod\n" +
        "HASTA LA VISTA, BABY\n" +
        "IT'S SHOWTIME\n" +
        "TALK TO THE HAND \"Hello\"\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], "Hello");
});
QUnit.test("evalute method other than main2", function (assert) {
    var code = "LISTEN TO ME VERY CAREFULLY mymethod\n" +
        "HASTA LA VISTA, BABY\n" +
        "IT'S SHOWTIME\n" +
        "TALK TO THE HAND \"Hello\"\n" +
        "YOU HAVE BEEN TERMINATED"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], "Hello");
});
QUnit.test("method other than main3", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "TALK TO THE HAND \"Hello\"\n" +
        "YOU HAVE BEEN TERMINATED\n" +
        "LISTEN TO ME VERY CAREFULLY mymethod\n" +
        "HASTA LA VISTA, BABY\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], "Hello");
});
QUnit.test("evalute method other than main4", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "TALK TO THE HAND \"Hello\"\n" +
        "YOU HAVE BEEN TERMINATED\n" +
        "LISTEN TO ME VERY CAREFULLY mymethod\n" +
        "HASTA LA VISTA, BABY"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], "Hello");
});
QUnit.test("evalute a plain method call", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "DO IT NOW printHello\n" +
        "YOU HAVE BEEN TERMINATED\n" +
        "LISTEN TO ME VERY CAREFULLY printHello\n" +
        "TALK TO THE HAND \"Hello\"\n" +
        "HASTA LA VISTA, BABY"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], "Hello");
});
QUnit.test("evalute a plain method call with keyword name", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "DO IT NOW while\n" +
        "YOU HAVE BEEN TERMINATED\n" +
        "LISTEN TO ME VERY CAREFULLY while\n" +
        "TALK TO THE HAND \"Hello\"\n" +
        "HASTA LA VISTA, BABY"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], "Hello");
});
QUnit.test("evalute a plain method call with keyword name vol2", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "DO IT NOW CHILL\n" +
        "YOU HAVE BEEN TERMINATED\n" +
        "LISTEN TO ME VERY CAREFULLY CHILL\n" +
        "TALK TO THE HAND \"Hello\"\n" +
        "HASTA LA VISTA, BABY"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], "Hello");
});
QUnit.test("evalute a method call that takes an argument", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE argument\n" +
        "YOU SET US UP 123\n" +
        "DO IT NOW printInteger argument\n" +
        "YOU HAVE BEEN TERMINATED\n" +
        "LISTEN TO ME VERY CAREFULLY printInteger\n" +
        "I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE value\n" +
        "TALK TO THE HAND value\n" +
        "HASTA LA VISTA, BABY"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], 123);
});
QUnit.test("evalute a method call that takes an argument with keyword as parameter name", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE throw\n" +
        "YOU SET US UP 123\n" +
        "DO IT NOW printInteger throw\n" +
        "YOU HAVE BEEN TERMINATED\n" +
        "LISTEN TO ME VERY CAREFULLY printInteger\n" +
        "I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE while\n" +
        "TALK TO THE HAND while\n" +
        "HASTA LA VISTA, BABY"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], 123);
});
QUnit.test("evalute a method call that takes an argument with keyword as parameter name vol2", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE BULLSHIT\n" +
        "YOU SET US UP 123\n" +
        "DO IT NOW printInteger BULLSHIT\n" +
        "YOU HAVE BEEN TERMINATED\n" +
        "LISTEN TO ME VERY CAREFULLY printInteger\n" +
        "I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE CHILL\n" +
        "TALK TO THE HAND CHILL\n" +
        "HASTA LA VISTA, BABY"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], 123);
});
QUnit.test("evalute multiple method calls", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "DO IT NOW printHello\n" +
        "DO IT NOW printCheers\n" +
        "YOU HAVE BEEN TERMINATED\n" +
        "LISTEN TO ME VERY CAREFULLY printHello\n" +
        "TALK TO THE HAND \"Hello\"\n" +
        "HASTA LA VISTA, BABY\n" +
        "LISTEN TO ME VERY CAREFULLY printCheers\n" +
        "TALK TO THE HAND \"Cheers\"\n" +
        "HASTA LA VISTA, BABY"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 2);
    assert.strictEqual(output[0], "Hello");
    assert.strictEqual(output[1], "Cheers");
});
QUnit.test("evalute method calls inside method calls", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "DO IT NOW printHello\n" +
        "YOU HAVE BEEN TERMINATED\n" +
        "LISTEN TO ME VERY CAREFULLY printHello\n" +
        "TALK TO THE HAND \"Hello\"\n" +
        "DO IT NOW printCheers\n" +
        "DO IT NOW printHejsan\n" +
        "HASTA LA VISTA, BABY\n" +
        "LISTEN TO ME VERY CAREFULLY printCheers\n" +
        "TALK TO THE HAND \"Cheers\"\n" +
        "HASTA LA VISTA, BABY\n" +
        "LISTEN TO ME VERY CAREFULLY printHejsan\n" +
        "TALK TO THE HAND \"Hejsan\"\n" +
        "HASTA LA VISTA, BABY"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 3);
    assert.strictEqual(output[0], "Hello");
    assert.strictEqual(output[1], "Cheers");
    assert.strictEqual(output[2], "Hejsan");
});
QUnit.test("evalute a return statement in void calls", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "DO IT NOW method\n" +
        "YOU HAVE BEEN TERMINATED\n" +
        "LISTEN TO ME VERY CAREFULLY method\n" +
        "I'LL BE BACK\n" +
        "HASTA LA VISTA, BABY\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 0);
});
QUnit.test("evalute multiple return statemenents in void calls", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "DO IT NOW printboolean @NO PROBLEMO\n" +
        "DO IT NOW printboolean @I LIED\n" +
        "YOU HAVE BEEN TERMINATED\n" +
        "LISTEN TO ME VERY CAREFULLY printboolean\n" +
        "I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE value\n" +
        "BECAUSE I'M GOING TO SAY PLEASE value\n" +
        "TALK TO THE HAND \"true\"\n" +
        "I'LL BE BACK\n" +
        "BULLSHIT\n" +
        "TALK TO THE HAND \"false\"\n" +
        "I'LL BE BACK\n" +
        "YOU HAVE NO RESPECT FOR LOGIC\n" +
        "HASTA LA VISTA, BABY\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 2);
    assert.strictEqual(output[0], "true");
    assert.strictEqual(output[1], "false");
});
QUnit.test("evalute multiple return statemenents in void calls permutation2", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "DO IT NOW printboolean @NO PROBLEMO\n" +
        "DO IT NOW printboolean @I LIED\n" +
        "YOU HAVE BEEN TERMINATED\n" +
        "LISTEN TO ME VERY CAREFULLY printboolean\n" +
        "I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE value\n" +
        "BECAUSE I'M GOING TO SAY PLEASE value\n" +
        "TALK TO THE HAND \"true\"\n" +
        "BULLSHIT\n" +
        "TALK TO THE HAND \"false\"\n" +
        "YOU HAVE NO RESPECT FOR LOGIC\n" +
        "HASTA LA VISTA, BABY\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 2);
    assert.strictEqual(output[0], "true");
    assert.strictEqual(output[1], "false");
});
QUnit.test("evalute multiple return statemenents in void calls permutation3", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "DO IT NOW printboolean @NO PROBLEMO\n" +
        "DO IT NOW printboolean @I LIED\n" +
        "YOU HAVE BEEN TERMINATED\n" +
        "LISTEN TO ME VERY CAREFULLY printboolean\n" +
        "I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE value\n" +
        "BECAUSE I'M GOING TO SAY PLEASE value\n" +
        "TALK TO THE HAND \"true\"\n" +
        "BULLSHIT\n" +
        "TALK TO THE HAND \"false\"\n" +
        "YOU HAVE NO RESPECT FOR LOGIC\n" +
        "I'LL BE BACK\n" +
        "I'LL BE BACK\n" +
        "HASTA LA VISTA, BABY\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 2);
    assert.strictEqual(output[0], "true");
    assert.strictEqual(output[1], "false");
});
QUnit.test("evalute multiple return statemenents in void calls with unreachable code", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "DO IT NOW method\n" +
        "YOU HAVE BEEN TERMINATED\n" +
        "LISTEN TO ME VERY CAREFULLY method\n" +
        "TALK TO THE HAND \"reached codeblock\"\n" +
        "I'LL BE BACK\n" +
        "TALK TO THE HAND \"unreached codeblock\"\n" +
        "HASTA LA VISTA, BABY\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], "reached codeblock");
});
QUnit.test("evalute void method calls returning from branched statements", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "DO IT NOW reverse @NO PROBLEMO\n" +
        "YOU HAVE BEEN TERMINATED\n" +
        "LISTEN TO ME VERY CAREFULLY reverse\n" +
        "I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE value\n" +
        "BECAUSE I'M GOING TO SAY PLEASE value\n" +
        "TALK TO THE HAND \"evaluated\"\n" +
        "I'LL BE BACK\n" +
        "YOU HAVE NO RESPECT FOR LOGIC\n" +
        "TALK TO THE HAND \"not evaluated\"\n" +
        "I'LL BE BACK\n" +
        "HASTA LA VISTA, BABY\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], "evaluated");
});
QUnit.test("evalute non void method calls returning from branched statements", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "DO IT NOW reverse @NO PROBLEMO\n" +
        "YOU HAVE BEEN TERMINATED\n" +
        "LISTEN TO ME VERY CAREFULLY reverse\n" +
        "I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE value\n" +
        "GIVE THESE PEOPLE AIR\n" +
        "BECAUSE I'M GOING TO SAY PLEASE value\n" +
        "TALK TO THE HAND \"evaluated\"\n" +
        "I'LL BE BACK 0\n" +
        "TALK TO THE HAND \"evaluated\"\n" +
        "YOU HAVE NO RESPECT FOR LOGIC\n" +
        "TALK TO THE HAND \"not evaluated\"\n" +
        "I'LL BE BACK 0\n" +
        "HASTA LA VISTA, BABY\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], "evaluated");
});
QUnit.test("evalute assignments to variables from method calls", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE result\n" +
        "YOU SET US UP 0\n" +
        "GET YOUR ASS TO MARS result\n" +
        "DO IT NOW square 7\n" +
        "TALK TO THE HAND result\n" +
        "YOU HAVE BEEN TERMINATED\n" +
        "LISTEN TO ME VERY CAREFULLY square\n" +
        "I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE value\n" +
        "GIVE THESE PEOPLE AIR\n" +
        "GET TO THE CHOPPER value\n" +
        "HERE IS MY INVITATION value\n" +
        "YOU'RE FIRED value\n" +
        "ENOUGH TALK\n" +
        "I'LL BE BACK value\n" +
        "HASTA LA VISTA, BABY\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], 49);
});
QUnit.test("evaluate same variable defined in main method and another method", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE vartrue\n" +
        "YOU SET US UP @NO PROBLEMO\n" +
        "TALK TO THE HAND vartrue\n" +
        "DO IT NOW method\n" +
        "TALK TO THE HAND vartrue\n" +
        "YOU HAVE BEEN TERMINATED\n" +
        "LISTEN TO ME VERY CAREFULLY method\n" +
        "HEY CHRISTMAS TREE vartrue\n" +
        "YOU SET US UP @I LIED\n" +
        "TALK TO THE HAND vartrue\n" +
        "HASTA LA VISTA, BABY\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 3);
    assert.strictEqual(output[0], 1);
    assert.strictEqual(output[1], 0);
    assert.strictEqual(output[2], 1);
});
QUnit.test("evaluate same variable defined in two methods", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "DO IT NOW method\n" +
        "DO IT NOW method2\n" +
        "YOU HAVE BEEN TERMINATED\n" +
        "LISTEN TO ME VERY CAREFULLY method\n" +
        "HEY CHRISTMAS TREE vartrue\n" +
        "YOU SET US UP @NO PROBLEMO\n" +
        "TALK TO THE HAND vartrue\n" +
        "HASTA LA VISTA, BABY\n" +
        "LISTEN TO ME VERY CAREFULLY method2\n" +
        "HEY CHRISTMAS TREE vartrue\n" +
        "YOU SET US UP @I LIED\n" +
        "TALK TO THE HAND vartrue\n" +
        "HASTA LA VISTA, BABY\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 2);
    assert.strictEqual(output[0], 1);
    assert.strictEqual(output[1], 0);
});
QUnit.test("evaluate variable name is the same as method name", function (assert) {
    var code = "LISTEN TO ME VERY CAREFULLY method\n" +
        "HEY CHRISTMAS TREE method\n" +
        "YOU SET US UP 2\n" +
        "TALK TO THE HAND method\n" +
        "HASTA LA VISTA, BABY\n" +
        "IT'S SHOWTIME\n" +
        "DO IT NOW method\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], 2);
});
QUnit.test("evaluate variable name is the same as method name vol2", function (assert) {
    var code = "LISTEN TO ME VERY CAREFULLY method\n" +
        "HEY CHRISTMAS TREE method\n" +
        "YOU SET US UP 2\n" +
        "TALK TO THE HAND method\n" +
        "HASTA LA VISTA, BABY\n" +
        "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE method\n" +
        "YOU SET US UP 1\n" +
        "TALK TO THE HAND method\n" +
        "DO IT NOW method\n" +
        "TALK TO THE HAND method\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 3);
    assert.strictEqual(output[0], 1);
    assert.strictEqual(output[1], 2);
    assert.strictEqual(output[2], 1);
});
QUnit.test("evaluate variable name is the same as method name vol3", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE method\n" +
        "YOU SET US UP 1\n" +
        "TALK TO THE HAND method\n" +
        "DO IT NOW method\n" +
        "TALK TO THE HAND method\n" +
        "YOU HAVE BEEN TERMINATED\n" +
        "LISTEN TO ME VERY CAREFULLY method\n" +
        "HEY CHRISTMAS TREE method\n" +
        "YOU SET US UP 2\n" +
        "TALK TO THE HAND method\n" +
        "HASTA LA VISTA, BABY\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 3);
    assert.strictEqual(output[0], 1);
    assert.strictEqual(output[1], 2);
    assert.strictEqual(output[2], 1);
});
QUnit.test("evaluate when parameter name is the same as method name", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE method\n" +
        "YOU SET US UP 123\n" +
        "DO IT NOW method method\n" +
        "YOU HAVE BEEN TERMINATED\n" +
        "LISTEN TO ME VERY CAREFULLY method\n" +
        "I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE method\n" +
        "TALK TO THE HAND method\n" +
        "HASTA LA VISTA, BABY"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], 123);
});

QUnit.module("method errors");
QUnit.test("detect unclosed main method", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "LISTEN TO ME VERY CAREFULLY printHello\n" +
        "TALK TO THE HAND \"Hello\"\n"
    assert.throws(function () {
        testhelpers.transpileAndExecute(code);
    }, testhelpers.isSyntaxError);
});
QUnit.test("detect unclosed methods", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "YOU HAVE BEEN TERMINATED\n" +
        "LISTEN TO ME VERY CAREFULLY printHello\n" +
        "TALK TO THE HAND \"Hello\"\n"
    assert.throws(function () {
        testhelpers.transpileAndExecute(code);
    }, testhelpers.isSyntaxError);
});
QUnit.test("detect missing main method", function (assert) {
    var code = "LISTEN TO ME VERY CAREFULLY mymethod\n" +
        "HASTA LA VISTA, BABY\n"
    assert.throws(function () {
        testhelpers.transpileAndExecute(code);
    }, testhelpers.isTranspileError);
});
QUnit.test("detect duplicate main method", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "YOU HAVE BEEN TERMINATED\n" +
        "IT'S SHOWTIME\n" +
        "YOU HAVE BEEN TERMINATED\n"
    assert.throws(function () {
        testhelpers.transpileAndExecute(code);
    }, testhelpers.isTranspileError);
});
QUnit.test("detect duplicate method", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "YOU HAVE BEEN TERMINATED\n" +
        "LISTEN TO ME VERY CAREFULLY printHello\n" +
        "TALK TO THE HAND \"Hello\"\n" +
        "HASTA LA VISTA, BABY\n" +
        "LISTEN TO ME VERY CAREFULLY printHello\n" +
        "TALK TO THE HAND \"Hello\"\n" +
        "HASTA LA VISTA, BABY\n"
    assert.throws(function () {
        testhelpers.transpileAndExecute(code);
    }, testhelpers.isTranspileError);
});
QUnit.test("detect method nested in main method", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "LISTEN TO ME VERY CAREFULLY printHello\n" +
        "TALK TO THE HAND \"Hello\"\n" +
        "HASTA LA VISTA, BABY\n" +
        "YOU HAVE BEEN TERMINATED\n"
    assert.throws(function () {
        testhelpers.transpileAndExecute(code);
    }, testhelpers.isSyntaxError);
});
QUnit.test("detect method nested in method", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "YOU HAVE BEEN TERMINATED\n" +
        "LISTEN TO ME VERY CAREFULLY printHello\n" +
        "LISTEN TO ME VERY CAREFULLY printWorld\n" +
        "TALK TO THE HAND \"World\"\n" +
        "HASTA LA VISTA, BABY\n" +
        "TALK TO THE HAND \"Hello\"\n" +
        "HASTA LA VISTA, BABY\n"
    assert.throws(function () {
        testhelpers.transpileAndExecute(code);
    }, testhelpers.isSyntaxError);
});
QUnit.test("detect calls to methods that are not declared", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "DO IT NOW noSuchMethod\n" +
        "YOU HAVE BEEN TERMINATED\n"
    assert.throws(function () {
        testhelpers.transpileAndExecute(code);
    }, testhelpers.isReferenceError);
});
QUnit.test("detect if void method tries to return a parameter", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "DO IT NOW method\n" +
        "YOU HAVE BEEN TERMINATED\n" +
        "LISTEN TO ME VERY CAREFULLY method\n" +
        "I'LL BE BACK 0\n" +
        "HASTA LA VISTA, BABY\n"

    assert.throws(function () {
        testhelpers.transpileAndExecute(code);
    }, testhelpers.isTranspileError);
});
QUnit.test("detect if a non-void method tries to return a without a parameter", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "DO IT NOW method 0\n" +
        "YOU HAVE BEEN TERMINATED\n" +
        "LISTEN TO ME VERY CAREFULLY method\n" +
        "I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE value\n" +
        "GIVE THESE PEOPLE AIR\n" +
        "I'LL BE BACK\n" +
        "HASTA LA VISTA, BABY\n"
    assert.throws(function () {
        testhelpers.transpileAndExecute(code);
    }, testhelpers.isTranspileError);
});
QUnit.test("detect a void return statement in main method", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "I'LL BE BACK\n" +
        "TALK TO THE HAND \"Hi\"\n" +
        "YOU HAVE BEEN TERMINATED\n"
    assert.throws(function () {
        testhelpers.transpileAndExecute(code);
    }, testhelpers.isSyntaxError);
});
QUnit.test("detect a nonvoid return statement in main method", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "I'LL BE BACK 0\n" +
        "YOU HAVE BEEN TERMINATED\n"

    assert.throws(function () {
        testhelpers.transpileAndExecute(code);
    }, testhelpers.isSyntaxError);
});
QUnit.test("detect when using variable declared in a method from main", function (assert) {
    var code = "LISTEN TO ME VERY CAREFULLY method\n" +
        "HEY CHRISTMAS TREE varfalse\n" +
        "YOU SET US UP @I LIED\n" +
        "TALK TO THE HAND varfalse\n" +
        "HASTA LA VISTA, BABY\n" +
        "IT'S SHOWTIME\n" +
        "TALK TO THE HAND varfalse\n" +
        "YOU HAVE BEEN TERMINATED\n"
    assert.throws(function () {
        testhelpers.transpileAndExecute(code);
    }, testhelpers.isTranspileError);
});
QUnit.test("detect when using variable declared in a method from another", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "YOU HAVE BEEN TERMINATED\n" +
        "LISTEN TO ME VERY CAREFULLY method\n" +
        "HEY CHRISTMAS TREE varfalse\n" +
        "YOU SET US UP @I LIED\n" +
        "TALK TO THE HAND varfalse\n" +
        "HASTA LA VISTA, BABY\n" +
        "LISTEN TO ME VERY CAREFULLY method2\n" +
        "TALK TO THE HAND varfalse\n" +
        "HASTA LA VISTA, BABY\n"
    assert.throws(function () {
        testhelpers.transpileAndExecute(code);
    }, testhelpers.isTranspileError);
});
QUnit.test("detect when variable name is the same as a method parameter name", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE argument\n" +
        "YOU SET US UP 123\n" +
        "DO IT NOW printInteger argument\n" +
        "YOU HAVE BEEN TERMINATED\n" +
        "LISTEN TO ME VERY CAREFULLY printInteger\n" +
        "I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE value\n" +
        "HEY CHRISTMAS TREE value\n" +
        "YOU SET US UP 321\n" +
        "TALK TO THE HAND value\n" +
        "HASTA LA VISTA, BABY"
    assert.throws(function () {
        testhelpers.transpileAndExecute(code);
    }, testhelpers.isTranspileError);
});