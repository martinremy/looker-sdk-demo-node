exports.user = {
  external_user_id: "testgoober",
  first_name: "Pat",
  last_name: "Embed",
  session_length: 3600,
  force_logout_login: false,
  external_group_id: "group1",
  group_ids: [4],
  permissions: [
    "access_data",
    "see_looks",
    "see_user_dashboards",
    "explore",
    "save_content",
    "embed_browse_spaces"
  ],
  models: process.env.LOOKML_MODELS.split(","),
  user_attributes: {
    locale: "en_US",
    country: "USA",
    brand: "Calvin Klein",
    time_horizon: "last 182 days",
    permission_level: "basic"
  }
};
