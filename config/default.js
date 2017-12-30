module.exports = {
    mysql : {
      host: "localhost",
      user: "lupeng",
      password: "Lupeng1",
      database: "info"
    },
    session: {
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 1000*60*60
      }
    }
  };