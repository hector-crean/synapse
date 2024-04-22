import { InboxNotification, InboxNotificationList } from "@liveblocks/react-comments";



const Inbox = () => {


    const { inboxNotifications } = useInboxNotifications();

    return (
        <InboxNotificationList>
            {inboxNotifications.map((inboxNotification) => (
                <InboxNotification key={inboxNotification.id} inboxNotification={inboxNotification} />
            ))}
        </InboxNotificationList>


    )
}