import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  cursorForObjectInConnection,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
  toGlobalId,
} from 'graphql-relay';

import {
  User,
  List,
  addUser,
  changeUserName,
  getUser,
  getUsers,
  getList,
  getListMain,
  removeUser
} from './database';

var {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    var {type, id} = fromGlobalId(globalId);
    if (type === 'User') {
      return getUser(id);
    } else if (type === "List") {
      return getList();
    }else {
      return null;
    }
  },
  (obj) => {
    if (obj instanceof User) {
      return GraphQLUser;
    } else if (obj instanceof List) {
      return GraphQLUserList;
    } else {
      return null;
    }
  }
);

var GraphQLUserList = new GraphQLObjectType({
  name: 'List',
  description: 'alist',
  fields: () => ({
    id: globalIdField('List'),
    users: {
      type: UserConnection,
      description: 'ippai user',
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(getUsers(), args),
    },
  }),
  interfaces: [nodeInterface],
});


var GraphQLUser = new GraphQLObjectType({
  name: 'User',
  description: 'uuusesr',
  fields: () => ({
    id: globalIdField('User'),
    name: {
      type: GraphQLString,
      description: 'name ',
    },
    age: {
      type: GraphQLString,
      description: "age"
    }
  }),
  interfaces: [nodeInterface],
});

var {
  connectionType: UserConnection,
  edgeType: GraphQLUserEdge,
  } = connectionDefinitions({
  name: 'User',
  nodeType: GraphQLUser,
});




var Root = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    node: nodeField,
    list: {
      type: GraphQLUserList,
      resolve: () => getListMain()
    },
  }),
});


//////////////////////////定義ここまで
////↓ミューテーション

var GraphQLAddUserMutation = mutationWithClientMutationId({
  name: 'AddUser',
  inputFields: {
    name: {type: new GraphQLNonNull(GraphQLString)},
    age: {type: new GraphQLNonNull(GraphQLString)}
  },
  outputFields: {
    userEdge: {
      type: GraphQLUserEdge,
      resolve: ({localUserId}) => {
        var user = getUser(localUserId);
        return {
          cursor: cursorForObjectInConnection(getUsers(), user),
          node: user,
        };
      }
    },
    list: {
      type: GraphQLUserList,
      resolve: () => getListMain(),
    },
  },
  mutateAndGetPayload: ({name,age}) => {
    var localUserId = addUser(name,age);
    return {localUserId};
  }
});

var RemoveUser = mutationWithClientMutationId({
  name: 'RemoveUser',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  outputFields: {
    deletedUserId: {
      type: GraphQLID,
      resolve: ({id}) => id,
    },
    list: {
      type: GraphQLUserList,
      resolve: () => getListMain(),
    },
  },
  mutateAndGetPayload: ({id}) => {
    console.log("del");
    var localUserId = fromGlobalId(id).id;
    removeUser(localUserId);
    return {id};
  }
});

var RenameUser = mutationWithClientMutationId({
  name: 'Renameuser',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    user: {
      type: GraphQLUser,
      resolve: ({localUserId}) => getUser(localUserId),
    }
  },
  mutateAndGetPayload: ({id, name}) => {
    var localUserId = fromGlobalId(id).id;
    changeUserName(localUserId, name);
    return {localUserId};
  },
});


var Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: GraphQLAddUserMutation,
    removeUser: RemoveUser,
    renameUser: RenameUser
  },
});

export var Schema = new GraphQLSchema({
  query: Root,
  mutation: Mutation
});

