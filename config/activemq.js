module.exports = {
  host: process.env.MQ_HOST || '127.0.0.1',
  port: parseInt(process.env.MQ_PORT || '61613', 10), // STOMP port
  connectHeaders: {
    host: process.env.MQ_VHOST || '/',
    login: process.env.MQ_USER || 'admin',
    passcode: process.env.MQ_PASSWORD || 'admin',
    'heart-beat': process.env.MQ_HEARTBEAT || '5000,5000',
    
  },
  demoQueue: process.env.MQ_DEMO_QUEUE || '/queue/demo',
};
