import { Container, Grid } from '@mui/material'
import React from 'react'
import AccountPdfReport from '../../Components/AccountingModeul/AccountPdfReport'

const index = () => {

    return (

        <>

            <section>

                <Container maxWidth="sm">

                    <Grid Container spacing={3}>

                        <Grid item xs={12}>

                            <AccountPdfReport />

                        </Grid>

                    </Grid>
                    
                </Container>

            </section>

        </>

    )

}

export default index
