"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = __importDefault(require("./routes/index"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const port = process.env.PORT || 4000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const mongo_url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.chq4f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
mongoose_1.default
    .connect(mongo_url)
    .then(() => {
    app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
})
    .catch((error) => {
    console.log(error);
});
app.use("/api", index_1.default);
