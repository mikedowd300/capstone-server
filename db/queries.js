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
    console.log('getFeaturedSites');
    return knex("featuredurl").where("isFeatured", true);
  }

}
