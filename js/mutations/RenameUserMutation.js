export default class RenameUserMutation extends Relay.Mutation {
  static fragments = {
    user: () => Relay.QL`
      fragment on User {
        id,
      }
    `,
  };
  getMutation() {
    return Relay.QL`mutation{renameUser}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on RenameuserPayload {
        user {
          name
        }
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        user: this.props.user.id,
      },
    }];
  }
  getVariables() {
    return {
      id: this.props.user.id,
      name: this.props.name,
    };
  }
  getOptimisticResponse() {
    return {
      user: {
        id: this.props.user.id,
        name: this.props.name,
      },
    };
  }
}