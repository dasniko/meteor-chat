Messages = new Meteor.Collection("messages");

if (Meteor.isClient) {
    Accounts.ui.config({
        passwordSignupFields: 'USERNAME_ONLY'
    });

    Template.input.events({
        'click .sendMsg': function(e) {
           _sendMessage();
        },
        'keyup #msg': function(e) {
            if (e.type == "keyup" && e.which == 13) {
                _sendMessage();
            }
        }
    });

    _sendMessage = function() {
        var el = document.getElementById("msg");
        Messages.insert({user: Meteor.user().username, msg: el.value, ts: new Date()});
        el.value = "";
        el.focus();
    };

    Template.messages.messages = function() {
        return Messages.find({}, {sort: {ts: -1}});
    };
}

if (Meteor.isServer) {
  Meteor.startup(function () {
      //Messages.remove({});
  });
}
