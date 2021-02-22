import React, {Component,useState} from "react";
import axios from 'axios';
import { SERVER_API_URL } from "../constants";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class WebApp extends Component{
    render () {
        return (
                <div className = "webapp">
                    <ToastContainer/>
                    <div className="centered">
                        <p>Click on the "Choose File" button to upload a file:</p>
                        <UploadComponent/>
                    </div>
                </div>
        )
    }
}

export const UploadComponent = () => {

        const [selectedFile, setSelectedFile] = useState()
        const [selectedFileName, setSelectedFileName] = useState('')
        
        const handleSelectFile = e => {
            if(e.target.files[0]){
            setSelectedFile(e.target.files[0])
            setSelectedFileName(e.target.files[0].name)
            }
        }
        

        const handleUpload = e => {
            if(selectedFile){
                const formData = new FormData()
                formData.append('file', selectedFile)
                const config = {
                    headers : {
                        "Content-Type" : "multipart/form-data"
                    }
                }

                axios.post(`${SERVER_API_URL}/api/csv-to-user`, formData, config)
                .then(() => toast.success("Saved successful !"))
                .catch((err) => toast.error(err.response && err.response.data && err.response.data.message ? err.response.data.message.toString() : err.message.toString()))
            }
        }
  
        return (
            <div className="input-group">
            <div className="input-group-prepend">
              <button className="input-group-text" id="inputGroupFileAddon01" onClick = {handleUpload}>Upload</button>
            </div>
            <div className="custom-file">
              <input type="file" className="custom-file-input" id="inputGroupFile01" style={{cursor: 'pointer'}}
                aria-describedby="inputGroupFileAddon01" onChange = {handleSelectFile}/>
              <label className="custom-file-label" htmlFor="inputGroupFile01">{selectedFileName ? selectedFileName : 'Choose file' }</label>
            </div>
          </div>
        )
}

export default WebApp