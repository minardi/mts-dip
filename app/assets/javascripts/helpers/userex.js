(function(app) {
    
    function getRole() {
        var role = this.user.get('role')['key'];
        
        if (!role) {
            console.warn('something with hash role in userEx');
        }
        
        return role;
    }
     
    function getDoctorId() {
        
        var doctor_id = false;
        
        if (this.user.get('role')['key'] === 'doctor') {        
            doctor_id = this.user.get('role')['doctor_id'];
        } else {
            console.warn('not a doctor');
        }
        
        return doctor_id;
    }
        
    function getId() {
        var id = false;
       
        if (this.user.get('role')['key'] !== 'guest') {
            id = this.user.get('id');
        } else {
            console.warn('user is not enrolled');
        }
       
        return id;
    }
        
    function getUserSchedule() {
        if (this.user.get('role')['key'] === 'patient'){
        
            //this.weekview = new WeekDaysView({el : $('#week_user_tickets')});        
            //console.log(this.weekview)
        }   
    }
    
    function UserEx () {
        
        Backbone.Mediator.sub('user_login', getUserSchedule, this);
        
        this.getRole = getRole;
        this.getid = getId;
        this.getDoctorId = getDoctorId;
        
    }
    
    app.UserEx = UserEx;
         
}(window))