# 【世界で 7 万人が受講】Understanding TypeScript - 2020 年最新版

https://www.udemy.com/course/understanding-typescript-jp/

## デコレーターファクトリーブラウザの監視用のライブラリ

```
npm i -D lite-server
```

package.json の scripts に追加

```
"start": "lite-server"
```

```
npm start
```

# 型

- プリミティブ型は大文字ではなく小文字

## 型推論

TS は型推論してくれるので型を指定しなくてもいい場所がある。  
変数を初期化した値で型を推論するので、型指定は不要。  
let で初期化せずに宣言しても、その後に追加した値で型が推論される。

基本的には全て型推論を利用する。  
型推論されないところなどで型を指定するイメージ

## Tuple 型

TS にしかない型。
長さが固定されている Array。

## Enum 型

TS にしかない型。  
列挙型。数値とかを文字列で表現する時に使う。  
定数とかで使うイメージ

```
enum Role {
  ADMIN,
  READ_ONLY,
  AUTHOR
}
```

自動で 0 から数値が割り当てられる。

```
enum Role {
  ADMIN = 5,
  READ_ONLY,
  AUTHOR
}
```

最初のやつに値をいれればその値からインクリメントされる  
5, 6, 7...となる

```
enum Role {
  ADMIN = 5,
  READ_ONLY = 10,
  AUTHOR = 20
}
```

全ての値に数値を設定することもできる

## エイリアス型

`type Combinable = number | string`みたいに型に名前をつける

# 設定など

## TS のコンパイルコマンド

監視

```
tsc app.ts --watch or -w
```

設定（一つの TS プロジェクトだということを認識させる tsconfig.json を作る）

```
tsc --init
```

tsconfig.json があるところがルート扱いになるので、この状態で以下のコマンドを叩けば配下の ts をすべてコンパイル対象になる

```
tsc -w
```

# tsconfig.json

## compilerOptions

コンパイルの設定

### target

コンパイル後の型式を指定することができる  
基本`es5`でいい。  
決して IE 対応ではないので注意

### lib

TS はブラウザ前提とかではないので`document`とかがないので本当はエラーになりそうだけど、`lib: ['DOM']`が設定されているのと同状状況になるのでエラーが出ない
`target`で指定されているバージョンで使えるライブラリは全部使えるようになっている。

### allowJs

true だと JS もコンパイル対象になる

### checkJs

true だと js でもエラーチェックがされるようになる
(基本使わない)

### declaration, declarationMap

npm とかでライブラリを共有するなら使う（型定義の説明）

### sourceMap

true にするとマップファイルが生成される

### outDir

書き出し先のディレクトリ

### rootDir

コンパイルされる対象のディレクトリ

### removeComments

true だとコメントが削除される

### noEmit

コンパイルされなくなる。  
TS のソースをチェックする時だけ使えるかも

### noEmitOnError

ts でエラーが起きた js ファイルを書き出さないようにする

### strict

```
/* Strict Type-Checking Options */
```

の下から型チェックのオプション  
strict が true だとそれから下の７つが true ということ。

#### noImplicitAny

関数の引数などの暗黙の any を許さない

#### strictNullChecks

null かもしれないオブジェクトを許さない

```
const button = document.querySelector('button')
button.addEventListener('click', () => {})
```

みたいにな時に`button`が null かもしれないのでエラーになる  
addEventListener の前で if でチェックするか、一番後ろに`!`を使う

```
const button = document.querySelector('button')!
```

#### strictBindCallApply

bind, call, apply などを使う時に引数が一致しているかチェックする

#### noUnusedLocals

使われていない変数があればエラーになる（グローバル変数はエラーにならない）

#### noUnusedParameters

使っていない関数の引数がエラーになる

#### noImplicitReturns

関数でリターンがされない時にエラーになる（if 文とかでエラーにならない場合など）

## exclude

コンパイル対象外で new できなくなるのファイルを指定できる

ワイルドカードなども使える（node_modules も設定しておく必要があるがデフォルトじ除外されているので特に指定は不要）

## include

コンパイル対象のファイルだけ指定できる。  
これを書いたら、ここに書いたファイル以外除外される

# クラス

## メソッドの引数に this を入れる

js でのコンパイルでは無視されるけど、this を入れて型をクラス名にしておけばメソッドを呼び出すオブジェクトの型を絞ることができる

## コンストラクタに private, public を指定すればフィールドが無視できる

２度書く必要が出て面倒なので、フィールドを消して、コンストラクタの引数で`private`, `public`を指定すればいい  
初期化しない値だけフィールドで書く。

ちなみに、フィールドで書いた時もデフォルトの値を指定することは可能

## readonly で読み取り専用のプロパティにできる

これも js にはないので typescript 上だけ。

## protected でサブクラスからはアクセスできるようになる

private よりもちょっと緩い。

## Getter

値を取得するメソッドのこと。  
private なプロパティを外から参照だけするために使ったりする  
また、何かロジックを追加したりもできる

```
get メソッド名
```

## Setter

```
set メソッド名
```

## 静的メソッド、プロパティ

Math.Pi, Math.pow()などみたいなもの
`static メソッド名`

this からのアクセスはできない

## 抽象クラス

```
abstract class クラス名
```

にして、メソッドの頭にも

```
abstract メソッド名(this: Department): void;
```

みたいにする。　　
抽象クラスは継承される前提のクラスなので できない

## シングルトン

コンストラクタを private にすると外で new できなくなる

```
private static instance: AccountingDepartment;

static getInstance() {
  if (this.instance) {
    return this.instance;
  }
  this.instance = new AccountingDepartment('d2', []);
  return this.instance;
}
```

こんな感じで使う

```
const accountingDepartment = AccountingDepartment.getInstance();
```

# インターフェース

クラスとは違う。  
型を定義するもの

```
interface Person {
  name: string;
}
```

似たようなことは type でもできる  
interface はオブジェクトだけ、type はいろいろな型が定義できる

- interface だとオブジェクトだということがわかりやすい。
- クラスで implements することができる

```
interface Greetable {
  name: string;
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
```

こんな感じで振る舞いを決めて、それをクラスで実装して使うのがいい。  
これだと振る舞いベースでのチェックなどもできる  
人も、動物も細かな実装は違うけど、Greetable なオブジェクトという扱いができる。

抽象クラスとも似ているが interface には実装がないのが違う。

## readonly は使える

public, private は使えない  
type でも同じことができる

interface で readonly にしておけば、初期化の時意外ではへんこうできなくなる

## 継承

intareface は継承ができる  
interface は複数の interface を継承できる（クラスはできない）

```
interface Named {
  name: string;
}

interface bbb {
  //
}

interface Greetable extends Named, bbb {
  greet(phrase: string): void;
}
```

## 関数のインターフェース

```
interface AddFn {
  (a: number): number;
}

let add: AddFn;
add = (n: number) => {
  return n;
}
```

## 任意のプロパティ

プロパティ名の後ろに`?`をつけるとあってもなくてもいいプロパティになる  
クラスのプロパティや関数の変数にもつけることができる

```
interface Named {
  name: string;
  enName?: string;
}
```

# 高度な型

## 交差型

型同士を`&`で結合してどちらも持っている型を定義することができる。

## 型ガード（type ガード）

ユニオン型とかの場合、上の方で typeof などで型を調べて条件を分ければ、その下では型が正確に推論さえ

## 型キャスト

```
const userInputElement = <HTMLInputElement>document.getElementById('user-input')!;
userInputElement.value = 'テキスト';
```

or

```
const userInputElement = document.getElementById('user-input')! as HTMLInputElement;
userInputElement.value = 'テキスト';

or

const userInputElement = document.getElementById('user-input');
(userInputElement as HTMLInputElement).value = 'テキスト';

```

React などは JSX で<>が使えないことがあるので後者が良い  
書き方が違うだけで同じこと

## インデックス型

オブジェクトのプロパティが決まってええいない場合に使う  
`[prop: string]`でキー名がストリングであり、どんなキー名で数がどれだけあるかを指定することができる。

```
interface ErrorContainer {
  [prop: string]: string;
}

const errorBag: ErroContainer {
  email: '正しいメールアドレスではありません',
  userName: 'ユーザー名は記号を含めることはできません',
}
```

## 関数オーバーロード

ユニオン型を引数に持つ関数の戻り値はユニオン型になってしまうので、その先の処理で影響がでる

```
function add(a: number | string, b: number | string) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}

const result = add('hello', 'typescript');
result.split(' '); // エラーになる（文字列だと判断できないので）
```

関数の上に引数が渡された時のパターンを用意しておくとこれが解決できる。  
コンパイル後は削除される。

```
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: number | string, b: number | string) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}

const result = add('hello', 'typescript');
result.split(' ');
```

## オプショナルチェイン

DB や json からデータを取得した際にネストされたオブジェクトの存在か確認できないことがある。  
そういう時には`?`をつけると良い  
存在しない時にアクセスしなくなる

```
const data = {
  id: 'aaa',
  name: 'user',
  job: {
    title: 'aaa',
  }
}

console.log(data?.job?.title)
```

## null 合体演算子

変数が null だった場合の処理

null か undefined の場合に実行する
`||`の場合は falsy なものでも実行されてしまうので、`0`や`空`はそのまま許可したい場合にはこっちを使う

```
const userInput = '';
const storedData = userInput ?? 'DEFAULT';
```

# ジェネリック型（汎用型）

Array, Promise などもジェネリクス型。  
追加の型情報をわたすもの

## 独自のジェネリック型

関数の引数の型を汎用的に使う時にこうやって書く  
T から始まるのが慣例で続けて T,U,V,W...と続ける

```
function merge<T, U>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const mObj = merge({ name: 'Max' }, { age: 15 })
mObj.name; // これが推論できるようになる
```

## 制約

`extends`をつけると制約ができる  
以下の場合は中身は何でもいいけどオブジェクトであることだけは制約がある

```
function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const mObj = merge({ name: 'Max' }, { age: 15 })
mObj.name; // これが推論できるようになる
```

こんな感じにするとどんな方でもいいけど length があるオブジェクトであることだけの制約をつけています

```
interface Lengty {
  length: number;
}

function countAndDescribe<T extends Lengty>(element: T): [T, string] {
  let descriptionText = 'not value';
  if (element.length > 0) {
    descriptionText = element.length.toString();
  }
  return [element, descriptionText];
}

console.log(countAndDescribe('aaaaa'))
```

### keyof でオブジェクトの中にキーがあるかどうかを制約で追加する

```
function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
  return obj[key];
}

extractAndConvert({ name: 'taro' }, 'name');
```

## ジェネリッククラス

```
class Data<T extends string | number | boolean> {
  private data: T[] = []

  addItem (item: T) {
    this.data.push(item)
  }

  removeItem (item: T) {
    this.data.splice(this.data.indexOf(item), 1)
  }

  getItems() {
    return [...this.data]
  }
}

const textStorage = new Data<string>();
textStorage.addItem('test')
// textStorage.addItem(1111) //error

const numberStorage = new Data<number>();
numberStorage.addItem(123);
// numberStorage.addItem('text') //error
```

## 組み込みのユーティリティ型

他にもあるけど例えば以下の２つ

### Partial

オブジェクトをオプショナルにする　　
最後にキャストして返す

```
let obj: Partial<AAAA> = {}

...

return obj as AAAA;
```

### readondy

変更ができなくする

```
const names: Readonly<string[]> = [1, 2, 3];
names.push(4); // error
```

# デコレータ

メタプログラミングに役立つもの  
開発者向けのツールとかで役に立つかも

設定は以下にする

```
"target": "es2015",
"experimentalDecorators": true,
```

## クラスのデコレータ

クラスが定義されたタイミング実行される
インスタンスかの時ではない

```
function Logger(target: Function) {
  console.log('ログ出力中')
  console.log(target)
}

@Logger
class Person1 {
  name = "max"

  constructor() {
    console.log('aaaa')
  }
}

const pers = new Person1();
console.log(pers)
```

## デコレーターファクトリー

関数を返す関数をデコレータにする

```
function Logger(logString: string) {
  return function(constructor: Function) {
    console.log(constructor)
  }
}

@Logger('ログ出力中')
class Person1 {
  name = "max"

  constructor() {
    console.log('aaaa')
  }
}

const pers = new Person1();
console.log(pers)
```

## 便利なデコレーター

```
function WithTemplate(template: string, hookId: string) {
  return function(_: Function) {
    const hookEl = document.getElementById(hookId);
    if (hookEl) {
      hookEl.innerHTML = template;
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
```

こんなこともできる。  
Angular とかでよく使ってるらしい

```
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
```

## 高度なデコレーター

### プロパティのデコレータ

これもインスタンス化ではなくクラス定義時じ実行される

```
function Log(target: any, propertyName: string | Symbol) {
  console.log(target, propertyName);
}

class Product {
  @Log
  title: string;
  private _price: number;

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

  getPriceTax(tax: number) {
    return this._price * (1 + tax)
  }
}
```

クラス、プロパティ、アクセサー、メソッド、引数（パラメータ）につけることができる

# その他

- 使っていない変数名は`_`にすると無視してくれる
- class の private メソッドは public の下に来るようにする（多分プロパティとかもそう）

# namespace

```
namespace App {
  export Draggable ...
}
```

## トリプススラッシュ・ディレクティブ

TS 独自の公文  
path に設定したファイルに依存していることを明示して、コンパイル時に一緒に含めるようになる

```
/// <reference path="drag-drop-interfaces.ts" />

App.Draggable
```

で使える。  
同じ namespace はいくつも定義できるので、それぞれのファイルで同じネームスペースで囲めばいちいちオブジェクトのプロパティとして参照しなくてもいい

```
namespace App {
  export A;
}
```

```
/// <reference path="drag-drop-interfaces.ts" />

namespace App {
  class B extends A {
    ...
  }
}
```

みたいな感じ

## tsconfig.js

この二つの設定をすると referrence も一緒にバンドルしてコンパイルされる

```
"module": "amd"
"outFile": "./dist/bundle.js"
```

## 問題点

人力で依存関係を全てのファイルに書かないといけない（下層でも使っているものを全部書く）　　
コンパイルエラーも出ず、実行してみないと分からず、この管理が大変なので ESModules をつかる（モダンブラウザのみ）

# ES Modules

ブラウザで使えるモジュール  
ブラウザで実行するので拡張子は`.js`

namespace よりはこっちがいい

```
import { Draggable, DragTarget } from '../models/drag-drop.js';
```

```
"module": "es2015",
// "outFile": "./dist/bundle.js"
```

## 処理の実行タイミング

複数回 import されたとしてもはじめに import された１回目だけ実行される  
他のところで import された時は実行後のものが返される

## まとめ

推奨は ESModule（新しいバージョンしか動かない）  
TS のトリプススラッシュ・ディレクティブと namespace は壊れやすいのであまりよくない（古いのでも動く）

# Webpack(バージョン 4)

```
npm i -D webpack webpack-cli webpack-dev-server typescript ts-loader
```

- webpack
  - webpack 本体
- webpack-cli
  - webpack コマンドをプロジェクトを実行するためのもの
- webpack-dev-server
  - localhost を立ち上げる
- typescript
  - プロジェクト単位に ts をインストールしておく
- ts-loader
  - webpack で typescript をコンパイルするためのパッケージ

## tsconfig.json

```
"target": "es5"
"module": "es2015",
// "rootDir": "src", // webpack側で設定するので
```

## webpack.config.js

node.js で設定を書くことができる

### entry

起点となるファイル名

### output

#### filename

出力名  
`filename: 'bundle.[contenthash].js',`こんな感じで動的にも扱える（contenthash は毎回ランダムの値を入れてくれる webpack の機能)

#### path

tsconfig.json の`outDir`と揃えておく  
絶対パスを入れるので`path`を使って`path: path.resolve(__dirname, 'dist')`みたいな感じ

### module

webpack が見つけたファイルに何をするかを決められる

#### rules

どの拡張子にどのルールを適応するかを決める  
entry ファイルから走査して、import されているファイルなどをみていく時に、何にどの処理を実行するかを決める

```
{
  test: /\.ts$/, // 拡張子.tsのファイルに...
  use: 'ts-loader', // ts-loaderの処理を実行
  exclude: /node_modules/ // node_modules配下は除外
}
```

#### resolve

import されたファイルをどうやって解決するか  
import されたファイルはデフォルトでは.js になるので、.ts も探してもらえるように設定

```
resolve: {
  extentions: ['.ts', '.js'],
}
```

### sourcemap

tsconfig の

```
"sourceMap": true,
```

webpack.config.js の

```
devtool: 'inline-source-map',
```

## webpack-dev-server

```
"start": "webpack-dev-server",
```

コンパイル後のファイルはメモリ上に保持するのでコンパイルされたファイルは書き出されない

```
output: {
  publicPath: 'dist' // webpack-dev-serverをする際に読み込むファイルを設定できる
}
```

## 本番用の設定を分ける

`webpack.config.prod.js`という名前のファイルを別に用意する  
これは webpack が判定できるものではないので、名前はなんでも良い

### plugins

ワークフロー全体に適応される追加の処理  
module, rules はファイル単位

```
npm i -D clearn-webpack-plugin
```

```
const CleanPlugin = require('clean-webpack-plugin')

...

plugins: [
  new CleanPlugin.CleanWebpackPlugin(),
]
```

### 実行

`--config`で本番用のファイルを渡す

```
"scripts": {
  "start": "webpack-dev-server",
  "build": "webpack --config webpack.config.prod.js"
},
```
