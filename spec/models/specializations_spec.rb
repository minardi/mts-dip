require 'spec_helper'

describe Specialization do

  it { should have_many(:doctors) }  
  it { should have_db_column(:name) }


  

end