exports.up = function(knex, Promise) {
  return knex.schema.createTable('member', function(table){
    table.increments();
    table.string('email').unique();
    table.string('password');
    table.string('type');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('member');
};
