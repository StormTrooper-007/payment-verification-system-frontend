import { Box, Grid } from "@mui/material";
import CardComponent from "../CardComponent";
import {data} from "../data";


export default function Home() {
    
  return (
    <Box sx={{m:2}}>
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {data.map((element) => (
          <Grid item xs={2} sm={4} md={4} key={element.id}>
            <CardComponent element={element}/>
          </Grid>
        ))}
      </Grid>
    </Box>
        
    </Box>
  )
}
