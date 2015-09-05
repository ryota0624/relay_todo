import "babel/polyfill";
import AddUserMutation from "../mutations/AddUserMutation";
import User from "./User"
import InputUser from "./InputUser"

class ListApp extends React.Component {
  addUser(user) {
    console.log(this.props)
    Relay.Store.update(
      new AddUserMutation({
        user: user,
        list: this.props.list
      })
    );
  }
  reload() {
    console.log("reload");
    this.props.relay.setVariables({
      num: this.props.relay.variables.num + 5
    })
    console.log(this.props.relay.variables.num);
  }
  render() {
    console.log(this.props);
    return (
      <div>
        <h2>UserList</h2>
        <InputUser addUser={this.addUser.bind(this)}/>
        {this.props.list.users.edges.map(edge =>
            <User user={edge.node} key={edge.node.id} list={this.props.list}/>
        )}
        <input type="button" value="もっと見る"onClick={this.reload.bind(this)} />
      </div>
    );
  }
}

export default Relay.createContainer(ListApp, {
  initialVariables: {num: 10},

  fragments: {
    list: () => Relay.QL`
      fragment on List {
        users(last: $num) {
          edges {
            node {
              ${User.getFragment('user')},
              id
            },
          },
        },
        ${User.getFragment('list')},
        ${AddUserMutation.getFragment('list')},
      }
    `,
  },
});