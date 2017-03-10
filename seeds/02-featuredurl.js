exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('DELETE FROM "featuredurl"; ALTER SEQUENCE featuredurl_id_seq RESTART WITH 4;')
    .then(function () {
        var featuredurls = [
        {
          id: 1,
          url: 'https://www.google.com',
          isFeatured: true,
          member_id: 2
        },
        {
          id: 2,
          url: 'https://www.earcandy.com',
          isFeatured: false,
          member_id: 3
        },
        {
          id: 3,
          url: 'https://www.brightsidekennel.com',
          isFeatured: true,
          member_id: 2
        }

      ];
      return knex('featuredurl').insert(featuredurls);
    });
};
