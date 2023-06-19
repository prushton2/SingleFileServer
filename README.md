# SingleFileServer
A backend server that uploads and stores a single text file.

## Cloning
* Run ```git clone https://github.com/prushton2/SingleFileServer```
* Create ```.env```
* Add ```UPLOAD_KEY={}``` which will be used for authentication for uploading information
* Add ```GET_KEY={}``` which will be used for authentication for retrieving information
    * Leaving either key as ```NULL``` will remove authentication for that function
* Run ```npm start```
* The upload endpoint is a post request at /upload, the get endpoint is a get request at the root endpoint
* To create a valid hash: append the key to the unix time in seconds / 10 and hash with SHA256