import { useState } from 'react';
import {
  Button,
  Modal,
  TextField,
  Typography
} from '@mui/material';

const NewExerciseModal = ({ open, onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
    console.log('Submitted:', name, description);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="new-exercise-modal-title"
      aria-describedby="new-exercise-modal-description"
    >
      <div className='new-exercise-modal'>
        <h4>
          New Exercise
        </h4>
        <form onSubmit={handleSubmit}>
          <input
            label="Name"
            value={name}
            onChange={handleNameChange}
          />
          <input
            label="Description"
            value={description}
            onChange={handleDescriptionChange}
          />
          <button type="submit">
            Submit
          </button>
          <button onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default NewExerciseModal;
