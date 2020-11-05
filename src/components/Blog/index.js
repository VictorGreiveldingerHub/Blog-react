// == Import
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom';

// Composants
import Header from 'src/components/Header';
import Posts from 'src/components/Posts';
import Footer from 'src/components/Footer';
import Post from 'src/components/Post';

// data, styles et utilitaires
import categoriesData from 'src/data/categories';
// import postsData from 'src/data/posts';
import { getPostsByCategory } from 'src/selectors/posts';
import './styles.scss';

// == Composant
const Blog = () => {
  console.log('Blog (tout au début)');
  const [posts, setPosts] = useState([]);

  /**
   * On peut déclencher un effet automatiquement après le rendu :
   */
  // useEffect est un générateur d'écouteur d'événement.
  // Concrètement, on lui donne un callback => ce callback sera
  // appelé à certains moments de la vie de l'élément React.
  // L'effet mis en place peut avoir des contraintes, et ne sera alors
  // pas toujours déclenché (ça dépendra des contraintes).
  useEffect(
    () => {
      // On GET l'API pour récupérer les posts
      axios
        .get('https://oclock-open-apis.now.sh/api/blog/posts')
        .then((response) => {
          console.log(response);
          setPosts(response.data);
        });
    },
    [], // avec cette contrainte "vide", on reproduit un componentDidMount
  );

  /**
   * On peut aussi déclencher le même effet, mais manuellement :
   */
  // const loadPosts = () => {
  //   // On GET l'API pour récupérer les posts
  //   axios
  //     .get('https://oclock-open-apis.now.sh/api/blog/posts')
  //     .then((response) => {
  //       console.log(response);
  //       setPosts(response.data);
  //     });
  // };


  /**
   * <Route> agit comme un IF dont la condition est liée à
   * l'URL : SI l'URL courante correspond (match) à ce qui
   * est déclaré sur la route, alors le contenu de la route
   * sera généré dans la page ; SINON, non.
   */

  console.log('rendu vDOM');
  return (
    <div className="blog">
      {/* <button type="button" onClick={loadPosts}>Charger les articles</button> */}
      <Header categories={categoriesData} />
      <Switch>
        {categoriesData.map((category) => (
          <Route key={category.route} exact path={category.route}>
            <Posts
              posts={getPostsByCategory(posts, category.label)}
              category={category.label}
            />
          </Route>
        ))}
        {
          posts.map((post) => (
            <Route key={post.id} exact path={`/posts/${post.id}`}>
              <Post {...post} />
            </Route>
          ))
        }
        <Route>404</Route>
      </Switch>
      <Footer />
    </div>
  );
};




/** -------------------- */

// Essais avec Axios

// axios
//   .get('https://oclock-open-apis.now.sh/api/blog/posts')
//   .then((response) => {
//     console.log(promise);
//   });


/** -------------------- */



// == Export
export default Blog;
