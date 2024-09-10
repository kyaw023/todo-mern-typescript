"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.createTodo = exports.getTodos = void 0;
const model_1 = __importDefault(require("../../models/model"));
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield model_1.default.find();
        res.status(200).json({ todos: todos });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.getTodos = getTodos;
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const todo = yield model_1.default.create(body);
        const allTodos = yield model_1.default.find();
        res
            .status(201)
            .json({ message: "Todo added", todo: todo, todos: allTodos });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.createTodo = createTodo;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { id }, body, } = req;
        const updateTodo = yield model_1.default.findByIdAndUpdate({ _id: id }, body);
        const allTodos = yield model_1.default.find();
        res.status(200).json({
            message: "Todo updated",
            todo: updateTodo,
            todos: allTodos,
        });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.updateTodo = updateTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteTodo = yield model_1.default.findByIdAndDelete(req.params.id);
        const allTodos = yield model_1.default.find();
        res.status(200).json({
            message: "Todo deleted",
            todo: deleteTodo,
            todos: allTodos,
        });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.deleteTodo = deleteTodo;
