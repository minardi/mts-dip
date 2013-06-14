require 'spec_helper'

describe User do

  it { should have_many(:tickets) }

  it { should have_db_column(:email) }
  it { should have_db_column(:name) }
  it { should have_db_column(:password) }
  it { should have_db_column(:role) }
 

  it "should save hash in role" do
    User.create(:role => {  
    	                    test:"test",
    	                    test1:"test1"
    	                 }, 
    	        :email => "test1@mail.ru", 
    	        :password => "1234567",
    	        :name => "test"
    	       )

    User.last.role == {test:"test", test1:"test1"}

  end

   context "validations" do

      before (:each) do
        User.create( :role => {  
    	                        test:"test",
    	                        test1:"test1"
    	                      },

    	             :email => "test1@mail.ru", 
    	             :password => "1234567",
    	             :name => "test"
    	            )
      end 

       it "should name maximum 50 symbols" do
          long_string = ""

          55.times do |n|
            long_string += n.to_s
          end
            
          user = User.last
          user.name = long_string
          user.save.should eq false
       end
      
      it "should password minimun 6 symbols" do

          user = User.last
          user.password = "12345"
          user.save.should eq false       

      end 

      it "should email must be valid" do 
         user = User.last
         user.email = "12345@"
         user.save.should eq false   
      end

      it "should email must be valid" do 
         user = User.last
         user.email = "12345@mail"
         user.save.should eq false   
      end  

      it "should email must be valid" do 
         user = User.last
         user.email = "12345.ru"
         user.save.should eq false   
      end


    end   

      

 

  	

end