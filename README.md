# SingleFileServer
A backend server that uploads and stores a single text file.

## Cloning
* Run ```git clone https://github.com/prushton2/SingleFileServer```
* Create ```.env```
* Add ```UPDATE_KEY={}``` which will be used for authentication for uploading information
* Add ```GET_KEY={}``` which will be used for authentication for retrieving information
    * Leaving either key as ```NULL``` will remove authentication for that function
* Run ```npm start```
* The upload endpoint is a post request at ```/upload```
    * Data will be returned as a string, so upload it as a string
* The get endpoint is a get request at the root endpoint (```/```)
* To create a valid hash: append the key to the unix time in seconds / 10 and hash with SHA256
* To run a test, run ```npm test```
    * The test uses the keys stored in the .env file