import Task from "../models/Task.js";


export const getTask=async(req,res)=>{
    try {
        const tasks=await Task.find({user:req.user}).sort({createdAt:-1});
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({message:"Fetch task failed"});
    }
};

export const addTask=async(req,res)=>{
    try {
        const {title,dueDate}=req.body;
        const task=new Task({
            title,
            dueDate,
            user:req.user
        });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({message:"Add task failed"});
    }
}

export const updateTask=async(req,res)=>{
    try {
        const{id}=req.params;
        const{title,dueDate,completed}=req.body;
        const updatedTask=await Task.findByIdAndUpdate({_id:id,user:req.user},{title,dueDate,completed},{new:true});
        if(!updatedTask){
            return res.status(404).json({message:"Task not found"});
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({message:"Failed to update task"});
    }
}

export const toggleTask=async(req,res)=>{
    try {
        const{id}=req.body;

        const task=await Task.findOne({_id:id,user:req.user});
        if(!task){
            return res.status(404).json({message:"Task not found"});
        }
        task.completed=!task.completed;
        await task.save();
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({message:"Toggle failed"});
    }
}

export const deleteTask=async(req,res)=>{
    try {
        const{id}=req.params;
        const deletedTask=await Task.findByIdAndDelete({_id:id,user:req.user});
        if(!deletedTask){
            return res.status(404).json({message:"Task not found"});
        }
        res.status(200).json({message:"Task deleted successfully"});
    } catch (error) {
        res.status(500).json({message:"Delete task failed"});
    }
}