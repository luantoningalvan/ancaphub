import React from 'react'
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles({
    uploadInput: {
        backgroundColor: "#00aaff",
        height: '45px'
    }
})

function Upload(props){
    const [completed, setCompleted] = React.useState(0)
    const [file, setFile] = React.useState(0)
    const classes = useStyles()

    React.useEffect(() => {
        function progress() {
        setCompleted(oldCompleted => {
            if (oldCompleted === 100) {
            return 0
            }
            const diff = Math.random() * 10
            return Math.min(oldCompleted + diff, 100)
        })
        }
    
        const timer = setInterval(progress, 500)
        return () => {
        clearInterval(timer)
        }
    }, [])

    return(
    <div>
        <Button
        variant="contained"
        component="label"
        >
        <input
            type="file"
            style={{ display: "none" }}
            onChange={console.log()}
        />
        {file}
        <CloudUploadIcon />
        </Button>
        <LinearProgress variant="determinate" value={completed} />
    </div>
    )
}

export default Upload 