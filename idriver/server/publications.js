Meteor.publish("posts", function(_id) { 
	var timelineIds = Friendships.timelineIds(_id);
	return Posts.list(timelineIds); 
}); 
Meteor.publish("friendship", function(_id) { 
	return Friendships.followersAndFollowings(_id); 
}); 
Meteor.publish("user", function(_id) { 
	return Meteor.users.find({_id: _id}); 
});
Meteor.publish("userData", function(_id) {
	return Meteor.users.find({_id: _id}, {fields: {"services": 1 }});
});