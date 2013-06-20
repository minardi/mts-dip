require 'spec_helper'
require 'spec_seeds'


describe "Specializations view", type: :feature do
  
  before (:each) do
    run_seeds
  end

  it "should show label Doctors List after click spec"  do 
    visit root_path

    within "#specializations" do
      find("#spec_2").click
    end 

    within "#doctors" do 
      find("li").click
    end     

    page.should have_content "Work time"
  end  

  it "should show Work time-period after click data" do 
    visit root_path

    within "#specializations" do
      find("#spec_1").click
    end 

    within "#doctors" do 
      find("li", :text => "Alex").click
    end     
      
    find("#doc1-sun").click 

    page.should have_content "Work time-period"   
  
  end  


end