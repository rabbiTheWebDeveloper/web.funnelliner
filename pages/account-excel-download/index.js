import { Container, Grid } from '@mui/material'
import React from 'react'
import AccountExcelReport from '../../Components/AccountingModeul/AccountExcelReport'

const index = () => {

    return (

        <>

            <section>

                <Container maxWidth="sm">

                    <Grid Container spacing={3}>

                        <Grid item xs={12}>

                            <AccountExcelReport />

                        </Grid>

                    </Grid>
                    
                </Container>

            </section>

        </>

    )

}

export default index
