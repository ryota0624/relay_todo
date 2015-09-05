export default class AddUserMutation extends Relay.Mutation {
  static fragments = {
    list: () => Relay.QL`
      fragment on List {
        id
      }
    `,
  };
  getMutation() {
    return Relay.QL`mutation{addUser}`;
  }

  getFatQuery() {
    return Relay.QL`
      fragment on AddUserPayload {
        userEdge
        list
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'list',
      parentID: this.props.list.id,
      connectionName: 'users', //帰ってきたやつに //users
      edgeName: 'userEdge',
      rangeBehaviors: {
        '': 'append',
      },
    }];
  }
  getVariables() {
    return {
      name: this.props.user.name,
      age: this.props.user.age
    };
  }
  getOptimisticResponse() {
    return {
      userEdge: {
        node: {
          name: this.props.name,
        },
      },
    };
  }
}