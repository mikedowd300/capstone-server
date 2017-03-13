const knex = require('./knex');

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
  }

}
