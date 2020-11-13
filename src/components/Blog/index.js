// == Import
import React, {useState, useEffect, useReducer} from 'react';
import axios from 'axios';

// Composants
import Header from 'src/components/Header';
import Posts from 'src/components/Posts';
import Footer from 'src/components/Footer';


// data, styles et utilitaires
import categoriesData from 'src/data/categories';
// Ici on veut récuperer les données de l'API et non plus celles du fichier data.
// import postsData from 'src/data/posts';
import { getPostsByCategory } from 'src/selectors/posts';
import './styles.scss';

// == Composant
const Blog = () => {

  // Mise en place de useReducer.
  const reducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_REPOS': {
        return {...state, posts: action.payload}
      }
    }
  };

  const [state, dispatch] = useReducer((reducer), {
    posts: [],
  });

  useEffect (
    () => {
      axios.get('https://oclock-open-apis.now.sh/api/blog/posts')
        .then((response) => {
          dispatch({ type: 'FETCH_REPOS', payload: response.data});
        })
    },
    [],
  );

  return (
    <div className="blog">
      <Header categories={categoriesData} />
        {categoriesData.map((category) => (
            <Posts
              posts={getPostsByCategory(state.posts, category.label)}
              category={category.label}
            />
          ))}
      <Footer />
    </div>
  );
};

// == Export
export default Blog;