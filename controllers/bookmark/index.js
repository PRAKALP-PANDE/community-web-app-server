import bookmarkRouter from "./routes/index.js";

const bookMarkModule = {
  init: (app) => {
    app.use("/api/v1", bookmarkRouter);
    console.log("[module]: bookmark module loaded");
  },
};

export default bookMarkModule;
