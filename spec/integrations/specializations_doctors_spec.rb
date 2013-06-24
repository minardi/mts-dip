require 'spec_helper'
require 'spec_seeds'


describe "Specializations view", type: :feature do
  
  before (:each) do
    run_seeds
  end

  it "should have label Specializations" do 
     visit root_path

     page.should have_content 'Specializations'
  end  

  it "should show label Doctors List after click spec" do 
    visit root_path

    within "#specializations" do
      find("#spec_1").click
    end 

    page.should have_content "Doctors List"
  end  

  it "should hide label Doctors List after second click on spec" do
    visit root_path

    within "#specializations" do
      find("#spec_1").click
      find("#spec_1").click
    end 

    page.should_not have_content "Doctors List"

  end  

  it "should show Bob and Peter after click Terapevt and Okulist" do 
    visit root_path

    within "#specializations" do
      find("#spec_2").click
      find("#spec_1").click
    end 

    page.should have_content "Bob"    
    page.should have_content "Alex"
  
  end  


end