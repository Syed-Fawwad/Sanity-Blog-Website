import React from 'react';





import Comment from './components/CommentSection';

import { client } from '@/sanity/lib/client';


import Footer from './components/Footer';
import Navbar from './components/Navbar';


import Landing from './landingpage/page';
import Contact from './contact/page';
import Webpage from './components/blogcard';


type Image = {
  _type: string;
  asset: {
    _ref: string;
    _type: string;
  };
};


type Post={
  title:string,
  summmary:string,
  image:Image,
  slug:string
};


export default async function Home() {
  // Fetch blog posts
  const posts: Post[] = await client.fetch(`
    *[_type == 'blog'] | order(_createdAt asc) {
      summary,
      title,
      image {
        asset -> {
          _id,
          url
        }
      },
      "slug": slug.current
    }
  `);

  // Debugging log to confirm posts
  console.log('Fetched Posts:', posts);

  return (
<div className='bg-[#fdfdfd]'>
<Navbar/>
<Landing/>

<div className="flex mt-24 lg:mt-0 flex-wrap items-center justify-center gap-16 lg:gap-4 p-4">
      {posts.map((post: Post) => (
        <Webpage key={post.slug} post={post} />
      ))}
    </div>
    <Comment/>
    <Contact/>
    <Footer/>
    </div>
  );
}