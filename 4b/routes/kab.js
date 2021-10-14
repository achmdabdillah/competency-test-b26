const router = require("express").Router();
// import db connection
const dbConnection = require("../connection/db");
const uploadFile = require("../middleware/uploadFile");
const pathFile = "http://localhost:5000/uploads/";

// render add district page
router.get('/add', (req, res) => {

    const query = "SELECT provinsi_tb.id, provinsi_tb.nama FROM provinsi_tb ORDER BY nama"

    dbConnection.getConnection((err, conn) => {
        conn.query(query, (err, provinsi) => {
            if (err) throw err;

            res.render('kabupaten/add-kab', { 
                title: "Tambah Kabupaten",
                provinsi
            })
        })
        conn.release()
    })
})

// add district
router.post("/add", uploadFile("photo"), function (req, res) {
    let {nama, provinsi_id, diresmikan} = req.body;
    let photo = req.file.filename

    const query = "INSERT INTO kabupaten_tb (nama, provinsi_id, diresmikan, photo) VALUES (?,?,?,?)"

    dbConnection.getConnection((err, conn) => {
        if (err) throw err;
    
        conn.query(query, [nama, provinsi_id, diresmikan, photo], (err, result) => {

          if (err) {
            req.session.message = {
              type: "danger",
              message: "server error",
            };
            res.redirect("/");
          } else {
            req.session.message = {
              type: "success",
              message: "District added successfully",
            };
    
            res.redirect(`/province/${provinsi_id}`);
          }
        });
    conn.release()
    });
});

// render edit district
router.get('/edit/:id', (req, res) => {
    const { id } = req.params;
  
    const query1 = "SELECT * FROM kabupaten_tb WHERE id = ?"
    const query2 = "SELECT provinsi_tb.id, provinsi_tb.nama FROM provinsi_tb ORDER BY nama"
  
    dbConnection.getConnection((err, conn) => {
  
      conn.query(query1, [id], (err, results) => {
          conn.query(query2, [id], (err, provinsi) => {
              if (err) throw err;
              const kabupaten = {
                ...results[0],
                photo: pathFile + results[0].photo,
              };
              const date = new Date(kabupaten.diresmikan);
              const month =  
        
              res.render('kabupaten/edit-kab', {
                title: "Edit Kabupaten Info",
                kabupaten,
                provinsi
              })
          })
      })
      conn.release()
    })
  })
  
// edit district
router.post("/edit/:id", uploadFile("photo"), function (req, res) {
    let { id, nama, provinsi_id, diresmikan, oldImage} = req.body;

    let photo = '';
    
    if (req.file) {
        photo = req.file.filename
    } else {
        photo = oldImage.replace(pathFile, "");
    }

  
    const query = "UPDATE kabupaten_tb SET nama = ?, provinsi_id = ?, diresmikan = ?, photo = ? WHERE id = ?";
  
    dbConnection.getConnection((err, conn) => {
      if (err) throw err;
  
      conn.query(query, [nama, provinsi_id, diresmikan, photo, id], (err, results) => {
  
        if (err) {
          console.log(err);
        }
        res.redirect(`/province/${provinsi_id}`);
      });
  
      conn.release();
    });
});

// handle delete district
router.get("/delete/:id", function (req, res) {
    const { id } = req.params;
  
    const query = "DELETE FROM kabupaten_tb WHERE id = ?";
  
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
          message: "District deleted successfully",
        };
        res.redirect("/province.req.session.url");
      });
  
      conn.release();
    });
});

module.exports = router;