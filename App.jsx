//App component - represents the whole app
App = React.createClass({
  // This mixin makes the getMeteorData method work
    mixins: [ReactMeteorData],

    // Loads items from the Suggestionss collection and puts them on this.data.suggestions
    getMeteorData() {
      return {
        suggestions: Suggestions.find({}, {sort: {createdAt: -1}}).fetch()
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
        var startTime = React.findDOMNode(this.refs.startTime).value.trim();

        Suggestions.insert({
          text: text,
          startTime: startTime,
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
                <form className="new-suggestion" >
                  Place <input
                    type="text"
                    ref="textInput"
                    placeholder="Type to add new suggestion" />
                  Start Time<input
                      type="text"
                      ref="startTime"
                      placeholder="" />
                  <button onClick={this.handleSubmit} />
                </form>
            </header>

            <ul>
              {this.renderSuggestions()}
            </ul>
          </div>
        );
    }
 });