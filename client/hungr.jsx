// Define a collection to hold our suggestions
//TODO:  http://stackoverflow.com/questions/16739810/getting-a-error-inserting-in-to-a-meteor-collection
Suggestions = new Mongo.Collection("suggestions");

let {RaisedButton,AppBar,TimePicker,Card,CardTitle,CardHeader,CardMedia,CardActions,CardText,FlatButton,Avatar,TextField,Snackbar,SelectField,Paper,Divider} = mui,
App = React.createClass({

    mixins: [ReactMeteorData, React.addons.LinkedStateMixin],

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
            counter: 0,
            startTime: '',
            endTime: '',
            place: '',
            notes: '',
            numAttending: 1
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

    createSuggestion(event){
        event.preventDefault();

        // Find the text field via the React ref
        //var place = React.findDOMNode(this.refs.place).getValue();
        //var startTime = React.findDOMNode(this.refs.startTime).getValue();
        //var endTime = React.findDOMNode(this.refs.endTime).getValue();
        //var numAttending = React.findDOMNode(this.refs.numAttending).getValue();
        //var notes = React.findDOMNode(this.refs.notes).getValue();

        console.log("place: " + place.value);


        Suggestions._collection.insert({
        place: place.value,
        startTime: startTime.value,
        endTime: endTime.value,
        numAttending: numAttending.value,
        notes: notes.value,
        createdAt: new Date() // current time
        });

        // Clear form
        //React.findDOMNode(this.refs.place).value = "";
        //React.findDOMNode(this.refs.startTime).value = "";
        //React.findDOMNode(this.refs.endTime).value = "";
        //React.findDOMNode(this.refs.numAttending).value = "";
        //React.findDOMNode(this.refs.notes).value = "";
    },


    render(){
        return (
            <div>


                <TimePicker
                        id="startTime"
                        ref="startTime"
                        valueLink={this.linkState('startTime')}
                        format="ampm"
                        hintText="Start Time" />
                <TimePicker
                        id="endTime"
                        ref="endTime"
                        valueLink={this.linkState('endTime')}
                        format="ampm"
                        hintText="End Time" />
                <TextField
                        id="place"
                        valueLink={this.linkState('place')}
                        ref="place"
                        hintText="Location"
                         />
                <TextField
                        id="numAttending"
                        valueLink={this.linkState('numAttending')}
                        ref="numAttending"
                        hintText="Num Attending"
                         />
                <TextField
                        id="notes"
                        ref="notes"
                        valueLink={this.linkState('notes')}
                        hintText="Notes"
                         />

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

                    {this.renderSuggestions()}

            </div>
        )
    }
})

Meteor.startup(()=>{
    React.render(<App />, document.body)
})