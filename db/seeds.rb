# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# Specialization.create  [{name: 'Therapists'}, {name: 'Surgeon'}]

#  5.times do |n|
#   Doctor.create(:name=>"Kuznecov#{n}",:specialization_id=>n)
#  end  
 
#  5.times do |n|
#  Doctor.create(:name=>"Smetanin#{n}",:specialization_id=>n)
# end 


 spec = Specialization.create(:name => "Hirurg")
 
 spec.doctors.create(:name => "Jenya")
 spec.doctors.create(:name => "Valik")
 spec.doctors.create(:name => "Igor") 
  
  
 spec = Specialization.create(:name => "Terapevt")
 
 spec.doctors.create(:name => "Dima")


 spec = Specialization.create(:name => "Okulist")