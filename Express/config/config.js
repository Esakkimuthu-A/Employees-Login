require('dotenv').config();

CONFIG={}


CONFIG.db_host=process.env.DB_HOST;
CONFIG.db_name=process.env.DB_NAME;
CONFIG.db_user=process.env.DB_USER;
CONFIG.db_password=process.env.DB_PASSWORD;
CONFIG.db_port=process.env.DB_PORT;


CONFIG.max_pool_conn = process.env.MAX_POOL_CONN || '50';
CONFIG.min_pool_conn = process.env.MIN_POOL_CONN || '0';
CONFIG.conn_idle_time = process.env.CONN_IDLE_TIME || '10000';

CONFIG.jwt_encryption = process.env.JWT_ENCRYPTION || 'please_change';
CONFIG.jwt_expiration = process.env.JWT_EXPIRATION || '1800000';
CONFIG.refresh_token_expiration = process.env.REFRESH_TOKEN_EXPIRATION || '1800000';

CONFIG.secretKey = process.env.SECRETKEY || 'myapp';













// console.log('db',DB_HOST);