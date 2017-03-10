var bcrypt = require('bcrypt');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('DELETE FROM "member"; ALTER SEQUENCE member_id_seq RESTART WITH 4;')
    .then(function () {
        var members = [
        {
          id: 1,
          email: 'mikedowd1972@gmail.com',
          password: bcrypt.hashSync('123456', 8),
          type: 'admin'
        },
        {
          id: 2,
          email: 'mikedowd300@gmail.com',
          password: bcrypt.hashSync('123457', 8),
          type: 'member'
        },
        {
          id: 3,
          email: 'qq@gmail.com',
          password: bcrypt.hashSync('qqqqqq', 8),
          type: 'member'
        }

      ];
      return knex('member').insert(members);
    });
};
