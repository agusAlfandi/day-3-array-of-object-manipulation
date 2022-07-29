const express = require("express");
const app = express();
const port = 5000;
const isLogin = false;
let addProject = [];

app.set("view engine", "hbs");
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("hello");
});
// console.log(__dirname);

app.get("/index", (req, res) => {
  const newProject = addProject.map((project) => {
    project.author = `Mr ${project.author}`;

    project.startDate = new Date(project.startDate);
    project.endDate = new Date(project.endDate);
    project.time = getFullTime(project.endDate, project.startDate);

    project.icon = checkBox(
      project.typescript,
      project.node,
      project.react,
      project.javascript
    );

    console.log("==========");
    console.log(project.node);
    console.log(project.react);
    console.log(project.typescript);
    console.log(project.javascript);

    // project.time1 = project.postAt;

    return project;
  });
  // console.log("data jadi: ", newProject);
  res.render("index", { addProject: newProject });
});

app.get("/delete-project/:index", (req, res) => {
  const index = req.params.index;
  addProject.splice(index, 1);

  res.redirect("/index");
});

app.post("/add-project", (req, res) => {
  const data = req.body;
  data.author = "Agus Alfandi";
  data.postAt = new Date();
  addProject.push(data);

  console.log("data mentah", addProject);

  res.redirect("/index");
});

app.get("/add-project", (req, res) => {
  res.render("add-project");
});

app.put("/add-project/:index", (req, res) => {
  // const index = req.params.index;
  // const title = req.body.title;
  // const startDate = req.body.startDate;
  // const endDate = req.body.endDate;
  // const content = req.body.content;

  // if (index == index) {
  //   index.title = title,
  //   index.startDate = startDate,
  //   index.endDate = endDate,
  //   index.content = content,
  // } else {
  //   console.error(error);
  // }

  res.render("add-project", { project: newProject });
});

app.get("/add-project", (req, res) => {
  res.render("add-project");
});

app.get("/Contact-me", (req, res) => {
  res.render("Contact-me");
});

app.get("/DetailProject/:index", (req, res) => {
  const index = req.params.index;
  const project = addProject[index];
  const newProject = {
    ...project,
    author: `Mr ${project.author}`,
    startDate: new Date(project.startDate),
    endDate: new Date(project.endDate),
    time: getFullTime(project.endDate, project.startDate),
  };

  console.log(index);

  res.render("DetailProject", { project: newProject });
});

app.listen(port, () => {
  console.log(`Exemple app listen port ${port} `);
});

function getFullTime(endDate, startDate) {
  let startMonth = startDate.getMonth();
  let endMonth = endDate.getMonth();
  let startYear = startDate.getFullYear();
  let endYear = endDate.getFullYear();

  if (startYear == endYear) {
    if (startMonth == endMonth) {
      month = 1;
      return "durasi " + month + " bulan";
    } else {
      month = endMonth - startMonth;
      return "durasi " + month + " bulan";
    }
  }

  if (endYear > startYear) {
    if (endYear - startYear == 1) {
      if (startMonth == endMonth) {
        return "durasi 1 tahun";
      } else if (startMonth > endMonth) {
        month = (startMonth - endMonth - 12) * -1;
        return "durasi " + month + " bulan";
      } else if (startMonth < endMonth) {
        month = endMonth - startMonth;
        return "durasi 1 tahun " + month + " bulan";
      }
    } else {
      year = endYear - startYear;
      if (startMonth == endMonth) {
        return "durasi " + year + " tahun";
      } else if (startMonth > endMonth) {
        year -= 1;
        month = (startMonth - endMonth - 12) * -1;
        return "durasi " + year + " tahun " + month + " bulan";
      } else if (startMonth < endMonth) {
        month = endMonth - startMonth;
        return "durasi " + year + " tahun " + month + " bulan";
      }
    }
  }
}

function checkBox(node, react, javascript, typescript) {
  if (node == true) {
    console.log(node);
    return '<img value="node" id="node" src="./public/img/node.png">';
  } else if (react == true) {
    console.log(react);
    return '<img value="react" id="react" src="./public/img/react.png">';
  } else if (javascript == true) {
    console.log(javascript);
    return '<img value="javascript" id="javascript" src="./public/img/javascript.png">';
  } else if (typescript == true) {
    console.log(typescript);
    return '<img value="typescript" id="typescript" src="./public/img/type.png">';
  }
  return false;
}
