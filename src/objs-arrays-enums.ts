
enum Role {
  ADMIN,
  READ_ONLY,
  AUTHOR
}

const person = {
  name: 'taro',
  age: 30,
  hobbies: ['Sports', 'Cooking'],
  role: Role.ADMIN
};

let favoriteActivities: string[];
favoriteActivities = ['string'];

console.log(person.name);

for (const hobby of person.hobbies) {
  console.log(hobby.toLocaleLowerCase())
}

if (person.role === Role.ADMIN) {
  console.log('管理者')
}