import React from 'react';
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField';

function ImageUpload({field, form, ...props}) {
    const { values, errors, touched, handleChange, handleBlur } = form
    
    return (
        <React.Fragment>
            <Box my={2}>
                <TextField
                    variant="outlined"
                    fullWidth
                    label="Capa (link da imagem)"
                    name="cover"
                    value={values.cover}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={(errors.cover && touched.cover) && errors.cover}
                />
            </Box>

            { values.cover != "" && (
                <div style={{overflow: "hidden"}}>
                    <img src={values.cover} style={{ width: '100%' }} />
                </div>
            )}
            </React.Fragment>
    )
}

export default ImageUpload