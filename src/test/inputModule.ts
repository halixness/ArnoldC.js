/// <reference path="typings/qunit.d.ts" />
/// <reference path="testhelpers.ts" />
/// <reference path="../main/transpiler.ts" />
"use strict";

QUnit.module("input");
QUnit.test("read integer from input", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "TALK TO THE HAND \"Input a number:\"\n" +
        "HEY CHRISTMAS TREE result\n" +
        "YOU SET US UP 0\n" +
        "GET YOUR ASS TO MARS result\n" +
        "DO IT NOW\n" +
        "I WANT TO ASK YOU A BUNCH OF QUESTIONS AND I WANT TO HAVE THEM ANSWERED IMMEDIATELY\n" +
        "TALK TO THE HAND result\n" +
        "TALK TO THE HAND \"Bye\"\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code, {
        prompt: function () {
            return "123";
        }
    });
    assert.strictEqual(output.length, 3);
    assert.strictEqual(output[0], "Input a number:");
    assert.strictEqual(output[1], 123);
    assert.strictEqual(output[2], "Bye");
});
QUnit.test("read max short from input", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE result\n" +
        "YOU SET US UP 0\n" +
        "GET YOUR ASS TO MARS result\n" +
        "DO IT NOW\n" +
        "I WANT TO ASK YOU A BUNCH OF QUESTIONS AND I WANT TO HAVE THEM ANSWERED IMMEDIATELY\n" +
        "TALK TO THE HAND result\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code, {
        prompt: function () {
            return "32767";
        }
    });
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], 32767);
});
QUnit.test("read max int from input", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE result\n" +
        "YOU SET US UP 0\n" +
        "GET YOUR ASS TO MARS result\n" +
        "DO IT NOW\n" +
        "I WANT TO ASK YOU A BUNCH OF QUESTIONS AND I WANT TO HAVE THEM ANSWERED IMMEDIATELY\n" +
        "TALK TO THE HAND result\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code, {
        prompt: function () {
            return "2147483647";
        }
    });
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], 2147483647);
});
QUnit.test("read min short from input", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE result\n" +
        "YOU SET US UP 0\n" +
        "GET YOUR ASS TO MARS result\n" +
        "DO IT NOW\n" +
        "I WANT TO ASK YOU A BUNCH OF QUESTIONS AND I WANT TO HAVE THEM ANSWERED IMMEDIATELY\n" +
        "TALK TO THE HAND result\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code, {
        prompt: function () {
            return "-32768";
        }
    });
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], -32768);
});
QUnit.test("read min int from input", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE result\n" +
        "YOU SET US UP 0\n" +
        "GET YOUR ASS TO MARS result\n" +
        "DO IT NOW\n" +
        "I WANT TO ASK YOU A BUNCH OF QUESTIONS AND I WANT TO HAVE THEM ANSWERED IMMEDIATELY\n" +
        "TALK TO THE HAND result\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code, {
        prompt: function () {
            return "-2147483648";
        }
    });
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], -2147483648);
});
QUnit.test("read leading zero from input", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE result\n" +
        "YOU SET US UP 0\n" +
        "GET YOUR ASS TO MARS result\n" +
        "DO IT NOW\n" +
        "I WANT TO ASK YOU A BUNCH OF QUESTIONS AND I WANT TO HAVE THEM ANSWERED IMMEDIATELY\n" +
        "TALK TO THE HAND result\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code, {
        prompt: function () {
            return "0200";
        }
    });
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], 200);
});
QUnit.test("read number with leading and trailing whitespace from input", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE result\n" +
        "YOU SET US UP 0\n" +
        "GET YOUR ASS TO MARS result\n" +
        "DO IT NOW\n" +
        "I WANT TO ASK YOU A BUNCH OF QUESTIONS AND I WANT TO HAVE THEM ANSWERED IMMEDIATELY\n" +
        "TALK TO THE HAND result\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code, {
        prompt: function () {
            return "2";
        }
    });
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], 2);
});
QUnit.test("read number, space, number from input", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE result\n" +
        "YOU SET US UP 0\n" +
        "GET YOUR ASS TO MARS result\n" +
        "DO IT NOW\n" +
        "I WANT TO ASK YOU A BUNCH OF QUESTIONS AND I WANT TO HAVE THEM ANSWERED IMMEDIATELY\n" +
        "TALK TO THE HAND result\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code, {
        prompt: function () {
            return "2 2";
        }
    });
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], 2);
});
QUnit.test("read number, space, alpha from input", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE result\n" +
        "YOU SET US UP 0\n" +
        "GET YOUR ASS TO MARS result\n" +
        "DO IT NOW\n" +
        "I WANT TO ASK YOU A BUNCH OF QUESTIONS AND I WANT TO HAVE THEM ANSWERED IMMEDIATELY\n" +
        "TALK TO THE HAND result\n" +
        "YOU HAVE BEEN TERMINATED\n"

    var output = testhelpers.transpileAndExecute(code, {
        prompt: function () {
            return "2 a";
        }
    });
    assert.strictEqual(output.length, 1);
    assert.strictEqual(output[0], 2);
});

QUnit.module("input errors");
QUnit.test("detect alpha from input", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE result\n" +
        "YOU SET US UP 0\n" +
        "GET YOUR ASS TO MARS result\n" +
        "DO IT NOW\n" +
        "I WANT TO ASK YOU A BUNCH OF QUESTIONS AND I WANT TO HAVE THEM ANSWERED IMMEDIATELY\n" +
        "TALK TO THE HAND result\n" +
        "YOU HAVE BEEN TERMINATED\n"

    assert.throws(function () {
        testhelpers.transpileAndExecute(code, {
            prompt: function () {
                return "a";
            }
        });
    }, testhelpers.isSyntaxError);
});
QUnit.test("detect alpha numeric from input", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE result\n" +
        "YOU SET US UP 0\n" +
        "GET YOUR ASS TO MARS result\n" +
        "DO IT NOW\n" +
        "I WANT TO ASK YOU A BUNCH OF QUESTIONS AND I WANT TO HAVE THEM ANSWERED IMMEDIATELY\n" +
        "TALK TO THE HAND result\n" +
        "YOU HAVE BEEN TERMINATED\n"

    assert.throws(function () {
        testhelpers.transpileAndExecute(code, {
            prompt: function () {
                return "1a";
            }
        });
    }, testhelpers.isSyntaxError);
});
QUnit.test("detect float from input", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE result\n" +
        "YOU SET US UP 0\n" +
        "GET YOUR ASS TO MARS result\n" +
        "DO IT NOW\n" +
        "I WANT TO ASK YOU A BUNCH OF QUESTIONS AND I WANT TO HAVE THEM ANSWERED IMMEDIATELY\n" +
        "TALK TO THE HAND result\n" +
        "YOU HAVE BEEN TERMINATED\n"

    assert.throws(function () {
        testhelpers.transpileAndExecute(code, {
            prompt: function () {
                return "1.0";
            }
        });
    }, testhelpers.isSyntaxError);
});
QUnit.test("detect hex from input", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE result\n" +
        "YOU SET US UP 0\n" +
        "GET YOUR ASS TO MARS result\n" +
        "DO IT NOW\n" +
        "I WANT TO ASK YOU A BUNCH OF QUESTIONS AND I WANT TO HAVE THEM ANSWERED IMMEDIATELY\n" +
        "TALK TO THE HAND result\n" +
        "YOU HAVE BEEN TERMINATED\n"

    assert.throws(function () {
        testhelpers.transpileAndExecute(code, {
            prompt: function () {
                return "0x2";
            }
        });
    }, testhelpers.isSyntaxError);
});
QUnit.test("detect scientific notation from input", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE result\n" +
        "YOU SET US UP 0\n" +
        "GET YOUR ASS TO MARS result\n" +
        "DO IT NOW\n" +
        "I WANT TO ASK YOU A BUNCH OF QUESTIONS AND I WANT TO HAVE THEM ANSWERED IMMEDIATELY\n" +
        "TALK TO THE HAND result\n" +
        "YOU HAVE BEEN TERMINATED\n"

    assert.throws(function () {
        testhelpers.transpileAndExecute(code, {
            prompt: function () {
                return "3.30e2";
            }
        });
    }, testhelpers.isSyntaxError);
});
QUnit.test("detect int overflow from input", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE result\n" +
        "YOU SET US UP 0\n" +
        "GET YOUR ASS TO MARS result\n" +
        "DO IT NOW\n" +
        "I WANT TO ASK YOU A BUNCH OF QUESTIONS AND I WANT TO HAVE THEM ANSWERED IMMEDIATELY\n" +
        "TALK TO THE HAND result\n" +
        "YOU HAVE BEEN TERMINATED\n"

    assert.throws(function () {
        testhelpers.transpileAndExecute(code, {
            prompt: function () {
                return "2147483648";
            }
        });
    }, testhelpers.isRangeError);
});
QUnit.test("detect int underflow from input", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE result\n" +
        "YOU SET US UP 0\n" +
        "GET YOUR ASS TO MARS result\n" +
        "DO IT NOW\n" +
        "I WANT TO ASK YOU A BUNCH OF QUESTIONS AND I WANT TO HAVE THEM ANSWERED IMMEDIATELY\n" +
        "TALK TO THE HAND result\n" +
        "YOU HAVE BEEN TERMINATED\n"

    assert.throws(function () {
        testhelpers.transpileAndExecute(code, {
            prompt: function () {
                return "-2147483649";
            }
        });
    }, testhelpers.isRangeError);
});
QUnit.test("detect only minus sign from input", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE result\n" +
        "YOU SET US UP 0\n" +
        "GET YOUR ASS TO MARS result\n" +
        "DO IT NOW\n" +
        "I WANT TO ASK YOU A BUNCH OF QUESTIONS AND I WANT TO HAVE THEM ANSWERED IMMEDIATELY\n" +
        "TALK TO THE HAND result\n" +
        "YOU HAVE BEEN TERMINATED\n"

    assert.throws(function () {
        testhelpers.transpileAndExecute(code, {
            prompt: function () {
                return "-";
            }
        });
    }, testhelpers.isSyntaxError);
});
QUnit.test("detect minus sign, space, number from input", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE result\n" +
        "YOU SET US UP 0\n" +
        "GET YOUR ASS TO MARS result\n" +
        "DO IT NOW\n" +
        "I WANT TO ASK YOU A BUNCH OF QUESTIONS AND I WANT TO HAVE THEM ANSWERED IMMEDIATELY\n" +
        "TALK TO THE HAND result\n" +
        "YOU HAVE BEEN TERMINATED\n"

    assert.throws(function () {
        testhelpers.transpileAndExecute(code, {
            prompt: function () {
                return "- 2";
            }
        });
    }, testhelpers.isSyntaxError);
});
QUnit.test("detect only plus sign from input", function (assert) {
    var code = "IT'S SHOWTIME\n" +
        "HEY CHRISTMAS TREE result\n" +
        "YOU SET US UP 0\n" +
        "GET YOUR ASS TO MARS result\n" +
        "DO IT NOW\n" +
        "I WANT TO ASK YOU A BUNCH OF QUESTIONS AND I WANT TO HAVE THEM ANSWERED IMMEDIATELY\n" +
        "TALK TO THE HAND result\n" +
        "YOU HAVE BEEN TERMINATED\n"

    assert.throws(function () {
        testhelpers.transpileAndExecute(code, {
            prompt: function () {
                return "+";
            }
        });
    }, testhelpers.isSyntaxError);
});