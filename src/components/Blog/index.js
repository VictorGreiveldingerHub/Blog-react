// == Import
import React, {useState, useEffect} from 'react';
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
  console.log('Etat initial');
  const [posts, setPosts] = useState([]);

  useEffect (
    () => {
      console.log('plop');
      axios.get('https://oclock-open-apis.now.sh/api/blog/posts')
        .then((response) => {
          console.log(response);
          setPosts(response.data);
        })
    },
    [],
  );

  console.log('rendu');
  return (
    <div className="blog">
      <Header categories={categoriesData} />
        {categoriesData.map((category) => (
            <Posts
              posts={getPostsByCategory(posts, category.label)}
              category={category.label}
            />
          ))}
      <Footer />
    </div>
  );
};


/* TEST AXIOS

*/

// let promise = axios.get('https://oclock-open-apis.now.sh/api/blog/posts');
// console.log(promise);
// promise.then((response) => { console.log(promise);});

// == Export
export default Blog;