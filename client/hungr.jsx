let {RaisedButton,AppBar,TimePicker,Card,CardTitle,CardHeader,CardMedia,CardActions,CardText,FlatButton,Avatar} = mui,
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

        //The 12hr format
        <TimePicker
          format="ampm"
          hintText="12hr Format" />


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