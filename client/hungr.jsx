// Define a collection to hold our suggestions
Suggestions = new Mongo.Collection("suggestions");

let {RaisedButton,AppBar,TimePicker,Card,CardTitle,CardHeader,CardMedia,CardActions,CardText,FlatButton,Avatar,TextField,Snackbar,SelectField,Paper,Divider} = mui,
  App = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext(){
    return {
      muiTheme: mui.Styles.ThemeManager.getMuiTheme(mui.Styles.LightRawTheme)
    }
  },

  // Loads items from the Suggestionss collection and puts them on this.data.suggestions
  getMeteorData() {
    return {
      suggestions: Suggestions.find({}, {sort: {startTime: 1}}).fetch()
    }
  },


  renderSuggestions() {
    // Get suggestions from this.data.suggestions
    return this.data.suggestions.map((suggestion) => {
      return <Suggestion key={suggestion._id} suggestion={suggestion} />;
    });
  },

  getInitialState(){

    return {
      counter: 0
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

  createSuggesion(event){
      event.preventDefault();

      // Find the text field via the React ref
      var place = React.findDOMNode(this.refs.place).value.trim();
      var startTime = React.findDOMNode(this.refs.startTime).value;
      var endTime = React.findDOMNode(this.refs.endTime).value;
      var numAttending = React.findDOMNode(this.refs.numAttending).value;
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


  render(){
    return (

      <div>


        <TimePicker
          id="startTime"
          format="ampm"
          hintText="Start Time" />
        <TimePicker
          id="endTime"
          format="ampm"
          hintText="End Time" />
        <TextField
          id="place"
          hintText="Location"
          hintStyle={{color: 'red'}} />
        <TextField
          id="numAttending"
          hintText="Num Attending"
          hintStyle={{color: 'red'}} />
        <TextField
          id="notes"
            hintText="Notes"
            hintStyle={{color: 'red'}} />

        <RaisedButton primary label='Create New Meeting' onTouchTap={this.createSuggestion} />
        <Card initiallyExpanded={false}>
          <CardHeader
            title="Title"
            subtitle="Subtitle"
            avatar={<Avatar style={{color:'red'}}>A</Avatar>}
            showExpandableButton={true}>
          </CardHeader>
          <CardText expandable={true}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
          </CardText>
          <CardActions expandable={true}>
            <RaisedButton primary label='Join' onTouchTap={this._handleTap} />
            <RaisedButton
                      onTouchTap={this.handleTouchTap}
                      label="Add to my calendar"
                    />
            <Snackbar
                      open={this.state.open}
                      message={this.state.message}
                      action="undo"
                      autoHideDuration={this.state.autoHideDuration}
                      onActionTouchTap={this.handleActionTouchTap}
                      onRequestClose={this.handleRequestClose}
                    />
          </CardActions>
          <CardText expandable={true}>
            <p>You've pressed the button <b>{this.state.counter}</b> times.</p>
          </CardText>
        </Card>
       
      </div>
    )
  }
})

Meteor.startup(()=>{
  React.render(<App />, document.body)
})