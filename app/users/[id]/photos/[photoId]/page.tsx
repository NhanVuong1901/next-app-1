interface Props {
  params: Promise<{id:number; photoId: number }>;
}

const UserDetailPage = async ({ params }: Props) => {
  const { id,photoId } = await params;

  return <div>PhotoDetailPage UserID {id} PhotoID {photoId}</div>;
};

export default UserDetailPage;
