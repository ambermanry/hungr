// NOTE:
// "let" keyword will not work here!  it throws errors.
// this must either be declared without a keyword (global) or with "var"
var injectTapEventPlugin = require("react-tap-event-plugin");

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();
//React.initializeTouchEvents(true)

ReactDOM = require('react-dom');
// init material ui
Paper = require('material-ui/lib/paper');
RaisedButton = require('material-ui/lib/raised-button');
Styles = require('material-ui/lib/styles');
Formsy = require('formsy-react');
FormsyCheckbox = require('formsy-material-ui/lib/FormsyCheckbox');
FormsyDate = require('formsy-material-ui/lib/FormsyDate');
FormsyRadio = require('formsy-material-ui/lib/FormsyRadio');
FormsyRadioGroup = require('formsy-material-ui/lib/FormsyRadioGroup');
FormsySelect = require('formsy-material-ui/lib/FormsySelect');
FormsyText = require('formsy-material-ui/lib/FormsyText');
FormsyTime = require('formsy-material-ui/lib/FormsyTime');
FormsyToggle = require('formsy-material-ui/lib/FormsyToggle');
mui = require('material-ui');