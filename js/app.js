import ListApp from './components/ListApp';
import ListAppHomeRoute from "./routes/ListAppHomeRoute.js"


React.render(
  <Relay.RootContainer
  Component={ListApp}
  route={new ListAppHomeRoute()}
  renderLoading={function () {
    return <div>Loading...</div>;
  }}
  />,
  document.getElementById('root')
);
