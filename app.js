var app = new Vue({

		el: "#root",
		data: {
			showingAddModel: false,
			showingEditModel: false,
			showingDeleteModel: false,
			errorMessage: '',
			successMessage: '',
			users: [],
			newUser: {username: "", email: "", mobile: ""},
			clickedUser: {}
		},
		mounted: function(){

			console.log("mounted");
			this.getAllUsers();
		},

		methods: {

			getAllUsers: function(){
				axios.get("http://127.0.0.1/vuephpcrud/api.php?action=read")
				.then(function(response){
					//console.log(response.data);
					if (response.data.error) {
						app.errorMessage = response.data.message;
					}else{
						app.users = response.data.users;	
					}
				});
			},

			saveUser: function(){
				//console.log(app.newUser);
				var formData = app.toFormData(app.newUser);

				axios.post("http://127.0.0.1/vuephpcrud/api.php?action=create", formData)
				.then(function(response){
					//console.log(response.data);
					app.newUser = {username: "", email: "", mobile: ""};

					if (response.data.error) {
						app.errorMessage = response.data.message;
					}else{
						app.getAllUsers();
						app.successMessage = response.data.message;
					}
				});
			},

			selectUser: function(user){
				app.clickedUser = user;
			},


			updateUser: function(){
				//console.log(app.newUser);
				var formData = app.toFormData(app.clickedUser);

				axios.post("http://127.0.0.1/vuephpcrud/api.php?action=update", formData)
				.then(function(response){
					//console.log(response.data);
					app.clickedUser = {};
					if (response.data.error) {
						app.errorMessage = response.data.message;
					}else{
						app.getAllUsers();
						app.successMessage = response.data.message;
					}
				});
			},

			deleteUser: function(){
				//console.log(app.newUser);
				var formData = app.toFormData(app.clickedUser);

				axios.post("http://127.0.0.1/vuephpcrud/api.php?action=delete", formData)
				.then(function(response){
					//console.log(response.data);
					app.clickedUser = {};
					if (response.data.error) {
						app.errorMessage = response.data.message;
					}else{
						app.getAllUsers();
						app.successMessage = response.data.message;
					}
				});
			},

			toFormData: function(obj){
				var form_data = new FormData();
		      	for ( var key in obj ) {
		         	 form_data.append(key, obj[key]);
		      	} 
		      	return form_data;
				},

			clearMessage: function(){
				app.errorMessage = "";
				app.successMessage = "";
			},

			autorefresh: function(){
				app.getAllUsers();
			}

	}

		
});
