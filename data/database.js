export class List extends Object {}
export class User extends Object {}

const ID = 'test';
var main_list = new List();
//main_list//id = ID; //リストごとユーザ


var users  = {};// store for client
var IDbyUsers = {
  [ID]: []
};//mainstore
var listById = {
  [ID]: main_list
};
var Names = ["吉田","佐々木","田中","佐藤","鈴木","内田","斎藤","朝倉","海野","山城","河野"]

var nowUserId = 0;
for(var i =0;i < 40;i++){
  var randomName =　Names[Math.floor((Math.random() * 10)) % Names.length];
  addUser(randomName);
};

export function addUser(name,age = 20) {
  var user = new User();
  user.id = `${nowUserId++}`;
  user.name = name;
  user.age = age;
  users[user.id] = user;
  IDbyUsers[ID].push(user.id);
  console.log("add")
  return user.id;
}

export function changeUserName(id, name) {
  var user = getUser(id);
  user.name = name;
}

export function getUser(id) {
  return users[id];
}

export function getUsers() {
  return IDbyUsers[ID].map((id) => users[id]);
}

export function getList(id) {
  return listById[ID];
}

export function getListMain() {
  return getList(ID);
}

export function removeUser(id) {
  var user_id = IDbyUsers[ID].indexOf(id);
  if (user_id !== -1) {
    IDbyUsers[ID].splice(user_id, 1);
  }
  delete users[id];
}
