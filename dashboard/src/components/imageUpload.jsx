import React, { useState, useEffect, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dropzone from 'react-dropzone';
import axios from '../services/api';
import filesize from 'filesize';
import querystring from 'querystring'
import { uniqueId } from 'lodash';
import ErrorIcon from '@material-ui/icons/Error'
import Link from '@material-ui/core/Link'

const useStyles = makeStyles(theme => ({
  uploadBox: {
    width: '100%',
    padding: '10px',
    textAlign: 'center',
    borderRadius: '10px',
    border: '1px dashed #ccc'
  },
  previewBox: {
    width: '100%',
    height: '150px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    overflow: 'hidden'
  },
  imagePreview: {
    width: '100%'
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
    background: 'rgba(0,0,0,0.5)',
    borderRadius: '5px',
    padding: '10px'
  }
}))

function ImageUpload({ field, form, ...props }) {
  const classes = useStyles()
  const { values, setFieldValue } = form;
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const getFiles = async (files) => {
    await axios.get(`/api/upload?${querystring.stringify({ 'files': JSON.stringify(files) })}`)
      .then(result =>
        setUploadedFiles(result.data.map(file => ({
          id: file._id,
          name: file.originalname,
          readableSize: filesize(file.size),
          url: file.url,
          uploaded: true,
          progress: 100
        })))
      )
  }

  useEffect(() => {
    if (field.value != "") {
      getFiles(field.value)
    }
  }, [])

  useEffect(() => {
    if (form.status == "sending") {
      setUploadedFiles([])
    }
  }, [form.status])

  const handleUpload = files => {
    const handleUploadedFiles = files.map(file => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null
    }));

    setUploadedFiles([...uploadedFiles, ...handleUploadedFiles]);
    handleUploadedFiles.forEach(processUpload);
  };

  const removeFile = id => {
    setUploadedFiles(files => files.filter(file => file.id !== id));
  }

  const updateFile = (id, data) => {
    setUploadedFiles(files => {
      data.uploaded && data.url && setFieldValue(field.name, data.id)

      return files.map(uploadedFile => {
        return id === uploadedFile.id
          ? { ...uploadedFile, ...data }
          : uploadedFile;
      })
    }
    );
  };

  const processUpload = uploadedFile => {
    const data = new FormData();

    data.append('file', uploadedFile.file, uploadedFile.name);

    axios
      .post('/api/upload', data, {
        onUploadProgress: e => {
          const progress = parseInt(Math.round((e.loaded * 100) / e.total));

          updateFile(uploadedFile.id, {
            progress
          });
        }
      })
      .then(response => {
        updateFile(uploadedFile.id, {
          uploaded: true,
          id: response.data._id,
          url: response.data.url
        });
      })
      .catch(() => {
        updateFile(uploadedFile.id, {
          error: true
        });
      });
  };

  return (
    <Box mt={2}>
      <Dropzone
        accept='image/jpeg, image/png'
        onDrop={acceptedFiles => handleUpload(acceptedFiles)}
      >
        {({ getRootProps, getInputProps }) => (
          <Fragment>
            {uploadedFiles.length > 0 ? (
              <Box>
                {
                  uploadedFiles.map(f => (
                    <Box key={f.id}>
                      {f.uploaded ? (
                        <>
                          <Box className={classes.previewBox}>
                            <img src={f.url} className={classes.imagePreview} />
                          </Box>
                          <Link onClick={() => removeFile(f.id)}>Remover Imagem</Link>
                        </>
                      ) : (
                          <Box display="flex" style={{ backgroundImage: `url(${f.preview})` }} justifyContent="center" alignItems="center" className={classes.previewBox}>
                            {!f.error ? (
                              <CircularProgress
                                variant="static"
                                value={f.progress}
                                color="secondary"
                              />
                            ) : (
                                <Box display="flex" alignItems="center" justifyContent="center" className={classes.error}>
                                  <ErrorIcon style={{ marginRight: '5px' }} />
                                  <span>Ocorreu um erro</span>
                                </Box>
                              )}

                          </Box>
                        )}

                    </Box>
                  ))
                }
              </Box>
            ) : (
                <section className={classes.uploadBox}>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Clique ou arraste a imagem aqui.</p>
                  </div>
                </section>
              )}

          </Fragment>
        )}
      </Dropzone>
    </Box>
  );
}

export default ImageUpload;