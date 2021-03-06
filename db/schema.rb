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
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_12_04_034149) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "checkpoints", force: :cascade do |t|
    t.datetime "created_at"
    t.jsonb "colours"
    t.bigint "user_id"
    t.bigint "pattern_id"
    t.text "image_url"
    t.index ["pattern_id"], name: "index_checkpoints_on_pattern_id"
    t.index ["user_id"], name: "index_checkpoints_on_user_id"
  end

  create_table "favourites", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.bigint "pattern_id"
    t.index ["pattern_id"], name: "index_favourites_on_pattern_id"
    t.index ["user_id"], name: "index_favourites_on_user_id"
  end

  create_table "patterns", force: :cascade do |t|
    t.string "title"
    t.string "description"
    t.datetime "created_at"
    t.integer "forked_from_id"
    t.bigint "user_id"
    t.index ["user_id"], name: "index_patterns_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "name"
    t.string "password"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "checkpoints", "patterns"
  add_foreign_key "checkpoints", "users"
  add_foreign_key "favourites", "patterns"
  add_foreign_key "favourites", "users"
  add_foreign_key "patterns", "users"
end
