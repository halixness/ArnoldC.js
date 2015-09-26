/// <reference path="typings/qunit.d.ts" />
/// <reference path="testhelpers.ts" />
/// <reference path="../main/transpiler.ts" />
"use strict";

QUnit.module("arithmetic");
QUnit.test("function when a variable is declared", function (assert) {
    var code ="IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE var\n" +
        "YOU SET US UP 123\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 0);
});
QUnit.test("function when a variable is declared with keyword name", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE while\n" +
        "YOU SET US UP 123\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 0);
});
QUnit.test("function when a variable is declared with keyword name vol2", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE CHILL\n" +
        "YOU SET US UP 123\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 0);
});
QUnit.test("function when an integer is printed", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "TALK TO THE HAND 123\n" +
        "YOU HAVE BEEN TERMINATED\n";

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], 123);
});
QUnit.test("evaluate when a negative integer is printed", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "TALK TO THE HAND -111\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], -111);
});
QUnit.test("evaluate when a 'boolean' is printed", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE varfalse\n" +
        "YOU SET US UP @I LIED\n" +
        "TALK TO THE HAND varfalse\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], 0);
});
QUnit.test("evaluate when a string is printed", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "TALK TO THE HAND \"this should be printed\"\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], 'this should be printed');
});
QUnit.test("evaluate when a more exotic string is printed", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "TALK TO THE HAND \"!!! ??? äöäöäöä@#0123=+-,.\"\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], '!!! ??? äöäöäöä@#0123=+-,.');
});
QUnit.test("evaluate when a string with newlines is printed", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "TALK TO THE HAND \"line1\nline2\nline3\n\n\"\n" +
        "YOU HAVE BEEN TERMINATED\n"
    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], "line1\nline2\nline3\n\n");
});
QUnit.test("evaluate when a string with newlines and carriage returns is printed", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "TALK TO THE HAND \"line1\rline2\r\nline3\n\n\"\n" +
        "YOU HAVE BEEN TERMINATED\n"
    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], "line1\rline2\r\nline3\n\n");
});
QUnit.test("evaluate when an integer is declared and printed", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE A\n" +
        "YOU SET US UP 999\n" +
        "HEY CHRISTMAS TREE B\n" +
        "YOU SET US UP 555\n" +
        "TALK TO THE HAND A\n" +
        "TALK TO THE HAND B\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 2);
    assert.strictEqual(output[0], 999);
    assert.strictEqual(output[1], 555);
});
QUnit.test("evaluate when a negative integer is declared and printed", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE a\n" +
        "YOU SET US UP -999\n" +
        "HEY CHRISTMAS TREE b\n" +
        "YOU SET US UP -555\n" +
        "TALK TO THE HAND a\n" +
        "TALK TO THE HAND b\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 2);
    assert.strictEqual(output[0], -999);
    assert.strictEqual(output[1], -555);
});
QUnit.test("evaluate when assigning a variable", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE var\n" +
        "YOU SET US UP 22\n" +
        "GET TO THE CHOPPER var\n" +
        "HERE IS MY INVITATION 123\n" +
        "ENOUGH TALK\n" +
        "TALK TO THE HAND var\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], 123);
});
QUnit.test("evaluate when assigning multiple variables", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE var\n" +
        "YOU SET US UP 22\n" +
        "HEY CHRISTMAS TREE var2\n" +
        "YOU SET US UP 27\n" +
        "GET TO THE CHOPPER var\n" +
        "HERE IS MY INVITATION 123\n" +
        "ENOUGH TALK\n" +
        "GET TO THE CHOPPER var2\n" +
        "HERE IS MY INVITATION 707\n" +
        "ENOUGH TALK\n" +
        "GET TO THE CHOPPER var\n" +
        "HERE IS MY INVITATION var2\n" +
        "GET UP var\n" +
        "ENOUGH TALK\n" +
        "TALK TO THE HAND var\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], 830);
});
QUnit.test("evaluate when an integer is incremented and printed", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE VAR\n" +
        "YOU SET US UP 22\n" +
        "GET TO THE CHOPPER VAR\n" +
        "HERE IS MY INVITATION VAR\n" +
        "GET UP 44\n" +
        "ENOUGH TALK\n" +
        "TALK TO THE HAND VAR\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], 66);
});
QUnit.test("evaluate when an integer is decremented and printed", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE VAR\n" +
        "YOU SET US UP 22\n" +
        "GET TO THE CHOPPER VAR\n" +
        "HERE IS MY INVITATION VAR\n" +
        "GET DOWN 44\n" +
        "ENOUGH TALK\n" +
        "TALK TO THE HAND VAR\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], -22);
});
QUnit.test("evaluate when an integer is decremented with a negative value", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE VAR\n" +
        "YOU SET US UP 22\n" +
        "GET TO THE CHOPPER VAR\n" +
        "HERE IS MY INVITATION VAR\n" +
        "GET DOWN -44\n" +
        "ENOUGH TALK\n" +
        "TALK TO THE HAND VAR\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], 66);
});
QUnit.test("evaluate when an integer is incremented with a negative value", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE VAR\n" +
        "YOU SET US UP 22\n" +
        "GET TO THE CHOPPER VAR\n" +
        "HERE IS MY INVITATION VAR\n" +
        "GET UP -44\n" +
        "ENOUGH TALK\n" +
        "TALK TO THE HAND VAR\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], -22);
});
QUnit.test("evaluate when multiplying variables", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE VAR\n" +
        "YOU SET US UP 22\n" +
        "GET TO THE CHOPPER VAR\n" +
        "HERE IS MY INVITATION VAR\n" +
        "YOU'RE FIRED 13\n" +
        "ENOUGH TALK\n" +
        "TALK TO THE HAND VAR\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], 286);
});
QUnit.test("evaluate when multiplying variables with different signs", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE VAR\n" +
        "YOU SET US UP 22\n" +
        "GET TO THE CHOPPER VAR\n" +
        "HERE IS MY INVITATION VAR\n" +
        "YOU'RE FIRED -13\n" +
        "ENOUGH TALK\n" +
        "TALK TO THE HAND VAR\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], -286);
});
QUnit.test("evaluate when multiplying variables with zero", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE VAR\n" +
        "YOU SET US UP 22\n" +
        "GET TO THE CHOPPER VAR\n" +
        "HERE IS MY INVITATION VAR\n" +
        "YOU'RE FIRED 0\n" +
        "ENOUGH TALK\n" +
        "TALK TO THE HAND VAR\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], 0);
});
QUnit.test("evaluate when multiplying assigned variables", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE VAR\n" +
        "YOU SET US UP 7\n" +
        "HEY CHRISTMAS TREE VAR2\n" +
        "YOU SET US UP 4\n" +
        "GET TO THE CHOPPER VAR\n" +
        "HERE IS MY INVITATION VAR\n" +
        "YOU'RE FIRED VAR2\n" +
        "ENOUGH TALK\n" +
        "TALK TO THE HAND VAR\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], 28);
});
QUnit.test("evaluate when dividing variables", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE VAR\n" +
        "YOU SET US UP 100\n" +
        "GET TO THE CHOPPER VAR\n" +
        "HERE IS MY INVITATION VAR\n" +
        "HE HAD TO SPLIT 4\n" +
        "ENOUGH TALK\n" +
        "TALK TO THE HAND VAR\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], 25);
});

QUnit.test("evaluate when dividing variables with different signs", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE VAR\n" +
        "YOU SET US UP 99\n" +
        "GET TO THE CHOPPER VAR\n" +
        "HERE IS MY INVITATION VAR\n" +
        "HE HAD TO SPLIT -33\n" +
        "ENOUGH TALK\n" +
        "TALK TO THE HAND VAR\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], -3);
});
QUnit.test("evaluate when dividing variables with one", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE VAR\n" +
        "YOU SET US UP 22\n" +
        "GET TO THE CHOPPER VAR\n" +
        "HERE IS MY INVITATION VAR\n" +
        "HE HAD TO SPLIT 1\n" +
        "ENOUGH TALK\n" +
        "TALK TO THE HAND VAR\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], 22);
});
QUnit.test("evaluate when dividing assigned variables", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE VAR\n" +
        "YOU SET US UP 9\n" +
        "HEY CHRISTMAS TREE VAR2\n" +
        "YOU SET US UP 4\n" +
        "GET TO THE CHOPPER VAR\n" +
        "HERE IS MY INVITATION VAR\n" +
        "HE HAD TO SPLIT VAR2\n" +
        "ENOUGH TALK\n" +
        "TALK TO THE HAND VAR\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], 2);
});
QUnit.test("evaluate when dividing to fraction and then multiplying back", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE var\n" +
        "YOU SET US UP 1\n" +
        "TALK TO THE HAND var\n" +
        "GET TO THE CHOPPER var\n" +
        "HERE IS MY INVITATION var\n" +
        "HE HAD TO SPLIT 2\n" +
        "YOU'RE FIRED 2\n" +
        "ENOUGH TALK\n" +
        "TALK TO THE HAND var\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 2);
    assert.strictEqual(output[0], 1);
    assert.strictEqual(output[1], 0);
});
QUnit.test("evaluate when calculating modulo variables vol1", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE var\n" +
        "YOU SET US UP 1\n" +
        "GET TO THE CHOPPER var\n" +
        "HERE IS MY INVITATION var\n" +
        "I LET HIM GO 2\n" +
        "ENOUGH TALK\n" +
        "TALK TO THE HAND var\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], 1);
});
QUnit.test("evaluate when calculating modulo variables vol2", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE var\n" +
        "YOU SET US UP 2\n" +
        "GET TO THE CHOPPER var\n" +
        "HERE IS MY INVITATION var\n" +
        "I LET HIM GO 2\n" +
        "ENOUGH TALK\n" +
        "TALK TO THE HAND var\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], 0);
});
QUnit.test("evaluate when calculating modulo variables with negative value", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE var\n" +
        "YOU SET US UP -3\n" +
        "GET TO THE CHOPPER var\n" +
        "HERE IS MY INVITATION var\n" +
        "I LET HIM GO 2\n" +
        "ENOUGH TALK\n" +
        "TALK TO THE HAND var\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], -1);
});
QUnit.test("evaluate using different arithmetic operations", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE VAR\n" +
        "YOU SET US UP 22\n" +
        "GET TO THE CHOPPER VAR\n" +
        "HERE IS MY INVITATION 11\n" +
        "GET DOWN 43\n" +
        "GET UP 54\n" +
        "GET UP 44\n" +
        "ENOUGH TALK\n" +
        "TALK TO THE HAND VAR\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], 66);
});
QUnit.test("evaluate using different arithmetic operations vol2", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE VAR\n" +
        "YOU SET US UP 22\n" +
        "GET TO THE CHOPPER VAR\n" +
        "HERE IS MY INVITATION 11\n" +
        "GET DOWN 55\n" +
        "GET UP 11\n" +
        "GET UP 22\n" +
        "GET UP 23\n" +
        "GET DOWN 0\n" +
        "GET UP 0\n" +
        "GET UP 1\n" +
        "ENOUGH TALK\n" +
        "TALK TO THE HAND VAR\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], 13);
});
QUnit.test("evaluate using different arithmetic operations vol3", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE VAR\n" +
        "YOU SET US UP 22\n" +
        "GET TO THE CHOPPER VAR\n" +
        "HERE IS MY INVITATION 11\n" +
        "GET DOWN 22\n" +
        "HE HAD TO SPLIT -11\n" +
        "YOU'RE FIRED 23\n" +
        "GET UP 23\n" +
        "GET DOWN 22\n" +
        "HE HAD TO SPLIT 2\n" +
        "ENOUGH TALK\n" +
        "TALK TO THE HAND VAR\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], 12);
});

QUnit.test("evaluate short max value on declaration", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE var\n" +
        "YOU SET US UP 32767\n" +
        "TALK TO THE HAND var\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], 32767);
});
QUnit.test("evaluate short min value on declaration", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE var\n" +
        "YOU SET US UP -32768\n" +
        "TALK TO THE HAND var\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], -32768);
});
QUnit.test("evaluate short overflow on declaration", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE var\n" +
        "YOU SET US UP 32768\n" +
        "TALK TO THE HAND var\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], -32768);
});
QUnit.test("evaluate unsigned short overflow on declaration", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE var\n" +
        "YOU SET US UP 65537\n" +
        "TALK TO THE HAND var\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], 1);
});
QUnit.test("evaluate short underflow on declaration", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE var\n" +
        "YOU SET US UP -32769\n" +
        "TALK TO THE HAND var\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], 32767);
});
QUnit.test("evaluate unsigned short underflow on declaration", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE var\n" +
        "YOU SET US UP -65538\n" +
        "TALK TO THE HAND var\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], -2);
});
QUnit.test("evaluate short overflow on addition", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE var\n" +
        "YOU SET US UP 32767\n" +
        "TALK TO THE HAND var\n" +
        "GET TO THE CHOPPER var\n" +
        "HERE IS MY INVITATION var\n" +
        "GET UP 1\n" +
        "ENOUGH TALK\n" +
        "TALK TO THE HAND var\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 2);
    assert.strictEqual(output[0], 32767);
    assert.strictEqual(output[1], 32768);
});
QUnit.test("evaluate short overflow on addition vol2", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE var\n" +
        "YOU SET US UP 32767\n" +
        "TALK TO THE HAND var\n" +
        "GET TO THE CHOPPER var\n" +
        "HERE IS MY INVITATION var\n" +
        "GET UP 32767\n" +
        "GET UP 32767\n" +
        "GET UP 32767\n" +
        "GET UP 32767\n" +
        "GET UP 32767\n" +
        "GET UP 32767\n" +
        "GET UP 32767\n" +
        "GET UP 32767\n" +
        "GET UP 32767\n" +
        "ENOUGH TALK\n" +
        "TALK TO THE HAND var\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 2);
    assert.strictEqual(output[0], 32767);
    assert.strictEqual(output[1], 327670);
});
QUnit.test("evaluate short overflow on multiplication", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE var\n" +
        "YOU SET US UP 32767\n" +
        "TALK TO THE HAND var\n" +
        "GET TO THE CHOPPER var\n" +
        "HERE IS MY INVITATION var\n" +
        "YOU'RE FIRED 32767\n" +
        "YOU'RE FIRED 32767\n" +
        "YOU'RE FIRED 32767\n" +
        "ENOUGH TALK\n" +
        "TALK TO THE HAND var\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 2);
    assert.strictEqual(output[0], 32767);
    assert.strictEqual(output[1], 2147352577);
});
QUnit.test("evaluate short overflow on multiplication vol2", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE var\n" +
        "YOU SET US UP 32767\n" +
        "TALK TO THE HAND var\n" +
        "GET TO THE CHOPPER var\n" +
        "HERE IS MY INVITATION var\n" +
        "YOU'RE FIRED 32767\n" +
        "YOU'RE FIRED 32767\n" +
        "YOU'RE FIRED 32767\n" +
        "YOU'RE FIRED 32767\n" +
        "ENOUGH TALK\n" +
        "TALK TO THE HAND var\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 2);
    assert.strictEqual(output[0], 32767);
    assert.strictEqual(output[1], -2147319809);
});
QUnit.test("evaluate short underflow on multiplication", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE var\n" +
        "YOU SET US UP -32768\n" +
        "TALK TO THE HAND var\n" +
        "GET TO THE CHOPPER var\n" +
        "HERE IS MY INVITATION var\n" +
        "YOU'RE FIRED 32767\n" +
        "YOU'RE FIRED 32767\n" +
        "YOU'RE FIRED 32767\n" +
        "ENOUGH TALK\n" +
        "TALK TO THE HAND var\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 2);
    assert.strictEqual(output[0], -32768);
    assert.strictEqual(output[1], 1073774592);
});
QUnit.test("evaluate short underflow on multiplication vol2", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE var\n" +
        "YOU SET US UP -32768\n" +
        "TALK TO THE HAND var\n" +
        "GET TO THE CHOPPER var\n" +
        "HERE IS MY INVITATION var\n" +
        "YOU'RE FIRED 32767\n" +
        "YOU'RE FIRED 32767\n" +
        "YOU'RE FIRED 32767\n" +
        "YOU'RE FIRED 32767\n" +
        "YOU'RE FIRED 32767\n" +
        "ENOUGH TALK\n" +
        "TALK TO THE HAND var\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code);
    assert.strictEqual(output.length, 2);
    assert.strictEqual(output[0], -32768);
    assert.strictEqual(output[1], -1073709056);
});

QUnit.module("arithmetic errors");
QUnit.test("detect when a string with quote escaped quotes is printed", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "TALK TO THE HAND \"he said \"\"Hello\"\"\"\n" +
        "YOU HAVE BEEN TERMINATED\n"

    assert.throws(function () {
        testhelpers.transpileAndExecute(code);
    }, testhelpers.isSyntaxError);
});
QUnit.test("detect when a string with backslash escaped quotes is printed", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "TALK TO THE HAND \"he said \\\"Hello\\\"\"\n" +
        "YOU HAVE BEEN TERMINATED\n"
    assert.throws(function () {
        testhelpers.transpileAndExecute(code);
    }, testhelpers.isSyntaxError);
});
QUnit.test("detect when a string with backslashes is printed", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "TALK TO THE HAND \"C:\\Temp\\readme.txt\"\n" +
        "YOU HAVE BEEN TERMINATED\n"

    assert.throws(function () {
        testhelpers.transpileAndExecute(code);
    }, testhelpers.isSyntaxError);
});
QUnit.test("detect when a string with backslash escaped backslashes is printed", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "TALK TO THE HAND \"C:\\\\Temp\\\\readme.txt\"\n" +
        "YOU HAVE BEEN TERMINATED\n"

    assert.throws(function () {
        testhelpers.transpileAndExecute(code);
    }, testhelpers.isSyntaxError);
});
QUnit.test("detect divide by zero", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE VAR\n" +
        "YOU SET US UP 22\n" +
        "HEY CHRISTMAS TREE VAR\n" +
        "YOU SET US UP 22\n" +
        "YOU HAVE BEEN TERMINATED\n"

    assert.throws(function () {
        testhelpers.transpileAndExecute(code);
    }, testhelpers.isTranspileError);
});
QUnit.test("detect duplicate variable declarations", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE VAR\n" +
        "YOU SET US UP 22\n" +
        "HEY CHRISTMAS TREE VAR\n" +
        "YOU SET US UP 22\n" +
        "YOU HAVE BEEN TERMINATED\n"

    assert.throws(function () {
        testhelpers.transpileAndExecute(code);
    }, testhelpers.isTranspileError);
});
QUnit.test("detect faulty variable names", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE 1VAR\n" +
        "YOU SET US UP 123\n" +
        "YOU HAVE BEEN TERMINATED\n"
    assert.throws(function () {
        testhelpers.transpileAndExecute(code);
    }, testhelpers.isSyntaxError);
});
QUnit.test("detect divide by zero", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE var\n" +
        "YOU SET US UP @I LIED\n" +
        "GET TO THE CHOPPER var\n" +
        "HERE IS MY INVITATION 1\n" +
        "HE HAD TO SPLIT 0\n" +
        "ENOUGH TALK\n" +
        "TALK TO THE HAND var\n" +
        "YOU HAVE BEEN TERMINATED\n"
    assert.throws(
        function () {
            testhelpers.transpileAndExecute(code);
        },
        function (e: Error) {
            return e.message === "HERE'S YOUR SUBZERO, NOW PLAIN ZERO";
        }
    );
});