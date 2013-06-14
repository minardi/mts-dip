require 'spec_helper'

describe WeeklySchedule do

  it { should belong_to(:doctor) }
  
  it { should have_db_column(:doctor_id) }
  it { should have_db_column(:schedule) }

  
  it "should save hash in schedule " do
    WeeklySchedule.create(:schedule => {test:"test",test1:"test1"})
    WeeklySchedule.last.schedule.should == {test:"test",test1:"test1"}
   
  end 

end