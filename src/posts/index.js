import matter from "gray-matter";

const mainPost = [
  'detail-of-malware-shoplift'
];

const postFiles = import.meta.glob("./*.md", { as: "raw", eager: true });

export const getMainPosts = () => {
  return Object.entries(postFiles).filter(([path, content]) => {
    const slug = path.split("/").pop().replace(".md", "");
    return mainPost.includes(slug);
  }).map(([path, content]) => {
    const slug = path.split("/").pop().replace(".md", "");
    const { data, content: body } = matter(content);
    return {
      slug,
      ...data,
      body,
    };
  });
}

export const getAllPosts = () => {
  return Object.entries(postFiles).map(([path, content]) => {
    const slug = path.split("/").pop().replace(".md", "");
    const { data, content: body } = matter(content);
    return {
      slug,
      ...data,
      body,
    };
  }).sort((a, b) => parseInt(a.eid) - parseInt(b.eid));
};

export const getPostBySlug = (slug) => {
  const file = postFiles[`./${slug}.md`];
  if (!file) return null;
  const { data, content } = matter(file);
  return { ...data, body: content };
};