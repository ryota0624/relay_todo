const ENTERKEY = 13;

export default class EditName extends React.Component {
  state = {
    edit: false,
    name: this.props.initialName || "",
  }
  componentDidMount() {
    React.findDOMNode(this).focus();
  }
  handlekeyDown(e){
    if(e.keyCode === ENTERKEY) {
      console.log(this.state)
      this.props.onSave(this.state.name);
    }
  }
  handleChange(e){
    this.setState({name: e.target.value});
  }
  render() {
    return(
    <input
      onChange={this.handleChange.bind(this)}
      onKeyDown={this.handlekeyDown.bind(this)}
      value={this.state.name}
      />
    )
  }
}