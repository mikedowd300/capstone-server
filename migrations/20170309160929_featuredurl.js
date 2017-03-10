exports.up = function(knex, Promise) {
  return knex.schema.createTable('featuredurl', function(table){
    table.increments();
    table.string('url')
    table.boolean('isFeatured');
    table.integer('member_id').unsigned();
    table.foreign('member_id').references('member.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('featuredurl');
};
