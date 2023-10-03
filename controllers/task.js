import Task from "../models/task.js";

export const newTask = async(req, res, next)=>{
    const {title, description} = req.body;

    await Task.create({
        title,
        description,
        user: req.user,
    });
    res.status(201).json({
        success:true,
        message:"Task added Successfully",
    });
};

export const getMyTask = async(req, res, next)=>{
    const userid = req.user._id;

    const task = await Task.find({user:userid});

    res.status(200).json({
        success:true,
        task,
    });
};

export const updateTask = async(req, res, next)=>{
    const {id} = req.params;
    const task = await Task.findById(id); 
    if(!task){
        return res.status(404).json({
            success:false,
            message:"Invalid Id",
        })
    }

    task.isCompleted=!task.isCompleted;

    await task.save();

    res.status(200).json({
        success:true,
        message: "Task Updated",
    });
};

export const deleteTask = async(req, res, next)=>{
    const {id} = req.params;
    const task = await Task.findById(id); 
    if(!task){
        return res.status(404).json({
            success:false,
            message:"Invalid Id",
        })
    }

    await task.deleteOne();

    res.status(200).json({
        success:true,
        message: "Task Deleted",
    });
};