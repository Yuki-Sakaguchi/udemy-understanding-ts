function WithTemplate(template: string, hookId: string) {
  return function(constructor: any) {
    const hookEl = document.getElementById(hookId);
    const p = new constructor();
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector('h1')!.textContent = p;
    }
  }
}

@WithTemplate('<h1>aaa</h1>', 'app')
class Person1 {
  name = "max"

  constructor() {
    console.log('aaaa')
  }
}

const pers = new Person1();
console.log(pers)


// -----------

function Log(target: any, propertyName: string | Symbol) {
  console.log(target, propertyName);
}

function Log2(target: any, name: string, descriptor: PropertyDecorator) {
  console.log(target, name, descriptor)
}

function Log3(target: any, name: string | Symbol, descriptor: PropertyDecorator) {
  console.log(target, name, descriptor)
}

function Log4(target: any, name: string | Symbol, position: number) {
  console.log(target, name, position)
}


class Product {
  @Log
  title: string;
  private _price: number;

  @Log2
  set price(val: number) {
    if (val > 0) {
    this._price = val;
    } else {
      throw new Error('aaa');
    }
  }

  constructor(t: string, p: number) {
    this.title = t
    this._price = p
  }

  @Log3
  getPriceTax(@Log4 tax: number) {
    return this._price * (1 + tax)
  }
}











