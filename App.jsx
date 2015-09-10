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
        var startTime = React.findDOMNode(this.refs.startTime).value;
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
                <form class="form-inline" role="form" >
                  <div class="form-group">
                  <label for="place">Place:</label>
                  <input type="text" ref="place" class="form-control" id="place"/>
                  </div>
                  <div class="form-group">
                  <label for="startTime">Start Time:</label>
                    <select class="form-control" id="startTime" ref="startTime">
                    <option>10:00 AM</option>
                    <option>10:15 AM</option>
                    <option>10:30 AM</option>
                    <option>10:45 AM</option>
                    <option>11:00 AM</option>
                    <option>11:15 AM</option>
                    <option>11:30 AM</option>
                    <option>11:45 AM</option>
                    <option>12:00 PM</option>
                    <option>12:15 PM</option>
                    <option>12:30 PM</option>
                    <option>12:45 PM</option>
                    <option>1:00 PM</option>
                    <option>1:15 PM</option>
                    <option>1:30 PM</option>
                    <option>1:45 PM</option>
                    <option>2:00 PM</option>
                    <option>2:15 PM</option>
                    <option>2:30 PM</option>
                    <option>2:45 PM</option>
                    <option>3:00 PM</option>
                    <option>3:15 PM</option>
                    <option>3:30 PM</option>
                    <option>3:45 PM</option>
                    <option>4:00 PM</option>
                    <option>4:15 PM</option>
                    <option>4:30 PM</option>
                    <option>4:45 PM</option>
                    </select>
                  </div>
                  <div class="form-group">
                  End Time<input
                    type="text"
                    ref="endTime"
                    placeholder="" />
                  </div>
                  <div class="form-group">
                  Number Attending<input
                      type="text"
                      ref="numAttending"
                      placeholder="" />
                  </div>
                  <div class="form-group">
                    Notes<input
                        type="text"
                        ref="notes"
                        placeholder="" />
                    </div>
                    <div class="row">
                  <button type="button" class="btn-primary" onClick={this.handleSubmit}>Add</button>
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