let {RaisedButton,AppBar,TimePicker,Card,CardTitle,CardHeader,CardMedia,CardActions,CardText,FlatButton,Avatar,TextField,Snackbar,SelectField,Paper,Divider} = mui

// Suggestion component - represents a suggestion for lunch
Suggestion = React.createClass({
    propTypes: {
        // This component gets the display through a React prop.
        // We can use propTypes to indicate it is required
        suggestion: React.PropTypes.object.isRequired
    },
    deleteThisSuggestion() {
      Suggestions.remove(this.props.suggestion._id);
    },
    _handleTap(e){
        e.preventDefault()
        console.log('it worked ------- !')
        console.log(e)

        this.setState({
            counter: ++this.state.counter
        })
    },
    render() {
        // Give suggestions a different className when they are checked off,
        // so that we can style them nicely in CSS
        const suggestionClassName = this.props.suggestion.checked ? "checked" : "";
        const subTitle = this.props.suggestion.startTime + "-" + this.props.suggestion.endTime;
        
        console.log(this.state);

        return (
          <li className={suggestionClassName}>
            <button className="delete" onClick={this.deleteThisSuggestion}>
              &times;
            </button>

            <Card initiallyExpanded={false}>
                <CardHeader
                        title={this.props.suggestion.place}
                        subtitle={subTitle}
                        avatar={<Avatar style={{color:'red'}}>{this.props.suggestion.numAttending}</Avatar>}
                    showExpandableButton={true}>
                </CardHeader>
                <CardText expandable={true}>
                    {this.props.suggestion.notes}
                </CardText>
                <CardActions expandable={true}>
                    <RaisedButton primary label='Join' onTouchTap={this._handleTap} />
                    <RaisedButton
                            onTouchTap={this.handleTouchTap}
                            label="Add to my calendar"
                            />
                    
                </CardActions>
            </Card>
          </li>
        );
      }
});