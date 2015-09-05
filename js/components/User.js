import RemoveUserMutation from '../mutations/RemoveUserMutation';
import RenameUserMutation from "../mutations/RenameUserMutation";
import EditName from "./EditName.js"
class User extends React.Component{
  removeUser() {
    console.log(this.props.user)
  Relay.Store.update(
    new RemoveUserMutation({user: this.props.user, list: this.props.list})
  );
  }
  constructor(props) {
    super(props);
    this.state = {edit: false};
  }
  changeUserName(name) {
    Relay.Store.update(
      new RenameUserMutation({user: this.props.user, name: name})
    );
    this.setState({edit: false})
  }
  setEditMode(){
    this.setState({edit: true});
  }
  renderNameChange(){
    console.log(this.props.user.name)
      return(
    <EditName
      initialName={this.props.user.name}
      onSave={this.changeUserName.bind(this)}
      />)
  }
  render() {
    return(
      <li>
        {this.state.edit == false? <label onClick={this.setEditMode.bind(this)}>{this.props.user.name}さん</label> : null }
        {this.state.edit && this.renderNameChange()}
        <label>{this.props.user.age}歳</label>
        <input type="button" value="削除" onClick={this.removeUser.bind(this)}/>
      </li>
    )
  }
}

export default Relay.createContainer(User, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        id,
        name,
        age
        ${RemoveUserMutation.getFragment('user')},
        ${RenameUserMutation.getFragment('user')},
      }
    `,
    list: () => Relay.QL`
      fragment on List {
        ${RemoveUserMutation.getFragment('list')},
      }
    `,
  },
});

//<input type="button" value="名前変更" onClick={this.changeUserName.bind(this)}/>