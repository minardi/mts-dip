require 'spec_helper'
require 'spec_seeds'




describe "sign in", type: :feature do
  
  before (:each) do
    run_seeds
  end

  it "should sign in user and show My tickets, Hello and Exit" do
    visit root_path   
   
      fill_in 'in_login', :with => 'q@gmail.com'
      fill_in 'password', :with => 'testqq'
       
      click_on 'Sign in'
    
    page.should have_content 'Hello, Alex'
    page.should have_content 'Exit'
    page.should have_content 'My tickets'

  end

  it "should sign out after click Exit" do 
    visit root_path   
   
      fill_in 'in_login', :with => 'q@gmail.com'
      fill_in 'password', :with => 'testqq'
       
      click_on 'Sign in'
      find("#exit").click

    page.should_not have_content "Hello, Alex"  
    page.should_not have_content "Exit"  
    page.should_not have_content "My tickets"  

  end  

 

end