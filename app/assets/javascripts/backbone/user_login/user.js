(function(app) {

  app.UserModel = Backbone.Model.extend({
          
    defaults : {
        id : 0,
        email : '',
        password : '',
        name : '',
<<<<<<< HEAD
        role : {
        		type : 'guest'
        	   }
    }       
=======
        login : false,
        role : {
                 key: 'guest'
               }
    },

    url : 'users/login.json'
>>>>>>> 541a12ece1593954393dcf52724f973af5423825
  });
 
 })(window);