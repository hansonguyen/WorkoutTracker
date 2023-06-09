import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { MoreVert, Edit, Delete } from '@mui/icons-material'
import { URL } from '../App'

const WorkoutSettings = ({ workoutid }) => {
    const { dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState(null)
    const handleMenuClick = (e) => {
        setAnchorEl(e.currentTarget)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
    }
    const handleEditClick = () => {
        navigate(`/workouts/${workoutid}/edit`)
        handleMenuClose()
    }
    const handleDeleteClick = async () => {
        if (!user) {
            return
        }
        const response = await fetch(`${URL}/api/workout/${workoutid}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'DELETE_WORKOUT', payload: json })
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
                <MenuItem onClick={handleDeleteClick}>
                    <Delete fontSize="small" />
                    Delete
                </MenuItem>
            </Menu>
        </div>
    )
}

export default WorkoutSettings
