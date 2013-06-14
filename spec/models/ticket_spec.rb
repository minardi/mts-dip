require 'spec_helper'

describe Ticket do

  it { should belong_to(:doctor) }
  it { should belong_to(:user) }  

  it { should have_db_column(:data) }
  it { should have_db_column(:time) }
  it { should have_db_column(:doctor_id) }
  it { should have_db_column(:user_id) }
  it { should have_db_column(:status) }

end