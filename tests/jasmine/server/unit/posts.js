describe("Posts", function() { 
	var userId = 999 , 
	userName = "User" , 
	message = "Hello!" , 
	timeNow = new Date(2000,1,1) , 
	userIds = [userId, 111], 
	userNames = ["UserA", "UserB"]
; 
beforeEach(function () { 
	jasmine.clock().install(); 
	jasmine.clock().mockDate(timeNow); 
	spyOn(Meteor, "userId").and.returnValue(userId); 
}); 
afterEach(function() { 
	jasmine.clock().uninstall(); 
}); 
it("deve postar um post", function() {
	spyOn(Posts, "insert"); 
	Posts.publish(message, userName); 
	var insertedArgs = Posts.insert.calls.argsFor(0); 
	var expectedArgs = [{ message: message, time: new Date(), 
		userId: userId, name: userName }]; 
		expect(insertedArgs).toEqual(expectedArgs);
}); 
it("deve listar todos os posts do usuário", function() {
	var fakeResult = [ { message: "hi", time: new Date(), userId: userIds[0], name: userNames[0] }, 
	{ message: "bye", time: new Date(), userId: userIds[1], name: userNames[1] }, ]; 
	spyOn(Posts, "find").and.returnValue(fakeResult); var result = Posts.list(userIds); 
	expect(result).toEqual(fakeResult); 
	var findArgs = Posts.find.calls.argsFor(0); 
	var expectedArgs = [ {userId: {$in: userIds}}, {sort: {time: -1,name: 1}} ]; 
	expect(findArgs).toEqual(expectedArgs);

});
});

