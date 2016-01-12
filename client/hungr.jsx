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

  render(){
    return (

      <div>


        <TimePicker
          format="ampm"
          hintText="Start Time" />
        <TimePicker
          format="ampm"
          hintText="End Time" />
        <TextField
          hintText="Location"
          hintStyle={{color: 'red'}} />
        <TextField
          hintText="Num Attending"
          hintStyle={{color: 'red'}} />
        <TextField
            hintText="Notes"
            hintStyle={{color: 'red'}} />

        <RaisedButton primary label='Create New Meeting' onTouchTap={this._handleTap} />
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