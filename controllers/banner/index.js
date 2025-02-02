import bannerRouter from "./routes/index.js";

const bannerModule = {
  init: (app) => {
    app.use("/api/v1", bannerRouter);
    console.log("[module]: bannner module loaded");
  },
};

export default bannerModule;
