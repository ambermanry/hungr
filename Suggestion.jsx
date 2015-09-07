// Suggestion component - represents a suggestion for lunch
Suggestion = React.createClass({
  propTypes: {
    // This component gets the display through a React prop.
    // We can use propTypes to indicate it is required
    suggestion: React.PropTypes.object.isRequired
  },
  render() {
    return (
      <li>{this.props.suggestion.text}</li>
    );
  }
});