import React, { useState, useEffect } from "react";
import { Grid, Button, CircularProgress, Container } from "@material-ui/core";
import axios from "axios";

import ProfileDetails from "./ProfileDetails";
import EditContactInfo from "./EditContactInfo";
import ChangePassword from "./ChangePassword";
import AuthContext from "../Authentication/AuthContext";

function Profile(props) {
  const [profile, setProfile] = useState(null);
  const [isEditorOpened, setIsEditorOpened] = useState(false);
  const [changePassIsOpened, setChangePassIsOpened] = useState(false);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SL_API_URL}/user/profile`, {
      headers: { Authentication: props.auth },
    }).then((resp) => {
      setProfile(resp.data);
    });
  }, [props.auth]);

  return (
    <Container component="main" maxWidth="xs">
      <Grid container spacing={2} id="profileGrid" alignItems="center">
        <Grid item xs={12}>
          {profile == null ? (
            <CircularProgress color="secondary" aria-label="loading circle" />
          ) : (
            <ProfileDetails profile={profile} />
          )}
        </Grid>
        <Grid item xs={12} sm={6} id="editOptionsContianer">
          <Button onClick={() => setIsEditorOpened(true)}>Edit Profile</Button>
        </Grid>
        <Grid item xs={12} sm={6} id="changePasswordLinkContainer">
          <Button onClick={() => setChangePassIsOpened(true)}>
            Reset Password
          </Button>
        </Grid>
      </Grid>
      <AuthContext.Consumer>
        {(value) =>
          profile != null && isEditorOpened ? (
            <EditContactInfo
              profile={profile}
              auth={value}
              open={isEditorOpened}
              cancel={() => setIsEditorOpened(false)}
              updateProfile={(prof) => setProfile(prof)}
            />
          ) : (
            <></>
          )
        }
      </AuthContext.Consumer>
      {changePassIsOpened && (
        <ChangePassword
          username={profile.username}
          onClose={() => setChangePassIsOpened(false)}
        />
      )}
    </Container>
  );
}

export default Profile;
