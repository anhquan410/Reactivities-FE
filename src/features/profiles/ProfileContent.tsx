import { Box, Paper, Tab, Tabs } from "@mui/material";
import { SyntheticEvent } from "react";
import ProfilePhotos from "./ProfilePhotos";
import ProfileAbout from "./ProfileAbout";
import { useQueryState, parseAsInteger } from "nuqs";

type Props = {
  profile: Profile;
  isOwnProfile: boolean;
};

export default function ProfileContent({ profile, isOwnProfile }: Props) {
  const [currentTab, setCurrentTab] = useQueryState(
    "tab",
    parseAsInteger.withDefault(0)
  );

  const handleTabChange = (_: SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const tabContent = [
    {
      label: "About",
      content: <ProfileAbout profile={profile} isOwnProfile={isOwnProfile} />,
    },
    { label: "Photos", content: <ProfilePhotos /> },
    { label: "Events", content: <div>Events</div> },
    { label: "Followers", content: <div>Followers</div> },
    { label: "Following", content: <div>Following</div> },
  ];

  return (
    <Box
      component={Paper}
      mt={2}
      p={3}
      elevation={3}
      height={500}
      sx={{ display: "flex", alignItems: "flex-start", borderRadius: 3 }}
    >
      <Tabs
        orientation="vertical"
        value={currentTab}
        onChange={handleTabChange}
        sx={{ borderRight: 1, height: 450, minWidth: 200 }}
      >
        {tabContent.map((tab, index) => (
          <Tab key={index} label={tab.label} sx={{ mr: 3 }} />
        ))}
      </Tabs>
      <Box sx={{ flexGrow: 1, p: 3, pt: 0 }}>
        {tabContent[currentTab].content}
      </Box>
    </Box>
  );
}
