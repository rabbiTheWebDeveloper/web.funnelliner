import { Container, Grid } from '@mui/material';
import React from 'react';
import BkashDashboard from '../../Components/BkashMarcent/BkashDashboard';


const Plugin = () => {

    


    // const label = {inputProps: {'aria-label': 'Switch demo'}};

    return (

        <>

            <section className=''>

                <Container maxWidth="sm">

                    {/* CourierContent */}
                    <div className="AddonsContent">

                        <Grid container spacing={3}>

                            <Grid item md={12}>

                               <BkashDashboard></BkashDashboard>

                            </Grid>

                        </Grid>

                    </div>

                </Container>

            </section>

        </>

    )

}

export default Plugin