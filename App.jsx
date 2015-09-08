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
    
    handleSubmit(event) {
        event.preventDefault();

        // Find the text field via the React ref
        var text = React.findDOMNode(this.refs.textInput).value.trim();

        Suggestions.insert({
          text: text,
          createdAt: new Date() // current time
        });

        // Clear form
        React.findDOMNode(this.refs.textInput).value = "";
    },

    render() {
        return (
          <div className="container">
            <header>
              <h1>Lunch Suggestions</h1>
                <form className="new-suggestion" onSubmit={this.handleSubmit} >
                  <input
                    type="text"
                    ref="textInput"
                    placeholder="Type to add new suggestion" />
                </form>
            </header>

            <ul>
              {this.renderSuggestions()}
            </ul>
          </div>
        );
    }
 });