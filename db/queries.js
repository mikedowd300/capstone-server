const knex = require('./knex');

module.exports = {
  getUsers: function() {
    return knex("member").select('*');
  },
  getSounds: function(term) {
    console.log(term);
    return knex("sound").where("name", term).orWhere("keyword", term);
  }
}
