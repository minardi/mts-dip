var UserEx = (function(app, mts) {

    function getRole() {
        var role = this.user.get('role');

        return ('key' in role) ? role['key'] : false;
    }
    
    function isLogin() {
        
        return (this.user.get('role')['key'] !== 'guest') ? true : false;
        
    }

    function getPermition () {
        return (this.user.get('role')['permition'])
    }
     
    function getDoctorId() {
        
        var doctor_id = false;
        
        if (this.user.get('role')['key'] === 'doctor') {        
            doctor_id = this.user.get('role')['doctor_id'];
        }
        
        return doctor_id;
    }
        
    function getId() {
        var id = false;
       
        if (this.user.get('role')['key'] !== 'guest') {
            id = this.user.get('id');
        }
       
        return id;
    }
    
    return function () {
        
        var instance = this;
        
        app.UserEx = function() {
            return instance;
        }
        
        app.UserEx.prototype = this; 
        instance = new app.UserEx; 
        instance.constructor = app.UserEx; 
        
        this.getRole = getRole;
        this.getId = getId;
        this.getDoctorId = getDoctorId;
        this.isLogin = isLogin; 
        
        instance = this;
        
   }
        
}(window, window.mts));