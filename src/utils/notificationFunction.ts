import { NotificationFilter, NotificationMapper, UserNotification } from "@/types/user.interface";
import { formatToString } from "./helperFunction";

/**
 * @param  {UserNotification[]} notifications
 * @returns NotificationMapper[]
 * This Function will Group and Sorting The Notification
 * Optimized: single sort + single-pass grouping via Map
 */
export function notificationMapper(notifications: UserNotification[]): NotificationMapper[] {
    const sorted = notifications.slice().sort((a, b) => +b.timestamp - +a.timestamp);

    const groupMap = new Map<string, UserNotification[]>();
    for (const notif of sorted) {
        const key = formatToString(notif.timestamp);
        const group = groupMap.get(key);
        if (group) group.push(notif);
        else groupMap.set(key, [notif]);
    }

    const result: NotificationMapper[] = [];
    for (const [key, data] of groupMap) {
        result.push({ key, data, actualDate: new Date(data[0].timestamp) });
    }
    return result;
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