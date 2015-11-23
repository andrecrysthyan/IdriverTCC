Template.profileForm.events({ 
	"submit form": function(e, template) { 
		e.preventDefault(); 
		var inputs = template.findAll("input"); 
		var name = inputs[0].value; 
		var about = inputs[1].value; 
		if (inputs[0].value != "" && inputs[1].value != ""){
		Meteor.call("profileUpdate", name, about); 
		Session.set("editProfile", false); 
	} else {
		  FlashMessages.sendError("Por favor adicione um texto aos campos nome e/ou descrição", { hideDelay: 2000 });
		//confirm("Por favor adicione um texto aos campos nome ou descrição");
	}
	} 
});