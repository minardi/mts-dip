# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create(name: "Alex", password: "testqq", email: "q@gmail.com", role: {key: "doctor", doctor_id: 1})
User.create(name: "Justin", password: "testzz", email: "z@gmail.com", role: {key: "doctor", doctor_id: 2})
User.create(name: "David", password: "testdd", email: "d@gmail.com", role: {key: "doctor", doctor_id: 3})
User.create(name: "Bob", password: "testbb", email: "b@gmail.com", role: {key: "doctor", doctor_id: 4})
User.create(name: "Steve", password: "testss", email: "s@gmail.com", role: {key: "doctor", doctor_id: 5})
User.create(name: "Peter", password: "testpp", email: "p@gmail.com", role: {key: "doctor", doctor_id: 6})

User.create(name: "Calvin", password: "testcc", email: "c@gmail.com", role: {key: "patient"})
User.create(name: "Marry", password: "testmm", email: "m@gmail.com", role: {key: "patient"})
User.create(name: "Jean", password: "testjj", email: "j@gmail.com", role: {key: "patient"})
User.create(name: "Logan", password: "testll", email: "l@gmail.com", role: {key: "patient"})


spec = Specialization.create(:name => "Hirurg")
 
spec.doctors.create(:name => "Alex", :duration => 15)
spec.doctors.create(:name => "Justin", :duration => 30)
spec.doctors.create(:name => "David", :duration => 60) 
  
spec = Specialization.create(:name => "Terapevt")
 
spec.doctors.create(:name => "Bob", :duration => 30)

spec = Specialization.create(:name => "Okulist")

spec.doctors.create(:name => "Steve", :duration => 15)
spec.doctors.create(:name => "Peter", :duration => 30)

UserStatus.create(user_id: 1, missing_count: 0, status: "active")
UserStatus.create(user_id: 2, missing_count: 0, status: "active")
UserStatus.create(user_id: 3, missing_count: 0, status: "active")
UserStatus.create(user_id: 4, missing_count: 0, status: "active")
UserStatus.create(user_id: 5, missing_count: 0, status: "active")
UserStatus.create(user_id: 6, missing_count: 0, status: "active")
UserStatus.create(user_id: 7, missing_count: 0, status: "active")
UserStatus.create(user_id: 8, missing_count: 0, status: "active")
UserStatus.create(user_id: 9, missing_count: 0, status: "active")
UserStatus.create(user_id: 10, missing_count: 0, status: "active")
UserStatus.create(user_id: 11, missing_count: 0, status: "active")
 
WeeklySchedule.create(doctor_id: 1,schedule: {
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
     

WeeklySchedule.create(doctor_id: 2,schedule: {
        
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

     
WeeklySchedule.create(doctor_id: 3,schedule: {
        
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
     
WeeklySchedule.create(doctor_id: 4,schedule: {
        
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

WeeklySchedule.create(doctor_id: 5,schedule: {
        
        sun: {
            start: '9:00',
            end: '16:00'
        },
        
        mon: {
            start: '10:00',
            end: '12:00'
        },
        
        tue: {
            start: '11:00',
            end: '13:00'            
        },
        
        wed: {
            start: '8:00',
            end: '14:00'                        
        },
        
        thu: {
            start: '10:00',
            end: '15:00'             
        },
        
        fri: {
            start: '10:00',
            end: '12:00'             
        },
        
        sat: {
            start: '11:00',
            end: '16:00'                         
        }
    }
     )

WeeklySchedule.create(doctor_id: 6,schedule: {
        
        sun: {
            start: '9:00',
            end: '14:00'
        },
        
        mon: {
            start: '8:00',
            end: '16:00'
        },
        
        tue: {
            start: '11:00',
            end: '12:00'            
        },
        
        wed: {
            start: '9:00',
            end: '16:00'                        
        },
        
        thu: {
            start: '13:00',
            end: '14:00'             
        },
        
        fri: {
            start: '10:00',
            end: '16:30'             
        },
        
        sat: {
            start: '8:00',
            end: '14:00'                         
        }
    }
     )