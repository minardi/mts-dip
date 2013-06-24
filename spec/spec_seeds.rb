def run_seeds 

User.create(name: "Alex", password: "testqq", email: "q@gmail.com", role: {key: "doctor", doctor_id: 1, permition:{admin_panel:true, my_schedule:true, doctor_schedule: true}})
User.create(name: "Justin", password: "testzz", email: "z@gmail.com", role: {key: "doctor", doctor_id: 2, permition:{admin_panel:true, my_schedule:true, doctor_schedule: true}})

User.create(name: "Calvin", password: "testcc", email: "c@gmail.com", role: {key: "patient", permition:{my_schedule:true}})



spec = Specialization.create(:name => "Hirurg")
 
spec.doctors.create(:name => "Alex", :duration => 15)
spec.doctors.create(:name => "Justin", :duration => 30)
spec.doctors.create(:name => "David", :duration => 60) 

spec = Specialization.create(:name => "Terapevt")
 
spec.doctors.create(:name => "Bob", :duration => 30)
  


UserStatus.create(user_id: 1, missing_count: 0, status: "active")
UserStatus.create(user_id: 2, missing_count: 0, status: "active")

 
WeeklySchedule.create(doctor_id: 1,start: '2013-03-10',end: '2013-06-29',schedule: {
        sun: {
            start: '12:00',
            end: '15:00'
        },
        
        mon: {
            start: '15:00',
            end: '17:00'
        },
        
        tue: {
            start: '12:00',
            end: '16:00'            
        },
        
        wed: {
            start: '8:00',
            end: '11:00'                        
        },
        
        thu: {
            start: '9:00',
            end: '13:00'             
        },
        
        fri: {
            start: '12:00',
            end: '16:00'             
        },
        
        sat: {
            start: '15:00',
            end: '17:00'                         
        }
    }
        
     )

WeeklySchedule.create(doctor_id: 1, start: '2013-06-30',end: '2013-08-31',schedule: {
        
        sun: {
            start: '10:00',
            end: '14:00'
        },
        
        mon: {
            start: '13:00',
            end: '15:00'
        },
        
        tue: {
            start: '10:00',
            end: '12:00'            
        },
        
        wed: {
            start: '11:00',
            end: '15:00'                        
        },
        
        thu: {
            start: '13:00',
            end: '15:00'             
        },
        
        fri: {
            start: '10:00',
            end: '12:00'             
        },
        
        sat: {
            start: '12:00',
            end: '14:00'                         
        }
    }
     )
     

WeeklySchedule.create(doctor_id: 2,start: '2013-03-10',end: '2013-06-29',schedule: {
        
        sun: {
            start: '10:00',
            end: '14:00'
        },
        
        mon: {
            start: '13:00',
            end: '15:00'
        },
        
        tue: {
            start: '10:00',
            end: '12:00'            
        },
        
        wed: {
            start: '11:00',
            end: '15:00'                        
        },
        
        thu: {
            start: '13:00',
            end: '15:00'             
        },
        
        fri: {
            start: '10:00',
            end: '12:00'             
        },
        
        sat: {
            start: '12:00',
            end: '14:00'                         
        }
    }
     )

WeeklySchedule.create(doctor_id: 2, start: '2013-06-30',end: '2013-08-31',schedule: {
        
        sun: {
            start: '8:00',
            end: '12:00'
        },
        
        mon: {
            start: '15:00',
            end: '17:00'
        },
        
        tue: {
            start: '12:00',
            end: '16:00'            
        },
        
        wed: {
            start: '9:00',
            end: '13:00'                        
        },
        
        thu: {
            start: '15:00',
            end: '17:00'             
        },
        
        fri: {
            start: '8:00',
            end: '12:00'             
        },
        
        sat: {
            start: '14:00',
            end: '16:00'                         
        }
    }
     )

     


end