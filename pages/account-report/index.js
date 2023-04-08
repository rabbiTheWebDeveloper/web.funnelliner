import { Container, Grid } from '@mui/material'
import React from 'react'
import AccountReport from '../../Components/AccountingModeul/AccountReport'

const index = () => {

    return (

        <>

            <section>

                <Container maxWidth="sm">

                    <Grid Container spacing={3}>

                        <Grid item xs={12}>

                            <AccountReport />

                        </Grid>

                    </Grid>
                    
                </Container>

            </section>

        </>

    )

}

export default index
