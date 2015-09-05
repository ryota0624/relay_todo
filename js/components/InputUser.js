

class InputUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {user: {name: "",age: 20}};
  }
  handleButton(){
    var newUser = this.state.user;
    this.props.addUser(newUser)//(newUser);
  }
  changeAge(e){
    var user= this.state.user
    this.setState({user: {name: user.name, age: e.target.value}});
  }
  handleChange(e){
    console.log(this)
    var user= this.state.user
    this.setState({user: {name: e.target.value, age: user.age}});
  }
  render(){
    var ageNumbers = []
    for(var i = 10;i < 30;i++){
      ageNumbers.push(i);
    }
    var ageNumbersTag = ageNumbers.map(function(age) {
      return <option value={age} key={age}>{age}</option>;
    });
    return(
      <div>
        年齢
        <select value={this.state.user.age} onChange={this.changeAge.bind(this)}>
          {ageNumbersTag}
        </select>
        名前
        <input type="text" onChange={this.handleChange.bind(this)} value={this.state.user.name}/>

        <input type ="button" value="追加" onClick = {this.handleButton.bind(this)} />
      </div>
    )
  }
}

export default InputUser