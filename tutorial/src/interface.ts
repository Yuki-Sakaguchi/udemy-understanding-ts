// interface Person {
//   name: string;
//   age: number;

//   greet(phrase: string): void;
// }

// let user1: Person;
// user1 = {
//   name: 'Max',
//   age: 12,
//   greet(phrase: string) {
//     console.log(phrase)
//   },
// }


// 関数のインターフェース（typeとかでもできる）
// interface AddFn {
//   (a: number): number;
// }

// let add: AddFn;
// add = (n: number) => {
//   return n;
// }

// 振る舞い
interface Greetable {
  readonly name: string;
  greet(phase: string): void;
}

class Person implements Greetable {
  name: string;
  age: number = 30;
  constructor(n: string) {
    this.name = n;
  }
  greet(t: string) {
    console.log(t)
  }
}

let user: Greetable;
user = new Person('Max');
user.greet('aaa');