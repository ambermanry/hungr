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
            canSumbit: false
        }
    },

    errorMessages: {
        wordsError: "Please only use letters",
        numericError: "Please provide a number",
        urlError: "Please provide a valid URL"
    },

    styles: {
        paperStyle: {
            margin: 20,
            padding: 20
        },
        switchStyle: {
            marginBottom:16
        },
        submitStyle: {
            marginTop: 32
        }
    },

    enableButton() {
        this.setState({
            canSubmit: true
        });
    },

    disableButton() {
        this.setState({
            canSubmit: false
        });
    },

    submitForm(data) {
        alert(JSON.stringify(data, null, 4));
    },

    notifyFormError(data) {
        console.error('Form error:', data);
    },

    createSuggestion(event){
        event.preventDefault();

        console.log("place: " + place.value);
        console.log(this.refs.startTime.getTime());
        console.log(this.refs.startTime.formatTime(this.refs.startTime.getTime()));

        Suggestions.insert({
            place: place.value,
            startTime: startTime.value,
            endTime: endTime.value,
            notes: notes.value,
            createdAt: new Date(),
            participants : [prompt("Who are you?")]
        });


    },


    render(){
        let {paperStyle, switchStyle, submitStyle } = this.styles;
        let { wordsError, numericError, urlError } = this.errorMessages;
        return (
        <Paper style={paperStyle}>

        <Formsy.Form
                onValid={this.enableButton}
                onInvalid={this.disableButton}
                onValidSubmit={this.createSuggestion}
                onInvalidSubmit={this.notifyFormError} >
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
                        />
                <TextField
                        id="numAttending"
                        valueLink={this.linkState('numAttending')}
                        ref="numAttending"
                        validations="isNumeric"
                        validationError={numericError}
                        hintText="Num Attending"
                         />
                <TextField
                        id="notes"
                        ref="notes"
                        valueLink={this.linkState('notes')}
                        hintText="Notes"
                         />

                <RaisedButton
                    style={submitStyle}
                    type="submit"
                    label="Submit"
                    disabled={!this.state.canSubmit} />

                <RaisedButton primary label='Create New Meeting' onTouchTap={this.createSuggestion} />

                {this.renderSuggestions()}

            </Formsy.Form>
        </Paper>
        )
    }
})

Meteor.startup(()=>{
    React.render(<App/>, document.body)
})