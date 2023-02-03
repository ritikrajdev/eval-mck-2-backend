require('dotenv').config();

module.exports = {
  'development': {
    'username': process.env.DATABASE_USER,
    'password': process.env.DATABASE_PASSWORD,
    'database': 'database_dev',
    'host': '127.0.0.1',
    'dialect': 'postgres',
  },
  'test': {
    'username': process.env.DATABASE_USER,
    'password': process.env.DATABASE_PASSWORD,
    'database': 'database_test',
    'host': '127.0.0.1',
    'dialect': 'postgres',
  },
  'production': {
    'username': process.env.DATABASE_USER,
    'password': process.env.DATABASE_PASSWORD,
    'database': 'database_prod',
    'host': '127.0.0.1',
    'dialect': 'postgres',
  }
};
