import React from "react";
import { GiReceiveMoney } from "react-icons/gi";
import UserAvatarLabel from "../UserAvatarLabel";
import { PAID_USER_DATA } from "../data/PaidUsersData";
import {
  Grid,
  Typography,
  Box,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";

const SinglePaidUser = ({
  paidUsers,
  handleChangePayer,
  handleAddPayersButtonClick,
  defaultPayer,
}) => {
  return (
    <>
      <Grid  md={5} xs={12} sx={{pl:2}}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: { xs: "center", md: "flex-start" },
          }}
        >
          <GiReceiveMoney color="green" size={25} />
          <Typography sx={{ mx: 1, whiteSpace: "nowrap" }}>Paid by</Typography>
          {paidUsers.length > 0 ? (
            <UserAvatarLabel userName={paidUsers[0].userName} size={"xs"} />
          ) : (
              <Typography sx={{ whiteSpace: "nowrap", color: "red" }}>
                Non one
              </Typography>
          )}
        </Box>
      </Grid>

      <Grid  md={7} xs={12} sx={{pl:2}}>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            justifyContent: { xs: "center", md: "flex-end" },
          }}
        >
          {paidUsers.length > 0 ? (
            <>
              <Typography
                component="a"
                href="#"
                onClick={() => handleChangePayer(null)}
                sx={{ whiteSpace: "nowrap", cursor: "pointer" }}
              >
                Change Payer
              </Typography>
              <Typography
                component="a"
                href="#"
                onClick={handleAddPayersButtonClick}
                sx={{ whiteSpace: "nowrap", cursor: "pointer" }}
              >
                Add Payers
              </Typography>
            </>
          ) : (
            <>
              <FormControl fullWidth>
                <Select
                  value={""}
                  onChange={(e) => handleChangePayer(e.target.value)}
                >
                  {PAID_USER_DATA.map((user)=>(
                 <MenuItem key={user.userId} value={user}><UserAvatarLabel userName={user.userName} size="xs"/></MenuItem>
              ))}
                </Select>
              </FormControl>
              <Typography
                component="a"
                href="#"
                onClick={() => handleChangePayer(defaultPayer)}
                sx={{ whiteSpace: "nowrap", cursor: "pointer" }}
              >
                Only I Paid
              </Typography>
            </>
          )}
        </Box>
      </Grid>
      </>
  );
};

export default SinglePaidUser;
