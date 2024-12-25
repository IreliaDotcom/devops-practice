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
const Todo_model_1 = __importDefault(require("../models/Todo.model"));
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield Todo_model_1.default.find();
        res.status(200).json(todos);
    }
    catch (error) {
        res.status(500).json({ error: "Error fetching todos" });
    }
});
exports.getTodos = getTodos;
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req.body;
        const newTodo = new Todo_model_1.default({
            title,
            description,
        });
        const savedTodo = yield newTodo.save();
        res.status(201).json(savedTodo);
    }
    catch (error) {
        res.status(500).json({ error: "Error creating todo" });
    }
});
exports.createTodo = createTodo;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updatedTodo = yield Todo_model_1.default.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if (!updatedTodo) {
            res.status(404).json({ error: "Todo not found" });
        }
        else {
            res.status(200).json(updatedTodo);
        }
    }
    catch (error) {
        res.status(500).json({ error: "Error updating todo" });
    }
});
exports.updateTodo = updateTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedTodo = yield Todo_model_1.default.findByIdAndDelete(id);
        if (!deletedTodo) {
            res.status(404).json({ error: "Todo not found" });
        }
        else {
            res.status(200).json({ message: "Todo deleted" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Error deleting todo" });
    }
});
exports.deleteTodo = deleteTodo;
