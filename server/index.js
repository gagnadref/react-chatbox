import path from 'path';
import express from 'express';
import handlebars from 'express-handlebars';

const app = express();

// View templates
app.engine('handlebars', handlebars({
  defaultLayout: 'etudiant.gouv.handlebars',
  layoutsDir: path.resolve(__dirname, 'views/layouts'),
}));
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, 'views'));

// Static assets
app.use(express.static(path.resolve(__dirname, '../dist')));
app.use(express.static(path.resolve(__dirname, '../www.etudiant.gouv.fr')));

// Routes
app.get('/', (request, response) => {
  const initialState = {
    isOpen: false,
    user: {
      nameCurrent: '',
      languagesCurrent: [],
      studyFieldCurrent: '',
      studyLevelCurrent: '',
    },
    users: {},
    currentMessage: '',
    messages: [],
    chats: {},
  };

  response.render('app', {
    initialState: JSON.stringify(initialState),
  });
});

export default app;
