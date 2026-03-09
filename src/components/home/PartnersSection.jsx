import {
  Avatar,
  Box,
  Chip,
  Container,
  Paper,
  Typography,
  alpha,
  useMediaQuery,
  useTheme,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import eaplRotatingLogo from "../../assets/images/EAPLfavicon.png";
import useLoading from "../../redux/slices/useLoading";
import { getPartnerList } from "../../services/AppConfigAction";

// Helper function to validate color
const isValidColor = (color) => {
  if (!color || typeof color !== "string") return false;

  const trimmedColor = color.trim();

  // Check for valid hex colors
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(trimmedColor)) return true;

  // Check for rgb/rgba
  if (/^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/.test(trimmedColor))
    return true;
  if (
    /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(0|1|0\.\d+)\)$/.test(
      trimmedColor,
    )
  )
    return true;

  // Check for hsl/hsla
  if (/^hsl\((\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%\)$/.test(trimmedColor))
    return true;
  if (
    /^hsla\((\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%,\s*(0|1|0\.\d+)\)$/.test(
      trimmedColor,
    )
  )
    return true;

  // Check for CSS named colors
  const namedColors = [
    "red",
    "blue",
    "green",
    "yellow",
    "purple",
    "orange",
    "pink",
    "brown",
    "black",
    "white",
    "gray",
    "grey",
    "cyan",
    "magenta",
    "primary",
    "secondary",
    "error",
    "warning",
    "info",
    "success",
  ];
  if (namedColors.includes(trimmedColor.toLowerCase())) return true;

  return false;
};

// Safe alpha function
const safeAlpha = (color, opacity) => {
  if (!isValidColor(color)) {
    // Return a default color with opacity
    return alpha("#1976d2", opacity);
  }

  try {
    return alpha(color, opacity);
  } catch (error) {
    console.warn(`Failed to apply alpha to color: ${color}`, error);
    return alpha("#1976d2", opacity);
  }
};

// Get safe color for a partner
const getPartnerColor = (partner) => {
  // If partner has a valid color, use it
  if (partner.color && isValidColor(partner.color)) {
    return partner.color;
  }

  // Generate a consistent color based on partner name
  const defaultColors = [
    "#2196F3",
    "#673AB7",
    "#F44336",
    "#4CAF50",
    "#FF9800",
    "#9C27B0",
    "#00BCD4",
    "#FF5722",
    "#607D8B",
    "#E91E63",
    "#3F51B5",
    "#795548",
    "#00A4EF",
    "#FF9900",
    "#4285F4",
    "#054ADA",
    "#00A1E0",
    "#F80000",
    "#0071C5",
    "#007DB8",
  ];

  if (partner.name) {
    const hash = partner.name
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return defaultColors[hash % defaultColors.length];
  }

  return "#1976d2"; // Default MUI primary
};

// Helper function to get profile image URL
const getProfileImageUrl = (partner) => {
  // Priority 1: profilePicture field (could be base64)
  if (partner.profilePicture) {
    // If it's already a data URL
    if (
      typeof partner.profilePicture === "string" &&
      partner.profilePicture.startsWith("data:image/")
    ) {
      return partner.profilePicture;
    }
    // If it's base64 without prefix
    if (
      typeof partner.profilePicture === "string" &&
      partner.profilePicture.length > 100
    ) {
      try {
        // Check if it's valid base64
        atob(partner.profilePicture);
        return `data:${partner.profilePictureType || "image/jpeg"};base64,${partner.profilePicture}`;
      } catch (e) {
        // Not base64, might be a URL
      }
    }
    // If it's a URL string
    if (
      typeof partner.profilePicture === "string" &&
      partner.profilePicture.startsWith("http")
    ) {
      return partner.profilePicture;
    }
  }

  // Priority 2: profilePictureUrl field
  if (partner.profilePictureUrl) {
    return partner.profilePictureUrl;
  }

  // Priority 3: logo field (if it's an image URL)
  if (
    partner.logo &&
    (partner.logo.startsWith("http") || partner.logo.startsWith("data:image/"))
  ) {
    return partner.logo;
  }

  return null; // No profile image available
};

// Helper function to get partner initials
const getPartnerInitials = (partner) => {
  if (partner.name) {
    const words = partner.name.split(" ");
    if (words.length >= 2) {
      return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
    }
    return partner.name.substring(0, 2).toUpperCase();
  }
  return "PT"; // Default initials
};

// Helper function to check if partner is active
const isActivePartner = (partner) => {
  // Check if status is explicitly true
  if (partner.status === true) return true;

  // Check if status is string "true"
  if (partner.status === "true") return true;

  // Check if status is number 1
  if (partner.status === 1) return true;

  // Default to false
  return false;
};

const PartnersSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const [marqueeKey, setMarqueeKey] = useState(0);

  const [partners, setPartners] = useState([]);
  const dispatch = useDispatch();
  const { showLoader, hideLoader, withLoader } = useLoading(); // Get loading functions
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadConfigs = async () => {
      // showLoader(eaplRotatingLogo, 580);
      setLoading(true);
      const result = await dispatch(getPartnerList());
      if (result.type === "PARTNER_LIST") {
        // Process partners to ensure they have valid colors and filter active ones
        const processedPartners = result.payload
          .filter((partner) => isActivePartner(partner)) // Filter only active partners
          .map((partner) => {
            // Clean the color field
            let cleanColor = partner.color;

            // If color is invalid, generate one
            if (!isValidColor(cleanColor)) {
              cleanColor = getPartnerColor(partner);
            }

            return {
              ...partner,
              color: cleanColor,
            };
          });

        setPartners(processedPartners);
        // hideLoader();
      }
      setLoading(false);
    };

    loadConfigs();
  }, [dispatch]);

  // Check if there are active partners
  const activePartnersCount = partners.length;

  // Split partners into two rows for mobile
  const firstRowPartners = partners.slice(0, Math.ceil(partners.length / 2));
  const secondRowPartners = partners.slice(Math.ceil(partners.length / 2));

  // Duplicate partners for seamless loop (only if we have partners)
  const duplicatedFirstRow =
    activePartnersCount > 0 ? [...firstRowPartners, ...firstRowPartners] : [];
  const duplicatedSecondRow =
    activePartnersCount > 0 ? [...secondRowPartners, ...secondRowPartners] : [];

  // Render partner card
  const renderPartnerCard = (partner, index) => {
    const partnerColor = getPartnerColor(partner);
    const profileImageUrl = getProfileImageUrl(partner);
    const partnerInitials = getPartnerInitials(partner);
    const partnerKey = partner.id
      ? `${partner.id}-${index}`
      : `${partner.name}-${index}`;

    return (
      <Paper
        key={partnerKey}
        elevation={0}
        sx={{
          flexShrink: 0,
          mx: { xs: 0.8, sm: 1.5, md: 2 },
          p: { xs: 1.2, sm: 1.8, md: 2.5 },
          textAlign: "center",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
          bgcolor: safeAlpha(partnerColor, 0.08),
          minWidth: {
            xs: 100,
            sm: 130,
            md: 160,
          },
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: theme.shadows[4],
            borderColor: partnerColor,
            bgcolor: "background.paper",
          },
        }}
      >
        <Box
          sx={{
            width: { xs: 42, sm: 55, md: 70 },
            height: { xs: 42, sm: 55, md: 70 },
            borderRadius: "50%",
            bgcolor: safeAlpha(partnerColor, 0.1),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 6px",
            border: `1px solid ${safeAlpha(partnerColor, 0.2)}`,
            overflow: "hidden",
          }}
        >
          {profileImageUrl ? (
            <Avatar
              sx={{ width: "100%", height: "100%" }}
              src={profileImageUrl}
              alt={partner.name}
            />
          ) : (
            <Avatar
              sx={{
                width: "100%",
                height: "100%",
                bgcolor: partnerColor,
                fontSize: {
                  xs: "0.9rem",
                  sm: "1rem",
                  md: "1.1rem",
                },
                fontWeight: "bold",
              }}
            >
              {partnerInitials}
            </Avatar>
          )}
        </Box>

        <Typography
          fontWeight="bold"
          sx={{
            fontSize: {
              xs: "0.75rem",
              sm: "0.9rem",
              md: "1rem",
            },
            mb: 0.3,
          }}
        >
          {partner.name}
        </Typography>

        <Typography
          sx={{
            fontSize: {
              xs: "0.65rem",
              sm: "0.75rem",
            },
            color: "text.secondary",
          }}
        >
          {partner.type || "Partner"}
        </Typography>

        <Box
          sx={{
            mt: 0.8,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              bgcolor: "success.main",
              mr: 0.5,
            }}
          />
          <Typography
            sx={{
              fontSize: "0.6rem",
              color: "success.main",
              fontWeight: 500,
            }}
          >
            Active
          </Typography>
        </Box>
      </Paper>
    );
  };

  // Render desktop marquee (single row)
  const renderDesktopMarquee = () => {
    const duplicatedPartners =
      activePartnersCount > 0 ? [...partners, ...partners] : [];

    return (
      <Box
        sx={{
          position: "relative",
          width: "100%",
          overflow: "hidden",
          py: { xs: 1, sm: 2 },

          "&::before, &::after": {
            content: '""',
            position: "absolute",
            top: 0,
            width: { xs: 40, sm: 80, md: 100 },
            height: "100%",
            zIndex: 2,
          },
          "&::before": {
            left: 0,
            background: `linear-gradient(to right, ${theme.palette.background.default}, transparent)`,
          },
          "&::after": {
            right: 0,
            background: `linear-gradient(to left, ${theme.palette.background.default}, transparent)`,
          },
        }}
      >
        <Box
          key={marqueeKey}
          sx={{
            display: "flex",
            alignItems: "center",
            animation: "marquee 40s linear infinite",
            "@keyframes marquee": {
              "0%": { transform: "translateX(0)" },
              "100%": { transform: "translateX(-50%)" },
            },
            "&:hover": {
              animationPlayState: "paused",
            },
          }}
        >
          {duplicatedPartners.map((partner, index) =>
            renderPartnerCard(partner, index),
          )}
        </Box>
      </Box>
    );
  };

  // Render mobile double marquee (two rows scrolling in opposite directions)
  const renderMobileDoubleMarquee = () => {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {/* First Row - Left to Right */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            overflow: "hidden",
            py: 1,

            "&::before, &::after": {
              content: '""',
              position: "absolute",
              top: 0,
              width: 40,
              height: "100%",
              zIndex: 2,
            },
            "&::before": {
              left: 0,
              background: `linear-gradient(to right, ${theme.palette.background.default}, transparent)`,
            },
            "&::after": {
              right: 0,
              background: `linear-gradient(to left, ${theme.palette.background.default}, transparent)`,
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              animation: "marqueeLeft 25s linear infinite",
              "@keyframes marqueeLeft": {
                "0%": { transform: "translateX(0)" },
                "100%": { transform: "translateX(-50%)" },
              },
              "&:hover": {
                animationPlayState: "paused",
              },
            }}
          >
            {duplicatedFirstRow.map((partner, index) =>
              renderPartnerCard(partner, `row1-${index}`),
            )}
          </Box>
        </Box>

        {/* Second Row - Right to Left (opposite direction) */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            overflow: "hidden",
            py: 1,

            "&::before, &::after": {
              content: '""',
              position: "absolute",
              top: 0,
              width: 40,
              height: "100%",
              zIndex: 2,
            },
            "&::before": {
              left: 0,
              background: `linear-gradient(to right, ${theme.palette.background.default}, transparent)`,
            },
            "&::after": {
              right: 0,
              background: `linear-gradient(to left, ${theme.palette.background.default}, transparent)`,
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              animation: "marqueeRight 25s linear infinite",
              "@keyframes marqueeRight": {
                "0%": { transform: "translateX(-50%)" },
                "100%": { transform: "translateX(0)" },
              },
              "&:hover": {
                animationPlayState: "paused",
              },
            }}
          >
            {duplicatedSecondRow.map((partner, index) =>
              renderPartnerCard(partner, `row2-${index}`),
            )}
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        py: 2.5,
        overflow: "hidden",
      }}
    >
      <Container maxWidth="xl">
        {/* ================= HEADER ================= */}
        <Box
          textAlign="center"
          sx={{
            mb: { xs: 4, sm: 6, md: 10 },
            px: { xs: 1.5, sm: 2, md: 3 },
          }}
        >
          <Chip
            label="Our Partners"
            color="primary"
            sx={{
              mb: 2,
              fontWeight: "bold",
              fontSize: { xs: "0.75rem", sm: "0.85rem" },
              px: { xs: 1.5, sm: 2 },
            }}
          />

          <Typography
            fontWeight="bold"
            gutterBottom
            sx={{
              fontSize: {
                xs: "1.7rem",
                sm: "2.2rem",
                md: "2.8rem",
                lg: "3rem",
              },
              color: "#1a237e",
            }}
          >
            Trusted by Industry Leaders
          </Typography>

          <Typography
            color="#070707"
            sx={{
              maxWidth: 700,
              mx: "auto",
              fontSize: {
                xs: "0.9rem",
                sm: "1rem",
                md: "1.2rem",
              },
              lineHeight: 1.6,
            }}
          >
            We collaborate with global brands to deliver exceptional results
          </Typography>

          {activePartnersCount > 0 && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                display: "block",
                mt: 1,
                fontSize: { xs: "0.75rem", sm: "0.85rem" },
              }}
            >
              Showing {activePartnersCount} active partners
            </Typography>
          )}
        </Box>

        {/* ================= EMPTY STATE ================= */}
        {activePartnersCount === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              py: { xs: 5, sm: 6 },
              borderRadius: 2,
              border: `1px dashed ${theme.palette.divider}`,
            }}
          >
            <Typography variant="h6" color="text.secondary">
              No active partners available
            </Typography>
          </Box>
        ) : (
          /* ================= MARQUEE ================= */
          <>
            {/* Mobile View: Double row marquee */}
            {isMobile && renderMobileDoubleMarquee()}

            {/* Tablet/Desktop View: Single row marquee */}
            {!isMobile && renderDesktopMarquee()}
          </>
        )}
      </Container>
    </Box>
  );

  // return (
  //   <Box sx={{ py: 10, overflow: "hidden" }}>
  //     <Container maxWidth="xl">
  //       <Box
  //         textAlign="center"
  //         sx={{ mb: { xs: 4, sm: 6, md: 10 }, px: { xs: 2, sm: 3 } }}
  //       >
  //         <Chip
  //           label="Our Partners"
  //           color="primary"
  //           sx={{
  //             mb: 2,
  //             fontWeight: "bold",
  //             fontSize: { xs: "0.8rem", sm: "0.9rem" },
  //             py: 1,
  //             px: 2,
  //           }}
  //         />
  //         <Typography
  //           variant={isMobile ? "h3" : "h2"}
  //           fontWeight="bold"
  //           gutterBottom
  //           sx={{ fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3rem" } }}
  //         >
  //           Trusted by Industry Leaders
  //         </Typography>
  //         <Typography
  //           variant={isMobile ? "body1" : "h6"}
  //           color="text.secondary"
  //           sx={{
  //             maxWidth: 700,
  //             mx: "auto",
  //             fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
  //           }}
  //         >
  //           We collaborate with global brands to deliver exceptional results
  //         </Typography>

  //         {/* Show active partners count */}
  //         {activePartnersCount > 0 && (
  //           <Typography
  //             variant="caption"
  //             color="text.secondary"
  //             sx={{
  //               display: "block",
  //               mt: 1,
  //               fontSize: { xs: "0.8rem", sm: "0.9rem" },
  //             }}
  //           >
  //             Showing {activePartnersCount} active partners
  //           </Typography>
  //         )}
  //       </Box>

  //       {activePartnersCount === 0 ? (
  //         // Show message when no active partners
  //         <Box
  //           sx={{
  //             textAlign: "center",
  //             py: 8,
  //             bgcolor: "background.default",
  //             borderRadius: 2,
  //             border: `1px dashed ${theme.palette.divider}`,
  //           }}
  //         >
  //           <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
  //             No active partners available
  //           </Typography>
  //           <Typography variant="body2" color="text.secondary">
  //             Check back soon to see our partner network
  //           </Typography>
  //         </Box>
  //       ) : (
  //         /* Marquee Container */
  //         <Box
  //           sx={{
  //             position: "relative",
  //             width: "100%",
  //             overflow: "hidden",
  //             py: 2,
  //             "&::before, &::after": {
  //               content: '""',
  //               position: "absolute",
  //               top: 0,
  //               width: "100px",
  //               height: "100%",
  //               zIndex: 2,
  //             },
  //             "&::before": {
  //               left: 0,
  //               background: `linear-gradient(to right, ${theme.palette.background.default}, transparent)`,
  //             },
  //             "&::after": {
  //               right: 0,
  //               background: `linear-gradient(to left, ${theme.palette.background.default}, transparent)`,
  //             },
  //           }}
  //         >
  //           {/* Marquee Track */}
  //           <Box
  //             key={marqueeKey}
  //             sx={{
  //               display: "flex",
  //               animation: "marquee 40s linear infinite",
  //               "@keyframes marquee": {
  //                 "0%": { transform: "translateX(0)" },
  //                 "100%": { transform: "translateX(-50%)" },
  //               },
  //               "&:hover": {
  //                 animationPlayState: "paused",
  //               },
  //             }}
  //           >
  //             {/* Duplicated partners for seamless loop */}
  //             {duplicatedPartners.map((partner, index) => {
  //               const partnerColor = getPartnerColor(partner);
  //               const profileImageUrl = getProfileImageUrl(partner);
  //               const partnerInitials = getPartnerInitials(partner);
  //               const partnerKey = partner.id
  //                 ? `${partner.id}-${index}`
  //                 : `${partner.name}-${index}`;

  //               return (
  //                 <Paper
  //                   key={partnerKey}
  //                   elevation={0}
  //                   sx={{
  //                     flexShrink: 0,
  //                     mx: { xs: 1, sm: 1.5, md: 2 },
  //                     p: { xs: 1.5, sm: 2, md: 2.5 },
  //                     textAlign: "center",
  //                     border: "1px solid",
  //                     borderColor: "divider",
  //                     borderRadius: 3,
  //                     bgcolor: safeAlpha(partnerColor, 0.09),
  //                     minWidth: { xs: 120, sm: 140, md: 160 },
  //                     transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  //                     "&:hover": {
  //                       transform: "translateY(-4px)",
  //                       boxShadow: theme.shadows[4],
  //                       borderColor: partnerColor,
  //                       bgcolor: "background.paper",
  //                     },
  //                   }}
  //                 >
  //                   <Box
  //                     sx={{
  //                       width: { xs: 50, sm: 60, md: 70 },
  //                       height: { xs: 50, sm: 60, md: 70 },
  //                       borderRadius: "50%",
  //                       bgcolor: safeAlpha(partnerColor, 0.1),
  //                       display: "flex",
  //                       alignItems: "center",
  //                       justifyContent: "center",
  //                       margin: "0 auto 8px",
  //                       border: `1px solid ${safeAlpha(partnerColor, 0.2)}`,
  //                       overflow: "hidden",
  //                     }}
  //                   >
  //                     {/* Display partner profile image, logo, or initials */}
  //                     {profileImageUrl ? (
  //                       <Avatar
  //                         sx={{
  //                           width: "100%",
  //                           height: "100%",
  //                           bgcolor: partnerColor,
  //                         }}
  //                         src={profileImageUrl}
  //                         alt={partner.name}
  //                         onError={(e) => {
  //                           // If image fails to load, show initials
  //                           e.target.style.display = "none";
  //                           const parent = e.target.parentElement;
  //                           if (parent) {
  //                             parent.innerHTML = `
  //                                                               <div style="
  //                                                                   width: 100%;
  //                                                                   height: 100%;
  //                                                                   display: flex;
  //                                                                   align-items: center;
  //                                                                   justify-content: center;
  //                                                                   background-color: ${partnerColor};
  //                                                                   color: white;
  //                                                                   font-weight: bold;
  //                                                                   font-size: 1.2rem;
  //                                                                   border-radius: 50%;
  //                                                               ">
  //                                                                   ${partnerInitials}
  //                                                               </div>
  //                                                           `;
  //                           }
  //                         }}
  //                       />
  //                     ) : (
  //                       <Avatar
  //                         sx={{
  //                           width: "100%",
  //                           height: "100%",
  //                           bgcolor: partnerColor,
  //                           fontSize: "1.2rem",
  //                           fontWeight: "bold",
  //                         }}
  //                       >
  //                         {partnerInitials}
  //                       </Avatar>
  //                     )}
  //                   </Box>
  //                   <Typography
  //                     variant={isMobile ? "subtitle2" : "subtitle1"}
  //                     fontWeight="bold"
  //                     sx={{
  //                       fontSize: {
  //                         xs: "0.85rem",
  //                         sm: "0.95rem",
  //                         md: "1.05rem",
  //                       },
  //                       mb: 0.5,
  //                       color: "text.primary",
  //                     }}
  //                   >
  //                     {partner.name}
  //                   </Typography>
  //                   <Typography
  //                     variant="caption"
  //                     color="text.secondary"
  //                     sx={{
  //                       fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" },
  //                       display: "block",
  //                     }}
  //                   >
  //                     {partner.type || "Partner"}
  //                   </Typography>

  //                   {/* Active status indicator */}
  //                   <Box
  //                     sx={{
  //                       mt: 1,
  //                       display: "flex",
  //                       justifyContent: "center",
  //                       alignItems: "center",
  //                     }}
  //                   >
  //                     <Box
  //                       sx={{
  //                         width: 8,
  //                         height: 8,
  //                         borderRadius: "50%",
  //                         bgcolor: "success.main",
  //                         mr: 0.5,
  //                       }}
  //                     />
  //                     <Typography
  //                       variant="caption"
  //                       color="success.main"
  //                       sx={{
  //                         fontSize: "0.65rem",
  //                         fontWeight: "medium",
  //                       }}
  //                     >
  //                       Active
  //                     </Typography>
  //                   </Box>
  //                 </Paper>
  //               );
  //             })}
  //           </Box>
  //         </Box>
  //       )}
  //     </Container>
  //   </Box>
  // );
};

export default PartnersSection;
