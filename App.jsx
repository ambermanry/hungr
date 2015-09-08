//App component - represents the whole app
App = React.createClass({
  // This mixin makes the getMeteorData method work
    mixins: [ReactMeteorData],

    // Loads items from the Suggestionss collection and puts them on this.data.suggestions
    getMeteorData() {
      return {
        suggestions: Suggestions.find({}).fetch()
      }
    },

    renderSuggestions() {
      // Get suggestions from this.data.suggestions
      return this.data.suggestions.map((suggestion) => {
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