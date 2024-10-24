import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TimelineIcon from "@mui/icons-material/Timeline";
import PeopleTwoToneIcon from "@mui/icons-material/PeopleTwoTone";
import PaymentIcon from '@mui/icons-material/Payment';
import ExpenseList from "./ExpenseList";
import SettlementList from "../Payment/SettlementList";
import GroupMembers from "../GroupMembers";
import ActivityList from "../ActivityList";
const ExpenseTabs = ({groupId, refreshTrigger}) => {
  const [value, setValue] = useState("expenses");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <TabList
          onChange={handleChange}
          aria-label="lab API tabs example"
          sx={{
            "& .MuiTab-root": {
              textTransform: "none",
            },
          }}
        >
          <Tab
            icon={<PaymentIcon />}
            label="Expenses"
            value="expenses"
            iconPosition="start"
          />
           <Tab
            icon={<AttachMoneyIcon />}
            label="Settlements"
            value="settlements"
            iconPosition="start"
          />
          <Tab
            icon={<TimelineIcon />}
            label="Activity"
            value="activity"
            iconPosition="start"
          />
          <Tab
            icon={<PeopleTwoToneIcon />}
            label="Members"
            value="members"
            iconPosition="start"
          />
        </TabList>
      </Box>
      <TabPanel sx ={{p:0,mt:2}} value="expenses"><ExpenseList groupId={groupId}/></TabPanel>
      <TabPanel sx ={{p:0,mt:2}} value="settlements"><SettlementList groupId={groupId}/></TabPanel>
      <TabPanel sx ={{p:0,mt:2}} value="activity"><ActivityList groupId={groupId}/></TabPanel>
      <TabPanel sx ={{p:0,mt:2}} value="members"><GroupMembers  groupId={groupId}/></TabPanel>
    </TabContext>
  );
};

export default ExpenseTabs;
