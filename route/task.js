const router = require('express').Router();
const authMiddleware  = require('../middleware/middleware');
const Task = require('../models/task');
const User = require('../models/user')

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.userId;

    // Check if userId exists in the database
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Create the task
    const task = await Task.create({ title, description, userId });
    return res.status(201).json(task);
  } catch (err) {  
    return res.status(400).json({ message: 'Error creating task', error: err.message });
  }
});


// Update task
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const [updated] = await Task.update({ title, description, completed }, { where: { id } });
    
    if (updated) {
      const updatedTask = await Task.findByPk(id);
      return res.status(200).json(updatedTask);
    }

    return res.status(404).json({ message: 'Task not found' });
  } catch (err) {
    return res.status(400).json({ message: 'Error updating task', error: err.message });
  }
});

// Delete task
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Task.destroy({ where: { id } });

    if (deleted) {
      return res.status(200).json({ message: 'Task successfully deleted' });
    }

    return res.status(404).json({ message: 'Task not found' });
  } catch (err) {
    return res.status(400).json({ message: 'Error deleting task', error: err.message });
  }
});

// Get tasks by completion status
router.get('/status', authMiddleware, async (req, res) => {
  try {
    const { completed } = req.query;
    const userId = req.userId;

    // Validate the completed parameter
    if (completed !== undefined && !['true', 'false'].includes(completed)) {
      return res.status(400).json({ message: 'Invalid completed status. Use "true" or "false".' });
    }

    // Convert completed query parameter to boolean if it's 'true' or 'false'
    const completedStatus = completed === 'true' ? true : completed === 'false' ? false : undefined;

    // Query tasks based on the completed status
    const tasks = await Task.findAll({
      where: {
        userId,
        ...(completedStatus !== undefined ? { completed: completedStatus } : {})
      }
    });
    return res.status(200).json(tasks);
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get a single task by id
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.status(200).json(task);
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;

