import { useState } from 'react'
import { useExercisesContext } from '../hooks/useExercisesContext'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { MoreVert, Edit, Delete, Add, Remove } from '@mui/icons-material'
import { URL } from '../App'

const ExerciseSettings = ({ exerciseid }) => {
    const { dispatch } = useExercisesContext()
    const [anchorEl, setAnchorEl] = useState(null)
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
        // TODO
        console.log('add clicked')
        handleMenuClose()
    }
    const handleRemoveClick = () => {
        // TODO
        console.log('remove clicked')
        handleMenuClose()
    }
    const handleDeleteClick = async () => {
        console.log(exerciseid)
        const response = await fetch(`${URL}/api/exercise/${exerciseid}`, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'DELETE_EXERCISE', payload: json })
        }

        handleMenuClose()
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
        </div>
    )
}

export default ExerciseSettings
