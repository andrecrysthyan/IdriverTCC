Accounts.ui.config({ 
	extraSignupFields: [{ 
		fieldName: "name", 
		fieldLabel: "Nome" }], 
		requestPermissions: { 
			facebook: ["email", "user_about_me"] 
		} 
	});

if (Meteor.isClient) {
	accountsUIBootstrap3.setLanguage('pt-BR');
};
