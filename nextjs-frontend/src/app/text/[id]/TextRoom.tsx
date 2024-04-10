import { Comments } from "@/components/comments/Comments";
import { Cursors } from "@/components/cursors/Cursors";

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
      <Cursors />
      <Comments />
    </>
  );
};

export { TextRoom };
