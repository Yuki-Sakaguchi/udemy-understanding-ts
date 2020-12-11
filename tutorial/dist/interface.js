"use strict";
var Person = (function () {
    function Person(n) {
        this.age = 30;
        this.name = n;
    }
    Person.prototype.greet = function (t) {
        console.log(t);
    };
    return Person;
}());
var user;
user = new Person('Max');
user.greet('aaa');
