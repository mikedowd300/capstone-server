exports.up = function(knex, Promise) {
  return knex.schema.createTable('sound', function(table){
    table.increments();
    table.string('name');
    table.string('description');
    table.string('genre');
    table.boolean('public').defaultTo(true);
    table.boolean('isFeatured').defaultTo(false);
    table.string('url');
    table.integer('mem_size');
    table.integer('member_id').unsigned();
    table.foreign('member_id').references('member.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('sound');
};
