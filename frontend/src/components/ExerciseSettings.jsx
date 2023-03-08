import { useState } from 'react'
import { useExercisesContext } from '../hooks/useExercisesContext'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { MoreVert, Edit, Delete, Add, Remove } from '@mui/icons-material'
import { URL } from '../App'
import AddExerciseModal from './AddExerciseModal'
import EditExerciseModal from './EditExerciseModal'

const ExerciseSettings = ({ workout, exerciseid }) => {
    const { dispatch } = useExercisesContext()
    const { dispatch: workoutsDispatch } = useWorkoutsContext()
    const [anchorEl, setAnchorEl] = useState(null)
    const [addModalOpen, setAddModalOpen] = useState(false)
    const [editModalOpen, setEditModalOpen] = useState(false)

    const handleMenuClick = (e) => {
        setAnchorEl(e.currentTarget)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
    }
    const handleEditClick = () => {
        setEditModalOpen(true)
        handleMenuClose()
    }
    const handleAddClick = () => {
        setAddModalOpen(true)
        handleMenuClose()
    }
    const handleRemoveClick = async () => {
        const response = await fetch(`${URL}/api/workout/${workout._id}/${exerciseid}`, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            workoutsDispatch({ type: 'UPDATE_WORKOUT', payload: json })
            console.log(`Removed ${exerciseid} from ${workout.name}`)
        }
        handleMenuClose()
    }
    const handleDeleteClick = async () => {
        const response = await fetch(`${URL}/api/exercise/${exerciseid}`, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'DELETE_EXERCISE', payload: json })
        }

        handleMenuClose()
    }

    const handleAddClose = () => {
        setAddModalOpen(false)
    }
    
    const handleEditClose = () => {
        setEditModalOpen(false)
    }

    return (
        <div>
            <IconButton aria-label="settings" onClick={handleMenuClick}>
                <MoreVert />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleEditClick}>
                    <Edit fontSize="small" />
                    Edit
                </MenuItem>
                <MenuItem onClick={handleAddClick}>
                    <Add fontSize="small" />
                    Add
                </MenuItem>
                <MenuItem onClick={handleRemoveClick}>
                    <Remove fontSize="small" />
                    Remove
                </MenuItem>
                <MenuItem onClick={handleDeleteClick}>
                    <Delete fontSize="small" />
                    Delete
                </MenuItem>
            </Menu>
            <AddExerciseModal open={addModalOpen} onClose={handleAddClose} workout={workout} exerciseid={exerciseid} />
            <EditExerciseModal open={editModalOpen} onClose={handleEditClose} exerciseid={exerciseid}/>
        </div>
    )
}

export default ExerciseSettings
