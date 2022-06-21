const express = require("express");
const app = express();
const mysql = require("mysql");
const port = process.env.port || 8000;

const conn = mysql.createConnection({
  host: "172.30.1.200",
  user: "root",
  password: "Whgdmstodrkr@&098",
  database: "TEST",
  multipleStatements: true, // 여러 쿼리를 ';' 기준으로 한번에 보낼 수 있게 함
});
conn.connect(function (err) {
  if (err) throw err;
  console.log("connected");
});
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//  ==> 조회 시에는 문제가 되지 않아서 삭제했는데 이 구문이 없으니 등록, 수정이 안됨, 확인해볼 것!!!

app.post("/write", (req, res) => {
  const title = req.body.title;
  const comment = req.body.comment;
  const reg_rdate = req.body.reg_rdate;
  const ip_address = req.body.ip_address;
  const sql_post = `INSERT INTO Board (title, comment, reg_rdate, ip_address) 
  VALUES ("${title}", "${comment}", "${reg_rdate}", "${ip_address}")`;

  console.log(sql_post);
  conn.query(sql_post, (err, results) => {
    res.send(results);
    // console.log(results, "res.result");
    // console.log(req.body);
  });
});

app.post("/data", (req, res) => {
  const idx = req.body.board_idx;

  const sql_solget = `SELECT title, comment FROM Board WHERE board_idx = ?`;
  conn.query(sql_solget, idx, function (err, results) {
    if (!err) {
      res.send(results);
    } else {
      console.log(err);
      res.send("error");
    }
  });
});

app.post("/comment/data", (req, res) => {
  const idx = req.body.comment_index;
  const sql_comment_data = `SELECT * FROM Comment WHERE comment_index=${idx} OR bundle_id = ${idx}`;
  console.log(sql_comment_data);
  conn.query(sql_comment_data, idx, function (err, results) {
    if (!err) {
      res.send(results);
      console.log(results, "결과");
    } else {
      res.send(err);
      console.log(err);
    }
  });
});
app.post("/comment", (req, res) => {
  const id = req.body.board_idx;
  const context = req.body.context;
  const reg_rdate = req.body.reg_rdate;
  const ip_address = req.body.ip_address;
  console.log(reg_rdate);
  const sql_comment = `INSERT INTO Comment (board_idx, context, reg_rdate, ip_address)
  VALUES ("${id}", "${context}", "${reg_rdate}", "${ip_address}")`;
  conn.query(sql_comment, (err, results) => {
    if (!err) {
      console.log(results);
      res.send(results);
    } else {
      console.log(err);
    }
  });
});
app.post("/recomment", (req, res) => {
  const id = req.body.board_idx;
  const Recomment = req.body.context;
  const reg_rdate = req.body.reg_rdate;
  const bundle_id = req.body.bundle_id;
  const ip_address = req.body.ip_address;
  console.log(reg_rdate);
  const sql_comment = `INSERT INTO Comment ( class, bundle_id, board_idx, context, reg_rdate, ip_address)
  VALUES ((SELECT NVL(MAX(class),0)+1 FROM Comment ALIAS_FOR_SUBQUERY WHERE bundle_id = ${bundle_id}), 
  ${bundle_id}, ${id}, "${Recomment}", "${reg_rdate}", "${ip_address}");
`;
  const sql_comment2 = `UPDATE Comment SET distinguish = 1 WHERE comment_index = ${bundle_id}`;
  console.log(sql_comment);
  conn.query(sql_comment + sql_comment2, (err, results) => {
    if (!err) {
      console.log(results);
      res.send(results);
    } else {
      console.log(err);
    }
  });
});

app.post("/comment/list", (req, res) => {
  const idx = req.body.board_idx;
  const sql_comment_list = `SELECT * FROM Comment WHERE board_idx = ${idx}
  ORDER BY comment_index DESC, class ASC`;
  console.log(sql_comment_list);
  conn.query(sql_comment_list, idx, (err, results) => {
    if (!err) {
      console.log(results);
      res.send(results);
    } else {
      console.log(err);
    }
  });
});

app.get("/list", (req, res) => {
  const sql_get =
    // `SELECT * FROM Board ORDER BY reg_rdate DESC`;
    ` SELECT ROW_NUMBER() OVER (ORDER BY board_idx DESC) AS rowNum, 
		board_idx, title, comment, reg_rdate, ip_address
	 	FROM Board WHERE deleted IS NULL
     ORDER BY rowNum ASC `;
  conn.query(sql_get, function (err, results, fields) {
    if (err) throw err;
    res.send(results);
    // console.log("list", results);
  });
});
app.post("/update", (req, res) => {
  const title = req.body.title;
  const comment = req.body.comment;
  const update_date = req.body.update_date;
  const idx = req.body.board_idx;

  const sql_update = `UPDATE Board SET title = "${title}", comment = "${comment}", update_date = "${update_date}"
  WHERE board_idx="${idx}";
  `;
  conn.query(sql_update, idx, function (err, rows, fileds) {
    if (!err) {
      res.send("success");
      console.log(req.body, "reqes");
    } else {
      res.send("error");
      console.log(err);
    }
    console.log(sql_update);
  });
});
app.post("/update/comment", (req, res) => {
  const context = req.body.context;
  const update_date = req.body.update_date;
  const idx = req.body.comment_index;

  const sql_update_comment = `UPDATE Comment SET context= "${context}", update_date="${update_date}"
  WHERE comment_index ="${idx}"`;

  conn.query(sql_update_comment, idx, function (err, rows, fields) {
    if (!err) {
      res.send("success");
      console.log(req, "req");
    } else {
      res.send(err);
    }
  });
});

//  url 주소 앞에 "/" 입력을 안했더니 경로 에러가 발생
app.post("/update/recomment", (req, res) => {
  const context = req.body.context;
  const update_date = req.body.update_date;
  const idx = req.body.comment_index;

  const sql_update_recomment = `UPDATE Comment SET context = "${context}", update_date="${update_date}"
  WHERE comment_index = "${idx}"`;

  conn.query(sql_update_recomment, idx, function (err, rows, fields) {
    if (!err) {
      res.send("success");
      console.log(req, "req");
    } else {
      res.send(err);
    }
  });
});

app.post("/delete", (req, res) => {
  const idx = req.body.board_idx;
  const deleted = req.body.deleted;
  const sql_delete = `UPDATE Board SET deleted = "${deleted}"
  WHERE board_idx = "${idx}"`;
  console.log(idx, deleted, "쿼리");
  conn.query(sql_delete, idx, function (err, results, fields) {
    // if (err) throw err;
    if (!err) {
      res.send("success");
      console.log(req.body, "req");
    } else {
      res.send("error");
      console.log(err);
    }
  });
});

app.post("/delete/comment", (req, res) => {
  const idx = req.body.comment_index;
  const deleted = req.body.deleted;
  const sql_delete_comment = `UPDATE Comment SET deleted = "${deleted}" 
  WHERE comment_index = ${idx}`;

  conn.query(sql_delete_comment, idx, function (err, results, fields) {
    if (!err) {
      res.send("success");
    } else {
      res.send("error");
    }
  });
});
app.post("/delete/recomment", (req, res) => {
  const idx = req.body.comment_index;
  const deleted = req.body.deleted;
  const sql_delete_recomment = `UPDATE Comment SET deleted = "${deleted}"
  WHERE comment_index = ${idx}`;

  conn.query(sql_delete_recomment, idx, function (err, results, fields) {
    if (!err) {
      res.send("success");
    } else {
      res.send("error");
    }
  });
});

app.listen(port, () => console.log(`server start. port: ${port}`));

exports.conn = conn;
