Router.route("/", function() { 
	this.render("home", { 
		data: function() { 
			var _id = Meteor.userId(); 
			var timelineIds = Friendships.timelineIds(_id); 
			return { 
				posts: Posts.list(timelineIds), 
				followers: Friendships.followers(_id), 
				followings: Friendships.followings(_id) 
			} 
		} 
	}); 
}, { 
	name: "home" });