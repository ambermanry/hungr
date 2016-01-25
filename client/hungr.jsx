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
            place: '',
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

        console.log("place: " + place.value);
        //console.log(startTime.value);
//console.log(this.refs.startTime.value);
        //console.log(this.refs.startTime.getTime());
        //console.log(this.refs.startTime.formatTime(this.refs.startTime.getTime()));

        Suggestions.insert({
            place: place.value,
            startTime: $("#startTime").val(),
            endTime: $("#endTime").val(),
            notes: $("#notes").val(),
            createdAt: new Date(),
            participants : [prompt("Who are you?")]
        });


    },


    render(){
        let {paperStyle, switchStyle, submitStyle } = this.styles;
        let { wordsError, numericError, urlError } = this.errorMessages;
        return (
        <div>
        <Paper style={paperStyle}>

            <Formsy.Form
                    onValid={this.enableButton}
                    onInvalid={this.disableButton}
                    onValidSubmit={this.createSuggestion}
                    onInvalidSubmit={this.notifyFormError} >

                <FormsyTime
                        id="startTime"
                        name="startTime"
                        floatingLabelText="Start Time" />

                <FormsyTime
                        id="endTime"
                        name="endTime"
                        ref="endTime"
                        floatingLabelText="End Time" />

                <FormsyText
                        id="place"
                        name="place"
                        ref="place"
                        />

                <input type="hidden" id="numAttending" name="numAttending" value="1"/>

                <FormsyText
                        id="notes"
                        name="notes"
                        hintText="Notes"
                        floatingLabelText="Type any relevant information" />



                    <RaisedButton
                            style={submitStyle}
                            type="submit"
                            label="Post Suggestion"
                            disabled={!this.state.canSubmit} />






            </Formsy.Form>
            {this.renderSuggestions()}
        </Paper>
        </div>
        )
    }
})

Meteor.startup(()=>{
    ReactDOM.render(<App/>, document.getElementById("render-target"))
})