describe "the sign in process", :js => :true do
  
  before :each do
    User.create(:email => 'user@example.com', :password => 'caplin', :name => 'Jon')
  end

  it "signs me in" do
    visit root_path
    
    within("#login_block") do
      fill_in '#in_login', :with => 'user@example.com'
      fill_in '#password', :with => 'caplin'
    end
    
    click_link 'Sign in'
    page.should have_content 'Success'

  end

end