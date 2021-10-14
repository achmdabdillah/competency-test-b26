const router = require("express").Router();
// import db connection
const dbConnection = require("../connection/db");
const uploadFile = require("../middleware/uploadFile");
const pathFile = "http://localhost:5000/uploads/";

// render add province
router.get('/add', (req, res) => {
    res.render('provinsi/add-prov', { 
        title: "Tambah Provinsi"
    })
})

// render detail provinsi
router.get('/:id', (req, res) => {
    const {id} = req.params

    const query1 = "SELECT * from provinsi_tb WHERE id = ?"
    const query2 = "SELECT * from kabupaten_tb WHERE provinsi_id = ?"

    dbConnection.getConnection((err, conn) => {
        if (err) throw err;

        conn.query(query1, [id], (err, provinsi) => {
          conn.query(query2, [id], (err, kabupaten) => {
            
            res.render("provinsi/detail-prov", { 
              title: "Detail Provinsi",
              provinsi,
              kabupaten
            });
          })
          conn.release()
        })
    })
})

// add province
router.post("/add", uploadFile("photo"), function (req, res) {
    let {nama, diresmikan, pulau} = req.body;
    let photo = req.file.filename

    const query = "INSERT INTO provinsi_tb (nama, diresmikan, photo, pulau) VALUES (?,?,?,?)"

    dbConnection.getConnection((err, conn) => {
        if (err) throw err;
    
        conn.query(query, [nama, diresmikan, photo, pulau], (err, result) => {

          if (err) {
            req.session.message = {
              type: "danger",
              message: "server error",
            };
            res.redirect("/");
          } else {
            req.session.message = {
              type: "success",
              message: "Province added successfully",
            };
    
            res.redirect(`/`);
          }
        });
    conn.release()
    });
});

// render edit province
router.get('/edit/:id', (req, res) => {
    const { id } = req.params;
  
    const query = "SELECT * FROM provinsi_tb WHERE id = ?"
  
    dbConnection.getConnection((err, conn) => {
  
      conn.query(query, [id], (err, results) => {
        if (err) throw err;
        const province = {
          ...results[0],
          photo: pathFile + results[0].photo,
        };
  
        res.render('provinsi/edit-prov', {
          title: "Edit Provinsi Info",
          province
        })
      })
      conn.release()
    })
  })
  
// edit province
router.post("/edit/:id", uploadFile("photo"), function (req, res) {
    let { id, nama, diresmikan, oldImage} = req.body;
  
    let photo = '';
    
    
    if (req.file) {
        photo = req.file.filename
    } else {
        photo = oldImage.replace(pathFile, "");
    }
  
    const query = "UPDATE provinsi_tb SET nama = ?, diresmikan = ?, photo = ? WHERE id = ?";
  
    dbConnection.getConnection((err, conn) => {
      if (err) throw err;
  
      conn.query(query, [nama, diresmikan, photo, id], (err, results) => {
  
        if (err) {
          console.log(err);
        }
        res.redirect(`/`);
      });
  
      conn.release();
    });
});

// handle delete province
router.get("/delete/:id", function (req, res) {
    const { id } = req.params;
  
    const query = "DELETE FROM provinsi_tb WHERE id = ?";
  
    dbConnection.getConnection((err, conn) => {
      if (err) throw err;
  
      conn.query(query, [id], (err, results) => {
        if (err) {
          req.session.message = {
            type: "danger",
            message: err.message,
          };
          res.redirect("/");
        }
  
        req.session.message = {
          type: "success",
          message: "Province deleted successfully",
        };
        res.redirect("/");
      });
  
      conn.release();
    });
});
  
module.exports = router;