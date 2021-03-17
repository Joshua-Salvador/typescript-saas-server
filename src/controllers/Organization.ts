/* eslint-disable no-unused-vars */
import {auth} from "firebase-admin";
import {admin, db} from "../config/index";
import {NewOrgData, AdminUser, AdminUserDoc}
  from "../interfaces/Organization";

export const createOrg = async (req: any, res: any) => {
  const newOrgData: NewOrgData = {
    name: req.body.name,
    email: req.body.email,
    createdAt: new Date().toDateString(),
  };
  const adminUser: AdminUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    emailVerified: true,
  };
  const adminUserDoc: AdminUserDoc = {
    username: req.body.admin.username,
    email: req.body.admin.email,
    branch: "admin",
    position: "admin",
  };
  try {
    const newAuthenticatedUser: auth.UserRecord =
    await admin.auth().createUser(adminUser);
    adminUserDoc.userId = newAuthenticatedUser.uid;
    const newOrganization = await db
        .collection("organizations")
        .add(newOrgData);
    adminUserDoc.organization = newOrganization.id;
    await db
        .doc(
            `/organizations/${newOrganization.id}/
            users/${newAuthenticatedUser.uid}`
        )
        .set(adminUserDoc);
    await admin.auth().updateUser(newAuthenticatedUser.uid, {
      displayName: adminUserDoc.username + newOrganization.id,
    });
    await admin.auth().setCustomUserClaims(newAuthenticatedUser.uid, {
      position: "admin",
      branch: "admin",
    });
    return res.status(201).json({
      message: `Thank you ${adminUserDoc.username} 
        for letting us serve ${newOrgData.name}`,
    });
  } catch (err) {
    switch (err.code) {
      case "auth/email-already-exists":
        return res
            .status(400)
            .json({error: err, message: "Email already exists."});
      default:
        return res
            .status(500)
            .json({error: err, message: "Something went wrong."});
    }
  }
};
