// controllers/emailController.js
// const agenda = require('../config/agenda');

// const scheduleEmail = async (req, res) => {
//   const { to, subject, text, delay } = req.body; // delay in seconds

//   try {
//     // Schedule the email using Agenda
//     await agenda.schedule(`in ${delay} seconds`, 'sendEmail', { to, subject, text });
//     res.status(200).json({ message: 'Email scheduled successfully' });
//   } catch (error) {
//     console.error('Error scheduling email:', error);
//     res.status(500).json({ error: 'Failed to schedule email' });
//   }
// };

// module.exports = { scheduleEmail };

const agenda = require('../config/agenda');

// Handler to process the email sequence
const scheduleEmailSequence = async (req, res) => {
  const { nodes } = req.body;
  const userId = req.user._id;
  try {
    // Start scheduling from the first node
    await scheduleNode(nodes, 0,userId);
    res.status(200).json({ message: 'Email sequence scheduled successfully' });
  } catch (error) {
    console.error('Error scheduling email sequence:', error);
    res.status(500).json({ error: 'Failed to schedule email sequence' });
  }
};

// Function to schedule nodes recursively
const scheduleNode = async (nodes, index,userId) => {
  if (index >= nodes.length) return;

  const currentNode = nodes[index];
  try {
    if (currentNode.type === 'email') {
      const { to, subject, body } = currentNode.data;
      await agenda.schedule('now', 'sendEmail', { to, subject, body ,userId});
    } else if (currentNode.type === 'wait') {
      const delayTime = `${currentNode.data.waitFor} ${currentNode.data.waitType}`;
      console.log(`Scheduling nextNode after ${delayTime}`);
      await agenda.schedule(delayTime, 'nextNode', { nodes, index: index + 1 ,userId });
      return;
    }
  } catch (error) {
    console.error(`Error scheduling node ${currentNode.id}:`, error);
  }

  await scheduleNode(nodes, index + 1,userId );
};


// Define the 'nextNode' job for Agenda
agenda.define('nextNode', async (job) => {
  const { nodes, index ,userId } = job.attrs.data;
  await scheduleNode(nodes, index,userId );
});

module.exports = { scheduleEmailSequence };
