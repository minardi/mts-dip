(function(app){
    
    function getRole() {
        
    }
    
    function getId() {
        
        
    }
    
    function UserEx (){
        
        console.log(this)
        
        this.getRole = getRole;
        this.getid = getId;
        
    }

    app.UserEx = UserEx; 
    
}(window))