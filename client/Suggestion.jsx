// Suggestion component - represents a suggestion for lunch
Suggestion = React.createClass({
  propTypes: {
    // This component gets the display through a React prop.
    // We can use propTypes to indicate it is required
    suggestion: React.PropTypes.object.isRequired
  },
  toggleChecked() {
      // Set the checked property to the opposite of its current value
      Suggestions.update(this.props.suggestion._id, {
        $set: {checked: ! this.props.suggestion.checked}
      });
    },

    deleteThisSuggestion() {
      Suggestions.remove(this.props.suggestion._id);
    },
  render() {
    // Give suggestions a different className when they are checked off,
    // so that we can style them nicely in CSS
    const suggestionClassName = this.props.suggestion.checked ? "checked" : "";

    return (
      <li className={suggestionClassName}>
        <button className="delete" onClick={this.deleteThisSuggestion}>
          &times;
        </button>

        <input
          type="checkbox"
          readOnly={true}
          checked={this.props.suggestion.checked}
          onClick={this.toggleChecked} />

        <span className="text">{this.props.suggestion.place}</span>
        <span className="text">{this.props.suggestion.startTime}</span>
        <span className="text">{this.props.suggestion.endTime}</span>
        <span className="badge">{this.props.suggestion.numAttending}</span>
        <span className="text">{this.props.suggestion.notes}</span>
      </li>
    );
  }
});