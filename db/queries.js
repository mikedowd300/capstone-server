const knex = require('./knex');
var bcrypt = require('bcrypt');

module.exports = {

  getUsers: function() {
    return knex("member").select('*');
  },
  getSounds: function(term) {
    return knex("sound").where("name", term).orWhere("keyword", term);
  },
  getFeaturedSounds: function() {
    return knex("sound").where("isFeatured", true);
  },
  getFeaturedSites: function() {
    return knex("featuredurl").where("isFeatured", true);
  },
  getLoginInfo: function(email) {
    return knex("member").where("email", email).first();
  },
  getUserInfo: function(id) {
    return knex("sound").where("member_id", id);
  },
  insertUser: function(user) {
    user.type = 'member'
    user.password = bcrypt.hashSync(user.password, 8);
    return knex("member").insert(user);
  },
  addFeatureableSites: function(obj) {
    return knex("featuredurl").insert(obj);
  },
  postSound: function(obj) {
    return knex("sound").insert(obj);
  },
  getAllData: function() {
    return knex.select('mem_size').from('sound');
  },
  getFeaturedUrls: function(term) {
    console.log(term);
    if(term === ':featured'){
      return knex("featuredurl").where("isFeatured", true);
    } else if(term === ':not'){
      return knex("featuredurl").where("isFeatured", false);
    }else {
      return knex("featuredurl").select();
    }
  },
  patchIsFeatured: function(obj) {
    return knex("featuredurl").where('id', obj.id).update('isFeatured', obj.isFeatured);
  },
  patchIsFeaturedSound: function(obj) {
    return knex("sound").where('id', obj.id).update('isFeatured', obj.isFeatured);
  }
}
