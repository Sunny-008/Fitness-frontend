import { Card, CardContent, Grid, Typography } from '@mui/material';
import React, { Activity, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { getActivities } from '../services/api';

const ActivityList = () => {

  const [activies, setActivies] = useState([])
  const navigate = useNavigate();

  const fetchActivites = async ()=>{
    try {
      const respons = await getActivities();
      setActivies(respons.data);

    } catch (error) {
      console.error(error);
    }
  }


  useEffect(()=>{
    fetchActivites();
  }, []);

  return (
    <Grid container spacing={2}>
      {activies.map((activity) => (
        <Grid container spacing={{xs: 2, md: 2}} columns={{xs: 4, sm:8, md: 12}}>
          <Card sx={{cursor: 'pointer'}}
          onClick={()=> navigate(`/activities/${activity.id}`)}>
            <CardContent>
              <Typography variant='h6'>
                {activity.type}
              </Typography>
              <Typography  >
               Duration: {activity.duration}
              </Typography>
              <Typography  >
               Calories: {activity.caloriesBurned}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default ActivityList