const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'test-producer',
  brokers: ['localhost:9092'],
});

const producer = kafka.producer({ allowAutoTopicCreation: true });

async function run() {
  await producer.connect();
  console.log('Producer connected');

  const payload = { totalCapacity: 750 };

  await producer.send({
    topic: 'totalCapacity-reconciliation',
    messages: [{ value: JSON.stringify(payload) }],
  });

  console.log('Event sent:', payload);
  await producer.disconnect();
}

run().catch(console.error);
