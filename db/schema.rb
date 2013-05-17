# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130516182805) do

  create_table "doctors", :force => true do |t|
    t.integer  "duration"
    t.string   "name"
    t.datetime "created_at",        :null => false
    t.datetime "updated_at",        :null => false
    t.integer  "specialization_id"
  end

  create_table "specializations", :force => true do |t|
    t.string   "name"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "tickets", :force => true do |t|
    t.string   "date_time"
    t.integer  "doctor_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.string   "time"
    t.string   "data"
    t.integer  "user_id"
    t.string   "status"
  end

  create_table "user_statuses", :force => true do |t|
    t.integer  "missing_count"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
    t.integer  "user_id"
  end

  create_table "users", :force => true do |t|
    t.string   "name"
    t.string   "email"
    t.string   "password"
    t.datetime "created_at",     :null => false
    t.datetime "updated_at",     :null => false
    t.string   "remember_token"
    t.text     "role"
  end

  add_index "users", ["remember_token"], :name => "index_users_on_remember_token"

  create_table "weekly_schedules", :force => true do |t|
    t.integer  "doctor_id"
    t.text     "schedule"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

end
