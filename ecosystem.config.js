module.exports = {
  apps: [
    {
      name: "stopupsapi_backend",
      script: "./app.js",
      instances: 0,
      exec_mode: "cluster",
    },
  ],
};
