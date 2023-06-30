import { NotificationFilter, NotificationMapper, UserNotification } from "@/types/user.interface";
import { formatToString } from "./helperFunction";

/**
 * @param  {UserNotification[]} notifications
 * @returns NotificationMapper[]
 * This Function will Group and Sorting The Notification
 */
export function notificationMapper(notifications: UserNotification[]): NotificationMapper[] {
    // 01. Grouping By Day
    const dataReduced: { [key: string]: UserNotification[] } = notifications.reduce((group: { [key: string]: UserNotification[] }, notifs: UserNotification) => {
        const { timestamp } = notifs;
        const d = formatToString(timestamp);
        group[d] = group[d] ?? [];
        group[d].push(notifs);
        return group;
    }, {});

    // 02. Construct The Data
    const tempData: NotificationMapper[] = Object.entries(dataReduced).map(([d, indexedData]) => {
        const dataMapper: NotificationMapper = {
            key: d,
            data: indexedData.sort((a, b) => String(b.timestamp).localeCompare(String(a.timestamp))),
            actualDate: new Date(indexedData[0].timestamp),
        };
        return dataMapper;
    });

    //03. Sort Descending the final data to show last notif first
    const finalNotificationSortingAndGroup = tempData.sort((a, b) => b.key.localeCompare(a.key));

    return finalNotificationSortingAndGroup;
};

/**
 * @param  {UserNotification[]} notifications
 * @param  {string} filter
 * @returns UserNotification[]
 * This Function will filter by All | Read | Unread
 */
export function filterNotification(notifications: UserNotification[], filter: NotificationFilter): UserNotification[] {
    if (filter == 'Read')
        return notifications.filter(notif => notif.read);
    else if (filter == 'Unread')
        return notifications.filter(notif => !notif.read);
    else
        return notifications;
}