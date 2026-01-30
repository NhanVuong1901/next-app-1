interface Props {
  params: Promise<{ slug: string[] }>;
}

const SlugCategoryPage = async ({ params }: Props) => {
  const { slug } = await params;
  return <div>SlugCategoryPage {slug}</div>;
};

export default SlugCategoryPage;
