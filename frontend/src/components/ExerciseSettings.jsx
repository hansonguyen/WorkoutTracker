import { useState } from 'react'
import { useExercisesContext } from '../hooks/useExercisesContext'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { MoreVert, Edit, Delete, Add, Remove } from '@mui/icons-material'
import { URL } from '../App'
import AddExerciseModal from './AddExerciseModal'

const ExerciseSettings = ({ workout, exerciseid }) => {
    const { dispatch } = useExercisesContext()
    const [anchorEl, setAnchorEl] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)

    const handleMenuClick = (e) => {
        setAnchorEl(e.currentTarget)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
    }
    const handleEditClick = () => {
        // TODO
        console.log('edit clicked')
        handleMenuClose()
    }
    const handleAddClick = () => {
        setModalOpen(true)
        handleMenuClose()
    }
    const handleRemoveClick = async () => {
        const response = await fetch(`${URL}/api/workout/${workout._id}/${exerciseid}`, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'UPDATE_WORKOUT', payload: json })
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

    const handleClose = () => {
        setModalOpen(false)
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
            <AddExerciseModal open={modalOpen} onClose={handleClose} workout={workout} exerciseid={exerciseid} />
        </div>
    )
}

export default ExerciseSettings
