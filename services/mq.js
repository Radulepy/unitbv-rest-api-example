const stompit = require('stompit');
const mqConfig = require('../config/activemq');

function getConnection(callback) {
  const connectOptions = {
    host: mqConfig.host,
    port: mqConfig.port,
    connectHeaders: mqConfig.connectHeaders,
  };
  console.log('[MQ] Connecting', { host: connectOptions.host, port: connectOptions.port, user: connectOptions.connectHeaders.login });
  stompit.connect(connectOptions, (err, client) => {
    if (err) {
      console.error('[MQ] Connect error:', err && err.message ? err.message : err);
      if (Array.isArray(err?.errors) && err.errors.length) {
        console.error('[MQ] Inner errors:', err.errors.map(e => e.message || String(e)));
      }
    } else {
      console.log('[MQ] Connected');
    }
    callback(err, client);
  });
}

function sendToQueue(queue, message, callback) {
  getConnection((err, client) => {
    if (err) return callback && callback(err);
    const headers = {
      destination: queue,
      'content-type': 'application/json',
    };
    const payload = typeof message === 'string' ? message : JSON.stringify(message);
    console.log('[MQ] Sending', { destination: queue, payload });
    const frame = client.send(headers);
    frame.write(payload);
    frame.end();
    console.log('[MQ] Sent', { destination: queue });
    client.disconnect();
    if (callback) callback(null, { ok: true });
  });
}

module.exports = { sendToQueue };
