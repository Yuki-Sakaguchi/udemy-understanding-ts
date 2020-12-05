# 【世界で 7 万人が受講】Understanding TypeScript - 2020 年最新版

https://www.udemy.com/course/understanding-typescript-jp/

## ブラウザの監視用のライブラリ

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
