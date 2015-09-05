export default class RemoveTodoMutation extends Relay.Mutation {
  static fragments = {
    user: () => Relay.QL`
      fragment on User {
        id,
      }
    `,
    list: () => Relay.QL`
      fragment on List {
        id,
      }
    `,
  };
  getMutation() {
    return Relay.QL`mutation{removeUser}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on RemoveUserPayload {
        deletedUserId,
        list
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'NODE_DELETE',
      parentName: 'list',
      parentID: this.props.list.id,
      connectionName: 'users',
      deletedIDFieldName: 'deletedUserId',
    }];
  }
  getVariables() {
    return {
      id: this.props.user.id,
    };
  }
  getOptimisticResponse() {
    console.log(this.props)
    return {
      deletedUserId: this.props.user.id,
      list: this.props.list,
    };
  }
}