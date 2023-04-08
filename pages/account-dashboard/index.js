import { Container, Grid } from '@mui/material'
import React from 'react'
import AccountDashboard from '../../Components/AccountingModeul/AccountDashboard'

const index = () => {

    return (

        <>

            <section>

                <Container maxWidth="sm">

                    <Grid Container spacing={3}>

                        <Grid item xs={12}>

                            <AccountDashboard></AccountDashboard>

                        </Grid>

                    </Grid>
                    
                </Container>

            </section>

        </>

    )

}

export default index
