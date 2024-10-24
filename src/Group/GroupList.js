import React, { useEffect, useState } from "react";
import {
  AvatarGroup,
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import AvatarGenerator from "../AvatarGenerator";
import GroupOweSummaryChip from "./GroupOweSummaryChip";
import { useNavigate } from "react-router-dom";
import { backendService } from "../services/backendServices";
import { useAtom, useAtomValue } from "jotai";
import { loggedInUserAtom } from "../atoms/UserAtom";
import { refetchTriggerAtom } from "../atoms/Atoms";

const GroupList = () => {

  const [groupsData, setGroupsData] = useState(null);
  const [groupsOweSummaryList, setGroupsOweSummaryList] = useState(null);
  const navigate = useNavigate();
  const loggedInUser = useAtomValue(loggedInUserAtom);
  const [refreshTrigger,setRefreshTrigger] = useAtom(refetchTriggerAtom);

  const handleGroupClick = (groupId) => {
    navigate(`/expenses/group/${groupId}`)
  };


  useEffect(() => {
    const fetchGroupsData = async () => {
      try {
        const response = await backendService.getGroupsDataByUserId(loggedInUser.userId);
        if (response) {
          setGroupsData([...response]);
        }
      } catch (error) {
        console.error("Error fetching groups data: ", error);
      }
    };

    fetchGroupsData();
  }, [refreshTrigger]);

  useEffect(() => {
    const fetchoGroupSummaryData = async () => {
      try {
        const response = await backendService.getAllGroupBalanceSummary(loggedInUser.userId);
        setGroupsOweSummaryList([...response])
      }
      catch (err) {
        console.log("Error fecthing groups balance summary data");
      }
    }
    fetchoGroupSummaryData();
  }, [refreshTrigger]);


  return (
    <>
      {groupsData ? (
        groupsData.map((group, index) => (
          <Card key={index} sx={{ my: 2, border: "1px solid #e5e7eb" }}>
            <>
              <CardContent
                onClick={() => handleGroupClick(group.groupId)}
                sx={{
                  px: 3,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "grey.300",
                  },
                  transition: "background-color 0.3s ease",
                }}
              >
                <Box container sx={{ display: "flex" }}>
                  <Box>
                    <AvatarGenerator userName={group.groupName} size={"lg"} />
                  </Box>
                  <Box sx={{ ml: 1 }}>
                    <Typography sx={{ fontWeight: "bold", color: "#512DA8" }}>
                      {group.groupName}
                    </Typography>
                    <Typography>
                      {group.groupMembers.map((member, index) => (
                        <>
                          {member.userName}
                          {index < group.groupMembers.length - 1 ? ", " : ""}
                        </>
                      ))}
                    </Typography>
                    <Box sx={{ display: "flex" }}>
                      <AvatarGroup total={group.groupMembers.length} max={4}>
                        {group.groupMembers.map((member) => (
                          <AvatarGenerator
                            userName={member.userName}
                            size={"sm"}
                          />
                        ))}
                      </AvatarGroup>
                    </Box>
                  </Box>
                </Box>
                <Box>
                  {groupsOweSummaryList && <GroupOweSummaryChip currentGroupId={group.groupId} groupOweList={groupsOweSummaryList} />}
                </Box>
              </CardContent>
            </>
          </Card>
        ))
      ) : (
        <Box
          sx={{
            height: "40vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <img
              src="group-image.jpg"
              alt="group-image"
              style={{ height: "25em", width: "auto" }}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="h5" sx={{ color: "gray" }}>
              You don't belong to any group!. Start your Journey by creating
              Groups with your friend and family!!
            </Typography>
          </Box>
        </Box>
      )}
    </>
  );
};

export default GroupList;
