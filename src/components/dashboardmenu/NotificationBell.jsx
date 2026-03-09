// components/NotificationBell.jsx
import { Notifications } from "@mui/icons-material";
import { Badge, IconButton } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotifications } from "../../redux/slices/notificationSlice";
import { getNotificationList } from "../../services/AppConfigAction";

const NotificationBell = ({ isMobile, onClick }) => {
  const { user } = useSelector((state) => state.auth);
  // const [unreadCount, setUnreadCount] = useState(0);
  const { unreadCount } = useSelector((state) => state.notification); // Get from Redux
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch unread count for the current user
    fetchUnreadCount();

    // Set up polling every 30 seconds
    // const interval = setInterval(fetchUnreadCount, 30000);

    // return () => clearInterval(interval);
  }, [user?.id]);

  // const fetchUnreadCount = async () => {
  //     try {
  //         const result = await dispatch(getNotificationList(user?.id));
  //         if (result.type === "EMP_NOTIFICATION_LIST") {
  //             // Filter only unread notifications (read === false)
  //             const unreadNotifications = result.payload.dataList.filter(
  //                 notification => notification.read === false
  //             );

  //             // Count only the unread ones
  //             setUnreadCount(unreadNotifications.length);
  //         }
  //     } catch (error) {
  //         console.error('Error fetching unread count:', error);
  //         // Fallback to 0 if API fails
  //         setUnreadCount(0);
  //     }
  // };

  const fetchUnreadCount = async () => {
    try {
      const result = await dispatch(getNotificationList(user?.id));
      if (result.type === "EMP_NOTIFICATION_LIST") {
        // Dispatch to Redux store
        dispatch(setNotifications(result.payload.dataList || []));
      }
    } catch (error) {
      console.error("Error fetching unread count:", error);
      // Fallback to 0 if API fails
      dispatch(setNotifications([]));
    }
  };

  return (
    <IconButton
      size={isMobile ? "small" : "medium"}
      onClick={onClick}
      sx={{
        color: "#053c54",
        position: "relative",
        "&:hover": {
          background: "#032838",
          color: "#28fb08",
        },
      }}
      aria-label="notifications"
    >
      <Badge
        badgeContent={unreadCount}
        color="error"
        max={9}
        sx={{
          "& .MuiBadge-badge": {
            fontSize: "0.7rem",
            height: "20px",
            minWidth: "20px",
            borderRadius: "10px",
          },
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
      >
        <Notifications
          fontSize={isMobile ? "small" : "medium"}
          sx={{
            transition: "transform 0.2s",
            color: "#F3F2EC",
            "&:hover": {
              transform: "scale(1.1)",
              color: "#fcd705",
            },
          }}
        />
      </Badge>
    </IconButton>
  );
};

export default NotificationBell;
