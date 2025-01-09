import React from 'react';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { components } from '@/app/components/Customstyle';
import Navbar from '@/app/components/Navbar';


interface Props {
  params: {
    slug: string;
  };
}

export default async function Page({ params: { slug } }: Props) {
  const query = `
    *[_type == "blog" && slug.current == $slug] {
      summary,
      title,
      content,
      author->{
        bio,
        image,
        name,
        date
      },
      image {
        asset -> {
          _id,
          url
        }
      }
    }[0]
  `;

  const posts = await client.fetch(query, { slug });

  return (
    <>
    <Navbar/>
<div className='bg-gradient-to-r from-[#006d77] via-[#34a0a4] to-[#52b788] h-[700px] relative'>

<article className="flex items-center justify-center pt-16 mb-12">
  <div className="flex flex-col max-w-[820px] w-full bg-white rounded-[8px] mt-12">
    {/* Header Section */}
    <div className="bg-gradient-to-r from-[#52b788] via-[#006d77] to-[#0a9396] pb-12 px-4 sm:px-8">
      <h1 className="text-[2rem] sm:text-[3rem] text-[#f6f7f9] font-[800] text-center lg:text-left ">
        {posts?.title || 'No Title Available'}
      </h1>
      <p className="text-[1rem] sm:text-[1.2rem] font-[600] text-[#f6f7f9] mt-4 text-center lg:text-left">
        {posts?.summary || 'No Summary Available'}
      </p>
      <div className="flex flex-wrap items-center mt-8 justify-between">
        <div className="flex items-center gap-4 ">
        <Image
  className="h-[60px] sm:h-[80px] w-[60px] sm:w-[80px] rounded-full"
  src="/profile.jpg" 
  alt="Author"
  height={80} // Actual pixel height
  width={80} // Actual pixel width
/>
          <p className="text-[1rem] sm:text-[1.1rem] text-black font-[700]">
            By <span className="text-[#f6f7f9]">Syed Fawwad</span>
          </p>
        </div>
        <div>
          <p className="text-[0.9rem] sm:text-[1rem] font-[700] text-black">
            {posts.author.date}
          </p>
        </div>
      </div>
    </div>

    {/* Blog Image */}
    <div className=''>
      <Image
        className="h-[200px] sm:h-[320px] w-full rounded-b-[8px] object-cover"
        src={urlFor(posts.image)}
        alt="Blog Cover"
        height={200}
        width={200}
      />
    </div>

    {/* Content Section */}
    <div className="mt-8 px-4 sm:px-8">
      <h1 className="text-[1.2rem] sm:text-[1.5rem] font-[700]">
        BLOG <span className="text-[#006d77] mb-4">ARTICLE</span>
      </h1>
      <div className="mt-4">
        {posts?.content && (
          <PortableText value={posts.content} components={components} />
        )}
      </div>
      <h1 className="mt-8 text-[1rem] sm:text-[1.2rem] font-[700]">
        ABOUT <span className="text-[#006d77] ">AUTHOR</span>
      </h1>
      <div className="flex items-center gap-4 my-4">
        <Image
          className="h-[70px] border-[#005f73] border-[2px] sm:h-[80px] w-[70px] sm:w-[80px] rounded-full"
          src="/profile.jpg"
          alt="Author"
          height={45}
          width={64}
        />
        <p className="text-[1rem] sm:text-[1.1rem] font-[600]">Syed Fawwad Ali</p>
      </div>
      <div className="mt-4 text-gray-700 mb-12 font-[500] text-[1rem] sm:text-[1.1rem] leading-8">
        <p> I'm Syed Fawwad Ali,

A passionate tech enthusiast pursuing Cloud Applied Engineering at GIAIC and a BSCS degree at Ilma University. With expertise in digital marketing and front-end development, I aim to create innovative solutions while continuously learning and growing in the tech industry</p>
      </div>
    </div>
  </div>
</article>
      </div>
    </>
  );
}