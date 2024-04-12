import { Comments } from "@/components/flow/comments/Comments";
import { Cursors } from "@/components/flow/cursors-v2/Cursors";
import { PageHome } from "@/components/site/PageHome";

interface TextRoomProps {
  id: string;
}
const TextRoom = ({ id }: TextRoomProps) => {
  // if (isStorageLoading) {
  //   return (
  //     <div className={styles.container}>
  //       <div className={styles.loading}>
  //         <img src="https://liveblocks.io/loading.svg" alt="Loading" />
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <>
      <PageHome />
      <Cursors />
      <Comments />
    </>
  );
};

export { TextRoom };

