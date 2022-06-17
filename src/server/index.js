const express = require("express");
const os = require("os");
const fetch = require("node-fetch");
const { admin_sdk } = require("../utils/admin/looker_sdk");
const { user } = require("../utils/user");
const app = express();

app.use(express.static("dist"));
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send("success");
});

app.get("/api/token", async (req, res) => {
  let credential;
  try {
    credential = await admin_sdk.ok(
      admin_sdk.user_for_credential("embed", user.external_user_id)
    );
  } catch (e) {
    const url = await admin_sdk.ok(
      admin_sdk.create_sso_embed_url({
        ...user,
        target_url: `${process.env.LOOKER_EMBED_HOST}/alive`
      })
    );
    await fetch(url.url);
    credential = await admin_sdk.ok(
      admin_sdk.user_for_credential("embed", user.external_user_id)
    );
  }
  const access_token = await admin_sdk.ok(
    admin_sdk.login_user(credential.id, false)
  );
  res.status(200).json(access_token);
});

app.get("/api/auth", async (req, res) => {
  const { src } = req.query;
  const url = await admin_sdk.ok(
    admin_sdk.create_sso_embed_url({
      ...user,
      target_url: `${process.env.LOOKER_EMBED_HOST}${src}`
    })
  );
  res.status(200).json(url);
});

app.listen(process.env.PORT || 8000, () => {
  try {
    console.log(`Listening on port ${process.env.PORT || 8000}!`);
  } catch (error) {
    console.log({ error });
  }
});
