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
        var place = React.findDOMNode(this.refs.place).value.trim();
        var startTime = React.findDOMNode(this.refs.startTime).value.trim();
        var endTime = React.findDOMNode(this.refs.endTime).value.trim();
        var numAttending = React.findDOMNode(this.refs.numAttending).value.trim();
        var notes = React.findDOMNode(this.refs.notes).value.trim();

        Suggestions.insert({
          place: place,
          startTime: startTime,
          endTime: endTime,
          numAttending: numAttending,
          notes: notes,
          createdAt: new Date() // current time
        });

        // Clear form
        React.findDOMNode(this.refs.place).value = "";
        React.findDOMNode(this.refs.startTime).value = "";
        React.findDOMNode(this.refs.endTime).value = "";
        React.findDOMNode(this.refs.numAttending).value = "";
        React.findDOMNode(this.refs.notes).value = "";
    },

    render() {
        return (
          <div className="container">
            <header>
              <h1>Lunch Suggestions</h1>
                <form className="new-suggestion" >
                  <div class="row">
                  Place <input
                    type="text"
                    ref="place"
                    placeholder="Type to add new suggestion" />
                  </div>
                  <div class="row">
                  Start Time<input
                      type="text"
                      ref="startTime"
                      placeholder="" />
                  </div>
                  <div class="row">
                  End Time<input
                    type="text"
                    ref="endTime"
                    placeholder="" />
                  </div>
                  <div class="row">
                  Number Attending<input
                      type="text"
                      ref="numAttending"
                      placeholder="" />
                  </div>
                  <div class="row">
                    Notes<input
                        type="text"
                        ref="notes"
                        placeholder="" />
                    </div>
                    <div class="row">
                  <button onClick={this.handleSubmit} text="Create"/>
                  </div>
                </form>
            </header>

            <ul>
              {this.renderSuggestions()}
            </ul>
          </div>
        );
    }
 });