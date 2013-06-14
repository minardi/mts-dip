require 'spec_helper'

describe Doctor do

  it { should belong_to(:specialization) }  
  it { should have_db_column(:name) }
  it { should have_db_column(:duration) }
  it { should have_db_column(:specialization_id) }

  

end
