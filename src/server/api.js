import { fetchEntries, insertEntries } from "./Database"
import bodyparser from 'body-parser'
import fs from 'fs'
import csvtojson from 'csvtojson'
import multer from 'multer'
import path from 'path'


//! Use of Multer
var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, './uploads/')
  },
  filename: (req, file, callBack) => {
    callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

var upload = multer({
  storage: storage
});

const parseCSv = async (filePath) => {
  let stream = fs.createReadStream(filePath);
  return csvtojson().fromStream(stream)
}

const createApi = (app) => {
  app.use(bodyparser.json())
  app.use(bodyparser.urlencoded({
    extended: true
  }))


  app.get('/entries', async (req, res, next) => {
    const result = await fetchEntries()
    res.json(result)
  })

  app.post('/', upload.single("uploadfile"), async (req, res) => {
    const jsonArray = await parseCSv(__dirname + '/../uploads/' + req.file.filename);
    await insertEntries(jsonArray)
    res.redirect('/')
  })

  app.get('*', (req, res, next) => {
    compiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {
      if (err) {
        return next(err)
      }
      res.set('content-type', 'text/html')
      res.send(result)
      res.end()
    })
  })
}

export default createApi;