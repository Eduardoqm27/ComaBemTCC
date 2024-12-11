'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('TbProduto', 'categoria', {
      type: Sequelize.ENUM('verdura', 'legume', 'fruta', 'kit'),
      allowNull: false,
      defaultValue: 'fruta', // Define um valor padrão, se necessário
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove a coluna e os valores ENUM ao desfazer a migração
    await queryInterface.removeColumn('TbProduto', 'categoria');

    // Opcional: Remover o ENUM do banco de dados
    await queryInterface.sequelize.query("DROP TYPE IF EXISTS \"enum_TbProduto_categoria\";");
  }
};
