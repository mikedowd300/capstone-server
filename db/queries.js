const knex = require('./knex');

module.exports = {
  getUsers: function() {
    return knex("member").select('*');
  }
}
