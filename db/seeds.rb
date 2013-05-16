# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create(name: "Alex", password: "testqq", email: "q@gmail.com", role: {key: "doctor", doctor_id: 2})
User.create(name: "Calvin", password: "testaa", email: "a@gmail.com", role: {key: "patient"})
User.create(name: "Justin", password: "testzz", email: "z@gmail.com", role: {key: "doctor", doctor_id: 3})
User.create(name: "Marry", password: "testww", email: "w@gmail.com", role: {key: "patient"})

spec = Specialization.create(:name => "Hirurg")
 
spec.doctors.create(:name => "Jenya", :duration => 15)
spec.doctors.create(:name => "Valik", :duration => 30)
spec.doctors.create(:name => "Igor", :duration => 60) 
  
  
spec = Specialization.create(:name => "Terapevt")
 
spec.doctors.create(:name => "Dima", :duration => 30)

spec = Specialization.create(:name => "Okulist")
 
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