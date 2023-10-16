import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Data } from './data'


type props = {
    element:Data
}



export default function CardComponent({element}:props) {
    const navigate = useNavigate()
  return (
    <Card sx={{ maxWidth: 345 }}>
    <CardMedia
      sx={{ height: 140 }}
      image={element.photo}
      title={element.name}
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {element.name}
      </Typography>
    <div>{element.price} EUR </div>

    </CardContent>
    <CardActions>
      <Button size="small" variant="contained" onClick={()=> navigate(`/checkout/${element.id}`) }>Checkout</Button>
    </CardActions>
  </Card>
 
  )
}
