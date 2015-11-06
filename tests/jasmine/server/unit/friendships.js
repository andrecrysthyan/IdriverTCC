describe("Amigos", function() { 
	var userId = 1,friendId = 2; 
	beforeEach(function () { 
		spyOn(Meteor, "userId").and.returnValue(userId); 
	}); 
	it("deve seguir um amigo", function() {
		spyOn(Friendships, "insert"); 
		Friendships.follow(friendId); 
		var insertedArgs = Friendships.insert.calls.argsFor(0); 
		var expectedArgs = [{userId: userId, friendId: friendId}]; 
		expect(expectedArgs).toEqual(insertedArgs);
}); 
	it("deve deixar de seguir um amigo", function() {
		spyOn(Friendships, "remove"); 
		Friendships.unfollow(friendId); 
		var removedArgs = Friendships.remove.calls.argsFor(0); 
		var expectedArgs = [{userId: userId, friendId: friendId}]; 
		expect(expectedArgs).toEqual(removedArgs);
}); 
	it("deve retornar o objeto quando o usuário esta seguindo", function() {
		var fakeResult = {userId: userId, friendId: friendId}; 
		spyOn(Friendships, "findOne").and.returnValue(fakeResult); 
		expect(Friendships.isFollowing(friendId)).toEqual(fakeResult); 
		var findOneArgs = Friendships.findOne.calls.argsFor(0);
		var expectedArgs = [{userId: userId, friendId: friendId}]; 
		expect(expectedArgs).toEqual(findOneArgs);

}); 
	it("deve retornar vazio quando o usuário não esta seguindo", function(){
		var fakeResult = {}; 
		spyOn(Friendships, "findOne").and.returnValue(fakeResult); 
		expect(Friendships.isFollowing(friendId)).toEqual(fakeResult); 
		var findOneArgs = Friendships.findOne.calls.argsFor(0); 
		var expectedArgs = [{userId: userId, friendId: friendId}]; 
		expect(expectedArgs).toEqual(findOneArgs); 
}); 
	it("deve retornar followings do usuário", function() {
		var fakeResult = 3; 
		var fakeCursor = { count: function() { return fakeResult; } }; 
		spyOn(Friendships, "find").and.returnValue(fakeCursor); 
		expect(Friendships.followings(userId)).toEqual(fakeResult); 
		var findArgs = Friendships.find.calls.argsFor(0); 
		var expectedArgs = [{userId: userId}]; expect(expectedArgs).toEqual(findArgs);
}); 
	it("deve retornar followers do usuário", function() {
		var fakeResult = 3;
		var fakeCursor = { count: function() { return fakeResult; } }; 
		spyOn(Friendships, "find").and.returnValue(fakeCursor); 
		expect(Friendships.followers(friendId)).toEqual(fakeResult); 
		var findArgs = Friendships.find.calls.argsFor(0); 
		var expectedArgs = [{friendId: friendId}]; 
		expect(expectedArgs).toEqual(findArgs);

}); 
	it("deve retornar os ids da timeline do usuário", function() {
		var fakeFriends = [123, 231]; 
		var fakeCursor = [ {userId: userId, friendId: fakeFriends[0]}, {userId: userId, friendId: fakeFriends[1]} ]; 
		var fakeResult = fakeFriends; fakeResult.push(userId); 
		spyOn(Friendships, "find").and.returnValue(fakeCursor); 
		var result = Friendships.timelineIds(userId); 
		expect(result).toEqual(fakeResult); 
		var findArgs = Friendships.find.calls.argsFor(0); 
		var expectedArgs = [{userId: userId}]; expect(expectedArgs).toEqual(findArgs);
}); 
	it("deve retornar followings e followers do usuário", function() {
		var fakeResult = [ {userId: userId, friendId: friendId}, {userId: friendId, friendId: userId} ]; 
		spyOn(Friendships, "find").and.returnValue(fakeResult); 
		var result = Friendships.followersAndFollowings(userId); 
		expect(result).toEqual(fakeResult);
		var findArgs = Friendships.find.calls.argsFor(0); 
		var expectedArgs = [{$or: [ {userId: userId}, {friendId: userId} ]}]; 
		expect(expectedArgs).toEqual(findArgs);
}); 
});
