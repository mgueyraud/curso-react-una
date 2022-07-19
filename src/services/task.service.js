const httpStatus = require('http-status');
const { Task } = require('../models');
const ApiError = require('../utils/ApiError');

const createTask = async (taskBody) => {
  return Task.create(taskBody);
};

const getTaskById = async (id) => {
  return Task.findById(id);
};

const queryTasks = async (options) => {
  const tasks = await Task.paginate(null, options);
  return tasks;
};

const updateTaskById = async (id, body) => {
  const task = await getTaskById(id);
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Task not found');
  }
  Object.assign(task, body);
  await task.save();
  return task;
};

const deleteTaskById = async (id) => {
  const task = await getTaskById(id);
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Task not found');
  }
  await task.remove();
  return task;
};

module.exports = {
  createTask,
  queryTasks,
  getTaskById,
  updateTaskById,
  deleteTaskById,
};
