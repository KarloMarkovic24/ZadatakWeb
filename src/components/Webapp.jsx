import React, {Component,useState} from "react";
import axios from 'axios';
import './Webapp.css';
import { SERVER_API_URL } from "../constants";


class WebApp extends Component{
    render () {
        return (
            <header className="App-header">
                <div className="WebApp">
                    <p>Click on the "Choose File" button to upload a file:</p>
                    <UploadComponent/>
                </div>
            </header>
        )
    }
}

export const UploadComponent = () => {

        const [selectedFile, setSelectedFile] = useState()
        const [selectedFileName, setSelectedFileName] = useState('')
        
        const handleSelectFile = e => {
            setSelectedFile(e.target.files[0])
            setSelectedFileName(e.target.files[0].name)
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
            }
            
        }
  
        return (
            <div className="input-group justify-content-start">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroupFileAddon01" onClick = {handleUpload}>Upload</span>
            </div>
            <div className="custom-file">
              <input type="file" className="custom-file-input" id="inputGroupFile01"
                aria-describedby="inputGroupFileAddon01" onChange = {handleSelectFile}/>
              <label className="custom-file-label" htmlFor="inputGroupFile01">{selectedFileName ? selectedFileName : 'Choose file' }</label>
            </div>
          </div>
        )
}

export default WebApp