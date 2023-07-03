import React, { useState, useEffect } from 'react';
import { getAllTasks, addTask, updateTask, deleteTask } from './utils/HandleApi';
import './Todo.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, InputGroup, FormControl, ListGroup } from 'react-bootstrap';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [editingText, setEditingText] = useState('');

  useEffect(() => {
    getAllTasks().then((data) => setTasks(data));
  }, []);

  const handleAddTask = () => {
    addTask({ text: newTask }).then((data) => setTasks([...tasks, data]));
    setNewTask('');
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setEditingText(task.text);
  };

  const handleSaveTask = () => {
    updateTask(editingTask.id, { text: editingText }).then((data) =>
      setTasks(tasks.map((task) => (task.id === data.id ? data : task)))
    );
    setEditingTask(null);
    setEditingText('');
  };

  const handleDeleteTask = (id) => {
    deleteTask(id).then(() => setTasks(tasks.filter((task) => task.id !== id)));
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">To-Do List</h1>
      <InputGroup className="mb-3">
        <FormControl placeholder="Add task" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
        <Button variant="success" onClick={handleAddTask}>Add Task</Button>
      </InputGroup>

      <ListGroup>
        {tasks.map((task) => (
          <ListGroup.Item key={task.id} className="d-flex justify-content-between align-items-center">
            {editingTask && editingTask.id === task.id ? (
              <div>
                <FormControl value={editingText} onChange={(e) => setEditingText(e.target.value)} />
                <Button variant="primary" className="ml-2" onClick={handleSaveTask}>Save</Button>
              </div>
            ) : (
              <div>
                <span>{task.text}</span>
                <Button variant="warning" className="mx-2" onClick={() => handleEditTask(task)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDeleteTask(task.id)}>Delete</Button>
              </div>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default App;