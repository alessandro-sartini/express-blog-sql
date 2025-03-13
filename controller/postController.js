const posts = require("../data/posts");

const connection = require("../data/db");

function index(req, res) {
  // let filterPosts = posts;

  // //! Se la richiesta contiene un filtro, allora filtriamo il menu
  // if (req.query.tags) {
  //   filterPosts = posts.filter((e) => e.tags.includes(req.query.tags));
  // }
  // // potrebbe essere stata filtrata o contenere il menu originale
  // res.json(filterPosts);

  const sql = "SELECT * FROM posts";

  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Connessione fallita" });
    }
    res.json(results);
  });
}

function show(req, res) {
  // const post = posts.find((e) => e.id === parseInt(req.params.id));

  // if (!post) {
  //   res.status(404);

  //   return res.json({
  //     error: "Not Found",
  //     message: "Post non trovato",
  //   });
  // }

  // res.json(post);

  const {id} = req.params;
  const showSql = 'SELECT * FROM posts WHERE id = ?';
  
  connection.query(showSql, [id], (err, results) => {
    
    if (err) {
      return res.status(500).json({
        error: 'Database error'
      });
      
    }
    if (results.length === 0) {
      return res.status(404).json({

        error: 'Elemento non trovato'
        
      });
    };
    res.json(results[0]);
  });

}

function store(req, res) {
  // creo un id automatico sempre +1 su ultimo
  const newId = posts[posts.length - 1].id + 1;

  //todo  CREO il NUOVO post CON POSTMAN
  const newPost = {
    // id : newId,
    // title : req.body.title,
    // content : req.body.content,
    // image : req.body.image,
    // tags : req.body.tags

    id: newId,
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
    tags: req.body.tags,
  };

  posts.push(newPost);
  console.log(posts);

  // !setto nuovo status
  res.status(201);
  //! stampo postman nuovo post
  res.json(newPost);
}

function update(req, res) {
  const newId = parseInt(req.params.id);

  const post = posts.find((e) => e.id === newId);

  if (!post) {
    res.status(404);

    return res.json({
      error: "Non trovato",
      message: "Post non trovato",
    });
  }

  for (const key in req.body) {
    post[key] = req.body[key];
  }
  // post.title = req.body.title;
  // post.tags = req.body.tags;

  console.log(posts);
  res.json(post);
}

function modify(req, res) {
  const newId = parseInt(req.params.id);

  const post = posts.find((e) => e.id === newId);

  if (!post) {
    res.status(404);

    return res.json({
      error: "Non trovato",
      message: "Post non trovato",
    });
  }

  for (const key in req.body) {
    post[key] = req.body[key];
  }

  console.log(posts);
  res.json(post);
}

function destroy(req, res) {
  // // inserisco id in una costante con il parse (altrimenti JSONE)
  // const id = parseInt(req.params.id);
  // //! cerco post con id selezionato
  // const post = posts.find((post) => post.id === id);

  // if (!post) {
  //   res.status(404);

  //   return res.json({
  //     status: 404,
  //     error: "not found",
  //     message: "Post non trovato",
  //   });
  // }

  // posts.splice(posts.indexOf(post), 1);

  // // ! verifico l'eliminazione
  // console.log(posts);

  // res.sendStatus(204);
  const { id } = req.params;
  const deleteSql = "DELETE FROM posts WHERE id = ?";

  connection.query(deleteSql, [id], (err) => {
    if (res.status(404)) {
      return res
        .json({ error: "Oggetto non trovato o eliminato" });
    }
    if (err) {
      return res.status(500)
        .json({ error: "Connessione fallita" });
    }
    res.sendStatus(204);
  });
}

module.exports = { index, show, store, update, modify, destroy };
