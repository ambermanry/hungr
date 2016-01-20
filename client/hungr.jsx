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

        console.log("place: " + place.value);
        console.log(this.refs.startTime.getTime());
        console.log(this.refs.startTime.formatTime(this.refs.startTime.getTime()));

        Suggestions.insert({
        place: place.value,
        startTime: startTime.value,
        //startTime: this.refs.startTime.getTime(),
        //startTime: this.refs.startTime.formatTime(this.refs.startTime.getTime()),
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
                        format="ampm"
                        hintText="Start Time" />
                <TimePicker
                        id="endTime"
                        ref="endTime"
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

                {this.renderSuggestions()}

            </div>
        )
    }
})

Meteor.startup(()=>{
    React.render(<App note="HELLLOOOOO"/>, document.body)
})