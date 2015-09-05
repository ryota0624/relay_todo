export default class extends Relay.Route {
  static queries =  {
    list: (Component) => Relay.QL `
      query {
        list {
           ${Component.getFragment("list")},
        },
      }
    `,
  };
  static routeName = "ListHomeRoute"
}