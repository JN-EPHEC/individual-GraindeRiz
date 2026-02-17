import sequelize from '../config/database.js';
import User from '../models/User.js';

async function seedUsers() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    await User.destroy({ where: {} });
    await User.bulkCreate([
      { firstName: 'Jean', lastName: 'Dupont' },
      { firstName: 'Sophie', lastName: 'Martin' },
      { firstName: 'John', lastName: 'Doe' },
    ]);

    console.log('Seed terminé: 3 users ajoutés.');
  } catch (error) {
    console.error('Erreur pendant le seed:', error);
  } finally {
    await sequelize.close();
  }
}

seedUsers();
