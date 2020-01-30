const fs = require("fs");
if(process.argv.length===3){
    if (process.argv[2] == "list") {
        fs.readFile("./note.json", "utf8", function (err, data) {
            const notes = JSON.parse(data);
            console.log("Printings " + notes.length + " note (s)");
            notes.map(el => console.log("\n Title:" + el.title + "\n Body:" + el.body));
        });
    }
    else console.log("verify your commande")
}
else if (process.argv[3] != "--title" && process.argv.length > 3)
  console.log("Missing required argument:--title");
else if (!process.argv[4]) console.log("Missing required title");
else {
  switch (process.argv[2]) {
    case "read": {
          fs.readFile("./note.json", "utf8", function (err, data) {
              const note = JSON.parse(data);
              const speceficNote = note.filter(el => el.title == process.argv[4]);
              if (speceficNote.length > 0) {
                  console.log("Note found ");
                  console.log(
                      "\n Title :" +
                      speceficNote[0].title +
                      "\n Body : " +
                      speceficNote[0].body
                  );
              } else console.log("Note not found");
          });
          break;
      }

    case "remove": {
      fs.readFile("./note.json", "utf8", function(err, data) {
        const very = JSON.parse(data);
        const veryNote = very.filter(el => el.title != process.argv[4]);
        veryNote.map(el =>
          console.log(
            "\n Title:" + veryNote[0].title + "\n Body:" + veryNote[0].body
          )
        );
        fs.writeFile("./note.json", JSON.stringify(veryNote), err => {
          if (err) {
            console.error(err);
            return;
          }
        });
      });
      break;
    }
    case "add": {
      fs.readFile("./note.json", "utf8", function(err, data) {
        const note = JSON.parse(data);
        note.push({ title: process.argv[4], body: process.argv[6] });
          note.map(el =>
              console.log(
                  "\n Title:" + el.title + "\n Body:" + el.body
              )
          );
          fs.writeFile("./note.json", JSON.stringify(note), err => {
              if (err) {
                  console.error(err);
                  return;
              }
          });
      });
      break;
    }

  }
}
