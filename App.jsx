//App component - represents the whole app
App = React.createClass({
  getSuggestions() {
    return [
      { _id: 1, text: "This is a lunch suggestion for Panera" },
      { _id: 2, text: "This is a lunch suggestion for pizza" },
      { _id: 3, text: "This is a lunch suggestion for sushi" }
    ];
  },

  renderSuggestions() {
    return this.getSuggestions().map((suggestion) => {
      return <Suggestion key={suggestion._id} suggestion={suggestion} />;
    });
  },

  render() {
    return (
      <div className="container">
        <header>
          <h1>Lunch Suggestions</h1>
        </header>

        <ul>
          {this.renderSuggestions()}
        </ul>
      </div>
    );
   }
 });