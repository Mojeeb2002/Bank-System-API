import User from "../models/user.model.js";


export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
    
        if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found!",
        });
        }
    
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};