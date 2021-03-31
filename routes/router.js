const express = require("express");
const router = express.Router();
const templateData = require("../templateData.json");
const fs = require("fs").promises;
const formData = require("../formData.json");

router.get("/", async (req, res) => {
  // console.log(req.fingerprint.hash);
  // let renderData = formData.find((key) => key.hash == req.fingerprint.hash);
  let renderData = formData.find((key) =>
    key.hash == req.fingerprint.hash ? key : "none"
  );
  // console.log('renderData', renderData);

  let data = {
    templateData: templateData,
    hash: req.fingerprint.hash,
    vakken: templateData.vak.map((key) => ({
      title: key.title,
      short: key.short,
    })),
    type: renderData == undefined ? "normal" : "recurring",
    recurring: renderData != undefined ? renderData : null,
  };

  // console.log("data", data);

  return res.render("index", data);
});

router.post("/saveProgress", async (req, res) => {
  return await writeFile(
    "formData.json",
    JSON.stringify([{ hash: req.fingerprint.hash, userData: req.body }])
  ).then((result) => {
    return result ? res.render("confirm") : console.log(result);
  });

  // res.redirect('/')
});

router.post("/back", (req, res) => {
  res.redirect("/");
});

router.post("/handleEnquette", async (req, res) => {
  let z = req.body.oldData ? {...JSON.parse(req.body.oldData[0]),...req.body} : null
  
  if (z != null){
    delete z.oldData
    console.log(z)
    return writeFile(
      "formData.json",
      JSON.stringify([{ hash: req.fingerprint.hash, userData: z }])
    ).then(result => res.render('confirm'))
  }
  
      const a = req.body;
      const c = Object.values(a)
        .map((key) =>
          key == "" || (key[0] ? key[0] == "" && key[1] == "" : null)
            ? (key,console.log(key))
            : delete key
        )
        .filter((elem) => typeof elem != "boolean").length;
    
    
      var b = [];
      for (const key in a) {
        if (Object.hasOwnProperty.call(a, key)) {
          a[key] == "" ||
          (typeof a[key] == "object" &&
            a[key][0].length == 0 &&
            a[key][1].length == 0)
            ? key.endsWith("-week")
              ? (b[key] = {
                  length: 2,
                  type: "number",
                  titles: templateData.vak.find((elem) =>
                    elem.short == key.split("-").splice(0, 1).toString()
                      ? elem.title
                      : null
                  ),
                  id: key,
                  sort: key.split("-").splice(-1).toString(),
                  placeholder: '500123456',
                  pattern: '[0-9]{9}'
                })
              : (b[key] = {
                  length: 1,
                  type: "textarea",
                  titles: templateData.vak.find((elem) =>
                    elem.short == key.split("-").splice(0, 1).toString()
                      ? elem.title
                      : null
                  ),
                  id: key,
                  sort: key.split("-").splice(-1).toString(),
                  placeholder: 'Eigen inzichten',
                  pattern: ''
                })
            : delete key;
        }
      }
      const d = [...new Set(Object.values(b).map(key=> key.titles? key.titles.title : 'Gegevens'))]
      const e = Object.values(b).map((key, index) => key.titles ? key.titles.title == d[index] ? {section: d[index], data: key} : null : {section: 'Je gegevens', data: {
        length: 1,
        type: 'text',
        titles: {short:'studentnummer', title:'Je studentnummer'},
        id: key.id,
        sort: key.sort,
        placeholder: 'Je studentnummer',
        pattern: '[0-9]{9}'
      }} )

      const oldData = req.body
      oldData['name'] = req.body.name
  // console.log(oldData);

      return c > 0
        ? res.render("forgotten", { renderData: e, hash: req.fingerprint.hash, oldData: JSON.stringify(oldData), name: capitalizeFirstLetter(req.body.name) })
        : writeFile(
          "formData.json",
          JSON.stringify([{ hash: req.fingerprint.hash, userData: req.body }])
        ).then(result => res.redirect('/'))
});

router.post("/handleFetch", async (req, res) => {
  let mutate = Object.values(req.body).map(key => JSON.parse(key).data)
  let formData = Object.assign({}, ...mutate)
  writeFile(
    "formData.json",
    JSON.stringify([{ hash: req.fingerprint.hash, userData: formData }])).then(result => {return true })
  // return true;
})

async function writeFile(filename, content) {
  try {
    let a = await fs.writeFile(filename, content);
    console.log("✅ saved as:" + "\x1b[32m", filename);
    return new Promise((resolve, reject) => {
      if (true) {
        setTimeout(() => {
          // this will make promise fulfilled with result "result"
          resolve(true);
          // this will make promise rejected with result "error"
          // reject("error");
        }, 1);
      }
    });
  } catch (error) {
    console.log(error);
  }
  // const file = await fs.readFile(filename, "utf8");
  // await fs.writeFile(filename, content);
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = router;
