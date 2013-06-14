
require 'spec_helper'

describe UserStatus do

  it { should belong_to(:user) }  

  it { should have_db_column(:missing_count) }
  it { should have_db_column(:user_id) }
  it { should have_db_column(:status) }

end

