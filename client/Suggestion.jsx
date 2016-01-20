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
    joinThisSuggestion(){
        console.log("ID " + this.props.suggestion._id);
        var newParticipant = prompt("Who are you?");
        if(newParticipant != null) {
            var participants = Suggestions.find({_id: this.props.suggestion._id}).fetch()[0].participants;
            participants.push(newParticipant);
            Suggestions.update(this.props.suggestion._id, {$set :{participants : participants}});
        }
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
        var participants = this.props.suggestion.participants;

        const suggestionClassName = this.props.suggestion.checked ? "checked" : "";
        const subTitle = this.props.suggestion.startTime + "-" + this.props.suggestion.endTime;
        const numAttending = (participants !== undefined) ?
            participants.length : 0;
        const prettyPrintParticipants = participants.join(", ");

        return (
          <li className={suggestionClassName}>
            <button className="delete" onClick={this.deleteThisSuggestion}>
              &times;
            </button>
            <Card initiallyExpanded={false}>
                <CardHeader
                        title={this.props.suggestion.place}
                        subtitle={subTitle}
                        avatar={<Avatar style={{color:'red'}}>{numAttending}</Avatar>}
                    showExpandableButton={true}>
                </CardHeader>
                <CardText expandable={true}>
                    {this.props.suggestion.notes}
                    <hr />
                    <h4> Participants </h4>
                    {prettyPrintParticipants}
                </CardText>
                <CardActions expandable={true}>
                    <RaisedButton primary label='Join' onTouchTap={this._handleTap} onClick={this.joinThisSuggestion} />
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