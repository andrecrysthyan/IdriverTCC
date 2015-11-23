Template.post.events({ 
	"submit form": function(e, template) { 
		e.preventDefault(); 
		var textarea = template.find("textarea"); 
		var name = Meteor.user().profile.name; 
		
		if (textarea.value != ""){
		Meteor.call("publishPost", textarea.value, name); 
		textarea.value = ""; 
		
	}else {
		  FlashMessages.sendError("Por favor insira um texto na mensagem", { hideDelay: 2000 });
		//confirm("Por favor insira um texto");
	}

	} 
});