import React, { useState, useEffect, Fragment } from 'react';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import IconButton from '@material-ui/core/IconButton'
import CancelIcon from '@material-ui/icons/CancelOutlined'
import Dropzone from 'react-dropzone';
import axios from '../services/api';
import filesize from 'filesize';
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles'
import { uniqueId } from 'lodash';
import querystring from 'querystring'

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
    minHeight: '150px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  imagePreview: {
    width: '100%'
  },
  fileType: {
    padding: '30px 5px 5px 5px',
    textAlign: 'right',
    borderRadius: '5px',
    border: '1px solid #cdb402',
    color: '#cdb402',
    marginRight: '10px',
    width: '55px'
  },
  fileName: {
    fontWeight: 'bold',
    color: '#333'
  },
  fileSize: {
    fontWeight: 'light',
    color: '#bbb',
    paddingLeft: '10px'
  },
  errorMsg: {
    color: '#f2a',
    fontWeight: 'bold'
  }
}))

const BorderLinearProgress = withStyles({
  root: {
    height: 10,
    backgroundColor: lighten('#cdb402', 0.5),
  },
  bar: {
    borderRadius: 20,
    backgroundColor: '#cdb402',
  },
})(LinearProgress);

export default ({ field, form, ...props }) => {
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
    setFieldValue(field.name, uploadedFiles.filter(file => { return file.uploaded === true && file.id }).map(obj => { return obj.id; }))
  }, [uploadedFiles])


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

    setUploadedFiles(files => {
      return [...files, ...handleUploadedFiles]
    });
    handleUploadedFiles.forEach(processUpload);
  };

  const removeFile = id => {
    setUploadedFiles(files => files.filter(file => file.id !== id));
  }

  const updateFile = (id, data) => {
    setUploadedFiles(files => {
      return files.map(uploadedFile => {
        return id === uploadedFile.id
          ? { ...uploadedFile, ...data }
          : uploadedFile;
      })
    });
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
      .catch((error) => {
        updateFile(uploadedFile.id, {
          error: error
        });
      });
  };

  return (
    <Box mt={2}>
      <Dropzone
        accept='application/pdf, application/epub+zip, .mobi'
        onDrop={acceptedFiles => handleUpload(acceptedFiles)}
        multiple
      >
        {({ getRootProps, getInputProps }) => (
          <Fragment>
            <section className={classes.uploadBox}>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Clique ou arraste os arquivos aqui.</p>
              </div>
            </section>

            {uploadedFiles.length > 0 && (
              <Box>
                {
                  uploadedFiles.map(f => (
                    <Box key={f.id} py={2}>
                      <Box display="flex" width="100%">
                        <div className={classes.fileType}>{f.name.substring(f.name.lastIndexOf("."))}</div>
                        <Box display="flex" flexDirection="column" flexGrow="1">
                          <Box display="flex" alignItems="center" justifyContent="space-between">
                            <div>
                              <span className={classes.fileName}>{f.name}</span>
                              <span className={classes.fileSize}>{f.readableSize}</span>
                            </div>
                            {f.uploaded && (
                              <IconButton size="small" onClick={() => removeFile(f.id)}>
                                <CancelIcon />
                              </IconButton>
                            )}
                          </Box>
                          <BorderLinearProgress variant="determinate" value={f.progress} style={{ marginTop: '5px' }} />
                          {f.error && <span className={classes.errorMsg}>{f.error[0]}</span>}
                        </Box>
                      </Box>
                    </Box>
                  ))
                }
              </Box>
            )}
          </Fragment>
        )}
      </Dropzone>
    </Box>
  )
}
