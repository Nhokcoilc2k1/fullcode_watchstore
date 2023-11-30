import mongoose from "mongoose";

const atributeSchema = mongoose.Schema({
    machineSeri: {
        type: String,
        require: true,
    },
    wireMaterial: {
        type: String,
        require: true,
    },
    glassMaterial: {
        type: String,
    },
    waterResistant: {
        type: String,
        require: true,
    },
    faceSize: {
        type: String,
    },
    shellMaterial: {
        type: String,
        require: true,
    },
    shape: {
        type: String,
    },
    shellColor: {
        type: String,
        require: true,
    },
    faceColor: {
        type: String,
    },
    feature: {
        type: String,
        require: true,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
    
},{
    timestamps: true
})

const Attribute = mongoose.model("Attribute", atributeSchema)

export default Attribute;