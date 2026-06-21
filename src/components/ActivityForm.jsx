import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, {  useActionState, useState } from 'react'
import { addActivity } from '../services/api';


export const ActivityForm = ({ onActivityAdded }) => {

  const [activity, setActivity] = useState({
    type: "", duration: '', caloriesBurned: '',
    addionalMetrics: {}
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addActivity(activity);
      onActivityAdded();
      setActivity({
        type: "", duration: '', caloriesBurned: '',
        addionalMetrics: {}
      }

      )

    } catch (error) {
      console.error(error);
    }
  }



  return (
    <Box component="form" sx={{ mb: 2 }} onSubmit={handleSubmit}>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Activity Type</InputLabel>
        <Select

          value={activity.type}

          onChange={(e) => { setActivity({ ...activity, type: e.target.value }) }}
        >
          <MenuItem value="RUNNING">Running</MenuItem>
          <MenuItem value="WALKING">Walking</MenuItem>
          <MenuItem value="CYCLING">Cycling</MenuItem>
          <MenuItem value="SWIMMING">Swimming</MenuItem>
          <MenuItem value="YOGA">Yoga</MenuItem>
          <MenuItem value="GYM">Gym Workout</MenuItem>
          <MenuItem value="HIKING">Hiking</MenuItem>
          <MenuItem value="DANCING">Dancing</MenuItem>
        </Select>
      </FormControl>

      <TextField fullWidth
        label="Duration"
        type='number'
        sx={{ mb: 2 }}
        value={activity.duration}
        onChange={(e) => { setActivity({ ...activity, duration: e.target.value }) }}
      />

      <TextField fullWidth
        label="Calories Burned"
        type='number'
        sx={{ mb: 2 }}
        value={activity.caloriesBurned}
        onChange={(e) => { setActivity({ ...activity, caloriesBurned: e.target.value }) }}
      />

      <Button type='submit' variant='contained'>
        Add Activity
      </Button>

    </Box>
  )
}
