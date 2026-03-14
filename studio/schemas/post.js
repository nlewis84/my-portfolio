export default {
    name: "post",
    title: "Post",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
                maxLength: 96,
            },
        },
        {
            name: "author",
            title: "Author",
            type: "reference",
            to: { type: "author" },
        },
        {
            name: "mainImage",
            title: "Main image",
            type: "image",
            options: {
                hotspot: true,
            },
        },
        {
            name: "publishedAt",
            title: "Published at",
            type: "date",
            options: {
                dateFormat: "MM-DD-YYYY",
            },
        },
        {
            name: "markdownBody",
            title: "Body (Markdown)",
            type: "markdown",
            description: "Paste or write Markdown here. If filled, this takes priority over the rich text body below.",
        },
        {
            name: "body",
            title: "Body (Rich Text)",
            type: "blockContent",
            description: "Rich text editor. Used when the Markdown field above is empty.",
        },
    ],

    preview: {
        select: {
            title: "title",
            author: "author.name",
            media: "mainImage",
        },
        prepare(selection) {
            const { author } = selection;
            return Object.assign({}, selection, {
                subtitle: author && `by ${author}`,
            });
        },
    },
};
