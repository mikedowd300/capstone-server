const knex = require('./knex');
var bcrypt = require('bcrypt');

module.exports = {

  getUsers: function() {
    return knex("member").select('*');
  },
  getAllSounds: function(term) {
    return knex("sound").limit(100);
  },
  getSounds: function(term) {
    return knex("sound").where("name", term).orWhere("keyword", term).limit(100);
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
    if(term === 'featured'){
      return knex("featuredurl").where("isFeatured", true);
    } else if(term === 'not'){
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
  },
  // REFACTOR THESE INTO A SINGLE FUNCTION
  getSoundsByAuthorExact: function(author) {
    return knex('sound').select(`sound.id as sound_id`, `sound.name as name`,
      `sound.description as description`, `sound.keyword as keyword`, `sound.public as public`,
      `sound.isFeatured as isFeatured`, `sound.url as url`, `sound.mem_size as mem_size`,
      `sound.member_id as member_id`).innerJoin('member', 'member.id', 'member_id').where('email', author).limit(100);
  },
  getSoundsByAuthorLike: function(author) {
    return knex('sound').select(`sound.id as sound_id`, `sound.name as name`,
      `sound.description as description`, `sound.keyword as keyword`, `sound.public as public`,
      `sound.isFeatured as isFeatured`, `sound.url as url`, `sound.mem_size as mem_size`,
      `sound.member_id as member_id`).innerJoin('member', 'member.id', 'member_id').where('email', 'like', '%' + author + '%').limit(100);
  },
  getSoundsByGenreExact: function(genre) {
    return knex('sound').select(`sound.id as sound_id`, `sound.name as name`,
      `sound.description as description`, `sound.keyword as keyword`, `sound.public as public`,
      `sound.isFeatured as isFeatured`, `sound.url as url`, `sound.mem_size as mem_size`,
      `sound.member_id as member_id`).innerJoin('member', 'member.id', 'member_id').where('keyword', genre).limit(100);
  },
  getSoundsByGenreLike: function(genre) {
    return knex('sound').select(`sound.id as sound_id`, `sound.name as name`,
      `sound.description as description`, `sound.keyword as keyword`, `sound.public as public`,
      `sound.isFeatured as isFeatured`, `sound.url as url`, `sound.mem_size as mem_size`,
      `sound.member_id as member_id`).innerJoin('member', 'member.id', 'member_id').where('keyword', 'like', '%' + genre + '%').limit(100);
  },
  getSoundsByNameExact: function(name) {
    return knex('sound').select(`sound.id as sound_id`, `sound.name as name`,
      `sound.description as description`, `sound.keyword as keyword`, `sound.public as public`,
      `sound.isFeatured as isFeatured`, `sound.url as url`, `sound.mem_size as mem_size`,
      `sound.member_id as member_id`).innerJoin('member', 'member.id', 'member_id').where('name', name).limit(100);
  },
  getSoundsByNameLike: function(name) {
    return knex('sound').select(`sound.id as sound_id`, `sound.name as name`,
      `sound.description as description`, `sound.keyword as keyword`, `sound.public as public`,
      `sound.isFeatured as isFeatured`, `sound.url as url`, `sound.mem_size as mem_size`,
      `sound.member_id as member_id`).innerJoin('member', 'member.id', 'member_id').where('name', 'like', '%' + name + '%').limit(100);
  }
}
