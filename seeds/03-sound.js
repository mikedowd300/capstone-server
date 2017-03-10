exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('DELETE FROM "featuredurl"; ALTER SEQUENCE sound_id_seq RESTART WITH 4;')
    .then(function () {
        var sounds = [
        {
          id: 1,
          name: 'harpsicord',
          description: 'crazy fast harpsicord',
          keyword: 'opera',
          public: true,
          isFeatured: true,
          url: 'https://s3-us-west-2.amazonaws.com/earbyter-1/harpsicord1.m4a',
          mem_size: '651730',
          member_id: 2
        },
        {
          id: 2,
          name: 'birdchirps',
          description: 'damn cool bird chirps',
          keyword: 'nature',
          public: true,
          isFeatured: true,
          url: 'https://s3-us-west-2.amazonaws.com/earbyter-1/birdchirps1.m4a',
          mem_size: '315632',
          member_id: 2
        },
        {
          id: 3,
          name: 'motorcycle',
          description: 'annaying AF',
          keyword: 'road-rage',
          public: true,
          isFeatured: false,
          url: 'https://s3-us-west-2.amazonaws.com/earbyter-1/motorcycle1.m4a',
          mem_size: '393387',
          member_id: 3
        },
        {
          id: 4,
          name: 'wrong',
          description: 'and he means it',
          keyword: 'low-self-esteem',
          public: true,
          isFeatured: true,
          url: 'https://s3-us-west-2.amazonaws.com/earbyter-1/wrong.m4a',
          mem_size: '73338',
          member_id: 2
        },
        {
          id: 5,
          name: 'pignoises',
          description: 'not sexy at all',
          keyword: 'farm',
          public: true,
          isFeatured: false,
          url: 'https://s3-us-west-2.amazonaws.com/earbyter-1/pignoise.m4a',
          mem_size: '143438',
          member_id: 1
        },

      ];
      return knex('sound').insert(sounds);
    });
};
