import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import sanityClient from "../client.js";
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from "@sanity/block-content-to-react";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
    return builder.image(source);
}

const serializers = {
    types: {
        code: (props) => (
            <pre data-language={props.node.language}>
                <code>{props.node.code}</code>
            </pre>
        ),
    },
};

export default function SinglePost() {
    const [singlePost, setSinglePost] = useState(null);
    const { slug } = useParams();

    useEffect(() => {
        sanityClient
            .fetch(
                `*[slug.current == "${slug}"]{
            title,
            _id,
            slug,
            publishedAt,
            mainImage {
                asset->{
                    _id,
                    url
                }
            },
            body,
            "name": author->name,
            "authorImage": author->image,
        }`
            )
            .then((data) => setSinglePost(data[0]))
            .catch(console.error);
    }, [slug]);

    if (!singlePost)
        return (
            <main className="bg-indigo-100 min-h-screen p-12">
                <article className="container shadow-lg mx-auto bg-gray-100 rounded-lg" />
            </main>
        );

    return (
        <main className="bg-indigo-100 min-h-screen p-2 md:p-12">
            <article className="container shadow-lg mx-auto bg-gray-100 rounded-lg">
                <header className="relative">
                    <div className="absolute h-full w-full flex items-center justify-center p-8">
                        <div className="bg-yellow-400 bg-opacity-70 rounded p-12">
                            <h1 className="cursive text-3xl lg:text-6xl mb-4">
                                {singlePost.title}
                            </h1>
                            <div className="flex justify-center text-gray-900">
                                <img
                                    src={urlFor(singlePost.authorImage).url()}
                                    alt={singlePost.name}
                                    className="w-10 h-10 rounded-full"
                                />
                                <p className="cursive flex items-center pl-2 text-2xl">
                                    {singlePost.name}
                                </p>
                            </div>
                        </div>
                    </div>
                    <img
                        src={singlePost.mainImage.asset.url}
                        alt={singlePost.title}
                        className="w-full object-cover rounded-t"
                        style={{ height: "400px" }}
                    />
                </header>
                <div className="px-4 lg:px-48 p-4 lg:py-12 lg:py-20 prose lg:prose-xl max-w-full">
                    <aside className="text-gray-400">
                        Published on{" "}
                        {new Date(singlePost.publishedAt).toLocaleDateString()}
                    </aside>
                    <BlockContent
                        blocks={singlePost.body}
                        projectId="46knf8eh"
                        dataset="production"
                        serializers={serializers}
                    />
                </div>
            </article>
        </main>
    );
}
